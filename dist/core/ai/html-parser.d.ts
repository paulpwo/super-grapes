/**
 * Extract HTML from an AI response that might contain markdown code blocks.
 */
export declare function extractHtmlFromResponse(response: string): string;
/**
 * Validate that a string contains parseable HTML with at least one element.
 */
export declare function validateHtml(html: string): boolean;
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
/**
 * Quality gate. Stronger than {@link validateHtml}: detects obviously-truncated
 * output and, for full-page modes, requires a minimum number of top-level
 * sections. Lenient for append/edit modes (a single fragment is valid).
 *
 * Returns a structured result so callers can craft a corrective retry message.
 */
export declare function checkHtmlQuality(html: string, mode: QualityMode): QualityResult;
//# sourceMappingURL=html-parser.d.ts.map