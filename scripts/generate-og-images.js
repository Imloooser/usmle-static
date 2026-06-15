/**
 * Generate per-page OG images for usmlepredictor.com
 *
 * Outputs 1200x630 PNGs into public/. Run at build time:
 *   node scripts/generate-og-images.js
 *
 * Each image is rendered from an inline SVG template that supports a
 * gradient background, badge text, big H1, subline, and footer URL.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');

const PAGES = [
  {
    file: 'og-image.png',
    badge: 'FREE • DATA-BACKED',
    title: 'USMLE Score\nPredictor',
    subtitle: 'Step 1 · Step 2 CK · Step 3 — research-anchored predictions',
    gradient: ['#1e1b4b', '#312e81', '#0f172a'],
    accent: '#818cf8',
  },
  {
    file: 'og-step-1.png',
    badge: 'NBME-ANCHORED',
    title: 'Step 1 Pass/Fail\nPredictor',
    subtitle: 'Calibrated on NBME\'s July 2024 published pass-probability table',
    gradient: ['#1e3a8a', '#1e40af', '#0f172a'],
    accent: '#60a5fa',
  },
  {
    file: 'og-step-3.png',
    badge: 'PMC8368809 ANCHORED',
    title: 'Step 3 Score\nPredictor',
    subtitle: 'Research-anchored on n=27,118 peer-reviewed validation',
    gradient: ['#581c87', '#6b21a8', '#0f172a'],
    accent: '#c084fc',
  },
  {
    file: 'og-accuracy-step-2.png',
    badge: 'ACCURACY • 5,039 REPORTS',
    title: 'Step 2 CK\nAccuracy Insights',
    subtitle: 'MAE ~4 points · 96% within ±10 · 3-method ensemble methodology',
    gradient: ['#064e3b', '#065f46', '#0f172a'],
    accent: '#34d399',
  },
  {
    file: 'og-accuracy-step-1.png',
    badge: 'NBME ANCHOR + IAMSE 2024',
    title: 'Step 1 Pass/Fail\nAccuracy & Methodology',
    subtitle: 'NBME-anchored, peer-reviewed validation methodology',
    gradient: ['#0c4a6e', '#075985', '#0f172a'],
    accent: '#38bdf8',
  },
  {
    file: 'og-accuracy-step-3.png',
    badge: 'PMC8368809 • r ≈ 0.70',
    title: 'Step 3 Score\nAccuracy & Methodology',
    subtitle: 'Research-anchored validation · MAE ~7.9 · 74% within ±10',
    gradient: ['#581c87', '#7c2d12', '#0f172a'],
    accent: '#fb923c',
  },
  {
    file: 'og-nbme.png',
    badge: 'NBME CONVERSION',
    title: 'NBME Score\nConverter',
    subtitle: 'Convert NBME percent scores into predicted USMLE 3-digit scores',
    gradient: ['#1f2937', '#374151', '#0f172a'],
    accent: '#9ca3af',
  },
  {
    file: 'og-uwsa.png',
    badge: 'UWSA CONVERSION',
    title: 'UWSA Score\nConverter',
    subtitle: 'UWSA-1 / UWSA-2 to predicted Step 2 CK with bias correction',
    gradient: ['#7f1d1d', '#991b1b', '#0f172a'],
    accent: '#fca5a5',
  },
];

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function svgFor(page) {
  const titleLines = page.title.split('\n');
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${page.gradient[0]}"/>
      <stop offset="50%" stop-color="${page.gradient[1]}"/>
      <stop offset="100%" stop-color="${page.gradient[2]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="50%">
      <stop offset="0%" stop-color="${page.accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${page.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Top-left badge -->
  <rect x="64" y="64" rx="20" ry="20" width="${30 + page.badge.length * 11}" height="40"
        fill="rgba(255,255,255,0.06)" stroke="${page.accent}" stroke-opacity="0.45" stroke-width="1.5"/>
  <text x="${80}" y="92" font-family="-apple-system, system-ui, sans-serif" font-size="16"
        font-weight="700" fill="${page.accent}" letter-spacing="1.2px">${escapeXml(page.badge)}</text>

  <!-- Title -->
  ${titleLines.map((line, i) => `
    <text x="64" y="${250 + i * 88}" font-family="-apple-system, system-ui, sans-serif"
          font-size="78" font-weight="800" fill="#fff"
          letter-spacing="-2px">${escapeXml(line)}</text>
  `).join('')}

  <!-- Subtitle -->
  <text x="64" y="${250 + titleLines.length * 88 + 40}"
        font-family="-apple-system, system-ui, sans-serif" font-size="26"
        fill="rgba(255,255,255,0.78)">${escapeXml(page.subtitle)}</text>

  <!-- Footer URL + brand -->
  <text x="64" y="570" font-family="-apple-system, system-ui, sans-serif"
        font-size="22" font-weight="700" fill="${page.accent}">usmlepredictor.com</text>
  <text x="1136" y="570" text-anchor="end" font-family="-apple-system, system-ui, sans-serif"
        font-size="18" fill="rgba(255,255,255,0.5)">Free • No signup</text>

  <!-- Subtle bottom accent line -->
  <rect x="0" y="616" width="1200" height="3" fill="${page.accent}" opacity="0.4"/>
</svg>`.trim();
}

async function build() {
  for (const page of PAGES) {
    const svg = svgFor(page);
    const out = path.join(PUBLIC, page.file);
    await sharp(Buffer.from(svg))
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(out);
    const stats = fs.statSync(out);
    console.log(`  ✓ ${page.file}  (${(stats.size / 1024).toFixed(1)} KB)`);
  }
  console.log(`\nGenerated ${PAGES.length} OG images → ${PUBLIC}/`);
}

build().catch(err => {
  console.error('OG generation failed:', err);
  process.exit(1);
});
