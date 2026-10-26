import type { Metadata } from "next";
import { BlogGrid } from "@/components/BlogGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Блог про прибирання, клінінг та чистоту | Формула Чистоти",
  description: "Корисні статті про прибирання після ремонту, генеральний клінінг, хімчистку меблів, миття вікон і комерційний клінінг у Черкасах.",
  path: "/blog"
});

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Блог", href: "/blog" }]} />
      <section className="section bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold md:text-5xl">Блог про прибирання, клінінг та чистоту</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">Поради клієнтам, розбір цін, підготовка до клінінгу та матеріали для локального SEO-просування.</p>
          <div className="mt-10"><BlogGrid /></div>
        </div>
      </section>
    </>
  );
}
