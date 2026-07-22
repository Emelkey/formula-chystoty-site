import { servicePages } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

const relatedLinks: Record<string, { href: string; label: string }[]> = {
  "himchystka-mebliv-cherkasy": [
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана в Черкасах" },
    { href: "/prices", label: "ціни на хімчистку та клінінг" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" }
  ],
  "himchystka-dyvana-cherkasy": [
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" }
  ],
  "himchystka-avto-cherkasy": [
    { href: "/prices", label: "ціни на хімчистку авто" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка м’яких меблів" },
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" }
  ],
  "prybyrannya-kvartyr-cherkasy": [
    { href: "/prices", label: "ціни на клінінг" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" },
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" }
  ],
  "generalne-prybyrannya-kvartyry-cherkasy": [
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання у Черкасах" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/prybyrannya-budynkiv-cherkasy", label: "прибирання будинків" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" }
  ],
  "generalne-prybyrannya-cherkasy": [
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/generalne-prybyrannya-kuhni-cherkasy", label: "генеральне прибирання кухні" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/prybyrannya-budynkiv-cherkasy", label: "прибирання будинків" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" }
  ],
  "prybyrannya-pislya-remontu-cherkasy": [
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартири" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон після ремонту" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів після ремонту" },
    { href: "/prices", label: "ціни на прибирання після ремонту" }
  ],
  "myttya-vikon-cherkasy": [
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартири" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "клінінг комерційних приміщень" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/myttya-fasadiv-cherkasy", label: "миття фасадів" }
  ],
  "prybyrannya-budynkiv-cherkasy": [
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" }
  ],
  "prybyrannya-pislya-pozhezhi-cherkasy": [
    { href: "/dezinfektsiya-prymishchen-cherkasy", label: "дезінфекція приміщень" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/prybyrannya-budynkiv-cherkasy", label: "прибирання будинків" },
    { href: "/myttya-plytky-cherkasy", label: "миття плитки" }
  ]
};

export function RelatedServices({ currentSlug }: { currentSlug?: string }) {
  const current = servicePages.find((service) => service.slug === currentSlug);
  const candidates = servicePages.filter((service) => service.slug !== currentSlug);
  const sameCategory = current ? candidates.filter((service) => service.category === current.category) : [];
  const fallback = [...sameCategory, ...candidates.filter((service) => !sameCategory.includes(service))]
    .slice(0, 4)
    .map((service) => ({ href: `/${service.slug}`, label: service.title.toLowerCase() }));
  const related = currentSlug ? relatedLinks[currentSlug] ?? fallback : fallback;

  return (
    <section className="section bg-brand-mist">
      <div className="container">
        <SectionHeading eyebrow="Також замовляють" title="Схожі послуги" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {related.map((link) => (
            <a className="rounded-lg bg-white p-5 shadow-soft transition hover:-translate-y-1" href={link.href} key={link.href}>
              <span className="text-lg font-bold text-brand-black">{link.label}</span>
              <span className="mt-4 block text-sm font-semibold text-brand-hover">Детальніше</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
