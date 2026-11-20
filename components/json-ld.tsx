import { serializeJsonLd } from "@/lib/seo";

export interface JsonLdProps {
  id?: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Reusable server-safe JSON-LD script injector following Next.js App Router guidance.
 */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
