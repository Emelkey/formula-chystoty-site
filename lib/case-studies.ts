export type CasePublicationMode = "evidence" | "complete";

export type CaseFacts = {
  serviceType?: string;
  location?: string;
  areaOrScope?: string;
  problem?: string;
  completedWorks?: readonly string[];
  team?: string;
  duration?: string;
  completedOn?: string;
  result?: string;
  price?: { text: string; publicationApproved: boolean };
};

export type CaseEvidence = {
  verified: boolean;
  sourceReference: string;
  publicationApproved: boolean;
  beforeAfterVerified: boolean;
};

export type CaseStudyRecord = {
  id: string;
  title: string;
  serviceSlugs: readonly string[];
  publicationMode: CasePublicationMode;
  facts: CaseFacts;
  evidence: CaseEvidence;
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
};

/** Shared editorial checks. Missing fields stay absent; a gallery is not a full case. */
export function getCasePublicationIssues(
  facts: CaseFacts,
  evidence: CaseEvidence,
  hasBeforeAfterImages: boolean,
  mode: CasePublicationMode
): string[] {
  const issues: string[] = [];
  if (!evidence.verified) issues.push("Потрібна перевірка фактів кейсу.");
  if (!evidence.sourceReference.trim()) issues.push("Потрібне посилання на внутрішній доказ або матеріали власника.");
  if (!evidence.publicationApproved) issues.push("Потрібен дозвіл на публікацію матеріалів.");
  if (!hasBeforeAfterImages || !evidence.beforeAfterVerified) issues.push("Потрібна підтверджена пара фото до/після одного об’єкта.");
  if (facts.price && !facts.price.publicationApproved) issues.push("Приберіть ціну або підтвердьте дозвіл на її публікацію.");
  if (facts.completedOn && !isValidCaseDate(facts.completedOn)) issues.push("Дата має бути реальною календарною датою у форматі YYYY-MM-DD.");

  if (mode === "complete") {
    const required: [string, string | undefined][] = [
      ["тип послуги", facts.serviceType],
      ["район або місто", facts.location],
      ["площа або обсяг", facts.areaOrScope],
      ["проблема", facts.problem],
      ["команда", facts.team],
      ["тривалість", facts.duration],
      ["дата виконання", facts.completedOn]
    ];
    for (const [label, value] of required) {
      if (!value?.trim()) issues.push(`Не підтверджено поле: ${label}.`);
    }
    if (!facts.completedWorks?.some((work) => work.trim())) issues.push("Потрібен підтверджений перелік виконаних робіт.");
  }
  return issues;
}

function isValidCaseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function canPublishCase(record: CaseStudyRecord) {
  const hasImages = hasVerifiedImagePair(record);
  return getCasePublicationIssues(record.facts, record.evidence, hasImages, record.publicationMode).length === 0;
}

function hasVerifiedImagePair(record: CaseStudyRecord) {
  return Boolean(
    record.beforeImage.src && record.beforeImage.alt.trim() &&
    record.afterImage.src && record.afterImage.alt.trim() &&
    record.beforeImage.src !== record.afterImage.src
  );
}

// One object, not one case per photograph. Facts and publication basis were
// already recorded in lib/site.ts and docs/seo/case-inventory-2026-08-16.csv.
// The date, team and duration are unknown, so this remains an evidence excerpt.
export const caseStudies: readonly CaseStudyRecord[] = [
  {
    id: "post-renovation-100m2",
    title: "Післяремонтне прибирання об’єкта 100 м²",
    serviceSlugs: ["prybyrannya-pislya-remontu-cherkasy"],
    publicationMode: "evidence",
    facts: {
      serviceType: "Прибирання після ремонту та миття вікон",
      location: "Черкаси",
      areaOrScope: "Об’єкт 100 м²; вікна — орієнтовно 30 м²",
      problem: "Будівельний пил, наліт і складні забруднення на плитці та сантехніці після ремонту.",
      completedWorks: [
        "Очищення санвузла, умивальника, пісуара, плитки та сантехніки.",
        "Прибирання підлоги та післяремонтного пилу у важкодоступних зонах.",
        "Окреме миття вікон після ремонту."
      ],
      result: "На фото до/після видно результат очищення санвузла та плитки від післяремонтних забруднень.",
      price: {
        text: "Близько 18 000 грн: прибирання — 100 м² × 120 грн/м², вікна — орієнтовно 30 м² × 200 грн/м².",
        publicationApproved: true
      }
    },
    evidence: {
      verified: true,
      sourceReference: "lib/site.ts: workExamples and renovation service content; docs/seo/case-inventory-2026-08-16.csv: owner-provided materials already published",
      publicationApproved: true,
      beforeAfterVerified: true
    },
    beforeImage: {
      src: "/images/works/post-renovation-cleaning-before-after/bathroom-after-renovation-before-cherkasy.jpg",
      alt: "Санвузол із будівельними забрудненнями до прибирання"
    },
    afterImage: {
      src: "/images/works/post-renovation-cleaning-before-after/bathroom-after-renovation-after-cherkasy.jpg",
      alt: "Очищені сантехніка та плитка санвузла після прибирання"
    }
  }
];

export function getServiceCaseStudies(serviceSlug: string) {
  return caseStudies.filter((record) => record.serviceSlugs.includes(serviceSlug) && canPublishCase(record));
}

// Editorial inventory only: never render missing private/unknown inputs to customers.
export const caseEditorialInventory = caseStudies.map((record) => ({
  id: record.id,
  publicationMode: record.publicationMode,
  sourceReference: record.evidence.sourceReference,
  fullCaseBlockers: getCasePublicationIssues(record.facts, record.evidence, hasVerifiedImagePair(record), "complete")
}));
