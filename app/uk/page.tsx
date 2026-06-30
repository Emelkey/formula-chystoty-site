import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінгова компанія Черкаси — прибирання квартир, будинків і офісів | Формула Чистоти",
  description: "Формула Чистоти — професійна клінінгова компанія у Черкасах: квартири, будинки, офіси, магазини, ТРЦ, миття вікон, хімчистка меблів і килимів.",
  path: "/uk"
});

export default function Page() {
  return <HomePageContent />;
}
