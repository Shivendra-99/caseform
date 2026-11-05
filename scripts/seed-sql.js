// Prints SQL that copies the bundled catalog (src/catalog.js) into the Supabase products table.
//   node scripts/seed-sql.js > supabase/seed.sql
// Existing rows are left alone, so it's safe to run again.
import { PRODUCTS } from "../src/catalog.js";

const q = (s) => `'${String(s).replaceAll("'", "''")}'`;
const arr = (list) => (list.length ? `array[${list.map(q).join(", ")}]` : "'{}'") + "::text[]";

const rows = Object.entries(PRODUCTS).map(([id, p], i) =>
  `  (${[q(id), p.num, q(p.code), q(p.kind), q(p.name), q(p.feat), q(p.badge ?? ""), p.price, p.mrp, p.grams, p.def ?? 0, arr(p.imgs ?? (p.img ? [p.img] : [])), arr(p.colors ?? []), arr(p.details ?? []), (i + 1) * 10].join(", ")})`,
);

console.log(`insert into public.products (id, num, code, kind, name, feat, badge, price, mrp, grams, def, imgs, colors, details, sort) values
${rows.join(",\n")}
on conflict (id) do nothing;`);
