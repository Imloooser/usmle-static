'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { checkAdminKey, clearAdminRef, hasAdminRef, saveAdminRef } from '@/services/api';

const AdminDashboard = lazy(() => import('@/components/AdminDashboard'));

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const atAdmin = window.location.hash === '#admin';
      setIsAdminRoute(atAdmin);
      setIsOpen(atAdmin ? hasAdminRef() : false);
      setError('');
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError('');

    try {
      const ok = await checkAdminKey(pass);
      if (!ok) {
        setError('Wrong password');
        return;
      }
      saveAdminRef();
      setIsOpen(true);
      setPass('');
    } catch {
      setError('Unable to validate password');
    } finally {
      setChecking(false);
    }
  };

  const onLogout = () => {
    clearAdminRef();
    setIsOpen(false);
    setPass('');
    setError('');
    window.location.hash = '';
  };

  if (isAdminRoute && isOpen) {
    return (
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              background: '#0b0f1a',
              color: '#64748b',
              fontFamily: 'system-ui',
            }}
          >
            Loading...
          </div>
        }
      >
        <AdminDashboard onLogout={onLogout} />
      </Suspense>
    );
  }

  if (isAdminRoute) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#0b0f1a',
          color: '#f1f5f9',
          padding: '24px',
        }}
      >
        <form
          onSubmit={onLogin}
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#1a1f2e',
            border: '1px solid #2d3548',
            borderRadius: '14px',
            padding: '24px',
            display: 'grid',
            gap: '14px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Admin Access</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>Enter the admin password to continue.</p>
          </div>

          <input
            type="password"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            placeholder="Password"
            required
            style={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '10px',
              color: '#f1f5f9',
              padding: '11px 12px',
              outline: 'none',
            }}
          />

          {error ? <div style={{ color: '#f87171', fontSize: '13px' }}>{error}</div> : null}

          <button
            type="submit"
            disabled={checking}
            style={{
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 12px',
              fontWeight: 700,
              cursor: checking ? 'wait' : 'pointer',
              opacity: checking ? 0.8 : 1,
            }}
          >
            {checking ? 'Checking…' : 'Unlock Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  return children;
}
