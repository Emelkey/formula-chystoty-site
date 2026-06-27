export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-9 max-w-3xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold leading-tight text-brand-black md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-brand-graphite">{description}</p> : null}
    </div>
  );
}
