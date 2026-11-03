import type { Metadata } from 'next';
import { PAGES, type PageKey } from './pages';
import { site } from './site';

/** The title as it appears in the browser tab and in search results. */
export function fullTitle(key: PageKey): string {
  const p = PAGES[key];
  return p.titleAbsolute ? p.title : `${p.title} | ${site.name}`;
}

/** Address of the share image for a page. Resolved against metadataBase. */
export function ogImagePath(key: PageKey): string {
  return `/og/${key}.png`;
}

/**
 * Metadata for one page: title, description, canonical address, Open Graph and Twitter cards.
 * Open Graph is written out in full for every page, because a page's openGraph replaces the layout's.
 */
export function pageMetadata(key: PageKey): Metadata {
  const p = PAGES[key];
  const title = fullTitle(key);
  const image = { url: ogImagePath(key), width: 1200, height: 630, alt: `${site.name}: ${p.og.headline}` };

  return {
    title: p.titleAbsolute ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: 'website',
      url: p.path,
      siteName: site.name,
      locale: site.locale,
      title,
      description: p.description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: p.description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
