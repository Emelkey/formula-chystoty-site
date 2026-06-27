import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
    defineField({ name: "author", title: "Author", type: "string", initialValue: "Формула Чистоти" }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Прибирання після ремонту", "Генеральне прибирання", "Хімчистка меблів", "Миття вікон", "Прибирання офісів", "Поради клієнтам", "Комерційний клінінг"] } }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "object", fields: [{ name: "question", type: "string" }, { name: "answer", type: "text" }] }]
    }),
    defineField({ name: "relatedServices", title: "Related Services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] })
  ]
});
