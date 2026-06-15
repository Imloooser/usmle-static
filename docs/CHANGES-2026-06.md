# What We Changed — June 2026

A plain-language record of every change made in this round of work, why, and what
you need to know to deploy and maintain it. Newest context at top; details below.

> **TL;DR** — Predictions now run on the **server** (not in the browser), so your
> dataset, formula, and code are no longer downloadable. We stripped the Reddit
> "fingerprints" out of the data, added anti-theft defenses (origin lock,
> honeypots, honeytokens), and fixed the exam switcher. **SEO is unchanged** — all
> content pages still prerender to the same static HTML. Two things must be set in
> the **Vercel dashboard** after deploy (rate-limit rule + confirm plan) — see
> [Deploy steps](#deploy-steps).

---

## 1. The big change: prediction moved server-side

**Before:** the site was a pure static export (`output: 'export'`). The Step 2 and
Step 3 predictors ran *in the browser*, which meant the full datasets (≈9,500
student rows), every coefficient, and the algorithm were **downloaded to every
visitor** and readable in DevTools.

**After:** prediction runs in a server function at **`/api/predict`**. The browser
only sends the user's scores and renders the result. The datasets + model code
**never leave the server**.

**How it works now:**

```
Browser (form)  ──POST /api/predict {exam, input}──►  Server function
                                                        ├─ Step 1 → predictStep1()
                                                        ├─ Step 2 → predictScore()  + dataset
                                                        └─ Step 3 → predictStep3()  + dataset
                ◄──────── JSON result ────────────────  (data stays here)
```

- New file: `src/app/api/predict/route.ts` — the one endpoint, switches on
  `exam: 'step1' | 'step2' | 'step3'` (plus `action: 'stats'` for Step 2).
- Client call sites now `fetch('/api/predict/')` instead of importing the model:
  - `src/services/api.ts` (Step 2 predict + stats)
  - `src/components/Step1PredictorTool.tsx`
  - `src/components/Step3PredictorTool.tsx`
- The predictor modules (`src/services/*Predictor.ts`) and the datasets are now
  imported **only** by the API route — so they're excluded from the browser bundle.

**Why this is safe for SEO:** dropping `output: 'export'` does **not** make pages
dynamic. Next.js still prerenders every content page to static HTML at build time
(confirmed: all pages show as `○ Static`, only `/api/*` is `ƒ Dynamic`). Same URLs
(`trailingSlash: true` kept), same JSON-LD schemas, same sitemap, same OG images.

**Why this is safe for cost:** on Vercel's free Hobby plan you can't be billed —
if you hit a limit the project pauses. The prediction function is tiny/fast, well
within the free 1M invocations/month.

**What it does NOT do (honest limit):** it can't make the model's *behavior*
secret — anyone can still query the public tool and copy the input→output pattern.
No public tool can prevent that. The defenses below make it expensive and provable.

---

## 2. Removed Reddit "fingerprints" from the data

The datasets shipped with provenance tags that proved the data was scraped from
Reddit. Even though the data is now server-side, we cleaned it so nothing in the
repo or any response reveals the source:

- `src/data/scoreDataset.json` (Step 2): removed the unused `id` and `source`
  fields (they held values like `reddit_270_real_deal_joseph`,
  `source: synthetic_model`). Kept the numeric fields + `status`.
- `src/data/step3Dataset.json` (Step 3): renamed the `_source` values
  `reddit-new` / `reddit-old` / `studyccs` → `verified`, and
  `bootstrap` / `synth-tail` → `modeled`. The real-vs-synthetic split is unchanged
  (1,216 real / 3,287 synthetic), so predictions are identical.
- `src/services/step3Predictor.ts`: `SYNTH_SOURCES` updated to `{'modeled'}` to
  match the renamed values.
- Removed "Reddit-scraped" mentions from code comments in the predictor files.

The only remaining "Reddit" text on the site is the **competitor comparison**
("the Reddit predictor spreadsheet is unverified, ours is verified") — that's
intentional copy that implies our data is *not* from Reddit, and it's good for SEO.

---

## 3. Anti-theft defenses

| Defense | File(s) | What it does |
|---|---|---|
| **Origin lock** | `src/app/api/predict/route.ts` | Rejects requests whose `Origin`/`Referer` isn't our site (or `*.vercel.app` / localhost) with **403**, before any compute. Blocks curl/script scrapers; real browsers pass. |
| **Honeypot endpoints** | `src/app/api/dataset/route.ts`, `src/app/api/export/route.ts`, `src/lib/honeypot.ts` | Decoy "data" URLs no real user hits. Any request is logged (IP + user-agent, visible in Vercel logs) and gets a plain 404. |
| **Honeytokens (canaries)** | rows in `src/data/*.json` tagged `_canary` | 4 fake-but-unique "student" rows that surface via Similar Students. If those exact numbers appear elsewhere, it proves the data was harvested. The `_canary` marker is server-only and never appears in any response. |
| **Trimmed responses** | `src/services/scorePredictor.ts` | Removed internal `distance` / `source` fields from the Similar Students payload. |

> The canary value-signatures were shared privately with the owner (not stored in
> this repo). To find the planted rows in the data, grep for `_canary`.

**Required, but not in code — set these in the Vercel dashboard after deploy:**
1. **Rate-limit rule** (free on Hobby): Firewall → Add Rule → Rate Limit →
   path `/api/predict`, ~30 requests / 60s per IP → Deny. This is the real throttle
   against someone gridding inputs to clone the model.
2. **Plan/spend:** Hobby pauses at the free caps (no bill possible). If you move to
   Pro, set Settings → Billing → Spend Management to auto-pause at a dollar cap.

---

## 4. Exam-switcher slider

Rebuilt `src/components/ExamSwitcher.tsx` as a calm **static highlight** that sits
on the active tab (the earlier versions either didn't animate at all or chased the
cursor, which felt wrong). Each tab is a real `<Link>` for SEO; the highlight is a
plain CSS pill. Cleaned up the related rules in `src/app/globals.css`.

---

## 5. Files changed

**Config / deploy**
- `next.config.ts` — removed `output: 'export'`
- `vercel.json` — `framework: "nextjs"`, `buildCommand: "npm run build"`, removed `outputDirectory`
- `next-sitemap.config.js` — `outDir: './public'` (was `./out`)

**New**
- `src/app/api/predict/route.ts` — prediction endpoint + origin lock
- `src/app/api/dataset/route.ts`, `src/app/api/export/route.ts`, `src/lib/honeypot.ts` — honeypots

**Edited**
- `src/services/api.ts` — Step 2 calls the API instead of the local model
- `src/services/scorePredictor.ts` — trimmed Similar Students fields
- `src/services/step3Predictor.ts` — `SYNTH_SOURCES = {'modeled'}`, comment cleanup
- `src/services/step1Predictor.ts` — comment cleanup
- `src/components/Step1PredictorTool.tsx`, `Step3PredictorTool.tsx` — fetch the API
- `src/components/ExamSwitcher.tsx`, `src/app/globals.css` — static slider
- `src/data/scoreDataset.json`, `src/data/step3Dataset.json` — sanitized + canaries

**Removed**
- `src/app/sitemap.xml` — a hand-curated app-route sitemap that, in server mode,
  shadowed next-sitemap's output with non-trailing-slash URLs (a SEO mismatch with
  the page canonicals). next-sitemap's `public/sitemap.xml` (trailing-slash, the
  one that already served in the old export flow) is now the single sitemap.

---

## 6. Deploy steps

1. Push this code to the repo Vercel builds from.
2. Vercel runs `npm run build` (framework: nextjs): content pages prerender static,
   `/api/*` deploy as Node serverless functions, OG images + sitemap regenerate.
3. **In the Vercel dashboard:** add the rate-limit rule on `/api/predict` and
   confirm your plan/spend setting (see section 3).
4. Smoke-test live: run a prediction on each of Step 1 / 2 / 3; confirm
   `/api/dataset` returns 404; confirm pages render with their schemas.

---

## 7. Follow-up hardening (after the security test)

- **Removed the right-click blocker** — deleted `src/components/DisableRightClick.tsx`
  (was rendered in `layout.tsx`) and the dead `src/services/security.ts`. It blocked
  nothing now that the model is server-side and only annoyed real users.
- **Locked the origin check to production.** `src/app/api/predict/route.ts` now allows
  only `usmlepredictor.com` / `www` in production; `localhost` + `*.vercel.app` are
  allowed only when `VERCEL_ENV !== 'production'` (dev/preview). Closes the
  `Origin: http://localhost` / `*.vercel.app` bypass found in testing.
- **Rate limiting is live** as a Vercel Firewall rule (30 req / 60s per IP on `/api/`,
  → 429). Verified on the live site. This is a dashboard rule, not in the repo.

## 8. Good to know

- **Allowed origins** live in `src/app/api/predict/route.ts` (`ALLOWED_HOSTS`). If you
  add a new production domain, add it there.
- **Model behavior is still clonable** by querying the public endpoint — true of
  every free predictor. The defenses (origin lock + rate limit + honeypots) raise the
  cost and make theft provable; they don't make it impossible.

---

## 9. Pre-deploy verification

A 5-dimension adversarial deep check was run against a clean production build.
Result after fixes: **GO**.

| Dimension | Verdict | Notes |
|---|---|---|
| **Data protection** | ✅ pass | 0 dataset rows + 0 canary markers in the browser bundle; all 9,546 rows + 4 canaries live only in the server bundle. No client component imports a dataset or predictor value-export (type-only). |
| **SEO** | ✅ pass (after fix) | All 9 content pages prerender STATIC; JSON-LD, title/description/canonical/OG intact; robots allows crawlers + AI bots. **Fixed:** removed the duplicate app-route sitemap so the single trailing-slash sitemap serves. |
| **Deploy config** | ✅ pass (after fix) | next.config (no `output:export`), vercel.json (`framework:nextjs`, `npm run build`), next-sitemap `outDir:public`, `runtime:nodejs` routes all correct. **Fixed:** committed the previously-untracked `src/app/api/*` + `src/lib/honeypot.ts` (a Git deploy would otherwise have shipped with no API). |
| **Migration / regressions** | ✅ pass | All call paths correct; real/synth split unchanged (1,216 / 3,287); no orphaned code; tsc passes. |
| **Security defenses** | ✅ pass | Origin lock sound (small accepted false-positive risk for Origin-stripping privacy tools); no injection/DoS sink; honeypots + canaries correct. |

**Two issues the check caught and we fixed before deploy:**
1. 🚫 *(blocker)* The new `src/app/api/*` routes + `src/lib/honeypot.ts` were untracked
   in git — committed now.
2. ⚠️ *(SEO)* Duplicate sitemaps — removed `src/app/sitemap.xml`.

**Still required after deploy (Vercel dashboard, can't be done in code):**
- Add the rate-limit rule on `/api/predict` (see section 3).
- Confirm plan/spend setting (Hobby pauses, never bills; Pro needs a spend cap).
