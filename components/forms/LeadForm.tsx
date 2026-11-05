'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  FORMS,
  needOneGroups,
  type AreaField,
  type Field,
  type FormKind,
  type PicksField,
  type SelectField,
  type TextField,
} from './formConfig';

/** Where applications are posted. A form service address if one is set, otherwise this site's own endpoint. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/lead';

function Label({ htmlFor, text, required }: { htmlFor: string; text: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor}>
      {text}
      {required ? (
        <>
          {' '}
          <i className="req">*</i>
        </>
      ) : null}
    </label>
  );
}

function renderField(f: Field, shown: Record<string, string>, invalid: Set<string>) {
  switch (f.type) {
    case 'text':
      return <TextInput key={f.name} f={f} hidden={!!f.showIf && shown[f.showIf.name] !== f.showIf.value} />;
    case 'select':
      return <SelectInput key={f.name} f={f} />;
    case 'area':
      return <AreaInput key={f.name} f={f} />;
    case 'picks':
      return <Picks key={f.name} f={f} invalid={invalid.has(f.name)} />;
  }
}

function TextInput({ f, hidden }: { f: TextField; hidden: boolean }) {
  return (
    <div className={'field' + (f.showIf ? ' cond' : '')} hidden={hidden || undefined}>
      <Label htmlFor={f.name} text={f.label} required={f.required} />
      <input
        type={f.inputType || 'text'}
        id={f.name}
        name={f.name}
        placeholder={f.placeholder}
        autoComplete={f.autoComplete}
        required={f.required}
      />
    </div>
  );
}

function SelectInput({ f }: { f: SelectField }) {
  return (
    <div className="field">
      <Label htmlFor={f.name} text={f.label} required={f.required} />
      <select id={f.name} name={f.name} required={f.required} defaultValue="">
        <option value="">{f.first || 'Select'}</option>
        {f.options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function AreaInput({ f }: { f: AreaField }) {
  return (
    <div className="field">
      <Label htmlFor={f.name} text={f.label} required={f.required} />
      <textarea id={f.name} name={f.name} placeholder={f.placeholder} required={f.required} />
    </div>
  );
}

function Picks({ f, invalid }: { f: PicksField; invalid: boolean }) {
  const needOne = f.kind === 'checkbox' && !!f.required;
  return (
    <div className={'field' + (invalid ? ' invalid' : '')} data-need-one={needOne ? '' : undefined} data-group={f.name}>
      <span className="flabel">
        {f.label}
        {f.required ? (
          <>
            {' '}
            <i className="req">*</i>
          </>
        ) : null}
      </span>
      {f.hint ? <span className="hint2">{f.hint}</span> : null}
      <div className="picks">
        {f.options.map((o, i) => (
          <label className="pick" key={o}>
            <input type={f.kind} name={f.name} value={o} required={f.required && f.kind === 'radio' && i === 0} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function LeadForm({ kind, demo }: { kind: FormKind; demo: boolean }) {
  const cfg = FORMS[kind];
  const needOne = needOneGroups(cfg);
  const formRef = useRef<HTMLFormElement>(null);

  const [shown, setShown] = useState<Record<string, string>>({});
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onChange(e: ChangeEvent<HTMLFormElement>) {
    const t = e.target;
    // Conditional fields follow radio groups, for example "Which investors back you?" after "Yes".
    if (t instanceof HTMLInputElement && t.type === 'radio') {
      setShown((s) => ({ ...s, [t.name]: t.value }));
    }
    // A checkbox group stops being flagged once something is ticked.
    const group = t.closest('[data-need-one]');
    if (group instanceof HTMLElement && group.dataset.group) {
      const name = group.dataset.group;
      setInvalid((prev) => {
        if (!prev.has(name)) return prev;
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }
  }

  function finish() {
    setFailed(false);
    setSent(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const missing = needOne.filter((n) => !form.querySelector(`input[name="${n}"]:checked`));
    setInvalid(new Set(missing));
    if (missing.length) {
      form
        .querySelector(`[data-group="${missing[0]}"]`)
        ?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'center' });
      return;
    }

    if (demo) {
      finish();
      return;
    }

    setBusy(true);
    setFailed(false);
    try {
      const body = new FormData(form);
      body.append('_page', window.location.pathname);
      const res = await fetch(ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('bad response');
      finish();
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="form long rv"
      data-form={kind}
      data-sent={sent ? '' : undefined}
      autoComplete="on"
      onChange={onChange}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="_form" value={kind} />
      <div className="hp" aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-label="Leave this field empty" />
      </div>

      {cfg.sections.map((s, i) => (
        <div className="fsec" key={s.title}>
          <div className="fsec-h">
            <span className="fn">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{s.title}</h3>
              <small>{s.sub}</small>
            </div>
          </div>
          {s.items.map((it, k) =>
            Array.isArray(it) ? (
              <div className="frow" key={k}>
                {it.map((f) => renderField(f, shown, invalid))}
              </div>
            ) : (
              renderField(it, shown, invalid)
            ),
          )}
        </div>
      ))}

      <div className="form-foot">
        <label className="consent">
          <input type="checkbox" name="consent" required />
          <span>
            I agree that Valuefin may contact me about this request. <i className="req">*</i>
          </span>
        </label>
        <button type="submit" className="btn btn-solid" disabled={busy} aria-busy={busy || undefined}>
          SEND <span className="a">→</span>
        </button>
        <p className="form-err" role="alert" hidden={!failed}>
          Something went wrong while sending. Please try again, or email sonali@valuefin.in.
        </p>
        {demo ? (
          <p className="fnote">
            <span className="ph-note">Demo form: connect to your CRM before launch</span>
          </p>
        ) : null}
      </div>

      <div className="form-ok" role="status" aria-live="polite">
        <h3>Thank you.</h3>
        <p>{cfg.thanks}</p>
      </div>
    </form>
  );
}
