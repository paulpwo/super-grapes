/**
 * Visual margin/padding box control.
 * Shows a visual box diagram (like browser dev tools) with margin on outside, padding on inside.
 */
import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

export function renderSpacingBox(container: HTMLElement, editor: Editor): void {
  const selected = editor.getSelected();
  if (!selected) return;

  const wrap = document.createElement('div');
  wrap.className = 'sg-spacing-box';

  // Margin layer
  const marginBox = document.createElement('div');
  marginBox.className = 'sg-spacing-box-margin';

  const marginLabel = document.createElement('span');
  marginLabel.className = 'sg-spacing-box-label margin-label';
  marginLabel.textContent = 'margin';
  marginBox.appendChild(marginLabel);

  // Padding layer
  const paddingBox = document.createElement('div');
  paddingBox.className = 'sg-spacing-box-padding';

  const paddingLabel = document.createElement('span');
  paddingLabel.className = 'sg-spacing-box-label padding-label';
  paddingLabel.textContent = 'padding';
  paddingBox.appendChild(paddingLabel);

  // Content center
  const contentBox = document.createElement('div');
  contentBox.className = 'sg-spacing-box-content';
  contentBox.textContent = 'content';

  // Margin inputs
  const marginInputPositions: Record<string, { top: string; left: string; right?: string; bottom?: string }> = {
    top: { top: '4px', left: '50%' },
    right: { top: '50%', left: 'calc(100% - 38px)' },
    bottom: { top: 'calc(100% - 22px)', left: '50%' },
    left: { top: '50%', left: '6px' },
  };

  const paddingInputPositions: Record<string, { top: string; left: string }> = {
    top: { top: '32px', left: '50%' },
    right: { top: '50%', left: 'calc(100% - 72px)' },
    bottom: { top: 'calc(100% - 50px)', left: '50%' },
    left: { top: '50%', left: '44px' },
  };

  SIDES.forEach(side => {
    // Margin input
    const mInput = document.createElement('input');
    mInput.type = 'number';
    const mPos = marginInputPositions[side]!;
    mInput.style.top = mPos.top;
    mInput.style.left = mPos.left;
    if (side === 'top' || side === 'bottom') {
      mInput.style.transform = 'translateX(-50%)';
    } else {
      mInput.style.transform = 'translateY(-50%)';
    }

    const mVal = selected.getStyle(`margin-${side}`) || '0';
    mInput.value = String(parseInt(String(mVal)) || 0);
    mInput.addEventListener('change', () => {
      selected.addStyle({ [`margin-${side}`]: `${mInput.value}px` });
    });
    wrap.appendChild(mInput);

    // Padding input
    const pInput = document.createElement('input');
    pInput.type = 'number';
    const pPos = paddingInputPositions[side]!;
    pInput.style.top = pPos.top;
    pInput.style.left = pPos.left;
    if (side === 'top' || side === 'bottom') {
      pInput.style.transform = 'translateX(-50%)';
    } else {
      pInput.style.transform = 'translateY(-50%)';
    }

    const pVal = selected.getStyle(`padding-${side}`) || '0';
    pInput.value = String(parseInt(String(pVal)) || 0);
    pInput.addEventListener('change', () => {
      selected.addStyle({ [`padding-${side}`]: `${pInput.value}px` });
    });
    wrap.appendChild(pInput);
  });

  wrap.appendChild(marginBox);
  wrap.appendChild(paddingBox);
  wrap.appendChild(contentBox);

  container.appendChild(wrap);
}
