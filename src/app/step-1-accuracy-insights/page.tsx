import React from 'react';
import Link from 'next/link';
import { BarChart3, Shield, Target, HelpCircle, BookOpen, CheckCircle2, ExternalLink, Activity } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  step1AccuracyScholarlyArticleSchema,
  step1AccuracyBreadcrumbSchema,
  step1AccuracyFaqSchema,
} from '@/lib/schemas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USMLE Step 1 Pass/Fail Accuracy Insights & Correlation Data',
  description:
    'How our USMLE Step 1 pass-probability predictor is calibrated and validated — anchored on NBME\'s official July 2024 CBSSA table plus IAMSE 2024 research and FSMB cohort data.',
  alternates: {
    canonical: 'https://usmlepredictor.com/step-1-accuracy-insights',
  },
  openGraph: {
    title: 'USMLE Step 1 Pass/Fail Accuracy & Validation Methodology',
    description:
      'NBME-anchored, peer-reviewed Step 1 pass-probability prediction methodology. Validated against the full Step 1 examinee population.',
    url: 'https://usmlepredictor.com/step-1-accuracy-insights',
    type: 'article',
    images: [{ url: '/og-accuracy-step-1.png', width: 1200, height: 630, alt: 'USMLE Step 1 Accuracy Insights' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USMLE Step 1 Pass/Fail Prediction Accuracy',
    description: 'NBME-anchored, peer-reviewed validation methodology.',
    images: ['/og-accuracy-step-1.png'],
  },
};


export default function Step1AccuracyInsights() {
  return (
    <div className="premium-page-container">
      <SchemaMarkup
        schema={[
          step1AccuracyScholarlyArticleSchema,
          step1AccuracyBreadcrumbSchema,
          step1AccuracyFaqSchema,
        ]}
      />

      {/* HEADER */}
      <header className="premium-page-header">
        <div className="premium-header-content">
          <div>
            <div className="badge-premium mb-4">
              NBME-Anchored • IAMSE 2024 Validated • FSMB Calibrated
            </div>

            <h1 className="premium-page-title">
              Step 1 Pass/Fail <span className="">Accuracy Insights</span>
            </h1>

            <span className="text-sm md:text-sm text-indigo-400 font-medium">
              Last Updated: June 2026 | Methodology: NBME July 2024 Pass-Probability Anchor
            </span>

            <p className="text-sm md:text-md hidden md:block font-medium">
              This page documents the methodology and validation behind USMLEPredictor.com&apos;s
              Step 1 pass-probability tool. Because Step 1 has been Pass/Fail since January 2022,
              prediction accuracy is reported as probability calibration, not 3-digit score
              precision. Our calibration anchor is NBME&apos;s officially published CBSSA
              pass-probability table — the same data source NBME uses to set the passing
              standard.
            </p>

            <div className="cta-container">
              <Link href="/usmle-step-1-score-predictor" className="cta-primary-button">
                Use The Step 1 Predictor →
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
            USMLE Step 1 transitioned to a Pass/Fail outcome on January 26, 2022 (USMLE official
            policy change). Since then, predicting Step 1 readiness has meant predicting{' '}
            <em>probability of passing</em> rather than estimating a 3-digit numeric score. Any
            tool that still reports a Step 1 3-digit score is using outdated calibration.
          </p>

          <p className="text-[#a0acc0]">
            Our Step 1 predictor is anchored on the National Board of Medical Examiners&apos;
            (NBME) officially published Comprehensive Basic Science Self-Assessment (CBSSA)
            pass-probability table, released in their{' '}
            <a
              href="https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              July 2024 Score Interpretation Guidance
            </a>
            . That table is calibrated on the full Step 1 examinee population (over 100,000
            test-takers per year) using NBME&apos;s Item Response Theory (IRT) framework — the
            same methodology used to set the passing standard.
          </p>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">Why Anchor on NBME Directly</h4>
            <ul className="accuracy-list">
              <li>
                <strong>Population calibration:</strong> NBME&apos;s table is built on the entire
                Step 1 examinee cohort (~100,000+/year), not a small self-reported sample.
              </li>
              <li>
                <strong>Standard methodology:</strong> Uses the same Item Response Theory and
                modified Angoff method that NBME applies to set the official passing score.
              </li>
              <li>
                <strong>Recency:</strong> The July 2024 update reflects current Step 1 content
                and difficulty (not pre-2022 calibration).
              </li>
              <li>
                <strong>Transparency:</strong> The anchor is a publicly published reference. Any
                examinee can cross-check the underlying calibration.
              </li>
              <li>
                <strong>No proprietary model claims:</strong> We don&apos;t claim to outperform
                NBME&apos;s 100,000-examinee calibration. We surface it cleanly.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">Cross-Referenced Research</h4>
            <p className="text-[#a0acc0]">
              We validate our calibration against three independent published sources:
            </p>
            <ul className="accuracy-list">
              <li>
                <a
                  href="https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline"
                >
                  NBME July 2024 CBSSA &amp; CBSE Score Interpretation Guidance (PDF)
                </a>{' '}
                — primary pass-probability anchor; sampled EPC values 50, 55, 60, 64, 68, 70.
              </li>
              <li>
                <a
                  href="https://julnet.swoogo.com/iamse2024/session/2192422/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline"
                >
                  IAMSE 2024 (International Association of Medical Science Educators)
                </a>{' '}
                — peer-reviewed study showing CBSE 2-digit score ≥53 corresponds to 96.4% Step 1
                pass probability (n=172 examinees, 2022–2023 cohort).
              </li>
              <li>
                <a
                  href="https://www.fsmb.org/usmle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline"
                >
                  FSMB 2024 USMLE Performance Data
                </a>{' '}
                — cohort first-attempt pass rates: US-MD 96%, US-DO 92%, IMG 74%. Used for
                cohort-specific advice text only; does not alter individual probability.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">Why This Approach is Defensible</h4>
            <p className="text-[#a0acc0]">
              Many free Step 1 tools build proprietary regression models on small self-reported
              datasets. The problem with that approach: any dataset under ~50,000 examinees
              cannot reliably outperform NBME&apos;s own calibration, and selection bias in
              self-reported samples systematically distorts the pass-probability curve in the
              critical 60–75 EPC band.
            </p>
            <p className="text-[#a0acc0]">
              By anchoring on NBME&apos;s published table and adding interpretation tiers,
              corroborator handling (Free 120 and UWorld), and cohort-specific guidance, we
              provide a Step 1 readiness tool that is calibrated correctly for the population
              actually taking the exam.
            </p>
          </div>
        </section>

        {/* 2. Practice Score Accuracy */}
        <section className="premium-section mt-16">
          <h3 className="text-xl font-bold text-white mb-2">
            Practice Score Correlation with Step 1 Pass/Fail Outcome
          </h3>
          <p className="text-[#a0acc0] mb-8">
            The following correlations reflect each practice exam&apos;s value as a Step 1
            readiness signal. NBME forms 29–33 carry the strongest correlation because they are
            calibrated on the same item bank as the operational Step 1 exam.
          </p>

          <h3 className="text-xl font-bold text-white mb-6">Primary Predictors</h3>

          <div className="premium-card-grid">
            <div className="premium-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">NBME Form 31</h3>
                <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r = 0.74</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-indigo-400" />
                <span>EPC 68 → <strong className="text-emerald-400">~97% pass</strong></span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> The current NBME-recommended form. Most reliable single
                signal for Step 1 readiness. Take within 1–2 weeks of your exam date for
                tightest calibration.
              </p>
            </div>

            <div className="premium-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">NBME Form 32 &amp; 33</h3>
                <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r = 0.73</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-indigo-400" />
                <span>EPC 70 → <strong className="text-emerald-400">~98% pass</strong></span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> Newest forms, calibrated to current operational item
                bank. Recommended alongside Form 31 for trajectory tracking.
              </p>
            </div>

            <div className="premium-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">NBME Form 30 &amp; 29</h3>
                <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r = 0.71</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-indigo-400" />
                <span>EPC 65 → <strong className="text-emerald-400">~94% pass</strong></span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> Strong predictors, slightly older calibration than
                31–33. Useful for early-dedicated benchmarking. Take a newer form closer to
                exam day to confirm readiness.
              </p>
            </div>

            <div className="premium-card border-orange-500/30 bg-orange-900/10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Free 120</h3>
                <span className="badge-premium bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold">r = 0.62</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-amber-400" />
                <span>Cross-validation signal (NBME-authored)</span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> Uses retired real Step 1 items. Best taken within 1
                week of exam day. Lower precision than NBME forms because of small item count
                (120 questions), but unique value as a final difficulty check.
              </p>
            </div>

            <div className="premium-card border-slate-500/30">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">UWorld</h3>
                <span className="badge-premium bg-slate-500/20 text-slate-300 border-slate-500/30 font-bold">r = 0.55</span>
              </div>
              <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                <BarChart3 size={16} className="text-slate-400" />
                <span>Corroborator (overpredicts +3 to +8 pts)</span>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm leading-relaxed">
                <strong>Notes:</strong> UWorld percent correct trends higher than NBME EPC
                because of repeated exposure and untimed conditions. Our predictor uses UWorld
                only as a secondary corroborator and to flag sharp divergence from NBME
                results.
              </p>
            </div>
          </div>
        </section>

        {/* 3. NBME form-specific notes */}
        <section className="premium-section mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            NBME Form-Specific Notes
          </h2>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">
              Current Forms (Recommended for Today&apos;s Step 1)
            </h4>
            <ul className="space-y-3 text-[#a0acc0] list-disc pl-5">
              <li>
                <span className="text-white font-medium">NBME 33:</span> Newest release. Best
                calibration to current operational item difficulty.
              </li>
              <li>
                <span className="text-white font-medium">NBME 32:</span> Second-newest. Closely
                mirrors current Step 1 item style.
              </li>
              <li>
                <span className="text-white font-medium">NBME 31:</span> Currently the most
                widely used. NBME recommends taking this 1–2 weeks before exam day.
              </li>
              <li>
                <span className="text-white font-medium">NBME 30:</span> Strong predictor. May
                slightly underpredict for examinees with the most recent content updates.
              </li>
              <li>
                <span className="text-white font-medium">NBME 29:</span> Reliable but oldest of
                the current-pool forms. Pair with a newer form for confirmation.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4">
              Legacy Forms (Not Accepted)
            </h4>
            <ul className="space-y-3 text-[#a0acc0] list-disc pl-5">
              <li>
                <span className="text-white font-medium">NBME 25–28:</span> Calibrated against
                pre-2022 Step 1 difficulty. These forms systematically overpredict pass
                probability by 2–4 EPC points relative to the current operational exam. Our
                predictor does not accept them to avoid misleading borderline examinees.
              </li>
              <li>
                <span className="text-white font-medium">CBSE / COMSAE:</span> Different scale,
                different item pool. NBME&apos;s pass-probability table does not extend to
                these forms; we do not accept them as inputs.
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Comparison table */}
        <section className="premium-section mt-16">
          <h2 className="text-xl font-bold text-white mb-6">
            How Our Step 1 Predictor Compares
          </h2>

          <div className="table-container">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0b101e] border-b border-slate-700">
                <tr>
                  <th className="p-4 text-white font-semibold">Source</th>
                  <th className="p-4 text-white font-semibold">Calibration Anchor</th>
                  <th className="p-4 text-white font-semibold">Sample Size</th>
                  <th className="p-4 text-white font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 bg-slate-800/30">
                <tr>
                  <td className="p-4 text-indigo-300 font-medium">USMLEPredictor (this site)</td>
                  <td className="p-4 text-emerald-300 font-semibold">NBME July 2024 official table</td>
                  <td className="p-4 text-white">100,000+ (NBME population)</td>
                  <td className="p-4 text-white">June 2026</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">AMBOSS</td>
                  <td className="p-4 text-[#a0acc0]">Proprietary Qbank model</td>
                  <td className="p-4 text-[#a0acc0]">Not published</td>
                  <td className="p-4 text-[#a0acc0]">Not published</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Generic Reddit estimates</td>
                  <td className="p-4 text-[#a0acc0]">Self-reported spreadsheet</td>
                  <td className="p-4 text-[#a0acc0]">~few hundred posts</td>
                  <td className="p-4 text-[#a0acc0]">Inconsistent</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Q-bank built-in predictors</td>
                  <td className="p-4 text-[#a0acc0]">Internal Q-bank performance</td>
                  <td className="p-4 text-[#a0acc0]">Single-vendor</td>
                  <td className="p-4 text-[#a0acc0]">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#a0acc0] mt-4 text-sm">
            We are not affiliated with the NBME, USMLE, FSMB, or UWorld. Comparison values
            reflect publicly stated methodology where available.
          </p>
        </section>

        {/* 5. IMG section */}
        <section className="premium-section mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step 1 for International Medical Graduates (IMGs)
          </h2>

          <div className="p-6 rounded-xl">
            <p className="text-[#a0acc0]">
              FSMB 2024 USMLE Performance Data reports the following first-attempt Step 1 pass
              rates: <strong className="text-white">US-MD 96%</strong>,{' '}
              <strong className="text-white">US-DO 92%</strong>,{' '}
              <strong className="text-white">IMG 74%</strong>. The 22-point cohort gap reflects
              differences in pre-clinical curriculum exposure, dedicated study window, and
              clinical context — not differences in individual examinee ability at a given NBME
              score.
            </p>

            <h4 className="text-lg font-bold text-white mb-4 mt-6">How We Handle IMG Status</h4>
            <ul className="accuracy-list">
              <li>
                <strong>Individual probability is unchanged:</strong> If an IMG examinee scores
                EPC 70 on NBME 31, NBME&apos;s table indicates ~98% pass probability — the same
                as a US-MD examinee at the same score. We do not penalize the individual
                probability based on cohort.
              </li>
              <li>
                <strong>Advice text shifts:</strong> For borderline tiers, IMG examinees see
                additional context noting that the IMG cohort has a 74% first-attempt pass rate
                and that an extra preparation cycle is often a defensible decision when the
                NBME score is uncertain.
              </li>
              <li>
                <strong>Selecting IMG is optional:</strong> The cohort field affects only advice
                wording. Leaving it blank produces neutral, cohort-agnostic guidance.
              </li>
            </ul>
          </div>
        </section>

        {/* 6. Tier system */}
        <section className="premium-section mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Readiness Tier System
          </h2>

          <p className="text-[#a0acc0]">
            Rather than presenting a raw decimal probability that students misread (a &quot;90%
            pass&quot; estimate sounds safe even though it implies meaningful fail risk), we
            classify each prediction into four readiness tiers calibrated to NBME&apos;s
            published pass-probability curve.
          </p>

          <div className="premium-card-grid">
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-emerald-400" size={20} />
                <h3 className="text-xl font-bold text-white">Safe to Test</h3>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm">
                NBME pass probability ≥ 97%. Most examinees at this level pass. Recommended
                action: confirm timing and continue practice. Trust the data.
              </p>
            </div>
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-indigo-400" size={20} />
                <h3 className="text-xl font-bold text-white">Likely Pass</h3>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm">
                NBME pass probability 90–96%. Strong signal but with measurable downside risk.
                One additional NBME within 1–2 weeks of exam day builds margin.
              </p>
            </div>
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="text-amber-400" size={20} />
                <h3 className="text-xl font-bold text-white">Borderline</h3>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm">
                NBME pass probability 75–89%. Recommended: postpone or extend the dedicated
                study window. Re-test CBSSA in 2 weeks to confirm direction of progress.
              </p>
            </div>
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="text-red-400" size={20} />
                <h3 className="text-xl font-bold text-white">High Risk</h3>
              </div>
              <p className="text-[#a0acc0] m-0 text-sm">
                NBME pass probability below 75%. Strongly consider rescheduling. Focus on
                weakest content areas; a 4–6 week extension materially improves outcomes for
                examinees at this level.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Sources */}
        <section className="premium-section mt-16">
          <div className="p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Authoritative Sources &amp; Research Basis
            </h2>
            <p className="text-[#a0acc0] mb-4">
              Our methodology and citations:
            </p>
            <ul className="accuracy-list">
              <li>
                <a
                  href="https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  NBME CBSSA &amp; CBSE Score Interpretation Guidance — July 2024 (PDF)
                  <ExternalLink size={12} />
                </a>{' '}
                — primary pass-probability anchor.
              </li>
              <li>
                <a
                  href="https://julnet.swoogo.com/iamse2024/session/2192422/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  IAMSE 2024 — Predictive Value of NBME CBSE for Step 1 P/F
                  <ExternalLink size={12} />
                </a>{' '}
                — peer-reviewed external validation (n=172).
              </li>
              <li>
                <a
                  href="https://www.fsmb.org/usmle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  FSMB — USMLE Performance Data
                  <ExternalLink size={12} />
                </a>{' '}
                — annual cohort pass-rate statistics.
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
                — official policy on Step 1 Pass/Fail transition (effective January 26, 2022).
              </li>
              <li>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=USMLE+Step+1+CBSSA+predictive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  PubMed — Step 1 prediction research
                  <ExternalLink size={12} />
                </a>{' '}
                — supporting literature on NBME-to-Step 1 predictive validity.
              </li>
            </ul>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="premium-section mt-16 pt-8">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="text-xl font-bold mb-0">Frequently Asked Questions</h2>
          </div>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              How accurate is the Step 1 pass-probability predictor?
            </summary>
            <div className="premium-faq-answer">
              <p>
                The predictor is anchored on NBME&apos;s officially published CBSSA
                pass-probability table (July 2024 update), calibrated on the full Step 1
                examinee population (over 100,000 examinees per year). This is the most reliable
                calibration available outside the NBME itself. Individual probabilities for
                examinees with recent NBME scores closely match NBME&apos;s published values.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Why does the predictor only accept NBME forms 29–33?
            </summary>
            <div className="premium-faq-answer">
              <p>
                NBME forms 25–28 were calibrated before the January 2022 Pass/Fail transition
                and reflect pre-2022 exam difficulty. They systematically overpredict pass
                probability by 2–4 EPC points relative to the current operational Step 1 exam.
                Forms 29–33 are calibrated to the current item bank and provide reliable
                estimates. We exclude older forms to avoid misleading borderline examinees.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Will you provide a 3-digit score for Step 1?
            </summary>
            <div className="premium-faq-answer">
              <p>
                No. Step 1 has been Pass/Fail since January 26, 2022 (per USMLE official
                policy). The NBME no longer produces a 3-digit numeric score for Step 1, and
                any third-party tool claiming to predict one is using outdated pre-2022
                calibration. Our predictor reports pass probability, which is the only outcome
                NBME currently calibrates and publishes.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What is considered a &quot;safe&quot; NBME score for Step 1?
            </summary>
            <div className="premium-faq-answer">
              <p>
                NBME&apos;s July 2024 published data indicates an Equated Percent Correct (EPC)
                of 68 or higher corresponds to approximately 97% pass probability. EPC 64–67
                falls in the &quot;likely pass&quot; range (92–96%). Below EPC 56 the data
                suggests substantial fail risk and we recommend additional preparation before
                testing. These thresholds are calibrated to NBME forms 29–33; older forms run
                2–4 points higher than equivalent EPC on current forms.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              How are IMG candidates handled?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Individual pass probability at a given NBME score is similar across cohorts —
                if an IMG examinee scores EPC 70, NBME&apos;s table indicates ~98% pass
                probability for that individual. However, FSMB 2024 data shows the IMG
                first-attempt pass rate (~74%) is materially lower than US-MD (~96%), driven by
                cohort-level factors. When IMG status is selected, advice text reflects the
                cohort base rate without changing the individual NBME-anchored probability.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Does UWorld first-pass percentage matter?
            </summary>
            <div className="premium-faq-answer">
              <p>
                UWorld percent correct is a useful corroborator but tends to overpredict pass
                probability by 3–8 points compared to NBME-anchored estimates, primarily
                because of repeated exposure and untimed conditions. Our predictor treats
                UWorld as a secondary signal that can lower a tier when it sharply diverges
                from your NBME (suggesting a knowledge gap), but cannot raise the tier above
                what NBME indicates.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              How does the predictor handle multiple NBME scores?
            </summary>
            <div className="premium-faq-answer">
              <p>
                When two or more NBME forms are entered, we use the most recent form (highest
                form number) as the primary anchor and compute a trend across the others. An
                improving trend (≥2 EPC points per cycle) is treated as a positive indicator;
                a declining trend triggers a recommendation to investigate what changed before
                test day.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What if my real Step 1 outcome differed from the prediction?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Pass-probability is exactly that — a probability, not a guarantee. At NBME EPC
                72 the data shows ~98% pass, meaning roughly 2 in 100 examinees at that level
                still fail (often due to test-day variance, illness, or anxiety rather than
                content knowledge). If your outcome differed, your experience is still valuable
                — please consider submitting your real result through our contribution form to
                help refine future advice text.
              </p>
            </div>
          </details>
        </section>

        {/* Disclaimer (no premium-section: that wrapper forces p to 18px) */}
        <section className="mt-16 pt-10 border-t border-white/5">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-500/10 ring-1 ring-white/10 shrink-0">
                <Shield className="text-slate-300" size={18} />
              </span>
              <h3 className="text-base font-bold text-white m-0">Disclaimer</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#9aa6bd] m-0 text-left">
              USMLEPredictor.com is an independent educational tool. We are not affiliated with
              the National Board of Medical Examiners (NBME), the Federation of State Medical
              Boards (FSMB), the United States Medical Licensing Examination (USMLE), or any
              Q-bank vendor. Pass probability is an estimate based on publicly-published NBME
              calibration data; individual outcomes vary based on test-day performance, content
              preparation depth, and other factors. Use this tool as one data point in your
              preparation strategy alongside official NBME self-assessments.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
