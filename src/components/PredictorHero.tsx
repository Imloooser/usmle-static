'use client';

import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';

interface PredictorHeroProps {
  step: 'step1' | 'step2' | 'step3';
}

// Constant across all 3 routes — only the highlighted step keyword in the
// H1 changes (for per-route SEO).
const STEP_LABEL: Record<PredictorHeroProps['step'], string> = {
  step1: 'Step 1',
  step2: 'Step 2 CK',
  step3: 'Step 3',
};

export default function PredictorHero({ step }: PredictorHeroProps) {
  return (
    <section className="hero hero-compact" aria-label="USMLE Score Predictor introduction">
      <div className="hero-top-row">
        {/* <span className="brand-mark">USMLE Predictor</span> */}
        {/* <span className="brand-pill">
          <Shield size={12} aria-hidden="true" />
          100% Free
        </span> */}
      </div>

      <div className="hero-badge">
        <AnimatedShinyText className="inline-flex gap-2 items-center justify-center px-4 py-1">
          <Zap size={14} aria-hidden="true" className="text-[#818cf8]" />
          <span className="text-[#818cf8]">Free, research-anchored</span>
        </AnimatedShinyText>
      </div>

      <h1 className="hero-h1 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
        <span className="hero-h1-line">
          Predict Your <span className="highlight">USMLE {STEP_LABEL[step]}</span> Score
        </span>
      </h1>
      <p className="hero-sub">
        Pick your exam below and enter your practice scores for an instant, research-anchored readiness estimate. Your inputs never leave your device.
      </p>
    </section>
  );
}
