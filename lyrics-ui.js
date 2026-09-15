(()=>{
if(typeof LYRIC_BANK==='undefined')return;
LYRIC_BANK.bestards.push(['我反芻著你留下的寂寞',['我反芻著你留下的寂寞','以為終究能消化成自由','我為何還原地守候']]);
const ids={'八三夭作品大挑戰':'831','理想混蛋作品大挑戰':'bestards','宇宙人作品大挑戰':'cosmos','李聖傑作品大挑戰':'samlee'};
for(const card of document.querySelectorAll('#home .card')){
 const h=card.querySelector('h2'),id=h&&ids[h.textContent.trim()];if(!id||card.querySelector('.musicMenu'))continue;
 card.removeAttribute('href');card.onclick=e=>e.preventDefault();
 const menu=document.createElement('div');menu.className='musicMenu';menu.style.cssText='margin-top:12px;display:flex;flex-direction:column;gap:7px';
 const modes=[['🎵 作品大挑戰',id],['💬 看歌詞猜歌',id+'-lyrics-guess'],['✏️ 歌詞填空',id+'-lyrics-fill']];
 modes.forEach(([label,base],i)=>{const row=document.createElement('div');row.style.cssText='display:grid;grid-template-columns:1.35fr .8fr .8fr;gap:5px;align-items:center';const lab=document.createElement('div');lab.textContent=label;lab.style.cssText='font-size:12px;font-weight:750;color:#4d555d;padding-left:3px';row.appendChild(lab);if(i===0){const solo=document.createElement('button');solo.textContent='開始';solo.className='singleBtn';solo.style.gridColumn='2 / 4';solo.onclick=e=>{e.preventDefault();e.stopPropagation();location.hash=base};row.appendChild(solo)}else{[['單人',''],['雙人 PK','-pk']].forEach(([txt,suf],j)=>{const b=document.createElement('button');b.textContent=txt;b.className=j?'pkBtn':'territoryBtn';b.onclick=e=>{e.preventDefault();e.stopPropagation();location.hash=base+suf};row.appendChild(b)})}menu.appendChild(row)});card.appendChild(menu)
}
})();