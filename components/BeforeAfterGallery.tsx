import Image from "next/image";
import Link from "next/link";
import { workExamples } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

const workServiceLinks: Record<string, string> = {
  "Хімчистка сидіння авто в процесі": "/himchystka-avto-cherkasy",
  "Бокс для хімчистки авто": "/himchystka-avto-cherkasy",
  "Професійна хімія для авто": "/himchystka-avto-cherkasy",
  "Миття рами та підвіконня до і після": "/myttya-vikon-cherkasy",
  "Очищення підвіконня та віконного блоку": "/myttya-vikon-cherkasy",
  "Миття фурнітури та нижньої частини вікна": "/myttya-vikon-cherkasy",
  "Прибирання квартири до та після": "/prybyrannya-kvartyr-cherkasy",
  "Миття холодильника в квартирі до та після": "/prybyrannya-kvartyr-cherkasy",
  "Робота команди під час прибирання квартири": "/prybyrannya-kvartyr-cherkasy",
  "Очищення духовки від жиру та нагару": "/generalne-prybyrannya-kuhni-cherkasy",
  "Хімчистка ковроліну": "/himchystka-kovrolinu-cherkasy",
  "Хімчистка стільців": "/himchystka-stiltsiv-cherkasy",
  "Хімчистка дивана": "/himchystka-dyvana-cherkasy",
  "Хімчистка дивана в процесі": "/himchystka-dyvana-cherkasy",
  "Хімчистка матраца": "/himchystka-matratsa-cherkasy",
  "Генеральне очищення духовки": "/generalne-prybyrannya-kuhni-cherkasy",
  "Очищення плитки під час генерального прибирання": "/generalne-prybyrannya-cherkasy",
  "Миття вікон до та після": "/myttya-vikon-cherkasy",
  "Миття холодильника всередині": "/generalne-prybyrannya-kuhni-cherkasy",
  "Прибирання кухні після пожежі": "/prybyrannya-pislya-pozhezhi-cherkasy",
  "Миття тротуарної плитки": "/myttya-plytky-cherkasy",
  "Санвузол після ремонту — до та після": "/prybyrannya-pislya-remontu-cherkasy",
  "Очищення раковини та плитки після ремонту": "/prybyrannya-pislya-remontu-cherkasy",
  "Прибирання після будівництва": "/prybyrannya-pislya-remontu-cherkasy",
  "Підтримуюче прибирання квартири": "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
  "Генеральне прибирання важкодоступних місць": "/generalne-prybyrannya-cherkasy",
  "Миття великих вікон": "/myttya-vikon-cherkasy",
  "Офіс після робочого дня": "/prybyrannya-ofisiv-cherkasy",
  "Прибирання будинку": "/prybyrannya-budynkiv-cherkasy",
  "Прибирання після пожежі": "/prybyrannya-pislya-pozhezhi-cherkasy",
  "Автомобіль та офіс Формула Чистоти": "/pro-nas"
};

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
                <Image src={work.image} alt={work.imageAlt} width={1200} height={900} sizes="(max-width: 768px) 92vw, 33vw" className="aspect-[4/3] w-full object-cover" />
              )}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-hover">{work.category}</p>
                <h2 className="mt-2 text-xl font-bold">
                  {index + 1}.{" "}
                  {workServiceLinks[work.title] ? (
                    <Link className="transition hover:text-brand-hover" href={workServiceLinks[work.title]}>
                      {work.title}
                    </Link>
                  ) : work.title}
                </h2>
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
        <Image src={src} alt={alt} width={1200} height={900} sizes="(max-width: 768px) 92vw, 66vw" className="aspect-[16/9] w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-black shadow-soft">До</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-black shadow-soft">Після</span>
      </div>
    </div>
  );
}

function BeforeAfterImage({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-brand-mist shadow-soft">
      <Image src={src} alt={alt} width={1200} height={900} sizes="(max-width: 768px) 92vw, 50vw" className="aspect-[4/3] w-full object-cover" />
      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-black shadow-soft">{label}</span>
    </div>
  );
}
