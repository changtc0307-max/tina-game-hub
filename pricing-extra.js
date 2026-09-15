// Additional audited price questions. Keep entries tied to a specific published tariff or official list price.
(()=>{function install(){
if(typeof PRICE_QUESTIONS==='undefined'){setTimeout(install,0);return}
if(window.__priceExtraInstalled)return;window.__priceExtraInstalled=true;
const fixes={'Apple iPhone 18 Pro 256GB':44900,'Apple iPhone 18 Pro 512GB':51900,'Apple iPhone 18 Pro 1TB':66900,'Apple iPhone 18 Pro 2TB':88900};
for(const q of PRICE_QUESTIONS)if(fixes[q.name]!=null)q.price=fixes[q.name];
const extra=[
['Apple iPhone 18 Pro Max 256GB','Apple 台灣官網售價',49900,'3C'],['Apple iPhone 18 Pro Max 512GB','Apple 台灣官網售價',56900,'3C'],['Apple iPhone 18 Pro Max 1TB','Apple 台灣官網售價',71900,'3C'],['Apple iPhone 18 Pro Max 2TB','Apple 台灣官網售價',93900,'3C'],['Apple iPhone Duo 512GB','Apple 台灣官網售價',81900,'3C'],['Apple iPhone Duo 1TB','Apple 台灣官網售價',96900,'3C'],['Apple iPhone Duo 2TB','Apple 台灣官網售價',118900,'3C'],
['Apple Watch Series 12','Apple 台灣官網起售價',13900,'3C'],['Apple Watch SE 3','Apple 台灣官網起售價',7900,'3C'],['Apple Watch Ultra 4','Apple 台灣官網起售價',24800,'3C'],['Apple Watch Hermès Series 12','Apple 台灣官網起售價',32500,'3C'],['Apple Watch Hermès Ultra 4','Apple 台灣官網起售價',33500,'3C'],
['MacBook Neo','Apple 台灣官網起售價',22900,'3C'],['MacBook Air','Apple 台灣官網起售價',42900,'3C'],['MacBook Pro','Apple 台灣官網起售價',64900,'3C'],['iMac','Apple 台灣官網起售價',49900,'3C'],['Mac mini','Apple 台灣官網起售價',29900,'3C'],['Mac Studio','Apple 台灣官網起售價',84900,'3C'],['Studio Display','Apple 台灣官網起售價',52900,'3C'],['Studio Display XDR','Apple 台灣官網起售價',97900,'3C'],
['iPad Air 11 吋 M4 Wi‑Fi','Apple 台灣官網起售價',19900,'3C'],['iPad Air 11 吋 M4 Wi‑Fi + 行動網路','Apple 台灣官網起售價',24900,'3C'],['iPad Air 13 吋 M4 Wi‑Fi','Apple 台灣官網起售價',26900,'3C'],['iPad Air 13 吋 M4 Wi‑Fi + 行動網路','Apple 台灣官網起售價',31900,'3C'],['iPad Air 11 吋巧控鍵盤','Apple 台灣官網售價',9490,'3C'],['iPad Air 13 吋巧控鍵盤','Apple 台灣官網售價',9890,'3C'],
['中華郵政 國內信函 20g以內','普通郵資',8,'郵資'],['中華郵政 國內信函 21–50g','普通郵資',16,'郵資'],['中華郵政 國內信函 51–100g','普通郵資',24,'郵資'],['中華郵政 國內信函 101–250g','普通郵資',40,'郵資'],['中華郵政 國內信函 251–500g','普通郵資',72,'郵資'],['中華郵政 國內信函 501–1000g','普通郵資',112,'郵資'],['中華郵政 國內信函 1001–2000g','普通郵資',160,'郵資'],
['中華郵政 國內信函 20g以內','掛號郵資',28,'郵資'],['中華郵政 國內信函 21–50g','掛號郵資',36,'郵資'],['中華郵政 國內信函 51–100g','掛號郵資',44,'郵資'],['中華郵政 國內信函 101–250g','掛號郵資',60,'郵資'],['中華郵政 國內信函 251–500g','掛號郵資',92,'郵資'],['中華郵政 國內信函 501–1000g','掛號郵資',132,'郵資'],['中華郵政 國內信函 1001–2000g','掛號郵資',180,'郵資'],
['中華郵政 國內信函 20g以內','限時掛號郵資',35,'郵資'],['中華郵政 國內信函 21–50g','限時掛號郵資',43,'郵資'],['中華郵政 國內信函 51–100g','限時掛號郵資',51,'郵資'],['中華郵政 國內信函 101–250g','限時掛號郵資',67,'郵資'],['中華郵政 國內信函 251–500g','限時掛號郵資',99,'郵資'],['中華郵政 國內信函 501–1000g','限時掛號郵資',139,'郵資'],['中華郵政 國內信函 1001–2000g','限時掛號郵資',187,'郵資'],
['中華郵政 國內印刷物 50g以內','普通郵資',6,'郵資'],['中華郵政 國內印刷物 51–100g','普通郵資',11,'郵資'],['中華郵政 國內印刷物 50g以內','掛號郵資',26,'郵資'],['中華郵政 國內印刷物 51–100g','掛號郵資',31,'郵資']];
let id=Math.max(0,...PRICE_QUESTIONS.map(q=>q.id||0));for(const x of extra)PRICE_QUESTIONS.push({id:++id,name:x[0],spec:x[1],price:x[2],cat:x[3],basis:'2026/09 題庫基準'});
}install()})();