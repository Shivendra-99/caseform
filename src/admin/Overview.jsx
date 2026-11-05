import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, MODELS, MODEL_SERIES, isRetired, modelsText, optionsFor } from "../catalog.js";
import { BUSINESS, SOCIAL } from "../business.js";
import { Icon, SHIPROCKET_URL, isDrawn } from "./ui.jsx";

// Everything here is read from the code (catalog, business.js), so it's always true.
const ALL = Object.values(PRODUCTS);
const count = (cat) => ALL.filter((p) => p.cat === cat).length;
const VARIANTS = ALL.reduce((n, p) => n + MODELS.length * (optionsFor(p)?.length ?? 1), 0);
const DRAWN = ALL.filter(isDrawn);
const FIELD = { legalName: "legal name", address: "address", email: "support email", phone: "phone", hours: "support hours", gstin: "GSTIN", grievanceOfficer: "grievance officer", courtsCity: "courts city" };
const OPEN_FIELDS = Object.keys(FIELD).filter((k) => BUSINESS[k].startsWith("["));
const OPEN_SOCIAL = SOCIAL.filter((s) => new URL(s.url).pathname === "/");
const TONE = { done: "Done", todo: "To do", check: "Check" };

const STATS = [
  { label: "Products in the shop", value: ALL.length, note: `${count("covers")} covers · ${count("glass")} glass & lens · ${count("combos")} combo` },
  { label: "iPhone models", value: MODELS.filter((m) => !isRetired(m)).length, note: MODEL_SERIES.length > 1 ? `${MODEL_SERIES.at(-1).name} to ${MODEL_SERIES[0].name}` : MODEL_SERIES[0]?.name },
  { label: "Shiprocket variants", value: VARIANTS, note: "Every model × finish in the catalog feed" },
  { label: "Covers without a photo", value: DRAWN.length, note: "Shown as a drawing for now" },
];

function steps(origin) {
  const feed = `${origin}/api/catalog`;
  return [
    {
      title: "Business details",
      tone: OPEN_FIELDS.length ? "todo" : "done",
      body: OPEN_FIELDS.length ? `Still placeholders: ${modelsText(OPEN_FIELDS.map((k) => FIELD[k]))}. Policy pages show these, and payment providers check them.` : "All filled in.",
      where: "src/business.js",
    },
    {
      title: "Social links",
      tone: OPEN_SOCIAL.length ? "todo" : "done",
      body: OPEN_SOCIAL.length ? `${modelsText(OPEN_SOCIAL.map((s) => s.name))} still point to the platform's home page, not your account.` : "All point to your accounts.",
      where: "src/business.js",
    },
    {
      title: "Product photos",
      tone: DRAWN.length ? "todo" : "done",
      body: DRAWN.length ? `${DRAWN.length} covers show a drawing: ${modelsText(DRAWN.map((p) => p.name))}.` : "Every cover has a photo.",
      where: "Admin › Products › Edit › Photos",
    },
    { title: "Prices and weights", tone: "check", body: "Prices, MRPs and packed weights started as placeholders. Confirm them before launch; weight sets the shipping cost.", link: ["/admin/products", "Edit in Products"] },
    { title: "Supabase keys in Vercel", tone: "check", body: "Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (same values as .env.local) so the live site and checkout use the products you edit here. Without them they fall back to the built-in list.", where: "Vercel › Settings › Environment Variables" },
    { title: "Stock reservation key", tone: "check", body: "Add SUPABASE_SECRET_KEY (Supabase › Project Settings › API Keys › Secret keys) to Vercel. Checkout uses it to reserve stock so the last piece can't sell twice. Until it's set, checkout refuses bags with stock-tracked products rather than risk overselling.", where: "Vercel › Settings › Environment Variables (server only: no VITE_ prefix)" },
    { title: "Close public sign-ups", tone: "check", body: "Turn off \"Allow new users to sign up\" so nobody else can create an account. Strangers already can't edit anything, but there's no reason to let them in.", where: "Supabase › Authentication › Sign In / Providers" },
    { title: "Shiprocket Checkout keys", tone: "check", body: "Add SHIPROCKET_CHECKOUT_API_KEY and SHIPROCKET_CHECKOUT_SECRET, plus SHIPROCKET_CHECKOUT_ENV=production when you go live. Without them, checkout says it isn't switched on yet.", where: "Vercel › Settings › Environment Variables" },
    { title: "Order webhook", tone: "check", body: "Register this URL in Shiprocket Checkout so every new order reaches the site.", copy: [`${origin}/api/shiprocket/order`] },
    { title: "Catalog feed", tone: "check", body: "Give Shiprocket these URLs to sync products and collections.", copy: [`${feed}/products`, `${feed}/collections`, `${feed}/collection-products?collection_id=1`] },
    { title: "SMS sign-in", tone: "todo", body: "Sign-in accepts any 6-digit code until an SMS provider (MSG91, Twilio or Firebase) is connected." },
    { title: "Order storage", tone: "todo", body: "The webhook receives orders, but nothing stores them yet, so they can't be listed in this admin.", link: ["/admin/orders", "About orders"] },
  ];
}

function CopyField({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  return (
    <div className="adm-copy">
      <code className="adm-mono">{value}</code>
      <button type="button" className="adm-btn sm" onClick={copy}>
        <Icon name={copied ? "check" : "copy"} size={16} />
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

export default function Overview() {
  const list = steps(window.location.origin);
  const done = list.filter((s) => s.tone === "done").length;

  return (
    <div className="adm-page">
      <header className="adm-head">
        <h1>Overview</h1>
        <p>Your catalog at a glance, and what's left before launch.</p>
      </header>

      <section aria-label="Catalog numbers" className="adm-stats">
        {STATS.map((s) => (
          <div key={s.label} className="adm-card adm-stat">
            <span className="adm-stat-label">{s.label}</span>
            <span className="adm-stat-value">{s.value}</span>
            <span className="adm-stat-note">{s.note}</span>
          </div>
        ))}
      </section>

      <div className="adm-split">
        <section aria-labelledby="go-live" className="adm-card">
          <div className="adm-card-head">
            <div>
              <h2 id="go-live">Go-live checklist</h2>
              <p>{`${done} of ${list.length} done. "Check" items live outside the code, so confirm them yourself.`}</p>
            </div>
            <span className="adm-meter" aria-hidden="true">
              <span style={{ width: `${(done / list.length) * 100}%` }} />
            </span>
          </div>
          <ol className="adm-steps">
            {list.map((s) => (
              <li key={s.title}>
                <span className="adm-pill" data-tone={s.tone}>
                  {TONE[s.tone]}
                </span>
                <div className="adm-step-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  {s.copy?.map((v) => (
                    <CopyField key={v} value={v} />
                  ))}
                  {s.where && <p className="adm-where">{`Where: ${s.where}`}</p>}
                  {s.link && (
                    <Link to={s.link[0]} className="adm-link">
                      {s.link[1]}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside aria-labelledby="shortcuts" className="adm-card adm-shortcuts">
          <h2 id="shortcuts">Shortcuts</h2>
          <a href={SHIPROCKET_URL} target="_blank" rel="noopener noreferrer">
            <span>
              Shiprocket dashboard
              <small>Orders, shipping labels, returns</small>
            </span>
            <Icon name="external" size={16} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link to="/admin/products">
            <span>
              Products
              <small>Prices, SKUs and variant IDs</small>
            </span>
            <Icon name="products" size={16} />
          </Link>
          <Link to="/">
            <span>
              Storefront
              <small>See the shop as customers do</small>
            </span>
            <Icon name="store" size={16} />
          </Link>
          <Link to="/policies/shipping">
            <span>
              Policy pages
              <small>Shipping, returns, warranty, contact</small>
            </span>
            <Icon name="orders" size={16} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
