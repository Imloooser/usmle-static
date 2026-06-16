import React from 'react';
import ScorePredictor from '@/components/ScorePredictor';
import ExamSwitcher from '@/components/ExamSwitcher';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { webApplicationSchema, datasetSchema, medicalWebPageSchema, faqSchema } from '@/lib/schemas';
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: {
    absolute: 'USMLE Score Predictor — Step 1, Step 2 CK & Step 3 (Free)',
  },
  description: 'Free USMLE Step 2 CK score predictor built on 5,039 verified student outcomes. Enter your NBME, UWSA 2, or Free 120 score for an instant predicted Step 2 score.',
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
      {/* FAQPage IS injected: a matching visible FAQ section is rendered below,
          so the structured data has on-page content backing it. */}
      <SchemaMarkup schema={[webApplicationSchema, datasetSchema, medicalSchema, faqSchema]} />
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

      {/* Direct-answer block + extractable data table (AI Overview / GEO friendly) */}
      <section className="methodology-section">
        <div className="methodology-container">
          <h2 className="methodology-title">How accurate is the Step 2 CK score predictor?</h2>
          <p className="methodology-subtitle">
            This free tool predicts your USMLE Step 2 CK score from your NBME, UWSA, UWorld, or Free 120
            practice scores using a 3-method ensemble trained on <strong>5,039 verified student outcomes</strong>.
            It reaches a Pearson correlation of <strong>r = 0.92</strong> with NBME Form 14, and 80% of
            predictions land within <strong>±5–7 points</strong> of the real Step 2 CK score.
          </p>

          <div className="methodology-card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#94a3b8', borderBottom: '1px solid rgba(148,163,184,0.25)' }}>
                  <th style={{ padding: '10px 12px' }}>Practice exam</th>
                  <th style={{ padding: '10px 12px' }}>Correlation (r)</th>
                  <th style={{ padding: '10px 12px' }}>Typical accuracy</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '10px 12px' }}><strong style={{ color: '#fff' }}>NBME Form 14</strong></td>
                  <td style={{ padding: '10px 12px' }}>0.92</td>
                  <td style={{ padding: '10px 12px' }}>±5–7 points</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '10px 12px' }}><strong style={{ color: '#fff' }}>UWSA 2</strong></td>
                  <td style={{ padding: '10px 12px' }}>0.89</td>
                  <td style={{ padding: '10px 12px' }}>±6–8 points</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '10px 12px' }}><strong style={{ color: '#fff' }}>NBME Form 13</strong></td>
                  <td style={{ padding: '10px 12px' }}>0.88</td>
                  <td style={{ padding: '10px 12px' }}>±6–9 points</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 12px' }}><strong style={{ color: '#fff' }}>Free 120</strong></td>
                  <td style={{ padding: '10px 12px' }}>0.85</td>
                  <td style={{ padding: '10px 12px' }}>±8–10 points</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Visible FAQ — byte-matches faqSchema so the FAQPage structured data is policy-safe */}
      <section className="premium-section" style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px 48px' }}>
        <h2 className="methodology-title" style={{ marginBottom: 20 }}>Frequently asked questions</h2>

        <details className="premium-faq-item">
          <summary className="premium-faq-question">How accurate is the USMLE Step 2 CK score predictor?</summary>
          <div className="premium-faq-answer"><p>USMLEPredictor.com achieves a Pearson correlation of r = 0.92 with NBME Form 14 inputs, with 80% of predictions within ±5–7 points of the actual USMLE Step 2 CK score. This is based on 5,039 verified student score reports collected from 2022 to 2026.</p></div>
        </details>
        <details className="premium-faq-item">
          <summary className="premium-faq-question">Which practice exams can I use to predict my Step 2 CK score?</summary>
          <div className="premium-faq-answer"><p>You can enter scores from NBME practice forms (Forms 9–32), UWSA 1, UWSA 2, and Free 120. Using multiple scores together increases prediction accuracy. NBME Form 14 and UWSA 2 are the strongest individual predictors.</p></div>
        </details>
        <details className="premium-faq-item">
          <summary className="premium-faq-question">Is USMLE Predictor free to use?</summary>
          <div className="premium-faq-answer"><p>Yes. USMLEPredictor.com is completely free. No account, login, or subscription is required. Enter your practice exam scores and receive your predicted Step 2 CK score instantly.</p></div>
        </details>
        <details className="premium-faq-item">
          <summary className="premium-faq-question">How is USMLEPredictor different from the Reddit score predictor?</summary>
          <div className="premium-faq-answer"><p>USMLEPredictor.com is built on 5,039 verified, document-confirmed score reports and uses a 3-method ensemble algorithm (K-Nearest Neighbors, Weighted Averages, and Per-Form Regression). The Reddit predictor relies on self-reported, unverified data and has not been updated since 2022.</p></div>
        </details>
        <details className="premium-faq-item">
          <summary className="premium-faq-question">Is USMLEPredictor affiliated with NBME or the official USMLE program?</summary>
          <div className="premium-faq-answer"><p>No. USMLEPredictor.com is an independent tool built by medical educators and data scientists. It is not affiliated with, endorsed by, or officially connected to NBME or the USMLE program.</p></div>
        </details>
        <details className="premium-faq-item">
          <summary className="premium-faq-question">Can I predict Step 1 or Step 3 scores too?</summary>
          <div className="premium-faq-answer"><p>Yes. Both the <a href="/usmle-step-1-score-predictor/">Step 1 (Pass/Fail) predictor</a> and the <a href="/usmle-step-3-score-predictor/">Step 3 score predictor</a> are available now on USMLEPredictor.com.</p></div>
        </details>

        <p style={{ color: '#64748b', fontSize: 13, marginTop: 24, textAlign: 'center' }}>By <a href="/accuracyinsights/" style={{ color: '#94a3b8' }}>Tao Leo</a>, Founder &amp; Lead Researcher · Last updated June 2026</p>
      </section>

      {/* BreadcrumbList omitted on homepage — single-item breadcrumbs produce no rich result */}
    </>
  );
}
