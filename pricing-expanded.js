// Verified 2026/09 expansion. Entries are de-duplicated by name + spec at load time.
(()=>{function install(){if(typeof PRICE_QUESTIONS==='undefined'){setTimeout(install,20);return}if(window.__priceExpandedInstalled)return;window.__priceExpandedInstalled=true;
const extra=[];
// Taiwan High Speed Rail standard-car adult fares (official published fare table).
const st=['南港','台北','板橋','桃園','新竹','苗栗','台中','彰化','雲林','嘉義','台南','左營'];
const fare=[[0],[40,0],[70,40,0],[200,160,130,0],[330,290,260,130,0],[480,430,400,280,140,0],[750,700,670,540,410,270,0],[870,820,790,670,540,390,130,0],[970,930,900,780,640,500,230,110,0],[1120,1080,1050,920,790,640,380,250,150,0],[1390,1350,1320,1190,1060,920,650,530,420,280,0],[1530,1490,1460,1330,1200,1060,790,670,560,410,140,0]];
for(let i=1;i<st.length;i++)for(let j=0;j<i;j++)extra.push([`台灣高鐵 ${st[j]}→${st[i]}`,'標準車廂成人全票',fare[i][j],'交通']);
// Five business-car fares from the same official table.
extra.push(['台灣高鐵 南港→桃園','商務車廂成人全票',500,'交通'],['台灣高鐵 南港→新竹','商務車廂成人全票',700,'交通'],['台灣高鐵 南港→苗栗','商務車廂成人全票',920,'交通'],['台灣高鐵 南港→台中','商務車廂成人全票',1330,'交通'],['台灣高鐵 台北→桃園','商務車廂成人全票',440,'交通']);
// Apple Taiwan current starting prices.
extra.push(['iPad Pro','Apple 台灣官網起售價',39900,'3C'],['iPad Air','Apple 台灣官網起售價',24900,'3C'],['iPad A16','Apple 台灣官網起售價',14900,'3C'],['iPad mini','Apple 台灣官網起售價',19900,'3C'],['Apple Watch Series 12','Apple 台灣官網起售價',13900,'3C'],['Apple Watch SE 3','Apple 台灣官網起售價',7900,'3C'],['Apple Watch Ultra 4','Apple 台灣官網起售價',24800,'3C'],['Apple Watch Hermès Series 12','Apple 台灣官網起售價',32500,'3C'],['Apple Watch Hermès Ultra 4','Apple 台灣官網起售價',33500,'3C']);
// Taipei Metro travel tickets.
extra.push(['台北捷運 一日票','票價',150,'交通'],['台北捷運 24小時票','票價',180,'交通'],['台北捷運 48小時票','票價',280,'交通'],['台北捷運 72小時票','票價',380,'交通'],['悠遊卡','空卡售價（可用金額0元）',100,'交通']);
// Taipei Zoo published admission / facility prices.
extra.push(['台北市立動物園','台北市民票',60,'門票'],['台北市立動物園','優待票',50,'門票'],['台北市立動物園','30人以上團體票每人',70,'門票'],['台北市立動物園 教育中心','入場票',20,'門票'],['台北市立動物園 遊客列車','每人每次',5,'門票']);
// National Taiwan Science Education Center published 2026 prices.
extra.push(['國立臺灣科學教育館 常設展','全票',120,'門票'],['國立臺灣科學教育館 常設展','優待票',90,'門票'],['國立臺灣科學教育館 常設展','20人以上學生團體每人',80,'門票'],['國立臺灣科學教育館 會員','年費',250,'門票'],['國立臺灣科學教育館 空中腳踏車','全票',80,'門票'],['國立臺灣科學教育館 空中腳踏車','優待票',50,'門票'],['國立臺灣科學教育館 小黑盒沉浸式劇場','全票',150,'門票'],['國立臺灣科學教育館 小黑盒沉浸式劇場','優待票',100,'門票']);
// Taipei Fine Arts Museum.
extra.push(['臺北市立美術館','普通票',30,'門票'],['臺北市立美術館','優待票',15,'門票']);
let id=Math.max(0,...PRICE_QUESTIONS.map(q=>q.id||0));const seen=new Set(PRICE_QUESTIONS.map(q=>q.name+'|'+q.spec));for(const x of extra){const k=x[0]+'|'+x[1];if(!seen.has(k)){seen.add(k);PRICE_QUESTIONS.push({id:++id,name:x[0],spec:x[1],price:x[2],cat:x[3],basis:'官方公告／官網售價 2026/09核對'})}}
}install()})();