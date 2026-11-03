import type { Metadata } from 'next';
import Link from 'next/link';
import { PageJsonLd } from '@/components/PageJsonLd';
import { pageMetadata } from '@/lib/seo';
import { FaqList } from '@/components/faq/FaqList';

export const metadata: Metadata = pageMetadata('faq');

export default function FaqPage() {
  return (
    <>
      <PageJsonLd page="faq" />
      <PageHero />
      <Questions />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <header className="phero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap phero-in">
        <span className="eyebrow">// FAQ</span>
        <h1>Straight answers.</h1>
        <p className="plead">The questions founders actually ask, answered the way we would on a call.</p>
      </div>
    </header>
  );
}

function Questions() {
  return (
    <section className="sec">
      <div className="wrap">
        <FaqList />
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap cta-in">
        <div className="rv">
          <h2>Question not here?</h2>
          <p>Ask us directly. You will get a straight answer.</p>
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
