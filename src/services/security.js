/**
 * USMLEPredictor Security Module
 * Anti-tampering, anti-debugging, and integrity protection.
 * This runs on app init to harden the client-side environment.
 */

// ── Console Warning ──
const CONSOLE_STYLE = 'font-size:18px;font-weight:bold;color:#f87171;';
const CONSOLE_STYLE2 = 'font-size:14px;color:#94a3b8;';

export function initSecurity() {
  // 1. Console warning
  if (typeof console !== 'undefined') {
    console.log(
      '%c⚠️ STOP!',
      CONSOLE_STYLE
    );
    console.log(
      '%cThis browser feature is intended for developers. If someone told you to copy-paste something here, it\'s a scam. Pasting anything here could give attackers access to your data.',
      CONSOLE_STYLE2
    );
    console.log(
      '%cUSMLEPredictor.com — Protected by integrity verification.',
      'font-size:12px;color:#6366f1;'
    );
  }

  // 2. Disable right-click context menu on the app
  document.addEventListener('contextmenu', (e) => {
    if (!e.target.closest('input, textarea, select')) {
      e.preventDefault();
    }
  });

  // 3. Disable common keyboard shortcuts for DevTools / View Source
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') { e.preventDefault(); return false; }
    // Ctrl+Shift+I/J/C (DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) {
      e.preventDefault(); return false;
    }
    // Ctrl+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U') && !e.shiftKey) {
      e.preventDefault(); return false;
    }
  });

  // 4. Disable drag on content
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  // 5. CSS protection — disable text selection on protected elements
  const style = document.createElement('style');
  style.textContent = `
    .score-results, .result-card, .stepscore-footer {
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
    .score-form input, .score-form select, .modal-content input, .modal-content select {
      -webkit-user-select: auto;
      -moz-user-select: auto;
      user-select: auto;
    }
  `;
  document.head.appendChild(style);

  // 6. Periodic integrity check on critical functions
  setupIntegrityCheck();
}

// ── Integrity verification ──
// Checks that critical prediction functions haven't been tampered with
function setupIntegrityCheck() {
  // Store references to critical functions at init time
  let _predictScore = null;
  let _getDatasetStats = null;

  import('./scorePredictor').then(mod => {
    _predictScore = mod.predictScore;
    _getDatasetStats = mod.getDatasetStats;
  }).catch(() => {});

  setInterval(() => {
    try {
      if (_predictScore && typeof _predictScore !== 'function') {
        document.body.innerHTML = '<div style="padding:40px;text-align:center;color:#f87171;font-family:system-ui"><h1>Integrity Error</h1><p>Application integrity check failed. Please reload the page.</p></div>';
      }
      if (_getDatasetStats && typeof _getDatasetStats !== 'function') {
        document.body.innerHTML = '<div style="padding:40px;text-align:center;color:#f87171;font-family:system-ui"><h1>Integrity Error</h1><p>Application integrity check failed. Please reload the page.</p></div>';
      }
    } catch {
      // skip
    }
  }, 30000);
}

// ── Anti-tampering for fetch/XMLHttpRequest ──
export function protectNetwork() {
  // Monitor for unauthorized network requests
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
    // Allow only trusted domains
    const trusted = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'analytics.google.com',
      'ipapi.co',
    ];
    if (url.startsWith('http') && !trusted.some(d => url.includes(d))) {
      console.warn('[Security] Blocked unauthorized fetch:', url);
      return Promise.reject(new Error('Blocked'));
    }
    return originalFetch.apply(this, args);
  };
}

export default { initSecurity, protectNetwork };
