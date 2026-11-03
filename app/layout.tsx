import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from './fonts';
import { Footer } from '@/components/site/Footer';
import { Nav } from '@/components/site/Nav';
import { ScrollProgress } from '@/components/site/ScrollProgress';
import { SiteEffects } from '@/components/site/SiteEffects';
import { SITE_URL, site } from '@/lib/site';

const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: SITE_URL }],
  creator: site.legalName,
  publisher: site.legalName,
  category: 'finance',
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    ...(google ? { google } : {}),
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  },
  openGraph: { type: 'website', siteName: site.name, locale: site.locale },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: site.themeColor,
  colorScheme: 'light',
};

/**
 * Runs before the first paint. It marks the page as "scripts available", so content that animates in
 * is hidden only for visitors whose scripts will actually run. Without scripts everything is visible.
 */
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <ScrollProgress />
        <Nav />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
