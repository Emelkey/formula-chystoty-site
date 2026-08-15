import type { NextConfig } from "next";
import { ukLegacyPatternRedirects, ukLegacyRedirects } from "./lib/legacy-uk-routes";

const canonicalUrl = "https://www.formula-chistoty.ck.ua";

const legacyRedirects = [
  ...ukLegacyRedirects,
  ...ukLegacyPatternRedirects,
  { source: "/ru", destination: "/", statusCode: 301 },
  { source: "/services", destination: "/poslugy", statusCode: 301 },
  { source: "/contact", destination: "/kontakty", statusCode: 301 },
  { source: "/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/about", destination: "/pro-nas", statusCode: 301 },
  { source: "/works", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/reviews", destination: "/vidguky", statusCode: 301 },
  { source: "/vidhuky", destination: "/vidguky", statusCode: 301 },
  { source: "/tsiny", destination: "/prices", statusCode: 301 },
  { source: "/myttya-plitky-cherkasy", destination: "/myttya-plytky-cherkasy", statusCode: 301 },
  { source: "/ru/price-ru", destination: "/prices", statusCode: 301 },
  { source: "/ru/services-ru", destination: "/poslugy", statusCode: 301 },
  { source: "/ru/services", destination: "/poslugy", statusCode: 301 },
  { source: "/ru/blog-ru", destination: "/blog", statusCode: 301 },
  { source: "/prybyrannya-kvartyr", destination: `${canonicalUrl}/prybyrannya-kvartyr-cherkasy`, statusCode: 301 },
  { source: "/ru/services/uborka-kvartir", destination: `${canonicalUrl}/prybyrannya-kvartyr-cherkasy`, statusCode: 301 },
  { source: "/generalne-prybyrannya", destination: `${canonicalUrl}/generalne-prybyrannya-cherkasy`, statusCode: 301 },
  { source: "/ru/services/generalnaya-uborka", destination: `${canonicalUrl}/generalne-prybyrannya-cherkasy`, statusCode: 301 },
  { source: "/ru/services/generalnaya-uborka-kvartiry", destination: `${canonicalUrl}/generalne-prybyrannya-kvartyry-cherkasy`, statusCode: 301 },
  { source: "/pidtrymuyuche-prybyrannya", destination: `${canonicalUrl}/pidtrymuyuche-prybyrannya-kvartyr-cherkasy`, statusCode: 301 },
  { source: "/ru/services/podderzhivayushchaya-uborka", destination: `${canonicalUrl}/pidtrymuyuche-prybyrannya-kvartyr-cherkasy`, statusCode: 301 },
  { source: "/ru/services/podderzhivayushchaya-uborka-kvartiry", destination: `${canonicalUrl}/pidtrymuyuche-prybyrannya-kvartyr-cherkasy`, statusCode: 301 },
  { source: "/prybyrannya-pislya-remontu", destination: `${canonicalUrl}/prybyrannya-pislya-remontu-cherkasy`, statusCode: 301 },
  { source: "/ru/services/uborka-posle-remonta", destination: `${canonicalUrl}/prybyrannya-pislya-remontu-cherkasy`, statusCode: 301 },
  { source: "/ru/services/uborka-kvartir-posle-remonta", destination: `${canonicalUrl}/prybyrannya-pislya-remontu-cherkasy`, statusCode: 301 },
  { source: "/ru/services/klining-posle-remonta", destination: `${canonicalUrl}/prybyrannya-pislya-remontu-cherkasy`, statusCode: 301 },
  { source: "/myttya-fasadiv", destination: `${canonicalUrl}/myttya-fasadiv-cherkasy`, statusCode: 301 },
  { source: "/ru/services/mojka-okon-vitrin-i-fasadov", destination: `${canonicalUrl}/myttya-fasadiv-cherkasy`, statusCode: 301 },
  { source: "/prybyrannya-pislya-trupu-cherkasy", destination: `${canonicalUrl}/dezinfektsiya-prymishchen-cherkasy`, statusCode: 301 },
  { source: "/ru/services/uborka-posle-trupa", destination: `${canonicalUrl}/dezinfektsiya-prymishchen-cherkasy`, statusCode: 301 },
  { source: "/ru/services/dezinfekciya-posle-trupa", destination: `${canonicalUrl}/dezinfektsiya-prymishchen-cherkasy`, statusCode: 301 },
  { source: "/byudzhetne-prybyrannya-cherkasy", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-magazyniv-cherkasy", destination: "/prybyrannya-mahazyniv-supermarketiv-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-supermarketiv-cherkasy", destination: "/prybyrannya-mahazyniv-supermarketiv-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-trts-supermarketiv-cherkasy", destination: "/prybyrannya-mahazyniv-supermarketiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/obsluzhivanie-i-klining-promyshlennyh-i-proizvodstvennyh-pomeshchenij", destination: "/prybyrannya-vyrobnychykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-skladov", destination: "/prybyrannya-skladiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-meditsinskih-centrov", destination: "/prybyrannya-medychnykh-tsentriv-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchistka-stulev", destination: "/himchystka-stiltsiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchistka-kresel", destination: "/himchystka-krisel-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchistka-kovrolina", destination: "/himchystka-kovrolinu-cherkasy", statusCode: 301 },
  { source: "/ru/video-gallery-ru", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/prybyrannya-kotedzhiv-cherkasy", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-kottedzhej", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-kottedzhey", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/contact-ru", destination: "/kontakty", statusCode: 301 },
  { source: "/ru/contact", destination: "/kontakty", statusCode: 301 },
  { source: "/ru/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/ru/about", destination: "/pro-nas", statusCode: 301 },
  { source: "/ru/about-us-ru", destination: "/pro-nas", statusCode: 301 },
  { source: "/ru/prices", destination: "/prices", statusCode: 301 },
  { source: "/ru/gallery-ru", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/ru/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/ru/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/ru/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-pislya-potopu", destination: "/prybyrannya-pislya-potopu-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-prylegloyi-terytoriyi", destination: "/prybyrannya-prylegloyi-terytoriyi-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-budynkiv", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchistka-divana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 }
];

const canonicalRedirects = legacyRedirects.map((redirect) => ({
  ...redirect,
  destination: redirect.destination.startsWith("/") ? `${canonicalUrl}${redirect.destination}` : redirect.destination
}));

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  async redirects() {
    return canonicalRedirects;
  }
};

export default nextConfig;
