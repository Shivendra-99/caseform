import { createContext, useContext, useState } from "react";

const IMG = {
  aeroshield: "/images/aeroshield.jpg",
  optiglass: "/images/optiglass.jpg",
  armormatrix: "/images/armormatrix.jpg",
};

// Catalogue of items that can be added to the bag (prices from the Stitch designs).
export const PRODUCTS = {
  aeroshield: { name: "AeroShield Clear MagSafe Case", tag: "Aerospace Grade", price: 1499, mrp: 2199, img: IMG.aeroshield, note: "Natural Titanium Ring", spec: "Qi2 15W Certified • 0.33mm Bezel Float" },
  optiglass: { name: "OptiGlass 9H Edge-to-Edge [2-Pack]", tag: "Optical Precision", price: 799, mrp: 1299, img: IMG.optiglass, note: "Includes EZ-Align Tray", spec: "Japanese Asahi AGC • 2.5D Polished Edges" },
  armormatrix: { name: "ArmorMatrix Rugged DropGuard", tag: "Mil-Grade", price: 1799, mrp: 2499, img: IMG.armormatrix, note: "Matte Black" },
  privacypro: { name: "PrivacyPro 28° Anti-Spy Glass", tag: "Privacy Filter", price: 999, mrp: 1499, img: IMG.optiglass, note: "28° Privacy Filter" },
  kickstand: { name: "ArmorMatrix Tactical Kickstand Module", tag: "Bundle", price: 699, mrp: 1499, img: IMG.armormatrix, note: "Space Grey Hinge" },
  frosted: { name: "AeroShield Frosted Matte Case", tag: "Everyday Slim", price: 1399, mrp: 1999, img: IMG.armormatrix, note: "Frosted Matte" },
  titanium: { name: "Titanium Edge MagSafe Shield", tag: "Aerospace Grade", price: 1899, mrp: 2699, img: IMG.armormatrix, note: "Titanium Edge" },
  optisingle: { name: "OptiGlass Ultra-Clear Single Pack", tag: "Optical Precision", price: 499, mrp: 899, img: IMG.optiglass, note: "Single Pack" },
  kickstandcase: { name: "ArmorMatrix Tactical Kickstand Case", tag: "Mil-Grade", price: 1999, mrp: 2799, img: IMG.armormatrix, note: "Integrated Kickstand" },
};

export const FREE_SHIPPING = 999;

export const inr = (n) => "₹" + n.toLocaleString("en-IN");

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [device, setDevice] = useState("iPhone 17 Pro");
  // Seeded with the two items shown in the Stitch cart design.
  const [cart, setCart] = useState([
    { id: "aeroshield", device: "iPhone 17 Pro", qty: 1 },
    { id: "optiglass", device: "iPhone 17 Pro", qty: 1 },
  ]);

  const addToCart = (id, qty = 1, forDevice = device) =>
    setCart((c) => {
      const hit = c.find((i) => i.id === id && i.device === forDevice);
      return hit
        ? c.map((i) => (i === hit ? { ...i, qty: i.qty + qty } : i))
        : [...c, { id, device: forDevice, qty }];
    });
  const setQty = (item, qty) =>
    setCart((c) => (qty < 1 ? c.filter((i) => i !== item) : c.map((i) => (i === item ? { ...i, qty } : i))));
  const clearCart = () => setCart([]);

  const lines = cart.map((i) => ({ ...i, ...PRODUCTS[i.id], item: i }));
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const mrpTotal = lines.reduce((s, l) => s + l.mrp * l.qty, 0);

  return (
    <StoreContext.Provider value={{ device, setDevice, lines, count, subtotal, mrpTotal, addToCart, setQty, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
