import React from 'react';
import Link from 'next/link';
import { Award, ExternalLink, ShieldCheck, BookOpen, FlaskConical } from 'lucide-react';

interface TrustBarProps {
  step: 'step1' | 'step2' | 'step3';
}

// Step-aware copy. Trust signals balance authority (citations), specificity
// (verified stats), recency, and social proof — the four pillars of trust UX
// for YMYL (Your Money Your Life) content like medical-licensing predictors.
const TRUST: Record<TrustBarProps['step'], {
  primaryStat: string;
  primaryLabel: string;
  citations: Array<{ name: string; url: string }>;
  accuracyHref: string;
  accuracyLabel: string;
}> = {
  step1: {
    primaryStat: '100,000+',
    primaryLabel: 'examinee population',
    citations: [
      { name: 'NBME', url: 'https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf' },
      { name: 'IAMSE', url: 'https://julnet.swoogo.com/iamse2024/session/2192422/' },
      { name: 'FSMB', url: 'https://www.fsmb.org/usmle/' },
    ],
    accuracyHref: '/step-1-accuracy-insights/',
    accuracyLabel: 'See Step 1 accuracy methodology',
  },
  step2: {
    primaryStat: '5,039',
    primaryLabel: 'verified outcomes',
    citations: [
      { name: 'NBME', url: 'https://www.nbme.org/' },
      { name: 'USMLE', url: 'https://www.usmle.org/' },
      { name: 'FSMB', url: 'https://www.fsmb.org/usmle/' },
    ],
    accuracyHref: '/accuracyinsights/',
    accuracyLabel: 'See Step 2 CK accuracy methodology',
  },
  step3: {
    primaryStat: 'n=27,118',
    primaryLabel: 'peer-reviewed validation',
    citations: [
      { name: 'PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8368809/' },
      { name: 'USMLE', url: 'https://www.usmle.org/step-exams/step-3' },
      { name: 'NBME', url: 'https://www.nbme.org/' },
    ],
    accuracyHref: '/step-3-accuracy-insights/',
    accuracyLabel: 'See Step 3 accuracy methodology',
  },
};

export default function TrustBar({ step }: TrustBarProps) {
  const t = TRUST[step];
  return (
    <div className="trust-bar-v2" role="region" aria-label="Trust signals and citations">
      <div className="trust-stat">
        <Award size={16} className="trust-stat-icon" aria-hidden="true" />
        <div className="trust-stat-text">
          <strong>{t.primaryStat}</strong>
          <span>{t.primaryLabel}</span>
        </div>
      </div>

      <div className="trust-citations" aria-label="Source citations">
        <FlaskConical size={13} className="trust-citations-icon" aria-hidden="true" />
        <span className="trust-citations-label">Anchored on</span>
        {t.citations.map(c => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="citation-pill"
            aria-label={`Source: ${c.name}`}
          >
            {c.name}
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        ))}
      </div>

      {/* <Link href={t.accuracyHref} className="trust-methodology-link">
        <BookOpen size={14} aria-hidden="true" />
        <span>Methodology</span>
      </Link> */}

      <span className="trust-privacy" aria-label="Privacy assurance">
        <ShieldCheck size={13} aria-hidden="true" />
        <span>Scores never leave your device</span>
      </span>
    </div>
  );
}
