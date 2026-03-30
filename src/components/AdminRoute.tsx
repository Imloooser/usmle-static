'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import Footer from '@/components/Footer';

const AdminDashboard = lazy(() => import('@/components/AdminDashboard'));

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  if (isAdmin) {
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
        <AdminDashboard />
        <Footer stats={null} />
      </Suspense>
    );
  }

  return children;
}
