import 'grapesjs/dist/css/grapes.min.css';
import './ui/theme/index.css';
import { createEditor } from './core/editor';
import { UIManager } from './ui/ui-manager';
import { setExternalTemplates } from './ui/canvas/canvas-add-bar';
import type { SGTemplate } from './ui/canvas/template-modal';

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
  ai: import.meta.env.VITE_SG_AI_API_KEY ? {
    apiKey: import.meta.env.VITE_SG_AI_API_KEY as string,
    model: (import.meta.env.VITE_SG_AI_MODEL as string) || 'gpt-4o',
    baseURL: (import.meta.env.VITE_SG_AI_BASE_URL as string) || undefined,
  } : undefined,
  onReady: (ed) => {
    console.log('Super Grapes editor ready!', ed);
  },
});

// 3. Connect the UI to the editor
ui.connect(editor);

// Expose for debugging and external integration
(window as any).editor = editor;
(window as any).sgSetTemplates = setExternalTemplates;
