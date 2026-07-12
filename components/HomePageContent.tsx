import type { ReactNode } from "react";
import Link from "next/link";
import { BadgeCheck, CalendarDays, Clock, HeartHandshake } from "lucide-react";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { ContactForm } from "@/components/ContactForm";
import { GoogleMapsTrust } from "@/components/GoogleMapsTrust";
import { HeroSection } from "@/components/HeroSection";
import { PricingSection } from "@/components/PricingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WorkSteps } from "@/components/WorkSteps";
import { absoluteUrl, importantSeoLinks, reviews } from "@/lib/site";

export function HomePageContent() {
  return (
    <>
      <HeroSection
        title="Професійний клінінг"
        accent="у Черкасах"
        description="Клінінг Черкаси для квартир, будинків і комерційних приміщень. Виконуємо генеральне та підтримуюче прибирання, прибирання після ремонту, миття вікон і хімчистку меблів з виїздом по Черкасах та області."
      />
      <section className="bg-white pb-12">
        <div className="container">
          <div className="grid gap-5 rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Клінінг Черкаси</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-black">Прибирання квартир, будинків і складних об’єктів</h2>
            </div>
            <div className="grid gap-4 leading-7 text-brand-graphite">
              <p>
                Формула Чистоти — клінінгова компанія у Черкасах, яка працює з житловими та комерційними приміщеннями. Ми беремо на себе{" "}
                <a className="font-semibold text-brand-hover underline decoration-brand-green/30 underline-offset-4 transition hover:decoration-brand-green" href={absoluteUrl("/prybyrannya-kvartyr-cherkasy")}>
                  прибирання квартир у Черкасах
                </a>
                , будинків, комерційних площ і складних об’єктів після ремонту.
              </p>
              <p>Команда приїжджає зі своїм інвентарем, професійною хімією та зрозумілим планом робіт. Ви можете замовити разове генеральне прибирання, регулярний клінінг, миття вікон, хімчистку меблів або складне прибирання після пожежі чи потопу.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pb-16 md:pb-20">
        <div className="container grid gap-4 rounded-[24px] border border-brand-green/15 bg-white p-4 shadow-soft md:grid-cols-4">
          <Stat icon={<BadgeCheck size={22} aria-hidden />} value="5+" label="років досвіду" />
          <Stat icon={<HeartHandshake size={22} aria-hidden />} value="1000+" label="задоволених клієнтів" />
          <Stat icon={<BadgeCheck size={22} aria-hidden />} value="98%" label="рекомендують нас" />
          <Stat icon={<CalendarDays size={22} aria-hidden />} value="7 днів" label="працюємо без вихідних" />
        </div>
      </section>
      <section className="bg-white pb-4">
        <div className="container grid gap-3 rounded-[24px] border border-brand-green/15 bg-brand-mist p-4 shadow-soft sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5">
            <p className="text-sm font-semibold text-brand-graphite">Мінімальний виїзд</p>
            <strong className="mt-2 block text-2xl font-bold text-brand-black">3000 грн</strong>
            <span className="mt-1 block text-sm text-brand-graphite">на всі види послуг</span>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <p className="text-sm font-semibold text-brand-graphite">Виїзд за місто</p>
            <strong className="mt-2 block text-2xl font-bold text-brand-black">25 грн/км</strong>
            <span className="mt-1 block text-sm text-brand-graphite">поза межами Черкас</span>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Послуги</p>
              <h2 className="text-3xl font-bold leading-tight text-brand-black md:text-5xl">Наші <span className="text-brand-green">послуги</span></h2>
            </div>
            <Link className="inline-flex items-center text-sm font-semibold text-brand-hover" href="/poslugy">
              Всі послуги →
            </Link>
          </div>
          <ServicesGrid limit={7} />
          <div className="mt-8 rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:flex md:items-center md:justify-between md:gap-6">
            <p className="max-w-3xl leading-7 text-brand-graphite">Також виконуємо прибирання будинків, комерційних приміщень, складних об’єктів, хімчистку авто та інші види клінінгу.</p>
            <Link className="mt-5 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring md:mt-0" href="/poslugy">
              Переглянути всі послуги
            </Link>
          </div>
        </div>
      </section>
      <WorkSteps />
      <WhyChooseUs />
      <section className="section bg-white">
        <div className="container grid gap-5 rounded-[24px] border border-brand-green/15 bg-white p-6 shadow-soft md:grid-cols-[0.8fr_1.2fr] md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Клінінг Черкаси</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-black">Клінінг у Черкасах для квартир, будинків і бізнесу</h2>
          </div>
          <div className="grid gap-4 leading-7 text-brand-graphite">
            <p>Формула Чистоти виконує професійний клінінг у Черкасах для приватних клієнтів і бізнесу. Ми прибираємо квартири, будинки, комерційні приміщення, виконуємо генеральне прибирання, прибирання після ремонту, хімчистку меблів, миття вікон та регулярне обслуговування об’єктів.</p>
            <p>Клієнт отримує не просто прибирання, а зрозумілий сервіс: погодження вартості до початку робіт, виїзд команди з професійною хімією та обладнанням, контроль результату і можливість замовити разове або регулярне прибирання.</p>
            <p>
              Якщо вам потрібне{" "}
              <a className="font-semibold text-brand-hover underline decoration-brand-green/30 underline-offset-4 transition hover:decoration-brand-green" href={absoluteUrl("/prybyrannya-kvartyr-cherkasy")}>
                прибирання квартири в Черкасах
              </a>
              , будинку чи комерційного приміщення — залиште заявку, і ми підкажемо орієнтовну вартість під ваш об’єкт.
            </p>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Популярні запити</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-black">Послуги, які найчастіше шукають у Черкасах</h2>
            <p className="mt-4 leading-7 text-brand-graphite">Зібрали окремі сторінки для найпопулярніших форматів клінінгу, щоб можна було швидко перейти до умов, ціни, прикладів робіт і FAQ.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {importantSeoLinks.map((link) => (
              <Link className="rounded-md border border-brand-green/20 bg-white px-4 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:border-brand-green" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PricingSection compact />
      <BeforeAfterGallery />
      <ReviewsSection />
      <GoogleMapsTrust />
      <section className="section bg-white">
        <div className="container grid gap-8 rounded-[28px] bg-brand-mist p-6 md:p-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="min-w-0">
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-hover">Заявка</p>
            <h2 className="text-4xl font-bold leading-tight">Залиште заявку зараз</h2>
            <p className="mt-4 max-w-md leading-7 text-brand-graphite">Ми уточнимо тип прибирання, площу, стан приміщення і підготуємо зрозумілий розрахунок.</p>
            <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-brand-graphite">
              <Clock className="text-brand-green" size={20} aria-hidden />
              Відповідаємо швидко у робочий час
            </div>
          </div>
          <ContactForm compact submitLabel="Отримати розрахунок" />
        </div>
      </section>
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "LocalBusiness", name: "Формула Чистоти" },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: reviews[0].name },
          reviewBody: reviews[0].text,
          url: absoluteUrl("/")
        }}
      />
    </>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-brand-green/15 bg-brand-mist/70 p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-green shadow-soft">{icon}</div>
      <strong className="block text-2xl font-bold text-brand-black">{value}</strong>
      <span className="mt-1 block text-sm font-medium text-brand-graphite">{label}</span>
    </div>
  );
}
