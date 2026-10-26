import Image from "next/image";
import { CaseCard } from "@/components/CaseCard";
import { canPublishCase, type CaseStudyRecord } from "@/lib/case-studies";

export function CaseStudy({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  if (!canPublishCase(caseStudy)) return null;
  const titleId = `case-${caseStudy.id}`;

  return (
    <section className="section bg-brand-mist" aria-labelledby={titleId} data-case-id={caseStudy.id}>
      <div className="container">
        <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-hover">Приклад нашої роботи</p>
        <h2 className="text-3xl font-bold" id={titleId}>{caseStudy.title}</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <CaseCard caseStudy={caseStudy} />
          <div className="min-w-0">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { ...caseStudy.beforeImage, label: "До прибирання" },
                { ...caseStudy.afterImage, label: "Після прибирання" }
              ].map((photo) => (
                <figure className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-soft" key={photo.label}>
                  <Image src={photo.src} alt={photo.alt} width={900} height={680} sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 28vw" className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="px-5 py-4 text-sm font-semibold text-brand-graphite">{photo.label}</figcaption>
                </figure>
              ))}
            </div>
            {caseStudy.facts.result ? <p className="mt-4 text-sm leading-7 text-brand-graphite">{caseStudy.facts.result}</p> : null}
            <a className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-hover underline underline-offset-4 focus-visible:focus-ring" href="/nashi-roboty">Більше фото наших робіт</a>
          </div>
        </div>
      </div>
    </section>
  );
}
