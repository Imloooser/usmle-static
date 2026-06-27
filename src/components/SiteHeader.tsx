import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';

type NavKey = 'predictor' | 'blog' | 'methodology' | 'accuracy';

const NAV: { key: NavKey; href: string; label: string }[] = [
  { key: 'blog', href: '/blog/', label: 'Blog' },
  { key: 'methodology', href: '/methodology/', label: 'Methodology' },
  { key: 'accuracy', href: '/accuracyinsights/', label: 'Accuracy' },
];

export default function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo" aria-label="USMLE Predictor — home">
          <span className="site-logo__mark">
            <Activity size={17} strokeWidth={2.6} />
          </span>
          <span className="site-logo__word">
            USMLE<span className="site-logo__accent">Predictor</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="site-nav__link"
              aria-current={active === item.key ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="cta-primary-button site-header__cta">
          Predict my score <ArrowRight size={15} />
        </Link>
      </div>
    </header>
  );
}
