import type { Editor } from 'grapesjs';

/**
 * Register the sg-text component type.
 * An editable paragraph/text block.
 */
export function registerTextComponent(editor: Editor): void {
  editor.Components.addType('sg-text', {
    model: {
      defaults: {
        tagName: 'p',
        editable: true,
        droppable: false,
        attributes: { 'data-sg-type': 'text' },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        traits: [
          { type: 'text', name: 'id', label: 'ID' },
          { type: 'text', name: 'class', label: 'CSS Classes' },
        ],
      },
    },
  });
}
