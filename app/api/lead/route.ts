import { NextResponse } from 'next/server';
import { checkLead, isFormKind, readableLead } from '@/lib/lead';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 64 * 1024;
const noStore = { 'Cache-Control': 'no-store' };

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: noStore });
}

/**
 * Receives an application from either form, checks it again on the server,
 * and passes it on as JSON to LEAD_WEBHOOK_URL (a CRM, Zapier, Make, n8n, Slack, an Apps Script, anything that takes a POST).
 */
export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) return reply({ ok: false, error: 'too_large' }, 413);

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return reply({ ok: false, error: 'not_configured' }, 503);

  // Read the body, as a form post or as JSON.
  const raw: Record<string, unknown> = {};
  try {
    const type = request.headers.get('content-type') || '';
    if (type.includes('application/json')) {
      Object.assign(raw, await request.json());
    } else {
      const data = await request.formData();
      for (const key of new Set(data.keys())) {
        const all = data.getAll(key).filter((v): v is string => typeof v === 'string');
        raw[key] = all.length > 1 ? all : (all[0] ?? '');
      }
    }
  } catch {
    return reply({ ok: false, error: 'bad_body' }, 400);
  }

  // Hidden trap field: people never fill it in, simple bots do. Answer as if it worked.
  if (typeof raw._gotcha === 'string' && raw._gotcha.trim() !== '') return reply({ ok: true });

  const kind = raw._form;
  if (!isFormKind(kind)) return reply({ ok: false, error: 'unknown_form' }, 400);

  const { fields, problems } = checkLead(kind, raw);
  if (problems.length) return reply({ ok: false, error: 'invalid', fields: problems }, 422);

  const page = typeof raw._page === 'string' ? raw._page.slice(0, 200) : '';
  const payload = {
    form: kind,
    submittedAt: new Date().toISOString(),
    page,
    fields,
    readable: readableLead(kind, fields),
  };

  try {
    const token = process.env.LEAD_WEBHOOK_TOKEN;
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { 'X-Webhook-Token': token } : {}) },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });
    if (!res.ok) return reply({ ok: false, error: 'upstream' }, 502);
  } catch {
    return reply({ ok: false, error: 'upstream' }, 502);
  }

  return reply({ ok: true });
}
