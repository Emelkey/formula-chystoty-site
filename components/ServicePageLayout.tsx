import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { RelatedServices } from "@/components/RelatedServices";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { WorkSteps } from "@/components/WorkSteps";
import { absoluteUrl, contacts, workExamples, type Faq, type Service } from "@/lib/site";

const priceFactors = ["площа приміщення", "рівень забруднення", "кількість кімнат або зон", "додаткові роботи", "терміновість виконання", "особливості об’єкта та доступу"];
const trustItems = ["професійна хімія", "досвід роботи з різними об’єктами", "виїзд по Черкасах та області", "власний інвентар і обладнання", "реальні фото робіт", "заявка через сайт, телефон або месенджери"];
const internalLinks = [
  { href: "/services", label: "Усі послуги" },
  { href: "/prices", label: "Ціни" },
  { href: "/contacts", label: "Контакти" },
  { href: "/works", label: "Наші роботи" },
  { href: "/blog", label: "Блог" }
];
const fallbackFaq: Faq[] = [
  { question: "Чи можна отримати розрахунок по фото?", answer: "Так, надішліть фото або відео об’єкта, і ми дамо попередній орієнтир вартості." },
  { question: "Що впливає на фінальну ціну?", answer: "Площа, стан приміщення, тип поверхонь, додаткові роботи, терміновість і складність доступу." },
  { question: "Чи приїжджаєте зі своїм інвентарем?", answer: "Так, команда приїжджає з професійною хімією, інвентарем і потрібним обладнанням." },
  { question: "Чи працюєте по Черкасах та області?", answer: "Основний регіон — Черкаси. Виїзд за місто погоджуємо окремо." }
];

export function ServicePageLayout({ service }: { service: Service }) {
  const faq = ensureFaq(service.faq);
  const examples = getServiceExamples(service.slug);

  return (
    <>
      <Breadcrumbs items={[{ name: "Послуги", href: "/poslugy" }, { name: service.title, href: `/${service.slug}` }]} />
      <section className="bg-brand-mist py-12">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-brand-hover">{service.category}</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{service.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-graphite">{service.shortDescription}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton />
              <ContactButtons />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-soft">
            <Image src={service.image} alt={service.imageAlt} width={900} height={700} priority sizes="(max-width: 1024px) 100vw, 40vw" className="aspect-[9/7] w-full object-cover" />
            <div className="p-6">
            <p className="text-sm font-semibold text-brand-graphite">Ціна</p>
            <p className="mt-2 text-3xl font-bold text-brand-hover">{service.priceFrom}</p>
            <p className="mt-4 text-sm leading-6 text-brand-graphite">Точний розрахунок робимо після уточнення площі, стану приміщення та додаткових задач.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container grid gap-5 md:grid-cols-3">
          <InfoBlock title="Коли потрібна послуга" items={service.whenNeeded} />
          <InfoBlock title="Що входить" items={service.included} />
          <InfoBlock title="Що не входить стандартно" items={service.excluded} />
        </div>
      </section>
      <section className="section bg-brand-mist">
        <div className="container grid gap-5 lg:grid-cols-2">
          <InfoBlock title="Від чого залежить ціна" items={priceFactors} />
          <InfoBlock title="Чому обирають Формулу Чистоти" items={trustItems} />
        </div>
      </section>
      <section className="section bg-white">
        <div className="container rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Ціна</p>
              <h2 className="mt-3 text-3xl font-bold text-brand-black">Отримайте точний розрахунок для вашого об’єкта</h2>
              <p className="mt-4 max-w-3xl leading-7 text-brand-graphite">Вартість залежить від площі, стану приміщення, типу поверхонь, терміновості та додаткових робіт. Орієнтир для цієї послуги: <strong className="text-brand-hover">{service.priceFrom}</strong>.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <PrimaryButton>Отримати точний розрахунок</PrimaryButton>
              <a className="inline-flex min-h-12 items-center justify-center rounded-md border border-brand-green/25 bg-white px-5 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:border-brand-green focus-visible:focus-ring" href="/prices">
                Дивитися всі ціни
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold">Приклади робіт</h2>
          <p className="mt-4 max-w-2xl leading-7 text-brand-graphite">Реальні фото і візуальні приклади допомагають оцінити підхід Формули Чистоти до складних і щоденних задач.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {examples.map((example) => (
              <article className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-soft" key={example.title}>
                <Image src={getExampleImage(example)} alt={getExampleAlt(example)} width={900} height={650} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-hover">{example.category}</p>
                  <h3 className="mt-2 text-lg font-bold">{example.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-graphite">{example.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WorkSteps />
      <RelatedServices currentSlug={service.slug} />
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold">Корисні розділи</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {internalLinks.map((link) => (
              <a className="rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:border-brand-green" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <FAQSection faq={faq} />
      <ReviewsSection />
      <section className="section bg-brand-mist">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold">Потрібне прибирання?</h2>
            <p className="mt-4 leading-7 text-brand-graphite">Залиште заявку — ми розрахуємо вартість для вашого об’єкта у Черкасах.</p>
            <div className="mt-6">
              <ContactButtons />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <SeoJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.h1,
            description: service.shortDescription,
            provider: { "@type": "LocalBusiness", name: contacts.companyName, areaServed: "Черкаси" },
            areaServed: "Черкаси",
            url: absoluteUrl(`/${service.slug}`)
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer }
            }))
          }
        ]}
      />
    </>
  );
}

function ensureFaq(faq: Faq[]) {
  const questions = new Set(faq.map((item) => item.question));
  const merged = [...faq];

  for (const item of fallbackFaq) {
    if (merged.length >= 5) break;
    if (!questions.has(item.question)) merged.push(item);
  }

  return merged;
}

function getServiceExamples(slug: string) {
  if (slug.includes("kylym")) return workExamples.filter((item) => item.title.includes("ковроліну")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("pozhezhi")) return workExamples.filter((item) => item.category.includes("пожеж")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("plitky") || slug.includes("fasadiv")) return workExamples.filter((item) => item.title.includes("плитки") || item.title.includes("паркану")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("remontu")) return workExamples.filter((item) => item.category.includes("Післяремонтне")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("mebliv") || slug.includes("avto")) return workExamples.filter((item) => item.category.includes("Хімчистка")).concat(workExamples.slice(0, 2)).slice(0, 3);

  return workExamples.slice(0, 3);
}

function getExampleImage(example: (typeof workExamples)[number]) {
  if ("afterImage" in example) return example.afterImage;
  if ("beforeAfterImage" in example) return example.beforeAfterImage;
  return example.image;
}

function getExampleAlt(example: (typeof workExamples)[number]) {
  if ("afterImageAlt" in example) return example.afterImageAlt;
  if ("beforeAfterImageAlt" in example) return example.beforeAfterImageAlt;
  return example.imageAlt;
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-black/5 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-brand-graphite">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
