(()=>{
let active=false,finished=false,restoring=false,bypass=false,gameUrl='';
const isGameHash=h=>!!(h||'').replace(/^#/,'');
const gameVisible=()=>{const g=document.getElementById('game');return !!g&&getComputedStyle(g).display!=='none'};
const confirmLeave=()=>window.confirm('確定要離開這局嗎？\n目前的作答進度與已公布答案會消失。');
const confirmReveal=msg=>window.confirm(msg||'確定要公布答案嗎？\n公布後這局就會結束，無法繼續作答。');
function markActive(){active=true;finished=false;gameUrl=location.href}
function markFinished(){finished=true;active=false;gameUrl=''}
window.TinaGuard={confirmLeave,confirmReveal,markActive,markFinished};

function routeFromTarget(target){
 if(target?.dataset?.hash)return target.dataset.hash;
 if(target?.tagName==='A'){const h=target.getAttribute('href')||'';if(h.startsWith('#'))return h.slice(1)}
 const card=target?.closest?.('.card');
 const key=(card?.getAttribute('href')||'').replace(/^#/,'');
 if(!key)return'';
 return target.classList?.contains('pkBtn')?'pk-'+key:key;
}

// Critical Safari rule: create the game history entry synchronously inside the
// user's click. WebKit can skip JS-created history entries that lack user activation.
document.addEventListener('click',e=>{
 if(bypass||gameVisible())return;
 const target=e.target.closest('#home button[data-hash],#home .modeBtns button,#home a.card');
 if(!target)return;
 const route=routeFromTarget(target);if(!route)return;
 e.preventDefault();e.stopImmediatePropagation();
 const old=location.href;
 history.pushState({tinaGame:true,route},'', '#'+route);
 markActive();
 window.dispatchEvent(new HashChangeEvent('hashchange',{oldURL:old,newURL:location.href}));
},true);

// Browser Back: this listener is loaded before every game router, so it gets first
// chance to cancel traversal before app.js/taiwan.js/etc can destroy the live game UI.
window.addEventListener('popstate',e=>{
 if(bypass)return;
 if(restoring){e.stopImmediatePropagation();return}
 if(!active||finished)return;
 e.stopImmediatePropagation();
 if(confirmLeave()){
   active=false;gameUrl='';
   // We are already on the previous history entry. Let routers render it now.
   const old=gameUrl||location.href;
   window.dispatchEvent(new HashChangeEvent('hashchange',{oldURL:old,newURL:location.href}));
 }else{
   restoring=true;
   history.forward();
   setTimeout(()=>{restoring=false},300);
 }
},true);

// Suppress the hashchange belonging to a cancelled Back/Forward traversal. This
// preserves the exact in-progress DOM and answers instead of re-starting the game.
window.addEventListener('hashchange',e=>{if(restoring)e.stopImmediatePropagation()},true);

// In-page ‹ uses the same real history entry as Safari Back.
document.addEventListener('click',e=>{
 const back=e.target.closest('.back');if(!back||bypass||!gameVisible())return;
 e.preventDefault();e.stopImmediatePropagation();
 if(active&&!finished&&!confirmLeave())return;
 active=false;finished=false;gameUrl='';bypass=true;
 history.back();
 setTimeout(()=>{bypass=false},250);
},true);

window.addEventListener('beforeunload',e=>{if(active&&!finished&&!bypass){e.preventDefault();e.returnValue=''}});
})();