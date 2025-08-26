export function buildSrcDoc(html: string, code: string) {
    const safeHTML = html || '<div id="app" class="p-6 rounded-xl border border-white/10">Hello GSAP</div>';
    const userJS =
        code ||
        `const app = document.querySelector('#app');
gsap.from(app, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });`;

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style>
    html,body{margin:0;padding:0;background:#0b0b0f;color:#fff;font:14px system-ui}
    /* базовый фоллбек, если CDN Tailwind не загрузится */
    .grid{display:grid}
  </style>
  <!-- Tailwind (для классов из htmlgen) -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${safeHTML}
  <!-- GSAP + плагины -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js"></script>
  <script>
    (function(){
      try {
        var gsapRef = window.gsap;
        if (window.ScrollTrigger) gsapRef.registerPlugin(window.ScrollTrigger);
        if (window.Flip) gsapRef.registerPlugin(window.Flip);

        // исполняем пользовательский JS как обычный скрипт (без import)
        var module = { exports: {} };
        var exports = module.exports;
        var fn = new Function('gsap','module','exports', ${JSON.stringify(userJS)});
        fn(gsapRef, module, exports);
      } catch(e) { console.error(e); }
    })();
  </script>
</body>
</html>`;
}
