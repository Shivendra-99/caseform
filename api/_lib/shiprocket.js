import { createHmac } from "node:crypto";
import { HttpError } from "./http.js";

// Shiprocket Checkout API client. Every request is signed: X-Api-Key plus
// X-Api-HMAC-SHA256 = base64(HMAC-SHA256(secret, exact request body)).

const HOSTS = {
  staging: { api: "https://fastrr-api-dev.pickrr.com", ui: "https://customcheckoutfastrr.netlify.app" },
  production: { api: "https://checkout-api.shiprocket.com", ui: "https://checkout-ui.shiprocket.com" },
};

export function config() {
  const { SHIPROCKET_CHECKOUT_API_KEY: key, SHIPROCKET_CHECKOUT_SECRET: secret, SHIPROCKET_CHECKOUT_ENV: env = "staging" } = process.env;
  if (!key || !secret) return null;
  return { key, secret, ...(HOSTS[env] ?? HOSTS.staging) };
}

// Checkout APIs also expect a current timestamp in the body.
export const stamped = (payload) => ({ ...payload, timestamp: new Date().toISOString() });

export const sign = (secret, body) => createHmac("sha256", secret).update(body).digest("base64");

export async function shiprocket(cfg, path, payload) {
  const body = JSON.stringify(payload);
  const res = await fetch(cfg.api + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Api-Key": cfg.key, "X-Api-HMAC-SHA256": sign(cfg.secret, body) },
    body,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || data?.ok === false) {
    console.error("shiprocket", path, res.status, JSON.stringify(data));
    throw new HttpError(502, "Checkout is unavailable right now. Please try again in a moment.");
  }
  return data;
}
