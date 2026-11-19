/* ---------- misiones ---------- */
const MS=[
 {t:'Tocá la casa con la burbuja 💰 para cobrar',ok:()=>S.stats.col>=1,r:{c:50},x:10},
 {t:'Construí 3 casas 🏠',ok:()=>cnt('casa')>=3,p:()=>[cnt('casa'),3],r:{c:100},x:20},
 {t:'Construí un cuartel ⛺',ok:()=>cnt('cuartel')>=1,r:{c:50,f:40},x:20},
 {t:'Entrená 5 soldados 🎖️',ok:()=>(S.stats.byU.soldado||0)>=5,p:()=>[S.stats.byU.soldado||0,5],r:{c:100,f:30},x:25},
 {t:'Ganá tu primera batalla ⚔️',ok:()=>S.stats.won>=1,r:{c:150},x:30},
 {t:'Construí 2 granjas 🌾',ok:()=>cnt('granja')>=2,p:()=>[cnt('granja'),2],r:{c:100},x:20},
 {t:'Llegá a nivel 2',ok:()=>S.lvl>=2,r:{c:200},x:0},
 {t:'Construí un pozo de petróleo ⛽',ok:()=>cnt('pozo')>=1,r:{c:100,o:50},x:30},
 {t:'Construí una torre de defensa 🗼',ok:()=>cnt('torre')>=1,r:{c:150},x:30},
 {t:'Mejorá un edificio a nivel 2',ok:()=>S.g.some(b=>b&&b.l>=2),r:{c:200},x:40},
 {t:'Ganá 5 batallas',ok:()=>S.stats.won>=5,p:()=>[S.stats.won,5],r:{c:300,o:50},x:50},
 {t:'Llegá a nivel 3',ok:()=>S.lvl>=3,r:{c:300,o:100},x:0},
 {t:'Construí una fábrica de tanques 🏭',ok:()=>cnt('fabrica')>=1,r:{c:200,o:100},x:50},
 {t:'Entrená 3 tanques',ok:()=>(S.stats.byU.tanque||0)>=3,p:()=>[S.stats.byU.tanque||0,3],r:{c:300,o:100},x:60},
 {t:'Derrotá a un enemigo de nivel 4 o más',ok:()=>S.stats.maxBeat>=4,r:{c:500,o:150},x:80},
 {t:'Defendé tu base de 3 ataques 🛡️',ok:()=>S.stats.def>=3,p:()=>[S.stats.def,3],r:{c:400},x:60},
 {t:'Llegá a nivel 5',ok:()=>S.lvl>=5,r:{c:600,o:200},x:0},
 {t:'Construí un hangar 🛫',ok:()=>cnt('hangar')>=1,r:{c:500,o:200},x:100},
 {t:'Entrená 2 helicópteros 🚁',ok:()=>(S.stats.byU.helicoptero||0)>=2,p:()=>[S.stats.byU.helicoptero||0,2],r:{c:600,o:200},x:120},
 {t:'Derrotá a un enemigo de nivel 8 o más',ok:()=>S.stats.maxBeat>=8,r:{c:1500,o:500},x:200},
 {t:'Ganá 30 batallas',ok:()=>S.stats.won>=30,p:()=>[S.stats.won,30],r:{c:3000,o:800},x:300},
 {t:'Conquistá una isla 🏝️ (tocala en el mar o entrá a Atacar)',ok:()=>S.isl.some(x=>x.o<0),r:{c:500},x:60},
 {t:'Comprá más terreno para tu isla 🗺️',ok:()=>N>10,r:{c:800},x:80},
 {t:'Construí un laboratorio de robótica 🔬',ok:()=>cnt('lab')>=1,r:{c:600,o:200},x:80},
 {t:'Investigá una mejora robótica 🔧',ok:()=>S.tech.atk+S.tech.bld+S.tech.gold>=1,r:{c:800,o:200},x:80},
 {t:'Fabricá 2 robots de combate 🤖',ok:()=>(S.stats.byU.robot||0)>=2,p:()=>[S.stats.byU.robot||0,2],r:{c:1000,o:300},x:120},
 {t:'Tené 3 islas al mismo tiempo 🏝️',ok:()=>S.isl.filter(x=>x.o<0).length>=3,p:()=>[S.isl.filter(x=>x.o<0).length,3],r:{c:2000,o:500},x:150},
 {t:'Construí la forja de dragones 🐉',ok:()=>cnt('forja')>=1,r:{c:2000,o:800},x:200},
 {t:'Fabricá un dragón robótico 🐉',ok:()=>(S.stats.byU.dragon||0)>=1,r:{c:3000,o:1000},x:300},
 {t:'Construí una mina de acero ⛏️',ok:()=>cnt('mina')>=1,r:{c:400,s:80},x:60},
 {t:'Construí una central de energía ⚡',ok:()=>cnt('central')>=1,r:{c:600,e:60},x:80},
 {t:'Hundí un barco pirata 🏴‍☠️',ok:()=>(S.stats.pir||0)>=1,r:{c:800,s:100},x:100},
 {t:'Mejorá un edificio a nivel 5',ok:()=>S.g.some(b=>b&&b.l>=5),r:{c:2000,s:300},x:150},
 {t:'Mejorá un edificio a nivel 7 ⭐',ok:()=>S.g.some(b=>b&&b.l>=7),r:{c:6000,s:800,e:400},x:400},
];
function openMis(){
 const m=MS[S.mi];let h='';
 if(!m)h='<div class="done">🏆 ¡Completaste todas las misiones!<br>Seguí conquistando bases.</div>';
 else{const ok=m.ok(),p=m.p?m.p():null;
  h=`<div class="mcard"><div class="mnum">MISIÓN ${S.mi+1} DE ${MS.length}</div><div class="mt">${m.t}</div>${p?`<div class="pb"><i style="width:${Math.min(100,p[0]/p[1]*100)}%"></i></div><div class="small">${Math.min(p[0],p[1])} / ${p[1]}</div>`:''}<div class="small" style="margin-top:6px">Premio: <b>${costPlain(m.r)}${m.x?' · +'+m.x+'⭐':''}</b></div>${ok?'<button class="btn gold" data-a="claim">🎁 Cobrar premio</button>':'<div class="small" style="margin-top:6px">En progreso…</div>'}</div>`}
 const st=S.stats;
 h+=`<div class="stats"><div><b>${st.won}</b>Batallas ganadas</div><div><b>${st.lost}</b>Batallas perdidas</div><div><b>${st.def}</b>Ataques defendidos</div><div><b>${st.trained}</b>Tropas entrenadas</div></div>`;
 openSheet('mis','📜 Misiones',wheelBtn()+leagueHTML()+dmHTML()+h+achHTML());
}

/* ---------- acciones ---------- */
function act(a,v){
 const i=sheet.i,b=i!=null?S.g[i]:null;
 switch(a){
  case 'build':{const d=B[v];if(v==='recolector'&&S.g.some(q=>q&&q.t==='recolector')){toast('Solo podés tener un Recolector');return}if(S.lvl<d.lvl){toast(`Se desbloquea en nivel ${d.lvl}`);return}if(!can(d.cost)){toast('No te alcanza 😕');return}PL=v;MV=null;closeSheet();setMode();break}
  case 'up':{const d=B[b.t],c=upCost(b);if(b.l>=maxL(d))return;if(!can(c)){toast('No te alcanza para mejorar 😕');return}pay(c);b.up=1;b.dur=d.t*(b.l+1)*1000*bm();b.end=now()+b.dur;hammer(2);dust(i,8);hud();save();openInfo(i);break}
  case 'rush':{const c=rushCost(b);if(S.c<c){toast('No te alcanzan las monedas');return}S.c-=c;b.end=now();tick();break}
  case 'mv':MV=i;PL=null;closeSheet();setMode();break;
  case 'sell':{const d=B[b.t],val=sellVal(b);closeSheet();modal(`<div class="mtitle">¿Vender?</div><div class="big">${svgArt(b.t,b.l)}</div><p>Vas a vender ${d.n}${val?` y recibir ${RES.c}${val}`:''}.</p>`,[['Sí, vender',()=>{if(S.g[i]===b){S.g[i]=null;S.c+=val;render();hud();save()}},'red'],['Cancelar']]);break}
  case 'troops':openTroops();break;
  case 'train':train(v,1);break;
  case 'qtog':qOpen=!qOpen;{const q=$('#qlist');if(q){q._s='';live()}}break;
  case 'qdelg':qDelGroup(+v);sfx('click');live();break;
  case 'qclr':{const n=S.queue.length;while(S.queue.length)qRemove(S.queue.length-1);toast(`Cola vacía: te devolví ${n} tropas en recursos`);live();break}
  case 'train5':train(v,5);break;
  case 'enemy':openSelect(v);break;
  case 'campmap':openCamp();break;
  case 'visit':visit(+v);break;
  case 'visitp':visitP(+v);break;
  case 'worker':hireWorker(sheet.i);break;
  case 'exped':{const e=target(sheet.ei);if(e.isl==null)return;const army={};for(const u in U)if(SEL[u]>0){army[u]=Math.min(SEL[u],S.troops[u]);S.troops[u]-=army[u];if(!army[u])delete army[u]}if(!Object.keys(army).length)return;const t=now();const nav=Object.keys(army).some(u=>U[u].nav);S.exp.push({i:e.isl,army,s:t,e:t+expDur(e.isl)*(nav?.6:1),nav});closeSheet();setTimeout(()=>goIsl(e.isl),200);toast(`⛵ Tu expedición zarpó hacia ${ISL[e.isl].n}`);sfx('build');hud();save();break}
  case 'dmc':{const q=S.dm.list[+v];if(S.dm.got[+v]||dmProg(q)<q.n)return;S.dm.got[+v]=1;S.c+=300+120*S.lvl;sfx('coin');hud();save();openMis();break}
  case 'dmb':{if(S.dm.bonus||!S.dm.got.every(x=>x))return;S.dm.bonus=1;addChest(1);S.spins=(S.spins||0)+1;save();openMis();break}
  case 'wheel':openWheel();break;
  case 'spin':spin();break;
  case 'col':openCol();break;
  case 'cmd':openCmd();break;
  case 'goisl':closeSheet();goIsl(+v);break;
  case 'kraken':openKraken();break;
  case 'pfname':pfName();break;
  case 'pfmotto':pfMotto();break;
  case 'pfav':{const a=AVS[+v];if(a&&avOk(a[1])){S.prof.av=a[0];pPrev='';save();hud();openProf()}break}
  case 'pfcos':openCos();break;
  case 'albc':albClaim(v);break;
  case 'tdgo':startTD();break;
  case 'atab':S.atab=v;openAttack();$('#shbody').scrollTop=0;break;
  case 'selq':{for(const u in U)SEL[u]=v==='all'?S.troops[u]||0:v==='half'?Math.ceil((S.troops[u]||0)/2):0;openSelect(sheet.ei,1);break}
  case 'menu':{const it=MENU.flat().find(x=>x[0]===v);if(it)it[2]();break}
  case 'setq':setQ(v);break;
  case 'setsky':S.sky=v;save();skyTick();openSet();break;
  case 'errcopy':errCopy();break;
  case 'mkb':mktBuy(v);break;
  case 'krclaim':krClaim(v);break;
  case 'cos':{const[k,i]=v.split(':');S.cos[k]=+i;cosApply();save();openCos();break}
  case 'bkcopy':bkCopy();break;
  case 'bkdl':bkDl();break;
  case 'bkimp':bkImp();break;
  case 'world':wSel=-1;openWorld();break;
  case 'wsel':wSel=+v;openWorld();break;
  case 'clan':openClan();break;
  case 'cjoin':S.clan={i:+v,xp:0,med:0,rq:now()+120000};RSC=null;sfx('done');toast(`${CLANS[+v].f} ¡Te uniste a ${CLANS[+v].n}!`);save();openClan();break;
  case 'cleave':closeSheet();modal('<div class="mtitle">¿Salir del clan?</div><p>Perdés el nivel del clan y tus medallas.</p>',[['Sí, salir',()=>{S.clan=null;RSC=null;save()},'red'],['Cancelar']]);break;
  case 'cdon':{if(!S.clan||S.troops[v]<5)return;S.troops[v]-=5;const m=Math.max(1,Math.round(U[v].atk/4));S.clan.med+=m;S.clan.xp+=m*3;RSC=null;sfx('coin');toast(`🤝 Aportaste 5 ${U[v].n}: +${m} medallas`);hud();save();openClan();break}
  case 'cbuy':{const s=CSHOP[+v];if(!S.clan||S.clan.med<s[2])return;S.clan.med-=s[2];s[3]();sfx('coin');hud();save();openClan();break}
  case 'siege':closeSheet();openSiege();break;
  case 'storyo':openStory();break;
  case 'story':{const i=+v;if(i!==S.story)return;closeSheet();talk(STO[i].pre,()=>setTimeout(()=>openSelect('s'+i),0));break}
  case 'cmdsel':S.cmdSel=v;save();openCmd();break;
  case 'cmdbuy':{const H=HER.find(q=>q.k===v);if(!H||S.cmd[v]||S.lvl<H.lv)return;if(!can(H.cost)){toast('No te alcanza 😕');return}pay(H.cost);S.cmd[v]={lvl:1,xp:0,inj:0};if(!S.cmdSel)S.cmdSel=v;sfx('lvl');toast(`${H.f} ¡${H.n} se unió a tu ejército!`);hud();save();openCmd();break}
  case 'res':openRes();break;
  case 'rs':{if(S.rsq)return;const[bk,j]=v.split('.'),i=(S.rs[bk]||[]).length,nd=RT[bk].L[i];if(!nd)return;const c=rsCost(i);if(!can(c)){toast('No te alcanza 😕');return}pay(c);const nm=Array.isArray(nd[0])?nd[+j][0]:nd[0];S.rsq={b:bk,i,c:+j,nm,end:now()+RTT[i]*60000};sfx('build');hud();save();openRes();break}
  case 'rsr':{const c=rsRush();if(!S.rsq)return;if(S.c<c){toast('No te alcanza el oro 😕');return}S.c-=c;S.rsq.end=now();rsTick();hud();break}
  case 'ars':openArs();break;
  case 'eq':eqPick(+v);break;
  case 'uneq':{const it=S.inv.find(i=>i.id===+v);if(it)it.u='';save();openArs();break}
  case 'scrap':{const k=S.inv.findIndex(i=>i.id===+v);if(k<0)return;const it=S.inv[k];S.s+=scrapV(it);S.inv.splice(k,1);sfx('coin');hud();save();openArs();break}
  case 'shop':openShop();break;
  case 'buy':buy(+v);break;
  case 'fusion':openFusion();break;
  case 'fuse':fuse(+v);break;
  case 'hero':newHero();break;
  case 'camp':tapCamp(+v);break;
  case 'expand':expand();break;
  case 'tech':openTech();break;
  case 'research':{const d=TECH[v],l=S.tech[v];if(l>=TMAX||l>=labLvl())return;const c=techCost(v,l);if(!can(c)){toast('No te alcanza para investigar 😕');return}pay(c);S.tech[v]++;toast(`${d.e} ${d.n} nivel ${l+1}`);addXP(40*(l+1));hud();save();openTech();break}
  case 'sm':SEL[v]=Math.max(0,SEL[v]-1);openSelect(sheet.ei,1);break;
  case 'sp':SEL[v]=Math.min(S.troops[v],SEL[v]+1);openSelect(sheet.ei,1);break;
  case 'sa':SEL[v]=SEL[v]===S.troops[v]?0:S.troops[v];openSelect(sheet.ei,1);break;
  case 'go':startBattle(sheet.ei,0);break;
  case 'golive':startBattle(sheet.ei,1);break;
  case 'ulv':upUnit(v);break;
  case 'claim':{const m=MS[S.mi];if(!m||!m.ok())return;gain(m.r);S.mi++;toast('🎁 '+costPlain(m.r));addXP(m.x);hud();save();openMis();break}
 }
}
function collectAll(){
 let n=0;S.g.forEach((b,i)=>{if(b&&ready(b)){collect(i,1);n++}});
 ISL.forEach((d,i)=>{if(islReady(i)){islCollect(i);n++}});
 if(!n)toast('No hay nada para cobrar todavía');else{checkLvl();render();hud();save()}
}
/* ---------- rivales que progresan ---------- */
function rivals(t){islWar(t);S.enemies.forEach((e,i)=>{if(t<e.nx)return;e.nx=t+(3+Math.random()*4)*60000*dif().sp;if(e.lvl<(2+(S.diff==null?1:S.diff))*S.lvl+i+1){e.lvl++;if(Math.random()<.5)toast(`📈 ${e.n} subió a nivel ${e.lvl}`)}})}
function rankHTML(){
 const own=i=>S.isl.filter(x=>x.o===i).length,rows=S.enemies.map((e,i)=>({n:e.f+' '+e.n,s:eDef(e)+150*own(i)}));
 rows.push({n:myTag(),s:defense()+armyPow(S.troops)+150*own(-1),me:1});rows.sort((a,b)=>b.s-a.s);
 return `<div class="cat">🏆 Ranking de poder</div><div class="rank">${rows.map((r,k)=>`<div class="${r.me?'me':''}"><span>${k+1}.</span> ${r.n} <b>${fmt(r.s)}</b></div>`).join('')}</div>`;
}
/* ---------- islas ---------- */
let islSig='';
const islPos=i=>{const W=N*100,H=N*50+220,Q=N*25+110;return[[100,125],[W-100,125],[300,85],[W-300,85],[110,H-125],[W-110,H-125],[-150,Q-130],[W+150,Q-130],[-150,Q+140],[W+150,Q+140]][i]};
function islTick(){const s=tw+'|'+N+'|'+S.isl.map((x,i)=>x.o+(islReady(i)?'R':'')+(x.o<0?islRate(i):islDef(i))).join();if(s!==islSig){islSig=s;renderIsl()}}
function renderIsl(){
 const k=tw/100;let h='';
 ISL.forEach((d,i)=>{const s=S.isl[i],[x,y]=islPos(i),mine=s.o<0;
  h+=`<div class="isl${mine?' mine':''}" data-isl="${i}" style="left:${(x-85)*k+OX}px;top:${(y-75)*k}px;width:${170*k}px;height:${130*k}px;font-size:${tw*.8}px">${islSvg(mine,i)}<div class="itag">${mine?'⭐ '+d.n:S.enemies[s.o].f+' '+d.n}<br>${mine?'+'+islRate(i)+'💰/min':'🛡️'+islDef(i)}</div>${islReady(i)?'<div class="bub" style="top:-6%">💰</div>':''}</div>`});
 $('#isls').innerHTML=h;
}
function floatAt(x,y,txt){const f=document.createElement('div');f.className='ft';f.textContent=txt;f.style.left=x+'px';f.style.top=y+'px';$('#map').appendChild(f);setTimeout(()=>f.remove(),1300)}
function islCollect(i,solo){const a=islAmt(i);if(!a)return;S.c+=a;S.isl[i].lc=now();const[x,y]=islPos(i),k=tw/100;floatAt(x*k+OX,(y-60)*k,'+'+a+'💰');burst(x*k+OX,(y-30)*k,'💰',5);if(solo){hud();save();islTick()}}
function tapIsl(i){
 if(PL||MV!=null)return;
 {const x=S.exp.find(q=>q.i===i);if(x){toast(`⛵ Expedición en curso: ${ft(x.e-now())}`);return}}
 if(S.isl[i].o<0){if(islAmt(i)>0)islCollect(i,1);else toast(`${ISL[i].n} produce +${islRate(i)}💰 por minuto`);return}
 openSelect('i'+i);
}
function islListHTML(){
 let h='<div class="cat">🏝️ Islas</div>';
 ISL.forEach((d,i)=>{const s=S.isl[i],mine=s.o<0,o=S.enemies[s.o];
  h+=`<div class="erow"><div class="ef">🏝️</div><div class="einfo"><b>${d.n}</b> ${mine?'<span class="tag" style="background:#2f7fe0">Tuya</span>':`<span class="tag">${o.f} Nv ${o.lvl}</span>`}<div class="small">${mine?`Te da +${islRate(i)}💰 por minuto`:`🛡️${islDef(i)} · Da +${islRate(i)}💰 por minuto`}</div></div>${mine?'':S.exp.some(x=>x.i===i)?`<div class="small lockt">⛵ ${ft(S.exp.find(x=>x.i===i).e-now())}</div>`:`<button class="btn sm" data-a="enemy" data-v="i${i}" title="Expedición en tiempo real">⛵</button><button class="btn sm red" data-a="enemy" data-v="i${i}">Atacar</button>`}</div>`});
 return h+'<p class="small">⛵ Expedición en tiempo real: las tropas zarpan y la isla se conquista al llegar, con botín ×1,5. Tocá ⛵ o Atacar y elegí la expedición arriba de todo.</p>';
}
/* ---------- mejoras robóticas ---------- */
const labLvl=()=>S.g.reduce((m,b)=>b&&b.t==='lab'&&done(b)?Math.max(m,b.l):m,0);
function openTech(){
 const L=labLvl();
 let h=L?`<p class="small" style="margin-top:0">Tu laboratorio es nivel ${L}: podés investigar cada mejora hasta el nivel ${L}.</p>`:`<p style="margin-top:0">Necesitás un 🔬 Laboratorio de robótica${S.lvl<B.lab.lvl?` (se desbloquea en nivel ${B.lab.lvl})`:''}.</p>`;
 for(const k in TECH){const d=TECH[k],l=S.tech[k],c=l<TMAX?techCost(k,l):null;
  h+=`<div class="trow"><div class="te">${d.e}</div><div class="tinfo"><b>${d.n}</b> <span class="tag">Nv ${l}/${TMAX}</span><div class="small">${d.d}${c?' · '+costHTML(c):''}</div></div>${!c?'<div class="small lockt">⭐ Máximo</div>':l>=L?`<div class="small lockt">${L?'Mejorá el laboratorio':'Sin laboratorio'}</div>`:`<button class="btn sm gold" data-a="research" data-v="${k}">Investigar</button>`}</div>`}
 openSheet('tech','🔧 Mejoras robóticas',h);
}
/* ---------- terreno ---------- */
const expCost=x=>{const o={c:x.c};if(x.o)o.o=x.o;if(x.s)o.s=x.s;return o};
function terrHTML(){
 const x=EXP[N],r=!x?'<div class="small lockt">Tamaño máximo</div>':S.lvl<x.lvl?`<div class="small lockt">🔒 Nivel ${x.lvl}</div>`:'<button class="btn sm gold" data-a="expand">Comprar</button>';
 return `<div class="cat">Terreno</div><div class="trow"><div class="te">🗺️</div><div class="tinfo"><b>Expandir la isla</b><div class="small">${x?`De ${N}×${N} a ${N+2}×${N+2} casilleros · ${costHTML(expCost(x))}`:`Tu isla ya mide ${N}×${N} casilleros`}</div></div>${r}</div>`;
}
function expand(){
 const x=EXP[N];if(!x||S.lvl<x.lvl)return;
 if(!can(expCost(x))){toast('No te alcanza para expandir 😕');return}
 pay(expCost(x));
 const M=N+2,g=Array(M*M).fill(null);
 for(let i=0;i<N*N;i++)if(S.g[i])g[((i/N|0)+1)*M+i%N+1]=S.g[i];
 S.g=g;S.size=N=M;PL=null;MV=null;closeSheet();layout();setMode();toast('🗺️ ¡Tu isla creció!');addXP(100);hud();save();
}
/* ---------- zoom con la ruedita y arrastre para moverse ---------- */
const wdEl=$('#world');let drag=null,dragged=0;
wdEl.addEventListener('wheel',e=>{
 e.preventDefault();
 const dy=e.deltaY*(e.deltaMode===1?33:1);zoomTo(zT*Math.max(.7,Math.min(1.4,Math.exp(-dy*.002))),e.clientX,e.clientY);
},{passive:false});
wdEl.addEventListener('scroll',()=>{UIB=performance.now()},{passive:true});
wdEl.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button)return;drag={x:e.clientX,y:e.clientY,l:wdEl.scrollLeft,t:wdEl.scrollTop,m:0}});
window.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.m&&Math.hypot(dx,dy)<6)return;drag.m=1;wdEl.scrollLeft=drag.l-dx;wdEl.scrollTop=drag.t-dy});
window.addEventListener('pointerup',()=>{if(drag&&drag.m)dragged=now();drag=null});
/* Zoom: la ruedita fija un destino y frame() se acerca de a poco, manteniendo quieto el punto bajo el cursor */
/* Zoom fluido: mientras dura el gesto se escala la imagen ya dibujada (barato) y al soltar se aplica el zoom real una sola vez */
let UIB=0;const busyUI=()=>performance.now()-UIB<1200;
function mkGZ(el,k,commit){let G=null;return{on:()=>!!G,z:()=>G.z,
 start(z0,ax,ay){if(G)return;const r=el.getBoundingClientRect();G={z0,z:z0,r,ux:ax-r.left,uy:ay-r.top,ax,ay};UIB=performance.now();document.body.classList.add('zoomg');el.style.transformOrigin='0 0';el.style.willChange='transform'},
 set(z,ax,ay){if(!G)return;if(ax==null){ax=G.ax;ay=G.ay}UIB=performance.now();G.z=z;G.ax=ax;G.ay=ay;const s=z/G.z0,q=k();el.style.transform=`translate(${(ax-G.r.left-G.ux*s)/q}px,${(ay-G.r.top-G.uy*s)/q}px) scale(${s})`},
 end(){if(!G)return;const g=G;G=null;UIB=performance.now();document.body.classList.remove('zoomg');el.style.transform='';el.style.willChange='';commit(g.z,g.ux/g.r.width,g.uy/g.r.height,g.ax,g.ay)}}}
let zT=S.zoom,zA=null,pin=null;
const GM=mkGZ($('#mapw'),()=>1,(z,fx,fy,ax,ay)=>{S.zoom=z;sizeZoom();const n=$('#map').getBoundingClientRect();wdEl.scrollLeft+=n.left+fx*n.width-ax;wdEl.scrollTop+=n.top+fy*n.height-ay});
function setZoom(z,ax,ay){
 const mp=$('#map'),m=mp.getBoundingClientRect();S.zoom=z;sizeZoom();if(!m.width)return;
 const n=mp.getBoundingClientRect();wdEl.scrollLeft+=n.left+(ax-m.left)/m.width*n.width-ax;wdEl.scrollTop+=n.top+(ay-m.top)/m.height*n.height-ay;
}
function zoomTo(z,ax,ay){if(pin)return;zT=Math.max(.5,Math.min(3,z));if(ax==null){const r=wdEl.getBoundingClientRect();ax=r.left+r.width/2;ay=r.top+r.height/2}if(!GM.on())GM.start(S.zoom,ax,ay);zA=1}
wdEl.addEventListener('touchstart',e=>{if(e.touches.length===2){if(GM.on()){zA=null;GM.end()}const[a,b]=e.touches;pin={d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)||1,z:S.zoom};GM.start(S.zoom,(a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)}},{passive:true});
wdEl.addEventListener('touchmove',e=>{if(!pin||e.touches.length!==2)return;e.preventDefault();const[a,b]=e.touches;zT=Math.max(.5,Math.min(3,pin.z*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/pin.d));GM.set(zT,(a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)},{passive:false});
const pinEnd=e=>{if(pin&&e.touches.length<2){pin=null;GM.end()}};wdEl.addEventListener('touchend',pinEnd);wdEl.addEventListener('touchcancel',pinEnd);
/* ---------- mini eventos en tiempo real ---------- */
let ents=[],evId=0,nextEv=now()+45000,boostUntil=0;
function clearEnts(){ents.forEach(e=>e.el.remove());ents=[]}
function addEnt(o){const el=document.createElement('div');o.id=++evId;o.life0=o.life;el.dataset.ev=o.id;el.style.width=o.w*tw+'px';el.style.height=o.h*tw+'px';el.innerHTML=o.art;$('#ents').appendChild(el);o.el=el;o.t=0;ents.push(o)}
function evReward(m){
 const L=S.lvl,ks=['f'];if(L>=2)ks.push('o');if(L>=3)ks.push('s');if(L>=4)ks.push('e');
 const r={c:Math.round((40+35*L)*m)};r[ks[Math.floor(Math.random()*ks.length)]]=Math.round((15+12*L)*m);return r;
}
function startEvent(){
 sfx('alert');
 const opts=['crate','crate','boost','ufo'];if(S.lvl>=2)opts.push('ship','ship');
 const k=opts[Math.floor(Math.random()*opts.length)];
 if(k==='crate'){const fr=[];for(let i=0;i<N*N;i++)if(!S.g[i])fr.push(i);if(!fr.length)return;
  const[x,y]=pos(fr[Math.floor(Math.random()*fr.length)]);addEnt({k,x,y:y-tw*.7,w:1,h:1.2,life:30000,art:CRATE});toast('🎁 ¡Cayó una caja de suministros! Tocala antes de que desaparezca')}
 else if(k==='ship'){addEnt({k,x:-tw*1.6,y:MH-tw*1.5,w:1.6,h:1.3,life:26000,hp:5,art:SHIP});toast('🏴‍☠️ ¡Barco pirata! Tocalo 5 veces para hundirlo')}
 else if(k==='ufo'){addEnt({k,x:-tw*1.4,y:tw*.4,w:1.3,h:1,life:14000,art:UFO});toast('🛸 ¡Un OVNI! Tocalo para ganar experiencia')}
 else{boostUntil=now()+45000;toast('⚡ ¡Fiebre de producción! Todo produce el doble por 45 segundos')}
}
function moveEnts(dt){
 for(let n=ents.length-1;n>=0;n--){
  const e=ents[n];e.t+=dt;let x=e.x,y=e.y;
  if(e.k==='crate'){const p=Math.min(1,e.t/2600);y=e.y-tw*4*Math.pow(1-p,2);if(p>=1&&!e.land){e.land=1;e.el.classList.add('landed')}}
  else if(e.k==='ship'){x=e.x+(MW+tw*1.6)*e.t/e.life0;y=e.y+Math.sin(e.t/500)*tw*.03}
  else{x=e.x+(MW+tw*1.4)*e.t/e.life0;y=e.y+Math.sin(e.t/700)*tw*.35}
  e.cx=x+e.w*tw/2;e.cy=y+e.h*tw*.2;
  e.el.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;e.el.style.opacity=Math.max(0,Math.min(1,(e.life-e.t)/500));
  if(e.t>=e.life){
   if(e.k==='ship'&&!e.done){const l=Math.floor(S.c*.04);S.c-=l;toast(`🏴‍☠️ Los piratas escaparon con 💰${l}`)}
   e.el.remove();ents.splice(n,1);
  }
 }
}
function tapEnt(id){
 const e=ents.find(q=>q.id===id);if(!e||e.done)return;
 const end=txt=>{S.stats.ev=(S.stats.ev||0)+1;e.done=1;e.life=e.t+500;floatAt(e.cx,e.cy,txt);burst(e.cx,e.cy,'✨',6)};
 if(e.k==='crate'){if(!e.land)return;const r=evReward(1.5);gain(r);end('🎁 +'+costPlain(r));addXP(10)}
 else if(e.k==='ship'){
  e.hp--;burst(e.cx,e.cy,'💥',3);
  if(e.hp>0){e.el.classList.remove('hit');void e.el.offsetWidth;e.el.classList.add('hit');return}
  const r=evReward(3);gain(r);S.stats.pir=(S.stats.pir||0)+1;end('🏴‍☠️ +'+costPlain(r));addXP(15+5*S.lvl);
 }else{const x=20+8*S.lvl;end('🛸 +'+x+'⭐');addXP(x)}
 hud();save();
}
function events(t){
 if(t>=nextEv&&!modalOpen&&!PL&&MV==null&&!BT){nextEv=t+(70+Math.random()*80)*1000;startEvent()}
 let h=t<boostUntil?`⚡ Producción x2 <b>${ft(boostUntil-t)}</b>`:'';
 const e=ents.find(q=>!q.done);
 if(e)h+=(h?' · ':'')+(e.k==='crate'?'🎁 Caja de suministros':e.k==='ship'?'🏴‍☠️ Barco pirata '+'❤️'.repeat(e.hp):'🛸 OVNI')+` <b>${ft(e.life-e.t)}</b>`;
 const c=$('#evchip');if(c._h!==h){c._h=h;c.innerHTML=h;c.classList.toggle('on',!!h)}
}
function burst(x,y,em,n){
 for(let k=0;k<n;k++){const c=document.createElement('div'),a=Math.random()*6.28,r=(.5+Math.random()*.7)*tw;c.className='coin';c.textContent=em;c.style.left=x+'px';c.style.top=y+'px';
  c.style.setProperty('--dx',Math.cos(a)*r+'px');c.style.setProperty('--dy',Math.sin(a)*r-tw*.5+'px');$('#map').appendChild(c);setTimeout(()=>c.remove(),720)}
}
/* ---------- bucle de animación: 60 cuadros por segundo ---------- */
const RE={c:$('#rc'),f:$('#rf'),o:$('#ro'),s:$('#rs'),e:$('#re')},disp={};let lastTs=0;
function frame(ts){
 const dt=Math.min(60,(ts-lastTs)||16);lastTs=ts;
 {const ib=!!BT;if(ib!==frame.ib){frame.ib=ib;document.body.classList.toggle('inbt',ib)}}
 /* si con gráficos completos va trabado (menos de 24 cuadros por segundo dos veces seguidas), pasa solo a livianos */
 if(BT||document.hidden){if(frame.pf)frame.pf.l=ts}
 else if(!LITE){const P=frame.pf||(frame.pf={n:0,t:0,bad:0,l:ts});P.n++;P.t+=Math.min(1000,ts-P.l);P.l=ts;if(P.t>3000){if(P.n/P.t*1000<24)P.bad++;else P.bad=0;P.n=0;P.t=0;
  if(P.bad>=2){P.bad=0;LITE=true;try{localStorage.setItem('gdb-gfx','lo')}catch(e){}document.documentElement.classList.add('lite');for(const k in SPC)delete SPC[k];layout(1);toast('⚡ Activé los gráficos livianos para que vaya más fluido (Menú → Gráficos)')}}}
 if(!BT&&!GM.on()){moveWalkers(dt);moveEnts(dt);if(MAPC)drawMap(ts)}if(BT)battleFrame(dt);
 if(zA&&GM.on()){const c=GM.z(),d=zT-c;if(Math.abs(d)<.003){GM.set(zT);zA=null;GM.end()}else GM.set(c+d*Math.min(1,dt*.014))}
 for(const k in RE){const v=S[k],o=disp[k];let n=o==null?v:o+(v-o)*Math.min(1,dt*.01);if(Math.abs(v-n)<1)n=v;if(n!==o){disp[k]=n;const tx=fmt(n);if(RE[k]._t!==tx){RE[k]._t=tx;RE[k].textContent=tx}}}
 requestAnimationFrame(frame);
}
