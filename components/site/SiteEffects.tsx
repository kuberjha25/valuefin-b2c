'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Site-wide behaviour that does not belong to one component, ported from the original script:
 *  - scroll reveals: elements marked .rv get .in once they are on screen
 *  - the small pull on .mag buttons and the tilt on .tilt cards (mouse devices only)
 * It renders nothing.
 */
export function SiteEffects() {
  const pathname = usePathname();

  // Scroll reveals. Runs again after every page change, because the page content is new.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in)'));
    if (!els.length) return;

    if (reducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    // Show an element once about a fifth of it is visible, or once a screenful-sized slice of a very tall one is.
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          if (en.intersectionRatio >= 0.18 || en.intersectionRect.height >= window.innerHeight * 0.18) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }
      },
      { threshold: [0, 0.02, 0.05, 0.1, 0.18] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Magnetic buttons and tilting cards. One listener for the whole page, so it also covers pages opened later.
  useEffect(() => {
    if (reducedMotion() || window.matchMedia('(hover: none)').matches) return;

    let mag: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    const clear = (el: HTMLElement | null) => {
      if (el) el.style.transform = '';
    };

    const onMove = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const m = target?.closest<HTMLElement>('.mag') ?? null;
      const c = target?.closest<HTMLElement>('.tilt') ?? null;
      if (mag && mag !== m) clear(mag);
      if (tilt && tilt !== c) clear(tilt);
      mag = m;
      tilt = c;

      if (m) {
        const r = m.getBoundingClientRect();
        const dx = Math.max(-6, Math.min(6, (e.clientX - (r.left + r.width / 2)) * 0.18));
        const dy = Math.max(-5, Math.min(5, (e.clientY - (r.top + r.height / 2)) * 0.3));
        m.style.transform = `translate(${dx}px,${dy}px)`;
      }
      if (c) {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        c.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -4}deg) rotateY(${(px - 0.5) * 5}deg)`;
      }
    };
    const onLeave = () => {
      clear(mag);
      clear(tilt);
      mag = tilt = null;
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      onLeave();
    };
  }, []);

  return null;
}
