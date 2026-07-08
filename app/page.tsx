import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінг Черкаси — прибирання квартир, офісів і будинків | Формула Чистоти",
  description: "Клінінг у Черкасах від Формули Чистоти: прибирання квартир, будинків, офісів, після ремонту, миття вікон і хімчистка меблів.",
  path: "/"
});

export default function Page() {
  return <HomePageContent />;
}
