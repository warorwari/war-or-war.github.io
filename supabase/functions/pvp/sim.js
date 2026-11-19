// GENERADO por tools_sim.py desde src/10-datos.js: no editar a mano.
const window={matchMedia:()=>({matches:false})},document={documentElement:{classList:{toggle(){}}}},localStorage={getItem(){return null},setItem(){}};
const matchMedia=()=>({matches:false}),innerWidth=1200;let S={g:[],isl:[],troops:{},queue:[],lvl:1};const abTick=()=>{},tdOk=()=>true;
let N=10;const SAVE='guerra-de-bases-v1';
const LOGO=(w,name)=>`<svg class="logo" viewBox="0 0 200 210" width="${w}" height="${w*1.05}"><defs><linearGradient id="lgS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a5878"/><stop offset="1" stop-color="#14202d"/></linearGradient><linearGradient id="lgG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#d48f10"/></linearGradient><linearGradient id="lgR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8603f"/><stop offset="1" stop-color="#9c2a17"/></linearGradient></defs>
 <path d="M100 12 L172 38 L166 112 Q158 162 100 192 Q42 162 34 112 L28 38 Z" fill="url(#lgG)"/><path d="M100 24 L160 46 L155 110 Q148 152 100 178 Q52 152 45 110 L40 46 Z" fill="url(#lgS)"/>
 <g stroke-linecap="round"><path d="M62 60 L138 140" stroke="#dfe6ee" stroke-width="9"/><path d="M138 60 L62 140" stroke="#dfe6ee" stroke-width="9"/><path d="M62 60 L138 140M138 60 L62 140" stroke="#9aa5b1" stroke-width="3"/>
 <path d="M58 124 L76 142M142 124 L124 142" stroke="url(#lgG)" stroke-width="10"/><circle cx="56" cy="146" r="7" fill="url(#lgG)"/><circle cx="144" cy="146" r="7" fill="url(#lgG)"/></g>
 <path d="M100 66 l7 15 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2 z" fill="url(#lgG)" stroke="#8a5a08" stroke-width="1.5"/>
 <path d="M14 150 L34 142 L166 142 L186 150 L176 162 L186 174 L160 168 L40 168 L14 174 L24 162 Z" fill="url(#lgR)" stroke="#5e1a0e" stroke-width="2"/>
 <text x="100" y="161" text-anchor="middle" font-family="'Lilita One',Nunito,sans-serif" font-size="${name.length>15?15:19}" fill="#fff" stroke="#5e1a0e" stroke-width="3" paint-order="stroke" letter-spacing=".5">${name}</text></svg>`;
const GAMEN='WAR OR WAR';
let LITE=(()=>{try{const q=localStorage.getItem('gdb-gfx');if(q)return q==='lo'}catch(e){}return !!(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||innerWidth<760})();
document.documentElement.classList.toggle('lite',LITE);
let FULL=0;const LO=()=>LITE&&!FULL;
const RES={c:'💰',f:'🍗',o:'🛢️',s:'⚙️',e:'⚡'};
const B={
 casa:{n:'Casa',e:'🏠',cost:{c:100},t:8,prod:{c:25},per:30,lvl:1,xp:8,max:7,d:'Los vecinos pagan impuestos y dan lugar para tus tropas: cada casa suma 👥 población.'},
 granja:{n:'Granja',e:'🌾',cost:{c:80},t:8,prod:{f:20},per:30,lvl:1,xp:8,max:7,d:'Produce comida para entrenar soldados.'},
 pozo:{n:'Pozo de petróleo',e:'⛽',cost:{c:250},t:20,prod:{o:15},per:45,lvl:2,xp:20,max:7,d:'Extrae petróleo para tanques y helicópteros.'},
 banco:{n:'Banco',e:'🏦',cost:{c:900,o:100},t:35,prod:{c:120},per:60,lvl:4,xp:45,max:7,d:'Genera muchas monedas.'},
 recolector:{n:'Recolector automático',e:'🛸',cost:{c:250000,o:60000,s:50000,e:30000},t:900,lvl:8,xp:500,max:7,d:'Sigue juntando la producción de tu base mientras no jugás. Cuanto más nivel, más horas cubre. Solo uno por base.'},
 mina:{n:'Mina de acero',e:'⛏️',cost:{c:400},t:20,prod:{s:12},per:45,lvl:3,xp:25,max:7,d:'Extrae acero para misiles, robots y mejoras avanzadas.'},
 central:{n:'Central de energía',e:'⚡',cost:{c:1000,s:120},t:35,prod:{e:10},per:60,lvl:4,xp:45,max:7,d:'Genera energía para robots, dragones y láseres.'},
 cuartel:{n:'Cuartel',e:'⛺',cost:{c:250},t:15,lvl:1,xp:20,max:7,unit:'soldado',d:'Entrena soldados. Mejoralo para entrenar más rápido.'},
 fabrica:{n:'Fábrica de tanques',e:'🏭',cost:{c:600,o:100},t:30,lvl:3,xp:40,max:7,unit:'tanque',d:'Fabrica tanques. Mejorala para producir más rápido.'},
 hangar:{n:'Hangar',e:'🛫',cost:{c:1200,o:300},t:45,lvl:5,xp:60,max:7,unit:'helicoptero',d:'Fabrica helicópteros de ataque.'},
 lab:{n:'Laboratorio de robótica',e:'🔬',cost:{c:1500,o:300,s:150},t:40,lvl:4,xp:60,max:7,unit:'robot',d:'Fabrica robots de combate e investiga mejoras robóticas.'},
 forja:{n:'Forja de dragones',e:'🐉',cost:{c:5000,o:1500,s:600,e:300},t:60,lvl:7,xp:120,max:7,unit:'dragon',d:'Produce dragones robóticos, la unidad más poderosa.'},
 astillero:{n:'Astillero',e:'⚓',cost:{c:6000,o:1500,s:800},t:70,lvl:6,xp:130,max:7,unit:'lancha',d:'Construye barcos. Si mandás barcos en una expedición, llega más rápido y pelea más fuerte. En batalla atacan desde el agua.'},
 genetico:{n:'Laboratorio genético',e:'🧬',cost:{c:9000,o:1500,s:1000,e:600},t:80,lvl:9,xp:160,max:7,unit:'lobo',d:'Crea bestias de combate: lobos robóticos, dinosaurios blindados y el kraken.'},
 llamat:{n:'Torre lanzallamas',e:'🔥',cost:{c:1200,o:200,s:150},t:30,lvl:5,xp:50,max:7,def:160,d:'Quema a todo lo que se acerque, con daño en área. Ideal contra infantería.'},
 tfranco:{n:'Torre de francotirador',e:'🔭',cost:{c:1600,s:250},t:35,lvl:6,xp:60,max:7,def:180,d:'Dispara muy lejos y fuerte contra la infantería.'},
 costa:{n:'Costa artillada',e:'💂',cost:{c:1800,o:200,s:300},t:40,lvl:6,xp:65,max:7,def:200,d:'Cañón pesado de largo alcance. Hace el doble de daño a los barcos.'},
 escudo:{n:'Generador de escudo',e:'🔰',cost:{c:3000,s:500,e:300},t:50,lvl:7,xp:90,max:7,def:220,d:'No dispara, pero las defensas cercanas reciben 35% menos de daño.'},
 torre:{n:'Torre de defensa',e:'🗼',cost:{c:200},t:15,lvl:2,xp:15,max:7,def:40,d:'Protege tu base de los ataques enemigos.'},
 bunker:{n:'Búnker',e:'🏯',cost:{c:500,o:80},t:25,lvl:4,xp:35,max:7,def:110,d:'Defensa pesada contra ataques.'},
 laser:{n:'Torre láser',e:'🔦',cost:{c:2500,s:400,e:200},t:40,lvl:6,xp:70,max:7,def:320,d:'Defensa de alta tecnología.'},
 antiaereo:{n:'Cañón antiaéreo',e:'🎯',cost:{c:450,s:60},t:20,lvl:3,xp:25,max:7,def:90,d:'Derriba helicópteros y dragones enemigos.'},
 mortero:{n:'Mortero',e:'💣',cost:{c:800,o:100,s:100},t:25,lvl:4,xp:35,max:7,def:150,d:'Bombardea a la infantería desde lejos.'},
 tesla:{n:'Torre Tesla',e:'🌩️',cost:{c:1500,s:250,e:150},t:35,lvl:5,xp:55,max:7,def:240,d:'Descargas eléctricas contra robots y vehículos.'},
 muro:{n:'Muro',e:'🧱',cost:{c:60,s:10},t:5,lvl:2,xp:5,max:7,def:25,d:'No dispara, pero aguanta mucho y frena a las tropas de tierra.'},
 trampa:{n:'Campo minado',e:'💥',cost:{c:300,s:60},t:10,lvl:4,xp:15,max:7,def:60,d:'Explota cada pocos segundos contra lo que se acerque por tierra.'},
 arbol:{n:'Árbol',e:'🌳',cost:{c:20},t:0,lvl:1,xp:2,deco:1,d:'Decoración. Da un poquito de experiencia.'},
 pino:{n:'Pino',e:'🌲',cost:{c:30},t:0,lvl:1,xp:3,deco:1,d:'Decoración. Da un poquito de experiencia.'},
 fuente:{n:'Fuente',e:'⛲',cost:{c:150},t:0,lvl:2,xp:15,deco:1,d:'Decoración. Da experiencia al construirla.'},
 estatua:{n:'Estatua misteriosa',e:'🗿',cost:{c:2000},t:0,lvl:6,xp:150,deco:1,d:'Decoración de lujo. Mucha experiencia.'},
};
/*SIM-START*/
/* Tropas. atk es el "poder" que se muestra; hp, dmg, rng (alcance en casilleros), cd (segundos entre disparos),
   spd (casilleros por segundo), air (1 = puede atacar aéreos), vs = multiplicador de daño según la clase del blanco,
   b = edificio que la produce, bl = nivel de ese edificio que la desbloquea. */
const U={
 soldado:{n:'Soldado',cls:'inf',atk:8,hp:60,dmg:9,rng:1.6,cd:.8,spd:1,air:1,vs:{},cost:{f:15},t:6,b:'cuartel'},
 marine:{n:'Marine',cls:'inf',atk:18,hp:150,dmg:16,rng:1.6,cd:.7,spd:.9,air:1,vs:{inf:1.3},cost:{f:30,c:20},t:10,b:'cuartel',bl:2},
 bazuca:{n:'Bazuquero',cls:'inf',atk:24,hp:70,dmg:40,rng:2.4,cd:1.8,spd:.85,air:0,vs:{veh:2,def:1.6,mec:1.5,inf:.5},cost:{f:30,c:50,o:10},t:12,b:'cuartel',bl:2},
 franco:{n:'Francotirador',cls:'inf',atk:22,hp:55,dmg:60,rng:3.6,cd:2.2,spd:.8,air:0,vs:{inf:2.2,veh:.35,def:.3,mec:.6},cost:{f:35,c:40},t:12,b:'cuartel',bl:3},
 ing:{n:'Ingeniero',cls:'inf',atk:40,hp:130,dmg:0,rng:1.8,cd:1,spd:1,air:0,vs:{},heal:45,hcl:{veh:1,mec:1},cost:{f:40,c:60,s:10},t:14,b:'cuartel',bl:3},
 llamas:{n:'Lanzallamas',cls:'inf',atk:45,hp:170,dmg:22,rng:1.3,cd:.4,spd:.9,air:0,vs:{inf:1.8,def:1.2,mec:.6},spl:.75,cost:{f:40,c:60,o:20},t:14,b:'cuartel',bl:4},
 tanque:{n:'Tanque ligero',cls:'veh',atk:35,hp:300,dmg:26,rng:2.2,cd:1,spd:1.3,air:0,vs:{inf:1.4,veh:.8},cost:{c:60,o:25},t:15,b:'fabrica'},
 misil:{n:'Lanzamisiles',cls:'veh',atk:70,hp:260,dmg:110,rng:4.2,cd:2.6,spd:.7,air:1,vs:{air:2.2,def:1.5,inf:.5},cost:{c:250,o:60,s:40},t:25,b:'fabrica',bl:2},
 pesado:{n:'Tanque pesado',cls:'veh',atk:80,hp:900,dmg:70,rng:2.6,cd:1.8,spd:.6,air:0,vs:{veh:1.5,def:1.6,inf:.6},cost:{c:160,o:60,s:50},t:28,b:'fabrica',bl:3},
 arti:{n:'Artillería autopropulsada',cls:'veh',atk:140,hp:320,dmg:170,rng:5.6,cd:3.2,spd:.55,air:0,vs:{def:1.8,inf:1.2,veh:.8},spl:1,cost:{c:400,o:120,s:80},t:35,b:'fabrica',bl:4},
 emp:{n:'Tanque de pulso',cls:'veh',atk:160,hp:800,dmg:30,rng:2.6,cd:2.2,spd:.8,air:1,vs:{mec:1.5},emp:2.5,cost:{c:500,o:150,s:80,e:80},t:38,b:'fabrica',bl:5},
 helicoptero:{n:'Helicóptero',cls:'air',atk:90,hp:380,dmg:38,rng:2.4,cd:.6,spd:1.8,air:1,vs:{inf:1.5,veh:1.4,air:.7},cost:{c:150,o:70},t:30,b:'hangar'},
 caza:{n:'Caza',cls:'air',atk:110,hp:300,dmg:60,rng:2.6,cd:.5,spd:2.6,air:1,vs:{air:2.2,inf:.7,def:.5},cost:{c:220,o:100,s:30},t:28,b:'hangar',bl:2},
 bombardero:{n:'Bombardero',cls:'air',atk:180,hp:700,dmg:220,rng:1.6,cd:2.4,spd:1.3,air:0,vs:{def:2,veh:1.4,inf:1.2},cost:{c:450,o:200,s:80},t:45,b:'hangar',bl:3},
 b2:{n:'Bombardero furtivo B-2',cls:'air',atk:420,hp:1400,dmg:520,rng:1.8,cd:3,spd:1.5,air:0,vs:{def:2.4,veh:1.3},cost:{c:1500,o:600,s:300,e:150},t:80,b:'hangar',bl:5},
 dron:{n:'Dron kamikaze',cls:'air',atk:30,hp:40,dmg:90,rng:.6,cd:1,spd:2.8,air:1,vs:{def:1.4,veh:1.3},kam:1,cost:{c:60,o:20,e:5},t:6,b:'hangar',bl:3},
 transp:{n:'Avión de transporte',cls:'air',atk:260,hp:1100,dmg:0,rng:1,cd:1,spd:1.6,air:0,vs:{},drop:'marine',dropN:4,cost:{c:700,o:300,s:80},t:50,b:'hangar',bl:4},
 robot:{n:'Robot de combate',cls:'mec',atk:220,hp:1500,dmg:95,rng:2.2,cd:1,spd:.8,air:1,vs:{inf:1.3,def:1.3},cost:{c:400,o:150,s:60,e:30},t:45,b:'lab'},
 rexp:{n:'Robot explorador',cls:'mec',atk:60,hp:350,dmg:30,rng:1.8,cd:.5,spd:1.6,air:0,vs:{inf:1.6},cost:{c:120,o:40,s:20},t:15,b:'lab'},
 rescudo:{n:'Robot escudo',cls:'mec',atk:150,hp:3200,dmg:25,rng:1.4,cd:1,spd:.7,air:0,vs:{},cost:{c:350,s:150,e:30},t:35,b:'lab',bl:2},
 rmed:{n:'Robot médico',cls:'mec',atk:80,hp:500,dmg:0,rng:1.8,cd:1,spd:1,air:0,vs:{},heal:60,cost:{c:300,s:80,e:80},t:30,b:'lab',bl:2},
 rart:{n:'Robot artillero',cls:'mec',atk:260,hp:700,dmg:300,rng:4.6,cd:3,spd:.5,air:0,vs:{def:2,inf:.6},cost:{c:600,o:200,s:150,e:60},t:50,b:'lab',bl:3},
 rara:{n:'Robot araña',cls:'mec',atk:200,hp:900,dmg:120,rng:1.4,cd:.8,spd:1.5,air:0,vs:{def:1.5},hqo:1,cost:{c:500,o:150,s:120,e:50},t:45,b:'lab',bl:4},
 titan:{n:'Titán',cls:'mec',atk:1500,hp:9000,dmg:420,rng:2.6,cd:1.2,spd:.5,air:1,vs:{def:1.4},max:1,cost:{c:6000,o:2000,s:1500,e:800},t:180,b:'lab',bl:6},
 sigilo:{n:'Robot sigiloso',cls:'mec',atk:240,hp:900,dmg:140,rng:1.8,cd:1,spd:1.2,air:0,vs:{def:1.6},stl:1,cost:{c:600,o:150,s:150,e:80},t:45,b:'lab',bl:5},
 espada:{n:'Mecha espadachín',cls:'mec',atk:380,hp:2600,dmg:160,rng:1.1,cd:.7,spd:.95,air:0,vs:{inf:1.4,veh:1.4},res:{inf:.5,def:.6},cost:{c:900,o:250,s:250,e:100},t:60,b:'lab',bl:5},
 dragon:{n:'Dragón robótico',cls:'air',atk:600,hp:2600,dmg:200,rng:2,cd:1,spd:1.6,air:1,vs:{def:1.5,veh:1.3},cost:{c:1200,o:400,s:200,e:150},t:90,b:'forja',drg:1},
 dfuego:{n:'Dragón de fuego',cls:'air',atk:750,hp:2800,dmg:260,rng:2,cd:1,spd:1.6,air:1,vs:{inf:1.8,def:1.4},cost:{c:1600,o:700,s:200,e:150},t:100,b:'forja',bl:2,drg:1},
 dhielo:{n:'Dragón de hielo',cls:'air',atk:750,hp:3600,dmg:170,rng:2.2,cd:1,spd:1.5,air:1,vs:{veh:1.8,mec:1.5},cost:{c:1600,o:400,s:300,e:250},t:100,b:'forja',bl:3,drg:1},
 delec:{n:'Dragón eléctrico',cls:'air',atk:800,hp:2400,dmg:230,rng:2.8,cd:.9,spd:1.7,air:1,vs:{air:2,mec:1.8,def:1.3},cost:{c:1800,o:400,s:250,e:450},t:110,b:'forja',bl:4,drg:1},
 dsombra:{n:'Dragón de sombra',cls:'air',atk:820,hp:2600,dmg:240,rng:2,cd:1,spd:1.9,air:1,vs:{def:1.5,inf:1.3},low:1,cost:{c:2000,o:600,s:300,e:400},t:110,b:'forja',bl:5,drg:1},
 lancha:{n:'Lancha artillada',cls:'veh',atk:50,hp:260,dmg:24,rng:3,cd:.5,spd:1.6,air:1,vs:{inf:1.5},nav:1,cost:{c:120,o:50},t:14,b:'astillero'},
 destructor:{n:'Destructor',cls:'veh',atk:300,hp:1800,dmg:160,rng:5.2,cd:1.8,spd:.8,air:1,vs:{def:1.6,air:1.4},nav:1,cost:{c:900,o:400,s:200},t:60,b:'astillero',bl:2},
 submarino:{n:'Submarino',cls:'veh',atk:260,hp:1100,dmg:300,rng:4.5,cd:3,spd:1,air:0,vs:{def:1.8,veh:1.5},nav:1,stl:1,cost:{c:800,o:350,s:200,e:60},t:55,b:'astillero',bl:3},
 portaav:{n:'Portaaviones',cls:'veh',atk:700,hp:5200,dmg:0,rng:6,cd:1,spd:.5,air:0,vs:{},nav:1,spawn:'dron',max:2,cost:{c:5000,o:2000,s:1200,e:400},t:150,b:'astillero',bl:5},
 lobo:{n:'Lobo robótico',cls:'mec',atk:70,hp:380,dmg:45,rng:1,cd:.5,spd:2,air:0,vs:{inf:1.6},cost:{f:60,c:150,e:20},t:16,b:'genetico'},
 dino:{n:'Dinosaurio blindado',cls:'veh',atk:300,hp:3000,dmg:110,rng:1.2,cd:1,spd:.9,air:0,vs:{veh:1.5,def:1.3},res:{inf:.6},cost:{f:300,c:900,s:120,e:100},t:60,b:'genetico',bl:2},
 kraken:{n:'Kraken',cls:'veh',atk:900,hp:6000,dmg:260,rng:3,cd:1.1,spd:.7,air:1,vs:{veh:1.6,def:1.4,air:1.3},spl:.8,nav:1,max:3,cost:{f:800,c:3000,o:600,e:400},t:120,b:'genetico',bl:4},
 tanvol:{n:'Tanque volador',cls:'air',atk:380,hp:2200,dmg:150,rng:3,cd:1.2,spd:1.5,air:0,vs:{veh:1.6,def:1.4,inf:1.2},hero:1,fus:1,b:'fabrica',cost:{}},
 mecha:{n:'Mecha marine',cls:'mec',atk:420,hp:3400,dmg:70,rng:2.4,cd:.45,spd:1,air:1,vs:{inf:1.8,air:1.2},hero:1,fus:1,b:'lab',cost:{}},
 sombra:{n:'Francotirador sombra',cls:'inf',atk:320,hp:600,dmg:320,rng:7,cd:2,spd:1.1,air:0,vs:{inf:2.2,mec:1.4},hero:1,fus:1,b:'cuartel',cost:{}},
 aracno:{n:'Arácnido acorazado',cls:'mec',atk:950,hp:5200,dmg:240,rng:1.6,cd:.9,spd:1.3,air:0,vs:{def:2},hqo:1,hero:1,fus:1,b:'lab',cost:{}},
 fortvol:{n:'Fortaleza volante',cls:'air',atk:1100,hp:7000,dmg:420,rng:2,cd:2,spd:.9,air:0,vs:{def:2.4,veh:1.3},hero:1,fus:1,b:'hangar',cost:{}},
 fenix:{n:'Fénix de plasma',cls:'air',atk:1800,hp:4200,dmg:300,rng:3.2,cd:.6,spd:2.4,air:1,vs:{air:2.4,def:1.2},hero:1,fus:1,drg:1,b:'forja',cost:{}},
 hidra:{n:'Hidra mecánica',cls:'air',atk:3200,hp:12000,dmg:420,rng:2.6,cd:.7,spd:1.3,air:1,vs:{inf:1.6,veh:1.6,air:1.5,def:1.4},hero:1,fus:1,drg:1,b:'forja',cost:{}},
 coloso:{n:'Coloso de guerra',cls:'mec',atk:5000,hp:22000,dmg:800,rng:3.4,cd:1.6,spd:.4,air:1,vs:{def:1.9,veh:1.4},hero:1,fus:1,b:'lab',cost:{}},
 infierno:{n:'Tanque infierno',cls:'veh',atk:900,hp:5600,dmg:90,rng:1.8,cd:.35,spd:.7,air:0,vs:{inf:2,def:1.5},spl:1,hero:1,fus:1,b:'fabrica',cost:{}},
 ronin:{n:'Ronin espectral',cls:'mec',atk:1200,hp:5200,dmg:420,rng:1.2,cd:.6,spd:1.2,air:0,vs:{def:1.5,veh:1.3},stl:1,res:{inf:.5,def:.5},hero:1,fus:1,b:'lab',cost:{}},
 nodriza:{n:'Nave nodriza',cls:'air',atk:1400,hp:6500,dmg:60,rng:3,cd:.8,spd:.9,air:1,vs:{air:1.4},spawn:'dron',hero:1,fus:1,b:'hangar',cost:{}},
 quimera:{n:'Quimera',cls:'veh',atk:1600,hp:9000,dmg:320,rng:1.6,cd:.8,spd:1.1,air:0,vs:{veh:1.6,inf:1.5,def:1.3},spl:.7,res:{inf:.6},hero:1,fus:1,b:'genetico',cost:{}},
 acorazado:{n:'Acorazado',cls:'veh',atk:2200,hp:12000,dmg:480,rng:6,cd:1.6,spd:.6,air:1,vs:{def:1.8,air:1.3},spl:.8,nav:1,hero:1,fus:1,b:'astillero',cost:{}},
 drey:{n:'Dragón rey',cls:'air',atk:4000,hp:16000,dmg:650,rng:3,cd:.9,spd:1.5,air:1,vs:{def:1.6,veh:1.4,inf:1.4,air:1.4},spl:.9,drg:1,hero:1,fus:1,leg:1,max:1,b:'forja',cost:{}},
 cmd1:{n:'General Hierro',cls:'inf',atk:0,hp:900,dmg:45,rng:2.8,cd:.7,spd:.9,air:1,vs:{},hero:1,b:'cuartel',cost:{}},
 cmd2:{n:'Capitana Halcón',cls:'inf',atk:0,hp:900,dmg:45,rng:2.8,cd:.7,spd:.9,air:1,vs:{},hero:1,b:'cuartel',cost:{}},
 cmd3:{n:'Doctor Voltio',cls:'inf',atk:0,hp:900,dmg:45,rng:2.8,cd:.7,spd:.9,air:1,vs:{},hero:1,b:'cuartel',cost:{}},
};
/* Defensas de las bases enemigas. r = poder; air: 0 solo tierra, 1 ambos, 2 solo aéreos. */
const DEFS={
 hq:{n:'Cuartel general'},
 torre:{n:'Torre',hp:500,dmg:24,rng:3,cd:.9,air:1,vs:{inf:1.3},r:40},
 antiaereo:{n:'Antiaéreo',hp:450,dmg:55,rng:4,cd:.7,air:2,vs:{},r:90},
 bunker:{n:'Búnker',hp:1300,dmg:16,rng:2.4,cd:.4,air:0,vs:{inf:1.6,veh:.6},r:110},
 mortero:{n:'Mortero',hp:400,dmg:85,rng:4.5,cd:2.4,air:0,vs:{inf:1.5},r:150},
 tesla:{n:'Torre Tesla',hp:900,dmg:110,rng:2.6,cd:1.5,air:1,vs:{mec:2,veh:1.4},r:240},
 laser:{n:'Torre láser',hp:1100,dmg:150,rng:3.4,cd:1.2,air:1,vs:{},r:320},
 muro:{n:'Muro',hp:1800,dmg:0,rng:0,cd:1,air:0,vs:{},r:25},
 trampa:{n:'Campo minado',hp:200,dmg:600,rng:1.2,cd:6,air:0,vs:{},r:60},
 llamat:{n:'Torre lanzallamas',hp:900,dmg:40,rng:1.8,cd:.5,air:0,vs:{inf:2,mec:.7},spl:.8,r:160},
 tfranco:{n:'Torre de francotirador',hp:700,dmg:260,rng:5.5,cd:3,air:0,vs:{inf:2.5,mec:.8,veh:.6},r:180},
 costa:{n:'Costa artillada',hp:1200,dmg:140,rng:5,cd:2,air:0,vs:{veh:1.6},nvb:2,spl:.6,r:200},
 escudo:{n:'Generador de escudo',hp:1400,dmg:0,rng:0,cd:1,air:0,vs:{},r:220},
};
const GB=13,EK=1,BTMAX=120;   // lado del campo, ajuste de dificultad, duración máxima en segundos
function rng32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
/* Arma la base enemiga gastando su poder D en defensas y tropas; si sobra poder, todo se vuelve más resistente (k). */
function enemySpec(D,lvl,seed){
 const R=rng32(seed),dp=['torre'],up=['soldado'],defs=[],units={};
 if(lvl>=3)dp.push('bunker');if(lvl>=4)dp.push('antiaereo');if(lvl>=5)dp.push('mortero');if(lvl>=7)dp.push('tesla');if(lvl>=8)dp.push('llamat');if(lvl>=9)dp.push('laser');if(lvl>=10)dp.push('tfranco');if(lvl>=11)dp.push('costa');if(lvl>=13)dp.push('escudo');
 if(lvl>=2)up.push('marine');if(lvl>=3)up.push('tanque');if(lvl>=4)up.push('bazuca','franco');if(lvl>=6)up.push('pesado','helicoptero');if(lvl>=7)up.push('caza');if(lvl>=8)up.push('misil','robot');if(lvl>=10)up.push('bombardero');if(lvl>=12)up.push('dragon');if(lvl>=9)up.push('llamas');if(lvl>=11)up.push('arti','lobo');if(lvl>=13)up.push('emp','dino');if(lvl>=14)up.push('sigilo','espada');
 const slots=[[5,3],[3,4],[7,4],[2,6],[8,6],[5,6],[4,2],[6,2],[1,4],[9,4]];
 let spent=0,b=D*.55,g=0;
 for(let i=0;i<slots.length&&b>=40;i++){const ok=dp.filter(k=>DEFS[k].r<=b),k=ok[Math.floor(R()*ok.length)];defs.push({k,c:slots[i][0],r:slots[i][1]});b-=DEFS[k].r;spent+=DEFS[k].r}
 b=D-spent;
 while(b>=8&&g++<50){const ok=up.filter(k=>U[k].atk<=b);if(!ok.length)break;const k=ok[Math.floor(R()*ok.length)];units[k]=(units[k]||0)+1;b-=U[k].atk;spent+=U[k].atk}
 return{defs,units,k:EK*Math.sqrt(Math.max(1,D/Math.max(1,spent))),hq:400+4*D};
}
/* Estado de una batalla. Cada entidad es un pelotón de m miembros: su daño depende de cuántos siguen en pie. */
/* Tropas que aparecen durante la batalla (paracaidistas, drones del portaaviones) */
function spawnE(B,src,k,m,x,y){const q=U[k],hm=src.uhp/(U[src.kind]||{hp:src.uhp}).hp||1,hp=q.hp*hm,o={side:src.side,kind:k,st:0,cls:q.cls,x,y,hp:hp*m,uhp:hp,m,dmg:q.dmg*hm,rng:q.rng,cd:q.cd,spd:q.spd,fly:q.cls==='air'?1:0,air:q.air,vs:q.vs,t:Math.random(),rt:0,tg:null,ix:B.E.length,tm:src.tm,yaw:src.yaw||0,yawT:src.yawT||0,sp:1};o.max=o.hp;B.E.push(o);if(B.onSpawn)B.onSpawn(o);return o}
const UD=k=>U[k]||DEFS[k]||{};
/* Los barcos navegan por el anillo de agua que rodea la isla */
const RGA=-.45,RGC=GB+.45,RGL=RGC-RGA;
function ringS(x,y){const cx=Math.max(RGA,Math.min(RGC,x)),cy=Math.max(RGA,Math.min(RGC,y)),d=[Math.abs(y-RGA),Math.abs(x-RGC),Math.abs(y-RGC),Math.abs(x-RGA)],m=d.indexOf(Math.min(...d));return m===0?cx-RGA:m===1?RGL+(cy-RGA):m===2?2*RGL+(RGC-cx):3*RGL+(RGC-cy)}
function ringP(s){s=((s%(4*RGL))+4*RGL)%(4*RGL);const q=Math.floor(s/RGL),r=s-q*RGL;return q===0?[RGA+r,RGA]:q===1?[RGC,RGA+r]:q===2?[RGC-r,RGC]:[RGA,RGC-r]}
/* ---------- diseño de las bases rivales ----------
   Cada base se arma siempre igual a partir de su contenido: estilo (núcleo amurallado, embudo, anillo o dispersa),
   muros, minas ocultas, la ciudad con sus edificios y el terreno (normal, río con puentes, montaña o niebla). */
const CITYK=['civil1','civil2','granja','civil3','pozo','civil1','banco','mina','civil2','fabrica','central','cuartel'];
const MAPN={rio:'🌊 Río',monte:'⛰️ Montaña',niebla:'🌑 Niebla de guerra'};
function hashStr(s){let x=2166136261;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0}
function layoutSpec(spec){
 if(spec.lay)return spec;
 const raw=spec.defs||[],R=rng32(hashStr(JSON.stringify(raw.map(d=>d.k))+'|'+Math.round(spec.hq||0)+'|'+(spec.seed||0))),N=GB,occ=new Set(),K=(c,r)=>c+','+r;
 const expl=raw.filter(d=>d.k==='muro').length,base=raw.filter(d=>d.k!=='muro'),nd=base.length;
 const style=spec.style||(nd<4?'disperso':['nucleo','embudo','anillo'][Math.floor(R()*3)]);
 const hc=6,hr=style==='nucleo'?3:1;occ.add(K(hc,hr));
 const free=(c,r)=>c>=0&&c<N&&r>=0&&r<=8&&!occ.has(K(c,r)),walls=[],tc=[];
 const pw=(c,r)=>{if(free(c,r)){occ.add(K(c,r));walls.push({k:'muro',c,r})}};
 let nW=spec.walls!=null?spec.walls:expl?expl*5:nd<4?0:99;
 if(nW>0){
  if(style==='nucleo'){for(let c=hc-2;c<=hc+2;c++)for(let r=hr-2;r<=hr+2;r++)if(Math.max(Math.abs(c-hc),Math.abs(r-hr))===2)pw(c,r)}
  else if(style==='embudo'){for(let i=0;i<5;i++){pw(1+i,8-i);pw(N-2-i,8-i)}tc.push([6,5],[5,5],[7,5])}
  else{for(let c=1;c<N-1;c++)if(c!==3&&c!==N-4)pw(c,6);tc.push([3,6],[N-4,6])}
  if(style==='disperso'||walls.length===0){for(let c=3;c<N-3;c++)pw(c,7)}
  while(walls.length>nW){const w=walls.pop();occ.delete(K(w.c,w.r))}
 }
 const cheb=(c,r)=>Math.max(Math.abs(c-hc),Math.abs(r-hr));
 const score=(c,r)=>style==='nucleo'?(cheb(c,r)===1?0:cheb(c,r)+R()*.6):style==='embudo'?Math.abs(c-6)*.7+Math.abs(r-3)+R()*.6:style==='anillo'?(r>=6?99:Math.abs(r-4)*.6+Math.abs(c-6)*.25+R()*.8):Math.abs(c-6)*.4+Math.abs(r-4)*.5+R()*1.5;
 const cells=[];for(let r=0;r<=8;r++)for(let c=0;c<N;c++)cells.push([c,r,score(c,r)]);cells.sort((a,b)=>a[2]-b[2]);
 const defs=[],put=(d,c,r)=>{occ.add(K(c,r));defs.push(Object.assign({},d,{c,r}))};
 const mines=base.filter(d=>d.k==='trampa'),rest=base.filter(d=>d.k!=='trampa').sort((a,b)=>(DEFS[b.k].r||0)-(DEFS[a.k].r||0));
 for(const d of rest){const cl=cells.find(([c,r])=>free(c,r));if(cl)put(d,cl[0],cl[1])}
 const extra=nd>=6&&style!=='disperso'?Math.min(3,1+Math.floor(nd/6)):0;for(let i=0;i<extra;i++)mines.push({k:'trampa',m:spec.k});
 for(const d of mines){let cl=tc.find(([c,r])=>free(c,r));if(!cl){const f=cells.filter(([c,r])=>free(c,r)&&r>=4);cl=f[Math.floor(R()*f.length)]}if(cl)put(d,cl[0],cl[1])}
 const city=[],fc=cells.filter(([c,r])=>free(c,r));const nC=Math.min(fc.length,Math.min(16,4+nd+Math.floor(R()*4)));
 for(let i=0;i<nC;i++){const j=Math.floor(R()*fc.length),[c,r]=fc.splice(j,1)[0];occ.add(K(c,r));city.push({k:CITYK[Math.floor(R()*Math.min(CITYK.length,4+nd))],c,r})}
 let map=spec.map;if(!map){const q=R();map=nd<3?'normal':q<.42?'normal':q<.64?'rio':q<.84?'monte':'niebla'}
 let riv=null;const rocks=[];
 if(map==='rio'){const b1=1+Math.floor(R()*3),b2=N-2-Math.floor(R()*3);riv={r:9,br:[b1,b2,Math.floor(N/2)].filter((v,i,a)=>a.indexOf(v)===i).slice(0,nd>=8?2:3)}}
 if(map==='monte'){for(let k=0;k<2;k++){const cc=2+Math.floor(R()*(N-4)),cr=7+Math.floor(R()*2);for(const[dc,dr]of[[0,0],[1,0],[0,1],[-1,0],[1,1]].slice(0,3+Math.floor(R()*3))){const c=cc+dc,r=cr+dr;if(c>=0&&c<N&&!occ.has(K(c,r))&&!rocks.some(x=>x[0]===c&&x[1]===r)){rocks.push([c,r]);occ.add(K(c,r))}}}}
 return Object.assign(spec,{lay:1,defs:defs.concat(walls),city,hx:hc+.5,hy:hr+.5,map,riv,rocks,style});
}
const mulCost=(c,f)=>{const o={};for(const k in c)o[k]=Math.round(c[k]*f);return o};
function mkBattle(army,spec,mul){layoutSpec(spec);
 const E=[],add=o=>{o.max=o.hp;o.t=Math.random()*o.cd;o.rt=0;o.tg=null;E.push(o)};
 add({side:1,kind:'hq',st:1,cls:'def',x:spec.hx||6.5,y:spec.hy||1.5,hp:spec.hq,uhp:spec.hq,m:1,dmg:spec.hqd||0,rng:spec.hqd?3:0,cd:1,spd:0,fly:0,air:1,vs:{}});
 if(spec.krk){E[0].y=-.25;E[0].krk=1}
 for(const d of spec.defs){const q=DEFS[d.k],m=d.m||spec.k;add({side:1,kind:d.k,st:1,cls:'def',x:d.c+.5,y:d.r+.5,hp:q.hp*m,uhp:q.hp*m,m:1,dmg:q.dmg*m,rng:q.rng,cd:q.cd,spd:0,fly:0,air:q.air,vs:q.vs,ny:0,hid:d.k==='trampa'?1:0})}
 for(const d of spec.city||[]){const H=Math.round((120+(spec.hq||400)*.05)*(spec.k||1));add({side:1,kind:d.k,st:1,cls:'bld',x:d.c+.5,y:d.r+.5,hp:H,uhp:H,m:1,dmg:0,rng:0,cd:1,spd:0,fly:0,air:0,vs:{},city:1})}
 const squads=(side,k,n,hm,dm,mx,px,py)=>{const q=U[k],g=Math.min(n,LITE?Math.min(mx,2):mx);for(let i=0;i<g;i++){const m=Math.floor(n/g)+(i<n%g?1:0),ny=q.nav?RGC:0,nx=px();add({side,kind:k,st:0,cls:q.cls,x:nx,y:ny||py(),rs:q.nav?ringS(nx,RGC):0,nav:q.nav?1:0,hp:q.hp*hm*m,uhp:q.hp*hm,m,dmg:q.dmg*dm,rng:q.rng,cd:q.cd,spd:q.spd,fly:q.cls==='air'?1:0,air:q.air,vs:q.vs})}};
 for(const k in spec.units){const um=spec.um&&spec.um[k]||[spec.k,spec.k];squads(1,k,spec.units[k],um[0],um[1],3,()=>2+Math.random()*(GB-4),()=>2.5+Math.random()*4.5)}
 for(const k in army)squads(0,k,army[k],mul[k][0],mul[k][1],5,()=>1+Math.random()*(GB-2),()=>GB-1.6+Math.random()*1.3);
 const blk=new Set(),wc=new Map();if(spec.riv)for(let c=0;c<GB;c++)if(!spec.riv.br.includes(c))blk.add(c+','+spec.riv.r);for(const[c,r]of spec.rocks||[])blk.add(c+','+r);
 for(const e of E)if(e.kind==='muro')wc.set(Math.floor(e.x)+','+Math.floor(e.y),e);
 return{E,time:0,over:0,blk,wc,riv:spec.riv,fog:spec.map==='niebla',map:spec.map,spec};
}
/* Un paso de simulación: buscar blanco, acercarse hasta tener alcance y disparar. over: 1 = ganó el atacante, 2 = perdió. */
/* Movimiento por tierra: los muros enemigos, las rocas y el río frenan; para cruzar el río se busca el puente más cercano */
function btMove(B,e,t,dx,dy,d,s){let gx=dx,gy=dy,gd=d;
 if(!e.fly&&B.riv){const r=B.riv.r,er=Math.floor(e.y),tr=Math.floor(t.y);if(er!==r&&(er>r)!==(tr>r)){let bc=B.riv.br[0];for(const c of B.riv.br)if(Math.abs(c+.5-e.x)<Math.abs(bc+.5-e.x))bc=c;gx=bc+.5-e.x;gy=r+.5-e.y;gd=Math.hypot(gx,gy)||1}}
 let nx=Math.max(.2,Math.min(GB-.2,e.x+gx/gd*s)),ny=Math.max(.2,Math.min(GB-.2,e.y+gy/gd*s));
 if(!e.fly&&(B.blk||B.wc)){const bl=(x,y)=>{const k=Math.floor(x)+','+Math.floor(y);if(B.blk&&B.blk.has(k))return 1;const w=B.wc&&B.wc.get(k);return w&&w.hp>0&&w.side!==e.side?w:0};
  const b=bl(nx,ny);if(b){const bx=bl(nx,e.y),by=bl(e.x,ny);if(!bx)ny=e.y;else if(!by)nx=e.x;else{const w=b!==1?b:bx!==1?bx:by!==1?by:null;if(w)e.tg=w;nx=e.x;ny=e.y;e.mv=0}}}
 e.x=nx;e.y=ny}
function stepBattle(B,dt,fx){if(B.dep&&!B.go)return;if(B.ab)abTick(B,dt,fx);
 const E=B.E;B.time+=dt;const SH=E.filter(o=>o.kind==='escudo'&&o.hp>0),now_=B.time;
 for(let ei=0;ei<E.length;ei++){const e=E[ei];
  if(e.hp<=0||!e.rng||e.off)continue;
  if(e.stun>0){e.stun-=dt;e.mv=0;continue}
  const ud=UD(e.kind),hqo=e.side===0&&ud.hqo;
  if(ud.spawn&&!e.st){e.spt=(e.spt||0)+dt;if(e.spt>=5&&(e.spn||0)<10){e.spt=0;e.spn=(e.spn||0)+2;spawnE(B,e,ud.spawn,2,e.x+(Math.random()-.5)*.6,Math.min(e.y,GB-.4)-.3)}}
  if(ud.heal){let a=null,bd=1e9;for(const o of E){if(o.off||o.side!==e.side||o===e||o.hp<=0||o.st||(U[o.kind]||{}).heal||(ud.hcl&&!ud.hcl[o.cls]))continue;const d=Math.hypot(o.x-e.x,o.y-e.y)+(o.hp<o.uhp*o.m?0:50);if(d<bd){bd=d;a=o}}
   if(!a){e.mv=0;continue}const dx=a.x-e.x,dy=a.y-e.y,d=Math.hypot(dx,dy)||.001;e.yawT=Math.atan2(dy,dx);
   if(d>e.rng){e.mv=1;e.x+=dx/d*e.spd*dt;e.y+=dy/d*e.spd*dt}else{e.mv=0;e.t-=dt;if(e.t<=0){e.t+=e.cd;if(a.hp<a.uhp*a.m)a.hp=Math.min(a.uhp*a.m,a.hp+ud.heal*Math.ceil(e.hp/e.uhp-1e-9))}}
   continue}
  let t=e.tg;e.rt-=dt;
  if(!t||t.hp<=0||e.rt<=0||(e.st&&Math.hypot(t.x-e.x,t.y-e.y)>e.rng)){
   t=null;let bd=1e9;e.rt=.8;
   for(const o of E){if(o.side===e.side||o.hp<=0||(o.fly?!e.air:e.air===2)||(hqo&&o.kind!=='hq'))continue;if(o.off||(o.hid&&o.side!==e.side)||(B.fog&&e.side===0&&o.kind!=='hq'&&Math.hypot(o.x-e.x,o.y-e.y)>Math.max(3.6,e.rng+.4)))continue;const od=U[o.kind];if(od&&((od.stl&&!(o.rev>now_))||(od.low&&e.air===2)))continue;if(e.nav&&Math.min(o.x-RGA,RGC-o.x,o.y-RGA,RGC-o.y)>e.rng)continue;const d=Math.hypot(o.x-e.x,o.y-e.y);if(d<bd&&(!e.st||d<=e.rng)){bd=d;t=o}}
   e.tg=t;
  }
  if(!t){e.mv=0;continue}
  const dx=t.x-e.x,dy=t.y-e.y,d=Math.hypot(dx,dy)||.001;
  if(!e.st)e.yawT=Math.atan2(dy,dx);
  if(d>e.rng){const s=e.spd*dt;if(e.nav){let ds=ringS(t.x,t.y)-e.rs;ds-=Math.round(ds/(4*RGL))*4*RGL;if(Math.abs(ds)>.05){e.mv=1;e.rs+=Math.sign(ds)*Math.min(Math.abs(ds),s);const[nx,ny]=ringP(e.rs);e.yawT=Math.atan2(ny-e.y,nx-e.x);e.x=nx;e.y=ny}else{e.mv=0;e.rt=Math.min(e.rt,.2)}}else{e.mv=1;btMove(B,e,t,dx,dy,d,s)}}
  else{e.mv=0;e.t-=dt;if(e.t<=0){e.t+=e.cd;const n=Math.ceil(e.hp/e.uhp-1e-9),td=UD(t.kind);let dm=e.dmg*n*(e.vs[t.cls]||1)*((td.res&&td.res[e.cls])||1)*(t.nav&&ud.nvb?ud.nvb:1);
    if(t.st&&SH.length&&t.kind!=='escudo'&&SH.some(s=>s.side===t.side&&Math.hypot(s.x-t.x,s.y-t.y)<2.6))dm*=.65;
    if(ud.stl)e.rev=now_+2.5;if(e.hid)e.hid=0;
    if(ud.drop&&!e.dr){e.dr=1;spawnE(B,e,ud.drop,ud.dropN*n,e.x,Math.min(GB-.3,e.y))}
    if(dm>0){t.hp=Math.max(0,t.hp-dm);
     if(ud.spl)for(const o of E)if(o!==t&&o.side!==e.side&&o.hp>0&&o.fly===t.fly&&Math.hypot(o.x-t.x,o.y-t.y)<ud.spl)o.hp=Math.max(0,o.hp-dm*.5*(e.vs[o.cls]||1));
     if(ud.emp&&t.kind!=='hq'&&(t.cls==='mec'||t.cls==='veh'||t.cls==='def'))t.stun=ud.emp*(t.st?1:.6)}
    if(ud.kam)e.hp=Math.max(0,e.hp-e.uhp);
    if(fx)fx(e,t);if(!t.hp)e.tg=null}}
 }
 for(let i=0;i<E.length;i++){const a=E[i];if(a.st||a.hp<=0||a.off)continue;
  for(let j=i+1;j<E.length;j++){const b=E[j];if(b.st||b.hp<=0||b.off||a.fly!==b.fly)continue;const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d<.42){const p=(.42-d)/2,ux=d?dx/d:1,uy=d?dy/d:0;a.x-=ux*p;a.y-=uy*p;b.x+=ux*p;b.y+=uy*p;if(a.nav){a.rs+=(ux*-p+uy*-p)*.5;[a.x,a.y]=ringP(a.rs)}if(b.nav){b.rs+=(ux*p+uy*p)*.5;[b.x,b.y]=ringP(b.rs)}}}}
 if(E[0].hp<=0)B.over=1;else if(B.time>=BTMAX||!E.some(e=>e.side===0&&e.hp>0))B.over=2;
}
/*SIM-END*/
/* ---------- balance (ajustado con simulaciones: cada tropa con el mismo presupuesto contra bases estándar) ----------
   c: multiplica el costo · d: el daño · v: la vida */
const BAL={franco:{c:1.42},llamas:{c:1.42},pesado:{c:1.25},bombardero:{c:1.22},destructor:{c:1.25},tanque:{c:1.15},
 submarino:{c:.75,d:1.4},rara:{c:.65,d:1.15},rart:{c:.65,d:1.15},sigilo:{c:.75,d:1.2},arti:{c:.8,d:1.15},b2:{c:.68,d:1.15},dsombra:{c:.9,d:1.12,v:1.2},
 dragon:{c:.85},dfuego:{c:.88},dhielo:{c:.88},kraken:{c:.85},dino:{c:.9,v:1.1},emp:{d:1.8},transp:{c:.9}};
for(const u in BAL){const d=U[u],m=BAL[u];if(!d)continue;if(m.c&&d.cost)for(const k in d.cost)d.cost[k]=Math.round(d.cost[k]*m.c);if(m.d)d.dmg=Math.round(d.dmg*m.d);if(m.v)d.hp=Math.round(d.hp*m.v)}
const AIR={dron:1,transp:1,dsombra:1,drey:1,nodriza:1,helicoptero:1,dragon:1,caza:1,bombardero:1,b2:1,dfuego:1,dhielo:1,delec:1,tanvol:1,fortvol:1,fenix:1,hidra:1};
const ISL=[{n:'Isla Coral',def:60,gold:20},{n:'Isla Tortuga',def:150,gold:40},{n:'Isla Calavera',def:320,gold:70},{n:'Isla Volcán',def:650,gold:120},{n:'Isla Trueno',def:1300,gold:200},{n:'Isla del Dragón',def:2600,gold:350},{n:'Isla Niebla',def:5000,gold:500},{n:'Isla Titán',def:9000,gold:700},{n:'Isla Abismo',def:16000,gold:1000},{n:'Isla Corona',def:30000,gold:1500}];
/* Campaña: 20 bases fijas de dificultad creciente; cada quinta es un jefe que entrega tropas al caer */
const CNAMES=['Playa del Desembarco','Aldea Quemada','Puente Roto','Bosque Oscuro','Fuerte Mostaza','Cantera Gris','Pantano Negro','Paso de Montaña','Refinería Vieja','Ciudadela Bigotes','Desierto Rojo','Oasis Perdido','Base Fantasma','Cañón del Eco','Fortaleza Tormenta','Glaciar Azul','Volcán Dormido','Puerto Acorazado','Torre del Trueno','Bastión del Dragón'];
const CBOSS={4:{f:'🤠',u:{marine:5,pesado:1}},9:{f:'🧔',u:{pesado:2,helicoptero:2}},14:{f:'👩‍✈️',u:{robot:2,helicoptero:3}},19:{f:'🐲',u:{dragon:2,robot:2,drey:1}}};
const CAMP=CNAMES.map((n,i)=>{const b=CBOSS[i],d=Math.round(28*Math.pow(1.36,i)*(b?1.5:1));return{n,d,l:1+Math.floor(i*.7),f:b?b.f:'🚩',boss:b,loot:{c:Math.round(60+d*1.2),f:Math.round(20+d*.25),o:i>=3?Math.round(d*.3):0,s:i>=6?Math.round(d*.15):0,e:i>=9?Math.round(d*.08):0}}});
const TECH={
 atk:{n:'Blindaje robótico',e:'🦾',d:'+25% de ataque para todas tus tropas',c:1200,x:{o:250,s:100}},
 bld:{n:'Robots constructores',e:'🤖',d:'Construcciones y mejoras 15% más rápidas',c:900,x:{s:120}},
 gold:{n:'Robots mineros',e:'⛏️',d:'+20% de oro en casas, bancos e islas',c:1000,x:{o:200,e:40}},
};
const TMAX=7,techCost=(k,l)=>{const d=TECH[k],m=(l+1)*(l+1),r={c:d.c*m};for(const q in d.x)r[q]=d.x[q]*m;return r};
const EXP={10:{c:3000,lvl:3},12:{c:9000,o:500,lvl:6},14:{c:25000,o:2000,lvl:9},16:{c:70000,o:6000,s:2500,lvl:13},18:{c:160000,o:14000,s:6000,lvl:17}};
/* población: las casas dan lugar para tropas; cada tropa ocupa según su poder */
const popOf=u=>{const d=U[u];if(!d||d.hero||/^(cmd|h)\d/.test(u))return 0;return Math.max(1,Math.round(Math.sqrt((d.atk||8)/8)))};
const casaPop=l=>10+6*(l-1);
const popCap=()=>20+S.g.reduce((s,b)=>s+(b&&b.t==='casa'&&!(b.end>Date.now()&&!b.up)?casaPop(b.l):0),0)+8*S.isl.filter(x=>x.o<0).length;
const popUsed=()=>Object.keys(S.troops).reduce((s,u)=>s+(S.troops[u]||0)*popOf(u),0)+S.queue.reduce((s,q)=>s+popOf(q.u),0);
const LM=[0,1,1.8,2.7,3.8,5.2,7,9.5,12.6];
/*ART-START*/
/* Arte isométrico: cada pieza se dibuja en una caja 100x120 cuyo rombo de base ocupa la parte de abajo. */
const sh=(h,f)=>'#'+[1,3,5].map(i=>Math.max(0,Math.min(255,Math.round(parseInt(h.substr(i,2),16)*f))).toString(16).padStart(2,'0')).join('');
const P=(u,v,z=0)=>[+(50+(u-v)*50).toFixed(1),+(70+(u+v)*25-z).toFixed(1)];
const pts=a=>a.map(p=>P(p[0],p[1],p[2]||0).join(',')).join(' ');
const pg=(a,f,x='')=>`<polygon points="${pts(a)}" fill="${f}" stroke="${f}" stroke-width=".5" stroke-linejoin="round" ${x}/>`;
const pl=(a,s,w)=>`<polyline points="${pts(a)}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const ln=(a,b,s,w)=>pl([a,b],s,w);
/* Caja con tres caras; las cajas altas llevan sombreado hacia la base y un filo de luz arriba */
const box=(u0,v0,u1,v1,z0,z1,c)=>{const L=[[u0,v1,z1],[u1,v1,z1],[u1,v1,z0],[u0,v1,z0]],R=[[u1,v0,z1],[u1,v1,z1],[u1,v1,z0],[u1,v0,z0]],big=!LO()&&z1-z0>6;
 return pg(L,c)+pg(R,sh(c,.72))+(FULL&&z1-z0>5?`<polygon points="${pts(L)}" fill="url(#tx-bw)"/><polygon points="${pts(R)}" fill="url(#tx-bw)"/>`:'')+(big?`<polygon points="${pts(L)}" fill="url(#gao)"/><polygon points="${pts(R)}" fill="url(#gao)"/>`:'')+pg([[u0,v0,z1],[u1,v0,z1],[u1,v1,z1],[u0,v1,z1]],sh(c,1.14))+(big?`<polyline points="${pts([[u0,v1,z1],[u1,v1,z1],[u1,v0,z1]])}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".6" stroke-linejoin="round"/>`:'')+(!LO()&&z1-z0>12?[.34,.67].map(k=>{const z=z0+(z1-z0)*k;return pl([[u0,v1,z],[u1,v1,z]],sh(c,.9),.45)+pl([[u1,v0,z],[u1,v1,z]],sh(c,.62),.45)}).join(''):'')};
/* Los vidrios llevan marco, cruz y brillo, y de noche se encienden (clase gw) */
const GLS={'#9bdcff':1,'#6fb4e0':1,'#7fc4ee':1,'#49b6ff':1,'#2f93da':1,'#ffd76a':1,'#f5c04a':1};
const win=(a,f)=>{if(LO()||!GLS[f])return pg(a,f);const m=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2,(p[2]+q[2])/2];
 return `<polygon class="gw" points="${pts(a)}" fill="${f}" stroke="#fdf6e3" stroke-width="1" stroke-linejoin="round"/>`+pl([m(a[0],a[1]),m(a[3],a[2])],'#fdf6e3',.6)+pl([m(a[0],a[3]),m(a[1],a[2])],'#fdf6e3',.6)+`<polygon points="${pts([a[0],m(a[0],a[1]),m(a[0],a[3])])}" fill="#fff" opacity=".35"/>`};
const wL=(u0,u1,v,z0,z1,f)=>win([[u0,v,z1],[u1,v,z1],[u1,v,z0],[u0,v,z0]],f);
const wR=(v0,v1,u,z0,z1,f)=>win([[u,v0,z1],[u,v1,z1],[u,v1,z0],[u,v0,z0]],f);
const gable=(u0,v0,u1,v1,z,h,rf,wl)=>{const vc=(v0+v1)/2;return pg([[u0,v0,z],[u1,v0,z],[u1,vc,z+h],[u0,vc,z+h]],sh(rf,1.2))+pg([[u1,v0,z],[u1,v1,z],[u1,vc,z+h]],sh(wl,.72))+pg([[u0,v1,z],[u1,v1,z],[u1,vc,z+h],[u0,vc,z+h]],rf)+(LO()?'':[.28,.52,.76].map(k=>pl([[u0,v1-(v1-vc)*k,z+h*k],[u1,v1-(v1-vc)*k,z+h*k]],sh(rf,.78),.6)).join('')+pl([[u0,v1,z],[u1,v1,z]],sh(rf,.66),1.3)+pl([[u0,vc,z+h],[u1,vc,z+h]],sh(rf,1.35),1))};
const pyr=(u0,v0,u1,v1,z,h,c)=>{const a=[(u0+u1)/2,(v0+v1)/2,z+h];return pg([[u0,v0,z],[u1,v0,z],a],sh(c,1.2))+pg([[u0,v0,z],[u0,v1,z],a],sh(c,1.1))+pg([[u0,v1,z],[u1,v1,z],a],c)+pg([[u1,v0,z],[u1,v1,z],a],sh(c,.72))};
const cyl=(u,v,r,z0,z1,c)=>{const[x,y0]=P(u,v,z0),y1=P(u,v,z1)[1],rx=+(70.7*r).toFixed(1),ry=+(35.4*r).toFixed(1),d=`M${x-rx},${y1}L${x-rx},${y0}A${rx},${ry} 0 0 0 ${x+rx},${y0}L${x+rx},${y1}Z`;return `<path d="${d}" fill="${c}"/><path d="${d}" fill="url(#gcyl)"/><ellipse cx="${x}" cy="${y1}" rx="${rx}" ry="${ry}" fill="${sh(c,1.18)}"/>`};
const dome=(u,v,r,z,c)=>{const[x,y]=P(u,v,z),rx=+(70.7*r).toFixed(1),ry=+(35.4*r).toFixed(1),d=`M${x-rx},${y}A${rx},${(rx*.85).toFixed(1)} 0 0 1 ${x+rx},${y}A${rx},${ry} 0 0 1 ${x-rx},${y}Z`;return `<path d="${d}" fill="${c}"/><path d="${d}" fill="url(#gcyl)"/>`};
const ball=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#gball)"/>`;
const shd=()=>'';
const rsh=(x,y,rx,ry)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#000" opacity=".2" style="pointer-events:none"/>`;
const flag=(u,v,z0,z1,c)=>{const[x,y]=P(u,v,z1),y0=P(u,v,z0)[1];return `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y}" stroke="#5b4630" stroke-width="1.4" stroke-linecap="round"/><polygon class="flag" points="${x},${y} ${x+13},${y+3.5} ${x},${y+8}" fill="${c}"/>`};
const GL='#9bdcff',GR='#6fb4e0';
const ART={
 casa:l=>{const h=20+7*(l-1),w=['#f3e2c0','#f8ecd4','#eef1f5'][l-1],r=['#d9532f','#3d86c9','#8e56c2'][l-1];
  let s=shd(.2,.22,.8,.78)+box(.2,.22,.8,.78,0,h,w)+wL(.44,.57,.78,0,11,'#7a4b1c');
  (l>1?[[6,13],[17,24]]:[[8,15]]).forEach(([a,b],k)=>{s+=wL(.26,.38,.78,a,b,GL)+wL(.63,.75,.78,a,b,GL)+(k?wL(.45,.56,.78,a,b,GL):'')+wR(.3,.44,.8,a,b,GR)+wR(.56,.7,.8,a,b,GR)});
  return s+gable(.2,.17,.8,.83,h,13,r,w)+box(.3,.6,.4,.68,h+6,h+19,'#a85f45')},
 granja:l=>{let s=pg([[.04,.04],[.96,.04],[.96,.96],[.04,.96]],'#a5733f')+shd(.12,.08,.52,.42,.08)+box(.12,.08,.52,.42,0,17,'#c8452e')+wL(.25,.39,.42,0,11,'#f6e7c8')+ln([.25,.42,11],[.39,.42,0],'#c8452e',1)+ln([.39,.42,11],[.25,.42,0],'#c8452e',1)+gable(.12,.04,.52,.46,17,10,'#6e4a3c','#c8452e');
  s+=l>1?cyl(.76,.22,.1,0,30,'#d4dae0')+dome(.76,.22,.1,30,'#c8452e'):cyl(.76,.26,.08,0,7,'#e8c64a');
  if(l>2)s+=cyl(.86,.42,.09,0,25,'#d4dae0')+dome(.86,.42,.09,25,'#c8452e');
  for(let k=0;k<4;k++){const v=.54+k*.105;s+=box(.08,v,.92,v+.065,0,3.5,k%2?'#8cc63f':'#ecc94b')}
  return s},
 pozo:l=>{const H=56+6*(l-1),c=[[.46,.5],[.78,.5],[.78,.82],[.46,.82]],q=(k,f)=>{const p=c[k%4];return[p[0]+(.62-p[0])*.86*f,p[1]+(.66-p[1])*.86*f,3+(H-3)*f]},st='#4a505a';
  let s=shd(.08,.08,.92,.92,.05)+box(.08,.08,.92,.92,0,3,'#a2a5ab')+cyl(.3,.3,.15,3,21+2*l,'#3b4252');
  if(l>1)s+=cyl(.72,.22,.11,3,19,'#b5533c');
  if(l>2)s+=cyl(.22,.68,.1,3,17,'#e0a72e');
  for(let k=0;k<4;k++)s+=ln(q(k,0),q(k,1),st,1.5);
  [.34,.67,1].forEach((f,j,a)=>{for(let k=0;k<4;k++)s+=ln(q(k,f),q(k+1,f),st,1.1);const g=j?a[j-1]:0;s+=ln(q(1,g),q(2,f),st,.9)+ln(q(2,g),q(3,f),st,.9)});
  const[x,y]=P(.62,.66,3);
  return s+`<line x1="${x}" y1="${y}" x2="${x}" y2="${y-H+6}" stroke="#23262b" stroke-width="2"/><rect class="pump" x="${x-3.5}" y="${y-12}" width="7" height="9" rx="1.5" fill="#f6b51e"/>`+box(.57,.61,.67,.71,H,H+4,'#d9452b')},
 banco:l=>{const H=24+5*(l-1);let s=shd(.1,.12,.9,.9)+box(.1,.12,.9,.9,0,4,'#d9d2c0')+box(.17,.18,.83,.78,4,H,'#f2ecdc')+wL(.44,.56,.78,4,15,'#5b4630')+wR(.28,.4,.83,10,H-5,'#7fc4ee')+wR(.56,.68,.83,10,H-5,'#7fc4ee');
  [.19,.33,.6,.74].forEach(u=>s+=box(u,.79,u+.07,.86,4,H,'#fffdf5'));
  const[x,y]=P(.5,.9,H+2.5);
  return s+box(.13,.14,.87,.9,H,H+5,'#e6dfcc')+pyr(.2,.21,.8,.83,H+5,9+2*l,l>2?'#e8b021':'#35a08a')+`<circle cx="${x}" cy="${y}" r="3.4" fill="#f6b51e" stroke="#a8740a" stroke-width=".8"/>`},
 cuartel:l=>{let s=pg([[.05,.05],[.95,.05],[.95,.95],[.05,.95]],'#c2a878','opacity=".8"')+shd(.14,.2,.78,.8,.1)+gable(.14,.2,.78,.8,0,30,'#718a3f','#718a3f')+pg([[.78,.4,0],[.78,.6,0],[.78,.5,19]],'#283016')+ln([.3,.8,0],[.3,.5,30],'#5d7333',1)+ln([.6,.8,0],[.6,.5,30],'#5d7333',1);
  if(l>1)[.2,.38,.56].forEach(u=>s+=box(u,.88,u+.15,.95,0,5,'#d8c69a'));
  if(l>2)s+=box(.84,.2,.95,.34,0,9,'#9a733c');
  return s+flag(.88,.82,0,42,l>2?'#f6b51e':'#d9452b')},
 fabrica:l=>{const c='#a3acb7';let s=shd(.1,.14,.9,.86)+box(.1,.14,.9,.86,0,24,c)+wL(.28,.6,.86,0,16,'#4a5460')+[4,8,12].map(z=>ln([.28,.86,z],[.6,.86,z],'#687583',.8)).join('')+wL(.68,.82,.86,9,17,'#ffd76a')+wR(.22,.4,.9,9,18,'#f5c04a')+wR(.52,.7,.9,9,18,'#f5c04a')+gable(.1,.14,.9,.5,24,8,'#6d7683',c)+gable(.1,.5,.9,.86,24,8,'#6d7683',c);
  [[.3,.32],[.52,.3],[.74,.28]].slice(0,l).forEach(([u,v],k)=>{const[x,y]=P(u,v,57);s+=cyl(u,v,.06,26,54,'#b5533c')+[0,.8,1.6].map(d=>`<circle class="smoke" cx="${x}" cy="${y}" r="4.5" fill="#f4f4f4" style="animation-delay:${d+k*.3}s"/>`).join('')});
  return s},
 hangar:l=>{const c='#93a5b8',H=34,R=.38,n=8,pt=(u,k,r=R,h=H)=>{const t=Math.PI-k*Math.PI/n;return[u,.5+r*Math.cos(t),h*Math.sin(t)]},arc=(u,r,h,k0=0)=>Array.from({length:n+1-k0},(_,k)=>pt(u,k+k0,r,h));
  let s=shd(.1,.12,.9,.88,.1);
  for(let k=0;k<n;k++)s+=pg([pt(.1,k),pt(.9,k),pt(.9,k+1),pt(.1,k+1)],sh(c,.8+.38*Math.sin(Math.PI*(k+.5)/n)));
  [.3,.5,.7].forEach(u=>s+=pl(arc(u,R,H,3),sh(c,.62),.8));
  s+=pg(arc(.9,R,H),sh(c,.66))+pg(arc(.9,.27,24),'#262c35');
  if(l>1)s+=pl(arc(.9,.27,24),'#f6c21e',1.6);
  if(l>2){const[x,y]=P(.2,.5,H+16);s+=ln([.2,.5,H],[.2,.5,H+16],'#333',1.2)+`<circle class="blink" cx="${x}" cy="${y}" r="2.4" fill="#ff3b30"/>`}
  return s},
 torre:l=>{const H=38+8*(l-1),c='#bdb7a8',m=(u,v)=>box(u,v,u+.14,v+.14,H+5,H+11,c),[x,y]=P(.5,.5,H+9);
  let s=shd(.28,.28,.72,.72,.2)+box(.28,.28,.72,.72,0,H,c);
  [[.32,.42,6],[.5,.6,14],[.36,.46,H-12],[.56,.66,H-20]].forEach(([a,b,z])=>s+=wL(a,b,.72,z,z+3.5,sh(c,.88))+wR(a,b,.72,z+4,z+7.5,sh(c,.62)));
  s+=wL(.46,.54,.72,H*.45,H*.45+9,'#2d2d2d')+wR(.46,.54,.72,H*.45,H*.45+9,'#1f1f1f')+box(.22,.22,.78,.78,H,H+5,sh(c,.9))+m(.22,.22)+m(.64,.22)+ball(x,y,6,'#555b66')+ln([.5,.5,H+10],[.98,.5,H+13],'#333840',3.6)+m(.22,.64)+m(.64,.64);
  if(l>1)s+=flag(.29,.29,H+11,H+27,l>2?'#f6b51e':'#d9452b');
  return s},
 bunker:l=>{const c='#8a9475',T=22+3*(l-1);let s=shd(.1,.1,.9,.9,.08)+box(.1,.1,.9,.9,0,13,c)+wL(.2,.8,.9,6.5,10,'#1e2318')+wR(.2,.8,.9,6.5,10,'#161a11')+box(.27,.27,.73,.73,13,T,sh(c,.92))+cyl(.5,.5,.15,T,T+6,'#5d6850')+ln([.5,.5,T+4],[1.02,.5,T+7],'#2e3328',l>1?4.4:3.4);
  if(l>2)s+=ln([.5,.5,T+4],[.5,1.02,T+7],'#2e3328',4.4);
  return s},
 mina:l=>{const c='#8b9099';let s=box(.1,.1,.9,.9,0,14,c)+pyr(.1,.1,.9,.9,14,22+3*l,sh(c,.95))+wL(.38,.62,.9,0,12,'#1c1f24')+ln([.38,.9,0],[.38,.9,13],'#8a5a2b',1.6)+ln([.62,.9,0],[.62,.9,13],'#8a5a2b',1.6)+ln([.36,.9,13],[.64,.9,13],'#8a5a2b',1.8)+box(.66,.92,.8,1,0,5,'#5b4630')+box(.68,.93,.78,.99,5,7.5,'#c9d2dc');
  if(l>1)s+=box(.14,.92,.3,1,0,6,'#c9d2dc');
  if(l>2)s+=flag(.5,.5,36+3*l,48+3*l,'#f6b51e');
  return s},
 central:l=>{const tw2=(u,v,h)=>{const[x,y]=P(u,v,h);return cyl(u,v,.13,0,h,'#cdd3da')+`<ellipse cx="${x}" cy="${y}" rx="6.5" ry="3.2" fill="#3a3f4a"/>`+[0,1.2].map(d=>`<circle class="smoke" cx="${x}" cy="${y-3}" r="5" fill="#fff" style="animation-delay:${d}s"/>`).join('')},[x,y]=P(.36,.86,9),[a,b]=P(.3,.5,38);
  return tw2(.7,.26,34)+(l>1?tw2(.84,.52,28):'')+box(.12,.34,.6,.86,0,18,'#dfe4ea')+wL(.18,.54,.86,4,14,'#2b3440')+`<polygon points="${x+1},${y-5} ${x-3},${y+1} ${x},${y+1} ${x-1.5},${y+6} ${x+3.5},${y-1} ${x+.5},${y-1}" fill="#ffd23f"/>`+box(.12,.34,.6,.86,18,20,'#f6b51e')+ln([.3,.5,20],[.3,.5,36],'#59636f',1.6)+`<circle class="blink" cx="${a}" cy="${b}" r="${l>2?4.5:3.2}" fill="#7fe3ff"/><circle cx="${a}" cy="${b}" r="1.6" fill="#fff"/>`},
 laser:l=>{const H=30+5*l,[x,y]=P(.5,.5,H+9);return box(.3,.3,.7,.7,0,6,'#59636f')+cyl(.5,.5,.13,6,H,'#8d9aab')+cyl(.5,.5,.17,H*.5,H*.5+3,'#49b6ff')+cyl(.5,.5,.18,H,H+4,'#59636f')+ball(x,y,6.5,'#c92a22')+`<circle class="blink" cx="${x}" cy="${y}" r="3" fill="#ffb3a8"/>`+ln([.5,.5,H+9],[1,.5,H+13],'#ff3b30',1.4)},
 antiaereo:l=>{const[x,y]=P(.26,.74,23);return box(.22,.22,.78,.78,0,7,'#7d8a6a')+cyl(.5,.5,.15,7,15+l,'#5d6850')+ln([.44,.5,16+l],[.74,.42,44+2*l],'#2e3328',2.8)+ln([.52,.58,16+l],[.82,.5,44+2*l],'#2e3328',2.8)+box(.42,.44,.6,.62,13+l,19+l,'#59654a')+cyl(.26,.74,.04,7,20,'#59636f')+ball(x,y,3.4,'#c9d2dc')},
 mortero:l=>cyl(.5,.5,.36,0,7,'#d8c69a')+`<ellipse cx="50" cy="88" rx="19" ry="9.5" fill="#6b5a3a"/>`+ln([.5,.5,5],[.66,.5,24+2*l],'#3b3d42',6.5)+box(.2,.78,.34,.92,0,6,'#7a4b1c')+(l>1?box(.66,.8,.8,.94,0,6,'#7a4b1c'):''),
 tesla:l=>{const H=38+3*l,[x,y]=P(.5,.5,H+5);return box(.3,.3,.7,.7,0,7,'#59636f')+cyl(.5,.5,.06,7,H,'#8d9aab')+cyl(.5,.5,.14,14,16.5,'#49b6ff')+cyl(.5,.5,.11,23,25.5,'#49b6ff')+cyl(.5,.5,.08,31,33.5,'#49b6ff')+ball(x,y,l>2?7:6,'#7fe3ff')+`<circle class="blink" cx="${x}" cy="${y}" r="3" fill="#fff"/><polyline class="blink" points="${x},${y} ${x+9},${y-4} ${x+6},${y+3} ${x+15},${y+1}" fill="none" stroke="#bff3ff" stroke-width="1.2"/>`},
 lab:l=>{const c='#e6edf4',H=20+4*(l-1),[x,y]=P(.76,.3,H+20);
  let s=box(.14,.16,.86,.84,0,H,c)+wL(.44,.56,.84,0,9,'#4a5460')+wL(.2,.8,.84,H-9,H-3,'#49b6ff')+wR(.22,.78,.86,H-9,H-3,'#2f93da')+box(.12,.14,.88,.86,H,H+2.5,'#3d86c9')+dome(.42,.5,.2,H+2.5,'#7fd6ff')+ln([.76,.3,H+2.5],[.76,.3,H+20],'#59636f',1.3)+`<circle ${l>1?'class="blink" ':''}cx="${x}" cy="${y}" r="2.3" fill="#ff3b30"/>`;
  if(l>2)s+=dome(.72,.66,.1,H+2.5,'#7fd6ff');
  return s},
 forja:l=>{const py=(u,v)=>{const[x,y]=P(u+.06,v+.06,38);return box(u,v,u+.12,v+.12,0,34,'#5c5665')+`<circle class="blink" cx="${x}" cy="${y}" r="4" fill="#ff8a1e"/><circle cx="${x}" cy="${y}" r="2" fill="#ffe066"/>`},[x,y]=P(.5,.5,36+2*l);
  let s=py(.04,.04)+box(.2,.2,.8,.8,0,18,'#4d4855')+wL(.36,.64,.8,0,13,'#ff7a1a')+wL(.42,.58,.8,0,9,'#ffd23f')+wR(.28,.42,.8,6,12,'#ff9d2e')+wR(.58,.72,.8,6,12,'#ff9d2e')+pyr(.2,.2,.8,.8,18,15+2*l,l>2?'#b8860b':'#7a2e2e')+py(.84,.04);
  if(l>1)s+=py(.04,.84);
  return s+[0,1.2].map(d=>`<circle class="smoke" cx="${x}" cy="${y}" r="4" fill="#ffb347" style="animation-delay:${d}s"/>`).join('')},
 arbol:()=>rsh(55,97,22,9)+`<rect x="46.5" y="72" width="7" height="25" rx="2" fill="#8a5a2b"/><rect x="50" y="72" width="3.5" height="25" fill="#6e4520"/>`+ball(37,66,14,'#4fa83a')+ball(63,66,14,'#3f9431')+ball(50,52,18,'#5cba45')+ball(50,70,12,'#4aa238'),
 pino:()=>{let s=rsh(55,97,20,8)+`<rect x="47" y="84" width="6" height="13" fill="#7a4e25"/>`;[[50,88,21],[34,70,17],[18,52,13]].forEach(([t,b,w])=>{s+=`<polygon points="50,${t} ${50-w},${b} 50,${b+w*.4}" fill="#3f9a48"/><polygon points="50,${t} ${50+w},${b} 50,${b+w*.4}" fill="#2c7a3a"/>`});return s},
 fuente:()=>rsh(54,96,34,15)+cyl(.5,.5,.4,0,8,'#cfc9bb')+`<ellipse cx="50" cy="87" rx="23.3" ry="11.7" fill="#4db8e8"/><ellipse cx="44" cy="84.5" rx="10" ry="4" fill="#b5e9ff" opacity=".6"/>`+cyl(.5,.5,.06,8,26,'#ddd7ca')+cyl(.5,.5,.15,26,29,'#cfc9bb')+`<ellipse cx="50" cy="66" rx="8.4" ry="4.2" fill="#4db8e8"/>`+['M50,65Q37,48 30,84','M50,65Q63,48 70,84','M50,65L50,52'].map(d=>`<path class="jet" d="${d}" fill="none" stroke="#d6f4ff" stroke-width="1.7" stroke-linecap="round" stroke-dasharray="4 5"/>`).join(''),
 estatua:()=>{const c='#9c9b93';return shd(.26,.3,.74,.7,.18)+box(.26,.3,.74,.7,0,8,'#7d7c75')+box(.34,.36,.66,.62,8,54,c)+wL(.38,.47,.62,36,41,'#35342f')+wL(.53,.62,.62,36,41,'#35342f')+box(.34,.62,.66,.66,41,46,sh(c,1.05))+box(.455,.62,.545,.68,24,40,c)+wL(.42,.58,.62,15,17.5,'#4a4943')},
};

/* corre un ataque completo con semilla fija (el cliente repite exactamente lo mismo para mostrarlo) */
function pvRng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function simPvp(army,spec,mul,seed){spec=JSON.parse(JSON.stringify(spec));army=JSON.parse(JSON.stringify(army));const real=Math.random;Math.random=pvRng(seed);try{const b=mkBattle(army,spec,mul);b.pvp=1;let g=0;while(!b.over&&g++<20000)stepBattle(b,.05);
 const hq=b.E[0],st=b.E.filter(x=>x.side===1&&x.st),dead=st.filter(x=>x.hp<=0).length,surv={};for(const x of b.E)if(x.side===0)surv[x.kind]=(surv[x.kind]||0)+(x.hp>0?Math.ceil(x.hp/x.uhp-1e-9):0);
 return{win:b.over===1,time:Math.round(b.time*100)/100,steps:g,hqHp:Math.max(0,Math.round(hq.hp)),destroyed:st.length?dead/st.length:0,surv}}finally{Math.random=real}}
export {U,B,DEFS,mkBattle,stepBattle,layoutSpec,simPvp,pvRng,GB,BTMAX};
