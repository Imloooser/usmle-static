/**
 * INTEGRATION TEMPLATE — when ready, REPLACE the contents of
 *   src/app/nbme-score-predictor/page.tsx
 * with this file (after first copying:
 *   - drafts/nbme-converter/nbmeConverter.ts        → src/services/nbmeConverter.ts
 *   - drafts/nbme-converter/NbmeScorePredictor.tsx  → src/components/NbmeScorePredictor.tsx
 * )
 *
 * This keeps all existing SEO content + schema below the predictor, just
 * replaces the "Coming Soon" hero with the live converter component.
 */

import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import NbmeScorePredictor from '@/components/NbmeScorePredictor';
import { medicalWebPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'NBME Score Predictor | Convert NBME to USMLE Step 2 CK',
  description: 'Convert your raw NBME self-assessment score into a predicted USMLE Step 2 CK 3-digit score. Per-form bias correction, 80% prediction interval, days-to-exam decay. Free, no login.',
  alternates: {
    canonical: 'https://usmlepredictor.com/nbme-score-predictor/',
  },
  openGraph: {
    title: 'NBME Score Predictor & Converter — Free',
    description: 'Convert NBME forms 9-16 to a calibrated Step 2 CK estimate with honest 80% interval.',
    url: 'https://usmlepredictor.com/nbme-score-predictor/',
    type: 'website',
    images: [{ url: '/og-nbme.png', width: 1200, height: 630, alt: 'NBME Score Predictor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NBME Score Predictor (Free)',
    description: 'Per-form bias-corrected Step 2 CK prediction with honest interval.',
    images: ['/og-nbme.png'],
  },
};

export default function NbmePredictorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'NBME Score Predictor & Converter',
    url: 'https://usmlepredictor.com/nbme-score-predictor/',
    applicationCategory: 'EducationApplication',
    description: 'Converts NBME self-assessment scores to a predicted USMLE Step 2 CK score with per-form bias correction.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        "@type": "Question",
        "name": "Why does my actual NBME report show an Equated Percent Correct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NBME uses EPC because it is form-equated — a 70 EPC means the same content mastery whether you took Form 9 or Form 16. Raw percent correct is not comparable across forms."
        }
      },
      {
        "@type": "Question",
        "name": "Which NBME form is the most predictive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Forms 14-16 currently. They are calibrated against the current Step 2 CK item bank. Older forms (9-13) under-predict because they were calibrated against earlier test versions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I trust offline or older NBME forms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes for trajectory tracking, but expect to score above their prediction. Use older forms as a floor, not a target."
        }
      },
    ],
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'USMLE Predictor', item: 'https://usmlepredictor.com/' },
      { '@type': 'ListItem', position: 2, name: 'NBME Predictor', item: 'https://usmlepredictor.com/nbme-score-predictor/' },
    ],
  };
  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/nbme-score-predictor/',
    name: 'NBME Score Predictor',
    description: 'NBME-to-Step-2-CK converter with per-form bias correction.',
    lastReviewed: '2026-07-02',
    about: 'NBME CBSSA / CCSSA Step 2 CK Self-Assessment',
    audience: 'medical students',
  });

  return (
    <div className="premium-page-container">
      <SchemaMarkup schema={[schema, faqSchema, breadcrumbSchema, medicalSchema]} />

      {/* PREDICTOR — full-width on mobile (matches Step 1/3 pattern) */}
      <NbmeScorePredictor />

      {/* SEO content below */}
      <main className="premium-main-content">
        {/* Quick answer — self-contained, liftable facts (AI search / featured snippets) */}
        <section className="premium-section mt-10">
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6">
            <h2 className="text-lg font-bold text-white mb-2">Quick answer</h2>
            <p className="text-[#a0acc0] leading-relaxed m-0">
              NBME Form 14 is currently the most predictive self-assessment for Step 2 CK: it correlates at
              r&nbsp;=&nbsp;0.92 with the real exam, with 80% of predictions landing within ±5–7 points
              (n&nbsp;=&nbsp;5,039 verified outcomes). Forms 14–16 are calibrated to the current item bank;
              older forms (9–13) typically under-predict, so treat them as a floor rather than a target.
            </p>
            <p className="text-xs text-slate-500 mt-3 mb-0">
              Last updated: July 2026 · <a href="/methodology/" className="text-indigo-400 hover:underline">How we calculate this</a>
            </p>
          </div>
        </section>

        <section className="premium-section mt-16 leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Understanding NBME Form-to-Step Conversions
          </h2>
          <p className="text-[#a0acc0]">
            NBME self-assessment forms (CBSSA for Step 1, CCSSA for Step 2 CK) report your performance as an
            Equated Percent Correct (EPC) on a 0-100 scale plus a 3-digit equivalent that approximates
            current Step 2 CK scoring. NBME does not publish the official conversion tables — the values
            you see on your report come from their internal item-response-theory equating model.
          </p>
          <p className="text-[#a0acc0]">
            <strong>Form-specific bias matters.</strong> Across thousands of community-reported pairs,
            NBME 9 systematically under-predicts the real Step 2 CK score by ~10 points, while NBME 14-16
            (the newest forms) are calibrated within ~3 points of actual outcomes. Our converter applies a
            per-form bias correction that matches each form's empirical track record.
          </p>
          <p className="text-[#a0acc0]">
            <strong>Days-to-exam decay.</strong> Students typically score above their NBME prediction
            when the practice exam was taken several weeks before the real test, because of continued
            study and exam-day adrenaline. We apply the Tackett 2021 decay model (PMC8368818) as a
            soft adjustment when you tell us how far out you are.
          </p>
        </section>

        <section className="premium-section pt-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="mb-0 text-xl font-bold">NBME Predictor FAQs</h2>
          </div>
          <details className="premium-faq-item">
            <summary className="premium-faq-question">Why does my actual NBME report show an Equated Percent Correct?</summary>
            <div className="premium-faq-answer"><p>NBME uses EPC because it is form-equated — a 70 EPC means the same content mastery whether you took Form 9 or Form 16. Raw percent correct is not comparable across forms.</p></div>
          </details>
          <details className="premium-faq-item">
            <summary className="premium-faq-question">Which NBME form is the most predictive?</summary>
            <div className="premium-faq-answer"><p>Forms 14-16 currently. They are calibrated against the current Step 2 CK item bank. Older forms (9-13) under-predict because they were calibrated against earlier test versions.</p></div>
          </details>
          <details className="premium-faq-item">
            <summary className="premium-faq-question">Can I trust offline or older NBME forms?</summary>
            <div className="premium-faq-answer"><p>Yes for trajectory tracking, but expect to score above their prediction. Use older forms as a floor, not a target.</p></div>
          </details>
        </section>
      </main>
    </div>
  );
}
