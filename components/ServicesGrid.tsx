import { servicePages } from "@/lib/site";
import { ServiceCard } from "@/components/ServiceCard";

const homeServices = [
  {
    slug: "prybyrannya-kvartyr-cherkasy",
    title: "Прибирання квартир",
    shortDescription: "Генеральне, підтримуюче та разове прибирання квартир",
    image: "/images/services/premium-apartment-cleaning.webp",
    imageAlt: "Світле прибирання квартири клінінговою компанією"
  },
  {
    slug: "generalne-prybyrannya-cherkasy",
    title: "Генеральне прибирання",
    shortDescription: "Повне очищення всіх приміщень від бруду та складних забруднень",
    image: "/images/services/general-cleaning-radiator.jpg",
    imageAlt: "Генеральне прибирання важкодоступних місць"
  },
  {
    slug: "prybyrannya-pislya-remontu-cherkasy",
    title: "Прибирання після ремонту",
    shortDescription: "Видаляємо будівельний пил, бруд та плями після ремонтних робіт",
    image: "/images/services/premium-cleaning-equipment.webp",
    imageAlt: "Професійне обладнання для прибирання після ремонту"
  },
  {
    slug: "himchystka-avto-cherkasy",
    title: "Хімчистка авто",
    shortDescription: "Чистка салону, сидінь, текстилю, килимків та багажника",
    image: "/images/services/car-interior-cleaning-generated.png",
    imageAlt: "Хімчистка салону автомобіля"
  },
  {
    slug: "prybyrannya-ofisiv-cherkasy",
    title: "Прибирання офісів",
    shortDescription: "Регулярне та разове прибирання офісних приміщень",
    image: "/images/services/premium-office-cleaning.webp",
    imageAlt: "Професійне прибирання офісного простору"
  },
  {
    slug: "himchystka-mebliv-cherkasy",
    title: "Хімчистка меблів",
    shortDescription: "Чистка диванів, крісел, матраців, стільців та м’яких меблів",
    image: "/images/services/sofa-cleaning-generated.png",
    imageAlt: "Хімчистка дивана екстрактором"
  },
  {
    slug: "myttya-vikon-cherkasy",
    title: "Миття вікон",
    shortDescription: "Миття вікон, балконів, вітрин та скляних конструкцій",
    image: "/images/services/premium-window-cleaning.webp",
    imageAlt: "Миття великих вікон у світлому інтер’єрі"
  },
  {
    slug: "prybyrannya-komertsiynykh-prymishchen-cherkasy",
    title: "Прибирання комерції",
    shortDescription: "Супермаркети, магазини, кафе та інші комерційні об’єкти",
    image: "/images/services/commercial-premises-cleaning-generated.png",
    imageAlt: "Прибирання комерційного приміщення"
  }
];

export function ServicesGrid({ limit }: { limit?: number }) {
  const services = limit === 8 ? homeServices : limit ? servicePages.slice(0, limit) : servicePages;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard service={service} key={service.slug} />
      ))}
    </div>
  );
}
