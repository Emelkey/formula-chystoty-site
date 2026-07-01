import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { buildMetadata, getService } from "@/lib/site";

const service = getService("himchystka-kylymiv-cherkasy")!;

export const metadata: Metadata = buildMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/${service.slug}`, image: service.image });

export default function Page() {
  return <ServicePageLayout service={service} />;
}
