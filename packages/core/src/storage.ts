import type { Editor } from 'grapesjs';
import type { StorageConfig } from './types';

const STORAGE_KEY = 'super-grapes-project';

/** Default storage configuration */
export const DEFAULT_STORAGE: StorageConfig = {
  type: 'local',
  autosave: true,
  autoload: true,
  stepsBeforeSave: 1,
  options: {},
};

/**
 * Configure local storage with autosave for the editor.
 * If type is 'none', storage is disabled entirely.
 */
export function configureStorage(editor: Editor, config: Partial<StorageConfig> = {}): void {
  const merged: StorageConfig = { ...DEFAULT_STORAGE, ...config };

  if (merged.type === 'none') {
    return;
  }

  if (merged.type === 'local') {
    // Set up autosave
    if (merged.autosave) {
      let changeCount = 0;

      editor.on('change:changesCount', () => {
        changeCount++;
        if (changeCount >= merged.stepsBeforeSave) {
          changeCount = 0;
          const data = editor.store();
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } catch {
            console.warn('[SuperGrapes] Failed to save to localStorage');
          }
        }
      });
    }

    // Autoload on init
    if (merged.autoload) {
      editor.on('load', () => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const data = JSON.parse(raw);
            editor.loadProjectData(data);
          }
        } catch {
          console.warn('[SuperGrapes] Failed to load from localStorage');
        }
      });
    }
  }
}
