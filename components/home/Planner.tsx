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

/* Interest illustration over a full year. One assumed rate (% a year) is used on both sides, so the
   only difference is the number of days the money is charged for:
   - Valuefin: the borrower chooses how many times the facility is used in a year and for how many days each time, and
     it is charged only while the money is in use.
   - Term loan: a 12-month agreement, charged for all 365 days whether the money is needed or not.
   The rate is used in the sums only. It is never printed anywhere on the site. */
const ILLUSTRATION_RATE = 18;
const YEAR = 365;
/** Days between one rotation and the next (documents and the new draw). */
const ROTATION_GAP = 5;
/** What the borrower can try in the interest illustration: how many times the facility is used in a year, and for how many days each time. */
const INT_ROTS = [1, 2, 3, 4, 5];
const INT_DAYS = [30, 45, 60, 90, 120];
/** The bar keeps one slot for each possible rotation, so changing the choice animates smoothly. */
const MAX_ROTATIONS = INT_ROTS[INT_ROTS.length - 1];
/** Most rotations of this many days that fit in a year, counting the gap after each one. This keeps rotations x days below 365. */
const fitRotations = (days: number) => Math.max(1, Math.min(MAX_ROTATIONS, Math.floor(YEAR / (days + ROTATION_GAP))));
/** The illustration starts from the payback period chosen in the planner, with as many rotations as fit. */
const startFrom = (pay: number) => {
  const idays = INT_DAYS.reduce((a, b) => (Math.abs(b - pay) < Math.abs(a - pay) ? b : a));
  return { idays, rot: fitRotations(idays) };
};

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

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface State {
  r: ReasonKey;
  need: number;
  cash: number;
  pay: number;
  vi: number;
  /** Interest illustration: rotations in a year, and days in each rotation. */
  rot: number;
  idays: number;
}

const INITIAL: State = { r: 'po', need: 100, cash: 30, pay: 60, vi: 1, ...startFrom(60) };

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

  // Rotations the planner's payback period allows in a year. Used for the capital figures only.
  const cyc = Math.max(1, Math.floor(YEAR / (S.pay + ROTATION_GAP)));

  // Interest illustration. The borrower picks the rotations and the days in each; the days the money is
  // charged for are rotations x days. fitRotations keeps that below 365, so the term loan always costs more.
  const idays = S.idays;
  const fit = fitRotations(idays);
  const rot = Math.min(S.rot, fit);
  const vfDays = rot * idays;
  const interest = (days: number) => (((g * ILLUSTRATION_RATE) / 100) * days) / YEAR;
  const vfI = interest(vfDays);
  const tlI = interest(YEAR);
  // One bar segment per rotation, laid out on a 365-day scale. Unused slots collapse to nothing.
  const pct = (days: number) => Math.round((days / YEAR) * 100000) / 1000;
  const vfSegs = Array.from({ length: MAX_ROTATIONS }, (_, k) => ({
    left: Math.min(100, pct(k * (idays + ROTATION_GAP))),
    width: k < rot ? pct(idays) : 0,
  }));

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
    rot,
    rotFit: fit,
    intFit: `At ${idays} days each, ${fit >= MAX_ROTATIONS ? 'all' : 'up to'} ${fit} rotation${fit === 1 ? '' : 's'} fit${fit === 1 ? 's' : ''} in a year, with about ${ROTATION_GAP} days between them.`,
    intVfL: rot > 1 ? `Valuefin, ${rot} rotations of ${idays} days` : `Valuefin, used once for ${idays} days`,
    intVfS: rot > 1 ? `Interest for ${vfDays} days, nothing in between` : `Interest for ${vfDays} days only`,
    intVf: fI(vfI),
    intTl: fI(tlI),
    vfSegs,
    intSave: fI(tlI - vfI),
    intSaveT: `Interest runs for ${vfDays} of the ${YEAR} days. A term loan charges for all ${YEAR}, whether you need the money or not. Your interest follows the days you use the money, so it stays below the term loan's.`,
    // No rate is printed in either of these. They explain, in days, why the term loan costs more per day of real use,
    // and why a lower quoted rate on the term loan can still leave the two close.
    intEffT: `With Valuefin you pay interest for ${vfDays} days of use. A term loan makes you pay for ${YEAR}, so every day you actually use the money costs more. That makes its effective rate higher, and the gap widens the less you use the money.`,
    intLowT: `Even if a term loan is quoted at a lower rate, you can end up paying about the same, because Valuefin charges interest for ${vfDays} days and the term loan for ${YEAR}. The fewer days you use the money, the lower the term loan's quoted rate would have to be to match.`,
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

    // Start once a quarter of the planner is on screen, or a quarter of a screen's height of it. The planner is
    // taller than four screens on a phone, so a share of its own height could never be reached there.
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          if (en.intersectionRatio >= 0.25 || en.intersectionRect.height >= window.innerHeight * 0.25) {
            play();
            io.unobserve(en.target);
          }
        }
      },
      { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25] },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
      clearTimeout(debounce.current);
    };
  }, [play]);

  const pickReason = (r: ReasonKey) => {
    setS((s) => ({ ...s, r, pay: RS[r].def, ...startFrom(RS[r].def) }));
    setTick((t) => t + 1);
    play();
  };
  const pickPay = (pay: number) => {
    setS((s) => ({ ...s, pay, ...startFrom(pay) }));
    setTick((t) => t + 1);
    play();
  };
  // Interest illustration. A rotation count that does not fit in the year is not offered (the chip is disabled),
  // and choosing longer rotations brings the count down to the most that fit.
  const pickRot = (rot: number) => setS((s) => ({ ...s, rot: Math.min(rot, fitRotations(s.idays)) }));
  const pickIntDays = (idays: number) => setS((s) => ({ ...s, idays, rot: Math.min(s.rot, fitRotations(idays)) }));
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
            <b>Interest over a full year</b> on the same amount
          </span>
          <span className="int-assume">Same rate on both</span>
        </div>
        <p className="int-lead">
          {`Choose how many times you use the money in a year and for how many days each time. Valuefin charges interest only for those days. A 12-month term loan charges for all ${YEAR}.`}
        </p>
        <div className="int-ctl">
          <div className="grp">
            <span className="glabel" id="intRotL">
              Rotations in a year
            </span>
            <div className="chips" id="intRot" role="group" aria-labelledby="intRotL" aria-describedby="intFit">
              {INT_ROTS.map((n) => (
                <button
                  type="button"
                  key={n}
                  className={'chip' + (n === o.rot ? ' on' : '')}
                  data-n={n}
                  aria-pressed={n === o.rot}
                  disabled={n > o.rotFit}
                  onClick={() => pickRot(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="grp">
            <span className="glabel" id="intDaysL">
              Days in each rotation
            </span>
            <div className="chips" id="intDays" role="group" aria-labelledby="intDaysL">
              {INT_DAYS.map((d) => (
                <button
                  type="button"
                  key={d}
                  className={'chip' + (d === S.idays ? ' on' : '')}
                  data-d={d}
                  aria-pressed={d === S.idays}
                  onClick={() => pickIntDays(d)}
                >
                  {d} days
                </button>
              ))}
            </div>
          </div>
          <p className="int-fit" id="intFit">
            {o.intFit}
          </p>
        </div>
        <div className="int-grid">
          <div className="int-bars">
            <div className="int-row vf">
              <div className="int-l">
                <span id="intVfL">{o.intVfL}</span>
                <em id="intVf">{o.intVf}</em>
                <small id="intVfS">{o.intVfS}</small>
              </div>
              <div className="int-track seg" aria-hidden="true">
                {o.vfSegs.map((s, i) => (
                  <i key={i} style={{ left: `${s.left}%`, width: `${s.width}%` }} />
                ))}
              </div>
            </div>
            <div className="int-row tl">
              <div className="int-l">
                <span>Term loan, 12 months</span>
                <em id="intTl">{o.intTl}</em>
                <small>{`Fixed term, interest for all ${YEAR} days`}</small>
              </div>
              <div className="int-track seg" aria-hidden="true">
                <i style={{ left: 0, width: '100%' }} />
              </div>
            </div>
            <div className="int-axis" aria-hidden="true">
              <span>Day 0</span>
              <span>{`Day ${YEAR}`}</span>
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
        <div className="int-why">
          <div className="iw">
            <span className="is-l">Effective rate on the term loan</span>
            <span className="is-t" id="intEffT">
              {o.intEffT}
            </span>
          </div>
          <div className="iw">
            <span className="is-l">If the term loan rate is lower</span>
            <span className="is-t" id="intLowT">
              {o.intLowT}
            </span>
          </div>
        </div>
        <p className="int-note">
          {`// Illustrative and interest only. Both sides use the same rate on the same amount, so the only difference is the number of days. Valuefin is charged only while the money is in use, with about ${ROTATION_GAP} days between rotations. The term loan is a 12-month loan with the amount outstanding for the full term. Fees and taxes are not included on either side. Actual rates, fees and terms will change the result.`}
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
