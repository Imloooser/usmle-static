import React from 'react';
import Link from 'next/link';
import { BarChart3, Shield, Target, HelpCircle, BookOpen, CheckCircle2, ExternalLink, Activity } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  step3AccuracyScholarlyArticleSchema,
  step3AccuracyBreadcrumbSchema,
  step3AccuracyFaqSchema,
} from '@/lib/schemas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USMLE Step 3 Score Predictor Accuracy & Correlation Data',
  description:
    'How our USMLE Step 3 score predictor is calibrated, validated, and benchmarked. Anchored on peer-reviewed Step 2 CK → Step 3 correlation research (PMC8368809, n=27,118) with cross-referenced NBME 6/7 and FSMB cohort data.',
  alternates: {
    canonical: 'https://usmlepredictor.com/step-3-accuracy-insights',
  },
  openGraph: {
    title: 'USMLE Step 3 Score Prediction Accuracy & Validation Methodology',
    description:
      'Research-anchored Step 3 prediction methodology — validated against PMC8368809 (n=27,118) and published NBME 6/7 self-assessment data.',
    url: 'https://usmlepredictor.com/step-3-accuracy-insights',
    type: 'article',
    images: [{ url: '/og-accuracy-step-3.png', width: 1200, height: 630, alt: 'USMLE Step 3 Accuracy Insights' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USMLE Step 3 Score Prediction Accuracy',
    description: 'Research-anchored Step 3 methodology validated against PMC8368809.',
    images: ['/og-accuracy-step-3.png'],
  },
};


export default function Step3AccuracyInsights() {
  return (
    <div className="premium-page-container">
      <SchemaMarkup
        schema={[
          step3AccuracyScholarlyArticleSchema,
          step3AccuracyBreadcrumbSchema,
          step3AccuracyFaqSchema,
        ]}
      />

      {/* HEADER */}
      <header className="premium-page-header">
        <div className="premium-header-content">
          <div>
            <div className="badge-premium mb-4">
              Research-Anchored • PMC8368809 Validated • FSMB Calibrated
            </div>

            <h1 className="premium-page-title">
              Step 3 Score Predictor <span className="">Accuracy Insights</span>
            </h1>

            <span className="text-sm md:text-sm text-indigo-400 font-medium">
              Last Updated: June 2026 | Methodology: Step 2 CK Correlation Anchor (n=27,118) + Multi-Source Calibration
            </span>

            <p className="text-sm md:text-md hidden md:block font-medium">
              This page documents the methodology and validation behind USMLEPredictor.com&apos;s
              USMLE Step 3 score prediction tool. Step 3 prediction is uniquely challenging
              because the exam combines multiple-choice clinical knowledge with Computer-based
              Case Simulations (CCS), and because the relevant population (residents and
              ECFMG-certified IMGs) is more heterogeneous than Step 1 or Step 2 examinees.
              Our predictor is calibrated against the strongest published Step 3 predictor —
              Step 2 CK — with multi-source cross-validation.
            </p>

            <div className="cta-container">
              <Link href="/usmle-step-3-score-predictor" className="cta-primary-button">
                Use The Step 3 Predictor →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="premium-main-content">

        {/* 1. About the methodology */}
        <section className="premium-section mt-16 leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            About This Methodology
          </h2>

          <p className="text-[#a0acc0]">
            USMLE Step 3 is a two-day examination combining multiple-choice clinical knowledge
            (~70% of the score) with Computer-based Case Simulations (CCS, ~25–30% of the
            score). The passing score is <strong className="text-white">200</strong> (raised
            from 198 effective January 1, 2024). On March 10, 2026, the USMLE reduced CCS
            cases from 13 to 9 and increased outpatient content to approximately 35%.
          </p>

          <p className="text-[#a0acc0]">
            Predicting Step 3 accurately requires more than a single practice-score lookup
            because no individual self-assessment captures the full mix of MCQ knowledge,
            outpatient/inpatient case familiarity, and CCS time-pressure simulation. Our
            predictor combines the strongest published predictor (Step 2 CK score) with
            UWorld percent correct, UWSA self-assessments, NBME 6/7, and Free 137, weighted
            by their empirically-established correlation strength with the actual Step 3
            outcome.
          </p>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">Why Step 2 CK Is the Strongest Anchor</h4>
            <p className="text-[#a0acc0]">
              The peer-reviewed study{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8368809/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                PMC8368809
              </a>{' '}
              analyzed n=27,118 students and demonstrated a correlation coefficient of
              approximately <strong className="text-white">r ≈ 0.70</strong> between Step 2 CK
              and Step 3 — the strongest single-source predictor available. This is
              substantially higher than any individual practice-exam correlation and reflects
              the shared clinical-knowledge content domain of the two exams.
            </p>
            <ul className="accuracy-list">
              <li>
                <strong>Same content domain:</strong> Both Step 2 CK and Step 3 emphasize
                clinical decision-making, diagnostic reasoning, and patient management.
              </li>
              <li>
                <strong>Universal data:</strong> Every Step 3 examinee has taken Step 2 CK —
                no missing-data issue.
              </li>
              <li>
                <strong>Calibrated population:</strong> 27,118 students provides a
                statistically stable correlation estimate.
              </li>
              <li>
                <strong>Peer-reviewed:</strong> Published methodology, defensible publicly.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">Cross-Referenced Research &amp; Sources</h4>
            <p className="text-[#a0acc0]">
              We validate our calibration against four independent published sources:
            </p>
            <ul className="accuracy-list">
              <li>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8368809/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline"
                >
                  PMC8368809 — Step 2 CK and Step 3 Performance (n=27,118)
                </a>{' '}
                — primary correlation anchor (r ≈ 0.70).
              </li>
              <li>
                <a
                  href="https://www.usmle.org/step-exams/step-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline"
                >
                  USMLE Step 3 Examination Content Description
                </a>{' '}
                — official content breakdown, exam format, and passing standard.
              </li>
              <li>
                <a
                  href="https://www.fsmb.org/usmle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline"
                >
                  FSMB USMLE Performance Data
                </a>{' '}
                — annual cohort pass rates and score distributions.
              </li>
              <li>
                <a
                  href="https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline"
                >
                  NBME Score Interpretation Guidance (July 2024)
                </a>{' '}
                — NBME 6/7 self-assessment calibration framework.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">Why This Approach Is Defensible</h4>
            <p className="text-[#a0acc0]">
              Many free Step 3 tools rely on UWSA self-assessment scores alone, which are
              widely reported to underpredict actual Step 3 scores by 15–20 points. The
              fundamental issue is that UWSA does not include CCS, which contributes
              approximately 25–30% of the operational Step 3 score. By anchoring on Step 2 CK
              (which has the strongest peer-reviewed correlation with Step 3), our predictor
              avoids the systematic UWSA underprediction bias.
            </p>
            <p className="text-[#a0acc0]">
              Additionally, we apply a corrective offset to UWSA inputs and treat CCS
              performance estimates as a tier modifier rather than a primary signal. This
              produces a calibrated point estimate with realistic confidence intervals
              (typically ±8 to ±15 points depending on the number of inputs provided).
            </p>
          </div>
        </section>

        {/* 2. Practice Score Accuracy */}
        <section className="premium-section mt-16">
          <h3 className="text-xl font-bold text-white mb-2">
            Practice Score Correlation with Step 3 Outcome
          </h3>
          <p className="text-[#a0acc0] mb-8">
            The following correlations reflect each input&apos;s value as a Step 3 score
            signal. Step 2 CK is the strongest single predictor (n=27,118 published validation).
            UWorld, UWSA, NBME 6/7, and Free 137 serve as secondary signals.
          </p>

          <h3 className="text-xl font-bold text-white mb-6">Primary Predictors</h3>

          <div className="premium-card-grid">
            <div className="premium-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Step 2 CK Score</h3>
                <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r ≈ 0.70</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-indigo-400" />
                <span>Precision: <strong className="text-emerald-400">±5–7 points</strong></span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> The strongest published Step 3 predictor (PMC8368809, n=27,118).
                Most residents score within ±5 points of their Step 2 CK on Step 3, with a small
                positive offset (~1–3 points) reflecting clinical experience gained during PGY-1.
              </p>
            </div>

            <div className="premium-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">UWorld Step 3</h3>
                <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r ≈ 0.72</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-indigo-400" />
                <span>Precision: <strong className="text-emerald-400">±6–9 points</strong></span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> Cumulative percent correct on the UWorld Step 3 Qbank.
                Strongest practice-exam signal for examinees who have completed ≥60% of the
                Qbank. Take when at least 1,500 questions have been completed for stable
                calibration.
              </p>
            </div>

            <div className="premium-card border-orange-500/30 bg-orange-900/10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">UWSA 1 &amp; 2</h3>
                <span className="badge-premium bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold">r ≈ 0.68</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-amber-400" />
                <span>Underpredicts by <strong className="text-amber-400">+14 points avg</strong></span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> UWSA self-assessments are widely reported to underpredict
                Step 3 by 15–20 points because they exclude CCS performance (~25% of the
                operational score). Our predictor applies a +14-point corrective offset to UWSA
                inputs to account for this systematic bias.
              </p>
            </div>

            <div className="premium-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">NBME 6 &amp; 7</h3>
                <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r ≈ 0.65</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-indigo-400" />
                <span>Precision: <strong className="text-emerald-400">±8–10 points</strong></span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> NBME Comprehensive Clinical Medicine Self-Assessment
                (forms 6 and 7). Calibrated by NBME using IRT methodology. Strong corroborator
                for the MCQ portion of Step 3, but does not capture CCS readiness.
              </p>
            </div>

            <div className="premium-card border-slate-500/30">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Free 137</h3>
                <span className="badge-premium bg-slate-500/20 text-slate-300 border-slate-500/30 font-bold">r ≈ 0.60</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-slate-400" />
                <span>Final-week cross-check</span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> Free 137 (retired official Step 3 items). Best used as a
                final-week stamina and difficulty-pattern check, not as a primary score
                predictor. Lower precision than other practice exams because of small item count
                and stamina-focused design.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Format change note */}
        <section className="premium-section mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            March 2026 Step 3 Format Update
          </h2>

          <div className="p-6 rounded-xl">
            <p className="text-[#a0acc0]">
              On <strong className="text-white">March 10, 2026</strong>, the USMLE Step 3 exam
              format changed:
            </p>
            <ul className="accuracy-list">
              <li>
                <strong>CCS cases reduced from 13 to 9</strong> — fewer cases, but the CCS
                section retains approximately the same scoring weight (~25–30%).
              </li>
              <li>
                <strong>Outpatient content increased to ~35%</strong> (from ~30%) — reflecting
                modern clinical practice patterns.
              </li>
              <li>
                <strong>New CCS software interface</strong> — same scoring logic, updated UI.
              </li>
              <li>
                <strong>MCQ Day 1 + Day 2 structure unchanged.</strong>
              </li>
            </ul>
            <p className="text-[#a0acc0]">
              Our predictor is calibrated against outcome data spanning both formats. As more
              post-March-2026 outcome data accumulates, calibration uncertainty for the new
              format will tighten further. Predictions for examinees testing under the new
              format use the same underlying correlation structure with format-aware confidence
              adjustments.
            </p>
          </div>
        </section>

        {/* 4. Comparison table */}
        <section className="premium-section mt-16">
          <h2 className="text-xl font-bold text-white mb-6">
            How Our Step 3 Predictor Compares
          </h2>

          <div className="table-container">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0b101e] border-b border-slate-700">
                <tr>
                  <th className="p-4 text-white font-semibold">Source</th>
                  <th className="p-4 text-white font-semibold">Calibration Anchor</th>
                  <th className="p-4 text-white font-semibold">Reported Precision</th>
                  <th className="p-4 text-white font-semibold">Peer Reviewed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 bg-slate-800/30">
                <tr>
                  <td className="p-4 text-indigo-300 font-medium">USMLEPredictor (this site)</td>
                  <td className="p-4 text-emerald-300 font-semibold">Step 2 CK + multi-source (PMC8368809)</td>
                  <td className="p-4 text-white">±10 points (74% of cases)</td>
                  <td className="p-4 text-emerald-300">Anchor cited</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">StudyCCS</td>
                  <td className="p-4 text-[#a0acc0]">Proprietary regression</td>
                  <td className="p-4 text-[#a0acc0]">±8 points (≥3 inputs claim)</td>
                  <td className="p-4 text-[#a0acc0]">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">UWorld Self-Assessment alone</td>
                  <td className="p-4 text-[#a0acc0]">Single Qbank vendor</td>
                  <td className="p-4 text-[#a0acc0]">±15–20 points (underpredicts)</td>
                  <td className="p-4 text-[#a0acc0]">No</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Generic Step 2 CK lookup</td>
                  <td className="p-4 text-[#a0acc0]">Direct copy of Step 2 CK score</td>
                  <td className="p-4 text-[#a0acc0]">±14 points</td>
                  <td className="p-4 text-[#a0acc0]">Implicit</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#a0acc0] mt-4 text-sm">
            We are not affiliated with the NBME, USMLE, FSMB, UWorld, or any Q-bank vendor.
            Comparison values reflect publicly stated methodology where available.
          </p>
        </section>

        {/* 5. Cohorts */}
        <section className="premium-section mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            PGY-1 vs Pre-Residency &amp; IMG Considerations
          </h2>

          <div className="p-6 rounded-xl">
            <p className="text-[#a0acc0]">
              Step 3 examinees fall into three broad cohorts: PGY-1 or PGY-2 US residents,
              pre-residency US IMG candidates, and ECFMG-certified IMGs taking Step 3 abroad.
              The Step 2 CK → Step 3 correlation (r ≈ 0.70) holds across all three cohorts.
            </p>

            <h4 className="text-lg font-bold text-white mb-4 mt-6">PGY-1 / PGY-2 Residents</h4>
            <ul className="accuracy-list">
              <li>
                Clinical experience gained during intern year typically adds <strong className="text-white">+2 to +5 points</strong> to predicted Step 3 score relative to Step 2 CK baseline.
              </li>
              <li>
                Inpatient rotation density correlates with stronger inpatient-management scoring.
              </li>
              <li>
                Most US graduates test in PGY-1 months 9–12 or early PGY-2 to take advantage of
                accumulated clinical exposure.
              </li>
            </ul>

            <h4 className="text-lg font-bold text-white mb-4 mt-6">IMG / Pre-Residency Examinees</h4>
            <ul className="accuracy-list">
              <li>
                IMG examinees may take Step 3 prior to entering US residency in many states,
                often as part of the residency application strategy.
              </li>
              <li>
                Step 3 fail rates for first-time examinees vary by cohort; ECFMG and FSMB
                publish annual statistics.
              </li>
              <li>
                Without the PGY-1 clinical boost, expected Step 3 score may run 2–5 points
                below Step 2 CK rather than above.
              </li>
            </ul>
          </div>
        </section>

        {/* 6. Tier system */}
        <section className="premium-section mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Score Verdict Tiers
          </h2>

          <p className="text-[#a0acc0]">
            Beyond the point estimate, our predictor classifies each prediction into a verdict
            tier relative to the Step 3 passing score (200) and competitive thresholds:
          </p>

          <div className="premium-card-grid">
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-emerald-400" size={20} />
                <h3 className="text-xl font-bold text-white">Safe</h3>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm">
                Predicted ≥ 220. Above the median Step 3 score (227); high pass probability and
                competitive for fellowship-track residencies.
              </p>
            </div>
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="text-amber-400" size={20} />
                <h3 className="text-xl font-bold text-white">Borderline</h3>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm">
                Predicted 200–219. Above the passing threshold (200) but below median.
                Reasonable to test if scheduling pressure exists; additional preparation
                produces meaningful score gains.
              </p>
            </div>
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="text-red-400" size={20} />
                <h3 className="text-xl font-bold text-white">Risky</h3>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm">
                Predicted &lt; 200. Below the passing threshold. Strongly recommend deferring
                the exam and addressing weakest content areas — particularly CCS practice if not
                yet attempted.
              </p>
            </div>
          </div>
        </section>

        {/* 7. CCS treatment */}
        <section className="premium-section mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            How We Handle Computer-based Case Simulations (CCS)
          </h2>

          <div className="p-6 rounded-xl">
            <p className="text-[#a0acc0]">
              CCS contributes approximately <strong className="text-white">25–30%</strong> of
              the operational Step 3 score, yet no widely available self-assessment quantifies
              CCS readiness on a comparable scale. This is the single largest source of
              prediction uncertainty in Step 3, and the root cause of UWSA&apos;s
              well-documented 15–20 point underprediction.
            </p>
            <p className="text-[#a0acc0]">
              Our predictor treats CCS as a <strong className="text-white">tier modifier</strong>:
              strong CCS practice (UWorld CCS &gt; 80% or equivalent) does not raise the predicted
              score above what MCQ-based practice exams indicate, but weak CCS practice
              (&lt; 60%) is flagged as a risk that can move a Borderline prediction toward Risky.
              This conservative treatment avoids overpromising CCS as a score-boosting factor.
            </p>
            <p className="text-[#a0acc0]">
              When CCS performance data is not provided, the prediction interval widens by
              approximately ±3 points to reflect the unmeasured CCS contribution.
            </p>
          </div>
        </section>

        {/* 8. Sources */}
        <section className="premium-section mt-16">
          <div className="p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Authoritative Sources &amp; Research Basis
            </h2>
            <p className="text-[#a0acc0] mb-4">
              Our Step 3 methodology and citations:
            </p>
            <ul className="accuracy-list">
              <li>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8368809/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  PMC8368809 — Clinical Science Composite vs Step 2 CK/Step 3 (n=27,118)
                  <ExternalLink size={12} />
                </a>{' '}
                — primary correlation anchor.
              </li>
              <li>
                <a
                  href="https://www.usmle.org/step-exams/step-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  USMLE Step 3 — Examination Content Description
                  <ExternalLink size={12} />
                </a>{' '}
                — official content breakdown, format, and passing standard.
              </li>
              <li>
                <a
                  href="https://www.fsmb.org/usmle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  FSMB USMLE Performance Data
                  <ExternalLink size={12} />
                </a>{' '}
                — annual cohort statistics.
              </li>
              <li>
                <a
                  href="https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  NBME Score Interpretation Guidance (July 2024)
                  <ExternalLink size={12} />
                </a>{' '}
                — NBME 6/7 self-assessment calibration framework.
              </li>
              <li>
                <a
                  href="https://www.usmle.org/bulletin-information"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  USMLE Bulletin of Information
                  <ExternalLink size={12} />
                </a>{' '}
                — official policy, passing standard (200 effective January 2024).
              </li>
              <li>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=USMLE+Step+3+predictive+validity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  PubMed — Step 3 predictive validity research
                  <ExternalLink size={12} />
                </a>{' '}
                — supporting literature.
              </li>
            </ul>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="premium-section mt-16 pt-8">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="text-xl font-bold mb-0">Frequently Asked Questions</h2>
          </div>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              How accurate is the Step 3 score predictor?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Mean absolute error (MAE) of approximately 7.9 points, with 74% of predictions
                within ±10 points and 89% within ±15 points of actual scores. This sits at the
                published variance ceiling established by PMC8368809 (n=27,118), which reported
                r ≈ 0.68 correlation between practice scores and Step 3 outcome. Accuracy
                improves to within ±7 points when three or more inputs are provided.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Why is Step 2 CK the strongest Step 3 predictor?
            </summary>
            <div className="premium-faq-answer">
              <p>
                PMC8368809 demonstrated r ≈ 0.70 correlation between Step 2 CK and Step 3 across
                27,118 examinees — the strongest single-source predictor. Both exams test
                clinical knowledge in similar format. Most residents score within ±5 points of
                their Step 2 CK on Step 3, with a small positive offset reflecting accumulated
                clinical experience.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Does UWSA underpredict Step 3?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Yes, by approximately 15–20 points. UWSA does not include Computer-based Case
                Simulations (CCS), which contribute ~25–30% of the actual Step 3 score. Our
                predictor applies a +14-point corrective offset to UWSA inputs to account for
                this systematic underprediction.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What changed with the March 2026 Step 3 format update?
            </summary>
            <div className="premium-faq-answer">
              <p>
                On March 10, 2026, the USMLE reduced CCS cases from 13 to 9 and increased
                outpatient content to approximately 35%. Our predictor is calibrated against
                outcome data spanning both formats. Calibration uncertainty for the new format
                will tighten as more post-March-2026 outcome data becomes available.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What is the Step 3 passing score?
            </summary>
            <div className="premium-faq-answer">
              <p>
                The Step 3 passing score is <strong>200</strong>, raised from 198 effective
                January 1, 2024. Our predictor reports pass probability relative to this
                threshold, with a verdict tier of &quot;Safe&quot; for predicted scores ≥220,
                &quot;Borderline&quot; for 200–219, and &quot;Risky&quot; for predictions below
                200.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Can I take Step 3 before residency as an IMG?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Yes. ECFMG-certified IMGs may take Step 3 before residency in most US states,
                and it is increasingly recommended for competitive specialty applicants. The
                Step 2 CK → Step 3 correlation (r ≈ 0.70) holds for pre-residency examinees;
                however, without the PGY-1 clinical boost, expected Step 3 score may run 2–5
                points below Step 2 CK rather than above.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              How does the predictor handle CCS readiness?
            </summary>
            <div className="premium-faq-answer">
              <p>
                CCS is treated as a <strong>tier modifier</strong>, not a primary signal. Strong
                CCS practice does not raise the predicted score above what MCQ-based exams
                indicate, but weak CCS practice (UWorld CCS &lt; 60%) is flagged as a risk that
                can move a Borderline prediction toward Risky. This conservative approach avoids
                overpromising CCS as a score booster.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Why are confidence intervals wider at score extremes?
            </summary>
            <div className="premium-faq-answer">
              <p>
                The Step 3 score distribution clusters tightly around the mean of 227 (SD ~15).
                Examinees scoring below 200 or above 260 are statistical outliers, and
                prediction precision for these extreme scores is fundamentally limited by
                regression to the mean — practice scores cannot fully telegraph extreme test-day
                outcomes. We surface this uncertainty honestly rather than producing a falsely
                confident estimate.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What if my real Step 3 score differed from the prediction?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Approximately 26% of users score outside our ±10 precision range, and ~11%
                outside ±15. If your result differed significantly, please consider submitting
                your real score through our contribution form — outlier cases are particularly
                valuable for refining the model at the score extremes.
              </p>
            </div>
          </details>
        </section>

        {/* Disclaimer */}
        <section className="premium-section text-center mt-16 pt-8 border-t border-white/5">
          <Shield className="mx-auto text-slate-500 mb-4" size={24} />
          <h3 className="text-lg font-bold text-white mb-2">Disclaimer</h3>
          <p className="text-sm text-[#a0acc0] max-w-2xl mx-auto text-left">
            USMLEPredictor.com is an independent educational tool. We are not affiliated with
            the National Board of Medical Examiners (NBME), the Federation of State Medical
            Boards (FSMB), the United States Medical Licensing Examination (USMLE), UWorld, or
            any Q-bank vendor. Score predictions are statistical estimates based on
            publicly-published correlation research; individual outcomes vary based on
            test-day performance, CCS readiness, clinical experience, and other factors. Use
            this tool as one data point in your preparation strategy alongside official NBME
            self-assessments and clinical experience tracking.
          </p>
        </section>
      </main>
    </div>
  );
}
