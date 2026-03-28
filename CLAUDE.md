# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Super-Grapes is a visual page builder built on GrapesJS. It's a single Vite project with source organized in `src/core` and `src/ui` folders (NOT a monorepo). All editor UI is custom vanilla TypeScript + CSS — GrapesJS only provides the canvas, component model, and undo/redo.

## Commands

```bash
pnpm dev          # Start dev server at localhost:5173 (Vite)
pnpm build        # Build to dist/
pnpm clean        # Remove dist/ folder
```

No test suite exists yet.

## Architecture

### Two-Phase Initialization

The editor initializes in two phases (see `src/main.ts`):
1. `UIManager` creates the DOM shell (topbar, sidebar, canvas container)
2. `createEditor()` mounts GrapesJS into `#sg-canvas`
3. `ui.connect(editor)` wires sidebar panels, navigator, context menu to editor events

### GrapesJS Custom Mode

All four GrapesJS managers use `custom: true` (`config.ts`), which suppresses default UI and emits events instead:
- `block:custom` → `widgets-panel.ts` renders block cards
- `trait:custom` → `edit-panel.ts` → `edit-content.ts` renders trait controls
- `style:custom` → `edit-panel.ts` → `edit-style.ts` renders style controls
- `layer:custom` → `navigator.ts` renders component tree

### Project Structure

**`src/core/`** — GrapesJS initialization, component types, block definitions
- `editor.ts`: `createEditor()` — registers all component types as a GrapesJS plugin (runs during `grapesjs.init()` so types exist before HTML parsing via `data-gjs-type`)
- `config.ts`: `buildGrapesConfig()` — sets `custom:true` on all managers, defines 6 style sectors
- `components/`: 14 component types (`sg-section`, `sg-container`, `sg-column`, `sg-heading`, `sg-text`, `sg-image`, `sg-button`, etc.) — all use `data-gjs-type` for resolution, no `isComponent` overrides
- `blocks/`: 24 blocks in 4 categories (Layout, Basic, Interactive, Forms)

**`src/ui/`** — Editor shell, panels, controls, dark theme
- `ui-manager.ts`: `UIManager` class — orchestrates shell creation and editor connection
- `shell/`: `editor-shell.ts` (DOM layout), `topbar.ts` (undo/redo, devices, sw-visibility, preview, save), `sidebar.ts` (widgets/edit/navigator mode switching)
- `panels/`: `widgets-panel.ts` (block cards with drag), `edit-panel.ts` (tab manager), `edit-content.ts` (traits), `edit-style.ts` (style sectors), `edit-advanced.ts` (layout, position, responsive, attributes, custom CSS)
- `controls/`: `slider-row.ts`, `dim-control.ts` (4-input T/R/B/L with unit selector + link), `color-picker.ts`, `icon-toggle.ts`, `state-toggle.ts`, plus typography-panel, spacing-box, bg-type-group, gradient-picker, box-shadow
- `theme/`: CSS files with `--sg-*` custom properties. GrapesJS CSS is imported in `src/main.ts` before theme CSS

### Key Event Flow

```
component:selected → sidebar switches to edit mode, edit-panel renders tabs
component:deselected → sidebar switches to widgets mode
sg:tab-change (CustomEvent, bubbles) → edit-panel re-renders active tab
style:custom → edit-panel re-renders style tab (if active)
trait:custom → edit-panel re-renders content tab (if active)
```

## Critical Conventions

- GrapesJS CSS must be imported before theme CSS (toolbar, badge, tools overlay depend on GrapesJS base styles) — both imports are in `src/main.ts`
- `.gjs-cv-canvas` must keep `position: absolute` (GrapesJS default) — overriding to `relative` breaks toolbar/badge positioning
- Component types are registered as a GrapesJS plugin inside `createEditor()` so they exist before HTML parsing
- Style property values are applied via `property.upValue(value)` (GrapesJS StyleManager API)
- Trait values are applied via `trait.setValue(value)` (GrapesJS TraitManager API)
- Font Awesome 6 Free only, no emojis
- Square aesthetic (border-radius: 0-2px)

## Skills

| Skill | Path | When to read |
|-------|------|-------------|
| Brand Guide | `.claude/skills/super-grapes-brand/SKILL.md` | Before modifying any UI element — colors, borders, animations, typography |
| Git Workflow | `.claude/skills/git-workflow/SKILL.md` | Before commits, PRs, branch creation, or release-related work |
| GrapesJS Expert | `.claude/skills/grapesjs-expert/SKILL.md` | When working with GrapesJS API, events, components, or configuration |

## Current Status

See `docs/QA-FIX-PLAN.md` for the prioritized list of bugs with root causes and fixes.
