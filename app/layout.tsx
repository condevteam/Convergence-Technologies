import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BRAND_IMAGES } from '@/lib/images';
import { COMPANY, SITE_URL } from '@/lib/site';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const DEFAULT_TITLE =
  'Convergence Technology | NOC, Data Center & IT Infrastructure Solutions';
const DEFAULT_DESCRIPTION =
  'NOC operations, IT infrastructure consultancy, data center solutions, enterprise hardware rentals and OEM spare parts sourcing for organisations in Sri Lanka.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE, // each page sets its own exact title (Brief §12)
  description: DEFAULT_DESCRIPTION,
  applicationName: COMPANY.name,
  icons: {
    icon: BRAND_IMAGES.icon,
    shortcut: BRAND_IMAGES.icon,
    apple: BRAND_IMAGES.icon,
  },
  openGraph: {
    type: 'website',
    siteName: COMPANY.name,
    locale: 'en_LK',
    url: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: BRAND_IMAGES.logoDark, width: 1672, height: 941, alt: COMPANY.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [BRAND_IMAGES.logoDark],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// Structured business information (Brief §13)
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${BRAND_IMAGES.logoLight}`,
  slogan: COMPANY.tagline,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  areaServed: COMPANY.country,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'LK',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: COMPANY.email,
      telephone: COMPANY.phone,
      areaServed: 'LK',
      availableLanguage: ['English'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
