/**
 * USMLEPredictor API Layer — CLIENT-SIDE ONLY
 * All prediction runs in the browser. No backend server needed.
 * Analytics tracked locally in localStorage.
 */

import { predictScore, getDatasetStats } from './scorePredictor';

// ── Local analytics storage (persists in localStorage) ──
const ANALYTICS_KEY = '_up_analytics';
const PREDICTIONS_KEY = '_up_predictions';
const SUBMISSIONS_KEY = '_up_submissions';
const VISITORS_KEY = '_up_visitors';

// ── IP / Geo lookup (cached per session) ──
let _visitorInfo: any = null;
let _ipFetchPromise: Promise<any> | null = null;

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
      const isDuplicate = visitors.some((v: any) => v.ip === _visitorInfo.ip &&
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

function getStoredArray(key: string): any[] {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}

function appendToStore(key: string, entry: any, maxItems = 500) {
  const arr = getStoredArray(key);
  arr.push(entry);
  if (arr.length > maxItems) arr.splice(0, arr.length - maxItems);
  try { localStorage.setItem(key, JSON.stringify(arr)); } catch { /* quota */ }
}

// ── Prediction API (runs locally in the browser) ──

export const predictAPI = {
  predict: async (scores: Record<string, number>) => {
    try {
      const start = performance.now();
      const result = predictScore(scores);
      const duration = Math.round(performance.now() - start);

      if ((result as any).error) {
        throw { response: { data: { error: (result as any).error } } };
      }

      // Log prediction locally (with IP if available)
      const predEntry: any = {
        t: new Date().toISOString(),
        p: (result as any).predictedScore,
        ci: `${(result as any).lowEstimate}-${(result as any).highEstimate}`,
        conf: (result as any).confidence,
        inputs: Object.keys(scores).length,
        ms: duration,
      };
      if (_visitorInfo) {
        predEntry.ip = _visitorInfo.ip;
        predEntry.loc = _visitorInfo.city ? `${_visitorInfo.city}, ${_visitorInfo.country}` : _visitorInfo.country;
      }
      appendToStore(PREDICTIONS_KEY, predEntry);

      return { data: result };
    } catch (err: any) {
      if (err?.response) throw err;
      console.error('Prediction Error:', err);
      throw { response: { data: { error: 'Prediction failed. Please try again.' } } };
    }
  },

  stats: async () => {
    return { data: getDatasetStats() };
  },
};

// ── Analytics tracking (localStorage) ──

export async function trackEvent(event: string, data: any = {}) {
  const entry: any = {
    e: event,
    d: data,
    t: new Date().toISOString(),
  };
  if (_visitorInfo) entry.ip = _visitorInfo.ip;
  appendToStore(ANALYTICS_KEY, entry);
}

export async function submitScore(scoreData: any) {
  appendToStore(SUBMISSIONS_KEY, {
    ...scoreData,
    t: new Date().toISOString(),
  });

  return {
    data: {
      ok: true,
      message: 'Thank you! Your score helps improve predictions for future students.',
    },
  };
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
