'use client';

import React, { useState, useEffect } from 'react';
import { Target, BarChart3, Users, Brain } from 'lucide-react';

const LOADING_STEPS = [
  { icon: BarChart3, label: 'Analyzing practice scores', delay: 0 },
  { icon: Brain, label: 'Running ensemble algorithm', delay: 800 },
  { icon: Users, label: 'Matching similar students', delay: 1600 },
  { icon: Target, label: 'Generating prediction', delay: 2200 },
];

export default function LoadingScreen() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = LOADING_STEPS.map((step, i) =>
      setTimeout(() => setActiveStep(i), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="loading-overlay-v2">
      {/* Animated background orbs */}
      <div className="loading-orb loading-orb-1" />
      <div className="loading-orb loading-orb-2" />
      <div className="loading-orb loading-orb-3" />

      <div className="loading-content">
        {/* Pulsing ring animation */}
        <div className="loading-ring-container">
          <div className="loading-ring loading-ring-outer" />
          <div className="loading-ring loading-ring-middle" />
          <div className="loading-ring loading-ring-inner" />
          <div className="loading-center-icon">
            <Target size={28} />
          </div>
        </div>

        <h3 className="loading-title">Predicting Your Score</h3>

        {/* Step indicators */}
        <div className="loading-steps">
          {LOADING_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeStep;
            const isDone = i < activeStep;
            return (
              <div
                key={i}
                className={`loading-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              >
                <div className="loading-step-icon">
                  <Icon size={16} />
                </div>
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="loading-progress-track">
          <div
            className="loading-progress-fill"
            style={{ width: `${((activeStep + 1) / LOADING_STEPS.length) * 100}%` }}
          />
        </div>

        <p className="loading-sub">
          Analyzing {(5039).toLocaleString()}+ verified data points
        </p>
      </div>
    </div>
  );
}
