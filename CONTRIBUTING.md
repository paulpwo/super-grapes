# Contributing to Super Grapes

Thank you for your interest in contributing to Super Grapes! This guide will
help you get started.

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Setup

```bash
git clone <repo-url>
cd super-grapes
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:5173`.

### Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Build to dist/
pnpm clean    # Remove dist/
```

## Project Structure

Super Grapes is a **single Vite project** (not a monorepo). Source is organized
in two folders:

```
src/
  core/           # GrapesJS initialization, component types, blocks
    editor.ts     # createEditor() — registers all component types
    config.ts     # buildGrapesConfig() — custom:true on all managers
    components/   # 14 component types (sg-section, sg-heading, etc.)
    blocks/       # Block definitions in 4 categories
  ui/             # Editor shell, panels, controls, theme
    ui-manager.ts # Orchestrates shell creation and editor connection
    shell/        # topbar, sidebar, editor-shell
    panels/       # widgets-panel, edit-panel, edit-content, edit-style
    controls/     # slider-row, dim-control, color-picker, etc.
    theme/        # CSS files with --sg-* custom properties
```

All editor UI is custom vanilla TypeScript + CSS. GrapesJS only provides the
canvas, component model, and undo/redo.

## Code Conventions

### TypeScript

- Strict mode is enabled
- No frameworks for UI — vanilla TypeScript + DOM API
- Prefer `const` over `let`, avoid `var`

### GrapesJS Integration

- All four GrapesJS managers use `custom: true` (BlockManager, TraitManager,
  StyleManager, LayerManager)
- Component types use `data-gjs-type` for resolution, no `isComponent` overrides
- Style values are applied via `property.upValue(value)`
- Trait values are applied via `trait.setValue(value)`

### CSS

- All custom properties use the `--sg-*` prefix
- GrapesJS CSS must be imported before theme CSS in `src/main.ts`
- Square aesthetic: `border-radius: 0-2px`

### Icons

- Font Awesome 6 Free only
- No emojis in code or UI

## Submitting Issues

- Search existing issues before opening a new one
- Include steps to reproduce for bugs
- Include screenshots when relevant
- Use clear, descriptive titles

## Pull Requests

### Branch Naming

Use descriptive branch names:

```
feat/add-color-opacity
fix/hover-state-css
refactor/style-panel
docs/update-readme
```

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add opacity slider to color picker
fix: correct hover state CSS generation
refactor: simplify style sector rendering
docs: update architecture section
```

### PR Process

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes following the code conventions above
4. Verify your changes work by running `pnpm dev` and testing manually
5. Run `pnpm build` to ensure the build passes
6. Submit a PR with a clear description of what and why

### What We Look For

- Code follows existing patterns and conventions
- Changes are focused — one concern per PR
- No unnecessary refactoring of unrelated code
- Build passes cleanly

## Testing

There is no automated test suite yet. All verification is manual:

1. Run `pnpm dev`
2. Test your changes in the browser at `localhost:5173`
3. Verify no console errors
4. Test edge cases (empty editor, multiple components, undo/redo)

## Questions?

Open an issue with the `question` label or reach out at **paulpwo@gmail.com**.
