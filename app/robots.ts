import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Built once with the site. Also lets the project run as a static export.
export const dynamic = 'force-static';

/** Served at /robots.txt. Everything public is open to crawlers; the form endpoint is not. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
