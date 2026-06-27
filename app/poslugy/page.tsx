import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata, homeFaq } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінгові послуги у Черкасах | Формула Чистоти",
  description: "Усі послуги клінінгової компанії Формула Чистоти у Черкасах: прибирання квартир, будинків, офісів, після ремонту, миття вікон, хімчистка меблів.",
  path: "/poslugy"
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Послуги", href: "/poslugy" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Клінінгові послуги у Черкасах</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Повний перелік послуг для квартир, будинків, офісів, магазинів, супермаркетів і комерційних приміщень.</p>
          <div className="mt-10"><ServicesGrid /></div>
        </div>
      </section>
      <CTASection />
      <FAQSection faq={homeFaq} />
    </>
  );
}
