'use client';

import React from 'react';

export default function Footer({ stats }: { stats?: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center flex justify-center text-slate-400 border-white/5 pb-12 pt-8 ">
      <div className="max-w-full mx-auto flex flex-col gap-[12px] ">

        <p className="text-[11px] text-slate-300">
          <strong className="text-white font-semibold">
            USMLEPredictor.com
          </strong>{' '}
          — Free USMLE Step 2 CK Score Predictor
        </p>

        <p className="text-[12px] text-slate-500 leading-[1.4]">
          Predict your USMLE Step 2 CK score using NBME (Forms 9–16), UWSA (1–3),
          UWorld, and Free 120 scores. Powered by{' '}
          {stats?.totalDataPoints?.toLocaleString() || '5,039'}+ verified student data points.
        </p>

        <p className="text-[10px] text-slate-500 italic">
          Not affiliated with NBME, USMLE, UWorld, or any official organization.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="mailto:info@usmlepredictor.com"
            className="text-[13px] text-indigo-500 underline hover:text-indigo-400 transition-colors"
          >
            Contact Us
          </a>

          <a
            href="/accuracyinsights"
            className="text-[13px] text-indigo-500 underline hover:text-indigo-400 transition-colors"
          >
            Accuracy Insights
          </a>
        </div>

        <p className="text-[10px] h-10 text-slate-600">
          © {currentYear} USMLEPredictor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}