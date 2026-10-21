import { createContext, useContext, useEffect, useState } from "react";
import { MODELS, PRODUCTS, optionsFor, priceLines } from "./catalog.js";

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
// A saved bag is dropped if any line names a retired product or an option it no longer comes in.
const validVariant = (i) => optionsFor(PRODUCTS[i.id])?.some((o) => o.name === i.variant) ?? i.variant == null;
const validDevices = (v) => Array.isArray(v) && v.length > 0 && v.every((m) => MODELS.includes(m));
const validCart = (v) => Array.isArray(v) && v.every((i) => PRODUCTS[i?.id] && Number.isInteger(i.qty) && i.qty > 0 && validVariant(i));

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // The iPhone models the shopper is buying for: at least one, kept in MODELS order.
  const [devices, setDevicesState] = useState(() => load(DEVICES_KEY, null, validDevices) ?? [load(OLD_DEVICE_KEY, MODELS[0], (v) => MODELS.includes(v))]);
  const [cart, setCart] = useState(() => load(CART_KEY, [], validCart));
  const device = devices[0];

  useEffect(() => save(CART_KEY, cart), [cart]);
  useEffect(() => save(DEVICES_KEY, devices), [devices]);

  const setDevices = (list) => {
    const next = MODELS.filter((m) => list.includes(m));
    if (next.length) setDevicesState(next);
  };

  const addToCart = (id, qty = 1, forDevice = device, variant) =>
    setCart((c) => {
      const hit = c.find((i) => i.id === id && i.device === forDevice && i.variant === variant);
      return hit
        ? c.map((i) => (i === hit ? { ...i, qty: i.qty + qty } : i))
        : [...c, { id, device: forDevice, variant, qty }];
    });
  // Adds the item once for each selected model (one bag line per model).
  const addForModels = (id, qty = 1, variant) => devices.forEach((d) => addToCart(id, qty, d, variant));
  const setQty = (item, qty) =>
    setCart((c) => (qty < 1 ? c.filter((i) => i !== item) : c.map((i) => (i === item ? { ...i, qty } : i))));
  const clearCart = () => setCart([]);

  const lines = priceLines(cart);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const mrpTotal = lines.reduce((s, l) => s + l.mrp * l.qty, 0);

  return (
    <StoreContext.Provider value={{ devices, device, setDevices, lines, count, subtotal, mrpTotal, addToCart, addForModels, setQty, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
