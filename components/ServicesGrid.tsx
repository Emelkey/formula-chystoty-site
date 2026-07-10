import { servicePages } from "@/lib/site";
import { ServiceCard } from "@/components/ServiceCard";

const homeServices = [
  {
    slug: "generalne-prybyrannya-cherkasy",
    title: "Генеральне прибирання",
    shortDescription: "Глибоко прибираємо кухню, санвузол, кімнати, плінтуси, меблі та важкодоступні місця.",
    priceFrom: "від 100 грн/м²",
    image: "/images/services/premium-general-cleaning.webp",
    imageAlt: "Професійне генеральне прибирання у світлому інтер’єрі"
  },
  {
    slug: "prybyrannya-kvartyr-cherkasy",
    title: "Прибирання квартир",
    shortDescription: "Підтримуюче прибирання квартир у Черкасах з можливістю додати генеральний або післяремонтний формат.",
    priceFrom: "від 55 грн/м²",
    image: "/images/services/premium-apartment-cleaning.webp",
    imageAlt: "Світле прибирання квартири клінінговою компанією"
  },
  {
    slug: "prybyrannya-pislya-remontu-cherkasy",
    title: "Після ремонту та будівництва",
    shortDescription: "Видаляємо будівельний пил, бруд, наліт і сліди ремонту перед заселенням.",
    priceFrom: "від 100 грн/м²",
    image: "/images/services/premium-cleaning-equipment.webp",
    imageAlt: "Професійне обладнання для прибирання після ремонту та будівництва"
  },
  {
    slug: "himchystka-mebliv-cherkasy",
    title: "Хімчистка меблів",
    shortDescription: "Чистимо дивани, крісла, матраци, стільці та м’які меблі професійною хімією.",
    priceFrom: "стілець від 300 грн",
    image: "/images/services/sofa-cleaning-generated-optimized.jpg",
    imageAlt: "Професійна хімчистка м’яких меблів у світлому інтер’єрі"
  },
  {
    slug: "myttya-vikon-cherkasy",
    title: "Миття вікон",
    shortDescription: "Миємо скло, рами, підвіконня, балкони, вітрини та післяремонтні забруднення.",
    priceFrom: "від 160 грн/м²",
    image: "/images/services/premium-window-cleaning.webp",
    imageAlt: "Миття великих вікон у світлому інтер’єрі"
  },
  {
    slug: "prybyrannya-pislya-pozhezhi-cherkasy",
    title: "Прибирання після пожежі",
    shortDescription: "Прибираємо кіптяву, гар, запах і складні забруднення після пожежі.",
    priceFrom: "від 400 грн/м²",
    image: "/images/services/post-fire-cleaning-generated-optimized.jpg",
    imageAlt: "Професійне прибирання кухні після пожежі"
  },
  {
    slug: "prybyrannya-pislya-potopu-cherkasy",
    title: "Прибирання після потопу",
    shortDescription: "Збираємо воду, очищуємо поверхні та прибираємо наслідки затоплення.",
    priceFrom: "від 250 грн/м²",
    image: "/images/services/post-flood-cleaning-generated-optimized.jpg",
    imageAlt: "Прибирання після потопу у світлому інтер’єрі"
  }
];

export function ServicesGrid({ limit }: { limit?: number }) {
  const featuredServices = [
    ...homeServices,
    ...servicePages.filter((service) => !homeServices.some((featured) => featured.slug === service.slug))
  ];
  const services = limit ? featuredServices.slice(0, limit) : servicePages;

  return (
    <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard service={service} key={service.slug} />
      ))}
    </div>
  );
}
