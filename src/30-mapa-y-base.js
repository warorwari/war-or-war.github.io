/* ---------- XP / niveles ---------- */
function addXP(n){if(!n)return;S.xp+=n;while(S.xp>=need(S.lvl)){S.xp-=need(S.lvl);S.lvl++;levelUp()}}
function levelUp(){
 const bonus=S.lvl*100;S.c+=bonus;sfx('lvl');let lvIt='';if(S.lvl>=10){const it=giveItem(S.lvl%5===0?3:2);if(it)lvIt=`<p>🧰 Premio de nivel: <b>${EQN[it.s][it.c]}</b>${S.lvl%5===0?' (legendaria)':''}</p>`}
 const un=Object.entries(B).filter(([k,d])=>d.lvl===S.lvl).map(([k,d])=>`<div class="unl">${svgArt(k,1)}${d.n}</div>`).join('');
 modal(`<div class="lvrays"></div><div class="mtitle lvt">¡Subiste a nivel ${S.lvl}!</div><div class="big lvs">⭐</div><div class="lvrank">🎖️ ${rankOf(S.lvl)}</div><p>Premio: ${RES.c}${bonus}</p>${lvIt}${nextHTML(S.lvl,3)}${un?'<p><b>Desbloqueaste:</b></p><div class="unls">'+un+'</div>':''}${S.lvl===2?'<p class="small">Ojo: desde ahora los enemigos pueden atacar tu base. ¡Construí torres!</p>':''}`,[['¡Genial!','','gold']],()=>{confetti();$('#mbox').classList.add('lvup');setTimeout(()=>{const m=$('#mbox');if(m)m.classList.remove('lvup')},4000)});
}

/* ---------- modal ---------- */
const MQ=[];let modalOpen=false;
function modal(html,btns,onShow){MQ.push({html,btns,onShow,rs:LASTN&&Date.now()-LASTN.t<400?LASTN:null});if(!modalOpen)nextModal()}
function nextModal(){
 const m=MQ.shift(),el=$('#modal');
 if(!m){el.classList.remove('on');modalOpen=false;return}
 modalOpen=true;
 $('#mbox').innerHTML=m.html+'<div class="mbtns">'+m.btns.map((b,i)=>`<button class="btn ${b[2]||''}" data-mb="${i}">${b[0]}</button>`).join('')+'</div>';
 el.classList.add('on');
 $('#mbox').style.animation='none';void $('#mbox').offsetWidth;$('#mbox').style.animation='';
 $('#mbox').onclick=e=>{const t=e.target.closest('[data-mb]');if(!t)return;const b=m.btns[+t.dataset.mb];if(b[1])b[1]();nextModal();if(m.rs)setTimeout(()=>resumeNav(m.rs),40)};
 if(m.onShow)m.onShow();
}
function toast(msg){if(/No te alcanza|Te faltan|No se pudo|❌|no es válido/.test(msg))sfx('err');else if(/^🏅 Logro/.test(msg))playS('achievement',.8);const t=document.createElement('div');t.className='toast';t.textContent=msg;$('#toasts').appendChild(t);setTimeout(()=>t.remove(),2200);const all=$('#toasts').children;if(all.length>3)all[0].remove()}

/* ---------- mapa ---------- */
let tw,th,top0,OX=0,MW=0,MH=0,booted=0,tiles=[],els={};
function pos(i){const r=i/N|0,c=i%N;return[(c-r)*tw/2+(N-1)*tw/2+OX,(c+r)*th/2+top0]}
/* El zoom solo escala el mapa ya dibujado: no se vuelve a construir nada */
function sizeZoom(){const w=$('#mapw');w.style.width=MW*S.zoom+'px';w.style.height=MH*S.zoom+'px';$('#map').style.transform=`scale(${S.zoom})`}
function layout(keep){
 const wd=$('#world'),W=wd.clientWidth,Hh=wd.clientHeight||9999;
 booted=0;tw=Math.max(58,Math.min(110,(W-12)/(N+4.8),(Hh-8)/(N*.5+3.7)));th=tw/2;top0=tw*1.1;OX=tw*2.4;
 const map=$('#map');MW=N*tw+2*OX;MH=(N*.5+3.7)*tw;map.style.width=MW+'px';map.style.height=MH+'px';
 $('#gndw').innerHTML=ground(N,tw)+`<div id="gx" style="position:absolute;left:${OX}px;top:0">${gExtra(tw/100)}</div>`;$('#gndw').firstChild.style.left=OX+'px';sizeZoom();clearEnts();
 let h='';
 for(let i=0;i<N*N;i++){const[x,y]=pos(i);h+=`<div class="tile ${((i/N|0)+i%N)%2?'a':'b'}" data-t="${i}" style="left:${x}px;top:${y}px;width:${tw}px;height:${th}px"></div>`}
 $('#tiles').innerHTML=h;tiles=[...$('#tiles').children];
 $('#blds').innerHTML='';$('#shs').innerHTML='';els={};walkers=[];islSig='';render();islTick();booted=1;
 if(!keep){wd.scrollLeft=(wd.scrollWidth-wd.clientWidth)/2;wd.scrollTop=(wd.scrollHeight-wd.clientHeight)/2}
}
function sigOf(b){if(!b)return'';if(isCons(b))return b.t+b.l+'B'+Math.floor((1-(b.end-now())/(b.dur||1))*20);return b.t+b.l+(ready(b)?'R':'I')}
/* ---------- edificios en alta definición: cada tipo/nivel se arma una vez como imagen vectorial ----------
   Lleva todo el detalle, texturas, contorno, luz y oclusión; lo que se mueve (banderas, humo, luces) va aparte. */
const BIM=new Map(),HVB='-15 -45 130 170',SVBS='-30 40 230 80';
const AN_RE=/<(?:polygon|circle|ellipse|path|rect)\b[^>]*class="(?:flag|smoke|blink)[^"]*"[^>]*\/>/g;
const HIT='<svg class="art bhit" viewBox="0 0 100 120"><polygon points="50,120 0,95 0,52 50,26 100,52 100,95" fill="transparent"/></svg>';
const isNight=()=>document.documentElement.classList.contains('night');
function bImg(t,l){const sk=cosCur('skin')[1],nt=isNight()?1:0,fc=cosCur('flag')[1],key=t+'|'+l+'|'+(sk?sk.join():'')+'|'+nt+'|'+bK()+(LITE?'|L'+fc:'');let o=BIM.get(key);if(o){toBmp(o,130,170);return o}
 FULL=1;let a='';try{a=skinA(artL(t,l))}catch(e){}FULL=0;
 let an='';if(LITE){a=a.replace(/<[^>]*class="smoke[^"]*"[^>]*\/>/g,'').replace(/(class="flag"[^>]*?fill=")#[0-9a-fA-F]{6}/g,'$1'+fc)}else{an=(a.match(AN_RE)||[]).join('');a=a.replace(AN_RE,'')}
 if(nt)a=a.replace(/(class="gw"[^>]*?fill=")#[0-9a-fA-F]{6}/g,'$1#ffe98a');
 const deco=B[t]&&B[t].deco;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${HVB}" width="130" height="170">${SVGDEFS}${deco?'':'<ellipse cx="50" cy="97" rx="47" ry="22" fill="url(#gaoB)"/>'}<g filter="url(#fhd)">${a}</g></svg>`;
 o={u:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg),an};if(BIM.size>400){for(const v of BIM.values())if(v.b&&v.b.startsWith('blob:'))URL.revokeObjectURL(v.b);BIM.clear()}BIM.set(key,o);toBmp(o,130,170);return o}
function sImg(t,l){const key='S|'+t+'|'+l+'|'+bK();let o=BIM.get(key);if(o){toBmp(o,230,80);return o}FULL=1;let a='';try{a=ART[t](l)}catch(e){}FULL=0;a=a.replace(AN_RE,'');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SVBS}" width="230" height="80">${SVGDEFS}<g filter="url(#fshb)" transform="matrix(1,0,-.95,.36,90.25,60.8)">${a}</g></svg>`;
 o={u:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)};BIM.set(key,o);toBmp(o,230,80);return o}
/* Cada imagen vectorial se convierte una sola vez en un mapa de píxeles: el celular solo la mueve, no la vuelve a dibujar */
const BQ=[];let bqN=0,bqT=0;
const bK=()=>Math.round(Math.min(2.6,Math.max(1.2,tw/100*(window.devicePixelRatio||1)*1.35))*4)/4;
function toBmp(o,w,hh){if(o.b||o.q)return;o.q=1;BQ.push([o,w,hh]);pumpB()}
function pumpB(){while(bqN<2&&BQ.length){const[o,w,hh]=BQ.shift();bqN++;const k=bK(),im=new Image(),done=()=>{bqN--;pumpB()};
 im.onload=()=>{try{const c=document.createElement('canvas');c.width=Math.round(w*k);c.height=Math.round(hh*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);
  c.toBlob(bl=>{if(bl){o.b=URL.createObjectURL(bl);o.img=new Image();o.img.onload=()=>{clearTimeout(bqT);bqT=setTimeout(render,30)};o.img.src=o.b}done()},'image/png')}catch(e){o.b=o.u;o.img=im;done()}};
 im.onerror=()=>{o.b=o.u;done()};im.src=o.u}}
const setImg=(box,cls,src)=>{let im=box._im;if(!im||im._src!==src){im=document.createElement('img');im.className=cls;im.alt='';im.decoding='sync';im.src=src;im._src=src;box._im=im}return im};
/* ---------- el lienzo del mapa ----------
   Un solo lienzo del tamaño de la pantalla (más un margen) que se mueve con el mapa. En cada cuadro se dibujan las
   sombras y después edificios y tropas ordenados por profundidad: el teléfono ya no tiene que reacomodar cientos de capas. */
let MCV=null,MCX=null,MCK='',MCD=1,MCP='',MCS=[],MCB=[];let MAPC=false;try{MAPC=localStorage.getItem('gdb-mapc')==='1'}catch(e){}
const wRect=(w,tt)=>{const s=tw/100,vb=uvb(w.u),bob=w.wk&&!AIR[w.u]?-Math.abs(Math.sin(tt/150+w.yaw))*tw*.035:0;return{x:w.x+vb[0]*s,y:w.y-.7*tw+vb[1]*s+bob,w:vb[2]*s,h:vb[3]*s}};
function mcPaint(g,r,tt){const ov=(x,y,w,hh)=>x<r.x+r.w&&x+w>r.x&&y<r.y+r.h&&y+hh>r.y;
 g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.clearRect(r.x,r.y,r.w,r.h);
 for(const s of MCS)if(ov(s.x,s.y,s.w,s.h))g.drawImage(s.img,s.x,s.y,s.w,s.h);
 const L=[];for(const b of MCB)if(ov(b.x,b.y,b.w,b.h))L.push(b);
 L.sort((a,b)=>a.z-b.z||a.yy-b.yy);for(const it of L)g.drawImage(it.img,it.x,it.y,it.w,it.h);g.restore()}
function drawMap(ts){
 const map=$('#map');if(!map)return;
 if(!MCV){MCV=document.createElement('canvas');MCV.id='mcv';MCX=MCV.getContext('2d')}
 if(MCV.parentNode!==map)map.insertBefore(MCV,$('#blds'));
 const wd=wdEl,mw=$('#mapw'),z=S.zoom,W=wd.clientWidth,H=wd.clientHeight;if(!W||!H)return;
 const vw=W/z,vh=H/z,m=.22,cw=vw*(1+2*m),ch=vh*(1+2*m);
 let x0=(wd.scrollLeft-mw.offsetLeft)/z-vw*m,y0=(wd.scrollTop-mw.offsetTop)/z-vh*m;
 let q=z*Math.min(devicePixelRatio||1,LITE?2:2.6);const mx=LITE?5e6:8e6;if(cw*ch*q*q>mx)q=Math.sqrt(mx/(cw*ch));
 const bw=Math.round(cw*q),bh=Math.round(ch*q),key=bw+'x'+bh+'|'+cw.toFixed(1),g=MCX,tt=ts||performance.now();
 if(key!==MCK){MCK=key;MCV.width=bw;MCV.height=bh;MCV.style.width=cw+'px';MCV.style.height=ch+'px';MCP=''}
 /* el lienzo se corre solo cuando la vista se aleja más de la mitad del margen: mientras tanto se mueve con el mapa */
 const old=MCP&&MCP.split('|').map(Number),far=!old||Math.abs(old[0]-x0)>vw*m*.5||Math.abs(old[1]-y0)>vh*m*.5;
 if(far||MCD){
  if(!far){x0=old[0];y0=old[1]}
  MCP=x0+'|'+y0;MCV.style.transform=`translate(${x0.toFixed(2)}px,${y0.toFixed(2)}px)`;
  const T=tw;MCS=[];MCB=[];
  for(const k in els){const e=els[k],s=e._shd,b=e._hd;if(s)MCS.push({img:s.o.img,x:s.x-.3*T,y:s.y-.3*T,w:2.3*T,h:.8*T});if(b)MCB.push({z:b.z,yy:b.y,img:b.o.img,x:b.x-.15*T,y:b.y-1.15*T,w:1.3*T,h:1.7*T})}
  g.setTransform(q,0,0,q,-x0*q,-y0*q);g.imageSmoothingQuality='high';mcPaint(g,{x:x0,y:y0,w:cw,h:ch},tt);MCD=0;return}

}
function render(){
 const t=now(),nt=isNight()?'N':'D',skk=SKC||'';
 for(let i=0;i<N*N;i++){
  const b=S.g[i];let el=els[i];
  tiles[i]&&tiles[i].classList.toggle('occ',!!b);
  if(!b){if(el){el._sh.remove();el.remove();delete els[i];MCD=1}continue}
  const hdo=!isCons(b)&&MV!==i?bImg(b.t,b.l):null,sho=sImg(b.t,Math.min(b.l,3)),hok=hdo&&hdo.img&&hdo.img.complete,sok=sho.img&&sho.img.complete,sig=sigOf(b)+(MV===i?'M':'')+(b.w?'W':'')+tw+nt+skk+(hok?'B':'')+(sok?'b':'');
  if(!el){el=document.createElement('div');el.dataset.t=i;$('#blds').appendChild(el);els[i]=el;el._s='';el._new=booted;el._sh=document.createElement('div');$('#shs').appendChild(el._sh)}
  if(el._s===sig)continue;el._s=sig;
  const[x,y]=pos(i),d=B[b.t],cons=isCons(b),rd=!cons&&ready(b),p=cons?Math.min(1,1-(b.end-t)/(b.dur||1)):1;
  el.style.cssText=`left:${x}px;top:${y-tw*0.7}px;width:${tw}px;height:${tw*1.2}px;z-index:${2*((i/N|0)+(i%N))+10};font-size:${tw*0.8}px`;
  const fin=el._cons&&!cons;el._cons=cons;el.className='bld'+(rd?' ready':'')+(MV===i?' mv':'')+(el._new?' pop':'')+(d.def?' dfn':'')+(fin?' land':'');el._new=0;if(fin)dustAt(x+tw/2,y+th/2);
  let a=skinA(artL(b.t,b.l))+(b.w?BOT:'');
  el._sh.style.cssText=`left:${x}px;top:${y-tw*0.7}px;width:${tw}px;height:${tw*1.2}px`;el._sh.innerHTML=d.deco?'':PAD;el._shd=!(cons&&!b.up)&&sok&&!d.deco?{o:sho,x,y}:null;if(el._shd&&!MAPC){el._sh.appendChild(setImg(el._sh,'bshd',sho.b));el._shd=null}
  if(cons){if(!b.up)a=`<clipPath id="cp${i}"><rect x="-30" y="${(120-p*100).toFixed(1)}" width="160" height="220"/></clipPath><g clip-path="url(#cp${i})">${a}</g>`;a=SCAF(0)+a+SCAF(1)+BOT}
  let h,bi=null;el._hd=null;if(hok){if(MAPC)el._hd={o:hdo,x,y,z:2*((i/N|0)+(i%N))+10,i};else bi=setImg(el,'bimg',hdo.b);h=(hdo.an||b.w?`<svg class="banim" viewBox="${HVB}">${hdo.an}${b.w?BOT:''}</svg>`:'')+HIT}else h=`<svg class="art" viewBox="0 0 100 120">${a}</svg>`;
  if(b.l>1)h+=`<div class="lv">${b.l>3?'★'+b.l:'★'.repeat(b.l)}</div>`;
  if(cons)h+=`<div class="pb"><i style="width:${p*100}%"></i></div>`+CRANE;
  if(rd){const y0=BY[b.t]||[0,0];h+=`<div class="bub" style="top:${y0[0]-y0[1]*(Math.min(b.l,3)-1)}%">${RES[Object.keys(d.prod)[0]]}</div>`}
  el.innerHTML=h;if(bi)el.prepend(bi);MCD=1;
 }
}
/* Tropas paseando por la base (solo decorativo). Se mueven cuadro a cuadro (ver frame): las de tierra van de
   casillero libre en casillero libre; las aéreas vuelan sin parar. Todas giran de a poco hacia donde van. */
let walkers=[];
const WK={soldado:3,marine:2,bazuca:1,franco:1,tanque:2,misil:1,pesado:1,helicoptero:2,robot:2,dragon:2,caza:1,bombardero:1,b2:1,dfuego:1,dhielo:1,delec:1,rexp:1,rmed:1,rara:1,titan:1};
const SPD={soldado:.55,marine:.5,bazuca:.5,franco:.5,tanque:.5,misil:.4,pesado:.32,robot:.4,helicoptero:1.5,dragon:1.9,caza:2.6,bombardero:1.4,b2:1.7,dfuego:1.9,dhielo:1.8,delec:2,rexp:.7,rescudo:.35,rmed:.5,rart:.3,rara:.7,titan:.25};
const zOf=k=>2*((k/N|0)+k%N)+11;
const aiOf=y=>((Math.round(y/(2*Math.PI)*ANG)%ANG)+ANG)%ANG;
const turn=(y,t,m)=>{const d=Math.atan2(Math.sin(t-y),Math.cos(t-y));return y+(Math.abs(d)<m?d:Math.sign(d)*m)};
let liteWk=6;
function walk(){liteWk=10;
 for(const u in U){
  const n=U[u].nav||S.eco?0:U[u].hero&&!U[u].fus&&!/^h\d/.test(u)?(u===S.cmdSel&&S.cmd[u]&&!(S.cmd[u].inj>now())?1:0):Math.min(S.troops[u]||0,LITE?(S.troops[u]>0&&liteWk-->0?1:0):(WK[u]||1)),have=walkers.filter(w=>w.u===u);
  for(let k=have.length;k<n;k++){const el=document.createElement('div');el.className='wk';el.innerHTML='<canvas class="wkc"></canvas>';el.style.width=tw+'px';el.style.height=tw*1.2+'px';el.style.zIndex=AIR[u]?800:700;$('#blds').appendChild(el);walkers.push({u,el,cv:el.firstChild,i:-1,yaw:Math.random()*6.28,k:'',zz:0})}
  for(let k=n;k<have.length;k++){have[k].el.remove();walkers.splice(walkers.indexOf(have[k]),1)}
 }
 for(const w of walkers)if(w.i<0)spawnWalker(w);
}
function skin(w){
 const ai=LITE?Math.round(aiOf(w.yaw)/3)*3%ANG:aiOf(w.yaw),ph=!LITE&&U[w.u].drg?Math.floor(now()/160)%4:0,rb=Math.min(3,Math.max(1.5,Math.ceil((devicePixelRatio||1)*S.zoom*2)/2)),px=Math.round(tw*rb),k=S.ulv[w.u]+'|'+ai+'|'+ph+'|'+px;
 if(k===w.k)return;const c=uSpr(w.u,S.ulv[w.u],ai,0,ph,px);if(!c)return;w.k=k;
 const vb=uvb(w.u),cv=w.cv,s=tw/100;if(cv.width!==c.width||cv.height!==c.height){cv.width=c.width;cv.height=c.height}
 cv.style.cssText=`left:${vb[0]*s}px;top:${vb[1]*s}px;width:${vb[2]*s}px;height:${vb[3]*s}px`;const g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);g.drawImage(c,0,0);
}
function freeNear(i){const r=i/N|0,c=i%N,o=[];if(r>0)o.push(i-N);if(r<N-1)o.push(i+N);if(c>0)o.push(i-1);if(c<N-1)o.push(i+1);return o.filter(j=>!S.g[j])}
function placeWalker(w){w.el.style.transform=`translate3d(${w.x.toFixed(1)}px,${(w.y-tw*.7).toFixed(1)}px,0)`}
function spawnWalker(w){
 const air=AIR[w.u],all=[];for(let i=0;i<N*N;i++)if(air||!S.g[i])all.push(i);
 if(!all.length){w.hid=1;w.el.style.display='none';return}
 w.hid=0;w.el.style.display='';w.i=w.j=all[Math.floor(Math.random()*all.length)];[w.x,w.y]=pos(w.i);w.tx=w.x;w.ty=w.y;w.vx=w.vy=0;w.prev=-1;w.to=w.yaw;
 w.wait=1+Math.random()*1500;w.zz=air?800:zOf(w.i);placeWalker(w);skin(w);
}
function moveWalkers(dt){
 for(const w of walkers){
  if(w.i<0)continue;
  if(AIR[w.u]){
   const dx=w.tx-w.x,dy=w.ty-w.y,d=Math.hypot(dx,dy)||1,mx=(SPD[w.u]||1)*tw,k=Math.min(1,dt*.0016);
   if(d<tw*.8)[w.tx,w.ty]=pos(Math.floor(Math.random()*N*N));
   w.vx+=(dx/d*mx-w.vx)*k;w.vy+=(dy/d*mx-w.vy)*k;w.x+=w.vx*dt/1000;w.y+=w.vy*dt/1000;
   if(Math.hypot(w.vx,w.vy)>mx*.08)w.yaw=turn(w.yaw,Math.atan2(w.vy/th-w.vx/tw,w.vx/tw+w.vy/th),dt*.006);
  }else{
   if(w.wait>0){
    w.wait-=dt;
    if(w.wait<=0||S.g[w.i]){
     let o=freeNear(w.i);
     if(!o.length){if(S.g[w.i])w.i=-1;else w.wait=1500}
     else{const fwd=o.filter(j=>j!==w.prev);if(fwd.length)o=fwd;
      w.prev=w.i;w.j=o[Math.floor(Math.random()*o.length)];[w.tx,w.ty]=pos(w.j);w.wait=0;w.to=Math.atan2((w.j/N|0)-(w.i/N|0),w.j%N-w.i%N);
      w.wk=1;w.el.classList.add('walking');w.zz=Math.max(zOf(w.i),zOf(w.j))}
    }
   }else{
    const dx=w.tx-w.x,dy=w.ty-w.y,d=Math.hypot(dx,dy),sp=(SPD[w.u]||.6)*tw*dt/1000;
    if(d<=sp){w.x=w.tx;w.y=w.ty;w.i=w.j;w.zz=zOf(w.i);w.wait=Math.random()<.3?700+Math.random()*2500:1;if(w.wait>1){w.wk=0;w.el.classList.remove('walking')}}
    else{w.x+=dx/d*sp;w.y+=dy/d*sp}
   }
   if(w.i<0)continue;
   w.yaw=turn(w.yaw,w.to,dt*.009);
  }
  placeWalker(w);skin(w);
 }
}
function floatTxt(i,txt){const[x,y]=pos(i);const f=document.createElement('div');f.className='ft';f.textContent=txt;f.style.left=x+tw/2+'px';f.style.top=y-tw*0.7+'px';$('#map').appendChild(f);setTimeout(()=>f.remove(),1300)}
function setMode(){
 $('#map').classList.toggle('placing',!!PL||MV!=null);
 const bn=$('#banner');
 if(PL){bn.classList.add('on');$('#bantxt').textContent=`Tocá un lugar libre para ${B[PL].e} ${B[PL].n}`}
 else if(MV!=null){bn.classList.add('on');$('#bantxt').textContent=`Elegí dónde mover ${B[S.g[MV].t].e}`}
 else bn.classList.remove('on');
 render();
}
$('#bancancel').onclick=()=>{PL=null;MV=null;setMode()};
$('#map').addEventListener('click',e=>{if(now()-dragged<300)return;const v=e.target.closest('[data-ev]');if(v){tapEnt(+v.dataset.ev);return}const s=e.target.closest('[data-isl]');if(s){tapIsl(+s.dataset.isl);return}const t=e.target.closest('[data-t]');if(t)tap(+t.dataset.t)});
function tap(i){
 const b=S.g[i];
 if(PL){if(b){toast('Ese lugar está ocupado');return}placeAt(i);return}
 if(MV!=null){
  if(i===MV){MV=null;setMode();return}
  if(b){toast('Elegí un lugar libre');return}
  S.g[i]=S.g[MV];S.g[MV]=null;MV=null;setMode();save();return;
 }
 if(!b)return;
 if(ready(b)){collect(i);return}
 openInfo(i);
}
/* ---------- sensación de juego en la base ---------- */
const RID={c:'#rc',f:'#rf',o:'#ro',s:'#rs',e:'#re'};let FLYN=0,FLYT=0;
function bump(sel){const el=$(sel);if(!el)return;const box=el.closest('.res')||el;box.classList.remove('bump');void box.offsetWidth;box.classList.add('bump')}
function flyRes(i,p){const el=els[i];if(!el||S.eco)return;const r=el.getBoundingClientRect();if(!r.width)return;const t=performance.now();if(t-FLYT>500){FLYT=t;FLYN=0}
 const sx=r.left+r.width/2,sy=r.top+r.height*.25;let d=0;
 for(const k in p){const tgt=$(RID[k]);if(!tgt||!p[k])continue;const tr=tgt.getBoundingClientRect(),n=Math.min(LITE?2:4,1+Math.floor(Math.log10(p[k]+1)));
  for(let j=0;j<n&&FLYN<(LITE?14:26);j++,FLYN++){const c=document.createElement('div');c.className='flyr';c.textContent=RES[k];c.style.left=sx+'px';c.style.top=sy+'px';$('#flyl').appendChild(c);
   const mx=(Math.random()-.5)*60,my=-30-Math.random()*40,dx=tr.left+tr.width*.25-sx,dy=tr.top+tr.height/2-sy,dl=d*45+j*70;
   const a=c.animate([{transform:'translate(-50%,-50%) scale(.6)',opacity:0},{transform:`translate(calc(-50% + ${mx}px),calc(-50% + ${my}px)) scale(1.15)`,opacity:1,offset:.28},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.7)`,opacity:1}],{duration:650+Math.random()*150,delay:dl,easing:'cubic-bezier(.5,0,.75,.5)',fill:'both'});
   a.onfinish=()=>{c.remove();bump(RID[k]);if(j===0)snd(()=>tone(1300+Math.random()*300,.05,'square',.02))}}d++}}
function dust(i,n){if(S.eco)return;const[x,y]=pos(i);for(let k=0;k<(LITE?4:n||8);k++){const c=document.createElement('div'),a=Math.random()*6.28;c.className='dust';c.style.left=x+tw/2+'px';c.style.top=y+tw*.05+'px';c.style.setProperty('--dx',Math.cos(a)*tw*.55+'px');c.style.setProperty('--dy',Math.sin(a)*tw*.22-tw*.12+'px');$('#map').appendChild(c);setTimeout(()=>c.remove(),900)}}
const snd=f=>{if(AC&&!S.mute)try{f()}catch(e){}};
function hammer(n){for(let k=0;k<(n||3);k++)setTimeout(()=>snd(()=>{tone(180,.07,'square',.06,0,90);noise(.05,.08,1600)}),k*170)}
function confetti(){const box=$('#mbox');if(!box)return;const L=document.createElement('div');L.className='confl';const cs=['#f6b51e','#2f7fe0','#58c844','#e8503a','#b06cf0','#fff'];
 for(let k=0;k<(LITE?26:60);k++){const c=document.createElement('i');c.style.left=Math.random()*100+'%';c.style.background=cs[k%cs.length];c.style.animationDelay=Math.random()*.6+'s';c.style.animationDuration=1.6+Math.random()*1.4+'s';c.style.setProperty('--r',(Math.random()*720-360)+'deg');L.appendChild(c)}
 box.appendChild(L);setTimeout(()=>L.remove(),3600)}
function collect(i,quiet){
 const b=S.g[i],p=prodOf(b);gain(p);b.lc=now();S.stats.col++;S.xp+=1;
 sfx('coin');floatTxt(i,Object.entries(p).map(([k,v])=>'+'+v+RES[k]).join(' '));
 const[bx,by]=pos(i);if(LITE)flyRes(i,p);else{burst(bx+tw/2,by-tw*.1,RES[Object.keys(p)[0]],3);flyRes(i,p)}
 if(!quiet){addXP(0);checkLvl();render();hud();save()}
}
function checkLvl(){while(S.xp>=need(S.lvl)){S.xp-=need(S.lvl);S.lvl++;levelUp()}}
function placeAt(i){
 const ty=PL,d=B[ty];
 if(!can(d.cost)){toast('No te alcanza 😕');PL=null;setMode();return}
 pay(d.cost);const t=now();sfx('build');hammer(3);setTimeout(()=>dust(i,10),20);
 const bt=d.t*1000*bm();S.g[i]={t:ty,l:1,end:d.t?t+bt:0,dur:bt,lc:t};
 if(!d.t){addXP(d.xp);floatTxt(i,'+'+d.xp+'⭐')}
 if(!d.deco||!can(d.cost))PL=null;
 setMode();hud();save();
}

/* ---------- loop ---------- */
function tick(){
 const t=now();let ch=false;
 for(let i=0;i<N*N;i++){
  const b=S.g[i];
  if(b&&b.end&&b.end<=t){
   const d=B[b.t];
   if(b.up){b.l++;b.up=0;toast(`${d.e} ${d.n} mejorado a nivel ${b.l}`)}else toast(`${d.e} ${d.n} terminado`);
   sfx('done');b.end=0;b.lc=t;const x=d.xp*b.l;addXP(x);floatTxt(i,'+'+x+'⭐');dust(i,12);{const[bx,by]=pos(i);burst(bx+tw/2,by-tw*.2,'✨',LITE?3:6)}ch=true;
  }
 }
 while(S.queue.length&&S.queue[0].end<=t){const q=S.queue.shift();S.troops[q.u]++;S.stats.trained++;S.stats.byU[q.u]=(S.stats.byU[q.u]||0)+1;ch=true}
 rivals(t);events(t);expTick(t);chestRender();
 if(S.lvl<2)S.nextRaid=Math.max(S.nextRaid,t+3*60000);
 else if(t>=S.nextRaid&&!modalOpen&&!PL&&MV==null&&!BT)raid();
 render();walk();islTick();hud();live();
 if(sheet.kind==='info'){const b=S.g[sheet.i];if(stSig(b)!==sheet.sig)openInfo(sheet.i)}
 if(ch)save();
}

function hud(){{const tr=$('#rtr');if(tr)tr.textContent=fmt(S.trof||0)}{const ti=$('#title'),tt=S.prof&&S.prof.n?S.prof.n:'✏️ Tu nombre';if(ti&&ti.textContent!==tt)ti.textContent=tt;const ab=$('#avbig'),av=(S.prof&&S.prof.av)||'⭐';if(ab&&ab.dataset.v!==av){ab.dataset.v=av;const k=typeof AVIMG==='function'&&AVIMG(av);ab.innerHTML=k?`<img src="${k}" alt="">`:av}}{const pe=$('#rpop');if(pe){const u=popUsed(),c=popCap(),t=u+'/'+c;if(pe.textContent!==t)pe.textContent=t;pe.parentNode.classList.toggle('full',u>=c)}}
 /* los recursos de arriba se actualizan en frame(), con conteo animado */
 $('#rdef').textContent=fmt(defense());$('#ratk').textContent=fmt(armyPow(S.troops));
 $('#lvlstar').textContent=S.lvl;$('#xpfill').style.width=Math.min(100,S.xp/need(S.lvl)*100)+'%';$('#xptxt').textContent=`${S.xp} / ${need(S.lvl)} ⭐`;
 const rc=S.g.filter(b=>b&&ready(b)).length+ISL.filter((d,i)=>islReady(i)).length;$('#bcol').textContent=rc;$('#bcol').style.display=rc?'':'none';
 $('#btr').textContent=S.queue.length;$('#btr').style.display=S.queue.length?'':'none';
 const m=MS[S.mi];$('#bmis').style.display=m&&m.ok()?'':'none';
}
function live(){
 const t=now();
 document.querySelectorAll('[data-until]').forEach(e=>e.textContent=ft(+e.dataset.until-t));
 document.querySelectorAll('[data-rush]').forEach(e=>{const b=S.g[+e.dataset.rush];if(b)e.textContent=rushCost(b)});
 document.querySelectorAll('[data-tr]').forEach(e=>e.textContent=S.troops[e.dataset.tr]);
 const q=$('#qlist');if(q){const b=q.querySelector('.qbar i');if(b&&S.queue[0]){const q0=S.queue[0],du=U[q0.u].t*1000/(speed(q0.u)||1);b.style.width=Math.max(0,Math.min(100,100-(q0.end-t)/du*100))+'%'}const s=S.queue.length+':'+(S.queue[0]?S.queue[0].end:0);if(q._s!==s){q._s=s;q.innerHTML=qHTML();const cnt={};for(const x of S.queue)cnt[x.u]=(cnt[x.u]||0)+1;document.querySelectorAll('[data-tq]').forEach(e=>{const n=cnt[e.dataset.tq];e.textContent=n?'⏳+'+n:''})}}
}

