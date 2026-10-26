import type { Faq } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

export function FAQSection({ faq }: { faq: Faq[] }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading eyebrow="FAQ" title="Часті питання" />
        <div className="grid gap-3">
          {faq.map((item) => (
            <details className="rounded-lg border border-black/5 bg-brand-mist p-5" key={item.question}>
              <summary className="cursor-pointer text-lg font-semibold">{item.question}</summary>
              <p className="mt-3 leading-7 text-brand-graphite">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
