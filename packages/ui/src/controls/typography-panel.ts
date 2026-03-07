/**
 * Typography controls section.
 * Provides font family, size, weight, line height, letter spacing,
 * text color, text align, text decoration, text transform.
 */
import type { Editor } from 'grapesjs';
import { renderSliderRow } from './slider-row';
import { renderColorPicker } from './color-picker';
import { renderIconToggle, type ToggleItem } from './icon-toggle';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const WEB_FONTS = [
  'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New',
  'Verdana', 'Trebuchet MS', 'Palatino Linotype', 'Garamond', 'Impact',
  'Lucida Console', 'Tahoma', 'Comic Sans MS',
  'system-ui', 'sans-serif', 'serif', 'monospace',
];

const FONT_WEIGHTS = [
  { value: '100', label: '100 - Thin' },
  { value: '200', label: '200 - Extra Light' },
  { value: '300', label: '300 - Light' },
  { value: '400', label: '400 - Normal' },
  { value: '500', label: '500 - Medium' },
  { value: '600', label: '600 - Semi Bold' },
  { value: '700', label: '700 - Bold' },
  { value: '800', label: '800 - Extra Bold' },
  { value: '900', label: '900 - Black' },
];

const TEXT_ALIGN_ITEMS: ToggleItem[] = [
  { value: 'left', icon: 'fa-solid fa-align-left', title: 'Left' },
  { value: 'center', icon: 'fa-solid fa-align-center', title: 'Center' },
  { value: 'right', icon: 'fa-solid fa-align-right', title: 'Right' },
  { value: 'justify', icon: 'fa-solid fa-align-justify', title: 'Justify' },
];

const TEXT_DECORATION_ITEMS: ToggleItem[] = [
  { value: 'none', icon: 'fa-solid fa-xmark', title: 'None' },
  { value: 'underline', icon: 'fa-solid fa-underline', title: 'Underline' },
  { value: 'line-through', icon: 'fa-solid fa-strikethrough', title: 'Strikethrough' },
];

const TEXT_TRANSFORM_ITEMS: ToggleItem[] = [
  { value: 'none', icon: 'fa-solid fa-xmark', title: 'None' },
  { value: 'uppercase', icon: 'fa-solid fa-font', title: 'UPPERCASE' },
  { value: 'lowercase', icon: 'fa-solid fa-text-height', title: 'lowercase' },
  { value: 'capitalize', icon: 'fa-solid fa-spell-check', title: 'Capitalize' },
];

export function renderTypographyPanel(container: HTMLElement, editor: Editor): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Typography</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  const selected = editor.getSelected();
  if (!selected) {
    section.appendChild(header);
    section.appendChild(body);
    container.appendChild(section);
    return;
  }

  // Helper to create a style property-like object for direct style manipulation
  function makeStyleProxy(cssProp: string, opts?: { min?: number; max?: number; units?: string[]; unit?: string }) {
    return {
      getValue: () => selected!.getStyle(cssProp) || '',
      get: (key: string) => {
        if (key === 'min') return opts?.min ?? 0;
        if (key === 'max') return opts?.max ?? 100;
        if (key === 'step') return 1;
        if (key === 'units') return opts?.units || [opts?.unit || 'px'];
        if (key === 'unit') return opts?.unit || 'px';
        if (key === 'value') return selected!.getStyle(cssProp) || '';
        return undefined;
      },
      upValue: (val: string) => {
        selected!.addStyle({ [cssProp]: val });
      },
    };
  }

  // Font family
  const fontRow = document.createElement('div');
  fontRow.className = 'sg-ctrl-row';
  const fontLabel = document.createElement('label');
  fontLabel.className = 'sg-ctrl-label';
  fontLabel.textContent = 'Family';
  const fontField = document.createElement('div');
  fontField.className = 'sg-ctrl-field';
  const fontSelect = document.createElement('select');
  fontSelect.className = 'sg-select';

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = 'Default';
  fontSelect.appendChild(defaultOpt);

  WEB_FONTS.forEach(font => {
    const opt = document.createElement('option');
    opt.value = font;
    opt.textContent = font;
    opt.style.fontFamily = font;
    fontSelect.appendChild(opt);
  });

  const currentFont = String(selected.getStyle('font-family') || '');
  fontSelect.value = currentFont.replace(/["']/g, '');
  fontSelect.addEventListener('change', () => {
    selected.addStyle({ 'font-family': fontSelect.value || '' });
  });

  fontField.appendChild(fontSelect);
  fontRow.appendChild(fontLabel);
  fontRow.appendChild(fontField);
  body.appendChild(fontRow);

  // Font size
  renderSliderRow(body, makeStyleProxy('font-size', { min: 8, max: 120, unit: 'px' }), 'Size');

  // Font weight
  const weightRow = document.createElement('div');
  weightRow.className = 'sg-ctrl-row';
  const weightLabel = document.createElement('label');
  weightLabel.className = 'sg-ctrl-label';
  weightLabel.textContent = 'Weight';
  const weightField = document.createElement('div');
  weightField.className = 'sg-ctrl-field';
  const weightSelect = document.createElement('select');
  weightSelect.className = 'sg-select';

  FONT_WEIGHTS.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.value;
    opt.textContent = w.label;
    weightSelect.appendChild(opt);
  });

  weightSelect.value = String(selected.getStyle('font-weight') || '400');
  weightSelect.addEventListener('change', () => {
    selected.addStyle({ 'font-weight': weightSelect.value });
  });

  weightField.appendChild(weightSelect);
  weightRow.appendChild(weightLabel);
  weightRow.appendChild(weightField);
  body.appendChild(weightRow);

  // Line height
  renderSliderRow(body, makeStyleProxy('line-height', { min: 0.5, max: 5, unit: '' }), 'Line Height');

  // Letter spacing
  renderSliderRow(body, makeStyleProxy('letter-spacing', { min: -5, max: 20, unit: 'px' }), 'Spacing');

  // Text color
  renderColorPicker(body, makeStyleProxy('color', {}), 'Color');

  // Text align
  renderIconToggle(body, makeStyleProxy('text-align', {}), 'Align', TEXT_ALIGN_ITEMS);

  // Text decoration
  renderIconToggle(body, makeStyleProxy('text-decoration', {}), 'Decoration', TEXT_DECORATION_ITEMS);

  // Text transform
  renderIconToggle(body, makeStyleProxy('text-transform', {}), 'Transform', TEXT_TRANSFORM_ITEMS);

  section.appendChild(header);
  section.appendChild(body);
  container.appendChild(section);
}
