'use client';

import { useEffect, useState } from 'react';

const PHRASES = [
  'funding a ₹60L Blinkit purchase order for 60 days_',
  'bridging a Zepto settlement that lands on day 45_',
  'stocking up for the festive sale without a round_',
  'growing the company on your own terms_',
];

/**
 * The line of text that types itself in the home page hero.
 * The page is built with the first phrase in place; the typing starts once the browser takes over.
 */
export function Typed() {
  const [text, setText] = useState(PHRASES[0].replace('_', ''));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReady(true);
      return;
    }

    let pi = 0;
    let ci = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    setText('');
    setReady(true);

    const loop = () => {
      const full = PHRASES[pi];
      if (!deleting) {
        ci++;
        setText(full.slice(0, ci));
        if (ci === full.length) {
          deleting = true;
          timer = setTimeout(loop, 1900);
          return;
        }
        timer = setTimeout(loop, 42);
      } else {
        ci--;
        setText(full.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % PHRASES.length;
          timer = setTimeout(loop, 350);
          return;
        }
        timer = setTimeout(loop, 22);
      }
    };
    loop();

    return () => clearTimeout(timer);
  }, []);

  return (
    <span id="typed" className={'tw' + (ready ? ' ready' : '')}>
      {text}
    </span>
  );
}
