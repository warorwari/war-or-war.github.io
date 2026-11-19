# War or War — cómo está organizado el código

El juego que se abre es siempre **un solo archivo**: `index.html`. Se puede mandar por WhatsApp o abrir sin internet.
Ese archivo no se edita a mano: se **arma** uniendo las partes de `src/` en orden.

## Partes (`src/`)

| Archivo | Qué tiene |
|---|---|
| `00-pagina-arriba.html` | Comienzo de la página |
| `01-estilos.css` | Todos los estilos: interfaz, tema acero y dorado, animaciones |
| `02-pagina-cuerpo.html` | Estructura de pantallas: barra de arriba, botones, mapa, batalla, carteles |
| `10-datos.js` | Edificios, tropas, defensas, fusiones, balance, diseño de bases rivales y simulación de batalla |
| `20-modelos-y-arte.js` | Motor 3D de tropas, modelos y arte de edificios |
| `30-mapa-y-base.js` | Niveles, mapa, edificios en alta definición, lienzo, sensación de juego |
| `40-hojas-y-tropas.js` | Pantallas inferiores, tropas y preparar ataque |
| `50-batalla.js` | Batalla en vivo: dibujo, efectos, terreno, niebla y despliegue manual |
| `60-acciones-y-mundo.js` | Misiones, botones, rivales, islas, zoom y eventos |
| `70-sonido-guardado-campana.js` | Sonido, ataques a tu base, campaña, logros y guardado en la nube |
| `80-sistemas-extra.js` | Jugadores reales, cofres, liga, ruleta, colección, mercado, menú y ajustes |
| `90-modos-y-eventos.js` | Jefes de rango, islas en tiempo real, héroes, investigación, equipo, clanes, mundo, asedio, defensa de la torre, historia, Kraken, cosméticos y copia de seguridad |
| `99-inicio.js` | Tutorial, pantalla de carga, perfil y arranque |
| `zz-pagina-abajo.html` | Final de la página |

## Armar y probar

```
python3 build.py          # une las partes en index.html y revisa que no haya errores de sintaxis
python3 build.py --test   # además corre todas las pruebas
```

Pruebas (`tests/`):
- `humo.js`: arranca el juego sin navegador y abre pantallas.
- `navegador.js`: en Chrome real y tamaño celular, prueba tres partidas guardadas de ejemplo y una nueva. Abre todas las pantallas y pestañas, juega batallas en los cuatro tipos de mapa, prueba el despliegue manual y la defensa de la torre, y falla si aparece cualquier error.
- `fixtures/`: partidas guardadas de ejemplo (base media, base grande de nivel 17, islas en disputa).

La partida de cada jugador se guarda en el navegador con la clave `guerra-de-bases-v1`. **No cambiar esa clave**: si cambia, se pierden las partidas guardadas.

## Sonidos
- `src/65-sonidos-grabados.js`: sonidos de interfaz grabados (comprar, subir de nivel, cofres, logros, error, abrir y cerrar menús). Vienen de **uisfx** (tema "cinematic"), dedicados al dominio público con **CC0 1.0**: se pueden usar, cambiar y vender sin pedir permiso.
- Los disparos, explosiones y la música siguen sintetizados en `70-sonido-guardado-campana.js`. Si un sonido grabado no carga, suena el sintetizado.
- `src/95-ambiente.js`: vida en la base (aldeanos, grúa en obras, polvo al terminar), luces de noche y los íconos dibujados de las barras.

## Imágenes pintadas de edificios
- Poné los PNG en `assets/` con el nombre `clave_nivel.png` (1024x1024, fondo transparente, el rombo de la base ocupa el 80% del ancho y toca abajo).
- Corré `python3 tools_assets.py` (genera `src/12-imagenes.js`) y después `python3 build.py --test`.
- Nivel de imagen 1 = niveles 1-2 del edificio, 2 = niveles 3-5, 3 = niveles 6-7. Los edificios sin imagen siguen dibujados por código.

## Nube (Supabase) y GitHub Pages
- `src/85-nube.js`: cuentas, guardado en la nube, buscador de jugadores, perfiles y ataques entre jugadores. Solo se activa si la página carga supabase-js y `config.js` (versión `docs/`).
- `python3 tools_sim.py`: genera `supabase/functions/pvp/sim.js` (el simulador del servidor) desde `src/10-datos.js`.
- `python3 build_web.py`: arma `docs/` con las imágenes como archivos aparte, app instalable y funcionamiento sin internet.
- `tests/pvp.js`: comprueba que el servidor y el navegador den exactamente la misma batalla.
- Configuración paso a paso: `CONFIGURAR.md`.
