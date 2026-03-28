/**
 * Canvas AI Prompt — Renders an inline AI prompt interface inside the
 * GrapesJS iframe canvas when the page is completely empty AND AI config
 * is available. Replaces the add-bar in that scenario.
 */
import type { Editor } from 'grapesjs';
import type { AiConfig } from '../../core/types';
import type { ChatMessage, ContentPart } from '../../core/ai';

const PROMPT_ID = 'sg-canvas-ai-prompt';

/** Check whether the canvas wrapper has zero components */
function isCanvasEmpty(editor: Editor): boolean {
  const wrapper = editor.getWrapper();
  if (!wrapper) return true;
  return wrapper.components().length === 0;
}

/** Check whether AI config is set on the editor */
function getAiConfig(editor: Editor): AiConfig | null {
  return (editor as any).__sgAiConfig || null;
}

/** Returns true if the AI prompt should show (empty canvas + AI config) */
export function shouldShowAiPrompt(editor: Editor): boolean {
  return isCanvasEmpty(editor) && !!getAiConfig(editor);
}

function ensureFontAwesome(doc: Document): void {
  if (doc.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) return;
  const link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  doc.head.appendChild(link);
}

const STYLES = `
  #${PROMPT_ID} {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    pointer-events: auto;
    user-select: none;
    z-index: 100;
  }

  .sg-aip-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 10px;
    text-align: center;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }
  .sg-aip-title-accent {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
  }

  .sg-aip-subtitle {
    font-size: 15px;
    color: #6b7280;
    margin: 0 0 32px;
    text-align: center;
    max-width: 440px;
    line-height: 1.5;
  }

  /* --- Input bar --- */
  .sg-aip-bar {
    width: 100%;
    max-width: 580px;
    background: #1e1e2e;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  }

  .sg-aip-textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #e5e5e5;
    font-size: 15px;
    font-family: inherit;
    resize: none;
    line-height: 1.5;
    min-height: 24px;
    max-height: 120px;
    padding: 4px 4px 0;
    box-sizing: border-box;
  }
  .sg-aip-textarea::placeholder {
    color: #6b7280;
  }

  .sg-aip-bar-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sg-aip-bar-left {
    display: flex;
    gap: 4px;
    align-items: center;
    position: relative;
  }

  .sg-aip-icon-btn {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    transition: color 0.15s, background 0.15s;
    padding: 0;
  }
  .sg-aip-icon-btn:hover {
    color: #e5e5e5;
    background: rgba(255,255,255,0.08);
  }
  .sg-aip-icon-btn--recording {
    color: #ef4444 !important;
    animation: sg-aip-pulse 1s ease-in-out infinite;
  }
  @keyframes sg-aip-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .sg-aip-send-btn {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 6px;
    background: #c0392b;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: background 0.15s, transform 0.1s;
    padding: 0;
  }
  .sg-aip-send-btn:hover {
    background: #e74c3c;
  }
  .sg-aip-send-btn:active {
    transform: scale(0.93);
  }
  .sg-aip-send-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* --- Image preview --- */
  .sg-aip-img-preview {
    display: none;
    padding: 0 4px;
  }
  .sg-aip-img-preview--visible {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sg-aip-img-preview img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.15);
  }
  .sg-aip-img-remove {
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 4px;
    background: rgba(255,255,255,0.1);
    color: #e5e5e5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    padding: 0;
  }
  .sg-aip-img-remove:hover {
    background: rgba(255,255,255,0.2);
  }

  /* --- Suggestion chips --- */
  .sg-aip-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
    justify-content: center;
    max-width: 580px;
  }
  .sg-aip-chip {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 2px;
    background: #fff;
    color: #374151;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  .sg-aip-chip:hover {
    background: #fef2f2;
    border-color: #e8a59a;
    color: #c0392b;
  }

  /* --- Loading state --- */
  .sg-aip-loading {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .sg-aip-loading--visible {
    display: flex;
  }
  .sg-aip-loading-text {
    font-size: 16px;
    color: #1a1a2e;
    font-weight: 500;
  }
  .sg-aip-loading-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #c0392b;
    margin: 0 3px;
    animation: sg-aip-dot 1.2s ease-in-out infinite;
  }
  .sg-aip-loading-dots span:nth-child(2) { animation-delay: 0.15s; }
  .sg-aip-loading-dots span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes sg-aip-dot {
    0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
    40% { opacity: 1; transform: scale(1); }
  }

  /* --- Error state --- */
  .sg-aip-error {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    max-width: 480px;
    text-align: center;
  }
  .sg-aip-error--visible {
    display: flex;
  }
  .sg-aip-error-text {
    font-size: 14px;
    color: #dc2626;
    line-height: 1.5;
  }
  .sg-aip-retry-btn {
    padding: 8px 20px;
    border: 1px solid #d1d5db;
    border-radius: 2px;
    background: #fff;
    color: #374151;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
  }
  .sg-aip-retry-btn:hover {
    background: #fef2f2;
    border-color: #e8a59a;
  }

  /* --- Tooltip (unsupported model feedback) --- */
  .sg-aip-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    background: #1e1e2e;
    color: #fbbf24;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }
  .sg-aip-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 16px;
    border: 5px solid transparent;
    border-top-color: #1e1e2e;
  }
  .sg-aip-tooltip--visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SUGGESTIONS = [
  { label: 'Landing Page', prompt: 'A modern SaaS landing page with hero section, features grid, and pricing table' },
  { label: 'Portfolio Website', prompt: 'A creative portfolio page with project gallery, about section, and contact form' },
  { label: 'Contact Page', prompt: 'A professional contact page with contact form, company info, and embedded map placeholder' },
  { label: 'Product Showcase', prompt: 'A product showcase page with hero image, feature highlights, testimonials, and call to action' },
];

export function initCanvasAiPrompt(editor: Editor): void {
  const inject = () => {
    if (!shouldShowAiPrompt(editor)) return;

    const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;
    if (!iframe?.contentDocument?.body) return;

    const iframeDoc = iframe.contentDocument;
    if (iframeDoc.getElementById(PROMPT_ID)) return;

    const config = getAiConfig(editor)!;

    ensureFontAwesome(iframeDoc);

    // Inject styles
    const styleEl = iframeDoc.createElement('style');
    styleEl.id = 'sg-canvas-ai-prompt-styles';
    styleEl.textContent = STYLES;
    iframeDoc.head.appendChild(styleEl);

    // State
    let attachedImage: string | null = null;
    let isLoading = false;
    let isRecording = false;
    let recognition: any = null;

    // Root container
    const root = iframeDoc.createElement('div');
    root.id = PROMPT_ID;

    // --- Prompt view (default) ---
    const promptView = iframeDoc.createElement('div');
    promptView.style.cssText = 'display:flex;flex-direction:column;align-items:center;width:100%;';

    const title = iframeDoc.createElement('h1');
    title.className = 'sg-aip-title';
    title.innerHTML = 'Build beautiful <span class="sg-aip-title-accent">pages</span> with AI';

    const subtitle = iframeDoc.createElement('p');
    subtitle.className = 'sg-aip-subtitle';
    subtitle.textContent = 'Describe what you want and Super Grapes will generate it';

    // Input bar
    const bar = iframeDoc.createElement('div');
    bar.className = 'sg-aip-bar';

    // Image preview
    const imgPreview = iframeDoc.createElement('div');
    imgPreview.className = 'sg-aip-img-preview';

    // Textarea
    const textarea = iframeDoc.createElement('textarea');
    textarea.className = 'sg-aip-textarea';
    textarea.placeholder = 'Describe the page you want to build...';
    textarea.rows = 1;

    // Auto-grow
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    });

    // Bar footer
    const barFooter = iframeDoc.createElement('div');
    barFooter.className = 'sg-aip-bar-footer';

    const barLeft = iframeDoc.createElement('div');
    barLeft.className = 'sg-aip-bar-left';

    // Attach image button
    const attachBtn = iframeDoc.createElement('button');
    attachBtn.className = 'sg-aip-icon-btn';
    attachBtn.title = 'Attach reference image';
    attachBtn.innerHTML = '<i class="fa-solid fa-paperclip"></i>';

    // Hidden file input — must live in the PARENT document, not the iframe,
    // because GrapesJS iframes may block file dialogs.
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Known vision-capable model prefixes
    const VISION_MODELS = [
      'gpt-4o', 'gpt-4-turbo', 'gpt-4-vision',
      'claude-3', 'claude-4',
      'gemini', 'gemini-pro', 'gemini-1.5', 'gemini-2',
      'llava', 'pixtral',
    ];

    function modelSupportsVision(): boolean {
      const m = (config.model || '').toLowerCase();
      return VISION_MODELS.some(prefix => m.startsWith(prefix));
    }

    // Tooltip element for unsupported model feedback
    const tooltip = iframeDoc.createElement('div');
    tooltip.className = 'sg-aip-tooltip';
    tooltip.textContent = `Model "${config.model}" may not support image inputs`;

    attachBtn.addEventListener('click', () => {
      if (!modelSupportsVision()) {
        // Show tooltip feedback
        tooltip.classList.add('sg-aip-tooltip--visible');
        setTimeout(() => tooltip.classList.remove('sg-aip-tooltip--visible'), 3000);
        return;
      }
      fileInput.click();
    });
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        attachedImage = reader.result as string;
        renderImgPreview();
      };
      reader.readAsDataURL(file);
      fileInput.value = '';
    });

    function renderImgPreview() {
      if (!attachedImage) {
        imgPreview.className = 'sg-aip-img-preview';
        imgPreview.innerHTML = '';
        return;
      }
      imgPreview.className = 'sg-aip-img-preview sg-aip-img-preview--visible';
      imgPreview.innerHTML = '';
      const img = iframeDoc.createElement('img');
      img.src = attachedImage;
      const removeBtn = iframeDoc.createElement('button');
      removeBtn.className = 'sg-aip-img-remove';
      removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      removeBtn.addEventListener('click', () => {
        attachedImage = null;
        renderImgPreview();
      });
      imgPreview.appendChild(img);
      imgPreview.appendChild(removeBtn);
    }

    // Mic button (voice-to-text)
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let micBtn: HTMLButtonElement | null = null;

    if (SpeechRecognitionCtor) {
      micBtn = iframeDoc.createElement('button');
      micBtn.className = 'sg-aip-icon-btn';
      micBtn.title = 'Voice to text';
      micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';

      micBtn.addEventListener('click', () => {
        if (isRecording && recognition) {
          recognition.stop();
          return;
        }
        recognition = new SpeechRecognitionCtor();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          isRecording = true;
          micBtn!.classList.add('sg-aip-icon-btn--recording');
        };
        recognition.onresult = (event: any) => {
          const transcript = event.results[0]?.[0]?.transcript || '';
          if (transcript) {
            textarea.value += (textarea.value ? ' ' : '') + transcript;
            textarea.dispatchEvent(new Event('input'));
          }
        };
        recognition.onend = () => {
          isRecording = false;
          micBtn!.classList.remove('sg-aip-icon-btn--recording');
          recognition = null;
        };
        recognition.onerror = () => {
          isRecording = false;
          micBtn!.classList.remove('sg-aip-icon-btn--recording');
          recognition = null;
        };
        recognition.start();
      });
    }

    barLeft.appendChild(attachBtn);
    barLeft.appendChild(tooltip);
    if (micBtn) barLeft.appendChild(micBtn);

    // Send button
    const sendBtn = iframeDoc.createElement('button');
    sendBtn.className = 'sg-aip-send-btn';
    sendBtn.title = 'Generate (Enter)';
    sendBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

    barFooter.appendChild(barLeft);
    barFooter.appendChild(sendBtn);

    bar.appendChild(imgPreview);
    bar.appendChild(textarea);
    bar.appendChild(barFooter);

    // Suggestion chips
    const chips = iframeDoc.createElement('div');
    chips.className = 'sg-aip-chips';
    for (const s of SUGGESTIONS) {
      const chip = iframeDoc.createElement('button');
      chip.className = 'sg-aip-chip';
      chip.textContent = s.label;
      chip.addEventListener('click', () => {
        textarea.value = s.prompt;
        textarea.dispatchEvent(new Event('input'));
        textarea.focus();
      });
      chips.appendChild(chip);
    }

    promptView.appendChild(title);
    promptView.appendChild(subtitle);
    promptView.appendChild(bar);
    promptView.appendChild(chips);

    // --- Loading view ---
    const loadingView = iframeDoc.createElement('div');
    loadingView.className = 'sg-aip-loading';
    loadingView.innerHTML = `
      <div class="sg-aip-loading-dots"><span></span><span></span><span></span></div>
      <div class="sg-aip-loading-text">Generating your page...</div>
    `;

    // --- Error view ---
    const errorView = iframeDoc.createElement('div');
    errorView.className = 'sg-aip-error';

    const errorText = iframeDoc.createElement('div');
    errorText.className = 'sg-aip-error-text';

    const retryBtn = iframeDoc.createElement('button');
    retryBtn.className = 'sg-aip-retry-btn';
    retryBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Try Again';
    retryBtn.addEventListener('click', () => {
      errorView.classList.remove('sg-aip-error--visible');
      promptView.style.display = 'flex';
      textarea.focus();
    });

    errorView.appendChild(errorText);
    errorView.appendChild(retryBtn);

    root.appendChild(promptView);
    root.appendChild(loadingView);
    root.appendChild(errorView);
    iframeDoc.body.appendChild(root);

    // Focus textarea
    setTimeout(() => textarea.focus(), 100);

    // --- Send flow ---
    async function send() {
      const text = textarea.value.trim();
      if (!text && !attachedImage) return;
      if (isLoading) return;
      isLoading = true;

      // Switch to loading state
      promptView.style.display = 'none';
      errorView.classList.remove('sg-aip-error--visible');
      loadingView.classList.add('sg-aip-loading--visible');

      try {
        // Dynamic import to keep bundle small when AI not used
        const { AiClient, extractHtmlFromResponse, validateHtml } = await import('../../core/ai');

        const client = new AiClient(config);
        const history: ChatMessage[] = [];

        let content: string | ContentPart[];
        if (attachedImage) {
          content = [
            { type: 'text', text },
            { type: 'image_url', image_url: { url: attachedImage } },
          ];
        } else {
          content = text;
        }
        history.push({ role: 'user', content });

        const response = await client.chat(history);
        const extracted = extractHtmlFromResponse(response);

        if (validateHtml(extracted)) {
          // Apply to canvas — this triggers component:add which removes the prompt
          editor.setComponents(extracted);
        } else {
          throw new Error('The AI response did not contain valid HTML. Please try a more specific description.');
        }
      } catch (err: any) {
        // Show error state
        loadingView.classList.remove('sg-aip-loading--visible');
        errorText.textContent = err?.message || 'Something went wrong. Please try again.';
        errorView.classList.add('sg-aip-error--visible');
      } finally {
        isLoading = false;
      }
    }

    textarea.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });
    sendBtn.addEventListener('click', send);
  };

  /** Remove the prompt from the iframe and clean up parent elements */
  function removePrompt() {
    const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;
    if (!iframe?.contentDocument) return;
    const el = iframe.contentDocument.getElementById(PROMPT_ID);
    if (el) el.remove();
    const styleEl = iframe.contentDocument.getElementById('sg-canvas-ai-prompt-styles');
    if (styleEl) styleEl.remove();
    // Remove file input from parent document
    document.querySelectorAll<HTMLInputElement>('input[type="file"][accept="image/*"]').forEach(inp => {
      if (inp.style.display === 'none' && !inp.closest('.sg-modal')) inp.remove();
    });
  }

  // Inject after editor loads
  editor.on('load', () => {
    setTimeout(inject, 300);
  });

  // Auto-remove when content is added
  editor.on('component:add', () => {
    // Small delay to let GrapesJS finish processing
    setTimeout(() => {
      if (!isCanvasEmpty(editor)) {
        removePrompt();
      }
    }, 50);
  });

  // Re-show if all content is removed and AI config exists
  editor.on('component:remove', () => {
    setTimeout(() => {
      if (shouldShowAiPrompt(editor)) {
        const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;
        if (iframe?.contentDocument && !iframe.contentDocument.getElementById(PROMPT_ID)) {
          inject();
        }
      }
    }, 200);
  });
}
