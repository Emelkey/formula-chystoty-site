# Master SEO audit: Формула Чистоти

Дата аудиту: 2026-08-12  
Проєкт: `https://www.formula-chistoty.ck.ua`  
Режим: локальна інвентаризація production build, routes, sitemap, redirects, middleware, metadata, schema, внутрішніх посилань і медіа.

> Прикріплене ТЗ фізично закінчується посеред розділу 45 на слові `Кож`. Виконано всі повністю доступні вимоги 1–44 та доступна частина перевірки canonical. Відсутній текст не домислювався.

## 1. Підсумок

| Перевірка | Результат |
| --- | ---: |
| Канонічні indexable URL | 61 |
| Основні сторінки | 8 |
| Service landing pages | 30 |
| Blog articles | 23 |
| Биті внутрішні посилання | 0 |
| Відсутні локальні зображення | 0 |
| Дублікати Title | 0 |
| Дублікати H1 | 0 |
| Сторінки не з одним H1 | 0 |
| Неправильні canonical | 0 |
| Noindex серед canonical URL | 0 |
| Точні legacy redirects у карті | 112 |
| Redirect destinations поза canonical inventory | 0 |

Повні артефакти:

- `master-url-inventory-2026-08-12.csv` — URL, intent, HTTP, indexability, canonical, sitemap, H1, входи та legacy.
- `master-keyword-map-2026-08-12.csv` — один primary URL на значимий intent.
- `keyword-cannibalization-map-2026-08-12.csv` — конфлікти, пріоритет і рішення.
- `content-similarity-2026-08-12.csv` — усі 435 пар service pages.
- `legacy-redirect-map-2026-08-12.csv` — карта 301.
- `technical-audit-summary-2026-08-12.json` — машинозчитуваний технічний результат.
- `off-site-plan-2026-08-12.md` — ручний план локального авторитету.

## 2. Що змінено

1. На головній прибрано повторний SEO-каталог після блоку переваг. Основний Hero, H1, ціни, картки послуг і природні контекстні посилання збережено.
2. На `/poslugy` прибрано другий великий список «Популярні клінінгові послуги». Основний `ServicesGrid`, CTA й FAQ збережено.
3. Сторінка квартир отримала нейтральний опис для трьох форматів: підтримуюче, генеральне та після ремонту. H1, Title, URL, canonical, ціни й структура не змінені.
4. Зі спільного blog layout прибрано однакові чотири service links у кожній статті. Залишено локальні inline links, CTA та корисну навігацію.
5. Реальні картки портфоліо отримали природні посилання з назви роботи на точну канонічну послугу. Фото, підписи, порядок і дизайн не змінені.

## 3. Keyword architecture і канібалізація

Головна закріплена за загальним кластером «клінінг Черкаси». `/poslugy` є каталогом, `/prices` — прайс-хабом. Квартири, генеральне, підтримуюче, після ремонту, меблі, диван, матрац, килим, ковролін, авто, вікна, фасади, B2B і складні роботи мають окремі primary URLs.

P1 mapping, який потрібно відстежувати в GSC після повторного обходу:

- головна проти `/poslugy` за «клінінг Черкаси»;
- квартирний хаб проти вузьких генеральної й підтримуючої сторінок;
- загальне генеральне проти генерального квартири;
- після ремонту проти `/poslugy` та інформаційних статей;
- меблі проти дивана/матраца;
- вікна проти фасадів;
- дезінфекція проти потопу/пожежі.

Жодне з цих перетинань не виправлялося масовими Title, H1, noindex або redirects. Рішення зафіксовані в `keyword-cannibalization-map-2026-08-12.csv`.

## 4. Content similarity

Із розрахунку виключено Header, Footer, navigation, форми, scripts, styles і блоки, які трапляються щонайменше на 75% service pages.

- HIGH (50–70%): 0.
- CRITICAL (>70%): 0.
- REVIEW (30–50%): 3 пари.

Пари REVIEW:

1. Після потопу ↔ комерційні приміщення — 40.1%.
2. Прилегла територія ↔ комерційні приміщення — 32.0%.
3. Після потопу ↔ прилегла територія — 31.4%.

Рекомендація: не збільшувати текст механічно. Після накопичення GSC mapping підсилювати лише специфічні докази: тип забруднення, доступ, техніку, послідовність і реальний кейс.

## 5. Технічна архітектура

### Sitemap

`app/sitemap.xml/route.ts` формує справжній XML із `application/xml; charset=utf-8`. У sitemap входять 8 main routes, 30 service pages і 23 blog posts. Redirect, legacy, noindex, duplicate й 404 URL не додаються.

### Robots

`/robots.txt` дозволяє індексацію всього сайту та вказує `https://www.formula-chistoty.ck.ua/sitemap.xml`.

### Canonical

Усі 61 canonical pages мають self-canonical на `https://www.formula-chistoty.ck.ua`. Non-www, `/tsiny`, `/services`, `/uk` і `/ru` не використовуються як canonical targets.

### Legacy

112 точних правил `301` ведуть на URL із відповідним intent. Усі їхні destinations присутні в canonical inventory. Додаткові патерни middleware закривають старі WordPress `/uk/services/...` і `/ru/services/...` без перенаправлення релевантних послуг на головну.

Потенційний дубль `/prybyrannya-trts-supermarketiv-cherkasy` не індексується як друга сторінка: він має 301 на `/prybyrannya-mahazyniv-supermarketiv-cherkasy` і відсутній у sitemap.

## 6. Schema і breadcrumbs

Знайдені типи: `Organization`, `CleaningService`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, `LocalBusiness`, `BlogPosting`, `Review`.

- Service pages: `Service`, `LocalBusiness`, `BreadcrumbList`, видимий FAQ + `FAQPage`.
- Blog pages: `BlogPosting`, `BreadcrumbList`, видимий FAQ + `FAQPage`.
- Home: Organization/CleaningService/WebSite і один Review на основі наявного реального відгуку.
- `AggregateRating` не створюється.
- Явний тип `WebPage` відсутній. Це не блокуюча помилка; додавати його глобально без окремого schema-релізу не потрібно.

Усі service pages мають breadcrumbs `Головна → Послуги → Послуга`. Підтримуюче та генеральне квартири мають додатковий квартирний рівень.

## 7. Internal authority

Ієрархія збережена:

- `/` → `/poslugy` → service pages;
- квартири → підтримуюче, генеральне квартири, після ремонту;
- меблі → диван, матрац, килими, ковролін, стільці, крісла;
- комерційний хаб → офіси, регулярний B2B, магазини/супермаркети, ресторани/кафе, склади, виробництва, медичні центри.

Посилання надходять із homepage, `/poslugy`, `/prices`, related services, blog CTA/inline content і тепер із релевантних карток `/nashi-roboty`. Однаковий exact-match anchor масово не додавався.

## 8. Контент, кейси й довіра

- На сторінці після ремонту є підтверджений приклад 100 м² з орієнтиром 18 000 грн і три релевантні приклади фото.
- Є реальні фото квартир, вікон, духовки, плитки, меблів, матраца, ковроліну, авто-боксу, пожежі й післяремонтних робіт.
- Не додано вигаданих площ, часу, складу команди, гарантій або сертифікатів.
- На сайті є реальні контакти, графік, Maps URL, фото офісу й автомобіля.

Залишковий ризик: джерела відгуків не збережені окремими URL, а fallback може показувати один реальний відгук на кількох service pages. Наступна безпечна дія — прив'язувати відгук до послуги та джерела лише після підтвердження, не вигадуючи review schema.

## 9. Фото й продуктивність

Використані локальні фото існують, alt заповнені, `next/image` задає width/height і responsive sizes. Найбільші оригінали займають 3–5 МБ; ключові кейси вже мають optimized variants.

Окремий media cleanup має:

1. перевірити, які великі дублікати реально не використовуються;
2. створити WebP/AVIF без втрати доказового оригіналу;
3. не міняти URL активних зображень без потреби;
4. порівняти LCP і CLS до/після.

Масове видалення або перетворення фото в цьому релізі не виконувалося.

## 10. Перевірки

- `pnpm lint` — PASS.
- `pnpm typecheck` — PASS.
- `npm run build` — PASS, 72/72 static pages.
- `git diff --check` — PASS.
- Production-build audit — 0 broken links, 0 missing images, 0 duplicate Title/H1, 0 bad canonical, 0 noindex.

Локальний browser preview у sandbox раніше блокувався помилкою `listen EPERM` на `127.0.0.1:3100`. Тому screenshots desktop/mobile у цьому середовищі не підмінялися припущеннями. Перед commit потрібен короткий ручний visual QA головної, `/poslugy`, квартир, після ремонту, меблів, `/prices` і `/nashi-roboty` на 390 та 1440 px.

## 11. Пріоритети після релізу

1. **P0:** ручний visual QA й staging review diff.
2. **P1:** після deploy перевірити live HTTP/canonical/sitemap/robots і mapping у GSC після повного періоду даних.
3. **P1:** звірити GBP та зовнішній NAP за `off-site-plan-2026-08-12.md`.
4. **P2:** підтвердити джерела відгуків і додати service-specific attribution.
5. **P2:** підсилити лише три REVIEW-пари реальними відмінностями та кейсами.
6. **P3:** окремий media optimization release з вимірюванням Core Web Vitals.

## Вердикт

**READY FOR VISUAL QA.** Технічні й структурні перевірки пройдені. Commit, push і deploy у межах цього завдання не виконувалися.
