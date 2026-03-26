import React, { lazy, Suspense, useState, useEffect } from 'react';
import ScorePredictor from './components/ScorePredictor';
import Footer from './components/Footer';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if URL hash is #admin
    const checkRoute = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  if (isAdmin) {
    return (
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0b0f1a', color: '#64748b', fontFamily: 'system-ui' }}>Loading...</div>}>
        <AdminDashboard />
        <Footer />
      </Suspense>
    );
  }

  return (
    <>
      <ScorePredictor />
      <Footer />
    </>
  );
}

export default App;
