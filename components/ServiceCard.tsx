import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Car, Droplets, Flame, Home, House, Leaf, PanelsTopLeft, Sofa, Sparkles, Store, Wind } from "lucide-react";

type CardService = {
  slug: string;
  title: string;
  shortDescription: string;
  priceFrom: string;
  image: string;
  imageAlt: string;
};

export function ServiceCard({ service }: { service: CardService }) {
  const Icon = serviceIcon(service.slug);

  return (
    <article data-service-card={service.slug} className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[24px] border border-[#E8EEE5] bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.12)] sm:p-6">
      <div className="flex flex-1 flex-col">
        <span className="mb-5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-mist text-brand-green">
          <Icon size={23} strokeWidth={1.8} aria-hidden />
        </span>
        <h3 className="line-clamp-2 min-h-[3.25rem] text-xl font-bold leading-tight text-brand-black">{service.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-graphite">{service.shortDescription}</p>
        <p className="mt-4 inline-flex w-fit rounded-full bg-brand-mist px-3 py-2 text-sm font-bold text-brand-hover">{service.priceFrom}</p>
      </div>
      <Link className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-hover" href={`/${service.slug}`}>
        Детальніше <ArrowRight size={16} aria-hidden />
      </Link>
      <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-[18px] border border-brand-green/10 bg-brand-mist shadow-soft">
        <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 23vw" className="object-cover transition duration-300 group-hover:scale-105" />
      </div>
    </article>
  );
}

function serviceIcon(slug: string) {
  if (slug.includes("kvartyr")) return Home;
  if (slug.includes("generalne")) return Sparkles;
  if (slug.includes("remontu")) return PanelsTopLeft;
  if (slug.includes("potopu")) return Droplets;
  if (slug.includes("pozhezhi")) return Flame;
  if (slug.includes("terytoriyi")) return Leaf;
  if (slug.includes("budynkiv")) return House;
  if (slug.includes("ofisiv")) return Building2;
  if (slug.includes("avto")) return Car;
  if (slug.includes("himchystka")) return Sofa;
  if (slug.includes("vikon")) return Wind;
  if (slug.includes("magazyniv") || slug.includes("supermarketiv") || slug.includes("komertsiynykh")) return Store;
  return Sparkles;
}
