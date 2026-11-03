import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('how-it-works');

export default function HowItWorksPage() {
  return (
    <>
      <PageJsonLd page="how-it-works" />
      <PageHero />
      <Steps />
      <ComePrepared />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow">// The process</span>
        <h1>From first conversation to funded, in about five days.</h1>
        <p className="plead">
          No portal purgatory, no 40-page application, no mystery scoring. About three days to complete documentation, then about two days to money in your account. Here is exactly what happens.
        </p>
      </div>
    </header>
  );
}

function Steps() {
  return (
    <section className="sec">
      <h2 className="sr-only">The four steps</h2>
      <div className="wrap">
        <div className="vstep rv">
          <div>
            <div className="vidx">01</div>
            <span className="vtime">Day 0 · about 15 minutes</span>
          </div>
          <div>
            <h3>The first conversation</h3>
            <p>
              A short form and your recent numbers, then a call. Tell us what you are funding, how much, and what pays it back. If you have the purchase order, settlement report or invoice, attach it. If not, we will ask on the call.
            </p>
          </div>
        </div>
        <div className="vstep rv">
          <div>
            <div className="vidx">02</div>
            <span className="vtime">About 3 days</span>
          </div>
          <div>
            <h3>The read and the documents</h3>
            <p>
              A decision-maker reads the business, cross-checks the numbers and underwrites the specific cash event that repays the facility. Documentation is completed in about three days from the first conversation, faster when your documents arrive quickly.
            </p>
          </div>
        </div>
        <div className="vstep rv">
          <div>
            <div className="vidx">03</div>
            <span className="vtime">About 2 days after documents</span>
          </div>
          <div>
            <h3>The wire</h3>
            <p>
              Once documentation is complete, money typically lands in your account about two days later. Terms are agreed on the call and put on paper exactly as discussed.
            </p>
          </div>
        </div>
        <div className="vstep rv">
          <div>
            <div className="vidx">04</div>
            <span className="vtime">Day 30 to 120 · Repeat ↻</span>
          </div>
          <div>
            <h3>Repay when the cash lands</h3>
            <p>
              The settlement or invoice payment arrives, you repay, and the facility is free again. Every clean cycle builds the relationship, and relationships are how limits grow. Need more later? Ask for a top-up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComePrepared() {
  return (
    <section className="sec alt">
      <div className="wrap paper-grid">
        <div className="rv">
          <span className="eyebrow">// Come prepared</span>
          <h2 style={{ margin: "14px 0 16px" }}>What speeds things up.</h2>
          <p className="sub">
            None of this is needed to start the conversation. But the faster we can see the business, the faster the three days go. Founders who send these upfront are routinely read faster.
          </p>
          <Link href="/apply" className="btn btn-ink mag" style={{ marginTop: "26px" }}>
            START THE CONVERSATION
            {" "}
            <span className="a">→</span>
          </Link>
        </div>
        <div className="check-card rv">
          <h3>The reading list</h3>
          <div className="chk">
            <span className="cm">▸</span>
            <div>
              Last 12 months&apos; bank statements
              <small>All operating accounts. This is where the truth lives</small>
            </div>
          </div>
          <div className="chk">
            <span className="cm">▸</span>
            <div>
              GST returns
              <small>They should tell the same story your sales do</small>
            </div>
          </div>
          <div className="chk">
            <span className="cm">▸</span>
            <div>
              Latest financials or MIS
              <small>Provisional is fine. We would rather see current than audited and stale</small>
            </div>
          </div>
          <div className="chk">
            <span className="cm">▸</span>
            <div>
              The purchase order, settlement report or invoice
              <small>The thing we are funding, in writing</small>
            </div>
          </div>
          <div className="chk">
            <span className="cm">▸</span>
            <div>
              Cap table (Rocket Fuel)
              <small>Which funds have backed you</small>
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
          <h2>Four steps. About five days.</h2>
          <p>The first one takes fifteen minutes.</p>
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
