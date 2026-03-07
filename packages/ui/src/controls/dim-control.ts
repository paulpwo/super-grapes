/**
 * Enhanced Dimension Control for GrapesJS StyleManager.
 * Renders 4 inputs with micro-incrementers, unit selector, and link button.
 * Works with composite GrapesJS style properties (margin, padding, border-radius).
 */

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const UNITS = ['px', '%', 'em', 'rem', 'vw'];
const SIDE_LABELS = ['T', 'R', 'B', 'L'];

export function renderDimControl(container: HTMLElement, property: any, label: string): void {
  const wrap = document.createElement('div');
  wrap.className = 'sg-edim-wrap';

  // Header
  const headerEl = document.createElement('div');
  headerEl.className = 'sg-edim-header';
  headerEl.innerHTML = `<span class="sg-edim-label">${esc(label)}</span>`;
  wrap.appendChild(headerEl);

  // Get sub-properties (top, right, bottom, left)
  const subProps = property.getProperties?.() || [];
  const inputs: HTMLInputElement[] = [];
  let linked = false;
  let currentUnit = 'px';

  // Inputs row
  const inputsRow = document.createElement('div');
  inputsRow.className = 'sg-edim-inputs';

  // Create 4 input groups
  for (let i = 0; i < 4; i++) {
    const subProp = subProps[i];
    const inputWrap = document.createElement('div');
    inputWrap.className = 'sg-edim-input-wrap';

    // Increment button
    const incBtn = document.createElement('button');
    incBtn.className = 'sg-edim-inc';
    incBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    incBtn.addEventListener('click', () => {
      const val = parseInt(input.value) || 0;
      updateValue(i, val + 1);
    });

    // Input
    const input = document.createElement('input');
    input.className = 'sg-edim-input';
    input.type = 'number';

    if (subProp) {
      const rawVal = subProp.getValue?.() ?? '';
      input.value = parseInt(rawVal) ? String(parseInt(rawVal)) : '0';
      // Detect unit from value
      const unitMatch = String(rawVal).match(/(px|%|em|rem|vw)/);
      if (unitMatch && i === 0) currentUnit = unitMatch[1]!;
    }

    input.addEventListener('change', () => {
      updateValue(i, parseInt(input.value) || 0);
    });

    inputs.push(input);

    // Decrement button
    const decBtn = document.createElement('button');
    decBtn.className = 'sg-edim-dec';
    decBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    decBtn.addEventListener('click', () => {
      const val = parseInt(input.value) || 0;
      updateValue(i, val - 1);
    });

    // Label
    const labelSpan = document.createElement('span');
    labelSpan.className = 'sg-edim-input-label';
    labelSpan.textContent = SIDE_LABELS[i]!;

    inputWrap.appendChild(incBtn);
    inputWrap.appendChild(input);
    inputWrap.appendChild(decBtn);
    inputWrap.appendChild(labelSpan);
    inputsRow.appendChild(inputWrap);
  }

  // Tools column (link + unit)
  const tools = document.createElement('div');
  tools.className = 'sg-edim-tools';

  // Link button
  const linkBtn = document.createElement('button');
  linkBtn.className = 'sg-edim-link-btn';
  linkBtn.innerHTML = '<i class="fa-solid fa-link"></i>';
  linkBtn.title = 'Link values';
  linkBtn.addEventListener('click', () => {
    linked = !linked;
    linkBtn.classList.toggle('linked', linked);
    linkBtn.innerHTML = linked
      ? '<i class="fa-solid fa-link"></i>'
      : '<i class="fa-solid fa-link-slash"></i>';
    if (linked) {
      // Sync all to first value
      const val = parseInt(inputs[0]!.value) || 0;
      for (let i = 1; i < 4; i++) {
        inputs[i]!.value = String(val);
      }
      applyAll();
    }
  });
  tools.appendChild(linkBtn);

  // Unit button
  const unitBtn = document.createElement('button');
  unitBtn.className = 'sg-edim-unit-btn';
  unitBtn.textContent = currentUnit;
  unitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleUnitPopup();
  });
  tools.appendChild(unitBtn);

  inputsRow.appendChild(tools);
  wrap.appendChild(inputsRow);

  // Unit popup (hidden by default)
  const unitPopup = document.createElement('div');
  unitPopup.className = 'sg-edim-unit-popup';
  unitPopup.style.display = 'none';

  UNITS.forEach(unit => {
    const option = document.createElement('button');
    option.className = 'sg-edim-unit-option';
    if (unit === currentUnit) option.classList.add('active');
    option.textContent = unit;
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      currentUnit = unit;
      unitBtn.textContent = unit;
      unitPopup.querySelectorAll('.sg-edim-unit-option').forEach(o =>
        o.classList.toggle('active', o.textContent === unit)
      );
      unitPopup.style.display = 'none';
      applyAll();
    });
    unitPopup.appendChild(option);
  });

  tools.style.position = 'relative';
  tools.appendChild(unitPopup);

  function toggleUnitPopup() {
    unitPopup.style.display = unitPopup.style.display === 'none' ? 'flex' : 'none';
  }

  // Close popup on outside click
  document.addEventListener('click', () => {
    unitPopup.style.display = 'none';
  });

  function updateValue(index: number, value: number) {
    inputs[index]!.value = String(value);
    if (linked) {
      for (let i = 0; i < 4; i++) {
        inputs[i]!.value = String(value);
      }
    }
    applyAll();
  }

  function applyAll() {
    if (subProps.length >= 4) {
      // Update each sub-property
      for (let i = 0; i < 4; i++) {
        const val = inputs[i]!.value;
        const fullVal = val === '0' || val === '' ? '0' : `${val}${currentUnit}`;
        subProps[i]?.upValue?.(fullVal);
      }
    } else {
      // Shorthand: apply as composite value
      const values = inputs.map(inp => {
        const v = inp.value;
        return v === '0' || v === '' ? '0' : `${v}${currentUnit}`;
      });
      property.upValue?.(values.join(' '));
    }
  }

  container.appendChild(wrap);
}
