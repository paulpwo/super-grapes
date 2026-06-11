import type { Editor } from 'grapesjs';

/**
 * Register the sg-tabs component type.
 * Creates tab headers with corresponding content panels.
 */
export function registerTabsComponent(editor: Editor): void {
  editor.Components.addType('sg-tabs', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        attributes: { 'data-sg-type': 'tabs' },
        styles: `
          :where([data-sg-type="tabs"]) {
            width: 100%;
          }
          .sg-tabs-nav {
            display: flex;
            border-bottom: 2px solid #3a3c3f;
            margin-bottom: 0;
          }
          .sg-tab-btn {
            padding: 12px 24px;
            cursor: pointer;
            font-weight: 600;
            border: none;
            background: none;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            transition: border-color 0.2s, color 0.2s;
            font-size: 14px;
          }
          .sg-tab-btn.active {
            border-bottom-color: #c0392b;
            color: #c0392b;
          }
          .sg-tab-panel {
            padding: 20px;
            display: none;
          }
          .sg-tab-panel.active {
            display: block;
          }
        `,
        components: [
          {
            tagName: 'div',
            attributes: { class: 'sg-tabs-nav' },
            components: [
              {
                tagName: 'button',
                attributes: { class: 'sg-tab-btn active', 'data-tab': '0' },
                content: 'Tab 1',
                editable: true,
              },
              {
                tagName: 'button',
                attributes: { class: 'sg-tab-btn', 'data-tab': '1' },
                content: 'Tab 2',
                editable: true,
              },
              {
                tagName: 'button',
                attributes: { class: 'sg-tab-btn', 'data-tab': '2' },
                content: 'Tab 3',
                editable: true,
              },
            ],
          },
          {
            tagName: 'div',
            attributes: { class: 'sg-tab-panel active', 'data-panel': '0' },
            content: 'Content for Tab 1. Click to edit this text.',
            editable: true,
          },
          {
            tagName: 'div',
            attributes: { class: 'sg-tab-panel', 'data-panel': '1' },
            content: 'Content for Tab 2. Click to edit this text.',
            editable: true,
          },
          {
            tagName: 'div',
            attributes: { class: 'sg-tab-panel', 'data-panel': '2' },
            content: 'Content for Tab 3. Click to edit this text.',
            editable: true,
          },
        ],
        'script-export': `
          const btns = this.querySelectorAll('.sg-tab-btn');
          const panels = this.querySelectorAll('.sg-tab-panel');
          btns.forEach(btn => {
            btn.addEventListener('click', () => {
              const idx = btn.getAttribute('data-tab');
              btns.forEach(b => b.classList.remove('active'));
              panels.forEach(p => p.classList.remove('active'));
              btn.classList.add('active');
              const panel = this.querySelector('[data-panel="' + idx + '"]');
              if (panel) panel.classList.add('active');
            });
          });
        `,
        traits: [
          { type: 'number', name: 'data-tabs', label: 'Tabs Count', min: 1, max: 10 },
        ],
      },
    },
  });
}
