import { defineField, defineType } from "sanity";

export const priceItem = defineType({
  name: "priceItem",
  title: "Price Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "unit", title: "Unit", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number" })
  ]
});
