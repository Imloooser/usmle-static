import React from 'react';
import ScorePredictor from '@/components/ScorePredictor';
import ExamSwitcher from '@/components/ExamSwitcher';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { webApplicationSchema, datasetSchema, medicalWebPageSchema } from '@/lib/schemas';
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'USMLE Step 2 CK Score Predictor — Free & Data-Backed (2026)',
  description: 'Free USMLE Step 2 CK score predictor built on 5,039 verified student outcomes. Enter your NBME, UWSA 2, or Free 120 score — get your predicted Step 2 score instantly. No account needed.',
  alternates: {
    canonical: 'https://usmlepredictor.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/',
    name: 'USMLE Step 2 CK Score Predictor',
    description: 'Free USMLE Step 2 CK score predictor anchored on 5,039 verified student outcomes. Predicts your 3-digit Step 2 CK score from NBME, UWSA, Free 120, and UWorld practice scores.',
    lastReviewed: '2026-06-06',
    about: 'USMLE Step 2 Clinical Knowledge Examination',
    audience: 'medical students',
  });

  return (
    <>
      {/* FAQPage schema intentionally NOT injected here: the homepage has no
          visible FAQ section, and FAQ structured data without matching on-page
          content is a Google structured-data policy violation. */}
      <SchemaMarkup schema={[webApplicationSchema, datasetSchema, medicalSchema]} />
      <ScorePredictor />
      
<section className="methodology-section">
  <div className="methodology-container">

    <h2 className="methodology-title">
      Why Trust USMLE Predictor?
    </h2>

    <p className="methodology-subtitle">
      Built on <strong>5,039 verified student score reports</strong> (2022–2026)
    </p>

    <div className="methodology-card">

      <ul className="methodology-list">
        <li>
          <strong>3-method ensemble algorithm:</strong>
          <span> KNN (40%) + Weighted Averages (35%) + Regression (25%)</span>
        </li>

        <li>
          <strong>NBME Form 14:</strong>
          <span className="methodology-highlight"> r = 0.92 correlation</span>
        </li>

        <li>
          <strong>UWSA 2:</strong>
          <span className="methodology-highlight"> r = 0.89 correlation</span>
        </li>
      </ul>

      <div className="methodology-cta">
        <a href="/accuracyinsights" className="methodology-link">
          See full accuracy data →
        </a>
      </div>

    </div>

  </div>
</section>

      {/* BreadcrumbList omitted on homepage — single-item breadcrumbs produce no rich result */}
    </>
  );
}
