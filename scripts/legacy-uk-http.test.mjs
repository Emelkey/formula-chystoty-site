import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

import { getUkLegacyDestination, ukLegacyRouteRegistry } from "../lib/legacy-uk-routes.ts";

const canonicalUrl = "https://www.formula-chistoty.ck.ua";
const port = 3210;
const localUrl = `http://127.0.0.1:${port}`;

let server;

function assertPermanentRedirect(response, source) {
  assert.ok(
    response.status === 301 || response.status === 308,
    `${source} returned ${response.status} instead of a permanent redirect`
  );
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${localUrl}/`, { redirect: "manual" });
      if (response.status === 200) return;
    } catch {
      // The production server is still starting.
    }
    await delay(200);
  }

  throw new Error("Next.js production server did not become ready within 30 seconds");
}

test.before(async () => {
  server = spawn("pnpm", ["exec", "next", "start", "-H", "127.0.0.1", "-p", String(port)], {
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"]
  });

  let serverError = "";
  server.stderr.on("data", (chunk) => {
    serverError += chunk.toString();
  });
  server.on("exit", (code) => {
    if (code && code !== 0) {
      serverError += `\nNext.js exited with code ${code}`;
    }
  });

  try {
    await waitForServer();
  } catch (error) {
    throw new Error(`${error.message}\n${serverError}`);
  }
});

test.after(() => {
  server?.kill("SIGTERM");
});

test("every registered legacy URL returns one permanent hop to its canonical destination", async () => {
  for (const route of ukLegacyRouteRegistry) {
    const response = await fetch(`${localUrl}${route.source}?legacy-check=1`, { redirect: "manual" });
    assertPermanentRedirect(response, route.source);
    assert.equal(
      response.headers.get("location"),
      `${canonicalUrl}${route.destination}?legacy-check=1`,
      `${route.source} has the wrong Location header`
    );
  }
});

test("every canonical destination renders locally with status 200", async () => {
  for (const destination of new Set(ukLegacyRouteRegistry.map((route) => route.destination))) {
    const response = await fetch(`${localUrl}${destination}`, { redirect: "manual" });
    assert.equal(response.status, 200, `${destination} returned ${response.status}`);
  }
});

test("trailing slashes, uppercase paths and services pagination remain permanent redirects", async () => {
  const cases = [
    "/uk/",
    "/UK/SERVICES/PRYBYRANNYA-KVARTYR",
    "/uk/services/prybyrannya-kvartyr/",
    "/uk/services/page/2"
  ];

  for (const source of cases) {
    const destination = getUkLegacyDestination(source);
    assert.ok(destination, `${source} is absent from the registry resolver`);
    const response = await fetch(`${localUrl}${source}`, {
      headers: { host: "www.formula-chistoty.ck.ua" },
      redirect: "manual"
    });
    assertPermanentRedirect(response, source);
    assert.equal(response.headers.get("location"), `${canonicalUrl}${destination}`);
  }
});

test("canonical trailing slashes redirect once to the slashless canonical URL", async () => {
  const response = await fetch(`${localUrl}/prices/?source=legacy-check`, {
    headers: { host: "www.formula-chistoty.ck.ua" },
    redirect: "manual"
  });

  assertPermanentRedirect(response, "/prices/");
  const location = response.headers.get("location");
  assert.ok(location, "/prices/ redirect is missing the Location header");

  const destination = new URL(location, localUrl);
  assert.equal(destination.pathname, "/prices");
  assert.equal(destination.search, "?source=legacy-check");

  const destinationResponse = await fetch(`${localUrl}${destination.pathname}${destination.search}`, {
    redirect: "manual"
  });
  assert.equal(destinationResponse.status, 200, "/prices/ created a redirect chain instead of one permanent hop");
});
