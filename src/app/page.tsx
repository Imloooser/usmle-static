import React from 'react';
import ScorePredictor from '@/components/ScorePredictor';
import Footer from '@/components/Footer';
import AdminRoute from '@/components/AdminRoute';
import SchemaMarkup from '@/components/SchemaMarkup';
import { webApplicationSchema, faqSchema } from '@/lib/schemas';
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
  return (
    <AdminRoute>
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

      <Footer stats={null} />

      {/* ✅ Structured data: WebApplication + FAQPage */}
      <SchemaMarkup schema={[webApplicationSchema, faqSchema]} />

      {/* BreadcrumbList omitted on homepage — single-item breadcrumbs produce no rich result */}
    </AdminRoute>
  );
}
