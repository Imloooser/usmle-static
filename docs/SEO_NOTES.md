# SEO_NOTES — what was added, why, and what to do next

This document explains the SEO state of the build. The full prioritized
action plan is in [ROADMAP.md](./ROADMAP.md) — this file documents what
exists today and the rationale.

## What's in place (June 2026)

### Structured data (27 schemas)

| Schema | Where | Purpose |
|---|---|---|
| `organizationSchema` | layout.tsx (sitewide) | Org identity |
| `websiteSchema` | layout.tsx (sitewide) | WebSite + SearchAction |
| `editorialTeamSchema` | layout.tsx (sitewide) | E-E-A-T sitewide |
| `webApplicationSchema` | / (Step 2 home) | Step 2 tool eligibility |
| `faqSchema` | / | FAQ rich result (deprecated May 2026, still parsed by AI) |
| `datasetSchema` | / | Google Dataset Search eligibility |
| `medicalWebPageSchema()` (factory) | All predictor pages + accuracy pages | YMYL trust signal w/ `lastReviewed` |
| `scholarlyArticleSchema` | /accuracyinsights | Step 2 methodology page |
| `accuracyBreadcrumbSchema` | /accuracyinsights | Breadcrumb trail |
| `step1ScorePredictorSchema` | /usmle-step-1-score-predictor | Step 1 tool |
| `step1FaqSchema` | Step 1 page | Step 1 FAQ |
| `step1BreadcrumbSchema` | Step 1 page | Breadcrumb |
| `step3ScorePredictorSchema` | Step 3 page | Step 3 tool |
| `step3FaqSchema` | Step 3 page | Step 3 FAQ |
| `step3BreadcrumbSchema` | Step 3 page | Breadcrumb |
| `step1AccuracyScholarlyArticleSchema` | /step-1-accuracy-insights | Methodology page |
| `step1AccuracyBreadcrumbSchema` | Step 1 accuracy | Breadcrumb |
| `step1AccuracyFaqSchema` | Step 1 accuracy | FAQ |
| `step3AccuracyScholarlyArticleSchema` | /step-3-accuracy-insights | Methodology |
| `step3AccuracyBreadcrumbSchema` | Step 3 accuracy | Breadcrumb |
| `step3AccuracyFaqSchema` | Step 3 accuracy | FAQ |
| `nbmePredictorSchema` | /nbme-score-predictor | NBME tool |
| `nbmeFaqSchema` | NBME page | FAQ |
| `nbmeBreadcrumbSchema` | NBME page | Breadcrumb |
| `uwsaConverterSchema` | /uwsa-score-predictor | UWSA tool |
| `uwsaFaqSchema` | UWSA page | FAQ |
| `uwsaBreadcrumbSchema` | UWSA page | Breadcrumb |

### Per-page metadata

Every page has:
- ✅ Unique `title` tag (with keyword in front)
- ✅ Unique `description` meta
- ✅ Canonical URL (`alternates.canonical`)
- ✅ `openGraph` block with per-page OG image
- ✅ `twitter` card metadata
- ✅ Page-specific `<h1>` (single, no duplicates)

### Sitemap + robots

`next-sitemap.config.js` generates:
- `out/sitemap.xml` with per-route priorities
- `out/robots.txt` with explicit allow rules for:
  - `*` (all bots)
  - `GPTBot` (OpenAI)
  - `PerplexityBot`
  - `ClaudeBot` (Anthropic)
  - `Google-Extended` (Google AI training)
  - `Bingbot`

### AI crawler optimization

- `public/llms.txt` exists and is structured for AI engines
- All 8 main routes are mentioned with summaries
- Cited research sources listed verbatim (NBME PDFs, PMC papers, IAMSE 2024)
- AI usage policy ("you may quote up to 200 words with attribution")

### Performance

- Static export (no server runtime)
- Build output: 7.8-7.9 MB total
- Recharts lazy-loaded (NOT in first-paint bundle)
- Step 1/3 Results components lazy-loaded
- Sharp-generated OG images optimized PNG (under 120 KB each)
- HSTS + security headers via vercel.json

### Content

- 9 routes indexed
- ~2,000-3,000 words of unique content per accuracy page
- ~280-400 words on predictor pages (THIN — see ROADMAP P2.3)
- FAQ accordions on every content page
- Real citations to peer-reviewed research (NBME, IAMSE, FSMB, PMC)

## What's NOT in place (gaps to address — see ROADMAP)

### Critical gaps
1. **Named MD reviewer with credentials** — currently generic "Editorial Team"
   attribution. For YMYL medical content, Google's 2026 core update specifically
   scrutinizes named author credentials. Biggest single ranking lever.
2. **Per-form long-tail pages** — `/predictors/nbme-31-step-1`, etc. Each
   captures a specific exact-match query. NBMEScore.com proves this pattern
   ranks; 15+ new pages would 2-3x indexable surface.
3. **Internal linking on non-home routes** — Footer is mounted in `layout.tsx`
   (good), but the existing repo had it only on `page.tsx`. Verify when you
   merge.

### Performance gaps
- INP optimization audit pending (Core Web Vitals — INP < 200ms required since
  March 2024, 43% of sites fail)
- Recharts already lazy — verify with Lighthouse

### Content gaps
- Predictor pages are 280-400 words (too thin per Helpful Content System)
- No fresh blog cadence (~weekly content recommended for YMYL)
- No comparison content (vs AMBOSS, vs NBMEScore — high commercial intent)

### AI Overview gaps
- No "BLUF" (Bottom Line Up Front) block in first 150 words on most pages
- Could add quotable atomic blocks (single-sentence stat-laden statements)
- Comparison tables (3-4 col × 3-5 row) — AI engines extract verbatim

## Why each piece exists (the rationale)

### Why MedicalWebPage schema with lastReviewed
YMYL (Your Money Your Life) medical content under Google's 2026 core update
requires explicit "this content has been medically reviewed" signals. The
`MedicalWebPage` type accepts `lastReviewed` (ISO date) and `reviewedBy`
(Person or Organization). Google AI Overviews specifically check this when
selecting medical sources.

### Why ScholarlyArticle for accuracy pages
Accuracy/methodology pages aren't a "service" — they're closer to a research
report. `ScholarlyArticle` schema with cited research (citation field) signals
that the content has academic rigor.

**Note:** Google's Eric Kuan confirmed ScholarlyArticle gets NO special
treatment in regular Google Search. Use it anyway for AI engines (Perplexity,
ChatGPT) that DO parse it as a citation-quality signal.

### Why BreadcrumbList everywhere
Helps Google understand site hierarchy. BreadcrumbList is the #1 schema for
AI citation per AirOps research (46.2% citation rate). Even after Google
stopped showing breadcrumb rich results in the SERP, AI engines still parse
them for navigation context.

### Why per-page OG images
Social/AI sharing is increasingly important. When a Reddit user shares the
NBME predictor URL, it should show "NBME Converter — Convert NBME to Step 2 CK"
with a custom image, not the generic site logo.

Bonus: Twitter card metadata mirrors OG, so links shared on Twitter/X also
look professional.

### Why llms.txt
Emerging standard (similar to robots.txt) for AI crawlers. ChatGPT Search,
Claude with web tools, Perplexity all read this file. Sites without it lose
citation eligibility in AI answers.

The format is plain markdown with explicit section headers — AI engines parse
this as structured content. We list every route with a summary, link to cited
research, and state an explicit citation policy.

### Why explicit AI crawler allow in robots.txt
Default `User-agent: *` would cover it, but explicit allow signals INTENT to
be indexed by AI crawlers. Several sources confirm AI engines specifically
look for `GPTBot`, `ClaudeBot`, `PerplexityBot` directives.

**Note:** Blocking these (a common knee-jerk reaction to "AI training") removes
your site from AI citation eligibility — a much bigger loss than the training-
data concern.

### Why Tackett 2021 days-decay formula
Cited in BOTH the NBME converter logic AND visibly in the result panel
("Days-to-exam decay via Tackett 2021 (PMC8368818)"). This serves two purposes:
1. **Methodological transparency** — users can read the cited paper
2. **AI citation surface** — when ChatGPT/Perplexity is asked "how to convert
   NBME to step 2", our visible citation of a specific peer-reviewed paper
   is more compelling than competitors' vague "based on student data" claims

### Why the H1 strategy (`<span class="highlight">USMLE Step X</span>`)
The visual hero text is "Predict Your USMLE Step X Score" — same on every
predictor route, EXCEPT the highlighted step keyword changes per route.

This is the best balance of:
- **Visual continuity** — clicking the switcher doesn't visibly change the H1
  structure
- **Per-route SEO** — each route has a unique H1 keyword (Step 1, Step 2 CK,
  Step 3) that signals to Google what this specific URL is about

### Why we kept FAQPage schema despite May 2026 SERP deprecation
Google announced FAQ rich results were retired in May 2026. Schema is still
valid; it just won't show as a rich result in SERPs.

BUT — AirOps research shows FAQ-marked content drives **2.1× citation lift**
on Perplexity / ChatGPT in 90-day measurement. AI engines still parse
FAQPage JSON-LD because the Q&A structure is high signal for AI summarization.

Keep the schema. Don't expect SERP rich results.

### Why per-route priority in sitemap
Default `next-sitemap` gives every URL priority 0.7. We override:
- `/` → 1.0 (homepage gets max)
- Step 1/3 predictors → 0.9 (main tools)
- All accuracy pages → 0.8 (high-value content)
- NBME/UWSA converters → 0.7 (utility tools)
- Blog → 0.6 (less commercial intent)

Search engines use these as a relative-importance hint for crawl prioritization.

## Files responsible for SEO

| File | Role |
|---|---|
| `src/app/layout.tsx` | Sitewide meta + sitewide schemas (Organization, WebSite, EditorialTeam) + GA/Umami scripts |
| `src/app/*/page.tsx` (per page) | Per-page `metadata` export + per-page schema injection |
| `src/lib/schemas.ts` | All 27 schema definitions in one file |
| `src/components/SchemaMarkup.tsx` | Helper that renders schemas as JSON-LD `<script>` tags |
| `src/components/TrustBar.tsx` | Citation pills + methodology link per page |
| `next-sitemap.config.js` | Sitemap.xml + robots.txt generation rules |
| `scripts/generate-og-images.js` | Per-page OG image generation at build time |
| `public/llms.txt` | AI crawler documentation |

## Measurement (where to track)

| Channel | What to monitor |
|---|---|
| Google Search Console | Impressions/clicks/position per route; Coverage report; Structured Data report |
| Bing Webmaster Tools | New 2026 AI Performance Report — tracks Copilot citation counts |
| CrUX dashboard | Core Web Vitals at p75 mobile (target: LCP < 2.5s, INP < 200ms, CLS < 0.1) |
| Microsoft Clarity | Already installed in layout.tsx — heatmaps + session recording |
| Google Analytics | G-SMNQX2K4CW (existing in layout.tsx) |
| Umami | 7fc3b461-93e9-4d96-ab6f-e8ae0a6a9b2d (existing in layout.tsx) |
| Manual AI checks | Monthly: prompt ChatGPT/Claude/Perplexity with target queries; log whether usmlepredictor.com is cited |

## Quick wins (before doing the full ROADMAP)

If you have 1 hour and want immediate ranking improvement:

1. **Bump `lastReviewed` dates** (5 min) — open the `medicalWebPageSchema()`
   calls in each page, update `lastReviewed: '2026-06-06'` to today. Freshness
   signal. Repeat every 2-4 weeks.

2. **Run Lighthouse on each route** (30 min) — note any LCP > 2.5s or INP >
   200ms. Most likely culprit is the recharts chunk if you haven't verified
   lazy-loading is working in production.

3. **Submit sitemap to Google Search Console** (5 min) — `https://usmlepredictor.com/sitemap.xml`.
   Forces re-crawl of the 2 new accuracy pages and re-recognition of the
   converted predictor pages.

4. **Submit to Bing Webmaster Tools** (5 min) — same sitemap. Captures the
   ~5% of search traffic that comes from Bing AND unlocks the new AI
   Performance Report for Copilot citation tracking.

5. **Verify INP** (15 min) — open Chrome DevTools → Performance → Record →
   click "Predict My Score" → look for long tasks. INP < 200ms = passing.

Full plan in [ROADMAP.md](./ROADMAP.md).
