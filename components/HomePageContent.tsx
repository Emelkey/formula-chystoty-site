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

const priorityServiceLinks = [
  { href: "/prybyrannya-pislya-remontu-cherkasy", label: "прибирання після ремонту у Черкасах" },
  { href: "/himchystka-mebliv-cherkasy", label: "хімчистка меблів у Черкасах" },
  { href: "/himchystka-avto-cherkasy", label: "хімчистка авто у Черкасах" },
  { href: "/myttya-vikon-cherkasy", label: "миття вікон у Черкасах" }
];

export function HomePageContent() {
  return (
    <>
      <HeroSection
        title="Професійний клінінг"
        accent="у Черкасах"
        description="Прибирання квартир, будинків і комерційних приміщень. Виїжджаємо зі своєю технікою та професійними засобами. Вартість — від 55 грн/м². Точний розрахунок зробимо за фото."
      />
      <section className="bg-white pb-12">
        <div className="container">
          <div className="grid gap-5 rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Клінінг Черкаси</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-black">Клінінгова компанія у Черкасах для житла, бізнесу і складних об’єктів</h2>
            </div>
            <div className="grid gap-4 leading-7 text-brand-graphite">
              <p>
                Формула Чистоти — клінінгова компанія у Черкасах, яка працює з житловими та комерційними приміщеннями. Ми беремо на себе{" "}
                <a className="font-semibold text-brand-hover underline decoration-brand-green/30 underline-offset-4 transition hover:decoration-brand-green" href={absoluteUrl("/prybyrannya-kvartyr-cherkasy")}>
                  прибирання квартир у Черкасах
                </a>
                , будинків, {" "}
                <Link className="font-semibold text-brand-hover underline decoration-brand-green/30 underline-offset-4 transition hover:decoration-brand-green" href="/prybyrannya-komertsiynykh-prymishchen-cherkasy">
                  клінінг комерційних приміщень
                </Link>{" "}
                і складних об’єктів після ремонту.
              </p>
              <p>Команда приїжджає зі своїм інвентарем, професійною хімією та зрозумілим планом робіт. Для кожного формату клінінгу ми ведемо окрему сторінку з цінами, переліком робіт, фото, FAQ та кнопками заявки.</p>
              <p>
                Якщо ви шукаєте <strong>клінінг Черкаси</strong>, важливо отримати не просто людину “на годину”, а команду, яка оцінить стан об’єкта, підбере засоби під поверхні, привезе обладнання і пояснить реальну вартість до початку робіт. Тому ми окремо показуємо{" "}
                <Link className="font-semibold text-brand-hover underline decoration-brand-green/30 underline-offset-4 transition hover:decoration-brand-green" href="/prices">
                  ціни на клінінг у Черкасах
                </Link>
                , приклади робіт і окремі посадкові сторінки під конкретні запити.
              </p>
              <p>
                Найчастіше клієнти звертаються до нас, коли потрібно швидко привести об’єкт до чистого стану перед заселенням, відкриттям, здачею в оренду або важливою подією. Для кожної задачі ми погоджуємо перелік робіт: що входить у базовий клінінг, що рахується окремо, скільки людей потрібно і скільки часу займе робота.
              </p>
              <div className="flex flex-wrap gap-2 pt-1" aria-label="Основні сторінки послуг">
                {priorityServiceLinks.map((link) => (
                  <a
                    className="rounded-md border border-brand-green/20 bg-white px-3 py-2 text-sm font-semibold text-brand-hover transition hover:border-brand-green"
                    href={absoluteUrl(link.href)}
                    key={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pb-16 md:pb-20">
        <div className="container grid gap-4 rounded-[24px] border border-brand-green/15 bg-white p-4 shadow-soft md:grid-cols-4">
          <Stat icon={<BadgeCheck size={22} aria-hidden />} value="5+" label="років досвіду" />
          <Stat icon={<HeartHandshake size={22} aria-hidden />} value="1000+" label="задоволених клієнтів" />
          <Stat icon={<BadgeCheck size={22} aria-hidden />} value="98%" label="рекомендують нас" />
          <Stat icon={<CalendarDays size={22} aria-hidden />} value="09:00–21:00" label="щодня" />
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
          <div data-nosnippet>
            <ServicesGrid limit={7} />
          </div>
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
