"use client";

import React from 'react';
import Link from 'next/link';
import { BarChart3, Shield, ArrowLeft, Target } from 'lucide-react';

const ACCURACY_DATA = [
  { test: 'NBME Form 14', accuracy: '±5-7 points', correlation: '0.92', notes: 'Currently the most predictive NBME form for Step 2 CK 2025/Soon.' },
  { test: 'UWSA 2', accuracy: '±6-8 points', correlation: '0.89', notes: 'Highly reliable but tends to overpredict by 2-4 points on average.' },
  { test: 'Free 120', accuracy: '±8-10 points', correlation: '0.85', notes: 'Best used as a final verification of testing stamina and logic.' },
  { test: 'NBME Form 13', accuracy: '±6-9 points', correlation: '0.88', notes: 'Strong predictor, slightly less precise than Form 14.' },
];

interface AccuracyInsightsProps {
  onBack: () => void;
}

export default function AccuracyInsights({ onBack }: AccuracyInsightsProps) {
  React.useEffect(() => {
    const originalTitle = document.title;
    document.title = 'USMLE Step 2 CK Accuracy Insights & Correlation | USMLEPredictor.com';
    return () => { document.title = originalTitle; };
  }, []);

  return (
    <div className="insights-container stepscore-app">
      <header className="stepscore-header" role="banner">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon-wrap">
              <Target size={28} className="logo-icon" aria-hidden="true" />
            </div>
            <div className="logo-text-wrap">
              <h1 className="logo-title">Accuracy Insights</h1>
              <p className="logo-tagline" style={{ fontSize: '11px', color: '#5A6980' }} >NBME Correlation & Data</p>
            </div>
          </div>
          <Link href="/" className="nav-pill" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={16} />
            <span>Back <span className="hide-xs">to Predictor</span></span>
          </Link>
        </div>
      </header>

      <main className="insights-main">
        <section className="hero">
          <h2>Step 2 CK Practice <span className="highlight">Test Accuracy</span><br /> & Correlation</h2>
          <p>
            Based on our dataset of <strong>5,039 verified student score reports</strong>, we have analyzed the predictive power 
            of each major practice assessment. Understanding these correlations helps you interpret your scores with 
            statistical confidence.
          </p>
        </section>

        <section className="stats-grid">
          {ACCURACY_DATA.map((item, idx) => (
            <div key={idx} className="stat-card">
              <div className="card-header">
                <h3>{item.test}</h3>
                <span className="correlation-badge">r = {item.correlation}</span>
              </div>
              <div className="stat-body">
                <div className="accuracy-label">
                  <BarChart3 size={14} />
                  <span>Precision: <strong>{item.accuracy}</strong></span>
                </div>
                <p>{item.notes}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="detailed-analysis">
          <h3>NBME Score Conversion & Practice Test Correlation</h3>
          <p>
            Students frequently search for the most accurate <strong>NBME to Step 2 CK converter</strong>. Below is our latest analysis of performance on specific NBME self-assessments compared to actual USMLE results.
          </p>

          <div className="form-grid-comprehensive">
            <div className="form-group">
              <h4>Modern NBME Forms</h4>
              <ul>
                <li><strong>NBME Form 32:</strong> The newest release. Shows high fidelity with the Step 2 CK Soon question style.</li>
                <li><strong>NBME Form 31:</strong> Strongest predictor for recent test-takers. Precision: ±5 points.</li>
                <li><strong>NBME Form 30 & 29:</strong> Reliable but may slightly underpredict by 2-5 points.</li>
              </ul>
            </div>
            <div className="form-group">
              <h4>Legacy & Older Forms</h4>
              <ul>
                <li><strong>NBME 9-12 score conversion:</strong> These forms remain useful for broad benchmarking during the early dedicated period.</li>
                <li><strong>NBME 13-16 score conversion:</strong> Excellent for tracking score trends and building stamina.</li>
              </ul>
            </div>
          </div>

          <h3 className=''>UWSA 2 Accuracy & Step 2 CK Correlation Soon</h3>
          <p>
            UWSA 2 remains the gold standard for UWorld self-assessments. In our 2025-Soon cohort, 74% of students 
            scored within 5 points of their UWSA 2 result. Our <strong>NBME score converter</strong> analysis 
            shows that while UWSA 2 is precise, it typically <strong>overpredicts</strong> actual performance by an average of 3.2 points. 
          </p>

          <h3>USMLE Step 1 & Step 3 Predictors (Coming Soon)</h3>
          <p>
            While our current tool focuses on <strong>Step 2 CK score prediction</strong>, we are actively training models for 
            <strong>USMLE Step 1</strong> and <strong>USMLE Step 3</strong>.
          </p>
          <ul>
            <li><strong>Step 1 Score Predictor:</strong> Focusing on PASS/FAIL outcomes and post-Step 1 foundation metrics.</li>
            <li><strong>Step 3 Score Predictor:</strong> Analyzing CCS performance and specialty-specific scoring trends.</li>
          </ul>
        </section>

        <section className="comparison-table">
          <h3>USMLEPredictor vs Reddit vs AMBOSS</h3>
          <p>How does our Soon ensemble algorithm compare to other popular prediction methods?</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Data Source</th>
                  <th>Precision</th>
                  <th>Updates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>USMLEPredictor.com</strong></td>
                  <td>5,039 Verified Reports</td>
                  <td><strong>±5 points (High)</strong></td>
                  <td>Real-time Soon</td>
                </tr>
                <tr>
                  <td>Reddit Predictor</td>
                  <td>Crowdsourced (Self-reported)</td>
                  <td>±8 points (Variable)</td>
                  <td>Stagnant (2022)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="testimonials">
          <div className="quote-grid">
            <div className="quote-card">
              <p>"Predicted 258, Actual 259. The NBME 14 and UWSA 2 weighted average was spot on for my dedicated period."</p>
              <span>— MD Student</span>
            </div>
            <div className="quote-card">
              <p>"USMLEPredictor gave me the confidence to move my test date up. It's much faster than filling out a spreadsheet."</p>
              <span>— IMG Applicant, Verified Score 252</span>
            </div>
          </div>
        </section>

        <section className="citations">
          <h3>Authoritative Sources & Citations</h3>
          <p>Our algorithms are informed by and validated against public datasets and medical education research, including:</p>
          <ul>
            <li><a href="https://www.usmle.org/bulletin-information" target="_blank" rel="noopener noreferrer"><em>USMLE Step 2 CK Bulletin of Information</em></a> - Score interpretation guidelines.</li>
            <li><a href="https://www.nbme.org/examinees/score-reports-and-transcripts" target="_blank" rel="noopener noreferrer"><em>NBME Performance Data Reports</em></a> - Historical form difficulty and item response theory (IRT) benchmarks.</li>
            <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10363072/" target="_blank" rel="noopener noreferrer"><em>Journal of Medical Education</em></a> - Studies on the predictive validity of the Free 120 and UWSA self-assessments.</li>
          </ul>
        </section>

        <section className="methodology">
          <div className="method-header">
            <Shield size={20} />
            <h3>Our 3-Method Ensemble Algorithm</h3>
          </div>
          <p>
            USMLEPredictor doesn't just use simple linear regression. We combine <strong>K-Nearest Neighbors (40%)</strong>, 
            <strong>Weighted Averages (35%)</strong>, and <strong>Per-Form Regression (25%)</strong> to account for 
            outliers and varying difficulty levels across different NBME forms.
          </p>
        </section>
      </main>
    </div>
  );
}
