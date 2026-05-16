import type { Editor } from "grapesjs";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { html_beautify } from "js-beautify";

export function renderCodeTab(el: HTMLElement, editor: Editor): void {
	el.innerHTML = "";

	const selected = editor.getSelected();
	if (!selected) {
		el.innerHTML =
			'<div class="sg-empty-state"><i class="fa-solid fa-code"></i><span>Select an element</span></div>';
		return;
	}

	const wrap = document.createElement("div");
	wrap.className = "sg-code-tab-wrap";

	const label = document.createElement("div");
	label.className = "sg-code-tab-label";
	label.textContent = "Component HTML";

	const editorContainer = document.createElement("div");
	editorContainer.className = "sg-code-tab-editor";

	const prettyHtml = html_beautify(selected.toHTML(), {
		indent_size: 2,
		wrap_line_length: 0,
		preserve_newlines: true,
		max_preserve_newlines: 2,
	});

	const view = new EditorView({
		state: EditorState.create({
			doc: prettyHtml,
			extensions: [basicSetup, oneDark, html(), EditorView.lineWrapping],
		}),
		parent: editorContainer,
	});

	const actions = document.createElement("div");
	actions.className = "sg-code-tab-actions";

	const resetBtn = document.createElement("button");
	resetBtn.className = "sg-code-reset-btn";
	resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Reset';
	resetBtn.addEventListener("click", () => {
		const resetHtml = html_beautify(selected.toHTML(), {
			indent_size: 2,
			wrap_line_length: 0,
			preserve_newlines: true,
			max_preserve_newlines: 2,
		});
		view.dispatch({
			changes: { from: 0, to: view.state.doc.length, insert: resetHtml },
		});
		status.textContent = "";
	});

	const status = document.createElement("span");
	status.className = "sg-code-status";

	const applyBtn = document.createElement("button");
	applyBtn.className = "sg-code-apply-btn";
	applyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Apply';

	applyBtn.addEventListener("click", () => {
		try {
			const newHtml = view.state.doc.toString().trim();
			const parent = selected.parent();
			const index = selected.index();

			editor.select(null as any);
			selected.remove();

			if (parent) {
				parent.components().add(newHtml, { at: index });
				const added = parent.components().at(index);
				if (added) editor.select(added);
			} else {
				editor.setComponents(newHtml);
			}

			status.textContent = "Applied";
			status.className = "sg-code-status ok";
			setTimeout(() => {
				status.textContent = "";
			}, 2000);
		} catch (e: any) {
			status.textContent = e?.message ?? "Error";
			status.className = "sg-code-status err";
		}
	});

	actions.appendChild(resetBtn);
	actions.appendChild(status);
	actions.appendChild(applyBtn);

	wrap.appendChild(label);
	wrap.appendChild(editorContainer);
	wrap.appendChild(actions);
	el.appendChild(wrap);
}
