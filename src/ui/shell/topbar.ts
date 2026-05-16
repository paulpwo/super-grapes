import type { Editor } from "grapesjs";
import logoSrc from "../../assets/logo-small.png";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import { html_beautify, css_beautify } from "js-beautify";

function esc(s: string): string {
	const d = document.createElement("div");
	d.textContent = s;
	return d.innerHTML;
}

export function initTopbar(el: HTMLElement, editor: Editor): void {
	el.innerHTML = `
    <div class="sg-topbar-left">
      <div class="sg-topbar-logo" title="Menu">
        <img src="${logoSrc}" alt="Super Grapes" class="sg-topbar-logo-img">
      </div>
      <div class="sg-topbar-sep"></div>
      <button class="sg-topbar-icon-btn" data-cmd="undo" title="Undo">
        <i class="fa-solid fa-rotate-left"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="redo" title="Redo">
        <i class="fa-solid fa-rotate-right"></i>
      </button>
      <div class="sg-topbar-sep"></div>
    </div>
    <div class="sg-topbar-center">
      <div class="sg-device-group">
        <button class="sg-device-btn active" data-device="Desktop" title="Desktop">
          <i class="fa-solid fa-desktop"></i>
        </button>
        <button class="sg-device-btn" data-device="Tablet" title="Tablet">
          <i class="fa-solid fa-tablet-screen-button"></i>
        </button>
        <button class="sg-device-btn" data-device="Mobile" title="Mobile">
          <i class="fa-solid fa-mobile-screen-button"></i>
        </button>
      </div>
    </div>
    <div class="sg-topbar-right">
      <button class="sg-topbar-icon-btn active" data-cmd="sw-visibility" title="Component borders">
        <i class="fa-solid fa-border-all"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="preview" title="Preview">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="toggle-navigator" title="Navigator">
        <i class="fa-solid fa-layer-group"></i>
      </button>
      <div class="sg-topbar-sep"></div>
      <button class="sg-topbar-icon-btn" data-cmd="code-editor" title="Edit page HTML / CSS">
        <i class="fa-solid fa-code"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="import" title="Import HTML">
        <i class="fa-solid fa-file-import"></i>
      </button>
      <button class="sg-topbar-icon-btn" data-cmd="export" title="Export HTML/CSS">
        <i class="fa-solid fa-file-export"></i>
      </button>
      <div class="sg-topbar-sep"></div>
      <button class="sg-save-btn" data-cmd="save">
        <i class="fa-solid fa-floppy-disk"></i>
        Save
      </button>
    </div>
  `;

	// Bind undo / redo
	const undoBtn = el.querySelector('[data-cmd="undo"]') as HTMLButtonElement;
	const redoBtn = el.querySelector('[data-cmd="redo"]') as HTMLButtonElement;

	undoBtn.addEventListener("click", () => editor.UndoManager.undo());
	redoBtn.addEventListener("click", () => editor.UndoManager.redo());

	function updateUndoRedoState() {
		undoBtn.disabled = !editor.UndoManager.hasUndo();
		redoBtn.disabled = !editor.UndoManager.hasRedo();
	}

	editor.on("change:changesCount", updateUndoRedoState);
	updateUndoRedoState();

	// Device switcher
	const deviceBtns = el.querySelectorAll(
		".sg-device-btn",
	) as NodeListOf<HTMLButtonElement>;
	deviceBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const device = btn.dataset.device!;
			editor.setDevice(device);
			deviceBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
		});
	});

	editor.on("change:device", () => {
		const currentDevice = editor.getDevice();
		deviceBtns.forEach((b) => {
			b.classList.toggle("active", b.dataset.device === currentDevice);
		});
	});

	// Component borders (sw-visibility) — active by default
	const swBtn = el.querySelector(
		'[data-cmd="sw-visibility"]',
	) as HTMLButtonElement;
	let swActive = true;

	// Activate on editor load
	editor.on("load", () => {
		editor.runCommand("sw-visibility");
	});

	swBtn.addEventListener("click", () => {
		swActive = !swActive;
		if (swActive) {
			editor.runCommand("sw-visibility");
		} else {
			editor.stopCommand("sw-visibility");
		}
		swBtn.classList.toggle("active", swActive);
	});

	// Preview — custom implementation (native GrapesJS preview breaks custom UI)
	const previewBtn = el.querySelector(
		'[data-cmd="preview"]',
	) as HTMLButtonElement;
	let isPreview = false;

	let prevSelected: any = null;
	let prevSwVisibility = false;

	previewBtn.addEventListener("click", () => {
		isPreview = !isPreview;
		const editorRoot = document.querySelector(".sg-editor") as HTMLElement;

		if (isPreview) {
			// Save state before preview
			prevSelected = editor.getSelected();
			prevSwVisibility = swActive;

			editor.select();
			if (swActive) {
				editor.stopCommand("sw-visibility");
				swActive = false;
				swBtn.classList.remove("active");
			}
			editor.runCommand("preview");
			editorRoot.classList.add("sg-preview-mode");
			previewBtn.classList.add("active");

			const exitBtn = document.createElement("button");
			exitBtn.className = "sg-preview-exit-btn";
			exitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Exit Preview';
			exitBtn.addEventListener("click", () => previewBtn.click());
			editorRoot.appendChild(exitBtn);

			document.addEventListener("keydown", onEscPreview);
		} else {
			editor.stopCommand("preview");
			editorRoot.classList.remove("sg-preview-mode");

			// Restore sw-visibility state
			if (prevSwVisibility) {
				editor.runCommand("sw-visibility");
				swActive = true;
				swBtn.classList.add("active");
			}

			// Restore previous selection
			if (prevSelected) {
				editor.select(prevSelected);
				prevSelected = null;
			}

			previewBtn.classList.remove("active");

			const exitBtn = editorRoot.querySelector(".sg-preview-exit-btn");
			if (exitBtn) exitBtn.remove();

			document.removeEventListener("keydown", onEscPreview);
		}
	});

	function onEscPreview(e: KeyboardEvent) {
		if (e.key === "Escape" && isPreview) {
			previewBtn.click();
		}
	}

	// Navigator toggle
	const navBtn = el.querySelector(
		'[data-cmd="toggle-navigator"]',
	) as HTMLButtonElement;
	navBtn.addEventListener("click", () => {
		const navEl = document.querySelector(".sg-navigator");
		if (navEl) {
			const isOpen = navEl.classList.toggle("open");
			navBtn.classList.toggle("active", isOpen);
		}
	});

	// Code editor (full page HTML + CSS, editable)
	el.querySelector('[data-cmd="code-editor"]')!.addEventListener(
		"click",
		() => {
			showCodeEditorModal(editor);
		},
	);

	// Export
	el.querySelector('[data-cmd="export"]')!.addEventListener("click", () => {
		const html = editor.getHtml();
		const css = editor.getCss() ?? "";
		showExportModal(html, css);
	});

	// Import — direct file picker, replaces all content
	el.querySelector('[data-cmd="import"]')!.addEventListener("click", () => {
		importFromFile(editor);
	});

	// Save
	el.querySelector('[data-cmd="save"]')!.addEventListener("click", () => {
		editor.store();
	});

	// AI button — only if configured
	const aiConfig = (editor as any).__sgAiConfig;
	if (aiConfig?.apiKey) {
		import("../ai/ai-button").then(({ initAiButton }) => {
			initAiButton(el.querySelector(".sg-topbar-right")!, editor, aiConfig);
		});
	}
}

/* ---- Modal helpers ---- */

function showModal(
	title: string,
	content: HTMLElement,
): { backdrop: HTMLElement; close: () => void } {
	const backdrop = document.createElement("div");
	backdrop.className = "sg-modal-backdrop";

	const modal = document.createElement("div");
	modal.className = "sg-modal";

	const header = document.createElement("div");
	header.className = "sg-modal-header";
	header.innerHTML = `<span class="sg-modal-title">${esc(title)}</span>`;

	const closeBtn = document.createElement("button");
	closeBtn.className = "sg-modal-close";
	closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

	const close = () => backdrop.remove();
	closeBtn.addEventListener("click", close);
	backdrop.addEventListener("click", (e) => {
		if (e.target === backdrop) close();
	});

	header.appendChild(closeBtn);
	modal.appendChild(header);

	const body = document.createElement("div");
	body.className = "sg-modal-body";
	body.appendChild(content);
	modal.appendChild(body);

	backdrop.appendChild(modal);
	document.body.appendChild(backdrop);

	return { backdrop, close };
}

function showExportModal(html: string, css: string): void {
	const wrap = document.createElement("div");
	wrap.className = "sg-export-wrap";

	const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${css}
</style>
</head>
<body>
${html}
</body>
</html>`;

	// HTML section
	const htmlLabel = document.createElement("label");
	htmlLabel.className = "sg-modal-label";
	htmlLabel.textContent = "HTML";
	const htmlArea = document.createElement("textarea");
	htmlArea.className = "sg-modal-textarea";
	htmlArea.readOnly = true;
	htmlArea.value = html;

	// CSS section
	const cssLabel = document.createElement("label");
	cssLabel.className = "sg-modal-label";
	cssLabel.textContent = "CSS";
	const cssArea = document.createElement("textarea");
	cssArea.className = "sg-modal-textarea";
	cssArea.readOnly = true;
	cssArea.value = css;

	// Buttons
	const actions = document.createElement("div");
	actions.className = "sg-modal-actions";

	const copyHtmlBtn = document.createElement("button");
	copyHtmlBtn.className = "sg-modal-btn";
	copyHtmlBtn.textContent = "Copy HTML";
	copyHtmlBtn.addEventListener("click", () =>
		navigator.clipboard.writeText(html),
	);

	const copyCssBtn = document.createElement("button");
	copyCssBtn.className = "sg-modal-btn";
	copyCssBtn.textContent = "Copy CSS";
	copyCssBtn.addEventListener("click", () =>
		navigator.clipboard.writeText(css),
	);

	const downloadBtn = document.createElement("button");
	downloadBtn.className = "sg-modal-btn sg-modal-btn-primary";
	downloadBtn.textContent = "Download .html";
	downloadBtn.addEventListener("click", () => {
		const blob = new Blob([fullDoc], { type: "text/html" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "export.html";
		a.click();
		URL.revokeObjectURL(url);
	});

	actions.appendChild(copyHtmlBtn);
	actions.appendChild(copyCssBtn);
	actions.appendChild(downloadBtn);

	wrap.appendChild(htmlLabel);
	wrap.appendChild(htmlArea);
	wrap.appendChild(cssLabel);
	wrap.appendChild(cssArea);
	wrap.appendChild(actions);

	showModal("Export HTML / CSS", wrap);
}

function showCodeEditorModal(editor: Editor): void {
	const wrap = document.createElement("div");
	wrap.className = "sg-code-editor-wrap";

	// Tab bar
	const tabBar = document.createElement("div");
	tabBar.className = "sg-code-modal-tabs";

	const htmlTab = document.createElement("button");
	htmlTab.className = "sg-code-modal-tab active";
	htmlTab.textContent = "HTML";

	const cssTab = document.createElement("button");
	cssTab.className = "sg-code-modal-tab";
	cssTab.textContent = "CSS";

	tabBar.appendChild(htmlTab);
	tabBar.appendChild(cssTab);

	// Editor panes
	const htmlPane = document.createElement("div");
	htmlPane.className = "sg-code-modal-pane active";

	const cssPane = document.createElement("div");
	cssPane.className = "sg-code-modal-pane";

	// CodeMirror instances
	const rawHtml = editor.getHtml();
	const rawCss = editor.getCss() ?? "";

	const prettyHtml = html_beautify(rawHtml, {
		indent_size: 2,
		wrap_line_length: 0,
		preserve_newlines: false,
	});
	const prettyCss = css_beautify(rawCss, {
		indent_size: 2,
	});

	const htmlView = new EditorView({
		state: EditorState.create({
			doc: prettyHtml,
			extensions: [basicSetup, oneDark, html()],
		}),
		parent: htmlPane,
	});

	const cssView = new EditorView({
		state: EditorState.create({
			doc: prettyCss,
			extensions: [basicSetup, oneDark, css()],
		}),
		parent: cssPane,
	});

	// Tab switching
	htmlTab.addEventListener("click", () => {
		htmlTab.classList.add("active");
		cssTab.classList.remove("active");
		htmlPane.classList.add("active");
		cssPane.classList.remove("active");
	});

	cssTab.addEventListener("click", () => {
		cssTab.classList.add("active");
		htmlTab.classList.remove("active");
		cssPane.classList.add("active");
		htmlPane.classList.remove("active");
	});

	// Actions
	const actions = document.createElement("div");
	actions.className = "sg-modal-actions";

	const status = document.createElement("span");
	status.className = "sg-code-status";
	status.style.marginRight = "auto";

	const applyBtn = document.createElement("button");
	applyBtn.className = "sg-modal-btn sg-modal-btn-primary";
	applyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Apply';

	applyBtn.addEventListener("click", () => {
		try {
			editor.setComponents(htmlView.state.doc.toString());
			editor.setStyle(cssView.state.doc.toString());
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

	actions.appendChild(status);
	actions.appendChild(applyBtn);

	const paneWrap = document.createElement("div");
	paneWrap.className = "sg-code-modal-pane-wrap";
	paneWrap.appendChild(htmlPane);
	paneWrap.appendChild(cssPane);

	wrap.appendChild(tabBar);
	wrap.appendChild(paneWrap);
	wrap.appendChild(actions);

	showModal("Page HTML / CSS", wrap);
}

function importFromFile(editor: Editor): void {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = ".html,.htm";
	input.style.display = "none";

	input.addEventListener("change", () => {
		const file = input.files?.[0];
		if (!file) return;
		file.text().then((html) => {
			editor.setComponents(html);
		});
	});

	document.body.appendChild(input);
	input.click();
	input.remove();
}
