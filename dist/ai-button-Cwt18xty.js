import { openAiChatModal as a } from "./ai-chat-modal-lx7mxcPS.js";
function o(e, n, s) {
  const t = document.createElement("button");
  t.className = "sg-ai-btn", t.title = "AI Assistant", t.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> AI Assistant', t.addEventListener("click", () => {
    a(n, s);
  });
  const i = e.querySelector('[data-cmd="sw-visibility"]');
  i ? e.insertBefore(t, i) : e.prepend(t);
}
export {
  o as initAiButton
};
//# sourceMappingURL=ai-button-Cwt18xty.js.map
