import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінгова компанія у Черкасах | Формула Чистоти",
  description: "Формула Чистоти — локальна клінінгова компанія у Черкасах для житла, бізнесу та складних об’єктів. Команда, професійна хімія, свій інвентар і зрозумілий розрахунок.",
  path: "/"
});

export default function Page() {
  return <HomePageContent />;
}
