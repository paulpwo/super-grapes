# Super-Grapes QA Fix Plan

Plan de correcciones con causa raiz, archivos involucrados y solucion propuesta para cada bug. Cada item es independiente y puede ejecutarse en cualquier orden. Al terminar cada fix, marcar el checkbox.

> **Para la IA**: Lee este archivo completo. Cada seccion tiene: descripcion del bug, causa raiz tecnica, archivos a modificar, y la solucion exacta. Ejecuta cada fix en orden de prioridad, verifica que `pnpm build` pase despues de cada grupo de cambios, y marca los checkboxes completados.

---

## Contexto del proyecto

- Proyecto simple con Vite: `src/core` (GrapesJS init, components, blocks) + `src/ui` (shell, panels, controls)
- GrapesJS usa `custom: true` en todos sus managers — toda la UI es custom vanilla TS + CSS
- El editor se inicializa en 2 fases: `UIManager` crea el DOM shell, `createEditor()` monta GrapesJS, `ui.connect(editor)` conecta eventos
- Config de estilos en `src/core/config.ts` funcion `getStyleSectors()`
- Los sliders usan `property.upValue(value)` para aplicar estilos via GrapesJS StyleManager
- Evento `style:custom` dispara re-render completo del style tab (ver `edit-panel.ts:55-58`)
- Comandos: `pnpm dev` (localhost:5173), `pnpm build` (build all)

---

## BUG-01: Boton Mobile no funciona (solo Tablet y Desktop funcionan)

**Prioridad**: P0 — Critico
**Sintoma**: Al hacer click en el icono de celular en la topbar, el canvas no cambia de tamano.
**Causa raiz**: En `topbar.ts:32` el boton tiene `data-device="Mobile portrait"` pero en `devices.ts:16` el dispositivo esta registrado como `name: 'Mobile'`. El string no coincide, asi que `editor.setDevice("Mobile portrait")` no encuentra ningun device.

### Archivos a modificar
- `src/ui/shell/topbar.ts` linea 32

### Solucion
Cambiar `data-device="Mobile portrait"` a `data-device="Mobile"`:
```html
<!-- Antes -->
<button class="sg-device-btn" data-device="Mobile portrait" title="Mobile">
<!-- Despues -->
<button class="sg-device-btn" data-device="Mobile" title="Mobile">
```

### Verificacion
- [ ] Click en icono Mobile -> canvas se redimensiona a 375px de ancho
- [ ] Click en Tablet -> canvas se redimensiona a 768px
- [ ] Click en Desktop -> canvas vuelve a ancho completo
- [ ] Los botones muestran estado `active` correctamente al cambiar

---

## BUG-02: Sliders no arrastran suavemente (solo cambian de 1 en 1)

**Prioridad**: P0 — Critico
**Sintoma**: Al arrastrar un slider (font-size, width, opacity, etc.) el valor solo cambia de 1 en 1. No se puede arrastrar continuamente — parece que se "traba".
**Causa raiz**: El evento `input` del slider llama a `property.upValue()` que dispara `style:custom` en GrapesJS, lo cual causa que `edit-panel.ts:55-58` ejecute `renderCurrentTab()` que **destruye y recrea todo el DOM del style tab**, incluyendo el slider que el usuario esta arrastrando. Esto mata el drag en cada tick.

### Archivos a modificar
- `src/ui/panels/edit-panel.ts` lineas 54-58

### Solucion
Bloquear el re-render del style tab mientras el usuario esta interactuando con un control. Usar un flag `_isUserInteracting` que se activa durante `mousedown`/`pointerdown` en sliders y se desactiva en `mouseup`/`pointerup`:

```typescript
// edit-panel.ts — agregar flag de interaccion
let _isUserInteracting = false;

// Exponer globalmente para que los controles lo usen
(window as any).__sgEditing = {
  get interacting() { return _isUserInteracting; },
  set interacting(v: boolean) { _isUserInteracting = v; },
};

// Cambiar el listener de style:custom:
editor.on('style:custom', () => {
  if (currentTab === 'style' && !_isUserInteracting) {
    renderCurrentTab();
  }
});

// Igual para trait:custom:
editor.on('trait:custom', () => {
  if (currentTab === 'content' && !_isUserInteracting) {
    renderCurrentTab();
  }
});
```

Luego en `slider-row.ts`, agregar listeners de pointer:
```typescript
slider.addEventListener('pointerdown', () => {
  (window as any).__sgEditing && ((window as any).__sgEditing.interacting = true);
});
window.addEventListener('pointerup', () => {
  (window as any).__sgEditing && ((window as any).__sgEditing.interacting = false);
}, { once: false });
```

**Alternativa mas limpia** (preferida): En vez del global, usar un approach basado en eventos. Emitir un CustomEvent `sg:interaction-start` / `sg:interaction-end` desde los controles, y escucharlo en edit-panel. O simplemente debounce el re-render con un timeout de 300ms que se cancela en cada nuevo `style:custom`:

```typescript
let styleRenderTimer: ReturnType<typeof setTimeout> | null = null;

editor.on('style:custom', () => {
  if (currentTab === 'style') {
    if (styleRenderTimer) clearTimeout(styleRenderTimer);
    styleRenderTimer = setTimeout(() => {
      renderCurrentTab();
      styleRenderTimer = null;
    }, 300);
  }
});
```

### Verificacion
- [ ] Arrastrar slider de font-size -> valor cambia suavemente mientras se arrastra
- [ ] Arrastrar slider de width -> igual, cambio continuo
- [ ] Arrastrar slider de opacity -> cambio continuo con decimales (0.01 step)
- [ ] Soltar el slider -> el panel se actualiza con el valor final correcto
- [ ] El input numerico al lado del slider se sincroniza durante el drag
- [ ] Escribir un valor en el input numerico y presionar Enter -> se aplica correctamente

---

## BUG-03: Hover mode no aplica estilos al pasar el mouse

**Prioridad**: P0 — Critico
**Sintoma**: Al cambiar a modo Hover en el state toggle y modificar estilos (ej. cambiar color de fondo), los cambios no se ven cuando se pasa el mouse sobre el elemento en el canvas.
**Causa raiz**: Multiples problemas:
1. `state-toggle.ts` llama `selectorManager.setState(':hover')` correctamente, pero esto cambia el estado del **SelectorManager**, no necesariamente crea una regla CSS `:hover` en el iframe.
2. GrapesJS necesita que el componente tenga un **selector CSS** (clase) para poder crear reglas pseudo-class. Si el componente no tiene una clase asociada en el SelectorManager, las reglas hover no se generan.
3. El `style:custom` event que se dispara al cambiar el state puede estar causando el re-render que resetea el toggle (ya parcialmente arreglado en el fix anterior del state-toggle).
4. Los estilos aplicados via `property.upValue()` en estado hover deberian crear una regla `selector:hover { ... }` en el CssComposer de GrapesJS — verificar que esto realmente sucede.

### Archivos a modificar
- `src/ui/controls/state-toggle.ts`
- Posiblemente `src/ui/panels/edit-style.ts`

### Solucion
1. Primero verificar: despues de `selectorManager.setState(':hover')`, los properties del StyleManager deberian mostrar valores del estado hover. Si `property.getValue()` retorna el valor correcto para hover, el problema es solo de render en el iframe.

2. Asegurar que al cambiar estado se fuerza un refresh del StyleManager:
```typescript
btn.addEventListener('click', () => {
  currentState = item.state;
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const selectorManager = editor.SelectorManager;
  selectorManager.setState(item.state);

  // Forzar refresh de los sectores de estilo
  // Esto hace que GrapesJS re-emita style:custom con las propiedades del nuevo estado
  editor.StyleManager.select(editor.getSelected());
});
```

3. Verificar en la consola del navegador que las reglas CSS se crean correctamente:
```javascript
// Debug: ver todas las reglas CSS generadas
editor.getCss(); // Debe incluir .selector:hover { ... }
```

4. Si los estilos hover no se generan, puede ser necesario asegurar que el componente tenga una clase CSS (no solo estilos inline):
```typescript
// Al aplicar estilos en modo hover, GrapesJS necesita un selector de clase
const selected = editor.getSelected();
if (selected && !selected.getClasses().length) {
  // GrapesJS crea automaticamente una clase si no existe, pero verificar
}
```

### Verificacion
- [ ] Seleccionar un boton -> ir a Style -> cambiar a Hover
- [ ] Cambiar background-color en modo Hover -> el valor se guarda
- [ ] Cambiar a Normal -> el background-color muestra el valor original (no el de hover)
- [ ] En el canvas, pasar el mouse sobre el boton -> se ve el color de hover
- [ ] Quitar el mouse -> vuelve al color normal
- [ ] Ejecutar `editor.getCss()` en consola -> debe incluir regla `:hover`
- [ ] Las transiciones definidas en el sector Extra deberian animar el cambio hover

---

## BUG-04: Preview rompe todo el editor

**Prioridad**: P0 — Critico
**Sintoma**: Al hacer click en Preview, la interfaz se dania y hay que recargar la pagina.
**Causa raiz**: El comando `preview` de GrapesJS esta disenado para la UI por defecto. Con `custom: true`, GrapesJS no sabe que elementos ocultar/mostrar. El comando `preview` probablemente:
1. Oculta los paneles por defecto de GrapesJS (que no existen en nuestro caso)
2. Modifica clases CSS del wrapper/canvas que entran en conflicto con nuestro layout
3. No tiene forma de salir (no hay boton "exit preview") porque la topbar queda oculta o rota
4. El comando hace `editor.stopCommand('sw-visibility')` y modifica el estado del canvas, pero nuestro shell CSS no esta preparado para eso.

### Archivos a modificar
- `src/ui/shell/topbar.ts` lineas 107-110
- Posiblemente crear un comando custom de preview

### Solucion
No usar el comando `preview` nativo de GrapesJS. Crear un preview custom que:
1. Oculte la topbar y sidebar via CSS classes
2. Expanda el canvas al 100%
3. Desactive `sw-visibility`
4. Proporcione un boton flotante para salir del preview

```typescript
// topbar.ts — reemplazar el handler de preview
const previewBtn = el.querySelector('[data-cmd="preview"]') as HTMLButtonElement;
let isPreview = false;

previewBtn.addEventListener('click', () => {
  isPreview = !isPreview;
  const editorRoot = document.querySelector('.sg-editor') as HTMLElement;

  if (isPreview) {
    // Entrar en preview
    editorRoot.classList.add('sg-preview-mode');
    editor.stopCommand('sw-visibility');
    previewBtn.classList.add('active');

    // Crear boton flotante para salir
    const exitBtn = document.createElement('button');
    exitBtn.className = 'sg-preview-exit-btn';
    exitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Exit Preview';
    exitBtn.addEventListener('click', () => {
      previewBtn.click(); // Toggle off
    });
    editorRoot.appendChild(exitBtn);
  } else {
    // Salir de preview
    editorRoot.classList.remove('sg-preview-mode');
    if (swActive) editor.runCommand('sw-visibility');
    previewBtn.classList.remove('active');

    // Remover boton de salida
    const exitBtn = editorRoot.querySelector('.sg-preview-exit-btn');
    if (exitBtn) exitBtn.remove();
  }
});
```

CSS necesario (agregar en `editor.css` o `topbar.css`):
```css
.sg-editor.sg-preview-mode .sg-topbar,
.sg-editor.sg-preview-mode .sg-sidebar {
  display: none !important;
}

.sg-editor.sg-preview-mode .sg-canvas-wrap {
  width: 100% !important;
}

.sg-preview-exit-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  padding: 8px 16px;
  background: var(--sg-bg);
  border: 1px solid var(--sg-border);
  color: var(--sg-text);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--sg-font);
  border-radius: var(--sg-radius);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.sg-preview-exit-btn:hover {
  opacity: 1;
}
```

### Verificacion
- [ ] Click en Preview -> topbar y sidebar desaparecen, canvas ocupa todo el ancho
- [ ] Los bordes de componentes (sw-visibility) se desactivan automaticamente
- [ ] Aparece boton "Exit Preview" flotante en la esquina superior derecha
- [ ] Click en "Exit Preview" -> vuelve al modo edicion normal
- [ ] La topbar, sidebar y todos los controles funcionan correctamente despues de salir
- [ ] Si sw-visibility estaba activo antes, se reactiva al salir
- [ ] No hay necesidad de recargar la pagina

---

## BUG-05: Texto muestra propiedades de Flex/Box en Style tab

**Prioridad**: P1 — Importante
**Sintoma**: Al seleccionar un texto o heading, el Style tab muestra todos los sectores (General, Dimension, Typography, Decorations, **Flex**, Extra) incluyendo propiedades de Flex (flex-direction, justify-content, etc.) que no tienen sentido para un elemento de texto.
**Causa raiz**: Los sectores de estilo en `config.ts:getStyleSectors()` son globales — se muestran para TODOS los componentes sin importar el tipo. No hay filtracion por tipo de componente.

### Archivos a modificar
- `src/ui/panels/edit-style.ts`
- Opcionalmente `src/core/components/*.ts` (agregar metadata `unstylable` o `stylable`)

### Solucion
Filtrar los sectores segun el tipo de componente seleccionado. Hay dos approaches:

**Approach A (recomendado — filtrar en UI):**
En `edit-style.ts`, antes de renderizar los sectores, verificar el tipo del componente y ocultar sectores irrelevantes:

```typescript
// Definir que sectores aplican a cada tipo de componente
const SECTOR_VISIBILITY: Record<string, string[]> = {
  // Texto: no necesita Flex
  'sg-text': ['General', 'Dimension', 'Typography', 'Decorations', 'Extra'],
  'sg-heading': ['General', 'Dimension', 'Typography', 'Decorations', 'Extra'],
  // Imagen: no necesita Typography ni Flex
  'sg-image': ['General', 'Dimension', 'Decorations', 'Extra'],
  'sg-video': ['General', 'Dimension', 'Decorations', 'Extra'],
  'sg-divider': ['General', 'Dimension', 'Decorations', 'Extra'],
  'sg-spacer': ['Dimension'],
  'sg-icon': ['General', 'Dimension', 'Typography', 'Decorations', 'Extra'],
  // Containers: todos los sectores
  'sg-section': ['General', 'Dimension', 'Typography', 'Decorations', 'Flex', 'Extra'],
  'sg-container': ['General', 'Dimension', 'Typography', 'Decorations', 'Flex', 'Extra'],
  'sg-column': ['General', 'Dimension', 'Typography', 'Decorations', 'Flex', 'Extra'],
};

// Default: todos los sectores
const DEFAULT_SECTORS = ['General', 'Dimension', 'Typography', 'Decorations', 'Flex', 'Extra'];

// En renderSectors(), filtrar:
const componentType = selected.get('type') || '';
const allowedSectors = SECTOR_VISIBILITY[componentType] || DEFAULT_SECTORS;

sectors.forEach((sector: any) => {
  const sectorName = sector.getName?.() || sector.get('name') || 'Styles';
  if (!allowedSectors.includes(sectorName)) return; // Skip este sector
  // ... resto del render
});
```

**Approach B (via GrapesJS):**
En cada component type definition, agregar la propiedad `unstylable` o usar `stylable` para restringir que propiedades CSS se pueden editar. Esto es mas correcto pero requiere modificar todos los component files.

### Verificacion
- [ ] Seleccionar un Heading -> Style tab NO muestra sector Flex
- [ ] Seleccionar un Text -> Style tab NO muestra sector Flex
- [ ] Seleccionar una Image -> Style tab NO muestra Typography ni Flex
- [ ] Seleccionar un Section/Container -> Style tab SI muestra Flex
- [ ] Seleccionar un Spacer -> Solo muestra Dimension
- [ ] Los sectores que se muestran tienen sentido logico para cada tipo de componente

---

## BUG-06: No hay Import/Export de plantillas

**Prioridad**: P1 — Importante
**Sintoma**: No existe ninguna forma de importar una plantilla HTML o exportar el trabajo actual como HTML/CSS.
**Causa raiz**: Esta funcionalidad nunca se implemento. No hay botones ni comandos para esto.

### Archivos a crear/modificar
- `src/ui/shell/topbar.ts` — agregar botones Import/Export
- `src/core/commands/import-export.ts` — nuevo archivo con la logica
- `src/ui/theme/controls.css` — estilos para el modal

### Solucion

#### 1. Agregar botones en la topbar
En `topbar.ts`, agregar botones de Import y Export junto al boton Save:
```html
<button class="sg-topbar-icon-btn" data-cmd="import" title="Import HTML">
  <i class="fa-solid fa-file-import"></i>
</button>
<button class="sg-topbar-icon-btn" data-cmd="export" title="Export HTML/CSS">
  <i class="fa-solid fa-file-export"></i>
</button>
```

#### 2. Implementar Export
```typescript
// Al hacer click en export:
const html = editor.getHtml();
const css = editor.getCss();
// Mostrar modal con el codigo HTML + CSS
// Opcion de copiar al clipboard
// Opcion de descargar como .html
```

#### 3. Implementar Import
```typescript
// Al hacer click en import:
// Mostrar modal con textarea para pegar HTML
// Boton "Load" que ejecuta:
editor.setComponents(htmlString);
// Opcion de subir archivo .html
```

#### 4. Modal component
Crear un modal reutilizable (vanilla TS) con backdrop oscuro, titulo, contenido, y botones. Estilos consistentes con el tema dark del editor.

```typescript
// Estructura basica del modal:
function showModal(title: string, content: HTMLElement, onClose?: () => void): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'sg-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'sg-modal';
  modal.innerHTML = `<div class="sg-modal-header">
    <span class="sg-modal-title">${title}</span>
    <button class="sg-modal-close"><i class="fa-solid fa-xmark"></i></button>
  </div>`;

  const body = document.createElement('div');
  body.className = 'sg-modal-body';
  body.appendChild(content);
  modal.appendChild(body);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // Close handlers...
}
```

### Verificacion
- [ ] Boton Export visible en la topbar
- [ ] Click Export -> modal con HTML y CSS del proyecto actual
- [ ] Boton "Copy HTML" copia al clipboard
- [ ] Boton "Copy CSS" copia al clipboard
- [ ] Boton "Download" descarga archivo .html completo (con CSS inline o en `<style>`)
- [ ] Boton Import visible en la topbar
- [ ] Click Import -> modal con textarea para pegar HTML
- [ ] Pegar HTML y click "Load" -> el contenido se carga en el canvas
- [ ] Opcion de subir archivo .html desde disco
- [ ] El modal se cierra con el boton X o haciendo click fuera

---

## BUG-07: Controles avanzados existen pero nunca se integran

**Prioridad**: P2 — Mejora
**Sintoma**: Existen 5 archivos de controles que nunca se importan ni usan en ningun panel.
**Archivos muertos**:
- `src/ui/controls/typography-panel.ts` — Panel de tipografia completo
- `src/ui/controls/bg-type-group.ts` — Selector de tipo de fondo
- `src/ui/controls/gradient-picker.ts` — Editor de gradientes
- `src/ui/controls/box-shadow.ts` — Editor de box-shadow
- `src/ui/controls/spacing-box.ts` — Control visual de margin/padding

### Solucion
Decidir si integrarlos o eliminarlos. **Recomendacion**: Integrar los mas utiles en la UI:

1. **gradient-picker + bg-type-group**: Integrar en el sector "Decorations" como reemplazo del input de texto para `background-image`. Cuando el usuario selecciona tipo "Gradient", mostrar el gradient picker en vez de un text input.

2. **box-shadow**: Integrar como control especializado para la propiedad `box-shadow` en el sector "Decorations", reemplazando el stack generico.

3. **typography-panel**: Evaluar si es mejor usarlo como reemplazo del sector "Typography" del StyleManager, o eliminarlo si el sector generico ya cubre todo.

4. **spacing-box**: Integrar como visualizacion alternativa en el Advanced tab, debajo o en vez de los dim-controls de margin/padding.

### Verificacion
- [ ] Cada control integrado se renderiza correctamente
- [ ] Los valores se aplican al componente seleccionado
- [ ] Los controles eliminados no dejan imports huerfanos
- [ ] `pnpm build` pasa sin errores

---

## BUG-08: Memory leak en dim-control (ya parcialmente arreglado)

**Prioridad**: P2 — Mejora
**Sintoma**: Cada vez que se renderiza un dim-control, se agrega un `document.addEventListener('click')` que nunca se remueve (en la version anterior). Ya se aplico un fix con MutationObserver.
**Estado**: Fix aplicado — verificar que funciona correctamente.

### Verificacion
- [ ] Abrir DevTools -> Performance -> tomar snapshot de memoria
- [ ] Seleccionar/deseleccionar componentes 20 veces
- [ ] Tomar otro snapshot -> la cantidad de event listeners no deberia crecer descontroladamente
- [ ] El unit popup se cierra correctamente al hacer click fuera

---

## BUG-09: Valores por defecto de sliders sin sentido

**Prioridad**: P2 — Mejora (parcialmente arreglado)
**Sintoma**: Sliders para propiedades como width mostraban max=100 lo cual no tiene sentido en px.
**Estado**: Ya se ajustaron los rangos en `config.ts`. Verificar que son correctos.

### Verificacion
- [ ] Width slider: rango 0-1200
- [ ] Height slider: rango 0-1200
- [ ] Top/Right/Bottom/Left: rango -1000 a 1000
- [ ] Font-size: rango 8-120
- [ ] Opacity: rango 0-1 con step 0.01
- [ ] Order: rango -10 a 10
- [ ] Flex-grow/shrink: rango 0-10
- [ ] Letter-spacing: rango -5 a 50
- [ ] Los valores se aplican correctamente al arrastrar

---

## Orden de ejecucion recomendado

1. **BUG-01** (Mobile button) — 1 linea, fix trivial
2. **BUG-02** (Slider drag) — Fix critico, afecta toda la experiencia de edicion
3. **BUG-04** (Preview) — Crear preview custom, eliminar uso del comando nativo
4. **BUG-03** (Hover) — Requiere debugging en vivo para confirmar causa exacta
5. **BUG-05** (Sector filtering) — Mejora significativa de UX
6. **BUG-06** (Import/Export) — Feature nueva, mas trabajo
7. **BUG-07** (Integrar controles muertos) — Opcional, mejora la calidad
8. **BUG-08** (Memory leak) — Verificar fix existente
9. **BUG-09** (Slider ranges) — Verificar fix existente

---

## Notas tecnicas para la IA

- Siempre ejecutar `pnpm build` despues de cada grupo de cambios para verificar que compila
- El dev server es `pnpm dev` en localhost:5173 — util para probar visualmente
- GrapesJS docs relevantes: `editor.SelectorManager.setState()`, `editor.StyleManager`, `property.upValue()`, `editor.getHtml()`, `editor.getCss()`, `editor.setComponents()`
- Todas las clases CSS custom usan prefijo `sg-` y variables CSS `--sg-*`
- Font Awesome 6 Free only (no emojis, no FA Pro)
- Estetica cuadrada: `border-radius: 0-2px`
- El archivo `CLAUDE.md` en la raiz del proyecto tiene instrucciones adicionales del proyecto
