import "openai";
import { c as ie, i as oe } from "./index-Cl8S943t.js";
import { e as se, c as V } from "./html-parser-CmlRfacY.js";
function pe(E, z, B = "replace") {
  var O;
  const K = typeof B == "string" ? { mode: B } : B, w = K.mode || "replace", s = K.targetComponent || null, Q = ie(z), J = oe(z), S = w === "append" ? "append" : w === "edit" ? "edit" : "replace";
  let d = null, $ = !1;
  const m = document.createElement("div");
  m.className = "sg-modal-backdrop sg-modal--ai";
  const C = document.createElement("div");
  C.className = "sg-modal";
  const x = document.createElement("div");
  x.className = "sg-modal-header", x.innerHTML = `
    <span class="sg-modal-title">
      <i class="fa-solid fa-wand-magic-sparkles sg-ai-title-icon"></i>
      AI Page Builder
    </span>`;
  const k = document.createElement("button");
  k.className = "sg-modal-close", k.innerHTML = '<i class="fa-solid fa-xmark"></i>', x.appendChild(k), C.appendChild(x);
  const L = document.createElement("div");
  L.className = "sg-modal-body";
  const r = document.createElement("div");
  r.className = "sg-ai-messages";
  const u = document.createElement("div");
  u.className = "sg-ai-empty";
  const D = w === "append", g = w === "edit", X = ((O = s == null ? void 0 : s.getName) == null ? void 0 : O.call(s)) || "component";
  let R = "What do you want to build?", q = "Describe a page, section, or layout and AI will generate it for you.", F = `
    <button class="sg-ai-example" data-prompt="A modern SaaS landing page with hero, features, and pricing">Landing page</button>
    <button class="sg-ai-example" data-prompt="A professional contact page with form, map, and company info">Contact page</button>
    <button class="sg-ai-example" data-prompt="A portfolio gallery with filterable project cards and about section">Portfolio</button>`;
  D ? (R = "Add a new section", q = "Describe a section to add to your page. It will be appended below existing content.", F = `
      <button class="sg-ai-example" data-prompt="A testimonials section with 3 customer quotes and star ratings">Testimonials</button>
      <button class="sg-ai-example" data-prompt="A pricing table with 3 tiers: Basic, Pro, and Enterprise">Pricing</button>
      <button class="sg-ai-example" data-prompt="A contact section with form, phone, email, and address">Contact</button>`) : g && (R = `Edit "${X}" with AI`, q = "Describe the changes you want. The AI will modify only this component.", F = `
      <button class="sg-ai-example" data-prompt="Make it more visually appealing with better colors and spacing">Improve design</button>
      <button class="sg-ai-example" data-prompt="Rewrite the text to be more professional and compelling">Better copy</button>
      <button class="sg-ai-example" data-prompt="Reorganize the layout to be more modern and clean">New layout</button>`), u.innerHTML = `
    <div class="sg-ai-empty-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
    <div class="sg-ai-empty-title">${R}</div>
    <div class="sg-ai-empty-hint">${q}</div>
    <div class="sg-ai-empty-examples">${F}</div>`, r.appendChild(u);
  const i = document.createElement("input");
  i.type = "file", i.accept = "image/*", i.style.display = "none";
  const o = document.createElement("div");
  o.className = "sg-ai-img-preview-bar", o.style.display = "none";
  const h = document.createElement("div");
  h.className = "sg-ai-input-area";
  const f = document.createElement("div");
  f.className = "sg-ai-input-row";
  const v = document.createElement("button");
  v.className = "sg-ai-input-icon-btn", v.title = "Attach reference image", v.innerHTML = '<i class="fa-solid fa-image"></i>';
  const t = document.createElement("textarea");
  t.placeholder = g ? `Describe changes for "${X}"...` : "Describe what you want to build...", t.rows = 1;
  const p = document.createElement("button");
  p.className = "sg-ai-send-btn", p.title = "Send (Enter)", p.innerHTML = '<i class="fa-solid fa-arrow-up"></i>', f.appendChild(v), f.appendChild(t), f.appendChild(p);
  const N = document.createElement("div");
  N.className = "sg-ai-input-footer";
  const T = document.createElement("label");
  T.className = "sg-ai-context-toggle";
  const j = document.createElement("input");
  j.type = "checkbox", T.appendChild(j), T.appendChild(document.createTextNode(" Include current canvas as context"));
  const W = document.createElement("span");
  W.className = "sg-ai-shortcut-hint", W.textContent = "Enter to send, Shift+Enter for new line", g || N.appendChild(T), N.appendChild(W), h.appendChild(o), h.appendChild(f), h.appendChild(N), L.appendChild(r), L.appendChild(h), C.appendChild(L), m.appendChild(C), document.body.appendChild(m), document.body.appendChild(i), t.addEventListener("input", () => {
    t.style.height = "auto", t.style.height = Math.min(t.scrollHeight, 120) + "px";
  });
  const A = () => {
    m.remove(), i.remove();
  };
  k.addEventListener("click", A), m.addEventListener("click", (e) => {
    e.target === m && A();
  }), document.addEventListener("keydown", function e(a) {
    a.key === "Escape" && (A(), document.removeEventListener("keydown", e));
  }), u.querySelectorAll(".sg-ai-example").forEach((e) => {
    e.addEventListener("click", () => {
      t.value = e.dataset.prompt || "", t.dispatchEvent(new Event("input")), t.focus();
    });
  }), v.addEventListener("click", () => i.click()), i.addEventListener("change", () => {
    var n;
    const e = (n = i.files) == null ? void 0 : n[0];
    if (!e) return;
    const a = new FileReader();
    a.onload = () => {
      d = a.result, Y();
    }, a.readAsDataURL(e), i.value = "";
  });
  function Y() {
    if (!d) {
      o.style.display = "none", o.innerHTML = "";
      return;
    }
    o.style.display = "flex", o.innerHTML = `
      <div class="sg-ai-img-preview">
        <img src="${d}" />
        <button class="sg-ai-img-preview-remove"><i class="fa-solid fa-xmark"></i></button>
      </div>`, o.querySelector(".sg-ai-img-preview-remove").addEventListener("click", () => {
      d = null, Y();
    });
  }
  async function Z() {
    const e = t.value.trim();
    if (!e && !d || $) return;
    u.parentNode && u.remove();
    let a = null, n = null;
    g && s ? a = s.toHTML() : j.checked && (a = E.getHtml(), n = E.getCss() || null);
    const ee = d, te = {
      intent: e,
      context: { mode: S, currentHtml: a, currentCss: n },
      image: ee
    };
    H("user", e + (ee ? " [image attached]" : "")), t.value = "", t.style.height = "auto", d = null, Y(), $ = !0, p.disabled = !0;
    const y = document.createElement("div");
    y.className = "sg-ai-thinking", y.innerHTML = `
      <div class="sg-ai-thinking-dots"><span></span><span></span><span></span></div>
      Generating your page...`, r.appendChild(y), _();
    try {
      let l = await Q.generate(te), c = se(l), b = V(c, S);
      if (!b.ok && !J && (l = await Q.generate({
        ...te,
        intent: `${e}

[SYSTEM NOTE] Your previous output was incomplete or truncated (${b.message}). Produce the COMPLETE result with every tag closed.`
      }), c = se(l), b = V(c, S)), y.remove(), b.ok || J && V(c, "append").ok) {
        const ae = H("assistant", "Here's a preview of the generated page:"), G = document.createElement("div");
        G.className = "sg-ai-preview-wrap";
        const U = document.createElement("iframe");
        U.sandbox.add("allow-same-origin"), U.srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;}html{overflow:hidden;}</style></head><body>${c}</body></html>`, G.appendChild(U), ae.appendChild(G);
        const M = document.createElement("div");
        M.className = "sg-ai-preview-actions";
        const I = document.createElement("button");
        I.className = "sg-ai-apply-btn", I.innerHTML = g ? '<i class="fa-solid fa-pen"></i> Apply Changes' : D ? '<i class="fa-solid fa-plus"></i> Add to Page' : '<i class="fa-solid fa-check"></i> Apply to Canvas', I.addEventListener("click", () => {
          if (g && s)
            s.components(c);
          else if (D) {
            const ne = E.getWrapper();
            ne && ne.append(c);
          } else
            E.setComponents(c);
          A();
        });
        const P = document.createElement("button");
        P.className = "sg-ai-retry-btn", P.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Regenerate', P.addEventListener("click", () => t.focus()), M.appendChild(I), M.appendChild(P), ae.appendChild(M);
      } else
        H("assistant", b.message || l);
    } catch (l) {
      y.remove(), H("error", (l == null ? void 0 : l.message) || "Something went wrong. Please try again.");
    } finally {
      $ = !1, p.disabled = !1;
    }
  }
  function H(e, a) {
    const n = document.createElement("div");
    return n.className = `sg-ai-msg sg-ai-msg--${e}`, n.textContent = a, r.appendChild(n), _(), n;
  }
  function _() {
    requestAnimationFrame(() => {
      r.scrollTop = r.scrollHeight;
    });
  }
  t.addEventListener("keydown", (e) => {
    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Z());
  }), p.addEventListener("click", Z), t.focus();
}
export {
  pe as openAiChatModal
};
//# sourceMappingURL=ai-chat-modal-Bz_mPcJn.js.map
