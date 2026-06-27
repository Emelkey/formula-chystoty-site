import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientsSection } from "@/components/ClientsSection";
import { CTASection } from "@/components/CTASection";
import { Logo } from "@/components/Logo";
import { SectionHeading } from "@/components/SectionHeading";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { aboutImages, buildMetadata, positioning } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Про компанію Формула Чистоти — клінінг у Черкасах",
  description: "Формула Чистоти — клінінгова компанія у Черкасах. Професійне прибирання квартир, будинків, офісів, магазинів та комерційних приміщень.",
  path: "/pro-nas"
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Про нас", href: "/pro-nas" }]} />
      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">Про компанію Формула Чистоти</h1>
            <p className="mt-5 text-lg leading-8 text-brand-graphite">{positioning}</p>
          </div>
          <div className="rounded-lg bg-brand-mist p-6">
            <Logo className="mb-6 w-[112px]" />
            <SectionHeading title="Наш підхід" description="Спочатку уточнюємо задачу, потім погоджуємо обсяг, ціну та час. Команда приїжджає зі своїм інвентарем, працює за регламентом і здає результат клієнту." />
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <ClientsSection />
      <section className="section bg-white">
        <div className="container grid gap-5 md:grid-cols-2">
          <article className="overflow-hidden rounded-lg bg-brand-mist shadow-soft">
            <Image src={aboutImages.team.src} alt={aboutImages.team.alt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-hover">Про компанію</p>
              <h2 className="mt-2 text-xl font-bold">Автомобіль та офіс Формула Чистоти</h2>
              <p className="mt-3 text-sm leading-6 text-brand-graphite">Формула Чистоти — реальна клінінгова компанія у Черкасах із власним брендованим автомобілем, офісом, обладнанням та командою. Ми виїжджаємо на об’єкти по місту та області.</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg bg-brand-mist shadow-soft">
            <Image src={aboutImages.equipment.src} alt={aboutImages.equipment.alt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-bold">Обладнання та хімія</h2>
              <p className="mt-3 text-sm leading-6 text-brand-graphite">Використовуємо професійні засоби, інвентар і техніку для житлових, офісних та комерційних об’єктів.</p>
            </div>
          </article>
        </div>
      </section>
      <CTASection />
    </>
  );
}
