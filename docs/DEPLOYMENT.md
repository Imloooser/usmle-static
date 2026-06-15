# DEPLOYMENT — how to ship this to production

## TL;DR (safe path)

1. Make a **deploy branch** in the existing `usmle-static` GitHub repo
2. Push the contents of this folder to that branch
3. Vercel auto-builds a **Preview** deploy at a `*.vercel.app` URL
4. Test the Preview thoroughly
5. Merge to `main` only when satisfied

Never push directly to `main` first — the current site earns ~4K monthly visits;
a regression in production is recoverable but expensive.

## Pre-deploy checklist

- [ ] `npm install` succeeds in this folder
- [ ] `npm run dev` starts the dev server on :3000 with no console errors
- [ ] All 9 routes load (200) — see [README.md](./README.md) for route list
- [ ] `npm run build` completes successfully (~7.8 MB output in `out/`)
- [ ] All 8 OG images regenerated in `public/og-*.png`
- [ ] Sitemap regenerated in `out/sitemap.xml` (9 URLs)
- [ ] `out/robots.txt` includes GPTBot, ClaudeBot, PerplexityBot allow rules
- [ ] Browser-tested on mobile viewport (iPhone-size) — no horizontal scroll

## Existing setup (already in place)

| Component | Status |
|---|---|
| GitHub repo | `github.com/Imloooser/usmle-static` (exists) |
| Vercel project | Connected to that repo, auto-deploys on push |
| Domain | `usmlepredictor.com` → Vercel |
| SSL | Vercel-managed (LetsEncrypt) |
| `vercel.json` | Existing config with HSTS + security headers — **kept verbatim** |
| Build command | `next build` (in `vercel.json: buildCommand`) |
| Output directory | `out` (in `vercel.json: outputDirectory`) |
| Framework preset | `null` (we use static export, not Next.js Vercel runtime) |

## Recommended deploy strategy (3 options)

### Option A — Branch preview, then merge (safest, recommended)

```bash
# 1. Clone your existing repo if you haven't
git clone https://github.com/Imloooser/usmle-static.git
cd usmle-static

# 2. Create a deploy branch
git checkout -b feat/step-1-3-nbme-uwsa-tools-2026

# 3. Copy the contents of this unzipped folder INTO the repo
#    (overwriting existing files where needed — see CHANGES.md)
rsync -av --exclude='node_modules' --exclude='.next' --exclude='out' --exclude='build' \
  /path/to/usmle-final/ \
  ./

# 4. Install + verify locally
npm install
npm run dev   # → http://localhost:3000 — verify all routes
# Ctrl+C when done
npm run build # → must complete successfully

# 5. Stage + commit
git add -A
git commit -m "feat: ship Step 1/3 predictors + NBME/UWSA converters + SEO polish

- Step 1: NBME-anchored pass-probability predictor (replaces Coming Soon)
- Step 3: PMC8368809-anchored score predictor (replaces Coming Soon)
- NBME converter: per-form % → Step 2 CK with bias correction
- UWSA converter: UWSA → Step 2 CK with overprediction correction
- New /step-1-accuracy-insights and /step-3-accuracy-insights pages
- 9 new schemas (Dataset, MedicalWebPage, ScholarlyArticle, etc.)
- 8 per-page OG images auto-generated at build
- AI crawler support (llms.txt + robots.txt policies)
- Mobile-friendly polish (sticky predict button, tighter spacing)
- Step 2 CK passing standard updated 214 → 218 (per July 2025 USMLE change)"

# 6. Push the branch
git push -u origin feat/step-1-3-nbme-uwsa-tools-2026

# 7. Vercel auto-builds a Preview deploy at:
#    https://usmle-static-git-feat-step-1-3-nbme-uwsa-tools-2026-<your-team>.vercel.app
#    Visit that URL, test every route, mobile + desktop.

# 8. Open a Pull Request from the branch → main
#    Review the diff one more time (CHANGES.md is your code-review checklist)

# 9. Merge when satisfied
#    Vercel auto-deploys main to production within ~2 minutes
```

### Option B — Direct push to main (riskier, faster)

Only do this if you've already tested the build thoroughly locally + the Preview
shows no regressions.

```bash
git clone https://github.com/Imloooser/usmle-static.git
cd usmle-static
# Replace files (same rsync as Option A step 3)
git add -A
git commit -m "feat: ..."
git push origin main
# Vercel auto-deploys to production immediately
```

**Rollback:** `git revert HEAD` + `git push` reverts the production deploy in
~2 minutes. Vercel keeps a deploy history; you can also one-click promote a
prior deploy.

### Option C — Force push (DESTRUCTIVE — do not use unless intentional)

```bash
# DANGER: this wipes the existing repo history
git init  # in the unzipped folder
git remote add origin https://github.com/Imloooser/usmle-static.git
git add -A
git commit -m "Replace all"
git push --force origin main
```

This is what Option A's `git push` ultimately becomes if you merge. But by
going through the branch + PR flow, you have a moment to abort.

## What deploys vs what doesn't

### Deploys
- `src/` directory (all TypeScript/TSX)
- `public/` directory (OG images, llms.txt, robots.txt, favicons)
- `next.config.ts` (output: 'export')
- `next-sitemap.config.js`
- `package.json` (build dependencies)
- `vercel.json` (Vercel-specific config)
- `tsconfig.json`
- `postcss.config.mjs`

### Doesn't deploy (gitignored / excluded from zip)
- `node_modules/` (regenerated by `npm install`)
- `.next/` (dev cache)
- `out/` (build output — regenerated at deploy time on Vercel)
- `build/` (legacy artifact — can delete)

### Should be excluded but might be present
- `docs/` — this folder. **Decide whether to commit it or not:**
  - **Pro:** documents the work for future you
  - **Con:** docs are public when committed
  - Recommendation: keep but add to `.gitignore` if you'd rather not publish
- `chat.json` (if present) — old session log; should be in `.gitignore`

## Verify production after deploy

```bash
# Fetch sitemap
curl -sL https://usmlepredictor.com/sitemap.xml | head -30

# Verify a key route
curl -sL https://usmlepredictor.com/usmle-step-1-score-predictor/ | grep -c "Coming Soon"

# Verify llms.txt
curl -sL https://usmlepredictor.com/llms.txt | head -10

# Verify robots.txt
curl -sL https://usmlepredictor.com/robots.txt
# Should include GPTBot, ClaudeBot, PerplexityBot allow rules
```

## Submit to search consoles

After deploy:

1. **Google Search Console** — `https://search.google.com/search-console`
   - Resubmit `sitemap.xml` (forces re-crawl of the 2 new accuracy pages)
   - Inspect each of the 5 NEW/CHANGED routes via URL Inspection tool
   - Check Coverage report for any "Discovered — currently not indexed" pages

2. **Bing Webmaster Tools** — `https://www.bing.com/webmasters`
   - Submit `sitemap.xml`
   - Check the new 2026 **AI Performance Report** for Copilot citation counts

3. **Google Dataset Search** (optional) — eligible since we have Dataset schema
   on the homepage. Dataset Search crawls automatically once the page is in
   the main Google index.

## Rollback procedure

If something breaks in production:

```bash
# Option 1: revert the last commit
git revert HEAD
git push origin main
# Vercel rebuilds + redeploys in ~2 minutes

# Option 2: promote a prior deploy in Vercel dashboard
# https://vercel.com/<team>/usmle-static/deployments
# Find the last known-good deploy → ⋯ menu → "Promote to Production"
# This is instant — no rebuild needed
```

## Environment variables

**None needed.** The site is fully static. Analytics scripts (GA, Umami,
Clarity) have their tracking IDs hardcoded in `src/app/layout.tsx`. If you
want to change those, edit the file directly.

## Caveats

1. **Mobile parity** — Google has been mobile-first since 2024. Verify on
   mobile DevTools emulation (or a real phone) before merging.

2. **Vercel build time** — first build takes ~60-90 seconds because it runs:
   1. `npm install` (~30s)
   2. `prebuild: node scripts/generate-og-images.js` (Sharp generates 8 PNGs, ~5s)
   3. `next build` (~30s for static export)
   4. `postbuild: next-sitemap` (~5s)
   Subsequent builds are ~30-45s (npm install is cached).

3. **OG images** — auto-regenerated every build. If you manually edit an OG
   image in `public/`, the next build will overwrite it. To customize, edit
   `scripts/generate-og-images.js` and the `PAGES` array.

4. **`vercel.json` framework** — set to `null` (not "nextjs"). This is
   correct for static export. Vercel serves files from `out/` directly,
   bypassing the Next.js Vercel runtime.

5. **`output: 'export'` constraint** — no API routes, no `getServerSideProps`,
   no middleware. If you need any of those, you'd have to remove static export
   first (and switch to Vercel's Next.js runtime — more expensive).
