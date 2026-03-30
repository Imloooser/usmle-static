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
  name: 'USMLE Predictor',
  url: 'https://usmlepredictor.com/',
  logo: 'https://usmlepredictor.com/logo.png',
  description:
    'Free USMLE score predictor tools built on 5,039 verified student score reports.',
  sameAs: [] as string[],
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
  screenshot: 'https://usmlepredictor.com/screenshot.png',
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
  dateModified: '2026-03-01',
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
        text: 'Step 1 and Step 3 score predictors are currently in development and coming soon. The current tool focuses on USMLE Step 2 CK prediction.',
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
  url: 'https://www.usmlepredictor.com/accuracyinsights',
  datePublished: '2022-01-01',
  dateModified: '2026-03-01',
  author: {
    '@type': 'Organization',
    name: 'USMLE Predictor Research Team',
    url: 'https://usmlepredictor.com/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'USMLE Predictor',
    url: 'https://usmlepredictor.com/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://usmlepredictor.com/logo.png',
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

