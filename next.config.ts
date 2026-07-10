import type { NextConfig } from "next";

const carCleaningCanonicalPath = "/himchystka-avto-cherkasy";
const carCleaningLegacySlugs = [
  "himchystka-avto",
  "himchystka-avto-cherkasy",
  "himchistka-avto",
  "himchistka-avto-cherkasy",
  "khimchystka-avto",
  "khimchystka-avto-cherkasy",
  "khimchistka-avto",
  "khimchistka-avto-cherkasy",
  "himchystka-salonu-avto",
  "himchystka-salonu-avto-cherkasy",
  "himchistka-salona-avto",
  "himchistka-salona-avto-cherkasy",
  "himchystka-avtomobilya",
  "himchystka-avtomobilya-cherkasy",
  "himchistka-avtomobilya",
  "himchistka-avtomobilya-cherkasy"
];
const carCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const carCleaningLegacyRedirects = carCleaningLegacyPrefixes
  .flatMap((prefix) => carCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
  .filter((source, index, sources) => source !== carCleaningCanonicalPath && sources.indexOf(source) === index)
  .map((source) => ({ source, destination: carCleaningCanonicalPath, statusCode: 301 as const }));

const legacyRedirects = [
  ...carCleaningLegacyRedirects,
  { source: "/uk", destination: "/", statusCode: 301 },
  { source: "/ru", destination: "/", statusCode: 301 },
  { source: "/services", destination: "/poslugy", statusCode: 301 },
  { source: "/prices", destination: "/tsiny", statusCode: 301 },
  { source: "/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/about", destination: "/pro-nas", statusCode: 301 },
  { source: "/works", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/reviews", destination: "/vidguky", statusCode: 301 },
  { source: "/vidhuky", destination: "/vidguky", statusCode: 301 },
  { source: "/myttya-plitky-cherkasy", destination: "/myttya-plytky-cherkasy", statusCode: 301 },
  { source: "/uk/tsiny-na-klining-cherkasy-2026", destination: "/tsiny", statusCode: 301 },
  { source: "/uk/price-uk", destination: "/tsiny", statusCode: 301 },
  { source: "/ru/price-ru", destination: "/tsiny", statusCode: 301 },
  { source: "/uk/services-uk", destination: "/poslugy", statusCode: 301 },
  { source: "/ru/services-ru", destination: "/poslugy", statusCode: 301 },
  { source: "/uk/services", destination: "/poslugy", statusCode: 301 },
  { source: "/ru/services", destination: "/poslugy", statusCode: 301 },
  { source: "/uk/services/pidtrymuyuche-", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/ru/services/pidtrymuyuche-", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/uk/services/pidtrymuyuche-prybyrannya-kvartyry", destination: "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/ru/services/podderzhivayushchaya-uborka-kvartiry", destination: "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/uk/services/generalne-prybyrannya-kvartyry", destination: "/generalne-prybyrannya-kvartyry-cherkasy", statusCode: 301 },
  { source: "/uk/services/generalne-prybyrannya-kuhni", destination: "/generalne-prybyrannya-kuhni-cherkasy", statusCode: 301 },
  { source: "/uk/services/byudzhetne-prybyrannya", destination: "/byudzhetne-prybyrannya-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-torgovyh-centriv", destination: "/prybyrannya-trts-supermarketiv-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-torgovykh-tsentriv", destination: "/prybyrannya-trts-supermarketiv-cherkasy", statusCode: 301 },
  { source: "/uk/video-gallery-uk", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/ru/services/uborka-kottedzhej", destination: "/prybyrannya-kotedzhiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-kottedzhey", destination: "/prybyrannya-kotedzhiv-cherkasy", statusCode: 301 },
  { source: "/uk/contact-uk", destination: "/kontakty", statusCode: 301 },
  { source: "/ru/contact-ru", destination: "/kontakty", statusCode: 301 },
  { source: "/uk/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/ru/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/uk/about-us-uk", destination: "/pro-nas", statusCode: 301 },
  { source: "/ru/about-us-ru", destination: "/pro-nas", statusCode: 301 },
  { source: "/uk/gallery-uk", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/ru/gallery-ru", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/uk/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/ru/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/uk/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", statusCode: 301 },
  { source: "/ru/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", statusCode: 301 },
  { source: "/uk/services/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", statusCode: 301 },
  { source: "/ru/services/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", statusCode: 301 },
  { source: "/uk/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/ru/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-pislya-budivnytstva-cherkasy", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/pislyabudivelne-prybyrannya-cherkasy", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-pislya-budivnytstva-cherkasy", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/uk/services/pislyabudivelne-prybyrannya-cherkasy", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/uk/prybyrannya-pislya-budivnytstva", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/uk/pislyabudivelne-prybyrannya", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/uk/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", statusCode: 301 },
  { source: "/ru/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", statusCode: 301 },
  { source: "/uk/services/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", statusCode: 301 },
  { source: "/uk/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/ru/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/uk/services/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/uk/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/ru/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/uk/services/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/uk/myttya-vikon", destination: "/myttya-vikon-cherkasy", statusCode: 301 },
  { source: "/ru/myttya-vikon", destination: "/myttya-vikon-cherkasy", statusCode: 301 },
  { source: "/uk/services/myttya-vikon", destination: "/myttya-vikon-cherkasy", statusCode: 301 },
  { source: "/ru/services/myttya-vikon", destination: "/myttya-vikon-cherkasy", statusCode: 301 },
  { source: "/uk/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", statusCode: 301 },
  { source: "/ru/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-pislya-potopu", destination: "/prybyrannya-pislya-potopu-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-pislya-potopu", destination: "/prybyrannya-pislya-potopu-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-prylegloyi-terytoriyi", destination: "/prybyrannya-prylegloyi-terytoriyi-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-prylegloyi-terytoriyi", destination: "/prybyrannya-prylegloyi-terytoriyi-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-budynkiv", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-budynkiv", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-kvartir", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/ru/services/generalnaya-uborka", destination: "/generalne-prybyrannya-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-posle-remonta", destination: "/prybyrannya-pislya-remontu-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchistka-mebeli", destination: "/himchystka-mebliv-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchistka-divana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/ru/services/moyka-okon", destination: "/myttya-vikon-cherkasy", statusCode: 301 },
  { source: "/uk/:path*", destination: "/", statusCode: 301 },
  { source: "/ru/:path*", destination: "/", statusCode: 301 }
];

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
    return legacyRedirects;
  }
};

export default nextConfig;
