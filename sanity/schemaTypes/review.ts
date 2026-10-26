import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (rule) => rule.min(1).max(5) }),
    defineField({ name: "service", title: "Service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "source", title: "Source", type: "string" })
  ]
});
