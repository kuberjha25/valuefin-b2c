import Link from 'next/link';

/** The Valuefin monogram, traced from the approved logo. Units are pixels of the original artwork. */
const V = 'M0 0H44.5Q37 3 37 12.2L71.5 91L60 117L11.2 9.5Q6 3 0 0Z';
const F = 'M128.5 0H205.2L194.2 21.7H135L133.7 22.7L75.8 149.3L64.7 123.7L114.3 11.8Q117 2.5 128.5 0Z';
const BAR = 'M126 53H181.5L171 73H117Z';

/** The Valuefin mark and name. Used in the header and the footer. `id` keeps the two gradients apart.
 *  The footer ('brand-f') sits on navy, so its V turns light and its green is a little brighter (see globals.css). */
export function Brand({ id, className = 'brand' }: { id: string; className?: string }) {
  const dark = className.includes('brand-f');
  return (
    <Link href="/" className={className}>
      <svg className="g" viewBox="0 0 205.5 149.5" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
            {dark ? (
              <>
                <stop offset="0" stopColor="#0C9E85" />
                <stop offset=".45" stopColor="#1BD9B5" />
                <stop offset="1" stopColor="#12B79B" />
              </>
            ) : (
              <>
                <stop offset="0" stopColor="#087A68" />
                <stop offset=".45" stopColor="#17B596" />
                <stop offset="1" stopColor="#0C9E85" />
              </>
            )}
          </linearGradient>
        </defs>
        <path className="mv" d={V} />
        <path d={F} fill={`url(#${id})`} />
        <path d={BAR} fill={`url(#${id})`} />
      </svg>
      <span className="bt">
        <span className="bn">
          VALUE<b>FIN</b>
        </span>{' '}
        <span className="bs">Startup-speed capital</span>
      </span>
    </Link>
  );
}
