import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { RelatedServices } from "@/components/RelatedServices";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Quote, Star } from "lucide-react";
import { absoluteUrl, contacts, reviews, workExamples, type Faq, type Service } from "@/lib/site";

const priceFactors = ["площа приміщення", "рівень забруднення", "кількість кімнат або зон", "додаткові роботи", "терміновість виконання", "особливості об’єкта та доступу"];
const trustItems = ["професійна хімія", "досвід роботи з різними об’єктами", "виїзд по Черкасах та області", "власний інвентар і обладнання", "реальні фото робіт", "заявка через сайт, телефон або месенджери"];
const seoProcessSteps = ["Приймаємо заявку", "Уточнюємо обсяг робіт", "Погоджуємо ціну", "Приїжджаємо зі своїм інвентарем і хімією", "Виконуємо роботу", "Клієнт приймає результат"];
const valueItems = ["професійна команда", "власна хімія та інвентар", "професійна техніка", "досвід у складних об’єктах", "фото до/після", "контроль якості", "відповідальність за результат", "робота з квартирами, будинками та комерційними приміщеннями"];
const internalLinks = [
  { href: "/poslugy", label: "Усі послуги" },
  { href: "/prices", label: "Ціни" },
  { href: "/kontakty", label: "Контакти" },
  { href: "/nashi-roboty", label: "Наші роботи" },
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
  const beforeAfter = getBeforeAfterCase(service);
  const review = getServiceReview(service.slug);
  const servicePriceFactors = service.priceFactors ?? priceFactors;
  const serviceTrustItems = service.trustItems ?? trustItems;
  const processSteps = service.processSteps ?? seoProcessSteps;
  const hasPriceImages = service.priceDetails?.some((item) => item.image);
  const relatedArticle = getRelatedArticle(service.slug);
  const showPriceNearTop = [
    "prybyrannya-kvartyr-cherkasy",
    "pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
    "generalne-prybyrannya-cherkasy",
    "generalne-prybyrannya-kvartyry-cherkasy",
    "himchystka-mebliv-cherkasy",
    "himchystka-dyvana-cherkasy",
    "himchystka-matratsa-cherkasy",
    "himchystka-kylymiv-cherkasy",
    "himchystka-avto-cherkasy",
  ].includes(service.slug);

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
            <Image src={service.image} alt={service.imageAlt} width={900} height={700} priority sizes="(max-width: 1024px) 92vw, 40vw" className="aspect-[9/7] w-full object-cover" />
            <div className="p-6">
            <p className="text-sm font-semibold text-brand-graphite">Ціна</p>
            <p className="mt-2 text-3xl font-bold text-brand-hover">{service.priceFrom}</p>
            <p className="mt-4 text-sm leading-6 text-brand-graphite">
              {service.slug === "prybyrannya-kvartyr-cherkasy"
                ? "Точний розрахунок робимо після уточнення площі, стану квартири, кількості кімнат і додаткових задач."
                : "Точний розрахунок робимо після уточнення площі, стану приміщення та додаткових задач."}
            </p>
            </div>
          </div>
        </div>
      </section>
      {showPriceNearTop ? <ServicePriceSection service={service} hasPriceImages={hasPriceImages} /> : null}
      {service.seoIntro ? (
        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-5 rounded-[24px] border border-brand-green/15 bg-white p-6 shadow-soft md:p-8">
              {service.seoIntroTitle ? <h2 className="text-3xl font-bold leading-tight text-brand-black">{service.seoIntroTitle}</h2> : null}
              <div className="grid gap-4 leading-8 text-brand-graphite">
                {service.seoIntro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {service.seoSections ? (
        <section className="section bg-white pt-0">
          <div className="container">
            <div className="grid gap-5 lg:grid-cols-3">
              {service.seoSections.map((section) => (
                <article className="rounded-2xl border border-brand-green/15 bg-brand-mist p-5 shadow-soft" key={section.title}>
                  <h2 className="text-xl font-bold leading-snug text-brand-black">{section.title}</h2>
                  <div className="mt-4 grid gap-3 text-sm leading-7 text-brand-graphite">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.list ? (
                      <ul className="grid gap-2">
                        {section.list.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="section bg-white">
        <div className="container grid gap-5 md:grid-cols-3">
          <InfoBlock title="Коли потрібна ця послуга" items={service.whenNeeded} />
          <InfoBlock title="Що входить у послугу" items={service.included} />
          <InfoBlock title="Що не входить або рахується окремо" items={service.excluded} />
        </div>
        <div className="container mt-8">
          <div className="flex flex-wrap gap-3 rounded-2xl bg-brand-mist p-5 shadow-soft">
            <PrimaryButton>Розрахувати вартість</PrimaryButton>
            <ContactButtons />
          </div>
        </div>
      </section>
      <section className="section bg-brand-mist">
        <div className="container grid gap-5 lg:grid-cols-2">
          <InfoBlock title="Від чого залежить ціна" items={servicePriceFactors} />
          <InfoBlock title="Чому обирають Формулу Чистоти" items={serviceTrustItems} />
        </div>
      </section>
      {service.cleaningHelps ? (
        <section className="section bg-white">
          <div className="container">
            <InfoBlock title="Що допомагає прибрати хімчистка" items={service.cleaningHelps} />
          </div>
        </section>
      ) : null}
      <section className="section bg-white">
        <div className="container grid gap-8 rounded-[28px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-hover">Цінність</p>
            <h2 className="text-3xl font-bold">
              {service.slug === "prybyrannya-kvartyr-cherkasy" ? "Чому краще замовити клінінгову компанію, а не випадкового кліннера" : "Чому у нас не найдешевше, але вигідно"}
            </h2>
            <div className="mt-5 grid gap-4 leading-7 text-brand-graphite">
              <p>Ми не працюємо як випадкові приватні клінери без відповідальності. Формула Чистоти — це команда, професійна хімія, інвентар, техніка, досвід і контроль якості.</p>
              <p>У вартість входить не тільки саме прибирання, а й підготовка, виїзд команди, підбір хімії, професійний інвентар, робота з важкими забрудненнями та перевірка результату.</p>
              <p>Клієнт платить не просто за години роботи, а за чистий результат, безпечний підхід до поверхонь і спокій, що об’єкт буде прибраний якісно.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {valueItems.map((item) => (
              <div className="rounded-2xl bg-white p-4 text-sm font-semibold text-brand-graphite shadow-soft" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>
      {!showPriceNearTop ? (
      <section className="section bg-white">
        <div className="container rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Ціна</p>
              <h2 className="mt-3 text-3xl font-bold text-brand-black">Отримайте точний розрахунок для вашого об’єкта</h2>
              <p className="mt-4 max-w-3xl leading-7 text-brand-graphite">Вартість залежить від площі, стану приміщення, типу поверхонь, терміновості та додаткових робіт. Орієнтир для цієї послуги: <strong className="text-brand-hover">{service.priceFrom}</strong>.</p>
              {service.priceDetails ? (
                <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${hasPriceImages ? "xl:grid-cols-4" : ""}`}>
                  {service.priceDetails.map((item) => (
                    <div className="overflow-hidden rounded-lg bg-white p-4 shadow-soft" key={item.title}>
                      {item.image ? (
                        <div
                          aria-label={item.imageAlt ?? item.title}
                          className="mb-3 h-28 rounded-md bg-white bg-no-repeat"
                          role="img"
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundPosition: item.imagePosition ?? "center",
                            backgroundSize: item.imagePosition ? "400% 200%" : "cover"
                          }}
                        />
                      ) : null}
                      <h3 className="text-base font-bold text-brand-black">{item.title}</h3>
                      <p className="mt-2 text-2xl font-bold text-brand-hover">{item.price}</p>
                      <p className="mt-2 text-sm leading-6 text-brand-graphite">{item.description}</p>
                      {item.linkHref ? (
                        <a className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-brand-green/25 bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-hover transition hover:border-brand-green focus-visible:focus-ring" href={item.linkHref}>
                          {item.linkLabel ?? "Детальніше"}
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
              {service.priceTable ? (
                <div className="mt-6 overflow-hidden rounded-lg border border-brand-green/15 bg-white shadow-soft">
                  <div className="border-b border-brand-green/10 px-4 py-3">
                    <h3 className="text-base font-bold text-brand-black">{service.priceTable.title}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[420px] text-left text-sm">
                      <thead className="bg-brand-mist text-brand-black">
                        <tr>
                          <th className="px-4 py-3 font-bold">{service.priceTable.columns?.[0] ?? "Площа"}</th>
                          <th className="px-4 py-3 font-bold">{service.priceTable.columns?.[1] ?? "Орієнтовна ціна"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {service.priceTable.rows.map(([area, price]) => (
                          <tr key={area}>
                            <td className="px-4 py-3 text-brand-graphite">{area}</td>
                            <td className="px-4 py-3 font-bold text-brand-hover">{price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {service.priceTable.note ? <p className="px-4 py-4 text-sm leading-6 text-brand-graphite">{service.priceTable.note}</p> : null}
                </div>
              ) : null}
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
      ) : null}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold">Наші роботи</h2>
          <p className="mt-4 max-w-2xl leading-7 text-brand-graphite">Добираємо фото під конкретну послугу: процес, обладнання, складні зони та фінальний охайний результат.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {examples.map((example) => (
              <article className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-soft" key={example.title}>
                <Image src={getExampleImage(example)} alt={getExampleAlt(example)} width={900} height={650} sizes="(max-width: 768px) 92vw, 33vw" className="aspect-[4/3] w-full object-cover" />
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
      <BeforeAfterSection caseItem={beforeAfter} />
      <section className="section bg-brand-mist">
        <div className="container">
          <h2 className="text-3xl font-bold">Як проходить робота</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div className="rounded-2xl bg-white p-5 shadow-soft" key={step}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green font-bold text-white">{index + 1}</span>
                <p className="mt-4 font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RelatedServices currentSlug={service.slug} />
      {relatedArticle ? (
        <section className="section bg-white">
          <div className="container">
            <div className="rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Корисна стаття</p>
              <h2 className="mt-3 text-3xl font-bold text-brand-black">{relatedArticle.title}</h2>
              <p className="mt-4 max-w-3xl leading-7 text-brand-graphite">{relatedArticle.description}</p>
              <a className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href={relatedArticle.href}>
                Читати статтю
              </a>
            </div>
          </div>
        </section>
      ) : null}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold">Корисні розділи</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {internalLinks.map((link) => (
              <a
                className="rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:border-brand-green"
                href={service.slug === "prybyrannya-kvartyr-cherkasy" && link.href === "/prices" ? absoluteUrl("/prices") : link.href}
                key={link.href}
              >
                {service.slug === "prybyrannya-kvartyr-cherkasy" && link.href === "/prices" ? "ціни на клінінг у Черкасах" : link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <FAQSection faq={faq} />
      <ServiceReview review={review} />
      <section className="section bg-brand-mist">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold">Хочете дізнатися точну вартість?</h2>
            <p className="mt-4 leading-7 text-brand-graphite">Залиште заявку — ми уточнимо деталі, підкажемо оптимальний формат прибирання та зорієнтуємо по ціні.</p>
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
            serviceType: service.title,
            description: service.shortDescription,
            provider: { "@id": absoluteUrl("/#localbusiness"), "@type": "LocalBusiness", name: contacts.companyName },
            areaServed: "Черкаси",
            priceRange: service.priceFrom,
            url: absoluteUrl(`/${service.slug}`)
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": absoluteUrl("/#localbusiness"),
            name: contacts.companyName,
            url: absoluteUrl("/"),
            telephone: contacts.phoneE164,
            email: contacts.email,
            image: absoluteUrl(service.image),
            logo: absoluteUrl("/brand/logo.png"),
            address: {
              "@type": "PostalAddress",
              addressLocality: contacts.city,
              addressCountry: contacts.country
            },
            areaServed: [contacts.city, "Черкаська область"],
            sameAs: [contacts.telegram, contacts.instagram, contacts.facebook]
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

function ServicePriceSection({ service, hasPriceImages }: { service: Service; hasPriceImages?: boolean }) {
  return (
    <section className="section bg-white">
      <div className="container rounded-[24px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Ціна</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-black">
              {service.slug === "prybyrannya-kvartyr-cherkasy" ? "Ціни на прибирання квартир у Черкасах" : "Отримайте точний розрахунок для вашого об’єкта"}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-brand-graphite">
              {service.slug === "prybyrannya-kvartyr-cherkasy"
                ? "Вартість залежить від площі, стану квартири, кількості кімнат, кухні, санвузлів, вікон, меблів і додаткових робіт."
                : "Вартість залежить від площі, стану приміщення, типу поверхонь, терміновості та додаткових робіт."}{" "}
              Орієнтир для цієї послуги: <strong className="text-brand-hover">{service.priceFrom}</strong>.
            </p>
            {service.slug === "prybyrannya-kvartyr-cherkasy" && service.priceDetails ? (
              <div className="mt-6 overflow-hidden rounded-lg border border-brand-green/15 bg-white shadow-soft">
                <div className="border-b border-brand-green/10 px-4 py-3">
                  <h3 className="text-base font-bold text-brand-black">Основні послуги</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <thead className="bg-brand-mist text-brand-black">
                      <tr>
                        <th className="px-4 py-3 font-bold">Послуга</th>
                        <th className="px-4 py-3 font-bold">Ціна</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {service.priceDetails.map((item) => (
                        <tr key={item.title}>
                          <td className="px-4 py-3 text-brand-graphite">{item.title}</td>
                          <td className="px-4 py-3 font-bold text-brand-hover">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            {service.priceDetails ? (
              <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${hasPriceImages ? "xl:grid-cols-4" : ""}`}>
                {service.priceDetails.map((item) => (
                  <div className="overflow-hidden rounded-lg bg-white p-4 shadow-soft" key={item.title}>
                    {item.image ? (
                      <div
                        aria-label={item.imageAlt ?? item.title}
                        className="mb-3 h-28 rounded-md bg-white bg-no-repeat"
                        role="img"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundPosition: item.imagePosition ?? "center",
                          backgroundSize: item.imagePosition ? "400% 200%" : "cover"
                        }}
                      />
                    ) : null}
                    <h3 className="text-base font-bold text-brand-black">{item.title}</h3>
                    <p className="mt-2 text-2xl font-bold text-brand-hover">{item.price}</p>
                    <p className="mt-2 text-sm leading-6 text-brand-graphite">{item.description}</p>
                    {item.linkHref ? (
                      <a className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-brand-green/25 bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-hover transition hover:border-brand-green focus-visible:focus-ring" href={item.linkHref}>
                        {item.linkLabel ?? "Детальніше"}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {service.priceTable ? (
              <div className="mt-6 overflow-hidden rounded-lg border border-brand-green/15 bg-white shadow-soft">
                <div className="border-b border-brand-green/10 px-4 py-3">
                  <h3 className="text-base font-bold text-brand-black">{service.priceTable.title}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <thead className="bg-brand-mist text-brand-black">
                      <tr>
                        <th className="px-4 py-3 font-bold">{service.priceTable.columns?.[0] ?? "Площа"}</th>
                        <th className="px-4 py-3 font-bold">{service.priceTable.columns?.[1] ?? "Орієнтовна ціна"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {service.priceTable.rows.map(([area, price]) => (
                        <tr key={area}>
                          <td className="px-4 py-3 text-brand-graphite">{area}</td>
                          <td className="px-4 py-3 font-bold text-brand-hover">{price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {service.priceTable.note ? <p className="px-4 py-4 text-sm leading-6 text-brand-graphite">{service.priceTable.note}</p> : null}
              </div>
            ) : null}
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

function getRelatedArticle(slug: string) {
  if (slug.includes("dyvana") || slug.includes("mebliv")) {
    return {
      title: "Як часто потрібно робити хімчистку дивана",
      description: "Пояснюємо, коли потрібна планова хімчистка дивана, як впливають діти, тварини, запахи й щоденне користування.",
      href: "/blog/yak-chasto-potribno-robyty-himchystku-dyvana"
    };
  }

  if (slug.includes("vikon")) {
    return {
      title: "Миття вікон після ремонту: що важливо знати",
      description: "Пояснюємо, чим відрізняється післяремонтне миття вікон, коли сліди клею, пилу, плівки чи фарби рахуються окремо.",
      href: "/blog/myttya-vikon-pislya-remontu"
    };
  }

  if (slug.includes("remontu")) {
    return {
      title: "Скільки коштує прибирання після ремонту у Черкасах",
      description: "Пояснюємо, від чого залежить ціна післяремонтного клінінгу: площа, пил, вікна, санвузли, плитка та стан об’єкта.",
      href: "/blog/skilky-koshtuye-prybyrannya-pislya-remontu-u-cherkasakh"
    };
  }

  return null;
}

function getServiceExamples(slug: string) {
  if (slug === "prybyrannya-kvartyr-cherkasy") {
    return workExamples
      .filter((item) =>
        item.category.includes("Прибирання квартир") ||
        item.title.includes("Прибирання квартири до та після") ||
        item.title.includes("Робота команди під час прибирання квартири") ||
        item.title.includes("Підтримуюче прибирання квартири") ||
        item.title.includes("Генеральне очищення духовки") ||
        item.title.includes("Миття холодильника") ||
        item.title.includes("Очищення плитки")
      )
      .slice(0, 4);
  }
  if (slug.includes("kvartyr")) return workExamples.filter((item) => item.category.includes("Житловий") || item.title.includes("квартир")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("generalne")) return workExamples.filter((item) => item.category.includes("Генеральне") || item.title.includes("духовки")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("kotedzhiv")) return workExamples.filter((item) => item.title.includes("будинку") || item.category.includes("Приватні будинки") || item.category.includes("Житловий")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("kylym")) return workExamples.filter((item) => item.title.includes("ковроліну")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("pozhezhi")) return workExamples.filter((item) => item.category.includes("пожеж")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("potopu")) return workExamples.filter((item) => item.category.includes("Складне") || item.category.includes("Комерційний")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("plytky") || slug.includes("plitky") || slug.includes("fasadiv")) return workExamples.filter((item) => item.title.includes("плитки") || item.title.includes("паркану")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("vikon")) {
    return workExamples
      .filter((item) => item.category.includes("Вікна"))
      .concat(workExamples.filter((item) => item.category.includes("Миття вікон")))
      .slice(0, 4);
  }
  if (slug.includes("remontu")) {
    return workExamples
      .filter((item) => item.category.includes("Післяремонтне"))
      .slice(0, 3);
  }
  if (slug.includes("dyvana")) return workExamples.filter((item) => item.title.toLowerCase().includes("дивана")).concat(workExamples.filter((item) => item.category.includes("Хімчистка"))).slice(0, 3);
  if (slug.includes("matratsa")) return workExamples.filter((item) => item.title.toLowerCase().includes("матраца")).concat(workExamples.filter((item) => item.category.includes("Хімчистка"))).slice(0, 3);
  if (slug.includes("mebliv")) return workExamples.filter((item) => item.title.toLowerCase().includes("стільців") || item.title.toLowerCase().includes("дивана") || item.category.includes("Хімчистка меблів")).concat(workExamples.filter((item) => item.category.includes("Хімчистка"))).slice(0, 3);
  if (slug.includes("avto")) {
    return workExamples
      .filter((item) => item.category.includes("Хімчистка авто"))
      .concat(workExamples.filter((item) => item.category.includes("Хімчистка")))
      .slice(0, 3);
  }
  if (slug.includes("ofis")) return workExamples.filter((item) => item.title.includes("Офіс") || item.category.includes("Комерційний")).concat(workExamples.slice(0, 2)).slice(0, 3);
  if (slug.includes("magazyn") || slug.includes("supermarket") || slug.includes("komertsiynykh") || slug.includes("trts")) return workExamples.filter((item) => item.category.includes("Комерційний") || item.title.includes("супермаркет") || item.title.includes("офіс")).concat(workExamples.slice(0, 2)).slice(0, 3);

  return workExamples.slice(0, 3);
}

type BeforeAfterCase =
  | {
      title: string;
      description: string;
      beforeImage: string;
      beforeAlt: string;
      afterImage: string;
      afterAlt: string;
      caption?: string;
    }
  | {
      title: string;
      description: string;
      beforeAfterImage: string;
      beforeAfterAlt: string;
      caption?: string;
      portrait?: boolean;
    };

function getBeforeAfterCase(service: Service): BeforeAfterCase {
  const { slug } = service;

  if (slug.includes("remontu")) {
    return {
      title: "До/після прибирання після ремонту та будівництва",
      description: "Реальний приклад післяремонтного прибирання об’єкта 100 м²: окремо рахували прибирання по 120 грн/м² та миття вікон після ремонту орієнтовно 30 м² по 200 грн/м².",
      beforeImage: "/images/works/post-renovation-cleaning-before-after/bathroom-after-renovation-before-cherkasy.jpg",
      beforeAlt: "Санвузол до прибирання після ремонту у Черкасах",
      afterImage: "/images/works/post-renovation-cleaning-before-after/bathroom-after-renovation-after-cherkasy.jpg",
      afterAlt: "Санвузол після прибирання після ремонту у Черкасах",
      caption: "Санвузол, пісуар, умивальник і плитка після ремонту — орієнтир за об’єкт 100 м² з вікнами близько 18 000 грн"
    };
  }

  if (slug.includes("pozhezhi")) {
    return {
      title: "До/після прибирання після пожежі",
      description: "Складні забруднення потребують професійної хімії, техніки та поетапного очищення кіптяви, гару й поверхонь.",
      beforeImage: "/images/works/before-after/fire-cleaning-kitchen-before-optimized.jpg",
      beforeAlt: "Кухня до прибирання після пожежі у Черкасах",
      afterImage: "/images/works/before-after/fire-cleaning-kitchen-after-optimized.jpg",
      afterAlt: "Кухня після прибирання після пожежі у Черкасах"
    };
  }

  if (slug.includes("generalne")) {
    return {
      title: "До/після генерального очищення складних зон",
      description: "Генеральне прибирання помітне саме в деталях: кухня, жир, пил у важкодоступних місцях, плінтуси та контактні поверхні.",
      beforeImage: "/images/works/before-after/oven-cleaning-before-optimized.jpg",
      beforeAlt: "Духовка до генерального очищення",
      afterImage: "/images/works/before-after/oven-cleaning-after-optimized.jpg",
      afterAlt: "Духовка після генерального очищення"
    };
  }

  if (slug.includes("plytky") || slug.includes("plitky")) {
    return {
      title: "До/після миття тротуарної плитки",
      description: "Мийка апаратом високого тиску допомагає прибрати бруд, мох і потемніння без заміни покриття.",
      beforeAfterImage: "/images/works/before-after/paving-stone-washing-before-after.webp",
      beforeAfterAlt: "Тротуарна плитка до і після миття у Черкасах"
    };
  }

  if (slug.includes("matratsa")) {
    return {
      title: "До/після хімчистки матраца",
      description: "Реальний приклад очищення матраца: видно різницю між станом до роботи та результатом після професійної хімчистки.",
      beforeAfterImage: "/images/works/mattress-cleaning-before-after-cherkasy.jpg",
      beforeAfterAlt: "Хімчистка матраца у Черкасах — до та після",
      caption: "Хімчистка матраца — результат до та після очищення",
      portrait: true
    };
  }

  if (slug.includes("mebliv")) {
    return {
      title: "До/після хімчистки стільців",
      description: "Приклад результату хімчистки стільців: тканина стає світлішою, чистішою та візуально охайнішою після екстракторного очищення.",
      beforeAfterImage: "/images/works/chairs-cleaning-before-after-cherkasy.jpg",
      beforeAfterAlt: "Чистка м’яких меблів до та після у Черкасах",
      caption: "Хімчистка стільців — результат до та після очищення",
      portrait: true
    };
  }

  if (slug.includes("dyvana")) {
    return {
      title: "До/після хімчистки дивана",
      description: "Реальний приклад результату хімчистки кутового дивана: після професійного очищення тканина виглядає світлішою, чистішою та охайнішою.",
      beforeAfterImage: "/images/services/before-after-sofa-cleaning.jpg",
      beforeAfterAlt: "Хімчистка дивана у Черкасах — до та після",
      caption: "Хімчистка дивана — результат до та після очищення"
    };
  }

  if (slug.includes("avto")) {
    return {
      title: "Наш бокс для хімчистки авто",
      description: "Працюємо з професійним обладнанням, екстрактором, компресором та хімією для тканини, шкіри, пластику й запахів.",
      beforeAfterImage: "/images/works/auto-cleaning-box/auto-cleaning-box-equipment-cherkasy.jpg",
      beforeAfterAlt: "Бокс для хімчистки авто Формула Чистоти у Черкасах",
      caption: "Фото нашого боксу для хімчистки авто у Черкасах"
    };
  }

  if (slug.includes("kvartyr")) {
    return {
      title: "До/після прибирання квартири",
      description: "Реальний приклад роботи в квартирі: прибрали побутовий безлад, очистили поверхні та привели кімнату до охайного стану для життя, оренди або продажу.",
      beforeImage: "/images/works/apartment-cleaning-before-after/apartment-room-before-cleaning-cherkasy.jpg",
      beforeAlt: "Квартира до професійного прибирання у Черкасах",
      afterImage: "/images/works/apartment-cleaning-before-after/apartment-room-after-cleaning-cherkasy.jpg",
      afterAlt: "Квартира після професійного прибирання Формула Чистоти у Черкасах",
      caption: "Прибирання квартири у Черкасах"
    };
  }

  if (slug.includes("kotedzhiv")) {
    return {
      title: "Результат прибирання котеджу",
      description: "Для котеджів важлива системність: кімнати, сходи, санвузли, кухня, підлога, тераса та інші зони мають прибиратися за погодженим планом.",
      beforeAfterImage: "/images/services/premium-house-cleaning-generated-optimized.jpg",
      beforeAfterAlt: "Результат професійного прибирання котеджу у Черкасах"
    };
  }

  if (slug.includes("potopu")) {
    return {
      title: "Результат після аварійного прибирання",
      description: "Після затоплення важливо швидко прибрати воду, бруд і проблемні зони, щоб зменшити ризик запаху та плісняви.",
      beforeAfterImage: "/images/services/post-flood-cleaning-generated-optimized.jpg",
      beforeAfterAlt: "Прибирання після потопу у Черкасах"
    };
  }

  if (slug.includes("vikon")) {
    return {
      title: "До/після миття вікон, рам і підвіконь",
      description: "Показуємо реальний результат очищення віконного блоку: прибираємо пил, павутиння, сезонний бруд, забруднення на рамах, фурнітурі та підвіконні.",
      beforeImage: "/images/works/window-cleaning-before-after/window-frame-before-cleaning-cherkasy-01.jpg",
      beforeAlt: "Віконна рама до миття у Черкасах",
      afterImage: "/images/works/window-cleaning-before-after/window-frame-after-cleaning-cherkasy-01.jpg",
      afterAlt: "Віконна рама після миття у Черкасах",
      caption: "Миття вікон у Черкасах — рама, підвіконня та важкодоступні зони"
    };
  }

  if (slug.includes("ofis")) {
    return {
      title: "Результат офісного клінінгу",
      description: "Чистий офіс краще сприймається командою, клієнтами та партнерами, особливо у зонах з постійним рухом людей.",
      beforeAfterImage: "/images/works/office-cleaning-01.webp",
      beforeAfterAlt: "Результат прибирання офісу у Черкасах"
    };
  }

  if (slug.includes("magazyn") || slug.includes("supermarket") || slug.includes("komertsiynykh") || slug.includes("trts")) {
    return {
      title: "Результат комерційного клінінгу",
      description: "Для бізнесу важливі стабільний стандарт чистоти, регламент, контроль якості та можливість працювати за зручним графіком.",
      beforeAfterImage: "/images/works/commercial-cleaning-01.webp",
      beforeAfterAlt: "Результат прибирання комерційного приміщення у Черкасах"
    };
  }

  return {
    title: `Результат послуги: ${service.title.toLowerCase()}`,
    description: "Показуємо реальний підхід до роботи: акуратність, професійне обладнання, контроль деталей і чистий фінальний результат.",
    beforeAfterImage: service.image,
    beforeAfterAlt: service.imageAlt
  };
}

function getServiceReview(slug: string) {
  if (slug.includes("dyvana") || slug.includes("matratsa") || slug.includes("mebliv")) return reviews[1];
  if (slug.includes("kvartyr") || slug.includes("generalne") || slug.includes("remontu")) return reviews[2];
  return reviews[0];
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

function BeforeAfterSection({ caseItem }: { caseItem: BeforeAfterCase }) {
  return (
    <section className="section bg-brand-mist">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-hover">До/після</p>
            <h2 className="text-3xl font-bold">{caseItem.title}</h2>
            <p className="mt-4 leading-7 text-brand-graphite">{caseItem.description}</p>
          </div>
          {"beforeAfterImage" in caseItem ? (
            <figure className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <div className={`relative w-full ${caseItem.portrait ? "aspect-[4/5] sm:aspect-[5/6]" : "aspect-[16/10]"}`}>
                <Image src={caseItem.beforeAfterImage} alt={caseItem.beforeAfterAlt} fill sizes="(max-width: 1024px) 92vw, 56vw" className="object-contain p-2" />
              </div>
              <figcaption className="px-5 py-4 text-sm font-semibold text-brand-graphite">{caseItem.caption ?? caseItem.title}</figcaption>
            </figure>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <Image src={caseItem.beforeImage} alt={caseItem.beforeAlt} width={900} height={680} sizes="(max-width: 768px) 92vw, 28vw" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-5 py-4 text-sm font-semibold text-brand-graphite">{caseItem.caption ? `До — ${caseItem.caption}` : "До"}</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <Image src={caseItem.afterImage} alt={caseItem.afterAlt} width={900} height={680} sizes="(max-width: 768px) 92vw, 28vw" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-5 py-4 text-sm font-semibold text-brand-graphite">Після</figcaption>
              </figure>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ServiceReview({ review }: { review: (typeof reviews)[number] }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <article className="rounded-[28px] border border-brand-green/15 bg-brand-mist p-6 shadow-soft md:p-8">
          <Quote className="mb-5 text-brand-green" size={30} aria-hidden />
          <div className="flex gap-1 text-brand-green" aria-label={`${review.rating} з 5`}>
            {Array.from({ length: review.rating }).map((_, index) => (
              <Star fill="currentColor" size={17} key={index} aria-hidden />
            ))}
          </div>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-brand-graphite">{review.text}</p>
          <div className="mt-5">
            <strong>{review.name}</strong>
            <span className="ml-3 text-sm text-brand-graphite">{review.service}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
