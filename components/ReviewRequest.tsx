import { Star } from "lucide-react";
import { contacts } from "@/lib/site";

export function ReviewRequest() {
  return (
    <section className="section bg-brand-mist">
      <div className="container">
        <div className="rounded-[24px] border border-brand-green/15 bg-white p-6 shadow-soft md:p-8">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-mist text-brand-green shadow-soft">
              <Star size={26} aria-hidden />
            </span>
            <div>
              <h2 className="text-3xl font-bold text-brand-black">Залиште відгук</h2>
              <p className="mt-3 max-w-3xl leading-7 text-brand-graphite">Якщо ви вже замовляли прибирання у Формули Чистоти, залиште, будь ласка, відгук на Google. Це допомагає іншим клієнтам обрати надійну клінінгову компанію в Черкасах.</p>
            </div>
            <a className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">
              Залишити відгук
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
