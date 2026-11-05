-- Stock per variant (product × iPhone model × finish) and checkout reservations, so the last piece
-- can't be sold twice. Run after schema.sql in Supabase › SQL Editor. Safe to re-run.
--
-- How overselling is prevented:
--   * Starting checkout reserves stock with one guarded UPDATE per line (qty = qty - n WHERE qty >= n).
--     Postgres locks the row, so of two shoppers racing for the last piece exactly one succeeds; the
--     other gets "out_of_stock" and nothing is reserved for them (the whole call rolls back).
--   * The hold lasts p_minutes while they pay. Shiprocket's order webhook confirms it; abandoned holds
--     go back on the shelf (every 5 minutes, and before every new reservation).
--   * Admin edits are compare-and-set: a save names the count it started from, and is refused if a
--     sale changed it meanwhile, so an edit can't overwrite a sale.
-- A product with no stock rows isn't tracked: it sells for every model without a limit.

create table if not exists public.stock (
  variant_id int primary key check (variant_id > 0), -- product num * 1000 + model index * 10 + finish index
  product_id text not null references public.products(id) on delete cascade,
  qty int not null default 0 check (qty >= 0), -- available now (held pieces already taken out)
  updated_at timestamptz not null default now()
);
create index if not exists stock_product_idx on public.stock (product_id);

create table if not exists public.stock_holds (
  hold_id uuid not null,
  variant_id int not null,
  qty int not null check (qty > 0),
  status text not null default 'held' check (status in ('held', 'confirmed', 'released')),
  order_ref text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  primary key (hold_id, variant_id)
);
create index if not exists stock_holds_ref_idx on public.stock_holds (order_ref);
create index if not exists stock_holds_open_idx on public.stock_holds (expires_at) where status = 'held';

alter table public.stock enable row level security;
alter table public.stock_holds enable row level security;
grant select on public.stock to anon, authenticated; -- the shop shows "sold out"; writes go through the functions below
revoke all on public.stock_holds from anon, authenticated;
drop policy if exists "Anyone reads stock" on public.stock;
create policy "Anyone reads stock" on public.stock for select using (true);

-- Is this variant's product tracked (has any stock rows)?
create or replace function public.stock_tracked(p_variant int) returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.stock s join public.products p on p.id = s.product_id where p.num = p_variant / 1000) $$;

-- Puts abandoned holds back on the shelf. Returns how many variants got stock back.
create or replace function public.release_expired_holds() returns int
language plpgsql security definer set search_path = ''
as $$
declare n int;
begin
  with gone as (
    update public.stock_holds set status = 'released' where status = 'held' and expires_at < now() returning variant_id, qty
  ), back as (select variant_id, sum(qty)::int as q from gone group by variant_id)
  update public.stock s set qty = s.qty + b.q, updated_at = now() from back b where s.variant_id = b.variant_id;
  get diagnostics n = row_count;
  return n;
end $$;

-- Reserves every tracked line or nothing. p_items: [{"variant_id": 122030, "qty": 1}, ...].
-- Raises 'out_of_stock:<variant ids>' when any line can't be filled.
create or replace function public.reserve_stock(p_items jsonb, p_minutes int default 20) returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  hold uuid := gen_random_uuid();
  it record;
  short text[] := '{}';
begin
  perform public.release_expired_holds();
  for it in
    select (e ->> 'variant_id')::int as vid, sum((e ->> 'qty')::int)::int as n
    from jsonb_array_elements(p_items) e group by 1 order by 1 -- fixed order: no deadlocks between buyers
  loop
    if it.n is null or it.n < 1 then raise exception 'bad_quantity:%', it.vid; end if;
    continue when not public.stock_tracked(it.vid);
    update public.stock set qty = qty - it.n, updated_at = now() where variant_id = it.vid and qty >= it.n;
    if found then
      insert into public.stock_holds (hold_id, variant_id, qty, expires_at) values (hold, it.vid, it.n, now() + make_interval(mins => p_minutes));
    else
      short := short || it.vid::text;
    end if;
  end loop;
  if cardinality(short) > 0 then raise exception 'out_of_stock:%', array_to_string(short, ','); end if;
  return hold;
end $$;

create or replace function public.attach_hold(p_hold uuid, p_ref text) returns void
language sql security definer set search_path = ''
as $$ update public.stock_holds set order_ref = p_ref where hold_id = p_hold $$;

-- Checkout couldn't start after reserving: give the stock straight back.
create or replace function public.release_hold(p_hold uuid) returns void
language plpgsql security definer set search_path = ''
as $$
begin
  with gone as (
    update public.stock_holds set status = 'released', expires_at = now() where hold_id = p_hold and status = 'held' returning variant_id, qty
  )
  update public.stock s set qty = s.qty + g.qty, updated_at = now() from gone g where s.variant_id = g.variant_id;
end $$;

-- Called by Shiprocket's order webhook for a paid / COD order. Safe to call twice for the same order.
-- With a hold: confirms it (re-taking stock if the hold had expired). Without one (e.g. it was never
-- linked): takes the stock now. Returns 'ok' or 'oversold:<variant ids>' (needs a refund or restock).
create or replace function public.confirm_order(p_ref text, p_items jsonb) returns text
language plpgsql security definer set search_path = ''
as $$
declare
  h record;
  it record;
  short text[] := '{}';
  hold uuid := gen_random_uuid();
begin
  perform pg_advisory_xact_lock(hashtext(p_ref)); -- the same order delivered twice at once waits here
  if exists (select 1 from public.stock_holds where order_ref = p_ref) then
    for h in select * from public.stock_holds where order_ref = p_ref and status <> 'confirmed' order by variant_id for update loop
      if h.status = 'released' then
        update public.stock set qty = qty - h.qty, updated_at = now() where variant_id = h.variant_id and qty >= h.qty;
        if not found then short := short || h.variant_id::text; end if;
      end if;
      update public.stock_holds set status = 'confirmed' where hold_id = h.hold_id and variant_id = h.variant_id;
    end loop;
  else
    for it in select (e ->> 'variant_id')::int as vid, sum((e ->> 'qty')::int)::int as n from jsonb_array_elements(p_items) e group by 1 order by 1 loop
      continue when not public.stock_tracked(it.vid);
      update public.stock set qty = qty - it.n, updated_at = now() where variant_id = it.vid and qty >= it.n;
      if not found then short := short || it.vid::text; end if;
      insert into public.stock_holds (hold_id, variant_id, qty, status, order_ref, expires_at) values (hold, it.vid, it.n, 'confirmed', p_ref, now());
    end loop;
  end if;
  return case when cardinality(short) > 0 then 'oversold:' || array_to_string(short, ',') else 'ok' end;
end $$;

-- Admin stock edits. p_rows: [{"variant_id": 122030, "qty": 5 | null (stop selling), "expected": what the
-- admin saw (null if there was no row)}]. All rows save or none; a changed count raises 'stock_changed'.
create or replace function public.set_stock(p_product text, p_rows jsonb) returns void
language plpgsql security definer set search_path = ''
as $$
declare
  r record;
  cur int;
  pnum int := (select num from public.products where id = p_product);
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  if pnum is null then raise exception 'no_product:%', p_product; end if;
  for r in select (e ->> 'variant_id')::int as vid, (e ->> 'qty')::int as q, (e ->> 'expected')::int as ex from jsonb_array_elements(p_rows) e order by 1 loop
    if r.vid / 1000 <> pnum then raise exception 'wrong_product:%', r.vid; end if;
    select qty into cur from public.stock where variant_id = r.vid for update;
    if cur is distinct from r.ex then raise exception 'stock_changed:%', r.vid; end if;
    if r.q is null then
      delete from public.stock where variant_id = r.vid;
    elsif cur is null then
      insert into public.stock (variant_id, product_id, qty) values (r.vid, p_product, r.q);
    else
      update public.stock set qty = r.q, updated_at = now() where variant_id = r.vid;
    end if;
  end loop;
end $$;

-- Only the server (secret key) may reserve or confirm; only signed-in users may call set_stock (it checks is_admin).
revoke execute on function public.stock_tracked(int), public.release_expired_holds(), public.reserve_stock(jsonb, int), public.attach_hold(uuid, text), public.release_hold(uuid), public.confirm_order(text, jsonb), public.set_stock(text, jsonb) from public, anon, authenticated;
grant execute on function public.stock_tracked(int), public.release_expired_holds(), public.reserve_stock(jsonb, int), public.attach_hold(uuid, text), public.release_hold(uuid), public.confirm_order(text, jsonb) to service_role;
grant execute on function public.set_stock(text, jsonb) to authenticated, service_role;

-- Abandoned checkouts go back on the shelf every 5 minutes.
create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule('release-expired-holds', '*/5 * * * *', 'select public.release_expired_holds()');
