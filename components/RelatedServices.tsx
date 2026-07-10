import { servicePages } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

const relatedLinks: Record<string, { href: string; label: string }[]> = {
  "himchystka-mebliv-cherkasy": [
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана в Черкасах" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" },
    { href: "/himchystka-kylymiv-cherkasy", label: "хімчистка килимів" },
    { href: "/himchystka-avto-cherkasy", label: "хімчистка авто" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" }
  ],
  "himchystka-dyvana-cherkasy": [
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" }
  ],
  "prybyrannya-kvartyr-cherkasy": [
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" },
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" }
  ],
  "generalne-prybyrannya-cherkasy": [
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/prybyrannya-budynkiv-cherkasy", label: "прибирання будинків" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" }
  ],
  "prybyrannya-pislya-remontu-cherkasy": [
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" },
    { href: "/myttya-plytky-cherkasy", label: "миття плитки" },
    { href: "/prybyrannya-budynkiv-cherkasy", label: "прибирання будинку" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартири" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів після ремонту" }
  ],
  "myttya-vikon-cherkasy": [
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартири" },
    { href: "/prybyrannya-ofisiv-cherkasy", label: "прибирання офісів" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/myttya-fasadiv-cherkasy", label: "миття фасадів" }
  ],
  "prybyrannya-ofisiv-cherkasy": [
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "прибирання комерційних приміщень" },
    { href: "/prybyrannya-magazyniv-cherkasy", label: "прибирання магазинів" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
    { href: "/dezinfektsiya-prymishchen-cherkasy", label: "дезінфекція приміщень" }
  ],
  "prybyrannya-budynkiv-cherkasy": [
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів" }
  ],
  "prybyrannya-pislya-pozhezhi-cherkasy": [
    { href: "/dezinfektsiya-prymishchen-cherkasy", label: "дезінфекція приміщень" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання" },
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
