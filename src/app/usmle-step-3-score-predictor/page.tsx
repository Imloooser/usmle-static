import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Stethoscope, BriefcaseMedical, Shield, Activity, Target, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import Step3PredictorTool from '@/components/Step3PredictorTool';
import ExamSwitcher from '@/components/ExamSwitcher';
import { medicalWebPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'USMLE Step 3 Score Predictor | Free & Data-Backed',
  description: 'Estimate your USMLE Step 3 score using Step 2 CK, UWorld, UWSA, NBME 6/7, and Free 137. Anchored on PMC8368809 (n=27,118) Step 2 CK to Step 3 correlation research.',
  alternates: {
    canonical: 'https://usmlepredictor.com/usmle-step-3-score-predictor',
  },
  openGraph: {
    title: 'USMLE Step 3 Score Predictor — Free, Research-Anchored',
    description: 'Free Step 3 predictor anchored on PMC8368809 (n=27,118) Step 2 CK correlation. MAE ~7.9 points, 74% within ±10.',
    url: 'https://usmlepredictor.com/usmle-step-3-score-predictor',
    type: 'website',
    images: [{ url: '/og-step-3.png', width: 1200, height: 630, alt: 'USMLE Step 3 Score Predictor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USMLE Step 3 Score Predictor (Free)',
    description: 'Research-anchored Step 3 score prediction tool.',
    images: ['/og-step-3.png'],
  },
};

export default function Step3Predictor() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "USMLE Step 3 Score Predictor",
    "url": "https://usmlepredictor.com/usmle-step-3-score-predictor",
    "applicationCategory": "EducationApplication",
    "description": "Calculate your USMLE Step 3 score from Step 2 CK, UWorld %, UWSA 1/2, NBME Forms 6/7, Free 137, and CCS practice performance.",
    "isAccessibleForFree": true,
    "featureList": [
      "Step 2 CK anchor — the strongest Step 3 predictor (r = 0.68, n = 27,118)",
      "CCS case-simulation adjustment (CCS is ~25% of the total Step 3 score)",
      "UWSA 1/2 recalibration for known under-prediction",
      "NBME Forms 6/7 percent-correct conversion",
      "Free 137 and UWorld % corroborating signals",
      "Pass probability + 3-digit estimate with range"
    ],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // Q&As are kept byte-identical to the visible <details> below so the
    // structured data matches the rendered DOM (Google FAQ-policy compliance).
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Step 3 easier than Step 2 CK?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, for most candidates. Step 3 focuses more on clinical decision-making rather than pure recall."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good Step 3 score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most residency programs only require a pass. Scores above 220 are generally considered safe."
        }
      },
      {
        "@type": "Question",
        "name": "When should I take Step 3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ideally during PGY-1 or early PGY-2, especially if applying for H1B visa programs."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "USMLE Predictor",
        "item": "https://usmlepredictor.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Step 3 Predictor",
        "item": "https://usmlepredictor.com/usmle-step-3-score-predictor"
      }
    ]
  };

  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/usmle-step-3-score-predictor',
    name: 'USMLE Step 3 Score Predictor',
    description: 'Free USMLE Step 3 score predictor anchored on PMC8368809 (n=27,118) Step 2 CK to Step 3 correlation research. Predicts 3-digit Step 3 score from Step 2 CK, UWorld, UWSA, NBME 6/7, and Free 137 inputs.',
    lastReviewed: '2026-07-02',
    about: 'USMLE Step 3 Examination',
    audience: 'residents',
  });

return (
  <div className="premium-page-container methodology-section">
    <SchemaMarkup schema={[schema, faqSchema, breadcrumbSchema, medicalSchema]} />

    {/* PREDICTOR — full mobile width (no premium-main-content padding) */}
    <Step3PredictorTool />

    {/* MAIN — SEO content only */}
    <main className="premium-main-content">

      {/* 🔥 TRUST STRIP */}
      <section className="premium-section text-center">
        <p className="text-sm text-slate-400">
          Used by 10,000+ medical students • Built with NBME & UWorld correlation data
        </p>
      </section>

      {/* Quick answer — self-contained, liftable facts (AI search / featured snippets) */}
      <section className="premium-section mt-10">
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6">
          <h2 className="text-lg font-bold text-white mb-2">Quick answer</h2>
          <p className="text-[#a0acc0] leading-relaxed m-0">
            The strongest single predictor of your USMLE Step 3 score is your Step 2 CK result
            (r&nbsp;=&nbsp;0.68 across 27,118 examinees). This free Step 3 predictor blends Step 2 CK with
            UWSA 1/2, UWorld %, and NBME Forms 6/7, then applies a CCS adjustment — case simulations count
            for roughly 25% of the total score and no practice form grades them. The passing standard is 200;
            the national mean is about 227.
          </p>
          <p className="text-xs text-slate-500 mt-3 mb-0">
            Last updated: July 2026 · <a href="/methodology/" className="text-indigo-400 hover:underline">How we calculate this</a>
          </p>
        </div>
      </section>

      {/* 📚 SEO CONTENT */}
      <section className="premium-section mt-16 leading-loose space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Step 3 Score Prediction: How It Actually Works
        </h2>

        <p className="text-[#a0acc0]">
          The USMLE Step 3 exam is the final licensing step for physicians, and predicting your score requires
          analyzing multiple performance signals rather than relying on a single exam. Our Step 3 predictor combines
          Step 2 CK baseline scores, UWorld QBank performance, and CCS simulation accuracy to estimate your final score range.
        </p>

        <p className="text-[#a0acc0]">
          <strong>Step 2 CK as Baseline:</strong> Your Step 2 CK score is the strongest predictor of Step 3 success.
          Most candidates scoring above 245 demonstrate extremely high pass probability on Step 3.
        </p>

        <p className="text-[#a0acc0]">
          <strong>UWorld Performance:</strong> First-pass percentages and subject-level strengths (especially biostatistics)
          are weighted into our prediction model.
        </p>

        <p className="text-[#a0acc0]">
          <strong>CCS Simulation Impact:</strong> CCS contributes about 25% of your score. Strong CCS performance
          significantly boosts your final predicted range.
        </p>

        {/* INTERNAL LINK = SEO BOOST */}
        <Link href="/step-3-accuracy-insights" className="text-indigo-400 hover:underline">
         👉 Read the full breakdown of our prediction methodology
        </Link>
      </section>

      {/* 🩺 CCS — the Step 3-specific component competitors gloss over */}
      <section className="premium-section mt-16 leading-loose space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          How CCS Cases Affect Your Predicted Step 3 Score
        </h2>

        <p className="text-[#a0acc0]">
          Computer-based Case Simulations (CCS) are what make Step 3 different from every other USMLE exam —
          interactive patient-management cases on Day 2 that count for roughly <strong>25% of your total score</strong>.
          No NBME form or UWSA grades them, which is why a multiple-choice-only prediction is incomplete.
        </p>

        <p className="text-[#a0acc0]">
          <strong>How our model handles CCS:</strong> you enter either your average percent-correct on CCS
          practice cases (UWorld CCS or ccscases.com) or a simple self-rating. The model then applies a
          calibrated adjustment on top of your multiple-choice estimate: strong CCS performance adds roughly
          <strong> +6 points</strong>, while self-rated &ldquo;struggled&rdquo; performance subtracts about{' '}
          <strong>−12 points</strong> — enough to pull an otherwise-passing MCQ score below the 200 passing line.
        </p>

        <p className="text-[#a0acc0]">
          <strong>Why CCS is an adjustment, not a matching input:</strong> in holdout testing, self-reported CCS
          percentages were too noisy to improve neighbor matching, so the model deliberately applies CCS as a
          post-hoc modifier instead of letting it distort the core prediction. That is also our honest advice for
          test day: aim for <strong>~70%+ on high-yield CCS practice cases</strong> so CCS builds your buffer
          rather than eroding it.
        </p>

        <Link href="/blog/step-3-score-predictor-nbme-uwsa-correlation/" className="text-indigo-400 hover:underline">
          👉 Full analysis: NBME 6/7 conversion, UWSA correlation &amp; the CCS factor
        </Link>
      </section>

      {/* ❓ FAQ */}
      <section className="premium-section mt-16 pt-8">

        <h2 className="mb-8 text-xl font-bold">Step 3 Predictor FAQs</h2>

        <details className="premium-faq-item">
          <summary className="premium-faq-question">
            Is Step 3 easier than Step 2 CK?
          </summary>
          <div className="premium-faq-answer">
            <p>
              Yes, for most candidates. Step 3 focuses more on clinical decision-making rather than pure recall.
            </p>
          </div>
        </details>

        <details className="premium-faq-item">
          <summary className="premium-faq-question">
            What is a good Step 3 score?
          </summary>
          <div className="premium-faq-answer">
            <p>
              Most residency programs only require a pass. Scores above 220 are generally considered safe.
            </p>
          </div>
        </details>

        <details className="premium-faq-item">
          <summary className="premium-faq-question">
            When should I take Step 3?
          </summary>
          <div className="premium-faq-answer">
            <p>
              Ideally during PGY-1 or early PGY-2, especially if applying for H1B visa programs.
            </p>
          </div>
        </details>

      </section>

    </main>
  </div>
  );
}
