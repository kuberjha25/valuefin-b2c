'use client';

import { useState } from 'react';

type Mode = 'qc' | 'rf';

const NOTES: Record<Mode, string> = {
  qc: 'Quick Cash is tied to an order. The money goes where the order needs it, and it repays when the order pays.',
  rf: 'Rocket Fuel is one pool. Inventory, marketing, a new city, a hire. You choose where it works hardest, sized off your verified revenue.',
};

/** Quick Cash against Rocket Fuel: a toggle that shows what each product can be spent on. */
export function Pool() {
  const [mode, setMode] = useState<Mode>('qc');

  return (
    <div className="pool rv" id="pool" data-mode={mode}>
      <div className="pool-tog">
        <button type="button" className={mode === 'qc' ? 'on' : undefined} data-m="qc" aria-pressed={mode === 'qc'} onClick={() => setMode('qc')}>
          Quick Cash
        </button>
        <button type="button" className={mode === 'rf' ? 'on' : undefined} data-m="rf" aria-pressed={mode === 'rf'} onClick={() => setMode('rf')}>
          Rocket Fuel
        </button>
      </div>
      <div className="pool-items">
        <div className="pool-item">
          <b>Fulfil a marketplace purchase order</b>
          <span className="s-on">Funded</span>
        </div>
        <div className="pool-item wait">
          <b>Stock for the season</b>
          <span className="s-on">Funded</span>
          <span className="s-wait">Not tied to an order</span>
        </div>
        <div className="pool-item wait">
          <b>A marketing push</b>
          <span className="s-on">Funded</span>
          <span className="s-wait">Not tied to an order</span>
        </div>
        <div className="pool-item wait">
          <b>A new city or geography</b>
          <span className="s-on">Funded</span>
          <span className="s-wait">Not tied to an order</span>
        </div>
      </div>
      <p className="pool-note" id="poolNote" aria-live="polite">
        {NOTES[mode]}
      </p>
    </div>
  );
}
