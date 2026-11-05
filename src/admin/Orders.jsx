import { useState } from "react";
import { Link } from "react-router-dom";
import { inr } from "../catalog.js";
import { Icon, SHIPROCKET_URL, Thumb, storeUrl, variantsOf } from "./ui.jsx";
import { useProducts } from "./db.js";

// Orders aren't stored on the site yet, so this page points to Shiprocket and helps read a
// Shiprocket order: paste a line's variant ID or SKU to see which product it is (hidden ones too).
export default function Orders() {
  const { rows } = useProducts();
  const [query, setQuery] = useState("");
  const variants = rows ? rows.flatMap((r) => variantsOf(r.id, r.p).map((v) => ({ ...v, pid: r.id, p: r.p, active: r.active }))) : [];
  const example = variants.find((v) => v.sku === "SE-MA-15") ?? variants[0];
  const q = query.trim().toUpperCase();
  const hit = q && variants.find((v) => String(v.id) === q || v.sku === q);

  return (
    <div className="adm-page">
      <header className="adm-head">
        <h1>Orders</h1>
        <p>Payments and orders run through Shiprocket Checkout.</p>
      </header>

      <section className="adm-card adm-empty adm-empty-left" aria-labelledby="no-orders">
        <span className="adm-empty-icon">
          <Icon name="orders" size={22} />
        </span>
        <h2 id="no-orders" className="adm-empty-title">
          Orders aren't saved on this site yet
        </h2>
        <p>Every order is created in your Shiprocket account, where you print labels and track shipments. The site's webhook also receives each order, but nothing stores it yet, so orders can't be listed here.</p>
        <p>Next step: save orders to Supabase from api/shiprocket/order.js, and they'll show up on this page.</p>
        <a href={SHIPROCKET_URL} target="_blank" rel="noopener noreferrer" className="adm-btn primary">
          Open Shiprocket
          <Icon name="external" size={16} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>

      <section className="adm-card adm-lookup" aria-labelledby="lookup">
        <h2 id="lookup">Look up an order line</h2>
        <p>Paste the variant ID or SKU from a Shiprocket order to see exactly which cover or glass to pack.</p>
        <label className="adm-search">
          <Icon name="search" size={16} />
          <span className="sr-only">Variant ID or SKU</span>
          <input className="adm-input adm-mono" placeholder={example ? `e.g. ${example.id} or ${example.sku}` : "Loading products…"} value={query} onChange={(e) => setQuery(e.target.value)} spellCheck="false" autoComplete="off" />
        </label>
        <div aria-live="polite">
          {hit ? (
            <div className="adm-hit">
              <Thumb p={hit.p} size={56} />
              <div className="adm-hit-body">
                <span className="adm-prod-name">{hit.p.name}</span>
                <span>{hit.title}</span>
                <span className="adm-mono adm-muted">{`${hit.sku} · ${hit.id} · ${inr(hit.p.price)}${hit.active ? "" : " · hidden from the shop"}`}</span>
              </div>
              <Link to={hit.active ? storeUrl(hit.pid, hit.p) : `/admin/products/${hit.pid}`} className="adm-btn sm">
                {hit.active ? "View in store" : "Open product"}
              </Link>
            </div>
          ) : (
            q.length >= 6 && example && <p className="adm-miss">{`Nothing matches "${query.trim()}". Variant IDs are 6 digits (like ${example.id}); SKUs look like ${example.sku}.`}</p>
          )}
        </div>
      </section>
    </div>
  );
}
