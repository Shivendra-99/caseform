import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./ui.jsx";
import { refreshShop, supabase } from "./db.js";

// "iPhone 17 Pro Max" -> series "iPhone 17"; anything else ("iPhone Air") is its own series until edited.
const seriesOf = (name) => name.trim().match(/^iPhone \d+/i)?.[0] ?? name.trim();
// SKU part from the name: "iPhone 17 Pro Max" -> 17PM, "iPhone Air" -> AIR; a digit is added if taken.
function suggestCode(name, taken) {
  const m = name.trim().match(/^iPhone\s*(\d+)?\s*(.*)$/i);
  const rest = (m?.[2] ?? "").split(/[\s/+]+/).filter(Boolean);
  const base = (m?.[1] ? m[1] + rest.map((w) => w[0]).join("") : rest.join("").slice(0, 3) || name.replace(/[^a-z0-9]/gi, "").slice(0, 3)).toUpperCase().slice(0, 6);
  return [base, ...[2, 3, 4, 5, 6, 7, 8, 9].map((n) => base.slice(0, 5) + n)].find((c) => c && !taken.has(c)) ?? "";
}

// /admin/models: the iPhone models the shop sells for. Models can be added (and renamed in Supabase),
// never removed: each one's position is part of every Shiprocket variant id and old orders point to it.
export default function Models() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null); // idx being switched
  const load = useCallback(() => {
    supabase
      .from("devices")
      .select("*")
      .order("idx")
      .then(({ data, error: e }) => (e ? setError(e.message) : setRows(data)));
  }, []);
  useEffect(load, [load]);

  const selling = rows ? rows.filter((d) => d.active !== false).length : 0;
  // "Remove" = stop selling: gone from the shop, kept for old orders and variant ids. Reversible.
  const toggle = async (d) => {
    const on = d.active === false;
    if (!on && !window.confirm(`Stop selling ${d.name}?\n\nIt disappears from the shop's model picker and can't be bought, including from bags that already have it. Old orders and SKUs keep working, and you can sell it again any time.`)) return;
    setBusy(d.idx);
    setError("");
    const { data, error: e } = await supabase.from("devices").update({ active: on }).eq("idx", d.idx).select("idx");
    setBusy(null);
    if (e || !data.length) return setError(e?.message ?? "This account isn't allowed to change models.");
    await refreshShop();
    load();
  };

  return (
    <div className="adm-page">
      <header className="adm-head">
        <h1>iPhone models</h1>
        <p>The models shoppers can pick. A new model shows up in the model picker, every product's stock grid and the Shiprocket feed.</p>
      </header>

      {error && (
        <p className="adm-miss" role="alert">{`Couldn't load models: ${error}`}</p>
      )}
      {rows ? (
        <>
          <AddModel rows={rows} onAdded={load} />
          <div className="adm-card adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Series</th>
                  <th scope="col">SKU code</th>
                  <th scope="col" className="col-opt">
                    Products without stock tracking
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...rows].reverse().map((d) => (
                  <tr key={d.idx} className={d.active === false ? "is-hidden" : undefined}>
                    <td className="adm-prod-name">{d.name}</td>
                    <td>{d.series}</td>
                    <td className="adm-mono">{d.code}</td>
                    <td className="col-opt">
                      {d.sells_untracked ? (
                        "Sold"
                      ) : (
                        <span className="adm-pill" data-tone="check">
                          Only with stock counts
                        </span>
                      )}
                    </td>
                    <td>
                      {d.active === false ? (
                        <span className="adm-pill" data-tone="todo">
                          Not sold
                        </span>
                      ) : (
                        "Selling"
                      )}
                    </td>
                    <td>
                      <div className="adm-row-actions">
                        <button type="button" className="adm-btn sm" disabled={busy !== null || (d.active !== false && selling === 1)} title={d.active !== false && selling === 1 ? "The shop needs at least one model" : undefined} onClick={() => toggle(d)} aria-label={`${d.active === false ? "Sell again" : "Stop selling"}: ${d.name}`}>
                          {busy === d.idx ? "Saving…" : d.active === false ? "Sell again" : "Stop selling"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="adm-help">Newest first. "Stop selling" is how a model is removed: it leaves the shop but stays here, because its position is part of every Shiprocket variant ID and old orders point to it. To fix a typo in a name, edit it in Supabase › Table Editor › devices.</p>
        </>
      ) : (
        !error && <div className="adm-card adm-skeleton" aria-busy="true" />
      )}
    </div>
  );
}

function AddModel({ rows, onAdded }) {
  const takenCodes = new Set(rows.map((d) => d.code));
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState({}); // series / code typed by hand stop following the name
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");

  const onName = (v) => {
    setName(v);
    if (!touched.series) setSeries(v.trim() ? seriesOf(v) : "");
    if (!touched.code) setCode(v.trim() ? suggestCode(v, takenCodes) : "");
    setErrors({});
    setDone("");
  };

  const add = async (e) => {
    e.preventDefault();
    const n = name.trim().replace(/\s+/g, " ");
    const errs = {};
    if (n.length < 3 || n.length > 40) errs.name = "Enter the model name, like iPhone 17 Pro Max.";
    else if (rows.some((d) => d.name.toLowerCase() === n.toLowerCase())) errs.name = "That model is already in the list.";
    if (series.trim().length < 2) errs.series = "Enter the group it lists under, like iPhone 17.";
    if (!/^[A-Z0-9]{1,6}$/.test(code)) errs.code = "Use 1 to 6 capital letters or numbers, like 17PM.";
    else if (takenCodes.has(code)) errs.code = "Another model already uses this code.";
    if (rows.length >= 100) errs.name = "The shop supports up to 100 models.";
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) return document.getElementById(`dm-${first}`)?.focus();

    setBusy(true);
    const { error } = await supabase.from("devices").insert({ idx: Math.max(-1, ...rows.map((d) => d.idx)) + 1, name: n, code, series: series.trim() });
    setBusy(false);
    if (error) return setErrors({ name: error.code === "23505" ? "That name, code or position is already taken. Reload and try again." : error.code === "42501" ? "This account isn't allowed to add models." : error.message });
    await refreshShop();
    setDone(n);
    setName("");
    setSeries("");
    setCode("");
    setTouched({});
    onAdded();
  };

  const field = (key, label, value, onChange, extra = {}) => (
    <div className="adm-field">
      <label htmlFor={`dm-${key}`}>{label}</label>
      <input id={`dm-${key}`} className={`adm-input${key === "code" ? " adm-mono" : ""}`} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={errors[key] ? true : undefined} aria-describedby={errors[key] ? `dm-${key}-err` : undefined} {...extra} />
      {errors[key] && (
        <p id={`dm-${key}-err`} className="adm-miss">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form className="adm-card adm-form-card" onSubmit={add} noValidate aria-labelledby="dm-title">
      <h2 id="dm-title">Add a model</h2>
      <div className="adm-form-grid three">
        {field("name", "Model name", name, onName, { placeholder: "iPhone 17 Pro Max", maxLength: 40 })}
        {field("series", "Lists under", series, (v) => (setSeries(v), setTouched((t) => ({ ...t, series: true }))), { placeholder: "iPhone 17", maxLength: 30 })}
        {field("code", "SKU code", code, (v) => (setCode(v.toUpperCase().replace(/[^A-Z0-9]/g, "")), setTouched((t) => ({ ...t, code: true }))), { placeholder: "17PM", maxLength: 6, spellCheck: "false" })}
      </div>
      <p className="adm-help">
        {"New models sell only products with a stock count for them, so existing covers aren't offered for a phone they don't fit. After adding, open each product that fits and enter its count in "}
        <strong>Stock by iPhone model</strong>.
      </p>
      {done && (
        <p className="adm-notice" role="status">
          <Icon name="check" size={16} />
          {`Added ${done}. `}
          <Link to="/admin/products" className="adm-link">
            Set stock for it in Products
          </Link>
        </p>
      )}
      <div>
        <button type="submit" className="adm-btn primary" disabled={busy}>
          <Icon name="plus" size={16} />
          {busy ? "Adding…" : "Add model"}
        </button>
      </div>
    </form>
  );
}
