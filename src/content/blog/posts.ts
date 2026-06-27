import type { BlogPost } from './types';
import Step1PassProbBody, { meta as step1PassProbMeta } from './how-to-calculate-step-1-pass-probability';
import NbmeAccuracyBody, { meta as nbmeAccuracyMeta } from './which-nbme-form-is-most-accurate';
import Step2GuideBody, { meta as step2GuideMeta } from './usmle-step-2-ck-score-prediction-guide';
import Step3PredictorBody, { meta as step3PredictorMeta } from './step-3-score-predictor-nbme-uwsa-correlation';

/**
 * Blog post registry. To publish a new post:
 *   1. Add `src/content/blog/<slug>.tsx` exporting `meta` + a default Body component.
 *   2. Import it here and add a `{ meta, Body }` entry below.
 *   3. Add `/blog/<slug>` to next-sitemap.config.js (priorities + additionalPaths).
 */
export const POSTS: BlogPost[] = [
  { meta: step3PredictorMeta, Body: Step3PredictorBody },
  { meta: step1PassProbMeta, Body: Step1PassProbBody },
  { meta: nbmeAccuracyMeta, Body: NbmeAccuracyBody },
  { meta: step2GuideMeta, Body: Step2GuideBody },
];

/** Newest first; same-day posts keep their registration order (POSTS). */
export const getAllPosts = (): BlogPost[] =>
  [...POSTS].sort((a, b) =>
    a.meta.date < b.meta.date ? 1 : a.meta.date > b.meta.date ? -1 : 0,
  );

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  POSTS.find((p) => p.meta.slug === slug);

/** Other posts, newest first, for the "Keep reading" block. */
export const getRelatedPosts = (slug: string, limit = 2): BlogPost[] =>
  getAllPosts().filter((p) => p.meta.slug !== slug).slice(0, limit);
