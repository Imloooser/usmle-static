/** @type {import('next-sitemap').IConfig} */
module.exports = {
siteUrl: 'https://usmlepredictor.com',
generateRobotsTxt: true,
changefreq: 'weekly',
priority: 0.7,
sitemapSize: 7000,
exclude: ['/api/*'],
additionalPaths: async (config) => [
await config.transform(config, '/accuracyinsights'),
await config.transform(config, '/usmle-step-1-score-predictor'),
await config.transform(config, '/usmle-step-3-score-predictor'),
await config.transform(config, '/nbme-score-predictor'),
await config.transform(config, '/uwsa-score-predictor'),
],
}