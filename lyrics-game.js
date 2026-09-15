const LYRIC_BANK={
'831':[
['外婆的告別式',['小巨蛋前一星期 放下一切 堅持要去見你','掌聲多光鮮亮麗 卻少了你 給我一句肯定','想你 想說一句我愛你 這次不會只放心底']],
['我不想改變世界 我只想不被世界改變',['我不想改變 殘酷的世界','我只想不被 這世界改變','我只要 不遺憾的今天']],
['東區東區',['昨天太多壓力 今天更多問題','曖昧不是遊戲 曖昧是場戰役','時尚不是流行 時尚是做自己']],
['鋼鐵人',['不做英雄也想做 勇敢做夢的凡人','我們都深陷在平凡人生','沒有人能永生但信念能永存']],
['我怎麼哭了',['而關上燈獨自一人 嘴角笑著眼眶為何溼了','我怎麼哭了 當我偶然想起了','但睡前那句晚安我該對誰說呢']],
['飢餓遊戲',['睜開了眼 為何 更像噩夢','存一輩子 也買不起的樓','飢餓遊戲裡 你死 我活']],
['一事無成的偉大',['這一生 一事無成 又怎樣','為何要 功成名就 才偉大','能感動 自己的歌 才是唯一解答']],
['致青春',['我最愛的歌啊 誰還大聲唱','我最挺的兄弟 誰還在身旁','剩一把吉他 陪著我繼續唱']]
],
'bestards':[
['不是因為天氣晴朗才愛你',['不是因為天氣晴朗才愛你','不是因為看見星星才想你','大雨盛開水花的路口']],
['行星',['我獨自盤旋在看得見你的軌道','我不能靠近 卻也不願遠離','你一如往常發著光']],
['愚者',['旅行的起點不需要形狀','只要心已經開始流浪','放手所有過去未來']],
['我就想你',['我想要你在我身邊','找尋共同的記憶','想著你的笑容 是我最幸福的時候']]
],
'cosmos':[
['一起去跑步',['有多久了 沒有流汗','我們的節奏 是吸兩口再吐','把地球的忙碌 都拋在半路']],
['那你呢',['我跑著跑著雙腳也慢慢累了','會不會跟著我一起走','單純瘋狂勇敢的我']],
['你的樣子',['好喜歡你的樣子','想給你我家鑰匙','距離不遠就能探索彼此']],
['我討厭你',['我討厭你穿高跟鞋','我討厭你畫的眼線','我討厭你假裝在聽音樂']],
['一萬小時',['需要多久的時間 平地才能搭起一座山','我要變成你的樹','一萬小時只是個起點']],
['理想狀態',['想找一個理想狀態','來解釋對未來的期待','過著不被誰過問的生活']]
],
'samlee':[
['痴心絕對',['暗戀的滋味 妳不懂這種感覺','我還傻傻等到奇蹟出現的那一天','真正愛妳的人獨自守著傷悲']],
['手放開',['我把自己關起來 只留下一個陽台','不能給你未來我還你現在','我給你最後的疼愛 是手放開']],
['最近',['你最近不說話 怎麼了 為什麼','聽說你最近很孤單','可是我卻不能夠在你的身旁']],
['眼底星空',['你說是宇宙的縮影','流星開始墜落','男人流淚比流血加倍心痛']],
['我以為',['痛是什麼感覺 是想吶喊卻無言','我以為愛是痛苦的慈悲','愛不在了 做什麼都枉費']],
['你們要快樂',['原來心酸比心痛難受','你們要快樂 要天長地久','成全最愛的人不是為了看著她寂寞']]
]};

function lyricN(s){return (s||'').toLowerCase().normalize('NFKC').replace(/[\s　，。！？、；：,.!?;:'"“”‘’（）()\-—_]/g,'').replace(/妳/g,'你')}
function lyricShuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function lyricPool(artist){return (LYRIC_BANK[artist]||[]).flatMap(([song,lines])=>lines.map((line,i)=>({song,line,key:song+'#'+i})))}
function lyricPick5(artist){const pool=lyricShuffle(lyricPool(artist)),used=new Set(),out=[];for(const x of pool){if(used.has(x.song))continue;used.add(x.song);out.push(x);if(out.length===5)break}return out}
function lyricArtistTitle(a){return MUSIC_GAMES[a]?.title?.replace('作品大挑戰','')||a}
function lyricBoard(t){home.style.display='none';game.style.display='flex';resetUI();title.textContent=t;document.querySelector('.score').style.display='none';document.querySelector('.controls').style.display='none';const box=document.querySelector('.map');box.innerHTML='<div id="lyricBoard" style="height:100%;overflow:auto;padding:14px"></div>';return document.getElementById('lyricBoard')}
function lyricInput(prompt,round,who,score){return `<div style="display:flex;justify-content:space-between"><b>第 ${round}/5 題</b><b>${who}　${score} 分</b></div><div style="max-width:650px;margin:42px auto 24px;text-align:center;font-size:24px;font-weight:750;line-height:1.75">${prompt}</div><div style="max-width:460px;margin:auto"><input id="lyricInput" autocomplete="off" placeholder="輸入答案" style="width:100%"><button id="lyricSubmit" class="go" style="width:100%;margin-top:10px">送出答案</button></div>`}
function lyricAnswer(){return document.getElementById('lyricInput').value.trim()}
function makeFill(q){const chars=[...q.line],runs=[];let s=null;for(let i=0;i<=chars.length;i++){const ok=i<chars.length&&/[\u3400-\u9fff]/.test(chars[i]);if(ok&&s===null)s=i;if(!ok&&s!==null){if(i-s>=4)runs.push([s,i]);s=null}}if(!runs.length)return null;const [a,z]=runs[Math.floor(Math.random()*runs.length)];const max=Math.min(6,z-a),len=Math.max(2,Math.floor(Math.random()*(max-1))+2),start=a+Math.floor(Math.random()*(z-a-len+1));const answer=chars.slice(start,start+len).join('');return{prompt:chars.slice(0,start).join('')+'＿'.repeat(len)+chars.slice(start+len).join(''),answer}}
function startLyricGame(artist,type,pk){const label=type==='guess'?'看歌詞猜歌':'歌詞填空';const b=lyricBoard(lyricArtistTitle(artist)+label+(pk?' PK':''));const qs=lyricPick5(artist);let round=1,player=0,scores=pk?[0,0]:[0],aAns='';let fill=null;function prep(){fill=type==='fill'?makeFill(qs[round-1]):null;if(type==='fill'&&!fill){qs[round-1]=lyricShuffle(lyricPool(artist)).find(x=>makeFill(x));fill=makeFill(qs[round-1])}}function render(){const q=qs[round-1],prompt=type==='guess'?'「'+q.line+'」':'「'+fill.prompt+'」';b.innerHTML=lyricInput(prompt,round,pk?'玩家 '+(player?'B':'A'):'單人',scores[player]||0)+(type==='fill'?'<div style="font-size:12px;color:#7b8288;text-align:center;margin-top:12px">只填空格中的文字，不需要輸入任何標點符號。</div>':'');const input=document.getElementById('lyricInput');document.getElementById('lyricSubmit').onclick=submit;input.onkeydown=e=>{if(e.key==='Enter')submit()};input.focus()}function correct(raw){const q=qs[round-1];if(type==='guess'){const aliases=MUSIC_GAMES[artist]?.aliases?.[q.song]||[];return [q.song,...aliases].some(x=>lyricN(x)===lyricN(raw))}return lyricN(raw)===lyricN(fill.answer)}function submit(){const raw=lyricAnswer();if(!raw)return;const q=qs[round-1];if(pk&&player===0){if(window.TinaGuard&&!TinaGuard.confirmReveal('確定送出玩家 A 的答案嗎？答案會隱藏並交給玩家 B。'))return;aAns=raw;b.innerHTML='<div style="text-align:center;padding:48px 10px"><div style="font-size:44px">🙈</div><h2>玩家 A 已送出</h2><p style="color:#68717a">答案已隱藏，請把裝置交給玩家 B。</p><button id="lyricHandoff" class="go" style="width:100%;max-width:400px">交給玩家 B</button></div>';document.getElementById('lyricHandoff').onclick=()=>{player=1;render()};return}if(window.TinaGuard&&!TinaGuard.confirmReveal('確定送出嗎？送出後會公布答案。'))return;const bAns=raw,ap=pk?(correct(aAns)?100:0):null,bp=correct(bAns)?100:0;if(pk){scores[0]+=ap;scores[1]+=bp}else scores[0]+=bp;const answer=type==='guess'?q.song:fill.answer;b.innerHTML=`<div style="text-align:center"><b>第 ${round}/5 題結果</b><div style="font-size:23px;font-weight:750;line-height:1.7;margin:22px auto;max-width:650px">${type==='guess'?'「'+q.line+'」':'「'+fill.prompt+'」'}</div><div style="font-size:14px;color:#68717a">正確答案</div><div style="font-size:28px;font-weight:800;margin:7px 0 20px">${answer}</div>${type==='fill'?'<div style="font-size:13px;color:#68717a;margin:-10px 0 18px">出處：'+q.song+'</div>':''}${pk?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;max-width:480px;margin:auto"><div style="background:#f0f2f4;border-radius:12px;padding:14px"><b>玩家 A</b><div>${aAns}</div><b>${ap?'+100':'0'} 分</b></div><div style="background:#f0f2f4;border-radius:12px;padding:14px"><b>玩家 B</b><div>${bAns}</div><b>${bp?'+100':'0'} 分</b></div></div><div style="margin:15px;font-weight:700">累積　A ${scores[0]}：${scores[1]} B</div>`:`<div style="background:#f0f2f4;border-radius:12px;padding:14px;max-width:430px;margin:auto">你的答案：${bAns}<br><b>${bp?'+100':'0'} 分</b><br>累積 ${scores[0]} 分</div>`}<button id="lyricNext" class="go" style="width:100%;max-width:430px;margin-top:18px">${round===5?'查看最終結果':'下一題'}</button></div>`;document.getElementById('lyricNext').onclick=()=>{if(round===5)return end();round++;player=0;aAns='';prep();render()}}function end(){if(window.TinaGuard)TinaGuard.markFinished();const text=pk?(scores[0]===scores[1]?'平手！':'玩家 '+(scores[0]>scores[1]?'A':'B')+' 勝！'):'挑戰完成！';b.innerHTML=`<div style="text-align:center;padding:40px 10px"><div style="font-size:44px">🎵</div><h2>${text}</h2><div style="font-size:30px;font-weight:800;margin:20px">${pk?'A '+scores[0]+'：'+scores[1]+' B':scores[0]+'/500'}</div><button id="lyricAgain" class="go" style="width:100%;max-width:400px">再玩一局</button></div>`;document.getElementById('lyricAgain').onclick=()=>startLyricGame(artist,type,pk)}if(qs.length<5){b.innerHTML='<p>此題庫目前不足 5 首可用歌曲。</p>';return}if(window.TinaGuard)TinaGuard.markActive();prep();render()}
function routeLyrics(){const h=(location.hash||'').slice(1),m=h.match(/^(831|bestards|cosmos|samlee)-lyrics-(guess|fill)(-pk)?$/);if(!m)return;currentGame=h;startLyricGame(m[1],m[2],!!m[3])}
window.addEventListener('hashchange',routeLyrics);routeLyrics();