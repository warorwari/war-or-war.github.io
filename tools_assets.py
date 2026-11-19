# Convierte las imágenes de assets/ (clave_nivel.png, 1024x1024, rombo de base al 80% del ancho)
# en src/12-imagenes.js con las imágenes comprimidas adentro.
import glob,os,io,base64,re
from PIL import Image
out={}
for f in sorted(glob.glob('assets/*.png')):
    m=re.match(r'([a-z0-9]+)_(\d)\.png$',os.path.basename(f))
    if not m: continue
    k,l=m.group(1),int(m.group(2))
    im=Image.open(f).convert('RGBA').resize((288,288),Image.LANCZOS)
    b=io.BytesIO();im.save(b,'WEBP',quality=80,method=6)
    out.setdefault(k,{})[l]='data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
js='/* ---------- imágenes pintadas de los edificios (assets/clave_nivel.png) ---------- */\n'
js+='const PIMG={'+','.join(f"{k}:{{{','.join(f'{l}:\"{u}\"' for l,u in sorted(v.items()))}}}" for k,v in out.items())+'};\n'
js+=r"""const pimgLv=(k,l)=>{const v=PIMG[k],n=Object.keys(v).length;return v[n>=3?(l<=2?1:l<=5?2:3):Math.min(n,l>=3?2:1)]||v[1]};
const PSC={arbol:.72,pino:.72,fuente:.85,estatua:.85};
const pimgTag=(k,l)=>{const s=PSC[k]||1,im=`<image href="${pimgLv(k,l)}" x="-12.45" y="-2.1" width="125" height="125"/>`;return s===1?im:`<g transform="translate(${50*(1-s)},${120*(1-s)}) scale(${s})">${im}</g>`};
for(const k in PIMG)if(ART[k])ART[k]=lv=>pimgTag(k,lv>=3?6:lv>=2?3:1);
for(let n=1;n<=3;n++)ART['civil'+n]=PIMG.civil?()=>pimgTag('civil',[1,3,6][n-1]):ART.casa;
"""
open('src/12-imagenes.js','w').write(js)
print({k:list(v) for k,v in out.items()},len(js)//1024,'KB')
