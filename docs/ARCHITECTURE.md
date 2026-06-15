# ARCHITECTURE — how the pieces fit together

## Big picture

```
                          ┌─────────────────────────┐
                          │      Next.js 16         │
                          │   output: 'export'      │
                          │  (no server runtime)    │
                          └──────────┬──────────────┘
                                     │
                                     ▼
                          ┌─────────────────────────┐
                          │   Static files in out/  │
                          │   HTML + JS + CSS + PNG │
                          └──────────┬──────────────┘
                                     │
                                     ▼
                          ┌─────────────────────────┐
                          │   Vercel static host    │
                          │   (or Cloudflare Pages) │
                          └─────────────────────────┘

Predictors run entirely IN THE BROWSER. No backend, no API, no Node at runtime.
```

## Page-level architecture

Every predictor page has the same anatomy:

```
┌──────────────────────────────────────────────────────────┐
│  <PageWrapper>                                           │
│    <SchemaMarkup schema={[…]} />     ← JSON-LD injected  │
│    <PredictorTool>                                       │
│      <main className="stepscore-main">                   │
│        <PredictorHero step="step1|step2|step3" />        │
│        <ExamSwitcher active="step1|step2|step3" />       │
│        <TrustBar step="step1|step2|step3" />             │
│        <form className="score-form">                     │
│          renderGroup(...)                                │
│          renderGroup(...)                                │
│          <button className="btn-predict">                │
│        </form>                                           │
│      </main>                                             │
│    </PredictorTool>                                      │
│    <main className="premium-main-content">              │
│      ...SEO content...                                   │
│      ...FAQ accordion...                                 │
│    </main>                                               │
│  </PageWrapper>                                          │
└──────────────────────────────────────────────────────────┘
```

The **PredictorHero**, **ExamSwitcher**, and **TrustBar** are shared across all
3 step predictor pages. Only the form and result components differ.

## Component dependency graph

```
src/app/page.tsx (Step 2 home)
└── ScorePredictor
    ├── PredictorHero (step="step2")
    ├── ExamSwitcher (active="step2")
    ├── TrustBar (step="step2")
    ├── LoadingScreen (during predict)
    └── ScoreResults (after predict)
        └── (recharts components, lazy-loaded)

src/app/usmle-step-1-score-predictor/page.tsx
└── Step1PredictorTool
    ├── PredictorHero (step="step1")
    ├── ExamSwitcher (active="step1")
    ├── TrustBar (step="step1")
    ├── LoadingScreen
    └── Step1Results (lazy-loaded)

src/app/usmle-step-3-score-predictor/page.tsx
└── Step3PredictorTool
    ├── PredictorHero (step="step3")
    ├── ExamSwitcher (active="step3")
    ├── TrustBar (step="step3")
    ├── LoadingScreen
    └── Step3Results (lazy-loaded)

src/app/nbme-score-predictor/page.tsx
└── NbmeScorePredictor (standalone — no PredictorHero shell, has its own)

src/app/uwsa-score-predictor/page.tsx
└── UwsaConverter (standalone — has its own hero)

src/app/{accuracyinsights,step-1-accuracy-insights,step-3-accuracy-insights}/page.tsx
    (purely SEO content — no JS components, just <details> accordions)
```

## Predictor data flow

All 5 predictors follow the same pattern:

```
User input (form)
    ↓
Predictor service function (pure TypeScript)
    ↓
Prediction object (typed interface)
    ↓
LoadingScreen plays 3.4s animation
    ↓
Result component renders (with charts, gauge, breakdown)
```

### Step 2 (most complex)

```
ScorePredictor.tsx
    ↓
scorePredictor.ts → predictScore()
    ↓ (uses scoreDataset.json — 5,039 rows)
3-method ensemble:
  • KNN over neighbors
  • Bias-corrected weighted average
  • Per-form regression
    ↓
ScorePrediction interface
    ↓
ScoreResults.tsx (renders gauge + breakdown + similar students + recharts)
```

### Step 1

```
Step1PredictorTool.tsx
    ↓
step1Predictor.ts → predictStep1()
    ↓ (NBME official pass-probability table — no dataset needed)
Lookup + interpolate + tier classification + downgrade rules
    ↓
Step1Prediction interface
    ↓
Step1Results.tsx
```

### Step 3

```
Step3PredictorTool.tsx
    ↓
step3Predictor.ts → predictStep3()
    ↓ (uses step3Dataset.json — 4,503 rows)
KNN + Step 2 CK regression + UWSA bias correction + per-form weighting
    ↓
Step3Prediction interface
    ↓
Step3Results.tsx
```

### NBME Converter

```
NbmeScorePredictor.tsx
    ↓
nbmeConverter.ts → predictNbme()
    ↓
Per-form linear conversion (raw % → 3-digit)
    + form-specific bias correction
    + optional Tackett 2021 days-decay
    + 80% prediction interval
    ↓
NbmePrediction interface (inline result panel, no separate Results file)
```

### UWSA Converter

```
UwsaConverter.tsx
    ↓
uwsaConverter.ts → predictUwsa()
    ↓
UWSA score - base bias - ceiling boost + days-decay
    ↓
UwsaPrediction interface (inline result panel)
```

## Schema injection pattern

```
src/lib/schemas.ts
    ↓ exports 27 schema objects + medicalWebPageSchema() factory
    ↓
import { foo, bar } from '@/lib/schemas'
    ↓
<SchemaMarkup schema={[foo, bar]} />
    ↓
<script type="application/ld+json">{JSON.stringify(...)}</script>
```

The `<SchemaMarkup>` component (`src/components/SchemaMarkup.tsx`) takes an
array of schema objects and renders them as JSON-LD `<script>` tags.

**Per page, you typically inject 3-5 schemas:**
- 1 root schema (WebApplication / MedicalWebPage / ScholarlyArticle)
- 1 FAQPage
- 1 BreadcrumbList
- (optional) Dataset
- (optional) Organization for editorial signals

**Sitewide schemas** (injected in `layout.tsx`):
- `organizationSchema`
- `websiteSchema` (with SearchAction)
- `editorialTeamSchema` (E-E-A-T)

## CSS architecture

All custom CSS lives in `src/app/globals.css` (~2,700 lines).

**Naming conventions:**
- `stepscore-*` → predictor app shell (header, main, app wrapper)
- `premium-*` → accuracy/blog page layout (long-form content)
- `hero-*` → hero sections (badge, H1, features, top row)
- `form-section` / `section-header` / `fields-grid` → collapsible form group
- `field` → individual input field
- `cohort-*` → segmented pill control
- `exam-switcher` / `exam-tab` → 3-tab pill switcher
- `trust-bar-v2` / `trust-stat` / `citation-pill` → trust bar component
- `btn-predict` → primary submit button
- `result-card` / `score-results` → result panel
- `breakdown-bars` / `breakdown-item` → result breakdown rows

**Mobile breakpoints:**
- `@media (max-width: 640px)` — primary mobile breakpoint
- `@media (max-width: 480px)` — small mobile
- `@media (max-width: 380px)` — micro phones

**Theme tokens** (defined in `:root` near the top of globals.css):
- `--bg: #0b0f1a` (page bg)
- `--bg-card: ...` (form section bg)
- `--bg-elevated: ...` (input bg)
- `--primary: #6366f1` (indigo)
- `--primary-glow: ...` (input focus shadow)
- `--text: #f1f5f9` (body text)
- `--text-secondary: #94a3b8` (labels)
- `--border: ...` (input borders)

## Build pipeline

```
package.json scripts:
  npm run dev      → next dev (port 3000, hot reload)
  npm run build    → 1. prebuild: node scripts/generate-og-images.js (Sharp)
                     2. next build → static export to out/
                     3. postbuild: next-sitemap (sitemap.xml + robots.txt)
  npm run start    → next start (rare for static export sites)
  npm run lint     → eslint
  npm run og       → manually regenerate OG images
```

**Key build constraint:** `output: 'export'` in `next.config.ts` makes this a
static export. No server-side rendering, no API routes, no `getServerSideProps`.
Everything runs in the user's browser.

**Hosting target:** Vercel serves `out/` directory directly. Same setup
as the existing `usmle-static` repo.

## State management

All component state is local (`useState`). No Redux, no Zustand, no Context.
The site has no cross-page state — each prediction is self-contained.

The Step 2 home page uses an `api.ts` service (`predictAPI.predict()`) that
wraps the prediction call — but it's NOT a real API call. It's a client-side
function that runs the predictor logic synchronously in the browser. Naming
is legacy from when the existing repo may have used a backend.

## Lazy loading

To keep the initial page bundle small:

| Component | When loaded |
|---|---|
| `ScoreResults` | After Step 2 prediction submit |
| `Step1Results` | After Step 1 prediction submit |
| `Step3Results` | After Step 3 prediction submit |
| Recharts library | When the results component mounts |

This is done via `lazy(() => import('./Step1Results'))` + `<Suspense>`.
The 1.4 MB recharts chunk is NOT in the first-paint bundle — only loads after
the user clicks "Predict".

## Image optimization

Static export means we can't use Next.js's built-in `<Image>` component for
runtime optimization (`images.unoptimized: true` in next.config.ts).

All images are:
- Pre-optimized PNGs (under 120 KB each for OG images, < 50 KB for icons)
- Served with `Cache-Control: public, max-age=31536000, immutable` for `/static/*` via vercel.json

## Routing

Standard Next.js App Router. Each folder under `src/app/` is a route:

```
src/app/
├── page.tsx                                    → /
├── layout.tsx                                  → root layout (wraps all routes)
├── usmle-step-1-score-predictor/page.tsx      → /usmle-step-1-score-predictor/
├── usmle-step-3-score-predictor/page.tsx      → /usmle-step-3-score-predictor/
├── nbme-score-predictor/page.tsx               → /nbme-score-predictor/
├── uwsa-score-predictor/page.tsx               → /uwsa-score-predictor/
├── accuracyinsights/page.tsx                   → /accuracyinsights/
├── step-1-accuracy-insights/page.tsx           → /step-1-accuracy-insights/
├── step-3-accuracy-insights/page.tsx           → /step-3-accuracy-insights/
└── blog/page.tsx                               → /blog/
```

`trailingSlash: true` in `next.config.ts` ensures `/foo` redirects to `/foo/` —
prevents duplicate-URL SEO issues.

## Hot spots to be careful with

1. **`scorePredictor.ts`** — Step 2 logic. The existing Step 2 home page earns
   ~4K monthly Google visits. Touching this risks regression. **Untouched in
   this build.**

2. **`scoreDataset.json`** — 5,039-row Step 2 training set. Untouched.

3. **`globals.css`** — 2,700 lines. New rules are appended at the bottom and
   don't override existing ones, but a typo in a new rule could cascade.
   Verify build after any change.

4. **`src/lib/schemas.ts`** — 27 schema exports. Some are inlined in pages,
   some are imported from this file. There's drift potential (the same FAQ
   appears as JSON-LD in this file AND as `<details>` in a page). See
   [ROADMAP.md](./ROADMAP.md) P2.8 for the consolidation task.

5. **OG images** — auto-regenerated at build time. If you edit `og-image.png`
   manually, the `prebuild` hook will overwrite it. Edit
   `scripts/generate-og-images.js` instead.
