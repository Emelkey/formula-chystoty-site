import { minimumVisitFromPrice } from "@/lib/order-conditions";

export function MinimumOrderNote() {
  return (
    <p className="mt-4 rounded-md border border-brand-green/20 bg-white p-4 text-sm leading-6 text-brand-graphite" data-minimum-order>
      <strong className="text-brand-black">Мінімальний виїзд по місту — {minimumVisitFromPrice}.</strong>{" "}
      Ціна окремого предмета меблів є частиною загального замовлення. Перелік робіт і підсумкову вартість погоджуємо до виїзду.{" "}
      <a className="font-semibold text-brand-hover underline" href="/prices">Умови та всі ціни</a>.
    </p>
  );
}
