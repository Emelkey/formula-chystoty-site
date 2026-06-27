import { Quote, Star } from "lucide-react";
import { reviews } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

export function ReviewsSection() {
  return (
    <section className="section bg-brand-mist">
      <div className="container">
        <SectionHeading eyebrow="Відгуки" title="Що кажуть клієнти" />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article className="rounded-2xl bg-white p-6 shadow-soft" key={review.name}>
              <Quote className="mb-5 text-brand-green" size={28} aria-hidden />
              <div className="flex gap-1 text-brand-green" aria-label={`${review.rating} з 5`}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star fill="currentColor" size={16} key={index} aria-hidden />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-brand-graphite">{review.text}</p>
              <strong className="mt-4 block">{review.name}</strong>
              <span className="text-sm text-brand-graphite">{review.service}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
