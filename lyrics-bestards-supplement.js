// Supplemental Bestards lyric excerpts supplied by the user on 2026-09-16.
(()=>{if(typeof LYRIC_BANK==='undefined'||!LYRIC_BANK.bestards)return;
const add={
'滯留鋒':['這陣雨 什麼時候會停','帶走陰霾 和心裡的灰'],
'今天星期六':['今天星期六 陽光多溫柔','想和你 一起走走'],
'在地球爆炸之前':['如果明天 就是世界末日','我只想 緊緊擁抱你'],
'絕地花園':['在無人的荒漠 盛開出花朵','就算風沙再大 也不退縮'],
'離開的一路上':['離開的一路上 景色在退後','有些話 還沒說出口'],
'接住你':['當你掉落的時候','我會在這裡 仔細聆聽'],
'平衡木':['一步一步 走在平衡木上','小心翼翼 怕打破了微光'],
'我還沒有作好被打倒的準備':['世界太複雜 充滿了考驗','我還沒有 作好被打倒的準備'],
'晴時多雲偶想你':['今天的的天氣 晴時多雲','偶爾 還是會想起你'],
'夏夜煙火':['夏夜的煙火 在空中綻放','照亮了你我 瞬間的模樣']
};
const bySong=new Map(LYRIC_BANK.bestards.map(x=>[x[0],x]));
for(const [song,lines] of Object.entries(add)){
  let row=bySong.get(song);
  if(!row){row=[song,[]];LYRIC_BANK.bestards.push(row);bySong.set(song,row)}
  for(const line of lines)if(!row[1].includes(line))row[1].push(line);
}
})();