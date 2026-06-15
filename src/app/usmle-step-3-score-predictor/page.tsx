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
    "description": "Calculate your USMLE Step 3 Score accurately using UWorld, CCS Cases, and historic parameters.",
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
    lastReviewed: '2026-06-06',
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

      {/* 📚 SEO CONTENT */}
      <section className="premium-section mt-16 leading-loose space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Step 3 Score Prediction: How It Actually Works
        </h2>

        <p className="text-[#a0acc0] hidden">
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
          <strong>CCS Simulation Impact:</strong> CCS contributes up to 30% of your score. Strong CCS performance
          significantly boosts your final predicted range.
        </p>

        {/* INTERNAL LINK = SEO BOOST */}
        <Link href="/step-3-accuracy-insights" className="text-indigo-400 hover:underline">
         👉 Read the full breakdown of our prediction methodology
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
