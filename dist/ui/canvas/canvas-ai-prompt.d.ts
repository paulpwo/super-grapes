/**
 * Canvas AI Prompt — Renders an inline AI prompt interface inside the
 * GrapesJS iframe canvas when the page is completely empty AND AI config
 * is available. Replaces the add-bar in that scenario.
 */
import type { Editor } from 'grapesjs';
/** Returns true if the AI prompt should show (empty canvas + AI config) */
export declare function shouldShowAiPrompt(editor: Editor): boolean;
export declare function initCanvasAiPrompt(editor: Editor): void;
//# sourceMappingURL=canvas-ai-prompt.d.ts.map