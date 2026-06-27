# Формула Чистоти

Новий SEO-сайт клінінгової компанії “Формула Чистоти” у Черкасах.

## Бренд

На сайті використовується офіційний логотип `Fo / ФОРМУЛА ЧИСТОТИ`: великий зелений `Fo`, чорний напис `ФОРМУЛА`, жирний чорний напис `ЧИСТОТИ` на білому фоні. Логотип підключений через компонент `components/Logo.tsx` із файлу `public/brand/logo.png`; favicon створений із того самого варіанту в `public/brand/favicon.png`.

## Фото для сайту

Поточні зображення в `public/images/` — легальні локальні mock-фото без чужих брендів і водяних знаків. Їх можна замінити на реальні фото “Формула Чистоти”, зберігши ті самі назви файлів.

Рекомендований формат: `WebP`.

Рекомендовані розміри:

- hero: `1600x1000`
- services: `900x700`
- works: `1200x900`
- blog: `1200x800`
- team: `1200x900`
- equipment: `1200x900`

### Hero

Покласти файл:

- `public/images/hero/cleaning-team-cherkasy.webp`

Alt у коді:

- `Клінінгова компанія Формула Чистоти у Черкасах`

### Послуги

Папка: `public/images/services/`

- `apartment-cleaning.webp`
- `general-cleaning.webp`
- `post-renovation-cleaning.webp`
- `house-cleaning.webp`
- `office-cleaning.webp`
- `sofa-cleaning.webp`
- `window-cleaning.webp`
- `commercial-cleaning.webp`

### Наші роботи

Папка: `public/images/works/`

- `apartment-before-after-01.webp`
- `post-renovation-before-after-01.webp`
- `sofa-cleaning-before-after-01.webp`
- `window-cleaning-01.webp`
- `office-cleaning-01.webp`
- `commercial-cleaning-01.webp`

У коді ці фото позначені коментарем `TODO: replace with real Formula Chystoty photo`, бо зараз це тимчасові mock-зображення.

### Про нас

Папки:

- `public/images/team/team-formula-chystoty.webp`
- `public/images/equipment/cleaning-equipment.webp`

### Блог

Папка: `public/images/blog/`

- `post-renovation-price-cherkasy.webp`
- `general-cleaning-checklist.webp`
- `choose-cleaning-company-cherkasy.webp`
- `construction-dust-cleaning.webp`
- `prepare-apartment-cleaning.webp`
- `general-vs-regular-cleaning.webp`
- `sofa-cleaning-frequency.webp`
- `window-cleaning-after-renovation.webp`
- `apartment-after-tenants.webp`
- `apartment-before-rent-sale.webp`
- `professional-cleaning-products.webp`
- `office-cleaning-daily.webp`
- `mattress-cleaning.webp`
- `house-cleaning-after-renovation.webp`
- `tile-care-after-renovation.webp`
- `cleaning-mistakes-after-renovation.webp`
- `professional-cleaning-company.webp`
- `cleaner-vs-cleaning-company.webp`
- `office-regular-cleaning.webp`
- `one-time-vs-regular-cleaning.webp`

## Як замінити фото

1. Підготуйте реальне фото у WebP у рекомендованому розмірі.
2. Назвіть файл так само, як поточний файл у відповідній папці.
3. Замініть файл у `public/images/...`.
4. Не змінюйте шлях у коді, якщо назва файлу лишилася такою самою.
5. Перевірте сайт командами:

```bash
pnpm lint
pnpm typecheck
npm run build
```

Після заміни фото також варто переглянути головну, сторінки послуг, `/nashi-roboty`, `/pro-nas` і `/blog` на мобільному та desktop-екрані.

## Деплой на Vercel

### 1. Залити код у GitHub

1. Створіть новий репозиторій у GitHub.
2. Додайте код проєкту в репозиторій.
3. Переконайтеся, що в репозиторій потрапили:
   - `app/`
   - `components/`
   - `lib/`
   - `sanity/`
   - `public/`
   - `package.json`
   - `pnpm-lock.yaml`
   - `next.config.ts`
   - `README.md`
   - `.env.example`
4. Не додавайте реальний `.env.local` у GitHub.

### 2. Підключити репозиторій у Vercel

1. У Vercel натисніть `Add New Project`.
2. Оберіть GitHub-репозиторій сайту.
3. Framework Preset має визначитися як `Next.js`.
4. Root Directory залиште порожнім, якщо репозиторій містить цей проєкт у корені.

### 3. Build settings

Рекомендовані налаштування:

- Framework Preset: `Next.js`
- Install Command: `pnpm install`
- Build Command: `npm run build`
- Output Directory: залишити стандартним для Next.js
- Node.js Version: актуальна LTS-версія, яку пропонує Vercel

У проєкті є `pnpm-lock.yaml`, тому Vercel може автоматично використати pnpm. Build-команда лишається `npm run build`, бо вона запускає скрипт `build` із `package.json`.

### 4. Environment variables

Сайт працює на static seed data навіть без підключеного Sanity, тому перший деплой можна зробити без реальних значень CMS. Для майбутнього підключення Sanity додайте у Vercel:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-23
```

Коли Sanity-проєкт буде створений, заповніть:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — project ID із Sanity
- `NEXT_PUBLIC_SANITY_DATASET` — зазвичай `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` — наприклад `2026-06-23`

### 5. Підключити домен `formula-chistoty.ck.ua`

1. У Vercel відкрийте `Project Settings` → `Domains`.
2. Додайте `formula-chistoty.ck.ua`.
3. Дотримуйтесь DNS-інструкцій Vercel.
4. У Cloudflare або DNS-панелі домену додайте записи, які покаже Vercel.
5. Дочекайтеся статусу `Valid Configuration`.
6. Перевірте, що сайт відкривається через HTTPS.

### 6. Що перевірити після деплою

Після публікації перевірте:

- головна сторінка відкривається на `https://formula-chistoty.ck.ua`
- `/poslugy`, `/tsiny`, `/nashi-roboty`, `/vidguky`, `/blog`, `/pro-nas`, `/kontakty`
- SEO-сторінки послуг
- `/sitemap.xml`
- `/robots.txt`
- коректний favicon
- Open Graph preview у месенджерах
- телефон, Telegram, Instagram, Facebook, email
- форма заявки з mock submit
- мобільне меню
- фото в hero, послугах, роботах, блозі та “Про нас”

### 7. Перед індексацією

1. Додайте сайт у Google Search Console.
2. Надішліть sitemap: `https://formula-chistoty.ck.ua/sitemap.xml`.
3. Підключіть GA4/GTM, якщо вони вже створені.
4. Перевірте 301-редиректи зі старих URL.
5. Замініть тимчасові mock-фото на реальні фото компанії, коли вони будуть готові.
