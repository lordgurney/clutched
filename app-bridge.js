/**
 * ClutchEd <-> Clutch App Seamless Booking Bridge
 * Routes marketing website traffic directly into the Clutch App school portal (/s/clutched).
 */
(function () {
  // Configuration: Default local dev port 8080 or production platform domain
  const DEFAULT_CONFIG = {
    // In production, points to the live Clutch platform at https://clutchit.au
    // In local development, it points to the Flutter web dev server
    appBaseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:8080'
      : 'https://clutchit.au',
    schoolSlug: 'clutched',
  };

  const config = Object.assign({}, DEFAULT_CONFIG, window.CLUTCH_CONFIG || {});

  function getBookingUrl(params = {}) {
    const base = config.appBaseUrl.replace(/\/+$/, '');
    const url = new URL(`${base}/#/s/${config.schoolSlug}`);
    Object.keys(params).forEach(k => url.searchParams.set(k, params[k]));
    return url.toString();
  }

  function initBridge() {
    const buttons = document.querySelectorAll('.clutch-booking-btn');
    const targetUrl = getBookingUrl();

    buttons.forEach(btn => {
      btn.setAttribute('href', targetUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');

      btn.addEventListener('click', function (e) {
        console.log(`[ClutchBridge] Directing student to Clutch booking app: ${targetUrl}`);
      });
    });

    // Region Filter Tabs
    const filterTabs = document.querySelectorAll('.region-filter-btn');
    const cards = document.querySelectorAll('.region-card');

    filterTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const target = this.getAttribute('data-target');

        filterTabs.forEach(t => {
          t.classList.remove('active', 'bg-gold', 'text-black', 'shadow-lg', 'shadow-gold/20');
          t.classList.add('bg-white/5', 'text-slate-300', 'hover:bg-white/10', 'border', 'border-white/10');
        });

        this.classList.add('active', 'bg-gold', 'text-black', 'shadow-lg', 'shadow-gold/20');
        this.classList.remove('bg-white/5', 'text-slate-300', 'hover:bg-white/10');

        const grid = document.getElementById('regions-grid');
        if (grid) {
          if (target === 'all') {
            grid.classList.remove('md:grid-cols-1', 'max-w-2xl', 'mx-auto');
            grid.classList.add('md:grid-cols-3');
          } else {
            grid.classList.remove('md:grid-cols-3');
            grid.classList.add('md:grid-cols-1', 'max-w-2xl', 'mx-auto');
          }
        }

        cards.forEach(card => {
          const region = card.getAttribute('data-region');
          if (target === 'all' || region === target) {
            card.style.display = 'flex';
            card.classList.add('animate-fadeIn');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
      });

      // Automatically close menu when any anchor is clicked
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBridge);
  } else {
    initBridge();
  }

  window.ClutchBridge = {
    config,
    getBookingUrl,
  };
})();
