"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ContactButtons, PrimaryButton } from "@/components/Buttons";
import styles from "@/components/HeroSection.module.css";

const heroPrices = [
  { href: "/pidtrymuyuche-prybyrannya-kvartyr-cherkasy", label: "Підтримуюче", price: "від 55 грн/м²" },
  { href: "/generalne-prybyrannya-cherkasy", label: "Генеральне", price: "від 100 грн/м²" },
  { href: "/prybyrannya-pislya-remontu-cherkasy", label: "Після ремонту", price: "від 120 грн/м²" }
];

const INITIAL_SPLIT = 50;
const clamp = (value: number) => Math.max(0, Math.min(100, value));
const smooth = (value: number) => value * value * (3 - 2 * value);

export function HeroSection({ eyebrow = "Клінінг у Черкасах", title, accent, description }: { eyebrow?: string; title: string; accent: string; description: string }) {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number | null>(null);
  const manualRef = useRef(false);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);

  const setSplit = useCallback((value: number) => {
    const next = clamp(value);
    const stage = stageRef.current;
    if (stage) {
      stage.style.setProperty("--split", next + "%");
      stage.dataset.clean = String(next < 4);
    }
    if (rangeRef.current) rangeRef.current.value = String(Math.round(next));
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollFrame: number | null = null;

    const updateFromScroll = () => {
      scrollFrame = null;
      if (manualRef.current || playingRef.current || !desktop.matches || reduced.matches) return;
      const story = storyRef.current;
      if (!story) return;
      const travel = Math.max(1, story.offsetHeight - (window.innerHeight - 76));
      const progress = Math.max(0, Math.min(1, (76 - story.getBoundingClientRect().top) / travel));
      setSplit(INITIAL_SPLIT * (1 - smooth(progress)));
    };
    const schedule = () => {
      if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(updateFromScroll);
    };
    const updateMode = () => {
      if (reduced.matches && playingRef.current) {
        if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        playingRef.current = false;
        manualRef.current = true;
        setSplit(0);
        setPlaying(false);
        setPlayed(true);
        return;
      }
      if (!manualRef.current && !playingRef.current && (!desktop.matches || reduced.matches)) setSplit(INITIAL_SPLIT);
      else schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", updateMode);
    reduced.addEventListener("change", updateMode);
    updateMode();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", updateMode);
      reduced.removeEventListener("change", updateMode);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    };
  }, [setSplit]);

  const onCompare = (event: FormEvent<HTMLInputElement>) => {
    manualRef.current = true;
    playingRef.current = false;
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    setPlaying(false);
    setSplit(Number(event.currentTarget.value));
  };

  const replay = () => {
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    manualRef.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSplit(0);
      setPlayed(true);
      return;
    }

    playingRef.current = true;
    setPlaying(true);
    setSplit(INITIAL_SPLIT);
    const started = window.performance.now();
    const frame = (now: number) => {
      const time = Math.max(0, Math.min(1, (now - started) / 8000));
      const reveal = smooth(Math.max(0, Math.min(1, (time - 0.16) / 0.54)));
      setSplit(INITIAL_SPLIT * (1 - reveal));
      if (time < 1) animationRef.current = window.requestAnimationFrame(frame);
      else {
        animationRef.current = null;
        playingRef.current = false;
        manualRef.current = true;
        setPlaying(false);
        setPlayed(true);
      }
    };
    animationRef.current = window.requestAnimationFrame(frame);
  };

  return (
    <section className={styles.story} ref={storyRef} aria-label="Порівняння простору до і після прибирання">
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.images} role="img" aria-label="Ілюстрація кімнати після ремонту до та після прибирання">
          <div className={styles.before}>
            <Image src="/images/hero/room-before-concept.webp" alt="" fill priority sizes="100vw" className={styles.roomImage} />
          </div>
          <div className={styles.after}>
            <Image src="/images/hero/room-after-concept.webp" alt="" fill priority sizes="100vw" className={styles.roomImage} />
          </div>
        </div>
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.splitLine} aria-hidden="true"><span>‹ ›</span></div>
        <span className={styles.sideLabel + " " + styles.beforeLabel} aria-hidden="true">До</span>
        <span className={styles.sideLabel + " " + styles.afterLabel} aria-hidden="true">Після</span>
        <input
          className={styles.compareInput}
          ref={rangeRef}
          aria-label="Пересуньте межу, щоб порівняти кімнату до та після прибирання"
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={INITIAL_SPLIT}
          onInput={onCompare}
        />

        <div className={"container " + styles.content}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title} <span>{accent}</span></h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.prices} aria-label="Основні ціни на прибирання">
            {heroPrices.map((item) => (
              <Link className={styles.price} href={item.href} key={item.href}>
                <span>{item.label}</span><strong>{item.price}</strong>
              </Link>
            ))}
          </div>
          <div className={styles.actions}>
            <div className={styles.primary}><PrimaryButton /></div>
            <button className={styles.replay} type="button" onClick={replay} disabled={playing}>
              <span aria-hidden="true">{playing ? "◼" : played ? "↺" : "▶"}</span>
              {playing ? "Відтворюється" : played ? "Повторити рух" : "Переглянути рух · 8 с"}
            </button>
          </div>
          <div className={styles.contacts}><ContactButtons compact /></div>
          <div className={styles.badges}>
            <span>Виїзд у день звернення</span>
            <span>Працюємо у Черкасах та області</span>
          </div>
          <p className={styles.conceptNote}>Ілюстрація дизайну. Приклади реальних робіт — нижче на сторінці.</p>
        </div>
        <p className={styles.scrollHint}>Прокрутіть, щоб побачити результат <span aria-hidden="true">↓</span></p>
      </div>
    </section>
  );
}
