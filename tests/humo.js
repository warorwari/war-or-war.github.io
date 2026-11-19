// Prueba rápida sin navegador real: arranca el juego, cierra los carteles y abre algunas pantallas.
const {JSDOM}=require('jsdom'),fs=require('fs'),path=require('path');
const d=new JSDOM(fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/'});
const errs=[];d.window.addEventListener('error',e=>errs.push(e.message));const q=s=>d.window.document.querySelector(s),click=e=>{if(!e)throw new Error('falta elemento');e.dispatchEvent(new d.window.MouseEvent('click',{bubbles:true}))};
setTimeout(()=>{try{for(let i=0;i<3&&q('#modal.on');i++)click(q('#mbox [data-mb]'));click(q('#b-col'));click(q('#b-atk'));click(q('[data-a="atab"][data-v="camp"]'));click(q('#b-troops'));click(q('#b-build'))}catch(e){errs.push(e.message)}
 setTimeout(()=>{const bad=errs.filter(m=>!/getContext|Not implemented/.test(m));console.log(bad.length?'❌ humo: '+bad.join(' | '):'✅ humo: arranca y abre pantallas sin errores');d.window.close();process.exit(bad.length?1:0)},1500)},800);
