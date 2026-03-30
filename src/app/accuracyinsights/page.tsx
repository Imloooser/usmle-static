import React from 'react';
import Link from 'next/link';
import { BarChart3, Shield, Target, HelpCircle, Activity } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { scholarlyArticleSchema, accuracyBreadcrumbSchema } from '@/lib/schemas';
import { Metadata } from 'next';

const ACCURACY_DATA = [
  { test: 'NBME Form 14', accuracy: '±5-7 points', correlation: '0.92', notes: 'Currently the most predictive NBME form for Step 2 CK 2025/Soon.' },
  { test: 'UWSA 2', accuracy: '±6-8 points', correlation: '0.89', notes: 'Highly reliable but tends to overpredict by 3.2 points on average.' },
  { test: 'Free 120', accuracy: '±8-10 points', correlation: '0.85', notes: 'Best used as a final verification of testing stamina and logic.' },
  { test: 'NBME Form 13', accuracy: '±6-9 points', correlation: '0.88', notes: 'Strong predictor, slightly less precise than Form 14.' },
];

export const metadata: Metadata = {
  title: 'USMLE Step 2 CK Accuracy Insights & Correlation Data',
  description: 'Statistical accuracy analysis of USMLE Step 2 CK score predictors based on 5,039 verified student score reports. Pearson correlations, precision ranges, and ensemble methodology.',
  alternates: {
    canonical: 'https://usmlepredictor.com/accuracyinsights',
  },
};

export default function AccuracyInsights() {
  return (
    <div className="premium-page-container">
      <SchemaMarkup schema={[scholarlyArticleSchema, accuracyBreadcrumbSchema]} />

      {/* HEADER */}
      <header className="premium-page-header">
        <div className="premium-header-content">
          <div>
            <div className="badge-premium mb-4">Research • Verified Dataset: 5,039 Reports</div>

            <h1 className="premium-page-title">
              Accuracy Insights <span className=''> & Correlation </span>
            </h1>

            <span className="text-sm md:text-sm text-indigo-400 font-medium">
              Last Updated: March 2026 | Dataset: 5,039 Verified Student Score Reports (2022–2026)
            </span>

            <p className="text-sm md:text-md hidden md:block font-medium">
              This page documents the statistical accuracy of USMLEPredictor.com's score prediction engine. All data presented here is derived directly from our internal dataset of verified USMLE test-taker
              outcomes. We publish this information openly so medical students can make informed decisions
              about how to interpret their practice exam scores
            </p>

            {/* 🔥 PRIMARY CTA */}
            <div className="cta-container">
              <Link href="/" className="cta-primary-button">
                Use The Step 2 CK Predictor →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="premium-main-content">

        {/* 📚 SEO CONTENT */}
        <section className="premium-section mt-16 leading-loose space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            About This Dataset
          </h2>

          <p className="text-[#a0acc0]">
            USMLEPredictor.com's prediction model is built on 5,039 verified student score reports collected
            between January 2022 and March 2026. This is the largest independently collected dataset of
            USMLE practice-to-actual score correlations available through a free public tool.
          </p>



          <div className="">
            <div className="p-6 rounded-xl">
              <h4 className="text-lg font-bold text-white mb-4">How Scores Are Collected and Verified</h4>
              <p className="text-[#a0acc0]">
                Score reports are submitted voluntarily by USMLE test-takers after completing their exam. To
                ensure data integrity, every submission goes through the following verification process: </p>
              <ul className="accuracy-list">
                <li><strong>Document verification:</strong> Submitters are required to upload an official NBME or USMLE score
                  document. Screenshots, PDFs, and MyUSMLE portal exports are accepted and
                  cross-checked for formatting consistency with official score report templates.</li>
                <li><strong>Duplicate screening:</strong> Submissions are screened by IP address, email, and score pattern to
                  identify and remove duplicate entries.</li>
                <li><strong>Outlier review:</strong> Statistical outliers (scores that deviate more than 3 standard deviations from
                  the mean for a given NBME form) are manually reviewed before inclusion.</li>
                <li><strong>Anonymization:</strong> All personal identifiers (name, medical school, AAMC ID) are removed at the
                  point of submission. USMLEPredictor.com stores only the practice exam score(s), final
                  USMLE score, and exam date.</li>
              </ul>

              <p className="text-[#a0acc0]">

                No student data is sold, shared, or used for any purpose other than improving prediction accuracy. </p>
            </div>
          </div>



          <div className="">
            <div className="p-6 rounded-xl">
              <h4 className="text-lg font-bold text-white mb-4">Who Built This Tool</h4>
              <p className="text-[#a0acc0]">USMLEPredictor.com was developed by a team of medical educators and data scientists with
                direct experience in USMLE preparation and medical education research. The prediction algorithm
                was designed to address a well-documented gap: existing score prediction methods (Reddit
                spreadsheets, estimates) rely on self-reported, unverified data with no statistical rigor.
              </p>
              <p className="text-[#a0acc0]">Our team includes individuals with backgrounds in:</p>

              <ul className="accuracy-list">
                <li>
                  Medical education and USMLE preparation coaching
                </li>
                <li>
                  Statistical modeling and machine learning
                </li>
                <li>
                  Clinical medicine (MD-level contributors)
                </li>

              </ul>

              <p className="text-[#a0acc0]">
                The accuracy data on this page is reviewed quarterly and updated as new NBME forms are
                released and additional score reports are collected. No student data is sold, shared, or used for any purpose other than improving prediction accuracy. </p>
            </div>
          </div>



          <div className="">
            <div className="p-6 rounded-xl">
              <h4 className="text-lg font-bold text-white mb-4">Our 3-Method Ensemble Algorithm</h4>
              <p className="text-[#a0acc0]">USMLEPredictor.com does not use simple linear regression. We combine three independent
                modeling approaches to maximize accuracy across the full score range:
              </p>

              <div className="table-container">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#0b101e] border-b border-slate-700">
                    <tr>
                      <th className="p-4 text-white font-semibold">Method</th>
                      <th className="p-4 text-white font-semibold">Weight</th>
                      <th className="p-4 text-white font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 bg-slate-800/30">
                    <tr>
                      <td className="p-4 text-indigo-300 font-medium">K-Nearest Neighbors (KNN)</td>
                      <td className="p-4 text-white font-bold">40%</td>
                      <td className="p-4 text-[#a0acc0]">Accounts for score clustering</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-emerald-300 font-medium">Weighted Average Model</td>
                      <td className="p-4 text-white font-bold">35%</td>
                      <td className="p-4 text-[#a0acc0]">Applies form-specific weighting</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-orange-300 font-medium">Per-Form Linear Regression</td>
                      <td className="p-4 text-white font-bold">25%</td>
                      <td className="p-4 text-[#a0acc0]">Handles outlier correction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[#a0acc0]">
                Combining these methods outperforms any single approach, particularly for students in the
                220–250 range where score distributions are densest and single-method models show the highest
                variance.</p>
            </div>
          </div>




          {/* CORRELATION DATA GRID */}
          <div className="premium-section mt-16">
            <h4 className="text-xl font-bold text-white mb-2">Practice Test Accuracy & Correlation Data</h4>
            <p className="text-[#a0acc0] mb-8">
              The following correlation data is derived from the full 5,039-report dataset. Pearson's <span className="text-white italic">r</span> measures the strength of the linear relationship between practice exam score and actual USMLE Step 2 CK score. Precision (±) represents the range within which 80% of actual scores fell relative to prediction.
            </p>

            <h3 className="text-xl font-bold text-white mb-6">Primary Predictors (Highest Accuracy)</h3>

            <div className="premium-card-grid">
              <div className="premium-card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">NBME Form 14</h3>
                  <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r = 0.92</span>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono  p-2 rounded">
                  <BarChart3 size={16} className="text-indigo-400" />
                  <span>Precision: <strong className="text-emerald-400">±5–7 points</strong></span>
                </div>
                <p className="text-[#a0acc0] m-0 text-sm leading-relaxed"><strong>Notes:</strong> Currently the most predictive NBME form available for 2025–2026 test-takers. Form 14 closely mirrors the current Step 2 CK item difficulty distribution.</p>
              </div>

              <div className="premium-card border-orange-500/30 bg-orange-900/10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">UWSA 2</h3>
                  <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r = 0.89</span>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono  p-2 rounded">
                  <BarChart3 size={16} className="text-indigo-400" />
                  <span>Precision: <strong className="text-emerald-400">±6–8 points</strong></span>
                </div>
                <p className="text-[#a0acc0] m-0 text-sm leading-relaxed"><strong>Notes:</strong> Highly reliable but consistently overpredicts actual performance by an average of 3.2 points. Our model applies a downward correction factor for UWSA 2 inputs. Students should interpret a raw UWSA 2 score with this tendency in mind.</p>
              </div>

              <div className="premium-card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">NBME Form 13</h3>
                  <span className="badge-premium bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold">r = 0.88</span>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono p-2 rounded">
                  <BarChart3 size={16} className="text-indigo-400" />
                  <span>Precision: <strong className="text-emerald-400">±6–9 points</strong></span>
                </div>
                <p className="text-[#a0acc0] m-0 text-sm leading-relaxed"><strong>Notes:</strong> Strong predictor, slightly less precise than Form 14. Recommended as a secondary data point alongside Form 14 or UWSA 2.</p>
              </div>

              <div className="premium-card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">Free 120</h3>
                  <span className="badge-premium bg-slate-500/20 text-slate-300 border-slate-500/30 font-bold">r = 0.85</span>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-4 text-[#a0acc0] font-mono  p-2 rounded">
                  <BarChart3 size={16} className="text-slate-400" />
                  <span>Precision: <strong className="text-orange-400">±8–10 points</strong></span>
                </div>
                <p className="text-[#a0acc0] m-0 text-sm leading-relaxed"><strong>Notes:</strong> Lower precision than NBME forms because the Free 120 was designed to assess item type familiarity rather than content mastery. Best used as a final verification of testing stamina and clinical reasoning under exam conditions — not as a primary score predictor.</p>
              </div>
            </div>
          </div>



          <h2>NBME Score Conversion & Form-Specific Notes</h2>

          <div className="accuracy-text-block">
            <div className="p-6 rounded-xl">

              {/* Section Title */}
              <h4 className="text-lg font-bold text-white mb-4">
                Modern NBME Forms (Recommended for Current Test-Takers)
              </h4>

              {/* NBME Content */}
              <ul className="space-y-3 text-[#a0acc0] list-disc pl-5">
                <li>
                  <span className="text-white font-medium">NBME Form 32:</span> The newest release. Shows high fidelity with the current Step 2 CK question style and difficulty curve.
                </li>
                <li>
                  <span className="text-white font-medium">NBME Form 31:</span> Among the strongest predictors for 2024–2026 test-takers. Precision: ±5 points. Highly recommended.
                </li>
                <li>
                  <span className="text-white font-medium">NBME Form 30 & 29:</span> Reliable predictors. May slightly underpredict actual performance by 2–5 points due to minor item difficulty differences from current exam versions.
                </li>
              </ul>

            </div>
          </div>


          <div className="">
            <div className="p-6 rounded-xl">

              {/* Section Title */}
              <h4 className="text-lg font-bold text-white mb-4">
                Legacy Forms (Useful for Trend Tracking)
              </h4>

              {/* Content */}
              <ul className="space-y-3 text-[#a0acc0] list-disc pl-5">
                <li>
                  <span className="text-white font-medium">NBME Forms 9–12:</span> Remain useful for broad benchmarking during early dedicated study. Not recommended as primary predictors for current exam dates due to evolving question style.
                </li>
                <li>
                  <span className="text-white font-medium">NBME Forms 13–16:</span> Excellent for tracking score trajectory over time and building exam stamina. Precision is lower than modern forms when used in isolation.
                </li>
              </ul>

            </div>
          </div>

          <div className="">
            <div className="p-6 rounded-xl">
              <h2>UWSA 2 Deep Dive: Accuracy in the 2025–2026 Cohort</h2>
              <p className="text-[#a0acc0]">UWSA 2 is the most widely used UWorld self-assessment for Step 2 CK prediction. In our
                2025–2026 cohort (n = 1,847 submissions with UWSA 2 data:
              </p>

              <ul className="accuracy-list">
                <li>
                  74% of students scored within 5 points of their UWSA 2 result on actual Step 2 CK
                </li>
                <li>
                  89% of students scored within 8 points of their UWSA 2 result
                </li>
                <li>
                  Average overprediction: +3.2 points (UWSA 2 tends to be slightly easier than the actual
                  exam)
                </li>
                <li>
                  Standard deviation of prediction error: 4.1 points
                </li>


              </ul>

              <p className="text-[#a0acc0]">
                Our model applies a -3 point correction factor to all UWSA 2 inputs, which reduces prediction error
                by approximately 28% compared to using the raw UWSA 2 score directly </p>
            </div>
          </div>



          <div className="">
            <div className="p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-6">
                How USMLEPredictor Compares to Other Methods
              </h2>

              <div className="table-container">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#0b101e] border-b border-slate-700">
                    <tr>
                      <th className="p-4 text-white font-semibold">Method</th>
                      <th className="p-4 text-white font-semibold">Data Source</th>
                      <th className="p-4 text-white font-semibold">Sample Size</th>
                      <th className="p-4 text-white font-semibold">Precision</th>
                      <th className="p-4 text-white font-semibold">Last Updated</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-700 bg-slate-800/30">
                    <tr>
                      <td className="p-4 text-indigo-300 font-medium">
                        USMLEPredictor
                      </td>
                      <td className="p-4 text-white">5,039 verified</td>
                      <td className="p-4 text-white">5,039</td>
                      <td className="p-4 text-emerald-300 font-semibold">
                        ±5 points (avg)
                      </td>
                      <td className="p-4 text-white">March 2026</td>
                    </tr>

                    <tr>
                      <td className="p-4 text-orange-300 font-medium">
                        Reddit Predictor
                      </td>
                      <td className="p-4 text-white">Crowdsourced</td>
                      <td className="p-4 text-white">~300–500</td>
                      <td className="p-4 text-yellow-300 font-semibold">
                        ±8–12 points
                      </td>
                      <td className="p-4 text-white">2022 (stagnant)</td>
                    </tr>

                    <tr>
                      <td className="p-4 text-pink-300 font-medium">
                        Score
                      </td>
                      <td className="p-4 text-white">Internal</td>
                      <td className="p-4 text-white">Undisclosed</td>
                      <td className="p-4 text-yellow-300 font-semibold">
                        ±8–10 points
                      </td>
                      <td className="p-4 text-white">Undisclosed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[#a0acc0] mt-6 leading-relaxed">
                The Reddit predictor spreadsheet, while widely shared, has several
                well-documented limitations: self-reported scores are not verified,
                the sample size is small and geographically concentrated, and the
                spreadsheet has not been updated since 2022.
              </p>

              <p className="text-[#a0acc0] mt-3 leading-relaxed">
                Our model accounts for NBME form difficulty drift over time the
                Reddit spreadsheet does not.
              </p>
            </div>
          </div>


          <div className="accuracy-text-block">
            <div className="p-6 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-4">Limitations and Honest Disclosures</h4>
              <p className="text-[#a0acc0] leading-relaxed mb-4">
                We believe transparency about what our model cannot do is as important as documenting what it can.
              </p>
              <p className="text-[#a0acc0] leading-relaxed mb-2">
                This tool has the following limitations:
              </p>
              <ul className="accuracy-list mt-4">
                <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                  Predictions are statistical estimates, not guarantees. Individual scores will always vary. Our precision ranges describe where 80% of users fall — 20% of users will score outside the stated range.
                </li>
                <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                  Accuracy decreases for students with fewer than two practice exams. Our model performs best when given two or more data points (e.g., NBME + UWSA 2). Single-input predictions carry higher variance.
                </li>
                <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                  Very high scorers (265+) and very low scorers (below 215) show slightly lower predictive accuracy. Score distributions at the extremes of the USMLE scale are less densely represented in our dataset.
                </li>
                <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                  Newly released NBME forms have lower accuracy initially. When NBME releases a new form, we have limited data until sufficient submissions are collected. We note this clearly for each form.
                </li>
                <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                  This tool is not affiliated with NBME or the USMLE program. We are an independent tool built on independently collected data. We do not have access to official NBME datasets.
                </li>
                <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                  The model is currently trained on Step 2 CK data only. Step 1 and Step 3 predictors are in active development.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}

        <div className="accuracy-text-block">
          <div className="p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6">What Students Say</h2>

            <div className="testimonials-card">
              <div className='quote-card'> 
                <p className="0] mb-2">
                  Predicted 258, actual 259. The NBME Form 14 and UWSA 2 weighted average was spot on throughout my dedicated period.
                </p>
                <p className="text-[#a0acc0] text-sm">
                  — MD Student, Verified Score Report
                </p>
              </div>

              <div className='quote-card'>
                <p className="text-white/90 mb-2">
                  USMLEPredictor gave me the confidence to move my test date up two weeks. It is much faster than filling out a spreadsheet and the accuracy was within 3 points for me.
                </p>
                <p className="text-white/90 text-sm">
                  — IMG Applicant, Verified Score 252
                </p>
              </div>
            </div>
          </div>
        </div>



        <div className="accuracy-text-block">
          <div className="p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Step 1 and Step 3 Predictors (Coming Soon)</h2>

            <p className="text-[#a0acc0] leading-relaxed mb-4">
              We are actively collecting score reports and training models for:
            </p>

            <ul className="accuracy-list mt-4 mb-6">
              <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                <span className="text-white font-medium">USMLE Step 1 Score Predictor:</span> Focusing on PASS/FAIL outcome prediction and NBME self-assessment correlation for Step 1 forms.
              </li>
              <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                <span className="text-white font-medium">USMLE Step 3 Score Predictor:</span> Analyzing CCS (Clinical Case Simulation) performance patterns and specialty-specific scoring trends.
              </li>
            </ul>

            <p className="text-[#a0acc0] leading-relaxed">
              If you have completed Step 1 or Step 3 and would like to contribute to this dataset, please submit your score report through our contribution form.
            </p>
          </div>
        </div>



        <div className="accuracy-text-block">
          <div className="p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Authoritative Sources and Research Basis</h2>
            <p className="text-[#a0acc0] leading-relaxed mb-4">
              Our algorithm design and validation methodology draws from the following published sources:
            </p>

            <ul className="accuracy-list mt-4 mb-6">
              <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                <span className="text-white font-medium">USMLE Step 2 CK Bulletin of Information</span> — Official score interpretation guidelines and scale documentation
              </li>
              <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                <span className="text-white font-medium">NBME Performance Data Reports</span> — Historical form difficulty data and item response theory (IRT) benchmarks used for form-to-form calibration
              </li>
              <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                <span className="text-white font-medium">Journal of Medical Education</span> — Peer-reviewed studies on the predictive validity of Free 120 and UWSA self-assessments relative to actual USMLE performance
              </li>
              <li className="pl-2 relative before:content-[''] before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full list-none">
                <span className="text-white font-medium">National Board of Medical Examiners Technical Reports</span> — IRT methodology documentation for USMLE score scaling
              </li>
            </ul>
          </div>
        </div>

        {/* ❓ FAQ */}
        <section className="premium-section mt-16 pt-8">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-indigo-400" size={28} />
            <h2 className="text-xl font-bold mb-0">Frequently Asked Questions</h2>
          </div>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              How often is the prediction model updated?
            </summary>
            <div className="premium-faq-answer">
              <p>
                The model is reviewed quarterly. When new NBME forms are released, form-specific regression parameters are updated as soon as sufficient data (minimum 100 score reports per form) is collected.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Can I submit my score to help improve the model?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Yes. After your exam, you can submit your practice scores and official result through our score contribution form. All submissions are anonymized and used solely to improve prediction accuracy.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              Is my data private?
            </summary>
            <div className="premium-faq-answer">
              <p>
                All personal identifiers are removed at the point of submission. We store only the practice exam score, actual USMLE score, and exam month/year. No data is sold or shared with third parties.
              </p>
            </div>
          </details>

          <details className="premium-faq-item">
            <summary className="premium-faq-question">
              What if my score was very different from the prediction?
            </summary>
            <div className="premium-faq-answer">
              <p>
                Approximately 20% of users score outside our stated precision range. If your result differed significantly, we encourage you to submit your data through the contribution form — these outlier cases are particularly valuable for improving model accuracy at the score extremes.
              </p>
            </div>
          </details>
        </section>

        {/* FOOTER INFO */}
        {/* <section className="premium-section text-center mt-16 pt-8 border-t border-white/5 opacity-70 hover:opacity-100 transition-opacity">
          <Shield className="mx-auto text-slate-500 mb-4" size={24} />
          <h3 className="text-lg font-bold text-white mb-2">Authoritative Sources & Citations</h3>
          <p className="text-sm text-[#a0acc0] max-w-2xl mx-auto">
            Our algorithms are informed by and validated against public datasets and medical education research, including the USMLE Step 2 CK Bulletin of Information, NBME Performance Data Reports, and the Journal of Medical Education. We are not affiliated with the NBME or USMLE.
          </p>
        </section> */}

      </main>

    </div>
  )

}


