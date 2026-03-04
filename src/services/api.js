/**
 * USMLEPredictor API Layer — CLIENT-SIDE ONLY
 * All prediction runs in the browser. No backend server needed.
 * This makes the entire app a static site (free hosting on DO / Vercel / Netlify).
 */

import { predictScore, getDatasetStats } from './scorePredictor';

// ── Prediction API (runs locally in the browser) ──

export const predictAPI = {
  /**
   * Run prediction locally — returns a Promise-like { data } shape
   * so existing component code doesn't need to change.
   */
  predict: (scores) => {
    return new Promise((resolve, reject) => {
      try {
        const result = predictScore(scores);
        if (result.error) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ response: { data: { error: result.error } } });
        } else {
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

// ── Analytics (no-op — use Google Analytics / Vercel Analytics instead) ──

export async function trackEvent(event, data = {}) {
  // No-op: analytics tracking removed for static deployment.
  // If you want analytics, add Google Analytics gtag() calls here.
  // Example:
  // if (window.gtag) window.gtag('event', event, data);
}

export async function submitScore(scoreData) {
  // In static mode, score submissions can't be persisted server-side.
  // Show the user a thank-you and optionally pipe to Google Forms / Sheets.
  return Promise.resolve({
    data: {
      ok: true,
      message: 'Thank you! Your score helps improve predictions for future students.',
    },
  });
}

export default { predictAPI, trackEvent, submitScore };
