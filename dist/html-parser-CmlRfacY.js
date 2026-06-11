function u(r) {
  const e = r.match(/```(?:html)?\s*\n?([\s\S]*?)```/);
  return e ? e[1].trim() : r.trim();
}
function c(r) {
  try {
    const t = new DOMParser().parseFromString(r, "text/html"), n = t.querySelector("parsererror"), s = t.body.children.length > 0;
    return !n && s;
  } catch {
    return !1;
  }
}
const o = 4;
function i(r) {
  const e = r.trimEnd();
  if (!e) return !0;
  const t = e.lastIndexOf("<"), n = e.lastIndexOf(">");
  if (t > n) return !0;
  const s = (e.match(/<section\b/gi) || []).length, a = (e.match(/<\/section\s*>/gi) || []).length;
  return s > 0 && a < s;
}
function l(r) {
  try {
    const e = new DOMParser().parseFromString(r, "text/html");
    return Array.from(e.body.children).filter(
      (t) => t.getAttribute("data-gjs-type") === "sg-section" || t.tagName.toLowerCase() === "section"
    ).length;
  } catch {
    return 0;
  }
}
function f(r, e) {
  const t = (r || "").trim();
  return t ? c(t) ? i(t) ? {
    ok: !1,
    reason: "truncated",
    message: "The AI output appears truncated — it was cut off before the page was complete."
  } : (e === "generate" || e === "replace") && l(t) < o ? {
    ok: !1,
    reason: "too-few-sections",
    message: `A full page should contain at least ${o} sections, but fewer were generated.`
  } : { ok: !0 } : {
    ok: !1,
    reason: "unparseable",
    message: "The AI response did not contain valid HTML."
  } : { ok: !1, reason: "empty", message: "The AI returned an empty response." };
}
export {
  f as c,
  u as e,
  c as v
};
//# sourceMappingURL=html-parser-CmlRfacY.js.map
