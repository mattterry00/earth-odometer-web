// Reference design shared by the Chromebook preview and the bundled iPhone interface.
const atlasAsset = (name, alt = '', cls = '') => `<img src="assets/atlas/${name}.jpg" alt="${alt}" class="${cls}">`;
const atlasButton = (action, label, contents, cls = '') => `<button data-atlas="${action}" aria-label="${label}" class="${cls}">${contents}</button>`;
const tabs = ['Home','Journeys','Passport','Medals'];
let passportMode = 'map';
const rewardReceipts = new Map();
function latestRewardNotice(dismiss = false){
 const earned=medalGoals.filter(goal=>goal.target<=medalMiles());
 if(!earned.length)return false;
 const target=earned[earned.length-1].target;
 const key='earth-odometer.home-rewards.'+dataMode;
 if(dismiss){
  rewardReceipts.set(key,target);
  try{localStorage.setItem(key,String(target));}catch{}
  return false;
 }
 let seen=rewardReceipts.get(key)||0;
 try{seen=Math.max(seen,Number(localStorage.getItem(key))||0);}catch{}
 return target>seen;
}
miles = 0;
const brandHeader = (home=false) => `<div class="brand-lockup ${home?'brand-home':'brand-small'}"><img src="assets/brand.png" alt="Earth Odometer globe and odometer logo"><span>Earth Odometer</span></div>`;
const mark = () => brandHeader();
const line = (value, max) => `<progress value="${value}" max="${max}" aria-label="Distance progress"></progress>`;
const caps = text => `<small class="caps">${text}</small>`;

// New destinations inherit the same postcard, map, and perforated stamp treatment.
const destinations = {
 ...extraJourneys,
 boston: {name:'Virtual Boston Marathon',region:'Boston, Massachusetts, USA',art:'atlas/boston',thumb:'atlas/harbor',stamp:'atlas/stamp',map:'atlas/boston-map',miles:26.2,start:26.2,chapter:'Massachusetts State House',chapterArt:'atlas/chapter'},
 route66: {name:'Route 66',region:'Chicago to Santa Monica',art:'atlas/desert',thumb:'atlas/desert',stamp:'checkpoints/santa-monica',map:'RouteMap',miles:2448,start:842,chapter:'Oklahoma City',chapterArt:'OklahomaStamp'},
 europe: {name:'Across Europe',region:'River cities and skylines · Featuring Paris',spotlight:'Paris, France',intro:'Follow Europe’s river cities through the landmarks on their banks. In the Paris preview, look for the iron lattice of the Eiffel Tower above the Seine.',art:'EuropeArtwork',stamp:'EuropeArtwork',chapter:'European cityscapes'},
 world: {name:'World Cruiser',region:'Landscapes across continents · Featuring Japan',spotlight:'Mount Fuji, Japan',intro:'Explore how people have pictured the places they travel to. This preview takes you to Japan, where one mountain appears again and again in pilgrimage routes and artists’ prints.',art:'WorldArtwork',stamp:'WorldArtwork',chapter:'Around the globe'}
};
const placeArt=(file,alt='',cls='')=>`<img class="${cls}" src="assets/${file}.jpg" alt="${alt}">`;
const modes = ['foot','road'];
const modeLabel = {foot:'Walking & Running',road:'By road'};
const modeFor = key => destinations[key]?.mode || (key==='route66'?'road':'foot');
const byJourneyDistance=([,a],[,b])=>(a.miles??Infinity)-(b.miles??Infinity);
for (const mode of modes) {
 const routes = Object.entries(destinations)
  .filter(([key, route]) => route.miles > 0 && modeFor(key) === mode)
  .sort(byJourneyDistance);
 routes.forEach(([, route], index) => { route.starter = index < 10; });
}
const activeRuns = {};
const bestMiles = {};
const pausedRuns = {};
let dismissedPausedNotice = '';
// Keep the same token through pauses and resumes. Late Health samples can
// advance a paused route without leaking into the current one.
let footTokens = {}, appliedHealth = {}, lastSentFootToken;
let roadTokens = {}, appliedRoad = {}, lastSentRoadToken;
function newFootToken(){
 return Array.from(crypto.getRandomValues(new Uint32Array(4)),n=>n.toString(16).padStart(8,'0')).join('');
}
function publishFootSelection(){
 if(!recordedTotals() || !window.webkit?.messageHandlers?.footJourney)return;
 const key=activeRuns.foot?.key;
 const token=key?(footTokens[key]??=newFootToken()):null;
 if(token===lastSentFootToken)return;
 lastSentFootToken=token;
 window.webkit.messageHandlers.footJourney.postMessage({token,at:Date.now()});
}
function publishRoadSelection(){
 if(!recordedTotals() || !window.webkit?.messageHandlers?.roadJourney)return;
 const key=activeRuns.road?.key;
 const token=key?(roadTokens[key]??=newFootToken()):null;
 if(token===lastSentRoadToken)return;
 lastSentRoadToken=token;
 window.webkit.messageHandlers.roadJourney.postMessage({token,at:Date.now()});
}
function routeFinished(key){return !!destinations[key]?.miles && bestMiles[key]>=destinations[key].miles;}
function recordFinish(key,extra){
 lastCompletion={key,extra};
 if(!pendingFinishes.some(f=>f.key===key))pendingFinishes.push(lastCompletion);
}
function applyDeviceMiles(mode,tokens,applied,totals){
 if(!totals)return false;
 let changed=false;
 for(const [key,token] of Object.entries(tokens)){
  const credited=applied[token]||0, miles=totals[token]||0;
  if(miles<=credited)continue;
  const delta=miles-credited;
  if(activeRuns[mode]?.key===key)activeRuns[mode].initialMiles+=delta;
  else if(Object.hasOwn(pausedRuns,key)){
   pausedRuns[key]=Math.min(destinations[key].miles,pausedRuns[key]+delta);
   bestMiles[key]=Math.max(bestMiles[key]||0,pausedRuns[key]);
   if(routeFinished(key)){delete pausedRuns[key];recordFinish(key,0); }
  }
  applied[token]=miles;changed=true;
 }
 return changed;
}
let previewTotals = {foot:0,road:0};
const journeyStorageKey='earth-odometer.journeys.v1';
let journeyStorageAvailable=true;
function modeTotal(mode){
 const native=recordedTotals();
 if(mode==='road' && Number.isFinite(native?.roadLifetime))return native.roadLifetime-(native.watchRoad||0);
 if(mode==='foot' && Number.isFinite(native?.footLifetime))return native.footLifetime-(native.healthFoot||0);
 return native ? native[mode+'Lifetime'] : previewTotals[mode];
}
function resetJourneyDemo(){
 for(const key of Object.keys(bestMiles))delete bestMiles[key];
 for(const key of Object.keys(pausedRuns))delete pausedRuns[key];
 delete activeRuns.foot;
 previewTotals={foot:26.2,road:1221.8};
 activeRuns.road={key:'route66',baseline:previewTotals.road,initialMiles:842};
 Object.assign(bestMiles,{boston:26.2,route66:842});
}
function journeyMiles(d){
 const key=Object.keys(destinations).find(k=>destinations[k]===d),mode=modeFor(key),run=activeRuns[mode];
 if(run?.key!==key)return pausedRuns[key]??bestMiles[key]??0;
 const gain=Math.max(0,(modeTotal(mode)??run.baseline)-run.baseline);
 const raw=run.initialMiles+gain;
 return Math.min(d.miles,Math.round(raw*1e9)/1e9);
}
function updateJourneyProgress(){
 const device=recordedTotals();
 let changed=applyDeviceMiles("foot",footTokens,appliedHealth,device?.healthJourneys);
 if(applyDeviceMiles("road",roadTokens,appliedRoad,device?.roadJourneys))changed=true;
 for(const [mode,run] of Object.entries(activeRuns)){
  const total=modeTotal(mode);
  if(!Number.isFinite(total))continue;
  if(run.baseline==null){run.baseline=total;changed=true;}
  const value=journeyMiles(destinations[run.key]);
  if(value>(bestMiles[run.key]||0)){bestMiles[run.key]=value;changed=true;}
  if(value>=destinations[run.key].miles){
   recordFinish(run.key,Math.max(0,run.initialMiles+total-run.baseline-value));
   delete activeRuns[mode];changed=true;
  }
 }
 if(recordedTotals() && activeRuns.foot && !footTokens[activeRuns.foot.key])changed=true;
 publishRoadSelection();publishFootSelection();
 return changed;
}
function activateJourney(key,initialMiles){
 const mode=modeFor(key);
 if(mode==='road' && recordedTotals() && !Object.hasOwn(pausedRuns,key)){
  if(roadTokens[key])delete appliedRoad[roadTokens[key]];
  roadTokens[key]=newFootToken();
 }
 if(mode==='foot' && recordedTotals() && !Object.hasOwn(pausedRuns,key)){
  if(footTokens[key])delete appliedHealth[footTokens[key]];
  footTokens[key]=newFootToken();
 }
 activeRuns[mode]={key,baseline:modeTotal(mode)??null,initialMiles};
 bestMiles[key]??=0;delete pausedRuns[key];
 publishRoadSelection();publishFootSelection();saveJourneyState();return true;
}
function startJourney(key){
 if(routeFinished(key)||activeRuns[modeFor(key)]||!destinations[key]?.miles||Object.hasOwn(pausedRuns,key)||!canTravel(key))return false;
 return activateJourney(key,0);
}
function saveJourneyState(){
 try{
  const snapshot=JSON.stringify({version:2,startExperienceVersion:2,miles,activeRuns,previewTotals,bestMiles,pausedRuns,dismissedPausedNotice,footTokens,appliedHealth,roadTokens,appliedRoad,dataMode,lastCompletion,pendingFinishes});
  if(recordedTotals())localStorage.setItem(journeyStorageKey+'.recorded',snapshot);
  localStorage.setItem(journeyStorageKey,snapshot);
 }
 catch{journeyStorageAvailable=false;}
}
function restoreJourneyState(storageKey=journeyStorageKey){
 try{
  const state=JSON.parse(localStorage.getItem(storageKey)||'null');
  if(!state||![1,2].includes(state.version)||(state.startExperienceVersion!==2&&state.dataMode!=='fresh'))return;
  miles=state.miles;dataMode=state.dataMode==='fresh'?'fresh':'sample';
  previewTotals=state.previewTotals||{foot:0,road:miles};
  for(const table of [activeRuns,bestMiles,pausedRuns])for(const key of Object.keys(table))delete table[key];
  roadTokens=state.roadTokens||{};appliedRoad=state.appliedRoad||{};
  footTokens=state.footTokens||{};appliedHealth=state.appliedHealth||{};
  Object.assign(bestMiles,state.bestMiles);Object.assign(pausedRuns,state.pausedRuns);
  for(const mode of modes){
   const run=state.activeRuns?.[mode];
   if(run&&destinations[run.key]?.miles&&modeFor(run.key)===mode)activeRuns[mode]=run;
  }
  const old=state.activeRun;
  if(state.version===1&&old&&destinations[old.key]?.miles){
   const mode=modeFor(old.key);
   activeRuns[mode]={key:old.key,baseline:modeTotal(mode)??null,initialMiles:Math.min(destinations[old.key].miles,old.initialMiles+Math.max(0,miles-old.odometerAtStart))};
  }
  for(const key of Object.keys(pausedRuns))if(routeFinished(key))delete pausedRuns[key];
  for(const mode of modes)if(routeFinished(activeRuns[mode]?.key))delete activeRuns[mode];
  dismissedPausedNotice=state.dismissedPausedNotice||'';
  lastCompletion=state.lastCompletion||null;
  pendingFinishes=(state.pendingFinishes||[]).filter(f=>routeFinished(f.key));
  if(updateJourneyProgress())saveJourneyState();
 }catch{journeyStorageAvailable=false;}
}
function pauseJourney(mode){
 updateJourneyProgress();
 const run=activeRuns[mode];if(!run)return false;
 dismissedPausedNotice='';
 pausedRuns[run.key]=journeyMiles(destinations[run.key]);delete activeRuns[mode];publishRoadSelection();publishFootSelection();
 saveJourneyState();return true;
}
function resumeJourney(key){
 if(routeFinished(key)||activeRuns[modeFor(key)]||!Object.hasOwn(pausedRuns,key)||!canTravel(key))return false;
 return activateJourney(key,pausedRuns[key]);
}
function switchJourney(key){
 const mode=modeFor(key);
 if(routeFinished(key)||!destinations[key]?.miles||activeRuns[mode]?.key===key||!canTravel(key))return false;
 if(activeRuns[mode])pauseJourney(mode);
 return Object.hasOwn(pausedRuns,key)?resumeJourney(key):startJourney(key);
}
function selectionControl(key){
 const activeRun=activeRuns[modeFor(key)];
 const d=destinations[key],paused=Object.hasOwn(pausedRuns,key);
 if(routeFinished(key))return atlasButton('completed-'+key,'View finish stamp','View finish stamp','outline wide');
 if(!canTravel(key)&&activeRun?.key!==key)return '<p class="journey-sequence">Premium journey · Your earned stamps stay saved.</p><button class="pill wide" data-release="premium" data-key="'+key+'">Explore Premium</button>';
 if(!d.miles)return '<p class="journey-sequence">Coming soon · Explore the artwork and field note.</p>';
 if(activeRun?.key===key)return '<p class="journey-sequence"><b>Your active '+modeLabel[modeFor(key)].toLowerCase()+' journey</b> · Matching miles count here.</p>'+atlasButton('pause-'+modeFor(key),'Pause '+d.name,'Pause journey','outline wide')+'<p class="journey-help">Your progress and stamps stay saved. While paused, new miles count only toward your lifetime total and whichever journey is active.</p>';
 const action=paused?'resume-':'start-';
 const label=paused?'Resume journey':'Start journey';
 const saved=paused?'<p class="journey-sequence"><b>Paused at '+pausedRuns[key].toLocaleString()+' mi</b> · Resume from here.</p>':'';
 if(activeRun)return saved+'<p class="journey-sequence">'+destinations[activeRun.key].name+' is active. Switching pauses it and saves its progress.</p>'+atlasButton('switch-'+key,'Pause '+destinations[activeRun.key].name+' and '+(paused?'resume ':'start ')+d.name,'Pause current & '+(paused?'resume':'start')+' this journey','pill wide');
 return saved+atlasButton(action+key,(paused?'Resume ':'Start ')+d.name,label,'pill wide');
}
function destinationCard([key,d]){
 const locked=!!d.miles&&!canTravel(key)&&!routeFinished(key);
 const access=d.starter?'Free':locked?'🔒 Premium':'Premium';
 const progress=Object.hasOwn(pausedRuns,key)?'Paused · '+pausedRuns[key].toLocaleString()+' / ':'';
 return atlasButton('destination-'+key,'Explore '+d.name+(locked?', locked Premium journey':''),placeArt(d.thumb||d.art,d.name)+'<span><strong>'+d.name+'</strong><small>'+d.region+'</small><small>'+(d.miles?progress+d.miles.toLocaleString()+' mi · '+modeLabel[modeFor(key)]+' · '+access:'Upcoming journey')+'</small></span>›','atlas-card strip'+(locked?' journey-locked':''));

}
function journeyPoster(d){
 return '<div class="journey-poster">'+placeArt(d.art,d.name+' illustrated journey')+
 (d===destinations.boston?'':'<div class="poster-label">'+caps('VIRTUAL JOURNEY')+'<strong>'+d.name+'</strong><small>'+d.region+'</small></div>')+'</div>';
}
function journeyPanel(d){
 const v=d.miles?journeyMiles(d):0;
 return journeyPoster(d)+(d.points?journeyRouteMap(d,v):d===destinations.route66?mapArt(v):d===destinations.boston&&v>=d.miles?completedBostonMap():d.map?placeArt(d.map,'Illustrated '+d.name+' route map','atlas-map'):'')+
 (d.miles?`<div class="measure">Progress　<b>${v.toLocaleString('en-US',{maximumFractionDigits:3})} / ${d.miles.toLocaleString()} mi</b><em>${(100*v/d.miles).toFixed(1)}%</em>${line(v,d.miles)}</div>`:'<section class="upcoming-story">'+caps('UPCOMING JOURNEY · FEATURED PLACE')+'<h3>'+d.spotlight+'</h3><p>'+d.intro+'</p></section>');
}
function routeItinerary(){
 const rows=stops.filter(s=>!s.completed&&!s.journey).map(s=>`<li><span>${s.city}</span><b>${s.mile.toLocaleString()} mi</b></li>`).join('');
 return '<details class="route-itinerary"><summary>Route 66 checkpoints</summary><small>Virtual miles from Chicago</small><ol>'+rows+'</ol></details>';
}
function inPersonJourneyAction(key){
 const labels={freedom:'Walk this route in person',redrockdrive:'Drive this route in person'};
 const label=labels[key];
 if(!label)return '';
 return atlasButton('in-person-'+key,label,label,'outline wide');
}
function inPersonJourneySection(){
 return '<section><h2>In-person journeys</h2>'+
  atlasButton('destination-freedom','Open Freedom Trail in Boston','Walk the Freedom Trail　›','outline wide')+
  atlasButton('destination-redrockdrive','Open Red Rock Canyon Scenic Drive','Drive Red Rock Canyon　›','outline wide')+'</section>';
}
function destinationDetail(key){
 const d=destinations[key];
 open(d.name,'<div class="atlas destination-detail">'+contextShare('journey-'+key,'Share journey')+journeyPanel(d)+(d.intro&&d.miles?'<p>'+d.intro+'</p>':'')+(key==='route66'?routeItinerary():'')+(d.note?journeyFieldNote(d):fieldNote(key==='boston'?'Boston':key==='route66'?'Chicago':d.spotlight))+selectionControl(key)+inPersonJourneyAction(key)+journeyGuide(key)+'<div class="field-heading"><h3>'+(d.miles?'Journey stamp':'Stamp preview')+'</h3>'+inkMark(d.miles&&bestMiles[key]>=d.miles?'Completed':'')+'</div><div class="journey-imprint">'+passportImprint(d.name,'assets/'+d.stamp+'.jpg')+'</div>'+
 (key==='boston'?'<p>Your passport keeps the stamp from your first finish, after you choose another journey.</p>':'')+destinationIllustration(key)+'</div>');
}

function pausedJourneyEntries(){
 return Object.entries(destinations).filter(([key,route])=>route.miles && Object.hasOwn(pausedRuns,key) &&
  activeRuns[modeFor(key)]?.key!==key && !routeFinished(key)).sort(byJourneyDistance);
}
function pausedJourneyBanner(){
 if(modes.some(mode=>activeRuns[mode]))return '';
 const keys=pausedJourneyEntries().map(([key])=>key);
 if(!keys.length||dismissedPausedNotice===keys.join(','))return '';
 const one=keys.length===1,key=keys[0],name=destinations[key].name;
 const title=one?'Saved journey: '+name:keys.length+' journeys are paused';
 const saved=one?distanceText(pausedRuns[key])+' saved.':'Your progress and earned stamps are saved.';
 const message='Your lifetime total continues to include all recorded miles.';
 const action=one&&!activeRuns[modeFor(key)]&&canTravel(key)?atlasButton('resume-'+key,'Resume '+name,'Resume journey','outline'):atlasButton('paused-list','View paused journeys','View paused journeys','outline');
 return '<aside class="paused-banner" aria-label="Paused journey notice" style="position:relative;padding-right:3.25rem"><button type="button" data-atlas="dismiss-paused" aria-label="Dismiss paused journey notice" style="position:absolute;right:2px;top:2px;width:44px;height:44px;display:grid;place-items:center;padding:0;border:0;background:transparent;color:inherit;font-size:1.5rem;line-height:1"><span aria-hidden="true">×</span></button><strong>'+title+'</strong><p>'+saved+' '+message+'</p>'+action+'</aside>';
}

function earthLapProgress(total=lifetimeMiles()){
 const distance=24901,completed=Math.floor(total/distance),current=total%distance;
 return {completed,current,remaining:Math.ceil(distance-current),percent:Math.floor(current/distance*100),label:completed?'next':'first'};
}
function earthLapRemaining(p){return p.remaining.toLocaleString()+' miles to your '+p.label+' Earth lap';}
function journeyChoices(){
 const cards=modes.map(mode=>{
  const run=activeRuns[mode];
  const label=modeLabel[mode];
  if(!run){
   const prompt=mode==='foot'?'Choose a walking or running journey':'Choose a driving journey';
   return atlasButton('choose-'+mode,prompt,caps(label)+'<strong>'+prompt+'　›</strong>','atlas-card active');
  }
  const route=destinations[run.key];
  const progress=journeyMiles(route);
  return atlasButton('destination-'+run.key,'Open '+route.name,caps(label)+'<strong>'+route.name+'</strong><b>'+distanceText(progress)+' of '+distanceText(route.miles)+'</b>'+line(progress,route.miles),'atlas-card active');
 }).join('');
 const hint=modes.some(mode=>activeRuns[mode])?'':'<p class="subtitle">Choose either journey or both. With tracking enabled, your walks, runs, and drives count automatically.</p>';
 return hint+'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,19rem),1fr));gap:.5rem">'+cards+'</div>';
}
function atlasHome(){
 const miles=lifetimeMiles();
 const lap=earthLapProgress();

 const rollers=String(Math.floor(preferences.units==='km'?miles*1.609344:miles)).padStart(6,'0').split('').map(d=>`<b>${d}</b>`).join('');
 return brandHeader(true)+trackingStatus()+
 `<p class="odometer-label">LIFETIME ${preferences.units==='km'?'KILOMETERS':'MILES'}</p><div class="counter" aria-label="Lifetime odometer ${miles} miles"><div>${rollers}</div></div>
 <div class="card-actions home-share">${atlasButton('share','Share lifetime miles',inkIcon('share')+' Share my miles','context-share')}</div>
 <div class="pair"><button data-atlas="today-modes">${inkIcon('sunrise')}<span>Today<b>${todayMiles().toLocaleString(undefined,{maximumFractionDigits:2})} mi</b><small>See breakdown</small></span></button><button data-atlas="year-modes">${inkIcon('calendar')}<span>This Year<b>${yearMiles().toLocaleString(undefined,{maximumFractionDigits:2})} mi</b><small>See breakdown</small></span></button></div>
 <button class="earth-link" data-atlas="earth" aria-label="Earth lap progress"><span class="orb">${atlasAsset('globe','Teal globe with orbital ring')}<span class="earth-lap-total">Earth laps<b>${(miles/24901).toFixed(2)}</b><small>View progress　›</small></span></span><span class="earth-lap-remaining">${earthLapRemaining(lap)}</span><progress value="${lap.current}" max="24901" aria-label="Progress toward your ${lap.label} Earth lap"></progress></button>`+
 pausedJourneyBanner()+
 (miles===0?'<div class="empty-note"><strong>A lifetime of miles starts here.</strong><p>Choose a free journey to start collecting stamps. Your first medal unlocks at 1 mile.</p></div>':'')+
 journeyChoices()+
 (latestRewardNotice()?`<div class="reward atlas-card"><span aria-hidden="true">✦</span><div>In your medal case<strong>Your latest medals</strong>${atlasButton('rewards','View rewards','View rewards','pill')} ${atlasButton('later','Dismiss','Dismiss','outline')}</div></div>`:'')+
 `<small class="sample-caption">Design preview · ${dataMode==='fresh'?'Fresh start':'Sample travel data'}</small>`;
}
function routeCheckpoint(){
 const current=journeyMiles(destinations.route66);
 return stops.find(s=>!s.completed&&!s.journey && s.mile>current)||stops.find(s=>s.finish&&!s.journey);
}
function activeCheckpoint(activeRun){
 if(!activeRun)return null;
 const value=journeyMiles(destinations[activeRun.key]);
 return stops.find(s=>!s.completed&&(s.journey||'route66')===activeRun.key&&s.mile>value);
}
const historyJourneys = new Set(['freedom','bostoncommon','northendwalk','route66','prairieroad','oklahomaroad','panhandleroad','pacificroad']);
function journeyCollection(key, route){
 return route.collection || (historyJourneys.has(key) ? 'History' : 'Other journeys');
}
function catalogSection(entries, starter){
 const available=entries.filter(([,route])=>Boolean(route.starter)===starter);
 if(!available.length)return '';
 const cards=list=>list.map(([key,route])=>'<div data-catalog-mode="'+modeFor(key)+'">'+destinationCard([key,route])+'</div>').join('');
 const title=starter?'Free journeys':'Premium journeys';
 if(starter)return '<section><h2>'+title+'</h2>'+cards(available)+'</section>';
 const groups=['National Parks','History','Other journeys'].map(name=>{
  const group=available.filter(([key,route])=>journeyCollection(key,route)===name);
  return group.length?'<h3>'+name+'</h3>'+cards(group):'';
 }).join('');
 return '<section><h2>'+title+'</h2>'+groups+'</section>';
}
function atlasJourneys(){
 const current=modes.map(mode=>{
  const run=activeRuns[mode];
  if(!run)return '';
  const d=destinations[run.key],stop=activeCheckpoint(run);
  return '<h2>'+modeLabel[mode]+'</h2>'+atlasButton('destination-'+run.key,'Open '+d.name,journeyPanel(d),'atlas-card scenic')+
   (stop?atlasButton('chapter-'+mode,stop.city,placeArt(stop.image,stop.city)+'<span>'+caps('NEXT CHECKPOINT')+'<strong>'+stop.city+'</strong></span>','atlas-card strip'):'')+
   atlasButton('pause-'+mode,'Pause '+d.name,'Pause journey','outline wide');
 }).join('');
 const available=Object.entries(destinations).filter(([key,d])=>d.miles&&activeRuns[modeFor(key)]?.key!==key&&!routeFinished(key)).sort(byJourneyDistance);
 const paused=pausedJourneyEntries();
 const pausedSection=paused.length?'<section><h2>Paused journeys ('+paused.length+')</h2>'+paused.map(destinationCard).join('')+'</section>':'';
 return mark()+'<h1>Journeys</h1>'+inPersonJourneySection()+journeyChoices()+pausedSection+current+catalogSection(available,true)+catalogSection(available,false);
}
function completedJourneyRecords(){
 return Object.keys(bestMiles).map(key=>[key,destinations[key]]).filter(([key,d])=>d?.miles&&bestMiles[key]>=d.miles).map(([key,d])=>
 atlasButton('completed-'+key,'View completed '+d.name,'<div class="summary-imprint">'+passportImprint(d.name,'assets/'+d.stamp+'.jpg','JOURNEY FINISH')+'</div><span><strong>'+d.name+'</strong><small class="chip">✓　Journey completed</small><small>'+d.miles.toLocaleString()+' virtual miles</small></span>','atlas-card stamp-record')).join('');
}
function completedJourneyDetail(key){
 const d=destinations[key];
 const map=d.points?journeyRouteMap(d,d.miles):key==='boston'?completedBostonMap():completedRoute66Map();
 open(d.name+' · Completed',inPersonJourneyAction(key)+placeArt(d.art,d.name+' illustration','detail-art')+map+'<div class="field-heading"><h3>'+d.name+'</h3>'+inkMark('Completed')+'</div>'+contextShare('finish-'+key,'Share completed journey')+'<p>'+d.miles.toLocaleString()+' virtual miles completed. This finish stays in your passport.</p>'+journeyGuide(key)+destinationIllustration(key));
}
function earnedStampCount(){return stops.filter(stop=>stampEarned(stop,bestMiles)).length;}
function personalJourneyMap(){
 const keys=new Set([...Object.keys(bestMiles),...Object.keys(pausedRuns),...Object.values(activeRuns).map(run=>run.key)]);
 const places=[];
 for(const key of keys){
  const scene=sceneFor(key);
  if(!scene || !destinations[key]?.miles)continue;
  const [lon,lat]=scene.location;
  const x=(lon+126)*10, y=(51-lat)*12;
  let place=places.find(p=>Math.hypot(p.x-x,p.y-y)<12);
  if(!place){place={x,y,keys:[]};places.push(place);}
  place.keys.push(key);
 }
 if(!places.length)return '<p class="journey-sequence">Start a journey to add its location to your map.</p>';
 const pins=places.map((place,i)=>`<g transform="translate(${place.x} ${place.y})"><circle r="10" fill="#235450" stroke="white" stroke-width="2"/><text y="3.5" text-anchor="middle" fill="white" font-size="11">${i+1}</text></g>`).join('');
 const legend=places.flatMap((place,i)=>place.keys.map(key=>atlasButton('destination-'+key,destinations[key].name+' map pin','<b>'+String(i+1)+'</b>　'+destinations[key].name,'outline'))).join('');
 return '<svg viewBox="0 0 610 330" class="personal-journey-map" role="img" aria-label="Locations of your virtual journeys"><image href="assets/journey-map.svg" width="610" height="330"/>'+pins+'</svg><div class="journey-map-legend">'+legend+'</div>';
}
function atlasPassport(){
 const map=passportMode==='map';
 const count=earnedStampCount();
 const summary='<p class="subtitle">'+count+' of '+stops.length+' stamps earned'+(dataMode==='sample'?' · Sample progress':'')+'</p>';
 return `<div class="passport-head">${mark()}${atlasAsset('compass','','compass')}<h1>Passport</h1></div>${summary}
 <div class="switch">${['map','book'].map((v,i)=>`<button data-atlas="${v}" aria-pressed="${v===passportMode}">${['Journey map','Stamp book'][i]}</button>`).join('')}</div>`+
 (map?personalJourneyMap():'')+
 (map?completedJourneyRecords()+
 (Object.values(activeRuns).map(activeRun=>'<p class="journey-sequence"><b>Active · '+destinations[activeRun.key].name+'</b><br>'+journeyMiles(destinations[activeRun.key]).toLocaleString()+' / '+destinations[activeRun.key].miles.toLocaleString()+' virtual miles</p>').join('')||'<p class="journey-sequence">Choose your next journey from Journeys.</p>')+
 atlasButton('book','View stamp book','View stamp book　›','pill wide'):
 `<iframe class="field-book" title="Journey stamp book" src="passport/book.html?mi=${bestMiles.route66||0}&progress=${encodeURIComponent(JSON.stringify(bestMiles))}&active=${Object.values(activeRuns).map(run=>run.key).join(',')}&paused=${encodeURIComponent(JSON.stringify(Object.keys(pausedRuns)))}&units=${preferences.units}"></iframe>`);


}
const medalDistance = goal => goal.target.toLocaleString('en-US',{maximumFractionDigits:1});
function medalImagePath(goal){
 return 'assets/medals/'+goal.title.toLowerCase().replaceAll(',','').replaceAll(' ','-')+'.png';
}
function medalArt(goal){
 return '<img class="specimen" src="'+medalImagePath(goal)+'" alt="'+goal.title+' medal">';
}
function medalPortrait(goal){
 const earned=medalMiles()>=goal.target;
 return '<figure class="medal-portrait">'+medalArt(goal)+'<figcaption>'+(earned?'Earned medal':'Locked milestone')+'</figcaption></figure>';
}
function earnedTile(goal){
 return `<button class="case-tile" data-medal="${medalGoals.indexOf(goal)}" aria-label="${goal.title}">${medalArt(goal)}<span class="nameplate"><b>${goal.title}</b><small>${distanceText(goal.target)} traveled</small></span></button>`;
}
function milestoneShelf(title,action){
 const miles=medalMiles();
 const goal=medalGoals.find(g=>g.title===title), earned=miles>=goal.target;
 return `<button class="horizon-medal" ${action?`data-atlas="${action}"`:`data-medal="${medalGoals.indexOf(goal)}"`} aria-label="${title} progress">${medalArt(goal)}<span><small>${earned?'EARNED':'UPCOMING'}</small><strong>${title}</strong><span>${displayNumber(miles)} / ${distanceText(goal.target)}</span>${line(miles,goal.target)}</span></button>`;
}
function fullMedalCase(){
 const miles=medalMiles();
 const earned=medalGoals.filter(g=>miles>=g.target);
 open('Earned medal case',`<p class="case-intro">${earned.length} earned · Lifetime travel distance</p><div class="case-grid" tabindex="0" aria-label="Scrollable earned medals">${earned.map(earnedTile).join('')}</div>`);
}
function atlasMedals(){
 const miles=medalMiles();
 const earned=medalGoals.filter(g=>miles>=g.target);
 const totals=window.recordedMiles || recordedTotals();
 const activity=totals?.activityMiles||{};
 const running=activity.running?.lifetime||0;
 const breakdown=(totals?.categories?Object.entries(totals.categories.lifetime||{}).map(([type,value])=>[type.toLowerCase(),value]):[['walking',Math.max(0,(totals?.footLifetime||0)-running)],['running',running],
                  ['cycling',activity.cycling?.lifetime||0],['driving',totals?.roadLifetime||0],
                  ['flying',activity.flying?.lifetime||0]]).filter(([,value])=>value>0);
 const mileage=totals&&breakdown.length?breakdown.map(([label,value])=>distanceText(value)+' '+label).join(' + '):
  distanceText(miles)+(!totals&&dataMode==='sample'?' · Sample progress':' total');
 return mark()+atlasAsset('laurels','Medals · Every mile counts.','laurels')+'<p class="medal-explainer">'+earned.length+' of '+medalGoals.length+' medals earned · '+mileage+'.</p>'+
 (earned.length?`<section class="collection"><div class="rail-heading"><button data-slide="-1" aria-label="Previous earned medals">‹</button><h2>Earned</h2><button data-slide="1" aria-label="Next earned medals">›</button></div>
 <div class="medal-rail" tabindex="0" aria-label="Swipe earned medals">${earned.map(earnedTile).join('')}</div>
 ${atlasButton('fullCase','View all earned medals','View all earned ('+earned.length+')　›','case-open')}</section>`:'<p class="journey-sequence">Your first medal unlocks at 1 recorded mile.</p>')+
 ` <section class="horizons"><h2>Distance milestones</h2>${medalGoals.filter(g=>miles<g.target).map(g=>milestoneShelf(g.title,g.title==='Earth Lap'?'earth':g.title==='Moon Landing'?'moon':null)).join('')||'<p>Every medal earned. Your odometer keeps counting.</p>'}</section>`;
}
// A slow, gently damped ribbon swing follows actual carousel movement, including touch momentum.
let cleanUpMedalSwing=()=>{};
function bindMedalSwing(){
 cleanUpMedalSwing();
 const rail=main.querySelector('.medal-rail');if(!rail)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,lastLeft=rail.scrollLeft,lastScroll=0,lastFrame=0,angle=0,velocity=0,target=0;
 const stop=()=>{cancelAnimationFrame(frame);frame=0;angle=0;velocity=0;target=0;rail.style.removeProperty('--medal-swing');};
 const tick=now=>{
  if(!rail.isConnected||reduced.matches){stop();return;}
  const dt=Math.min(2,Math.max(.25,(now-lastFrame)/16.667));lastFrame=now;
  const pull=now-lastScroll<110?target:0;
  velocity+=(pull-angle)*.028*dt;velocity*=Math.pow(.955,dt);
  angle=Math.max(-12,Math.min(12,angle+velocity*dt));
  rail.style.setProperty('--medal-swing',angle.toFixed(3)+'deg');
  if(now-lastScroll<110||Math.abs(angle)>.025||Math.abs(velocity)>.025)frame=requestAnimationFrame(tick);
  else stop();
 };
 const scroll=()=>{
  const delta=rail.scrollLeft-lastLeft;lastLeft=rail.scrollLeft;
  if(reduced.matches||Math.abs(delta)<.1)return;
  target=Math.max(-10,Math.min(10,-delta*.5));lastScroll=performance.now();
  if(!frame){lastFrame=lastScroll;frame=requestAnimationFrame(tick);}
 };
 const change=()=>{if(reduced.matches)stop();};
 rail.addEventListener('scroll',scroll,{passive:true});reduced.addEventListener('change',change);
 cleanUpMedalSwing=()=>{stop();rail.removeEventListener('scroll',scroll);reduced.removeEventListener('change',change);};
}
let profileOrigin = 'Home';
function render(){
 const legacy=tab==='Profile'||tab==='History';
 nav.innerHTML=tabs.map(n=>`<button data-tab="${n}" ${tab===n?'aria-current="page"':''}>${svg(n)}<span>${n}</span></button>`).join('');
 main.className=legacy?'':'atlas '+tab.toLowerCase();
 const backTarget=tab==='History'?'Profile':profileOrigin;
 const backLabel='Back to '+backTarget;
 main.innerHTML=(legacy?atlasButton('account-back',backLabel,'<span aria-hidden="true"></span>','account-chevron'):atlasButton('profile','Open profile',svg('Profile'),'profile-access'))+({Home:atlasHome,Journeys:atlasJourneys,Passport:atlasPassport,Medals:atlasMedals,Profile:profile,History:history})[tab]();main.scrollTop=0;localizeDistances(main);const tracking=document.querySelector('#tracking-demo');if(tracking)tracking.value=preferences.trackingDemo;bindMedalSwing();
}
icons.Medals='m8 3 4 6 4-6M7 3h10l-2 7m-6 0L7 3m5 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-2 11-1 3 3-1 3 1-1-3';
function go(n){dialog.close();tab=n;render()}
function bostonDetail(){open('Marathon finish stamp',completedBostonMap()+'<div class="field-heading"><h3>Virtual Boston Marathon</h3>'+inkMark('Completed')+'</div>'+contextShare('finish-boston','Share journey')+fieldNote('Boston')+'<p>You completed the 26.2-mile virtual journey on Nov 2, 2026. Your next journey began at mile zero of Route 66 in Chicago.</p>')}
document.addEventListener('click',event=>{
 const b=event.target.closest('button');if(!b)return;
 const action=b.dataset.atlas||'';
 if(b.dataset.card){share(b.dataset.card);return}
 if(action==='choose-foot'||action==='choose-road'){
  const mode=action.slice(7);
  const choices=Object.entries(destinations).filter(([key,d])=>d.miles && modeFor(key)===mode && !routeFinished(key) && activeRuns[mode]?.key!==key).sort(byJourneyDistance);
  open(mode==='foot'?'Choose a walking or running journey':'Choose a driving journey',
   '<div class="atlas journey-picker">'+(catalogSection(choices,true)+catalogSection(choices,false) || '<p>You have completed every available journey of this type.</p>')+'</div>');
  return;
 }
 if(action.startsWith('pause-')){pauseJourney(action.slice(6));go('Journeys');toast('Journey paused. Your progress is saved.');return}
 if(action.startsWith('resume-')){if(resumeJourney(action.slice(7)))go('Journeys');return}
 if(action.startsWith('switch-')){if(switchJourney(action.slice(7)))go('Journeys');return}
 if(action.startsWith('start-')){if(startJourney(action.slice(6)))go('Journeys');return}
 if(action.startsWith('completed-')){completedJourneyDetail(action.slice(10));return}
 if(action.startsWith('in-person-')){
  const key=action.slice('in-person-'.length);
  if(!['freedom','redrockdrive'].includes(key))return;
  const bridge=window.webkit?.messageHandlers?.driveTest;
  if(!bridge){
   open(destinations[key].name,'<p>Open this route in the Earth Odometer iPhone app to view the checkpoints and record your '+(key==='freedom'?'walk':'drive')+'.</p><a href="guide.html#in-person">Read the in-person journey guide</a>');
  } else if(canTravel(key)){
   bridge.postMessage({section:'in-person',route:key});
  } else {
   premiumInfo(key);
  }
  return;
 }
 if(action.startsWith('destination-')){destinationDetail(action.slice(12));return}
 if(action.startsWith('chapter-')){
  const activeRun=activeRuns[action.slice(8)];
  const stop=activeCheckpoint(activeRun);if(!stop)return;
  const d=destinations[activeRun.key],remaining=Math.max(0,stop.mile-journeyMiles(d));
  open(stop.city,placeArt(stop.image,stop.city+' virtual journey illustration','detail-art')+'<h3>'+stop.city+'</h3><p>'+d.name+' · Mile '+stop.mile.toLocaleString()+' · '+remaining.toLocaleString()+' mi to go</p>'+(d.note?journeyFieldNote(d):fieldNote(stop.city)));
  return;
 }
 if(b.dataset.slide){const rail=main.querySelector('.medal-rail');rail.scrollBy({left:Number(b.dataset.slide)*rail.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return}
 if(action==='fullCase'){fullMedalCase();return}
 if(action==='backToCase'){fullMedalCase();return}
 if(b.dataset.medal!==undefined){const miles=medalMiles();const goal=medalGoals[Number(b.dataset.medal)];open(goal.title,medalPortrait(goal)+contextShare('medal-'+medalGoals.indexOf(goal),'Share medal')+'<p>'+distanceText(goal.target)+' of lifetime travel</p><p>Earned across all travel modes. This is a cumulative distance milestone, not a verified race finish.</p>'+(miles<goal.target?'<p>'+(100*miles/goal.target).toFixed(1)+'% complete · '+Math.ceil(goal.target-miles).toLocaleString()+' mi to go</p>'+line(miles,goal.target):'')+(b.closest('.case-grid')?atlasButton('backToCase','Back to medal case','← Back to medal case','outline'):''));return}
 switch(b.dataset.atlas){
 case 'map':case 'book':passportMode=b.dataset.atlas;render();break;
 case 'dismiss-paused':
  dismissedPausedNotice=pausedJourneyEntries().map(([key])=>key).join(',');
  saveJourneyState();render();break;
 case 'paused-list':open('Paused journeys',pausedJourneyEntries().map(destinationCard).join('')||'<p>No paused journeys.</p>');break;
 case 'journeys':go('Journeys');break;
 case 'boston':destinationDetail('boston');break;
 case 'bostonStamp':bostonDetail();break;
 case 'route66':destinationDetail('route66');break;
 case 'rewards':{
  const recent=medalGoals.filter(g=>medalMiles()>=g.target).slice(-2);
  latestRewardNotice(true);go('Medals');
  const shelf=main.querySelector('.medal-rail');
  shelf.scrollLeft=shelf.scrollWidth;
  toast('Latest medals: '+recent.map(g=>g.title).join(' and ')+'.');
  break;
 }
 case 'later':latestRewardNotice(true);render();toast('Your rewards are saved in Medals.');break;
 case 'earth':{const lap=earthLapProgress();open('Earth Lap',medalPortrait(medalGoals.find(g=>g.title==='Earth Lap'))+contextShare('earth','Share Earth progress')+'<h3>'+lap.percent+'% complete toward your '+lap.label+' Earth lap</h3><p>'+earthLapRemaining(lap)+'</p><p>'+lap.completed+' completed Earth '+(lap.completed===1?'lap':'laps')+' · '+lifetimeMiles().toLocaleString()+' lifetime miles</p>'+line(lap.current,24901));break;}
 case 'moon':open('Moon Landing',medalPortrait(medalGoals.find(g=>g.title==='Moon Landing'))+contextShare('medal-'+medalGoals.findIndex(g=>g.title==='Moon Landing'),'Share Moon progress')+'<h3>238,855 miles</h3><p>'+lifetimeMiles().toLocaleString()+' lifetime miles · '+(lifetimeMiles()/238855*100).toFixed(1)+'% of the way to the Moon</p>');break;
 case 'recap':recap();break;
 case 'share':share('lifetime');break;
 case 'today-modes':showModes('today');break;
 case 'year-modes':showModes('year');break;
 case 'more':open('More',atlasButton('history','Travel history','Travel history','pill wide')+atlasButton('profile','Profile and demo controls','Profile & demo controls','outline wide'));break;
 case 'account-back':go(tab==='History'?'Profile':profileOrigin);break;
 case 'history':go('History');break;
 case 'profile':if(tabs.includes(tab))profileOrigin=tab;go('Profile');break;
 }
});
restoreJourneyState();
if(window.recordedMiles && dataMode==='sample')freshStart();
saveJourneyState();
render();
finishReleaseSetup();
checkMedalAwards();

window.addEventListener('message',event=>{
 const book=document.querySelector('.field-book');
 if(!book||event.source!==book.contentWindow)return;
 const index=event.data?.shareStamp;
 if(!Number.isInteger(index)||!stops[index])return;
 const stop=stops[index];
 if(stampEarned(stop,bestMiles))share(stop.completed?'finish-boston':stop.finish?'finish-'+(stop.journey||'route66'):'checkpoint-'+index);
});

window.addEventListener('storage',event=>{
 if(event.key!==journeyStorageKey)return;
 restoreJourneyState();
 dialog.close();render();
});

