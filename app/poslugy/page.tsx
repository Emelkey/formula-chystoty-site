import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata, homeFaq, importantSeoLinks, servicePages } from "@/lib/site";

const businessProfileServices = [
  { slug: "prybyrannya-kvartyr-cherkasy", description: "Прибирання квартир у Черкасах: підтримуюче від 55 грн/м², генеральне та післяремонтне прибирання доступні окремо." },
  { slug: "generalne-prybyrannya-cherkasy", description: "Широка сторінка генерального прибирання для квартир, будинків, кухонь, санвузлів і складних житлових зон." },
  { slug: "pidtrymuyuche-prybyrannya-kvartyr-cherkasy", description: "Регулярне підтримання чистоти квартири без зайвих робіт." },
  { slug: "generalne-prybyrannya-kvartyry-cherkasy", description: "Окрема посадкова сторінка для генерального прибирання квартири." },
  { slug: "generalne-prybyrannya-kuhni-cherkasy", description: "Глибоке очищення кухні від жиру, нальоту та побутових забруднень." },
  { slug: "prybyrannya-pislya-remontu-cherkasy", description: "Післябудівельне прибирання: будівельний пил, плитка, підлога, вікна, сантехніка та фінальна підготовка об’єкта." },
  { slug: "himchystka-mebliv-cherkasy", description: "Хімчистка диванів, крісел, матраців та м’яких меблів." },
  { slug: "himchystka-dyvana-cherkasy", description: "Професійна хімчистка дивана з виїздом додому або в офіс." },
  { slug: "himchystka-matratsa-cherkasy", description: "Хімчистка матраців від пилу, запахів і побутових забруднень." },
  { slug: "myttya-vikon-cherkasy", description: "Професійне миття вікон у квартирах, будинках і комерційних приміщеннях." },
  { slug: "prybyrannya-budynkiv-cherkasy", description: "Прибирання приватних будинків, котеджів і великих житлових приміщень." },
  { slug: "prybyrannya-pislya-potopu-cherkasy", description: "Прибирання після затоплення квартири, будинку або офісу." },
  { slug: "prybyrannya-pislya-pozhezhi-cherkasy", description: "Очищення сажі, гару, запахів і забруднень після пожежі." },
  { slug: "himchystka-kylymiv-cherkasy", description: "Хімчистка килимів і ковроліну у Черкасах." },
  { slug: "himchystka-avto-cherkasy", description: "Хімчистка салону авто: комплекс, сидіння з тканини або шкіри, килимки та багажник. Стеля, видалення запаху й дезінфекція рахуються окремо." },
  { slug: "prybyrannya-komertsiynykh-prymishchen-cherkasy", description: "Клінінг бізнес-приміщень, сервісних просторів і комерційних площ за погодженим регламентом." },
  { slug: "prybyrannya-ofisiv-cherkasy", description: "Разове та регулярне прибирання офісів із погодженими зонами, графіком і контролем виконання." },
  { slug: "rehulyarne-prybyrannya-biznesu-cherkasy", description: "Клінінгове обслуговування бізнесу за регулярним графіком і заздалегідь визначеним регламентом." },
  { slug: "prybyrannya-mahazyniv-supermarketiv-cherkasy", description: "Прибирання магазинів, супермаркетів і торгових залів з урахуванням режиму роботи та потоку відвідувачів." },
  { slug: "prybyrannya-restoraniv-kafe-cherkasy", description: "Клінінг ресторанів і кафе з окремим погодженням гостьових, службових та кухонних зон." },
  { slug: "dezinfektsiya-prymishchen-cherkasy", description: "Дезінфекція, озонація та санітарне прибирання після трупу або біологічного забруднення." },
  { slug: "myttya-fasadiv-cherkasy", description: "Миття фасадів будинків та комерційних об’єктів." },
  { slug: "myttya-plytky-cherkasy", description: "Миття тротуарної плитки, доріжок, дворів і прибудинкової території." }
];

const popularCleaningServices = [
  { href: "/prybyrannya-kvartyr-cherkasy", label: "Прибирання квартир у Черкасах" },
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
          <SectionHeading eyebrow="SEO-навігація" title="Популярні клінінгові послуги в Черкасах" description="Швидкі переходи на основні посадкові сторінки послуг, які найчастіше замовляють клієнти Формули Чистоти." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularCleaningServices.map((link) => (
              <a className="rounded-lg border border-brand-green/15 bg-white p-5 text-base font-semibold text-brand-hover shadow-soft transition hover:-translate-y-1 hover:border-brand-green" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-brand-mist pt-0">
        <div className="container">
          <SectionHeading eyebrow="Послуги для клієнтів у Черкасах" title="Повний список послуг Формули Чистоти" description="Цей перелік допомагає швидко знайти потрібний формат клінінгу та перейти на детальну сторінку послуги." />
          <div className="mt-8 flex flex-wrap gap-3 rounded-2xl border border-brand-green/15 bg-white p-5 shadow-soft">
            {importantSeoLinks.map((link) => (
              <a className="rounded-md border border-black/10 px-4 py-3 text-sm font-semibold text-brand-hover transition hover:border-brand-green" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
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
