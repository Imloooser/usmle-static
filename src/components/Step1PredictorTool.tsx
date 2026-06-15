'use client';

import React, { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import type { Step1Prediction, Step1Input } from '@/services/step1Predictor';
import { Target, BookOpen, ChevronDown, ChevronUp, Users } from 'lucide-react';
import ExamSwitcher from './ExamSwitcher';
import PredictorHero from './PredictorHero';
import TrustBar from './TrustBar';
import LoadingScreen from './LoadingScreen';

// Lazy-load Results — keeps Recharts + chart deps out of the initial bundle
const Step1Results = lazy(() => import('./Step1Results'));

// Step 2-style SCORE_FIELDS pattern — only newer NBME forms (29-33)
const SCORE_FIELDS: Array<{ key: keyof Step1Input; label: string; hint?: string; group: 'nbme' | 'other'; placeholder: string }> = [
  { key: 'nbme29',  label: 'NBME 29',  hint: 'EPC %',                  group: 'nbme',  placeholder: '30–95' },
  { key: 'nbme30',  label: 'NBME 30',  hint: 'EPC %',                  group: 'nbme',  placeholder: '30–95' },
  { key: 'nbme31',  label: 'NBME 31',  hint: 'EPC %',                  group: 'nbme',  placeholder: '30–95' },
  { key: 'nbme32',  label: 'NBME 32',  hint: 'EPC %',                  group: 'nbme',  placeholder: '30–95' },
  { key: 'nbme33',  label: 'NBME 33',  hint: 'EPC %',                  group: 'nbme',  placeholder: '30–95' },
  { key: 'free120', label: 'Free 120', hint: '% correct',              group: 'other', placeholder: '20–99' },
  { key: 'uworld',  label: 'UWorld',   hint: '% correct', group: 'other', placeholder: '20–99' },
];


export default function Step1PredictorTool() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'' | 'US-MD' | 'US-DO' | 'IMG'>('');
  const [result, setResult] = useState<Step1Prediction | null>(null);
  const [pendingResult, setPendingResult] = useState<Step1Prediction | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    nbme: true,
    other: true,
  });

  const handleChange = (key: string, value: string) => {
    setScores(prev => ({ ...prev, [key]: value }));
    setError(null);
  };

  const toggleSection = (group: string) => {
    setExpandedSections(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const inp: Step1Input = {};
    for (const field of SCORE_FIELDS) {
      const raw = scores[field.key as string];
      if (!raw || !raw.trim()) continue;
      const n = parseFloat(raw);
      // Validate range so a typo (e.g. "100" or "29") is flagged inline rather
      // than silently dropped and mislabeled as a "High Risk, 0%" prediction.
      const lo = field.group === 'nbme' ? 30 : 20;
      const hi = field.group === 'nbme' ? 99 : 99;
      if (!Number.isFinite(n) || n < lo || n > hi) {
        setError(`${field.label} must be a number between ${lo} and ${hi}.`);
        return;
      }
      (inp as any)[field.key] = n;
    }
    if (status) inp.status = status;

    const hasNbme = ['nbme29', 'nbme30', 'nbme31', 'nbme32', 'nbme33']
      .some(k => typeof (inp as any)[k] === 'number');
    if (!hasNbme) {
      setError('Please enter at least one NBME CBSSA score (forms 29–33). Free 120 and UWorld alone overpredict pass by 5–8 points.');
      return;
    }

    setLoading(true);
    setShowLoading(true);
    try {
      const res = await fetch('/api/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam: 'step1', input: inp }),
      });
      const r = await res.json();
      if (!res.ok || r?.error) throw new Error(r?.error ?? 'Prediction failed.');
      setPendingResult(r);  // hold the result while the loading screen plays
    } catch (err: any) {
      setError(err?.message ?? 'Prediction failed.');
      setShowLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    if (pendingResult) {
      setResult(pendingResult);
      setPendingResult(null);
      setTimeout(() => document.getElementById('s1-result')?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const handleReset = () => {
    setScores({});
    setStatus('');
    setResult(null);
    setPendingResult(null);
    setShowLoading(false);
    setError(null);
  };

  const filledCount = SCORE_FIELDS.filter(f => scores[f.key as string] && scores[f.key as string].trim()).length;

  const renderGroup = (groupKey: 'nbme' | 'other', title: string, icon: React.ReactNode) => {
    const fields = SCORE_FIELDS.filter(f => f.group === groupKey);
    const expanded = expandedSections[groupKey];
    const filledInGroup = fields.filter(f => scores[f.key as string] && scores[f.key as string].trim()).length;
    return (
      <div className="form-section" key={groupKey}>
        <button
          type="button"
          className="section-header"
          onClick={() => toggleSection(groupKey)}
          aria-expanded={expanded}
        >
          <div className="section-title">
            {icon}
            <span>{title}</span>
            {filledInGroup > 0 && <span className="filled-badge">{filledInGroup}</span>}
          </div>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expanded && (
          <div className="fields-grid">
            {fields.map(field => (
              <div className="field" key={field.key as string}>
                <label htmlFor={field.key as string}>
                  {field.label}
                  {field.hint && (
                    <span style={{ marginLeft: 6, fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>
                      ({field.hint})
                    </span>
                  )}
                </label>
                <input
                  id={field.key as string}
                  type="number"
                  inputMode="decimal"
                  step={0.1}
                  min={20}
                  max={99}
                  placeholder={field.placeholder}
                  value={scores[field.key as string] || ''}
                  onChange={e => handleChange(field.key as string, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (result) {
    return (
      <div id="s1-result">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px 16px', color: '#94a3b8' }}>Loading results…</div>}>
          <Step1Results result={result} onReset={handleReset} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="stepscore-app">
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} dataReady={!!pendingResult} examType="step1" />}
      <main className="stepscore-main" role="main">
        <PredictorHero step="step1" />

        <ExamSwitcher active="step1" />

        <TrustBar step="step1" />

        <form className="score-form" onSubmit={handleSubmit}>
          <p className="form-helper-text">
            You only need to enter <strong>one or more NBME</strong> scores — Free 120 and UWorld are optional corroborators.
          </p>

          {/* Cohort — clean segmented control, no awkward dropdown */}
          <div className="form-section">
            <div className="section-header section-header-static">
              <div className="section-title">
                <Users size={18} />
                <span>About You</span>
                <span className="section-subtitle">optional</span>
              </div>
            </div>
            <div className="cohort-segment-wrap">
              <div className="cohort-segment" role="radiogroup" aria-label="Candidate group">
                {[
                  { v: 'US-MD',  label: 'US-MD' },
                  { v: 'US-DO',  label: 'US-DO' },
                  { v: 'IMG',    label: 'IMG' },
                ].map(opt => (
                  <button
                    key={opt.v}
                    type="button"
                    className={`cohort-pill ${status === opt.v ? 'cohort-pill-active' : ''}`}
                    aria-pressed={status === opt.v}
                    onClick={() => setStatus(status === opt.v ? '' as any : opt.v as any)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="cohort-helper">
                Used only to tailor advice — does not change your pass probability.
              </p>
            </div>
          </div>

          {renderGroup('nbme', 'NBME CBSSA Self-Assessments', <BookOpen size={18} />)}
          {renderGroup('other', 'Other Practice Exams', <Target size={18} />)}

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <div style={{ width: '100%', maxWidth: 360 }}>
              <button
                type="submit"
                className="btn-predict"
                disabled={loading || showLoading || filledCount === 0}
              >
                {loading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    <Target size={20} aria-label="Target Icon" />
                    Predict My Pass Probability
                  </>
                )}
              </button>
            </div>
            <span className="input-count">
              {filledCount} score{filledCount !== 1 ? 's' : ''} entered
              {filledCount > 0 && filledCount < 3 && ' — add more for tighter accuracy'}
            </span>
          </div>
        </form>

        <section className="disclaimer" aria-label="Disclaimer">
          <p>
            <strong>How it works:</strong> Step 1 has been Pass/Fail since January 2022. This tool uses NBME&apos;s officially published <a href="https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>July 2024 pass-probability table</a> as the primary anchor — calibrated on the full Step 1 examinee population (100,000+ test-takers/year). Free 120 and UWorld serve as corroborators. Not affiliated with NBME or USMLE.
          </p>
          <p style={{ marginTop: 8 }}>
            For details on model calibration, read our <Link href="/step-1-accuracy-insights" style={{ color: '#818cf8', textDecoration: 'underline' }}>Step 1 Accuracy Insights & Methodology</Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
