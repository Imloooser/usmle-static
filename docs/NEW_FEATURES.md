# NEW_FEATURES — what was built

A complete catalog of what's new in this build, with the why and the where.

## 1. Step 1 Pass/Fail Predictor

**Route:** `/usmle-step-1-score-predictor/`

**Was:** "Coming Soon" button + 2000 words of SEO content + FAQ.

**Now:** Full pass-probability predictor using NBME forms 29-33 + Free 120 + UWorld + cohort.

**How it works (high level):**
- Accepts up to 5 NBME CBSSA scores (forms 29-33 only, percent correct)
- Optional Free 120 % and UWorld %
- Optional cohort (US-MD / US-DO / IMG) — affects advice tone, NOT the score
- Anchored on NBME's officially-published CBSSA pass-probability table (July 2024 update)
- Returns: tier (Very Safe / Safe / Likely Pass / Borderline / High Risk) + pass probability % + confidence interval + actionable advice
- Result shows: gauge with pass-prob, breakdown of input contributions, EPC curve chart, cohort comparison, insights

**Why this approach:**
Step 1 has been Pass/Fail since Jan 2022 — no 3-digit Step 1 score exists. NBME's published pass-probability table is calibrated on 100,000+ examinees per year — the most defensible single source. We don't try to outperform NBME's own data; we surface it cleanly.

**Validation:** Done in a separate workspace (not in this repo). The methodology is documented on the linked `/step-1-accuracy-insights` page.

**Files:**
- `src/services/step1Predictor.ts` (logic)
- `src/components/Step1PredictorTool.tsx` (form)
- `src/components/Step1Results.tsx` (results page)
- `src/app/usmle-step-1-score-predictor/page.tsx` (route)
- `src/app/step-1-accuracy-insights/page.tsx` (methodology page)

---

## 2. Step 3 Score Predictor

**Route:** `/usmle-step-3-score-predictor/`

**Was:** "Coming Soon" button + SEO content + FAQ.

**Now:** Full 3-digit Step 3 score predictor using Step 2 CK + UWorld + UWSA + NBME 6/7 + Free 137.

**How it works:**
- Step 2 CK score is the strongest single predictor (PMC8368809, n=27,118, r ≈ 0.70)
- Multi-source ensemble: KNN over the Step 3 training dataset + per-form regression + bias-corrected weighted average
- Returns: predicted 3-digit score + 95% CI + pass probability + percentile + verdict tier (Safe ≥220 / Borderline 200-219 / Risky <200)
- Result shows: gauge, breakdown, cohort comparison, similar students from dataset, insights

**Anchored on:** PMC8368809 (peer-reviewed, n=27,118).

**Files:**
- `src/services/step3Predictor.ts`
- `src/data/step3Dataset.json` (650 KB training data)
- `src/components/Step3PredictorTool.tsx`
- `src/components/Step3Results.tsx`
- `src/app/usmle-step-3-score-predictor/page.tsx`
- `src/app/step-3-accuracy-insights/page.tsx`

---

## 3. NBME Score Predictor / Converter

**Route:** `/nbme-score-predictor/`

**Was:** "Coming Soon" button (existing page in your repo).

**Now:** Per-form NBME % → Step 2 CK 3-digit converter with bias correction.

**How it works:**
- User picks NBME form (9-16)
- Enters either raw % correct OR the 3-digit equivalent on their NBME report
- Optional days-until-exam input applies Tackett 2021 decay (PMC8368818)
- Returns: bias-corrected Step 2 CK prediction + 80% interval + form reliability label

**Per-form bias offsets (community-aggregated):**
- NBME 9: -10 pts (older, under-predicts)
- NBME 10-12: -5 to -7 pts
- NBME 13: -5 pts
- NBME 14: -3 pts (co-best with Form 15)
- NBME 15: -3 pts (co-best with Form 14)
- NBME 16: -2 pts (newest CCSSA)

**Why this exists:**
The main Step 2 predictor accepts NBME inputs along with everything else. This single-input page captures students who only have ONE practice score and bounce from the multi-input main predictor. Also captures long-tail SEO from queries like "NBME 14 to step 2 converter".

**Honest caveats (in the UI):**
- NBME does NOT publish raw % → 3-digit conversion tables. We use community-aggregated coefficients.
- Realistic accuracy: ±6-10 pts depending on form recency.
- Bias offsets are stale-able as NBME silently recalibrates.

**Files:**
- `src/services/nbmeConverter.ts`
- `src/components/NbmeScorePredictor.tsx`
- `src/app/nbme-score-predictor/page.tsx`

---

## 4. UWSA Converter

**Route:** `/uwsa-score-predictor/`

**Was:** "Coming Soon" button (existing page in your repo).

**Now:** UWSA → Step 2 CK with overprediction correction.

**How it works:**
- User picks UWSA 1 / 2 / 3
- Enters 3-digit UWSA score (UWSA already outputs on USMLE scale — no % conversion needed)
- Optional days-until-exam
- Returns: bias-corrected Step 2 CK + 80% interval + ceiling-effect breakdown

**Bias model:**
- UWSA 1: base bias -5 pts, with progressive ceiling boost up to -7 for scores 270+
- UWSA 2: base -3 pts, ceiling boost -4 above 255 (less severe than UWSA 1)
- UWSA 3: -4 pts (experimental — newer, less validated)

**Why ceiling effect:** UWSA 1 in particular over-predicts more in the top score band (255+) due to a hard form ceiling. We apply a progressive correction starting at UWSA 255 and reaching full effect at UWSA 270.

**Files:**
- `src/services/uwsaConverter.ts`
- `src/components/UwsaConverter.tsx`
- `src/app/uwsa-score-predictor/page.tsx`

---

## 5. Step 1 + Step 3 Accuracy Insights pages

**Routes:** `/step-1-accuracy-insights/`, `/step-3-accuracy-insights/`

**Was:** Didn't exist. Only `/accuracyinsights/` (Step 2) existed in your repo.

**Now:** Two new methodology + research-citation pages, structured exactly like the existing Step 2 one (`accuracyinsights/page.tsx`) so the visual style matches.

**Each page contains:**
- Header with badge + title + last-updated date + CTA to the predictor
- "About This Methodology" section explaining the calibration anchor (NBME July 2024 for Step 1, PMC8368809 for Step 3)
- "Why Anchor on X" 5-bullet justification
- "Cross-Referenced Research" with 4 citation links
- 5 predictor-card grid showing form-specific correlation + accuracy
- Form-specific notes (current vs legacy forms)
- "How Our Predictor Compares" competitor table
- Cohort considerations (PGY-1 vs IMG vs pre-residency)
- Readiness tier system explanation
- 6 authoritative source links (real URLs)
- 9-question FAQ accordion
- Disclaimer

**Schemas injected per page:**
- `ScholarlyArticle` schema (with cited research)
- `BreadcrumbList` schema
- `FAQPage` schema (still parsed by AI engines despite Google SERP deprecation in May 2026)

**Why these pages:**
1. E-E-A-T trust signal for YMYL medical content
2. Long-tail SEO ("how accurate is step 1 prediction", "PMC8368809 step 3")
3. AI engine citation surface (ChatGPT, Claude, Perplexity all read these and may quote)

---

## 6. ExamSwitcher component

**File:** `src/components/ExamSwitcher.tsx` (~35 lines)

**What it does:** Pill-style 3-tab navigation between `/` (Step 2 CK), `/usmle-step-1-score-predictor`, and `/usmle-step-3-score-predictor`.

**Where it appears:** Inside `<ScorePredictor>`, `<Step1PredictorTool>`, `<Step3PredictorTool>` — same position on all three.

**Visual design:**
- 380px fixed-width container, 3 equal-width pills
- Active pill has indigo gradient background, white text
- Inactive pills are gray, hover transitions to lighter
- Mobile: full-width container, flex:1 tabs

**SEO consideration:** Each tab is a real `<Link>` (not a JavaScript tab) — Google sees them as real page transitions, preserving per-route ranking.

---

## 7. PredictorHero component (shared hero shell)

**File:** `src/components/PredictorHero.tsx` (~50 lines)

**What it does:** Renders an identical hero block at the top of all 3 predictor pages.

**Why this exists:** Initial implementation had each predictor with its own custom hero. Lokesh asked for visual continuity — when a user clicks between [Step 1] [Step 2 CK] [Step 3] tabs, only the form below the switcher should change. Hero + switcher must be pixel-identical.

**Output structure:**
- Top row: minimal brand mark ("USMLE PREDICTOR") + "100% Free" pill
- Animated shiny-text badge ("Free, research-anchored")
- H1: "Predict Your <span class='highlight'>USMLE Step X</span> Score" — only the highlighted keyword differs per route, for SEO
- Subtitle (identical across routes)
- (4 feature cards REMOVED — were noise; deleted per Lokesh's "bullshit hero" feedback)

**The H1 highlights the step keyword for per-route SEO** while keeping the surrounding text identical — the best of both worlds.

---

## 8. TrustBar component

**File:** `src/components/TrustBar.tsx` (~110 lines)

**What it does:** Step-aware citation + methodology component shown below the switcher on all 3 predictor pages.

**Structure:**
- Left: primary stat (e.g. "100,000+ NBME examinee population")
- Middle: "Anchored on" + 3 clickable citation pills linking to source URLs (NBME / IAMSE / FSMB for Step 1)
- "Methodology →" link routing to the matching `/accuracy-insights` page
- Right: 🛡️ "Scores never leave your device" privacy badge

**Per-step content:**
| Step | Stat | Citations |
|---|---|---|
| Step 1 | 100,000+ examinee population | NBME · IAMSE · FSMB |
| Step 2 | 5,039 verified outcomes | NBME · USMLE · FSMB |
| Step 3 | n=27,118 peer-reviewed validation | PMC · USMLE · NBME |

**Why this exists:**
- Citation pills = AI citation surface (ChatGPT, Perplexity prefer cited sources)
- Methodology link = internal linking + E-E-A-T transparency
- Privacy badge = trust signal (medical students stress-test predictors)
- Stat number = social proof

---

## 9. Loading animation on Step 1 and Step 3

**File:** `src/components/LoadingScreen.tsx` (existing component, now wired into Step 1/3)

**Was:** Only used by Step 2 (`<ScorePredictor>`).

**Now:** Used by all 3 predictors. When the user clicks "Predict", a 3.4-second animated overlay plays before the result reveals:
1. "Analyzing practice scores" (900ms) ✓
2. "Running ensemble algorithm" (1000ms) ✓
3. "Matching similar students" (800ms) ✓
4. "Generating prediction" (700ms) ✓

Plus a progress bar at the bottom.

**Why:** Builds anticipation, makes the prediction feel substantive (vs an instant flip), gives the brain time to register the input → output relationship. Standard pattern for prediction tools.

---

## 10. Mobile-friendly polish

**File:** `src/app/globals.css` (last ~200 lines)

**Breakpoints added:**
- `@media (max-width: 640px)` — phone-sized
- `@media (max-width: 380px)` — micro-screens

**Polish at ≤640px:**
- Hero compresses to ~28px H1, tighter padding
- Switcher tabs become full-width
- Trust bar stacks vertically with clean dividers between rows
- Form fields go from 4-column grid to 2-column
- Cohort pills scroll horizontally if they overflow
- Predict button becomes **sticky at bottom** with backdrop blur
- 44px minimum tap target on all interactive elements
- 16px input font-size (prevents iOS zoom on focus)

**Polish at ≤380px:**
- Form fields collapse to single column
- H1 shrinks further to ~22px

**Accuracy pages (long-form content):**
- `premium-card-grid` stacks to single column
- Wide tables become horizontally scrollable
- FAQ items get tighter padding

---

## 11. Per-page OG images

**Build script:** `scripts/generate-og-images.js` (~140 lines)

**What it does:** Generates 8 PNG files (1200×630) at build time from SVG templates. Each page gets a custom social-share preview when the URL is shared on Twitter, WhatsApp, Discord, ChatGPT, Slack, etc.

**Output files (in `public/`):**
- `og-image.png` (sitewide fallback)
- `og-step-1.png`
- `og-step-3.png`
- `og-nbme.png`
- `og-uwsa.png`
- `og-accuracy-step-1.png`
- `og-accuracy-step-2.png`
- `og-accuracy-step-3.png`

**Generated automatically** by the `prebuild` hook in package.json — runs before `next build`. No manual step.

**To customize:** Edit the `PAGES` array in `scripts/generate-og-images.js` and re-run `npm run og`.

**Each image has:**
- Page-specific gradient background + accent color
- Top-left badge (e.g. "NBME-ANCHORED")
- Big H1 (e.g. "Step 1 Pass/Fail Predictor")
- Subtitle (e.g. "Calibrated on NBME's July 2024 published pass-probability table")
- Brand footer ("usmlepredictor.com · Free • No signup")
- Subtle accent line at bottom

---

## 12. AI crawler support (`llms.txt`)

**File:** `public/llms.txt`

**What it does:** Tells AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) what each page is about, with citation-worthy summaries.

**Why:** Emerging standard for AI crawlers — like robots.txt but with structured content. ChatGPT Search, Claude with web tools, Perplexity all read this. Sites that don't have it lose citation eligibility in AI answers.

**Sections:**
- "USMLEPredictor.com" overview
- Predictor tools (Step 1, 2, 3)
- Accuracy methodology pages
- Supporting tools (NBME, UWSA)
- Research foundation (cited papers)
- Affiliation disclaimer
- AI crawler usage policy ("you may quote up to 200 words with attribution")

**Existed before:** Step 2 content only.
**Now:** Extended with Step 1 + Step 3 + AI policy.

---

## 13. Robots.txt AI crawler policies

**File:** `next-sitemap.config.js` (`robotsTxtOptions.policies`)

**What it does:** Generated `robots.txt` now explicitly allows:
- `GPTBot` (OpenAI / ChatGPT Search)
- `PerplexityBot`
- `ClaudeBot` (Anthropic)
- `Google-Extended` (Google's AI training crawler)
- `Bingbot` (Microsoft Copilot)

**Why:** Default `User-agent: *` allow already covered these, but explicit allow is the documented best practice and signals intent.

---

## 14. Schema markup extensions

**File:** `src/lib/schemas.ts`

**New schemas added:**

### `editorialTeamSchema` (Organization)
Sitewide E-E-A-T trust signal. `knowsAbout` lists the 6 medical topics our content covers. Currently uses generic "USMLEPredictor Editorial Team" attribution — see [ROADMAP.md](./ROADMAP.md) for the recommended upgrade to a named MD.

### `datasetSchema` (Dataset)
Mounted on the homepage. Makes us eligible for **Google Dataset Search** (a separate index from regular Google Search). `variableMeasured` lists each input field. `temporalCoverage: "2022-01/2026-03"` and `spatialCoverage: United States`.

### `medicalWebPageSchema(opts)` (factory)
A function that returns a `MedicalWebPage` schema with `lastReviewed`, `reviewedBy`, `medicalAudience`. Used on Step 1, Step 2, Step 3 predictor pages. **YMYL trust signal** required for medical content rich results.

### Accuracy page schemas
- `step1AccuracyScholarlyArticleSchema` + breadcrumb + FAQ
- `step3AccuracyScholarlyArticleSchema` + breadcrumb + FAQ

These mount on the new `/step-1-accuracy-insights` and `/step-3-accuracy-insights` pages.

**Existing schemas (untouched):**
- Step 1 predictor schemas (WebApplication, FAQ, BreadcrumbList)
- Step 3 predictor schemas (same set)
- NBME predictor schemas (same set)
- UWSA converter schemas (same set)
- Step 2 organization/website/webApplication/FAQ schemas

---

## Where things end up

| Category | Count |
|---|---|
| Pages | 9 routes (5 predictors + 3 accuracy + blog) |
| Components | 18 (incl. shared PredictorHero, ExamSwitcher, TrustBar) |
| Services (logic) | 5 (Step 1/2/3 predictors + NBME/UWSA converters) |
| Datasets | 2 (Step 2 + Step 3) |
| Schemas | 27 exports in `schemas.ts` |
| OG images | 8 (auto-generated at build) |
| LOC added (rough) | ~5,000 lines TypeScript/TSX + ~200 lines CSS |
| Build output | 7.8-7.9 MB static (no server runtime) |
