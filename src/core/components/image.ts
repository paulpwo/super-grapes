import type { Editor } from 'grapesjs';

/**
 * Register the sg-image component type.
 * A self-closing image element with placeholder defaults.
 */
export function registerImageComponent(editor: Editor): void {
  editor.Components.addType('sg-image', {
    model: {
      defaults: {
        tagName: 'img',
        void: true,
        droppable: false,
        attributes: {
          'data-sg-type': 'image',
          src: 'https://placehold.co/600x400',
          alt: 'Placeholder image',
        },
        styles: `
          :where([data-sg-type="image"]) {
            width: 100%;
            height: auto;
            display: block;
          }
        `,
        traits: [
          { type: 'text', name: 'src', label: 'Source URL', changeProp: false },
          { type: 'text', name: 'alt', label: 'Alt Text' },
          { type: 'text', name: 'width', label: 'Width' },
          { type: 'text', name: 'height', label: 'Height' },
          { type: 'text', name: 'link', label: 'Link URL' },
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
        ],
      },
    },
  });
}
