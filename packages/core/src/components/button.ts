import type { Editor } from 'grapesjs';

/**
 * Register the sg-button component type.
 * An editable call-to-action button (rendered as an <a> tag).
 */
export function registerButtonComponent(editor: Editor): void {
  editor.Components.addType('sg-button', {
    model: {
      defaults: {
        tagName: 'a',
        editable: true,
        droppable: false,
        attributes: {
          'data-sg-type': 'button',
          href: '#',
        },
        content: 'Click Here',
        styles: `
          [data-sg-type="button"] {
            display: inline-block;
            padding: 12px 24px;
            background-color: #c0392b;
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            border: none;
            font-size: 16px;
          }
        `,
        traits: [
          { type: 'text', name: 'text', label: 'Button Text', changeProp: true },
          { type: 'text', name: 'href', label: 'URL' },
          {
            type: 'select',
            name: 'target',
            label: 'Target',
            options: [
              { id: '_self', label: 'Same Window' },
              { id: '_blank', label: 'New Window' },
            ],
          },
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
        ],
      },
    },
  });
}
