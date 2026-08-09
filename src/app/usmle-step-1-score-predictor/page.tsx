import React from 'react';
import Link from 'next/link';
import { Activity, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import Step1PredictorTool from '@/components/Step1PredictorTool';
import ExamSwitcher from '@/components/ExamSwitcher';
import { medicalWebPageSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'USMLE Step 1 Pass Probability Calculator — Free, NBME-Anchored',
  description: 'Check your USMLE Step 1 pass probability from NBME forms 29–33, Free 120, and UWorld %. Anchored on NBME\'s official July 2024 pass-probability table — see what NBME score predicts a pass.',
  alternates: {
    canonical: 'https://usmlepredictor.com/usmle-step-1-score-predictor/',
  },
  openGraph: {
    title: 'USMLE Step 1 Pass Probability Calculator — Free, NBME-Anchored',
    description: 'Free Step 1 pass-probability predictor anchored on NBME\'s July 2024 published table. Calibrated on 100,000+ examinees.',
    url: 'https://usmlepredictor.com/usmle-step-1-score-predictor/',
    type: 'website',
    images: [{ url: '/og-step-1.png', width: 1200, height: 630, alt: 'USMLE Step 1 Pass/Fail Score Predictor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USMLE Step 1 Pass/Fail Predictor (Free)',
    description: 'NBME-anchored pass-probability predictor for Step 1.',
    images: ['/og-step-1.png'],
  },
};

export default function Step1Predictor() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "USMLE Step 1 Pass Probability Calculator",
    "url": "https://usmlepredictor.com/usmle-step-1-score-predictor/",
    "applicationCategory": "EducationApplication",
    "description": "Calculate your statistical probability of passing USMLE Step 1 from NBME forms 29–33, Free 120, and UWorld %.",
    "isAccessibleForFree": true,
    "featureList": [
      "Pass probability from NBME CBSSA Forms 29–33 (NBME July 2024 table)",
      "Free 120 and UWorld % as corroborating signals",
      "Recency weighting — recent forms count more",
      "Pass/Fail-era calibration (post-January 2022)"
    ],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // Q&As kept byte-identical to the visible <details> below (FAQ-policy compliance).
      {
        "@type": "Question",
        "name": "Will you provide a 3-digit score equivalent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Because the actual exam has been PASS/FAIL since Jan 2022, providing a completely speculative 3-digit score yields false reassurance. Our tool focuses strictly on the margin of safety above the passing threshold."
        }
      },
      {
        "@type": "Question",
        "name": "What is considered a \"safe\" score on NBME practice exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally, consistently scoring above 65-68% equated percent correct on multiple recent NBME forms (like Forms 30 and 31) confers a 95%+ probability of passing the real exam."
        }
      },
      {
        "@type": "Question",
        "name": "Does UWorld First Pass percentage matter for Step 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, while UWorld is primarily a learning tool rather than an assessment tool, completing UWorld with an average above 60% historically correlates with a very high Step 1 passing likelihood."
        }
      },
      {
        "@type": "Question",
        "name": "What NBME score guarantees a pass on Step 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No practice score guarantees a pass. But NBME's published pass-probability data shows that consistently scoring above 65–68% equated percent correct on recent forms (29–33) corresponds to a 95%+ probability of passing. Enter your exact form and score into the calculator above to get your personalized probability."
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
        "name": "Step 1 Predictor",
        "item": "https://usmlepredictor.com/usmle-step-1-score-predictor/"
      }
    ]
  };

  const medicalSchema = medicalWebPageSchema({
    url: 'https://usmlepredictor.com/usmle-step-1-score-predictor/',
    name: 'USMLE Step 1 Pass/Fail Predictor',
    description: 'Free USMLE Step 1 pass-probability predictor anchored on NBME\'s officially published CBSSA pass-probability table (July 2024). Calibrated on the full Step 1 examinee population.',
    lastReviewed: '2026-07-02',
    about: 'USMLE Step 1 Examination',
    audience: 'medical students',
  });

  return (
    <div className="premium-page-container methodology-section">
      <SchemaMarkup schema={[schema, faqSchema, breadcrumbSchema, medicalSchema]} />

      {/* PREDICTOR — full mobile width (no premium-main-content padding) */}
      <Step1PredictorTool />

      {/* MAIN — SEO content only (predictor renders above with its own width) */}
      <main className="premium-main-content ">

        {/* 🔥 TRUST STRIP */}
        <section className="premium-section text-center">
          <p className="text-sm text-slate-400">
            Calibrated exclusively for the Pass/Fail era (Post-Jan 2022) • Accurate Probability Analytics
          </p>
        </section>

        {/* Quick answer — self-contained, liftable facts (AI search / featured snippets) */}
        <section className="quick-answer">
          <h2>Quick answer</h2>
          <p>
            This free Step 1 predictor converts your NBME (Forms 29–33), Free 120, and UWorld percentages
            into a probability of passing, anchored on the NBME&apos;s officially published pass-probability
            table (July 2024). USMLE Step 1 has been Pass/Fail since January 26, 2022 — there is no 3-digit
            score — so readiness means a high pass probability (95%+) on a recent form with a flat or rising
            trend.
          </p>
          <p className="qa-meta">
            Last updated: July 2026 · <a href="/methodology/">How we calculate this</a>
          </p>
        </section>

        {/* 📚 SEO CONTENT — deep, H3-structured */}
        <section className="premium-section mt-16 leading-loose space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            How the Step 1 Pass Probability Predictor Works
          </h2>
          <p className="text-[#a0acc0]">
            Since USMLE Step 1 became <strong>Pass/Fail on January 26, 2022</strong>, preparation is no longer about
            chasing a 3-digit score — there isn&apos;t one anymore. The only question that matters is whether you hold a
            comfortable statistical margin above the passing standard. This tool answers exactly that: it converts your
            practice performance into a <strong>probability of passing</strong>, not a speculative score.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">The NBME pass-probability anchor (July 2024)</h3>
          <p className="text-[#a0acc0]">
            The estimate is anchored on the NBME&apos;s officially published <strong>CBSSA pass-probability table</strong>
            from its July 2024 Score Interpretation Guidance. That table is built on the entire Step 1 examinee
            population — over 100,000 test-takers a year — using the same Item Response Theory framework the NBME uses to
            set the passing standard. Anchoring on that source data, rather than a self-reported spreadsheet, is why the
            estimate holds up.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Which NBME forms are most predictive: Forms 29–33</h3>
          <p className="text-[#a0acc0]">
            Weight your <strong>most recent</strong> self-assessments. Forms 29–33 are calibrated to the current Step 1
            content and difficulty, so they mirror the live exam most closely, and Forms 32 and 33 are the newest and
            strongest single predictors. Older forms (25–28) run on harsher, less representative curves and tend to
            under-predict — use them as early baselines, not as your readiness signal.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Free 120 and UWorld as corroborating signals</h3>
          <p className="text-[#a0acc0]">
            The official <strong>Free 120</strong>, taken within a week of your exam, is the best preview of interface,
            stamina, and question style — treat it as a confidence check rather than a precise score. A high{' '}
            <strong>UWorld</strong> first-pass average (roughly 60%+) corroborates readiness but, as a learning tool
            rather than an assessment, it is a weaker standalone signal. The model weights both below your NBME forms.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Why recency and consistency beat one high score</h3>
          <p className="text-[#a0acc0]">
            A single form carries real measurement noise. Two consecutive recent forms showing a comfortable margin is a
            far stronger signal than one lucky spike, and a flat-or-rising trend matters more than any individual number.
            The predictor weights recent results more heavily, so an early low baseline does not unfairly drag down a
            genuinely improved current position.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4 mt-12">
            What NBME Score Means You&apos;re Ready for Step 1?
          </h2>
          <p className="text-[#a0acc0]">
            No practice score guarantees a pass, but the NBME&apos;s data maps performance to a probability of passing.
            As a rough guide on recent forms (29–33):
          </p>
          <ul className="accuracy-list">
            <li><strong>~68%+ equated percent correct:</strong> a comfortable margin — around a 95%+ probability of passing.</li>
            <li><strong>~65–67%:</strong> likely to pass; take one more recent form to confirm the trend.</li>
            <li><strong>~60–64%:</strong> borderline — a thin margin; shore up your weakest systems before testing.</li>
            <li><strong>Below ~60%:</strong> elevated fail risk; consider delaying and rebuilding your foundation.</li>
          </ul>
          <p className="text-[#a0acc0]">
            Enter your exact form and score above for a personalized probability rather than relying on these bands.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4 mt-12">Common Step 1 Readiness Scenarios</h2>
          <h3 className="text-xl font-bold text-white mt-6 mb-3">Strong and consistent</h3>
          <p className="text-[#a0acc0]">
            Two recent forms in the high-60s or above, trending flat or up — you have margin. The main risk left is
            test-day execution, not knowledge. Lock in your timing with the Free 120 and sit the exam.
          </p>
          <h3 className="text-xl font-bold text-white mt-6 mb-3">Borderline or one low form</h3>
          <p className="text-[#a0acc0]">
            A single low form among otherwise-solid scores is usually content-specific. Do a blind review to separate
            content gaps from process errors, spend a focused block on your weakest systems, then re-test on a newer
            form (32 or 33) before committing to a date.
          </p>
          <h3 className="text-xl font-bold text-white mt-6 mb-3">Rising from a low baseline</h3>
          <p className="text-[#a0acc0]">
            An early Form 25 in the 50s followed by a recent Form 32 in the mid-60s is an <em>upward trajectory</em>, and
            the predictor reads it that way — the recent form dominates. Keep building margin instead of anchoring on the
            old low.
          </p>
          <h3 className="text-xl font-bold text-white mt-6 mb-3">International medical graduates (IMGs)</h3>
          <p className="text-[#a0acc0]">
            The NBME calibration is population-wide, so the pass-probability relationship holds regardless of your school.
            The practical advice is identical: weight recent forms, build a margin above the line, and confirm stamina on
            the Free 120.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4 mt-12">How Accurate Is This Prediction?</h2>
          <p className="text-[#a0acc0]">
            A probability is a population statistic, not a promise about you specifically. A 95% probability of passing
            means most students with your exact profile pass — not every one of them. Treat the number as a margin of
            safety, and combine it with official NBME self-assessments rather than reading it as a guarantee. For the
            full calibration and validation detail, see our{' '}
            <Link href="/step-1-accuracy-insights/" className="text-indigo-400 hover:underline">Step 1 accuracy insights</Link>{' '}
            and our{' '}
            <Link href="/methodology/" className="text-indigo-400 hover:underline">prediction methodology</Link>.
          </p>
        </section>

        {/* ❓ FAQ */}
        <section className="premium-section pt-8">

          <div className="flex items-center gap-3">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="text-xl font-bold">Step 1 Predictor FAQs</h2>
          </div>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Will you provide a 3-digit score equivalent?
            </summary>
            <div className="premium-faq-answer">
              <p>
                No. Because the actual exam has been PASS/FAIL since Jan 2022, providing a completely speculative 3-digit score yields false reassurance. Our tool focuses strictly on the margin of safety above the passing threshold.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What is considered a "safe" score on NBME practice exams?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Generally, consistently scoring above 65-68% equated percent correct on multiple recent NBME forms (like Forms 30 and 31) confers a 95%+ probability of passing the real exam.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Does UWorld First Pass percentage matter for Step 1?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Yes, while UWorld is primarily a learning tool rather than an assessment tool, completing UWorld with an average above 60% historically correlates with a very high Step 1 passing likelihood.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What NBME score guarantees a pass on Step 1?
            </summary>
            <div className="premium-faq-answer">
              <p>
                No practice score guarantees a pass. But NBME&apos;s published pass-probability data shows that consistently scoring above 65–68% equated percent correct on recent forms (29–33) corresponds to a 95%+ probability of passing. Enter your exact form and score into the calculator above to get your personalized probability.
              </p>
            </div>
          </details>

        </section>

      </main>
    </div>
  );
}
