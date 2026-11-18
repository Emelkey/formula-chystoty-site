/** Application-level limits; distributed rate limiting must be enforced at the edge. */
export const MAX_LEAD_BODY_BYTES = 16 * 1024;
export const LEAD_BODY_TIMEOUT_MS = 5_000;
export const TELEGRAM_TIMEOUT_MS = 10_000;

export class LeadRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "LeadRequestError";
    this.status = status;
  }
}

export function validateLeadRequest(request: Request) {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") throw new LeadRequestError("unsupported_media_type", 415);
  // Browsers cannot forge these headers. This is not a bot/rate-limit control.
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    throw new LeadRequestError("origin_not_allowed", 403);
  }
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    throw new LeadRequestError("origin_not_allowed", 403);
  }
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_LEAD_BODY_BYTES)) {
    throw new LeadRequestError("payload_too_large", 413);
  }
}

export async function readLeadJson(request: Request, timeoutMs = LEAD_BODY_TIMEOUT_MS): Promise<unknown> {
  validateLeadRequest(request);
  if (!request.body) throw new LeadRequestError("invalid_json", 400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new LeadRequestError("request_timeout", 408));
      void reader.cancel().catch(() => undefined);
    }, timeoutMs);
  });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_LEAD_BODY_BYTES) {
        void reader.cancel().catch(() => undefined);
        throw new LeadRequestError("payload_too_large", 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}
