'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart, ReferenceDot, BarChart, Bar, Cell,
} from 'recharts';
import {
  ArrowLeft, Target, Users, Lightbulb, AlertTriangle, CheckCircle, Info,
  Share2, Award, BarChart3, TrendingUp,
} from 'lucide-react';
import { NumberTicker } from './ui/number-ticker';
import type { Step1Prediction } from '@/services/step1Predictor';

const TIER_COLOR: Record<string, string> = {
  'Very Safe': '#10b981',
  'Safe': '#22c55e',
  'Likely Pass': '#6366f1',
  'Borderline': '#f59e0b',
  'High Risk': '#ef4444',
};

function PassGauge({ pct, lower, upper, tier }: { pct: number; lower: number; upper: number; tier: string }) {
  const color = TIER_COLOR[tier] || '#6366f1';
  return (
    <div className="score-gauge">
      <div className="gauge-ring" style={{ '--ring-color': color, '--ring-pct': `${pct * 3.6}deg` } as React.CSSProperties}>
        <div className="gauge-score">
          <NumberTicker style={{ color }} value={pct} />
          <span style={{ fontSize: '0.45em', color: '#94a3b8', marginLeft: 4, fontWeight: 700 }}>%</span>
        </div>
      </div>
      <div className="gauge-label">Probability of Passing Step 1</div>
      <div className="percentile-pill" style={{ background: color }}>
        <Award size={14} /> {tier}
      </div>
      <div className="gauge-bar-container">
        <div className="gauge-bar-bg">
          <div className="gauge-bar-ci"
            style={{ left: `${lower}%`, width: `${upper - lower}%` }} />
          <div className="gauge-bar-needle"
            style={{ left: `${pct}%`, backgroundColor: color }} />
        </div>
        <div className="gauge-labels">
          <span>0%</span><span className="hide-xs">25%</span><span>50%</span>
          <span className="hide-xs">75%</span><span>100%</span>
        </div>
      </div>
      <div className="gauge-range">
        95% range: <strong><NumberTicker className="text-amber-50/50" value={lower} />%</strong> – <strong><NumberTicker className="text-amber-50/50" value={upper} />%</strong>
      </div>
    </div>
  );
}

function EpcCurveCard({ curve }: { curve: Step1Prediction['epcCurve'] }) {
  const data = curve.points.map(p => ({
    epc: p.epc,
    p: p.p,
    you: curve.yourEpc != null && Math.abs(p.epc - curve.yourEpc) <= 1 ? p.p : null,
  }));
  // Read the pass-probability straight from the same curve the area chart is
  // drawn from, so the "you are here" dot sits exactly ON the curve and the
  // prose number matches the gauge. (Previously recomputed with a separate
  // hardcoded logistic that disagreed with the service's NBME-table value.)
  const yourP = curve.yourEpc != null
    ? (curve.points.find(pt => pt.epc === Math.round(curve.yourEpc as number))?.p ?? null)
    : null;
  return (
    <div className="result-card trend-card">
      <h3><TrendingUp size={18} /> NBME EPC → Pass Probability Curve</h3>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>
        Calibrated against NBME 2024 CBSSA guidance + IAMSE 2024 (CBSE ≥53 → 96.4% pass).
        {curve.yourEpc != null && (
          <> Your effective EPC: <strong style={{ color: '#a5b4fc' }}>{curve.yourEpc.toFixed(1)}%</strong> → ~{yourP}% pass on this curve.</>
        )}
      </p>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220} >
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="epcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="epc" tick={{ fontSize: 11 }} stroke="#64748b"
              label={{ value: 'NBME EPC %', position: 'insideBottom', offset: -4, fontSize: 11, fill: '#64748b' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#64748b"
              label={{ value: 'P(pass) %', angle: -90, position: 'insideLeft', offset: 14, fontSize: 11, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 12 }}
              formatter={((v: number, name: string) =>
                name === 'p' ? [`${v.toFixed(1)}%`, 'P(pass)'] : null) as any}
              labelFormatter={(l) => `EPC ${l}`} />
            <Area type="monotone" dataKey="p" stroke="#6366f1" fill="url(#epcGrad)" strokeWidth={2} dot={false} />
            {curve.yourEpc != null && yourP != null && (
              <ReferenceDot x={Math.round(curve.yourEpc)} y={yourP} r={6} fill="#34d399" stroke="#fff" strokeWidth={2} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CohortBars({ data }: { data: Step1Prediction['cohortComparison'] }) {
  return (
    <div className="result-card">
      <h3><BarChart3 size={18} /> Your Estimate vs Published Cohort Rates</h3>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
        Cohort base rates from FSMB 2025 USMLE Performance Data. Your individual estimate
        should land above your cohort if you're well-prepared.
      </p>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, left: 60, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#64748b"
              tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="label" tick={{ fontSize: 12 }} stroke="#94a3b8" width={120} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 12 }}
              formatter={((v: number) => [`${v}%`, 'Pass rate']) as any} />
            <Bar dataKey="pct" radius={[0, 6, 6, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.isYou ? '#6366f1' : '#475569'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function InsightIcon({ type }: { type: string }) {
  switch (type) {
    case 'positive': return <CheckCircle size={16} className="insight-positive" />;
    case 'warning': return <AlertTriangle size={16} className="insight-warning" />;
    case 'info': return <Info size={16} className="insight-info" />;
    default: return <Lightbulb size={16} className="insight-neutral" />;
  }
}

function buildSummary(r: Step1Prediction): string {
  const tier = r.tier;
  if (r.pPassPct >= 95) return `Tracking comfortably above the pass line. Final-week focus: retention, sleep, exam-day timing.`;
  if (r.pPassPct >= 85) return `Likely to pass. A fresh CBSSA within 1 week of your exam would tighten this estimate.`;
  if (r.pPassPct >= 70) return `In the "likely pass" range, but with real downside risk. One more solid NBME would build margin.`;
  if (r.pPassPct >= 50) return `Borderline zone. Strongly recommend additional study before locking in your test date.`;
  return `High fail risk at current performance. Consider postponing and rebuilding the NBME-tier foundation.`;
}

export default function Step1Results({ result, onReset }: { result: Step1Prediction; onReset: () => void }) {
  const handleShare = () => {
    const text = `My USMLE Step 1 pass probability: ${result.pPassPct}% (${result.tier})\nPredict yours free at USMLEPredictor.com`;
    if (navigator.share) {
      navigator.share({ title: 'USMLE Step 1 Pass Probability', text, url: 'https://usmlepredictor.com/usmle-step-1-score-predictor' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="score-results" aria-live="polite">
      <div className="results-top">
        <button className="btn-back" onClick={onReset} aria-label="Start a new prediction">
          <ArrowLeft size={18} />
          New Prediction
        </button>
        <button className="btn-share" onClick={handleShare} aria-label="Share this result">
          <Share2 size={18} />
          Share
        </button>
      </div>

      <PassGauge pct={result.pPassPct} lower={result.lowerPct} upper={result.upperPct} tier={result.tier} />

      <div className="result-summary">
        <span className="result-summary-pill" style={{ borderColor: TIER_COLOR[result.tier]}}>
          What this means :
        </span>
        <p className="result-summary-pill" style={{ borderColor: TIER_COLOR[result.tier]}}>{buildSummary(result)}</p>
      </div>

      <div className="confidence-badge">
        Model Confidence: {result.confidence}% — anchored on NBME 2024 + IAMSE 2024 + FSMB 2025, refined with {result.dataPoints.toLocaleString()} reference points
      </div>

      {result.inputBreakdown.length > 0 && (
        <div className="result-card">
          <h3><Target size={18} /> Signal Weights</h3>
          <div className="breakdown-bars">
            {result.inputBreakdown.map((item, i) => (
              <div className="breakdown-item breakdown-item-wide" key={i}>
                <div className="breakdown-label">
                  <span>{item.label}</span>
                  <span className="breakdown-score">component P: {item.pComponent}%</span>
                </div>
                <div className="breakdown-bar-bg">
                  <div className="breakdown-bar-fill" style={{ width: `${item.weight}%` }} />
                </div>
                <span className="breakdown-weight">{item.weight}% weight</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <CohortBars data={result.cohortComparison} />

      {result.epcCurve.yourEpc != null && <EpcCurveCard curve={result.epcCurve} />}

      {result.similarStudents.length > 0 && (
        <div className="result-card">
          <h3><Users size={18} /> Similar Students&apos; Actual Outcomes</h3>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
            Nearest neighbors in our reference dataset (by EPC-equivalent score + cohort match).
          </p>
          <div className="similar-table">
            <div className="similar-header">
              <span>NBME EPC</span>
              <span>UWorld %</span>
              <span>Cohort</span>
              <span>Actual</span>
            </div>
            {result.similarStudents.map((s, i) => (
              <div className="similar-row" key={i}>
                <span>{s.epc != null ? `${s.epc}%` : '—'}</span>
                <span>{s.uworld != null ? `${s.uworld}%` : '—'}</span>
                <span className="status-tag">{s.status}</span>
                <span className="actual-score" style={{ color: s.outcome === 'pass' ? '#10b981' : '#ef4444' }}>
                  {s.outcome.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.insights.length > 0 && (
        <div className="result-card insights-card">
          <h3><Lightbulb size={18} /> Insights</h3>
          <div className="insights-list">
            {result.insights.map((ins, i) => (
              <div className={`insight-item insight-${ins.type}`} key={i}>
                <InsightIcon type={ins.type} />
                <p>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.warnings.length > 0 && (
        <div className="result-card insights-card">
          <h3><AlertTriangle size={18} /> Caveats</h3>
          <div className="insights-list">
            {result.warnings.map((w, i) => (
              <div className="insight-item insight-warning" key={i}>
                <AlertTriangle size={16} className="insight-warning" />
                <p>{w}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="results-cta">
        <button className="btn-predict" onClick={onReset}>
          <Target size={18} />
          Try Different Scores
        </button>
      </div>
    </div>
  );
}
