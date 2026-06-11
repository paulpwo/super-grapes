/**
 * Extract HTML from an AI response that might contain markdown code blocks.
 */
export function extractHtmlFromResponse(response: string): string {
  // Try to extract from markdown code blocks
  const codeBlockMatch = response.match(/```(?:html)?\s*\n?([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  return response.trim();
}

/**
 * Validate that a string contains parseable HTML with at least one element.
 */
export function validateHtml(html: string): boolean {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const hasError = doc.querySelector('parsererror');
    const hasElements = doc.body.children.length > 0;
    return !hasError && hasElements;
  } catch {
    return false;
  }
}

/**
 * Generation modes for the quality gate.
 * - 'generate' / 'replace': full-page generation — strict (≥2 top-level sections, no truncation).
 * - 'append' / 'edit': partial fragment — lenient (a single section/fragment is valid).
 */
export type QualityMode = 'generate' | 'replace' | 'append' | 'edit';

export interface QualityResult {
  /** True if the output passes the quality gate. */
  ok: boolean;
  /** Machine-readable reason when ok === false. */
  reason?: 'empty' | 'unparseable' | 'truncated' | 'too-few-sections';
  /** Human-readable explanation. */
  message?: string;
}

/** Number of top-level sg-section wrappers required for full-page modes. */
const MIN_FULL_PAGE_SECTIONS = 4;

/**
 * Heuristic truncation detector. Operates on the raw extracted string (not the
 * DOMParser tree, which silently auto-closes tags). Flags output that looks cut
 * off mid-stream: a dangling unfinished tag at the tail, or grossly unbalanced
 * <section> open/close counts.
 */
function looksTruncated(html: string): boolean {
  const trimmed = html.trimEnd();
  if (!trimmed) return true;

  // Tail ends inside an unfinished tag, e.g. "...<div sty"
  const lastOpen = trimmed.lastIndexOf('<');
  const lastClose = trimmed.lastIndexOf('>');
  if (lastOpen > lastClose) return true;

  // Count <section ...> openers vs </section> closers. A full page that opened
  // sections but never closed the last one is almost certainly truncated.
  const openSections = (trimmed.match(/<section\b/gi) || []).length;
  const closeSections = (trimmed.match(/<\/section\s*>/gi) || []).length;
  if (openSections > 0 && closeSections < openSections) return true;

  return false;
}

/**
 * Count top-level sg-section elements (direct children of body after parsing).
 * Leading <link>/<style> nodes are ignored.
 */
function countTopLevelSections(html: string): number {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return Array.from(doc.body.children).filter(
      (el) => el.getAttribute('data-gjs-type') === 'sg-section' || el.tagName.toLowerCase() === 'section',
    ).length;
  } catch {
    return 0;
  }
}

/**
 * Quality gate. Stronger than {@link validateHtml}: detects obviously-truncated
 * output and, for full-page modes, requires a minimum number of top-level
 * sections. Lenient for append/edit modes (a single fragment is valid).
 *
 * Returns a structured result so callers can craft a corrective retry message.
 */
export function checkHtmlQuality(html: string, mode: QualityMode): QualityResult {
  const trimmed = (html || '').trim();
  if (!trimmed) {
    return { ok: false, reason: 'empty', message: 'The AI returned an empty response.' };
  }

  if (!validateHtml(trimmed)) {
    return {
      ok: false,
      reason: 'unparseable',
      message: 'The AI response did not contain valid HTML.',
    };
  }

  if (looksTruncated(trimmed)) {
    return {
      ok: false,
      reason: 'truncated',
      message: 'The AI output appears truncated — it was cut off before the page was complete.',
    };
  }

  // Full-page modes require a real multi-section page. Fragments do not.
  const isFullPage = mode === 'generate' || mode === 'replace';
  if (isFullPage && countTopLevelSections(trimmed) < MIN_FULL_PAGE_SECTIONS) {
    return {
      ok: false,
      reason: 'too-few-sections',
      message: `A full page should contain at least ${MIN_FULL_PAGE_SECTIONS} sections, but fewer were generated.`,
    };
  }

  return { ok: true };
}
