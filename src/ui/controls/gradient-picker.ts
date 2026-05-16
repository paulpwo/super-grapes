/**
 * Gradient builder control.
 * Direction select, two color stops with color pickers + position sliders, preview bar.
 */
import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const DIRECTIONS = [
  { value: 'to right', label: 'To Right' },
  { value: 'to left', label: 'To Left' },
  { value: 'to bottom', label: 'To Bottom' },
  { value: 'to top', label: 'To Top' },
  { value: 'to bottom right', label: 'Diagonal (BR)' },
  { value: 'to top left', label: 'Diagonal (TL)' },
  { value: 'circle', label: 'Radial' },
];

export function renderGradientPicker(container: HTMLElement, editor: Editor): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Gradient</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  const selected = editor.getSelected();

  // State
  let direction = 'to right';
  let color1 = '#c0392b';
  let pos1 = 0;
  let color2 = '#e04535';
  let pos2 = 100;

  // Parse existing gradient
  if (selected) {
    const bgImage = String((selected as any).getStyle('background-image') || '');
    const linearMatch = bgImage.match(/linear-gradient\(([^,]+),\s*(#?\w+)\s+(\d+)%?,\s*(#?\w+)\s+(\d+)%?\)/);
    if (linearMatch) {
      direction = linearMatch[1]!.trim();
      color1 = linearMatch[2]!;
      pos1 = parseInt(linearMatch[3]!) || 0;
      color2 = linearMatch[4]!;
      pos2 = parseInt(linearMatch[5]!) || 100;
    }
  }

  function applyGradient() {
    if (!selected) return;
    const gradientType = direction === 'circle' ? 'radial-gradient' : 'linear-gradient';
    const dir = direction === 'circle' ? 'circle' : direction;
    const value = `${gradientType}(${dir}, ${color1} ${pos1}%, ${color2} ${pos2}%)`;
    selected.addStyle({ 'background-image': value });
    updatePreview();
  }

  function updatePreview() {
    const gradientType = direction === 'circle' ? 'radial-gradient' : 'linear-gradient';
    const dir = direction === 'circle' ? 'circle' : direction;
    preview.style.background = `${gradientType}(${dir}, ${color1} ${pos1}%, ${color2} ${pos2}%)`;
  }

  // Direction select
  const dirRow = document.createElement('div');
  dirRow.className = 'sg-ctrl-row';
  const dirLabel = document.createElement('label');
  dirLabel.className = 'sg-ctrl-label';
  dirLabel.textContent = 'Direction';
  const dirField = document.createElement('div');
  dirField.className = 'sg-ctrl-field';
  const dirSelect = document.createElement('select');
  dirSelect.className = 'sg-select';
  DIRECTIONS.forEach(d => {
    const o = document.createElement('option');
    o.value = d.value;
    o.textContent = d.label;
    dirSelect.appendChild(o);
  });
  dirSelect.value = direction;
  dirSelect.addEventListener('change', () => {
    direction = dirSelect.value;
    applyGradient();
  });
  dirField.appendChild(dirSelect);
  dirRow.appendChild(dirLabel);
  dirRow.appendChild(dirField);
  body.appendChild(dirRow);

  // Color Stop 1
  renderColorStop(body, 'Color 1', color1, pos1, (c, p) => {
    color1 = c;
    pos1 = p;
    applyGradient();
  });

  // Color Stop 2
  renderColorStop(body, 'Color 2', color2, pos2, (c, p) => {
    color2 = c;
    pos2 = p;
    applyGradient();
  });

  // Preview bar
  const preview = document.createElement('div');
  preview.className = 'sg-gradient-preview';
  updatePreview();
  body.appendChild(preview);

  section.appendChild(header);
  section.appendChild(body);
  container.appendChild(section);
}

function renderColorStop(
  container: HTMLElement,
  label: string,
  initialColor: string,
  initialPos: number,
  onChange: (color: string, pos: number) => void,
): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = label;

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';
  field.style.gap = '4px';

  // Color swatch
  const swatch = document.createElement('div');
  swatch.className = 'sg-color-swatch';
  swatch.style.backgroundColor = initialColor;
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = initialColor;
  swatch.appendChild(colorInput);

  let currentColor = initialColor;
  let currentPos = initialPos;

  colorInput.addEventListener('input', () => {
    currentColor = colorInput.value;
    swatch.style.backgroundColor = currentColor;
    onChange(currentColor, currentPos);
  });

  // Position slider
  const posSlider = document.createElement('input');
  posSlider.className = 'sg-slider-track';
  posSlider.type = 'range';
  posSlider.min = '0';
  posSlider.max = '100';
  posSlider.value = String(initialPos);
  posSlider.style.flex = '1';

  const posInput = document.createElement('input');
  posInput.className = 'sg-slider-value';
  posInput.type = 'number';
  posInput.min = '0';
  posInput.max = '100';
  posInput.value = String(initialPos);

  const unitSpan = document.createElement('span');
  unitSpan.className = 'sg-slider-unit';
  unitSpan.textContent = '%';

  posSlider.addEventListener('input', () => {
    posInput.value = posSlider.value;
    currentPos = parseInt(posSlider.value);
    onChange(currentColor, currentPos);
  });

  posInput.addEventListener('change', () => {
    posSlider.value = posInput.value;
    currentPos = parseInt(posInput.value);
    onChange(currentColor, currentPos);
  });

  field.appendChild(swatch);
  field.appendChild(posSlider);
  field.appendChild(posInput);
  field.appendChild(unitSpan);

  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}
