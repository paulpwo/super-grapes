/**
 * Layout block definitions.
 * Each block creates a structural layout component tree.
 */
export function getLayoutBlocks() {
  return [
    {
      id: 'sg-section',
      label: 'Section',
      category: 'Layout',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/></svg>`,
      content: {
        type: 'sg-section',
        components: [
          { type: 'sg-container' },
        ],
      },
    },
    {
      id: 'sg-2-columns',
      label: '2 Columns',
      category: 'Layout',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
      content: {
        type: 'sg-section',
        components: [
          {
            type: 'sg-container',
            components: [
              { type: 'sg-column' },
              { type: 'sg-column' },
            ],
          },
        ],
      },
    },
    {
      id: 'sg-3-columns',
      label: '3 Columns',
      category: 'Layout',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></svg>`,
      content: {
        type: 'sg-section',
        components: [
          {
            type: 'sg-container',
            components: [
              { type: 'sg-column' },
              { type: 'sg-column' },
              { type: 'sg-column' },
            ],
          },
        ],
      },
    },
    {
      id: 'sg-4-columns',
      label: '4 Columns',
      category: 'Layout',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="7.5" y1="4" x2="7.5" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="16.5" y1="4" x2="16.5" y2="20"/></svg>`,
      content: {
        type: 'sg-section',
        components: [
          {
            type: 'sg-container',
            components: [
              { type: 'sg-column' },
              { type: 'sg-column' },
              { type: 'sg-column' },
              { type: 'sg-column' },
            ],
          },
        ],
      },
    },
    {
      id: 'sg-sidebar-left',
      label: 'Sidebar Left',
      category: 'Layout',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="8" y1="4" x2="8" y2="20"/></svg>`,
      content: {
        type: 'sg-section',
        components: [
          {
            type: 'sg-container',
            components: [
              {
                type: 'sg-column',
                style: { flex: '0 0 30%', 'max-width': '30%' },
              },
              {
                type: 'sg-column',
                style: { flex: '0 0 70%', 'max-width': '70%' },
              },
            ],
          },
        ],
      },
    },
    {
      id: 'sg-sidebar-right',
      label: 'Sidebar Right',
      category: 'Layout',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="16" y1="4" x2="16" y2="20"/></svg>`,
      content: {
        type: 'sg-section',
        components: [
          {
            type: 'sg-container',
            components: [
              {
                type: 'sg-column',
                style: { flex: '0 0 70%', 'max-width': '70%' },
              },
              {
                type: 'sg-column',
                style: { flex: '0 0 30%', 'max-width': '30%' },
              },
            ],
          },
        ],
      },
    },
  ];
}
