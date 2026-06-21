import React from 'react';
import Link from 'next/link';
import { Shield, HelpCircle, Target } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import { medicalWebPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'What Is a Good USMLE Step 2 CK Score? (2026 Averages by Specialty)',
  description: 'A good USMLE Step 2 CK score is ~250 (the matched-applicant mean). See 2026 average scores by specialty, percentiles, and what counts as competitive — backed by NRMP data.',
  alternates: { canonical: 'https://usmlepredictor.com/what-is-a-good-step-2-ck-score/' },
  openGraph: {
    title: 'What Is a Good USMLE Step 2 CK Score? (2026 by Specialty)',
    description: 'The matched-applicant mean is ~250. Average Step 2 CK scores by specialty, percentiles, and competitive targets for 2026.',
    url: 'https://usmlepredictor.com/what-is-a-good-step-2-ck-score/',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'What is a good USMLE Step 2 CK score' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Good USMLE Step 2 CK Score? (2026)',
    description: 'Mean ~250. Average Step 2 CK scores by specialty + percentiles.',
    images: ['/og-image.png'],
  },
};

// Approximate matched-applicant mean Step 2 CK scores (NRMP "Charting Outcomes" ranges).
const SPECIALTY_SCORES = [
  { tier: 'Less competitive', specialties: 'Family Medicine, Pediatrics, PM&R', range: '243–247' },
  { tier: 'Mid competitive', specialties: 'Internal Medicine, Psychiatry, EM, OB/GYN, Anesthesiology', range: '247–251' },
  { tier: 'Competitive', specialties: 'General Surgery, Radiology, Ophthalmology', range: '250–254' },
  { tier: 'Highly competitive', specialties: 'Dermatology, Orthopedics, Neurosurgery, ENT, Plastic Surgery', range: '255–262' },
];

const PERCENTILES = [
  { score: '≥ 265', pct: '~90th', label: 'Exceptional — top-tier for any specialty' },
  { score: '260', pct: '~75th', label: 'Very competitive, incl. surgical subspecialties' },
  { score: '250', pct: '~50th (median)', label: 'Solid — at or above the matched-applicant mean' },
  { score: '240', pct: '~30th', label: 'Below median — fine for less competitive specialties' },
  { score: '214', pct: '—', label: 'Minimum passing score' },
];

const FAQS = [
  {
    q: 'What is the average USMLE Step 2 CK score?',
    a: 'The mean Step 2 CK score for U.S. MD seniors who matched in 2026 is approximately 250, with a standard deviation of about 15 points. A score at or above 250 is therefore at or above the matched-applicant median.',
  },
  {
    q: 'What is a good Step 2 CK score for residency?',
    a: 'It depends on your target specialty. ~245 is competitive for family medicine and pediatrics, ~250 for internal medicine and emergency medicine, and 255–262 for highly competitive specialties like dermatology, orthopedics, and plastic surgery. Aim at or above your target programs’ 75th-percentile score.',
  },
  {
    q: 'What is the Step 2 CK passing score?',
    a: 'The minimum passing score for USMLE Step 2 CK is 214. The USMLE periodically reviews the passing standard, so confirm the current threshold on usmle.org. Most matched applicants score far above the passing line.',
  },
  {
    q: 'Does Step 2 CK matter more now that Step 1 is Pass/Fail?',
    a: 'Yes. Since USMLE Step 1 became Pass/Fail in January 2022, residency programs rely much more heavily on Step 2 CK as the primary numeric screen for interviews and ranking. It is now the single most important score on most applications.',
  },
  {
    q: 'What Step 2 CK score do I need for a competitive specialty?',
    a: 'Highly competitive specialties (dermatology, orthopedic surgery, neurosurgery, ENT, plastic surgery) have matched-applicant means in the high 250s to low 260s. To be competitive you generally want to be at or above 255–260, alongside strong research, clerkship grades, and letters.',
  },
  {
    q: 'How can I predict my Step 2 CK score before the exam?',
    a: 'Enter your NBME, UWSA, UWorld, or Free 120 practice scores into our free Step 2 CK predictor. It is built on 5,039 verified student outcomes and is accurate to within ±5–7 points (r = 0.92 with NBME Form 14).',
  },
];

export default function GoodStep2Score() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'USMLE Predictor', item: 'https://usmlepredictor.com/' },
      { '@type': 'ListItem', position: 2, name: 'What Is a Good Step 2 CK Score', item: 'https://usmlepredictor.com/what-is-a-good-step-2-ck-score/' },
    ],
  };

  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/what-is-a-good-step-2-ck-score/',
    name: 'What Is a Good USMLE Step 2 CK Score?',
    description: 'A good USMLE Step 2 CK score is ~250 (the matched-applicant mean). 2026 average scores by specialty and percentiles, backed by NRMP data.',
    lastReviewed: '2026-06-17',
    about: 'USMLE Step 2 Clinical Knowledge Examination',
    audience: 'medical students',
  });

  return (
    <div className="premium-page-container">
      <SchemaMarkup schema={[medicalSchema, faqSchema, breadcrumbSchema]} />

      <header className="premium-page-header">
        <div className="premium-header-content">
          <div>
            <div className="badge-premium mb-4">USMLE Step 2 CK · 2026 Data</div>
            <h1 className="premium-page-title">What Is a Good USMLE Step 2 CK Score?</h1>
            <p className="text-base text-[#a0acc0] max-w-2xl mt-4 leading-relaxed">
              A good Step 2 CK score is <strong className="text-white">around 250</strong> — the mean for U.S. MD
              seniors who matched in 2026. Scores above <strong className="text-white">260</strong> (≈75th percentile)
              are very competitive, and the minimum passing score is <strong className="text-white">214</strong>.
              What counts as &ldquo;good,&rdquo; though, depends heavily on your <strong className="text-white">target specialty</strong>.
            </p>
            <div className="cta-container mt-6">
              <Link href="/" className="cta-primary-button">Predict your Step 2 CK score →</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="premium-main-content">

        {/* Specialty table */}
        <section className="premium-section mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Average Step 2 CK Score by Specialty (2026)</h2>
          <p className="text-[#a0acc0] mb-6 leading-relaxed">
            Because USMLE Step 1 is now Pass/Fail, Step 2 CK is the primary numeric metric programs use to screen
            applicants. These are approximate matched-applicant means from NRMP <em>Charting Outcomes</em> data —
            individual program targets vary, so aim at or above your target programs&rsquo; 75th-percentile score.
          </p>
          <div style={{ overflowX: 'auto' }} className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#94a3b8', borderBottom: '1px solid rgba(148,163,184,0.2)' }}>
                  <th style={{ padding: '12px 16px' }}>Competitiveness</th>
                  <th style={{ padding: '12px 16px' }}>Example specialties</th>
                  <th style={{ padding: '12px 16px' }}>Mean Step 2 CK</th>
                </tr>
              </thead>
              <tbody>
                {SPECIALTY_SCORES.map((row) => (
                  <tr key={row.tier} style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
                    <td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>{row.tier}</strong></td>
                    <td style={{ padding: '12px 16px' }}>{row.specialties}</td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Percentile table */}
        <section className="premium-section mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Step 2 CK Score Percentiles</h2>
          <p className="text-[#a0acc0] mb-6 leading-relaxed">
            The Step 2 CK score distribution centers on a mean of ~250 with a standard deviation of ~15. Here is
            roughly where each score lands:
          </p>
          <div style={{ overflowX: 'auto' }} className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', color: '#cbd5e1' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#94a3b8', borderBottom: '1px solid rgba(148,163,184,0.2)' }}>
                  <th style={{ padding: '12px 16px' }}>Score</th>
                  <th style={{ padding: '12px 16px' }}>Percentile</th>
                  <th style={{ padding: '12px 16px' }}>What it means</th>
                </tr>
              </thead>
              <tbody>
                {PERCENTILES.map((row) => (
                  <tr key={row.score} style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
                    <td style={{ padding: '12px 16px' }}><strong style={{ color: '#fff' }}>{row.score}</strong></td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{row.pct}</td>
                    <td style={{ padding: '12px 16px' }}>{row.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why it matters */}
        <section className="premium-section mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">Why Step 2 CK Matters More in 2026</h2>
          <p className="text-[#a0acc0] leading-relaxed">
            When Step 1 reported a three-digit score, programs used it as the first numeric filter. Since Step 1
            became Pass/Fail in January 2022, that weight shifted almost entirely to Step 2 CK. It is now the
            single most important score on most residency applications — used for interview screening, ranking, and
            for meeting program score thresholds.
          </p>
          <p className="text-[#a0acc0] leading-relaxed">
            That means a &ldquo;good&rdquo; Step 2 CK score is the one that clears the bar for <em>your</em> specialty and
            programs. A 248 is comfortably competitive for internal medicine but below the mean for dermatology.
            The most useful thing you can do during dedicated study is track where your practice scores are
            trending and how much margin you have.
          </p>
        </section>

        {/* Predict CTA */}
        <section className="premium-section mt-12">
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Target className="text-indigo-300" size={22} />
              <h2 className="text-xl font-bold text-white m-0">Predict your real Step 2 CK score</h2>
            </div>
            <p className="text-[#a0acc0] leading-relaxed mb-4">
              Enter your NBME, UWSA 2, UWorld, or Free 120 scores into our free predictor — built on 5,039 verified
              student outcomes and accurate to within ±5–7 points (r = 0.92 with NBME Form 14). See exactly where
              you stand versus the ~250 mean and your target specialty.
            </p>
            <Link href="/" className="text-indigo-400 hover:underline font-medium">Use the free Step 2 CK predictor →</Link>
            <span className="text-[#64748b]"> · </span>
            <Link href="/accuracyinsights/" className="text-indigo-400 hover:underline font-medium">See accuracy &amp; methodology →</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="premium-section mt-12">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="text-indigo-400" size={26} />
            <h2 className="text-xl font-bold m-0">Frequently asked questions</h2>
          </div>
          {FAQS.map((f) => (
            <details className="premium-faq-item" key={f.q}>
              <summary className="premium-faq-question">{f.q}</summary>
              <div className="premium-faq-answer"><p>{f.a}</p></div>
            </details>
          ))}
        </section>

        {/* Disclaimer */}
        <section className="mt-16 pt-10 border-t border-white/5">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-500/10 ring-1 ring-white/10 shrink-0">
                <Shield className="text-slate-300" size={18} />
              </span>
              <h3 className="text-base font-bold text-white m-0">Disclaimer</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#9aa6bd] m-0 text-left">
              USMLEPredictor.com is an independent educational tool and is not affiliated with the NBME, FSMB, the
              USMLE program, or the NRMP. Specialty averages and percentiles are approximate and based on
              publicly published NRMP and USMLE data; they vary by year and program. Use them as guidance, not a
              guarantee, and confirm official figures on usmle.org and nrmp.org.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
