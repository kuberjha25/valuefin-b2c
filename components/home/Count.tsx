'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A number that counts up from 0 the first time it is on screen.
 * The page is built with the final number in it, so search engines and visitors without scripts see the real value.
 */
export function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setValue(to);
      setReady(true);
      return;
    }

    setValue(0);
    setReady(true);

    let raf = 0;
    const run = () => {
      const dur = 1200;
      let t0: number | null = null;
      const step = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            io.disconnect();
            run();
          }
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className={'count' + (ready ? ' ready' : '')} data-to={to}>
      {value}
    </span>
  );
}
