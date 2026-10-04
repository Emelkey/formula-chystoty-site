import { ClipboardCheck, MessageCircle, Phone, Send, X } from "lucide-react";
import { ContactAction } from "@/components/ContactAction";
import { TrackedLink } from "@/components/TrackedLink";
import { contacts } from "@/lib/site";

export function FloatingContactButtons() {
  return (
    <>
      <details className="group fixed bottom-4 right-4 z-50 sm:hidden">
        <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full bg-brand-green text-white shadow-soft focus-visible:focus-ring [&::-webkit-details-marker]:hidden">
          <MessageCircle className="group-open:hidden" size={22} aria-hidden />
          <X className="hidden group-open:block" size={22} aria-hidden />
          <span className="sr-only">Способи зв’язку</span>
        </summary>
        <div className="absolute bottom-14 right-0 flex w-[calc(100vw-32px)] max-w-[288px] flex-col items-end gap-2 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-soft backdrop-blur">
          <ContactActions mobile />
        </div>
      </details>
      <div className="fixed bottom-4 right-4 z-50 hidden max-w-[calc(100vw-32px)] flex-col items-end gap-2 sm:flex">
        <ContactActions />
      </div>
    </>
  );
}

function ContactActions({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <TrackedLink href="/kontakty#contact-form" aria-label="Залишити заявку" className={mobile ? "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" : "inline-flex h-auto w-auto items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring"} eventName="contact_form_open" eventCategory="lead" eventLabel="contact_form">
        <ClipboardCheck size={18} aria-hidden />
        <span>Залишити заявку</span>
      </TrackedLink>
      <div className={mobile ? "grid w-full gap-2" : "grid gap-2"}>
        <ContactAction type="phone" revealPhoneNumber={!mobile} phoneNumberPosition="left" className={mobile ? "inline-flex min-h-12 w-full items-center gap-3 rounded-xl bg-brand-mist px-4 text-sm font-semibold text-brand-black focus-visible:focus-ring" : "inline-flex h-12 min-w-12 items-center justify-center gap-3 rounded-full bg-brand-green px-3 text-white shadow-soft transition-[width,background-color] hover:bg-brand-hover focus-visible:focus-ring"}>
          <Phone size={20} aria-hidden />
          {mobile ? <span>Подзвонити</span> : null}
        </ContactAction>
        <ContactAction type="viber" revealPhoneNumber={!mobile} phoneNumberPosition="left" className={mobile ? "inline-flex min-h-12 w-full items-center gap-3 rounded-xl bg-brand-mist px-4 text-sm font-semibold text-brand-black focus-visible:focus-ring" : "inline-flex h-12 min-w-12 items-center justify-center gap-3 rounded-full bg-white px-3 text-brand-hover shadow-soft transition-[width,background-color] hover:bg-brand-mist focus-visible:focus-ring"}>
          <MessageCircle size={20} aria-hidden />
          {mobile ? <span>Написати у Viber</span> : null}
        </ContactAction>
        <TrackedLink href={contacts.telegram} target="_blank" rel="noopener noreferrer" className={mobile ? "inline-flex min-h-12 w-full items-center gap-3 rounded-xl bg-brand-mist px-4 text-sm font-semibold text-brand-black focus-visible:focus-ring" : "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-hover shadow-soft"} aria-label="Написати у Telegram" eventName="telegram_click" eventCategory="contact" eventLabel="telegram">
          <Send size={20} aria-hidden />
          {mobile ? <span>Написати у Telegram</span> : null}
        </TrackedLink>
      </div>
    </>
  );
}
