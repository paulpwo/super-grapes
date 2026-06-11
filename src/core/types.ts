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

/**
 * Pluggable generation backend configuration.
 *
 * - `direct` (default): the editor calls the OpenAI-compatible provider directly
 *   (single-shot chat completion). This is the original, backwards-compatible path.
 * - `endpoint`: the editor POSTs an intent + context payload to a host-provided
 *   endpoint that owns the generation loop (e.g. a server-side agentic pipeline)
 *   and returns finished HTML.
 */
export interface GenerationConfig {
  /** Generation strategy. Default: 'direct'. */
  mode?: 'direct' | 'endpoint';
  /** Absolute or relative URL to POST to. Required when mode === 'endpoint'. */
  endpoint?: string;
  /** Extra headers sent with the endpoint request (e.g. CSRF token). */
  headers?: Record<string, string>;
}

/** AI provider configuration (OpenAI-compatible) */
export interface AiConfig {
  apiKey: string;
  model: string;
  baseURL?: string;
  systemPrompt?: string;
  /** Max completion tokens passed to the provider. Default: 8192. */
  maxTokens?: number;
  /** Sampling temperature passed to the provider. Default: 0.7. */
  temperature?: number;
  /** Brand color palette for AI-generated pages. Colors are used by default unless the user prompt specifies otherwise. */
  brandColors?: BrandColors;
  /** Additional design skills (markdown strings) appended to the system prompt. Built-in skills are always included. */
  skills?: string[];
  /** Set to false to disable built-in skills (only your custom skills will be used). Default: true */
  builtinSkills?: boolean;
  /** Pluggable generation backend. When omitted, the direct single-shot provider call is used. */
  generation?: GenerationConfig;
}

/** Brand color palette passed to AI for consistent page generation */
export interface BrandColors {
  /** Primary brand color (e.g. '#c0392b') */
  primary: string;
  /** Secondary/accent color (e.g. '#2c3e50') */
  secondary?: string;
  /** Background color (e.g. '#ffffff') */
  background?: string;
  /** Primary text color (e.g. '#333333') */
  text?: string;
  /** Accent color for CTAs, links (e.g. '#e74c3c') */
  accent?: string;
  /** Any additional named colors */
  [key: string]: string | undefined;
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
  /** Preserve inline styles in output HTML (default: false — uses style= instead of CSS classes).
   * Sets both avoidInlineStyle and forceClass on GrapesJS — both must be false to round-trip style= correctly. */
  avoidInlineStyle?: boolean;
}

export type { Editor };
