import React from 'react';
import Link from 'next/link';
import { Target, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'NBME Score Predictor | Convert NBME to USMLE Step',
  description: 'Convert your raw NBME self-assessment scores into a highly accurate projected 3-digit USMLE score using verified historical data curves.',
  alternates: {
    canonical: 'https://usmlepredictor.com/nbme-score-predictor',
  },
};

export default function NBMEPredictor() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NBME Score Predictor",
    "url": "https://usmlepredictor.com/nbme-score-predictor",
    "applicationCategory": "EducationApplication",
    "description": "Calculate and convert your NBME Self-Assessment scores.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why does my actual NBME report show an Equated Percent Correct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The official NBME score report often provides an equated percent correct instead of a 3-digit score. Tools like ours convert that percentage into a projected Step 1 pass probability or Step 2 CK 3-digit score using data-backed curves."
        }
      },
      {
        "@type": "Question",
        "name": "Which NBME form is the most predictive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For Step 2 CK, NBME Form 14 is currently the most predictive with an incredibly high r=0.92 correlation to real outcomes. Historically, Form 11 also maintained strong predictive power."
        }
      },
      {
        "@type": "Question",
        "name": "Can I trust offline or older NBME forms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Offline and older forms are excellent for content review and testing stamina, however their score curves are often drastically outdated. Always weigh the newest online forms heavier."
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
        "name": "NBME Predictor",
        "item": "https://usmlepredictor.com/nbme-score-predictor"
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
            <div className="badge-premium mb-4">NBME Tool • Forms 9–32</div>

            <h1 className="premium-page-title">
              NBME Score Predictor <span className=''> & Converter </span>
            </h1>

            <p className="premium-page-subtitle hidden">
              Standalone utility to convert any past or present National Board of Medical Examiners (NBME) self-assessment into an accurate USMLE Step approximation using empirical scaling.
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

            <Target className="hero-icon" size={52} />

            <h2 className="hero-title">
              NBME Scoring Engine
            </h2>

            <p className="hero-description">
              Our isolated NBME form conversion tool is currently scaling datasets for upcoming major additions to the NBME pool line-up.
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
                Meanwhile → Enter your NBME score inside our 4-exam predictor on the homepage.
              </p>
            </div>

          </div>
        </section>

        {/* 🔥 TRUST STRIP */}
        <section className="premium-section text-center">
          <p className="text-sm text-slate-400">
            Form-Specific Custom Variables • Validated Step 2 CK Scaling Sets (2026)
          </p>
        </section>

        {/* 📚 SEO CONTENT */}
        <section className="premium-section leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Understanding Isolated Form-Level NBME Conversions
          </h2>

          <p className="text-[#a0acc0]">
            The <strong>NBME Score Predictor</strong> differs from wide-net ensemble models by focusing purely on extracting the most precise projection metric from a *single* NBME assessment form. It natively accounts for form-level difficulty discrepancies immediately—removing the need for a generic 'average' across drastically different test environments.
          </p>

          <p className="text-[#a0acc0]">
            <strong>Accounting for Age:</strong> NBME Form 9 scales entirely differently than Form 14 because internal pool difficulty shifts drastically year-over-year. As forms age, they tend to severely underpredict or overpredict your score depending on whether the USMLE question-writers pivoted to broader basic sciences or deeper clinical diagnosis paradigms. We mathematically compensate for age-related scale degradation.
          </p>

          <p className="text-[#a0acc0]">
            <strong>Translating Percentages:</strong> Most modern official NBME score reports have shifted towards providing an "Equated Percent Correct" instead of a comforting 3-digit score. Since the entire USMLE experience centers strongly on the final three digits (for Step 2 CK), our converter parses raw, offline, or percentage-based score lines and correctly maps them back to the 3-digit curve.
          </p>

          <Link href="/accuracyinsights" className="text-indigo-400 hover:underline">
            👉 Explore correlation regressions per NBME form on our insights page.
          </Link>
        </section>

        {/* ❓ FAQ */}
        <section className="premium-section mt-16 pt-8">

          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="mb-0 text-xl font-bold">NBME Predictor FAQs</h2>
          </div>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Why does my actual NBME report show an Equated Percent Correct?
            </summary>
            <div className="premium-faq-answer">
              <p>
                The official NBME score report often provides an equated percent correct instead of a 3-digit score. Tools like ours convert that percentage into a projected Step 1 pass probability or Step 2 CK 3-digit score using data-backed curves.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Which NBME form is the most predictive?
            </summary>
            <div className="premium-faq-answer">
              <p>
                For Step 2 CK, NBME Form 14 is currently the most predictive with an incredibly high r=0.92 correlation to real outcomes. Forms 10 and 11 also maintained famously strong predictive power.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Can I trust offline or older NBME forms?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Offline and older forms are excellent for content review and testing real-world exam timing stamina, however their score curves are often drastically outdated. Always weigh the newest online forms heavier in your prediction equation!
              </p>
            </div>
          </details>

        </section>

      </main>
    </div>
  );
}
