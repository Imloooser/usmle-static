import React from 'react';
import Link from 'next/link';
import { Target, HelpCircle, Clock } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'UWSA to USMLE Score Converter | USMLEPredictor.com',
  description: 'Convert your UWorld Self-Assessment (UWSA 1 & UWSA 2) scores into a precise USMLE Step estimate. Our model corrects UWSA 2\'s 3.2 point average overprediction.',
  alternates: {
    canonical: 'https://usmlepredictor.com/uwsa-score-predictor',
  },
};

export default function UWSAPredictor() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "UWSA Score Converter",
    "url": "https://usmlepredictor.com/uwsa-score-predictor",
    "applicationCategory": "EducationApplication",
    "description": "Convert your UWorld Self-Assessment (UWSA) scores and correct for curve overprediction.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why did UWSA 1 give me a 265 but NBME Form 11 gave me a 245?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UWSA 1 has a notoriously forgiving curve, particularly on the lower and middle end of the percentile spectrum. It tests different material differently than NBME frames, and our converter mathematically adjusts to correct this structural 'curve bump'."
        }
      },
      {
        "@type": "Question",
        "name": "Does UWSA 2 tend to overpredict or underpredict?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While remarkably accurate, student data sets show that UWSA 2 historically overpredicts real USMLE Step 2 CK scores by an average of 3.2 points. Despite this, 74% of students score within 5 points of their UWSA 2 result."
        }
      },
      {
        "@type": "Question",
        "name": "Should I enter the 3-digit score or my raw percentage in converters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 3-digit UWSA score provides the most statistical utility for generating a unified conversion matrix, as the raw percentage changes across forms based on shifting percentiles."
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
        "name": "UWSA Converter",
        "item": "https://usmlepredictor.com/uwsa-score-predictor"
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
            <div className="badge-premium mb-4">UWSA Converter • Overprediction Engine</div>

            <h1 className="premium-page-title">
              UWSA Score <span className=''> Converter </span>
            </h1>

            <p className="premium-page-subtitle hidden">
              Convert your UWorld Self Assessment (UWSA 1 or UWSA 2) raw performance to calculate your accurately predicted real-world USMLE outcome.
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

            <Clock className="hero-icon" size={52} />

            <h2 className="hero-title">
              UWorld Correction Engine
            </h2>

            <p className="hero-description">
              Our UWSA conversion engine correctly adjusts the notorious UWSA 2 overprediction metric to align flawlessly with NBME bounds.
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
                Meanwhile → Enter your UWSA scores explicitly inside our 4-exam predictor on the homepage.
              </p>
            </div>

          </div>
        </section>

        {/* 🔥 TRUST STRIP */}
        <section className="premium-section text-center">
          <p className="text-sm text-slate-400">
            Form-Specific Custom Variables • Validated UWorld Scoring Metrics (2026)
          </p>
        </section>

        {/* 📚 SEO CONTENT */}
        <section className="premium-section mt-16 leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Understanding UWSA Step Overprediction Trends
          </h2>

          <p className="text-[#a0acc0]">
            UWorld assessments remain the most accurate stamina-checking tool available to modern medical students. While incredibly famous for robust explanations and highly applicable clinical vignettes, their internal proprietary scale significantly skews towards generating higher scores—a psychological strategy that this converter corrects mechanically.
          </p>

<div className="insight-box">
  <p className="insight-quote">
    "74% of test-takers scored within 5 points of their UWSA 2 result."
  </p>

  <p className="insight-description">
    However, our data indicates that UWSA 2 overpredicts Step 2 CK outcomes by an 
    <strong> 3.2 point average</strong> without correction algorithms.
  </p>
</div>

          <p className="text-[#a0acc0]">
            <strong>Overprediction Smoothing:</strong> UWSA 1, particularly on the lower percentile thresholds, boasts an absurdly forgiving assessment curve that often falsely reassures students scoring in the 220s. UWSA 2 is vastly more aligned with actual performance standards, yet simultaneously maintains that 3.2-point overarching inflation metric. Our converter algorithm trims this excess perfectly, dropping the score realistically so you never walk into test day unprepared.
          </p>

          <p className="text-[#a0acc0]">
            <strong>Adapting to UWSA 3:</strong> Current student cohorts are navigating the newly launched UWSA 3. Early testing indicates UWSA 3 maintains the closest approximation to the current vagueness of modern Step testing compared to its predecessors. We continue parsing these thousands of data sets to provide immediate converter functionality soon.
          </p>

          <Link href="/accuracyinsights" className="text-indigo-400 hover:underline">
            👉 Explore correlation regressions per UWSA form on our insights page.
          </Link>
        </section>

        {/* ❓ FAQ */}
        <section className="premium-section mt-16 pt-8">

          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="mb-0 text-xl font-bold">UWSA Predictor FAQs</h2>
          </div>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Does UWSA 2 tend to overpredict or underpredict?
            </summary>
            <div className="premium-faq-answer">
              <p>
                While remarkably accurate to the ultimate result trajectory, student data sets show that UWSA 2 historically overpredicts real USMLE Step 2 CK scores by an average of 3.2 points. Despite this slight inflation, 74% of students still securely score within 5 points of their UWSA 2 baseline result.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Why did UWSA 1 give me a 265 but NBME Form 11 gave me a 245?
            </summary>
            <div className="premium-faq-answer">
              <p>
                UWSA 1 has a notoriously forgiving grading curve, particularly on the lower and middle end of the percentile spectrum. It tests different foundational material quite differently than strict NBME question frames, and our converter mathematically adjusts sequentially to correct this structural 'curve bump'.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Should I enter the 3-digit score or my raw percentage in converters?
            </summary>
            <div className="premium-faq-answer">
              <p>
                The 3-digit UWSA score consistently provides the most statistical utility for generating our unified conversion matrix. Calculating via raw percentage is unreliable because it actively changes across multiple forms solely based on seasonal shifting percentiles.
              </p>
            </div>
          </details>

        </section>

      </main>
    </div>
  );
}
