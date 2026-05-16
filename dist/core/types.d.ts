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
    /** Brand color palette for AI-generated pages. Colors are used by default unless the user prompt specifies otherwise. */
    brandColors?: BrandColors;
    /** Additional design skills (markdown strings) appended to the system prompt. Built-in skills are always included. */
    skills?: string[];
    /** Set to false to disable built-in skills (only your custom skills will be used). Default: true */
    builtinSkills?: boolean;
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
}
export type { Editor };
//# sourceMappingURL=types.d.ts.map