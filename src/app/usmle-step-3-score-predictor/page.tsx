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
    canonical: 'https://usmlepredictor.com/usmle-step-3-score-predictor/',
  },
  openGraph: {
    title: 'USMLE Step 3 Score Predictor — Free, Research-Anchored',
    description: 'Free Step 3 predictor anchored on PMC8368809 (n=27,118) Step 2 CK correlation. MAE ~7.9 points, 74% within ±10.',
    url: 'https://usmlepredictor.com/usmle-step-3-score-predictor/',
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
    "url": "https://usmlepredictor.com/usmle-step-3-score-predictor/",
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
        "item": "https://usmlepredictor.com/usmle-step-3-score-predictor/"
      }
    ]
  };

  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/usmle-step-3-score-predictor/',
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

      {/* 📚 SEO CONTENT — deep, H3-structured */}
      <section className="premium-section mt-16 leading-loose space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          Step 3 Score Prediction: How It Actually Works
        </h2>
        <p className="text-[#a0acc0]">
          Step 3 is the only USMLE that still returns a 3-digit score, and predicting it well means combining several
          signals rather than reading a single practice test. The model blends your Step 2 CK score, UWorld and UWSA
          performance, NBME Forms 6/7, and a CCS adjustment into one estimate with a pass probability.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-3">Step 2 CK: the strongest anchor (r = 0.68)</h3>
        <p className="text-[#a0acc0]">
          Your Step 2 CK score is the single best predictor of Step 3 — it correlates at roughly r = 0.68 across 27,118
          examinees (PMC8368809) and carries the most weight in the model. Most candidates in the mid-240s and above show
          a very high Step 3 pass probability. Because everyone taking Step 3 has already taken Step 2 CK, it is the one
          input we always anchor on.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-3">UWorld and UWSA — with a calibration correction</h3>
        <p className="text-[#a0acc0]">
          UWorld cumulative percentage and the UWSAs refine the estimate. The key adjustment: <strong>UWSA tends to
          under-predict real Step 3 by about 10 points</strong>, so the model recalibrates it rather than taking the raw
          number at face value. UWSA 2 (late-prep) is weighted more heavily than the noisier, often-early UWSA 1.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-3">NBME Forms 6/7 and Free 137</h3>
        <p className="text-[#a0acc0]">
          The official NBME CCSSA Forms 6 and 7 are read as a percent-correct signal anchored to the passing standard —
          roughly <strong>55% correct ≈ 200</strong> (passing), with each point above adding about 0.8. They are a
          secondary confirmation input alongside the official Free 137.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-3">CCS: the wildcard no MCQ score captures</h3>
        <p className="text-[#a0acc0]">
          Computer-based Case Simulations are about 25% of your total and are graded separately from every
          multiple-choice form — so the model applies them as an adjustment (detailed below) rather than a core input.
        </p>

        {/* INTERNAL LINK = SEO BOOST */}
        <Link href="/step-3-accuracy-insights/" className="text-indigo-400 hover:underline">
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

      {/* 📈 What's a good Step 3 score */}
      <section className="premium-section mt-16 leading-loose space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">What Is a Good Step 3 Score?</h2>
        <h3 className="text-xl font-bold text-white mt-6 mb-3">Passing standard and national mean</h3>
        <p className="text-[#a0acc0]">
          The Step 3 passing standard is <strong>200</strong> (raised from 198 on January 1, 2024), and the national
          mean is about <strong>227</strong> with a standard deviation near 15. For most residents a comfortable pass is
          the goal — the majority of programs never see or ask about the exact number.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-3">Percentiles and score bands</h3>
        <p className="text-[#a0acc0]">
          Roughly, ~220 is a solid pass, ~230 sits near the mean, and 240+ places you toward the top of the
          distribution; below 200 is a fail. Because the exam spans two days and includes CCS, treat any single estimate
          as a range rather than a precise number.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-3">Does the Step 3 score matter for fellowship?</h3>
        <p className="text-[#a0acc0]">
          For most applicants, no — a pass is what matters. A minority of competitive fellowships (some Cardiology or GI
          programs, for example) may glance at a strong Step 3 as a supporting data point, but it rarely outweighs your
          Step 2 CK and residency performance.
        </p>
      </section>

      {/* ⏱ When to take + timeline */}
      <section className="premium-section mt-16 leading-loose space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">When to Take Step 3 and How to Prepare</h2>
        <h3 className="text-xl font-bold text-white mt-6 mb-3">PGY-1 vs PGY-2 timing</h3>
        <p className="text-[#a0acc0]">
          Most US graduates sit Step 3 during PGY-1 or early PGY-2, frequently to clear visa or credentialing
          requirements. Taking it while Step 2 CK knowledge is still fresh generally makes preparation lighter.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-3">A workable dedicated plan</h3>
        <p className="text-[#a0acc0]">
          The exam runs across two days — Foundations of Independent Practice (FIP), which leans on biostatistics and
          drug mechanisms, and Advanced Clinical Medicine (ACM) plus CCS. A practical sequence: take UWSA 1 about three
          weeks out to surface Day-1 gaps, sit NBME Form 7 roughly one week out to fix your margin, and spend the final
          48 hours on high-yield CCS cases to protect your buffer.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-3">The single biggest mistake</h3>
        <p className="text-[#a0acc0]">
          Ignoring CCS. Residents comfortable with multiple-choice questions routinely under-prepare for the case
          simulations and lose the margin their MCQ score earned them. Aim for ~70%+ on CCS practice before test day.
        </p>
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
