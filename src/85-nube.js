/* ---------- nube con Supabase: cuentas, guardado en la nube, buscador de jugadores y ataques entre jugadores ----------
   Solo se activa cuando la página carga supabase-js y config.js (versión de GitHub Pages).
   En el navegador se usan únicamente la Project URL y la Publishable key: lo privado lo cuidan las políticas RLS. */
const NCFG=window.WOW_CFG||{};
let SB=null,CU=null,PVT=null;const NBX={dirty:0,busy:0,last:0,pubAt:0,pubPrev:'',err:'',top:[],q:'',seenAt:0};
try{if(window.supabase&&NCFG.url&&NCFG.key&&!/TU_PROYECTO|TU_CLAVE/.test(NCFG.url+NCFG.key))SB=window.supabase.createClient(NCFG.url,NCFG.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})}catch(e){SB=null}
const nbOwner=()=>{try{return localStorage.getItem('wow-owner')||''}catch(e){return ''}};
const nbSetOwner=id=>{try{id?localStorage.setItem('wow-owner',id):localStorage.removeItem('wow-owner')}catch(e){}};
const avHTML=(av,cls)=>{const k=typeof AVIMG==='function'&&AVIMG(av);return k?`<img class="${cls||'navi'}" src="${k}" alt="">`:`<span class="${cls||'navi'} nave">${esc(av||'⭐')}</span>`};
const lgOf=t=>LG[lgIdx(t||0)][0];
/* el guardado del juego marca la partida para subirla */
{const _save=save;save=function(){_save();if(CU)NBX.dirty=1}}
async function nbUpload(force){
 if(!SB||!CU||NBX.busy||(!NBX.dirty&&!force))return;NBX.busy=1;
 try{const data=localStorage.getItem(SAVE);if(!data)return;
  const {error}=await SB.from('saves').upsert({user_id:CU.id,data,updated_at:new Date().toISOString()});
  if(error)throw error;NBX.dirty=0;NBX.last=Date.now();NBX.err='';nbSetOwner(CU.id)}
 catch(e){NBX.err='No se pudo guardar en la nube';}finally{NBX.busy=0}
}
/* perfil público: alias, avatar, nivel, poder, la isla para mostrar y el resumen de defensas para los ataques */
async function nbPublish(force){
 if(!SB||!CU||(!force&&Date.now()-NBX.pubAt<60000))return;
 const isl={n:N,b:S.g.map((b,i)=>b&&done(b)?[i,b.t,b.l]:null).filter(Boolean).slice(0,400)},alias=(S.prof.n||'').trim();
 const row={avatar:S.prof.av||'⭐',motto:(S.prof.mo||'').slice(0,40),level:S.lvl,power:Math.min(1e8,Math.round(defense()+armyPow(S.troops))),island:isl,spec:mySpec(),updated_at:new Date().toISOString()};
 if(alias.length>=3)row.alias=alias.slice(0,16);
 const j=JSON.stringify(row).replace(/"updated_at":"[^"]*"/,'');if(!force&&j===NBX.pubPrev)return;NBX.pubAt=Date.now();
 const {error}=await SB.from('profiles').update(row).eq('id',CU.id);
 if(error){if(String(error.code)==='23505'){delete row.alias;await SB.from('profiles').update(row).eq('id',CU.id);toast('👤 Ese alias ya lo usa otro jugador: elegí otro en tu perfil')}}else NBX.pubPrev=j;
}
setInterval(()=>{nbUpload();nbPublish();if(CU&&Date.now()-NBX.seenAt>120000){NBX.seenAt=Date.now();nbDefenses()}},15000);
document.addEventListener('visibilitychange',()=>{if(document.hidden){nbUpload(1)}});
/* al entrar: traer la partida de la nube, o subir la de este dispositivo si la cuenta todavía no tiene */
async function nbLogin(){
 const {data:row,error}=await SB.from('saves').select('data,updated_at').eq('user_id',CU.id).maybeSingle();
 if(error){toast('☁️ No se pudo leer tu partida en la nube');return}
 const local=localStorage.getItem(SAVE),own=nbOwner();
 if(row){let cs=null;try{cs=JSON.parse(row.data)}catch(e){}
  if(own===CU.id&&local&&cs&&(S.ts||0)>(cs.ts||0)){NBX.dirty=1;await nbUpload(1);toast('☁️ Subí los últimos cambios de este dispositivo');}
  else if(cs&&cs.v===1&&(!local||(S.ts||0)!==(cs.ts||0))){localStorage.setItem(SAVE,row.data);nbSetOwner(CU.id);toast('☁️ Cargando tu partida de la nube…');setTimeout(()=>location.reload(),700);return}
  else nbSetOwner(CU.id);
 }else{
  const prog=S.lvl>1||S.g.filter(Boolean).length>4;
  if(local&&prog&&(!own||own===CU.id)){
   modal(`<div class="mtitle">☁️ Tu cuenta es nueva</div><p>¿Querés subir la partida de este dispositivo (nivel ${S.lvl}) a tu cuenta?</p><p class="small">Después la vas a poder seguir desde cualquier celular o compu.</p>`,
    [['📤 Importar esta partida',()=>{nbSetOwner(CU.id);NBX.dirty=1;nbUpload(1).then(()=>nbPublish(1));toast('☁️ Partida importada a tu cuenta')},'gold'],['Empezar de cero',()=>nbFresh(),'']]);
  }else if(own&&own!==CU.id){nbFresh();return}
  else{nbSetOwner(CU.id);NBX.dirty=1;await nbUpload(1)}
 }
 nbPublish(1);nbDefenses();
}
function nbFresh(){try{localStorage.removeItem(SAVE)}catch(e){}nbSetOwner(CU?CU.id:'');location.reload()}
if(SB){
 SB.auth.onAuthStateChange((ev,sess)=>{
  if(ev==='PASSWORD_RECOVERY'){setTimeout(nbNewPass,300);return}
  const u=sess&&sess.user;if(u&&(!CU||CU.id!==u.id)){CU=u;setTimeout(()=>nbLogin().catch(()=>{}),0);if(sheet.kind==='cuenta')openCuenta()}
  else if(!u&&CU){CU=null;if(sheet.kind==='cuenta')openCuenta()}
 });
}
function nbNewPass(){modal(`<div class="mtitle">🔑 Nueva contraseña</div><input id="nbnp" class="inp" type="password" placeholder="Nueva contraseña (mínimo 8)" autocomplete="new-password">`,[['Guardar',async()=>{const p=($('#nbnp')||{}).value||'';if(p.length<8){toast('Tiene que tener al menos 8 caracteres');return}const {error}=await SB.auth.updateUser({password:p});toast(error?'No se pudo cambiar':'🔑 Contraseña cambiada')},'gold']])}
/* ---------- pantalla de cuenta ---------- */
function openCuenta(msg){
 let h='';
 if(!SB){h=`<p>☁️ Las cuentas funcionan en la versión publicada del juego (GitHub Pages) con Supabase configurado.</p><p class="small">Acá tu partida se guarda en este navegador.</p>`;openSheet('cuenta','☁️ Cuenta',h);return}
 if(!CU){
  h=`<p class="small">Creá una cuenta con tu correo para guardar tu partida en la nube, seguirla en otro dispositivo y atacar a otros jugadores.</p>
  <input id="nbmail" class="inp" type="email" placeholder="Tu correo" autocomplete="email"><input id="nbpass" class="inp" type="password" placeholder="Contraseña (mínimo 8)" autocomplete="current-password">
  <div class="row2"><button class="btn gold" data-nb="in">Entrar</button><button class="btn green" data-nb="up">Crear cuenta</button></div>
  <button class="btn" data-nb="forgot">Olvidé mi contraseña</button>${msg?`<p class="small" style="color:#b8361f">${esc(msg)}</p>`:''}
  <p class="small">Tu correo es privado: nadie más lo ve. Los demás solo ven tu alias, avatar, nivel, liga, trofeos y tu isla.</p>`;
 }else{
  const t=NBX.last?new Date(NBX.last).toLocaleTimeString():'todavía no';
  h=`<div class="istat"><b>Conectado</b><div class="small">${esc(CU.email||'')} <i>(solo vos lo ves)</i></div><div class="small">Último guardado en la nube: ${t}${NBX.err?' · ⚠️ '+NBX.err:''}</div></div>
  <button class="btn gold" data-nb="sync">☁️ Guardar ahora</button><button class="btn" data-nb="jug">🔎 Buscar jugadores</button><button class="btn" data-nb="me">👤 Ver mi perfil público</button><button class="btn" data-nb="pw">🔑 Cambiar contraseña</button><button class="btn red" data-nb="out">Cerrar sesión</button>
  <p class="small">Tu alias es el nombre de tu perfil (Menú → Perfil). Tiene que tener entre 3 y 16 letras y no puede repetirse.</p>`;
 }
 openSheet('cuenta','☁️ Cuenta',h);
}
async function nbAuth(kind){
 const em=(($('#nbmail')||{}).value||'').trim(),pw=($('#nbpass')||{}).value||'';
 if(kind==='forgot'){if(!/^\S+@\S+\.\S+$/.test(em)){openCuenta('Escribí tu correo arriba');return}const {error}=await SB.auth.resetPasswordForEmail(em,{redirectTo:location.origin+location.pathname});openCuenta(error?'No se pudo enviar el correo':'Te mandamos un correo para cambiar la contraseña');return}
 if(!/^\S+@\S+\.\S+$/.test(em)||pw.length<8){openCuenta('Revisá el correo y que la contraseña tenga al menos 8 caracteres');return}
 if(kind==='up'){const {data,error}=await SB.auth.signUp({email:em,password:pw,options:{emailRedirectTo:location.origin+location.pathname}});
  if(error)openCuenta(error.message.includes('registered')?'Ese correo ya tiene cuenta: tocá Entrar':'No se pudo crear la cuenta');else if(!data.session)openCuenta('📧 Te mandamos un correo: confirmalo y después entrá.');}
 else{const {error}=await SB.auth.signInWithPassword({email:em,password:pw});if(error)openCuenta(/confirm/i.test(error.message)?'Primero confirmá tu correo (revisá tu bandeja)':'Correo o contraseña incorrectos');}
}
/* ---------- buscador de jugadores y perfiles públicos ---------- */
const PCOLS='id,alias,avatar,motto,level,power,trophies,island,spec,updated_at';
async function openJug(q){
 if(!SB){openCuenta();return}
 NBX.q=q==null?NBX.q:q;let rows=[];
 try{let qq=SB.from('profiles').select('id,alias,avatar,level,trophies,power').not('alias','is',null).order('trophies',{ascending:false}).limit(30);
  if(NBX.q)qq=qq.ilike('alias',NBX.q.replace(/[%_\\]/g,'')+'%');const {data}=await qq;rows=data||[]}catch(e){}
 let h=`<div class="row2"><input id="nbq" class="inp" placeholder="Buscar por alias" value="${esc(NBX.q)}"><button class="btn gold" data-nb="q">🔎 Buscar</button></div><div class="cat">${NBX.q?'Resultados':'🏆 Ranking de trofeos'}</div>`;
 if(!rows.length)h+='<p class="small">No encontramos jugadores con ese alias.</p>';
 rows.forEach((r,i)=>{h+=`<div class="erow" data-nb="pf" data-v="${r.id}"><div class="efc">${avHTML(r.avatar,'navi')}</div><div class="einfo"><b>${esc(r.alias)}</b> <span class="tag">Nv ${r.level|0}</span><div class="small">${lgOf(r.trophies)} · 🏆 ${r.trophies|0} · Poder ${fmt(r.power||0)}</div></div>${CU&&r.id===CU.id?'<span class="tag">Vos</span>':''}</div>`});
 openSheet('jug','🔎 Jugadores',h);
}
function islandSvg(isl){
 if(!isl||!isl.n||!Array.isArray(isl.b))return '';const n=Math.max(6,Math.min(24,isl.n|0)),W=n*100,H=n*50+90,used={};let defs='',body='';
 const P=i=>{const r=i/n|0,c=i%n;return[(c-r)*50+(n-1)*50,(c+r)*25+80]};
 body+=`<polygon points="${W/2},80 ${W},${80+n*25} ${W/2},${80+n*50} 0,${80+n*25}" fill="#6cbd43" stroke="#3f7f2a" stroke-width="4"/>`;
 const list=isl.b.filter(x=>Array.isArray(x)&&B[x[1]]&&x[0]>=0&&x[0]<n*n).sort((a,b)=>((a[0]/n|0)+a[0]%n)-((b[0]/n|0)+b[0]%n));
 for(const[i,t,l]of list){const lv=Math.max(1,Math.min(7,l|0)),[x,y]=P(i),key=t+'_'+(PIMG[t]?pimgLv(t,lv).length:lv);
  if(PIMG[t]){if(!used[key]){used[key]=1;defs+=`<g id="ib_${key}">${pimgTag(t,lv)}</g>`}body+=`<use href="#ib_${key}" x="${x}" y="${y-70}"/>`}
  else body+=`<g transform="translate(${x},${y-70})">${ART[t]?ART[t](Math.min(3,lv)):''}</g>`}
 return `<svg class="pisl" viewBox="0 0 ${W} ${H}"><defs>${defs}</defs>${body}</svg>`;
}
async function openPerfil(id){
 if(!SB)return;let p=null;try{const {data}=await SB.from('profiles').select(PCOLS).eq('id',id).maybeSingle();p=data}catch(e){}
 if(!p){toast('No encontramos ese perfil');return}
 const me=CU&&p.id===CU.id;let h=`<div class="pfh"><div class="pfa">${avHTML(p.avatar,'pfimg')}</div><div><b>${esc(p.alias||'Sin alias')}</b><div class="small">${rankOf(p.level|0)} · Nivel ${p.level|0}</div>${p.motto?`<div class="small">“${esc(p.motto)}”</div>`:''}</div></div>
 <div class="pst"><div>${lgOf(p.trophies).split(' ')[0]}<small>${lgOf(p.trophies).split(' ').slice(1).join(' ')}</small></div><div>🏆 ${p.trophies|0}<small>Trofeos</small></div><div>⚡ ${fmt(p.power||0)}<small>Poder</small></div><div>🏠 ${(p.island&&p.island.b||[]).length}<small>Edificios</small></div></div>
 <div class="cat">🏝️ Su isla</div><div class="pislw">${islandSvg(p.island)||'<p class="small">Todavía no publicó su isla.</p>'}</div>`;
 if(!me&&p.spec)h+=CU?`<button class="btn red" data-nb="atk" data-v="${p.id}">⚔️ Atacar</button><p class="small">Atacás una copia guardada de su isla, aunque esté desconectado. El servidor resuelve el combate y reparte trofeos y botín.</p>`:`<button class="btn gold" data-nb="cuenta">Iniciá sesión para atacar</button>`;
 NBX.prof=p;openSheet('perfil','👤 '+esc(p.alias||'Jugador'),h);
}
/* ---------- ataque entre jugadores ---------- */
function pvTarget(p){const sp=sanSpec(p.spec);if(!sp)return null;return{n:p.alias||'Jugador',f:p.avatar||'🌐',lvl:Math.max(1,p.level|0),spec:sp,pvp:p.id}}
function nbAttack(id){const p=NBX.prof;if(!p||p.id!==id)return;const e=pvTarget(p);if(!e){toast('Su isla no se puede atacar todavía');return}PVT={e};openSelect('pv')}
async function pvAttack(army,e,live,rc){
 toast('⚔️ Conectando con el servidor…');
 let r=null;try{await nbUpload(1);const {data,error}=await SB.functions.invoke('pvp',{body:{action:'attack',defender:e.pvp,army}});
  if(error){let m='';try{m=(await error.context.json()).error}catch(_){}throw new Error(m||'No se pudo atacar')}r=data}
 catch(err){if(rc)gain({f:rc});hud();toast('⚠️ '+(err.message||'No se pudo atacar'));return}
 const b=pvBattle(r.army,r.spec,r.mul,r.seed);b.e={n:e.n,f:e.f,lvl:e.lvl};b.army=r.army;b.live=live;b.pvRes=r;
 runBattle(b,`Vos ⚔️ ${esc(e.n)} · 🌐 Jugador`);
}
async function pvEnd(b){
 if(!b.pvRes||!SB){$('#bt').classList.remove('on');BT=null;modalOpen=false;return}
 const r=b.pvRes,win=!!r.win;let c=null;
 try{const {data}=await SB.rpc('claim_attack',{p_id:r.id});c=data}catch(e){}
 const lostL=[];if(c){for(const k in c.army){const l=Math.max(0,(c.army[k]|0)-((c.surv||{})[k]|0));if(l&&S.troops[k]!=null){S.troops[k]=Math.max(0,S.troops[k]-l);lostL.push(ue(k)+'×'+l)}}if(c.win)gain(c.loot||{});addXP(win?15+2*(b.e.lvl|0):4);save();hud();nbUpload(1)}
 const note=(b.over===1)!==win?'<p class="small">Se muestra el resultado oficial del servidor.</p>':'';
 const html=`${win?'<div class="win vwin">¡VICTORIA!</div>':'<div class="lose">DERROTA</div>'}<p>🏆 ${r.d_att>0?'+':''}${r.d_att} trofeos · ahora tenés ${r.trophies}</p>${win&&c?`<p>Botín: <b>${costPlain(c.loot||{})}</b></p>`:''}<p class="small">Bajas: ${lostL.join(' ')||'ninguna'}</p>${!c?'<p class="small">Este resultado ya se había cobrado.</p>':''}${note}`;
 const btns=[['Volver a la base',()=>{$('#bt').classList.remove('on');BT=null;hud()},'gold']];
 if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns);
}
/* avisos de defensas: quién te atacó mientras no estabas */
async function nbDefenses(){
 if(!SB||!CU)return;try{
  const {data}=await SB.from('attacks').select('id,attacker,win,d_def,created_at').eq('defender',CU.id).eq('def_seen',false).order('created_at',{ascending:false}).limit(10);
  if(!data||!data.length)return;const ids=[...new Set(data.map(a=>a.attacker))];const {data:ps}=await SB.from('profiles').select('id,alias,avatar').in('id',ids);const m={};(ps||[]).forEach(p=>m[p.id]=p);
  let h='<div class="mtitle">🛡️ Mientras no estabas</div>';data.forEach(a=>{const p=m[a.attacker]||{};h+=`<div class="erow"><div class="efc">${avHTML(p.avatar,'navi')}</div><div class="einfo"><b>${esc(p.alias||'Jugador')}</b><div class="small">${a.win?'Te ganó':'Lo frenaste'} · 🏆 ${a.d_def>0?'+':''}${a.d_def}</div></div></div>`});
  modal(h,[['Entendido',()=>{SB.rpc('mark_seen',{p_ids:data.map(a=>a.id)})},'gold']]);
 }catch(e){}
}
document.addEventListener('click',e=>{const t=e.target.closest('[data-nb]');if(!t)return;const k=t.dataset.nb,v=t.dataset.v;
 if(k==='in'||k==='up'||k==='forgot')nbAuth(k);else if(k==='out'){nbUpload(1).finally(()=>SB.auth.signOut())}else if(k==='sync'){NBX.dirty=1;nbUpload(1).then(()=>{nbPublish(1);openCuenta()})}
 else if(k==='jug')openJug();else if(k==='q')openJug((($('#nbq')||{}).value||'').trim().slice(0,16));else if(k==='pf')openPerfil(v);else if(k==='me'&&CU){nbPublish(1).then(()=>openPerfil(CU.id))}
 else if(k==='atk')nbAttack(v);else if(k==='cuenta')openCuenta();else if(k==='pw')nbNewPass();});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&e.target.id==='nbq')openJug(e.target.value.trim().slice(0,16))});
