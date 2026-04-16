'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, Users, BarChart, Download, LogOut, RefreshCw } from 'lucide-react';
import { downloadRuntimeCsv, pullRuntimeBoard, syncConfig } from '@/services/api';

type RangeRef = 'today' | '7d' | '30d' | 'all';

type DashData = {
  totals: {
    predictions: number;
    uniqueVisitors: number;
    scoreSubmissions: number;
    averagePredicted: number;
  };
  popular: Array<{ field: string; count: number }>;
  recent: Array<Record<string, unknown>>;
  visitors: Array<Record<string, unknown>>;
  csvRows: Array<Record<string, unknown>>;
  fetchedAt: number;
};

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [range, setRange] = useState<RangeRef>('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<DashData | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await pullRuntimeBoard(range);
      setData(result as DashData);
      syncConfig('admin_dashboard_refresh', { range });
    } catch {
      setError('Unable to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const id = window.setInterval(() => {
      void refresh();
    }, 30000);
    return () => window.clearInterval(id);
  }, [refresh]);

  const cards = useMemo(() => {
    if (!data) return [];
    return [
      { label: 'Total Predictions', value: data.totals.predictions.toLocaleString(), icon: <BarChart size={20} /> },
      { label: 'Unique Visitors', value: data.totals.uniqueVisitors.toLocaleString(), icon: <Users size={20} /> },
      { label: 'Score Submissions', value: data.totals.scoreSubmissions.toLocaleString(), icon: <LayoutDashboard size={20} /> },
      { label: 'Avg Predicted Score', value: data.totals.averagePredicted ? String(data.totals.averagePredicted) : '0', icon: <BarChart size={20} /> },
    ];
  }, [data]);

  const onCsv = () => {
    if (!data) return;
    downloadRuntimeCsv(data.csvRows, `usmle-runtime-${range}.csv`);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', background: '#0b0f1a', minHeight: '100vh', color: '#f1f5f9' }}>
      <header style={{ marginBottom: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Admin Dashboard</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Real-time activity from Upstash {data ? `• ${new Date(data.fetchedAt).toLocaleTimeString()}` : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['today', '7d', '30d', 'all'] as RangeRef[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '7px 10px',
                background: r === range ? '#6366f1' : '#111827',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {r === 'all' ? 'All' : r === 'today' ? 'Today' : r === '7d' ? '7 Days' : '30 Days'}
            </button>
          ))}
          <button onClick={() => void refresh()} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 10px', background: '#111827', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', cursor: 'pointer' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={onCsv} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 10px', background: '#111827', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', cursor: 'pointer' }}>
            <Download size={14} /> Export CSV
          </button>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 10px', background: '#7f1d1d', border: '1px solid #b91c1c', borderRadius: '8px', color: '#fef2f2', cursor: 'pointer' }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {loading ? <div style={{ color: '#94a3b8', marginBottom: '18px' }}>Loading dashboard data…</div> : null}
      {error ? <div style={{ color: '#f87171', marginBottom: '18px' }}>{error}</div> : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {cards.map((stat) => (
          <div key={stat.label} style={{ background: '#1a1f2e', border: '1px solid #2d3548', padding: '18px', borderRadius: '12px' }}>
            <div style={{ color: '#6366f1', marginBottom: '10px' }}>{stat.icon}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{stat.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        <div style={{ background: '#1a1f2e', border: '1px solid #2d3548', padding: '16px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 700 }}>Most Popular Input Fields</h3>
          <div style={{ display: 'grid', gap: '7px' }}>
            {(data?.popular || []).map((item) => (
              <div key={item.field} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '13px' }}>
                <span>{item.field}</span>
                <span>{item.count}</span>
              </div>
            ))}
            {!data?.popular?.length ? <div style={{ color: '#64748b', fontSize: '13px' }}>No prediction data yet.</div> : null}
          </div>
        </div>

        <div style={{ background: '#1a1f2e', border: '1px solid #2d3548', padding: '16px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 700 }}>Recent Activity (50)</h3>
          <div style={{ maxHeight: '240px', overflow: 'auto', display: 'grid', gap: '8px' }}>
            {(data?.recent || []).map((row, idx) => (
              <div key={`${String(row._ts || idx)}-${idx}`} style={{ border: '1px solid #2d3548', borderRadius: '8px', padding: '8px' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {String(row._type || 'event')} • {new Date(Number(row._ts || Date.now())).toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                  {String(row.fingerprintShort || 'na')} • {String(row.ip || 'no-ip')} • {String(row.city || '')} {String(row.country || '')}
                </div>
                {'predicted' in row ? <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Predicted: {String(row.predicted)}</div> : null}
                {'actualScore' in row ? <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Actual: {String(row.actualScore)} ({String(row.status || 'N/A')})</div> : null}
              </div>
            ))}
            {!data?.recent?.length ? <div style={{ color: '#64748b', fontSize: '13px' }}>No activity found.</div> : null}
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1f2e', border: '1px solid #2d3548', padding: '16px', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 700 }}>Visitor Details</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #2d3548' }}>Fingerprint</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #2d3548' }}>IP</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #2d3548' }}>Visits</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #2d3548' }}>Last Seen</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #2d3548' }}>Device</th>
              </tr>
            </thead>
            <tbody>
              {(data?.visitors || []).map((row) => (
                <tr key={String(row.fingerprint)}>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #1f2937' }}>{String(row.fingerprintShort || 'na')}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #1f2937' }}>{String(row.ip || 'no-ip')}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #1f2937' }}>{String(row.visitCount || 0)}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #1f2937' }}>{new Date(Number(row.lastSeen || 0)).toLocaleString()}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #1f2937' }}>{String(row.device || 'na')} • {String(row.screen || 'na')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
