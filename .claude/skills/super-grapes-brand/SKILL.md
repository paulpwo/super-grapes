# Super Grapes Brand Guide

This skill defines the visual identity of Super Grapes. Follow these rules when creating or modifying any UI element in the project.

## Brand Identity

- **Name**: Super Grapes (with space, capitalized). Hyphenated in code: `super-grapes`
- **Tagline**: AI-Powered Builder
- **Logo**: Grape cluster (transitioning to orange grapes) with "G" center, hexagonal grid overlay, green leaves, cyan highlights
- **Logo files**: `src/assets/logo.png` (full), `src/assets/logo-small.png` (icon)

## Color Palette

### Primary Accent
```
#c0392b  — Primary accent (buttons, active states, selected items)
#e74c3c  — Accent hover / lighter variant
#a93226  — Accent dark / pressed variant
#ff8a80  — Accent glow highlight (used in animated borders)
```

### Backgrounds (Dark Theme)
```
#0e0e0e  — Base background (--sg-bg)
#1e2024  — Surface / cards (--sg-bg-2)
#282a2e  — Elevated surface (--sg-bg-3)
#464646  — Highest surface (--sg-bg-4)
#0d0d15  — AI prompt fullscreen background (deeper dark)
```

### Text
```
#e0e0e0  — Primary text (--sg-text)
#e8e8e8  — Muted text (--sg-text-muted)
#5e5e64  — Dim / placeholder text (--sg-text-dim)
rgba(255,255,255,0.5) — Subtitle / secondary text on dark
rgba(255,255,255,0.3) — Animated placeholder text
```

### Borders & Misc
```
#3a3c3f  — Default border (--sg-border)
#c080d0  — Navigator node (--sg-node)
#50d57d  — Success green (--sg-green)
#dad6cf  — Canvas background (--sg-canvas-bg)
```

### CSS Custom Properties
All custom properties use the `--sg-` prefix. Defined in `src/ui/theme/variables.css`.

## Typography

```css
--sg-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--sg-font-mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
--sg-font-size: 12px;      /* Default UI text */
--sg-font-size-sm: 11px;   /* Small labels */
--sg-font-size-xs: 10px;   /* Tiny text */
```

- Titles in AI prompt: 36px, font-weight 800, letter-spacing -0.5px
- Subtitle: 15px, line-height 1.5
- UI controls: 12-13px
- No custom fonts loaded — system font stack only

## Aesthetic Rules

### Shape
- **Square aesthetic**: `border-radius: 0-2px` for all UI elements (buttons, chips, cards, inputs)
- Exception: AI prompt input bar uses `border-radius: 10px` (special case for the hero element)
- `--sg-radius: 2px` is the standard

### Icons
- **Font Awesome 6 Free** only. No Pro, no emojis, no custom SVGs
- Auto-injected via CDN in `UIManager` constructor
- FA classes: `fa-solid` preferred, `fa-regular` when needed

### Dark Theme
- Everything is dark theme. No light mode
- All CSS files in `src/ui/theme/` use `--sg-*` variables
- GrapesJS base CSS imported before theme CSS (order matters)

## Animated Border Pattern

The signature animated border effect used on AI-related elements. Uses CSS Houdini `@property` for smooth angle animation.

### How it works

1. Register a custom property for the angle:
```css
@property --sg-ai-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
```

2. Create a `::before` pseudo-element with `conic-gradient` using brand colors:
```css
.element::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 2px;                /* Match parent border-radius */
  padding: 2px;                      /* Border thickness */
  background: conic-gradient(
    from var(--sg-ai-angle),
    #c0392b, #e74c3c, #ff8a80, #e74c3c, #a93226, #c0392b
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: sg-border-spin 3s linear infinite;
  z-index: -1;
  pointer-events: none;
}
```

3. Animate the angle:
```css
@keyframes sg-border-spin {
  to { --sg-ai-angle: 360deg; }
}
```

### Key rules
- The parent element needs `position: relative; overflow: hidden; z-index: 0`
- The mask trick (`mask-composite: exclude`) creates a hollow center so only the border shows
- `padding` on `::before` controls border thickness (1.5px-2px typical)
- Color stops: dark red → red → light pink → red → darker red → dark red (seamless loop)
- Speed: 3s per rotation (`linear infinite`)
- On `:focus-within`, increase `padding` to 2px and add `filter: brightness(1.3)` for emphasis

### Where it's used
- `src/ui/theme/ai.css` — AI Assistant topbar button (`.sg-ai-btn::before`)
- `src/ui/canvas/canvas-ai-prompt.ts` — Inline AI prompt input bar (`.sg-aip-bar::before`)

### In iframes
When injecting into GrapesJS iframe via `<style>` tags, `@property` works normally. Use a different variable name to avoid conflicts (e.g., `--sg-aip-angle` inside the iframe).

## Aurora Glow Effect

Used as background ambiance on the AI prompt screen.

```css
.aurora {
  position: absolute;
  top: 50%; left: 50%;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(192,57,43,0.35) 0%,
    rgba(231,76,60,0.12) 40%,
    transparent 70%
  );
  filter: blur(80px);
  animation:
    aurora-rotate 18s linear infinite,
    aurora-pulse 9s ease-in-out infinite;
  pointer-events: none;
}
```

- Two layers: primary (600px, 18s rotate) + secondary (500px, 25s reverse rotate)
- Colors: `rgba(192,57,43,...)` and `rgba(231,76,60,...)` — brand red tones
- Heavy blur (80-100px) for soft glow
- Pulse animation scales 1.0 → 1.2 at 0.3 → 0.55 opacity

## Glassmorphism Pattern

Used for elevated containers over dark backgrounds (AI prompt input bar).

```css
.glass {
  background: rgba(13, 13, 21, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;                        /* Border comes from animated ::before */
}
```

## File Structure Reference

```
src/ui/theme/
  variables.css   — All --sg-* custom properties
  index.css       — Imports all theme files
  editor.css      — Canvas, toolbar, badge overrides
  topbar.css      — Topbar layout
  sidebar.css     — Sidebar zones
  controls.css    — All control styling
  navigator.css   — Layer tree
  context-menu.css — Right-click menu
  widgets.css     — Widget cards
  ai.css          — AI button + modal styling
```
