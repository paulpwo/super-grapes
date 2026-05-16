import { A as ee, e as te, v as ae } from "./html-parser-DbH5ootH.js";
function ie(b, Z, $ = "replace") {
  var J;
  const _ = typeof $ == "string" ? { mode: $ } : $, z = _.mode || "replace", s = _.targetComponent || null, O = new ee(Z), I = [];
  let i = null, P = !1;
  const p = document.createElement("div");
  p.className = "sg-modal-backdrop sg-modal--ai";
  const E = document.createElement("div");
  E.className = "sg-modal";
  const w = document.createElement("div");
  w.className = "sg-modal-header", w.innerHTML = `
    <span class="sg-modal-title">
      <i class="fa-solid fa-wand-magic-sparkles sg-ai-title-icon"></i>
      AI Page Builder
    </span>`;
  const C = document.createElement("button");
  C.className = "sg-modal-close", C.innerHTML = '<i class="fa-solid fa-xmark"></i>', w.appendChild(C), E.appendChild(w);
  const x = document.createElement("div");
  x.className = "sg-modal-body";
  const d = document.createElement("div");
  d.className = "sg-ai-messages";
  const m = document.createElement("div");
  m.className = "sg-ai-empty";
  const S = z === "append", u = z === "edit", B = ((J = s == null ? void 0 : s.getName) == null ? void 0 : J.call(s)) || "component";
  let R = "What do you want to build?", D = "Describe a page, section, or layout and AI will generate it for you.", q = `
    <button class="sg-ai-example" data-prompt="A modern SaaS landing page with hero, features, and pricing">Landing page</button>
    <button class="sg-ai-example" data-prompt="A professional contact page with form, map, and company info">Contact page</button>
    <button class="sg-ai-example" data-prompt="A portfolio gallery with filterable project cards and about section">Portfolio</button>`;
  S ? (R = "Add a new section", D = "Describe a section to add to your page. It will be appended below existing content.", q = `
      <button class="sg-ai-example" data-prompt="A testimonials section with 3 customer quotes and star ratings">Testimonials</button>
      <button class="sg-ai-example" data-prompt="A pricing table with 3 tiers: Basic, Pro, and Enterprise">Pricing</button>
      <button class="sg-ai-example" data-prompt="A contact section with form, phone, email, and address">Contact</button>`) : u && (R = `Edit "${B}" with AI`, D = "Describe the changes you want. The AI will modify only this component.", q = `
      <button class="sg-ai-example" data-prompt="Make it more visually appealing with better colors and spacing">Improve design</button>
      <button class="sg-ai-example" data-prompt="Rewrite the text to be more professional and compelling">Better copy</button>
      <button class="sg-ai-example" data-prompt="Reorganize the layout to be more modern and clean">New layout</button>`), m.innerHTML = `
    <div class="sg-ai-empty-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
    <div class="sg-ai-empty-title">${R}</div>
    <div class="sg-ai-empty-hint">${D}</div>
    <div class="sg-ai-empty-examples">${q}</div>`, d.appendChild(m);
  const o = document.createElement("input");
  o.type = "file", o.accept = "image/*", o.style.display = "none";
  const c = document.createElement("div");
  c.className = "sg-ai-img-preview-bar", c.style.display = "none";
  const g = document.createElement("div");
  g.className = "sg-ai-input-area";
  const h = document.createElement("div");
  h.className = "sg-ai-input-row";
  const f = document.createElement("button");
  f.className = "sg-ai-input-icon-btn", f.title = "Attach reference image", f.innerHTML = '<i class="fa-solid fa-image"></i>';
  const t = document.createElement("textarea");
  t.placeholder = u ? `Describe changes for "${B}"...` : "Describe what you want to build...", t.rows = 1;
  const r = document.createElement("button");
  r.className = "sg-ai-send-btn", r.title = "Send (Enter)", r.innerHTML = '<i class="fa-solid fa-arrow-up"></i>', h.appendChild(f), h.appendChild(t), h.appendChild(r);
  const L = document.createElement("div");
  L.className = "sg-ai-input-footer";
  const k = document.createElement("label");
  k.className = "sg-ai-context-toggle";
  const F = document.createElement("input");
  F.type = "checkbox", k.appendChild(F), k.appendChild(document.createTextNode(" Include current canvas as context"));
  const U = document.createElement("span");
  U.className = "sg-ai-shortcut-hint", U.textContent = "Enter to send, Shift+Enter for new line", u || L.appendChild(k), L.appendChild(U), g.appendChild(c), g.appendChild(h), g.appendChild(L), x.appendChild(d), x.appendChild(g), E.appendChild(x), p.appendChild(E), document.body.appendChild(p), document.body.appendChild(o), t.addEventListener("input", () => {
    t.style.height = "auto", t.style.height = Math.min(t.scrollHeight, 120) + "px";
  });
  const N = () => {
    p.remove(), o.remove();
  };
  C.addEventListener("click", N), p.addEventListener("click", (e) => {
    e.target === p && N();
  }), document.addEventListener("keydown", function e(a) {
    a.key === "Escape" && (N(), document.removeEventListener("keydown", e));
  }), m.querySelectorAll(".sg-ai-example").forEach((e) => {
    e.addEventListener("click", () => {
      t.value = e.dataset.prompt || "", t.dispatchEvent(new Event("input")), t.focus();
    });
  }), f.addEventListener("click", () => o.click()), o.addEventListener("change", () => {
    var n;
    const e = (n = o.files) == null ? void 0 : n[0];
    if (!e) return;
    const a = new FileReader();
    a.onload = () => {
      i = a.result, j();
    }, a.readAsDataURL(e), o.value = "";
  });
  function j() {
    if (!i) {
      c.style.display = "none", c.innerHTML = "";
      return;
    }
    c.style.display = "flex", c.innerHTML = `
      <div class="sg-ai-img-preview">
        <img src="${i}" />
        <button class="sg-ai-img-preview-remove"><i class="fa-solid fa-xmark"></i></button>
      </div>`, c.querySelector(".sg-ai-img-preview-remove").addEventListener("click", () => {
      i = null, j();
    });
  }
  async function G() {
    const e = t.value.trim();
    if (!e && !i || P) return;
    m.parentNode && m.remove();
    let a = "";
    if (u && s) {
      const l = s.toHTML();
      a = `[Component to edit — "${B}"]
${l}

[User request]
Modify the component above based on this instruction. Return ONLY the modified HTML for this component, not a full page:
`;
    } else F.checked && (a = `[Current template HTML]
${b.getHtml()}

[Current template CSS]
${b.getCss()}

[User request]
`);
    const n = a + e;
    let W;
    i ? W = [
      { type: "text", text: n },
      { type: "image_url", image_url: { url: i } }
    ] : W = n, A("user", e + (i ? " [image attached]" : "")), I.push({ role: "user", content: W }), t.value = "", t.style.height = "auto", i = null, j(), P = !0, r.disabled = !0;
    const v = document.createElement("div");
    v.className = "sg-ai-thinking", v.innerHTML = `
      <div class="sg-ai-thinking-dots"><span></span><span></span><span></span></div>
      Generating your page...`, d.appendChild(v), K();
    try {
      const l = await O.chat(I);
      v.remove(), I.push({ role: "assistant", content: l });
      const y = te(l);
      if (ae(y)) {
        const Q = A("assistant", "Here's a preview of the generated page:"), V = document.createElement("div");
        V.className = "sg-ai-preview-wrap";
        const Y = document.createElement("iframe");
        Y.sandbox.add("allow-same-origin"), Y.srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;}html{overflow:hidden;}</style></head><body>${y}</body></html>`, V.appendChild(Y), Q.appendChild(V);
        const H = document.createElement("div");
        H.className = "sg-ai-preview-actions";
        const T = document.createElement("button");
        T.className = "sg-ai-apply-btn", T.innerHTML = u ? '<i class="fa-solid fa-pen"></i> Apply Changes' : S ? '<i class="fa-solid fa-plus"></i> Add to Page' : '<i class="fa-solid fa-check"></i> Apply to Canvas', T.addEventListener("click", () => {
          if (u && s)
            s.components(y);
          else if (S) {
            const X = b.getWrapper();
            X && X.append(y);
          } else
            b.setComponents(y);
          N();
        });
        const M = document.createElement("button");
        M.className = "sg-ai-retry-btn", M.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Regenerate', M.addEventListener("click", () => t.focus()), H.appendChild(T), H.appendChild(M), Q.appendChild(H);
      } else
        A("assistant", l);
    } catch (l) {
      v.remove(), A("error", (l == null ? void 0 : l.message) || "Something went wrong. Please try again.");
    } finally {
      P = !1, r.disabled = !1;
    }
  }
  function A(e, a) {
    const n = document.createElement("div");
    return n.className = `sg-ai-msg sg-ai-msg--${e}`, n.textContent = a, d.appendChild(n), K(), n;
  }
  function K() {
    requestAnimationFrame(() => {
      d.scrollTop = d.scrollHeight;
    });
  }
  t.addEventListener("keydown", (e) => {
    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), G());
  }), r.addEventListener("click", G), t.focus();
}
export {
  ie as openAiChatModal
};
//# sourceMappingURL=ai-chat-modal-lx7mxcPS.js.map
