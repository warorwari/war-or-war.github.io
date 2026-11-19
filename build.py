"""Arma index.html uniendo las partes de src/ en orden. Uso: python3 build.py [--test]"""
import os,sys,subprocess,re
here=os.path.dirname(os.path.abspath(__file__))
parts=sorted(f for f in os.listdir(os.path.join(here,'src')) if not f.startswith('.'))
out=''.join(open(os.path.join(here,'src',f)).read() for f in parts)
open(os.path.join(here,'index.html'),'w').write(out)
js=re.search(r'<script>\n(.*)</script>',out,re.S).group(1)
open('/tmp/_war.js','w').write(js)
r=subprocess.run(['node','--check','/tmp/_war.js'],capture_output=True,text=True)
if r.returncode:print('❌ Error de sintaxis:\n'+r.stderr[:800]);sys.exit(1)
print(f'✅ index.html armado con {len(parts)} partes · {len(out)//1024} KB')
if '--test' in sys.argv:sys.exit(subprocess.run(['bash',os.path.join(here,'tests','run_all.sh')]).returncode)
