import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';
import { LeadForm } from '@/components/forms/LeadForm';
import { ContactMeta } from '@/components/site/ContactMeta';
import { isDemoMode } from '@/lib/lead';

export const metadata: Metadata = pageMetadata('partner');

export default function PartnerPage() {
  return (
    <>
      <PageJsonLd page="partner" />
      <PageHero />
      <PartnerSection />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow gold">// Partner with Valuefin · For VCs and funds</span>
        <h1>Partner with us on portfolio working capital.</h1>
        <p className="plead">
          Route portfolio companies to non-dilutive working capital, or explore working together on the debt side. Tell us about the fund and what you have in mind, and we will come back within a few days.
        </p>
        <div className="form-switch" role="group" aria-label="Choose your form">
          <Link href="/apply" className="">I am a founder</Link>
          {" "}
          <Link href="/partner" className="on" aria-current="page">I am a VC or fund</Link>
        </div>
      </div>
    </header>
  );
}

function PartnerSection() {
  return (
    <section className="sec">
      <h2 className="sr-only">Partnership form for VCs and funds</h2>
      <div className="wrap form-wide">
        <LeadForm kind="vc" demo={isDemoMode()} />
        <div className="rv form-aside">
          <span className="eyebrow gold">// How a partnership works</span>
          <div className="ministeps" style={{ gridTemplateColumns: "1fr", marginTop: "22px" }}>
            <div className="mstep">
              <span className="mi">01</span>
              <h3>Tell us about the fund</h3>
              <p>Your stage, sectors and portfolio, and the way of working you would like to explore.</p>
            </div>
            <div className="mstep">
              <span className="mi">02</span>
              <h3>A call with a decision-maker</h3>
              <p>We walk through how we fund, what we lend against and how a referral or programme could run.</p>
            </div>
            <div className="mstep">
              <span className="mi">03</span>
              <h3>A simple way to work together</h3>
              <p>Referrals, a portfolio-wide programme or co-lending. No warrants, no equity kickers, no conversion rights.</p>
            </div>
          </div>
          <ContactMeta />
          <p className="aside-link">
            Are you a founder?
            {" "}
            <Link href="/apply">Apply for funding →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
