'use client';

import React from 'react';
import { LayoutDashboard, Users, BarChart, Settings, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Predictions', value: '12,847', icon: <BarChart size={20} /> },
    { label: 'Verified Scores', value: '5,039', icon: <Users size={20} /> },
    { label: 'Avg Prediction Error', value: '±4.2 pts', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <div className="admin-dashboard" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', background: '#0b0f1a', minHeight: '100vh', color: '#f1f5f9' }}>
      <header className="admin-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ minWidth: '200px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Admin Dashboard</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>System health and data metrics</p>
        </div>
        <button 
          onClick={() => window.location.hash = ''} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          <ArrowLeft size={16} /> <span className="hide-xs">Back to Predictor</span><span className="mobile-only">Back</span>
        </button>
      </header>

      <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2d3548', padding: '24px', borderRadius: '12px' }}>
            <div style={{ color: '#6366f1', marginBottom: '12px' }}>{stat.icon}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, marginTop: '4px' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="admin-actions" style={{ background: '#1a1f2e', border: '1px solid #2d3548', padding: '24px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>System Actions</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '10px 20px', background: '#6366f1', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'not-allowed', opacity: 0.6 }}>
            Refresh Cache
          </button>
          <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #2d3548', borderRadius: '8px', color: '#f1f5f9', fontWeight: 600, cursor: 'not-allowed', opacity: 0.6 }}>
            Export Database
          </button>
        </div>
      </div>
    </div>
  );
}
