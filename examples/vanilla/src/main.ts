import { createEditor } from '@super-grapes/core';
import { UIManager } from '@super-grapes/ui';

const app = document.getElementById('app')!;

// 1. Create the UI shell first (topbar, sidebar, canvas zone)
const ui = new UIManager(app);

// 2. Create the GrapesJS editor inside the canvas zone
const editor = createEditor({
  container: '#sg-canvas',
  grapesOptions: {
    components: `
      <section data-gjs-type="sg-section" style="width:100%;padding:80px 0;display:flex;flex-direction:column;align-items:center;background-color:#1a1a2e;">
        <div data-gjs-type="sg-container" style="max-width:1200px;width:100%;margin:0 auto;display:flex;flex-wrap:wrap;padding:0 15px;justify-content:center;">
          <div data-gjs-type="sg-column" style="flex:1;padding:20px;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:800px;">
            <h1 data-gjs-type="sg-heading" style="color:#ffffff;font-size:48px;margin-bottom:20px;font-weight:800;">Build Beautiful Pages</h1>
            <p data-gjs-type="sg-text" style="color:#a0a0b0;font-size:18px;line-height:1.7;margin-bottom:30px;">Super Grapes is an Elementor-like page builder powered by GrapesJS. Drag widgets, customize styles, and create stunning web pages.</p>
            <a data-gjs-type="sg-button" style="display:inline-block;padding:16px 40px;background-color:#c0392b;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;cursor:pointer;border:none;">Get Started</a>
          </div>
        </div>
      </section>
    `,
  },
  onReady: (ed) => {
    console.log('Super Grapes editor ready!', ed);
  },
});

// 3. Connect the UI to the editor
ui.connect(editor);

// Expose for debugging
(window as any).editor = editor;
