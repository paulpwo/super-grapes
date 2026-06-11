import type { TailwindConfig } from './types';

/** Default Tailwind v4 browser runtime (compiles utility classes at runtime in the canvas iframe). */
export const DEFAULT_TAILWIND_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4';

/**
 * Custom Tailwind stylesheet compiled by the browser runtime inside the canvas.
 *
 * CASCADE STRATEGY (load-bearing — verified against @tailwindcss/browser v4.3):
 * Tailwind's default output puts utilities in `@layer utilities`, and UNLAYERED
 * author CSS (like GrapesJS component-default styles) beats ANY layered CSS,
 * which would make component defaults override the generated utility classes.
 * To make Tailwind the core styling technique we import `utilities.css` WITHOUT
 * a layer, while our component defaults are wrapped in `:where(...)` (specificity
 * 0,0,0). Result:
 *   - any utility class (0,1,0) beats component defaults,
 *   - component defaults still apply to class-less (manually built) elements,
 *   - inline styles (GrapesJS Style Manager edits) still beat utilities.
 */
export const TAILWIND_CANVAS_CSS = `
@layer theme, base;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";
`;

/** Resolved Tailwind settings (defaults applied). */
export interface ResolvedTailwindConfig {
  enabled: boolean;
  scriptUrl: string;
}

/** Apply defaults: Tailwind is the core styling technique, so it is ON unless disabled. */
export function resolveTailwindConfig(config?: TailwindConfig): ResolvedTailwindConfig {
  return {
    enabled: config?.enabled !== false,
    scriptUrl: config?.scriptUrl || DEFAULT_TAILWIND_SCRIPT_URL,
  };
}

const STYLE_EL_ID = 'sg-tailwind-css';
const SCRIPT_EL_ID = 'sg-tailwind-runtime';

/**
 * Inject the Tailwind runtime (custom stylesheet + browser runtime script) into a
 * document — the GrapesJS canvas iframe. Idempotent: safe to call on every frame load.
 * The stylesheet must be present before/when the runtime initializes, so it is
 * appended first.
 */
export function injectTailwindRuntime(doc: Document, scriptUrl: string): void {
  if (!doc.head) return;

  if (!doc.getElementById(STYLE_EL_ID)) {
    const style = doc.createElement('style');
    style.id = STYLE_EL_ID;
    style.setAttribute('type', 'text/tailwindcss');
    style.textContent = TAILWIND_CANVAS_CSS;
    doc.head.appendChild(style);
  }

  if (!doc.getElementById(SCRIPT_EL_ID)) {
    const script = doc.createElement('script');
    script.id = SCRIPT_EL_ID;
    script.src = scriptUrl;
    doc.head.appendChild(script);
  }
}
