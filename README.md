# USMLEPredictor — USMLE Step 2 CK Score Predictor

> Free, instant, data-driven USMLE Step 2 CK score prediction tool.  
> Trained on **5,039 verified student data points**.  
> Runs **100% client-side** — no backend, no server costs.

🌐 **Live:** [usmlepredictor.com](https://usmlepredictor.com)

---

## Features

| Feature | Details |
|---|---|
| **Prediction Engine** | 3-method ensemble: Weighted Average (35%), KNN (40%), Per-form Regression (25%) |
| **Dataset** | 5,039 verified student score reports (US MD, US DO, IMG) |
| **Inputs Supported** | NBME 9–16, UWSA 1–3, UWorld %, Free 120 % |
| **Output** | Predicted score, confidence interval, percentile, trend analysis, similar students, insights |
| **Privacy** | Zero data leaves the browser — all prediction runs locally in JavaScript |
| **Cost** | $0/month — static site on DigitalOcean App Platform |
| **Analytics** | Google Analytics 4 + local localStorage tracking |
| **Admin** | Hidden dashboard at `#admin` with password protection |
| **Security** | CSP, anti-debugging, source map disabled, integrity checks, HSTS |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
│                                              │
│  React App (CRA)                             │
│    ├── ScorePredictor.js  ← Main UI         │
│    ├── ScoreResults.js    ← Results display  │
│    ├── AdminDashboard.js  ← Admin panel      │
│    │                                         │
│    ├── services/                             │
│    │   ├── api.js           ← API layer      │
│    │   ├── scorePredictor.js ← Engine        │
│    │   └── security.js      ← Hardening     │
│    │                                         │
│    └── data/                                 │
│        └── scoreDataset.json ← 5,039 records │
│                                              │
│  GA4 gtag → Google Analytics                 │
│  localStorage → Local analytics buffer       │
└─────────────────────────────────────────────┘
         │
         ▼ (static files only)
  DigitalOcean App Platform
  (Static Site — $0/month)
```

Everything runs in the user's browser. The prediction engine, dataset, and all logic are bundled into the JS build. No API calls are made for predictions.

---

## Prediction Algorithm

### Method 1: Bias-Corrected Weighted Average (35%)
- Weights each input score by its correlation with actual Step 2 CK scores
- Applies dataset-derived bias corrections (most NBMEs underpredict)

### Method 2: K-Nearest Neighbors (40%)
- Finds the 50 most similar students from the dataset
- Uses inverse-distance weighting for prediction
- Accounts for shared score fields between input and dataset entries

### Method 3: Per-Form Regression (25%)
- Uses form-specific bias data (e.g., NBME 16 averages +3 vs actual, UWSA 1 averages -8)
- Converts Free 120% and UWorld% to score-scale

### Ensemble
All three methods are combined with the above weights. If KNN or per-form data is unavailable, weights are redistributed dynamically.

**Confidence Interval:** Computed from KNN standard deviation and input count.  
**Percentile:** Derived from the full dataset distribution.

---

## Score Input Weights (Correlation-Derived)

| Input | Weight | Notes |
|---|---|---|
| NBME 16 | 0.20 | Most predictive NBME form |
| NBME 15 | 0.16 | Second most predictive |
| UWSA 2 | 0.16 | Best UWSA predictor |
| Free 120 | 0.14 | Strong correlation |
| NBME 14 | 0.13 | |
| NBME 13 | 0.11 | |
| UWorld % | 0.08 | Moderate correlation |
| NBME 11 | 0.08 | |
| NBME 12 | 0.07 | |
| UWSA 3 | 0.07 | |
| NBME 10 | 0.06 | |
| UWSA 1 | 0.05 | Tends to overpredict |
| NBME 9 | 0.04 | Least predictive |

---

## Security

This app implements multiple layers of client-side protection:

- **Content Security Policy (CSP)** — restricts script sources, blocks iframes, prevents XSS
- **No Source Maps** — production build strips all `.map` files
- **Anti-DevTools** — blocks F12, Ctrl+Shift+I, Ctrl+U keyboard shortcuts
- **Context Menu Disabled** — right-click blocked on non-input elements
- **Console Warning** — displays security warning in browser console
- **Text Selection Disabled** — results and footer text not selectable
- **Drag Prevention** — prevents content dragging
- **Network Protection** — monitors and blocks unauthorized fetch/XHR requests
- **Integrity Checks** — periodic runtime verification of prediction module
- **HTTP Security Headers** — HSTS, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Immutable Static Assets** — 1-year cache with content-hash filenames

---

## Admin Dashboard

Access: Navigate to `https://usmlepredictor.com/#admin`

The admin dashboard shows:
- Local analytics (events, predictions, submissions from current browser)
- Dataset statistics  
- Quick link to Google Analytics (GA4 property: `G-SMNQX2K4CW`)
- Data export (JSON)

Default password: `password` (change the `ADMIN_HASH` in `AdminDashboard.js`)

To generate a new password hash:
```bash
echo -n "yournewpassword" | shasum -a 256
```
Replace the `ADMIN_HASH` constant in `src/components/AdminDashboard.js`.

---

## Analytics & Tracking

All tracking flows through two channels:

1. **Google Analytics 4** — Events pushed via `gtag()`:
   - `page_view`, `prediction_started`, `prediction_made`, `prediction_complete`
   - `score_submitted`, `share_clicked`, `submit_score_cta_click`, `new_prediction`
   - Custom parameters: `predicted_score`, `confidence`, `input_count`, `duration_ms`

2. **Local Storage** — Buffered in `localStorage` for admin dashboard:
   - `_up_analytics` — event log (last 500)
   - `_up_predictions` — prediction log with scores, CI, speed
   - `_up_submissions` — voluntary score submissions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18.3.1 (Create React App) |
| Charts | Recharts 2.12.7 |
| Icons | Lucide React 0.396.0 |
| Analytics | Google Analytics 4 |
| Hosting | DigitalOcean App Platform (Static Site) |
| Build | react-scripts 5.0.1, Webpack |
| Language | JavaScript (ES Modules) |

---

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production (no source maps)
npm run build
```

The production build outputs to `build/` with content-hashed filenames and no source maps.

---

## Deployment (DigitalOcean)

The app deploys automatically on push to `main` via DigitalOcean App Platform:

- **Type:** Static Site ($0/month)
- **Build command:** `npm install && npm run build`
- **Output directory:** `build`
- **Catch-all:** `index.html` (SPA routing)

Configuration in `.do/app.yaml`.

---

## Project Structure

```
├── .do/app.yaml              # DigitalOcean deployment config
├── .gitignore
├── package.json
├── public/
│   ├── _headers              # Security headers for static hosting
│   ├── index.html            # SEO-optimized HTML (500+ lines)
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # Search engine directives
│   ├── sitemap.xml           # XML sitemap
│   ├── favicon.ico           # Favicons
│   ├── og-image.png          # Social sharing image
│   └── ...
├── src/
│   ├── App.js                # Root app with hash routing
│   ├── index.js              # Entry point + security init
│   ├── components/
│   │   ├── ScorePredictor.js # Main predictor UI (413 lines)
│   │   ├── ScoreResults.js   # Results display with charts
│   │   └── AdminDashboard.js # Admin panel (password-protected)
│   ├── services/
│   │   ├── api.js            # API layer (GA4 + localStorage tracking)
│   │   ├── scorePredictor.js # Prediction engine (495 lines)
│   │   └── security.js       # Security hardening module
│   ├── data/
│   │   └── scoreDataset.json # 5,039 verified student records
│   └── styles/
│       └── stepscore.css     # All styles
└── README.md
```

---

## License

Proprietary. All rights reserved.  
Not affiliated with NBME, USMLE, UWorld, or any official organization.

---

*Built with care for medical students everywhere.*
