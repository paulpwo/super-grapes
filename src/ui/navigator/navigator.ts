/**
 * Layer tree panel (Navigator).
 * Renders a tree of components with expand/collapse, selection, visibility toggle, rename.
 */
import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

/** Icons for component types — outlined style */
const TYPE_ICONS: Record<string, string> = {
  wrapper: 'fa-regular fa-square',
  default: 'fa-regular fa-square',
  'sg-section': 'fa-regular fa-square-full',
  'sg-container': 'fa-solid fa-border-all',
  'sg-column': 'fa-solid fa-table-columns',
  'sg-heading': 'fa-solid fa-t',
  'sg-text': 'fa-solid fa-align-left',
  'sg-image': 'fa-regular fa-image',
  'sg-video': 'fa-solid fa-film',
  'sg-button': 'fa-regular fa-hand-pointer',
  'sg-divider': 'fa-solid fa-grip-lines',
  'sg-spacer': 'fa-solid fa-arrows-up-down',
  'sg-icon': 'fa-regular fa-star',
  'sg-icon-box': 'fa-regular fa-object-group',
  'sg-accordion': 'fa-solid fa-bars-staggered',
  'sg-tabs': 'fa-regular fa-window-maximize',
  'sg-form': 'fa-regular fa-rectangle-list',
  'sg-input': 'fa-regular fa-keyboard',
  'sg-textarea': 'fa-solid fa-align-left',
  'sg-select': 'fa-solid fa-list-dropdown',
  'sg-checkbox': 'fa-regular fa-square-check',
  'sg-radio': 'fa-regular fa-circle-dot',
  'sg-submit': 'fa-regular fa-paper-plane',
  text: 'fa-solid fa-align-left',
  textnode: 'fa-solid fa-align-left',
  image: 'fa-regular fa-image',
  video: 'fa-solid fa-film',
  link: 'fa-solid fa-arrow-up-right-from-square',
  map: 'fa-solid fa-map-location-dot',
  table: 'fa-solid fa-table',
  row: 'fa-solid fa-grip-lines',
  cell: 'fa-regular fa-square',
  section: 'fa-regular fa-square-full',
  container: 'fa-solid fa-border-all',
  column: 'fa-solid fa-table-columns',
  form: 'fa-regular fa-rectangle-list',
  input: 'fa-regular fa-keyboard',
  textarea: 'fa-solid fa-align-left',
  select: 'fa-solid fa-caret-down',
  button: 'fa-regular fa-hand-pointer',
  label: 'fa-solid fa-tag',
  checkbox: 'fa-regular fa-square-check',
  radio: 'fa-regular fa-circle-dot',
};

function getTypeIcon(type: string): string {
  return TYPE_ICONS[type] || TYPE_ICONS['default']!;
}

export function initNavigator(el: HTMLElement, editor: Editor): void {
  // Build navigator header
  const navHeader = document.createElement('div');
  navHeader.className = 'sg-navigator-header';
  navHeader.innerHTML = `
    <span class="sg-navigator-header-icon"><i class="fa-solid fa-bars-staggered"></i></span>
    <span class="sg-navigator-title">Structure</span>
    <button class="sg-navigator-close" title="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  navHeader.querySelector('.sg-navigator-close')!.addEventListener('click', () => {
    el.classList.remove('open');
    // Also deactivate toolbar button
    const navBtn = document.querySelector('.sg-topbar-icon-btn[data-cmd="toggle-navigator"]');
    navBtn?.classList.remove('active');
  });

  // Drag-to-move on header
  initDrag(navHeader, el);

  // Top resize handle
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'sg-navigator-resize';
  initResize(resizeHandle, el);

  const navBody = document.createElement('div');
  navBody.className = 'sg-navigator-body';

  el.appendChild(resizeHandle);
  el.appendChild(navHeader);
  el.appendChild(navBody);

  // Track collapsed state
  const collapsedSet = new Set<string>();

  function renderTree() {
    navBody.innerHTML = '';
    const wrapper = editor.getWrapper();
    if (!wrapper) return;

    const components = wrapper.components();
    renderComponents(navBody, components, 0);
  }

  function renderComponents(parentEl: HTMLElement, components: any, depth: number) {
    components.forEach((component: any) => {
      const id = component.getId();
      const type = component.get('type') || component.get('tagName') || 'div';
      const name = component.getName?.() || type;
      const children = component.components();
      const hasChildren = children && children.length > 0;
      const isCollapsed = collapsedSet.has(id);
      const isSelected = editor.getSelected() === component;
      const isVisible = component.getStyle('display') !== 'none';

      // Layer item
      const item = document.createElement('div');
      item.className = 'sg-layer-item';
      if (isSelected) item.classList.add('selected');
      item.style.paddingLeft = `${8 + depth * 16}px`;

      // Toggle
      const toggle = document.createElement('button');
      toggle.className = 'sg-layer-toggle';
      if (!hasChildren) toggle.classList.add('empty');
      if (isCollapsed) toggle.classList.add('collapsed');
      toggle.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isCollapsed) {
          collapsedSet.delete(id);
        } else {
          collapsedSet.add(id);
        }
        renderTree();
      });

      // Icon
      const icon = document.createElement('span');
      icon.className = 'sg-layer-icon';
      icon.innerHTML = `<i class="${getTypeIcon(type)}"></i>`;

      // Name
      const nameEl = document.createElement('span');
      nameEl.className = 'sg-layer-name';
      nameEl.textContent = name;

      // Double-click to rename
      nameEl.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const input = document.createElement('input');
        input.className = 'sg-layer-name-input';
        input.value = name;
        nameEl.replaceWith(input);
        input.focus();
        input.select();

        const finishEdit = () => {
          const newName = input.value.trim();
          if (newName) {
            component.set('custom-name', newName);
          }
          renderTree();
        };

        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', (ke) => {
          if (ke.key === 'Enter') finishEdit();
          if (ke.key === 'Escape') renderTree();
        });
      });

      // Visibility toggle
      const visBtn = document.createElement('button');
      visBtn.className = 'sg-layer-visibility';
      if (!isVisible) visBtn.classList.add('hidden-layer');
      visBtn.innerHTML = isVisible
        ? '<i class="fa-solid fa-eye"></i>'
        : '<i class="fa-solid fa-eye-slash"></i>';
      visBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isVisible) {
          component.addStyle({ display: 'none' });
        } else {
          component.removeStyle('display');
        }
        renderTree();
      });

      // Click to select
      item.addEventListener('click', () => {
        editor.select(component);
      });

      item.appendChild(toggle);
      item.appendChild(icon);
      item.appendChild(nameEl);
      item.appendChild(visBtn);
      parentEl.appendChild(item);

      // Children
      if (hasChildren && !isCollapsed) {
        const childWrap = document.createElement('div');
        childWrap.className = 'sg-layer-children';
        renderComponents(childWrap, children, depth + 1);
        parentEl.appendChild(childWrap);
      }
    });
  }

  // Listen to layer:custom event
  editor.on('layer:custom', () => {
    renderTree();
  });

  // Re-render on component changes
  editor.on('component:selected component:deselected component:add component:remove component:drag:end', () => {
    renderTree();
  });

  // Initial render
  editor.on('load', () => renderTree());
}

/** Resize panel vertically by dragging the top edge */
function initResize(handle: HTMLElement, panel: HTMLElement): void {
  let startY = 0;
  let startHeight = 0;
  let startTop = 0;

  handle.addEventListener('pointerdown', (e: PointerEvent) => {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);

    const rect = panel.getBoundingClientRect();
    startY = e.clientY;
    startHeight = rect.height;
    startTop = rect.top;

    // Ensure we're using top/left positioning
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.left = rect.left + 'px';
    panel.style.top = startTop + 'px';

    const onMove = (me: PointerEvent) => {
      const dy = me.clientY - startY;
      const newHeight = startHeight - dy;
      const newTop = startTop + dy;

      if (newHeight >= 180 && newTop >= 0) {
        panel.style.height = newHeight + 'px';
        panel.style.top = newTop + 'px';
      }
    };

    const onUp = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
    };

    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
  });
}

/** Make a panel draggable by its header handle */
function initDrag(handle: HTMLElement, panel: HTMLElement): void {
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  handle.addEventListener('pointerdown', (e: PointerEvent) => {
    // Ignore clicks on buttons inside the header
    if ((e.target as HTMLElement).closest('button')) return;

    e.preventDefault();
    handle.setPointerCapture(e.pointerId);

    const rect = panel.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;

    // Switch to top/left positioning for dragging
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.left = startLeft + 'px';
    panel.style.top = startTop + 'px';

    const onMove = (me: PointerEvent) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;

      let newLeft = startLeft + dx;
      let newTop = startTop + dy;

      // Clamp to viewport
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 60));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - 36));

      panel.style.left = newLeft + 'px';
      panel.style.top = newTop + 'px';
    };

    const onUp = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
    };

    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
  });
}
