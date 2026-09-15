(()=>{
// Country roster / map compatibility patch.
const EXTRA_COUNTRIES=[
  {id:'020',code:'AD',zh:'安道爾',en:'Andorra',capital:'Andorra la Vella',capitalZh:'安道爾城'},
  {id:'499',code:'ME',zh:'蒙特內哥羅',en:'Montenegro',capital:'Podgorica',capitalZh:'波德里查'}
];
for(const x of EXTRA_COUNTRIES){if(!DATA.some(d=>d.code===x.code))DATA.push(x);CAP_TW[x.capital]=x.capitalZh}
const TAIWAN_GDP_PER_CAPITA_2024=33983;
const nativeFetch=window.fetch.bind(window);
window.fetch=async function(input,init){const raw=typeof input==='string'?input:(input?.url||'');let url=raw;if(/world-atlas@2\/countries-110m\.json/.test(url))url=url.replace('countries-110m.json','countries-50m.json');const response=await nativeFetch(url,init);if(!response.ok)return response;if(/world-atlas@2\/countries-50m\.json/.test(url)){const data=await response.clone().json();for(const g of(data?.objects?.countries?.geometries||[]))if(!g.id&&/kosovo/i.test(g?.properties?.name||''))g.id='383';return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json'}})}if(/api\.worldbank\.org\/v2\/country\/all\/indicator\/NY\.GDP\.PCAP\.CD/.test(url)){const data=await response.clone().json();if(Array.isArray(data?.[1])&&!data[1].some(r=>r?.country?.id==='TW'))data[1].push({country:{id:'TW',value:'Taiwan'},countryiso3code:'TWN',date:'2024',value:TAIWAN_GDP_PER_CAPITA_2024,unit:'',obs_status:'',decimal:1});return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json'}})}return response};
const duplicateCodes=DATA.map(x=>x.code).filter((x,i,a)=>a.indexOf(x)!==i),duplicateIds=DATA.map(x=>x.id).filter((x,i,a)=>a.indexOf(x)!==i);if(DATA.length!==197||duplicateCodes.length||duplicateIds.length)console.warn('Country roster audit warning',{count:DATA.length,duplicateCodes,duplicateIds});
})();

// Safari-safe navigation guard. This block intentionally runs before app.js and all
// other hash routers, so cancelled Back navigation cannot erase an in-progress game.
(()=>{
let active=false,finished=false,restoring=false,bypass=false,gameUrl='';
const gameVisible=()=>{const g=document.getElementById('game');return !!g&&getComputedStyle(g).display!=='none'};
const confirmLeave=()=>window.confirm('確定要離開這局嗎？\n目前的作答進度與已公布答案會消失。');
const confirmReveal=msg=>window.confirm(msg||'確定要公布答案嗎？\n公布後這局就會結束，無法繼續作答。');
function markActive(){active=true;finished=false;gameUrl=location.href}
function markFinished(){finished=true;active=false;gameUrl=''}
window.TinaGuard={confirmLeave,confirmReveal,markActive,markFinished};
function routeFromTarget(target){if(target?.dataset?.hash)return target.dataset.hash;if(target?.tagName==='A'){const h=target.getAttribute('href')||'';if(h.startsWith('#'))return h.slice(1)}const card=target?.closest?.('.card'),key=(card?.getAttribute('href')||'').replace(/^#/,'');if(!key)return'';return target.classList?.contains('pkBtn')?'pk-'+key:key}
document.addEventListener('click',e=>{if(bypass||gameVisible())return;const target=e.target.closest('#home button[data-hash],#home .modeBtns button,#home a.card');if(!target)return;const route=routeFromTarget(target);if(!route)return;e.preventDefault();e.stopImmediatePropagation();const old=location.href;history.pushState({tinaGame:true,route},'','#'+route);markActive();window.dispatchEvent(new HashChangeEvent('hashchange',{oldURL:old,newURL:location.href}))},true);
window.addEventListener('popstate',e=>{if(bypass)return;if(restoring){e.stopImmediatePropagation();return}if(!active||finished)return;e.stopImmediatePropagation();if(confirmLeave()){active=false;gameUrl='';window.dispatchEvent(new HashChangeEvent('hashchange',{oldURL:'',newURL:location.href}))}else{restoring=true;history.forward();setTimeout(()=>restoring=false,350)}},true);
window.addEventListener('hashchange',e=>{if(restoring)e.stopImmediatePropagation()},true);
document.addEventListener('click',e=>{const back=e.target.closest('.back');if(!back||bypass||!gameVisible())return;e.preventDefault();e.stopImmediatePropagation();if(active&&!finished&&!confirmLeave())return;active=false;finished=false;gameUrl='';bypass=true;history.back();setTimeout(()=>bypass=false,300)},true);
window.addEventListener('beforeunload',e=>{if(active&&!finished&&!bypass){e.preventDefault();e.returnValue=''}});
})();