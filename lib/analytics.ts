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
  gtag?: (command: "event", eventName: AnalyticsEventName, params: AnalyticsParams & { send_to: string }) => void;
};

export function trackAnalyticsEvent(eventName: AnalyticsEventName, params: AnalyticsParams) {
  if (typeof window === "undefined") return;

  try {
    // Keep contact events in the verified stream, not the tag's default destination group.
    (window as AnalyticsWindow).gtag?.("event", eventName, {
      ...params,
      send_to: "G-E2Q1N11QWJ"
    });
  } catch {
    // Analytics availability must not block a contact action or a delivered lead.
  }
}
