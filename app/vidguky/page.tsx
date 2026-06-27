import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Відгуки клієнтів про Формула Чистоти | Черкаси",
  description: "Відгуки клієнтів про клінінгову компанію Формула Чистоти у Черкасах. Реальні враження після прибирання квартир, будинків, офісів та комерційних об’єктів.",
  path: "/vidguky"
});

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Відгуки", href: "/vidguky" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Відгуки клієнтів</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Враження клієнтів після прибирання квартир, будинків, офісів і комерційних приміщень.</p>
        </div>
      </section>
      <ReviewsSection />
      <CTASection />
    </>
  );
}
