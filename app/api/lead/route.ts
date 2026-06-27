import { NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  pageUrl?: unknown;
};

const phonePattern = /^(\+?38)?0\d{9}$|^\+380\d{9}$/;

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Некоректні дані форми." }, { status: 400 });
  }

  const name = asText(payload.name);
  const phone = asText(payload.phone).replaceAll(" ", "");
  const service = asText(payload.service);
  const message = asText(payload.message);
  const pageUrl = asText(payload.pageUrl);

  if (!name || !phone) {
    return NextResponse.json({ error: "Ім’я та телефон обов’язкові." }, { status: 400 });
  }

  if (!phonePattern.test(phone)) {
    return NextResponse.json({ error: "Некоректний номер телефону." }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ error: "Telegram для заявок ще не налаштований." }, { status: 500 });
  }

  const telegramMessage = [
    "<b>Нова заявка з сайту Формула Чистоти</b>",
    "",
    `Ім’я: ${escapeHtml(name)}`,
    `Телефон: ${escapeHtml(phone)}`,
    `Послуга: ${escapeHtml(service || "Не вказано")}`,
    `Повідомлення: ${escapeHtml(message || "Не вказано")}`,
    `Сторінка: ${escapeHtml(pageUrl || "Не вказано")}`,
    `Дата: ${escapeHtml(new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" }))}`
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage,
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Не вдалося відправити заявку в Telegram." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
