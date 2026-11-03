import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('why-valuefin');

export default function WhyValuefinPage() {
  return (
    <>
      <PageJsonLd page="why-valuefin" />
      <PageHero />
      <OwnBalanceSheet />
      <Humans />
      <Speed />
      <Ownership />
      <ShortTenor />
      <Discipline />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow">// Why Valuefin</span>
        <h1>Built for the way new-age companies actually grow.</h1>
        <p className="plead">
          No algorithm deciding your fate and no one passing you along. Six things that make borrowing here different, each worth a minute of your time.
        </p>
      </div>
    </header>
  );
}

function OwnBalanceSheet() {
  return (
    <section className="band">
      <div className="wrap band-in">
        <div className="band-copy rv">
          <span className="eyebrow">// Our own money</span>
          <h2>We are an NBFC, and we lend from our own balance sheet.</h2>
          <p>
            Many lenders you meet online are marketplaces. They collect your file and shop it to capital providers you will never meet. Valuefin is the capital provider. Our money sits next to your business, and our decision is the only one that matters.
          </p>
          <p>It keeps incentives clean: we only win when you repay, not when you sign.</p>
        </div>
        <div className="band-vis rv">
          <div className="bigstat">
            100
            <em>% OWN BOOK</em>
          </div>
        </div>
      </div>
    </section>
  );
}

function Humans() {
  return (
    <section className="band alt flip">
      <div className="wrap band-in">
        <div className="band-copy rv">
          <span className="eyebrow">// Humans</span>
          <h2>A decision-maker picks up.</h2>
          <p>
            Your file is not scored by a model and queued for a committee you will never see. It is read by the people who decide, and when you call with a question mid-facility, one of them answers.
          </p>
          <p>The underwriter, the relationship and the decision sit in the same chair.</p>
        </div>
        <div className="band-vis rv">
          <div className="vis-card">
            <div className="vh">
              <span>Who handles your file</span>
              <span>VALUEFIN</span>
            </div>
            <div className="vrow">
              <span className="k">Reads the numbers</span>
              <span className="v hl">The decision-maker</span>
            </div>
            <div className="vrow">
              <span className="k">Makes the call</span>
              <span className="v hl">The decision-maker</span>
            </div>
            <div className="vrow">
              <span className="k">Answers your phone call</span>
              <span className="v hl">The decision-maker</span>
            </div>
            <div className="vrow">
              <span className="k">Bots involved</span>
              <span className="v">0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Speed() {
  return (
    <section className="band">
      <div className="wrap band-in">
        <div className="band-copy rv">
          <span className="eyebrow">// Speed</span>
          <h2>About three days to documents. About two more to money.</h2>
          <p>
            An order does not wait for a credit committee. Because the readers are the deciders, we move at the pace of your order book: documentation in about three days, and money about two days after that.
          </p>
          <p>Speed is not a promise on a banner. It follows from how we are built.</p>
        </div>
        <div className="band-vis rv">
          <div className="arcbox">
            <svg width="190" height="190" viewBox="0 0 190 190" fill="none" aria-hidden="true">
              {" "}
              <circle cx="95" cy="95" r="75" stroke="rgba(15,36,52,.1)" strokeWidth="12" />
              {" "}
              <circle className="arc-fill" cx="95" cy="95" r="75" stroke="#0C9E85" strokeWidth="12" strokeLinecap="round" />
              {" "}
            </svg>
            <div className="av">
              <b>~5 days</b>
              <span>CALL → MONEY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ownership() {
  return (
    <section className="band alt flip">
      <div className="wrap band-in">
        <div className="band-copy rv">
          <span className="eyebrow">// Ownership</span>
          <h2>Your slice stays whole.</h2>
          <p>
            Equity is the most expensive money you will ever raise. A round dilutes you once, and forever. Debt is borrowed, used and returned. Fund the same growth with the same upside and keep what you built.
          </p>
          <p>No equity, no warrants, no board seats, no information rights beyond a monthly MIS.</p>
        </div>
        <div className="band-vis rv">
          <div className="dbars">
            <div className="drow eq">
              <div className="dl">
                <span>Your stake after an equity round</span>
                <em>−22%</em>
              </div>
              <div className="dbar">
                <i />
              </div>
            </div>
            <div className="drow vf">
              <div className="dl">
                <span>Your stake after Valuefin</span>
                <em>−0%</em>
              </div>
              <div className="dbar">
                <i />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShortTenor() {
  return (
    <section className="band">
      <div className="wrap band-in">
        <div className="band-copy rv">
          <span className="eyebrow">// Short tenor</span>
          <h2>Debt that is the size of the gap.</h2>
          <p>
            Your gap between paying suppliers and getting paid is 30 to 120 days. We structure for exactly that: 30 to 120 days, repaid the day the money lands. No interest for the days you never needed, and a cleaner balance sheet once it is cleared.
          </p>
          <p>As you grow, we can top up your facility after at least 2 completed rotations.</p>
        </div>
        <div className="band-vis rv">
          <div className="bigstat">
            30–120
            <em>DAYS</em>
          </div>
        </div>
      </div>
    </section>
  );
}

function Discipline() {
  return (
    <section className="band alt flip">
      <div className="wrap band-in">
        <div className="band-copy rv">
          <span className="eyebrow">// Discipline</span>
          <h2>Every rupee we have lent has come home.</h2>
          <p>
            Zero NPAs since inception is method, not luck. Before we wire, we underwrite the specific cash event that repays the facility: the marketplace settlement, the buyer&apos;s payment, the plan we agreed on. If we cannot see what pays us back, we do not lend.
          </p>
          <p>
            A lender that underwrites carefully is still here for your tenth cycle. Valuefin Credit Private Limited is an RBI-registered NBFC-ICC, with proper documentation and a real grievance process.
          </p>
        </div>
        <div className="band-vis rv">
          <div>
            <span className="big0">0</span>
            <div style={{ fontFamily: "var(--mono)", fontSize: ".7rem", letterSpacing: ".16em", color: "var(--sub)", marginTop: "22px", textTransform: "uppercase" }}>
              NPAs since inception
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
          <h2>Six reasons. One conversation.</h2>
          <p>Tell us what you are funding and judge us on the read.</p>
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
