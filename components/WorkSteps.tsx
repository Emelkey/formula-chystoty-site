"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { serviceSteps } from "@/lib/site";
import styles from "./WorkSteps.module.css";

const motionQuery = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
const stickyOffset = 76;

export function WorkSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !rail || !track) return;

    const media = window.matchMedia(motionQuery);
    let travel = 0;
    let scrollFrame = 0;
    let layoutFrame = 0;

    function paintPosition() {
      scrollFrame = 0;
      if (!media.matches || !section || !track) return;

      // Sticky starts when the section reaches the bottom of the site header.
      const scrolled = Math.min(travel, Math.max(0, stickyOffset - section.getBoundingClientRect().top));
      track.style.transform = `translate3d(${-scrolled}px, 0, 0)`;
    }

    function queuePosition() {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(paintPosition);
    }

    function measure() {
      layoutFrame = 0;
      if (!section || !viewport || !rail || !track) return;

      if (!media.matches) {
        section.removeAttribute("data-motion-ready");
        section.style.removeProperty("height");
        track.style.removeProperty("transform");
        travel = 0;
        return;
      }

      section.dataset.motionReady = "true";
      travel = Math.max(0, track.scrollWidth - rail.clientWidth);
      section.style.height = `${Math.ceil(viewport.getBoundingClientRect().height + travel)}px`;
      paintPosition();
    }

    function queueMeasure() {
      if (!layoutFrame) layoutFrame = window.requestAnimationFrame(measure);
    }

    const resizeObserver = new ResizeObserver(queueMeasure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(rail);
    resizeObserver.observe(track);
    media.addEventListener("change", queueMeasure);
    window.addEventListener("resize", queueMeasure);
    window.addEventListener("scroll", queuePosition, { passive: true });
    queueMeasure();

    return () => {
      resizeObserver.disconnect();
      media.removeEventListener("change", queueMeasure);
      window.removeEventListener("resize", queueMeasure);
      window.removeEventListener("scroll", queuePosition);
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(layoutFrame);
      section.removeAttribute("data-motion-ready");
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
    };
  }, []);

  return (
    <>
      <section className={styles.section} ref={sectionRef}>
        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.heading}>
            <SectionHeading eyebrow="Процес" title="Як ми працюємо" />
            <a className={styles.skipLink} href="#after-work-steps">Пропустити етапи ↓</a>
          </div>
          <div className={styles.rail} ref={railRef}>
            <ol className={styles.track} ref={trackRef}>
              {serviceSteps.map((step, index) => (
                <li className={styles.step} key={step}>
                  <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div className={styles.stepContent}>
                    <span className={styles.stepCount}>Етап {index + 1} / {serviceSteps.length}</span>
                    <h3>{step}</h3>
                  </div>
                  <span className={styles.stepArrow} aria-hidden="true">↗</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <div id="after-work-steps" className={styles.skipTarget} tabIndex={-1} aria-label="Кінець етапів роботи" />
    </>
  );
}
