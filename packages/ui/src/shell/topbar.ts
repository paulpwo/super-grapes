import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export function initTopbar(el: HTMLElement, editor: Editor): void {
  el.innerHTML = `
    <div class="sg-topbar-left">
      <div class="sg-topbar-logo" title="Menu">
        <i class="fa-solid fa-cubes"></i>
      </div>
      <div class="sg-topbar-sep"></div>
      <button class="sg-topbar-icon-btn" data-cmd="undo" title="Undo">
        <i class="fa-solid fa-rotate-left"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="redo" title="Redo">
        <i class="fa-solid fa-rotate-right"></i>
      </button>
      <div class="sg-topbar-sep"></div>
    </div>
    <div class="sg-topbar-center">
      <div class="sg-device-group">
        <button class="sg-device-btn active" data-device="Desktop" title="Desktop">
          <i class="fa-solid fa-desktop"></i>
        </button>
        <button class="sg-device-btn" data-device="Tablet" title="Tablet">
          <i class="fa-solid fa-tablet-screen-button"></i>
        </button>
        <button class="sg-device-btn" data-device="Mobile portrait" title="Mobile">
          <i class="fa-solid fa-mobile-screen-button"></i>
        </button>
      </div>
    </div>
    <div class="sg-topbar-right">
      <button class="sg-topbar-icon-btn active" data-cmd="sw-visibility" title="Component borders">
        <i class="fa-solid fa-border-all"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="preview" title="Preview">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="toggle-navigator" title="Navigator">
        <i class="fa-solid fa-layer-group"></i>
      </button>
      <div class="sg-topbar-sep"></div>
      <button class="sg-save-btn" data-cmd="save">
        <i class="fa-solid fa-floppy-disk"></i>
        Save
      </button>
    </div>
  `;

  // Bind undo / redo
  const undoBtn = el.querySelector('[data-cmd="undo"]') as HTMLButtonElement;
  const redoBtn = el.querySelector('[data-cmd="redo"]') as HTMLButtonElement;

  undoBtn.addEventListener('click', () => editor.UndoManager.undo());
  redoBtn.addEventListener('click', () => editor.UndoManager.redo());

  function updateUndoRedoState() {
    undoBtn.disabled = !editor.UndoManager.hasUndo();
    redoBtn.disabled = !editor.UndoManager.hasRedo();
  }

  editor.on('change:changesCount', updateUndoRedoState);
  updateUndoRedoState();

  // Device switcher
  const deviceBtns = el.querySelectorAll('.sg-device-btn') as NodeListOf<HTMLButtonElement>;
  deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const device = btn.dataset.device!;
      editor.setDevice(device);
      deviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  editor.on('change:device', () => {
    const currentDevice = editor.getDevice();
    deviceBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.device === currentDevice);
    });
  });

  // Component borders (sw-visibility) — active by default
  const swBtn = el.querySelector('[data-cmd="sw-visibility"]') as HTMLButtonElement;
  let swActive = true;

  // Activate on editor load
  editor.on('load', () => {
    editor.runCommand('sw-visibility');
  });

  swBtn.addEventListener('click', () => {
    swActive = !swActive;
    if (swActive) {
      editor.runCommand('sw-visibility');
    } else {
      editor.stopCommand('sw-visibility');
    }
    swBtn.classList.toggle('active', swActive);
  });

  // Preview
  el.querySelector('[data-cmd="preview"]')!.addEventListener('click', () => {
    editor.runCommand('preview');
  });

  // Navigator toggle
  const navBtn = el.querySelector('[data-cmd="toggle-navigator"]') as HTMLButtonElement;
  navBtn.addEventListener('click', () => {
    const navEl = document.querySelector('.sg-navigator');
    if (navEl) {
      const isOpen = navEl.classList.toggle('open');
      navBtn.classList.toggle('active', isOpen);
    }
  });

  // Save
  el.querySelector('[data-cmd="save"]')!.addEventListener('click', () => {
    editor.store();
  });
}
