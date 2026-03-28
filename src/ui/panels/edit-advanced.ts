import type { Editor } from 'grapesjs';
import { renderDimControl } from '../controls/dim-control';
import { renderSliderRow } from '../controls/slider-row';
import { renderIconToggle, type ToggleItem } from '../controls/icon-toggle';
import { renderSpacingBox } from '../controls/spacing-box';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

const POSITION_ITEMS: ToggleItem[] = [
  { value: 'static', icon: 'fa-solid fa-location-crosshairs', title: 'Static' },
  { value: 'relative', icon: 'fa-solid fa-arrows-up-down-left-right', title: 'Relative' },
  { value: 'absolute', icon: 'fa-solid fa-crosshairs', title: 'Absolute' },
  { value: 'fixed', icon: 'fa-solid fa-thumbtack', title: 'Fixed' },
];

const ALIGN_SELF_ITEMS: ToggleItem[] = [
  { value: 'auto', icon: 'fa-solid fa-a', title: 'Auto' },
  { value: 'flex-start', icon: 'fa-solid fa-align-left', title: 'Start' },
  { value: 'center', icon: 'fa-solid fa-align-center', title: 'Center' },
  { value: 'flex-end', icon: 'fa-solid fa-align-right', title: 'End' },
  { value: 'stretch', icon: 'fa-solid fa-up-down', title: 'Stretch' },
];

export function renderAdvancedTab(el: HTMLElement, editor: Editor): void {
  el.innerHTML = '';

  const selected = editor.getSelected();
  if (!selected) {
    el.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-cog"></i><span>Select an element</span></div>';
    return;
  }

  // ---- Layout Section ----
  renderLayoutSection(el, editor, selected);

  // ---- Positioning Section ----
  renderPositionSection(el, editor, selected);

  // ---- Responsive Section ----
  renderResponsiveSection(el, editor, selected);

  // ---- Attributes Section ----
  renderAttributesSection(el, editor, selected);

  // ---- Custom CSS Section ----
  renderCustomCssSection(el, editor, selected);
}

function renderLayoutSection(el: HTMLElement, editor: Editor, selected: any): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Layout</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  renderSpacingBox(body, editor);

  const sm = editor.StyleManager;
  const marginProp = sm.getProperty('General', 'margin') || sm.getProperty('general', 'margin');
  if (marginProp) {
    renderDimControl(body, marginProp, 'Margin');
  } else {
    renderManualSpacingControl(body, editor, 'margin', 'Margin');
  }

  // Padding as dim control
  const paddingProp = sm.getProperty('General', 'padding') || sm.getProperty('general', 'padding');
  if (paddingProp) {
    renderDimControl(body, paddingProp, 'Padding');
  } else {
    renderManualSpacingControl(body, editor, 'padding', 'Padding');
  }

  // Align self
  const alignSelfProp = sm.getProperty('Flex', 'align-self') || sm.getProperty('flex', 'align-self');
  if (alignSelfProp) {
    renderIconToggle(body, alignSelfProp, 'Align Self', ALIGN_SELF_ITEMS);
  }

  // Order
  const orderProp = sm.getProperty('Flex', 'order') || sm.getProperty('flex', 'order');
  if (orderProp) {
    renderSliderRow(body, orderProp, 'Order');
  }

  // Flex sizing (grow, shrink, basis)
  ['flex-grow', 'flex-shrink', 'flex-basis'].forEach(propName => {
    const prop = sm.getProperty('Flex', propName) || sm.getProperty('flex', propName);
    if (prop) {
      renderSliderRow(body, prop, propName.replace('flex-', '').replace(/^\w/, c => c.toUpperCase()));
    }
  });

  section.appendChild(header);
  section.appendChild(body);
  el.appendChild(section);
}

function renderManualSpacingControl(container: HTMLElement, editor: Editor, cssProperty: string, label: string): void {
  const sides = ['top', 'right', 'bottom', 'left'];
  const wrap = document.createElement('div');
  wrap.className = 'sg-edim-wrap';

  const headerEl = document.createElement('div');
  headerEl.className = 'sg-edim-header';
  headerEl.innerHTML = `<span class="sg-edim-label">${esc(label)}</span>`;
  wrap.appendChild(headerEl);

  const inputsEl = document.createElement('div');
  inputsEl.className = 'sg-edim-inputs';

  const selected = editor.getSelected();

  sides.forEach(side => {
    const inputWrap = document.createElement('div');
    inputWrap.className = 'sg-edim-input-wrap';

    const input = document.createElement('input');
    input.className = 'sg-edim-input';
    input.type = 'number';
    const currentStyle = selected?.getStyle(`${cssProperty}-${side}`) || '';
    input.value = parseInt(currentStyle as string) ? String(parseInt(currentStyle as string)) : '0';

    input.addEventListener('change', () => {
      if (selected) {
        selected.addStyle({ [`${cssProperty}-${side}`]: `${input.value}px` });
      }
    });

    const labelSpan = document.createElement('span');
    labelSpan.className = 'sg-edim-input-label';
    labelSpan.textContent = side[0]!.toUpperCase();

    inputWrap.appendChild(input);
    inputWrap.appendChild(labelSpan);
    inputsEl.appendChild(inputWrap);
  });

  wrap.appendChild(inputsEl);
  container.appendChild(wrap);
}

function renderPositionSection(el: HTMLElement, editor: Editor, selected: any): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Positioning</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  // Position type
  const row = document.createElement('div');
  row.className = 'sg-ctrl-row';

  const labelEl = document.createElement('label');
  labelEl.className = 'sg-ctrl-label';
  labelEl.textContent = 'Position';

  const field = document.createElement('div');
  field.className = 'sg-ctrl-field';

  const select = document.createElement('select');
  select.className = 'sg-select';
  ['static', 'relative', 'absolute', 'fixed', 'sticky'].forEach(v => {
    const o = document.createElement('option');
    o.value = v;
    o.textContent = v.charAt(0).toUpperCase() + v.slice(1);
    select.appendChild(o);
  });

  const currentPosition = selected.getStyle('position') || 'static';
  select.value = currentPosition as string;
  select.addEventListener('change', () => {
    selected.addStyle({ position: select.value });
  });

  field.appendChild(select);
  row.appendChild(labelEl);
  row.appendChild(field);
  body.appendChild(row);

  // Top, Right, Bottom, Left, Z-Index
  ['top', 'right', 'bottom', 'left', 'z-index'].forEach(prop => {
    const propRow = document.createElement('div');
    propRow.className = 'sg-ctrl-row';

    const propLabel = document.createElement('label');
    propLabel.className = 'sg-ctrl-label';
    propLabel.textContent = prop === 'z-index' ? 'Z-Index' : prop.charAt(0).toUpperCase() + prop.slice(1);

    const propField = document.createElement('div');
    propField.className = 'sg-ctrl-field';

    const input = document.createElement('input');
    input.className = 'sg-input sg-input-number';
    input.type = 'number';
    const val = selected.getStyle(prop) || '';
    input.value = parseInt(val as string) ? String(parseInt(val as string)) : '';
    input.placeholder = 'auto';

    input.addEventListener('change', () => {
      if (input.value === '') {
        selected.removeStyle(prop);
      } else {
        const unit = prop === 'z-index' ? '' : 'px';
        selected.addStyle({ [prop]: `${input.value}${unit}` });
      }
    });

    propField.appendChild(input);
    propRow.appendChild(propLabel);
    propRow.appendChild(propField);
    body.appendChild(propRow);
  });

  section.appendChild(header);
  section.appendChild(body);
  el.appendChild(section);
}

function renderResponsiveSection(el: HTMLElement, editor: Editor, selected: any): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Responsive</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  const devices = [
    { label: 'Desktop', icon: 'fa-solid fa-desktop', className: 'sg-hide-desktop' },
    { label: 'Tablet', icon: 'fa-solid fa-tablet-screen-button', className: 'sg-hide-tablet' },
    { label: 'Mobile', icon: 'fa-solid fa-mobile-screen-button', className: 'sg-hide-mobile' },
  ];

  devices.forEach(device => {
    const row = document.createElement('div');
    row.className = 'sg-ctrl-row';

    const label = document.createElement('label');
    label.className = 'sg-ctrl-label';
    label.innerHTML = `<i class="${device.icon}" style="margin-right:4px"></i> ${esc(device.label)}`;

    const field = document.createElement('div');
    field.className = 'sg-ctrl-field';

    const toggleWrap = document.createElement('label');
    toggleWrap.className = 'sg-toggle-switch';

    const input = document.createElement('input');
    input.type = 'checkbox';

    const classes = selected.getClasses?.() || [];
    input.checked = !classes.includes(device.className);

    const track = document.createElement('span');
    track.className = 'sg-toggle-switch-track';
    const thumb = document.createElement('span');
    thumb.className = 'sg-toggle-switch-thumb';
    track.appendChild(thumb);
    toggleWrap.appendChild(input);
    toggleWrap.appendChild(track);

    input.addEventListener('change', () => {
      if (input.checked) {
        selected.removeClass(device.className);
      } else {
        selected.addClass(device.className);
      }
    });

    field.appendChild(toggleWrap);
    row.appendChild(label);
    row.appendChild(field);
    body.appendChild(row);
  });

  section.appendChild(header);
  section.appendChild(body);
  el.appendChild(section);
}

function renderAttributesSection(el: HTMLElement, editor: Editor, selected: any): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Attributes</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  // CSS ID
  const idRow = document.createElement('div');
  idRow.className = 'sg-ctrl-row';
  const idLabel = document.createElement('label');
  idLabel.className = 'sg-ctrl-label';
  idLabel.textContent = 'CSS ID';
  const idField = document.createElement('div');
  idField.className = 'sg-ctrl-field';
  const idInput = document.createElement('input');
  idInput.className = 'sg-input';
  idInput.type = 'text';
  idInput.placeholder = 'e.g. my-section';

  const attrs = selected.getAttributes?.() || {};
  idInput.value = attrs.id || '';
  idInput.addEventListener('change', () => {
    selected.addAttributes({ id: idInput.value || '' });
  });
  idField.appendChild(idInput);
  idRow.appendChild(idLabel);
  idRow.appendChild(idField);
  body.appendChild(idRow);

  // CSS Classes
  const classRow = document.createElement('div');
  classRow.className = 'sg-ctrl-row';
  const classLabel = document.createElement('label');
  classLabel.className = 'sg-ctrl-label';
  classLabel.textContent = 'CSS Classes';
  const classField = document.createElement('div');
  classField.className = 'sg-ctrl-field';
  const classInput = document.createElement('input');
  classInput.className = 'sg-input';
  classInput.type = 'text';
  classInput.placeholder = 'e.g. my-class another-class';

  const currentClasses = selected.getClasses?.() || [];
  classInput.value = currentClasses.join(' ');
  classInput.addEventListener('change', () => {
    // Remove old classes, add new ones
    currentClasses.forEach((c: string) => selected.removeClass(c));
    const newClasses = classInput.value.trim().split(/\s+/).filter(Boolean);
    newClasses.forEach((c: string) => selected.addClass(c));
  });
  classField.appendChild(classInput);
  classRow.appendChild(classLabel);
  classRow.appendChild(classField);
  body.appendChild(classRow);

  section.appendChild(header);
  section.appendChild(body);
  el.appendChild(section);
}

function renderCustomCssSection(el: HTMLElement, editor: Editor, selected: any): void {
  const section = document.createElement('div');
  section.className = 'sg-ctrl-section';

  const header = document.createElement('div');
  header.className = 'sg-ctrl-section-header';
  header.innerHTML = `
    <span class="sg-ctrl-section-title">Custom CSS</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `;
  header.addEventListener('click', () => section.classList.toggle('collapsed'));

  const body = document.createElement('div');
  body.className = 'sg-ctrl-section-body';

  const textarea = document.createElement('textarea');
  textarea.className = 'sg-css-textarea';
  textarea.placeholder = '/* Add custom CSS here */\nselector {\n  \n}';
  textarea.spellcheck = false;

  // Load existing custom CSS from component data
  const customCss = selected.get('custom-css') || '';
  textarea.value = customCss;

  let debounceTimer: ReturnType<typeof setTimeout>;
  textarea.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      selected.set('custom-css', textarea.value);
      // Also apply inline if simple styles
      try {
        const match = textarea.value.match(/\{([^}]+)\}/);
        if (match) {
          const styles: Record<string, string> = {};
          match[1]!.split(';').forEach((rule: string) => {
            const [prop, val] = rule.split(':').map(s => s.trim());
            if (prop && val) styles[prop] = val;
          });
          if (Object.keys(styles).length > 0) {
            selected.addStyle(styles);
          }
        }
      } catch (_e) {
        // ignore parse errors
      }
    }, 500);
  });

  body.appendChild(textarea);
  section.appendChild(header);
  section.appendChild(body);
  el.appendChild(section);
}
