/**
 * NBME Score → Predicted Step 2 CK
 *
 * Two-stage pipeline:
 *   1. CONVERT: raw % correct → 3-digit equivalent (per-form regression)
 *   2. PREDICT: 3-digit equivalent → predicted real Step 2 CK
 *                with form-specific bias correction
 *                + Tackett 2021 days-to-exam decay
 *                + 80% prediction interval
 *
 * SOURCES:
 *   - NBME does NOT publish raw% → 3-digit tables. Per-form regression
 *     coefficients below are community-aggregated (nbmescore.com, yousmle,
 *     ResidencyAdvisor) — treat as priors, not ground truth.
 *   - Form bias offsets reflect documented under/overprediction patterns.
 *   - Tackett formula: Predicted = 292 - (292 - CBSSA) × 0.987527^days_out
 *     (PMC8368818, n=43 train + 37 val, single institution, mean Step 1 ≈ 250)
 *   - Uncertainty bands anchored on NBME's own ±9 point guidance (CCSSA Sample
 *     Report) + Step 2 CK SEM of ~6 pts (USMLE Score Interpretation Guidelines)
 */

export type NbmeForm = 'nbme9' | 'nbme10' | 'nbme11' | 'nbme12' | 'nbme13' | 'nbme14' | 'nbme15' | 'nbme16';

interface FormProfile {
  // Linear conversion: predicted3Digit = intercept − slope × (numWrong)
  // For percent input: numWrong = totalItems × (1 − pct/100)
  totalItems: number;
  intercept: number;
  slope: number;
  // Empirical Step 2 CK bias when this form is the input.
  // Negative = NBME under-predicts (real exam score is higher).
  // Positive = NBME over-predicts.
  cKBias: number;
  // 80% prediction interval half-width, in 3-digit points.
  // Narrower for recent forms (14-16) calibrated to current exam.
  intervalWidth: number;
  // Honest label about each form's relative reliability.
  reliability: 'high' | 'good' | 'fair' | 'lower';
  notes: string;
}

const FORMS: Record<NbmeForm, FormProfile> = {
  // Coefficients aggregated from nbmescore.com + yousmle community data.
  nbme9:  { totalItems: 200, intercept: 298.45, slope: 1.09, cKBias: -10, intervalWidth: 12, reliability: 'lower', notes: 'Older content. Tends to under-predict real Step 2 CK by 8-12 pts.' },
  nbme10: { totalItems: 200, intercept: 300.18, slope: 1.10, cKBias: -8,  intervalWidth: 11, reliability: 'fair',  notes: 'Slight under-prediction (0-5 pts). Acceptable as a checkpoint.' },
  nbme11: { totalItems: 200, intercept: 299.50, slope: 1.09, cKBias: -7,  intervalWidth: 11, reliability: 'fair',  notes: 'Similar profile to NBME 10.' },
  nbme12: { totalItems: 200, intercept: 299.80, slope: 1.10, cKBias: -7,  intervalWidth: 11, reliability: 'fair',  notes: 'Useful for trajectory tracking. Slight under-prediction.' },
  nbme13: { totalItems: 200, intercept: 299.30, slope: 1.08, cKBias: -5,  intervalWidth: 10, reliability: 'good',  notes: 'Reliable predictor. Within ±10 pts of actual for most students.' },
  nbme14: { totalItems: 200, intercept: 299.20, slope: 1.08, cKBias: -3,  intervalWidth: 9,  reliability: 'high',  notes: 'One of the top predictors (co-best with Form 15) for 2025-2026 test-takers. Closely mirrors current Step 2 CK item style.' },
  nbme15: { totalItems: 200, intercept: 299.40, slope: 1.07, cKBias: -3,  intervalWidth: 9,  reliability: 'high',  notes: 'Co-best predictor alongside Form 14. Many programs treat 14-15 as interchangeable. Slight under-prediction (≈3 pts).' },
  nbme16: { totalItems: 200, intercept: 299.50, slope: 1.07, cKBias: -2,  intervalWidth: 9,  reliability: 'high',  notes: 'Newest CCSSA form. Most representative of current Step 2 CK style (longer vignettes, systems-based reasoning).' },
};

export interface NbmeInput {
  form: NbmeForm;
  /** % correct (e.g. 78 means 78%) OR a 3-digit equivalent score (180-300). */
  value: number;
  /** Hint whether the input is a percent or the 3-digit equivalent from your NBME report. */
  inputType: 'percent' | 'threeDigit';
  /** Days until your actual Step 2 CK exam. Optional. Applies Tackett decay. */
  daysUntilExam?: number;
}

export interface NbmePrediction {
  form: NbmeForm;
  // The 3-digit equivalent before any prediction (just a conversion).
  convertedThreeDigit: number;
  // Bias-corrected predicted Step 2 CK score.
  predictedStep2: number;
  // 80% prediction interval (low, high) on the predicted Step 2.
  intervalLow: number;
  intervalHigh: number;
  // Per-form reliability label and human-readable note.
  reliability: FormProfile['reliability'];
  notes: string;
  // Bias direction copy for the result UI.
  biasDirection: 'underPredicts' | 'overPredicts' | 'wellCalibrated';
  biasMagnitude: number;
  // Days-to-exam metadata (for transparency in the UI).
  daysAppliedAdjustment?: number;
  // Methodology summary string (cite or hide).
  methodology: string;
}


/** Linearly convert raw % correct on a given NBME form to a 3-digit equivalent. */
function percentToThreeDigit(form: FormProfile, percentCorrect: number): number {
  const numWrong = form.totalItems * (1 - percentCorrect / 100);
  return form.intercept - form.slope * numWrong;
}


/**
 * Tackett 2021 days-to-exam decay (from PMC8368818):
 *   adjusted = 292 - (292 - baseline) × 0.987527^days_out
 *
 * Caveats: Tackett's coefficient was fit on Step 1 (n=43+37, single institution,
 * mean ~250). We use 292 as the anchor because it's their published value;
 * empirically this works as a soft prior for Step 2 CK as well but with less
 * confidence. The decay only kicks in for days_out > 0.
 */
function applyDaysOutDecay(baseline: number, daysOut: number): number {
  if (daysOut <= 0) return baseline;
  const ANCHOR = 292;
  const DECAY = 0.987527;
  return ANCHOR - (ANCHOR - baseline) * Math.pow(DECAY, daysOut);
}


export function predictNbme(input: NbmeInput): NbmePrediction {
  const form = FORMS[input.form];

  // Step 1: get to a 3-digit equivalent
  const threeDigit = input.inputType === 'percent'
    ? percentToThreeDigit(form, input.value)
    : input.value;

  // Step 2: apply Tackett days-out decay if days were provided
  // The decay tells us the score the student would actually achieve given
  // the gap between practice and real exam.
  const decayed = applyDaysOutDecay(threeDigit, input.daysUntilExam ?? 0);
  const daysAppliedAdjustment = input.daysUntilExam && input.daysUntilExam > 0
    ? Math.round((decayed - threeDigit) * 10) / 10
    : undefined;

  // Step 3: apply form-specific Step 2 CK bias correction
  // (e.g. NBME 9 under-predicts by ~10, so we add 10 to the converted score)
  const predicted = Math.round(decayed - form.cKBias);

  // Clamp to plausible Step 2 CK range
  const clamped = Math.max(196, Math.min(300, predicted));

  // 80% prediction interval
  const intervalLow = Math.max(196, clamped - form.intervalWidth);
  const intervalHigh = Math.min(300, clamped + form.intervalWidth);

  // Bias direction copy
  let biasDirection: NbmePrediction['biasDirection'] = 'wellCalibrated';
  if (form.cKBias <= -5) biasDirection = 'underPredicts';
  else if (form.cKBias >= 5) biasDirection = 'overPredicts';

  return {
    form: input.form,
    convertedThreeDigit: Math.round(threeDigit * 10) / 10,
    predictedStep2: clamped,
    intervalLow,
    intervalHigh,
    reliability: form.reliability,
    notes: form.notes,
    biasDirection,
    biasMagnitude: Math.abs(form.cKBias),
    daysAppliedAdjustment,
    methodology:
      'Conversion via community-aggregated per-form regression coefficients (NBME does not publish official equating). ' +
      'Bias correction from empirical NBME → Step 2 CK studies (Morrison 2010 + community aggregates). ' +
      'Days-to-exam decay via Tackett 2021 (PMC8368818) — applied as a soft prior. ' +
      '80% interval anchored on NBME-published ±9 pt CCSSA uncertainty + Step 2 CK SEM ~6 pts.',
  };
}


/** Form display names — for use in dropdowns / UI. */
export const FORM_DISPLAY: Record<NbmeForm, string> = {
  nbme9:  'NBME 9',
  nbme10: 'NBME 10',
  nbme11: 'NBME 11',
  nbme12: 'NBME 12',
  nbme13: 'NBME 13',
  nbme14: 'NBME 14',
  nbme15: 'NBME 15',
  nbme16: 'NBME 16',
};

export const FORM_KEYS: NbmeForm[] = ['nbme9', 'nbme10', 'nbme11', 'nbme12', 'nbme13', 'nbme14', 'nbme15', 'nbme16'];

/**
 * USMLE Step 2 CK passing standard.
 * Effective July 1, 2025, the USMLE Management Committee raised the passing
 * standard from 214 to 218. Earlier reports may still reference 214.
 */
export const STEP2_CK_PASSING_STANDARD = 218;
