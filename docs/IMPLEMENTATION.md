# Super-Grapes — Implementation Status

## Architecture

pnpm monorepo with two main packages + vanilla example:

```
super-grapes/
├── packages/
│   ├── core/    @super-grapes/core   — GrapesJS init, components, blocks
│   └── ui/      @super-grapes/ui     — Shell, panels, controls, theme
└── examples/
    └── vanilla/ — Working demo at localhost:5173
```

**Core design**: GrapesJS with `custom: true` on BlockManager, StyleManager, TraitManager, and LayerManager. All UI is custom vanilla TS + CSS. GrapesJS handles the canvas, component model, undo/redo, and storage.

---

## Implemented Features

### Core Package (`@super-grapes/core`)

#### Component Types (14 total)
| Type | File | Status |
|------|------|--------|
| `sg-section` | `components/section.ts` | OK — wrapper with full-width default |
| `sg-container` | `components/container.ts` | OK — max-width container |
| `sg-column` | `components/column.ts` | OK — flex child |
| `sg-heading` | `components/heading.ts` | OK — h1-h6 |
| `sg-text` | `components/text.ts` | OK — paragraph |
| `sg-image` | `components/image.ts` | OK — img tag |
| `sg-button` | `components/button.ts` | OK — styled anchor |
| `sg-video` | `components/video.ts` | OK — video embed |
| `sg-divider` | `components/divider.ts` | OK — hr element |
| `sg-spacer` | `components/spacer.ts` | OK — empty div with height |
| `sg-icon` | `components/icon.ts` | OK — Font Awesome icon |
| `sg-form` | `components/form.ts` | OK — form element |
| `sg-accordion` | `components/accordion.ts` | OK — collapsible sections |
| `sg-tabs` | `components/tabs.ts` | OK — tabbed content |

All types use `data-gjs-type` for resolution (no `isComponent` overrides).

#### Blocks (24 total)
| Category | Blocks |
|----------|--------|
| Layout (6) | Section, 2 Columns, 3 Columns, 4 Columns, Sidebar Left, Sidebar Right |
| Basic (8) | Heading, Text, Image, Video, Button, Divider, Spacer, Icon |
| Interactive (3) | Accordion, Tabs, Icon Box |
| Forms (7) | Form, Input, Textarea, Select, Checkbox, Radio, Submit Button |

#### Config (`config.ts`)
- `custom: true` on all 4 managers (blocks, styles, traits, layers)
- 6 style sectors: General, Dimension, Typography, Decorations, Flex, Extra
- Font Awesome 6 Free injected into canvas iframe
- No default GrapesJS panels
- 3 devices: Desktop (100%), Tablet (768px), Mobile (320px)

### UI Package (`@super-grapes/ui`)

#### Shell
| Component | File | Status |
|-----------|------|--------|
| Editor Shell | `shell/editor-shell.ts` | OK — `.sg-editor > .sg-topbar + .sg-main(.sg-sidebar + .sg-canvas-wrap)` |
| Topbar | `shell/topbar.ts` | OK — undo/redo, devices, component borders (sw-visibility), preview, navigator, save |
| Sidebar | `shell/sidebar.ts` | OK — widgets/edit/navigator modes, auto-switch on select/deselect |

#### Panels
| Panel | File | Status |
|-------|------|--------|
| Widgets Panel | `panels/widgets-panel.ts` | OK — grid of block cards, search, categorized |
| Edit Panel | `panels/edit-panel.ts` | OK — tab manager (Content/Style/Advanced), listens to `sg:tab-change` |
| Content Tab | `panels/edit-content.ts` | OK — renders GrapesJS traits (text, number, select, checkbox, color, button) |
| Style Tab | `panels/edit-style.ts` | OK — renders style sectors with controls |
| Advanced Tab | `panels/edit-advanced.ts` | OK — layout, positioning, responsive, attributes, custom CSS |

#### Controls
| Control | File | Status | Notes |
|---------|------|--------|-------|
| Slider Row | `controls/slider-row.ts` | PARTIAL | Slider + number input. Bug: only steps by 1 per drag, no smooth continuous dragging |
| Dim Control | `controls/dim-control.ts` | OK | 4 inputs (T/R/B/L) + incrementers + unit selector + link button |
| Color Picker | `controls/color-picker.ts` | OK | Native color input + hex text input + clear button |
| Icon Toggle | `controls/icon-toggle.ts` | OK | Button group for flex-direction, justify-content, align-items, text-align |
| State Toggle | `controls/state-toggle.ts` | BASIC | Normal/Hover toggle — needs verification with pseudo-class styling |
| Typography Panel | `controls/typography-panel.ts` | EXISTS | Font family/size/weight — needs testing |
| Spacing Box | `controls/spacing-box.ts` | EXISTS | Visual margin/padding box — needs testing |
| BG Type Group | `controls/bg-type-group.ts` | EXISTS | Background type selector — needs testing |
| Gradient Picker | `controls/gradient-picker.ts` | EXISTS | Gradient editor — needs testing |
| Box Shadow | `controls/box-shadow.ts` | EXISTS | Box shadow editor — needs testing |

#### Navigator
| Component | File | Status |
|-----------|------|--------|
| Navigator | `navigator/navigator.ts` | OK — tree view with expand/collapse, select, visibility toggle, double-click rename |

#### Context Menu
| Component | File | Status |
|-----------|------|--------|
| Context Menu | `context-menu/context-menu.ts` | EXISTS — needs testing |

#### Theme (CSS)
| File | Purpose |
|------|---------|
| `variables.css` | CSS custom properties (`--sg-*` prefix, dark Elementor theme) |
| `editor.css` | GrapesJS canvas overrides, toolbar/badge/highlighter theming |
| `topbar.css` | Topbar layout and buttons |
| `sidebar.css` | Sidebar zones, edit header, tabs |
| `controls.css` | All control styling (slider, dim, color, toggle, etc.) |
| `navigator.css` | Layer tree styling |
| `context-menu.css` | Right-click menu styling |
| `widgets.css` | Widget card grid styling |
| `index.css` | Imports all CSS files |

GrapesJS base CSS (`grapesjs/dist/css/grapes.min.css`) is imported before theme CSS so GrapesJS defaults (toolbar sizing, badge positioning, tools overlay) are preserved.

#### Topbar Features
- Undo/Redo buttons (with disabled state tracking)
- Device switcher (Desktop/Tablet/Mobile)
- **Component Borders toggle** (`sw-visibility`) — active by default, shows dashed outlines on all components
- Preview button
- Navigator toggle
- Save button

### Drag & Drop (Widgets → Canvas)
| Feature | Status |
|---------|--------|
| `block:custom` event capture | OK — `dragStart/drag/dragStop` helpers cached |
| `editor.Blocks.startDrag()` | OK — initiates GrapesJS sorter |
| Drag ghost (follows cursor) | IMPLEMENTED — shows widget icon + label at cursor |
| GrapesJS drop zone (sorter placeholder) | PARTIAL — pointermove forwarded to iframe, needs real user testing |
| Drop indicator (custom overlay) | IMPLEMENTED — mirrors GrapesJS placeholder position |
| Component creation on drop | NEEDS TESTING — relies on GrapesJS `endDrag()` |

---

## GrapesJS Integration Notes

### Canvas Tools Overlay
GrapesJS renders toolbar, badge, and highlighter inside `.gjs-cv-canvas__tools` which overlays the iframe. Key CSS requirement:
- `.gjs-cv-canvas` must keep `position: absolute` (GrapesJS default)
- We import `grapesjs/dist/css/grapes.min.css` first, then override only colors/appearance

### Custom Event Flow
```
block:custom    → widgets-panel.ts (block cards rendering)
trait:custom    → edit-panel.ts → edit-content.ts (Content tab)
style:custom    → edit-panel.ts → edit-style.ts (Style tab)
layer:custom    → navigator.ts (tree rendering)
component:selected/deselected → sidebar.ts (mode switching)
sg:tab-change   → edit-panel.ts (tab switching, bubbles from sidebar)
```

---

## Known Issues

1. **Slider drag is steppy** — `slider-row.ts` slider only moves in discrete steps (1 unit per drag increment) instead of smooth continuous values. The `step` attribute is set to `1` from GrapesJS property config, but the UX should feel smoother.

2. **Drag & drop needs real-user testing** — Synthetic `PointerEvent` dispatched to iframe may not trigger GrapesJS sorter the same way as real browser events. The ghost and drop indicator are implemented but the actual component drop flow hasn't been verified with real mouse interaction.

3. **Style tab re-render** — When switching between components, the style tab re-renders all sectors. With many properties this can feel slow.

4. **Color picker is basic** — Uses native HTML `<input type="color">` popup. No support for opacity/alpha, gradients inline, or eyedropper.

5. **Custom CSS section** — Parses CSS naively (regex) and applies inline. Doesn't support pseudo-classes, media queries, or proper scoped CSS.

6. **Navigator drag reorder** — Not implemented. Can select and toggle visibility but can't reorder components by dragging in the navigator tree.

7. **Context menu** — Exists but needs verification of all actions (copy, paste, duplicate, delete, move up/down).

8. **Typography panel, spacing box, gradient picker, box shadow** — Files exist but haven't been verified to render correctly with real GrapesJS style properties.
