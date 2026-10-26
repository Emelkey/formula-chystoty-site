import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  initialValue: {
    companyName: "Формула Чистоти",
    phone: "+38 (097) 809 58 00",
    telegram: "https://t.me/formula_chystoty/",
    instagram: "https://www.instagram.com/formula__chistoty_cleaning/",
    facebook: "https://www.facebook.com/formulaChisttoty",
    email: "formula-chistoty@ukr.net",
    address: "Черкаси, Україна",
    city: "Черкаси",
    country: "Україна",
    workingHours: "Пн-Сб: 08:00-20:00",
    googleMapUrl: "https://maps.google.com/?q=Черкаси",
    positioning: "Формула Чистоти — професійна клінінгова компанія у Черкасах. Прибираємо квартири, будинки, офіси, магазини, супермаркети, ТРЦ, виробничі та комерційні приміщення. Виконуємо генеральне, підтримуюче й післяремонтне прибирання, миття вікон, хімчистку меблів і килимів, а також регулярне обслуговування об’єктів.",
    defaultSeoTitle: "Формула Чистоти — клінінгова компанія у Черкасах",
    defaultSeoDescription: "Професійний клінінг у Черкасах: квартири, будинки, офіси, магазини, ТРЦ, супермаркети, виробничі та комерційні приміщення."
  },
  fields: [
    defineField({ name: "companyName", title: "Company Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "viber", title: "Viber", type: "url" }),
    defineField({ name: "telegram", title: "Telegram", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "workingHours", title: "Working Hours", type: "string" }),
    defineField({ name: "googleMapUrl", title: "Google Map URL", type: "url" }),
    defineField({ name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "url" }] }),
    defineField({ name: "positioning", title: "Positioning", type: "text", rows: 5 }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO Title", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO Description", type: "text", rows: 3 })
  ]
});
