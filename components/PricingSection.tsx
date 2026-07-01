import Image from "next/image";
import Link from "next/link";
import { additionalPrices, priceGuideSections, priceTables, servicePages } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { PrimaryButton } from "@/components/Buttons";

const compactPrices = [
  {
    title: "Генеральне прибирання",
    price: "від 4000 грн",
    description: "Для квартир, будинків та офісів",
    href: "/generalne-prybyrannya-cherkasy",
    image: "/images/services/premium-general-cleaning.webp",
    imageAlt: "Професійне генеральне прибирання у світлому інтер’єрі"
  },
  {
    title: "Прибирання після ремонту",
    price: "від 4800 грн",
    description: "Видалення пилу, бруду та слідів ремонту",
    href: "/prybyrannya-pislya-remontu-cherkasy",
    image: "/images/services/premium-cleaning-equipment.webp",
    imageAlt: "Професійне обладнання для прибирання після ремонту"
  },
  {
    title: "Миття вікон",
    price: "від 160 грн/м²",
    description: "Вікна, балкони, вітрини та скляні конструкції",
    href: "/myttya-vikon-cherkasy",
    image: "/images/services/premium-window-cleaning.webp",
    imageAlt: "Професійне миття великих вікон"
  },
  {
    title: "Хімчистка меблів",
    price: "розрахунок індивідуально по фото або телефону",
    description: "Дивани, крісла, матраци та м’які меблі",
    href: "/himchystka-mebliv-cherkasy",
    image: "/images/services/sofa-cleaning-generated.png",
    imageAlt: "Хімчистка дивана екстрактором"
  }
];

export function PricingSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section bg-white">
      <div className="container">
        {compact ? (
          <div>
            <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Вартість</p>
                <h2 className="text-3xl font-bold leading-tight text-brand-black md:text-5xl">Ціни <span className="text-brand-green">від</span></h2>
              </div>
              <Link className="inline-flex items-center text-sm font-semibold text-brand-hover" href="/prices">
                Усі ціни →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {compactPrices.map((item) => (
                <Link className="group overflow-hidden rounded-[24px] border border-[#E8EEE5] bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.12)]" href={item.href} key={item.title}>
                  <h3 className="text-lg font-bold leading-6 text-brand-black">{item.title}</h3>
                  <p className="mt-4 text-2xl font-bold leading-tight text-brand-hover">{item.price}</p>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-brand-graphite">{item.description}</p>
                  <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[18px] bg-brand-mist">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-brand-graphite">Точна вартість залежить від площі, стану приміщення та переліку робіт.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <SectionHeading eyebrow="Ціни" title="Актуальні ціни на клінінгові послуги" description="Фінальна вартість залежить від площі, стану об’єкта, терміновості та додаткових робіт. Перед стартом погоджуємо обсяг і суму." />
            <div className="grid gap-5 lg:grid-cols-3">
              {priceTables.map((group) => (
                <article className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-soft" key={group.title}>
                  <h2 className="bg-brand-black px-5 py-4 text-xl font-bold text-white">{group.title}</h2>
                  <div>
                    {group.rows.map(([area, price]) => (
                      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-black/5 px-5 py-3 last:border-b-0" key={`${group.title}-${area}`}>
                        <span className="text-sm text-brand-graphite">{area}</span>
                        <strong className="text-sm text-brand-hover">{price}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <article className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-soft">
              <h2 className="bg-white px-5 py-4 text-2xl font-bold text-brand-black">Окремі тарифи</h2>
              <div className="grid md:grid-cols-2">
                {additionalPrices.map(([service, price]) => (
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-black/5 px-5 py-3" key={service}>
                    <span className="text-sm text-brand-graphite">{service}</span>
                    <strong className="text-right text-sm text-brand-hover">{price}</strong>
                  </div>
                ))}
              </div>
            </article>
            <section className="rounded-lg border border-black/5 bg-brand-mist p-5 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-brand-black">Орієнтири по основних послугах</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-graphite">Не вигадуємо точну суму без деталей: остаточна ціна залежить від площі, стану, фото об’єкта, доступу та додаткових задач.</p>
                </div>
                <PrimaryButton>Надіслати фото або заявку</PrimaryButton>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {priceGuideSections.map((item) => (
                  <Link className="rounded-lg bg-white p-5 shadow-soft transition hover:-translate-y-1" href={item.href} key={item.title}>
                    <h3 className="text-lg font-bold text-brand-black">{item.title}</h3>
                    <p className="mt-3 text-2xl font-bold text-brand-hover">{item.price}</p>
                    <p className="mt-3 text-sm leading-6 text-brand-graphite">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
            <section className="rounded-lg border border-black/5 bg-white p-5 shadow-soft">
              <h2 className="text-2xl font-bold text-brand-black">Послуги з цінами та деталями</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {servicePages.map((service) => (
                  <Link className="rounded-md border border-brand-green/20 bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-hover transition hover:border-brand-green" href={`/${service.slug}`} key={service.slug}>
                    {service.title}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
