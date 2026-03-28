/**
 * Loads all built-in AI skills from .md files in this directory.
 * Uses Vite's import.meta.glob to resolve at build time.
 */

const skillModules = import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: true });

/** All built-in skill contents, loaded at build time */
export const builtinSkills: string[] = Object.entries(skillModules)
  .map(([, content]) => content as string);
