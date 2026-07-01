import { MapPin, Star } from "lucide-react";
import { contacts } from "@/lib/site";

export function GoogleMapsTrust({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "bg-brand-black text-white" : "section bg-brand-mist"}>
      <div className={compact ? "container border-t border-white/10 py-8" : "container"}>
        <div className={compact ? "grid gap-5 md:grid-cols-[1fr_auto] md:items-center" : "rounded-[24px] border border-brand-green/15 bg-white p-6 shadow-soft md:p-8"}>
          <div className={compact ? "grid gap-4 md:grid-cols-[auto_1fr] md:items-start" : "grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center"}>
            <span className={compact ? "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white" : "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-mist text-brand-green shadow-soft"}>
              <MapPin size={26} aria-hidden />
            </span>
            <div>
              <h2 className={compact ? "text-2xl font-bold" : "text-3xl font-bold text-brand-black"}>Формула Чистоти на Google Maps</h2>
              <p className={compact ? "mt-3 max-w-3xl text-sm leading-6 text-white/75" : "mt-3 max-w-3xl leading-7 text-brand-graphite"}>Ми працюємо у Черкасах і приймаємо заявки через сайт, телефон та месенджери. Перегляньте нашу компанію на Google Maps, побудуйте маршрут або залиште відгук після виконаного прибирання.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-green px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">
                Відкрити на Google Maps
              </a>
              <a className={compact ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white" : "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-green/25 bg-white px-4 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:border-brand-green focus-visible:focus-ring"} href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">
                <Star size={16} aria-hidden />
                Залишити відгук
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
