import type { Metadata } from "next";
import { PricesSeoPage } from "@/components/PricesSeoPage";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Ціни на клінінг у Черкасах 2026 — Формула Чистоти",
  description:
    "Актуальні ціни на прибирання квартир, будинків, комерційних приміщень, хімчистку меблів, миття вікон та клінінг після ремонту у Черкасах. Формула Чистоти — професійна команда, техніка, хімія та контроль якості.",
  path: "/tsiny",
  image: "/images/hero/professional-floor-cleaning-hero.webp"
});

export default function PricesPage() {
  return <PricesSeoPage />;
}
