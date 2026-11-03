# Valuefin website (Next.js)

The Valuefin Credit marketing site, ported page for page from the final static site: ten pages, the same design, copy and behaviour, built with Next.js (App Router) and generated as static HTML at build time. Every page already contains its full content before any JavaScript runs, which is what search engines and slow phones see first.

## Run it

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build && npm start  # production build, http://localhost:3000
npm run typecheck
```

Needs Node 20.9 or newer. Built and tested on Node 22. `package-lock.json` is included, so `npm ci` gives the exact versions used here.

## Before you go live

1. **Domain.** Set `NEXT_PUBLIC_SITE_URL` (for example `https://valuefin.in`). It feeds canonical links, the sitemap, share images and structured data.
2. **Forms.** Set `LEAD_WEBHOOK_URL` to wherever applications should land: a CRM webhook, Zapier, Make, n8n, a Google Apps Script, a Slack or Teams workflow. Optionally set `LEAD_WEBHOOK_TOKEN`, sent as the `X-Webhook-Token` header. Until one of them is set the forms run in demo mode: they validate and show the thank-you message, send nothing, and display a visible "Demo form" note. **Rebuild after changing these values**, because the demo note is decided at build time.
3. **Company details.** Fill the empty fields in `lib/site.ts`: RBI Certificate of Registration number, CIN, registered office, grievance officer, phone. They appear in the footer and the apply page, and in the structured data. When compliance has approved the disclosure wording, set `disclosureConfirmed: true` and the reminder in the footer disappears.
4. **Compliance review of the illustrative rate.** The funding planner on the home page compares Valuefin with a 12-month term loan, both at an illustrative 18% a year, and one FAQ answer ("What does it cost?") mentions it. Rates are not stated anywhere else on the site. That FAQ answer is kept out of the structured data on purpose. Confirm both with compliance before launch. The rate is `VF_RATE` and `TL_RATE` near the top of `components/home/Planner.tsx`.
5. **Search engines.** After launch, add the site in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, and ask for the home page to be indexed. If you verify by meta tag, put the codes in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

All variables are listed in `.env.example`. Copy it to `.env.local` for local work and set the same names at your host.

## Deploy

- **Vercel.** Import the repository, add the environment variables, deploy. No other setting is needed.
- **Any Node server.** `npm run build`, then `npm start` (set `PORT` if needed), behind a reverse proxy with HTTPS.
- **Static hosting (S3 and CloudFront, plain Netlify, GitHub Pages).** Tested. Delete the `app/api` folder, add `output: 'export'` to `next.config.ts`, set `NEXT_PUBLIC_FORM_ENDPOINT` to a form service the browser can post to, and run `npm run build`. The site is then in `out/`. Redirects and security headers are not applied by an export, so configure them at the host (the rules are in `next.config.ts`).

Old addresses such as `/quick-cash.html` redirect permanently to the clean ones (`/quick-cash`). Security headers (nosniff, frame denial, referrer policy, permissions policy, HSTS) are set for every route. HSTS covers this host only. Add `; includeSubDomains` in `next.config.ts` once every subdomain of your domain is served over HTTPS.

## How the forms work

The two forms (founder and VC or fund) are defined in `components/forms/formConfig.ts`: fields, options, and the thank-you text. The browser checks them, and `/api/lead` checks them again on the server, drops any field the form does not define, quietly discards posts that fill the hidden trap field, and forwards the rest to your webhook as JSON:

```json
{
  "form": "founder",
  "submittedAt": "2026-11-03T10:15:00.000Z",
  "page": "/apply",
  "fields": { "name": "Asha Rao", "purpose": ["Marketplace purchase order"] },
  "readable": { "Your name": "Asha Rao", "What do you need it for?": "Marketplace purchase order" }
}
```

`readable` uses the labels people saw on the form, so it can go straight into an email or a Slack message. If delivery fails, the visitor sees an error with your email address, so a lead is never lost silently. Tested end to end against a live webhook: valid and invalid submissions, spam, an unreachable webhook, and a missing configuration.

## Where things live

| To change | Edit |
| --- | --- |
| Page text and layout | `app/<page>/page.tsx` (the home page is `app/page.tsx`) |
| Titles, descriptions, share-image text, sitemap priority | `lib/pages.ts` |
| FAQ (also feeds the FAQ structured data) | `lib/faq.ts` |
| Company details, site description | `lib/site.ts` |
| Form fields and options | `components/forms/formConfig.ts` |
| Colours, fonts, spacing | top of `app/globals.css` |

Titles should stay near 60 characters and descriptions near 160 so search results do not cut them.

## Search and discovery, built in

- A unique title, description, canonical link, Open Graph and Twitter card for every page, with a 1200 by 630 share image for each, generated at build time (`/og/<page>.png`).
- Structured data (JSON-LD): Organization, WebSite, BreadcrumbList, a page type for each page, Service for Quick Cash and Rocket Fuel, and FAQPage for the FAQ.
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, favicon set. The sitemap carries no "last modified" dates on purpose.
- One `h1` per page and no skipped heading levels. A few visually hidden `h2` headings (class `sr-only`) keep the outline correct.
- All content is in the page before JavaScript runs. With scripts off, the counters, the typing line, the planner and the timeline all show real values.
- Fonts (Unbounded, Inter Tight, JetBrains Mono) are served from the site itself, so no visit makes a request to Google Fonts or any other third party. Their open font licences are in `app/fonts/LICENSES`.

## Speed

Measured with Lighthouse on a production build, using the standard mobile test (simulated slow 4G and a 4x slower processor):

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home, mobile | 86 to 96, usually above 90 | 96 | 100 | 100 |
| Inner pages, mobile | 93 to 97 | 95 to 100 | 100 | 100 |
| Home, desktop | 100 | 96 | 100 | 100 |

Lighthouse reports a layout shift of 0 on every page, on phones and on desktop. The mobile home score moves a few points from run to run. One rule in `app/globals.css` is there for a reason: on phones up to 464px wide, the line that types itself in the home page hero keeps room for two lines, so the text below it never jumps as the phrases type and delete. Please keep it.

## Accessibility

Everything automated passes except colour contrast. The brand teal (`#0c9e85`) and gold (`#a87b2e`) fall short of the 4.5 to 1 ratio for small text, in the teal buttons with white text, the small teal labels and unit words on the cream background, and the gold form note. The palette is unchanged here because it is the approved design. If you want the stricter ratio, change `--teal` to `#097d69` and `--gold` to `#8d6727` in `app/globals.css`. Both are slightly darker, and both pass on cream and on white.

## Notes

- The page files are maintained by hand. There is no CMS and no build step that rewrites them.
- Tenor is stated in days throughout the site. The one exception is the "12 months or more" term loan comparison.
