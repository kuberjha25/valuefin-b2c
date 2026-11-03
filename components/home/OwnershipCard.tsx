'use client';

import { useState } from 'react';

type Mode = 'valuefin' | 'equity';

const R = 62;
const C = 2 * Math.PI * R;

const STATES: Record<
  Mode,
  { own: number; pct: string; full: boolean; legOwn: string; legInv: string; invOpacity: number; lead: string; foot: string }
> = {
  valuefin: {
    own: 100,
    pct: '100%',
    full: true,
    legOwn: "Untouched. The cap table doesn't move.",
    legInv: 'Nothing. There is no round to give away.',
    invOpacity: 0.45,
    lead: 'Working capital, not a round.',
    foot: 'Borrow it, use it, repay it, and own exactly what you owned before.',
  },
  equity: {
    own: 78,
    pct: '78%',
    full: false,
    legOwn: 'Diluted to make room for new investors.',
    legInv: 'A permanent slice of the company, gone for good.',
    invOpacity: 1,
    lead: 'A round dilutes you once, and forever.',
    foot: 'Even a friendly raise permanently trades ownership for cash.',
  },
};

const ringTransition = 'stroke-dashoffset .7s cubic-bezier(.4,0,.2,1)';

/** The "what funding costs you" card on the home page: a ring that shows ownership with and without a funding round. */
export function OwnershipCard() {
  const [mode, setMode] = useState<Mode>('valuefin');
  const s = STATES[mode];
  const given = (C * s.own) / 100;

  return (
    <div className="own-card rv">
      <div className="own-head">
        <span className="lbl">What funding costs you</span>
        <span className="own-tag">Illustrative</span>
      </div>
      <div className="own-toggle" id="ownToggle">
        <button type="button" data-mode="equity" className={mode === 'equity' ? 'on' : undefined} aria-pressed={mode === 'equity'} onClick={() => setMode('equity')}>
          Raise equity
        </button>{' '}
        <button type="button" data-mode="valuefin" className={mode === 'valuefin' ? 'on' : undefined} aria-pressed={mode === 'valuefin'} onClick={() => setMode('valuefin')}>
          Use Valuefin
        </button>
      </div>
      <div className="ring-area">
        <div className="ring-wrap">
          <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true">
            <circle cx="75" cy="75" r="62" fill="none" stroke="#0A1D2E" strokeWidth="16" />
            <circle
              id="ringInv"
              cx="75"
              cy="75"
              r="62"
              fill="none"
              stroke="#A87B2E"
              strokeWidth="16"
              strokeDasharray="389.6"
              strokeLinecap="round"
              style={{ strokeDashoffset: given, transition: ringTransition }}
            />
            <circle
              id="ringOwn"
              cx="75"
              cy="75"
              r="62"
              fill="none"
              stroke="#E9BB60"
              strokeWidth="16"
              strokeDasharray="389.6"
              strokeLinecap="round"
              style={{ strokeDashoffset: C - given, transition: ringTransition }}
            />
          </svg>
          <div className="ring-center">
            <span className={'pct' + (s.full ? ' full' : '')} id="ownPct">
              {s.pct}
            </span>
            <small>You own</small>
          </div>
        </div>
        <div className="ring-legend">
          <div className="leg-row">
            <span className="leg-dot gold" />
            <div>
              <span className="lt">Your ownership</span>
              <span className="ls" id="legOwn">
                {s.legOwn}
              </span>
            </div>
          </div>
          <div className="leg-row" id="rowInv" style={{ opacity: s.invOpacity, transition: 'opacity .5s' }}>
            <span className="leg-dot dim" />
            <div>
              <span className="lt">Given to investors</span>
              <span className="ls" id="legInv">
                {s.legInv}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="own-foot" id="ownFoot" aria-live="polite">
        <b>{s.lead}</b> {s.foot}
      </div>
    </div>
  );
}
