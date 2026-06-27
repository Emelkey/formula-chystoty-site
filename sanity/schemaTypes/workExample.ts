import { defineField, defineType } from "sanity";

export const workExample = defineType({
  name: "workExample",
  title: "Work Example",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "beforeImage", title: "Before Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "afterImage", title: "After Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "service", title: "Service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "date", title: "Date", type: "date" })
  ]
});
