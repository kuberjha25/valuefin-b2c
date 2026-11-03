import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/jsonld';
import { PAGE_LIST } from '@/lib/pages';

// Built once with the site. Also lets the project run as a static export.
export const dynamic = 'force-static';

/**
 * Lists every page for search engines. Served at /sitemap.xml.
 * No "last modified" dates are written: a date that changes on every build, whether or not the page changed,
 * teaches search engines to ignore it. Add one per page here if you keep it accurate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_LIST.map((p) => ({
    url: absoluteUrl(p.path),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
