import type { Editor } from 'grapesjs';

/**
 * Register the sg-section component type.
 * A full-width wrapper that acts as a page section.
 */
export function registerSectionComponent(editor: Editor): void {
  editor.Components.addType('sg-section', {
    model: {
      defaults: {
        tagName: 'section',
        droppable: true,
        attributes: { 'data-sg-type': 'section' },
        styles: `
          :where([data-sg-type="section"]) {
            width: 100%;
            padding: 60px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
          }
        `,
        traits: [
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
          {
            type: 'select',
            name: 'tagName',
            label: 'HTML Tag',
            changeProp: true,
            options: [
              { id: 'section', label: 'Section' },
              { id: 'header', label: 'Header' },
              { id: 'footer', label: 'Footer' },
              { id: 'main', label: 'Main' },
            ],
          },
        ],
      },
    },
  });
}
