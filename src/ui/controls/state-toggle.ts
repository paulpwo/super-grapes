/**
 * Normal/Hover state toggle.
 * Switches the GrapesJS style manager state between default and :hover pseudo-class.
 */
import type { Editor } from 'grapesjs';

export function renderStateToggle(container: HTMLElement, editor: Editor): void {
  const wrap = document.createElement('div');
  wrap.className = 'sg-section-state-wrap';

  const states = [
    { label: 'Normal', state: '' },
    { label: 'Hover', state: 'hover' },
  ];

  const buttons: HTMLButtonElement[] = [];
  // Read current state from GrapesJS so toggle stays in sync on re-render
  let currentState = editor.SelectorManager.getState() || '';

  states.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'sg-section-state-btn';
    if (item.state === currentState) btn.classList.add('active');
    btn.textContent = item.label;

    btn.addEventListener('click', () => {
      currentState = item.state;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = editor.getSelected();
      if (selected) {
        // Switch GrapesJS selector state (e.g. '' or ':hover')
        editor.SelectorManager.setState(item.state);
        // Force StyleManager to re-evaluate properties for the new state
        editor.StyleManager.select(selected as any);
      }
    });

    buttons.push(btn);
    wrap.appendChild(btn);
  });

  container.appendChild(wrap);
}
