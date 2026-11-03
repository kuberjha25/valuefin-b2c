/**
 * One record per page: its address, search listing text, share-card text and sitemap hints.
 * Edit the copy here and every place that uses it (title tag, description, social card,
 * sitemap, structured data) updates together.
 *
 * Keep titles to about 60 characters and descriptions to about 160, so search results do not cut them.
 */
export type PageKey =
  | 'home'
  | 'quick-cash'
  | 'rocket-fuel'
  | 'how-it-works'
  | 'why-valuefin'
  | 'who-we-fund'
  | 'for-vcs'
  | 'faq'
  | 'apply'
  | 'partner';

export interface PageDef {
  key: PageKey;
  /** URL path. '/' for the home page. */
  path: string;
  /** Short name for breadcrumbs. */
  name: string;
  /** The <title> text. The site name is added after it unless titleAbsolute is set. */
  title: string;
  titleAbsolute?: boolean;
  description: string;
  /** schema.org type for the page itself. */
  schemaType: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage';
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  /** Text printed on the 1200x630 share image. Plain ASCII only. */
  og: { kicker: string; headline: string; sub: string };
}

export const PAGES: Record<PageKey, PageDef> = {
  home: {
    key: 'home',
    path: '/',
    name: 'Home',
    title: 'Valuefin | Non-dilutive working capital for Indian brands',
    titleAbsolute: true,
    description:
      'Valuefin is an RBI-registered NBFC. Working capital against marketplace settlements, purchase orders and invoices from large buyers, with no dilution.',
    schemaType: 'WebPage',
    priority: 1,
    changeFrequency: 'weekly',
    og: {
      kicker: 'RBI-REGISTERED NBFC',
      headline: 'Working capital without dilution',
      sub: 'Settlements, purchase orders and invoices, funded in about five days.',
    },
  },
  'quick-cash': {
    key: 'quick-cash',
    path: '/quick-cash',
    name: 'Quick Cash',
    title: 'Quick Cash: Purchase order and settlement finance',
    description:
      'Quick Cash funds marketplace settlements, purchase orders and invoices. 25 lakh to 5 crore for 30 to 120 days, repaid when the buyer pays.',
    schemaType: 'WebPage',
    priority: 0.9,
    changeFrequency: 'monthly',
    og: {
      kicker: 'PRODUCT',
      headline: 'Quick Cash',
      sub: 'Turn what marketplaces owe you into cash you can spend.',
    },
  },
  'rocket-fuel': {
    key: 'rocket-fuel',
    path: '/rocket-fuel',
    name: 'Rocket Fuel',
    title: 'Rocket Fuel: Growth loans for VC-backed startups',
    description:
      'Rocket Fuel is 25 lakh to 5 crore of growth capital for VC-backed companies, for 90 to 180 days. Inventory, marketing, expansion and bridge loans. No dilution.',
    schemaType: 'WebPage',
    priority: 0.9,
    changeFrequency: 'monthly',
    og: {
      kicker: 'PRODUCT',
      headline: 'Rocket Fuel',
      sub: 'Growth capital for VC-backed companies, without another round.',
    },
  },
  'how-it-works': {
    key: 'how-it-works',
    path: '/how-it-works',
    name: 'How it works',
    title: 'How it works: Funded in about five days',
    description:
      'From first conversation to money in about five days. Documents in about three days, disbursal about two days after. Here are the four steps.',
    schemaType: 'WebPage',
    priority: 0.8,
    changeFrequency: 'monthly',
    og: {
      kicker: 'THE PROCESS',
      headline: 'From first call to funded',
      sub: 'Four steps. About five days.',
    },
  },
  'why-valuefin': {
    key: 'why-valuefin',
    path: '/why-valuefin',
    name: 'Why Valuefin',
    title: 'Why Valuefin: Own balance sheet, fast decisions',
    description:
      'Six reasons founders borrow from Valuefin: our own balance sheet, a decision-maker who picks up, speed, ownership, short tenor and discipline.',
    schemaType: 'AboutPage',
    priority: 0.7,
    changeFrequency: 'monthly',
    og: {
      kicker: 'WHY VALUEFIN',
      headline: 'Built for how new-age companies grow',
      sub: 'Our own balance sheet, a decision-maker who picks up, and debt sized to the gap.',
    },
  },
  'who-we-fund': {
    key: 'who-we-fund',
    path: '/who-we-fund',
    name: 'Who we fund',
    title: 'Who we fund: Example working capital facilities',
    description:
      'Anonymised cases of the working capital facilities Valuefin structures for quick-commerce suppliers, D2C brands, manufacturers and growth-stage startups.',
    schemaType: 'CollectionPage',
    priority: 0.7,
    changeFrequency: 'monthly',
    og: {
      kicker: 'WHO WE FUND',
      headline: 'Real shapes of the facilities we build',
      sub: 'Quick-commerce suppliers, D2C brands, manufacturers and growth-stage startups.',
    },
  },
  'for-vcs': {
    key: 'for-vcs',
    path: '/for-vcs',
    name: 'For VCs',
    title: 'For VCs: Portfolio working capital, no dilution',
    description:
      'Portfolio working capital without dilution. Route a portfolio company to Valuefin for a fast, honest read, or explore partnering on the debt side.',
    schemaType: 'WebPage',
    priority: 0.7,
    changeFrequency: 'monthly',
    og: {
      kicker: 'FOR VCS',
      headline: 'Portfolio working capital',
      sub: 'Without touching your ownership.',
    },
  },
  faq: {
    key: 'faq',
    path: '/faq',
    name: 'FAQ',
    title: 'FAQ: Tenor, repayment, speed and top-ups',
    description:
      'Straight answers about Valuefin: what we finance, how fast, how tenor works, when you repay and how top-ups work.',
    schemaType: 'FAQPage',
    priority: 0.7,
    changeFrequency: 'monthly',
    og: {
      kicker: 'FAQ',
      headline: 'Straight answers',
      sub: 'Tenor, repayment, speed and top-ups.',
    },
  },
  apply: {
    key: 'apply',
    path: '/apply',
    name: 'Apply for funding',
    title: 'Apply for funding',
    description:
      'Tell Valuefin what you are funding. A short form for founders: your company, the funding you need, what it is for and when the money comes back.',
    schemaType: 'ContactPage',
    priority: 0.8,
    changeFrequency: 'yearly',
    og: {
      kicker: 'APPLY',
      headline: 'Tell us what you are funding',
      sub: 'An honest read in days, whether it is a fit or not.',
    },
  },
  partner: {
    key: 'partner',
    path: '/partner',
    name: 'Partner with us',
    title: 'Partner with Valuefin | For VCs and funds',
    titleAbsolute: true,
    description:
      'For VCs, angel networks and funds: route portfolio companies to non-dilutive working capital, or explore working together on the debt side.',
    schemaType: 'ContactPage',
    priority: 0.6,
    changeFrequency: 'yearly',
    og: {
      kicker: 'PARTNER WITH US',
      headline: 'For VCs and funds',
      sub: 'Route portfolio companies to non-dilutive working capital.',
    },
  },
};

export const PAGE_LIST: PageDef[] = Object.values(PAGES);
