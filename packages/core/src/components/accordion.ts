import type { Editor } from 'grapesjs';

/**
 * Register the sg-accordion component type.
 * Creates expandable/collapsible accordion items.
 */
export function registerAccordionComponent(editor: Editor): void {
  editor.Components.addType('sg-accordion', {
    model: {
      defaults: {
        tagName: 'div',
        droppable: false,
        attributes: { 'data-sg-type': 'accordion' },
        styles: `
          [data-sg-type="accordion"] {
            width: 100%;
          }
          .sg-accordion-item {
            border: 1px solid #3a3c3f;
            margin-bottom: -1px;
          }
          .sg-accordion-title {
            padding: 15px 20px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f5f5f5;
          }
          .sg-accordion-title::after {
            content: '\\f078';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            font-size: 12px;
            transition: transform 0.3s;
          }
          .sg-accordion-content {
            padding: 20px;
            display: none;
          }
          .sg-accordion-item.active .sg-accordion-content {
            display: block;
          }
          .sg-accordion-item.active .sg-accordion-title::after {
            transform: rotate(180deg);
          }
        `,
        components: [
          {
            tagName: 'div',
            attributes: { class: 'sg-accordion-item active' },
            components: [
              {
                tagName: 'div',
                attributes: { class: 'sg-accordion-title' },
                content: 'Accordion Item 1',
                editable: true,
              },
              {
                tagName: 'div',
                attributes: { class: 'sg-accordion-content' },
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                editable: true,
              },
            ],
          },
          {
            tagName: 'div',
            attributes: { class: 'sg-accordion-item' },
            components: [
              {
                tagName: 'div',
                attributes: { class: 'sg-accordion-title' },
                content: 'Accordion Item 2',
                editable: true,
              },
              {
                tagName: 'div',
                attributes: { class: 'sg-accordion-content' },
                content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
                editable: true,
              },
            ],
          },
          {
            tagName: 'div',
            attributes: { class: 'sg-accordion-item' },
            components: [
              {
                tagName: 'div',
                attributes: { class: 'sg-accordion-title' },
                content: 'Accordion Item 3',
                editable: true,
              },
              {
                tagName: 'div',
                attributes: { class: 'sg-accordion-content' },
                content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
                editable: true,
              },
            ],
          },
        ],
        // Script injected into the canvas iframe for interactivity
        'script-export': `
          const items = this.querySelectorAll('.sg-accordion-item');
          items.forEach(item => {
            const title = item.querySelector('.sg-accordion-title');
            if (title) {
              title.addEventListener('click', () => {
                item.classList.toggle('active');
              });
            }
          });
        `,
        traits: [
          { type: 'number', name: 'data-items', label: 'Items Count', min: 1, max: 20 },
        ],
      },
    },
  });
}
