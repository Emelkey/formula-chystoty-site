export type SeoIntentRole = "primary" | "hub" | "catalog" | "supporting" | "trust";

export type SeoIntentEntry = {
  path: string;
  role: SeoIntentRole;
  primaryQuery: string;
  secondaryQueries: string[];
  prohibitedPrimaryQueries: string[];
  supportingUrls: string[];
  relatedLandingPages: string[];
  title: string;
  h1: string;
};

const entry = (
  path: string,
  role: SeoIntentRole,
  primaryQuery: string,
  title: string,
  h1: string,
  secondaryQueries: string[] = [],
  prohibitedPrimaryQueries: string[] = [],
  supportingUrls: string[] = [],
  relatedLandingPages: string[] = []
): SeoIntentEntry => ({
  path,
  role,
  primaryQuery,
  secondaryQueries,
  prohibitedPrimaryQueries,
  supportingUrls,
  relatedLandingPages,
  title,
  h1
});

export const seoIntentRegistry: SeoIntentEntry[] = [
  entry(
    "/",
    "primary",
    "клінінг Черкаси",
    "Клінінг у Черкасах — ціни від 55 грн/м² | Формула Чистоти",
    "Професійний клінінг у Черкасах",
    ["клінінгова компанія Черкаси", "професійний клінінг Черкаси"],
    ["прибирання квартир Черкаси", "ціни на клінінг Черкаси"],
    [
      "/blog/yak-obraty-kliningovu-kompaniyu-u-cherkasakh",
      "/blog/oznaky-profesiynoyi-kliningovoyi-kompaniyi",
      "/blog/yaki-zasoby-vykorystovuyut-profesiyni-klinery",
      "/blog/klinerka-chy-kliningova-kompaniya"
    ],
    ["/prybyrannya-kvartyr-cherkasy", "/prybyrannya-pislya-remontu-cherkasy", "/himchystka-mebliv-cherkasy", "/myttya-vikon-cherkasy"]
  ),
  entry(
    "/prices",
    "primary",
    "ціни на клінінг Черкаси",
    "Ціни на клінінг у Черкасах 2026 — Формула Чистоти",
    "Ціни на клінінг у Черкасах 2026",
    ["вартість прибирання Черкаси", "прайс клінінгу"],
    ["прибирання квартир Черкаси"],
    ["/blog/skilky-koshtuye-klining-u-cherkasakh-2026"],
    ["/prybyrannya-kvartyr-cherkasy", "/generalne-prybyrannya-cherkasy", "/himchystka-mebliv-cherkasy"]
  ),
  entry(
    "/poslugy",
    "catalog",
    "клінінгові послуги Черкаси",
    "Клінінгові послуги у Черкасах | Формула Чистоти",
    "Клінінгові послуги у Черкасах",
    ["каталог послуг", "послуги Формули Чистоти"],
    ["клінінг Черкаси", "прибирання квартир Черкаси"],
    [],
    ["/prybyrannya-kvartyr-cherkasy", "/prybyrannya-komertsiynykh-prymishchen-cherkasy"]
  ),
  entry("/nashi-roboty", "trust", "роботи клінінгової компанії Черкаси", "Наші роботи з прибирання у Черкасах | Формула Чистоти", "Наші роботи з прибирання у Черкасах"),
  entry("/vidguky", "trust", "відгуки про Формулу Чистоти", "Відгуки клієнтів про Формула Чистоти | Черкаси", "Відгуки клієнтів про Формулу Чистоти"),
  entry("/blog", "supporting", "блог про прибирання", "Блог про прибирання, клінінг та чистоту | Формула Чистоти", "Блог про прибирання, клінінг та чистоту"),
  entry("/pro-nas", "trust", "про компанію Формула Чистоти", "Про компанію Формула Чистоти — клінінг у Черкасах", "Про компанію Формула Чистоти"),
  entry("/kontakty", "trust", "контакти Формула Чистоти", "Контакти клінінгової компанії Формула Чистоти у Черкасах", "Контакти клінінгової компанії Формула Чистоти у Черкасах"),

  entry("/prybyrannya-kvartyr-cherkasy", "hub", "прибирання квартир Черкаси", "Прибирання квартир у Черкасах — ціни від 55 грн/м² | Формула Чистоти", "Прибирання квартир у Черкасах", ["клінінг квартир Черкаси", "прибирання квартири Черкаси"], ["генеральне прибирання квартири Черкаси", "підтримуюче прибирання квартири Черкаси", "прибирання після ремонту Черкаси"], ["/blog/yak-pidgotuvaty-kvartyru-do-prybyrannya-cherkasy", "/blog/prybyrannya-kvartyr-cherkasy", "/blog/prybyrannya-kvartyry-pislya-orendariv", "/blog/yak-pidgotuvaty-kvartyru-do-prybyrannya", "/blog/yak-prybraty-kvartyru-pered-prodazhem-orendoyu"], ["/pidtrymuyuche-prybyrannya-kvartyr-cherkasy", "/generalne-prybyrannya-kvartyry-cherkasy", "/prybyrannya-pislya-remontu-cherkasy"]),
  entry("/generalne-prybyrannya-cherkasy", "primary", "генеральне прибирання приміщень Черкаси", "Генеральне прибирання приміщень у Черкасах | Формула Чистоти", "Генеральне прибирання приміщень у Черкасах", ["генеральний клінінг Черкаси"], ["генеральне прибирання квартири Черкаси", "генеральне прибирання кухні Черкаси"], ["/blog/generalne-ta-pidtrymuyuche-prybyrannya-riznytsya"], ["/generalne-prybyrannya-kvartyry-cherkasy", "/generalne-prybyrannya-kuhni-cherkasy"]),
  entry("/pidtrymuyuche-prybyrannya-kvartyr-cherkasy", "primary", "підтримуюче прибирання квартири Черкаси", "Підтримуюче прибирання квартири у Черкасах — від 55 грн/м² | Формула Чистоти", "Підтримуюче прибирання квартири у Черкасах", ["регулярне прибирання квартири"], ["генеральне прибирання квартири Черкаси"], ["/blog/generalne-ta-pidtrymuyuche-prybyrannya-riznytsya"], ["/prybyrannya-kvartyr-cherkasy", "/generalne-prybyrannya-kvartyry-cherkasy"]),
  entry("/generalne-prybyrannya-kvartyry-cherkasy", "primary", "генеральне прибирання квартири Черкаси", "Генеральне прибирання квартири у Черкасах — від 100 грн/м² | Формула Чистоти", "Генеральне прибирання квартири у Черкасах", ["генеральний клінінг квартири"], ["генеральне прибирання приміщень Черкаси", "підтримуюче прибирання квартири"], ["/blog/shcho-vkhodyt-u-generalne-prybyrannya-kvartyry", "/blog/generalne-ta-pidtrymuyuche-prybyrannya-riznytsya"], ["/prybyrannya-kvartyr-cherkasy", "/generalne-prybyrannya-kuhni-cherkasy"]),
  entry("/generalne-prybyrannya-kuhni-cherkasy", "primary", "генеральне прибирання кухні Черкаси", "Генеральне прибирання кухні у Черкасах — від 4000 грн | Формула Чистоти", "Генеральне прибирання кухні у Черкасах", ["глибоке очищення кухні"], ["генеральне прибирання квартири Черкаси"], [], ["/generalne-prybyrannya-kvartyry-cherkasy"]),
  entry("/prybyrannya-pislya-remontu-cherkasy", "primary", "прибирання після ремонту Черкаси", "Прибирання після ремонту у Черкасах — від 120 грн/м² | Формула Чистоти", "Прибирання після ремонту та будівництва у Черкасах", ["післябудівельне прибирання Черкаси", "клінінг після ремонту"], ["генеральне прибирання Черкаси"], ["/blog/skilky-koshtuye-prybyrannya-pislya-remontu-u-cherkasakh", "/blog/chomu-budivelnyi-pyl-nebezpechnyi-pislya-remontu", "/blog/top-pomylok-pry-prybyranni-pislya-remontu"], ["/myttya-vikon-cherkasy", "/prybyrannya-kvartyr-cherkasy"]),
  entry("/prybyrannya-pislya-potopu-cherkasy", "primary", "прибирання після потопу Черкаси", "Прибирання після потопу Черкаси — клінінг після затоплення | Формула Чистоти", "Прибирання після потопу у Черкасах", ["клінінг після затоплення"], ["прибирання після пожежі Черкаси"]),
  entry("/prybyrannya-pislya-pozhezhi-cherkasy", "primary", "прибирання після пожежі Черкаси", "Прибирання після пожежі у Черкасах | Формула Чистоти", "Прибирання після пожежі у Черкасах", ["очищення кіптяви Черкаси"], ["прибирання після потопу Черкаси"]),
  entry("/prybyrannya-prylegloyi-terytoriyi-cherkasy", "primary", "прибирання прилеглої території Черкаси", "Прибирання прилеглої території Черкаси | Формула Чистоти", "Прибирання прилеглої території у Черкасах", ["прибирання території"], ["прибирання після ремонту Черкаси"]),
  entry("/prybyrannya-budynkiv-cherkasy", "primary", "прибирання будинків Черкаси", "Прибирання будинків у Черкасах | Формула Чистоти", "Прибирання будинків у Черкасах", ["клінінг будинку Черкаси"], ["прибирання квартир Черкаси"], ["/blog/prybyrannya-budynku-pislya-remontu"]),

  entry("/himchystka-mebliv-cherkasy", "hub", "хімчистка м’яких меблів Черкаси", "Хімчистка м’яких меблів у Черкасах — дивани, матраци, крісла | Формула Чистоти", "Хімчистка м’яких меблів у Черкасах", ["хімчистка меблів Черкаси"], ["хімчистка дивана Черкаси", "хімчистка матраца Черкаси"], ["/blog/yak-chasto-potribno-robyty-himchystku-dyvana", "/blog/himchystka-matratsa-koly-potribna"], ["/himchystka-dyvana-cherkasy", "/himchystka-matratsa-cherkasy", "/himchystka-stiltsiv-cherkasy", "/himchystka-krisel-cherkasy"]),
  entry("/himchystka-dyvana-cherkasy", "primary", "хімчистка дивана Черкаси", "Хімчистка дивана у Черкасах — від 1300 грн | Формула Чистоти", "Хімчистка дивана у Черкасах", ["чистка дивана Черкаси"], ["хімчистка меблів Черкаси"], ["/blog/yak-chasto-potribno-robyty-himchystku-dyvana"], ["/himchystka-mebliv-cherkasy", "/himchystka-matratsa-cherkasy"]),
  entry("/himchystka-matratsa-cherkasy", "primary", "хімчистка матраца Черкаси", "Хімчистка матраца у Черкасах — односпальні та двоспальні | Формула Чистоти", "Хімчистка матраца у Черкасах", ["чистка матраца Черкаси"], ["хімчистка меблів Черкаси"], ["/blog/himchystka-matratsa-koly-potribna"], ["/himchystka-mebliv-cherkasy"]),
  entry("/himchystka-avto-cherkasy", "primary", "хімчистка авто Черкаси", "Хімчистка авто у Черкасах — салон, сидіння, запахи | Формула Чистоти", "Хімчистка авто у Черкасах", ["хімчистка салону авто Черкаси"], ["хімчистка меблів Черкаси"]),
  entry("/himchystka-kylymiv-cherkasy", "primary", "хімчистка килимів Черкаси", "Хімчистка килимів у Черкасах — килими та ковролін | Формула Чистоти", "Хімчистка килимів у Черкасах", ["чистка килимів Черкаси"], ["хімчистка ковроліну Черкаси"]),
  entry("/himchystka-stiltsiv-cherkasy", "primary", "хімчистка стільців Черкаси", "Хімчистка стільців у Черкасах — від 300 грн | Формула Чистоти", "Хімчистка стільців у Черкасах", ["чистка м’яких стільців"], ["хімчистка крісел Черкаси"]),
  entry("/himchystka-krisel-cherkasy", "primary", "хімчистка крісел Черкаси", "Хімчистка крісел у Черкасах — від 700 грн | Формула Чистоти", "Хімчистка крісел у Черкасах", ["чистка крісел Черкаси"], ["хімчистка стільців Черкаси"]),
  entry("/himchystka-kovrolinu-cherkasy", "primary", "хімчистка ковроліну Черкаси", "Хімчистка ковроліну у Черкасах — від 90 грн/м² | Формула Чистоти", "Хімчистка ковроліну у Черкасах", ["чистка ковроліну Черкаси"], ["хімчистка килимів Черкаси"]),

  entry("/myttya-vikon-cherkasy", "primary", "миття вікон Черкаси", "Миття вікон у Черкасах — від 160 грн/м² | Формула Чистоти", "Миття вікон у Черкасах", ["професійне миття вікон"], ["миття фасадів Черкаси"], ["/blog/myttya-vikon-pislya-remontu"]),
  entry("/myttya-fasadiv-cherkasy", "primary", "миття фасадів Черкаси", "Миття фасадів у Черкасах — від 70 грн/м² | Формула Чистоти", "Миття фасадів у Черкасах", ["очищення фасадів Черкаси"], ["миття вікон Черкаси"]),
  entry("/myttya-plytky-cherkasy", "primary", "миття тротуарної плитки Черкаси", "Миття тротуарної плитки у Черкасах — від 70 грн/м² | Формула Чистоти", "Миття тротуарної плитки у Черкасах", ["миття плитки високим тиском"], ["миття фасадів Черкаси"], ["/blog/yak-doglyadaty-za-plytkoyu-pislya-remontu"]),
  entry("/dezinfektsiya-prymishchen-cherkasy", "primary", "дезінфекція приміщень Черкаси", "Дезінфекція та прибирання після трупу у Черкасах | Формула Чистоти", "Дезінфекція та прибирання після трупу у Черкасах", ["прибирання після трупу Черкаси", "озонація Черкаси"], ["прибирання після потопу Черкаси"], ["/blog/ozonatsiya-chy-dezinfektsiya-prymishchennya"]),

  entry("/prybyrannya-komertsiynykh-prymishchen-cherkasy", "hub", "прибирання комерційних приміщень Черкаси", "Прибирання комерційних приміщень у Черкасах | Формула Чистоти", "Прибирання комерційних приміщень у Черкасах", ["клінінг для бізнесу Черкаси"], ["прибирання офісів Черкаси", "прибирання магазинів Черкаси"], [], ["/prybyrannya-ofisiv-cherkasy", "/rehulyarne-prybyrannya-biznesu-cherkasy", "/prybyrannya-mahazyniv-supermarketiv-cherkasy"]),
  entry("/prybyrannya-ofisiv-cherkasy", "primary", "прибирання офісів Черкаси", "Прибирання офісів у Черкасах | Формула Чистоти", "Прибирання офісів у Черкасах", ["клінінг офісів Черкаси"], ["клінінг для бізнесу Черкаси"], ["/blog/yak-prybyraty-ofis-shchodnya", "/blog/yak-pidgotuvaty-ofis-do-regulyarnogo-kliningu"]),
  entry("/rehulyarne-prybyrannya-biznesu-cherkasy", "primary", "регулярне прибирання бізнесу Черкаси", "Регулярне прибирання для бізнесу в Черкасах | Формула Чистоти", "Регулярне клінінгове обслуговування бізнесу", ["клінінгове обслуговування за графіком"], ["прибирання офісів Черкаси"], ["/blog/razove-chy-regulyarne-prybyrannya"]),
  entry("/prybyrannya-mahazyniv-supermarketiv-cherkasy", "primary", "прибирання магазинів і супермаркетів Черкаси", "Прибирання магазинів і супермаркетів у Черкасах | Формула Чистоти", "Клінінг магазинів, супермаркетів і торгових залів", ["прибирання торгових площ"], ["прибирання комерційних приміщень Черкаси"]),
  entry("/prybyrannya-restoraniv-kafe-cherkasy", "primary", "прибирання ресторанів і кафе Черкаси", "Прибирання ресторанів і кафе у Черкасах | Формула Чистоти", "Професійне прибирання ресторанів і кафе", ["клінінг закладів харчування"], ["прибирання комерційних приміщень Черкаси"]),
  entry("/prybyrannya-vyrobnychykh-prymishchen-cherkasy", "primary", "прибирання виробничих приміщень Черкаси", "Прибирання виробничих приміщень у Черкасах | Формула Чистоти", "Професійне прибирання виробничих приміщень", ["промисловий клінінг Черкаси"], ["прибирання складів Черкаси"]),
  entry("/prybyrannya-skladiv-cherkasy", "primary", "прибирання складів Черкаси", "Прибирання складів у Черкасах | Формула Чистоти", "Прибирання складських приміщень", ["клінінг складських приміщень"], ["прибирання виробничих приміщень Черкаси"]),
  entry("/prybyrannya-medychnykh-tsentriv-cherkasy", "primary", "прибирання медичних приміщень Черкаси", "Прибирання медичних центрів у Черкасах | Формула Чистоти", "Професійне прибирання медичних приміщень", ["клінінг медичних центрів"], ["дезінфекція приміщень Черкаси"])
];

export const seoIntentPaths = new Set(seoIntentRegistry.map((item) => item.path));
