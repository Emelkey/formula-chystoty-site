"use client";

import { useEffect } from "react";

// Some touch browsers defer :active until release. Mirror only touch/pen pressure;
// native clicks, scrolling, zooming, keyboard input and form handlers stay intact.
export function ButtonSpringFeedback() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pressed: { element: HTMLElement; pointerId: number; x: number; y: number } | null = null;

    const release = () => {
      pressed?.element.removeAttribute("data-spring-pressed");
      pressed = null;
    };
    const onPointerDown = (event: PointerEvent) => {
      release();
      if (event.pointerType === "mouse" || !event.isPrimary || event.button !== 0 || reducedMotion.matches) return;
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>(".button-spring") : null;
      if (!element || element.matches(":disabled, [aria-disabled='true']")) return;
      pressed = { element, pointerId: event.pointerId, x: event.clientX, y: event.clientY };
      element.setAttribute("data-spring-pressed", "");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!pressed || event.pointerId !== pressed.pointerId) return;
      if (Math.hypot(event.clientX - pressed.x, event.clientY - pressed.y) > 10) release();
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId === pressed?.pointerId) release();
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerup", onPointerEnd, { passive: true });
    document.addEventListener("pointercancel", onPointerEnd, { passive: true });
    document.addEventListener("visibilitychange", release);
    window.addEventListener("scroll", release, { passive: true, capture: true });
    window.addEventListener("blur", release);
    window.addEventListener("pagehide", release);
    reducedMotion.addEventListener("change", release);

    return () => {
      release();
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerEnd);
      document.removeEventListener("pointercancel", onPointerEnd);
      document.removeEventListener("visibilitychange", release);
      window.removeEventListener("scroll", release, true);
      window.removeEventListener("blur", release);
      window.removeEventListener("pagehide", release);
      reducedMotion.removeEventListener("change", release);
    };
  }, []);

  return null;
}
