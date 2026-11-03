import localFont from 'next/font/local';

/**
 * Fonts are self-hosted (no request to Google at build or run time).
 *
 * Each family ships as the Latin variable font from the open-source Fontsource packages
 * (SIL Open Font License, see app/fonts/LICENSES). The Indian rupee sign is not in the Latin
 * subset, so Unbounded and Inter Tight also get a tiny rupee-only file (about 1 KB each).
 * JetBrains Mono has no rupee glyph, so rupee signs in mono text use the system fallback,
 * exactly as before.
 *
 * The CSS variables below are combined into --disp, --body and --mono in globals.css.
 * The rupee file is listed first in the stack; its unicode-range keeps it to that one glyph.
 */
export const unbounded = localFont({
  src: './fonts/unbounded-latin-wght-normal.woff2',
  weight: '200 900',
  display: 'swap',
  variable: '--font-unbounded',
});

export const unboundedRupee = localFont({
  src: './fonts/unbounded-rupee-wght-normal.woff2',
  weight: '200 900',
  display: 'swap',
  variable: '--font-unbounded-rupee',
  adjustFontFallback: false,
  preload: false,
  declarations: [{ prop: 'unicode-range', value: 'U+20B9' }],
});

export const interTight = localFont({
  src: './fonts/inter-tight-latin-wght-normal.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter-tight',
});

export const interTightRupee = localFont({
  src: './fonts/inter-tight-rupee-wght-normal.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter-tight-rupee',
  adjustFontFallback: false,
  preload: false,
  declarations: [{ prop: 'unicode-range', value: 'U+20B9' }],
});

export const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono-latin-wght-normal.woff2',
  weight: '100 800',
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

/** Class names that define the font variables. Applied to <html>. */
export const fontVariables = [
  unbounded.variable,
  unboundedRupee.variable,
  interTight.variable,
  interTightRupee.variable,
  jetbrainsMono.variable,
].join(' ');
