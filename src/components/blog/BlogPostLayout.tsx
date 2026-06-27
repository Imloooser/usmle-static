import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import SiteHeader from '@/components/SiteHeader';
import ReadingProgress from '@/components/ReadingProgress';
import type { BlogPost, BlogPostMeta } from '@/content/blog/types';

const SITE = 'https://usmlepredictor.com';

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function blogPostSchemas(meta: BlogPostMeta) {
  const url = `${SITE}/blog/${meta.slug}/`;
  const image = `${SITE}${meta.ogImage ?? '/og-image.png'}`;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.h1,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.dateModified ?? meta.date,
    author: {
      '@type': 'Person',
      name: meta.author,
      jobTitle: meta.authorRole,
      url: SITE + '/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'USMLE Predictor',
      url: SITE + '/',
      logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image,
    url,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'USMLE Predictor', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
      { '@type': 'ListItem', position: 3, name: meta.h1, item: url },
    ],
  };

  const schemas: object[] = [blogPosting, breadcrumb];

  if (meta.faqs && meta.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return schemas;
}

export default function BlogPostLayout({
  meta,
  related,
  children,
}: {
  meta: BlogPostMeta;
  related: BlogPost[];
  children: React.ReactNode;
}) {
  return (
    <>
      <SchemaMarkup schema={blogPostSchemas(meta)} />
      <ReadingProgress />
      <SiteHeader active="blog" />

      <div className="premium-page-container">
      <section className="blog-main">
        <article className="blog-article">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-[12px] text-slate-400 mb-6 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-white no-underline transition-colors">Home</Link>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <Link href="/blog/" className="hover:text-white no-underline transition-colors">Blog</Link>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span className="text-slate-300">{meta.category}</span>
          </nav>

          {/* Header */}
          <header className="mb-9">
            <span className="blog-card-tag">{meta.category}</span>
            <h1 className="text-3xl md:text-[2.6rem] font-extrabold text-white leading-[1.12] tracking-[-0.02em] mt-6 mb-6">
              {meta.h1}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-slate-400">
              <span className="font-semibold text-white">{meta.author}</span>
              <span className="blog-reviewed-badge inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                <ShieldCheck size={11} /> Medically reviewed
              </span>
              <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-slate-400">
                Updated {formatDate(meta.dateModified ?? meta.date)} · {meta.readingTime}
              </span>
            </div>
            <div className="mt-7 border-t border-white/[0.06]" />
          </header>

          {/* Body */}
          <section className="blog-content">{children}</section>

          {/* FAQ */}
          {meta.faqs && meta.faqs.length > 0 && (
            <section className="blog-faq">
              <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
              {meta.faqs.map((f, i) => (
                <details key={i} className="premium-faq-item">
                  <summary className="premium-faq-question">{f.question}</summary>
                  <div className="premium-faq-answer"><p>{f.answer}</p></div>
                </details>
              ))}
            </section>
          )}

          {/* Author / E-E-A-T */}
          <section className="blog-author">
            <div className="blog-panel">
              <div className="blog-author__eyebrow flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Written &amp; medically reviewed by
                </span>
              </div>
              <p className="text-xl font-bold text-white leading-snug">{meta.author}</p>
              <p className="blog-author__role text-sm text-slate-400">{meta.authorRole} · USMLE Predictor</p>
              <p className="blog-author__bio text-[15px] leading-relaxed text-slate-300/90 max-w-2xl">
                {meta.authorBio ??
                  'Robert Zane, MD reviews USMLE score-prediction content at USMLE Predictor for accuracy.'}{' '}
                Read how we build and validate each prediction on our{' '}
                <Link href="/methodology/" className="text-indigo-400 hover:underline">methodology page</Link>.
              </p>
            </div>
          </section>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="blog-related">
              <h2 className="text-xl font-bold text-white">Keep reading</h2>
              <div className="blog-grid" style={{ marginTop: 0 }}>
                {related.map((p) => (
                  <Link key={p.meta.slug} href={`/blog/${p.meta.slug}/`} className="blog-card">
                    <div className="blog-card-head">
                      <span className="blog-card-tag">{p.meta.category}</span>
                      <span className="blog-card-time">{p.meta.readingTime}</span>
                    </div>
                    <h3 className="blog-card-title" style={{ fontSize: '1.05rem' }}>{p.meta.title}</h3>
                    <p className="blog-card-excerpt line-clamp-3">{p.meta.excerpt}</p>
                    <div className="blog-card-foot">
                      <span className="blog-card-date">{formatDate(p.meta.date)}</span>
                      <span className="blog-card-read">Read <ArrowRight size={13} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="blog-backlink">
            <Link href="/blog/" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-white no-underline transition-colors">
              <ArrowLeft size={14} /> All articles
            </Link>
          </div>
        </article>
      </section>
      </div>
    </>
  );
}
