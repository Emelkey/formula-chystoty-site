import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const canonicalHost = "www.formula-chistoty.ck.ua";
const productionHosts = new Set(["formula-chistoty.ck.ua", canonicalHost]);
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
  "vyyizna-himchystka-avto",
  "vyyizna-himchystka-avto-cherkasy",
  "himchistka-salona-avto",
  "himchistka-salona-avto-cherkasy",
  "himchystka-avtomobilya",
  "himchystka-avtomobilya-cherkasy",
  "himchistka-avtomobilya",
  "himchistka-avtomobilya-cherkasy"
];
const carCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const carCleaningLegacyPaths = new Set([
  carCleaningCanonicalPath,
  ...carCleaningLegacyPrefixes.flatMap((prefix) => carCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const furnitureCleaningCanonicalPath = "/himchystka-mebliv-cherkasy";
const furnitureCleaningLegacySlugs = [
  "himchystka-mebliv",
  "himchystka-myakyh-mebliv",
  "himchystka-myakykh-mebliv",
  "himchystka-myakoyi-mebli",
  "himchystka-myakoi-mebli",
  "khimchystka-mebliv",
  "khimchystka-myakyh-mebliv",
  "khimchystka-myakykh-mebliv",
  "himchistka-mebliv",
  "himchistka-myakyh-mebliv",
  "himchistka-myakykh-mebliv",
  "chystka-mebliv",
  "chystka-myakyh-mebliv",
  "chystka-myakykh-mebliv",
  "vyyizna-himchystka-mebliv",
  "vyyizna-himchystka-myakyh-mebliv",
  "vyyizna-himchystka-myakykh-mebliv",
  "himchistka-mebeli",
  "himchistka-myagkoj-mebeli",
  "himchistka-myagkoy-mebeli",
  "khimchistka-mebeli",
  "khimchistka-myagkoj-mebeli",
  "khimchistka-myagkoy-mebeli",
  "chistka-mebeli",
  "chistka-myagkoj-mebeli",
  "chistka-myagkoy-mebeli",
  "vyezdnaya-himchistka-mebeli",
  "vyezdnaya-himchistka-myagkoj-mebeli",
  "vyezdnaya-himchistka-myagkoy-mebeli"
];
const furnitureCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const furnitureCleaningLegacyPaths = new Set([
  furnitureCleaningCanonicalPath,
  ...furnitureCleaningLegacyPrefixes.flatMap((prefix) => furnitureCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const postRenovationCanonicalPath = "/prybyrannya-pislya-remontu-cherkasy";
const postRenovationLegacySlugs = [
  "prybyrannya-pislya-remontu",
  "prybyrannya-pislya-remontu-cherkasy",
  "prybyrannya-kvartyr-pislya-remontu",
  "prybyrannya-kvartyr-pislya-remontu-v-cherkasah",
  "prybyrannya-kvartyr-pislya-remontu-v-cherkasakh",
  "prybyrannya-ofisu-pislya-remontu",
  "prybyrannya-ofisiv-pislya-remontu",
  "prybyrannya-pislya-budivnytstva",
  "prybyrannya-pislya-budivnytstva-cherkasy",
  "pislyabudivelne-prybyrannya",
  "pislyabudivelne-prybyrannya-cherkasy",
  "klining-pislya-budivnytstva",
  "klining-pislya-budivnytstva-cherkasy",
  "uborka-posle-remonta",
  "uborka-posle-remonta-cherkassy",
  "uborka-kvartir-posle-remonta",
  "uborka-kvartir-posle-remonta-v-cherkassah",
  "uborka-kvartir-posle-remonta-v-cherkassakh",
  "uborka-ofisa-posle-remonta",
  "uborka-ofisov-posle-remonta",
  "klining-posle-remonta",
  "klining-posle-remonta-cherkassy"
];
const postRenovationLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const postRenovationLegacyPaths = new Set([
  postRenovationCanonicalPath,
  ...postRenovationLegacyPrefixes.flatMap((prefix) => postRenovationLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const kitchenGeneralCleaningCanonicalPath = "/generalne-prybyrannya-kuhni-cherkasy";
const kitchenGeneralCleaningLegacySlugs = [
  "generalne-prybyrannya-kuhni",
  "generalne-prybyrannya-kuhni-cherkasy",
  "generalne-prybyrannya-kuhni-v-cherkasah",
  "generalne-prybyrannya-kuhni-v-cherkasakh",
  "generalne-prybyrannya-kuhny",
  "generalne-prybyrannya-kuhny-cherkasy",
  "generalne-prybyrannya-kukhni",
  "generalne-prybyrannya-kukhni-cherkasy",
  "generalne-prybirannya-kuhni",
  "generalne-prybirannya-kuhny",
  "generalne-prybirannya-kukhni",
  "generalnaya-uborka-kuhni",
  "generalnaya-uborka-kuhni-cherkassy",
  "generalnaya-uborka-kuhni-v-cherkassah",
  "generalnaya-uborka-kuhni-v-cherkassakh",
  "generalnaya-uborka-kukhni",
  "generalnaya-uborka-kukhni-cherkassy",
  "generalnaya-uborka-kuhny",
  "generalnaya-uborka-kuhny-cherkassy"
];
const kitchenGeneralCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const kitchenGeneralCleaningLegacyPaths = new Set([
  kitchenGeneralCleaningCanonicalPath,
  ...kitchenGeneralCleaningLegacyPrefixes.flatMap((prefix) =>
    kitchenGeneralCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`)
  )
]);

const generalCleaningCanonicalPath = "/generalne-prybyrannya-cherkasy";
const generalCleaningLegacySlugs = [
  "generalne-prybyrannya",
  "generalne-prybyrannya-cherkasy",
  "generalne-prybyrannya-v-cherkasah",
  "generalne-prybyrannya-v-cherkasakh",
  "generalne-prybirannya",
  "generalne-prybirannya-cherkasy",
  "generalnaya-uborka",
  "generalnaya-uborka-cherkassy",
  "generalnaya-uborka-v-cherkassah",
  "generalnaya-uborka-v-cherkassakh"
];
const generalCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const generalCleaningLegacyPaths = new Set([
  generalCleaningCanonicalPath,
  ...generalCleaningLegacyPrefixes.flatMap((prefix) => generalCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const apartmentGeneralCleaningCanonicalPath = "/generalne-prybyrannya-kvartyry-cherkasy";
const apartmentGeneralCleaningLegacySlugs = [
  "generalne-prybyrannya-kvartyry",
  "generalne-prybyrannya-kvartyry-cherkasy",
  "generalne-prybyrannya-kvartyry-v-cherkasah",
  "generalne-prybyrannya-kvartyry-v-cherkasakh",
  "generalne-prybyrannya-kvartyr",
  "generalne-prybyrannya-kvartyr-cherkasy",
  "generalne-prybyrannya-kvartyr-v-cherkasah",
  "generalne-prybyrannya-kvartyr-v-cherkasakh",
  "generalne-prybyrannya-kvartiry",
  "generalne-prybyrannya-kvartiry-cherkasy",
  "generalne-prybyrannya-kvartiry-v-cherkasah",
  "generalne-prybyrannya-kvartiry-v-cherkasakh",
  "generalne-prybirannya-kvartyry",
  "generalne-prybirannya-kvartyr",
  "generalne-prybirannya-kvartiry",
  "generalnaya-uborka-kvartiry",
  "generalnaya-uborka-kvartiry-cherkassy",
  "generalnaya-uborka-kvartir",
  "generalnaya-uborka-kvartir-cherkassy"
];
const apartmentGeneralCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const apartmentGeneralCleaningLegacyPaths = new Set([
  apartmentGeneralCleaningCanonicalPath,
  ...apartmentGeneralCleaningLegacyPrefixes.flatMap((prefix) =>
    apartmentGeneralCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`)
  )
]);

const maintenanceCleaningCanonicalPath = "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy";
const maintenanceCleaningLegacySlugs = [
  "pidtrymuyuche-",
  "pidtrymuyuche-prybyrannya",
  "pidtrymuyuche-prybyrannya-cherkasy",
  "pidtrymuyuche-prybyrannya-v-cherkasah",
  "pidtrymuyuche-prybyrannya-v-cherkasakh",
  "pidtrymuyuche-prybyrannya-kvartyr",
  "pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
  "pidtrymuyuche-prybyrannya-kvartyr-v-cherkasah",
  "pidtrymuyuche-prybyrannya-kvartyr-v-cherkasakh",
  "pidtrymuyuche-prybyrannya-kvartyry",
  "pidtrymuyuche-prybyrannya-kvartyry-cherkasy",
  "pidtrymuyuche-prybyrannya-kvartyry-v-cherkasah",
  "pidtrymuyuche-prybyrannya-kvartyry-v-cherkasakh",
  "pidtrimuyuche-prybyrannya",
  "pidtrimuyuche-prybyrannya-kvartyr",
  "pidtrimuyuche-prybyrannya-kvartyry",
  "podderzhivayushchaya-uborka",
  "podderzhivayushchaya-uborka-cherkassy",
  "podderzhivayushchaya-uborka-kvartiry",
  "podderzhivayushchaya-uborka-kvartiry-cherkassy",
  "podderzhivayuschaya-uborka",
  "podderzhivayuschaya-uborka-kvartiry",
  "podderzhivayushhaya-uborka",
  "podderzhivayushhaya-uborka-kvartiry"
];
const maintenanceCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const maintenanceCleaningLegacyPaths = new Set([
  maintenanceCleaningCanonicalPath,
  ...maintenanceCleaningLegacyPrefixes.flatMap((prefix) => maintenanceCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const apartmentCleaningCanonicalPath = "/prybyrannya-kvartyr-cherkasy";
const apartmentCleaningLegacySlugs = [
  "prybyrannya-kvartyr",
  "prybyrannya-kvartyr-cherkasy",
  "prybyrannya-kvartyr-v-cherkasah",
  "prybyrannya-kvartyr-v-cherkasakh",
  "prybyrannya-kvartyry",
  "prybyrannya-kvartyry-cherkasy",
  "prybyrannya-kvartyry-v-cherkasah",
  "prybyrannya-kvartyry-v-cherkasakh",
  "klining-kvartyr",
  "klining-kvartyr-cherkasy",
  "klining-kvartyr-v-cherkasah",
  "klining-kvartyr-v-cherkasakh",
  "uborka-kvartir",
  "uborka-kvartir-cherkassy",
  "uborka-kvartir-v-cherkassah",
  "uborka-kvartir-v-cherkassakh",
  "klining-kvartir",
  "klining-kvartir-cherkassy",
  "klining-kvartir-v-cherkassah",
  "klining-kvartir-v-cherkassakh"
];
const apartmentCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const apartmentCleaningLegacyPaths = new Set([
  apartmentCleaningCanonicalPath,
  ...apartmentCleaningLegacyPrefixes.flatMap((prefix) => apartmentCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const houseCleaningCanonicalPath = "/prybyrannya-budynkiv-cherkasy";
const houseCleaningLegacySlugs = [
  "prybyrannya-budynkiv",
  "prybyrannya-budynkiv-cherkasy",
  "prybyrannya-budynkiv-v-cherkasah",
  "prybyrannya-budynkiv-v-cherkasakh",
  "prybyrannya-budynku",
  "prybyrannya-budynku-cherkasy",
  "prybyrannya-budynku-v-cherkasah",
  "prybyrannya-budynku-v-cherkasakh",
  "prybyrannya-pryvatnyh-budynkiv",
  "prybyrannya-pryvatnyh-budynkiv-cherkasy",
  "prybyrannya-pryvatnykh-budynkiv",
  "prybyrannya-pryvatnykh-budynkiv-cherkasy",
  "prybyrannya-domiv",
  "prybyrannya-domiv-cherkasy",
  "prybyrannya-kotedzhiv",
  "prybyrannya-kotedzhiv-cherkasy",
  "uborka-domov",
  "uborka-domov-cherkassy",
  "uborka-doma",
  "uborka-doma-cherkassy",
  "uborka-chastnyh-domov",
  "uborka-chastnyh-domov-cherkassy",
  "uborka-chastnykh-domov",
  "uborka-chastnykh-domov-cherkassy",
  "uborka-kottedzhej",
  "uborka-kottedzhey",
  "uborka-kottedzhej-cherkassy",
  "uborka-kottedzhey-cherkassy"
];
const houseCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const houseCleaningLegacyPaths = new Set([
  houseCleaningCanonicalPath,
  ...houseCleaningLegacyPrefixes.flatMap((prefix) => houseCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const disinfectionCanonicalPath = "/dezinfektsiya-prymishchen-cherkasy";
const disinfectionLegacySlugs = [
  "dezinfektsiya-prymishchen",
  "dezinfektsiya-prymishchen-cherkasy",
  "dezinfektsiya-prymishchen-v-cherkasah",
  "dezinfektsiya-prymishchen-v-cherkasakh",
  "dezinfektsiya-prymishchen-vid-virusiv",
  "dezinfektsiya-prymishchen-vid-virusiv-hvorob-ta-covid-19",
  "dezynfektsiya-prymishchen",
  "dezynfektsiya-prymishchen-cherkasy",
  "dezynfektsiya-prymishchen-v-cherkasah",
  "dezynfektsiya-prymishchen-v-cherkasakh",
  "dezynfektsiya-prymishchen-vid-virusiv",
  "dezynfektsiya-prymishchen-vid-virusiv-hvorob-ta-covid-19",
  "dezinfekciya-prymishchen",
  "dezinfekciya-prymishchen-cherkasy",
  "dezinfektsiya",
  "dezynfektsiya",
  "dezinfekciya",
  "dezinfektsiya-vid-virusiv",
  "dezynfektsiya-vid-virusiv",
  "dezinfekciya-vid-virusiv",
  "dezinfekciya-pomeshchenij",
  "dezinfekciya-pomeshchenij-cherkassy",
  "dezinfektsiya-pomeshchenij",
  "dezinfektsiya-pomeshchenij-cherkassy",
  "dezinfektsiya-pomescheniy",
  "dezinfektsiya-pomescheniy-cherkassy",
  "dezinfekciya-pomescheniy",
  "dezinfekciya-pomescheniy-cherkassy",
  "dezinfektsiya-ot-virusov",
  "dezinfekciya-ot-virusov",
  "prybyrannya-pislya-trupu",
  "prybyrannya-pislya-trupu-cherkasy",
  "prybyrannya-pislya-smerti",
  "prybyrannya-pislya-smerti-cherkasy",
  "dezinfektsiya-pislya-trupu",
  "dezinfektsiya-pislya-trupu-cherkasy",
  "dezynfektsiya-pislya-trupu",
  "dezynfektsiya-pislya-trupu-cherkasy",
  "sanitarne-prybyrannya-pislya-trupu",
  "sanitarne-prybyrannya-pislya-trupu-cherkasy",
  "ozonatsiya-prymishchen",
  "ozonatsiya-prymishchen-cherkasy",
  "ozonuvannya-prymishchen",
  "ozonuvannya-prymishchen-cherkasy",
  "uborka-posle-trupa",
  "uborka-posle-trupa-cherkassy",
  "uborka-posle-smerti",
  "uborka-posle-smerti-cherkassy",
  "dezinfekciya-posle-trupa",
  "dezinfektsiya-posle-trupa",
  "dezinfekciya-posle-smerti",
  "dezinfektsiya-posle-smerti",
  "sanitarnaya-uborka-posle-trupa",
  "sanitarnaya-uborka-posle-smerti"
];
const disinfectionLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const disinfectionLegacyPaths = new Set([
  disinfectionCanonicalPath,
  ...disinfectionLegacyPrefixes.flatMap((prefix) => disinfectionLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const carpetCleaningCanonicalPath = "/himchystka-kylymiv-cherkasy";
const carpetCleaningLegacySlugs = [
  "himchystka-kylymiv",
  "himchystka-kylymiv-cherkasy",
  "himchystka-kylymiv-v-cherkasah",
  "himchystka-kylymiv-v-cherkasakh",
  "himchystka-kylymiv-kovrolinu",
  "himchystka-kilimiv",
  "himchystka-kilimiv-cherkasy",
  "himchystka-kovrolinu",
  "himchystka-kovrolinu-cherkasy",
  "khimchystka-kylymiv",
  "khimchystka-kylymiv-cherkasy",
  "chystka-kylymiv",
  "chystka-kylymiv-cherkasy",
  "chystka-kylymiv-kovrolinu",
  "chystka-kilimiv",
  "chystka-kilimiv-cherkasy",
  "chystka-kovrolinu",
  "chystka-kovrolinu-cherkasy",
  "himchistka-kovrov",
  "himchistka-kovrov-cherkassy",
  "himchistka-kovrolina",
  "himchistka-kovrolina-cherkassy",
  "khimchistka-kovrov",
  "khimchistka-kovrov-cherkassy",
  "chistka-kovrov",
  "chistka-kovrov-cherkassy",
  "chistka-kovrov-kovrolina",
  "chistka-kovrolina",
  "chistka-kovrolina-cherkassy"
];
const carpetCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const carpetCleaningLegacyPaths = new Set([
  carpetCleaningCanonicalPath,
  ...carpetCleaningLegacyPrefixes.flatMap((prefix) => carpetCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const windowCleaningCanonicalPath = "/myttya-vikon-cherkasy";
const windowCleaningLegacySlugs = [
  "myttya-vikon",
  "myttya-vikon-cherkasy",
  "myttya-vikon-v-cherkasah",
  "myttya-vikon-v-cherkasakh",
  "myttya-vikon-i-vitryn",
  "myttya-vitryn",
  "myttya-vitryn-cherkasy",
  "mojka-okon",
  "mojka-okon-cherkassy",
  "mojka-okon-v-cherkassah",
  "mojka-okon-v-cherkassakh",
  "moyka-okon",
  "moyka-okon-cherkassy",
  "moyka-okon-v-cherkassah",
  "moyka-okon-v-cherkassakh",
  "moyka-vitrin"
];
const windowCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const windowCleaningLegacyPaths = new Set([
  windowCleaningCanonicalPath,
  ...windowCleaningLegacyPrefixes.flatMap((prefix) => windowCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const facadeCleaningCanonicalPath = "/myttya-fasadiv-cherkasy";
const facadeCleaningLegacySlugs = [
  "myttya-fasadiv",
  "myttya-fasadiv-cherkasy",
  "myttya-fasadiv-v-cherkasah",
  "myttya-fasadiv-v-cherkasakh",
  "myttya-vikon-vitryn-ta-fasadiv",
  "myttya-vikon-vitrin-ta-fasadiv",
  "myttya-vikon-vytryn-ta-fasadiv",
  "myttya-vikon-vitryn-fasadiv",
  "myttya-vikon-vitrin-fasadiv",
  "myttya-vikon-vytryn-fasadiv",
  "myttya-vitryn-ta-fasadiv",
  "myttya-vitrin-ta-fasadiv",
  "myttya-vytryn-ta-fasadiv",
  "myttya-fasadiv-i-vitryn",
  "myttya-fasadiv-i-vitrin",
  "myttya-fasadiv-i-vytryn",
  "mittya-fasadiv",
  "mittya-fasadiv-cherkasy",
  "mojka-fasadov",
  "mojka-fasadov-cherkassy",
  "mojka-okon-vitrin-i-fasadov",
  "moyka-fasadov",
  "moyka-fasadov-cherkassy",
  "moyka-okon-vitrin-i-fasadov"
];
const facadeCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const facadeCleaningLegacyPaths = new Set([
  facadeCleaningCanonicalPath,
  ...facadeCleaningLegacyPrefixes.flatMap((prefix) => facadeCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const noindexExactPaths = new Set([
  "/uk/feed",
  "/ru/feed",
  "/uk/services/feed",
  "/ru/services/feed"
]);

const noindexPaginationPattern = /^\/(?:uk|ru)\/services\/page\/\d+$/;

const exactLegacyRedirects = new Map([
  ["/uk", "/"],
  ["/ru", "/"],
  ["/about", "/pro-nas"],
  ["/works", "/nashi-roboty"],
  ["/reviews", "/vidguky"],
  ["/vidhuky", "/vidguky"],
  ["/services", "/poslugy"],
  ["/uk/services", "/poslugy"],
  ["/ru/services", "/poslugy"],
  ["/uk/services-uk", "/poslugy"],
  ["/ru/services-ru", "/poslugy"],
  ["/uk/blog-uk", "/blog"],
  ["/ru/blog-ru", "/blog"],
  ["/uk/video-gallery-uk", "/nashi-roboty"],
  ["/ru/video-gallery-ru", "/nashi-roboty"],
  ["/uk/services/myttya-vikon-vitryn-ta-fasadiv", "/myttya-fasadiv-cherkasy"],
  ["/uk/services/myttya-vikon-vitrin-ta-fasadiv", "/myttya-fasadiv-cherkasy"],
  ["/uk/services/myttya-vikon-vytryn-ta-fasadiv", "/myttya-fasadiv-cherkasy"],
  ["/ru/services/mojka-okon-vitrin-i-fasadov", "/myttya-fasadiv-cherkasy"],
  ["/uk/services/prybyrannya-pislya-trupu", "/dezinfektsiya-prymishchen-cherkasy"],
  ["/uk/services/dezinfektsiya-pislya-trupu", "/dezinfektsiya-prymishchen-cherkasy"],
  ["/ru/services/uborka-posle-trupa", "/dezinfektsiya-prymishchen-cherkasy"],
  ["/ru/services/dezinfekciya-posle-trupa", "/dezinfektsiya-prymishchen-cherkasy"],
  ["/uk/services/obslugovuvannya-ta-klining-promislovih-i-virobnichih-primishhen", "/prybyrannya-komertsiynykh-prymishchen-cherkasy"],
  ["/ru/services/obsluzhivanie-i-klining-promyshlennyh-i-proizvodstvennyh-pomeshchenij", "/prybyrannya-komertsiynykh-prymishchen-cherkasy"],
  ["/uk/services/prybyrannya-prylegloyi-terytoriyi", "/prybyrannya-prylegloyi-terytoriyi-cherkasy"],
  ["/prybyrannya-kotedzhiv-cherkasy", "/prybyrannya-budynkiv-cherkasy"]
]);

function normalizePath(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function isNoindexLegacyPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return noindexExactPaths.has(normalized) || noindexPaginationPattern.test(normalized);
}

const serviceRedirectRules = [
  {
    canonicalPath: carCleaningCanonicalPath,
    paths: carCleaningLegacyPaths,
    patterns: [
      /(?:himchystka|himchistka|khimchystka|khimchistka|chystka|chistka|vyyizna|vyizna|vyezdnaya).*(?:avto|avtomobil|salon)/,
      /(?:avto|avtomobil).*(?:himchystka|himchistka|khimchystka|khimchistka|chystka|chistka)/
    ]
  },
  {
    canonicalPath: furnitureCleaningCanonicalPath,
    paths: furnitureCleaningLegacyPaths,
    patterns: [
      /(?:himchystka|himchistka|khimchystka|khimchistka|chystka|chistka|vyyizna|vyizna|vyezdnaya).*(?:mebl|mebel|myak|myag|mjak)/,
      /(?:mebl|mebel|myak|myag|mjak).*(?:himchystka|himchistka|khimchystka|khimchistka|chystka|chistka)/
    ]
  },
  {
    canonicalPath: postRenovationCanonicalPath,
    paths: postRenovationLegacyPaths,
    patterns: [
      /(?:pislya|pislja|posle).*(?:remont|budivnytstv|budivel|stroi|stroy)/,
      /(?:remont|budivnytstv|budivel|stroi|stroy).*(?:prybyrannya|uborka|klining|cleaning)/
    ]
  },
  {
    canonicalPath: kitchenGeneralCleaningCanonicalPath,
    paths: kitchenGeneralCleaningLegacyPaths,
    patterns: [/(?:generalne|generalnaya|generalna).*(?:kuhni|kuhny|kukhni|kukhny|kuhnya|kitchen)/]
  },
  {
    canonicalPath: apartmentGeneralCleaningCanonicalPath,
    paths: apartmentGeneralCleaningLegacyPaths,
    patterns: [
      /(?:generalne|generalnaya|generalna).*(?:kvartyr|kvartyry|kvartir|kvartiry)/,
      /(?:kvartyr|kvartyry|kvartir|kvartiry).*(?:generalne|generalnaya|generalna)/
    ]
  },
  {
    canonicalPath: generalCleaningCanonicalPath,
    paths: generalCleaningLegacyPaths,
    patterns: [
      /(?:generalne|generalnaya|generalna).*(?:prybyrannya|uborka)/,
      /(?:prybyrannya|uborka).*(?:generalne|generalnaya|generalna)/
    ]
  },
  {
    canonicalPath: maintenanceCleaningCanonicalPath,
    paths: maintenanceCleaningLegacyPaths,
    patterns: [
      /(?:pidtrym|pidtrim|podderzh|podderz).*(?:prybyrannya|uborka|kvartyr|kvartyry|kvartir)/,
      /(?:prybyrannya|uborka).*(?:pidtrym|pidtrim|podderzh|podderz)/
    ]
  },
  {
    canonicalPath: apartmentCleaningCanonicalPath,
    paths: apartmentCleaningLegacyPaths,
    patterns: [
      /(?:prybyrannya|uborka|klining|cleaning).*(?:kvartyr|kvartyry|kvartir|kvartiry)/,
      /(?:kvartyr|kvartyry|kvartir|kvartiry).*(?:prybyrannya|uborka|klining|cleaning)/
    ]
  },
  {
    canonicalPath: houseCleaningCanonicalPath,
    paths: houseCleaningLegacyPaths,
    patterns: [
      /(?:prybyrannya|uborka|klining).*(?:budyn|budynku|dom|doma|domov|kotedzh|kottedzh|kottedz|cottage|chastn)/,
      /(?:budyn|budynku|dom|doma|domov|kotedzh|kottedzh|kottedz|cottage|chastn).*(?:prybyrannya|uborka|klining)/
    ]
  },
  {
    canonicalPath: disinfectionCanonicalPath,
    paths: disinfectionLegacyPaths,
    patterns: [
      /(?:dezinfek|dezynfek|dezinfec|dezinfekciya|dezinfektsiya|ozonatsiya|ozonuvannya)/,
      /(?:pislya|pislja|posle).*(?:trup|smert|smerti|tela|tila|biolog)/,
      /(?:trup|smert|smerti|tela|tila|biolog).*(?:prybyrannya|uborka|dezinfek|dezynfek|ozon)/
    ]
  },
  {
    canonicalPath: carpetCleaningCanonicalPath,
    paths: carpetCleaningLegacyPaths,
    patterns: [
      /(?:himchystka|himchistka|khimchystka|khimchistka|chystka|chistka).*(?:kylym|kilim|kovr|kovrolin)/,
      /(?:kylym|kilim|kovr|kovrolin).*(?:himchystka|himchistka|khimchystka|khimchistka|chystka|chistka)/
    ]
  },
  {
    canonicalPath: facadeCleaningCanonicalPath,
    paths: facadeCleaningLegacyPaths,
    patterns: [
      /(?:myttya|mojka|moyka).*(?:fasad)/,
      /(?:fasad).*(?:myttya|mojka|moyka)/
    ]
  },
  {
    canonicalPath: windowCleaningCanonicalPath,
    paths: windowCleaningLegacyPaths,
    patterns: [
      /(?:myttya|mojka|moyka).*(?:vikon|okon|vitrin)/,
      /(?:vikon|okon|vitrin).*(?:myttya|mojka|moyka)/
    ]
  }
];

function getServiceRedirectDestination(pathname: string) {
  const normalized = normalizePath(pathname).toLowerCase();
  for (const rule of serviceRedirectRules) {
    if (rule.paths.has(normalized) || rule.patterns.some((pattern) => pattern.test(normalized))) {
      return rule.canonicalPath;
    }
  }

  return undefined;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const normalizedPath = normalizePath(pathname);
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(":", "");
  const legacyDestination = exactLegacyRedirects.get(normalizedPath);

  if (legacyDestination) {
    const url = request.nextUrl.clone();
    url.protocol = productionHosts.has(host) ? "https:" : request.nextUrl.protocol;
    if (productionHosts.has(host)) {
      url.hostname = canonicalHost;
      url.port = "";
    } else {
      url.host = request.nextUrl.host;
    }
    url.pathname = legacyDestination;
    return NextResponse.redirect(url, 301);
  }

  const serviceDestination = getServiceRedirectDestination(normalizedPath);
  if (
    serviceDestination &&
    (normalizedPath !== serviceDestination || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = serviceDestination;
    return NextResponse.redirect(url, 301);
  }

  if (
    carCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== carCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = carCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    furnitureCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== furnitureCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = furnitureCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    postRenovationLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== postRenovationCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = postRenovationCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    kitchenGeneralCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== kitchenGeneralCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = kitchenGeneralCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    apartmentGeneralCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== apartmentGeneralCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = apartmentGeneralCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    generalCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== generalCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = generalCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    maintenanceCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== maintenanceCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = maintenanceCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    apartmentCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== apartmentCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = apartmentCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    houseCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== houseCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = houseCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    disinfectionLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== disinfectionCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = disinfectionCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    carpetCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== carpetCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = carpetCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (
    windowCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== windowCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    url.pathname = windowCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

  if (productionHosts.has(host) && (host !== canonicalHost || protocol !== "https")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = canonicalHost;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  if (normalizedPath.startsWith("/uk/") || normalizedPath.startsWith("/ru/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }

  if (!isNoindexLegacyPath(pathname)) return;

  return new Response(
    "<!doctype html><html lang=\"uk\"><head><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex, nofollow\"><title>Службова сторінка</title></head><body>Службова сторінка не призначена для індексації.</body></html>",
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
