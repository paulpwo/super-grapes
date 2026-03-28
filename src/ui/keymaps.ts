import type { Editor } from 'grapesjs';

let clipboard: any = null;

export function registerKeymaps(editor: Editor): void {
  const km = editor.Keymaps;
  const cmd = editor.Commands;

  cmd.add('sg:duplicate', {
    run(ed: Editor) {
      const selected = ed.getSelected();
      if (!selected) return;
      const parent = selected.parent();
      if (!parent) return;
      const index = parent.components().indexOf(selected);
      const clone = selected.clone();
      parent.components().add(clone, { at: index + 1 });
      ed.select(clone);
    },
  });

  cmd.add('sg:copy', {
    run(ed: Editor) {
      const selected = ed.getSelected();
      if (selected) clipboard = selected.clone();
    },
  });

  cmd.add('sg:paste', {
    run(ed: Editor) {
      if (!clipboard) return;
      const selected = ed.getSelected();
      const target = selected?.parent() || ed.getWrapper();
      if (!target) return;
      const clone = clipboard.clone();
      if (selected) {
        const index = target.components().indexOf(selected);
        target.components().add(clone, { at: index + 1 });
      } else {
        target.components().add(clone);
      }
      ed.select(clone);
    },
  });

  cmd.add('sg:delete', {
    run(ed: Editor) {
      const selected = ed.getSelected();
      if (!selected) return;
      const parent = selected.parent();
      const index = selected.index();
      selected.remove();
      if (parent) {
        const siblings = parent.components();
        const next = siblings.at(index) || siblings.at(index - 1);
        if (next) {
          ed.select(next);
        } else {
          ed.select();
        }
      }
    },
  });

  km.add('sg:delete', 'backspace', 'sg:delete');
  km.add('sg:delete-del', 'delete', 'sg:delete');
  km.add('sg:duplicate', '⌘+d', 'sg:duplicate');
  km.add('sg:copy', '⌘+c', 'sg:copy');
  km.add('sg:paste', '⌘+v', 'sg:paste');
  km.add('sg:undo', '⌘+z', 'core:undo');
  km.add('sg:redo', '⌘+shift+z', 'core:redo');
}
