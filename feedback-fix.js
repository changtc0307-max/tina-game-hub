(()=>{
const msg=document.querySelector('#msg'),ans=document.querySelector('#ans'),go=document.querySelector('#go');if(!msg||!ans||!go)return;
const style=document.createElement('style');style.textContent=`#msg.answer-ok{color:#16833f!important;font-weight:800;font-size:14px}#msg.answer-bad{color:#a33a3a!important}.answer-flash{animation:answerFlash .18s ease-out}@keyframes answerFlash{from{opacity:.25;transform:translateY(2px)}to{opacity:1;transform:none}}`;
document.head.appendChild(style);
function paint(){const ok=msg.querySelector('span.ok'),bad=msg.querySelector('span.bad');msg.classList.remove('answer-ok','answer-bad','answer-flash');if(ok){msg.classList.add('answer-ok');ok.style.setProperty('color','#16833f','important');ok.style.fontWeight='800';if(!ok.textContent.trim().startsWith('✓'))ok.textContent='✓ '+ok.textContent.trim();ans.value='';void msg.offsetWidth;msg.classList.add('answer-flash');setTimeout(()=>{ans.value='';try{ans.focus({preventScroll:true})}catch(e){ans.focus()}},0)}else if(bad){msg.classList.add('answer-bad')}}
new MutationObserver(()=>paint()).observe(msg,{childList:true,subtree:true,characterData:true});
// Capture phase runs after the game's handler has changed the DOM on the same tap cycle via microtask observer.
go.addEventListener('click',()=>{queueMicrotask(paint);setTimeout(paint,20)},true);
ans.addEventListener('keydown',e=>{if(e.key==='Enter'){queueMicrotask(paint);setTimeout(paint,20)}},true);
})();