import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
    defineField({ name: "h1", title: "H1", type: "string" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 4 }),
    defineField({ name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "priceFrom", title: "Price From", type: "string" }),
    defineField({ name: "whatIncluded", title: "What Included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "whatNotIncluded", title: "What Not Included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "steps", title: "Steps", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "object", fields: [{ name: "question", type: "string" }, { name: "answer", type: "text" }] }]
    }),
    defineField({ name: "relatedServices", title: "Related Services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] })
  ]
});
