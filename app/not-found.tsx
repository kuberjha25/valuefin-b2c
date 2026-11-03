import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Valuefin' },
  description: 'This page does not exist. Use the links to find what you were looking for.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <div className="nf-in">
          <span className="eyebrow">// 404</span>
          <h1>This page is not here.</h1>
          <p>The address may have changed, or it may never have existed. Start from the home page, or go straight to what you came for.</p>
          <div className="nf-links">
            <Link href="/" className="btn btn-solid mag">
              GO TO HOME <span className="a">→</span>
            </Link>
            <Link href="/quick-cash" className="btn btn-line mag">
              QUICK CASH
            </Link>
            <Link href="/rocket-fuel" className="btn btn-line mag">
              ROCKET FUEL
            </Link>
            <Link href="/apply" className="btn btn-line mag">
              APPLY FOR FUNDING
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
