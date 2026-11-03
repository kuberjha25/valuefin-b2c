import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';
import { Count } from '@/components/home/Count';
import { FlowCanvas } from '@/components/home/FlowCanvas';
import { OwnershipCard } from '@/components/home/OwnershipCard';
import { Planner } from '@/components/home/Planner';
import { Quiz } from '@/components/home/Quiz';
import { Typed } from '@/components/home/Typed';

export const metadata: Metadata = pageMetadata('home');

export default function HomePage() {
  return (
    <>
      <PageJsonLd page="home" />
      <Hero />
      <Stats />
      <WhatWeFinance />
      <Tape />
      <FundingPlanner />
      <Questions />
      <ShortTenor />
      <Topups />
      <NonDilutive />
      <WhoWeFund />
      <ForFunds />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <FlowCanvas />
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-in">
          <span className="status">
            <span className="d" />
            {" "}
            OPEN MON TO SAT · RBI-REGISTERED NBFC
          </span>
          <h1>
            Grow the company{' '}
            <br />
            <span className="g">at your own terms.</span>
          </h1>
          <div className="typed-line">
            <span className="pr">&gt;&nbsp;</span>
            <Typed />
            <span className="caret" />
          </div>
          <p className="lead">
            Orders from Blinkit, Zepto, Amazon and large buyers are the best problem a founder can have, until the cash to fulfil them runs out. We finance that gap, from a
            {" "}
            <b>₹60L Blinkit order</b>
            {" "}
            to a
            {" "}
            <b>₹3Cr festive stock-up</b>
            , with
            {" "}
            <b>no dilution</b>
            {" "}
            and in about five days. We are not a marketplace. We are our own NBFC and we lend from our own balance sheet.
          </p>
          <div className="hero-cta">
            <Link href="#planner" className="btn btn-solid mag">
              PLAN YOUR FUNDING
              {" "}
              <span className="a">→</span>
            </Link>
            {" "}
            <Link href="/quick-cash" className="btn btn-line mag">HOW QUICK CASH WORKS</Link>
          </div>
          <div className="hero-pts">
            <span>No warrants</span>
            <span>No board seat</span>
            <span>Repay when the receivable lands</span>
            <span>Top-ups as you grow</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stat">
          <div className="n">
            ~
            <Count to={5} />
            <em>days</em>
          </div>
          <div className="l">First conversation to money*</div>
        </div>
        <div className="stat">
          <div className="n">
            <span className="zero">0</span>
          </div>
          <div className="l">NPAs since inception</div>
        </div>
        <div className="stat gold">
          <div className="n">
            0
            <em>%</em>
          </div>
          <div className="l">Equity taken. Ever.</div>
        </div>
        <div className="stat">
          <div className="n">
            30–120
            <em>days</em>
          </div>
          <div className="l">Tenor that matches your cash cycle</div>
        </div>
      </div>
    </section>
  );
}

function WhatWeFinance() {
  return (
    <section className="sec" id="finance">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// What we finance</span>
          <h2>The money you are owed, funded today.</h2>
          <p>If a marketplace or a large buyer owes you, or is about to place an order you cannot yet afford to fulfil, that is what we finance.</p>
        </div>
        <div className="fin-grid">
          <div className="fin-card rv">
            <svg className="ai" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--teal-soft)" />
              <path d="M16 38V24l12-8 12 8v14" stroke="#0C9E85" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M23 38V30h10v8" stroke="#0C9E85" strokeWidth="2.4" strokeLinejoin="round" />
            </svg>
            {" "}
            <span className="fi-k">01 · Settlements</span>
            <h3>Quick-commerce and e-commerce settlements</h3>
            <p>You have sold the stock and the marketplace owes you. We fund the receivable now, so you are not waiting 30 to 120 days to buy the next batch.</p>
            <div className="mk-chips">
              <span className="mk">Blinkit</span>
              <span className="mk">Zepto</span>
              <span className="mk">Instamart</span>
              <span className="mk">Amazon</span>
              <span className="mk">FirstClub</span>
              <span className="mk">and more</span>
            </div>
          </div>
          <div className="fin-card gold rv">
            <svg className="ai" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--gold-soft)" />
              <rect x="17" y="14" width="22" height="28" rx="3" stroke="#A87B2E" strokeWidth="2.4" />
              <path d="M22 22h12M22 28h12M22 34h7" stroke="#A87B2E" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            {" "}
            <span className="fi-k">02 · Purchase orders</span>
            <h3>Purchase orders you cannot yet fulfil</h3>
            <p>
              The purchase order is in hand, the supplier wants payment upfront and your bank balance is short. We fund the production or stock so the order ships on time and the next one follows.
            </p>
            <div className="mk-chips">
              <span className="mk">Marketplace purchase orders</span>
              <span className="mk">Retail chains</span>
              <span className="mk">Institutional buyers</span>
            </div>
          </div>
          <div className="fin-card rv">
            <svg className="ai" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--teal-soft)" />
              <rect x="15" y="17" width="26" height="22" rx="3" stroke="#0C9E85" strokeWidth="2.4" />
              <path d="M15 24h26M21 31h6" stroke="#0C9E85" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            {" "}
            <span className="fi-k">03 · Invoices</span>
            <h3>Invoices from large and listed buyers</h3>
            <p>Your customer is strong and pays on terms, but your cash is locked in the invoice. We advance against it and you repay when they pay.</p>
            <div className="mk-chips">
              <span className="mk">Listed companies</span>
              <span className="mk">Large corporates</span>
              <span className="mk">Brands and retailers</span>
            </div>
          </div>
        </div>
        <div className="fin-note rv">
          <span className="fn-ic">→</span>
          <span>
            Not funding one specific order?
            {" "}
            <b>Rocket Fuel</b>
            {" "}
            is a short loan for VC-backed companies to buy stock, run marketing or open a new city, repaid in 90 to 180 days.
            {" "}
            <Link href="/rocket-fuel" style={{ color: "var(--teal)", fontWeight: "700" }}>See Rocket Fuel</Link>
          </span>
        </div>
      </div>
    </section>
  );
}

function Tape() {
  return (
    <div className="tape" aria-label="Sectors we fund and the structures we build">
      <span className="tape-label">Sectors · structures</span>
      <div className="tape-track">
        <span className="tk">
          <b>FMCG and food brands</b>
          <i>Purchase order financing for quick-commerce orders</i>
          <u>45 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>D2C consumer brands</b>
          <i>Marketplace settlement advance</i>
          <u>30 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Electronics and accessories</b>
          <i>Festive-season stock-up, short tenor</i>
          <u>60 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Manufacturers</b>
          <i>Raw material finance against large-buyer purchase orders</i>
          <u>60 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Apparel and fashion</b>
          <i>Season-start inventory, Rocket Fuel</i>
          <u>90 to 180 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Packaging and industrial</b>
          <i>Invoice advance on listed-company buyers</i>
          <u>30 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>EV and components</b>
          <i>Staged purchase order tranches, one per production lot</i>
          <u>60 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>VC-backed consumer startups</b>
          <i>Rocket Fuel growth capital between rounds</i>
          <u>90 to 180 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>VC-backed, term sheet in hand</b>
          <i>Rocket Fuel bridge loan between equity rounds</i>
          <u>90 to 180 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>FMCG and food brands</b>
          <i>Purchase order financing for quick-commerce orders</i>
          <u>45 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>D2C consumer brands</b>
          <i>Marketplace settlement advance</i>
          <u>30 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Electronics and accessories</b>
          <i>Festive-season stock-up, short tenor</i>
          <u>60 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Manufacturers</b>
          <i>Raw material finance against large-buyer purchase orders</i>
          <u>60 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Apparel and fashion</b>
          <i>Season-start inventory, Rocket Fuel</i>
          <u>90 to 180 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>Packaging and industrial</b>
          <i>Invoice advance on listed-company buyers</i>
          <u>30 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>EV and components</b>
          <i>Staged purchase order tranches, one per production lot</i>
          <u>60 to 120 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>VC-backed consumer startups</b>
          <i>Rocket Fuel growth capital between rounds</i>
          <u>90 to 180 days</u>
          <span className="sep">/</span>
        </span>
        {" "}
        <span className="tk">
          <b>VC-backed, term sheet in hand</b>
          <i>Rocket Fuel bridge loan between equity rounds</i>
          <u>90 to 180 days</u>
          <span className="sep">/</span>
        </span>
      </div>
    </div>
  );
}

function FundingPlanner() {
  return (
    <section className="sec alt" id="planner-sec">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// Funding planner</span>
          <h2>Order bigger than your bank balance? See your options.</h2>
          <p>
            Put in what you need and what you have. The planner shows the gap, what each way of closing it costs you in ownership and in interest, and a dated timeline from first conversation to money.
          </p>
        </div>
        <Planner />
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="sec" id="questions">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// Does this sound like you?</span>
          <h2>Demand is not the problem. Cash is.</h2>
          <p>Tick whatever sounds familiar.</p>
        </div>
        <Quiz />
      </div>
    </section>
  );
}

function ShortTenor() {
  return (
    <section className="sec alt" id="tenor">
      <div className="wrap two-col">
        <div className="rv">
          <span className="eyebrow">// Why short tenor</span>
          <h2 style={{ margin: "14px 0 16px" }}>Borrow for the days you need. Not for 12+ months.</h2>
          <p className="sub">
            Your gap is 30 to 120 days, between paying a supplier and getting paid by the marketplace. A bank gives you a term loan of 12 months or more. You pay interest on all the days you did not need the money, and the debt stays on your balance sheet long after the order has cleared.
          </p>
          <div className="tick-list">
            <div className="tick">
              <span className="tm">▸</span>
              <div>
                <b>Tenor of 30 to 120 days</b>
                <span>Matched to the gap. When the receivable lands, you repay.</span>
              </div>
            </div>
            <div className="tick">
              <span className="tm">▸</span>
              <div>
                <b>A cleaner balance sheet</b>
                <span>Pay it off quickly and the debt is gone before your next conversation with a bank or an investor.</span>
              </div>
            </div>
            <div className="tick">
              <span className="tm">▸</span>
              <div>
                <b>Repay on the day that suits the cash</b>
                <span>Day 45, 60, 90 or 120. Whenever the money hits your account.</span>
              </div>
            </div>
          </div>
          <Link href="#planner" className="btn btn-line mag" style={{ marginTop: "26px" }}>
            SEE THE INTEREST DIFFERENCE
            {" "}
            <span className="a">→</span>
          </Link>
        </div>
        <div className="mb rv">
          <div className="mb-row need">
            <div className="mb-l">
              <span>The days you actually need the money</span>
              <em>60 days</em>
            </div>
            <div className="mb-bar">
              <i className="on" />
              <i className="on" />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="mb-row bank">
            <div className="mb-l">
              <span>A term loan, interest all the way</span>
              <em>12+ months</em>
            </div>
            <div className="mb-bar">
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
              <i className="on" />
            </div>
          </div>
          <div className="mb-row vf">
            <div className="mb-l">
              <span>Valuefin, repaid when your receivable lands</span>
              <em>60 days</em>
            </div>
            <div className="mb-bar">
              <i className="on" />
              <i className="on" />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="mb-scale">
            <span>Day 0</span>
            <span>Day 180</span>
            <span>Day 365+</span>
          </div>
          <p className="split-note">Each block is 30 days. The term loan bar keeps going beyond the edge.</p>
        </div>
      </div>
    </section>
  );
}

function Topups() {
  return (
    <section className="sec" id="topups">
      <div className="wrap two-col">
        <div className="rv">
          <span className="eyebrow gold">// Top-ups</span>
          <h2 style={{ margin: "14px 0 16px" }}>We grow alongside you.</h2>
          <p className="sub">Your first facility is a starting point. As your business grows, what we can fund grows with it.</p>
          <div className="uselist">
            <span>A new geography</span>
            <span>Bulk inventory at a better price</span>
            <span>A new product line</span>
            <span>A festive rush</span>
          </div>
          <h3 className="sub-h">How top-ups work</h3>
          <div className="tick-list" style={{ marginTop: "14px" }}>
            <div className="tick">
              <span className="tm">01</span>
              <div>
                <b>Draw and repay</b>
                <span>Use your first facility and repay when the receivable lands.</span>
              </div>
            </div>
            <div className="tick">
              <span className="tm">02</span>
              <div>
                <b>Complete at least 2 rotations</b>
                <span>Two full cycles, each drawn and repaid on time. That is the track record we need to see before a top-up.</span>
              </div>
            </div>
            <div className="tick">
              <span className="tm">03</span>
              <div>
                <b>Ask for a top-up</b>
                <span>A higher limit for the next stage of growth, with the same short tenor.</span>
              </div>
            </div>
          </div>
          <p className="sub" style={{ marginTop: "22px" }}>
            Festive sales like Flipkart Big Billion Days or the Amazon festival need 90 to 120 days of stock. A bank will offer a term loan of 12+ months for that. We give a short tenor matched to your cash cycle, and you repay the day the cash lands.
          </p>
        </div>
        <div className="ladder-wrap rv">
          <div className="ladder">
            <div className="lad" style={{ '--h': "22%" } as CSSProperties}>
              <span className="lv">₹50L</span>
              <div className="lb" />
            </div>
            <div className="lad" style={{ '--h': "22%" } as CSSProperties}>
              <span className="lv">₹50L</span>
              <div className="lb" />
            </div>
            <div className="lad" style={{ '--h': "48%" } as CSSProperties}>
              <span className="lv">₹1Cr</span>
              <div className="lb" />
            </div>
            <div className="lad" style={{ '--h': "100%" } as CSSProperties}>
              <span className="lv">₹2.5Cr</span>
              <div className="lb" />
            </div>
          </div>
          <div className="lad-labels">
            <span>Rotation 1</span>
            <span>Rotation 2</span>
            <span>Top-up</span>
            <span>Top-up</span>
          </div>
          <p className="ladder-cap">
            // Illustrative example only. A top-up needs at least 2 completed rotations, and the limit depends on repayment history and business performance.
          </p>
        </div>
      </div>
    </section>
  );
}

function NonDilutive() {
  return (
    <section className="sec nd" id="non-dilutive">
      <div className="wrap">
        <div className="nd-grid">
          <div className="nd-copy rv">
            <span className="eyebrow">// Why non-dilutive</span>
            <h2>
              Equity is the most
              {" "}
              <em>expensive</em>
              {" "}
              money you&apos;ll ever raise.
            </h2>
            <p className="nd-lead">
              A round dilutes you once, and forever. Working capital is borrowed, used and repaid, and your cap table never moves. When it funds revenue growing faster than its cost, that upside still belongs to you and your existing investors.
            </p>
            <div className="pts">
              <div className="nd-pt">
                <span className="pm">▸</span>
                <div>
                  <b>Your slice stays whole</b>
                  <span>Fund the next phase without handing out a single share.</span>
                </div>
              </div>
              <div className="nd-pt">
                <span className="pm">▸</span>
                <div>
                  <b>Move at the speed of the order</b>
                  <span>A decision in days beats a long funding round.</span>
                </div>
              </div>
              <div className="nd-pt">
                <span className="pm">▸</span>
                <div>
                  <b>A lender, not a landlord on your board</b>
                  <span>We finance the business. We do not take a seat at the table.</span>
                </div>
              </div>
            </div>
            <Link href="/why-valuefin" className="btn btn-solid mag">
              WHY VALUEFIN
              {" "}
              <span className="a">→</span>
            </Link>
          </div>
          <OwnershipCard />
        </div>
      </div>
    </section>
  );
}

function WhoWeFund() {
  return (
    <section className="sec" id="audience">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">// Who we fund</span>
          <h2>Built for businesses with momentum.</h2>
          <p>From your first big listing to your tenth warehouse, the structure scales with you.</p>
        </div>
        <div className="aud-grid">
          <div className="aud rv">
            <svg className="ai" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--teal-soft)" />
              <path d="M18 34l7-7 5 5 10-11" stroke="#0C9E85" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M34 21h6v6" stroke="#0C9E85" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>Early-stage brands</h3>
            <p>You just got listed on a marketplace or won your first big order. Fulfilment speed decides whether the next order comes.</p>
          </div>
          <div className="aud rv">
            <svg className="ai" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--gold-soft)" />
              <rect x="17" y="24" width="22" height="15" rx="2" stroke="#A87B2E" strokeWidth="2.4" />
              <path d="M22 24v-3a6 6 0 0 1 12 0v3" stroke="#A87B2E" strokeWidth="2.4" />
            </svg>
            <h3>Growth-stage companies</h3>
            <p>Many marketplaces, many cities, bigger purchase orders. You need a partner that raises the ceiling as you scale.</p>
          </div>
          <div className="aud rv">
            <svg className="ai" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="44" height="44" rx="12" fill="var(--teal-soft)" />
              <path d="M15 39V25l8 5v-5l8 5v-5l8 5v9z" stroke="#0C9E85" strokeWidth="2.4" strokeLinejoin="round" />
            </svg>
            <h3>Manufacturers and suppliers</h3>
            <p>Demand is there, supply is not keeping up. Raw material and production need cash before the buyer pays.</p>
          </div>
        </div>
        <div className="pillars-more rv">
          <Link href="/who-we-fund" className="btn btn-line mag">
            SEE REAL-WORLD CASES
            {" "}
            <span className="a">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ForFunds() {
  return (
    <section className="cta-band">
      <div className="wrap cta-in">
        <div className="rv">
          <span className="eyebrow" style={{ color: "var(--teal-b)" }}>// For the funds on the cap table</span>
          <h2 style={{ marginTop: "12px" }}>Bridge loans between rounds, without diluting your portfolio.</h2>
          <p>Zero warrants, zero equity kickers, clean documentation. Route a portfolio company to us.</p>
        </div>
        <Link href="/for-vcs" className="btn btn-solid mag rv">
          HOW IT WORKS FOR VCS
          {" "}
          <span className="a">→</span>
        </Link>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="sec">
      <div className="wrap cta-in">
        <div className="rv">
          <h2>Tell us what you are funding.</h2>
          <p className="sub" style={{ marginTop: "10px" }}>An honest read in days, whether it is a fit or not.</p>
        </div>
        <Link href="/apply" className="btn btn-ink mag rv">
          START THE CONVERSATION
          {" "}
          <span className="a">→</span>
        </Link>
      </div>
    </section>
  );
}
