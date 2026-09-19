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
