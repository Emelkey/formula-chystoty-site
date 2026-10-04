"use client";

import { useEffect } from "react";

export function KeyboardPageScroll() {
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable], [role='textbox'], [role='slider'], [role='spinbutton'], [role='listbox'], [role='combobox'], [role='menu'], [role='grid']")) return;
      if (window.getSelection()?.toString()) return;

      event.preventDefault();
      window.scrollBy({ top: (event.key === "ArrowDown" ? 1 : -1) * (event.repeat ? 80 : 160), behavior: "instant" });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
