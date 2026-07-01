import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ReviewRequest } from "@/components/ReviewRequest";
import { ReviewsSection } from "@/components/ReviewsSection";
import { buildMetadata, contacts, reviewServiceTypes } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Відгуки клієнтів про Формула Чистоти | Черкаси",
  description: "Відгуки клієнтів про клінінгову компанію Формула Чистоти у Черкасах. Реальні враження після прибирання квартир, будинків, офісів та комерційних об’єктів.",
  path: "/vidguky"
});

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Відгуки", href: "/vidguky" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Відгуки клієнтів про Формулу Чистоти</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Відгуки допомагають новим клієнтам зрозуміти якість роботи, а нам — ставати кращими. Якщо ви вже замовляли прибирання у Формули Чистоти, будемо вдячні за ваш відгук.</p>
          <a className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">
            Залишити відгук на Google
          </a>
        </div>
      </section>
      <ReviewsSection />
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-brand-black">За які роботи можна залишити відгук</h2>
          <p className="mt-4 max-w-3xl leading-7 text-brand-graphite">Будемо вдячні за чесний відгук про будь-яку послугу, яку виконувала команда Формули Чистоти у Черкасах.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {reviewServiceTypes.map((type) => (
              <span className="rounded-full bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-hover" key={type}>{type}</span>
            ))}
          </div>
        </div>
      </section>
      <ReviewRequest />
      <CTASection />
    </>
  );
}
