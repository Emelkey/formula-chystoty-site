import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { absoluteUrl, contacts, servicePages } from "@/lib/site";

export function BlogPostLayout({ post }: { post: { slug: string; title: string; seoDescription: string; category: string; publishedAt: string; updatedAt: string; excerpt: string; mainImage: string; imageAlt: string } }) {
  const faq = [
    { question: "Чи можна замовити консультацію перед клінінгом?", answer: "Так, ми уточнюємо площу, стан приміщення та перелік робіт перед розрахунком." },
    { question: "Чи працюєте у Черкасах з комерційними об’єктами?", answer: "Так, беремо офіси, магазини, супермаркети та інші комерційні приміщення." }
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Блог", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }]} />
      <article className="section bg-white">
        <div className="container max-w-3xl">
          <p className="mb-4 inline-flex rounded-md bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-hover">{post.category}</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-brand-graphite">
            <span>Автор: Формула Чистоти</span>
            <time dateTime={post.publishedAt}>Опубліковано: {new Intl.DateTimeFormat("uk-UA").format(new Date(post.publishedAt))}</time>
            <time dateTime={post.updatedAt}>Оновлено: {new Intl.DateTimeFormat("uk-UA").format(new Date(post.updatedAt))}</time>
          </div>
          <Image src={post.mainImage} alt={post.imageAlt} width={1200} height={800} priority sizes="(max-width: 768px) 100vw, 768px" className="my-8 aspect-[3/2] w-full rounded-lg object-cover" />
          <p className="text-lg leading-8 text-brand-graphite">{post.excerpt}</p>
          <h2 className="mt-9 text-2xl font-bold">Головне</h2>
          <p className="mt-4 leading-8 text-brand-graphite">Вартість і результат клінінгу залежать від площі, стану поверхонь, кількості меблів, доступу до вікон і очікуваного рівня деталізації. Професійна команда допомагає скоротити час, уникнути пошкоджень і отримати прогнозований результат.</p>
          <h2 className="mt-9 text-2xl font-bold">На що звернути увагу</h2>
          <ul className="mt-4 grid gap-3 leading-7 text-brand-graphite">
            <li>• уточніть, що саме входить у стандартну послугу;</li>
            <li>• покажіть фото або відео об’єкта перед розрахунком;</li>
            <li>• погодьте додаткові роботи до старту;</li>
            <li>• обирайте компанію з реальними відгуками та зрозумілою комунікацією.</li>
          </ul>
          <h2 className="mt-9 text-2xl font-bold">Корисні посилання</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {servicePages.slice(0, 4).map((service) => (
              <Link className="rounded-md bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-hover" href={`/${service.slug}`} key={service.slug}>{service.title}</Link>
            ))}
          </div>
          <div className="mt-10 rounded-lg bg-brand-green p-6 text-white">
            <h2 className="text-2xl font-bold">Замовити прибирання</h2>
            <p className="mt-3 leading-7 text-white/85">Напишіть нам, і ми підкажемо, який формат клінінгу підійде для вашого об’єкта.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <PrimaryButton />
              <ContactButtons />
            </div>
          </div>
        </div>
      </article>
      <SeoJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.seoDescription,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: { "@type": "Organization", name: contacts.companyName },
            publisher: { "@type": "Organization", name: contacts.companyName },
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
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
