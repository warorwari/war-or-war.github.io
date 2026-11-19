/* interfaz pintada: paneles, botones, barras y pantalla de carga (imágenes de assets/entorno) */
(function uiPaint(){if(typeof ENV==='undefined')return;const R=document.documentElement.style,set=(v,k)=>{if(ENV[k])R.setProperty(v,`url(${ENV[k]})`)};
 [['--ui-panel','panel'],['--ui-titulo','titulo'],['--ui-oro','btn_dorado'],['--ui-rojo','btn_rojo'],['--ui-verde','btn_verde'],['--ui-azul','btn_azul'],['--ui-gris','btn_gris'],['--ui-cerrar','btn_cerrar'],['--ui-pest','pestana'],['--ui-arriba','barra_arriba'],['--ui-abajo','barra_abajo'],['--ui-res','casillero_recurso'],['--ui-cartel','cartel_isla'],['--ui-carga','carga'],['--ui-logo','logo']].forEach(([v,k])=>set(v,k));
 if(ENV.panel)document.documentElement.classList.add('pui');})();
/* ---------- vida en la base: aldeanos, grúas, polvo al terminar obras, íconos dibujados ---------- */
const CRANE=`<svg class="crane" viewBox="0 0 60 80"><path d="M18 80V8M22 80V8M18 20l4 6-4 6 4 6-4 6 4 6-4 6 4 6-4 6" stroke="#e7a31a" stroke-width="1.6" fill="none"/><g class="arm"><path d="M2 6H58M8 6l12-5 12 5" stroke="#f0b42a" stroke-width="2.2" fill="none"/><rect x="0" y="4" width="7" height="6" fill="#55606b"/><g class="hk"><path d="M48 6v20" stroke="#333" stroke-width=".8"/><rect x="44" y="26" width="8" height="5" fill="#8a5a2b"/></g></g><rect x="14" y="76" width="12" height="4" fill="#55606b"/></svg>`;
function dustAt(x,y){if(LITE||S.eco)return;const m=$('#map');if(!m)return;for(let k=0;k<7;k++){const d=document.createElement('div'),a=k/7*6.283,r=tw*.5;d.className='dust';d.style.cssText=`left:${x}px;top:${y}px;width:${tw*.45}px;height:${tw*.28}px;--dx:${(Math.cos(a)*r).toFixed(0)}px;--dy:${(Math.sin(a)*r*.5).toFixed(0)}px`;m.appendChild(d);setTimeout(()=>d.remove(),950)}}
const VIL=[],VCOL=[['#c0392b','#2c3e50'],['#2e86de','#34495e'],['#27ae60','#5d4037'],['#f39c12','#37474f'],['#8e44ad','#263238'],['#e67e22','#3e2723']],VSK=['#f1c27d','#e0ac69','#c68642','#8d5524'];
function vilSvg(k){const[a,b]=VCOL[k%VCOL.length],s=VSK[k%4];return`<svg viewBox="0 0 10 18"><ellipse cx="5" cy="17.2" rx="3.6" ry="1.1" fill="#0004"/><rect x="3" y="11" width="1.7" height="6" rx=".8" fill="${b}"/><rect x="5.3" y="11" width="1.7" height="6" rx=".8" fill="${b}"/><rect x="2.4" y="5.6" width="5.2" height="6.4" rx="2" fill="${a}"/><circle cx="5" cy="3.6" r="2.4" fill="${s}"/><path d="M2.6 3.2q2.4-3 4.8 0" fill="#3b2a1a"/></svg>`}
function vilTick(){const box=$('#vils');if(!box)return;const hasV=typeof ENV!=='undefined'&&ENV.aldeano_1;const n=S.eco||!hasV?0:Math.min(LITE?3:6,2+Math.floor(S.g.filter(Boolean).length/5));
 while(VIL.length<n){const el=document.createElement('div');el.className='vil';const vk='aldeano_'+(1+VIL.length%4);el.innerHTML=`<svg viewBox="0 0 10 18"><image href="${ENV[vk]||ENV.aldeano_1}" x="-4" y="-2" width="18" height="20"/></svg>`;box.appendChild(el);VIL.push({el,i:-1,busy:0})}
 while(VIL.length>n){VIL.pop().el.remove()}
 const free=[];for(let i=0;i<N*N;i++)if(!S.g[i])free.push(i);if(!free.length)return;const t=performance.now();
 for(const v of VIL){if(v.busy>t)continue;const to=free[Math.random()*free.length|0],[x,y]=pos(to),px=x+tw*(.3+Math.random()*.4),py=y+th*(.3+Math.random()*.4);
  if(v.i<0){v.el.style.transitionDuration='0s';v.x=px;v.y=py}
  const dist=Math.hypot(px-(v.x||px),py-(v.y||py)),dur=v.i<0?0:Math.max(1.2,dist/(tw*.35));
  v.el.style.transitionDuration=dur+'s';v.el.style.transform=`translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`;v.el.style.zIndex=zOf(to);v.el.querySelector('svg').style.transform=px<v.x?'scaleX(-1)':'';
  v.el.classList.toggle('walk',dur>0);v.x=px;v.y=py;v.i=to;v.busy=t+dur*1000+800+Math.random()*3500;setTimeout(()=>v.el.classList.remove('walk'),dur*1000)}}
setInterval(vilTick,1000);
/* íconos dibujados para la barra de abajo y los recursos */
const ICO={
 build:'<svg viewBox="0 0 32 32"><path d="M17 13l11 11-3.5 3.5-11-11z" fill="#8a5a2b"/><path d="M17 13l11 11-1.5 1.5-11-11z" fill="#b07a40"/><path d="M5 9l7-6 9 7-4 4-3-2-4 4z" fill="#9aa7b4"/><path d="M5 9l7-6 2 1.6-7 6z" fill="#d7e0e8"/></svg>',
 col:'<svg viewBox="0 0 32 32"><ellipse cx="16" cy="25" rx="10" ry="3.6" fill="#b8860b"/><rect x="6" y="18" width="20" height="7" fill="#d4a017"/><ellipse cx="16" cy="18" rx="10" ry="3.6" fill="#ffd54a"/><ellipse cx="16" cy="13" rx="8" ry="3" fill="#b8860b"/><rect x="8" y="9" width="16" height="4" fill="#e3b21f"/><ellipse cx="16" cy="9" rx="8" ry="3" fill="#ffe27a"/><text x="16" y="11" font-size="5" font-weight="900" text-anchor="middle" fill="#a8740a">$</text></svg>',
 troops:'<svg viewBox="0 0 32 32"><path d="M4 18q0-12 12-12t12 12z" fill="#5b6b3a"/><path d="M4 18q0-12 12-12 3 0 5 1-12 1-13 11z" fill="#7d8f4f"/><rect x="2" y="17" width="28" height="4" rx="2" fill="#3f4b28"/><path d="M11 21v4q5 3 10 0v-4" fill="#f1c27d"/><rect x="13" y="10" width="6" height="3" rx="1" fill="#ffd54a"/></svg>',
 atk:'<svg viewBox="0 0 32 32"><g stroke-linecap="round"><path d="M6 6l17 17" stroke="#dfe6ee" stroke-width="3.4"/><path d="M26 6L9 23" stroke="#c9d2dc" stroke-width="3.4"/><path d="M6 6l17 17M26 6L9 23" stroke="#fff" stroke-width="1"/><path d="M20 26l6-6M6 20l6 6" stroke="#8a5a2b" stroke-width="3.6"/><path d="M19 21l4 4M13 21l-4 4" stroke="#ffc83a" stroke-width="3"/></g></svg>',
 mis:'<svg viewBox="0 0 32 32"><rect x="7" y="5" width="18" height="22" rx="2" fill="#f3e3b0"/><path d="M7 5h18v3H7z" fill="#d9c48a"/><rect x="5" y="3" width="22" height="4" rx="2" fill="#b98a4a"/><rect x="5" y="25" width="22" height="4" rx="2" fill="#b98a4a"/><path d="M11 12h10M11 16h10M11 20h6" stroke="#8a6a3a" stroke-width="1.6" stroke-linecap="round"/><circle cx="22" cy="21" r="3" fill="#e53935"/></svg>',
 menu:'<svg viewBox="0 0 32 32"><path d="M14 2h4l.8 4 3 1.3 3.4-2.3 2.8 2.8-2.3 3.4L27 14l4 .8v4l-4 .8-1.3 3 2.3 3.4-2.8 2.8-3.4-2.3-3 1.3-.8 4h-4l-.8-4-3-1.3-3.4 2.3-2.8-2.8 2.3-3.4L5 19.6l-4-.8v-4l4-.8 1.3-3L4 7.6l2.8-2.8 3.4 2.3 3-1.3z" fill="#9aa7b4"/><circle cx="16" cy="16.8" r="5.4" fill="#4b5866"/><circle cx="16" cy="16.8" r="2.6" fill="#cfd8e0"/></svg>',
 c:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#d49b0c"/><circle cx="16" cy="15" r="12" fill="#ffd54a"/><circle cx="16" cy="15" r="8.5" fill="none" stroke="#e8b21c" stroke-width="2"/><text x="16" y="20" font-size="13" font-weight="900" text-anchor="middle" fill="#b07a0a">$</text></svg>',
 f:'<svg viewBox="0 0 32 32"><path d="M8 24l-4 4 1.5 1.5 4-4" stroke="#f4ead2" stroke-width="3" stroke-linecap="round"/><ellipse cx="18" cy="13" rx="10" ry="8" transform="rotate(-40 18 13)" fill="#b5651d"/><ellipse cx="16" cy="11" rx="6" ry="4" transform="rotate(-40 16 11)" fill="#d98a3c"/><path d="M11 21l-3 3" stroke="#f4ead2" stroke-width="4" stroke-linecap="round"/></svg>',
 o:'<svg viewBox="0 0 32 32"><rect x="7" y="5" width="18" height="23" rx="3" fill="#2c3e50"/><rect x="7" y="5" width="7" height="23" rx="3" fill="#3d566e"/><rect x="6" y="10" width="20" height="2.4" fill="#e74c3c"/><rect x="6" y="20" width="20" height="2.4" fill="#e74c3c"/><ellipse cx="16" cy="5.5" rx="9" ry="2.4" fill="#4a6580"/><path d="M19 15q2 3 0 4.5-2-1.5 0-4.5z" fill="#111"/></svg>',
 s:'<svg viewBox="0 0 32 32"><path d="M3 21l13-7 13 7-13 7z" fill="#7f8c99"/><path d="M3 21v3l13 7v-3z" fill="#55616d"/><path d="M29 21v3l-13 7v-3z" fill="#66737f"/><path d="M6 15l10-5 10 5-10 5z" fill="#b4c0cb"/><path d="M6 15v3l10 5v-3zM26 15v3l-10 5v-3z" fill="#8795a2"/><path d="M8 15l8-4" stroke="#fff" stroke-width="1" opacity=".7"/></svg>',
 e:'<svg viewBox="0 0 32 32"><path d="M19 2L6 18h8l-3 12 15-17h-9z" fill="#ffd400"/><path d="M19 2L6 18h4z" fill="#fff59d"/><path d="M19 2l-5 11h9z" fill="#ffea60" opacity=".7"/></svg>',
 def:'<svg viewBox="0 0 32 32"><path d="M16 2l12 4v8q0 11-12 16Q4 25 4 14V6z" fill="#2e6fd8"/><path d="M16 2v28Q4 25 4 14V6z" fill="#4e8df0"/><path d="M16 7l7 2.5v5q0 7-7 10.5z" fill="#fff" opacity=".25"/></svg>',
 pow:'<svg viewBox="0 0 32 32"><path d="M24 3l5 0 0 5-15 15-5-5z" fill="#dfe6ee"/><path d="M24 3h5L14 18l-2.5-2.5z" fill="#fff"/><path d="M8 17l7 7-2 2-7-7z" fill="#ffc83a"/><path d="M7 24l-3 3 1.5 1.5 3-3z" fill="#8a5a2b"/></svg>',
 pop:'<svg viewBox="0 0 32 32"><circle cx="11" cy="10" r="5" fill="#f1c27d"/><path d="M3 27q0-10 8-10t8 10z" fill="#3d7ad6"/><circle cx="22" cy="11" r="4.5" fill="#e0ac69"/><path d="M15 27q1-9 7-9t7 9z" fill="#d6493d"/></svg>',
 tr:'<svg viewBox="0 0 32 32"><path d="M9 4h14v7q0 8-7 9-7-1-7-9z" fill="#ffc83a"/><path d="M9 4h5v7q0 7 2 9-7-1-7-9z" fill="#ffe27a"/><path d="M9 7H4q0 7 6 8M23 7h5q0 7-6 8" fill="none" stroke="#e0a412" stroke-width="2"/><rect x="14" y="20" width="4" height="5" fill="#d49b0c"/><rect x="9" y="25" width="14" height="4" rx="1.5" fill="#8a5a2b"/></svg>'};
function icoApply(){const tb={'b-build':'build','b-col':'col','b-troops':'troops','b-atk':'atk','b-mis':'mis','b-menu':'menu'};
 for(const id in tb){const s=document.querySelector('#'+id+' .i');if(s)s.innerHTML=ICO[tb[id]]}
 const rs={rc:'c',rf:'f',ro:'o',rs:'s',re:'e',rdef:'def',ratk:'pow',rtr:'tr',rpop:'pop'};
 for(const id in rs){const v=document.getElementById(id),s=v&&v.parentNode.querySelector('.i');if(s)s.innerHTML=ICO[rs[id]]}}
icoApply();

/* luces de noche: arriba de la capa de oscuridad, así brillan de verdad */
let LTK='';
function lightsTick(night){const L=$('#mlights');if(!L)return;const k=night?S.g.map((b,i)=>b?i+':'+b.t:'').join(',')+tw:'';if(k===LTK)return;LTK=k;
 if(!night){L.innerHTML='';return}let h='';
 S.g.forEach((b,i)=>{if(!b)return;const d=B[b.t];if(!d||d.deco)return;const[x,y]=pos(i),cx=x+tw/2,cy=y+th/2;
  h+=`<div class="lt" style="left:${cx}px;top:${cy+th*.42}px;width:${tw*.95}px;height:${tw*.3}px;animation-delay:-${(i%7)*.4}s"></div>`});
 L.innerHTML=h}
setInterval(()=>lightsTick(document.documentElement.classList.contains('night')),3000);

/* la capa de luces está afuera del mapa (arriba de la oscuridad) y copia su posición y zoom */
let LPK='';(function lsync(){const L=$('#mlights'),m=$('#map'),st=$('#stage');if(L&&m&&st&&L.firstChild){const r=m.getBoundingClientRect(),s=st.getBoundingClientRect(),k=(r.left-s.left).toFixed(1)+','+(r.top-s.top).toFixed(1)+','+(r.width/MW).toFixed(4);if(k!==LPK){LPK=k;L.style.transform=`translate(${(r.left-s.left).toFixed(1)}px,${(r.top-s.top).toFixed(1)}px) scale(${(r.width/MW).toFixed(4)})`}}requestAnimationFrame(lsync)})();

/* ---------- mar con vida: barquitos, boyas y delfines ---------- */
const BOATS0=`<svg viewBox="0 0 70 50"><ellipse cx="35" cy="44" rx="30" ry="4" fill="#fff" opacity=".55"/><path d="M8,32h54l-8,12H16z" fill="#c0392b"/><path d="M8,32h54l-2,3H10z" fill="#e74c3c"/><path d="M14,38h42" stroke="#fff" stroke-width="1.6" opacity=".8"/><rect x="26" y="20" width="16" height="12" fill="#ecf0f1"/><rect x="28" y="23" width="5" height="4" fill="#5dade2"/><rect x="35" y="23" width="5" height="4" fill="#5dade2"/><path d="M46,32V8" stroke="#6b4520" stroke-width="2"/><path d="M46,10L62,30" stroke="#333" stroke-width=".8"/><rect x="24" y="17" width="20" height="3" fill="#7f8c8d"/></svg>`;
const BUOY0=`<svg viewBox="0 0 12 20"><ellipse cx="6" cy="18.5" rx="6" ry="1.6" fill="#fff" opacity=".6"/><path d="M2,18L4,6h4l2,12z" fill="#e74c3c"/><path d="M3,12h6v3H3z" fill="#fff"/><circle cx="6" cy="4.5" r="1.8" fill="#ffd54a"/></svg>`;
const DOLPH=`<svg viewBox="0 0 60 30"><path d="M4,22Q20,2 44,10q8,3 12,8q-6,-2 -10,0q-2,6 -8,7l2,-6Q24,16 10,24z" fill="#5d7fa3"/><path d="M14,18Q26,10 40,13" stroke="#cfe0ef" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M28,10l4,-8l4,9z" fill="#4a6a8c"/><circle cx="46" cy="13" r="1.2" fill="#111"/></svg>`;
const BOATS=typeof ENV!=='undefined'&&ENV.barco?`<img src="${ENV.barco}" style="width:100%;height:100%">`:BOATS0,BUOY=typeof ENV!=='undefined'&&ENV.boya?`<img src="${ENV.boya}" style="width:100%;height:100%">`:BUOY0;
function seaInit(){const m=$('#map');if(!m||$('#sealife'))return;const d=document.createElement('div');d.id='sealife';m.insertBefore(d,m.firstChild.nextSibling);d.style.setProperty('--mw',MW+'px');
 d.innerHTML=`<div class="boat2" style="top:${MH-tw*1.1}px;left:0;animation-delay:-20s">${BOATS}</div><div class="boat2" style="top:${tw*.15}px;left:0;animation-duration:95s;animation-delay:-60s;transform:scaleX(-1)">${BOATS}</div>`+
  [[.08,.8],[.9,.78],[.18,.93],[.82,.94]].map(([x,y],k)=>`<div class="buoy" style="left:${MW*x}px;top:${MH*y}px;animation-delay:-${k*.5}s">${BUOY}</div>`).join('')}
function dolphin(){if(S.eco||document.hidden)return;const d=$('#sealife');if(!d)return;const sx=Math.random()<.5?.04+Math.random()*.16:.8+Math.random()*.16,x=MW*sx,y=MH*(.76+Math.random()*.18);
 const el=document.createElement('div');el.className='dolph';el.style.cssText=`left:${x}px;top:${y}px`;el.innerHTML=DOLPH;if(Math.random()<.5)el.style.transform='scaleX(-1)';d.appendChild(el);
 const sp=(dx,t)=>setTimeout(()=>{const s=document.createElement('div');s.className='splash';s.style.cssText=`left:${x+dx}px;top:${y+tw*.12}px`;d.appendChild(s);setTimeout(()=>s.remove(),950)},t);sp(-tw*.2,150);sp(tw*.25,1250);setTimeout(()=>el.remove(),1600)}
setInterval(()=>{seaInit();if(Math.random()<.6)dolphin()},6500);setTimeout(seaInit,1500);
/* ---------- temporadas (hemisferio sur) y fiestas ---------- */
function season(){const d=new Date(),m=d.getMonth()+1,dd=d.getDate();
 const hol=(m===10&&dd>=24)||(m===11&&dd<=2)?'halloween':(m===12&&dd>=8)||(m===1&&dd<=6)?'navidad':'';
 const s=m>=3&&m<=5?'otono':m>=6&&m<=8?'invierno':m>=9&&m<=11?'primavera':'verano';return{s,hol}}
const PUMP=`<svg viewBox="0 0 30 26"><ellipse cx="15" cy="24" rx="12" ry="2.4" fill="#0004"/><ellipse cx="9" cy="15" rx="7" ry="8" fill="#e67e22"/><ellipse cx="21" cy="15" rx="7" ry="8" fill="#e67e22"/><ellipse cx="15" cy="15" rx="7" ry="9" fill="#f39c12"/><path d="M15,6q1,-4 4,-5" stroke="#5d4037" stroke-width="2.4" fill="none"/><path d="M9,13l3,2-3,1zM21,13l-3,2 3,1zM10,19q5,4 10,0l-2,1-1,-1-2,1-2,-1-1,1z" fill="#3b1f00"/></svg>`;
const XTREE=`<svg viewBox="0 0 40 60"><ellipse cx="20" cy="57" rx="14" ry="3" fill="#0004"/><rect x="17" y="48" width="6" height="8" fill="#6b4520"/><path d="M20,4L34,26H27L37,40H29L39,52H1L11,40H3L13,26H6z" fill="#1e7b3c"/><path d="M20,4L34,26H27L37,40H29L39,52H20z" fill="#165f2e"/><path d="M8,30q12,6 24,0M6,44q14,6 28,0" stroke="#ffd54a" stroke-width="1.4" fill="none"/><circle cx="12" cy="36" r="2" fill="#e74c3c"/><circle cx="27" cy="33" r="2" fill="#3498db"/><circle cx="16" cy="47" r="2" fill="#f1c40f"/><circle cx="30" cy="47" r="2" fill="#e74c3c"/><path d="M20,0l2,4h4l-3,3 1,4-4,-2-4,2 1,-4-3,-3h4z" fill="#ffd54a"/></svg>`;
const GIFT=c=>`<svg viewBox="0 0 20 20"><ellipse cx="10" cy="18.5" rx="8" ry="1.6" fill="#0004"/><rect x="3" y="7" width="14" height="11" fill="${c}"/><rect x="2" y="5" width="16" height="4" fill="${c}"/><rect x="9" y="5" width="2" height="13" fill="#ffd54a"/><path d="M10,5q-5,-5 -6,-1 2,2 6,1q5,-5 6,-1-2,2-6,1" fill="#ffd54a"/></svg>`;
const FLW0=`<svg viewBox="0 0 20 10"><circle cx="4" cy="6" r="2" fill="#ff8fb8"/><circle cx="9" cy="4" r="2.2" fill="#fff"/><circle cx="14" cy="6" r="2" fill="#b9a4ff"/><circle cx="17" cy="3" r="1.6" fill="#ffe066"/><circle cx="9" cy="4" r=".8" fill="#ffd400"/></svg>`;
const FLW=typeof ENV!=='undefined'&&ENV.flores_1?`<img src="${ENV.flores_1}" style="width:100%;height:100%;object-fit:contain">`:FLW0;
let SSK='';
function seasonApply(){const{s,hol}=season(),k=s+hol+tw+N;if(k===SSK)return;SSK=k;const html=document.documentElement;['otono','invierno','primavera','verano'].forEach(x=>html.classList.toggle('ssn-'+x,x===s));
 let fx=$('#seasonfx');if(!fx){fx=document.createElement('div');fx.id='seasonfx';$('#stage').appendChild(fx)}
 const P=s==='otono'?['#e67e22','#c0392b','#f1c40f','#a0522d']:s==='invierno'?['#fff']:s==='primavera'?['#ffb6d0','#fff','#ffd6e6']:[];let h='';
 for(let i=0;i<(P.length?14:0);i++){const c=P[i%P.length],sz=s==='invierno'?4+Math.random()*4:7+Math.random()*6;h+=`<i class="sp" style="left:${Math.random()*100}%;width:${sz}px;height:${s==='invierno'?sz:sz*.6}px;background:${c};border-radius:${s==='invierno'?'50%':'50% 0'};opacity:${s==='invierno'?.85:.9};--dx:${(Math.random()*30-10).toFixed(0)}vw;--rt:${(Math.random()*720-360)|0}deg;animation-duration:${(9+Math.random()*9).toFixed(1)}s;animation-delay:-${(Math.random()*18).toFixed(1)}s"></i>`}
 fx.innerHTML=h;
 const gx=$('#gx');if(!gx)return;gx.querySelectorAll('.decor').forEach(e=>e.remove());let dh='';const k100=tw/100;
 const rim=[];for(let c=0;c<N;c++){const[x,y]=pos(c);rim.push([x-OX+tw*.5,y-th*.05])}for(let r=1;r<N;r++){const[x,y]=pos(r*N);rim.push([x-OX+tw*.5,y-th*.05])}
 const pick=n=>{const o=[];for(let i=0;i<n;i++)o.push(rim[Math.floor((i+.5)/n*rim.length)]);return o};
 if(hol==='halloween')pick(7).forEach(([x,y])=>dh+=`<div class="decor" style="left:${x}px;top:${y}px;width:${tw*.32}px;height:${tw*.28}px">${PUMP}</div>`);
 if(hol==='navidad'){const p=pick(5);p.forEach(([x,y],i)=>dh+=i===2?`<div class="decor" style="left:${x}px;top:${y}px;width:${tw*.45}px;height:${tw*.68}px">${XTREE}</div>`:`<div class="decor" style="left:${x}px;top:${y}px;width:${tw*.22}px;height:${tw*.22}px">${GIFT(['#e74c3c','#3498db','#27ae60','#8e44ad'][i%4])}</div>`)}
 if(s==='primavera')pick(10).forEach(([x,y])=>dh+=`<div class="decor" style="left:${x}px;top:${y+th*.1}px;width:${tw*.3}px;height:${tw*.15}px">${FLW}</div>`);
 gx.insertAdjacentHTML('beforeend',dh)}
setInterval(seasonApply,4000);setTimeout(seasonApply,1200);
/* ---------- retratos grandes de las tropas ---------- */
function portrait(u){const d=U[u];if(!d)return;const l=S.ulv[u]||1;
 const pim=typeof ENV!=='undefined'&&ENV['u_'+u];const h=`<div class="portrait">${pim?`<img class="pimg" src="${pim}">`:`<svg viewBox="${UVC[d.cls]}">${spr(u,l,3)}</svg>`}<div class="pn">${d.n}<small>${CI[d.cls]} ${CN[d.cls]} · Nivel ${l}</small></div></div>`+
  `<div class="pst"><div>⚔️ ${Math.round(d.dmg*ulm(u)*(1+.25*S.tech.atk))}<small>Daño</small></div><div>❤️ ${Math.round(d.hp*ulm(u))}<small>Vida</small></div><div>🎯 ${d.rng}<small>Alcance</small></div><div>×${S.troops[u]||0}<small>Tenés</small></div></div>`+
  `<p class="small">${vsTxt(d).replace(/^ · /,'')}</p>`;
 modal(h,[['Cerrar',()=>{},'gold']])}
document.addEventListener('click',e=>{const t=e.target.closest('#sheet .trow .te');if(!t)return;const b=t.closest('.trow').querySelector('[data-v]');if(b){e.stopPropagation();portrait(b.dataset.v)}},true);

/* entorno pintado: mar con textura, íconos, barquitos y flores */
(function envApply(){if(typeof ENV==='undefined'||!ENV.tex_mar)return;const st=$('#stage');
 if(st){st.style.backgroundImage=`radial-gradient(ellipse at 8% 2%,#ffd98a55,transparent 38%),radial-gradient(ellipse at 50% 46%,transparent 30%,#04253c88 100%),url(${ENV.tex_mar})`;st.style.backgroundSize='auto,auto,420px 420px'}
 const bs=$('#btscene');if(bs){bs.style.backgroundImage=`radial-gradient(ellipse at 50% 46%,transparent 30%,#04253c88 100%),url(${ENV.tex_mar})`;bs.style.backgroundSize='auto,420px 420px'}
 const M={build:'ico_construir',col:'ico_cobrar',troops:'ico_tropas',atk:'ico_atacar',mis:'ico_misiones',menu:'ico_menu',c:'ico_oro',f:'ico_comida',o:'ico_petroleo',s:'ico_acero',e:'ico_energia',def:'ico_defensa',pow:'ico_ataque',tr:'ico_trofeo'};
 for(const k in M)if(ENV[M[k]])ICO[k]=`<img src="${ENV[M[k]]}" alt="">`;icoApply();
})();

document.addEventListener('click',e=>{if(e.target.closest('#title')){try{openProf()}catch(_){}}});

/* ---------- retratos pintados: caras de enemigos, jefes, avatares, cofres y ligas en vez de emojis ---------- */
setTimeout(function emiInit(){if(typeof ENV==='undefined'||!ENV.e_1)return;
 for(const k of ['cmd1','cmd2','cmd3'])if(ENV['h_'+k])ENV['u_'+k]=ENV['h_'+k];
 const FACES=['🤠','🧔','👩‍✈️','🤴','👨‍🍳','🧑‍🚀','👸','🧙','💂','🧛','🧑‍✈️','🧑‍🔬','🦸','🤖'],FM={};FACES.forEach((f,i)=>FM[f]='e_'+(i+1));
 try{RBOSS.forEach((b,i)=>{if(ENV['j_'+(i+1)])FM[b.f]='j_'+(i+1)})}catch(e){}
 const AM={};try{AVS.slice(0,8).forEach((x,i)=>AM[x[0]]='av_'+(i+1))}catch(e){}
 window.__AM=AM;try{$('#avbig').dataset.v='';hud()}catch(e){}
 try{const ref=genEnemies();(S.enemies||[]).forEach(e=>{const r=ref.find(x=>x.n===e.n);if(r)e.f=r.f})}catch(e){}
 const GM={'🥉':'liga_bronce','🥈':'liga_plata','🥇':'liga_oro','💠':'liga_cristal','🎖️ Maestro':'liga_maestro','👑 Leyenda':'liga_leyenda','📦':'cofre_comun','🎁':'cofre_raro','💎':'cofre_epico'};
 const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),keys=o=>Object.keys(o).sort((a,b)=>b.length-a.length).map(esc).join('|');
 const RF=new RegExp('('+keys(FM)+')','u'),RA=new RegExp('('+keys(AM)+')','u'),RG=new RegExp('('+keys(GM)+')','u');
 const FM2=Object.assign({},FM);delete FM2['🤖'];['🎖️','⚡','👑','💀'].forEach(k=>delete FM2[k]);const RF2=new RegExp('('+keys(FM2)+')','u');
 const FACE_SEL='.ef,.itag,.efc',FACE2_SEL='#mbox,#btname,.mtitle',AV_SEL='.pfa,.pav',GLOBAL_SEL='#shbody,#mbox,#chests,#evchip';
 const swap=(tn,re,map,cls)=>{const s=tn.nodeValue;if(!re.test(s))return;const parts=s.split(new RegExp(re.source,'gu'));if(!parts.some(p=>map[p]&&ENV[map[p]]))return;const fr=document.createDocumentFragment();
  for(const p of parts){if(!p)continue;const k=map[p];if(k&&ENV[k]){const im=document.createElement('img');im.className='emi '+cls;im.src=ENV[k];im.alt=p;fr.appendChild(im);if(p.length>2&&cls==='lg')fr.appendChild(document.createTextNode(p.replace(/^\S+\s/,' ')))}else fr.appendChild(document.createTextNode(p))}
  tn.parentNode.replaceChild(fr,tn)};
 const walk=root=>{const it=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const L=[];while(it.nextNode())L.push(it.currentNode);
  for(const tn of L){const p=tn.parentNode;if(!p||p.closest('button.res,#top,script,style,.toast'))continue;
   if(p.closest(AV_SEL))swap(tn,RA,AM,'av');else if(p.closest(FACE_SEL))swap(tn,RF,FM,'ef');else if(p.closest(FACE2_SEL)&&RF2.test(tn.nodeValue))swap(tn,RF2,FM2,'ef2');else if(p.closest(GLOBAL_SEL))swap(tn,RG,GM,'lg')}};
 const mo=new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType===1)walk(n);else if(n.nodeType===3&&n.parentNode)walk(n.parentNode)}});
 mo.observe(document.body,{childList:true,subtree:true});walk(document.body)},0);

function AVIMG(av){const m=window.__AM;return m&&m[av]&&typeof ENV!=='undefined'?ENV[m[av]]:''}
