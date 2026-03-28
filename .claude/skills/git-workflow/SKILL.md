# Git Workflow — Super Grapes

Rules for commits, branches, PRs, releases, and changelog generation in this project.

## Branch Strategy

### Main Branches
| Branch | Purpose |
|--------|---------|
| `main` | Production. Every merge triggers auto-release via GitHub Actions |
| `develop` | Integration branch for feature work (optional, PRs can target main directly) |

### Branch Naming

Format: `type/short-description` in **kebab-case**.

| Prefix | Use | Example |
|--------|-----|---------|
| `feat/` | New feature | `feat/template-gallery` |
| `fix/` | Bug fix | `fix/slider-drag-jitter` |
| `refactor/` | Code refactor | `refactor/style-manager` |
| `docs/` | Documentation only | `docs/api-reference` |
| `chore/` | Maintenance, deps, config | `chore/update-grapesjs` |
| `ci/` | CI/CD pipeline changes | `ci/add-e2e-tests` |
| `style/` | CSS/visual changes only | `style/dark-theme-polish` |
| `test/` | Adding or updating tests | `test/ai-client-unit` |

**Rules:**
- Always lowercase, kebab-case: `feat/canvas-add-bar` not `feat/CanvasAddBar`
- Max 4 words after prefix: `fix/hover-state-toggle` not `fix/the-hover-state-toggle-button-not-working`
- No issue numbers in branch name (use PR description instead)

## Commit Messages

### Format: Conventional Commits

```
type(scope): short description

[optional body]

[optional footer]
```

### Types

| Type | Emoji | Release Bump | Description |
|------|-------|--------------|-------------|
| `feat` | - | **minor** | New feature or capability |
| `fix` | - | **patch** | Bug fix |
| `docs` | - | none | Documentation only |
| `style` | - | none | CSS/formatting, no logic change |
| `refactor` | - | none | Code restructure, no behavior change |
| `perf` | - | **patch** | Performance improvement |
| `test` | - | none | Adding or updating tests |
| `chore` | - | none | Maintenance, deps, tooling |
| `ci` | - | none | CI/CD changes |
| `revert` | - | **patch** | Reverts a previous commit |

### Breaking Changes → **major** bump

Add `!` after type or include `BREAKING CHANGE:` in footer:
```
feat!: replace storage API with new async interface

BREAKING CHANGE: storage.save() is now async and returns a Promise
```

### Scope (optional but recommended)

The scope is the module or area affected:

| Scope | Area |
|-------|------|
| `ai` | AI client, prompts, skills |
| `canvas` | Canvas add bar, AI prompt, iframe |
| `controls` | Slider, dim-control, color-picker, etc. |
| `navigator` | Layer tree |
| `sidebar` | Sidebar shell, mode switching |
| `topbar` | Topbar buttons, device switcher |
| `panels` | Edit panel, widgets panel |
| `theme` | CSS variables, theme files |
| `components` | GrapesJS component types |
| `blocks` | Block definitions |
| `config` | Editor config, build config |
| `storage` | Storage module |
| `keymaps` | Keyboard shortcuts |
| `context-menu` | Right-click menu |
| `deps` | Dependency updates |
| `release` | Release automation |

### Examples

```bash
# Good
feat(ai): add voice-to-text input to AI prompt
fix(controls): prevent slider DOM destruction during drag
docs: add brand guide skill
style(theme): align sidebar search icon vertically
refactor(panels): extract tab rendering into separate functions
chore(deps): update grapesjs to 0.21.14
ci: add type-check step to PR workflow

# Bad
updated stuff                          # no type, vague
feat: fix bug                          # wrong type
fix(slider-row.ts): fixed the bug      # scope is file name, not module
FEAT: ADD NEW FEATURE                  # no caps
feat(ai): add voice-to-text input to AI prompt so users can speak their prompts instead of typing  # too long
```

### Rules
- **No AI attribution** in commits. Never add "Co-Authored-By" or AI credits
- Subject line max 72 characters
- Use imperative mood: "add feature" not "added feature" or "adds feature"
- No period at the end of subject line
- Body wraps at 80 characters
- Reference issues in body if relevant: `Closes #42`

## Pull Requests

### Title Format

Same as commit message but without scope parentheses:

```
feat: add template gallery with drag-to-canvas
fix: hover state not applying styles in canvas
docs: update installation guide for v1.0
```

### PR Description Template

```markdown
## Summary
- [1-3 bullet points of what changed and why]

## Changes
- [Detailed list of what was modified]

## Test plan
- [ ] [How to verify the change works]
```

### Rules
- PR title becomes the merge commit message (squash merge)
- Keep PRs focused: one feature or fix per PR
- Link related issues in description
- Add screenshots for visual changes

## Release Automation

### How It Works

On every push to `main` (that isn't a `chore(release):` commit):

1. **Determine bump**: Scans commits since last tag
   - Any `feat!:` or `BREAKING CHANGE` → **major** (0.x.0 → 1.0.0)
   - Any `feat:` → **minor** (0.3.x → 0.4.0)
   - Otherwise → **patch** (0.3.3 → 0.3.4)
2. **Bump** `package.json` version
3. **Generate changelog**: Groups commits by type (Features, Bug Fixes, Other)
4. **Commit** `chore(release): vX.Y.Z` + tag `vX.Y.Z`
5. **Build** library (`pnpm build:lib`)
6. **Publish** to GitHub Packages (`@paulpwo/super-grapes`)
7. **Create GitHub Release** with release notes from changelog

### Changelog Format (auto-generated)

```markdown
## [0.4.0] - 2026-03-28

### Features
- **ai**: add voice-to-text input to AI prompt
- **canvas**: inline AI prompt with animated border

### Bug Fixes
- **controls**: prevent slider DOM destruction during drag
- **topbar**: mobile device button not working
```

### What Makes Good Release Notes

The quality of the changelog depends entirely on commit messages:

**Good commits → Good changelog:**
```
feat(ai): add brand color injection to AI-generated pages
fix(canvas): file input blocked inside GrapesJS iframe
```
Produces:
```
### Features
- **ai**: add brand color injection to AI-generated pages

### Bug Fixes
- **canvas**: file input blocked inside GrapesJS iframe
```

**Bad commits → Useless changelog:**
```
fix stuff
update
wip
```
Produces:
```
### Other Changes
- fix stuff
- update
- wip
```

### Manual Release (if needed)

```bash
# Trigger release manually by pushing an empty commit
git commit --allow-empty -m "feat: trigger release"
git push origin main
```

## Workflow Files

| File | Purpose |
|------|---------|
| `.github/workflows/release.yml` | Auto-release on push to main |
| `.github/workflows/ci.yml` | Type check + build on PRs |

## Quick Reference

```
Branch:    feat/my-feature
Commit:    feat(scope): short imperative description
PR Title:  feat: short imperative description
Merge:     Squash merge to main
Release:   Automatic on merge (conventional commits → version bump → changelog → publish)
```
