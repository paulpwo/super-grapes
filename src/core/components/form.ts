import type { Editor } from 'grapesjs';

/**
 * Register the sg-form component type.
 * A droppable form container for form elements.
 */
export function registerFormComponent(editor: Editor): void {
  editor.Components.addType('sg-form', {
    model: {
      defaults: {
        tagName: 'form',
        droppable: true,
        attributes: { 'data-sg-type': 'form' },
        styles: `
          [data-sg-type="form"] {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
            max-width: 500px;
            box-sizing: border-box;
          }
        `,
        traits: [
          { type: 'text', name: 'action', label: 'Action URL' },
          {
            type: 'select',
            name: 'method',
            label: 'Method',
            options: [
              { id: 'GET', label: 'GET' },
              { id: 'POST', label: 'POST' },
            ],
          },
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
        ],
      },
    },
  });
}
