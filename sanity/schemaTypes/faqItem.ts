import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "relatedPage", title: "Related Page", type: "string" })
  ]
});
