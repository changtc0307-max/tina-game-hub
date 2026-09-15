(()=>{
if(typeof LYRIC_BANK==='undefined')return;
LYRIC_BANK.bestards.push(['我反芻著你留下的寂寞',['我反芻著你留下的寂寞','以為終究能消化成自由','我為何還原地守候']]);
const ids={
'八三夭作品大挑戰':'831','理想混蛋作品大挑戰':'bestards','宇宙人作品大挑戰':'cosmos','李聖傑作品大挑戰':'samlee'
};
for(const card of document.querySelectorAll('#home .card')){
  const h=card.querySelector('h2'),id=h&&ids[h.textContent.trim()];if(!id||card.querySelector('.lyricModes'))continue;
  const box=document.createElement('div');box.className='lyricModes';box.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px';
  const modes=[['作品挑戰','#'+id],['看歌詞猜歌','#'+id+'-lyrics-guess'],['猜歌雙人 PK','#'+id+'-lyrics-guess-pk'],['歌詞填空','#'+id+'-lyrics-fill'],['填空雙人 PK','#'+id+'-lyrics-fill-pk']];
  modes.forEach(([text,hash],i)=>{const b=document.createElement('button');b.textContent=text;b.className=i===0?'singleBtn':i%2?'territoryBtn':'pkBtn';b.onclick=e=>{e.preventDefault();e.stopPropagation();location.hash=hash};box.appendChild(b)});
  card.appendChild(box);
}
})();