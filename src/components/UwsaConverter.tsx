'use client';

import React, { useState } from 'react';
import { Target, BarChart3, Shield, Zap, Award, AlertTriangle, CheckCircle2, Info, TrendingDown } from 'lucide-react';
import {
  predictUwsa,
  UWSA_DISPLAY,
  UWSA_KEYS,
  STEP2_CK_PASSING_STANDARD,
  type UwsaForm,
  type UwsaPrediction,
} from '@/services/uwsaConverter';


export default function UwsaConverter() {
  const [form, setForm] = useState<UwsaForm>('uwsa2');
  const [score, setScore] = useState<string>('');
  const [daysUntilExam, setDaysUntilExam] = useState<string>('');
  const [result, setResult] = useState<UwsaPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDaysHelp, setShowDaysHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const s = parseFloat(score);
    if (!Number.isFinite(s) || s < 180 || s > 300) {
      setError('UWSA score should be between 180 and 300.');
      return;
    }
    const days = daysUntilExam ? parseFloat(daysUntilExam) : undefined;
    if (days !== undefined && (!Number.isFinite(days) || days < 0 || days > 365)) {
      setError('Days until exam should be 0-365.');
      return;
    }

    const r = predictUwsa({ form, uwsaScore: s, daysUntilExam: days });
    setResult(r);
    setTimeout(() => document.getElementById('uwsa-result')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleReset = () => {
    setScore('');
    setDaysUntilExam('');
    setResult(null);
    setError(null);
  };

  // Tier color — calibrated to 2025+ passing standard of 218
  const tierColor = result
    ? result.predictedStep2 >= 250 ? '#10b981'                        // high
    : result.predictedStep2 >= 235 ? '#22c55e'                        // solid
    : result.predictedStep2 >= 225 ? '#6366f1'                        // margin above pass
    : result.predictedStep2 >= STEP2_CK_PASSING_STANDARD ? '#f59e0b'  // borderline (≥218)
    : '#ef4444'                                                       // at risk (<218)
    : '#6366f1';

  // How much we're correcting downward
  const totalCorrection = result
    ? result.uwsaScore - result.predictedStep2
    : 0;

  return (
    <div className="stepscore-app">
      <main className="stepscore-main" role="main">
        <section className="hero hero-compact" aria-label="UWSA Converter introduction">
          <div className="hero-top-row">
            <span className="brand-mark">UWSA CONVERTER</span>
            <span className="brand-pill">
              <Shield size={12} aria-hidden="true" />
              100% Free
            </span>
          </div>
          <div className="hero-badge">
            <span className="inline-flex items-center gap-2 px-4 py-1 text-sm font-medium text-[#818cf8]">
              <TrendingDown size={14} aria-hidden="true" />
              Corrects UWSA Overprediction
            </span>
          </div>
          <h1 className="hero-h1 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            <span className="hero-h1-line">Convert Your</span>
            <span className="hero-h1-line">
              <span className="highlight">UWSA Score</span> → Step 2 CK
            </span>
          </h1>
          <p className="hero-sub">
            UWSA 1 and UWSA 2 systematically over-predict your actual Step 2 CK score. This tool applies a calibrated bias correction + score-band asymmetry adjustment + 80% interval. Your inputs never leave your device.
          </p>
        </section>

        {!result ? (
          <form className="score-form" onSubmit={handleSubmit} aria-label="UWSA conversion form">
            <p className="form-helper-text">
              Pick your UWSA form and enter the <strong>3-digit score</strong> that UWorld reported.
            </p>

            <div className="form-section">
              <div className="section-header section-header-static">
                <div className="section-title">
                  <BarChart3 size={18} />
                  <span>Your UWSA Score</span>
                </div>
              </div>
              <div className="fields-grid" style={{ padding: '12px 16px 16px' }}>
                <div className="field">
                  <label htmlFor="uwsa-form">UWSA form</label>
                  <select id="uwsa-form" value={form} onChange={e => setForm(e.target.value as UwsaForm)}>
                    {UWSA_KEYS.map(k => <option key={k} value={k}>{UWSA_DISPLAY[k]}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="uwsa-score">3-digit score</label>
                  <input
                    id="uwsa-score"
                    type="number"
                    inputMode="numeric"
                    min={180}
                    max={300}
                    placeholder="180–300"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="uwsa-days">Days until Step 2 CK</label>
                    <button
                      type="button"
                      onClick={() => setShowDaysHelp(prev => !prev)}
                      className="text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                      title="Show methodology details"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                  <input
                    id="uwsa-days"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={365}
                    placeholder="e.g. 14"
                    value={daysUntilExam}
                    onChange={e => setDaysUntilExam(e.target.value)}
                  />
                </div>
              </div>
              {showDaysHelp && (
                <div style={{ padding: '0 16px 16px' }}>
                  <p className="form-helper-text" style={{ margin: 0, fontSize: 12, color: '#cbd5e1', textAlign: 'left' }}>
                    Applies the Tackett 2021 decay (PMC8368818). Scores often climb closer to test day.
                  </p>
                </div>
              )}
            </div>



            {error && <div className="form-error">{error}</div>}

            <div className="form-actions">
              <div style={{ width: '100%', maxWidth: 360 }}>
                <button type="submit" className="btn-predict">
                  <Target size={20} />
                  Correct &amp; Predict
                </button>
              </div>
              <span className="input-count">{score ? '1 score entered' : 'Enter a score above'}</span>
            </div>

            <section className="disclaimer" aria-label="Honest disclaimer">
              <p>
                <strong>Honest disclaimer:</strong> UWSA correlation with real Step 2 CK is r ≈ 0.85–0.90 (UWSA 2). Realistic accuracy after bias correction: <strong>±6 to ±8 points</strong>. UWSA 3 has limited public validity data and gets a wider interval. Not affiliated with UWorld, NBME, or USMLE.
              </p>
            </section>
          </form>
        ) : (
          <ResultPanel result={result} tierColor={tierColor} totalCorrection={totalCorrection} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}


function ResultPanel({
  result,
  tierColor,
  totalCorrection,
  onReset,
}: {
  result: UwsaPrediction;
  tierColor: string;
  totalCorrection: number;
  onReset: () => void;
}) {
  return (
    <div id="uwsa-result" className="score-results" aria-live="polite">
      <div className="result-card" style={{ textAlign: 'center', padding: '32px 16px' }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Bias-Corrected Step 2 CK from {UWSA_DISPLAY[result.form]}
        </p>
        <div style={{ fontSize: 72, fontWeight: 800, color: tierColor, lineHeight: 1, marginBottom: 8 }}>
          {result.predictedStep2}
        </div>
        <p style={{ fontSize: 15, color: '#cbd5e1' }}>
          80% range: <strong style={{ color: '#fff' }}>{result.intervalLow}–{result.intervalHigh}</strong>
        </p>
        {totalCorrection > 0 && (
          <p style={{ fontSize: 13, color: '#fbbf24', marginTop: 12 }}>
            <TrendingDown size={14} style={{ display: 'inline', marginRight: 4 }} />
            UWSA reported {result.uwsaScore}, corrected down by {totalCorrection.toFixed(1)} pts
          </p>
        )}
        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
          Passing standard: {STEP2_CK_PASSING_STANDARD} (raised from 214 effective July 2025).
          {result.predictedStep2 >= STEP2_CK_PASSING_STANDARD
            ? ` Your prediction is ${result.predictedStep2 - STEP2_CK_PASSING_STANDARD} pts above the line.`
            : ` Your prediction is ${STEP2_CK_PASSING_STANDARD - result.predictedStep2} pts below the line.`}
        </p>
      </div>

      <div className="result-card">
        <h3><BarChart3 size={18} /> Correction Breakdown</h3>
        <div className="breakdown-bars">
          <div className="breakdown-item">
            <div className="breakdown-label">
              <span>{UWSA_DISPLAY[result.form]} as reported</span>
              <span className="breakdown-score">{result.uwsaScore}</span>
            </div>
          </div>
          <div className="breakdown-item">
            <div className="breakdown-label">
              <span>Base bias correction</span>
              <span className="breakdown-score">−{result.appliedBaseBias} pts</span>
            </div>
          </div>
          {result.appliedCeilingBoost > 0 && (
            <div className="breakdown-item">
              <div className="breakdown-label">
                <span>Ceiling effect (above 255)</span>
                <span className="breakdown-score">−{result.appliedCeilingBoost} pts</span>
              </div>
            </div>
          )}
          {result.daysAppliedAdjustment !== undefined && (
            <div className="breakdown-item">
              <div className="breakdown-label">
                <span>Days-to-exam decay (Tackett 2021)</span>
                <span className="breakdown-score">
                  {result.daysAppliedAdjustment > 0 ? '+' : ''}{result.daysAppliedAdjustment} pts
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="result-card insights-card">
        <h3>
          {result.reliability === 'high' ? <CheckCircle2 size={18} className="insight-positive" />
            : result.reliability === 'good' ? <Info size={18} className="insight-info" />
            : <AlertTriangle size={18} className="insight-warning" />}
          Form Reliability: <span style={{ textTransform: 'capitalize' }}>{result.reliability}</span>
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.notes}</p>
      </div>

      <div className="result-card">
        <h3><Award size={18} /> Methodology</h3>
        <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{result.methodology}</p>
      </div>

      <div className="results-cta">
        <button className="btn-predict" onClick={onReset}>
          <Target size={18} />
          Try a Different UWSA
        </button>
      </div>
    </div>
  );
}
