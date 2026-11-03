import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';
import { LeadForm } from '@/components/forms/LeadForm';
import { ContactMeta } from '@/components/site/ContactMeta';
import { isDemoMode } from '@/lib/lead';

export const metadata: Metadata = pageMetadata('apply');

export default function ApplyPage() {
  return (
    <>
      <PageJsonLd page="apply" />
      <PageHero />
      <ApplySection />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow">// Apply for funding · For founders</span>
        <h1>Tell us what you are funding.</h1>
        <p className="plead">
          Share the company, the order or the plan, and what you need. You will get an honest read in days, whether it is a fit or not, and what a facility could look like.
        </p>
        <div className="form-switch" role="group" aria-label="Choose your form">
          <Link href="/apply" className="on" aria-current="page">I am a founder</Link>
          {" "}
          <Link href="/partner" className="">I am a VC or fund</Link>
        </div>
      </div>
    </header>
  );
}

function ApplySection() {
  return (
    <section className="sec">
      <h2 className="sr-only">Application form for founders</h2>
      <div className="wrap form-wide">
        <LeadForm kind="founder" demo={isDemoMode()} />
        <div className="rv form-aside">
          <span className="eyebrow">// What happens next</span>
          <div className="ministeps" style={{ gridTemplateColumns: "1fr", marginTop: "22px" }}>
            <div className="mstep">
              <span className="mi">01</span>
              <h3>We read your message</h3>
              <p>A real person, usually the same day. If the shape looks workable, we set up a call.</p>
            </div>
            <div className="mstep">
              <span className="mi">02</span>
              <h3>One honest call</h3>
              <p>A decision-maker walks through what pays it back, what we need to see and what a facility could look like.</p>
            </div>
            <div className="mstep">
              <span className="mi">03</span>
              <h3>Documents, then money</h3>
              <p>Documentation typically completes about 3 days after the first conversation, and money lands about 2 days after that.</p>
            </div>
          </div>
          <ContactMeta />
          <p className="aside-link">
            Are you a VC or a fund?
            {" "}
            <Link href="/partner">Partner with us →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
