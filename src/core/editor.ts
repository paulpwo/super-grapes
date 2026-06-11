import grapesjs, { Editor } from 'grapesjs';
import { buildGrapesConfig } from './config';
import { SG_EVENTS } from './events';
import { configureStorage } from './storage';
import { registerPlugins } from './plugins/index';
import { resolveTailwindConfig, injectTailwindRuntime } from './tailwind';
import type { SuperGrapesConfig, AiConfig } from './types';

import { registerSectionComponent } from './components/section';
import { registerContainerComponent } from './components/container';
import { registerColumnComponent } from './components/column';
import { registerHeadingComponent } from './components/heading';
import { registerTextComponent } from './components/text';
import { registerImageComponent } from './components/image';
import { registerButtonComponent } from './components/button';
import { registerVideoComponent } from './components/video';
import { registerDividerComponent } from './components/divider';
import { registerSpacerComponent } from './components/spacer';
import { registerIconComponent } from './components/icon';
import { registerFormComponent } from './components/form';
import { registerAccordionComponent } from './components/accordion';
import { registerTabsComponent } from './components/tabs';

import { getLayoutBlocks } from './blocks/layout';
import { getBasicBlocks } from './blocks/basic';
import { getInteractiveBlocks } from './blocks/interactive';
import { getFormBlocks } from './blocks/forms';

/**
 * Internal GrapesJS plugin that registers all SG component types and blocks.
 * Runs during grapesjs.init() so types exist before HTML is parsed.
 */
function sgCorePlugin(editor: Editor): void {
  // Register all custom component types
  registerSectionComponent(editor);
  registerContainerComponent(editor);
  registerColumnComponent(editor);
  registerHeadingComponent(editor);
  registerTextComponent(editor);
  registerImageComponent(editor);
  registerButtonComponent(editor);
  registerVideoComponent(editor);
  registerDividerComponent(editor);
  registerSpacerComponent(editor);
  registerIconComponent(editor);
  registerFormComponent(editor);
  registerAccordionComponent(editor);
  registerTabsComponent(editor);

  // Register all blocks
  const allBlocks = [
    ...getLayoutBlocks(),
    ...getBasicBlocks(),
    ...getInteractiveBlocks(),
    ...getFormBlocks(),
  ];

  const bm = editor.Blocks;
  allBlocks.forEach((block) => {
    bm.add(block.id, block);
  });
}

/**
 * Create and initialize a SuperGrapes editor instance.
 */
export function createEditor(config: SuperGrapesConfig): Editor {
  const gjsConfig = buildGrapesConfig(config);

  // Add our core plugin FIRST so types are registered before HTML parsing
  const existingPlugins = (gjsConfig.plugins as any[]) || [];
  gjsConfig.plugins = [sgCorePlugin, ...existingPlugins];

  const editor = grapesjs.init(gjsConfig as Parameters<typeof grapesjs.init>[0]);

  // Resolve AI config: explicit config > env vars
  const aiConfig: AiConfig | undefined = config.ai?.apiKey
    ? config.ai
    : (import.meta.env.VITE_SG_AI_API_KEY
      ? {
          apiKey: import.meta.env.VITE_SG_AI_API_KEY as string,
          model: (import.meta.env.VITE_SG_AI_MODEL as string) || 'gpt-4o',
          baseURL: (import.meta.env.VITE_SG_AI_BASE_URL as string) || undefined,
        }
      : undefined);

  if (aiConfig) {
    (editor as any).__sgAiConfig = aiConfig;
  }

  // Tailwind canvas runtime — utility classes are the core styling technique of
  // generated pages, so the v4 browser runtime is injected into the canvas iframe
  // (default ON; configurable via config.tailwind).
  const tailwind = resolveTailwindConfig(config.tailwind);
  (editor as any).__sgTailwind = tailwind;
  if (tailwind.enabled) {
    const injectIntoCanvas = () => {
      const doc = editor.Canvas.getDocument();
      if (doc) injectTailwindRuntime(doc, tailwind.scriptUrl);
    };
    // canvas:frame:load covers the main frame and any frame re-creation
    editor.on('canvas:frame:load', ({ window: frameWindow }: { window?: Window }) => {
      if (frameWindow?.document) injectTailwindRuntime(frameWindow.document, tailwind.scriptUrl);
    });
    // Fallback for the initial load (injection is idempotent)
    editor.on('load', injectIntoCanvas);
  }

  // Register user-provided plugins
  if (config.plugins && config.plugins.length > 0) {
    registerPlugins(editor, config.plugins, config);
  }

  // Configure storage
  if (config.storage) {
    configureStorage(editor, config.storage);
  }

  // Wire up custom events
  editor.on('component:selected', (component) => {
    editor.trigger(SG_EVENTS.COMPONENT_SELECTED, component);
  });

  editor.on('component:deselected', (component) => {
    editor.trigger(SG_EVENTS.COMPONENT_DESELECTED, component);
  });

  editor.on('load', () => {
    editor.trigger(SG_EVENTS.UI_READY);
    if (config.onReady) {
      config.onReady(editor);
    }
  });

  return editor;
}
