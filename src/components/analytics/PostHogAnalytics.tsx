'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type { PostHog } from 'posthog-js';

/**
 * PostHog (EU Cloud) — privacy-hardened, lazily loaded.
 *
 * Design decisions, deliberately:
 *  - LAZY LOADED. posthog-js is ~80KB; importing it statically would add that to
 *    the initial bundle of every page. It is dynamically imported after mount so
 *    it never blocks first paint or hurts Core Web Vitals (which feed SEO).
 *  - EU host. The project lives in EU Cloud; the library's built-in default is
 *    the US host, so this must be set explicitly.
 *  - IP is discarded. `$ip: null` is registered on every event, so PostHog never
 *    stores the visitor's IP. (Also switch on "Anonymize IPs" in project
 *    settings for defence in depth — this is the client-side belt.)
 *  - Session recording OFF. Microsoft Clarity + Umami already record sessions; a
 *    third recorder is wasted bandwidth and extra exposure of user input.
 *  - `person_profiles: 'identified_only'` and we never call identify(), so no
 *    person profiles are ever created — events stay anonymous.
 *  - Do Not Track respected.
 *  - Production hostname only, so local dev and Vercel previews never pollute
 *    (or inflate) real analytics.
 *  - Query strings are allow-listed before being sent, so a practice score can
 *    never leak into analytics via a URL.
 *
 * The project token is a write-only public key (PostHog: "Safe to use in public
 * apps"), consistent with the GA/Clarity/Umami IDs already in this repo. It can
 * still be overridden per-environment via NEXT_PUBLIC_POSTHOG_KEY.
 */
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? 'phc_zTexU4hGv9T7EgeSxws4XLMfYJ9vrfj3jfwrLZDVAG2k';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';

const PRODUCTION_HOSTS = new Set(['usmlepredictor.com', 'www.usmlepredictor.com']);

/** Loaded instance, or null until the dynamic import resolves (or forever if we don't track). */
let client: PostHog | null = null;
let loading = false;

function shouldTrack(): boolean {
  if (typeof window === 'undefined') return false;
  if (!POSTHOG_KEY) return false;
  return PRODUCTION_HOSTS.has(window.location.hostname);
}

/** Build a URL with only marketing params kept — never anything user-entered. */
function safeUrl(pathname: string, search: string): string {
  const allowed = new Set([
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'ref', 'gclid', 'fbclid',
  ]);
  let query = '';
  try {
    const kept = new URLSearchParams();
    new URLSearchParams(search).forEach((v, k) => {
      if (allowed.has(k.toLowerCase())) kept.append(k, v);
    });
    const s = kept.toString();
    query = s ? `?${s}` : '';
  } catch {
    query = '';
  }
  return `${window.location.origin}${pathname}${query}`;
}

async function ensureLoaded(): Promise<PostHog | null> {
  if (client) return client;
  if (loading || !shouldTrack()) return null;
  loading = true;
  try {
    const mod = await import('posthog-js');
    const posthog = mod.default;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      ui_host: 'https://eu.posthog.com',
      person_profiles: 'identified_only',
      // Pageviews captured manually — App Router client navigation does not
      // trigger a page load, so automatic capture would miss route changes.
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: true,
      disable_surveys: true,
      respect_dnt: true,
      secure_cookie: true,
      cross_subdomain_cookie: false,
      loaded: (ph) => {
        // Never send the visitor's IP address to PostHog.
        ph.register({ $ip: null });
        ph.debug(false);
      },
    });
    client = posthog;
    return client;
  } catch {
    // Analytics must never break the page — if the chunk fails to load, carry on.
    return null;
  } finally {
    loading = false;
  }
}

function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!shouldTrack()) return;
    const search = searchParams?.toString() ?? '';
    const url = safeUrl(pathname, search);
    if (lastSent.current === url) return;
    lastSent.current = url;

    let cancelled = false;
    ensureLoaded().then((ph) => {
      if (!ph || cancelled) return;
      ph.capture('$pageview', { $current_url: url });
    });
    return () => {
      cancelled = true;
    };
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogAnalytics() {
  return (
    <Suspense fallback={null}>
      <PostHogPageview />
    </Suspense>
  );
}
