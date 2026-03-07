/**
 * Basic widget block definitions.
 */
export function getBasicBlocks() {
  return [
    {
      id: 'sg-heading',
      label: 'Heading',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
      content: { type: 'sg-heading' },
    },
    {
      id: 'sg-text',
      label: 'Text',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="15" y2="18"/></svg>`,
      content: { type: 'sg-text' },
    },
    {
      id: 'sg-image',
      label: 'Image',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
      content: { type: 'sg-image' },
    },
    {
      id: 'sg-video',
      label: 'Video',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><polygon points="10 9 16 12 10 15 10 9"/></svg>`,
      content: { type: 'sg-video' },
    },
    {
      id: 'sg-button',
      label: 'Button',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
      content: { type: 'sg-button' },
    },
    {
      id: 'sg-divider',
      label: 'Divider',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/></svg>`,
      content: { type: 'sg-divider' },
    },
    {
      id: 'sg-spacer',
      label: 'Spacer',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="8 8 12 4 16 8"/><polyline points="8 16 12 20 16 16"/></svg>`,
      content: { type: 'sg-spacer' },
    },
    {
      id: 'sg-icon',
      label: 'Icon',
      category: 'Basic',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      content: { type: 'sg-icon' },
    },
  ];
}
