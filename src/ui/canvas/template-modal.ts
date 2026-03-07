/**
 * Template Modal — Shows a modal to browse, upload, and insert templates.
 * Templates follow the model: { id, name, data, createdAt }
 * External integrations can pass templates via setExternalTemplates().
 * Users can also upload HTML files from their computer.
 */
import type { Editor } from 'grapesjs';
import { insertTemplateHtml } from './canvas-add-bar';

export interface SGTemplate {
  id: string;
  name: string;
  data: string; // HTML string
  createdAt?: string; // ISO date string
}

/** Local templates stored in memory (uploaded by user) */
let localTemplates: SGTemplate[] = [];

export function openTemplateModal(editor: Editor, externalTemplates: SGTemplate[] = []): void {
  const modal = editor.Modal;
  modal.setTitle('Templates');

  const container = document.createElement('div');
  container.className = 'sg-template-modal';

  const allTemplates = [...externalTemplates, ...localTemplates];

  renderModalContent(container, allTemplates, editor);

  modal.setContent(container);
  modal.open();
}

function renderModalContent(container: HTMLElement, templates: SGTemplate[], editor: Editor): void {
  container.innerHTML = '';

  // Inject scoped styles
  const style = document.createElement('style');
  style.textContent = `
    .sg-template-modal {
      min-height: 300px;
      font-family: var(--sg-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }
    .sg-template-toolbar {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .sg-template-toolbar-btn {
      padding: 8px 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      border: 1px solid var(--sg-border, #3a3c3f) !important;
      background: var(--sg-bg-3, #282a2e) !important;
      color: var(--sg-text, #e0e0e0) !important;
      transition: background 0.15s !important;
    }
    .sg-template-toolbar-btn:hover {
      background: var(--sg-bg-4, #464646) !important;
    }
    .sg-template-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 16px;
      color: var(--sg-text-dim, #5e5e64);
    }
    .sg-template-empty i {
      font-size: 40px;
      opacity: 0.4;
    }
    .sg-template-empty-text {
      font-size: 14px;
      text-align: center;
    }
    .sg-template-add-btn {
      padding: 10px 24px !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      background: var(--sg-accent, #c0392b) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      transition: background 0.15s !important;
    }
    .sg-template-add-btn:hover {
      background: var(--sg-accent-hover, #e04535) !important;
    }
    .sg-template-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sg-template-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: var(--sg-bg-3, #282a2e);
      border: 1px solid var(--sg-border, #3a3c3f);
      border-radius: 2px;
      gap: 12px;
    }
    .sg-template-item-icon {
      font-size: 20px;
      color: var(--sg-text-dim, #5e5e64);
      flex-shrink: 0;
    }
    .sg-template-item-info {
      flex: 1;
      min-width: 0;
    }
    .sg-template-item-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--sg-text, #e0e0e0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sg-template-item-date {
      font-size: 11px;
      color: var(--sg-text-dim, #5e5e64);
      margin-top: 2px;
    }
    .sg-template-item-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    .sg-template-insert-btn {
      padding: 6px 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      background: var(--sg-accent, #c0392b) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      transition: background 0.15s !important;
    }
    .sg-template-insert-btn:hover {
      background: var(--sg-accent-hover, #e04535) !important;
    }
    .sg-template-delete-btn {
      padding: 6px 10px !important;
      font-size: 12px !important;
      background: none !important;
      color: var(--sg-text-dim, #5e5e64) !important;
      border: 1px solid var(--sg-border, #3a3c3f) !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      transition: color 0.15s, border-color 0.15s !important;
    }
    .sg-template-delete-btn:hover {
      color: #e74c3c !important;
      border-color: #e74c3c !important;
    }
  `;
  container.appendChild(style);

  // Toolbar with upload button
  const toolbar = document.createElement('div');
  toolbar.className = 'sg-template-toolbar';

  const uploadBtn = document.createElement('button');
  uploadBtn.className = 'sg-template-toolbar-btn';
  uploadBtn.innerHTML = '<i class="fa-solid fa-file-import"></i> Upload HTML';
  uploadBtn.addEventListener('click', () => handleFileUpload(container, templates, editor));
  toolbar.appendChild(uploadBtn);
  container.appendChild(toolbar);

  if (templates.length === 0) {
    // Empty state with central add button
    const empty = document.createElement('div');
    empty.className = 'sg-template-empty';
    empty.innerHTML = `
      <i class="fa-solid fa-folder-open"></i>
      <div class="sg-template-empty-text">No templates yet</div>
    `;

    const addBtn = document.createElement('button');
    addBtn.className = 'sg-template-add-btn';
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Template';
    addBtn.addEventListener('click', () => handleFileUpload(container, templates, editor));
    empty.appendChild(addBtn);

    container.appendChild(empty);
  } else {
    // Template list
    const list = document.createElement('div');
    list.className = 'sg-template-list';

    for (const tmpl of templates) {
      const item = document.createElement('div');
      item.className = 'sg-template-item';

      const dateStr = tmpl.createdAt
        ? new Date(tmpl.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '';

      item.innerHTML = `
        <i class="fa-solid fa-file-code sg-template-item-icon"></i>
        <div class="sg-template-item-info">
          <div class="sg-template-item-name">${escHtml(tmpl.name)}</div>
          ${dateStr ? `<div class="sg-template-item-date">${dateStr}</div>` : ''}
        </div>
        <div class="sg-template-item-actions"></div>
      `;

      const actions = item.querySelector('.sg-template-item-actions')!;

      const insertBtn = document.createElement('button');
      insertBtn.className = 'sg-template-insert-btn';
      insertBtn.textContent = 'Insert';
      insertBtn.addEventListener('click', () => {
        insertTemplateHtml(editor, tmpl.data);
        editor.Modal.close();
      });
      actions.appendChild(insertBtn);

      // Delete button only for local templates
      if (localTemplates.some((t) => t.id === tmpl.id)) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'sg-template-delete-btn';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.addEventListener('click', () => {
          localTemplates = localTemplates.filter((t) => t.id !== tmpl.id);
          const allUpdated = [...(templates.filter((t) => t.id !== tmpl.id))];
          renderModalContent(container, allUpdated, editor);
        });
        actions.appendChild(deleteBtn);
      }

      list.appendChild(item);
    }

    container.appendChild(list);
  }
}

function handleFileUpload(container: HTMLElement, templates: SGTemplate[], editor: Editor): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.html,.htm';
  input.style.display = 'none';

  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const html = reader.result as string;
      const name = file.name.replace(/\.(html|htm)$/i, '');

      const newTemplate: SGTemplate = {
        id: 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
        name,
        data: html,
        createdAt: new Date().toISOString(),
      };

      localTemplates.push(newTemplate);
      const allUpdated = [...templates, newTemplate];
      renderModalContent(container, allUpdated, editor);
    };
    reader.readAsText(file);
  });

  document.body.appendChild(input);
  input.click();
  input.remove();
}

function escHtml(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
