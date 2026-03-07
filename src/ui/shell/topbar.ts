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
        <button class="sg-device-btn" data-device="Mobile" title="Mobile">
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
      <button class="sg-topbar-icon-btn" data-cmd="import" title="Import HTML">
        <i class="fa-solid fa-file-import"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="export" title="Export HTML/CSS">
        <i class="fa-solid fa-file-export"></i>
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

  // Preview — custom implementation (native GrapesJS preview breaks custom UI)
  const previewBtn = el.querySelector('[data-cmd="preview"]') as HTMLButtonElement;
  let isPreview = false;

  previewBtn.addEventListener('click', () => {
    isPreview = !isPreview;
    const editorRoot = document.querySelector('.sg-editor') as HTMLElement;

    if (isPreview) {
      editorRoot.classList.add('sg-preview-mode');
      editor.stopCommand('sw-visibility');
      previewBtn.classList.add('active');

      const exitBtn = document.createElement('button');
      exitBtn.className = 'sg-preview-exit-btn';
      exitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Exit Preview';
      exitBtn.addEventListener('click', () => previewBtn.click());
      editorRoot.appendChild(exitBtn);
    } else {
      editorRoot.classList.remove('sg-preview-mode');
      if (swActive) editor.runCommand('sw-visibility');
      previewBtn.classList.remove('active');

      const exitBtn = editorRoot.querySelector('.sg-preview-exit-btn');
      if (exitBtn) exitBtn.remove();
    }
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

  // Export
  el.querySelector('[data-cmd="export"]')!.addEventListener('click', () => {
    const html = editor.getHtml();
    const css = editor.getCss();
    showExportModal(html, css);
  });

  // Import
  el.querySelector('[data-cmd="import"]')!.addEventListener('click', () => {
    showImportModal(editor);
  });

  // Save
  el.querySelector('[data-cmd="save"]')!.addEventListener('click', () => {
    editor.store();
  });
}

/* ---- Modal helpers ---- */

function showModal(title: string, content: HTMLElement): { backdrop: HTMLElement; close: () => void } {
  const backdrop = document.createElement('div');
  backdrop.className = 'sg-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'sg-modal';

  const header = document.createElement('div');
  header.className = 'sg-modal-header';
  header.innerHTML = `<span class="sg-modal-title">${esc(title)}</span>`;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'sg-modal-close';
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  const close = () => backdrop.remove();
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });

  header.appendChild(closeBtn);
  modal.appendChild(header);

  const body = document.createElement('div');
  body.className = 'sg-modal-body';
  body.appendChild(content);
  modal.appendChild(body);

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  return { backdrop, close };
}

function showExportModal(html: string, css: string): void {
  const wrap = document.createElement('div');
  wrap.className = 'sg-export-wrap';

  const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${css}
</style>
</head>
<body>
${html}
</body>
</html>`;

  // HTML section
  const htmlLabel = document.createElement('label');
  htmlLabel.className = 'sg-modal-label';
  htmlLabel.textContent = 'HTML';
  const htmlArea = document.createElement('textarea');
  htmlArea.className = 'sg-modal-textarea';
  htmlArea.readOnly = true;
  htmlArea.value = html;

  // CSS section
  const cssLabel = document.createElement('label');
  cssLabel.className = 'sg-modal-label';
  cssLabel.textContent = 'CSS';
  const cssArea = document.createElement('textarea');
  cssArea.className = 'sg-modal-textarea';
  cssArea.readOnly = true;
  cssArea.value = css;

  // Buttons
  const actions = document.createElement('div');
  actions.className = 'sg-modal-actions';

  const copyHtmlBtn = document.createElement('button');
  copyHtmlBtn.className = 'sg-modal-btn';
  copyHtmlBtn.textContent = 'Copy HTML';
  copyHtmlBtn.addEventListener('click', () => navigator.clipboard.writeText(html));

  const copyCssBtn = document.createElement('button');
  copyCssBtn.className = 'sg-modal-btn';
  copyCssBtn.textContent = 'Copy CSS';
  copyCssBtn.addEventListener('click', () => navigator.clipboard.writeText(css));

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'sg-modal-btn sg-modal-btn-primary';
  downloadBtn.textContent = 'Download .html';
  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([fullDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.html';
    a.click();
    URL.revokeObjectURL(url);
  });

  actions.appendChild(copyHtmlBtn);
  actions.appendChild(copyCssBtn);
  actions.appendChild(downloadBtn);

  wrap.appendChild(htmlLabel);
  wrap.appendChild(htmlArea);
  wrap.appendChild(cssLabel);
  wrap.appendChild(cssArea);
  wrap.appendChild(actions);

  showModal('Export HTML / CSS', wrap);
}

function showImportModal(editor: Editor): void {
  const wrap = document.createElement('div');
  wrap.className = 'sg-import-wrap';

  const label = document.createElement('label');
  label.className = 'sg-modal-label';
  label.textContent = 'Paste HTML below';

  const textarea = document.createElement('textarea');
  textarea.className = 'sg-modal-textarea';
  textarea.placeholder = '<div>Your HTML here...</div>';
  textarea.rows = 12;

  const actions = document.createElement('div');
  actions.className = 'sg-modal-actions';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.html,.htm';
  fileInput.style.display = 'none';
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (file) {
      file.text().then(text => { textarea.value = text; });
    }
  });

  const uploadBtn = document.createElement('button');
  uploadBtn.className = 'sg-modal-btn';
  uploadBtn.textContent = 'Upload .html';
  uploadBtn.addEventListener('click', () => fileInput.click());

  const loadBtn = document.createElement('button');
  loadBtn.className = 'sg-modal-btn sg-modal-btn-primary';
  loadBtn.textContent = 'Load';

  wrap.appendChild(label);
  wrap.appendChild(textarea);
  wrap.appendChild(fileInput);
  actions.appendChild(uploadBtn);
  actions.appendChild(loadBtn);
  wrap.appendChild(actions);

  const { close } = showModal('Import HTML', wrap);

  loadBtn.addEventListener('click', () => {
    const val = textarea.value.trim();
    if (val) {
      editor.setComponents(val);
      close();
    }
  });
}
