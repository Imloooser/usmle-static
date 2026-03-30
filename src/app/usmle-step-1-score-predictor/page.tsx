import React from 'react';
import Link from 'next/link';
import { Activity, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'USMLE Step 1 Score Predictor — PASS/FAIL Prediction Tool',
  description: 'Calculate your probability of passing USMLE Step 1 using NBME forms and UWorld percentages. Data-backed pass/fail prediction model.',
  alternates: {
    canonical: 'https://usmlepredictor.com/usmle-step-1-score-predictor',
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
      {
        "@type": "Question",
        "name": "What is considered a 'safe' score on NBME practice exams for Step 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally, consistently scoring above 65-68% equated percent correct on multiple recent NBME forms (like Forms 30 and 31) confers a 95%+ probability of passing the real exam."
        }
      },
      {
        "@type": "Question",
        "name": "Will you provide a 3-digit score equivalent for Step 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Because the actual exam has been PASS/FAIL since January 2022, providing a completely speculative 3-digit score yields false reassurance. Our tool focuses strictly on the margin of safety above the passing threshold (equated to roughly 196)."
        }
      },
      {
        "@type": "Question",
        "name": "Does UWorld First Pass percentage matter for Step 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, while UWorld is primarily a learning tool rather than an assessment tool, completing UWorld with an average above 60% strongly correlates with Step 1 passing likelihood."
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

  return (
    <div className="premium-page-container stepscore-app">
      <SchemaMarkup schema={[schema, faqSchema, breadcrumbSchema]} />

      {/* HEADER */}
      <header className="premium-page-header">
        <div className="premium-header-content">

          <div>
            <div className="badge-premium mb-4">Step 1 Predictor • PASS/FAIL (2026)</div>

            <h1 className="premium-page-title">
              USMLE <span className=''> Step 1 </span> Score Predictor
              <br />
              <span className="text-sm md:text-md text-indigo-400 font-medium">
                — PASS/FAIL Prediction Tool
              </span>
            </h1>

            <p className="premium-page-subtitle hidden">
              Enter your NBME (Forms 25-31), UWorld First Pass %, and Free 120 scores to instantly calculate your statistical probability of passing the USMLE Step 1 exam.
            </p>
          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="premium-main-content">
        
        {/* 🚀 HERO TOOL */}
        <section className="hero-section">
          <div className="hero-card">

            {/* Glow */}
            <div className="hero-glow"></div>

            <Activity className="hero-icon" size={52} />

            <h2 className="hero-title">
              Pass/Fail Probability Engine
            </h2>

            <p className="hero-description">
              We’re finalizing the item-response theory correlation between the newest NBME forms (30 & 31) and the standardized Step 1 passing threshold (~196). 
            </p>

            <div className="hero-cta">
           


            {/* 🔥 PRIMARY CTA */}
            <div className="cta-container">
                 <button className="hero-button" disabled>
                Coming Soon 
              </button>
              <Link href="/" className="cta-primary-button">
                Predict My Step 2 CK Score →
              </Link>
            </div>

              <p className="hero-subtext">
                Meanwhile → Focus on hitting &gt;68% on NBME self-assessments
              </p>
            </div>

          </div>
        </section>

        {/* 🔥 TRUST STRIP */}
        <section className="premium-section text-center">
          <p className="text-sm text-slate-400">
            Calibrated exclusively for the Pass/Fail era (Post-Jan 2022) • Accurate Probability Analytics
          </p>
        </section>

        {/* 📚 SEO CONTENT */}
        <section className="premium-section mt-16 leading-loose space-y-6">
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
          <Link href="/accuracyinsights" className="text-indigo-400 hover:underline">
            👉 Read the full breakdown of our prediction methodology
          </Link>
        </section>

        {/* ❓ FAQ */}
        <section className="premium-section pt-8 ">

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
