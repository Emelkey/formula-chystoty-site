export type UkLegacyRoute = {
  source: string;
  destination: string;
  permanent: true;
  reason: string;
  migrationDate: string;
};

const migrationDate = "2026-08-15";
const servicePrefixes = ["/uk", "/uk/services"] as const;

const serviceFamilies = [
  {
    "id": "carCleaning",
    "destination": "/himchystka-avto-cherkasy",
    "reason": "Legacy car-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "furnitureCleaning",
    "destination": "/himchystka-mebliv-cherkasy",
    "reason": "Legacy furniture-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "postRenovation",
    "destination": "/prybyrannya-pislya-remontu-cherkasy",
    "reason": "Legacy post-renovation URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "kitchenGeneralCleaning",
    "destination": "/generalne-prybyrannya-kuhni-cherkasy",
    "reason": "Legacy kitchen-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "generalCleaning",
    "destination": "/generalne-prybyrannya-cherkasy",
    "reason": "Legacy general-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "apartmentGeneralCleaning",
    "destination": "/generalne-prybyrannya-kvartyry-cherkasy",
    "reason": "Legacy apartment general-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "maintenanceCleaning",
    "destination": "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy maintenance-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "apartmentCleaning",
    "destination": "/prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy apartment-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "houseCleaning",
    "destination": "/prybyrannya-budynkiv-cherkasy",
    "reason": "Legacy house-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "disinfection",
    "destination": "/dezinfektsiya-prymishchen-cherkasy",
    "reason": "Legacy disinfection URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "carpetCleaning",
    "destination": "/himchystka-kylymiv-cherkasy",
    "reason": "Legacy carpet-cleaning URL consolidation",
    "slugs": [
      "himchystka-kylymiv",
      "himchystka-kylymiv-cherkasy",
      "himchystka-kylymiv-v-cherkasah",
      "himchystka-kylymiv-v-cherkasakh",
      "himchystka-kylymiv-kovrolinu",
      "himchystka-kilimiv",
      "himchystka-kilimiv-cherkasy",
      "khimchystka-kylymiv",
      "khimchystka-kylymiv-cherkasy",
      "chystka-kylymiv",
      "chystka-kylymiv-cherkasy",
      "chystka-kylymiv-kovrolinu",
      "chystka-kilimiv",
      "chystka-kilimiv-cherkasy",
      "himchistka-kovrov",
      "himchistka-kovrov-cherkassy",
      "khimchistka-kovrov",
      "khimchistka-kovrov-cherkassy",
      "chistka-kovrov",
      "chistka-kovrov-cherkassy",
      "chistka-kovrov-kovrolina"
    ]
  },
  {
    "id": "carpetFlooringCleaning",
    "destination": "/himchystka-kovrolinu-cherkasy",
    "reason": "Legacy carpet-flooring URL consolidation",
    "slugs": [
      "himchystka-kovrolinu",
      "chystka-kovrolinu",
      "chystka-kovrolinu-cherkasy",
      "himchistka-kovrolina",
      "himchistka-kovrolina-cherkassy",
      "chistka-kovrolina",
      "chistka-kovrolina-cherkassy"
    ]
  },
  {
    "id": "windowCleaning",
    "destination": "/myttya-vikon-cherkasy",
    "reason": "Legacy window-cleaning URL consolidation",
    "slugs": [
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
    ]
  },
  {
    "id": "facadeCleaning",
    "destination": "/myttya-fasadiv-cherkasy",
    "reason": "Legacy facade-cleaning URL consolidation",
    "slugs": [
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
    ]
  }
] as const;

const exactRoutes = [
  {
    "source": "/uk",
    "destination": "/",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/tsiny-na-klining-cherkasy-2026",
    "destination": "/prices",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/price-uk",
    "destination": "/prices",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services-uk",
    "destination": "/poslugy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services",
    "destination": "/poslugy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/blog-uk",
    "destination": "/blog",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-kvartyr",
    "destination": "/prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-kvartyry",
    "destination": "/prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/generalne-prybyrannya",
    "destination": "/generalne-prybyrannya-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/generalne-prybyrannya-kuhni",
    "destination": "/generalne-prybyrannya-kuhni-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/generalne-prybyrannya-kvartyry",
    "destination": "/generalne-prybyrannya-kvartyry-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/pidtrymuyuche-prybyrannya",
    "destination": "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/pidtrymuyuche-prybyrannya-kvartyr",
    "destination": "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/pidtrymuyuche-prybyrannya-kvartyry",
    "destination": "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-pislya-remontu",
    "destination": "/prybyrannya-pislya-remontu-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-kvartyr-pislya-remontu",
    "destination": "/prybyrannya-pislya-remontu-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-pislya-budivnytstva",
    "destination": "/prybyrannya-pislya-remontu-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/klining-pislya-budivnytstva",
    "destination": "/prybyrannya-pislya-remontu-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/myttya-fasadiv",
    "destination": "/myttya-fasadiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/myttya-vikon-vitryn-ta-fasadiv",
    "destination": "/myttya-fasadiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/myttya-vikon-vitrin-ta-fasadiv",
    "destination": "/myttya-fasadiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/myttya-vikon-vytryn-ta-fasadiv",
    "destination": "/myttya-fasadiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-pislya-trupu",
    "destination": "/dezinfektsiya-prymishchen-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/dezinfektsiya-pislya-trupu",
    "destination": "/dezinfektsiya-prymishchen-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/byudzhetne-prybyrannya",
    "destination": "/prybyrannya-kvartyr-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-torgovyh-centriv",
    "destination": "/prybyrannya-mahazyniv-supermarketiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-torgovykh-tsentriv",
    "destination": "/prybyrannya-mahazyniv-supermarketiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/obslugovuvannya-ta-klining-promislovih-i-virobnichih-primishhen",
    "destination": "/prybyrannya-vyrobnychykh-prymishchen-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-skladiv",
    "destination": "/prybyrannya-skladiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-medychnykh-tsentriv",
    "destination": "/prybyrannya-medychnykh-tsentriv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/himchystka-stiltsiv",
    "destination": "/himchystka-stiltsiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/himchystka-krisel",
    "destination": "/himchystka-krisel-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/himchystka-kovrolinu",
    "destination": "/himchystka-kovrolinu-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/video-gallery-uk",
    "destination": "/nashi-roboty",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/contact-uk",
    "destination": "/kontakty",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/contact",
    "destination": "/kontakty",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/contacts",
    "destination": "/kontakty",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/about",
    "destination": "/pro-nas",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/about-us-uk",
    "destination": "/pro-nas",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/prices",
    "destination": "/prices",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/gallery-uk",
    "destination": "/nashi-roboty",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/himchystka-dyvana",
    "destination": "/himchystka-dyvana-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/himchystka-dyvana",
    "destination": "/himchystka-dyvana-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/himchystka-matratsa",
    "destination": "/himchystka-matratsa-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/himchystka-matratsa",
    "destination": "/himchystka-matratsa-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/prybyrannya-ofisiv",
    "destination": "/prybyrannya-ofisiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-ofisiv",
    "destination": "/prybyrannya-ofisiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-pislya-potopu",
    "destination": "/prybyrannya-pislya-potopu-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-prylegloyi-terytoriyi",
    "destination": "/prybyrannya-prylegloyi-terytoriyi-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/services/prybyrannya-budynkiv",
    "destination": "/prybyrannya-budynkiv-cherkasy",
    "reason": "Legacy Ukrainian locale URL migration"
  },
  {
    "source": "/uk/feed",
    "destination": "/blog",
    "reason": "Legacy feed replaced by canonical blog index"
  },
  {
    "source": "/uk/services/feed",
    "destination": "/poslugy",
    "reason": "Legacy services feed replaced by canonical services index"
  },
  {
    "source": "/uk/services/prybyrannya-torgovyh-czentriv",
    "destination": "/prybyrannya-mahazyniv-supermarketiv-cherkasy",
    "reason": "Legacy typo URL consolidated with retail cleaning"
  }
] as const;

const routeMap = new Map<string, UkLegacyRoute>();

for (const family of serviceFamilies) {
  for (const prefix of servicePrefixes) {
    for (const slug of family.slugs) {
      const source = `${prefix}/${slug}`;
      routeMap.set(source, {
        source,
        destination: family.destination,
        permanent: true,
        reason: family.reason,
        migrationDate
      });
    }
  }
}

for (const route of exactRoutes) {
  routeMap.set(route.source, {
    ...route,
    permanent: true,
    migrationDate
  });
}

export const ukLegacyRouteRegistry = [...routeMap.values()].sort((a, b) => a.source.localeCompare(b.source));

const ukLegacyRouteMap = new Map(ukLegacyRouteRegistry.map((route) => [route.source, route.destination]));
const servicesPaginationPattern = /^\/uk\/services\/page\/\d+$/;

export function normalizeLegacyPath(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "").toLowerCase();
}

export function getUkLegacyDestination(pathname: string) {
  const normalized = normalizeLegacyPath(pathname);
  if (servicesPaginationPattern.test(normalized)) return "/poslugy";
  return ukLegacyRouteMap.get(normalized);
}

export const ukLegacyRedirects = ukLegacyRouteRegistry.map(({ source, destination }) => ({
  source,
  destination,
  statusCode: 301 as const
}));

export const ukLegacyPatternRedirects = [
  {
    source: "/uk/services/page/:page(\\d+)",
    destination: "/poslugy",
    statusCode: 301 as const
  }
];
