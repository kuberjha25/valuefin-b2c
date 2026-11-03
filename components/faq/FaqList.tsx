import Link from 'next/link';
import { FAQ } from '@/lib/faq';

/** The questions and answers, drawn from lib/faq.ts. Uses the browser's own open and close, so it needs no scripts. */
export function FaqList() {
  return (
    <div className="faq rv">
      {FAQ.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <span className="pl">+</span>
          </summary>
          <p className="fa">
            {item.a.map((piece, i) =>
              typeof piece === 'string' ? (
                piece
              ) : (
                <Link key={i} href={piece.href} style={{ color: 'var(--teal)', fontWeight: '700' }}>
                  {piece.text}
                </Link>
              ),
            )}
          </p>
        </details>
      ))}
    </div>
  );
}
