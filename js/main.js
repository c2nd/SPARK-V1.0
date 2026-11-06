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

/* ---------- Visitor Counter (SiteViews) ---------- */
(function() {
  // إنشاء عنصر العداد
  var counterContainer = document.createElement('span');
  counterContainer.id = 'spark-view-counter';
  counterContainer.style.fontFamily = 'var(--font-mono)';
  counterContainer.style.fontSize = '0.85rem';
  counterContainer.style.color = 'var(--muted)';
  counterContainer.innerHTML = '👁️ Views: <span id="views">Loading...</span>';

  // العثور على التذييل وإضافة العداد بجانب حقوق النشر
  var footerInner = document.querySelector('.footer-inner');
  if (footerInner) {
    // نضعه قبل رابط الخصوصية أو في نهاية التذييل
    footerInner.appendChild(counterContainer);
  }

  // تحميل سكريبت SiteViews
  var script = document.createElement('script');
  script.src = 'https://unpkg.com/siteviews@2.2.1/dist/index.js';
  script.type = 'application/javascript';
  script.setAttribute('scriptfor', 'siteviews');
  script.setAttribute('project-name', 'spark-c2nd'); // معرف فريد لمشروعك
  script.setAttribute('output-element-id', 'views');
  script.setAttribute('refresh', '30'); // تحديث تلقائي كل 30 ثانية (اختياري)
  script.setAttribute('suppressLogs', ''); // إخفاء رسائل الكونسول
  
  document.body.appendChild(script);
})();