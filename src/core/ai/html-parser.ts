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
