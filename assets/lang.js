// Shows one language at a time: ?lang=it|en, then the saved choice, then the browser language.
(function () {
  var root = document.documentElement;
  var supported = ["it", "en"];

  function saved() {
    try { return localStorage.getItem("iring-lang"); } catch (e) { return null; }
  }

  function initial() {
    var param = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(param) >= 0) return param;
    var stored = saved();
    if (supported.indexOf(stored) >= 0) return stored;
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return nav === "it" ? "it" : "en";
  }

  function apply(lang) {
    root.classList.remove("js-lang-it", "js-lang-en");
    root.classList.add("js-lang-" + lang);
    root.lang = lang;
    var title = document.querySelector('meta[name="title-' + lang + '"]');
    if (title) document.title = title.content;
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  apply(initial());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.lang);
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.dataset.lang);
        try { localStorage.setItem("iring-lang", b.dataset.lang); } catch (e) {}
      });
    });
  });
})();
