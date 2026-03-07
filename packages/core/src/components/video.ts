import type { Editor } from 'grapesjs';

/**
 * Register the sg-video component type.
 * Extends the built-in GrapesJS video component with provider awareness.
 */
export function registerVideoComponent(editor: Editor): void {
  editor.Components.addType('sg-video', {
    extend: 'video',
    model: {
      defaults: {
        attributes: { 'data-sg-type': 'video' },
        provider: 'so', // HTML5 source
        styles: `
          [data-sg-type="video"] {
            width: 100%;
            max-width: 100%;
          }
        `,
        traits: [
          {
            type: 'select',
            name: 'provider',
            label: 'Provider',
            changeProp: true,
            options: [
              { id: 'so', label: 'HTML5 (Self-hosted)' },
              { id: 'yt', label: 'YouTube' },
              { id: 'vi', label: 'Vimeo' },
            ],
          },
          { type: 'text', name: 'src', label: 'Video URL / ID', changeProp: true },
          { type: 'text', name: 'poster', label: 'Poster Image URL', changeProp: true },
          { type: 'checkbox', name: 'autoplay', label: 'Autoplay', changeProp: true },
          { type: 'checkbox', name: 'loop', label: 'Loop', changeProp: true },
          { type: 'checkbox', name: 'controls', label: 'Controls', changeProp: true, valueTrue: 'true', valueFalse: 'false' },
          { type: 'checkbox', name: 'muted', label: 'Muted', changeProp: true },
        ],
      },
    },
  });
}
