import type { Editor } from 'grapesjs';
import { renderDimControl } from '../controls/dim-control';
import { renderSliderRow } from '../controls/slider-row';
import { renderColorPicker } from '../controls/color-picker';
import { renderIconToggle, type ToggleItem } from '../controls/icon-toggle';
import { renderStateToggle } from '../controls/state-toggle';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

/** Map property types to icon-toggle items for flex properties */
const FLEX_DIRECTION_ITEMS: ToggleItem[] = [
  { value: 'row', icon: 'fa-solid fa-arrow-right', title: 'Row' },
  { value: 'row-reverse', icon: 'fa-solid fa-arrow-left', title: 'Row Reverse' },
  { value: 'column', icon: 'fa-solid fa-arrow-down', title: 'Column' },
  { value: 'column-reverse', icon: 'fa-solid fa-arrow-up', title: 'Column Reverse' },
];

const JUSTIFY_CONTENT_ITEMS: ToggleItem[] = [
  { value: 'flex-start', icon: 'fa-solid fa-align-left', title: 'Start' },
  { value: 'center', icon: 'fa-solid fa-align-center', title: 'Center' },
  { value: 'flex-end', icon: 'fa-solid fa-align-right', title: 'End' },
  { value: 'space-between', icon: 'fa-solid fa-arrows-left-right', title: 'Space Between' },
  { value: 'space-around', icon: 'fa-solid fa-arrows-left-right-to-line', title: 'Space Around' },
];

const ALIGN_ITEMS_ITEMS: ToggleItem[] = [
  { value: 'flex-start', icon: 'fa-solid fa-align-left', title: 'Start' },
  { value: 'center', icon: 'fa-solid fa-align-center', title: 'Center' },
  { value: 'flex-end', icon: 'fa-solid fa-align-right', title: 'End' },
  { value: 'stretch', icon: 'fa-solid fa-up-down', title: 'Stretch' },
  { value: 'baseline', icon: 'fa-solid fa-text-height', title: 'Baseline' },
];

const TEXT_ALIGN_ITEMS: ToggleItem[] = [
  { value: 'left', icon: 'fa-solid fa-align-left', title: 'Left' },
  { value: 'center', icon: 'fa-solid fa-align-center', title: 'Center' },
  { value: 'right', icon: 'fa-solid fa-align-right', title: 'Right' },
  { value: 'justify', icon: 'fa-solid fa-align-justify', title: 'Justify' },
];

const FLEX_TOGGLE_MAP: Record<string, ToggleItem[]> = {
  'flex-direction': FLEX_DIRECTION_ITEMS,
  'justify-content': JUSTIFY_CONTENT_ITEMS,
  'align-items': ALIGN_ITEMS_ITEMS,
  'align-content': ALIGN_ITEMS_ITEMS,
  'align-self': ALIGN_ITEMS_ITEMS,
  'text-align': TEXT_ALIGN_ITEMS,
};

export function renderStyleTab(el: HTMLElement, editor: Editor): void {
  el.innerHTML = '';

  const selected = editor.getSelected();
  if (!selected) {
    el.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-paint-brush"></i><span>Select an element</span></div>';
    return;
  }

  // State toggle at top
  renderStateToggle(el, editor);

  function renderSectors() {
    // Remove all sector content (keep state toggle)
    const stateToggle = el.querySelector('.sg-section-state-wrap');
    el.innerHTML = '';
    if (stateToggle) el.appendChild(stateToggle);

    const sm = editor.StyleManager;
    const sectors = sm.getSectors({ visible: true });

    if (!sectors || sectors.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'sg-empty-state';
      emptyDiv.innerHTML = '<i class="fa-solid fa-paint-brush"></i><span>No style properties</span>';
      el.appendChild(emptyDiv);
      return;
    }

    sectors.forEach((sector: any) => {
      const sectorName = sector.getName?.() || sector.get('name') || 'Styles';
      const properties = sector.getProperties?.() || sector.get('properties') || [];

      if (properties.length === 0) return;

      const section = document.createElement('div');
      section.className = 'sg-ctrl-section';

      const header = document.createElement('div');
      header.className = 'sg-ctrl-section-header';
      header.innerHTML = `
        <span class="sg-ctrl-section-title">${esc(sectorName)}</span>
        <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
      `;
      header.addEventListener('click', () => {
        section.classList.toggle('collapsed');
      });

      const body = document.createElement('div');
      body.className = 'sg-ctrl-section-body';

      properties.forEach((prop: any) => {
        renderProperty(body, prop, editor);
      });

      section.appendChild(header);
      section.appendChild(body);
      el.appendChild(section);
    });
  }

  // Render sectors immediately (edit-panel manages re-renders via style:custom)
  renderSectors();
}

function renderProperty(container: HTMLElement, prop: any, editor: Editor): void {
  const propType = prop.getType?.() || prop.get('type') || 'text';
  const propName = prop.getName?.() || prop.get('property') || '';
  const label = prop.getLabel?.() || prop.get('label') || propName;

  switch (propType) {
    case 'number':
    case 'integer':
    case 'slider': {
      renderSliderRow(container, prop, label);
      break;
    }

    case 'composite':
    case 'stack': {
      renderDimControl(container, prop, label);
      break;
    }

    case 'select':
    case 'radio': {
      // Check if this is a flex property that should use icon toggles
      const toggleItems = FLEX_TOGGLE_MAP[propName];
      if (toggleItems) {
        renderIconToggle(container, prop, label, toggleItems);
      } else {
        renderSelectProp(container, prop, label);
      }
      break;
    }

    case 'color': {
      renderColorPicker(container, prop, label);
      break;
    }

    case 'file': {
      renderFileProp(container, prop, label);
      break;
    }

    default: {
      renderTextProp(container, prop, label);
    }
  }
}

function renderSelectProp(container: HTMLElement, prop: any, label: string): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = label;

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';

  const select = document.createElement('select');
  select.className = 'sg-select';

  const options = prop.getOptions?.() || prop.get('options') || prop.get('list') || [];
  options.forEach((opt: any) => {
    const o = document.createElement('option');
    if (typeof opt === 'string') {
      o.value = opt;
      o.textContent = opt;
    } else {
      o.value = opt.id ?? opt.value ?? '';
      o.textContent = opt.label || opt.name || o.value;
    }
    select.appendChild(o);
  });

  select.value = prop.getValue?.() ?? '';
  select.addEventListener('change', () => {
    prop.upValue(select.value);
  });

  field.appendChild(select);
  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}

function renderFileProp(container: HTMLElement, prop: any, label: string): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = label;

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';

  const input = document.createElement('input');
  input.className = 'sg-input';
  input.type = 'text';
  input.placeholder = 'URL or upload...';
  input.value = prop.getValue?.() ?? '';
  input.addEventListener('change', () => {
    prop.upValue(input.value);
  });

  field.appendChild(input);
  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}

function renderTextProp(container: HTMLElement, prop: any, label: string): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = label;

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';

  const input = document.createElement('input');
  input.className = 'sg-input';
  input.type = 'text';
  input.value = prop.getValue?.() ?? '';
  input.addEventListener('change', () => {
    prop.upValue(input.value);
  });

  field.appendChild(input);
  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}
