import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/content/blog/posts';

// Only the slugs we generate exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { meta } = post;
  const url = `https://usmlepredictor.com/blog/${meta.slug}/`;
  const image = meta.ogImage ?? '/og-image.png';

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: 'article',
      publishedTime: meta.date,
      modifiedTime: meta.dateModified ?? meta.date,
      authors: [meta.author],
      images: [{ url: image, width: 1200, height: 630, alt: meta.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, Body } = post;
  return (
    <BlogPostLayout meta={meta} related={getRelatedPosts(slug)}>
      <Body />
    </BlogPostLayout>
  );
}
