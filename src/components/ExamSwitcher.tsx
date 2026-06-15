import React from 'react';
import Link from 'next/link';

interface ExamSwitcherProps {
  active: 'step1' | 'step2' | 'step3';
}

const TABS = [
  { key: 'step1', label: 'Step 1', href: '/usmle-step-1-score-predictor/' },
  { key: 'step2', label: 'Step 2 CK', href: '/' },
  { key: 'step3', label: 'Step 3', href: '/usmle-step-3-score-predictor/' },
] as const;

/**
 * Segmented exam selector. The highlight pill sits statically on the active tab.
 * Each tab is a <Link> to a separate route, so navigation is a full re-render —
 * there is no in-place slide to animate. Keeping it static (no cursor-following)
 * makes it calm and predictable; the active page always renders with the pill in
 * the right place.
 */
export default function ExamSwitcher({ active }: ExamSwitcherProps) {
  return (
    <div className="exam-switcher" role="navigation" aria-label="USMLE Predictor Selector">
      <div className="exam-switcher-inner" role="tablist">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              role="tab"
              aria-selected={isActive}
              className={`exam-tab ${isActive ? 'exam-tab-active' : ''}`}
            >
              {isActive && <span className="exam-tab-indicator" aria-hidden="true" />}
              <span className="exam-tab-label">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
