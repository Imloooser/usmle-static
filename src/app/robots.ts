export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'anthropic-ai', 'ClaudeBot', 'Claude-Web', 'cohere-ai'],
        allow: '/',
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://usmlepredictor.com/sitemap.xml',
    host: 'https://usmlepredictor.com',
  };
}