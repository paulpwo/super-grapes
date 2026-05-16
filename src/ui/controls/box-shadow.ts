/**
 * Box shadow control.
 * Horizontal offset, vertical offset, blur, spread (sliders), color picker, inset toggle, preview.
 */
import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export function renderBoxShadow(container: HTMLElement, editor: Editor): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Box Shadow</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  const selected = editor.getSelected();

  // State
  let hOffset = 0;
  let vOffset = 4;
  let blur = 8;
  let spread = 0;
  let color = 'rgba(0,0,0,0.3)';
  let inset = false;

  // Parse existing box-shadow
  if (selected) {
    const existing = String((selected as any).getStyle('box-shadow') || '');
    if (existing && existing !== 'none') {
      const isInset = existing.includes('inset');
      const cleaned = existing.replace('inset', '').trim();
      const parts = cleaned.split(/\s+/);
      // Try to parse: h v blur spread color
      if (parts.length >= 3) {
        hOffset = parseInt(parts[0]!) || 0;
        vOffset = parseInt(parts[1]!) || 0;
        blur = parseInt(parts[2]!) || 0;
        spread = parseInt(parts[3]!) || 0;
        // color is the rest
        const colorParts = parts.slice(4);
        if (colorParts.length > 0) {
          color = colorParts.join(' ');
        }
        inset = isInset;
      }
    }
  }

  function applyShadow() {
    if (!selected) return;
    const insetStr = inset ? 'inset ' : '';
    const value = `${insetStr}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`;
    selected.addStyle({ 'box-shadow': value });
    updatePreview();
  }

  function updatePreview() {
    const insetStr = inset ? 'inset ' : '';
    previewInner.style.boxShadow = `${insetStr}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`;
  }

  // Sliders: H-Offset, V-Offset, Blur, Spread
  const sliders = [
    { label: 'H Offset', getter: () => hOffset, setter: (v: number) => { hOffset = v; }, min: -50, max: 50 },
    { label: 'V Offset', getter: () => vOffset, setter: (v: number) => { vOffset = v; }, min: -50, max: 50 },
    { label: 'Blur', getter: () => blur, setter: (v: number) => { blur = v; }, min: 0, max: 100 },
    { label: 'Spread', getter: () => spread, setter: (v: number) => { spread = v; }, min: -50, max: 50 },
  ];

  sliders.forEach(s => {
    const row = document.createElement('div');
    row.className = 'sg-ctrl-row';

    const labelEl = document.createElement('label');
    labelEl.className = 'sg-ctrl-label';
    labelEl.textContent = s.label;

    const field = document.createElement('div');
    field.className = 'sg-ctrl-field sg-slider-ctrl';

    const slider = document.createElement('input');
    slider.className = 'sg-slider-track';
    slider.type = 'range';
    slider.min = String(s.min);
    slider.max = String(s.max);
    slider.value = String(s.getter());

    const numInput = document.createElement('input');
    numInput.className = 'sg-slider-value';
    numInput.type = 'number';
    numInput.min = String(s.min);
    numInput.max = String(s.max);
    numInput.value = String(s.getter());

    const unit = document.createElement('span');
    unit.className = 'sg-slider-unit';
    unit.textContent = 'px';

    slider.addEventListener('input', () => {
      numInput.value = slider.value;
      s.setter(parseInt(slider.value));
      applyShadow();
    });

    numInput.addEventListener('change', () => {
      slider.value = numInput.value;
      s.setter(parseInt(numInput.value));
      applyShadow();
    });

    field.appendChild(slider);
    field.appendChild(numInput);
    field.appendChild(unit);
    row.appendChild(labelEl);
    row.appendChild(field);
    body.appendChild(row);
  });

  // Color
  const colorRow = document.createElement('div');
  colorRow.className = 'sg-ctrl-row';
  const colorLabel = document.createElement('label');
  colorLabel.className = 'sg-ctrl-label';
  colorLabel.textContent = 'Color';
  const colorField = document.createElement('div');
  colorField.className = 'sg-ctrl-field';
  const colorWrap = document.createElement('div');
  colorWrap.className = 'sg-color-swatch-wrap';

  const swatch = document.createElement('div');
  swatch.className = 'sg-color-swatch';
  swatch.style.backgroundColor = color;
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = '#000000';
  swatch.appendChild(colorInput);

  const hexInput = document.createElement('input');
  hexInput.className = 'sg-color-hex-input';
  hexInput.value = color;

  colorInput.addEventListener('focus', () => { (window as any).__sgEditing.interacting = true; });
  colorInput.addEventListener('blur', () => { (window as any).__sgEditing.interacting = false; });
  colorInput.addEventListener('change', () => { (window as any).__sgEditing.interacting = false; });

  colorInput.addEventListener('input', () => {
    color = colorInput.value;
    swatch.style.backgroundColor = color;
    hexInput.value = color;
    applyShadow();
  });

  hexInput.addEventListener('change', () => {
    color = hexInput.value;
    swatch.style.backgroundColor = color;
    applyShadow();
  });

  colorWrap.appendChild(swatch);
  colorWrap.appendChild(hexInput);
  colorField.appendChild(colorWrap);
  colorRow.appendChild(colorLabel);
  colorRow.appendChild(colorField);
  body.appendChild(colorRow);

  // Inset toggle
  const insetRow = document.createElement('div');
  insetRow.className = 'sg-ctrl-row';
  const insetLabel = document.createElement('label');
  insetLabel.className = 'sg-ctrl-label';
  insetLabel.textContent = 'Inset';
  const insetField = document.createElement('div');
  insetField.className = 'sg-ctrl-field';

  const toggleWrap = document.createElement('label');
  toggleWrap.className = 'sg-toggle-switch';
  const toggleInput = document.createElement('input');
  toggleInput.type = 'checkbox';
  toggleInput.checked = inset;
  const track = document.createElement('span');
  track.className = 'sg-toggle-switch-track';
  const thumb = document.createElement('span');
  thumb.className = 'sg-toggle-switch-thumb';
  track.appendChild(thumb);
  toggleWrap.appendChild(toggleInput);
  toggleWrap.appendChild(track);

  toggleInput.addEventListener('change', () => {
    inset = toggleInput.checked;
    applyShadow();
  });

  insetField.appendChild(toggleWrap);
  insetRow.appendChild(insetLabel);
  insetRow.appendChild(insetField);
  body.appendChild(insetRow);

  // Preview
  const previewWrap = document.createElement('div');
  previewWrap.className = 'sg-shadow-preview';
  const previewInner = document.createElement('div');
  previewInner.className = 'sg-shadow-preview-inner';
  previewWrap.appendChild(previewInner);
  updatePreview();
  body.appendChild(previewWrap);

  section.appendChild(header);
  section.appendChild(body);
  container.appendChild(section);
}
