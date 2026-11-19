# ⚔️ War or War

Juego de estrategia para el navegador: construí tu base en una isla, entrená tropas, conquistá islas y atacá a otros jugadores.

**▶️ Jugar:** https://TU_USUARIO.github.io/war-or-war/

- 🏝️ Base isométrica con más de 25 edificios, cada uno con 3 aspectos según su nivel.
- 🎖️ Más de 50 tropas: soldados, tanques, aviones, robots, dragones y barcos, más héroes con habilidades.
- ⚔️ Batallas en vivo, con despliegue manual, clima, terrenos, muros y defensas.
- ☁️ Cuenta con correo: tu partida se guarda en la nube y la seguís en cualquier dispositivo.
- 🌐 Buscador de jugadores, perfiles públicos y ataques entre jugadores resueltos en el servidor.
- 📱 Se instala como app ("Agregar a la pantalla de inicio") y funciona sin internet.

## Cómo está hecho

- `docs/` → lo que publica GitHub Pages (generado con `python3 build_web.py`).
- `src/` → el código del juego en partes (ver `LEEME.md`).
- `supabase/` → base de datos, permisos (RLS) y la función `pvp` del servidor.
- `tests/` → pruebas automáticas (`bash tests/run_all.sh`).

Para configurarlo desde cero, seguí **[CONFIGURAR.md](CONFIGURAR.md)**.
