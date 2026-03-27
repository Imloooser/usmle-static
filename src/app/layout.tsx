import './globals.css'
import Script from 'next/script'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DisableRightClick from '@/components/DisableRightClick'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://usmlepredictor.com'),

  title: {
    default: 'USMLE Step 2 CK Score Predictor (2026)',
    template: '%s | USMLEPredictor',
  },

  description:
    'Free USMLE score predictor for Step 1, Step 2 CK, and Step 3. Predict your score using NBME, UWSA, Free 120 & UWorld. Accurate within ±5–8 points.',

  keywords: [
    'usmle score predictor',
    'step 2 ck score predictor',
    'nbme score conversion',
    'predict my usmle score',
    'usmle score distribution',
  ],

  authors: [{ name: 'USMLEPredictor' }],
  creator: 'USMLEPredictor',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: '/',
  },

  category: 'education',

  openGraph: {
    type: 'website',
    url: '/',
    title: 'USMLE Score Predictor (Step 1, 2 CK, Step 3)',
    description:
      'Predict your USMLE score instantly using real student data and advanced algorithms.',
    siteName: 'USMLEPredictor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Free USMLE Score Predictor',
    description:
      'Predict your USMLE Step 2 CK score using NBME, UWSA & Free 120.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/icon-180.png',
  },

  manifest: '/manifest.json',
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "USMLE Score Predictor",
    url: "https://usmlepredictor.com",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    description:
      "Free USMLE Step 2 CK score predictor using NBME, UWSA and Free 120.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "USMLEPredictor",
    url: "https://usmlepredictor.com",
    logo: "https://usmlepredictor.com/icon-180.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://usmlepredictor.com",
      },
    ],
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0b0f1a] text-white antialiased`}>

        <DisableRightClick />

        {/* 🔥 STRUCTURED DATA */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* MAIN CONTENT */}
        <main>{children}</main>

        {/* 🔥 GOOGLE ANALYTICS */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SMNQX2K4CW"
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SMNQX2K4CW');
          `}
        </Script>

        {/* OPTIONAL: Umami */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="7fc3b461-93e9-4d96-ab6f-e8ae0a6a9b2d"
          strategy="afterInteractive"
        />

      </body>
    </html>
  )
}