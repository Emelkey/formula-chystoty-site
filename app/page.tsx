import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінг Черкаси — прибирання квартир, будинків і комерції | Формула Чистоти",
  description: "Професійний клінінг у Черкасах: прибирання квартир, будинків, комерційних приміщень, після ремонту, миття вікон і хімчистка меблів. Виїзд по Черкасах та області.",
  path: "/"
});

export default function Page() {
  return <HomePageContent />;
}
