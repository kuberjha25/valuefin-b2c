/**
 * The FAQ lives here once. The FAQ page renders it, and the same text feeds the
 * FAQPage structured data, so the two can never drift apart.
 *
 * An answer is a list of pieces: plain text, or a link to another page.
 */
export type AnswerPiece = string | { href: string; text: string };

export interface FaqItem {
  q: string;
  a: AnswerPiece[];
  /** Set to false to keep a question on the page but out of the structured data (search listings). */
  schema?: boolean;
}

export const FAQ: FaqItem[] = [
  {
    q: 'Do you take equity, warrants, or board seats?',
    a: [
      'No, no, and no. Every facility is pure debt. Your cap table after repaying us looks exactly like your cap table before you met us.',
    ],
  },
  {
    q: 'What do you finance?',
    a: [
      'Settlements owed by quick-commerce and e-commerce marketplaces such as Blinkit, Zepto, Instamart, Amazon and FirstClub, purchase orders you need working capital to fulfil, and invoices from large and listed buyers. VC-backed companies can also use Rocket Fuel for inventory, marketing, expansion and bridge loans between equity rounds.',
    ],
  },
  {
    q: 'How fast is it, really?',
    a: [
      'Documentation is typically complete about 3 days after our first conversation, and money lands about 2 days after that, so roughly five days end to end. Founders who send bank statements and financials upfront move faster. Timing depends on how quickly documents arrive.',
    ],
  },
  {
    q: 'Why short tenor instead of a term loan?',
    a: [
      'Your gap is usually 30 to 120 days, between paying a supplier and being paid by the marketplace. A term loan of 12 months or more makes you pay interest for days you did not need, and keeps debt on your books. A 30 to 120 day facility is repaid when the money lands.',
    ],
  },
  {
    q: 'When do I repay?',
    a: [
      'When the receivable hits your bank. That might be day 45, 60, 90 or 120, depending on how your marketplace or buyer pays. You do not wait for a fixed instalment date.',
    ],
  },
  {
    q: 'What sizes and tenors do you write?',
    a: [
      'Quick Cash is ₹25 lakh to ₹5 crore for 30 to 120 days. Rocket Fuel is ₹25 lakh to ₹5 crore for 90 to 180 days, for VC-backed companies.',
    ],
  },
  {
    q: 'Who is Rocket Fuel for?',
    a: [
      'VC-backed companies. We confirm your backing, verify your revenue and size the facility from there. Once you hold a final term sheet, it can also bridge you between equity rounds, so you do not take a dilutive bridge round.',
    ],
  },
  {
    q: 'What happens when I need more?',
    a: [
      'Ask for a top-up. After at least 2 completed rotations, each drawn and repaid on time, we can raise your ceiling for new geographies, bulk inventory, new products or a festive rush.',
    ],
  },
  {
    q: 'What does it cost?',
    a: [
      'Interest is charged only for the days the money is in use. The planner on our homepage compares this over a full year with a 12-month term loan, which is charged for all 365 days whether you need the money or not. Your actual terms depend on the buyer, the tenor and the structure, and every cost is disclosed in writing before you sign.',
    ],
  },
  {
    q: 'Who can apply?',
    a: [
      'Startups and MSMEs with real revenue and a clear cash event: a credible marketplace or buyer, or a receivable that is about to land. From early-stage sellers to growth-stage brands. Rocket Fuel is for VC-backed companies with verified revenue.',
    ],
  },
  {
    q: 'I already have a bank loan. Is that a problem?',
    a: [
      'Not automatically. We look at it case by case and structure around existing charges cleanly. We play straight with other lenders and will tell you early if it will not work.',
    ],
  },
  {
    q: 'What documents will you ask for?',
    a: [
      'Typically 12 months of bank statements, GST returns, latest financials or MIS, and the purchase order, settlement report or invoice we are funding. For Rocket Fuel, the cap table too.',
    ],
  },
  {
    q: 'What happens if my buyer pays late?',
    a: [
      'Talk to us early. Real businesses have messy patches, and we work with founders who communicate. Late payments are managed case by case.',
    ],
  },
  {
    q: 'I am a VC or a fund. How do we partner?',
    a: [
      'Use the ',
      { href: '/partner', text: 'partnership form' },
      '. Tell us about the fund and what you have in mind, and we will come back within a few days.',
    ],
  },
];

/** The answer as plain text, for structured data. */
export function answerText(a: AnswerPiece[]): string {
  return a.map((p) => (typeof p === 'string' ? p : p.text)).join('');
}
