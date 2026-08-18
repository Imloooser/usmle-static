const { execFileSync } = require('node:child_process');
const nodePath = require('node:path');
const fs = require('node:fs');

// Map each route to the source file that actually produces it, so lastmod can be
// the file's real last-commit date instead of the build timestamp. A single
// build-time value repeated across every URL is the textbook signal Google
// discards — and it destroys our ability to say *which* page changed.
const SOURCE_FILE = {
  '/': 'src/app/page.tsx',
  '/accuracyinsights': 'src/app/accuracyinsights/page.tsx',
  '/methodology': 'src/app/methodology/page.tsx',
  '/nbme-score-predictor': 'src/app/nbme-score-predictor/page.tsx',
  '/uwsa-score-predictor': 'src/app/uwsa-score-predictor/page.tsx',
  '/step-1-accuracy-insights': 'src/app/step-1-accuracy-insights/page.tsx',
  '/step-3-accuracy-insights': 'src/app/step-3-accuracy-insights/page.tsx',
  '/usmle-step-1-score-predictor': 'src/app/usmle-step-1-score-predictor/page.tsx',
  '/usmle-step-3-score-predictor': 'src/app/usmle-step-3-score-predictor/page.tsx',
  '/what-is-a-good-step-2-ck-score': 'src/app/what-is-a-good-step-2-ck-score/page.tsx',
  '/blog': 'src/app/blog/page.tsx',
  '/blog/usmle-step-3-passing-score': 'src/content/blog/usmle-step-3-passing-score.tsx',
  '/blog/ccs-cases-usmle-step-3': 'src/content/blog/ccs-cases-usmle-step-3.tsx',
  '/blog/step-3-score-predictor-nbme-uwsa-correlation': 'src/content/blog/step-3-score-predictor-nbme-uwsa-correlation.tsx',
  '/blog/how-to-calculate-step-1-pass-probability': 'src/content/blog/how-to-calculate-step-1-pass-probability.tsx',
  '/blog/which-nbme-form-is-most-accurate': 'src/content/blog/which-nbme-form-is-most-accurate.tsx',
  '/blog/usmle-step-2-ck-score-prediction-guide': 'src/content/blog/usmle-step-2-ck-score-prediction-guide.tsx',
};

/**
 * Real last-modified date for a route, as an ISO date.
 * Prefers the file's last git commit; falls back to filesystem mtime; returns
 * undefined if neither is available — an ABSENT lastmod is better than a false
 * one, since Google ignores lastmod values it decides it cannot trust.
 */
function lastModifiedFor(route) {
  const rel = SOURCE_FILE[route];
  if (!rel) return undefined;
  const abs = nodePath.join(__dirname, rel);
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', rel], {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) return out;
  } catch {
    // git unavailable (e.g. shallow CI checkout) — fall through to mtime
  }
  try {
    return fs.statSync(abs).mtime.toISOString();
  } catch {
    return undefined;
  }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://usmlepredictor.com',
  generateRobotsTxt: true,
  // Single sitemap.xml (no index) — we have ~9 URLs, well under the 7000 limit, so an
  // index that references itself is just a malformed-sitemap warning in Search Console.
  generateIndexSitemap: false,
  // Not a static export anymore — emit sitemap.xml + robots.txt into public/ so
  // they're served as static assets by the Next app on Vercel.
  outDir: './public',
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  // Exclude generated artifact files so they are never listed as crawlable
  // pages (prevents a bogus /sitemap.xml/ entry inside the sitemap).
  exclude: ['/api/*', '/sitemap.xml', '/sitemap-0.xml', '/robots.txt'],
  // Per-route priorities (higher = more important in sitemap)
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/usmle-step-1-score-predictor': 0.9,
      '/usmle-step-3-score-predictor': 0.9,
      '/accuracyinsights': 0.8,
      '/step-1-accuracy-insights': 0.8,
      '/step-3-accuracy-insights': 0.8,
      '/nbme-score-predictor': 0.7,
      '/uwsa-score-predictor': 0.7,
      '/what-is-a-good-step-2-ck-score': 0.8,
      '/methodology': 0.8,
      '/blog': 0.6,
      '/blog/step-3-score-predictor-nbme-uwsa-correlation': 0.7,
      '/blog/usmle-step-3-passing-score': 0.7,
      '/blog/ccs-cases-usmle-step-3': 0.7,
      '/blog/which-nbme-form-is-most-accurate': 0.7,
      '/blog/how-to-calculate-step-1-pass-probability': 0.7,
      '/blog/usmle-step-2-ck-score-prediction-guide': 0.6,
    };
    const lastmod = lastModifiedFor(path);
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      // Omitted entirely when we have no trustworthy date for the route.
      ...(lastmod ? { lastmod } : {}),
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/accuracyinsights'),
    await config.transform(config, '/step-1-accuracy-insights'),
    await config.transform(config, '/step-3-accuracy-insights'),
    await config.transform(config, '/usmle-step-1-score-predictor'),
    await config.transform(config, '/usmle-step-3-score-predictor'),
    await config.transform(config, '/nbme-score-predictor'),
    await config.transform(config, '/uwsa-score-predictor'),
    await config.transform(config, '/what-is-a-good-step-2-ck-score'),
    await config.transform(config, '/methodology'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/blog/step-3-score-predictor-nbme-uwsa-correlation'),
    await config.transform(config, '/blog/usmle-step-3-passing-score'),
    await config.transform(config, '/blog/ccs-cases-usmle-step-3'),
    await config.transform(config, '/blog/which-nbme-form-is-most-accurate'),
    await config.transform(config, '/blog/how-to-calculate-step-1-pass-probability'),
    await config.transform(config, '/blog/usmle-step-2-ck-score-prediction-guide'),
  ],
  robotsTxtOptions: {
    additionalSitemaps: ['https://usmlepredictor.com/sitemap.xml'],
    policies: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      // Allow major AI search + training crawlers (modern SEO / GEO)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
  },
};