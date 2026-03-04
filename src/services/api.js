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
          // Log prediction locally
          appendToStore(PREDICTIONS_KEY, {
            t: new Date().toISOString(),
            p: result.predictedScore,
            ci: `${result.lowEstimate}-${result.highEstimate}`,
            conf: result.confidence,
            inputs: Object.keys(scores).length,
            ms: duration,
          });

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

  // Store locally for admin dashboard
  appendToStore(ANALYTICS_KEY, {
    e: event,
    d: data,
    t: new Date().toISOString(),
  });
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
  };
}

export function clearLocalAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
  localStorage.removeItem(PREDICTIONS_KEY);
  localStorage.removeItem(SUBMISSIONS_KEY);
}

export default { predictAPI, trackEvent, submitScore };
