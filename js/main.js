(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var themeBtn = document.querySelector('[data-theme-toggle]');

  function updateThemeBtn(theme) {
    if (!themeBtn) return;
    themeBtn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  updateThemeBtn(root.getAttribute('data-theme'));

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      updateThemeBtn(next);
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-nav]');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();



/* ---------- Visitor Counter (Professional Card) ---------- */
(function() {
  var footer = document.querySelector('.site-footer');
  if (!footer) return;

  // 1. إنشاء بطاقة العداد
  var counterCard = document.createElement('div');
  counterCard.className = 'view-counter-card';

  // 2. تصميم محتوى البطاقة (يمكنك تغيير NETWORK_PINGS لاحقاً)
  counterCard.innerHTML = `
    <span class="counter-label">[ NETWORK_PINGS ]</span>
    <span class="counter-number" id="views">...</span>
  `;

  // 3. إدراج البطاقة في منتصف التذييل (قبل الروابط)
  var footerInner = footer.querySelector('.footer-inner');
  if (footerInner) {
    footer.insertBefore(counterCard, footerInner);
  } else {
    footer.appendChild(counterCard);
  }

  // 4. تحميل سكريبت العداد
  var script = document.createElement('script');
  script.src = 'https://unpkg.com/siteviews@2.2.1/dist/index.js';
  script.type = 'application/javascript';
  script.setAttribute('scriptfor', 'siteviews');
  script.setAttribute('project-name', 'spark-c2nd');
  script.setAttribute('output-element-id', 'views');
  script.setAttribute('refresh', '30');
  script.setAttribute('suppressLogs', '');
  document.body.appendChild(script);
})();