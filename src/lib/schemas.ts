/**
 * Central structured-data (JSON-LD) constants.
 * Import the relevant schema(s) into each page and pass to <SchemaMarkup>.
 *
 * Sitewide  → organizationSchema, websiteSchema   (layout.tsx)
 * Homepage  → webApplicationSchema, faqSchema     (app/page.tsx)
 * /accuracyinsights → scholarlyArticleSchema, accuracyBreadcrumbSchema
 */

// ─── Sitewide ────────────────────────────────────────────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://usmlepredictor.com/#organization',
  name: 'USMLE Predictor',
  url: 'https://usmlepredictor.com/',
  logo: 'https://usmlepredictor.com/icon-512.png',
  description:
    'Free USMLE score predictor tools built on 5,039 verified student score reports.',
  sameAs: [
    'https://x.com/usmlepredictor',
    'https://twitter.com/usmlepredictor',
  ] as string[],
} as const

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'USMLE Predictor',
  url: 'https://usmlepredictor.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://usmlepredictor.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
} as const

// ─── Homepage ─────────────────────────────────────────────────────────────────

export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'USMLE Step 2 CK Score Predictor',
  url: 'https://usmlepredictor.com/',
  description:
    'Free USMLE Step 2 CK score predictor built on 5,039 verified student outcomes. Enter your NBME, UWSA 1, UWSA 2, or Free 120 score to get your predicted Step 2 CK result instantly.',
  applicationCategory: 'EducationApplication',
  applicationSubCategory: 'Medical Exam Preparation',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'USMLE Step 2 CK score prediction from NBME scores',
    'UWSA 1 and UWSA 2 score conversion',
    'Free 120 score correlation',
    'Shelf exam-based score estimation',
    '3-method ensemble algorithm (KNN + Weighted Average + Per-Form Regression)',
    'Instant results — no account required',
  ],
  screenshot: 'https://usmlepredictor.com/og-image.png',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'Medical Student',
  },
  provider: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
  },
  datePublished: '2022-01-01',
  dateModified: '2026-06-16',
} as const

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is the USMLE Step 2 CK score predictor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'USMLEPredictor.com achieves a Pearson correlation of r = 0.92 with NBME Form 14 inputs, with 80% of predictions within ±5–7 points of the actual USMLE Step 2 CK score. This is based on 5,039 verified student score reports collected from 2022 to 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which practice exams can I use to predict my Step 2 CK score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can enter scores from NBME practice forms (Forms 9–32), UWSA 1, UWSA 2, and Free 120. Using multiple scores together increases prediction accuracy. NBME Form 14 and UWSA 2 are the strongest individual predictors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is USMLE Predictor free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. USMLEPredictor.com is completely free. No account, login, or subscription is required. Enter your practice exam scores and receive your predicted Step 2 CK score instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is USMLEPredictor different from the Reddit score predictor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'USMLEPredictor.com is built on 5,039 verified, document-confirmed score reports and uses a 3-method ensemble algorithm (K-Nearest Neighbors, Weighted Averages, and Per-Form Regression). The Reddit predictor relies on self-reported, unverified data and has not been updated since 2022.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is USMLEPredictor affiliated with NBME or the official USMLE program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. USMLEPredictor.com is an independent tool built by medical educators and data scientists. It is not affiliated with, endorsed by, or officially connected to NBME or the USMLE program.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I predict Step 1 or Step 3 scores too?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Both the Step 1 (Pass/Fail) predictor and the Step 3 score predictor are available now on USMLEPredictor.com.',
      },
    },
  ],
} as const

// ─── /accuracyinsights ────────────────────────────────────────────────────────

export const scholarlyArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline:
    'USMLE Step 2 CK Score Prediction: Accuracy, Methodology & Correlation Data',
  description:
    'Statistical accuracy analysis of USMLE Step 2 CK score predictors based on 5,039 verified student score reports. Includes Pearson correlation coefficients, precision ranges, and ensemble algorithm methodology.',
  url: 'https://usmlepredictor.com/accuracyinsights/',
  datePublished: '2022-01-01',
  dateModified: '2026-06-16',
  author: {
    '@type': 'Person',
    '@id': 'https://usmlepredictor.com/#author-tao-leo',
    name: 'Tao Leo',
  },
  publisher: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://usmlepredictor.com/icon-512.png',
    },
  },
  about: {
    '@type': 'Thing',
    name: 'USMLE Step 2 CK Score Prediction Accuracy',
  },
} as const

export const accuracyBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USMLE Predictor',
      item: 'https://usmlepredictor.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Accuracy Insights',
      item: 'https://usmlepredictor.com/accuracyinsights',
    },
  ],
} as const

// ─── /usmle-step-1-score-predictor ──────────────────────────────────────────

export const step1ScorePredictorSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'USMLE Step 1 Score Predictor',
  url: 'https://usmlepredictor.com/usmle-step-1-score-predictor',
  description:
    'Free USMLE Step 1 pass/fail predictor built on verified student NBME and Free 120 performance data.',
  applicationCategory: 'EducationApplication',
  operatingSystem: 'All',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
  },
} as const

export const step1FaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is USMLE Step 1 still scored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Since January 2022, USMLE Step 1 is reported as Pass/Fail only. Our predictor focuses on providing your probability of passing based on NBME self-assessment scores.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which NBME forms are best for Step 1 prediction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NBME Forms 25–31 are the most current and representative forms for the current Step 1 exam pool.',
      },
    },
  ],
} as const

export const step1BreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USMLE Predictor',
      item: 'https://usmlepredictor.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Step 1 Predictor',
      item: 'https://usmlepredictor.com/usmle-step-1-score-predictor',
    },
  ],
} as const

// ─── /usmle-step-3-score-predictor ──────────────────────────────────────────

export const step3ScorePredictorSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'USMLE Step 3 Score Predictor',
  url: 'https://usmlepredictor.com/usmle-step-3-score-predictor',
  description:
    'Step 3 score predictor based on thousands of verified data points from residents and medical students.',
  applicationCategory: 'EducationApplication',
  operatingSystem: 'All',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
  },
} as const

export const step3FaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does CCS performance affect Step 3 prediction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Computer-based Case Simulations (CCS) account for approximately 25-30% of your Step 3 score. Our predictor uses simulated performance metrics to adjust your 3-digit score estimate.',
      },
    },
  ],
} as const

export const step3BreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USMLE Predictor',
      item: 'https://usmlepredictor.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Step 3 Predictor',
      item: 'https://usmlepredictor.com/usmle-step-3-score-predictor',
    },
  ],
} as const

// ─── /nbme-score-predictor ──────────────────────────────────────────────────

export const nbmePredictorSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'NBME Score Predictor & Form Converter',
  url: 'https://usmlepredictor.com/nbme-score-predictor',
  description:
    'Convert raw NBME percentage scores from Forms 9-32 into predicted USMLE 3-digit scores.',
  applicationCategory: 'EducationApplication',
  operatingSystem: 'All',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
} as const

export const nbmeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which NBME form is the most accurate for Step 2 CK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Statistical analysis of 5,039 reports shows NBME Form 14 is the most predictive, with a Pearson correlation of r=0.92.',
      },
    },
  ],
} as const

export const nbmeBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USMLE Predictor',
      item: 'https://usmlepredictor.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'NBME Predictor',
      item: 'https://usmlepredictor.com/nbme-score-predictor',
    },
  ],
} as const

// ─── /uwsa-score-predictor ─────────────────────────────────────────────────

export const uwsaConverterSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UWSA Score Converter',
  url: 'https://usmlepredictor.com/uwsa-score-predictor',
  description:
    'Convert UWSA 1, 2, and 3 scores with precision. Includes automatic offset correction for known overprediction bias.',
  applicationCategory: 'EducationApplication',
  operatingSystem: 'All',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
} as const

export const uwsaFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does UWSA 2 overpredict Step 2 CK scores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our data shows UWSA 2 overpredicts by an average of 3.2 points. Our converter applies a validated correction factor to your score.',
      },
    },
  ],
} as const

export const uwsaBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USMLE Predictor',
      item: 'https://usmlepredictor.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'UWSA Converter',
      item: 'https://usmlepredictor.com/uwsa-score-predictor',
    },
  ],
} as const



// ─── Step 1 + Step 3 Accuracy Pages (added) ──────────────────────────────

export const step1AccuracyScholarlyArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline:
    'USMLE Step 1 Pass/Fail Prediction: Accuracy, Methodology & NBME-Anchored Validation',
  description:
    'Statistical accuracy and validation methodology for USMLE Step 1 pass/fail prediction. Built around NBME\'s officially published CBSSA pass-probability table, cross-referenced with peer-reviewed research (IAMSE 2024) and FSMB cohort data.',
  url: 'https://usmlepredictor.com/step-1-accuracy-insights/',
  datePublished: '2026-06-06',
  dateModified: '2026-06-06',
  author: {
    '@type': 'Person',
    '@id': 'https://usmlepredictor.com/#author-tao-leo',
    name: 'Tao Leo',
  },
  publisher: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://usmlepredictor.com/icon-512.png',
    },
  },
  about: {
    '@type': 'Thing',
    name: 'USMLE Step 1 Pass/Fail Probability Prediction',
  },
  citation: [
    {
      '@type': 'CreativeWork',
      name: 'NBME CBSSA & CBSE Score Interpretation Guidance (July 2024)',
      url: 'https://www.nbme.org/sites/default/files/2024-10/CBSSA_CBSE_Guidance.pdf',
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'IAMSE 2024: Predictive Value of NBME CBSE for Step 1 Pass/Fail',
      url: 'https://julnet.swoogo.com/iamse2024/session/2192422/',
    },
    {
      '@type': 'CreativeWork',
      name: 'FSMB 2024 USMLE Performance Data',
      url: 'https://www.fsmb.org/usmle/',
    },
  ],
} as const

export const step1AccuracyBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USMLE Predictor',
      item: 'https://usmlepredictor.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Step 1 Predictor',
      item: 'https://usmlepredictor.com/usmle-step-1-score-predictor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Accuracy Insights',
      item: 'https://usmlepredictor.com/step-1-accuracy-insights',
    },
  ],
} as const

export const step1AccuracyFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  // Q&As kept byte-identical to the visible FAQ on the page (Google FAQ-policy compliance + AI citation).
  mainEntity: [
    {
      '@type': 'Question',
      name: "How accurate is the Step 1 pass-probability predictor?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The predictor is anchored on NBME's officially published CBSSA pass-probability table (July 2024 update), calibrated on the full Step 1 examinee population (over 100,000 examinees per year). This is the most reliable calibration available outside the NBME itself. Individual probabilities for examinees with recent NBME scores closely match NBME's published values.",
      },
    },
    {
      '@type': 'Question',
      name: "Why does the predictor only accept NBME forms 29–33?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "NBME forms 25–28 were calibrated before the January 2022 Pass/Fail transition and reflect pre-2022 exam difficulty. They systematically overpredict pass probability by 2–4 EPC points relative to the current operational Step 1 exam. Forms 29–33 are calibrated to the current item bank and provide reliable estimates. We exclude older forms to avoid misleading borderline examinees.",
      },
    },
    {
      '@type': 'Question',
      name: "Will you provide a 3-digit score for Step 1?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. Step 1 has been Pass/Fail since January 26, 2022 (per USMLE official policy). The NBME no longer produces a 3-digit numeric score for Step 1, and any third-party tool claiming to predict one is using outdated pre-2022 calibration. Our predictor reports pass probability, which is the only outcome NBME currently calibrates and publishes.",
      },
    },
    {
      '@type': 'Question',
      name: "What is considered a \"safe\" NBME score for Step 1?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "NBME's July 2024 published data indicates an Equated Percent Correct (EPC) of 68 or higher corresponds to approximately 97% pass probability. EPC 64–67 falls in the \"likely pass\" range (92–96%). Below EPC 56 the data suggests substantial fail risk and we recommend additional preparation before testing. These thresholds are calibrated to NBME forms 29–33; older forms run 2–4 points higher than equivalent EPC on current forms.",
      },
    },
    {
      '@type': 'Question',
      name: "How are IMG candidates handled?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Individual pass probability at a given NBME score is similar across cohorts — if an IMG examinee scores EPC 70, NBME's table indicates ~98% pass probability for that individual. However, FSMB 2024 data shows the IMG first-attempt pass rate (~74%) is materially lower than US-MD (~96%), driven by cohort-level factors. When IMG status is selected, advice text reflects the cohort base rate without changing the individual NBME-anchored probability.",
      },
    },
    {
      '@type': 'Question',
      name: "Does UWorld first-pass percentage matter?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "UWorld percent correct is a useful corroborator but tends to overpredict pass probability by 3–8 points compared to NBME-anchored estimates, primarily because of repeated exposure and untimed conditions. Our predictor treats UWorld as a secondary signal that can lower a tier when it sharply diverges from your NBME (suggesting a knowledge gap), but cannot raise the tier above what NBME indicates.",
      },
    },
    {
      '@type': 'Question',
      name: "How does the predictor handle multiple NBME scores?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "When two or more NBME forms are entered, we use the most recent form (highest form number) as the primary anchor and compute a trend across the others. An improving trend (≥2 EPC points per cycle) is treated as a positive indicator; a declining trend triggers a recommendation to investigate what changed before test day.",
      },
    },
    {
      '@type': 'Question',
      name: "What if my real Step 1 outcome differed from the prediction?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pass-probability is exactly that — a probability, not a guarantee. At NBME EPC 72 the data shows ~98% pass, meaning roughly 2 in 100 examinees at that level still fail (often due to test-day variance, illness, or anxiety rather than content knowledge). If your outcome differed, your experience is still valuable — please consider submitting your real result through our contribution form to help refine future advice text.",
      },
    },
  ],
} as const

export const step3AccuracyScholarlyArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline:
    'USMLE Step 3 Score Prediction: Accuracy, Methodology & Research-Anchored Validation',
  description:
    'Statistical accuracy and validation methodology for USMLE Step 3 score prediction. Calibrated against peer-reviewed Step 2 CK → Step 3 correlation research (PMC8368809, n=27,118) and validated against published NBME 6/7 self-assessment data.',
  url: 'https://usmlepredictor.com/step-3-accuracy-insights/',
  datePublished: '2026-06-06',
  dateModified: '2026-06-06',
  author: {
    '@type': 'Person',
    '@id': 'https://usmlepredictor.com/#author-tao-leo',
    name: 'Tao Leo',
  },
  publisher: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://usmlepredictor.com/icon-512.png',
    },
  },
  about: {
    '@type': 'Thing',
    name: 'USMLE Step 3 Score Prediction Accuracy',
  },
  citation: [
    {
      '@type': 'ScholarlyArticle',
      name: 'Clinical Science Composite vs Step 2 CK/Step 3 Performance (PMC8368809, n=27,118)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8368809/',
    },
    {
      '@type': 'CreativeWork',
      name: 'USMLE Step 3 Examination Content Description',
      url: 'https://www.usmle.org/step-exams/step-3',
    },
    {
      '@type': 'CreativeWork',
      name: 'FSMB 2024 USMLE Performance Data',
      url: 'https://www.fsmb.org/usmle/',
    },
  ],
} as const

export const step3AccuracyBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'USMLE Predictor',
      item: 'https://usmlepredictor.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Step 3 Predictor',
      item: 'https://usmlepredictor.com/usmle-step-3-score-predictor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Accuracy Insights',
      item: 'https://usmlepredictor.com/step-3-accuracy-insights',
    },
  ],
} as const

export const step3AccuracyFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  // Q&As kept byte-identical to the visible FAQ on the page (Google FAQ-policy compliance + AI citation).
  mainEntity: [
    {
      '@type': 'Question',
      name: "How accurate is the Step 3 score predictor?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mean absolute error (MAE) of approximately 7.9 points, with 74% of predictions within ±10 points and 89% within ±15 points of actual scores. This sits at the published variance ceiling established by PMC8368809 (n=27,118), which reported r ≈ 0.68 correlation between practice scores and Step 3 outcome. Accuracy improves to within ±7 points when three or more inputs are provided.",
      },
    },
    {
      '@type': 'Question',
      name: "Why is Step 2 CK the strongest Step 3 predictor?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "PMC8368809 demonstrated r ≈ 0.70 correlation between Step 2 CK and Step 3 across 27,118 examinees — the strongest single-source predictor. Both exams test clinical knowledge in similar format. Most residents score within ±5 points of their Step 2 CK on Step 3, with a small positive offset reflecting accumulated clinical experience.",
      },
    },
    {
      '@type': 'Question',
      name: "Does UWSA underpredict Step 3?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, by approximately 15–20 points. UWSA does not include Computer-based Case Simulations (CCS), which contribute ~25–30% of the actual Step 3 score. Our predictor applies a +14-point corrective offset to UWSA inputs to account for this systematic underprediction.",
      },
    },
    {
      '@type': 'Question',
      name: "What changed with the March 2026 Step 3 format update?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "On March 10, 2026, the USMLE reduced CCS cases from 13 to 9 and increased outpatient content to approximately 35%. Our predictor is calibrated against outcome data spanning both formats. Calibration uncertainty for the new format will tighten as more post-March-2026 outcome data becomes available.",
      },
    },
    {
      '@type': 'Question',
      name: "What is the Step 3 passing score?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Step 3 passing score is <strong>200</strong>, raised from 198 effective January 1, 2024. Our predictor reports pass probability relative to this threshold, with a verdict tier of \"Safe\" for predicted scores ≥220, \"Borderline\" for 200–219, and \"Risky\" for predictions below 200.",
      },
    },
    {
      '@type': 'Question',
      name: "Can I take Step 3 before residency as an IMG?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. ECFMG-certified IMGs may take Step 3 before residency in most US states, and it is increasingly recommended for competitive specialty applicants. The Step 2 CK → Step 3 correlation (r ≈ 0.70) holds for pre-residency examinees; however, without the PGY-1 clinical boost, expected Step 3 score may run 2–5 points below Step 2 CK rather than above.",
      },
    },
    {
      '@type': 'Question',
      name: "How does the predictor handle CCS readiness?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "CCS is treated as a <strong>tier modifier</strong>, not a primary signal. Strong CCS practice does not raise the predicted score above what MCQ-based exams indicate, but weak CCS practice (UWorld CCS < 60%) is flagged as a risk that can move a Borderline prediction toward Risky. This conservative approach avoids overpromising CCS as a score booster.",
      },
    },
    {
      '@type': 'Question',
      name: "Why are confidence intervals wider at score extremes?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Step 3 score distribution clusters tightly around the mean of 227 (SD ~15). Examinees scoring below 200 or above 260 are statistical outliers, and prediction precision for these extreme scores is fundamentally limited by regression to the mean — practice scores cannot fully telegraph extreme test-day outcomes. We surface this uncertainty honestly rather than producing a falsely confident estimate.",
      },
    },
    {
      '@type': 'Question',
      name: "What if my real Step 3 score differed from the prediction?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Approximately 26% of users score outside our ±10 precision range, and ~11% outside ±15. If your result differed significantly, please consider submitting your real score through our contribution form — outlier cases are particularly valuable for refining the model at the score extremes.",
      },
    },
  ],
} as const


// ─── E-E-A-T: Editorial Team author/reviewer signal ─────────────────────────

export const editorialTeamSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://usmlepredictor.com/#editorial-team',
  name: 'USMLEPredictor Editorial Team',
  url: 'https://usmlepredictor.com/',
  description:
    'Independent research and editorial team focused on evidence-based USMLE score prediction accuracy. Quantitative claims are anchored against publicly published sources (NBME, IAMSE, FSMB, PubMed) and validated against verified student outcome data.',
  knowsAbout: [
    'USMLE Step 1 Pass/Fail Prediction',
    'USMLE Step 2 CK Score Prediction',
    'USMLE Step 3 Score Prediction',
    'NBME Comprehensive Basic Science Self-Assessment',
    'Item Response Theory in Standardized Testing',
    'Medical Education Statistical Methodology',
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
  },
  founder: {
    '@type': 'Person',
    '@id': 'https://usmlepredictor.com/#author-tao-leo',
    name: 'Tao Leo',
  },
} as const

// ─── E-E-A-T: Named author (Person) ─────────────────────────────────────────
// Honest authorship signal (Google 2026 "Authors" guidance). No medical
// credentials are claimed; medical accuracy is anchored to the cited published
// sources (NBME, IAMSE, FSMB, PubMed), not to a personal license.
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://usmlepredictor.com/#author-tao-leo',
  name: 'Tao Leo',
  jobTitle: 'Founder & Lead Researcher',
  description:
    'Founder and lead researcher at USMLE Predictor. Builds and validates the score-prediction models against 5,039 verified student outcomes and publicly published sources (NBME, IAMSE, FSMB, PubMed).',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://usmlepredictor.com/#organization',
    name: 'USMLE Predictor',
  },
  knowsAbout: [
    'USMLE Step 1 Pass/Fail Prediction',
    'USMLE Step 2 CK Score Prediction',
    'USMLE Step 3 Score Prediction',
    'Medical Education Statistical Methodology',
    'Item Response Theory in Standardized Testing',
  ],
  url: 'https://usmlepredictor.com/accuracyinsights/',
} as const

// ─── Dataset schema for Google Dataset Search ───────────────────────────────

export const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': 'https://usmlepredictor.com/#step2-dataset',
  name: 'USMLE Step 2 CK Practice-to-Actual Score Dataset',
  description:
    'Verified dataset of 5,039 USMLE Step 2 CK practice exam scores (NBME forms 9-16, UWSA 1-3, Free 120, UWorld percent) paired with actual Step 2 CK outcomes (3-digit scores). Collected between January 2022 and March 2026 from verified student submissions. All personal identifiers removed.',
  url: 'https://usmlepredictor.com/',
  sameAs: 'https://usmlepredictor.com/accuracyinsights',
  temporalCoverage: '2022-01/2026-03',
  spatialCoverage: { '@type': 'Place', name: 'United States' },
  keywords: [
    'USMLE',
    'Step 2 CK',
    'NBME',
    'UWSA',
    'Score Prediction',
    'Medical Licensing Examination',
    'Item Response Theory',
  ],
  license: 'https://usmlepredictor.com/',
  isAccessibleForFree: true,
  creator: {
    '@type': 'Organization',
    name: 'USMLEPredictor Editorial Team',
    url: 'https://usmlepredictor.com/',
  },
  variableMeasured: [
    'NBME Form 9-16 score (180-300)',
    'UWSA 1, UWSA 2, UWSA 3 score (180-300)',
    'Free 120 percent correct',
    'UWorld cumulative percent correct',
    'Actual Step 2 CK score (196-300)',
    'Candidate status (US-MD, US-DO, Non-US-IMG)',
  ],
} as const

// ─── MedicalWebPage schema factory (per-page YMYL trust signal) ─────────────

export function medicalWebPageSchema(opts: {
  url: string
  name: string
  description: string
  lastReviewed: string  // ISO date
  about?: string
  audience?: 'medical students' | 'residents' | 'physicians'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    lastReviewed: opts.lastReviewed,
    audience: opts.audience
      ? { '@type': 'MedicalAudience', audienceType: opts.audience }
      : undefined,
    about: opts.about
      ? { '@type': 'MedicalEntity', name: opts.about }
      : undefined,
    reviewedBy: {
      '@type': 'Organization',
      '@id': 'https://usmlepredictor.com/#editorial-team',
      name: 'USMLEPredictor Editorial Team',
    },
    author: {
      '@type': 'Person',
      '@id': 'https://usmlepredictor.com/#author-tao-leo',
      name: 'Tao Leo',
    },
    isPartOf: {
      '@type': 'WebSite',
      url: 'https://usmlepredictor.com/',
      name: 'USMLEPredictor',
    },
  } as const
}

export const accuracyFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  // Q&As kept byte-identical to the visible FAQ on /accuracyinsights.
  mainEntity: [
    {
      '@type': 'Question',
      name: "How often is the prediction model updated?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The model is reviewed quarterly. When new NBME forms are released, form-specific regression parameters are updated as soon as sufficient data (minimum 100 score reports per form) is collected.",
      },
    },
    {
      '@type': 'Question',
      name: "Can I submit my score to help improve the model?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. After your exam, you can submit your practice scores and official result through our score contribution form. All submissions are anonymized and used solely to improve prediction accuracy.",
      },
    },
    {
      '@type': 'Question',
      name: "Is my data private?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "All personal identifiers are removed at the point of submission. We store only the practice exam score, actual USMLE score, and exam month/year. No data is sold or shared with third parties.",
      },
    },
    {
      '@type': 'Question',
      name: "What if my score was very different from the prediction?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Approximately 20% of users score outside our stated precision range. If your result differed significantly, we encourage you to submit your data through the contribution form — these outlier cases are particularly valuable for improving model accuracy at the score extremes.",
      },
    },
  ],
} as const
