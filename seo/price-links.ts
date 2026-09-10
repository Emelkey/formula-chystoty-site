// Route to the existing service that owns the row; fees stay with pricing conditions.
export function priceTarget(label: string, group: string): string {
  const text = label.toLocaleLowerCase("uk-UA");
  if (/мінімальн|виїзд за місто/.test(text)) return "/prices#umovy";
  if (/авто/.test(group.toLowerCase())) return "/himchystka-avto-cherkasy";
  if (/вік|скла|рам|плівк|жалюзі/.test(text)) return "/myttya-vikon-cherkasy";
  if (/фасад|автовишк/.test(text)) return "/myttya-fasadiv-cherkasy";
  if (/тротуар/.test(text)) return "/myttya-plytky-cherkasy";
  if (/пожеж/.test(text)) return "/prybyrannya-pislya-pozhezhi-cherkasy";
  if (/потоп|затоп/.test(text)) return "/prybyrannya-pislya-potopu-cherkasy";
  if (/диван/.test(text)) return "/himchystka-dyvana-cherkasy";
  if (/матрац/.test(text)) return "/himchystka-matratsa-cherkasy";
  if (/кріс/.test(text)) return "/himchystka-krisel-cherkasy";
  if (/стіл|стіль/.test(text)) return "/himchystka-stiltsiv-cherkasy";
  if (/ковролін/.test(text)) return "/himchystka-kovrolinu-cherkasy";
  if (/килим/.test(text)) return "/himchystka-kylymiv-cherkasy";
  if (/ремонт|будівниц|будівель/.test(text)) return "/prybyrannya-pislya-remontu-cherkasy";
  if (/виробнич/.test(text)) return "/prybyrannya-vyrobnychykh-prymishchen-cherkasy";
  if (/регулярн/.test(text) && !/квартир|будинк/.test(text)) return "/rehulyarne-prybyrannya-biznesu-cherkasy";
  if (/духовк|холодильник|кухонн/.test(text)) return "/generalne-prybyrannya-kuhni-cherkasy";
  if (/душов|санвузол/.test(text)) return "/generalne-prybyrannya-cherkasy";
  if (/будин/.test(group)) return "/prybyrannya-budynkiv-cherkasy";
  if (/Комерційні/.test(group)) return "/prybyrannya-komertsiynykh-prymishchen-cherkasy";
  if (/Миття вікон/.test(group)) return "/myttya-vikon-cherkasy";
  if (/після ремонту/.test(group)) return "/prybyrannya-pislya-remontu-cherkasy";
  if (/Генеральне/.test(group)) return "/generalne-prybyrannya-cherkasy";
  if (/ковроліну/.test(group)) return "/himchystka-kovrolinu-cherkasy";
  if (/Хімчистка меблів/.test(group)) return "/himchystka-mebliv-cherkasy";
  if (/квартир|Підтримуюче|Додаткові/.test(group)) return "/prybyrannya-kvartyr-cherkasy";
  throw new Error(`Assign a canonical service to price row: ${group} / ${label}`);
}
