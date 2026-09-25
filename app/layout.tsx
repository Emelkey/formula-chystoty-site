import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ContactActionToast } from "@/components/ContactAction";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Header } from "@/components/Header";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { absoluteUrl, contacts, positioning, servicePages } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.formula-chistoty.ck.ua"),
  title: {
    default: "Формула Чистоти — клінінгова компанія у Черкасах",
    template: "%s"
  },
  description: positioning,
  robots: {
    index: true,
    follow: true
  },
  icons: [{ rel: "icon", url: "/brand/favicon.png" }]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>
        <Script id="google-analytics-destination-guard" strategy="beforeInteractive">
          {`window['ga-disable-G-FNN4YK664L'] = true;`}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-E2Q1N11QWJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E2Q1N11QWJ');
          `}
        </Script>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingContactButtons />
        <ContactActionToast />
        <SeoJsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": absoluteUrl("/#organization"),
              name: contacts.companyName,
              description: positioning,
              url: absoluteUrl("/"),
              logo: absoluteUrl("/brand/logo.png"),
              email: contacts.email,
              sameAs: [contacts.telegram, contacts.instagram, contacts.facebook, contacts.googleMapUrl],
              contactPoint: { "@type": "ContactPoint", telephone: contacts.phoneE164, email: contacts.email, contactType: "customer service", areaServed: "UA", availableLanguage: "uk" }
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": absoluteUrl("/#localbusiness"),
              parentOrganization: { "@id": absoluteUrl("/#organization") },
              name: contacts.companyName,
              description: "Формула Чистоти — клінінгова компанія у Черкасах. Виконуємо прибирання квартир, будинків, комерційних приміщень, прибирання після ремонту, хімчистку меблів, миття вікон, прибирання після потопу та пожежі.",
              image: absoluteUrl("/images/hero/professional-floor-cleaning-hero.webp"),
              url: absoluteUrl("/"),
              logo: absoluteUrl("/brand/logo.png"),
              telephone: contacts.phoneE164,
              email: contacts.email,
              sameAs: [contacts.instagram, contacts.googleMapUrl],
              hasMap: contacts.googleMapUrl,
              priceRange: "₴₴",
              address: {
                "@type": "PostalAddress",
                streetAddress: contacts.streetAddress,
                addressLocality: contacts.city,
                addressRegion: contacts.addressRegion,
                postalCode: contacts.postalCode,
                addressCountry: contacts.countryCode
              },
              areaServed: { "@type": "City", name: `${contacts.city}, ${contacts.country}` },
              openingHours: contacts.openingHoursSchema,
              makesOffer: servicePages.slice(0, 16).map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  serviceType: service.title,
                  areaServed: `${contacts.city}, ${contacts.country}`,
                  url: absoluteUrl(`/${service.slug}`)
                }
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": absoluteUrl("/#website"),
              name: contacts.companyName,
              url: absoluteUrl("/"),
              publisher: { "@id": absoluteUrl("/#organization") }
            }
          ]}
        />
      </body>
    </html>
  );
}
