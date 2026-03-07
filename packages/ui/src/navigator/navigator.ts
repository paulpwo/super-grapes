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

/** Icons for common component types */
const TYPE_ICONS: Record<string, string> = {
  wrapper: 'fa-solid fa-cube',
  default: 'fa-solid fa-cube',
  text: 'fa-solid fa-font',
  textnode: 'fa-solid fa-font',
  image: 'fa-solid fa-image',
  video: 'fa-solid fa-video',
  link: 'fa-solid fa-link',
  map: 'fa-solid fa-map-location-dot',
  table: 'fa-solid fa-table',
  row: 'fa-solid fa-grip-lines',
  cell: 'fa-solid fa-square',
  section: 'fa-solid fa-layer-group',
  container: 'fa-solid fa-box',
  column: 'fa-solid fa-columns',
  form: 'fa-solid fa-rectangle-list',
  input: 'fa-solid fa-i-cursor',
  textarea: 'fa-solid fa-align-left',
  select: 'fa-solid fa-caret-down',
  button: 'fa-solid fa-square',
  label: 'fa-solid fa-tag',
  checkbox: 'fa-solid fa-square-check',
  radio: 'fa-solid fa-circle-dot',
};

function getTypeIcon(type: string): string {
  return TYPE_ICONS[type] || TYPE_ICONS['default']!;
}

export function initNavigator(el: HTMLElement, editor: Editor): void {
  // Build navigator header
  const navHeader = document.createElement('div');
  navHeader.className = 'sg-navigator-header';
  navHeader.innerHTML = `
    <span class="sg-navigator-title">Navigator</span>
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

  const navBody = document.createElement('div');
  navBody.className = 'sg-navigator-body';

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
      toggle.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
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
