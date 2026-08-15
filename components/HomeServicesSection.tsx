import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const primaryServices = [
  {
    title: "Прибирання квартир",
    description: "Підтримуюче, генеральне та післяремонтне прибирання квартир.",
    href: "/prybyrannya-kvartyr-cherkasy",
    image: "/images/services/premium-apartment-cleaning.webp",
    imageAlt: "Професійне прибирання квартири"
  },
  {
    title: "Генеральне прибирання",
    description: "Глибоке очищення житлових і комерційних приміщень.",
    href: "/generalne-prybyrannya-cherkasy",
    image: "/images/services/premium-general-cleaning.webp",
    imageAlt: "Професійне генеральне прибирання приміщення"
  },
  {
    title: "Прибирання після ремонту",
    description: "Видаляємо будівельний пил, сліди ремонту та складні забруднення.",
    href: "/prybyrannya-pislya-remontu-cherkasy",
    image: "/images/services/premium-cleaning-equipment.webp",
    imageAlt: "Обладнання для прибирання після ремонту"
  },
  {
    title: "Хімчистка меблів",
    description: "Професійна чистка диванів, крісел, стільців і матраців з виїздом.",
    href: "/himchystka-mebliv-cherkasy",
    image: "/images/services/sofa-cleaning-generated-optimized.jpg",
    imageAlt: "Професійна хімчистка м'яких меблів"
  },
  {
    title: "Миття вікон",
    description: "Миття вікон, рам, склопакетів і складних скляних конструкцій.",
    href: "/myttya-vikon-cherkasy",
    image: "/images/services/premium-window-cleaning.webp",
    imageAlt: "Професійне миття вікон"
  },
  {
    title: "Прибирання для бізнесу",
    description: "Разове та регулярне прибирання офісів, магазинів і комерційних об’єктів.",
    href: "/prybyrannya-komertsiynykh-prymishchen-cherkasy",
    image: "/images/services/commercial-premises-cleaning-generated-optimized.jpg",
    imageAlt: "Професійне прибирання комерційного приміщення"
  }
];

const secondaryGroups = [
  {
    title: "Для дому",
    links: [
      { label: "Підтримуюче прибирання", href: "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy" },
      { label: "Прибирання будинків", href: "/prybyrannya-budynkiv-cherkasy" },
      { label: "Хімчистка дивана", href: "/himchystka-dyvana-cherkasy" },
      { label: "Хімчистка матраца", href: "/himchystka-matratsa-cherkasy" },
      { label: "Хімчистка килимів", href: "/himchystka-kylymiv-cherkasy" }
    ]
  },
  {
    title: "Для бізнесу",
    links: [
      { label: "Прибирання офісів", href: "/prybyrannya-ofisiv-cherkasy" },
      { label: "Магазини й супермаркети", href: "/prybyrannya-mahazyniv-supermarketiv-cherkasy" },
      { label: "Ресторани й кафе", href: "/prybyrannya-restoraniv-kafe-cherkasy" },
      { label: "Прибирання складів", href: "/prybyrannya-skladiv-cherkasy" },
      { label: "Виробничі приміщення", href: "/prybyrannya-vyrobnychykh-prymishchen-cherkasy" },
      { label: "Медичні приміщення", href: "/prybyrannya-medychnykh-tsentriv-cherkasy" }
    ]
  },
  {
    title: "Спеціальні роботи",
    links: [
      { label: "Прибирання після пожежі", href: "/prybyrannya-pislya-pozhezhi-cherkasy" },
      { label: "Прибирання після затоплення", href: "/prybyrannya-pislya-potopu-cherkasy" },
      { label: "Миття фасадів", href: "/myttya-fasadiv-cherkasy" },
      { label: "Хімчистка ковроліну", href: "/himchystka-kovrolinu-cherkasy" },
      { label: "Дезінфекція приміщень", href: "/dezinfektsiya-prymishchen-cherkasy" },
      { label: "Миття тротуарної плитки", href: "/myttya-plytky-cherkasy" }
    ]
  }
];

export function HomeServicesSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="home-services-title">
      <div className="container">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Послуги</p>
          <h2 id="home-services-title" className="text-3xl font-bold leading-tight text-brand-black md:text-5xl">
            Послуги <span className="text-brand-green">«Формули Чистоти»</span>
          </h2>
          <p className="mt-5 leading-7 text-brand-graphite">
            Обирайте потрібний формат прибирання — від регулярного догляду за квартирою до складного післяремонтного та комерційного клінінгу. Працюємо у Черкасах та області зі своєю технікою, інвентарем і професійними засобами.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {primaryServices.map((service) => (
            <article className="group flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E8EEE5] bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.12)] sm:p-6" key={service.href}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] border border-brand-green/10 bg-brand-mist">
                <Image
                  alt={service.imageAlt}
                  className="object-cover transition duration-300 group-hover:scale-105"
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 31vw"
                  src={service.image}
                />
              </div>
              <div className="flex flex-1 flex-col pt-6">
                <h3 className="text-xl font-bold leading-tight text-brand-black">
                  <Link className="transition hover:text-brand-hover focus-visible:focus-ring" href={service.href}>
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-brand-graphite">{service.description}</p>
                <Link className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-brand-hover focus-visible:focus-ring" href={service.href}>
                  Детальніше <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold leading-tight text-brand-black">Інші послуги</h2>
          <div className="mt-7 grid items-start gap-4 lg:grid-cols-3">
            {secondaryGroups.map((group) => (
              <details className="group min-w-0 rounded-[18px] border border-brand-green/15 bg-brand-mist/70 p-5 open:bg-brand-mist" key={group.title} open>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold text-brand-black focus-visible:focus-ring [&::-webkit-details-marker]:hidden">
                  {group.title}
                  <ChevronDown className="shrink-0 text-brand-green transition group-open:rotate-180" size={20} aria-hidden />
                </summary>
                <ul className="mt-3 grid gap-1 border-t border-brand-green/15 pt-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link className="flex min-h-11 items-center rounded-md px-2 py-2 text-sm font-semibold leading-5 text-brand-graphite transition hover:bg-white hover:text-brand-hover focus-visible:focus-ring" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href="/poslugy">
              Переглянути всі послуги
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
