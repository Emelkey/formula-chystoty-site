import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata, homeFaq } from "@/lib/site";

const popularCleaningServices = [
  { href: "/generalne-prybyrannya-cherkasy", label: "Генеральне прибирання у Черкасах" },
  { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "Генеральне прибирання квартири" },
  { href: "/prybyrannya-pislya-remontu-cherkasy", label: "Прибирання після ремонту та будівництва" },
  { href: "/himchystka-mebliv-cherkasy", label: "Хімчистка меблів" },
  { href: "/himchystka-dyvana-cherkasy", label: "Хімчистка дивана" },
  { href: "/myttya-vikon-cherkasy", label: "Миття вікон" },
  { href: "/prybyrannya-budynkiv-cherkasy", label: "Прибирання будинків" },
  { href: "/prybyrannya-ofisiv-cherkasy", label: "Прибирання офісів" },
  { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "Регулярне прибирання для бізнесу" },
  { href: "/prybyrannya-mahazyniv-supermarketiv-cherkasy", label: "Прибирання магазинів і супермаркетів" },
  { href: "/prybyrannya-restoraniv-kafe-cherkasy", label: "Прибирання ресторанів і кафе" },
  { href: "/prybyrannya-vyrobnychykh-prymishchen-cherkasy", label: "Прибирання виробничих приміщень" },
  { href: "/prybyrannya-skladiv-cherkasy", label: "Прибирання складів" },
  { href: "/prybyrannya-medychnykh-tsentriv-cherkasy", label: "Прибирання медичних центрів" },
  { href: "/prybyrannya-pislya-pozhezhi-cherkasy", label: "Прибирання після пожежі" },
  { href: "/dezinfektsiya-prymishchen-cherkasy", label: "Дезінфекція та прибирання після трупу" }
];

export const metadata: Metadata = buildMetadata({
  title: "Клінінгові послуги у Черкасах | Формула Чистоти",
  description: "Усі послуги клінінгової компанії Формула Чистоти у Черкасах: прибирання квартир, будинків, комерційних приміщень, після ремонту, миття вікон, хімчистка меблів.",
  path: "/poslugy"
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Послуги", href: "/poslugy" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Клінінгові послуги у Черкасах</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Повний перелік послуг для квартир, будинків, комерційних приміщень, складних об’єктів і післяремонтного клінінгу.</p>
          <div className="mt-10"><ServicesGrid /></div>
        </div>
      </section>
      <section className="section bg-brand-mist">
        <div className="container">
          <SectionHeading eyebrow="Популярні послуги" title="Популярні клінінгові послуги в Черкасах" description="Швидкі переходи до умов, цін і прикладів робіт за послугами, які часто замовляють клієнти Формули Чистоти." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularCleaningServices.map((link) => (
              <a className="rounded-lg border border-brand-green/15 bg-white p-5 text-base font-semibold text-brand-hover shadow-soft transition hover:-translate-y-1 hover:border-brand-green" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
      <FAQSection faq={homeFaq} />
    </>
  );
}
