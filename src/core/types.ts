import type { Editor } from 'grapesjs';

/** Device breakpoint configuration */
export interface DeviceConfig {
  /** Device name (e.g. 'Desktop', 'Tablet', 'Mobile') */
  name: string;
  /** Device width (e.g. '768px', '375px', '' for full) */
  width: string;
  /** Media query width threshold */
  widthMedia?: string;
}

/** Storage configuration */
export interface StorageConfig {
  /** Storage type */
  type: 'local' | 'remote' | 'none';
  /** Enable autosave */
  autosave: boolean;
  /** Enable autoload on init */
  autoload: boolean;
  /** Number of changes before triggering save */
  stepsBeforeSave: number;
  /** Additional storage options */
  options: Record<string, unknown>;
}

/** Plugin function signature */
export type SuperGrapesPlugin = (editor: Editor, config: SuperGrapesConfig) => void;

/** AI provider configuration (OpenAI-compatible) */
export interface AiConfig {
  apiKey: string;
  model: string;
  baseURL?: string;
  systemPrompt?: string;
}

/** Main configuration for SuperGrapes editor */
export interface SuperGrapesConfig {
  /** Container element or selector */
  container: string | HTMLElement;
  /** GrapesJS config overrides (merged into final config) */
  grapesOptions?: Record<string, unknown>;
  /** Plugins to register */
  plugins?: SuperGrapesPlugin[];
  /** Storage configuration */
  storage?: Partial<StorageConfig>;
  /** Device breakpoints */
  devices?: DeviceConfig[];
  /** Callback fired when editor is ready */
  onReady?: (editor: Editor) => void;
  /** AI assistant configuration */
  ai?: AiConfig;
}

export type { Editor };
