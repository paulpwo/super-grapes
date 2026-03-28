import type { Editor } from 'grapesjs';
import { renderDimControl } from '../controls/dim-control';
import { renderSliderRow } from '../controls/slider-row';
import { renderColorPicker } from '../controls/color-picker';
import { renderIconToggle, type ToggleItem } from '../controls/icon-toggle';
import { renderStateToggle } from '../controls/state-toggle';
import { renderBoxShadow } from '../controls/box-shadow';
import { renderBgTypeGroup, type BgType } from '../controls/bg-type-group';
import { renderGradientPicker } from '../controls/gradient-picker';

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

/** Sectors to show per component type — unlisted types get all sectors */
const SECTOR_VISIBILITY: Record<string, string[]> = {
  'sg-text': ['General', 'Dimension', 'Typography', 'Decorations', 'Extra'],
  'sg-heading': ['General', 'Dimension', 'Typography', 'Decorations', 'Extra'],
  'sg-image': ['General', 'Dimension', 'Decorations', 'Extra'],
  'sg-video': ['General', 'Dimension', 'Decorations', 'Extra'],
  'sg-divider': ['General', 'Dimension', 'Decorations', 'Extra'],
  'sg-spacer': ['Dimension'],
  'sg-icon': ['General', 'Dimension', 'Typography', 'Decorations', 'Extra'],
  'sg-button': ['General', 'Dimension', 'Typography', 'Decorations', 'Extra'],
  'sg-section': ['General', 'Dimension', 'Typography', 'Decorations', 'Flex', 'Extra'],
  'sg-container': ['General', 'Dimension', 'Typography', 'Decorations', 'Flex', 'Extra'],
  'sg-column': ['General', 'Dimension', 'Typography', 'Decorations', 'Flex', 'Extra'],
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

    const componentType = selected?.get('type') || '';
    const allowedSectors = SECTOR_VISIBILITY[componentType];

    sectors.forEach((sector: any) => {
      const sectorName = sector.getName?.() || sector.get('name') || 'Styles';

      // Filter sectors based on component type
      if (allowedSectors && !allowedSectors.includes(sectorName)) return;

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

  if (propName === 'box-shadow') {
    renderBoxShadow(container, editor);
    return;
  }

  if (propName === 'background-image') {
    renderBgControls(container, editor);
    return;
  }

  switch (propType) {
    case 'number':
    case 'integer':
    case 'slider': {
      renderSliderRow(container, prop, label);
      break;
    }

    case 'composite': {
      // Only use dim-control for 4-sided spacing properties
      const subProps = prop.getProperties?.() || [];
      if (subProps.length === 4 && isDimensionProp(propName)) {
        renderDimControl(container, prop, label);
      } else {
        renderCompositeGroup(container, prop, label, editor);
      }
      break;
    }

    case 'stack': {
      renderStackGroup(container, prop, label, editor);
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

function renderBgControls(container: HTMLElement, editor: Editor): void {
  const bgWrap = document.createElement('div');
  bgWrap.className = 'sg-ctrl-subsection';

  const gradientWrap = document.createElement('div');

  renderBgTypeGroup(bgWrap, editor, (type: BgType) => {
    gradientWrap.innerHTML = '';
    if (type === 'gradient') {
      renderGradientPicker(gradientWrap, editor);
    } else if (type === 'classic') {
      renderFileProp(gradientWrap, {
        getValue: () => {
          const sel = editor.getSelected();
          return sel ? String(sel.getStyle('background-image') || '') : '';
        },
        upValue: (val: string) => {
          const sel = editor.getSelected();
          if (sel) sel.addStyle({ 'background-image': val });
        },
      }, 'Image URL');
    }
  });

  const selected = editor.getSelected();
  if (selected) {
    const bgImage = String(selected.getStyle('background-image') || '');
    if (bgImage.includes('gradient')) {
      renderGradientPicker(gradientWrap, editor);
    }
  }

  bgWrap.appendChild(gradientWrap);
  container.appendChild(bgWrap);
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

/** Check if a CSS property name is a 4-sided dimension (margin, padding, border-radius) */
function isDimensionProp(name: string): boolean {
  return ['margin', 'padding', 'border-radius'].includes(name);
}

/** Render a composite property as individual sub-property controls */
function renderCompositeGroup(container: HTMLElement, prop: any, label: string, editor: Editor): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-subsection';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-row';
  const headerLabel = document.createElement('label');
  headerLabel.className = 'sg-ctrl-label';
  headerLabel.style.fontWeight = '600';
  headerLabel.textContent = label;
  header.appendChild(headerLabel);
  section.appendChild(header);

  const subProps = prop.getProperties?.() || [];
  subProps.forEach((sub: any) => {
    renderProperty(section, sub, editor);
  });

  container.appendChild(section);
}

/** Render a stack property with add/remove layer support */
function renderStackGroup(container: HTMLElement, prop: any, label: string, editor: Editor): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-subsection';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-row';
  header.style.alignItems = 'center';

  const headerLabel = document.createElement('label');
  headerLabel.className = 'sg-ctrl-label';
  headerLabel.style.fontWeight = '600';
  headerLabel.textContent = label;

  const addBtn = document.createElement('button');
  addBtn.className = 'sg-edim-unit-btn';
  addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  addBtn.title = 'Add layer';
  addBtn.addEventListener('click', () => {
    prop.addLayer?.({}, { at: 0 });
  });

  header.appendChild(headerLabel);
  header.appendChild(addBtn);
  section.appendChild(header);

  const layers = prop.getLayers?.() || [];
  if (layers.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'sg-empty-state';
    empty.style.padding = '8px';
    empty.innerHTML = '<span style="font-size:11px;opacity:0.6">No layers — click + to add</span>';
    section.appendChild(empty);
  }

  layers.forEach((layer: any, idx: number) => {
    const layerWrap = document.createElement('div');
    layerWrap.className = 'sg-stack-layer';

    const layerHeader = document.createElement('div');
    layerHeader.className = 'sg-ctrl-row';
    layerHeader.style.alignItems = 'center';

    const layerLabel = document.createElement('span');
    layerLabel.className = 'sg-ctrl-label';
    layerLabel.style.fontSize = '10px';
    layerLabel.style.opacity = '0.7';
    layerLabel.textContent = `Layer ${idx + 1}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'sg-edim-unit-btn';
    removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    removeBtn.title = 'Remove layer';
    removeBtn.style.fontSize = '10px';
    removeBtn.addEventListener('click', () => {
      prop.removeLayer?.(layer);
    });

    layerHeader.appendChild(layerLabel);
    layerHeader.appendChild(removeBtn);
    layerWrap.appendChild(layerHeader);

    const layerProps = layer.getProperties?.() || [];
    layerProps.forEach((sub: any) => {
      renderProperty(layerWrap, sub, editor);
    });

    section.appendChild(layerWrap);
  });

  container.appendChild(section);
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
