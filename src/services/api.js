/**
 * USMLEPredictor API Layer — CLIENT-SIDE ONLY
 * All prediction runs in the browser. No backend server needed.
 * Analytics tracked via Google Analytics 4 (gtag).
 */

import { predictScore, getDatasetStats } from './scorePredictor';

// ── Local analytics storage (persists in localStorage) ──
const ANALYTICS_KEY = '_up_analytics';
const PREDICTIONS_KEY = '_up_predictions';
const SUBMISSIONS_KEY = '_up_submissions';
const VISITORS_KEY = '_up_visitors';

// ── IP / Geo lookup (cached per session) ──
let _visitorInfo = null;
let _ipFetchPromise = null;

function fetchVisitorInfo() {
  if (_visitorInfo) return Promise.resolve(_visitorInfo);
  if (_ipFetchPromise) return _ipFetchPromise;
  _ipFetchPromise = fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(data => {
      _visitorInfo = {
        ip: data.ip || 'unknown',
        city: data.city || '',
        region: data.region || '',
        country: data.country_name || data.country || '',
        org: data.org || '',
        timezone: data.timezone || '',
      };
      // Log unique visitor
      const visitors = getStoredArray(VISITORS_KEY);
      const isDuplicate = visitors.some(v => v.ip === _visitorInfo.ip &&
        v.t?.startsWith(new Date().toISOString().split('T')[0]));
      if (!isDuplicate) {
        appendToStore(VISITORS_KEY, {
          ..._visitorInfo,
          t: new Date().toISOString(),
          ua: navigator.userAgent?.substring(0, 200) || '',
          ref: document.referrer?.substring(0, 200) || '',
          lang: navigator.language || '',
          screen: `${screen.width}x${screen.height}`,
        }, 1000);
      }
      return _visitorInfo;
    })
    .catch(() => {
      _visitorInfo = { ip: 'unknown', city: '', region: '', country: '', org: '', timezone: '' };
      return _visitorInfo;
    });
  return _ipFetchPromise;
}

// Fire IP lookup on load
if (typeof window !== 'undefined') {
  fetchVisitorInfo();
}

function getStoredArray(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}

function appendToStore(key, entry, maxItems = 500) {
  const arr = getStoredArray(key);
  arr.push(entry);
  if (arr.length > maxItems) arr.splice(0, arr.length - maxItems);
  try { localStorage.setItem(key, JSON.stringify(arr)); } catch { /* quota */ }
}

// ── GA4 gtag integration ──

function gtagEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// ── Prediction API (runs locally in the browser) ──

export const predictAPI = {
  predict: (scores) => {
    return new Promise((resolve, reject) => {
      try {
        const start = performance.now();
        const result = predictScore(scores);
        const duration = Math.round(performance.now() - start);

        if (result.error) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ response: { data: { error: result.error } } });
        } else {
          // Log prediction locally (with IP if available)
          const predEntry = {
            t: new Date().toISOString(),
            p: result.predictedScore,
            ci: `${result.lowEstimate}-${result.highEstimate}`,
            conf: result.confidence,
            inputs: Object.keys(scores).length,
            ms: duration,
          };
          if (_visitorInfo) {
            predEntry.ip = _visitorInfo.ip;
            predEntry.loc = _visitorInfo.city ? `${_visitorInfo.city}, ${_visitorInfo.country}` : _visitorInfo.country;
          }
          appendToStore(PREDICTIONS_KEY, predEntry);

          // Track in GA4
          gtagEvent('prediction_complete', {
            predicted_score: result.predictedScore,
            confidence: result.confidence,
            input_count: Object.keys(scores).length,
            duration_ms: duration,
          });

          resolve({ data: result });
        }
      } catch (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ response: { data: { error: 'Prediction failed. Please try again.' } } });
      }
    });
  },

  stats: () => {
    return Promise.resolve({ data: getDatasetStats() });
  },
};

// ── Analytics tracking (GA4 + localStorage) ──

export async function trackEvent(event, data = {}) {
  // Push to GA4
  gtagEvent(event, data);

  // Store locally for admin dashboard (with IP if available)
  const entry = {
    e: event,
    d: data,
    t: new Date().toISOString(),
  };
  if (_visitorInfo) entry.ip = _visitorInfo.ip;
  appendToStore(ANALYTICS_KEY, entry);
}

export async function submitScore(scoreData) {
  // Store submission locally
  appendToStore(SUBMISSIONS_KEY, {
    ...scoreData,
    t: new Date().toISOString(),
  });

  // Track in GA4
  gtagEvent('score_submitted', {
    actual_score: scoreData.actualScore,
    status: scoreData.status,
  });

  return Promise.resolve({
    data: {
      ok: true,
      message: 'Thank you! Your score helps improve predictions for future students.',
    },
  });
}

// ── Admin helpers (used by AdminDashboard component) ──

export function getLocalAnalytics() {
  return {
    events: getStoredArray(ANALYTICS_KEY),
    predictions: getStoredArray(PREDICTIONS_KEY),
    submissions: getStoredArray(SUBMISSIONS_KEY),
    visitors: getStoredArray(VISITORS_KEY),
  };
}

export function clearLocalAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
  localStorage.removeItem(PREDICTIONS_KEY);
  localStorage.removeItem(SUBMISSIONS_KEY);
  localStorage.removeItem(VISITORS_KEY);
}

export default { predictAPI, trackEvent, submitScore };
