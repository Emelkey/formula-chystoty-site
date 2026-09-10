import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { serviceCatalog } from "@/seo/service-catalog";
import { buildMetadata, homeFaq, getService } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Клінінгові послуги у Черкасах | Формула Чистоти",
  description: "Усі послуги клінінгової компанії Формула Чистоти у Черкасах: прибирання квартир, будинків, комерційних приміщень, після ремонту, миття вікон, хімчистка меблів.",
  path: "/poslugy"
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Послуги", href: "/poslugy" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Клінінгові послуги у Черкасах</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Повний перелік послуг для квартир, будинків, комерційних приміщень, складних об’єктів і післяремонтного клінінгу.</p>
          <nav className="mt-6 flex flex-wrap gap-3" aria-label="Категорії послуг">
            {serviceCatalog.map((group) => <Link className="inline-flex min-h-11 items-center rounded-md bg-brand-mist px-4 py-2 font-semibold text-brand-hover" href={`#${group.id}`} key={group.id}>{group.title}</Link>)}
            <Link className="inline-flex min-h-11 items-center px-4 py-2 font-semibold text-brand-hover underline" href="/prices">Дивитися всі ціни</Link>
          </nav>
          {serviceCatalog.map((group) => (
            <section className="mt-12 scroll-mt-24" id={group.id} key={group.id}>
              <h2 className="mb-6 text-3xl font-bold">{group.title}</h2>
              <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
                {group.services.map(({ slug, summary }) => {
                  const service = getService(slug);
                  return service ? <ServiceCard service={{ ...service, shortDescription: summary }} key={slug} /> : null;
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
      <CTASection />
      <FAQSection faq={homeFaq} />
    </>
  );
}
