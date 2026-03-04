import React, { useState, useEffect, useCallback } from 'react';
import { getLocalAnalytics, clearLocalAnalytics } from '../services/api';
import { getDatasetStats } from '../services/scorePredictor';

// SHA-256 hash of admin password — change this by running:
// echo -n "yourpassword" | shasum -a 256
const ADMIN_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // "password"

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);

  const loadData = useCallback(() => {
    const analytics = getLocalAnalytics();
    setData(analytics);
    setStats(getDatasetStats());
  }, []);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const hash = await sha256(password);
    if (hash === ADMIN_HASH) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all local analytics data?')) {
      clearLocalAnalytics();
      loadData();
    }
  };

  const exportData = (type) => {
    const exportObj = type === 'all' ? data : { [type]: data[type] };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usmle-${type}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div style={styles.loginWrap}>
        <form onSubmit={handleLogin} style={styles.loginForm}>
          <h2 style={styles.loginTitle}>Admin Access</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            style={styles.input}
            autoFocus
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.btn}>Authenticate</button>
        </form>
      </div>
    );
  }

  if (!data) return null;

  const { events, predictions, submissions } = data;
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const last7 = new Date(now - 7 * 86400000).toISOString();

  const todayEvents = events.filter(e => e.t?.startsWith(today));
  const todayPredictions = predictions.filter(p => p.t?.startsWith(today));
  const week7Events = events.filter(e => e.t >= last7);
  const week7Predictions = predictions.filter(p => p.t >= last7);

  // Event count breakdown
  const eventCounts = {};
  events.forEach(e => { eventCounts[e.e] = (eventCounts[e.e] || 0) + 1; });
  const topEvents = Object.entries(eventCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>USMLEPredictor Admin</h1>
        <div style={styles.headerActions}>
          <button onClick={() => window.open('https://analytics.google.com', '_blank')} style={styles.gaBtn}>
            Open Google Analytics
          </button>
          <button onClick={() => { setAuthenticated(false); setPassword(''); }} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <p style={styles.subtitle}>Local analytics from this browser + GA4 tracking active (ID: G-SMNQX2K4CW)</p>

      {/* Stats Cards */}
      <div style={styles.cards}>
        <Card num={events.length} label="Total Events" />
        <Card num={predictions.length} label="Total Predictions" />
        <Card num={submissions.length} label="Score Submissions" />
        <Card num={todayEvents.length} label="Today Events" />
        <Card num={todayPredictions.length} label="Today Predictions" />
        <Card num={week7Events.length} label="7-Day Events" />
      </div>

      {/* Dataset Stats */}
      {stats && (
        <>
          <h2 style={styles.sectionTitle}>Dataset Info</h2>
          <div style={styles.cards}>
            <Card num={stats.totalDataPoints?.toLocaleString()} label="Data Points" />
            <Card num={stats.scoreRange?.avg} label="Avg Score" />
            <Card num={`${stats.scoreRange?.min}-${stats.scoreRange?.max}`} label="Score Range" />
            <Card num={`+${stats.avgOverperformance}`} label="Avg Overperformance" />
          </div>
        </>
      )}

      {/* Top Events */}
      <h2 style={styles.sectionTitle}>Top Events</h2>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Event</th><th style={styles.th}>Count</th></tr>
        </thead>
        <tbody>
          {topEvents.map(([event, count]) => (
            <tr key={event}><td style={styles.td}>{event}</td><td style={styles.td}>{count}</td></tr>
          ))}
          {topEvents.length === 0 && <tr><td style={styles.td} colSpan={2}>No events yet</td></tr>}
        </tbody>
      </table>

      {/* Recent Predictions */}
      <h2 style={styles.sectionTitle}>Recent Predictions</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Predicted</th>
            <th style={styles.th}>CI</th>
            <th style={styles.th}>Confidence</th>
            <th style={styles.th}>Inputs</th>
            <th style={styles.th}>Speed</th>
          </tr>
        </thead>
        <tbody>
          {predictions.slice(-20).reverse().map((p, i) => (
            <tr key={i}>
              <td style={styles.tdMono}>{p.t?.substring(0, 19).replace('T', ' ')}</td>
              <td style={{ ...styles.td, fontWeight: 700 }}>{p.p}</td>
              <td style={styles.td}>{p.ci}</td>
              <td style={styles.td}>{p.conf}%</td>
              <td style={styles.td}>{p.inputs}</td>
              <td style={styles.td}>{p.ms}ms</td>
            </tr>
          ))}
          {predictions.length === 0 && <tr><td style={styles.td} colSpan={6}>No predictions yet</td></tr>}
        </tbody>
      </table>

      {/* Recent Submissions */}
      <h2 style={styles.sectionTitle}>Score Submissions</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Actual Score</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.slice(-10).reverse().map((s, i) => (
            <tr key={i}>
              <td style={styles.tdMono}>{s.t?.substring(0, 19).replace('T', ' ')}</td>
              <td style={{ ...styles.td, fontWeight: 700 }}>{s.actualScore}</td>
              <td style={styles.td}>{s.status || '—'}</td>
            </tr>
          ))}
          {submissions.length === 0 && <tr><td style={styles.td} colSpan={3}>No submissions yet</td></tr>}
        </tbody>
      </table>

      {/* Actions */}
      <h2 style={styles.sectionTitle}>Data Actions</h2>
      <div style={styles.actions}>
        <button onClick={() => exportData('all')} style={styles.btn}>Export All Data (JSON)</button>
        <button onClick={() => exportData('predictions')} style={styles.btn}>Export Predictions</button>
        <button onClick={() => exportData('submissions')} style={styles.btn}>Export Submissions</button>
        <button onClick={() => exportData('events')} style={styles.btn}>Export Events</button>
        <button onClick={loadData} style={{ ...styles.btn, background: '#059669' }}>Refresh Data</button>
        <button onClick={handleClear} style={{ ...styles.btn, background: '#dc2626' }}>Clear Local Data</button>
      </div>

      <p style={styles.footer}>
        For full analytics, visit <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>Google Analytics</a>
        {' '}(property: G-SMNQX2K4CW). Local data shown above is from this browser only.
      </p>
    </div>
  );
}

function Card({ num, label }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardNum}>{num}</div>
      <div style={styles.cardLabel}>{label}</div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 1200, margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif', background: '#0b0f1a', color: '#e2e8f0', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
  headerActions: { display: 'flex', gap: 8 },
  title: { color: '#818cf8', fontSize: 24, margin: 0 },
  subtitle: { color: '#64748b', fontSize: 13, marginBottom: 20 },
  sectionTitle: { color: '#94a3b8', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, margin: '24px 0 12px' },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 },
  card: { background: '#1a1f2e', padding: '16px', borderRadius: 10, border: '1px solid #2d3548' },
  cardNum: { fontSize: 26, fontWeight: 700, color: '#6366f1' },
  cardLabel: { fontSize: 11, color: '#64748b', marginTop: 4 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 16 },
  th: { padding: '8px 10px', textAlign: 'left', borderBottom: '1px solid #2d3548', color: '#94a3b8', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' },
  td: { padding: '8px 10px', textAlign: 'left', borderBottom: '1px solid #1e293b', color: '#cbd5e1' },
  tdMono: { padding: '8px 10px', textAlign: 'left', borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontFamily: 'monospace', fontSize: 12 },
  actions: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 },
  btn: { padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 },
  gaBtn: { padding: '8px 16px', background: '#059669', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 },
  logoutBtn: { padding: '8px 16px', background: '#475569', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 },
  footer: { color: '#475569', fontSize: 12, marginTop: 40, paddingTop: 20, borderTop: '1px solid #1e293b' },
  loginWrap: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0b0f1a', fontFamily: 'system-ui, sans-serif' },
  loginForm: { background: '#1a1f2e', padding: 32, borderRadius: 12, border: '1px solid #2d3548', width: 340, textAlign: 'center' },
  loginTitle: { color: '#818cf8', fontSize: 20, marginBottom: 16 },
  input: { width: '100%', padding: '10px 12px', background: '#0b0f1a', border: '1px solid #2d3548', borderRadius: 6, color: '#e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none' },
  error: { color: '#f87171', fontSize: 13, marginBottom: 8 },
};

export default AdminDashboard;
