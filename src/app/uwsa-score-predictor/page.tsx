/**
 * INTEGRATION TEMPLATE — when ready, REPLACE the contents of
 *   src/app/uwsa-score-predictor/page.tsx
 * with this file (after first copying:
 *   - drafts/uwsa-converter/uwsaConverter.ts   → src/services/uwsaConverter.ts
 *   - drafts/uwsa-converter/UwsaConverter.tsx  → src/components/UwsaConverter.tsx
 * )
 */

import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import UwsaConverter from '@/components/UwsaConverter';
import { medicalWebPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'UWSA Score Converter | Corrects Overprediction · Free',
  description: 'Convert your UWSA 1 / 2 / 3 score into a bias-corrected predicted Step 2 CK score. Per-form correction, score-band ceiling adjustment, 80% interval. Free.',
  alternates: {
    canonical: 'https://usmlepredictor.com/uwsa-score-predictor',
  },
  openGraph: {
    title: 'UWSA to Step 2 CK Converter — Corrects Overprediction',
    description: 'UWSA overpredicts. We correct it. Bias-corrected Step 2 CK estimate with 80% interval.',
    url: 'https://usmlepredictor.com/uwsa-score-predictor',
    type: 'website',
    images: [{ url: '/og-uwsa.png', width: 1200, height: 630, alt: 'UWSA Score Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UWSA Score Converter (Free)',
    description: 'Corrects UWSA over-prediction with per-form bias adjustment.',
    images: ['/og-uwsa.png'],
  },
};

export default function UwsaPredictorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UWSA Score Converter',
    url: 'https://usmlepredictor.com/uwsa-score-predictor',
    applicationCategory: 'EducationApplication',
    description: 'Converts UWSA 1/2/3 scores to bias-corrected predicted Step 2 CK with score-band asymmetry handling.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        "@type": "Question",
        "name": "Why does UWSA over-predict?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UWSAs are calibrated on UWorld user populations who tend to score higher than the full Step 2 CK population. The form difficulty doesn't quite reach operational exam difficulty."
        }
      },
      {
        "@type": "Question",
        "name": "Which UWSA is most accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UWSA 2, taken within 1-2 weeks of the real exam. UWSA 1 over-predicts more. UWSA 3 has limited published validity."
        }
      },
      {
        "@type": "Question",
        "name": "What is the ceiling effect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Above UWSA 255, the prediction gap widens. Top scorers tend to lose 10-15 points relative to UWSA, even when other practice scores agree. We apply a progressive adjustment in this band."
        }
      },
    ],
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'USMLE Predictor', item: 'https://usmlepredictor.com/' },
      { '@type': 'ListItem', position: 2, name: 'UWSA Converter', item: 'https://usmlepredictor.com/uwsa-score-predictor' },
    ],
  };
  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/uwsa-score-predictor',
    name: 'UWSA Score Converter',
    description: 'Bias-corrected UWSA-to-Step-2-CK converter with score-band asymmetry handling.',
    lastReviewed: '2026-06-06',
    about: 'UWorld Self-Assessment (UWSA) for Step 2 CK',
    audience: 'medical students',
  });

  return (
    <div className="premium-page-container methodology-section">
      <SchemaMarkup schema={[schema, faqSchema, breadcrumbSchema, medicalSchema]} />

      {/* CONVERTER — full-width on mobile */}
      <UwsaConverter />

      {/* SEO content below */}
      <main className="premium-main-content">
        <section className="premium-section mt-16 leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            UWSA Overprediction & How We Correct It
          </h2>
          <p className="text-[#a0acc0]">
            UWorld&apos;s self-assessments (UWSA 1, 2, 3) are widely used as Step 2 CK predictors,
            but they have a documented over-prediction bias. UWSA 2 — the most-cited of the three —
            over-predicts actual Step 2 CK by ~3-5 points on average. UWSA 1 over-predicts more
            (often 5-8 pts), and both forms exhibit a stronger ceiling effect above 255, where the
            real-exam gap widens to 10-15 points.
          </p>
          <p className="text-[#a0acc0]">
            <strong>Our correction model</strong> applies a base bias offset specific to each UWSA
            form, plus a progressive ceiling adjustment for scores above 255. The output is a
            bias-corrected point estimate with an 80% prediction interval anchored on the published
            UWSA-to-Step-2-CK correlation (r ≈ 0.85-0.90 for UWSA 2).
          </p>
          <p className="text-[#a0acc0]">
            <strong>What this tool doesn&apos;t do:</strong> we don&apos;t reverse-engineer
            UWorld&apos;s proprietary scoring algorithm. We start from the 3-digit score UWSA already
            reports and apply empirical post-hoc bias correction. We are not affiliated with UWorld.
          </p>
        </section>

        <section className="premium-section pt-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="mb-0 text-xl font-bold">UWSA Converter FAQs</h2>
          </div>
          <details className="premium-faq-item">
            <summary className="premium-faq-question">Why does UWSA over-predict?</summary>
            <div className="premium-faq-answer"><p>UWSAs are calibrated on UWorld user populations who tend to score higher than the full Step 2 CK population. The form difficulty doesn&apos;t quite reach operational exam difficulty.</p></div>
          </details>
          <details className="premium-faq-item">
            <summary className="premium-faq-question">Which UWSA is most accurate?</summary>
            <div className="premium-faq-answer"><p>UWSA 2, taken within 1-2 weeks of the real exam. UWSA 1 over-predicts more. UWSA 3 has limited published validity.</p></div>
          </details>
          <details className="premium-faq-item">
            <summary className="premium-faq-question">What is the ceiling effect?</summary>
            <div className="premium-faq-answer"><p>Above UWSA 255, the prediction gap widens. Top scorers tend to lose 10-15 points relative to UWSA, even when other practice scores agree. We apply a progressive adjustment in this band.</p></div>
          </details>
        </section>
      </main>
    </div>
  );
}
