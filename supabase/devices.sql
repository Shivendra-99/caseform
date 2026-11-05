-- iPhone models the shop sells for. Added in /admin › iPhone models. Run after schema.sql. Safe to re-run.
-- idx is the model's position in every Shiprocket variant id (product * 1000 + idx * 10 + finish), so
-- it never changes and models are never deleted; new models take the next number.
create table if not exists public.devices (
  idx int primary key check (idx between 0 and 99),
  name text not null unique check (length(name) between 3 and 40), -- "iPhone 17 Pro Max"
  code text not null unique check (code ~ '^[A-Z0-9]{1,6}$'), -- SKU part: SE-MA-17PM
  series text not null check (length(series) between 2 and 30), -- groups the model picker: "iPhone 17"
  -- Products without stock tracking sell only for models where this is true. New models start false, so
  -- old covers aren't offered for a new iPhone; give them stock counts per product instead.
  sells_untracked boolean not null default false,
  -- "Removing" a model = active false: hidden from the shop and never sold, but kept so variant ids and
  -- old orders keep matching. It can be switched back on.
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.devices enable row level security;
grant select on public.devices to anon, authenticated;
grant insert, update (name, series, sells_untracked, active) on public.devices to authenticated; -- idx and code are fixed once added
drop policy if exists "Anyone reads devices" on public.devices;
create policy "Anyone reads devices" on public.devices for select using (true);
drop policy if exists "Admins add devices" on public.devices;
create policy "Admins add devices" on public.devices for insert to authenticated with check (public.is_admin());
drop policy if exists "Admins rename devices" on public.devices;
create policy "Admins rename devices" on public.devices for update to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.devices (idx, name, code, series, sells_untracked) values
  (0, 'iPhone 16 Pro Max', '16PM', 'iPhone 16', true),
  (1, 'iPhone 16 Pro', '16P', 'iPhone 16', true),
  (2, 'iPhone 16 / 16 Plus', '16', 'iPhone 16', true),
  (3, 'iPhone 15 Series', '15', 'iPhone 15', true),
  (4, 'iPhone 14 Series', '14', 'iPhone 14', true),
  (5, 'iPhone 13 Series', '13', 'iPhone 13', true)
on conflict (idx) do nothing;
