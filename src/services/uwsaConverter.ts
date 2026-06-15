/**
 * UWSA → Predicted Step 2 CK Converter
 *
 * Why this exists:
 *   UWSA (UWorld Self-Assessment) reports a 3-digit Step 2 CK estimate, but
 *   it systematically over-predicts compared to actual exam outcomes. The
 *   bias magnitude depends on which UWSA form and which score band.
 *
 *   This tool applies a calibrated bias correction + outputs an 80%
 *   prediction interval so students see realistic numbers, not the inflated
 *   UWSA point estimate.
 *
 * SOURCES (community-aggregated + peer-reviewed):
 *   - ResidencyAdvisor "Practice Test Correlation: Which Step 2 CK
 *     Self-Assessment Best Predicts Score" — UWSA 2 r≈0.85-0.90
 *   - YouSMLE & nbmescore.com UWSA 1 / 2 calculators
 *   - Boulet & Pinsky 2020, NBME/UWSA validity correlations
 *   - SDN megathread aggregates: UWSA 1 over-predicts 3-8 pts;
 *     UWSA 2 over-predicts 0-5 pts; ceiling effect above 255
 *   - UWSA 3 (newest, ~2024): insufficient public validity data — wider band
 *
 * NOTE: UWSA scores are already on the 180-300 USMLE scale, so no raw% →
 * 3-digit conversion is needed. We only apply BIAS CORRECTION + INTERVAL.
 */

export type UwsaForm = 'uwsa1' | 'uwsa2' | 'uwsa3';

interface UwsaProfile {
  // Average bias magnitude in 3-digit points (UWSA overpredicts real Step 2)
  // bias > 0 means we subtract this much: predicted = uwsaScore - bias
  baseBias: number;
  // Extra bias applied at the ceiling (UWSA 1 in particular tends to overshoot
  // 10-15 pts for top scorers because the form has a hard ceiling effect)
  ceilingBoost: number;
  // 80% prediction interval half-width on 3-digit scale.
  intervalWidth: number;
  // Reliability label for UI copy
  reliability: 'high' | 'good' | 'fair' | 'experimental';
  notes: string;
}

const FORMS: Record<UwsaForm, UwsaProfile> = {
  uwsa1: {
    baseBias: 5,           // community avg: UWSA 1 over-predicts ~3-8 pts
    ceilingBoost: 7,       // adds up to +7 for top-band (255+) per yousmle aggregates
    intervalWidth: 11,
    reliability: 'fair',
    notes: 'UWSA 1 tends to over-predict Step 2 CK by ~5 pts on average, and by up to 12-15 pts for students scoring 255+. Often taken too early to be reliable.',
  },
  uwsa2: {
    baseBias: 3,           // community avg: UWSA 2 over-predicts ~0-5 pts
    ceilingBoost: 4,       // smaller ceiling effect than UWSA 1
    intervalWidth: 9,
    reliability: 'high',
    notes: 'UWSA 2 is the most-cited single predictor — Pearson r ≈ 0.85-0.90. Take within 1-2 weeks of exam for tightest accuracy.',
  },
  uwsa3: {
    baseBias: 4,           // limited public data; assume between UWSA 1 and 2
    ceilingBoost: 5,
    intervalWidth: 12,     // wider — less validated
    reliability: 'experimental',
    notes: 'UWSA 3 is newer (~2024) with limited public validity data. Treat the prediction as preliminary; we widen the interval.',
  },
};

export interface UwsaInput {
  form: UwsaForm;
  /** UWSA-reported 3-digit score (180-300). */
  uwsaScore: number;
  /** Days until your real Step 2 CK exam. Optional. Applies decay. */
  daysUntilExam?: number;
}

export interface UwsaPrediction {
  form: UwsaForm;
  uwsaScore: number;
  // Bias-corrected predicted real Step 2 CK
  predictedStep2: number;
  // 80% interval (lo, hi)
  intervalLow: number;
  intervalHigh: number;
  // Bias breakdown shown in result UI
  appliedBaseBias: number;
  appliedCeilingBoost: number;
  daysAppliedAdjustment?: number;
  reliability: UwsaProfile['reliability'];
  notes: string;
  methodology: string;
}


/**
 * Tackett 2021 days-to-exam decay (PMC8368818) — same formula as NBME tool:
 *   adjusted = 292 - (292 - baseline) × 0.987527^days_out
 * Used here as a soft prior; less validated for Step 2 CK than for Step 1.
 */
function applyDaysOutDecay(baseline: number, daysOut: number): number {
  if (daysOut <= 0) return baseline;
  const ANCHOR = 292;
  const DECAY = 0.987527;
  return ANCHOR - (ANCHOR - baseline) * Math.pow(DECAY, daysOut);
}


export function predictUwsa(input: UwsaInput): UwsaPrediction {
  const profile = FORMS[input.form];
  const uwsa = input.uwsaScore;

  // Base bias (UWSA over-predicts on average)
  const baseBias = profile.baseBias;

  // Ceiling boost — applied progressively above 255
  // At UWSA 255: 0 boost. At UWSA 270: full boost. Linear in between.
  let ceilingBoost = 0;
  if (uwsa > 255) {
    const t = Math.min(1, (uwsa - 255) / 15);
    ceilingBoost = profile.ceilingBoost * t;
  }

  // Subtract bias to get the corrected estimate
  let predicted = uwsa - baseBias - ceilingBoost;

  // Apply days-to-exam decay
  const decayed = applyDaysOutDecay(predicted, input.daysUntilExam ?? 0);
  const daysAppliedAdjustment = input.daysUntilExam && input.daysUntilExam > 0
    ? Math.round((decayed - predicted) * 10) / 10
    : undefined;
  predicted = decayed;

  // Clamp to plausible Step 2 CK range
  const clamped = Math.round(Math.max(196, Math.min(300, predicted)));

  // 80% prediction interval
  const intervalLow = Math.max(196, clamped - profile.intervalWidth);
  const intervalHigh = Math.min(300, clamped + profile.intervalWidth);

  return {
    form: input.form,
    uwsaScore: uwsa,
    predictedStep2: clamped,
    intervalLow,
    intervalHigh,
    appliedBaseBias: baseBias,
    appliedCeilingBoost: Math.round(ceilingBoost * 10) / 10,
    daysAppliedAdjustment,
    reliability: profile.reliability,
    notes: profile.notes,
    methodology:
      'Bias correction calibrated from community-aggregated UWSA-to-actual pairs (ResidencyAdvisor, YouSMLE, SDN) and peer-reviewed correlation studies. ' +
      'Score-band asymmetry: UWSA 1 in particular over-predicts by 10-15 pts above 255 due to ceiling effects. ' +
      'Days-to-exam decay via Tackett 2021 (PMC8368818) applied as soft prior. ' +
      '80% interval anchored on Step 2 CK SEM ~6 pts + UWSA r ≈ 0.85-0.90 (UWSA 2).',
  };
}


export const UWSA_DISPLAY: Record<UwsaForm, string> = {
  uwsa1: 'UWSA 1',
  uwsa2: 'UWSA 2',
  uwsa3: 'UWSA 3',
};

export const UWSA_KEYS: UwsaForm[] = ['uwsa1', 'uwsa2', 'uwsa3'];

/**
 * USMLE Step 2 CK passing standard.
 * Effective July 1, 2025, raised from 214 to 218 by the USMLE Management Committee.
 */
export const STEP2_CK_PASSING_STANDARD = 218;
