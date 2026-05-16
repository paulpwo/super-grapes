/**
 * UIManager — Main orchestrator for the @super-grapes/ui package.
 * Two-phase init: first create shell (DOM), then connect editor.
 */
import type { Editor } from 'grapesjs';
import { type EditorShellRefs } from './shell/editor-shell';
import { type SidebarController } from './shell/sidebar';
export declare class UIManager {
    private shell;
    private sidebar;
    private editor;
    private destroyed;
    constructor(container: HTMLElement);
    /**
     * Phase 2: Connect a GrapesJS editor instance to the UI.
     * Call this after grapesjs.init() has mounted into #sg-canvas.
     */
    connect(editor: Editor): void;
    getShell(): EditorShellRefs;
    getSidebar(): SidebarController | null;
    destroy(): void;
}
//# sourceMappingURL=ui-manager.d.ts.map