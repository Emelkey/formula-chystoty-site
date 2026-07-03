import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { contacts, siteUrl, type Faq } from "@/lib/site";

const advantages = ["працюємо зі своєю хімією", "приїжджаємо зі своїм інвентарем", "маємо професійну техніку", "працюємо по Черкасах і області", "робимо фото до/після", "контролюємо якість"];

const priceGroups = [
  {
    title: "Прибирання квартир",
    note: "Точна вартість залежить від площі, стану приміщення, кількості забруднень, наявності меблів, складності робіт та додаткових послуг.",
    rows: [
      ["Підтримуюче прибирання квартири", "від 2200 грн"],
      ["Генеральне прибирання квартири", "від 4000 грн"],
      ["Прибирання після ремонту", "від 4800 грн"],
      ["Миття вікон", "від 160 грн/м²"],
      ["Мінімальний виїзд", "від 3000 грн"]
    ]
  },
  {
    title: "Прибирання будинків",
    rows: [
      ["Підтримуюче прибирання будинку", "від 3000 грн"],
      ["Генеральне прибирання будинку", "від 5000 грн"],
      ["Прибирання після ремонту", "від 6000 грн"],
      ["Миття вікон у будинку", "від 160 грн/м²"],
      ["Виїзд за місто", "25 грн/км"]
    ]
  },
  {
    title: "Офіси, магазини, комерційні приміщення",
    note: "Для бізнесу ми розраховуємо вартість індивідуально, тому що важливі площа, графік прибирання, кількість санвузлів, тип підлоги, потік людей, складність забруднень і частота робіт.",
    rows: [
      ["Разове прибирання офісу", "індивідуальний розрахунок"],
      ["Регулярне прибирання офісу", "індивідуальний розрахунок"],
      ["Прибирання магазину", "індивідуальний розрахунок"],
      ["Прибирання супермаркету", "індивідуальний розрахунок"],
      ["Прибирання ТРЦ", "індивідуальний розрахунок"],
      ["Прибирання виробничого приміщення", "індивідуальний розрахунок"]
    ]
  },
  {
    title: "Хімчистка меблів",
    rows: [
      ["Хімчистка дивана", "від 2000 грн"],
      ["Хімчистка кутового дивана", "від 2500 грн"],
      ["Хімчистка матраца", "від 1500 грн"],
      ["Хімчистка крісла", "від 400 грн"],
      ["Хімчистка стільця", "від 200 грн"],
      ["Хімчистка ковроліну", "від 90 грн/м²"]
    ]
  },
  {
    title: "Додаткові роботи",
    rows: [
      ["Миття духовки", "від 500 грн"],
      ["Миття холодильника", "від 900 грн"],
      ["Миття кухонних шаф всередині", "від 400 грн/пог. м"],
      ["Миття душової кабіни", "від 800 грн"],
      ["Прибирання балкона", "від 900 грн"],
      ["Складні забруднення", "індивідуальний розрахунок"],
      ["Прибирання після пожежі", "індивідуальний розрахунок"],
      ["Прибирання після потопу", "індивідуальний розрахунок"]
    ]
  }
];

const examples = [
  {
    title: "Генеральне прибирання квартири",
    object: "Квартира 2 кімнати, кухня, санвузол, коридор.",
    price: "Орієнтовна вартість: від 4000 грн.",
    text: "У вартість входить прибирання кімнат, кухні, санвузла, миття поверхонь, видалення пилу, прибирання підлоги, базове очищення меблів зовні."
  },
  {
    title: "Прибирання після ремонту",
    object: "Квартира після ремонту з будівельним пилом, залишками фарби та забрудненими вікнами.",
    price: "Орієнтовна вартість: від 4800 грн.",
    text: "Фінальна ціна залежить від площі, кількості пилу, складності забруднень і потреби у спеціальній хімії."
  },
  {
    title: "Хімчистка дивана",
    object: "Диван із плямами, запахом або слідами активного користування.",
    price: "Вартість розраховується індивідуально.",
    text: "На ціну впливають розмір дивана, тканина, тип плям, давність забруднень і складність роботи."
  },
  {
    title: "Офісне прибирання",
    object: "Офіс із робочими місцями, санвузлом, кухонною зоною та регулярним потоком людей.",
    price: "Вартість залежить від технічного завдання.",
    text: "Для бізнесу враховуємо площу, графік, кількість прибирань на тиждень, тип підлоги та вимоги до чистоти."
  }
];

const valueItems = ["професійна команда", "власна хімія та інвентар", "професійна техніка", "досвід у складних об’єктах", "фото до/після", "контроль якості", "відповідальність за результат", "робота з квартирами, будинками, офісами, магазинами та супермаркетами"];

const priceFaq: Faq[] = [
  { question: "Скільки коштує прибирання квартири у Черкасах?", answer: "Вартість залежить від площі, стану квартири, типу прибирання та додаткових робіт. Підтримуюче прибирання стартує від 2200 грн, генеральне — від 4000 грн, після ремонту — від 4800 грн." },
  { question: "Чому точна ціна розраховується індивідуально?", answer: "Тому що дві квартири однакової площі можуть мати різний стан. На ціну впливає кількість забруднень, будівельний пил, меблі, санвузли, кухня, вікна, плями та складність робіт." },
  { question: "Чи приїжджаєте ви зі своєю хімією та інвентарем?", answer: "Так, команда Формули Чистоти приїжджає зі своєю професійною хімією, інвентарем і технікою." },
  { question: "Чи можна замовити тільки миття вікон або хімчистку дивана?", answer: "Так, можна замовити окрему послугу: миття вікон, хімчистку дивана, хімчистку матраца, очищення санвузла, кухні або інші додаткові роботи." },
  { question: "Який мінімальний виїзд?", answer: "Мінімальний виїзд по місту — від 3000 грн. Виїзд за місто розраховується окремо — 25 грн/км." },
  { question: "Чи працюєте ви з офісами, магазинами та супермаркетами?", answer: "Так, ми прибираємо офіси, магазини, супермаркети, ТРЦ, виробничі та комерційні приміщення. Вартість для бізнесу розраховується індивідуально." },
  { question: "Чи можна замовити прибирання після пожежі або потопу?", answer: "Так, ми виконуємо складні прибирання після пожежі, потопу, ремонту та сильних забруднень. Такі роботи розраховуються індивідуально після уточнення деталей." }
];

export function PricesSeoPage({
  canonicalPath = "/tsiny",
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
              На цій сторінці зібрані орієнтовні ціни на прибирання квартир, будинків, офісів, магазинів, хімчистку меблів, миття вікон і прибирання після ремонту у Черкасах. Фінальна сума залежить від площі, стану приміщення та переліку робіт. Ми пояснюємо ціну до старту, працюємо зі своєю хімією та контролюємо якість результату.
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
                {group.rows.map(([service, price]) => (
                  <div className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto] md:px-6" key={`${group.title}-${service}`}>
                    <span className="text-brand-graphite">{service}</span>
                    <strong className="text-brand-hover">{price}</strong>
                  </div>
                ))}
              </div>
              {group.note ? <p className="border-t border-black/5 bg-brand-mist/60 px-5 py-4 text-sm leading-6 text-brand-graphite md:px-6">{group.note}</p> : null}
            </article>
          ))}
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
