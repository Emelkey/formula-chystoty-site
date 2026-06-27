import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { PricingSection } from "@/components/PricingSection";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Ціни на клінінг у Черкасах | Формула Чистоти",
  description: "Актуальні ціни на прибирання у Черкасах: квартири, будинки, офіси, прибирання після ремонту, миття вікон, хімчистка меблів.",
  path: "/tsiny"
});

export default function PricesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Ціни", href: "/tsiny" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Ціни на клінінгові послуги у Черкасах</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Тут зібрані реальні тарифи на прибирання після ремонту, генеральне та підтримуюче прибирання, миття вікон, хімчистку меблів, килимів і додаткові послуги.</p>
        </div>
      </section>
      <PricingSection />
      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Від чого залежить вартість" description="На ціну впливають площа, тип прибирання, кількість санвузлів, стан поверхонь, доступ до вікон, терміновість і додаткові роботи." />
            <SectionHeading title="Що входить у ціну" description="Команда, інвентар, професійна хімія, базовий регламент робіт і фінальна перевірка результату." />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
