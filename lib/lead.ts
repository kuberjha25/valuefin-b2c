import { FORMS, allFields, needOneGroups, type FormKind } from '@/components/forms/formConfig';

/**
 * True while no place to send applications is configured. In that state the forms still
 * validate and show the thank-you message, but nothing leaves the browser, and a visible
 * demo note is shown. Read at build time, so rebuild after changing the variables.
 */
export function isDemoMode(): boolean {
  const smtp = !!(process.env.SMTP_HOST && process.env.MAIL_TO);
  return !smtp && !process.env.LEAD_WEBHOOK_URL && !process.env.NEXT_PUBLIC_FORM_ENDPOINT;
}

export type LeadValue = string | string[];
export type LeadFields = Record<string, LeadValue>;

const MAX_LEN = 4000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isFormKind(v: unknown): v is FormKind {
  return v === 'founder' || v === 'vc';
}

function clean(v: unknown): string {
  return (typeof v === 'string' ? v : '').replace(/\r\n/g, '\n').trim().slice(0, MAX_LEN);
}

/**
 * Keeps only the fields the form defines, trims them, and reports what is missing.
 * Returns the cleaned fields and a list of problems (empty when all is well).
 */
export function checkLead(kind: FormKind, raw: Record<string, unknown>): { fields: LeadFields; problems: string[] } {
  const cfg = FORMS[kind];
  const problems: string[] = [];
  const fields: LeadFields = {};
  const needOne = new Set(needOneGroups(cfg));

  for (const f of allFields(cfg)) {
    const v = raw[f.name];
    if (f.type === 'picks' && f.kind === 'checkbox') {
      const list = (Array.isArray(v) ? v : v ? [v] : []).map(clean).filter(Boolean);
      const allowed = new Set(f.options);
      const kept = list.filter((x) => allowed.has(x));
      if (kept.length) fields[f.name] = kept;
      if (needOne.has(f.name) && !kept.length) problems.push(f.name);
      continue;
    }
    const s = clean(Array.isArray(v) ? v[0] : v);
    if (s) fields[f.name] = s;
    if (f.required && !s) problems.push(f.name);
    if (f.type === 'text' && f.inputType === 'email' && s && !EMAIL.test(s)) problems.push(f.name);
  }

  const consent = clean(Array.isArray(raw.consent) ? raw.consent[0] : raw.consent);
  if (!consent) problems.push('consent');
  return { fields, problems };
}

/** A readable version of the fields, using the labels people saw on the form. */
export function readableLead(kind: FormKind, fields: LeadFields): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of allFields(FORMS[kind])) {
    const v = fields[f.name];
    if (v === undefined) continue;
    out[f.label] = Array.isArray(v) ? v.join(', ') : v;
  }
  return out;
}
