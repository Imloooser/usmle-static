/**
 * IndexNow ping — tells Bing (and any IndexNow-participating engine) about our URLs
 * right after each production deploy. ChatGPT search runs on Bing's index, so fast
 * Bing indexing directly feeds AI-search citations.
 *
 * Runs in postbuild AFTER next-sitemap. Only pings on Vercel production builds —
 * local and preview builds skip silently so we never spam the API.
 */
import { readFileSync } from 'node:fs';

const HOST = 'usmlepredictor.com';
const KEY = '760be6ad08e8598ded659057e19ea11d';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

if (process.env.VERCEL_ENV !== 'production') {
  console.log(`[indexnow] skipped (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'local'})`);
  process.exit(0);
}

const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.warn('[indexnow] no URLs found in sitemap — skipping ping');
  process.exit(0);
}

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  // 200 = accepted, 202 = accepted (key validation pending) — both fine.
  console.log(`[indexnow] pinged ${urlList.length} URLs — HTTP ${res.status}`);
} catch (err) {
  // Never fail the build over an indexing ping.
  console.warn(`[indexnow] ping failed (non-fatal): ${err?.message ?? err}`);
}
