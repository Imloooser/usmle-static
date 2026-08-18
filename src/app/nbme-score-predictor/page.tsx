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
  description: 'Convert your NBME self-assessment into a predicted Step 2 CK score. Per-form bias correction, 80% prediction interval, days-to-exam decay. Free.',
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
        <section className="quick-answer">
          <h2>Quick answer</h2>
          <p>
            NBME Form 14 is currently the most predictive self-assessment for Step 2 CK: it correlates at
            r&nbsp;=&nbsp;0.92 with the real exam, with 80% of predictions landing within ±5–7 points
            (n&nbsp;=&nbsp;5,039 verified outcomes). Forms 14–16 are calibrated to the current item bank;
            older forms (9–13) typically under-predict, so treat them as a floor rather than a target.
          </p>
          <p className="qa-meta">
            Last updated: July 2026 · <a href="/methodology/">How we calculate this</a>
          </p>
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

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-sm font-semibold text-white mb-3">Related reading</p>
            <ul className="accuracy-list">
              <li>
                <Link href="/blog/which-nbme-form-is-most-accurate/" className="text-indigo-400 hover:underline">
                  Which NBME form is most accurate?
                </Link>{' '}
                — Forms 13/14, UWSA 2 and the Free 120 ranked by correlation and bias, from 5,039 verified outcomes.
              </li>
              <li>
                <Link href="/blog/usmle-step-2-ck-score-prediction-guide/" className="text-indigo-400 hover:underline">
                  USMLE Step 2 CK score prediction guide
                </Link>{' '}
                — how to turn several practice scores into one honest prediction range.
              </li>
              <li>
                <Link href="/blog/how-to-calculate-step-1-pass-probability/" className="text-indigo-400 hover:underline">
                  Calculating a Step 1 pass probability from CBSSA
                </Link>{' '}
                — what to do with an equated percent correct when there is no 3-digit score.
              </li>
            </ul>
          </div>
        </section>

        {/* What NBME actually reports — CBSSA vs CCSSA */}
        <section className="premium-section mt-16 leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            What NBME Actually Reports — and Why Step 1 Is Different
          </h2>
          <p className="text-[#a0acc0]">
            This is the single most misunderstood thing about &ldquo;NBME score conversion.&rdquo; The two
            self-assessment products report fundamentally different things, and only one of them needs
            converting at all.
          </p>

          <div className="blog-table-wrapper" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#94a3b8', borderBottom: '1px solid rgba(148,163,184,0.2)' }}>
                  <th scope="col" style={{ padding: '12px 16px' }}></th>
                  <th scope="col" style={{ padding: '12px 16px' }}>CBSSA (Step 1)</th>
                  <th scope="col" style={{ padding: '12px 16px' }}>CCSSA (Step 2 CK)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
                  <td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>What you get</strong></td>
                  <td style={{ padding: '12px 16px' }}>Equated percent correct (e.g. 73%)</td>
                  <td style={{ padding: '12px 16px' }}>A 3-digit score (e.g. 201)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
                  <td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>Scale</strong></td>
                  <td style={{ padding: '12px 16px' }}>0–100</td>
                  <td style={{ padding: '12px 16px' }}>1–300 — same as the real exam</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
                  <td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>Probability of passing</strong></td>
                  <td style={{ padding: '12px 16px' }}>Yes</td>
                  <td style={{ padding: '12px 16px' }}>Yes</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>Conversion needed?</strong></td>
                  <td style={{ padding: '12px 16px' }}>Not possible — there is no 3-digit Step 1 score any more</td>
                  <td style={{ padding: '12px 16px' }}>Not to a different scale — but per-form bias correction still helps</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#a0acc0]">
            <strong>Why Step 1 has no 3-digit conversion.</strong> Step 1 became Pass/Fail on 26 January 2022.
            There is no 3-digit Step 1 score to predict any more, so NBME stopped providing one. Any site that
            converts your CBSSA percentage into a &ldquo;predicted Step 1 score&rdquo; is producing a number that
            appears on no score report. Use our{' '}
            <Link href="/usmle-step-1-score-predictor/" className="text-indigo-400 hover:underline">
              Step 1 pass probability calculator
            </Link>{' '}
            instead — it reports the thing that actually exists.
          </p>
          <p className="text-[#a0acc0]">
            <strong>And for Step 2 CK</strong>, your CCSSA already reports on the 1–300 scale. What it does{' '}
            <em>not</em> do is correct for the fact that individual forms run high or low against the real exam —
            which is exactly what the converter above applies.
          </p>
        </section>

        {/* The one official conversion NBME does publish */}
        <section className="premium-section mt-16 leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            The One Official Table NBME Does Publish
          </h2>
          <p className="text-[#a0acc0]">
            For Step 2 CK, NBME publishes a genuine score-to-probability table — and almost nobody uses it. Enter
            your CCSSA total score and read your probability of passing Step 2 CK if you test within about a week.
            Approximate values from NBME&rsquo;s published pass-probability data:
          </p>

          <div className="blog-table-wrapper" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#94a3b8', borderBottom: '1px solid rgba(148,163,184,0.2)' }}>
                  <th scope="col" style={{ padding: '12px 16px' }}>CCSSA score</th>
                  <th scope="col" style={{ padding: '12px 16px' }}>Probability of passing</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>≥ 239</strong></td><td style={{ padding: '12px 16px' }}>99%</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>230–232</strong></td><td style={{ padding: '12px 16px' }}>97%</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>225–226</strong></td><td style={{ padding: '12px 16px' }}>95%</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>218 (the passing score)</strong></td><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>~91%</strong></td></tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>212</strong></td><td style={{ padding: '12px 16px' }}>85%</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>206</strong></td><td style={{ padding: '12px 16px' }}>76%</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>194</strong></td><td style={{ padding: '12px 16px' }}>50%</td></tr>
                <tr><td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>≤ 161</strong></td><td style={{ padding: '12px 16px' }}>1%</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#a0acc0]">
            The insight most students miss: <strong className="text-white">a CCSSA score equal to the passing
            score gives you roughly a 91% chance of passing, not 100%</strong>. Matching the threshold on a
            practice test is not the same as clearing it, because the real exam carries measurement error. If you
            are sitting at the line on practice, you are not safe — you are a coin-flip away from the wrong side
            of a 9% tail.
          </p>
          <p className="text-[#a0acc0]">
            One date check worth doing: the Step 2 CK passing standard rose from 214 to{' '}
            <strong className="text-white">218 on 1 July 2025</strong>. Any pass-probability table published
            before that date is anchored to the old standard and will read optimistically. Ours is calibrated to
            218.
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
