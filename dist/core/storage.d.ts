import type { Editor } from 'grapesjs';
import type { StorageConfig } from './types';
/** Default storage configuration */
export declare const DEFAULT_STORAGE: StorageConfig;
/**
 * Configure local storage with autosave for the editor.
 * If type is 'none', storage is disabled entirely.
 */
export declare function configureStorage(editor: Editor, config?: Partial<StorageConfig>): void;
//# sourceMappingURL=storage.d.ts.map