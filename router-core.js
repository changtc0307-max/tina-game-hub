(()=>{
const nativeAdd=window.addEventListener.bind(window),legacy=new Map();
function source(){try{const s=document.currentScript?.src||'';return s.split('/').pop().split('?')[0]||'unknown'}catch(e){return'unknown'}}
window.addEventListener=function(type,fn,opts){if(type==='hashchange'){const key=source();if(!legacy.has(key))legacy.set(key,[]);legacy.get(key).push(fn);return}return nativeAdd(type,fn,opts)};
function invoke(file){for(const fn of legacy.get(file)||[]){try{fn.call(window,new Event('hashchange'))}catch(e){console.error('legacy route failed',file,e)}}}
function ready(name){return typeof window[name]==='function'}
function restoreShell(){
 document.querySelector('.pkBoard')?.remove();document.querySelector('.territoryBoard')?.remove();document.querySelector('#lyricBoard')?.remove();document.querySelector('#priceBoard')?.remove();document.querySelector('#timelineBoard')?.remove();
 const controls=document.querySelector('.controls'),score=document.querySelector('.score'),finish=document.querySelector('#finish'),map=document.querySelector('#map');
 if(controls)controls.style.display='';if(score)score.style.display='';if(finish){finish.style.display='';finish.textContent='交卷'}if(map)map.style.display='block';
}
let token=0;
function route(){
 const mine=++token,q=(location.hash||'').slice(1);
 const retry=()=>{if(mine===token)setTimeout(()=>routeSame(mine,q),25)};
 routeSame(mine,q,retry);
}
function routeSame(mine,q,retry){
 if(mine!==token)return;
 const wait=retry||(()=>setTimeout(()=>{if(mine===token)routeSame(mine,q)},25));
 if(!document.querySelector('#home')||!document.querySelector('#game')||typeof window.resetUI!=='function'){wait();return}
 restoreShell();
 if(!q){currentGame=null;game.style.display='none';home.style.display='block';resetUI();restoreShell();return}
 const base=['countries','capitals','japan','us','aov','831','bestards','cosmos','samlee','fahrenheit','sasha'];
 if(base.includes(q)){
   if((q==='fahrenheit'||q==='sasha')&&(!window.MUSIC_GAMES||!MUSIC_GAMES[q])){wait();return}
   currentGame=q;resetUI();restoreShell();home.style.display='none';game.style.display='flex';start(q);if(window.TinaGuard)TinaGuard.markActive();return
 }
 if(q==='taiwan'||q==='pk-taiwan'){
   const fn=q==='taiwan'?'startTaiwanSolo':'startTaiwanPK';if(!ready(fn)){wait();return}currentGame=q;window[fn]();if(window.TinaGuard)TinaGuard.markActive();return
 }
 if(q==='china'){
   if(!ready('startChina')){wait();return}currentGame=q;startChina();if(window.TinaGuard)TinaGuard.markActive();return
 }
 if(q==='timeline'||q==='pk-timeline'){
   const fn=q==='timeline'?'startTimelineSolo':'startTimelinePK';if(!ready(fn)){wait();return}currentGame=q;window[fn]();return
 }
 if(q==='price'||q==='pk-price'){
   const fn=q==='price'?'startPriceSolo':'startPricePK';if(!ready(fn)){wait();return}currentGame=q;window[fn]();return
 }
 const lm=q.match(/^(831|bestards|cosmos|samlee|fahrenheit|sasha)-lyrics-(guess|fill)(-pk)?$/);
 if(lm){if(!ready('startLyricGame')||!window.MUSIC_GAMES||!MUSIC_GAMES[lm[1]]){wait();return}currentGame=q;startLyricGame(lm[1],lm[2],!!lm[3]);return}
 if(q.startsWith('territory-')){if(!(legacy.get('territory.js')||[]).length){wait();return}currentGame=q;invoke('territory.js');if(window.TinaGuard)TinaGuard.markActive();return}
 if(q.startsWith('pk-')){if(!(legacy.get('pk.js')||[]).length){wait();return}currentGame=q;resetUI();restoreShell();invoke('pk.js');if(!document.querySelector('.pkBoard')){wait();return}if(window.TinaGuard)TinaGuard.markActive();return}
 currentGame=null;game.style.display='none';home.style.display='block';resetUI();restoreShell();
}
nativeAdd('hashchange',e=>{e.stopImmediatePropagation();route()});
nativeAdd('DOMContentLoaded',route);nativeAdd('load',route);setTimeout(route,0);
window.TinaRouter={route};
})();