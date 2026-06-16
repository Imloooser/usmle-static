import React from 'react';
import Link from 'next/link';
import { Activity, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import Step1PredictorTool from '@/components/Step1PredictorTool';
import ExamSwitcher from '@/components/ExamSwitcher';
import { medicalWebPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'USMLE Step 1 Score Predictor — PASS/FAIL Prediction Tool',
  description: 'Calculate your USMLE Step 1 pass probability from NBME forms 29–33, Free 120, and UWorld %, anchored on NBME\'s official July 2024 pass-probability table.',
  alternates: {
    canonical: 'https://usmlepredictor.com/usmle-step-1-score-predictor',
  },
  openGraph: {
    title: 'USMLE Step 1 Pass/Fail Predictor — Free, NBME-Anchored',
    description: 'Free Step 1 pass-probability predictor anchored on NBME\'s July 2024 published table. Calibrated on 100,000+ examinees.',
    url: 'https://usmlepredictor.com/usmle-step-1-score-predictor',
    type: 'website',
    images: [{ url: '/og-step-1.png', width: 1200, height: 630, alt: 'USMLE Step 1 Pass/Fail Score Predictor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USMLE Step 1 Pass/Fail Predictor (Free)',
    description: 'NBME-anchored pass-probability predictor for Step 1.',
    images: ['/og-step-1.png'],
  },
};

export default function Step1Predictor() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "USMLE Step 1 Score Predictor — PASS/FAIL Prediction Tool",
    "url": "https://usmlepredictor.com/usmle-step-1-score-predictor",
    "applicationCategory": "EducationApplication",
    "description": "Calculate your statistical probability of passing USMLE Step 1.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // Q&As kept byte-identical to the visible <details> below (FAQ-policy compliance).
      {
        "@type": "Question",
        "name": "Will you provide a 3-digit score equivalent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Because the actual exam has been PASS/FAIL since Jan 2022, providing a completely speculative 3-digit score yields false reassurance. Our tool focuses strictly on the margin of safety above the passing threshold."
        }
      },
      {
        "@type": "Question",
        "name": "What is considered a \"safe\" score on NBME practice exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally, consistently scoring above 65-68% equated percent correct on multiple recent NBME forms (like Forms 30 and 31) confers a 95%+ probability of passing the real exam."
        }
      },
      {
        "@type": "Question",
        "name": "Does UWorld First Pass percentage matter for Step 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, while UWorld is primarily a learning tool rather than an assessment tool, completing UWorld with an average above 60% historically correlates with a very high Step 1 passing likelihood."
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
        "name": "Step 1 Predictor",
        "item": "https://usmlepredictor.com/usmle-step-1-score-predictor"
      }
    ]
  };

  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/usmle-step-1-score-predictor',
    name: 'USMLE Step 1 Pass/Fail Predictor',
    description: 'Free USMLE Step 1 pass-probability predictor anchored on NBME\'s officially published CBSSA pass-probability table (July 2024). Calibrated on the full Step 1 examinee population.',
    lastReviewed: '2026-06-06',
    about: 'USMLE Step 1 Examination',
    audience: 'medical students',
  });

  return (
    <div className="premium-page-container methodology-section">
      <SchemaMarkup schema={[schema, faqSchema, breadcrumbSchema, medicalSchema]} />

      {/* PREDICTOR — full mobile width (no premium-main-content padding) */}
      <Step1PredictorTool />

      {/* MAIN — SEO content only (predictor renders above with its own width) */}
      <main className="premium-main-content ">

        {/* 🔥 TRUST STRIP */}
        <section className="premium-section text-center">
          <p className="text-sm text-slate-400">
            Calibrated exclusively for the Pass/Fail era (Post-Jan 2022) • Accurate Probability Analytics
          </p>
        </section>

        {/* 📚 SEO CONTENT */}
        <section className="premium-section mt-16 leading-loose space-y-6 ">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step 1 NBME Correlation and Prediction Analytics
          </h2>

          <p className="text-[#a0acc0]">
            Since USMLE Step 1 transitioned to a PASS/FAIL scoring system in January 2022, the strategy for preparation has fundamentally changed. The goal is no longer to secure a 260+, but to cross the passing threshold (equated to approximately a 196) with absolute statistical certainty.
          </p>

          <p className="text-[#a0acc0]">
            <strong>NBME Form Correlation:</strong> Modern predictors must abandon the older 3-digit score models. Instead, we analyze your "Equated Percent Correct" on recent NBME self-assessments (Forms 25 through 31). Historical data clearly dictates that consistent performance above 65-68% correlated to an extraordinarily high pass rate before the scoring transition, and this mathematical anchor remains the gold standard today.
          </p>

          <p className="text-[#a0acc0]">
            <strong>Free 120 and UWorld Significance:</strong> The "Free 120" assessment taken within one week of your exam date is the ultimate stamina and question-style benchmark. Paired with your UWorld QBank first-pass analytics, our probability engine establishes a confident percentage reflecting your passing buffer size, preventing false reassurance and unnecessary anxiety alike.
          </p>

          {/* INTERNAL LINK = SEO BOOST */}
          <Link href="/step-1-accuracy-insights" className="text-indigo-400 hover:underline">
            👉 Read the full breakdown of our prediction methodology
          </Link>
        </section>

        {/* ❓ FAQ */}
        <section className="premium-section pt-8">

          <div className="flex items-center gap-3">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="text-xl font-bold">Step 1 Predictor FAQs</h2>
          </div>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Will you provide a 3-digit score equivalent?
            </summary>
            <div className="premium-faq-answer">
              <p>
                No. Because the actual exam has been PASS/FAIL since Jan 2022, providing a completely speculative 3-digit score yields false reassurance. Our tool focuses strictly on the margin of safety above the passing threshold.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What is considered a "safe" score on NBME practice exams?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Generally, consistently scoring above 65-68% equated percent correct on multiple recent NBME forms (like Forms 30 and 31) confers a 95%+ probability of passing the real exam.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Does UWorld First Pass percentage matter for Step 1?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Yes, while UWorld is primarily a learning tool rather than an assessment tool, completing UWorld with an average above 60% historically correlates with a very high Step 1 passing likelihood.
              </p>
            </div>
          </details>

        </section>

      </main>
    </div>
  );
}
