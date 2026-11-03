import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Built once with the site. Also lets the project run as a static export.
export const dynamic = 'force-static';

/** Web app manifest, served at /manifest.webmanifest. Gives browsers the name, colours and icons. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'browser',
    lang: 'en-IN',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
