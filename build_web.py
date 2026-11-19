"""Arma la versión para GitHub Pages en docs/:
   - index.html liviano (estilos + pantalla) que carga supabase-js, config.js y el juego,
   - game.js con todo el código del juego,
   - img/ con las imágenes como archivos aparte (se descargan una vez y quedan guardadas),
   - app instalable: manifest.webmanifest, sw.js (funciona sin internet) e íconos.
   Uso: python3 build_web.py   (antes: python3 build.py)"""
import os,re,json,base64,shutil,io,hashlib
from PIL import Image
here=os.path.dirname(os.path.abspath(__file__));W=os.path.join(here,'docs');IMG=os.path.join(W,'img')
os.makedirs(IMG,exist_ok=True)
parts=sorted(f for f in os.listdir(os.path.join(here,'src')) if not f.startswith('.'))
rd=lambda f:open(os.path.join(here,'src',f),encoding='utf-8').read()
# las partes de página: 00 (arriba) + 01 (css) + 02 (cuerpo, termina en <script>)
top=rd('00-pagina-arriba.html')+rd('01-estilos.css')+rd('02-pagina-cuerpo.html')
assert top.rstrip().endswith('<script>');top=top.rstrip()[:-len('<script>')]
man={'PIMG':{},'ENV':{}};ext={'webp':'webp','jpeg':'jpg','png':'png'}
def dump(uri,name):
    m=re.match(r'data:image/([a-z]+);base64,(.*)',uri,re.S);data=base64.b64decode(m.group(2));fn=f'{name}.{ext[m.group(1)]}'
    open(os.path.join(IMG,fn),'wb').write(data);return 'img/'+fn
js=[]
for f in parts:
    if not f.endswith('.js'):continue
    s=rd(f)
    if f=='12-imagenes.js':
        m=re.search(r'const PIMG=(\{.*?\});\n',s,re.S);obj=m.group(1)
        for k,lv in re.findall(r'([a-z0-9]+):\{((?:\d:"data:[^"]+",?)+)\}',obj):
            for l,u in re.findall(r'(\d):"(data:[^"]+)"',lv):man['PIMG'].setdefault(k,{})[l]=dump(u,f'{k}_{l}')
        s=s.replace(m.group(0),'const PIMG=window.__IMG.PIMG;\n')
    if f=='13-entorno.js':
        m=re.search(r'const ENV=(\{.*?\});\n',s,re.S)
        for k,u in re.findall(r'([a-z0-9_]+):"(data:[^"]+)"',m.group(1)):man['ENV'][k]=dump(u,k)
        s=s.replace(m.group(0),'const ENV=window.__IMG.ENV;\n')
    js.append(s)
game=''.join(js)
ver=hashlib.sha1(game.encode()).hexdigest()[:8]
open(os.path.join(W,'game.js'),'w',encoding='utf-8').write(game)
json.dump(man,open(os.path.join(IMG,'manifest.json'),'w'),separators=(',',':'))
# íconos de la app a partir del logo y la pantalla de carga
src_logo=os.path.join(here,'assets','entorno','logo.png');src_bg=os.path.join(here,'assets','entorno','carga.png')
for s in (192,512):
    bg=Image.open(src_bg).convert('RGB');side=min(bg.size);bg=bg.crop(((bg.width-side)//2,(bg.height-side)//2,(bg.width+side)//2,(bg.height+side)//2)).resize((s,s),Image.LANCZOS)
    lg=Image.open(src_logo).convert('RGBA');lg=lg.crop(lg.getchannel('A').getbbox());r=s*.86/lg.width;lg=lg.resize((round(lg.width*r),round(lg.height*r)),Image.LANCZOS)
    dk=Image.new('RGBA',(s,s),(0,0,0,90));bg=bg.convert('RGBA');bg.alpha_composite(dk);bg.alpha_composite(lg,((s-lg.width)//2,(s-lg.height)//2))
    bg.convert('RGB').save(os.path.join(W,f'icon-{s}.png'))
manifest={"name":"War or War","short_name":"War or War","start_url":"./","scope":"./","display":"fullscreen","orientation":"any",
 "background_color":"#0d1620","theme_color":"#14202d","lang":"es",
 "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}
json.dump(manifest,open(os.path.join(W,'manifest.webmanifest'),'w'),ensure_ascii=False,indent=1)
files=['./','index.html','game.js','config.js','manifest.webmanifest','icon-192.png','icon-512.png','img/manifest.json']+sorted(set(v for d in man['PIMG'].values() for v in d.values())|set(man['ENV'].values()))
open(os.path.join(W,'sw.js'),'w').write(f"""// Guarda el juego en el celular para abrirlo rápido y sin internet. Cambia solo cuando cambia el juego.
const V='wow-{ver}',FILES={json.dumps(files)};
self.addEventListener('install',e=>{{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))}});
self.addEventListener('activate',e=>{{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))}});
self.addEventListener('fetch',e=>{{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 // el código y la página: primero la red (para tener siempre lo último), si no hay internet, lo guardado
 if(/\\/(index\\.html|game\\.js|config\\.js)?$/.test(u.pathname)){{e.respondWith(fetch(e.request).then(r=>{{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}}).catch(()=>caches.match(e.request,{{ignoreSearch:true}})));return}}
 // imágenes: lo guardado primero
 e.respondWith(caches.match(e.request,{{ignoreSearch:true}}).then(r=>r||fetch(e.request)))}});
""")
if not os.path.exists(os.path.join(W,'config.js')):
    open(os.path.join(W,'config.js'),'w').write("""// Datos PÚBLICOS de tu proyecto de Supabase (Settings → API Keys / Data API).
// Solo la Project URL y la Publishable key: NUNCA pongas acá la secret key.
window.WOW_CFG={
  url:'https://TU_PROYECTO.supabase.co',
  key:'sb_publishable_TU_CLAVE'
};
""")
HEADX='<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#14202d"><link rel="apple-touch-icon" href="icon-192.png"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="description" content="War or War: construí tu base en una isla, entrená tropas y atacá a otros jugadores.">\n'
assert '</head>' in top;top=top.replace('</head>',HEADX+'</head>',1)
loader=f"""
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script src="config.js?v={ver}"></script>
<script>
/* Carga las imágenes (quedan guardadas en el celular) y después arranca el juego */
(async()=>{{const bar=document.getElementById('loadi'),txt=document.getElementById('loadt');
 try{{const R=document.documentElement;R.style.setProperty('--ui-carga','url(img/carga.jpg)');R.style.setProperty('--ui-logo','url(img/logo.webp)');R.classList.add('pui')}}catch(e){{}}
 try{{if(navigator.serviceWorker)navigator.serviceWorker.register('sw.js').catch(()=>{{}})}}catch(e){{}}
 const toData=u=>fetch(u).then(r=>{{if(!r.ok)throw new Error(u);return r.blob()}}).then(b=>new Promise((ok,ko)=>{{const f=new FileReader();f.onload=()=>ok(f.result);f.onerror=ko;f.readAsDataURL(b)}}));
 try{{const m=await (await fetch('img/manifest.json?v={ver}')).json(),jobs=[];let done=0,total=0;const out={{PIMG:{{}},ENV:{{}}}};
  const add=(u,set)=>{{total++;jobs.push(toData(u).then(d=>{{set(d);done++;if(bar)bar.style.width=Math.round(8+88*done/total)+'%';if(txt)txt.textContent='Cargando gráficos… '+Math.round(100*done/total)+'%'}}))}};
  for(const k in m.PIMG){{out.PIMG[k]={{}};for(const l in m.PIMG[k])add(m.PIMG[k][l],d=>out.PIMG[k][l]=d)}}
  for(const k in m.ENV)add(m.ENV[k],d=>out.ENV[k]=d);
  await Promise.all(jobs);window.__IMG=out;
 }}catch(e){{window.__IMG={{PIMG:{{}},ENV:{{}}}};if(txt)txt.textContent='Sin conexión: cargando sin gráficos'}}
 const s=document.createElement('script');s.src='game.js?v={ver}';document.body.appendChild(s);
}})();
</script>
</body>
</html>
"""
open(os.path.join(W,'index.html'),'w',encoding='utf-8').write(top+loader)
tot=sum(os.path.getsize(os.path.join(IMG,f)) for f in os.listdir(IMG))
print(f"✅ docs/ listo · index.html {os.path.getsize(os.path.join(W,'index.html'))//1024} KB · game.js {len(game)//1024} KB · {len(os.listdir(IMG))-1} imágenes ({tot//1024} KB) · versión {ver}")
