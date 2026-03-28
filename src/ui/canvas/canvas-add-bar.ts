/**
 * Canvas Add Bar — Renders an "add section" bar at the bottom of all
 * content inside the GrapesJS iframe canvas.
 * Shows 3 action buttons: + (add section), folder (templates), sparkles (AI).
 */
import type { Editor } from 'grapesjs';
import { openTemplateModal, type SGTemplate } from './template-modal';

/** External API: allow host apps to register templates */
let externalTemplates: SGTemplate[] = [];

export function setExternalTemplates(templates: SGTemplate[]): void {
  externalTemplates = templates;
}

export function getExternalTemplates(): SGTemplate[] {
  return externalTemplates;
}

export function initCanvasAddBar(editor: Editor): void {
  const inject = () => {
    const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;
    if (!iframe?.contentDocument?.body) return;

    const iframeDoc = iframe.contentDocument;
    if (iframeDoc.getElementById('sg-canvas-add-bar')) return;

    // Inject styles
    const style = iframeDoc.createElement('style');
    style.textContent = `
      #sg-canvas-add-bar {
        width: 100%;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        pointer-events: auto;
        user-select: none;
      }
      .sg-add-bar-actions {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .sg-add-bar-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: transform 0.15s, box-shadow 0.15s;
        outline: none;
      }
      .sg-add-bar-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      }
      .sg-add-bar-btn:active {
        transform: scale(0.95);
      }
      .sg-add-bar-btn--add {
        background: #d5d0ca;
        color: #444;
      }
      .sg-add-bar-btn--templates {
        background: #c4bfb9;
        color: #222;
      }
      .sg-add-bar-btn--ai {
        background: #e4b8f0;
        color: #6b2d8b;
      }
      .sg-add-bar-label {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        color: #999;
        letter-spacing: 0.3px;
      }
    `;
    iframeDoc.head.appendChild(style);

    // Build bar element
    const bar = iframeDoc.createElement('div');
    bar.id = 'sg-canvas-add-bar';

    bar.innerHTML = `
      <div class="sg-add-bar-actions">
        <button class="sg-add-bar-btn sg-add-bar-btn--add" data-action="add" title="Add Section">
          <i class="fa-solid fa-plus"></i>
        </button>
        <button class="sg-add-bar-btn sg-add-bar-btn--templates" data-action="templates" title="Templates">
          <i class="fa-solid fa-folder"></i>
        </button>
        <button class="sg-add-bar-btn sg-add-bar-btn--ai" data-action="ai" title="AI Generate">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </button>
      </div>
      <span class="sg-add-bar-label">Drag widget here</span>
    `;

    // Ensure FA is loaded in iframe
    ensureFontAwesome(iframeDoc);

    iframeDoc.body.appendChild(bar);

    // Button handlers
    bar.addEventListener('click', (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.sg-add-bar-btn') as HTMLElement | null;
      if (!btn) return;

      const action = btn.dataset.action;

      if (action === 'add') {
        addEmptySection(editor);
      } else if (action === 'templates') {
        openTemplateModal(editor, externalTemplates);
      } else if (action === 'ai') {
        const aiConfig = (editor as any).__sgAiConfig;
        if (aiConfig) {
          import('../ai/ai-chat-modal').then(({ openAiChatModal }) => {
            openAiChatModal(editor, aiConfig);
          });
        } else {
          addEmptySection(editor);
        }
      }
    });
  };

  // Inject after editor loads and after component changes
  editor.on('load', () => {
    setTimeout(inject, 300);
  });

  // Re-position bar after components change
  editor.on('component:add component:remove', () => {
    setTimeout(() => repositionBar(editor), 100);
  });
}

function addEmptySection(editor: Editor): void {
  const wrapper = editor.getWrapper();
  if (!wrapper) return;

  wrapper.append({
    type: 'sg-section',
    components: [{ type: 'sg-container' }],
  });
}

/** Insert HTML as a new section at the bottom, preserving existing content */
export function insertTemplateHtml(editor: Editor, html: string): void {
  const wrapper = editor.getWrapper();
  if (!wrapper) return;

  // Wrap in a section if the HTML doesn't start with a section
  const trimmed = html.trim();
  const needsWrap = !trimmed.startsWith('<section') && !trimmed.includes('data-gjs-type="sg-section"');

  if (needsWrap) {
    wrapper.append({
      type: 'sg-section',
      components: html,
    });
  } else {
    wrapper.append(html);
  }
}

function repositionBar(editor: Editor): void {
  const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;
  if (!iframe?.contentDocument?.body) return;
  const bar = iframe.contentDocument.getElementById('sg-canvas-add-bar');
  if (!bar) return;
  // Ensure bar is always last
  if (bar.nextElementSibling) {
    iframe.contentDocument.body.appendChild(bar);
  }
}

function ensureFontAwesome(doc: Document): void {
  if (doc.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) return;
  const link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  doc.head.appendChild(link);
}
