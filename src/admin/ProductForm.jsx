import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CORE_PRODUCTS, MODELS, inr, isRetired, optionsFor, variantId } from "../catalog.js";
import { Icon } from "./ui.jsx";
import { BUCKET, refreshShop, supabase, useProducts } from "./db.js";

const KINDS = [
  ["case", "Cover"],
  ["combo", "Combo (cover + glass)"],
  ["glass", "Screen glass"],
  ["lens", "Camera lens glass"],
];
const BADGE_OPTS = [
  ["", "None"],
  ["new", "New"],
  ["best", "Best seller"],
  ["sale", "Sale"],
];
const GRAMS = { case: 40, combo: 125, glass: 80, lens: 25 };
const TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;

const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
// SKU prefix from the name's initials (DualTek Air -> DA); adds a digit if that's taken (DA2).
function suggestCode(name, taken) {
  const words = name.toUpperCase().replace(/[^A-Z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  const base = (words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? "").slice(0, 2)).padEnd(2, "X");
  return [base, ...[2, 3, 4, 5, 6, 7, 8, 9].map((n) => base + n)].find((c) => !taken.has(c));
}
const whole = (v) => (/^\d+$/.test(String(v).trim()) ? Number(v) : NaN);

function friendly(err) {
  if (err.code === "23505") return "That handle or SKU prefix is already used by another product. Change it and save again.";
  if (err.code === "42501") return "This account isn't allowed to edit products.";
  if (/stock_changed/.test(err.message)) return "Someone bought this while you were editing, so the stock changed. Reload the page to see the latest counts, then save again.";
  return err.message || "Something went wrong. Please try again.";
}

// /admin/products/new and /admin/products/:id. The type, handle, SKU prefix and Shiprocket id are
// fixed once a product exists, because Shiprocket orders and SKUs point at them.
export default function ProductForm() {
  const { id } = useParams();
  const { rows, error } = useProducts();
  if (error)
    return (
      <div className="adm-page">
        <p role="alert" className="adm-miss">{`Couldn't load products: ${error}`}</p>
      </div>
    );
  if (!rows) return <div className="adm-page adm-card adm-skeleton" aria-busy="true" />;
  const row = id && rows.find((r) => r.id === id);
  if (id && !row)
    return (
      <div className="adm-page">
        <div className="adm-card adm-empty">
          <p className="adm-empty-title">{`No product called "${id}".`}</p>
          <Link to="/admin/products" className="adm-btn">
            Back to products
          </Link>
        </div>
      </div>
    );
  return <Form key={id ?? "new"} row={row} rows={rows} />;
}

function Form({ row, rows }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editing = Boolean(row);
  const takenIds = new Set(rows.map((r) => r.id));
  const takenCodes = new Set(rows.map((r) => r.p.code));
  const [f, setF] = useState(() =>
    row
      ? { name: row.p.name, kind: row.p.kind, id: row.id, code: row.p.code, feat: row.p.feat, colors: (row.p.colors ?? []).join(", "), details: (row.p.details ?? []).join("\n"), price: String(row.p.price), mrp: String(row.p.mrp), badge: row.p.badge ?? "", grams: String(row.p.grams), active: row.active }
      : { name: "", kind: "case", id: "", code: "", feat: "", colors: "", details: "", price: "", mrp: "", badge: "new", grams: String(GRAMS.case), active: true },
  );
  const [touched, setTouched] = useState({}); // handle / SKU typed by hand stop following the name
  const [photos, setPhotos] = useState(() => (row?.p.imgs ?? []).map((src) => ({ src })));
  const [errors, setErrors] = useState({});
  const [fail, setFail] = useState("");
  const [busy, setBusy] = useState(false);
  const core = editing && CORE_PRODUCTS.includes(row.id);
  // Stock per variant. `startStock` is what was loaded; saves send it as "expected", so a sale made
  // meanwhile makes the save fail instead of being overwritten. Blank cell = not sold for that model.
  const num = editing ? row.p.num : Math.max(0, ...rows.map((r) => r.p.num)) + 1;
  const startStock = row?.stock ?? {};
  const [track, setTrack] = useState(Object.keys(startStock).length > 0);
  const [counts, setCounts] = useState(() => Object.fromEntries(Object.entries(startStock).map(([v, q]) => [v, String(q)])));
  const [fillAll, setFillAll] = useState("");
  const colorList = f.kind === "case" ? f.colors.split(/[,/]/).map((c) => c.trim()).filter(Boolean) : [];
  const detailList = f.details.split("\n").map((d) => d.trim()).filter(Boolean);
  const opts = optionsFor({ kind: f.kind, colors: colorList });
  const cells = MODELS.flatMap((model, mi) => (opts ?? [null]).map((o, oi) => ({ vid: variantId({ num }, mi, oi), model, o })));
  const shown = cells.filter((c) => !isRetired(c.model)); // removed models keep their counts, out of sight
  const stockChanges = () => {
    const ids = new Set([...Object.keys(startStock), ...cells.map((c) => String(c.vid))]);
    return [...ids]
      .map((k) => {
        const v = (counts[k] ?? "").trim();
        const want = track && v !== "" && cells.some((c) => String(c.vid) === k) ? whole(v) : null;
        return { variant_id: Number(k), qty: want, expected: startStock[k] ?? null };
      })
      .filter((r) => r.qty !== r.expected);
  };
  const setStock = (product) => supabase.rpc("set_stock", { p_product: product, p_rows: stockChanges() });

  const set = (key) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setF((old) => {
      const next = { ...old, [key]: v };
      if (!editing && key === "name") {
        if (!touched.id) next.id = slug(v);
        if (!touched.code) next.code = v.trim() ? suggestCode(v, takenCodes) : "";
      }
      if (!editing && key === "kind" && !touched.grams) next.grams = String(GRAMS[v]);
      return next;
    });
    if (key === "id" || key === "code" || key === "grams") setTouched((t) => ({ ...t, [key]: true }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const addFiles = (files) => {
    const bad = [];
    const ok = [...files].filter((file) => {
      if (!TYPES.includes(file.type)) bad.push(`${file.name} isn't a JPG, PNG or WebP image.`);
      else if (file.size > MAX_MB * 1024 * 1024) bad.push(`${file.name} is over ${MAX_MB} MB.`);
      else return true;
      return false;
    });
    setPhotos((list) => [...list, ...ok.map((file) => ({ src: URL.createObjectURL(file), file }))]);
    setErrors((x) => ({ ...x, photos: bad.length ? bad.join(" ") : undefined }));
  };
  const move = (i, d) => setPhotos((list) => {
    const next = [...list];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    return next;
  });
  const remove = (i) => setPhotos((list) => list.filter((_, k) => k !== i));

  const validate = () => {
    const e = {};
    const price = whole(f.price), mrp = whole(f.mrp), grams = whole(f.grams);
    if (f.name.trim().length < 2) e.name = "Enter a product name.";
    if (!editing) {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(f.id)) e.id = "Use lowercase letters, numbers and single hyphens, like dualtek-air.";
      else if (takenIds.has(f.id)) e.id = "Another product already uses this handle.";
      if (!/^[A-Z0-9]{2,4}$/.test(f.code)) e.code = "Use 2 to 4 capital letters or numbers, like DA.";
      else if (takenCodes.has(f.code)) e.code = "Another product already uses this SKU prefix.";
    }
    if (!(price > 0)) e.price = "Enter the selling price in whole rupees.";
    if (!(mrp > 0)) e.mrp = "Enter the MRP in whole rupees.";
    else if (price > 0 && mrp < price) e.mrp = "MRP can't be lower than the selling price.";
    if (!(grams > 0)) e.grams = "Enter the packed weight in grams.";
    // A colour's position is part of its variant id, so saved colours must stay first, in order.
    const was = row?.p.colors ?? [];
    if (new Set(colorList.map((c) => c.toLowerCase())).size < colorList.length) e.colors = "Each colour can only be listed once.";
    else if (colorList.length > 10) e.colors = "Up to 10 colours.";
    else if (was.some((c, k) => colorList[k] !== c)) e.colors = `Keep ${was.join(", ")} first and in that order; add new colours after them. (Old orders and stock counts use each colour's position.)`;
    if (track) {
      const vals = shown.map((c) => (counts[c.vid] ?? "").trim());
      if (vals.some((v) => v !== "" && Number.isNaN(whole(v)))) e.stock = "Counts must be whole numbers: 0 or more.";
      else if (vals.every((v) => v === "")) e.stock = "Enter a count for at least one model, or turn stock tracking off.";
    }
    return e;
  };

  const save = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    const first = Object.keys(errs).find((k) => errs[k]);
    if (first) {
      setFail("Not saved yet: fix the fields marked in red.");
      return document.getElementById(`pf-${first}`)?.focus();
    }
    setBusy(true);
    setFail("");
    try {
      // Upload new photos first, keeping the ones already done so a retry doesn't upload twice.
      const done = [];
      for (const ph of photos) {
        if (!ph.file) {
          done.push(ph);
          continue;
        }
        const path = `${f.id}/${crypto.randomUUID()}.${ph.file.type.split("/")[1]}`;
        const { error } = await supabase.storage.from(BUCKET).upload(path, ph.file, { contentType: ph.file.type, cacheControl: "31536000" });
        if (error) throw error;
        done.push({ src: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl });
      }
      setPhotos(done);

      const fields = { name: f.name.trim(), feat: f.feat.trim(), colors: colorList, details: detailList, badge: f.badge, price: whole(f.price), mrp: whole(f.mrp), grams: whole(f.grams), imgs: done.map((ph) => ph.src), active: core || f.active };
      const changes = stockChanges().length > 0;
      if (editing && changes) {
        // Stock first: if a sale changed it meanwhile, nothing is saved and the admin reloads.
        const { error } = await setStock(row.id);
        if (error) throw error;
      }
      const { data, error } = editing
        ? await supabase.from("products").update(fields).eq("id", row.id).select("id")
        : await supabase
            .from("products")
            // A stock-tracked product starts hidden until its counts are saved, so it can't sell unlimited.
            .insert({ ...fields, active: track ? false : fields.active, id: f.id, code: f.code, kind: f.kind, def: 0, num, sort: Math.max(0, ...rows.map((r) => r.sort)) + 10 })
            .select("id");
      if (error) throw error;
      if (!data.length) throw Object.assign(new Error("not allowed"), { code: "42501" }); // an update RLS refuses changes 0 rows instead of failing
      if (!editing && changes) {
        const { error: stockError } = await setStock(f.id);
        if (stockError) {
          await refreshShop();
          return navigate(`/admin/products/${f.id}`, { replace: true, state: { notice: `"${fields.name}" was added but kept hidden, because its stock didn't save (${stockError.message}). Check the counts and save again.` } });
        }
        if (fields.active) await supabase.from("products").update({ active: true }).eq("id", f.id);
      }
      await refreshShop();
      navigate("/admin/products", { state: { saved: fields.name } });
    } catch (err) {
      setFail(friendly(err));
      setBusy(false);
    }
  };

  const price = whole(f.price), mrp = whole(f.mrp);
  const variants = MODELS.length * (opts?.length ?? 1); // removed models keep their variant ids too
  const field = (key, label, input, help) => (
    <div className="adm-field">
      <label htmlFor={`pf-${key}`}>{label}</label>
      {input}
      {(errors[key] || help) && (
        <p id={`pf-${key}-help`} className={errors[key] ? "adm-miss" : "adm-help"}>
          {errors[key] || help}
        </p>
      )}
    </div>
  );
  const aria = (key) => ({ id: `pf-${key}`, "aria-invalid": errors[key] ? true : undefined, "aria-describedby": `pf-${key}-help` });

  return (
    <form className="adm-page adm-form" onSubmit={save} noValidate>
      {state?.notice && (
        <p className="adm-miss adm-banner" role="alert">
          {state.notice}
        </p>
      )}
      <header className="adm-head adm-head-row">
        <div>
          <Link to="/admin/products" className="adm-back">
            <Icon name="left" size={16} />
            Products
          </Link>
          <h1>{editing ? row.p.name : "Add a product"}</h1>
          <p>{editing ? `SE-${row.p.code} · Shiprocket #${row.p.num}` : "It appears in the shop as soon as you save."}</p>
        </div>
      </header>

      <section className="adm-card adm-form-card" aria-labelledby="pf-details">
        <h2 id="pf-details">Details</h2>
        {field("name", "Name", <input {...aria("name")} className="adm-input" value={f.name} onChange={set("name")} maxLength={120} autoFocus={!editing} />)}
        <div className="adm-form-grid">
          {field(
            "kind",
            "Type",
            <select {...aria("kind")} className="adm-input" value={f.kind} onChange={set("kind")} disabled={editing}>
              {KINDS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>,
            editing ? "Fixed after creation." : `${variants} Shiprocket variants (${opts ? `${MODELS.length} models × ${opts.length} ${f.kind === "glass" ? "finishes" : "colours"}` : "one per iPhone model"}).`,
          )}
          {field(
            "badge",
            "Badge",
            <select {...aria("badge")} className="adm-input" value={f.badge} onChange={set("badge")}>
              {BADGE_OPTS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>,
          )}
        </div>
        {field("feat", "Highlights", <input {...aria("feat")} className="adm-input" value={f.feat} onChange={set("feat")} placeholder="Slim clear shell · Ring kickstand · MagSafe" maxLength={160} />, "Short phrases separated by · (shown on cards and at the top of the product page).")}
        {f.kind === "case" && field("colors", "Colours", <input {...aria("colors")} className="adm-input" value={f.colors} onChange={set("colors")} placeholder="Orange, Black, Blue, Burgundy" />, "Separate with commas. Leave blank for a single unnamed colour. Add new colours at the end.")}
        {field("details", "Full feature list", <textarea {...aria("details")} className="adm-input" rows={5} value={f.details} onChange={set("details")} placeholder={"Ultra protective, 20 ft drop test certified\nBuilt-in bumpers for corner impact protection"} />, "One feature per line. Shown in the product page's Description.")}
        <div className="adm-form-grid">
          {field("id", "Handle (web address)", <input {...aria("id")} className="adm-input adm-mono" value={f.id} onChange={set("id")} disabled={editing} spellCheck="false" />, editing ? "Fixed after creation." : `/product?id=${f.id || "…"}`)}
          {field("code", "SKU prefix", <input {...aria("code")} className="adm-input adm-mono" value={f.code} onChange={(e) => set("code")({ target: { type: "text", value: e.target.value.toUpperCase() } })} disabled={editing} maxLength={4} spellCheck="false" />, editing ? "Fixed after creation." : `SKUs look like SE-${f.code || "XX"}-15.`)}
        </div>
      </section>

      <section className="adm-card adm-form-card" aria-labelledby="pf-pricing">
        <h2 id="pf-pricing">Price and shipping</h2>
        <div className="adm-form-grid three">
          {field("price", "Selling price (₹)", <input {...aria("price")} className="adm-input" inputMode="numeric" value={f.price} onChange={set("price")} placeholder="899" />)}
          {field("mrp", "MRP (₹)", <input {...aria("mrp")} className="adm-input" inputMode="numeric" value={f.mrp} onChange={set("mrp")} placeholder="1499" />)}
          {field("grams", "Packed weight (g)", <input {...aria("grams")} className="adm-input" inputMode="numeric" value={f.grams} onChange={set("grams")} />, "Sets the shipping cost.")}
        </div>
        {price > 0 && mrp >= price && <p className="adm-help">{`Shows as ${inr(price)}${mrp > price ? `, ${inr(mrp)} struck through, ${Math.round((1 - price / mrp) * 100)}% off` : " (no discount)"}. Prices include GST.`}</p>}
      </section>

      <section className="adm-card adm-form-card" aria-labelledby="pf-stock-title">
        <h2 id="pf-stock-title">Stock by iPhone model</h2>
        <label className="adm-check">
          <input type="checkbox" checked={track} onChange={(e) => setTrack(e.target.checked)} />
          <span>
            Track stock
            <small>{track ? "Only models with a count are sold. 0 means sold out. Pieces in an unfinished checkout are already taken out of these numbers." : "Off: no limit, for every iPhone model that sells untracked products (see iPhone models). Models you add later need counts here."}</small>
          </span>
        </label>
        {track && (
          <>
            <div className="adm-fill">
              <label htmlFor="pf-fill">Set every model to</label>
              <input id="pf-fill" className="adm-input adm-qty" inputMode="numeric" value={fillAll} onChange={(e) => setFillAll(e.target.value)} placeholder="10" />
              <button type="button" className="adm-btn" disabled={Number.isNaN(whole(fillAll))} onClick={() => setCounts((x) => ({ ...x, ...Object.fromEntries(shown.map((c) => [c.vid, String(whole(fillAll))])) }))}>
                Apply
              </button>
            </div>
            <div className="adm-stock-wrap">
              <table className="adm-table adm-stock-table">
                <thead>
                  <tr>
                    <th scope="col">iPhone model</th>
                    {(opts ?? [{ name: "Pieces" }]).map((o) => (
                      <th key={o.name} scope="col" className="num">
                        {o.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MODELS.filter((m) => !isRetired(m)).map((model) => (
                    <tr key={model}>
                      <th scope="row">{model}</th>
                      {cells
                        .filter((c) => c.model === model)
                        .map((c) => (
                          <td key={c.vid} className="num">
                            <input
                              id={c === shown[0] ? "pf-stock" : undefined}
                              aria-label={`${model}${c.o ? `, ${c.o.name}` : ""}: pieces in stock`}
                              aria-invalid={errors.stock ? true : undefined}
                              className="adm-input adm-qty"
                              inputMode="numeric"
                              placeholder="–"
                              value={counts[c.vid] ?? ""}
                              onChange={(e) => {
                                setCounts((x) => ({ ...x, [c.vid]: e.target.value.replace(/\D/g, "") }));
                                if (errors.stock) setErrors((x) => ({ ...x, stock: undefined }));
                              }}
                            />
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={errors.stock ? "adm-miss" : "adm-help"} role={errors.stock ? "alert" : undefined}>
              {errors.stock || "Leave a cell blank if you don't sell it for that model."}
            </p>
          </>
        )}
      </section>

      <section className="adm-card adm-form-card" aria-labelledby="pf-photos">
        <h2 id="pf-photos">Photos</h2>
        <p className="adm-help">The first photo is the main one. JPG, PNG or WebP, up to {MAX_MB} MB each. Without a photo the shop shows a drawing.</p>
        <div
          className="adm-photos"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
        >
          {photos.map((ph, i) => (
            <figure key={ph.src} className="adm-photo">
              <span className="adm-thumb">
                <img src={ph.src} alt={`Photo ${i + 1}`} />
              </span>
              {i === 0 && <span className="adm-photo-main">Main</span>}
              <div className="adm-photo-actions">
                <button type="button" aria-label={`Move photo ${i + 1} earlier`} disabled={i === 0} onClick={() => move(i, -1)}>
                  <Icon name="left" size={14} />
                </button>
                <button type="button" aria-label={`Move photo ${i + 1} later`} disabled={i === photos.length - 1} onClick={() => move(i, 1)}>
                  <Icon name="right" size={14} />
                </button>
                <button type="button" aria-label={`Remove photo ${i + 1}`} onClick={() => remove(i)}>
                  <Icon name="close" size={14} />
                </button>
              </div>
            </figure>
          ))}
          <label className="adm-photo-add">
            <Icon name="upload" />
            <span>Add photos</span>
            <small>or drop them here</small>
            <input id="pf-photos-input" type="file" accept={TYPES.join(",")} multiple className="sr-only" onChange={(e) => (addFiles(e.target.files), (e.target.value = ""))} />
          </label>
        </div>
        {errors.photos && (
          <p className="adm-miss" role="alert">
            {errors.photos}
          </p>
        )}
      </section>

      <section className="adm-card adm-form-card" aria-labelledby="pf-visibility">
        <h2 id="pf-visibility">Visibility</h2>
        <label className="adm-check">
          <input type="checkbox" checked={core || f.active} onChange={set("active")} disabled={core} />
          <span>
            Show in the shop
            <small>{core ? "The glass add-on and Complete the set use this product, so it always stays visible." : "Hidden products disappear from the shop and the Shiprocket feed, but keep their IDs so old orders still match."}</small>
          </span>
        </label>
      </section>

      <div className="adm-form-bar">
        {fail && (
          <p className="adm-miss" role="alert">
            {fail}
          </p>
        )}
        <Link to="/admin/products" className="adm-btn">
          Cancel
        </Link>
        <button type="submit" className="adm-btn primary" disabled={busy}>
          {busy ? "Saving…" : editing ? "Save changes" : "Add product"}
        </button>
      </div>
    </form>
  );
}
