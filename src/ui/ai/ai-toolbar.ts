/**
 * AI Edit Toolbar Button — Injects an "Edit with AI" button into the
 * component toolbar for every selected component. Only active when
 * AI config is present on the editor.
 */
import type { Editor } from 'grapesjs';

const CMD_AI_EDIT = 'sg:ai-edit';

export function initAiToolbarButton(editor: Editor): void {
  const aiConfig = (editor as any).__sgAiConfig;
  if (!aiConfig) return;

  // Register the command
  editor.Commands.add(CMD_AI_EDIT, {
    run(ed: Editor) {
      const component = ed.getSelected();
      if (!component) return;

      import('./ai-chat-modal').then(({ openAiChatModal }) => {
        openAiChatModal(ed, aiConfig, {
          mode: 'edit',
          targetComponent: component,
        });
      });
    },
  });

  // Inject the AI button into every component's toolbar on selection
  editor.on('component:selected', (component: any) => {
    const toolbar = component.get('toolbar') || [];

    // Don't add if already present
    if (toolbar.some((btn: any) => btn.command === CMD_AI_EDIT)) return;

    // Insert before the delete button (last item), or at the end
    const newToolbar = [...toolbar];
    const deleteIdx = newToolbar.findIndex((btn: any) => btn.command === 'tlb-delete');

    const aiBtn = {
      command: CMD_AI_EDIT,
      label: '<i class="fa-solid fa-wand-magic-sparkles"></i>',
      attributes: { title: 'Edit with AI' },
    };

    if (deleteIdx >= 0) {
      newToolbar.splice(deleteIdx, 0, aiBtn);
    } else {
      newToolbar.push(aiBtn);
    }

    component.set('toolbar', newToolbar);
  });
}
