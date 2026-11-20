// Reference design shared by the Chromebook preview and the bundled iPhone interface.
const atlasAsset = (name, alt = '', cls = '') => `<img src="assets/atlas/${name}.jpg" alt="${alt}" class="${cls}">`;
const atlasButton = (action, label, contents, cls = '') => `<button data-atlas="${action}" aria-label="${label}" class="${cls}">${contents}</button>`;
const tabs = ['Home','Journeys','Passport','Medals'];
let passportMode = 'map', rewardsVisible = true;
miles = 1248;
const mark = () => atlasAsset('mark','Earth Odometer','atlas-mark');
const line = (value, max) => `<progress value="${value}" max="${max}" aria-label="Distance progress"></progress>`;
const caps = text => `<small class="caps">${text}</small>`;

// New destinations inherit the same postcard, map, and perforated stamp treatment.
const destinations = {
 boston: {name:'Virtual Boston Marathon',region:'Boston, Massachusetts, USA',art:'atlas/boston',thumb:'atlas/harbor',stamp:'atlas/stamp',map:'atlas/boston-map',miles:26.2,start:26.2,chapter:'Massachusetts State House',chapterArt:'atlas/chapter'},
 route66: {name:'Route 66',region:'Chicago to Santa Monica',art:'atlas/desert',thumb:'atlas/desert',stamp:'atlas/desert',map:'RouteMap',miles:2448,start:842,chapter:'Oklahoma City',chapterArt:'OklahomaStamp'},
 europe: {name:'Across Europe',region:'River cities and skylines · Featuring Paris',spotlight:'Paris, France',intro:'Follow Europe’s river cities through the landmarks on their banks. In the Paris preview, look for the iron lattice of the Eiffel Tower above the Seine.',art:'EuropeArtwork',stamp:'EuropeArtwork',chapter:'European cityscapes'},
 world: {name:'World Cruiser',region:'Landscapes across continents · Featuring Japan',spotlight:'Mount Fuji, Japan',intro:'Explore how people have pictured the places they travel to. This preview takes you to Japan, where one mountain appears again and again in pilgrimage routes and artists’ prints.',art:'WorldArtwork',stamp:'WorldArtwork',chapter:'Around the globe'}
};
const placeArt=(file,alt='',cls='')=>`<img class="${cls}" src="assets/${file}.jpg" alt="${alt}">`;
// A single session owns incoming demo miles. Browsing never changes the session.
let activeRun;
const bestMiles = {};
function resetJourneyDemo(){
 activeRun = {key:'route66', odometerAtStart:1248, initialMiles:842};
 Object.assign(bestMiles,{boston:26.2,route66:842});
}
resetJourneyDemo();
function updateJourneyProgress(){
 if(!activeRun)return;
 const d=destinations[activeRun.key];
 const value=Math.min(d.miles,activeRun.initialMiles + Math.max(0,miles-activeRun.odometerAtStart));
 bestMiles[activeRun.key]=Math.max(bestMiles[activeRun.key]||0,value);
 if(value>=d.miles)activeRun=null;
}
function journeyMiles(d){
 if(!activeRun||destinations[activeRun.key]!==d)return bestMiles[Object.keys(destinations).find(k=>destinations[k]===d)]||0;
 return Math.min(d.miles,Math.round((activeRun.initialMiles+miles-activeRun.odometerAtStart)*10)/10);
}
function startJourney(key){
 const d=destinations[key];
 if(activeRun||!d?.miles)return false;
 activeRun={key,odometerAtStart:miles,initialMiles:0};
 return true;
}
function selectionControl(key){
 const d=destinations[key];
 if(activeRun?.key===key)return '<p class="journey-sequence"><b>Your active journey</b> · New miles count here.</p>';
 if(activeRun)return '<p class="journey-sequence"><b>'+destinations[activeRun.key].name+' is active.</b> You can browse every journey. Finish your active journey before starting another.</p>';
 return d.miles?atlasButton('start-'+key,'Start '+d.name,'Start journey','pill wide'):'';
}
function destinationCard([key,d]){
 return atlasButton('destination-'+key,'Explore '+d.name,placeArt(d.thumb||d.art,d.name)+'<span><strong>'+d.name+'</strong><small>'+d.region+'</small><small>'+(key==='boston'?'Completed journey · 26.2 mi':d.miles?d.miles.toLocaleString()+' mi':'Upcoming journey')+'</small></span>›','atlas-card strip');
}
function journeyPoster(d){
 return '<div class="journey-poster">'+placeArt(d.art,d.name+' illustrated journey')+
 (d===destinations.boston?'':'<div class="poster-label">'+caps('VIRTUAL JOURNEY')+'<strong>'+d.name+'</strong><small>'+d.region+'</small></div>')+'</div>';
}
function journeyPanel(d){
 const v=d.miles?journeyMiles(d):0;
 return journeyPoster(d)+(d===destinations.route66?mapArt():d.map?placeArt(d.map,'Illustrated '+d.name+' route map','atlas-map'):'')+
 (d.miles?`<div class="measure">Progress　<b>${v} / ${d.miles.toLocaleString()} mi</b><em>${(100*v/d.miles).toFixed(1)}%</em>${line(v,d.miles)}</div>`:'<section class="upcoming-story">'+caps('UPCOMING JOURNEY · FEATURED PLACE')+'<h3>'+d.spotlight+'</h3><p>'+d.intro+'</p></section>');
}
function destinationDetail(key){
 const d=destinations[key];
 open(d.name,'<div class="atlas destination-detail">'+journeyPanel(d)+fieldNote(key==='boston'?'Boston':key==='route66'?'Chicago':d.spotlight)+selectionControl(key)+'<div class="field-heading"><h3>'+(d.miles?'Journey stamp':'Stamp preview')+'</h3>'+inkMark(d.miles&&journeyMiles(d)>=d.miles?'Completed':'')+'</div><div class="journey-imprint">'+passportImprint(d.name,'assets/'+d.stamp+'.jpg')+'</div>'+
 (key==='boston'?'<p>Journey 1 complete. You traveled 26.2 miles to finish the virtual Boston Marathon. Your next journey began in Chicago on Route 66.</p>':'')+'</div>');
}

function atlasHome(){
 const d=destinations[activeRun?.key];
 const rollers=String(Math.floor(miles)).padStart(6,'0').split('').map(d=>`<b>${d}</b>`).join('');
 return atlasAsset('home-brand','Earth Odometer','home-brand')+
 `<div class="counter" aria-label="Lifetime odometer ${miles} miles"><div>${rollers}</div><strong>●　 Lifetime Odometer, miles　 ●</strong></div>
 <div class="pair"><article><i>〰</i><div>Today<b>${32+miles-1248} mi</b></div></article><article><i>▦</i><div>This Year<b>${miles.toLocaleString()} mi</b></div></article></div>
 <div class="orb">${atlasAsset('globe','Teal globe with orbital ring')}<div>Earth laps<b>${(miles/24901).toFixed(2)}</b></div></div>`+
 (d?atlasButton('journeys','Open '+d.name+' journey',caps('ACTIVE JOURNEY')+`<span class="row">${placeArt(d.thumb,d.name)}<span><strong>${d.name}</strong><small>Virtual journey</small><b>${journeyMiles(d)} / ${d.miles.toLocaleString()} mi</b>${line(journeyMiles(d),d.miles)}</span>›</span>`,'atlas-card active'):atlasButton('journeys','Pick a journey','Pick a journey　›','pill wide'))+
 (rewardsVisible?`<div class="reward atlas-card"><span aria-hidden="true">♧</span><div>Since your last visit<strong>2 new rewards</strong>${atlasButton('rewards','View rewards','View rewards','pill')} ${atlasButton('later','View later','View later','outline')}</div></div>`:'')+
 `<div class="extra">${atlasButton('recap','Yearly recap','Yearly recap')}${atlasButton('share','Share mileage','Share')}${atlasButton('more','History and profile','History & profile')}</div>`;
}
function atlasJourneys(){
 const d=destinations[activeRun?.key];
 return mark()+'<h1>Journeys</h1><p class="subtitle">'+(d?'Your active journey · '+d.name:'Pick one journey for your next miles.')+'</p>'+ (d?
 atlasButton('destination-'+activeRun.key,d.name+' route details',journeyPanel(d),'atlas-card scenic')+
 (activeRun.key==='route66'?atlasButton('chapter',d.name+' checkpoint',placeArt(d.chapterArt,d.chapter)+'<span>'+caps(journeyMiles(d)<940?'◉ NEXT CHECKPOINT':'✓ CHECKPOINT REACHED')+'<strong>'+d.chapter+'</strong></span>›','atlas-card strip'):''):'')+
 '<h3>Browse more journeys</h3>'+Object.entries(destinations).filter(([key])=>key!==activeRun?.key).map(destinationCard).join('');

}
function atlasPassport(){
 const map=passportMode==='map';
 return `<div class="passport-head">${mark()}${atlasAsset('compass','','compass')}<h1>Passport</h1></div>
 <div class="switch">${['map','book'].map((v,i)=>`<button data-atlas="${v}" aria-pressed="${v===passportMode}">${['Journey map','Stamp book'][i]}</button>`).join('')}</div>`+
 (map?`<div class="world-art">${atlasAsset('world','Illustrated world map showing virtual journeys in Boston and on Route 66; not places visited')}${atlasButton('boston','Boston map pin','','map-pin-hit boston-hit')}${atlasButton('route66','Route 66 map pin','','map-pin-hit route-hit')}</div>`:'')+
 (map?atlasButton('bostonStamp','View earned Boston stamp map','<div class="summary-imprint">'+passportImprint('Boston','assets/atlas/stamp.jpg','MARATHON FINISH')+'</div><span><strong>Virtual Boston Marathon</strong><small class="chip">✓　Journey 1 completed</small><small>26.2 mi　│　Nov 2, 2026</small></span>','atlas-card stamp-record')+'<p class="journey-sequence"><b>Journey 2 · Route 66</b><br>Chicago start → St. Louis → Tulsa → Oklahoma City</p>'+atlasButton('book','View stamp book','View stamp book　›','pill wide'):
 `<iframe class="field-book" title="Journey stamp book" src="passport/book.html?mi=${bestMiles.route66}"></iframe>`);

}
const medalDistance = goal => goal.target.toLocaleString('en-US',{maximumFractionDigits:1});
function medalArt(goal){
 const crops={'First Mile':[28,103,217,334],'Full Marathon':[256,103,218,334],'1,000 Miles':[482,103,217,334],'Earth Lap':[239,645,250,292]};
 const crop=crops[goal.title];
 if(crop)return `<svg class="specimen" aria-hidden="true" viewBox="0 0 116 160"><g clip-path="url(#hanging-medal)"><svg width="116" height="160" viewBox="${crop.join(' ')}" preserveAspectRatio="none"><image href="assets/atlas/cabinet.jpg" width="733" height="930"/></svg></g></svg>`;
 const lunar=goal.title==='Moon Landing', mark=lunar?'☾':goal.mark;
 const silver=lunar||goal.title==='10K';
 return `<svg class="specimen engraved" aria-hidden="true" viewBox="0 0 116 160">
 <path d="M23 3h70L76 51l-18 8-18-8z" fill="#14585a" stroke="#073c3f" stroke-width="3"/><path d="M43 4h9l9 41-6 6zm22 0h9l-10 44-5 4z" fill="#cfbb88"/>
 <rect x="40" y="46" width="36" height="16" rx="4" fill="none" stroke="#b29466" stroke-width="5"/>
 <circle cx="58" cy="105" r="50" fill="url(#metal-${silver?'s':'g'})" stroke="#4c443a" stroke-width="2"/>
 <circle cx="58" cy="105" r="46" fill="none" stroke="#fff4ca" stroke-width="2"/><circle cx="58" cy="105" r="42" fill="none" stroke="#735f50"/>
 <g fill="#493f32" text-anchor="middle"><text x="58" y="87" font-size="8" letter-spacing="2">✦　✦　✦</text>
 <text x="58" y="115" font-family="Georgia,serif" font-size="${lunar?37:27}" font-weight="bold">${mark}</text><text x="58" y="132" font-size="7" letter-spacing="1.1">${lunar?'LUNAR VOYAGE':'DISTANCE'}</text></g></svg>`;
}
const metalDefs='<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><clipPath id="hanging-medal"><ellipse cx="58" cy="109" rx="52" ry="49"/><path d="M23 4h69L79 66H38z"/></clipPath><linearGradient id="metal-g" x2=".8" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#fff0bd"/><stop offset=".28" stop-color="#b68b53"/><stop offset=".55" stop-color="#f0d393"/><stop offset="1" stop-color="#8e6a43"/></linearGradient><linearGradient id="metal-s" x2=".8" y2="1"><stop stop-color="#ecede8"/><stop offset=".3" stop-color="#999c98"/><stop offset=".55" stop-color="#e7e2d4"/><stop offset="1" stop-color="#92928e"/></linearGradient></defs></svg>';
function earnedTile(goal){
 return `<button class="case-tile" data-medal="${medalGoals.indexOf(goal)}" aria-label="${goal.title}">${medalArt(goal)}<span class="nameplate"><b>${goal.title}</b><small>${medalDistance(goal)} mi</small></span></button>`;
}
function milestoneShelf(title,action){
 const goal=medalGoals.find(g=>g.title===title), earned=miles>=goal.target;
 return `<button class="horizon-medal" data-atlas="${action}" aria-label="${title} progress">${medalArt(goal)}<span><small>${earned?'EARNED':'UPCOMING'}</small><strong>${title}</strong><span>${miles.toLocaleString()} / ${medalDistance(goal)} mi</span>${line(miles,goal.target)}</span></button>`;
}
function fullMedalCase(){
 const earned=medalGoals.filter(g=>miles>=g.target);
 open('Earned medal case',`<p class="case-intro">${earned.length} earned · Lifetime travel distance</p><div class="case-grid" tabindex="0" aria-label="Scrollable earned medals">${earned.map(earnedTile).join('')}</div>`);
}
function atlasMedals(){
 const earned=medalGoals.filter(g=>miles>=g.target);
 return mark()+atlasAsset('laurels','Medals · Every mile counts.','laurels')+metalDefs+
 `<section class="collection"><div class="rail-heading"><button data-slide="-1" aria-label="Previous earned medals">‹</button><h2>Earned</h2><button data-slide="1" aria-label="Next earned medals">›</button></div>
 <div class="medal-rail" tabindex="0" aria-label="Swipe earned medals">${earned.map(earnedTile).join('')}</div>
 ${atlasButton('fullCase','View all earned medals','View all earned ('+earned.length+')　›','case-open')}</section>
 <section class="horizons"><h2>Distance milestones</h2>${milestoneShelf('Earth Lap','earth')}${milestoneShelf('Moon Landing','moon')}</section>`;
}
function render(){
 const legacy=tab==='Profile'||tab==='History';
 nav.innerHTML=tabs.map(n=>`<button data-tab="${n}" ${tab===n?'aria-current="page"':''}>${svg(n)}<span>${n}</span></button>`).join('');
 main.className=legacy?'':'atlas '+tab.toLowerCase();
 main.innerHTML=({Home:atlasHome,Journeys:atlasJourneys,Passport:atlasPassport,Medals:atlasMedals,Profile:profile,History:history})[tab]();main.scrollTop=0;
}
icons.Medals='m8 3 4 6 4-6M7 3h10l-2 7m-6 0L7 3m5 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-2 11-1 3 3-1 3 1-1-3';
function go(n){dialog.close();tab=n;render()}
function bostonDetail(){open('Marathon finish stamp',atlasAsset('boston-map','Illustrated Boston virtual route map','detail-art')+'<div class="field-heading"><h3>Virtual Boston Marathon</h3>'+inkMark('Completed')+'</div>'+fieldNote('Boston')+'<p>You completed the 26.2-mile virtual journey on Nov 2, 2026. Your next journey began at mile zero of Route 66 in Chicago.</p>')}
document.addEventListener('click',event=>{
 const b=event.target.closest('button');if(!b)return;
 const action=b.dataset.atlas||'';
 if(action.startsWith('start-')){if(startJourney(action.slice(6)))go('Journeys');return}
 if(action.startsWith('destination-')){destinationDetail(action.slice(12));return}
 if(action==='chapter'){const d=destinations[activeRun?.key];open(d.chapter,placeArt(d.chapterArt,d.chapter,'detail-art')+'<div class="field-heading"><h3>'+d.chapter+'</h3>'+inkMark(journeyMiles(d)>=940?'Reached':'')+'</div><p>'+d.name+' · Virtual checkpoint</p>'+fieldNote(d.chapter));return}
 if(b.dataset.slide){const rail=main.querySelector('.medal-rail');rail.scrollBy({left:Number(b.dataset.slide)*rail.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return}
 if(action==='fullCase'){fullMedalCase();return}
 if(action==='backToCase'){fullMedalCase();return}
 if(b.dataset.medal!==undefined){const goal=medalGoals[Number(b.dataset.medal)];open(goal.title,'<h3>Medal earned</h3><p>'+medalDistance(goal)+' lifetime miles</p>'+(dialog.open?atlasButton('backToCase','Back to medal case','← Back to medal case','outline'):''));return}
 switch(b.dataset.atlas){
 case 'map':case 'book':passportMode=b.dataset.atlas;render();break;
 case 'journeys':go('Journeys');break;
 case 'boston':destinationDetail('boston');break;
 case 'bostonStamp':bostonDetail();break;
 case 'route66':destinationDetail('route66');break;
 case 'rewards':rewardsVisible=false;go('Medals');break;
 case 'later':rewardsVisible=false;render();break;
 case 'earth':open('Earth Lap','<h3>One trip around Earth</h3><p>'+miles.toLocaleString()+' of 24,901 lifetime miles</p>'+line(miles,24901));break;
 case 'moon':open('Moon Landing','<h3>238,900 miles</h3><p>'+miles.toLocaleString()+' lifetime miles · '+(miles/238900*100).toFixed(1)+'% of the way to the Moon</p>');break;
 case 'recap':recap();break;
 case 'share':share();break;
 case 'more':open('More',atlasButton('history','Travel history','Travel history','pill wide')+atlasButton('profile','Profile and demo controls','Profile & demo controls','outline wide'));break;
 case 'history':go('History');break;
 case 'profile':go('Profile');break;
 }
});
render();


// Hanging medals respond to every horizontal swipe, arrow navigation and tap.
// The shelf may contain only three earned medals, so touch gestures must work
// even when there is no horizontal scrollable overflow.
const medalMotionReduced=window.matchMedia("(prefers-reduced-motion: reduce)");
let medalGesture=null;
function swingApprovedMedals(rail,direction=1,onlyMedal=null){
 if(!rail||medalMotionReduced.matches)return;
 const medals=onlyMedal?[onlyMedal]:[...rail.querySelectorAll(".case-tile .specimen")];
 medals.forEach((medal,i)=>{
   // Web Animations API gives each gesture a fresh, self-contained animation.
   // No persistent CSS class, no restart loop during inertial scrolling.
   if(medal._swayAnimation)medal._swayAnimation.cancel();
   medal._swayAnimation=medal.animate([
     {transform:"rotate(0deg)",offset:0},
     {transform:"rotate("+(direction*7)+"deg)",offset:.19},
     {transform:"rotate("+(-direction*3.5)+"deg)",offset:.43},
     {transform:"rotate("+(direction*1.5)+"deg)",offset:.67},
     {transform:"rotate("+(-direction*.4)+"deg)",offset:.86},
     {transform:"rotate(0deg)",offset:1}
   ],{duration:1500,delay:onlyMedal?0:i%4*60,easing:"ease-out",fill:"none"});
 });
}
function medalRailFor(target){return target?.closest?.(".medal-rail,.case-grid")}
document.addEventListener("touchstart",event=>{
 const rail=medalRailFor(event.target);
 medalGesture=rail?{rail,x:event.touches[0].clientX,y:event.touches[0].clientY,fired:false}:null;
},{passive:true});
document.addEventListener("touchmove",event=>{
 if(!medalGesture||medalGesture.fired)return;
 const dx=event.touches[0].clientX-medalGesture.x;
 const dy=event.touches[0].clientY-medalGesture.y;
 if(Math.abs(dx)>=12&&Math.abs(dx)>Math.abs(dy)){
   medalGesture.fired=true;
   swingApprovedMedals(medalGesture.rail,dx<0?1:-1);
 }
},{passive:true});
document.addEventListener("touchend",event=>{
 if(!medalGesture)return;
 const dx=event.changedTouches[0].clientX-medalGesture.x;
 const dy=event.changedTouches[0].clientY-medalGesture.y;
 if(!medalGesture.fired&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)){
   swingApprovedMedals(medalGesture.rail,dx<0?1:-1);
 }
 medalGesture=null;
},{passive:true});
document.addEventListener("touchcancel",()=>{medalGesture=null;},{passive:true});
// Buttons work with mouse, keyboard, and touch.
document.addEventListener("click",event=>{
 const arrow=event.target.closest("[data-slide]");
 if(arrow){swingApprovedMedals(main.querySelector(".medal-rail"),Number(arrow.dataset.slide)>=0?1:-1);return;}
 const tile=event.target.closest(".case-tile");
 if(tile&&!medalGesture){
   const medal=tile.querySelector(".specimen");
   swingApprovedMedals(medalRailFor(tile),1,medal);
 }
});
// Trackpad/wheel scrolling gets a gentle response too, at most once per second.
let lastRailScrollSwing=0;
document.addEventListener("scroll",event=>{
 const rail=medalRailFor(event.target);
 if(!rail||medalGesture||performance.now()-lastRailScrollSwing<1000)return;
 lastRailScrollSwing=performance.now();
 swingApprovedMedals(rail,1);
},true);
