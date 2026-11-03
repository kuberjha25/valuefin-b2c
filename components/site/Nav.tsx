'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Brand } from './Brand';

const LINKS = [
  { href: '/quick-cash', label: 'Quick Cash' },
  { href: '/rocket-fuel', label: 'Rocket Fuel' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/why-valuefin', label: 'Why Valuefin' },
  { href: '/who-we-fund', label: 'Who we fund' },
  { href: '/for-vcs', label: 'For VCs' },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow and tint once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(document.documentElement.scrollTop > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const here = (href: string) => (pathname === href ? ({ 'aria-current': 'page' } as const) : {});

  return (
    <nav className={'nav' + (scrolled ? ' sc' : '')} id="nav" aria-label="Main">
      <div className="nav-in">
        <Brand id="lgA" />
        <div className={'nlinks' + (open ? ' open' : '')} id="nlinks">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? 'on' : undefined} {...here(l.href)}>
              {l.label}
            </Link>
          ))}
          <Link href="/apply" className={'nl-cta' + (pathname === '/apply' ? ' on' : '')} {...here('/apply')}>
            Apply now
          </Link>
        </div>
        <div className="nav-r">
          <Link href="/apply" className="btn btn-solid mag">
            APPLY NOW <span className="a">→</span>
          </Link>
          <button
            type="button"
            className={'burger' + (open ? ' open' : '')}
            id="burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="nlinks"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
