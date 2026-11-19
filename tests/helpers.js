// Arma páginas de prueba: el juego + una partida guardada de ejemplo + acceso a funciones internas.
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..'),OUT='/tmp/war-tests';fs.mkdirSync(OUT,{recursive:true});
const EXPOSE='window.__G={S,U,B,mkBattle,enemySpec,stepBattle,runBattle,layoutSpec,startTD,levelUp,openProf,openCol,openSet,openMenu,collectAll:()=>collectAll(),BT:()=>BT,pvBattle,pvSeed};\n';
function page(fix){let h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');if(fix)h=h.replace('<script>\n(()=>{',fs.readFileSync(path.join(__dirname,'fixtures',fix+'.html'),'utf8')+'<script>\n(()=>{');
 const i=h.lastIndexOf('})();');h=h.slice(0,i)+EXPOSE+h.slice(i);const f=path.join(OUT,(fix||'nueva')+'.html');fs.writeFileSync(f,h);return 'file://'+f}
const chrome=()=>require('child_process').execSync('command -v google-chrome || command -v chromium').toString().trim();
module.exports={page,chrome,ROOT};
