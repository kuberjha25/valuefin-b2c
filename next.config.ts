import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Two years, this host only. Add "; includeSubDomains" once every subdomain of the domain is served over HTTPS.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
];

/** Pages of the previous static site (quick-cash.html and so on) redirect permanently to the clean URLs. */
const legacyPages = 'quick-cash|rocket-fuel|how-it-works|why-valuefin|who-we-fund|for-vcs|faq|apply|partner';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: `/:slug(${legacyPages}).html`, destination: '/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
