# ROADMAP — pending SEO + content work

This is the prioritized backlog from the deep SEO research workflow Lokesh ran
in June 2026. The full research synthesis is condensed here for action.

## Where we stand

- ✅ **Foundation solid:** 27 schemas, per-page OG images, llms.txt, AI crawler robots.txt, lazy-loaded charts, mobile breakpoints
- ❌ **Still bleeding equity through 3 wounds:**
  1. ~~Footer not on every page~~ → Now fixed in `layout.tsx`
  2. Thin predictor pages (280-360 words) — site-wide Helpful Content drag
  3. Generic "Editorial Team" byline — fails YMYL audit for medical content

## Priority 1 — Ship This Week (~5 hours)

| # | Task | Effort | Impact |
|---|---|---|---|
| **P1.1** | Verify Footer renders on every route (already mounted in `layout.tsx` — confirm in browser) | 5 min | Internal linking density |
| **P1.2** | Fix dead internal link: `/step2-ck-predictor` → `/` in Step 3 page | 5 min | Crawl budget |
| **P1.3** | Verify ExamSwitcher + TrustBar are mounted on Step 1 + Step 3 (already done, confirm) | 5 min | Lateral linking |
| **P1.4** | Audit FAQ JSON-LD ↔ visible DOM — same Qs in both, no mismatches | 1 hr | Manual-action risk |
| **P1.5** | Confirm recharts is dynamic-imported (already done in lazy()) — verify with Lighthouse | 30 min | LCP/INP win |
| **P1.6** | Delete `/public/llm.txt` if present (legacy duplicate of `llms.txt`) | 5 min | Source-of-truth |
| **P1.7** | Fix `/public/logo.png` and `/public/screenshot.png` if referenced in schemas — either add files or remove from schema | 15 min | GSC validation |
| **P1.8** | Add `<Breadcrumbs />` visible UI to accuracy pages (BreadcrumbList JSON-LD already exists) | 1 hr | Rich result eligibility |
| **P1.9** | Verify next-sitemap config explicitly allows: OAI-SearchBot, Claude-SearchBot | 15 min | AI citation |
| **P1.10** | Submit sitemap to Google Search Console + Bing Webmaster Tools | 10 min | Discovery |

## Priority 2 — Ship This Month (~55 hours one-time)

### P2.1 — Contract named MD reviewer (10 hours + retainer)
**Biggest single YMYL ranking lever.**

- Engage 1-2 US-licensed MDs on monthly retainer ($300-800/mo)
- Replace `editorialTeamSchema` (generic Organization) with `Person` schema per reviewer:
  ```ts
  {
    '@type': 'Person',
    name: 'Dr. Firstname Lastname, MD',
    jobTitle: 'Medical Reviewer',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'MD',
    },
    alumniOf: '...',
    sameAs: [
      'https://npiregistry.cms.hhs.gov/...',
      'https://www.linkedin.com/in/...',
    ],
  }
  ```
- Add visible byline at top/bottom of every YMYL page:
  ```jsx
  <div className="medical-reviewer-byline">
    Medically reviewed by <a href="/authors/dr-firstname-lastname">Dr. Firstname Lastname, MD</a>
    on {lastReviewed}
  </div>
  ```
- Add `/authors/dr-firstname-lastname/` route per reviewer (Person schema + ORCID + NPI sameAs)

**Why:** 2026 core update specifically tightened YMYL author-credential evaluation. 96% of AI Overview citations come from sources with strong E-E-A-T. Anonymous "Editorial Team" bylines are a YMYL red flag.

### P2.2 — Per-form long-tail pages (12 hours)
**Build 15+ new pages** following the pattern that NBMEScore.com proves works:

- `/predictors/nbme-25-step-1` through `/predictors/nbme-33-step-1`
- `/predictors/nbme-9-step-2` through `/predictors/nbme-16-step-2`
- `/predictors/uwsa-1-step-1`, `/predictors/uwsa-2-step-1`
- `/predictors/uwsa-1-step-2`, `/predictors/uwsa-2-step-2`
- `/predictors/free-120-step-1`, `/predictors/free-120-step-2`

Each page:
- 500-800 words, exact-match H1 ("NBME 31 Score Conversion Calculator")
- The predictor widget filtered to that single form
- FAQ block with 4-6 form-specific Qs
- MedicalWebPage + WebApplication + BreadcrumbList JSON-LD

### P2.3 — Thicken thin predictor pages (8 hours)
Expand `/nbme-score-predictor`, `/uwsa-score-predictor`, `/usmle-step-1-score-predictor`, `/usmle-step-3-score-predictor` from 280-360 → 900-1,200 words.

Each page should add:
1. **BLUF answer in first 150 words** (e.g., "USMLEPredictor estimates Step X scores within MAE Y based on NBME/UWSA inputs.")
2. **Form-specific accuracy table** (3-4 col × 3-5 row — AI engines extract verbatim)
3. **2-3 score-range case examples**
4. **"How this differs from NBMEScore / PMSS" paragraph** (comparison content)
5. **Internal-link block to siblings** (cross-cluster reachability)

### P2.4 — Original-research "Accuracy Report" (10 hours)
Build `/accuracy-report-2026/` with:
- Validation cohort N (size, recruitment method)
- MAE per step (table)
- Calibration plot (Recharts ScatterChart)
- Confidence intervals
- Head-to-head vs NBME Self-Assessment / UWorld Self-Assessment / Free 120
- Article schema (NOT ScholarlyArticle per Eric Kuan)
- Dataset schema for underlying data

**Why:** Original-data content earns 55-120% more AI citations than restated content (Semrush). Direct counter-moat to PredictMyStepScore's "1M predictions" claim.

### P2.5 — Step 2 CK 218 passing-score freshness piece (4 hours)
`/blog/step-2-ck-218-passing-score/` — history of the 214 → 218 change effective
July 1, 2025, target NBME scores for safety margin, BlogPosting + FAQPage schema.

Only Lecturio has authoritative coverage. Freshness window open through 2026.

### P2.6 — Build `/medical-review-process` + rebuild `/about` (4 hours)
Required for YMYL audit:
- `/medical-review-process` — named MDs, review cadence (monthly minimum), evidence hierarchy, corrections policy, COI disclosure
- `/about` — founding team + credentials, methodology, data sources, funding, contact info, editorial independence statement

### P2.7 — Per-author bio pages at `/authors/dr-firstname-lastname/` (3 hours)
Template route per reviewer:
- Photo, full credentials, institution, publications, board cert, ORCID, NPI, state board profile
- Link every byline to this page
- Person schema with verifiable sameAs

### P2.8 — Consolidate `schemas.ts` as single source of truth (2 hours)
Currently some predictor pages have INLINE schema objects in `page.tsx` while `schemas.ts` exports duplicate Step 1/3/NBME/UWSA schemas that aren't used. Drift risk.

- Rewire the 4 predictor pages to import existing exports from `src/lib/schemas.ts`
- Delete the inline duplicates
- Single source of truth

### P2.9 — Add Article + BreadcrumbList + FAQPage schema to `/blog` (1 hour)
Currently `/blog` page ships zero JSON-LD. Add:
- Article schema with author + publisher + datePublished + dateModified
- BreadcrumbList (Home > Blog)
- FAQPage schema for the existing FAQ section
- Twitter card metadata + unique OG image
- Fix double-h1 issue (logo + page title)

### P2.10 — Lazy-load analytics scripts (15 min)
In `src/app/layout.tsx`, change `strategy="afterInteractive"` → `strategy="lazyOnload"` on:
- Microsoft Clarity
- Google Analytics gtag.js
- GA init script
- Umami script.js
- Umami recorder.js

**Why:** 5 afterInteractive scripts contribute to Total Blocking Time and INP.

## Priority 3 — Ongoing / Quarterly (~10 hrs/month)

### P3.1 — Content refresh cadence (every 7-14 days)
- Update `lastReviewed` on all YMYL pages (visible byline + JSON-LD)
- Bump validation cohort size + MAE on homepage + accuracy report
- Perplexity weights freshness at ~44% of source selection; stale content drops after ~14 days

### P3.2 — Score-submission UGC loop (4 hrs build + ongoing moderation)
"Submit your score after the exam" form on every predictor page:
- Grows a public dataset
- Enables a "X+ predictions delivered" social proof counter
- Mirrors PMSS's "1M predictions" moat

### P3.3 — Reddit + aggregator seeding (2-4 hrs/month)
- Authentic participation in r/medicalschool, r/Step2, r/Step1, r/Step_3
- Product Hunt launch
- Trustpilot profile
- G2 / Capterra listings (3× ChatGPT citation probability for sites with aggregator presence)

**Why:** Reddit drives **46.7% of top Perplexity citations**. Aggregator presence triples ChatGPT citation rate.

### P3.4 — Quarterly SEO audit (4 hrs/quarter)
- Screaming Frog crawl for orphan pages
- Google Search Console structured-data report review
- CrUX dashboard for INP/LCP/CLS at p75
- AI citation tracking (manual prompts → Perplexity/ChatGPT/Claude/AI Overviews)

### P3.5 — Comparison content cadence (1 page/quarter)
- "USMLEPredictor vs NBMEScore vs PredictMyStepScore accuracy"
- "AMBOSS Score Predictor vs free alternatives"
- "UWSA 1 vs UWSA 2 for Step 2"

High commercial intent, low competition.

## AI / GEO Specific Wins (folded into above)

1. **BLUF block in first 150 words** on every predictor page — 44.2% of LLM citations come from the first 30% of a page
2. **llms.txt audit** — already shipped, verify content quarterly
3. **AI crawler allow-list** — already in robots.txt, confirm with `curl -sL https://usmlepredictor.com/robots.txt`
4. **Quotable atomic blocks** — sprinkle stat-laden single-sentence statements LLMs lift verbatim
5. **Comparison tables (3-4 col × 3-5 row)** — AI engines extract verbatim
6. **Reddit AMA in r/medicalschool** post-launch of accuracy report
7. **Keep FAQPage JSON-LD** despite May 2026 SERP deprecation — AirOps measured 45.6% AI citation rate
8. **Get listed on G2 / Capterra / Product Hunt** — 3× ChatGPT citation probability

## What NOT to Do

- ❌ Add `aggregateRating` to WebApplication schema with fake counts → manual action risk
- ❌ Add HowTo schema → zero SERP lift since 2023 deprecation
- ❌ Add Practice Problem / Quiz / Dataset rich result schemas → Google retired Jan 2026
- ❌ Use NewsArticle or ScholarlyArticle for blog → use plain Article
- ❌ Keep generic "Editorial Team" bylines → fails YMYL audit (see P2.1)
- ❌ Backdate `lastReviewed` → Google cross-references Wayback Machine + GSC crawl dates
- ❌ Block AI crawlers in robots.txt → removes you from Perplexity/ChatGPT/Claude citation eligibility
- ❌ Keyword-stuff "USMLE Step 2 CK score predictor" → semantic completeness, not density, is the 2026 signal

## Measurement targets (90 days post-P1+P2)

- INP p75 mobile **< 200ms** (currently likely failing — 43% of sites do)
- **5+ AI Overview citations** on USMLE-related queries
- **15+ new long-tail rankings** from per-form pages
- GSC impressions **+50%** on YMYL pages from named-MD-reviewer rollout
- **Zero structured-data errors** in GSC after P1.7 + P2.8

## Estimated total effort

| Priority | Effort |
|---|---|
| P1 (this week) | ~5 hours |
| P2 (this month) | ~55 hours one-time + ongoing MD retainer ($300-800/month) |
| P3 (ongoing) | ~10 hours/month sustained |
| AI/GEO wins | ~6 hours (folded into P1/P2) |
| **TOTAL year 1** | **~65 hours dev + ~120 hours/year sustained + ~$4-10k MD retainer** |

## Why this order

**P1 first** because it's pure code/config cleanup with zero ambiguity and
hours-not-days effort. Removes obvious negative signals before adding positive
ones.

**P2 second** because it requires content + person budget but has the highest
single-impact lever (named MD reviewer = biggest YMYL signal in 2026).

**P3 sustained** because compounding monthly wins beat one-time pushes for
content sites. Sustainable cadence > heroic sprint.
