"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { ContactAction } from "@/components/ContactAction";
import { PrimaryButton } from "@/components/Buttons";
import { Logo } from "@/components/Logo";
import { contacts } from "@/lib/site";

const menu = [
  ["Головна", "/"],
  ["Послуги", "/poslugy"],
  ["Ціни", "/tsiny"],
  ["Наші роботи", "/nashi-roboty"],
  ["Відгуки", "/vidguky"],
  ["Блог", "/blog"],
  ["Про нас", "/pro-nas"],
  ["Контакти", "/kontakty"]
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container flex min-h-[76px] items-center justify-between gap-4">
        <Link href="/" className="shrink-0 focus-visible:focus-ring" aria-label="Формула Чистоти на головну">
          <Logo className="w-[72px] sm:w-[82px]" />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-brand-graphite lg:flex" aria-label="Головне меню">
          {menu.map(([label, href]) => (
            <Link className="transition hover:text-brand-hover focus-visible:focus-ring" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <ContactAction type="phone" revealPhoneNumber className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-black transition hover:border-brand-green hover:text-brand-hover focus-visible:focus-ring">
            <Phone size={16} aria-hidden />
            Подзвонити
          </ContactAction>
          <PrimaryButton>Розрахувати</PrimaryButton>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <ContactAction type="phone" revealPhoneNumber phoneNumberPosition="left" className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md bg-brand-green px-3 text-sm font-semibold text-white focus-visible:focus-ring">
            <Phone size={20} aria-hidden />
          </ContactAction>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 bg-white lg:hidden"
            aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>
      {isOpen ? (
        <div id="mobile-menu" className="container grid gap-2 pb-4 text-sm font-medium lg:hidden">
          {menu.map(([label, href]) => (
            <Link className="rounded-md bg-brand-mist px-3 py-3" href={href} key={href} onClick={() => setIsOpen(false)}>
              {label}
            </Link>
          ))}
          <ContactAction type="phone" revealPhoneNumber className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-4 py-3 font-semibold text-brand-black">
            <Phone size={16} aria-hidden />
            Подзвонити
          </ContactAction>
          <PrimaryButton>Розрахувати вартість</PrimaryButton>
        </div>
      ) : null}
    </header>
  );
}
