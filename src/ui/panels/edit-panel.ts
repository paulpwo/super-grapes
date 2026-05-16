import type { Editor } from 'grapesjs';
import { renderContentTab } from './edit-content';
import { renderStyleTab } from './edit-style';
import { renderAdvancedTab } from './edit-advanced';
import { renderCodeTab } from './edit-code';

// Flag to prevent re-renders while the user is dragging a slider or interacting with a control
let _isUserInteracting = false;
(window as any).__sgEditing = {
  get interacting() { return _isUserInteracting; },
  set interacting(v: boolean) { _isUserInteracting = v; },
};

export function renderEditPanel(sidebarEl: HTMLElement, editor: Editor): void {
  let currentTab = 'content';
  let editBody: HTMLElement | null = null;

  function getEditBody(): HTMLElement | null {
    if (!editBody || !editBody.isConnected) {
      editBody = sidebarEl.querySelector('#sg-edit-body') as HTMLElement;
    }
    return editBody;
  }

  function renderCurrentTab() {
    const target = getEditBody();
    if (!target) return;
    target.innerHTML = '';

    const selected = editor.getSelected();
    if (!selected) return;

    switch (currentTab) {
      case 'content':
        renderContentTab(target, editor);
        break;
      case 'style':
        renderStyleTab(target, editor);
        break;
      case 'advanced':
        renderAdvancedTab(target, editor);
        break;
      case 'code':
        renderCodeTab(target, editor);
        break;
    }
  }

  // Listen for tab changes (dispatched by sidebar.ts on edit tab click)
  sidebarEl.addEventListener('sg:tab-change', ((e: CustomEvent) => {
    currentTab = e.detail.tab;
    renderCurrentTab();
  }) as EventListener);

  // Re-render on component select — always start on content tab
  editor.on('component:selected', () => {
    currentTab = 'content';
    // Small delay to let sidebar build the edit zone DOM
    requestAnimationFrame(() => {
      editBody = null; // Force re-query since sidebar rebuilds the DOM
      renderCurrentTab();
    });
  });

  // Re-render style tab when style:custom fires (if we're on style tab)
  // Debounce + skip while user is interacting (dragging slider) to avoid killing the drag
  let styleRenderTimer: ReturnType<typeof setTimeout> | null = null;
  editor.on('style:custom', () => {
    if (currentTab === 'style') {
      if (_isUserInteracting) return;
      if (styleRenderTimer) clearTimeout(styleRenderTimer);
      styleRenderTimer = setTimeout(() => {
        renderCurrentTab();
        styleRenderTimer = null;
      }, 100);
    }
  });

  // Re-render content tab when trait:custom fires (if we're on content tab)
  let traitRenderTimer: ReturnType<typeof setTimeout> | null = null;
  editor.on('trait:custom', () => {
    if (currentTab === 'content') {
      if (_isUserInteracting) return;
      if (traitRenderTimer) clearTimeout(traitRenderTimer);
      traitRenderTimer = setTimeout(() => {
        renderCurrentTab();
        traitRenderTimer = null;
      }, 100);
    }
  });
}
