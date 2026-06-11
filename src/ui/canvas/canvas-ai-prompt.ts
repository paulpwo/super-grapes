/**
 * Canvas AI Prompt — Renders an inline AI prompt interface inside the
 * GrapesJS iframe canvas when the page is completely empty AND AI config
 * is available. Replaces the add-bar in that scenario.
 */
import type { Editor } from 'grapesjs';
import type { AiConfig } from '../../core/types';

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
  /* --- Registered custom property for border spin --- */
  @property --sg-aip-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  /* --- Keyframes --- */
  @keyframes sg-aip-aurora-rotate {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes sg-aip-aurora-pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.55; transform: translate(-50%, -50%) scale(1.2); }
  }
  @keyframes sg-aip-border-spin {
    to { --sg-aip-angle: 360deg; }
  }
  @keyframes sg-aip-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes sg-aip-placeholder-cycle {
    0%, 20% { opacity: 1; }
    25%, 45% { opacity: 0; }
    50%, 70% { opacity: 0; }
    75%, 95% { opacity: 0; }
  }
  @keyframes sg-aip-placeholder-cycle-2 {
    0%, 20% { opacity: 0; }
    25%, 45% { opacity: 1; }
    50%, 70% { opacity: 0; }
    75%, 95% { opacity: 0; }
  }
  @keyframes sg-aip-placeholder-cycle-3 {
    0%, 20% { opacity: 0; }
    25%, 45% { opacity: 0; }
    50%, 70% { opacity: 1; }
    75%, 95% { opacity: 0; }
  }
  @keyframes sg-aip-placeholder-cycle-4 {
    0%, 20% { opacity: 0; }
    25%, 45% { opacity: 0; }
    50%, 70% { opacity: 0; }
    75%, 95% { opacity: 1; }
  }

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
    background: #0d0d15;
    overflow: hidden;
  }

  /* --- Aurora glow layers --- */
  .sg-aip-aurora {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,57,43,0.35) 0%, rgba(231,76,60,0.12) 40%, transparent 70%);
    filter: blur(80px);
    animation: sg-aip-aurora-rotate 18s linear infinite, sg-aip-aurora-pulse 9s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
  .sg-aip-aurora--secondary {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(231,76,60,0.2) 0%, rgba(192,57,43,0.08) 45%, transparent 70%);
    filter: blur(100px);
    animation: sg-aip-aurora-rotate 25s linear infinite reverse, sg-aip-aurora-pulse 12s ease-in-out 3s infinite;
  }

  .sg-aip-title {
    font-size: 36px;
    font-weight: 800;
    color: #f5f5f5;
    margin: 0 0 10px;
    text-align: center;
    letter-spacing: -0.5px;
    line-height: 1.2;
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out both;
  }
  .sg-aip-title-accent {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
    filter: drop-shadow(0 0 10px rgba(192,57,43,0.4));
  }

  .sg-aip-subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.5);
    margin: 0 0 32px;
    text-align: center;
    max-width: 440px;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out 0.1s both;
  }

  /* --- Input bar --- */
  .sg-aip-bar {
    width: 100%;
    max-width: 580px;
    background: rgba(13, 13, 21, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: none;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    animation: sg-aip-fade-in 0.6s ease-out 0.2s both;
  }

  /* Spinning conic-gradient border — same technique as AI topbar button */
  .sg-aip-bar::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 1.5px;
    background: conic-gradient(from var(--sg-aip-angle), #c0392b, #e74c3c, #ff8a80, #e74c3c, #a93226, #c0392b);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: sg-aip-border-spin 3s linear infinite;
    z-index: -1;
    pointer-events: none;
  }

  .sg-aip-bar:focus-within {
    box-shadow: 0 0 30px rgba(192,57,43,0.3);
  }
  .sg-aip-bar:focus-within::before {
    padding: 2px;
    filter: brightness(1.3);
  }

  /* --- Animated placeholder --- */
  .sg-aip-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 12px;
    padding-top: 16px;
    pointer-events: none;
    z-index: 2;
  }
  .sg-aip-placeholder span {
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    color: rgba(255,255,255,0.3);
    font-size: 15px;
    font-family: inherit;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .sg-aip-placeholder span:nth-child(1) { animation: sg-aip-placeholder-cycle 16s ease-in-out infinite; }
  .sg-aip-placeholder span:nth-child(2) { animation: sg-aip-placeholder-cycle-2 16s ease-in-out infinite; }
  .sg-aip-placeholder span:nth-child(3) { animation: sg-aip-placeholder-cycle-3 16s ease-in-out infinite; }
  .sg-aip-placeholder span:nth-child(4) { animation: sg-aip-placeholder-cycle-4 16s ease-in-out infinite; }

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
    position: relative;
    z-index: 3;
  }
  .sg-aip-textarea::placeholder {
    color: transparent;
  }

  .sg-aip-bar-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 3;
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
    color: rgba(255,255,255,0.4);
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
    transition: background 0.15s, transform 0.1s, box-shadow 0.2s;
    padding: 0;
  }
  .sg-aip-send-btn:hover {
    background: #e74c3c;
    box-shadow: 0 0 20px rgba(192,57,43,0.4);
  }
  .sg-aip-send-btn:active {
    transform: scale(0.93);
  }
  .sg-aip-send-btn:disabled {
    opacity: 0.5;
    cursor: default;
    box-shadow: none;
  }

  /* --- Image preview --- */
  .sg-aip-img-preview {
    display: none;
    padding: 0 4px;
    position: relative;
    z-index: 3;
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
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out 0.3s both;
  }
  .sg-aip-chip {
    padding: 8px 16px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .sg-aip-chip i {
    font-size: 12px;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  .sg-aip-chip:hover {
    background: rgba(192,57,43,0.12);
    border-color: rgba(192,57,43,0.4);
    color: #fff;
  }
  .sg-aip-chip:hover i {
    opacity: 1;
  }

  /* --- Loading state --- */
  .sg-aip-loading {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    z-index: 1;
  }
  .sg-aip-loading--visible {
    display: flex;
  }
  .sg-aip-loading-text {
    font-size: 16px;
    color: rgba(255,255,255,0.8);
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
    box-shadow: 0 0 8px rgba(192,57,43,0.5);
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
    position: relative;
    z-index: 1;
  }
  .sg-aip-error--visible {
    display: flex;
  }
  .sg-aip-error-text {
    font-size: 14px;
    color: #f87171;
    line-height: 1.5;
  }
  .sg-aip-retry-btn {
    padding: 8px 20px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 2px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .sg-aip-retry-btn:hover {
    background: rgba(192,57,43,0.12);
    border-color: rgba(192,57,43,0.4);
    color: #fff;
  }

  /* --- Manual CTA --- */
  .sg-aip-manual-cta {
    margin-top: 28px;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out 0.5s both;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .sg-aip-manual-cta a {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 1px;
  }
  .sg-aip-manual-cta a:hover {
    color: #fff;
    border-bottom-color: rgba(255,255,255,0.4);
  }

  /* --- Confirm modal (drag interception) --- */
  .sg-aip-confirm-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: sg-aip-fade-in 0.2s ease-out both;
  }
  .sg-aip-confirm-modal {
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 28px 32px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  }
  .sg-aip-confirm-icon {
    font-size: 28px;
    color: rgba(255,255,255,0.3);
    margin-bottom: 16px;
  }
  .sg-aip-confirm-title {
    font-size: 16px;
    font-weight: 600;
    color: #f5f5f5;
    margin: 0 0 8px;
  }
  .sg-aip-confirm-text {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    margin: 0 0 24px;
    line-height: 1.5;
  }
  .sg-aip-confirm-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .sg-aip-confirm-btn {
    padding: 8px 20px;
    border-radius: 4px;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .sg-aip-confirm-btn--secondary {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7);
  }
  .sg-aip-confirm-btn--secondary:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.25);
    color: #fff;
  }
  .sg-aip-confirm-btn--primary {
    background: #c0392b;
    border: 1px solid #c0392b;
    color: #fff;
  }
  .sg-aip-confirm-btn--primary:hover {
    background: #e74c3c;
    border-color: #e74c3c;
  }

  /* --- Tooltip (unsupported model feedback) --- */
  .sg-aip-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    background: rgba(30,30,46,0.95);
    color: #fbbf24;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .sg-aip-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 16px;
    border: 5px solid transparent;
    border-top-color: rgba(30,30,46,0.95);
  }
  .sg-aip-tooltip--visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SUGGESTIONS = [
  { label: 'Startup Landing', prompt: 'A bold startup landing page with dark hero, feature cards with icons, pricing tiers, and a strong call to action', icon: 'fa-solid fa-bolt' },
  { label: 'Creative Portfolio', prompt: 'A minimal portfolio with full-width project images, short bio section, and a contact form at the bottom', icon: 'fa-solid fa-palette' },
  { label: 'Restaurant Menu', prompt: 'An elegant restaurant page with hero image, menu sections with prices, photo gallery, and reservation CTA', icon: 'fa-solid fa-utensils' },
  { label: 'Event Invite', prompt: 'A single-page event invitation with countdown, schedule timeline, speaker cards, and RSVP form', icon: 'fa-solid fa-calendar-days' },
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
    title.innerHTML = 'What will you <span class="sg-aip-title-accent">create</span> today?';

    const subtitle = iframeDoc.createElement('p');
    subtitle.className = 'sg-aip-subtitle';
    subtitle.textContent = 'Describe your idea and let the AI do the heavy lifting';

    // Input bar
    const bar = iframeDoc.createElement('div');
    bar.className = 'sg-aip-bar';

    // Image preview
    const imgPreview = iframeDoc.createElement('div');
    imgPreview.className = 'sg-aip-img-preview';

    // Animated placeholder overlay
    const placeholder = iframeDoc.createElement('div');
    placeholder.className = 'sg-aip-placeholder';
    const placeholderTexts = [
      "A startup landing with dark hero and pricing cards...",
      "An online store with product grid and checkout...",
      "A restaurant page with menu and reservations...",
      "A personal blog with featured posts and sidebar...",
    ];
    for (const txt of placeholderTexts) {
      const span = iframeDoc.createElement('span');
      span.textContent = txt;
      placeholder.appendChild(span);
    }

    // Textarea
    const textarea = iframeDoc.createElement('textarea');
    textarea.className = 'sg-aip-textarea';
    textarea.placeholder = '';
    textarea.rows = 1;

    // Auto-grow + placeholder visibility
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
      placeholder.style.display = textarea.value ? 'none' : '';
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
      // In endpoint mode the SERVER owns model choice — never block the upload UI.
      // The endpoint contract carries the image; the server decides how to use it.
      if (config.generation?.mode === 'endpoint') return true;
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
    bar.appendChild(placeholder);
    bar.appendChild(textarea);
    bar.appendChild(barFooter);

    // Suggestion chips
    const chips = iframeDoc.createElement('div');
    chips.className = 'sg-aip-chips';
    for (const s of SUGGESTIONS) {
      const chip = iframeDoc.createElement('button');
      chip.className = 'sg-aip-chip';
      chip.innerHTML = '<i class="' + s.icon + '"></i> ' + s.label;
      chip.addEventListener('click', () => {
        textarea.value = s.prompt;
        textarea.dispatchEvent(new Event('input'));
        textarea.focus();
      });
      chips.appendChild(chip);
    }

    // Manual CTA
    const manualCta = iframeDoc.createElement('div');
    manualCta.className = 'sg-aip-manual-cta';
    manualCta.innerHTML = 'or <a>start from scratch</a> by dragging widgets';
    const manualLink = manualCta.querySelector('a')!;
    manualLink.addEventListener('click', () => {
      removePrompt();
    });

    promptView.appendChild(title);
    promptView.appendChild(subtitle);
    promptView.appendChild(bar);
    promptView.appendChild(chips);
    promptView.appendChild(manualCta);

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

    // Aurora glow layers
    const aurora = iframeDoc.createElement('div');
    aurora.className = 'sg-aip-aurora';
    root.appendChild(aurora);

    const aurora2 = iframeDoc.createElement('div');
    aurora2.className = 'sg-aip-aurora sg-aip-aurora--secondary';
    root.appendChild(aurora2);

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
        const { createGenerationBackend, isEndpointMode, extractHtmlFromResponse, checkHtmlQuality } = await import('../../core/ai');

        const backend = createGenerationBackend(config);
        const endpointMode = isEndpointMode(config);
        const request = {
          intent: text,
          context: { mode: 'generate' as const, currentHtml: null, currentCss: null },
          image: attachedImage,
        };

        // First attempt
        let response = await backend.generate(request);
        let extracted = extractHtmlFromResponse(response);
        let quality = checkHtmlQuality(extracted, 'generate');

        // Quality gate + one auto-retry (direct mode only — the endpoint owns its own loop)
        if (!quality.ok && !endpointMode) {
          response = await backend.generate({
            ...request,
            intent: `${text}\n\n[SYSTEM NOTE] Your previous output was incomplete or truncated (${quality.message}). Produce the COMPLETE page with multiple full sections, ending in a footer. Close every tag.`,
          });
          extracted = extractHtmlFromResponse(response);
          quality = checkHtmlQuality(extracted, 'generate');
        }

        // In endpoint mode, still run a basic parse check before inserting.
        if (quality.ok || (endpointMode && checkHtmlQuality(extracted, 'append').ok)) {
          // Apply to canvas — this triggers component:add which removes the prompt
          editor.setComponents(extracted);
        } else {
          throw new Error(quality.message || 'The AI response did not contain valid HTML. Please try a more specific description.');
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

  /** Show a confirmation modal inside the iframe asking the user to confirm manual build */
  function showManualConfirm(): Promise<boolean> {
    return new Promise((resolve) => {
      const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;
      const iframeDoc = iframe?.contentDocument;
      if (!iframeDoc) { resolve(false); return; }

      const backdrop = iframeDoc.createElement('div');
      backdrop.className = 'sg-aip-confirm-backdrop';
      backdrop.innerHTML = `
        <div class="sg-aip-confirm-modal">
          <div class="sg-aip-confirm-icon"><i class="fa-solid fa-hand-pointer"></i></div>
          <p class="sg-aip-confirm-title">Start building manually?</p>
          <p class="sg-aip-confirm-text">You'll skip the AI assistant and build your page by dragging widgets onto the canvas.</p>
          <div class="sg-aip-confirm-actions">
            <button class="sg-aip-confirm-btn sg-aip-confirm-btn--secondary" data-action="cancel">Back to AI</button>
            <button class="sg-aip-confirm-btn sg-aip-confirm-btn--primary" data-action="confirm">Yes, start manually</button>
          </div>
        </div>
      `;

      const close = (confirmed: boolean) => {
        backdrop.remove();
        resolve(confirmed);
      };

      backdrop.querySelector('[data-action="cancel"]')!.addEventListener('click', () => close(false));
      backdrop.querySelector('[data-action="confirm"]')!.addEventListener('click', () => close(true));
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) close(false);
      });

      iframeDoc.body.appendChild(backdrop);
    });
  }

  // Track whether user confirmed manual mode
  let manualModeConfirmed = false;

  // Inject after editor loads
  editor.on('load', () => {
    setTimeout(inject, 300);
  });

  // Intercept drag when AI prompt is visible
  editor.on('block:drag:start', async () => {
    if (manualModeConfirmed) return;

    const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;
    const promptEl = iframe?.contentDocument?.getElementById(PROMPT_ID);
    if (!promptEl) return; // AI prompt not visible, allow drag

    // Stop the current drag
    editor.Blocks.endDrag();

    const confirmed = await showManualConfirm();
    if (confirmed) {
      manualModeConfirmed = true;
      removePrompt();
    }
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
          manualModeConfirmed = false;
          inject();
        }
      }
    }, 200);
  });
}
