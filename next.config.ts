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
      // Blog posts removed in the rebuild → send to the blog hub (preserve equity, clear 404s).
      { source: '/blog/step-2-score-for-internal-medicine-residency', destination: '/blog', permanent: true },
      { source: '/blog/usmle-score-requirements-by-specialty', destination: '/blog', permanent: true },
      { source: '/blog/usmle-step-2-ck-study-schedule', destination: '/blog', permanent: true },
      { source: '/blog/step-2-score-for-competitive-residency', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
