import type { Editor } from 'grapesjs';

/**
 * Register the sg-container component type.
 * A centered content container with max-width constraint.
 */
export function registerContainerComponent(editor: Editor): void {
  editor.Components.addType('sg-container', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: true,
        attributes: { 'data-sg-type': 'container' },
        styles: `
          [data-sg-type="container"] {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            padding: 0 15px;
            box-sizing: border-box;
          }
        `,
        traits: [
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
        ],
      },
    },
  });
}
