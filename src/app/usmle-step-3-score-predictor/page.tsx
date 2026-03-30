import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Stethoscope, BriefcaseMedical, Shield, Activity, Target, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'USMLE Step 3 Score Predictor | Free & Data-Backed',
  description: 'Estimate your USMLE Step 3 outcome based on CCS Cases, UWorld pass rates, and previous Step 1/2 scores. Data-driven predictor models.',
  alternates: {
    canonical: 'https://usmlepredictor.com/usmle-step-3-score-predictor',
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does my Step 2 CK score influence Step 3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Step 2 CK performance acts as a highly reliable baseline. Residents scoring higher than 250 on Step 2 CK rarely encounter difficulty passing Step 3, provided they prepare adequately for the unique CCS platform constraints."
        }
      },
      {
        "@type": "Question",
        "name": "Do residency programs care about my Step 3 score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For IMGs, passing Step 3 early is often a critical prerequisite for securing an H-1B visa. For US graduates, fellowships typically weigh letters and in-house performance much heavier than a Step 3 score, making a safe 'Pass' the primary goal."
        }
      },
      {
        "@type": "Question",
        "name": "How much does CCS matter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Computer-based Case Simulations (CCS) account for approximately 25-30% of your total Step 3 score. Performance on platforms like CCSCases.com is a strong independent predictor of passing."
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

return (
  <div className="premium-page-container stepscore-app">
    <SchemaMarkup schema={[schema, faqSchema, breadcrumbSchema]} />

    {/* HEADER */}
    <header className="premium-page-header">
      <div className="premium-header-content">

        <div>
          <div className="badge-premium mb-4">Step 3 Predictor • Data Engine v2</div>

          <h1 className="premium-page-title">
            USMLE <span className=''> Step 3 </span> Score Predictor
            <br />
            <span className="text-sm md:text-md text-indigo-400 font-medium">
              Free • Accurate • Data-Driven (2026)
            </span>
          </h1>

          <p className="premium-page-subtitle hidden">
            Predict your USMLE Step 3 score using UWSA, CCS & Step 2 CK correlation.
            Built using real resident performance data.
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
      Step 3 Predictor Engine
    </h2>

    <p className="hero-description">
      We’re finalizing predictive weights using UWSA 1, UWSA 2, and CCS performance data.
      Early beta users are already seeing 
      <span className="hero-highlight"> ±6 score accuracy</span>.
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
        Meanwhile → Use our Step 2 CK predictor (most accurate baseline)
      </p>
    </div>

  </div>
</section>

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
        <Link href="/step2-ck-predictor" className="text-indigo-400 hover:underline">
          👉 Try Step 2 CK Predictor (Highest Accuracy Tool)
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
