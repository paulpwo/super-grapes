/**
 * Color picker control: color swatch + hex input.
 * Uses native HTML color input as popup picker.
 */

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export function renderColorPicker(container: HTMLElement, property: any, label: string): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = label;

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';

  const wrap = document.createElement('div');
  wrap.className = 'sg-color-swatch-wrap';

  // Get current color
  const currentColor = property.getValue?.() ?? property.get?.('value') ?? '#000000';
  const normalizedColor = normalizeColor(currentColor);

  // Swatch with hidden native color input
  const swatch = document.createElement('div');
  swatch.className = 'sg-color-swatch';
  swatch.style.backgroundColor = currentColor;

  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = normalizedColor;
  swatch.appendChild(colorInput);

  // Hex text input
  const hexInput = document.createElement('input');
  hexInput.className = 'sg-color-hex-input';
  hexInput.type = 'text';
  hexInput.value = currentColor;

  // Prevent panel re-render while picker is open (drag would destroy the element)
  colorInput.addEventListener('focus', () => {
    (window as any).__sgEditing.interacting = true;
  });
  colorInput.addEventListener('blur', () => {
    (window as any).__sgEditing.interacting = false;
  });
  colorInput.addEventListener('change', () => {
    (window as any).__sgEditing.interacting = false;
  });

  // Color input change
  colorInput.addEventListener('input', () => {
    swatch.style.backgroundColor = colorInput.value;
    hexInput.value = colorInput.value;
    property.upValue?.(colorInput.value);
  });

  // Hex input change
  hexInput.addEventListener('change', () => {
    const val = hexInput.value.trim();
    swatch.style.backgroundColor = val;
    try {
      colorInput.value = normalizeColor(val);
    } catch (_e) {
      // non-hex value (e.g. rgba, named color) - can't set on native input
    }
    property.upValue?.(val);
  });

  // Clear button
  const clearBtn = document.createElement('button');
  clearBtn.className = 'sg-edim-unit-btn';
  clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  clearBtn.title = 'Clear';
  clearBtn.style.flexShrink = '0';
  clearBtn.addEventListener('click', () => {
    swatch.style.backgroundColor = 'transparent';
    hexInput.value = '';
    property.upValue?.('');
  });

  wrap.appendChild(swatch);
  wrap.appendChild(hexInput);
  wrap.appendChild(clearBtn);
  field.appendChild(wrap);

  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}

/**
 * Attempts to normalize a CSS color string to #RRGGBB format for the native color input.
 */
function normalizeColor(color: string): string {
  if (!color || color === 'transparent' || color === 'none' || color === '') {
    return '#000000';
  }
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    const r = color[1]!, g = color[2]!, b = color[3]!;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  // Try using a canvas for rgb/rgba/named colors
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      const computed = ctx.fillStyle;
      if (computed.startsWith('#')) return computed;
      // rgb(r, g, b) format
      const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const hex = (n: string) => parseInt(n).toString(16).padStart(2, '0');
        return `#${hex(match[1]!)}${hex(match[2]!)}${hex(match[3]!)}`;
      }
    }
  } catch (_e) {
    // fallback
  }
  return '#000000';
}
