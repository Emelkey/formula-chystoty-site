import { Banknote, CheckCircle2, Clock3, MapPin, Repeat, SprayCan } from "lucide-react";

const advantages = [
  {
    title: "Працюємо у Черкасах та області",
    description: "Швидко виїжджаємо на об’єкти в Черкасах і за домовленістю по області.",
    icon: MapPin
  },
  {
    title: "Професійна хімія та обладнання",
    description: "Використовуємо засоби, інвентар і техніку для різних типів поверхонь.",
    icon: SprayCan
  },
  {
    title: "Приїжджаємо зі своїм інвентарем",
    description: "Клієнту не потрібно купувати засоби або готувати обладнання.",
    icon: CheckCircle2
  },
  {
    title: "Працюємо швидко та якісно",
    description: "Плануємо роботу так, щоб дати чистий результат без зайвої затримки.",
    icon: Clock3
  },
  {
    title: "Оплата готівкою або на рахунок",
    description: "Зручно для приватних клієнтів і бізнесу.",
    icon: Banknote
  },
  {
    title: "Можлива регулярна співпраця",
    description: "Працюємо з квартирами, офісами, магазинами та комерційними об’єктами на постійній основі.",
    icon: Repeat
  }
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container rounded-[28px] border border-[#E8EEE5] bg-brand-mist p-6 md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Переваги</p>
            <h2 className="max-w-md text-3xl font-bold leading-tight text-brand-black md:text-5xl">
              Чому обирають <span className="text-brand-green">Формулу Чистоти?</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;

              return (
                <article className="rounded-[20px] border border-[#E8EEE5] bg-white p-5 shadow-soft" key={advantage.title}>
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-mist text-brand-green">
                    <Icon size={21} strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="text-base font-bold leading-6 text-brand-black">{advantage.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite">{advantage.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
