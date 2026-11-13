"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackAnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: AnalyticsEventName;
  eventCategory: "lead" | "contact" | "social";
  eventLabel: string;
  children: ReactNode;
};

export function TrackedLink({ eventName, eventCategory, eventLabel, onClick, children, ...props }: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackAnalyticsEvent(eventName, {
      event_category: eventCategory,
      event_label: eventLabel
    });
    onClick?.(event);
  };

  // Keep internal CTA navigation in the existing Next router instead of unloading
  // the document while its prefetched RSC requests are still in flight.
  // No new automatic prefetching; external, download and new-tab links stay native.
  const internal = props.href?.startsWith("/") && !props.href.startsWith("//")
    && !props.download && (!props.target || props.target === "_self");
  if (internal) {
    return <Link {...props} href={props.href!} prefetch={false} onClick={handleClick}>{children}</Link>;
  }
  return <a {...props} onClick={handleClick}>{children}</a>;
}
