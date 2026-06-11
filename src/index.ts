// Styles — bundled into dist/style.css
import 'grapesjs/dist/css/grapes.min.css';
import './ui/theme/index.css';

// Core
export { createEditor } from './core/editor';
export { UIManager } from './ui/ui-manager';

// Types
export type { SuperGrapesConfig, AiConfig, GenerationConfig, TailwindConfig, BrandColors, DeviceConfig, StorageConfig, SuperGrapesPlugin, Editor } from './core/types';

// Tailwind canvas runtime (core styling technique). The constants let host apps
// replicate the exact runtime + cascade strategy on published pages.
export { DEFAULT_TAILWIND_SCRIPT_URL, TAILWIND_CANVAS_CSS, resolveTailwindConfig, injectTailwindRuntime } from './core/tailwind';
export type { ResolvedTailwindConfig } from './core/tailwind';

// AI generation backend (pluggable: direct provider call or host endpoint)
export { createGenerationBackend, DirectBackend, EndpointBackend, isEndpointMode } from './core/ai';
export type { GenerationBackend, GenerationMode, GenerationContext, GenerationRequest, QualityMode, QualityResult } from './core/ai';

// Canvas utilities
export { setExternalTemplates } from './ui/canvas/canvas-add-bar';
export type { SGTemplate } from './ui/canvas/template-modal';
