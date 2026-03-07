import type { Editor } from 'grapesjs';
import type { AiConfig } from '../../core/types';
import { AiClient, extractHtmlFromResponse, validateHtml } from '../../core/ai';
import type { ChatMessage, ContentPart } from '../../core/ai';

export function openAiChatModal(editor: Editor, config: AiConfig): void {
  const client = new AiClient(config);
  const history: ChatMessage[] = [];
  let attachedImage: string | null = null;
  let isLoading = false;

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'sg-modal-backdrop sg-modal--ai';

  const modal = document.createElement('div');
  modal.className = 'sg-modal';

  // Header
  const header = document.createElement('div');
  header.className = 'sg-modal-header';
  header.innerHTML = `
    <span class="sg-modal-title">
      <i class="fa-solid fa-wand-magic-sparkles sg-ai-title-icon"></i>
      AI Page Builder
    </span>`;
  const closeBtn = document.createElement('button');
  closeBtn.className = 'sg-modal-close';
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  header.appendChild(closeBtn);
  modal.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'sg-modal-body';

  // Messages area
  const messagesEl = document.createElement('div');
  messagesEl.className = 'sg-ai-messages';

  // Empty state (centered prompt)
  const emptyState = document.createElement('div');
  emptyState.className = 'sg-ai-empty';
  emptyState.innerHTML = `
    <div class="sg-ai-empty-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
    <div class="sg-ai-empty-title">What do you want to build?</div>
    <div class="sg-ai-empty-hint">Describe a page, section, or layout and AI will generate it for you.</div>
    <div class="sg-ai-empty-examples">
      <button class="sg-ai-example" data-prompt="A modern SaaS landing page with hero, features, and pricing">Landing page</button>
      <button class="sg-ai-example" data-prompt="A professional contact page with form, map, and company info">Contact page</button>
      <button class="sg-ai-example" data-prompt="A portfolio gallery with filterable project cards and about section">Portfolio</button>
    </div>`;
  messagesEl.appendChild(emptyState);

  // Hidden file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';

  // Image preview (above input bar)
  const imgPreviewContainer = document.createElement('div');
  imgPreviewContainer.className = 'sg-ai-img-preview-bar';
  imgPreviewContainer.style.display = 'none';

  // Input area
  const inputArea = document.createElement('div');
  inputArea.className = 'sg-ai-input-area';

  // Top row: textarea with attach + send
  const inputRow = document.createElement('div');
  inputRow.className = 'sg-ai-input-row';

  const attachBtn = document.createElement('button');
  attachBtn.className = 'sg-ai-input-icon-btn';
  attachBtn.title = 'Attach reference image';
  attachBtn.innerHTML = '<i class="fa-solid fa-image"></i>';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Describe what you want to build...';
  textarea.rows = 1;

  const sendBtn = document.createElement('button');
  sendBtn.className = 'sg-ai-send-btn';
  sendBtn.title = 'Send (Enter)';
  sendBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

  inputRow.appendChild(attachBtn);
  inputRow.appendChild(textarea);
  inputRow.appendChild(sendBtn);

  // Bottom row: context toggle
  const inputFooter = document.createElement('div');
  inputFooter.className = 'sg-ai-input-footer';

  const contextLabel = document.createElement('label');
  contextLabel.className = 'sg-ai-context-toggle';
  const contextCheckbox = document.createElement('input');
  contextCheckbox.type = 'checkbox';
  contextLabel.appendChild(contextCheckbox);
  contextLabel.appendChild(document.createTextNode(' Include current canvas as context'));

  const shortcut = document.createElement('span');
  shortcut.className = 'sg-ai-shortcut-hint';
  shortcut.textContent = 'Enter to send, Shift+Enter for new line';

  inputFooter.appendChild(contextLabel);
  inputFooter.appendChild(shortcut);

  inputArea.appendChild(imgPreviewContainer);
  inputArea.appendChild(inputRow);
  inputArea.appendChild(inputFooter);

  body.appendChild(messagesEl);
  body.appendChild(inputArea);
  modal.appendChild(body);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
  document.body.appendChild(fileInput);

  // --- Behaviors ---

  // Auto-grow textarea
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  });

  // Close
  const close = () => { backdrop.remove(); fileInput.remove(); };
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onEsc); }
  });

  // Example prompt buttons
  emptyState.querySelectorAll('.sg-ai-example').forEach(btn => {
    btn.addEventListener('click', () => {
      textarea.value = (btn as HTMLElement).dataset.prompt || '';
      textarea.dispatchEvent(new Event('input'));
      textarea.focus();
    });
  });

  // Attach image
  attachBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { attachedImage = reader.result as string; renderImagePreview(); };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });

  function renderImagePreview() {
    if (!attachedImage) {
      imgPreviewContainer.style.display = 'none';
      imgPreviewContainer.innerHTML = '';
      return;
    }
    imgPreviewContainer.style.display = 'flex';
    imgPreviewContainer.innerHTML = `
      <div class="sg-ai-img-preview">
        <img src="${attachedImage}" />
        <button class="sg-ai-img-preview-remove"><i class="fa-solid fa-xmark"></i></button>
      </div>`;
    imgPreviewContainer.querySelector('.sg-ai-img-preview-remove')!
      .addEventListener('click', () => { attachedImage = null; renderImagePreview(); });
  }

  // Send
  async function send() {
    const text = textarea.value.trim();
    if (!text && !attachedImage) return;
    if (isLoading) return;

    // Hide empty state on first message
    if (emptyState.parentNode) emptyState.remove();

    // Build context
    let contextPrefix = '';
    if (contextCheckbox.checked) {
      contextPrefix = `[Current template HTML]\n${editor.getHtml()}\n\n[Current template CSS]\n${editor.getCss()}\n\n[User request]\n`;
    }
    const fullText = contextPrefix + text;

    let content: string | ContentPart[];
    if (attachedImage) {
      content = [
        { type: 'text', text: fullText },
        { type: 'image_url', image_url: { url: attachedImage } },
      ];
    } else {
      content = fullText;
    }

    addMessage('user', text + (attachedImage ? ' [image attached]' : ''));
    history.push({ role: 'user', content });

    textarea.value = '';
    textarea.style.height = 'auto';
    attachedImage = null;
    renderImagePreview();

    // Loading
    isLoading = true;
    sendBtn.disabled = true;
    const thinkingEl = document.createElement('div');
    thinkingEl.className = 'sg-ai-thinking';
    thinkingEl.innerHTML = `
      <div class="sg-ai-thinking-dots"><span></span><span></span><span></span></div>
      Generating your page...`;
    messagesEl.appendChild(thinkingEl);
    scrollToBottom();

    try {
      const response = await client.chat(history);
      thinkingEl.remove();
      history.push({ role: 'assistant', content: response });

      const extracted = extractHtmlFromResponse(response);
      const hasValidHtml = validateHtml(extracted);

      if (hasValidHtml) {
        const msgEl = addMessage('assistant', 'Here\'s a preview of the generated page:');

        // Iframe preview
        const previewWrap = document.createElement('div');
        previewWrap.className = 'sg-ai-preview-wrap';
        const iframe = document.createElement('iframe');
        iframe.sandbox.add('allow-same-origin');
        iframe.srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;}html{overflow:hidden;}</style></head><body>${extracted}</body></html>`;
        previewWrap.appendChild(iframe);
        msgEl.appendChild(previewWrap);

        // Actions
        const actionsRow = document.createElement('div');
        actionsRow.className = 'sg-ai-preview-actions';

        const applyBtn = document.createElement('button');
        applyBtn.className = 'sg-ai-apply-btn';
        applyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Apply to Canvas';
        applyBtn.addEventListener('click', () => { editor.setComponents(extracted); close(); });

        const retryBtn = document.createElement('button');
        retryBtn.className = 'sg-ai-retry-btn';
        retryBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Regenerate';
        retryBtn.addEventListener('click', () => textarea.focus());

        actionsRow.appendChild(applyBtn);
        actionsRow.appendChild(retryBtn);
        msgEl.appendChild(actionsRow);
      } else {
        addMessage('assistant', response);
      }
    } catch (err: any) {
      thinkingEl.remove();
      addMessage('error', err?.message || 'Something went wrong. Please try again.');
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
    }
  }

  function addMessage(type: 'user' | 'assistant' | 'error', text: string): HTMLElement {
    const el = document.createElement('div');
    el.className = `sg-ai-msg sg-ai-msg--${type}`;
    el.textContent = text;
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
  }

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  sendBtn.addEventListener('click', send);

  textarea.focus();
}
