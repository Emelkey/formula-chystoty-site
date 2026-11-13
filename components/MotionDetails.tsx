"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

/** Keep native details semantics and no-JS behavior; animate only the answer. */
export function MotionDetails({ question, children }: { question: string; children: ReactNode }) {
  const details = useRef<HTMLDetailsElement>(null);
  const answer = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const intendedOpen = useRef<boolean | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => {
      animation.current?.cancel();
      animation.current = null;
      if (details.current && intendedOpen.current !== null) details.current.open = intendedOpen.current;
      intendedOpen.current = null;
    };
    const onPreferenceChange = () => { if (motion.matches) settle(); };
    motion.addEventListener("change", onPreferenceChange);
    return () => {
      settle();
      motion.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const element = details.current;
    const panel = answer.current;
    if (!element || !panel || !panel.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    const opening = !(intendedOpen.current ?? element.open);
    const style = getComputedStyle(panel);
    const from = element.open
      ? { opacity: style.opacity, transform: style.transform }
      : { opacity: "0", transform: "translateY(-5px)" };
    animation.current?.cancel();
    intendedOpen.current = opening;
    element.open = true;
    const current = panel.animate(
      [from, { opacity: opening ? "1" : "0", transform: opening ? "translateY(0)" : "translateY(-5px)" }],
      { duration: opening ? 200 : 140, easing: "ease-out", fill: "forwards" }
    );
    animation.current = current;
    current.onfinish = () => {
      if (animation.current !== current) return;
      element.open = opening;
      current.cancel();
      animation.current = null;
      intendedOpen.current = null;
    };
  };

  return (
    <details ref={details} data-motion-details className="rounded-lg border border-black/5 bg-brand-mist p-5">
      <summary onClick={toggle} className="min-h-11 cursor-pointer text-lg font-semibold focus-visible:focus-ring">{question}</summary>
      <div ref={answer}>{children}</div>
    </details>
  );
}
