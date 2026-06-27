"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { contacts } from "@/lib/site";

type ContactActionType = "phone" | "viber";

export function ContactAction({
  type,
  className,
  children,
  ariaLabel,
  revealPhoneNumber = false,
  phoneNumberPosition = "right"
}: {
  type: ContactActionType;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  revealPhoneNumber?: boolean;
  phoneNumberPosition?: "left" | "right";
}) {
  const [isNumberRevealed, setIsNumberRevealed] = useState(false);
  const href = type === "phone" ? contacts.phoneHref : contacts.viber;
  const label = ariaLabel ?? (type === "phone" ? `Подзвонити ${contacts.viberNumber}` : `Написати у Viber ${contacts.viberNumber}`);

  if (type === "viber") {
    function handleViberClick(event: MouseEvent<HTMLAnchorElement>) {
      event.preventDefault();
      setIsNumberRevealed(true);
      void navigator.clipboard?.writeText(contacts.viberNumber).catch(() => undefined);
    }

    return (
      <a className={className} href={href} aria-label={label} onClick={handleViberClick}>
        {isNumberRevealed && revealPhoneNumber && phoneNumberPosition === "left" ? <span className="whitespace-nowrap">{contacts.phonePlain}</span> : null}
        {children}
        {isNumberRevealed && revealPhoneNumber && phoneNumberPosition === "right" ? <span className="whitespace-nowrap">{contacts.phonePlain}</span> : null}
      </a>
    );
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    setIsNumberRevealed(true);
    window.location.href = href;

    window.setTimeout(() => {
      if (document.visibilityState !== "visible") return;

      void navigator.clipboard?.writeText(contacts.viberNumber).catch(() => undefined);
    }, 700);
  }

  return (
    <a className={className} href={href} aria-label={label} onClick={handleClick}>
      {isNumberRevealed && revealPhoneNumber && phoneNumberPosition === "left" ? <span className="whitespace-nowrap">{contacts.phonePlain}</span> : null}
      {children}
      {isNumberRevealed && revealPhoneNumber && phoneNumberPosition === "right" ? <span className="whitespace-nowrap">{contacts.phonePlain}</span> : null}
    </a>
  );
}

export function ContactActionToast() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    function handleFeedback(event: Event) {
      const detail = (event as CustomEvent<{ message?: string; persistent?: boolean }>).detail;
      if (!detail?.message) return;

      setMessage(detail.message);
      if (!detail.persistent) {
        window.setTimeout(() => setMessage(""), 3600);
      }
    }

    window.addEventListener("contact-action-feedback", handleFeedback);
    return () => window.removeEventListener("contact-action-feedback", handleFeedback);
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] max-w-[calc(100vw-32px)] rounded-md bg-brand-black px-4 py-3 text-sm font-semibold text-white shadow-soft" role="status">
      {message}
    </div>
  );
}
