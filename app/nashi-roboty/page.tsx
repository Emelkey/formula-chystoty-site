import type { Metadata } from "next";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { buildMetadata, workCategories } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Наші роботи з прибирання у Черкасах | Формула Чистоти",
  description: "Реальні приклади робіт Формула Чистоти: прибирання квартир, хімчистка меблів, миття плитки, прибирання після ремонту та пожежі у Черкасах.",
  path: "/nashi-roboty"
});

export default function WorksPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Наші роботи", href: "/nashi-roboty" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Наші роботи з прибирання у Черкасах</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Тут зібрані приклади робіт Формули Чистоти: прибирання квартир, хімчистка меблів, миття плитки, прибирання після ремонту, пожежі та інші клінінгові послуги у Черкасах.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {workCategories.map((category) => (
              <span className="rounded-full bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-hover" key={category}>{category}</span>
            ))}
          </div>
        </div>
      </section>
      <BeforeAfterGallery realPhotosOnly />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
