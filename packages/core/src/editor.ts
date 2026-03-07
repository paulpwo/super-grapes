import grapesjs, { Editor } from 'grapesjs';
import { buildGrapesConfig } from './config';
import { SG_EVENTS } from './events';
import { configureStorage } from './storage';
import { registerPlugins } from './plugins/index';
import type { SuperGrapesConfig } from './types';

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
