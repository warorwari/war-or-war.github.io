/* ---------- jefes de rango: uno cada 5 niveles, se vencen una sola vez ---------- */
const RBOSS=[{l:10,n:'General Hierro',f:'🎖️',p:1.5},{l:15,n:'Mariscal Tormenta',f:'⚡',p:2},{l:20,n:'Emperador de Acero',f:'👑',p:2.6},{l:25,n:'El Último Señor de la Guerra',f:'💀',p:3.4}];
function rbSpec(i){const r=RBOSS[i],L=Math.max(S.lvl,r.l),D=Math.round((25*Math.pow(L,1.6)+5)*r.p*dif().k),sp=enemySpec(D,L+2,9001+i*77);sp.style='nucleo';sp.map=['monte','rio','niebla','monte'][i];sp.hq*=1.6;sp.pw=D;return sp}
const rbRw=i=>({c:40000*(i+1)*(i+1),s:2500*(i+1),e:1500*(i+1)});
function rbHTML(){let h='<div class="cat">🎖️ Jefes de rango</div><p class="small" style="margin-top:0">Un jefe cada 5 niveles. Cada uno se vence una vez y da una pieza legendaria.</p>';
 RBOSS.forEach((r,i)=>{const ok=S.lvl>=r.l,dn=S.rbd&&S.rbd[i];h+=`<div class="erow"><div class="ef">${r.f}</div><div class="einfo"><b>${r.n}</b> <span class="tag">Nivel ${r.l}</span><div class="small">${dn?'✓ Vencido':ok?`🛡️${fmt(rbSpec(i).pw)} · ${['⛰️ Montaña','🌊 Río','🌑 Niebla','⛰️ Montaña'][i]} · 🎁 ${costPlain(rbRw(i))} + 🧰 legendaria`:`🔒 Se desbloquea en el nivel ${r.l}`}</div></div>${ok&&!dn?`<button class="btn sm red" data-a="enemy" data-v="r${i}">Atacar</button>`:''}</div>`});return h}
/* lo que viene: los próximos desbloqueos según el nivel */
function nextUnl(from,n){const L=[];for(const[k,d]of Object.entries(B))if(d.lvl>from&&!d.deco)L.push([d.lvl,d.e+' '+d.n]);
 L.push([12,'🏗️ Edificios a nivel 8'],[14,'⭐ Tropas élite nivel 6'],[18,'⭐ Tropas élite nivel 7']);for(const r of RBOSS)L.push([r.l,r.f+' Jefe: '+r.n]);for(const[e,r]of AVS)if(typeof r==='number'&&r>from)L.push([r,e+' Avatar nuevo']);
 return L.filter(x=>x[0]>from).sort((a,b)=>a[0]-b[0]).slice(0,n||4)}
const nextHTML=(from,n)=>{const L=nextUnl(from,n);return L.length?`<div class="nxt"><b>🔜 Lo que viene</b>${L.map(([l,t])=>`<div><span>Nv ${l}</span>${t}</div>`).join('')}</div>`:''};
function openCol(){
 let h=`<p class="small" style="margin-top:0">Cada grupo completo te da +5% de producción para siempre. Llevás <b>+${colDone()*5}%</b>.</p>`;
 for(const[n,us]of CG){const ok=us.every(u=>S.colu[u]);h+=`<div class="cat">${n} ${ok?'✓ +5%':'· '+us.filter(u=>S.colu[u]).length+'/'+us.length}</div><div class="colg">${us.map(u=>`<div class="${S.colu[u]?'':'nc'}">${ue(u)}<small>${S.colu[u]?U[u].n:'???'}</small></div>`).join('')}</div>`}
 h+=albHTML();openSheet('col','📖 Colección',h);
}
const fusHTML=()=>{const own=FUS.map(f=>f[1]).filter(u=>S.troops[u]>0);return '<div class="cat">🧬 Unidades de fusión</div>'+(own.map(u=>{const d=U[u];return `<div class="trow"><div class="te">${ue(u)}</div><div class="tinfo"><b>${d.n}</b> <span class="tc">×${S.troops[u]}</span><div class="small">${CI[d.cls]} ⚔️${d.dmg} ❤️${d.hp} 🎯${d.rng}${vsTxt(d)}</div></div></div>`}).join('')||'<p class="small">Todavía no tenés. Se crean solo combinando tropas.</p>')+'<div class="row2" style="margin-bottom:8px"><button class="btn" data-a="fusion">🧬 Fusión</button><button class="btn" data-a="col">📖 Colección</button></div>'};
/* ---------- islas en tiempo real: expediciones propias y disputas entre rivales ---------- */
const expDur=i=>(60+30*i)*1000;
function expTick(t){
 const L=$('#exps');if(!L||!tw)return;const k=tw/100,bx=N*50*k+OX,by=(N*25+110)*k;
 for(let n=S.exp.length-1;n>=0;n--){const x=S.exp[n];
  if(!x.rc&&t>x.s+(x.e-x.s)*.5){x.rc=1;if(Math.random()<.35&&S.isl[x.i].o>=0){x.rf=1;toast(`⚠️ ${S.enemies[S.isl[x.i].o].n} mandó refuerzos a ${ISL[x.i].n}`)}}
  if(t>=x.e&&!modalOpen&&!BT){S.exp.splice(n,1);expEnd(x)}}
 let h='';
 for(const x of S.exp){const[ix,iy]=islPos(x.i),p=Math.min(1,(t-x.s)/(x.e-x.s)),tr=Math.min(1,p/.4),X=bx+(ix*k+OX-bx)*tr,Y=by+(iy*k-by)*tr;
  for(const[dx,dy]of[[0,0],[-.32,.2],[.3,.24]])h+=`<div class="boat" style="font-size:${tw*.5}px;transform:translate(${(X+dx*tw).toFixed(0)}px,${(Y+dy*tw).toFixed(0)}px)">${x.nav?'🚢':'⛵'}</div>`+(tr<1?`<div class="wake" style="font-size:${tw*.5}px;transform:translate(${(X+dx*tw).toFixed(0)}px,${(Y+dy*tw).toFixed(0)}px)"></div>`:'');
  if(p>=.4)h+=`<div class="ifx" style="left:${ix*k+OX}px;top:${(iy-30)*k}px;font-size:${tw*.45}px"><b></b><i>💥</i><i>💥</i><i>🔥</i></div>`;
  h+=`<div class="ebar" style="left:${ix*k+OX}px;top:${(iy-92)*k}px"><b>${p<.4?'⛵ Navegando':'⚔️ Conquistando'}${x.rf?' ⚠️':''}</b><i><u style="width:${(p*100).toFixed(0)}%"></u></i>${ft(x.e-t)}</div>`}
 for(let i=0;i<ISL.length;i++){const w=S.isl[i].war;if(w&&S.enemies[w.by]){const[ix,iy]=islPos(i);h+=`<div class="ifx" style="left:${ix*k+OX}px;top:${(iy-30)*k}px;font-size:${tw*.45}px"><b></b><i>💥</i><i>💥</i><i>💥</i></div><div class="ebar war" style="left:${ix*k+OX}px;top:${(iy-92)*k}px"><b>⚔️ ${S.enemies[w.by].f} la disputa</b><br>${ft(w.end-t)}</div>`}}
 if(L._h!==h){L._h=h;L.innerHTML=h}
 islBadge();
}
function expEnd(x){
 const i=x.i,key='i'+i,e=target(key),mul={};const nb=x.nav?1.35:1;for(const u in x.army)mul[u]=[ulm(u)*1.2*nb,ulm(u)*(1+.25*S.tech.atk)*1.2*nb];
 const b=mkBattle(x.army,enemySpec(Math.round(eDef(e)*(x.rf?1.3:1)),e.lvl,seedOf(key,e.lvl)),mul);prepBattle(b);let g=0;while(!b.over&&g++<20000)stepBattle(b,.05);
 const surv={};for(const q of b.E)if(q.side===0&&q.hp>0)surv[q.kind]=(surv[q.kind]||0)+Math.ceil(q.hp/q.uhp-1e-9);
 let lost=0,tot=0;for(const u in x.army){tot+=x.army[u];const s=Math.min(x.army[u],surv[u]||0);S.troops[u]+=s;lost+=x.army[u]-s}
 if(b.over===1){const loot=mult(eLoot(e),1.5);gain(loot);S.isl[i].o=-1;S.isl[i].lc=now();S.isl[i].war=null;S.stats.won++;S.stats.islc=(S.stats.islc||0)+1;winStuff();sfx('win');
  modal(`<div class="win">¡ISLA CONQUISTADA!</div><p>Tu expedición tomó <b>${ISL[i].n}</b>.</p><p>Botín ×1,5: <b>${costPlain(loot)}</b></p><p class="small">Bajas: ${lost} de ${tot}</p>`,[['¡Bien ahí!',()=>{addXP(12*e.lvl);hud()},'gold']])}
 else{S.stats.lost++;lossStuff();sfx('lose');modal(`<div class="lose">EXPEDICIÓN FALLIDA</div><p><b>${ISL[i].n}</b> resistió${x.rf?' gracias a los refuerzos':''}.</p><p class="small">Volvieron ${tot-lost} de ${tot} tropas.</p>`,[['Volver','','red']])}
 hud();save();
}
function islWar(t){
 for(let i=0;i<ISL.length;i++){const s=S.isl[i],w=s.war;if(w&&t>=w.end){s.war=null;if(s.o>=0&&!S.exp.some(x=>x.i===i)&&S.enemies[w.by]){s.o=w.by;toast(`🏝️ ${S.enemies[w.by].n} conquistó ${ISL[i].n}`)}}}
 if(t<(S.wnext||0))return;S.wnext=t+(60+Math.random()*90)*1000*dif().sp;
 const c=[];for(let i=0;i<ISL.length;i++)if(S.isl[i].o>=0&&!S.isl[i].war&&!S.exp.some(x=>x.i===i))c.push(i);if(!c.length)return;
 const i=c[Math.random()*c.length|0],o=S.isl[i].o;let by=Math.random()*S.enemies.length|0;if(by===o)by=(by+1)%S.enemies.length;
 S.isl[i].war={by,end:t+(45+Math.random()*45)*1000};toast(`⚔️ ${S.enemies[by].f} ${S.enemies[by].n} ataca ${ISL[i].n}`);
}
/* ---------- héroes comandantes: uno activo, va a tus ataques, sube de nivel y tiene una habilidad ---------- */
const HER=[
 {k:'cmd1',f:'🎖️',n:'General Hierro',lv:5,cost:{c:20000,s:1000},pas:'Tus tropas de tierra hacen +3% de daño por nivel',abn:'Bombardeo de apertura',abd:'a los pocos segundos daña todas las defensas enemigas',ab:'bomb'},
 {k:'cmd2',f:'🦅',n:'Capitana Halcón',lv:8,cost:{c:45000,o:6000,s:2500},pas:'Tus aéreos tienen +4% de daño y vida por nivel',abn:'Lluvia de misiles',abd:'castiga a todas las tropas enemigas a los 4 segundos',ab:'mis'},
 {k:'cmd3',f:'🤖',n:'Doctor Voltio',lv:11,cost:{c:70000,s:5000,e:3000},pas:'Tus robots y mechas tienen +4% de vida por nivel',abn:'Reparación',abd:'cura a todo tu ejército cada 15 segundos',ab:'fix'}];
const cmdNeed=l=>100*l;
function cmdXP(k,x){const c=S.cmd[k];if(!c)return;c.xp+=x;while(c.lvl<10&&c.xp>=cmdNeed(c.lvl)){c.xp-=cmdNeed(c.lvl);c.lvl++;toast(`🎖️ ${U[k].n} subió a nivel ${c.lvl}`)}if(c.lvl>=10)c.xp=0}
function addHero(b){const k=S.cmdSel,c=k&&S.cmd[k];if(!c||(c.inj&&now()<c.inj))return;const hp=900*(1+.25*(c.lvl-1)),dmg=45*(1+.2*(c.lvl-1));
 b.E.push({side:0,kind:k,st:0,cls:'inf',x:5,y:10.2,hp,uhp:hp,m:1,dmg,rng:2.8,cd:.7,spd:.9,fly:0,air:1,vs:{inf:1.4,veh:1.2,mec:1.2,def:1.2},max:hp,t:0,rt:0,tg:null,hero:1});b.hero={k}}
function abTick(B,dt,fx){
 const a=B.ab;a.t+=dt;const mine=B.raid?1:0,live=fx&&BV;
 const say=()=>{if(live)toast(`${a.f} ${a.nm}!`)};
 if(a.k==='bomb'&&!a.n&&a.t>2.5){a.n=1;say();for(const x of B.E)if(x.side!==mine&&x.st&&x.hp>0){x.hp-=x.max*(.1+.02*a.lvl);if(live){const[px,py]=bpos(x.x,x.y);boom(px,py-btw*.35,1.3,0)}}}
 if(a.k==='mis'&&!a.n&&a.t>4){a.n=1;say();for(const x of B.E)if(x.side!==mine&&!x.st&&x.hp>0){x.hp-=x.max*(.12+.025*a.lvl);if(live){const[px,py]=bpos(x.x,x.y);boom(px,py-btw*.2,.8,0)}}}
 if(a.k==='fix'&&a.t>=15*(a.n+1)){a.n++;say();for(const x of B.E)if(x.side===mine&&!x.st&&x.hp>0){x.hp=Math.min(x.max,x.hp+x.max*(.08+.012*a.lvl));if(live){const[px,py]=bpos(x.x,x.y);for(let i=0;i<3;i++)fxAdd({k:'sp',x:px+(Math.random()-.5)*btw*.3,y:py-btw*.2,vx:0,vy:-.02*btw,life:650,col:'120,255,150'})}}}
}
function openCmd(){
 let h='<p class="small" style="margin-top:0">El héroe activo va a todos tus ataques, aplica su bonificación y usa su habilidad solo. Gana experiencia con cada victoria. Si cae en combate, queda herido 10 minutos.</p>';
 for(const H of HER){const c=S.cmd[H.k],act=S.cmdSel===H.k;
  h+=`<div class="trow" style="${act?'border-color:#f6b51e;background:#fff8d6':''}"><div class="te">${ue(H.k)}</div><div class="tinfo"><b>${H.f} ${H.n}</b>${c?` <span class="tag">Nv ${c.lvl}/10</span>`:''}<div class="small">${H.pas}.<br>⚡ <b>${H.abn}</b>: ${H.abd}.</div>`+
   (c?(c.lvl<10?`<div class="pb"><i style="width:${c.xp/cmdNeed(c.lvl)*100}%"></i></div><div class="small">${c.xp} / ${cmdNeed(c.lvl)} de experiencia</div>`:'<div class="small">⭐ Nivel máximo</div>')+(c.inj&&now()<c.inj?`<div class="small">🤕 Herido: vuelve en <b data-until="${c.inj}"></b></div>`:''):`<div class="small">${S.lvl<H.lv?`🔒 Nivel ${H.lv}`:costHTML(H.cost)}</div>`)+
   `</div>${c?(act?'<div class="small lockt">Activo ✓</div>':`<button class="btn sm gold" data-a="cmdsel" data-v="${H.k}">Elegir</button>`):S.lvl>=H.lv?`<button class="btn sm gold" data-a="cmdbuy" data-v="${H.k}">Reclutar</button>`:''}</div>`}
 openSheet('cmd','🎖️ Héroes comandantes',h);
}
/* ---------- árbol de investigación: tres ramas; en los niveles con dos opciones, elegir una bloquea la otra ---------- */
const RT={
 mil:{n:'⚔️ Militar',L:[['Entrenamiento',{atk:.05}],['Blindaje compuesto',{hp:.06}],[['Infantería de élite',{inf:.15}],['Fuerza blindada',{veh:.15}]],['Tácticas',{atk:.07}],[['Supremacía aérea',{air:.2}],['Ejército de acero',{mec:.2}]]]},
 eco:{n:'💰 Economía',L:[['Logística',{prod:.08}],['Obras rápidas',{bld:.12}],[['Comercio isleño',{isl:.25}],['Cofres veloces',{chest:.25}]],['Industria',{prod:.12}],[['Banca',{gold:.15}],['Saqueo',{loot:.15}]]]},
 def:{n:'🛡️ Defensa',L:[['Fortificación',{dhp:.08}],['Artillería',{ddmg:.08}],[['Muros reforzados',{dhp:.15}],['Torretas rápidas',{ddmg:.15}]],['Centro de mando',{hqhp:.25}],[['Bóveda',{vault:.5}],['Contraataque',{trof:.5}]]]}};
const RTT=[2,8,18,32,50],rsCost=i=>{const m=(i+1)*(i+1),c={c:5000*m,s:300*m};if(i>=2)c.e=150*m;return c};
const EFN={atk:'+{}% daño de tus tropas',hp:'+{}% vida de tus tropas',inf:'infantería +{}%',veh:'vehículos +{}%',air:'aéreos +{}%',mec:'robots +{}%',prod:'+{}% producción',bld:'obras {}% más rápidas',isl:'+{}% oro de islas',chest:'cofres {}% más rápidos',gold:'+{}% oro',loot:'+{}% botín',dhp:'defensas +{}% vida',ddmg:'defensas +{}% daño',hqhp:'centro de mando +{}% vida',vault:'te roban {}% menos',trof:'+{}% trofeos al defender'};
const effTxt=e=>Object.keys(e).map(k=>EFN[k].replace('{}',Math.round(e[k]*100))).join(', ');
let RSC=null;
const RS=()=>{if(RSC)return RSC;const r={};for(const bk in RT)(S.rs[bk]||[]).forEach((c,i)=>{const nd=RT[bk].L[i],e=Array.isArray(nd[0])?nd[c][1]:nd[1];for(const k in e)r[k]=(r[k]||0)+e[k]});for(let i=1;i<WR.length;i++)if(S.wr[i])for(const k in WR[i].e)r[k]=(r[k]||0)+WR[i].e[k];if(S.clan)r.prod=(r.prod||0)+.02*clanLvl();return RSC=r};
function applyRS(){RSC=null;const r=RS();CHT.forEach((c,i)=>c.t=[5,30,120][i]*60000*(1-(r.chest||0)))}
const rsRush=()=>S.rsq?Math.ceil(Math.max(0,S.rsq.end-now())/60000)*(120+25*S.lvl):0;
function rsTick(){const q=S.rsq;if(!q||now()<q.end)return;const a=S.rs[q.b]=S.rs[q.b]||[];a[q.i]=q.c;S.rsq=null;applyRS();sfx('done');toast(`🔬 Investigación lista: ${q.nm}`);save();if(sheet.kind==='res')openRes()}
function openRes(){
 const q=S.rsq;let h='<p class="small" style="margin-top:0">Se investiga de a una cosa por vez. En los niveles con dos opciones, elegir una bloquea la otra para siempre.</p>';
 if(q)h+=`<div class="istat">🔬 Investigando <b>${q.nm}</b>: faltan <b data-until="${q.end}"></b><button class="btn gold" data-a="rsr">⚡ Terminar ya · 💰${fmt(rsRush())}</button></div>`;
 for(const bk in RT){const Bk=RT[bk],ch=S.rs[bk]||[];h+=`<div class="cat">${Bk.n}</div>`;
  Bk.L.forEach((nd,i)=>{const multi=Array.isArray(nd[0]),done=i<ch.length,cur=i===ch.length,opts=multi?nd:[nd],inq=q&&q.b===bk&&q.i===i;
   h+=`<div class="trow" style="${done?'opacity:.75':cur?'':'opacity:.45'}"><div class="tinfo"><b>Nivel ${i+1}</b>${multi?' <span class="tag">Elegí una</span>':''}<div class="small">${opts.map((o,j)=>`${done?(ch[i]===j?'✅':'🚫'):inq&&q.c===j?'⏳':'▫️'} <b>${o[0]}</b>: ${effTxt(o[1])}`).join('<br>')}</div>${cur&&!q?`<div class="small">${costHTML(rsCost(i))} · ⏱ ${RTT[i]} min</div>`:''}</div>${cur&&!q?`<div class="tbtn">${opts.map((o,j)=>`<button class="btn sm gold" data-a="rs" data-v="${bk}.${j}">${multi?o[0]:'Investigar'}</button>`).join('')}</div>`:''}</div>`})}
 openSheet('res','🔬 Investigación',h);
}
/* ---------- equipamiento: piezas que caen de cofres y jefes; cada tipo de tropa lleva arma, blindaje y motor ---------- */
const EQN={arma:{inf:'Fusil táctico',veh:'Cañón perforante',air:'Misiles guiados',mec:'Láser de pulso'},blindaje:{inf:'Chaleco cerámico',veh:'Placas reactivas',air:'Fuselaje blindado',mec:'Coraza de titanio'},motor:{inf:'Botas de asalto',veh:'Turbina',air:'Postcombustión',mec:'Servomotores'}};
const SLE={arma:'🔫',blindaje:'🛡️',motor:'⚙️'},SLN={arma:'daño',blindaje:'vida',motor:'velocidad'},ECL={inf:'infantería',veh:'vehículos',air:'aéreos',mec:'robots'};
const RAR=[['Común','#7d8790',.06],['Rara','#3d86c9',.12],['Épica','#a04fe0',.2],['Legendaria','#d48f10',.32]];
function giveItem(min){if(S.inv.length>=40){toast('🧰 Tu arsenal está lleno: desarmá alguna pieza');return null}
 const r=Math.random(),rr=Math.max(min||0,r<.55?0:r<.85?1:r<.97?2:3),it={id:S.iid=(S.iid||0)+1,s:['arma','blindaje','motor'][Math.random()*3|0],r:rr,c:['inf','veh','air','mec'][Math.random()*4|0],v:+(RAR[rr][2]*(.85+Math.random()*.3)).toFixed(3),u:''};S.inv.push(it);return it}
const itTxt=it=>`<b style="color:${RAR[it.r][1]}">${SLE[it.s]} ${EQN[it.s][it.c]}</b> <span class="small">${RAR[it.r][0]} · ${ECL[it.c]} · +${Math.round(it.v*100)}% ${SLN[it.s]}</span>`;
const scrapV=it=>(it.r+1)*(it.r+1)*60;
const eqTxt=u=>{const l=S.inv.filter(i=>i.u===u);return l.length?' · '+l.map(i=>`<span style="color:${RAR[i.r][1]}">${SLE[i.s]}</span>`).join(''):''};
function openArs(){
 let h='<p class="small" style="margin-top:0">Las piezas salen de los cofres y de los jefes. Cada tipo de tropa puede llevar un arma, un blindaje y un motor de su clase.</p>';
 const used=S.inv.filter(i=>i.u&&U[i.u]);if(used.length){h+='<div class="cat">Equipado</div>';for(const it of used)h+=`<div class="trow"><div class="te">${ue(it.u)}</div><div class="tinfo">${itTxt(it)}<div class="small">en ${U[it.u].n}</div></div><button class="btn sm" data-a="uneq" data-v="${it.id}">Quitar</button></div>`}
 const free=S.inv.filter(i=>!i.u).sort((a,b)=>b.r-a.r||b.v-a.v);
 h+=`<div class="cat">Inventario · ${free.length}</div>`+(free.map(it=>`<div class="trow" style="border-color:${RAR[it.r][1]}"><div class="tinfo">${itTxt(it)}</div><div class="tbtn"><button class="btn sm gold" data-a="eq" data-v="${it.id}">Equipar</button><button class="btn sm" data-a="scrap" data-v="${it.id}">Desarmar ⚙️${scrapV(it)}</button></div></div>`).join('')||'<p class="small">Vacío. Abrí cofres para conseguir piezas.</p>');
 openSheet('ars','🧰 Arsenal',h);
}
function eqPick(id){
 const it=S.inv.find(i=>i.id===id);if(!it)return;const us=Object.keys(U).filter(u=>(!U[u].hero||U[u].fus)&&U[u].cls===it.c&&S.troops[u]>0);
 if(!us.length){toast(`No tenés tropas de ${ECL[it.c]}`);return}closeSheet();
 modal(`<div class="mtitle">Equipar</div><p>${itTxt(it)}</p><p class="small">¿En qué tropa? Si ya tiene una pieza en ese lugar, vuelve al inventario.</p>`,us.map(u=>[U[u].n,()=>{for(const o of S.inv)if(o.u===u&&o.s===it.s)o.u='';it.u=u;save();toast(`${SLE[it.s]} Equipado en ${U[u].n}`);setTimeout(openArs,0)}]).concat([['Cancelar',()=>setTimeout(openArs,0)]]));
}
/* Bonificaciones de investigación, equipamiento y héroe: se aplican a tu bando al empezar cada batalla */
function boostBattle(b){
 const R=RS(),mine=b.raid?1:0,H=b.hero&&HER.find(q=>q.k===b.hero.k),hl=b.hero?S.cmd[b.hero.k].lvl:0;
 for(const x of b.E){if(x.side!==mine)continue;
  if(x.st){if(b.raid){const m=1+(R.dhp||0)+(x.kind==='hq'?(R.hqhp||0):0);x.hp*=m;x.uhp*=m;x.dmg*=1+(R.ddmg||0)}}
  else{let dm=1+(R.atk||0)+(R[x.cls]||0),hm=1+(R.hp||0)+(R[x.cls]||0)*.5;
   for(const it of S.inv)if(it.u===x.kind){if(it.s==='arma')dm+=it.v;else if(it.s==='blindaje')hm+=it.v;else x.spd*=1+it.v*.8}
   if(H){if(H.ab==='bomb'&&(x.cls==='inf'||x.cls==='veh'))dm+=.03*hl;if(H.ab==='mis'&&x.cls==='air'){dm+=.04*hl;hm+=.04*hl}if(H.ab==='fix'&&x.cls==='mec')hm+=.04*hl}
   x.dmg*=dm;x.hp*=hm;x.uhp*=hm}
  x.max=x.hp}
 if(H&&!b.raid)b.ab={k:H.ab,t:0,n:0,lvl:hl,f:H.f,nm:H.abn};
}
/* ---------- clanes con bots: aportás tropas, recibís refuerzos, guerra semanal y tienda con medallas ---------- */
const CLANS=[{n:'Lobos de Acero',f:'🐺'},{n:'Águilas Rojas',f:'🦅'},{n:'Tiburones',f:'🦈'},{n:'Dragones Negros',f:'🐉'}];
const CMEM=['Tano','Fede','Luli','Mati','Caro','Nico','Juani','Sofi','Rocío','Bruno','Agus','Meli'];
const clanLvl=()=>S.clan?Math.min(10,1+Math.floor(Math.sqrt(S.clan.xp/120))):0;
const clanMem=i=>{const R=rng32(i*101+7),l=[];while(l.length<6){const n=CMEM[R()*CMEM.length|0];if(!l.includes(n))l.push(n)}return l.map(n=>({n,tr:Math.round(300+R()*2500)}))};
const cwRate=s=>4+rng32(s)()*3;
const cwBots=(s,w,hrs)=>Math.floor(Math.min(168,hrs)*cwRate(s*31+w));
function cwState(){const w=week(),hrs=(now()-(w*7*864e5+4*864e5))/36e5,ci=S.clan.i,ri=(ci+1+w%3)%4;
 if(!S.cw||S.cw.w!==w)S.cw={w,st:0};return{w,hrs,ri,us:S.cw.st*3+cwBots(ci+1,w,hrs),them:Math.round(cwBots(ri+11,w,hrs)*dif().k)}}
function clanTick(){
 if(!S.clan||modalOpen||BT)return;const t=now();
 if(S.cw&&S.cw.w!==week()){const w=S.cw.w,ci=S.clan.i,ri=(ci+1+w%3)%4,us=S.cw.st*3+cwBots(ci+1,w,168),them=Math.round(cwBots(ri+11,w,168)*dif().k),win=us>=them;
  S.cw={w:week(),st:0};if(win){S.clan.med+=60;addChest(2)}else S.clan.med+=15;save();
  modal(`<div class="mtitle">⚔️ Fin de la guerra de clanes</div><p>${CLANS[ci].f} ${us} contra ${them} ${CLANS[ri].f}</p><p><b>${win?'¡Ganó tu clan! +60 medallas y un cofre de oro':'Perdió tu clan. +15 medallas por participar'}</b></p>`,[['¡Vamos!','','gold']]);return}
 if(t>(S.clan.rq||0)){S.clan.rq=t+(12+Math.random()*8)*60000;const us=easyUnits(),u=us[Math.random()*us.length|0],n=2+(Math.random()*4|0),m=clanMem(S.clan.i)[Math.random()*6|0];if(u){S.troops[u]+=n;toast(`${CLANS[S.clan.i].f} ${m.n} te mandó ${n} ${U[u].n}`);save()}}
}
const CSHOP=[['Cofre de oro','💎',60,()=>addChest(2)],['Pieza épica','🧰',100,()=>{const it=giveItem(2);if(it)toast('🧰 '+EQN[it.s][it.c])}],['Paquete de 10 tropas','🎖️',40,()=>{const us=easyUnits();for(let i=0;i<10;i++){const u=us[Math.random()*us.length|0];if(u)S.troops[u]++}}]];
function openClan(){
 let h='';
 if(!S.clan){h='<p class="small" style="margin-top:0">Unite a un clan: tus compañeros te mandan refuerzos, aportás tropas a cambio de medallas, el nivel del clan te da producción extra y cada semana hay guerra contra otro clan.</p>';
  CLANS.forEach((c,i)=>{h+=`<div class="erow"><div class="ef">${c.f}</div><div class="einfo"><b>${c.n}</b><div class="small">${clanMem(i).map(m=>m.n).join(', ')}</div></div><button class="btn sm gold" data-a="cjoin" data-v="${i}">Unirse</button></div>`});
  openSheet('clan','🛡️ Clanes',h);return}
 const C=CLANS[S.clan.i],L=clanLvl(),need=Math.pow(L,2)*120,prev=Math.pow(L-1,2)*120,W=cwState(),R=CLANS[W.ri];
 h+=`<div class="mcard"><div class="mnum">CLAN · NIVEL ${L}</div><div class="mt">${C.f} ${C.n}</div>${L<10?`<div class="pb"><i style="width:${Math.min(100,(S.clan.xp-prev)/(need-prev)*100)}%"></i></div>`:''}<div class="small">Bonificación del clan: +${2*L}% de producción · 🏅 ${S.clan.med} medallas</div></div>`;
 h+=`<div class="cat">⚔️ Guerra de la semana · termina en ${fd(seasonEnd()-now())}</div><div class="trow"><div class="tinfo"><b>${C.f} ${W.us}</b> contra <b>${W.them} ${R.f}</b> ${R.n}<div class="pb"><i style="width:${W.us/Math.max(1,W.us+W.them)*100}%"></i></div><div class="small">Cada batalla que ganes esta semana suma 3 puntos. Tus compañeros también suman.</div></div></div>`;
 const own=Object.keys(U).filter(u=>!U[u].hero&&S.troops[u]>=5).sort((a,b)=>U[b].atk-U[a].atk).slice(0,3);
 h+='<div class="cat">🤝 Aportar tropas</div>'+(own.map(u=>`<div class="trow"><div class="te">${ue(u)}</div><div class="tinfo"><b>5 ${U[u].n}</b><div class="small">+${Math.max(1,Math.round(U[u].atk/4))} medallas</div></div><button class="btn sm gold" data-a="cdon" data-v="${u}">Aportar</button></div>`).join('')||'<p class="small">Necesitás al menos 5 tropas de un tipo para aportar.</p>');
 h+='<div class="cat">🏪 Tienda del clan</div>'+CSHOP.map((s,i)=>`<div class="trow"><div class="te">${s[1]}</div><div class="tinfo"><b>${s[0]}</b><div class="small">🏅 ${s[2]} medallas</div></div><button class="btn sm gold" data-a="cbuy" data-v="${i}" ${S.clan.med>=s[2]?'':'disabled'}>Comprar</button></div>`).join('');
 h+='<div class="cat">👥 Miembros</div><div class="rank">'+clanMem(S.clan.i).concat([{n:myTag(),tr:S.trof||0,me:1}]).sort((a,b)=>b.tr-a.tr).map((m,i)=>`<div class="${m.me?'me':''}"><span>${i+1}.</span> ${m.n} <b>🏆${m.tr}</b></div>`).join('')+'</div><button class="btn" data-a="cleave" style="margin-top:8px">Salir del clan</button>';
 openSheet('clan',`${C.f} Clan`,h);
}
/* ---------- mapa del mundo: regiones que se conquistan de a una, vecinas a las tuyas, y dan bonificaciones permanentes ---------- */
const WR=[{n:'Valle Natal',f:'🏡',e:{}},{n:'Llanura Ámbar',f:'🌾',e:{prod:.05}},{n:'Montes Grises',f:'⛰️',e:{dhp:.06}},{n:'Costa Azul',f:'🏖️',e:{isl:.1}},
 {n:'Bosque Negro',f:'🌲',e:{inf:.06}},{n:'Desierto Rojo',f:'🏜️',e:{veh:.06}},{n:'Minas del Norte',f:'⛏️',e:{gold:.06}},{n:'Puerto Franco',f:'⚓',e:{loot:.08}},
 {n:'Picos Helados',f:'🏔️',e:{air:.08}},{n:'Fábrica Abandonada',f:'🏭',e:{mec:.08}},{n:'Gran Ciudad',f:'🏙️',e:{atk:.05}},{n:'Trono del Mundo',f:'👑',e:{atk:.06,hp:.06,prod:.06}}];
const WP=i=>[i%4,i/4|0],wAdj=(a,b)=>{const[c1,r1]=WP(a),[c2,r2]=WP(b);return Math.abs(c1-c2)+Math.abs(r1-r2)===1};
const wMine=i=>i===0||!!S.wr[i],wOpen=i=>!wMine(i)&&WR.some((r,j)=>wMine(j)&&wAdj(i,j));
const wDef=i=>Math.round((250+i*i*170)*(1+.12*S.lvl)*dif().k),wLvl=i=>3+i*2;
let wSel=-1;
function openWorld(){
 let h='<p class="small" style="margin-top:0">Conquistá regiones vecinas a las tuyas. Cada región te da una bonificación permanente.</p><svg class="wmap" viewBox="0 0 400 260"><rect width="400" height="260" rx="14" fill="#6fb8e0"/>';
 WR.forEach((r,i)=>{const[c,rw]=WP(i),x=55+c*96,y=50+rw*80,m=wMine(i),o=wOpen(i),col=m?'#4f8fd6':o?'#d9a441':'#a0473c';
  h+=`<g class="wreg${wSel===i?' sel':''}" data-a="wsel" data-v="${i}"><path d="M${x-44},${y} L${x-22},${y-36} L${x+22},${y-36} L${x+44},${y} L${x+22},${y+36} L${x-22},${y+36} Z" fill="${col}" stroke="#2a1808" stroke-width="3"/><text x="${x}" y="${y+2}" text-anchor="middle" font-size="22">${r.f}</text><text x="${x}" y="${y+24}" text-anchor="middle" class="wn">${m?'✓ ':''}${r.n.length>13?r.n.slice(0,12)+'.':r.n}</text></g>`});
 h+='</svg><div class="small" style="margin:6px 0">🟦 tuyas · 🟨 podés atacar · 🟥 lejanas</div>';
 const sum={};for(let i=0;i<WR.length;i++)if(wMine(i))for(const k in WR[i].e)sum[k]=(sum[k]||0)+WR[i].e[k];
 if(wSel>=0){const r=WR[wSel];h+=`<div class="trow"><div class="te">${r.f}</div><div class="tinfo"><b>${r.n}</b><div class="small">${Object.keys(r.e).length?effTxt(r.e):'Tu región de origen'}${wMine(wSel)?' · ✓ tuya':` · 🛡️${wDef(wSel)}`}</div></div>${wOpen(wSel)?`<button class="btn sm red" data-a="enemy" data-v="w${wSel}">Atacar</button>`:''}</div>`}
 h+=`<div class="istat">Bonificaciones del mundo: <b>${Object.keys(sum).length?effTxt(sum):'ninguna todavía'}</b></div>`;
 openSheet('world','🌍 Mapa del mundo',h);
}
/* ---------- modo asedio: oleadas cada vez más fuertes contra tu base, hasta que caiga tu centro de mando ---------- */
const sgPow=w=>Math.round((22*Math.pow(S.lvl,1.5)+15)*(.45+.22*w)*dif().k);
function nextWave(b){
 if(b.wave>=60)return false;b.wave++;const army=raidArmy(sgPow(b.wave),S.lvl+Math.floor(b.wave/3)),mul={};for(const k in army)mul[k]=[1,1];
 const tb=mkBattle(army,{defs:[],units:{},k:1,hq:1},mul);
 for(const x of tb.E)if(x.side===0){x.ix=b.E.length;x.tm=1;x.yaw=x.yawT=-Math.PI/2;b.E.push(x)}
 for(const x of b.E)if(x.side===1&&x.hp>0)x.hp=Math.min(x.max,x.hp+x.max*.15);
 b.over=0;b.time=0;b.done=0;if(BT===b){$('#btname').textContent=`🏰 Modo asedio · oleada ${b.wave}`;toast(`🏰 ¡Oleada ${b.wave}!`);sfx('alert')}return true;
}
/* ---------- defensa de la torre ---------- */
const TDK=[['muro',40],['trampa',70],['torre',110],['bunker',150],['llamat',190],['mortero',220],['tesla',300],['tfranco',260],['laser',380]];
const tdList=()=>TDK.filter(([k])=>B[k]&&B[k].lvl<=S.lvl);
function startTD(){const t=now();if(t<(S.tdn||0)){toast(`🗼 La próxima defensa está disponible en ${ft(S.tdn-t)}`);return}
 S.tdn=t+10*60000;const army=raidArmy(sgPow(1),S.lvl),mul={};for(const k in army)mul[k]=[1,1];
 const b=mkBattle(army,mySpec(false),mul);b.raid=1;b.siege=1;b.td=1;b.wave=1;b.dp=400+40*S.lvl;b.tdSel=tdList()[0][0];b.gap=performance.now()+9000;b.e={n:'Defensa de la torre',f:'🗼'};b.live=1;
 closeSheet();save();runBattle(b,'🗼 Defensa de la torre · oleada 1');tdUI(b);toast('🔨 Poné defensas antes de que llegue la oleada')}
function tdOk(b,x,y){const c=Math.floor(x),r=Math.floor(y);if(c<0||c>=GB||r<0||r>GB-4)return false;if(b.blk.has(c+','+r))return false;
 for(const o of b.E)if(o.hp>0&&((o.st&&Math.floor(o.x)===c&&Math.floor(o.y)===r)||(!o.st&&o.side===0&&Math.hypot(o.x-x,o.y-y)<1.3)))return false;return true}
function tdUI(b){const el=$('#btdep');if(!el)return;if(!b.td||b.over){el.classList.remove('on');return}el.classList.add('on');const g=b.gap&&b.gap>performance.now();
 el.innerHTML=`<div class="dph">🔨 <b>${fmt(b.dp)}</b> puntos · ${g?`oleada ${b.wave} en <b>${Math.ceil((b.gap-performance.now())/1000)}s</b>`:`oleada ${b.wave} en curso`} · tocá un casillero libre de tu base</div><div class="dpl">${tdList().map(([k,c])=>`<button class="dpc ${k===b.tdSel?'on':''} ${b.dp<c?'off':''}" data-tk="${k}"><i>${B[k].e}</i><b>${c}</b><small>${B[k].n}</small></button>`).join('')}${g?'<button class="dpc all" data-tk="!"><i>▶️</i><b>Ya</b><small>empezar</small></button>':''}</div>`}
function tdTap(cx,cy){const b=BT;if(!b||!b.td||b.over)return;const r=$('#btmap').getBoundingClientRect(),lx=(cx-r.left)/bz,ly=(cy-r.top)/bz,a=(lx-(GB+1)*btw/2)/(btw/2),s=(ly-btw*1.1)/(btw/4),x=(a+s)/2,y=(s-a)/2;
 const it=TDK.find(t=>t[0]===b.tdSel);if(!it)return;if(b.dp<it[1]){toast('🔨 No te alcanzan los puntos');return}if(!tdOk(b,x,y)){toast('📍 Ahí no se puede: elegí un casillero libre de tu base');return}
 const k=it[0],q=DEFS[k],m=1+S.lvl*.12,c=Math.floor(x),rr=Math.floor(y),o={side:1,kind:k,st:1,cls:'def',x:c+.5,y:rr+.5,hp:q.hp*m,uhp:q.hp*m,m:1,dmg:q.dmg*m,rng:q.rng,cd:q.cd,spd:0,fly:0,air:q.air,vs:q.vs,t:Math.random()*q.cd,rt:0,tg:null,ix:b.E.length,tm:0,yaw:0,ny:0,hid:0};
 o.max=o.hp;b.E.push(o);if(k==='muro')b.wc.set(c+','+rr,o);b.dp-=it[1];sfx('build');hammer(2);const[px,py]=bpos(o.x,o.y);for(let i=0;i<6;i++)fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.5,y:py,vx:(Math.random()-.5)*.02*btw,vy:-.004*btw,life:600,r0:btw*.05,r1:btw*.14,col:'210,200,180'});tdUI(b)}
function tdEnd(b){const w=b.wave-(b.E[0].hp<=0?1:0),L=S.lvl,r={c:Math.round(180*w*L),s:Math.round(10*w*L)};if(w>=5)r.e=Math.round(5*w*L);
 const best=Math.max(S.tdb||0,w),rec=w>(S.tdb||0);S.tdb=best;gain(r);addXP(10*w);if(w>=10)giveItem(2);sfx(w>=3?'win':'lose');save();hud();
 const html=`<div class="${w>=3?'win':'lose'}">${w>=3?'¡BIEN DEFENDIDO!':'CAYÓ TU BASE'}</div><p>Aguantaste <b>${w}</b> ${w===1?'oleada':'oleadas'}${rec?' · 🏆 ¡récord nuevo!':` · récord ${best}`}</p><p>Premio: <b>${costPlain(r)}</b>${w>=10?' + 🧰 pieza':''}</p>`;
 const btns=[['Volver a la base',()=>{$('#bt').classList.remove('on');BT=null;hud()},'gold']];if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns)}
function startSiege(live){
 const t=now();if(t<(S.sg.next||0)){toast(`🏰 El próximo asedio está disponible en ${ft(S.sg.next-t)}`);return}
 S.sg.next=t+20*60000;const army=raidArmy(sgPow(1),S.lvl),mul={};for(const k in army)mul[k]=[1,1];
 const b=mkBattle(army,mySpec(false),mul);b.raid=1;b.siege=1;b.wave=1;b.e={n:'Asedio',f:'🏰'};b.live=live;closeSheet();save();runBattle(b,'🏰 Modo asedio · oleada 1');
}
const sgBots=()=>S.enemies.map(e=>({n:e.f+' '+e.n,w:3+Math.round(e.lvl*.55)}));
function siegeEnd(b){
 const sv=b.wave-1,L=S.lvl,r={c:Math.round(250*L*sv*(1+sv*.08))+200,s:Math.round(25*L*sv),e:Math.round(12*L*sv)},rec=sv>(S.sg.best||0);if(rec)S.sg.best=sv;
 gain(r);addXP(8*sv);let rey='';if(sv>=12&&!S.troops.drey){S.troops.drey=1;rey='<p><b>👑 ¡Ganaste el Dragón rey!</b></p>'}sfx(sv>=3?'win':'lose');save();hud();
 const rows=sgBots().concat([{n:myTag(),w:S.sg.best||0,me:1}]).sort((a,c)=>c.w-a.w);
 const html=`<div class="mtitle">🏰 Fin del asedio</div><p>Aguantaste <b>${sv}</b> oleada${sv===1?'':'s'}${rec?' · <b>¡nuevo récord!</b>':''}</p><p>Premio: <b>${costPlain(r)}</b></p>${rey}<div class="rank">${rows.slice(0,8).map((q,i)=>`<div class="${q.me?'me':''}"><span>${i+1}.</span> ${q.n} <b>${q.w}</b></div>`).join('')}</div>`;
 const btns=[['Volver a la base',()=>{$('#bt').classList.remove('on');BT=null;hud()},'gold']];
 if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns);
}
function openSiege(){
 const t=now(),cd=t<(S.sg.next||0),rows=sgBots().concat([{n:myTag(),w:S.sg.best||0,me:1}]).sort((a,c)=>c.w-a.w);
 modal(`<div class="mtitle">🏰 Modo asedio</div><p>Oleadas cada vez más fuertes atacan tu base. Te defienden tus defensas y la mitad de tus tropas, sin perderlas. Entre oleada y oleada tus defensas se reparan un poco.</p><p class="small">Tu récord: <b>${S.sg.best||0}</b> oleadas${cd?` · próximo asedio en ${ft(S.sg.next-t)}`:''}</p><div class="rank">${rows.slice(0,8).map((q,i)=>`<div class="${q.me?'me':''}"><span>${i+1}.</span> ${q.n} <b>${q.w}</b></div>`).join('')}</div>`,
  cd?[['Cerrar']]:[['👁️ Jugar en vivo',()=>setTimeout(()=>startSiege(1),0),'gold'],['⚡ Resultado rápido',()=>setTimeout(()=>startSiege(0),0)],['Cerrar']]);
}
/* ---------- campaña con historia: capítulos con diálogos y enemigos con un estilo propio ---------- */
const STO=[
 {n:'El desembarco',f:'🏖️',p:.7,defs:['torre','torre','muro','trampa'],units:{soldado:8,marine:3},rw:{c:3000},
  pre:[['🎖️','Sargento Ramos','Comandante, llegamos a la costa. El Coronel Mostaza tiene un puesto de avanzada en la playa.'],['🤠','Coronel Mostaza','¡Nadie desembarca en mis playas! Mis torres los van a barrer.'],['🎖️','Sargento Ramos','Sus torres castigan a la infantería. Mandá tanques adelante.']],
  post:[['🎖️','Sargento Ramos','¡Playa asegurada! Ahora vamos por el puente del General Bigotes.']]},
 {n:'El puente de acero',f:'🌉',p:1,defs:['bunker','bunker','muro','muro','mortero'],units:{tanque:4,pesado:2},rw:{c:8000,s:500},
  pre:[['🧔','General Bigotes','Mis blindados no dejan pasar ni una mosca por este puente.'],['🎖️','Sargento Ramos','Los tanques son duros, pero los bazuqueros y los robots artilleros los perforan.']],
  post:[['🎖️','Sargento Ramos','El puente es nuestro. Ojo: la Capitana Tormenta controla el cielo del otro lado.']]},
 {n:'Cielos en llamas',f:'🔥',p:1.2,defs:['antiaereo','antiaereo','antiaereo','torre'],units:{helicoptero:3,caza:2},rw:{c:15000,s:900},item:2,
  pre:[['👩‍✈️','Capitana Tormenta','Mis antiaéreos derriban cualquier cosa que vuele.'],['🎖️','Sargento Ramos','Entonces no vamos por aire: tierra y artillería contra sus antiaéreos.']],
  post:[['👩‍✈️','Capitana Tormenta','Esto no termina acá… el Barón Bulón los espera en su fortaleza.']]},
 {n:'La fortaleza del Barón',f:'🏰',p:1.5,hqx:3,defs:['bunker','bunker','mortero','tesla','laser','muro','muro','trampa'],units:{robot:2,marine:6},rw:{c:30000,e:2000},
  pre:[['🤴','Barón Bulón','Mi fortaleza resistió cien asedios. Su centro de mando es el triple de fuerte.'],['🎖️','Sargento Ramos','Vamos a necesitar todo: tanques pesados, artilleros y paciencia.']],
  post:[['🤴','Barón Bulón','¡Imposible! … Pero el Dragón Negro despertó. Ni ustedes pueden con él.']]},
 {n:'El último dragón',f:'🐉',p:1.9,defs:['antiaereo','antiaereo','laser','tesla'],units:{dragon:2,dfuego:1,dhielo:1},rw:{c:60000},item:3,
  pre:[['🐲','Dragón Negro','Ssss… cenizas. Eso van a ser.'],['🎖️','Sargento Ramos','Es el combate final, comandante. Cazas y dragones eléctricos contra sus alas.']],
  post:[['🎖️','Sargento Ramos','¡Lo logramos! El mundo es libre gracias a usted, comandante.']]}];
function storySpec(i){
 const c=STO[i],pw=Math.round((25*Math.pow(S.lvl,1.6)+5)*c.p*dif().k),slots=[[5,3],[3,4],[7,4],[2,6],[8,6],[5,6],[4,2],[6,2]];
 let base=0;for(const k of c.defs)base+=DEFS[k].r;for(const k in c.units)base+=U[k].atk*c.units[k];
 const sc=Math.max(.6,Math.min(60,pw/Math.max(1,base))),um={};for(const k in c.units)um[k]=[sc,sc];
 return{defs:c.defs.map((k,j)=>({k,c:slots[j][0],r:slots[j][1],m:sc})),units:c.units,um,k:sc,hq:(400+4*pw)*(c.hqx||1),hqd:12,pw};
}
function talk(lines,done){let i=0;const nx=()=>{if(i>=lines.length){if(done)done();return}const[f,n,t]=lines[i++];modal(`<div class="dlg"><div class="dlf">${f}</div><div><b>${n}</b><p>${t}</p></div></div>`,[[i<lines.length?'Siguiente ▶':'¡Vamos!',()=>setTimeout(nx,0),'gold']])};nx()}
function openStory(){
 let h='<p class="small" style="margin-top:0">Una historia en cinco capítulos. Cada uno tiene enemigos con un estilo propio: leé los consejos antes de atacar.</p>';
 STO.forEach((c,i)=>{const done=i<S.story,cur=i===S.story;h+=`<div class="erow" style="${cur?'':'opacity:'+(done?.75:.45)}"><div class="ef">${c.f}</div><div class="einfo"><b>Capítulo ${i+1}: ${c.n}</b><div class="small">Premio: ${costPlain(c.rw)}${c.item?' + pieza '+RAR[c.item][0].toLowerCase():''}</div></div>${done?'<div class="small lockt">✓</div>':cur?`<button class="btn sm red" data-a="story" data-v="${i}">Jugar</button>`:'<div class="small lockt">🔒</div>'}</div>`});
 if(S.story>=STO.length)h+='<div class="done">🏆 ¡Terminaste la historia!</div>';
 openSheet('story','📖 Historia',h);
}
const hubBtns=()=>'<div class="row4"><button class="btn gold" data-a="world">🌍 Mundo</button><button class="btn gold" data-a="clan">🛡️ Clan</button><button class="btn gold" data-a="siege">🏰 Asedio</button><button class="btn gold" data-a="storyo">📖 Historia</button></div>';
/* ---------- islas a la vista: botón con lista, ubicar cada isla en el mapa y combates visibles ---------- */
function goIsl(i){
 const wd=$('#world'),[x,y]=islPos(i),k=tw/100,cx=(x*k+OX)*S.zoom,cy=y*k*S.zoom,mw=$('#mapw');
 const ox=mw.offsetLeft,oy=mw.offsetTop;wd.scrollTo({left:ox+cx-wd.clientWidth/2,top:oy+cy-wd.clientHeight/2,behavior:'smooth'});
 setTimeout(()=>{const el=document.querySelector(`.isl[data-isl="${i}"]`);if(el){el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse')}},350);
}
function openIslands(){
 const t=now();let h='';
 if(S.exp.length){h+='<div class="cat">⛵ Tus expediciones</div>';for(const x of S.exp)h+=`<div class="trow"><div class="te">⛵</div><div class="tinfo"><b>${ISL[x.i].n}</b><div class="small">${t<x.s+(x.e-x.s)*.4?'Navegando':'Conquistando'} · llega en ${ft(x.e-t)}${x.rf?' · ⚠️ con refuerzos':''}</div></div><button class="btn sm" data-a="goisl" data-v="${x.i}">📍 Ver</button></div>`}
 const wars=ISL.map((d,i)=>i).filter(i=>S.isl[i].war&&S.enemies[S.isl[i].war.by]);
 if(wars.length){h+='<div class="cat">⚔️ Disputas entre rivales</div>';for(const i of wars){const w=S.isl[i].war;h+=`<div class="trow"><div class="te">⚔️</div><div class="tinfo"><b>${ISL[i].n}</b><div class="small">${S.enemies[w.by].f} ${S.enemies[w.by].n} la ataca · ${ft(w.end-t)}</div></div><button class="btn sm" data-a="goisl" data-v="${i}">📍 Ver</button></div>`}}
 h+='<div class="cat">🏝️ Todas las islas</div>';
 ISL.forEach((d,i)=>{const s=S.isl[i],mine=s.o<0,o=S.enemies[s.o],busy=S.exp.some(x=>x.i===i);
  h+=`<div class="erow"><div class="ef">🏝️</div><div class="einfo"><b>${d.n}</b> ${mine?'<span class="tag" style="background:#2f7fe0">Tuya</span>':`<span class="tag">${o.f} Nv ${o.lvl}</span>`}<div class="small">${mine?`Te da +${islRate(i)}💰 por minuto`:`🛡️${islDef(i)} · +${islRate(i)}💰 por minuto`}</div></div><button class="btn sm" data-a="goisl" data-v="${i}">📍</button>${mine||busy?'':`<button class="btn sm gold" data-a="enemy" data-v="i${i}">⛵ Conquistar</button>`}</div>`});
 openSheet('isls','🏝️ Islas',h);
}
function islBadge(){const n=S.exp.length+ISL.filter((d,i)=>S.isl[i].war).length,b=$('#bislb');if(b){b.textContent=n;b.style.display=n?'':'none'}}
/* ---------- Kraken colosal: jefe compartido de fin de semana (sábado y domingo) ---------- */
function krWin(t){const d=new Date(t),w=d.getDay();if(w!==6&&w!==0)return null;const s=new Date(d);s.setHours(0,0,0,0);s.setDate(s.getDate()-(w===6?0:1));const st=s.getTime();return{id:dayStr(st),st,en:st+2*864e5}}
function krNext(t){const d=new Date(t);d.setHours(0,0,0,0);for(let k=0;k<8&&d.getDay()!==6;k++)d.setDate(d.getDate()+1);return d.getTime()}
function krState(){const t=now(),w=krWin(t);if(!w||S.lvl<3)return null;if(!S.kr||S.kr.id!==w.id)S.kr={id:w.id,d:0,p0:0,n:0,day:'',got:{}};if(S.kr.day!==dayStr(t)){S.kr.day=dayStr(t);S.kr.n=0}return w}
const KTRY=3,KTIER=[['🥉 Bronce',30],['🥈 Plata',110],['🥇 Oro',220]];
const krEq=k=>k&&k.p0?k.d/(k.p0*50):0;
function krPct(w){const f=Math.min(1,Math.max(0,(now()-w.st)/(w.en-w.st))),bots=90*Math.pow(f,.9);let ot=0;for(const r of PLY)if(r.kev===w.id&&r.kp>0)ot+=Math.min(12,r.kd/(r.kp*50)*2);return Math.min(100,bots+Math.min(14,krEq(S.kr)*2)+ot)}
function krSpec(){const P=Math.max(60,armyPow(S.troops)),sp=enemySpec(Math.max(120,P*.6),Math.max(3,Math.min(20,S.lvl+1)),(S.kr?S.kr.id.length*977:7)+S.lvl);sp.hq=1e8;sp.hqd=Math.max(4,P/60);sp.krk=1;return sp}
const krBtn=()=>{const w=krState();if(S.lvl<3)return '';if(!w)return `<div class="small" style="margin:-4px 0 10px">🐙 El <b>Kraken colosal</b> llega el sábado · faltan ${ft(krNext(now())-now())}</div>`;const p=krPct(w);return `<button class="btn" data-a="kraken" style="margin:0 0 10px;background:linear-gradient(#8e5bd6,#4a2a8c);color:#fff;box-shadow:inset 0 1px 0 #fff5,0 0 0 1px #2a1550,0 3px 0 #2a1550">🐙 Kraken colosal · vida ${Math.max(0,Math.ceil(100-p))}% · ${S.kr.n<KTRY?`te quedan ${KTRY-S.kr.n} ataques hoy`:'volvé mañana'}</button>`};
function openKraken(){
 const w=krState();if(!w){toast('🐙 El Kraken colosal aparece los fines de semana');return}
 const k=S.kr,p=krPct(w),dead=p>=100,eq=krEq(k);
 let h=`<div class="krhead"><svg viewBox="-60 -80 220 210">${spr('krakenB',1,6,1,1)}</svg><div><b>Kraken colosal</b><div class="small">Todos los jugadores le pegan juntos durante el fin de semana. Si cae, todos los que participaron ganan el premio mayor.</div></div></div>`;
 h+=`<div class="istat"><div class="krbar"><i style="width:${Math.max(0,100-p).toFixed(1)}%"></i></div><div class="small" style="margin-top:4px">${dead?'💀 ¡El Kraken cayó!':`❤️ Le queda ${Math.max(0,100-p).toFixed(1)}% de vida`} · termina en <b data-until="${w.en}"></b></div></div>`;
 h+=`<div class="istat">⚔️ Tu daño total: <b>${fmt(k.d)}</b>${k.p0?` · aporte al jefe: <b>${Math.min(14,eq*2).toFixed(1)}%</b>`:''}<br><span class="small">Ataques de hoy: ${k.n} de ${KTRY}. Tus tropas no mueren contra el Kraken: es un combate de desgaste de 2 minutos.</span></div>`;
 h+=`<button class="btn red" data-a="enemy" data-v="k" ${k.n>=KTRY||dead?'disabled':''}>🐙 Atacar al Kraken</button>`;
 h+='<div class="cat">Premios por tu daño</div>';
 KTIER.forEach((t,i)=>{const need=k.p0?t[1]*k.p0:0,ok=k.p0&&k.d>=need,got=k.got[i];h+=`<div class="trow"><div class="tinfo"><b>${t[0]}</b><div class="small">${k.p0?`Daño ${fmt(need)}`:'Atacá una vez para calcular la meta'} · ${['💰 oro y una pieza rara','🧰 pieza épica y acero','🧰 pieza legendaria y el marco 🐙 Kraken'][i]}</div>${k.p0?`<div class="pb"><i style="width:${Math.min(100,k.d/need*100)}%"></i></div>`:''}</div>${got?'<div class="small lockt">Cobrado ✓</div>':`<button class="btn sm gold" data-a="krclaim" data-v="${i}" ${ok?'':'disabled'}>Cobrar</button>`}</div>`});
 h+=`<div class="trow"><div class="tinfo"><b>💀 Kraken derrotado</b><div class="small">Para todos los que lo atacaron: pieza legendaria, bandera y aspecto 🐙 Kraken</div></div>${k.got.kill?'<div class="small lockt">Cobrado ✓</div>':`<button class="btn sm gold" data-a="krclaim" data-v="kill" ${dead&&k.d>0?'':'disabled'}>Cobrar</button>`}</div>`;
 openSheet('kraken','🐙 Kraken colosal',h);
}
function krClaim(v){const k=S.kr,w=krState();if(!k||!w||k.got[v])return;const L=S.lvl;
 if(v==='kill'){if(krPct(w)<100||!k.d)return;k.got.kill=1;giveItem(3);S.cosU.kr=1;toast('🐙 ¡Premio del Kraken! Desbloqueaste bandera y aspecto Kraken')}
 else{const i=+v;if(!k.p0||k.d<KTIER[i][1]*k.p0)return;k.got[i]=1;if(i===0){gain({c:3000*L});giveItem(1)}else if(i===1){gain({s:120*L,e:60*L});giveItem(2)}else{giveItem(3);S.cosU.krg=1;toast('🖼️ Desbloqueaste el marco Kraken')}}
 sfx('done');hud();save();openKraken()}
function krEnd(b){const hq=b.E[0],d=Math.round(hq.max-hq.hp),k=S.kr;if(k){if(!k.p0)k.p0=Math.max(50,armyPow(b.army));k.d+=d;k.n++}
 if(b.hero&&S.cmd[b.hero.k])cmdXP(b.hero.k,4*S.lvl);S.stats.krk=(S.stats.krk||0)+1;sfx('win');addXP(20+S.lvl*2);save();hud();
 const html=`<div class="mtitle">🐙 Fin del ataque</div><p>Le hiciste <b>${fmt(d)}</b> de daño al Kraken.</p><p class="small">Total del fin de semana: ${fmt(k?k.d:d)} · ataques de hoy: ${k?k.n:1} de ${KTRY}</p>`;
 const btns=[['Volver',()=>{$('#bt').classList.remove('on');BT=null;hud();setTimeout(openKraken,50)},'gold']];
 if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns)}
function krTick(){const w=krWin(now());if(w&&S.lvl>=3&&S.krSeen!==w.id&&!modalOpen&&!BT){S.krSeen=w.id;sfx('alert');toast('🐙 ¡Apareció el Kraken colosal! Entrá a Atacar');save()}}

/* ---------- cosméticos: banderas, aspectos de edificios y marcos que se desbloquean con logros ---------- */
const COS={
 flag:{n:'🚩 Color de bandera',L:[['Azul','#2f7fe0'],['Rojo','#d9452b',0],['Verde','#3f9a2f',7],['Negro pirata','#2b2b2b',8],['Violeta','#8e56c2',10],['Dorado','#f6c21e',2],['Kraken','#2fd0c0','kr']]},
 skin:{n:'🏠 Aspecto de edificios',L:[['Original',null],['Acero',['#6b7c8f',.32],5],['Selva',['#3f7a2a',.3],9],['Nieve',['#ffffff',.4],14],['Dorado',['#f6c21e',.33],6],['Volcán',['#b8401c',.3],13],['Kraken',['#7a3fa0',.32],'kr']]},
 frame:{n:'🖼️ Marco de perfil',L:[['Sin marco',''],['Plata','0 0 0 3px #dfe5ea,0 0 10px #ffffff99',3],['Oro','0 0 0 3px #f6c21e,0 0 14px #f6b51e',1],['Fuego','0 0 0 3px #ff6a1a,0 0 16px #ff3b00',12],['Leyenda','0 0 0 3px #b06cf0,0 0 16px #b06cf0',2],['Kraken','0 0 0 3px #2fd0c0,0 0 16px #7a3fa0','krg']]}};
const cosOk=r=>r==null||(typeof r==='number'?!!S.ach[r]:!!S.cosU[r]);
const cosReq=r=>typeof r==='number'?'Logro: '+ACH[r][0]:r==='kr'?'Derrotar al Kraken colosal':'🥇 Oro en el Kraken colosal';
const cosCur=k=>{const i=S.cos[k]||0,o=COS[k].L[i];return o&&cosOk(o[2])?o:COS[k].L[0]};
let SKC=null;
function cosApply(){const r=document.documentElement;r.style.setProperty('--myflag',cosCur('flag')[1]);const f=cosCur('frame')[1];const ls=$('#lvlstar');if(ls)ls.style.boxShadow=f||'';const sk=cosCur('skin')[1],key=sk?sk.join():'';if(SKC!==key){const first=SKC===null;SKC=key;if(!first)layout(1)}}
const skinA=s=>{const sk=cosCur('skin')[1];return sk?s.replace(/#[0-9a-fA-F]{6}\b/g,c=>GLS[c.toLowerCase()]?c:mixc(c,sk[0],sk[1])):s};
function cosPrev(k,o){if(k==='flag')return `<i class="cflag" style="background:${o[1]}"></i>`;if(k==='frame')return `<i class="cframe" style="box-shadow:${o[1]||'none'}">⭐</i>`;return `<i class="cskin" style="background:${o[1]?mixc('#f3e2c0',o[1][0],o[1][1]*1.6):'#f3e2c0'}"></i>`}
function openCos(){let h='<p class="small" style="margin-top:0">Se desbloquean con logros y en el Kraken colosal. Tocá uno para usarlo.</p>';
 for(const k in COS){h+=`<div class="cat">${COS[k].n}</div><div class="cosg">`;COS[k].L.forEach((o,i)=>{const ok=cosOk(o[2]),on=(S.cos[k]||0)===i&&ok;h+=`<div class="cos ${on?'on':''} ${ok?'':'lock'}" ${ok?`data-a="cos" data-v="${k}:${i}"`:''}>${cosPrev(k,o)}<b>${o[0]}</b>${ok?'':`<small>🔒 ${cosReq(o[2])}</small>`}</div>`});h+='</div>'}
 openSheet('cos','🎨 Personalizar',h)}

/* ---------- copia de seguridad: un código de texto con toda la partida ---------- */
async function bkMake(){const j=JSON.stringify(S);
 if(window.CompressionStream){try{const st=new Blob([j]).stream().pipeThrough(new CompressionStream('gzip')),u=new Uint8Array(await new Response(st).arrayBuffer());let s='';for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return 'GDB1z:'+btoa(s)}catch(e){}}
 return 'GDB1:'+btoa(unescape(encodeURIComponent(j)))}
async function bkRead(code){code=(code||'').replace(/\s+/g,'');let j;
 if(code.startsWith('GDB1z:')){const bin=atob(code.slice(6)),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);j=await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text()}
 else if(code.startsWith('GDB1:'))j=decodeURIComponent(escape(atob(code.slice(5))));else throw new Error('formato');
 const r=JSON.parse(j);if(!r||r.v!==1||!Array.isArray(r.g)||!r.troops)throw new Error('datos');return r}
function openBackup(){
 openSheet('backup','💾 Copia de seguridad',`<p class="small" style="margin-top:0">Guardá este código en un lugar seguro (notas, WhatsApp a vos mismo, un mail). Con él recuperás tu partida en cualquier navegador o celular.</p>
 <div class="cat">Tu código</div><textarea id="bkout" class="bkta" readonly>Generando…</textarea><div class="row2"><button class="btn gold" data-a="bkcopy">📋 Copiar</button><button class="btn" data-a="bkdl">⬇️ Descargar</button></div>
 <div class="cat">Recuperar una partida</div><textarea id="bkin" class="bkta" placeholder="Pegá acá tu código"></textarea><button class="btn red" data-a="bkimp">♻️ Cargar esta partida</button><p class="small">Ojo: reemplaza la partida actual.</p>`);
 bkMake().then(c=>{const t=$('#bkout');if(t)t.value=c})}
function bkCopy(){const t=$('#bkout');if(!t||!t.value.startsWith('GDB'))return;const ok=()=>toast('📋 Código copiado');
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t.value).then(ok,()=>{t.select();try{document.execCommand('copy');ok()}catch(e){toast('Seleccioná el texto y copialo a mano')}});else{t.select();try{document.execCommand('copy');ok()}catch(e){toast('Seleccioná el texto y copialo a mano')}}}
async function bkDl(){const t=$('#bkout');if(!t||!t.value.startsWith('GDB'))return;const fn='guerra-de-bases-'+dayStr(now())+'.txt';
 if(window.claude&&window.claude.use){let dl=null;try{dl=await window.claude.use('downloads')}catch(e){}if(dl){try{await dl.save({filename:fn,data:t.value});toast('⬇️ Copia guardada')}catch(e){toast('No se guardó: podés usar Copiar')}return}}
 try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t.value],{type:'text/plain'}));a.download='guerra-de-bases-'+dayStr(now())+'.txt';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);toast('⬇️ Descargando la copia')}catch(e){toast('No se pudo descargar: usá Copiar')}}
function bkImp(){const t=$('#bkin');if(!t||!t.value.trim()){toast('Pegá primero el código');return}
 bkRead(t.value).then(r=>{closeSheet();modal(`<div class="mtitle">¿Cargar esta partida?</div><p>Nivel <b>${r.lvl}</b> · ${r.stats&&r.stats.won||0} victorias.</p><p class="small">Tu partida actual se reemplaza.</p>`,[['Sí, cargar',()=>{const sy=S.sync;S=r;migrate();S.sync=sy;PL=null;MV=null;save();layout();hud();sndBtn();cosApply();setTimeout(()=>cloudSave(1),0);toast('♻️ Partida recuperada')},'red'],['Cancelar']])}).catch(()=>toast('❌ Ese código no es válido'))}

