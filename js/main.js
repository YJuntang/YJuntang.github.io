/* ============================================================
   KalHuenic.github.io — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ── Dark Mode ────────────────────────────────────────────────

  const html         = document.documentElement;
  const themeToggle  = document.getElementById('theme-toggle');
  const STORAGE_KEY  = 'kh-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    applyTheme(saved || getSystemTheme());
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Sync with system changes (if user hasn't manually set a preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ── Navbar Scroll Effect ─────────────────────────────────────

  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Run on init
  }

  // ── Smooth Scroll with Header Offset ────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const offset     = 72; // navbar height
      const targetTop  = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  // ── Scroll-triggered Animations ──────────────────────────────

  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animatedEls.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for no IntersectionObserver support
    animatedEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
