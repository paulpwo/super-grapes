import "openai";
import { c as le, i as ce, T as de, e as re } from "./index-CbghMJr5.js";
import { e as oe, c as G } from "./html-parser-CmlRfacY.js";
function he(f, z, D = "replace") {
  var ee;
  const K = typeof D == "string" ? { mode: D } : D, C = K.mode || "replace", s = K.targetComponent || null, Q = le(z), J = ce(z), B = C === "append" ? "append" : C === "edit" ? "edit" : "replace";
  let d = null, R = !1;
  const m = document.createElement("div");
  m.className = "sg-modal-backdrop sg-modal--ai";
  const x = document.createElement("div");
  x.className = "sg-modal";
  const k = document.createElement("div");
  k.className = "sg-modal-header", k.innerHTML = `
    <span class="sg-modal-title">
      <i class="fa-solid fa-wand-magic-sparkles sg-ai-title-icon"></i>
      AI Page Builder
    </span>`;
  const L = document.createElement("button");
  L.className = "sg-modal-close", L.innerHTML = '<i class="fa-solid fa-xmark"></i>', k.appendChild(L), x.appendChild(k);
  const N = document.createElement("div");
  N.className = "sg-modal-body";
  const r = document.createElement("div");
  r.className = "sg-ai-messages";
  const u = document.createElement("div");
  u.className = "sg-ai-empty";
  const q = C === "append", g = C === "edit", X = ((ee = s == null ? void 0 : s.getName) == null ? void 0 : ee.call(s)) || "component";
  let _ = "What do you want to build?", F = "Describe a page, section, or layout and AI will generate it for you.", U = `
    <button class="sg-ai-example" data-prompt="A modern SaaS landing page with hero, features, and pricing">Landing page</button>
    <button class="sg-ai-example" data-prompt="A professional contact page with form, map, and company info">Contact page</button>
    <button class="sg-ai-example" data-prompt="A portfolio gallery with filterable project cards and about section">Portfolio</button>`;
  q ? (_ = "Add a new section", F = "Describe a section to add to your page. It will be appended below existing content.", U = `
      <button class="sg-ai-example" data-prompt="A testimonials section with 3 customer quotes and star ratings">Testimonials</button>
      <button class="sg-ai-example" data-prompt="A pricing table with 3 tiers: Basic, Pro, and Enterprise">Pricing</button>
      <button class="sg-ai-example" data-prompt="A contact section with form, phone, email, and address">Contact</button>`) : g && (_ = `Edit "${X}" with AI`, F = "Describe the changes you want. The AI will modify only this component.", U = `
      <button class="sg-ai-example" data-prompt="Make it more visually appealing with better colors and spacing">Improve design</button>
      <button class="sg-ai-example" data-prompt="Rewrite the text to be more professional and compelling">Better copy</button>
      <button class="sg-ai-example" data-prompt="Reorganize the layout to be more modern and clean">New layout</button>`), u.innerHTML = `
    <div class="sg-ai-empty-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
    <div class="sg-ai-empty-title">${_}</div>
    <div class="sg-ai-empty-hint">${F}</div>
    <div class="sg-ai-empty-examples">${U}</div>`, r.appendChild(u);
  const i = document.createElement("input");
  i.type = "file", i.accept = "image/*", i.style.display = "none";
  const o = document.createElement("div");
  o.className = "sg-ai-img-preview-bar", o.style.display = "none";
  const y = document.createElement("div");
  y.className = "sg-ai-input-area";
  const v = document.createElement("div");
  v.className = "sg-ai-input-row";
  const b = document.createElement("button");
  b.className = "sg-ai-input-icon-btn", b.title = "Attach reference image", b.innerHTML = '<i class="fa-solid fa-image"></i>';
  const t = document.createElement("textarea");
  t.placeholder = g ? `Describe changes for "${X}"...` : "Describe what you want to build...", t.rows = 1;
  const p = document.createElement("button");
  p.className = "sg-ai-send-btn", p.title = "Send (Enter)", p.innerHTML = '<i class="fa-solid fa-arrow-up"></i>', v.appendChild(b), v.appendChild(t), v.appendChild(p);
  const T = document.createElement("div");
  T.className = "sg-ai-input-footer";
  const A = document.createElement("label");
  A.className = "sg-ai-context-toggle";
  const W = document.createElement("input");
  W.type = "checkbox", A.appendChild(W), A.appendChild(document.createTextNode(" Include current canvas as context"));
  const j = document.createElement("span");
  j.className = "sg-ai-shortcut-hint", j.textContent = "Enter to send, Shift+Enter for new line", g || T.appendChild(A), T.appendChild(j), y.appendChild(o), y.appendChild(v), y.appendChild(T), N.appendChild(r), N.appendChild(y), x.appendChild(N), m.appendChild(x), document.body.appendChild(m), document.body.appendChild(i), t.addEventListener("input", () => {
    t.style.height = "auto", t.style.height = Math.min(t.scrollHeight, 120) + "px";
  });
  const H = () => {
    m.remove(), i.remove();
  };
  L.addEventListener("click", H), m.addEventListener("click", (e) => {
    e.target === m && H();
  }), document.addEventListener("keydown", function e(a) {
    a.key === "Escape" && (H(), document.removeEventListener("keydown", e));
  }), u.querySelectorAll(".sg-ai-example").forEach((e) => {
    e.addEventListener("click", () => {
      t.value = e.dataset.prompt || "", t.dispatchEvent(new Event("input")), t.focus();
    });
  }), b.addEventListener("click", () => i.click()), i.addEventListener("change", () => {
    var n;
    const e = (n = i.files) == null ? void 0 : n[0];
    if (!e) return;
    const a = new FileReader();
    a.onload = () => {
      d = a.result, V();
    }, a.readAsDataURL(e), i.value = "";
  });
  function V() {
    if (!d) {
      o.style.display = "none", o.innerHTML = "";
      return;
    }
    o.style.display = "flex", o.innerHTML = `
      <div class="sg-ai-img-preview">
        <img src="${d}" />
        <button class="sg-ai-img-preview-remove"><i class="fa-solid fa-xmark"></i></button>
      </div>`, o.querySelector(".sg-ai-img-preview-remove").addEventListener("click", () => {
      d = null, V();
    });
  }
  async function Z() {
    const e = t.value.trim();
    if (!e && !d || R) return;
    u.parentNode && u.remove();
    let a = null, n = null;
    g && s ? a = s.toHTML() : W.checked && (a = f.getHtml(), n = f.getCss() || null);
    const te = d, ae = {
      intent: e,
      context: { mode: B, currentHtml: a, currentCss: n },
      image: te
    };
    M("user", e + (te ? " [image attached]" : "")), t.value = "", t.style.height = "auto", d = null, V(), R = !0, p.disabled = !0;
    const E = document.createElement("div");
    E.className = "sg-ai-thinking", E.innerHTML = `
      <div class="sg-ai-thinking-dots"><span></span><span></span><span></span></div>
      Generating your page...`, r.appendChild(E), O();
    try {
      let l = await Q.generate(ae), c = oe(l), w = G(c, B);
      if (!w.ok && !J && (l = await Q.generate({
        ...ae,
        intent: `${e}

[SYSTEM NOTE] Your previous output was incomplete or truncated (${w.message}). Produce the COMPLETE result with every tag closed.`
      }), c = oe(l), w = G(c, B)), E.remove(), w.ok || J && G(c, "append").ok) {
        const ne = M("assistant", "Here's a preview of the generated page:"), h = f.__sgTailwind, se = (h == null ? void 0 : h.enabled) !== !1 ? `<style type="text/tailwindcss">${de}</style><script src="${(h == null ? void 0 : h.scriptUrl) || re}"><\/script>` : "", Y = document.createElement("div");
        Y.className = "sg-ai-preview-wrap";
        const I = document.createElement("iframe");
        se ? I.sandbox.add("allow-scripts") : I.sandbox.add("allow-same-origin"), I.srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">${se}<style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;}html{overflow:hidden;}</style></head><body>${c}</body></html>`, Y.appendChild(I), ne.appendChild(Y);
        const S = document.createElement("div");
        S.className = "sg-ai-preview-actions";
        const $ = document.createElement("button");
        $.className = "sg-ai-apply-btn", $.innerHTML = g ? '<i class="fa-solid fa-pen"></i> Apply Changes' : q ? '<i class="fa-solid fa-plus"></i> Add to Page' : '<i class="fa-solid fa-check"></i> Apply to Canvas', $.addEventListener("click", () => {
          if (g && s)
            s.components(c);
          else if (q) {
            const ie = f.getWrapper();
            ie && ie.append(c);
          } else
            f.setComponents(c);
          H();
        });
        const P = document.createElement("button");
        P.className = "sg-ai-retry-btn", P.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Regenerate', P.addEventListener("click", () => t.focus()), S.appendChild($), S.appendChild(P), ne.appendChild(S);
      } else
        M("assistant", w.message || l);
    } catch (l) {
      E.remove(), M("error", (l == null ? void 0 : l.message) || "Something went wrong. Please try again.");
    } finally {
      R = !1, p.disabled = !1;
    }
  }
  function M(e, a) {
    const n = document.createElement("div");
    return n.className = `sg-ai-msg sg-ai-msg--${e}`, n.textContent = a, r.appendChild(n), O(), n;
  }
  function O() {
    requestAnimationFrame(() => {
      r.scrollTop = r.scrollHeight;
    });
  }
  t.addEventListener("keydown", (e) => {
    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Z());
  }), p.addEventListener("click", Z), t.focus();
}
export {
  he as openAiChatModal
};
//# sourceMappingURL=ai-chat-modal-CanDnMEQ.js.map
