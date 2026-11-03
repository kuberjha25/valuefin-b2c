'use client';

import Link from 'next/link';
import { useState } from 'react';

const ITEMS = [
  'We are getting orders from Blinkit, Zepto or Amazon, but we cannot fulfil them because we need working capital.',
  'Our suppliers want payment upfront, and the marketplace pays us 30 to 120 days later.',
  'Our money is split between marketing and taking more purchase orders, and each one starves the other.',
  'We make a product with real demand, but supply cannot keep up because raw material needs cash.',
  'A festive sale is coming, we need 90 to 120 days of stock, and a term loan of 12+ months makes no sense.',
  'We do not want to sell equity just to fund orders we already have.',
];

function verdict(n: number): { title: string; text: string } {
  if (n === 0) {
    return {
      title: 'Tick what sounds familiar',
      text: 'There are no wrong answers. Each one is a situation we build facilities for.',
    };
  }
  if (n < 3) {
    return {
      title: 'Worth a conversation',
      text: 'Even one of these usually means a cash-cycle gap that short-tenor debt can close. Tell us the numbers and we will tell you honestly.',
    };
  }
  return {
    title: 'This is exactly what we build',
    text: 'Several of these together is the classic shape: demand is there, working capital is the bottleneck. Let us look at it this week.',
  };
}

export function Quiz() {
  const [on, setOn] = useState<boolean[]>(() => ITEMS.map(() => false));
  const n = on.filter(Boolean).length;
  const v = verdict(n);

  return (
    <div className="quiz rv" id="quiz">
      <div className="q-list">
        {ITEMS.map((text, i) => (
          <button
            type="button"
            key={text}
            className={'q-item' + (on[i] ? ' on' : '')}
            aria-pressed={on[i]}
            onClick={() => setOn((prev) => prev.map((x, k) => (k === i ? !x : x)))}
          >
            <span className="qb">✓</span>
            <span>{text}</span>
          </button>
        ))}
      </div>
      <div className="q-res">
        <span className="ql">Sounds like you</span>
        <div className="qn">
          <span id="qCount">{n}</span>
          <small> / {ITEMS.length}</small>
        </div>
        <h3 id="qTitle">{v.title}</h3>
        <p id="qText">{v.text}</p>
        <Link href="/apply" className="btn btn-solid mag">
          TELL US WHAT YOU NEED <span className="a">→</span>
        </Link>
      </div>
    </div>
  );
}
