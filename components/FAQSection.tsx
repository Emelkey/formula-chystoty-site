import type { Faq } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionDetails } from "@/components/MotionDetails";

export function FAQSection({ faq }: { faq: Faq[] }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading eyebrow="FAQ" title="Часті питання" />
        <div className="grid gap-3">
          {faq.map((item) => (
            <MotionDetails question={item.question} key={item.question}>
              <p className="mt-3 leading-7 text-brand-graphite">{item.answer}</p>
            </MotionDetails>
          ))}
        </div>
      </div>
    </section>
  );
}
