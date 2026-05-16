/**
 * Template Modal — Shows a modal to browse, upload, and insert templates.
 * Templates follow the model: { id, name, data, createdAt }
 * External integrations can pass templates via setExternalTemplates().
 * Users can also upload HTML files from their computer.
 */
import type { Editor } from 'grapesjs';
export interface SGTemplate {
    id: string;
    name: string;
    data: string;
    createdAt?: string;
}
export declare function openTemplateModal(editor: Editor, externalTemplates?: SGTemplate[]): void;
//# sourceMappingURL=template-modal.d.ts.map