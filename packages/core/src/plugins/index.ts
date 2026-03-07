import type { Editor } from 'grapesjs';
import type { SuperGrapesConfig, SuperGrapesPlugin } from '../types';

/**
 * Register all user-provided plugins with the editor.
 */
export function registerPlugins(
  editor: Editor,
  plugins: SuperGrapesPlugin[],
  config: SuperGrapesConfig,
): void {
  plugins.forEach((p) => p(editor, config));
}
