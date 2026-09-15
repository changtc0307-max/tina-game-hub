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

// Navigation guard: never intercept entry into a game. It becomes active only after
// a game route has rendered, so normal card/button handlers and dynamic music menus work.
(()=>{
let active=false,finished=false,bypass=false,previousHash='';
const gameVisible=()=>{const g=document.getElementById('game');return !!g&&getComputedStyle(g).display!=='none'};
const confirmLeave=()=>window.confirm('確定要離開這局嗎？\n目前的作答進度與已公布答案會消失。');
const confirmReveal=msg=>window.confirm(msg||'確定要公布答案嗎？\n公布後這局就會結束，無法繼續作答。');
function markActive(){active=true;finished=false}
function markFinished(){finished=true;active=false}
window.TinaGuard={confirmLeave,confirmReveal,markActive,markFinished};

// Record the route we came from, but do not prevent, stop or synthesize the entry click.
document.addEventListener('click',e=>{if(gameVisible())return;const t=e.target.closest('#home a.card,#home button[data-hash],#home .modeBtns button');if(!t)return;previousHash=location.hash||''},true);

// Once a game is actually visible, arm protection. No pushState is created here.
const observer=new MutationObserver(()=>{if(!active&&!finished&&gameVisible()&&location.hash)markActive()});
observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['style']});
window.addEventListener('hashchange',()=>setTimeout(()=>{if(!active&&!finished&&gameVisible()&&location.hash)markActive()},0));

// In-page back is fully controlled and always has a deterministic fallback to home.
document.addEventListener('click',e=>{const back=e.target.closest('.back');if(!back||bypass||!gameVisible())return;e.preventDefault();e.stopImmediatePropagation();if(active&&!finished&&!confirmLeave())return;active=false;finished=false;bypass=true;location.hash=previousHash&&previousHash!==location.hash?previousHash:'';setTimeout(()=>bypass=false,50)},true);

// Browser Back cannot be cancelled reliably on every Safari history shape without
// corrupting routing. Ask when popstate fires; if confirmed let the destination render.
window.addEventListener('popstate',e=>{if(bypass||!active||finished)return;if(!confirmLeave()){history.forward();return}active=false;finished=false},true);
window.addEventListener('beforeunload',e=>{if(active&&!finished&&!bypass){e.preventDefault();e.returnValue=''}});
})();