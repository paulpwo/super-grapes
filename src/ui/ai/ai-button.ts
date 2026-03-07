import type { Editor } from 'grapesjs';
import type { AiConfig } from '../../core/types';
import { openAiChatModal } from './ai-chat-modal';

export function initAiButton(
  topbarRight: HTMLElement,
  editor: Editor,
  config: AiConfig,
): void {
  const btn = document.createElement('button');
  btn.className = 'sg-ai-btn';
  btn.title = 'AI Assistant';
  btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> AI Assistant';

  btn.addEventListener('click', () => {
    openAiChatModal(editor, config);
  });

  // Insert before the grid toggle (sw-visibility) — first button in topbar-right
  const gridBtn = topbarRight.querySelector('[data-cmd="sw-visibility"]');
  if (gridBtn) {
    topbarRight.insertBefore(btn, gridBtn);
  } else {
    topbarRight.prepend(btn);
  }
}
