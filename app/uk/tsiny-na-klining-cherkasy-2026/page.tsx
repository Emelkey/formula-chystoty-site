import type { Metadata } from "next";
import { PricesSeoPage } from "@/components/PricesSeoPage";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Прайс на клінінгові послуги у Черкасах 2026 | Формула Чистоти",
  description:
    "Прайс на клінінгові послуги у Черкасах на 2026 рік: квартири, будинки, офіси, магазини, хімчистка меблів, миття вікон і післяремонтне прибирання.",
  path: "/tsiny",
  image: "/images/hero/professional-floor-cleaning-hero.webp"
});

export default function Page() {
  return (
    <PricesSeoPage
      canonicalPath="/tsiny"
      heading="Прайс на клінінгові послуги у Черкасах 2026"
      schemaName="Прайс на клінінгові послуги у Черкасах 2026"
    />
  );
}
