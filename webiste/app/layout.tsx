import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * NOTE: Replace NEXT_PUBLIC_SITE_URL in your environment with your production URL
 * (e.g. https://tbk-construction.example) so metadataBase and canonical URLs are correct.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tbk-construction.vercel.app"; 
const SITE_NAME = "TBK Construction";
const SITE_DESCRIPTION =
  "TBK Construction — Licensed & insured maintenance, repairs and emergency services. Get a free quote today — 24/7 response across London and surrounding areas.";
const CONTACT_PHONE = "07340170864";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Reliable Maintenance Services`,
    template: "%s | TBK Construction",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "maintenance",
    "home maintenance",
    "emergency repair",
    "plumbing",
    "electrical",
    "kitchen remodeling",
    "TBK Construction",
    "free quote",
    "local contractor",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} — Reliable Maintenance Services`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Free Quote`,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data including company registration/office details.
  // Removed social links as requested.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": SITE_NAME,
        "legalName": "TBK Construction Ltd",
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.png`
        // no sameAs entries (no social profiles)
      },
      {
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": SITE_URL,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": SITE_NAME,
        "legalName": "TBK Construction Ltd",
        "url": SITE_URL,
        "telephone": CONTACT_PHONE,
        "image": [`${SITE_URL}/logo.png`],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "56 Lowlands Road",
          "addressLocality": "Harrow",
          "addressRegion": "England",
          "postalCode": "HA1 3AN",
          "addressCountry": "GB"
        },
        "foundingDate": "2025-10-04",
        "priceRange": "$$",
        "openingHours": "Mo-Su 00:00-23:59",
        // Additional company facts exposed as PropertyValue entries
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Company status",
            "value": "Active"
          },
          {
            "@type": "PropertyValue",
            "name": "Company type",
            "value": "Private limited Company"
          },
          {
            "@type": "PropertyValue",
            "name": "Accounts",
            "value": "First accounts made up to 31 October 2026 (due by 4 July 2027)"
          },
          {
            "@type": "PropertyValue",
            "name": "Confirmation statement",
            "value": "First statement date 3 October 2026 (due by 17 October 2026)"
          },
          {
            "@type": "PropertyValue",
            "name": "Nature of business (SIC)",
            "value": "41201, 41202, 43210, 43320"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD for search engines */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Helpful preconnects for fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}