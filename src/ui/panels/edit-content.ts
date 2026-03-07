import type { Editor } from 'grapesjs';

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

export function renderContentTab(el: HTMLElement, editor: Editor): void {
  el.innerHTML = '';

  const selected = editor.getSelected();
  if (!selected) {
    el.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-hand-pointer"></i><span>Select an element</span></div>';
    return;
  }

  // Listen to trait:custom event
  function renderTraits() {
    el.innerHTML = '';
    const traits = selected!.getTraits();

    if (traits.length === 0) {
      el.innerHTML = `
        <div class="sg-empty-state">
          <i class="fa-solid fa-sliders"></i>
          <span>No content settings</span>
        </div>
      `;
      return;
    }

    // Group traits by category if available
    const groups: Record<string, any[]> = { General: [] };

    traits.forEach((trait: any) => {
      const category = trait.get('category') || 'General';
      if (!groups[category]) groups[category] = [];
      groups[category].push(trait);
    });

    for (const [groupName, groupTraits] of Object.entries(groups)) {
      const section = document.createElement('div');
      section.className = 'sg-ctrl-section';

      const header = document.createElement('div');
      header.className = 'sg-ctrl-section-header';
      header.innerHTML = `
        <span class="sg-ctrl-section-title">${esc(groupName)}</span>
        <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
      `;
      header.addEventListener('click', () => {
        section.classList.toggle('collapsed');
      });

      const body = document.createElement('div');
      body.className = 'sg-ctrl-section-body';

      for (const trait of groupTraits) {
        const row = document.createElement('div');
        row.className = 'sg-ctrl-row';

        const label = document.createElement('label');
        label.className = 'sg-ctrl-label';
        label.textContent = trait.getLabel?.() || trait.get('label') || trait.get('name') || '';

        const field = document.createElement('div');
        field.className = 'sg-ctrl-field';

        const traitName = trait.get('name') || '';
        const traitType = trait.getType?.() || trait.get('type') || 'text';

        // Detect datetime traits by name (e.g. countdown "startfrom")
        const isDatetime = traitName === 'startfrom' || traitType === 'datetime-local' || traitType === 'date';

        if (isDatetime) {
          const input = document.createElement('input');
          input.className = 'sg-input';
          input.type = 'datetime-local';
          const raw = trait.getValue?.() ?? trait.get('value') ?? '';
          // Convert "YYYY/MM/DD HH:MM:SS" to "YYYY-MM-DDTHH:MM" for the picker
          if (raw) {
            const normalized = raw.replace(/\//g, '-').replace(' ', 'T').slice(0, 16);
            input.value = normalized;
          }
          input.addEventListener('change', () => {
            // Convert back to "YYYY/MM/DD HH:MM:SS" format for the plugin
            const d = new Date(input.value);
            if (!isNaN(d.getTime())) {
              const yyyy = d.getFullYear();
              const mm = String(d.getMonth() + 1).padStart(2, '0');
              const dd = String(d.getDate()).padStart(2, '0');
              const hh = String(d.getHours()).padStart(2, '0');
              const mi = String(d.getMinutes()).padStart(2, '0');
              const ss = '00';
              trait.setValue(`${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`);
            }
          });
          field.appendChild(input);
        } else switch (traitType) {
          case 'text':
          case 'url': {
            const input = document.createElement('input');
            input.className = 'sg-input';
            input.type = 'text';
            input.value = trait.getValue?.() ?? trait.get('value') ?? '';
            input.placeholder = trait.get('placeholder') || '';
            input.addEventListener('change', () => {
              trait.setValue(input.value);
            });
            field.appendChild(input);
            break;
          }

          case 'number': {
            const input = document.createElement('input');
            input.className = 'sg-input sg-input-number';
            input.type = 'number';
            input.value = trait.getValue?.() ?? trait.get('value') ?? '';
            const min = trait.get('min');
            const max = trait.get('max');
            const step = trait.get('step');
            if (min != null) input.min = String(min);
            if (max != null) input.max = String(max);
            if (step != null) input.step = String(step);
            input.addEventListener('change', () => {
              trait.setValue(parseFloat(input.value));
            });
            field.appendChild(input);
            break;
          }

          case 'select': {
            const select = document.createElement('select');
            select.className = 'sg-select';
            const options = trait.get('options') || [];
            options.forEach((opt: any) => {
              const o = document.createElement('option');
              if (typeof opt === 'string') {
                o.value = opt;
                o.textContent = opt;
              } else {
                o.value = opt.id ?? opt.value ?? '';
                o.textContent = opt.label || opt.name || o.value;
              }
              select.appendChild(o);
            });
            select.value = trait.getValue?.() ?? trait.get('value') ?? '';
            select.addEventListener('change', () => {
              trait.setValue(select.value);
            });
            field.appendChild(select);
            break;
          }

          case 'checkbox': {
            const toggleWrap = document.createElement('label');
            toggleWrap.className = 'sg-toggle-switch';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = !!trait.getValue?.() || !!trait.get('value');
            const track = document.createElement('span');
            track.className = 'sg-toggle-switch-track';
            const thumb = document.createElement('span');
            thumb.className = 'sg-toggle-switch-thumb';
            track.appendChild(thumb);
            toggleWrap.appendChild(input);
            toggleWrap.appendChild(track);
            input.addEventListener('change', () => {
              trait.setValue(input.checked);
            });
            field.appendChild(toggleWrap);
            break;
          }

          case 'color': {
            const wrap = document.createElement('div');
            wrap.className = 'sg-color-swatch-wrap';
            const swatch = document.createElement('div');
            swatch.className = 'sg-color-swatch';
            const currentColor = trait.getValue?.() ?? trait.get('value') ?? '#000000';
            swatch.style.backgroundColor = currentColor;

            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.value = currentColor;
            swatch.appendChild(colorInput);

            const hexInput = document.createElement('input');
            hexInput.className = 'sg-color-hex-input';
            hexInput.value = currentColor;

            colorInput.addEventListener('input', () => {
              swatch.style.backgroundColor = colorInput.value;
              hexInput.value = colorInput.value;
              trait.setValue(colorInput.value);
            });

            hexInput.addEventListener('change', () => {
              swatch.style.backgroundColor = hexInput.value;
              colorInput.value = hexInput.value;
              trait.setValue(hexInput.value);
            });

            wrap.appendChild(swatch);
            wrap.appendChild(hexInput);
            field.appendChild(wrap);
            break;
          }

          case 'button': {
            const btn = document.createElement('button');
            btn.className = 'sg-action-btn';
            btn.textContent = trait.get('text') || trait.getLabel?.() || 'Action';
            btn.addEventListener('click', () => {
              const command = trait.get('command');
              if (command) editor.runCommand(command);
            });
            field.appendChild(btn);
            break;
          }

          default: {
            const input = document.createElement('input');
            input.className = 'sg-input';
            input.type = 'text';
            input.value = trait.getValue?.() ?? trait.get('value') ?? '';
            input.addEventListener('change', () => {
              trait.setValue(input.value);
            });
            field.appendChild(input);
          }
        }

        row.appendChild(label);
        row.appendChild(field);
        body.appendChild(row);
      }

      section.appendChild(header);
      section.appendChild(body);
      el.appendChild(section);
    }
  }

  // Render traits immediately (edit-panel manages re-renders via trait:custom)
  renderTraits();
}
