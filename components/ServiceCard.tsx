import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Car, Home, House, PanelsTopLeft, Sofa, Sparkles, Store, Wind } from "lucide-react";

type CardService = {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
};

export function ServiceCard({ service }: { service: CardService }) {
  const Icon = serviceIcon(service.slug);

  return (
    <article className="group relative flex min-h-[252px] overflow-hidden rounded-[24px] border border-[#E8EEE5] bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.12)]">
      <div className="relative z-10 flex max-w-[78%] flex-col">
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-mist text-brand-green">
          <Icon size={23} strokeWidth={1.8} aria-hidden />
        </span>
        <h2 className="text-xl font-bold leading-tight text-brand-black">{service.title}</h2>
        <p className="mt-3 text-sm leading-6 text-brand-graphite">{service.shortDescription}</p>
        <Link className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand-hover" href={`/${service.slug}`}>
          Детальніше <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
      <div className="absolute bottom-4 right-4 h-24 w-32 overflow-hidden rounded-[18px] border border-white/80 bg-brand-mist shadow-soft md:h-28 md:w-36">
        <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 768px) 128px, 144px" className="object-cover transition duration-300 group-hover:scale-105" />
      </div>
    </article>
  );
}

function serviceIcon(slug: string) {
  if (slug.includes("kvartyr")) return Home;
  if (slug.includes("generalne")) return Sparkles;
  if (slug.includes("remontu")) return PanelsTopLeft;
  if (slug.includes("budynkiv")) return House;
  if (slug.includes("ofisiv")) return Building2;
  if (slug.includes("avto")) return Car;
  if (slug.includes("himchystka")) return Sofa;
  if (slug.includes("vikon")) return Wind;
  if (slug.includes("magazyniv") || slug.includes("supermarketiv") || slug.includes("komertsiynykh")) return Store;
  return Sparkles;
}
