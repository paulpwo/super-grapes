# Super-Grapes — QA Roadmap & Bug Fixes

Checklist to verify and fix every implemented feature. Priority order: critical UX first, then polish.

---

## P0 — Critical (Blocks UX)

### [ ] Fix: Drag & Drop from sidebar to canvas
**Problem**: Ghost follows cursor but component may not actually drop into the canvas. GrapesJS sorter relies on pointer events reaching the iframe element.
**Test**: Drag "Heading" from sidebar → canvas. A new heading should appear. Try all 24 blocks.
**Possible fix**: If `dragStart/drag/dragStop` helpers don't work reliably with forwarded events, switch to click-to-add (on click, `editor.addComponents()` to selected or wrapper) as a fallback, then implement proper drag separately.

### [x] Fix: Slider controls only step by 1
**Problem**: In Style tab, slider (e.g., font-size, padding) only increments/decrements by 1 per drag movement. No smooth continuous feel.
**Root cause**: `style:custom` event caused full DOM re-render of style tab during drag, destroying the slider mid-interaction.
**Fix applied**: Debounced re-render (100ms) in `edit-panel.ts` + `_isUserInteracting` flag set via `pointerdown`/`pointerup` in `slider-row.ts` to suppress re-renders during drag.
**Files**: `src/ui/panels/edit-panel.ts`, `src/ui/controls/slider-row.ts`

---

## P1 — Important UX

### [ ] Verify: Component selection + toolbar
**Test**: Click any component in canvas. Should see:
- Blue outline around selected component
- Badge with component type name (top-left)
- Toolbar with 4 buttons: parent, move, duplicate, delete (top-right)
- Sidebar switches to Edit mode with Content/Style/Advanced tabs
**Status**: Toolbar and badge now render (GrapesJS CSS loaded). Needs visual verification that positioning is correct.

### [ ] Verify: Component borders toggle (sw-visibility)
**Test**: Topbar "borders" button should be active by default. All components in canvas should show dashed outlines. Click button to toggle off — outlines disappear. Click again — outlines return.
**File**: `src/ui/shell/topbar.ts`

### [ ] Verify: Content tab (Traits)
**Test**: Select a heading → Content tab should show traits (e.g., tag type selector for h1-h6). Select an image → should show src URL input. Select a button → should show link URL, text.
**Check**: Do trait value changes actually update the component in the canvas?
**File**: `src/ui/panels/edit-content.ts`

### [ ] Verify: Style tab sectors
**Test**: Select any component → Style tab. Should see collapsible sections (General, Dimension, Typography, etc.) with appropriate controls per property type:
- `number/slider` → slider + number input
- `composite` (margin/padding) → 4 inputs with incrementers
- `select/radio` for flex props → icon toggle buttons
- `color` → color swatch + hex input
- Other → text input
**Check**: Do style changes apply to the component in real-time?
**File**: `src/ui/panels/edit-style.ts`

### [ ] Verify: Advanced tab
**Test**: Select component → Advanced tab. Should see:
- Layout: Margin/Padding dim controls, align-self, order, flex-grow/shrink/basis
- Positioning: position select, top/right/bottom/left/z-index inputs
- Responsive: Desktop/Tablet/Mobile visibility toggles
- Attributes: CSS ID input, CSS Classes input
- Custom CSS: textarea with syntax
**Check**: Do changes apply correctly?
**File**: `src/ui/panels/edit-advanced.ts`

### [ ] Verify: State toggle (Normal/Hover)
**Test**: In Style tab, toggle from Normal to Hover. Style controls should now show/edit `:hover` pseudo-class styles. Changes should only affect hover state.
**File**: `src/ui/controls/state-toggle.ts`

### [ ] Verify: Navigator panel
**Test**: Click navigator button in topbar. Should see tree of all components with:
- Expand/collapse arrows
- Type icons
- Click to select
- Double-click to rename
- Eye icon to toggle visibility
**File**: `src/ui/navigator/navigator.ts`

---

## P2 — Control Quality

### [ ] Fix/Verify: Dim Control (4-input)
**Test**: Select component → Style tab → find margin or padding section:
- 4 inputs (T, R, B, L) with up/down increment buttons
- Link button: when linked, changing one value changes all 4
- Unit button: click shows popup with px, %, em, rem, vw options
- Changing unit re-applies all values with new unit
**File**: `src/ui/controls/dim-control.ts`

### [ ] Fix/Verify: Color Picker
**Test**: Select component → Style tab → find color property:
- Color swatch shows current color
- Click swatch → native color picker popup
- Hex text input shows/accepts hex values
- Clear button (X) removes the color
- Changing color updates component in real-time
**File**: `src/ui/controls/color-picker.ts`

### [ ] Fix/Verify: Icon Toggle groups
**Test**: Select a flex container → Style tab:
- flex-direction: row/row-reverse/column/column-reverse icons
- justify-content: start/center/end/space-between/space-around icons
- align-items: start/center/end/stretch/baseline icons
- text-align: left/center/right/justify icons
- Active state highlights correctly
- Changing value applies to component
**File**: `src/ui/controls/icon-toggle.ts`

### [ ] Verify: Typography Panel
**Test**: Select text/heading → Style tab → Typography section:
- Font family selector
- Font size slider
- Font weight selector
- Line height, letter spacing
**File**: `src/ui/controls/typography-panel.ts`

### [ ] Verify: Spacing Box
**Test**: Visual box showing margin/padding with editable values
**File**: `src/ui/controls/spacing-box.ts`

### [ ] Verify: Background Type Group
**Test**: Background section with type selector (solid, gradient, image)
**File**: `src/ui/controls/bg-type-group.ts`

### [ ] Verify: Gradient Picker
**Test**: When background type is gradient, shows gradient editor
**File**: `src/ui/controls/gradient-picker.ts`

### [ ] Verify: Box Shadow
**Test**: Box shadow editor with X/Y/blur/spread/color inputs
**File**: `src/ui/controls/box-shadow.ts`

---

## P3 — Polish

### [ ] Verify: Context Menu
**Test**: Right-click on component in canvas → context menu with actions (copy, paste, duplicate, delete, select parent, etc.)
**File**: `src/ui/context-menu/context-menu.ts`

### [ ] Verify: Undo/Redo
**Test**: Make changes → Ctrl+Z undoes → Ctrl+Shift+Z redoes. Topbar buttons enable/disable correctly.

### [ ] Verify: Device switcher
**Test**: Switch Desktop → Tablet → Mobile. Canvas iframe resizes. Component styles adapt.

### [ ] Verify: Preview mode
**Test**: Click preview → canvas shows full-screen preview without editor UI overlay. Click again → returns to edit mode.

### [ ] Verify: Save
**Test**: Click save → check console for store event or saved data output.

### [ ] Verify: Search widgets
**Test**: Type in search box → widgets filter in real-time. Clear → all widgets show.

### [ ] Verify: Sidebar mode switching
**Test**:
- No selection → widgets panel visible
- Click component → auto-switch to edit panel with Content tab
- Click back arrow → deselect, back to widgets
- Bottom toolbar: widgets icon, navigator icon

### [ ] Theme consistency
**Test**: All controls use `--sg-*` CSS variables. Dark theme is consistent. No white/light backgrounds leaking.

---

## P4 — Future (Phase 2+)

- [ ] React wrapper (`@super-grapes/react`)
- [ ] Vue wrapper (`@super-grapes/vue`)
- [ ] Tailwind plugin (`@super-grapes/plugin-tailwind`)
- [x] Templates/presets system — implemented via `canvas/template-modal.ts` (browse, upload, insert HTML templates)
- [ ] Navigator drag-to-reorder
- [ ] Advanced color picker (opacity, eyedropper, palette)
- [ ] Responsive style editing per device
- [x] Component copy/paste between pages — implemented via `keymaps.ts` (Cmd+C/V with clipboard)
- [x] Keyboard shortcuts (Del, Ctrl+D, Ctrl+C/V) — implemented in `keymaps.ts`
- [x] Export HTML/CSS — implemented in `topbar.ts` (export modal with copy + download)
