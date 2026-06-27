import { ContactButtons, PrimaryButton } from "@/components/Buttons";

export function CTASection({ title = "Потрібне прибирання у Черкасах?", description = "Напишіть нам, і ми швидко уточнимо деталі, порахуємо вартість та запропонуємо зручний час." }: { title?: string; description?: string }) {
  return (
    <section className="section bg-brand-green text-white">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/85">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton />
          <ContactButtons />
        </div>
      </div>
    </section>
  );
}
