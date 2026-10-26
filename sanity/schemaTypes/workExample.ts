import { defineField, defineType } from "sanity";
import { getCasePublicationIssues, type CaseFacts } from "@/lib/case-studies";

type CaseDocument = {
  recordType?: "gallery" | "evidence" | "complete";
  service?: { _ref?: string };
  date?: string;
  beforeImage?: { asset?: { _ref?: string } };
  afterImage?: { asset?: { _ref?: string } };
  caseDetails?: Omit<CaseFacts, "completedOn" | "price"> & {
    verified?: boolean;
    sourceReference?: string;
    publicationApproved?: boolean;
    beforeAfterVerified?: boolean;
    priceText?: string;
    pricePublicationApproved?: boolean;
  };
};

export const workExample = defineType({
  name: "workExample",
  title: "Work Example",
  type: "document",
  description: "Фото галереї не рахується окремим повним кейсом. Один об’єкт — один запис кейсу; невідомі факти залишайте порожніми.",
  validation: (rule) => rule.custom((value) => {
    const document = value as CaseDocument | undefined;
    if (!document?.recordType || document.recordType === "gallery") return true;
    const details = document.caseDetails ?? {};
    const issues = getCasePublicationIssues(
      {
        ...details,
        completedOn: document.date,
        ...(details.priceText ? { price: { text: details.priceText, publicationApproved: details.pricePublicationApproved === true } } : {})
      },
      {
        verified: details.verified === true,
        sourceReference: details.sourceReference ?? "",
        publicationApproved: details.publicationApproved === true,
        beforeAfterVerified: details.beforeAfterVerified === true
      },
      Boolean(
        document.beforeImage?.asset?._ref && document.afterImage?.asset?._ref &&
        document.beforeImage.asset._ref !== document.afterImage.asset._ref
      ),
      document.recordType
    );
    if (!document.service?._ref) issues.push("Оберіть сторінку послуги для кейсу.");
    return issues.length ? issues.join(" ") : true;
  }),
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "recordType",
      title: "Тип матеріалу",
      type: "string",
      initialValue: "gallery",
      validation: (rule) => rule.custom((value) => !value || ["gallery", "evidence", "complete"].includes(value) || "Оберіть підтримуваний тип матеріалу."),
      options: { list: [
        { title: "Фото для галереї", value: "gallery" },
        { title: "Підтверджені факти — неповний кейс", value: "evidence" },
        { title: "Повний кейс за SEO-ТЗ", value: "complete" }
      ] }
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "beforeImage", title: "Before Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "afterImage", title: "After Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "service", title: "Service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "date", title: "Дата виконання роботи", type: "date", description: "Не підставляйте дату завантаження фото або публікації. Якщо дата роботи невідома — залиште порожньою." }),
    defineField({
      name: "caseDetails",
      title: "Факти та докази кейсу",
      type: "object",
      hidden: ({ document }) => !document?.recordType || document.recordType === "gallery",
      fields: [
        defineField({ name: "serviceType", title: "Тип виконаної послуги", type: "string" }),
        defineField({ name: "location", title: "Район або місто", type: "string" }),
        defineField({ name: "areaOrScope", title: "Площа або обсяг", type: "string" }),
        defineField({ name: "problem", title: "Початкова проблема", type: "text", rows: 3 }),
        defineField({ name: "completedWorks", title: "Виконані роботи", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "team", title: "Команда", type: "string", description: "Лише підтверджений склад або кількість працівників на цьому об’єкті." }),
        defineField({ name: "duration", title: "Тривалість", type: "string" }),
        defineField({ name: "result", title: "Підтверджений результат", type: "text", rows: 3 }),
        defineField({ name: "priceText", title: "Ціна або діапазон (необов’язково)", type: "string" }),
        defineField({ name: "pricePublicationApproved", title: "Дозволено публікувати ціну", type: "boolean", initialValue: false }),
        defineField({ name: "sourceReference", title: "Внутрішній доказ", type: "text", rows: 3, description: "Посилання на матеріали власника, замовлення або інший перевірений запис. Не для публікації на сайті." }),
        defineField({ name: "beforeAfterVerified", title: "Фото до/після належать одному підтвердженому об’єкту", type: "boolean", initialValue: false }),
        defineField({ name: "verified", title: "Факти перевірені", type: "boolean", initialValue: false }),
        defineField({ name: "publicationApproved", title: "Є дозвіл на публікацію матеріалів", type: "boolean", initialValue: false })
      ]
    })
  ]
});
