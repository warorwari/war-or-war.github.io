/* ---------- tutorial guiado para quien empieza ---------- */
const tcnt=t=>S.g.filter(b=>b&&b.t===t).length;let TUTB=null;
const TUT=[
 {t:'¡Bienvenido, comandante! Empecemos con una <b>Casa</b> para ganar oro: tocá <b>Construir</b> y elegí <b>Casa</b>.',s:()=>sheet.kind==='build'?'[data-a="build"][data-v="casa"]':'#b-build',ok:()=>PL==='casa'||tcnt('casa')>TUTB.casa},
 {t:'Ahora tocá un lugar libre de tu isla para poner la casa.',s:()=>null,ok:()=>tcnt('casa')>TUTB.casa},
 {t:'Para tener un ejército necesitás un <b>Cuartel</b>. Construir → Cuartel.',s:()=>sheet.kind==='build'?'[data-a="build"][data-v="cuartel"]':PL?null:'#b-build',ok:()=>tcnt('cuartel')>TUTB.cuartel},
 {t:'Los edificios producen solos. Tocá <b>Cobrar</b> para juntar todo de una vez.',s:()=>'#b-col',ok:()=>TUTB.col},
 {t:'¡Entrená soldados! Tocá <b>Tropas</b> y después <b>+5</b> en Soldado.',s:()=>sheet.kind==='troops'?'[data-a="train5"][data-v="soldado"]':'#b-troops',ok:()=>S.queue.some(q=>q.u==='soldado')||S.troops.soldado>TUTB.sold},
 {t:'¡Hora de atacar! Tocá <b>Atacar</b> y elegí un rival de la lista.',s:()=>sheet.kind==='attack'?'[data-a="enemy"]':'#b-atk',ok:()=>sheet.kind==='select'||!!BT||S.stats.won>TUTB.won},
 {t:'Elegí tus tropas (o <b>✅ Todas</b>) y tocá <b>👁️ Batalla en vivo</b>.',s:()=>sheet.kind==='select'?'[data-a="golive"]':null,ok:()=>!!BT||S.stats.won>TUTB.won},
 {t:'Elegí una tropa abajo y <b>tocá la zona verde</b> para soltarla. Podés soltarlas de a poco, donde quieras.',s:()=>BT&&BT.dep&&!BT.go?'#btdep .dpc':null,ok:()=>!BT||!!BT.go||S.stats.won>TUTB.won,bt:1},
 {t:'¡Muy bien! Tocá un edificio para mejorarlo. En <b>Atacar</b> tenés pestañas con campaña, eventos (Kraken, defensa de la torre) e islas, y en <b>Menú</b> tu perfil y los ajustes. Te ganaste 💰1.000.',s:()=>null,ok:()=>false,last:1}];
function tutTick(){
 const st=S.tut,bx=$('#tutb'),ar=$('#tuta');if(st==null||st>=TUT.length||!bx){if(bx)bx.classList.remove('on');if(ar)ar.classList.remove('on');return}
 if(!TUTB)TUTB={casa:tcnt('casa'),cuartel:tcnt('cuartel'),col:0,sold:S.troops.soldado||0,won:S.stats.won};
 const T=TUT[st];if(T.ok()){S.tut++;TUTB=null;sfx('done');save();return}
 const hide=modalOpen&&!BT,inb=!!BT&&!!T.bt;bx.classList.toggle('on',!hide&&(!BT||inb));bx.classList.toggle('top',inb);if(bx._s!==st){bx._s=st;bx.innerHTML=`<div class="tutn">${st+1}/${TUT.length}</div><div class="tutt">${T.t}</div><button data-tut="${T.last?'end':'skip'}">${T.last?'¡Listo!':'Saltar'}</button>`}
 const sel=!hide&&(!BT||inb)&&T.s(),el=sel&&[...document.querySelectorAll(sel)].find(e=>e.offsetParent);
 if(!el){ar.classList.remove('on');return}
 if(el.closest('#shbody')&&ar._el!==el){ar._el=el;el.scrollIntoView({block:'center',behavior:'smooth'})}
 const r=el.getBoundingClientRect();ar.style.left=(r.left+r.width/2)+'px';ar.style.top=(r.top-6)+'px';ar.classList.add('on');
}
document.addEventListener('click',e=>{const t=e.target.closest('[data-tut]');if(t){if(t.dataset.tut==='end'){S.c+=1000;hud();toast('💰 +1.000 · ¡A conquistar!')}S.tut=99;save();tutTick();return}if(e.target.closest('#b-col')&&TUTB)TUTB.col=1},true);
setInterval(tutTick,300);

/* ---------- pantalla de carga ---------- */
(()=>{const L=$('#load');if(!L)return;{const g=$('#loadlogo');if(g)g.innerHTML=LOGO(150,GAMEN);const t=L.querySelector('.lg');if(t)t.style.display='none'}const bar=$('#loadi'),tx=$('#loadt'),t0=performance.now();bar.style.animation='none';bar.style.width='82%';tx.textContent='Preparando tus tropas…';
 const fin=()=>{bar.style.width='100%';tx.textContent='¡Listo!';setTimeout(()=>{L.classList.add('off');setTimeout(()=>L.remove(),450)},220)};
 const wait=()=>{const el=performance.now()-t0;if((!RQ.length&&!rcN&&el>500)||el>2600)fin();else{bar.style.width=Math.min(97,82+el/2600*15)+'%';setTimeout(wait,120)}};
 (document.fonts&&document.fonts.ready?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1500))]):Promise.resolve()).then(()=>setTimeout(wait,60))})();
const cosFor=i=>{const l=[];for(const k in COS)for(const o of COS[k].L)if(o[2]===i)l.push(o[0]+' ('+COS[k].n.split(' ').slice(1).join(' ').toLowerCase()+')');return l.length?' · 🎨 '+l.join(', '):''};
/* ---------- perfil del jugador ---------- */
const AVS=[['🎖️',1],['😎',1],['🤠',1],['🦅',1],['🐺',3],['🦁',5],['🦈',7],['🤖',9],['🐉',11],['🚀',13],['👑',16],['💀',18],['🔥',20],['🎖️','a2'],['🧠','a10'],['🐙','kr']];
const avOk=r=>typeof r==='number'?S.lvl>=r:r==='kr'?!!S.cosU.kr:!!S.ach[+r.slice(1)];
const avReq=r=>typeof r==='number'?'Nivel '+r:r==='kr'?'Kraken derrotado':'Logro: '+ACH[+r.slice(1)][0];
const RANKS=[[1,'Recluta'],[4,'Cabo'],[7,'Sargento'],[10,'Teniente'],[13,'Capitán'],[16,'Mayor'],[19,'Coronel'],[23,'General'],[28,'Mariscal']];
const rankOf=l=>{let r=RANKS[0][1];for(const[x,n]of RANKS)if(l>=x)r=n;return r};
const myName=()=>S.prof.n||'Vos',myTag=()=>esc((S.prof.av||'⭐')+' '+myName());
const nameCost=()=>S.prof.ch?2000*S.lvl:0;
function nameErr(n){if(n.length<3)return'Tiene que tener al menos 3 letras';if(n.length>16)return'Máximo 16 caracteres';if(!/^[\p{L}\p{N} _.\-]+$/u.test(n))return'Solo letras, números, espacios, punto, guion y guion bajo';if(!/[\p{L}\p{N}]/u.test(n))return'Tiene que tener alguna letra o número';return''}
function openProf(){const P=S.prof,f=cosCur('frame')[1],own=S.isl.filter(s=>s.o<0).length,blds=S.g.filter(b=>b).length,ach=Object.values(S.ach).filter(Boolean).length,st=S.stats,c=nameCost();
 let h=`<div class="pfh"><div class="pfa" style="box-shadow:${f||'0 0 0 3px #ffffff55'}">${P.av||'⭐'}</div><div><b>${esc(myName())}</b><div class="pfr">🎖️ ${rankOf(S.lvl)} · Nivel ${S.lvl}</div>${P.mo?`<div class="pfm">“${esc(P.mo)}”</div>`:''}</div></div>`;
 h+=`<div class="cat">✏️ Nombre</div><div class="pfe"><input id="pfn" maxlength="16" value="${esc(P.n||'')}" placeholder="Tu nombre de comandante" autocomplete="off"><button class="btn gold" data-a="pfname">${c?'💰'+fmt(c):'Guardar'}</button></div><p class="small" style="margin:4px 0 0">${c?'Cambiar el nombre cuesta oro: la primera vez fue gratis.':'La primera vez es gratis.'} Lo ven los demás jugadores.</p>`;
 h+=`<div class="cat">💬 Lema</div><div class="pfe"><input id="pfm" maxlength="40" value="${esc(P.mo||'')}" placeholder="Una frase para tu perfil" autocomplete="off"><button class="btn" data-a="pfmotto">Guardar</button></div>`;
 h+='<div class="cat">😀 Avatar</div><div class="pfav">';AVS.forEach(([e,r],i)=>{const ok=avOk(r);h+=`<div class="pav ${P.av===e?'on':''} ${ok?'':'lock'}" ${ok?`data-a="pfav" data-v="${i}"`:''} title="${ok?'':avReq(r)}">${e}${ok?'':`<small>🔒 ${avReq(r)}</small>`}</div>`});h+='</div>';
 h+=`<div class="cat">📊 Estadísticas</div><div class="pfs">${[['⚡','Poder',fmt(defense()+armyPow(S.troops))],['🏆','Victorias',fmt(st.won)],['💔','Derrotas',fmt(st.lost||0)],['🛡️','Defensas ganadas',fmt(st.def||0)],['🎖️','Tropas entrenadas',fmt(st.trained||0)],['🏗️','Edificios',blds],['🏝️','Islas tuyas',own+' de '+ISL.length],['🏅','Logros',ach+' de '+ACH.length],['🐙','Ataques al Kraken',st.krk||0],['📅','Comandante desde',new Date(P.since||now()).toLocaleDateString('es-AR')]].map(([i,n,v])=>`<div><span>${i}</span><b>${v}</b><small>${n}</small></div>`).join('')}</div>`;
 h+=nextHTML(S.lvl,5);h+=`<button class="btn" data-a="pfcos" style="margin-top:12px">🎨 Bandera, marco y aspecto de edificios</button>`;
 openSheet('prof','👤 Perfil',h)}
function pfName(){const el=$('#pfn');if(!el)return;const n=el.value.replace(/\s+/g,' ').trim(),e=nameErr(n);if(e){toast('✏️ '+e);return}if(n===S.prof.n){toast('Ese ya es tu nombre');return}
 const c=nameCost();if(S.c<c){toast('💰 Te falta oro para cambiar el nombre');return}
 const go=()=>{S.c-=c;S.prof.n=n;S.prof.ch=(S.prof.ch||0)+1;pPrev='';save();hud();sfx('done');toast('✏️ Ahora te llamás '+n);openProf()};
 if(c)modal(`<div class="mtitle">¿Cambiar el nombre?</div><p>Vas a pasar a llamarte <b>${esc(n)}</b>.</p><p class="small">Cuesta 💰${fmt(c)}.</p>`,[['Cambiar',go,'gold'],['Cancelar']]);else go()}
function pfMotto(){const el=$('#pfm');if(!el)return;const m=el.value.replace(/\s+/g,' ').trim().slice(0,40);S.prof.mo=m;pPrev='';save();toast(m?'💬 Lema guardado':'💬 Lema borrado');openProf()}
function help(){
 modal(`<div class="mtitle">¡Bienvenido, comandante!</div><div class="big">${fortSvg()}</div><ol class="help">
 <li>Tocá los edificios con burbuja <b>💰 🍗 🛢️</b> para cobrar.</li>
 <li>Con <b>🔨 Construir</b> armá casas, granjas y pozos para tener más recursos.</li>
 <li>Construí un <b>⛺ Cuartel</b> y entrená tropas en <b>🎖️ Tropas</b>.</li>
 <li>En <b>⚔️ Atacar</b> invadí bases enemigas para ganar botín y experiencia ⭐. Podés ver la batalla en vivo.</li>
 <li>Cada tropa es fuerte contra unas y débil contra otras: mirá las defensas del rival antes de atacar.</li>
 <li>Desde nivel 2 los enemigos te atacan: torres 🗼 y tropas te defienden.</li>
 <li>Seguí las <b>📜 Misiones</b> para ganar premios.</li>
 <li>Conquistá las <b>🏝️ islas</b> del mar: cada una te da oro por minuto.</li>
 <li>Zoom con la ruedita del mouse; arrastrá el mapa para moverte.</li>
 <li>Cada tanto hay mini eventos: cajas 🎁, piratas 🏴‍☠️ y OVNIs 🛸. Tocalos rápido.</li></ol><p class="small">Tu partida se guarda en este navegador.</p>`,[['¡A jugar!','','gold']]);
}
openArs=navW(openArs);openAttack=navW(openAttack);openBuild=navW(openBuild);openCamp=navW(openCamp);openClan=navW(openClan);openCmd=navW(openCmd);openCol=navW(openCol);openFusion=navW(openFusion);openInfo=navW(openInfo);openIslands=navW(openIslands);openMis=navW(openMis);openRes=navW(openRes);openSelect=navW(openSelect);openShop=navW(openShop);openSiege=navW(openSiege);openStory=navW(openStory);openTech=navW(openTech);openTroops=navW(openTroops);openWheel=navW(openWheel);openWorld=navW(openWorld);
const navNew=f=>()=>{if(sheet.kind)SCR[sheet.kind]={y:$('#shbody').scrollTop,t:Date.now()};sheet={kind:null};NAV=[];CUR=null;f()};$('#b-build').onclick=navNew(openBuild);$('#b-col').onclick=collectAll;$('#b-troops').onclick=navNew(openTroops);$('#b-atk').onclick=navNew(openAttack);$('#b-mis').onclick=navNew(openMis);
$('#b-menu').onclick=navNew(openMenu);
$('#btctl').onclick=e=>{const t=e.target.closest('button'),b=BT;if(!t||!b||b.done)return;
 if(b.visit){if(t.id==='btskip'){$('#bt').classList.remove('on');BT=null;modalOpen=false;openAttack()}return}
 if(t.id==='btskip'){if(b.pvp)pvSeed(b,()=>{while(!b.over&&b.pvg++<20000)stepBattle(b,.05)});else while(!b.over)stepBattle(b,.05);return}
 b.speed=+t.dataset.sp;document.querySelectorAll('#btctl [data-sp]').forEach(x=>x.classList.toggle('on',x===t))};
$('#zin').onclick=()=>zoomTo(zT*1.3);
$('#zout').onclick=()=>zoomTo(zT/1.3);
window.addEventListener('resize',layout);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(NAV.length&&sheet.kind){goBack();return}PL=null;MV=null;setMode();closeSheet()}});

layout();hud();requestAnimationFrame(frame);
if(!S.help){S.help=1;save();help()}
cosApply();document.documentElement.classList.toggle('eco',!!S.eco);document.documentElement.classList.toggle('bigtxt',!!S.big);
applyRS();sndBtn();offlineCheck();dmCheck();dailyCheck();cloudInit();chestRender(1);
setInterval(()=>{if(!modalOpen&&!BT)dailyCheck();achCheck();tourTick();bossTick();rsTick();clanTick();dmCheck();seasonCheck();colTrack();albTrack();cloudSave();pubSave();krTick()},3000);
setInterval(tick,250);setInterval(save,5000);
window.addEventListener('pagehide',save);
})();
