import { canPublishCase, type CaseStudyRecord } from "@/lib/case-studies";

/** Confirmed facts only. Unknown date, team and duration never receive defaults. */
export function CaseCard({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  if (!canPublishCase(caseStudy)) return null;
  const { facts } = caseStudy;
  const details = [
    { label: "Послуга", value: facts.serviceType },
    { label: "Місце", value: facts.location },
    { label: "Обсяг", value: facts.areaOrScope },
    { label: "Команда", value: facts.team },
    { label: "Тривалість", value: facts.duration }
  ].filter((detail) => detail.value);

  return (
    <div className="min-w-0 rounded-2xl bg-white p-5 shadow-soft md:p-6">
      <dl className="grid gap-4 text-sm leading-6 sm:grid-cols-2">
        {details.map((detail) => (
          <div className="min-w-0" key={detail.label}>
            <dt className="font-semibold text-brand-graphite">{detail.label}</dt>
            <dd className="mt-1">{detail.value}</dd>
          </div>
        ))}
        {facts.completedOn ? (
          <div>
            <dt className="font-semibold text-brand-graphite">Дата виконання</dt>
            <dd className="mt-1"><time dateTime={facts.completedOn}>{facts.completedOn.split("-").reverse().join(".")}</time></dd>
          </div>
        ) : null}
      </dl>
      {facts.problem ? <p className="mt-5 leading-7 text-brand-graphite"><strong>Задача: </strong>{facts.problem}</p> : null}
      {facts.completedWorks?.length ? (
        <div className="mt-5">
          <h3 className="font-bold">Що виконали</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-brand-graphite">
            {facts.completedWorks.map((work) => <li key={work}>{work}</li>)}
          </ul>
        </div>
      ) : null}
      {facts.price?.publicationApproved ? (
        <p className="mt-5 text-sm leading-6 text-brand-graphite"><strong>Орієнтир за цей об’єкт: </strong>{facts.price.text}</p>
      ) : null}
    </div>
  );
}
