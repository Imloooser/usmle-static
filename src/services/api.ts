/**
 * API service for USMLE Predictor
 * Provides data-driven calculations for Step 2 CK
 */

import { predictScore, getDatasetStats } from './scorePredictor';

export const trackEvent = (event: string, data?: any) => {
  console.log(`[Analytics] ${event}`, data);
};

export const submitScore = async (data: any) => {
  console.log('[API] Submit Score:', data);
  // Store locally as fallback
  if (typeof window !== 'undefined') {
    const key = '_up_submissions';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ ...data, t: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing.slice(-100)));
  }
  return new Promise((resolve) => setTimeout(resolve, 800));
};

export const predictAPI = {
  stats: async () => {
    return { data: getDatasetStats() };
  },

  predict: async (scores: Record<string, number>) => {
    // Simulate slight API delay for UI feel
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const result = predictScore(scores);
      if ((result as any).error) {
        throw { response: { data: { error: (result as any).error } } };
      }
      return { data: result };
    } catch (err) {
      console.error('Prediction Error:', err);
      throw { response: { data: { error: 'Prediction failed. Please try again.' } } };
    }
  },
};
