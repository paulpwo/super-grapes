/**
 * Canvas Add Bar — Renders an "add section" bar at the bottom of all
 * content inside the GrapesJS iframe canvas.
 * Shows 3 action buttons: + (add section), folder (templates), sparkles (AI).
 */
import type { Editor } from 'grapesjs';
import { type SGTemplate } from './template-modal';
export declare function setExternalTemplates(templates: SGTemplate[]): void;
export declare function getExternalTemplates(): SGTemplate[];
export declare function initCanvasAddBar(editor: Editor): void;
/** Insert HTML as a new section at the bottom, preserving existing content */
export declare function insertTemplateHtml(editor: Editor, html: string): void;
//# sourceMappingURL=canvas-add-bar.d.ts.map