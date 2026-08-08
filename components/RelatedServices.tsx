import { servicePages } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

const relatedLinks: Record<string, { href: string; label: string }[]> = {
  "himchystka-mebliv-cherkasy": [
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана в Черкасах" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" },
    { href: "/himchystka-stiltsiv-cherkasy", label: "хімчистка м’яких стільців" },
    { href: "/himchystka-krisel-cherkasy", label: "хімчистка крісел" },
    { href: "/himchystka-kovrolinu-cherkasy", label: "хімчистка ковроліну" }
  ],
  "himchystka-dyvana-cherkasy": [
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка м’яких меблів" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" },
    { href: "/himchystka-krisel-cherkasy", label: "хімчистка крісел" },
    { href: "/prices", label: "прайс на хімчистку" },
    { href: "/nashi-roboty", label: "дивани до та після хімчистки" }
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
    { href: "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy", label: "підтримуюче прибирання квартири" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання квартири після ремонту" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка м’яких меблів" }
  ],
  "generalne-prybyrannya-kvartyry-cherkasy": [
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання приміщень" },
    { href: "/generalne-prybyrannya-kuhni-cherkasy", label: "генеральне прибирання кухні" },
    { href: "/prices", label: "ціни на генеральне прибирання" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон у квартирі" }
  ],
  "generalne-prybyrannya-cherkasy": [
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/generalne-prybyrannya-kuhni-cherkasy", label: "генеральне прибирання кухні" },
    { href: "/prybyrannya-budynkiv-cherkasy", label: "прибирання будинків" },
    { href: "/prices", label: "орієнтовні ціни на клінінг" }
  ],
  "prybyrannya-pislya-remontu-cherkasy": [
    { href: "/prices", label: "ціни на післяремонтне прибирання" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон після ремонту" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартири після робіт" },
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання приміщень" },
    { href: "/nashi-roboty", label: "післяремонтне прибирання до та після" }
  ],
  "himchystka-matratsa-cherkasy": [
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка м’яких меблів" },
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана" },
    { href: "/himchystka-krisel-cherkasy", label: "хімчистка крісел" },
    { href: "/prices", label: "ціни на хімчистку" },
    { href: "/nashi-roboty", label: "матраци до та після хімчистки" }
  ],
  "himchystka-kylymiv-cherkasy": [
    { href: "/himchystka-kovrolinu-cherkasy", label: "хімчистка ковроліну на місці" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка м’яких меблів" },
    { href: "/prices", label: "ціни на хімчистку килимів" },
    { href: "/nashi-roboty", label: "килими та ковролін до і після" }
  ],
  "himchystka-stiltsiv-cherkasy": [
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка м’яких меблів" },
    { href: "/himchystka-krisel-cherkasy", label: "хімчистка крісел" },
    { href: "/prybyrannya-restoraniv-kafe-cherkasy", label: "клінінг ресторанів і кафе" },
    { href: "/prices", label: "ціни на хімчистку" },
    { href: "/nashi-roboty", label: "стільці до та після очищення" }
  ],
  "himchystka-krisel-cherkasy": [
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка м’яких меблів" },
    { href: "/himchystka-dyvana-cherkasy", label: "хімчистка дивана" },
    { href: "/himchystka-stiltsiv-cherkasy", label: "хімчистка стільців" },
    { href: "/himchystka-matratsa-cherkasy", label: "хімчистка матраца" },
    { href: "/prices", label: "ціни на хімчистку" }
  ],
  "himchystka-kovrolinu-cherkasy": [
    { href: "/himchystka-kylymiv-cherkasy", label: "хімчистка килимів" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "клінінг комерційних приміщень" },
    { href: "/prybyrannya-ofisiv-cherkasy", label: "прибирання офісів" },
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярне прибирання бізнесу" },
    { href: "/prices", label: "ціни на хімчистку покриттів" }
  ],
  "pidtrymuyuche-prybyrannya-kvartyr-cherkasy": [
    { href: "/prybyrannya-kvartyr-cherkasy", label: "професійне прибирання квартири" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prices", label: "ціни на прибирання квартир" },
    { href: "/myttya-vikon-cherkasy", label: "миття вікон у квартирі" }
  ],
  "generalne-prybyrannya-kuhni-cherkasy": [
    { href: "/generalne-prybyrannya-cherkasy", label: "генеральне прибирання приміщень" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-kvartyr-cherkasy", label: "прибирання квартир" },
    { href: "/prices", label: "ціни на генеральне прибирання" }
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
  ],
  "prybyrannya-pislya-potopu-cherkasy": [
    { href: "/dezinfektsiya-prymishchen-cherkasy", label: "дезінфекція та озонація" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/prybyrannya-pislya-pozhezhi-cherkasy", label: "прибирання після пожежі" }
  ],
  "dezinfektsiya-prymishchen-cherkasy": [
    { href: "/prybyrannya-pislya-potopu-cherkasy", label: "прибирання після потопу" },
    { href: "/prybyrannya-pislya-pozhezhi-cherkasy", label: "прибирання після пожежі" },
    { href: "/generalne-prybyrannya-kvartyry-cherkasy", label: "генеральне прибирання квартири" },
    { href: "/prices", label: "ціни на складне прибирання" }
  ],
  "prybyrannya-komertsiynykh-prymishchen-cherkasy": [
    { href: "/prybyrannya-ofisiv-cherkasy", label: "прибирання офісів" },
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярне прибирання для бізнесу" },
    { href: "/prybyrannya-vyrobnychykh-prymishchen-cherkasy", label: "клінінг виробничих приміщень" },
    { href: "/prybyrannya-skladiv-cherkasy", label: "прибирання складів" },
    { href: "/prybyrannya-medychnykh-tsentriv-cherkasy", label: "прибирання медичних центрів" }
  ],
  "prybyrannya-ofisiv-cherkasy": [
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярний клінінг офісу" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "прибирання комерційних приміщень" },
    { href: "/prybyrannya-mahazyniv-supermarketiv-cherkasy", label: "прибирання торгових приміщень" },
    { href: "/myttya-vikon-cherkasy", label: "миття офісних вікон" },
    { href: "/prices", label: "орієнтовні ціни на клінінг" }
  ],
  "rehulyarne-prybyrannya-biznesu-cherkasy": [
    { href: "/prybyrannya-ofisiv-cherkasy", label: "регулярне прибирання офісів" },
    { href: "/prybyrannya-mahazyniv-supermarketiv-cherkasy", label: "обслуговування магазинів" },
    { href: "/prybyrannya-restoraniv-kafe-cherkasy", label: "клінінг ресторанів і кафе" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "клінінг бізнес-приміщень" },
    { href: "/prices", label: "ціни на клінінгові послуги" }
  ],
  "prybyrannya-mahazyniv-supermarketiv-cherkasy": [
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярний клінінг для бізнесу" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "прибирання комерційних приміщень" },
    { href: "/prybyrannya-ofisiv-cherkasy", label: "прибирання офісів" },
    { href: "/myttya-vikon-cherkasy", label: "миття вітрин і вікон" },
    { href: "/prices", label: "орієнтовний прайс на клінінг" }
  ],
  "prybyrannya-restoraniv-kafe-cherkasy": [
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярне обслуговування закладу" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "клінінг комерційних приміщень" },
    { href: "/prybyrannya-ofisiv-cherkasy", label: "прибирання адміністративних зон" },
    { href: "/himchystka-mebliv-cherkasy", label: "хімчистка стільців і м’яких меблів" },
    { href: "/prices", label: "ціни на додаткові роботи" }
  ],
  "prybyrannya-vyrobnychykh-prymishchen-cherkasy": [
    { href: "/prybyrannya-skladiv-cherkasy", label: "прибирання складських зон" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "клінінг комерційних приміщень" },
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярне обслуговування бізнесу" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту" },
    { href: "/prices", label: "орієнтовні ціни на клінінг" }
  ],
  "prybyrannya-skladiv-cherkasy": [
    { href: "/prybyrannya-vyrobnychykh-prymishchen-cherkasy", label: "прибирання виробничих приміщень" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "клінінг комерційних площ" },
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярне прибирання бізнесу" },
    { href: "/prybyrannya-pislya-remontu-cherkasy", label: "післяремонтне прибирання" },
    { href: "/prices", label: "прайс на клінінгові послуги" }
  ],
  "prybyrannya-medychnykh-tsentriv-cherkasy": [
    { href: "/rehulyarne-prybyrannya-biznesu-cherkasy", label: "регулярне прибирання для бізнесу" },
    { href: "/prybyrannya-ofisiv-cherkasy", label: "прибирання адміністративних зон" },
    { href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", label: "клінінг комерційних приміщень" },
    { href: "/dezinfektsiya-prymishchen-cherkasy", label: "дезінфекція приміщень" },
    { href: "/prices", label: "орієнтовні ціни на клінінг" }
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
