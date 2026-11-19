-- =====================================================================
-- War or War · Supabase: cuentas, partidas en la nube, perfiles públicos
-- y ataques entre jugadores. Correr entero en el SQL Editor (una vez).
-- =====================================================================

-- ---------- Perfiles públicos (lo que ven los demás) ----------
-- No guarda el correo: eso queda en auth.users, que nadie puede leer desde el navegador.
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  alias         text unique,
  avatar        text not null default '⭐',
  motto         text not null default '',
  level         int  not null default 1,
  power         int  not null default 0,
  trophies      int  not null default 0,          -- solo lo cambia el servidor
  island        jsonb,                            -- edificios para mostrar la isla
  spec          jsonb,                            -- copia de las defensas para que te ataquen
  shield_until  timestamptz,                      -- solo lo cambia el servidor
  updated_at    timestamptz not null default now(),
  constraint alias_ok    check (alias is null or alias ~ '^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ _.\-]{3,16}$'),
  constraint avatar_ok   check (char_length(avatar) <= 16),
  constraint motto_ok    check (char_length(motto) <= 40),
  constraint level_ok    check (level between 1 and 99),
  constraint power_ok    check (power between 0 and 100000000),
  constraint island_size check (island is null or octet_length(island::text) < 20000),
  constraint spec_size   check (spec   is null or octet_length(spec::text)   < 8000)
);
create index if not exists profiles_trophies_idx on public.profiles (trophies desc);
create index if not exists profiles_alias_idx    on public.profiles (lower(alias) text_pattern_ops);

alter table public.profiles enable row level security;
drop policy if exists "perfiles: todos pueden ver"     on public.profiles;
drop policy if exists "perfiles: editar solo el mío"    on public.profiles;
create policy "perfiles: todos pueden ver"  on public.profiles for select using (true);
create policy "perfiles: editar solo el mío" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Permisos por columna: el jugador NO puede tocar trofeos, escudo ni id.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant update (alias, avatar, motto, level, power, island, spec, updated_at) on public.profiles to authenticated;

-- Cada cuenta nueva recibe su perfil automáticamente.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- Partidas (privadas: solo su dueño) ----------
create table if not exists public.saves (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       text not null,
  updated_at timestamptz not null default now(),
  constraint save_size check (octet_length(data) < 3000000)
);
alter table public.saves enable row level security;
drop policy if exists "partida: leer la mía"       on public.saves;
drop policy if exists "partida: crear la mía"      on public.saves;
drop policy if exists "partida: actualizar la mía" on public.saves;
create policy "partida: leer la mía"       on public.saves for select to authenticated using (user_id = (select auth.uid()));
create policy "partida: crear la mía"      on public.saves for insert to authenticated with check (user_id = (select auth.uid()));
create policy "partida: actualizar la mía" on public.saves for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
revoke all on public.saves from anon, authenticated;
grant select, insert, update on public.saves to authenticated;

-- ---------- Ataques entre jugadores (solo los escribe el servidor) ----------
create table if not exists public.attacks (
  id         uuid primary key default gen_random_uuid(),
  attacker   uuid not null references public.profiles(id) on delete cascade,
  defender   uuid not null references public.profiles(id) on delete cascade,
  seed       bigint not null,
  army       jsonb not null,
  mul        jsonb not null,
  spec       jsonb not null,
  win        boolean not null,
  destroyed  real not null default 0,
  surv       jsonb not null,
  d_att      int not null,
  d_def      int not null,
  loot       jsonb not null default '{}'::jsonb,
  claimed    boolean not null default false,
  def_seen   boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists attacks_attacker_idx on public.attacks (attacker, created_at desc);
create index if not exists attacks_defender_idx on public.attacks (defender, created_at desc);
alter table public.attacks enable row level security;
drop policy if exists "ataques: ver los míos" on public.attacks;
create policy "ataques: ver los míos" on public.attacks for select to authenticated
  using (attacker = (select auth.uid()) or defender = (select auth.uid()));
revoke all on public.attacks from anon, authenticated;
grant select on public.attacks to authenticated;

-- Aplica el resultado de un combate UNA sola vez, en una transacción.
-- Solo la puede llamar el servidor (Edge Function con la clave secreta).
create or replace function public.pvp_apply(
  p_att uuid, p_def uuid, p_seed bigint, p_army jsonb, p_mul jsonb, p_spec jsonb,
  p_win boolean, p_destroyed real, p_surv jsonb, p_loot jsonb
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare ta int; td int; sh timestamptz; da int; dd int; aid uuid;
begin
  if p_att = p_def then raise exception 'no podés atacarte'; end if;
  -- se bloquean las dos filas: dos ataques a la vez no pueden pisarse
  select trophies into ta from public.profiles where id = p_att for update;
  select trophies, shield_until into td, sh from public.profiles where id = p_def for update;
  if ta is null or td is null then raise exception 'perfil inexistente'; end if;
  if sh is not null and sh > now() then raise exception 'escudo activo'; end if;
  if exists (select 1 from public.attacks where attacker = p_att and created_at > now() - interval '20 seconds') then
    raise exception 'esperá unos segundos';
  end if;
  if (select count(*) from public.attacks where attacker = p_att and defender = p_def and created_at > now() - interval '24 hours') >= 3 then
    raise exception 'ya atacaste mucho a este jugador hoy';
  end if;
  if p_win then
    da := greatest(8, least(40, 25 + (td - ta) / 40));
    dd := -least(da, td);
  else
    da := -least(12, ta);
    dd := 6;
  end if;
  update public.profiles set trophies = trophies + da where id = p_att;
  update public.profiles set trophies = trophies + dd,
         shield_until = case when p_win then now() + interval '20 minutes' else shield_until end
   where id = p_def;
  insert into public.attacks (attacker, defender, seed, army, mul, spec, win, destroyed, surv, d_att, d_def, loot)
  values (p_att, p_def, p_seed, p_army, p_mul, p_spec, p_win, p_destroyed, p_surv, da, dd,
          case when p_win then p_loot else '{}'::jsonb end)
  returning id into aid;
  return jsonb_build_object('id', aid, 'd_att', da, 'd_def', dd, 'trophies', ta + da);
end $$;
revoke all on function public.pvp_apply(uuid,uuid,bigint,jsonb,jsonb,jsonb,boolean,real,jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.pvp_apply(uuid,uuid,bigint,jsonb,jsonb,jsonb,boolean,real,jsonb,jsonb) to service_role;

-- El atacante cobra botín y bajas UNA sola vez.
create or replace function public.claim_attack(p_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r public.attacks;
begin
  update public.attacks set claimed = true
   where id = p_id and attacker = (select auth.uid()) and claimed = false
  returning * into r;
  if r.id is null then return null; end if;
  return jsonb_build_object('id', r.id, 'win', r.win, 'loot', r.loot, 'army', r.army, 'surv', r.surv, 'd_att', r.d_att);
end $$;
revoke all on function public.claim_attack(uuid) from public, anon;
grant execute on function public.claim_attack(uuid) to authenticated;

-- El defensor marca como vistos los avisos de ataques.
create or replace function public.mark_seen(p_ids uuid[]) returns void
language sql security definer set search_path = '' as $$
  update public.attacks set def_seen = true where defender = (select auth.uid()) and id = any(p_ids);
$$;
revoke all on function public.mark_seen(uuid[]) from public, anon;
grant execute on function public.mark_seen(uuid[]) to authenticated;
