"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackAnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: AnalyticsEventName;
  eventCategory: "lead" | "contact" | "social";
  eventLabel: string;
  children: ReactNode;
};

export function TrackedLink({ eventName, eventCategory, eventLabel, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackAnalyticsEvent(eventName, {
          event_category: eventCategory,
          event_label: eventLabel
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
