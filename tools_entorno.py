# Convierte assets/entorno/*.png en src/13-entorno.js (texturas, vegetación, islas, íconos).
import glob,os,io,base64
from PIL import Image
SZ={'tex':(512,'JPEG',78),'isla':(400,'WEBP',80),'ico':(96,'WEBP',85),'u':(144,'WEBP',74),'carga':(1280,'JPEG',70),'logo':(640,'WEBP',85),'panel':(512,'WEBP',85),'titulo':(512,'WEBP',85),'btn':(256,'WEBP',85),'pestana':(256,'WEBP',85),'barra':(768,'WEBP',82),'casillero':(256,'WEBP',85),'cartel':(256,'WEBP',85),'av':(128,'WEBP',80),'e':(128,'WEBP',78),'j':(128,'WEBP',78),'h':(144,'WEBP',78),'cofre':(128,'WEBP',80),'liga':(128,'WEBP',80)}
out={}
for f in sorted(glob.glob('assets/entorno/*.png')):
    k=os.path.basename(f)[:-4];pre=k.split('_')[0]
    if pre=='btn' and k=='btn_cerrar':pre='ico'
    s,fmt,q=SZ.get(pre,(192,'WEBP',80))
    im=Image.open(f)
    im=im.convert('RGB' if fmt=='JPEG' else 'RGBA');r=s/max(im.size);im=im.resize((max(1,round(im.size[0]*r)),max(1,round(im.size[1]*r))),Image.LANCZOS)
    b=io.BytesIO();im.save(b,fmt,quality=q,method=6) if fmt=='WEBP' else im.save(b,fmt,quality=q,optimize=True)
    out[k]=f'data:image/{"jpeg" if fmt=="JPEG" else "webp"};base64,'+base64.b64encode(b.getvalue()).decode()
js='/* ---------- entorno pintado: texturas, vegetación, islas chicas e íconos (assets/entorno) ---------- */\nconst ENV={'+','.join(f'{k}:"{v}"' for k,v in out.items())+'};\n'
open('src/13-entorno.js','w').write(js)
print(len(out),len(js)//1024,'KB')
