import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: 'export'` — prediction runs in a server route (src/app/api/predict),
  // so the model + datasets stay server-side. Content pages still statically prerender.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      // The Step 2 CK predictor now lives on the homepage; preserve this keyword URL
      // (existed on the old site, has crawl history) with a 301 instead of 404.
      { source: '/usmle-step-2-ck-score-predictor', destination: '/', permanent: true },
      // Blog posts removed in the rebuild. Each 301s to the closest surviving page
      // that satisfies the SAME intent — redirecting to the generic /blog/ hub is
      // treated as a soft 404 and passes no equity. Destinations carry the trailing
      // slash so we don't chain through an extra trailingSlash normalization hop.
      //
      // All three "what score do I need" posts map to the specialty-score page,
      // which carries the per-specialty table and percentile data they covered.
      { source: '/blog/step-2-score-for-internal-medicine-residency', destination: '/what-is-a-good-step-2-ck-score/', permanent: true },
      { source: '/blog/usmle-score-requirements-by-specialty', destination: '/what-is-a-good-step-2-ck-score/', permanent: true },
      { source: '/blog/step-2-score-for-competitive-residency', destination: '/what-is-a-good-step-2-ck-score/', permanent: true },
      // Study-schedule intent → the Step 2 CK guide (how to read practice scores
      // and time your assessments) is the closest surviving equivalent.
      { source: '/blog/usmle-step-2-ck-study-schedule', destination: '/blog/usmle-step-2-ck-score-prediction-guide/', permanent: true },
      // Mistyped inbound URL (missing 's') seen receiving real visitors in Clarity —
      // likely a bad external/AI citation. Preserve those visits with a 301.
      { source: '/step-1-accuracy-insight', destination: '/step-1-accuracy-insights/', permanent: true },
    ];
  },
};

export default nextConfig;
