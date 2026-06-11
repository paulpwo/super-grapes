## [0.12.0] - 2026-06-11

### Features
- **(components)**: new `sg-carousel` + `sg-carousel-slide` — slides container with auto-generated prev/next arrows and dot indicators, optional autoplay via `data-autoplay="<ms>"`; vanilla-JS GrapesJS component script (no external deps) that runs both inside the canvas and on published pages
- **(components)**: new `sg-gallery` + `sg-gallery-item` — responsive image grid (Tailwind grid classes, auto-fit defaults) with optional vanilla dialog-based lightbox gated by `data-lightbox="true"`; both widgets registered in the Widgets panel (Interactive)
- **(ai)**: carousel/gallery vocabulary in the system prompt with Tailwind-style markup shapes and placement guidance (carousel → testimonials/showcases/logos, gallery → portfolios/menus/cases)
- **(ai)**: "Full-Page Ambition" guidance — landing/full-page intents now demand 5–7+ varied sections, visual rhythm (alternating backgrounds/layout direction), and at least one "wow" moment; tiered under the skills-override priority statement
- **(tailwind)**: new `getTailwindBootstrapScript()` export — self-contained `<script>` snippet hosts print into published pages to inject the Tailwind runtime dynamically

### Bug Fixes
- **(ai)**: reference-image upload is no longer blocked by the vision-model allowlist when `generation.mode === 'endpoint'` — the server owns model choice and the endpoint contract already carries the image
- **(tailwind)**: documented and fixed the `tailwindcss/*.css` 404 console noise on published pages — the browser preload scanner speculatively fetches the `@import` specifiers when the stylesheet is embedded statically (the runtime itself resolves them to bundled virtual modules); `TAILWIND_CANVAS_CSS` is unchanged, the fix is dynamic injection via `getTailwindBootstrapScript()` (the editor canvas already injects dynamically and was never affected)


## [0.11.0] - 2026-06-11

### Features
- **(tailwind)**: Tailwind CSS is now the CORE styling technique of generated pages — the AI styles with Tailwind v4 utility classes (arbitrary values for brand hexes like `bg-[#c0392b]`, arbitrary font families like `font-[Syne,sans-serif]`, responsive `md:`/`lg:` variants); inline `style=` is demoted to a fallback for multi-stop gradients, one-off clip-paths, and background-image URLs
- **(tailwind)**: Tailwind v4 browser runtime injected into the GrapesJS canvas iframe so utility classes render live in the editor; configurable via `SuperGrapesConfig.tailwind` (`enabled` default true, `scriptUrl` default `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`); new `TailwindConfig` type plus `DEFAULT_TAILWIND_SCRIPT_URL`, `TAILWIND_CANVAS_CSS`, `resolveTailwindConfig`, `injectTailwindRuntime` exports so hosts can replicate the runtime on published pages
- **(tailwind)**: AI chat-modal preview iframe now runs the Tailwind runtime (in an isolated opaque origin) so generated pages preview correctly

### Changed
- **(components)**: component default styles wrapped in `:where(...)` (zero specificity) and the canvas Tailwind stylesheet imports `utilities.css` unlayered — utility classes now beat component defaults, while class-less manually-built elements keep their defaults and Style Manager inline edits still win over everything
- **(ai)**: `frontend-design` skill now speaks Tailwind — grid composition via `grid-cols-*`/`col-span-*`, glass-morphism via `backdrop-blur-md bg-white/10 border border-white/20`, arbitrary-value hexes and shadows. The `data-gjs-type` + `sg-section > sg-container > sg-column` structural contract is unchanged.


## [0.10.0] - 2026-06-11

### Features
- **(ai)**: pluggable generation backend — `AiConfig.generation` selects `direct` (default, single-shot provider call) or `endpoint` (POSTs intent + context to a host-owned generation loop and expects `{ html }`); new `GenerationBackend` / `DirectBackend` / `EndpointBackend` exported from the package
- **(ai)**: tunable generation params — `AiConfig.maxTokens` (default 8192) and `AiConfig.temperature` (default 0.7) now passed to the provider, fixing provider-default truncation on full pages
- **(ai)**: quality gate with one auto-retry — detects truncated output and too-few-section full pages, and re-requests once with a corrective prompt before surfacing an error (direct mode only; the endpoint owns its own quality loop)

### Changed
- **(ai)**: system-prompt overhaul — the fixed "Design System" block is now fallback-only guidance that the design skill and brand guides explicitly OVERRIDE; Google Fonts `<link>`, a single leading `<style>` block, and CSS Grid inside columns are now permitted; the single cookie-cutter example was replaced with two structurally different examples. The load-bearing `data-gjs-type` + `sg-section > sg-container > sg-column` contract is unchanged.


## [0.9.0] - 2026-05-17

### Features
- **(topbar)**: add templates button; fix release dist inclusion


## [0.8.0] - 2026-05-17

### Features
- **(code-editor)**: build dist with lineWrapping and comment formatting


## [0.7.4] - 2026-05-16

### Bug Fixes
- ****: trigger v0.7.3 release


## [0.7.2] - 2026-05-16

### Bug Fixes
- **(dist)**: rebuild with avoidInlineStyle + forceClass false by default


## [0.7.1] - 2026-05-16

### Bug Fixes
- ****: trigger v0.7.1 release


## [0.6.1] - 2026-05-16

### Bug Fixes
- ****: retrigger release after branch protection fix
- ****: trigger v0.6.1 release


## [0.5.2] - 2026-05-16

### Other Changes
- 📦 chore(dist): track dist/ for npm install from git


## [0.5.1] - 2026-03-28


## [0.5.0] - 2026-03-28

### Features
- **(theme)**: rebrand AI prompt to Super Grapes identity and add project skills


## [0.4.0] - 2026-03-28

### Features
- ****: modernize AI prompt UI with animated border, aurora glow, and manual mode CTA


## [0.3.4] - 2026-03-28


## [0.3.3] - 2026-03-28


## [0.3.2] - 2026-03-28


## [0.3.1] - 2026-03-28

### Bug Fixes
- ****: auto-inject Font Awesome in UIManager constructor (#2)


## [0.3.0] - 2026-03-28

### Features
- ****: add example project for library integration (#1)


# Changelog

## [0.2.0] - 2026-03-28

### Features
- ****: auto-release on merge to main with changelog

