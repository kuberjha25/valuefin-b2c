import Link from 'next/link';

/** The Valuefin mark and name. Used in the header and the footer. `id` keeps the two gradients apart. */
export function Brand({ id, className = 'brand' }: { id: string; className?: string }) {
  return (
    <Link href="/" className={className}>
      <svg className="g" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#12304A" />
            <stop offset="1" stopColor="#0A1D2E" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="13" fill={`url(#${id})`} stroke="#1BD9B5" strokeWidth="1.8" />
        <path d="M13 15l11 20 11-20" stroke="#1BD9B5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="35" cy="14" r="3.6" fill="#E9BB60" />
      </svg>
      <span className="bt">
        <span className="bn">
          Value<b>fin</b>
        </span>{' '}
        <span className="bs">RBI-registered NBFC</span>
      </span>
    </Link>
  );
}
