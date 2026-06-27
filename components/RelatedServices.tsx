import Link from "next/link";
import { servicePages } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

export function RelatedServices({ currentSlug }: { currentSlug?: string }) {
  const related = servicePages.filter((service) => service.slug !== currentSlug).slice(0, 3);

  return (
    <section className="section bg-brand-mist">
      <div className="container">
        <SectionHeading eyebrow="Також замовляють" title="Схожі послуги" />
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((service) => (
            <Link className="rounded-lg bg-white p-5 shadow-soft transition hover:-translate-y-1" href={`/${service.slug}`} key={service.slug}>
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-brand-graphite">{service.shortDescription}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-hover">{service.priceFrom}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
