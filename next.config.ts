import type { NextConfig } from "next";

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
    return [
      { source: "/uk", destination: "/", permanent: true },
      { source: "/ru", destination: "/", permanent: true },
      { source: "/uk/price-uk", destination: "/prices", permanent: true },
      { source: "/ru/price-ru", destination: "/prices", permanent: true },
      { source: "/uk/services-uk", destination: "/services", permanent: true },
      { source: "/ru/services-ru", destination: "/services", permanent: true },
      { source: "/uk/services", destination: "/services", permanent: true },
      { source: "/ru/services", destination: "/services", permanent: true },
      { source: "/uk/contact-uk", destination: "/contacts", permanent: true },
      { source: "/ru/contact-ru", destination: "/contacts", permanent: true },
      { source: "/uk/contacts", destination: "/contacts", permanent: true },
      { source: "/ru/contacts", destination: "/contacts", permanent: true },
      { source: "/uk/about-us-uk", destination: "/about", permanent: true },
      { source: "/ru/about-us-ru", destination: "/about", permanent: true },
      { source: "/uk/gallery-uk", destination: "/works", permanent: true },
      { source: "/ru/gallery-ru", destination: "/works", permanent: true },
      { source: "/uk/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", permanent: true },
      { source: "/ru/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", permanent: true },
      { source: "/uk/services/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", permanent: true },
      { source: "/ru/services/prybyrannya-kvartyr", destination: "/prybyrannya-kvartyr-cherkasy", permanent: true },
      { source: "/uk/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", permanent: true },
      { source: "/ru/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", permanent: true },
      { source: "/uk/services/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", permanent: true },
      { source: "/ru/services/generalne-prybyrannya", destination: "/generalne-prybyrannya-cherkasy", permanent: true },
      { source: "/uk/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", permanent: true },
      { source: "/ru/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", permanent: true },
      { source: "/uk/services/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", permanent: true },
      { source: "/ru/services/prybyrannya-pislya-remontu", destination: "/prybyrannya-pislya-remontu-cherkasy", permanent: true },
      { source: "/uk/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", permanent: true },
      { source: "/ru/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", permanent: true },
      { source: "/uk/services/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", permanent: true },
      { source: "/ru/services/himchystka-mebliv", destination: "/himchystka-mebliv-cherkasy", permanent: true },
      { source: "/uk/myttya-vikon", destination: "/myttya-vikon-cherkasy", permanent: true },
      { source: "/ru/myttya-vikon", destination: "/myttya-vikon-cherkasy", permanent: true },
      { source: "/uk/services/myttya-vikon", destination: "/myttya-vikon-cherkasy", permanent: true },
      { source: "/ru/services/myttya-vikon", destination: "/myttya-vikon-cherkasy", permanent: true },
      { source: "/uk/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", permanent: true },
      { source: "/ru/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", permanent: true },
      { source: "/uk/services/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", permanent: true },
      { source: "/ru/services/prybyrannya-ofisiv", destination: "/prybyrannya-ofisiv-cherkasy", permanent: true },
      { source: "/uk/services/prybyrannya-pislya-potopu", destination: "/prybyrannya-pislya-potopu-cherkasy", permanent: true },
      { source: "/ru/services/prybyrannya-pislya-potopu", destination: "/prybyrannya-pislya-potopu-cherkasy", permanent: true },
      { source: "/uk/services/prybyrannya-prylegloyi-terytoriyi", destination: "/prybyrannya-prylegloyi-terytoriyi-cherkasy", permanent: true },
      { source: "/ru/services/prybyrannya-prylegloyi-terytoriyi", destination: "/prybyrannya-prylegloyi-terytoriyi-cherkasy", permanent: true },
      { source: "/uk/services/prybyrannya-budynkiv", destination: "/prybyrannya-budynkiv-cherkasy", permanent: true },
      { source: "/ru/services/prybyrannya-budynkiv", destination: "/prybyrannya-budynkiv-cherkasy", permanent: true }
    ];
  }
};

export default nextConfig;
