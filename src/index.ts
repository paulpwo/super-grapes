// Styles — bundled into dist/style.css
import 'grapesjs/dist/css/grapes.min.css';
import './ui/theme/index.css';

// Core
export { createEditor } from './core/editor';
export { UIManager } from './ui/ui-manager';

// Types
export type { SuperGrapesConfig, AiConfig, BrandColors, DeviceConfig, StorageConfig, SuperGrapesPlugin, Editor } from './core/types';

// Canvas utilities
export { setExternalTemplates } from './ui/canvas/canvas-add-bar';
export type { SGTemplate } from './ui/canvas/template-modal';
