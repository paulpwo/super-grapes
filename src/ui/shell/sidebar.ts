import type { Editor } from 'grapesjs';

export type SidebarMode = 'widgets' | 'edit' | 'navigator';

export interface SidebarController {
  switchMode(mode: SidebarMode): void;
  getMode(): SidebarMode;
  getBodyEl(): HTMLElement;
}

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export function initSidebar(el: HTMLElement, editor: Editor): SidebarController {
  let currentMode: SidebarMode = 'widgets';

  // Zones
  const widgetsZone = document.createElement('div');
  widgetsZone.className = 'sg-sidebar-widgets-zone';
  widgetsZone.style.display = 'flex';
  widgetsZone.style.flexDirection = 'column';
  widgetsZone.style.flex = '1';
  widgetsZone.style.overflow = 'hidden';

  const editZone = document.createElement('div');
  editZone.className = 'sg-sidebar-edit-zone';
  editZone.style.display = 'none';
  editZone.style.flexDirection = 'column';
  editZone.style.flex = '1';
  editZone.style.overflow = 'hidden';

  // Widgets header
  const widgetsHeader = document.createElement('div');
  widgetsHeader.className = 'sg-sidebar-header';
  widgetsHeader.innerHTML = '<span class="sg-sidebar-title">Widgets</span>';

  // Widgets body
  const widgetsBody = document.createElement('div');
  widgetsBody.className = 'sg-sidebar-body';
  widgetsBody.id = 'sg-widgets-body';

  widgetsZone.appendChild(widgetsHeader);
  widgetsZone.appendChild(widgetsBody);

  // Edit header (built on select)
  const editHeader = document.createElement('div');
  editHeader.className = 'sg-edit-header';

  const editTabs = document.createElement('div');
  editTabs.className = 'sg-edit-tabs';

  const editBody = document.createElement('div');
  editBody.className = 'sg-edit-body';
  editBody.id = 'sg-edit-body';

  editZone.appendChild(editHeader);
  editZone.appendChild(editTabs);
  editZone.appendChild(editBody);

  // Bottom toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'sg-sidebar-toolbar';
  toolbar.innerHTML = `
    <button class="sg-sidebar-toolbar-btn active" data-mode="widgets" title="Widgets">
      <i class="fa-solid fa-grip"></i>
    </button>
    <button class="sg-sidebar-toolbar-btn" data-mode="navigator" title="Navigator">
      <i class="fa-solid fa-layer-group"></i>
    </button>
  `;

  el.appendChild(widgetsZone);
  el.appendChild(editZone);
  el.appendChild(toolbar);

  // Toolbar click
  toolbar.querySelectorAll('.sg-sidebar-toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = (btn as HTMLElement).dataset.mode as SidebarMode;
      if (mode) switchMode(mode);
    });
  });

  function switchMode(mode: SidebarMode) {
    currentMode = mode;

    widgetsZone.style.display = mode === 'widgets' ? 'flex' : 'none';
    editZone.style.display = mode === 'edit' ? 'flex' : 'none';

    // Update toolbar active states
    toolbar.querySelectorAll('.sg-sidebar-toolbar-btn').forEach(btn => {
      const b = btn as HTMLElement;
      b.classList.toggle('active', b.dataset.mode === mode);
    });

    // If switching to navigator, toggle the navigator panel instead
    if (mode === 'navigator') {
      const navEl = document.querySelector('.sg-navigator');
      if (navEl) navEl.classList.add('open');
      // Keep the previous view in sidebar
      widgetsZone.style.display = currentMode === 'edit' ? 'none' : 'flex';
      editZone.style.display = currentMode === 'edit' ? 'flex' : 'none';
    }
  }

  // On component select, switch to edit mode
  editor.on('component:selected', (component: any) => {
    const type = component.get('type') || component.get('tagName') || 'Element';
    const name = component.getName() || type;

    editHeader.innerHTML = `
      <button class="sg-edit-back-btn" title="Back to widgets">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <span class="sg-edit-title">${esc(name)}</span>
      <span class="sg-edit-badge">${esc(type)}</span>
    `;

    // Back button
    editHeader.querySelector('.sg-edit-back-btn')!.addEventListener('click', () => {
      editor.select(null as any);
    });

    // Set up edit tabs
    editTabs.innerHTML = `
      <button class="sg-edit-tab active" data-tab="content">
        <i class="fa-solid fa-pencil"></i> Content
      </button>
      <button class="sg-edit-tab" data-tab="style">
        <i class="fa-solid fa-paint-brush"></i> Style
      </button>
      <button class="sg-edit-tab" data-tab="advanced">
        <i class="fa-solid fa-cog"></i> Advanced
      </button>
    `;

    editTabs.querySelectorAll('.sg-edit-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        editTabs.querySelectorAll('.sg-edit-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabName = (tab as HTMLElement).dataset.tab!;
        el.dispatchEvent(new CustomEvent('sg:tab-change', { detail: { tab: tabName }, bubbles: true }));
      });
    });

    switchMode('edit');
  });

  // On component deselect, switch to widgets mode
  editor.on('component:deselected', () => {
    switchMode('widgets');
  });

  return {
    switchMode,
    getMode: () => currentMode,
    getBodyEl: () => currentMode === 'edit' ? editBody : widgetsBody,
  };
}
