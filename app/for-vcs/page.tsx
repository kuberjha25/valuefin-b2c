import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('for-vcs');

export default function ForVcsPage() {
  return (
    <>
      <PageJsonLd page="for-vcs" />
      <PageHero />
      <WhyFundsRoute />
      <HowReferralWorks />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow gold">// For the funds on the cap table</span>
        <h1>Portfolio working capital, without touching your ownership.</h1>
        <p className="plead">
          Your portfolio&apos;s growth should not wait for the next round or cost you ownership to bridge. Route a company to Valuefin and get a fast, honest read.
        </p>
        <Link href="/partner" className="btn btn-solid mag">
          PARTNER WITH VALUEFIN
          {" "}
          <span className="a">→</span>
        </Link>
      </div>
    </header>
  );
}

function WhyFundsRoute() {
  return (
    <section className="sec">
      <div className="wrap paper-grid">
        <div className="rv">
          <span className="eyebrow gold">// Why funds route companies here</span>
          <h2 style={{ margin: "14px 0 8px" }}>Aligned by design.</h2>
          <div className="plist">
            <div className="pli">
              <span className="pm">▸</span>
              <div>
                <b>Orders get fulfilled, so the next round prices growth</b>
                <span>Short-tenor capital keeps marketplace purchase orders flowing and metrics visible to the next lead.</span>
              </div>
            </div>
            <div className="pli">
              <span className="pm">▸</span>
              <div>
                <b>We underwrite the cash event, openly</b>
                <span>You will know what we lend against and what repays us.</span>
              </div>
            </div>
            <div className="pli">
              <span className="pm">▸</span>
              <div>
                <b>Clean paper, no surprises for the next lead</b>
                <span>Straightforward documentation, repaid quickly, so the balance sheet is clear before the next round.</span>
              </div>
            </div>
            <div className="pli">
              <span className="pm">▸</span>
              <div>
                <b>Zero upside taken from your winners</b>
                <span>No warrants, no equity kickers, no conversion rights.</span>
              </div>
            </div>
            <div className="pli">
              <span className="pm">▸</span>
              <div>
                <b>A bridge between rounds, with a term sheet in hand</b>
                <span>Once a portfolio company holds a final term sheet, Rocket Fuel covers the days until the round closes, without a dilutive bridge round.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="terms rv">
          <div className="thead">
            <span>Indicative terms</span>
            <span>VALUEFIN</span>
          </div>
          <div className="trow">
            <span className="k">Instrument</span>
            <span className="v">Working-capital debt</span>
          </div>
          <div className="trow">
            <span className="k">Cap table impact</span>
            <span className="v hl">0.00%</span>
          </div>
          <div className="trow">
            <span className="k">Warrants / kickers</span>
            <span className="v hl">None</span>
          </div>
          <div className="trow">
            <span className="k">Board seats</span>
            <span className="v hl">0</span>
          </div>
          <div className="trow">
            <span className="k">Ticket</span>
            <span className="v">₹25L – ₹5Cr</span>
          </div>
          <div className="trow">
            <span className="k">Tenor</span>
            <span className="v">30 – 180 days</span>
          </div>
          <div className="trow">
            <span className="k">Information rights</span>
            <span className="v">A monthly MIS, not a monthly meeting</span>
          </div>
          <div className="trow">
            <span className="k">Speed</span>
            <span className="v">Docs in ~3 days · money ~2 days later</span>
          </div>
          <span className="tstamp">Zero warrants attached</span>
        </div>
      </div>
    </section>
  );
}

function HowReferralWorks() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow gold">// How a referral works</span>
          <h2>Three steps, minimal ceremony.</h2>
        </div>
        <div className="ministeps">
          <div className="mstep rv">
            <span className="mi">01</span>
            <h3>Send the intro</h3>
            <p>One email connecting the founder to us. Context helps. A deck is optional.</p>
          </div>
          <div className="mstep rv">
            <span className="mi">02</span>
            <h3>We read fast</h3>
            <p>A call with the founder, a look at the numbers, and a clear answer in days with our reasoning.</p>
          </div>
          <div className="mstep rv">
            <span className="mi">03</span>
            <h3>You stay in the loop</h3>
            <p>If we fund, you will know the structure. If anything wobbles mid-facility, you hear it early.</p>
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
          <h2>Have a portfolio company in mind?</h2>
          <p>One intro. An honest read. Zero dilution.</p>
        </div>
        <Link href="/partner" className="btn btn-solid mag rv">
          PARTNER WITH VALUEFIN
          {" "}
          <span className="a">→</span>
        </Link>
      </div>
    </section>
  );
}
