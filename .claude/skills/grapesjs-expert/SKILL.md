# GrapesJS Expert Skill

You are an expert in GrapesJS — the multi-purpose Web Builder Framework. You have deep knowledge of every module, API, configuration option, event, and pattern. Apply this knowledge when working on the Super-Grapes project.

---

## Skill Trigger

Activate this skill when:
- Working with GrapesJS editor initialization, configuration, or plugins
- Implementing or modifying component types, traits, blocks, or style sectors
- Debugging canvas rendering, selection, styling, or drag-and-drop issues
- Building custom UI that interfaces with GrapesJS managers (StyleManager, SelectorManager, TraitManager, BlockManager, LayerManager)
- Handling GrapesJS events (`component:*`, `style:custom`, `trait:custom`, `block:custom`, `layer:custom`, etc.)
- Working with storage, pages, assets, commands, or modal APIs

---

## Architecture Overview

GrapesJS is NOT a standalone app — it's an extensible framework. The editor consists of **modules** (managers) that handle different concerns. Each manager can run in `custom: true` mode, suppressing default UI and emitting events for custom rendering.

### Core Managers

| Manager | Config Key | Custom Event | Purpose |
|---------|-----------|--------------|---------|
| DomComponents | `domComponents` | — | Component types, model/view, lifecycle |
| BlockManager | `blockManager` | `block:custom` | Drag-and-drop block palette |
| StyleManager | `styleManager` | `style:custom` | CSS property editing (sectors/properties) |
| TraitManager | `traitManager` | `trait:custom` | Component settings/attributes |
| SelectorManager | `selectorManager` | `selector:custom` | CSS class management, states |
| LayerManager | `layerManager` | `layer:custom` | Component tree / navigator |
| AssetManager | `assetManager` | `asset:custom` | Image/file management |
| StorageManager | `storageManager` | — | Project persistence (local/remote) |
| PageManager | `pageManager` | `page` | Multi-page support |
| Modal | `modal` | `modal` | Dialog windows |
| Commands | `commands` | `command:run`, `command:stop` | Reusable editor actions |
| I18n | `i18n` | — | Internationalization |
| Canvas | `canvas` | — | Iframe rendering, scripts/styles injection |
| UndoManager | — | `change:changesCount` | Undo/redo stack |

---

## Components Module (Deep Reference)

### Component Lifecycle
1. HTML string parsed -> Component Definition object
2. Component Type Stack iterated (newest first) — `isComponent(el)` identifies type
3. Component Model instantiated with `defaults`
4. Component View rendered in canvas iframe

### Defining Custom Component Types

```typescript
editor.DomComponents.addType('my-type', {
  // isComponent only runs during HTML string parsing
  // Skipped when type set via object { type: 'my-type' } or data-gjs-type attribute
  isComponent: (el) => el.tagName === 'MY-TAG',

  model: {
    defaults: {
      tagName: 'div',
      name: 'My Component',        // Display name in layers
      draggable: true,              // Where it can be dropped (true | false | selector)
      droppable: true,              // What can be dropped inside (true | false | selector)
      editable: false,              // Enable inline RTE editing
      highlightable: true,          // Show highlight on hover
      selectable: true,             // Allow selection
      hoverable: true,              // Show hover state
      layerable: true,              // Show in layer manager
      stylable: true,               // true | string[] of allowed CSS props
      unstylable: [],               // string[] of denied CSS props
      propagate: [],                // Props to propagate to children
      attributes: {},               // HTML attributes
      traits: [],                   // Trait definitions
      components: '',               // Children (string | object | array | function)
      styles: '',                   // Scoped CSS string
      content: '',                  // Inner text content
      script: undefined,            // Function to run in canvas iframe
      'script-props': [],           // Props to pass to script function
      style: {},                    // Inline styles object
    },

    init() {
      // Runs once on creation. Listen to changes here.
      this.on('change:attributes:href', this.handleHrefChange);
      this.on('change:someProp', this.handlePropChange);
    },

    updated(property, value, prevValue) {
      // Runs on any property change
    },

    removed() {
      // Cleanup when component deleted
    },
  },

  view: {
    tagName: 'div',  // View tag (canvas only, not exported)
    events: {
      click: 'handleClick',
      'dblclick .inner': 'handleInnerDblClick',
    },
    init({ model }) {
      this.listenTo(model, 'change:someProp', this.onPropChange);
    },
    onRender({ el, model }) {
      // DOM manipulation for canvas display only
    },
    removed() {
      // Cleanup view listeners
    },
  },
});
```

### Component Model Key API

```typescript
component.get('type')                    // Get component type string
component.get('tagName')                 // Get HTML tag
component.getAttributes()               // Get all HTML attributes
component.addAttributes({ key: 'val' }) // Merge attributes
component.setAttributes({ key: 'val' }) // Replace all attributes
component.getClasses()                   // Get CSS classes array
component.addClass('cls')               // Add CSS class
component.removeClass('cls')            // Remove CSS class
component.components()                  // Get children collection
component.components('<div>...')         // Set children
component.append('<div>...')             // Append child
component.append('<div>...', { at: 0 }) // Prepend child
component.find('selector')              // Query descendants
component.parent()                      // Get parent component
component.toHTML()                       // Export as HTML
component.toJSON()                       // Export as JSON
component.getStyle()                     // Get inline styles
component.setStyle({ color: 'red' })    // Set inline styles
component.getTrait('name')              // Get specific trait
component.addTrait({ ... })             // Add trait
component.removeTrait('name')           // Remove trait
component.get('traits')                 // Get all traits collection
```

### Component Events

```typescript
// Global events (editor.on)
'component:create'                // (model) - Component created
'component:mount'                 // (model) - View rendered in canvas
'component:update'                // (model) - Any property changed
'component:update:{prop}'         // (model) - Specific property changed
'component:remove'                // (model) - Component removed
'component:selected'              // (model) - Component selected
'component:deselected'            // (model) - Component deselected
'component:toggled'               // (model) - Selection toggled
'component:drag:start'            // (model) - Drag started
'component:drag:end'              // (model) - Drag ended
'component:clone'                 // (clone, original) - Component cloned
'component:add'                   // (model) - Component added to tree

// Local events (model.on inside init())
'change:{property}'               // Property changed
'change:attributes'               // Any attribute changed
'change:attributes:{attr}'        // Specific attribute changed
```

### Type Extension Patterns

```typescript
// Extend existing type
editor.DomComponents.addType('my-extended', {
  extend: 'parent-type',       // Extend model from this type
  extendView: 'other-type',    // Optionally extend view from different type
  extendFn: ['init'],          // Auto-chain parent functions

  model: {
    defaults: { /* merges with parent defaults */ },
    init() {
      // If in extendFn, parent init() runs first, then this
    },
  },
});

// Update existing type (re-add with same ID)
editor.DomComponents.addType('existing-type', {
  model: {
    defaults: { newProp: 'value' }, // Merges, doesn't replace
  },
});
```

### Built-in Component Types (stack order, newest first)
`cell`, `row`, `table`, `thead`, `tbody`, `tfoot`, `map`, `link`, `label`, `video`, `image`, `script`, `svg`, `comment`, `textnode`, `text`, `wrapper`, `default`

---

## Style Manager (Deep Reference)

### Sector & Property Configuration

```typescript
styleManager: {
  custom: true,  // Suppress default UI, emit style:custom
  sectors: [
    {
      id: 'general',
      name: 'General',
      open: true,
      properties: [
        // Use built-in by name
        'display',
        'float',
        // Extend built-in
        { extend: 'width', units: ['px', '%', 'vw'] },
        // Full custom property
        {
          type: 'number',
          property: 'font-size',
          label: 'Font Size',
          units: ['px', 'em', 'rem', '%'],
          default: '16px',
          min: 0,
          max: 200,
          step: 1,
        },
      ],
    },
  ],
}
```

### Property Types

| Type | Description | Extra Config |
|------|-------------|-------------|
| `base` | Text input | — |
| `number` | Number input | `units`, `min`, `max`, `step` |
| `slider` | Slider + number | `units`, `min`, `max`, `step` |
| `color` | Color picker | — |
| `select` | Dropdown | `options: [{id, label}]` |
| `radio` | Radio buttons | `options: [{id, label}]` |
| `composite` | Multi-property group | `properties: [...]` (sub-properties) |
| `stack` | Layered values | `properties: [...]`, `layerSeparator` |
| `file` | File/URL input | — |

### StyleManager API

```typescript
const sm = editor.StyleManager;

// Sector management
sm.addSector('id', { name, properties, open });
sm.getSector('id');
sm.getSectors({ visible: true });
sm.removeSector('id');

// Property management
sm.addProperty('sector-id', { type, property, ... });
sm.getProperty('sector-id', 'property-name');
sm.removeProperty('sector-id', 'property-name');

// Selection & targets
sm.select(component);              // Select component for styling
sm.select('.css-selector');         // Select by CSS selector
sm.getSelected();                   // Get current style target
sm.getLastSelected();               // Get last selected target
sm.addStyleTargets({ color: 'red' }); // Apply styles to selected

// Built-in properties
sm.getBuiltIn('property-name');     // Check if built-in exists
sm.getBuiltInAll();                 // Get all built-in property defs
sm.addBuiltIn('name', { ... });    // Register new built-in

// Property instance API (from sector.getProperties())
property.getValue()                 // Get current value
property.upValue(value)             // Apply value (triggers style:custom)
property.getType()                  // Get property type string
property.getName()                  // Get CSS property name
property.getLabel()                 // Get display label
property.get('min')                 // Get min value
property.get('max')                 // Get max value
property.get('step')                // Get step value
property.get('units')               // Get available units
property.get('options')             // Get select/radio options
property.getProperties()            // Get sub-properties (composite/stack)
property.getLayers()                 // Get layers (stack type)
property.addLayer({}, { at: 0 })    // Add layer to stack
property.removeLayer(layer)         // Remove stack layer
```

### Component Style Constraints

```typescript
// Only allow specific CSS properties
model: { defaults: { stylable: ['width', 'height', 'color'] } }

// Deny specific CSS properties
model: { defaults: { unstylable: ['position', 'float'] } }
```

---

## Selector Manager

```typescript
const sm = editor.SelectorManager;

sm.setState('')         // Normal state
sm.setState(':hover')   // Hover pseudo-class
sm.setState(':active')  // Active pseudo-class
sm.setState(':focus')   // Focus pseudo-class
sm.getState()           // Get current state string

// Component-first strategy (style individual components)
selectorManager: { componentFirst: true }
```

**Critical**: After `setState()`, call `editor.StyleManager.select(component)` to force the StyleManager to re-evaluate properties for the new state.

---

## Trait Manager

### Built-in Trait Types
`text`, `number`, `checkbox`, `select`, `color`, `button`

### Trait API

```typescript
const trait = component.getTrait('name');
trait.getValue()                   // Get current value
trait.setValue(value)               // Set value (triggers trait:custom)
trait.props()                      // Get all trait properties
trait.set('options', [...])        // Update trait config
trait.set({ label, options })      // Batch update

component.addTrait({ name, type, ... }, { at: 0 });
component.removeTrait('name');
```

### Custom Trait Types

```typescript
editor.Traits.addType('my-trait', {
  createInput({ trait }) {
    const el = document.createElement('div');
    // Build custom input UI
    return el;
  },
  onEvent({ elInput, component, event }) {
    // Handle input events, update component
    component.addAttributes({ key: elInput.querySelector('input').value });
  },
  onUpdate({ elInput, component }) {
    // Sync UI with component state
    elInput.querySelector('input').value = component.getAttributes().key || '';
  },
  eventCapture: ['input'],  // Events that trigger onEvent (default: 'change')
});
```

---

## Block Manager

```typescript
const bm = editor.Blocks; // or editor.BlockManager

// Add block
bm.add('block-id', {
  label: 'Block Name',
  media: '<svg>...</svg>',        // Icon/preview
  content: { type: 'my-type' },   // Component definition (recommended)
  // content: '<div>HTML</div>',  // Or HTML string
  category: 'Category Name',
  activate: true,                  // Activate on drop
  select: true,                   // Select on drop
});

bm.get('block-id');               // Get block
bm.remove('block-id');            // Remove block

// Custom UI (block:custom event)
editor.on('block:custom', (props) => {
  // props.blocks - all blocks
  // props.dragStart(block, ev) - initiate drag
  // props.dragStop(ev) - end drag
  // props.container - render target
});
```

---

## Commands

### Built-in Commands (core:* namespace)

| Command | Description |
|---------|------------|
| `core:canvas-clear` | Clear all content |
| `core:component-delete` | Delete selected |
| `core:component-enter` | Select first child |
| `core:component-exit` | Select parent |
| `core:component-next` | Select next sibling |
| `core:component-prev` | Select previous sibling |
| `core:component-outline` | Toggle component borders |
| `core:preview` | Toggle preview mode |
| `core:fullscreen` | Toggle fullscreen |
| `core:undo` / `core:redo` | Undo/Redo |
| `core:copy` / `core:paste` | Copy/Paste |
| `core:open-code` | Open code editor |
| `core:open-layers` | Open layers panel |
| `core:open-styles` | Open style panel |
| `core:open-traits` | Open traits panel |
| `core:open-blocks` | Open blocks panel |
| `core:open-assets` | Open asset manager |
| `sw-visibility` | Toggle component borders (alias) |
| `preview` | Toggle preview (alias) |

### Custom Commands

```typescript
editor.Commands.add('my-cmd', {
  run(editor, sender, options) {
    // Execute command
    return someState; // Return value accessible later
  },
  stop(editor, sender, options) {
    // Stateful: deactivate command
  },
});

editor.runCommand('my-cmd', { option1: 'value' });
editor.stopCommand('my-cmd');
editor.Commands.isActive('my-cmd');   // Check state
editor.Commands.getActive();          // All active commands

// Events
editor.on('command:run:before:my-cmd', (opts) => {
  opts.abort = true; // Prevent execution
});
editor.on('command:run:my-cmd', () => { /* after run */ });
editor.on('command:stop:my-cmd', () => { /* after stop */ });
```

---

## Storage Manager

```typescript
// Disable storage
storageManager: false

// Local storage
storageManager: {
  type: 'local',
  autosave: true,
  autoload: true,
  stepsBeforeSave: 1,
  options: { local: { key: 'my-project' } },
}

// Remote storage
storageManager: {
  type: 'remote',
  stepsBeforeSave: 3,
  options: {
    remote: {
      urlLoad: '/api/project/1',
      urlStore: '/api/project/1',
      fetchOptions: (opts) => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
      onStore: (data) => ({ id: 1, data }),
      onLoad: (result) => result.data,
    },
  },
}

// Manual operations
await editor.store();
await editor.load();
const data = editor.getProjectData();
editor.loadProjectData(data);

// Custom storage type
editor.Storage.add('my-storage', {
  async load(options) { return JSON.parse(...); },
  async store(data, options) { ... },
});
```

---

## Pages Manager

```typescript
const pages = editor.Pages;

pages.getAll();                         // All pages
pages.getSelected();                    // Active page
pages.add({ id, styles, component });  // Add page (note: styles not style, component not components)
pages.get('page-id');                   // Get by ID
pages.select('page-id');               // Switch active page
pages.remove('page-id');               // Delete page

// Export specific page
const page = pages.getSelected();
const mainComp = page.getMainComponent();
editor.getHtml({ component: mainComp });
editor.getCss({ component: mainComp });
```

---

## Asset Manager

```typescript
const am = editor.AssetManager;

am.add([{ src: 'url', category: 'cat1' }]);
am.getAll();
am.get('url');
am.remove('url');
am.open({
  types: ['image'],
  select(asset, complete) {
    const src = asset.getSrc();
    complete && am.close();
  },
});
```

---

## Modal

```typescript
editor.Modal.open({ title: 'Title', content: htmlElement });
editor.Modal.close();
editor.Modal.isOpen();
editor.Modal.setTitle('New Title');
editor.Modal.setContent(element);
editor.Modal.onceClose(() => { /* cleanup */ });
```

---

## Canvas

```typescript
// Inject scripts/styles into canvas iframe
canvas: {
  scripts: ['https://cdn.example.com/lib.js'],
  styles: ['https://cdn.example.com/style.css'],
}
```

---

## Editor Top-Level API

```typescript
const editor = grapesjs.init({ ... });

// Components
editor.addComponents('<div>...</div>');
editor.getComponents();
editor.getSelected();                    // Currently selected component
editor.select(component);               // Select a component
editor.selectAdd(component);            // Add to selection
editor.getSelectedAll();                 // All selected components

// Export
editor.getHtml();                        // Full HTML string
editor.getCss();                         // Full CSS string
editor.getJs();                          // Full JS string
editor.getProjectData();                 // JSON project data

// Import
editor.setComponents('<div>...</div>');  // Replace all components
editor.loadProjectData(json);            // Load full project

// Device
editor.setDevice('Desktop');
editor.getDevice();

// Undo/Redo
editor.UndoManager.undo();
editor.UndoManager.redo();
editor.UndoManager.hasUndo();
editor.UndoManager.hasRedo();

// Store/Load
editor.store();
editor.load();

// Commands
editor.runCommand('command-id', options);
editor.stopCommand('command-id');
```

---

## Symbols (Beta, v0.21.11+)

```typescript
const main = editor.Components.addSymbol(component);
const instance = editor.Components.addSymbol(main);
const symbols = editor.Components.getSymbols();
const info = editor.Components.getSymbolInfo(component);
// info: { isSymbol, isRoot, isMain, isInstance, main, instances, relatives }
editor.Components.detachSymbol(component);
component.setSymbolOverride(['property']);
```

---

## Rich Text Editor Replacement

```typescript
editor.setCustomRte({
  enable(el, rte) {
    // Initialize custom RTE, return instance
    return rteInstance;
  },
  disable(el, rte) {
    el.contentEditable = false;
  },
  getContent(el, rte) {
    return rte.getData(); // Library-specific
  },
});
```

---

## Telemetry

```typescript
grapesjs.init({
  telemetry: false, // Opt out of domain/version/timestamp collection
});
```

---

## Super-Grapes Specific Patterns

In this project, ALL managers use `custom: true`. Key patterns:

1. **style:custom** -> `edit-panel.ts` re-renders style tab (debounced, skipped during interaction)
2. **trait:custom** -> `edit-panel.ts` re-renders content tab (debounced, skipped during interaction)
3. **block:custom** -> `widgets-panel.ts` renders block cards with drag
4. **layer:custom** -> `navigator.ts` renders component tree
5. **component:selected** -> sidebar switches to edit mode
6. **component:deselected** -> sidebar switches to widgets mode

Style values are applied via `property.upValue(value)`, trait values via `trait.setValue(value)`.

Component types registered as GrapesJS plugin inside `createEditor()` so they exist before HTML parsing. Types use `data-gjs-type` for resolution (no `isComponent` overrides).

---

## ⚠️ Dependency Upgrade Warning

**Before upgrading GrapesJS or any plugin: do a deep audit of internal APIs — minor versions can silently break custom drag-and-drop, event routing, and sorter internals.**

### Real incident: GrapesJS v0.22 broke block drag from sidebar

GrapesJS v0.22 rewrote the drag system (`ComponentSorter` / `DropLocationDeterminer`). The old sorter listened for `pointermove` on `frameEl`. The new one registers `mousemove` on the **canvas wrapper element** (`wrapper.el` inside the iframe). Code that dispatched `pointermove` to `frameEl` stopped working silently.

**Correct drag flow for custom block panel (v0.22+):**

```
1. setPointerCapture(pointerId) on card
   → ensures native pointermove fires on host document even when cursor is in iframe

2. pointerenter → frameEl (host coords, bubbles: false)
   → Droppable.handleDragEnter fires
   → creates ComponentSorter
   → bindDragEventHandlers: registers 'mousemove' on wrapper.el (inside iframe)

3. mousemove → iframe.contentDocument.elementFromPoint(localX, localY) (bubbles: true)
   → bubbles up to wrapper.el
   → DropLocationDeterminer.onMove fires
   → positions placer / shows drop indicator

4. native pointerup bubbles to host document (via setPointerCapture)
   → Droppable.handleDrop fires (registered before our listener via startDrag → startCustom)
   → reads dragSource.content (set by Blocks.startDrag)
   → sorter.endDrag() → finalizeMove() → inserts block at last tracked position

5. our onUp fires: removeEventListeners, hide ghost, call editor.Blocks.endDrag(false)
   → BlockManager cleans up state, handles activate/select behavior
```

**Key coords rule:**
- `pointerenter` to `frameEl`: host viewport coords
- `mousemove` inside iframe: **iframe-local coords** (`clientX - iframeRect.left`)

**All deps are pinned exactly (no `^`) in `package.json` to prevent silent breakage.**
