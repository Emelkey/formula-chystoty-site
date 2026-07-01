export type AnalyticsEventName =
  | "lead_submit"
  | "phone_click"
  | "telegram_click"
  | "viber_click"
  | "instagram_click"
  | "calculate_click"
  | "contact_form_open";

type AnalyticsParams = {
  event_category: "lead" | "contact" | "social";
  event_label: string;
};

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: AnalyticsEventName, params: AnalyticsParams) => void;
};

export function trackAnalyticsEvent(eventName: AnalyticsEventName, params: AnalyticsParams) {
  if (typeof window === "undefined") return;

  (window as AnalyticsWindow).gtag?.("event", eventName, params);
}
