import type { Editor } from 'grapesjs';
import type { AiConfig } from '../../core/types';
export type AiModalMode = 'replace' | 'append' | 'edit';
export interface AiModalOptions {
    mode?: AiModalMode;
    /** Component to edit (required for 'edit' mode) */
    targetComponent?: any;
}
export declare function openAiChatModal(editor: Editor, config: AiConfig, modeOrOpts?: AiModalMode | AiModalOptions): void;
//# sourceMappingURL=ai-chat-modal.d.ts.map