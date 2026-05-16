import type { Editor } from 'grapesjs';
export type SidebarMode = 'widgets' | 'edit' | 'navigator';
export interface SidebarController {
    switchMode(mode: SidebarMode): void;
    getMode(): SidebarMode;
    getBodyEl(): HTMLElement;
}
export declare function initSidebar(el: HTMLElement, editor: Editor): SidebarController;
//# sourceMappingURL=sidebar.d.ts.map