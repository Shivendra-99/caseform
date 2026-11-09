import { createContext, useContext, useEffect, useState } from "react";
import { MODELS, PRODUCTS, isRetired, optionsFor, priceLines, stockLeft } from "./catalog.js";

export { PRODUCTS, FREE_SHIPPING, inr } from "./catalog.js";

const CART_KEY = "se-cart";
const DEVICES_KEY = "se-devices";
const OLD_DEVICE_KEY = "se-device"; // single model, saved by earlier versions

// The bag and chosen models are kept in localStorage so a reload (or coming back
// from checkout) doesn't lose them. Storage can be unavailable, so every access is guarded.
function load(key, fallback, valid) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return valid(v) ? v : fallback;
  } catch {
    return fallback;
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or full storage: keep working in memory */
  }
};
// A saved bag is dropped if any line names a retired product, an option it no longer comes in, or a
// model no longer sold.
const validVariant = (i) => optionsFor(PRODUCTS[i.id])?.some((o) => o.name === i.variant) ?? i.variant == null;
const selling = (m) => MODELS.includes(m) && !isRetired(m);
const validDevices = (v) => Array.isArray(v) && v.every(selling);
const validCart = (v) => Array.isArray(v) && v.every((i) => PRODUCTS[i?.id] && Number.isInteger(i.qty) && i.qty > 0 && validVariant(i) && selling(i.device));

// Pieces of one product / model / finish still available to this shopper: stock left minus what's
// already in their bag. Infinity for products whose stock isn't tracked.
export function stockFor(id, device, variant, cart = []) {
  const p = PRODUCTS[id];
  const oi = optionsFor(p)?.findIndex((o) => o.name === variant) ?? 0;
  const inBag = cart.filter((i) => i.id === id && i.device === device && i.variant === variant).reduce((s, i) => s + i.qty, 0);
  return stockLeft(p, MODELS.indexOf(device), Math.max(oi, 0)) - inBag;
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // The iPhone models the shopper is buying for, kept in MODELS order. Empty = "All iPhone models":
  // browsing only, a model has to be chosen before anything can go in the bag.
  const [devices, setDevicesState] = useState(() => load(DEVICES_KEY, null, validDevices) ?? [load(OLD_DEVICE_KEY, null, selling)].filter(Boolean));
  const [cart, setCart] = useState(() => load(CART_KEY, [], validCart));
  const device = devices[0] ?? cart[0]?.device;

  useEffect(() => save(CART_KEY, cart), [cart]);
  useEffect(() => save(DEVICES_KEY, devices), [devices]);

  const setDevices = (list) => setDevicesState(MODELS.filter((m) => list.includes(m) && selling(m)));

  // Never adds more than are left (the server re-checks and reserves at checkout).
  const addToCart = (id, qty = 1, forDevice = device, variant) =>
    setCart((c) => {
      const n = Math.min(qty, stockFor(id, forDevice, variant, c));
      if (n < 1) return c;
      const hit = c.find((i) => i.id === id && i.device === forDevice && i.variant === variant);
      return hit
        ? c.map((i) => (i === hit ? { ...i, qty: i.qty + n } : i))
        : [...c, { id, device: forDevice, variant, qty: n }];
    });
  // Adds the item once for each selected model (one bag line per model) and returns the models it
  // couldn't add because they're sold out, so the page can say so.
  const addForModels = (id, qty = 1, variant) => {
    const soldOut = devices.filter((d) => stockFor(id, d, variant, cart) < 1);
    devices.forEach((d) => addToCart(id, qty, d, variant));
    return soldOut;
  };
  const setQty = (item, qty) =>
    setCart((c) => (qty < 1 ? c.filter((i) => i !== item) : c.map((i) => (i === item ? { ...i, qty: Math.min(qty, i.qty + stockFor(i.id, i.device, i.variant, c)) } : i))));
  const clearCart = () => setCart([]);

  const lines = priceLines(cart);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const mrpTotal = lines.reduce((s, l) => s + l.mrp * l.qty, 0);

  return (
    <StoreContext.Provider value={{ cart, devices, device, setDevices, lines, count, subtotal, mrpTotal, addToCart, addForModels, setQty, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
