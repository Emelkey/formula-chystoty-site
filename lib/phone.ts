/** Shared format validation only; this does not verify ownership or reachability. */
export const PHONE_VALIDATION_MESSAGE =
  "Введіть український номер: +380XXXXXXXXX або 0XXXXXXXXX. Пробіли, дужки та дефіси дозволені.";

export function normalizeUkrainianPhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const input = value.trim();
  if (!input || input.length > 40 || !/^[+0-9\s().\-]+$/.test(input)) return null;

  const compact = input.replace(/[\s().\-]/g, "");
  if (/^0[0-9]{9}$/.test(compact)) return `+38${compact}`;
  if (/^380[0-9]{9}$/.test(compact)) return `+${compact}`;
  if (/^\+380[0-9]{9}$/.test(compact)) return compact;
  return null;
}
