'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { predictAPI, trackEvent, submitScore } from '../services/api';
import { Target, TrendingUp, Users, BarChart3, ChevronDown, ChevronUp, Zap, Shield, Award, Gift, X, Check } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';

const ScoreResults = lazy(() => import('./ScoreResults'));

const SCORE_FIELDS = [
  { key: 'nbme9', label: 'NBME 9', group: 'nbme', placeholder: '180–300' },
  { key: 'nbme10', label: 'NBME 10', group: 'nbme', placeholder: '180–300' },
  { key: 'nbme11', label: 'NBME 11', group: 'nbme', placeholder: '180–300' },
  { key: 'nbme12', label: 'NBME 12', group: 'nbme', placeholder: '180–300' },
  { key: 'nbme13', label: 'NBME 13', group: 'nbme', placeholder: '180–300' },
  { key: 'nbme14', label: 'NBME 14', group: 'nbme', placeholder: '180–300' },
  { key: 'nbme15', label: 'NBME 15', group: 'nbme', placeholder: '180–300' },
  { key: 'nbme16', label: 'NBME 16', group: 'nbme', placeholder: '180–300' },
  { key: 'uwsa1', label: 'UWSA 1', group: 'uwsa', placeholder: '180–300' },
  { key: 'uwsa2', label: 'UWSA 2', group: 'uwsa', placeholder: '180–300' },
  { key: 'uwsa3', label: 'UWSA 3', group: 'uwsa', placeholder: '180–300' },
  { key: 'free120', label: 'Free 120 %', group: 'other', placeholder: '1–100' },
  { key: 'uworldPercent', label: 'UWorld %', group: 'other', placeholder: '1–100' },
];

function SubmitScoreModal({ onClose, scores }: { onClose: () => void, scores: any }) {
  const [actualScore, setActualScore] = useState('');
  const [status, setStatus] = useState('');
  const [weeksPrepared, setWeeksPrepared] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseInt(actualScore);
    if (!score || score < 196 || score > 300) {
      setError('Enter a valid score (196–300)');
      return;
    }
    try {
      await submitScore({
        actualScore: score,
        status: status || null,
        weeksPrepared: weeksPrepared ? parseInt(weeksPrepared) : null,
        ...scores,
      });
      trackEvent('score_submitted', { actualScore: score, status });
      setSubmitted(true);
    } catch {
      setError('Failed to submit. Try again.');
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="submit-success">
            <Check size={48} className="success-icon" />
            <h3>Thank You!</h3>
            <p>Your score helps improve predictions for thousands of students.</p>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className="modal-header">
          <Gift size={24} />
          <h3>Share Your Real Score</h3>
        </div>
        <p className="modal-desc">
          Got your Step 2 CK result? Share it anonymously to help improve predictions for everyone.
          Your data is encrypted and never shared with third parties.
        </p>
        <form onSubmit={handleSubmit} className="submit-form">
          <div className="field">
            <label>Your Actual Step 2 CK Score *</label>
            <input
              type="number" placeholder="196–300" value={actualScore}
              onChange={e => setActualScore(e.target.value)} min={196} max={300} required
            />
          </div>
          <div className="field">
            <label>Your Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Select...</option>
              <option value="US_MD">US MD</option>
              <option value="US_DO">US DO</option>
              <option value="Non_US_IMG">Non-US IMG</option>
            </select>
          </div>
          <div className="field">
            <label>Weeks of Dedicated Prep</label>
            <input
              type="number" placeholder="e.g. 8" value={weeksPrepared}
              onChange={e => setWeeksPrepared(e.target.value)} min={1} max={52}
            />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn-primary">
            <Gift size={16} /> Submit My Score
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ScorePredictor() {
  const [scores, setScores] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    nbme: true,
    uwsa: true,
    other: true,
  });

  useEffect(() => {
    trackEvent('page_view', { page: 'home' });
    const fetchStats = async () => {
      try {
        const res = await predictAPI.stats();
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const originalTitle = 'USMLE Step 2 CK Score Predictor - USMLEPredictor | Free & Instant 2026';
    if (result) {
      document.title = `Predicted Score: ${result.predictedScore} | USMLEPredictor.com`;
      window.scrollTo(0, 0);
    } else {
      document.title = originalTitle;
    }
  }, [result]);

  const handleChange = (key: string, value: string) => {
    setScores(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value,
    }));
    setError(null);
  };

  const filledCount = Object.values(scores).filter(v => v !== undefined && v !== '').length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (filledCount === 0) {
      setError('Enter at least one practice score.');
      return;
    }
    setLoading(true);
    setError(null);
    trackEvent('prediction_started', { inputCount: filledCount });
    try {
      const payload = {};
      Object.entries(scores).forEach(([k, v]) => {
        if (v !== undefined && v !== '') (payload as any)[k] = parseFloat(v);
      });
      const res = await predictAPI.predict(payload);
      setResult(res.data);
      trackEvent('prediction_made', {
        predicted: res.data.predictedScore,
        confidence: res.data.confidence,
        inputCount: filledCount,
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Prediction failed. Please try again.');
      trackEvent('prediction_error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setScores({});
    setResult(null);
    setError(null);
    trackEvent('new_prediction');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section as keyof typeof expandedSections] }));
  };

  const renderGroup = (groupKey: string, title: string, icon: React.ReactNode) => {
    const fields = SCORE_FIELDS.filter(f => f.group === groupKey);
    const expanded = expandedSections[groupKey as keyof typeof expandedSections];
    const filledInGroup = fields.filter(f => (scores as any)[f.key] && (scores as any)[f.key] !== '').length;

    return (
      <div className="form-section" key={groupKey}>
        <button
          type="button"
          className="section-header"
          onClick={() => toggleSection(groupKey)}
        >
          <div className="section-title">
            {icon}
            <span>{title}</span>
            {filledInGroup > 0 && (
              <span className="filled-badge">{filledInGroup}</span>
            )}
          </div>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expanded && (
          <div className="fields-grid">
            {fields.map(field => (
              <div className="field" key={field.key}>
                <label htmlFor={field.key}>{field.label}</label>
                <input
                  id={field.key}
                  type="number"
                  inputMode="numeric"
                  placeholder={field.placeholder}
                  value={(scores as any)[field.key] || ''}
                  onChange={(e: any) => handleChange(field.key, e.target.value)}
                  min={field.group === 'other' ? 0 : 100}
                  max={field.group === 'other' ? 100 : 300}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="stepscore-app">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Analyzing your scores...</p>
        </div>
      )}
      <header className="stepscore-header" role="banner">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon-wrap">
              <Target size={28} className="logo-icon" aria-hidden="true" />
            </div>
            <div className="logo-text-wrap hide-xs">
              <h1 className="logo-title">USMLE Predictor</h1>
              <p className="logo-tagline" style={{ fontSize: '11px', color: '#5A6980' }}>Step 2 CK Score Predictor</p>
            </div>
          </div>
          <div className="header-pills">
            {stats && (
              <span className="stat-pill" aria-label={`${stats.totalDataPoints?.toLocaleString()} data points in our dataset`}>
                <Users size={14} aria-hidden="true" />
                {stats.totalDataPoints?.toLocaleString()} data points
              </span>
            )}
            <span className="stat-pill accent-pill">
              <Shield size={14} aria-hidden="true" />
              100% Free
            </span>
          </div>
        </div>
      </header>

      <main className="stepscore-main" role="main">
        {!result ? (
          <>
            <section className="hero" aria-label="Score predictor introduction">
              <div className="hero-badge">
                <AnimatedShinyText className="inline-flex gap-2 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <Zap size={14} aria-hidden="true" className="text-[#818cf8]" /> <span className='text-[#818cf8]'>Most Accurate Step 2 CK Predictor</span>
                </AnimatedShinyText>
              </div>
              <h2>
                Predict Your <span className="highlight"> USMLE Step 2 CK</span> Score
              </h2>
              <p>
                Enter your NBME, UWSA, UWorld, or Free 120 practice exam scores below. Our proprietary 3-method ensemble algorithm analyzes 5,039+ verified student score reports to provide the most accurate prediction of your Step 2 CK performance.
              </p>
              <div className="hero-features">
                <div className="feature">
                  <BarChart3 size={18} aria-label="Chart Icon" />
                  <span>5,039+ verified data points</span>
                </div>
                <div className="feature">
                  <Zap size={20} aria-hidden="true" />
                  <span>Instant prediction with confidence interval</span>
                </div>
                <div className="feature">
                  <Users size={20} aria-hidden="true" />
                  <span>Compare with similar students</span>
                </div>
                <div className="feature">
                  <Shield size={20} aria-hidden="true" />
                  <span>No login required • 100% private</span>
                </div>
              </div>
            </section>

            <div className="trust-bar">
              <div className="trust-item">
                <Award size={16} />
                <span>Used by {Math.floor((stats?.totalDataPoints || 5039) / 3)}+ students</span>
              </div>
              <div className="trust-item">
                <TrendingUp size={16} />
                <span>Avg overperformance: +{stats?.avgOverperformance || 6.5} pts</span>
              </div>
            </div>

            <form className="score-form" onSubmit={handleSubmit}>
              <p className="form-helper-text">
                You only need to enter <strong>one or more</strong> scores — not all fields are required. More scores = better accuracy.
              </p>
              {renderGroup('nbme', 'NBME Self-Assessments', <BarChart3 size={18} />)}
              {renderGroup('uwsa', 'UWorld Self-Assessments', <TrendingUp size={18} />)}
              {renderGroup('other', 'Other Scores', <Target size={18} />)}

              {error && <div className="form-error">{error}</div>}

              <div className="form-actions">
                <div style={{ width: '100%', maxWidth: '360px' }}>
                  <button
                    type="submit"
                    className="btn-predict"
                    disabled={loading || filledCount === 0}
                  >
                    {loading ? (
                      <span className="spinner" />
                    ) : (
                      <>
                        <Target size={20} aria-label="Target Icon" />
                        Predict My Score
                      </>
                    )}
                  </button>
                </div>
                <span className="input-count">
                  {filledCount} score{filledCount !== 1 ? 's' : ''} entered
                  {filledCount < 3 && filledCount > 0 && ' — add more for better accuracy'}
                </span>
              </div>
            </form>

            <section className="share-score-cta">
              <Gift size={20} />
              <div>
                <strong>Already got your score?</strong>
                <p>Share your real Step 2 CK score anonymously to help improve predictions for everyone.</p>
              </div>
              <button className="btn-secondary" onClick={() => { setShowSubmitModal(true); trackEvent('submit_score_cta_click'); }}>
                Share Score
              </button>
            </section>

            <section className="disclaimer" aria-label="Disclaimer">
              <p>
                <strong>Disclaimer:</strong> This USMLE Step 2 CK score predictor provides an estimate based on anonymized, verified student data.
                It is NOT affiliated with the National Board of Medical Examiners (NBME), USMLE, UWorld, or any official organization.
                Individual results vary based on study habits, test-day performance, and other factors.
                Use this prediction as one data point in your preparation strategy alongside NBME self-assessments and UWorld practice.
              </p>
            </section>
          </>
        ) : (
          <>
            <Suspense fallback={<div className="loading-results"><span className="spinner" /> Loading results...</div>}>
              <ScoreResults result={result} onReset={handleReset} />
            </Suspense>
            <section className="share-score-cta post-result">
              <Gift size={20} />
              <div>
                <strong>Help improve our predictions!</strong>
                <p>When you get your real score, come back and share it to help future students.</p>
              </div>
              <button className="btn-secondary" onClick={() => { setShowSubmitModal(true); trackEvent('submit_score_post_predict_click'); }}>
                Submit My Score
              </button>
            </section>
          </>
        )}
      </main>

      {showSubmitModal && (
        <SubmitScoreModal onClose={() => setShowSubmitModal(false)} scores={scores} />
      )}
    </div>
  );
}
