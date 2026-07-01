import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata, homeFaq, servicePages } from "@/lib/site";

const businessProfileServices = [
  { slug: "prybyrannya-kvartyr-cherkasy", description: "Разове, підтримуюче та генеральне прибирання квартир у Черкасах." },
  { slug: "generalne-prybyrannya-cherkasy", description: "Глибоке прибирання кухні, санвузла, меблів, підлоги та важкодоступних зон." },
  { slug: "prybyrannya-pislya-remontu-cherkasy", description: "Видалення будівельного пилу, миття поверхонь, плитки, підлоги, вікон та сантехніки." },
  { slug: "himchystka-mebliv-cherkasy", description: "Хімчистка диванів, крісел, матраців та м’яких меблів." },
  { slug: "myttya-vikon-cherkasy", description: "Професійне миття вікон у квартирах, будинках, офісах і комерційних приміщеннях." },
  { slug: "prybyrannya-ofisiv-cherkasy", description: "Регулярне та разове прибирання офісів у Черкасах." },
  { slug: "prybyrannya-budynkiv-cherkasy", description: "Прибирання приватних будинків, котеджів і великих житлових приміщень." },
  { slug: "prybyrannya-pislya-potopu-cherkasy", description: "Прибирання після затоплення квартири, будинку або офісу." },
  { slug: "prybyrannya-pislya-pozhezhi-cherkasy", description: "Очищення сажі, гару, запахів і забруднень після пожежі." },
  { slug: "himchystka-kylymiv-cherkasy", description: "Хімчистка килимів і ковроліну у Черкасах." },
  { slug: "himchystka-avto-cherkasy", description: "Хімчистка салону авто: сидіння, килимки, багажник, пластик." },
  { slug: "prybyrannya-komertsiynykh-prymishchen-cherkasy", description: "Прибирання магазинів, салонів, закладів і робочих приміщень." },
  { slug: "prybyrannya-trts-supermarketiv-cherkasy", description: "Регулярне прибирання великих торгових об’єктів." },
  { slug: "dezinfektsiya-prymishchen-cherkasy", description: "Дезінфекція квартир, офісів, будинків та комерційних приміщень." },
  { slug: "myttya-fasadiv-cherkasy", description: "Миття фасадів будинків, магазинів, офісів та комерційних об’єктів." },
  { slug: "myttya-plitky-cherkasy", description: "Миття тротуарної плитки, доріжок, дворів і прибудинкової території." }
];

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
      <section className="section bg-brand-mist">
        <div className="container">
          <SectionHeading eyebrow="Послуги для клієнтів у Черкасах" title="Повний список послуг Формули Чистоти" description="Цей перелік допомагає швидко знайти потрібний формат клінінгу та перейти на детальну сторінку послуги." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {businessProfileServices.map((item) => {
              const service = servicePages.find((page) => page.slug === item.slug);
              if (!service) return null;

              return (
                <a className="rounded-lg bg-white p-5 shadow-soft transition hover:-translate-y-1" href={`/${service.slug}`} key={service.slug}>
                  <h2 className="text-lg font-bold text-brand-black">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-brand-graphite">{item.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
      <FAQSection faq={homeFaq} />
    </>
  );
}
