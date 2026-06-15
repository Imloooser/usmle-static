'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import type { Step3Prediction } from '@/services/step3Predictor';
import { Target, ChevronDown, ChevronUp, Users, BarChart3 } from 'lucide-react';
import ExamSwitcher from './ExamSwitcher';
import PredictorHero from './PredictorHero';
import TrustBar from './TrustBar';
import LoadingScreen from './LoadingScreen';
import Link from 'next/link';

// Lazy-load Results — keeps Recharts/charts out of the initial bundle
const Step3Results = lazy(() => import('./Step3Results'));

// Step 2-style SCORE_FIELDS pattern — Step 3 inputs
const SCORE_FIELDS = [
  { key: 'step2ck',        label: 'Step 2 CK',  hint: 'score (180-300)',        group: 'core',    placeholder: 'e.g. 245' },
  { key: 'uworldPercent',  label: 'UWorld Step 3',  hint: '% correct',          group: 'core',    placeholder: 'e.g. 65' },
  { key: 'free137',        label: 'Free 137',   hint: '% correct',              group: 'core',    placeholder: 'e.g. 70' },
  { key: 'uwsa1',          label: 'UWSA 1',     hint: 'raw score',              group: 'core',    placeholder: 'e.g. 232' },
  { key: 'uwsa2',          label: 'UWSA 2',     hint: 'raw score',              group: 'core',    placeholder: 'e.g. 240' },
  { key: 'nbme6',          label: 'NBME 6',     hint: '% or raw',               group: 'context', placeholder: 'e.g. 65 or 235' },
  { key: 'nbme7',          label: 'NBME 7',     hint: '% or raw',               group: 'context', placeholder: 'e.g. 68 or 240' },
] as const;


export default function Step3PredictorTool() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>('');
  const [ccsRating, setCcsRating] = useState<string>('');
  const [formatVersion, setFormatVersion] = useState<string>('new');
  const [result, setResult] = useState<Step3Prediction | null>(null);
  const [pendingResult, setPendingResult] = useState<Step3Prediction | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datasetReady, setDatasetReady] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    core: true,
    context: true,
  });

  useEffect(() => { setDatasetReady(true); }, []);

  const handleChange = (key: string, value: string) => {
    setScores(prev => ({ ...prev, [key]: value }));
    setError(null);
  };
  const toggleSection = (g: string) => setExpandedSections(p => ({ ...p, [g]: !p[g] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload: Record<string, unknown> = {};
      for (const f of SCORE_FIELDS) {
        const raw = scores[f.key];
        if (!raw || !raw.trim()) continue;
        const n = Number(raw);
        if (Number.isNaN(n)) { setError(`${f.label} is not a valid number`); return; }
        payload[f.key] = n;
      }
      if (Object.keys(payload).length === 0) { setError('Enter at least one practice score.'); return; }
      if (status) payload.status = status;
      if (ccsRating) payload.ccsRating = ccsRating;
      if (formatVersion) payload.formatVersion = formatVersion;

      const res = await fetch('/api/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam: 'step3', input: payload }),
      });
      const r = await res.json();
      if (!res.ok || r?.error) { setError(r?.error ?? 'Prediction failed'); return; }
      setPendingResult(r);
      setShowLoading(true);
    } catch (e: any) {
      setError(e?.message ?? 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    if (pendingResult) {
      setResult(pendingResult);
      setPendingResult(null);
      setTimeout(() => document.getElementById('s3-result')?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const handleReset = () => {
    setScores({}); setStatus(''); setCcsRating(''); setFormatVersion('new');
    setResult(null); setPendingResult(null); setShowLoading(false); setError(null);
  };

  const filledCount = SCORE_FIELDS.filter(f => scores[f.key] && scores[f.key].trim()).length;

  const renderGroup = (groupKey: 'core' | 'context', title: string, icon: React.ReactNode) => {
    const fields = SCORE_FIELDS.filter(f => f.group === groupKey);
    const expanded = expandedSections[groupKey];
    const filledInGroup = fields.filter(f => scores[f.key] && scores[f.key].trim()).length;
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
              <div className="field" key={field.key}>
                <label htmlFor={field.key}>
                  {field.label}
                  {field.hint && (
                    <span style={{ marginLeft: 6, fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>
                      ({field.hint})
                    </span>
                  )}
                </label>
                <input
                  id={field.key}
                  type="number"
                  inputMode="decimal"
                  step={0.1}
                  placeholder={field.placeholder}
                  value={scores[field.key] || ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                />
              </div>
            ))}
            {groupKey === 'context' && (
              <>
                <div className="field">
                  <label htmlFor="ccsRating">CCS self-rating</label>
                  <select id="ccsRating" value={ccsRating} onChange={e => setCcsRating(e.target.value)}>
                    <option value="">— not rated —</option>
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                    <option value="ok">OK</option>
                    <option value="struggled">Struggled</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="formatVersion">Exam format</label>
                  <select id="formatVersion" value={formatVersion} onChange={e => setFormatVersion(e.target.value)}>
                    <option value="new">New (post-March 2026, 9-CCS)</option>
                    <option value="legacy">Legacy (13-CCS)</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  if (result) {
    return (
      <div id="s3-result">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px 16px', color: '#94a3b8' }}>Loading results…</div>}>
          <Step3Results result={result} onReset={handleReset} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="stepscore-app">
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} dataReady={!!pendingResult} examType="step3" />}
      <main className="stepscore-main" role="main">
        <PredictorHero step="step3" />

        <ExamSwitcher active="step3" />

        <TrustBar step="step3" />

        <form className="score-form" onSubmit={handleSubmit}>
          <p className="form-helper-text">
            Your <strong>Step 2 CK</strong> score is the strongest signal. Add any practice scores you have — more inputs sharpen the prediction.
          </p>

          {/* Cohort — clean segmented control */}
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
                  { v: 'US-MD',       label: 'US-MD' },
                  { v: 'US-DO',       label: 'US-DO' },
                  { v: 'IMG',         label: 'IMG' },
                  { v: 'IMG-Canada',  label: 'Canada' },
                ].map(opt => (
                  <button
                    key={opt.v}
                    type="button"
                    className={`cohort-pill ${status === opt.v ? 'cohort-pill-active' : ''}`}
                    aria-pressed={status === opt.v}
                    onClick={() => setStatus(status === opt.v ? '' : opt.v)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="cohort-helper">
                Adjusts cohort base-rate context only — your individual prediction is unchanged.
              </p>
            </div>
          </div>

          {renderGroup('core', 'Core Step 3 Signals', <BarChart3 size={18} />)}
          {renderGroup('context', 'Context (optional)', <Target size={18} />)}

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <div style={{ width: '100%', maxWidth: 360 }}>
              <button
                type="submit"
                className="btn-predict"
                disabled={loading || showLoading || !datasetReady || filledCount === 0}
              >
                {loading ? (
                  <span className="spinner" />
                ) : !datasetReady ? (
                  'Loading dataset…'
                ) : (
                  <>
                    <Target size={20} aria-label="Target Icon" />
                    Predict My Step 3 Score
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
            <strong>How it works:</strong> Anchored on <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8368809/" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>PMC8368809</a> (n=27,118) Step 2 CK → Step 3 correlation (r ≈ 0.70). UWSA inputs corrected for known 15–20 point underprediction (CCS exclusion). Validated holdout MAE 8.9 points, sitting at the theoretical r=0.68 variance ceiling. Not affiliated with NBME, USMLE, FSMB, or UWorld.
          </p>

          <p style={{ marginTop: 8 }}>
            For details on model calibration, read our <Link href="/step-3-accuracy-insights" style={{ color: '#818cf8', textDecoration: 'underline' }}>Step 3 Accuracy Insights & Methodology</Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
