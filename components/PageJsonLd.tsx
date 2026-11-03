import { JsonLd } from '@/components/JsonLd';
import { pageGraph } from '@/lib/jsonld';
import type { PageKey } from '@/lib/pages';

/** Structured data for a page: organisation, website, breadcrumbs and the page's own details. */
export function PageJsonLd({ page }: { page: PageKey }) {
  return <JsonLd data={pageGraph(page)} />;
}
