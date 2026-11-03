import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';
import { Pool } from '@/components/rocket-fuel/Pool';

export const metadata: Metadata = pageMetadata('rocket-fuel');

export default function RocketFuelPage() {
  return (
    <>
      <PageJsonLd page="rocket-fuel" />
      <PageHero />
      <ProductsCompared />
      <HowItIsSized />
      <WhereItWorks />
      <Alternatives />
      <FitCheck />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow gold">// Product · Rocket Fuel</span>
        <h1>Growth capital for VC-backed companies, without another round.</h1>
        <p className="plead">
          When there is no single purchase order to fund, there is still a plan: stock for the season, a marketing push, a new city, a bridge to your next equity round. Rocket Fuel gives VC-backed companies 90 to 180 days of working capital, sized off verified revenue, with your cap table untouched.
        </p>
        <div className="ptags">
          <span className="ptag hl">₹25L – ₹5Cr</span>
          {" "}
          <span className="ptag">90 – 180 days</span>
          {" "}
          <span className="ptag">Sized off verified revenue</span>
          {" "}
          <span className="ptag">For VC-backed companies</span>
          {" "}
          <span className="ptag">0% equity</span>
        </div>
        <Link href="/apply" className="btn btn-solid mag">
          START THE CONVERSATION
          {" "}
          <span className="a">→</span>
        </Link>
      </div>
    </header>
  );
}

function ProductsCompared() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow gold">// Quick Cash vs Rocket Fuel</span>
          <h2>One is tied to an order. The other is one pool of cash.</h2>
          <p>Toggle to see where the money can go.</p>
        </div>
        <Pool />
      </div>
    </section>
  );
}

function HowItIsSized() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow gold">// How it is sized</span>
          <h2>Backed by investors. Sized by revenue.</h2>
          <p>Rocket Fuel is for VC-backed companies. Within that, your verified revenue sets the size of the facility.</p>
        </div>
        <div className="ministeps">
          <div className="mstep rv">
            <span className="mi">01</span>
            <h3>We confirm your backing</h3>
            <p>Who is on your cap table, which funds have backed you, and how recently.</p>
          </div>
          <div className="mstep rv">
            <span className="mi">02</span>
            <h3>We verify revenue and size the facility</h3>
            <p>Bank statements and GST returns tell one story. The ticket follows verified revenue and the cash your plan will generate.</p>
          </div>
          <div className="mstep rv">
            <span className="mi">03</span>
            <h3>We agree the repayment path</h3>
            <p>A repayment plan over 90 to 180 days, set against when the growth shows up in your bank.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhereItWorks() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow gold">// Where it works</span>
          <h2>Put it where growth is cheapest.</h2>
        </div>
        <div className="uses">
          <div className="use rv">
            <svg className="ui" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--gold-soft)" />
              <rect x="16" y="18" width="24" height="20" rx="3" stroke="#A87B2E" strokeWidth="2.4" />
              <path d="M16 24h24" stroke="#A87B2E" strokeWidth="2.4" />
            </svg>
            <h3>Inventory ahead of demand</h3>
            <p>Bulk buys at a better price, or stock for a festive spike. Inventory financing routes here.</p>
          </div>
          <div className="use rv">
            <svg className="ui" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--teal-soft)" />
              <path d="M17 36l8-8 5 5 9-10" stroke="#0C9E85" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>A marketing push</h3>
            <p>Fund the campaign when the unit economics already work, and repay from the sales it brings.</p>
          </div>
          <div className="use rv">
            <svg className="ui" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--gold-soft)" />
              <circle cx="28" cy="25" r="7" stroke="#A87B2E" strokeWidth="2.4" />
              <path d="M28 32v8" stroke="#A87B2E" strokeWidth="2.4" />
            </svg>
            <h3>A new geography</h3>
            <p>Open a city or a dark-store cluster without waiting for the next round.</p>
          </div>
          <div className="use rv">
            <svg className="ui" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--teal-soft)" />
              <path d="M18 38c0-6 4-9 10-9s10 3 10 9" stroke="#0C9E85" strokeWidth="2.4" />
              <circle cx="28" cy="22" r="5" stroke="#0C9E85" strokeWidth="2.4" />
            </svg>
            <h3>A new product line</h3>
            <p>Launch the next category while the first is still compounding.</p>
          </div>
          <div className="use rv">
            <svg className="ui" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--gold-soft)" />
              <path d="M16 32h24M20 24h16" stroke="#A87B2E" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <h3>Bridge loan between equity rounds</h3>
            <p>You hold a final term sheet and the round is about to close. Bridge the gap with debt instead of a dilutive bridge round.</p>
          </div>
          <div className="use rv">
            <svg className="ui" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--teal-soft)" />
              <path d="M28 16v24M20 24l8-8 8 8" stroke="#0C9E85" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>A festive rush</h3>
            <p>90 to 180 days of stock and spend, repaid on a short schedule instead of a term loan of 12+ months.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Alternatives() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow gold">// The alternatives</span>
          <h2>A bridge round is the most expensive way to buy time.</h2>
        </div>
        <div className="cmp rv">
          <div className="cmp-row h">
            <div />
            <div>Bridge round</div>
            <div>Rocket Fuel</div>
          </div>
          <div className="cmp-row">
            <div className="k">Ownership</div>
            <div data-l="Bridge round">Diluted, at your weakest moment</div>
            <div data-l="Rocket Fuel">Unchanged</div>
          </div>
          <div className="cmp-row">
            <div className="k">Time to cash</div>
            <div data-l="Bridge round">A full round process</div>
            <div data-l="Rocket Fuel">About 3 days to documents, about 2 days to money</div>
          </div>
          <div className="cmp-row">
            <div className="k">Duration</div>
            <div data-l="Bridge round">Permanent</div>
            <div data-l="Rocket Fuel">90 to 180 days, then it is gone</div>
          </div>
          <div className="cmp-row">
            <div className="k">Next round</div>
            <div data-l="Bridge round">Priced off the bridge</div>
            <div data-l="Rocket Fuel">Priced off your growth</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FitCheck() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="fitgrid">
          <div className="fitcol good rv">
            <h3>A strong Rocket Fuel case</h3>
            <div className="fi">
              <span className="m">✓</span>
              <span>VC-backed, with institutional investors on the cap table</span>
            </div>
            <div className="fi">
              <span className="m">✓</span>
              <span>Revenue you can verify in the bank and in GST</span>
            </div>
            <div className="fi">
              <span className="m">✓</span>
              <span>A specific plan: what you will spend on and what it returns</span>
            </div>
            <div className="fi">
              <span className="m">✓</span>
              <span>A repayment path inside 90 to 180 days</span>
            </div>
          </div>
          <div className="fitcol poor rv">
            <h3>Where we will say no</h3>
            <div className="fi">
              <span className="m">✕</span>
              <span>No institutional backing on the cap table</span>
            </div>
            <div className="fi">
              <span className="m">✕</span>
              <span>Funding losses with no route to repayment</span>
            </div>
            <div className="fi">
              <span className="m">✕</span>
              <span>Repayment that depends on a round you have no term sheet for yet</span>
            </div>
            <div className="fi">
              <span className="m">✕</span>
              <span>Revenue that does not reconcile across bank, GST and books</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap cta-in">
        <div className="rv">
          <h2>Have a growth plan waiting on cash?</h2>
          <p>Share your numbers and the plan. We will tell you honestly whether it fits.</p>
        </div>
        <Link href="/apply" className="btn btn-solid mag rv">
          START THE CONVERSATION
          {" "}
          <span className="a">→</span>
        </Link>
      </div>
    </section>
  );
}
