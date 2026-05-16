import Pe from "grapesjs";
const qe = [
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
function oe(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Z = { exports: {} };
/*! grapesjs-preset-webpage - 1.0.3 */
var Ue = Z.exports, ge;
function ze() {
  return ge || (ge = 1, (function(t, e) {
    (function(s, a) {
      t.exports = a();
    })(typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : Ue, (() => (() => {
      var s = { d: (p, g) => {
        for (var h in g) s.o(g, h) && !s.o(p, h) && Object.defineProperty(p, h, { enumerable: !0, get: g[h] });
      }, o: (p, g) => Object.prototype.hasOwnProperty.call(p, g), r: (p) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(p, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(p, "__esModule", { value: !0 });
      } }, a = {};
      s.r(a), s.d(a, { default: () => d });
      var o = function() {
        return o = Object.assign || function(p) {
          for (var g, h = 1, C = arguments.length; h < C; h++) for (var v in g = arguments[h]) Object.prototype.hasOwnProperty.call(g, v) && (p[v] = g[v]);
          return p;
        }, o.apply(this, arguments);
      }, i = "gjs-open-import-webpage", n = "set-device-desktop", l = "set-device-tablet", r = "set-device-mobile", u = "canvas-clear", f = function() {
        return f = Object.assign || function(p) {
          for (var g, h = 1, C = arguments.length; h < C; h++) for (var v in g = arguments[h]) Object.prototype.hasOwnProperty.call(g, v) && (p[v] = g[v]);
          return p;
        }, f.apply(this, arguments);
      };
      const m = function(p, g) {
        var h = p.Commands, C = g.textCleanCanvas;
        (function(v, L) {
          var S = v.getConfig("stylePrefix"), b = L.modalImportLabel, y = L.modalImportContent;
          v.Commands.add(i, { codeViewer: null, container: null, run: function(k) {
            var E = typeof y == "function" ? y(k) : y, N = this.getCodeViewer();
            k.Modal.open({ title: L.modalImportTitle, content: this.getContainer() }).onceClose((function() {
              return k.stopCommand(i);
            })), N.setContent(E ?? ""), N.refresh(), setTimeout((function() {
              return N.focus();
            }), 0);
          }, stop: function() {
            v.Modal.close();
          }, getContainer: function() {
            if (!this.container) {
              var k = this.getCodeViewer(), E = document.createElement("div");
              if (E.className = "".concat(S, "import-container"), b) {
                var N = document.createElement("div");
                N.className = "".concat(S, "import-label"), N.innerHTML = b, E.appendChild(N);
              }
              E.appendChild(k.getElement());
              var A = document.createElement("button");
              A.type = "button", A.innerHTML = L.modalImportButton, A.className = "".concat(S, "btn-prim ").concat(S, "btn-import"), A.onclick = function() {
                v.Css.clear(), v.setComponents(k.getContent().trim()), v.Modal.close();
              }, E.appendChild(A), this.container = E;
            }
            return this.container;
          }, getCodeViewer: function() {
            return this.codeViewer || (this.codeViewer = v.CodeManager.createViewer(f({ codeName: "htmlmixed", theme: "hopscotch", readOnly: !1 }, L.importViewerOptions))), this.codeViewer;
          } });
        })(p, g), h.add(n, { run: function(v) {
          return v.setDevice("Desktop");
        }, stop: function() {
        } }), h.add(l, { run: function(v) {
          return v.setDevice("Tablet");
        }, stop: function() {
        } }), h.add(r, { run: function(v) {
          return v.setDevice("Mobile portrait");
        }, stop: function() {
        } }), h.add(u, (function(v) {
          return confirm(C) && v.runCommand("core:canvas-clear");
        }));
      };
      var c = function() {
        return c = Object.assign || function(p) {
          for (var g, h = 1, C = arguments.length; h < C; h++) for (var v in g = arguments[h]) Object.prototype.hasOwnProperty.call(g, v) && (p[v] = g[v]);
          return p;
        }, c.apply(this, arguments);
      };
      const d = function(p, g) {
        g === void 0 && (g = {});
        var h = c({ blocks: ["link-block", "quote", "text-basic"], block: function() {
          return {};
        }, modalImportTitle: "Import", modalImportButton: "Import", modalImportLabel: "", modalImportContent: "", importViewerOptions: {}, textCleanCanvas: "Are you sure you want to clear the canvas?", showStylesOnChange: !0, useCustomTheme: !0 }, g);
        if (h.useCustomTheme && typeof window < "u") {
          var C = "gjs-", v = "";
          [["one", "#463a3c"], ["two", "#b9a5a6"], ["three", "#804f7b"], ["four", "#d97aa6"]].forEach((function(S) {
            var b = S[0], y = S[1];
            v += `
        .`.concat(C).concat(b, `-bg {
          background-color: `).concat(y, `;
        }

        .`).concat(C).concat(b, `-color {
          color: `).concat(y, `;
        }

        .`).concat(C).concat(b, `-color-h:hover {
          color: `).concat(y, `;
        }
      `);
          }));
          var L = document.createElement("style");
          L.innerText = v, document.head.appendChild(L);
        }
        (function(S, b) {
          var y = function(k, E) {
            b.blocks.indexOf(k) >= 0 && S.Blocks.add(k, o(o({ select: !0, category: "Basic" }, E), b.block(k)));
          };
          y("link-block", { label: "Link Block", media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
    </svg>`, content: { type: "link", editable: !1, droppable: !0, style: { display: "inline-block", padding: "5px", "min-height": "50px", "min-width": "50px" } } }), y("quote", { label: "Quote", media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`, content: `<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>` }), y("text-basic", { label: "Text section", media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" />
    </svg>`, content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>` });
        })(p, h), m(p, h), (function(S, b) {
          var y = S.Panels, k = S.getConfig(), E = "sw-visibility", N = "export-template", A = "open-sm", M = "open-tm", x = "open-layers", H = "open-blocks", B = "fullscreen", w = "preview", T = 'style="display: block; max-width:22px"';
          k.showDevices = !1, y.getPanels().reset([{ id: "commands", buttons: [{}] }, { id: "devices-c", buttons: [{ id: n, command: n, active: !0, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
        </svg>`) }, { id: l, command: l, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
        </svg>`) }, { id: r, command: r, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
        </svg>`) }] }, { id: "options", buttons: [{ id: E, command: E, context: E, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
        <path fill="currentColor" d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z" />
    </svg>`) }, { id: w, context: w, command: function() {
            return S.runCommand(w);
          }, label: "<svg ".concat(T, ' viewBox="0 0 24 24"><path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>') }, { id: B, command: B, context: B, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
        </svg>`) }, { id: N, command: function() {
            return S.runCommand(N);
          }, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
        </svg>`) }, { id: "undo", command: function() {
            return S.runCommand("core:undo");
          }, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
        </svg>`) }, { id: "redo", command: function() {
            return S.runCommand("core:redo");
          }, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
        </svg>`) }, { id: i, command: function() {
            return S.runCommand(i);
          }, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
        </svg>`) }, { id: u, command: function() {
            return S.runCommand(u);
          }, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>`) }] }, { id: "views", buttons: [{ id: A, command: A, active: !0, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
        </svg>`) }, { id: M, command: M, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </svg>`) }, { id: x, command: x, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
      </svg>`) }, { id: H, command: H, label: "<svg ".concat(T, ` viewBox="0 0 24 24">
          <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
      </svg>`) }] }]);
          var j = y.getButton("views", H);
          S.on("load", (function() {
            return j == null ? void 0 : j.set("active", !0);
          })), b.showStylesOnChange && S.on("component:selected", (function() {
            var I = y.getButton("views", A), D = y.getButton("views", x);
            D && D.get("active") || !S.getSelected() || I == null || I.set("active", !0);
          }));
        })(p, h);
      };
      return a;
    })()));
  })(Z)), Z.exports;
}
var Re = ze();
const fe = /* @__PURE__ */ oe(Re);
var Y = { exports: {} };
/*! grapesjs-component-countdown - 1.0.2 */
var Fe = Y.exports, be;
function Ge() {
  return be || (be = 1, (function(t, e) {
    (function(s, a) {
      t.exports = a();
    })(typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : Fe, (() => (() => {
      var s = { d: (n, l) => {
        for (var r in l) s.o(l, r) && !s.o(n, r) && Object.defineProperty(n, r, { enumerable: !0, get: l[r] });
      }, o: (n, l) => Object.prototype.hasOwnProperty.call(n, l), r: (n) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
      } }, a = {};
      s.r(a), s.d(a, { default: () => i });
      var o = function() {
        return o = Object.assign || function(n) {
          for (var l, r = 1, u = arguments.length; r < u; r++) for (var f in l = arguments[r]) Object.prototype.hasOwnProperty.call(l, f) && (n[f] = l[f]);
          return n;
        }, o.apply(this, arguments);
      };
      const i = function(n, l) {
        l === void 0 && (l = {});
        var r = o({ id: "countdown", label: "Countdown", block: {}, props: {}, style: "", styleAdditional: "", startTime: "", endText: "EXPIRED", dateInputType: "date", labelDays: "days", labelHours: "hours", labelMinutes: "minutes", labelSeconds: "seconds", classPrefix: "countdown" }, l), u = r.block, f = r.props, m = r.style, c = r.id, d = r.label, p = r.classPrefix;
        u && n.Blocks.add(c, o({ media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z" />
      </svg>`, label: d, category: "Extra", select: !0, content: { type: c } }, u)), n.Components.addType(c, { model: { defaults: o({ startfrom: r.startTime, classes: [p], endText: r.endText, droppable: !1, script: function(g) {
          var h = g.startfrom, C = g.endText, v = this, L = new Date(h).getTime(), S = v.querySelector("[data-js=countdown]"), b = v.querySelector("[data-js=countdown-endtext]"), y = v.querySelector("[data-js=countdown-day]"), k = v.querySelector("[data-js=countdown-hour]"), E = v.querySelector("[data-js=countdown-minute]"), N = v.querySelector("[data-js=countdown-second]"), A = v.__gjsCountdownInterval;
          A && clearInterval(A);
          var M = window.__gjsCountdownIntervals || [], x = [];
          M.forEach((function(w) {
            w.isConnected || (clearInterval(w.__gjsCountdownInterval), x.push(w));
          })), M.indexOf(v) < 0 && M.push(v), window.__gjsCountdownIntervals = M.filter((function(w) {
            return x.indexOf(w) < 0;
          }));
          var H = function(w, T, j, I) {
            y.innerHTML = "".concat(w < 10 ? "0" + w : w), k.innerHTML = "".concat(T < 10 ? "0" + T : T), E.innerHTML = "".concat(j < 10 ? "0" + j : j), N.innerHTML = "".concat(I < 10 ? "0" + I : I);
          }, B = function() {
            var w = (/* @__PURE__ */ new Date()).getTime(), T = L - w, j = Math.floor(T / 864e5), I = Math.floor(T % 864e5 / 36e5), D = Math.floor(T % 36e5 / 6e4), P = Math.floor(T % 6e4 / 1e3);
            H(j, I, D, P), T < 0 && (clearInterval(v.__gjsCountdownInterval), b.innerHTML = C, S.style.display = "none", b.style.display = "");
          };
          L ? (v.__gjsCountdownInterval = setInterval(B, 1e3), b.style.display = "none", S.style.display = "", B()) : H(0, 0, 0, 0);
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
        `), styles: (m || `
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
        `)) + r.styleAdditional }, f) } });
      };
      return a;
    })()));
  })(Y)), Y.exports;
}
var Ze = Ge();
const he = /* @__PURE__ */ oe(Ze);
var W = { exports: {} };
/*! grapesjs-custom-code - 1.0.2 */
var Ye = W.exports, ve;
function We() {
  return ve || (ve = 1, (function(t, e) {
    (function(s, a) {
      t.exports = a();
    })(typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : Ye, (() => (() => {
      var s = { d: (c, d) => {
        for (var p in d) s.o(d, p) && !s.o(c, p) && Object.defineProperty(c, p, { enumerable: !0, get: d[p] });
      }, o: (c, d) => Object.prototype.hasOwnProperty.call(c, d), r: (c) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(c, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(c, "__esModule", { value: !0 });
      } }, a = {};
      s.r(a), s.d(a, { default: () => m });
      var o = "custom-code-plugin__code", i = "custom-code", n = "custom-code:open-modal", l = function() {
        return l = Object.assign || function(c) {
          for (var d, p = 1, g = arguments.length; p < g; p++) for (var h in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, h) && (c[h] = d[h]);
          return c;
        }, l.apply(this, arguments);
      }, r = function() {
        return r = Object.assign || function(c) {
          for (var d, p = 1, g = arguments.length; p < g; p++) for (var h in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, h) && (c[h] = d[h]);
          return c;
        }, r.apply(this, arguments);
      }, u = function() {
        return u = Object.assign || function(c) {
          for (var d, p = 1, g = arguments.length; p < g; p++) for (var h in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, h) && (c[h] = d[h]);
          return c;
        }, u.apply(this, arguments);
      }, f = function() {
        return f = Object.assign || function(c) {
          for (var d, p = 1, g = arguments.length; p < g; p++) for (var h in d = arguments[p]) Object.prototype.hasOwnProperty.call(d, h) && (c[h] = d[h]);
          return c;
        }, f.apply(this, arguments);
      };
      const m = function(c, d) {
        d === void 0 && (d = {});
        var p = f({ blockCustomCode: {}, propsCustomCode: {}, toolbarBtnCustomCode: {}, placeholderScript: `<div style="pointer-events: none; padding: 10px;">
      <svg viewBox="0 0 24 24" style="height: 30px; vertical-align: middle;">
        <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z"></path>
        </svg>
      Custom code with <i>&lt;script&gt;</i> can't be rendered on the canvas
    </div>`, modalTitle: "Insert your code", codeViewOptions: {}, buttonLabel: "Save", commandCustomCode: {} }, d);
        (function(g, h) {
          h === void 0 && (h = {});
          var C, v = g.Components, L = h.toolbarBtnCustomCode;
          v.addType("script", { view: { onRender: function() {
            var S = this.model, b = this.el;
            S.closestType(i) && (b.innerHTML = "");
          } } }), v.addType(i, { model: { defaults: u({ name: "Custom Code", editable: !0, components: { tagName: "span", components: { type: "textnode", content: "Insert here your custom code" } } }, h.propsCustomCode), init: function() {
            this.on("change:".concat(o), this.onCustomCodeChange);
            var S = this.get(o);
            !this.components().length && this.components(S);
            var b = this.get("toolbar"), y = "custom-code";
            L && !b.filter((function(k) {
              return k.id === y;
            })).length && b.unshift(u({ id: y, command: n, label: `<svg viewBox="0 0 24 24">
              <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
            </svg>` }, L));
          }, onCustomCodeChange: function() {
            this.components(this.get(o));
          } }, view: { events: { dblclick: "onActive" }, init: function() {
            this.listenTo(this.model.components(), "add remove reset", this.onComponentsChange), this.onComponentsChange();
          }, onComponentsChange: function() {
            var S = this;
            C && clearInterval(C), C = setTimeout((function() {
              var b = S, y = b.model, k = b.el, E = !0;
              (y.get(o) || "").indexOf("<script") >= 0 && h.placeholderScript && (k.innerHTML = h.placeholderScript, E = !1), y.set({ droppable: E });
            }), 0);
          }, onActive: function() {
            var S = this.model;
            this.em.get("Commands").run(n, { target: S });
          } } });
        })(c, p), (function(g, h) {
          var C = (h === void 0 ? {} : h).blockCustomCode, v = g.Blocks;
          C && v.add(i, l({ label: "Custom Code", media: `
      <svg viewBox="0 0 24 24">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
      </svg>
    `, category: "Extra", activate: !0, select: !0, content: { type: i } }, C));
        })(c, p), (function(g, h) {
          h === void 0 && (h = {});
          var C = h.modalTitle, v = h.codeViewOptions, L = h.commandCustomCode, S = function(b, y) {
            y instanceof HTMLElement ? b.appendChild(y) : y && b.insertAdjacentHTML("beforeend", y);
          };
          g.Commands.add(n, r({ keyCustomCode: o, target: null, codeViewer: null, run: function(b, y, k) {
            k === void 0 && (k = {});
            var E = k.target || b.getSelected();
            this.target = E, E != null && E.get("editable") && this.showCustomCode(E, k);
          }, stop: function(b) {
            b.Modal.close();
          }, showCustomCode: function(b, y) {
            var k = y.title || C, E = b.get(o) || "", N = this.getContent();
            g.Modal.open({ title: k, content: N }).onceClose((function() {
              return g.stopCommand(n);
            })), this.getCodeViewer().setContent(E);
          }, getPreContent: function() {
          }, getPostContent: function() {
          }, getContent: function() {
            var b = this.getCodeViewer(), y = document.createElement("div"), k = g.getConfig("stylePrefix");
            return y.className = "".concat(k, "custom-code"), S(y, this.getPreContent()), y.appendChild(b.getElement()), S(y, this.getPostContent()), S(y, this.getContentActions()), b.refresh(), setTimeout((function() {
              return b.focus();
            }), 0), y;
          }, getContentActions: function() {
            var b = this, y = document.createElement("button");
            y.setAttribute("type", "button");
            var k = g.getConfig("stylePrefix");
            return y.innerHTML = h.buttonLabel, y.className = "".concat(k, "btn-prim ").concat(k, "btn-import__custom-code"), y.onclick = function() {
              return b.handleSave();
            }, y;
          }, handleSave: function() {
            var b = this.target, y = this.getCodeViewer().getContent();
            b == null || b.set(o, y), g.Modal.close();
          }, getCodeViewer: function() {
            return this.codeViewer || (this.codeViewer = g.CodeManager.createViewer(r({ codeName: "htmlmixed", theme: "hopscotch", readOnly: 0 }, v))), this.codeViewer;
          } }, L));
        })(c, p);
      };
      return a;
    })()));
  })(W)), W.exports;
}
var Xe = We();
const ye = /* @__PURE__ */ oe(Xe);
function Ke(t) {
  const e = (t.devices ?? qe).map((a) => ({
    name: a.name,
    width: a.width,
    ...a.widthMedia ? { widthMedia: a.widthMedia } : {}
  })), s = {
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
      sectors: Je()
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
    plugins: [fe, he, ye],
    pluginsOpts: {
      [fe]: {
        blocksBasicOpts: { flexGrid: !0 },
        useCustomTheme: !1
      },
      [he]: {},
      [ye]: {}
    }
  };
  return t.grapesOptions && Object.assign(s, t.grapesOptions), s;
}
function Je() {
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
const Q = {
  /** Fired when the UI is fully initialized and ready */
  UI_READY: "sg:ui:ready",
  /** Fired when a component is selected on the canvas */
  COMPONENT_SELECTED: "sg:component:selected",
  /** Fired when a component is deselected */
  COMPONENT_DESELECTED: "sg:component:deselected"
}, xe = "super-grapes-project", Qe = {
  type: "local",
  autosave: !0,
  autoload: !0,
  stepsBeforeSave: 1,
  options: {}
};
function $e(t, e = {}) {
  const s = { ...Qe, ...e };
  if (s.type !== "none" && s.type === "local") {
    if (s.autosave) {
      let a = 0;
      t.on("change:changesCount", () => {
        if (a++, a >= s.stepsBeforeSave) {
          a = 0;
          const o = t.store();
          try {
            localStorage.setItem(xe, JSON.stringify(o));
          } catch {
            console.warn("[SuperGrapes] Failed to save to localStorage");
          }
        }
      });
    }
    s.autoload && t.on("load", () => {
      try {
        const a = localStorage.getItem(xe);
        if (a) {
          const o = JSON.parse(a);
          t.loadProjectData(o);
        }
      } catch {
        console.warn("[SuperGrapes] Failed to load from localStorage");
      }
    });
  }
}
function _e(t, e, s) {
  e.forEach((a) => a(t, s));
}
function et(t) {
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
function tt(t) {
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
function nt(t) {
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
function at(t) {
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
function st(t) {
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
function ot(t) {
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
function it(t) {
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
function lt(t) {
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
function rt(t) {
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
function ct(t) {
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
function dt(t) {
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
function pt(t) {
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
function ut(t) {
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
function mt(t) {
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
function gt() {
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
function ft() {
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
function bt() {
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
function ht() {
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
function vt(t) {
  et(t), tt(t), nt(t), at(t), st(t), ot(t), it(t), lt(t), rt(t), ct(t), dt(t), pt(t), ut(t), mt(t);
  const e = [
    ...gt(),
    ...ft(),
    ...bt(),
    ...ht()
  ], s = t.Blocks;
  e.forEach((a) => {
    s.add(a.id, a);
  });
}
function jn(t) {
  var i;
  const e = Ke(t), s = e.plugins || [];
  e.plugins = [vt, ...s];
  const a = Pe.init(e), o = (i = t.ai) != null && i.apiKey ? t.ai : {
    apiKey: "AIzaSyBzGa3yCqbFJo-ciwuLda50NYKUPOUquAM",
    model: "gemini-2.5-flash",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
  };
  return o && (a.__sgAiConfig = o), t.plugins && t.plugins.length > 0 && _e(a, t.plugins, t), t.storage && $e(a, t.storage), a.on("component:selected", (n) => {
    a.trigger(Q.COMPONENT_SELECTED, n);
  }), a.on("component:deselected", (n) => {
    a.trigger(Q.COMPONENT_DESELECTED, n);
  }), a.on("load", () => {
    a.trigger(Q.UI_READY), t.onReady && t.onReady(a);
  }), a;
}
function yt(t) {
  t.innerHTML = "";
  const e = document.createElement("div");
  e.className = "sg-editor";
  const s = document.createElement("div");
  s.className = "sg-topbar";
  const a = document.createElement("div");
  a.className = "sg-main";
  const o = document.createElement("div");
  o.className = "sg-sidebar";
  const i = document.createElement("div");
  i.className = "sg-canvas-wrap";
  const n = document.createElement("div");
  n.id = "sg-canvas", i.appendChild(n), a.appendChild(o), a.appendChild(i);
  const l = document.createElement("div");
  l.className = "sg-navigator";
  const r = document.createElement("div");
  r.className = "sg-context-menu";
  const u = document.createElement("div");
  return u.className = "sg-disclaimer", u.innerHTML = '<i class="fa-solid fa-circle-info"></i> Super-Grapes is a design tool. Users are solely responsible for all content created, edited, or generated. See TERMS.md', e.appendChild(s), e.appendChild(a), e.appendChild(u), e.appendChild(l), e.appendChild(r), t.appendChild(e), { root: e, topbar: s, sidebar: o, canvasWrap: i, canvas: n, navigator: l, contextMenu: r };
}
const xt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAJagAwAEAAAAAQAAAJYAAAAA5HElIwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KGV7hBwAAQABJREFUeAHsfQd8FVXe9jO35ab3HtIghN5CrwFpYkdR1951Leuqq666aixrWbuuq2JdOyAoKkVaEjqBSEkP6b332++d8z1nQnh593W/762/L/HlwGTmTjlz5pxn/v1/BjhbzvbA2R442wNne+BsD5ztgbM9cLYHzvbA2R442wNne+BsD5ztgbM9cLYHzvbA2R442wNne+BsD5ztgbM9cLYHzvbA2R442wNne+C/tQeEgCKX/9ZKz1b2v7IHCKRV+iPiNqMQ4jSghMjQcTGwR07v+1/ZO2cf+j/eA5kiXQLnH4uJO7zO3ClBdubvX+v22Tfovziya9eu0q9aNVYoSoYqq9p7bPHcsFjfi/wCzLNJs6IVnaJzOj3VrQ3OL2eM2PiePEdec/nl6zxy+9dazgLrvzCykuVNVVa7ZBU5ectXhieZ/hTk6zvZCBNae2zobLfC5dIhPMYXUX7+qOzo2fNCaMe5n2GbRVKuATD+F5pw9tJfWQ9QlupnfZs2zU442XH+Vov4jai3Xy6+27TI9YebRzsWw0cCzn1qcX325RKbTdwuijuv3HNGX5x9sc/ojCG/2a+tpRskOKSw/R95oP5r++WknOIl19S7LrL2ElQbt5zjvGJkhASTOgIQ07l+8blx6rGSJerf3poo2aRY891Sm13cLPadPO+38p4D4JTbZ8sQ74F/pv4fOZJGTe7/rrVlZOC04J1Xu/wvdnG5KG66WDx57zgHu0VMIZg+/ThNzT4wWx0DvborZ5q6u3qkmt88T33pxbFqPHSuOud14qTlN/tlN/5vEeSHHGTOoB6/xFI0G5IcvIFFgkc+5M/lK6aWtl70VUHDit/tP7aMxOVfyj+jIv336gdefsP577vEVWLfsfOcFyBAsjv1leenqCW1K9Qq2znqxhOpajIM6qc/Jqp/2wH1y8MB6uYDaZJqefbmrRS16vUtt61aHCjvmpHx69QSf0lFls876IscaEWB4NBwGXj7C04BrF9L43GW/uNyi0XT3PQ6fUpyWOCVdogrHdEuVNkuLOhtc64eP2zru4qS5cwki1yoZEmtTatbuxKrKGyv8xQ3X/jOiIiAW3YfbHPcM2urqZMHt+5cjEnzfFDYWIvSvKOwWPQkbQoO7+/G6OURMOjNcPQ6tbpsFicbLkwxi6xeWMeLn+SSweVXVn7pTR/0jzgAqn0/LY3otNhDz1+5u+iXGv3iTan+U6+ODRHC5avTGRRfX51rxoydpScqzr81Jilw9fef1Nsi4r1MY6cF66P89WhxdFc3VNrvnzV6xwZ5j6eegkL2pw5of8drVzw5Oi40Y29Op3PVjB+NKfDFWwULET7cg52FR9DS1YrOukBU1Rnho1dR8nAfxj/mhxHJvsj71orPfmxXC5qv1ZsDRclw8+ejZJsHnuWX2j+U9w1RYKUbSFncVScWXxUd6fuFQxWFHhX1LtXQJ0gqjGZhhlHE6g36MKHXB3sUxaySfCl6xSWEWuP0uHTC5ZV0Z3KW+n1zozKJbOuWv073LLsq2hQTbEJ5beerE+K3PiAHtqBglWns2HXOQ6XLzktNCf6xrNzhvm7E93oBD74+uRJe0X3YeHQbujq8cDLXH41WgeEJNGA5jSj6tAsnjttQdQohX6xdar9sVbJ3XmPbs1NjvnmcLJrPkSFZ6a+uDFlWKEdC0ekNJl8DGspsYwICvcb4BRogqOM5OVR97R50dbvQQ3tSb59HEFHyAmNopHl4RIKJrAlqZ3OP8uh9Y2U9urvv3q+bfLfZ/Xz2QrFoftj9ec0rwsdHbr5Oguq999LCIpN8/t5uAV6+9YhSCI+y/9hFwhzjwNqcbeho8sfxI2YoPgKhOoHOH5z4dFsbZsKMq++biKSJwRgzNVyZOjbEu6K38/Dfn7c8K+W+p57qN6r+6lDFBxrSwBJOYYSqw9+fKrMXf1tqMCNA2Gk60sOFDriUJkKpiouUg1gkddbU/qncmH5Fqu4YLLhvSTjmnRuNRZfE4OWbc/TLF2zB19+e47jk4thrTzSuaJ0QvfmB+ati3gg1+Ia+8Xyx8+vMWtM3PywW4SOBL/f/hNbGAOT9bFa8gjwCJ/n/8w5Us/43Xp+LeRdGIyTWSygGobg8am9ec/uXaVHf3MHDeOutLXIli2zXGbKctm/I/xnSwNJBWOUIRIzw0VcA+lnPJEB1Au3VbvhFmRA6zBchcd4ICDdBb9DBZlOVlsY+5eDWVnz1aTF6ea1/oIKKllqYEgRe3jkPIbcew5WX7DRtyjpXnbLA9/4DJ88RgcHelx040IU/PXHE+PhjU8SkhQFYdygLDfUmCuveMAe7hfOgB5mbu3DpgkS89/okJE/yhZON6emzMsRBT1pp6PEP9R9War9xk9upK+mwKoeOt3dvumvsur4hj6JfeIAhCqxw7Q13Ouw19JkgJNpb18GHSznHB4mjQqDzmGAy6zmwbljddthdVrjJCkONRiRND8aCS6LFtY+OwHPX5ylOhyplL3z7816ckzoND62egvpFVpyXvkXJrbxEHTEi4IGuHqgfP1skqZ2y8vZ4HKmsQlVzB+qKo2EIcMJ+yINsgure347H7U+PQVCYAif/KR4DzDqT4rTrVdWpxlIsi9WbjIj291uhN9jb7opaRyVBKIWFTxnHjIH71+TiGZLAeuqpdRqwfi7uKE9ODOyLH+7lR9KlFh6oUwq7CuGmocDgpYPV0w1p0tRT7tKR4bg1RgiEBSYoaakj8dJPU2DpcYlOe6sSGwT8cOgwVkzR4bGvJiBr6k6se6cS9784xn10b5P+q83l+GztAjjNVuw+/DO6KqNg0btBtQHZm7pwx82jce9rY2DyUtBY70JlQS8KD3fh6M5mHMpsViywq6SQ6m+vneJ69NMZ3la7fSuB6pI2ExbS2f4iBfqBbbnOzW1Q0tLeI+iUIcUutac680GGyrYUfuUb7qxauq/XZph94+ht7onXBurjrzGjrKYX/n56GL0Bs58EltAWHQEmFBUWWy86icQpiZMwY1ysKK1pU3YXHYLOGYSD+V148KoFOPBtFx657ziycy7FVx8W4Pv3irG+ein2VJYhv7gLdZVkrw4Xdr/ejjmTovHe7gUkOS7sXNOMz+8vxsGeNq0rL54Xj9HzQihE6fDCcz/j6x9XYP55cbDSBmJQvFocTt0JR6/YUlfTt2vFlI8L/1n/S8o2lMD1r96Of/ZQg3F/bu4P0sen9nTZvw8dHjZ71q0p6pH3i/Txl8UjINAbLU12yk86UikPvBgRpSoedDfwpSdLjEgKQGyEAUebjsHmtCvBft6w2gBvanQemxd+yq7FjHnR2mO/+EgONu+sxZsfpKHe2o2CmnbW4wOd0YPOXTZIX86f18xGa7MDj192ADuPN2Ek/PHe5wswdmYITD5AeLQ3ig70acAqL2pGR7MFfgH+puTR0XFxI0PiokIDVoSGOtVK9YkCl0M5QOdjhdMumo1mSXDtKb2t1i8JqoKBl2kwjsc/tmnIAist7QIyvFzUFPR+HRLu+9x5V8aZtr5fpJattSnT7g9Ee4cb7TQ5BLr1sBAEZl89vPxVdNYCBz93QuftRNz0IBTZ62gZN0KQWnWTVwaQxG072IrhI/xx029j8dE7tUik8hw+Wo+jlS0QfWZ09aow2ASOHLbigy8WobvTieUzf9D69olnJ2HZlYlwmOzIq6tFC0nj5cFjcGBLg3b8sQdzB8ZAsjZ1ASLVpU+mickLk4wpE2LGhwcHjjeZ2R4qiy5ySF/YUWBrzOK5BVlZkrH3ew+4HtRlyAKLNnFyh1Umulmqe/MXPjt+atATKx8a5/nuL/mGgOEmLL8yBjv2tqChxYqwYAPsdg8oR8M/kcswM5pKVOy40YLAmTokMsAhINaI3i4Bl1uBx67Dyao+RI0zaYM34+YQ1Nk60UAqaO3WQfUIpeJguzhnehQC/HivU6B676vZiJ3ggx8PlCK3ohXl1k48umIaPB4Ppi8Lw4HrLoG3j7dmW+hud6Kq0KI7uKFW99hTm4GnaAKBl3vi4qkiYXIYbFa3WPSbsbpxc/zsFWWVpbIh6elDA1SyrUNSxiI3I2fot/3s+3RCRHKS341RIwJe6HGb1Bf+cAyla2qUtD8Ow4RVQThKIbqsvgv+vmSLNDU5pZjMp/Yhm3Rx+2SmA0UbrBh9pRmhab6wdCnoaPUgMdEL8VEG/OWmGtz+QjRM8SZ0kAq21qnoaXMj54NWXHr5MPT2uLB1axNe/GQcfOPMeP6LEkSSh6WOMkNPjeGWy1JBFw4cFhV9Fjc8bgEfaobh4b5gUCDbYER9uY2ssgtF8kU40I6e4nr8RMqUV/mwPjRBKYnRvTCarZYUTo7XkBDihxzFkmG90hnckrlkkk8oVnuZdGMN4V4+9dU29eDueqVjTR8NpDrUZ3uw6IogXHFRCH7cBtS2WmAw6qgtElyMmurtFnBzHT/Xl4AwIP/NXrQVuBG5IpDn6dHaRDZ6KkjGQFB2tKi0gxEglMXcvS4wegG5OxpQ0eHBnc8moNvfiYdfr8bCGH8ERhK0ihux0QFoJisszunAkaJ2dNpo09Kp8PEWiAn0x5SUSIwfFYGI4QEYNjpcLLwyFs21Brx9a7Zyvc5fTUz00bf0tuyXYJLa4lBy/ww5YK1iL8tSXGdvnh3mN8XiVPTrnqtwlayuMTRH9CD1oRhcTvYTnmCk5mfDtuw2+u9scJJaqb0egknwlVdh1JGlcbFR+g5M8MHEB43If6kdjY4uBCwOgocW/bpGJxIIUp1RoVlCwN5DUBGM7i4PSQfZJo1nC84NhDHegI1fd4LtgfAnWQmgIsDrGsq78V4WZSuFrDbUC6GmAI2XCcpoDV1uVLXUYMfxOgyPCYSfl1HxDTLDVWfAmj1l+OyzSxngbEVbU+8G+bxZ8s8QKkOKFZIHSKuPEIyrUqbmuvp2L33VN9z/vqduyXVa9lWZYr+KE4L2KOnDqW60oENnh7eBZoFSPez7+tD2My3hHBwZ5ik9v7REIHSZD9xJZgjKXdZmJyrebIN5AtkiwWWpsMH2XR8mvx6NdlI4W49KoyupXU4PHPsctNx7MO3BSLSSffbS+RwYIOBPduessaEsy3ra+czbIIzLBMpsfpN84Eo2w2DSa1oo/VBQhRtuk0B8SBBKrq6hyB7p+ax9hUHo7XnRQZ9MkNefyf7l78FehgzFGgBV5g2JZoLKLjv259z2l+ZNNd1+8yNjfJ48v0o1PssRvtcb3TQxKN4GBDd6w7nGiqZSO+L0oZh5XhKiAwwwkRd2t/ehoLYbG39qYn6WFRHTveG9PAhRZJ+ta7rgiKVg36YggJSn9rNG2Do91BxpF2O9YR00vvL+puFGNHcrsJPqhVid8GzrweZWN5ZQl7t72gSMCPKGn8dJ2cqJ8o5erMtvwi7ayc6Noda3KhC2KCN07bSxBRkQZDagbnU7NtGAsW/bbDUyWMHPR7sflc8pgw9lNIfcHiplSFAssYpy1bp1nt4XJo7181fyrVbXhb4PFmj6fetH6beETQp7P+dAm+v1u7IMEQSC4W+h8NRQyH6hHTQj4bJ7z8PkMPoMu0mvHHzkPgpKvQSCw4MaqwOf1rXg3ZImTBnhBdccP6if99Et5MAxXhvHZTSCEURAemgLq+22YTNsGrWbSRdR31I/mPrcKM3uhbz383MmYFZwAILpf6RpFmpQBFQXQcnbWu1O7OjsxGVFVVjAo97XBME41Qf0CqH7ozb8WOzExg+XOy68It7cUN31cezYtTfJmHwpU/L0IVUGNbBEBj0xGeQUUmBnHl5TxoSIYD/lVZeqvOz30LFjAyyx98Nz3vYbEXzn0SNt7jUv5+t7Gvv43tsROzYSd125BJE2AsoqB5gwe3sN5RxpIyK2gnXwjfKFmXajDT3deLO8HlGUjuoJnNAQP9ycPhWTQ/wRwmAvo8UG1eaCg+SpscuKrY0deKCuAemsR7LXBZEheJhuosg+MkgCTV15GTztHVDff0eyNrQbKaPRUDra3x9lbgeuLq+EL31PARf4oeCHXsQiCM99ONMzd1GkoaOma1Pogo3ns9ohxwJlm2UZtMA6Q6aQbfw3KrY8rrW+n0eKvreXfOwbEnRD9okW9xvPZ+tTRobi4atXIKS+Aa6ExYrhnHMEqOYrn38BvPoyRFwqOuo6UUcA+oCO4Sg//NnRifc7e/DA1FTcOnUMwppIdYqKIUr64Bk+Eq5eO1wU5A2+Zvh4mZBPpeBenrPL4sBbccNwE80MXSZvRDz1OAzhkf0Oymf+DOzKgjsoCmVdXdhHSF8aG0X5T8UiSy0CaMK4764ZWDkvVg2MMupbO+2fRFyy8UY5OEPJ0i7be2Y5pVCfuev//7ZYBZJ/CMvjo9KcT42pdmSM+iJDejdYxHvMppGUjMeJOIGnVmkJEoZy/VHUq9i3t1ZICnLtvOkIqWmCu8YXxmVL6GjjTqp0oqlFbmnsSUY1eOtN6KQQvrmtE98TVI/PGoeHJ45EWEkd3HOvgufNb6FmPA1DeSm89N5Q6q1oLW3GibxaJNtVfBGZgOU6A+6x2fBR5Un4LVsEQ2wsBOU8ceKEgl20FoQNg7C7EWfwxjjqeq/V1yHGpWB1UAzy2JZAs9EdqDPpq3LbMySopF9wKINK9u+gBBYWp2ntYnrNXcYAwzCTn+mqB/40ar5sMHYkq5I9rqXcJW67zahkrKOEwgkSvLxuaaFh86s9Fcp5M1Iwjh5n8eF2GPyodjl4CtmOsnkLlC8/FWLYaHho13KSxbm5ePQ6fO3uwbS4CNyaTAPDtsNw33QfdIvPgT4hgYFeM8nOWEwGGloZTqj3otRlwKH6FpgomL8VFw90dWIPge78ZrPABloI1q6Bcu9dpKsBBJWTB1TY6TIKV+geouy1ta0Lc+0GcSGrff2r4wIdKiJ1flIkBFbfbkBWlk78QwZPBl8o7fgQ+DM4tcLgZCr1uXB5lA1ene4bCYnjHe3G4wP9KTKoJWWsk1qSJtRWXDZlHkc+tbi5E/l8WaYGBoBGIh5kvNQ3axmUwtOkl3kHXSeRI+CmJd4qaAmntCUrKaIx81uu9yYnwievBI7RaTCNGgmFMc5WaxvWfvWlFhUqtcepZF9pXjEwEpBx1Ce/a27FFTHR+DIoHFe1Nym3NzRg0Wsv9zc1PAUgm/RY6fXj/Ugv4SEPjyC48twWpDv9lcujonBNQ5OursXGOC3jpRm3THhLuX11XX8FWaTQtxlx+2o6mkCcaWaw/kOD/O+gBJYU1PtlrOIf2+4bGefWm7sS3jlhEbfRfrV6nUumTZ28deHYhAC/O43exmVwqYnQG/WWPisBCSVeGKBSy3OPCIH+ngcVZXuW0ECVPA6uynZYOMjSBmXlQFs4YkfdVpxr8sIoUhRbixPGE3uBpdlwhYbhPVKeSEsb7r77VrjI7r6oiEFt5j6c7x1DR7ST0CIgyULTg6VVjNsGgXmMW9YTeKKLAj/XDt7PxoXpZtqi8uEkyDqpLY5hZAWLvqHdpsYF+Q5/fOKIssffG17arao/7Ou2vEeQ1cgTZNn1zMJUe6C5asXvttDAMbjLoASW7DIpQ/VrhaX18rfIoMNZsr20NKNlQfRrPt5ed1GCpobWg4rGXtFltYvj1S2KVKVKOnqE0mBRIiNMEHkFwtPUSqEtFu66Lg6sSkB5NGolB1eCq5x0a5pfAHzofrF2yIgCLxj+8ABlL1KziFDx28tXKn1f7IJCy/gtcyfg+mE1mFjbiyCDEQa3DifsfZjq9sE9Xr7Y4bDitqZuBFMC9BC0NPjzHgQWF4t2P0ZYcJtxrmilPY3KplRMlB3HapRWm10N8jN4jRwWMD482m/8+d5e97d+cNFfwm/ZmMFzhI+PLqbN3TUANCkrymsHZRm0wJK9JWUpTfu7PU2yPmfmlTMT58REbjEG+406UtWsbj5Y7D5RUKcnk9MZeb4UQLiNZblFylXQi0sbnMrMDz5EIKGimALp8HVrAyzBJKkHaQq6eItOwjiY1MPR3os+nuMf6IsO83B83lyOWePGKeYeKxo7W1hzBELpnhnj50eiWStWeUIUeDEqggF/FhpIUxh+8xbrJK2kBMaUDjZesloH7yTvJ00ctdxDiQtOo178xdasrLdBkbayx7JLgexSCRZJddU/nDNcvW7BCPP4seFP9H1w0Yp1dQ0XzHxgZ2a/3HWAp7CSQVzkgwzqkpnOrOSsLPeeK+aOnB0emqPzMQX+7UiJPXPXCdPo4HBlziUzkEQbkq904nVb0dPRg9J6JksUVGNNTy9uDQnDdUxXiKf0Le0T0lMoqUcf13WkXJVcviNNOdcnAHf7BqO6tYuG0S6RNyxJuWzaJMQaTWhj3cN96PZhb9VZ7Ajivrz2dqzfsQeBzAsKVHxxsbc/MslS73T2sL4AGlVlTFU/SqgfamCqJqiOMsq0nobWj1QXrogMx8pxI5BKIAdLPHFfi8OOAw3t+N3xCjku4u1rpjrvXJxitlmtja/ml8/409/yawfseoN54AY1sDKoBXGRb7Cv447zC41mr/iHth9xnCyoNt16zXLMnzAC/p0ddAzW0ZpOyJA8uJwOUi4dHEyS2E6AXVJRiVkE1COKP8KYzSqphqQYTRo7FKQsCnaYPIgh31rosYod/sE4b9Y0ZWpoOEq7u/BZzhHsaGvG95esRJfdjiu2bMYdY8bikpEjEUKAZdVV45MDB/F71lvsFYSX3b24hckcSaw5jO1gtqFmzmjhY9QSUHn0C+3m9sc0hyyLDoF3TSnUpmqoURMYdUHDKl073gx5baYh9q/NTXi+vFF5fHGq/enLJ5utFkuR730/jOetTsmgGnb5c/AV/eBr0r+0KBPp+qeqqtTOq5d86OvvP//Z/XmOfcfKvZ68dSUWJUXDq6ILnoRpQOp0iEMnoe7cBVuFG/UVjehi2MJcTnZ2AZcnujsJKDcH20gruYp2LpJ1xhq94MtMi2xXL4qEC3PmL8A1UyYrNHNg9cEcfP3zEcQ6vRCu2jBj9BiGMdPHWF6GntZurC4uIGSARfHxuIBAO0wwvFBfBTOvXe7lrwnrdaxTAko6NiUrPKRzYieF+O2L5mAxgw7V+h7YL/gNxJg5UL7aDjCaoq+W2T+VHYxqVXBxUAiiA0146HCFIdDL4Jw/fljUXbPigl/aUbYlQ0k3PJVVJV+6QVkGLbA0/+DmzZ68i+bPjg8OemNLdZP7lqyjxr9evlQsigpRVNo51StvhJ6UQxmeDMVugS4rE8bEBBj6PGjus+AgXSpz/AMx2+yNP1m6kUgkpJKS+OsNiKAW2ORsx0bVJi6cPkPJmLcAYUyxWXM8jxRoH4IYczUmIgZBoUEI6AImzpnC6BcDWvNrEBkbjQTVhKKGSnxaUoIgbx+cm5iEy4ePkC4YHGytF6nCo8TofODH39KRfYwZPZ+S1X03Iw0LmbJmMQTBQKu89+QpMIyfAF2wN4x7NsE7PhHGXgcKSYlrHW5cZg6Al4+Chw5W6FckR4mRQb4zZ08IXj/iuT1N0pa3rrBQctxBVwa18C57K9lsflBlB7+56YC4NyIU50SEK2LDJuCRl6EnlRBU+WGzQ9mWxbNDoVLFpzyOEJ0J1bR+b29uw/lhYXjU6Iv1zC+c5+VH53OP+NHjUqLGjMMTo0YpPqRam0+W4fvcHALPB8tHMBqU1nTv0hY6m6sphjPEJoKzxnR2Yyq64awPRWdyBELo8h7R3I5tR3OxnsstM2fjboKkNjlZ+Tg/H14N9Zig86PNzIMtHjsejIjEYqMP6vfuQcSXa2Ak6EUv1UKOgq7kJO/CplMJkL7M0TpffEuHdQBNcHcGk8WiFW/uKHB/fv0c0xSfoLt56h2rxrYq2ow12pWD68+gBFYGZStqgZ6v5kyO8TEYlhyglXorVP2DaQzzbemEo7wdXlaK3wzUg5Nq1RoatvbthIgZBXcjY6VINpjxhyiyuixXO7wbXWK0j1lpc1mw2tGO1Nh45aYJ45EUECD2NzQoH+3JppsYOJd2rnCPDkFlJ+gSZvjy1MXwSr8BptBg+E+bAm8CeJx3AOxFpeja+o1mjugwJCI4ZTwaT9bh3YP78aXigzvSZ2JeXCwebKhDuTcVR4LjJPnh5VQQLHReSyu+ZMV03dAjYIduzXp41n8NV0wqFLZfGlMdbP8kxRvv97TjFVLX1ZHRuCyvQf8EQ32Gh3hLg/0flIwsSpb9MWr8PajKoATWk1npugxkqbMC/WbBZPLNbeuUMrchlRZ1V14x9DffSvWsFsqxE5StjiooOMJY31S4GyizMIVLqvkWYu4TgkqflIAmk0l5ixThfC8f8fvZs5UpYaGisKNDue/HnxSHpQOzA+IQFxeFGE5FFEZWGfLKm/BfnK6xVR2jETTH5KlhCzh/BTwWC6Lr/4ze/YfQ+qc3CKpc+CSPh58tGE2NDfhz5i6aOIAlXgGwWqTnEphJU0QhX4pw+gsZZAq89BqwcC6wPRvIO6y0RI8UexqaxcV6H0XG5ksbm5lqqDRz5TFNf1qIZkhVjtZ3eUYG+kYfvmPemGnv7snBqlU6MKRIVjmYyqAEFkb2KjIWN0Aoo8gXcKy1Q1xOA6Y/2YbFYUAA5Sg00a700ftQzIlCRA+AisZIsj83IxA+drWJWTNnKFeEh1OH8uDGYfEizOCtSAv4MwcOKvupzc2hfSsxJoWuGROGEVSxT7+AoBuvhlectCz1F0EfoyBr1SR1ymjSm61nEoQ3ZTu5BF90PkLXroffHbcSkjwtNB7e3X3o4Q+XvQNjZsyFi6xW2Z+Ntc4+TGOEYLj3MJr7S6AcPcjHi4ASO1o4Gjr4MqhoZfsr+WqYeEPejoYMBSep6Y50M56Mv4sbuz0kufoYnSmJt8vBIGWHgxNYpwZVrzDskwbL9o5uJHhxyis6c7tae2H+fB1MJ1ughI9gqpYLLsk+mIHepzJ0mOs6lx0VIcHKU2RhzTuPM2y4FZOWL1J+6GzHRYcO4Hpa1tMN1LjCgpHYpFIQL0B8ZjYC0udrZkdBc7iU0yQgSTA4NRIn3SKg5EgzGL6fhXGfZEJGap1Rt98C39kzaa3/E6NIM2E3m6FLjoa1sANzr7ta0whb92fDlpKMvKIKjHKY4OZ18AuDu4/mEfouu3WqkC9FJRkha+ZthdLLv9J3I9e0jmAUty19dvJ5vm2q4BvD0sCXcBCWQQ0svrM0WtNCTlnKyUEWfZyeiA5lT0kh/JVQhvVaOM79zl0n2Z+0qEueYKGEZaDwrvBcabpX5T+eF2DiZCE8HkaERBBUCVY9EtUyJBYWwnf0aIhOzq4gIyHkRA+SyvjKHH1JO84oHGOZgSFofJXjLaw0JPB8//HjkPruayhPToYfY7HUwuMMGgQmL1vKaB03DnLbu6gQa7z94GO3YpHVG44+xndxvzSgqqqHT6SISN68g3t4d6oNLu2ZGKyjUU3JVDlvDUFFjVjmcwziMiiBlZvb32NO4amRVCEhKADZFYzrpHbopgGx2xbIeRI8MMoXl6dKQZ22UY0y2MnqAinHGNvaxE/d3coFc8bwhFEo48wzCf4BKGJk58YT+Qgs6yALbEHCibx+UFU2MDWLEyOxHoUmBjDcxt3WBseRUrhq6uHppTnDnyGByUkwjx4JQxTTI2jlVxtboaN85uzrQ+kbb2vtCGUCR8ClV2Dq/ffSFOFLLUCH67P3IPO11+Cz7xAed7bAl/JTCpkn538j/VSoa3rYGrfSTbFeaoXSgNvNrTiaKkLZBxbOOVHMtkV50QDGTCOXUBr5E4jxl00edGVQAistmWEzRFeXw3k8lDLOtKBg/VsMGG5hdIGPtwmVjCYYwdkg6akhEOS/fwGX9BW6ec21+iDliZwc9I2bQAt3LEZt34JFPPbskuW47YLzUbs3F4F/eBt+pDSiqEp7/YWRdvj4KHgo03S/8wG673ydA19AqqFxIk2Tk9qcT+p8BGbchbCLLoBh1HBGlnah8J6HUfnJaohRaUi89VpMWrWSKV/hUKvrQYOrSJ42TfH9ywvI/ugT1L7wHA75K0juU3hM+hIZ3Mp6U/lXkqEGwpNBP+J60uW/swVjDZyGkjYwWcaEBuhpqcXJXpvEGdYV9E/pJLcHUxmU5JR9LSUaiRcf9cLFJyts9pgR2/d6Xg+L0N1hDsRbdXUiBUZlmCYu94NKWrZb+Za38s3u5Gj1kj0donlhWWIKLmYs+lU/bcJkQwDnZ+jBqvhRWHrt1QjI+CO9wpTVaM6QYctITYTL2oumVbcobbu+Fe3xk9HDqSitbrpayIpNlKu8DAb4MLXM1FWEkOtvw/CnH0XVa39F9esvo2NMGjqLatlyBwLHJmP2Ky8gZcJk7WkOH9iLH1ZeQqu/Di00g3gxDXuMYmTeogFRlKo4zYjmaiom++vms9zJAMFyWu4LdG5cRD/kHfZWfO5xetqvX2LwMygFXh9uG3cKSHIMZV8NqjIoKZYElaDzWcnKsra4nBuGB/rf/UBSrOf3lfW6uZyd70rfIOUZS5uIosThz3dcso4egqqeXKLKaUeWFLS4pHJlZlaznuEtUiCWyQtjRk9kLMxxZteQ6lCtFxV1PIlRVWRtlN7QcMWtaCKoGibOQltxHXqYk2+ntiaLpCfeTGT18/OCN4MBe/++Gq1c7DzWkzAWlsIajfp4vM1wFhzFhuXLcGNBIX2ATnxFUCEyDjZmCrnZxsO81xc0nMoyk8t00kMJrnZi5FaaZUtJtfYqTtxqDMB6g02CCq9OH+UJ8TEbGCr0hbzuCOPTpq7O7SdlcscgKrK/B2dJz9JGk7Hor6l2p/vukZzpg4B7oK0BdgNdHGR1tDCRUTCogYNUSGx8wgEzU45aO30qKubOxU/DRsCXSpzK86XtKICaWCApSnLKTERNmQJU1pPcUXSW2h/Dkru/XoeWHRtQR1A1Hi9Dk9tGluRAB1PBOrn0cnB7OeA9jHDoLqpDR1QKmmKZlBExArbqdrg1GY1gJavypI7XWPXRLVtQTI1TslBncx3CGNHwXEwSDg1LwdHYJHzqH6Y9w5ukVAWMfAgieL9lKGIpndU3Gv2xx+QS13Z3YJrZy3PT8GFerh5b+6ON3e+wOqStzpWi5aAsg9ZX+FRWP9Wasj+n/aaYaGtiUMDShWFBzqeq6/X5Tgsm+PhitssominwbjG5sZWU5a0ZU/DUxNGYUlgAfWEJano60BodoyTQpbO9uAgjYmIR1VWHpEfuQ+j8+QwCLINCv52SEM2pJF1onLMSDTGJaKhtplXdjW4CyUbQSq1SamMmrgMig+ETGQSvICZpkH1yblHOYsPZmoN8GAjIxHru13OR/MnQyWkq6QDvKC5B4IhUjFqxAmU7tqKc4JraasVwGk1H06p+jXcgQgjwvxG8MqTnGvgq06mAfOflwBV97bIqddcFc0VsgI++sq/3xpu3HM7VwrMHsRN6ULLCgVeQrNAtA9s4i/8rHYvmTFoQEXFN9oKZjvTsg8bMvhblIcVLaSQdy2bUwbdL5uPi8BA46FrpuftBGIKCEbh5M3QHj0AZM5qal2SLkt1Q4ZtKaiVj4HsY08lhUyJDqf0dJoVpQndgLPoarNymTYyLVA28KPEFMSYnNDISoc2V8GkmaFiPJPdSuOnXTPtT9yVfkotkcvKY49Bx1tPLbEWI5V/9XQmPj8N3f3wYj9BPeRtZpzdrCgnwxsMhkcx/NOPG7lb8pLPhA4bf/NCn4uKIYPXlOZPE8BB/Y0NvT0bK+n1rNTEhI2vQUis+9inpV24N0vJURobWspBd+67tOGeeMj8k5OqapQvEVxU14tvaeuUA7U6rZ0/DxdERsP9cyFDMpxBIbYyGIQSSJaqbNtIxx7R61sJPfckBhpkAodVUc14z+IkHODlI6UlNVrIx5koqAgOgktf50oQRER2NuMZyxN9zP/wnT2BuGq8nFZN2MgktGYKs2aPkb2qBtG0p3T9loq+qEQE3X0Fbq5tRCj5Y9If7oSd1yvrTo/gsdTRuKWlALQFeS+De4BOICgb6PWPvxVIGFn4xPlVdGRehN3sb0djd/WjsN9nPn3rR+oUz3nmwlkFNsWSnZXDUOFTSZKmG7NxzTf282YfiAnxfv3nkcOWb8ipxodGs/CY5Ho6130A8/Qq8Y4dB7e4lNfHAcugQ2VMMR7xf+FZopZcPbKD/T0ZEgCHFCkOLZXF0dJD5kdpIDZBrGWsq5QRvhiKH0Oof0WpHDHW4kY8/DFMg7VzSkMowGq1lGm3iyRoD5EqlBZMTrDUnJqHswvMx8vy/IyQlRVFLytkWgQWPPAQj/Z4b77kbnyeNwO8qO3GcdrJjhMtdgaEasEL8fdXfDIvSKx5X/fHOnmsnbTqUqYUSZWTI5kk0D+oy6IEle0+CaiBEucrTtyYGfn/J6+4255AwfD9pNPw6ycSIkwiCRcjZ1Pq6gfXrYdz8I8T4yaBXlzCj9qhRFY4KhWx4yLActCDZaeMmldExBEe7FyEsWZyMLJVZs36kJMEMKgymJhmzcwdMjK4Xn/xAMsZ8RRZtBjiNSslfvAGpo+B8ELoL5pPnSsYLtBw9ipCoGCgNbf2sl/Lg7Ntvk1Mm45O778LmuEQsrVOw1tqD+3x98F5QGG5vbhMZTBRJCfDu1EDVLxIMCVDJZx68WqFs3Rkl/dR2ksF/Lt0t5qJuTqXHcR1Lv1xbcTlMC5dBt3sv8OifoPzmMuCbr6AyRUuRlIkDrlnnvfSa783VS+eIgfSIvkdINw5lNFOCdEUz8ZUCOZPHNGplJAv0jomEL0EVcv1NCJ3OSNXMw/00lNRPGiplHTL/UCFVlG5jhexRIRuWLiGJZMmzpNuJU85QW2SsAn0xKmPEpB9S5+ertaeC5JGJ0UJqtw0Op5gl5zbi2BT0WlSdXj9uz8LJEylnyiTdITNeQ4JiyV4eKD4GXYjcruUgyeLD7Jq+8kZETp1F/FB/27kFIiyFqVeUk1prOdBkWxxYCS8rqZG0ottbWvm1gdB+dmbjoLd2wIehx5K+eFOa9+L7Jp3ZoLBvIoD8uD/pyUe1qAbMocFTglJSKVIcbSH7lFEPSnElUNHQf4z3cpO9ylZ6UysFZUAUlmluIN2SOTiycSO+uuEG+CePEFdWtChyHsJOvgBNDpeSRAOqLM12pk/r9boIo1cMfx4Pb2Vg3xApQw5Yeo90/vf7BqPZyQophj0kGH1rvu8nvwG0nnPuK0nOHKQgMutAkJpI908fTQty3cPozui0NLJEkgVpJD1RAq9z58LvvFUI2LQOPmEJnCmGfkDp8O2og3PaHFT9uKWfRZJCmlinHGE9qZKZ7NQcGgrfKy5nfE8xUct4BJmESsNs34lCrR31O3aht7YGqcuWC3NgkJK/dzc2XHkldCNGimvKmpVAWuCLae6QfM5OiiZ9oCyKw0mnIAFrMDDGmSVd/hkiZcgBq1e422QceSQzZBrZySpngOEn4ZkNw0w+On/RYydDoamAyQgOyZ4ksLiQacHS2aVNOdTx97VwX3ct9MkkBHkUqH8+Cd3siQh55F5EEFj22EgYOmxwETSKVwRaD+9DJxfJoOhS1jRLOdKkhRrAfKWS0EqbeX6FJswro+J5LY2or69FX/BwtL74vHbeaEuvcjL3CNYuPxcdScNxdVWbEkhK1U4LfC5bKMHqT4opg/tYhK+ZrgS2nXPVa+Q5S+4dIoWv5BAp4f3O1kqbvYJTD2OErw/5EUUkUgg9hfHjpE/8whYpErVBAktGDUg3jwSVXCT/9OYcWI0pY9B1KAudeflQZk3UQmUUH5o+v9uFANq3ot5djZjjOYhLikRIUiw/aGmAwYdzQCSNhm44P0GXOhG6tDnwGj1Vs43501bmTdkLW/cyKZbvKcNoMHEUOhhB0dVXgK4of/owjXAsPw/HSPW+ZCZQI4XzlY3dCOUMyjJraDcZ9WzWlkSQhdP91EjqJUuCH5/R7RZNVhd5LClWeroqMqDL5NwV8vdgLoO+gac7b906jUHMOXysRF2SXjs+wG8Yj3kO9vbprjL54VO+8f7MSogj5ZKCuo1gkvYoCTopREv7VTITKo5wjqoibid9/CnC//o6MG88nW6l0HHyDrGVSQ43XAOFQrX3NVdrMpeFdMRtiIbSyVmXu+ykWC3a/kDWEbZzJ/zTFwDfbqdA1KkpAZgykvMSka6t+45Zz0z3L6piYoYfWnfux4mtm+AMDscVLh1C+EKUEfjH2O4LGCc6nOCTCbQxdHJ/YevilRDjQvzopRQnF+z+uUTuADKgZBCJyNIyxMklNdLWf2xw/R0yFItsQnNMs/tsXU7n1iSGB98UHeG5uacVPTQJ3OIdjMf5/u8jnOoJLc7zjyqOQQsNnm7KVid5YYurE42tDZhz8Uok0izRuXkrlPMXQdCpDBohsa8A2LANEeetQHJJEZJfex3D5i5GtLsV0ZwyQcp0UZdcidj3P1CGMbTZf9Ik4HOaHoqrperHGZOZnrp4NhrXb4Rr+35ccsNNGDs+CVvUTlTw3gfMvvixsxXb+5o53aQVufQNXscohokKP7PC3yv4VYxqRjM8wa903p08zBPj78toDOdPvK0q7jnXS4Kq7+6xy3p+O/FhCSpJvXhsUJahQ7HYfetOscN9bd1vn+/ldeudyYmGjxpbxCvWLuV5UzBedwfjMVcXEjlNkB81tUL6256i8TSBtqVl8UnwZv7fxyNHcrAE1v58AvEff4gpx48i4J6rIP7yCRRqgTheBVHeAPPCNMRcsQoRl17MaYg4rQepno5RC0Zv+gOlp6eU5+0+puUaggGIgn5C5ebL0H38OEp43X4aZlMK9biM95saEY5H9u3D3WNHYxqNqyW93fg9481uUPXoYpjPHn4XbA5B5c923u2kKYIv0W0pnHyeppJdre3vashpqtGok8ej0E+gEU1t92D9I+XFIVVOhdO4G+fNfCcqMOCOtysq7XcXnvR6jqlV9zDeqoc2pT0uG17hJ+XeWXQOUmhd72BgYER8LHqp5W2urcNN+UdxP5njLL8IJPZVIyU/j3O9JwJraKo4UUlWyM+SMIIBkgJR1kJYEP1AnLnG5lCU1i4h+E0dzX5FI6kgC1VmpAIX8ps6DHEuSpuKstBk5DMy4rvuRqQa/fDIjGkYzuhTH4K9jWE60QzROcy4/Lk5h/A+23yJ3gcqp+d+Uu3COxaL8vH0cfYbUoaZm7o634redPB3A5P7SgrVzwol+aa+OIhZ4dADFhUxyRb5Npj60uec8PX1Tn2upMz+WFmV10oKvg+bQ0ScVSjP+DvFM1OnKrU7qdFRz5oyJx1f9nTirrzjuD8gjP65XoznhCGj+GUJJohh+LZtCF1IeYnJDmLXIaC+nZEPNG/KSdsGekma7uXd+YUL4UVinxQFZdEMIDEWjT9uRuWll6IiIB75ZHEehrr4m8ya3PQ+s3P2L0hHFJNCTuYdZXhxNKJmj8a5e/fia+qWNbRf3GNtV4oEZ+2dkGp/YEySuc9qOeH//Z40Pqe7YNVYky3YLGTslcb+ClZxIuXBl/J1JoUaUqxQNlyC6tQb7PyornnxLbGRhx4dmRIz0t/XsepogWFDX7PuIooe1d2qUkfXyYiZU9DZ3oVAyiuL6ba50K8Kbn5LcCS/EnG0oxnWQGbKMJPKuXQpou97EFF33ATfmxiUxzlJUUHxm7mAYDqXVACkuwacRRnR4QxhjoYIDlAsNTWi/u4/oOr9t1EbPxKF7Z3wZS6hnG9URzNUkejDbbHx1GL9OU8EuVtkIuIZI1/K6IpqynkXUxkopMuSj6ZumDPJfcmwaE7+0VfzYUvdUu7TIhhSxjqzXW7nJ/z9HnVDHUE1qCMb2M7T76LcHlJlgCW+HBMTdltK4kZ/f7/Z9XSb/NjS6vy+pUW/ua1Lt4IxW4+lTUEYbV4/NDVijH+QmB0eye+FVSCLlGs8Ncg6zicqmE4/gS6dYWUFmm0q/K7fI+j8ZfBLoa4W4M/JAmkf45ymqsupqGRnru5uYT1Zjq7N29HytzfQzJ6rHjEGpeU1nNGGFJAzJ7c5KayTsN4yYzYWMYt5Ow2kDs72N43JFfVMeH2ac0QUcFruRdFh6tLYKM+yyDBTOMNnevr6Dr3Q3Hre8znF7XJAev80fJFfoH5nZ4tnbshL5fvEWrowL6f6OMjLAJEf5M385eYNgEserZsz45FYs/lhTtoe6KEWWOR0eR4+8rNuM8F2Ho9TChKUjJSE4SNxb+ooNFAwfvtIDsKYCOFP6iVDmqMYCJhEEAVUl2huHOnK8ZueDjEyEbGJw+BsaUfT+iy42wu1qE/SMnQkjkKl3YbepnokGXwQSGPAfrUHYdFxuIeJHIpOEa/l5ynr6mtAZxBTz5hny+XaiCD8ecoEdZiZDkyyVWG3dvBzqy9HbT3wPA9D3JBuVj7JsrsyktcrijrD8GRVnNw/VMqQBpbsZDnjyuWn5I0v09LCFvl5XRKh6u5VgnzHXn70mMe3rl33GjXC5tYewQwwpcbVLj4ih7l33iKMCQpU1lVVknodQxrtSM10/na5nf0BfYwyCGAyqXdLA2f9c2D5osWwUhHYt49hxgmpmjmjldpiF+ewop0eiZSnWkildrJNv5s2SywIC1ey2lrx4+EDYg4BfcTgi8sIvPF0Cc3sqsW5w2PU1yeO0bucroJ21fXy19aG7+7LqtIMWAORHEdui/GZHOdlcariee+Mqkf7J/XNGvRsUI7LkJOxZKPPLKdApZB66RlxKnX199vT58aGKMpYBtQxuBg6s7SI26zKsKkTMFo/Ukk9dFx8sGeXsj11jLgrabgynYGBLx2mtZ1THY02BqK5pQ3VdGjLCSh9aR6oYlTnLJoZ+FU57OINoprI/Oiykdb8yQSLD+WvLGenCB2WiE/ozHYyHuvJY0cxsrEWd+jClCbmQFoZEarq6XjiqyxZp8NDnmnU69tdrrXRm/d/ItWC3/cnkHgS06sMIGEcF2W+VccpjFrqXR/wEpYsNmpolEFrYPsPdp8gqNwU6ikMSemeUx+whDP7Rs75KT+fYyKLs1Igb2cQoJFiyu+omU1mRvW1W39ggrULb81PR9IYfr3e1Y14Glyn8isTDtWBEs5qI2fg8zDt3kGBO4v1NqpUChgAmMgpiVrd3fiQrO/S6bPwxPiJysH2NuXPO7aKixvbMc8YwbR/fmeHUxhJcZZWMtrZBZM/mNghIyTYLi9+n5M/wck9jPIZuCWSMqrkBZKNxrp61dUJr9VUaLIVDaRy/1AoQ55indnJuRUVfPGpSnnUMmnoSTF7K2/xt5xv1EzBuL2qgpZFPrJiZhCCA5MMEcqLFMY/2JeFsOGp4o7hKcosRiq8cuwYYno7qQTyU3O0hjawDsHQG1m5JIkq8wvdLhW7+MHC6IQkfMEQY5cqlIc5A+A4ylq/14crMuXfTsBWcg55OfuNTFMLobum+1SPD/M2aw7mXo+rlFUydKf1NGhsTwxfSIOsr1dG+UPaMf4ZCgL7QFvl+tdCsbRn0jKoudWrw1FwUMf4+5EsAKUUrgM4DwM/mstQKn4vUMZtcX83J62VZql7SFmGl5coF277UXQz6O+1WXPEmHET8TbnrrI4tMACDVhaAB+vO87pt9fTBXPTzDl4nFQuhxPd3rljC1Y2tWMh67LRSS5jwE7QvdRNh/J1On5BlYCOI9UsksyZOB0fHGhgHLQotzjz5A6kt2pjYXtk+PVms26Xj4/+B+vDSX+Qh6RsJddDqfyqgEX7jvbWp+w+cFx1e4qnBgfJ51M/bmmBnkkTXZzPs4FsyYdsTE66wU82MayGAQkEYYwhGBcwH2f+ob14szAfiyOiUDh/EVLC+id1cfAcK6mcLLcmj8S35yynWcGM3x7ah3dzD+EJXShC9b7oom1KnnWYRlkDkyfuiUlAG/ndaLNZyOTZD+RkvGzTtJBAxaF6ji7KPFIidyDarFFb4nyMTO6Q5FGvV9K1Y0Pwz68KWOz/AUe12uRwfhVIDeyd8amez0h1tjLzZWZ4MPZTkN4oLKihaMOpPlDOULwDhMI2TqXNaZPwkjFAZNdVKTG7fkIT7U0vjpmINeMmYQzz/9KY8Jo9ZTpuJ/vLpl1s+O6daOlow7kU+PNVO04wL/AY69up2Cmgq7iUCaeNDNzLp0x2Ln2B37os4jvKbx9NHqXKOSganM6PJGak2QSN/ZN7mJ+f8qi7x5PtsnoqLRbxaD+msk6zyf7fg/8vX5BfV+GLrrl84uICQipGTTzp0BtCLth70JNlselyaHaY5tbj61Z+dNLVp4XSyCmC5JTZkmdKpse0fVztFYhK1SUWcEbA5+OTlYeShqOmQpv4BjGJcbi3IB/vtDcjy0SrPWW0raqVcOqXK6SAzqh3TUiXKfkLDL5iub+/soczMs3vaMLyQF/PxoUzaLhS67w2ZqXwdPuAGaHtsZGxfsKz0vxcuRQNtXKmf3Bg31BYDzne/f/qVL4p/D4m5zTIze0ojLf9fmJIyKfvTp/iGZW5T5leU6lsjojFlRTQl9j8UEwjaQvlLBm/5U/rexIjUJPob+yUEQduG6cLAsptfegi5WqpLSF908OPya2C0amyVFJeWqHzxhQK+TXU/hpoQeijoO7FGLBoCuojvEzgNNrKBgaAXkogsoi3Zkzm5CJ6nOjpuYu/7dIPqGRkaYJXoE79gfsmbR4xYvWKsjLHAODkhWfLIOkB6U+UTamdN+sv4sJzRfHC2Y75XkZJWNQ7Td5qTmis2hGeoFqC4lWr/zC1LzBerfKLUb/0DpHuEsl61EfDYtRk6NVDU2eotrQZqn3SNPXIpDSV9iv1d4pJO2eRolO/NwWrDT4xqsU/TnUFx3tsEUlqc2Simh0cpd5g0M4Ti7x93MVL5jjFFctF9bI5T7F+xsbw24t00cht+yMp74oXR4m2B5Knyd9ywg+5PlsGXw9IuVwjLbXzZrwkViwRvYsXiDdGjZCytbQXacC4nNFVdxi81Cnyt5y4huvbfP3V/XPmqeLCS9U9SaMl0Dxvjh6jvj0yVWXgivoTAtQ6JVz9nFOOXCajs07VNZe+l7uNXuq5TAAb2Me1692Jo+yW8xYKsXKpaFg++xnu0+SqAW3P8ocRT4pXxojeB1Pu0Y4NQS1QtvvM0k/Tz9zzK9geAJT2KP1ClyifNf2qYT7efzN6mwNbyNoOdfd4fu7pUfa3tCn7evpwPyfmSOa3oycwymFCNI0DZGOor2Us+8+oocCdpUpWpsNsTugov9zVRjOCDH2uIkbl7HveNHge5b7XqHVeGxKEtMgwmhQCxORAf30wTR0Om62t1mq9KyXz8FpJqRCT61EyoFoeGPmoT5Tpz/yc3Qs+L5U+MhS+k/PvgcivDlgDwrt8+FPbkjpId4/7kVGjQn8fHvxHRjtcy1liON2nXnzT2IhVx/JEMcNZolpsimdSAkISmf7FrBtlbz7roBjKidzc1J+lodNF+1QnZSmZsCGzaQ5RTJefjbvfNxQHdS7M723BkZlpIi0shEFbzBfyuCvaVPdnke1NryG3olvcN8tbee2AZhyz3p/6hneU8Xe2VjdBVfyIFNSRoSVLs+lDu/wqhfempRN8VafRW8nKZZ56hg5ZWSgYO9Y0tqCg/fliPMghe6Rk5vSrR/r7fRJt0mQg1HvcSmSIGZ1Hj8D/aA6hwgk/dJyklsZUO8Hk4CLnXpc8VAJKvpHSZCG/PSgFNweBV0/TAovwMTAS0OOxHu3tvGjK3qM75E5ZBkD1cXqi+TdTvTZ5BRsXWZrcD/i9WvzqrwlU8ln/f9mxFDng9On9pymmHAhp/5FUST6ILILaoFz76gIeDPP3L5PbClPTJbUiqJzad6SphXG3O/Vgzhpe0RFjpvWSG6W0sksDZpchRDi849DrFUU/n4eJGh6yvH5QSdYnqZO8YS1TYckwxWwm5kdQozTTzQV/rCQAABnpSURBVJPDebtY1Bg5r4NBKRsAVdO1E3zlAUmpuu4ac861U707qDkuam10rtBAJQX4jP92SsWUSqETa9fq/yv9LNs9JIp8yDMflNsGjar8B1p/JpjkZQO/B9bdS+an2M5beJM81nXe3GTbRenPW5bNi5a/MyRjkwZJFsvCeVvEskXivEB/5xwCwho9Qt1rjvAcQpDagUi1FmFqJULVkwhRS7gUcDmOYHUN/Dx7eI6F52yEv3rcHOmpD4jVBPbfxUU7xMXnip7l6e/Lewzca/uq5EDbA6M+F09PELbfj9m748Jxkdrx/wHtT2Rm/htOdGafy/v+T5d/04D/yRvKgWfhCvjzbb+Pfmz16138rckbQmQaFGWh5DT/1zKQWNBx8aJzvXX6xxqqO85TcnO7tbo5jtp6++6TrEQuMOuMy70iQv5ob27P588vnkxPP02l692uNSk+3suvjo8TV+UVYTftTYsD/JRH7XVMIFUZHCgJYP8k/jIBvovbubTSpys+ygydF4ppUbfTZjXOaFJe4aS5slwyLIbOZRVNqmut/F032WF0TEnNMCnKYy5VEb3NrlsD3i76QB7r/8b1f+8cogQQJ8mh55vls1dfHZGQkBDgY3LUcF+bBBeL1v/y+K+lDLAspTIvZ721uczV11BaWZuX88ZDK6+Okw8pH1wuR44cMUqA/NKDD9inei9enG6/ZPHxhvR0GZR5mmqd2tZJI6ncbklP97MQhA0XpMmseO28M+r2si+aX2tZki6mmk0uRrOrdWEJnt6AYertMKnXw6Dyw2/qX7g8zeVRmNWH4KVmKkHqZk6N+6khUBV+w9RtfuEatbo+Ktwpzl8qbMsW9DuWeb+G20aGOX4/utD+u9F/fS8mpr8NZONrV/Xbr2Sb/rNF6y9SJ641W5j8Leva/8P6Szqq8o+62iuZ2NorCvdn3iz3y5dXrn9VZeDhd2/Zco7wMIXK0iCEu4O7udlY2peXvfXyX3hgraMypAB+BtDOAIZ2SfnixYEZvyAv/uN5Z/4eYFHFs6fdKM5bJnJmT5MxUOr5eoOnKjRe9QQnqDuMoSpjndUbOU3HzVx+y+UuLg9y30FTuCoCEtRM/wgNVMG0dVUunOsUKxaLvNnTz5MNG7iH3B4omqlh4Md/Ys3uUiSr4/pfgUQIrY9QuH/X40IwD1z0iN66orb2k8dqDnz1caK8FXeeptb/iVsPzksy2RmyZXt/2nyu8HSKnobShqevvHlyfUFuBhEm2spOZMrj1QU528oO735oVf/cG3KXVmSnnNkxEiQD1Kvy4vSgge2B8wfW2nn/IOSfPnbKOt+wYPaXElzb0iZbeUyzvP8YFKlaCS4LKVK5d7R6zBiuHudS5x2jOnzj1Y6gYZ6/+gcPWOk9x+bNsokLlou6+TNflvWfCSppRRcZYwcmqRm4/X/H2v945tbltfmH1xdt+m589qaN84WwCntreUnWuq/mnXkD9t0vcoAzzxmS26eojmx7QHd9Sbuwt4iiQ7vvljtyf/r+/Kr9O2fLbUtLmUbGju3Zdq38fXLzZq8P7rorQW7LIus5BTLDWmo83HW6wxouuMCn4FQUqXby/+OPBN3AKa3zZ+8U5y0Xx2bPcJzv5+PifnU8lw/MweoB/yi1yD9azfeLUrN9I9RXjP4DgFJvIPsrXzjPJUHVnD7nc1mfBuZTdUuANS1dqmmFZ95v4L7/ZK3IZ5Osi8+qLQP99wJnhji646eL6/OPfNHXeJJyk6ROQmR9/PG8joqCT+V2yd5d98l6SzO3Lj76049av8rfPHT6eeXvX00ZoFqHdm5ZJazNfE636KgqOvbFG2+kyIdMS14V2N1QUibJeP6BHdefenBdU8nRwy3lx0/s/Ojt0510ZqcIymT8rblw/gODp1VxpkbaunDuanHuEuFZskhsTZvkuDkuUjqHpSAsFwmmgcV1X2KcY/esaWR9S4Vkf/WL5mjZNTwHGWewZcn6ylctDpT7/z1t+yWNTl47UOrzD2+UVEmIPmFrKROt5SeyK47slQGBxp66on0SaO7Omj5He1W/qOHpEDWF0rTyKwYWn+30G7N97dq5bRX51YIfA3R1VIvD239Ilw/fU19SKzsu72CWRrG4S9fbUHqEPSmqDmff9dyqVeENRT9nV/2874GvX3ppnLxmoPAUrX6uDafkkH+XrUxQmB6oo2DhjIvsixacFOcuI2CWivb0+SJ/1gyxf+ZU9cD0NLVg7izRvWShEOf3H+9bkn7w5/nT5svrJXAyzgDVQJ2/tJYUKDMzQ1Kj031y5nkbXnluJOWl6xrzc/5aenDX0x/deGO4PN5WXbRTCIdoKDzyJX9qCsrAdSf2br+K/efydNYIUjNLX1NZo+irV61NJ8U7f/xjojzvzBdp4LohvR4g5d9+/E5i1YmczXwYTUM6+fP+t4ToFl11JXTMIYQgKpVv3fFD2dcNPDCPHRTCKep/3v+bz998M06oFP5J1URvg+iozC8s2LtTC+EdOP8f1zyZAOuX8bTtf1AG5PkSFGfIRfqy+TOv6Fk0b526eGGFWHKOlYsQyxcLrp2epeeUti9esPrQ7OmLBu51xrUDu06v/5FS/SOYBvpGXlB2MPulzurCUo+kOFpx869DtJadyJXHW6sKNsnd1cdynh/O+Xwrjx58rrW8YHPZvn0R8vh9Y5eFZK79gtPggBGxaaNcHZWip75YpkBSv+Bz/hMgy2NDsgywwV0bvl4pO4amhrpjWTsW8mH0XQ2lZH+d4qcvP7u4r6E4V4Io/wxg9TScJIlXRWVO5g0fv/1xlKRwno4qS1dVQbGwNbE2VdTn52yVHVOwd9fYkpw9q0/s3nHxxr/9LZW7vOX+Xyq8UFI0g7RODxz/BYCYfkhLiz8xa9b43BlTJuyYOy0Z7713mlJogOQzsB5FsmStPqr/p+rW/yNrk+fJez03b1X4njVrFm945JHQgXtzre+szKe67BTWuqKTbcVH3mguyl2vdlZ5BPMhv3/77WktVYUbpAnB0VLWK5zSNMXSXS82fbw2KoPJSO/fe69meF375ptj2qvztwrhESW5u1+V9+CZ/0qTlPt+FYUPpnVqcU72M7JzpJxgaSpvET01FBq6xbbPP7/EUl+8XwiXyMvZfc2ph9Z3N57kPo+oPJJ9/dsZb0dJSuVqrbD8dcXNCe++8MrE3vriElYmivZl3pCTuW2SvF44WzWK1tdQ0sDBymzIO/IcY1K89n/83qjvn3kmiXWfBoe8Dy//F3Cdol7/TNM81S5tJa87pUScuftfbfMc7bkHQFa0f9dVffWlDqF2i5rcfc/Kk3mO1p72ynxSZ7soytxy/UAlfQ0nq7T++eSdOQTWetlv9qaTfe1lx3dUHztwz4ZXXhkpz60+dpCG4HJackpriDxWqYraosNbeKj//qfaMVDvr2mtPaB8oMyNG5a3VOYdET11xEynaDp5/IDc31KRv5Y9IiqOH/qL/C1LR10xKZZH1OZmX/3Wi2/FaMBqr7LWHTqkve1Hd265QXZid1XBj9/+/YvpwtooKVpvb11xqa25jPPbkp04Okhc4N9y8tg+TxvZQ21xeXtFXnb9iUNv5qz7TFMKeNvT7dNuzD+SImk+xn8Bnt/2b76avGP919OeXXRd7MB5uz77MPVk7r4nGwqOvNFanPttZ9nxLA78poLMbdoLIuvmooGXbcjUBHB7o+iuK6xiHdJ/qZX26sJDsr01OdlXyB0HNv9wgburWvA5pJ3Np62miMK7EOX7M08rC8d2bl668+/vTK86tv9bWa+zrVx01hQUHN+z7V6tUv45k90O7Pu1rU93sHywzR98MPnAj+sXc1Ob3Hzbt+vOkYZTygbOE3u237j+gw/mUBBtpBlVVB7e85sPX/wwRu3mB0I6a9Si/dl/WJ2RMbKx5OjH8nhPbWHWhi+/nCXUTmFtKG5lnXIgdSd2bppf+/MBEix+N6mmcLd8+10ElzxPApIWWnFi784/8vi/olzyN8tpsBXs2fFAd3VBg0YNPO28R6mtpfjYTx8SsAU5+whuFmphsi2SqvRrb72ieN/O3/ZXBbxy453D7C3l7q7KvMbOyhP1knIf2/7jyoHj7dUFBJZFNJw4tK6t7OjHni4SKwm0Y/uflue0VhZowntjweGN9YWH/9pXX9TOE0R1Ue57PKzbveXbc95/8ZnRA/XJ9f8GUJ1+XilzsT9OD5o8wN+aDFB4KPsx4Zb9RRuNtNC7SNY5YEe2rp+yc/36BJcUbLtr+o+T2gkOsqRodccP/PmHDRsmEjXkhOWOmrzDz5bs3TEv4ze3aW4feY+OmsJMKcPUHd7z7Ac33zyi+viB1VJOc7ZViS39Mhkky2KFfAEo0J+iMpW5e1/V2uNuEz3V+fndlSf2a9S2s05SQt+S3JwrJEis9UXV+79Zs2zbN99Mbfs/7V0JcBRVGp6enp4jYRiTEBKIi2CQ1aACgooIKykP1q3FXcBka1VcxRiOIAhiNAF1ODyikKAbV6CiUQiQTQjqQiRgLiDHEI4cMLkzIZnckxkmmUwyR0/3/n9nJotUqK1yrSJx36ua6e539Xtf/++/+vV7DVrQh6w8iLcSvDeGGk3+GqiTbyot+rhOk/sunnfVlh4fTEWrDwjLgWIMiZ7le/SVlpqCU7FD6Y1XTvK823iBHHaDjjXUlmoqTp8ULFNPPjxCMuL5E4yvT/81nwuOwOuJDMAQTP/T36Y/1VlfntPXXm0wN2vN1cW5cQhESVbWdPAsu5xGnb3xUuFheMiFvc3aujat5gCml2kK5iMHAr0NRCAGG/wsfP3FIsEZa2rSAsfi+O6qS8jBhGBpqryCBFBVnDek12ACFBRE16mDB2dyJiDmXj1fnvfj64OlYF56Wsp9WhDpeK0tPvMSciiwahs86SXZPzyPxGhpgaX+3DqdUVcB97fyP4Byfb9INMUBnBM4GJ975Mh0LCcQFnKsK+dPFhxNR04mDApPW1prSgt5sx6JMbNac/blveqPJmE5DDyfJuh7gnP1FhOUwCEGm3VL/vnw8HB0Og4FePsOskl4Q38KIvGHehQ6KHvgJ2LtdqkMPkTlLH3SpH1HNr2/J6EVorEfmAc+gHZKcEcJ2Py7t7Uyf4fKz286zdDLWDtsWQ8BplcB4bL48WlIpOieCWGHYx8QMzRMqWFFDocNzXI64/2E8cs2bzBCW4Q6p959x5OUT6DIpKsrmRH65G5sX+4330y+XNlmcI3zxWkNDOz2ZYfacesT+e4X1v927l8e878reBK4QeSinmuW85DH+d2ePSFeY7wXsN2d1ocWPbq9oKXqXjHsYMH4jRNNC5nyCuTZCI1zoATv6Wg/On9p2FGIQwLH/gk46aoaNuZnnTE9v369MHvDnS4MRmjvT7DENBJuQMDNxQTAMAlnPOAxbUd8UKv2wlkQL9aLJ76HQS8ALwbwBQX4XH72AjCZeKu+sh3TbgzgIzojiBoUsZZWkILg6eBMPCjybZjX0FC1C0xV3tZZ22hp0rZrMlLntl85Fw3184bassOYp+miZjZv7QJpDVzMYeKbKkrevZid+XvU3ThTo91h0Al1432MDRUlGeB7w3K60qI38V7gtBTuCRZwX3dDRT0oa2Bv1OIAoUHpLsB7gbUncGitVjuk2EP0kFiDc+yzZKTqT7eaYyHew4bQ0MG5WR4wYTSCD0GYT9Qq2iJa8OkTiyfdv2S2yV2Yz8/P5/Bc4SWFHcFhaSGVI7BXX1XDOpwXLL19Jfrm9or5f1qWB3OlWFj6WGRpay7HAqqg8TN69e2dWV/sfwzL26yWHmuPpJ/iXIox43wCvP2Uyr4BBxApTFaWSAQr8DaFrLf9qj5D7sVM8/GdeB9+eOEa6IeZy4MLh/T3WSu8RK5gRqbybmtu3bts3boWrFs1dkwo7DIgaqqv2nX5WO7exe+80wnRjLWtutlrwrSJFTknllqNvfmsvcKh17cfwzIhTTmCVYrLNQEG4HJLo8PCwhAIbL7QZ8xHwv+OACrUQwMCX1EIP7eTs06Td7uhvuwEuBpaBM4AXuvB0MvHRay5B9wM36GOBTrMBmwKEJ8R8xWdOPY4XqOvCw7IHZUpr70mcJqc1NQHeDD5OfhpsjJfxnwY6ktOg1jk+Jbqsi3FGSmPolLd31ojEFF9yVnw1fUBJ6qxHP78q998/+WXE9GaRC4HRWEZ5v+ExnM5f60u+nHFhYwDIJKHDziohk8hsb8IAp53XbptEQuaPoyYfX2lnjR33NjM5L33aU9nPdeuvbALlN3T8WAFdtZcOoGEZmi4sgvzleefXI0WZV9rdRNcDoledx1Dh6sV5w7hqxUWfESGurIcU0P5GThHywCckBff06SmzEUis7XVDPz40VvCS2fwV13G9NaK4pSiI4f+3FFzqaK2MHcdVgrRkjyczpOWNiTqhm4GJ3nJannrjlcWd+9andiyI2KuUGbwVdT12cj5z0TgxlE69BGqMT7qnPHTtZlYr37nmqV12yOD8Vybph72QWEahuzExGmVZ3IiLuecnDcYIxJ1aEsOWPRavq4gOxbjBHcDWFWov1ynw0gaSwuTrS2VQBNo7sMCt21VXJu2+OgK4G7lP2TMBYKraykrTk2eOVngSMcTPrzzMkwJ0n5/YGqy208n1I+ujGGstrKYF6d1xa/e0hm3epXuk6jw7viows64yG3G+DWCO+L6V0+eto/U45BIGYkNxI0fQbdAPQLFBzxwNU2FqlnDJ6tehSsFx4mVBc88o5TR4nBKinvAiRqmh6sdnfFRS2AtqwcsHLM/OPqzIesJ63hi7dpaOOBPICAKdLnA6Q8th8u1lxJ33JanXigRhYa6tqrVAlEDYXFuAmOnzHr05c/ffvv9uQsfmQpucLrufE31S+9EN2Bdlj8sO58OuyDiOQacuRAaGqODU/z9JKCuhBGNH0TerWLEL9CM2Ef1+j/WTvb12gQJId02R5yPj9eAFKxPnhIvgvn2iZg/v7LyxoGG0SMyjJqGInrosISlZPiOT1Yehw/+yuRy2WLYwTmeGnDO6HOwGrk3IzUPDOT5K5QfO1mXmZHSQVabbZO3mHkYVup4zu5id6Zn64ueeGqWb8iGDwSrEVgP1Dn4oId7Qv81Ha3V48fhq2b1sIp0XcpnY0vrq7l5clewyWyxTAj0WeZknccmbtpXbYB+wEqBFRIpw/AsB0ODaoOWLOgYcO5USmA3Yal0i0vMH3KxzqCgN5O2oqi/2X2Ga/utjBvRHOtGYJCoENwSk+5vD3+433h1+/KDErliEazUPhZmdfXIpF5jpA7XXRzncsolItgKkJIyNPMsHBfa7Wyc1EseE/74lEyJyDK7IHpF1D2Bip1AVCubEtY86+hndSqGDobFZvo7u6wapUyqgIVklJBeBe2g6tXL/X0UMmlNh9LoGi+TT5Lbfe7YkKCj5sxxYjsLVjyjvOvuCUtgJZk7BizsN2JvZh587NrKtmipR7zFf6TFlHWcr9JMi/j7OYo6hWVgXydrvdGSOG28752wS9mL4L6ycE5XgB8jfrazr/8IZ2djZ6i/1mBeFJ2jhaiwvaOKY2GDPYHfG8lQK/cJD7UuLuL2ngGxaY56H85ZF3XFRaaCYLxookTJsLXvHG9GstJ3094lht3rkjiKq5VwfLDN6WpQKphtpn77075eijdsDvsRqVgc6+BcmdcszozxY+VqF+sagLWuKlmaSZWK+WQXy1b1mPsTVEp5NCWTBsICIeZmS8/KmVv2tzZve/VBpReTBN6MqxRN18Mape0MTTXr283FgQGqWDtD1TNOHpb5o+4F7lRtswwck8qZaEYieVgspTv67Y515j6r3V+lnMGJKQ1wtG7sCwwkCRCU4KjF69ESRhXH8oDqFk/g14KBsVVNUW+pBRPfQ2xtHdfemJmQjg5HDFnG+FVLu3etKqQpTuKzPjGye+fKeLmE2mrutW5WKmT/4ljHG7C5ZgMYav0cJbms8qZgsiFs+OtwFopkzDwR71DSsH6jhXWVNemu6WbOCmJ8NiTON30aFXO7wjsK7hELOp4NOKoZxmoTWIdeTp4102JmYUDA2PEsxffSLG+TUGKZzWarkkkkLzIKmavT0B03McB3qv/GfdlCSwf/9HjAPqanh4up8NFHVNj+m5rXmDhSg0cnQtGI4gGVa0FUuDmYh6hwtGMf/Dbuiexn+fVljS2L4JK75nD+0+Hi4sqbDF8AAO2Gru5vbazYDz6eV7D2gUCjoXeyi+NhBW9JGIioXFosMcLu895Sidg5JhC2saDFis4PIpaCfHoMyuN7QNhY1QFvk5z+DlwgkKZV+2JyUmAlXaAt8Zz2a86dHW1dB3vMPYeCNn/993FvJT0YtDnp81m7v7saEPOVQFQo4pGY0HgQ+gJ6X3j4yN6ICft9szBqReHNOoTxbisOng/q+8DVBrV+vBblAbGFDiNaUEeaHOz/O1judrKxu+eMapwqUNsxcO7eQMVy2EQny1shj4Z6ZKZeS7JcoZyhYPgFsMJfdsCbe3C6iuizp6fKnp710MIxSi/7hJiksxA17Hs7D5cVhWgpUeV0Ho/UKCYg7Ptw4VdJWMN1FCfrhaWlgd4MjnvgDpAHlgxSuwAAYBSD1uZw5X5u3NA9sIL33nPBHeBOqIEPuk5+br2k3ChDAJ85EIPkAhgFgmgVRBPMHk0Loz1puCgaEqFwxC9s3KLW01VBjEEeuP6/GbCevpMjQYAgQBAgCBAECAIEAYIAQYAgQBAgCBAECAIEAYIAQYAgQBAgCBAECAIEAYIAQYAgQBAgCBAECAIEAYIAQYAgQBAgCBAECAIEAYIAQYAgQBAgCBAECAIEAYIAQYAgQBAgCBAECAIEAYIAQeAXReDfxZF0oKfrmbUAAAAASUVORK5CYII=";
function Ct(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
function wt(t, e) {
  t.innerHTML = `
    <div class="sg-topbar-left">
      <div class="sg-topbar-logo" title="Menu">
        <img src="${xt}" alt="Super Grapes" class="sg-topbar-logo-img">
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
  const s = t.querySelector('[data-cmd="undo"]'), a = t.querySelector('[data-cmd="redo"]');
  s.addEventListener("click", () => e.UndoManager.undo()), a.addEventListener("click", () => e.UndoManager.redo());
  function o() {
    s.disabled = !e.UndoManager.hasUndo(), a.disabled = !e.UndoManager.hasRedo();
  }
  e.on("change:changesCount", o), o();
  const i = t.querySelectorAll(".sg-device-btn");
  i.forEach((g) => {
    g.addEventListener("click", () => {
      const h = g.dataset.device;
      e.setDevice(h), i.forEach((C) => C.classList.remove("active")), g.classList.add("active");
    });
  }), e.on("change:device", () => {
    const g = e.getDevice();
    i.forEach((h) => {
      h.classList.toggle("active", h.dataset.device === g);
    });
  });
  const n = t.querySelector('[data-cmd="sw-visibility"]');
  let l = !0;
  e.on("load", () => {
    e.runCommand("sw-visibility");
  }), n.addEventListener("click", () => {
    l = !l, l ? e.runCommand("sw-visibility") : e.stopCommand("sw-visibility"), n.classList.toggle("active", l);
  });
  const r = t.querySelector('[data-cmd="preview"]');
  let u = !1, f = null, m = !1;
  r.addEventListener("click", () => {
    u = !u;
    const g = document.querySelector(".sg-editor");
    if (u) {
      f = e.getSelected(), m = l, e.select(), l && (e.stopCommand("sw-visibility"), l = !1, n.classList.remove("active")), e.runCommand("preview"), g.classList.add("sg-preview-mode"), r.classList.add("active");
      const h = document.createElement("button");
      h.className = "sg-preview-exit-btn", h.innerHTML = '<i class="fa-solid fa-xmark"></i> Exit Preview', h.addEventListener("click", () => r.click()), g.appendChild(h), document.addEventListener("keydown", c);
    } else {
      e.stopCommand("preview"), g.classList.remove("sg-preview-mode"), m && (e.runCommand("sw-visibility"), l = !0, n.classList.add("active")), f && (e.select(f), f = null), r.classList.remove("active");
      const h = g.querySelector(".sg-preview-exit-btn");
      h && h.remove(), document.removeEventListener("keydown", c);
    }
  });
  function c(g) {
    g.key === "Escape" && u && r.click();
  }
  const d = t.querySelector('[data-cmd="toggle-navigator"]');
  d.addEventListener("click", () => {
    const g = document.querySelector(".sg-navigator");
    if (g) {
      const h = g.classList.toggle("open");
      d.classList.toggle("active", h);
    }
  }), t.querySelector('[data-cmd="export"]').addEventListener("click", () => {
    const g = e.getHtml(), h = e.getCss() ?? "";
    Lt(g, h);
  }), t.querySelector('[data-cmd="import"]').addEventListener("click", () => {
    kt(e);
  }), t.querySelector('[data-cmd="save"]').addEventListener("click", () => {
    e.store();
  });
  const p = e.__sgAiConfig;
  p != null && p.apiKey && import("./ai-button-Cwt18xty.js").then(({ initAiButton: g }) => {
    g(t.querySelector(".sg-topbar-right"), e, p);
  });
}
function Et(t, e) {
  const s = document.createElement("div");
  s.className = "sg-modal-backdrop";
  const a = document.createElement("div");
  a.className = "sg-modal";
  const o = document.createElement("div");
  o.className = "sg-modal-header", o.innerHTML = `<span class="sg-modal-title">${Ct(t)}</span>`;
  const i = document.createElement("button");
  i.className = "sg-modal-close", i.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  const n = () => s.remove();
  i.addEventListener("click", n), s.addEventListener("click", (r) => {
    r.target === s && n();
  }), o.appendChild(i), a.appendChild(o);
  const l = document.createElement("div");
  return l.className = "sg-modal-body", l.appendChild(e), a.appendChild(l), s.appendChild(a), document.body.appendChild(s), { backdrop: s, close: n };
}
function Lt(t, e) {
  const s = document.createElement("div");
  s.className = "sg-export-wrap";
  const a = `<!DOCTYPE html>
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
</html>`, o = document.createElement("label");
  o.className = "sg-modal-label", o.textContent = "HTML";
  const i = document.createElement("textarea");
  i.className = "sg-modal-textarea", i.readOnly = !0, i.value = t;
  const n = document.createElement("label");
  n.className = "sg-modal-label", n.textContent = "CSS";
  const l = document.createElement("textarea");
  l.className = "sg-modal-textarea", l.readOnly = !0, l.value = e;
  const r = document.createElement("div");
  r.className = "sg-modal-actions";
  const u = document.createElement("button");
  u.className = "sg-modal-btn", u.textContent = "Copy HTML", u.addEventListener("click", () => navigator.clipboard.writeText(t));
  const f = document.createElement("button");
  f.className = "sg-modal-btn", f.textContent = "Copy CSS", f.addEventListener("click", () => navigator.clipboard.writeText(e));
  const m = document.createElement("button");
  m.className = "sg-modal-btn sg-modal-btn-primary", m.textContent = "Download .html", m.addEventListener("click", () => {
    const c = new Blob([a], { type: "text/html" }), d = URL.createObjectURL(c), p = document.createElement("a");
    p.href = d, p.download = "export.html", p.click(), URL.revokeObjectURL(d);
  }), r.appendChild(u), r.appendChild(f), r.appendChild(m), s.appendChild(o), s.appendChild(i), s.appendChild(n), s.appendChild(l), s.appendChild(r), Et("Export HTML / CSS", s);
}
function kt(t) {
  const e = document.createElement("input");
  e.type = "file", e.accept = ".html,.htm", e.style.display = "none", e.addEventListener("change", () => {
    var a;
    const s = (a = e.files) == null ? void 0 : a[0];
    s && s.text().then((o) => {
      t.setComponents(o);
    });
  }), document.body.appendChild(e), e.click(), e.remove();
}
function Ce(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
function St(t, e) {
  let s = "widgets";
  const a = document.createElement("div");
  a.className = "sg-sidebar-widgets-zone", a.style.display = "flex", a.style.flexDirection = "column", a.style.flex = "1", a.style.overflow = "hidden";
  const o = document.createElement("div");
  o.className = "sg-sidebar-edit-zone", o.style.display = "none", o.style.flexDirection = "column", o.style.flex = "1", o.style.overflow = "hidden";
  const i = document.createElement("div");
  i.className = "sg-sidebar-header", i.innerHTML = '<span class="sg-sidebar-title">Widgets</span>';
  const n = document.createElement("div");
  n.className = "sg-sidebar-body", n.id = "sg-widgets-body", a.appendChild(i), a.appendChild(n);
  const l = document.createElement("div");
  l.className = "sg-edit-header";
  const r = document.createElement("div");
  r.className = "sg-edit-tabs";
  const u = document.createElement("div");
  u.className = "sg-edit-body", u.id = "sg-edit-body", o.appendChild(l), o.appendChild(r), o.appendChild(u);
  const f = document.createElement("div");
  f.className = "sg-sidebar-toolbar", f.innerHTML = `
    <button class="sg-sidebar-toolbar-btn active" data-mode="widgets" title="Widgets">
      <i class="fa-solid fa-grip"></i>
    </button>
    <button class="sg-sidebar-toolbar-btn" data-mode="navigator" title="Navigator">
      <i class="fa-solid fa-layer-group"></i>
    </button>
  `, t.appendChild(a), t.appendChild(o), t.appendChild(f), f.querySelectorAll(".sg-sidebar-toolbar-btn").forEach((c) => {
    c.addEventListener("click", () => {
      const d = c.dataset.mode;
      d && m(d);
    });
  });
  function m(c) {
    if (s = c, a.style.display = c === "widgets" ? "flex" : "none", o.style.display = c === "edit" ? "flex" : "none", f.querySelectorAll(".sg-sidebar-toolbar-btn").forEach((d) => {
      const p = d;
      p.classList.toggle("active", p.dataset.mode === c);
    }), c === "navigator") {
      const d = document.querySelector(".sg-navigator");
      d && d.classList.add("open"), a.style.display = s === "edit" ? "none" : "flex", o.style.display = s === "edit" ? "flex" : "none";
    }
  }
  return e.on("component:selected", (c) => {
    const d = c.get("type") || c.get("tagName") || "Element", p = c.getName() || d;
    l.innerHTML = `
      <button class="sg-edit-back-btn" title="Back to widgets">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <span class="sg-edit-title">${Ce(p)}</span>
      <span class="sg-edit-badge">${Ce(d)}</span>
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
    `, r.querySelectorAll(".sg-edit-tab").forEach((g) => {
      g.addEventListener("click", () => {
        r.querySelectorAll(".sg-edit-tab").forEach((C) => C.classList.remove("active")), g.classList.add("active");
        const h = g.dataset.tab;
        t.dispatchEvent(new CustomEvent("sg:tab-change", { detail: { tab: h }, bubbles: !0 }));
      });
    }), m("edit");
  }), e.on("component:deselected", () => {
    m("widgets");
  }), {
    switchMode: m,
    getMode: () => s,
    getBodyEl: () => s === "edit" ? u : n
  };
}
function we(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const Nt = {
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
}, Ee = ["Layout", "Basic", "Interactive", "Forms", "Extra"];
function Le(t) {
  return Nt[t] || "fa-solid fa-puzzle-piece";
}
function Tt() {
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
function At() {
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
  `, s = document.createElement("style");
  return s.textContent = `
    .sg-drop-indicator::before { ${e} left: -4px; }
    .sg-drop-indicator::after { ${e} right: -4px; }
  `, document.head.appendChild(s), document.body.appendChild(t), t;
}
function Ht(t, e) {
  const s = t.querySelector("#sg-widgets-body");
  if (!s) return;
  const a = s.parentElement;
  let o;
  if (a.querySelector(".sg-widgets-search"))
    o = a.querySelector(".sg-widgets-search input");
  else {
    const u = document.createElement("div");
    u.className = "sg-widgets-search", u.innerHTML = `
      <div class="sg-sidebar-search-wrap">
        <i class="fa-solid fa-magnifying-glass sg-sidebar-search-icon"></i>
        <input type="text" class="sg-sidebar-search" placeholder="Search widgets..." />
        <button type="button" class="sg-sidebar-search-clear" aria-label="Clear search">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `, a.insertBefore(u, s), o = u.querySelector("input");
    const f = u.querySelector(".sg-sidebar-search-clear");
    o.addEventListener("input", () => {
      f.style.display = o.value.length > 0 ? "flex" : "none";
    }), f.addEventListener("click", () => {
      o.value = "", f.style.display = "none", l(), o.focus();
    });
  }
  const i = Tt(), n = At();
  e.on("load", () => {
    e.runCommand("open-blocks");
  });
  try {
    e.runCommand("open-blocks");
  } catch {
  }
  e.on("block:custom", () => {
  });
  function l(u) {
    s.innerHTML = "";
    const f = e.Blocks.getAll(), m = {};
    f.forEach((d) => {
      var C, v;
      const p = ((C = d.getCategoryLabel) == null ? void 0 : C.call(d)) || d.get("category") || "Extra", g = typeof p == "string" ? p : p.label || p.id || "Extra", h = ((v = d.getLabel) == null ? void 0 : v.call(d)) || d.get("label") || d.getId();
      u && !h.toLowerCase().includes(u.toLowerCase()) || (m[g] || (m[g] = []), m[g].push({ id: d.getId(), label: h, block: d }));
    });
    const c = Object.keys(m).sort((d, p) => {
      const g = Ee.indexOf(d), h = Ee.indexOf(p);
      return (g === -1 ? 999 : g) - (h === -1 ? 999 : h);
    });
    for (const d of c) {
      const p = document.createElement("div");
      p.className = "sg-widgets-category";
      const g = document.createElement("div");
      g.className = "sg-widgets-category-title", g.textContent = d, p.appendChild(g);
      const h = document.createElement("div");
      h.className = "sg-widgets-grid";
      for (const C of m[d]) {
        const v = document.createElement("div");
        v.className = "sg-widget-card", v.dataset.blockId = C.id, v.innerHTML = `
          <i class="${Le(C.id)} sg-widget-card-icon"></i>
          <span class="sg-widget-card-label">${we(C.label)}</span>
        `, v.addEventListener("pointerdown", (L) => {
          if (L.button !== 0) return;
          L.preventDefault(), v.setPointerCapture(L.pointerId);
          const S = e.Blocks.get(C.id);
          if (!S) return;
          v.classList.add("dragging"), i.innerHTML = `<i class="${Le(C.id)}"></i> ${we(C.label)}`, i.style.display = "flex", i.style.left = L.clientX + "px", i.style.top = L.clientY + "px", e.Blocks.startDrag(S, L);
          const b = document.querySelector(".gjs-frame");
          let y = !1, k = 0, E = 0;
          const N = (M) => {
            if (i.style.left = M.clientX + "px", i.style.top = M.clientY + "px", b) {
              const x = b.getBoundingClientRect(), H = M.clientX >= x.left && M.clientX <= x.right && M.clientY >= x.top && M.clientY <= x.bottom, B = M.clientX - x.left, w = M.clientY - x.top;
              if (H) {
                if (k = B, E = w, !y) {
                  const j = new PointerEvent("pointerenter", {
                    clientX: B,
                    clientY: w,
                    bubbles: !1,
                    cancelable: !1,
                    pointerId: 1,
                    pointerType: "mouse"
                  });
                  b.dispatchEvent(j), y = !0;
                }
                const T = new PointerEvent("pointermove", {
                  clientX: B,
                  clientY: w,
                  bubbles: !0,
                  cancelable: !0,
                  pointerId: 1,
                  pointerType: "mouse"
                });
                b.dispatchEvent(T), r(b, x);
              } else {
                if (y) {
                  const T = new PointerEvent("pointerleave", {
                    clientX: B,
                    clientY: w,
                    bubbles: !1,
                    cancelable: !1,
                    pointerId: 1,
                    pointerType: "mouse"
                  });
                  b.dispatchEvent(T), y = !1;
                }
                n.style.display = "none";
              }
            }
          }, A = () => {
            if (i.style.display = "none", n.style.display = "none", b) {
              const M = new PointerEvent("pointerup", {
                clientX: k,
                clientY: E,
                bubbles: !0,
                cancelable: !0,
                pointerId: 1,
                pointerType: "mouse"
              });
              b.dispatchEvent(M);
            }
            e.Blocks.endDrag(!1), v.classList.remove("dragging"), y = !1, document.removeEventListener("pointermove", N), document.removeEventListener("pointerup", A);
          };
          document.addEventListener("pointermove", N), document.addEventListener("pointerup", A);
        }), h.appendChild(v);
      }
      p.appendChild(h), s.appendChild(p);
    }
    s.children.length === 0 && (s.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-puzzle-piece"></i><span>No widgets found</span></div>');
  }
  function r(u, f) {
    try {
      const m = u.contentDocument;
      if (!m) return;
      const c = m.querySelector(".gjs-placeholder");
      if (!c || c.style.display === "none") {
        n.style.display = "none";
        return;
      }
      const d = c.getBoundingClientRect();
      if (d.width === 0 && d.height === 0) {
        n.style.display = "none";
        return;
      }
      n.style.display = "block", n.style.left = f.left + d.left + "px", n.style.top = f.top + d.top + "px", n.style.width = d.width + "px", d.height > d.width ? (n.style.width = "3px", n.style.height = d.height + "px") : (n.style.height = "3px", n.style.width = d.width + "px");
    } catch {
      n.style.display = "none";
    }
  }
  o.addEventListener("input", () => {
    l(o.value.trim());
  }), e.on("load", () => {
    l();
  }), e.Blocks.getAll().length > 0 && l();
}
function Mt(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
function Bt(t, e) {
  t.innerHTML = "";
  const s = e.getSelected();
  if (!s) {
    t.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-hand-pointer"></i><span>Select an element</span></div>';
    return;
  }
  function a() {
    var n, l, r, u, f, m, c, d, p, g;
    t.innerHTML = "";
    const o = s.getTraits();
    if (o.length === 0) {
      t.innerHTML = `
        <div class="sg-empty-state">
          <i class="fa-solid fa-sliders"></i>
          <span>No content settings</span>
        </div>
      `;
      return;
    }
    const i = { General: [] };
    o.forEach((h) => {
      const C = h.get("category") || "General";
      i[C] || (i[C] = []), i[C].push(h);
    });
    for (const [h, C] of Object.entries(i)) {
      const v = document.createElement("div");
      v.className = "sg-ctrl-section";
      const L = document.createElement("div");
      L.className = "sg-ctrl-section-header", L.innerHTML = `
        <span class="sg-ctrl-section-title">${Mt(h)}</span>
        <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
      `, L.addEventListener("click", () => {
        v.classList.toggle("collapsed");
      });
      const S = document.createElement("div");
      S.className = "sg-ctrl-section-body";
      for (const b of C) {
        const y = document.createElement("div");
        y.className = "sg-ctrl-row";
        const k = document.createElement("label");
        k.className = "sg-ctrl-label", k.textContent = ((n = b.getLabel) == null ? void 0 : n.call(b)) || b.get("label") || b.get("name") || "";
        const E = document.createElement("div");
        E.className = "sg-ctrl-field";
        const N = b.get("name") || "", A = ((l = b.getType) == null ? void 0 : l.call(b)) || b.get("type") || "text";
        if (N === "startfrom" || A === "datetime-local" || A === "date") {
          const x = document.createElement("input");
          x.className = "sg-input", x.type = "datetime-local";
          const H = ((r = b.getValue) == null ? void 0 : r.call(b)) ?? b.get("value") ?? "";
          if (H) {
            const B = H.replace(/\//g, "-").replace(" ", "T").slice(0, 16);
            x.value = B;
          }
          x.addEventListener("change", () => {
            const B = new Date(x.value);
            if (!isNaN(B.getTime())) {
              const w = B.getFullYear(), T = String(B.getMonth() + 1).padStart(2, "0"), j = String(B.getDate()).padStart(2, "0"), I = String(B.getHours()).padStart(2, "0"), D = String(B.getMinutes()).padStart(2, "0");
              b.setValue(`${w}/${T}/${j} ${I}:${D}:00`);
            }
          }), E.appendChild(x);
        } else switch (A) {
          case "text":
          case "url": {
            const x = document.createElement("input");
            x.className = "sg-input", x.type = "text", x.value = ((u = b.getValue) == null ? void 0 : u.call(b)) ?? b.get("value") ?? "", x.placeholder = b.get("placeholder") || "", x.addEventListener("change", () => {
              b.setValue(x.value);
            }), E.appendChild(x);
            break;
          }
          case "number": {
            const x = document.createElement("input");
            x.className = "sg-input sg-input-number", x.type = "number", x.value = ((f = b.getValue) == null ? void 0 : f.call(b)) ?? b.get("value") ?? "";
            const H = b.get("min"), B = b.get("max"), w = b.get("step");
            H != null && (x.min = String(H)), B != null && (x.max = String(B)), w != null && (x.step = String(w)), x.addEventListener("change", () => {
              b.setValue(parseFloat(x.value));
            }), E.appendChild(x);
            break;
          }
          case "select": {
            const x = document.createElement("select");
            x.className = "sg-select", (b.get("options") || []).forEach((B) => {
              const w = document.createElement("option");
              typeof B == "string" ? (w.value = B, w.textContent = B) : (w.value = B.id ?? B.value ?? "", w.textContent = B.label || B.name || w.value), x.appendChild(w);
            }), x.value = ((m = b.getValue) == null ? void 0 : m.call(b)) ?? b.get("value") ?? "", x.addEventListener("change", () => {
              b.setValue(x.value);
            }), E.appendChild(x);
            break;
          }
          case "checkbox": {
            const x = document.createElement("label");
            x.className = "sg-toggle-switch";
            const H = document.createElement("input");
            H.type = "checkbox", H.checked = !!((c = b.getValue) != null && c.call(b)) || !!b.get("value");
            const B = document.createElement("span");
            B.className = "sg-toggle-switch-track";
            const w = document.createElement("span");
            w.className = "sg-toggle-switch-thumb", B.appendChild(w), x.appendChild(H), x.appendChild(B), H.addEventListener("change", () => {
              b.setValue(H.checked);
            }), E.appendChild(x);
            break;
          }
          case "color": {
            const x = document.createElement("div");
            x.className = "sg-color-swatch-wrap";
            const H = document.createElement("div");
            H.className = "sg-color-swatch";
            const B = ((d = b.getValue) == null ? void 0 : d.call(b)) ?? b.get("value") ?? "#000000";
            H.style.backgroundColor = B;
            const w = document.createElement("input");
            w.type = "color", w.value = B, H.appendChild(w);
            const T = document.createElement("input");
            T.className = "sg-color-hex-input", T.value = B, w.addEventListener("input", () => {
              H.style.backgroundColor = w.value, T.value = w.value, b.setValue(w.value);
            }), T.addEventListener("change", () => {
              H.style.backgroundColor = T.value, w.value = T.value, b.setValue(T.value);
            }), x.appendChild(H), x.appendChild(T), E.appendChild(x);
            break;
          }
          case "button": {
            const x = document.createElement("button");
            x.className = "sg-action-btn", x.textContent = b.get("text") || ((p = b.getLabel) == null ? void 0 : p.call(b)) || "Action", x.addEventListener("click", () => {
              const H = b.get("command");
              H && e.runCommand(H);
            }), E.appendChild(x);
            break;
          }
          default: {
            const x = document.createElement("input");
            x.className = "sg-input", x.type = "text", x.value = ((g = b.getValue) == null ? void 0 : g.call(b)) ?? b.get("value") ?? "", x.addEventListener("change", () => {
              b.setValue(x.value);
            }), E.appendChild(x);
          }
        }
        y.appendChild(k), y.appendChild(E), S.appendChild(y);
      }
      v.appendChild(L), v.appendChild(S), t.appendChild(v);
    }
  }
  a();
}
function It(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const Ot = ["px", "%", "em", "rem", "vw"], Vt = ["T", "R", "B", "L"];
function te(t, e, s) {
  var L, S;
  const a = document.createElement("div");
  a.className = "sg-edim-wrap";
  const o = document.createElement("div");
  o.className = "sg-edim-header", o.innerHTML = `<span class="sg-edim-label">${It(s)}</span>`, a.appendChild(o);
  const i = ((L = e.getProperties) == null ? void 0 : L.call(e)) || [], n = [];
  let l = !1, r = "px";
  const u = document.createElement("div");
  u.className = "sg-edim-inputs";
  for (let b = 0; b < 4; b++) {
    const y = i[b], k = document.createElement("div");
    k.className = "sg-edim-input-wrap";
    const E = document.createElement("button");
    E.className = "sg-edim-inc", E.innerHTML = '<i class="fa-solid fa-chevron-up"></i>', E.addEventListener("click", () => {
      const x = parseInt(N.value) || 0;
      C(b, x + 1);
    });
    const N = document.createElement("input");
    if (N.className = "sg-edim-input", N.type = "number", y) {
      const x = ((S = y.getValue) == null ? void 0 : S.call(y)) ?? "";
      N.value = parseInt(x) ? String(parseInt(x)) : "0";
      const H = String(x).match(/(px|%|em|rem|vw)/);
      H && b === 0 && (r = H[1]);
    }
    N.addEventListener("change", () => {
      C(b, parseInt(N.value) || 0);
    }), n.push(N);
    const A = document.createElement("button");
    A.className = "sg-edim-dec", A.innerHTML = '<i class="fa-solid fa-chevron-down"></i>', A.addEventListener("click", () => {
      const x = parseInt(N.value) || 0;
      C(b, x - 1);
    });
    const M = document.createElement("span");
    M.className = "sg-edim-input-label", M.textContent = Vt[b], k.appendChild(E), k.appendChild(N), k.appendChild(A), k.appendChild(M), u.appendChild(k);
  }
  const f = document.createElement("div");
  f.className = "sg-edim-tools";
  const m = document.createElement("button");
  m.className = "sg-edim-link-btn", m.innerHTML = '<i class="fa-solid fa-link"></i>', m.title = "Link values", m.addEventListener("click", () => {
    if (l = !l, m.classList.toggle("linked", l), m.innerHTML = l ? '<i class="fa-solid fa-link"></i>' : '<i class="fa-solid fa-link-slash"></i>', l) {
      const b = parseInt(n[0].value) || 0;
      for (let y = 1; y < 4; y++)
        n[y].value = String(b);
      v();
    }
  }), f.appendChild(m);
  const c = document.createElement("button");
  c.className = "sg-edim-unit-btn", c.textContent = r, c.addEventListener("click", (b) => {
    b.stopPropagation(), p();
  }), f.appendChild(c), u.appendChild(f), a.appendChild(u);
  const d = document.createElement("div");
  d.className = "sg-edim-unit-popup", d.style.display = "none", Ot.forEach((b) => {
    const y = document.createElement("button");
    y.className = "sg-edim-unit-option", b === r && y.classList.add("active"), y.textContent = b, y.addEventListener("click", (k) => {
      k.stopPropagation(), r = b, c.textContent = b, d.querySelectorAll(".sg-edim-unit-option").forEach(
        (E) => E.classList.toggle("active", E.textContent === b)
      ), d.style.display = "none", v();
    }), d.appendChild(y);
  }), f.style.position = "relative", f.appendChild(d);
  function p() {
    d.style.display = d.style.display === "none" ? "flex" : "none";
  }
  function g(b) {
    f.contains(b.target) || (d.style.display = "none");
  }
  document.addEventListener("click", g);
  const h = new MutationObserver(() => {
    a.isConnected || (document.removeEventListener("click", g), h.disconnect());
  });
  h.observe(document.body, { childList: !0, subtree: !0 });
  function C(b, y) {
    if (n[b].value = String(y), l)
      for (let k = 0; k < 4; k++)
        n[k].value = String(y);
    v();
  }
  function v() {
    var b, y, k;
    if (i.length >= 4)
      for (let E = 0; E < 4; E++) {
        const N = n[E].value, A = N === "0" || N === "" ? "0" : `${N}${r}`;
        (y = (b = i[E]) == null ? void 0 : b.upValue) == null || y.call(b, A);
      }
    else {
      const E = n.map((N) => {
        const A = N.value;
        return A === "0" || A === "" ? "0" : `${A}${r}`;
      });
      (k = e.upValue) == null || k.call(e, E.join(" "));
    }
  }
  t.appendChild(a);
}
function ne(t, e, s) {
  var L, S, b, y, k, E, N;
  const a = document.createElement("div");
  a.className = "sg-ctrl-row";
  const o = document.createElement("label");
  o.className = "sg-ctrl-label", o.textContent = s;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field sg-slider-ctrl";
  const n = ((L = e.get) == null ? void 0 : L.call(e, "min")) ?? 0, l = ((S = e.get) == null ? void 0 : S.call(e, "max")) ?? 100, r = ((b = e.get) == null ? void 0 : b.call(e, "step")) ?? 1, u = ((y = e.get) == null ? void 0 : y.call(e, "units")) || ((k = e.get) == null ? void 0 : k.call(e, "unit")) || ["px"], f = Array.isArray(u) ? u[0] || "px" : u || "px", m = ((E = e.getValue) == null ? void 0 : E.call(e)) ?? ((N = e.get) == null ? void 0 : N.call(e, "value")) ?? "", c = parseFloat(m) || 0, d = document.createElement("input");
  d.className = "sg-slider-track", d.type = "range", d.min = String(n), d.max = String(l), d.step = String(r), d.value = String(c);
  const p = document.createElement("input");
  p.className = "sg-slider-value", p.type = "number", p.min = String(n), p.max = String(l), p.step = String(r), p.value = String(c);
  const g = document.createElement("span");
  g.className = "sg-slider-unit", g.textContent = f;
  function h() {
    const A = parseFloat(d.value), M = parseFloat(d.min), x = parseFloat(d.max), H = x > M ? (A - M) / (x - M) * 100 : 0;
    d.style.setProperty("--sg-slider-fill", `${H}%`);
  }
  h(), d.addEventListener("pointerdown", () => {
    window.__sgEditing && (window.__sgEditing.interacting = !0);
  });
  const C = () => {
    window.__sgEditing && (window.__sgEditing.interacting = !1);
  };
  d.addEventListener("pointerup", C), d.addEventListener("pointercancel", C), d.addEventListener("input", () => {
    p.value = d.value, h(), v(d.value);
  }), p.addEventListener("change", () => {
    d.value = p.value, h(), v(p.value);
  });
  function v(A) {
    var H;
    const M = parseFloat(A);
    if (isNaN(M)) return;
    const x = f !== "" ? `${M}${f}` : `${M}`;
    (H = e.upValue) == null || H.call(e, x);
  }
  i.appendChild(d), i.appendChild(p), i.appendChild(g), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function jt(t, e, s) {
  var d, p;
  const a = document.createElement("div");
  a.className = "sg-ctrl-row";
  const o = document.createElement("label");
  o.className = "sg-ctrl-label", o.textContent = s;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const n = document.createElement("div");
  n.className = "sg-color-swatch-wrap";
  const l = ((d = e.getValue) == null ? void 0 : d.call(e)) ?? ((p = e.get) == null ? void 0 : p.call(e, "value")) ?? "#000000", r = ke(l), u = document.createElement("div");
  u.className = "sg-color-swatch", u.style.backgroundColor = l;
  const f = document.createElement("input");
  f.type = "color", f.value = r, u.appendChild(f);
  const m = document.createElement("input");
  m.className = "sg-color-hex-input", m.type = "text", m.value = l, f.addEventListener("input", () => {
    var g;
    u.style.backgroundColor = f.value, m.value = f.value, (g = e.upValue) == null || g.call(e, f.value);
  }), m.addEventListener("change", () => {
    var h;
    const g = m.value.trim();
    u.style.backgroundColor = g;
    try {
      f.value = ke(g);
    } catch {
    }
    (h = e.upValue) == null || h.call(e, g);
  });
  const c = document.createElement("button");
  c.className = "sg-edim-unit-btn", c.innerHTML = '<i class="fa-solid fa-xmark"></i>', c.title = "Clear", c.style.flexShrink = "0", c.addEventListener("click", () => {
    var g;
    u.style.backgroundColor = "transparent", m.value = "", (g = e.upValue) == null || g.call(e, "");
  }), n.appendChild(u), n.appendChild(m), n.appendChild(c), i.appendChild(n), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function ke(t) {
  if (!t || t === "transparent" || t === "none" || t === "")
    return "#000000";
  if (/^#[0-9a-fA-F]{6}$/.test(t)) return t;
  if (/^#[0-9a-fA-F]{3}$/.test(t)) {
    const e = t[1], s = t[2], a = t[3];
    return `#${e}${e}${s}${s}${a}${a}`;
  }
  try {
    const e = document.createElement("canvas").getContext("2d");
    if (e) {
      e.fillStyle = t;
      const s = e.fillStyle;
      if (s.startsWith("#")) return s;
      const a = s.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (a) {
        const o = (i) => parseInt(i).toString(16).padStart(2, "0");
        return `#${o(a[1])}${o(a[2])}${o(a[3])}`;
      }
    }
  } catch {
  }
  return "#000000";
}
function Me(t, e, s, a) {
  var f, m;
  const o = document.createElement("div");
  o.className = "sg-ctrl-row";
  const i = document.createElement("label");
  i.className = "sg-ctrl-label", i.textContent = s;
  const n = document.createElement("div");
  n.className = "sg-ctrl-field";
  const l = document.createElement("div");
  l.className = "sg-icon-toggle-group";
  const r = ((f = e.getValue) == null ? void 0 : f.call(e)) ?? ((m = e.get) == null ? void 0 : m.call(e, "value")) ?? "", u = [];
  a.forEach((c) => {
    const d = document.createElement("button");
    d.className = "sg-icon-toggle-btn", c.value === r && d.classList.add("active"), d.title = c.title || c.value, d.innerHTML = `<i class="${c.icon}"></i>`, d.dataset.value = c.value, d.addEventListener("click", () => {
      var p;
      u.forEach((g) => g.classList.remove("active")), d.classList.add("active"), (p = e.upValue) == null || p.call(e, c.value);
    }), u.push(d), l.appendChild(d);
  }), n.appendChild(l), o.appendChild(i), o.appendChild(n), t.appendChild(o);
}
function Dt(t, e) {
  const s = document.createElement("div");
  s.className = "sg-section-state-wrap";
  const a = [
    { label: "Normal", state: "" },
    { label: "Hover", state: "hover" }
  ], o = [];
  let i = e.SelectorManager.getState() || "";
  a.forEach((n) => {
    const l = document.createElement("button");
    l.className = "sg-section-state-btn", n.state === i && l.classList.add("active"), l.textContent = n.label, l.addEventListener("click", () => {
      i = n.state, o.forEach((u) => u.classList.remove("active")), l.classList.add("active");
      const r = e.getSelected();
      r && (e.SelectorManager.setState(n.state), e.StyleManager.select(r));
    }), o.push(l), s.appendChild(l);
  }), t.appendChild(s);
}
function Pt(t, e) {
  const s = document.createElement("div");
  s.className = "sg-ctrl-section";
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-header", a.innerHTML = `
    <span class="sg-ctrl-section-title">Box Shadow</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, a.addEventListener("click", () => s.classList.toggle("collapsed"));
  const o = document.createElement("div");
  o.className = "sg-ctrl-section-body";
  const i = e.getSelected();
  let n = 0, l = 4, r = 8, u = 0, f = "rgba(0,0,0,0.3)", m = !1;
  if (i) {
    const w = String(i.getStyle("box-shadow") || "");
    if (w && w !== "none") {
      const T = w.includes("inset"), I = w.replace("inset", "").trim().split(/\s+/);
      if (I.length >= 3) {
        n = parseInt(I[0]) || 0, l = parseInt(I[1]) || 0, r = parseInt(I[2]) || 0, u = parseInt(I[3]) || 0;
        const D = I.slice(4);
        D.length > 0 && (f = D.join(" ")), m = T;
      }
    }
  }
  function c() {
    if (!i) return;
    const T = `${m ? "inset " : ""}${n}px ${l}px ${r}px ${u}px ${f}`;
    i.addStyle({ "box-shadow": T }), d();
  }
  function d() {
    const w = m ? "inset " : "";
    B.style.boxShadow = `${w}${n}px ${l}px ${r}px ${u}px ${f}`;
  }
  [
    { label: "H Offset", getter: () => n, setter: (w) => {
      n = w;
    }, min: -50, max: 50 },
    { label: "V Offset", getter: () => l, setter: (w) => {
      l = w;
    }, min: -50, max: 50 },
    { label: "Blur", getter: () => r, setter: (w) => {
      r = w;
    }, min: 0, max: 100 },
    { label: "Spread", getter: () => u, setter: (w) => {
      u = w;
    }, min: -50, max: 50 }
  ].forEach((w) => {
    const T = document.createElement("div");
    T.className = "sg-ctrl-row";
    const j = document.createElement("label");
    j.className = "sg-ctrl-label", j.textContent = w.label;
    const I = document.createElement("div");
    I.className = "sg-ctrl-field sg-slider-ctrl";
    const D = document.createElement("input");
    D.className = "sg-slider-track", D.type = "range", D.min = String(w.min), D.max = String(w.max), D.value = String(w.getter());
    const P = document.createElement("input");
    P.className = "sg-slider-value", P.type = "number", P.min = String(w.min), P.max = String(w.max), P.value = String(w.getter());
    const q = document.createElement("span");
    q.className = "sg-slider-unit", q.textContent = "px", D.addEventListener("input", () => {
      P.value = D.value, w.setter(parseInt(D.value)), c();
    }), P.addEventListener("change", () => {
      D.value = P.value, w.setter(parseInt(P.value)), c();
    }), I.appendChild(D), I.appendChild(P), I.appendChild(q), T.appendChild(j), T.appendChild(I), o.appendChild(T);
  });
  const g = document.createElement("div");
  g.className = "sg-ctrl-row";
  const h = document.createElement("label");
  h.className = "sg-ctrl-label", h.textContent = "Color";
  const C = document.createElement("div");
  C.className = "sg-ctrl-field";
  const v = document.createElement("div");
  v.className = "sg-color-swatch-wrap";
  const L = document.createElement("div");
  L.className = "sg-color-swatch", L.style.backgroundColor = f;
  const S = document.createElement("input");
  S.type = "color", S.value = "#000000", L.appendChild(S);
  const b = document.createElement("input");
  b.className = "sg-color-hex-input", b.value = f, S.addEventListener("input", () => {
    f = S.value, L.style.backgroundColor = f, b.value = f, c();
  }), b.addEventListener("change", () => {
    f = b.value, L.style.backgroundColor = f, c();
  }), v.appendChild(L), v.appendChild(b), C.appendChild(v), g.appendChild(h), g.appendChild(C), o.appendChild(g);
  const y = document.createElement("div");
  y.className = "sg-ctrl-row";
  const k = document.createElement("label");
  k.className = "sg-ctrl-label", k.textContent = "Inset";
  const E = document.createElement("div");
  E.className = "sg-ctrl-field";
  const N = document.createElement("label");
  N.className = "sg-toggle-switch";
  const A = document.createElement("input");
  A.type = "checkbox", A.checked = m;
  const M = document.createElement("span");
  M.className = "sg-toggle-switch-track";
  const x = document.createElement("span");
  x.className = "sg-toggle-switch-thumb", M.appendChild(x), N.appendChild(A), N.appendChild(M), A.addEventListener("change", () => {
    m = A.checked, c();
  }), E.appendChild(N), y.appendChild(k), y.appendChild(E), o.appendChild(y);
  const H = document.createElement("div");
  H.className = "sg-shadow-preview";
  const B = document.createElement("div");
  B.className = "sg-shadow-preview-inner", H.appendChild(B), d(), o.appendChild(H), s.appendChild(a), s.appendChild(o), t.appendChild(s);
}
function qt(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const Ut = [
  { type: "classic", icon: "fa-solid fa-fill-drip", label: "Classic" },
  { type: "gradient", icon: "fa-solid fa-palette", label: "Gradient" },
  { type: "video", icon: "fa-solid fa-video", label: "Video" },
  { type: "slideshow", icon: "fa-solid fa-images", label: "Slides" }
];
function zt(t, e, s, a) {
  var f;
  const o = document.createElement("div");
  o.className = "sg-ctrl-row";
  const i = document.createElement("label");
  i.className = "sg-ctrl-label", i.textContent = "Type";
  const n = document.createElement("div");
  n.className = "sg-ctrl-field";
  const l = document.createElement("div");
  l.className = "sg-bg-type-group";
  let r = a || "classic";
  if (!a) {
    const m = e.getSelected();
    m && (String(m.getStyle("background-image") || "").includes("gradient") && (r = "gradient"), (f = m.get("attributes")) != null && f["data-bg-video"] && (r = "video"));
  }
  const u = [];
  Ut.forEach((m) => {
    const c = document.createElement("button");
    c.className = "sg-bg-type-btn", m.type === r && c.classList.add("active"), c.innerHTML = `<i class="${m.icon}"></i><span>${qt(m.label)}</span>`, c.title = m.label, c.addEventListener("click", () => {
      u.forEach((d) => d.classList.remove("active")), c.classList.add("active"), r = m.type, s == null || s(m.type);
    }), u.push(c), l.appendChild(c);
  }), n.appendChild(l), o.appendChild(i), o.appendChild(n), t.appendChild(o);
}
const Rt = [
  { value: "to right", label: "To Right" },
  { value: "to left", label: "To Left" },
  { value: "to bottom", label: "To Bottom" },
  { value: "to top", label: "To Top" },
  { value: "to bottom right", label: "Diagonal (BR)" },
  { value: "to top left", label: "Diagonal (TL)" },
  { value: "circle", label: "Radial" }
];
function Ft(t, e) {
  const s = document.createElement("div");
  s.className = "sg-ctrl-section";
  const a = document.createElement("div");
  a.className = "sg-ctrl-section-header", a.innerHTML = `
    <span class="sg-ctrl-section-title">Gradient</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, a.addEventListener("click", () => s.classList.toggle("collapsed"));
  const o = document.createElement("div");
  o.className = "sg-ctrl-section-body";
  const i = e.getSelected();
  let n = "to right", l = "#c0392b", r = 0, u = "#e04535", f = 100;
  if (i) {
    const L = String(i.getStyle("background-image") || "").match(/linear-gradient\(([^,]+),\s*(#?\w+)\s+(\d+)%?,\s*(#?\w+)\s+(\d+)%?\)/);
    L && (n = L[1].trim(), l = L[2], r = parseInt(L[3]) || 0, u = L[4], f = parseInt(L[5]) || 100);
  }
  function m() {
    if (!i) return;
    const S = `${n === "circle" ? "radial-gradient" : "linear-gradient"}(${n === "circle" ? "circle" : n}, ${l} ${r}%, ${u} ${f}%)`;
    i.addStyle({ "background-image": S }), c();
  }
  function c() {
    const v = n === "circle" ? "radial-gradient" : "linear-gradient", L = n === "circle" ? "circle" : n;
    C.style.background = `${v}(${L}, ${l} ${r}%, ${u} ${f}%)`;
  }
  const d = document.createElement("div");
  d.className = "sg-ctrl-row";
  const p = document.createElement("label");
  p.className = "sg-ctrl-label", p.textContent = "Direction";
  const g = document.createElement("div");
  g.className = "sg-ctrl-field";
  const h = document.createElement("select");
  h.className = "sg-select", Rt.forEach((v) => {
    const L = document.createElement("option");
    L.value = v.value, L.textContent = v.label, h.appendChild(L);
  }), h.value = n, h.addEventListener("change", () => {
    n = h.value, m();
  }), g.appendChild(h), d.appendChild(p), d.appendChild(g), o.appendChild(d), Se(o, "Color 1", l, r, (v, L) => {
    l = v, r = L, m();
  }), Se(o, "Color 2", u, f, (v, L) => {
    u = v, f = L, m();
  });
  const C = document.createElement("div");
  C.className = "sg-gradient-preview", c(), o.appendChild(C), s.appendChild(a), s.appendChild(o), t.appendChild(s);
}
function Se(t, e, s, a, o) {
  const i = document.createElement("div");
  i.className = "sg-ctrl-row";
  const n = document.createElement("label");
  n.className = "sg-ctrl-label", n.textContent = e;
  const l = document.createElement("div");
  l.className = "sg-ctrl-field", l.style.gap = "4px";
  const r = document.createElement("div");
  r.className = "sg-color-swatch", r.style.backgroundColor = s;
  const u = document.createElement("input");
  u.type = "color", u.value = s, r.appendChild(u);
  let f = s, m = a;
  u.addEventListener("input", () => {
    f = u.value, r.style.backgroundColor = f, o(f, m);
  });
  const c = document.createElement("input");
  c.className = "sg-slider-track", c.type = "range", c.min = "0", c.max = "100", c.value = String(a), c.style.flex = "1";
  const d = document.createElement("input");
  d.className = "sg-slider-value", d.type = "number", d.min = "0", d.max = "100", d.value = String(a);
  const p = document.createElement("span");
  p.className = "sg-slider-unit", p.textContent = "%", c.addEventListener("input", () => {
    d.value = c.value, m = parseInt(c.value), o(f, m);
  }), d.addEventListener("change", () => {
    c.value = d.value, m = parseInt(d.value), o(f, m);
  }), l.appendChild(r), l.appendChild(c), l.appendChild(d), l.appendChild(p), i.appendChild(n), i.appendChild(l), t.appendChild(i);
}
function Gt(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const Zt = [
  { value: "row", icon: "fa-solid fa-arrow-right", title: "Row" },
  { value: "row-reverse", icon: "fa-solid fa-arrow-left", title: "Row Reverse" },
  { value: "column", icon: "fa-solid fa-arrow-down", title: "Column" },
  { value: "column-reverse", icon: "fa-solid fa-arrow-up", title: "Column Reverse" }
], Yt = [
  { value: "flex-start", icon: "fa-solid fa-align-left", title: "Start" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "flex-end", icon: "fa-solid fa-align-right", title: "End" },
  { value: "space-between", icon: "fa-solid fa-arrows-left-right", title: "Space Between" },
  { value: "space-around", icon: "fa-solid fa-arrows-left-right-to-line", title: "Space Around" }
], $ = [
  { value: "flex-start", icon: "fa-solid fa-align-left", title: "Start" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "flex-end", icon: "fa-solid fa-align-right", title: "End" },
  { value: "stretch", icon: "fa-solid fa-up-down", title: "Stretch" },
  { value: "baseline", icon: "fa-solid fa-text-height", title: "Baseline" }
], Wt = [
  { value: "left", icon: "fa-solid fa-align-left", title: "Left" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "right", icon: "fa-solid fa-align-right", title: "Right" },
  { value: "justify", icon: "fa-solid fa-align-justify", title: "Justify" }
], Xt = {
  "flex-direction": Zt,
  "justify-content": Yt,
  "align-items": $,
  "align-content": $,
  "align-self": $,
  "text-align": Wt
}, Kt = {
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
function Jt(t, e) {
  t.innerHTML = "";
  const s = e.getSelected();
  if (!s) {
    t.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-paint-brush"></i><span>Select an element</span></div>';
    return;
  }
  Dt(t, e);
  function a() {
    const o = t.querySelector(".sg-section-state-wrap");
    t.innerHTML = "", o && t.appendChild(o);
    const n = e.StyleManager.getSectors({ visible: !0 });
    if (!n || n.length === 0) {
      const u = document.createElement("div");
      u.className = "sg-empty-state", u.innerHTML = '<i class="fa-solid fa-paint-brush"></i><span>No style properties</span>', t.appendChild(u);
      return;
    }
    const l = (s == null ? void 0 : s.get("type")) || "", r = Kt[l];
    n.forEach((u) => {
      var g, h;
      const f = ((g = u.getName) == null ? void 0 : g.call(u)) || u.get("name") || "Styles";
      if (r && !r.includes(f)) return;
      const m = ((h = u.getProperties) == null ? void 0 : h.call(u)) || u.get("properties") || [];
      if (m.length === 0) return;
      const c = document.createElement("div");
      c.className = "sg-ctrl-section";
      const d = document.createElement("div");
      d.className = "sg-ctrl-section-header", d.innerHTML = `
        <span class="sg-ctrl-section-title">${Gt(f)}</span>
        <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
      `, d.addEventListener("click", () => {
        c.classList.toggle("collapsed");
      });
      const p = document.createElement("div");
      p.className = "sg-ctrl-section-body", m.forEach((C) => {
        ie(p, C, e);
      }), c.appendChild(d), c.appendChild(p), t.appendChild(c);
    });
  }
  a();
}
function ie(t, e, s) {
  var n, l, r, u;
  const a = ((n = e.getType) == null ? void 0 : n.call(e)) || e.get("type") || "text", o = ((l = e.getName) == null ? void 0 : l.call(e)) || e.get("property") || "", i = ((r = e.getLabel) == null ? void 0 : r.call(e)) || e.get("label") || o;
  if (o === "box-shadow") {
    Pt(t, s);
    return;
  }
  if (o === "background-image") {
    Qt(t, s);
    return;
  }
  switch (a) {
    case "number":
    case "integer":
    case "slider": {
      ne(t, e, i);
      break;
    }
    case "composite": {
      (((u = e.getProperties) == null ? void 0 : u.call(e)) || []).length === 4 && en(o) ? te(t, e, i) : tn(t, e, i, s);
      break;
    }
    case "stack": {
      nn(t, e, i, s);
      break;
    }
    case "select":
    case "radio": {
      const f = Xt[o];
      f ? Me(t, e, i, f) : _t(t, e, i);
      break;
    }
    case "color": {
      jt(t, e, i);
      break;
    }
    case "file": {
      ae(t, e, i);
      break;
    }
    default:
      an(t, e, i);
  }
}
function Qt(t, e) {
  var f;
  const s = document.createElement("div");
  s.className = "sg-ctrl-subsection";
  const a = document.createElement("div");
  function o(m) {
    const c = m.match(/url\(["']?([^"')]+)["']?\)/);
    return c ? c[1] : "";
  }
  function i(m) {
    m.components().filter((p) => {
      var g;
      return ((g = p.get("attributes")) == null ? void 0 : g["data-bg-video-el"]) === "1";
    }).forEach((p) => p.remove());
  }
  function n(m, c) {
    if (i(m), !c.trim()) {
      m.removeAttributes("data-bg-video");
      return;
    }
    m.addAttributes({ "data-bg-video": c.trim() }), m.addStyle({ position: "relative", overflow: "hidden" }), m.components().add({
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
  function l(m) {
    var d;
    a.innerHTML = "";
    const c = e.getSelected();
    m !== "video" && c && ((d = c.get("attributes")) != null && d["data-bg-video"]) && (i(c), c.removeAttributes("data-bg-video")), m === "gradient" ? Ft(a, e) : m === "classic" ? ae(a, {
      getValue: () => {
        const p = e.getSelected();
        return p ? o(String(p.getStyle("background-image") || "")) : "";
      },
      upValue: (p) => {
        const g = e.getSelected();
        if (!g) return;
        const h = p.trim() ? `url("${p.trim()}")` : "none";
        g.addStyle({ "background-image": h });
      }
    }, "Image URL") : m === "video" ? ae(a, {
      getValue: () => {
        var g;
        const p = e.getSelected();
        return p && ((g = p.get("attributes")) == null ? void 0 : g["data-bg-video"]) || "";
      },
      upValue: (p) => {
        const g = e.getSelected();
        g && n(g, p);
      }
    }, "Video URL") : m === "slideshow" && $t(a, e);
  }
  let r = "classic";
  const u = e.getSelected();
  u && (String(u.getStyle("background-image") || "").includes("gradient") && (r = "gradient"), (f = u.get("attributes")) != null && f["data-bg-video"] && (r = "video")), zt(s, e, (m) => {
    l(m);
  }, r), l(r), s.appendChild(a), t.appendChild(s);
}
function $t(t, e) {
  var l;
  const s = e.getSelected();
  if (!s) return;
  let a = [];
  try {
    const r = (l = s.get("attributes")) == null ? void 0 : l["data-bg-slides"];
    r && (a = JSON.parse(r));
  } catch {
  }
  a.length === 0 && (a = [""]);
  const o = document.createElement("div");
  o.className = "sg-ctrl-subsection";
  function i() {
    const r = a.filter((u) => u.trim());
    s.addAttributes({ "data-bg-slides": JSON.stringify(r) });
  }
  function n() {
    o.innerHTML = "", a.forEach((f, m) => {
      const c = document.createElement("div");
      c.className = "sg-ctrl-row";
      const d = document.createElement("label");
      d.className = "sg-ctrl-label", d.textContent = `Slide ${m + 1}`;
      const p = document.createElement("div");
      p.className = "sg-ctrl-field", p.style.gap = "4px";
      const g = document.createElement("input");
      g.className = "sg-input", g.type = "text", g.placeholder = "Image URL...", g.value = f, g.addEventListener("change", () => {
        a[m] = g.value, i();
      });
      const h = document.createElement("button");
      h.className = "sg-edim-unit-btn", h.innerHTML = '<i class="fa-solid fa-trash-can"></i>', h.title = "Remove slide", h.addEventListener("click", () => {
        a.splice(m, 1), a.length === 0 && (a = [""]), i(), n();
      }), p.appendChild(g), p.appendChild(h), c.appendChild(d), c.appendChild(p), o.appendChild(c);
    });
    const r = document.createElement("div");
    r.className = "sg-ctrl-row";
    const u = document.createElement("button");
    u.className = "sg-edim-unit-btn", u.style.marginLeft = "auto", u.innerHTML = '<i class="fa-solid fa-plus"></i> Add Slide', u.addEventListener("click", () => {
      a.push(""), n();
    }), r.appendChild(u), o.appendChild(r);
  }
  n(), t.appendChild(o);
}
function _t(t, e, s) {
  var r, u;
  const a = document.createElement("div");
  a.className = "sg-ctrl-row";
  const o = document.createElement("label");
  o.className = "sg-ctrl-label", o.textContent = s;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const n = document.createElement("select");
  n.className = "sg-select", (((r = e.getOptions) == null ? void 0 : r.call(e)) || e.get("options") || e.get("list") || []).forEach((f) => {
    const m = document.createElement("option");
    typeof f == "string" ? (m.value = f, m.textContent = f) : (m.value = f.id ?? f.value ?? "", m.textContent = f.label || f.name || m.value), n.appendChild(m);
  }), n.value = ((u = e.getValue) == null ? void 0 : u.call(e)) ?? "", n.addEventListener("change", () => {
    e.upValue(n.value);
  }), i.appendChild(n), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function ae(t, e, s) {
  var l;
  const a = document.createElement("div");
  a.className = "sg-ctrl-row";
  const o = document.createElement("label");
  o.className = "sg-ctrl-label", o.textContent = s;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const n = document.createElement("input");
  n.className = "sg-input", n.type = "text", n.placeholder = "URL or upload...", n.value = ((l = e.getValue) == null ? void 0 : l.call(e)) ?? "", n.addEventListener("change", () => {
    e.upValue(n.value);
  }), i.appendChild(n), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function en(t) {
  return ["margin", "padding", "border-radius"].includes(t);
}
function tn(t, e, s, a) {
  var r;
  const o = document.createElement("div");
  o.className = "sg-ctrl-subsection";
  const i = document.createElement("div");
  i.className = "sg-ctrl-row";
  const n = document.createElement("label");
  n.className = "sg-ctrl-label", n.style.fontWeight = "600", n.textContent = s, i.appendChild(n), o.appendChild(i), (((r = e.getProperties) == null ? void 0 : r.call(e)) || []).forEach((u) => {
    ie(o, u, a);
  }), t.appendChild(o);
}
function nn(t, e, s, a) {
  var u;
  const o = document.createElement("div");
  o.className = "sg-ctrl-subsection";
  const i = document.createElement("div");
  i.className = "sg-ctrl-row", i.style.alignItems = "center";
  const n = document.createElement("label");
  n.className = "sg-ctrl-label", n.style.fontWeight = "600", n.textContent = s;
  const l = document.createElement("button");
  l.className = "sg-edim-unit-btn", l.innerHTML = '<i class="fa-solid fa-plus"></i>', l.title = "Add layer", l.addEventListener("click", () => {
    var f;
    (f = e.addLayer) == null || f.call(e, {}, { at: 0 });
  }), i.appendChild(n), i.appendChild(l), o.appendChild(i);
  const r = ((u = e.getLayers) == null ? void 0 : u.call(e)) || [];
  if (r.length === 0) {
    const f = document.createElement("div");
    f.className = "sg-empty-state", f.style.padding = "8px", f.innerHTML = '<span style="font-size:11px;opacity:0.6">No layers — click + to add</span>', o.appendChild(f);
  }
  r.forEach((f, m) => {
    var C;
    const c = document.createElement("div");
    c.className = "sg-stack-layer";
    const d = document.createElement("div");
    d.className = "sg-ctrl-row", d.style.alignItems = "center";
    const p = document.createElement("span");
    p.className = "sg-ctrl-label", p.style.fontSize = "10px", p.style.opacity = "0.7", p.textContent = `Layer ${m + 1}`;
    const g = document.createElement("button");
    g.className = "sg-edim-unit-btn", g.innerHTML = '<i class="fa-solid fa-trash-can"></i>', g.title = "Remove layer", g.style.fontSize = "10px", g.addEventListener("click", () => {
      var v;
      (v = e.removeLayer) == null || v.call(e, f);
    }), d.appendChild(p), d.appendChild(g), c.appendChild(d), (((C = f.getProperties) == null ? void 0 : C.call(f)) || []).forEach((v) => {
      ie(c, v, a);
    }), o.appendChild(c);
  }), t.appendChild(o);
}
function an(t, e, s) {
  var l;
  const a = document.createElement("div");
  a.className = "sg-ctrl-row";
  const o = document.createElement("label");
  o.className = "sg-ctrl-label", o.textContent = s;
  const i = document.createElement("div");
  i.className = "sg-ctrl-field";
  const n = document.createElement("input");
  n.className = "sg-input", n.type = "text", n.value = ((l = e.getValue) == null ? void 0 : l.call(e)) ?? "", n.addEventListener("change", () => {
    e.upValue(n.value);
  }), i.appendChild(n), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
const sn = ["top", "right", "bottom", "left"];
function on(t, e) {
  const s = e.getSelected();
  if (!s) return;
  const a = document.createElement("div");
  a.className = "sg-spacing-box";
  const o = document.createElement("div");
  o.className = "sg-spacing-box-margin";
  const i = document.createElement("span");
  i.className = "sg-spacing-box-label margin-label", i.textContent = "margin", o.appendChild(i);
  const n = document.createElement("div");
  n.className = "sg-spacing-box-padding";
  const l = document.createElement("span");
  l.className = "sg-spacing-box-label padding-label", l.textContent = "padding", n.appendChild(l);
  const r = document.createElement("div");
  r.className = "sg-spacing-box-content", r.textContent = "content";
  const u = {
    top: { top: "4px", left: "50%" },
    right: { top: "50%", left: "calc(100% - 38px)" },
    bottom: { top: "calc(100% - 22px)", left: "50%" },
    left: { top: "50%", left: "6px" }
  }, f = {
    top: { top: "32px", left: "50%" },
    right: { top: "50%", left: "calc(100% - 72px)" },
    bottom: { top: "calc(100% - 50px)", left: "50%" },
    left: { top: "50%", left: "44px" }
  };
  sn.forEach((m) => {
    const c = document.createElement("input");
    c.type = "number";
    const d = u[m];
    c.style.top = d.top, c.style.left = d.left, m === "top" || m === "bottom" ? c.style.transform = "translateX(-50%)" : c.style.transform = "translateY(-50%)";
    const p = s.getStyle(`margin-${m}`) || "0";
    c.value = String(parseInt(String(p)) || 0), c.addEventListener("change", () => {
      s.addStyle({ [`margin-${m}`]: `${c.value}px` });
    }), a.appendChild(c);
    const g = document.createElement("input");
    g.type = "number";
    const h = f[m];
    g.style.top = h.top, g.style.left = h.left, m === "top" || m === "bottom" ? g.style.transform = "translateX(-50%)" : g.style.transform = "translateY(-50%)";
    const C = s.getStyle(`padding-${m}`) || "0";
    g.value = String(parseInt(String(C)) || 0), g.addEventListener("change", () => {
      s.addStyle({ [`padding-${m}`]: `${g.value}px` });
    }), a.appendChild(g);
  }), a.appendChild(o), a.appendChild(n), a.appendChild(r), t.appendChild(a);
}
function Be(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const ln = [
  { value: "auto", icon: "fa-solid fa-a", title: "Auto" },
  { value: "flex-start", icon: "fa-solid fa-align-left", title: "Start" },
  { value: "center", icon: "fa-solid fa-align-center", title: "Center" },
  { value: "flex-end", icon: "fa-solid fa-align-right", title: "End" },
  { value: "stretch", icon: "fa-solid fa-up-down", title: "Stretch" }
];
function rn(t, e) {
  t.innerHTML = "";
  const s = e.getSelected();
  if (!s) {
    t.innerHTML = '<div class="sg-empty-state"><i class="fa-solid fa-cog"></i><span>Select an element</span></div>';
    return;
  }
  cn(t, e), dn(t, e, s), pn(t, e, s), un(t, e, s), mn(t, e, s);
}
function cn(t, e, s) {
  const a = document.createElement("div");
  a.className = "sg-ctrl-section";
  const o = document.createElement("div");
  o.className = "sg-ctrl-section-header", o.innerHTML = `
    <span class="sg-ctrl-section-title">Layout</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, o.addEventListener("click", () => a.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body", on(i, e);
  const n = e.StyleManager, l = n.getProperty("General", "margin") || n.getProperty("general", "margin");
  l ? te(i, l, "Margin") : Ne(i, e, "margin", "Margin");
  const r = n.getProperty("General", "padding") || n.getProperty("general", "padding");
  r ? te(i, r, "Padding") : Ne(i, e, "padding", "Padding");
  const u = n.getProperty("Flex", "align-self") || n.getProperty("flex", "align-self");
  u && Me(i, u, "Align Self", ln);
  const f = n.getProperty("Flex", "order") || n.getProperty("flex", "order");
  f && ne(i, f, "Order"), ["flex-grow", "flex-shrink", "flex-basis"].forEach((m) => {
    const c = n.getProperty("Flex", m) || n.getProperty("flex", m);
    c && ne(i, c, m.replace("flex-", "").replace(/^\w/, (d) => d.toUpperCase()));
  }), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function Ne(t, e, s, a) {
  const o = ["top", "right", "bottom", "left"], i = document.createElement("div");
  i.className = "sg-edim-wrap";
  const n = document.createElement("div");
  n.className = "sg-edim-header", n.innerHTML = `<span class="sg-edim-label">${Be(a)}</span>`, i.appendChild(n);
  const l = document.createElement("div");
  l.className = "sg-edim-inputs";
  const r = e.getSelected();
  o.forEach((u) => {
    const f = document.createElement("div");
    f.className = "sg-edim-input-wrap";
    const m = document.createElement("input");
    m.className = "sg-edim-input", m.type = "number";
    const c = (r == null ? void 0 : r.getStyle(`${s}-${u}`)) || "";
    m.value = parseInt(c) ? String(parseInt(c)) : "0", m.addEventListener("change", () => {
      r && r.addStyle({ [`${s}-${u}`]: `${m.value}px` });
    });
    const d = document.createElement("span");
    d.className = "sg-edim-input-label", d.textContent = u[0].toUpperCase(), f.appendChild(m), f.appendChild(d), l.appendChild(f);
  }), i.appendChild(l), t.appendChild(i);
}
function dn(t, e, s) {
  const a = document.createElement("div");
  a.className = "sg-ctrl-section";
  const o = document.createElement("div");
  o.className = "sg-ctrl-section-header", o.innerHTML = `
    <span class="sg-ctrl-section-title">Positioning</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, o.addEventListener("click", () => a.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body";
  const n = document.createElement("div");
  n.className = "sg-ctrl-row";
  const l = document.createElement("label");
  l.className = "sg-ctrl-label", l.textContent = "Position";
  const r = document.createElement("div");
  r.className = "sg-ctrl-field";
  const u = document.createElement("select");
  u.className = "sg-select", ["static", "relative", "absolute", "fixed", "sticky"].forEach((m) => {
    const c = document.createElement("option");
    c.value = m, c.textContent = m.charAt(0).toUpperCase() + m.slice(1), u.appendChild(c);
  });
  const f = s.getStyle("position") || "static";
  u.value = f, u.addEventListener("change", () => {
    s.addStyle({ position: u.value });
  }), r.appendChild(u), n.appendChild(l), n.appendChild(r), i.appendChild(n), ["top", "right", "bottom", "left", "z-index"].forEach((m) => {
    const c = document.createElement("div");
    c.className = "sg-ctrl-row";
    const d = document.createElement("label");
    d.className = "sg-ctrl-label", d.textContent = m === "z-index" ? "Z-Index" : m.charAt(0).toUpperCase() + m.slice(1);
    const p = document.createElement("div");
    p.className = "sg-ctrl-field";
    const g = document.createElement("input");
    g.className = "sg-input sg-input-number", g.type = "number";
    const h = s.getStyle(m) || "";
    g.value = parseInt(h) ? String(parseInt(h)) : "", g.placeholder = "auto", g.addEventListener("change", () => {
      if (g.value === "")
        s.removeStyle(m);
      else {
        const C = m === "z-index" ? "" : "px";
        s.addStyle({ [m]: `${g.value}${C}` });
      }
    }), p.appendChild(g), c.appendChild(d), c.appendChild(p), i.appendChild(c);
  }), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function pn(t, e, s) {
  const a = document.createElement("div");
  a.className = "sg-ctrl-section";
  const o = document.createElement("div");
  o.className = "sg-ctrl-section-header", o.innerHTML = `
    <span class="sg-ctrl-section-title">Responsive</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, o.addEventListener("click", () => a.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body", [
    { label: "Desktop", icon: "fa-solid fa-desktop", className: "sg-hide-desktop" },
    { label: "Tablet", icon: "fa-solid fa-tablet-screen-button", className: "sg-hide-tablet" },
    { label: "Mobile", icon: "fa-solid fa-mobile-screen-button", className: "sg-hide-mobile" }
  ].forEach((l) => {
    var h;
    const r = document.createElement("div");
    r.className = "sg-ctrl-row";
    const u = document.createElement("label");
    u.className = "sg-ctrl-label", u.innerHTML = `<i class="${l.icon}" style="margin-right:4px"></i> ${Be(l.label)}`;
    const f = document.createElement("div");
    f.className = "sg-ctrl-field";
    const m = document.createElement("label");
    m.className = "sg-toggle-switch";
    const c = document.createElement("input");
    c.type = "checkbox";
    const d = ((h = s.getClasses) == null ? void 0 : h.call(s)) || [];
    c.checked = !d.includes(l.className);
    const p = document.createElement("span");
    p.className = "sg-toggle-switch-track";
    const g = document.createElement("span");
    g.className = "sg-toggle-switch-thumb", p.appendChild(g), m.appendChild(c), m.appendChild(p), c.addEventListener("change", () => {
      c.checked ? s.removeClass(l.className) : s.addClass(l.className);
    }), f.appendChild(m), r.appendChild(u), r.appendChild(f), i.appendChild(r);
  }), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function un(t, e, s) {
  var h, C;
  const a = document.createElement("div");
  a.className = "sg-ctrl-section";
  const o = document.createElement("div");
  o.className = "sg-ctrl-section-header", o.innerHTML = `
    <span class="sg-ctrl-section-title">Attributes</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, o.addEventListener("click", () => a.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body";
  const n = document.createElement("div");
  n.className = "sg-ctrl-row";
  const l = document.createElement("label");
  l.className = "sg-ctrl-label", l.textContent = "CSS ID";
  const r = document.createElement("div");
  r.className = "sg-ctrl-field";
  const u = document.createElement("input");
  u.className = "sg-input", u.type = "text", u.placeholder = "e.g. my-section";
  const f = ((h = s.getAttributes) == null ? void 0 : h.call(s)) || {};
  u.value = f.id || "", u.addEventListener("change", () => {
    s.addAttributes({ id: u.value || "" });
  }), r.appendChild(u), n.appendChild(l), n.appendChild(r), i.appendChild(n);
  const m = document.createElement("div");
  m.className = "sg-ctrl-row";
  const c = document.createElement("label");
  c.className = "sg-ctrl-label", c.textContent = "CSS Classes";
  const d = document.createElement("div");
  d.className = "sg-ctrl-field";
  const p = document.createElement("input");
  p.className = "sg-input", p.type = "text", p.placeholder = "e.g. my-class another-class";
  const g = ((C = s.getClasses) == null ? void 0 : C.call(s)) || [];
  p.value = g.join(" "), p.addEventListener("change", () => {
    g.forEach((L) => s.removeClass(L)), p.value.trim().split(/\s+/).filter(Boolean).forEach((L) => s.addClass(L));
  }), d.appendChild(p), m.appendChild(c), m.appendChild(d), i.appendChild(m), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
function mn(t, e, s) {
  const a = document.createElement("div");
  a.className = "sg-ctrl-section";
  const o = document.createElement("div");
  o.className = "sg-ctrl-section-header", o.innerHTML = `
    <span class="sg-ctrl-section-title">Custom CSS</span>
    <i class="fa-solid fa-chevron-down sg-ctrl-section-arrow"></i>
  `, o.addEventListener("click", () => a.classList.toggle("collapsed"));
  const i = document.createElement("div");
  i.className = "sg-ctrl-section-body";
  const n = document.createElement("textarea");
  n.className = "sg-css-textarea", n.placeholder = `/* Add custom CSS here */
selector {
  
}`, n.spellcheck = !1;
  const l = s.get("custom-css") || "";
  n.value = l;
  let r;
  n.addEventListener("input", () => {
    clearTimeout(r), r = setTimeout(() => {
      s.set("custom-css", n.value);
      try {
        const u = n.value.match(/\{([^}]+)\}/);
        if (u) {
          const f = {};
          u[1].split(";").forEach((m) => {
            const [c, d] = m.split(":").map((p) => p.trim());
            c && d && (f[c] = d);
          }), Object.keys(f).length > 0 && s.addStyle(f);
        }
      } catch {
      }
    }, 500);
  }), i.appendChild(n), a.appendChild(o), a.appendChild(i), t.appendChild(a);
}
let X = !1;
window.__sgEditing = {
  get interacting() {
    return X;
  },
  set interacting(t) {
    X = t;
  }
};
function gn(t, e) {
  let s = "content", a = null;
  function o() {
    return (!a || !a.isConnected) && (a = t.querySelector("#sg-edit-body")), a;
  }
  function i() {
    const r = o();
    if (!(!r || (r.innerHTML = "", !e.getSelected())))
      switch (s) {
        case "content":
          Bt(r, e);
          break;
        case "style":
          Jt(r, e);
          break;
        case "advanced":
          rn(r, e);
          break;
      }
  }
  t.addEventListener("sg:tab-change", ((r) => {
    s = r.detail.tab, i();
  })), e.on("component:selected", () => {
    s = "content", requestAnimationFrame(() => {
      a = null, i();
    });
  });
  let n = null;
  e.on("style:custom", () => {
    if (s === "style") {
      if (X) return;
      n && clearTimeout(n), n = setTimeout(() => {
        i(), n = null;
      }, 100);
    }
  });
  let l = null;
  e.on("trait:custom", () => {
    if (s === "content") {
      if (X) return;
      l && clearTimeout(l), l = setTimeout(() => {
        i(), l = null;
      }, 100);
    }
  });
}
const Te = {
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
function fn(t) {
  return Te[t] || Te.default;
}
function bn(t, e) {
  const s = document.createElement("div");
  s.className = "sg-navigator-header", s.innerHTML = `
    <span class="sg-navigator-header-icon"><i class="fa-solid fa-bars-staggered"></i></span>
    <span class="sg-navigator-title">Structure</span>
    <button class="sg-navigator-close" title="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `, s.querySelector(".sg-navigator-close").addEventListener("click", () => {
    t.classList.remove("open");
    const r = document.querySelector('.sg-topbar-icon-btn[data-cmd="toggle-navigator"]');
    r == null || r.classList.remove("active");
  }), vn(s, t);
  const a = document.createElement("div");
  a.className = "sg-navigator-resize", hn(a, t);
  const o = document.createElement("div");
  o.className = "sg-navigator-body", t.appendChild(a), t.appendChild(s), t.appendChild(o);
  const i = /* @__PURE__ */ new Set();
  function n() {
    o.innerHTML = "";
    const r = e.getWrapper();
    if (!r) return;
    const u = r.components();
    l(o, u, 0);
  }
  function l(r, u, f) {
    u.forEach((m) => {
      var N;
      const c = m.getId(), d = m.get("type") || m.get("tagName") || "div", p = ((N = m.getName) == null ? void 0 : N.call(m)) || d, g = m.components(), h = g && g.length > 0, C = i.has(c), v = e.getSelected() === m, L = m.getStyle("display") !== "none", S = document.createElement("div");
      S.className = "sg-layer-item", v && S.classList.add("selected"), S.style.paddingLeft = `${8 + f * 16}px`;
      const b = document.createElement("button");
      b.className = "sg-layer-toggle", h || b.classList.add("empty"), C && b.classList.add("collapsed"), b.innerHTML = '<i class="fa-solid fa-caret-down"></i>', b.addEventListener("click", (A) => {
        A.stopPropagation(), C ? i.delete(c) : i.add(c), n();
      });
      const y = document.createElement("span");
      y.className = "sg-layer-icon", y.innerHTML = `<i class="${fn(d)}"></i>`;
      const k = document.createElement("span");
      k.className = "sg-layer-name", k.textContent = p, k.addEventListener("dblclick", (A) => {
        A.stopPropagation();
        const M = document.createElement("input");
        M.className = "sg-layer-name-input", M.value = p, k.replaceWith(M), M.focus(), M.select();
        const x = () => {
          const H = M.value.trim();
          H && m.set("custom-name", H), n();
        };
        M.addEventListener("blur", x), M.addEventListener("keydown", (H) => {
          H.key === "Enter" && x(), H.key === "Escape" && n();
        });
      });
      const E = document.createElement("button");
      if (E.className = "sg-layer-visibility", L || E.classList.add("hidden-layer"), E.innerHTML = L ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>', E.addEventListener("click", (A) => {
        A.stopPropagation(), L ? m.addStyle({ display: "none" }) : m.removeStyle("display"), n();
      }), S.addEventListener("click", () => {
        e.select(m);
      }), S.appendChild(b), S.appendChild(y), S.appendChild(k), S.appendChild(E), r.appendChild(S), h && !C) {
        const A = document.createElement("div");
        A.className = "sg-layer-children", l(A, g, f + 1), r.appendChild(A);
      }
    });
  }
  e.on("layer:custom", () => {
    n();
  }), e.on("component:selected component:deselected component:add component:remove component:drag:end", () => {
    n();
  }), e.on("load", () => n());
}
function hn(t, e) {
  let s = 0, a = 0, o = 0;
  t.addEventListener("pointerdown", (i) => {
    i.preventDefault(), t.setPointerCapture(i.pointerId);
    const n = e.getBoundingClientRect();
    s = i.clientY, a = n.height, o = n.top, e.style.right = "auto", e.style.bottom = "auto", e.style.left = n.left + "px", e.style.top = o + "px";
    const l = (u) => {
      const f = u.clientY - s, m = a - f, c = o + f;
      m >= 180 && c >= 0 && (e.style.height = m + "px", e.style.top = c + "px");
    }, r = () => {
      t.removeEventListener("pointermove", l), t.removeEventListener("pointerup", r);
    };
    t.addEventListener("pointermove", l), t.addEventListener("pointerup", r);
  });
}
function vn(t, e) {
  let s = 0, a = 0, o = 0, i = 0;
  t.addEventListener("pointerdown", (n) => {
    if (n.target.closest("button")) return;
    n.preventDefault(), t.setPointerCapture(n.pointerId);
    const l = e.getBoundingClientRect();
    s = n.clientX, a = n.clientY, o = l.left, i = l.top, e.style.right = "auto", e.style.bottom = "auto", e.style.left = o + "px", e.style.top = i + "px";
    const r = (f) => {
      const m = f.clientX - s, c = f.clientY - a;
      let d = o + m, p = i + c;
      d = Math.max(0, Math.min(d, window.innerWidth - 60)), p = Math.max(0, Math.min(p, window.innerHeight - 36)), e.style.left = d + "px", e.style.top = p + "px";
    }, u = () => {
      t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", u);
    };
    t.addEventListener("pointermove", r), t.addEventListener("pointerup", u);
  });
}
function Ae(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const yn = [
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
      const s = e.parent();
      if (s) {
        const a = s.components().indexOf(e), o = e.clone();
        s.components().add(o, { at: a + 1 }), t.select(o);
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
      const s = e.parent();
      s && s !== t.getWrapper() && t.select(s);
    }
  },
  { label: "", icon: "", separator: !0 },
  {
    label: "Edit with AI",
    icon: "fa-solid fa-wand-magic-sparkles",
    action: (t, e) => {
      const s = t.__sgAiConfig;
      s && (t.select(e), import("./ai-chat-modal-lx7mxcPS.js").then(({ openAiChatModal: a }) => {
        a(t, s, { mode: "edit", targetComponent: e });
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
function xn(t, e) {
  let s = null;
  function a(i, n, l) {
    s = l, t.innerHTML = "";
    const r = !!e.__sgAiConfig;
    yn.forEach((d) => {
      if (d.label === "Edit with AI" && !r) return;
      if (d.separator) {
        const g = document.createElement("div");
        g.className = "sg-context-menu-sep", t.appendChild(g);
        return;
      }
      const p = document.createElement("div");
      p.className = "sg-context-menu-item", d.danger && p.classList.add("danger"), d.disabled && p.classList.add("disabled"), p.innerHTML = `
        <span class="sg-context-menu-item-icon"><i class="${d.icon}"></i></span>
        <span class="sg-context-menu-item-label">${Ae(d.label)}</span>
        ${d.shortcut ? `<span class="sg-context-menu-item-shortcut">${Ae(d.shortcut)}</span>` : ""}
      `, p.addEventListener("click", () => {
        d.action && s && d.action(e, s), o();
      }), t.appendChild(p);
    });
    const u = 200, f = t.children.length * 32, m = i + u > window.innerWidth ? window.innerWidth - u - 8 : i, c = n + f > window.innerHeight ? window.innerHeight - f - 8 : n;
    t.style.left = `${m}px`, t.style.top = `${c}px`, t.classList.add("open");
  }
  function o() {
    t.classList.remove("open"), s = null;
  }
  e.on("load", () => {
    const i = e.Canvas.getDocument();
    i && i.addEventListener("contextmenu", (n) => {
      const l = n;
      l.preventDefault();
      const u = e.Canvas.getElement().getBoundingClientRect(), f = l.target;
      if (f) {
        const m = e.Components.getById(f.id) || Cn(e, f);
        m && (e.select(m), a(l.clientX + u.left, l.clientY + u.top, m));
      }
    });
  }), document.addEventListener("click", (i) => {
    t.contains(i.target) || o();
  }), document.addEventListener("keydown", (i) => {
    i.key === "Escape" && o();
  });
}
function Cn(t, e) {
  const s = t.getWrapper();
  if (!s) return null;
  function a(o) {
    var l;
    if (((l = o.getEl) == null ? void 0 : l.call(o)) === e) return o;
    const n = o.components();
    if (n)
      for (let r = 0; r < n.length; r++) {
        const u = a(n.at(r));
        if (u) return u;
      }
    return null;
  }
  return a(s);
}
let R = [];
function wn(t, e = []) {
  const s = t.Modal;
  s.setTitle("Templates");
  const a = document.createElement("div");
  a.className = "sg-template-modal";
  const o = [...e, ...R];
  le(a, o, t), s.setContent(a), s.open();
}
function le(t, e, s) {
  t.innerHTML = "";
  const a = document.createElement("style");
  a.textContent = `
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
  `, t.appendChild(a);
  const o = document.createElement("div");
  o.className = "sg-template-toolbar";
  const i = document.createElement("button");
  if (i.className = "sg-template-toolbar-btn", i.innerHTML = '<i class="fa-solid fa-file-import"></i> Upload HTML', i.addEventListener("click", () => He(t, e, s)), o.appendChild(i), t.appendChild(o), e.length === 0) {
    const n = document.createElement("div");
    n.className = "sg-template-empty", n.innerHTML = `
      <i class="fa-solid fa-folder-open"></i>
      <div class="sg-template-empty-text">No templates yet</div>
    `;
    const l = document.createElement("button");
    l.className = "sg-template-add-btn", l.innerHTML = '<i class="fa-solid fa-plus"></i> Add Template', l.addEventListener("click", () => He(t, e, s)), n.appendChild(l), t.appendChild(n);
  } else {
    const n = document.createElement("div");
    n.className = "sg-template-list";
    for (const l of e) {
      const r = document.createElement("div");
      r.className = "sg-template-item";
      const u = l.createdAt ? new Date(l.createdAt).toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      }) : "";
      r.innerHTML = `
        <i class="fa-solid fa-file-code sg-template-item-icon"></i>
        <div class="sg-template-item-info">
          <div class="sg-template-item-name">${En(l.name)}</div>
          ${u ? `<div class="sg-template-item-date">${u}</div>` : ""}
        </div>
        <div class="sg-template-item-actions"></div>
      `;
      const f = r.querySelector(".sg-template-item-actions"), m = document.createElement("button");
      if (m.className = "sg-template-insert-btn", m.textContent = "Insert", m.addEventListener("click", () => {
        Hn(s, l.data), s.Modal.close();
      }), f.appendChild(m), R.some((c) => c.id === l.id)) {
        const c = document.createElement("button");
        c.className = "sg-template-delete-btn", c.innerHTML = '<i class="fa-solid fa-trash-can"></i>', c.addEventListener("click", () => {
          R = R.filter((p) => p.id !== l.id);
          const d = [...e.filter((p) => p.id !== l.id)];
          le(t, d, s);
        }), f.appendChild(c);
      }
      n.appendChild(r);
    }
    t.appendChild(n);
  }
}
function He(t, e, s) {
  const a = document.createElement("input");
  a.type = "file", a.accept = ".html,.htm", a.style.display = "none", a.addEventListener("change", () => {
    var n;
    const o = (n = a.files) == null ? void 0 : n[0];
    if (!o) return;
    const i = new FileReader();
    i.onload = () => {
      const l = i.result, r = o.name.replace(/\.(html|htm)$/i, ""), u = {
        id: "local-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        name: r,
        data: l,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      R.push(u);
      const f = [...e, u];
      le(t, f, s);
    }, i.readAsText(o);
  }), document.body.appendChild(a), a.click(), a.remove();
}
function En(t) {
  const e = document.createElement("div");
  return e.textContent = t, e.innerHTML;
}
const z = "sg-canvas-ai-prompt";
function Ie(t) {
  const e = t.getWrapper();
  return e ? e.components().length === 0 : !0;
}
function Oe(t) {
  return t.__sgAiConfig || null;
}
function se(t) {
  return Ie(t) && !!Oe(t);
}
function Ln(t) {
  if (t.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) return;
  const e = t.createElement("link");
  e.rel = "stylesheet", e.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", t.head.appendChild(e);
}
const kn = `
  /* --- Registered custom property for border spin --- */
  @property --sg-aip-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  /* --- Keyframes --- */
  @keyframes sg-aip-aurora-rotate {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes sg-aip-aurora-pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.55; transform: translate(-50%, -50%) scale(1.2); }
  }
  @keyframes sg-aip-border-spin {
    to { --sg-aip-angle: 360deg; }
  }
  @keyframes sg-aip-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes sg-aip-placeholder-cycle {
    0%, 20% { opacity: 1; }
    25%, 45% { opacity: 0; }
    50%, 70% { opacity: 0; }
    75%, 95% { opacity: 0; }
  }
  @keyframes sg-aip-placeholder-cycle-2 {
    0%, 20% { opacity: 0; }
    25%, 45% { opacity: 1; }
    50%, 70% { opacity: 0; }
    75%, 95% { opacity: 0; }
  }
  @keyframes sg-aip-placeholder-cycle-3 {
    0%, 20% { opacity: 0; }
    25%, 45% { opacity: 0; }
    50%, 70% { opacity: 1; }
    75%, 95% { opacity: 0; }
  }
  @keyframes sg-aip-placeholder-cycle-4 {
    0%, 20% { opacity: 0; }
    25%, 45% { opacity: 0; }
    50%, 70% { opacity: 0; }
    75%, 95% { opacity: 1; }
  }

  #${z} {
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
    background: #0d0d15;
    overflow: hidden;
  }

  /* --- Aurora glow layers --- */
  .sg-aip-aurora {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,57,43,0.35) 0%, rgba(231,76,60,0.12) 40%, transparent 70%);
    filter: blur(80px);
    animation: sg-aip-aurora-rotate 18s linear infinite, sg-aip-aurora-pulse 9s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
  .sg-aip-aurora--secondary {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(231,76,60,0.2) 0%, rgba(192,57,43,0.08) 45%, transparent 70%);
    filter: blur(100px);
    animation: sg-aip-aurora-rotate 25s linear infinite reverse, sg-aip-aurora-pulse 12s ease-in-out 3s infinite;
  }

  .sg-aip-title {
    font-size: 36px;
    font-weight: 800;
    color: #f5f5f5;
    margin: 0 0 10px;
    text-align: center;
    letter-spacing: -0.5px;
    line-height: 1.2;
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out both;
  }
  .sg-aip-title-accent {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
    filter: drop-shadow(0 0 10px rgba(192,57,43,0.4));
  }

  .sg-aip-subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.5);
    margin: 0 0 32px;
    text-align: center;
    max-width: 440px;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out 0.1s both;
  }

  /* --- Input bar --- */
  .sg-aip-bar {
    width: 100%;
    max-width: 580px;
    background: rgba(13, 13, 21, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: none;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    animation: sg-aip-fade-in 0.6s ease-out 0.2s both;
  }

  /* Spinning conic-gradient border — same technique as AI topbar button */
  .sg-aip-bar::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 1.5px;
    background: conic-gradient(from var(--sg-aip-angle), #c0392b, #e74c3c, #ff8a80, #e74c3c, #a93226, #c0392b);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: sg-aip-border-spin 3s linear infinite;
    z-index: -1;
    pointer-events: none;
  }

  .sg-aip-bar:focus-within {
    box-shadow: 0 0 30px rgba(192,57,43,0.3);
  }
  .sg-aip-bar:focus-within::before {
    padding: 2px;
    filter: brightness(1.3);
  }

  /* --- Animated placeholder --- */
  .sg-aip-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 12px;
    padding-top: 16px;
    pointer-events: none;
    z-index: 2;
  }
  .sg-aip-placeholder span {
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    color: rgba(255,255,255,0.3);
    font-size: 15px;
    font-family: inherit;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .sg-aip-placeholder span:nth-child(1) { animation: sg-aip-placeholder-cycle 16s ease-in-out infinite; }
  .sg-aip-placeholder span:nth-child(2) { animation: sg-aip-placeholder-cycle-2 16s ease-in-out infinite; }
  .sg-aip-placeholder span:nth-child(3) { animation: sg-aip-placeholder-cycle-3 16s ease-in-out infinite; }
  .sg-aip-placeholder span:nth-child(4) { animation: sg-aip-placeholder-cycle-4 16s ease-in-out infinite; }

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
    position: relative;
    z-index: 3;
  }
  .sg-aip-textarea::placeholder {
    color: transparent;
  }

  .sg-aip-bar-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 3;
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
    color: rgba(255,255,255,0.4);
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
    transition: background 0.15s, transform 0.1s, box-shadow 0.2s;
    padding: 0;
  }
  .sg-aip-send-btn:hover {
    background: #e74c3c;
    box-shadow: 0 0 20px rgba(192,57,43,0.4);
  }
  .sg-aip-send-btn:active {
    transform: scale(0.93);
  }
  .sg-aip-send-btn:disabled {
    opacity: 0.5;
    cursor: default;
    box-shadow: none;
  }

  /* --- Image preview --- */
  .sg-aip-img-preview {
    display: none;
    padding: 0 4px;
    position: relative;
    z-index: 3;
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
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out 0.3s both;
  }
  .sg-aip-chip {
    padding: 8px 16px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .sg-aip-chip i {
    font-size: 12px;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  .sg-aip-chip:hover {
    background: rgba(192,57,43,0.12);
    border-color: rgba(192,57,43,0.4);
    color: #fff;
  }
  .sg-aip-chip:hover i {
    opacity: 1;
  }

  /* --- Loading state --- */
  .sg-aip-loading {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    z-index: 1;
  }
  .sg-aip-loading--visible {
    display: flex;
  }
  .sg-aip-loading-text {
    font-size: 16px;
    color: rgba(255,255,255,0.8);
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
    box-shadow: 0 0 8px rgba(192,57,43,0.5);
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
    position: relative;
    z-index: 1;
  }
  .sg-aip-error--visible {
    display: flex;
  }
  .sg-aip-error-text {
    font-size: 14px;
    color: #f87171;
    line-height: 1.5;
  }
  .sg-aip-retry-btn {
    padding: 8px 20px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 2px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .sg-aip-retry-btn:hover {
    background: rgba(192,57,43,0.12);
    border-color: rgba(192,57,43,0.4);
    color: #fff;
  }

  /* --- Manual CTA --- */
  .sg-aip-manual-cta {
    margin-top: 28px;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    position: relative;
    z-index: 1;
    animation: sg-aip-fade-in 0.6s ease-out 0.5s both;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .sg-aip-manual-cta a {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 1px;
  }
  .sg-aip-manual-cta a:hover {
    color: #fff;
    border-bottom-color: rgba(255,255,255,0.4);
  }

  /* --- Confirm modal (drag interception) --- */
  .sg-aip-confirm-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: sg-aip-fade-in 0.2s ease-out both;
  }
  .sg-aip-confirm-modal {
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 28px 32px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  }
  .sg-aip-confirm-icon {
    font-size: 28px;
    color: rgba(255,255,255,0.3);
    margin-bottom: 16px;
  }
  .sg-aip-confirm-title {
    font-size: 16px;
    font-weight: 600;
    color: #f5f5f5;
    margin: 0 0 8px;
  }
  .sg-aip-confirm-text {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    margin: 0 0 24px;
    line-height: 1.5;
  }
  .sg-aip-confirm-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .sg-aip-confirm-btn {
    padding: 8px 20px;
    border-radius: 4px;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .sg-aip-confirm-btn--secondary {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7);
  }
  .sg-aip-confirm-btn--secondary:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.25);
    color: #fff;
  }
  .sg-aip-confirm-btn--primary {
    background: #c0392b;
    border: 1px solid #c0392b;
    color: #fff;
  }
  .sg-aip-confirm-btn--primary:hover {
    background: #e74c3c;
    border-color: #e74c3c;
  }

  /* --- Tooltip (unsupported model feedback) --- */
  .sg-aip-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    background: rgba(30,30,46,0.95);
    color: #fbbf24;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .sg-aip-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 16px;
    border: 5px solid transparent;
    border-top-color: rgba(30,30,46,0.95);
  }
  .sg-aip-tooltip--visible {
    opacity: 1;
    transform: translateY(0);
  }
`, Sn = [
  { label: "Startup Landing", prompt: "A bold startup landing page with dark hero, feature cards with icons, pricing tiers, and a strong call to action", icon: "fa-solid fa-bolt" },
  { label: "Creative Portfolio", prompt: "A minimal portfolio with full-width project images, short bio section, and a contact form at the bottom", icon: "fa-solid fa-palette" },
  { label: "Restaurant Menu", prompt: "An elegant restaurant page with hero image, menu sections with prices, photo gallery, and reservation CTA", icon: "fa-solid fa-utensils" },
  { label: "Event Invite", prompt: "A single-page event invitation with countdown, schedule timeline, speaker cards, and RSVP form", icon: "fa-solid fa-calendar-days" }
];
function Nn(t) {
  const e = () => {
    var pe;
    if (!se(t)) return;
    const i = document.querySelector(".gjs-frame");
    if (!((pe = i == null ? void 0 : i.contentDocument) != null && pe.body)) return;
    const n = i.contentDocument;
    if (n.getElementById(z)) return;
    const l = Oe(t);
    Ln(n);
    const r = n.createElement("style");
    r.id = "sg-canvas-ai-prompt-styles", r.textContent = kn, n.head.appendChild(r);
    let u = null, f = !1, m = !1, c = null;
    const d = n.createElement("div");
    d.id = z;
    const p = n.createElement("div");
    p.style.cssText = "display:flex;flex-direction:column;align-items:center;width:100%;";
    const g = n.createElement("h1");
    g.className = "sg-aip-title", g.innerHTML = 'What will you <span class="sg-aip-title-accent">create</span> today?';
    const h = n.createElement("p");
    h.className = "sg-aip-subtitle", h.textContent = "Describe your idea and let the AI do the heavy lifting";
    const C = n.createElement("div");
    C.className = "sg-aip-bar";
    const v = n.createElement("div");
    v.className = "sg-aip-img-preview";
    const L = n.createElement("div");
    L.className = "sg-aip-placeholder";
    const S = [
      "A startup landing with dark hero and pricing cards...",
      "An online store with product grid and checkout...",
      "A restaurant page with menu and reservations...",
      "A personal blog with featured posts and sidebar..."
    ];
    for (const V of S) {
      const O = n.createElement("span");
      O.textContent = V, L.appendChild(O);
    }
    const b = n.createElement("textarea");
    b.className = "sg-aip-textarea", b.placeholder = "", b.rows = 1, b.addEventListener("input", () => {
      b.style.height = "auto", b.style.height = Math.min(b.scrollHeight, 120) + "px", L.style.display = b.value ? "none" : "";
    });
    const y = n.createElement("div");
    y.className = "sg-aip-bar-footer";
    const k = n.createElement("div");
    k.className = "sg-aip-bar-left";
    const E = n.createElement("button");
    E.className = "sg-aip-icon-btn", E.title = "Attach reference image", E.innerHTML = '<i class="fa-solid fa-paperclip"></i>';
    const N = document.createElement("input");
    N.type = "file", N.accept = "image/*", N.style.display = "none", document.body.appendChild(N);
    const A = [
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
    function M() {
      const V = (l.model || "").toLowerCase();
      return A.some((O) => V.startsWith(O));
    }
    const x = n.createElement("div");
    x.className = "sg-aip-tooltip", x.textContent = `Model "${l.model}" may not support image inputs`, E.addEventListener("click", () => {
      if (!M()) {
        x.classList.add("sg-aip-tooltip--visible"), setTimeout(() => x.classList.remove("sg-aip-tooltip--visible"), 3e3);
        return;
      }
      N.click();
    }), N.addEventListener("change", () => {
      var U;
      const V = (U = N.files) == null ? void 0 : U[0];
      if (!V) return;
      const O = new FileReader();
      O.onload = () => {
        u = O.result, H();
      }, O.readAsDataURL(V), N.value = "";
    });
    function H() {
      if (!u) {
        v.className = "sg-aip-img-preview", v.innerHTML = "";
        return;
      }
      v.className = "sg-aip-img-preview sg-aip-img-preview--visible", v.innerHTML = "";
      const V = n.createElement("img");
      V.src = u;
      const O = n.createElement("button");
      O.className = "sg-aip-img-remove", O.innerHTML = '<i class="fa-solid fa-xmark"></i>', O.addEventListener("click", () => {
        u = null, H();
      }), v.appendChild(V), v.appendChild(O);
    }
    const B = window.SpeechRecognition || window.webkitSpeechRecognition;
    let w = null;
    B && (w = n.createElement("button"), w.className = "sg-aip-icon-btn", w.title = "Voice to text", w.innerHTML = '<i class="fa-solid fa-microphone"></i>', w.addEventListener("click", () => {
      if (m && c) {
        c.stop();
        return;
      }
      c = new B(), c.continuous = !1, c.interimResults = !1, c.lang = "en-US", c.onstart = () => {
        m = !0, w.classList.add("sg-aip-icon-btn--recording");
      }, c.onresult = (V) => {
        var U, G;
        const O = ((G = (U = V.results[0]) == null ? void 0 : U[0]) == null ? void 0 : G.transcript) || "";
        O && (b.value += (b.value ? " " : "") + O, b.dispatchEvent(new Event("input")));
      }, c.onend = () => {
        m = !1, w.classList.remove("sg-aip-icon-btn--recording"), c = null;
      }, c.onerror = () => {
        m = !1, w.classList.remove("sg-aip-icon-btn--recording"), c = null;
      }, c.start();
    })), k.appendChild(E), k.appendChild(x), w && k.appendChild(w);
    const T = n.createElement("button");
    T.className = "sg-aip-send-btn", T.title = "Generate (Enter)", T.innerHTML = '<i class="fa-solid fa-arrow-up"></i>', y.appendChild(k), y.appendChild(T), C.appendChild(v), C.appendChild(L), C.appendChild(b), C.appendChild(y);
    const j = n.createElement("div");
    j.className = "sg-aip-chips";
    for (const V of Sn) {
      const O = n.createElement("button");
      O.className = "sg-aip-chip", O.innerHTML = '<i class="' + V.icon + '"></i> ' + V.label, O.addEventListener("click", () => {
        b.value = V.prompt, b.dispatchEvent(new Event("input")), b.focus();
      }), j.appendChild(O);
    }
    const I = n.createElement("div");
    I.className = "sg-aip-manual-cta", I.innerHTML = "or <a>start from scratch</a> by dragging widgets", I.querySelector("a").addEventListener("click", () => {
      s();
    }), p.appendChild(g), p.appendChild(h), p.appendChild(C), p.appendChild(j), p.appendChild(I);
    const P = n.createElement("div");
    P.className = "sg-aip-loading", P.innerHTML = `
      <div class="sg-aip-loading-dots"><span></span><span></span><span></span></div>
      <div class="sg-aip-loading-text">Generating your page...</div>
    `;
    const q = n.createElement("div");
    q.className = "sg-aip-error";
    const K = n.createElement("div");
    K.className = "sg-aip-error-text";
    const F = n.createElement("button");
    F.className = "sg-aip-retry-btn", F.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Try Again', F.addEventListener("click", () => {
      q.classList.remove("sg-aip-error--visible"), p.style.display = "flex", b.focus();
    }), q.appendChild(K), q.appendChild(F);
    const re = n.createElement("div");
    re.className = "sg-aip-aurora", d.appendChild(re);
    const ce = n.createElement("div");
    ce.className = "sg-aip-aurora sg-aip-aurora--secondary", d.appendChild(ce), d.appendChild(p), d.appendChild(P), d.appendChild(q), n.body.appendChild(d), setTimeout(() => b.focus(), 100);
    async function de() {
      const V = b.value.trim();
      if (!(!V && !u) && !f) {
        f = !0, p.style.display = "none", q.classList.remove("sg-aip-error--visible"), P.classList.add("sg-aip-loading--visible");
        try {
          const { AiClient: O, extractHtmlFromResponse: U, validateHtml: G } = await import("./index-CMVVnGNL.js"), je = new O(l), ue = [];
          let J;
          u ? J = [
            { type: "text", text: V },
            { type: "image_url", image_url: { url: u } }
          ] : J = V, ue.push({ role: "user", content: J });
          const De = await je.chat(ue), me = U(De);
          if (G(me))
            t.setComponents(me);
          else
            throw new Error("The AI response did not contain valid HTML. Please try a more specific description.");
        } catch (O) {
          P.classList.remove("sg-aip-loading--visible"), K.textContent = (O == null ? void 0 : O.message) || "Something went wrong. Please try again.", q.classList.add("sg-aip-error--visible");
        } finally {
          f = !1;
        }
      }
    }
    b.addEventListener("keydown", (V) => {
      V.key === "Enter" && !V.shiftKey && (V.preventDefault(), de());
    }), T.addEventListener("click", de);
  };
  function s() {
    const i = document.querySelector(".gjs-frame");
    if (!(i != null && i.contentDocument)) return;
    const n = i.contentDocument.getElementById(z);
    n && n.remove();
    const l = i.contentDocument.getElementById("sg-canvas-ai-prompt-styles");
    l && l.remove(), document.querySelectorAll('input[type="file"][accept="image/*"]').forEach((r) => {
      r.style.display === "none" && !r.closest(".sg-modal") && r.remove();
    });
  }
  function a() {
    return new Promise((i) => {
      const n = document.querySelector(".gjs-frame"), l = n == null ? void 0 : n.contentDocument;
      if (!l) {
        i(!1);
        return;
      }
      const r = l.createElement("div");
      r.className = "sg-aip-confirm-backdrop", r.innerHTML = `
        <div class="sg-aip-confirm-modal">
          <div class="sg-aip-confirm-icon"><i class="fa-solid fa-hand-pointer"></i></div>
          <p class="sg-aip-confirm-title">Start building manually?</p>
          <p class="sg-aip-confirm-text">You'll skip the AI assistant and build your page by dragging widgets onto the canvas.</p>
          <div class="sg-aip-confirm-actions">
            <button class="sg-aip-confirm-btn sg-aip-confirm-btn--secondary" data-action="cancel">Back to AI</button>
            <button class="sg-aip-confirm-btn sg-aip-confirm-btn--primary" data-action="confirm">Yes, start manually</button>
          </div>
        </div>
      `;
      const u = (f) => {
        r.remove(), i(f);
      };
      r.querySelector('[data-action="cancel"]').addEventListener("click", () => u(!1)), r.querySelector('[data-action="confirm"]').addEventListener("click", () => u(!0)), r.addEventListener("click", (f) => {
        f.target === r && u(!1);
      }), l.body.appendChild(r);
    });
  }
  let o = !1;
  t.on("load", () => {
    setTimeout(e, 300);
  }), t.on("block:drag:start", async () => {
    var r;
    if (o) return;
    const i = document.querySelector(".gjs-frame");
    if (!((r = i == null ? void 0 : i.contentDocument) == null ? void 0 : r.getElementById(z))) return;
    t.Blocks.endDrag(), await a() && (o = !0, s());
  }), t.on("component:add", () => {
    setTimeout(() => {
      Ie(t) || s();
    }, 50);
  }), t.on("component:remove", () => {
    setTimeout(() => {
      if (se(t)) {
        const i = document.querySelector(".gjs-frame");
        i != null && i.contentDocument && !i.contentDocument.getElementById(z) && (o = !1, e());
      }
    }, 200);
  });
}
let Ve = [];
function Dn(t) {
  Ve = t;
}
function Tn(t) {
  const e = () => {
    var n;
    if (se(t)) return;
    const s = document.querySelector(".gjs-frame");
    if (!((n = s == null ? void 0 : s.contentDocument) != null && n.body)) return;
    const a = s.contentDocument;
    if (a.getElementById("sg-canvas-add-bar")) return;
    const o = a.createElement("style");
    o.textContent = `
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
    `, a.head.appendChild(o);
    const i = a.createElement("div");
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
    `, Bn(a), a.body.appendChild(i), i.addEventListener("click", (l) => {
      const r = l.target.closest(".sg-add-bar-btn");
      if (!r) return;
      const u = r.dataset.action;
      if (u === "templates")
        wn(t, Ve);
      else if (u === "ai") {
        const f = t.__sgAiConfig;
        f ? import("./ai-chat-modal-lx7mxcPS.js").then(({ openAiChatModal: m }) => {
          m(t, f, "append");
        }) : An(t);
      }
    });
  };
  t.on("load", () => {
    setTimeout(e, 300);
  }), t.on("component:add component:remove", () => {
    setTimeout(() => Mn(), 100);
  });
}
function An(t) {
  const e = t.getWrapper();
  e && e.append({
    type: "sg-section",
    components: [{ type: "sg-container" }]
  });
}
function Hn(t, e) {
  const s = t.getWrapper();
  if (!s) return;
  const a = e.trim();
  !a.startsWith("<section") && !a.includes('data-gjs-type="sg-section"') ? s.append({
    type: "sg-section",
    components: e
  }) : s.append(e);
}
function Mn(t) {
  var a;
  const e = document.querySelector(".gjs-frame");
  if (!((a = e == null ? void 0 : e.contentDocument) != null && a.body)) return;
  const s = e.contentDocument.getElementById("sg-canvas-add-bar");
  s && s.nextElementSibling && e.contentDocument.body.appendChild(s);
}
function Bn(t) {
  if (t.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) return;
  const e = t.createElement("link");
  e.rel = "stylesheet", e.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", t.head.appendChild(e);
}
let _ = null;
function In(t) {
  const e = t.Keymaps, s = t.Commands;
  s.add("sg:duplicate", {
    run(a) {
      const o = a.getSelected();
      if (!o) return;
      const i = o.parent();
      if (!i) return;
      const n = i.components().indexOf(o), l = o.clone();
      i.components().add(l, { at: n + 1 }), a.select(l);
    }
  }), s.add("sg:copy", {
    run(a) {
      const o = a.getSelected();
      o && (_ = o.clone());
    }
  }), s.add("sg:paste", {
    run(a) {
      if (!_) return;
      const o = a.getSelected(), i = (o == null ? void 0 : o.parent()) || a.getWrapper();
      if (!i) return;
      const n = _.clone();
      if (o) {
        const l = i.components().indexOf(o);
        i.components().add(n, { at: l + 1 });
      } else
        i.components().add(n);
      a.select(n);
    }
  }), s.add("sg:delete", {
    run(a) {
      const o = a.getSelected();
      if (!o) return;
      const i = o.parent(), n = o.index();
      if (o.remove(), i) {
        const l = i.components(), r = l.at(n) || l.at(n - 1);
        r ? a.select(r) : a.select();
      }
    }
  }), e.add("sg:delete", "backspace", "sg:delete"), e.add("sg:delete-del", "delete", "sg:delete"), e.add("sg:duplicate", "⌘+d", "sg:duplicate"), e.add("sg:copy", "⌘+c", "sg:copy"), e.add("sg:paste", "⌘+v", "sg:paste"), e.add("sg:undo", "⌘+z", "core:undo"), e.add("sg:redo", "⌘+shift+z", "core:redo");
}
const ee = "sg:ai-edit";
function On(t) {
  const e = t.__sgAiConfig;
  e && (t.Commands.add(ee, {
    run(s) {
      const a = s.getSelected();
      a && import("./ai-chat-modal-lx7mxcPS.js").then(({ openAiChatModal: o }) => {
        o(s, e, {
          mode: "edit",
          targetComponent: a
        });
      });
    }
  }), t.on("component:selected", (s) => {
    const a = s.get("toolbar") || [];
    if (a.some((l) => l.command === ee)) return;
    const o = [...a], i = o.findIndex((l) => l.command === "tlb-delete"), n = {
      command: ee,
      label: '<i class="fa-solid fa-wand-magic-sparkles"></i>',
      attributes: { title: "Edit with AI" }
    };
    i >= 0 ? o.splice(i, 0, n) : o.push(n), s.set("toolbar", o);
  }));
}
class Pn {
  constructor(e) {
    if (this.sidebar = null, this.editor = null, this.destroyed = !1, !document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) {
      const s = document.createElement("link");
      s.rel = "stylesheet", s.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", document.head.appendChild(s);
    }
    this.shell = yt(e);
  }
  /**
   * Phase 2: Connect a GrapesJS editor instance to the UI.
   * Call this after grapesjs.init() has mounted into #sg-canvas.
   */
  connect(e) {
    this.editor = e, wt(this.shell.topbar, e), this.sidebar = St(this.shell.sidebar, e), Ht(this.shell.sidebar, e), gn(this.shell.sidebar, e), bn(this.shell.navigator, e), xn(this.shell.contextMenu, e), Nn(e), Tn(e), In(e), On(e);
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
  Pn as UIManager,
  jn as createEditor,
  Dn as setExternalTemplates
};
//# sourceMappingURL=super-grapes.mjs.map
