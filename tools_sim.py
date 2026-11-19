# Genera el simulador de batalla para el servidor (Supabase Edge Function) a partir de src/10-datos.js.
# Es exactamente el mismo código que usa el juego, con lo del navegador reemplazado por stubs.
src=open('src/10-datos.js').read()
assert src.startswith('(()=>{\n');src=src[len('(()=>{\n'):]
pre='''// GENERADO por tools_sim.py desde src/10-datos.js: no editar a mano.
const window={matchMedia:()=>({matches:false})},document={documentElement:{classList:{toggle(){}}}},localStorage={getItem(){return null},setItem(){}};
const matchMedia=()=>({matches:false}),innerWidth=1200;let S={g:[],isl:[],troops:{},queue:[],lvl:1};const abTick=()=>{},tdOk=()=>true;
'''
post='''
/* corre un ataque completo con semilla fija (el cliente repite exactamente lo mismo para mostrarlo) */
function pvRng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function simPvp(army,spec,mul,seed){spec=JSON.parse(JSON.stringify(spec));army=JSON.parse(JSON.stringify(army));const real=Math.random;Math.random=pvRng(seed);try{const b=mkBattle(army,spec,mul);b.pvp=1;let g=0;while(!b.over&&g++<20000)stepBattle(b,.05);
 const hq=b.E[0],st=b.E.filter(x=>x.side===1&&x.st),dead=st.filter(x=>x.hp<=0).length,surv={};for(const x of b.E)if(x.side===0)surv[x.kind]=(surv[x.kind]||0)+(x.hp>0?Math.ceil(x.hp/x.uhp-1e-9):0);
 return{win:b.over===1,time:Math.round(b.time*100)/100,steps:g,hqHp:Math.max(0,Math.round(hq.hp)),destroyed:st.length?dead/st.length:0,surv}}finally{Math.random=real}}
export {U,B,DEFS,mkBattle,stepBattle,layoutSpec,simPvp,pvRng,GB,BTMAX};
'''
open('supabase/functions/pvp/sim.js','w').write(pre+src+post)
print('ok',len(pre+src+post)//1024,'KB')
