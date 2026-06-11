import type { Editor } from 'grapesjs';

/**
 * Register the sg-icon component type.
 * Renders a Font Awesome 6 icon inside a wrapper div.
 */
export function registerIconComponent(editor: Editor): void {
  editor.Components.addType('sg-icon', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        attributes: { 'data-sg-type': 'icon' },
        content: '<i class="fa-solid fa-star"></i>',
        styles: `
          :where([data-sg-type="icon"]) {
            font-size: 40px;
            color: #c0392b;
            text-align: center;
            display: inline-block;
          }
        `,
        traits: [
          { type: 'text', name: 'data-icon', label: 'Icon Class (e.g. fa-solid fa-star)' },
          { type: 'number', name: 'data-size', label: 'Size (px)' },
          { type: 'color', name: 'data-color', label: 'Color' },
          { type: 'text', name: 'data-link', label: 'Link URL' },
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
        ],
      },
    },
  });
}
