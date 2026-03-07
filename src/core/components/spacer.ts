import type { Editor } from 'grapesjs';

/**
 * Register the sg-spacer component type.
 * An empty block used for vertical spacing.
 */
export function registerSpacerComponent(editor: Editor): void {
  editor.Components.addType('sg-spacer', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        content: '',
        attributes: { 'data-sg-type': 'spacer' },
        styles: `
          [data-sg-type="spacer"] {
            height: 50px;
            width: 100%;
          }
        `,
        traits: [
          {
            type: 'number',
            name: 'data-height',
            label: 'Height (px)',
            min: 0,
            max: 500,
          },
        ],
      },
    },
  });
}
