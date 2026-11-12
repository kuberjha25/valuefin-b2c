import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { PAGES, PAGE_LIST, type PageKey } from '@/lib/pages';

/**
 * Share images (1200x630) for every page, drawn at build time: /og/home.png, /og/quick-cash.png and so on.
 * The text comes from lib/pages.ts. It is plain ASCII on purpose: the image fonts are static Latin subsets.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return PAGE_LIST.map((p) => ({ slug: `${p.key}.png` }));
}

const font = (file: string) => readFile(path.join(process.cwd(), 'app', 'fonts', 'og', file));

const INK = '#0F2434';
const SUB = '#54697B';
const TEAL = '#0C9E85';
const GOLD = '#A87B2E';

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const key = slug.replace(/\.png$/, '') as PageKey;
  const page = PAGES[key];
  if (!page) return new Response('Not found', { status: 404 });

  const [unbounded, inter, mono] = await Promise.all([
    font('unbounded-latin-700-normal.woff'),
    font('inter-tight-latin-500-normal.woff'),
    font('jetbrains-mono-latin-700-normal.woff'),
  ]);

  const long = page.og.headline.length > 30;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F2EB',
          padding: '64px 72px 0 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="88" height="64" viewBox="0 0 205.5 149.5" fill="none">
            <defs>
              <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#087A68" />
                <stop offset="0.45" stopColor="#17B596" />
                <stop offset="1" stopColor="#0C9E85" />
              </linearGradient>
            </defs>
            <path d="M0 0H44.5Q37 3 37 12.2L71.5 91L60 117L11.2 9.5Q6 3 0 0Z" fill="#0A1D2E" />
            <path d="M128.5 0H205.2L194.2 21.7H135L133.7 22.7L75.8 149.3L64.7 123.7L114.3 11.8Q117 2.5 128.5 0Z" fill="url(#g)" />
            <path d="M126 53H181.5L171 73H117Z" fill="url(#g)" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
            <div style={{ display: 'flex', fontFamily: 'Unbounded', fontSize: 34, color: INK, letterSpacing: 7 }}>
              VALUE<span style={{ color: TEAL }}>FIN</span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, letterSpacing: 3, color: SUB, marginTop: 8 }}>
              STARTUP-SPEED CAPITAL
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 24, letterSpacing: 4, color: GOLD }}>{page.og.kicker}</div>
          <div
            style={{
              fontFamily: 'Unbounded',
              fontSize: long ? 60 : 76,
              lineHeight: 1.12,
              color: INK,
              letterSpacing: -2,
              marginTop: 18,
              maxWidth: 1050,
            }}
          >
            {page.og.headline}
          </div>
          <div style={{ fontFamily: 'Inter Tight', fontSize: 32, lineHeight: 1.35, color: SUB, marginTop: 24, maxWidth: 980 }}>
            {page.og.sub}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 20, letterSpacing: 2, color: INK, marginBottom: 26 }}>
            VALUEFIN.IN
          </div>
          <div style={{ display: 'flex', height: 14, width: '100%' }}>
            <div style={{ flex: 1, background: '#1BD9B5' }} />
            <div style={{ flex: 1, background: '#E9BB60' }} />
            <div style={{ flex: 1, background: '#1BD9B5' }} />
            <div style={{ flex: 1, background: '#E9BB60' }} />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Unbounded', data: unbounded, weight: 700, style: 'normal' },
        { name: 'Inter Tight', data: inter, weight: 500, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 700, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' },
    },
  );
}
