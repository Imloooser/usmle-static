import React from 'react';
import Link from 'next/link';
import { Shield, Target, Activity } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import { medicalWebPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'USMLE Score Prediction Methodology — The Science Behind the Forecast',
  description: 'How USMLEPredictor forecasts your USMLE Step 1, 2 CK & 3 scores: a 3-method statistical ensemble trained on 5,039 verified outcomes, per-form normalization, outlier filtering, and r = 0.92 validation.',
  alternates: { canonical: 'https://usmlepredictor.com/methodology/' },
  openGraph: {
    title: 'USMLE Score Prediction Methodology — The Science Behind the Forecast',
    description: 'The statistical framework behind our Step 1/2/3 predictions: ensemble modeling, normalization, outlier detection, and r = 0.92 validation on 5,039 verified outcomes.',
    url: 'https://usmlepredictor.com/methodology/',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'USMLE Score Prediction Methodology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USMLE Score Prediction Methodology',
    description: 'The science behind our USMLE score forecasts — ensemble modeling on 5,039 verified outcomes.',
    images: ['/og-image.png'],
  },
};

export default function Methodology() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'USMLE Predictor', item: 'https://usmlepredictor.com/' },
      { '@type': 'ListItem', position: 2, name: 'Methodology', item: 'https://usmlepredictor.com/methodology/' },
    ],
  };

  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/methodology/',
    name: 'USMLE Score Prediction Methodology',
    description: 'The statistical methodology behind USMLEPredictor: a 3-method ensemble trained on 5,039 verified student outcomes, with per-form normalization, outlier filtering, and r = 0.92 validation.',
    lastReviewed: '2026-06-17',
    about: 'USMLE Score Prediction',
    audience: 'medical students',
  });

  return (
    <div className="premium-page-container">
      <SchemaMarkup schema={[medicalSchema, breadcrumbSchema]} />

      <header className="premium-page-header">
        <div className="premium-header-content">
          <div>
            <div className="badge-premium mb-4">Methodology · Transparent &amp; Data-Backed</div>
            <h1 className="premium-page-title">USMLE Score Prediction Methodology: The Science Behind the Forecast</h1>
            <p className="text-base text-[#a0acc0] max-w-2xl mt-4 leading-relaxed">
              In the high-stakes environment of the USMLE Step 1, Step 2 CK, and Step 3 exams, students need more
              than a guess. We transform your practice data into a reliable score forecast using a transparent
              statistical framework — built on <strong className="text-white">5,039 verified student outcomes</strong> and
              validated to within <strong className="text-white">±5–7 points</strong> (r = 0.92 with NBME Form 14).
            </p>
            <div className="cta-container mt-6">
              <Link href="/" className="cta-primary-button">Try the free predictor →</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="premium-main-content">

        <section className="premium-section mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">Predictive Modeling in Medical Education</h2>
          <p className="text-[#a0acc0] leading-relaxed">
            Our platform applies predictive analytics to real-world student performance to produce actionable
            score forecasts. By running rigorous statistical methods over a large, verified dataset, we give you a
            reliable benchmark for exam readiness across <Link href="/usmle-step-1-score-predictor/" className="text-indigo-400 hover:underline">Step 1</Link>,{' '}
            <Link href="/" className="text-indigo-400 hover:underline">Step 2 CK</Link>, and{' '}
            <Link href="/usmle-step-3-score-predictor/" className="text-indigo-400 hover:underline">Step 3</Link> — not a single-number gimmick.
          </p>
        </section>

        <section className="premium-section mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">Data Sourcing &amp; Anonymization</h2>
          <p className="text-[#a0acc0] leading-relaxed">
            The integrity of a prediction depends entirely on the quality of its data. Our models are trained on a
            continuously maintained dataset of <strong className="text-white">5,039 verified, document-confirmed</strong> student
            score reports collected from 2022 to 2026.
          </p>
          <ul className="accuracy-list">
            <li><strong>Primary inputs:</strong> official NBME Self-Assessments (Forms), UWorld Self-Assessments (UWSA 1/2), UWorld question-bank percentages, and the NBME Free 120/137.</li>
            <li><strong>Anonymization:</strong> every submission is stripped of personally identifiable information (PII) before it ever reaches our algorithms — preserving total student privacy while keeping the data&rsquo;s predictive power intact.</li>
          </ul>
        </section>

        <section className="premium-section mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">The Statistical Framework</h2>
          <p className="text-[#a0acc0] leading-relaxed">
            We move beyond simple averages. Each prediction is a blend of three independent methods — a{' '}
            <strong className="text-white">3-method ensemble</strong> (K-Nearest-Neighbor matching, weighted averaging, and
            per-form regression) — so no single signal dominates:
          </p>
          <ul className="accuracy-list">
            <li><strong>Regression analysis:</strong> we model the direct correlation between specific practice-exam scores and final USMLE outcomes.</li>
            <li><strong>Data normalization:</strong> we adjust for the varying difficulty of different NBME forms, so a score on a harder form is weighted appropriately against an easier one (NBME Form 14 is currently the strongest single predictor at r = 0.92).</li>
            <li><strong>Outlier detection:</strong> anomalous data points (one-off &ldquo;fluke&rdquo; scores) are identified and filtered so they don&rsquo;t skew your personalized forecast.</li>
          </ul>
        </section>

        <section className="premium-section mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">Validation &amp; Accuracy Metrics</h2>
          <p className="text-[#a0acc0] leading-relaxed">
            We validate against actual USMLE outcomes. Our Step 2 CK model reaches a Pearson correlation of{' '}
            <strong className="text-white">r = 0.92</strong> with NBME Form 14 inputs, with 80% of predictions landing within
            ±5–7 points of the real score — comparable to the precision of official self-assessments. See the full
            breakdown on our <Link href="/accuracyinsights/" className="text-indigo-400 hover:underline">Step 2 accuracy page</Link>,{' '}
            <Link href="/step-1-accuracy-insights/" className="text-indigo-400 hover:underline">Step 1 accuracy page</Link>, and{' '}
            <Link href="/step-3-accuracy-insights/" className="text-indigo-400 hover:underline">Step 3 accuracy page</Link>.
          </p>
          <p className="text-[#a0acc0] leading-relaxed">
            <strong className="text-white">Continuous calibration:</strong> as the USMLE evolves — such as the Step 1 Pass/Fail
            shift in 2022 — our models are recalibrated to reflect current scoring trends and student behavior.
          </p>
        </section>

        <section className="premium-section mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">Data Privacy &amp; Ethical Standards</h2>
          <p className="text-[#a0acc0] leading-relaxed">
            We are committed to the ethical use of analytics in education.
          </p>
          <ul className="accuracy-list">
            <li><strong>No data sharing:</strong> your input is used solely to generate your prediction and improve the aggregate model. We never sell or share individual student data with residency programs, institutions, or third parties.</li>
            <li><strong>Transparency:</strong> we believe you should understand the <em>why</em> behind your score, which is exactly why this methodology is published openly and grounded in established statistical principles.</li>
          </ul>
        </section>

        <section className="premium-section mt-12">
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Target className="text-indigo-300" size={22} />
              <h2 className="text-xl font-bold text-white m-0">A reliable partner in your prep</h2>
            </div>
            <p className="text-[#a0acc0] leading-relaxed mb-4">
              No tool can account for the test-day factor (stress, environment, fatigue) — but this methodology
              gives you the most statistically sound estimate available. Combine your hard work with our
              data-driven insight and walk into the testing center knowing exactly where you stand.
            </p>
            <Link href="/" className="text-indigo-400 hover:underline font-medium">Predict your USMLE score →</Link>
            <span className="text-[#64748b]"> · </span>
            <Link href="/what-is-a-good-step-2-ck-score/" className="text-indigo-400 hover:underline font-medium">What is a good Step 2 CK score? →</Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-16 pt-10 border-t border-white/5">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-500/10 ring-1 ring-white/10 shrink-0">
                <Shield className="text-slate-300" size={18} />
              </span>
              <h3 className="text-base font-bold text-white m-0">Disclaimer</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#9aa6bd] m-0 text-left">
              USMLEPredictor.com is an independent educational tool and is not affiliated with the NBME, FSMB, the
              USMLE program, or UWorld. Predictions are statistical estimates; individual outcomes vary based on
              test-day performance and other factors. Use this tool as one data point in your preparation strategy
              alongside official NBME self-assessments.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
