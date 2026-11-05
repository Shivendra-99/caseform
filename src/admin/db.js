import { useCallback, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { fromRow, loadProducts } from "../catalog.js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Admin-only Supabase client. It carries the signed-in admin's session, which is what lets row-level
// security (supabase/schema.sql) accept their edits. null when the env vars aren't set.
export const supabase = URL && KEY ? createClient(URL, KEY) : null;
export const BUCKET = "product-images";

// After a save, refresh the shop's catalog in this tab too (Overview, Orders, the storefront).
export const refreshShop = () => loadProducts(URL, KEY, { maxAge: 0 }).catch(() => {});

const toRow = (r) => {
  const stock = Object.fromEntries(r.stock.map((s) => [s.variant_id, s.qty]));
  return { id: r.id, active: r.active, sort: r.sort, stock, p: { ...fromRow(r), stock: r.stock.length ? stock : undefined } };
};

// Every product including hidden ones, in shop order: [{ id, active, sort, stock, p }] where p is the
// same shape as PRODUCTS[id] and stock is { variantId: qty } (empty when stock isn't tracked).
export function useProducts() {
  const [state, setState] = useState({ rows: null, error: null });
  const load = useCallback(() => {
    supabase
      .from("products")
      .select("*, stock(variant_id, qty)")
      .order("sort")
      .order("num")
      .then(({ data, error }) => setState(error ? { rows: null, error: error.message } : { rows: data.map(toRow), error: null }));
  }, []);
  useEffect(load, [load]);
  return { ...state, reload: load };
}
