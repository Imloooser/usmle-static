/**
 * USMLEPredictor API Layer — CLIENT-SIDE ONLY
 * All prediction runs in the browser. No backend server needed.
 * Telemetry flows to Umami (custom events) and Microsoft Clarity (session recording).
 */

import { predictScore, getDatasetStats } from './scorePredictor';

type EventData = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: EventData) => void;
    };
  }
}

// Fires a Umami custom event. Queues briefly if the script hasn't loaded yet
// (it's loaded with strategy="afterInteractive" in layout.tsx).
function track(event: string, data: EventData = {}) {
  if (typeof window === 'undefined') return;
  const fire = () => {
    try {
      window.umami?.track(event, data);
    } catch {
      /* swallow — telemetry must never break the app */
    }
  };
  if (window.umami) {
    fire();
  } else {
    // Single retry after the Umami script has had a chance to attach.
    setTimeout(fire, 500);
  }
}

// ── Prediction API (runs locally in the browser) ──

export const predictAPI = {
  predict: async (scores: Record<string, number>) => {
    try {
      const start = performance.now();
      const result = await predictScore(scores);
      const duration = Math.round(performance.now() - start);

      if ((result as any).error) {
        throw { response: { data: { error: (result as any).error } } };
      }

      const r = result as any;
      track('prediction', {
        predicted: r.predictedScore,
        confidence: r.confidence,
        ciLow: r.lowEstimate,
        ciHigh: r.highEstimate,
        inputCount: Object.keys(scores).length,
        durationMs: duration,
        ...scores,
      });

      return { data: result };
    } catch (err: any) {
      if (err?.response) throw err;
      console.error('Prediction Error:', err);
      throw { response: { data: { error: 'Prediction failed. Please try again.' } } };
    }
  },

  stats: async () => {
    return { data: await getDatasetStats() };
  },
};

// ── Generic event tracking ──

export async function trackEvent(event: string, data: EventData = {}) {
  track(event, data);
}

// ── Score submissions (when users share their real Step 2 CK score) ──

export async function submitScore(scoreData: any) {
  track('score_submission', {
    actualScore: scoreData.actualScore,
    status: scoreData.status,
    weeksPrepared: scoreData.weeksPrepared,
  });

  return {
    data: {
      ok: true,
      message: 'Thank you! Your score helps improve predictions for future students.',
    },
  };
}
