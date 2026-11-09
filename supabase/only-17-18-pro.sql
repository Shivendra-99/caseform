-- One-off: the shop now sells only for iPhone 17 Pro, 17 Pro Max, 18 Pro and 18 Pro Max.
-- Older models are switched off (same as "Stop selling" in /admin › iPhone models): hidden from the
-- shop and never sold, but kept because variant ids and old orders depend on them.
-- Run once in Supabase › SQL Editor, after devices.sql. Safe to re-run.

-- New models take the next idx numbers so existing Shiprocket variant ids don't move.
insert into public.devices (idx, name, code, series, sells_untracked) values
  (6, 'iPhone 17 Pro', '17P', 'iPhone 17', true),
  (7, 'iPhone 17 Pro Max', '17PM', 'iPhone 17', true),
  (8, 'iPhone 18 Pro', '18P', 'iPhone 18', true),
  (9, 'iPhone 18 Pro Max', '18PM', 'iPhone 18', true)
on conflict (idx) do nothing;

update public.devices set active = false where idx < 6;
