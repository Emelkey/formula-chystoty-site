import Image from "next/image";
import Link from "next/link";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";

const heroPrices = [
  {
    href: "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
    label: "Підтримуюче",
    price: "від 55 грн/м²"
  },
  {
    href: "/generalne-prybyrannya-cherkasy",
    label: "Генеральне",
    price: "від 100 грн/м²"
  },
  {
    href: "/prybyrannya-pislya-remontu-cherkasy",
    label: "Після ремонту",
    price: "від 120 грн/м²"
  }
];

export function HeroSection({ eyebrow = "Клінінг у Черкасах", title, accent, description }: { eyebrow?: string; title: string; accent: string; description: string }) {
  return (
    <section className="bg-white">
      <div className="container grid min-h-[660px] items-center gap-10 py-12 lg:min-h-[720px] lg:grid-cols-[0.92fr_1.08fr] lg:py-16">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-brand-green/20 bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-hover">{eyebrow}</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-brand-black md:text-6xl">
            {title} <span className="text-brand-green">{accent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-graphite">{description}</p>
          <div className="mt-5 grid max-w-2xl grid-cols-3 gap-2" aria-label="Основні ціни на прибирання">
            {heroPrices.map((item) => (
              <Link
                className="min-w-0 rounded-md border border-brand-green/20 bg-brand-mist px-2 py-3 text-center transition hover:border-brand-green hover:bg-white focus-visible:focus-ring sm:px-3"
                href={item.href}
                key={item.href}
              >
                <span className="block text-[11px] font-semibold leading-tight text-brand-graphite sm:text-sm">{item.label}</span>
                <strong className="mt-1 block text-xs leading-tight text-brand-black sm:text-base">{item.price}</strong>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton />
            <ContactButtons compact />
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-brand-graphite">
            <span className="rounded-full bg-brand-mist px-4 py-2">Виїзд у день звернення</span>
            <span className="rounded-full bg-brand-mist px-4 py-2">Працюємо у Черкасах та області</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px] bg-brand-mist shadow-soft">
          <Image
            src="/images/hero/professional-floor-cleaning-hero.webp"
            alt="Професійне миття підлоги клінінговою компанією Формула Чистоти у Черкасах"
            width={1600}
            height={1000}
            priority
            sizes="(max-width: 1024px) 92vw, 52vw"
            className="aspect-[4/3] w-full object-cover object-center sm:aspect-[16/10] lg:aspect-[5/4]"
          />
        </div>
      </div>
    </section>
  );
}
