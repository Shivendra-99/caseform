-- SnapEdge database: the products the admin edits, product photos, and who counts as an admin.
-- Run in Supabase › SQL Editor. Safe to re-run.

create table if not exists public.products (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'), -- URL handle, e.g. "military"
  num int not null unique check (num > 0), -- Shiprocket product id: never change or reuse
  code text not null unique check (code ~ '^[A-Z0-9]{2,4}$'), -- SKU prefix: never change
  kind text not null check (kind in ('case', 'combo', 'glass', 'lens')),
  name text not null check (length(name) between 2 and 120),
  feat text not null default '',
  badge text not null default '' check (badge in ('', 'best', 'new', 'sale')),
  price int not null check (price > 0),
  mrp int not null check (mrp >= price),
  grams int not null default 40 check (grams > 0),
  def int not null default 0 check (def between 0 and 3), -- drawing colour / default glass finish
  imgs text[] not null default '{}', -- photos, main one first
  active boolean not null default true, -- false = hidden from the shop
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Cover colours, in sale order: a colour's position is the last digit of its variant id, so add new ones
-- at the end and never reorder or remove them. details = the full feature list on the product page.
alter table public.products add column if not exists colors text[] not null default '{}' check (cardinality(colors) <= 10);
alter table public.products add column if not exists details text[] not null default '{}';

create table if not exists public.admins (email text primary key);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admins where email = auth.jwt() ->> 'email') $$;

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();

alter table public.products enable row level security;
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update on public.products to authenticated;

drop policy if exists "Shop reads visible products" on public.products;
create policy "Shop reads visible products" on public.products for select using (active or public.is_admin());
drop policy if exists "Admins add products" on public.products;
create policy "Admins add products" on public.products for insert to authenticated with check (public.is_admin());
drop policy if exists "Admins edit products" on public.products;
create policy "Admins edit products" on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());
-- No delete policy on purpose: hide a product instead, so its Shiprocket ids are never reused.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "Admins upload product images" on storage.objects;
create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
drop policy if exists "Admins replace product images" on storage.objects;
create policy "Admins replace product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin());
drop policy if exists "Admins remove product images" on storage.objects;
create policy "Admins remove product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());

-- Who can use /admin. Sign in there with this email (create the user in Authentication › Users).
insert into public.admins (email) values ('shivendrasonkar001@gmail.com') on conflict do nothing;
