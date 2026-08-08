import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { buildMetadata, getService } from "@/lib/site";

const service = getService("prybyrannya-medychnykh-tsentriv-cherkasy")!;

export const metadata: Metadata = buildMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: `/${service.slug}`,
  image: service.image
});

export default function MedicalCenterCleaningPage() {
  return <ServicePageLayout service={service} />;
}
