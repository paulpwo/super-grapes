/**
 * Interactive widget block definitions.
 */
export function getInteractiveBlocks() {
  return [
    {
      id: 'sg-accordion',
      label: 'Accordion',
      category: 'Interactive',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="5" rx="1"/></svg>`,
      content: { type: 'sg-accordion' },
    },
    {
      id: 'sg-tabs',
      label: 'Tabs',
      category: 'Interactive',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M2 7h6V3h8v4h6"/></svg>`,
      content: { type: 'sg-tabs' },
    },
    {
      id: 'sg-carousel',
      label: 'Carousel',
      category: 'Interactive',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="13" rx="1"/><polyline points="2 8 2 13"/><polyline points="22 8 22 13"/><circle cx="9" cy="20" r="0.6"/><circle cx="12" cy="20" r="0.6"/><circle cx="15" cy="20" r="0.6"/></svg>`,
      content: { type: 'sg-carousel' },
    },
    {
      id: 'sg-gallery',
      label: 'Gallery',
      category: 'Interactive',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>`,
      content: { type: 'sg-gallery', attributes: { 'data-sg-type': 'gallery', 'data-lightbox': 'true' } },
    },
    {
      id: 'sg-icon-box',
      label: 'Icon Box',
      category: 'Interactive',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><polygon points="12 7 13.5 10 17 10.5 14.5 12.9 15.1 16.4 12 14.8 8.9 16.4 9.5 12.9 7 10.5 10.5 10 12 7"/></svg>`,
      content: {
        type: 'sg-column',
        style: {
          'align-items': 'center',
          'text-align': 'center',
          padding: '30px',
        },
        components: [
          { type: 'sg-icon' },
          {
            type: 'sg-heading',
            attributes: { 'data-sg-type': 'heading' },
            tagName: 'h3',
            content: 'Feature Title',
          },
          {
            type: 'sg-text',
            attributes: { 'data-sg-type': 'text' },
            content: 'Write a short description for this feature. It can span multiple lines and provide details.',
          },
        ],
      },
    },
  ];
}
