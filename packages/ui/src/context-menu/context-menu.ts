/**
 * Right-click context menu for canvas components.
 */
import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

interface MenuItem {
  label: string;
  icon: string;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  separator?: boolean;
  action?: (editor: Editor, component: any) => void;
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Edit',
    icon: 'fa-solid fa-pencil',
    action: (editor, comp) => {
      editor.select(comp);
    },
  },
  {
    label: 'Duplicate',
    icon: 'fa-solid fa-copy',
    shortcut: 'Ctrl+D',
    action: (editor, comp) => {
      const parent = comp.parent();
      if (parent) {
        const index = parent.components().indexOf(comp);
        const clone = comp.clone();
        parent.components().add(clone, { at: index + 1 });
        editor.select(clone);
      }
    },
  },
  {
    label: 'Copy',
    icon: 'fa-regular fa-copy',
    shortcut: 'Ctrl+C',
    action: (editor, comp) => {
      editor.runCommand('tlb-clone');
    },
  },
  { label: '', icon: '', separator: true },
  {
    label: 'Move Up',
    icon: 'fa-solid fa-arrow-up',
    action: (_editor, comp) => {
      comp.move(comp.parent(), { at: comp.index() - 1 });
    },
  },
  {
    label: 'Move Down',
    icon: 'fa-solid fa-arrow-down',
    action: (_editor, comp) => {
      comp.move(comp.parent(), { at: comp.index() + 2 });
    },
  },
  {
    label: 'Select Parent',
    icon: 'fa-solid fa-arrow-turn-up',
    action: (editor, comp) => {
      const parent = comp.parent();
      if (parent && parent !== editor.getWrapper()) {
        editor.select(parent);
      }
    },
  },
  { label: '', icon: '', separator: true },
  {
    label: 'Delete',
    icon: 'fa-solid fa-trash',
    shortcut: 'Del',
    danger: true,
    action: (editor, comp) => {
      comp.remove();
      editor.select(null as any);
    },
  },
];

export function initContextMenu(el: HTMLElement, editor: Editor): void {
  let targetComponent: any = null;

  function show(x: number, y: number, component: any) {
    targetComponent = component;
    el.innerHTML = '';

    MENU_ITEMS.forEach(item => {
      if (item.separator) {
        const sep = document.createElement('div');
        sep.className = 'sg-context-menu-sep';
        el.appendChild(sep);
        return;
      }

      const menuItem = document.createElement('div');
      menuItem.className = 'sg-context-menu-item';
      if (item.danger) menuItem.classList.add('danger');
      if (item.disabled) menuItem.classList.add('disabled');

      menuItem.innerHTML = `
        <span class="sg-context-menu-item-icon"><i class="${item.icon}"></i></span>
        <span class="sg-context-menu-item-label">${esc(item.label)}</span>
        ${item.shortcut ? `<span class="sg-context-menu-item-shortcut">${esc(item.shortcut)}</span>` : ''}
      `;

      menuItem.addEventListener('click', () => {
        if (item.action && targetComponent) {
          item.action(editor, targetComponent);
        }
        hide();
      });

      el.appendChild(menuItem);
    });

    // Position — keep menu on screen
    const menuW = 200;
    const menuH = el.children.length * 32;
    const posX = x + menuW > window.innerWidth ? window.innerWidth - menuW - 8 : x;
    const posY = y + menuH > window.innerHeight ? window.innerHeight - menuH - 8 : y;

    el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;
    el.classList.add('open');
  }

  function hide() {
    el.classList.remove('open');
    targetComponent = null;
  }

  // Listen for right-click on the canvas
  // GrapesJS canvas is in an iframe, so we need to attach to the iframe's document
  editor.on('load', () => {
    const canvasDoc = editor.Canvas.getDocument();
    if (canvasDoc) {
      canvasDoc.addEventListener('contextmenu', (e: Event) => {
        const me = e as MouseEvent;
        me.preventDefault();

        // Find the component at this point
        const canvasEl = editor.Canvas.getElement();
        const frameRect = canvasEl.getBoundingClientRect();

        // Get clicked element and find its GrapesJS component
        const target = me.target as HTMLElement;
        if (target) {
          // Use GrapesJS API to find component from element
          const component = editor.Components.getById(target.id) ||
            findComponentByEl(editor, target);
          if (component) {
            editor.select(component);
            show(me.clientX + frameRect.left, me.clientY + frameRect.top, component);
          }
        }
      });
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!el.contains(e.target as Node)) {
      hide();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });
}

/**
 * Walk the component tree to find a component matching the given DOM element.
 */
function findComponentByEl(editor: Editor, targetEl: HTMLElement): any {
  const wrapper = editor.getWrapper();
  if (!wrapper) return null;

  function walk(component: any): any {
    const el = component.getEl?.();
    if (el === targetEl) return component;
    const children = component.components();
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const found = walk(children.at(i));
        if (found) return found;
      }
    }
    return null;
  }

  return walk(wrapper);
}
