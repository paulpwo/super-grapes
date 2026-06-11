import type { Editor } from 'grapesjs';

/**
 * Register the sg-divider component type.
 * A horizontal rule / visual separator.
 */
export function registerDividerComponent(editor: Editor): void {
  editor.Components.addType('sg-divider', {
    model: {
      defaults: {
        tagName: 'hr',
        void: true,
        droppable: false,
        attributes: { 'data-sg-type': 'divider' },
        styles: `
          :where([data-sg-type="divider"]) {
            border: none;
            border-top: 2px solid #3a3c3f;
            margin: 20px 0;
            width: 100%;
          }
        `,
        traits: [
          {
            type: 'select',
            name: 'data-style',
            label: 'Style',
            options: [
              { id: 'solid', label: 'Solid' },
              { id: 'dashed', label: 'Dashed' },
              { id: 'dotted', label: 'Dotted' },
            ],
          },
          { type: 'number', name: 'data-weight', label: 'Weight (px)', min: 1, max: 20 },
          { type: 'text', name: 'data-divider-width', label: 'Width' },
          { type: 'color', name: 'data-color', label: 'Color' },
        ],
      },
    },
  });
}
