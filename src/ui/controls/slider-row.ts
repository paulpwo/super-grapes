/**
 * Slider + number input row for GrapesJS style properties.
 */

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export function renderSliderRow(container: HTMLElement, property: any, label: string): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = label;

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field sg-slider-ctrl';

  // Determine min, max, unit from property
  const min = property.get?.('min') ?? 0;
  const max = property.get?.('max') ?? 100;
  const step = property.get?.('step') ?? 1;
  const units = property.get?.('units') || property.get?.('unit') || ['px'];
  const unit = Array.isArray(units) ? units[0] || 'px' : units || 'px';

  // Current value
  const rawVal = property.getValue?.() ?? property.get?.('value') ?? '';
  const numVal = parseFloat(rawVal) || 0;

  // Slider
  const slider = document.createElement('input');
  slider.className = 'sg-slider-track';
  slider.type = 'range';
  slider.min = String(min);
  slider.max = String(max);
  slider.step = String(step);
  slider.value = String(numVal);

  // Number input
  const numInput = document.createElement('input');
  numInput.className = 'sg-slider-value';
  numInput.type = 'number';
  numInput.min = String(min);
  numInput.max = String(max);
  numInput.step = String(step);
  numInput.value = String(numVal);

  // Unit label
  const unitSpan = document.createElement('span');
  unitSpan.className = 'sg-slider-unit';
  unitSpan.textContent = unit;

  // Sync slider → input
  slider.addEventListener('input', () => {
    numInput.value = slider.value;
    applyValue(slider.value);
  });

  // Sync input → slider
  numInput.addEventListener('change', () => {
    slider.value = numInput.value;
    applyValue(numInput.value);
  });

  function applyValue(val: string) {
    const numericVal = parseFloat(val);
    if (isNaN(numericVal)) return;
    const fullVal = unit && unit !== '' ? `${numericVal}${unit}` : `${numericVal}`;
    property.upValue?.(fullVal);
  }

  field.appendChild(slider);
  field.appendChild(numInput);
  field.appendChild(unitSpan);

  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}
