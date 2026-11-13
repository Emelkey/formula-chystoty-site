import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("approved price date and minimum visit remain shared and visible", () => {
  const conditions = readFileSync("lib/order-conditions.ts", "utf8");
  assert.ok(conditions.includes('minimumVisitPrice = "3000 грн"'));
  assert.ok(conditions.includes('windowPricesUpdatedOn = "09.11.2026"'));
  const prices = readFileSync("components/PricesSeoPage.tsx", "utf8");
  assert.ok(prices.includes("Ціни на миття вікон оновлено {windowPricesUpdatedOn}."));
  assert.ok(!prices.includes("30.07.2026"));
  assert.ok(!prices.includes("Ціни оновлено"));
  assert.ok(!conditions.includes("export const pricesUpdatedOn"));
  for (const name of ["ServiceCard", "PricingSection"]) {
    assert.ok(readFileSync("components/" + name + ".tsx", "utf8").includes("Мінімальне замовлення з виїздом — {minimumVisitPrice}."));
  }
});
