import Image from "next/image";
import { workExamples } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

export function BeforeAfterGallery({ realPhotosOnly = false }: { realPhotosOnly?: boolean }) {
  const examples = realPhotosOnly ? workExamples.filter(isRealWorkPhoto) : workExamples;

  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading eyebrow="Роботи" title="Наші роботи" description="Показуємо типові задачі, з якими працює команда: квартири, будинки, офіси, вікна та регулярний сервіс." />
        <div className="grid gap-5 md:grid-cols-3">
          {examples.map((work, index) => (
            <article className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft ${"beforeImage" in work || "beforeAfterImage" in work ? "md:col-span-3" : ""}`} key={work.title}>
              {"beforeImage" in work ? (
                <div className="grid gap-3 p-3 md:grid-cols-2">
                  <BeforeAfterImage label="До" src={work.beforeImage} alt={work.beforeImageAlt} />
                  <BeforeAfterImage label="Після" src={work.afterImage} alt={work.afterImageAlt} />
                </div>
              ) : "beforeAfterImage" in work ? (
                <CombinedBeforeAfterImage src={work.beforeAfterImage} alt={work.beforeAfterImageAlt} />
              ) : (
                <Image src={work.image} alt={work.imageAlt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-[4/3] w-full object-cover" />
              )}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-hover">{work.category}</p>
                <h2 className="mt-2 text-xl font-bold">{index + 1}. {work.title}</h2>
                <p className="mt-3 text-sm leading-6 text-brand-graphite">{work.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function isRealWorkPhoto(work: (typeof workExamples)[number]) {
  if ("beforeImage" in work) return work.beforeImage.startsWith("/images/works/") && work.afterImage.startsWith("/images/works/");
  if ("beforeAfterImage" in work) return work.beforeAfterImage.startsWith("/images/works/");
  return work.image.startsWith("/images/works/");
}

function CombinedBeforeAfterImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="p-3">
      <div className="relative overflow-hidden rounded-[18px] bg-brand-mist shadow-soft">
        <Image src={src} alt={alt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 66vw" className="aspect-[16/9] w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-black shadow-soft">До</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-black shadow-soft">Після</span>
      </div>
    </div>
  );
}

function BeforeAfterImage({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-brand-mist shadow-soft">
      <Image src={src} alt={alt} width={1200} height={900} sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-black shadow-soft">{label}</span>
    </div>
  );
}
