import { NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  pageUrl?: unknown;
  area?: unknown;
  type?: unknown;
  website?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function hasEnoughPhoneDigits(phone: string) {
  return phone.replace(/\D/g, "").length >= 7;
}

function exceedsLength(value: string, maxLength: number) {
  return value.length > maxLength;
}

function logLeadApi(message: string, details?: Record<string, unknown>) {
  console.log(message, details ?? {});
}

export async function POST(request: Request) {
  try {
    logLeadApi("lead_api_started");

    let body: LeadPayload = {};

    try {
      body = (await request.json()) as LeadPayload;
      logLeadApi("body_received", { received: true });
    } catch (error) {
      logLeadApi("body_received", { received: false, error: error instanceof Error ? error.message : "unknown" });
      return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
    }

    const name = asText(body.name);
    const phone = asText(body.phone);
    const service = asText(body.service) || asText(body.type);
    const area = asText(body.area);
    const leadMessage = asText(body.message);
    const pageUrl = asText(body.pageUrl);
    const website = asText(body.website);

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (
      exceedsLength(name, 120) ||
      exceedsLength(phone, 40) ||
      exceedsLength(service, 160) ||
      exceedsLength(area, 80) ||
      exceedsLength(leadMessage, 2000) ||
      exceedsLength(pageUrl, 500)
    ) {
      return NextResponse.json({ success: false, error: "payload_too_large" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ success: false, error: "name_required" }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ success: false, error: "phone_required" }, { status: 400 });
    }

    if (!hasEnoughPhoneDigits(phone)) {
      return NextResponse.json({ success: false, error: "phone_invalid" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    logLeadApi("telegram_env", {
      hasToken: Boolean(botToken),
      hasChatId: Boolean(chatId)
    });

    if (!botToken || !chatId) {
      return NextResponse.json({ success: false, error: "telegram_env_missing" }, { status: 500 });
    }

    const messageParts = [
      "Нова заявка з сайту Формула Чистоти",
      "",
      `Ім’я: ${name}`,
      `Телефон: ${phone}`,
      `Послуга: ${service || "Не вказано"}`,
      area ? `Площа: ${area}` : "",
      `Повідомлення: ${leadMessage || "Не вказано"}`,
      `Сторінка: ${pageUrl || "Не вказано"}`,
      `Дата: ${new Date().toISOString()}`
    ].filter(Boolean);

    const messageText = messageParts.join("\n");
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    logLeadApi("telegram_url_created", { created: true });
    logLeadApi("telegram_request_started");

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText
      })
    });

    logLeadApi("telegram_response_status", { status: telegramResponse.status, ok: telegramResponse.ok });

    if (!telegramResponse.ok) {
      return NextResponse.json({ success: false, error: "telegram_send_failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("lead_api_unhandled_error", error);
    return NextResponse.json({ success: false, error: "lead_api_unhandled_error" }, { status: 500 });
  }
}
