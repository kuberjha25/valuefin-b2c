import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('who-we-fund');

export default function WhoWeFundPage() {
  return (
    <>
      <PageJsonLd page="who-we-fund" />
      <PageHero />
      <CaseShapes />
      <CommonThread />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow">// Who we fund</span>
        <h1>Real shapes of the facilities we build.</h1>
        <p className="plead">
          From a first marketplace listing to a growth-stage rollout. The situation, the structure and the outcome, with names removed and mechanics intact.
        </p>
      </div>
    </header>
  );
}

function CaseShapes() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="notice rv">
          // ILLUSTRATIVE. These are representative case shapes, not specific transactions. Figures are rounded bands and sectors are generalised to protect borrower confidentiality.
        </div>
        <div className="dbook">
          <div className="dcase rv">
            <div className="dcase-n">
              <span className="num">01</span>
              {" "}
              <svg className="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 7h13l4 4v6H3z" stroke="#1BD9B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="dcase-body">
              <div className="dcase-top">
                <span className="dchip prod">Quick Cash</span>
                {" "}
                <span className="dchip">Purchase order financing</span>
                {" "}
                <span className="dchip">₹50L band</span>
                {" "}
                <span className="dchip">60-day cycles</span>
                {" "}
                <span className="dchip st">Repaid ✓</span>
              </div>
              <div className="dcase-flow">
                <div className="dcol">
                  <b>The situation</b>
                  <p>
                    A packaged-food brand won its first large quick-commerce purchase orders. Its manufacturer wanted payment upfront, the marketplace pays 60 days later, and the brand had cash for only half the order.
                  </p>
                </div>
                <div className="dcol">
                  <b>The structure</b>
                  <p>A purchase order facility drawn per production lot, with the marketplace settlement routed to a designated account so each draw repaid itself.</p>
                </div>
                <div className="dcol">
                  <b>The outcome</b>
                  <p>The order shipped in full. Faster fulfilment brought larger purchase orders, and the facility was drawn again for each cycle.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dcase rv">
            <div className="dcase-n">
              <span className="num">02</span>
              {" "}
              <svg className="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 5h16v14H4zM4 9h16" stroke="#1BD9B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="dcase-body">
              <div className="dcase-top">
                <span className="dchip prod">Quick Cash</span>
                {" "}
                <span className="dchip">Settlement advance</span>
                {" "}
                <span className="dchip">₹30–40L band</span>
                {" "}
                <span className="dchip">45-day tenor</span>
                {" "}
                <span className="dchip st">Repaid ✓</span>
              </div>
              <div className="dcase-flow">
                <div className="dcol">
                  <b>The situation</b>
                  <p>A D2C personal-care brand sold well on several marketplaces, but settlements landed 45 days later while its own suppliers were paid in 15.</p>
                </div>
                <div className="dcol">
                  <b>The structure</b>
                  <p>An advance against marketplace settlements already due, repaid the day each one hit the bank.</p>
                </div>
                <div className="dcol">
                  <b>The outcome</b>
                  <p>The brand stopped skipping reorders. The facility rotated every cycle with no equity involved.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dcase rv">
            <div className="dcase-n">
              <span className="num">03</span>
              {" "}
              <svg className="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5" stroke="#1BD9B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="dcase-body">
              <div className="dcase-top">
                <span className="dchip prod">Quick Cash</span>
                {" "}
                <span className="dchip">Raw-material finance</span>
                {" "}
                <span className="dchip">₹1Cr band</span>
                {" "}
                <span className="dchip">90-day cycles</span>
                {" "}
                <span className="dchip st">Multi-cycle ✓</span>
              </div>
              <div className="dcase-flow">
                <div className="dcol">
                  <b>The situation</b>
                  <p>
                    An equipment manufacturer with a large institutional order book could not buy components fast enough. Demand was there, supply was not keeping up.
                  </p>
                </div>
                <div className="dcol">
                  <b>The structure</b>
                  <p>Staged tranches, one per production lot, with buyer payments routed through a collection account to clear each draw.</p>
                </div>
                <div className="dcol">
                  <b>The outcome</b>
                  <p>Several lots delivered on time. The limit grew as the repayment record did.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dcase rv">
            <div className="dcase-n">
              <span className="num">04</span>
              {" "}
              <svg className="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v18M3 12h18" stroke="#1BD9B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="dcase-body">
              <div className="dcase-top">
                <span className="dchip prod">Quick Cash</span>
                {" "}
                <span className="dchip">Festive-season stock-up</span>
                {" "}
                <span className="dchip">₹75L band</span>
                {" "}
                <span className="dchip">Short tenor</span>
                {" "}
                <span className="dchip st">Repaid ✓</span>
              </div>
              <div className="dcase-flow">
                <div className="dcol">
                  <b>The situation</b>
                  <p>
                    An electronics-accessories brand needed 90 days of stock ahead of a major festive sale. The bank offered a term loan of 12+ months that did not fit the need.
                  </p>
                </div>
                <div className="dcol">
                  <b>The structure</b>
                  <p>A short-tenor stock facility matched to the sale window, with repayment on the day sales settled.</p>
                </div>
                <div className="dcol">
                  <b>The outcome</b>
                  <p>Stock was in place before the rush, the facility closed within 90 days, and the balance sheet was clear before the new year.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dcase rv">
            <div className="dcase-n">
              <span className="num">05</span>
              {" "}
              <svg className="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 6h14v12H5zM9 10h6M9 14h4" stroke="#1BD9B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="dcase-body">
              <div className="dcase-top">
                <span className="dchip prod">Quick Cash</span>
                {" "}
                <span className="dchip">Invoice advance</span>
                {" "}
                <span className="dchip">₹40–60L band</span>
                {" "}
                <span className="dchip">60-day tenor</span>
                {" "}
                <span className="dchip st">Repaid ✓</span>
              </div>
              <div className="dcase-flow">
                <div className="dcol">
                  <b>The situation</b>
                  <p>A packaging supplier&apos;s cash was locked in 60-day invoices from listed customers while its own suppliers wanted paying upfront.</p>
                </div>
                <div className="dcol">
                  <b>The structure</b>
                  <p>A facility against specific invoices, repaid directly as those customers settled.</p>
                </div>
                <div className="dcol">
                  <b>The outcome</b>
                  <p>The squeeze disappeared without a single new share issued, and the relationship rotated into later cycles.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dcase rv">
            <div className="dcase-n gold">
              <span className="num">06</span>
              {" "}
              <svg className="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3c4 3 5 7 5 10a5 5 0 0 1-10 0c0-3 1-7 5-10z" stroke="#E9BB60" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="dcase-body">
              <div className="dcase-top">
                <span className="dchip prod gold">Rocket Fuel</span>
                {" "}
                <span className="dchip">Growth capital</span>
                {" "}
                <span className="dchip">₹75L band</span>
                {" "}
                <span className="dchip">180-day term</span>
                {" "}
                <span className="dchip st lv">Active ●</span>
              </div>
              <div className="dcase-flow">
                <div className="dcol gold">
                  <b>The situation</b>
                  <p>
                    A VC-backed consumer brand with strong verified revenue wanted to open two new cities and build inventory before peak season, ahead of its next raise.
                  </p>
                </div>
                <div className="dcol gold">
                  <b>The structure</b>
                  <p>Term growth capital over 180 days, sized off verified revenue, with the repayment path agreed upfront.</p>
                </div>
                <div className="dcol gold">
                  <b>The outcome</b>
                  <p>Cities opened on schedule, the season was funded, and the cap table was untouched heading into the next round.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dcase rv">
            <div className="dcase-n gold">
              <span className="num">07</span>
              {" "}
              <svg className="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 16h16M4 16l4-4m-4 4l4 4M20 8H4m16 0l-4-4m4 4l-4 4" stroke="#E9BB60" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="dcase-body">
              <div className="dcase-top">
                <span className="dchip prod gold">Rocket Fuel</span>
                {" "}
                <span className="dchip">Bridge loan</span>
                {" "}
                <span className="dchip">₹2Cr band</span>
                {" "}
                <span className="dchip">90-day term</span>
                {" "}
                <span className="dchip st">Repaid ✓</span>
              </div>
              <div className="dcase-flow">
                <div className="dcol gold">
                  <b>The situation</b>
                  <p>A VC-backed consumer startup held a final term sheet, but the round would take some days to close and a large inventory order could not wait.</p>
                </div>
                <div className="dcol gold">
                  <b>The structure</b>
                  <p>A bridge loan for the days between the term sheet and the funds landing, with repayment from the round proceeds agreed upfront.</p>
                </div>
                <div className="dcol gold">
                  <b>The outcome</b>
                  <p>The order was placed on time and the loan was repaid when the round closed, with no extra dilution from a bridge round.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommonThread() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// The common thread</span>
          <h2>Built for businesses with momentum.</h2>
          <p>Different sectors, one pattern: real revenue, a clear cash event, and a founder who would rather borrow than dilute.</p>
        </div>
        <div className="sector-chips rv">
          <span className="mk">FMCG and food</span>
          <span className="mk">D2C consumer</span>
          <span className="mk">Electronics and accessories</span>
          <span className="mk">Apparel and fashion</span>
          <span className="mk">Manufacturing</span>
          <span className="mk">Packaging and industrial</span>
          <span className="mk">EV and components</span>
          <span className="mk">Consumer tech</span>
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
          <h2>Yours could be the next shape.</h2>
          <p>Every facility here started with one short conversation.</p>
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
