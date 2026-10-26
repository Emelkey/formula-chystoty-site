import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { buildMetadata, getService } from "@/lib/site";

const service = getService("rehulyarne-prybyrannya-biznesu-cherkasy")!;

export const metadata: Metadata = buildMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: `/${service.slug}`,
  image: service.image
});

export default function RecurringBusinessCleaningPage() {
  return <ServicePageLayout service={service} />;
}
