/* ---------- batalla: simulación y vista en vivo ---------- */
let BT=null,btw=60;
const bpos=(x,y)=>[(x-y)*btw/2+(GB+1)*btw/2,(x+y)*btw/4+btw*1.1];
const BHP={inf:42,veh:44,mec:36,air:18};
/* ---------- motor de imágenes ----------
   Cada dibujo vectorial (tropa en una dirección, defensa, cuartel general) se pinta UNA vez en un bitmap y después
   se reusa. Como el costo es único, se pinta siempre con todo el detalle, también en modo liviano. */
const SVGDEFS=(document.querySelector('body>svg defs')||{outerHTML:''}).outerHTML;
const RC=new Map();let RQ=[],rcN=0;
function raster(key,make,vb,w,h){
 let r=RC.get(key);if(r)return r.c;r={c:null};RC.set(key,r);
 if(RC.size>1200){let n=0;for(const k of RC.keys()){if(n++>300)break;RC.delete(k)}}
 FULL=1;let inner='';try{inner=make()}catch(e){}FULL=0;
 RQ.push({r,inner,vb,w:Math.max(1,Math.round(w)),h:Math.max(1,Math.round(h))});pumpR();return null;
}
function pumpR(){
 while(rcN<6&&RQ.length){const j=RQ.shift();rcN++;const img=new Image(),fin=()=>{rcN--;pumpR()};
  img.onload=()=>{try{const c=document.createElement('canvas');c.width=j.w;c.height=j.h;c.getContext('2d').drawImage(img,0,0,j.w,j.h);j.r.c=c}catch(e){}fin()};
  img.onerror=fin;
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${j.vb.join(' ')}" width="${j.w}" height="${j.h}">${SVGDEFS}${j.inner}</svg>`)}
}
const BIGK={krakenB:1,transp:1,dsombra:1,drey:1,portaav:1,destructor:1,kraken:1,dino:1,nodriza:1,quimera:1,acorazado:1,infierno:1,espada:1,ronin:1,submarino:1,coloso:1,titan:1,hidra:1,fortvol:1,aracno:1,mecha:1,dragon:1,dfuego:1,dhielo:1,delec:1,fenix:1,b2:1,bombardero:1,tanvol:1,caza:1,helicoptero:1};
const uvb=k=>BIGK[k]?[-60,-80,220,210]:[-20,0,140,128],SVB=[-30,-50,160,180];
/* sprite de una tropa: px = cuántos píxeles reales ocupan 100 unidades del dibujo */
const uSpr=(k,l,ai,t,ph,px)=>{const vb=uvb(k);return raster(`u|${k}|${l}|${ai}|${t}|${ph}|${px}`,()=>`<g filter="url(#fol)">${spr(k,l,ai,t,ph)}</g>`,vb,vb[2]/100*px,vb[3]/100*px)};
const sSpr=(kind,team,px)=>raster(`s|${kind}|${team}|${px}`,()=>`<g filter="url(#fol)">${kind==='hq'?FORT(team?'#c23b2b':'#2f7fe0'):ART[kind](2)}</g>`,SVB,SVB[2]/100*px,SVB[3]/100*px);
/* Prepara en los ratos libres las imágenes que va a necesitar la próxima batalla */
let PW=null;
function prewarm(){
 if(BT||RQ.length||rcN||document.hidden||busyUI())return;
 if(!PW){const W=innerWidth,H=innerHeight-90,bw=Math.max(50,Math.min(96,(W-8)/(GB+1),(H-8)/(GB*.5+2.3))),w=(GB+1)*bw,hh=(GB*.5+2.3)*bw,
   s=Math.min(LITE?1.5:3,devicePixelRatio||1,Math.sqrt((LITE?2.2e6:9e6)/(w*hh))),px=Math.round(bw*Math.min(3,Math.max(1,Math.round(s*2)/2))/8)*8,dirs=[];for(let a=0;a<ANG;a+=LITE?3:2)dirs.push(a);
  PW=[];const mine=Object.keys(U).filter(u=>S.troops[u]>0),all=Object.keys(U).filter(u=>!U[u].hero);
  for(const u of mine)for(const a of dirs)PW.push(()=>uSpr(u,S.ulv[u],a,0,0,px));
  for(const k in DEFS)for(const t of[0,1])PW.push(()=>sSpr(k,t,px));
  for(const u of all)for(const a of dirs)PW.push(()=>uSpr(u,1,a,1,0,px));}
 for(let n=0;n<2&&PW.length;n++)PW.shift()();
}
setInterval(prewarm,250);
function darkC(c){if(c._d)return c._d;const d=document.createElement('canvas');d.width=c.width;d.height=c.height;const g=d.getContext('2d');g.drawImage(c,0,0);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(26,20,14,.74)';g.fillRect(0,0,d.width,d.height);c._d=d;return d}
/* ---------- batalla dibujada en un lienzo: tropas, restos, partículas y marcas en el piso ---------- */
let BV=null;
const btScale=()=>{const w=(GB+1)*btw,h=(GB*.5+2.3)*btw;return Math.min(LITE?1.5:3,(devicePixelRatio||1)*bz,Math.sqrt((LITE?2.2e6:9e6)/(w*h)))};
function btResize(){
 const V=BV,w=(GB+1)*btw,h=(GB*.5+2.3)*btw,s=btScale();V.scale=s;V.w=w;V.h=h;V.rb=Math.min(3,Math.max(1,Math.round(s*2)/2));
 for(const c of[V.cv,V.dec]){c.width=Math.round(w*s);c.height=Math.round(h*s);c.style.width=w+'px';c.style.height=h+'px'}
 V.dctx.setTransform(s,0,0,s,0,0);for(const d of V.D)decal(d,1);
}
/* edificios que se rompen por partes: rajaduras y quemado, después sin techo */
function dmgC(c,lv){c._dm=c._dm||{};if(c._dm[lv])return c._dm[lv];const d=document.createElement('canvas');d.width=c.width;d.height=c.height;const g=d.getContext('2d'),W=d.width,H=d.height;g.drawImage(c,0,0);
 let sd=lv*97+W;const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280};
 g.globalCompositeOperation='source-atop';
 for(let k=0;k<(lv>1?9:5);k++){const x=W*(.2+R()*.6),y=H*(.25+R()*.55),r=W*(.06+R()*.12),gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(20,14,10,.75)');gr.addColorStop(1,'rgba(20,14,10,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}
 g.strokeStyle='rgba(15,10,8,.85)';g.lineWidth=Math.max(1,W/70);
 for(let k=0;k<(lv>1?6:3);k++){let x=W*(.25+R()*.5),y=H*(.3+R()*.3);g.beginPath();g.moveTo(x,y);for(let s=0;s<5;s++){x+=(R()-.5)*W*.12;y+=H*(.03+R()*.05);g.lineTo(x,y)}g.stroke()}
 if(lv>1){g.fillStyle='rgba(30,22,16,.28)';g.fillRect(0,0,W,H);g.globalCompositeOperation='destination-out';g.beginPath();g.moveTo(0,0);g.lineTo(W,0);let y=H*.36;g.lineTo(W,y);for(let x=W;x>=0;x-=W/9){y=H*(.3+R()*.14);g.lineTo(x,y)}g.closePath();g.fill()}
 c._dm[lv]=d;return d}
function rubble(g,d){let sd=Math.round(d.x*7+d.y*13);const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280},r=d.r;
 for(let k=0;k<14;k++){const a=R()*6.283,q=Math.sqrt(R())*r*.8,x=d.x+Math.cos(a)*q,y=d.y+Math.sin(a)*q*.5-r*.08,s=r*(.08+R()*.13),c=['#6d655c','#857a6c','#5a524a','#9a8e7e','#7a4f2a'][k%5];
  g.fillStyle=c;g.beginPath();g.moveTo(x-s,y);g.lineTo(x-s*.4,y-s*.9);g.lineTo(x+s*.6,y-s*.7);g.lineTo(x+s,y+s*.1);g.lineTo(x,y+s*.45);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.moveTo(x-s*.4,y-s*.9);g.lineTo(x+s*.6,y-s*.7);g.lineTo(x+s*.1,y-s*.3);g.closePath();g.fill()}
 g.strokeStyle='#4a2f18';g.lineWidth=Math.max(1.5,r*.05);for(let k=0;k<3;k++){const x=d.x+(R()-.5)*r,y=d.y+(R()-.5)*r*.4;g.beginPath();g.moveTo(x-r*.2,y+r*.05);g.lineTo(x+r*.2,y-r*.1);g.stroke()}}
function decal(d,re){
 const V=BV;if(!V)return;if(!re){V.D.push(d);if(V.D.length>140)V.D.shift()}
 const g=V.dctx,r=d.r,gr=g.createRadialGradient(d.x,d.y,0,d.x,d.y,r);gr.addColorStop(0,'rgba(24,18,12,.78)');gr.addColorStop(.6,'rgba(40,30,20,.45)');gr.addColorStop(1,'rgba(40,30,20,0)');
 g.fillStyle=gr;g.beginPath();g.ellipse(d.x,d.y,r,r*.5,0,0,6.283);g.fill();if(d.rub)rubble(g,d);
}
function btInit(b){b.onSpawn=o=>{o.tm=o.side^(b.raid?1:0);if(o.kind==='marine'&&BV){const[px,py]=bpos(o.x,o.y);for(let i=0;i<3;i++)fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.3,y:py-btw*.6,vx:0,vy:.01*btw,life:700,r0:btw*.05,r1:btw*.1,col:'240,240,240'})}};if(b.pvp){const f=b.onSpawn;b.onSpawn=o=>{const r=Math.random;Math.random=REALR;try{f(o)}finally{Math.random=r}}}
 const L=$('#btents');L.innerHTML='<canvas id="btdec"></canvas><canvas id="btcv"></canvas>';
 const cv=$('#btcv'),dec=$('#btdec');BV={cv,dec,ctx:cv.getContext('2d'),dctx:dec.getContext('2d'),P:[],W:[],D:[],shake:0};
 b.E.forEach((x,i)=>{x.ix=i;x.tm=x.side^(b.raid?1:0);x.yaw=x.yawT=x.side?Math.PI/2:-Math.PI/2});
 {const m=$('#btmap');m.style.transform='';m.style.transformOrigin='';if(m.getAnimations)m.getAnimations().forEach(a=>a.cancel())}btResize();b.t0=now();
}
const fxAdd=p=>{const V=BV;if(!V)return;if(V.P.length>(LITE?160:450))V.P.shift();p.t=0;V.P.push(p)};
function boom(x,y,sz,ice){
 const V=BV;if(!V)return;fxAdd({k:'fb',x,y,life:380,r:btw*.22*sz,ice});fxAdd({k:'rg',x,y,life:330,r:btw*.42*sz});
 for(let i=0;i<(LITE?3:7)*sz;i++){const a=Math.random()*6.28,v=(.05+Math.random()*.12)*btw;fxAdd({k:'sp',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.6-v*.6,life:420+Math.random()*250,col:ice?'#bdf0ff':'#ffd27a'})}
 for(let i=0;i<(LITE?1:3)*sz;i++)fxAdd({k:'sm',x:x+(Math.random()-.5)*btw*.2,y,vx:(Math.random()-.5)*.01*btw,vy:-.012*btw,life:1300+Math.random()*700,r0:btw*.07*sz,r1:btw*.28*sz,col:ice?'200,230,245':'58,56,54'});
 V.shake=Math.min(9,V.shake+2.2*sz);
}
function deathFx(x){
 const V=BV;if(!V)return;if(x.st)V.shake=Math.min(14,V.shake+(x.kind==='hq'?11:x.kind==='muro'?1.5:3.5));const[px,py]=bpos(x.x,x.y),c=x.lc,vb=x.lvb,k=btw/100;
 if(x.cls==='inf'){for(let i=0;i<2;i++)fxAdd({k:'sm',x:px,y:py-btw*.1,vx:(Math.random()-.5)*.02*btw,vy:-.006*btw,life:900,r0:btw*.05,r1:btw*.16,col:'176,160,130'});
  if(c)V.W.push({c,x:px-btw/2+vb[0]*k,y:py-btw*.95+vb[1]*k,w:vb[2]*k,h:vb[3]*k,t:0,life:450});return}
 const y=py-btw*(x.fly?.45:x.st?.35:.15);boom(px,y,x.st||x.cls==='mec'||x.fly?1.7:1.3,0);
 for(let i=0;i<(LITE?4:11);i++){const a=Math.random()*6.28,v=(.08+Math.random()*.16)*btw;fxAdd({k:'db',x:px,y,vx:Math.cos(a)*v,vy:-Math.abs(Math.sin(a))*v-.05*btw,life:900,rot:Math.random()*6,vr:(Math.random()-.5)*.03,s:btw*(.025+Math.random()*.035)})}
 decal({x:px,y:py,r:btw*(x.st?.55:.38),rub:x.st&&x.kind!=='muro'?1:0});if(x.st&&x.kind==='hq')btPunch(1.06);else if(x.st)btPunch(1.02);
 if(c&&!x.fly)V.W.push({c:darkC(c),x:px-btw/2+vb[0]*k,y:py-btw*.95+vb[1]*k,w:vb[2]*k,h:vb[3]*k,t:0,life:6000,smk:1,px,py});
}
function btFx(a,t){
 shotSnd(a);const V=BV;if(!V)return;
 const[x0,y0]=bpos(a.x,a.y),[x1,y1]=bpos(t.x,t.y),ux=x0,uy=y0-btw*(a.fly?.5:a.st?.45:.22),vx=x1,vy=y1-btw*(t.fly?.45:.2);
 const big=a.cls==='veh'||a.cls==='mec'||a.kind==='mortero'||a.kind==='bazuca'||a.kind==='bombardero'||a.kind==='b2'||(U[a.kind]||{}).drg,fire=(U[a.kind]||{}).drg&&a.kind!=='dhielo',ice=a.kind==='dhielo';
 if(a.kind==='laser'||a.kind==='tesla'||a.kind==='delec'){fxAdd({k:'bm',x0:ux,y0:uy,x1:vx,y1:vy,life:170,col:a.kind==='laser'?'255,59,48':'127,227,255'});t.hf=performance.now();fxAdd({k:'fl',x:vx,y:vy,life:120,r:btw*.12,col:a.kind==='laser'?'255,120,90':'160,235,255'});return}
 const ad=UD(a.kind);
 if(a.kind==='llamas'||a.kind==='llamat'||a.kind==='infierno'){for(let i=0;i<(LITE?3:7);i++){const q=Math.random();fxAdd({k:'fl',x:ux+(vx-ux)*q,y:uy+(vy-uy)*q,life:220+Math.random()*120,r:btw*(.06+q*.12),col:'255,120,30'})}t.hf=performance.now();return}
 if(ad.emp){fxAdd({k:'bm',x0:ux,y0:uy,x1:vx,y1:vy,life:220,col:'127,227,255'});fxAdd({k:'rg',x:vx,y:vy,life:500,r:btw*.5});t.hf=performance.now();return}
 if(ad.kam){boom(vx,vy,.9,0);return}
 if(!ad.dmg&&!a.st)return;
 fxAdd({k:'fl',x:ux,y:uy,life:90,r:btw*(big?.17:.085),col:fire?'255,150,60':'255,220,120'});
 const dist=Math.hypot(vx-ux,vy-uy),d=Math.max(70,dist/(big?.5:1.5));
 if(big)fxAdd({k:'sh',x0:ux,y0:uy,x1:vx,y1:vy,d,s:btw*(fire||ice?.06:.035),col:ice?'159,232,255':fire?'255,140,50':'255,240,190',tg:t,gr:!t.fly,ice,arc:a.kind==='mortero'||a.kind==='rart'||a.kind==='arti'||a.kind==='costa'||a.kind==='destructor'||a.kind==='acorazado'?dist*.45:0});
 else{fxAdd({k:'tr',x0:ux,y0:uy,x1:vx,y1:vy,d,col:a.tm?'255,138,106':'255,214,110',tg:t});if(!LITE&&a.cls==='inf'&&Math.random()<.6)fxAdd({k:'cs',x:ux,y:uy,vx:(vx>ux?-1:1)*(.02+Math.random()*.03)*btw,vy:-(.04+Math.random()*.03)*btw,life:520,rot:0,vr:(Math.random()-.5)*.05,gy:uy+btw*.24})}
}
function stepFx(dt){
 const V=BV,sp=BT?BT.speed:1,g=.00055*btw;
 for(let i=V.P.length-1;i>=0;i--){const p=V.P[i];
  if(p.k==='tr'||p.k==='sh'){p.t+=dt*sp;if(p.t>=p.d){V.P.splice(i,1);const T=p.tg;if(T&&!T.gone)T.hf=performance.now();
    if(p.k==='sh'){boom(p.x1,p.y1,p.ice?1.1:.85,p.ice);if(p.gr&&!LITE)decal({x:p.x1,y:p.y1+btw*.2,r:btw*.18})}
    else{const T2=p.tg,hard=T2&&(T2.st||T2.cls==='veh'||T2.cls==='mec');for(let j=0;j<(hard?(LITE?3:6):2);j++)fxAdd({k:'sp',x:p.x1,y:p.y1,vx:(Math.random()-.5)*(hard?.16:.08)*btw,vy:-Math.random()*(hard?.1:.06)*btw,life:hard?340:260,col:hard?(Math.random()<.5?'255,255,230':'255,190,90'):'255,230,160'});
     if(!hard&&!LITE&&T2&&!T2.fly)fxAdd({k:'sm',x:p.x1,y:p.y1+btw*.05,vx:0,vy:-.002*btw,life:420,r0:btw*.03,r1:btw*.09,col:'150,130,100'})}
   }continue}
  p.t+=dt;if(p.t>=p.life){V.P.splice(i,1);continue}
  if(p.vx!=null){p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;if(p.k==='sp'||p.k==='db'||p.k==='cs')p.vy+=g*dt/16*3;if(p.k==='cs'){p.rot+=p.vr*dt;if(p.y>p.gy){p.y=p.gy;p.vy*=-.35;p.vx*=.5}}if(p.k==='db')p.rot+=p.vr*dt}
 }
 if(BT&&!LITE)for(const o of BT.E){if(!o.st||o.hp<=0||!o.max||o.hp>o.max*.6)continue;const r=o.hp/o.max;if(Math.random()<dt*(r<.3?.012:.005)){const[px,py]=bpos(o.x,o.y),y=py-btw*.55;fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.25,y,vx:.006*btw,vy:-.014*btw,life:1700,r0:btw*.05,r1:btw*.26,col:r<.3?'30,28,26':'70,66,62'});if(r<.3&&Math.random()<.5)fxAdd({k:'fl',x:px+(Math.random()-.5)*btw*.3,y:y+btw*.15,life:260,r:btw*.09,col:'255,120,30'})}}
 for(let i=V.W.length-1;i>=0;i--){const w=V.W[i];w.t+=dt;if(w.t>=w.life)V.W.splice(i,1);else if(w.smk&&!LITE&&Math.random()<dt*.004)fxAdd({k:'sm',x:w.px+(Math.random()-.5)*btw*.2,y:w.py-btw*.25,vx:.004*btw,vy:-.01*btw,life:1500,r0:btw*.05,r1:btw*.22,col:'40,38,36'})}
}
function drawFx(ctx){
 const V=BV,now_=performance.now();
 for(const p of V.P){
  if(p.k==='sm'){const q=p.t/p.life,r=p.r0+(p.r1-p.r0)*q;ctx.fillStyle=`rgba(${p.col},${(.45*(1-q)).toFixed(3)})`;ctx.beginPath();ctx.arc(p.x,p.y,r,0,6.283);ctx.fill()}
  else if(p.k==='cs'){const q=p.t/p.life;ctx.save();ctx.globalAlpha=1-q*q;ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle='#e0b44a';ctx.fillRect(-btw*.012,-btw*.005,btw*.024,btw*.01);ctx.restore()}
  else if(p.k==='db'){const q=p.t/p.life;ctx.save();ctx.globalAlpha=1-q*q;ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle='#2b2d31';ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.7);ctx.restore()}
 }
 ctx.globalCompositeOperation='lighter';
 for(const p of V.P){
  if(p.k==='tr'){const q=p.t/p.d,x=p.x0+(p.x1-p.x0)*q,y=p.y0+(p.y1-p.y0)*q,dx=p.x1-p.x0,dy=p.y1-p.y0,L=Math.hypot(dx,dy)||1,s=Math.min(btw*.22,L*q);
   ctx.strokeStyle=`rgba(${p.col},.95)`;ctx.lineWidth=Math.max(1.2,btw*.022);ctx.beginPath();ctx.moveTo(x-dx/L*s,y-dy/L*s);ctx.lineTo(x,y);ctx.stroke()}
  else if(p.k==='sh'){const q=p.t/p.d,x=p.x0+(p.x1-p.x0)*q,y=p.y0+(p.y1-p.y0)*q-(p.arc?Math.sin(q*Math.PI)*p.arc:0);
   ctx.fillStyle=`rgba(${p.col},.35)`;ctx.beginPath();ctx.arc(x,y,p.s*2.2,0,6.283);ctx.fill();ctx.fillStyle=`rgba(${p.col},1)`;ctx.beginPath();ctx.arc(x,y,p.s,0,6.283);ctx.fill()}
  else if(p.k==='bm'){const q=p.t/p.life;ctx.strokeStyle=`rgba(${p.col},${(.9*(1-q)).toFixed(3)})`;ctx.lineWidth=btw*.07*(1-q*.5);ctx.beginPath();ctx.moveTo(p.x0,p.y0);ctx.lineTo(p.x1,p.y1);ctx.stroke();
   ctx.strokeStyle=`rgba(255,255,255,${(1-q).toFixed(3)})`;ctx.lineWidth=btw*.02;ctx.stroke()}
  else if(p.k==='fl'||p.k==='fb'){const q=p.t/p.life,r=p.k==='fl'?p.r*(1.2-q*.6):p.r*(.45+q*.9),gr=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r),a=1-q;
   if(p.k==='fl'){gr.addColorStop(0,`rgba(255,255,240,${a})`);gr.addColorStop(.4,`rgba(${p.col},${a*.9})`);gr.addColorStop(1,`rgba(${p.col},0)`)}
   else if(p.ice){gr.addColorStop(0,`rgba(255,255,255,${a})`);gr.addColorStop(.45,`rgba(160,235,255,${a*.85})`);gr.addColorStop(1,'rgba(73,182,255,0)')}
   else{gr.addColorStop(0,`rgba(255,250,220,${a})`);gr.addColorStop(.35,`rgba(255,190,80,${a*.95})`);gr.addColorStop(.7,`rgba(230,80,30,${a*.7})`);gr.addColorStop(1,'rgba(120,30,10,0)')}
   ctx.fillStyle=gr;ctx.beginPath();ctx.arc(p.x,p.y,r,0,6.283);ctx.fill()}
  else if(p.k==='rg'){const q=p.t/p.life,r=p.r*(.25+q);ctx.strokeStyle=`rgba(255,235,200,${(.55*(1-q)).toFixed(3)})`;ctx.lineWidth=btw*.025*(1-q);ctx.beginPath();ctx.ellipse(p.x,p.y+btw*.1,r,r*.5,0,0,6.283);ctx.stroke()}
  else if(p.k==='sp'){const q=p.t/p.life;ctx.strokeStyle=p.col[0]==='#'?p.col:`rgba(${p.col},${1-q})`;ctx.globalAlpha=1-q;ctx.lineWidth=Math.max(1,btw*.015);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*1.5,p.y-p.vy*1.5);ctx.stroke();ctx.globalAlpha=1}
 }
 ctx.globalCompositeOperation='source-over';
}
/* ---------- terreno, zona de despliegue y niebla en la batalla ---------- */
function terrSvg(sp){const N=GB,W=N*100,M=N*50,E=N*50+110,P=(u,v)=>[(u-v)*50+M,(u+v)*25+110],pts=a=>a.map(([u,v])=>P(u,v).join(',')).join(' ');let s='';
 if(sp.riv){const r=sp.riv.r;s+=`<polygon points="${pts([[0,r],[N,r],[N,r+1],[0,r+1]])}" fill="#2f7fc6"/><polygon points="${pts([[0,r+.2],[N,r+.2],[N,r+.8],[0,r+.8]])}" fill="#4aa3e8" opacity=".7"/><polyline points="${pts([[0,r],[N,r]])}" fill="none" stroke="#d8f3ff" stroke-width="3" opacity=".7"/><polyline points="${pts([[0,r+1],[N,r+1]])}" fill="none" stroke="#d8f3ff" stroke-width="3" opacity=".7"/>`;
  for(const c of sp.riv.br){s+=`<polygon points="${pts([[c+.1,r-.08],[c+.9,r-.08],[c+.9,r+1.08],[c+.1,r+1.08]])}" fill="#8a5a2b" stroke="#5b3a1c" stroke-width="2"/>`;for(let k=1;k<6;k++)s+=`<polyline points="${pts([[c+.1,r-.08+k*.193],[c+.9,r-.08+k*.193]])}" stroke="#6b4520" stroke-width="1.6"/>`}}
 for(const[c,r]of sp.rocks||[]){const[gx,gy]=P(c,r),hh=14+((c*7+r*3)%5)*4;s+=`<g transform="translate(${gx-50},${gy-70})">${pg([[.06,.06],[.94,.06],[.94,.94],[.06,.94]],'#8b8577')+box(.14,.16,.86,.84,0,hh,'#8a8378')+pyr(.12,.14,.88,.86,hh,12,'#a39a8a')+box(.5,.18,.84,.5,hh,hh+8,'#7a7366')}</g>`}
 return s?`<svg viewBox="0 0 ${W} ${E+110}" width="${N*btw}" height="${(N*.5+2.2)*btw}" style="position:absolute;left:${btw/2}px;top:0;pointer-events:none">${s}</svg>`:''}
const depIn=(b,x,y,nav)=>{if(nav)return true;if(x<.3||x>GB-.3||y<.3||y>GB-.3)return false;if(!(y>=GB-3||((x<1.8||x>GB-1.8)&&y>=GB*.5)))return false;if(b.blk.has(Math.floor(x)+','+Math.floor(y)))return false;for(const o of b.E)if(o.side===1&&o.st&&o.hp>0&&Math.hypot(o.x-x,o.y-y)<1.4)return false;return true};
function btUnder(ctx,b){if(b.td&&!b.over){ctx.save();ctx.fillStyle='rgba(120,190,255,.13)';ctx.strokeStyle='rgba(160,215,255,.35)';ctx.lineWidth=1;for(let r=0;r<=GB-4;r++)for(let c=0;c<GB;c++){if(!tdOk(b,c+.5,r+.5))continue;const a=bpos(c,r),q=bpos(c+1,r),w=bpos(c+1,r+1),z=bpos(c,r+1);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(q[0],q[1]);ctx.lineTo(w[0],w[1]);ctx.lineTo(z[0],z[1]);ctx.closePath();ctx.fill();ctx.stroke()}ctx.restore();return}
 if(!b.dep||!b.E.some(x=>x.off))return;ctx.save();ctx.fillStyle='rgba(110,230,130,.16)';ctx.strokeStyle='rgba(150,255,170,.45)';ctx.lineWidth=1;
 for(let r=0;r<GB;r++)for(let c=0;c<GB;c++){if(!depIn(b,c+.5,r+.5))continue;const a=bpos(c,r),q=bpos(c+1,r),w=bpos(c+1,r+1),z=bpos(c,r+1);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(q[0],q[1]);ctx.lineTo(w[0],w[1]);ctx.lineTo(z[0],z[1]);ctx.closePath();ctx.fill();ctx.stroke()}ctx.restore()}
function btFog(b){const V=BV;if(!V)return;if(!V.fog){const c=document.createElement('canvas');c.id='btfog';$('#btmap').appendChild(c);V.fog=c;V.fctx=c.getContext('2d');V.fk=''}
 const c=V.fog;c.style.display=b.fog?'':'none';if(!b.fog)return;const fs=LITE?.4:.6,k=V.w+'x'+V.h;if(V.fk!==k){V.fk=k;c.width=Math.round(V.w*fs);c.height=Math.round(V.h*fs);c.style.width=V.w+'px';c.style.height=V.h+'px'}
 const g=V.fctx;g.setTransform(fs,0,0,fs,0,0);g.globalCompositeOperation='source-over';g.clearRect(0,0,V.w,V.h);g.fillStyle='rgba(12,18,30,.72)';g.fillRect(0,0,V.w,V.h);g.globalCompositeOperation='destination-out';
 const R=3.6*btw*.72;for(const x of b.E){if(x.side!==(b.raid?1:0)||x.hp<=0||x.off)continue;const[px,py]=bpos(x.x,x.y);g.save();g.translate(px,py);g.scale(1,.5);const gr=g.createRadialGradient(0,0,R*.35,0,0,R);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,6.283);g.fill();g.restore()}
 g.globalCompositeOperation='source-over'}
/* ---------- despliegue manual: elegís la tropa y tocás la zona verde para soltarla ---------- */
function depCounts(b){const m={};for(const x of b.E)if(x.off&&x.hp>0){const o=m[x.kind]||(m[x.kind]={n:0,s:0});o.n+=x.m;o.s++}return m}
function depUI(b){const el=$('#btdep');if(!el)return;const m=depCounts(b),ks=Object.keys(m);if(!b.dep||!ks.length){el.classList.remove('on');return}
 if(!m[b.sel])b.sel=ks[0];el.classList.add('on');
 el.innerHTML=`<div class="dph">${b.go?'Soltá más tropas cuando quieras':'Tocá la <b>zona verde</b> para soltar tus tropas'}</div><div class="dpl">${ks.map(k=>`<button class="dpc ${k===b.sel?'on':''}" data-dk="${k}"><i>${U[k].e||ue(k)}</i><b>${m[k].n}</b><small>${U[k].n}</small></button>`).join('')}<button class="dpc all" data-dk="*"><i>⏬</i><b>Todas</b><small>al frente</small></button></div>`}
function depOne(b,x,y){const e=b.E.find(o=>o.off&&o.hp>0&&o.kind===b.sel);if(!e)return false;const nav=!!e.nav;if(!depIn(b,x,y,nav))return false;
 e.off=0;if(nav){e.rs=ringS(x,y);[e.x,e.y]=ringP(e.rs)}else{e.x=Math.max(.3,Math.min(GB-.3,x+(Math.random()-.5)*.4));e.y=Math.max(.3,Math.min(GB-.3,y+(Math.random()-.5)*.3))}
 e.t=Math.random()*e.cd;e.tg=null;e.rt=0;const[px,py]=bpos(e.x,e.y);for(let i=0;i<5;i++)fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.4,y:py,vx:(Math.random()-.5)*.02*btw,vy:-.005*btw,life:600,r0:btw*.05,r1:btw*.16,col:'220,235,210'});
 b.go=1;return true}
function depTap(cx,cy){const b=BT;if(!b||!b.dep||b.over)return;const r=$('#btmap').getBoundingClientRect(),lx=(cx-r.left)/bz,ly=(cy-r.top)/bz,a=(lx-(GB+1)*btw/2)/(btw/2),s=(ly-btw*1.1)/(btw/4),x=(a+s)/2,y=(s-a)/2;
 if(!b.E.some(o=>o.off))return;if(depOne(b,x,y)){sfx('dep');depUI(b)}else{const e=b.E.find(o=>o.off&&o.kind===b.sel);toast(e&&e.nav?'⚓ Los barcos se sueltan en el agua':'📍 Soltalas en la zona verde, lejos de las defensas')}}
function depAll(b){let g=0;for(const e of b.E){if(!e.off||e.hp<=0)continue;b.sel=e.kind;let ok=false;for(let t=0;t<30&&!ok;t++)ok=depOne(b,1+Math.random()*(GB-2),GB-2.6+Math.random()*2.3);if(!ok){e.off=0;b.go=1}if(++g>200)break}sfx('click');depUI(b)}
function drawBattle(dt){
 const b=BT,V=BV;if(!b||!V)return;
 if(Math.abs(btScale()-V.scale)>.05)btResize();
 const ctx=V.ctx,k=btw/100,px100=Math.round(btw*V.rb/8)*8,nw=performance.now();
 if(V.shake>.2){V.shake*=Math.pow(.9,dt/16);$('#btmap').style.transform=`translate(${((Math.random()-.5)*V.shake).toFixed(1)}px,${((Math.random()-.5)*V.shake).toFixed(1)}px)`}else if(V.shake){V.shake=0;$('#btmap').style.transform=''}
 stepFx(dt);
 ctx.setTransform(V.scale,0,0,V.scale,0,0);ctx.clearRect(0,0,V.w,V.h);
 for(const w of V.W){ctx.globalAlpha=Math.max(0,Math.min(1,(1-w.t/w.life)*2));ctx.drawImage(w.c,w.x,w.y,w.w,w.h)}ctx.globalAlpha=1;btUnder(ctx,b);
 const list=[];for(const x of b.E){if(x.gone||x.off||(x.hid&&!b.raid))continue;if(x.hp<=0){x.gone=1;deathFx(x);continue}list.push(x)}
 list.sort((p,q)=>(p.fly-q.fly)||((p.x+p.y)-(q.x+q.y)));
 for(const x of list){
  const[px,py]=bpos(x.x,x.y);let c,vb;
  if(x.st&&x.hp<x.max*.62&&!x.krk){const f=x.hp/x.max,rt=dt*(LITE?.0025:.006)*(f<.3?2:1);if(Math.random()<rt)fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.4,y:py-btw*(.35+Math.random()*.25),vx:(Math.random()-.5)*.004*btw,vy:-.012*btw,life:1400,r0:btw*.05,r1:btw*.22,col:f<.3?'40,36,34':'110,104,98'});if(f<.3&&Math.random()<rt*1.4)fxAdd({k:'fl',x:px+(Math.random()-.5)*btw*.35,y:py-btw*(.25+Math.random()*.3),life:260+Math.random()*200,r:btw*(.05+Math.random()*.06),col:'255,140,40'})}
  if(x.krk){vb=uvb('krakenB');c=uSpr('krakenB',1,6,1,LITE?0:Math.floor(nw/260)%4,px100)}else if(x.st){vb=SVB;c=sSpr(x.kind,x.tm,px100);if(c&&x.kind!=='muro'&&x.hp<x.max*.66)c=dmgC(c,x.hp<x.max*.33?2:1)}
  else{x.yaw=turn(x.yaw,x.yawT,dt*.01);const ai=LITE?Math.round(aiOf(x.yaw)/3)*3%ANG:aiOf(x.yaw),ph=!LITE&&(U[x.kind]||{}).drg?Math.floor(nw/160)%4:0;vb=uvb(x.kind);c=uSpr(x.kind,x.tm?1:S.ulv[x.kind],ai,x.tm,ph,px100)}
  if(c){x.lc=c;x.lvb=vb}else{c=x.lc;vb=x.lvb}if(!c)continue;
  const xd=U[x.kind]||{},hid=xd.stl&&!(x.rev>b.time);if(hid)ctx.globalAlpha=x.tm?.12:.38;
  let bob=0;if(x.nav)bob=Math.sin(nw/500+x.ix)*btw*.02;else if(x.fly)bob=Math.sin(nw/420+x.ix)*btw*.035;else if(x.mv&&x.cls==='inf')bob=Math.abs(Math.sin(nw/95+x.ix))*btw*.03;else if(x.mv)bob=Math.sin(nw/60+x.ix)*btw*.006;
  const dx=px-btw/2+vb[0]*k,dy=py-btw*.95+vb[1]*k-bob,dw=vb[2]*k,dh=vb[3]*k;ctx.drawImage(c,dx,dy,dw,dh);ctx.globalAlpha=1;
  if(x.nav&&!LITE&&Math.random()<dt*(x.mv?.02:.006))fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.4,y:py-btw*.02,vx:0,vy:0,life:900,r0:btw*.03,r1:btw*.12,col:'235,248,255'});
  if(x.stun>0&&Math.random()<dt*.02)fxAdd({k:'sp',x:px+(Math.random()-.5)*btw*.3,y:py-btw*(x.st?.4:.2),vx:(Math.random()-.5)*.04*btw,vy:-.02*btw,life:300,col:'127,227,255'});
  if(hid)continue;
  if(x.hf&&nw-x.hf<100){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5;ctx.drawImage(c,dx,dy,dw,dh);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}
  if(!x.st&&!x.fly&&x.mv&&x.cls==='veh'&&!LITE&&Math.random()<dt*.006)fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.2,y:py-btw*.05,vx:0,vy:-.003*btw,life:900,r0:btw*.04,r1:btw*.14,col:'170,150,115'});
  if(x.cls!=='inf'&&x.hp<x.max*.35&&!LITE&&Math.random()<dt*.008)fxAdd({k:'sm',x:px,y:py-btw*(x.fly?.5:.3),vx:.003*btw,vy:-.012*btw,life:1300,r0:btw*.05,r1:btw*.2,col:'35,33,31'});
 }
 drawFx(ctx);btFog(b);
 for(const x of list){
  if(x.krk||x.hp>=x.max||((U[x.kind]||{}).stl&&!(x.rev>b.time)&&x.tm))continue;const[px,py]=bpos(x.x,x.y),bw=btw*(x.st?.7:.5),bx=px-bw/2,by=py-btw*.95+btw*1.2*(x.st?(x.kind==='hq'?-.02:.06):(BHP[x.cls]||40)/100),f=Math.max(0,x.hp/x.max);
  const bh=Math.max(3,btw*.06),rr=bh/2,RR=(X,Y,W,H)=>{ctx.beginPath();if(ctx.roundRect)ctx.roundRect(X,Y,W,H,rr);else ctx.rect(X,Y,W,H);ctx.fill()};ctx.fillStyle='rgba(10,17,25,.78)';RR(bx-1.5,by-1.5,bw+3,bh+3);if(f>0){const g=ctx.createLinearGradient(0,by,0,by+bh);if(x.tm){g.addColorStop(0,'#ff8a6a');g.addColorStop(1,'#c9301a')}else{g.addColorStop(0,'#9cf06f');g.addColorStop(1,'#2f9a2a')}ctx.fillStyle=g;RR(bx,by,Math.max(bh,bw*f),bh)}
  if(x.m>1){const n=Math.ceil(x.hp/x.uhp-1e-9);ctx.font=`900 ${Math.round(btw*.13)}px Nunito,system-ui,sans-serif`;ctx.fillStyle='rgba(0,0,0,.65)';const tx='×'+n,tw2=ctx.measureText(tx).width;ctx.fillRect(bx+bw+2,by-btw*.04,tw2+6,btw*.15);ctx.fillStyle='#fff';ctx.fillText(tx,bx+bw+5,by+btw*.09)}
 }
 const hq=b.E[0],hw=Math.round(hq.hp/hq.max*200)/2+'%',tt='⏱ '+ft((BTMAX-b.time)*1000)+(hq.krk?' · 🐙 '+fmt(Math.round(hq.max-hq.hp)):'');if(hw!==b.hw){b.hw=hw;$('#bthq').style.width=hw}if(tt!==b.tt){b.tt=tt;$('#bttime').textContent=tt}
}

function startBattle(key,live){
 if(key==='k'){const w=krState();if(!w||S.kr.n>=KTRY){toast('🐙 Ya usaste tus ataques de hoy contra el Kraken');return}}
 const e=target(key),army={},mul={};for(const u in U)if(SEL[u]>0){army[u]=SEL[u];mul[u]=[ulm(u),ulm(u)*(1+.25*S.tech.atk)]}
 if(!Object.keys(army).length)return;
 const rc=rations(army);if(key!=='k'&&S.f<rc){toast(`🍗 Te faltan raciones: este ataque necesita ${fmt(rc)} de comida`);return}if(key!=='k')S.f-=rc;
 if(e.pvp){closeSheet();pvAttack(army,e,live,key!=='k'?rc:0);return}
 const b=mkBattle(army,e.spec||enemySpec(eDef(e),e.lvl,seedOf(key,e.lvl)),mul);b.e=e;b.army=army;b.live=live;addHero(b);
 closeSheet();runBattle(b,`Vos ⚔️ ${e.f} ${e.n}`);
}
/* Resuelve una batalla ya armada: al instante, o en la vista en vivo. En una defensa (b.raid) los colores se invierten. */

/* ---------- lluvia de verdad: gotas en capas, salpicaduras y relámpagos ---------- */
let RN=null,VG=null;
function rainStart(){const bt=$('#bt'),k=bt.dataset.wx;if(k!=='lluvia'&&k!=='tormenta')return;
 let c=$('#btrain');if(!c){c=document.createElement('canvas');c.id='btrain';$('#bt').appendChild(c)}
 if(RN)return;const st=k==='tormenta',N=(LITE?90:220)*(st?1.4:1),D=[],SP=[];
 const ctx=c.getContext('2d');let W=0,H=0,dpr=1,last=performance.now(),flash=0,nextF=performance.now()+2500+Math.random()*5000,bolt=null;
 const size=()=>{const sc=$('#btscene');if(sc){c.style.top=sc.offsetTop+'px';c.style.height=sc.offsetHeight+'px'}dpr=Math.min(LITE?1:2,window.devicePixelRatio||1);W=c.clientWidth;H=c.clientHeight;c.width=W*dpr|0;c.height=H*dpr|0;ctx.setTransform(dpr,0,0,dpr,0,0)};size();
 const wind=st?.32:.16;
 const mk=(y)=>{const z=Math.random();return{x:Math.random()*(W+200)-100,y:y==null?Math.random()*H:-20-Math.random()*60,z,v:(.9+z*1.1)*(st?1.25:1),l:8+z*18,a:.12+z*.38,gy:H*(.35+Math.random()*.62)}};
 for(let i=0;i<N;i++)D.push(mk());
 RN=1;
 const loop=t=>{if(!bt.classList.contains('on')||(bt.dataset.wx!=='lluvia'&&bt.dataset.wx!=='tormenta')){RN=null;ctx.clearRect(0,0,W,H);return}
  if(c.clientWidth!==W||c.clientHeight!==H)size();
  const dt=Math.min(50,t-last)*(BT&&BT.speed||1);last=t;ctx.clearRect(0,0,W,H);if(!VG||VG.w!==W||VG.h!==H||VG.st!==st){VG={w:W,h:H,st,g:ctx.createRadialGradient(W/2,H*.42,Math.min(W,H)*.25,W/2,H*.42,Math.max(W,H)*.75)};VG.g.addColorStop(0,st?'rgba(10,20,45,.22)':'rgba(30,50,80,.12)');VG.g.addColorStop(1,st?'rgba(5,10,28,.6)':'rgba(15,28,50,.42)')}ctx.fillStyle=VG.g;ctx.fillRect(0,0,W,H);
  // gotas: trazo con degradé, más largas y opacas las que están cerca
  ctx.lineCap='round';
  const P=[new Path2D(),new Path2D(),new Path2D()],Q=[new Path2D(),new Path2D(),new Path2D()];
  for(const d of D){d.y+=d.v*dt*.9;d.x+=d.v*dt*.9*wind;
   if(d.y>d.gy){if(d.z>.35&&SP.length<90)SP.push({x:d.x,y:d.gy,t:0,s:.6+d.z});Object.assign(d,mk(-1))}
   const L=d.z<.33?0:d.z<.66?1:2,dx=d.l*wind;P[L].moveTo(d.x-dx,d.y-d.l);P[L].lineTo(d.x-dx*.45,d.y-d.l*.45);Q[L].moveTo(d.x-dx*.45,d.y-d.l*.45);Q[L].lineTo(d.x,d.y)}
  for(let L=0;L<3;L++){const a=.28+L*.22;ctx.lineWidth=1+L*.7;ctx.strokeStyle=`rgba(205,228,255,${a*.45})`;ctx.stroke(P[L]);ctx.strokeStyle=`rgba(225,240,255,${a})`;ctx.stroke(Q[L])}
  // salpicaduras: anillo que se abre y dos gotitas que saltan
  for(let i=SP.length-1;i>=0;i--){const p=SP[i];p.t+=dt;const k=p.t/320;if(k>=1){SP.splice(i,1);continue}
   const a=(1-k)*.5;ctx.strokeStyle=`rgba(220,238,255,${a})`;ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(p.x,p.y,1+k*6*p.s,.5+k*2.2*p.s,0,0,6.283);ctx.stroke();
   if(k<.6){ctx.fillStyle=`rgba(225,240,255,${a})`;const h=Math.sin(k/.6*3.14)*5*p.s;ctx.fillRect(p.x-3*k*p.s-1,p.y-h,1.3,1.3);ctx.fillRect(p.x+3*k*p.s,p.y-h*.8,1.3,1.3)}}
  // relámpagos en tormenta
  if(st&&t>nextF){flash=1;nextF=t+4000+Math.random()*7000;const x0=W*(.15+Math.random()*.7);bolt=[[x0,0]];let x=x0,y=0;while(y<H*.55){y+=12+Math.random()*26;x+=(Math.random()-.5)*34;bolt.push([x,y])}
   setTimeout(()=>{try{sfx('thunder')}catch(e){}},250+Math.random()*500)}
  if(flash>0){ctx.fillStyle=`rgba(225,235,255,${flash*.32})`;ctx.fillRect(0,0,W,H);
   if(bolt&&flash>.55){ctx.strokeStyle=`rgba(255,255,255,${flash})`;ctx.lineWidth=2.2;ctx.shadowColor='#bcd4ff';ctx.shadowBlur=14;ctx.beginPath();bolt.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.shadowBlur=0}
   flash-=dt/(flash>.6?90:380);if(flash>.3&&flash<.36)flash=.8}// doble destello
  requestAnimationFrame(loop)};
 requestAnimationFrame(loop)}

/* ---------- nieve, viento y niebla que se mueve ---------- */
let WXR=null;
function wxStart(){const bt=$('#bt'),k=bt.dataset.wx;if(k==='lluvia'||k==='tormenta')return rainStart();if(k!=='nieve'&&k!=='viento'&&k!=='niebla')return;
 let c=$('#btrain');if(!c){c=document.createElement('canvas');c.id='btrain';bt.appendChild(c)}
 if(WXR)return;WXR=1;const ctx=c.getContext('2d');let W=0,H=0,last=performance.now();
 const size=()=>{const sc=$('#btscene');if(sc){c.style.top=sc.offsetTop+'px';c.style.height=sc.offsetHeight+'px'}const dpr=Math.min(LITE?1:1.5,devicePixelRatio||1);W=c.clientWidth;H=c.clientHeight;c.width=W*dpr|0;c.height=H*dpr|0;ctx.setTransform(dpr,0,0,dpr,0,0)};size();
 const R=Math.random,P=[];
 const n=k==='nieve'?(LITE?70:160):k==='viento'?(LITE?25:55):(LITE?7:12);
 const mk=init=>k==='nieve'?{x:R()*W,y:init?R()*H:-10,z:R(),ph:R()*6}:k==='viento'?{x:init?R()*W:-30,y:R()*H,z:R(),r:R()*6,vr:(R()-.5)*.012,c:['#7a9a3a','#a8782e','#c9a040','#5f8a2e'][R()*4|0],st:R()<.35}:{x:init?R()*W:-W*.4,y:H*(.1+R()*.85),r:W*(.18+R()*.25),v:.006+R()*.01,a:.12+R()*.14};
 for(let i=0;i<n;i++)P.push(mk(1));
 const loop=t=>{if(!bt.classList.contains('on')||bt.dataset.wx!==k){WXR=null;ctx.clearRect(0,0,W,H);return}
  if(c.clientWidth!==W)size();const dt=Math.min(50,t-last)*(BT&&BT.speed||1);last=t;ctx.clearRect(0,0,W,H);
  if(k==='nieve'){ctx.fillStyle='rgba(225,238,255,.16)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';
   for(const p of P){p.y+=(.02+p.z*.05)*dt;p.ph+=dt*.002;p.x+=Math.sin(p.ph)*.3+.01*dt;if(p.y>H+5||p.x>W+5)Object.assign(p,mk());ctx.globalAlpha=.45+p.z*.5;ctx.beginPath();ctx.arc(p.x,p.y,.8+p.z*2,0,6.283);ctx.fill()}ctx.globalAlpha=1}
  else if(k==='viento'){
   for(const p of P){const v=(.25+p.z*.35)*dt;p.x+=v;p.y+=Math.sin((p.x+p.r*40)*.02)*.6;p.r+=p.vr*dt;if(p.x>W+30)Object.assign(p,mk());
    if(p.st){ctx.strokeStyle=`rgba(255,255,255,${.1+p.z*.15})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x-30-p.z*40,p.y);ctx.quadraticCurveTo(p.x-15,p.y-4,p.x,p.y);ctx.stroke()}
    else{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.globalAlpha=.85;ctx.beginPath();ctx.ellipse(0,0,2.5+p.z*3,1.2+p.z*1.3,0,0,6.283);ctx.fill();ctx.restore()}}}
  else{ctx.fillStyle='rgba(235,240,245,.16)';ctx.fillRect(0,0,W,H);
   for(const p of P){p.x+=p.v*dt;if(p.x-p.r>W)Object.assign(p,mk());const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(245,248,250,${p.a})`);g.addColorStop(1,'rgba(245,248,250,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(p.x,p.y,p.r,p.r*.45,0,0,6.283);ctx.fill()}}
  requestAnimationFrame(loop)};requestAnimationFrame(loop)}
function btPunch(s){const m=$('#btmap');if(!m||!m.animate||S.eco)return;const t=m.style.transform||'';try{m.animate([{transform:t+' scale('+s+')'},{transform:t}],{duration:300,easing:'cubic-bezier(.2,.9,.3,1)'})}catch(e){}}
function btIntro(b){const m=$('#btmap'),sc=$('#btscene');if(!m||!m.animate||S.eco||b.visit===2)return;try{m.style.transformOrigin='50% 35%';m.animate([{transform:'translateY(14%) scale(1.32)',filter:'brightness(.85)'},{transform:'translateY(6%) scale(1.18)',offset:.45},{transform:'none',filter:'none'}],{duration:2100,easing:'cubic-bezier(.45,0,.2,1)'})}catch(e){}}
function btFinale(b){const m=$('#btmap'),hq=b.E[0];if(!m||!m.animate||!hq||S.eco)return;const[px,py]=bpos(hq.x,hq.y);try{m.style.transformOrigin=`${px}px ${py}px`;m.animate([{transform:'none'},{transform:'scale(1.28)'}],{duration:900,easing:'cubic-bezier(.2,.8,.3,1)',fill:'forwards'})}catch(e){}}
/* ---------- ataques entre jugadores: la batalla se repite igual que en el servidor (misma semilla, pasos fijos) ---------- */
const REALR=Math.random;
function pvRng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function pvSeed(b,fn){const r=Math.random;Math.random=b.rng;try{return fn()}finally{Math.random=r}}
function pvFx(a,t){const r=Math.random;Math.random=REALR;try{btFx(a,t)}finally{Math.random=r}}
function pvBattle(army,spec,mul,seed){spec=JSON.parse(JSON.stringify(spec));army=JSON.parse(JSON.stringify(army));const rng=pvRng(seed),r=Math.random;Math.random=rng;let b;try{b=mkBattle(army,spec,mul)}finally{Math.random=r}b.pvp=1;b.rng=rng;b.pvg=0;const os=b.onSpawn;return b}
function runBattle(b,title){sfx('horn');
 if(!b.visit&&!b.pvp){prepBattle(b);title+=' · '+b.wx.n}else if(b.pvp)b.wx={k:'sol',n:'☀️ Despejado'};if(b.map&&MAPN[b.map])title+=' · '+MAPN[b.map];
 if(!b.live){let g=0;if(b.pvp)pvSeed(b,()=>{while(!b.over&&g++<20000)stepBattle(b,.05)});else while((!b.over||(b.siege&&b.over===2&&nextWave(b)))&&g++<200000)stepBattle(b,.05);endBattle(b);return}
 BT=b;b.speed=1;modalOpen=true;$('#bt').dataset.wx=b.visit?'':b.wx.k;$('#bt').classList.add('on');wxStart();setTimeout(()=>btIntro(b),30);
 const sc=$('#btscene'),mp=$('#btmap'),L=$('#btents');
 btw=Math.max(50,Math.min(96,(sc.clientWidth-8)/(GB+1),((sc.clientHeight||600)-8)/(GB*.5+2.3)));
 mp.style.width=(GB+1)*btw+'px';mp.style.height=(GB*.5+2.3)*btw+'px';
 $('#btgnd').innerHTML=ground(GB,btw,1);$('#btgnd').firstChild.style.left=btw/2+'px';$('#btgnd').insertAdjacentHTML('beforeend',terrSvg(b.spec||{}));
 $('#btskip').textContent=b.visit?'Salir ✕':'Saltar ⏭';$('#btname').innerHTML=title;$('#bthqw').firstChild.textContent=b.raid?'Tu base':'Base enemiga';L.innerHTML='';
 document.querySelectorAll('#btctl [data-sp]').forEach(x=>x.classList.toggle('on',x.dataset.sp==='1'));
 btInit(b);
 b.dep=!b.visit&&!b.raid&&!b.siege&&!b.pvp;b.go=0;b.sel=null;if(b.dep)for(const x of b.E)if(x.side===0&&!x.st)x.off=1;depUI(b);
 if(0)for(const x of b.E){
  const el=document.createElement('div');el.className='be'+(x.st?' st':'');el.style.width=btw+'px';el.style.height=btw*1.2+'px';
  el.innerHTML=`<svg class="art" viewBox="0 0 100 120">${x.st?(x.kind==='hq'?FORT(b.raid?'#2f7fe0':'#c23b2b'):ART[x.kind](2)):''}</svg><div class="bhp${(x.side^(b.raid?1:0))?' en':''}" style="top:${x.st?(x.kind==='hq'?-2:6):BHP[x.cls]}%"><i></i></div>${x.m>1?'<span class="bn"></span>':''}`;
  L.appendChild(el);x.el=el;x.svg=el.firstChild;x.bar=el.children[1].firstChild;x.bn=el.children[2];x.yaw=x.yawT=x.side?Math.PI/2:-Math.PI/2;x.sk='';
 }
 mp.style.zoom=bz=1;drawBattle(0);sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)/2;sc.scrollTop=(sc.scrollHeight-sc.clientHeight)/2;if(sc.clientWidth<700)btZoom(1.9);if(b.dep)requestAnimationFrame(()=>{sc.scrollTop=sc.scrollHeight;sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)/2})
}
/* Disparo visible: un punto que viaja al blanco, un rayo para las torres de energía, y una explosión para lo pesado */
function battleFrame(dt){
 const b=BT;if(b.done){if(b.slowT&&performance.now()-b.slowT<1700)drawBattle(dt*.3);return}
 if(!b.ready){drawBattle(dt);if(b.E.every(x=>x.lc||x.hp<=0)||now()-b.t0>2500)b.ready=1;return}
 if(b.visit){drawBattle(dt);return}
 if(b.dep&&!b.go){drawBattle(dt);return}
 if(b.td){if(b.gap&&b.gap>performance.now()){drawBattle(dt);if(!b._ut||performance.now()-b._ut>400){b._ut=performance.now();tdUI(b)}return}if(b.gap){b.gap=0;tdUI(b)}}
 if(b.pvp){b.acc=(b.acc||0)+dt/1000*b.speed;let g=0;pvSeed(b,()=>{while(b.acc>=.05&&!b.over&&g++<20000&&b.pvg<20000){b.acc-=.05;b.pvg++;stepBattle(b,.05,pvFx)}})}else{let rem=dt/1000*b.speed;while(rem>0&&!b.over){const s=Math.min(.05,rem);stepBattle(b,s,btFx);rem-=s}}
 drawBattle(dt);
 if(b.over===2&&b.siege&&nextWave(b)){if(b.td){b.dp+=220+60*b.wave;b.gap=performance.now()+7000;$('#btname').innerHTML='🗼 Defensa de la torre · oleada '+b.wave;sfx('alert');tdUI(b)}}else if(b.over){b.done=1;depUI(Object.assign(b,{dep:0}));
  if(b.over===1&&!b.raid&&!b.visit&&!(b.e&&b.e.kr)){b.slowT=performance.now();btFinale(b);const hq=b.E[0],[px,py]=bpos(hq.x,hq.y);boom(px,py-btw*.3,2.6,0);setTimeout(()=>boom(px+btw*.3,py-btw*.1,1.6,0),180);setTimeout(()=>boom(px-btw*.3,py-btw*.5,1.8,0),380);
   if(BV)BV.shake=16;const f=$('#btflash');if(f){f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}sfx('boom');setTimeout(()=>endBattle(b),1750)}
  else setTimeout(()=>endBattle(b),800)}
}
function endBattle(b){
 if(b.pvp){pvEnd(b);return}
 if(b.td){tdEnd(b);return}
 if(b.siege){siegeEnd(b);return}
 if(b.raid){raidEnd(b);return}
 if(b.e&&b.e.kr){krEnd(b);return}
 const win=b.over===1,e=b.e,surv={},lostL=[];sfx(win?'win':'lose');if(e.boss)bossHit(b,win);
 if(b.hero&&S.cmd[b.hero.k]){const he=b.E.find(x=>x.hero);if(win)cmdXP(b.hero.k,10*e.lvl);if(he&&he.hp<=0){S.cmd[b.hero.k].inj=now()+600000;toast(`🤕 ${U[b.hero.k].n} quedó herido: vuelve en 10 minutos`)}}
 if(win&&e.rb!=null&&!(S.rbd||{})[e.rb]){S.rbd=S.rbd||{};S.rbd[e.rb]=1;gain(rbRw(e.rb));const it=giveItem(3);toast(`🎖️ ¡Venciste a ${RBOSS[e.rb].n}! ${it?'🧰 '+EQN[it.s][it.c]:''}`)}
 if(win&&S.clan){cwState();S.cw.st++}
 if(win&&e.wrd!=null&&!S.wr[e.wrd]){S.wr[e.wrd]=1;RSC=null;toast(`🌍 ¡Conquistaste ${WR[e.wrd].n}! ${effTxt(WR[e.wrd].e)}`)}
 if(win&&e.story!=null&&e.story>=S.story){S.story=e.story+1;if(STO[e.story].item){const it=giveItem(STO[e.story].item);if(it)toast('🧰 '+EQN[it.s][it.c])}setTimeout(()=>{if(!BT)talk(STO[e.story].post)},400)}
 if(win&&(e.boss||(e.camp!=null&&CAMP[e.camp].boss))){const it=giveItem(2);if(it)toast('🧰 Pieza nueva: '+EQN[it.s][it.c])}
 for(const x of b.E)if(x.side===0)surv[x.kind]=(surv[x.kind]||0)+(x.hp>0?Math.ceil(x.hp/x.uhp-1e-9):0);
 for(const k in b.army){const l=Math.max(0,b.army[k]-(surv[k]||0));S.troops[k]-=l;if(l)lostL.push(ue(k)+'×'+l)}
 let loot=null,xp=2;const cityN=b.E.filter(x=>x.city&&x.hp<=0).length;
 if(win){loot=eLoot(e);if(cityN)loot=mulCost(loot,1+.04*cityN);gain(loot);xp=12*e.lvl;S.stats.won++;winStuff();if(revOn(e))S.rev=null;if(e.isl!=null)S.stats.islc=(S.stats.islc||0)+1;S.stats.maxBeat=Math.max(S.stats.maxBeat,e.lvl);if(e.isl!=null){S.isl[e.isl].o=-1;S.isl[e.isl].lc=now()}else if(e.tour!=null){tourWin()}else if(e.camp!=null){if(e.camp>=S.camp){S.camp=e.camp+1;const bu=CAMP[e.camp].boss;if(bu)for(const k in bu.u)S.troops[k]+=bu.u[k]}}else e.lvl++}
 else{if(cityN&&!e.kr){loot=mulCost(eLoot(e),Math.min(.6,.04*cityN));gain(loot)}S.stats.lost++;lossStuff();if(e.tour!=null){S.tour=null;toast('🏆 Quedaste eliminado del torneo')}}
 save();hud();
 const bajas=`<p class="small">Bajas: ${lostL.join(' ')||'ninguna'}</p>`;
 const stN=win?1+(b.E.filter(x=>x.side===1&&x.st).length&&b.E.filter(x=>x.side===1&&x.st&&x.hp<=0).length>=b.E.filter(x=>x.side===1&&x.st).length*.6?1:0)+(Object.values((b.army||{})).reduce((s,v)=>s+v,0)&&Object.keys((b.army||{})).reduce((s,k)=>s+(surv[k]||0),0)>=Object.values((b.army||{})).reduce((s,v)=>s+v,0)*.5?1:0):0;
 const html=win?`<div class="vrays"></div><div class="vstars" data-n="${stN}"><i>★</i><i class="m">★</i><i>★</i></div><div class="win vwin">¡VICTORIA!</div>${e.isl!=null?'<p><b>🏝️ ¡La isla ahora es tuya y te da oro!</b></p>':''}${e.camp!=null&&CAMP[e.camp].boss?'<p><b>🏆 ¡Jefe derrotado! Se te unen '+unitsTxt(CAMP[e.camp].boss.u)+'.</b></p>':''}<p>Botín: <b>${costPlain(loot)}</b> · +${xp}⭐</p>${cityN?`<p class="small">🏘️ Saqueaste ${cityN} edificios de la ciudad (+${cityN*4}%)</p>`:''}${bajas}`
  :`<div class="lose">DERROTA</div><p>${b.time>=BTMAX?'Se acabó el tiempo y':'Tus tropas cayeron y'} la base de ${e.n} resistió.</p>${loot?`<p>🏘️ Saqueaste ${cityN} edificios: <b>${costPlain(loot)}</b></p>`:''}${bajas}<p class="small">Mirá qué defensas tiene y mandá tropas fuertes contra ellas.</p>`;
 const btns=[['Volver a la base',()=>{$('#bt').classList.remove('on');BT=null;addXP(xp);hud()},'gold']];
 if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns);
 if(win)setTimeout(vAnim,60);
}

/* pantalla de victoria: estrellas que caen de a una, botín que vuela a tus recursos y confeti */
function vAnim(){const box=$('#mbox'),st=box&&box.querySelector('.vstars');if(!st)return;const n=+st.dataset.n,ss=st.querySelectorAll('i');
 ss.forEach((s,k)=>setTimeout(()=>{if(k<n){s.classList.add('on');playS('reward',.6+k*.12)||sfx('coin');vib(25)}else s.classList.add('off')},450+k*420));
 setTimeout(()=>{try{confetti()}catch(e){}flyLoot(box)},450+n*420);}
function flyLoot(box){if(S.eco)return;const r=box.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height*.45;const tg=['#rc','#rf','#ro','#rs','#re'].map(s=>$(s)).filter(Boolean);
 for(let k=0;k<14;k++){const t=tg[k%tg.length],tr=t.getBoundingClientRect(),d=document.createElement('div');d.className='lootf';d.innerHTML=t.parentNode.querySelector('.i').innerHTML;d.style.left=cx+(Math.random()-.5)*60+'px';d.style.top=cy+(Math.random()-.5)*30+'px';document.body.appendChild(d);
  const dx=tr.left+tr.width/2-parseFloat(d.style.left),dy=tr.top+tr.height/2-parseFloat(d.style.top);
  d.animate([{transform:'translate(-50%,-50%) scale(.4)',opacity:0},{transform:`translate(calc(-50% + ${dx*.15}px),calc(-50% + ${dy*.15-40}px)) scale(1.1)`,opacity:1,offset:.25},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.6)`,opacity:.9}],{duration:900+k*45,easing:'cubic-bezier(.5,0,.6,1)',fill:'forwards'}).onfinish=()=>{d.remove();try{bump('#'+t.id)}catch(e){}if(k%3===0)sfx('coin')}}}
