// War or War · Edge Function "pvp": resuelve un ataque entre jugadores en el servidor.
// - Verifica quién llama (sesión de Supabase Auth).
// - Lee la partida PRIVADA del atacante para validar que tiene esas tropas y sus mejoras.
// - Lee la copia guardada de la isla del defensor (aunque esté desconectado).
// - Corre el MISMO simulador que el juego (sim.js, generado desde el código del juego) con una semilla del servidor.
// - Aplica trofeos, escudo y botín una sola vez con la función SQL pvp_apply.
import { createClient } from "npm:@supabase/supabase-js@2";
import { simPvp, U, DEFS } from "./sim.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json" } });

// Clave secreta del proyecto: la nueva (SUPABASE_SECRET_KEYS) o la clásica (service_role).
function secretKey(): string {
  try { const k = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); if (k.default) return k.default; } catch (_) { /* nada */ }
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
}
const num = (v: unknown, a: number, b: number, d: number) => { const n = Number(v); return Number.isFinite(n) ? Math.max(a, Math.min(b, n)) : d; };

// Lo que publica cada jugador no es confiable: solo defensas y tropas conocidas, con valores acotados.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanSpec(s: any) {
  if (!s || !Array.isArray(s.defs)) return null;
  const units: Record<string, number> = {}, um: Record<string, number[]> = {};
  for (const k in s.units || {}) {
    // deno-lint-ignore no-explicit-any
    const u = (U as any)[k];
    if (!u || u.hero || u.nav) continue;
    units[k] = num(s.units[k], 0, 10, 0) | 0;
    const m = (s.um && s.um[k]) || [1, 1];
    um[k] = [num(m[0], 1, 2.2, 1), num(m[1], 1, 3.6, 1)];
  }
  return {
    // deno-lint-ignore no-explicit-any
    defs: s.defs.filter((d: any) => d && (DEFS as any)[d.k] && d.k !== "hq").slice(0, 10)
      // deno-lint-ignore no-explicit-any
      .map((d: any) => ({ k: String(d.k), c: num(d.c, 0, 10, 5) | 0, r: num(d.r, 1, 7, 3) | 0, m: num(d.m, 1, 3, 1) })),
    units, um, k: 1,
    hq: num(s.hq, 300, 25000, 600), hqd: num(s.hqd, 0, 220, 10),
    walls: num(s.walls, 0, 22, 0) | 0, map: "normal", seed: 7,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
  try {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, secretKey(), { auth: { persistSession: false, autoRefreshToken: false } });
    const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: ud, error: ue } = await admin.auth.getUser(jwt);
    const user = ud?.user;
    if (ue || !user) return json({ error: "Tenés que iniciar sesión" }, 401);

    const body = await req.json().catch(() => ({}));
    if (body.action !== "attack") return json({ error: "Acción desconocida" }, 400);
    const def = String(body.defender || "");
    if (!/^[0-9a-f-]{36}$/i.test(def) || def === user.id) return json({ error: "Rival inválido" }, 400);

    const [sv, dp] = await Promise.all([
      admin.from("saves").select("data").eq("user_id", user.id).maybeSingle(),
      admin.from("profiles").select("id,alias,level,spec,shield_until").eq("id", def).maybeSingle(),
    ]);
    if (!sv.data) return json({ error: "Primero guardá tu partida en la nube" }, 400);
    if (!dp.data || !dp.data.spec) return json({ error: "Ese jugador todavía no publicó su isla" }, 400);
    if (dp.data.shield_until && new Date(dp.data.shield_until) > new Date()) return json({ error: "Ese jugador tiene escudo por un rato" }, 409);

    // deno-lint-ignore no-explicit-any
    let S: any;
    try { S = JSON.parse(sv.data.data); } catch (_) { return json({ error: "Tu partida en la nube está dañada" }, 400); }

    // El ejército pedido tiene que existir en TU partida guardada. Las mejoras salen de ahí, no del navegador.
    const army: Record<string, number> = {}, mul: Record<string, number[]> = {};
    const atk = num(S.tech && S.tech.atk, 0, 10, 0) | 0;
    for (const k in body.army || {}) {
      // deno-lint-ignore no-explicit-any
      const u = (U as any)[k];
      const n = Math.floor(Number(body.army[k]));
      if (!u || u.hero || u.nav || !(n > 0)) continue;
      const own = Math.floor(Number((S.troops || {})[k]) || 0);
      if (n > own) return json({ error: "No tenés esas tropas guardadas en la nube" }, 400);
      army[k] = Math.min(n, 500);
      const ul = num((S.ulv || {})[k], 1, 7, 1) | 0, m = 1 + 0.2 * (ul - 1);
      mul[k] = [m, m * (1 + 0.25 * atk)];
    }
    if (!Object.keys(army).length) return json({ error: "Elegí al menos una tropa" }, 400);

    const spec = sanSpec(dp.data.spec);
    if (!spec) return json({ error: "La isla del rival no es válida" }, 400);

    const seed = crypto.getRandomValues(new Uint32Array(1))[0] & 0x7fffffff;
    const r = simPvp(army, spec, mul, seed);

    const L = num(dp.data.level, 1, 99, 1), d = r.win ? Math.max(0.3, r.destroyed) : 0;
    const loot = { c: Math.round((500 + 300 * L) * d), o: Math.round(40 * L * d), s: Math.round(18 * L * d), e: Math.round(10 * L * d) };

    const { data: ap, error: ae } = await admin.rpc("pvp_apply", {
      p_att: user.id, p_def: def, p_seed: seed, p_army: army, p_mul: mul, p_spec: spec,
      p_win: r.win, p_destroyed: r.destroyed, p_surv: r.surv, p_loot: loot,
    });
    if (ae) {
      const m = ae.message || "";
      const msg = /escudo/.test(m) ? "Ese jugador tiene escudo por un rato"
        : /segundos/.test(m) ? "Esperá unos segundos entre ataques"
        : /mucho/.test(m) ? "Ya atacaste mucho a este jugador hoy"
        : "No se pudo registrar el ataque";
      return json({ error: msg }, 409);
    }
    return json({
      id: ap.id, seed, army, mul, spec, win: r.win, destroyed: r.destroyed, surv: r.surv,
      loot: r.win ? loot : {}, d_att: ap.d_att, d_def: ap.d_def, trophies: ap.trophies, alias: dp.data.alias,
    });
  } catch (e) {
    console.error(e);
    return json({ error: "Error del servidor" }, 500);
  }
});
