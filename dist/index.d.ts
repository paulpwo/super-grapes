import 'grapesjs/dist/css/grapes.min.css';
import './ui/theme/index.css';
export { createEditor } from './core/editor';
export { UIManager } from './ui/ui-manager';
export type { SuperGrapesConfig, AiConfig, GenerationConfig, BrandColors, DeviceConfig, StorageConfig, SuperGrapesPlugin, Editor } from './core/types';
export { createGenerationBackend, DirectBackend, EndpointBackend, isEndpointMode } from './core/ai';
export type { GenerationBackend, GenerationMode, GenerationContext, GenerationRequest, QualityMode, QualityResult } from './core/ai';
export { setExternalTemplates } from './ui/canvas/canvas-add-bar';
export type { SGTemplate } from './ui/canvas/template-modal';
//# sourceMappingURL=index.d.ts.map