(()=>{
let ready=false,routing=false,last='';
const q=()=>decodeURIComponent((location.hash||'').replace(/^#/,''));
function homeView(){
  if(typeof currentGame!=='undefined')currentGame=null;
  if(typeof resetUI==='function')resetUI();
  const h=document.getElementById('home'),g=document.getElementById('game');
  if(g)g.style.display='none';if(h)h.style.display='block';
}
function run(route,force=false){
  if(!ready||routing)return false;
  route=route==null?q():route;
  if(!force&&route===last&&route)return true;
  routing=true;
  try{
    if(!route){last='';homeView();return true}
    if(typeof currentGame!=='undefined')currentGame=route;
    if(typeof resetUI==='function')resetUI();
    let ok=true,m;
    if(['countries','capitals','japan','us','aov','831','bestards','cosmos','samlee','fahrenheit','sasha'].includes(route)){
      if(['fahrenheit','sasha'].includes(route)&&!(window.MUSIC_GAMES&&MUSIC_GAMES[route]))ok=false;
      else if(typeof start==='function')start(route);else ok=false;
    }else if(route==='taiwan') ok=typeof startTaiwanSolo==='function'?(startTaiwanSolo(),true):false;
    else if(route==='china') ok=typeof startChina==='function'?(startChina(),true):false;
    else if(route==='price') ok=typeof startPriceSolo==='function'?(startPriceSolo(),true):false;
    else if(route==='pk-price') ok=typeof startPricePK==='function'?(startPricePK(),true):false;
    else if(route==='timeline') ok=typeof startTimelineSolo==='function'?(startTimelineSolo(),true):false;
    else if(route==='pk-timeline') ok=typeof startTimelinePK==='function'?(startTimelinePK(),true):false;
    else if(route==='pk-taiwan') ok=typeof startTaiwanPK==='function'?(startTaiwanPK(),true):false;
    else if((m=route.match(/^pk-(countries|capitals|japan|us|china|aov|831|bestards|cosmos|samlee|fahrenheit|sasha)$/))) ok=typeof startGenericPK==='function'?startGenericPK(m[1]):false;
    else if((m=route.match(/^territory-(countries|japan|us|taiwan|china)-(area|population|density|gdp|military)$/))) ok=typeof startTerritory==='function'?(startTerritory(m[1],m[2]),true):false;
    else if((m=route.match(/^(831|bestards|cosmos|samlee|fahrenheit|sasha)-lyrics-(guess|fill)(-pk)?$/))) ok=typeof startLyricGame==='function'?(startLyricGame(m[1],m[2],!!m[3]),true):false;
    else {homeView();ok=true}
    if(ok){last=route;return true}
    setTimeout(()=>run(route,true),60);return false;
  }finally{routing=false}
}
// Own all future hash navigation. Legacy listeners are intentionally blocked so one route has one owner.
window.addEventListener('hashchange',e=>{e.stopImmediatePropagation();run(q(),true)},true);
window.addEventListener('popstate',()=>setTimeout(()=>run(q(),true),0),true);
window.TinaRouter={go(route){const next=route?'#'+route:location.pathname+location.search;if(route){if(location.hash==='#'+route)return run(route,true);location.hash=route}else{history.pushState(null,'',next);run('',true)}},home(){history.replaceState(null,'',location.pathname+location.search);run('',true)},render(){return run(q(),true)}};
window.addEventListener('load',()=>{ready=true;run(q(),true)});
})();