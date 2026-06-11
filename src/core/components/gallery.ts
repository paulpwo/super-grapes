import type { Editor } from 'grapesjs';

/**
 * Gallery behavior — optional vanilla lightbox (dialog-based), gated by
 * data-lightbox="true". Runs in the canvas iframe and on published pages.
 * `this` is the gallery root element. Serialized by GrapesJS — keep
 * self-contained and re-runnable (uses property assignment for idempotence).
 */
function galleryScript(this: HTMLElement) {
  const el = this as HTMLElement;
  if (el.getAttribute('data-lightbox') !== 'true') return;

  const doc = el.ownerDocument;

  // onclick assignment (not addEventListener) keeps re-runs idempotent
  el.onclick = function (ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    const img = target.closest('img');
    if (!img || !el.contains(img)) return;

    const dialog = doc.createElement('dialog');
    dialog.className = 'sg-gallery-lightbox';
    const big = doc.createElement('img');
    big.src = (img as HTMLImageElement).src;
    big.alt = (img as HTMLImageElement).alt || '';
    const closeBtn = doc.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'sg-gallery-lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&#10005;';
    dialog.appendChild(big);
    dialog.appendChild(closeBtn);

    const close = () => { dialog.close(); dialog.remove(); };
    closeBtn.addEventListener('click', close);
    dialog.addEventListener('click', (e: MouseEvent) => { if (e.target === dialog) close(); });
    dialog.addEventListener('close', () => dialog.remove());

    doc.body.appendChild(dialog);
    dialog.showModal();
  };
}

/**
 * Register the sg-gallery + sg-gallery-item component types.
 * Responsive image grid with an optional dialog-based lightbox.
 */
export function registerGalleryComponent(editor: Editor): void {
  editor.Components.addType('sg-gallery', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: true,
        attributes: { 'data-sg-type': 'gallery' },
        styles: `
          :where([data-sg-type="gallery"]) {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            width: 100%;
            box-sizing: border-box;
          }
          .sg-gallery-lightbox {
            border: none;
            padding: 0;
            background: transparent;
            max-width: 92vw;
            max-height: 92vh;
          }
          .sg-gallery-lightbox::backdrop {
            background: rgba(0, 0, 0, 0.82);
          }
          .sg-gallery-lightbox img {
            max-width: 92vw;
            max-height: 92vh;
            display: block;
            border-radius: 8px;
          }
          .sg-gallery-lightbox-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 9999px;
            background: rgba(0, 0, 0, 0.55);
            color: #ffffff;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `,
        components: [
          { type: 'sg-gallery-item' },
          { type: 'sg-gallery-item' },
          { type: 'sg-gallery-item' },
          { type: 'sg-gallery-item' },
          { type: 'sg-gallery-item' },
          { type: 'sg-gallery-item' },
        ],
        script: galleryScript,
        traits: [
          {
            type: 'select',
            name: 'data-lightbox',
            label: 'Lightbox',
            options: [
              { id: 'true', label: 'Enabled' },
              { id: 'false', label: 'Disabled' },
            ],
          },
        ],
      },
    },
  });

  editor.Components.addType('sg-gallery-item', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: true,
        draggable: '[data-sg-type="gallery"]',
        attributes: { 'data-sg-type': 'gallery-item' },
        styles: `
          :where([data-sg-type="gallery-item"]) {
            overflow: hidden;
            border-radius: 8px;
            cursor: pointer;
          }
          :where([data-sg-type="gallery-item"]) img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        `,
        components: [
          {
            type: 'sg-image',
            attributes: {
              'data-sg-type': 'image',
              src: 'https://placehold.co/600x400',
              alt: 'Gallery image',
            },
          },
        ],
      },
    },
  });
}
