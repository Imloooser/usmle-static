'use client';

import React from 'react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine,
} from 'recharts';
import {
  ArrowLeft, Target, Users, Lightbulb, AlertTriangle, CheckCircle, Info,
  Share2, Award, BarChart3,
} from 'lucide-react';
import { NumberTicker } from './ui/number-ticker';
import type { Step3Prediction } from '@/services/step3Predictor';

function Step3Gauge({ score, low, high, percentile, tier }: { score: number; low: number; high: number; percentile: number; tier: string }) {
  const min = 180, max = 290;
  const pct = ((score - min) / (max - min)) * 100;
  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;
  const color = score >= 240 ? '#10b981' : score >= 220 ? '#6366f1' : score >= 200 ? '#f59e0b' : '#ef4444';

  return (
    <div className="score-gauge">
      <div className="gauge-ring" style={{ '--ring-color': color, '--ring-pct': `${pct * 3.6}deg` } as React.CSSProperties}>
        <div className="gauge-score">
          <NumberTicker style={{ color }} value={score} />
        </div>
      </div>
      <div className="gauge-label">Predicted Step 3 Score</div>
      <div className="percentile-pill" style={{ background: color }}>
        <Award size={14} /> {percentile}th Percentile · {tier}
      </div>
      <div className="gauge-bar-container">
        <div className="gauge-bar-bg">
          <div className="gauge-bar-ci" style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }} />
          <div className="gauge-bar-needle" style={{ left: `${pct}%`, backgroundColor: color }} />
        </div>
        <div className="gauge-labels">
          <span>180</span><span className="hide-xs">200</span><span>220</span>
          <span className="hide-xs">240</span><span>260</span><span>290</span>
        </div>
      </div>
      <div className="gauge-range">
        95% CI: <strong><NumberTicker className="text-amber-50/50" value={low} /></strong> – <strong><NumberTicker className="text-amber-50/50" value={high} /></strong>
      </div>
    </div>
  );
}

function DistributionChart({ dist, score }: { dist: { mean: number; sd: number }; score: number }) {
  // Build a normal-ish curve for visualization
  const data = [];
  for (let s = 180; s <= 290; s += 2) {
    const z = (s - dist.mean) / dist.sd;
    const y = Math.exp(-0.5 * z * z) * 100;
    data.push({ score: s, density: y });
  }
  return (
    <div className="result-card trend-card">
      <h3><BarChart3 size={18} /> Where You Land in the Step 3 Distribution</h3>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>
        USMLE Step 3 cohort: mean <strong>{dist.mean}</strong>, SD <strong>{dist.sd}</strong>.
        Your predicted <strong style={{ color: '#a5b4fc' }}>{score}</strong> is highlighted.
      </p>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 30, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="score" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 12 }}
              formatter={() => ['', '']} labelFormatter={(l) => `Score ${l}`} />
            <Area type="monotone" dataKey="density" stroke="#6366f1" fill="url(#distGrad)" strokeWidth={2} dot={false} />
            <ReferenceLine x={score} stroke="#34d399" strokeWidth={2} strokeDasharray="4 3"
              label={{ value: `You: ${score}`, position: 'top', fill: '#34d399', fontSize: 11, fontWeight: 700 }} />
            <ReferenceLine x={dist.mean} stroke="#64748b" strokeDasharray="2 4"
              label={{ value: `Mean ${dist.mean}`, position: 'insideBottomRight', fill: '#64748b', fontSize: 10, offset: 5 }} />
            <ReferenceLine x={200} stroke="#ef4444" strokeDasharray="2 4"
              label={{ value: 'Pass 200', position: 'insideBottomLeft', fill: '#ef4444', fontSize: 10, offset: 5 }} />
          </AreaChart>
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

function buildStep3Summary(r: Step3Prediction): string {
  const p = Math.round(r.passProbability * 100);
  if (r.predictedScore >= 250) return `Top-tier range — sit at peak readiness rather than chasing more points. Pass probability ${p}%.`;
  if (r.predictedScore >= 230) return `Comfortable Safe-tier score. Focus the final stretch on CCS cases (which the predictor can't fully see).`;
  if (r.predictedScore >= 215) return `Likely pass with real margin. A second UWSA or a strong CCS push would tighten this further.`;
  if (r.predictedScore >= 200) return `Borderline — predicted just above the 200 pass line. Don't sit until you have more cushion.`;
  return `Predicted below the 200 pass line. Reschedule and rebuild the MCQ foundation before sitting.`;
}

const TIER_COLOR_S3: Record<string, string> = { Safe: '#10b981', Borderline: '#f59e0b', Risky: '#ef4444' };

export default function Step3Results({ result, onReset }: { result: Step3Prediction; onReset: () => void }) {
  const handleShare = () => {
    const text = `My predicted USMLE Step 3 score: ${result.predictedScore} (${result.lowerCI}–${result.upperCI}, ${Math.round(result.passProbability * 100)}% pass)\nPredict yours free at USMLEPredictor.com`;
    if (navigator.share) {
      navigator.share({ title: 'USMLE Step 3 Score Prediction', text, url: 'https://usmlepredictor.com/usmle-step-3-score-predictor' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="score-results" aria-live="polite">
      <div className="results-top">
        <button className="btn-back" onClick={onReset} aria-label="Start a new prediction"><ArrowLeft size={18} /> New Prediction</button>
        <button className="btn-share" onClick={handleShare} aria-label="Share this result"><Share2 size={18} /> Share</button>
      </div>

      <Step3Gauge score={result.predictedScore} low={result.lowerCI} high={result.upperCI}
        percentile={result.percentile} tier={result.verdictTier} />

      <div className="result-summary">
        <span className="result-summary-pill" style={{ borderColor: TIER_COLOR_S3[result.verdictTier] }}>
          What this means
        </span>
        <p>{buildStep3Summary(result)}</p>
      </div>

      <div className="confidence-badge">
        Pass probability: {Math.round(result.passProbability * 100)}% · Verdict: <strong>{result.verdictTier}</strong>
        {' '}· {result.realNeighborsUsed} real / {result.totalNeighborsUsed} total neighbors used
        {' '}· 1,523 verified outcomes
      </div>

      {result.inputBreakdown && result.inputBreakdown.length > 0 && (
        <div className="result-card">
          <h3><Target size={18} /> Per-Input Contributions</h3>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
            Each signal's individual Step 3 projection and its weight in the final ensemble.
            Weights renormalize over whichever inputs you entered.
          </p>
          <div className="breakdown-bars">
            {result.inputBreakdown.map((item, i) => (
              <div className="breakdown-item breakdown-item-wide" key={i}>
                <div className="breakdown-label">
                  <span>{item.label}: {item.value}</span>
                  <span className="breakdown-score">→ projects {item.contribution}</span>
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

      {result.cohortDistribution && (
        <DistributionChart dist={result.cohortDistribution} score={result.predictedScore} />
      )}

      {result.similarStudents && result.similarStudents.length > 0 && (
        <div className="result-card">
          <h3><Users size={18} /> Similar Students&apos; Actual Step 3 Scores</h3>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
            Nearest neighbors in our 1,523-row verified outcomes set (StudyCCS + r/Step3).
          </p>
          <div className="similar-table">
            <div className="similar-header">
              <span>Step 2 CK</span>
              <span>UWorld</span>
              <span>UWSA</span>
              <span>Actual</span>
            </div>
            {result.similarStudents.map((s, i) => (
              <div className="similar-row" key={i}>
                <span>{s.step2ck ?? '—'}</span>
                <span>{s.uworld != null ? `${s.uworld}%` : '—'}</span>
                <span>{s.uwsa ?? '—'}</span>
                <span className="actual-score" style={{ color: s.actualScore >= 220 ? '#10b981' : s.actualScore >= 200 ? '#f59e0b' : '#ef4444' }}>
                  {s.actualScore}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.insights && result.insights.length > 0 && (
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
          <Target size={18} /> Try Different Scores
        </button>
      </div>
    </div>
  );
}
