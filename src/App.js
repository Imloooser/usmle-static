import React, { lazy, Suspense, useState, useEffect } from 'react';
import ScorePredictor from './components/ScorePredictor';
import Footer from './components/Footer';

import AccuracyInsights from './components/AccuracyInsights';
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

function App() {
  const [route, setRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  if (route === '#admin') {
    return (
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0b0f1a', color: '#64748b', fontFamily: 'system-ui' }}>Loading...</div>}>
        <AdminDashboard />
        <Footer />
      </Suspense>
    );
  }

  if (route === '#accuracy') {
    return (
      <>
        <AccuracyInsights onBack={() => navigateTo('#home')} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <ScorePredictor onNavigate={navigateTo} />
      <Footer />
    </>
  );
}

export default App;
