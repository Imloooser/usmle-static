import type { ComponentType } from 'react';

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPostMeta {
  /** URL segment: /blog/<slug> */
  slug: string;
  /** SEO <title> (the layout template appends " | USMLEPredictor") */
  title: string;
  /** On-page H1 (may differ slightly from the SEO title) */
  h1: string;
  /** Meta description + OG/Twitter description */
  description: string;
  /** Short summary shown on the blog index card */
  excerpt: string;
  /** Category label, e.g. "Data Analysis" */
  category: string;
  /** ISO published date, e.g. "2026-06-27" */
  date: string;
  /** ISO last-modified date (defaults to `date` when omitted) */
  dateModified?: string;
  /** Visible byline name */
  author: string;
  /** Byline role, e.g. "Founder & Lead Researcher" */
  authorRole: string;
  /** Per-post author bio sentence (the methodology link is appended automatically).
   *  Keep it accurate to THIS post's data source (e.g. Step 1 = NBME data, not the Step 2 dataset). */
  authorBio?: string;
  /** Human reading-time label, e.g. "8 min read" */
  readingTime: string;
  /** Optional FAQ block — renders a visible section + FAQPage schema */
  faqs?: BlogFaq[];
  /** Optional OG image path (defaults to /og-image.png) */
  ogImage?: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  Body: ComponentType;
}
