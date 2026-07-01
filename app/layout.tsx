import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ContactActionToast } from "@/components/ContactAction";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Header } from "@/components/Header";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { absoluteUrl, contacts, positioning } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://formula-chistoty.ck.ua"),
  title: {
    default: "Формула Чистоти — клінінгова компанія у Черкасах",
    template: "%s"
  },
  description: positioning,
  icons: [{ rel: "icon", url: "/brand/favicon.png" }]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FNN4YK664L" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FNN4YK664L');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContactButtons />
        <ContactActionToast />
        <SeoJsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: contacts.companyName,
              description: positioning,
              url: absoluteUrl("/"),
              logo: absoluteUrl("/brand/logo.png"),
              email: contacts.email,
              sameAs: [contacts.telegram, contacts.instagram, contacts.facebook],
              contactPoint: { "@type": "ContactPoint", telephone: contacts.phone, email: contacts.email, contactType: "customer service", areaServed: "UA", availableLanguage: "uk" }
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: contacts.companyName,
              description: positioning,
              image: absoluteUrl("/images/hero/professional-floor-cleaning-hero.webp"),
              url: absoluteUrl("/"),
              logo: absoluteUrl("/brand/logo.png"),
              telephone: contacts.phone,
              email: contacts.email,
              sameAs: [contacts.telegram, contacts.instagram, contacts.facebook],
              hasMap: contacts.googleMapUrl,
              address: { "@type": "PostalAddress", addressLocality: contacts.city, addressCountry: contacts.country },
              areaServed: contacts.city,
              openingHours: "Mo-Sa 08:00-20:00"
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: contacts.companyName,
              url: absoluteUrl("/"),
              potentialAction: { "@type": "SearchAction", target: absoluteUrl("/blog?search={search_term_string}"), "query-input": "required name=search_term_string" }
            }
          ]}
        />
      </body>
    </html>
  );
}
