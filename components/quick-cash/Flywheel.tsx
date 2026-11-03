'use client';

import { useEffect, useRef, useState } from 'react';

const NODES = [
  { x: '220.0', y: '70.0' },
  { x: '362.7', y: '173.6' },
  { x: '308.2', y: '341.4' },
  { x: '131.8', y: '341.4' },
  { x: '77.3', y: '173.6' },
] as const;

const STEPS = [
  { title: 'Get listed', text: 'A marketplace lists your product and the first purchase orders arrive.' },
  {
    title: 'Scaling needs fulfilment speed',
    text: 'More cities and dark stores mean bigger orders, and they must be filled quickly and in full.',
  },
  {
    title: 'Speed needs purchase order financing',
    text: 'You pay suppliers and manufacturers upfront. The marketplace settles 30 to 120 days later. Between the two, cash runs out.',
  },
  {
    title: 'Slow fulfilment, no more purchase orders',
    text: 'If you cannot fill the order, the marketplace gives that shelf space and volume to someone else.',
  },
  {
    title: 'Rotate faster, get more',
    text: 'Fund each order, repay when the settlement lands, and fund the next. Faster rotation earns bigger purchase orders.',
  },
];

/** The five-step flywheel on the Quick Cash page. It turns by itself until the visitor picks a step. */
export function Flywheel() {
  const [active, setActive] = useState(0);
  const userPicked = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (!userPicked.current) setActive((a) => (a + 1) % STEPS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fw rv" id="fw">
      <svg className="fw-svg" viewBox="0 0 440 440" fill="none" aria-hidden="true">
        <circle className="ringd" cx="220" cy="220" r="150" stroke="rgba(15,36,52,.35)" strokeWidth="1.6" strokeDasharray="3 9" />
        <text className="ctr" x="220" y="216">
          Rotate
        </text>
        <text className="ctr" x="220" y="238">
          faster
        </text>
        <text className="ctr2" x="220" y="262">
          GET MORE ORDERS
        </text>
        {NODES.map((n, k) => (
          <g className={'nd' + (k <= active ? ' on' : '')} key={k}>
            <circle cx={n.x} cy={n.y} r="27" />
            <text x={n.x} y={(parseFloat(n.y) + 6).toFixed(1)}>
              {k + 1}
            </text>
          </g>
        ))}
      </svg>
      <div className="fw-list">
        {STEPS.map((st, k) => (
          <button
            type="button"
            key={st.title}
            className={'fw-item' + (k === active ? ' on' : '')}
            aria-pressed={k === active}
            onClick={() => {
              userPicked.current = true;
              setActive(k);
            }}
          >
            <span className="n">{k + 1}</span>
            <span>
              <b>{st.title}</b>
              <span>{st.text}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
