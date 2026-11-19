/* ---------- Motor 3D para las tropas ----------
   Cada tropa es una lista de piezas en el espacio del modelo (x adelante, y a la derecha, z arriba). mesh() las gira
   según hacia dónde mira la tropa, descarta las caras que no se ven, las ilumina según su orientación y las dibuja
   de atrás hacia adelante. Así una misma tropa se ve bien desde 24 ángulos.
   Piezas: ['b',x0,y0,z0,x1,y1,z1,color] caja · ['l',...,color,ancho] caño · ['s',x,y,z,r,color] esfera
           ['q',[puntos],color] placa plana · ['r',x,y,z,R] rotor */
const ANG=24;
let curPh=0,curTx='';const PHS=[0,1,0,-1];
/* Colores militares: se les baja la saturación y el brillo, salvo a luces, vidrios y distintivos */
const GRC={},GLOW={'#aee3ff':1,'#ff3b30':1,'#ff9d2e':1,'#ff5a36':1,'#49b6ff':1,'#f6b51e':1,'#b06cf0':1,'#7fd6ff':1,'#ffe066':1,'#7fe3ff':1};
const grit=c=>GRC[c]||(GRC[c]=(()=>{if(GLOW[c]||typeof c!=='string'||c.length!==7)return c;const r=parseInt(c.substr(1,2),16),g=parseInt(c.substr(3,2),16),b=parseInt(c.substr(5,2),16),L=.3*r+.59*g+.11*b;return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round((v+(L-v)*.32)*.9))).toString(16).padStart(2,'0')).join('')})());
function mesh(parts,yaw){
 const c=Math.cos(yaw),s=Math.sin(yaw),ds=[],nm=[[0,-1],[1,0],[0,1],[-1,0]];
 const pr=(x,y,z)=>{const u=x*c-y*s,v=x*s+y*c;return[+(50+(u-v)*50).toFixed(1),+(95+(u+v)*25-z).toFixed(1),u+v]};
 const poly=(a,f,m)=>{const pt=a.map(p=>p[0]+','+p[1]).join(' ');let s=`<polygon points="${pt}" fill="${f}" stroke="${LO()?f:sh(f,.6)}" stroke-width="${LO()?.4:.45}" stroke-linejoin="round"/>`;
  if(m&&!LO()){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const q of a){x0=Math.min(x0,q[0]);x1=Math.max(x1,q[0]);y0=Math.min(y0,q[1]);y1=Math.max(y1,q[1])}const ar=(x1-x0)*(y1-y0);if(ar>18&&curTx)s+=`<polygon points="${pt}" fill="url(#tx-${curTx})"/>`;if(m===2&&ar>12)s+=`<polygon points="${pt}" fill="url(#gao)"/>`}return s};
 for(const p of parts){
  let h='',d;
  if(p[0]==='b'){
   const[,x0,y0,z0,x1,y1,z1,c0]=p,col=grit(c0),k=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],lo=k.map(q=>pr(q[0],q[1],z0)),hi=k.map(q=>pr(q[0],q[1],z1));
   for(let i=0;i<4;i++){const nu=nm[i][0]*c-nm[i][1]*s,nv=nm[i][0]*s+nm[i][1]*c;if(nu+nv<=.02)continue;const j=(i+1)%4;h+=poly([hi[i],hi[j],lo[j],lo[i]],sh(col,.76+.2*(nv-nu)),z1-z0>5?2:1)}
   h+=poly(hi,sh(col,1.12),1);d=(lo[0][2]+lo[2][2])/2*43.3+(z0+z1)/2*.577;
  }else if(p[0]==='l'){
   const a=pr(p[1],p[2],p[3]),b=pr(p[4],p[5],p[6]);h=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${grit(p[7])}" stroke-width="${p[8]}" stroke-linecap="round"/>`;d=(a[2]+b[2])/2*43.3+(p[3]+p[6])/2*.577+.2;
  }else if(p[0]==='s'){
   const a=pr(p[1],p[2],p[3]);h=ball(a[0],a[1],p[4],grit(p[5]));d=a[2]*43.3+p[3]*.577;
  }else if(p[0]==='q'){
   const a=p[1].map(q=>pr(q[0],q[1],q[2]));h=poly(a,grit(p[2]),1);d=a.reduce((t,q)=>t+q[2],0)/a.length*43.3+p[1].reduce((t,q)=>t+q[2],0)/a.length*.577;
  }else{
   const a=pr(p[1],p[2],p[3]),R=p[4]*70.7;h=`<ellipse cx="${a[0]}" cy="${a[1]}" rx="${R.toFixed(1)}" ry="${(R/2).toFixed(1)}" fill="#1d1d1d" opacity=".14"/><g transform="translate(${a[0]},${a[1]}) scale(1,.5)"><g class="spin"><rect x="${-R}" y="-2.5" width="${2*R}" height="5" rx="2.5" fill="#22262b"/><rect x="-2.5" y="${-R}" width="5" height="${2*R}" rx="2.5" fill="#22262b"/></g></g>`;d=1e6;
  }
  ds.push([d,h]);
 }
 return ds.sort((a,b)=>a[0]-b[0]).map(q=>q[1]).join('');
}
const ACC=[0,0,'#49b6ff','#f6b51e','#ff5a36','#b06cf0','#2fd0c0','#ffe066'];          // color del distintivo según el nivel de la tropa
const pal=(base,t)=>t?['#b0473c','#8c342b','#5e221d']:[base,sh(base,.82),sh(base,.62)];   // t=1: bando enemigo, en rojo
const SKN='#d9a77f',BOOT='#24221e';
const rifle=(y,z,len,c='#1c1c1c')=>[['l',-.05,y,z-1,.05,y,z,'#5b4630',2.6],['l',.05,y,z,.05+len,y,z+1.3,c,1.7],['l',.07,y,z-.5,.085,y,z-3.8,c,1.5]];
const inf=(base,hel,l,t,extra)=>{const[c1,c2,c3]=pal(base,t),a=ACC[l],g=PHS[curPh]||0,lx=.032*g,V=sh(c1,.8),hl=t?c3:hel,p=[
 ['b',-.036+lx,-.07,0,.04+lx,-.016,3,BOOT],['b',-.03+lx*.6,-.066,3,.03+lx*.6,-.02,11,c3],['b',.03+lx*.6,-.064,5.5,.037+lx*.6,-.022,8,sh(c3,.75)],
 ['b',-.036-lx,.016,0,.04-lx,.07,3,BOOT],['b',-.03-lx*.6,.02,3,.03-lx*.6,.066,11,c3],['b',.03-lx*.6,.022,5.5,.037-lx*.6,.064,8,sh(c3,.75)],
 ['b',-.043,-.08,10,.043,.08,13,'#3a3328'],['b',-.045,-.084,13,.045,.084,25,c1],['b',.045,-.07,14,.057,.07,24,V],['b',.057,-.062,15,.065,-.022,19.5,sh(V,.82)],['b',.057,.022,15,.065,.062,19.5,sh(V,.82)],
 ['b',-.088,-.06,14,-.045,.06,24.5,sh(c1,.68)],['b',-.092,-.05,22,-.05,.05,26,sh(c1,.6)],
 ['b',-.032-lx*.5,-.124,13.5,.032-lx*.5,-.084,24.5,c2],['b',-.02-lx*.5,-.118,10.5,.022-lx*.5,-.09,13.5,SKN],['b',-.032,.084,13.5,.032,.124,24.5,c2],
 ['b',-.026,-.03,25,.026,.03,27.5,SKN],['s',0,0,29.6,4.5,SKN],['b',.03,-.032,28.5,.042,.032,30.2,'#22201c'],
 ['b',-.07,-.07,30.4,.072,.07,31.6,sh(hl,.78)],['b',-.058,-.06,31.6,.06,.06,35.5,hl]];
 if(a)p.push(['b',-.034,-.127,20.5,.034,-.082,22.5,a]);return p.concat(extra)};
const tank=(base,l,t,L,W,hz,tz,bl,bw,two)=>{const[c1,c2,c3]=pal(base,t),a=ACC[l],bz=(hz+tz)/2,T='#2e3033',p=[];
 for(const s of[-1,1]){p.push(['b',-L,s<0?-W:W-.09,0,L,s<0?-W+.09:W,7,T]);
  for(let i=0;i<5;i++)p.push(['s',-L+.05+i*(2*L-.1)/4,s*(W+.002),3.3,2.1,'#5a5d63']);
  p.push(['b',-L-.01,s<0?-W-.012:W-.1,7,L+.01,s<0?-W+.1:W+.012,8.4,c3])}
 p.push(['b',-L+.02,-W+.05,4,L-.02,W-.05,hz,c1],['b',L-.07,-W+.07,hz-2,L-.02,W-.07,hz-.5,sh(c1,.88)],['b',-L+.01,-.07,hz-2.5,-L+.05,-.02,hz+1.5,'#2a2a2a'],
  ['b',-.12,-W+.1,hz,.1,W-.1,tz,c2],['b',.1,-.07,hz+1,.15,.07,tz-1,sh(c2,.82)],['s',-.04,W*.35,tz+1.2,2.1,sh(c2,.9)],['l',-.09,-(W-.14),tz,-.09,-(W-.14),tz+13,'#1d1d1d',.6]);
 for(const y of two?[-.05,.05]:[0])p.push(['l',.12,y,bz,.08+bl,y,bz+1,'#2e3328',bw],['l',.05+bl,y,bz+.9,.1+bl,y,bz+1.1,'#1d1f1b',bw*1.5]);
 if(a)p.push(['b',-.07,-.05,tz,.03,.05,tz+1.5,a]);return p};
const MODEL={
 soldado:(l,t)=>({s:9,p:inf('#5f6e3c','#465232',l,t,rifle(.1,19,.15))}),
 marine:(l,t)=>({s:11,p:inf('#4f6b8a','#2f4763',l,t,[['b',-.1,-.065,13,-.045,.065,26,t?'#5e221d':'#34495e'],['b',-.05,-.135,22,.05,-.08,27,t?'#8c342b':'#3d5672'],['b',-.05,.08,22,.05,.135,27,t?'#8c342b':'#3d5672'],['l',.03,.1,18,.2,.1,20,'#1c1c1c',3.2]])}),
 bazuca:(l,t)=>({s:9,p:inf('#8a6a3a','#5f4a2a',l,t,[['l',-.12,.11,27,.16,.11,29,'#3b3d42',4.6],['l',.14,.11,28.8,.17,.11,29.1,'#d9452b',4.6]])}),
 franco:(l,t)=>({s:9,p:inf('#3f5a35','#2c4026',l,t,[['l',0,.1,21,.3,.1,23,'#1c1c1c',1.7],['s',.1,.1,24.5,1.6,'#49b6ff'],['b',-.075,-.07,22,-.045,.07,34,t?'#5e221d':'#2c4026']])}),
 tanque:(l,t)=>({s:24,p:tank('#7a9a4a',l,t,.25,.18,12,19,.3,3,0)}),
 misil:(l,t)=>{const[c1,c2]=pal('#5f7436',t),a=ACC[l],p=[['b',-.3,-.2,0,.3,-.11,6,'#3b3d42'],['b',-.3,.11,0,.3,.2,6,'#3b3d42'],['b',-.28,-.16,4,.3,.16,11,c1],['b',.14,-.14,11,.3,.14,19,c2],['b',.3,-.1,13,.306,.1,17.5,'#aee3ff']];
  for(const y of[-.09,0,.09])p.push(['l',-.26,y,13,.08,y,25,'#e8edf2',3.2],['l',.04,y,23.6,.08,y,25,'#d9452b',3.2]);
  if(a)p.push(['b',-.28,-.16,11,-.2,.16,12.5,a]);return{s:27,p}},
 pesado:(l,t)=>({s:32,p:tank('#55683a',l,t,.36,.26,15,25,.4,4.6,1).concat([['b',-.36,-.285,5,.36,-.26,12,t?'#5e221d':'#3d4a2a'],['b',-.36,.26,5,.36,.285,12,t?'#5e221d':'#3d4a2a']])}),
 helicoptero:(l,t)=>{const[c1,c2]=pal('#718a3f',t),a=ACC[l],z=34,p=[['b',-.13,-.09,z,.15,.09,z+14,c1],['b',.15,-.075,z+2,.22,.075,z+12,'#aee3ff'],['b',-.44,-.022,z+6,-.13,.022,z+10,c2],['b',-.48,-.012,z+6,-.42,.012,z+18,c2],['l',-.1,-.11,z-3,.14,-.11,z-3,'#333',1.6],['l',-.1,.11,z-3,.14,.11,z-3,'#333',1.6],['l',0,-.09,z,0,-.11,z-3,'#333',1.2],['l',0,.09,z,0,.11,z-3,'#333',1.2],['l',0,0,z+14,0,0,z+19,'#333',1.6],['r',0,0,z+19.5,.4]];
  if(a)p.push(['b',-.3,-.024,z+6,-.24,.024,z+10.4,a]);return{s:17,p}},
 robot:(l,t)=>{const[c1,c2,c3]=pal('#8493a3',t),a=ACC[l]||'#f6b51e',g=PHS[curPh]||0,lx=.035*g,J='#2e3540';return{s:15,p:[
  ['b',-.05+lx,-.115,0,.055+lx,-.03,3,J],['b',-.042+lx*.6,-.105,3,.042+lx*.6,-.035,12,c3],['s',.035+lx*.6,-.07,7,1.6,J],
  ['b',-.05-lx,.03,0,.055-lx,.115,3,J],['b',-.042-lx*.6,.035,3,.042-lx*.6,.105,12,c3],['s',.035-lx*.6,.07,7,1.6,J],
  ['b',-.06,-.09,11,.06,.09,14,J],['b',-.08,-.14,14,.08,.14,30,c1],['b',.08,-.08,17,.092,.08,25,a],['b',.08,-.12,26,.088,-.09,29,J],['b',.08,.09,26,.088,.12,29,J],
  ['b',-.1,-.1,18,-.08,.1,28,sh(c1,.75)],['b',-.105,-.08,20,-.1,.08,21.5,'#1d2228'],['b',-.105,-.08,24,-.1,.08,25.5,'#1d2228'],
  ['b',-.06,-.215,26,.06,-.13,32,c2],['b',-.06,.13,26,.06,.215,32,c2],['b',-.045-lx*.4,-.2,14,.045-lx*.4,-.14,27,c3],['b',-.045,.14,14,.045,.2,27,c3],
  ['l',.04,.17,20,.27,.17,21,J,3.4],['l',.25,.17,20.8,.3,.17,21.2,'#111111',4.4],
  ['b',-.055,-.065,30,.06,.065,39,c2],['b',.06,-.05,33,.068,.05,36.5,'#ff3b30'],['l',-.03,-.04,39,-.03,-.04,46,'#333333',.9],['s',-.03,-.04,46.5,1.2,'#ff3b30']]}},
 dragon:(l,t,ph)=>{const[c1,c2,c3]=pal('#8795a5',t),a=ACC[l]||'#ff5a36',z=36,wz=[62,54,43,54][ph],w=s=>['q',[[.1,s*.07,z+10],[-.1,s*.07,z+10],[-.2,s*.46,wz],[.14,s*.4,wz-2]],t?(s<0?'#5e221d':'#74291f'):(s<0?'#4d5866':'#5c6877')];
  return{s:22,p:[['b',-.14,-.07,z,.14,.07,z+11,c1],['b',.14,-.04,z+6,.24,.04,z+16,c2],['b',.24,-.055,z+10,.38,.055,z+20,c1],['b',.38,-.035,z+10,.46,.035,z+16,c3],['s',.33,-.06,z+17,1.7,'#ff3b30'],['s',.33,.06,z+17,1.7,'#ff3b30'],['b',-.26,-.045,z+2,-.14,.045,z+9,c2],['b',-.38,-.03,z+3,-.26,.03,z+8,c1],['b',-.48,-.018,z+4,-.38,.018,z+7,c2],['b',-.54,-.03,z+3,-.48,.03,z+8,a],['b',-.08,-.02,z+11,.1,.02,z+13.5,a],w(-1),w(1),['l',.02,-.05,z,.02,-.05,z-6,c3,2],['l',.02,.05,z,.02,.05,z-6,c3,2]]}},
};
/* spr: dibujo de una tropa (tipo k, nivel l) mirando hacia el ángulo ai de 24; se guarda para no recalcularlo */
const SPC={};
/* Aviones y variantes: un modelo se puede teñir mezclando sus colores con otro (dragones elementales y unidades únicas) */
const mixc=(a,b,k)=>'#'+[1,3,5].map(i=>Math.round(parseInt(a.substr(i,2),16)*(1-k)+parseInt(b.substr(i,2),16)*k).toString(16).padStart(2,'0')).join('');
const tint=(m,col,k)=>(l,t,ph)=>{const r=m(l,t,ph);return t?r:{s:r.s,p:r.p.map(q=>q.map(v=>typeof v==='string'&&v.length===7&&v[0]==='#'&&v!=='#aee3ff'?mixc(v,col,k):v))}};
const wing=(pts,col)=>[1,-1].map(s=>['q',pts.map(p=>[p[0],p[1]*s,p[2]]),col]);
MODEL.caza=(l,t)=>{const[c1,c2,c3]=pal('#8a97a8',t),a=ACC[l],z=40,p=[['b',-.3,-.035,z,.3,.035,z+7,c1],['b',.3,-.02,z+1,.4,.02,z+5,c3],['b',.08,-.03,z+7,.2,.03,z+10,'#aee3ff'],['b',-.3,-.01,z+7,-.2,.01,z+15,c2],...wing([[.1,.035,z+3],[-.16,.035,z+3],[-.26,.36,z+3],[-.13,.36,z+3]],c2),...wing([[-.2,.03,z+4],[-.3,.03,z+4],[-.34,.16,z+4],[-.28,.16,z+4]],c3)];if(a)p.push(['b',-.1,-.037,z+3,0,.037,z+5.5,a]);return{s:18,p}};
MODEL.bombardero=(l,t)=>{const[c1,c2,c3]=pal('#6f7f5a',t),a=ACC[l],z=40,p=[['b',-.38,-.06,z,.36,.06,z+10,c1],['b',.36,-.04,z+2,.44,.04,z+8,'#aee3ff'],['b',-.4,-.012,z+10,-.28,.012,z+21,c2],['b',-.02,-.24,z+1,.12,-.17,z+5,c3],['b',-.02,.17,z+1,.12,.24,z+5,c3],...wing([[.12,.06,z+5],[-.08,.06,z+5],[-.12,.5,z+5],[.02,.5,z+5]],c2),...wing([[-.28,.05,z+7],[-.38,.05,z+7],[-.4,.2,z+7],[-.33,.2,z+7]],c3)];if(a)p.push(['b',-.2,-.062,z+4,-.1,.062,z+7,a]);return{s:26,p}};
MODEL.b2=(l,t)=>{const c=t?'#5e221d':'#3a3f4a',d=t?'#74291f':'#2e333c',a=ACC[l]||'#f6b51e',z=42;return{s:30,p:[...wing([[.34,0,z+4],[-.1,.52,z+4],[-.24,.46,z+4],[-.06,0,z+4]],c).map((q,i)=>i?['q',q[1],d]:q),['b',-.08,-.06,z+4,.18,.06,z+8,t?'#8c342b':'#4a5160'],['b',.12,-.04,z+8,.2,.04,z+9.6,a]]}};
MODEL.dfuego=tint(MODEL.dragon,'#e8401c',.62);
MODEL.dhielo=tint(MODEL.dragon,'#8fdcff',.66);
MODEL.delec=tint(MODEL.dragon,'#f6d21e',.6);
/* Robots nuevos: variantes del robot base (teñido, escalado o con piezas extra) y la araña, que es propia */
const scaleM=(m,k)=>(l,t,ph)=>{const r=m(l,t,ph);return{s:r.s*k,p:r.p.map(q=>q[0]==='b'?['b',q[1]*k,q[2]*k,q[3]*k,q[4]*k,q[5]*k,q[6]*k,q[7]]:q[0]==='l'?['l',q[1]*k,q[2]*k,q[3]*k,q[4]*k,q[5]*k,q[6]*k,q[7],q[8]*k]:q[0]==='s'?['s',q[1]*k,q[2]*k,q[3]*k,q[4]*k,q[5]]:q)}};
const plusP=(m,f)=>(l,t,ph)=>{const r=m(l,t,ph);return{s:r.s,p:r.p.concat(f(t))}};
MODEL.rexp=scaleM(tint(MODEL.robot,'#4fd06a',.5),.8);
MODEL.rescudo=plusP(tint(MODEL.robot,'#3d86c9',.55),t=>[['b',.12,-.2,6,.15,.2,34,t?'#8c342b':'#7fd6ff']]);
MODEL.rart=plusP(tint(MODEL.robot,'#f08a24',.5),t=>[['l',0,0,36,.42,0,46,'#2e3540',5]]);
MODEL.rmed=plusP(tint(MODEL.robot,'#ffffff',.7),t=>[['b',.081,-.02,15,.096,.02,28,'#e2401c'],['b',.081,-.06,19.5,.096,.06,23.5,'#e2401c']]);
MODEL.rara=(l,t)=>{const[c1,c2,c3]=pal('#5c6877',t),p=[['b',-.12,-.1,10,.12,.1,20,c1],['b',.12,-.06,12,.2,.06,19,c2],['s',.2,-.04,17,1.6,'#ff3b30'],['s',.2,.04,17,1.6,'#ff3b30']];for(const s of[-1,1])for(const x of[-.09,0,.09])p.push(['l',x,s*.1,15,x*1.6,s*.26,20,c3,1.8],['l',x*1.6,s*.26,20,x*2,s*.34,0,c3,1.8]);return{s:20,p}};
MODEL.helicoptero=plusP(MODEL.helicoptero,t=>[['b',-.02,-.17,36,.12,-.125,39,'#3b3d42'],['b',-.02,.125,36,.12,.17,39,'#3b3d42'],['l',-.04,-.15,37.5,-.04,.15,37.5,'#333333',1]]);
MODEL.titan=scaleM(tint(MODEL.robot,'#b06cf0',.45),1.75);
/* Unidades de fusión: se arman a partir de modelos existentes, elevados, teñidos, agrandados o con piezas nuevas */
const liftM=(m,dz)=>(l,t,ph)=>{const r=m(l,t,ph);return{s:r.s,p:r.p.map(q=>q[0]==='b'?['b',q[1],q[2],q[3]+dz,q[4],q[5],q[6]+dz,q[7]]:q[0]==='l'?['l',q[1],q[2],q[3]+dz,q[4],q[5],q[6]+dz,q[7],q[8]]:q[0]==='s'?['s',q[1],q[2],q[3]+dz,q[4],q[5]]:q[0]==='q'?['q',q[1].map(v=>[v[0],v[1],v[2]+dz]),q[2]]:q)}};
MODEL.tanvol=plusP(liftM(tint(MODEL.tanque,'#49b6ff',.4),26),t=>[['l',0,0,44,0,0,51,'#333333',1.6],['l',-.34,0,51,.34,0,51,'#22262b',2.4],['l',0,-.34,51,0,.34,51,'#22262b',2.4],['s',-.3,0,30,2.4,'#ff9d2e'],['s',.3,0,30,2.4,'#ff9d2e']]);
MODEL.mecha=plusP(scaleM(tint(MODEL.robot,'#4f6f9a',.5),1.3),t=>[['l',.05,.24,38,.42,.24,40,'#2e3540',4],['l',.05,-.24,38,.42,-.24,40,'#2e3540',4]]);
MODEL.sombra=tint(MODEL.franco,'#3a2a5c',.6);
MODEL.aracno=scaleM(tint(MODEL.rara,'#b8860b',.5),1.45);
MODEL.fortvol=scaleM(tint(MODEL.bombardero,'#8a8f98',.45),1.3);
MODEL.fenix=scaleM(tint(MODEL.dragon,'#ff6fb1',.6),1.1);
MODEL.hidra=scaleM(tint(MODEL.dragon,'#2fd0a0',.55),1.45);
MODEL.coloso=scaleM(tint(MODEL.robot,'#e2401c',.45),2.1);
MODEL.cmd1=plusP(scaleM(tint(MODEL.marine,'#c9a227',.45),1.15),t=>[['b',-.115,-.1,13,-.095,.1,31,'#7a1f1f'],['b',-.03,-.06,40.5,.04,.06,41.5,'#f6b51e']]);
MODEL.cmd2=plusP(scaleM(tint(MODEL.soldado,'#3d86c9',.5),1.15),t=>[['b',-.13,-.055,17,-.09,.055,30,'#59636f'],['s',-.11,-.03,15,1.8,'#ff9d2e'],['s',-.11,.03,15,1.8,'#ff9d2e']]);
MODEL.cmd3=plusP(scaleM(tint(MODEL.robot,'#2fd0a0',.5),.95),t=>[['s',0,0,47,2.4,'#7fe3ff']]);
/* ---------- modelos de las tropas nuevas ---------- */
const hull=(c,t,L,W,H,dk)=>{const[c1,c2,c3]=pal(c,t),p=[['b',-L,-W,0,L*.7,W,H*.45,sh(c1,.55)],['b',-L,-W,H*.45,L*.7,W,H,c1],['q',[[L*.7,-W,H],[L*.7,W,H],[L,0,H*1.1]],dk||sh(c1,1.15)],['q',[[L*.7,-W,H*.45],[L*.7,-W,H],[L,0,H*1.1],[L,0,H*.5]],c2],['q',[[L*.7,W,H*.45],[L*.7,W,H],[L,0,H*1.1],[L,0,H*.5]],c3],['b',-L,-W-.004,H*.45,L*.7,W+.004,H*.45+1,'#e8edf2']];return p};
const turret=(x,z,c,len)=>[['b',x-.04,-.035,z,x+.04,.035,z+4,c],['l',x+.03,-.012,z+2.4,x+.03+len,-.012,z+3,'#2b2e33',1.6],['l',x+.03,.012,z+2.4,x+.03+len,.012,z+3,'#2b2e33',1.6]];
MODEL.ing=(l,t)=>({s:9,p:inf('#c78a2a','#f6c21e',l,t,[['l',.02,.11,17,.12,.11,24,'#9aa3ad',2.2],['b',.1,.1,23,.14,.125,26,'#9aa3ad'],['b',-.1,-.06,15,-.05,.06,24,t?'#5e221d':'#6b5a3a']])});
MODEL.llamas=(l,t)=>({s:9,p:inf('#7a4a2a','#4a3a2a',l,t,[['b',-.13,-.07,13,-.07,-.01,28,'#c2401c'],['b',-.13,.01,13,-.07,.07,28,'#c2401c'],['s',-.1,-.04,28.5,2.4,'#d9532f'],['s',-.1,.04,28.5,2.4,'#d9532f'],['l',.03,.1,18,.22,.1,19.5,'#3b3d42',2.6],['s',.23,.1,19.6,1.3,'#ff9d2e']])});
MODEL.arti=(l,t)=>({s:28,p:tank('#8a7a4a',l,t,.3,.2,12,20,.15,3,0).concat([['l',.05,0,19,.5,0,33,'#2e3328',4.2],['l',.46,0,31.5,.53,0,34,'#1d1f1b',5.4],['b',-.3,-.18,12,-.18,.18,16,t?'#8c342b':'#6b5f3a']])});
MODEL.emp=(l,t)=>({s:26,p:tank('#4a6a8a',l,t,.27,.19,12,19,.12,3,0).concat([['l',-.02,0,19,-.02,0,29,'#3b3d42',2],['s',-.02,0,31,4.4,'#7fe3ff'],['l',-.12,-.1,19,-.12,-.1,26,'#b9e9ff',1.2],['l',-.12,.1,19,-.12,.1,26,'#b9e9ff',1.2]])});
MODEL.dron=(l,t)=>{const c=t?'#8c342b':'#3b4450',z=32,p=[['b',-.06,-.04,z,.07,.04,z+4,c],['s',.07,0,z+2,1.6,'#ff3b30'],['b',-.02,-.02,z-2,.02,.02,z,'#d9452b']];for(const[x,y]of[[-.09,-.09],[-.09,.09],[.09,-.09],[.09,.09]])p.push(['l',0,0,z+3,x,y,z+4,c,1.2],['l',x-.05,y,z+4.6,x+.05,y,z+4.6,'#aab3bd',.9]);return{s:9,p}};
MODEL.transp=plusP(scaleM(tint(MODEL.bombardero,'#9aa07a',.45),1.2),t=>[['b',-.4,-.1,44,.3,.1,58,t?'#8c342b':'#868c66']]);
MODEL.sigilo=plusP(tint(MODEL.robot,'#23262e',.72),t=>[['b',.06,-.06,33,.07,.06,35.5,'#2ff0ff'],['b',.08,-.12,19,.09,.12,20,'#2ff0ff']]);
MODEL.espada=plusP(scaleM(tint(MODEL.robot,'#c0c6cf',.45),1.3),t=>[['l',.07,.27,26,.62,.27,38,'#dff6ff',2.6],['l',.07,.27,26,.62,.27,38,'#7fe3ff',1],['b',.02,.23,24,.1,.31,28,'#f6b51e']]);
MODEL.dsombra=tint(MODEL.dragon,'#2a1f44',.72);
MODEL.drey=plusP(scaleM(tint(MODEL.dragon,'#ffc21a',.72),1.6),t=>[['s',.6,-.06,32+28,2.4,'#ffe066'],['s',.62,0,33+29,2.6,'#ff5a36'],['s',.6,.06,32+28,2.4,'#ffe066']]);
MODEL.lancha=(l,t)=>{const p=hull('#5f6e7a',t,.22,.08,6);p.push(['b',-.08,-.05,6,.06,.05,11,t?'#8c342b':'#dfe5ea'],['b',.04,-.04,8,.065,.04,10.5,'#aee3ff'],['l',.1,0,9,.22,0,10,'#2b2e33',1.4],['b',-.2,-.03,4,-.22,.03,7,'#2b2e33']);if(ACC[l])p.push(['b',-.06,-.051,9,0,.051,10,ACC[l]]);return{s:15,p}};
MODEL.destructor=(l,t)=>{const p=hull('#6b7884',t,.42,.11,9),g=t?'#8c342b':'#8995a1';p.push(['b',-.18,-.08,9,.12,.08,17,g],['b',-.1,-.06,17,.08,.06,23,sh(g,1.1)],['b',.02,-.061,19,.08,.061,21,'#aee3ff'],['l',-.02,0,23,-.02,0,34,'#2b2e33',1],['l',-.08,0,31,.04,0,31,'#2b2e33',.8],['b',-.28,-.04,9,-.2,.04,16,'#3b3d42'],...turret(.24,9,g,.16),...turret(-.34,9,g,-.12));if(ACC[l])p.push(['b',-.18,-.081,13,-.1,.081,14.5,ACC[l]]);return{s:30,p}};
MODEL.submarino=(l,t)=>{const c=t?'#5e221d':'#2e3a46',p=[['b',-.4,-.06,0,.32,.06,6,c],['q',[[.32,-.06,6],[.32,.06,6],[.42,0,3.5]],sh(c,1.2)],['q',[[.32,-.06,0],[.32,-.06,6],[.42,0,3.5]],sh(c,.8)],['b',-.08,-.035,6,.06,.035,13,sh(c,1.15)],['l',0,0,13,0,0,19,'#2b2e33',.9],['l',0,0,19,.04,0,19,'#2b2e33',.9],['b',-.44,-.01,2,-.38,.01,9,c],['b',-.44,-.08,3,-.4,.08,4,c]];if(ACC[l])p.push(['b',-.04,-.036,10,.02,.036,11.5,ACC[l]]);return{s:24,p}};
MODEL.portaav=(l,t)=>{const p=hull('#5d6873',t,.55,.18,10,'#4a5560'),g=t?'#8c342b':'#8995a1';p.push(['b',-.55,-.2,10,.55,.2,11,'#4d5660'],['l',-.5,0,11.2,.5,0,11.2,'#f6c21e',.8],['l',-.4,-.12,11.2,.4,-.12,11.2,'#e8edf2',.5],['l',-.4,.12,11.2,.4,.12,11.2,'#e8edf2',.5],['b',-.1,.12,11,.08,.19,26,g],['b',-.02,.115,20,.06,.12,23,'#aee3ff'],['l',0,.155,26,0,.155,36,'#2b2e33',1],...MODEL.dron(0,t).p.map(q=>q[0]==='b'?['b',q[1]*1+.3,q[2]-.06,q[3]-21,q[4]+.3,q[5]-.06,q[6]-21,q[7]]:q[0]==='s'?['s',q[1]+.3,q[2]-.06,q[3]-21,q[4],q[5]]:q[0]==='l'?['l',q[1]+.3,q[2]-.06,q[3]-21,q[4]+.3,q[5]-.06,q[6]-21,q[7],q[8]]:q));if(ACC[l])p.push(['b',-.1,.121,15,.08,.19,17,ACC[l]]);return{s:42,p}};
MODEL.lobo=(l,t)=>{const[c1,c2,c3]=pal('#7d8792',t),g=PHS[curPh]||0,lx=.03*g,p=[['b',-.12,-.045,9,.1,.045,17,c1],['b',.1,-.035,13,.18,.035,20,c2],['b',.18,-.022,13.5,.24,.022,17,c3],['s',.15,-.025,18.5,1,'#ff3b30'],['s',.15,.025,18.5,1,'#ff3b30'],['l',.14,-.025,20,.14,-.03,24,c3,1.4],['l',.14,.025,20,.14,.03,24,c3,1.4],['l',-.12,0,15,-.24,0,19,c2,2]];for(const[x,y,s]of[[.07,-.035,1],[.07,.035,-1],[-.09,-.035,-1],[-.09,.035,1]])p.push(['l',x,y,10,x+lx*s,y,0,c3,2.4]);if(ACC[l])p.push(['b',-.02,-.046,14,.04,.046,16,ACC[l]]);return{s:15,p}};
MODEL.dino=(l,t)=>{const[c1,c2,c3]=pal('#5f7a4a',t),g=PHS[curPh]||0,lx=.05*g,a=ACC[l],p=[['b',-.2,-.1,14,.14,.1,30,c1],['b',.14,-.06,22,.26,.06,32,c2],['b',.26,-.05,24,.4,.05,32,c1],['b',.3,-.045,20,.4,.045,24,c3],['s',.33,-.05,30,1.5,'#ffe066'],['s',.33,.05,30,1.5,'#ffe066'],['b',-.34,-.05,18,-.2,.05,26,c2],['b',-.48,-.03,19,-.34,.03,23,c3]];for(const x of[-.14,-.04,.06])p.push(['b',x,-.03,30,x+.07,.03,35,'#8a8f98']);for(const s of[-1,1])p.push(['b',-.14+lx*s,s*.1-.04,0,-.04+lx*s,s*.1+.04,16,c3],['b',.04-lx*s,s*.1-.04,0,.14-lx*s,s*.1+.04,16,c3]);if(a)p.push(['b',-.1,-.101,22,.04,.101,25,a]);return{s:30,p}};
MODEL.kraken=(l,t,ph)=>{const c=t?'#8c342b':'#7a3fa0',d=sh(c,.7),w=[0,4,8,4][ph||0],p=[['s',0,0,14,10,c],['s',.04,0,24,7,sh(c,1.15)],['s',.1,-.05,22,1.8,'#ffe066'],['s',.1,.05,22,1.8,'#ffe066']];for(let i=0;i<8;i++){const a=i/8*6.283,x=Math.cos(a),y=Math.sin(a);p.push(['l',x*.08,y*.08,8,x*.24,y*.24,6+w*(i%2?1:-1)*.5+4,d,3.2],['l',x*.24,y*.24,10+w*(i%2?.5:-.5),x*.36,y*.36,16+w*(i%2?-1:1),c,2.2])}return{s:28,p}};
MODEL.infierno=plusP(tint(MODEL.pesado,'#b8401c',.5),t=>[['b',-.38,-.2,15,-.24,.2,26,'#d9532f'],['s',-.31,-.12,26,3,'#ff9d2e'],['s',-.31,.12,26,3,'#ff9d2e']]);
MODEL.ronin=plusP(tint(MODEL.espada,'#4a2a7c',.5),t=>[['b',-.05,-.11,48,.07,.11,50,'#2a1f44']]);
MODEL.nodriza=plusP(scaleM(tint(MODEL.transp,'#3a4a5a',.45),1.15),t=>[['s',0,0,70,5,'#7fe3ff']]);
MODEL.quimera=plusP(scaleM(tint(MODEL.dino,'#8a3ab0',.45),1.3),t=>[...wing([[.05,.1,42],[-.15,.1,42],[-.3,.55,64],[.05,.45,60]],t?'#74291f':'#5a2a7c')]);
MODEL.krakenB=scaleM(MODEL.kraken,3.8);
MODEL.acorazado=scaleM(tint(MODEL.destructor,'#4a5560',.35),1.45);
/* ---------- edificios nuevos ---------- */
ART.astillero=l=>{const w='#3d8fd6',[cx,cy]=P(.82,.2,44);
 let s=pg([[.04,.04],[.96,.04],[.96,.96],[.04,.96]],'#b9b3a6')+pg([[.42,.08],[.94,.08],[.94,.92],[.42,.92]],w)+pg([[.44,.1],[.92,.1],[.92,.9],[.44,.9]],'#58a8ea','opacity=".8"');
 for(const v of[.2,.4,.6,.8])s+=ln([.46,v,0],[.9,v,0],'#ffffff',.5);
 s+=box(.5,.32,.88,.6,0,5,'#4f5a66')+box(.5,.32,.88,.6,5,9,'#8995a1')+box(.58,.38,.74,.54,9,17,'#dfe5ea')+wL(.6,.72,.54,12,15,GL)+box(.6,.4,.66,.46,17,25,'#3b3d42');
 s+=box(.08,.12,.38,.62,0,14+2*l,'#7d8792')+gable(.06,.1,.4,.64,14+2*l,9,'#3d86c9','#7d8792')+wL(.12,.2,.62,4,10,GL)+wL(.26,.34,.62,4,10,GL)+wR(.2,.32,.38,4,10,GR)+wR(.42,.54,.38,4,10,GR);
 s+=box(.78,.7,.86,.78,0,46,'#f6b51e')+box(.76,.68,.88,.8,46,50,'#d48f10')+ln([.82,.74,48],[.62,.3,46],'#f6b51e',2.2)+ln([.62,.3,46],[.62,.3,24],'#2b2e33',.7)+box(.6,.28,.64,.32,20,24,'#5b4630');
 for(const v of[.66,.72,.78,.84])s+=box(.06,v,.4,v+.04,0,2,'#8a5a2b');
 return s+flag(.1,.92,0,22,'#2f7fe0')};
ART.genetico=l=>{const gl='#5be37a';
 let s=pg([[.05,.05],[.95,.05],[.95,.95],[.05,.95]],'#cfd6dc')+box(.12,.14,.88,.86,0,4,'#9aa3ad')+box(.16,.18,.84,.82,4,22+3*l,'#eef1f5')+wL(.22,.4,.82,9,18,GL)+wL(.6,.78,.82,9,18,GL)+wR(.24,.44,.84,9,18,GR)+wR(.56,.76,.84,9,18,GR)+wL(.44,.56,.82,4,15,'#3b3d42');
 s+=box(.14,.16,.86,.84,22+3*l,25+3*l,'#7d8792')+dome(.5,.5,.26,25+3*l,gl)+`<g opacity=".55">${dome(.5,.5,.2,27+3*l,'#d8ffe0')}</g>`;
 for(const[u,v]of[[.2,.9],[.34,.92],[.88,.3],[.9,.5]])s+=cyl(u,v,.045,0,16,'#bfe9cc')+cyl(u,v,.05,16,18,'#7d8792');
 const[x,y]=P(.5,.5,46+3*l);s+=`<circle class="blink" cx="${x}" cy="${y}" r="2.6" fill="#b6ff8a"/>`;
 return s};
ART.llamat=l=>{const[x,y]=P(.6,.42,34+2*l);
 let s=pg([[.1,.1],[.9,.1],[.9,.9],[.1,.9]],'#a89a80','opacity=".8"')+box(.2,.2,.8,.8,0,8,'#6e6a62')+cyl(.5,.5,.22,8,28+2*l,'#7a4a2a')+cyl(.5,.5,.25,28+2*l,32+2*l,'#3b3d42');
 s+=cyl(.24,.74,.08,0,18,'#c2401c')+cyl(.36,.8,.08,0,18,'#c2401c')+ln([.5,.5,30+2*l],[.72,.34,33+2*l],'#2b2e33',3.2);
 return s+`<circle class="blink" cx="${x+3}" cy="${y-3}" r="3.4" fill="#ff9d2e"/><circle cx="${x+3}" cy="${y-3}" r="1.8" fill="#ffe066"/>`};
ART.tfranco=l=>{const h=40+3*l;let s=pg([[.1,.1],[.9,.1],[.9,.9],[.1,.9]],'#a89a80','opacity=".7"');
 for(const[u,v]of[[.3,.3],[.7,.3],[.3,.7],[.7,.7]])s+=ln([u,v,0],[(u+.5)/2+.0,(v+.5)/2,h],'#7a5530',2.4);
 s+=ln([.3,.7,h*.4],[.7,.7,h*.6],'#6b4520',1.2)+ln([.7,.7,h*.4],[.7,.3,h*.6],'#6b4520',1.2)+box(.3,.3,.7,.7,h,h+3,'#8a5a2b')+box(.3,.3,.7,.7,h+3,h+9,'#b98a52')+pyr(.26,.26,.74,.74,h+16,9,'#5b4630');
 for(const[u,v]of[[.3,.3],[.7,.3],[.3,.7],[.7,.7]])s+=ln([u,v,h+9],[u,v,h+16],'#6b4520',1.4);
 return s+ln([.55,.6,h+11],[.86,.6,h+12],'#1c1c1c',1.6)};
ART.costa=l=>{let s=pg([[.06,.06],[.94,.06],[.94,.94],[.06,.94]],'#c2b38f')+box(.14,.14,.86,.86,0,10+l,'#8f9488')+box(.18,.18,.82,.82,10+l,14+l,'#7a7f74');
 for(const u of[.18,.34,.5,.66])s+=box(u,.78,u+.14,.88,0,6,'#b8a070');
 s+=cyl(.5,.5,.22,14+l,20+l,'#5d6873')+box(.38,.4,.62,.6,20+l,28+l,'#6b7884')+ln([.6,.5,24+l],[.98,.5,30+l],'#2b2e33',5)+ln([.92,.5,29+l],[1,.5,30.5+l],'#1c1c1c',6.4);
 return s+flag(.2,.22,14+l,34+l,'#2f7fe0')};
ART.escudo=l=>{const z=24+3*l;let s=pg([[.08,.08],[.92,.08],[.92,.92],[.08,.92]],'#9aa3ad')+box(.24,.24,.76,.76,0,6,'#5d6873')+cyl(.5,.5,.14,6,z,'#7d8792');
 for(const[u,v]of[[.2,.5],[.8,.5],[.5,.2],[.5,.8]])s+=cyl(u,v,.05,0,14,'#3b3d42')+ln([u,v,14],[.5,.5,z-4],'#49b6ff',1);
 const[x,y]=P(.5,.5,z+6);s+=`<circle cx="${x}" cy="${y}" r="7" fill="#49b6ff"/><circle class="blink" cx="${x}" cy="${y}" r="4" fill="#dff6ff"/>`;
 return s+`<g opacity=".28">${dome(.5,.5,.42,2,'#7fe3ff')}</g>`};
function regHero(h){const b=U[h.k],key='h'+h.id;U[key]=Object.assign({},b,{n:h.n,hero:1,atk:Math.round(b.atk*(h.m[0]+h.m[1])/2*1.2),hp:Math.round(b.hp*h.m[0]),dmg:Math.round(b.dmg*h.m[1]),rng:+(b.rng+h.r).toFixed(1)});MODEL[key]=tint(MODEL[h.k],h.c,.55);if(AIR[h.k])AIR[key]=1}
const spr=(k,l,ai,t,ph)=>{const key=k+l+'|'+ai+'|'+(t||0)+'|'+(ph||0)+(FULL?'F':'');if(!SPC[key]){curPh=ph||0;const q=U[k]||{};curTx=q.drg?'scale':q.cls==='inf'||q.cls==='veh'?'camo':'panel';const m=MODEL[k](l,t||0,ph||0);SPC[key]=rsh(50,97,m.s,m.s*.45)+mesh(m.p,ai*2*Math.PI/ANG)}return SPC[key]};
/* Sombra proyectada: la silueta de la pieza, en negro, volcada sobre el piso hacia la derecha. */
/* Edificios rediseñados y defensas nuevas */
ART.muro=l=>box(.06,.38,.94,.62,0,15+l,'#b9b3a6')+[.08,.3,.52,.74].map(u=>box(u,.38,u+.14,.62,15+l,19+l,'#c7c1b3')).join('');
ART.trampa=()=>{const[x,y]=P(.2,.78,16);return pg([[.08,.08],[.92,.08],[.92,.92],[.08,.92]],'#b08a5a','opacity=".75"')+[[.32,.3],[.68,.42],[.44,.7]].map(([u,v])=>{const[a,b]=P(u,v,4);return cyl(u,v,.09,0,3,'#3b3d42')+`<circle class="blink" cx="${a}" cy="${b}" r="1.8" fill="#ff3b30"/>`}).join('')+ln([.2,.78,0],[.2,.78,14],'#5b4630',1.4)+`<polygon points="${x},${y-7} ${x+7},${y+5} ${x-7},${y+5}" fill="#f6c21e" stroke="#2a1808" stroke-width="1"/>`};
ART.casa=l=>{const h=20+7*(l-1),w=['#f3e2c0','#f8ecd4','#eef1f5'][l-1],r=['#d9532f','#3d86c9','#8e56c2'][l-1],[cx,cy]=P(.35,.64,h+24),[kx,ky]=P(.55,.762,8);
 let s=pg([[.05,.05],[.95,.05],[.95,.95],[.05,.95]],'#8fd65c')+box(.17,.2,.83,.8,0,3,'#c9c2b0')+box(.2,.23,.8,.77,3,h+3,w)+wL(.44,.57,.77,3,14,'#8a5a2b')+`<circle cx="${kx}" cy="${ky}" r=".9" fill="#f6b51e"/>`+box(.42,.77,.59,.88,0,3,'#cfc9bb');
 (l>1?[[9,16],[20,27]]:[[11,18]]).forEach(([a,b],k)=>{s+=wL(.25,.38,.77,a,b,GL)+wL(.63,.76,.77,a,b,GL)+(k?wL(.45,.56,.77,a,b,GL):'')+wR(.3,.44,.8,a,b,GR)+wR(.56,.7,.8,a,b,GR)});
 s+=pg([[.41,.77,15],[.6,.77,15],[.6,.87,12],[.41,.87,12]],sh(r,.85))+gable(.2,.18,.8,.82,h+3,13,r,w)+box(.3,.6,.4,.68,h+9,h+22,'#a85f45')+box(.29,.59,.41,.69,h+22,h+24,'#8c4a35');
 if(!LITE)s+=[0,1].map(d=>`<circle class="smoke" cx="${cx}" cy="${cy}" r="3.2" fill="#f4f4f4" style="animation-delay:${d*1.2}s"/>`).join('');
 for(const u of[.1,.26,.74,.9])s+=ln([u,.94,0],[u,.94,6],'#fdf6e3',1.3);
 s+=pl([[.1,.94,4.5],[.26,.94,4.5]],'#fdf6e3',1)+pl([[.74,.94,4.5],[.9,.94,4.5]],'#fdf6e3',1);
 const[bx,by]=P(.9,.6,3),[fx,fy]=P(.16,.86,2);
 return s+ball(bx,by,5.5,'#4fa83a')+ball(bx+4,by+4,4,'#3f9431')+`<circle cx="${fx}" cy="${fy}" r="1.6" fill="#ff6fb1"/><circle cx="${fx+5}" cy="${fy+2}" r="1.6" fill="#ffe066"/><circle cx="${fx-4}" cy="${fy+3}" r="1.6" fill="#fff"/>`};
ART.cuartel=l=>{const c='#6f8540',H=18+3*l,[sx,sy]=P(.5,.87,H*.62);
 let s=pg([[.04,.04],[.96,.04],[.96,.96],[.04,.96]],'#c2a878','opacity=".85"')+box(.14,.16,.86,.76,0,H,c)+wL(.4,.6,.76,0,13,'#2c3518')+pl([[.5,.76,0],[.5,.76,13]],'#55682f',.8)+wL(.19,.33,.76,8,14,GL)+wL(.67,.81,.76,8,14,GL)+wR(.24,.4,.86,8,14,GR)+wR(.52,.68,.86,8,14,GR);
 s+=box(.12,.14,.88,.78,H,H+3,'#55682f')+box(.56,.24,.76,.44,H+3,H+9,'#7d9449')+`<polygon points="${sx},${sy-4} ${sx+1.3},${sy-1} ${sx+4},${sy-1} ${sx+1.8},${sy+1} ${sx+2.8},${sy+4} ${sx},${sy+2.2} ${sx-2.8},${sy+4} ${sx-1.8},${sy+1} ${sx-4},${sy-1} ${sx-1.3},${sy-1}" fill="#f6c21e"/>`;
 for(const u of[.1,.26,.66,.82])s+=box(u,.86,u+.14,.94,0,4.5,'#d8c69a');
 if(l>1)s+=box(.12,.86,.24,.94,4.5,8.5,'#cbb886')+box(.68,.86,.8,.94,4.5,8.5,'#cbb886');
 if(l>2)s+=ln([.3,.3,H+3],[.3,.3,H+20],'#59636f',1.2)+ln([.24,.3,H+15],[.36,.3,H+15],'#59636f',1);
 return s+flag(.2,.22,H+3,H+24,l>2?'#f6b51e':'#d9452b')};
ART.recolector=l=>{const H=24+3*l,[x,y]=P(.66,.58,H+18);return box(.06,.06,.94,.94,0,5,'#4a5160')+cyl(.25,.28,.13,5,H+6,'#b06cf0')+cyl(.25,.7,.11,5,H-2,'#f6b51e')+box(.42,.3,.9,.86,5,H,'#e6edf4')+wL(.5,.84,.86,10,H-6,'#49b6ff')+wR(.38,.78,.9,10,H-6,'#2f93da')+box(.4,.28,.92,.88,H,H+3,'#b06cf0')+ln([.66,.58,H+3],[.66,.58,H+16],'#59636f',1.8)+`<ellipse cx="${x}" cy="${y}" rx="15" ry="5.5" fill="#b9c4d0"/><ellipse cx="${x}" cy="${y-2}" rx="7" ry="4.5" fill="#7fe3ff"/><circle class="blink" cx="${x}" cy="${y-6}" r="2" fill="#ff3b30"/>`};
const PAD='<svg class="art" viewBox="0 0 100 120"><polygon points="50,72 96,95 50,118 4,95" fill="#d6c79c" opacity=".62" stroke="#b3a37a" stroke-width="1"/></svg>';
const cast=a=>`<svg class="art" viewBox="0 0 100 120"><g filter="url(#${LITE?'fsh2':'fsh'})" transform="matrix(1,0,-.95,.36,90.25,60.8)">${a.replace(/<(polygon|ellipse)[^>]*pointer-events:none[^>]*\/>/g,'').replace(/<circle class="smoke"[^>]*\/>/g,'').replace(/ class="[a-z]+"/g,'')}</g></svg>`;
const BOT=`<g transform="translate(37.5,68) scale(.45)">${spr('robot',1,2)}</g><circle class="blink" cx="71" cy="100" r="2.4" fill="#ffe066"/>`;
/* Niveles 4 a 7: misma pieza del nivel 3, más grande, con estandartes y, al máximo, un aura */
const AURA=`<ellipse class="aura" cx="50" cy="95" rx="50" ry="25" fill="none" stroke="#ffd35a" stroke-width="3"/>`;
const maxL=d=>d.max===7&&S.lvl>=12?8:d.max;
const artL=(k,l)=>{if(PIMG[k])return pimgTag(k,l);const a=ART[k](Math.min(l,3));if(l<=3||B[k].deco)return a;const s=1+.03*(l-3),g=l>=6?'#b06cf0':'#f6b51e';
 const pad=box(.02,.02,.98,.98,0,3,l>=6?'#b9b2a6':'#a69c8c')+box(.08,.08,.92,.92,3,3.6,l>=6?'#d4cdbf':'#bfb4a1');
 const post=(u,v,c)=>box(u,v,u+.07,v+.07,3,l>=8?12:10,c)+(l>=8?box(u-.01,v-.01,u+.08,v+.08,12,13.5,'#f6b51e'):'');
 let back='',front='';if(l>=6){const pc=l>=8?'#e0e4ea':'#8d939b';for(const[u,v]of [[.02,.02],[.48,.02],[.91,.02],[.02,.48],[.02,.91],[.91,.48],[.48,.91],[.91,.91]])(u+v>1?(front+=post(u,v,pc)):(back+=post(u,v,pc)))}
 return pad+back+(l>=7?AURA:'')+`<g transform="translate(${(50*(1-s)).toFixed(2)},${(95*(1-s)).toFixed(2)}) scale(${s})">${a}</g>`+flag(.03,.97,0,24+2*l,g)+(l>=5?flag(.97,.03,0,24+2*l,g):'')+(l>=8?`<g opacity=".9">${ball(50,22,4.5,'#ffe066')}${ball(43,25,3,'#f6b51e')}${ball(57,25,3,'#f6b51e')}</g>`:'')+front};
/* Piezas de los mini eventos */
const CRATE=`<svg class="art" viewBox="0 0 100 120"><g class="chute"><path d="M22,42a28,27 0 0 1 56,0z" fill="#e8442e"/><path d="M40,42a10,27 0 0 1 20,0z" fill="#fff"/><path d="M22,42L42,70M78,42L58,70M50,42L50,66" stroke="#5b4630" stroke-width=".8" fill="none"/></g>${rsh(52,97,24,10)+box(.3,.3,.7,.7,0,20,'#c8924a')+wL(.3,.7,.7,8,11.5,'#7a4b1c')+wR(.3,.7,.7,8,11.5,'#5b3614')}</svg>`;
const SHIP=`<svg class="art" viewBox="0 0 160 130"><ellipse class="foam" cx="80" cy="111" rx="66" ry="7" fill="#fff" opacity=".55"/><g class="sway"><line x1="80" y1="86" x2="80" y2="20" stroke="#3d2713" stroke-width="4" stroke-linecap="round"/><path d="M76,30Q46,54 76,78Z" fill="#33333b"/><path d="M84,26Q122,52 84,78Z" fill="#1e1e22"/><circle cx="98" cy="50" r="6.5" fill="#f2f2f2"/><circle cx="95.5" cy="49" r="1.5" fill="#1e1e22"/><circle cx="100.5" cy="49" r="1.5" fill="#1e1e22"/><rect x="95" y="54" width="6" height="4" rx="1" fill="#f2f2f2"/><polygon points="80,20 96,24 80,29" fill="#d9452b"/><path d="M18,84L142,84L127,110L33,110Z" fill="#6b4423"/><path d="M18,84L142,84L139,90L21,90Z" fill="#8a5a2b"/><circle cx="52" cy="98" r="3" fill="#2a1808"/><circle cx="80" cy="98" r="3" fill="#2a1808"/><circle cx="108" cy="98" r="3" fill="#2a1808"/></g></svg>`;
const UFO=`<svg class="art" viewBox="0 0 130 100"><path d="M41,52a24,25 0 0 1 48,0z" fill="#7fe3ff"/><path d="M41,52a24,25 0 0 1 48,0z" fill="url(#gball)"/><ellipse cx="65" cy="58" rx="54" ry="14" fill="#74808f"/><ellipse cx="65" cy="54" rx="54" ry="13" fill="#b9c4d0"/><ellipse cx="65" cy="54" rx="54" ry="13" fill="url(#gcyl)"/>${[18,41,65,89,112].map((x,k)=>`<circle class="blink" cx="${x}" cy="${58+(k===2?6:k%4?4:0)}" r="3" fill="#ffe066" style="animation-delay:${k*.2}s"/>`).join('')}</svg>`;
/* palmeras, arbustos y roca en columnas (look "HD": luz desde arriba a la izquierda, sombras suaves) */
const PALM=(x,y,s=1,sd=0)=>{const b=(sd*37)%9-4;return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="4" cy="1" rx="11" ry="3.5" fill="#0b2a12" opacity=".28"/><path d="M0,0q${-3+b*.4},-14 ${2+b*.6},-30" fill="none" stroke="#7a4f27" stroke-width="4.2" stroke-linecap="round"/><path d="M0,0q${-3+b*.4},-14 ${2+b*.6},-30" fill="none" stroke="#a8743d" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="2 3"/>`+
 `<g transform="translate(${2+b*.6},-30)"><path d="M0,0q-15,-7 -25,4q12,-4 25,-4zM0,0q14,-9 26,-1q-13,-2 -26,1zM0,0q-7,-13 -18,-13q9,4 18,13zM0,0q7,-13 19,-11q-11,3 -19,11zM0,0q4,11 -6,18q4,-9 6,-18zM0,0q-3,11 7,17q-5,-8 -7,-17z" fill="#2f8a3a"/><path d="M0,0q-12,-5 -20,2M0,0q11,-7 21,-1M0,0q-5,-10 -14,-10" fill="none" stroke="#7fd06a" stroke-width="1.3" stroke-linecap="round"/><circle cx="-1" cy="2" r="2.6" fill="#6b4520"/><circle cx="3" cy="2.6" r="2.3" fill="#5a3818"/></g></g>`};
const BUSH=(x,y,s=1,c='#3f9a3a')=>`<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="2" cy="2" rx="13" ry="4.5" fill="#0b2a12" opacity=".3"/><circle cx="-6" cy="-3" r="6.5" fill="${c}"/><circle cx="6" cy="-3" r="7" fill="${c}"/><circle cx="0" cy="-8" r="7.5" fill="${c}"/><circle cx="-2" cy="-11" r="3.6" fill="#8fdc6a" opacity=".55"/><circle cx="-8" cy="-5" r="2.4" fill="#8fdc6a" opacity=".45"/><circle cx="7" cy="-1" r="4" fill="#1d5e24" opacity=".35"/></g>`;
const TREE=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="3" cy="1" rx="12" ry="4" fill="#0b2a12" opacity=".3"/><path d="M0,0v-10" stroke="#6b4520" stroke-width="3.4"/><circle cx="-6" cy="-14" r="8" fill="#2f7d33"/><circle cx="6" cy="-14" r="8" fill="#2a7330"/><circle cx="0" cy="-22" r="9" fill="#36903a"/><circle cx="-3" cy="-25" r="4" fill="#86d466" opacity=".5"/><circle cx="-8" cy="-16" r="3" fill="#86d466" opacity=".4"/></g>`;
const ROCKCOL=(x0,y0,x1,y1,h,n,sd,dark)=>{let s='';const r=k=>{const v=Math.sin((k+sd)*12.9898)*43758.5453;return v-Math.floor(v)};
 for(let k=0;k<n;k++){const t0=k/n,t1=(k+1)/n,ax=x0+(x1-x0)*t0,ay=y0+(y1-y0)*t0,bx=x0+(x1-x0)*t1,by=y0+(y1-y0)*t1,hh=h*(.75+r(k)*.4),mx=(ax+bx)/2,my=(ay+by)/2;
  const base=dark?['#6a5f55','#5a5047','#776a5d']:['#9a8a76','#8a7a68','#a8977f'],c=base[k%3];
  s+=`<polygon points="${ax.toFixed(1)},${ay.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)} ${(bx+(r(k+3)-.5)*3).toFixed(1)},${(by+hh).toFixed(1)} ${(ax+(r(k+5)-.5)*3).toFixed(1)},${(ay+hh*.95).toFixed(1)}" fill="${c}"/>`+
   `<polygon points="${ax.toFixed(1)},${ay.toFixed(1)} ${(ax+(bx-ax)*.35).toFixed(1)},${(ay+(by-ay)*.35).toFixed(1)} ${(ax+(bx-ax)*.3).toFixed(1)},${(ay+hh*.9).toFixed(1)} ${ax.toFixed(1)},${(ay+hh*.9).toFixed(1)}" fill="#fff" opacity="${dark?.1:.22}"/>`+
   `<path d="M${mx.toFixed(1)},${(my+hh*.3).toFixed(1)}l${((r(k+7)-.5)*4).toFixed(1)},${(hh*.25).toFixed(1)}" stroke="#2b241e" stroke-width="1" opacity=".4"/>`}
 return s};
const islSvg=(mine,ix)=>{if(typeof ENV!=='undefined'&&ENV.isla_1){const v=ENV['isla_'+(1+((ix||0)%3))];return `<svg class="art" viewBox="0 0 170 130"><image href="${v}" x="-12" y="-24" width="194" height="194"/>${rsh(88,74,26,9)}<g transform="translate(54,-8) scale(.66)">${FORT(mine?'#2f7fe0':'#c23b2b',mine?6:3)}</g></svg>`}const sd=mine?3:7;let s=`<svg class="art" viewBox="0 0 170 130"><ellipse cx="85" cy="104" rx="84" ry="27" fill="#04314a" opacity=".35"/><ellipse cx="85" cy="96" rx="82" ry="27" fill="#7fe3ee" opacity=".28"/><ellipse class="foam" cx="85" cy="96" rx="77" ry="24" fill="none" stroke="#fff" stroke-width="3.4" opacity=".75" stroke-dasharray="14 5"/><ellipse class="foam" cx="85" cy="99" rx="81" ry="26" fill="none" stroke="#fff" stroke-width="1.6" opacity=".45" stroke-dasharray="8 7" style="animation-delay:-1.4s"/>`;
 // acantilado: columnas de roca alrededor del borde delantero
 const pts=[];for(let k=0;k<=16;k++){const a=Math.PI*(k/16);pts.push([85-Math.cos(a)*70,74+Math.sin(a)*22])}
 for(let k=0;k<16;k++){const[a,b]=[pts[k],pts[k+1]];s+=ROCKCOL(a[0],a[1],b[0],b[1],18,1,k+sd,k>8)}
 s+=`<path d="M15,74A70,22 0 0 0 155,74" fill="none" stroke="#2b241e" stroke-width="1.2" opacity=".35"/>`;
 s+=`<ellipse cx="85" cy="73" rx="71" ry="23" fill="#4f9e33"/><ellipse cx="85" cy="71" rx="66" ry="20" fill="#62b23f"/><ellipse cx="80" cy="68" rx="48" ry="13" fill="#7cc653" opacity=".7"/><ellipse cx="85" cy="73" rx="71" ry="23" fill="url(#gsun)"/><path d="M16,72A70,22 0 0 1 154,72" fill="none" stroke="#a7e57a" stroke-width="1.6" opacity=".6"/>`;
 s+=`<path d="M60,88q10,-8 26,-6q14,2 22,-4" fill="none" stroke="#c69a5c" stroke-width="5" stroke-linecap="round" opacity=".85"/>`;
 s+=PALM(32,74,.95,sd)+PALM(140,76,.85,sd+2)+PALM(122,60,.7,sd+5)+BUSH(22,84,.7)+BUSH(150,86,.6,'#368a35')+BUSH(56,90,.55,'#46a13c')+TREE(112,90,.6);
 s+=`${rsh(96,81,30,11)}<g transform="translate(52,12) scale(.66)">${FORT(mine?'#2f7fe0':'#c23b2b',mine?6:3)}</g>${mine?ball(124,82,4,'#f6b51e')+ball(131,84,4,'#f6b51e')+ball(127,78,4,'#ffd35a'):''}</svg>`;
 return s};
const FORT=(rf='#c23b2b',lv)=>{if(typeof PIMG!=='undefined'&&PIMG.hq)return pimgTag('hq',lv||3);const c='#8f939c',t=(u,v)=>box(u,v,u+.2,v+.2,0,27,sh(c,.95))+pyr(u-.02,v-.02,u+.22,v+.22,27,13,rf);
 return shd(.06,.06,.94,.94,.1)+t(.06,.06)+box(.12,.12,.88,.88,0,15,c)+wL(.42,.58,.88,0,10,'#25262b')+box(.32,.32,.68,.68,15,38,sh(c,.9))+wL(.45,.55,.68,24,31,'#25262b')+wR(.45,.55,.68,24,31,'#1b1c20')+pyr(.29,.29,.71,.71,38,16,rf)+flag(.5,.5,54,68,rf)+t(.74,.06)+t(.06,.74)+t(.74,.74)};
const SCAF=front=>{const L=(a,b)=>ln(a,b,'#b98a4a',1.3);
 if(!front)return pg([[.06,.06],[.94,.06],[.94,.94],[.06,.94]],'#b08a5a')+L([.12,.12,0],[.12,.12,46])+[22,46].map(z=>L([.12,.12,z],[.88,.12,z])+L([.12,.12,z],[.12,.88,z])).join('');
 return L([.88,.12,0],[.88,.12,46])+L([.12,.88,0],[.12,.88,46])+L([.88,.88,0],[.88,.88,46])+[22,46].map(z=>L([.88,.12,z],[.88,.88,z])+L([.12,.88,z],[.88,.88,z])).join('')+L([.12,.88,0],[.88,.88,22])+L([.88,.88,0],[.88,.12,22])};
const svgArt=(k,l=1)=>`<svg class="art" viewBox="0 0 100 120">${artL(k,l)}</svg>`;
const fortSvg=()=>`<svg class="art" viewBox="0 0 100 120">${FORT()}</svg>`;
/* Texturas del suelo (pasto, roca, arena): ruido fractal que se repite sin cortes, generado una sola vez */
const TEXU={};
function mkTex(n,kind){const c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),im=g.createImageData(n,n),d=im.data,R=rng32(kind.length*911+7);
 const oct=[[4,.5],[8,.27],[16,.15],[32,.08]].map(([f,a])=>{const v=[];for(let i=0;i<f*f;i++)v.push(R());return{f,a,v}});
 const val=(o,x,y)=>{const fx=x/n*o.f,fy=y/n*o.f,x0=Math.floor(fx),y0=Math.floor(fy),tx=fx-x0,ty=fy-y0,s=t=>t*t*(3-2*t),q=(i,j)=>o.v[((j+o.f)%o.f)*o.f+((i+o.f)%o.f)];const a=q(x0,y0),b=q(x0+1,y0),cc=q(x0,y0+1),dd=q(x0+1,y0+1),u=s(tx),w=s(ty);return(a*(1-u)+b*u)*(1-w)+(cc*(1-u)+dd*u)*w};
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){let v=0;for(const o of oct)v+=val(o,kind==='r'?x*.5:x,kind==='r'?y*2:y)*o.a;v=v/1.0;if(kind==='s')v=v*.5+R()*.5;const L=Math.max(0,Math.min(255,Math.round(128+(v-.5)*(kind==='g'?190:kind==='r'?230:120)))),k=(y*n+x)*4;d[k]=d[k+1]=d[k+2]=L;d[k+3]=255}
 g.putImageData(im,0,0);
 if(kind==='g'){for(let i=0;i<420;i++){const x=R()*n,y=R()*n,l=2+R()*4;g.strokeStyle=R()<.5?'rgba(0,0,0,.22)':'rgba(255,255,255,.2)';g.lineWidth=.8;g.beginPath();g.moveTo(x,y);g.lineTo(x+(R()-.5)*1.6,y-l);g.stroke()}}
 if(kind==='r'){for(let i=0;i<60;i++){const y=R()*n;g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=1+R();g.beginPath();g.moveTo(0,y);for(let x=0;x<=n;x+=16)g.lineTo(x,y+(R()-.5)*3);g.stroke()}}
 return c.toDataURL('image/png')}
const texU=k=>{if(TEXU[k]==null){try{TEXU[k]=mkTex(k==='g'?160:128,k)}catch(e){TEXU[k]=''}}return TEXU[k]};
const texDefs=()=>`<pattern id="tgP" width="150" height="150" patternUnits="userSpaceOnUse"><image href="${texU('g')}" width="150" height="150"/></pattern><pattern id="trP" width="120" height="120" patternUnits="userSpaceOnUse"><image href="${texU('r')}" width="120" height="120" preserveAspectRatio="none"/></pattern><pattern id="tsP" width="90" height="90" patternUnits="userSpaceOnUse"><image href="${texU('s')}" width="90" height="90"/></pattern>`;
let GX=[];
const gExtra=k=>GX.join('').replace(/style="[^"]*"/g,s=>s.replace(/(-?[\d.]+)u\b/g,(m,v)=>(+v*k).toFixed(1)+'px'));
function ground(N,tw,war){
 GX.length=0;const VEG=(x,y,svg,amp,k)=>GX.push(`<div class="veg" style="left:${x-30}u;top:${y-58}u;width:62u;height:66u;--sw:${(1.2+amp*2.2).toFixed(1)}deg;animation-delay:-${(k*.37%4).toFixed(2)}s;animation-duration:${(3.2+(k%5)*.4).toFixed(1)}s"><svg viewBox="-30 -58 62 66">${svg}</svg></div>`);
 const rnd=n=>{const x=Math.sin(n*12.9898)*43758.5453;return x-Math.floor(x)};
 const jag=(x0,y0,x1,y1,n,sd,amp=20)=>{let s='';for(let k=0;k<=n;k++){const t=k/n;s+=`${Math.round(x0+(x1-x0)*t)},${Math.round(y0+(y1-y0)*t+(k%n?rnd(k*sd)*amp:0))} `}return s};
 const W=N*100,M=N*50,Q=N*25+110,E=N*50+110,sg=Math.round(N*1.2),z=war?1:0,P=(u,v)=>[Math.round((u-v)*50+M),Math.round((u+v)*25+110)];
 const G=war?['#6d7f45','#687b43','#72844a','#66783f']:['#6cbd43','#67b740','#72c349','#63b13d'];
 let h=`<svg viewBox="0 0 ${W} ${E+110}" width="${N*tw}" height="${(N*.5+2.2)*tw}"><defs>`+
  `<pattern id="ggr${z}" width="26" height="14" patternUnits="userSpaceOnUse"><path d="M3 11l1-4M6 12l2-5M15 6l1-4M18 7l2-4M22 13l1-3" stroke="${war?'#4e5f33':'#5aa83a'}" stroke-width="1.1" stroke-linecap="round" opacity=".5"/><circle cx="11" cy="9" r=".9" fill="${war?'#8a8a6a':'#d4f5a8'}" opacity=".55"/></pattern>`+
  `<radialGradient id="gpd${z}"><stop offset="0" stop-color="${war?'#4d5a30':'#3f8a2a'}" stop-opacity=".38"/><stop offset="1" stop-color="${war?'#4d5a30':'#3f8a2a'}" stop-opacity="0"/></radialGradient>`+
  `<radialGradient id="gpl${z}"><stop offset="0" stop-color="${war?'#8a8250':'#c9f394'}" stop-opacity=".4"/><stop offset="1" stop-color="${war?'#8a8250':'#c9f394'}" stop-opacity="0"/></radialGradient>`+
  `<linearGradient id="gcl${z}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>`+
  `<linearGradient id="gsd${z}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f3e3b0"/><stop offset=".6" stop-color="#e2cb8d"/><stop offset="1" stop-color="#c9ad6c"/></linearGradient>`+texDefs()+`</defs>`;
 const EV=typeof ENV!=='undefined'&&ENV.tex_pasto;
 if(EV)h+=`<defs><pattern id="eP${z}" width="230" height="230" patternUnits="userSpaceOnUse" patternTransform="scale(1,.5) rotate(45)"><image href="${ENV.tex_pasto}" width="230" height="230"/></pattern>`+
  `<pattern id="eT${z}" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="scale(1,.5) rotate(45)"><image href="${ENV.tex_tierra}" width="120" height="120"/></pattern>`+
  `<pattern id="eA${z}" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform="scale(1,.5) rotate(45)"><image href="${ENV.tex_arena}" width="160" height="160"/></pattern>`+
  `<pattern id="eRL${z}" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="translate(0,${Q-4}) skewY(26.565)"><image href="${ENV.tex_roca}" width="80" height="80" preserveAspectRatio="none"/></pattern>`+
  `<pattern id="eRR${z}" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="translate(${M},${E-4}) skewY(-26.565)"><image href="${ENV.tex_roca}" width="80" height="80" preserveAspectRatio="none"/></pattern></defs>`;
 const IMG=(k,x,y,s)=>`<image href="${ENV[k]}" x="${(x-31*s).toFixed(1)}" y="${(y-60.5*s).toFixed(1)}" width="${(62*s).toFixed(1)}" height="${(62*s).toFixed(1)}"/>`;
 /* agua: halo claro alrededor de la isla, brillos y sombra */
 h+=`<defs><radialGradient id="gshw${z}"><stop offset=".55" stop-color="#5fe0e6" stop-opacity=".55"/><stop offset=".8" stop-color="#2fc0d0" stop-opacity=".25"/><stop offset="1" stop-color="#2fc0d0" stop-opacity="0"/></radialGradient></defs><ellipse cx="${M}" cy="${Q+60}" rx="${M+120}" ry="${(E-110)/2+110}" fill="url(#gshw${z})"/>`;
 for(let k=0;k<26;k++){const s=k%2,t=rnd(k+300),x=Math.round(s?M+t*(M+90):-90+t*(M+90)),y=Math.round(Q+60+(s?(1-t):t)*(E-Q)+rnd(k+400)*70);GX.push(`<i class="glint" style="left:${x-6}u;top:${y-2}u;width:${(8+rnd(k)*12)|0}u;height:3u;animation-delay:-${(rnd(k+500)*3.2).toFixed(2)}s"></i>`)}
 h+=`<polygon points="-10,${Q+40} ${M},${E+45} ${W+10},${Q+40} ${W+10},${Q+88} ${M},${E+98} -10,${Q+88}" fill="#0a3a66" opacity=".3"/>`;
 /* acantilado con capas de roca */
 const lf=`0,${Q} ${M},${E} ${jag(M,E+62,0,Q+62,sg,1.7)}`,rf=`${W},${Q} ${M},${E} ${jag(M,E+62,W,Q+62,sg,2.3)}`;
 h+=EV?`<polygon points="${lf}" fill="url(#eRL${z})"/><polygon points="${rf}" fill="url(#eRR${z})"/><polygon points="${rf}" fill="#000" opacity=".22"/>`:`<polygon points="${lf}" fill="#7d6e5e"/><polygon points="${rf}" fill="#5a4f45"/>`+ROCKCOL(0,Q+6,M,E+6,56,sg*2,11,0)+ROCKCOL(M,E+6,W,Q+6,56,sg*2,23,1);
 if(!EV)for(let k=0;k<14;k++){const s=k%2,t=.06+rnd(k+90)*.88,x=Math.round(s?W-M*t:M*t),y=Math.round(Q+(E-Q)*t+22+rnd(k+70)*30),c=s?'#5e4a3a':'#7d6650';h+=`<polygon points="${x-7},${y} ${x-3},${y-6} ${x+5},${y-5} ${x+8},${y+1} ${x},${y+4}" fill="${c}"/><polygon points="${x-3},${y-6} ${x+5},${y-5} ${x+1},${y-1}" fill="#a39380" opacity=".7"/>`}
 h+=(EV?'':`<polygon points="${lf}" fill="url(#trP)" style="mix-blend-mode:overlay" opacity=".4"/><polygon points="${rf}" fill="url(#trP)" style="mix-blend-mode:overlay" opacity=".4"/>`)+`<polygon points="${lf}" fill="url(#gcl${z})"/><polygon points="${rf}" fill="url(#gcl${z})"/>`;
 if(EV){let r='';for(let k=0;k<sg*2;k++){const s=k%2,t=.03+rnd(k+1200)*.94,x=s?M+(W-M)*t:M*t,y=s?E+(Q-E)*t+70:Q+(E-Q)*t+70;r+=IMG('roca_'+(1+(k%3)),x,y,.55+rnd(k+1300)*.35)}h+=r}else {let r='';for(let k=0;k<sg*3;k++){const s=k%2,t=.03+rnd(k+1200)*.94,x=s?M+(W-M)*t:M*t,y=s?E+(Q-E)*t+60:Q+(E-Q)*t+60,w=8+rnd(k+1300)*14,hh=w*.7,c=s?'#4e453d':'#6e6254';
  r+=`<ellipse cx="${x.toFixed(0)}" cy="${(y+hh*.35).toFixed(0)}" rx="${(w*1.3).toFixed(0)}" ry="${(w*.45).toFixed(0)}" fill="#fff" opacity=".55" /><path d="M${(x-w).toFixed(0)},${(y+hh*.3).toFixed(0)}q${(w*.2).toFixed(0)},-${hh.toFixed(0)} ${w.toFixed(0)},-${(hh*1.1).toFixed(0)}q${(w*.8).toFixed(0)},0 ${w.toFixed(0)},${(hh*1.1).toFixed(0)}z" fill="${c}"/><path d="M${(x-w*.7).toFixed(0)},${(y-hh*.1).toFixed(0)}q${(w*.3).toFixed(0)},-${(hh*.7).toFixed(0)} ${(w*.7).toFixed(0)},-${(hh*.75).toFixed(0)}" stroke="#fff" stroke-width="1.5" fill="none" opacity=".22"/>`}h+=r}
 h+=`<polyline points="-4,${Q+66} ${M},${E+68} ${W+4},${Q+66}" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round" opacity=".55"/><polyline points="-8,${Q+80} ${M},${E+84} ${W+8},${Q+80}" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" opacity=".3" style="animation-delay:-1.5s"/>`;
 for(let k=0;k<3;k++)GX.push(`<svg class="wv" style="left:-20u;top:${Q+40}u;width:${W+40}u;height:${E-Q+70}u;animation-delay:-${(k*1.4).toFixed(1)}s" viewBox="-20 ${Q+40} ${W+40} ${E-Q+70}"><polyline points="${jag(-10,Q+72+k*6,M,E+76+k*6,sg*2,k+40,7)}${jag(M,E+76+k*6,W+10,Q+72+k*6,sg*2,k+60,7)}" fill="none" stroke="#fff" stroke-width="${3-k*.7}" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${24+k*14} ${10+k*8}"/></svg>`);
 h+=`<polygon points="0,${Q} ${M},${E} ${M},${E+14} 0,${Q+14}" fill="${war?'#56702f':'#4c9a2f'}"/><polygon points="${W},${Q} ${M},${E} ${M},${E+14} ${W},${Q+14}" fill="${war?'#45602a':'#3b8226'}"/>`;
 /* pasto: casilleros con variación suave, textura, manchas de luz y sombra, matas y flores */
 {const L=[0,Q],T=[M,110],Rr=[W,Q],sg2=Math.max(6,N*2),edge=(a,b,nx,ny,sd)=>{let s='';for(let k=1;k<sg2;k++){const t=k/sg2,o=10+rnd(k*sd+N)*34;s+=`${Math.round(a[0]+(b[0]-a[0])*t+nx*o)},${Math.round(a[1]+(b[1]-a[1])*t+ny*o)} `}return s};
  const outer=`${L[0]-14},${L[1]} ${edge(L,T,-.447,-.894,3.7)}${T[0]},${T[1]-26} ${edge(T,Rr,.447,-.894,5.3)}${Rr[0]+14},${Rr[1]}`;
  h+=`<polygon points="${outer} ${Rr[0]},${Rr[1]} ${T[0]},${T[1]} ${L[0]},${L[1]}" fill="#bdf6ff" opacity=".35" transform="translate(0,-6) scale(1)"/><polygon points="${outer} ${Rr[0]},${Rr[1]} ${T[0]},${T[1]} ${L[0]},${L[1]}" fill="${EV?`url(#eA${z})`:war?'#cbb98a':'#ecd9a0'}"/><polyline points="${outer}" fill="none" stroke="#ffffff" stroke-width="3" opacity=".55"/>`;
  for(let k=0;k<2;k++)GX.push(`<svg class="wvt" style="left:-40u;top:40u;width:${W+80}u;height:${Q+30}u;animation-delay:-${(k*2.3).toFixed(1)}s" viewBox="-40 40 ${W+80} ${Q+30}"><polyline points="${outer}" fill="none" stroke="#fff" stroke-width="${3.5-k}" stroke-linejoin="round" stroke-dasharray="${50+k*30} ${16+k*10}"/></svg>`);
  for(let k=0;k<Math.round(N*.9);k++){const s=k%2,t=.12+rnd(k+700)*.76,a=s?T:L,b=s?Rr:T,x=a[0]+(b[0]-a[0])*t+(s?.447:-.447)*16,y=a[1]+(b[1]-a[1])*t-.894*16;if(EV){h+=rnd(k+800)<.5?IMG('roca_'+(1+k%3),x,y+4,.45):IMG('palmera_'+(1+k%3),x,y,.95)}else if(rnd(k+800)<.5)h+=`<polygon points="${x-7},${y} ${x-3},${y-6} ${x+5},${y-5} ${x+8},${y+1} ${x},${y+4}" fill="#8c8f94"/>`;else h+=`<path d="M${x},${y}q-3,-12 2,-22" stroke="#8a5a2b" stroke-width="2.4" fill="none"/><path d="M${x+2},${y-22}q-10,-3 -15,3M${x+2},${y-22}q9,-6 15,0M${x+2},${y-22}q-4,-8 -11,-8M${x+2},${y-22}q5,-8 12,-6" stroke="#3f9a48" stroke-width="2.6" fill="none" stroke-linecap="round"/>`}}
 let det='';
 for(let i=0;i<N*N;i++){const r=i/N|0,c=i%N,[x,y0]=P(c,r),y=y0,f=G[rnd(i*7.3)*G.length|0];
  h+=`<polygon points="${x},${y} ${x+50},${y+25} ${x},${y+50} ${x-50},${y+25}" fill="${f}" stroke="${f}" stroke-width=".6"/>`;
  const a=rnd(i+1),b=rnd(i+101),px=Math.round(x+(a-.5)*44),py=Math.round(y+25+(b-.5)*16);
  if(war){if(a<.18)det+=`<ellipse cx="${px}" cy="${py}" rx="${14+b*14|0}" ry="${7+b*7|0}" fill="#5b4a32" opacity=".55"/><ellipse cx="${px}" cy="${py-1}" rx="${8+b*8|0}" ry="${4+b*4|0}" fill="#2d261c" opacity=".55"/>`;else if(a<.5)det+=`<path d="M${px-4},${py}l1.5,-5l2,5l2,-6l2,6" fill="none" stroke="#4e5f33" stroke-width="1.5" stroke-linecap="round"/>`;else if(a>.93)det+=`<polygon points="${px-5},${py} ${px-1},${py-5} ${px+5},${py-3} ${px+6},${py+1}" fill="#6e6a62"/>`}
  else if(a<.32)det+=`<path d="M${px-5},${py}q1,-6 2,-8M${px-1},${py}q0,-7 1,-10M${px+3},${py}q1,-5 3,-7" fill="none" stroke="#4f9a32" stroke-width="1.6" stroke-linecap="round"/><path d="M${px-3},${py}q1,-4 2,-6M${px+1},${py}q1,-4 2,-6" fill="none" stroke="#9ee06a" stroke-width="1.1" stroke-linecap="round"/>`;
  else if(a>.9){const cs=b>.6?['#fff','#ffe066']:b>.3?['#ff8fb8','#fff']:['#b9a4ff','#ffe066'];det+=`<circle cx="${px}" cy="${py}" r="2.2" fill="${cs[0]}"/><circle cx="${px+5}" cy="${py+2}" r="1.9" fill="${cs[1]}"/><circle cx="${px-4}" cy="${py+3}" r="1.7" fill="${cs[0]}"/>`}
  else if(a>.86)det+=`<ellipse cx="${px}" cy="${py+1}" rx="4" ry="2" fill="#000" opacity=".15"/><ellipse cx="${px}" cy="${py-1}" rx="3.5" ry="2.4" fill="#9aa1a8"/>`;
 }
 const top=`${M},110 ${W},${Q} ${M},${E} 0,${Q}`;
 h+=EV?`<polygon points="${top}" fill="url(#eP${z})"/>${war?`<polygon points="${top}" fill="#5a5030" opacity=".28"/>`:''}`:`<polygon points="${top}" fill="url(#tgP)" style="mix-blend-mode:soft-light"/><polygon points="${top}" fill="url(#ggr${z})"/>`;
 /* caminos de tierra que cruzan la isla */
 if(!war){const path=(f2)=>{let s='';for(let k=0;k<=40;k++){const t=k/40,[u,v]=f2(t);const[x,y]=P(u,v);s+=`${x},${y} `}return s};
  const ps=[path(t=>[t*N,N*.5+Math.sin(t*6.283*1.2+.8)*N*.12]),path(t=>[N*.42+Math.sin(t*6.283+2)*N*.1,t*N*.55])];
  for(const p of ps)h+=EV?`<polyline points="${p}" fill="none" stroke="#6e5232" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/><polyline points="${p}" fill="none" stroke="url(#eT${z})" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`:`<polyline points="${p}" fill="none" stroke="#8a6a3e" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/><polyline points="${p}" fill="none" stroke="#c49a5e" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${p}" fill="none" stroke="#d9b678" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/><polyline points="${p}" fill="none" stroke="url(#tsP)" stroke-width="22" stroke-linecap="round" style="mix-blend-mode:soft-light"/>`}
 for(let k=0;k<Math.round(N*1.6);k++){const u=(.08+rnd(k+7)*.84)*N,v=(.08+rnd(k+31)*.84)*N,[x,y]=P(u,v),r=50+rnd(k+3)*90;det=`<ellipse cx="${x}" cy="${y}" rx="${Math.round(r)}" ry="${Math.round(r/2)}" fill="url(#gp${k%3?'d':'l'}${z})"/>`+det}
 if(war)for(let k=0;k<5;k++){const u=(.15+rnd(k+77)*.7)*N,v=(.15+rnd(k+91)*.7)*N,[x,y]=P(u,v),L=60+rnd(k+5)*60;det+=`<path d="M${x-L},${y-L/2}L${x+L},${y+L/2}" stroke="#4b3f2c" stroke-width="5" stroke-dasharray="3 4" opacity=".45"/><path d="M${x-L+10},${y-L/2-8}L${x+L+10},${y+L/2-8}" stroke="#4b3f2c" stroke-width="5" stroke-dasharray="3 4" opacity=".45"/>`}
 /* playa delantera con arena húmeda y piedritas */
 det+=`<polygon points="0,${Q} ${M},${E} ${M},${E-22} 44,${Q}" fill="${EV?`url(#eA${z})`:`url(#gsd${z})`}"/><polygon points="${W},${Q} ${M},${E} ${M},${E-22} ${W-44},${Q}" fill="${EV?`url(#eA${z})`:`url(#gsd${z})`}"/>`;
 det+=`<polygon points="0,${Q} ${M},${E} ${M},${E-22} 44,${Q}" fill="url(#tsP)" style="mix-blend-mode:soft-light"/><polygon points="${W},${Q} ${M},${E} ${M},${E-22} ${W-44},${Q}" fill="url(#tsP)" style="mix-blend-mode:soft-light"/><polyline points="0,${Q} ${M},${E} ${W},${Q}" fill="none" stroke="#b89a5c" stroke-width="3" opacity=".6"/>`;
 for(let k=0;k<18;k++){const s=k%2,t=.05+rnd(k+500)*.9,x=Math.round(s?W-(M-22)*t-22:22+(M-22)*t),y=Math.round(Q+(E-Q)*t-6-rnd(k+600)*8);det+=`<ellipse cx="${x}" cy="${y}" rx="2.2" ry="1.4" fill="#a8946a"/>`}
 if(!war){let v='';const L=[0,Q],T=[M,110],R2=[W,Q];
  for(let k=0;k<N*2;k++){const s=k%2,t=.06+rnd(k+910)*.88,a=s?T:L,b=s?R2:T,o=8+rnd(k+930)*16,x=a[0]+(b[0]-a[0])*t+(s?.447:-.447)*o,y=a[1]+(b[1]-a[1])*t-.894*o,r=rnd(k+950);VEG(x,y,EV?(r<.5?IMG('palmera_'+(1+k%3),0,0,1.05+rnd(k)*.3):IMG('arbusto_'+(1+k%3),0,0,.6+rnd(k)*.3)):r<.35?PALM(0,0,.8+rnd(k)*.3,k):r<.7?BUSH(0,0,.7+rnd(k)*.4,['#3f9a3a','#368a35','#46a13c'][k%3]):TREE(0,0,.75+rnd(k)*.3),r<.5?1:.4,k)}
  for(let k=0;k<Math.round(N*1.2);k++){const s=k%2,t=.05+rnd(k+970)*.9,x=s?W-M*t:M*t,y=Q+(E-Q)*t-4;v+=EV?IMG('arbusto_'+(1+k%3),x,y,.38+rnd(k+990)*.2):BUSH(x,y,.45+rnd(k+990)*.25,['#3f9a3a','#2f8a32'][k%2])}
  det+=v}
 return h+det+`<polygon points="${top}" fill="url(#gsun)"/><polyline points="0,${Q} ${M},110 ${W},${Q}" fill="none" stroke="${war?'#9aab6a':'#c4f29a'}" stroke-width="3" stroke-linejoin="round" opacity=".75"/></svg>`;
}
/*ART-END*/
const BY={casa:[11,6],granja:[9,0],pozo:[-1,5],banco:[11,5],mina:[8,2],central:[0,0]};
const $=s=>document.querySelector(s);
const now=()=>Date.now();
const fmt=n=>{n=Math.floor(n);return n>=100000?Math.round(n/1000)+'k':n>=10000?(n/1000).toFixed(1)+'k':String(n)};

function genEnemies(){
 const names=['Coronel Mostaza','General Bigotes','Capitana Tormenta','Barón Bulón','Mariscal Pimienta','Comandante Chispa','Duquesa Dinamita','Almirante Ñoqui','Sargento Trueno','Condesa Pólvora','Capitán Ancla','Doctor Tornillo','Jefa Centella','Gran Kaiser'];
 const faces=['🤠','🧔','👩‍✈️','🤴','👨‍🍳','🧑‍🚀','👸','🧙','💂','🧛','🧑‍✈️','🧑‍🔬','🦸','🤖'];
 return names.map((n,i)=>({n,f:faces[i],lvl:i+1}));
}
function fresh(){
 const t=now(),g=Array(N*N).fill(null);
 const put=(i,ty,rd)=>{const d=B[ty];g[i]={t:ty,l:1,end:0,dur:0,lc:d.per&&rd?t-d.per*1000:t}};
 put(44,'casa',1);put(45,'casa',0);put(55,'granja',1);
 [0,1,10,9,19,90,80,99,98,89].forEach((i,k)=>put(i,k%2?'pino':'arbol'));
 return {v:1,size:10,c:400,f:60,o:0,s:0,e:0,xp:0,lvl:1,g,troops:{soldado:0,tanque:0,helicoptero:0,robot:0,dragon:0},queue:[],enemies:genEnemies(),isl:ISL.map((d,i)=>({o:i,lc:0})),tech:{atk:0,bld:0,gold:0},
  stats:{col:0,trained:0,byU:{},won:0,lost:0,maxBeat:0,def:0},mi:0,nextRaid:t+6*60000,zoom:1,help:0};
}
function load(){try{const s=JSON.parse(localStorage.getItem(SAVE));if(s&&s.v===1)return s}catch(e){}return null}
function save(){S.ts=now();try{localStorage.setItem(SAVE,JSON.stringify(S))}catch(e){}}
let S=load()||fresh();
/* Completa partidas guardadas con versiones anteriores del juego */
function migrate(){S.colb=S.colb||{};S.coli=S.coli||{};S.colr=S.colr||{};S.prof=S.prof||{n:'',av:'⭐',mo:'',ch:0,since:now()};S.cos=S.cos||{};S.cosU=S.cosU||{};if(S.tut==null)S.tut=S.help?99:0;S.wr=S.wr||{};S.sg=S.sg||{};if(S.story==null)S.story=0;S.cmd=S.cmd||{};S.rs=S.rs||{};S.inv=S.inv||[];S.exp=S.exp||[];S.chests=S.chests||[];S.colu=S.colu||{};if(S.diff==null)S.diff=1;S.trof=S.trof||0;S.streak=S.streak||0;S.spins=S.spins||0;S.ulv=S.ulv||{};S.troops=S.troops||{};for(const u in U){if(S.ulv[u]==null)S.ulv[u]=1;if(S.troops[u]==null)S.troops[u]=0}S.ubr=S.ubr||{};S.heroes=S.heroes||[];S.heroes.forEach(regHero);{const ge=genEnemies();while(S.enemies.length<ge.length){const e=ge[S.enemies.length];e.lvl=Math.max(1,S.lvl+S.enemies.length-9);S.enemies.push(e)}}if(S.isl)while(S.isl.length<ISL.length)S.isl.push({o:S.isl.length,lc:0});S.camp=S.camp||0;S.ach=S.ach||{};S.daily=S.daily||{d:'',n:0};S.ulv=S.ulv||{};for(const u in U)S.ulv[u]=S.ulv[u]||1;S.size=S.size||10;N=S.size;S.s=S.s||0;S.e=S.e||0;S.zoom=Math.max(.5,Math.min(3,S.zoom||1));S.tech=Object.assign({atk:0,bld:0,gold:0},S.tech);for(const u in U)S.troops[u]=S.troops[u]||0;if(!S.isl)S.isl=ISL.map((d,i)=>({o:i,lc:0}));S.enemies.forEach(e=>{if(!e.nx)e.nx=now()+(2+Math.random()*5)*60000})}
migrate();
let PL=null, MV=null;

const costPlain=o=>Object.entries(o).filter(([k,v])=>v>0).map(([k,v])=>RES[k]+fmt(v)).join(' ');
const costHTML=o=>Object.entries(o).map(([k,v])=>`<span class="cst ${S[k]>=v?'':'no'}">${RES[k]}${fmt(v)}</span>`).join(' ');
const can=o=>Object.entries(o).every(([k,v])=>S[k]>=v);
const pay=o=>{for(const k in o)S[k]-=o[k]};
const gain=o=>{for(const k in o)S[k]+=o[k]};
const mult=(o,m)=>{const r={};for(const k in o)r[k]=Math.round(o[k]*m);return r};
const prodOf=b=>{const p=mult(B[b.t].prod,LM[b.l]);{const R=RS(),pm=1+(R.prod||0);for(const k in p)p[k]=Math.round(p[k]*pm*(k==='c'?1+(R.gold||0):1))}{const cb=1+.05*colDone();if(cb>1)for(const k in p)p[k]=Math.round(p[k]*cb)}if(b.w)for(const k in p)p[k]=Math.round(p[k]*1.5);if(p.c)p.c=Math.round(p.c*(1+.2*S.tech.gold));if(now()<boostUntil)for(const k in p)p[k]*=2;return p};
const bm=()=>Math.pow(.85,S.tech.bld)*(1-(RS().bld||0));
/* Subir de nivel cuesta el precio base por el nivel; desde el 4 pide acero y desde el 6, energía */
const upCost=b=>{const d=B[b.t],n=b.l+1,c=mult(d.cost,b.t==='recolector'?2*n*n:n);if(n>=4)c.s=(c.s||0)+Math.round(d.cost.c*.065*(n-3));if(n>=6)c.e=(c.e||0)+Math.round(d.cost.c*.055*(n-5));if(c.s)c.s=Math.round(c.s*.4);if(c.e)c.e=Math.round(c.e*.45);return c};
const isCons=b=>b.end>now();
const done=b=>!(isCons(b)&&!b.up);
const ready=b=>{const d=B[b.t];return !!d.prod&&!isCons(b)&&now()-b.lc>=d.per*1000};
const cnt=t=>S.g.filter(b=>b&&b.t===t&&done(b)).length;
const need=l=>Math.round((60*l*l+40)*(l>=10?.8:1));
/* Un objetivo de ataque es un rival o una isla (que hereda cara y nivel de su dueño) */
const eDef0=e=>e.rb!=null?e.pw:e.boss?S.boss.p:e.ply!=null?PLY[e.ply].pow:e.tour!=null?Math.round(S.tour.p*TM[e.tour]):e.camp!=null?CAMP[e.camp].d:e.isl!=null?islDef(e.isl):Math.round(25*Math.pow(e.lvl,1.6)+5);
const eLoot0=e=>e.boss?{c:Math.round(S.boss.p*8)+1000,s:Math.round(S.boss.p),e:Math.round(S.boss.p*.5)}:e.ply!=null?{c:100+40*e.lvl}:e.tour!=null?{c:Math.round(S.tour.p*(1.5+e.tour*1.5))+100}:e.camp!=null?CAMP[e.camp].loot:e.isl!=null?{c:ISL[e.isl].gold*6}:{c:60*e.lvl+20,f:10*e.lvl,o:e.lvl>=2?15*e.lvl:0,s:e.lvl>=3?8*e.lvl:0};
const islDef=i=>Math.round(ISL[i].def*(1+.12*(S.enemies[S.isl[i].o].lvl-1))*dif().k);
/* Dificultad: los rivales y las islas se vuelven más duros y dan más botín. La racha y la venganza multiplican el botín. */
const DIFF=[{n:'😊 Normal',k:1,l:1,sp:1},{n:'😠 Difícil',k:1.35,l:1.5,sp:.6},{n:'💀 Brutal',k:1.8,l:2.2,sp:.4}],dif=()=>DIFF[S.diff==null?1:S.diff];
const isRiv=e=>S.enemies.includes(e);
const eDef=e=>e.wrd!=null?wDef(e.wrd):e.pw?e.pw:isRiv(e)?Math.round(eDef0(e)*dif().k):eDef0(e);
const revOn=e=>!!(S.rev&&now()<S.rev.end&&S.enemies[S.rev.e]===e);
const eLoot=e=>{let m=(1+.1*Math.min(10,S.streak||0))*(1+(RS().loot||0));if(isRiv(e)||e.isl!=null)m*=dif().l;if(revOn(e))m*=2;return mult(e.wrd!=null?{c:500*e.lvl,s:40*e.lvl,e:15*e.lvl}:e.story!=null?STO[e.story].rw:eLoot0(e),m)};

const islRate=i=>Math.round(ISL[i].gold*(1+.2*S.tech.gold)*(1+(RS().isl||0)));
const islAmt=i=>S.isl[i].o<0?Math.floor(Math.min(20*60000,now()-S.isl[i].lc)/60000*islRate(i)):0;
const islReady=i=>S.isl[i].o<0&&islAmt(i)>=islRate(i);
const target=k=>{if(k==='pv'&&typeof PVT!=='undefined'&&PVT)return PVT.e;if(String(k)[0]==='r'){const i=+String(k).slice(1),r=RBOSS[i],sp=rbSpec(i);return{n:r.n,f:r.f,lvl:Math.max(S.lvl,r.l)+2,rb:i,spec:sp,pw:sp.pw}}if(String(k)[0]==='w'){const i=+String(k).slice(1);return{n:WR[i].n,f:WR[i].f,lvl:wLvl(i),wrd:i}}if(String(k)[0]==='s'){const i=+String(k).slice(1),sp=storySpec(i);return{n:'Cap. '+(i+1)+': '+STO[i].n,f:STO[i].f,lvl:S.lvl,story:i,spec:sp,pw:sp.pw}}if(k==='k')return{n:'Kraken colosal',f:'🐙',lvl:S.lvl+1,kr:1,spec:krSpec()};if(k==='b')return{n:'Jefe mundial Coloso',f:'👹',lvl:S.lvl+2,boss:1,spec:bossSpec()};if(String(k)[0]==='p'){const i=+String(k).slice(1),r=PLY[i];return{n:r.n,f:'🌐',lvl:r.lvl,ply:i,spec:r.sp}}if(String(k)[0]==='t'){const r=+String(k).slice(1);return{n:'Mini torneo · ronda '+(r+1)+' de 3',f:'🏆',lvl:S.lvl,tour:r}}if(String(k)[0]==='c'){const i=+String(k).slice(1),c=CAMP[i];return{n:c.n,f:c.f,lvl:c.l,camp:i}}if(String(k)[0]!=='i')return S.enemies[+k];const i=+String(k).slice(1),o=S.enemies[S.isl[i].o];return{n:ISL[i].n,f:o.f,lvl:o.lvl,isl:i}};
const armyPow=o=>{let p=0;for(const u in U)p+=(o[u]||0)*rating(u);return Math.round(p)};
function defense(){let d=0;for(const b of S.g)if(b&&B[b.t].def&&done(b))d+=B[b.t].def*LM[b.l];d+=armyPow(S.troops)*0.5;return Math.round(d)}
function speed(u){let s=0;for(const b of S.g)if(b&&b.t===U[u].b&&done(b))s+=b.l;return s}
const ft=ms=>{let s=Math.max(0,Math.ceil(ms/1000));if(s<60)return s+'s';let m=Math.floor(s/60);s%=60;if(m<60)return m+'m '+String(s).padStart(2,'0')+'s';return Math.floor(m/60)+'h '+(m%60)+'m'};
const rushCost=b=>5+Math.ceil(Math.max(0,b.end-now())/1000);
const sellVal=b=>Math.floor((B[b.t].cost.c||0)*0.5*b.l);

