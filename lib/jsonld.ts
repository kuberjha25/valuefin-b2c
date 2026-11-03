import { FAQ, answerText } from './faq';
import { PAGES, type PageKey } from './pages';
import { SITE_URL, site } from './site';
import { fullTitle } from './seo';

type Json = Record<string, unknown>;

const orgId = `${SITE_URL}/#organization`;
const siteId = `${SITE_URL}/#website`;

export function absoluteUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function organization(): Json {
  const o: Json = {
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl('/'),
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/icon-512.png`, width: 512, height: 512 },
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    areaServed: { '@type': 'Country', name: 'India' },
    knowsAbout: [
      'Working capital finance',
      'Purchase order finance',
      'Invoice finance',
      'Settlement finance',
      'Non-dilutive funding',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.email,
        areaServed: 'IN',
        availableLanguage: ['en'],
        ...(site.phone ? { telephone: site.phone } : {}),
      },
    ],
  };
  if (site.phone) o.telephone = site.phone;
  if (site.cin) o.identifier = { '@type': 'PropertyValue', propertyID: 'CIN', value: site.cin };
  return o;
}

function webSite(): Json {
  return {
    '@type': 'WebSite',
    '@id': siteId,
    url: absoluteUrl('/'),
    name: site.name,
    description: site.description,
    inLanguage: 'en-IN',
    publisher: { '@id': orgId },
  };
}

function service(key: 'quick-cash' | 'rocket-fuel'): Json {
  const p = PAGES[key];
  const isQc = key === 'quick-cash';
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(p.path)}#service`,
    name: p.name,
    serviceType: isQc ? 'Purchase order, invoice and settlement finance' : 'Growth capital for VC-backed companies',
    category: 'Working capital finance',
    description: p.description,
    provider: { '@id': orgId },
    areaServed: { '@type': 'Country', name: 'India' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: isQc
        ? 'Quick-commerce and e-commerce sellers, D2C brands, manufacturers and startups'
        : 'VC-backed companies',
    },
  };
}

/** The structured data for one page, as a single @graph. */
export function pageGraph(key: PageKey): Json {
  const p = PAGES[key];
  const url = absoluteUrl(p.path);
  const graph: Json[] = [organization(), webSite()];

  const page: Json = {
    '@type': p.schemaType,
    '@id': `${url}#webpage`,
    url,
    name: fullTitle(key),
    description: p.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
  };

  if (key !== 'home') {
    page.breadcrumb = { '@id': `${url}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: PAGES.home.name, item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: p.name, item: url },
      ],
    });
  }

  if (key === 'faq') {
    page.mainEntity = FAQ.filter((f) => f.schema !== false).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: answerText(f.a) },
    }));
  }

  graph.push(page);
  if (key === 'quick-cash' || key === 'rocket-fuel') graph.push(service(key));

  return { '@context': 'https://schema.org', '@graph': graph };
}
