import nodemailer, { type Transporter } from 'nodemailer';
import type { FormKind } from '@/components/forms/formConfig';
import type { LeadFields } from '@/lib/lead';

/** True when the SMTP variables needed to send a lead by email are all set. */
export function isSmtpConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.MAIL_TO);
}

let cached: Transporter | null = null;

function transport(): Transporter {
  if (cached) return cached;
  const port = Number(process.env.SMTP_PORT || 587);
  // Port 465 uses TLS from the start. Other ports (587, 25) upgrade with STARTTLS.
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
  const user = process.env.SMTP_USER;
  // The name this server gives itself when it greets the mail server (EHLO). Without it nodemailer can fall back
  // to "[127.0.0.1]", which some providers (Rediffmail Pro, for one) reject with "Invalid HeloHost".
  const helo = process.env.SMTP_HELO_NAME || user?.split('@')[1] || undefined;
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    name: helo,
    auth: user ? { user, pass: process.env.SMTP_PASS || '' } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return cached;
}

const FORM_NAMES: Record<FormKind, string> = {
  founder: 'Founder application',
  vc: 'VC / fund partnership',
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Header values must stay on one line. */
function oneLine(s: string, max = 120): string {
  return s.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadMail = {
  kind: FormKind;
  fields: LeadFields;
  readable: Record<string, string>;
  page: string;
  submittedAt: string;
};

/** Emails one lead to MAIL_TO. Throws if the SMTP server refuses it. */
export async function sendLeadEmail({ kind, fields, readable, page, submittedAt }: LeadMail): Promise<void> {
  const str = (k: string) => (typeof fields[k] === 'string' ? (fields[k] as string) : '');
  const who = str('name');
  const org = str('company') || str('fund');
  const email = str('email');

  const subject = oneLine(`New ${FORM_NAMES[kind]}: ${[who, org].filter(Boolean).join(', ') || 'website form'}`, 200);
  const when = new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const rows = Object.entries(readable);
  const text = [
    `${FORM_NAMES[kind]} received ${when} IST from ${page || 'the website'}.`,
    '',
    ...rows.map(([label, value]) => `${label}:\n${value}\n`),
  ].join('\n');

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f5f4;font-family:Arial,Helvetica,sans-serif;color:#1c1917">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:8px">
<tr><td style="padding:20px 24px;border-bottom:1px solid #e7e5e4">
<div style="font-size:18px;font-weight:bold">${escapeHtml(FORM_NAMES[kind])}</div>
<div style="font-size:13px;color:#78716c;margin-top:4px">${escapeHtml(when)} IST &middot; ${escapeHtml(page || 'website')}</div>
</td></tr>
${rows
  .map(
    ([label, value]) => `<tr><td style="padding:12px 24px;border-bottom:1px solid #f5f5f4">
<div style="font-size:12px;color:#78716c;text-transform:uppercase;letter-spacing:.04em">${escapeHtml(label)}</div>
<div style="font-size:15px;margin-top:4px;white-space:pre-wrap">${escapeHtml(value)}</div>
</td></tr>`,
  )
  .join('\n')}
<tr><td style="padding:16px 24px;font-size:12px;color:#a8a29e">Reply to this email to answer ${escapeHtml(who || 'the sender')} directly.</td></tr>
</table></body></html>`;

  // MAIL_FROM can be a bare address or "Name <address>". Most providers require it to match SMTP_USER or a verified sender.
  const from = process.env.MAIL_FROM || (process.env.SMTP_USER ? `"Valuefin website" <${process.env.SMTP_USER}>` : undefined);
  await transport().sendMail({
    from,
    to: process.env.MAIL_TO,
    cc: process.env.MAIL_CC || undefined,
    replyTo: EMAIL.test(email) ? { name: oneLine(who) || email, address: email } : undefined,
    subject,
    text,
    html,
  });
}
