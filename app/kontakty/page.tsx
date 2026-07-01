import type { Metadata } from "next";
import Image from "next/image";
import { Instagram, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactButtons } from "@/components/Buttons";
import { ContactForm } from "@/components/ContactForm";
import { GoogleMapsTrust } from "@/components/GoogleMapsTrust";
import { Logo } from "@/components/Logo";
import { ReviewRequest } from "@/components/ReviewRequest";
import { TrackedLink } from "@/components/TrackedLink";
import { aboutImages, buildMetadata, contacts, localDistricts } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Контакти клінінгової компанії Формула Чистоти у Черкасах",
  description: "Контакти Формула Чистоти: клінінгова компанія у Черкасах, прибирання квартир, будинків, офісів, комерційних приміщень, хімчистка меблів і миття вікон.",
  path: "/kontakty"
});

export default function ContactsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Контакти", href: "/kontakty" }]} />
      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div className="order-2 lg:order-1">
            <Logo className="mb-7 w-[112px]" />
            <h1 className="text-4xl font-bold md:text-5xl">Контакти клінінгової компанії Формула Чистоти у Черкасах</h1>
            <p className="mt-5 text-lg leading-8 text-brand-graphite">Формула Чистоти — клінінгова компанія у Черкасах. Виконуємо прибирання квартир, будинків, офісів, комерційних приміщень, хімчистку меблів, миття вікон, прибирання після ремонту, потопу та пожежі.</p>
            <div className="mt-7 grid gap-3 text-brand-graphite">
              <strong className="text-brand-black">{contacts.companyName}</strong>
              <TrackedLink className="font-semibold text-brand-hover" href={contacts.phoneHref} eventName="phone_click" eventCategory="contact" eventLabel="phone">{contacts.phone}</TrackedLink>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
              <span>{contacts.address}</span>
              <span>{contacts.workingHours}</span>
              <TrackedLink href={contacts.telegram} target="_blank" rel="noopener noreferrer" eventName="telegram_click" eventCategory="contact" eventLabel="telegram">Telegram</TrackedLink>
              <TrackedLink href={contacts.instagram} target="_blank" rel="noopener noreferrer" eventName="instagram_click" eventCategory="social" eventLabel="instagram">Instagram</TrackedLink>
              <a href={contacts.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a className="font-semibold text-brand-hover" href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <ContactButtons />
              <TrackedLink className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-black transition hover:border-brand-green hover:text-brand-hover focus-visible:focus-ring" href={contacts.instagram} target="_blank" rel="noopener noreferrer" eventName="instagram_click" eventCategory="social" eventLabel="instagram">
                <Instagram size={16} aria-hidden />
                Instagram
              </TrackedLink>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container">
          <div className="rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8">
            <h2 className="text-3xl font-bold text-brand-black">Працюємо по Черкасах та районах міста</h2>
            <p className="mt-4 max-w-3xl leading-7 text-brand-graphite">Виїжджаємо на об’єкти по Черкасах: квартири, будинки, офіси, магазини, салони, комерційні приміщення та прилеглі території.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {localDistricts.map((district) => (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-hover shadow-soft" key={district}>{district}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-brand-mist">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-hover">Як нас знайти</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">Знайдіть нас на карті</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-brand-graphite">Відкрийте точку Формула Чистоти на Google Maps, щоб побудувати маршрут або швидко знайти нас.</p>
            <a className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">
              Відкрити в Google Maps
            </a>
          </div>
          <div className="grid gap-5">
            <article className="overflow-hidden rounded-[24px] border border-[#E8EEE5] bg-white shadow-soft">
              <Image src={aboutImages.team.src} alt={aboutImages.team.alt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-hover">Про компанію</p>
                <h3 className="mt-2 text-xl font-bold text-brand-black">Автомобіль та офіс Формула Чистоти</h3>
                <p className="mt-3 text-sm leading-6 text-brand-graphite">Власний брендований автомобіль, офіс і команда для виїзного клінінгу у Черкасах.</p>
              </div>
            </article>
            <div className="rounded-[24px] border border-[#E8EEE5] bg-white p-5 shadow-soft">
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[20px] bg-brand-mist p-6 text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-green/20 bg-white text-brand-green shadow-soft">
                  <MapPin size={30} strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-bold text-brand-black">Формула Чистоти на Google Maps</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-brand-graphite">Відкрийте нашу точку в Google Maps, побудуйте маршрут або залиште відгук після виконаного прибирання.</p>
                <a className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-brand-green/25 bg-white px-4 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:border-brand-green focus-visible:focus-ring" href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">
                  Відкрити на Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GoogleMapsTrust />
      <ReviewRequest />
      <section className="section bg-white">
        <div className="container grid gap-8 rounded-[24px] bg-brand-mist p-6 shadow-soft lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold text-brand-black">Залиште заявку — ми розрахуємо вартість прибирання у Черкасах</h2>
            <p className="mt-4 leading-7 text-brand-graphite">Опишіть приміщення, площу, бажану дату або надішліть фото. Ми швидко підкажемо орієнтовну вартість і зручний формат робіт.</p>
          </div>
          <ContactForm compact submitLabel="Отримати розрахунок" />
        </div>
      </section>
    </>
  );
}
