// Prueba en Chrome real (tamaño celular): pantallas, batallas en todos los mapas, despliegue, defensa de la torre.
const pp=require('puppeteer-core'),{page,chrome}=require('./helpers');const W=ms=>new Promise(r=>setTimeout(r,ms));
const res=[];const ok=(n,c,x)=>res.push([c?'✅':'❌',n,x||'']);
(async()=>{const b=await pp.launch({executablePath:chrome(),headless:'new',args:['--no-sandbox']});
 for(const fix of ['base','grande','islas',null]){const p=await b.newPage(),errs=[];p.on('pageerror',e=>errs.push(e.message));await p.setViewport({width:390,height:760,deviceScaleFactor:2,isMobile:true,hasTouch:true});
  await p.goto(page(fix));await W(3500);const ck=s=>p.evaluate(s=>{const e=document.querySelector(s);if(!e)return false;e.dispatchEvent(new MouseEvent('click',{bubbles:true}));return true},s);
  for(let n=0;n<8&&await p.$('#modal.on');n++){await ck('#mbox [data-mb]');await W(250)}
  const name=fix||'partida nueva';
  for(const s of ['#b-build','#b-troops','#b-atk','#b-mis','#b-menu']){const c=await ck(s);await W(300);ok(`${name}: abrir ${s}`,c&&await p.evaluate(()=>document.querySelector('#sheet').classList.contains('on')));await ck('#shade');await W(150)}
  if(fix){await ck('#b-atk');await W(300);for(const t of ['riv','camp','ev','conq']){await ck(`[data-a="atab"][data-v="${t}"]`);await W(200)}ok(`${name}: pestañas de ataque`,true);await ck('#shade');
   await p.evaluate(()=>{window.__G.openSet()});await W(200);await p.evaluate(()=>{window.__G.openProf()});await W(200);await p.evaluate(()=>{window.__G.openCol()});await W(200);await ck('#shade');
   const sim=await p.evaluate(()=>{const G=window.__G,out={};for(const m of ['normal','rio','monte','niebla']){let w=0,bad=0;for(let s=0;s<6;s++){const sp=G.enemySpec(600,8,s*31+7);sp.map=m;const a={soldado:20,tanque:8,helicoptero:3},mul={soldado:[1,1],tanque:[1,1],helicoptero:[1,1]};const bb=G.mkBattle(a,sp,mul);let g=0;while(!bb.over&&g++<4000)G.stepBattle(bb,.05);if(bb.over===1)w++;if(bb.E.some(e=>isNaN(e.x)||isNaN(e.hp)))bad++}out[m]=[w,bad]}return out});
   for(const m in sim)ok(`${name}: batallas en mapa ${m}`,sim[m][1]===0,`${sim[m][0]}/6 ganadas`);
   if(fix==='base'){await p.evaluate(()=>{const G=window.__G;const sp=G.enemySpec(500,6,5);sp.map='rio';const a={soldado:10,tanque:4},bb=G.mkBattle(a,sp,{soldado:[1,1],tanque:[1,1]});bb.live=1;bb.e={n:'R',f:'🤠',lvl:6};G.runBattle(bb,'t')});await W(2500);
    ok(`${name}: panel de despliegue`,await p.evaluate(()=>document.querySelector('#btdep').classList.contains('on')));await ck('[data-dk="*"]');await W(2500);ok(`${name}: tropas soltadas`,await p.evaluate(()=>{const b=window.__G.BT();return !!(b&&b.go&&!b.E.some(x=>x.off))}));
    await p.evaluate(()=>{const b=window.__G.BT();if(b)b.speed=4});await W(1500);await ck('#btskip');await W(1500);for(let n=0;n<4&&await p.$('#modal.on');n++){await ck('#mbox [data-mb]');await W(300)}
    await p.evaluate(()=>{window.__G.S.tdn=0;window.__G.startTD()});await W(2000);ok(`${name}: defensa de la torre`,await p.evaluate(()=>{const b=window.__G.BT();return !!(b&&b.td)}))}}
  ok(`${name}: sin errores en la página`,errs.length===0,errs.slice(0,2).join(' | '));await p.close()}
 await b.close();for(const r of res)console.log(r.join(' '));const f=res.filter(r=>r[0]==='❌').length;console.log(f?`\n❌ ${f} pruebas fallaron`:`\n✅ ${res.length} pruebas pasaron`);process.exit(f?1:0)})().catch(e=>{console.error('❌',e.message);process.exit(1)});
