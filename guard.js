(()=>{
let bypass=false,active=false,finished=false;
function gameVisible(){const g=document.getElementById('game');return !!g&&getComputedStyle(g).display!=='none'}
function confirmReveal(message){return window.confirm(message||'確定要公布答案嗎？\n公布後這局就會結束，無法繼續作答。')}
function confirmLeave(){return window.confirm('確定要離開這局嗎？\n目前的作答進度與已公布答案會消失。')}
window.TinaGuard={confirmReveal,confirmLeave,markActive(){active=true;finished=false},markFinished(){finished=true;active=false}};

document.addEventListener('click',e=>{
  if(bypass)return;
  const btn=e.target.closest('#finish');
  if(!btn||btn.disabled||!gameVisible())return;
  const text=(btn.textContent||'').trim();
  if(!/(交卷|公布答案|結束)/.test(text))return;
  e.preventDefault();e.stopImmediatePropagation();if(!confirmReveal())return;
  bypass=true;try{btn.click()}finally{bypass=false}
},true);

document.addEventListener('click',e=>{
  if(bypass||!gameVisible())return;const back=e.target.closest('.back');if(!back)return;
  e.preventDefault();e.stopImmediatePropagation();if(!confirmLeave())return;
  bypass=true;try{location.hash=''}finally{setTimeout(()=>{bypass=false},0)}
},true);

window.addEventListener('beforeunload',e=>{if(!gameVisible()||bypass||finished)return;e.preventDefault();e.returnValue=''});
})();