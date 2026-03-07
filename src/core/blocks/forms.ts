/**
 * Form-related block definitions.
 */
export function getFormBlocks() {
  return [
    {
      id: 'sg-form',
      label: 'Form',
      category: 'Forms',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>`,
      content: {
        type: 'sg-form',
        components: [
          {
            tagName: 'label',
            content: 'Name',
            style: { 'font-weight': '600', 'font-size': '14px' },
          },
          {
            tagName: 'input',
            void: true,
            attributes: { type: 'text', name: 'name', placeholder: 'Your name' },
            style: { padding: '10px', border: '1px solid #3a3c3f', 'font-size': '14px', width: '100%', 'box-sizing': 'border-box' },
          },
          {
            tagName: 'label',
            content: 'Email',
            style: { 'font-weight': '600', 'font-size': '14px' },
          },
          {
            tagName: 'input',
            void: true,
            attributes: { type: 'email', name: 'email', placeholder: 'Your email' },
            style: { padding: '10px', border: '1px solid #3a3c3f', 'font-size': '14px', width: '100%', 'box-sizing': 'border-box' },
          },
          {
            tagName: 'button',
            attributes: { type: 'submit' },
            content: 'Submit',
            style: {
              padding: '12px 24px',
              'background-color': '#c0392b',
              color: '#ffffff',
              border: 'none',
              'font-weight': '600',
              'font-size': '16px',
              cursor: 'pointer',
            },
          },
        ],
      },
    },
    {
      id: 'sg-input',
      label: 'Input',
      category: 'Forms',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="1"/><line x1="7" y1="12" x2="7" y2="12.01"/></svg>`,
      content: `<input type="text" placeholder="Enter text..." style="padding:10px;border:1px solid #3a3c3f;font-size:14px;width:100%;box-sizing:border-box;" />`,
    },
    {
      id: 'sg-textarea',
      label: 'Textarea',
      category: 'Forms',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>`,
      content: `<textarea rows="4" placeholder="Enter message..." style="padding:10px;border:1px solid #3a3c3f;font-size:14px;width:100%;box-sizing:border-box;resize:vertical;font-family:inherit;"></textarea>`,
    },
    {
      id: 'sg-select',
      label: 'Select',
      category: 'Forms',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="1"/><polyline points="8 11 12 15 16 11"/></svg>`,
      content: `<select style="padding:10px;border:1px solid #3a3c3f;font-size:14px;width:100%;box-sizing:border-box;"><option value="">Select an option</option><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></select>`,
    },
    {
      id: 'sg-checkbox',
      label: 'Checkbox',
      category: 'Forms',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><polyline points="9 12 11 14 15 10"/></svg>`,
      content: `<label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;"><input type="checkbox" style="width:18px;height:18px;" /> Checkbox label</label>`,
    },
    {
      id: 'sg-radio',
      label: 'Radio',
      category: 'Forms',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>`,
      content: `<label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;"><input type="radio" name="radio-group" style="width:18px;height:18px;" /> Radio label</label>`,
    },
    {
      id: 'sg-submit',
      label: 'Submit Button',
      category: 'Forms',
      media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"/><polyline points="10 12 12 14 14 10"/></svg>`,
      content: `<button type="submit" style="padding:12px 24px;background-color:#c0392b;color:#ffffff;border:none;font-weight:600;font-size:16px;cursor:pointer;width:100%;">Submit</button>`,
    },
  ];
}
