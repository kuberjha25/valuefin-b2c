import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';
import { Flywheel } from '@/components/quick-cash/Flywheel';

export const metadata: Metadata = pageMetadata('quick-cash');

export default function QuickCashPage() {
  return (
    <>
      <PageJsonLd page="quick-cash" />
      <PageHero />
      <Cycle />
      <Growth />
      <VsBanks />
      <TheRead />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow">// Product · Quick Cash</span>
        <h1>Turn what marketplaces owe you into what you can spend.</h1>
        <p className="plead">
          Short-tenor working capital against purchase orders, marketplace settlements and invoices from large buyers. Fund the order, ship it, and repay the day the money lands.
        </p>
        <div className="ptags">
          <span className="ptag hl">₹25L – ₹5Cr</span>
          {" "}
          <span className="ptag">30 – 120 days</span>
          {" "}
          <span className="ptag">Rotating facility</span>
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

function Cycle() {
  return (
    <section className="sec" id="cycle">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// The quick-commerce cycle</span>
          <h2>Speed of fulfilment decides who wins on a marketplace.</h2>
          <p>
            Blinkit, Zepto, Instamart, Amazon and FirstClub reward the sellers who deliver fast. Here is the loop every fast-growing brand ends up in, and where cash gets stuck.
          </p>
        </div>
        <Flywheel />
      </div>
    </section>
  );
}

function Growth() {
  return (
    <section className="sec alt" id="growth">
      <div className="wrap two-col">
        <div className="ladder-wrap rv">
          <div className="po-ladder">
            <div className="lad" style={{ '--h': "12%" } as CSSProperties}>
              <span className="lv">₹1Cr.</span>
              <div className="lb" />
            </div>
            <div className="lad" style={{ '--h': "35%" } as CSSProperties}>
              <span className="lv">₹2.5Cr.</span>
              <div className="lb" />
            </div>
            <div className="lad" style={{ '--h': "68%" } as CSSProperties}>
              <span className="lv">₹5Cr.</span>
              <div className="lb" />
            </div>
            <div className="lad" style={{ '--h': "100%" } as CSSProperties}>
              <span className="lv">₹10Cr.</span>
              <div className="lb" />
            </div>
          </div>
          <div className="lad-labels">
            <span>Today</span>
            <span>Cycle 1</span>
            <span>Cycle 2</span>
            <span>Cycle 3</span>
          </div>
          <p className="ladder-cap">// Illustrative example only. Purchase orders carried per cycle as fulfilment speeds up and the marketplace sends more.</p>
        </div>
        <div className="rv">
          <span className="eyebrow gold">// Rotation is the growth engine</span>
          <span className="illus">Illustrative example</span>
          <h2 style={{ margin: "14px 0 16px" }}>From ₹1Cr. of purchase orders to ₹10Cr. in a few cycles.</h2>
          <p className="sub">
            With the right working capital and debt structure, a brand can move from ₹1Cr. of purchase orders to ₹10Cr. in a few cycles. The marketplace sees orders filled quickly and completely, and sends bigger ones. Each cycle you repay, the capital goes straight back into the next.
          </p>
          <p className="sub" style={{ marginTop: "14px" }}>
            That only works when the debt is short. If you are locked into a long loan, each rotation of the same rupee earns you nothing extra.
          </p>
          <div className="caveat">
            <b>This is only an illustrative example.</b>
            {" "}
            It shows how faster rotation can scale purchase orders. Actual growth depends on your product, the marketplace, demand and repayment history, and is not a promise of results.
          </div>
        </div>
      </div>
    </section>
  );
}

function VsBanks() {
  return (
    <section className="sec" id="vs-banks">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// Why this beats a term loan</span>
          <h2>Built around the gap, not around a loan product.</h2>
        </div>
        <div className="cmp rv">
          <div className="cmp-row h">
            <div />
            <div>Typical bank or NBFC term loan</div>
            <div>Valuefin Quick Cash</div>
          </div>
          <div className="cmp-row">
            <div className="k">Tenor</div>
            <div data-l="Term loan">12+ months</div>
            <div data-l="Valuefin">30 to 120 days</div>
          </div>
          <div className="cmp-row">
            <div className="k">Matched to</div>
            <div data-l="Term loan">A schedule set at signing</div>
            <div data-l="Valuefin">Your actual cash cycle</div>
          </div>
          <div className="cmp-row">
            <div className="k">Interest runs for</div>
            <div data-l="Term loan">All 12+ months, even after the order is paid</div>
            <div data-l="Valuefin">Only the days it was in use</div>
          </div>
          <div className="cmp-row">
            <div className="k">Repayment</div>
            <div data-l="Term loan">Fixed instalments</div>
            <div data-l="Valuefin">When the receivable hits your bank, anywhere from day 30 to day 120</div>
          </div>
          <div className="cmp-row">
            <div className="k">Balance sheet</div>
            <div data-l="Term loan">Debt stays for the full term</div>
            <div data-l="Valuefin">Cleared quickly, then drawn again as needed</div>
          </div>
          <div className="cmp-row">
            <div className="k">Speed</div>
            <div data-l="Term loan">A long approval process</div>
            <div data-l="Valuefin">About 3 days to documents, about 2 days to money</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TheRead() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// The read</span>
          <h2>What we look for.</h2>
          <p>No scoring black box. Four things, honestly assessed.</p>
        </div>
        <div className="fitgrid">
          <div className="fitcol good rv">
            <h3>A strong Quick Cash case</h3>
            <div className="fi">
              <span className="m">✓</span>
              <span>A real purchase order, settlement or invoice from a credible marketplace or buyer</span>
            </div>
            <div className="fi">
              <span className="m">✓</span>
              <span>A clear cash event inside the tenor, so we can see what repays us</span>
            </div>
            <div className="fi">
              <span className="m">✓</span>
              <span>Clean banking and a GST trail that matches the sales story</span>
            </div>
            <div className="fi">
              <span className="m">✓</span>
              <span>Founders who pick up the phone and share numbers straight</span>
            </div>
          </div>
          <div className="fitcol poor rv">
            <h3>Where we will say no</h3>
            <div className="fi">
              <span className="m">✕</span>
              <span>No identifiable cash event. &quot;We&apos;ll repay from growth&quot; is not a source</span>
            </div>
            <div className="fi">
              <span className="m">✕</span>
              <span>Speculative stock with no buyer attached to it yet</span>
            </div>
            <div className="fi">
              <span className="m">✕</span>
              <span>Numbers that do not reconcile across bank, GST and books</span>
            </div>
            <div className="fi">
              <span className="m">✕</span>
              <span>Cases that need our money to survive, not to grow</span>
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
          <h2>Have an order waiting on working capital?</h2>
          <p>Tell us the order and the settlement day. You will get an honest read in days.</p>
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
