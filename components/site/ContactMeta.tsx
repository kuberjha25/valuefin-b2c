import { site } from '@/lib/site';

/** Email and phone, shown beside the application forms. The phone shows a placeholder until site.phone is filled in. */
export function ContactMeta() {
  return (
    <div className="c-meta">
      <a href={`mailto:${site.email}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="#0C9E85" strokeWidth="1.8" />
          <path d="M3 7l9 6 9-6" stroke="#0C9E85" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>{' '}
        {site.email}
      </a>{' '}
      {site.phone ? (
        <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
              stroke="#0C9E85"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{' '}
          {site.phone}
        </a>
      ) : (
        <span className="ph-note">Phone number: to be added</span>
      )}
    </div>
  );
}
