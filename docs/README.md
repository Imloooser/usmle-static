# USMLE Predictor — Handoff to Developer

Hello! This package is a **new build** of usmlepredictor.com that **adds working
predictors for Step 1 and Step 3**, replaces two "Coming Soon" placeholder pages
with actual tools (NBME Converter + UWSA Converter), and applies a unified UI
+ mobile + SEO polish across the whole site.

It is structured as a **drop-in replacement** for the existing `usmle-static`
GitHub repo (the one currently deployed to Vercel that earns ~4K monthly visits).
The architecture, build pipeline, and deployment story are unchanged — same
Next.js static export, same Vercel host, same domain.

## Read these docs in order

| File | What it covers | Read time |
|---|---|---|
| [README.md](./README.md) | This file — start here | 5 min |
| [CHANGES.md](./CHANGES.md) | File-by-file diff vs `usmle-static` | 10 min |
| [NEW_FEATURES.md](./NEW_FEATURES.md) | Full catalog of new features + screenshots | 10 min |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Component hierarchy + data flow + key patterns | 8 min |
| [SEO_NOTES.md](./SEO_NOTES.md) | What was added for SEO + why each piece exists | 12 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | How to push to Vercel; rollback plan | 5 min |
| [ROADMAP.md](./ROADMAP.md) | Pending SEO Priority 1-3 tasks (~5-65 hours of work) | 10 min |

## Quick start (local)

```bash
cd usmle-final
npm install                  # ~1-2 min
npm run dev                  # → http://localhost:3000
```

That's it. Same scripts as the existing repo. No new infrastructure.

## Quick start (production deploy)

```bash
# From the unzipped folder
git init && git add -A && git commit -m "feat: new build with Step 1/3 + NBME/UWSA tools + SEO polish"
git remote add origin <existing-github-repo-url>
git push -u origin main --force        # ⚠ overwrites existing main — see DEPLOYMENT.md first
```

Vercel auto-builds on push. No DNS or environment changes needed.

**Read [DEPLOYMENT.md](./DEPLOYMENT.md) before pushing.** There's a safer
rollout option that uses a branch/preview deploy first.

## What this site is

A free USMLE score prediction site with 3 working predictors and 2 score
converters, plus extensive accuracy/methodology pages for SEO + trust.

### Routes (all static, no server runtime)

| URL | What it does | Status |
|---|---|---|
| `/` | Step 2 CK predictor (the existing one — kept verbatim) | Unchanged |
| `/usmle-step-1-score-predictor/` | Step 1 Pass/Fail predictor (anchored on NBME July 2024 table) | **NEW — was "Coming Soon"** |
| `/usmle-step-3-score-predictor/` | Step 3 score predictor (anchored on PMC8368809, n=27,118) | **NEW — was "Coming Soon"** |
| `/nbme-score-predictor/` | NBME % → Step 2 CK converter (per-form bias correction) | **NEW — was "Coming Soon"** |
| `/uwsa-score-predictor/` | UWSA → Step 2 CK converter (corrects overprediction) | **NEW — was "Coming Soon"** |
| `/accuracyinsights/` | Step 2 CK methodology + correlation data (existing) | Unchanged |
| `/step-1-accuracy-insights/` | Step 1 methodology + sources (cited NBME / IAMSE / FSMB) | **NEW page** |
| `/step-3-accuracy-insights/` | Step 3 methodology + sources (cited PMC8368809) | **NEW page** |
| `/blog/` | Blog index (existing) | Unchanged |

### Architecture

- **Next.js 16** with `output: 'export'` → pure static HTML/JS/CSS
- **TypeScript** throughout
- **Tailwind CSS** + a single ~2,700-line `globals.css` for component styling
- **Recharts** for result-page charts (now lazy-loaded — see [CHANGES.md](./CHANGES.md))
- **Sharp** for build-time OG image generation
- **next-sitemap** for sitemap.xml + robots.txt generation
- **No backend** — all predictions run client-side; nothing leaves the user's device

### Hosting

- **Vercel** (existing setup) — serves `out/` directory as static files
- `vercel.json` already configured with HSTS + security headers
- No environment variables needed
- ~7.9 MB build output

## What I did NOT touch

- The main `usmle-static/` GitHub repo (production) is **completely untouched**.
- This is a **parallel** build in a new folder. When you're ready to deploy,
  the contents of this folder replace the contents of the existing repo via
  `git push`. Nothing happens automatically.

## Where the work lives

```
usmle-final/
├── src/
│   ├── app/                       ← Next.js routes (pages)
│   │   ├── page.tsx              ← / (Step 2 CK predictor — UNCHANGED)
│   │   ├── usmle-step-1-score-predictor/page.tsx     ← NEW Step 1
│   │   ├── usmle-step-3-score-predictor/page.tsx     ← NEW Step 3
│   │   ├── nbme-score-predictor/page.tsx             ← NEW (was Coming Soon)
│   │   ├── uwsa-score-predictor/page.tsx             ← NEW (was Coming Soon)
│   │   ├── accuracyinsights/page.tsx                  ← Step 2 accuracy (UNCHANGED)
│   │   ├── step-1-accuracy-insights/page.tsx          ← NEW
│   │   ├── step-3-accuracy-insights/page.tsx          ← NEW
│   │   └── blog/page.tsx                              ← UNCHANGED
│   ├── components/                ← React components
│   │   ├── ScorePredictor.tsx                ← Step 2 (UNCHANGED behavior)
│   │   ├── Step1PredictorTool.tsx            ← NEW
│   │   ├── Step1Results.tsx                  ← NEW
│   │   ├── Step3PredictorTool.tsx            ← NEW
│   │   ├── Step3Results.tsx                  ← NEW
│   │   ├── NbmeScorePredictor.tsx            ← NEW
│   │   ├── UwsaConverter.tsx                 ← NEW
│   │   ├── PredictorHero.tsx                 ← NEW (shared hero across all 3 step pages)
│   │   ├── ExamSwitcher.tsx                  ← NEW (3-tab navigation)
│   │   ├── TrustBar.tsx                      ← NEW (citations + methodology link)
│   │   ├── Footer.tsx                        ← extended with new accuracy-page links
│   │   ├── SchemaMarkup.tsx                  ← UNCHANGED (existing schema injection helper)
│   │   ├── LoadingScreen.tsx                 ← existing — now used by Step 1/3 too
│   │   ├── DisableRightClick.tsx             ← UNCHANGED
│   │   └── ui/                               ← UNCHANGED (animated-shiny-text, number-ticker)
│   ├── services/                  ← Pure logic (predictors, etc.)
│   │   ├── scorePredictor.ts                ← Step 2 (UNCHANGED)
│   │   ├── step1Predictor.ts                ← NEW
│   │   ├── step3Predictor.ts                ← NEW
│   │   ├── nbmeConverter.ts                 ← NEW
│   │   ├── uwsaConverter.ts                 ← NEW
│   │   ├── api.ts                           ← UNCHANGED (existing)
│   │   └── security.ts                      ← UNCHANGED (existing)
│   ├── data/                      ← Static datasets bundled with the site
│   │   ├── scoreDataset.json                ← Step 2 (UNCHANGED, 2 MB)
│   │   └── step3Dataset.json                ← NEW Step 3 dataset (650 KB)
│   ├── lib/
│   │   ├── schemas.ts                        ← extended: was 18 schemas, now 27
│   │   └── utils.ts                          ← UNCHANGED
│   └── app/globals.css            ← extended with mobile breakpoints + new components
├── public/                        ← Static assets served as-is
│   ├── og-image.png               ← regenerated
│   ├── og-step-1.png              ← NEW (auto-generated)
│   ├── og-step-3.png              ← NEW
│   ├── og-nbme.png                ← NEW
│   ├── og-uwsa.png                ← NEW
│   ├── og-accuracy-step-1.png     ← NEW
│   ├── og-accuracy-step-2.png     ← NEW (regenerated)
│   ├── og-accuracy-step-3.png     ← NEW
│   ├── llms.txt                   ← extended with Step 1+3 sections (AI crawler doc)
│   └── ... existing favicons + manifest
├── scripts/
│   └── generate-og-images.js      ← NEW — generates 8 OG images via Sharp at build time
├── docs/                          ← This handoff documentation
├── next.config.ts                 ← UNCHANGED (output: 'export')
├── next-sitemap.config.js         ← extended: per-route priorities + AI crawler robots.txt
├── package.json                   ← `prebuild` hook added for OG generation; sharp dependency
├── vercel.json                    ← UNCHANGED (HSTS + security headers)
└── tsconfig.json                  ← UNCHANGED
```

## Questions / contact

If anything in this package is unclear, the docs were written by Claude
(Anthropic's AI). Lokesh (the owner) can clarify intent and decisions made
along the way.

Start with [CHANGES.md](./CHANGES.md) for the file-by-file diff against your
existing `usmle-static` repo.
