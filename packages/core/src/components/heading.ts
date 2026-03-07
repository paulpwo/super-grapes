import type { Editor } from 'grapesjs';

/**
 * Register the sg-heading component type.
 * An editable heading element (h1-h6).
 */
export function registerHeadingComponent(editor: Editor): void {
  editor.Components.addType('sg-heading', {
    model: {
      defaults: {
        tagName: 'h2',
        editable: true,
        droppable: false,
        attributes: { 'data-sg-type': 'heading' },
        content: 'Your Heading Here',
        traits: [
          {
            type: 'select',
            name: 'tagName',
            label: 'Tag',
            changeProp: true,
            options: [
              { id: 'h1', label: 'H1' },
              { id: 'h2', label: 'H2' },
              { id: 'h3', label: 'H3' },
              { id: 'h4', label: 'H4' },
              { id: 'h5', label: 'H5' },
              { id: 'h6', label: 'H6' },
            ],
          },
          { type: 'text', name: 'link', label: 'Link URL' },
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
          {
            type: 'select',
            name: 'align',
            label: 'Alignment',
            options: [
              { id: 'left', label: 'Left' },
              { id: 'center', label: 'Center' },
              { id: 'right', label: 'Right' },
            ],
          },
        ],
      },
    },
  });
}
