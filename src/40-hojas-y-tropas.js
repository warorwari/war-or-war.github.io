/* ---------- hoja inferior ---------- */
let sheet={kind:null};
let NAV=[],CUR=null,PEND=null,NAVING=0;
function navW(f){return function(...a){const me={f,a};PEND=me;try{return f(...a)}finally{if(PEND===me)PEND=null}}}
function navBtn(){const b=$('#shback');if(b)b.style.visibility=NAV.length?'visible':'hidden'}
function resumeNav(r){if(sheet.kind||modalOpen||PL||MV!=null||BT)return;const st=[...r.st],top=st.pop();NAVING=1;try{top.f(...top.a)}finally{NAVING=0}if(sheet.kind){NAV=st;navBtn()}}
function goBack(){const p=NAV.pop();if(!p){closeSheet();return}NAVING=1;try{p.f(...p.a)}finally{NAVING=0}navBtn()}
const SCR={};
/* barra fija de categorías: en las pantallas largas, tocás una y salta ahí */
function catNav(kind){const bd=$('#shbody');if(kind!=='troops'&&kind!=='select'&&kind!=='build')return;const cs=[...bd.querySelectorAll('.cat')].filter(c=>c.dataset.nav!=='0');if(cs.length<3)return;
 const nv=document.createElement('div');nv.className='catnav';cs.forEach((c,i)=>{c.id='cat'+i;const b=document.createElement('button');b.textContent=c.textContent.replace(/[·✓].*$/,'').trim().split(/\s+/).slice(0,2).join(' ');b.onclick=e=>{e.stopPropagation();bd.scrollTo({top:c.offsetTop-nv.offsetHeight-6,behavior:'smooth'})};nv.appendChild(b)});bd.prepend(nv)}
function openSheet(kind,title,html,extra){const me=PEND||{k:kind,f:openSheet,a:[kind,title,html,extra]};PEND=null;me.k=kind;
 if(!NAVING){if(sheet.kind&&sheet.kind!==kind&&CUR&&CUR.k!==kind){const j=NAV.findIndex(x=>x.k===kind);if(j>=0)NAV.length=j;else{NAV.push(CUR);if(NAV.length>12)NAV.shift()}}else if(!sheet.kind)NAV=[]}
 CUR=me;navBtn();if(sheet.kind)SCR[sheet.kind]={y:$('#shbody').scrollTop,t:Date.now()};const sv=SCR[kind],st=sheet.kind===kind?$('#shbody').scrollTop:sv&&Date.now()-sv.t<180000?sv.y:0;sheet=Object.assign({kind},extra||{});$('#shtitle').innerHTML=title;$('#shbody').innerHTML=html;catNav(kind);$('#shbody').scrollTop=st;$('#sheet').dataset.k=kind;if(!$('#sheet').classList.contains('on'))playS('open',.3);$('#sheet').classList.add('on');$('#shade').classList.add('on');document.documentElement.classList.add('menu-on');live()}
let LASTN=null;
function closeSheet(){if(sheet.kind)SCR[sheet.kind]={y:$('#shbody').scrollTop,t:Date.now()};if(sheet.kind&&CUR)LASTN={st:[...NAV,CUR],t:Date.now()};if(sheet.kind)playS('close',.25);sheet={kind:null};NAV=[];CUR=null;$('#sheet').classList.remove('on');$('#shade').classList.remove('on');document.documentElement.classList.remove('menu-on')}
$('#shclose').onclick=()=>NAV.length?goBack():closeSheet();$('#shback').onclick=goBack;$('#shade').onclick=closeSheet;
$('#shbody').addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(a)act(a.dataset.a,a.dataset.v)});

function bLine(d){
 if(d.prod){const k=Object.keys(d.prod)[0];return `+${d.prod[k]}${RES[k]} cada ${d.per}s`}
 if(d.def)return `🛡️ +${d.def} defensa`;
 if(d.unit)return `Entrena: ${U[d.unit].n}`;
 return `+${d.xp}⭐`;
}
function openBuild(){
 const cats=[['Producción',['casa','granja','pozo','mina','central','banco','recolector']],['Militar',['cuartel','fabrica','hangar','lab','forja','astillero','genetico']],['Defensa',['muro','trampa','torre','antiaereo','bunker','mortero','tesla','laser','llamat','tfranco','costa','escudo']],['Decoración',['arbol','pino','fuente','estatua']]];
 let h='<button class="btn gold" data-a="shop" style="margin:0 0 10px">🚢 Mercader: ofertas del momento</button>'+terrHTML();
 for(const[cn,list]of cats){
  h+=`<div class="cat">${cn}</div><div class="grid">`;
  for(const k of list){const d=B[k],lock=S.lvl<d.lvl;
   h+=`<div class="card ${lock?'lock':''}" data-a="build" data-v="${k}"><div class="ce">${svgArt(k,1)}</div><div class="cn">${d.n}</div>${lock?`<div class="cl">🔒 Nivel ${d.lvl}</div>`:`<div class="cc">${costHTML(d.cost)}</div><div class="cs">${bLine(d)}${d.t?' · ⏱'+Math.round(d.t*bm())+'s':''}</div>`}</div>`}
  h+='</div>';
 }
 openSheet('build','🔨 Construir',h);
}
const stSig=b=>b?[b.t,b.l,isCons(b),b.up?1:0,ready(b)].join():'x';
function openInfo(i){
 const b=S.g[i];if(!b){closeSheet();return}
 const d=B[b.t];
 let h=`<div class="ihead"><div class="ie">${svgArt(b.t,b.l)}</div><div><div class="in">${d.n}${d.max?`<small>Nv ${b.l}/${d.max}</small>`:''}</div><div class="id">${d.d}</div></div></div>`;
 if(isCons(b)){
  h+=`<div class="istat">${b.up?'⬆️ Mejorando':'🚧 En construcción'}… faltan <b data-until="${b.end}"></b></div><button class="btn gold" data-a="rush">⚡ Terminar ya · ${RES.c}<span data-rush="${i}"></span></button>`;
 }else{
  if(b.t==='recolector')h+=`<div class="istat">🛸 Junta la producción de tu base mientras no jugás, hasta <b>${RH[b.l]} h</b>${b.l<7?` · a nivel ${b.l+1}: ${RH[b.l+1]} h`:''}</div>`;if(d.prod)h+=`<div class="istat">Produce <b>${costPlain(prodOf(b))}</b> cada ${d.per}s<br>Listo para cobrar en <b data-until="${b.lc+d.per*1000}"></b></div>`+(b.w?'<div class="istat">🤖 Robot obrero trabajando: +50%</div>':`<button class="btn" data-a="worker">🤖 Asignar robot obrero (+50%) · ${costHTML(WCOST)}</button>`);
  if(d.def)h+=`<div class="istat">Defensa: <b>🛡️${Math.round(d.def*LM[b.l])}</b></div>`;
  if(d.unit)h+=`<div class="istat">Entrena: <b>${U[d.unit].n}</b> · velocidad x${speed(d.unit)}</div><button class="btn" data-a="troops">🎖️ Ir a entrenar</button>`;
  if(b.t==='lab')h+=`<button class="btn gold" data-a="tech">🔧 Mejoras robóticas</button>`;
  if(d.max===7&&b.l===7&&S.lvl<12)h+=`<p class="small">🔒 El nivel 8 de los edificios se desbloquea cuando llegues al nivel 12.</p>`;
  if(d.max&&b.l<maxL(d)){const c=upCost(b);h+=`<button class="btn gold" data-a="up">⬆️ Mejorar a nivel ${b.l+1} · ${costHTML(c)} · ⏱${Math.round(d.t*(b.l+1)*bm())}s</button>`}
  else if(d.max)h+=`<div class="istat">⭐ ¡Nivel máximo!</div>`;
 }
 h+=`<div class="row2"><button class="btn" data-a="mv">✋ Mover</button><button class="btn red" data-a="sell">🗑️ Vender ${sellVal(b)?'+'+RES.c+sellVal(b):''}</button></div>`;
 openSheet('info',d.n,h,{i,sig:stSig(b)});
}
/* ---------- tropas: tipos, niveles y ventajas ---------- */
const CI={inf:'🎖️',veh:'🚙',air:'🚁',mec:'🤖',def:'🗼'},CN={inf:'infantería',veh:'vehículos',air:'aéreos',mec:'robots',def:'defensas'};
const UVC={inf:'29 55 44 44',veh:'10 48 80 80',air:'6 24 88 88',mec:'24 50 52 52'};
const ue=u=>typeof ENV!=='undefined'&&ENV['u_'+u]?`<img class="ui up" src="${ENV['u_'+u]}" alt="">`:`<svg class="ui" viewBox="${UVC[U[u].cls]}">${spr(u,S.ulv[u],2)}</svg>`;
const uMax=()=>S.lvl>=18?7:S.lvl>=14?6:5;
const ulm=u=>1+.2*(S.ulv[u]-1);                                   // cada nivel de tropa: +20% de vida y daño
const rating=u=>U[u].atk*ulm(u)*(1+.25*S.tech.atk);
const maxB=b=>S.g.reduce((m,x)=>x&&x.t===b&&done(x)?Math.max(m,x.l):m,0);
const ulCost=u=>mult(U[u].cost,8*S.ulv[u]);
function vsTxt(d){const s=[],w=[];for(const k in d.vs){if(d.vs[k]>1.15)s.push(CI[k]);else if(d.vs[k]<.85)w.push(CI[k])}return(s.length?' · 💪'+s.join(''):'')+(w.length?' · 👎'+w.join(''):'')+(d.air?'':' · no ataca aéreos')}
let qOpen=false;
function qHTML(){
 if(!S.queue.length)return `<div class="qline qempty">⏳ Nada en entrenamiento<span class="qpop">👥 ${popUsed()}/${popCap()}</span></div>`;
 const t=now(),q0=S.queue[0],d0=U[q0.u],dur=d0.t*1000/(speed(q0.u)||1),pc=Math.max(0,Math.min(100,100-(q0.end-t)/dur*100));
 const last=S.queue[S.queue.length-1].end;
 let h=`<div class="qline" data-a="qtog">${ue(q0.u)}<div class="qmid"><div class="qtxt"><b>${S.queue.length} en cola</b> · todo en <span data-until="${last}">${ft(last-t)}</span></div><div class="qbar"><i style="width:${pc}%"></i></div></div><span class="qpop">👥 ${popUsed()}/${popCap()}</span><span class="qarr">${qOpen?'▲':'▼ editar'}</span></div>`;
 if(qOpen){
  const g=[];for(const q of S.queue){const l=g[g.length-1];if(l&&l.u===q.u){l.n++}else g.push({u:q.u,n:1})}
  h+='<div class="qgrid">'+g.map((x,k)=>`<div class="qi">${ue(x.u)}<span>×${x.n}</span><button class="qx" data-a="qdelg" data-v="${k}" title="Sacar uno">−</button></div>`).join('')+`<button class="qi qclr" data-a="qclr">🗑️ Vaciar</button></div>`;
 }
 return h;
}
function qFix(){let t=now();for(let i=0;i<S.queue.length;i++){const q=S.queue[i];if(i===0&&q._keep){t=q.end;continue}t=Math.max(t,now())+U[q.u].t*1000/(speed(q.u)||1);q.end=t}}
function qRemove(idx){
 const q=S.queue[idx];if(!q)return;const c=U[q.u].cost;for(const k in c)S[k]+=c[k];
 const keep=idx!==0&&S.queue[0];if(keep)keep._keep=1;S.queue.splice(idx,1);qFix();if(keep)delete keep._keep;
}
function qDelGroup(k){let n=-1,pos=0;for(let i=0;i<S.queue.length;i++){if(i===0||S.queue[i].u!==S.queue[i-1].u)n++;if(n===k)pos=i;else if(n>k)break}
 qRemove(pos);// saca el último de ese grupo
}
function openTroops(){
 let h=`<div class="row3"><button class="btn gold" data-a="cmd">🎖️ Héroes</button><button class="btn gold" data-a="res">🔬 Investigación</button><button class="btn gold" data-a="ars">🧰 Arsenal</button></div><div class="qbox"><div id="qlist"></div></div><p class="small" style="margin-top:0">💪 fuerte contra · 👎 débil contra · ${Object.keys(CN).map(k=>CI[k]+' '+CN[k]).join(' · ')}</p>`,last='';
 for(const u in U){
  if(U[u].hero)continue;
  const d=U[u],bd=B[d.b],sp=speed(u),l=S.ulv[u],need=d.bl||1,ok=sp&&maxB(d.b)>=need;
  if(d.b!==last){last=d.b;h+=`<div class="cat">${bd.e} ${bd.n}</div>`}
  h+=`<div class="trow"><div class="te">${ue(u)}</div><div class="tinfo"><b>${d.n}</b> <span class="tag" ${l>=6?'style="background:linear-gradient(#ffd95c,#d48f10);color:#2b1d0e"':''}>${l>=6?'⭐ Élite '+l:'Nv '+l}</span> <span class="tc">×<span data-tr="${u}">${S.troops[u]}</span></span> <span class="tq" data-tq="${u}"></span><div class="small">${CI[d.cls]} ⚔️${Math.round(d.dmg*ulm(u)*(1+.25*S.tech.atk))} ❤️${Math.round(d.hp*ulm(u))} 🎯${d.rng}${vsTxt(d)}${brTxt(u)}${eqTxt(u)}</div><div class="small">${costHTML(d.cost)}${sp?' · ⏱'+Math.ceil(d.t/sp)+'s':''}${popOf(u)?' · 👥'+popOf(u):''}${ok&&l<5?` · subir a Nv ${l+1}: ${costHTML(ulCost(u))}`:''}</div></div>`;
  h+=ok?`<div class="tbtns"><button class="btn sm" data-a="train" data-v="${u}">+1</button><button class="btn sm gold" data-a="train5" data-v="${u}">+5</button>${l<uMax()?`<button class="btn sm green" data-a="ulv" data-v="${u}">⬆️ Nv${l>=5?' élite':''}</button>`:''}</div>`:`<div class="small lockt">Necesitás ${bd.e} ${bd.n}${need>1?' nivel '+need:''}${S.lvl<bd.lvl?` (jugador nivel ${bd.lvl})`:''}</div>`;
  h+='</div>';
 }
 h+=fusHTML()+heroHTML()+`<button class="btn" data-a="tech" style="margin:0 0 4px">🔧 Mejoras robóticas</button><p class="small">Cada tropa suma ⚔️ poder de ataque y la mitad como 🛡️ defensa mientras está en tu base.</p>`;
 openSheet('troops','🎖️ Tropas',h);
}
function train(u,n){
 const d=U[u],sp=speed(u);if(!sp||maxB(d.b)<(d.bl||1))return;if(d.max&&S.troops[u]+S.queue.filter(q=>q.u===u).length+n>d.max){toast(`Solo podés tener ${d.max} ${d.n}`);return}let k=0;
 const pu=popOf(u);let room=popCap()-popUsed();
 for(;k<n;k++){if(!can(d.cost)||S.queue.length>=40||room<pu)break;room-=pu;pay(d.cost);const last=S.queue.length?S.queue[S.queue.length-1].end:now();S.queue.push({u,end:Math.max(now(),last)+d.t*1000/sp})}
 if(!k)toast(S.queue.length>=40?'La cola está llena':room<pu?`👥 No hay lugar: construí o mejorá casas (o expandí la isla) para más población`:'No te alcanzan los recursos 😕');else if(k<n&&room<pu)toast(`👥 Población llena: entrenaste ${k}`);
 hud();save();if(sheet.kind==='troops'&&$('#qlist')){$('#qlist')._s='';live()}else openTroops();
}
function upUnit(u){
 const d=U[u],l=S.ulv[u];if(l>=uMax()){if(l<7)toast(`🎖️ El nivel ${l+1} de tropas (élite) se desbloquea en el nivel ${l===5?14:18}`);return}
 if(maxB(d.b)<l+1){toast(`Necesitás ${B[d.b].n} nivel ${l+1}`);return}
 if(!can(ulCost(u))){toast('No te alcanza para subir el nivel 😕');return}
 pay(ulCost(u));S.ulv[u]++;toast(`${d.n} subió a nivel ${l+1}`);addXP(30*l);hud();save();branchPick(u);
}
function openAttack(){
 let h=`<p class="small" style="margin-top:0">Tu poder de ataque: <b>⚔️${armyPow(S.troops)}</b>.${S.streak?` 🔥 Racha de ${S.streak}: +${S.streak*10}% de botín.`:''} Dificultad: ${dif().n}. Los rivales también suben de nivel con el tiempo, y cuando les ganás reconstruyen su base más fuerte.</p>`;
 h+='<div class="cat">⚔️ Bases enemigas</div>';
 S.enemies.forEach((e,i)=>{h+=`<div class="erow"><div class="ef">${e.f}</div><div class="einfo"><b>${e.n}</b> <span class="tag">Nv ${e.lvl}</span><div class="small">🛡️${eDef(e)} · Botín ${costPlain(eLoot(e))} · ${12*e.lvl}⭐</div></div><button class="btn sm" data-a="visit" data-v="${i}" title="Visitar su base">👁️</button><button class="btn sm red" data-a="enemy" data-v="${i}">Atacar</button></div>`});
 const tb=S.atab||'riv',kw=krState(),dot=s=>s?' <i class="tdot"></i>':'';
 const tabs=[['riv','⚔️ Rivales',revOn&&S.rev],['camp','📖 Campaña',RBOSS.some((r,i)=>S.lvl>=r.l&&!(S.rbd||{})[i])],['ev','🎉 Eventos',kw||(S.boss&&S.boss.hp>0)],['conq','🏝️ Conquista',S.exp.length]];
 let c='';
 if(tb==='riv')c=revBtn()+h+playersHTML()+rankHTML();
 else if(tb==='camp')c=`<p class="small" style="margin-top:0">La historia y la campaña: rivales con jefes únicos y premios grandes.</p><button class="btn gold" data-a="storyo">📖 Historia: capítulos con diálogos</button>`+campBtn()+rbHTML();
 else if(tb==='ev')c=`<p class="small" style="margin-top:0">Eventos por tiempo limitado y desafíos.</p>`+krBtn()+bossBtn()+tourBtn()+`<button class="btn red" data-a="tdgo">🗼 Defensa de la torre${S.tdb?' · récord '+S.tdb+' oleadas':''}${now()<(S.tdn||0)?' · en '+ft(S.tdn-now()):''}</button><p class="small">En vivo: entre oleadas ponés muros, minas y torres donde quieras.</p><button class="btn gold" data-a="siege">🏰 Asedio: aguantá oleadas en tu base</button>`;
 else c=`<p class="small" style="margin-top:0">Islas que dan oro, regiones del mundo y tu clan.</p><div class="row2"><button class="btn gold" data-a="world">🌍 Mapa del mundo</button><button class="btn gold" data-a="clan">🛡️ Clan</button></div>`+islListHTML();
 openSheet('attack','⚔️ Atacar',`<div class="atabs">${tabs.map(([k,n,d])=>`<button class="${k===tb?'on':''}" data-a="atab" data-v="${k}">${n}${dot(d)}</button>`).join('')}</div>`+c);
}
/* ---------- preparar el ataque ---------- */
let SEL={};
const seedOf=(k,l)=>[...String(k)].reduce((a,c)=>(a*31+c.charCodeAt(0))|0,l*977+13);
function openSelect(ei,keep){
 const e=target(ei);if(!keep){SEL={};for(const u in U)SEL[u]=S.troops[u]}
 const D=eDef(e),P=armyPow(SEL),sp=e.spec||enemySpec(D,e.lvl,seedOf(ei,e.lvl)),dc={};sp.defs.forEach(d=>dc[d.k]=(dc[d.k]||0)+1);
 let h=`<div class="ihead"><div class="ie">${fortSvg()}</div><div><div class="in">${e.f} ${e.n} <small>Nv ${e.lvl}</small></div><div class="id">Poder 🛡️${D} · Botín ${costPlain(eLoot(e))}</div></div></div>`;
 h+=`<div class="istat"><b>Lo que te espera</b><div class="small">Defensas: ${Object.keys(dc).map(k=>DEFS[k].n+' ×'+dc[k]).join(' · ')||'ninguna'}</div><div class="small">Tropas: ${Object.keys(sp.units).map(k=>CI[U[k].cls]+' '+U[k].n+' ×'+sp.units[k]).join(' · ')||'ninguna'}</div></div><div class="cat" data-nav="0">Elegí tus tropas</div>`;
 let any=false,lastB='';
 if(Object.keys(U).some(u=>S.troops[u]))h+=`<div class="selq"><button class="btn sm" data-a="selq" data-v="all">✅ Todas</button><button class="btn sm" data-a="selq" data-v="half">½ La mitad</button><button class="btn sm" data-a="selq" data-v="none">✖ Ninguna</button></div>`;
 for(const u in U){if(!S.troops[u])continue;any=true;
  {const bk=U[u].fus||U[u].hero?'fus':U[u].b;if(bk!==lastB){lastB=bk;h+=`<div class="cat">${bk==='fus'?'🧬 Especiales':(B[bk]?B[bk].e+' '+B[bk].n:'Otras')}</div>`}}
  h+=`<div class="selrow"><div class="te">${ue(u)}</div><div style="flex:1;min-width:0"><b>${U[u].n}</b><div class="small">${SEL[u]} de ${S.troops[u]}</div></div><button class="btn sm" data-a="sm" data-v="${u}">−</button><button class="btn sm" data-a="sp" data-v="${u}">+</button><button class="btn sm" data-a="sa" data-v="${u}">${SEL[u]===S.troops[u]?'Ninguno':'Todos'}</button></div>`}
 if(!any)h+=`<p>No tenés tropas todavía. Construí un ⛺ Cuartel y entrená soldados.</p><button class="btn" data-a="troops">🎖️ Ir a Tropas</button>`;
 else{
  const r=P/D,[lab,col]=P===0?['—','#999']:r>=1.5?['Fácil 😎','#3f9a2f']:r>=1.1?['Parejo 😬','#f6b51e']:r>=.85?['Arriesgado 😰','#f08a24']:['Muy difícil 😱','#d9452b'];
  {const rc=rations(SEL);if(rc)h+=`<div class="small" style="margin:0 0 6px">🍗 Raciones para este ataque: <b style="color:${S.f<rc?'#c9301a':'inherit'}">${fmt(rc)}</b> de comida (tenés ${fmt(Math.floor(S.f))})</div>`}
  h+=`<div class="istat">Tu poder <b>⚔️${P}</b> contra <b>🛡️${D}</b> → <b style="color:${col}">${lab}</b><div class="meter"><i style="width:${Math.min(100,r/2*100)}%;background:${col}"></i></div><div class="small">El resultado también depende de qué tropas mandás contra qué defensas.</div></div><div class="stickgo"><div class="small">⚔️${fmt(P)} contra 🛡️${fmt(D)} · <b style="color:${col}">${lab}</b></div><div class="row2"><button class="btn red" data-a="golive" ${P?'':'disabled'}>👁️ Batalla en vivo</button><button class="btn" data-a="go" ${P?'':'disabled'}>⚡ Resultado rápido</button></div></div>`;
 }
 if(any&&e.isl!=null&&!S.exp.some(x=>x.i===e.isl))h=`<button class="btn" data-a="exped">⛵ Expedición en tiempo real · ${fh(expDur(e.isl))} · tropas +20% · botín ×1,5</button><p class="small">Las tropas elegidas zarpan ahora y la isla se conquista al llegar. Un rival puede mandar refuerzos mientras tanto.</p>`+h;
 openSheet('select','⚔️ Preparar ataque',h,{ei});
}
