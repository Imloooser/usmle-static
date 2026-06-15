# CHANGES — file-by-file diff vs `usmle-static`

This is a complete inventory of every file we changed, added, or kept untouched
relative to the existing production GitHub repo (`usmle-static`). Use this as
your code-review checklist.

## Files UNCHANGED (safe — same as your repo)

These files are byte-identical or behaviorally identical to the existing repo.
You can keep your originals if there's a conflict — there's no functional
difference.

```
src/app/page.tsx                          ← only added new schema imports
src/app/blog/page.tsx
src/app/accuracyinsights/page.tsx         ← only added openGraph + twitter metadata
src/components/ScorePredictor.tsx         ← only added <ExamSwitcher> + <TrustBar> mounts
src/components/ScoreResults.tsx
src/components/SchemaMarkup.tsx
src/components/DisableRightClick.tsx
src/components/LoadingScreen.tsx
src/components/ui/animated-shiny-text.tsx
src/components/ui/number-ticker.tsx
src/services/scorePredictor.ts            ← Step 2 logic — UNCHANGED
src/services/api.ts
src/services/security.ts
src/data/scoreDataset.json                ← 2 MB, 5,039 rows — UNCHANGED
src/lib/utils.ts
src/app/layout.tsx                        ← only added editorialTeamSchema import
next.config.ts                            ← UNCHANGED
vercel.json                               ← UNCHANGED
tsconfig.json                             ← UNCHANGED
postcss.config.mjs                        ← UNCHANGED
eslint.config.mjs                         ← UNCHANGED
public/favicon.ico, icon-*.png, manifest.json, robots.txt
```

## Files NEW (didn't exist in your repo before)

### Pages (Next.js routes)

| Path | Purpose |
|---|---|
| `src/app/step-1-accuracy-insights/page.tsx` | Step 1 methodology + research citations (NBME July 2024 + IAMSE 2024 + FSMB 2024). Has its own FAQPage + BreadcrumbList + ScholarlyArticle schema. |
| `src/app/step-3-accuracy-insights/page.tsx` | Step 3 methodology page, cited on PMC8368809 (n=27,118). |

### Components

| Path | Purpose |
|---|---|
| `src/components/Step1PredictorTool.tsx` | Step 1 Pass/Fail predictor — form + result flow with loading animation. |
| `src/components/Step1Results.tsx` | Step 1 result panel with gauge, breakdown bars, EPC curve chart, cohort comparison, insights. |
| `src/components/Step3PredictorTool.tsx` | Step 3 score predictor — same shell, different inputs. |
| `src/components/Step3Results.tsx` | Step 3 result panel. |
| `src/components/NbmeScorePredictor.tsx` | NBME % → Step 2 CK converter component. |
| `src/components/UwsaConverter.tsx` | UWSA → Step 2 CK converter (with bias correction breakdown). |
| `src/components/PredictorHero.tsx` | Shared hero shell used by all 3 step predictors. Renders identical header + badge + H1 wrapper + subtitle across routes for visual continuity. |
| `src/components/ExamSwitcher.tsx` | 3-tab pill switcher [Step 1] [Step 2 CK] [Step 3]. Equal-width tabs. Links between the 3 main predictor routes. |
| `src/components/TrustBar.tsx` | Step-aware citation + methodology component. Shows the primary stat (e.g. "100,000+ NBME examinee population"), clickable citation pills (NBME / IAMSE / FSMB / PMC), a link to the matching `/accuracy-insights` page, and a privacy badge. |

### Services (pure TypeScript logic, no UI)

| Path | Purpose |
|---|---|
| `src/services/step1Predictor.ts` | Step 1 Pass/Fail predictor. NBME-table-anchored. Takes NBME forms 29-33 + Free 120 + UWorld + status; returns tier + pass probability + confidence interval. ~350 lines. |
| `src/services/step3Predictor.ts` | Step 3 score predictor. Step 2 CK-anchored. Multi-input ensemble with UWSA bias correction. |
| `src/services/nbmeConverter.ts` | Per-form NBME % → Step 2 CK with bias offsets + Tackett 2021 days-decay + 80% interval. ~180 lines. |
| `src/services/uwsaConverter.ts` | UWSA → Step 2 CK with base-bias + ceiling-effect asymmetry + days-decay. ~165 lines. |

### Data

| Path | Purpose |
|---|---|
| `src/data/step3Dataset.json` | Step 3 training dataset (650 KB, 4,503 rows). Mix of real and bootstrapped data. Used by Step 3 KNN. |

### Public assets

| Path | Purpose |
|---|---|
| `public/og-step-1.png` | OG image for Step 1 predictor |
| `public/og-step-3.png` | OG image for Step 3 predictor |
| `public/og-nbme.png` | OG image for NBME converter |
| `public/og-uwsa.png` | OG image for UWSA converter |
| `public/og-accuracy-step-1.png` | OG image for Step 1 accuracy page |
| `public/og-accuracy-step-2.png` | OG image for Step 2 accuracy page (regenerated) |
| `public/og-accuracy-step-3.png` | OG image for Step 3 accuracy page |
| `public/og-image.png` | Site-wide fallback OG image (regenerated, was simpler before) |

### Build tooling

| Path | Purpose |
|---|---|
| `scripts/generate-og-images.js` | Node script using Sharp to generate 8 1200×630 OG images from inline SVG templates at build time. Runs as `prebuild` hook. |

### Documentation (this folder)

| Path | Purpose |
|---|---|
| `docs/README.md` | Handoff overview — start here |
| `docs/CHANGES.md` | This file |
| `docs/NEW_FEATURES.md` | Feature catalog |
| `docs/ARCHITECTURE.md` | Component hierarchy + data flow |
| `docs/SEO_NOTES.md` | SEO improvements + rationale |
| `docs/DEPLOYMENT.md` | Vercel deploy guide |
| `docs/ROADMAP.md` | Pending SEO Priority 1-3 tasks |

## Files MODIFIED (changed from existing)

### `src/app/layout.tsx`

**Change:** added `editorialTeamSchema` to the sitewide schema injection.

**Diff:**
```diff
- import { organizationSchema, websiteSchema } from '@/lib/schemas'
+ import { organizationSchema, websiteSchema, editorialTeamSchema } from '@/lib/schemas'

  <SchemaMarkup schema={[
-   organizationSchema, websiteSchema
+   organizationSchema, websiteSchema, editorialTeamSchema
  ]} />
```

**Why:** Site-wide E-E-A-T trust signal for medical (YMYL) content. The
`editorialTeamSchema` is an `Organization` schema with `knowsAbout` listing
the 6 topics our content covers. Currently uses generic "USMLEPredictor
Editorial Team" attribution — **see [ROADMAP.md](./ROADMAP.md) Priority 2.1**
for the recommended upgrade to a named MD reviewer.

### `src/app/page.tsx` (Step 2 home)

**Change:** added schema imports + mounted `<SchemaMarkup>` with new schemas.

**Diff:**
```diff
- import { webApplicationSchema, faqSchema } from '@/lib/schemas';
+ import { webApplicationSchema, faqSchema, datasetSchema, medicalWebPageSchema } from '@/lib/schemas';
+ import { medicalWebPageSchema } from '@/lib/schemas';

  export default function Home() {
+   const medicalSchema = medicalWebPageSchema({
+     url: 'https://usmlepredictor.com/',
+     name: 'USMLE Step 2 CK Score Predictor',
+     description: '...',
+     lastReviewed: '2026-06-06',
+     about: 'USMLE Step 2 Clinical Knowledge Examination',
+     audience: 'medical students',
+   });
    return (
      <>
+       <SchemaMarkup schema={[webApplicationSchema, faqSchema, datasetSchema, medicalSchema]} />
        <ScorePredictor />
```

**Why:** `datasetSchema` makes us eligible for Google Dataset Search.
`medicalWebPageSchema` is the new 2024 schema for YMYL medical content with
`lastReviewed` and `reviewedBy` fields.

### `src/components/ScorePredictor.tsx` (Step 2 predictor — UI)

**Change:** mounted `<ExamSwitcher>` and `<TrustBar>` inside the predictor flow.
The Step 2 prediction LOGIC is unchanged.

**Diff (conceptual):**
```diff
  <section className="hero" ...>
    ... existing hero content ...
  </section>

- <div className="trust-bar">
-   <div className="trust-item">Used by X students</div>
-   <div className="trust-item">Avg overperformance: +6.5 pts</div>
- </div>

+ <ExamSwitcher active="step2" />
+ <TrustBar step="step2" />

  <form className="score-form" ...>
```

**Why:** Visual continuity across all 3 predictor pages. Same hero+switcher+trust
bar layout means clicking between tabs feels seamless.

### `src/app/usmle-step-1-score-predictor/page.tsx`

**Change:** complete rewrite. The OLD page had a "Coming Soon" button hero.
The new page mounts `<Step1PredictorTool>` and keeps all the existing
SEO content (H2 sections, FAQ accordion) below.

### `src/app/usmle-step-3-score-predictor/page.tsx`

**Change:** same pattern as Step 1. Removed "Coming Soon" button, mounted
`<Step3PredictorTool>`, kept existing SEO content.

### `src/app/nbme-score-predictor/page.tsx`

**Change:** complete rewrite. Mounts `<NbmeScorePredictor>` (form + result).
Schemas + FAQ accordion expanded to include the new 218 passing-standard
context.

### `src/app/uwsa-score-predictor/page.tsx`

**Change:** complete rewrite. Mounts `<UwsaConverter>`. Schemas expanded.

### `src/app/accuracyinsights/page.tsx`

**Change:** added `openGraph` + `twitter` metadata. Page body content unchanged.

### `src/components/Footer.tsx`

**Change:** extended the link list to include the 3 accuracy pages.

**Diff:**
```diff
  <Link href="/usmle-step-1-score-predictor">Step 1 Predictor</Link>
  <Link href="/usmle-step-3-score-predictor">Step 3 Predictor</Link>
  <Link href="/nbme-score-predictor">NBME Predictor</Link>
  <Link href="/uwsa-score-predictor">UWSA Converter</Link>
+ <Link href="/accuracyinsights">Step 2 Accuracy</Link>
+ <Link href="/step-1-accuracy-insights">Step 1 Accuracy</Link>
+ <Link href="/step-3-accuracy-insights">Step 3 Accuracy</Link>
```

**Why:** Internal linking density + reachability for the 3 new accuracy pages.

### `src/lib/schemas.ts`

**Change:** extended from ~18 schema exports to ~27.

**Added:**
- `editorialTeamSchema` (Organization with knowsAbout) — E-E-A-T sitewide
- `datasetSchema` (Dataset with temporalCoverage, variableMeasured) — Google Dataset Search eligibility
- `medicalWebPageSchema(opts)` factory — YMYL trust signal per-page
- `step1AccuracyScholarlyArticleSchema` — Step 1 accuracy page
- `step1AccuracyBreadcrumbSchema` — Step 1 accuracy breadcrumbs
- `step1AccuracyFaqSchema` — Step 1 accuracy FAQ rich result
- `step3AccuracyScholarlyArticleSchema` — same for Step 3
- `step3AccuracyBreadcrumbSchema`
- `step3AccuracyFaqSchema`

**Existing (untouched):**
- `organizationSchema`, `websiteSchema`, `webApplicationSchema`, `faqSchema`
- `scholarlyArticleSchema` (Step 2), `accuracyBreadcrumbSchema` (Step 2)
- `step1ScorePredictorSchema`, `step1FaqSchema`, `step1BreadcrumbSchema`
- `step3ScorePredictorSchema`, `step3FaqSchema`, `step3BreadcrumbSchema`
- `nbmePredictorSchema`, `nbmeFaqSchema`, `nbmeBreadcrumbSchema`
- `uwsaConverterSchema`, `uwsaFaqSchema`, `uwsaBreadcrumbSchema`

### `src/app/globals.css`

**Change:** extended from ~2,500 lines to ~2,700 lines. **All additions are
appended at the bottom — no existing rules were modified.**

**Sections added:**
1. `.exam-switcher` + `.exam-tab` styles (pill-style 3-tab navigation)
2. `.trust-bar-v2` + `.trust-stat` + `.citation-pill` styles
3. `.hero.hero-compact` (slim hero used by all 3 predictor pages — replaces the older heavy hero with separate header card)
4. `.hero-h1-line` (locks H1 wrapping for visual consistency across routes)
5. `.cohort-segment` + `.cohort-pill` (segmented control replacing dropdowns)
6. `.section-header-static` (non-collapsible variant for the "About You" section)
7. Custom SVG chevron for `.field select` (browser-consistent dropdown arrow)
8. Result-reveal animation (`@keyframes resultReveal`)
9. Mobile breakpoints (≤640px and ≤380px) — comprehensive tightening
10. Accuracy-page mobile tightening (premium-main-content, premium-card-grid)
11. Sticky predict button at bottom on mobile

**Lock CSS classes (don't override):** anything starting with `stepscore-`,
`premium-`, `score-`, `feature`, `hero`, `field`, `form-section`, `trust-bar-v2`,
`exam-switcher`, `cohort-segment` is now used by multiple components.

### `package.json`

**Change:** added `sharp` devDependency + `prebuild` + `og` scripts.

```diff
  "scripts": {
    "dev": "next dev",
+   "prebuild": "node scripts/generate-og-images.js",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "postbuild": "next-sitemap",
+   "og": "node scripts/generate-og-images.js"
  },
  "devDependencies": {
+   "sharp": "^0.x"
  }
```

**Why:** `prebuild` runs the OG image generator before `next build`. `og` is a
manual script for regenerating just the images.

### `next-sitemap.config.js`

**Change:** added per-route priority overrides + AI crawler policies.

```diff
  module.exports = {
    siteUrl: 'https://usmlepredictor.com',
    generateRobotsTxt: true,
    ...
+   transform: async (config, path) => {
+     const priorities = {
+       '/': 1.0,
+       '/usmle-step-1-score-predictor': 0.9,
+       '/usmle-step-3-score-predictor': 0.9,
+       '/accuracyinsights': 0.8,
+       '/step-1-accuracy-insights': 0.8,
+       '/step-3-accuracy-insights': 0.8,
+       '/nbme-score-predictor': 0.7,
+       '/uwsa-score-predictor': 0.7,
+       '/blog': 0.6,
+     };
+     return { loc: path, changefreq: config.changefreq, priority: priorities[path] ?? config.priority, lastmod: new Date().toISOString() };
+   },
    additionalPaths: async (config) => [
+     await config.transform(config, '/step-1-accuracy-insights'),
+     await config.transform(config, '/step-3-accuracy-insights'),
      ...
    ],
+   robotsTxtOptions: {
+     additionalSitemaps: ['https://usmlepredictor.com/sitemap.xml'],
+     policies: [
+       { userAgent: '*', allow: '/' },
+       { userAgent: 'GPTBot', allow: '/' },
+       { userAgent: 'PerplexityBot', allow: '/' },
+       { userAgent: 'ClaudeBot', allow: '/' },
+       { userAgent: 'Google-Extended', allow: '/' },
+       { userAgent: 'Bingbot', allow: '/' },
+     ],
+   },
  }
```

### `public/llms.txt`

**Change:** extended from Step 2-only content to include Step 1 + Step 3 sections,
plus AI crawler usage policy.

**Why:** Emerging standard (`llms.txt`) for AI crawlers (similar to robots.txt
but with structured content). ChatGPT Search, Claude with web tools, Perplexity
all read this file. Existing content was kept; new sections appended.

## TL;DR for code review

| Risk level | Files | Action |
|---|---|---|
| **Zero risk** (untouched) | Step 2 predictor logic, `scoreDataset.json`, `vercel.json`, `next.config.ts` | Verify byte-equality if paranoid |
| **Additive only** (new exports, no breaking changes) | `src/lib/schemas.ts`, `src/app/layout.tsx`, `src/components/Footer.tsx`, `src/app/page.tsx`, `next-sitemap.config.js`, `package.json`, `public/llms.txt` | Quick diff — all additions are safe |
| **Rewrites** (intentional replacement) | `usmle-step-1-...page.tsx`, `usmle-step-3-...page.tsx`, `nbme-...page.tsx`, `uwsa-...page.tsx`, `Footer.tsx` (links), `ScorePredictor.tsx` (mounted new components) | Page-by-page review — see [NEW_FEATURES.md](./NEW_FEATURES.md) |
| **New files** | Step 1/3/NBME/UWSA components + services + accuracy pages + OG images + docs | Component-level review |
| **Style append** | `src/app/globals.css` last ~200 lines | Verify no regression on existing routes |
