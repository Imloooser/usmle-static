'use client';

import React, { useState } from 'react';
import { Target, BarChart3, Shield, Zap, Award, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import {
  predictNbme,
  FORM_DISPLAY,
  FORM_KEYS,
  STEP2_CK_PASSING_STANDARD,
  type NbmeForm,
  type NbmePrediction,
} from '@/services/nbmeConverter';


export default function NbmeScorePredictor() {
  const [form, setForm] = useState<NbmeForm>('nbme14');
  const [inputType, setInputType] = useState<'percent' | 'threeDigit'>('percent');
  const [value, setValue] = useState<string>('');
  const [daysUntilExam, setDaysUntilExam] = useState<string>('');
  const [result, setResult] = useState<NbmePrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDaysHelp, setShowDaysHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const v = parseFloat(value);
    if (!Number.isFinite(v)) {
      setError('Please enter a valid number.');
      return;
    }
    if (inputType === 'percent' && (v < 20 || v > 100)) {
      setError('Percent correct should be between 20 and 100.');
      return;
    }
    if (inputType === 'threeDigit' && (v < 180 || v > 300)) {
      setError('3-digit score should be between 180 and 300.');
      return;
    }

    const days = daysUntilExam ? parseFloat(daysUntilExam) : undefined;
    if (days !== undefined && (!Number.isFinite(days) || days < 0 || days > 365)) {
      setError('Days until exam should be 0-365.');
      return;
    }

    const r = predictNbme({ form, value: v, inputType, daysUntilExam: days });
    setResult(r);
    setTimeout(() => document.getElementById('nbme-result')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleReset = () => {
    setValue('');
    setDaysUntilExam('');
    setResult(null);
    setError(null);
  };

  // Result tier color — calibrated to 2025+ passing standard of 218
  const tierColor = result
    ? result.predictedStep2 >= 250 ? '#10b981'                        // high
    : result.predictedStep2 >= 235 ? '#22c55e'                        // solid
    : result.predictedStep2 >= 225 ? '#6366f1'                        // margin above pass
    : result.predictedStep2 >= STEP2_CK_PASSING_STANDARD ? '#f59e0b'  // borderline (≥218)
    : '#ef4444'                                                       // at risk (<218)
    : '#6366f1';

  return (
    <div className="stepscore-app">
      <main className="stepscore-main" role="main">
        <section className="hero hero-compact" aria-label="NBME Score Predictor introduction">
          <div className="hero-top-row">
            <span className="brand-mark">NBME CONVERTER</span>
            <span className="brand-pill">
              <Shield size={12} aria-hidden="true" />
              100% Free
            </span>
          </div>
          <div className="hero-badge">
            <span className="inline-flex items-center gap-2 px-4 py-1 text-sm font-medium text-[#818cf8]">
              <Zap size={14} aria-hidden="true" />
              NBME Forms 9–16 · Step 2 CK
            </span>
          </div>
          <h1 className="hero-h1 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            <span className="hero-h1-line">Convert Your</span>
            <span className="hero-h1-line">
              <span className="highlight">NBME Score</span> → Step 2 CK
            </span>
          </h1>
          <p className="hero-sub">
            Enter any NBME 9–16 form result — % correct or the 3-digit number on your NBME report — and get a calibrated Step 2 CK prediction with an honest 80% interval. Your inputs never leave your device.
          </p>
        </section>

        {!result ? (
          <form className="score-form" onSubmit={handleSubmit} aria-label="NBME conversion form">
            <p className="form-helper-text">
              Pick your NBME form, then enter either your <strong>% correct</strong> or the <strong>3-digit score</strong> already on your NBME report.
            </p>

            <div className="form-section">
              <div className="section-header section-header-static">
                <div className="section-title">
                  <BarChart3 size={18} />
                  <span>Your NBME Score</span>
                </div>
              </div>

              <div className="fields-grid" style={{ padding: '12px 16px 16px' }}>
                <div className="field">
                  <label htmlFor="nbme-form">NBME form</label>
                  <select id="nbme-form" value={form} onChange={e => setForm(e.target.value as NbmeForm)}>
                    {FORM_KEYS.map(k => <option key={k} value={k}>{FORM_DISPLAY[k]}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="nbme-input-type">Input type</label>
                  <select
                    id="nbme-input-type"
                    value={inputType}
                    onChange={e => { setInputType(e.target.value as any); setValue(''); }}
                  >
                    <option value="percent">% correct</option>
                    <option value="threeDigit">3-digit score</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="nbme-value">
                    {inputType === 'percent' ? '% correct' : '3-digit score'}
                  </label>
                  <input
                    id="nbme-value"
                    type="number"
                    inputMode="decimal"
                    step={0.1}
                    min={inputType === 'percent' ? 20 : 180}
                    max={inputType === 'percent' ? 100 : 300}
                    placeholder={inputType === 'percent' ? '20–100' : '180–300'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="nbme-days">Days until Step 2 CK</label>
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
                    id="nbme-days"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={365}
                    placeholder="e.g. 21"
                    value={daysUntilExam}
                    onChange={e => setDaysUntilExam(e.target.value)}
                  />
                </div>
              </div>
              {showDaysHelp && (
                <div style={{ padding: '0 16px 16px' }}>
                  <p className="form-helper-text" style={{ margin: 0, fontSize: 12, color: '#cbd5e1', textAlign: 'left' }}>
                    Applies the Tackett 2021 decay (PMC8368818). Scores tend to climb slightly the closer you are to exam day.
                  </p>
                </div>
              )}
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="form-actions">
              <div style={{ width: '100%', maxWidth: 360 }}>
                <button type="submit" className="btn-predict">
                  <Target size={20} />
                  Convert &amp; Predict
                </button>
              </div>
              <span className="input-count">{value ? '1 score entered' : 'Enter a score above'}</span>
            </div>

            <section className="disclaimer" aria-label="Honest disclaimer">
              <p>
                <strong>Honest disclaimer:</strong> NBME does not publish official raw-%-to-3-digit conversion tables. Coefficients here are derived from community-aggregated student-reported pairs and peer-reviewed correlation studies. Realistic accuracy: <strong>±6 to ±10 points</strong> depending on form recency and your test-day variance. Not affiliated with NBME or USMLE.
              </p>
            </section>
          </form>
        ) : (
          <ResultPanel result={result} tierColor={tierColor} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}


function ResultPanel({ result, tierColor, onReset }: { result: NbmePrediction; tierColor: string; onReset: () => void }) {
  return (
    <div id="nbme-result" className="score-results" aria-live="polite">
      <div className="result-card" style={{ textAlign: 'center', padding: '32px 16px' }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Predicted Step 2 CK from {FORM_DISPLAY[result.form]}
        </p>
        <div style={{ fontSize: 72, fontWeight: 800, color: tierColor, lineHeight: 1, marginBottom: 8 }}>
          {result.predictedStep2}
        </div>
        <p style={{ fontSize: 15, color: '#cbd5e1' }}>
          80% range: <strong style={{ color: '#fff' }}>{result.intervalLow}–{result.intervalHigh}</strong>
        </p>
        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
          Passing standard: {STEP2_CK_PASSING_STANDARD} (raised from 214 effective July 2025).
          {result.predictedStep2 >= STEP2_CK_PASSING_STANDARD
            ? ` Your prediction is ${result.predictedStep2 - STEP2_CK_PASSING_STANDARD} pts above the line.`
            : ` Your prediction is ${STEP2_CK_PASSING_STANDARD - result.predictedStep2} pts below the line — consider additional preparation.`}
        </p>
      </div>

      <div className="result-card">
        <h3><BarChart3 size={18} /> Inputs Used</h3>
        <div className="breakdown-bars">
          <div className="breakdown-item">
            <div className="breakdown-label">
              <span>{FORM_DISPLAY[result.form]} → 3-digit equivalent</span>
              <span className="breakdown-score">{result.convertedThreeDigit}</span>
            </div>
          </div>
          <div className="breakdown-item">
            <div className="breakdown-label">
              <span>Form-specific bias correction</span>
              <span className="breakdown-score">
                {result.biasDirection === 'underPredicts' && `+${result.biasMagnitude} (NBME under-predicts)`}
                {result.biasDirection === 'overPredicts' && `−${result.biasMagnitude} (NBME over-predicts)`}
                {result.biasDirection === 'wellCalibrated' && 'Well calibrated'}
              </span>
            </div>
          </div>
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
          Try a Different Form
        </button>
      </div>
    </div>
  );
}
