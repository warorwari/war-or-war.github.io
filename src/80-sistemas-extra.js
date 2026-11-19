/* ---------- jugadores reales: cada uno publica un resumen de su base en un espacio compartido ---------- */
let pdb=null,puser=null,pid=null,PLY=[],pAt=0,pPrev='',pLoad=0;
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const num=(v,a,b,d)=>{v=+v;return isFinite(v)?Math.max(a,Math.min(b,v)):d};
/* Lo que escriben otras personas no es confiable: se queda solo con defensas y tropas conocidas y valores acotados */
function sanSpec(s){
 if(!s||!Array.isArray(s.defs))return null;const units={};
 for(const k in s.units||{})if(U[k]&&!U[k].hero)units[k]=num(s.units[k],0,10,0)|0;
 return{defs:s.defs.filter(d=>d&&DEFS[d.k]&&d.k!=='hq').slice(0,10).map(d=>({k:d.k,c:num(d.c,0,10,5)|0,r:num(d.r,1,7,3)|0,m:num(d.m,1,3,1)})),units,k:1,hq:num(s.hq,300,6000,600),hqd:num(s.hqd,0,60,10)};
}
async function pubSave(){
 if(!pdb||!pid||now()-pAt<60000)return;
 const d={lvl:S.lvl,pow:defense()+armyPow(S.troops),won:S.stats.won,spec:JSON.stringify(mySpec()),ts:now(),kev:S.kr?S.kr.id:'',kd:S.kr?Math.round(S.kr.d):0,kp:S.kr?S.kr.p0:0,nk:S.prof.n||'',av:S.prof.av||'',mo:S.prof.mo||''},j=d.spec+d.lvl+d.pow+d.kd+d.nk+d.av+d.mo;if(j===pPrev)return;
 pAt=now();try{await pdb.doc('players/'+pid).set(d);pPrev=j}catch(e){}
}
async function loadPlayers(){
 if(!pdb)return;
 try{
  const q=await pdb.collection('players').limit(50).get(),rows=q.docs.filter(d=>d.id!==pid).map(d=>Object.assign({id:d.id},d.data()));let names={};
  try{names=await puser.profiles(rows.map(r=>r.id))||{}}catch(e){}
  PLY=rows.map(r=>{let sp=null;try{sp=sanSpec(JSON.parse(r.spec))}catch(e){}const nk=String(r.nk||'').replace(/\s+/g,' ').trim().slice(0,16),av=AVS.some(a=>a[0]===r.av)?r.av:'🌐';return{av,mo:String(r.mo||'').slice(0,40),n:(nk&&!nameErr(nk)?nk:'')||(names[r.id]&&names[r.id].name)||'Jugador',lvl:num(r.lvl,1,99,1)|0,pow:num(r.pow,0,1e7,0)|0,won:num(r.won,0,1e6,0)|0,sp,kev:String(r.kev||'').slice(0,12),kd:num(r.kd,0,1e12,0),kp:num(r.kp,0,1e9,0)}}).filter(r=>r.sp).sort((a,b)=>b.pow-a.pow);
  if(sheet.kind==='attack')openAttack();
 }catch(e){}
}
function playersHTML(){
 if(pdb&&now()-pLoad>30000){pLoad=now();loadPlayers()}
 let h='<div class="cat">🌐 Jugadores reales</div>';
 if(SB)return h+`<p class="small">${CU?'Buscá rivales reales y atacá una copia de su isla. Ganás o perdés trofeos de verdad.':'Iniciá sesión para atacar a otros jugadores.'}</p><button class="btn gold" data-nb="${CU?'jug':'cuenta'}">${CU?'🔎 Buscar jugadores':'☁️ Iniciar sesión'}</button>`;
 if(!pdb)return h+'<p class="small">Disponible cuando el juego corre dentro de Claude con tu cuenta.</p>';
 if(!PLY.length)return h+'<p class="small">Todavía no hay otros jugadores. Compartí el juego desde Claude y sus bases van a aparecer acá.</p>';
 PLY.forEach((r,i)=>{h+=`<div class="erow"><div class="ef">${r.av}</div><div class="einfo"><b>${esc(r.n)}</b> <span class="tag">${rankOf(r.lvl)} · Nv ${r.lvl}</span><div class="small">${r.mo?'“'+esc(r.mo)+'” · ':''}Poder ${fmt(r.pow)} · ${r.won} victorias</div></div><button class="btn sm" data-a="visitp" data-v="${i}">👁️</button><button class="btn sm red" data-a="enemy" data-v="p${i}">Atacar</button></div>`});
 return h+'<p class="small">Atacar a un jugador es amistoso: ganás botín, pero su base no pierde nada.</p>';
}
function visitP(i){const r=PLY[i],b=mkBattle({},r.sp,{});b.visit=1;b.live=1;b.e={n:r.n,f:r.av};closeSheet();runBattle(b,`👁️ Base de ${esc(r.av+' '+r.n)} · ${rankOf(r.lvl)} · nivel ${r.lvl}`)}
/* ---------- día y noche ---------- */
/* la luz sigue la hora real: amanecer naranja, día claro, atardecer dorado y rosa, noche azul con luces prendidas */
function skyAt(h){const K=[[0,'135,150,210',.85],[5,'135,150,210',.85],[6.3,'255,175,150',.75],[7.6,'255,225,190',.35],[9,'255,255,255',0],[16.5,'255,255,255',0],[18,'255,205,140',.6],[19.3,'250,160,160',.8],[20.4,'140,120,195',.85],[21.5,'135,150,210',.85],[24,'135,150,210',.85]];
 let i=0;while(K[i+1][0]<h)i++;const a=K[i],b=K[i+1],t=(h-a[0])/(b[0]-a[0]),ca=a[1].split(',').map(Number),cb=b[1].split(',').map(Number);return{c:ca.map((v,k)=>Math.round(v+(cb[k]-v)*t)).join(','),o:a[2]+(b[2]-a[2])*t}}
function skyTick(){const d=new Date(),h=S.sky==='dia'?12:S.sky==='tarde'?18.3:d.getHours()+d.getMinutes()/60,s=skyAt(h),n=$('#night'),night=h<6||h>=20.2;
 for(const n of [$('#night')])if(n){n.style.background=`rgb(${s.c})`;n.style.opacity=s.o.toFixed(3);n.style.visibility=s.o>0?'visible':'hidden'}lightsTick(night);
 document.documentElement.classList.toggle('night',night);
 const sun=Math.max(-1,Math.min(1,(h-12.5)/6.5)),sh=$('#shs');
 if(sh){sh.style.setProperty('--shk',(night?8:-sun*32).toFixed(1)+'deg');sh.style.setProperty('--shy',(night?1:1+Math.abs(sun)*.35).toFixed(2));sh.style.setProperty('--sho',night?.35:(1-Math.abs(sun)*.25).toFixed(2))}}
setInterval(skyTick,30000);setTimeout(skyTick,50);
/* ---------- antes de cada batalla: clima al azar y especializaciones de tus tropas ---------- */
const WX=[{k:'sol',n:'☀️ Despejado'},{k:'lluvia',n:'🌧️ Lluvia: todos más lentos'},{k:'niebla',n:'🌫️ Niebla: menos alcance'},{k:'tormenta',n:'⛈️ Tormenta: aéreos más débiles'},{k:'nieve',n:'❄️ Nieve: tropas de tierra más lentas'},{k:'viento',n:'🌬️ Viento: aéreos más lentos'}];
function prepBattle(b){
 const w=b.wx=WX[Math.random()<.4?0:1+(Math.random()*5|0)],mine=b.raid?1:0;
 for(const x of b.E){
  const r=x.side===mine&&!x.st&&S.ubr[x.kind];
  if(r){const kh=1+.15*r.h;x.dmg*=1+.15*r.d;x.hp*=kh;x.uhp*=kh;x.rng+=.3*r.r}
  if(w.k==='lluvia')x.spd*=.8;else if(w.k==='niebla'&&x.rng)x.rng=Math.max(1.2,x.rng*.75);else if(w.k==='tormenta'&&x.fly){x.dmg*=.7;x.spd*=.85}else if(w.k==='nieve'&&!x.fly)x.spd*=.85;else if(w.k==='viento'&&x.fly)x.spd*=.8;
 }
 boostBattle(b);
}
function branchPick(u){
 closeSheet();const d=U[u],r=S.ubr[u]=S.ubr[u]||{d:0,h:0,r:0},pick=k=>()=>{r[k]++;save();setTimeout(openTroops,0)};
 modal(`<div class="mtitle">⬆️ ${d.n} nivel ${S.ulv[u]}</div><div class="big">${ue(u)}</div><p>Además de la mejora del nivel, elegí una especialización:</p>`,[['⚔️ +15% de daño',pick('d'),'red'],['❤️ +15% de vida',pick('h'),'green'],['🎯 +0,3 de alcance',pick('r'),'gold']]);
}
const brTxt=u=>{const r=S.ubr[u];return r&&r.d+r.h+r.r?` · ramas ⚔️${r.d} ❤️${r.h} 🎯${r.r}`:''};
/* ---------- robots obreros: uno por edificio de producción, +50% ---------- */
const WCOST={c:1500,s:200,e:100};
function hireWorker(i){const b=S.g[i];if(!b||b.w)return;if(!cnt('lab')){toast('Necesitás un 🔬 Laboratorio de robótica');return}if(!can(WCOST)){toast('No te alcanza 😕');return}pay(WCOST);b.w=1;sfx('done');toast('🤖 Robot obrero asignado: +50% de producción');hud();save();openInfo(i)}
/* ---------- mercader: ofertas que cambian cada 10 minutos ---------- */
function shopDeals(){
 const k=Math.floor(now()/600000),R=rng32(k*7919+S.lvl),L=S.lvl,res=['f','o','s','e'].slice(0,Math.max(1,Math.min(4,L))),deals=[],PR={f:.6,o:1.2,s:1.6,e:2.2};
 for(let i=0;i<3;i++){const q=res[R()*res.length|0],amt=Math.round((200+150*L)*(1+R()));deals.push({t:`${RES[q]} ${fmt(amt)}`,c:Math.round(amt*PR[q]*(.6+R()*.5)),go:()=>{S[q]+=amt}})}
 const us=Object.keys(U).filter(u=>!U[u].hero&&!U[u].max&&U[u].atk>=60&&S.lvl>=B[U[u].b].lvl),u=us[R()*us.length|0];
 if(u)deals.push({t:`${ue(u)} 1 ${U[u].n}`,c:Math.round(U[u].atk*14),go:()=>{S.troops[u]++}});
 if(!S.shop||S.shop.k!==k)S.shop={k,b:{}};
 return{k,deals};
}
function openShop(){
 const s=shopDeals();let h=`<p class="small" style="margin-top:0">El mercader cambia sus ofertas cada 10 minutos. Próximo cambio en <b data-until="${(s.k+1)*600000}"></b>.</p>`;
 s.deals.forEach((d,i)=>{h+=`<div class="trow"><div class="tinfo"><div class="force"><b>${d.t}</b></div><div class="small">por ${RES.c}${fmt(d.c)}</div></div>${S.shop.b[i]?'<div class="small lockt">Comprado ✓</div>':`<button class="btn sm gold" data-a="buy" data-v="${i}">Comprar</button>`}</div>`});
 openSheet('shop','🚢 Mercader',h);
}
function buy(i){const d=shopDeals().deals[i];if(!d||S.shop.b[i])return;if(S.c<d.c){toast('No te alcanza el oro 😕');return}S.c-=d.c;d.go();S.shop.b[i]=1;sfx('coin');hud();save();openShop()}
/* ---------- jefe mundial: aparece cada tanto; su vida se va gastando entre ataque y ataque ---------- */
function bossTick(){
 const t=now();
 if(S.boss&&(t>S.boss.end||S.boss.dead)){if(!S.boss.dead)toast('👹 El jefe mundial se retiró');S.boss=null}
 if(!S.boss&&S.lvl>=4&&!modalOpen&&!BT){if(!S.bnext){S.bnext=t+8*60000;return}
  if(t>S.bnext){const p=Math.max(300,armyPow(S.troops)),seed=t%1e6|0,hp=Math.round(enemySpec(p,S.lvl+2,seed).hq*5);S.boss={p,seed,end:t+15*60000,max:hp,hp};S.bnext=t+45*60000;sfx('alert');toast('👹 ¡Apareció un jefe mundial! Entrá a Atacar');save()}}
}
const bossSpec=()=>{const sp=enemySpec(S.boss.p,S.lvl+2,S.boss.seed);sp.hq=Math.max(1,S.boss.hp);return sp};
const bossBtn=()=>S.boss&&!S.boss.dead?`<button class="btn red" data-a="enemy" data-v="b" style="margin:0 0 10px">👹 Jefe mundial · vida ${Math.ceil(S.boss.hp/S.boss.max*100)}% · se va en ${ft(S.boss.end-now())}</button>`:'';
function bossHit(b,win){const hq=b.E.find(x=>x.kind==='hq');S.boss.hp=Math.max(0,hq?hq.hp:0);if(win){S.boss.dead=1;S.spins=(S.spins||0)+1;S.stats.boss=(S.stats.boss||0)+1}else toast(`👹 Lo dañaste: al jefe le queda ${Math.ceil(S.boss.hp/S.boss.max*100)}% de vida`)}
/* ---------- recolector: junta producción mientras no jugás; cuántas horas cubre depende de su nivel ---------- */
const RH=[0,1,2,3,5,8,12,24];
const fh=ms=>{const m=Math.floor(ms/60000);return m>=60?Math.floor(m/60)+' h '+(m%60)+' min':m+' min'};
function offlineCheck(){
 const b=S.g.find(x=>x&&x.t==='recolector'&&done(x));if(!b||!S.ts)return;const away=now()-S.ts;if(away<120000)return;
 const cap=RH[b.l]*36e5,use=Math.min(away,cap),r={};
 for(const q of S.g){if(!q||!done(q))continue;const d=B[q.t];if(!d.prod)continue;const p=prodOf(q);for(const k in p)r[k]=(r[k]||0)+p[k]/(d.per*1000)*use*.6}
 for(const k in r)r[k]=Math.round(r[k]);if(!Object.keys(r).length)return;gain(r);
 modal(`<div class="mtitle">🛸 Recolector automático</div><div class="big">${svgArt('recolector',b.l)}</div><p>Estuviste afuera <b>${fh(away)}</b>.</p><p>Tu recolector juntó <b>${costPlain(r)}</b>${away>cap?`<br><small>(a nivel ${b.l} cubre hasta ${RH[b.l]} h)</small>`:''}</p>`,[['¡Cobrar!',()=>{sfx('coin');hud()},'gold']]);save();
}
/* ---------- victorias y derrotas: trofeos de liga, racha y cofres ---------- */
function winStuff(){const g=18+6*(S.diff==null?1:S.diff)+(Math.random()*10|0);S.trof=(S.trof||0)+g;S.streak=Math.min(10,(S.streak||0)+1);addChest();toast(`🏆 +${g} trofeos${S.streak>1?' · 🔥 racha de '+S.streak:''}`)}
function lossStuff(){S.trof=Math.max(0,(S.trof||0)-12);if(S.streak>1)toast('💔 Perdiste la racha');S.streak=0}
function revSet(e){S.rev={e:S.enemies.indexOf(e),end:now()+600000};S.trof=Math.max(0,(S.trof||0)-15);S.streak=0;toast(`🔥 Venganza disponible 10 minutos: botín ×2 contra ${e.n}`)}
const revBtn=()=>S.rev&&now()<S.rev.end&&S.enemies[S.rev.e]?`<button class="btn red" data-a="enemy" data-v="${S.rev.e}" style="margin:0 0 10px">🔥 Venganza contra ${S.enemies[S.rev.e].f} ${S.enemies[S.rev.e].n} · botín ×2 · ${ft(S.rev.end-now())}</button>`:'';
/* ---------- cofres: se ganan al vencer, se abren de a uno y tardan según el tipo ---------- */
const CHT=[{n:'Cofre de madera',e:'📦',t:5*60000,k:1},{n:'Cofre de plata',e:'🎁',t:30*60000,k:4},{n:'Cofre de oro',e:'💎',t:120*60000,k:12}];
function addChest(ty){if(S.chests.length>=4){toast('📦 Tus cofres están llenos: abrí alguno');return}if(ty==null){const r=Math.random();ty=r<.62?0:r<.92?1:2}S.chests.push({t:ty,s:0});toast(`${CHT[ty].e} ¡Ganaste un ${CHT[ty].n}!`);chestRender(1)}
function chestLoot(ty){const k=CHT[ty].k,L=S.lvl,r={c:(150+90*L)*k,f:(60+30*L)*k};if(L>=2)r.o=(40+20*L)*k;if(L>=3)r.s=(25+12*L)*k;if(L>=4)r.e=(15+8*L)*k;return r}
const easyUnits=()=>Object.keys(U).filter(u=>!U[u].hero&&!U[u].max&&B[U[u].b]&&S.lvl>=B[U[u].b].lvl);
function chestTap(i){
 const c=S.chests[i];if(!c)return;const T=CHT[c.t],t=now();
 if(c.s&&t>=c.s+T.t){const r=chestLoot(c.t);gain(r);let ex='';
  if(c.t>0){const us=easyUnits(),u=us[Math.random()*us.length|0],n=c.t===2?3:1;if(u){S.troops[u]+=n;ex=`<p>¡Y ${n} ${U[u].n}!</p>`}}
  {const it=Math.random()<[.35,.75,1][c.t]?giveItem(c.t):null;if(it)ex+='<p>🧰 '+itTxt(it)+'</p>'}S.chests.splice(i,1);sfx('lvl');modal(`<div class="mtitle">${T.e} ${T.n}</div><div class="big">✨</div><p><b>${costPlain(r)}</b></p>${ex}`,[['¡Genial!','','gold']]);hud();save();chestRender(1);return}
 if(c.s){const left=c.s+T.t-t,cost=Math.ceil(left/60000)*(40+15*S.lvl);modal(`<div class="mtitle">${T.e} ${T.n}</div><p>Se abre en <b>${ft(left)}</b>.</p>`,[[`⚡ Abrir ya por 💰${fmt(cost)}`,()=>{if(S.c<cost){toast('No te alcanza el oro 😕');return}S.c-=cost;c.s=1;hud();save();chestRender(1)},'gold'],['Esperar']]);return}
 if(S.chests.some(q=>q.s&&t<q.s+CHT[q.t].t)){toast('Ya hay un cofre abriéndose: esperá a que termine');return}
 c.s=t;sfx('click');save();chestRender(1);toast(`${T.e} Abriendo: listo en ${ft(T.t)}`);
}
function chestRender(force){const el=$('#chests');if(!el)return;const t=now();let h='';
 for(let i=0;i<4;i++){const c=S.chests[i];if(!c){h+='<div class="ch empty">＋</div>';continue}const T=CHT[c.t],rd=c.s&&t>=c.s+T.t;h+=`<div class="ch${rd?' ready':''}" data-ch="${i}">${T.e}<small>${rd?'¡Abrir!':c.s?ft(c.s+T.t-t):'Abrir'}</small></div>`}
 if(force||el._h!==h){el._h=h;el.innerHTML=h}}
$('#chests').onclick=e=>{const c=e.target.closest('[data-ch]');if(c)chestTap(+c.dataset.ch)};
/* ---------- misiones diarias ---------- */
const DMP=[['won','Ganá {n} batallas',[3,5,8]],['col','Cobrá {n} veces',[15,30,50]],['trained','Entrená {n} tropas',[10,25,50]],['def','Defendé {n} ataques',[1,2]],['islc','Conquistá {n} islas',[1,2]],['fus','Hacé {n} fusiones',[1,2]],['ev','Atrapá {n} eventos',[2,4]]];
const dayEnd=()=>{const d=new Date();d.setHours(24,0,0,0);return d.getTime()};
function dmCheck(){
 const d=dayStr(now());if(S.dm&&S.dm.d===d)return;const R=rng32(d.split('-').reduce((a,b)=>a*37+ +b,7)),pool=DMP.slice(),list=[];
 while(list.length<3){const[k,t,v]=pool.splice(R()*pool.length|0,1)[0];list.push({k,t,n:v[R()*v.length|0]})}
 const base={};for(const q of list)base[q.k]=S.stats[q.k]||0;S.dm={d,list,base,got:[0,0,0],bonus:0};S.spins=(S.spins||0)+1;save();
}
const dmProg=q=>Math.max(0,(S.stats[q.k]||0)-S.dm.base[q.k]);
function dmHTML(){
 if(!S.dm)return'';const L=S.lvl;let h=`<div class="cat">📅 Misiones diarias · cambian en <b data-until="${dayEnd()}"></b></div>`;
 S.dm.list.forEach((q,i)=>{const p=Math.min(q.n,dmProg(q)),ok=p>=q.n;h+=`<div class="trow"><div class="tinfo"><b>${q.t.replace('{n}',q.n).replace(' 1 islas',' 1 isla').replace(' 1 ataques',' 1 ataque').replace(' 1 fusiones',' 1 fusión')}</b><div class="pb"><i style="width:${p/q.n*100}%"></i></div><div class="small">${p} / ${q.n} · premio 💰${fmt(300+120*L)}</div></div>${S.dm.got[i]?'<div class="small lockt">✓</div>':ok?`<button class="btn sm gold" data-a="dmc" data-v="${i}">Cobrar</button>`:''}</div>`});
 const all=S.dm.got.every(x=>x);
 return h+(all&&!S.dm.bonus?'<button class="btn gold" data-a="dmb">🎁 Premio por las 3: cofre de plata + 1 giro</button>':S.dm.bonus?'<p class="small">✓ Ya cobraste el premio del día.</p>':'<p class="small">Completá las 3 y ganás un cofre de plata y un giro de ruleta.</p>');
}
/* ---------- liga con temporadas semanales ---------- */
const LG=[['🥉 Bronce',0],['🥈 Plata',400],['🥇 Oro',1000],['💠 Cristal',2000],['🎖️ Maestro',3500],['👑 Leyenda',6000]];
const lgIdx=t=>{let i=0;LG.forEach((l,j)=>{if(t>=l[1])i=j});return i};
const week=()=>Math.floor((now()-4*864e5)/(7*864e5)),seasonEnd=()=>(week()+1)*7*864e5+4*864e5;
const fd=ms=>{const h=Math.floor(ms/36e5);return h>=24?Math.floor(h/24)+' d '+(h%24)+' h':ft(ms)};
function seasonCheck(){
 const w=week();if(S.season==null){S.season=w;return}if(w===S.season||modalOpen||BT)return;
 const i=lgIdx(S.trof||0),m=(i+1)*(i+1),r={c:2000*m,s:200*m,e:100*m};gain(r);S.spins=(S.spins||0)+i;S.season=w;S.trof=Math.floor((S.trof||0)*.6);
 modal(`<div class="mtitle">🏆 Fin de temporada</div><p>Terminaste en <b>${LG[i][0]}</b>.</p><p>Premio: <b>${costPlain(r)}</b>${i?` y ${i} giros de ruleta`:''}</p><p class="small">Tus trofeos bajan un poco para la nueva temporada.</p>`,[['¡Vamos!','','gold']]);save();
}
function leagueHTML(){const t=S.trof||0,i=lgIdx(t),nx=LG[i+1];
 return `<div class="mcard" style="margin-bottom:10px"><div class="mnum">LIGA · LA TEMPORADA TERMINA EN ${fd(seasonEnd()-now()).toUpperCase()}</div><div class="mt">${LG[i][0]} · 🏆 ${t}</div>${nx?`<div class="pb"><i style="width:${(t-LG[i][1])/(nx[1]-LG[i][1])*100}%"></i></div><div class="small">Te faltan ${nx[1]-t} trofeos para ${nx[0]}</div>`:'<div class="small">¡Rango máximo!</div>'}<div class="small">Ganás trofeos al vencer y al defender, y los perdés al caer. Al cierre de la semana cobrás según tu rango.</div></div>`}
/* ---------- ruleta ---------- */
const WH=[['💰',22],['🍗',18],['🛢️',14],['⚙️',12],['⚡',10],['🎁',10],['🎖️',10],['💎',4]];let wrot=0,wspin=0;
const wheelBtn=()=>`<button class="btn gold" data-a="wheel" style="margin:0 0 10px">🎡 Ruleta · ${S.spins||0} giro${S.spins===1?'':'s'}</button>`;
function openWheel(){
 const lab=WH.map((w,i)=>`<span style="transform:rotate(${i*45+22.5}deg) translateY(-82px)">${w[0]}</span>`).join('');
 openSheet('wheel','🎡 Ruleta',`<div class="whw"><div class="wh" id="wh" style="transform:rotate(${wrot}deg)">${lab}</div><div class="whp">▼</div></div><p class="small" style="text-align:center">Un giro gratis por día. Ganás más con las misiones diarias, los torneos, los jefes y la liga.</p><button class="btn gold" data-a="spin" ${S.spins>0&&!wspin?'':'disabled'}>🎡 Girar (${S.spins||0})</button>`);
}
function spin(){
 if(wspin||!(S.spins>0))return;S.spins--;wspin=1;save();let r=Math.random()*100,idx=0;for(;idx<WH.length-1;idx++){r-=WH[idx][1];if(r<0)break}
 wrot+=1800+((360-(idx*45+22.5)-wrot)%360+360)%360;const el=$('#wh');if(el){el.style.transition='transform 3.2s cubic-bezier(.17,.67,.2,1)';el.style.transform=`rotate(${wrot}deg)`}
 $('[data-a="spin"]')&&($('[data-a="spin"]').disabled=true);for(let k=0;k<9;k++)setTimeout(()=>sfx('click'),k*k*40);
 setTimeout(()=>{wspin=0;const L=S.lvl;let txt;
  if(idx<5){const key=['c','f','o','s','e'][idx],amt=[300+150*L,200+100*L,150+80*L,100+60*L,60+40*L][idx]*2;S[key]+=amt;txt=RES[key]+fmt(amt)}
  else if(idx===5){addChest(1);txt='un cofre de plata'}
  else if(idx===6){const us=easyUnits(),u=us[Math.random()*us.length|0];S.troops[u]+=3;txt='3 '+U[u].n}
  else{const a=(300+150*L)*15;S.c+=a;txt='💎 ¡JACKPOT! 💰'+fmt(a)}
  sfx(idx===7?'win':'coin');toast('🎡 Ganaste '+txt);hud();save();if(sheet.kind==='wheel')openWheel()},3400);
}
/* ---------- colección: cada grupo completo da +5% de producción para siempre ---------- */
const CG=[['🎖️ Infantería',['soldado','marine','bazuca','franco']],['🚙 Vehículos',['tanque','pesado','misil']],['🚁 Aéreos',['helicoptero','caza','bombardero','b2']],['🐉 Dragones',['dragon','dfuego','dhielo','delec']],['🤖 Robots',['robot','rexp','rescudo','rmed','rart','rara','titan']],['🧬 Fusiones',FUS.map(f=>f[1])]];
const colDone=()=>CG.filter(g=>g[1].every(u=>S.colu[u])).length;
function colTrack(){let ch=0;for(const u in S.troops)if(S.troops[u]>0&&U[u]&&!S.colu[u]){S.colu[u]=1;ch=1;if(!U[u].hero||U[u].fus)toast(`📖 Nueva en tu colección: ${U[u].n}`)}if(ch)save()}
/* ---------- álbum de edificios e islas: cada sección completa se cobra una vez ---------- */
const BCAT=[['🏠 Producción',['casa','granja','pozo','mina','central','banco']],['⚔️ Militar',['cuartel','fabrica','hangar','lab','forja','astillero','genetico']],['🛡️ Defensa',['muro','trampa','torre','bunker','antiaereo','mortero','tesla','laser','llamat','tfranco','costa','escudo']]];
const ALBK=new Set(BCAT.flatMap(c=>c[1]));
function albTrack(){let ch=0;const first=!S.colb._;S.colb._=1;for(const b of S.g)if(b&&done(b)&&ALBK.has(b.t)&&!S.colb[b.t]){S.colb[b.t]=1;ch=1;if(!first)toast(`📖 Nuevo en el álbum: ${B[b.t].n}`)}S.isl.forEach((s,i)=>{if(s.o<0&&!S.coli[i]){S.coli[i]=1;ch=1}});if(ch)save()}
const albRw=k=>k==='isl'?{c:20000*S.lvl,e:400*S.lvl}:{c:6000*S.lvl,s:300*S.lvl};
function albHTML(){let h='<div class="cat">🏗️ Álbum de edificios</div>';
 BCAT.forEach(([n,ks],gi)=>{ks=ks.filter(k=>B[k]);const got=ks.filter(k=>S.colb[k]).length,ok=got===ks.length,cl=S.colr['b'+gi];
  h+=`<div class="albh"><b>${n}</b> <span class="small">${got}/${ks.length}</span>${ok&&!cl?`<button class="btn sm gold" data-a="albc" data-v="b${gi}">🎁 Cobrar</button>`:cl?'<span class="small lockt">Cobrado ✓</span>':`<span class="small">🎁 ${costPlain(albRw('b'))} + pieza</span>`}</div><div class="colg">${ks.map(k=>`<div class="${S.colb[k]?'':'nc'}">${S.colb[k]?svgArt(k,1):'<span class="q">?</span>'}<small>${S.colb[k]?B[k].n:'???'}</small></div>`).join('')}</div>`});
 const gi=ISL.filter((d,i)=>S.coli[i]).length,ok=gi===ISL.length,cl=S.colr.isl;
 h+=`<div class="cat">🏝️ Álbum de islas</div><div class="albh"><b>Conquistadas</b> <span class="small">${gi}/${ISL.length}</span>${ok&&!cl?'<button class="btn sm gold" data-a="albc" data-v="isl">🎁 Cobrar</button>':cl?'<span class="small lockt">Cobrado ✓</span>':`<span class="small">🎁 ${costPlain(albRw('isl'))} + pieza épica</span>`}</div><div class="colg">${ISL.map((d,i)=>`<div class="${S.coli[i]?'':'nc'}"><span class="q">${S.coli[i]?'🏝️':'?'}</span><small>${S.coli[i]?d.n:'???'}</small></div>`).join('')}</div>`;
 return h}
function albClaim(v){if(S.colr[v])return;if(v==='isl'){if(!ISL.every((d,i)=>S.coli[i]))return;gain(albRw('isl'));giveItem(3)}else{const ks=BCAT[+v.slice(1)][1].filter(k=>B[k]);if(!ks.every(k=>S.colb[k]))return;gain(albRw('b'));giveItem(2)}S.colr[v]=1;sfx('done');hud();save();toast('🎁 ¡Premio del álbum cobrado!');openCol()}
/* ---------- avisos: si dejás el juego abierto de fondo, te avisa cuando algo termina ---------- */
let NTT=[];
const ntOk=()=>'Notification'in window&&Notification.permission==='granted'&&S.notif;
function ntPlan(){for(const t of NTT)clearTimeout(t);NTT=[];if(!ntOk()||!document.hidden)return;const t=now(),ev=[];
 S.g.forEach(b=>{if(b&&b.end>t)ev.push([b.end,`🏗️ ${B[b.t].n} ${b.up?'mejorado':'terminado'}`])});
 for(const q of S.queue||[])if(q.end>t)ev.push([q.end,'🎖️ Tus tropas están listas']);
 for(const x of S.exp||[])if(x.e>t)ev.push([x.e,`⛵ Tu expedición llegó a ${ISL[x.i].n}`]);
 ev.sort((a,b)=>a[0]-b[0]);for(const[at,msg]of ev.slice(0,6))NTT.push(setTimeout(()=>{try{new Notification('War or War',{body:msg,tag:msg})}catch(e){}},at-t))}
document.addEventListener('visibilitychange',ntPlan);
async function ntToggle(){if(S.notif){S.notif=0;save();toast('🔕 Avisos apagados');return}
 if(!('Notification'in window)){toast('Este navegador no permite avisos');return}
 let pm=Notification.permission;if(pm==='default'){try{pm=await Notification.requestPermission()}catch(e){pm='denied'}}
 if(pm!=='granted'){toast('🔕 El navegador no dio permiso para avisos');return}S.notif=1;save();toast('🔔 Avisos activados: te aviso cuando algo termine');try{new Notification('War or War',{body:'🔔 Los avisos funcionan'})}catch(e){}}
/* ---------- raciones y mercado ---------- */
const rations=a=>{let n=0;for(const u in a)if(a[u]>0&&U[u]&&!U[u].hero)n+=U[u].atk*a[u];return Math.round(n*.6)};
const MKT=[['s','⚙️ Acero',34],['o','🛢️ Petróleo',9],['f','🍗 Comida',3],['e','⚡ Energía',70]];
function mktRate(k,base){const v=(S.mk&&S.mk.d===dayStr(now())&&S.mk[k])||0;return Math.round(base*(1+v*.12))}
function openMkt(){const L=S.lvl;let h=`<p class="small" style="margin-top:0">Cambiá el oro que te sobra por otros recursos. Cada compra del día encarece la siguiente del mismo recurso; los precios vuelven a la normalidad a la medianoche. La <b>energía ⚡</b> es el recurso más escaso del juego.</p>`;
 for(const[k,n,base]of MKT){const r=mktRate(k,base),qs=[250,1000,5000].map(q=>Math.round(q*Math.max(1,L/4)));
  h+=`<div class="cat">${n}</div><div class="mkr">${qs.map(q=>{const c=q*r;return `<button class="btn ${S.c>=c?'gold':''}" data-a="mkb" data-v="${k}:${q}" ${S.c>=c?'':'disabled'}><b>+${fmt(q)} ${RES[k]}</b><small>💰${fmt(c)}</small></button>`}).join('')}</div><div class="small">Hoy: 💰${r} por cada ${RES[k]}</div>`}
 openSheet('mkt','🏪 Mercado',h)}
function mktBuy(v){const[k,qs]=v.split(':'),q=+qs,it=MKT.find(m=>m[0]===k);if(!it)return;const c=q*mktRate(k,it[2]);if(S.c<c){toast('💰 No te alcanza el oro');return}
 const t=dayStr(now());if(!S.mk||S.mk.d!==t)S.mk={d:t};S.c-=c;S[k]+=q;S.mk[k]=(S.mk[k]||0)+1;sfx('buy');hud();save();toast(`🏪 Compraste ${fmt(q)} ${RES[k]}`);openMkt()}
/* ---------- menú y ajustes ---------- */
const MENU=[
 [['cuenta','☁️ Cuenta',()=>openCuenta()],['jug','🔎 Jugadores',()=>openJug()],['prof','👤 Perfil',()=>openProf()],['cos','🎨 Personalizar',()=>openCos()],['col','📖 Colección y álbum',()=>openCol()]],
 [['mkt','🏪 Mercado',()=>openMkt()],['set','⚙️ Ajustes',()=>openSet()]],
 [['bk','💾 Copia de seguridad',()=>openBackup()],['tut','🎓 Ver el tutorial',()=>{S.tut=0;TUTB=null;save();closeSheet()}],['help','📖 Cómo jugar',()=>{closeSheet();help()}],['reset','🔄 Empezar de cero',()=>{closeSheet();modal(`<div class="mtitle">¿Empezar de cero?</div><p>Vas a perder toda tu base, tropas y progreso.</p>`,[['Sí, borrar todo',()=>{const sy=S.sync;S=fresh();migrate();S.help=1;S.tut=0;TUTB=null;S.sync=sy;sndBtn();setTimeout(()=>cloudSave(1),0);PL=null;MV=null;save();layout();hud()},'red'],['Cancelar']])}]]];
function openMenu(){const nm=['Tu comandante','Juego','Partida'];let h=`<div style="text-align:center;margin:-4px 0 6px">${LOGO(92,GAMEN)}</div><p class="small" style="margin-top:0">${cState==='ok'?'☁️ Tu partida se guarda en tu cuenta de Claude':'💾 Tu partida se guarda solo en este navegador'}</p>`;
 MENU.forEach((g,i)=>{h+=`<div class="cat" data-nav="0">${nm[i]}</div><div class="mgrid">${g.map(([k,n])=>`<button class="btn ${k==='reset'?'red':''}" data-a="menu" data-v="${k}">${n}</button>`).join('')}</div>`});openSheet('menu','⚙️ Menú',h)}
const vol=k=>(S[k]==null?80:S[k])/100;
function audioVol(){if(!AC)return;if(FXG)FXG.gain.value=S.mute?0:vol('vfx');if(MUG)MUG.gain.value=S.mute||S.nomus?0:vol('vmu')}
function openSet(){const sw=(k,on,n,d)=>`<div class="setr"><div><b>${n}</b>${d?`<div class="small">${d}</div>`:''}</div><button class="tgl ${on?'on':''}" data-a="setq" data-v="${k}"><i></i></button></div>`;
 const sl=(k,n)=>`<div class="setr"><b>${n}</b><input type="range" min="0" max="100" step="5" value="${S[k]==null?80:S[k]}" data-set="${k}"></div>`;
 let h='<div class="cat" data-nav="0">🔊 Sonido</div>'+sw('mute',!S.mute,'Sonido')+sl('vfx','Efectos')+sw('nomus',!S.nomus,'Música')+sl('vmu','Volumen de la música');
 h+='<div class="cat">🌅 Luz del mapa</div><div class="seg">'+[['real','🕒 Hora real'],['dia','☀️ Siempre de día'],['tarde','🌇 Atardecer']].map(([k,n])=>`<button class="btn ${(S.sky||'real')===k?'gold':''}" data-a="setsky" data-v="${k}">${n}</button>`).join('')+'</div>';
 h+='<div class="cat" data-nav="0">🖼️ Gráficos</div><div class="seg">'+[['hi','✨ Completos'],['lo','⚡ Livianos'],['eco','🔋 Ahorro']].map(([k,n])=>`<button class="btn ${(k==='eco'?S.eco:!S.eco&&(k==='lo')===LITE)?'gold':''}" data-a="setq" data-v="g${k}">${n}</button>`).join('')+'</div><p class="small">Livianos: menos detalle para celulares. Ahorro: además saca las tropas que pasean, las nubes y las partículas.</p>';
 h+=sw('mapc',MAPC,'Mapa en lienzo','Prueba: dibuja todos los edificios en un solo lienzo');
 h+='<div class="cat" data-nav="0">🎮 Juego</div>'+sw('vib',S.vib!==0,'Vibración','En explosiones, al cobrar y al subir de nivel')+sw('big',!!S.big,'Texto grande')+sw('notif',!!S.notif,'Avisos','Te avisa cuando algo termina, si el juego queda abierto de fondo')+`<div class="setr"><b>Dificultad</b><button class="btn sm" data-a="setq" data-v="diff">${dif().n}</button></div>`;
 const E=errList();h+=`<div class="cat" data-nav="0">🐞 Registro de errores</div><p class="small">${E.length?`Se guardaron ${E.length} errores. Si algo anduvo mal, copialo y pasámelo.`:'No hubo errores. 👍'}</p>${E.length?`<div class="errl">${E.slice(-5).reverse().map(e=>`<div><small>${new Date(e.t).toLocaleString('es-AR')}</small>${esc(e.m)}</div>`).join('')}</div><div class="row2"><button class="btn" data-a="errcopy">📋 Copiar registro</button><button class="btn" data-a="setq" data-v="errclr">🗑️ Borrar</button></div>`:''}`;
 h+='<p class="small" style="margin-top:14px;text-align:center">Sonidos de interfaz: uisfx (dominio público, CC0).</p>';openSheet('set','⚙️ Ajustes',h)}
function setQ(v){
 if(v==='mute'){S.mute=!S.mute;sndBtn();audioVol()}else if(v==='nomus'){S.nomus=!S.nomus;audioVol()}else if(v==='vib'){S.vib=S.vib===0?1:0;vib(30)}else if(v==='big'){S.big=!S.big;document.documentElement.classList.toggle('bigtxt',!!S.big)}
 else if(v==='notif'){setTimeout(()=>ntToggle().then(openSet),0);return}else if(v==='diff'){S.diff=((S.diff==null?1:S.diff)+1)%3;toast('Dificultad: '+dif().n+'. Rivales, islas y botín se ajustan.')}
 else if(v==='mapc'){MAPC=!MAPC;try{localStorage.setItem('gdb-mapc',MAPC?'1':'0')}catch(e){}if(MCV){MCV.remove();MCV=null;MCK='';MCP=''}layout(1)}
 else if(v==='errclr'){try{localStorage.removeItem('gdb-err')}catch(e){}ERRL=[]}
 else if(v[0]==='g'){const q=v.slice(1);S.eco=q==='eco'?1:0;const lo=q!=='hi';if(lo!==LITE){LITE=lo;try{localStorage.setItem('gdb-gfx',LITE?'lo':'hi')}catch(e){}document.documentElement.classList.toggle('lite',LITE);for(const k in SPC)delete SPC[k]}document.documentElement.classList.toggle('eco',!!S.eco);layout(1)}
 save();openSet()}
$('#shbody').addEventListener('input',e=>{const t=e.target.closest('[data-set]');if(!t)return;S[t.dataset.set]=+t.value;audioVol();save()});
$('#shbody').addEventListener('change',e=>{if(e.target.closest('[data-set="vfx"]'))sfx('coin')});
const vib=ms=>{if(S.vib!==0&&navigator.vibrate)try{navigator.vibrate(ms)}catch(e){}};
/* registro de errores: se guardan los últimos 30 en el navegador */
let ERRL=null;const errList=()=>{if(!ERRL){try{ERRL=JSON.parse(localStorage.getItem('gdb-err')||'[]')}catch(e){ERRL=[]}}return ERRL};
function errLog(m){const L=errList();const s=String(m).slice(0,300);if(L.length&&L[L.length-1].m===s)return;L.push({t:Date.now(),m:s});if(L.length>30)L.shift();try{localStorage.setItem('gdb-err',JSON.stringify(L))}catch(e){}}
window.addEventListener('error',e=>errLog((e.message||'error')+(e.lineno?' · línea '+e.lineno+':'+e.colno:'')));
window.addEventListener('unhandledrejection',e=>errLog('Promesa: '+((e.reason&&e.reason.message)||e.reason)));
function errCopy(){const txt='War or War · registro de errores\n'+navigator.userAgent+'\nNivel '+S.lvl+' · '+(LITE?'livianos':'completos')+'\n\n'+errList().map(e=>new Date(e.t).toISOString()+'  '+e.m).join('\n');
 const ok=()=>toast('📋 Registro copiado: pegalo en el chat');if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,()=>toast('No se pudo copiar'));else toast('No se pudo copiar')}
