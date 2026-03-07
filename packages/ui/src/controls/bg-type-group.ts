/**
 * Background type selector (Classic/Gradient/Video/Slideshow icons).
 */
import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export type BgType = 'classic' | 'gradient' | 'video' | 'slideshow';

const BG_TYPES: { type: BgType; icon: string; label: string }[] = [
  { type: 'classic', icon: 'fa-solid fa-fill-drip', label: 'Classic' },
  { type: 'gradient', icon: 'fa-solid fa-palette', label: 'Gradient' },
  { type: 'video', icon: 'fa-solid fa-video', label: 'Video' },
  { type: 'slideshow', icon: 'fa-solid fa-images', label: 'Slides' },
];

export function renderBgTypeGroup(
  container: HTMLElement,
  editor: Editor,
  onChange?: (type: BgType) => void,
): void {
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = 'Type';

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';

  const group = document.createElement('div');
  group.className = 'sg-bg-type-group';

  let activeType: BgType = 'classic';

  // Detect current type from component styles
  const selected = editor.getSelected();
  if (selected) {
    const bgImage = String(selected.getStyle('background-image') || '');
    if (bgImage.includes('gradient')) {
      activeType = 'gradient';
    }
  }

  const buttons: HTMLButtonElement[] = [];

  BG_TYPES.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'sg-bg-type-btn';
    if (item.type === activeType) btn.classList.add('active');
    btn.innerHTML = `<i class="${item.icon}"></i><span>${esc(item.label)}</span>`;
    btn.title = item.label;

    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = item.type;
      onChange?.(item.type);
    });

    buttons.push(btn);
    group.appendChild(btn);
  });

  field.appendChild(group);
  row.appendChild(labelEl);
  row.appendChild(field);
  container.appendChild(row);
}
