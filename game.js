(()=>{
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
/* ---------- imágenes pintadas de los edificios (assets/clave_nivel.png) ---------- */
const PIMG=window.__IMG.PIMG;
const pimgLv=(k,l)=>{const v=PIMG[k],n=Object.keys(v).length;return v[n>=3?(l<=2?1:l<=5?2:3):Math.min(n,l>=3?2:1)]||v[1]};
const PSC={arbol:.72,pino:.72,fuente:.85,estatua:.85};
const pimgTag=(k,l)=>{const s=PSC[k]||1,im=`<image href="${pimgLv(k,l)}" x="-12.45" y="-2.1" width="125" height="125"/>`;return s===1?im:`<g transform="translate(${50*(1-s)},${120*(1-s)}) scale(${s})">${im}</g>`};
for(const k in PIMG)if(ART[k])ART[k]=lv=>pimgTag(k,lv>=3?6:lv>=2?3:1);
for(let n=1;n<=3;n++)ART['civil'+n]=PIMG.civil?()=>pimgTag('civil',[1,3,6][n-1]):ART.casa;
/* ---------- entorno pintado: texturas, vegetación, islas chicas e íconos (assets/entorno) ---------- */
const ENV=window.__IMG.ENV;
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

/* ---------- hoja inferior ---------- */
let sheet={kind:null};
let NAV=[],CUR=null,PEND=null,NAVING=0;
function navW(f){return function(...a){const me={f,a};PEND=me;try{return f(...a)}finally{if(PEND===me)PEND=null}}}
function navBtn(){const b=$('#shback');if(b)b.style.visibility=NAV.length?'visible':'hidden'}
function resumeNav(r){if(sheet.kind||modalOpen||PL||MV!=null||BT)return;const st=[...r.st],top=st.pop();NAVING=1;try{top.f(...top.a)}finally{NAVING=0}if(sheet.kind){NAV=st;navBtn()}}
function goBack(){const p=NAV.pop();if(!p){closeSheet();return}NAVING=1;try{p.f(...p.a)}finally{NAVING=0}navBtn()}
const SCR={};
/* barra fija de categorías: en las pantallas largas, tocás una y salta ahí */
function catNav(kind){const bd=$('#shbody');if(kind!=='troops'&&kind!=='select'&&kind!=='build')return;const cs=[...bd.querySelectorAll('.cat')].filter(c=>c.dataset.nav!=='0');if(cs.length<3)return;
 const nv=document.createElement('div');nv.className='catnav';cs.forEach((c,i)=>{c.id='cat'+i;const b=document.createElement('button');b.textContent=c.textContent.replace(/[·✓].*$/,'').trim().split(/\s+/).slice(0,2).join(' ');b.onclick=e=>{e.stopPropagation();bd.scrollTo({top:c.offsetTop-nv.offsetHeight-6,behavior:'smooth'})};nv.appendChild(b)});bd.prepend(nv)}
function openSheet(kind,title,html,extra){const me=PEND||{k:kind,f:openSheet,a:[kind,title,html,extra]};PEND=null;me.k=kind;
 if(!NAVING){if(sheet.kind&&sheet.kind!==kind&&CUR&&CUR.k!==kind){const j=NAV.findIndex(x=>x.k===kind);if(j>=0)NAV.length=j;else{NAV.push(CUR);if(NAV.length>12)NAV.shift()}}else if(!sheet.kind)NAV=[]}
 CUR=me;navBtn();if(sheet.kind)SCR[sheet.kind]={y:$('#shbody').scrollTop,t:Date.now()};const sv=SCR[kind],st=sheet.kind===kind?$('#shbody').scrollTop:sv&&Date.now()-sv.t<180000?sv.y:0;sheet=Object.assign({kind},extra||{});$('#shtitle').innerHTML=title;$('#shbody').innerHTML=html;catNav(kind);$('#shbody').scrollTop=st;$('#sheet').dataset.k=kind;if(!$('#sheet').classList.contains('on'))playS('open',.3);$('#sheet').classList.add('on');$('#shade').classList.add('on');document.documentElement.classList.add('menu-on');live()}
let LASTN=null;
function closeSheet(){if(sheet.kind)SCR[sheet.kind]={y:$('#shbody').scrollTop,t:Date.now()};if(sheet.kind&&CUR)LASTN={st:[...NAV,CUR],t:Date.now()};if(sheet.kind)playS('close',.25);sheet={kind:null};NAV=[];CUR=null;$('#sheet').classList.remove('on');$('#shade').classList.remove('on');document.documentElement.classList.remove('menu-on')}
$('#shclose').onclick=()=>NAV.length?goBack():closeSheet();$('#shback').onclick=goBack;$('#shade').onclick=closeSheet;
$('#shbody').addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(a)act(a.dataset.a,a.dataset.v)});

function bLine(d){
 if(d.prod){const k=Object.keys(d.prod)[0];return `+${d.prod[k]}${RES[k]} cada ${d.per}s`}
 if(d.def)return `🛡️ +${d.def} defensa`;
 if(d.unit)return `Entrena: ${U[d.unit].n}`;
 return `+${d.xp}⭐`;
}
function openBuild(){
 const cats=[['Producción',['casa','granja','pozo','mina','central','banco','recolector']],['Militar',['cuartel','fabrica','hangar','lab','forja','astillero','genetico']],['Defensa',['muro','trampa','torre','antiaereo','bunker','mortero','tesla','laser','llamat','tfranco','costa','escudo']],['Decoración',['arbol','pino','fuente','estatua']]];
 let h='<button class="btn gold" data-a="shop" style="margin:0 0 10px">🚢 Mercader: ofertas del momento</button>'+terrHTML();
 for(const[cn,list]of cats){
  h+=`<div class="cat">${cn}</div><div class="grid">`;
  for(const k of list){const d=B[k],lock=S.lvl<d.lvl;
   h+=`<div class="card ${lock?'lock':''}" data-a="build" data-v="${k}"><div class="ce">${svgArt(k,1)}</div><div class="cn">${d.n}</div>${lock?`<div class="cl">🔒 Nivel ${d.lvl}</div>`:`<div class="cc">${costHTML(d.cost)}</div><div class="cs">${bLine(d)}${d.t?' · ⏱'+Math.round(d.t*bm())+'s':''}</div>`}</div>`}
  h+='</div>';
 }
 openSheet('build','🔨 Construir',h);
}
const stSig=b=>b?[b.t,b.l,isCons(b),b.up?1:0,ready(b)].join():'x';
function openInfo(i){
 const b=S.g[i];if(!b){closeSheet();return}
 const d=B[b.t];
 let h=`<div class="ihead"><div class="ie">${svgArt(b.t,b.l)}</div><div><div class="in">${d.n}${d.max?`<small>Nv ${b.l}/${d.max}</small>`:''}</div><div class="id">${d.d}</div></div></div>`;
 if(isCons(b)){
  h+=`<div class="istat">${b.up?'⬆️ Mejorando':'🚧 En construcción'}… faltan <b data-until="${b.end}"></b></div><button class="btn gold" data-a="rush">⚡ Terminar ya · ${RES.c}<span data-rush="${i}"></span></button>`;
 }else{
  if(b.t==='recolector')h+=`<div class="istat">🛸 Junta la producción de tu base mientras no jugás, hasta <b>${RH[b.l]} h</b>${b.l<7?` · a nivel ${b.l+1}: ${RH[b.l+1]} h`:''}</div>`;if(d.prod)h+=`<div class="istat">Produce <b>${costPlain(prodOf(b))}</b> cada ${d.per}s<br>Listo para cobrar en <b data-until="${b.lc+d.per*1000}"></b></div>`+(b.w?'<div class="istat">🤖 Robot obrero trabajando: +50%</div>':`<button class="btn" data-a="worker">🤖 Asignar robot obrero (+50%) · ${costHTML(WCOST)}</button>`);
  if(d.def)h+=`<div class="istat">Defensa: <b>🛡️${Math.round(d.def*LM[b.l])}</b></div>`;
  if(d.unit)h+=`<div class="istat">Entrena: <b>${U[d.unit].n}</b> · velocidad x${speed(d.unit)}</div><button class="btn" data-a="troops">🎖️ Ir a entrenar</button>`;
  if(b.t==='lab')h+=`<button class="btn gold" data-a="tech">🔧 Mejoras robóticas</button>`;
  if(d.max===7&&b.l===7&&S.lvl<12)h+=`<p class="small">🔒 El nivel 8 de los edificios se desbloquea cuando llegues al nivel 12.</p>`;
  if(d.max&&b.l<maxL(d)){const c=upCost(b);h+=`<button class="btn gold" data-a="up">⬆️ Mejorar a nivel ${b.l+1} · ${costHTML(c)} · ⏱${Math.round(d.t*(b.l+1)*bm())}s</button>`}
  else if(d.max)h+=`<div class="istat">⭐ ¡Nivel máximo!</div>`;
 }
 h+=`<div class="row2"><button class="btn" data-a="mv">✋ Mover</button><button class="btn red" data-a="sell">🗑️ Vender ${sellVal(b)?'+'+RES.c+sellVal(b):''}</button></div>`;
 openSheet('info',d.n,h,{i,sig:stSig(b)});
}
/* ---------- tropas: tipos, niveles y ventajas ---------- */
const CI={inf:'🎖️',veh:'🚙',air:'🚁',mec:'🤖',def:'🗼'},CN={inf:'infantería',veh:'vehículos',air:'aéreos',mec:'robots',def:'defensas'};
const UVC={inf:'29 55 44 44',veh:'10 48 80 80',air:'6 24 88 88',mec:'24 50 52 52'};
const ue=u=>typeof ENV!=='undefined'&&ENV['u_'+u]?`<img class="ui up" src="${ENV['u_'+u]}" alt="">`:`<svg class="ui" viewBox="${UVC[U[u].cls]}">${spr(u,S.ulv[u],2)}</svg>`;
const uMax=()=>S.lvl>=18?7:S.lvl>=14?6:5;
const ulm=u=>1+.2*(S.ulv[u]-1);                                   // cada nivel de tropa: +20% de vida y daño
const rating=u=>U[u].atk*ulm(u)*(1+.25*S.tech.atk);
const maxB=b=>S.g.reduce((m,x)=>x&&x.t===b&&done(x)?Math.max(m,x.l):m,0);
const ulCost=u=>mult(U[u].cost,8*S.ulv[u]);
function vsTxt(d){const s=[],w=[];for(const k in d.vs){if(d.vs[k]>1.15)s.push(CI[k]);else if(d.vs[k]<.85)w.push(CI[k])}return(s.length?' · 💪'+s.join(''):'')+(w.length?' · 👎'+w.join(''):'')+(d.air?'':' · no ataca aéreos')}
let qOpen=false;
function qHTML(){
 if(!S.queue.length)return `<div class="qline qempty">⏳ Nada en entrenamiento<span class="qpop">👥 ${popUsed()}/${popCap()}</span></div>`;
 const t=now(),q0=S.queue[0],d0=U[q0.u],dur=d0.t*1000/(speed(q0.u)||1),pc=Math.max(0,Math.min(100,100-(q0.end-t)/dur*100));
 const last=S.queue[S.queue.length-1].end;
 let h=`<div class="qline" data-a="qtog">${ue(q0.u)}<div class="qmid"><div class="qtxt"><b>${S.queue.length} en cola</b> · todo en <span data-until="${last}">${ft(last-t)}</span></div><div class="qbar"><i style="width:${pc}%"></i></div></div><span class="qpop">👥 ${popUsed()}/${popCap()}</span><span class="qarr">${qOpen?'▲':'▼ editar'}</span></div>`;
 if(qOpen){
  const g=[];for(const q of S.queue){const l=g[g.length-1];if(l&&l.u===q.u){l.n++}else g.push({u:q.u,n:1})}
  h+='<div class="qgrid">'+g.map((x,k)=>`<div class="qi">${ue(x.u)}<span>×${x.n}</span><button class="qx" data-a="qdelg" data-v="${k}" title="Sacar uno">−</button></div>`).join('')+`<button class="qi qclr" data-a="qclr">🗑️ Vaciar</button></div>`;
 }
 return h;
}
function qFix(){let t=now();for(let i=0;i<S.queue.length;i++){const q=S.queue[i];if(i===0&&q._keep){t=q.end;continue}t=Math.max(t,now())+U[q.u].t*1000/(speed(q.u)||1);q.end=t}}
function qRemove(idx){
 const q=S.queue[idx];if(!q)return;const c=U[q.u].cost;for(const k in c)S[k]+=c[k];
 const keep=idx!==0&&S.queue[0];if(keep)keep._keep=1;S.queue.splice(idx,1);qFix();if(keep)delete keep._keep;
}
function qDelGroup(k){let n=-1,pos=0;for(let i=0;i<S.queue.length;i++){if(i===0||S.queue[i].u!==S.queue[i-1].u)n++;if(n===k)pos=i;else if(n>k)break}
 qRemove(pos);// saca el último de ese grupo
}
function openTroops(){
 let h=`<div class="row3"><button class="btn gold" data-a="cmd">🎖️ Héroes</button><button class="btn gold" data-a="res">🔬 Investigación</button><button class="btn gold" data-a="ars">🧰 Arsenal</button></div><div class="qbox"><div id="qlist"></div></div><p class="small" style="margin-top:0">💪 fuerte contra · 👎 débil contra · ${Object.keys(CN).map(k=>CI[k]+' '+CN[k]).join(' · ')}</p>`,last='';
 for(const u in U){
  if(U[u].hero)continue;
  const d=U[u],bd=B[d.b],sp=speed(u),l=S.ulv[u],need=d.bl||1,ok=sp&&maxB(d.b)>=need;
  if(d.b!==last){last=d.b;h+=`<div class="cat">${bd.e} ${bd.n}</div>`}
  h+=`<div class="trow"><div class="te">${ue(u)}</div><div class="tinfo"><b>${d.n}</b> <span class="tag" ${l>=6?'style="background:linear-gradient(#ffd95c,#d48f10);color:#2b1d0e"':''}>${l>=6?'⭐ Élite '+l:'Nv '+l}</span> <span class="tc">×<span data-tr="${u}">${S.troops[u]}</span></span> <span class="tq" data-tq="${u}"></span><div class="small">${CI[d.cls]} ⚔️${Math.round(d.dmg*ulm(u)*(1+.25*S.tech.atk))} ❤️${Math.round(d.hp*ulm(u))} 🎯${d.rng}${vsTxt(d)}${brTxt(u)}${eqTxt(u)}</div><div class="small">${costHTML(d.cost)}${sp?' · ⏱'+Math.ceil(d.t/sp)+'s':''}${popOf(u)?' · 👥'+popOf(u):''}${ok&&l<5?` · subir a Nv ${l+1}: ${costHTML(ulCost(u))}`:''}</div></div>`;
  h+=ok?`<div class="tbtns"><button class="btn sm" data-a="train" data-v="${u}">+1</button><button class="btn sm gold" data-a="train5" data-v="${u}">+5</button>${l<uMax()?`<button class="btn sm green" data-a="ulv" data-v="${u}">⬆️ Nv${l>=5?' élite':''}</button>`:''}</div>`:`<div class="small lockt">Necesitás ${bd.e} ${bd.n}${need>1?' nivel '+need:''}${S.lvl<bd.lvl?` (jugador nivel ${bd.lvl})`:''}</div>`;
  h+='</div>';
 }
 h+=fusHTML()+heroHTML()+`<button class="btn" data-a="tech" style="margin:0 0 4px">🔧 Mejoras robóticas</button><p class="small">Cada tropa suma ⚔️ poder de ataque y la mitad como 🛡️ defensa mientras está en tu base.</p>`;
 openSheet('troops','🎖️ Tropas',h);
}
function train(u,n){
 const d=U[u],sp=speed(u);if(!sp||maxB(d.b)<(d.bl||1))return;if(d.max&&S.troops[u]+S.queue.filter(q=>q.u===u).length+n>d.max){toast(`Solo podés tener ${d.max} ${d.n}`);return}let k=0;
 const pu=popOf(u);let room=popCap()-popUsed();
 for(;k<n;k++){if(!can(d.cost)||S.queue.length>=40||room<pu)break;room-=pu;pay(d.cost);const last=S.queue.length?S.queue[S.queue.length-1].end:now();S.queue.push({u,end:Math.max(now(),last)+d.t*1000/sp})}
 if(!k)toast(S.queue.length>=40?'La cola está llena':room<pu?`👥 No hay lugar: construí o mejorá casas (o expandí la isla) para más población`:'No te alcanzan los recursos 😕');else if(k<n&&room<pu)toast(`👥 Población llena: entrenaste ${k}`);
 hud();save();if(sheet.kind==='troops'&&$('#qlist')){$('#qlist')._s='';live()}else openTroops();
}
function upUnit(u){
 const d=U[u],l=S.ulv[u];if(l>=uMax()){if(l<7)toast(`🎖️ El nivel ${l+1} de tropas (élite) se desbloquea en el nivel ${l===5?14:18}`);return}
 if(maxB(d.b)<l+1){toast(`Necesitás ${B[d.b].n} nivel ${l+1}`);return}
 if(!can(ulCost(u))){toast('No te alcanza para subir el nivel 😕');return}
 pay(ulCost(u));S.ulv[u]++;toast(`${d.n} subió a nivel ${l+1}`);addXP(30*l);hud();save();branchPick(u);
}
function openAttack(){
 let h=`<p class="small" style="margin-top:0">Tu poder de ataque: <b>⚔️${armyPow(S.troops)}</b>.${S.streak?` 🔥 Racha de ${S.streak}: +${S.streak*10}% de botín.`:''} Dificultad: ${dif().n}. Los rivales también suben de nivel con el tiempo, y cuando les ganás reconstruyen su base más fuerte.</p>`;
 h+='<div class="cat">⚔️ Bases enemigas</div>';
 S.enemies.forEach((e,i)=>{h+=`<div class="erow"><div class="ef">${e.f}</div><div class="einfo"><b>${e.n}</b> <span class="tag">Nv ${e.lvl}</span><div class="small">🛡️${eDef(e)} · Botín ${costPlain(eLoot(e))} · ${12*e.lvl}⭐</div></div><button class="btn sm" data-a="visit" data-v="${i}" title="Visitar su base">👁️</button><button class="btn sm red" data-a="enemy" data-v="${i}">Atacar</button></div>`});
 const tb=S.atab||'riv',kw=krState(),dot=s=>s?' <i class="tdot"></i>':'';
 const tabs=[['riv','⚔️ Rivales',revOn&&S.rev],['camp','📖 Campaña',RBOSS.some((r,i)=>S.lvl>=r.l&&!(S.rbd||{})[i])],['ev','🎉 Eventos',kw||(S.boss&&S.boss.hp>0)],['conq','🏝️ Conquista',S.exp.length]];
 let c='';
 if(tb==='riv')c=revBtn()+h+playersHTML()+rankHTML();
 else if(tb==='camp')c=`<p class="small" style="margin-top:0">La historia y la campaña: rivales con jefes únicos y premios grandes.</p><button class="btn gold" data-a="storyo">📖 Historia: capítulos con diálogos</button>`+campBtn()+rbHTML();
 else if(tb==='ev')c=`<p class="small" style="margin-top:0">Eventos por tiempo limitado y desafíos.</p>`+krBtn()+bossBtn()+tourBtn()+`<button class="btn red" data-a="tdgo">🗼 Defensa de la torre${S.tdb?' · récord '+S.tdb+' oleadas':''}${now()<(S.tdn||0)?' · en '+ft(S.tdn-now()):''}</button><p class="small">En vivo: entre oleadas ponés muros, minas y torres donde quieras.</p><button class="btn gold" data-a="siege">🏰 Asedio: aguantá oleadas en tu base</button>`;
 else c=`<p class="small" style="margin-top:0">Islas que dan oro, regiones del mundo y tu clan.</p><div class="row2"><button class="btn gold" data-a="world">🌍 Mapa del mundo</button><button class="btn gold" data-a="clan">🛡️ Clan</button></div>`+islListHTML();
 openSheet('attack','⚔️ Atacar',`<div class="atabs">${tabs.map(([k,n,d])=>`<button class="${k===tb?'on':''}" data-a="atab" data-v="${k}">${n}${dot(d)}</button>`).join('')}</div>`+c);
}
/* ---------- preparar el ataque ---------- */
let SEL={};
const seedOf=(k,l)=>[...String(k)].reduce((a,c)=>(a*31+c.charCodeAt(0))|0,l*977+13);
function openSelect(ei,keep){
 const e=target(ei);if(!keep){SEL={};for(const u in U)SEL[u]=S.troops[u]}
 const D=eDef(e),P=armyPow(SEL),sp=e.spec||enemySpec(D,e.lvl,seedOf(ei,e.lvl)),dc={};sp.defs.forEach(d=>dc[d.k]=(dc[d.k]||0)+1);
 let h=`<div class="ihead"><div class="ie">${fortSvg()}</div><div><div class="in">${e.f} ${e.n} <small>Nv ${e.lvl}</small></div><div class="id">Poder 🛡️${D} · Botín ${costPlain(eLoot(e))}</div></div></div>`;
 h+=`<div class="istat"><b>Lo que te espera</b><div class="small">Defensas: ${Object.keys(dc).map(k=>DEFS[k].n+' ×'+dc[k]).join(' · ')||'ninguna'}</div><div class="small">Tropas: ${Object.keys(sp.units).map(k=>CI[U[k].cls]+' '+U[k].n+' ×'+sp.units[k]).join(' · ')||'ninguna'}</div></div><div class="cat" data-nav="0">Elegí tus tropas</div>`;
 let any=false,lastB='';
 if(Object.keys(U).some(u=>S.troops[u]))h+=`<div class="selq"><button class="btn sm" data-a="selq" data-v="all">✅ Todas</button><button class="btn sm" data-a="selq" data-v="half">½ La mitad</button><button class="btn sm" data-a="selq" data-v="none">✖ Ninguna</button></div>`;
 for(const u in U){if(!S.troops[u])continue;any=true;
  {const bk=U[u].fus||U[u].hero?'fus':U[u].b;if(bk!==lastB){lastB=bk;h+=`<div class="cat">${bk==='fus'?'🧬 Especiales':(B[bk]?B[bk].e+' '+B[bk].n:'Otras')}</div>`}}
  h+=`<div class="selrow"><div class="te">${ue(u)}</div><div style="flex:1;min-width:0"><b>${U[u].n}</b><div class="small">${SEL[u]} de ${S.troops[u]}</div></div><button class="btn sm" data-a="sm" data-v="${u}">−</button><button class="btn sm" data-a="sp" data-v="${u}">+</button><button class="btn sm" data-a="sa" data-v="${u}">${SEL[u]===S.troops[u]?'Ninguno':'Todos'}</button></div>`}
 if(!any)h+=`<p>No tenés tropas todavía. Construí un ⛺ Cuartel y entrená soldados.</p><button class="btn" data-a="troops">🎖️ Ir a Tropas</button>`;
 else{
  const r=P/D,[lab,col]=P===0?['—','#999']:r>=1.5?['Fácil 😎','#3f9a2f']:r>=1.1?['Parejo 😬','#f6b51e']:r>=.85?['Arriesgado 😰','#f08a24']:['Muy difícil 😱','#d9452b'];
  {const rc=rations(SEL);if(rc)h+=`<div class="small" style="margin:0 0 6px">🍗 Raciones para este ataque: <b style="color:${S.f<rc?'#c9301a':'inherit'}">${fmt(rc)}</b> de comida (tenés ${fmt(Math.floor(S.f))})</div>`}
  h+=`<div class="istat">Tu poder <b>⚔️${P}</b> contra <b>🛡️${D}</b> → <b style="color:${col}">${lab}</b><div class="meter"><i style="width:${Math.min(100,r/2*100)}%;background:${col}"></i></div><div class="small">El resultado también depende de qué tropas mandás contra qué defensas.</div></div><div class="stickgo"><div class="small">⚔️${fmt(P)} contra 🛡️${fmt(D)} · <b style="color:${col}">${lab}</b></div><div class="row2"><button class="btn red" data-a="golive" ${P?'':'disabled'}>👁️ Batalla en vivo</button><button class="btn" data-a="go" ${P?'':'disabled'}>⚡ Resultado rápido</button></div></div>`;
 }
 if(any&&e.isl!=null&&!S.exp.some(x=>x.i===e.isl))h=`<button class="btn" data-a="exped">⛵ Expedición en tiempo real · ${fh(expDur(e.isl))} · tropas +20% · botín ×1,5</button><p class="small">Las tropas elegidas zarpan ahora y la isla se conquista al llegar. Un rival puede mandar refuerzos mientras tanto.</p>`+h;
 openSheet('select','⚔️ Preparar ataque',h,{ei});
}
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
/* tropas un poco más grandes que antes (los edificios pintados son grandes) y cámara que sigue a tu ejército en el celular */
const UNS=1.35;
function btCam(b){const sc=$('#btscene');if(!sc||!b||b.over||(b.dep&&!b.go)||sc.clientWidth>=700)return;const V=BV;if(performance.now()-(V.userT||0)<2500)return;
 let n=0,sx=0,sy=0;for(const x of b.E)if(x.side===0&&x.hp>0&&!x.off&&!x.st){const[px,py]=bpos(x.x,x.y);sx+=px;sy+=py;n++}
 if(!n)return;const hq=b.E[0],[hx,hy]=bpos(hq.x,hq.y),z=bz||1,cx=(sx/n*.7+hx*.3)*z,cy=(sy/n*.7+hy*.3)*z;
 const tl=Math.max(0,Math.min(sc.scrollWidth-sc.clientWidth,cx-sc.clientWidth/2)),tt=Math.max(0,Math.min(sc.scrollHeight-sc.clientHeight,cy-sc.clientHeight/2));
 sc.scrollLeft+=(tl-sc.scrollLeft)*.08;sc.scrollTop+=(tt-sc.scrollTop)*.08}
['pointerdown','wheel','touchstart'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target.closest&&e.target.closest('#btscene'))BV.userT=performance.now()},{passive:true,capture:true}));
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
  const us=x.st||x.krk?1:UNS,dx=px+(-btw/2+vb[0]*k)*us,dy=py+(-btw*.95+vb[1]*k)*us-bob,dw=vb[2]*k*us,dh=vb[3]*k*us;ctx.drawImage(c,dx,dy,dw,dh);ctx.globalAlpha=1;
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
 drawBattle(dt);btCam(b);
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
/* ---------- misiones ---------- */
const MS=[
 {t:'Tocá la casa con la burbuja 💰 para cobrar',ok:()=>S.stats.col>=1,r:{c:50},x:10},
 {t:'Construí 3 casas 🏠',ok:()=>cnt('casa')>=3,p:()=>[cnt('casa'),3],r:{c:100},x:20},
 {t:'Construí un cuartel ⛺',ok:()=>cnt('cuartel')>=1,r:{c:50,f:40},x:20},
 {t:'Entrená 5 soldados 🎖️',ok:()=>(S.stats.byU.soldado||0)>=5,p:()=>[S.stats.byU.soldado||0,5],r:{c:100,f:30},x:25},
 {t:'Ganá tu primera batalla ⚔️',ok:()=>S.stats.won>=1,r:{c:150},x:30},
 {t:'Construí 2 granjas 🌾',ok:()=>cnt('granja')>=2,p:()=>[cnt('granja'),2],r:{c:100},x:20},
 {t:'Llegá a nivel 2',ok:()=>S.lvl>=2,r:{c:200},x:0},
 {t:'Construí un pozo de petróleo ⛽',ok:()=>cnt('pozo')>=1,r:{c:100,o:50},x:30},
 {t:'Construí una torre de defensa 🗼',ok:()=>cnt('torre')>=1,r:{c:150},x:30},
 {t:'Mejorá un edificio a nivel 2',ok:()=>S.g.some(b=>b&&b.l>=2),r:{c:200},x:40},
 {t:'Ganá 5 batallas',ok:()=>S.stats.won>=5,p:()=>[S.stats.won,5],r:{c:300,o:50},x:50},
 {t:'Llegá a nivel 3',ok:()=>S.lvl>=3,r:{c:300,o:100},x:0},
 {t:'Construí una fábrica de tanques 🏭',ok:()=>cnt('fabrica')>=1,r:{c:200,o:100},x:50},
 {t:'Entrená 3 tanques',ok:()=>(S.stats.byU.tanque||0)>=3,p:()=>[S.stats.byU.tanque||0,3],r:{c:300,o:100},x:60},
 {t:'Derrotá a un enemigo de nivel 4 o más',ok:()=>S.stats.maxBeat>=4,r:{c:500,o:150},x:80},
 {t:'Defendé tu base de 3 ataques 🛡️',ok:()=>S.stats.def>=3,p:()=>[S.stats.def,3],r:{c:400},x:60},
 {t:'Llegá a nivel 5',ok:()=>S.lvl>=5,r:{c:600,o:200},x:0},
 {t:'Construí un hangar 🛫',ok:()=>cnt('hangar')>=1,r:{c:500,o:200},x:100},
 {t:'Entrená 2 helicópteros 🚁',ok:()=>(S.stats.byU.helicoptero||0)>=2,p:()=>[S.stats.byU.helicoptero||0,2],r:{c:600,o:200},x:120},
 {t:'Derrotá a un enemigo de nivel 8 o más',ok:()=>S.stats.maxBeat>=8,r:{c:1500,o:500},x:200},
 {t:'Ganá 30 batallas',ok:()=>S.stats.won>=30,p:()=>[S.stats.won,30],r:{c:3000,o:800},x:300},
 {t:'Conquistá una isla 🏝️ (tocala en el mar o entrá a Atacar)',ok:()=>S.isl.some(x=>x.o<0),r:{c:500},x:60},
 {t:'Comprá más terreno para tu isla 🗺️',ok:()=>N>10,r:{c:800},x:80},
 {t:'Construí un laboratorio de robótica 🔬',ok:()=>cnt('lab')>=1,r:{c:600,o:200},x:80},
 {t:'Investigá una mejora robótica 🔧',ok:()=>S.tech.atk+S.tech.bld+S.tech.gold>=1,r:{c:800,o:200},x:80},
 {t:'Fabricá 2 robots de combate 🤖',ok:()=>(S.stats.byU.robot||0)>=2,p:()=>[S.stats.byU.robot||0,2],r:{c:1000,o:300},x:120},
 {t:'Tené 3 islas al mismo tiempo 🏝️',ok:()=>S.isl.filter(x=>x.o<0).length>=3,p:()=>[S.isl.filter(x=>x.o<0).length,3],r:{c:2000,o:500},x:150},
 {t:'Construí la forja de dragones 🐉',ok:()=>cnt('forja')>=1,r:{c:2000,o:800},x:200},
 {t:'Fabricá un dragón robótico 🐉',ok:()=>(S.stats.byU.dragon||0)>=1,r:{c:3000,o:1000},x:300},
 {t:'Construí una mina de acero ⛏️',ok:()=>cnt('mina')>=1,r:{c:400,s:80},x:60},
 {t:'Construí una central de energía ⚡',ok:()=>cnt('central')>=1,r:{c:600,e:60},x:80},
 {t:'Hundí un barco pirata 🏴‍☠️',ok:()=>(S.stats.pir||0)>=1,r:{c:800,s:100},x:100},
 {t:'Mejorá un edificio a nivel 5',ok:()=>S.g.some(b=>b&&b.l>=5),r:{c:2000,s:300},x:150},
 {t:'Mejorá un edificio a nivel 7 ⭐',ok:()=>S.g.some(b=>b&&b.l>=7),r:{c:6000,s:800,e:400},x:400},
];
function openMis(){
 const m=MS[S.mi];let h='';
 if(!m)h='<div class="done">🏆 ¡Completaste todas las misiones!<br>Seguí conquistando bases.</div>';
 else{const ok=m.ok(),p=m.p?m.p():null;
  h=`<div class="mcard"><div class="mnum">MISIÓN ${S.mi+1} DE ${MS.length}</div><div class="mt">${m.t}</div>${p?`<div class="pb"><i style="width:${Math.min(100,p[0]/p[1]*100)}%"></i></div><div class="small">${Math.min(p[0],p[1])} / ${p[1]}</div>`:''}<div class="small" style="margin-top:6px">Premio: <b>${costPlain(m.r)}${m.x?' · +'+m.x+'⭐':''}</b></div>${ok?'<button class="btn gold" data-a="claim">🎁 Cobrar premio</button>':'<div class="small" style="margin-top:6px">En progreso…</div>'}</div>`}
 const st=S.stats;
 h+=`<div class="stats"><div><b>${st.won}</b>Batallas ganadas</div><div><b>${st.lost}</b>Batallas perdidas</div><div><b>${st.def}</b>Ataques defendidos</div><div><b>${st.trained}</b>Tropas entrenadas</div></div>`;
 openSheet('mis','📜 Misiones',wheelBtn()+leagueHTML()+dmHTML()+h+achHTML());
}

/* ---------- acciones ---------- */
function act(a,v){
 const i=sheet.i,b=i!=null?S.g[i]:null;
 switch(a){
  case 'build':{const d=B[v];if(v==='recolector'&&S.g.some(q=>q&&q.t==='recolector')){toast('Solo podés tener un Recolector');return}if(S.lvl<d.lvl){toast(`Se desbloquea en nivel ${d.lvl}`);return}if(!can(d.cost)){toast('No te alcanza 😕');return}PL=v;MV=null;closeSheet();setMode();break}
  case 'up':{const d=B[b.t],c=upCost(b);if(b.l>=maxL(d))return;if(!can(c)){toast('No te alcanza para mejorar 😕');return}pay(c);b.up=1;b.dur=d.t*(b.l+1)*1000*bm();b.end=now()+b.dur;hammer(2);dust(i,8);hud();save();openInfo(i);break}
  case 'rush':{const c=rushCost(b);if(S.c<c){toast('No te alcanzan las monedas');return}S.c-=c;b.end=now();tick();break}
  case 'mv':MV=i;PL=null;closeSheet();setMode();break;
  case 'sell':{const d=B[b.t],val=sellVal(b);closeSheet();modal(`<div class="mtitle">¿Vender?</div><div class="big">${svgArt(b.t,b.l)}</div><p>Vas a vender ${d.n}${val?` y recibir ${RES.c}${val}`:''}.</p>`,[['Sí, vender',()=>{if(S.g[i]===b){S.g[i]=null;S.c+=val;render();hud();save()}},'red'],['Cancelar']]);break}
  case 'troops':openTroops();break;
  case 'train':train(v,1);break;
  case 'qtog':qOpen=!qOpen;{const q=$('#qlist');if(q){q._s='';live()}}break;
  case 'qdelg':qDelGroup(+v);sfx('click');live();break;
  case 'qclr':{const n=S.queue.length;while(S.queue.length)qRemove(S.queue.length-1);toast(`Cola vacía: te devolví ${n} tropas en recursos`);live();break}
  case 'train5':train(v,5);break;
  case 'enemy':openSelect(v);break;
  case 'campmap':openCamp();break;
  case 'visit':visit(+v);break;
  case 'visitp':visitP(+v);break;
  case 'worker':hireWorker(sheet.i);break;
  case 'exped':{const e=target(sheet.ei);if(e.isl==null)return;const army={};for(const u in U)if(SEL[u]>0){army[u]=Math.min(SEL[u],S.troops[u]);S.troops[u]-=army[u];if(!army[u])delete army[u]}if(!Object.keys(army).length)return;const t=now();const nav=Object.keys(army).some(u=>U[u].nav);S.exp.push({i:e.isl,army,s:t,e:t+expDur(e.isl)*(nav?.6:1),nav});closeSheet();setTimeout(()=>goIsl(e.isl),200);toast(`⛵ Tu expedición zarpó hacia ${ISL[e.isl].n}`);sfx('build');hud();save();break}
  case 'dmc':{const q=S.dm.list[+v];if(S.dm.got[+v]||dmProg(q)<q.n)return;S.dm.got[+v]=1;S.c+=300+120*S.lvl;sfx('coin');hud();save();openMis();break}
  case 'dmb':{if(S.dm.bonus||!S.dm.got.every(x=>x))return;S.dm.bonus=1;addChest(1);S.spins=(S.spins||0)+1;save();openMis();break}
  case 'wheel':openWheel();break;
  case 'spin':spin();break;
  case 'col':openCol();break;
  case 'cmd':openCmd();break;
  case 'goisl':closeSheet();goIsl(+v);break;
  case 'kraken':openKraken();break;
  case 'pfname':pfName();break;
  case 'pfmotto':pfMotto();break;
  case 'pfav':{const a=AVS[+v];if(a&&avOk(a[1])){S.prof.av=a[0];pPrev='';save();hud();openProf()}break}
  case 'pfcos':openCos();break;
  case 'albc':albClaim(v);break;
  case 'tdgo':startTD();break;
  case 'atab':S.atab=v;openAttack();$('#shbody').scrollTop=0;break;
  case 'selq':{for(const u in U)SEL[u]=v==='all'?S.troops[u]||0:v==='half'?Math.ceil((S.troops[u]||0)/2):0;openSelect(sheet.ei,1);break}
  case 'menu':{const it=MENU.flat().find(x=>x[0]===v);if(it)it[2]();break}
  case 'setq':setQ(v);break;
  case 'setsky':S.sky=v;save();skyTick();openSet();break;
  case 'errcopy':errCopy();break;
  case 'mkb':mktBuy(v);break;
  case 'krclaim':krClaim(v);break;
  case 'cos':{const[k,i]=v.split(':');S.cos[k]=+i;cosApply();save();openCos();break}
  case 'bkcopy':bkCopy();break;
  case 'bkdl':bkDl();break;
  case 'bkimp':bkImp();break;
  case 'world':wSel=-1;openWorld();break;
  case 'wsel':wSel=+v;openWorld();break;
  case 'clan':openClan();break;
  case 'cjoin':S.clan={i:+v,xp:0,med:0,rq:now()+120000};RSC=null;sfx('done');toast(`${CLANS[+v].f} ¡Te uniste a ${CLANS[+v].n}!`);save();openClan();break;
  case 'cleave':closeSheet();modal('<div class="mtitle">¿Salir del clan?</div><p>Perdés el nivel del clan y tus medallas.</p>',[['Sí, salir',()=>{S.clan=null;RSC=null;save()},'red'],['Cancelar']]);break;
  case 'cdon':{if(!S.clan||S.troops[v]<5)return;S.troops[v]-=5;const m=Math.max(1,Math.round(U[v].atk/4));S.clan.med+=m;S.clan.xp+=m*3;RSC=null;sfx('coin');toast(`🤝 Aportaste 5 ${U[v].n}: +${m} medallas`);hud();save();openClan();break}
  case 'cbuy':{const s=CSHOP[+v];if(!S.clan||S.clan.med<s[2])return;S.clan.med-=s[2];s[3]();sfx('coin');hud();save();openClan();break}
  case 'siege':closeSheet();openSiege();break;
  case 'storyo':openStory();break;
  case 'story':{const i=+v;if(i!==S.story)return;closeSheet();talk(STO[i].pre,()=>setTimeout(()=>openSelect('s'+i),0));break}
  case 'cmdsel':S.cmdSel=v;save();openCmd();break;
  case 'cmdbuy':{const H=HER.find(q=>q.k===v);if(!H||S.cmd[v]||S.lvl<H.lv)return;if(!can(H.cost)){toast('No te alcanza 😕');return}pay(H.cost);S.cmd[v]={lvl:1,xp:0,inj:0};if(!S.cmdSel)S.cmdSel=v;sfx('lvl');toast(`${H.f} ¡${H.n} se unió a tu ejército!`);hud();save();openCmd();break}
  case 'res':openRes();break;
  case 'rs':{if(S.rsq)return;const[bk,j]=v.split('.'),i=(S.rs[bk]||[]).length,nd=RT[bk].L[i];if(!nd)return;const c=rsCost(i);if(!can(c)){toast('No te alcanza 😕');return}pay(c);const nm=Array.isArray(nd[0])?nd[+j][0]:nd[0];S.rsq={b:bk,i,c:+j,nm,end:now()+RTT[i]*60000};sfx('build');hud();save();openRes();break}
  case 'rsr':{const c=rsRush();if(!S.rsq)return;if(S.c<c){toast('No te alcanza el oro 😕');return}S.c-=c;S.rsq.end=now();rsTick();hud();break}
  case 'ars':openArs();break;
  case 'eq':eqPick(+v);break;
  case 'uneq':{const it=S.inv.find(i=>i.id===+v);if(it)it.u='';save();openArs();break}
  case 'scrap':{const k=S.inv.findIndex(i=>i.id===+v);if(k<0)return;const it=S.inv[k];S.s+=scrapV(it);S.inv.splice(k,1);sfx('coin');hud();save();openArs();break}
  case 'shop':openShop();break;
  case 'buy':buy(+v);break;
  case 'fusion':openFusion();break;
  case 'fuse':fuse(+v);break;
  case 'hero':newHero();break;
  case 'camp':tapCamp(+v);break;
  case 'expand':expand();break;
  case 'tech':openTech();break;
  case 'research':{const d=TECH[v],l=S.tech[v];if(l>=TMAX||l>=labLvl())return;const c=techCost(v,l);if(!can(c)){toast('No te alcanza para investigar 😕');return}pay(c);S.tech[v]++;toast(`${d.e} ${d.n} nivel ${l+1}`);addXP(40*(l+1));hud();save();openTech();break}
  case 'sm':SEL[v]=Math.max(0,SEL[v]-1);openSelect(sheet.ei,1);break;
  case 'sp':SEL[v]=Math.min(S.troops[v],SEL[v]+1);openSelect(sheet.ei,1);break;
  case 'sa':SEL[v]=SEL[v]===S.troops[v]?0:S.troops[v];openSelect(sheet.ei,1);break;
  case 'go':startBattle(sheet.ei,0);break;
  case 'golive':startBattle(sheet.ei,1);break;
  case 'ulv':upUnit(v);break;
  case 'claim':{const m=MS[S.mi];if(!m||!m.ok())return;gain(m.r);S.mi++;toast('🎁 '+costPlain(m.r));addXP(m.x);hud();save();openMis();break}
 }
}
function collectAll(){
 let n=0;S.g.forEach((b,i)=>{if(b&&ready(b)){collect(i,1);n++}});
 ISL.forEach((d,i)=>{if(islReady(i)){islCollect(i);n++}});
 if(!n)toast('No hay nada para cobrar todavía');else{checkLvl();render();hud();save()}
}
/* ---------- rivales que progresan ---------- */
function rivals(t){islWar(t);S.enemies.forEach((e,i)=>{if(t<e.nx)return;e.nx=t+(3+Math.random()*4)*60000*dif().sp;if(e.lvl<(2+(S.diff==null?1:S.diff))*S.lvl+i+1){e.lvl++;if(Math.random()<.5)toast(`📈 ${e.n} subió a nivel ${e.lvl}`)}})}
function rankHTML(){
 const own=i=>S.isl.filter(x=>x.o===i).length,rows=S.enemies.map((e,i)=>({n:e.f+' '+e.n,s:eDef(e)+150*own(i)}));
 rows.push({n:myTag(),s:defense()+armyPow(S.troops)+150*own(-1),me:1});rows.sort((a,b)=>b.s-a.s);
 return `<div class="cat">🏆 Ranking de poder</div><div class="rank">${rows.map((r,k)=>`<div class="${r.me?'me':''}"><span>${k+1}.</span> ${r.n} <b>${fmt(r.s)}</b></div>`).join('')}</div>`;
}
/* ---------- islas ---------- */
let islSig='';
const islPos=i=>{const W=N*100,H=N*50+220,Q=N*25+110;return[[-10,100],[W+10,100],[250,48],[W-250,48],[110,H-125],[W-110,H-125],[-150,Q-130],[W+150,Q-130],[-150,Q+140],[W+150,Q+140]][i]};
function islTick(){const s=tw+'|'+N+'|'+S.isl.map((x,i)=>x.o+(islReady(i)?'R':'')+(x.o<0?islRate(i):islDef(i))).join();if(s!==islSig){islSig=s;renderIsl()}}
function renderIsl(){
 const k=tw/100;let h='';
 ISL.forEach((d,i)=>{const s=S.isl[i],[x,y]=islPos(i),mine=s.o<0;
  h+=`<div class="isl${mine?' mine':''}" data-isl="${i}" style="left:${(x-85)*k+OX}px;top:${(y-75)*k}px;width:${170*k}px;height:${130*k}px;font-size:${tw*.8}px">${islSvg(mine,i)}<div class="itag">${mine?'⭐ '+d.n:S.enemies[s.o].f+' '+d.n}<br>${mine?'+'+islRate(i)+'💰/min':'🛡️'+islDef(i)}</div>${islReady(i)?'<div class="bub" style="top:-6%">💰</div>':''}</div>`});
 $('#isls').innerHTML=h;
}
function floatAt(x,y,txt){const f=document.createElement('div');f.className='ft';f.textContent=txt;f.style.left=x+'px';f.style.top=y+'px';$('#map').appendChild(f);setTimeout(()=>f.remove(),1300)}
function islCollect(i,solo){const a=islAmt(i);if(!a)return;S.c+=a;S.isl[i].lc=now();const[x,y]=islPos(i),k=tw/100;floatAt(x*k+OX,(y-60)*k,'+'+a+'💰');burst(x*k+OX,(y-30)*k,'💰',5);if(solo){hud();save();islTick()}}
function tapIsl(i){
 if(PL||MV!=null)return;
 {const x=S.exp.find(q=>q.i===i);if(x){toast(`⛵ Expedición en curso: ${ft(x.e-now())}`);return}}
 if(S.isl[i].o<0){if(islAmt(i)>0)islCollect(i,1);else toast(`${ISL[i].n} produce +${islRate(i)}💰 por minuto`);return}
 openSelect('i'+i);
}
function islListHTML(){
 let h='<div class="cat">🏝️ Islas</div>';
 ISL.forEach((d,i)=>{const s=S.isl[i],mine=s.o<0,o=S.enemies[s.o];
  h+=`<div class="erow"><div class="ef">🏝️</div><div class="einfo"><b>${d.n}</b> ${mine?'<span class="tag" style="background:#2f7fe0">Tuya</span>':`<span class="tag">${o.f} Nv ${o.lvl}</span>`}<div class="small">${mine?`Te da +${islRate(i)}💰 por minuto`:`🛡️${islDef(i)} · Da +${islRate(i)}💰 por minuto`}</div></div>${mine?'':S.exp.some(x=>x.i===i)?`<div class="small lockt">⛵ ${ft(S.exp.find(x=>x.i===i).e-now())}</div>`:`<button class="btn sm" data-a="enemy" data-v="i${i}" title="Expedición en tiempo real">⛵</button><button class="btn sm red" data-a="enemy" data-v="i${i}">Atacar</button>`}</div>`});
 return h+'<p class="small">⛵ Expedición en tiempo real: las tropas zarpan y la isla se conquista al llegar, con botín ×1,5. Tocá ⛵ o Atacar y elegí la expedición arriba de todo.</p>';
}
/* ---------- mejoras robóticas ---------- */
const labLvl=()=>S.g.reduce((m,b)=>b&&b.t==='lab'&&done(b)?Math.max(m,b.l):m,0);
function openTech(){
 const L=labLvl();
 let h=L?`<p class="small" style="margin-top:0">Tu laboratorio es nivel ${L}: podés investigar cada mejora hasta el nivel ${L}.</p>`:`<p style="margin-top:0">Necesitás un 🔬 Laboratorio de robótica${S.lvl<B.lab.lvl?` (se desbloquea en nivel ${B.lab.lvl})`:''}.</p>`;
 for(const k in TECH){const d=TECH[k],l=S.tech[k],c=l<TMAX?techCost(k,l):null;
  h+=`<div class="trow"><div class="te">${d.e}</div><div class="tinfo"><b>${d.n}</b> <span class="tag">Nv ${l}/${TMAX}</span><div class="small">${d.d}${c?' · '+costHTML(c):''}</div></div>${!c?'<div class="small lockt">⭐ Máximo</div>':l>=L?`<div class="small lockt">${L?'Mejorá el laboratorio':'Sin laboratorio'}</div>`:`<button class="btn sm gold" data-a="research" data-v="${k}">Investigar</button>`}</div>`}
 openSheet('tech','🔧 Mejoras robóticas',h);
}
/* ---------- terreno ---------- */
const expCost=x=>{const o={c:x.c};if(x.o)o.o=x.o;if(x.s)o.s=x.s;return o};
function terrHTML(){
 const x=EXP[N],r=!x?'<div class="small lockt">Tamaño máximo</div>':S.lvl<x.lvl?`<div class="small lockt">🔒 Nivel ${x.lvl}</div>`:'<button class="btn sm gold" data-a="expand">Comprar</button>';
 return `<div class="cat">Terreno</div><div class="trow"><div class="te">🗺️</div><div class="tinfo"><b>Expandir la isla</b><div class="small">${x?`De ${N}×${N} a ${N+2}×${N+2} casilleros · ${costHTML(expCost(x))}`:`Tu isla ya mide ${N}×${N} casilleros`}</div></div>${r}</div>`;
}
function expand(){
 const x=EXP[N];if(!x||S.lvl<x.lvl)return;
 if(!can(expCost(x))){toast('No te alcanza para expandir 😕');return}
 pay(expCost(x));
 const M=N+2,g=Array(M*M).fill(null);
 for(let i=0;i<N*N;i++)if(S.g[i])g[((i/N|0)+1)*M+i%N+1]=S.g[i];
 S.g=g;S.size=N=M;PL=null;MV=null;closeSheet();layout();setMode();toast('🗺️ ¡Tu isla creció!');addXP(100);hud();save();
}
/* ---------- zoom con la ruedita y arrastre para moverse ---------- */
const wdEl=$('#world');let drag=null,dragged=0;
wdEl.addEventListener('wheel',e=>{
 e.preventDefault();
 const dy=e.deltaY*(e.deltaMode===1?33:1);zoomTo(zT*Math.max(.7,Math.min(1.4,Math.exp(-dy*.002))),e.clientX,e.clientY);
},{passive:false});
wdEl.addEventListener('scroll',()=>{UIB=performance.now()},{passive:true});
wdEl.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button)return;drag={x:e.clientX,y:e.clientY,l:wdEl.scrollLeft,t:wdEl.scrollTop,m:0}});
window.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.m&&Math.hypot(dx,dy)<6)return;drag.m=1;wdEl.scrollLeft=drag.l-dx;wdEl.scrollTop=drag.t-dy});
window.addEventListener('pointerup',()=>{if(drag&&drag.m)dragged=now();drag=null});
/* Zoom: la ruedita fija un destino y frame() se acerca de a poco, manteniendo quieto el punto bajo el cursor */
/* Zoom fluido: mientras dura el gesto se escala la imagen ya dibujada (barato) y al soltar se aplica el zoom real una sola vez */
let UIB=0;const busyUI=()=>performance.now()-UIB<1200;
function mkGZ(el,k,commit){let G=null;return{on:()=>!!G,z:()=>G.z,
 start(z0,ax,ay){if(G)return;const r=el.getBoundingClientRect();G={z0,z:z0,r,ux:ax-r.left,uy:ay-r.top,ax,ay};UIB=performance.now();document.body.classList.add('zoomg');el.style.transformOrigin='0 0';el.style.willChange='transform'},
 set(z,ax,ay){if(!G)return;if(ax==null){ax=G.ax;ay=G.ay}UIB=performance.now();G.z=z;G.ax=ax;G.ay=ay;const s=z/G.z0,q=k();el.style.transform=`translate(${(ax-G.r.left-G.ux*s)/q}px,${(ay-G.r.top-G.uy*s)/q}px) scale(${s})`},
 end(){if(!G)return;const g=G;G=null;UIB=performance.now();document.body.classList.remove('zoomg');el.style.transform='';el.style.willChange='';commit(g.z,g.ux/g.r.width,g.uy/g.r.height,g.ax,g.ay)}}}
let zT=S.zoom,zA=null,pin=null;
const GM=mkGZ($('#mapw'),()=>1,(z,fx,fy,ax,ay)=>{S.zoom=z;sizeZoom();const n=$('#map').getBoundingClientRect();wdEl.scrollLeft+=n.left+fx*n.width-ax;wdEl.scrollTop+=n.top+fy*n.height-ay});
function setZoom(z,ax,ay){
 const mp=$('#map'),m=mp.getBoundingClientRect();S.zoom=z;sizeZoom();if(!m.width)return;
 const n=mp.getBoundingClientRect();wdEl.scrollLeft+=n.left+(ax-m.left)/m.width*n.width-ax;wdEl.scrollTop+=n.top+(ay-m.top)/m.height*n.height-ay;
}
function zoomTo(z,ax,ay){if(pin)return;zT=Math.max(.5,Math.min(3,z));if(ax==null){const r=wdEl.getBoundingClientRect();ax=r.left+r.width/2;ay=r.top+r.height/2}if(!GM.on())GM.start(S.zoom,ax,ay);zA=1}
wdEl.addEventListener('touchstart',e=>{if(e.touches.length===2){if(GM.on()){zA=null;GM.end()}const[a,b]=e.touches;pin={d:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)||1,z:S.zoom};GM.start(S.zoom,(a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)}},{passive:true});
wdEl.addEventListener('touchmove',e=>{if(!pin||e.touches.length!==2)return;e.preventDefault();const[a,b]=e.touches;zT=Math.max(.5,Math.min(3,pin.z*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/pin.d));GM.set(zT,(a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)},{passive:false});
const pinEnd=e=>{if(pin&&e.touches.length<2){pin=null;GM.end()}};wdEl.addEventListener('touchend',pinEnd);wdEl.addEventListener('touchcancel',pinEnd);
/* ---------- mini eventos en tiempo real ---------- */
let ents=[],evId=0,nextEv=now()+45000,boostUntil=0;
function clearEnts(){ents.forEach(e=>e.el.remove());ents=[]}
function addEnt(o){const el=document.createElement('div');o.id=++evId;o.life0=o.life;el.dataset.ev=o.id;el.style.width=o.w*tw+'px';el.style.height=o.h*tw+'px';el.innerHTML=o.art;$('#ents').appendChild(el);o.el=el;o.t=0;ents.push(o)}
function evReward(m){
 const L=S.lvl,ks=['f'];if(L>=2)ks.push('o');if(L>=3)ks.push('s');if(L>=4)ks.push('e');
 const r={c:Math.round((40+35*L)*m)};r[ks[Math.floor(Math.random()*ks.length)]]=Math.round((15+12*L)*m);return r;
}
function startEvent(){
 sfx('alert');
 const opts=['crate','crate','boost','ufo'];if(S.lvl>=2)opts.push('ship','ship');
 const k=opts[Math.floor(Math.random()*opts.length)];
 if(k==='crate'){const fr=[];for(let i=0;i<N*N;i++)if(!S.g[i])fr.push(i);if(!fr.length)return;
  const[x,y]=pos(fr[Math.floor(Math.random()*fr.length)]);addEnt({k,x,y:y-tw*.7,w:1,h:1.2,life:30000,art:CRATE});toast('🎁 ¡Cayó una caja de suministros! Tocala antes de que desaparezca')}
 else if(k==='ship'){addEnt({k,x:-tw*1.6,y:MH-tw*1.5,w:1.6,h:1.3,life:26000,hp:5,art:SHIP});toast('🏴‍☠️ ¡Barco pirata! Tocalo 5 veces para hundirlo')}
 else if(k==='ufo'){addEnt({k,x:-tw*1.4,y:tw*.4,w:1.3,h:1,life:14000,art:UFO});toast('🛸 ¡Un OVNI! Tocalo para ganar experiencia')}
 else{boostUntil=now()+45000;toast('⚡ ¡Fiebre de producción! Todo produce el doble por 45 segundos')}
}
function moveEnts(dt){
 for(let n=ents.length-1;n>=0;n--){
  const e=ents[n];e.t+=dt;let x=e.x,y=e.y;
  if(e.k==='crate'){const p=Math.min(1,e.t/2600);y=e.y-tw*4*Math.pow(1-p,2);if(p>=1&&!e.land){e.land=1;e.el.classList.add('landed')}}
  else if(e.k==='ship'){x=e.x+(MW+tw*1.6)*e.t/e.life0;y=e.y+Math.sin(e.t/500)*tw*.03}
  else{x=e.x+(MW+tw*1.4)*e.t/e.life0;y=e.y+Math.sin(e.t/700)*tw*.35}
  e.cx=x+e.w*tw/2;e.cy=y+e.h*tw*.2;
  e.el.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;e.el.style.opacity=Math.max(0,Math.min(1,(e.life-e.t)/500));
  if(e.t>=e.life){
   if(e.k==='ship'&&!e.done){const l=Math.floor(S.c*.04);S.c-=l;toast(`🏴‍☠️ Los piratas escaparon con 💰${l}`)}
   e.el.remove();ents.splice(n,1);
  }
 }
}
function tapEnt(id){
 const e=ents.find(q=>q.id===id);if(!e||e.done)return;
 const end=txt=>{S.stats.ev=(S.stats.ev||0)+1;e.done=1;e.life=e.t+500;floatAt(e.cx,e.cy,txt);burst(e.cx,e.cy,'✨',6)};
 if(e.k==='crate'){if(!e.land)return;const r=evReward(1.5);gain(r);end('🎁 +'+costPlain(r));addXP(10)}
 else if(e.k==='ship'){
  e.hp--;burst(e.cx,e.cy,'💥',3);
  if(e.hp>0){e.el.classList.remove('hit');void e.el.offsetWidth;e.el.classList.add('hit');return}
  const r=evReward(3);gain(r);S.stats.pir=(S.stats.pir||0)+1;end('🏴‍☠️ +'+costPlain(r));addXP(15+5*S.lvl);
 }else{const x=20+8*S.lvl;end('🛸 +'+x+'⭐');addXP(x)}
 hud();save();
}
function events(t){
 if(t>=nextEv&&!modalOpen&&!PL&&MV==null&&!BT){nextEv=t+(70+Math.random()*80)*1000;startEvent()}
 let h=t<boostUntil?`⚡ Producción x2 <b>${ft(boostUntil-t)}</b>`:'';
 const e=ents.find(q=>!q.done);
 if(e)h+=(h?' · ':'')+(e.k==='crate'?'🎁 Caja de suministros':e.k==='ship'?'🏴‍☠️ Barco pirata '+'❤️'.repeat(e.hp):'🛸 OVNI')+` <b>${ft(e.life-e.t)}</b>`;
 const c=$('#evchip');if(c._h!==h){c._h=h;c.innerHTML=h;c.classList.toggle('on',!!h)}
}
function burst(x,y,em,n){
 for(let k=0;k<n;k++){const c=document.createElement('div'),a=Math.random()*6.28,r=(.5+Math.random()*.7)*tw;c.className='coin';c.textContent=em;c.style.left=x+'px';c.style.top=y+'px';
  c.style.setProperty('--dx',Math.cos(a)*r+'px');c.style.setProperty('--dy',Math.sin(a)*r-tw*.5+'px');$('#map').appendChild(c);setTimeout(()=>c.remove(),720)}
}
/* ---------- bucle de animación: 60 cuadros por segundo ---------- */
const RE={c:$('#rc'),f:$('#rf'),o:$('#ro'),s:$('#rs'),e:$('#re')},disp={};let lastTs=0;
function frame(ts){
 const dt=Math.min(60,(ts-lastTs)||16);lastTs=ts;
 {const ib=!!BT;if(ib!==frame.ib){frame.ib=ib;document.body.classList.toggle('inbt',ib)}}
 /* si con gráficos completos va trabado (menos de 24 cuadros por segundo dos veces seguidas), pasa solo a livianos */
 if(BT||document.hidden){if(frame.pf)frame.pf.l=ts}
 else if(!LITE){const P=frame.pf||(frame.pf={n:0,t:0,bad:0,l:ts});P.n++;P.t+=Math.min(1000,ts-P.l);P.l=ts;if(P.t>3000){if(P.n/P.t*1000<24)P.bad++;else P.bad=0;P.n=0;P.t=0;
  if(P.bad>=2){P.bad=0;LITE=true;try{localStorage.setItem('gdb-gfx','lo')}catch(e){}document.documentElement.classList.add('lite');for(const k in SPC)delete SPC[k];layout(1);toast('⚡ Activé los gráficos livianos para que vaya más fluido (Menú → Gráficos)')}}}
 if(!BT&&!GM.on()){moveWalkers(dt);moveEnts(dt);if(MAPC)drawMap(ts)}if(BT)battleFrame(dt);
 if(zA&&GM.on()){const c=GM.z(),d=zT-c;if(Math.abs(d)<.003){GM.set(zT);zA=null;GM.end()}else GM.set(c+d*Math.min(1,dt*.014))}
 for(const k in RE){const v=S[k],o=disp[k];let n=o==null?v:o+(v-o)*Math.min(1,dt*.01);if(Math.abs(v-n)<1)n=v;if(n!==o){disp[k]=n;const tx=fmt(n);if(RE[k]._t!==tx){RE[k]._t=tx;RE[k].textContent=tx}}}
 requestAnimationFrame(frame);
}
/* ---------- sonidos grabados (CC0) ----------
   Sonidos de interfaz de uisfx (tema "cinematic"), dedicados al dominio público con CC0 1.0. Los disparos y explosiones siguen sintetizados. */
const SNDD={'reward':'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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxOCAjYmW/ykcccGLEh/UF6BQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LEwAPHnDb0QKRkgAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsShg8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV','complete':'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VnwSaRKjXH1SrjSlniOf16zSkGtq7lWspSGa9iz/+1LE8gPNwK0CDQRRiW8FIIGBvMhqQCQRb5pBCaLkIiKmoYGWS9d7j4OcsNSbkaP/OvKsTtXvirA+X/5Dlx08U5b3Sa3j+/f8hXJxR/in6eMt1mj7drEvIO1F9bFDRuv/XwbqT/xppaVP4Mt+ewk7hZjxsKFPqm6Njhe6/dsbg3Tq5TMlfRJXBtGnk4h8ec+ZoL9qvss6SrKbQNuVyXxywcDizKwTUaGuQt0WaTSRjxQ/aeJPdIpepcDJoGnuvJ5lBkwlqpXNgF9Xr18oOayuuP/7UsTrAAuFSwjIBHXBWZOhCLeMmIIQQUk3LXqBjwrbQ40md8RTMOosTGaoaVB00xcj4uIzphNSUpNzdJ2iJFLxCKpS+SdLpCB4VFAk9LQUbewQiEq1RFsQLXitagFr9P2HkTJ/1DJFom14EJNOZzoYXUg6FYOgqcY4V4g0VijzNNx4m+U5N3xzir88j24DeOMdFfM4ZY1gx2LvDcrJ3M06aeTyKHVCpVcpwJB1ZsXPBEyYBkCitp0TAYueAYoCZgLHgLaj///sCJVTbYU7mgqJ//tSxO+CDQirAgBkYUFFA+EkF5wRwBRaqolTkiVORR+9zQkDVQVcVASluiEYerBoqCoiHhoRHgVPSVpVwKiJxY81R4FSz4ies6GvO4cLB0q6JToNed/8RAU7KnREeEVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUAAJqUABYVcy0V9MZYQwNkiQQGEBChVAoklQOpCxCzY1Q6kThmM68C5EEIieALZmHHWKdpBxQmfUBLR24Q2mFQabr/+1LE8IANEK7+B5hzAR+GIahQiMhwEBIJ3cZLhfBBkUwDamJxpKkGrCw5mLRmftwZ+xpVZVVVZZKsy21oK7UJLWgkAWGKkSlSUUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsT2Aw1hNP5GGG0BS4dfTDCYAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxN0DztiKPyxnDsAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=','level-up':'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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsTOg8s8QO5EpMMAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxKGDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LEoYPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==','press':'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Jb020bHrY92hRpFnURpiuKJ7JNZpK+L6Wzvcq59mpFqGV9VbxALvEK+yTSfCdgqOHyXmLgla1q0wQSj/+1LEkQJJNBUXLGmAAPeCoqGNPABkX0N/UhKWJXTt4sJTFq8BCzn12uQW0YEptTraimeErHxhnqS6+0wsqFklGPWfFinvtTfJzZVszMNbKTQ0AFaRAVquq4xVG0pBuGkAwcvJipRLgBZYouBndzsU+d1I43VvekpV030IKmXsoQbuWApBLQogxfTG0BNvWx6YUQAElz8ug4LFh7hCAFizAbFjYGUaODVPrfnA0mlTaGb7mNcZmEWNL4r2YZyA4TpAYdMsn9pTuFbxr4W2rFflHf/7UsSrAggcFQ8saYABI4KhQY28AJAdzKf1dy6Ir0b8A0zRCF4i4FFhI5Ag6aXY5oul5HEs1TVVLC1RlL2Fmrj1qW3svtqPJkSzztZUNd3tHWHkJRWn+NcRYVp62N61TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAEHBIivBAy/J1WAUWqm00AgEJqtlHJ/nDiW9jqG9hBXXZNm+CiuwRRwroU+L+SXI7+P4N675vigoLkd+R0UK//tSxMQACZgTCAfp4EEAAqHlhZhAOigrgWbgUKhBQU0Ff0F8FBXBILwKfCCmwUGeC///k/////+m///8L/i+C/CG5BR0UGO5adVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LE24IJMBMNCGEgAPwCYZjHjABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsTbg84QSPKn4MAICwBAAcAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV','notification':'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','achievement':'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KgrPfiIseBXypZ3xE+IueEoa6CzxM+qRneHdePOgq755YQSAUBgVB4HwUBcF//tSxOmBjWUjAwXIZIFPEWDI8o0oAeGREMjQ2IBGIA8VLFRoPjBGQKJrKpJqLqJJrKpJpLqVdXV1dUqsmkmouksqsmkuouksqsmkmoupQsLCwsK//b//9QuKioqKiwsLCwuKioqKiwsLCwv/2f//+sVFVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LE6AHMEHsDIb0EAV4e4FTUDOhVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsTqAwn4RPpDJMYBphSPhJSkAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxKGDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=','error':'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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxKGDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LEoYPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==','purchase':'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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFAogsdQN5axUscLqN5tKpJXCeSjV3X+SVWVTUnnkqWKlSiOG//tSxOcCB9wbDMO04kHAM2Cc9IzR0qsdTUnDf6u6v//9UBg0O2UwMGh2fRfdjKiLymKCBKR8ygkX////+ioi+ZURScxQSRH8qpVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LE7YENeJr8J6TKgSWGYGQwiIBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsTOA8sRjrpEgFwIAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxKGDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LEoYPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==','bonus':'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BNdlYhlCNyg5lXOqhLHndSlkKu9QobiggseLZppHI3mjNzSV2ZJ1MdImWtrulnPPyrqrHKnajalqz9lcRqA0jUlRxTOGZeuLSuuy5exmSdlasz30sv0q0BADAGvnSxr3EmndVG0bTqHfBnOro0g3BUuLNU9R2biLhlyKmw7N8BKcBEu50ESHzbCT1Z8MUoSgu56BsXBuSNFkIfwVqY0AXk5IFCbExAHJemVTBQka//tSxOYBixU9BAmEc8FomyChMIo4zsxI8AoaChJ0AyXqyJEjT+tnHNOJVZHK3vLVvbTdIogq4SlgqdJCg8BCV08WPL1BUOjDySanlgaaIj3LHsqdwaniySx6CxIjfWWeynLHpIGXBrnaSf+eKw6rDVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQAAgVqqgU4+LZ4upZ2lZVIaGyBGljkTfsoYGDD/+1LE6oMMqVcCqQhpgXCfYACcHMJOhkayWGXy2eTKCtRyNWUECBoHlC3i7DIwWFUmRYXFYqKi2sUFv/ULCvWyKios3//FhYVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UMTngQjgVwkgvEKBrJCfBGeYkFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LEyYPJ6JatIyRsQAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==','open':'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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsTuggscWQBMJGUBaQbfHGYMIVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxKGDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=','close':'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Rl84WfuaC4RhKHTZxNogCEHDhwTjBAKiIWfQxZZiS6KgQoGHFIIT8BgdQtJ354i8HxpBQbv+13DyAADbVdbabThDJ+GTCupF8jQXGc8RdToq+PJpR9O5D09x73f9nqt///c650qAAiQJKakmbOwZSHC00DgLoObqRhBTezzoIRsSev2EEhiFggaDG6r/+1LE9oISReb8DhhryPmC4eWMsACQ+HzejnQqnTMLNj1MS4CLYlCiTFUIYTQQ0uok3c6WVnj0NoKIj0p4CVWqggICEkGAiGjhuQmVBSB6pYZozIFGRjilfHqpQqpREZNjaxdxe8Jkl+DChttv38rVAAFplHyIhCCUSkyxAuG1eOi5VG4LkxExmLg3b9kvdrxpZzyRwUMnJJTWj2DAFPtEQbsXFFofJ+fFfe5J8LpewpKdFd5hFLiCJNRRLTcewopC6f/3ACt0QjZAUMrFcgoaW//7UsTsAgs4cw1MBEnJu50gAY0MGFGrMcljVKn0k+qEz0VTChaTkqoTJ5sxxTy/x63SMkXTzzyU55ULqzOJIun+xnPb6RnNc6RHfI4f3hz2aOc2q4Y6DzzNAUNqNw0g8dJjOkKRKiGv+lVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVSCSnbCwmEJ4CB0RFgZMtBkBHoaWdeHRNOxE//tSxOWABYQPGaC8QAIEMyCpkwy4MDsSrDURFXkkCJ5GVhqIip1Cyz1PKjHyw87AICPawk/WM6wFqArm1BXWMPXrO2qPHZUJB1VMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LE7IMKhF8CTCTCAYSmYAmDDLhVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsTJA8nICvhkpEAAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV','unlock':'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j2ZT5+RMaxiPNkM7WH3JJs6cYtslslIifVYpPHQieMx9JO6h3wW3Jox5kisaN3e1NS2pvkkwqsT0Lba2sYzqjUBoRHcHBHCgCVsnQv/7UsTaAgf8Jw0MbYLBUIThBZwwkN26gXOJJabfoAdFb5ui5Sx7BzUAyBUqTUt50Bk0T7BQ3Y1cgTZS9TdFE0xClo1DiS8mGmLMzzA89oMCEPyFbQE4klTTVcsNcHzbLEWqAjpM/D8217UUKdetw1VE9CopefKqTih/wHNtvIJZccKMABiQjbkhcwNew+pbRuIEldQYNLacHPicEC4gFuaFx6BKKgYGGnhMDNUGwTdLMDbnDYUqekkVdLTUqlwqqx0O7MkXTXDi3FUjruEmEQBW//tSxOuAC2QnCKNl4EDjhKKkHAgUs/FMGEPgA2HEjQWPkcnOPcJDXKdO2Pmw0+xGbpmq6OWfbbE4qJYBQuJQEfdeLVPjfsnQkkNElxdaGHTB4kOXK3MuLMgswXrESigFMwEmK/pVASm5sCnYuzigopugIix8o7oIIG45VCCh9riUNelTY2bAynuWWxW6fHdOF50y4UyIzsPeiogS1s6JZH9RM2e+n1Mlh3s/Ry0zpfeZUf75CMjB7ZHoLyNR9tKKgTpAH1waIcCeiksRr4axZg7/+1LE/4IQGgT+DTBqSYIE4Nj9MEiTSSWzBJYKYqmJP3zmo4z4dU2j3w1EGg0dKhJ63FmkUyRCIn6yMqMRUGqDyirAkelnqeRFjS1puWAgq5RbkDzCOHbGnY9eVDVm3/T/8qpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqA0V0wDLQCWRp1F9MIzjnRg8ZaQkRUqQNu3GkKyyak0cjVZZYoIG6GRqwUECcjIyZbP/7UsTsgwvgJwQA4MCBSRHgyQGJcHLzVmsvZZn+asDqGRkatKR/mVl//7P5ZHIyNWBiQPf/6hYRhkyAhdn/xVuDIoLfiwv/i/bVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxPGDC5DJAkekZolvjR/El5hKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LE1IPMpQ7AJ6RrAAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==','drop':'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FjP/3BTwUFd/+C/0Fd0V5uPQUFYCe/i7tUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LExwOJ+EUEDIzDgPeIoMmTDAhVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsTeAQZsJwhnmEFBZARe3PMIKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxKGDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU='};
const SNDB={};let sndLoad=0;
function sndInit(){if(sndLoad||!AC)return;sndLoad=1;for(const n in SNDD){try{const bin=atob(SNDD[n]),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);AC.decodeAudioData(u.buffer,b=>{SNDB[n]=b},()=>{})}catch(e){}}}
function playS(n,v){if(!AC||S.mute||AC.state!=='running'||!SNDB[n])return false;try{const s=AC.createBufferSource(),g=AC.createGain();s.buffer=SNDB[n];g.gain.value=v==null?.8:v;s.connect(g);g.connect(FXG||MG);s.start()}catch(e){return false}return true}
const SMAP={coin:['reward',.55],done:['complete',.7],lvl:['level-up',.9],click:['press',.5],alert:['notification',.7],win:['achievement',.85],err:['error',.6],buy:['purchase',.7],chest:['bonus',.8],unlock:['unlock',.7],drop:['drop',.6]};
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
/* ---------- jugadores reales: cada uno publica un resumen de su base en un espacio compartido ---------- */
let pdb=null,puser=null,pid=null,PLY=[],pAt=0,pPrev='',pLoad=0;
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const num=(v,a,b,d)=>{v=+v;return isFinite(v)?Math.max(a,Math.min(b,v)):d};
/* Lo que escriben otras personas no es confiable: se queda solo con defensas y tropas conocidas y valores acotados */
function sanSpec(s){
 if(!s||!Array.isArray(s.defs))return null;const units={};
 for(const k in s.units||{})if(U[k]&&!U[k].hero)units[k]=num(s.units[k],0,10,0)|0;
 return{defs:s.defs.filter(d=>d&&DEFS[d.k]&&d.k!=='hq').slice(0,10).map(d=>({k:d.k,c:num(d.c,0,10,5)|0,r:num(d.r,1,7,3)|0,m:num(d.m,1,3,1)})),units,k:1,hq:num(s.hq,300,6000,600),hqd:num(s.hqd,0,60,10)};
}
async function pubSave(){
 if(!pdb||!pid||now()-pAt<60000)return;
 const d={lvl:S.lvl,pow:defense()+armyPow(S.troops),won:S.stats.won,spec:JSON.stringify(mySpec()),ts:now(),kev:S.kr?S.kr.id:'',kd:S.kr?Math.round(S.kr.d):0,kp:S.kr?S.kr.p0:0,nk:S.prof.n||'',av:S.prof.av||'',mo:S.prof.mo||''},j=d.spec+d.lvl+d.pow+d.kd+d.nk+d.av+d.mo;if(j===pPrev)return;
 pAt=now();try{await pdb.doc('players/'+pid).set(d);pPrev=j}catch(e){}
}
async function loadPlayers(){
 if(!pdb)return;
 try{
  const q=await pdb.collection('players').limit(50).get(),rows=q.docs.filter(d=>d.id!==pid).map(d=>Object.assign({id:d.id},d.data()));let names={};
  try{names=await puser.profiles(rows.map(r=>r.id))||{}}catch(e){}
  PLY=rows.map(r=>{let sp=null;try{sp=sanSpec(JSON.parse(r.spec))}catch(e){}const nk=String(r.nk||'').replace(/\s+/g,' ').trim().slice(0,16),av=AVS.some(a=>a[0]===r.av)?r.av:'🌐';return{av,mo:String(r.mo||'').slice(0,40),n:(nk&&!nameErr(nk)?nk:'')||(names[r.id]&&names[r.id].name)||'Jugador',lvl:num(r.lvl,1,99,1)|0,pow:num(r.pow,0,1e7,0)|0,won:num(r.won,0,1e6,0)|0,sp,kev:String(r.kev||'').slice(0,12),kd:num(r.kd,0,1e12,0),kp:num(r.kp,0,1e9,0)}}).filter(r=>r.sp).sort((a,b)=>b.pow-a.pow);
  if(sheet.kind==='attack')openAttack();
 }catch(e){}
}
function playersHTML(){
 if(pdb&&now()-pLoad>30000){pLoad=now();loadPlayers()}
 let h='<div class="cat">🌐 Jugadores reales</div>';
 if(SB)return h+`<p class="small">${CU?'Buscá rivales reales y atacá una copia de su isla. Ganás o perdés trofeos de verdad.':'Iniciá sesión para atacar a otros jugadores.'}</p><button class="btn gold" data-nb="${CU?'jug':'cuenta'}">${CU?'🔎 Buscar jugadores':'☁️ Iniciar sesión'}</button>`;
 if(!pdb)return h+'<p class="small">Disponible cuando el juego corre dentro de Claude con tu cuenta.</p>';
 if(!PLY.length)return h+'<p class="small">Todavía no hay otros jugadores. Compartí el juego desde Claude y sus bases van a aparecer acá.</p>';
 PLY.forEach((r,i)=>{h+=`<div class="erow"><div class="ef">${r.av}</div><div class="einfo"><b>${esc(r.n)}</b> <span class="tag">${rankOf(r.lvl)} · Nv ${r.lvl}</span><div class="small">${r.mo?'“'+esc(r.mo)+'” · ':''}Poder ${fmt(r.pow)} · ${r.won} victorias</div></div><button class="btn sm" data-a="visitp" data-v="${i}">👁️</button><button class="btn sm red" data-a="enemy" data-v="p${i}">Atacar</button></div>`});
 return h+'<p class="small">Atacar a un jugador es amistoso: ganás botín, pero su base no pierde nada.</p>';
}
function visitP(i){const r=PLY[i],b=mkBattle({},r.sp,{});b.visit=1;b.live=1;b.e={n:r.n,f:r.av};closeSheet();runBattle(b,`👁️ Base de ${esc(r.av+' '+r.n)} · ${rankOf(r.lvl)} · nivel ${r.lvl}`)}
/* ---------- día y noche ---------- */
/* la luz sigue la hora real: amanecer naranja, día claro, atardecer dorado y rosa, noche azul con luces prendidas */
function skyAt(h){const K=[[0,'135,150,210',.85],[5,'135,150,210',.85],[6.3,'255,175,150',.75],[7.6,'255,225,190',.35],[9,'255,255,255',0],[16.5,'255,255,255',0],[18,'255,205,140',.6],[19.3,'250,160,160',.8],[20.4,'140,120,195',.85],[21.5,'135,150,210',.85],[24,'135,150,210',.85]];
 let i=0;while(K[i+1][0]<h)i++;const a=K[i],b=K[i+1],t=(h-a[0])/(b[0]-a[0]),ca=a[1].split(',').map(Number),cb=b[1].split(',').map(Number);return{c:ca.map((v,k)=>Math.round(v+(cb[k]-v)*t)).join(','),o:a[2]+(b[2]-a[2])*t}}
function skyTick(){const d=new Date(),h=S.sky==='dia'?12:S.sky==='tarde'?18.3:d.getHours()+d.getMinutes()/60,s=skyAt(h),n=$('#night'),night=h<6||h>=20.2;
 for(const n of [$('#night')])if(n){n.style.background=`rgb(${s.c})`;n.style.opacity=s.o.toFixed(3);n.style.visibility=s.o>0?'visible':'hidden'}lightsTick(night);
 document.documentElement.classList.toggle('night',night);
 const sun=Math.max(-1,Math.min(1,(h-12.5)/6.5)),sh=$('#shs');
 if(sh){sh.style.setProperty('--shk',(night?8:-sun*32).toFixed(1)+'deg');sh.style.setProperty('--shy',(night?1:1+Math.abs(sun)*.35).toFixed(2));sh.style.setProperty('--sho',night?.35:(1-Math.abs(sun)*.25).toFixed(2))}}
setInterval(skyTick,30000);setTimeout(skyTick,50);
/* ---------- antes de cada batalla: clima al azar y especializaciones de tus tropas ---------- */
const WX=[{k:'sol',n:'☀️ Despejado'},{k:'lluvia',n:'🌧️ Lluvia: todos más lentos'},{k:'niebla',n:'🌫️ Niebla: menos alcance'},{k:'tormenta',n:'⛈️ Tormenta: aéreos más débiles'},{k:'nieve',n:'❄️ Nieve: tropas de tierra más lentas'},{k:'viento',n:'🌬️ Viento: aéreos más lentos'}];
function prepBattle(b){
 const w=b.wx=WX[Math.random()<.4?0:1+(Math.random()*5|0)],mine=b.raid?1:0;
 for(const x of b.E){
  const r=x.side===mine&&!x.st&&S.ubr[x.kind];
  if(r){const kh=1+.15*r.h;x.dmg*=1+.15*r.d;x.hp*=kh;x.uhp*=kh;x.rng+=.3*r.r}
  if(w.k==='lluvia')x.spd*=.8;else if(w.k==='niebla'&&x.rng)x.rng=Math.max(1.2,x.rng*.75);else if(w.k==='tormenta'&&x.fly){x.dmg*=.7;x.spd*=.85}else if(w.k==='nieve'&&!x.fly)x.spd*=.85;else if(w.k==='viento'&&x.fly)x.spd*=.8;
 }
 boostBattle(b);
}
function branchPick(u){
 closeSheet();const d=U[u],r=S.ubr[u]=S.ubr[u]||{d:0,h:0,r:0},pick=k=>()=>{r[k]++;save();setTimeout(openTroops,0)};
 modal(`<div class="mtitle">⬆️ ${d.n} nivel ${S.ulv[u]}</div><div class="big">${ue(u)}</div><p>Además de la mejora del nivel, elegí una especialización:</p>`,[['⚔️ +15% de daño',pick('d'),'red'],['❤️ +15% de vida',pick('h'),'green'],['🎯 +0,3 de alcance',pick('r'),'gold']]);
}
const brTxt=u=>{const r=S.ubr[u];return r&&r.d+r.h+r.r?` · ramas ⚔️${r.d} ❤️${r.h} 🎯${r.r}`:''};
/* ---------- robots obreros: uno por edificio de producción, +50% ---------- */
const WCOST={c:1500,s:200,e:100};
function hireWorker(i){const b=S.g[i];if(!b||b.w)return;if(!cnt('lab')){toast('Necesitás un 🔬 Laboratorio de robótica');return}if(!can(WCOST)){toast('No te alcanza 😕');return}pay(WCOST);b.w=1;sfx('done');toast('🤖 Robot obrero asignado: +50% de producción');hud();save();openInfo(i)}
/* ---------- mercader: ofertas que cambian cada 10 minutos ---------- */
function shopDeals(){
 const k=Math.floor(now()/600000),R=rng32(k*7919+S.lvl),L=S.lvl,res=['f','o','s','e'].slice(0,Math.max(1,Math.min(4,L))),deals=[],PR={f:.6,o:1.2,s:1.6,e:2.2};
 for(let i=0;i<3;i++){const q=res[R()*res.length|0],amt=Math.round((200+150*L)*(1+R()));deals.push({t:`${RES[q]} ${fmt(amt)}`,c:Math.round(amt*PR[q]*(.6+R()*.5)),go:()=>{S[q]+=amt}})}
 const us=Object.keys(U).filter(u=>!U[u].hero&&!U[u].max&&U[u].atk>=60&&S.lvl>=B[U[u].b].lvl),u=us[R()*us.length|0];
 if(u)deals.push({t:`${ue(u)} 1 ${U[u].n}`,c:Math.round(U[u].atk*14),go:()=>{S.troops[u]++}});
 if(!S.shop||S.shop.k!==k)S.shop={k,b:{}};
 return{k,deals};
}
function openShop(){
 const s=shopDeals();let h=`<p class="small" style="margin-top:0">El mercader cambia sus ofertas cada 10 minutos. Próximo cambio en <b data-until="${(s.k+1)*600000}"></b>.</p>`;
 s.deals.forEach((d,i)=>{h+=`<div class="trow"><div class="tinfo"><div class="force"><b>${d.t}</b></div><div class="small">por ${RES.c}${fmt(d.c)}</div></div>${S.shop.b[i]?'<div class="small lockt">Comprado ✓</div>':`<button class="btn sm gold" data-a="buy" data-v="${i}">Comprar</button>`}</div>`});
 openSheet('shop','🚢 Mercader',h);
}
function buy(i){const d=shopDeals().deals[i];if(!d||S.shop.b[i])return;if(S.c<d.c){toast('No te alcanza el oro 😕');return}S.c-=d.c;d.go();S.shop.b[i]=1;sfx('coin');hud();save();openShop()}
/* ---------- jefe mundial: aparece cada tanto; su vida se va gastando entre ataque y ataque ---------- */
function bossTick(){
 const t=now();
 if(S.boss&&(t>S.boss.end||S.boss.dead)){if(!S.boss.dead)toast('👹 El jefe mundial se retiró');S.boss=null}
 if(!S.boss&&S.lvl>=4&&!modalOpen&&!BT){if(!S.bnext){S.bnext=t+8*60000;return}
  if(t>S.bnext){const p=Math.max(300,armyPow(S.troops)),seed=t%1e6|0,hp=Math.round(enemySpec(p,S.lvl+2,seed).hq*5);S.boss={p,seed,end:t+15*60000,max:hp,hp};S.bnext=t+45*60000;sfx('alert');toast('👹 ¡Apareció un jefe mundial! Entrá a Atacar');save()}}
}
const bossSpec=()=>{const sp=enemySpec(S.boss.p,S.lvl+2,S.boss.seed);sp.hq=Math.max(1,S.boss.hp);return sp};
const bossBtn=()=>S.boss&&!S.boss.dead?`<button class="btn red" data-a="enemy" data-v="b" style="margin:0 0 10px">👹 Jefe mundial · vida ${Math.ceil(S.boss.hp/S.boss.max*100)}% · se va en ${ft(S.boss.end-now())}</button>`:'';
function bossHit(b,win){const hq=b.E.find(x=>x.kind==='hq');S.boss.hp=Math.max(0,hq?hq.hp:0);if(win){S.boss.dead=1;S.spins=(S.spins||0)+1;S.stats.boss=(S.stats.boss||0)+1}else toast(`👹 Lo dañaste: al jefe le queda ${Math.ceil(S.boss.hp/S.boss.max*100)}% de vida`)}
/* ---------- recolector: junta producción mientras no jugás; cuántas horas cubre depende de su nivel ---------- */
const RH=[0,1,2,3,5,8,12,24];
const fh=ms=>{const m=Math.floor(ms/60000);return m>=60?Math.floor(m/60)+' h '+(m%60)+' min':m+' min'};
function offlineCheck(){
 const b=S.g.find(x=>x&&x.t==='recolector'&&done(x));if(!b||!S.ts)return;const away=now()-S.ts;if(away<120000)return;
 const cap=RH[b.l]*36e5,use=Math.min(away,cap),r={};
 for(const q of S.g){if(!q||!done(q))continue;const d=B[q.t];if(!d.prod)continue;const p=prodOf(q);for(const k in p)r[k]=(r[k]||0)+p[k]/(d.per*1000)*use*.6}
 for(const k in r)r[k]=Math.round(r[k]);if(!Object.keys(r).length)return;gain(r);
 modal(`<div class="mtitle">🛸 Recolector automático</div><div class="big">${svgArt('recolector',b.l)}</div><p>Estuviste afuera <b>${fh(away)}</b>.</p><p>Tu recolector juntó <b>${costPlain(r)}</b>${away>cap?`<br><small>(a nivel ${b.l} cubre hasta ${RH[b.l]} h)</small>`:''}</p>`,[['¡Cobrar!',()=>{sfx('coin');hud()},'gold']]);save();
}
/* ---------- victorias y derrotas: trofeos de liga, racha y cofres ---------- */
function winStuff(){const g=18+6*(S.diff==null?1:S.diff)+(Math.random()*10|0);S.trof=(S.trof||0)+g;S.streak=Math.min(10,(S.streak||0)+1);addChest();toast(`🏆 +${g} trofeos${S.streak>1?' · 🔥 racha de '+S.streak:''}`)}
function lossStuff(){S.trof=Math.max(0,(S.trof||0)-12);if(S.streak>1)toast('💔 Perdiste la racha');S.streak=0}
function revSet(e){S.rev={e:S.enemies.indexOf(e),end:now()+600000};S.trof=Math.max(0,(S.trof||0)-15);S.streak=0;toast(`🔥 Venganza disponible 10 minutos: botín ×2 contra ${e.n}`)}
const revBtn=()=>S.rev&&now()<S.rev.end&&S.enemies[S.rev.e]?`<button class="btn red" data-a="enemy" data-v="${S.rev.e}" style="margin:0 0 10px">🔥 Venganza contra ${S.enemies[S.rev.e].f} ${S.enemies[S.rev.e].n} · botín ×2 · ${ft(S.rev.end-now())}</button>`:'';
/* ---------- cofres: se ganan al vencer, se abren de a uno y tardan según el tipo ---------- */
const CHT=[{n:'Cofre de madera',e:'📦',t:5*60000,k:1},{n:'Cofre de plata',e:'🎁',t:30*60000,k:4},{n:'Cofre de oro',e:'💎',t:120*60000,k:12}];
function addChest(ty){if(S.chests.length>=4){toast('📦 Tus cofres están llenos: abrí alguno');return}if(ty==null){const r=Math.random();ty=r<.62?0:r<.92?1:2}S.chests.push({t:ty,s:0});toast(`${CHT[ty].e} ¡Ganaste un ${CHT[ty].n}!`);chestRender(1)}
function chestLoot(ty){const k=CHT[ty].k,L=S.lvl,r={c:(150+90*L)*k,f:(60+30*L)*k};if(L>=2)r.o=(40+20*L)*k;if(L>=3)r.s=(25+12*L)*k;if(L>=4)r.e=(15+8*L)*k;return r}
const easyUnits=()=>Object.keys(U).filter(u=>!U[u].hero&&!U[u].max&&B[U[u].b]&&S.lvl>=B[U[u].b].lvl);
function chestTap(i){
 const c=S.chests[i];if(!c)return;const T=CHT[c.t],t=now();
 if(c.s&&t>=c.s+T.t){const r=chestLoot(c.t);gain(r);let ex='';
  if(c.t>0){const us=easyUnits(),u=us[Math.random()*us.length|0],n=c.t===2?3:1;if(u){S.troops[u]+=n;ex=`<p>¡Y ${n} ${U[u].n}!</p>`}}
  {const it=Math.random()<[.35,.75,1][c.t]?giveItem(c.t):null;if(it)ex+='<p>🧰 '+itTxt(it)+'</p>'}S.chests.splice(i,1);sfx('lvl');modal(`<div class="mtitle">${T.e} ${T.n}</div><div class="big">✨</div><p><b>${costPlain(r)}</b></p>${ex}`,[['¡Genial!','','gold']]);hud();save();chestRender(1);return}
 if(c.s){const left=c.s+T.t-t,cost=Math.ceil(left/60000)*(40+15*S.lvl);modal(`<div class="mtitle">${T.e} ${T.n}</div><p>Se abre en <b>${ft(left)}</b>.</p>`,[[`⚡ Abrir ya por 💰${fmt(cost)}`,()=>{if(S.c<cost){toast('No te alcanza el oro 😕');return}S.c-=cost;c.s=1;hud();save();chestRender(1)},'gold'],['Esperar']]);return}
 if(S.chests.some(q=>q.s&&t<q.s+CHT[q.t].t)){toast('Ya hay un cofre abriéndose: esperá a que termine');return}
 c.s=t;sfx('click');save();chestRender(1);toast(`${T.e} Abriendo: listo en ${ft(T.t)}`);
}
function chestRender(force){const el=$('#chests');if(!el)return;const t=now();let h='';
 for(let i=0;i<4;i++){const c=S.chests[i];if(!c){h+='<div class="ch empty">＋</div>';continue}const T=CHT[c.t],rd=c.s&&t>=c.s+T.t;h+=`<div class="ch${rd?' ready':''}" data-ch="${i}">${T.e}<small>${rd?'¡Abrir!':c.s?ft(c.s+T.t-t):'Abrir'}</small></div>`}
 if(force||el._h!==h){el._h=h;el.innerHTML=h}}
$('#chests').onclick=e=>{const c=e.target.closest('[data-ch]');if(c)chestTap(+c.dataset.ch)};
/* ---------- misiones diarias ---------- */
const DMP=[['won','Ganá {n} batallas',[3,5,8]],['col','Cobrá {n} veces',[15,30,50]],['trained','Entrená {n} tropas',[10,25,50]],['def','Defendé {n} ataques',[1,2]],['islc','Conquistá {n} islas',[1,2]],['fus','Hacé {n} fusiones',[1,2]],['ev','Atrapá {n} eventos',[2,4]]];
const dayEnd=()=>{const d=new Date();d.setHours(24,0,0,0);return d.getTime()};
function dmCheck(){
 const d=dayStr(now());if(S.dm&&S.dm.d===d)return;const R=rng32(d.split('-').reduce((a,b)=>a*37+ +b,7)),pool=DMP.slice(),list=[];
 while(list.length<3){const[k,t,v]=pool.splice(R()*pool.length|0,1)[0];list.push({k,t,n:v[R()*v.length|0]})}
 const base={};for(const q of list)base[q.k]=S.stats[q.k]||0;S.dm={d,list,base,got:[0,0,0],bonus:0};S.spins=(S.spins||0)+1;save();
}
const dmProg=q=>Math.max(0,(S.stats[q.k]||0)-S.dm.base[q.k]);
function dmHTML(){
 if(!S.dm)return'';const L=S.lvl;let h=`<div class="cat">📅 Misiones diarias · cambian en <b data-until="${dayEnd()}"></b></div>`;
 S.dm.list.forEach((q,i)=>{const p=Math.min(q.n,dmProg(q)),ok=p>=q.n;h+=`<div class="trow"><div class="tinfo"><b>${q.t.replace('{n}',q.n).replace(' 1 islas',' 1 isla').replace(' 1 ataques',' 1 ataque').replace(' 1 fusiones',' 1 fusión')}</b><div class="pb"><i style="width:${p/q.n*100}%"></i></div><div class="small">${p} / ${q.n} · premio 💰${fmt(300+120*L)}</div></div>${S.dm.got[i]?'<div class="small lockt">✓</div>':ok?`<button class="btn sm gold" data-a="dmc" data-v="${i}">Cobrar</button>`:''}</div>`});
 const all=S.dm.got.every(x=>x);
 return h+(all&&!S.dm.bonus?'<button class="btn gold" data-a="dmb">🎁 Premio por las 3: cofre de plata + 1 giro</button>':S.dm.bonus?'<p class="small">✓ Ya cobraste el premio del día.</p>':'<p class="small">Completá las 3 y ganás un cofre de plata y un giro de ruleta.</p>');
}
/* ---------- liga con temporadas semanales ---------- */
const LG=[['🥉 Bronce',0],['🥈 Plata',400],['🥇 Oro',1000],['💠 Cristal',2000],['🎖️ Maestro',3500],['👑 Leyenda',6000]];
const lgIdx=t=>{let i=0;LG.forEach((l,j)=>{if(t>=l[1])i=j});return i};
const week=()=>Math.floor((now()-4*864e5)/(7*864e5)),seasonEnd=()=>(week()+1)*7*864e5+4*864e5;
const fd=ms=>{const h=Math.floor(ms/36e5);return h>=24?Math.floor(h/24)+' d '+(h%24)+' h':ft(ms)};
function seasonCheck(){
 const w=week();if(S.season==null){S.season=w;return}if(w===S.season||modalOpen||BT)return;
 const i=lgIdx(S.trof||0),m=(i+1)*(i+1),r={c:2000*m,s:200*m,e:100*m};gain(r);S.spins=(S.spins||0)+i;S.season=w;S.trof=Math.floor((S.trof||0)*.6);
 modal(`<div class="mtitle">🏆 Fin de temporada</div><p>Terminaste en <b>${LG[i][0]}</b>.</p><p>Premio: <b>${costPlain(r)}</b>${i?` y ${i} giros de ruleta`:''}</p><p class="small">Tus trofeos bajan un poco para la nueva temporada.</p>`,[['¡Vamos!','','gold']]);save();
}
function leagueHTML(){const t=S.trof||0,i=lgIdx(t),nx=LG[i+1];
 return `<div class="mcard" style="margin-bottom:10px"><div class="mnum">LIGA · LA TEMPORADA TERMINA EN ${fd(seasonEnd()-now()).toUpperCase()}</div><div class="mt">${LG[i][0]} · 🏆 ${t}</div>${nx?`<div class="pb"><i style="width:${(t-LG[i][1])/(nx[1]-LG[i][1])*100}%"></i></div><div class="small">Te faltan ${nx[1]-t} trofeos para ${nx[0]}</div>`:'<div class="small">¡Rango máximo!</div>'}<div class="small">Ganás trofeos al vencer y al defender, y los perdés al caer. Al cierre de la semana cobrás según tu rango.</div></div>`}
/* ---------- ruleta ---------- */
const WH=[['💰',22],['🍗',18],['🛢️',14],['⚙️',12],['⚡',10],['🎁',10],['🎖️',10],['💎',4]];let wrot=0,wspin=0;
const wheelBtn=()=>`<button class="btn gold" data-a="wheel" style="margin:0 0 10px">🎡 Ruleta · ${S.spins||0} giro${S.spins===1?'':'s'}</button>`;
function openWheel(){
 const lab=WH.map((w,i)=>`<span style="transform:rotate(${i*45+22.5}deg) translateY(-82px)">${w[0]}</span>`).join('');
 openSheet('wheel','🎡 Ruleta',`<div class="whw"><div class="wh" id="wh" style="transform:rotate(${wrot}deg)">${lab}</div><div class="whp">▼</div></div><p class="small" style="text-align:center">Un giro gratis por día. Ganás más con las misiones diarias, los torneos, los jefes y la liga.</p><button class="btn gold" data-a="spin" ${S.spins>0&&!wspin?'':'disabled'}>🎡 Girar (${S.spins||0})</button>`);
}
function spin(){
 if(wspin||!(S.spins>0))return;S.spins--;wspin=1;save();let r=Math.random()*100,idx=0;for(;idx<WH.length-1;idx++){r-=WH[idx][1];if(r<0)break}
 wrot+=1800+((360-(idx*45+22.5)-wrot)%360+360)%360;const el=$('#wh');if(el){el.style.transition='transform 3.2s cubic-bezier(.17,.67,.2,1)';el.style.transform=`rotate(${wrot}deg)`}
 $('[data-a="spin"]')&&($('[data-a="spin"]').disabled=true);for(let k=0;k<9;k++)setTimeout(()=>sfx('click'),k*k*40);
 setTimeout(()=>{wspin=0;const L=S.lvl;let txt;
  if(idx<5){const key=['c','f','o','s','e'][idx],amt=[300+150*L,200+100*L,150+80*L,100+60*L,60+40*L][idx]*2;S[key]+=amt;txt=RES[key]+fmt(amt)}
  else if(idx===5){addChest(1);txt='un cofre de plata'}
  else if(idx===6){const us=easyUnits(),u=us[Math.random()*us.length|0];S.troops[u]+=3;txt='3 '+U[u].n}
  else{const a=(300+150*L)*15;S.c+=a;txt='💎 ¡JACKPOT! 💰'+fmt(a)}
  sfx(idx===7?'win':'coin');toast('🎡 Ganaste '+txt);hud();save();if(sheet.kind==='wheel')openWheel()},3400);
}
/* ---------- colección: cada grupo completo da +5% de producción para siempre ---------- */
const CG=[['🎖️ Infantería',['soldado','marine','bazuca','franco']],['🚙 Vehículos',['tanque','pesado','misil']],['🚁 Aéreos',['helicoptero','caza','bombardero','b2']],['🐉 Dragones',['dragon','dfuego','dhielo','delec']],['🤖 Robots',['robot','rexp','rescudo','rmed','rart','rara','titan']],['🧬 Fusiones',FUS.map(f=>f[1])]];
const colDone=()=>CG.filter(g=>g[1].every(u=>S.colu[u])).length;
function colTrack(){let ch=0;for(const u in S.troops)if(S.troops[u]>0&&U[u]&&!S.colu[u]){S.colu[u]=1;ch=1;if(!U[u].hero||U[u].fus)toast(`📖 Nueva en tu colección: ${U[u].n}`)}if(ch)save()}
/* ---------- álbum de edificios e islas: cada sección completa se cobra una vez ---------- */
const BCAT=[['🏠 Producción',['casa','granja','pozo','mina','central','banco']],['⚔️ Militar',['cuartel','fabrica','hangar','lab','forja','astillero','genetico']],['🛡️ Defensa',['muro','trampa','torre','bunker','antiaereo','mortero','tesla','laser','llamat','tfranco','costa','escudo']]];
const ALBK=new Set(BCAT.flatMap(c=>c[1]));
function albTrack(){let ch=0;const first=!S.colb._;S.colb._=1;for(const b of S.g)if(b&&done(b)&&ALBK.has(b.t)&&!S.colb[b.t]){S.colb[b.t]=1;ch=1;if(!first)toast(`📖 Nuevo en el álbum: ${B[b.t].n}`)}S.isl.forEach((s,i)=>{if(s.o<0&&!S.coli[i]){S.coli[i]=1;ch=1}});if(ch)save()}
const albRw=k=>k==='isl'?{c:20000*S.lvl,e:400*S.lvl}:{c:6000*S.lvl,s:300*S.lvl};
function albHTML(){let h='<div class="cat">🏗️ Álbum de edificios</div>';
 BCAT.forEach(([n,ks],gi)=>{ks=ks.filter(k=>B[k]);const got=ks.filter(k=>S.colb[k]).length,ok=got===ks.length,cl=S.colr['b'+gi];
  h+=`<div class="albh"><b>${n}</b> <span class="small">${got}/${ks.length}</span>${ok&&!cl?`<button class="btn sm gold" data-a="albc" data-v="b${gi}">🎁 Cobrar</button>`:cl?'<span class="small lockt">Cobrado ✓</span>':`<span class="small">🎁 ${costPlain(albRw('b'))} + pieza</span>`}</div><div class="colg">${ks.map(k=>`<div class="${S.colb[k]?'':'nc'}">${S.colb[k]?svgArt(k,1):'<span class="q">?</span>'}<small>${S.colb[k]?B[k].n:'???'}</small></div>`).join('')}</div>`});
 const gi=ISL.filter((d,i)=>S.coli[i]).length,ok=gi===ISL.length,cl=S.colr.isl;
 h+=`<div class="cat">🏝️ Álbum de islas</div><div class="albh"><b>Conquistadas</b> <span class="small">${gi}/${ISL.length}</span>${ok&&!cl?'<button class="btn sm gold" data-a="albc" data-v="isl">🎁 Cobrar</button>':cl?'<span class="small lockt">Cobrado ✓</span>':`<span class="small">🎁 ${costPlain(albRw('isl'))} + pieza épica</span>`}</div><div class="colg">${ISL.map((d,i)=>`<div class="${S.coli[i]?'':'nc'}"><span class="q">${S.coli[i]?'🏝️':'?'}</span><small>${S.coli[i]?d.n:'???'}</small></div>`).join('')}</div>`;
 return h}
function albClaim(v){if(S.colr[v])return;if(v==='isl'){if(!ISL.every((d,i)=>S.coli[i]))return;gain(albRw('isl'));giveItem(3)}else{const ks=BCAT[+v.slice(1)][1].filter(k=>B[k]);if(!ks.every(k=>S.colb[k]))return;gain(albRw('b'));giveItem(2)}S.colr[v]=1;sfx('done');hud();save();toast('🎁 ¡Premio del álbum cobrado!');openCol()}
/* ---------- avisos: si dejás el juego abierto de fondo, te avisa cuando algo termina ---------- */
let NTT=[];
const ntOk=()=>'Notification'in window&&Notification.permission==='granted'&&S.notif;
function ntPlan(){for(const t of NTT)clearTimeout(t);NTT=[];if(!ntOk()||!document.hidden)return;const t=now(),ev=[];
 S.g.forEach(b=>{if(b&&b.end>t)ev.push([b.end,`🏗️ ${B[b.t].n} ${b.up?'mejorado':'terminado'}`])});
 for(const q of S.queue||[])if(q.end>t)ev.push([q.end,'🎖️ Tus tropas están listas']);
 for(const x of S.exp||[])if(x.e>t)ev.push([x.e,`⛵ Tu expedición llegó a ${ISL[x.i].n}`]);
 ev.sort((a,b)=>a[0]-b[0]);for(const[at,msg]of ev.slice(0,6))NTT.push(setTimeout(()=>{try{new Notification('War or War',{body:msg,tag:msg})}catch(e){}},at-t))}
document.addEventListener('visibilitychange',ntPlan);
async function ntToggle(){if(S.notif){S.notif=0;save();toast('🔕 Avisos apagados');return}
 if(!('Notification'in window)){toast('Este navegador no permite avisos');return}
 let pm=Notification.permission;if(pm==='default'){try{pm=await Notification.requestPermission()}catch(e){pm='denied'}}
 if(pm!=='granted'){toast('🔕 El navegador no dio permiso para avisos');return}S.notif=1;save();toast('🔔 Avisos activados: te aviso cuando algo termine');try{new Notification('War or War',{body:'🔔 Los avisos funcionan'})}catch(e){}}
/* ---------- raciones y mercado ---------- */
const rations=a=>{let n=0;for(const u in a)if(a[u]>0&&U[u]&&!U[u].hero)n+=U[u].atk*a[u];return Math.round(n*.6)};
const MKT=[['s','⚙️ Acero',34],['o','🛢️ Petróleo',9],['f','🍗 Comida',3],['e','⚡ Energía',70]];
function mktRate(k,base){const v=(S.mk&&S.mk.d===dayStr(now())&&S.mk[k])||0;return Math.round(base*(1+v*.12))}
function openMkt(){const L=S.lvl;let h=`<p class="small" style="margin-top:0">Cambiá el oro que te sobra por otros recursos. Cada compra del día encarece la siguiente del mismo recurso; los precios vuelven a la normalidad a la medianoche. La <b>energía ⚡</b> es el recurso más escaso del juego.</p>`;
 for(const[k,n,base]of MKT){const r=mktRate(k,base),qs=[250,1000,5000].map(q=>Math.round(q*Math.max(1,L/4)));
  h+=`<div class="cat">${n}</div><div class="mkr">${qs.map(q=>{const c=q*r;return `<button class="btn ${S.c>=c?'gold':''}" data-a="mkb" data-v="${k}:${q}" ${S.c>=c?'':'disabled'}><b>+${fmt(q)} ${RES[k]}</b><small>💰${fmt(c)}</small></button>`}).join('')}</div><div class="small">Hoy: 💰${r} por cada ${RES[k]}</div>`}
 openSheet('mkt','🏪 Mercado',h)}
function mktBuy(v){const[k,qs]=v.split(':'),q=+qs,it=MKT.find(m=>m[0]===k);if(!it)return;const c=q*mktRate(k,it[2]);if(S.c<c){toast('💰 No te alcanza el oro');return}
 const t=dayStr(now());if(!S.mk||S.mk.d!==t)S.mk={d:t};S.c-=c;S[k]+=q;S.mk[k]=(S.mk[k]||0)+1;sfx('buy');hud();save();toast(`🏪 Compraste ${fmt(q)} ${RES[k]}`);openMkt()}
/* ---------- menú y ajustes ---------- */
const MENU=[
 [['cuenta','☁️ Cuenta',()=>openCuenta()],['jug','🔎 Jugadores',()=>openJug()],['prof','👤 Perfil',()=>openProf()],['cos','🎨 Personalizar',()=>openCos()],['col','📖 Colección y álbum',()=>openCol()]],
 [['mkt','🏪 Mercado',()=>openMkt()],['set','⚙️ Ajustes',()=>openSet()]],
 [['bk','💾 Copia de seguridad',()=>openBackup()],['tut','🎓 Ver el tutorial',()=>{S.tut=0;TUTB=null;save();closeSheet()}],['help','📖 Cómo jugar',()=>{closeSheet();help()}],['reset','🔄 Empezar de cero',()=>{closeSheet();modal(`<div class="mtitle">¿Empezar de cero?</div><p>Vas a perder toda tu base, tropas y progreso.</p>`,[['Sí, borrar todo',()=>{const sy=S.sync;S=fresh();migrate();S.help=1;S.tut=0;TUTB=null;S.sync=sy;sndBtn();setTimeout(()=>cloudSave(1),0);PL=null;MV=null;save();layout();hud()},'red'],['Cancelar']])}]]];
function openMenu(){const nm=['Tu comandante','Juego','Partida'];let h=`<div style="text-align:center;margin:-4px 0 6px">${LOGO(92,GAMEN)}</div><p class="small" style="margin-top:0">${cState==='ok'?'☁️ Tu partida se guarda en tu cuenta de Claude':'💾 Tu partida se guarda solo en este navegador'}</p>`;
 MENU.forEach((g,i)=>{h+=`<div class="cat" data-nav="0">${nm[i]}</div><div class="mgrid">${g.map(([k,n])=>`<button class="btn ${k==='reset'?'red':''}" data-a="menu" data-v="${k}">${n}</button>`).join('')}</div>`});openSheet('menu','⚙️ Menú',h)}
const vol=k=>(S[k]==null?80:S[k])/100;
function audioVol(){if(!AC)return;if(FXG)FXG.gain.value=S.mute?0:vol('vfx');if(MUG)MUG.gain.value=S.mute||S.nomus?0:vol('vmu')}
function openSet(){const sw=(k,on,n,d)=>`<div class="setr"><div><b>${n}</b>${d?`<div class="small">${d}</div>`:''}</div><button class="tgl ${on?'on':''}" data-a="setq" data-v="${k}"><i></i></button></div>`;
 const sl=(k,n)=>`<div class="setr"><b>${n}</b><input type="range" min="0" max="100" step="5" value="${S[k]==null?80:S[k]}" data-set="${k}"></div>`;
 let h='<div class="cat" data-nav="0">🔊 Sonido</div>'+sw('mute',!S.mute,'Sonido')+sl('vfx','Efectos')+sw('nomus',!S.nomus,'Música')+sl('vmu','Volumen de la música');
 h+='<div class="cat">🌅 Luz del mapa</div><div class="seg">'+[['real','🕒 Hora real'],['dia','☀️ Siempre de día'],['tarde','🌇 Atardecer']].map(([k,n])=>`<button class="btn ${(S.sky||'real')===k?'gold':''}" data-a="setsky" data-v="${k}">${n}</button>`).join('')+'</div>';
 h+='<div class="cat" data-nav="0">🖼️ Gráficos</div><div class="seg">'+[['hi','✨ Completos'],['lo','⚡ Livianos'],['eco','🔋 Ahorro']].map(([k,n])=>`<button class="btn ${(k==='eco'?S.eco:!S.eco&&(k==='lo')===LITE)?'gold':''}" data-a="setq" data-v="g${k}">${n}</button>`).join('')+'</div><p class="small">Livianos: menos detalle para celulares. Ahorro: además saca las tropas que pasean, las nubes y las partículas.</p>';
 h+=sw('mapc',MAPC,'Mapa en lienzo','Prueba: dibuja todos los edificios en un solo lienzo');
 h+='<div class="cat" data-nav="0">🎮 Juego</div>'+sw('vib',S.vib!==0,'Vibración','En explosiones, al cobrar y al subir de nivel')+sw('big',!!S.big,'Texto grande')+sw('notif',!!S.notif,'Avisos','Te avisa cuando algo termina, si el juego queda abierto de fondo')+`<div class="setr"><b>Dificultad</b><button class="btn sm" data-a="setq" data-v="diff">${dif().n}</button></div>`;
 const E=errList();h+=`<div class="cat" data-nav="0">🐞 Registro de errores</div><p class="small">${E.length?`Se guardaron ${E.length} errores. Si algo anduvo mal, copialo y pasámelo.`:'No hubo errores. 👍'}</p>${E.length?`<div class="errl">${E.slice(-5).reverse().map(e=>`<div><small>${new Date(e.t).toLocaleString('es-AR')}</small>${esc(e.m)}</div>`).join('')}</div><div class="row2"><button class="btn" data-a="errcopy">📋 Copiar registro</button><button class="btn" data-a="setq" data-v="errclr">🗑️ Borrar</button></div>`:''}`;
 h+='<p class="small" style="margin-top:14px;text-align:center">Sonidos de interfaz: uisfx (dominio público, CC0).</p>';openSheet('set','⚙️ Ajustes',h)}
function setQ(v){
 if(v==='mute'){S.mute=!S.mute;sndBtn();audioVol()}else if(v==='nomus'){S.nomus=!S.nomus;audioVol()}else if(v==='vib'){S.vib=S.vib===0?1:0;vib(30)}else if(v==='big'){S.big=!S.big;document.documentElement.classList.toggle('bigtxt',!!S.big)}
 else if(v==='notif'){setTimeout(()=>ntToggle().then(openSet),0);return}else if(v==='diff'){S.diff=((S.diff==null?1:S.diff)+1)%3;toast('Dificultad: '+dif().n+'. Rivales, islas y botín se ajustan.')}
 else if(v==='mapc'){MAPC=!MAPC;try{localStorage.setItem('gdb-mapc',MAPC?'1':'0')}catch(e){}if(MCV){MCV.remove();MCV=null;MCK='';MCP=''}layout(1)}
 else if(v==='errclr'){try{localStorage.removeItem('gdb-err')}catch(e){}ERRL=[]}
 else if(v[0]==='g'){const q=v.slice(1);S.eco=q==='eco'?1:0;const lo=q!=='hi';if(lo!==LITE){LITE=lo;try{localStorage.setItem('gdb-gfx',LITE?'lo':'hi')}catch(e){}document.documentElement.classList.toggle('lite',LITE);for(const k in SPC)delete SPC[k]}document.documentElement.classList.toggle('eco',!!S.eco);layout(1)}
 save();openSet()}
$('#shbody').addEventListener('input',e=>{const t=e.target.closest('[data-set]');if(!t)return;S[t.dataset.set]=+t.value;audioVol();save()});
$('#shbody').addEventListener('change',e=>{if(e.target.closest('[data-set="vfx"]'))sfx('coin')});
const vib=ms=>{if(S.vib!==0&&navigator.vibrate)try{navigator.vibrate(ms)}catch(e){}};
/* registro de errores: se guardan los últimos 30 en el navegador */
let ERRL=null;const errList=()=>{if(!ERRL){try{ERRL=JSON.parse(localStorage.getItem('gdb-err')||'[]')}catch(e){ERRL=[]}}return ERRL};
function errLog(m){const L=errList();const s=String(m).slice(0,300);if(L.length&&L[L.length-1].m===s)return;L.push({t:Date.now(),m:s});if(L.length>30)L.shift();try{localStorage.setItem('gdb-err',JSON.stringify(L))}catch(e){}}
window.addEventListener('error',e=>errLog((e.message||'error')+(e.lineno?' · línea '+e.lineno+':'+e.colno:'')));
window.addEventListener('unhandledrejection',e=>errLog('Promesa: '+((e.reason&&e.reason.message)||e.reason)));
function errCopy(){const txt='War or War · registro de errores\n'+navigator.userAgent+'\nNivel '+S.lvl+' · '+(LITE?'livianos':'completos')+'\n\n'+errList().map(e=>new Date(e.t).toISOString()+'  '+e.m).join('\n');
 const ok=()=>toast('📋 Registro copiado: pegalo en el chat');if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,()=>toast('No se pudo copiar'));else toast('No se pudo copiar')}
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
 let r=null;try{await nbUpload(1);const {data:ss}=await SB.auth.getSession();const tok=ss&&ss.session&&ss.session.access_token;if(!tok)throw new Error('Tu sesión se cerró: volvé a entrar en Menú → Cuenta');
  const {data,error}=await SB.functions.invoke('pvp',{body:{action:'attack',defender:e.pvp,army},headers:{Authorization:'Bearer '+tok}});
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
let NBDEF=0;
async function nbDefenses(){
 if(!SB||!CU||NBDEF)return;NBDEF=1;try{
  let seen=[];try{seen=JSON.parse(localStorage.getItem('wow-seen')||'[]')}catch(e){}
  const {data}=await SB.from('attacks').select('id,attacker,win,d_def,created_at').eq('defender',CU.id).eq('def_seen',false).order('created_at',{ascending:false}).limit(10);
  const list=(data||[]).filter(a=>!seen.includes(a.id));if(!list.length)return;
  // se marcan como vistos ANTES de mostrarlos: así el aviso sale una sola vez
  seen=seen.concat(list.map(a=>a.id)).slice(-200);try{localStorage.setItem('wow-seen',JSON.stringify(seen))}catch(e){}
  SB.rpc('mark_seen',{p_ids:list.map(a=>a.id)}).then(()=>{},()=>{});
  const ids=[...new Set(list.map(a=>a.attacker))];const {data:ps}=await SB.from('profiles').select('id,alias,avatar').in('id',ids);const m={};(ps||[]).forEach(p=>m[p.id]=p);
  let h='<div class="mtitle">🛡️ Mientras no estabas</div>';list.forEach(a=>{const p=m[a.attacker]||{};h+=`<div class="erow"><div class="efc">${avHTML(p.avatar,'navi')}</div><div class="einfo"><b>${esc(p.alias||'Jugador')}</b><div class="small">${a.win?'Te ganó':'Lo frenaste'} · 🏆 ${a.d_def>0?'+':''}${a.d_def}</div></div></div>`});
  modal(h,[['Entendido',()=>{},'gold']]);
 }catch(e){}finally{NBDEF=0}
}
document.addEventListener('click',e=>{const t=e.target.closest('[data-nb]');if(!t)return;const k=t.dataset.nb,v=t.dataset.v;
 if(k==='in'||k==='up'||k==='forgot')nbAuth(k);else if(k==='out'){nbUpload(1).finally(()=>SB.auth.signOut())}else if(k==='sync'){NBX.dirty=1;nbUpload(1).then(()=>{nbPublish(1);openCuenta()})}
 else if(k==='jug')openJug();else if(k==='q')openJug((($('#nbq')||{}).value||'').trim().slice(0,16));else if(k==='pf')openPerfil(v);else if(k==='me'&&CU){nbPublish(1).then(()=>openPerfil(CU.id))}
 else if(k==='atk')nbAttack(v);else if(k==='cuenta')openCuenta();else if(k==='pw')nbNewPass();});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&e.target.id==='nbq')openJug(e.target.value.trim().slice(0,16))});
/* ---------- jefes de rango: uno cada 5 niveles, se vencen una sola vez ---------- */
const RBOSS=[{l:10,n:'General Hierro',f:'🎖️',p:1.5},{l:15,n:'Mariscal Tormenta',f:'⚡',p:2},{l:20,n:'Emperador de Acero',f:'👑',p:2.6},{l:25,n:'El Último Señor de la Guerra',f:'💀',p:3.4}];
function rbSpec(i){const r=RBOSS[i],L=Math.max(S.lvl,r.l),D=Math.round((25*Math.pow(L,1.6)+5)*r.p*dif().k),sp=enemySpec(D,L+2,9001+i*77);sp.style='nucleo';sp.map=['monte','rio','niebla','monte'][i];sp.hq*=1.6;sp.pw=D;return sp}
const rbRw=i=>({c:40000*(i+1)*(i+1),s:2500*(i+1),e:1500*(i+1)});
function rbHTML(){let h='<div class="cat">🎖️ Jefes de rango</div><p class="small" style="margin-top:0">Un jefe cada 5 niveles. Cada uno se vence una vez y da una pieza legendaria.</p>';
 RBOSS.forEach((r,i)=>{const ok=S.lvl>=r.l,dn=S.rbd&&S.rbd[i];h+=`<div class="erow"><div class="ef">${r.f}</div><div class="einfo"><b>${r.n}</b> <span class="tag">Nivel ${r.l}</span><div class="small">${dn?'✓ Vencido':ok?`🛡️${fmt(rbSpec(i).pw)} · ${['⛰️ Montaña','🌊 Río','🌑 Niebla','⛰️ Montaña'][i]} · 🎁 ${costPlain(rbRw(i))} + 🧰 legendaria`:`🔒 Se desbloquea en el nivel ${r.l}`}</div></div>${ok&&!dn?`<button class="btn sm red" data-a="enemy" data-v="r${i}">Atacar</button>`:''}</div>`});return h}
/* lo que viene: los próximos desbloqueos según el nivel */
function nextUnl(from,n){const L=[];for(const[k,d]of Object.entries(B))if(d.lvl>from&&!d.deco)L.push([d.lvl,d.e+' '+d.n]);
 L.push([12,'🏗️ Edificios a nivel 8'],[14,'⭐ Tropas élite nivel 6'],[18,'⭐ Tropas élite nivel 7']);for(const r of RBOSS)L.push([r.l,r.f+' Jefe: '+r.n]);for(const[e,r]of AVS)if(typeof r==='number'&&r>from)L.push([r,e+' Avatar nuevo']);
 return L.filter(x=>x[0]>from).sort((a,b)=>a[0]-b[0]).slice(0,n||4)}
const nextHTML=(from,n)=>{const L=nextUnl(from,n);return L.length?`<div class="nxt"><b>🔜 Lo que viene</b>${L.map(([l,t])=>`<div><span>Nv ${l}</span>${t}</div>`).join('')}</div>`:''};
function openCol(){
 let h=`<p class="small" style="margin-top:0">Cada grupo completo te da +5% de producción para siempre. Llevás <b>+${colDone()*5}%</b>.</p>`;
 for(const[n,us]of CG){const ok=us.every(u=>S.colu[u]);h+=`<div class="cat">${n} ${ok?'✓ +5%':'· '+us.filter(u=>S.colu[u]).length+'/'+us.length}</div><div class="colg">${us.map(u=>`<div class="${S.colu[u]?'':'nc'}">${ue(u)}<small>${S.colu[u]?U[u].n:'???'}</small></div>`).join('')}</div>`}
 h+=albHTML();openSheet('col','📖 Colección',h);
}
const fusHTML=()=>{const own=FUS.map(f=>f[1]).filter(u=>S.troops[u]>0);return '<div class="cat">🧬 Unidades de fusión</div>'+(own.map(u=>{const d=U[u];return `<div class="trow"><div class="te">${ue(u)}</div><div class="tinfo"><b>${d.n}</b> <span class="tc">×${S.troops[u]}</span><div class="small">${CI[d.cls]} ⚔️${d.dmg} ❤️${d.hp} 🎯${d.rng}${vsTxt(d)}</div></div></div>`}).join('')||'<p class="small">Todavía no tenés. Se crean solo combinando tropas.</p>')+'<div class="row2" style="margin-bottom:8px"><button class="btn" data-a="fusion">🧬 Fusión</button><button class="btn" data-a="col">📖 Colección</button></div>'};
/* ---------- islas en tiempo real: expediciones propias y disputas entre rivales ---------- */
const expDur=i=>(60+30*i)*1000;
function expTick(t){
 const L=$('#exps');if(!L||!tw)return;const k=tw/100,bx=N*50*k+OX,by=(N*25+110)*k;
 for(let n=S.exp.length-1;n>=0;n--){const x=S.exp[n];
  if(!x.rc&&t>x.s+(x.e-x.s)*.5){x.rc=1;if(Math.random()<.35&&S.isl[x.i].o>=0){x.rf=1;toast(`⚠️ ${S.enemies[S.isl[x.i].o].n} mandó refuerzos a ${ISL[x.i].n}`)}}
  if(t>=x.e&&!modalOpen&&!BT){S.exp.splice(n,1);expEnd(x)}}
 let h='';
 for(const x of S.exp){const[ix,iy]=islPos(x.i),p=Math.min(1,(t-x.s)/(x.e-x.s)),tr=Math.min(1,p/.4),X=bx+(ix*k+OX-bx)*tr,Y=by+(iy*k-by)*tr;
  for(const[dx,dy]of[[0,0],[-.32,.2],[.3,.24]])h+=`<div class="boat" style="font-size:${tw*.5}px;transform:translate(${(X+dx*tw).toFixed(0)}px,${(Y+dy*tw).toFixed(0)}px)">${x.nav?'🚢':'⛵'}</div>`+(tr<1?`<div class="wake" style="font-size:${tw*.5}px;transform:translate(${(X+dx*tw).toFixed(0)}px,${(Y+dy*tw).toFixed(0)}px)"></div>`:'');
  if(p>=.4)h+=`<div class="ifx" style="left:${ix*k+OX}px;top:${(iy-30)*k}px;font-size:${tw*.45}px"><b></b><i>💥</i><i>💥</i><i>🔥</i></div>`;
  h+=`<div class="ebar" style="left:${ix*k+OX}px;top:${(iy-92)*k}px"><b>${p<.4?'⛵ Navegando':'⚔️ Conquistando'}${x.rf?' ⚠️':''}</b><i><u style="width:${(p*100).toFixed(0)}%"></u></i>${ft(x.e-t)}</div>`}
 for(let i=0;i<ISL.length;i++){const w=S.isl[i].war;if(w&&S.enemies[w.by]){const[ix,iy]=islPos(i);h+=`<div class="ifx" style="left:${ix*k+OX}px;top:${(iy-30)*k}px;font-size:${tw*.45}px"><b></b><i>💥</i><i>💥</i><i>💥</i></div><div class="ebar war" style="left:${ix*k+OX}px;top:${(iy-92)*k}px"><b>⚔️ ${S.enemies[w.by].f} la disputa</b><br>${ft(w.end-t)}</div>`}}
 if(L._h!==h){L._h=h;L.innerHTML=h}
 islBadge();
}
function expEnd(x){
 const i=x.i,key='i'+i,e=target(key),mul={};const nb=x.nav?1.35:1;for(const u in x.army)mul[u]=[ulm(u)*1.2*nb,ulm(u)*(1+.25*S.tech.atk)*1.2*nb];
 const b=mkBattle(x.army,enemySpec(Math.round(eDef(e)*(x.rf?1.3:1)),e.lvl,seedOf(key,e.lvl)),mul);prepBattle(b);let g=0;while(!b.over&&g++<20000)stepBattle(b,.05);
 const surv={};for(const q of b.E)if(q.side===0&&q.hp>0)surv[q.kind]=(surv[q.kind]||0)+Math.ceil(q.hp/q.uhp-1e-9);
 let lost=0,tot=0;for(const u in x.army){tot+=x.army[u];const s=Math.min(x.army[u],surv[u]||0);S.troops[u]+=s;lost+=x.army[u]-s}
 if(b.over===1){const loot=mult(eLoot(e),1.5);gain(loot);S.isl[i].o=-1;S.isl[i].lc=now();S.isl[i].war=null;S.stats.won++;S.stats.islc=(S.stats.islc||0)+1;winStuff();sfx('win');
  modal(`<div class="win">¡ISLA CONQUISTADA!</div><p>Tu expedición tomó <b>${ISL[i].n}</b>.</p><p>Botín ×1,5: <b>${costPlain(loot)}</b></p><p class="small">Bajas: ${lost} de ${tot}</p>`,[['¡Bien ahí!',()=>{addXP(12*e.lvl);hud()},'gold']])}
 else{S.stats.lost++;lossStuff();sfx('lose');modal(`<div class="lose">EXPEDICIÓN FALLIDA</div><p><b>${ISL[i].n}</b> resistió${x.rf?' gracias a los refuerzos':''}.</p><p class="small">Volvieron ${tot-lost} de ${tot} tropas.</p>`,[['Volver','','red']])}
 hud();save();
}
function islWar(t){
 for(let i=0;i<ISL.length;i++){const s=S.isl[i],w=s.war;if(w&&t>=w.end){s.war=null;if(s.o>=0&&!S.exp.some(x=>x.i===i)&&S.enemies[w.by]){s.o=w.by;toast(`🏝️ ${S.enemies[w.by].n} conquistó ${ISL[i].n}`)}}}
 if(t<(S.wnext||0))return;S.wnext=t+(60+Math.random()*90)*1000*dif().sp;
 const c=[];for(let i=0;i<ISL.length;i++)if(S.isl[i].o>=0&&!S.isl[i].war&&!S.exp.some(x=>x.i===i))c.push(i);if(!c.length)return;
 const i=c[Math.random()*c.length|0],o=S.isl[i].o;let by=Math.random()*S.enemies.length|0;if(by===o)by=(by+1)%S.enemies.length;
 S.isl[i].war={by,end:t+(45+Math.random()*45)*1000};toast(`⚔️ ${S.enemies[by].f} ${S.enemies[by].n} ataca ${ISL[i].n}`);
}
/* ---------- héroes comandantes: uno activo, va a tus ataques, sube de nivel y tiene una habilidad ---------- */
const HER=[
 {k:'cmd1',f:'🎖️',n:'General Hierro',lv:5,cost:{c:20000,s:1000},pas:'Tus tropas de tierra hacen +3% de daño por nivel',abn:'Bombardeo de apertura',abd:'a los pocos segundos daña todas las defensas enemigas',ab:'bomb'},
 {k:'cmd2',f:'🦅',n:'Capitana Halcón',lv:8,cost:{c:45000,o:6000,s:2500},pas:'Tus aéreos tienen +4% de daño y vida por nivel',abn:'Lluvia de misiles',abd:'castiga a todas las tropas enemigas a los 4 segundos',ab:'mis'},
 {k:'cmd3',f:'🤖',n:'Doctor Voltio',lv:11,cost:{c:70000,s:5000,e:3000},pas:'Tus robots y mechas tienen +4% de vida por nivel',abn:'Reparación',abd:'cura a todo tu ejército cada 15 segundos',ab:'fix'}];
const cmdNeed=l=>100*l;
function cmdXP(k,x){const c=S.cmd[k];if(!c)return;c.xp+=x;while(c.lvl<10&&c.xp>=cmdNeed(c.lvl)){c.xp-=cmdNeed(c.lvl);c.lvl++;toast(`🎖️ ${U[k].n} subió a nivel ${c.lvl}`)}if(c.lvl>=10)c.xp=0}
function addHero(b){const k=S.cmdSel,c=k&&S.cmd[k];if(!c||(c.inj&&now()<c.inj))return;const hp=900*(1+.25*(c.lvl-1)),dmg=45*(1+.2*(c.lvl-1));
 b.E.push({side:0,kind:k,st:0,cls:'inf',x:5,y:10.2,hp,uhp:hp,m:1,dmg,rng:2.8,cd:.7,spd:.9,fly:0,air:1,vs:{inf:1.4,veh:1.2,mec:1.2,def:1.2},max:hp,t:0,rt:0,tg:null,hero:1});b.hero={k}}
function abTick(B,dt,fx){
 const a=B.ab;a.t+=dt;const mine=B.raid?1:0,live=fx&&BV;
 const say=()=>{if(live)toast(`${a.f} ${a.nm}!`)};
 if(a.k==='bomb'&&!a.n&&a.t>2.5){a.n=1;say();for(const x of B.E)if(x.side!==mine&&x.st&&x.hp>0){x.hp-=x.max*(.1+.02*a.lvl);if(live){const[px,py]=bpos(x.x,x.y);boom(px,py-btw*.35,1.3,0)}}}
 if(a.k==='mis'&&!a.n&&a.t>4){a.n=1;say();for(const x of B.E)if(x.side!==mine&&!x.st&&x.hp>0){x.hp-=x.max*(.12+.025*a.lvl);if(live){const[px,py]=bpos(x.x,x.y);boom(px,py-btw*.2,.8,0)}}}
 if(a.k==='fix'&&a.t>=15*(a.n+1)){a.n++;say();for(const x of B.E)if(x.side===mine&&!x.st&&x.hp>0){x.hp=Math.min(x.max,x.hp+x.max*(.08+.012*a.lvl));if(live){const[px,py]=bpos(x.x,x.y);for(let i=0;i<3;i++)fxAdd({k:'sp',x:px+(Math.random()-.5)*btw*.3,y:py-btw*.2,vx:0,vy:-.02*btw,life:650,col:'120,255,150'})}}}
}
function openCmd(){
 let h='<p class="small" style="margin-top:0">El héroe activo va a todos tus ataques, aplica su bonificación y usa su habilidad solo. Gana experiencia con cada victoria. Si cae en combate, queda herido 10 minutos.</p>';
 for(const H of HER){const c=S.cmd[H.k],act=S.cmdSel===H.k;
  h+=`<div class="trow" style="${act?'border-color:#f6b51e;background:#fff8d6':''}"><div class="te">${ue(H.k)}</div><div class="tinfo"><b>${H.f} ${H.n}</b>${c?` <span class="tag">Nv ${c.lvl}/10</span>`:''}<div class="small">${H.pas}.<br>⚡ <b>${H.abn}</b>: ${H.abd}.</div>`+
   (c?(c.lvl<10?`<div class="pb"><i style="width:${c.xp/cmdNeed(c.lvl)*100}%"></i></div><div class="small">${c.xp} / ${cmdNeed(c.lvl)} de experiencia</div>`:'<div class="small">⭐ Nivel máximo</div>')+(c.inj&&now()<c.inj?`<div class="small">🤕 Herido: vuelve en <b data-until="${c.inj}"></b></div>`:''):`<div class="small">${S.lvl<H.lv?`🔒 Nivel ${H.lv}`:costHTML(H.cost)}</div>`)+
   `</div>${c?(act?'<div class="small lockt">Activo ✓</div>':`<button class="btn sm gold" data-a="cmdsel" data-v="${H.k}">Elegir</button>`):S.lvl>=H.lv?`<button class="btn sm gold" data-a="cmdbuy" data-v="${H.k}">Reclutar</button>`:''}</div>`}
 openSheet('cmd','🎖️ Héroes comandantes',h);
}
/* ---------- árbol de investigación: tres ramas; en los niveles con dos opciones, elegir una bloquea la otra ---------- */
const RT={
 mil:{n:'⚔️ Militar',L:[['Entrenamiento',{atk:.05}],['Blindaje compuesto',{hp:.06}],[['Infantería de élite',{inf:.15}],['Fuerza blindada',{veh:.15}]],['Tácticas',{atk:.07}],[['Supremacía aérea',{air:.2}],['Ejército de acero',{mec:.2}]]]},
 eco:{n:'💰 Economía',L:[['Logística',{prod:.08}],['Obras rápidas',{bld:.12}],[['Comercio isleño',{isl:.25}],['Cofres veloces',{chest:.25}]],['Industria',{prod:.12}],[['Banca',{gold:.15}],['Saqueo',{loot:.15}]]]},
 def:{n:'🛡️ Defensa',L:[['Fortificación',{dhp:.08}],['Artillería',{ddmg:.08}],[['Muros reforzados',{dhp:.15}],['Torretas rápidas',{ddmg:.15}]],['Centro de mando',{hqhp:.25}],[['Bóveda',{vault:.5}],['Contraataque',{trof:.5}]]]}};
const RTT=[2,8,18,32,50],rsCost=i=>{const m=(i+1)*(i+1),c={c:5000*m,s:300*m};if(i>=2)c.e=150*m;return c};
const EFN={atk:'+{}% daño de tus tropas',hp:'+{}% vida de tus tropas',inf:'infantería +{}%',veh:'vehículos +{}%',air:'aéreos +{}%',mec:'robots +{}%',prod:'+{}% producción',bld:'obras {}% más rápidas',isl:'+{}% oro de islas',chest:'cofres {}% más rápidos',gold:'+{}% oro',loot:'+{}% botín',dhp:'defensas +{}% vida',ddmg:'defensas +{}% daño',hqhp:'centro de mando +{}% vida',vault:'te roban {}% menos',trof:'+{}% trofeos al defender'};
const effTxt=e=>Object.keys(e).map(k=>EFN[k].replace('{}',Math.round(e[k]*100))).join(', ');
let RSC=null;
const RS=()=>{if(RSC)return RSC;const r={};for(const bk in RT)(S.rs[bk]||[]).forEach((c,i)=>{const nd=RT[bk].L[i],e=Array.isArray(nd[0])?nd[c][1]:nd[1];for(const k in e)r[k]=(r[k]||0)+e[k]});for(let i=1;i<WR.length;i++)if(S.wr[i])for(const k in WR[i].e)r[k]=(r[k]||0)+WR[i].e[k];if(S.clan)r.prod=(r.prod||0)+.02*clanLvl();return RSC=r};
function applyRS(){RSC=null;const r=RS();CHT.forEach((c,i)=>c.t=[5,30,120][i]*60000*(1-(r.chest||0)))}
const rsRush=()=>S.rsq?Math.ceil(Math.max(0,S.rsq.end-now())/60000)*(120+25*S.lvl):0;
function rsTick(){const q=S.rsq;if(!q||now()<q.end)return;const a=S.rs[q.b]=S.rs[q.b]||[];a[q.i]=q.c;S.rsq=null;applyRS();sfx('done');toast(`🔬 Investigación lista: ${q.nm}`);save();if(sheet.kind==='res')openRes()}
function openRes(){
 const q=S.rsq;let h='<p class="small" style="margin-top:0">Se investiga de a una cosa por vez. En los niveles con dos opciones, elegir una bloquea la otra para siempre.</p>';
 if(q)h+=`<div class="istat">🔬 Investigando <b>${q.nm}</b>: faltan <b data-until="${q.end}"></b><button class="btn gold" data-a="rsr">⚡ Terminar ya · 💰${fmt(rsRush())}</button></div>`;
 for(const bk in RT){const Bk=RT[bk],ch=S.rs[bk]||[];h+=`<div class="cat">${Bk.n}</div>`;
  Bk.L.forEach((nd,i)=>{const multi=Array.isArray(nd[0]),done=i<ch.length,cur=i===ch.length,opts=multi?nd:[nd],inq=q&&q.b===bk&&q.i===i;
   h+=`<div class="trow" style="${done?'opacity:.75':cur?'':'opacity:.45'}"><div class="tinfo"><b>Nivel ${i+1}</b>${multi?' <span class="tag">Elegí una</span>':''}<div class="small">${opts.map((o,j)=>`${done?(ch[i]===j?'✅':'🚫'):inq&&q.c===j?'⏳':'▫️'} <b>${o[0]}</b>: ${effTxt(o[1])}`).join('<br>')}</div>${cur&&!q?`<div class="small">${costHTML(rsCost(i))} · ⏱ ${RTT[i]} min</div>`:''}</div>${cur&&!q?`<div class="tbtn">${opts.map((o,j)=>`<button class="btn sm gold" data-a="rs" data-v="${bk}.${j}">${multi?o[0]:'Investigar'}</button>`).join('')}</div>`:''}</div>`})}
 openSheet('res','🔬 Investigación',h);
}
/* ---------- equipamiento: piezas que caen de cofres y jefes; cada tipo de tropa lleva arma, blindaje y motor ---------- */
const EQN={arma:{inf:'Fusil táctico',veh:'Cañón perforante',air:'Misiles guiados',mec:'Láser de pulso'},blindaje:{inf:'Chaleco cerámico',veh:'Placas reactivas',air:'Fuselaje blindado',mec:'Coraza de titanio'},motor:{inf:'Botas de asalto',veh:'Turbina',air:'Postcombustión',mec:'Servomotores'}};
const SLE={arma:'🔫',blindaje:'🛡️',motor:'⚙️'},SLN={arma:'daño',blindaje:'vida',motor:'velocidad'},ECL={inf:'infantería',veh:'vehículos',air:'aéreos',mec:'robots'};
const RAR=[['Común','#7d8790',.06],['Rara','#3d86c9',.12],['Épica','#a04fe0',.2],['Legendaria','#d48f10',.32]];
function giveItem(min){if(S.inv.length>=40){toast('🧰 Tu arsenal está lleno: desarmá alguna pieza');return null}
 const r=Math.random(),rr=Math.max(min||0,r<.55?0:r<.85?1:r<.97?2:3),it={id:S.iid=(S.iid||0)+1,s:['arma','blindaje','motor'][Math.random()*3|0],r:rr,c:['inf','veh','air','mec'][Math.random()*4|0],v:+(RAR[rr][2]*(.85+Math.random()*.3)).toFixed(3),u:''};S.inv.push(it);return it}
const itTxt=it=>`<b style="color:${RAR[it.r][1]}">${SLE[it.s]} ${EQN[it.s][it.c]}</b> <span class="small">${RAR[it.r][0]} · ${ECL[it.c]} · +${Math.round(it.v*100)}% ${SLN[it.s]}</span>`;
const scrapV=it=>(it.r+1)*(it.r+1)*60;
const eqTxt=u=>{const l=S.inv.filter(i=>i.u===u);return l.length?' · '+l.map(i=>`<span style="color:${RAR[i.r][1]}">${SLE[i.s]}</span>`).join(''):''};
function openArs(){
 let h='<p class="small" style="margin-top:0">Las piezas salen de los cofres y de los jefes. Cada tipo de tropa puede llevar un arma, un blindaje y un motor de su clase.</p>';
 const used=S.inv.filter(i=>i.u&&U[i.u]);if(used.length){h+='<div class="cat">Equipado</div>';for(const it of used)h+=`<div class="trow"><div class="te">${ue(it.u)}</div><div class="tinfo">${itTxt(it)}<div class="small">en ${U[it.u].n}</div></div><button class="btn sm" data-a="uneq" data-v="${it.id}">Quitar</button></div>`}
 const free=S.inv.filter(i=>!i.u).sort((a,b)=>b.r-a.r||b.v-a.v);
 h+=`<div class="cat">Inventario · ${free.length}</div>`+(free.map(it=>`<div class="trow" style="border-color:${RAR[it.r][1]}"><div class="tinfo">${itTxt(it)}</div><div class="tbtn"><button class="btn sm gold" data-a="eq" data-v="${it.id}">Equipar</button><button class="btn sm" data-a="scrap" data-v="${it.id}">Desarmar ⚙️${scrapV(it)}</button></div></div>`).join('')||'<p class="small">Vacío. Abrí cofres para conseguir piezas.</p>');
 openSheet('ars','🧰 Arsenal',h);
}
function eqPick(id){
 const it=S.inv.find(i=>i.id===id);if(!it)return;const us=Object.keys(U).filter(u=>(!U[u].hero||U[u].fus)&&U[u].cls===it.c&&S.troops[u]>0);
 if(!us.length){toast(`No tenés tropas de ${ECL[it.c]}`);return}closeSheet();
 modal(`<div class="mtitle">Equipar</div><p>${itTxt(it)}</p><p class="small">¿En qué tropa? Si ya tiene una pieza en ese lugar, vuelve al inventario.</p>`,us.map(u=>[U[u].n,()=>{for(const o of S.inv)if(o.u===u&&o.s===it.s)o.u='';it.u=u;save();toast(`${SLE[it.s]} Equipado en ${U[u].n}`);setTimeout(openArs,0)}]).concat([['Cancelar',()=>setTimeout(openArs,0)]]));
}
/* Bonificaciones de investigación, equipamiento y héroe: se aplican a tu bando al empezar cada batalla */
function boostBattle(b){
 const R=RS(),mine=b.raid?1:0,H=b.hero&&HER.find(q=>q.k===b.hero.k),hl=b.hero?S.cmd[b.hero.k].lvl:0;
 for(const x of b.E){if(x.side!==mine)continue;
  if(x.st){if(b.raid){const m=1+(R.dhp||0)+(x.kind==='hq'?(R.hqhp||0):0);x.hp*=m;x.uhp*=m;x.dmg*=1+(R.ddmg||0)}}
  else{let dm=1+(R.atk||0)+(R[x.cls]||0),hm=1+(R.hp||0)+(R[x.cls]||0)*.5;
   for(const it of S.inv)if(it.u===x.kind){if(it.s==='arma')dm+=it.v;else if(it.s==='blindaje')hm+=it.v;else x.spd*=1+it.v*.8}
   if(H){if(H.ab==='bomb'&&(x.cls==='inf'||x.cls==='veh'))dm+=.03*hl;if(H.ab==='mis'&&x.cls==='air'){dm+=.04*hl;hm+=.04*hl}if(H.ab==='fix'&&x.cls==='mec')hm+=.04*hl}
   x.dmg*=dm;x.hp*=hm;x.uhp*=hm}
  x.max=x.hp}
 if(H&&!b.raid)b.ab={k:H.ab,t:0,n:0,lvl:hl,f:H.f,nm:H.abn};
}
/* ---------- clanes con bots: aportás tropas, recibís refuerzos, guerra semanal y tienda con medallas ---------- */
const CLANS=[{n:'Lobos de Acero',f:'🐺'},{n:'Águilas Rojas',f:'🦅'},{n:'Tiburones',f:'🦈'},{n:'Dragones Negros',f:'🐉'}];
const CMEM=['Tano','Fede','Luli','Mati','Caro','Nico','Juani','Sofi','Rocío','Bruno','Agus','Meli'];
const clanLvl=()=>S.clan?Math.min(10,1+Math.floor(Math.sqrt(S.clan.xp/120))):0;
const clanMem=i=>{const R=rng32(i*101+7),l=[];while(l.length<6){const n=CMEM[R()*CMEM.length|0];if(!l.includes(n))l.push(n)}return l.map(n=>({n,tr:Math.round(300+R()*2500)}))};
const cwRate=s=>4+rng32(s)()*3;
const cwBots=(s,w,hrs)=>Math.floor(Math.min(168,hrs)*cwRate(s*31+w));
function cwState(){const w=week(),hrs=(now()-(w*7*864e5+4*864e5))/36e5,ci=S.clan.i,ri=(ci+1+w%3)%4;
 if(!S.cw||S.cw.w!==w)S.cw={w,st:0};return{w,hrs,ri,us:S.cw.st*3+cwBots(ci+1,w,hrs),them:Math.round(cwBots(ri+11,w,hrs)*dif().k)}}
function clanTick(){
 if(!S.clan||modalOpen||BT)return;const t=now();
 if(S.cw&&S.cw.w!==week()){const w=S.cw.w,ci=S.clan.i,ri=(ci+1+w%3)%4,us=S.cw.st*3+cwBots(ci+1,w,168),them=Math.round(cwBots(ri+11,w,168)*dif().k),win=us>=them;
  S.cw={w:week(),st:0};if(win){S.clan.med+=60;addChest(2)}else S.clan.med+=15;save();
  modal(`<div class="mtitle">⚔️ Fin de la guerra de clanes</div><p>${CLANS[ci].f} ${us} contra ${them} ${CLANS[ri].f}</p><p><b>${win?'¡Ganó tu clan! +60 medallas y un cofre de oro':'Perdió tu clan. +15 medallas por participar'}</b></p>`,[['¡Vamos!','','gold']]);return}
 if(t>(S.clan.rq||0)){S.clan.rq=t+(12+Math.random()*8)*60000;const us=easyUnits(),u=us[Math.random()*us.length|0],n=2+(Math.random()*4|0),m=clanMem(S.clan.i)[Math.random()*6|0];if(u){S.troops[u]+=n;toast(`${CLANS[S.clan.i].f} ${m.n} te mandó ${n} ${U[u].n}`);save()}}
}
const CSHOP=[['Cofre de oro','💎',60,()=>addChest(2)],['Pieza épica','🧰',100,()=>{const it=giveItem(2);if(it)toast('🧰 '+EQN[it.s][it.c])}],['Paquete de 10 tropas','🎖️',40,()=>{const us=easyUnits();for(let i=0;i<10;i++){const u=us[Math.random()*us.length|0];if(u)S.troops[u]++}}]];
function openClan(){
 let h='';
 if(!S.clan){h='<p class="small" style="margin-top:0">Unite a un clan: tus compañeros te mandan refuerzos, aportás tropas a cambio de medallas, el nivel del clan te da producción extra y cada semana hay guerra contra otro clan.</p>';
  CLANS.forEach((c,i)=>{h+=`<div class="erow"><div class="ef">${c.f}</div><div class="einfo"><b>${c.n}</b><div class="small">${clanMem(i).map(m=>m.n).join(', ')}</div></div><button class="btn sm gold" data-a="cjoin" data-v="${i}">Unirse</button></div>`});
  openSheet('clan','🛡️ Clanes',h);return}
 const C=CLANS[S.clan.i],L=clanLvl(),need=Math.pow(L,2)*120,prev=Math.pow(L-1,2)*120,W=cwState(),R=CLANS[W.ri];
 h+=`<div class="mcard"><div class="mnum">CLAN · NIVEL ${L}</div><div class="mt">${C.f} ${C.n}</div>${L<10?`<div class="pb"><i style="width:${Math.min(100,(S.clan.xp-prev)/(need-prev)*100)}%"></i></div>`:''}<div class="small">Bonificación del clan: +${2*L}% de producción · 🏅 ${S.clan.med} medallas</div></div>`;
 h+=`<div class="cat">⚔️ Guerra de la semana · termina en ${fd(seasonEnd()-now())}</div><div class="trow"><div class="tinfo"><b>${C.f} ${W.us}</b> contra <b>${W.them} ${R.f}</b> ${R.n}<div class="pb"><i style="width:${W.us/Math.max(1,W.us+W.them)*100}%"></i></div><div class="small">Cada batalla que ganes esta semana suma 3 puntos. Tus compañeros también suman.</div></div></div>`;
 const own=Object.keys(U).filter(u=>!U[u].hero&&S.troops[u]>=5).sort((a,b)=>U[b].atk-U[a].atk).slice(0,3);
 h+='<div class="cat">🤝 Aportar tropas</div>'+(own.map(u=>`<div class="trow"><div class="te">${ue(u)}</div><div class="tinfo"><b>5 ${U[u].n}</b><div class="small">+${Math.max(1,Math.round(U[u].atk/4))} medallas</div></div><button class="btn sm gold" data-a="cdon" data-v="${u}">Aportar</button></div>`).join('')||'<p class="small">Necesitás al menos 5 tropas de un tipo para aportar.</p>');
 h+='<div class="cat">🏪 Tienda del clan</div>'+CSHOP.map((s,i)=>`<div class="trow"><div class="te">${s[1]}</div><div class="tinfo"><b>${s[0]}</b><div class="small">🏅 ${s[2]} medallas</div></div><button class="btn sm gold" data-a="cbuy" data-v="${i}" ${S.clan.med>=s[2]?'':'disabled'}>Comprar</button></div>`).join('');
 h+='<div class="cat">👥 Miembros</div><div class="rank">'+clanMem(S.clan.i).concat([{n:myTag(),tr:S.trof||0,me:1}]).sort((a,b)=>b.tr-a.tr).map((m,i)=>`<div class="${m.me?'me':''}"><span>${i+1}.</span> ${m.n} <b>🏆${m.tr}</b></div>`).join('')+'</div><button class="btn" data-a="cleave" style="margin-top:8px">Salir del clan</button>';
 openSheet('clan',`${C.f} Clan`,h);
}
/* ---------- mapa del mundo: regiones que se conquistan de a una, vecinas a las tuyas, y dan bonificaciones permanentes ---------- */
const WR=[{n:'Valle Natal',f:'🏡',e:{}},{n:'Llanura Ámbar',f:'🌾',e:{prod:.05}},{n:'Montes Grises',f:'⛰️',e:{dhp:.06}},{n:'Costa Azul',f:'🏖️',e:{isl:.1}},
 {n:'Bosque Negro',f:'🌲',e:{inf:.06}},{n:'Desierto Rojo',f:'🏜️',e:{veh:.06}},{n:'Minas del Norte',f:'⛏️',e:{gold:.06}},{n:'Puerto Franco',f:'⚓',e:{loot:.08}},
 {n:'Picos Helados',f:'🏔️',e:{air:.08}},{n:'Fábrica Abandonada',f:'🏭',e:{mec:.08}},{n:'Gran Ciudad',f:'🏙️',e:{atk:.05}},{n:'Trono del Mundo',f:'👑',e:{atk:.06,hp:.06,prod:.06}}];
const WP=i=>[i%4,i/4|0],wAdj=(a,b)=>{const[c1,r1]=WP(a),[c2,r2]=WP(b);return Math.abs(c1-c2)+Math.abs(r1-r2)===1};
const wMine=i=>i===0||!!S.wr[i],wOpen=i=>!wMine(i)&&WR.some((r,j)=>wMine(j)&&wAdj(i,j));
const wDef=i=>Math.round((250+i*i*170)*(1+.12*S.lvl)*dif().k),wLvl=i=>3+i*2;
let wSel=-1;
function openWorld(){
 let h='<p class="small" style="margin-top:0">Conquistá regiones vecinas a las tuyas. Cada región te da una bonificación permanente.</p><svg class="wmap" viewBox="0 0 400 260"><rect width="400" height="260" rx="14" fill="#6fb8e0"/>';
 WR.forEach((r,i)=>{const[c,rw]=WP(i),x=55+c*96,y=50+rw*80,m=wMine(i),o=wOpen(i),col=m?'#4f8fd6':o?'#d9a441':'#a0473c';
  h+=`<g class="wreg${wSel===i?' sel':''}" data-a="wsel" data-v="${i}"><path d="M${x-44},${y} L${x-22},${y-36} L${x+22},${y-36} L${x+44},${y} L${x+22},${y+36} L${x-22},${y+36} Z" fill="${col}" stroke="#2a1808" stroke-width="3"/><text x="${x}" y="${y+2}" text-anchor="middle" font-size="22">${r.f}</text><text x="${x}" y="${y+24}" text-anchor="middle" class="wn">${m?'✓ ':''}${r.n.length>13?r.n.slice(0,12)+'.':r.n}</text></g>`});
 h+='</svg><div class="small" style="margin:6px 0">🟦 tuyas · 🟨 podés atacar · 🟥 lejanas</div>';
 const sum={};for(let i=0;i<WR.length;i++)if(wMine(i))for(const k in WR[i].e)sum[k]=(sum[k]||0)+WR[i].e[k];
 if(wSel>=0){const r=WR[wSel];h+=`<div class="trow"><div class="te">${r.f}</div><div class="tinfo"><b>${r.n}</b><div class="small">${Object.keys(r.e).length?effTxt(r.e):'Tu región de origen'}${wMine(wSel)?' · ✓ tuya':` · 🛡️${wDef(wSel)}`}</div></div>${wOpen(wSel)?`<button class="btn sm red" data-a="enemy" data-v="w${wSel}">Atacar</button>`:''}</div>`}
 h+=`<div class="istat">Bonificaciones del mundo: <b>${Object.keys(sum).length?effTxt(sum):'ninguna todavía'}</b></div>`;
 openSheet('world','🌍 Mapa del mundo',h);
}
/* ---------- modo asedio: oleadas cada vez más fuertes contra tu base, hasta que caiga tu centro de mando ---------- */
const sgPow=w=>Math.round((22*Math.pow(S.lvl,1.5)+15)*(.45+.22*w)*dif().k);
function nextWave(b){
 if(b.wave>=60)return false;b.wave++;const army=raidArmy(sgPow(b.wave),S.lvl+Math.floor(b.wave/3)),mul={};for(const k in army)mul[k]=[1,1];
 const tb=mkBattle(army,{defs:[],units:{},k:1,hq:1},mul);
 for(const x of tb.E)if(x.side===0){x.ix=b.E.length;x.tm=1;x.yaw=x.yawT=-Math.PI/2;b.E.push(x)}
 for(const x of b.E)if(x.side===1&&x.hp>0)x.hp=Math.min(x.max,x.hp+x.max*.15);
 b.over=0;b.time=0;b.done=0;if(BT===b){$('#btname').textContent=`🏰 Modo asedio · oleada ${b.wave}`;toast(`🏰 ¡Oleada ${b.wave}!`);sfx('alert')}return true;
}
/* ---------- defensa de la torre ---------- */
const TDK=[['muro',40],['trampa',70],['torre',110],['bunker',150],['llamat',190],['mortero',220],['tesla',300],['tfranco',260],['laser',380]];
const tdList=()=>TDK.filter(([k])=>B[k]&&B[k].lvl<=S.lvl);
function startTD(){const t=now();if(t<(S.tdn||0)){toast(`🗼 La próxima defensa está disponible en ${ft(S.tdn-t)}`);return}
 S.tdn=t+10*60000;const army=raidArmy(sgPow(1),S.lvl),mul={};for(const k in army)mul[k]=[1,1];
 const b=mkBattle(army,mySpec(false),mul);b.raid=1;b.siege=1;b.td=1;b.wave=1;b.dp=400+40*S.lvl;b.tdSel=tdList()[0][0];b.gap=performance.now()+9000;b.e={n:'Defensa de la torre',f:'🗼'};b.live=1;
 closeSheet();save();runBattle(b,'🗼 Defensa de la torre · oleada 1');tdUI(b);toast('🔨 Poné defensas antes de que llegue la oleada')}
function tdOk(b,x,y){const c=Math.floor(x),r=Math.floor(y);if(c<0||c>=GB||r<0||r>GB-4)return false;if(b.blk.has(c+','+r))return false;
 for(const o of b.E)if(o.hp>0&&((o.st&&Math.floor(o.x)===c&&Math.floor(o.y)===r)||(!o.st&&o.side===0&&Math.hypot(o.x-x,o.y-y)<1.3)))return false;return true}
function tdUI(b){const el=$('#btdep');if(!el)return;if(!b.td||b.over){el.classList.remove('on');return}el.classList.add('on');const g=b.gap&&b.gap>performance.now();
 el.innerHTML=`<div class="dph">🔨 <b>${fmt(b.dp)}</b> puntos · ${g?`oleada ${b.wave} en <b>${Math.ceil((b.gap-performance.now())/1000)}s</b>`:`oleada ${b.wave} en curso`} · tocá un casillero libre de tu base</div><div class="dpl">${tdList().map(([k,c])=>`<button class="dpc ${k===b.tdSel?'on':''} ${b.dp<c?'off':''}" data-tk="${k}"><i>${B[k].e}</i><b>${c}</b><small>${B[k].n}</small></button>`).join('')}${g?'<button class="dpc all" data-tk="!"><i>▶️</i><b>Ya</b><small>empezar</small></button>':''}</div>`}
function tdTap(cx,cy){const b=BT;if(!b||!b.td||b.over)return;const r=$('#btmap').getBoundingClientRect(),lx=(cx-r.left)/bz,ly=(cy-r.top)/bz,a=(lx-(GB+1)*btw/2)/(btw/2),s=(ly-btw*1.1)/(btw/4),x=(a+s)/2,y=(s-a)/2;
 const it=TDK.find(t=>t[0]===b.tdSel);if(!it)return;if(b.dp<it[1]){toast('🔨 No te alcanzan los puntos');return}if(!tdOk(b,x,y)){toast('📍 Ahí no se puede: elegí un casillero libre de tu base');return}
 const k=it[0],q=DEFS[k],m=1+S.lvl*.12,c=Math.floor(x),rr=Math.floor(y),o={side:1,kind:k,st:1,cls:'def',x:c+.5,y:rr+.5,hp:q.hp*m,uhp:q.hp*m,m:1,dmg:q.dmg*m,rng:q.rng,cd:q.cd,spd:0,fly:0,air:q.air,vs:q.vs,t:Math.random()*q.cd,rt:0,tg:null,ix:b.E.length,tm:0,yaw:0,ny:0,hid:0};
 o.max=o.hp;b.E.push(o);if(k==='muro')b.wc.set(c+','+rr,o);b.dp-=it[1];sfx('build');hammer(2);const[px,py]=bpos(o.x,o.y);for(let i=0;i<6;i++)fxAdd({k:'sm',x:px+(Math.random()-.5)*btw*.5,y:py,vx:(Math.random()-.5)*.02*btw,vy:-.004*btw,life:600,r0:btw*.05,r1:btw*.14,col:'210,200,180'});tdUI(b)}
function tdEnd(b){const w=b.wave-(b.E[0].hp<=0?1:0),L=S.lvl,r={c:Math.round(180*w*L),s:Math.round(10*w*L)};if(w>=5)r.e=Math.round(5*w*L);
 const best=Math.max(S.tdb||0,w),rec=w>(S.tdb||0);S.tdb=best;gain(r);addXP(10*w);if(w>=10)giveItem(2);sfx(w>=3?'win':'lose');save();hud();
 const html=`<div class="${w>=3?'win':'lose'}">${w>=3?'¡BIEN DEFENDIDO!':'CAYÓ TU BASE'}</div><p>Aguantaste <b>${w}</b> ${w===1?'oleada':'oleadas'}${rec?' · 🏆 ¡récord nuevo!':` · récord ${best}`}</p><p>Premio: <b>${costPlain(r)}</b>${w>=10?' + 🧰 pieza':''}</p>`;
 const btns=[['Volver a la base',()=>{$('#bt').classList.remove('on');BT=null;hud()},'gold']];if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns)}
function startSiege(live){
 const t=now();if(t<(S.sg.next||0)){toast(`🏰 El próximo asedio está disponible en ${ft(S.sg.next-t)}`);return}
 S.sg.next=t+20*60000;const army=raidArmy(sgPow(1),S.lvl),mul={};for(const k in army)mul[k]=[1,1];
 const b=mkBattle(army,mySpec(false),mul);b.raid=1;b.siege=1;b.wave=1;b.e={n:'Asedio',f:'🏰'};b.live=live;closeSheet();save();runBattle(b,'🏰 Modo asedio · oleada 1');
}
const sgBots=()=>S.enemies.map(e=>({n:e.f+' '+e.n,w:3+Math.round(e.lvl*.55)}));
function siegeEnd(b){
 const sv=b.wave-1,L=S.lvl,r={c:Math.round(250*L*sv*(1+sv*.08))+200,s:Math.round(25*L*sv),e:Math.round(12*L*sv)},rec=sv>(S.sg.best||0);if(rec)S.sg.best=sv;
 gain(r);addXP(8*sv);let rey='';if(sv>=12&&!S.troops.drey){S.troops.drey=1;rey='<p><b>👑 ¡Ganaste el Dragón rey!</b></p>'}sfx(sv>=3?'win':'lose');save();hud();
 const rows=sgBots().concat([{n:myTag(),w:S.sg.best||0,me:1}]).sort((a,c)=>c.w-a.w);
 const html=`<div class="mtitle">🏰 Fin del asedio</div><p>Aguantaste <b>${sv}</b> oleada${sv===1?'':'s'}${rec?' · <b>¡nuevo récord!</b>':''}</p><p>Premio: <b>${costPlain(r)}</b></p>${rey}<div class="rank">${rows.slice(0,8).map((q,i)=>`<div class="${q.me?'me':''}"><span>${i+1}.</span> ${q.n} <b>${q.w}</b></div>`).join('')}</div>`;
 const btns=[['Volver a la base',()=>{$('#bt').classList.remove('on');BT=null;hud()},'gold']];
 if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns);
}
function openSiege(){
 const t=now(),cd=t<(S.sg.next||0),rows=sgBots().concat([{n:myTag(),w:S.sg.best||0,me:1}]).sort((a,c)=>c.w-a.w);
 modal(`<div class="mtitle">🏰 Modo asedio</div><p>Oleadas cada vez más fuertes atacan tu base. Te defienden tus defensas y la mitad de tus tropas, sin perderlas. Entre oleada y oleada tus defensas se reparan un poco.</p><p class="small">Tu récord: <b>${S.sg.best||0}</b> oleadas${cd?` · próximo asedio en ${ft(S.sg.next-t)}`:''}</p><div class="rank">${rows.slice(0,8).map((q,i)=>`<div class="${q.me?'me':''}"><span>${i+1}.</span> ${q.n} <b>${q.w}</b></div>`).join('')}</div>`,
  cd?[['Cerrar']]:[['👁️ Jugar en vivo',()=>setTimeout(()=>startSiege(1),0),'gold'],['⚡ Resultado rápido',()=>setTimeout(()=>startSiege(0),0)],['Cerrar']]);
}
/* ---------- campaña con historia: capítulos con diálogos y enemigos con un estilo propio ---------- */
const STO=[
 {n:'El desembarco',f:'🏖️',p:.7,defs:['torre','torre','muro','trampa'],units:{soldado:8,marine:3},rw:{c:3000},
  pre:[['🎖️','Sargento Ramos','Comandante, llegamos a la costa. El Coronel Mostaza tiene un puesto de avanzada en la playa.'],['🤠','Coronel Mostaza','¡Nadie desembarca en mis playas! Mis torres los van a barrer.'],['🎖️','Sargento Ramos','Sus torres castigan a la infantería. Mandá tanques adelante.']],
  post:[['🎖️','Sargento Ramos','¡Playa asegurada! Ahora vamos por el puente del General Bigotes.']]},
 {n:'El puente de acero',f:'🌉',p:1,defs:['bunker','bunker','muro','muro','mortero'],units:{tanque:4,pesado:2},rw:{c:8000,s:500},
  pre:[['🧔','General Bigotes','Mis blindados no dejan pasar ni una mosca por este puente.'],['🎖️','Sargento Ramos','Los tanques son duros, pero los bazuqueros y los robots artilleros los perforan.']],
  post:[['🎖️','Sargento Ramos','El puente es nuestro. Ojo: la Capitana Tormenta controla el cielo del otro lado.']]},
 {n:'Cielos en llamas',f:'🔥',p:1.2,defs:['antiaereo','antiaereo','antiaereo','torre'],units:{helicoptero:3,caza:2},rw:{c:15000,s:900},item:2,
  pre:[['👩‍✈️','Capitana Tormenta','Mis antiaéreos derriban cualquier cosa que vuele.'],['🎖️','Sargento Ramos','Entonces no vamos por aire: tierra y artillería contra sus antiaéreos.']],
  post:[['👩‍✈️','Capitana Tormenta','Esto no termina acá… el Barón Bulón los espera en su fortaleza.']]},
 {n:'La fortaleza del Barón',f:'🏰',p:1.5,hqx:3,defs:['bunker','bunker','mortero','tesla','laser','muro','muro','trampa'],units:{robot:2,marine:6},rw:{c:30000,e:2000},
  pre:[['🤴','Barón Bulón','Mi fortaleza resistió cien asedios. Su centro de mando es el triple de fuerte.'],['🎖️','Sargento Ramos','Vamos a necesitar todo: tanques pesados, artilleros y paciencia.']],
  post:[['🤴','Barón Bulón','¡Imposible! … Pero el Dragón Negro despertó. Ni ustedes pueden con él.']]},
 {n:'El último dragón',f:'🐉',p:1.9,defs:['antiaereo','antiaereo','laser','tesla'],units:{dragon:2,dfuego:1,dhielo:1},rw:{c:60000},item:3,
  pre:[['🐲','Dragón Negro','Ssss… cenizas. Eso van a ser.'],['🎖️','Sargento Ramos','Es el combate final, comandante. Cazas y dragones eléctricos contra sus alas.']],
  post:[['🎖️','Sargento Ramos','¡Lo logramos! El mundo es libre gracias a usted, comandante.']]}];
function storySpec(i){
 const c=STO[i],pw=Math.round((25*Math.pow(S.lvl,1.6)+5)*c.p*dif().k),slots=[[5,3],[3,4],[7,4],[2,6],[8,6],[5,6],[4,2],[6,2]];
 let base=0;for(const k of c.defs)base+=DEFS[k].r;for(const k in c.units)base+=U[k].atk*c.units[k];
 const sc=Math.max(.6,Math.min(60,pw/Math.max(1,base))),um={};for(const k in c.units)um[k]=[sc,sc];
 return{defs:c.defs.map((k,j)=>({k,c:slots[j][0],r:slots[j][1],m:sc})),units:c.units,um,k:sc,hq:(400+4*pw)*(c.hqx||1),hqd:12,pw};
}
function talk(lines,done){let i=0;const nx=()=>{if(i>=lines.length){if(done)done();return}const[f,n,t]=lines[i++];modal(`<div class="dlg"><div class="dlf">${f}</div><div><b>${n}</b><p>${t}</p></div></div>`,[[i<lines.length?'Siguiente ▶':'¡Vamos!',()=>setTimeout(nx,0),'gold']])};nx()}
function openStory(){
 let h='<p class="small" style="margin-top:0">Una historia en cinco capítulos. Cada uno tiene enemigos con un estilo propio: leé los consejos antes de atacar.</p>';
 STO.forEach((c,i)=>{const done=i<S.story,cur=i===S.story;h+=`<div class="erow" style="${cur?'':'opacity:'+(done?.75:.45)}"><div class="ef">${c.f}</div><div class="einfo"><b>Capítulo ${i+1}: ${c.n}</b><div class="small">Premio: ${costPlain(c.rw)}${c.item?' + pieza '+RAR[c.item][0].toLowerCase():''}</div></div>${done?'<div class="small lockt">✓</div>':cur?`<button class="btn sm red" data-a="story" data-v="${i}">Jugar</button>`:'<div class="small lockt">🔒</div>'}</div>`});
 if(S.story>=STO.length)h+='<div class="done">🏆 ¡Terminaste la historia!</div>';
 openSheet('story','📖 Historia',h);
}
const hubBtns=()=>'<div class="row4"><button class="btn gold" data-a="world">🌍 Mundo</button><button class="btn gold" data-a="clan">🛡️ Clan</button><button class="btn gold" data-a="siege">🏰 Asedio</button><button class="btn gold" data-a="storyo">📖 Historia</button></div>';
/* ---------- islas a la vista: botón con lista, ubicar cada isla en el mapa y combates visibles ---------- */
function goIsl(i){
 const wd=$('#world'),[x,y]=islPos(i),k=tw/100,cx=(x*k+OX)*S.zoom,cy=y*k*S.zoom,mw=$('#mapw');
 const ox=mw.offsetLeft,oy=mw.offsetTop;wd.scrollTo({left:ox+cx-wd.clientWidth/2,top:oy+cy-wd.clientHeight/2,behavior:'smooth'});
 setTimeout(()=>{const el=document.querySelector(`.isl[data-isl="${i}"]`);if(el){el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse')}},350);
}
function openIslands(){
 const t=now();let h='';
 if(S.exp.length){h+='<div class="cat">⛵ Tus expediciones</div>';for(const x of S.exp)h+=`<div class="trow"><div class="te">⛵</div><div class="tinfo"><b>${ISL[x.i].n}</b><div class="small">${t<x.s+(x.e-x.s)*.4?'Navegando':'Conquistando'} · llega en ${ft(x.e-t)}${x.rf?' · ⚠️ con refuerzos':''}</div></div><button class="btn sm" data-a="goisl" data-v="${x.i}">📍 Ver</button></div>`}
 const wars=ISL.map((d,i)=>i).filter(i=>S.isl[i].war&&S.enemies[S.isl[i].war.by]);
 if(wars.length){h+='<div class="cat">⚔️ Disputas entre rivales</div>';for(const i of wars){const w=S.isl[i].war;h+=`<div class="trow"><div class="te">⚔️</div><div class="tinfo"><b>${ISL[i].n}</b><div class="small">${S.enemies[w.by].f} ${S.enemies[w.by].n} la ataca · ${ft(w.end-t)}</div></div><button class="btn sm" data-a="goisl" data-v="${i}">📍 Ver</button></div>`}}
 h+='<div class="cat">🏝️ Todas las islas</div>';
 ISL.forEach((d,i)=>{const s=S.isl[i],mine=s.o<0,o=S.enemies[s.o],busy=S.exp.some(x=>x.i===i);
  h+=`<div class="erow"><div class="ef">🏝️</div><div class="einfo"><b>${d.n}</b> ${mine?'<span class="tag" style="background:#2f7fe0">Tuya</span>':`<span class="tag">${o.f} Nv ${o.lvl}</span>`}<div class="small">${mine?`Te da +${islRate(i)}💰 por minuto`:`🛡️${islDef(i)} · +${islRate(i)}💰 por minuto`}</div></div><button class="btn sm" data-a="goisl" data-v="${i}">📍</button>${mine||busy?'':`<button class="btn sm gold" data-a="enemy" data-v="i${i}">⛵ Conquistar</button>`}</div>`});
 openSheet('isls','🏝️ Islas',h);
}
function islBadge(){const n=S.exp.length+ISL.filter((d,i)=>S.isl[i].war).length,b=$('#bislb');if(b){b.textContent=n;b.style.display=n?'':'none'}}
/* ---------- Kraken colosal: jefe compartido de fin de semana (sábado y domingo) ---------- */
function krWin(t){const d=new Date(t),w=d.getDay();if(w!==6&&w!==0)return null;const s=new Date(d);s.setHours(0,0,0,0);s.setDate(s.getDate()-(w===6?0:1));const st=s.getTime();return{id:dayStr(st),st,en:st+2*864e5}}
function krNext(t){const d=new Date(t);d.setHours(0,0,0,0);for(let k=0;k<8&&d.getDay()!==6;k++)d.setDate(d.getDate()+1);return d.getTime()}
function krState(){const t=now(),w=krWin(t);if(!w||S.lvl<3)return null;if(!S.kr||S.kr.id!==w.id)S.kr={id:w.id,d:0,p0:0,n:0,day:'',got:{}};if(S.kr.day!==dayStr(t)){S.kr.day=dayStr(t);S.kr.n=0}return w}
const KTRY=3,KTIER=[['🥉 Bronce',30],['🥈 Plata',110],['🥇 Oro',220]];
const krEq=k=>k&&k.p0?k.d/(k.p0*50):0;
function krPct(w){const f=Math.min(1,Math.max(0,(now()-w.st)/(w.en-w.st))),bots=90*Math.pow(f,.9);let ot=0;for(const r of PLY)if(r.kev===w.id&&r.kp>0)ot+=Math.min(12,r.kd/(r.kp*50)*2);return Math.min(100,bots+Math.min(14,krEq(S.kr)*2)+ot)}
function krSpec(){const P=Math.max(60,armyPow(S.troops)),sp=enemySpec(Math.max(120,P*.6),Math.max(3,Math.min(20,S.lvl+1)),(S.kr?S.kr.id.length*977:7)+S.lvl);sp.hq=1e8;sp.hqd=Math.max(4,P/60);sp.krk=1;return sp}
const krBtn=()=>{const w=krState();if(S.lvl<3)return '';if(!w)return `<div class="small" style="margin:-4px 0 10px">🐙 El <b>Kraken colosal</b> llega el sábado · faltan ${ft(krNext(now())-now())}</div>`;const p=krPct(w);return `<button class="btn" data-a="kraken" style="margin:0 0 10px;background:linear-gradient(#8e5bd6,#4a2a8c);color:#fff;box-shadow:inset 0 1px 0 #fff5,0 0 0 1px #2a1550,0 3px 0 #2a1550">🐙 Kraken colosal · vida ${Math.max(0,Math.ceil(100-p))}% · ${S.kr.n<KTRY?`te quedan ${KTRY-S.kr.n} ataques hoy`:'volvé mañana'}</button>`};
function openKraken(){
 const w=krState();if(!w){toast('🐙 El Kraken colosal aparece los fines de semana');return}
 const k=S.kr,p=krPct(w),dead=p>=100,eq=krEq(k);
 let h=`<div class="krhead"><svg viewBox="-60 -80 220 210">${spr('krakenB',1,6,1,1)}</svg><div><b>Kraken colosal</b><div class="small">Todos los jugadores le pegan juntos durante el fin de semana. Si cae, todos los que participaron ganan el premio mayor.</div></div></div>`;
 h+=`<div class="istat"><div class="krbar"><i style="width:${Math.max(0,100-p).toFixed(1)}%"></i></div><div class="small" style="margin-top:4px">${dead?'💀 ¡El Kraken cayó!':`❤️ Le queda ${Math.max(0,100-p).toFixed(1)}% de vida`} · termina en <b data-until="${w.en}"></b></div></div>`;
 h+=`<div class="istat">⚔️ Tu daño total: <b>${fmt(k.d)}</b>${k.p0?` · aporte al jefe: <b>${Math.min(14,eq*2).toFixed(1)}%</b>`:''}<br><span class="small">Ataques de hoy: ${k.n} de ${KTRY}. Tus tropas no mueren contra el Kraken: es un combate de desgaste de 2 minutos.</span></div>`;
 h+=`<button class="btn red" data-a="enemy" data-v="k" ${k.n>=KTRY||dead?'disabled':''}>🐙 Atacar al Kraken</button>`;
 h+='<div class="cat">Premios por tu daño</div>';
 KTIER.forEach((t,i)=>{const need=k.p0?t[1]*k.p0:0,ok=k.p0&&k.d>=need,got=k.got[i];h+=`<div class="trow"><div class="tinfo"><b>${t[0]}</b><div class="small">${k.p0?`Daño ${fmt(need)}`:'Atacá una vez para calcular la meta'} · ${['💰 oro y una pieza rara','🧰 pieza épica y acero','🧰 pieza legendaria y el marco 🐙 Kraken'][i]}</div>${k.p0?`<div class="pb"><i style="width:${Math.min(100,k.d/need*100)}%"></i></div>`:''}</div>${got?'<div class="small lockt">Cobrado ✓</div>':`<button class="btn sm gold" data-a="krclaim" data-v="${i}" ${ok?'':'disabled'}>Cobrar</button>`}</div>`});
 h+=`<div class="trow"><div class="tinfo"><b>💀 Kraken derrotado</b><div class="small">Para todos los que lo atacaron: pieza legendaria, bandera y aspecto 🐙 Kraken</div></div>${k.got.kill?'<div class="small lockt">Cobrado ✓</div>':`<button class="btn sm gold" data-a="krclaim" data-v="kill" ${dead&&k.d>0?'':'disabled'}>Cobrar</button>`}</div>`;
 openSheet('kraken','🐙 Kraken colosal',h);
}
function krClaim(v){const k=S.kr,w=krState();if(!k||!w||k.got[v])return;const L=S.lvl;
 if(v==='kill'){if(krPct(w)<100||!k.d)return;k.got.kill=1;giveItem(3);S.cosU.kr=1;toast('🐙 ¡Premio del Kraken! Desbloqueaste bandera y aspecto Kraken')}
 else{const i=+v;if(!k.p0||k.d<KTIER[i][1]*k.p0)return;k.got[i]=1;if(i===0){gain({c:3000*L});giveItem(1)}else if(i===1){gain({s:120*L,e:60*L});giveItem(2)}else{giveItem(3);S.cosU.krg=1;toast('🖼️ Desbloqueaste el marco Kraken')}}
 sfx('done');hud();save();openKraken()}
function krEnd(b){const hq=b.E[0],d=Math.round(hq.max-hq.hp),k=S.kr;if(k){if(!k.p0)k.p0=Math.max(50,armyPow(b.army));k.d+=d;k.n++}
 if(b.hero&&S.cmd[b.hero.k])cmdXP(b.hero.k,4*S.lvl);S.stats.krk=(S.stats.krk||0)+1;sfx('win');addXP(20+S.lvl*2);save();hud();
 const html=`<div class="mtitle">🐙 Fin del ataque</div><p>Le hiciste <b>${fmt(d)}</b> de daño al Kraken.</p><p class="small">Total del fin de semana: ${fmt(k?k.d:d)} · ataques de hoy: ${k?k.n:1} de ${KTRY}</p>`;
 const btns=[['Volver',()=>{$('#bt').classList.remove('on');BT=null;hud();setTimeout(openKraken,50)},'gold']];
 if(b.live){MQ.unshift({html,btns});nextModal()}else modal(html,btns)}
function krTick(){const w=krWin(now());if(w&&S.lvl>=3&&S.krSeen!==w.id&&!modalOpen&&!BT){S.krSeen=w.id;sfx('alert');toast('🐙 ¡Apareció el Kraken colosal! Entrá a Atacar');save()}}

/* ---------- cosméticos: banderas, aspectos de edificios y marcos que se desbloquean con logros ---------- */
const COS={
 flag:{n:'🚩 Color de bandera',L:[['Azul','#2f7fe0'],['Rojo','#d9452b',0],['Verde','#3f9a2f',7],['Negro pirata','#2b2b2b',8],['Violeta','#8e56c2',10],['Dorado','#f6c21e',2],['Kraken','#2fd0c0','kr']]},
 skin:{n:'🏠 Aspecto de edificios',L:[['Original',null],['Acero',['#6b7c8f',.32],5],['Selva',['#3f7a2a',.3],9],['Nieve',['#ffffff',.4],14],['Dorado',['#f6c21e',.33],6],['Volcán',['#b8401c',.3],13],['Kraken',['#7a3fa0',.32],'kr']]},
 frame:{n:'🖼️ Marco de perfil',L:[['Sin marco',''],['Plata','0 0 0 3px #dfe5ea,0 0 10px #ffffff99',3],['Oro','0 0 0 3px #f6c21e,0 0 14px #f6b51e',1],['Fuego','0 0 0 3px #ff6a1a,0 0 16px #ff3b00',12],['Leyenda','0 0 0 3px #b06cf0,0 0 16px #b06cf0',2],['Kraken','0 0 0 3px #2fd0c0,0 0 16px #7a3fa0','krg']]}};
const cosOk=r=>r==null||(typeof r==='number'?!!S.ach[r]:!!S.cosU[r]);
const cosReq=r=>typeof r==='number'?'Logro: '+ACH[r][0]:r==='kr'?'Derrotar al Kraken colosal':'🥇 Oro en el Kraken colosal';
const cosCur=k=>{const i=S.cos[k]||0,o=COS[k].L[i];return o&&cosOk(o[2])?o:COS[k].L[0]};
let SKC=null;
function cosApply(){const r=document.documentElement;r.style.setProperty('--myflag',cosCur('flag')[1]);const f=cosCur('frame')[1];const ls=$('#lvlstar');if(ls)ls.style.boxShadow=f||'';const sk=cosCur('skin')[1],key=sk?sk.join():'';if(SKC!==key){const first=SKC===null;SKC=key;if(!first)layout(1)}}
const skinA=s=>{const sk=cosCur('skin')[1];return sk?s.replace(/#[0-9a-fA-F]{6}\b/g,c=>GLS[c.toLowerCase()]?c:mixc(c,sk[0],sk[1])):s};
function cosPrev(k,o){if(k==='flag')return `<i class="cflag" style="background:${o[1]}"></i>`;if(k==='frame')return `<i class="cframe" style="box-shadow:${o[1]||'none'}">⭐</i>`;return `<i class="cskin" style="background:${o[1]?mixc('#f3e2c0',o[1][0],o[1][1]*1.6):'#f3e2c0'}"></i>`}
function openCos(){let h='<p class="small" style="margin-top:0">Se desbloquean con logros y en el Kraken colosal. Tocá uno para usarlo.</p>';
 for(const k in COS){h+=`<div class="cat">${COS[k].n}</div><div class="cosg">`;COS[k].L.forEach((o,i)=>{const ok=cosOk(o[2]),on=(S.cos[k]||0)===i&&ok;h+=`<div class="cos ${on?'on':''} ${ok?'':'lock'}" ${ok?`data-a="cos" data-v="${k}:${i}"`:''}>${cosPrev(k,o)}<b>${o[0]}</b>${ok?'':`<small>🔒 ${cosReq(o[2])}</small>`}</div>`});h+='</div>'}
 openSheet('cos','🎨 Personalizar',h)}

/* ---------- copia de seguridad: un código de texto con toda la partida ---------- */
async function bkMake(){const j=JSON.stringify(S);
 if(window.CompressionStream){try{const st=new Blob([j]).stream().pipeThrough(new CompressionStream('gzip')),u=new Uint8Array(await new Response(st).arrayBuffer());let s='';for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return 'GDB1z:'+btoa(s)}catch(e){}}
 return 'GDB1:'+btoa(unescape(encodeURIComponent(j)))}
async function bkRead(code){code=(code||'').replace(/\s+/g,'');let j;
 if(code.startsWith('GDB1z:')){const bin=atob(code.slice(6)),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);j=await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text()}
 else if(code.startsWith('GDB1:'))j=decodeURIComponent(escape(atob(code.slice(5))));else throw new Error('formato');
 const r=JSON.parse(j);if(!r||r.v!==1||!Array.isArray(r.g)||!r.troops)throw new Error('datos');return r}
function openBackup(){
 openSheet('backup','💾 Copia de seguridad',`<p class="small" style="margin-top:0">Guardá este código en un lugar seguro (notas, WhatsApp a vos mismo, un mail). Con él recuperás tu partida en cualquier navegador o celular.</p>
 <div class="cat">Tu código</div><textarea id="bkout" class="bkta" readonly>Generando…</textarea><div class="row2"><button class="btn gold" data-a="bkcopy">📋 Copiar</button><button class="btn" data-a="bkdl">⬇️ Descargar</button></div>
 <div class="cat">Recuperar una partida</div><textarea id="bkin" class="bkta" placeholder="Pegá acá tu código"></textarea><button class="btn red" data-a="bkimp">♻️ Cargar esta partida</button><p class="small">Ojo: reemplaza la partida actual.</p>`);
 bkMake().then(c=>{const t=$('#bkout');if(t)t.value=c})}
function bkCopy(){const t=$('#bkout');if(!t||!t.value.startsWith('GDB'))return;const ok=()=>toast('📋 Código copiado');
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t.value).then(ok,()=>{t.select();try{document.execCommand('copy');ok()}catch(e){toast('Seleccioná el texto y copialo a mano')}});else{t.select();try{document.execCommand('copy');ok()}catch(e){toast('Seleccioná el texto y copialo a mano')}}}
async function bkDl(){const t=$('#bkout');if(!t||!t.value.startsWith('GDB'))return;const fn='guerra-de-bases-'+dayStr(now())+'.txt';
 if(window.claude&&window.claude.use){let dl=null;try{dl=await window.claude.use('downloads')}catch(e){}if(dl){try{await dl.save({filename:fn,data:t.value});toast('⬇️ Copia guardada')}catch(e){toast('No se guardó: podés usar Copiar')}return}}
 try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t.value],{type:'text/plain'}));a.download='guerra-de-bases-'+dayStr(now())+'.txt';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);toast('⬇️ Descargando la copia')}catch(e){toast('No se pudo descargar: usá Copiar')}}
function bkImp(){const t=$('#bkin');if(!t||!t.value.trim()){toast('Pegá primero el código');return}
 bkRead(t.value).then(r=>{closeSheet();modal(`<div class="mtitle">¿Cargar esta partida?</div><p>Nivel <b>${r.lvl}</b> · ${r.stats&&r.stats.won||0} victorias.</p><p class="small">Tu partida actual se reemplaza.</p>`,[['Sí, cargar',()=>{const sy=S.sync;S=r;migrate();S.sync=sy;PL=null;MV=null;save();layout();hud();sndBtn();cosApply();setTimeout(()=>cloudSave(1),0);toast('♻️ Partida recuperada')},'red'],['Cancelar']])}).catch(()=>toast('❌ Ese código no es válido'))}

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
