/**
 * UIManager — Main orchestrator for the @super-grapes/ui package.
 * Two-phase init: first create shell (DOM), then connect editor.
 */
import type { Editor } from 'grapesjs';
import { createEditorShell, type EditorShellRefs } from './shell/editor-shell';
import { initTopbar } from './shell/topbar';
import { initSidebar, type SidebarController } from './shell/sidebar';
import { renderWidgetsPanel } from './panels/widgets-panel';
import { renderEditPanel } from './panels/edit-panel';
import { initNavigator } from './navigator/navigator';
import { initContextMenu } from './context-menu/context-menu';
import { initCanvasAddBar } from './canvas/canvas-add-bar';
import { initCanvasAiPrompt } from './canvas/canvas-ai-prompt';
import { registerKeymaps } from './keymaps';

export class UIManager {
  private shell: EditorShellRefs;
  private sidebar: SidebarController | null = null;
  private editor: Editor | null = null;
  private destroyed = false;

  constructor(container: HTMLElement) {
    // Phase 1: Create the HTML shell (topbar, sidebar, canvas zone)
    this.shell = createEditorShell(container);
  }

  /**
   * Phase 2: Connect a GrapesJS editor instance to the UI.
   * Call this after grapesjs.init() has mounted into #sg-canvas.
   */
  connect(editor: Editor): void {
    this.editor = editor;

    // Init topbar
    initTopbar(this.shell.topbar, editor);

    // Init sidebar
    this.sidebar = initSidebar(this.shell.sidebar, editor);

    // Init widgets panel
    renderWidgetsPanel(this.shell.sidebar, editor);

    // Init edit panel
    renderEditPanel(this.shell.sidebar, editor);

    // Init navigator
    initNavigator(this.shell.navigator, editor);

    // Init context menu
    initContextMenu(this.shell.contextMenu, editor);

    // Init canvas AI prompt (inline prompt when canvas empty + AI configured)
    initCanvasAiPrompt(editor);

    // Init canvas add bar (bottom bar for adding sections)
    initCanvasAddBar(editor);

    // Register keyboard shortcuts
    registerKeymaps(editor);
  }

  getShell(): EditorShellRefs {
    return this.shell;
  }

  getSidebar(): SidebarController | null {
    return this.sidebar;
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.shell.root.remove();
  }
}
