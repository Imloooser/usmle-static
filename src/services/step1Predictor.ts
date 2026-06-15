/**
 * USMLE Step 1 Pass/Fail Predictor — NBME-table-anchored version
 *
 * Step 1 has been Pass/Fail since January 2022. The single best predictor
 * of pass/fail outcome is the NBME's officially published pass-probability
 * table (calibrated on the full examinee population, ~100,000 test-takers/yr).
 *
 * This module does NOT train a model on user-submitted data. Instead it:
 *   1. Looks up pass probability from the NBME July 2024 table
 *   2. Classifies into one of 4 readiness tiers
 *   3. Optionally downgrades the tier if Free 120 / UWorld are sharply lower
 *   4. Tailors advice text to the user's cohort (US-MD / US-DO / IMG)
 *
 * Inputs: NBME forms 29-33 (any subset), Free 120 %, UWorld %, status.
 * Older NBME forms (25-28) and AMBOSS SA / CBSE are intentionally NOT
 * accepted — they have different calibration.
 *
 * Sources:
 *   - NBME July 2024 CBSSA + CBSE Score Interpretation Guidance
 *     (https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf)
 *   - IAMSE 2024 (CBSE ≥ 53 → 96.4% pass; n=172)
 *   - FSMB 2024 Annual USMLE Performance Data (cohort first-attempt pass rates)
 *   - Internal validation on 586 verified self-reported outcomes
 */

export type Tier = 'Very Safe' | 'Safe' | 'Likely Pass' | 'Borderline' | 'High Risk';

export interface Step1Input {
  // NBME CBSSA equated percent correct (EPC) per form. New forms only (29-33).
  nbme29?: number;
  nbme30?: number;
  nbme31?: number;
  nbme32?: number;
  nbme33?: number;
  // Optional corroborators (% correct)
  free120?: number;
  uworld?: number;
  // Cohort — affects advice tone, not the score
  status?: 'US-MD' | 'US-DO' | 'IMG';
}

export interface Step1Prediction {
  // Core
  pPass: number;          // 0-1
  pPassPct: number;       // 0-100
  lowerPct: number;       // CI lower bound (advisory, not statistical)
  upperPct: number;
  tier: Tier;
  // Cards / lists
  signals: string[];      // 1-line bullets of inputs used
  warnings: string[];     // downgrades + caveats
  inputBreakdown: Array<{ label: string; value: string; weight: number; pComponent: number }>;
  cohortComparison: Array<{ label: string; pct: number; isYou?: boolean }>;
  epcCurve: { points: Array<{ epc: number; p: number }>; yourEpc: number | null };
  similarStudents: Array<{ epc?: number; uworld?: number; free120?: number; status: string; outcome: 'pass' | 'fail' }>;
  insights: Array<{ type: 'positive' | 'warning' | 'info' | 'neutral'; text: string }>;
  // Meta
  effectiveEpc: number | null;
  dataPoints: number;     // NBME table anchor count (informational)
  confidence: number;     // 0-100
  nNeighbors: number;     // kept for backwards-compat (always 0)
  // New for v2: trend across multiple NBMEs
  trend?: { direction: 'improving' | 'stable' | 'declining'; deltaPerWeek: number | null; forms: Array<{ form: number; epc: number }> };
}

// ── NBME July 2024 pass-probability table (sampled anchor points) ──
// Interpolated linearly between points for smooth output.
const NBME_PASS_PROB: Array<[number, number]> = [
  [35, 5], [40, 12], [45, 25], [48, 38], [50, 50],
  [52, 60], [53, 65], [54, 70], [55, 75], [56, 78],
  [58, 84], [60, 87], [62, 90], [64, 92], [66, 95],
  [68, 97], [70, 98], [72, 98], [75, 99], [80, 99], [85, 99],
];

// ── Empirically-validated tier thresholds ──
// NBME's own table says EPC 70 = 98% pass, but our 586-case validation set shows
// the 65-75 EPC band has heavy selection-bias noise (failures over-posted).
// We tighten "Safe" to ≥72 and "Very Safe" to ≥78 to be more conservative
// at the noisy boundary. NBME table values themselves are unchanged.
function tierFromEpc(epc: number): Tier {
  if (epc >= 78) return 'Very Safe';    // ≥99% pass per NBME, no observed fails in our data
  if (epc >= 72) return 'Safe';          // 98%+ pass; clear of the noisy 65-72 band
  if (epc >= 64) return 'Likely Pass';   // 92-98% — likely but corroborate with Free 120
  if (epc >= 56) return 'Borderline';    // 75-89% — recommend more prep
  return 'High Risk';                    // <75% — strongly consider delaying
}

// ── FSMB 2024 cohort first-attempt pass rates (context, not model) ──
const COHORT_PASS_RATES: Record<string, number> = {
  'US-MD': 0.96,
  'US-DO': 0.92,
  'IMG':   0.74,
};

const TIER_INDEX: Record<Tier, number> = {
  'Very Safe': 4, 'Safe': 3, 'Likely Pass': 2, 'Borderline': 1, 'High Risk': 0,
};
const INDEX_TO_TIER: Tier[] = ['High Risk', 'Borderline', 'Likely Pass', 'Safe', 'Very Safe'];


// ── Linear interpolation on the NBME table ──
function nbmePassProb(epc: number): number {
  if (epc <= NBME_PASS_PROB[0][0]) return NBME_PASS_PROB[0][1] / 100;
  const last = NBME_PASS_PROB[NBME_PASS_PROB.length - 1];
  if (epc >= last[0]) return last[1] / 100;
  for (let i = 0; i < NBME_PASS_PROB.length - 1; i++) {
    const [x1, y1] = NBME_PASS_PROB[i];
    const [x2, y2] = NBME_PASS_PROB[i + 1];
    if (epc >= x1 && epc <= x2) {
      const t = (epc - x1) / (x2 - x1);
      return (y1 * (1 - t) + y2 * t) / 100;
    }
  }
  return 0.5;
}


// ── Collect NBMEs the user entered, sorted by form number (latest = highest form) ──
function collectNbmes(inp: Step1Input): Array<{ form: number; epc: number }> {
  const out: Array<{ form: number; epc: number }> = [];
  for (const form of [29, 30, 31, 32, 33] as const) {
    const key = `nbme${form}` as keyof Step1Input;
    const v = inp[key];
    if (typeof v === 'number' && v >= 30 && v <= 99) {
      out.push({ form, epc: v });
    }
  }
  return out.sort((a, b) => a.form - b.form);
}


// ── Free 120 / UWorld as DOWNGRADERS only (never upgrade) ──
function applyDowngrades(tier: Tier, inp: Step1Input): { tier: Tier; downgraded: boolean; reasons: string[] } {
  let idx = TIER_INDEX[tier];
  const reasons: string[] = [];

  if (typeof inp.free120 === 'number') {
    if (inp.free120 < 50 && idx >= 2) {
      idx = Math.min(idx, 1); // demote to Borderline
      reasons.push(`Free 120 at ${inp.free120}% is significantly below your NBME level — practice content suggests real-exam difficulty hits harder.`);
    } else if (inp.free120 < 60 && idx >= 3) {
      idx = Math.min(idx, 2); // demote Very Safe / Safe → Likely Pass
      reasons.push(`Free 120 at ${inp.free120}% is lower than your NBME. Take it again closer to exam day to recalibrate.`);
    }
  }

  if (typeof inp.uworld === 'number') {
    if (inp.uworld < 45 && idx >= 2) {
      idx = Math.min(idx, 1);
      reasons.push(`UWorld at ${inp.uworld}% is quite low — review your weakest sections before testing.`);
    } else if (inp.uworld < 55 && idx >= 3) {
      idx = Math.min(idx, 2);
      reasons.push(`UWorld at ${inp.uworld}% is somewhat below NBME — confirm timing isn't your weak spot.`);
    }
  }

  return { tier: INDEX_TO_TIER[idx], downgraded: idx !== TIER_INDEX[tier], reasons };
}


// ── Compute trend if 2+ NBMEs entered ──
function detectTrend(nbmes: Array<{ form: number; epc: number }>): Step1Prediction['trend'] {
  if (nbmes.length < 2) return undefined;
  const delta = nbmes[nbmes.length - 1].epc - nbmes[0].epc;
  const span = nbmes.length - 1; // approx number of "test cycles"
  const perCycle = delta / span;
  let direction: 'improving' | 'stable' | 'declining' = 'stable';
  if (perCycle >= 2) direction = 'improving';
  else if (perCycle <= -2) direction = 'declining';
  return { direction, deltaPerWeek: perCycle, forms: nbmes };
}


// ── Cohort-tailored advice text ──
function cohortAdvice(tier: Tier, status?: string): string | null {
  if (status !== 'IMG') return null; // US-MD / US-DO use default tier copy
  switch (tier) {
    case 'Very Safe':
    case 'Safe':
      return 'IMG pass rates at this NBME level are similar to US-MD. You\'re on track.';
    case 'Likely Pass':
      return 'IMG first-attempt pass rate is 74% overall. At your NBME level, expect ~90%+ pass — but one more confirmatory NBME is worth it.';
    case 'Borderline':
      return 'IMG first-attempt pass rate is 74%; at your current level, fail risk is meaningful. Strongly consider an extra prep cycle.';
    case 'High Risk':
      return 'IMG fail rates are materially higher than US-MD. Strongly consider delaying and addressing weakest subjects.';
  }
  return null;
}


function defaultAdvice(tier: Tier): string {
  switch (tier) {
    case 'Very Safe':   return 'You\'re tracking comfortably above the pass line. Focus the final week on retention, sleep, and exam-day timing.';
    case 'Safe':        return 'Likely to pass. A fresh CBSSA within 1-2 weeks of your exam would tighten this estimate.';
    case 'Likely Pass': return 'In the "likely pass" zone with real downside risk. One more solid NBME would build margin.';
    case 'Borderline':  return 'Borderline. Strongly recommend additional study before locking in your test date.';
    case 'High Risk':   return 'High fail risk at current performance. Consider postponing and rebuilding the NBME-tier foundation.';
  }
}


// ── Build the EPC → P(pass) curve for visualization ──
function buildEpcCurve(yourEpc: number | null): Step1Prediction['epcCurve'] {
  const points: Array<{ epc: number; p: number }> = [];
  for (let e = 35; e <= 85; e += 1) {
    points.push({ epc: e, p: Math.round(nbmePassProb(e) * 1000) / 10 });
  }
  return { points, yourEpc };
}


// ── Build cohort comparison bars ──
function buildCohortComparison(pPass: number, status?: string): Step1Prediction['cohortComparison'] {
  const yours = Math.round(pPass * 100);
  return [
    { label: 'You',          pct: yours, isYou: true },
    { label: 'US-MD (1st)',  pct: Math.round(COHORT_PASS_RATES['US-MD'] * 100) },
    { label: 'US-DO (1st)',  pct: Math.round(COHORT_PASS_RATES['US-DO'] * 100) },
    { label: 'IMG (1st)',    pct: Math.round(COHORT_PASS_RATES['IMG'] * 100) },
  ];
}


// ── No-input fallback ──
function errorState(message: string): Step1Prediction {
  return {
    pPass: 0, pPassPct: 0, lowerPct: 0, upperPct: 0,
    tier: 'High Risk' as Tier,
    signals: [],
    warnings: [message],
    inputBreakdown: [],
    cohortComparison: [],
    epcCurve: { points: buildEpcCurve(null).points, yourEpc: null },
    similarStudents: [],
    insights: [{ type: 'warning', text: message }],
    effectiveEpc: null, dataPoints: 0, confidence: 0, nNeighbors: 0,
  };
}


// ────────────────────────────────────────────────────────────────────
//                            MAIN PREDICT
// ────────────────────────────────────────────────────────────────────
export function predictStep1(inp: Step1Input, _dataset?: unknown): Step1Prediction {
  // 1. Gather NBME scores; require at least one
  const nbmes = collectNbmes(inp);
  if (nbmes.length === 0) {
    return errorState('Enter at least one NBME CBSSA score (form 29-33) — it\'s the single strongest Step 1 predictor and required for an accurate estimate.');
  }
  const primary = nbmes[nbmes.length - 1]; // latest form = highest form number

  // 2. NBME table lookup → pass probability + tier
  const pPassRaw = nbmePassProb(primary.epc);
  let tier = tierFromEpc(primary.epc);
  const signals: string[] = [`NBME ${primary.form}: ${primary.epc}% EPC → ~${Math.round(pPassRaw * 100)}% pass (NBME official table)`];
  const warnings: string[] = [];

  // 3. Downgrade tier if Free 120 / UWorld sharply lower
  const dg = applyDowngrades(tier, inp);
  if (dg.downgraded) {
    tier = dg.tier;
    warnings.push(...dg.reasons);
  }

  // The *displayed* pPass must stay consistent with the readiness tier, so the
  // gauge number never contradicts the verdict word (e.g. "87% pass" labelled
  // "Borderline"). We pull the raw NBME probability toward the tier center in
  // ALL cases — the deliberately-conservative tier thresholds in tierFromEpc are
  // preserved unchanged; only the number is reconciled to match them. The raw
  // NBME-table value is still surfaced verbatim in the Signal Weights breakdown.
  const TIER_PASS_CENTER: Record<Tier, number> = {
    'Very Safe': 0.99, 'Safe': 0.97, 'Likely Pass': 0.92, 'Borderline': 0.80, 'High Risk': 0.55,
  };
  const pPass = pPassRaw * 0.5 + TIER_PASS_CENTER[tier] * 0.5;
  const pPassPct = Math.round(pPass * 100);

  // 4. Confidence interval (advisory, not statistical)
  let ci = 4;                                  // base ±4pp for NBME-table-anchored estimate
  if (nbmes.length >= 2) ci -= 1;              // multiple NBMEs → tighter
  if (typeof inp.free120 === 'number') ci -= 1;
  if (typeof inp.uworld === 'number') ci -= 0.5;
  ci = Math.max(2, Math.min(ci, 8));
  const lowerPct = Math.max(0, pPassPct - Math.round(ci));
  const upperPct = Math.min(100, pPassPct + Math.round(ci));

  // 5. Trend across multiple NBMEs
  const trend = detectTrend(nbmes);
  if (trend && nbmes.length >= 2) {
    const formsList = nbmes.map(n => `${n.form}:${n.epc}%`).join(' → ');
    if (trend.direction === 'improving') {
      signals.push(`Trend ↑ improving: ${formsList} (+${trend.deltaPerWeek?.toFixed(1)} per cycle)`);
    } else if (trend.direction === 'declining') {
      signals.push(`Trend ↓ declining: ${formsList} (${trend.deltaPerWeek?.toFixed(1)} per cycle)`);
      warnings.push('Your NBMEs are trending down — consider what changed. A break before re-testing often helps.');
    } else {
      signals.push(`Trend → stable: ${formsList}`);
    }
  }

  // 6. Free 120 / UWorld signals (even if no downgrade)
  if (typeof inp.free120 === 'number') {
    signals.push(`Free 120: ${inp.free120}%`);
  }
  if (typeof inp.uworld === 'number') {
    signals.push(`UWorld: ${inp.uworld}%`);
  }

  // 7. Build inputBreakdown (one row per input, equal-weighted visually)
  const breakdown: Step1Prediction['inputBreakdown'] = [];
  for (const n of nbmes) {
    breakdown.push({
      label: `NBME ${n.form}`,
      value: `${n.epc}% EPC`,
      weight: n.form === primary.form ? 60 : 10,
      pComponent: Math.round(nbmePassProb(n.epc) * 100),
    });
  }
  if (typeof inp.free120 === 'number') {
    breakdown.push({
      label: 'Free 120',
      value: `${inp.free120}%`,
      weight: 20,
      pComponent: Math.round(nbmePassProb(inp.free120 - 4) * 100), // F120 runs ~4 pts harder than NBME
    });
  }
  if (typeof inp.uworld === 'number') {
    breakdown.push({
      label: 'UWorld',
      value: `${inp.uworld}%`,
      weight: 10,
      pComponent: Math.round(nbmePassProb(inp.uworld * 0.4 + 44) * 100), // UWorld → EPC-eq mapping
    });
  }

  // 8. Insights (actionable advice)
  const insights: Step1Prediction['insights'] = [];

  const advice = cohortAdvice(tier, inp.status) ?? defaultAdvice(tier);
  insights.push({
    type: tier === 'Very Safe' || tier === 'Safe' ? 'positive'
        : tier === 'Likely Pass' ? 'info'
        : 'warning',
    text: advice,
  });

  if (tier === 'Safe' || tier === 'Very Safe') {
    if (typeof inp.free120 !== 'number') {
      insights.push({ type: 'info', text: 'You haven\'t logged a Free 120. Taking it within 1-2 weeks of exam day is the best final-week sanity check (it uses retired real Step 1 items).' });
    }
  }

  if (tier === 'Borderline' || tier === 'High Risk') {
    insights.push({ type: 'warning', text: 'Consider rescheduling 4-6 weeks out, then take a fresh CBSSA in 2 weeks to track progress.' });
  }

  if (inp.status === 'IMG' && tier !== 'Very Safe' && tier !== 'Safe') {
    insights.push({
      type: 'info',
      text: 'IMG cohort first-attempt pass rate is ~74% (FSMB 2024). Strong NBMEs do translate well — but the cohort base rate matters when your NBME is borderline.',
    });
  }

  // 9. Caveats (warnings)
  if (primary.form <= 30) {
    warnings.push(`NBME ${primary.form} is older than NBME 31-33. Pass-probability calibration is reliable, but consider taking a newer form for confirmation.`);
  }

  if (nbmes.length === 1 && typeof inp.free120 !== 'number' && typeof inp.uworld !== 'number') {
    warnings.push('Single NBME with no corroborator — confidence is wider. Add Free 120 or UWorld for a tighter estimate.');
  }

  // 10. Cohort comparison + EPC curve
  const cohortComparison = buildCohortComparison(pPass, inp.status);
  const epcCurve = buildEpcCurve(primary.epc);

  // 11. Confidence score (0-100)
  let confidence = 65;
  if (nbmes.length >= 2) confidence += 12;
  if (typeof inp.free120 === 'number') confidence += 10;
  if (typeof inp.uworld === 'number') confidence += 8;
  if (primary.form >= 31) confidence += 5;
  if (primary.epc >= 70 || primary.epc < 56) confidence += 5; // extremes are more confident
  confidence = Math.min(95, Math.max(40, confidence));

  return {
    pPass, pPassPct, lowerPct, upperPct, tier,
    signals, warnings,
    inputBreakdown: breakdown,
    cohortComparison,
    epcCurve,
    similarStudents: [],   // no longer using a dataset — Step1Results handles empty array
    insights,
    effectiveEpc: primary.epc,
    dataPoints: 100000,    // NBME table is anchored on ~100K test-takers/year
    confidence,
    nNeighbors: 0,
    trend,
  };
}


// ── Dataset loader kept as a no-op shim (so existing import sites don't break) ──
// The new predictor doesn't use a dataset; this returns an empty array.
export async function loadStep1Dataset(): Promise<unknown[]> {
  return [];
}
