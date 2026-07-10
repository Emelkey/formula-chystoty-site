import Image from "next/image";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";

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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
