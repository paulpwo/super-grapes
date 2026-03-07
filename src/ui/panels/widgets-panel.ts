import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const BLOCK_ICONS: Record<string, string> = {
  'sg-section':      'fa-solid fa-layer-group',
  'sg-2-columns':    'fa-solid fa-columns',
  'sg-3-columns':    'fa-solid fa-columns',
  'sg-4-columns':    'fa-solid fa-table-cells',
  'sg-sidebar-left': 'fa-solid fa-table-columns',
  'sg-sidebar-right':'fa-solid fa-table-columns',
  'sg-heading':      'fa-solid fa-heading',
  'sg-text':         'fa-solid fa-font',
  'sg-image':        'fa-solid fa-image',
  'sg-video':        'fa-solid fa-video',
  'sg-button':       'fa-solid fa-square',
  'sg-divider':      'fa-solid fa-minus',
  'sg-spacer':       'fa-solid fa-arrows-up-down',
  'sg-icon':         'fa-solid fa-star',
  'sg-accordion':    'fa-solid fa-bars-staggered',
  'sg-tabs':         'fa-solid fa-folder',
  'sg-icon-box':     'fa-solid fa-cube',
  'sg-form':         'fa-solid fa-rectangle-list',
  'sg-input':        'fa-solid fa-i-cursor',
  'sg-textarea':     'fa-solid fa-align-left',
  'sg-select':       'fa-solid fa-caret-down',
  'sg-checkbox':     'fa-solid fa-square-check',
  'sg-radio':        'fa-solid fa-circle-dot',
  'sg-submit':       'fa-solid fa-paper-plane',
};

const CATEGORIES_ORDER = ['Layout', 'Basic', 'Interactive', 'Forms', 'Extra'];

function getBlockIcon(blockId: string): string {
  return BLOCK_ICONS[blockId] || 'fa-solid fa-puzzle-piece';
}

/** Create the drag ghost element (follows cursor during drag) */
function createDragGhost(): HTMLElement {
  const ghost = document.createElement('div');
  ghost.className = 'sg-drag-ghost';
  ghost.style.cssText = `
    position: fixed;
    z-index: 100000;
    pointer-events: none;
    opacity: 0.85;
    padding: 8px 14px;
    background: var(--sg-accent, #c0392b);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    border-radius: 2px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    display: none;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transform: translate(12px, 12px);
    font-family: var(--sg-font, system-ui, sans-serif);
  `;
  document.body.appendChild(ghost);
  return ghost;
}

/** Create the drop indicator line (shows where component will land) */
function createDropIndicator(): HTMLElement {
  const indicator = document.createElement('div');
  indicator.className = 'sg-drop-indicator';
  indicator.style.cssText = `
    position: fixed;
    z-index: 99999;
    pointer-events: none;
    display: none;
    background: var(--sg-accent, #c0392b);
    height: 3px;
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(192,57,43,0.6);
    transition: top 0.08s ease, left 0.08s ease, width 0.08s ease;
  `;

  // Add pulsing dots at each end
  const dotStyle = `
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--sg-accent, #c0392b);
    box-shadow: 0 0 4px rgba(192,57,43,0.5);
  `;
  const style = document.createElement('style');
  style.textContent = `
    .sg-drop-indicator::before { ${dotStyle} left: -4px; }
    .sg-drop-indicator::after { ${dotStyle} right: -4px; }
  `;
  document.head.appendChild(style);

  document.body.appendChild(indicator);
  return indicator;
}

export function renderWidgetsPanel(sidebarEl: HTMLElement, editor: Editor): void {
  const widgetsBody = sidebarEl.querySelector('#sg-widgets-body') as HTMLElement;
  if (!widgetsBody) return;

  const widgetsZone = widgetsBody.parentElement!;
  let searchInput: HTMLInputElement;

  if (!widgetsZone.querySelector('.sg-widgets-search')) {
    const searchWrap = document.createElement('div');
    searchWrap.className = 'sg-widgets-search';
    searchWrap.style.padding = '8px 12px';
    searchWrap.innerHTML = `<input type="text" class="sg-sidebar-search" placeholder="Search widgets..." />`;
    widgetsZone.insertBefore(searchWrap, widgetsBody);
    searchInput = searchWrap.querySelector('input')!;
  } else {
    searchInput = widgetsZone.querySelector('.sg-widgets-search input')!;
  }

  // Shared drag state
  let isDragging = false;
  const ghost = createDragGhost();
  const dropIndicator = createDropIndicator();

  // Ensure block:custom fires so GrapesJS sets up the sorter/droppable
  editor.on('load', () => {
    editor.runCommand('open-blocks');
  });
  // Also try immediately in case editor is already loaded
  try { editor.runCommand('open-blocks'); } catch (_e) { /* not ready yet */ }

  // Prevent block:custom from re-rendering our panel (we manage our own UI)
  editor.on('block:custom', () => {
    // No-op: we render blocks ourselves, don't let GrapesJS re-render
  });

  function renderBlocks(filter?: string) {
    widgetsBody.innerHTML = '';

    const blocks = editor.Blocks.getAll();
    const categorized: Record<string, any[]> = {};

    blocks.forEach((block: any) => {
      const cat = block.getCategoryLabel?.() || block.get('category') || 'Extra';
      const catName = typeof cat === 'string' ? cat : (cat.label || cat.id || 'Extra');
      const label = block.getLabel?.() || block.get('label') || block.getId();

      if (filter && !label.toLowerCase().includes(filter.toLowerCase())) return;

      if (!categorized[catName]) categorized[catName] = [];
      categorized[catName].push({ id: block.getId(), label, block });
    });

    const sortedCats = Object.keys(categorized).sort((a, b) => {
      const ia = CATEGORIES_ORDER.indexOf(a);
      const ib = CATEGORIES_ORDER.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    for (const catName of sortedCats) {
      const catEl = document.createElement('div');
      catEl.className = 'sg-widgets-category';

      const title = document.createElement('div');
      title.className = 'sg-widgets-category-title';
      title.textContent = catName;
      catEl.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'sg-widgets-grid';

      for (const item of categorized[catName]) {
        const card = document.createElement('div');
        card.className = 'sg-widget-card';
        card.dataset.blockId = item.id;
        card.innerHTML = `
          <i class="${getBlockIcon(item.id)} sg-widget-card-icon"></i>
          <span class="sg-widget-card-label">${esc(item.label)}</span>
        `;

        card.addEventListener('pointerdown', (e: PointerEvent) => {
          if (e.button !== 0) return;
          e.preventDefault();

          const block = editor.Blocks.get(item.id);
          if (!block) return;

          isDragging = true;
          card.classList.add('dragging');

          // Show ghost at cursor
          ghost.innerHTML = `<i class="${getBlockIcon(item.id)}"></i> ${esc(item.label)}`;
          ghost.style.display = 'flex';
          ghost.style.left = e.clientX + 'px';
          ghost.style.top = e.clientY + 'px';

          // Tell GrapesJS to start block drag (activates sorter + droppable on iframe)
          editor.Blocks.startDrag(block, e);

          // Get iframe element for forwarding events
          const iframe = document.querySelector('.gjs-frame') as HTMLIFrameElement | null;

          const onMove = (moveEv: PointerEvent) => {
            // Move ghost
            ghost.style.left = moveEv.clientX + 'px';
            ghost.style.top = moveEv.clientY + 'px';

            // Check if pointer is over the iframe/canvas area
            if (iframe) {
              const iframeRect = iframe.getBoundingClientRect();
              const isOverCanvas = (
                moveEv.clientX >= iframeRect.left &&
                moveEv.clientX <= iframeRect.right &&
                moveEv.clientY >= iframeRect.top &&
                moveEv.clientY <= iframeRect.bottom
              );

              if (isOverCanvas) {
                // Dispatch pointermove on the iframe element so GrapesJS droppable picks it up
                const iframeEvent = new PointerEvent('pointermove', {
                  clientX: moveEv.clientX,
                  clientY: moveEv.clientY,
                  screenX: moveEv.screenX,
                  screenY: moveEv.screenY,
                  bubbles: true,
                  cancelable: true,
                });
                iframe.dispatchEvent(iframeEvent);

                // Find GrapesJS placeholder inside the iframe to position our drop indicator
                updateDropIndicator(iframe, iframeRect);
              } else {
                dropIndicator.style.display = 'none';
              }
            }
          };

          const onUp = () => {
            // Hide ghost and drop indicator
            ghost.style.display = 'none';
            dropIndicator.style.display = 'none';

            // Check if we're over the canvas — if so, dispatch pointerup on iframe
            if (iframe) {
              const upEvent = new PointerEvent('pointerup', {
                bubbles: true,
                cancelable: true,
              });
              // GrapesJS droppable listens for pointerup on document (already fine)
            }

            // Tell GrapesJS to finish the drop
            editor.Blocks.endDrag(false);

            card.classList.remove('dragging');
            isDragging = false;
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
          };

          document.addEventListener('pointermove', onMove);
          document.addEventListener('pointerup', onUp);
        });

        grid.appendChild(card);
      }

      catEl.appendChild(grid);
      widgetsBody.appendChild(catEl);
    }

    if (widgetsBody.children.length === 0) {
      widgetsBody.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-puzzle-piece"></i><span>No widgets found</span></div>';
    }
  }

  /** Find GrapesJS's placeholder inside the iframe and mirror its position as our drop indicator */
  function updateDropIndicator(iframe: HTMLIFrameElement, iframeRect: DOMRect) {
    try {
      const iframeDoc = iframe.contentDocument;
      if (!iframeDoc) return;

      // GrapesJS creates .gjs-placeholder with a .gjs-placeholder-int inside the iframe
      const placeholder = iframeDoc.querySelector('.gjs-placeholder') as HTMLElement;
      if (!placeholder || placeholder.style.display === 'none') {
        dropIndicator.style.display = 'none';
        return;
      }

      const phRect = placeholder.getBoundingClientRect();
      if (phRect.width === 0 && phRect.height === 0) {
        dropIndicator.style.display = 'none';
        return;
      }

      // Map iframe-local coordinates to page coordinates
      dropIndicator.style.display = 'block';
      dropIndicator.style.left = (iframeRect.left + phRect.left) + 'px';
      dropIndicator.style.top = (iframeRect.top + phRect.top) + 'px';
      dropIndicator.style.width = phRect.width + 'px';
      // For vertical placeholders, swap width/height
      if (phRect.height > phRect.width) {
        dropIndicator.style.width = '3px';
        dropIndicator.style.height = phRect.height + 'px';
      } else {
        dropIndicator.style.height = '3px';
        dropIndicator.style.width = phRect.width + 'px';
      }
    } catch (_e) {
      // Cross-origin iframe or other error
      dropIndicator.style.display = 'none';
    }
  }

  searchInput.addEventListener('input', () => {
    renderBlocks(searchInput.value.trim());
  });

  editor.on('load', () => {
    renderBlocks();
  });

  if (editor.Blocks.getAll().length > 0) {
    renderBlocks();
  }
}
