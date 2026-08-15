import type { ReactNode } from "react";
import { BadgeCheck, CalendarDays, Clock, HeartHandshake } from "lucide-react";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { ContactForm } from "@/components/ContactForm";
import { GoogleMapsTrust } from "@/components/GoogleMapsTrust";
import { HomeServicesSection } from "@/components/HomeServicesSection";
import { HeroSection } from "@/components/HeroSection";
import { PricingSection } from "@/components/PricingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WorkSteps } from "@/components/WorkSteps";
import { absoluteUrl, reviews } from "@/lib/site";

export function HomePageContent() {
  return (
    <>
      <HeroSection
        title="Професійний клінінг"
        accent="у Черкасах"
        description="Прибирання квартир, будинків і комерційних приміщень. Виїжджаємо зі своєю технікою та професійними засобами. Вартість — від 55 грн/м². Точний розрахунок зробимо за фото."
      />
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
      <HomeServicesSection />
      <WorkSteps />
      <WhyChooseUs />
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
