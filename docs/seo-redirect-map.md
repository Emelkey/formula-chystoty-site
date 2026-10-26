# SEO Redirect Map

Основна версія сайту: `https://www.formula-chistoty.ck.ua/`.

## Canonical Host

| Old URL | New URL |
| --- | --- |
| `http://formula-chistoty.ck.ua/:path*` | `https://www.formula-chistoty.ck.ua/:path*` |
| `https://formula-chistoty.ck.ua/:path*` | `https://www.formula-chistoty.ck.ua/:path*` |

## Main Pages

| Old URL | New URL |
| --- | --- |
| `/uk` | `/` |
| `/ru` | `/` |
| `/services` | `/poslugy` |
| `/uk/services` | `/poslugy` |
| `/ru/services` | `/poslugy` |
| `/uk/services-uk` | `/poslugy` |
| `/ru/services-ru` | `/poslugy` |
| `/prices` | `/tsiny` |
| `/contacts` | `/kontakty` |
| `/about` | `/pro-nas` |
| `/works` | `/nashi-roboty` |
| `/reviews` | `/vidguky` |

## Priority Service Pages

| Old URL | New URL |
| --- | --- |
| `/uk/prybyrannya-kvartyr` | `/prybyrannya-kvartyr-cherkasy` |
| `/uk/services/prybyrannya-kvartyr` | `/prybyrannya-kvartyr-cherkasy` |
| `/ru/services/uborka-kvartir` | `/prybyrannya-kvartyr-cherkasy` |
| `/uk/generalne-prybyrannya` | `/generalne-prybyrannya-kvartyry-cherkasy` |
| `/uk/services/generalne-prybyrannya` | `/generalne-prybyrannya-kvartyry-cherkasy` |
| `/ru/services/generalnaya-uborka` | `/generalne-prybyrannya-kvartyry-cherkasy` |
| `/uk/services/generalne-prybyrannya-kvartyry` | `/generalne-prybyrannya-kvartyry-cherkasy` |
| `/uk/services/generalne-prybyrannya-kvartyr` | `/generalne-prybyrannya-kvartyry-cherkasy` |
| `/uk/services/generalne-prybyrannya-kvartiry` | `/generalne-prybyrannya-kvartyry-cherkasy` |
| `/uk/services/generalne-prybyrannya-kuhni` | `/generalne-prybyrannya-kuhni-cherkasy` |
| `/ru/services/generalnaya-uborka-kuhni` | `/generalne-prybyrannya-kuhni-cherkasy` |
| `/uk/services/pidtrymuyuche-prybyrannya` | `/pidtrymuyuche-prybyrannya-kvartyr-cherkasy` |
| `/uk/services/pidtrymuyuche-prybyrannya-kvartyry` | `/pidtrymuyuche-prybyrannya-kvartyr-cherkasy` |
| `/ru/services/podderzhivayushchaya-uborka-kvartiry` | `/pidtrymuyuche-prybyrannya-kvartyr-cherkasy` |
| `/uk/prybyrannya-pislya-remontu` | `/prybyrannya-pislya-remontu-cherkasy` |
| `/uk/services/prybyrannya-pislya-remontu` | `/prybyrannya-pislya-remontu-cherkasy` |
| `/ru/services/uborka-posle-remonta` | `/prybyrannya-pislya-remontu-cherkasy` |
| `/prybyrannya-pislya-budivnytstva-cherkasy` | `/prybyrannya-pislya-remontu-cherkasy` |
| `/pislyabudivelne-prybyrannya-cherkasy` | `/prybyrannya-pislya-remontu-cherkasy` |
| `/uk/services/prybyrannya-budynkiv` | `/prybyrannya-budynkiv-cherkasy` |
| `/uk/services/prybyrannya-pryvatnyh-budynkiv` | `/prybyrannya-budynkiv-cherkasy` |
| `/ru/services/uborka-domov` | `/prybyrannya-budynkiv-cherkasy` |
| `/ru/services/uborka-kottedzhej` | `/prybyrannya-budynkiv-cherkasy` |
| `/uk/services/dezynfektsiya-prymishchen-vid-virusiv` | `/dezinfektsiya-prymishchen-cherkasy` |
| `/uk/services/dezinfektsiya-prymishchen` | `/dezinfektsiya-prymishchen-cherkasy` |
| `/ru/services/dezinfekciya-pomeshchenij` | `/dezinfektsiya-prymishchen-cherkasy` |
| `/uk/services/chystka-kylymiv-kovrolinu` | `/himchystka-kylymiv-cherkasy` |
| `/uk/services/himchystka-kylymiv` | `/himchystka-kylymiv-cherkasy` |
| `/ru/services/himchistka-kovrov` | `/himchystka-kylymiv-cherkasy` |
| `/ru/services/chistka-kovrov-kovrolina` | `/himchystka-kylymiv-cherkasy` |
| `/uk/himchystka-mebliv` | `/himchystka-mebliv-cherkasy` |
| `/uk/services/himchystka-mebliv` | `/himchystka-mebliv-cherkasy` |
| `/ru/services/himchistka-mebeli` | `/himchystka-mebliv-cherkasy` |
| `/uk/himchystka-dyvana` | `/himchystka-dyvana-cherkasy` |
| `/uk/services/himchystka-dyvana` | `/himchystka-dyvana-cherkasy` |
| `/ru/services/himchistka-divana` | `/himchystka-dyvana-cherkasy` |
| `/uk/myttya-vikon` | `/myttya-vikon-cherkasy` |
| `/uk/services/myttya-vikon` | `/myttya-vikon-cherkasy` |
| `/ru/services/moyka-okon` | `/myttya-vikon-cherkasy` |

## Car Cleaning

Усі старі варіанти з `himchystka-avto`, `himchistka-avto`, `khimchystka-avto`, `khimchistka-avto`, `himchystka-salonu-avto`, `himchistka-salona-avto`, `himchystka-avtomobilya`, `himchistka-avtomobilya` у корені, `/services`, `/uk`, `/ru`, `/uk/services`, `/ru/services` ведуть на:

`/himchystka-avto-cherkasy`

Ці правила мають стояти перед загальними fallback-редиректами `/uk/:path*` і `/ru/:path*`, щоб сторінка хімчистки авто не перекидала користувача на головну.
