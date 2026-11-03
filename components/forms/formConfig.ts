/**
 * Field definitions for the two application forms (founder at /apply, VC or fund at /partner).
 * The form component, the server-side checks and the webhook message are all driven from this file.
 *
 * In a section, an array of fields is one row (side by side on wide screens).
 * A field on its own is rendered full width.
 */
export type FormKind = 'founder' | 'vc';

interface Base {
  name: string;
  label: string;
  required?: boolean;
}

export interface TextField extends Base {
  type: 'text';
  placeholder?: string;
  /** HTML input type, for example 'email' or 'tel'. */
  inputType?: string;
  autoComplete?: string;
  /** Show this field only while another field has this value (a radio group). */
  showIf?: { name: string; value: string };
}

export interface SelectField extends Base {
  type: 'select';
  options: readonly string[];
  /** Text of the empty first option. */
  first?: string;
}

export interface AreaField extends Base {
  type: 'area';
  placeholder: string;
}

export interface PicksField extends Base {
  type: 'picks';
  kind: 'checkbox' | 'radio';
  options: readonly string[];
  hint?: string;
}

export type Field = TextField | SelectField | AreaField | PicksField;
export type Item = Field | Field[];

export interface FormSection {
  title: string;
  sub: string;
  items: Item[];
}

export interface FormConfig {
  kind: FormKind;
  sections: FormSection[];
  thanks: string;
}

export const STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const;

const founder: FormConfig = {
  kind: 'founder',
  thanks: 'We have your details. A decision-maker will read them and come back to you within a few days.',
  sections: [
    {
      title: 'About you',
      sub: 'Who we are talking to',
      items: [
        [
          { type: 'text', name: 'name', label: 'Your name', required: true, placeholder: 'Full name', autoComplete: 'name' },
          {
            type: 'select',
            name: 'role',
            label: 'Your role',
            required: true,
            options: ['Founder or co-founder', 'CFO or finance lead', 'Operations or supply chain head', 'Other'],
          },
        ],
        [
          { type: 'text', name: 'email', label: 'Email', required: true, placeholder: 'you@company.in', inputType: 'email', autoComplete: 'email' },
          { type: 'text', name: 'phone', label: 'Phone', required: true, placeholder: '+91', inputType: 'tel', autoComplete: 'tel' },
        ],
      ],
    },
    {
      title: 'Your company',
      sub: 'Where you are and how you are backed',
      items: [
        [
          { type: 'text', name: 'company', label: 'Company name', required: true, placeholder: 'Acme Pvt Ltd', autoComplete: 'organization' },
          { type: 'text', name: 'site', label: 'Website or marketplace store link', placeholder: 'www.acme.in or store link', autoComplete: 'url' },
        ],
        [
          { type: 'select', name: 'state', label: 'State', required: true, options: STATES, first: 'Select state' },
          { type: 'text', name: 'city', label: 'City', placeholder: 'City', autoComplete: 'address-level2' },
        ],
        [
          {
            type: 'select',
            name: 'sector',
            label: 'Sector',
            required: true,
            options: [
              'FMCG and food',
              'D2C consumer brand',
              'Electronics and accessories',
              'Apparel and fashion',
              'Manufacturing',
              'Packaging and industrial',
              'EV and components',
              'Consumer tech or SaaS',
              'Other',
            ],
          },
          {
            type: 'select',
            name: 'stage',
            label: 'Stage of the company',
            required: true,
            options: [
              'Early stage: first big orders',
              'Growth stage: selling across marketplaces or buyers',
              'Established manufacturer or supplier',
            ],
          },
        ],
        [
          {
            type: 'select',
            name: 'turnover',
            label: 'Turnover in the last financial year',
            required: true,
            options: ['Under ₹1Cr', '₹1Cr to ₹5Cr', '₹5Cr to ₹25Cr', '₹25Cr to ₹100Cr', 'Above ₹100Cr'],
          },
        ],
        {
          type: 'picks',
          kind: 'radio',
          name: 'vcbacked',
          label: 'Are you VC-backed?',
          required: true,
          options: ['Yes', 'No'],
          hint: 'Rocket Fuel is for VC-backed companies. Quick Cash is open to all.',
        },
        {
          type: 'text',
          name: 'investors',
          label: 'Which investors back you?',
          placeholder: 'Fund names, latest round',
          showIf: { name: 'vcbacked', value: 'Yes' },
        },
      ],
    },
    {
      title: 'The funding you need',
      sub: 'Size, purpose and timing',
      items: [
        [
          {
            type: 'select',
            name: 'amount',
            label: 'How much funding do you need?',
            required: true,
            options: ['₹25L to ₹50L', '₹50L to ₹1Cr', '₹1Cr to ₹2.5Cr', '₹2.5Cr to ₹5Cr', 'Not sure yet'],
          },
          {
            type: 'select',
            name: 'payback',
            label: 'Your money comes back in',
            required: true,
            options: ['Within 30 days', '45 days', '60 days', '90 days', '120 days', '150 days', '180 days', 'Not sure yet'],
          },
        ],
        {
          type: 'picks',
          kind: 'checkbox',
          name: 'purpose',
          label: 'What do you need it for?',
          hint: 'Choose all that apply.',
          options: [
            'Marketplace purchase order',
            'Marketplace settlement advance',
            'Invoices from a large or listed buyer',
            'Raw material for orders',
            'Festive-season stock-up',
            'Growth push: marketing, new city, new product',
            'Bridge to an equity round, term sheet in hand',
            'Other',
          ],
        },
        [
          {
            type: 'select',
            name: 'urgency',
            label: 'How soon do you need the funds?',
            required: true,
            options: ['Within 5 days', 'Within 10 days', 'Within 30 days', 'Just exploring'],
          },
        ],
      ],
    },
    {
      title: 'Your buyers and borrowing',
      sub: 'So we can read the business faster',
      items: [
        {
          type: 'text',
          name: 'buyers',
          label: 'Which marketplaces or buyers do you sell to?',
          placeholder: 'For example Blinkit, Zepto, Amazon, a listed retailer',
        },
        [
          {
            type: 'select',
            name: 'loans',
            label: 'Existing loans or credit facilities',
            options: ['No existing loans', 'Yes, with banks', 'Yes, with NBFCs', 'Yes, with both'],
          },
        ],
        {
          type: 'area',
          name: 'details',
          label: 'Tell us about the order or plan',
          placeholder: 'The order, the settlement date, what you will spend on and what pays it back.',
        },
      ],
    },
  ],
};

const vc: FormConfig = {
  kind: 'vc',
  thanks: 'We have your details. One of our directors will come back to you within a few days.',
  sections: [
    {
      title: 'About you',
      sub: 'Who we are talking to',
      items: [
        [
          { type: 'text', name: 'name', label: 'Your name', required: true, placeholder: 'Full name', autoComplete: 'name' },
          {
            type: 'select',
            name: 'role',
            label: 'Your role at the fund',
            required: true,
            options: [
              'Partner or managing partner',
              'Principal',
              'Associate or analyst',
              'Platform or portfolio support',
              'Venture partner or scout',
              'Other',
            ],
          },
        ],
        [
          { type: 'text', name: 'email', label: 'Email', required: true, placeholder: 'you@fund.com', inputType: 'email', autoComplete: 'email' },
          { type: 'text', name: 'phone', label: 'Phone', placeholder: '+91', inputType: 'tel', autoComplete: 'tel' },
        ],
      ],
    },
    {
      title: 'About the fund',
      sub: 'What you invest in',
      items: [
        [
          { type: 'text', name: 'fund', label: 'Fund or firm name', required: true, placeholder: 'Fund name', autoComplete: 'organization' },
          { type: 'text', name: 'site', label: 'Website', placeholder: 'www.fund.com', autoComplete: 'url' },
        ],
        [
          {
            type: 'select',
            name: 'ftype',
            label: 'Type',
            required: true,
            options: [
              'Venture capital fund',
              'Angel network',
              'Accelerator or incubator',
              'Family office',
              'Corporate venture arm',
              'Other',
            ],
          },
          { type: 'text', name: 'city', label: 'Based in', placeholder: 'City and state' },
        ],
        [
          {
            type: 'select',
            name: 'portfolio',
            label: 'Active portfolio companies',
            required: true,
            options: ['Under 10', '10 to 25', '25 to 50', 'More than 50'],
          },
        ],
        {
          type: 'picks',
          kind: 'checkbox',
          name: 'stage',
          label: 'Stage focus',
          hint: 'Choose all that apply.',
          options: ['Pre-seed or seed', 'Series A', 'Series B and later', 'Growth'],
        },
        {
          type: 'picks',
          kind: 'checkbox',
          name: 'sector',
          label: 'Sector focus',
          hint: 'Choose all that apply.',
          options: [
            'Consumer and D2C',
            'FMCG and food',
            'Marketplace and commerce',
            'SaaS and enterprise',
            'Fintech',
            'Manufacturing and deeptech',
            'Other',
          ],
        },
      ],
    },
    {
      title: 'How you would like to partner',
      sub: 'What you have in mind',
      items: [
        {
          type: 'picks',
          kind: 'checkbox',
          name: 'way',
          label: 'Ways we could work together',
          required: true,
          hint: 'Choose all that apply.',
          options: [
            'Refer portfolio companies',
            'A programme for the whole portfolio',
            'Co-lend or co-invest alongside Valuefin',
            'Bridge loans for companies with a term sheet',
            'Just exploring',
          ],
        },
        [
          {
            type: 'select',
            name: 'need',
            label: 'Portfolio companies that could use working capital in the next 12 months',
            options: ['Not sure yet', '1 to 3', '4 to 10', 'More than 10'],
          },
        ],
        {
          type: 'text',
          name: 'profile',
          label: 'What does a typical portfolio company look like?',
          placeholder: 'Example: consumer brands on quick commerce',
        },
      ],
    },
    {
      title: 'Next step',
      sub: 'How to reach you',
      items: [
        [
          {
            type: 'select',
            name: 'next',
            label: 'Preferred next step',
            options: ['An introductory call', 'Send me the details', 'A meeting in person'],
          },
          { type: 'select', name: 'reach', label: 'Best way to reach you', options: ['Phone', 'WhatsApp', 'Email'] },
        ],
        {
          type: 'area',
          name: 'details',
          label: 'Anything else we should know',
          placeholder: 'Your portfolio, the companies you have in mind, or how you would like to structure it.',
        },
      ],
    },
  ],
};

export const FORMS: Record<FormKind, FormConfig> = { founder, vc };

/** Every field of a form, flattened. */
export function allFields(cfg: FormConfig): Field[] {
  const out: Field[] = [];
  for (const s of cfg.sections) {
    for (const it of s.items) {
      if (Array.isArray(it)) out.push(...it);
      else out.push(it);
    }
  }
  return out;
}

/** Checkbox groups where at least one box must be ticked. */
export function needOneGroups(cfg: FormConfig): string[] {
  return allFields(cfg)
    .filter((f): f is PicksField => f.type === 'picks' && f.kind === 'checkbox' && !!f.required)
    .map((f) => f.name);
}
