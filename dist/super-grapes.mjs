import He from "grapesjs";
const Ve = [
  {
    name: "Desktop",
    width: "",
    widthMedia: ""
  },
  {
    name: "Tablet",
    width: "768px",
    widthMedia: "992px"
  },
  {
    name: "Mobile",
    width: "375px",
    widthMedia: "480px"
  }
];
function te(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var F = { exports: {} };
/*! grapesjs-preset-webpage - 1.0.3 */
var Ae = F.exports, ie;
function Ie() {
  return ie || (ie = 1, (function(t, e) {
    (function(o, n) {
      t.exports = n();
    })(typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : Ae, (() => (() => {
      var o = { d: (p, f) => {
        for (var v in f) o.o(f, v) && !o.o(p, v) && Object.defineProperty(p, v, { enumerable: !0, get: f[v] });
      }, o: (p, f) => Object.prototype.hasOwnProperty.call(p, f), r: (p) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(p, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(p, "__esModule", { value: !0 });
      } }, n = {};
      o.r(n), o.d(n, { default: () => d });
      var a = function() {
        return a = Object.assign || function(p) {
          for (var f, v = 1, y = arguments.length; v < y; v++) for (var h in f = arguments[v]) Object.prototype.hasOwnProperty.call(f, h) && (p[h] = f[h]);
          return p;
        }, a.apply(this, arguments);
      }, i = "gjs-open-import-webpage", s = "set-device-desktop", l = "set-device-tablet", r = "set-device-mobile", m = "canvas-clear", g = function() {
        return g = Object.assign || function(p) {
          for (var f, v = 1, y = arguments.length; v < y; v++) for (var h in f = arguments[v]) Object.prototype.hasOwnProperty.call(f, h) && (p[h] = f[h]);
          return p;
        }, g.apply(this, arguments);
      };
      const u = function(p, f) {
        var v = p.Commands, y = f.textCleanCanvas;
        (function(h, k) {
          var L = h.getConfig("stylePrefix"), b = k.modalImportLabel, x = k.modalImportContent;
          h.Commands.add(i, { codeViewer: null, container: null, run: function(S) {
            var E = typeof x == "function" ? x(S) : x, V = this.getCodeViewer();
            S.Modal.open({ title: k.modalImportTitle, content: this.getContainer() }).onceClose((function() {
              return S.stopCommand(i);
            })), V.setContent(E ?? ""), V.refresh(), setTimeout((function() {
              return V.focus();
            }), 0);
          }, stop: function() {
            h.Modal.close();
          }, getContainer: function() {
            if (!this.container) {
              var S = this.getCodeViewer(), E = document.createElement("div");
              if (E.className = "".concat(L, "import-container"), b) {
                var V = document.createElement("div");
                V.className = "".concat(L, "import-label"), V.innerHTML = b, E.appendChild(V);
              }
              E.appendChild(S.getElement());
              var T = document.createElement("button");
              T.type = "button", T.innerHTML = k.modalImportButton, T.className = "".concat(L, "btn-prim ").concat(L, "btn-import"), T.onclick = function() {
                h.Css.clear(), h.setComponents(S.getContent().trim()), h.Modal.close();
              }, E.appendChild(T), this.container = E;
            }
            return this.container;
          }, getCodeViewer: function() {
            return this.codeViewer || (this.codeViewer = h.CodeManager.createViewer(g({ codeName: "htmlmixed", theme: "hopscotch", readOnly: !1 }, k.importViewerOptions))), this.codeViewer;
          } });
        })(p, f), v.add(s, { run: function(h) {
          return h.setDevice("Desktop");
        }, stop: function() {
        } }), v.add(l, { run: function(h) {
          return h.setDevice("Tablet");
        }, stop: function() {
        } }), v.add(r, { run: function(h) {
          return h.setDevice("Mobile portrait");
        }, stop: function() {
        } }), v.add(m, (function(h) {
          return confirm(y) && h.runCommand("core:canvas-clear");
        }));
      };
      var c = function() {
        return c = Object.assign || function(p) {
          for (var f, v = 1, y = arguments.length; v < y; v++) for (var h in f = arguments[v]) Object.prototype.hasOwnProperty.call(f, h) && (p[h] = f[h]);
          return p;
        }, c.apply(this, arguments);
      };
      const d = function(p, f) {
        f === void 0 && (f = {});
        var v = c({ blocks: ["link-block", "quote", "text-basic"], block: function() {
          return {};
        }, modalImportTitle: "Import", modalImportButton: "Import", modalImportLabel: "", modalImportContent: "", importViewerOptions: {}, textCleanCanvas: "Are you sure you want to clear the canvas?", showStylesOnChange: !0, useCustomTheme: !0 }, f);
        if (v.useCustomTheme && typeof window < "u") {
          var y = "gjs-", h = "";
          [["one", "#463a3c"], ["two", "#b9a5a6"], ["three", "#804f7b"], ["four", "#d97aa6"]].forEach((function(L) {
            var b = L[0], x = L[1];
            h += `
        .`.concat(y).concat(b, `-bg {
          background-color: `).concat(x, `;
        }

        .`).concat(y).concat(b, `-color {
          color: `).concat(x, `;
        }

        .`).concat(y).concat(b, `-color-h:hover {
          color: `).concat(x, `;
        }
      `);
          }));
          var k = document.createElement("style");
          k.innerText = h, document.head.appendChild(k);
        }
        (function(L, b) {
          var x = function(S, E) {
            b.blocks.indexOf(S) >= 0 && L.Blocks.add(S, a(a({ select: !0, category: "Basic" }, E), b.block(S)));
          };
          x("link-block", { label: "Link Block", media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
    </svg>`, content: { type: "link", editable: !1, droppable: !0, style: { display: "inline-block", padding: "5px", "min-height": "50px", "min-width": "50px" } } }), x("quote", { label: "Quote", media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`, content: `<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>` }), x("text-basic", { label: "Text section", media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" />
    </svg>`, content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>` });
        })(p, v), u(p, v), (function(L, b) {
          var x = L.Panels, S = L.getConfig(), E = "sw-visibility", V = "export-template", T = "open-sm", N = "open-tm", C = "open-layers", M = "open-blocks", A = "fullscreen", w = "preview", H = 'style="display: block; max-width:22px"';
          S.showDevices = !1, x.getPanels().reset([{ id: "commands", buttons: [{}] }, { id: "devices-c", buttons: [{ id: s, command: s, active: !0, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
        </svg>`) }, { id: l, command: l, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
        </svg>`) }, { id: r, command: r, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
        </svg>`) }] }, { id: "options", buttons: [{ id: E, command: E, context: E, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
        <path fill="currentColor" d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z" />
    </svg>`) }, { id: w, context: w, command: function() {
            return L.runCommand(w);
          }, label: "<svg ".concat(H, ' viewBox="0 0 24 24"><path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>') }, { id: A, command: A, context: A, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
        </svg>`) }, { id: V, command: function() {
            return L.runCommand(V);
          }, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
        </svg>`) }, { id: "undo", command: function() {
            return L.runCommand("core:undo");
          }, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
        </svg>`) }, { id: "redo", command: function() {
            return L.runCommand("core:redo");
          }, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
        </svg>`) }, { id: i, command: function() {
            return L.runCommand(i);
          }, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
        </svg>`) }, { id: m, command: function() {
            return L.runCommand(m);
          }, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>`) }] }, { id: "views", buttons: [{ id: T, command: T, active: !0, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
        </svg>`) }, { id: N, command: N, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </svg>`) }, { id: C, command: C, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
      </svg>`) }, { id: M, command: M, label: "<svg ".concat(H, ` viewBox="0 0 24 24">
          <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
      </svg>`) }] }]);
          var O = x.getButton("views", M);
          L.on("load", (function() {
            return O == null ? void 0 : O.set("active", !0);
          })), b.showStylesOnChange && L.on("component:selected", (function() {
            var P = x.getButton("views", T), D = x.getButton("views", C);
            D && D.get("active") || !L.getSelected() || P == null || P.set("active", !0);
          }));
        })(p, v);
      };
      return n;
    })()));
  })(F)), F.exports;
}
var Be = Ie();
const le = /* @__PURE__ */ te(Be);
var W = { exports: {} };
/*! grapesjs-component-countdown - 1.0.2 */
var Pe = W.exports, re;
function De() {
  return re || (re = 1, (function(t, e) {
    (function(o, n) {
      t.exports = n();
    })(typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : Pe, (() => (() => {
      var o = { d: (s, l) => {
        for (var r in l) o.o(l, r) && !o.o(s, r) && Object.defineProperty(s, r, { enumerable: !0, get: l[r] });
      }, o: (s, l) => Object.prototype.hasOwnProperty.call(s, l), r: (s) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s, "__esModule", { value: !0 });
      } }, n = {};
      o.r(n), o.d(n, { default: () => i });
      var a = function() {
        return a = Object.assign || function(s) {
          for (var l, r = 1, m = arguments.length; r < m; r++) for (var g in l = arguments[r]) Object.prototype.hasOwnProperty.call(l, g) && (s[g] = l[g]);
          return s;
        }, a.apply(this, arguments);
      };
      const i = function(s, l) {
        l === void 0 && (l = {});
        var r = a({ id: "countdown", label: "Countdown", block: {}, props: {}, style: "", styleAdditional: "", startTime: "", endText: "EXPIRED", dateInputType: "date", labelDays: "days", labelHours: "hours", labelMinutes: "minutes", labelSeconds: "seconds", classPrefix: "countdown" }, l), m = r.block, g = r.props, u = r.style, c = r.id, d = r.label, p = r.classPrefix;
        m && s.Blocks.add(c, a({ media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z" />
      </svg>`, label: d, category: "Extra", select: !0, content: { type: c } }, m)), s.Components.addType(c, { model: { defaults: a({ startfrom: r.startTime, classes: [p], endText: r.endText, droppable: !1, script: function(f) {
          var v = f.startfrom, y = f.endText, h = this, k = new Date(v).getTime(), L = h.querySelector("[data-js=countdown]"), b = h.querySelector("[data-js=countdown-endtext]"), x = h.querySelector("[data-js=countdown-day]"), S = h.querySelector("[data-js=countdown-hour]"), E = h.querySelector("[data-js=countdown-minute]"), V = h.querySelector("[data-js=countdown-second]"), T = h.__gjsCountdownInterval;
          T && clearInterval(T);
          var N = window.__gjsCountdownIntervals || [], C = [];
          N.forEach((function(w) {
            w.isConnected || (clearInterval(w.__gjsCountdownInterval), C.push(w));
          })), N.indexOf(h) < 0 && N.push(h), window.__gjsCountdownIntervals = N.filter((function(w) {
            return C.indexOf(w) < 0;
          }));
          var M = function(w, H, O, P) {
            x.innerHTML = "".concat(w < 10 ? "0" + w : w), S.innerHTML = "".concat(H < 10 ? "0" + H : H), E.innerHTML = "".concat(O < 10 ? "0" + O : O), V.innerHTML = "".concat(P < 10 ? "0" + P : P);
          }, A = function() {
            var w = (/* @__PURE__ */ new Date()).getTime(), H = k - w, O = Math.floor(H / 864e5), P = Math.floor(H % 864e5 / 36e5), D = Math.floor(H % 36e5 / 6e4), I = Math.floor(H % 6e4 / 1e3);
            M(O, P, D, I), H < 0 && (clearInterval(h.__gjsCountdownInterval), b.innerHTML = y, L.style.display = "none", b.style.display = "");
          };
          k ? (h.__gjsCountdownInterval = setInterval(A, 1e3), b.style.display = "none", L.style.display = "", A()) : M(0, 0, 0, 0);
        }, "script-props": ["startfrom", "endText"], traits: [{ label: "Start", name: "startfrom", changeProp: !0, type: r.dateInputType }, { label: "End text", name: "endText", changeProp: !0 }], components: `
          <span data-js="countdown" class="`.concat(p, `-cont">
            <div class="`).concat(p, `-block">
              <div data-js="countdown-day" class="`).concat(p, `-digit"></div>
              <div class="`).concat(p, '-label">').concat(r.labelDays, `</div>
            </div>
            <div class="`).concat(p, `-block">
              <div data-js="countdown-hour" class="`).concat(p, `-digit"></div>
              <div class="`).concat(p, '-label">').concat(r.labelHours, `</div>
            </div>
            <div class="`).concat(p, `-block">
              <div data-js="countdown-minute" class="`).concat(p, `-digit"></div>
              <div class="`).concat(p, '-label">').concat(r.labelMinutes, `</div>
            </div>
            <div class="`).concat(p, `-block">
              <div data-js="countdown-second" class="`).concat(p, `-digit"></div>
              <div class="`).concat(p, '-label">').concat(r.labelSeconds, `</div>
            </div>
          </span>
          <span data-js="countdown-endtext" class="`).concat(p, `-endtext"></span>
        `), styles: (u || `
          .`.concat(p, ` {
            text-align: center;
          }

          .`).concat(p, `-block {
            display: inline-block;
            margin: 0 10px;
            padding: 10px;
          }

          .`).concat(p, `-digit {
            font-size: 5rem;
          }

          .`).concat(p, `-endtext {
            font-size: 5rem;
          }

          .`).concat(p, `-cont {
            display: inline-block;
          }
        `)) + r.styleAdditional }, g) } });
      };
      return n;
    })()));
  })(W)), W.exports;
}
var Oe = De();
const ce = /* @__PURE__ */ te(Oe);
var U = { exports: {} };
/*! grapesjs-custom-code - 1.0.2 */
var je = U.exports, de;
function Re() {
  return de || (de = 1, (function(t, e) {
    (function(o, n) {
      t.exports = n();
    })(typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : je, (() => (() => {
      var o = { d: (c, d) => {
        for (var p in d) o.o(d, p) && !o.o(c, p) && Object.defineProperty(c, p, { enumerable: !0, get: d[p] });
      }, o: (c, d) => Object.prototype.hasOwnProperty.call(c, d), r: (c) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(c, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(c, "__esModule", { value: !0 });
      } }, n = {};
      o.r(n), o.d(n, { default: () => u });
      var a = "custom-code-plugin__code", i = "custom-code", s = "custom-code:open-modal", l = function() {
        return l = Object.assign || function(c) {
          for (var d, p = 1, f = arguments.length; p < f; p++) for (var v in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, v) && (c[v] = d[v]);
          return c;
        }, l.apply(this, arguments);
      }, r = function() {
        return r = Object.assign || function(c) {
          for (var d, p = 1, f = arguments.length; p < f; p++) for (var v in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, v) && (c[v] = d[v]);
          return c;
        }, r.apply(this, arguments);
      }, m = function() {
        return m = Object.assign || function(c) {
          for (var d, p = 1, f = arguments.length; p < f; p++) for (var v in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, v) && (c[v] = d[v]);
          return c;
        }, m.apply(this, arguments);
      }, g = function() {
        return g = Object.assign || function(c) {
          for (var d, p = 1, f = arguments.length; p < f; p++) for (var v in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, v) && (c[v] = d[v]);
          return c;
        }, g.apply(this, arguments);
      };
      const u = function(c, d) {
        d === void 0 && (d = {});
        var p = g({ blockCustomCode: {}, propsCustomCode: {}, toolbarBtnCustomCode: {}, placeholderScript: `<div style="pointer-events: none; padding: 10px;">
      <svg viewBox="0 0 24 24" style="height: 30px; vertical-align: middle;">
        <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z"></path>
        </svg>
      Custom code with <i>&lt;script&gt;</i> can't be rendered on the canvas
    </div>`, modalTitle: "Insert your code", codeViewOptions: {}, buttonLabel: "Save", commandCustomCode: {} }, d);
        (function(f, v) {
          v === void 0 && (v = {});
          var y, h = f.Components, k = v.toolbarBtnCustomCode;
          h.addType("script", { view: { onRender: function() {
            var L = this.model, b = this.el;
            L.closestType(i) && (b.innerHTML = "");
          } } }), h.addType(i, { model: { defaults: m({ name: "Custom Code", editable: !0, components: { tagName: "span", components: { type: "textnode", content: "Insert here your custom code" } } }, v.propsCustomCode), init: function() {
            this.on("change:".concat(a), this.onCustomCodeChange);
            var L = this.get(a);
            !this.components().length && this.components(L);
            var b = this.get("toolbar"), x = "custom-code";
            k && !b.filter((function(S) {
              return S.id === x;
            })).length && b.unshift(m({ id: x, command: s, label: `<svg viewBox="0 0 24 24">
              <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
            </svg>` }, k));
          }, onCustomCodeChange: function() {
            this.components(this.get(a));
          } }, view: { events: { dblclick: "onActive" }, init: function() {
            this.listenTo(this.model.components(), "add remove reset", this.onComponentsChange), this.onComponentsChange();
          }, onComponentsChange: function() {
            var L = this;
            y && clearInterval(y), y = setTimeout((function() {
              var b = L, x = b.model, S = b.el, E = !0;
              (x.get(a) || "").indexOf("<script") >= 0 && v.placeholderScript && (S.innerHTML = v.placeholderScript, E = !1), x.set({ droppable: E });
            }), 0);
          }, onActive: function() {
            var L = this.model;
            this.em.get("Commands").run(s, { target: L });
          } } });
        })(c, p), (function(f, v) {
          var y = (v === void 0 ? {} : v).blockCustomCode, h = f.Blocks;
          y && h.add(i, l({ label: "Custom Code", media: `
      <svg viewBox="0 0 24 24">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
      </svg>
    `, category: "Extra", activate: !0, select: !0, content: { type: i } }, y));
        })(c, p), (function(f, v) {
          v === void 0 && (v = {});
          var y = v.modalTitle, h = v.codeViewOptions, k = v.commandCustomCode, L = function(b, x) {
            x instanceof HTMLElement ? b.appendChild(x) : x && b.insertAdjacentHTML("beforeend", x);
          };
          f.Commands.add(s, r({ keyCustomCode: a, target: null, codeViewer: null, run: function(b, x, S) {
            S === void 0 && (S = {});
            var E = S.target || b.getSelected();
            this.target = E, E != null && E.get("editable") && this.showCustomCode(E, S);
          }, stop: function(b) {
            b.Modal.close();
          }, showCustomCode: function(b, x) {
            var S = x.title || y, E = b.get(a) || "", V = this.getContent();
            f.Modal.open({ title: S, content: V }).onceClose((function() {
              return f.stopCommand(s);
            })), this.getCodeViewer().setContent(E);
          }, getPreContent: function() {
          }, getPostContent: function() {
          }, getContent: function() {
            var b = this.getCodeViewer(), x = document.createElement("div"), S = f.getConfig("stylePrefix");
            return x.className = "".concat(S, "custom-code"), L(x, this.getPreContent()), x.appendChild(b.getElement()), L(x, this.getPostContent()), L(x, this.getContentActions()), b.refresh(), setTimeout((function() {
              return b.focus();
            }), 0), x;
          }, getContentActions: function() {
            var b = this, x = document.createElement("button");
            x.setAttribute("type", "button");
            var S = f.getConfig("stylePrefix");
            return x.innerHTML = v.buttonLabel, x.className = "".concat(S, "btn-prim ").concat(S, "btn-import__custom-code"), x.onclick = function() {
              return b.handleSave();
            }, x;
          }, handleSave: function() {
            var b = this.target, x = this.getCodeViewer().getContent();
            b == null || b.set(a, x), f.Modal.close();
          }, getCodeViewer: function() {
            return this.codeViewer || (this.codeViewer = f.CodeManager.createViewer(r({ codeName: "htmlmixed", theme: "hopscotch", readOnly: 0 }, h))), this.codeViewer;
          } }, k));
        })(c, p);
      };
      return n;
    })()));
  })(U)), U.exports;
}
var qe = Re();
const pe = /* @__PURE__ */ te(qe);
function ze(t) {
  const e = (t.devices ?? Ve).map((n) => ({
    name: n.name,
    width: n.width,
    ...n.widthMedia ? { widthMedia: n.widthMedia } : {}
  })), o = {
    container: t.container,
    height: "100%",
    width: "auto",
    fromElement: !1,
    // No default panels — we render our own UI
    panels: { defaults: [] },
    // Custom rendering for all managers
    blockManager: { custom: !0 },
    styleManager: {
      custom: !0,
      sectors: Fe()
    },
    traitManager: { custom: !0 },
    layerManager: { custom: !0 },
    // Devices
    deviceManager: { devices: e },
    // We handle storage separately via configureStorage()
    storageManager: !1,
    // Canvas styles — load Font Awesome 6 inside the iframe
    canvas: {
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      ]
    },
    // Plugins
    plugins: [le, ce, pe],
    pluginsOpts: {
      [le]: {
        blocksBasicOpts: { flexGrid: !0 },
        useCustomTheme: !1
      },
      [ce]: {},
      [pe]: {}
    }
  };
  return t.grapesOptions && Object.assign(o, t.grapesOptions), o;
}
function Fe() {
  return [
    {
      name: "General",
      open: !1,
      properties: [
        { property: "display", type: "select", defaults: "block", options: [
          { id: "block", label: "Block" },
          { id: "inline", label: "Inline" },
          { id: "inline-block", label: "Inline Block" },
          { id: "flex", label: "Flex" },
          { id: "grid", label: "Grid" },
          { id: "none", label: "None" }
        ] },
        { property: "float", type: "radio", defaults: "none", options: [
          { id: "none", label: "None" },
          { id: "left", label: "Left" },
          { id: "right", label: "Right" }
        ] },
        { property: "position", type: "select", defaults: "static", options: [
          { id: "static", label: "Static" },
          { id: "relative", label: "Relative" },
          { id: "absolute", label: "Absolute" },
          { id: "fixed", label: "Fixed" },
          { id: "sticky", label: "Sticky" }
        ] },
        { property: "top", type: "number", units: ["px", "%", "em", "rem", "vh"], min: -1e3, max: 1e3 },
        { property: "right", type: "number", units: ["px", "%", "em", "rem", "vw"], min: -1e3, max: 1e3 },
        { property: "bottom", type: "number", units: ["px", "%", "em", "rem", "vh"], min: -1e3, max: 1e3 },
        { property: "left", type: "number", units: ["px", "%", "em", "rem", "vw"], min: -1e3, max: 1e3 }
      ]
    },
    {
      name: "Dimension",
      open: !1,
      properties: [
        { property: "width", type: "number", units: ["px", "%", "em", "rem", "vw", "auto"], defaults: "auto", min: 0, max: 1200 },
        { property: "height", type: "number", units: ["px", "%", "em", "rem", "vh", "auto"], defaults: "auto", min: 0, max: 1200 },
        { property: "max-width", type: "number", units: ["px", "%", "em", "rem", "vw", "none"], min: 0, max: 1920 },
        { property: "max-height", type: "number", units: ["px", "%", "em", "rem", "vh", "none"], min: 0, max: 1920 },
        { property: "margin", type: "composite", properties: [
          { property: "margin-top", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" },
          { property: "margin-right", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" },
          { property: "margin-bottom", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" },
          { property: "margin-left", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" }
        ] },
        { property: "padding", type: "composite", properties: [
          { property: "padding-top", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" },
          { property: "padding-right", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" },
          { property: "padding-bottom", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" },
          { property: "padding-left", type: "number", units: ["px", "%", "em", "rem"], defaults: "0" }
        ] }
      ]
    },
    {
      name: "Typography",
      open: !1,
      properties: [
        { property: "font-family", type: "select", defaults: "Arial, sans-serif", options: [
          { id: "Arial, sans-serif", label: "Arial" },
          { id: "Helvetica, sans-serif", label: "Helvetica" },
          { id: "Georgia, serif", label: "Georgia" },
          { id: '"Times New Roman", serif', label: "Times New Roman" },
          { id: '"Courier New", monospace', label: "Courier New" },
          { id: "Verdana, sans-serif", label: "Verdana" },
          { id: '"Trebuchet MS", sans-serif', label: "Trebuchet MS" },
          { id: "system-ui, sans-serif", label: "System UI" }
        ] },
        { property: "font-size", type: "number", units: ["px", "em", "rem", "%", "vw"], defaults: "16px", min: 8, max: 120 },
        { property: "font-weight", type: "select", defaults: "400", options: [
          { id: "100", label: "Thin" },
          { id: "200", label: "Extra Light" },
          { id: "300", label: "Light" },
          { id: "400", label: "Normal" },
          { id: "500", label: "Medium" },
          { id: "600", label: "Semi Bold" },
          { id: "700", label: "Bold" },
          { id: "800", label: "Extra Bold" },
          { id: "900", label: "Black" }
        ] },
        { property: "letter-spacing", type: "number", units: ["px", "em", "rem"], min: -5, max: 50 },
        { property: "color", type: "color", defaults: "#000000" },
        { property: "line-height", type: "number", units: ["px", "em", "rem", ""], min: 0, max: 100 },
        { property: "text-align", type: "radio", defaults: "left", options: [
          { id: "left", label: "Left" },
          { id: "center", label: "Center" },
          { id: "right", label: "Right" },
          { id: "justify", label: "Justify" }
        ] },
        { property: "text-decoration", type: "select", defaults: "none", options: [
          { id: "none", label: "None" },
          { id: "underline", label: "Underline" },
          { id: "overline", label: "Overline" },
          { id: "line-through", label: "Line Through" }
        ] },
        { property: "text-shadow", type: "stack", properties: [
          { property: "text-shadow-h", type: "number", units: ["px"], defaults: "0" },
          { property: "text-shadow-v", type: "number", units: ["px"], defaults: "0" },
          { property: "text-shadow-blur", type: "number", units: ["px"], defaults: "0" },
          { property: "text-shadow-color", type: "color", defaults: "#000000" }
        ] },
        { property: "text-transform", type: "select", defaults: "none", options: [
          { id: "none", label: "None" },
          { id: "uppercase", label: "Uppercase" },
          { id: "lowercase", label: "Lowercase" },
          { id: "capitalize", label: "Capitalize" }
        ] }
      ]
    },
    {
      name: "Decorations",
      open: !1,
      properties: [
        { property: "background-color", type: "color", defaults: "transparent" },
        { property: "background-image", type: "file" },
        { property: "background-repeat", type: "select", defaults: "repeat", options: [
          { id: "repeat", label: "Repeat" },
          { id: "repeat-x", label: "Repeat X" },
          { id: "repeat-y", label: "Repeat Y" },
          { id: "no-repeat", label: "No Repeat" }
        ] },
        { property: "background-position", type: "select", defaults: "left top", options: [
          { id: "left top", label: "Left Top" },
          { id: "left center", label: "Left Center" },
          { id: "left bottom", label: "Left Bottom" },
          { id: "center top", label: "Center Top" },
          { id: "center center", label: "Center" },
          { id: "center bottom", label: "Center Bottom" },
          { id: "right top", label: "Right Top" },
          { id: "right center", label: "Right Center" },
          { id: "right bottom", label: "Right Bottom" }
        ] },
        { property: "background-size", type: "select", defaults: "auto", options: [
          { id: "auto", label: "Auto" },
          { id: "cover", label: "Cover" },
          { id: "contain", label: "Contain" },
          { id: "100% 100%", label: "Stretch" }
        ] },
        { property: "border-radius", type: "composite", properties: [
          { property: "border-top-left-radius", type: "number", units: ["px", "%", "em"], defaults: "0" },
          { property: "border-top-right-radius", type: "number", units: ["px", "%", "em"], defaults: "0" },
          { property: "border-bottom-right-radius", type: "number", units: ["px", "%", "em"], defaults: "0" },
          { property: "border-bottom-left-radius", type: "number", units: ["px", "%", "em"], defaults: "0" }
        ] },
        { property: "border", type: "composite", properties: [
          { property: "border-width", type: "number", units: ["px", "em"], defaults: "0" },
          { property: "border-style", type: "select", defaults: "none", options: [
            { id: "none", label: "None" },
            { id: "solid", label: "Solid" },
            { id: "dashed", label: "Dashed" },
            { id: "dotted", label: "Dotted" },
            { id: "double", label: "Double" },
            { id: "groove", label: "Groove" }
          ] },
          { property: "border-color", type: "color", defaults: "#000000" }
        ] },
        { property: "box-shadow", type: "stack", properties: [
          { property: "box-shadow-h", type: "number", units: ["px"], defaults: "0" },
          { property: "box-shadow-v", type: "number", units: ["px"], defaults: "0" },
          { property: "box-shadow-blur", type: "number", units: ["px"], defaults: "5" },
          { property: "box-shadow-spread", type: "number", units: ["px"], defaults: "0" },
          { property: "box-shadow-color", type: "color", defaults: "#000000" },
          { property: "box-shadow-type", type: "select", defaults: "", options: [
            { id: "", label: "Outside" },
            { id: "inset", label: "Inset" }
          ] }
        ] },
        { property: "opacity", type: "slider", defaults: 1, min: 0, max: 1, step: 0.01 }
      ]
    },
    {
      name: "Flex",
      open: !1,
      properties: [
        { property: "flex-direction", type: "select", defaults: "row", options: [
          { id: "row", label: "Row" },
          { id: "row-reverse", label: "Row Reverse" },
          { id: "column", label: "Column" },
          { id: "column-reverse", label: "Column Reverse" }
        ] },
        { property: "flex-wrap", type: "select", defaults: "nowrap", options: [
          { id: "nowrap", label: "No Wrap" },
          { id: "wrap", label: "Wrap" },
          { id: "wrap-reverse", label: "Wrap Reverse" }
        ] },
        { property: "justify-content", type: "select", defaults: "flex-start", options: [
          { id: "flex-start", label: "Start" },
          { id: "flex-end", label: "End" },
          { id: "center", label: "Center" },
          { id: "space-between", label: "Space Between" },
          { id: "space-around", label: "Space Around" },
          { id: "space-evenly", label: "Space Evenly" }
        ] },
        { property: "align-items", type: "select", defaults: "stretch", options: [
          { id: "flex-start", label: "Start" },
          { id: "flex-end", label: "End" },
          { id: "center", label: "Center" },
          { id: "stretch", label: "Stretch" },
          { id: "baseline", label: "Baseline" }
        ] },
        { property: "align-content", type: "select", defaults: "stretch", options: [
          { id: "flex-start", label: "Start" },
          { id: "flex-end", label: "End" },
          { id: "center", label: "Center" },
          { id: "stretch", label: "Stretch" },
          { id: "space-between", label: "Space Between" },
          { id: "space-around", label: "Space Around" }
        ] },
        { property: "order", type: "number", defaults: 0, min: -10, max: 10 },
        { property: "flex-basis", type: "number", units: ["px", "%", "em", "rem", "auto"], defaults: "auto", min: 0, max: 1e3 },
        { property: "flex-grow", type: "number", defaults: 0, min: 0, max: 10 },
        { property: "flex-shrink", type: "number", defaults: 1, min: 0, max: 10 },
        { property: "align-self", type: "select", defaults: "auto", options: [
          { id: "auto", label: "Auto" },
          { id: "flex-start", label: "Start" },
          { id: "flex-end", label: "End" },
          { id: "center", label: "Center" },
          { id: "stretch", label: "Stretch" },
          { id: "baseline", label: "Baseline" }
        ] }
      ]
    },
    {
      name: "Extra",
      open: !1,
      properties: [
        { property: "transition", type: "stack", properties: [
          { property: "transition-property", type: "select", defaults: "all", options: [
            { id: "all", label: "All" },
            { id: "opacity", label: "Opacity" },
            { id: "transform", label: "Transform" },
            { id: "background-color", label: "Background" },
            { id: "color", label: "Color" },
            { id: "width", label: "Width" },
            { id: "height", label: "Height" }
          ] },
          { property: "transition-duration", type: "number", units: ["s", "ms"], defaults: "0.3s" },
          { property: "transition-timing-function", type: "select", defaults: "ease", options: [
            { id: "ease", label: "Ease" },
            { id: "linear", label: "Linear" },
            { id: "ease-in", label: "Ease In" },
            { id: "ease-out", label: "Ease Out" },
            { id: "ease-in-out", label: "Ease In Out" }
          ] }
        ] },
        { property: "transform", type: "stack", properties: [
          { property: "transform-rotate", type: "number", units: ["deg"], defaults: "0" },
          { property: "transform-scale", type: "number", defaults: "1" },
          { property: "transform-translate-x", type: "number", units: ["px", "%"], defaults: "0" },
          { property: "transform-translate-y", type: "number", units: ["px", "%"], defaults: "0" }
        ] },
        { property: "cursor", type: "select", defaults: "auto", options: [
          { id: "auto", label: "Auto" },
          { id: "pointer", label: "Pointer" },
          { id: "default", label: "Default" },
          { id: "move", label: "Move" },
          { id: "text", label: "Text" },
          { id: "crosshair", label: "Crosshair" },
          { id: "not-allowed", label: "Not Allowed" },
          { id: "grab", label: "Grab" }
        ] },
        { property: "overflow", type: "select", defaults: "visible", options: [
          { id: "visible", label: "Visible" },
          { id: "hidden", label: "Hidden" },
          { id: "scroll", label: "Scroll" },
          { id: "auto", label: "Auto" }
        ] }
      ]
    }
  ];
}
const X = {
  /** Fired when the UI is fully initialized and ready */
  UI_READY: "sg:ui:ready",
  /** Fired when a component is selected on the canvas */
  COMPONENT_SELECTED: "sg:component:selected",
  /** Fired when a component is deselected */
  COMPONENT_DESELECTED: "sg:component:deselected"
}, ue = "super-grapes-project", We = {
  type: "local",
  autosave: !0,
  autoload: !0,
  stepsBeforeSave: 1,
  options: {}
};
function Ue(t, e = {}) {
  const o = { ...We, ...e };
  if (o.type !== "none" && o.type === "local") {
    if (o.autosave) {
      let n = 0;
      t.on("change:changesCount", () => {
        if (n++, n >= o.stepsBeforeSave) {
          n = 0;
          const a = t.store();
          try {
            localStorage.setItem(ue, JSON.stringify(a));
          } catch {
            console.warn("[SuperGrapes] Failed to save to localStorage");
          }
        }
      });
    }
    o.autoload && t.on("load", () => {
      try {
        const n = localStorage.getItem(ue);
        if (n) {
          const a = JSON.parse(n);
          t.loadProjectData(a);
        }
      } catch {
        console.warn("[SuperGrapes] Failed to load from localStorage");
      }
    });
  }
}
function Ge(t, e, o) {
  e.forEach((n) => n(t, o));
}
function Ye(t) {
  t.Components.addType("sg-section", {
    model: {
      defaults: {
        tagName: "section",
        droppable: !0,
        attributes: { "data-sg-type": "section" },
        styles: `
          [data-sg-type="section"] {
            width: 100%;
            padding: 60px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
          }
        `,
        traits: [
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" },
          {
            type: "select",
            name: "tagName",
            label: "HTML Tag",
            changeProp: !0,
            options: [
              { id: "section", label: "Section" },
              { id: "header", label: "Header" },
              { id: "footer", label: "Footer" },
              { id: "main", label: "Main" }
            ]
          }
        ]
      }
    }
  });
}
function Xe(t) {
  t.Components.addType("sg-container", {
    model: {
      defaults: {
        tagName: "div",
        droppable: !0,
        attributes: { "data-sg-type": "container" },
        styles: `
          [data-sg-type="container"] {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            padding: 0 15px;
            box-sizing: border-box;
          }
        `,
        traits: [
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" }
        ]
      }
    }
  });
}
function Ze(t) {
  t.Components.addType("sg-column", {
    model: {
      defaults: {
        tagName: "div",
        droppable: !0,
        attributes: { "data-sg-type": "column" },
        styles: `
          [data-sg-type="column"] {
            flex: 1;
            padding: 10px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
        `,
        traits: [
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" }
        ]
      }
    }
  });
}
function Je(t) {
  t.Components.addType("sg-heading", {
    extend: "text",
    model: {
      defaults: {
        tagName: "h2",
        editable: !0,
        droppable: !1,
        attributes: { "data-sg-type": "heading" },
        content: "Your Heading Here",
        traits: [
          {
            type: "select",
            name: "tagName",
            label: "Tag",
            changeProp: !0,
            options: [
              { id: "h1", label: "H1" },
              { id: "h2", label: "H2" },
              { id: "h3", label: "H3" },
              { id: "h4", label: "H4" },
              { id: "h5", label: "H5" },
              { id: "h6", label: "H6" }
            ]
          },
          { type: "text", name: "link", label: "Link URL" },
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" },
          {
            type: "select",
            name: "align",
            label: "Alignment",
            options: [
              { id: "left", label: "Left" },
              { id: "center", label: "Center" },
              { id: "right", label: "Right" }
            ]
          }
        ]
      }
    }
  });
}
function Ke(t) {
  t.Components.addType("sg-text", {
    extend: "text",
    model: {
      defaults: {
        tagName: "p",
        editable: !0,
        droppable: !1,
        attributes: { "data-sg-type": "text" },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        traits: [
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" }
        ]
      }
    }
  });
}
function Qe(t) {
  t.Components.addType("sg-image", {
    model: {
      defaults: {
        tagName: "img",
        void: !0,
        droppable: !1,
        attributes: {
          "data-sg-type": "image",
          src: "https://placehold.co/600x400",
          alt: "Placeholder image"
        },
        styles: `
          [data-sg-type="image"] {
            width: 100%;
            height: auto;
            display: block;
          }
        `,
        traits: [
          { type: "text", name: "src", label: "Source URL", changeProp: !1 },
          { type: "text", name: "alt", label: "Alt Text" },
          { type: "text", name: "width", label: "Width" },
          { type: "text", name: "height", label: "Height" },
          { type: "text", name: "link", label: "Link URL" },
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" }
        ]
      }
    }
  });
}
function $e(t) {
  t.Components.addType("sg-button", {
    extend: "text",
    model: {
      defaults: {
        tagName: "a",
        editable: !0,
        droppable: !1,
        attributes: {
          "data-sg-type": "button",
          href: "#"
        },
        content: "Click Here",
        styles: `
          [data-sg-type="button"] {
            display: inline-block;
            padding: 12px 24px;
            background-color: #c0392b;
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            border: none;
            font-size: 16px;
          }
        `,
        traits: [
          { type: "text", name: "text", label: "Button Text", changeProp: !0 },
          { type: "text", name: "href", label: "URL" },
          {
            type: "select",
            name: "target",
            label: "Target",
            options: [
              { id: "_self", label: "Same Window" },
              { id: "_blank", label: "New Window" }
            ]
          },
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" }
        ]
      }
    }
  });
}
function _e(t) {
  t.Components.addType("sg-video", {
    extend: "video",
    model: {
      defaults: {
        attributes: { "data-sg-type": "video" },
        provider: "so",
        // HTML5 source
        styles: `
          [data-sg-type="video"] {
            width: 100%;
            max-width: 100%;
          }
        `,
        traits: [
          {
            type: "select",
            name: "provider",
            label: "Provider",
            changeProp: !0,
            options: [
              { id: "so", label: "HTML5 (Self-hosted)" },
              { id: "yt", label: "YouTube" },
              { id: "vi", label: "Vimeo" }
            ]
          },
          { type: "text", name: "src", label: "Video URL / ID", changeProp: !0 },
          { type: "text", name: "poster", label: "Poster Image URL", changeProp: !0 },
          { type: "checkbox", name: "autoplay", label: "Autoplay", changeProp: !0 },
          { type: "checkbox", name: "loop", label: "Loop", changeProp: !0 },
          { type: "checkbox", name: "controls", label: "Controls", changeProp: !0, valueTrue: "true", valueFalse: "false" },
          { type: "checkbox", name: "muted", label: "Muted", changeProp: !0 }
        ]
      }
    }
  });
}
function et(t) {
  t.Components.addType("sg-divider", {
    model: {
      defaults: {
        tagName: "hr",
        void: !0,
        droppable: !1,
        attributes: { "data-sg-type": "divider" },
        styles: `
          [data-sg-type="divider"] {
            border: none;
            border-top: 2px solid #3a3c3f;
            margin: 20px 0;
            width: 100%;
          }
        `,
        traits: [
          {
            type: "select",
            name: "data-style",
            label: "Style",
            options: [
              { id: "solid", label: "Solid" },
              { id: "dashed", label: "Dashed" },
              { id: "dotted", label: "Dotted" }
            ]
          },
          { type: "number", name: "data-weight", label: "Weight (px)", min: 1, max: 20 },
          { type: "text", name: "data-divider-width", label: "Width" },
          { type: "color", name: "data-color", label: "Color" }
        ]
      }
    }
  });
}
function tt(t) {
  t.Components.addType("sg-spacer", {
    model: {
      defaults: {
        tagName: "div",
        droppable: !1,
        content: "",
        attributes: { "data-sg-type": "spacer" },
        styles: `
          [data-sg-type="spacer"] {
            height: 50px;
            width: 100%;
          }
        `,
        traits: [
          {
            type: "number",
            name: "data-height",
            label: "Height (px)",
            min: 0,
            max: 500
          }
        ]
      }
    }
  });
}
function nt(t) {
  t.Components.addType("sg-icon", {
    model: {
      defaults: {
        tagName: "div",
        droppable: !1,
        attributes: { "data-sg-type": "icon" },
        content: '<i class="fa-solid fa-star"></i>',
        styles: `
          [data-sg-type="icon"] {
            font-size: 40px;
            color: #c0392b;
            text-align: center;
            display: inline-block;
          }
        `,
        traits: [
          { type: "text", name: "data-icon", label: "Icon Class (e.g. fa-solid fa-star)" },
          { type: "number", name: "data-size", label: "Size (px)" },
          { type: "color", name: "data-color", label: "Color" },
          { type: "text", name: "data-link", label: "Link URL" },
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" }
        ]
      }
    }
  });
}
function at(t) {
  t.Components.addType("sg-form", {
    model: {
      defaults: {
        tagName: "form",
        droppable: !0,
        attributes: { "data-sg-type": "form" },
        styles: `
          [data-sg-type="form"] {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
            max-width: 500px;
            box-sizing: border-box;
          }
        `,
        traits: [
          { type: "text", name: "action", label: "Action URL" },
          {
            type: "select",
            name: "method",
            label: "Method",
            options: [
              { id: "GET", label: "GET" },
              { id: "POST", label: "POST" }
            ]
          },
          { type: "text", name: "id", label: "ID" },
          { type: "text", name: "class", label: "CSS Classes" }
        ]
      }
    }
  });
}
function st(t) {
  t.Components.addType("sg-accordion", {
    model: {
      defaults: {
        tagName: "div",
        droppable: !1,
        attributes: { "data-sg-type": "accordion" },
        styles: `
          [data-sg-type="accordion"] {
            width: 100%;
          }
          .sg-accordion-item {
            border: 1px solid #3a3c3f;
            margin-bottom: -1px;
          }
          .sg-accordion-title {
            padding: 15px 20px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f5f5f5;
          }
          .sg-accordion-title::after {
            content: '\\f078';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            font-size: 12px;
            transition: transform 0.3s;
          }
          .sg-accordion-content {
            padding: 20px;
            display: none;
          }
          .sg-accordion-item.active .sg-accordion-content {
            display: block;
          }
          .sg-accordion-item.active .sg-accordion-title::after {
            transform: rotate(180deg);
          }
        `,
        components: [
          {
            tagName: "div",
            attributes: { class: "sg-accordion-item active" },
            components: [
              {
                tagName: "div",
                attributes: { class: "sg-accordion-title" },
                content: "Accordion Item 1",
                editable: !0
              },
              {
                tagName: "div",
                attributes: { class: "sg-accordion-content" },
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                editable: !0
              }
            ]
          },
          {
            tagName: "div",
            attributes: { class: "sg-accordion-item" },
            components: [
              {
                tagName: "div",
                attributes: { class: "sg-accordion-title" },
                content: "Accordion Item 2",
                editable: !0
              },
              {
                tagName: "div",
                attributes: { class: "sg-accordion-content" },
                content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                editable: !0
              }
            ]
          },
          {
            tagName: "div",
            attributes: { class: "sg-accordion-item" },
            components: [
              {
                tagName: "div",
                attributes: { class: "sg-accordion-title" },
                content: "Accordion Item 3",
                editable: !0
              },
              {
                tagName: "div",
                attributes: { class: "sg-accordion-content" },
                content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
                editable: !0
              }
            ]
          }
        ],
        // Script injected into the canvas iframe for interactivity
        "script-export": `
          const items = this.querySelectorAll('.sg-accordion-item');
          items.forEach(item => {
            const title = item.querySelector('.sg-accordion-title');
            if (title) {
              title.addEventListener('click', () => {
                item.classList.toggle('active');
              });
            }
          });
        `,
        traits: [
          { type: "number", name: "data-items", label: "Items Count", min: 1, max: 20 }
        ]
      }
    }
  });
}
function ot(t) {
  t.Components.addType("sg-tabs", {
    model: {
      defaults: {
        tagName: "div",
        droppable: !1,
        attributes: { "data-sg-type": "tabs" },
        styles: `
          [data-sg-type="tabs"] {
            width: 100%;
          }
          .sg-tabs-nav {
            display: flex;
            border-bottom: 2px solid #3a3c3f;
            margin-bottom: 0;
          }
          .sg-tab-btn {
            padding: 12px 24px;
            cursor: pointer;
            font-weight: 600;
            border: none;
            background: none;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            transition: border-color 0.2s, color 0.2s;
            font-size: 14px;
          }
          .sg-tab-btn.active {
            border-bottom-color: #c0392b;
            color: #c0392b;
          }
          .sg-tab-panel {
            padding: 20px;
            display: none;
          }
          .sg-tab-panel.active {
            display: block;
          }
        `,
        components: [
          {
            tagName: "div",
            attributes: { class: "sg-tabs-nav" },
            components: [
              {
                tagName: "button",
                attributes: { class: "sg-tab-btn active", "data-tab": "0" },
                content: "Tab 1",
                editable: !0
              },
              {
                tagName: "button",
                attributes: { class: "sg-tab-btn", "data-tab": "1" },
                content: "Tab 2",
                editable: !0
              },
              {
                tagName: "button",
                attributes: { class: "sg-tab-btn", "data-tab": "2" },
                content: "Tab 3",
                editable: !0
              }
            ]
          },
          {
            tagName: "div",
            attributes: { class: "sg-tab-panel active", "data-panel": "0" },
            content: "Content for Tab 1. Click to edit this text.",
            editable: !0
          },
          {
            tagName: "div",
            attributes: { class: "sg-tab-panel", "data-panel": "1" },
            content: "Content for Tab 2. Click to edit this text.",
            editable: !0
          },
          {
            tagName: "div",
            attributes: { class: "sg-tab-panel", "data-panel": "2" },
            content: "Content for Tab 3. Click to edit this text.",
            editable: !0
          }
        ],
        "script-export": `
          const btns = this.querySelectorAll('.sg-tab-btn');
          const panels = this.querySelectorAll('.sg-tab-panel');
          btns.forEach(btn => {
            btn.addEventListener('click', () => {
              const idx = btn.getAttribute('data-tab');
              btns.forEach(b => b.classList.remove('active'));
              panels.forEach(p => p.classList.remove('active'));
              btn.classList.add('active');
              const panel = this.querySelector('[data-panel="' + idx + '"]');
              if (panel) panel.classList.add('active');
            });
          });
        `,
        traits: [
          { type: "number", name: "data-tabs", label: "Tabs Count", min: 1, max: 10 }
        ]
      }
    }
  });
}
function it() {
  return [
    {
      id: "sg-section",
      label: "Section",
      category: "Layout",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/></svg>',
      content: {
        type: "sg-section",
        components: [
          { type: "sg-container" }
        ]
      }
    },
    {
      id: "sg-2-columns",
      label: "2 Columns",
      category: "Layout",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
      content: {
        type: "sg-section",
        components: [
          {
            type: "sg-container",
            components: [
              { type: "sg-column" },
              { type: "sg-column" }
            ]
          }
        ]
      }
    },
    {
      id: "sg-3-columns",
      label: "3 Columns",
      category: "Layout",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/></svg>',
      content: {
        type: "sg-section",
        components: [
          {
            type: "sg-container",
            components: [
              { type: "sg-column" },
              { type: "sg-column" },
              { type: "sg-column" }
            ]
          }
        ]
      }
    },
    {
      id: "sg-4-columns",
      label: "4 Columns",
      category: "Layout",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="7.5" y1="4" x2="7.5" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="16.5" y1="4" x2="16.5" y2="20"/></svg>',
      content: {
        type: "sg-section",
        components: [
          {
            type: "sg-container",
            components: [
              { type: "sg-column" },
              { type: "sg-column" },
              { type: "sg-column" },
              { type: "sg-column" }
            ]
          }
        ]
      }
    },
    {
      id: "sg-sidebar-left",
      label: "Sidebar Left",
      category: "Layout",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="8" y1="4" x2="8" y2="20"/></svg>',
      content: {
        type: "sg-section",
        components: [
          {
            type: "sg-container",
            components: [
              {
                type: "sg-column",
                style: { flex: "0 0 30%", "max-width": "30%" }
              },
              {
                type: "sg-column",
                style: { flex: "0 0 70%", "max-width": "70%" }
              }
            ]
          }
        ]
      }
    },
    {
      id: "sg-sidebar-right",
      label: "Sidebar Right",
      category: "Layout",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><line x1="16" y1="4" x2="16" y2="20"/></svg>',
      content: {
        type: "sg-section",
        components: [
          {
            type: "sg-container",
            components: [
              {
                type: "sg-column",
                style: { flex: "0 0 70%", "max-width": "70%" }
              },
              {
                type: "sg-column",
                style: { flex: "0 0 30%", "max-width": "30%" }
              }
            ]
          }
        ]
      }
    }
  ];
}
function lt() {
  return [
    {
      id: "sg-heading",
      label: "Heading",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
      content: { type: "sg-heading" }
    },
    {
      id: "sg-text",
      label: "Text",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="15" y2="18"/></svg>',
      content: { type: "sg-text" }
    },
    {
      id: "sg-image",
      label: "Image",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
      content: { type: "sg-image" }
    },
    {
      id: "sg-video",
      label: "Video",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="1"/><polygon points="10 9 16 12 10 15 10 9"/></svg>',
      content: { type: "sg-video" }
    },
    {
      id: "sg-button",
      label: "Button",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      content: { type: "sg-button" }
    },
    {
      id: "sg-divider",
      label: "Divider",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/></svg>',
      content: { type: "sg-divider" }
    },
    {
      id: "sg-spacer",
      label: "Spacer",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="8 8 12 4 16 8"/><polyline points="8 16 12 20 16 16"/></svg>',
      content: { type: "sg-spacer" }
    },
    {
      id: "sg-icon",
      label: "Icon",
      category: "Basic",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      content: { type: "sg-icon" }
    }
  ];
}
function rt() {
  return [
    {
      id: "sg-accordion",
      label: "Accordion",
      category: "Interactive",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="5" rx="1"/></svg>',
      content: { type: "sg-accordion" }
    },
    {
      id: "sg-tabs",
      label: "Tabs",
      category: "Interactive",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M2 7h6V3h8v4h6"/></svg>',
      content: { type: "sg-tabs" }
    },
    {
      id: "sg-icon-box",
      label: "Icon Box",
      category: "Interactive",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><polygon points="12 7 13.5 10 17 10.5 14.5 12.9 15.1 16.4 12 14.8 8.9 16.4 9.5 12.9 7 10.5 10.5 10 12 7"/></svg>',
      content: {
        type: "sg-column",
        style: {
          "align-items": "center",
          "text-align": "center",
          padding: "30px"
        },
        components: [
          { type: "sg-icon" },
          {
            type: "sg-heading",
            attributes: { "data-sg-type": "heading" },
            tagName: "h3",
            content: "Feature Title"
          },
          {
            type: "sg-text",
            attributes: { "data-sg-type": "text" },
            content: "Write a short description for this feature. It can span multiple lines and provide details."
          }
        ]
      }
    }
  ];
}
function ct() {
  return [
    {
      id: "sg-form",
      label: "Form",
      category: "Forms",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>',
      content: {
        type: "sg-form",
        components: [
          {
            tagName: "label",
            content: "Name",
            style: { "font-weight": "600", "font-size": "14px" }
          },
          {
            tagName: "input",
            void: !0,
            attributes: { type: "text", name: "name", placeholder: "Your name" },
            style: { padding: "10px", border: "1px solid #3a3c3f", "font-size": "14px", width: "100%", "box-sizing": "border-box" }
          },
          {
            tagName: "label",
            content: "Email",
            style: { "font-weight": "600", "font-size": "14px" }
          },
          {
            tagName: "input",
            void: !0,
            attributes: { type: "email", name: "email", placeholder: "Your email" },
            style: { padding: "10px", border: "1px solid #3a3c3f", "font-size": "14px", width: "100%", "box-sizing": "border-box" }
          },
          {
            tagName: "button",
            attributes: { type: "submit" },
            content: "Submit",
            style: {
              padding: "12px 24px",
              "background-color": "#c0392b",
              color: "#ffffff",
              border: "none",
              "font-weight": "600",
              "font-size": "16px",
              cursor: "pointer"
            }
          }
        ]
      }
    },
    {
      id: "sg-input",
      label: "Input",
      category: "Forms",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="1"/><line x1="7" y1="12" x2="7" y2="12.01"/></svg>',
      content: '<input type="text" placeholder="Enter text..." style="padding:10px;border:1px solid #3a3c3f;font-size:14px;width:100%;box-sizing:border-box;" />'
    },
    {
      id: "sg-textarea",
      label: "Textarea",
      category: "Forms",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>',
      content: '<textarea rows="4" placeholder="Enter message..." style="padding:10px;border:1px solid #3a3c3f;font-size:14px;width:100%;box-sizing:border-box;resize:vertical;font-family:inherit;"></textarea>'
    },
    {
      id: "sg-select",
      label: "Select",
      category: "Forms",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="1"/><polyline points="8 11 12 15 16 11"/></svg>',
      content: '<select style="padding:10px;border:1px solid #3a3c3f;font-size:14px;width:100%;box-sizing:border-box;"><option value="">Select an option</option><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></select>'
    },
    {
      id: "sg-checkbox",
      label: "Checkbox",
      category: "Forms",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><polyline points="9 12 11 14 15 10"/></svg>',
      content: '<label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;"><input type="checkbox" style="width:18px;height:18px;" /> Checkbox label</label>'
    },
    {
      id: "sg-radio",
      label: "Radio",
      category: "Forms",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>',
      content: '<label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;"><input type="radio" name="radio-group" style="width:18px;height:18px;" /> Radio label</label>'
    },
    {
      id: "sg-submit",
      label: "Submit Button",
      category: "Forms",
      media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"/><polyline points="10 12 12 14 14 10"/></svg>',
      content: '<button type="submit" style="padding:12px 24px;background-color:#c0392b;color:#ffffff;border:none;font-weight:600;font-size:16px;cursor:pointer;width:100%;">Submit</button>'
    }
  ];
}
function dt(t) {
  Ye(t), Xe(t), Ze(t), Je(t), Ke(t), Qe(t), $e(t), _e(t), et(t), tt(t), nt(t), at(t), st(t), ot(t);
  const e = [
    ...it(),
    ...lt(),
    ...rt(),
    ...ct()
  ], o = t.Blocks;
  e.forEach((n) => {
    o.add(n.id, n);
  });
}
function Tn(t) {
  var i;
  const e = ze(t), o = e.plugins || [];
  e.plugins = [dt, ...o];
  const n = He.init(e), a = (i = t.ai) != null && i.apiKey ? t.ai : {
    apiKey: "AIzaSyBzGa3yCqbFJo-ciwuLda50NYKUPOUquAM",
    model: "gemini-2.5-flash",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
  };
  return a && (n.__sgAiConfig = a), t.plugins && t.plugins.length > 0 && Ge(n, t.plugins, t), t.storage && Ue(n, t.storage), n.on("component:selected", (s) => {
    n.trigger(X.COMPONENT_SELECTED, s);
  }), n.on("component:deselected", (s) => {
    n.trigger(X.COMPONENT_DESELECTED, s);
  }), n.on("load", () => {
    n.trigger(X.UI_READY), t.onReady && t.onReady(n);
  }), n;
}
function pt(t) {
  t.innerHTML = "";
  const e = document.createElement("div");
  e.className = "sg-editor";
  const o = document.createElement("div");
  o.className = "sg-topbar";
  const n = document.createElement("div");
  n.className = "sg-main";
  const a = document.createElement("div");
  a.className = "sg-sidebar";
  const i = document.createElement("div");
  i.className = "sg-canvas-wrap";
  const s = document.createElement("div");
  s.id = "sg-canvas", i.appendChild(s), n.appendChild(a), n.appendChild(i);
  const l = document.createElement("div");
  l.className = "sg-navigator";
  const r = document.createElement("div");
  return r.className = "sg-context-menu", e.appendChild(o), e.appendChild(n), e.appendChild(l), e.appendChild(r), t.appendChild(e), { root: e, topbar: o, sidebar: a, canvasWrap: i, canvas: s, navigator: l, contextMenu: r };
}
const ut = "data:image/png;base64,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";
function mt(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
function gt(t, e) {
  t.innerHTML = `
    <div class="sg-topbar-left">
      <div class="sg-topbar-logo" title="Menu">
        <img src="${ut}" alt="Super Grapes" class="sg-topbar-logo-img">
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
  const o = t.querySelector('[data-cmd="undo"]'), n = t.querySelector('[data-cmd="redo"]');
  o.addEventListener("click", () => e.UndoManager.undo()), n.addEventListener("click", () => e.UndoManager.redo());
  function a() {
    o.disabled = !e.UndoManager.hasUndo(), n.disabled = !e.UndoManager.hasRedo();
  }
  e.on("change:changesCount", a), a();
  const i = t.querySelectorAll(".sg-device-btn");
  i.forEach((f) => {
    f.addEventListener("click", () => {
      const v = f.dataset.device;
      e.setDevice(v), i.forEach((y) => y.classList.remove("active")), f.classList.add("active");
    });
  }), e.on("change:device", () => {
    const f = e.getDevice();
    i.forEach((v) => {
      v.classList.toggle("active", v.dataset.device === f);
    });
  });
  const s = t.querySelector('[data-cmd="sw-visibility"]');
  let l = !0;
  e.on("load", () => {
    e.runCommand("sw-visibility");
  }), s.addEventListener("click", () => {
    l = !l, l ? e.runCommand("sw-visibility") : e.stopCommand("sw-visibility"), s.classList.toggle("active", l);
  });
  const r = t.querySelector('[data-cmd="preview"]');
  let m = !1, g = null, u = !1;
  r.addEventListener("click", () => {
    m = !m;
    const f = document.querySelector(".sg-editor");
    if (m) {
      g = e.getSelected(), u = l, e.select(), l && (e.stopCommand("sw-visibility"), l = !1, s.classList.remove("active")), e.runCommand("preview"), f.classList.add("sg-preview-mode"), r.classList.add("active");
      const v = document.createElement("button");
      v.className = "sg-preview-exit-btn", v.innerHTML = '<i class="fa-solid fa-xmark"></i> Exit Preview', v.addEventListener("click", () => r.click()), f.appendChild(v), document.addEventListener("keydown", c);
    } else {
      e.stopCommand("preview"), f.classList.remove("sg-preview-mode"), u && (e.runCommand("sw-visibility"), l = !0, s.classList.add("active")), g && (e.select(g), g = null), r.classList.remove("active");
      const v = f.querySelector(".sg-preview-exit-btn");
      v && v.remove(), document.removeEventListener("keydown", c);
    }
  });
  function c(f) {
    f.key === "Escape" && m && r.click();
  }
  const d = t.querySelector('[data-cmd="toggle-navigator"]');
  d.addEventListener("click", () => {
    const f = document.querySelector(".sg-navigator");
    if (f) {
      const v = f.classList.toggle("open");
      d.classList.toggle("active", v);
    }
  }), t.querySelector('[data-cmd="export"]').addEventListener("click", () => {
    const f = e.getHtml(), v = e.getCss() ?? "";
    bt(f, v);
  }), t.querySelector('[data-cmd="import"]').addEventListener("click", () => {
    vt(e);
  }), t.querySelector('[data-cmd="save"]').addEventListener("click", () => {
    e.store();
  });
  const p = e.__sgAiConfig;
  p != null && p.apiKey && import("./ai-button-Cwt18xty.js").then(({ initAiButton: f }) => {
    f(t.querySelector(".sg-topbar-right"), e, p);
  });
}
function ft(t, e) {
  const o = document.createElement("div");
  o.className = "sg-modal-backdrop";
  const n = document.createElement("div");
  n.className = "sg-modal";
  const a = document.createElement("div");
  a.className = "sg-modal-header", a.innerHTML = `<span class="sg-modal-title">${mt(t)}</span>`;
  const i = document.createElement("button");
  i.className = "sg-modal-close", i.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  const s = () => o.remove();
  i.addEventListener("click", s), o.addEventListener("click", (r) => {
    r.target === o && s();
  }), a.appendChild(i), n.appendChild(a);
  const l = document.createElement("div");
  return l.className = "sg-modal-body", l.appendChild(e), n.appendChild(l), o.appendChild(n), document.body.appendChild(o), { backdrop: o, close: s };
}
function bt(t, e) {
  const o = document.createElement("div");
  o.className = "sg-export-wrap";
  const n = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${e}
</style>
</head>
<body>
${t}
</body>
</html>`, a = document.createElement("label");
  a.className = "sg-modal-label", a.textContent = "HTML";
  const i = document.createElement("textarea");
  i.className = "sg-modal-textarea", i.readOnly = !0, i.value = t;
  const s = document.createElement("label");
  s.className = "sg-modal-label", s.textContent = "CSS";
  const l = document.createElement("textarea");
  l.className = "sg-modal-textarea", l.readOnly = !0, l.value = e;
  const r = document.createElement("div");
  r.className = "sg-modal-actions";
  const m = document.createElement("button");
  m.className = "sg-modal-btn", m.textContent = "Copy HTML", m.addEventListener("click", () => navigator.clipboard.writeText(t));
  const g = document.createElement("button");
  g.className = "sg-modal-btn", g.textContent = "Copy CSS", g.addEventListener("click", () => navigator.clipboard.writeText(e));
  const u = document.createElement("button");
  u.className = "sg-modal-btn sg-modal-btn-primary", u.textContent = "Download .html", u.addEventListener("click", () => {
    const c = new Blob([n], { type: "text/html" }), d = URL.createObjectURL(c), p = document.createElement("a");
    p.href = d, p.download = "export.html", p.click(), URL.revokeObjectURL(d);
  }), r.appendChild(m), r.appendChild(g), r.appendChild(u), o.appendChild(a), o.appendChild(i), o.appendChild(s), o.appendChild(l), o.appendChild(r), ft("Export HTML / CSS", o);
}
function vt(t) {
  const e = document.createElement("input");
  e.type = "file", e.accept = ".html,.htm", e.style.display = "none", e.addEventListener("change", () => {
    var n;
    const o = (n = e.files) == null ? void 0 : n[0];
    o && o.text().then((a) => {
      t.setComponents(a);
    });
  }), document.body.appendChild(e), e.click(), e.remove();
}
function me(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
function ht(t, e) {
  let o = "widgets";
  const n = document.createElement("div");
  n.className = "sg-sidebar-widgets-zone", n.style.display = "flex", n.style.flexDirection = "column", n.style.flex = "1", n.style.overflow = "hidden";
  const a = document.createElement("div");
  a.className = "sg-sidebar-edit-zone", a.style.display = "none", a.style.flexDirection = "column", a.style.flex = "1", a.style.overflow = "hidden";
  const i = document.createElement("div");
  i.className = "sg-sidebar-header", i.innerHTML = '<span class="sg-sidebar-title">Widgets</span>';
  const s = document.createElement("div");
  s.className = "sg-sidebar-body", s.id = "sg-widgets-body", n.appendChild(i), n.appendChild(s);
  const l = document.createElement("div");
  l.className = "sg-edit-header";
  const r = document.createElement("div");
  r.className = "sg-edit-tabs";
  const m = document.createElement("div");
  m.className = "sg-edit-body", m.id = "sg-edit-body", a.appendChild(l), a.appendChild(r), a.appendChild(m);
  const g = document.createElement("div");
  g.className = "sg-sidebar-toolbar", g.innerHTML = `
    <button class="sg-sidebar-toolbar-btn active" data-mode="widgets" title="Widgets">
      <i class="fa-solid fa-grip"></i>
    </button>
    <button class="sg-sidebar-toolbar-btn" data-mode="navigator" title="Navigator">
      <i class="fa-solid fa-layer-group"></i>
    </button>
  `, t.appendChild(n), t.appendChild(a), t.appendChild(g), g.querySelectorAll(".sg-sidebar-toolbar-btn").forEach((c) => {
    c.addEventListener("click", () => {
      const d = c.dataset.mode;
      d && u(d);
    });
  });
  function u(c) {
    if (o = c, n.style.display = c === "widgets" ? "flex" : "none", a.style.display = c === "edit" ? "flex" : "none", g.querySelectorAll(".sg-sidebar-toolbar-btn").forEach((d) => {
      const p = d;
      p.classList.toggle("active", p.dataset.mode === c);
    }), c === "navigator") {
      const d = document.querySelector(".sg-navigator");
      d && d.classList.add("open"), n.style.display = o === "edit" ? "none" : "flex", a.style.display = o === "edit" ? "flex" : "none";
    }
  }
  return e.on("component:selected", (c) => {
    const d = c.get("type") || c.get("tagName") || "Element", p = c.getName() || d;
    l.innerHTML = `
      <button class="sg-edit-back-btn" title="Back to widgets">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <span class="sg-edit-title">${me(p)}</span>
      <span class="sg-edit-badge">${me(d)}</span>
    `, l.querySelector(".sg-edit-back-btn").addEventListener("click", () => {
      e.select(null);
    }), r.innerHTML = `
      <button class="sg-edit-tab active" data-tab="content">
        <i class="fa-solid fa-pencil"></i> Content
      </button>
      <button class="sg-edit-tab" data-tab="style">
        <i class="fa-solid fa-paint-brush"></i> Style
      </button>
      <button class="sg-edit-tab" data-tab="advanced">
        <i class="fa-solid fa-cog"></i> Advanced
      </button>
    `, r.querySelectorAll(".sg-edit-tab").forEach((f) => {
      f.addEventListener("click", () => {
        r.querySelectorAll(".sg-edit-tab").forEach((y) => y.classList.remove("active")), f.classList.add("active");
        const v = f.dataset.tab;
        t.dispatchEvent(new CustomEvent("sg:tab-change", { detail: { tab: v }, bubbles: !0 }));
      });
    }), u("edit");
  }), e.on("component:deselected", () => {
    u("widgets");
  }), {
    switchMode: u,
    getMode: () => o,
    getBodyEl: () => o === "edit" ? m : s
  };
}
function ge(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const yt = {
  "sg-section": "fa-solid fa-layer-group",
  "sg-2-columns": "fa-solid fa-columns",
  "sg-3-columns": "fa-solid fa-columns",
  "sg-4-columns": "fa-solid fa-table-cells",
  "sg-sidebar-left": "fa-solid fa-table-columns",
  "sg-sidebar-right": "fa-solid fa-table-columns",
  "sg-heading": "fa-solid fa-heading",
  "sg-text": "fa-solid fa-font",
  "sg-image": "fa-solid fa-image",
  "sg-video": "fa-solid fa-video",
  "sg-button": "fa-solid fa-square",
  "sg-divider": "fa-solid fa-minus",
  "sg-spacer": "fa-solid fa-arrows-up-down",
  "sg-icon": "fa-solid fa-star",
  "sg-accordion": "fa-solid fa-bars-staggered",
  "sg-tabs": "fa-solid fa-folder",
  "sg-icon-box": "fa-solid fa-cube",
  "sg-form": "fa-solid fa-rectangle-list",
  "sg-input": "fa-solid fa-i-cursor",
  "sg-textarea": "fa-solid fa-align-left",
  "sg-select": "fa-solid fa-caret-down",
  "sg-checkbox": "fa-solid fa-square-check",
  "sg-radio": "fa-solid fa-circle-dot",
  "sg-submit": "fa-solid fa-paper-plane"
}, fe = ["Layout", "Basic", "Interactive", "Forms", "Extra"];
function be(t) {
  return yt[t] || "fa-solid fa-puzzle-piece";
}
function xt() {
  const t = document.createElement("div");
  return t.className = "sg-drag-ghost", t.style.cssText = `
    position: fixed;
    z-index: 100000;
    pointer-events: none;
    opacity: 0.85;
    padding: 8px 14px;
    background: var(--sg-accent, #c0392b);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    border-radius: 2px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    display: none;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transform: translate(12px, 12px);
    font-family: var(--sg-font, system-ui, sans-serif);
  `, document.body.appendChild(t), t;
}
function Ct() {
  const t = document.createElement("div");
  t.className = "sg-drop-indicator", t.style.cssText = `
    position: fixed;
    z-index: 99999;
    pointer-events: none;
    display: none;
    background: var(--sg-accent, #c0392b);
    height: 3px;
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(192,57,43,0.6);
    transition: top 0.08s ease, left 0.08s ease, width 0.08s ease;
  `;
  const e = `
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--sg-accent, #c0392b);
    box-shadow: 0 0 4px rgba(192,57,43,0.5);
  `, o = document.createElement("style");
  return o.textContent = `
    .sg-drop-indicator::before { ${e} left: -4px; }
    .sg-drop-indicator::after { ${e} right: -4px; }
  `, document.head.appendChild(o), document.body.appendChild(t), t;
}
function wt(t, e) {
  const o = t.querySelector("#sg-widgets-body");
  if (!o) return;
  const n = o.parentElement;
  let a;
  if (n.querySelector(".sg-widgets-search"))
    a = n.querySelector(".sg-widgets-search input");
  else {
    const m = document.createElement("div");
    m.className = "sg-widgets-search", m.innerHTML = `
      <div class="sg-sidebar-search-wrap">
        <i class="fa-solid fa-magnifying-glass sg-sidebar-search-icon"></i>
        <input type="text" class="sg-sidebar-search" placeholder="Search widgets..." />
        <button type="button" class="sg-sidebar-search-clear" aria-label="Clear search">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `, n.insertBefore(m, o), a = m.querySelector("input");
    const g = m.querySelector(".sg-sidebar-search-clear");
    a.addEventListener("input", () => {
      g.style.display = a.value.length > 0 ? "flex" : "none";
    }), g.addEventListener("click", () => {
      a.value = "", g.style.display = "none", l(), a.focus();
    });
  }
  const i = xt(), s = Ct();
  e.on("load", () => {
    e.runCommand("open-blocks");
  });
  try {
    e.runCommand("open-blocks");
  } catch {
  }
  e.on("block:custom", () => {
  });
  function l(m) {
    o.innerHTML = "";
    const g = e.Blocks.getAll(), u = {};
    g.forEach((d) => {
      var y, h;
      const p = ((y = d.getCategoryLabel) == null ? void 0 : y.call(d)) || d.get("category") || "Extra", f = typeof p == "string" ? p : p.label || p.id || "Extra", v = ((h = d.getLabel) == null ? void 0 : h.call(d)) || d.get("label") || d.getId();
      m && !v.toLowerCase().includes(m.toLowerCase()) || (u[f] || (u[f] = []), u[f].push({ id: d.getId(), label: v, block: d }));
    });
    const c = Object.keys(u).sort((d, p) => {
      const f = fe.indexOf(d), v = fe.indexOf(p);
      return (f === -1 ? 999 : f) - (v === -1 ? 999 : v);
    });
    for (const d of c) {
      const p = document.createElement("div");
      p.className = "sg-widgets-category";
      const f = document.createElement("div");
      f.className = "sg-widgets-category-title", f.textContent = d, p.appendChild(f);
      const v = document.createElement("div");
      v.className = "sg-widgets-grid";
      for (const y of u[d]) {
        const h = document.createElement("div");
        h.className = "sg-widget-card", h.dataset.blockId = y.id, h.innerHTML = `
          <i class="${be(y.id)} sg-widget-card-icon"></i>
          <span class="sg-widget-card-label">${ge(y.label)}</span>
        `, h.addEventListener("pointerdown", (k) => {
          if (k.button !== 0) return;
          k.preventDefault();
          const L = e.Blocks.get(y.id);
          if (!L) return;
          h.classList.add("dragging"), i.innerHTML = `<i class="${be(y.id)}"></i> ${ge(y.label)}`, i.style.display = "flex", i.style.left = k.clientX + "px", i.style.top = k.clientY + "px", e.Blocks.startDrag(L, k);
          const b = document.querySelector(".gjs-frame");
          let x = !1, S = 0, E = 0;
          const V = (N) => {
            if (i.style.left = N.clientX + "px", i.style.top = N.clientY + "px", b) {
              const C = b.getBoundingClientRect(), M = N.clientX >= C.left && N.clientX <= C.right && N.clientY >= C.top && N.clientY <= C.bottom, A = N.clientX - C.left, w = N.clientY - C.top;
              if (M) {
                if (S = A, E = w, !x) {
                  const O = new PointerEvent("pointerenter", {
                    clientX: A,
                    clientY: w,
                    bubbles: !1,
                    cancelable: !1,
                    pointerId: 1,
                    pointerType: "mouse"
                  });
                  b.dispatchEvent(O), x = !0;
                }
                const H = new PointerEvent("pointermove", {
                  clientX: A,
                  clientY: w,
                  bubbles: !0,
                  cancelable: !0,
                  pointerId: 1,
                  pointerType: "mouse"
                });
                b.dispatchEvent(H), r(b, C);
              } else {
                if (x) {
                  const H = new PointerEvent("pointerleave", {
                    clientX: A,
                    clientY: w,
                    bubbles: !1,
                    cancelable: !1,
                    pointerId: 1,
                    pointerType: "mouse"
                  });
                  b.dispatchEvent(H), x = !1;
                }
                s.style.display = "none";
              }
            }
          }, T = () => {
            if (i.style.display = "none", s.style.display = "none", b) {
              const N = new PointerEvent("pointerup", {
                clientX: S,
                clientY: E,
                bubbles: !0,
                cancelable: !0,
                pointerId: 1,
                pointerType: "mouse"
              });
              b.dispatchEvent(N);
            }
            e.Blocks.endDrag(!1), h.classList.remove("dragging"), x = !1, document.removeEventListener("pointermove", V), document.removeEventListener("pointerup", T);
          };
          document.addEventListener("pointermove", V), document.addEventListener("pointerup", T);
        }), v.appendChild(h);
      }
      p.appendChild(v), o.appendChild(p);
    }
    o.children.length === 0 && (o.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-puzzle-piece"></i><span>No widgets found</span></div>');
  }
  function r(m, g) {
    try {
      const u = m.contentDocument;
      if (!u) return;
      const c = u.querySelector(".gjs-placeholder");
      if (!c || c.style.display === "none") {
        s.style.display = "none";
        return;
      }
      const d = c.getBoundingClientRect();
      if (d.width === 0 && d.height === 0) {
        s.style.display = "none";
        return;
      }
      s.style.display = "block", s.style.left = g.left + d.left + "px", s.style.top = g.top + d.top + "px", s.style.width = d.width + "px", d.height > d.width ? (s.style.width = "3px", s.style.height = d.height + "px") : (s.style.height = "3px", s.style.width = d.width + "px");
    } catch {
      s.style.display = "none";
    }
  }
  a.addEventListener("input", () => {
    l(a.value.trim());
  }), e.on("load", () => {
    l();
  }), e.Blocks.getAll().length > 0 && l();
}
function Et(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
function Lt(t, e) {
  t.innerHTML = "";
  const o = e.getSelected();
  if (!o) {
    t.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-hand-pointer"></i><span>Select an element</span></div>';
    return;
  }
  function n() {
    var s, l, r, m, g, u, c, d, p, f;
    t.innerHTML = "";
    const a = o.getTraits();
    if (a.length === 0) {
      t.innerHTML = `
        <div class="sg-empty-state">
          <i class="fa-solid fa-sliders"></i>
          <span>No content settings</span>
        </div>
      `;
      return;
    }
    const i = { General: [] };
    a.forEach((v) => {
      const y = v.get("category") || "General";
      i[y] || (i[y] = []), i[y].push(v);
    });
    for (const [v, y] of Object.entries(i)) {
      const h = document.createElement("div");
      h.className = "sg-ctrl-section";
      const k = document.createElement("div");
      k.className = "sg-ctrl-section-header", k.innerHTML = `
        <span class="sg-ctrl-section-title">${Et(v)}</span>
        <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
      `, k.addEventListener("click", () => {
        h.classList.toggle("collapsed");
      });
      const L = document.createElement("div");
      L.className = "sg-ctrl-section-body";
      for (const b of y) {
        const x = document.createElement("div");
        x.className = "sg-ctrl-row";
        const S = document.createElement("label");
        S.className = "sg-ctrl-label", S.textContent = ((s = b.getLabel) == null ? void 0 : s.call(b)) || b.get("label") || b.get("name") || "";
        const E = document.createElement("div");
        E.className = "sg-ctrl-field";
        const V = b.get("name") || "", T = ((l = b.getType) == null ? void 0 : l.call(b)) || b.get("type") || "text";
        if (V === "startfrom" || T === "datetime-local" || T === "date") {
          const C = document.createElement("input");
          C.className = "sg-input", C.type = "datetime-local";
          const M = ((r = b.getValue) == null ? void 0 : r.call(b)) ?? b.get("value") ?? "";
          if (M) {
            const A = M.replace(/\//g, "-").replace(" ", "T").slice(0, 16);
            C.value = A;
          }
          C.addEventListener("change", () => {
            const A = new Date(C.value);
            if (!isNaN(A.getTime())) {
              const w = A.getFullYear(), H = String(A.getMonth() + 1).padStart(2, "0"), O = String(A.getDate()).padStart(2, "0"), P = String(A.getHours()).padStart(2, "0"), D = String(A.getMinutes()).padStart(2, "0");
              b.setValue(`${w}/${H}/${O} ${P}:${D}:00`);
            }
          }), E.appendChild(C);
        } else switch (T) {
          case "text":
          case "url": {
            const C = document.createElement("input");
            C.className = "sg-input", C.type = "text", C.value = ((m = b.getValue) == null ? void 0 : m.call(b)) ?? b.get("value") ?? "", C.placeholder = b.get("placeholder") || "", C.addEventListener("change", () => {
              b.setValue(C.value);
            }), E.appendChild(C);
            break;
          }
          case "number": {
            const C = document.createElement("input");
            C.className = "sg-input sg-input-number", C.type = "number", C.value = ((g = b.getValue) == null ? void 0 : g.call(b)) ?? b.get("value") ?? "";
            const M = b.get("min"), A = b.get("max"), w = b.get("step");
            M != null && (C.min = String(M)), A != null && (C.max = String(A)), w != null && (C.step = String(w)), C.addEventListener("change", () => {
              b.setValue(parseFloat(C.value));
            }), E.appendChild(C);
            break;
          }
          case "select": {
            const C = document.createElement("select");
            C.className = "sg-select", (b.get("options") || []).forEach((A) => {
              const w = document.createElement("option");
              typeof A == "string" ? (w.value = A, w.textContent = A) : (w.value = A.id ?? A.value ?? "", w.textContent = A.label || A.name || w.value), C.appendChild(w);
            }), C.value = ((u = b.getValue) == null ? void 0 : u.call(b)) ?? b.get("value") ?? "", C.addEventListener("change", () => {
              b.setValue(C.value);
            }), E.appendChild(C);
            break;
          }
          case "checkbox": {
            const C = document.createElement("label");
            C.className = "sg-toggle-switch";
            const M = document.createElement("input");
            M.type = "checkbox", M.checked = !!((c = b.getValue) != null && c.call(b)) || !!b.get("value");
            const A = document.createElement("span");
            A.className = "sg-toggle-switch-track";
            const w = document.createElement("span");
            w.className = "sg-toggle-switch-thumb", A.appendChild(w), C.appendChild(M), C.appendChild(A), M.addEventListener("change", () => {
              b.setValue(M.checked);
            }), E.appendChild(C);
            break;
          }
          case "color": {
            const C = document.createElement("div");
            C.className = "sg-color-swatch-wrap";
            const M = document.createElement("div");
            M.className = "sg-color-swatch";
            const A = ((d = b.getValue) == null ? void 0 : d.call(b)) ?? b.get("value") ?? "#000000";
            M.style.backgroundColor = A;
            const w = document.createElement("input");
            w.type = "color", w.value = A, M.appendChild(w);
            const H = document.createElement("input");
            H.className = "sg-color-hex-input", H.value = A, w.addEventListener("input", () => {
              M.style.backgroundColor = w.value, H.value = w.value, b.setValue(w.value);
            }), H.addEventListener("change", () => {
              M.style.backgroundColor = H.value, w.value = H.value, b.setValue(H.value);
            }), C.appendChild(M), C.appendChild(H), E.appendChild(C);
            break;
          }
          case "button": {
            const C = document.createElement("button");
            C.className = "sg-action-btn", C.textContent = b.get("text") || ((p = b.getLabel) == null ? void 0 : p.call(b)) || "Action", C.addEventListener("click", () => {
              const M = b.get("command");
              M && e.runCommand(M);
            }), E.appendChild(C);
            break;
          }
          default: {
            const C = document.createElement("input");
            C.className = "sg-input", C.type = "text", C.value = ((f = b.getValue) == null ? void 0 : f.call(b)) ?? b.get("value") ?? "", C.addEventListener("change", () => {
              b.setValue(C.value);
            }), E.appendChild(C);
          }
        }
        x.appendChild(S), x.appendChild(E), L.appendChild(x);
      }
      h.appendChild(k), h.appendChild(L), t.appendChild(h);
    }
  }
  n();
}
function kt(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const St = ["px", "%", "em", "rem", "vw"], Nt = ["T", "R", "B", "L"];
function Q(t, e, o) {
  var k, L;
  const n = document.createElement("div");
  n.className = "sg-edim-wrap";
  const a = document.createElement("div");
  a.className = "sg-edim-header", a.innerHTML = `<span class="sg-edim-label">${kt(o)}</span>`, n.appendChild(a);
  const i = ((k = e.getProperties) == null ? void 0 : k.call(e)) || [], s = [];
  let l = !1, r = "px";
  const m = document.createElement("div");
  m.className = "sg-edim-inputs";
  for (let b = 0; b < 4; b++) {
    const x = i[b], S = document.createElement("div");
    S.className = "sg-edim-input-wrap";
    const E = document.createElement("button");
    E.className = "sg-edim-inc", E.innerHTML = '<i class="fa-solid fa-chevron-up"></i>', E.addEventListener("click", () => {
      const C = parseInt(V.value) || 0;
      y(b, C + 1);
    });
    const V = document.createElement("input");
    if (V.className = "sg-edim-input", V.type = "number", x) {
      const C = ((L = x.getValue) == null ? void 0 : L.call(x)) ?? "";
      V.value = parseInt(C) ? String(parseInt(C)) : "0";
      const M = String(C).match(/(px|%|em|rem|vw)/);
      M && b === 0 && (r = M[1]);
    }
    V.addEventListener("change", () => {
      y(b, parseInt(V.value) || 0);
    }), s.push(V);
    const T = document.createElement("button");
    T.className = "sg-edim-dec", T.innerHTML = '<i class="fa-solid fa-chevron-down"></i>', T.addEventListener("click", () => {
      const C = parseInt(V.value) || 0;
      y(b, C - 1);
    });
    const N = document.createElement("span");
    N.className = "sg-edim-input-label", N.textContent = Nt[b], S.appendChild(E), S.appendChild(V), S.appendChild(T), S.appendChild(N), m.appendChild(S);
  }
  const g = document.createElement("div");
  g.className = "sg-edim-tools";
  const u = document.createElement("button");
  u.className = "sg-edim-link-btn", u.innerHTML = '<i class="fa-solid fa-link"></i>', u.title = "Link values", u.addEventListener("click", () => {
    if (l = !l, u.classList.toggle("linked", l), u.innerHTML = l ? '<i class="fa-solid fa-link"></i>' : '<i class="fa-solid fa-link-slash"></i>', l) {
      const b = parseInt(s[0].value) || 0;
      for (let x = 1; x < 4; x++)
        s[x].value = String(b);
      h();
    }
  }), g.appendChild(u);
  const c = document.createElement("button");
  c.className = "sg-edim-unit-btn", c.textContent = r, c.addEventListener("click", (b) => {
    b.stopPropagation(), p();
  }), g.appendChild(c), m.appendChild(g), n.appendChild(m);
  const d = document.createElement("div");
  d.className = "sg-edim-unit-popup", d.style.display = "none", St.forEach((b) => {
    const x = document.createElement("button");
    x.className = "sg-edim-unit-option", b === r && x.classList.add("active"), x.textContent = b, x.addEventListener("click", (S) => {
      S.stopPropagation(), r = b, c.textContent = b, d.querySelectorAll(".sg-edim-unit-option").forEach(
        (E) => E.classList.toggle("active", E.textContent === b)
      ), d.style.display = "none", h();
    }), d.appendChild(x);
  }), g.style.position = "relative", g.appendChild(d);
  function p() {
    d.style.display = d.style.display === "none" ? "flex" : "none";
  }
  function f(b) {
    g.contains(b.target) || (d.style.display = "none");
  }
  document.addEventListener("click", f);
  const v = new MutationObserver(() => {
    n.isConnected || (document.removeEventListener("click", f), v.disconnect());
  });
  v.observe(document.body, { childList: !0, subtree: !0 });
  function y(b, x) {
    if (s[b].value = String(x), l)
      for (let S = 0; S < 4; S++)
        s[S].value = String(x);
    h();
  }
  function h() {
    var b, x, S;
    if (i.length >= 4)
      for (let E = 0; E < 4; E++) {
        const V = s[E].value, T = V === "0" || V === "" ? "0" : `${V}${r}`;
        (x = (b = i[E]) == null ? void 0 : b.upValue) == null || x.call(b, T);
      }
    else {
      const E = s.map((V) => {
        const T = V.value;
        return T === "0" || T === "" ? "0" : `${T}${r}`;
      });
      (S = e.upValue) == null || S.call(e, E.join(" "));
    }
  }
  t.appendChild(n);
}
function $(t, e, o) {
  var k, L, b, x, S, E, V;
  const n = document.createElement("div");
  n.className = "sg-ctrl-row";
  const a = document.createElement("label");
  a.className = "sg-ctrl-label", a.textContent = o;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field sg-slider-ctrl";
  const s = ((k = e.get) == null ? void 0 : k.call(e, "min")) ?? 0, l = ((L = e.get) == null ? void 0 : L.call(e, "max")) ?? 100, r = ((b = e.get) == null ? void 0 : b.call(e, "step")) ?? 1, m = ((x = e.get) == null ? void 0 : x.call(e, "units")) || ((S = e.get) == null ? void 0 : S.call(e, "unit")) || ["px"], g = Array.isArray(m) ? m[0] || "px" : m || "px", u = ((E = e.getValue) == null ? void 0 : E.call(e)) ?? ((V = e.get) == null ? void 0 : V.call(e, "value")) ?? "", c = parseFloat(u) || 0, d = document.createElement("input");
  d.className = "sg-slider-track", d.type = "range", d.min = String(s), d.max = String(l), d.step = String(r), d.value = String(c);
  const p = document.createElement("input");
  p.className = "sg-slider-value", p.type = "number", p.min = String(s), p.max = String(l), p.step = String(r), p.value = String(c);
  const f = document.createElement("span");
  f.className = "sg-slider-unit", f.textContent = g;
  function v() {
    const T = parseFloat(d.value), N = parseFloat(d.min), C = parseFloat(d.max), M = C > N ? (T - N) / (C - N) * 100 : 0;
    d.style.setProperty("--sg-slider-fill", `${M}%`);
  }
  v(), d.addEventListener("pointerdown", () => {
    window.__sgEditing && (window.__sgEditing.interacting = !0);
  });
  const y = () => {
    window.__sgEditing && (window.__sgEditing.interacting = !1);
  };
  d.addEventListener("pointerup", y), d.addEventListener("pointercancel", y), d.addEventListener("input", () => {
    p.value = d.value, v(), h(d.value);
  }), p.addEventListener("change", () => {
    d.value = p.value, v(), h(p.value);
  });
  function h(T) {
    var M;
    const N = parseFloat(T);
    if (isNaN(N)) return;
    const C = g !== "" ? `${N}${g}` : `${N}`;
    (M = e.upValue) == null || M.call(e, C);
  }
  i.appendChild(d), i.appendChild(p), i.appendChild(f), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function Tt(t, e, o) {
  var d, p;
  const n = document.createElement("div");
  n.className = "sg-ctrl-row";
  const a = document.createElement("label");
  a.className = "sg-ctrl-label", a.textContent = o;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const s = document.createElement("div");
  s.className = "sg-color-swatch-wrap";
  const l = ((d = e.getValue) == null ? void 0 : d.call(e)) ?? ((p = e.get) == null ? void 0 : p.call(e, "value")) ?? "#000000", r = ve(l), m = document.createElement("div");
  m.className = "sg-color-swatch", m.style.backgroundColor = l;
  const g = document.createElement("input");
  g.type = "color", g.value = r, m.appendChild(g);
  const u = document.createElement("input");
  u.className = "sg-color-hex-input", u.type = "text", u.value = l, g.addEventListener("input", () => {
    var f;
    m.style.backgroundColor = g.value, u.value = g.value, (f = e.upValue) == null || f.call(e, g.value);
  }), u.addEventListener("change", () => {
    var v;
    const f = u.value.trim();
    m.style.backgroundColor = f;
    try {
      g.value = ve(f);
    } catch {
    }
    (v = e.upValue) == null || v.call(e, f);
  });
  const c = document.createElement("button");
  c.className = "sg-edim-unit-btn", c.innerHTML = '<i class="fa-solid fa-xmark"></i>', c.title = "Clear", c.style.flexShrink = "0", c.addEventListener("click", () => {
    var f;
    m.style.backgroundColor = "transparent", u.value = "", (f = e.upValue) == null || f.call(e, "");
  }), s.appendChild(m), s.appendChild(u), s.appendChild(c), i.appendChild(s), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function ve(t) {
  if (!t || t === "transparent" || t === "none" || t === "")
    return "#000000";
  if (/^#[0-9a-fA-F]{6}$/.test(t)) return t;
  if (/^#[0-9a-fA-F]{3}$/.test(t)) {
    const e = t[1], o = t[2], n = t[3];
    return `#${e}${e}${o}${o}${n}${n}`;
  }
  try {
    const e = document.createElement("canvas").getContext("2d");
    if (e) {
      e.fillStyle = t;
      const o = e.fillStyle;
      if (o.startsWith("#")) return o;
      const n = o.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (n) {
        const a = (i) => parseInt(i).toString(16).padStart(2, "0");
        return `#${a(n[1])}${a(n[2])}${a(n[3])}`;
      }
    }
  } catch {
  }
  return "#000000";
}
function Ee(t, e, o, n) {
  var g, u;
  const a = document.createElement("div");
  a.className = "sg-ctrl-row";
  const i = document.createElement("label");
  i.className = "sg-ctrl-label", i.textContent = o;
  const s = document.createElement("div");
  s.className = "sg-ctrl-field";
  const l = document.createElement("div");
  l.className = "sg-icon-toggle-group";
  const r = ((g = e.getValue) == null ? void 0 : g.call(e)) ?? ((u = e.get) == null ? void 0 : u.call(e, "value")) ?? "", m = [];
  n.forEach((c) => {
    const d = document.createElement("button");
    d.className = "sg-icon-toggle-btn", c.value === r && d.classList.add("active"), d.title = c.title || c.value, d.innerHTML = `<i class="${c.icon}"></i>`, d.dataset.value = c.value, d.addEventListener("click", () => {
      var p;
      m.forEach((f) => f.classList.remove("active")), d.classList.add("active"), (p = e.upValue) == null || p.call(e, c.value);
    }), m.push(d), l.appendChild(d);
  }), s.appendChild(l), a.appendChild(i), a.appendChild(s), t.appendChild(a);
}
function Mt(t, e) {
  const o = document.createElement("div");
  o.className = "sg-section-state-wrap";
  const n = [
    { label: "Normal", state: "" },
    { label: "Hover", state: "hover" }
  ], a = [];
  let i = e.SelectorManager.getState() || "";
  n.forEach((s) => {
    const l = document.createElement("button");
    l.className = "sg-section-state-btn", s.state === i && l.classList.add("active"), l.textContent = s.label, l.addEventListener("click", () => {
      i = s.state, a.forEach((m) => m.classList.remove("active")), l.classList.add("active");
      const r = e.getSelected();
      r && (e.SelectorManager.setState(s.state), e.StyleManager.select(r));
    }), a.push(l), o.appendChild(l);
  }), t.appendChild(o);
}
function Ht(t, e) {
  const o = document.createElement("div");
  o.className = "sg-ctrl-section";
  const n = document.createElement("div");
  n.className = "sg-ctrl-section-header", n.innerHTML = `
    <span class="sg-ctrl-section-title">Box Shadow</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, n.addEventListener("click", () => o.classList.toggle("collapsed"));
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-body";
  const i = e.getSelected();
  let s = 0, l = 4, r = 8, m = 0, g = "rgba(0,0,0,0.3)", u = !1;
  if (i) {
    const w = String(i.getStyle("box-shadow") || "");
    if (w && w !== "none") {
      const H = w.includes("inset"), P = w.replace("inset", "").trim().split(/\s+/);
      if (P.length >= 3) {
        s = parseInt(P[0]) || 0, l = parseInt(P[1]) || 0, r = parseInt(P[2]) || 0, m = parseInt(P[3]) || 0;
        const D = P.slice(4);
        D.length > 0 && (g = D.join(" ")), u = H;
      }
    }
  }
  function c() {
    if (!i) return;
    const H = `${u ? "inset " : ""}${s}px ${l}px ${r}px ${m}px ${g}`;
    i.addStyle({ "box-shadow": H }), d();
  }
  function d() {
    const w = u ? "inset " : "";
    A.style.boxShadow = `${w}${s}px ${l}px ${r}px ${m}px ${g}`;
  }
  [
    { label: "H Offset", getter: () => s, setter: (w) => {
      s = w;
    }, min: -50, max: 50 },
    { label: "V Offset", getter: () => l, setter: (w) => {
      l = w;
    }, min: -50, max: 50 },
    { label: "Blur", getter: () => r, setter: (w) => {
      r = w;
    }, min: 0, max: 100 },
    { label: "Spread", getter: () => m, setter: (w) => {
      m = w;
    }, min: -50, max: 50 }
  ].forEach((w) => {
    const H = document.createElement("div");
    H.className = "sg-ctrl-row";
    const O = document.createElement("label");
    O.className = "sg-ctrl-label", O.textContent = w.label;
    const P = document.createElement("div");
    P.className = "sg-ctrl-field sg-slider-ctrl";
    const D = document.createElement("input");
    D.className = "sg-slider-track", D.type = "range", D.min = String(w.min), D.max = String(w.max), D.value = String(w.getter());
    const I = document.createElement("input");
    I.className = "sg-slider-value", I.type = "number", I.min = String(w.min), I.max = String(w.max), I.value = String(w.getter());
    const B = document.createElement("span");
    B.className = "sg-slider-unit", B.textContent = "px", D.addEventListener("input", () => {
      I.value = D.value, w.setter(parseInt(D.value)), c();
    }), I.addEventListener("change", () => {
      D.value = I.value, w.setter(parseInt(I.value)), c();
    }), P.appendChild(D), P.appendChild(I), P.appendChild(B), H.appendChild(O), H.appendChild(P), a.appendChild(H);
  });
  const f = document.createElement("div");
  f.className = "sg-ctrl-row";
  const v = document.createElement("label");
  v.className = "sg-ctrl-label", v.textContent = "Color";
  const y = document.createElement("div");
  y.className = "sg-ctrl-field";
  const h = document.createElement("div");
  h.className = "sg-color-swatch-wrap";
  const k = document.createElement("div");
  k.className = "sg-color-swatch", k.style.backgroundColor = g;
  const L = document.createElement("input");
  L.type = "color", L.value = "#000000", k.appendChild(L);
  const b = document.createElement("input");
  b.className = "sg-color-hex-input", b.value = g, L.addEventListener("input", () => {
    g = L.value, k.style.backgroundColor = g, b.value = g, c();
  }), b.addEventListener("change", () => {
    g = b.value, k.style.backgroundColor = g, c();
  }), h.appendChild(k), h.appendChild(b), y.appendChild(h), f.appendChild(v), f.appendChild(y), a.appendChild(f);
  const x = document.createElement("div");
  x.className = "sg-ctrl-row";
  const S = document.createElement("label");
  S.className = "sg-ctrl-label", S.textContent = "Inset";
  const E = document.createElement("div");
  E.className = "sg-ctrl-field";
  const V = document.createElement("label");
  V.className = "sg-toggle-switch";
  const T = document.createElement("input");
  T.type = "checkbox", T.checked = u;
  const N = document.createElement("span");
  N.className = "sg-toggle-switch-track";
  const C = document.createElement("span");
  C.className = "sg-toggle-switch-thumb", N.appendChild(C), V.appendChild(T), V.appendChild(N), T.addEventListener("change", () => {
    u = T.checked, c();
  }), E.appendChild(V), x.appendChild(S), x.appendChild(E), a.appendChild(x);
  const M = document.createElement("div");
  M.className = "sg-shadow-preview";
  const A = document.createElement("div");
  A.className = "sg-shadow-preview-inner", M.appendChild(A), d(), a.appendChild(M), o.appendChild(n), o.appendChild(a), t.appendChild(o);
}
function Vt(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const At = [
  { type: "classic", icon: "fa-solid fa-fill-drip", label: "Classic" },
  { type: "gradient", icon: "fa-solid fa-palette", label: "Gradient" },
  { type: "video", icon: "fa-solid fa-video", label: "Video" },
  { type: "slideshow", icon: "fa-solid fa-images", label: "Slides" }
];
function It(t, e, o, n) {
  var g;
  const a = document.createElement("div");
  a.className = "sg-ctrl-row";
  const i = document.createElement("label");
  i.className = "sg-ctrl-label", i.textContent = "Type";
  const s = document.createElement("div");
  s.className = "sg-ctrl-field";
  const l = document.createElement("div");
  l.className = "sg-bg-type-group";
  let r = n || "classic";
  if (!n) {
    const u = e.getSelected();
    u && (String(u.getStyle("background-image") || "").includes("gradient") && (r = "gradient"), (g = u.get("attributes")) != null && g["data-bg-video"] && (r = "video"));
  }
  const m = [];
  At.forEach((u) => {
    const c = document.createElement("button");
    c.className = "sg-bg-type-btn", u.type === r && c.classList.add("active"), c.innerHTML = `<i class="${u.icon}"></i><span>${Vt(u.label)}</span>`, c.title = u.label, c.addEventListener("click", () => {
      m.forEach((d) => d.classList.remove("active")), c.classList.add("active"), r = u.type, o == null || o(u.type);
    }), m.push(c), l.appendChild(c);
  }), s.appendChild(l), a.appendChild(i), a.appendChild(s), t.appendChild(a);
}
const Bt = [
  { value: "to right", label: "To Right" },
  { value: "to left", label: "To Left" },
  { value: "to bottom", label: "To Bottom" },
  { value: "to top", label: "To Top" },
  { value: "to bottom right", label: "Diagonal (BR)" },
  { value: "to top left", label: "Diagonal (TL)" },
  { value: "circle", label: "Radial" }
];
function Pt(t, e) {
  const o = document.createElement("div");
  o.className = "sg-ctrl-section";
  const n = document.createElement("div");
  n.className = "sg-ctrl-section-header", n.innerHTML = `
    <span class="sg-ctrl-section-title">Gradient</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, n.addEventListener("click", () => o.classList.toggle("collapsed"));
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-body";
  const i = e.getSelected();
  let s = "to right", l = "#c0392b", r = 0, m = "#e04535", g = 100;
  if (i) {
    const k = String(i.getStyle("background-image") || "").match(/linear-gradient\(([^,]+),\s*(#?\w+)\s+(\d+)%?,\s*(#?\w+)\s+(\d+)%?\)/);
    k && (s = k[1].trim(), l = k[2], r = parseInt(k[3]) || 0, m = k[4], g = parseInt(k[5]) || 100);
  }
  function u() {
    if (!i) return;
    const L = `${s === "circle" ? "radial-gradient" : "linear-gradient"}(${s === "circle" ? "circle" : s}, ${l} ${r}%, ${m} ${g}%)`;
    i.addStyle({ "background-image": L }), c();
  }
  function c() {
    const h = s === "circle" ? "radial-gradient" : "linear-gradient", k = s === "circle" ? "circle" : s;
    y.style.background = `${h}(${k}, ${l} ${r}%, ${m} ${g}%)`;
  }
  const d = document.createElement("div");
  d.className = "sg-ctrl-row";
  const p = document.createElement("label");
  p.className = "sg-ctrl-label", p.textContent = "Direction";
  const f = document.createElement("div");
  f.className = "sg-ctrl-field";
  const v = document.createElement("select");
  v.className = "sg-select", Bt.forEach((h) => {
    const k = document.createElement("option");
    k.value = h.value, k.textContent = h.label, v.appendChild(k);
  }), v.value = s, v.addEventListener("change", () => {
    s = v.value, u();
  }), f.appendChild(v), d.appendChild(p), d.appendChild(f), a.appendChild(d), he(a, "Color 1", l, r, (h, k) => {
    l = h, r = k, u();
  }), he(a, "Color 2", m, g, (h, k) => {
    m = h, g = k, u();
  });
  const y = document.createElement("div");
  y.className = "sg-gradient-preview", c(), a.appendChild(y), o.appendChild(n), o.appendChild(a), t.appendChild(o);
}
function he(t, e, o, n, a) {
  const i = document.createElement("div");
  i.className = "sg-ctrl-row";
  const s = document.createElement("label");
  s.className = "sg-ctrl-label", s.textContent = e;
  const l = document.createElement("div");
  l.className = "sg-ctrl-field", l.style.gap = "4px";
  const r = document.createElement("div");
  r.className = "sg-color-swatch", r.style.backgroundColor = o;
  const m = document.createElement("input");
  m.type = "color", m.value = o, r.appendChild(m);
  let g = o, u = n;
  m.addEventListener("input", () => {
    g = m.value, r.style.backgroundColor = g, a(g, u);
  });
  const c = document.createElement("input");
  c.className = "sg-slider-track", c.type = "range", c.min = "0", c.max = "100", c.value = String(n), c.style.flex = "1";
  const d = document.createElement("input");
  d.className = "sg-slider-value", d.type = "number", d.min = "0", d.max = "100", d.value = String(n);
  const p = document.createElement("span");
  p.className = "sg-slider-unit", p.textContent = "%", c.addEventListener("input", () => {
    d.value = c.value, u = parseInt(c.value), a(g, u);
  }), d.addEventListener("change", () => {
    c.value = d.value, u = parseInt(d.value), a(g, u);
  }), l.appendChild(r), l.appendChild(c), l.appendChild(d), l.appendChild(p), i.appendChild(s), i.appendChild(l), t.appendChild(i);
}
function Dt(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const Ot = [
  { value: "row", icon: "fa-solid fa-arrow-right", title: "Row" },
  { value: "row-reverse", icon: "fa-solid fa-arrow-left", title: "Row Reverse" },
  { value: "column", icon: "fa-solid fa-arrow-down", title: "Column" },
  { value: "column-reverse", icon: "fa-solid fa-arrow-up", title: "Column Reverse" }
], jt = [
  { value: "flex-start", icon: "fa-solid fa-align-left", title: "Start" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "flex-end", icon: "fa-solid fa-align-right", title: "End" },
  { value: "space-between", icon: "fa-solid fa-arrows-left-right", title: "Space Between" },
  { value: "space-around", icon: "fa-solid fa-arrows-left-right-to-line", title: "Space Around" }
], Z = [
  { value: "flex-start", icon: "fa-solid fa-align-left", title: "Start" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "flex-end", icon: "fa-solid fa-align-right", title: "End" },
  { value: "stretch", icon: "fa-solid fa-up-down", title: "Stretch" },
  { value: "baseline", icon: "fa-solid fa-text-height", title: "Baseline" }
], Rt = [
  { value: "left", icon: "fa-solid fa-align-left", title: "Left" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "right", icon: "fa-solid fa-align-right", title: "Right" },
  { value: "justify", icon: "fa-solid fa-align-justify", title: "Justify" }
], qt = {
  "flex-direction": Ot,
  "justify-content": jt,
  "align-items": Z,
  "align-content": Z,
  "align-self": Z,
  "text-align": Rt
}, zt = {
  "sg-text": ["General", "Dimension", "Typography", "Decorations", "Extra"],
  "sg-heading": ["General", "Dimension", "Typography", "Decorations", "Extra"],
  "sg-image": ["General", "Dimension", "Decorations", "Extra"],
  "sg-video": ["General", "Dimension", "Decorations", "Extra"],
  "sg-divider": ["General", "Dimension", "Decorations", "Extra"],
  "sg-spacer": ["Dimension"],
  "sg-icon": ["General", "Dimension", "Typography", "Decorations", "Extra"],
  "sg-button": ["General", "Dimension", "Typography", "Decorations", "Extra"],
  "sg-section": ["General", "Dimension", "Typography", "Decorations", "Flex", "Extra"],
  "sg-container": ["General", "Dimension", "Typography", "Decorations", "Flex", "Extra"],
  "sg-column": ["General", "Dimension", "Typography", "Decorations", "Flex", "Extra"]
};
function Ft(t, e) {
  t.innerHTML = "";
  const o = e.getSelected();
  if (!o) {
    t.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-paint-brush"></i><span>Select an element</span></div>';
    return;
  }
  Mt(t, e);
  function n() {
    const a = t.querySelector(".sg-section-state-wrap");
    t.innerHTML = "", a && t.appendChild(a);
    const s = e.StyleManager.getSectors({ visible: !0 });
    if (!s || s.length === 0) {
      const m = document.createElement("div");
      m.className = "sg-empty-state", m.innerHTML = '<i class="fa-solid fa-paint-brush"></i><span>No style properties</span>', t.appendChild(m);
      return;
    }
    const l = (o == null ? void 0 : o.get("type")) || "", r = zt[l];
    s.forEach((m) => {
      var f, v;
      const g = ((f = m.getName) == null ? void 0 : f.call(m)) || m.get("name") || "Styles";
      if (r && !r.includes(g)) return;
      const u = ((v = m.getProperties) == null ? void 0 : v.call(m)) || m.get("properties") || [];
      if (u.length === 0) return;
      const c = document.createElement("div");
      c.className = "sg-ctrl-section";
      const d = document.createElement("div");
      d.className = "sg-ctrl-section-header", d.innerHTML = `
        <span class="sg-ctrl-section-title">${Dt(g)}</span>
        <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
      `, d.addEventListener("click", () => {
        c.classList.toggle("collapsed");
      });
      const p = document.createElement("div");
      p.className = "sg-ctrl-section-body", u.forEach((y) => {
        ne(p, y, e);
      }), c.appendChild(d), c.appendChild(p), t.appendChild(c);
    });
  }
  n();
}
function ne(t, e, o) {
  var s, l, r, m;
  const n = ((s = e.getType) == null ? void 0 : s.call(e)) || e.get("type") || "text", a = ((l = e.getName) == null ? void 0 : l.call(e)) || e.get("property") || "", i = ((r = e.getLabel) == null ? void 0 : r.call(e)) || e.get("label") || a;
  if (a === "box-shadow") {
    Ht(t, o);
    return;
  }
  if (a === "background-image") {
    Wt(t, o);
    return;
  }
  switch (n) {
    case "number":
    case "integer":
    case "slider": {
      $(t, e, i);
      break;
    }
    case "composite": {
      (((m = e.getProperties) == null ? void 0 : m.call(e)) || []).length === 4 && Yt(a) ? Q(t, e, i) : Xt(t, e, i, o);
      break;
    }
    case "stack": {
      Zt(t, e, i, o);
      break;
    }
    case "select":
    case "radio": {
      const g = qt[a];
      g ? Ee(t, e, i, g) : Gt(t, e, i);
      break;
    }
    case "color": {
      Tt(t, e, i);
      break;
    }
    case "file": {
      _(t, e, i);
      break;
    }
    default:
      Jt(t, e, i);
  }
}
function Wt(t, e) {
  var g;
  const o = document.createElement("div");
  o.className = "sg-ctrl-subsection";
  const n = document.createElement("div");
  function a(u) {
    const c = u.match(/url\(["']?([^"')]+)["']?\)/);
    return c ? c[1] : "";
  }
  function i(u) {
    u.components().filter((p) => {
      var f;
      return ((f = p.get("attributes")) == null ? void 0 : f["data-bg-video-el"]) === "1";
    }).forEach((p) => p.remove());
  }
  function s(u, c) {
    if (i(u), !c.trim()) {
      u.removeAttributes("data-bg-video");
      return;
    }
    u.addAttributes({ "data-bg-video": c.trim() }), u.addStyle({ position: "relative", overflow: "hidden" }), u.components().add({
      tagName: "video",
      type: "video",
      attributes: {
        src: c.trim(),
        autoplay: !0,
        muted: !0,
        loop: !0,
        playsinline: "",
        "data-bg-video-el": "1"
      },
      style: {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        "object-fit": "cover",
        "z-index": "0",
        "pointer-events": "none"
      },
      draggable: !1,
      droppable: !1,
      selectable: !1,
      hoverable: !1,
      badgable: !1,
      layerable: !1
    }, { at: 0 });
  }
  function l(u) {
    var d;
    n.innerHTML = "";
    const c = e.getSelected();
    u !== "video" && c && ((d = c.get("attributes")) != null && d["data-bg-video"]) && (i(c), c.removeAttributes("data-bg-video")), u === "gradient" ? Pt(n, e) : u === "classic" ? _(n, {
      getValue: () => {
        const p = e.getSelected();
        return p ? a(String(p.getStyle("background-image") || "")) : "";
      },
      upValue: (p) => {
        const f = e.getSelected();
        if (!f) return;
        const v = p.trim() ? `url("${p.trim()}")` : "none";
        f.addStyle({ "background-image": v });
      }
    }, "Image URL") : u === "video" ? _(n, {
      getValue: () => {
        var f;
        const p = e.getSelected();
        return p && ((f = p.get("attributes")) == null ? void 0 : f["data-bg-video"]) || "";
      },
      upValue: (p) => {
        const f = e.getSelected();
        f && s(f, p);
      }
    }, "Video URL") : u === "slideshow" && Ut(n, e);
  }
  let r = "classic";
  const m = e.getSelected();
  m && (String(m.getStyle("background-image") || "").includes("gradient") && (r = "gradient"), (g = m.get("attributes")) != null && g["data-bg-video"] && (r = "video")), It(o, e, (u) => {
    l(u);
  }, r), l(r), o.appendChild(n), t.appendChild(o);
}
function Ut(t, e) {
  var l;
  const o = e.getSelected();
  if (!o) return;
  let n = [];
  try {
    const r = (l = o.get("attributes")) == null ? void 0 : l["data-bg-slides"];
    r && (n = JSON.parse(r));
  } catch {
  }
  n.length === 0 && (n = [""]);
  const a = document.createElement("div");
  a.className = "sg-ctrl-subsection";
  function i() {
    const r = n.filter((m) => m.trim());
    o.addAttributes({ "data-bg-slides": JSON.stringify(r) });
  }
  function s() {
    a.innerHTML = "", n.forEach((g, u) => {
      const c = document.createElement("div");
      c.className = "sg-ctrl-row";
      const d = document.createElement("label");
      d.className = "sg-ctrl-label", d.textContent = `Slide ${u + 1}`;
      const p = document.createElement("div");
      p.className = "sg-ctrl-field", p.style.gap = "4px";
      const f = document.createElement("input");
      f.className = "sg-input", f.type = "text", f.placeholder = "Image URL...", f.value = g, f.addEventListener("change", () => {
        n[u] = f.value, i();
      });
      const v = document.createElement("button");
      v.className = "sg-edim-unit-btn", v.innerHTML = '<i class="fa-solid fa-trash-can"></i>', v.title = "Remove slide", v.addEventListener("click", () => {
        n.splice(u, 1), n.length === 0 && (n = [""]), i(), s();
      }), p.appendChild(f), p.appendChild(v), c.appendChild(d), c.appendChild(p), a.appendChild(c);
    });
    const r = document.createElement("div");
    r.className = "sg-ctrl-row";
    const m = document.createElement("button");
    m.className = "sg-edim-unit-btn", m.style.marginLeft = "auto", m.innerHTML = '<i class="fa-solid fa-plus"></i> Add Slide', m.addEventListener("click", () => {
      n.push(""), s();
    }), r.appendChild(m), a.appendChild(r);
  }
  s(), t.appendChild(a);
}
function Gt(t, e, o) {
  var r, m;
  const n = document.createElement("div");
  n.className = "sg-ctrl-row";
  const a = document.createElement("label");
  a.className = "sg-ctrl-label", a.textContent = o;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const s = document.createElement("select");
  s.className = "sg-select", (((r = e.getOptions) == null ? void 0 : r.call(e)) || e.get("options") || e.get("list") || []).forEach((g) => {
    const u = document.createElement("option");
    typeof g == "string" ? (u.value = g, u.textContent = g) : (u.value = g.id ?? g.value ?? "", u.textContent = g.label || g.name || u.value), s.appendChild(u);
  }), s.value = ((m = e.getValue) == null ? void 0 : m.call(e)) ?? "", s.addEventListener("change", () => {
    e.upValue(s.value);
  }), i.appendChild(s), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function _(t, e, o) {
  var l;
  const n = document.createElement("div");
  n.className = "sg-ctrl-row";
  const a = document.createElement("label");
  a.className = "sg-ctrl-label", a.textContent = o;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const s = document.createElement("input");
  s.className = "sg-input", s.type = "text", s.placeholder = "URL or upload...", s.value = ((l = e.getValue) == null ? void 0 : l.call(e)) ?? "", s.addEventListener("change", () => {
    e.upValue(s.value);
  }), i.appendChild(s), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function Yt(t) {
  return ["margin", "padding", "border-radius"].includes(t);
}
function Xt(t, e, o, n) {
  var r;
  const a = document.createElement("div");
  a.className = "sg-ctrl-subsection";
  const i = document.createElement("div");
  i.className = "sg-ctrl-row";
  const s = document.createElement("label");
  s.className = "sg-ctrl-label", s.style.fontWeight = "600", s.textContent = o, i.appendChild(s), a.appendChild(i), (((r = e.getProperties) == null ? void 0 : r.call(e)) || []).forEach((m) => {
    ne(a, m, n);
  }), t.appendChild(a);
}
function Zt(t, e, o, n) {
  var m;
  const a = document.createElement("div");
  a.className = "sg-ctrl-subsection";
  const i = document.createElement("div");
  i.className = "sg-ctrl-row", i.style.alignItems = "center";
  const s = document.createElement("label");
  s.className = "sg-ctrl-label", s.style.fontWeight = "600", s.textContent = o;
  const l = document.createElement("button");
  l.className = "sg-edim-unit-btn", l.innerHTML = '<i class="fa-solid fa-plus"></i>', l.title = "Add layer", l.addEventListener("click", () => {
    var g;
    (g = e.addLayer) == null || g.call(e, {}, { at: 0 });
  }), i.appendChild(s), i.appendChild(l), a.appendChild(i);
  const r = ((m = e.getLayers) == null ? void 0 : m.call(e)) || [];
  if (r.length === 0) {
    const g = document.createElement("div");
    g.className = "sg-empty-state", g.style.padding = "8px", g.innerHTML = '<span style="font-size:11px;opacity:0.6">No layers — click + to add</span>', a.appendChild(g);
  }
  r.forEach((g, u) => {
    var y;
    const c = document.createElement("div");
    c.className = "sg-stack-layer";
    const d = document.createElement("div");
    d.className = "sg-ctrl-row", d.style.alignItems = "center";
    const p = document.createElement("span");
    p.className = "sg-ctrl-label", p.style.fontSize = "10px", p.style.opacity = "0.7", p.textContent = `Layer ${u + 1}`;
    const f = document.createElement("button");
    f.className = "sg-edim-unit-btn", f.innerHTML = '<i class="fa-solid fa-trash-can"></i>', f.title = "Remove layer", f.style.fontSize = "10px", f.addEventListener("click", () => {
      var h;
      (h = e.removeLayer) == null || h.call(e, g);
    }), d.appendChild(p), d.appendChild(f), c.appendChild(d), (((y = g.getProperties) == null ? void 0 : y.call(g)) || []).forEach((h) => {
      ne(c, h, n);
    }), a.appendChild(c);
  }), t.appendChild(a);
}
function Jt(t, e, o) {
  var l;
  const n = document.createElement("div");
  n.className = "sg-ctrl-row";
  const a = document.createElement("label");
  a.className = "sg-ctrl-label", a.textContent = o;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const s = document.createElement("input");
  s.className = "sg-input", s.type = "text", s.value = ((l = e.getValue) == null ? void 0 : l.call(e)) ?? "", s.addEventListener("change", () => {
    e.upValue(s.value);
  }), i.appendChild(s), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
const Kt = ["top", "right", "bottom", "left"];
function Qt(t, e) {
  const o = e.getSelected();
  if (!o) return;
  const n = document.createElement("div");
  n.className = "sg-spacing-box";
  const a = document.createElement("div");
  a.className = "sg-spacing-box-margin";
  const i = document.createElement("span");
  i.className = "sg-spacing-box-label margin-label", i.textContent = "margin", a.appendChild(i);
  const s = document.createElement("div");
  s.className = "sg-spacing-box-padding";
  const l = document.createElement("span");
  l.className = "sg-spacing-box-label padding-label", l.textContent = "padding", s.appendChild(l);
  const r = document.createElement("div");
  r.className = "sg-spacing-box-content", r.textContent = "content";
  const m = {
    top: { top: "4px", left: "50%" },
    right: { top: "50%", left: "calc(100% - 38px)" },
    bottom: { top: "calc(100% - 22px)", left: "50%" },
    left: { top: "50%", left: "6px" }
  }, g = {
    top: { top: "32px", left: "50%" },
    right: { top: "50%", left: "calc(100% - 72px)" },
    bottom: { top: "calc(100% - 50px)", left: "50%" },
    left: { top: "50%", left: "44px" }
  };
  Kt.forEach((u) => {
    const c = document.createElement("input");
    c.type = "number";
    const d = m[u];
    c.style.top = d.top, c.style.left = d.left, u === "top" || u === "bottom" ? c.style.transform = "translateX(-50%)" : c.style.transform = "translateY(-50%)";
    const p = o.getStyle(`margin-${u}`) || "0";
    c.value = String(parseInt(String(p)) || 0), c.addEventListener("change", () => {
      o.addStyle({ [`margin-${u}`]: `${c.value}px` });
    }), n.appendChild(c);
    const f = document.createElement("input");
    f.type = "number";
    const v = g[u];
    f.style.top = v.top, f.style.left = v.left, u === "top" || u === "bottom" ? f.style.transform = "translateX(-50%)" : f.style.transform = "translateY(-50%)";
    const y = o.getStyle(`padding-${u}`) || "0";
    f.value = String(parseInt(String(y)) || 0), f.addEventListener("change", () => {
      o.addStyle({ [`padding-${u}`]: `${f.value}px` });
    }), n.appendChild(f);
  }), n.appendChild(a), n.appendChild(s), n.appendChild(r), t.appendChild(n);
}
function Le(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const $t = [
  { value: "auto", icon: "fa-solid fa-a", title: "Auto" },
  { value: "flex-start", icon: "fa-solid fa-align-left", title: "Start" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "flex-end", icon: "fa-solid fa-align-right", title: "End" },
  { value: "stretch", icon: "fa-solid fa-up-down", title: "Stretch" }
];
function _t(t, e) {
  t.innerHTML = "";
  const o = e.getSelected();
  if (!o) {
    t.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-cog"></i><span>Select an element</span></div>';
    return;
  }
  en(t, e), tn(t, e, o), nn(t, e, o), an(t, e, o), sn(t, e, o);
}
function en(t, e, o) {
  const n = document.createElement("div");
  n.className = "sg-ctrl-section";
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-header", a.innerHTML = `
    <span class="sg-ctrl-section-title">Layout</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, a.addEventListener("click", () => n.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body", Qt(i, e);
  const s = e.StyleManager, l = s.getProperty("General", "margin") || s.getProperty("general", "margin");
  l ? Q(i, l, "Margin") : ye(i, e, "margin", "Margin");
  const r = s.getProperty("General", "padding") || s.getProperty("general", "padding");
  r ? Q(i, r, "Padding") : ye(i, e, "padding", "Padding");
  const m = s.getProperty("Flex", "align-self") || s.getProperty("flex", "align-self");
  m && Ee(i, m, "Align Self", $t);
  const g = s.getProperty("Flex", "order") || s.getProperty("flex", "order");
  g && $(i, g, "Order"), ["flex-grow", "flex-shrink", "flex-basis"].forEach((u) => {
    const c = s.getProperty("Flex", u) || s.getProperty("flex", u);
    c && $(i, c, u.replace("flex-", "").replace(/^\w/, (d) => d.toUpperCase()));
  }), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function ye(t, e, o, n) {
  const a = ["top", "right", "bottom", "left"], i = document.createElement("div");
  i.className = "sg-edim-wrap";
  const s = document.createElement("div");
  s.className = "sg-edim-header", s.innerHTML = `<span class="sg-edim-label">${Le(n)}</span>`, i.appendChild(s);
  const l = document.createElement("div");
  l.className = "sg-edim-inputs";
  const r = e.getSelected();
  a.forEach((m) => {
    const g = document.createElement("div");
    g.className = "sg-edim-input-wrap";
    const u = document.createElement("input");
    u.className = "sg-edim-input", u.type = "number";
    const c = (r == null ? void 0 : r.getStyle(`${o}-${m}`)) || "";
    u.value = parseInt(c) ? String(parseInt(c)) : "0", u.addEventListener("change", () => {
      r && r.addStyle({ [`${o}-${m}`]: `${u.value}px` });
    });
    const d = document.createElement("span");
    d.className = "sg-edim-input-label", d.textContent = m[0].toUpperCase(), g.appendChild(u), g.appendChild(d), l.appendChild(g);
  }), i.appendChild(l), t.appendChild(i);
}
function tn(t, e, o) {
  const n = document.createElement("div");
  n.className = "sg-ctrl-section";
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-header", a.innerHTML = `
    <span class="sg-ctrl-section-title">Positioning</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, a.addEventListener("click", () => n.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body";
  const s = document.createElement("div");
  s.className = "sg-ctrl-row";
  const l = document.createElement("label");
  l.className = "sg-ctrl-label", l.textContent = "Position";
  const r = document.createElement("div");
  r.className = "sg-ctrl-field";
  const m = document.createElement("select");
  m.className = "sg-select", ["static", "relative", "absolute", "fixed", "sticky"].forEach((u) => {
    const c = document.createElement("option");
    c.value = u, c.textContent = u.charAt(0).toUpperCase() + u.slice(1), m.appendChild(c);
  });
  const g = o.getStyle("position") || "static";
  m.value = g, m.addEventListener("change", () => {
    o.addStyle({ position: m.value });
  }), r.appendChild(m), s.appendChild(l), s.appendChild(r), i.appendChild(s), ["top", "right", "bottom", "left", "z-index"].forEach((u) => {
    const c = document.createElement("div");
    c.className = "sg-ctrl-row";
    const d = document.createElement("label");
    d.className = "sg-ctrl-label", d.textContent = u === "z-index" ? "Z-Index" : u.charAt(0).toUpperCase() + u.slice(1);
    const p = document.createElement("div");
    p.className = "sg-ctrl-field";
    const f = document.createElement("input");
    f.className = "sg-input sg-input-number", f.type = "number";
    const v = o.getStyle(u) || "";
    f.value = parseInt(v) ? String(parseInt(v)) : "", f.placeholder = "auto", f.addEventListener("change", () => {
      if (f.value === "")
        o.removeStyle(u);
      else {
        const y = u === "z-index" ? "" : "px";
        o.addStyle({ [u]: `${f.value}${y}` });
      }
    }), p.appendChild(f), c.appendChild(d), c.appendChild(p), i.appendChild(c);
  }), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function nn(t, e, o) {
  const n = document.createElement("div");
  n.className = "sg-ctrl-section";
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-header", a.innerHTML = `
    <span class="sg-ctrl-section-title">Responsive</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, a.addEventListener("click", () => n.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body", [
    { label: "Desktop", icon: "fa-solid fa-desktop", className: "sg-hide-desktop" },
    { label: "Tablet", icon: "fa-solid fa-tablet-screen-button", className: "sg-hide-tablet" },
    { label: "Mobile", icon: "fa-solid fa-mobile-screen-button", className: "sg-hide-mobile" }
  ].forEach((l) => {
    var v;
    const r = document.createElement("div");
    r.className = "sg-ctrl-row";
    const m = document.createElement("label");
    m.className = "sg-ctrl-label", m.innerHTML = `<i class="${l.icon}" style="margin-right:4px"></i> ${Le(l.label)}`;
    const g = document.createElement("div");
    g.className = "sg-ctrl-field";
    const u = document.createElement("label");
    u.className = "sg-toggle-switch";
    const c = document.createElement("input");
    c.type = "checkbox";
    const d = ((v = o.getClasses) == null ? void 0 : v.call(o)) || [];
    c.checked = !d.includes(l.className);
    const p = document.createElement("span");
    p.className = "sg-toggle-switch-track";
    const f = document.createElement("span");
    f.className = "sg-toggle-switch-thumb", p.appendChild(f), u.appendChild(c), u.appendChild(p), c.addEventListener("change", () => {
      c.checked ? o.removeClass(l.className) : o.addClass(l.className);
    }), g.appendChild(u), r.appendChild(m), r.appendChild(g), i.appendChild(r);
  }), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function an(t, e, o) {
  var v, y;
  const n = document.createElement("div");
  n.className = "sg-ctrl-section";
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-header", a.innerHTML = `
    <span class="sg-ctrl-section-title">Attributes</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, a.addEventListener("click", () => n.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body";
  const s = document.createElement("div");
  s.className = "sg-ctrl-row";
  const l = document.createElement("label");
  l.className = "sg-ctrl-label", l.textContent = "CSS ID";
  const r = document.createElement("div");
  r.className = "sg-ctrl-field";
  const m = document.createElement("input");
  m.className = "sg-input", m.type = "text", m.placeholder = "e.g. my-section";
  const g = ((v = o.getAttributes) == null ? void 0 : v.call(o)) || {};
  m.value = g.id || "", m.addEventListener("change", () => {
    o.addAttributes({ id: m.value || "" });
  }), r.appendChild(m), s.appendChild(l), s.appendChild(r), i.appendChild(s);
  const u = document.createElement("div");
  u.className = "sg-ctrl-row";
  const c = document.createElement("label");
  c.className = "sg-ctrl-label", c.textContent = "CSS Classes";
  const d = document.createElement("div");
  d.className = "sg-ctrl-field";
  const p = document.createElement("input");
  p.className = "sg-input", p.type = "text", p.placeholder = "e.g. my-class another-class";
  const f = ((y = o.getClasses) == null ? void 0 : y.call(o)) || [];
  p.value = f.join(" "), p.addEventListener("change", () => {
    f.forEach((k) => o.removeClass(k)), p.value.trim().split(/\s+/).filter(Boolean).forEach((k) => o.addClass(k));
  }), d.appendChild(p), u.appendChild(c), u.appendChild(d), i.appendChild(u), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
function sn(t, e, o) {
  const n = document.createElement("div");
  n.className = "sg-ctrl-section";
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-header", a.innerHTML = `
    <span class="sg-ctrl-section-title">Custom CSS</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, a.addEventListener("click", () => n.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body";
  const s = document.createElement("textarea");
  s.className = "sg-css-textarea", s.placeholder = `/* Add custom CSS here */
selector {
  
}`, s.spellcheck = !1;
  const l = o.get("custom-css") || "";
  s.value = l;
  let r;
  s.addEventListener("input", () => {
    clearTimeout(r), r = setTimeout(() => {
      o.set("custom-css", s.value);
      try {
        const m = s.value.match(/\{([^}]+)\}/);
        if (m) {
          const g = {};
          m[1].split(";").forEach((u) => {
            const [c, d] = u.split(":").map((p) => p.trim());
            c && d && (g[c] = d);
          }), Object.keys(g).length > 0 && o.addStyle(g);
        }
      } catch {
      }
    }, 500);
  }), i.appendChild(s), n.appendChild(a), n.appendChild(i), t.appendChild(n);
}
let G = !1;
window.__sgEditing = {
  get interacting() {
    return G;
  },
  set interacting(t) {
    G = t;
  }
};
function on(t, e) {
  let o = "content", n = null;
  function a() {
    return (!n || !n.isConnected) && (n = t.querySelector("#sg-edit-body")), n;
  }
  function i() {
    const r = a();
    if (!(!r || (r.innerHTML = "", !e.getSelected())))
      switch (o) {
        case "content":
          Lt(r, e);
          break;
        case "style":
          Ft(r, e);
          break;
        case "advanced":
          _t(r, e);
          break;
      }
  }
  t.addEventListener("sg:tab-change", ((r) => {
    o = r.detail.tab, i();
  })), e.on("component:selected", () => {
    o = "content", requestAnimationFrame(() => {
      n = null, i();
    });
  });
  let s = null;
  e.on("style:custom", () => {
    if (o === "style") {
      if (G) return;
      s && clearTimeout(s), s = setTimeout(() => {
        i(), s = null;
      }, 100);
    }
  });
  let l = null;
  e.on("trait:custom", () => {
    if (o === "content") {
      if (G) return;
      l && clearTimeout(l), l = setTimeout(() => {
        i(), l = null;
      }, 100);
    }
  });
}
const xe = {
  wrapper: "fa-regular fa-square",
  default: "fa-regular fa-square",
  "sg-section": "fa-regular fa-square-full",
  "sg-container": "fa-solid fa-border-all",
  "sg-column": "fa-solid fa-table-columns",
  "sg-heading": "fa-solid fa-t",
  "sg-text": "fa-solid fa-align-left",
  "sg-image": "fa-regular fa-image",
  "sg-video": "fa-solid fa-film",
  "sg-button": "fa-regular fa-hand-pointer",
  "sg-divider": "fa-solid fa-grip-lines",
  "sg-spacer": "fa-solid fa-arrows-up-down",
  "sg-icon": "fa-regular fa-star",
  "sg-icon-box": "fa-regular fa-object-group",
  "sg-accordion": "fa-solid fa-bars-staggered",
  "sg-tabs": "fa-regular fa-window-maximize",
  "sg-form": "fa-regular fa-rectangle-list",
  "sg-input": "fa-regular fa-keyboard",
  "sg-textarea": "fa-solid fa-align-left",
  "sg-select": "fa-solid fa-list-dropdown",
  "sg-checkbox": "fa-regular fa-square-check",
  "sg-radio": "fa-regular fa-circle-dot",
  "sg-submit": "fa-regular fa-paper-plane",
  text: "fa-solid fa-align-left",
  textnode: "fa-solid fa-align-left",
  image: "fa-regular fa-image",
  video: "fa-solid fa-film",
  link: "fa-solid fa-arrow-up-right-from-square",
  map: "fa-solid fa-map-location-dot",
  table: "fa-solid fa-table",
  row: "fa-solid fa-grip-lines",
  cell: "fa-regular fa-square",
  section: "fa-regular fa-square-full",
  container: "fa-solid fa-border-all",
  column: "fa-solid fa-table-columns",
  form: "fa-regular fa-rectangle-list",
  input: "fa-regular fa-keyboard",
  textarea: "fa-solid fa-align-left",
  select: "fa-solid fa-caret-down",
  button: "fa-regular fa-hand-pointer",
  label: "fa-solid fa-tag",
  checkbox: "fa-regular fa-square-check",
  radio: "fa-regular fa-circle-dot"
};
function ln(t) {
  return xe[t] || xe.default;
}
function rn(t, e) {
  const o = document.createElement("div");
  o.className = "sg-navigator-header", o.innerHTML = `
    <span class="sg-navigator-header-icon"><i class="fa-solid fa-bars-staggered"></i></span>
    <span class="sg-navigator-title">Structure</span>
    <button class="sg-navigator-close" title="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `, o.querySelector(".sg-navigator-close").addEventListener("click", () => {
    t.classList.remove("open");
    const r = document.querySelector('.sg-topbar-icon-btn[data-cmd="toggle-navigator"]');
    r == null || r.classList.remove("active");
  }), dn(o, t);
  const n = document.createElement("div");
  n.className = "sg-navigator-resize", cn(n, t);
  const a = document.createElement("div");
  a.className = "sg-navigator-body", t.appendChild(n), t.appendChild(o), t.appendChild(a);
  const i = /* @__PURE__ */ new Set();
  function s() {
    a.innerHTML = "";
    const r = e.getWrapper();
    if (!r) return;
    const m = r.components();
    l(a, m, 0);
  }
  function l(r, m, g) {
    m.forEach((u) => {
      var V;
      const c = u.getId(), d = u.get("type") || u.get("tagName") || "div", p = ((V = u.getName) == null ? void 0 : V.call(u)) || d, f = u.components(), v = f && f.length > 0, y = i.has(c), h = e.getSelected() === u, k = u.getStyle("display") !== "none", L = document.createElement("div");
      L.className = "sg-layer-item", h && L.classList.add("selected"), L.style.paddingLeft = `${8 + g * 16}px`;
      const b = document.createElement("button");
      b.className = "sg-layer-toggle", v || b.classList.add("empty"), y && b.classList.add("collapsed"), b.innerHTML = '<i class="fa-solid fa-caret-down"></i>', b.addEventListener("click", (T) => {
        T.stopPropagation(), y ? i.delete(c) : i.add(c), s();
      });
      const x = document.createElement("span");
      x.className = "sg-layer-icon", x.innerHTML = `<i class="${ln(d)}"></i>`;
      const S = document.createElement("span");
      S.className = "sg-layer-name", S.textContent = p, S.addEventListener("dblclick", (T) => {
        T.stopPropagation();
        const N = document.createElement("input");
        N.className = "sg-layer-name-input", N.value = p, S.replaceWith(N), N.focus(), N.select();
        const C = () => {
          const M = N.value.trim();
          M && u.set("custom-name", M), s();
        };
        N.addEventListener("blur", C), N.addEventListener("keydown", (M) => {
          M.key === "Enter" && C(), M.key === "Escape" && s();
        });
      });
      const E = document.createElement("button");
      if (E.className = "sg-layer-visibility", k || E.classList.add("hidden-layer"), E.innerHTML = k ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>', E.addEventListener("click", (T) => {
        T.stopPropagation(), k ? u.addStyle({ display: "none" }) : u.removeStyle("display"), s();
      }), L.addEventListener("click", () => {
        e.select(u);
      }), L.appendChild(b), L.appendChild(x), L.appendChild(S), L.appendChild(E), r.appendChild(L), v && !y) {
        const T = document.createElement("div");
        T.className = "sg-layer-children", l(T, f, g + 1), r.appendChild(T);
      }
    });
  }
  e.on("layer:custom", () => {
    s();
  }), e.on("component:selected component:deselected component:add component:remove component:drag:end", () => {
    s();
  }), e.on("load", () => s());
}
function cn(t, e) {
  let o = 0, n = 0, a = 0;
  t.addEventListener("pointerdown", (i) => {
    i.preventDefault(), t.setPointerCapture(i.pointerId);
    const s = e.getBoundingClientRect();
    o = i.clientY, n = s.height, a = s.top, e.style.right = "auto", e.style.bottom = "auto", e.style.left = s.left + "px", e.style.top = a + "px";
    const l = (m) => {
      const g = m.clientY - o, u = n - g, c = a + g;
      u >= 180 && c >= 0 && (e.style.height = u + "px", e.style.top = c + "px");
    }, r = () => {
      t.removeEventListener("pointermove", l), t.removeEventListener("pointerup", r);
    };
    t.addEventListener("pointermove", l), t.addEventListener("pointerup", r);
  });
}
function dn(t, e) {
  let o = 0, n = 0, a = 0, i = 0;
  t.addEventListener("pointerdown", (s) => {
    if (s.target.closest("button")) return;
    s.preventDefault(), t.setPointerCapture(s.pointerId);
    const l = e.getBoundingClientRect();
    o = s.clientX, n = s.clientY, a = l.left, i = l.top, e.style.right = "auto", e.style.bottom = "auto", e.style.left = a + "px", e.style.top = i + "px";
    const r = (g) => {
      const u = g.clientX - o, c = g.clientY - n;
      let d = a + u, p = i + c;
      d = Math.max(0, Math.min(d, window.innerWidth - 60)), p = Math.max(0, Math.min(p, window.innerHeight - 36)), e.style.left = d + "px", e.style.top = p + "px";
    }, m = () => {
      t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", m);
    };
    t.addEventListener("pointermove", r), t.addEventListener("pointerup", m);
  });
}
function Ce(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const pn = [
  {
    label: "Edit",
    icon: "fa-solid fa-pencil",
    action: (t, e) => {
      t.select(e);
    }
  },
  {
    label: "Duplicate",
    icon: "fa-solid fa-copy",
    shortcut: "Ctrl+D",
    action: (t, e) => {
      const o = e.parent();
      if (o) {
        const n = o.components().indexOf(e), a = e.clone();
        o.components().add(a, { at: n + 1 }), t.select(a);
      }
    }
  },
  {
    label: "Copy",
    icon: "fa-regular fa-copy",
    shortcut: "Ctrl+C",
    action: (t, e) => {
      t.runCommand("sg:copy");
    }
  },
  { label: "", icon: "", separator: !0 },
  {
    label: "Move Up",
    icon: "fa-solid fa-arrow-up",
    action: (t, e) => {
      e.move(e.parent(), { at: e.index() - 1 });
    }
  },
  {
    label: "Move Down",
    icon: "fa-solid fa-arrow-down",
    action: (t, e) => {
      e.move(e.parent(), { at: e.index() + 2 });
    }
  },
  {
    label: "Select Parent",
    icon: "fa-solid fa-arrow-turn-up",
    action: (t, e) => {
      const o = e.parent();
      o && o !== t.getWrapper() && t.select(o);
    }
  },
  { label: "", icon: "", separator: !0 },
  {
    label: "Edit with AI",
    icon: "fa-solid fa-wand-magic-sparkles",
    action: (t, e) => {
      const o = t.__sgAiConfig;
      o && (t.select(e), import("./ai-chat-modal-lx7mxcPS.js").then(({ openAiChatModal: n }) => {
        n(t, o, { mode: "edit", targetComponent: e });
      }));
    },
    disabled: !1
  },
  { label: "", icon: "", separator: !0 },
  {
    label: "Delete",
    icon: "fa-solid fa-trash",
    shortcut: "Del",
    danger: !0,
    action: (t, e) => {
      e.remove(), t.select(null);
    }
  }
];
function un(t, e) {
  let o = null;
  function n(i, s, l) {
    o = l, t.innerHTML = "";
    const r = !!e.__sgAiConfig;
    pn.forEach((d) => {
      if (d.label === "Edit with AI" && !r) return;
      if (d.separator) {
        const f = document.createElement("div");
        f.className = "sg-context-menu-sep", t.appendChild(f);
        return;
      }
      const p = document.createElement("div");
      p.className = "sg-context-menu-item", d.danger && p.classList.add("danger"), d.disabled && p.classList.add("disabled"), p.innerHTML = `
        <span class="sg-context-menu-item-icon"><i class="${d.icon}"></i></span>
        <span class="sg-context-menu-item-label">${Ce(d.label)}</span>
        ${d.shortcut ? `<span class="sg-context-menu-item-shortcut">${Ce(d.shortcut)}</span>` : ""}
      `, p.addEventListener("click", () => {
        d.action && o && d.action(e, o), a();
      }), t.appendChild(p);
    });
    const m = 200, g = t.children.length * 32, u = i + m > window.innerWidth ? window.innerWidth - m - 8 : i, c = s + g > window.innerHeight ? window.innerHeight - g - 8 : s;
    t.style.left = `${u}px`, t.style.top = `${c}px`, t.classList.add("open");
  }
  function a() {
    t.classList.remove("open"), o = null;
  }
  e.on("load", () => {
    const i = e.Canvas.getDocument();
    i && i.addEventListener("contextmenu", (s) => {
      const l = s;
      l.preventDefault();
      const m = e.Canvas.getElement().getBoundingClientRect(), g = l.target;
      if (g) {
        const u = e.Components.getById(g.id) || mn(e, g);
        u && (e.select(u), n(l.clientX + m.left, l.clientY + m.top, u));
      }
    });
  }), document.addEventListener("click", (i) => {
    t.contains(i.target) || a();
  }), document.addEventListener("keydown", (i) => {
    i.key === "Escape" && a();
  });
}
function mn(t, e) {
  const o = t.getWrapper();
  if (!o) return null;
  function n(a) {
    var l;
    if (((l = a.getEl) == null ? void 0 : l.call(a)) === e) return a;
    const s = a.components();
    if (s)
      for (let r = 0; r < s.length; r++) {
        const m = n(s.at(r));
        if (m) return m;
      }
    return null;
  }
  return n(o);
}
let q = [];
function gn(t, e = []) {
  const o = t.Modal;
  o.setTitle("Templates");
  const n = document.createElement("div");
  n.className = "sg-template-modal";
  const a = [...e, ...q];
  ae(n, a, t), o.setContent(n), o.open();
}
function ae(t, e, o) {
  t.innerHTML = "";
  const n = document.createElement("style");
  n.textContent = `
    .sg-template-modal {
      min-height: 300px;
      font-family: var(--sg-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }
    .sg-template-toolbar {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .sg-template-toolbar-btn {
      padding: 8px 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      border: 1px solid var(--sg-border, #3a3c3f) !important;
      background: var(--sg-bg-3, #282a2e) !important;
      color: var(--sg-text, #e0e0e0) !important;
      transition: background 0.15s !important;
    }
    .sg-template-toolbar-btn:hover {
      background: var(--sg-bg-4, #464646) !important;
    }
    .sg-template-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 16px;
      color: var(--sg-text-dim, #5e5e64);
    }
    .sg-template-empty i {
      font-size: 40px;
      opacity: 0.4;
    }
    .sg-template-empty-text {
      font-size: 14px;
      text-align: center;
    }
    .sg-template-add-btn {
      padding: 10px 24px !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      background: var(--sg-accent, #c0392b) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      transition: background 0.15s !important;
    }
    .sg-template-add-btn:hover {
      background: var(--sg-accent-hover, #e04535) !important;
    }
    .sg-template-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sg-template-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: var(--sg-bg-3, #282a2e);
      border: 1px solid var(--sg-border, #3a3c3f);
      border-radius: 2px;
      gap: 12px;
    }
    .sg-template-item-icon {
      font-size: 20px;
      color: var(--sg-text-dim, #5e5e64);
      flex-shrink: 0;
    }
    .sg-template-item-info {
      flex: 1;
      min-width: 0;
    }
    .sg-template-item-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--sg-text, #e0e0e0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sg-template-item-date {
      font-size: 11px;
      color: var(--sg-text-dim, #5e5e64);
      margin-top: 2px;
    }
    .sg-template-item-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    .sg-template-insert-btn {
      padding: 6px 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      background: var(--sg-accent, #c0392b) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      transition: background 0.15s !important;
    }
    .sg-template-insert-btn:hover {
      background: var(--sg-accent-hover, #e04535) !important;
    }
    .sg-template-delete-btn {
      padding: 6px 10px !important;
      font-size: 12px !important;
      background: none !important;
      color: var(--sg-text-dim, #5e5e64) !important;
      border: 1px solid var(--sg-border, #3a3c3f) !important;
      border-radius: 2px !important;
      cursor: pointer !important;
      transition: color 0.15s, border-color 0.15s !important;
    }
    .sg-template-delete-btn:hover {
      color: #e74c3c !important;
      border-color: #e74c3c !important;
    }
  `, t.appendChild(n);
  const a = document.createElement("div");
  a.className = "sg-template-toolbar";
  const i = document.createElement("button");
  if (i.className = "sg-template-toolbar-btn", i.innerHTML = '<i class="fa-solid fa-file-import"></i> Upload HTML', i.addEventListener("click", () => we(t, e, o)), a.appendChild(i), t.appendChild(a), e.length === 0) {
    const s = document.createElement("div");
    s.className = "sg-template-empty", s.innerHTML = `
      <i class="fa-solid fa-folder-open"></i>
      <div class="sg-template-empty-text">No templates yet</div>
    `;
    const l = document.createElement("button");
    l.className = "sg-template-add-btn", l.innerHTML = '<i class="fa-solid fa-plus"></i> Add Template', l.addEventListener("click", () => we(t, e, o)), s.appendChild(l), t.appendChild(s);
  } else {
    const s = document.createElement("div");
    s.className = "sg-template-list";
    for (const l of e) {
      const r = document.createElement("div");
      r.className = "sg-template-item";
      const m = l.createdAt ? new Date(l.createdAt).toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      }) : "";
      r.innerHTML = `
        <i class="fa-solid fa-file-code sg-template-item-icon"></i>
        <div class="sg-template-item-info">
          <div class="sg-template-item-name">${fn(l.name)}</div>
          ${m ? `<div class="sg-template-item-date">${m}</div>` : ""}
        </div>
        <div class="sg-template-item-actions"></div>
      `;
      const g = r.querySelector(".sg-template-item-actions"), u = document.createElement("button");
      if (u.className = "sg-template-insert-btn", u.textContent = "Insert", u.addEventListener("click", () => {
        wn(o, l.data), o.Modal.close();
      }), g.appendChild(u), q.some((c) => c.id === l.id)) {
        const c = document.createElement("button");
        c.className = "sg-template-delete-btn", c.innerHTML = '<i class="fa-solid fa-trash-can"></i>', c.addEventListener("click", () => {
          q = q.filter((p) => p.id !== l.id);
          const d = [...e.filter((p) => p.id !== l.id)];
          ae(t, d, o);
        }), g.appendChild(c);
      }
      s.appendChild(r);
    }
    t.appendChild(s);
  }
}
function we(t, e, o) {
  const n = document.createElement("input");
  n.type = "file", n.accept = ".html,.htm", n.style.display = "none", n.addEventListener("change", () => {
    var s;
    const a = (s = n.files) == null ? void 0 : s[0];
    if (!a) return;
    const i = new FileReader();
    i.onload = () => {
      const l = i.result, r = a.name.replace(/\.(html|htm)$/i, ""), m = {
        id: "local-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        name: r,
        data: l,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      q.push(m);
      const g = [...e, m];
      ae(t, g, o);
    }, i.readAsText(a);
  }), document.body.appendChild(n), n.click(), n.remove();
}
function fn(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const R = "sg-canvas-ai-prompt";
function ke(t) {
  const e = t.getWrapper();
  return e ? e.components().length === 0 : !0;
}
function Se(t) {
  return t.__sgAiConfig || null;
}
function ee(t) {
  return ke(t) && !!Se(t);
}
function bn(t) {
  if (t.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) return;
  const e = t.createElement("link");
  e.rel = "stylesheet", e.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", t.head.appendChild(e);
}
const vn = `
  #${R} {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    pointer-events: auto;
    user-select: none;
    z-index: 100;
  }

  .sg-aip-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 10px;
    text-align: center;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }
  .sg-aip-title-accent {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
  }

  .sg-aip-subtitle {
    font-size: 15px;
    color: #6b7280;
    margin: 0 0 32px;
    text-align: center;
    max-width: 440px;
    line-height: 1.5;
  }

  /* --- Input bar --- */
  .sg-aip-bar {
    width: 100%;
    max-width: 580px;
    background: #1e1e2e;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  }

  .sg-aip-textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #e5e5e5;
    font-size: 15px;
    font-family: inherit;
    resize: none;
    line-height: 1.5;
    min-height: 24px;
    max-height: 120px;
    padding: 4px 4px 0;
    box-sizing: border-box;
  }
  .sg-aip-textarea::placeholder {
    color: #6b7280;
  }

  .sg-aip-bar-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sg-aip-bar-left {
    display: flex;
    gap: 4px;
    align-items: center;
    position: relative;
  }

  .sg-aip-icon-btn {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    transition: color 0.15s, background 0.15s;
    padding: 0;
  }
  .sg-aip-icon-btn:hover {
    color: #e5e5e5;
    background: rgba(255,255,255,0.08);
  }
  .sg-aip-icon-btn--recording {
    color: #ef4444 !important;
    animation: sg-aip-pulse 1s ease-in-out infinite;
  }
  @keyframes sg-aip-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .sg-aip-send-btn {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 6px;
    background: #c0392b;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: background 0.15s, transform 0.1s;
    padding: 0;
  }
  .sg-aip-send-btn:hover {
    background: #e74c3c;
  }
  .sg-aip-send-btn:active {
    transform: scale(0.93);
  }
  .sg-aip-send-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* --- Image preview --- */
  .sg-aip-img-preview {
    display: none;
    padding: 0 4px;
  }
  .sg-aip-img-preview--visible {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sg-aip-img-preview img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.15);
  }
  .sg-aip-img-remove {
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 4px;
    background: rgba(255,255,255,0.1);
    color: #e5e5e5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    padding: 0;
  }
  .sg-aip-img-remove:hover {
    background: rgba(255,255,255,0.2);
  }

  /* --- Suggestion chips --- */
  .sg-aip-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
    justify-content: center;
    max-width: 580px;
  }
  .sg-aip-chip {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 2px;
    background: #fff;
    color: #374151;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  .sg-aip-chip:hover {
    background: #fef2f2;
    border-color: #e8a59a;
    color: #c0392b;
  }

  /* --- Loading state --- */
  .sg-aip-loading {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .sg-aip-loading--visible {
    display: flex;
  }
  .sg-aip-loading-text {
    font-size: 16px;
    color: #1a1a2e;
    font-weight: 500;
  }
  .sg-aip-loading-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #c0392b;
    margin: 0 3px;
    animation: sg-aip-dot 1.2s ease-in-out infinite;
  }
  .sg-aip-loading-dots span:nth-child(2) { animation-delay: 0.15s; }
  .sg-aip-loading-dots span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes sg-aip-dot {
    0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
    40% { opacity: 1; transform: scale(1); }
  }

  /* --- Error state --- */
  .sg-aip-error {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    max-width: 480px;
    text-align: center;
  }
  .sg-aip-error--visible {
    display: flex;
  }
  .sg-aip-error-text {
    font-size: 14px;
    color: #dc2626;
    line-height: 1.5;
  }
  .sg-aip-retry-btn {
    padding: 8px 20px;
    border: 1px solid #d1d5db;
    border-radius: 2px;
    background: #fff;
    color: #374151;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
  }
  .sg-aip-retry-btn:hover {
    background: #fef2f2;
    border-color: #e8a59a;
  }

  /* --- Tooltip (unsupported model feedback) --- */
  .sg-aip-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    background: #1e1e2e;
    color: #fbbf24;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }
  .sg-aip-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 16px;
    border: 5px solid transparent;
    border-top-color: #1e1e2e;
  }
  .sg-aip-tooltip--visible {
    opacity: 1;
    transform: translateY(0);
  }
`, hn = [
  { label: "Landing Page", prompt: "A modern SaaS landing page with hero section, features grid, and pricing table" },
  { label: "Portfolio Website", prompt: "A creative portfolio page with project gallery, about section, and contact form" },
  { label: "Contact Page", prompt: "A professional contact page with contact form, company info, and embedded map placeholder" },
  { label: "Product Showcase", prompt: "A product showcase page with hero image, feature highlights, testimonials, and call to action" }
];
function yn(t) {
  const e = () => {
    var D;
    if (!ee(t)) return;
    const n = document.querySelector(".gjs-frame");
    if (!((D = n == null ? void 0 : n.contentDocument) != null && D.body)) return;
    const a = n.contentDocument;
    if (a.getElementById(R)) return;
    const i = Se(t);
    bn(a);
    const s = a.createElement("style");
    s.id = "sg-canvas-ai-prompt-styles", s.textContent = vn, a.head.appendChild(s);
    let l = null, r = !1, m = !1, g = null;
    const u = a.createElement("div");
    u.id = R;
    const c = a.createElement("div");
    c.style.cssText = "display:flex;flex-direction:column;align-items:center;width:100%;";
    const d = a.createElement("h1");
    d.className = "sg-aip-title", d.innerHTML = 'Build beautiful <span class="sg-aip-title-accent">pages</span> with AI';
    const p = a.createElement("p");
    p.className = "sg-aip-subtitle", p.textContent = "Describe what you want and Super Grapes will generate it";
    const f = a.createElement("div");
    f.className = "sg-aip-bar";
    const v = a.createElement("div");
    v.className = "sg-aip-img-preview";
    const y = a.createElement("textarea");
    y.className = "sg-aip-textarea", y.placeholder = "Describe the page you want to build...", y.rows = 1, y.addEventListener("input", () => {
      y.style.height = "auto", y.style.height = Math.min(y.scrollHeight, 120) + "px";
    });
    const h = a.createElement("div");
    h.className = "sg-aip-bar-footer";
    const k = a.createElement("div");
    k.className = "sg-aip-bar-left";
    const L = a.createElement("button");
    L.className = "sg-aip-icon-btn", L.title = "Attach reference image", L.innerHTML = '<i class="fa-solid fa-paperclip"></i>';
    const b = document.createElement("input");
    b.type = "file", b.accept = "image/*", b.style.display = "none", document.body.appendChild(b);
    const x = [
      "gpt-4o",
      "gpt-4-turbo",
      "gpt-4-vision",
      "claude-3",
      "claude-4",
      "gemini",
      "gemini-pro",
      "gemini-1.5",
      "gemini-2",
      "llava",
      "pixtral"
    ];
    function S() {
      const I = (i.model || "").toLowerCase();
      return x.some((B) => I.startsWith(B));
    }
    const E = a.createElement("div");
    E.className = "sg-aip-tooltip", E.textContent = `Model "${i.model}" may not support image inputs`, L.addEventListener("click", () => {
      if (!S()) {
        E.classList.add("sg-aip-tooltip--visible"), setTimeout(() => E.classList.remove("sg-aip-tooltip--visible"), 3e3);
        return;
      }
      b.click();
    }), b.addEventListener("change", () => {
      var j;
      const I = (j = b.files) == null ? void 0 : j[0];
      if (!I) return;
      const B = new FileReader();
      B.onload = () => {
        l = B.result, V();
      }, B.readAsDataURL(I), b.value = "";
    });
    function V() {
      if (!l) {
        v.className = "sg-aip-img-preview", v.innerHTML = "";
        return;
      }
      v.className = "sg-aip-img-preview sg-aip-img-preview--visible", v.innerHTML = "";
      const I = a.createElement("img");
      I.src = l;
      const B = a.createElement("button");
      B.className = "sg-aip-img-remove", B.innerHTML = '<i class="fa-solid fa-xmark"></i>', B.addEventListener("click", () => {
        l = null, V();
      }), v.appendChild(I), v.appendChild(B);
    }
    const T = window.SpeechRecognition || window.webkitSpeechRecognition;
    let N = null;
    T && (N = a.createElement("button"), N.className = "sg-aip-icon-btn", N.title = "Voice to text", N.innerHTML = '<i class="fa-solid fa-microphone"></i>', N.addEventListener("click", () => {
      if (m && g) {
        g.stop();
        return;
      }
      g = new T(), g.continuous = !1, g.interimResults = !1, g.lang = "en-US", g.onstart = () => {
        m = !0, N.classList.add("sg-aip-icon-btn--recording");
      }, g.onresult = (I) => {
        var j, z;
        const B = ((z = (j = I.results[0]) == null ? void 0 : j[0]) == null ? void 0 : z.transcript) || "";
        B && (y.value += (y.value ? " " : "") + B, y.dispatchEvent(new Event("input")));
      }, g.onend = () => {
        m = !1, N.classList.remove("sg-aip-icon-btn--recording"), g = null;
      }, g.onerror = () => {
        m = !1, N.classList.remove("sg-aip-icon-btn--recording"), g = null;
      }, g.start();
    })), k.appendChild(L), k.appendChild(E), N && k.appendChild(N);
    const C = a.createElement("button");
    C.className = "sg-aip-send-btn", C.title = "Generate (Enter)", C.innerHTML = '<i class="fa-solid fa-arrow-up"></i>', h.appendChild(k), h.appendChild(C), f.appendChild(v), f.appendChild(y), f.appendChild(h);
    const M = a.createElement("div");
    M.className = "sg-aip-chips";
    for (const I of hn) {
      const B = a.createElement("button");
      B.className = "sg-aip-chip", B.textContent = I.label, B.addEventListener("click", () => {
        y.value = I.prompt, y.dispatchEvent(new Event("input")), y.focus();
      }), M.appendChild(B);
    }
    c.appendChild(d), c.appendChild(p), c.appendChild(f), c.appendChild(M);
    const A = a.createElement("div");
    A.className = "sg-aip-loading", A.innerHTML = `
      <div class="sg-aip-loading-dots"><span></span><span></span><span></span></div>
      <div class="sg-aip-loading-text">Generating your page...</div>
    `;
    const w = a.createElement("div");
    w.className = "sg-aip-error";
    const H = a.createElement("div");
    H.className = "sg-aip-error-text";
    const O = a.createElement("button");
    O.className = "sg-aip-retry-btn", O.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Try Again', O.addEventListener("click", () => {
      w.classList.remove("sg-aip-error--visible"), c.style.display = "flex", y.focus();
    }), w.appendChild(H), w.appendChild(O), u.appendChild(c), u.appendChild(A), u.appendChild(w), a.body.appendChild(u), setTimeout(() => y.focus(), 100);
    async function P() {
      const I = y.value.trim();
      if (!(!I && !l) && !r) {
        r = !0, c.style.display = "none", w.classList.remove("sg-aip-error--visible"), A.classList.add("sg-aip-loading--visible");
        try {
          const { AiClient: B, extractHtmlFromResponse: j, validateHtml: z } = await import("./index-CMVVnGNL.js"), Te = new B(i), se = [];
          let Y;
          l ? Y = [
            { type: "text", text: I },
            { type: "image_url", image_url: { url: l } }
          ] : Y = I, se.push({ role: "user", content: Y });
          const Me = await Te.chat(se), oe = j(Me);
          if (z(oe))
            t.setComponents(oe);
          else
            throw new Error("The AI response did not contain valid HTML. Please try a more specific description.");
        } catch (B) {
          A.classList.remove("sg-aip-loading--visible"), H.textContent = (B == null ? void 0 : B.message) || "Something went wrong. Please try again.", w.classList.add("sg-aip-error--visible");
        } finally {
          r = !1;
        }
      }
    }
    y.addEventListener("keydown", (I) => {
      I.key === "Enter" && !I.shiftKey && (I.preventDefault(), P());
    }), C.addEventListener("click", P);
  };
  function o() {
    const n = document.querySelector(".gjs-frame");
    if (!(n != null && n.contentDocument)) return;
    const a = n.contentDocument.getElementById(R);
    a && a.remove();
    const i = n.contentDocument.getElementById("sg-canvas-ai-prompt-styles");
    i && i.remove(), document.querySelectorAll('input[type="file"][accept="image/*"]').forEach((s) => {
      s.style.display === "none" && !s.closest(".sg-modal") && s.remove();
    });
  }
  t.on("load", () => {
    setTimeout(e, 300);
  }), t.on("component:add", () => {
    setTimeout(() => {
      ke(t) || o();
    }, 50);
  }), t.on("component:remove", () => {
    setTimeout(() => {
      if (ee(t)) {
        const n = document.querySelector(".gjs-frame");
        n != null && n.contentDocument && !n.contentDocument.getElementById(R) && e();
      }
    }, 200);
  });
}
let Ne = [];
function Mn(t) {
  Ne = t;
}
function xn(t) {
  const e = () => {
    var s;
    if (ee(t)) return;
    const o = document.querySelector(".gjs-frame");
    if (!((s = o == null ? void 0 : o.contentDocument) != null && s.body)) return;
    const n = o.contentDocument;
    if (n.getElementById("sg-canvas-add-bar")) return;
    const a = n.createElement("style");
    a.textContent = `
      #sg-canvas-add-bar {
        width: 100%;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        pointer-events: auto;
        user-select: none;
      }
      .sg-add-bar-actions {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .sg-add-bar-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: transform 0.15s, box-shadow 0.15s;
        outline: none;
      }
      .sg-add-bar-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      }
      .sg-add-bar-btn:active {
        transform: scale(0.95);
      }
      .sg-add-bar-btn--templates {
        background: #c4bfb9;
        color: #222;
      }
      .sg-add-bar-btn--ai {
        background: #e4b8f0;
        color: #6b2d8b;
      }
      .sg-add-bar-label {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        color: #999;
        letter-spacing: 0.3px;
      }
    `, n.head.appendChild(a);
    const i = n.createElement("div");
    i.id = "sg-canvas-add-bar", i.innerHTML = `
      <div class="sg-add-bar-actions">
        <button class="sg-add-bar-btn sg-add-bar-btn--templates" data-action="templates" title="Templates">
          <i class="fa-solid fa-folder"></i>
        </button>
        <button class="sg-add-bar-btn sg-add-bar-btn--ai" data-action="ai" title="AI Generate">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </button>
      </div>
      <span class="sg-add-bar-label">Drag widget here</span>
    `, Ln(n), n.body.appendChild(i), i.addEventListener("click", (l) => {
      const r = l.target.closest(".sg-add-bar-btn");
      if (!r) return;
      const m = r.dataset.action;
      if (m === "templates")
        gn(t, Ne);
      else if (m === "ai") {
        const g = t.__sgAiConfig;
        g ? import("./ai-chat-modal-lx7mxcPS.js").then(({ openAiChatModal: u }) => {
          u(t, g, "append");
        }) : Cn(t);
      }
    });
  };
  t.on("load", () => {
    setTimeout(e, 300);
  }), t.on("component:add component:remove", () => {
    setTimeout(() => En(), 100);
  });
}
function Cn(t) {
  const e = t.getWrapper();
  e && e.append({
    type: "sg-section",
    components: [{ type: "sg-container" }]
  });
}
function wn(t, e) {
  const o = t.getWrapper();
  if (!o) return;
  const n = e.trim();
  !n.startsWith("<section") && !n.includes('data-gjs-type="sg-section"') ? o.append({
    type: "sg-section",
    components: e
  }) : o.append(e);
}
function En(t) {
  var n;
  const e = document.querySelector(".gjs-frame");
  if (!((n = e == null ? void 0 : e.contentDocument) != null && n.body)) return;
  const o = e.contentDocument.getElementById("sg-canvas-add-bar");
  o && o.nextElementSibling && e.contentDocument.body.appendChild(o);
}
function Ln(t) {
  if (t.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) return;
  const e = t.createElement("link");
  e.rel = "stylesheet", e.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", t.head.appendChild(e);
}
let J = null;
function kn(t) {
  const e = t.Keymaps, o = t.Commands;
  o.add("sg:duplicate", {
    run(n) {
      const a = n.getSelected();
      if (!a) return;
      const i = a.parent();
      if (!i) return;
      const s = i.components().indexOf(a), l = a.clone();
      i.components().add(l, { at: s + 1 }), n.select(l);
    }
  }), o.add("sg:copy", {
    run(n) {
      const a = n.getSelected();
      a && (J = a.clone());
    }
  }), o.add("sg:paste", {
    run(n) {
      if (!J) return;
      const a = n.getSelected(), i = (a == null ? void 0 : a.parent()) || n.getWrapper();
      if (!i) return;
      const s = J.clone();
      if (a) {
        const l = i.components().indexOf(a);
        i.components().add(s, { at: l + 1 });
      } else
        i.components().add(s);
      n.select(s);
    }
  }), o.add("sg:delete", {
    run(n) {
      const a = n.getSelected();
      if (!a) return;
      const i = a.parent(), s = a.index();
      if (a.remove(), i) {
        const l = i.components(), r = l.at(s) || l.at(s - 1);
        r ? n.select(r) : n.select();
      }
    }
  }), e.add("sg:delete", "backspace", "sg:delete"), e.add("sg:delete-del", "delete", "sg:delete"), e.add("sg:duplicate", "⌘+d", "sg:duplicate"), e.add("sg:copy", "⌘+c", "sg:copy"), e.add("sg:paste", "⌘+v", "sg:paste"), e.add("sg:undo", "⌘+z", "core:undo"), e.add("sg:redo", "⌘+shift+z", "core:redo");
}
const K = "sg:ai-edit";
function Sn(t) {
  const e = t.__sgAiConfig;
  e && (t.Commands.add(K, {
    run(o) {
      const n = o.getSelected();
      n && import("./ai-chat-modal-lx7mxcPS.js").then(({ openAiChatModal: a }) => {
        a(o, e, {
          mode: "edit",
          targetComponent: n
        });
      });
    }
  }), t.on("component:selected", (o) => {
    const n = o.get("toolbar") || [];
    if (n.some((l) => l.command === K)) return;
    const a = [...n], i = a.findIndex((l) => l.command === "tlb-delete"), s = {
      command: K,
      label: '<i class="fa-solid fa-wand-magic-sparkles"></i>',
      attributes: { title: "Edit with AI" }
    };
    i >= 0 ? a.splice(i, 0, s) : a.push(s), o.set("toolbar", a);
  }));
}
class Hn {
  constructor(e) {
    this.sidebar = null, this.editor = null, this.destroyed = !1, this.shell = pt(e);
  }
  /**
   * Phase 2: Connect a GrapesJS editor instance to the UI.
   * Call this after grapesjs.init() has mounted into #sg-canvas.
   */
  connect(e) {
    this.editor = e, gt(this.shell.topbar, e), this.sidebar = ht(this.shell.sidebar, e), wt(this.shell.sidebar, e), on(this.shell.sidebar, e), rn(this.shell.navigator, e), un(this.shell.contextMenu, e), yn(e), xn(e), kn(e), Sn(e);
  }
  getShell() {
    return this.shell;
  }
  getSidebar() {
    return this.sidebar;
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.shell.root.remove());
  }
}
export {
  Hn as UIManager,
  Tn as createEditor,
  Mn as setExternalTemplates
};
//# sourceMappingURL=super-grapes.mjs.map
