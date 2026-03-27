'use client';

import React, { useState, useEffect } from 'react';
import { Target, BarChart3, Users, Brain, Check } from 'lucide-react';

const LOADING_STEPS = [
  { icon: BarChart3, label: 'Analyzing practice scores', duration: 900 },
  { icon: Brain, label: 'Running ensemble algorithm', duration: 1000 },
  { icon: Users, label: 'Matching similar students', duration: 800 },
  { icon: Target, label: 'Generating prediction', duration: 700 },
];

// Total minimum time: sum of all durations = 3400ms
const TOTAL_DURATION = LOADING_STEPS.reduce((sum, s) => sum + s.duration, 0);

interface LoadingScreenProps {
  onComplete?: () => void;
  dataReady?: boolean;
}

export default function LoadingScreen({ onComplete, dataReady = false }: LoadingScreenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    LOADING_STEPS.forEach((step, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setActiveStep(i), elapsed));
      }
      elapsed += step.duration;
    });

    // After all steps played, mark final step as done, then fade out
    timers.push(setTimeout(() => {
      setActiveStep(LOADING_STEPS.length); // all done
    }, elapsed));

    timers.push(setTimeout(() => {
      setFading(true);
    }, elapsed + 300));

    timers.push(setTimeout(() => {
      onComplete?.();
    }, elapsed + 700));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const progress = activeStep >= LOADING_STEPS.length
    ? 100
    : ((activeStep + 1) / LOADING_STEPS.length) * 100;

  return (
    <div className={`loading-overlay-v2 ${fading ? 'loading-fade-out' : ''}`}>
      {/* Animated background orbs */}
      <div className="loading-orb loading-orb-1" />
      <div className="loading-orb loading-orb-2" />
      <div className="loading-orb loading-orb-3" />

      {/* Particle dots */}
      <div className="loading-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="loading-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="loading-content">
        {/* Improved concentric rings */}
        <div className="loading-ring-container">
          <div className="loading-ring-glow" />
          <div className="loading-ring loading-ring-outer" />
          <div className="loading-ring loading-ring-middle" />
          <div className="loading-ring loading-ring-inner" />
          <div className="loading-ring-dots">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="loading-ring-dot"
                style={{ '--dot-angle': `${i * 45}deg` } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="loading-center-icon">
            <Target size={26} />
          </div>
        </div>

        <h3 className="loading-title">Predicting Your Score</h3>
        <p className="loading-subtitle">Advanced 3-method ensemble analysis</p>

        {/* Step indicators */}
        <div className="loading-steps">
          {LOADING_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeStep;
            const isDone = i < activeStep || activeStep >= LOADING_STEPS.length;
            return (
              <div
                key={i}
                className={`loading-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
              >
                <div className="loading-step-icon">
                  {isDone ? <Check size={14} /> : <Icon size={16} />}
                </div>
                <span>{step.label}</span>
                {isDone && <span className="loading-step-check">✓</span>}
              </div>
            );
          })}
        </div>

        <div className="loading-progress-track">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="loading-sub">
          Analyzing {(5039).toLocaleString()}+ verified data points
        </p>
      </div>
    </div>
  );
}
