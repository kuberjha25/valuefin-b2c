import Link from 'next/link';
import { site } from '@/lib/site';
import { Brand } from './Brand';
import { Year } from './Year';

/** Shows a value from the site config, or a highlighted "to be added" until it is filled in. */
function Filled({ value }: { value: string }) {
  return value ? <>{value}</> : <span className="phv">to be added</span>;
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="f-top">
          <div className="f-brand">
            <Brand id="lgB" className="brand brand-f" />
            <p>{site.tagline}</p>
          </div>
          <nav className="f-col" aria-label="Products">
            <span className="f-h">Products</span>
            <Link href="/quick-cash">Quick Cash</Link>
            <Link href="/rocket-fuel">Rocket Fuel</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/who-we-fund">Who we fund</Link>
          </nav>
          <nav className="f-col" aria-label="Company">
            <span className="f-h">Company</span>
            <Link href="/why-valuefin">Why Valuefin</Link>
            <Link href="/for-vcs">For VCs</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/apply">Apply for funding</Link>
            <Link href="/partner">Partner with us</Link>
          </nav>
        </div>
        <div className="f-legal">
          <div className="f-comp">
            <span>{site.legalName}</span>
            <span>
              CoR No. <Filled value={site.cor} />
            </span>
            <span>
              CIN <Filled value={site.cin} />
            </span>
            <span>
              Registered office: <Filled value={site.registeredOffice} />
            </span>
            <span>
              Grievance officer: <Filled value={site.grievanceOfficer} />
            </span>
          </div>
          <p className="f-disc">
            {site.legalName} is a Non-Banking Financial Company registered with the Reserve Bank of India. Credit facilities are extended at the sole discretion of Valuefin and are subject to eligibility, underwriting and documentation. The funding planner, sector structures and examples on this website are indicative and are not an offer to lend. Timelines shown are typical and depend on how quickly documentation is completed. Marketplace and company names are used only to describe the kinds of receivables we finance. They belong to their respective owners and imply no affiliation or endorsement.
            {site.disclosureConfirmed ? null : (
              <>
                {' '}
                <span className="phv">[Confirm final regulatory disclosure wording with compliance.]</span>
              </>
            )}
          </p>
          <div className="f-base">
            <span>
              © <Year initial={new Date().getFullYear()} /> VALUEFIN CREDIT PRIVATE LIMITED
            </span>
            <span>MADE IN INDIA · BUILT FOR FOUNDERS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
