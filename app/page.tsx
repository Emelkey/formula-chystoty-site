import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінг у Черкасах — ціни від 55 грн/м² | Формула Чистоти",
  description: "Клінінг у Черкасах для квартир, будинків і бізнесу. Підтримуюче прибирання від 55 грн/м², генеральне від 100 грн/м², після ремонту від 120 грн/м². Розрахунок за фото.",
  path: "/"
});

export default function Page() {
  return <HomePageContent />;
}
