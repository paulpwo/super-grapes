/**
 * Creates the main editor shell HTML layout.
 * Returns references to key zone elements for mounting sub-systems.
 */
export interface EditorShellRefs {
    root: HTMLElement;
    topbar: HTMLElement;
    sidebar: HTMLElement;
    canvasWrap: HTMLElement;
    canvas: HTMLElement;
    navigator: HTMLElement;
    contextMenu: HTMLElement;
}
export declare function createEditorShell(container: HTMLElement): EditorShellRefs;
//# sourceMappingURL=editor-shell.d.ts.map