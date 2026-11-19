// El combate entre jugadores tiene que dar EXACTAMENTE lo mismo en el navegador (repetición) y en el servidor.
const {page,chrome}=require('./helpers.js'),pp=require('puppeteer-core');
(async()=>{const {simPvp}=await import(require('path').join(__dirname,'..','supabase','functions','pvp','sim.js'));
 const spec={defs:[{k:'torre',c:5,r:3,m:1.3},{k:'mortero',c:3,r:4,m:1},{k:'antiaereo',c:7,r:4,m:1},{k:'tesla',c:2,r:6,m:1.6}],units:{soldado:6,tanque:2},um:{soldado:[1,1],tanque:[1,1]},k:1,hq:2400,hqd:30,walls:8,map:'normal',seed:7};
 const cases=[[{soldado:30,tanque:8,helicoptero:4},11],[{soldado:12,robot:3},77],[{tanque:20,caza:3,bazuca:10},4242]];
 const b=await pp.launch({executablePath:chrome(),headless:'new',args:['--no-sandbox']});const p=await b.newPage();await p.goto(page('base'));await new Promise(r=>setTimeout(r,2500));
 let ok=0;for(const[army,seed]of cases){const mul={};for(const k in army)mul[k]=[1.2,1.3];const srv=simPvp(army,spec,mul,seed);
  const cli=await p.evaluate((army,spec,mul,seed)=>{const G=window.__G,bt=G.pvBattle(army,JSON.parse(JSON.stringify(spec)),mul,seed);let g=0;G.pvSeed(bt,()=>{while(!bt.over&&g++<20000)G.stepBattle(bt,.05)});const s={};for(const x of bt.E)if(x.side===0)s[x.kind]=(s[x.kind]||0)+(x.hp>0?Math.ceil(x.hp/x.uhp-1e-9):0);return{win:bt.over===1,time:Math.round(bt.time*100)/100,surv:s}},army,spec,mul,seed);
  const same=srv.win===cli.win&&srv.time===cli.time&&JSON.stringify(srv.surv)===JSON.stringify(cli.surv);console.log((same?'✅':'❌')+' pvp semilla '+seed+': servidor '+JSON.stringify([srv.win,srv.time])+' navegador '+JSON.stringify([cli.win,cli.time]));if(same)ok++}
 // repetición en vivo (con efectos y velocidad x4): tiene que terminar igual
 {const [army,seed]=cases[0],mul={};for(const k in army)mul[k]=[1.2,1.3];const srv=simPvp(army,spec,mul,seed);
  const live=await p.evaluate(async(army,spec,mul,seed)=>{const G=window.__G,bt=G.pvBattle(army,JSON.parse(JSON.stringify(spec)),mul,seed);bt.live=1;bt.e={n:'Test',f:'🤠',lvl:5};bt.army=army;G.runBattle(bt,'pvp');bt.speed=4;
   for(let i=0;i<120&&!bt.over;i++)await new Promise(r=>setTimeout(r,500));return{win:bt.over===1,time:Math.round(bt.time*100)/100}},army,spec,mul,seed);
  const same=live.win===srv.win&&live.time===srv.time;console.log((same?'✅':'❌')+' pvp en vivo: servidor '+JSON.stringify([srv.win,srv.time])+' pantalla '+JSON.stringify([live.win,live.time]));if(same)ok++}
 await b.close();process.exit(ok===cases.length+1?0:1)})();
