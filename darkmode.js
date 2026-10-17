/* TradeBook standalone dark mode toggle. Independent of script.js. Load at the END of <body>. */
(function () {
  var KEY = "tradebook.theme";
  var st = document.createElement("style");
  st.textContent =
    ":root[data-theme=dark]{color-scheme:dark;--bg:#0f1316;--card:#171c21;--ink:#e8ecef;--mut:#98a2ad;--line:#2a3138;--hover:#1f262c;--warn:#f2b84b;--warn-l:#33290f;--bad:#ff8a80;--bad-l:#3a1b19}" +
    "#dm-toggle{position:fixed;right:16px;bottom:16px;z-index:9999;width:46px;height:46px;border-radius:50%;border:1px solid var(--line,#ccc);background:var(--card,#fff);color:var(--ink,#17202a);font-size:22px;line-height:1;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);display:grid;place-items:center;padding:0}" +
    "#dm-toggle:hover{filter:brightness(1.1)}@media print{#dm-toggle{display:none}}";
  document.head.appendChild(st);

  var btn = document.createElement("button");
  btn.id = "dm-toggle";
  btn.type = "button";
  document.body.appendChild(btn);

  function apply(t) {
    document.documentElement.dataset.theme = t;
    btn.textContent = t === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19";
    btn.title = btn.ariaLabel =
      t === "dark" ? "Switch to light mode" : "Switch to dark mode";
    try {
      localStorage.setItem(KEY, t);
    } catch (e) {}
    try {
      if (typeof window.theme === "function") window.theme(t);
    } catch (e) {} /* keep the old toggle's icon in sync if it works */
  }

  var saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch (e) {}
  var start =
    saved ||
    (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  apply(start);

  btn.addEventListener("click", function () {
    apply(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
})();
