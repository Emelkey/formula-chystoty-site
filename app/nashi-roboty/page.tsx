import type { Metadata } from "next";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Наші роботи — фото прибирання до і після | Формула Чистоти",
  description: "Дивіться приклади робіт Формула Чистоти у Черкасах: прибирання квартир, будинків, офісів, після ремонту, хімчистка меблів.",
  path: "/nashi-roboty"
});

export default function WorksPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Наші роботи", href: "/nashi-roboty" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Наші роботи</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Приклади об’єктів, форматів прибирання та результатів до/після. Реальні фото можна буде додавати через CMS.</p>
        </div>
      </section>
      <BeforeAfterGallery />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
