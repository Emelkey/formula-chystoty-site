import type { NextConfig } from "next";

const canonicalUrl = "https://www.formula-chistoty.ck.ua";

const legacyRedirects = [
  { source: "/uk", destination: "/", statusCode: 301 },
  { source: "/ru", destination: "/", statusCode: 301 },
  { source: "/services", destination: "/poslugy", statusCode: 301 },
  { source: "/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/about", destination: "/pro-nas", statusCode: 301 },
  { source: "/works", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/reviews", destination: "/vidguky", statusCode: 301 },
  { source: "/vidhuky", destination: "/vidguky", statusCode: 301 },
  { source: "/myttya-plitky-cherkasy", destination: "/myttya-plytky-cherkasy", statusCode: 301 },
  { source: "/uk/tsiny-na-klining-cherkasy-2026", destination: "/prices", statusCode: 301 },
  { source: "/uk/price-uk", destination: "/prices", statusCode: 301 },
  { source: "/ru/price-ru", destination: "/prices", statusCode: 301 },
  { source: "/uk/services-uk", destination: "/poslugy", statusCode: 301 },
  { source: "/ru/services-ru", destination: "/poslugy", statusCode: 301 },
  { source: "/uk/services", destination: "/poslugy", statusCode: 301 },
  { source: "/ru/services", destination: "/poslugy", statusCode: 301 },
  { source: "/uk/blog-uk", destination: "/blog", statusCode: 301 },
  { source: "/ru/blog-ru", destination: "/blog", statusCode: 301 },
  { source: "/uk/services/generalne-prybyrannya", destination: `${canonicalUrl}/generalne-prybyrannya-cherkasy`, statusCode: 301 },
  { source: "/ru/services/generalnaya-uborka", destination: `${canonicalUrl}/generalne-prybyrannya-cherkasy`, statusCode: 301 },
  { source: "/uk/services/generalne-prybyrannya-kuhni", destination: `${canonicalUrl}/generalne-prybyrannya-kuhni-cherkasy`, statusCode: 301 },
  { source: "/uk/services/generalne-prybyrannya-kvartyry", destination: `${canonicalUrl}/generalne-prybyrannya-kvartyry-cherkasy`, statusCode: 301 },
  { source: "/ru/services/generalnaya-uborka-kvartiry", destination: `${canonicalUrl}/generalne-prybyrannya-kvartyry-cherkasy`, statusCode: 301 },
  { source: "/byudzhetne-prybyrannya-cherkasy", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/uk/services/byudzhetne-prybyrannya", destination: "/prybyrannya-kvartyr-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-ofisiv-cherkasy", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-magazyniv-cherkasy", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-supermarketiv-cherkasy", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/prybyrannya-trts-supermarketiv-cherkasy", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-torgovyh-centriv", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-torgovykh-tsentriv", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/uk/services/obslugovuvannya-ta-klining-promislovih-i-virobnichih-primishhen", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/ru/services/obsluzhivanie-i-klining-promyshlennyh-i-proizvodstvennyh-pomeshchenij", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/uk/video-gallery-uk", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/ru/video-gallery-ru", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/prybyrannya-kotedzhiv-cherkasy", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-kottedzhej", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/uborka-kottedzhey", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/uk/contact-uk", destination: "/kontakty", statusCode: 301 },
  { source: "/ru/contact-ru", destination: "/kontakty", statusCode: 301 },
  { source: "/uk/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/ru/contacts", destination: "/kontakty", statusCode: 301 },
  { source: "/uk/about-us-uk", destination: "/pro-nas", statusCode: 301 },
  { source: "/ru/about-us-ru", destination: "/pro-nas", statusCode: 301 },
  { source: "/uk/gallery-uk", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/ru/gallery-ru", destination: "/nashi-roboty", statusCode: 301 },
  { source: "/uk/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/ru/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/uk/services/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchystka-dyvana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 },
  { source: "/uk/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/ru/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/uk/services/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchystka-matratsa", destination: "/himchystka-matratsa-cherkasy", statusCode: 301 },
  { source: "/uk/prybyrannya-ofisiv", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/ru/prybyrannya-ofisiv", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-ofisiv", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-ofisiv", destination: "/prybyrannya-komertsiynykh-prymishchen-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-pislya-potopu", destination: "/prybyrannya-pislya-potopu-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-pislya-potopu", destination: "/prybyrannya-pislya-potopu-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-prylegloyi-terytoriyi", destination: "/prybyrannya-prylegloyi-terytoriyi-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-prylegloyi-terytoriyi", destination: "/prybyrannya-prylegloyi-terytoriyi-cherkasy", statusCode: 301 },
  { source: "/uk/services/prybyrannya-budynkiv", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/prybyrannya-budynkiv", destination: "/prybyrannya-budynkiv-cherkasy", statusCode: 301 },
  { source: "/ru/services/himchistka-divana", destination: "/himchystka-dyvana-cherkasy", statusCode: 301 }
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
