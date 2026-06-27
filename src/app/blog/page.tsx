import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import SiteHeader from '@/components/SiteHeader';
import { getAllPosts } from '@/content/blog/posts';

export const metadata: Metadata = {
  title: 'USMLE Score Prediction Blog — Data, Guides & Analysis',
  description:
    'Data-driven articles on USMLE Step 1, Step 2 CK & Step 3 score prediction — NBME form accuracy, UWSA correlations, and how to read your practice scores. Built on 5,039 verified outcomes.',
  alternates: { canonical: 'https://usmlepredictor.com/blog/' },
  openGraph: {
    title: 'USMLE Score Prediction Blog — Data, Guides & Analysis',
    description:
      'Data-driven USMLE score-prediction articles built on 5,039 verified student outcomes.',
    url: 'https://usmlepredictor.com/blog/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'USMLE Predictor Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USMLE Score Prediction Blog',
    description: 'Data-driven USMLE score-prediction articles built on 5,039 verified outcomes.',
    images: ['/og-image.png'],
  },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'USMLE Predictor Blog',
    url: 'https://usmlepredictor.com/blog/',
    description:
      'Data-driven articles on USMLE score prediction built on 5,039 verified student outcomes.',
    publisher: {
      '@type': 'Organization',
      name: 'USMLE Predictor',
      url: 'https://usmlepredictor.com/',
      logo: { '@type': 'ImageObject', url: 'https://usmlepredictor.com/icon-512.png' },
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.meta.h1,
      description: p.meta.description,
      url: `https://usmlepredictor.com/blog/${p.meta.slug}/`,
      datePublished: p.meta.date,
      dateModified: p.meta.dateModified ?? p.meta.date,
      author: { '@type': 'Person', name: p.meta.author },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'USMLE Predictor', item: 'https://usmlepredictor.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://usmlepredictor.com/blog/' },
    ],
  };

  const [featured, ...rest] = posts;

  return (
    <>
      <SchemaMarkup schema={[blogSchema, breadcrumbSchema]} />
      <SiteHeader active="blog" />

      <div className="premium-page-container">
      <header className="blog-hero">
        <div className="badge-premium">Blog · Data &amp; Analysis</div>
        <h1 className="blog-hero__title">USMLE Score Prediction Blog</h1>
        <p className="blog-hero__lede">
          Data-driven articles on USMLE Step 1, Step 2 CK, and Step 3 score prediction — NBME form
          accuracy, UWSA correlations, and how to read your practice scores. Every claim is grounded in
          our dataset of <strong className="text-white">5,039 verified student outcomes</strong>.
        </p>
      </header>

      <section className="premium-main-content">
        {featured && (
          <Link href={`/blog/${featured.meta.slug}/`} className="blog-featured">
            <div className="blog-featured__body">
              <div className="blog-card-head">
                <span className="blog-card-tag">Latest · {featured.meta.category}</span>
                <span className="blog-card-time">{featured.meta.readingTime}</span>
              </div>
              <h2 className="blog-featured__title">{featured.meta.title}</h2>
              <p className="blog-featured__excerpt">{featured.meta.excerpt}</p>
              <div className="blog-card-foot">
                <span className="blog-card-date">{formatDate(featured.meta.date)}</span>
                <span className="blog-card-read">Read the analysis <ArrowRight size={14} /></span>
              </div>
            </div>
            <div className="blog-featured__aside" aria-hidden="true">
              <span className="blog-featured__mark">{featured.meta.category}</span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="blog-grid">
            {rest.map((p) => (
              <Link key={p.meta.slug} href={`/blog/${p.meta.slug}/`} className="blog-card">
                <div className="blog-card-head">
                  <span className="blog-card-tag">{p.meta.category}</span>
                  <span className="blog-card-time">{p.meta.readingTime}</span>
                </div>
                <h2 className="blog-card-title">{p.meta.title}</h2>
                <p className="blog-card-excerpt">{p.meta.excerpt}</p>
                <div className="blog-card-foot">
                  <span className="blog-card-date">{formatDate(p.meta.date)}</span>
                  <span className="blog-card-read">Read <ArrowRight size={13} /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      </div>
    </>
  );
}
