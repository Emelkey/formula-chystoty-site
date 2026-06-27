import type { ReactNode } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import { ContactAction } from "@/components/ContactAction";
import { contacts } from "@/lib/site";

export function PrimaryButton({ href = "/kontakty#contact-form", children = "Розрахувати вартість" }: { href?: string; children?: ReactNode }) {
  return (
    <a className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href={href}>
      {children}
    </a>
  );
}

export function ContactButtons({ compact = false }: { compact?: boolean }) {
  const size = compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm";

  return (
    <div className="flex flex-wrap gap-2">
      <ContactAction type="phone" revealPhoneNumber className={`inline-flex items-center gap-2 rounded-md border border-black/10 bg-white font-semibold text-brand-black transition hover:border-brand-green hover:text-brand-hover focus-visible:focus-ring ${size}`}>
        <Phone size={16} aria-hidden />
        Подзвонити
      </ContactAction>
      <ContactAction type="viber" revealPhoneNumber className={`inline-flex items-center gap-2 rounded-md border border-black/10 bg-white font-semibold text-brand-black transition hover:border-brand-green hover:text-brand-hover focus-visible:focus-ring ${size}`}>
        <MessageCircle size={16} aria-hidden />
        Viber
      </ContactAction>
      <a className={`inline-flex items-center gap-2 rounded-md border border-black/10 bg-white font-semibold text-brand-black transition hover:border-brand-green hover:text-brand-hover focus-visible:focus-ring ${size}`} href={contacts.telegram} target="_blank" rel="noopener noreferrer">
        <Send size={16} aria-hidden />
        Telegram
      </a>
    </div>
  );
}
