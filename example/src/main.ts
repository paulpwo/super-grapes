/**
 * Super Grapes — Example integration
 *
 * This shows how to install and use @paulpwo/super-grapes
 * as a private npm package from GitHub Packages.
 *
 * Setup:
 *   1. Configure ~/.npmrc with your GitHub token (see docs/INSTALLATION.md)
 *   2. cd example && pnpm install && pnpm dev
 */

import { createEditor, UIManager } from '@paulpwo/super-grapes';
import '@paulpwo/super-grapes/style.css';

const app = document.getElementById('app')!;

// 1. Create the UI shell (topbar, sidebar, canvas zone)
const ui = new UIManager(app);

// 2. Create the GrapesJS editor inside the canvas zone
const editor = createEditor({
  container: '#sg-canvas',

  // Optional: AI assistant (uncomment and add your key)
  // ai: {
  //   apiKey: '',
  //   model: 'gemini-2.5-flash',
  //   baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai',
  //   systemPrompt: 'Custom system prompt to override the default one...',
  //   brandColors: {
  //     primary: '#2563eb',
  //     secondary: '#1e40af',
  //     accent: '#3b82f6',
  //     background: '#ffffff',
  //     text: '#1e293b',
  //   },
  //   skills: [
  //     '# Skill: My Custom Skill\n\nCustom design guidelines here...',
  //   ],
  //   builtinSkills: true, // set to false to disable built-in frontend-design skill
  // },

  // Optional: callback when editor is ready
  onReady: (ed) => {
    console.log('Super Grapes editor ready!', ed);
  },
});

// 3. Connect the UI to the editor
ui.connect(editor);

// Expose for debugging
(window as any).editor = editor;
