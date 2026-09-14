(()=>{
// Country roster / map compatibility patch.
// The game roster is 193 UN members + Palestine + Vatican + Taiwan + Kosovo = 197 entries.
const EXTRA_COUNTRIES=[
  {id:'020',code:'AD',zh:'安道爾',en:'Andorra',capital:'Andorra la Vella',capitalZh:'安道爾城'},
  {id:'499',code:'ME',zh:'蒙特內哥羅',en:'Montenegro',capital:'Podgorica',capitalZh:'波德里查'}
];
for(const x of EXTRA_COUNTRIES){
  if(!DATA.some(d=>d.code===x.code))DATA.push(x);
  CAP_TW[x.capital]=x.capitalZh;
}

// Taiwan is not in the World Bank country API used by GDP PK, so use the
// official 2024 DGBAS figure (US$33,983) instead of dropping Taiwan.
const TAIWAN_GDP_PER_CAPITA_2024=33983;

// world-atlas 110m intentionally omits many microstates. Redirect only the
// world-country topology to 50m, which contains Taiwan, Singapore, Vatican,
// Andorra and other small sovereign states while remaining mobile-friendly.
const nativeFetch=window.fetch.bind(window);
window.fetch=async function(input,init){
  const raw=typeof input==='string'?input:(input?.url||'');
  let url=raw;
  if(/world-atlas@2\/countries-110m\.json/.test(url)){
    url=url.replace('countries-110m.json','countries-50m.json');
  }
  const response=await nativeFetch(url,init);
  if(!response.ok)return response;

  if(/world-atlas@2\/countries-50m\.json/.test(url)){
    const data=await response.clone().json();
    // Natural Earth 50m has Kosovo geometry but no numeric id; normalize it
    // to the code already used by the game's country roster.
    for(const g of (data?.objects?.countries?.geometries||[])){
      if(!g.id&&/kosovo/i.test(g?.properties?.name||''))g.id='383';
    }
    return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json'}});
  }

  if(/api\.worldbank\.org\/v2\/country\/all\/indicator\/NY\.GDP\.PCAP\.CD/.test(url)){
    const data=await response.clone().json();
    if(Array.isArray(data?.[1])&&!data[1].some(r=>r?.country?.id==='TW')){
      data[1].push({country:{id:'TW',value:'Taiwan'},countryiso3code:'TWN',date:'2024',value:TAIWAN_GDP_PER_CAPITA_2024,unit:'',obs_status:'',decimal:1});
    }
    return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json'}});
  }
  return response;
};

const duplicateCodes=DATA.map(x=>x.code).filter((x,i,a)=>a.indexOf(x)!==i);
const duplicateIds=DATA.map(x=>x.id).filter((x,i,a)=>a.indexOf(x)!==i);
if(DATA.length!==197||duplicateCodes.length||duplicateIds.length){
  console.warn('Country roster audit warning',{count:DATA.length,duplicateCodes,duplicateIds});
}
})();