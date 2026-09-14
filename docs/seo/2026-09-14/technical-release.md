# MASTER SEO — технічне закриття прогалин, 2026-09-14

## Обсяг релізу

Користувач доручив виконати MASTER SEO ТЗ і окремо дозволив «в кінці пуш деплой». Цей реліз закриває технічні прогалини, які не залежать від 28–42-денного SEO-вікна. Він не оголошує виконаними всі критерії 90-денного ТЗ.

- **P1-03/09:** невідомий schema.org тип `CleaningService` замінено на `LocalBusiness`; Organization, business і WebSite мають стабільні `@id`; Service.provider посилається на спільний бізнес. Неприпустимий `Service.priceRange` замінено на Offer з видимим ціновим описом без вигаданих фіксованих цін. Видалено SearchAction, який обіцяв URL-пошук, не реалізований у BlogGrid. FAQ каталогу тепер відповідає видимим запитанням.
- **P1-10:** зарезервовано висоту основної області під час Next streaming, щоб footer не зсувався з першого екрана; зелені кольори CTA/тексту затемнено для контрасту; рейтингові зірки отримали коректну роль. Три pricing sprites перекодовано у WebP зі збереженням геометрії й оригінальних JPG: 660323 → 294610 bytes, економія 365713 bytes (55.4%).
- **P1-02:** інтегровано серверні CaseCard/CaseStudy, перевірку походження/дозволу матеріалів і Sanity-поля для редактора. Один уже опублікований об’єкт 100 м² перенесено у структурований доказовий блок. Немає нових дат, клієнтів, складу команди, тривалості чи фіктивних кейсів. Це один evidence excerpt, не ≥3 повні кейси на кожній сторінці.
- **P1-05/06:** окремі перевірені prospect/citation registers і шаблони звернень лежать у цій папці. Створення профілів, виправлення сторонніх карток, листування й платежі не виконані й не рахуються отриманими посиланнями.

Approved Title/Description/H1/hero/основний текст післяремонтної сторінки, canonical URLs, sitemap та SEO intent map не змінювалися. Нових URL немає.

## Виявлення й перевірка

Baseline production `c8167e9`: Lighthouse 20/20 (10 P0 × mobile/desktop), без runtime errors. Mobile Performance74–76, desktop76–77; CLS0.722/0.749 на всіх URL, footer shift. Accessibility93–97. Best Practices і SEO100.

Локальна повторна перевірка `/` та `/prices`: Performance98/96, Accessibility/Best Practices/SEO100; CLS0 обидві; contrast та aria-prohibited-attr без порушень. Це лабораторні результати, не польові CWV. PSI API повернув429 RESOURCE_EXHAUSTED (quota0); польові дані невідомі.

Локальні перевірки перед release: production build71/71, TypeScript, ESLint, SEO29/29, legacy HTTP4/4; новий `test:seo:schema:http` перевіряє фактичний server HTML десяти P0 з урахуванням Next streaming, provider references та відповідність breadcrumbs/FAQ. Це вузький regression contract, не заміна зовнішнього schema validator.

Мобільний390×844 і desktop1280×900 новий блок кейсу: один H1, без горизонтального переповнення, обидві фотографії завантажуються. Порожня форма заблокована required-валідацією; реальна заявка в Telegram не надсилалася.

Після push потрібно зафіксувати exact SHA, Vercel Ready/success, production sitemap62/62, зовнішній schema validator і повторні20 Lighthouse у підсумковому журналі. Документ написано до production release, тому не є його receipt. Сирі Lighthouse JSON/HTML збережені в локальному `outputs/performance*`; великі screenshot/base64 звіти не додаються до Git.

## Межі приймання та залежності

- ≥3 повні кейси на кожній P0: потрібні записи реальних робіт і дозволи. Дата, команда й тривалість першого об’єкта невідомі; інші фото не перетворюються на вигадані окремі об’єкти.
- GBP, NAP≥95%, нові відгуки/посилання: потрібні owner actions та receipts. Top20 уже показує актуальну адресу; це не наша зміна. Misto/MultiShop не виправлені цим релізом.
- HTTP non-www → HTTPS non-www → HTTPS www лишається двокроковим platform exception, а не PASS вимоги одного hop. [Vercel документує примусовий HTTPS308 до інших правил](https://vercel.com/docs/cdn-security/encryption). Зміна зовнішнього CDN/DNS є окремим інфраструктурним рішенням; захист HTTPS не вимикався.
- Backlink export відсутній: merge/noindex статей не виконано. D14≥2026-09-24; D28≥2026-10-08; D42≥2026-10-22; D90≥2026-12-09 за settled GSC dates від Wave A. Цей технічний реліз має окрему annotation і не обнуляє baseline Wave A.
- URL Inspection PASS до релізу не є новим recrawl після релізу. Request indexing потребує Search Console UI; API inspection лише читає стан. Не застосовувати Google Indexing API для цих сторінок.

Тип [LocalBusiness](https://schema.org/LocalBusiness) та правила [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) використано для виправлення business entity. Self-serving aggregateRating/review не додавалися.
