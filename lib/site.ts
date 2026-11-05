/**
 * Single place for company details used across the site (footer, apply page, structured data).
 * Fill the empty strings below when you have the details. Nothing else needs to change.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://valuefin.in').replace(/\/+$/, '');

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  email: string;
  /** Example: '+91 98xxx xxxxx'. Shown on the apply page and added to structured data when set. */
  phone: string;
  /** Certificate of Registration number issued by the RBI. */
  cor: string;
  /** Corporate Identification Number. */
  cin: string;
  registeredOffice: string;
  grievanceOfficer: string;
  /**
   * The footer shows a reminder to confirm the regulatory disclosure wording with compliance.
   * Set this to true once compliance has signed off the wording, and the reminder disappears.
   */
  disclosureConfirmed: boolean;
  locale: string;
  themeColor: string;
}

export const site: SiteConfig = {
  name: 'Valuefin',
  legalName: 'Valuefin Credit Private Limited',
  tagline: 'Working capital for new-age India. Never from your cap table.',
  description:
    'Valuefin is an RBI-registered NBFC financing quick-commerce and e-commerce settlements, purchase orders and invoices from large buyers. Working capital with no dilution.',
  email: 'sonali@valuefin.in',
  phone: '',
  cor: '',
  cin: '',
  registeredOffice: '',
  grievanceOfficer: '',
  disclosureConfirmed: false,
  locale: 'en_IN',
  themeColor: '#F4F2EB',
};
