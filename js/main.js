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

/* ---------- Reading Progress Bar ---------- */
(function() {
  // إنشاء العنصر الخاص بالشريط
  var progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  document.body.appendChild(progressBar);

  // دالة حساب نسبة التمرير
  var updateProgress = function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // حساب النسبة المئوية مع تجنب القسمة على صفر
    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // تحديث عرض الشريط
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
  };

  // الاستماع لحدث التمرير وتغيير حجم الشاشة
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
})();















/* ---------- Command Palette Search ---------- */
(function() {
  // 1. فهرس الصفحات (أضف أي صفحة جديدة هنا مستقبلاً)
// 1. فهرس الصفحات (أضف أي صفحة جديدة هنا مستقبلاً)
const searchIndex = [
  { title: "Home", url: "./", type: "Page" },
  { title: "Posts Feed", url: "posts.html", type: "Page" },
  { title: "Threat Intel Dashboard", url: "threat-intel.html", type: "Dashboard" },
  { title: "Hacker Timeline", url: "timeline.html", type: "Page" },
  { title: "Hash Generator Tool", url: "tools/hash-generator.html", type: "Tool" },
  { title: "c0mrade: The NASA Hacker", url: "c0mrade.html", type: "Article" },
  { title: "The $6.34B Binance Hack", url: "article.html", type: "Article" },
  { title: "About SPARK", url: "./#about", type: "Page" },
  { title: "Privacy Policy", url: "privacy.html", type: "Page" }
];




  // 2. إنشاء واجهة البحث (HTML)
  const overlay = document.createElement('div');
  overlay.id = 'command-palette-overlay';
  
  overlay.innerHTML = `
    <div id="command-palette">
      <div class="cp-input-wrapper">
        <span class="cp-icon">></span>
        <input type="text" id="cp-input" placeholder="Search articles, tools, pages..." autocomplete="off" spellcheck="false">
        <span class="cp-shortcut">ESC</span>
      </div>
      <ul id="cp-results"></ul>
    </div>
  `;
  document.body.appendChild(overlay);

  // 3. إضافة زر البحث في الهيدر
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    const searchBtn = document.createElement('button');
    searchBtn.className = 'icon-btn';
    searchBtn.type = 'button';
    searchBtn.setAttribute('aria-label', 'Search');
    searchBtn.innerHTML = `<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;
    searchBtn.addEventListener('click', openPalette);
    // نضعه قبل زر الوضع الليلي
    headerActions.insertBefore(searchBtn, headerActions.firstChild);
  }

  // 4. المتغيرات والوظائف
  const input = document.getElementById('cp-input');
  const resultsContainer = document.getElementById('cp-results');
  let selectedIndex = 0;
  let filteredItems = [...searchIndex];

  function openPalette() {
    overlay.style.display = 'flex';
    input.value = '';
    filterResults('');
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden'; // منع التمرير
  }

  function closePalette() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  function filterResults(query) {
    query = query.toLowerCase();
    filteredItems = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderResults();
  }

  function renderResults() {
    resultsContainer.innerHTML = '';
    if (filteredItems.length === 0) {
      resultsContainer.innerHTML = '<li class="cp-empty">No results found.</li>';
      return;
    }

    filteredItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `cp-item ${index === selectedIndex ? 'active' : ''}`;
      li.innerHTML = `
        <div class="cp-item-title">${item.title}</div>
        <div class="cp-item-type">${item.type}</div>
      `;
      
      li.addEventListener('mouseenter', () => {
        selectedIndex = index;
        renderResults();
      });
      
      li.addEventListener('click', () => {
        window.location.href = item.url;
      });

      resultsContainer.appendChild(li);
    });

    // تمرير العنصر النشط إلى منطقة العرض
    const activeItem = resultsContainer.querySelector('.active');
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  }

  // 5. مستمعي الأحداث (لوحة المفاتيح)
  document.addEventListener('keydown', (e) => {
    // فتح النافذة بـ Ctrl+K أو Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      overlay.style.display === 'flex' ? closePalette() : openPalette();
    }

    if (overlay.style.display === 'flex') {
      if (e.key === 'Escape') {
        closePalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredItems.length;
        renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
        renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          window.location.href = filteredItems[selectedIndex].url;
        }
      }
    }
  });

  // إغلاق عند النقر خارج النافذة
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });

  input.addEventListener('input', (e) => {
    filterResults(e.target.value);
  });
})();





    /* ---------- Terminal Back to Top Button ---------- */
(function() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '<span class="mono">[ cd .. ]</span>';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();