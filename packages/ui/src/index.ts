import 'grapesjs/dist/css/grapes.min.css';
import './theme/index.css';

export { UIManager } from './ui-manager';
export { createEditorShell } from './shell/editor-shell';
export type { EditorShellRefs } from './shell/editor-shell';

// Re-export controls for extension
export * from './controls/dim-control';
export * from './controls/slider-row';
export * from './controls/color-picker';
export * from './controls/icon-toggle';
export * from './controls/typography-panel';
export * from './controls/spacing-box';
export * from './controls/state-toggle';
export * from './controls/bg-type-group';
export * from './controls/gradient-picker';
export * from './controls/box-shadow';
