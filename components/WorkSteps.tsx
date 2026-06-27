import { serviceSteps } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

export function WorkSteps() {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading eyebrow="Процес" title="Як ми працюємо" />
        <div className="relative grid gap-4 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-brand-green/25 md:block" aria-hidden />
          {serviceSteps.map((step, index) => (
            <div className="relative rounded-2xl border border-black/5 bg-white p-5 shadow-soft" key={step}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-green font-bold text-white">{index + 1}</span>
              <p className="mt-4 font-semibold leading-6">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
