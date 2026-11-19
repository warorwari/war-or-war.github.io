# Configurar War or War con Supabase y GitHub Pages

Son 6 pasos. Tardás unos 20 minutos la primera vez. No hace falta saber programar: es copiar, pegar y tocar botones.

## Qué hay en esta carpeta

| Carpeta / archivo | Para qué es |
|---|---|
| `docs/` | El juego listo para GitHub Pages (página, código, imágenes, app instalable). |
| `docs/config.js` | Donde van la **Project URL** y la **Publishable key** de Supabase. |
| `supabase/migrations/…sql` | Las tablas, los permisos (RLS) y las funciones SQL. |
| `supabase/functions/pvp/` | La función del servidor que resuelve los ataques entre jugadores. |
| `src/`, `build.py`, `build_web.py` | El código fuente, por si querés seguir cambiando el juego. |

---

## Paso 1 · Crear el proyecto en Supabase

1. Entrá a <https://supabase.com> e iniciá sesión (con GitHub es lo más fácil).
2. **New project** → elegí un nombre (por ejemplo `war-or-war`), una contraseña para la base de datos (guardala) y la región más cercana (São Paulo, para Argentina).
3. Esperá un par de minutos a que termine de crearse.

## Paso 2 · Crear las tablas y los permisos

1. En el menú de la izquierda: **SQL Editor** → **New query**.
2. Abrí el archivo `supabase/migrations/20261119000000_war_or_war.sql`, copiá **todo** y pegalo.
3. Tocá **Run**. Tiene que decir *Success. No rows returned*.

Esto crea:

- `profiles`: el perfil público (alias, avatar, nivel, trofeos, la isla). **No guarda el correo.** Cualquiera puede leerlo, pero cada uno solo puede editar el suyo, y **nunca** sus trofeos ni su escudo: esas columnas solo las cambia el servidor.
- `saves`: la partida completa. **Privada:** cada jugador solo puede leer y escribir la suya.
- `attacks`: el registro de cada ataque. Cada jugador solo ve los ataques donde participó, y nadie los puede escribir desde el navegador.
- `pvp_apply`: aplica trofeos, escudo y botín en una sola operación. Solo la puede usar el servidor.
- `claim_attack`: el atacante cobra el botín una sola vez.
- `mark_seen`: marca como vistos los avisos de defensas.

## Paso 3 · Configurar el inicio de sesión por correo

1. **Authentication → Sign In / Providers → Email**: dejá activado **Email** y también **Confirm email**.
2. **Authentication → URL Configuration**:
   - **Site URL**: la dirección donde va a estar tu juego, por ejemplo `https://TU_USUARIO.github.io/war-or-war/`
   - **Redirect URLs**: agregá esa misma dirección.

   Así los correos de confirmación y de "olvidé mi contraseña" te devuelven al juego.

> Ojo: el servicio de correo que trae Supabase de regalo manda **muy pocos correos por hora** y es para pruebas. Cuando lo abras a mucha gente, configurá tu propio servidor de correo en **Authentication → Emails → SMTP Settings** (por ejemplo Resend o Brevo, que tienen plan gratis).

## Paso 4 · Subir la función del servidor (ataques entre jugadores)

**Opción A, desde la página de Supabase (sin instalar nada):**

1. **Edge Functions → Deploy a new function → Via Editor**.
2. Nombre: `pvp` (exactamente así).
3. Borrá el código de ejemplo y pegá el contenido de `supabase/functions/pvp/index.ts`.
4. Creá un segundo archivo en el editor llamado `sim.js` y pegá el contenido de `supabase/functions/pvp/sim.js`.
5. Tocá **Deploy function**.
6. En los detalles de la función (**Details**), desactivá **Enforce JWT verification** (o "Verify JWT") y guardá. La función comprueba la sesión por su cuenta.

**Opción B, con la terminal (si tenés Node instalado):**

```bash
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF
npx supabase functions deploy pvp --no-verify-jwt
```

(`TU_PROJECT_REF` es el código raro de la dirección de tu proyecto: `https://TU_PROJECT_REF.supabase.co`.)

La función usa la clave secreta del proyecto, que Supabase le da sola. **No tenés que copiarla en ningún lado.**

## Paso 5 · Poner tus claves públicas en el juego

✅ **Ya está hecho:** `docs/config.js` tiene tu Project URL y tu Publishable key. Este paso solo hace falta si algún día cambiás de proyecto.

1. En Supabase: **Project Settings → API Keys**. Copiá la **Publishable key** (empieza con `sb_publishable_`).
2. La **Project URL** está en **Project Settings → Data API** (algo como `https://abcdefgh.supabase.co`).
3. Abrí `docs/config.js` y reemplazá:

```js
window.WOW_CFG={
  url:'https://abcdefgh.supabase.co',
  key:'sb_publishable_xxxxxxxxxxxx'
};
```

⚠️ **Nunca pongas la Secret key (`sb_secret_…`) ni la `service_role` en el juego.** Esas son solo para el servidor. La publishable es segura de mostrar: lo privado lo protegen las políticas RLS del paso 2.

## Paso 6 · Publicar en GitHub Pages

1. En <https://github.com> → **New repository** → nombre `war-or-war` → **Public** → **Create repository**.
2. **Add file → Upload files**: arrastrá **todo el contenido** de esta carpeta (las carpetas `docs`, `supabase`, `src`, `tests` y los archivos sueltos) → **Commit changes**.
3. **Settings → Pages** → *Build and deployment* → **Deploy from a branch** → Branch `main`, carpeta **`/docs`** → **Save**.
4. En 1 o 2 minutos aparece arriba el link: `https://TU_USUARIO.github.io/war-or-war/`. Ese es tu juego.

Si el link no coincide con el que pusiste en el paso 3, corregilo en Supabase (**URL Configuration**).

---

## Probar que todo anda

1. Abrí el juego → **Menú → ☁️ Cuenta** → poné un correo y una contraseña → **Crear cuenta**.
2. Confirmá el correo desde tu bandeja de entrada (el link te vuelve al juego) → **Entrar**.
3. Si ya tenías una partida en ese navegador, te pregunta si querés **importarla** a tu cuenta.
4. Ponete un **alias** (Menú → Perfil → Nombre). Tiene que tener entre 3 y 16 caracteres.
5. Abrí el juego en otro celular, entrá con la misma cuenta y tu partida aparece sola.
6. Con una segunda cuenta: **Menú → 🔎 Jugadores** → tocá un jugador → **⚔️ Atacar**.

## Cómo funcionan los ataques entre jugadores

- Cada jugador publica una **copia de sus defensas** al guardar. Por eso lo podés atacar aunque esté desconectado.
- Al atacar, el juego le pide al servidor que resuelva el combate:
  - El servidor revisa que **tengas esas tropas en tu partida guardada en la nube** y toma tus mejoras de ahí, no de lo que diga el navegador.
  - Corre **el mismo simulador del juego** con una semilla al azar que elige él.
  - Aplica los trofeos de los dos jugadores, el escudo de 20 minutos del defensor y el botín, **todo en una sola operación**.
- Tu pantalla repite exactamente esa misma batalla para que la veas. Las pruebas automáticas comprueban que el servidor y el navegador den igual.
- El botín y las bajas se cobran **una sola vez** (`claim_attack`): aunque recargues la página, no se repiten.
- Límites contra abusos: 20 segundos entre ataques, máximo 3 ataques por día al mismo jugador y escudo de 20 minutos para quien pierde.
- Los **trofeos de jugadores** y el ranking del buscador salen del servidor. La liga contra la computadora sigue funcionando como antes, en tu partida.

## Límite honesto de seguridad

La economía del juego (recursos, construcción, entrenamiento) sigue corriendo en el navegador, como siempre. El servidor protege lo **competitivo**: trofeos, escudo, que el combate no se pueda falsear y que el botín se cobre una vez. Pero alguien con conocimientos podría editar su propia partida guardada para darse más tropas, y el servidor confiaría en esa partida. Hacer el juego 100% a prueba de trampas requeriría pasar toda la economía al servidor. Se puede hacer más adelante si el juego crece.

## Si cambiás el juego

```bash
python3 build.py --test     # arma index.html (un solo archivo) y corre las pruebas
python3 tools_sim.py        # actualiza el simulador del servidor (supabase/functions/pvp/sim.js)
python3 build_web.py        # arma docs/ para GitHub Pages
```

Si cambiaste algo de las batallas, **volvé a subir `sim.js` a la función `pvp`**. Si no, el servidor y la repetición en pantalla dejarían de coincidir. El juego igual muestra siempre el resultado oficial del servidor.
