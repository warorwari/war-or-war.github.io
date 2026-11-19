/* ---------- sonido: todo sintetizado, sin archivos ---------- */
let BUS=null,AC=null,MG=null,FXG=null,MUG=null,TO=null,NB=null,musT=0,musN=0;const sfxAt={};
function audioOn(){const C=window.AudioContext||window.webkitAudioContext;if(AC||!C)return;try{AC=new C();MG=AC.createGain();MG.gain.value=.6;MG.connect(AC.destination);FXG=AC.createGain();FXG.connect(MG);MUG=AC.createGain();MUG.connect(MG);BUS=AC.createDynamicsCompressor();BUS.threshold.value=-20;BUS.knee.value=12;BUS.ratio.value=5;BUS.attack.value=.003;BUS.release.value=.18;BUS.connect(FXG);audioVol();sndInit()}catch(e){AC=null}}
const audioWake=()=>{audioOn();if(AC&&AC.state!=='running')AC.resume().catch(()=>{})};['pointerdown','touchstart','keydown'].forEach(ev=>document.addEventListener(ev,audioWake,{capture:true,passive:true}));document.addEventListener('visibilitychange',()=>{if(!document.hidden&&AC&&AC.state!=='running')AC.resume().catch(()=>{})});
function tone(f,d,type,v,t0,f2){const t=AC.currentTime+(t0||0),o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0008,t+d);o.connect(g);g.connect(TO||FXG||MG);o.start(t);o.stop(t+d+.03)}
function noise(d,v,fq,t0){
 if(!NB){NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const a=NB.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 const t=AC.currentTime+(t0||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;f.type='lowpass';f.frequency.value=fq;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(f);f.connect(g);g.connect(TO||FXG||MG);s.start(t,Math.random()*.5);s.stop(t+d+.03);
}
function nz(d,v,ty,fq,q,t0){if(!NB)noise(.001,.0001,100);const t=AC.currentTime+(t0||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;s.playbackRate.value=.85+Math.random()*.3;f.type=ty;f.frequency.value=fq*(.9+Math.random()*.2);if(q)f.Q.value=q;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(f);f.connect(g);g.connect(TO||FXG||MG);s.start(t,Math.random()*.5);s.stop(t+d+.03)}
const SFX={
 coin:()=>{tone(988,.07,'square',.06);tone(1319,.13,'square',.06,.06)},
 build:()=>{tone(150,.14,'triangle',.3,0,70);noise(.09,.12,700)},
 done:()=>[523,659,784].forEach((f,i)=>tone(f,.15,'triangle',.14,i*.09)),
 click:()=>tone(620,.035,'square',.03),
 shot:()=>{nz(.07,.5,'bandpass',1700,.9);nz(.13,.32,'lowpass',420);tone(150+Math.random()*40,.07,'sine',.28,0,55)},
 boom:()=>{nz(.15,.45,'bandpass',2300,.7);nz(.95,.85,'lowpass',520);tone(105,.65,'sine',.85,0,34);nz(1.4,.18,'lowpass',160,0,.1)},
 zap:()=>{tone(1900,.15,'sawtooth',.16,0,220);tone(950,.15,'square',.07,0,160);nz(.06,.2,'highpass',4000)},
 lvl:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.2,'square',.07,i*.1)),
 win:()=>[523,659,784,1047,1319].forEach((f,i)=>tone(f,.26,'triangle',.16,i*.12)),
 lose:()=>[392,330,262,196].forEach((f,i)=>tone(f,.32,'sawtooth',.07,i*.17)),
 thunder:()=>{nz(2.6,.7,'lowpass',180);nz(.5,.45,'lowpass',900,0,.05);tone(55,2,'sine',.5,0,28)},
 dep:()=>{nz(.18,.4,'lowpass',260);tone(90,.15,'sine',.4,0,50)},
 horn:()=>{tone(220,.6,'sawtooth',.09,0,0);tone(330,.6,'sawtooth',.06,.02);tone(440,.45,'sawtooth',.05,.3)},
 alert:()=>[880,660,880].forEach((f,i)=>tone(f,.11,'square',.07,i*.14)),
 fire:()=>{nz(.45,.42,'bandpass',850,.5);nz(.3,.2,'lowpass',300)},
 emp:()=>{tone(1100,.35,'sawtooth',.14,0,110);tone(2200,.1,'square',.06);nz(.3,.25,'bandpass',3000,2)},
 cannon:()=>{nz(.09,.55,'highpass',2800);nz(.85,.8,'lowpass',300);tone(78,.75,'sine',.95,0,30)},
 roar:()=>{tone(170,.8,'sawtooth',.2,0,65);tone(240,.65,'square',.07,.05,90);nz(.7,.3,'lowpass',520)},
};
const BK={thunder:1,shot:1,boom:1,zap:1,fire:1,emp:1,cannon:1,roar:1,dep:1};
const GAP={coin:70,shot:45,dep:60,boom:120,zap:90,click:40,fire:110,emp:300,cannon:220,roar:1600};
function sfx(k){if(!AC||S.mute)return;if(AC.state!=='running'){AC.resume().catch(()=>{});return}{const m=SMAP[k];if(m&&(k!=='coin'||performance.now()-(sfxAt.__c||0)>140)){if(k==='coin')sfxAt.__c=performance.now();if(playS(m[0],m[1])&&k!=='win')return}}if(k==='boom')vib(25);else if(k==='lvl')vib([40,40,80]);const t=performance.now();if(t-(sfxAt[k]||0)<(GAP[k]||0))return;sfxAt[k]=t;const pt=TO;if(BK[k]&&BUS)TO=BUS;try{SFX[k]()}catch(e){}TO=pt}
function shotSnd(a){const u=U[a.kind]||{},k=a.kind;sfx(k==='llamas'||k==='llamat'||k==='infierno'?'fire':u.emp?'emp':u.kam?'boom':k==='kraken'||(u.drg&&Math.random()<.15)?'roar':u.nav||k==='arti'||k==='costa'?'cannon':k==='laser'||k==='tesla'?'zap':a.cls==='veh'||a.cls==='mec'||k==='mortero'||k==='bazuca'||u.drg?'boom':'shot')}
/* Música: un arpegio suave que se programa un poco por adelantado */
const CH=[[220,262,330],[175,220,262],[196,247,294],[165,208,247]];
/* Dos músicas: la del mapa (tranquila, con olas de fondo) y la de batalla (más rápida, con percusión) */
const CHB=[[220,262,330],[196,233,294],[175,208,262],[196,247,294]];let musB=-1;
function swell(t0){if(!NB){NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const a=NB.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 const t=AC.currentTime+t0,s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;s.loop=true;f.type='lowpass';f.frequency.value=480;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.05,t+1.2);g.gain.linearRampToValueAtTime(.0001,t+3.2);s.connect(f);f.connect(g);g.connect(TO||FXG||MG);s.start(t);s.stop(t+3.3)}
function music(){
 if(!AC||S.mute||S.nomus||AC.state!=='running'){musT=0;return}
 const bt=BT&&!BT.visit?1:0;if(bt!==musB){musB=bt;musN=0;musT=AC.currentTime+.05}
 if(musT<AC.currentTime)musT=AC.currentTime+.05;
 TO=MUG;try{if(bt){while(musT<AC.currentTime+.5){const ch=CHB[(musN>>4)%4],st=musN%16,d=musT-AC.currentTime;
   tone(ch[0]/2*(st%8<4?1:1.5),.2,'sawtooth',.022,d);if(st%4===0)tone(110,.2,'sine',.14,d,42);if(st%8===4)noise(.12,.06,1800,d);if(st%2)noise(.03,.02,6000,d);if(st%4===2)tone(ch[(st>>2)%3]*2,.16,'square',.018,d);musT+=.16;musN++}}
 else while(musT<AC.currentTime+.6){const ch=CH[(musN>>3)%4],st=musN%8,d=musT-AC.currentTime;tone(ch[[0,1,2,1,0,2,1,2][st]]*(st>3?2:1),.5,'triangle',.035,d);if(!st)tone(ch[0]/2,1.8,'sine',.07,d);if(musN%24===0)swell(d);musT+=.3;musN++}}finally{TO=null}
}
setInterval(music,200);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('button,.card,.tb'))sfx('click')},true);
const sndBtn=()=>{$('#bsnd').textContent=S.mute?'🔇':'🔊'};
$('#lvlbox').onclick=()=>{sheet={kind:null};NAV=[];CUR=null;openProf()};
$('#bisl').onclick=()=>{sheet={kind:null};NAV=[];CUR=null;openIslands()};
$('#bsnd').onclick=()=>{S.mute=!S.mute;sndBtn();save()};
/* ---------- ataques a tu base: la misma simulación, con tus defensas y la mitad de tus tropas ---------- */
const RK=1;
function raidArmy(D,lvl){
 const up=['soldado'];if(lvl>=2)up.push('marine');if(lvl>=3)up.push('tanque');if(lvl>=4)up.push('bazuca','franco');if(lvl>=6)up.push('pesado','helicoptero');if(lvl>=7)up.push('caza');if(lvl>=8)up.push('misil','robot');if(lvl>=10)up.push('bombardero');if(lvl>=12)up.push('dragon');
 const a={};let b=D,g=0;while(b>=8&&g++<60){const ok=up.filter(k=>U[k].atk<=b);if(!ok.length)break;const k=ok[Math.floor(Math.random()*ok.length)];a[k]=(a[k]||0)+1;b-=U[k].atk}
 return a;
}
function mySpec(noDefs){
 const slots=[[5,3],[3,4],[7,4],[2,6],[8,6],[5,6],[4,2],[6,2],[1,4],[9,4]],all=[],units={},um={};
 let nmu=0;if(!noDefs)for(const b of S.g)if(b&&DEFS[b.t]&&done(b)){if(b.t==='muro')nmu++;else all.push(b)}
 const defs=all.sort((a,b)=>DEFS[b.t].r*LM[b.l]-DEFS[a.t].r*LM[a.l]).slice(0,10).map((b,i)=>({k:b.t,c:slots[i][0],r:slots[i][1],m:1+.3*(b.l-1)}));
 for(const u in U){const n=U[u].nav?0:Math.min(10,S.troops[u]>>1);if(n){units[u]=n;um[u]=[ulm(u),ulm(u)*(1+.25*S.tech.atk)]}}
 return{defs,units,um,k:1,hq:500+220*S.lvl,hqd:8+2*S.lvl,walls:Math.min(22,nmu),map:'normal',seed:7};
}
function raid(){
 const e=S.enemies[Math.floor(Math.random()*S.enemies.length)],pw=Math.round((22*Math.pow(S.lvl,1.5)+15)*(.6+Math.random()*.7)*dif().k);
 S.nextRaid=now()+(4+Math.random()*4)*60000*dif().sp;
 const own=S.isl.map((x,i)=>x.o<0?i:-1).filter(i=>i>=0),isl=own.length&&Math.random()<.4?own[Math.floor(Math.random()*own.length)]:-1;
 const army=raidArmy(pw,S.lvl),mul={};for(const k in army)mul[k]=[RK,RK];
 const b=mkBattle(army,mySpec(isl>=0),mul);b.raid=1;b.e=e;b.isl=isl;b.army=army;
 sfx('alert');
 const go=live=>()=>setTimeout(()=>{b.live=live;runBattle(b,`🛡️ ${e.f} ${e.n} ataca ${isl>=0?ISL[isl].n:'tu base'}`)},0);
 modal(`<div class="mtitle">🚨 ¡${isl>=0?'Atacan tu isla':'Te atacan'}!</div><div class="big">${e.f}</div><p><b>${e.n}</b> viene por ${isl>=0?'<b>'+ISL[isl].n+'</b>':'tu base'} con:</p><p>${Object.keys(army).map(k=>ue(k)+'×'+army[k]).join(' ')}</p><p class="small">${isl>=0?'La isla la defiende la mitad de tus tropas.':'Te defienden tus torres y la mitad de tus tropas.'}</p>`,[['👁️ Ver la defensa en vivo',go(1),'gold'],['⚡ Resultado rápido',go(0)]]);
 save();
}
function raidEnd(b){
 const e=b.e,isl=b.isl,ok=b.over===2,close=fn=>()=>{$('#bt').classList.remove('on');BT=null;fn&&fn();hud()};let html,btns;sfx(ok?'win':'lose');
 if(ok){const x=10*S.lvl,r={c:25*S.lvl};gain(r);S.stats.def++;S.trof=(S.trof||0)+Math.round(8*(1+(RS().trof||0)));html=`<div class="win">¡DEFENDIDO!</div><p>Frenaste el ataque de <b>${e.n}</b>.</p><p>Recompensa: ${costPlain(r)} · +${x}⭐</p>`;btns=[['¡Bien ahí!',close(()=>addXP(x)),'gold']]}
 else if(isl>=0){S.isl[isl].o=S.enemies.indexOf(e);revSet(e);html=`<div class="lose">ISLA PERDIDA</div><p><b>${e.n}</b> se quedó con <b>${ISL[isl].n}</b>.</p><p class="small">Dejá más tropas en casa (la mitad defiende) y reconquistala.</p>`;btns=[['¡Voy por ella!',close(),'red']]}
 else{revSet(e);const lc=Math.floor(S.c*.15*(1-(RS().vault||0))),lf=Math.floor(S.f*.1);S.c-=lc;S.f-=lf;html=`<div class="lose">TE SAQUEARON</div><p><b>${e.n}</b> destruyó tu centro de mando y se llevó <b>${RES.c}${lc}</b> y <b>${RES.f}${lf}</b>.</p><p class="small">Sumá defensas variadas: cada una frena a un tipo de tropa.</p>`;btns=[['¡Me las va a pagar!',close(),'red']]}
 hud();save();
 if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns);
}
/* ---------- campaña ---------- */
const unitsTxt=u=>Object.keys(u).map(k=>u[k]+' '+U[k].n).join(', ');
const campBtn=()=>`<button class="btn gold" data-a="campmap" style="margin:0 0 10px">🗺️ Campaña · ${S.camp>=CAMP.length?'completa 🏆':'misión '+(S.camp+1)+' de '+CAMP.length}</button>`;
function openCamp(){
 const xy=i=>{const r=i/4|0,c=i%4;return[48+(r%2?3-c:c)*101,50+r*76]};
 let path='',nodes='';
 CAMP.forEach((c,i)=>{const[x,y]=xy(i),st=i<S.camp?'done':i===S.camp?'cur':'lock';path+=(i?'L':'M')+x+','+y;
  nodes+=`<g class="cn ${st}" data-a="camp" data-v="${i}"><circle cx="${x}" cy="${y}" r="${c.boss?21:15}"/><text x="${x}" y="${y+5}" text-anchor="middle">${st==='done'?'✓':c.boss?'★':i+1}</text></g>`});
 let h=`<svg class="cmap" viewBox="0 0 400 400"><rect width="400" height="400" fill="#e9d9a8"/><path d="M0,0H150Q120,60 60,70T0,120Z" fill="#7cc8ee"/><path d="M400,400H250Q290,330 340,320T400,270Z" fill="#7cc8ee"/><g fill="#9cc76a"><ellipse cx="200" cy="88" rx="46" ry="14"/><ellipse cx="96" cy="240" rx="50" ry="15"/><ellipse cx="300" cy="164" rx="44" ry="13"/><ellipse cx="170" cy="318" rx="56" ry="15"/></g><g fill="#b59a72"><polygon points="330,60 350,22 370,60"/><polygon points="354,62 372,32 390,62"/><polygon points="20,330 42,290 64,330"/></g><path d="${path}" fill="none" stroke="#8a5a2b" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round" stroke-linejoin="round"/>${nodes}</svg>`;
 const i=S.camp,c=CAMP[i];
 h+=c?`<div class="mcard" style="margin-top:10px"><div class="mnum">${c.boss?'★ JEFE · ':''}MISIÓN ${i+1} DE ${CAMP.length}</div><div class="mt">${c.f} ${c.n}</div><div class="small">Poder 🛡️${c.d} · Botín ${costPlain(c.loot)}${c.boss?'<br>Al caer se te unen '+unitsTxt(c.boss.u):''}</div><button class="btn red" data-a="enemy" data-v="c${i}">⚔️ Preparar ataque</button></div>`:`<div class="done">🏆 ¡Campaña completa! Sos el Conquistador.</div>`;
 openSheet('camp','🗺️ Campaña',h);
}
function tapCamp(i){if(i<S.camp)toast(`Ya conquistaste ${CAMP[i].n} ✓`);else if(i>S.camp)toast(`Primero conquistá ${CAMP[S.camp].n}`);else openSelect('c'+i)}
/* ---------- logros y recompensa diaria ---------- */
const ACH=[
 ['Primera victoria','⚔️','Ganá una batalla',()=>S.stats.won>=1,200],['Veterano','🎖️','Ganá 25 batallas',()=>S.stats.won>=25,2000],['Leyenda','👑','Ganá 100 batallas',()=>S.stats.won>=100,10000],
 ['Muralla','🛡️','Defendé 10 ataques',()=>S.stats.def>=10,2000],['Magnate','💰','Juntá 50.000 de oro',()=>S.c>=50000,3000],['Arquitecto','🏗️','Tené 20 edificios',()=>S.g.filter(b=>b&&!B[b.t].deco).length>=20,1500],
 ['Perfeccionista','⭐','Un edificio a nivel 7',()=>S.g.some(b=>b&&b.l>=7),5000],['Dueño del mar','🏝️','Tené las 6 islas',()=>S.isl.every(x=>x.o<0),8000],['Cazapiratas','🏴‍☠️','Hundí 5 barcos pirata',()=>(S.stats.pir||0)>=5,2500],
 ['Tropa de élite','🎖️','Una tropa a nivel 5',()=>Object.values(S.ulv).some(l=>l>=5),4000],['Domador','🐉','Fabricá un dragón',()=>(S.stats.byU.dragon||0)>=1,5000],['Terrateniente','🗺️','Isla de 16×16',()=>N>=16,6000],
 ['Jefe caído','🚩','Vencé al primer jefe',()=>S.camp>=5,1500],['Conquistador','🏆','Completá la campaña',()=>S.camp>=CAMP.length,20000],['Constante','📅','Entrá 7 días seguidos',()=>S.daily.n>=7,3000],['Campeón','🏆','Ganá un mini torneo',()=>(S.stats.tw||0)>=1,3000],['Comandante','🎖️','Reclutá un héroe',()=>Object.keys(S.cmd).length>=1,3000],['Conquistador del mundo','🌍','Conquistá las 12 regiones',()=>WR.every((r,i)=>i===0||S.wr[i]),25000],['Muralla viviente','🏰','Aguantá 10 oleadas de asedio',()=>(S.sg.best||0)>=10,8000],['Fin de la historia','📖','Terminá la historia',()=>S.story>=STO.length,15000],['Científico','🔬','Completá una rama de investigación',()=>Object.values(S.rs).some(a=>a.length>=5),10000],['Armero','🧰','Conseguí una pieza legendaria',()=>S.inv.some(i=>i.r===3),5000],['Matagigantes','👹','Derrotá a un jefe mundial',()=>(S.stats.boss||0)>=1,8000],['Alquimista','🧬','Fusioná 5 veces',()=>(S.stats.fus||0)>=5,2000],
];
function achCheck(){if(modalOpen||BT)return;ACH.forEach((a,i)=>{if(!S.ach[i]&&a[3]()){S.ach[i]=1;S.c+=a[4];toast(`🏅 Logro: ${a[0]} · +💰${fmt(a[4])}`);{const cf=cosFor(i);if(cf)setTimeout(()=>toast('🎨 Desbloqueaste'+cf.replace(' · 🎨',':')),1600)}sfx('done');save()}})}
const achHTML=()=>`<div class="cat">🏅 Logros · ${Object.keys(S.ach).length} de ${ACH.length}</div><div class="achs">${ACH.map((a,i)=>`<div class="${S.ach[i]?'got':''}"><span>${a[1]}</span><b>${a[0]}</b><small>${a[2]} · 💰${fmt(a[4])}${cosFor(i)}</small></div>`).join('')}</div>`;
const dayStr=t=>{const d=new Date(t);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
let dAsk='';
function dailyCheck(){
 const t=dayStr(now());if(S.daily.d===t||dAsk===t)return;dAsk=t;
 const D=S.daily,y1=dayStr(now()-864e5),y2=dayStr(now()-2*864e5),gr=D.gr==null?1:D.gr;let n,tot,used=0,lost=0;
 if(D.d===y1){n=D.n%7+1;tot=(D.tot||D.n||0)+1}else if(D.d===y2&&gr>0){n=D.n%7+1;tot=(D.tot||D.n||0)+1;used=1}else{n=1;tot=1;lost=(D.tot||0)>1}
 const L=S.lvl,bonus=1+Math.min(.5,(tot-1)*.02),r=mult({c:(100+60*L)*n,f:(30+15*L)*n},bonus);if(L>=2)r.o=Math.round(20*L*n*bonus);if(L>=3)r.s=Math.round(12*L*n*bonus);if(L>=4)r.e=Math.round(8*L*n*bonus);
 const ngr=n===7?1:gr-used,best=Math.max(D.best||0,tot);
 modal(`<div class="mtitle">🎁 Recompensa diaria</div><div class="streak">🔥 <b>${tot}</b> ${tot===1?'día':'días seguidos'}${best>tot?` · récord ${best}`:''}</div><div class="days">${[1,2,3,4,5,6,7].map(k=>`<i class="${k<n?'past':k===n?'now':''}">${k===7?'🏆':k}</i>`).join('')}</div>
  ${used?'<p class="small">🛟 Ayer no entraste, pero tu <b>comodín</b> salvó la racha.</p>':''}${lost?'<p class="small">La racha se cortó: faltaste más de un día sin comodín.</p>':''}
  <p>Día <b>${n}</b> de 7${tot>1?` · bonus de racha <b>+${Math.round((bonus-1)*100)}%</b>`:''}</p><p><b>${costPlain(r)}</b>${n===7?'<br>🧰 + una pieza de equipo':''}</p>
  <p class="small">🛟 Comodines: ${ngr} — si un día no entrás, salvan tu racha. Se recupera al completar la semana.</p>`,
  [['¡Cobrar!',()=>{S.daily={d:t,n,tot,gr:ngr,best};gain(r);if(n===7)giveItem(2);sfx('coin');hud();save()},'gold']]);
}
/* ---------- guardado en la nube (solo cuando la página corre dentro de Claude) ----------
   La partida viaja como texto en un documento privado de cada persona. Si no hay nube, queda todo en el navegador. */
let cdoc=null,cPrev='',cBusy=0,cAt=0,cState='local';
const stripped=()=>JSON.stringify(Object.assign({},S,{ts:0,zoom:0}));
function adopt(r){S=r;migrate();S.sync=1;PL=null;MV=null;closeSheet();save();layout();hud();sndBtn();cPrev=stripped();toast('☁️ Partida cargada desde la nube')}
async function cloudInit(){
 try{
  if(!window.claude||!window.claude.use)return;
  const[db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);if(!db||!user)return;
  const id=await user.id();if(!id)return;
  cdoc=db.doc('data/users/'+id+'/partida');pdb=db;puser=user;pid=id;
  const snap=await cdoc.get();let r=null;
  if(snap.exists){try{r=JSON.parse(snap.data().json)}catch(e){}}
  cState='ok';
  if(r&&r.v===1&&!BT){
   if(S.sync){if((r.ts||0)>(S.ts||0)+5000)adopt(r)}
   else if(S.lvl===1&&S.xp<40)adopt(r);
   else{modal(`<div class="mtitle">☁️ Partida en la nube</div><p>Hay una partida guardada en tu cuenta (nivel <b>${r.lvl}</b>) y otra en este navegador (nivel <b>${S.lvl}</b>).</p><p>¿Con cuál seguís?</p>`,[[`Usar la de la nube (nivel ${r.lvl})`,()=>adopt(r),'gold'],[`Seguir con esta (nivel ${S.lvl})`,()=>{S.sync=1;cloudSave(1)}]]);return}
  }
  S.sync=1;cloudSave(1);
 }catch(e){cState='local'}
}
async function cloudSave(force){
 if(!cdoc||!S.sync||cBusy||cState==='off'||BT)return;
 if(!force&&now()-cAt<30000)return;
 const j=stripped();if(j===cPrev)return;
 cBusy=1;cAt=now();
 try{await cdoc.set({json:JSON.stringify(S),ts:S.ts||now(),lvl:S.lvl});cPrev=j;cState='ok'}
 catch(e){if(e&&['invalid_argument','revoked','not_granted','capability_disabled','capability_removed','quota_exceeded'].includes(e.code))cState='off'}
 cBusy=0;
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){save();cloudSave(1)}});
/* ---------- zoom en la batalla ---------- */
let bz=1,bpin=null;
function btZoom(z,ax,ay){
 const sc=$('#btscene'),mp=$('#btmap'),r=sc.getBoundingClientRect();if(ax==null){ax=r.left+r.width/2;ay=r.top+r.height/2}
 const m=mp.getBoundingClientRect();if(!m.width)return;const fx=(ax-m.left)/m.width,fy=(ay-m.top)/m.height;
 bz=Math.max(.6,Math.min(3,z));mp.style.zoom=bz;
 const n=mp.getBoundingClientRect();sc.scrollLeft+=n.left+fx*n.width-ax;sc.scrollTop+=n.top+fy*n.height-ay;
}
$('#btscene').addEventListener('wheel',e=>{e.preventDefault();btZoom(bz*Math.max(.75,Math.min(1.33,Math.exp(-e.deltaY*(e.deltaMode===1?33:1)*.002))),e.clientX,e.clientY)},{passive:false});
const GZB=mkGZ($('#btmap'),()=>bz,(z,fx,fy,ax,ay)=>{const sc=$('#btscene'),mp=$('#btmap');bz=z;mp.style.zoom=bz;const n=mp.getBoundingClientRect();sc.scrollLeft+=n.left+fx*n.width-ax;sc.scrollTop+=n.top+fy*n.height-ay});
$('#btscene').addEventListener('click',e=>{if(bpin)return;if(BT&&BT.td)tdTap(e.clientX,e.clientY);else depTap(e.clientX,e.clientY)});
$('#btdep').addEventListener('click',e=>{const tk=e.target.closest('[data-tk]');if(tk&&BT){e.stopPropagation();if(tk.dataset.tk==='!')BT.gap=1;else BT.tdSel=tk.dataset.tk;tdUI(BT);return}const t=e.target.closest('[data-dk]');if(!t||!BT)return;e.stopPropagation();if(t.dataset.dk==='*')depAll(BT);else{BT.sel=t.dataset.dk;depUI(BT)}});
$('#btscene').addEventListener('touchstart',e=>{if(e.touches.length===2){const[a,b]=e.touches;bpin={d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)||1,z:bz};GZB.start(bz,(a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)}},{passive:true});
$('#btscene').addEventListener('touchmove',e=>{if(!bpin||e.touches.length!==2)return;e.preventDefault();const[a,b]=e.touches;GZB.set(Math.max(.6,Math.min(3,bpin.z*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/bpin.d)),(a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)},{passive:false});
{const be=e=>{if(bpin&&e.touches.length<2){bpin=null;GZB.end()}};$('#btscene').addEventListener('touchend',be);$('#btscene').addEventListener('touchcancel',be)}
$('#btzoom').onclick=e=>{const t=e.target.closest('[data-z]');if(t)btZoom(bz*+t.dataset.z)};
{let d=null;const sc=$('#btscene');sc.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&!e.button)d={x:e.clientX,y:e.clientY,l:sc.scrollLeft,t:sc.scrollTop}});
 window.addEventListener('pointermove',e=>{if(d){sc.scrollLeft=d.l-(e.clientX-d.x);sc.scrollTop=d.t-(e.clientY-d.y)}});window.addEventListener('pointerup',()=>{d=null})}
/* ---------- visitar la base de un rival (es la misma que vas a enfrentar si lo atacás) ---------- */
function visit(i){const e=S.enemies[i],b=mkBattle({},enemySpec(eDef(e),e.lvl,seedOf(i,e.lvl)),{});b.visit=1;b.live=1;b.e=e;closeSheet();runBattle(b,`👁️ Base de ${e.f} ${e.n} · nivel ${e.lvl}`)}
/* ---------- fusión de tropas ---------- */
const FUS=[[{tanque:2,helicoptero:1},'tanvol'],[{marine:3,robot:1},'mecha'],[{franco:2,rexp:1},'sombra'],[{rara:2,pesado:1},'aracno'],[{bombardero:1,rescudo:1},'fortvol'],[{delec:1,caza:2},'fenix'],[{dragon:1,dfuego:1,dhielo:1},'hidra'],[{titan:1,rart:2},'coloso'],[{llamas:3,pesado:1},'infierno'],[{espada:1,sigilo:2},'ronin'],[{dron:6,transp:1},'nodriza'],[{lobo:3,dino:1},'quimera'],[{destructor:2,submarino:1},'acorazado']];
const fusOk=i=>Object.keys(FUS[i][0]).every(k=>S.troops[k]>=FUS[i][0][k]);
function openFusion(){
 let h='<p class="small" style="margin-top:0">Combiná tropas y creá unidades que solo existen por fusión, más fuertes que cualquier tropa normal.</p>';
 FUS.forEach(([inp,out],i)=>{const d=U[out];h+=`<div class="trow"><div class="te">${ue(out)}</div><div class="tinfo"><b>${d.n}</b> <span class="tc">×${S.troops[out]||0}</span><div class="small">${CI[d.cls]} ⚔️${d.dmg} ❤️${d.hp} 🎯${d.rng}${vsTxt(d)}</div><div class="force">${Object.keys(inp).map(k=>`<span>${ue(k)}×${inp[k]} <small>(${S.troops[k]||0})</small></span>`).join(' + ')}</div></div><button class="btn sm gold" data-a="fuse" data-v="${i}" ${fusOk(i)?'':'disabled'}>Fusionar</button></div>`});
 openSheet('fus','🧬 Fusión de tropas',h);
}
function fuse(i){if(!fusOk(i))return;const[inp,out]=FUS[i];for(const k in inp)S.troops[k]-=inp[k];S.troops[out]++;S.stats.fus=(S.stats.fus||0)+1;sfx('done');toast(`🧬 Obtuviste 1 ${U[out].n}`);hud();save();openFusion()}
/* ---------- unidades únicas: una tropa al azar con nombre, color y estadísticas propias ---------- */
const HN=['Zar','Kro','Vex','Tor','Mag','Nyx','Rok','Ful','Dra','Bol'],HT=['el Implacable','la Furia','Rompemuros','Colmillo','Tormenta','de Acero','el Eterno','Sombra'],HC=['#e2401c','#f6b51e','#49b6ff','#b06cf0','#2fd0a0','#ff6fb1'];
const liveHeroes=()=>S.heroes.filter(h=>S.troops['h'+h.id]>0);
const heroCost=()=>{const n=(S.hn||0)+1;return{c:3000*n,s:300*n,e:200*n}};
function newHero(){
 if(!cnt('lab')){toast('Necesitás un 🔬 Laboratorio de robótica');return}
 if(liveHeroes().length>=5){toast('Podés tener hasta 5 unidades únicas a la vez');return}
 const c=heroCost();if(!can(c)){toast('No te alcanza 😕');return}pay(c);
 const pool=Object.keys(U).filter(k=>!U[k].hero&&maxB(U[k].b)>=(U[k].bl||1)),k=pool[Math.random()*pool.length|0]||'soldado',R=(a,b)=>+(a+Math.random()*(b-a)).toFixed(1),pick=a=>a[Math.random()*a.length|0];
 const h={id:S.hn=(S.hn||0)+1,k,n:pick(HN)+pick(HN).toLowerCase()+' '+pick(HT),m:[R(1.6,3.2),R(1.6,3.2)],r:R(0,1),c:pick(HC)},key='h'+h.id;
 S.heroes.push(h);regHero(h);S.troops[key]=1;S.ulv[key]=1;sfx('lvl');hud();save();closeSheet();
 modal(`<div class="mtitle">🎲 ¡Unidad única!</div><div class="big">${ue(key)}</div><p><b>${h.n}</b></p><p>Basada en ${U[k].n}: vida ×${h.m[0]}, daño ×${h.m[1]}, alcance +${h.r}.</p><p class="small">Va a tus batallas como cualquier tropa. Si cae en combate, se pierde.</p>`,[['¡Genial!',()=>setTimeout(openTroops,0),'gold']]);
}
const heroHTML=()=>`<div class="cat">🎲 Unidades únicas</div>`+(liveHeroes().map(h=>{const d=U['h'+h.id];return `<div class="trow"><div class="te">${ue('h'+h.id)}</div><div class="tinfo"><b>${h.n}</b><div class="small">${CI[d.cls]} ⚔️${d.dmg} ❤️${d.hp} 🎯${d.rng} · basada en ${U[h.k].n}</div></div></div>`}).join('')||'<p class="small">Todavía no creaste ninguna.</p>')+`<div class="row2" style="margin-bottom:8px"><button class="btn gold" data-a="hero">🎲 Crear · ${costHTML(heroCost())}</button><button class="btn" data-a="fusion">🧬 Fusión de tropas</button></div>`;
/* ---------- mini torneos: cada tanto se abre uno de 3 rondas, cada una más difícil; si perdés quedás afuera ---------- */
const TM=[.5,.8,1.15];
function tourTick(){
 const t=now();
 if(S.tour&&t>S.tour.end){S.tour=null;toast('🏆 El mini torneo terminó')}
 if(!S.tour&&S.lvl>=2&&!modalOpen&&!BT){if(!S.tnext){S.tnext=t+4*60000;return}
  if(t>S.tnext){S.tour={r:0,p:Math.max(80,armyPow(S.troops)),end:t+12*60000};S.tnext=t+30*60000;sfx('alert');toast('🏆 ¡Empezó un mini torneo! Entrá a Atacar');save()}}
}
function tourWin(){
 S.tour.r++;if(S.tour.r<3)return;
 const r={c:Math.round(S.tour.p*6)+500,s:Math.round(S.tour.p*.6),e:Math.round(S.tour.p*.3)};gain(r);S.stats.tw=(S.stats.tw||0)+1;S.spins=(S.spins||0)+1;S.tour=null;toast(`🏆 ¡Campeón del torneo! +${costPlain(r)}`);
}
const tourBtn=()=>S.tour?`<button class="btn gold" data-a="enemy" data-v="t${S.tour.r}" style="margin:0 0 10px">🏆 Mini torneo · ronda ${S.tour.r+1} de 3 · termina en ${ft(S.tour.end-now())}</button>`:'';
