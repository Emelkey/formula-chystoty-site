import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { absoluteUrl, contacts, servicePages } from "@/lib/site";

type BlogPostSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  subSections?: {
    heading: string;
    paragraphs?: string[];
    list?: string[];
  }[];
};

type BlogPost = {
  slug: string;
  title: string;
  seoDescription: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
  mainImage: string;
  imageAlt: string;
  readingTime?: string;
  intro?: string[];
  content?: BlogPostSection[];
  faq?: { question: string; answer: string }[];
};

const internalLinks = [
  { text: "прибирання квартир у Черкасах", href: "/prybyrannya-kvartyr-cherkasy" },
  { text: "клінінгові послуги у Черкасах", href: "/poslugy" },
  { text: "вартість прибирання", href: "/tsiny" },
  { text: "залишити заявку", href: "/kontakty" },
  { text: "приклади наших робіт", href: "/nashi-roboty" }
];

export function BlogPostLayout({ post }: { post: BlogPost }) {
  const faq = post.faq ?? [
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
            {post.readingTime ? <span>{post.readingTime}</span> : null}
          </div>
          <Image src={post.mainImage} alt={post.imageAlt} width={1200} height={800} priority sizes="(max-width: 768px) 92vw, 768px" className="my-8 aspect-[3/2] w-full rounded-lg object-cover" />
          <p className="text-lg leading-8 text-brand-graphite">{post.excerpt}</p>

          {post.content ? (
            <div className="mt-8">
              {post.intro?.map((paragraph) => (
                <p className="mt-4 leading-8 text-brand-graphite" key={paragraph}>{renderTextWithLinks(paragraph)}</p>
              ))}
              {post.content.map((section) => (
                <section className="mt-9" key={section.heading}>
                  <h2 className="text-2xl font-bold">{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p className="mt-4 leading-8 text-brand-graphite" key={paragraph}>{renderTextWithLinks(paragraph)}</p>
                  ))}
                  {section.list ? <ArticleList items={section.list} /> : null}
                  {section.subSections?.map((subSection) => (
                    <section className="mt-7" key={subSection.heading}>
                      <h3 className="text-xl font-bold">{subSection.heading}</h3>
                      {subSection.paragraphs?.map((paragraph) => (
                        <p className="mt-4 leading-8 text-brand-graphite" key={paragraph}>{renderTextWithLinks(paragraph)}</p>
                      ))}
                      {subSection.list ? <ArticleList items={subSection.list} /> : null}
                    </section>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <>
              <h2 className="mt-9 text-2xl font-bold">Головне</h2>
              <p className="mt-4 leading-8 text-brand-graphite">Вартість і результат клінінгу залежать від площі, стану поверхонь, кількості меблів, доступу до вікон і очікуваного рівня деталізації. Професійна команда допомагає скоротити час, уникнути пошкоджень і отримати прогнозований результат.</p>
              <h2 className="mt-9 text-2xl font-bold">На що звернути увагу</h2>
              <ul className="mt-4 grid gap-3 leading-7 text-brand-graphite">
                <li>• уточніть, що саме входить у стандартну послугу;</li>
                <li>• покажіть фото або відео об’єкта перед розрахунком;</li>
                <li>• погодьте додаткові роботи до старту;</li>
                <li>• обирайте компанію з реальними відгуками та зрозумілою комунікацією.</li>
              </ul>
            </>
          )}

          <section className="mt-9">
            <h2 className="text-2xl font-bold">FAQ</h2>
            <div className="mt-4 grid gap-3">
              {faq.map((item) => (
                <div className="rounded-lg bg-brand-mist p-4" key={item.question}>
                  <h3 className="font-bold text-brand-black">{item.question}</h3>
                  <p className="mt-2 leading-7 text-brand-graphite">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <h2 className="mt-9 text-2xl font-bold">Корисні посилання</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className="rounded-md bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-hover" href="/poslugy">Усі послуги</Link>
            <Link className="rounded-md bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-hover" href="/tsiny">Ціни</Link>
            <Link className="rounded-md bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-hover" href="/kontakty">Контакти</Link>
            <Link className="rounded-md bg-brand-mist px-3 py-2 text-sm font-semibold text-brand-hover" href="/nashi-roboty">Наші роботи</Link>
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

function ArticleList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-3 leading-7 text-brand-graphite">
      {items.map((item) => (
        <li key={item}>• {renderTextWithLinks(item)}</li>
      ))}
    </ul>
  );
}

function renderTextWithLinks(text: string) {
  const parts: (string | { text: string; href: string })[] = [text];

  for (const link of internalLinks) {
    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];
      if (typeof part !== "string" || !part.includes(link.text)) continue;

      const split = part.split(link.text);
      parts.splice(index, 1, ...split.flatMap((value, splitIndex) => splitIndex === split.length - 1 ? [value] : [value, link]).filter(Boolean));
    }
  }

  return (
    <>
      {parts.map((part, index) => typeof part === "string" ? part : (
        <Link className="font-semibold text-brand-hover underline-offset-4 hover:underline" href={part.href} key={`${part.href}-${index}`}>{part.text}</Link>
      ))}
    </>
  );
}
