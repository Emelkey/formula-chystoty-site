"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: server-rendered content is never hidden awaiting JS. */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || !window.IntersectionObserver || !Element.prototype.animate) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<Element, Animation>();
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        // Unobserve first: scrolling away/back must never replay an entrance.
        observer.unobserve(entry.target);
        entry.target.setAttribute("data-revealed", "true");
        if (motion.matches || entry.target.contains(document.activeElement)) continue;
        const animation = entry.target.animate(
          [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 360, easing: "cubic-bezier(.2,.65,.3,1)" }
        );
        animations.set(entry.target, animation);
        animation.onfinish = () => animations.delete(entry.target);
      }
    }, { threshold: 0.08 });
    items.forEach((item) => observer.observe(item));

    const cancelMotion = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onPreferenceChange = () => {
      if (motion.matches) cancelMotion();
    };
    const onFocus = (event: FocusEvent) => {
      const item = event.target instanceof Element ? event.target.closest("[data-reveal]") : null;
      if (!item) return;
      // A keyboard user must never land on an invisible or moving link.
      observer.unobserve(item);
      item.setAttribute("data-revealed", "true");
      animations.get(item)?.cancel();
      animations.delete(item);
    };
    container.addEventListener("focusin", onFocus);
    motion.addEventListener("change", onPreferenceChange);
    return () => {
      observer.disconnect();
      cancelMotion();
      container.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
