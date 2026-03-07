import type { Editor } from 'grapesjs';

/**
 * Register the sg-column component type.
 * A flex child used inside containers for column layouts.
 */
export function registerColumnComponent(editor: Editor): void {
  editor.Components.addType('sg-column', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: true,
        attributes: { 'data-sg-type': 'column' },
        styles: `
          [data-sg-type="column"] {
            flex: 1;
            padding: 10px;
            display: flex;
            flex-direction: column;
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
