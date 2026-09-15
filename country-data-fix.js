(()=>{
// Country roster / map compatibility patch.
// The game roster is 193 UN members + Palestine + Vatican + Taiwan + Kosovo = 197 entries.
const EXTRA_COUNTRIES=[
  {id:'020',code:'AD',zh:'安道爾',en:'Andorra',capital:'Andorra la Vella',capitalZh:'安道爾城'},
  {id:'499',code:'ME',zh:'蒙特內哥羅',en:'Montenegro',capital:'Podgorica',capitalZh:'波德里查'}
];
for(const x of EXTRA_COUNTRIES){
  if(!DATA.some(d=>d.code===x.code))DATA.push(x);
  CAP_TW[x.capital]=x.capitalZh;
}

// Taiwan is not in the World Bank country API used by GDP PK, so use the
// official 2024 DGBAS figure (US$33,983) instead of dropping Taiwan.
const TAIWAN_GDP_PER_CAPITA_2024=33983;

// world-atlas 110m intentionally omits many microstates. Redirect only the
// world-country topology to 50m, which contains Taiwan, Singapore, Vatican,
// Andorra and other small sovereign states while remaining mobile-friendly.
const nativeFetch=window.fetch.bind(window);
window.fetch=async function(input,init){
  const raw=typeof input==='string'?input:(input?.url||'');
  let url=raw;
  if(/world-atlas@2\/countries-110m\.json/.test(url)){
    url=url.replace('countries-110m.json','countries-50m.json');
  }
  const response=await nativeFetch(url,init);
  if(!response.ok)return response;

  if(/world-atlas@2\/countries-50m\.json/.test(url)){
    const data=await response.clone().json();
    // Natural Earth 50m has Kosovo geometry but no numeric id; normalize it
    // to the code already used by the game's country roster.
    for(const g of (data?.objects?.countries?.geometries||[])){
      if(!g.id&&/kosovo/i.test(g?.properties?.name||''))g.id='383';
    }
    return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json'}});
  }

  if(/api\.worldbank\.org\/v2\/country\/all\/indicator\/NY\.GDP\.PCAP\.CD/.test(url)){
    const data=await response.clone().json();
    if(Array.isArray(data?.[1])&&!data[1].some(r=>r?.country?.id==='TW')){
      data[1].push({country:{id:'TW',value:'Taiwan'},countryiso3code:'TWN',date:'2024',value:TAIWAN_GDP_PER_CAPITA_2024,unit:'',obs_status:'',decimal:1});
    }
    return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json'}});
  }
  return response;
};

const duplicateCodes=DATA.map(x=>x.code).filter((x,i,a)=>a.indexOf(x)!==i);
const duplicateIds=DATA.map(x=>x.id).filter((x,i,a)=>a.indexOf(x)!==i);
if(DATA.length!==197||duplicateCodes.length||duplicateIds.length){
  console.warn('Country roster audit warning',{count:DATA.length,duplicateCodes,duplicateIds});
}
})();

// Central hash router. It is installed here because this file is loaded immediately
// before app.js, so later modules cannot race each other on hashchange anymore.
(()=>{
const nativeAdd=window.addEventListener.bind(window),legacy=new Map();
function source(){try{const s=document.currentScript?.src||'';return s.split('/').pop().split('?')[0]||'unknown'}catch(e){return'unknown'}}
window.addEventListener=function(type,fn,opts){if(type==='hashchange'){const key=source();if(!legacy.has(key))legacy.set(key,[]);legacy.get(key).push(fn);return}return nativeAdd(type,fn,opts)};
function invoke(file){for(const fn of legacy.get(file)||[]){try{fn.call(window,new Event('hashchange'))}catch(e){console.error('legacy route failed',file,e)}}}
function restoreShell(){document.querySelector('.pkBoard')?.remove();document.querySelector('.territoryBoard')?.remove();document.querySelector('#lyricBoard')?.remove();document.querySelector('#priceBoard')?.remove();document.querySelector('#timelineBoard')?.remove();const controls=document.querySelector('.controls'),score=document.querySelector('.score'),f=document.querySelector('#finish'),m=document.querySelector('#map');if(controls)controls.style.display='';if(score)score.style.display='';if(f){f.style.display='';f.textContent='交卷'}if(m)m.style.display='block'}
let token=0;
function route(){const mine=++token,q=(location.hash||'').slice(1);routeSame(mine,q)}
function routeSame(mine,q){if(mine!==token)return;const wait=()=>setTimeout(()=>{if(mine===token)routeSame(mine,q)},25);if(!document.querySelector('#home')||!document.querySelector('#game')||typeof window.resetUI!=='function'){wait();return}restoreShell();if(!q){currentGame=null;game.style.display='none';home.style.display='block';resetUI();restoreShell();return}
const base=['countries','capitals','japan','us','aov','831','bestards','cosmos','samlee','fahrenheit','sasha'];if(base.includes(q)){if((q==='fahrenheit'||q==='sasha')&&(!window.MUSIC_GAMES||!MUSIC_GAMES[q])){wait();return}currentGame=q;resetUI();restoreShell();home.style.display='none';game.style.display='flex';start(q);if(window.TinaGuard)TinaGuard.markActive();return}
if(q==='taiwan'||q==='pk-taiwan'){const fn=q==='taiwan'?'startTaiwanSolo':'startTaiwanPK';if(typeof window[fn]!=='function'){wait();return}currentGame=q;window[fn]();if(window.TinaGuard)TinaGuard.markActive();return}
if(q==='china'){if(typeof window.startChina!=='function'){wait();return}currentGame=q;startChina();if(window.TinaGuard)TinaGuard.markActive();return}
if(q==='timeline'||q==='pk-timeline'){const fn=q==='timeline'?'startTimelineSolo':'startTimelinePK';if(typeof window[fn]!=='function'){wait();return}currentGame=q;window[fn]();return}
if(q==='price'||q==='pk-price'){const fn=q==='price'?'startPriceSolo':'startPricePK';if(typeof window[fn]!=='function'){wait();return}currentGame=q;window[fn]();return}
const lm=q.match(/^(831|bestards|cosmos|samlee|fahrenheit|sasha)-lyrics-(guess|fill)(-pk)?$/);if(lm){if(typeof window.startLyricGame!=='function'||!window.MUSIC_GAMES||!MUSIC_GAMES[lm[1]]){wait();return}currentGame=q;startLyricGame(lm[1],lm[2],!!lm[3]);return}
if(q.startsWith('territory-')){if(!(legacy.get('territory.js')||[]).length){wait();return}currentGame=q;invoke('territory.js');if(window.TinaGuard)TinaGuard.markActive();return}
if(q.startsWith('pk-')){if(!(legacy.get('pk.js')||[]).length){wait();return}currentGame=q;resetUI();restoreShell();invoke('pk.js');if(!document.querySelector('.pkBoard')){wait();return}if(window.TinaGuard)TinaGuard.markActive();return}
currentGame=null;game.style.display='none';home.style.display='block';resetUI();restoreShell()}
nativeAdd('hashchange',e=>{e.stopImmediatePropagation();route()});nativeAdd('DOMContentLoaded',route);nativeAdd('load',route);setTimeout(route,0);window.TinaRouter={route};
})();