'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

/* ---------------------------------------------------------------------------------------------
   Funding planner. Everything shown here is an illustration of mechanics, not an offer.
   Amounts are in lakhs (100 lakh = 1 crore).
   --------------------------------------------------------------------------------------------- */

type ReasonKey = 'po' | 'inv' | 'fest' | 'mfg' | 'grow';

interface Reason {
  label: string;
  /** Days until the money comes back, as offered for this kind of need. */
  pay: number[];
  def: number;
  /** Label above the payback chips. */
  who: string;
}

const RS: Record<ReasonKey, Reason> = {
  po: { label: 'Marketplace purchase order', pay: [30, 45, 60, 90, 120], def: 60, who: 'The marketplace settles in' },
  inv: { label: 'Invoices from a large buyer', pay: [30, 45, 60, 90, 120], def: 60, who: 'Your buyer pays in' },
  fest: { label: 'Festive-season stock-up', pay: [30, 45, 60, 90, 120], def: 60, who: 'Sales turn into cash in' },
  mfg: { label: 'Raw material for orders', pay: [30, 45, 60, 90, 120], def: 60, who: 'Your buyer pays in' },
  grow: { label: 'A growth push (VC-backed)', pay: [90, 120, 150, 180], def: 120, who: 'You want to repay in' },
};
const REASON_KEYS = Object.keys(RS) as ReasonKey[];

/** Company value choices for the equity comparison, in crore. The last one is "100 crore or more". */
const VALS: { v: number; l: string; plus?: boolean }[] = [
  { v: 10, l: '₹10Cr' },
  { v: 25, l: '₹25Cr' },
  { v: 50, l: '₹50Cr' },
  { v: 100, l: '₹100Cr' },
  { v: 100, l: '₹100Cr+', plus: true },
];

/* Interest illustration. Both rates are % a year. The term loan is modelled at the same rate over
   12 equal monthly instalments (the shortest typical term), so the only difference is time. */
const VF_RATE = 18;
const TL_RATE = 18;
const TL_MONTHS = 12;

const NEED_MIN = 25;
const NEED_MAX = 500;
const CASH_MIN = 0;
const CASH_MAX = 300;

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dayLabel(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return `${d.getDate()} ${MON[d.getMonth()]}`;
}

/** Amount in lakhs as ₹xL or ₹xCr. */
function fA(l: number): string {
  if (l < 100) return `₹${l}L`;
  return `₹${Math.round((l / 100) * 100) / 100}Cr`;
}

/** Interest amount in lakhs, with a rupee figure for very small amounts. */
function fI(l: number): string {
  if (l >= 100) return `₹${Math.round((l / 100) * 100) / 100}Cr`;
  if (l >= 1) return `₹${Math.round(l * 100) / 100}L`;
  return `₹${Math.round(l * 100000).toLocaleString('en-IN')}`;
}

/** Total interest on a loan repaid in equal monthly instalments. */
function termInt(g: number, ratePct: number, n: number): number {
  const r = ratePct / 1200;
  if (!r) return 0;
  const f = Math.pow(1 + r, n);
  return ((g * r * f) / (f - 1)) * n - g;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface State {
  r: ReasonKey;
  need: number;
  cash: number;
  pay: number;
  vi: number;
}

const INITIAL: State = { r: 'po', need: 100, cash: 30, pay: 60, vi: 1 };

function compute(S: State, mounted: boolean) {
  const need = S.need;
  const cash = Math.min(S.cash, S.need);
  const gap = Math.max(0, need - cash);
  const val = VALS[S.vi];

  let msg = '';
  let ok = false;
  let show = true;
  if (gap <= 0) {
    msg = 'Your cash covers it. Come back when an order outgrows the bank balance. That is the moment this is built for.';
    ok = true;
    show = false;
  } else if (gap < 25) {
    msg = 'A gap this small is usually best bridged from your own cash flow. Raise the order size above, or tell us what is coming next.';
    show = false;
  }

  const g = gap;
  const dil = (g / (val.v * 100 + g)) * 100;
  const vfI = ((g * VF_RATE) / 100 * S.pay) / 365;
  const tlI = termInt(g, TL_RATE, TL_MONTHS);
  const top = Math.max(vfI, tlI) || 1;
  const sv = tlI - vfI;

  const cyc = Math.max(1, Math.floor(365 / (S.pay + 5)));
  const rep = 5 + S.pay;
  const d = (n: number) => (mounted ? ` · ${dayLabel(n)}` : '');

  return {
    need,
    gap,
    msg,
    ok,
    show,
    gapText: gap > 0 ? fA(gap) : '₹0',
    o1m: `${Math.round(dil * 10) / 10}%`,
    o1s: val.plus ? 'ownership given up, at most' : 'ownership given up',
    o3m: `${Math.round((g / need) * 100)}%`,
    o4h: `Valuefin: fund ${fA(g)} of the gap`,
    o4t:
      S.r === 'grow'
        ? `dilution. Debt sized to your verified revenue and repaid inside ${S.pay} days on a plan we agree.`
        : `dilution. Debt sized to the cash flow, in use for ${S.pay} days, then gone. Repay when the receivable lands.`,
    intVfL: `Valuefin, in use for ${S.pay} days`,
    intVf: fI(vfI),
    intTl: fI(tlI),
    intVfW: (vfI / top) * 100,
    intTlW: (tlI / top) * 100,
    intSave: sv > 0 ? fI(sv) : 'Similar',
    intSaveT:
      sv > 0
        ? `${Math.round((sv / tlI) * 100)}% less interest on the same ${fA(g)}, because you pay only for the days you use it.`
        : 'At this tenor the interest is similar. The difference is a cleaner balance sheet and repaying on the day the cash lands.',
    m1v: fA(Math.round(need * cyc)),
    m2v: `${cyc}×`,
    timeline: [
      { t: `Day 0${d(0)}`, s: 'You tell us about the business. The conversation starts.' },
      { t: `About day 3${d(3)}`, s: 'Documentation is complete.' },
      { t: `About day 5${d(5)}`, s: 'Two days after documents, money is in your account.*' },
      {
        t: `Day ${rep}${d(rep)}`,
        s:
          S.r === 'grow'
            ? 'Your growth turns into cash. You repay on the plan we agreed.'
            : S.r === 'fest'
              ? 'Sales settle. Repay the day the cash lands.'
              : `The receivable hits your bank. Repay that same day, on day ${S.pay}.`,
      },
      { t: 'Right after', s: 'The facility is free again. Draw for the next order, or ask for a top-up after 2 rotations.' },
    ],
  };
}

const fillStyle = (v: number, mn: number, mx: number) => ({ '--fill': `${((v - mn) / (mx - mn)) * 100}%` }) as CSSProperties;

export function Planner() {
  const [S, setS] = useState<State>(INITIAL);
  const [tick, setTick] = useState(0); // restarts the small "pop" on the headline numbers
  const [mounted, setMounted] = useState(false); // dates are shown only in the browser, so the page build never goes stale

  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const o = compute(S, mounted);
  const bump = tick > 0 ? ' bump' : '';

  /** The timeline draws itself node by node. Done on the elements directly so the animation can be restarted cleanly. */
  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const fill = fillRef.current;
    const nodes = nodeRefs.current;
    if (!fill) return;
    nodes.forEach((n) => n?.classList.remove('on'));
    if (reducedMotion()) {
      fill.style.setProperty('--p', '1');
      nodes.forEach((n) => n?.classList.add('on'));
      return;
    }
    fill.style.transition = 'none';
    fill.style.setProperty('--p', '0');
    void fill.offsetWidth; // let the empty state paint before the fill grows
    fill.style.transition = '';
    requestAnimationFrame(() => fill.style.setProperty('--p', '1'));
    [60, 280, 520, 800, 1050].forEach((ms, i) => {
      timers.current.push(setTimeout(() => nodes[i]?.classList.add('on'), ms));
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    if (reducedMotion() || !('IntersectionObserver' in window)) {
      play();
      return;
    }

    // Start from the empty timeline and play it once the planner is on screen.
    nodeRefs.current.forEach((n) => n?.classList.remove('on'));
    fill.style.transition = 'none';
    fill.style.setProperty('--p', '0');
    void fill.offsetWidth;
    fill.style.transition = '';

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            play();
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
      clearTimeout(debounce.current);
    };
  }, [play]);

  const pickReason = (r: ReasonKey) => {
    setS((s) => ({ ...s, r, pay: RS[r].def }));
    setTick((t) => t + 1);
    play();
  };
  const pickPay = (pay: number) => {
    setS((s) => ({ ...s, pay }));
    setTick((t) => t + 1);
    play();
  };
  const pickVal = (vi: number) => {
    setS((s) => ({ ...s, vi }));
    setTick((t) => t + 1);
  };
  const slide = (patch: Partial<State>) => {
    setS((s) => ({ ...s, ...patch }));
    setTick((t) => t + 1);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(play, 380);
  };

  const rs = RS[S.r];

  return (
    <div className="pl rv" id="planner" ref={rootRef}>
      <div className="pl-ctl">
        <div className="pl-hint">
          <span className="k">01</span> Set your numbers. Everything on the right moves.
        </div>
        <div className="grp">
          <span className="glabel">What is the money for?</span>
          <div className="chips" id="plReason">
            {REASON_KEYS.map((k) => (
              <button
                type="button"
                key={k}
                className={'chip' + (k === S.r ? ' on' : '')}
                data-r={k}
                aria-pressed={k === S.r}
                onClick={() => pickReason(k)}
              >
                {RS[k].label}
              </button>
            ))}
          </div>
        </div>
        <div className="grp">
          <span className="glabel">Working capital you need</span>
          <div className="amt-read" id="plNeedV">
            {fA(S.need)}
          </div>
          <input
            type="range"
            id="plNeed"
            min={NEED_MIN}
            max={NEED_MAX}
            step={5}
            value={S.need}
            style={fillStyle(S.need, NEED_MIN, NEED_MAX)}
            aria-label="Working capital needed"
            onChange={(e) => slide({ need: parseInt(e.target.value, 10) })}
          />
        </div>
        <div className="grp">
          <span className="glabel">Cash you already have for it</span>
          <div className="amt-read" id="plCashV">
            {fA(S.cash)}
          </div>
          <input
            type="range"
            id="plCash"
            min={CASH_MIN}
            max={CASH_MAX}
            step={5}
            value={S.cash}
            style={fillStyle(S.cash, CASH_MIN, CASH_MAX)}
            aria-label="Cash in bank"
            onChange={(e) => slide({ cash: parseInt(e.target.value, 10) })}
          />
        </div>
        <div className="grp">
          <span className="glabel" id="plPayL">
            {rs.who}
          </span>
          <div className="chips" id="plPay">
            {rs.pay.map((d) => (
              <button
                type="button"
                key={d}
                className={'chip' + (d === S.pay ? ' on' : '')}
                data-d={d}
                aria-pressed={d === S.pay}
                onClick={() => pickPay(d)}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>
        <div className="grp" id="plValGrp">
          <span className="glabel">Company value today (used for the equity comparison)</span>
          <div className="chips" id="plVal">
            {VALS.map((v, i) => (
              <button
                type="button"
                key={v.l}
                className={'chip' + (i === S.vi ? ' on' : '')}
                data-i={i}
                aria-pressed={i === S.vi}
                onClick={() => pickVal(i)}
              >
                {v.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pl-out">
        <div className="gapbox">
          <div>
            <span className="gap-l">The gap you need to close</span>
            <div className={'gap-n' + bump} id="gapN" key={`gap${tick}`}>
              {o.gapText}
            </div>
          </div>
          <div className="gap-calc" id="gapCalc">
            Need <b>{fA(S.need)}</b> − in bank <b>{fA(S.cash)}</b>
          </div>
        </div>
        <div className={'pl-msg' + (o.ok ? ' ok' : '')} id="plMsg" hidden={!o.msg} role="status">
          {o.msg}
        </div>
        <div className="opts" id="opts" hidden={!o.show}>
          <div className="opt-div">Ways to close it</div>
          <div className="opt">
            <span className="oi">1</span>
            <div>
              <h3>Raise equity</h3>
              <p id="o1t">of the company, gone for good. Plus a long fundraising process while the order waits.</p>
            </div>
            <div className="om">
              <b id="o1m" className={bump.trim() || undefined} key={`o1${tick}`}>
                {o.o1m}
              </b>
              <small id="o1s">{o.o1s}</small>
            </div>
          </div>
          <div className="opt">
            <span className="oi">2</span>
            <div>
              <h3>Banks, marketplace lenders, revenue-multiple platforms</h3>
              <p id="o2t">Term loans run 12 months or more and take time to approve. You keep paying interest long after the order is paid.</p>
            </div>
            <div className="om">
              <b id="o2m">12+</b>
              <small>months, typical term loan</small>
            </div>
          </div>
          <div className="opt">
            <span className="oi">3</span>
            <div>
              <h3>Cancel or cut the order</h3>
              <p id="o3t">of the order lost. The marketplace gives that volume to someone else.</p>
            </div>
            <div className="om">
              <b id="o3m">{o.o3m}</b>
              <small>of the order lost</small>
            </div>
          </div>
          <div className="opt-div">Or</div>
          <div className="opt vf">
            <span className="oi">V</span>
            <div>
              <h3 id="o4h">{o.o4h}</h3>
              <p id="o4t">{o.o4t}</p>
            </div>
            <div className="om">
              <b id="o4m" className={bump.trim() || undefined} key={`o4${tick}`}>
                0%
              </b>
              <small>dilution</small>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-int" id="plInt" hidden={!o.show}>
        <div className="int-head">
          <span className="int-title">
            <b>Interest, side by side</b> on the same amount
          </span>
          <span className="int-assume">Same 18% a year on both</span>
        </div>
        <div className="int-grid">
          <div className="int-bars">
            <div className="int-row vf">
              <div className="int-l">
                <span id="intVfL">{o.intVfL}</span>
                <em id="intVf">{o.intVf}</em>
              </div>
              <div className="int-track">
                <i id="intVfBar" style={{ width: `${o.intVfW}%` }} />
              </div>
            </div>
            <div className="int-row tl">
              <div className="int-l">
                <span>Term loan, 12+ months</span>
                <em id="intTl">{o.intTl}</em>
              </div>
              <div className="int-track">
                <i id="intTlBar" style={{ width: `${o.intTlW}%` }} />
              </div>
            </div>
          </div>
          <div className="int-save">
            <span className="is-l">You pay less interest</span>
            <b id="intSave">{o.intSave}</b>
            <span className="is-t" id="intSaveT">
              {o.intSaveT}
            </span>
          </div>
        </div>
        <p className="int-note">
          // Valuefin: 18% a year, charged only for the days the money is in use. Term loan: the same 18% a year over 12 months with equal monthly instalments. A longer term costs more. Illustrative and interest only. Fees and taxes are not included on either side.
        </p>
      </div>

      <div className="pl-tl">
        <div className="tl-head">
          <span className="tl-title">
            <b>Your timeline</b> if you start today
          </span>
          <Link href="/apply" className="btn btn-solid mag">
            START THE CONVERSATION <span className="a">→</span>
          </Link>
        </div>
        <div className="tl">
          <div className="tl-track">
            <div className="tl-fill" id="tlFill" ref={fillRef} style={{ '--p': 1 } as CSSProperties} />
          </div>
          <div className="tl-nodes">
            {o.timeline.map((n, i) => (
              <div
                className="tl-node on"
                id={`tn${i + 1}`}
                key={i}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
              >
                <span className="dot" />
                <b className="t">{n.t}</b>
                <span className="s">{n.s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="metrics">
          <div className="metric">
            <div className="mv" id="m1v">
              {o.m1v}
            </div>
            <div className="ml" id="m1l">
              Orders the same cash can carry in a year
            </div>
          </div>
          <div className="metric">
            <div className="mv" id="m2v">
              {o.m2v}
            </div>
            <div className="ml" id="m2l">
              Rotations of the capital
            </div>
          </div>
          <div className="metric">
            <div className="mv" id="m3v">
              0%
            </div>
            <div className="ml" id="m3l">
              Equity given up
            </div>
          </div>
        </div>
        <p className="pl-note">
          // Illustrative mechanics, not an offer. *Documentation typically completes about 3 days after the first conversation and money follows about 2 days later. Timing depends on how quickly documents arrive. Equity dilution is shown as the gap divided by the company value plus the gap.
        </p>
      </div>
    </div>
  );
}
