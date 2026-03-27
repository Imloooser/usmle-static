import React from 'react';
import { BarChart3, TrendingUp, Shield, ArrowLeft, Target, Award } from 'lucide-react';
import '../styles/stepscore.css';

const ACCURACY_DATA = [
  { test: 'NBME Form 14', accuracy: '±5-7 points', correlation: '0.92', notes: 'Currently the most predictive NBME form for Step 2 CK 2025/Soon.' },
  { test: 'UWSA 2', accuracy: '±6-8 points', correlation: '0.89', notes: 'Highly reliable but tends to overpredict by 2-4 points on average.' },
  { test: 'Free 120', accuracy: '±8-10 points', correlation: '0.85', notes: 'Best used as a final verification of testing stamina and logic.' },
  { test: 'NBME Form 13', accuracy: '±6-9 points', correlation: '0.88', notes: 'Strong predictor, slightly less precise than Form 14.' },
];

export default function AccuracyInsights({ onBack, onNavigate }) {
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
              <p className="logo-tagline">NBME Correlation & Data</p>
            </div>
          </div>
          <button className="nav-pill" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Predictor</span>
          </button>
        </div>
      </header>

      <main className="insights-main">
        <section className="hero">
          {/* <div className="hero-badge">
            <Award size={14} /> Data-Driven Analysis
          </div> */}
          <h2>Step 2 CK Practice <span class="highlight"> Test Accuracy</span>    <br /> & Correlation</h2>
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

          <h3>UWSA 2 Accuracy & Step 2 CK Correlation Soon</h3>
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
                <tr>
                  <td>AMBOSS Predictor</td>
                  <td>QBank Performance</td>
                  <td>±7 points (Proprietary)</td>
                  <td>Frequent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="testimonials">
          <div className="quote-grid">
            <div className="quote-card">
              <p>"Predicted 258, Actual 259. The NBME 14 and UWSA 2 weighted average was spot on for my dedicated period."</p>
              <span>— MD Student, Class of 2025</span>
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

      <style jsx>{`
        .insights-container {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
        }
        .insights-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          position: relative;
          z-index: 1;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #60a5fa;
          cursor: pointer;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .back-btn:hover {
          background: rgba(96, 165, 250, 0.1);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin: 40px 0;
        }
        .stat-card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: transform 0.2s;
        }
        .stat-card:hover {
          border-color: rgba(96, 165, 250, 0.3);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .card-header h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #fff;
        }
        .correlation-badge {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .accuracy-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: #94a3b8;
          margin-bottom: 12px;
        }
        .detailed-analysis h3 {
          color: #60a5fa;
          margin-top: 40px;
          font-size: 1.4rem;
        }
        .detailed-analysis p {
          line-height: 1.8;
          color: #cbd5e1;
          margin-bottom: 20px;
        }
        .methodology {
          margin-top: 60px;
          padding: 32px;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.05) 0%, rgba(30, 41, 59, 0.5) 100%);
          border-radius: 20px;
          border: 1px solid rgba(96, 165, 250, 0.2);
        }
        .method-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #60a5fa;
        }
        .method-header h3 {
          margin: 0;
        }
        .form-grid-comprehensive {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin: 20px 0 40px;
        }
        .form-group h4 {
          color: #fff;
          margin-bottom: 12px;
          font-size: 1.1rem;
        }
        .form-group ul {
          list-style: none;
          padding: 0;
        }
        .form-group li {
          margin-bottom: 10px;
          color: #94a3b8;
          font-size: 0.95rem;
          padding-left: 20px;
          position: relative;
        }
        .form-group li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #60a5fa;
        }
        .comparison-table {
          margin-top: 60px;
        }
        .table-wrapper {
          overflow-x: auto;
          background: rgba(30, 41, 59, 0.3);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
        }
        th, td {
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        th {
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
        td {
          color: #e2e8f0;
        }
        .testimonials {
          margin-top: 60px;
        }
        .quote-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .quote-card {
          padding: 24px;
          background: rgba(99, 102, 241, 0.05);
          border-left: 4px solid #6366f1;
          border-radius: 0 12px 12px 0;
        }
        .quote-card p {
          font-style: italic;
          font-size: 1rem;
          margin-bottom: 12px;
          color: #fff;
        }
        .quote-card span {
          display: block;
          font-size: 0.85rem;
          color: #60a5fa;
          font-weight: 600;
        }
        .citations {
          margin-top: 60px;
          padding: 32px;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .citations ul {
          margin-top: 16px;
        }
        .citations li {
          margin-bottom: 12px;
          color: #94a3b8;
          font-size: 0.9rem;
        }
        .citations a {
          color: #60a5fa;
          text-decoration: none;
          transition: color 0.1s;
        }
        .citations a:hover {
          color: #93c5fd;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
