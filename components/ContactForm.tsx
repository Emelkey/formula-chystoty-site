"use client";

import { useState } from "react";
import { contacts } from "@/lib/site";

const cleaningTypes = ["Генеральне прибирання", "Підтримуюче прибирання", "Після ремонту", "Прибирання квартири", "Прибирання будинку", "Прибирання офісу", "Прибирання магазину або супермаркету", "Клінінг комерційного приміщення", "Хімчистка меблів або килимів", "Миття вікон"];

export function ContactForm({ compact = false, submitLabel = "Надіслати заявку" }: { compact?: boolean; submitLabel?: string }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      id="contact-form"
      className="grid w-full min-w-0 gap-4 rounded-lg bg-white p-5 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Ім’я
          <input required name="name" autoComplete="name" className="min-h-12 rounded-md border border-black/10 px-3 font-normal focus-visible:focus-ring" placeholder="Ваше ім’я" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Телефон
          <input required name="phone" autoComplete="tel" className="min-h-12 rounded-md border border-black/10 px-3 font-normal focus-visible:focus-ring" placeholder="+380..." inputMode="tel" pattern="^(\\+?38)?0[0-9]{9}$|^\\+380[0-9]{9}$" title="Введіть номер у форматі +380XXXXXXXXX або 0XXXXXXXXX" />
        </label>
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <label className="grid gap-2 text-sm font-semibold">
          Тип прибирання
          <select name="type" className="min-h-12 rounded-md border border-black/10 px-3 font-normal focus-visible:focus-ring">
            {cleaningTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        {!compact ? <label className="grid gap-2 text-sm font-semibold">
          Площа
          <input name="area" className="min-h-12 rounded-md border border-black/10 px-3 font-normal focus-visible:focus-ring" placeholder="Наприклад, 65 м²" />
        </label> : null}
      </div>
      {!compact ? <label className="grid gap-2 text-sm font-semibold">
        Коментар
        <textarea name="comment" className="min-h-28 rounded-md border border-black/10 p-3 font-normal focus-visible:focus-ring" placeholder="Опишіть задачу, бажану дату або стан приміщення" />
      </label> : null}
      <button className="min-h-12 rounded-md bg-brand-green px-5 py-3 font-semibold text-white transition hover:bg-brand-hover focus-visible:focus-ring" type="submit">{submitLabel}</button>
      {sent ? <p className="rounded-md bg-brand-mist p-3 text-sm font-medium text-brand-hover" role="status">Дякуємо. Заявку прийнято, ми зв’яжемося з вами для уточнення деталей.</p> : null}
      <p className="text-sm leading-6 text-brand-graphite">
        Також можна звернутися напряму: <a className="font-semibold text-brand-hover" href={contacts.phoneHref}>{contacts.phone}</a> або <a className="font-semibold text-brand-hover" href={`mailto:${contacts.email}`}>{contacts.email}</a>.
      </p>
    </form>
  );
}
