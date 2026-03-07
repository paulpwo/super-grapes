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

export function createEditorShell(container: HTMLElement): EditorShellRefs {
  container.innerHTML = '';

  const root = document.createElement('div');
  root.className = 'sg-editor';

  // Topbar
  const topbar = document.createElement('div');
  topbar.className = 'sg-topbar';

  // Main area (sidebar + canvas)
  const main = document.createElement('div');
  main.className = 'sg-main';

  const sidebar = document.createElement('div');
  sidebar.className = 'sg-sidebar';

  const canvasWrap = document.createElement('div');
  canvasWrap.className = 'sg-canvas-wrap';

  const canvas = document.createElement('div');
  canvas.id = 'sg-canvas';
  canvasWrap.appendChild(canvas);

  main.appendChild(sidebar);
  main.appendChild(canvasWrap);

  // Navigator panel (hidden by default)
  const navigator = document.createElement('div');
  navigator.className = 'sg-navigator';

  // Context menu (hidden by default)
  const contextMenu = document.createElement('div');
  contextMenu.className = 'sg-context-menu';

  // Assemble
  root.appendChild(topbar);
  root.appendChild(main);
  root.appendChild(navigator);
  root.appendChild(contextMenu);

  container.appendChild(root);

  return { root, topbar, sidebar, canvasWrap, canvas, navigator, contextMenu };
}
