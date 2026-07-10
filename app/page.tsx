import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінг Черкаси — прибирання квартир, офісів і будинків | Формула Чистоти",
  description: "Професійний клінінг у Черкасах: прибирання квартир, будинків, офісів, магазинів і комерційних приміщень. Генеральне, підтримуюче, після ремонту, миття вікон, хімчистка меблів. Виїзд по Черкасах та області.",
  path: "/"
});

export default function Page() {
  return <HomePageContent />;
}
