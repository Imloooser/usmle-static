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
      '/blog': 0.6,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
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