import { ClipboardCheck, MessageCircle, Phone, Send } from "lucide-react";
import { ContactAction } from "@/components/ContactAction";
import { TrackedLink } from "@/components/TrackedLink";
import { contacts } from "@/lib/site";

export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-32px)] flex-col items-end gap-2">
      <TrackedLink href="/kontakty#contact-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" eventName="contact_form_open" eventCategory="lead" eventLabel="contact_form">
        <ClipboardCheck size={18} aria-hidden />
        Залишити заявку
      </TrackedLink>
      <div className="grid gap-2">
        <ContactAction type="phone" revealPhoneNumber phoneNumberPosition="left" className="inline-flex h-12 min-w-12 items-center justify-center gap-3 rounded-full bg-brand-green px-3 text-white shadow-soft transition-[width,background-color] hover:bg-brand-hover focus-visible:focus-ring">
          <Phone size={20} aria-hidden />
        </ContactAction>
        <ContactAction type="viber" revealPhoneNumber phoneNumberPosition="left" className="inline-flex h-12 min-w-12 items-center justify-center gap-3 rounded-full bg-white px-3 text-brand-hover shadow-soft transition-[width,background-color] hover:bg-brand-mist focus-visible:focus-ring">
          <MessageCircle size={20} aria-hidden />
        </ContactAction>
        <TrackedLink href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-hover shadow-soft" aria-label="Написати у Telegram" eventName="telegram_click" eventCategory="contact" eventLabel="telegram">
          <Send size={20} aria-hidden />
        </TrackedLink>
      </div>
    </div>
  );
}
