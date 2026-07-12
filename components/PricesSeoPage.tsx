import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { absoluteUrl, contacts, siteUrl, type Faq } from "@/lib/site";

const advantages = ["працюємо зі своєю хімією", "приїжджаємо зі своїм інвентарем", "маємо професійну техніку", "працюємо по Черкасах і області", "робимо фото до/після", "контролюємо якість"];

type PriceThumb = { image: string; imageAlt: string; imagePosition: string; backgroundSize?: string };
type PriceRow = [string, string, PriceThumb?, string?];
type PriceGroup = { title: string; note?: string; rows: PriceRow[] };

const cleaningSprite = "/images/pricing/cleaning-service-price-items.jpg";
const extraSprite = "/images/pricing/extra-auto-price-items.jpg";
const furnitureSprite = "/images/pricing/furniture-cleaning-price-items.jpg";
const pos = ["0% 0%", "33.333% 0%", "66.666% 0%", "100% 0%", "0% 33.333%", "33.333% 33.333%", "66.666% 33.333%", "100% 33.333%", "0% 66.666%", "33.333% 66.666%", "66.666% 66.666%", "100% 66.666%", "0% 100%", "33.333% 100%", "66.666% 100%", "100% 100%"] as const;
const thumb = (image: string, imageAlt: string, imagePosition: string, backgroundSize = "400% 400%"): PriceThumb => ({ image, imageAlt, imagePosition, backgroundSize });
const apartmentCleaningUrl = absoluteUrl("/prybyrannya-kvartyr-cherkasy");
const apartmentMaintenanceUrl = absoluteUrl("/pidtrymuyuche-prybyrannya-kvartyr-cherkasy");
const apartmentGeneralUrl = absoluteUrl("/generalne-prybyrannya-kvartyry-cherkasy");
const apartmentRenovationUrl = absoluteUrl("/prybyrannya-pislya-remontu-cherkasy");
const furnitureCleaningUrl = absoluteUrl("/himchystka-mebliv-cherkasy");
const sofaCleaningUrl = absoluteUrl("/himchystka-dyvana-cherkasy");
const windowCleaningUrl = absoluteUrl("/myttya-vikon-cherkasy");

const serviceThumbs = {
  apartmentMaintenance: thumb(cleaningSprite, "Підтримуюче прибирання квартири у Черкасах", pos[0]),
  apartmentGeneral: thumb(cleaningSprite, "Генеральне прибирання квартири у Черкасах", pos[1]),
  apartmentRenovation: thumb(cleaningSprite, "Прибирання квартири після ремонту у Черкасах", pos[2]),
  window: thumb(cleaningSprite, "Миття вікон у Черкасах", pos[3]),
  houseMaintenance: thumb(cleaningSprite, "Підтримуюче прибирання будинку у Черкасах", pos[4]),
  houseGeneral: thumb(cleaningSprite, "Генеральне прибирання будинку у Черкасах", pos[5]),
  houseRenovation: thumb(cleaningSprite, "Прибирання будинку після ремонту у Черкасах", pos[6]),
  travel: thumb(cleaningSprite, "Виїзд клінінгової команди за місто", pos[7]),
  commercialSpace: thumb(cleaningSprite, "Прибирання комерційного приміщення у Черкасах", pos[8]),
  serviceSpace: thumb(cleaningSprite, "Регулярний клінінг сервісного простору у Черкасах", pos[9]),
  largeCommercialSpace: thumb(cleaningSprite, "Клінінг великої комерційної площі у Черкасах", pos[10]),
  businessObject: thumb(cleaningSprite, "Клінінг бізнес-об’єкта у Черкасах", pos[11]),
  industrial: thumb(cleaningSprite, "Прибирання виробничого приміщення у Черкасах", pos[12]),
  commercialRegular: thumb(cleaningSprite, "Регулярне комерційне прибирання у Черкасах", pos[13]),
  minimumVisit: thumb(cleaningSprite, "Мінімальний виїзд клінінгової команди", pos[14]),
  renovationDust: thumb(cleaningSprite, "Видалення будівельного пилу після ремонту", pos[15])
};

const extraThumbs = {
  carInterior: thumb(extraSprite, "Комплексна хімчистка салону авто у Черкасах", pos[0]),
  fabricSeats: thumb(extraSprite, "Хімчистка тканинних сидінь авто у Черкасах", pos[1]),
  leatherSeats: thumb(extraSprite, "Хімчистка шкіряних сидінь авто у Черкасах", pos[2]),
  odorRemoval: thumb(extraSprite, "Видалення запаху в авто", pos[3]),
  carCeiling: thumb(extraSprite, "Хімчистка стелі авто у Черкасах", pos[4]),
  carDisinfection: thumb(extraSprite, "Дезінфекція авто у Черкасах", pos[5]),
  oven: thumb(extraSprite, "Миття духовки у Черкасах", pos[6]),
  fridge: thumb(extraSprite, "Миття холодильника у Черкасах", pos[7]),
  kitchenCabinets: thumb(extraSprite, "Миття кухонних шаф всередині", pos[8]),
  shower: thumb(extraSprite, "Миття душової кабіни у Черкасах", pos[9]),
  balcony: thumb(extraSprite, "Прибирання балкона у Черкасах", pos[10]),
  difficultStains: thumb(extraSprite, "Видалення складних забруднень", pos[11]),
  fire: thumb(extraSprite, "Прибирання після пожежі у Черкасах", pos[12]),
  flood: thumb(extraSprite, "Прибирання після потопу у Черкасах", pos[13]),
  carpet: thumb(extraSprite, "Хімчистка ковроліну та килимів у Черкасах", pos[14]),
  blinds: thumb(extraSprite, "Миття жалюзі та штор у Черкасах", pos[15])
};

const furnitureThumbs = {
  cornerSofa: thumb(furnitureSprite, "Хімчистка кутового дивана у Черкасах", "0% 0%", "400% 200%"),
  sleeperSofa: thumb(furnitureSprite, "Хімчистка двоспального дивана у Черкасах", "33.333% 0%", "400% 200%"),
  twoSeatSofa: thumb(furnitureSprite, "Хімчистка двомісного дивана у Черкасах", "66.666% 0%", "400% 200%"),
  doubleMattress: thumb(furnitureSprite, "Хімчистка двоспального матраца у Черкасах", "100% 0%", "400% 200%"),
  oneHalfMattress: thumb(furnitureSprite, "Хімчистка матраца 1.5 у Черкасах", "0% 100%", "400% 200%"),
  childMattress: thumb(furnitureSprite, "Хімчистка дитячого матраца у Черкасах", "33.333% 100%", "400% 200%"),
  armchair: thumb(furnitureSprite, "Хімчистка крісла у Черкасах", "66.666% 100%", "400% 200%"),
  chair: thumb(furnitureSprite, "Хімчистка стільця у Черкасах", "100% 100%", "400% 200%")
};

const priceGroups: PriceGroup[] = [
  {
    title: "Прибирання квартир",
    note: "Точна вартість залежить від площі, стану приміщення, кількості забруднень, наявності меблів, складності робіт та додаткових послуг.",
    rows: [
      ["Підтримуюче прибирання квартири", "від 55 грн/м²", serviceThumbs.apartmentMaintenance, apartmentMaintenanceUrl],
      ["Генеральне прибирання квартири без шаф усередині", "100 грн/м²", serviceThumbs.apartmentGeneral, apartmentGeneralUrl],
      ["Генеральне прибирання квартири з шафами усередині", "120 грн/м²", serviceThumbs.apartmentGeneral, apartmentGeneralUrl],
      ["Прибирання після ремонту", "від 100 грн/м²", serviceThumbs.apartmentRenovation, apartmentRenovationUrl],
      ["Миття вікон", "від 160 грн/м²", serviceThumbs.window, windowCleaningUrl],
      ["Мінімальний виїзд", "від 3000 грн", serviceThumbs.minimumVisit]
    ]
  },
  {
    title: "Прибирання будинків",
    rows: [
      ["Підтримуюче прибирання будинку", "від 3000 грн", serviceThumbs.houseMaintenance],
      ["Генеральне прибирання будинку", "від 5000 грн", serviceThumbs.houseGeneral],
      ["Прибирання після ремонту", "від 6000 грн", serviceThumbs.houseRenovation],
      ["Миття вікон у будинку", "від 160 грн/м²", serviceThumbs.window],
      ["Виїзд за місто", "25 грн/км", serviceThumbs.travel]
    ]
  },
  {
    title: "Комерційні приміщення",
    note: "Для бізнесу ми розраховуємо вартість індивідуально, тому що важливі площа, графік прибирання, кількість санвузлів, тип підлоги, потік людей, складність забруднень і частота робіт.",
    rows: [
      ["Разове прибирання комерційного приміщення", "індивідуальний розрахунок", serviceThumbs.commercialSpace],
      ["Регулярне обслуговування комерційного приміщення", "індивідуальний розрахунок", serviceThumbs.commercialRegular],
      ["Клінінг сервісного простору", "за договором", serviceThumbs.serviceSpace],
      ["Клінінг великої комерційної площі", "за технічним завданням", serviceThumbs.largeCommercialSpace],
      ["Клінінг бізнес-об’єкта", "індивідуальний розрахунок", serviceThumbs.businessObject],
      ["Прибирання виробничого приміщення", "індивідуальний розрахунок", serviceThumbs.industrial]
    ]
  },
  {
    title: "Хімчистка меблів",
    rows: [
      ["Кутовий диван", "від 2500 грн, видалення запаху від 500 грн", furnitureThumbs.cornerSofa, sofaCleaningUrl],
      ["Двоспальний диван", "від 2000 грн, видалення запаху від 500 грн", furnitureThumbs.sleeperSofa, sofaCleaningUrl],
      ["Диван 2-х місний", "від 1300 грн, видалення запаху від 500 грн", furnitureThumbs.twoSeatSofa, sofaCleaningUrl],
      ["Матрац 2-х спальний", "від 2000 грн, видалення запаху від 500 грн", furnitureThumbs.doubleMattress],
      ["Матрац 1.5", "від 1500 грн, видалення запаху від 500 грн", furnitureThumbs.oneHalfMattress],
      ["Матрац дитячий", "від 1200 грн", furnitureThumbs.childMattress],
      ["Хімчистка крісла", "від 700 грн", furnitureThumbs.armchair],
      ["Хімчистка стільця", "від 300 грн", furnitureThumbs.chair],
      ["Хімчистка ковроліну", "від 90 грн/м²", extraThumbs.carpet]
    ]
  },
  {
    title: "Хімчистка авто",
    rows: [
      ["Комплексна хімчистка авто", "від 3800 грн", extraThumbs.carInterior],
      ["Хімчистка сидінь, тканина", "2300 грн", extraThumbs.fabricSeats],
      ["Хімчистка сидінь, шкіра", "2500 грн", extraThumbs.leatherSeats],
      ["Видалення запаху", "від 1500 грн", extraThumbs.odorRemoval],
      ["Хімчистка стелі", "від 1000 грн", extraThumbs.carCeiling],
      ["Дезінфекція авто", "від 3000 грн", extraThumbs.carDisinfection]
    ]
  },
  {
    title: "Додаткові роботи",
    rows: [
      ["Миття духовки", "від 500 грн", extraThumbs.oven],
      ["Миття холодильника", "від 900 грн", extraThumbs.fridge],
      ["Миття кухонних шаф всередині", "від 400 грн/пог. м", extraThumbs.kitchenCabinets],
      ["Миття душової кабіни", "від 800 грн", extraThumbs.shower],
      ["Прибирання балкона", "від 900 грн", extraThumbs.balcony],
      ["Складні забруднення", "індивідуальний розрахунок", extraThumbs.difficultStains],
      ["Прибирання після пожежі", "від 400 грн/м²", extraThumbs.fire],
      ["Прибирання після потопу", "від 250 грн/м²", extraThumbs.flood]
    ]
  }
];

const examples = [
  {
    title: "Генеральне прибирання квартири",
    object: "Квартира 2 кімнати, кухня, санвузол, коридор.",
    price: "Орієнтовна вартість: від 100 грн/м² без шаф усередині або 120 грн/м² з шафами усередині.",
    text: "У вартість входить прибирання кімнат, кухні, санвузла, миття поверхонь, видалення пилу, прибирання підлоги, базове очищення меблів зовні. Миття шаф усередині рахується за розширеним тарифом."
  },
  {
    title: "Прибирання після ремонту",
    object: "Квартира після ремонту з будівельним пилом, залишками фарби та забрудненими вікнами.",
    price: "Орієнтовна вартість: від 100 грн/м².",
    text: "Фінальна ціна залежить від площі, кількості пилу, складності забруднень і потреби у спеціальній хімії."
  },
  {
    title: "Хімчистка дивана",
    object: "Диван із плямами, запахом або слідами активного користування.",
    price: "Вартість розраховується індивідуально.",
    text: "На ціну впливають розмір дивана, тканина, тип плям, давність забруднень і складність роботи."
  },
  {
    title: "Комерційне прибирання",
    object: "Комерційне приміщення з робочими зонами, санвузлом, вхідною групою та регулярним потоком людей.",
    price: "Вартість залежить від технічного завдання.",
    text: "Для бізнесу враховуємо площу, графік, кількість прибирань на тиждень, тип підлоги та вимоги до чистоти."
  }
];

const priceExamples = [
  ["Прибирання 1-кімнатної квартири", "від 55 грн/м² для підтримуючого формату"],
  ["Прибирання 2-кімнатної квартири", "від 55 грн/м² для підтримуючого формату"],
  ["Генеральне прибирання квартири", "від 100 грн/м² без шаф усередині або 120 грн/м² з шафами"],
  ["Прибирання після ремонту", "від 100 грн/м²"],
  ["Генеральне прибирання кухні", "від 4000 грн"],
  ["Хімчистка дивана", "від 1300 грн для 2-х місного дивана"],
  ["Миття вікон", "від 160 грн/м²"],
  ["Прибирання комерційного приміщення", "індивідуальний розрахунок"]
];

const priceServiceLinks = [
  { href: apartmentCleaningUrl, label: "прибирання квартир у Черкасах" },
  { href: apartmentGeneralUrl, label: "генеральне прибирання квартири" },
  { href: apartmentRenovationUrl, label: "прибирання після ремонту" },
  { href: furnitureCleaningUrl, label: "хімчистка меблів" },
  { href: sofaCleaningUrl, label: "хімчистка дивана" },
  { href: windowCleaningUrl, label: "миття вікон" }
];

const meterPriceGroups: PriceGroup[] = [
  {
    title: "Прибирання після ремонту — грн/м²",
    rows: [
      ["Стандартне післяремонтне прибирання", "від 120 грн/м²", serviceThumbs.apartmentRenovation, apartmentRenovationUrl],
      ["Складний будівельний пил", "від 140 грн/м²", serviceThumbs.renovationDust, apartmentRenovationUrl],
      ["Плитка, санвузол, кухня після ремонту", "індивідуально", extraThumbs.difficultStains],
      ["Мінімальна вартість виїзду", "3000 грн", serviceThumbs.minimumVisit]
    ]
  },
  {
    title: "Генеральне прибирання — грн/м²",
    rows: [
      ["Без миття шаф усередині", "100 грн/м²", serviceThumbs.apartmentGeneral, apartmentGeneralUrl],
      ["З миттям шаф усередині", "120 грн/м²", extraThumbs.kitchenCabinets, apartmentGeneralUrl],
      ["Після будівництва або складних забруднень", "120 грн/м²", serviceThumbs.renovationDust],
      ["Окремий санвузол або кухня", "від 3000 грн", extraThumbs.shower]
    ]
  },
  {
    title: "Підтримуюче прибирання — грн/м²",
    rows: [
      ["Квартира або будинок у нормальному стані", "від 55 грн/м²", serviceThumbs.apartmentMaintenance, apartmentMaintenanceUrl],
      ["Регулярне прибирання за графіком", "індивідуально", serviceThumbs.commercialRegular],
      ["Після орендарів або активного користування", "від 70 грн/м²", serviceThumbs.houseMaintenance],
      ["Мінімальна вартість виїзду", "3000 грн", serviceThumbs.minimumVisit]
    ]
  },
  {
    title: "Миття вікон — грн/м²",
    rows: [
      ["Сезонне миття скла, рам і підвіконь", "від 160 грн/м²", serviceThumbs.window],
      ["Післяремонтне миття вікон", "від 180 грн/м²", serviceThumbs.window],
      ["Зняття застарілої монтажної плівки", "від 300 грн/м²", extraThumbs.difficultStains],
      ["Мінімальна вартість виїзду", "3000 грн", serviceThumbs.minimumVisit]
    ]
  },
  {
    title: "Хімчистка ковроліну — грн/м²",
    rows: [
      ["Ковролін у квартирі або комерційному приміщенні", "від 90 грн/м²", extraThumbs.carpet],
      ["Килим", "від 100 грн/м²", extraThumbs.carpet],
      ["Сильні плями або запахи", "індивідуально", extraThumbs.difficultStains],
      ["Мінімальна вартість виїзду", "3000 грн", serviceThumbs.minimumVisit]
    ]
  },
  {
    title: "Комерційні приміщення — приклади розрахунку",
    rows: [
      ["Комерційне приміщення 80–120 м², разове прибирання", "індивідуально", serviceThumbs.commercialSpace],
      ["Сервісний простір з регулярним графіком", "за договором", serviceThumbs.serviceSpace],
      ["Велика комерційна площа з потоком людей", "за технічним завданням", serviceThumbs.largeCommercialSpace],
      ["Виробниче або складське приміщення", "після огляду або фото", serviceThumbs.industrial]
    ]
  }
];

const valueItems = ["професійна команда", "власна хімія та інвентар", "професійна техніка", "досвід у складних об’єктах", "фото до/після", "контроль якості", "відповідальність за результат", "робота з квартирами, будинками та комерційними приміщеннями"];
const companyComparison = ["працює команда, а не випадкова людина", "є професійна хімія під різні поверхні", "є техніка для підлоги, меблів, ковроліну та складних забруднень", "є контроль якості після виконання робіт", "є відповідальність за результат і комунікація до старту", "є досвід складних прибирань після ремонту, пожежі, потопу та сильних забруднень", "можна працювати з бізнесом на постійній основі за регламентом"];

const priceFaq: Faq[] = [
  { question: "Скільки коштує клінінг у Черкасах?", answer: "Вартість залежить від типу прибирання, площі, стану приміщення та складності робіт. Орієнтовні ціни вказані на сайті, а точну суму менеджер підкаже після уточнення деталей." },
  { question: "Чому ціна може змінюватися?", answer: "Ціна залежить від забруднення, кількості меблів, складності доступу, потреби у спеціальній хімії, техніці та кількості клінерів." },
  { question: "Чи можна дізнатися ціну по фото?", answer: "Так. Ви можете надіслати фото або відео приміщення, і ми підкажемо орієнтовну вартість прибирання." },
  { question: "Що входить у вартість?", answer: "У вартість входить робота клінерів, професійна хімія, інвентар та обладнання, якщо інше не погоджено окремо." },
  { question: "Чи є мінімальна вартість виїзду?", answer: "Так, мінімальна вартість виїзду по місту — від 3000 грн. Для виїзду за межі Черкас дорога розраховується окремо." },
  { question: "Як замовити точний розрахунок?", answer: "Залиште заявку на сайті або зателефонуйте. Менеджер уточнить деталі та підкаже ціну." },
  { question: "Чи можна замовити тільки миття вікон або хімчистку дивана?", answer: "Так, можна замовити окрему послугу: миття вікон, хімчистку дивана, хімчистку матраца, очищення санвузла, кухні або інші додаткові роботи." },
  { question: "Чи працюєте ви з комерційними приміщеннями?", answer: "Так, ми прибираємо комерційні, сервісні, виробничі та інші бізнес-приміщення. Вартість для бізнесу розраховується індивідуально після уточнення площі, графіка та регламенту." }
];

function PriceThumbnail({ thumbnail }: { thumbnail?: PriceThumb }) {
  if (!thumbnail) return null;

  return (
    <span
      aria-label={thumbnail.imageAlt}
      className="h-16 w-20 shrink-0 rounded-lg border border-brand-green/10 bg-white bg-no-repeat shadow-soft"
      role="img"
      style={{
        backgroundImage: `url(${thumbnail.image})`,
        backgroundPosition: thumbnail.imagePosition,
        backgroundSize: thumbnail.backgroundSize ?? "cover"
      }}
    />
  );
}

export function PricesSeoPage({
  canonicalPath = "/prices",
  heading = "Ціни на клінінг у Черкасах 2026",
  schemaName = "Ціни на клінінг у Черкасах 2026"
}: {
  canonicalPath?: string;
  heading?: string;
  schemaName?: string;
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: "Ціни", href: canonicalPath }]} />
      <section className="bg-white py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-hover">Прайс 2026</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{heading}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-graphite">
              На цій сторінці зібрані орієнтовні ціни на прибирання квартир, будинків, комерційних приміщень, хімчистку меблів, миття вікон і прибирання після ремонту у Черкасах. Фінальна сума залежить від площі, стану приміщення та переліку робіт. Ми пояснюємо ціну до старту, працюємо зі своєю хімією та контролюємо якість результату.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton>Розрахувати вартість</PrimaryButton>
              <a className="inline-flex min-h-12 items-center justify-center rounded-md border border-brand-green/25 bg-white px-5 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:border-brand-green focus-visible:focus-ring" href={contacts.phoneHref}>
                Зателефонувати
              </a>
              <ContactButtons compact />
            </div>
          </div>
          <div className="grid gap-3 rounded-[24px] border border-brand-green/15 bg-brand-mist p-5 shadow-soft sm:grid-cols-2">
            {advantages.map((item) => (
              <div className="flex gap-2 rounded-2xl bg-white p-4 text-sm font-semibold text-brand-graphite" key={item}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-green" size={18} aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-mist">
        <div className="container grid gap-6">
          {priceGroups.map((group) => (
            <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft" key={group.title}>
              <div className="border-b border-black/5 px-5 py-4 md:px-6">
                <h2 className="text-2xl font-bold">{group.title}</h2>
              </div>
              <div className="divide-y divide-black/5">
                {group.rows.map(([service, price, thumbnail, href]) => (
                  <div className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-6" key={`${group.title}-${service}`}>
                    <span className="flex min-w-0 items-center gap-3 text-brand-graphite">
                      <PriceThumbnail thumbnail={thumbnail} />
                      {href ? (
                        <a className="font-semibold text-brand-hover underline decoration-brand-green/30 underline-offset-4 transition hover:decoration-brand-green" href={href}>
                          {service}
                        </a>
                      ) : (
                        <span>{service}</span>
                      )}
                    </span>
                    <strong className="text-brand-hover">{price}</strong>
                  </div>
                ))}
              </div>
              {group.note ? (
                <div className="border-t border-black/5 bg-brand-mist/60 px-5 py-4 text-sm leading-6 text-brand-graphite md:px-6">
                  <p>{group.note}</p>
                  {group.title === "Прибирання квартир" ? (
                    <a className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-hover focus-visible:focus-ring" href={apartmentCleaningUrl}>
                      Детальніше про прибирання квартир
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-hover">Орієнтири</p>
            <h2 className="text-3xl font-bold">Приклади вартості прибирання</h2>
            <p className="mt-4 leading-7 text-brand-graphite">
              Остаточна ціна залежить від площі, стану приміщення, кількості меблів, складності забруднень, терміновості, доступу до води та необхідного обладнання. Для точного розрахунку можна надіслати фото або відео приміщення.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {priceExamples.map(([service, price]) => (
              <article className="rounded-2xl border border-brand-green/15 bg-white p-5 shadow-soft" key={service}>
                <h3 className="text-base font-bold text-brand-black">{service}</h3>
                <p className="mt-3 text-lg font-bold text-brand-hover">{price}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[24px] border border-brand-green/15 bg-brand-mist p-5 shadow-soft">
            <h3 className="text-xl font-bold text-brand-black">Перейти до послуг</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {priceServiceLinks.map((link) => (
                <a className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-brand-hover shadow-soft transition hover:text-brand-black" href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold">Тарифи у форматі грн/м²</h2>
          <p className="mt-4 max-w-3xl leading-7 text-brand-graphite">Ці ставки допомагають швидко зорієнтуватися у бюджеті. Для точного розрахунку ми враховуємо не тільки площу, а й стан об’єкта, доступ, кількість санвузлів, кухню, вікна, меблі, тип підлоги та складність забруднень.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {meterPriceGroups.map((group) => (
              <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft" key={group.title}>
                <div className="border-b border-black/5 bg-brand-mist px-5 py-4">
                  <h3 className="text-xl font-bold">{group.title}</h3>
                </div>
                <div className="divide-y divide-black/5">
                  {group.rows.map(([service, price, thumbnail, href]) => (
                    <div className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center" key={`${group.title}-${service}`}>
                      <span className="flex min-w-0 items-center gap-3 text-brand-graphite">
                        <PriceThumbnail thumbnail={thumbnail} />
                        {href ? (
                          <a className="font-semibold text-brand-hover underline decoration-brand-green/30 underline-offset-4 transition hover:decoration-brand-green" href={href}>
                            {service}
                          </a>
                        ) : (
                          <span>{service}</span>
                        )}
                      </span>
                      <strong className="text-brand-hover">{price}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold">Приклади розрахунку вартості</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {examples.map((example) => (
              <article className="rounded-2xl border border-black/5 bg-white p-6 shadow-soft" key={example.title}>
                <h3 className="text-xl font-bold">{example.title}</h3>
                <p className="mt-4 font-semibold text-brand-graphite">{example.object}</p>
                <p className="mt-3 font-bold text-brand-hover">{example.price}</p>
                <p className="mt-3 text-sm leading-6 text-brand-graphite">{example.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-mist">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-hover">Цінність</p>
            <h2 className="text-3xl font-bold">Чому у нас не найдешевше, але вигідно</h2>
            <div className="mt-5 grid gap-4 leading-7 text-brand-graphite">
              <p>Ми не працюємо як випадкові приватні клінери без відповідальності. Формула Чистоти — це команда, професійна хімія, інвентар, техніка, досвід і контроль якості.</p>
              <p>У вартість входить не тільки саме прибирання, а й підготовка, виїзд команди, підбір хімії, професійний інвентар, робота з важкими забрудненнями та перевірка результату.</p>
              <p>Клієнт платить не просто за години роботи, а за чистий результат, безпечний підхід до поверхонь і спокій, що об’єкт буде прибраний якісно.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {valueItems.map((item) => (
              <div className="rounded-2xl bg-white p-4 text-sm font-semibold text-brand-graphite shadow-soft" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-8 rounded-[28px] border border-brand-green/15 bg-white p-6 shadow-soft md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-brand-mist px-4 py-2 text-sm font-semibold text-brand-hover">Порівняння</p>
            <h2 className="text-3xl font-bold">Чому професійна клінінгова компанія дорожча за приватного клінера</h2>
            <p className="mt-5 leading-7 text-brand-graphite">Професійний клінінг коштує дорожче, бо клієнт платить не лише за години роботи. У вартість входить організація процесу, правильна хімія, обладнання, команда, контроль якості та відповідальність за результат.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {companyComparison.map((item) => (
              <div className="flex gap-3 rounded-2xl bg-brand-mist p-4 text-sm font-semibold text-brand-graphite" key={item}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-green" size={18} aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faq={priceFaq} />

      <section className="section bg-white">
        <div className="container grid gap-8 rounded-[28px] bg-brand-mist p-6 md:p-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="min-w-0">
            <h2 className="text-3xl font-bold">Потрібен точний розрахунок?</h2>
            <p className="mt-4 leading-7 text-brand-graphite">Залиште заявку, і ми порахуємо вартість під ваш об’єкт у Черкасах: площу, стан, тип прибирання та додаткові роботи.</p>
            <div className="mt-6">
              <ContactButtons />
            </div>
          </div>
          <ContactForm compact submitLabel="Отримати розрахунок" />
        </div>
      </section>

      <SeoJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: priceFaq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer }
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: schemaName,
            provider: { "@type": "LocalBusiness", name: contacts.companyName, telephone: contacts.phoneE164, areaServed: "Черкаси" },
            areaServed: "Черкаси",
            url: `${siteUrl}${canonicalPath}`
          }
        ]}
      />
    </>
  );
}
