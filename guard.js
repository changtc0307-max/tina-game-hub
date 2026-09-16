(()=>{
let bypass=false,active=false,finished=false;
function gameVisible(){const g=document.getElementById('game');return !!g&&getComputedStyle(g).display!=='none'}
function confirmReveal(message){return window.confirm(message||'確定要公布答案嗎？\n公布後這局就會結束，無法繼續作答。')}
function confirmLeave(){return window.confirm('確定要離開這局嗎？\n目前的作答進度與已公布答案會消失。')}
function markActive(){active=true;finished=false}
function markFinished(){finished=true;active=false}
function needsLeaveConfirm(){return active&&!finished}
function requestLeave(){return !needsLeaveConfirm()||confirmLeave()}
function clearLeave(){active=false;finished=false}
window.TinaGuard={confirmReveal,confirmLeave,markActive,markFinished,needsLeaveConfirm,requestLeave,clearLeave,isActive:needsLeaveConfirm};
document.addEventListener('click',e=>{if(bypass)return;const btn=e.target.closest('#finish');if(!btn||btn.disabled||!gameVisible())return;const text=(btn.textContent||'').trim();if(!/(交卷|公布答案|結束)/.test(text))return;e.preventDefault();e.stopImmediatePropagation();if(!confirmReveal())return;bypass=true;try{btn.click();markFinished()}finally{bypass=false}},true);
window.addEventListener('beforeunload',e=>{if(bypass||!needsLeaveConfirm())return;e.preventDefault();e.returnValue='';return ''});
const guardObserver=new MutationObserver(()=>{const f=document.getElementById('finish'),g=document.getElementById('go');if(active&&gameVisible()&&f&&g&&f.disabled&&g.disabled)markFinished()});guardObserver.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','disabled']});
const musicExtra=document.createElement('script');musicExtra.src='music-extra.js?v=20260915-9';musicExtra.onload=()=>{const lyrics=document.createElement('script');lyrics.src='lyrics-game.js?v=20260915-9';lyrics.onload=()=>{const extra=document.createElement('script');extra.src='lyrics-extra.js?v=20260916-10';extra.onload=()=>{const ui=document.createElement('script');ui.src='lyrics-ui.js?v=20260915-9';document.head.appendChild(ui)};document.head.appendChild(extra)};document.head.appendChild(lyrics)};document.head.appendChild(musicExtra);
const priceExtra=document.createElement('script');priceExtra.src='pricing-extra.js?v=20260915-9';document.head.appendChild(priceExtra);
function fixPriceUI(){const card=[...document.querySelectorAll('#home .card')].find(c=>c.querySelector('h2')?.textContent.trim()==='價格猜猜看');if(card){const groups=[...card.querySelectorAll('.modeBtns')];groups.slice(1).forEach(g=>g.remove())}const board=document.getElementById('priceBoard');if(board){const old=[...board.querySelectorAll('div')].find(d=>d.children.length===0&&d.textContent.includes('越接近標準答案分數越高'));if(old&&!old.dataset.fullPriceRule){old.dataset.fullPriceRule='1';old.innerHTML='<b style="color:#68717a">計分方式｜與標準價格的誤差</b><br>≤ 5%：100 分　｜　≤ 10%：80 分<br>≤ 20%：60 分　｜　≤ 30%：40 分<br>≤ 50%：20 分　｜　&gt; 50%：0 分';old.style.lineHeight='1.75';old.style.fontSize='12px';old.style.color='#8a9198';old.style.textAlign='center'}}}
window.addEventListener('DOMContentLoaded',fixPriceUI);new MutationObserver(fixPriceUI).observe(document.documentElement,{childList:true,subtree:true});
})();