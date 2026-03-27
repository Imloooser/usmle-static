import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ArrowLeft, Target, TrendingUp, TrendingDown, Minus, Users, Lightbulb, AlertTriangle, CheckCircle, Info, Share2, Award } from 'lucide-react';
import { trackEvent } from '../services/api';
import { NumberTicker } from "./Number";

function ScoreGauge({ score, low, high, percentile }) {
  const min = 180;
  const max = 300;
  const pct = ((score - min) / (max - min)) * 100;
  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  const getColor = (s) => {
    if (s >= 260) return '#10b981';
    if (s >= 240) return '#6366f1';
    if (s >= 220) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="score-gauge">
      <div className="gauge-ring" style={{ '--ring-color': getColor(score), '--ring-pct': `${pct * 3.6}deg` }}>
        <div className="gauge-score" style={{ color: getColor(score) }}>
          <NumberTicker value={score} />
        </div>
      </div>
      <div className="gauge-label">Predicted Score</div>
      {percentile != null && (
        <div className="percentile-pill" style={{ background: getColor(score) }}>
          <Award size={14} /> {percentile}th Percentile
        </div>
      )}
      <div className="gauge-bar-container">
        <div className="gauge-bar-bg">
          <div
            className="gauge-bar-ci"
            style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
          />
          <div
            className="gauge-bar-needle"
            style={{ left: `${pct}%`, backgroundColor: getColor(score) }}
          />
        </div>
        <div className="gauge-labels">
          <span>180</span>
          <span>220</span>
          <span>240</span>
          <span>260</span>
          <span>280</span>
          <span>300</span>
        </div>
      </div>
      <div className="gauge-range">
        Confidence Range: <strong>{low}</strong> – <strong>{high}</strong>
      </div>
    </div>
  );
}

function TrendChart({ trend }) {
  if (!trend || !trend.scores || trend.scores.length < 2) return null;

  const data = trend.scores.map(s => ({
    name: s.label,
    score: s.score,
  }));

  return (
    <div className="result-card trend-card">
      <h3>
        {trend.direction === 'strongly_improving' || trend.direction === 'improving' ? (
          <TrendingUp size={20} className="trend-up" />
        ) : trend.direction === 'declining' || trend.direction === 'strongly_declining' ? (
          <TrendingDown size={20} className="trend-down" />
        ) : (
          <Minus size={20} />
        )}
        NBME Score Trend
      </h3>
      <p className="trend-message">{trend.message}</p>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9' }}
              formatter={(value) => [value, 'Score']}
            />
            <Area type="monotone" dataKey="score" stroke="#6366f1" fill="url(#scoreGradient)" strokeWidth={2} />
            <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ r: 5, fill: '#6366f1' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function InsightIcon({ type }) {
  switch (type) {
    case 'positive': return <CheckCircle size={16} className="insight-positive" />;
    case 'warning': return <AlertTriangle size={16} className="insight-warning" />;
    case 'info': return <Info size={16} className="insight-info" />;
    default: return <Lightbulb size={16} className="insight-neutral" />;
  }
}

function ScoreResults({ result, onReset }) {
  const {
    predictedScore,
    lowEstimate,
    highEstimate,
    confidence,
    percentile,
    inputBreakdown,
    similarStudents,
    trend,
    insights,
    dataPoints,
  } = result;

  const handleShare = () => {
    const text = `My predicted USMLE Step 2 CK score: ${predictedScore} (${lowEstimate}-${highEstimate})\nPredict yours free at USMLEPredictor.com`;
    trackEvent('share_clicked', { predicted: predictedScore });
    if (navigator.share) {
      navigator.share({ title: 'USMLE Score Prediction', text, url: 'https://usmlepredictor.com' });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="score-results">
      {/* Top Controls */}
      <div className="results-top">
        <button className="btn-back" onClick={onReset}>
          <ArrowLeft size={18} />
          New Prediction
        </button>
        <button className="btn-share" onClick={handleShare}>
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Main Score */}
      <ScoreGauge score={predictedScore} low={lowEstimate} high={highEstimate} percentile={percentile} />

      <div className="confidence-badge">
        Data Confidence: {confidence}% — Based on {dataPoints?.toLocaleString()} verified student reports
      </div>

      {/* Input Breakdown */}
      <div className="result-card">
        <h3><Target size={18} /> Your Input Weights</h3>
        <div className="breakdown-bars">
          {inputBreakdown.map((item, i) => (
            <div className="breakdown-item" key={i}>
              <div className="breakdown-label">
                <span>{item.label}</span>
                <span className="breakdown-score">{item.score}</span>
              </div>
              <div className="breakdown-bar-bg">
                <div
                  className="breakdown-bar-fill"
                  style={{ width: `${item.weight}%` }}
                />
              </div>
              <span className="breakdown-weight">{item.weight}% weight</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Chart */}
      <TrendChart trend={trend} />

      {/* Similar Students */}
      {similarStudents && similarStudents.length > 0 && (
        <div className="result-card">
          <h3><Users size={18} /> Similar Students' Actual Scores</h3>
          <div className="similar-table">
            <div className="similar-header">
              <span>Practice Avg</span>
              <span>Actual Score</span>
              <span>UWorld %</span>
              <span>Status</span>
            </div>
            {similarStudents.map((s, i) => (
              <div className="similar-row" key={i}>
                <span>{s.practiceAvg}</span>
                <span className="actual-score">{s.actualScore}</span>
                <span>{s.uworldPercent || '—'}%</span>
                <span className="status-tag">{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      {insights && insights.length > 0 && (
        <div className="result-card insights-card">
          <h3><Lightbulb size={18} /> Insights</h3>
          <div className="insights-list">
            {insights.map((insight, i) => (
              <div className={`insight-item insight-${insight.type}`} key={i}>
                <InsightIcon type={insight.type} />
                <p>{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="results-cta">
        <button className="btn-predict" onClick={onReset}>
          <Target size={18} />
          Try Different Scores
        </button>
      </div>
    </div>
  );
}

export default React.memo(ScoreResults);
