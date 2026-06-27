import Link from "next/link";
import { Logo } from "@/components/Logo";
import { contacts, positioning, servicePages } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-black py-12 text-white">
      <div className="container grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo variant="light" className="w-[92px]" />
          <p className="mt-5 max-w-md text-sm leading-6 text-white/75">{positioning}</p>
        </div>
        <div>
          <h2 className="text-base font-semibold">Послуги</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {servicePages.slice(0, 6).map((service) => (
              <Link className="hover:text-white" href={`/${service.slug}`} key={service.slug}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold">Контакти</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            <a href={contacts.phoneHref}>{contacts.phone}</a>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            <span>{contacts.address}</span>
            <span>{contacts.workingHours}</span>
            <a href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
            <a href={contacts.telegram}>Telegram</a>
            <a href={contacts.instagram}>Instagram</a>
            <a href={contacts.facebook}>Facebook</a>
          </div>
        </div>
      </div>
      <div className="container mt-10 border-t border-white/10 pt-5 text-xs text-white/55">© {new Date().getFullYear()} Формула Чистоти. Усі права захищені.</div>
    </footer>
  );
}
