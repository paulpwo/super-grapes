import type { TailwindConfig } from './types';
/** Default Tailwind v4 browser runtime (compiles utility classes at runtime in the canvas iframe). */
export declare const DEFAULT_TAILWIND_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
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
export declare const TAILWIND_CANVAS_CSS = "\n@layer theme, base;\n@import \"tailwindcss/theme.css\" layer(theme);\n@import \"tailwindcss/preflight.css\" layer(base);\n@import \"tailwindcss/utilities.css\";\n";
/**
 * Self-contained bootstrap snippet for PUBLISHED pages.
 *
 * IMPORTANT — embed method matters (verified empirically): if the
 * `<style type="text/tailwindcss">` block is embedded STATICALLY in the page
 * HTML, the browser's preload scanner speculatively fetches the relative
 * `tailwindcss/*.css` import specifiers (it ignores the style type attribute)
 * and logs three 404s before discarding the responses. The runtime itself never
 * needs those requests — it resolves the specifiers to bundled virtual modules.
 * Injecting the style element DYNAMICALLY (as this snippet does, and as the
 * editor canvas already does) produces zero spurious requests.
 *
 * Hosts should print this snippet into published pages instead of embedding the
 * stylesheet markup directly.
 */
export declare function getTailwindBootstrapScript(scriptUrl?: string): string;
/** Resolved Tailwind settings (defaults applied). */
export interface ResolvedTailwindConfig {
    enabled: boolean;
    scriptUrl: string;
}
/** Apply defaults: Tailwind is the core styling technique, so it is ON unless disabled. */
export declare function resolveTailwindConfig(config?: TailwindConfig): ResolvedTailwindConfig;
/**
 * Inject the Tailwind runtime (custom stylesheet + browser runtime script) into a
 * document — the GrapesJS canvas iframe. Idempotent: safe to call on every frame load.
 * The stylesheet must be present before/when the runtime initializes, so it is
 * appended first.
 */
export declare function injectTailwindRuntime(doc: Document, scriptUrl: string): void;
//# sourceMappingURL=tailwind.d.ts.map