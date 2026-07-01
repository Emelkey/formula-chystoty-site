import Link from "next/link";
import { GoogleMapsTrust } from "@/components/GoogleMapsTrust";
import { Logo } from "@/components/Logo";
import { TrackedLink } from "@/components/TrackedLink";
import { contacts, positioning, servicePages } from "@/lib/site";

const footerServiceSlugs = [
  "prybyrannya-kvartyr-cherkasy",
  "generalne-prybyrannya-cherkasy",
  "prybyrannya-pislya-remontu-cherkasy",
  "himchystka-mebliv-cherkasy",
  "myttya-vikon-cherkasy",
  "prybyrannya-ofisiv-cherkasy",
  "prybyrannya-budynkiv-cherkasy",
  "prybyrannya-pislya-potopu-cherkasy",
  "prybyrannya-pislya-pozhezhi-cherkasy"
];

export function Footer() {
  const footerServices = footerServiceSlugs
    .map((slug) => servicePages.find((service) => service.slug === slug))
    .filter((service): service is (typeof servicePages)[number] => Boolean(service));

  return (
    <footer className="bg-brand-black py-12 text-white">
      <GoogleMapsTrust compact />
      <div className="container grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo variant="light" className="w-[92px]" />
          <p className="mt-5 max-w-md text-sm leading-6 text-white/75">{positioning}</p>
        </div>
        <div>
          <h2 className="text-base font-semibold">Послуги</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {footerServices.map((service) => (
              <Link className="hover:text-white" href={`/${service.slug}`} key={service.slug}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold">Контакти</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            <TrackedLink href={contacts.phoneHref} eventName="phone_click" eventCategory="contact" eventLabel="phone">{contacts.phone}</TrackedLink>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            <span>{contacts.address}</span>
            <span>{contacts.workingHours}</span>
            <a href={contacts.googleMapUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
            <TrackedLink href={contacts.telegram} target="_blank" rel="noopener noreferrer" eventName="telegram_click" eventCategory="contact" eventLabel="telegram">Telegram</TrackedLink>
            <TrackedLink href={contacts.instagram} target="_blank" rel="noopener noreferrer" eventName="instagram_click" eventCategory="social" eventLabel="instagram">Instagram</TrackedLink>
            <a href={contacts.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      <div className="container mt-10 border-t border-white/10 pt-5 text-xs text-white/55">© {new Date().getFullYear()} Формула Чистоти. Усі права захищені.</div>
    </footer>
  );
}
