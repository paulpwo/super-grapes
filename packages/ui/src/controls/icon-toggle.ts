/**
 * Icon toggle group for GrapesJS style properties.
 * Renders a row of icon buttons, one active at a time.
 */

export interface ToggleItem {
  value: string;
  icon: string;
  title?: string;
}

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export function renderIconToggle(
  container: HTMLElement,
  property: any,
  label: string,
  items: ToggleItem[],
): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = label;

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';

  const group = document.createElement('div');
  group.className = 'sg-icon-toggle-group';

  const currentVal = property.getValue?.() ?? property.get?.('value') ?? '';

  const buttons: HTMLButtonElement[] = [];

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'sg-icon-toggle-btn';
    if (item.value === currentVal) btn.classList.add('active');
    btn.title = item.title || item.value;
    btn.innerHTML = `<i class="${item.icon}"></i>`;
    btn.dataset.value = item.value;

    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      property.upValue?.(item.value);
    });

    buttons.push(btn);
    group.appendChild(btn);
  });

  field.appendChild(group);
  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}
