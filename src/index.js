import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/stepscore.css';
import { initSecurity, protectNetwork } from './services/security';

// Initialize security protections
initSecurity();
protectNetwork();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
