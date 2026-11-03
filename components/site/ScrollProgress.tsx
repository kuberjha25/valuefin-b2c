'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/** The thin bar at the top of the page that fills as you read. Updated directly, so scrolling never re-renders React. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (ref.current) ref.current.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  return <div className="prog" id="prog" ref={ref} aria-hidden="true" />;
}
