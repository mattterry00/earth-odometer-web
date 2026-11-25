// Product flows for the browser preview. Native tracking and billing are not connected.
const preferenceKey='earth-odometer.preferences.v1';
let preferences={units:'mi',introSeen:false,premiumPreview:false,trackingDemo:'off'};
try{const p=JSON.parse(localStorage.getItem(preferenceKey)||'null');if(p){preferences.units=p.units==='km'?'km':'mi';preferences.introSeen=!!p.introSeen;preferences.premiumPreview=!!p.premiumPreview;preferences.trackingDemo=['off','permission','issue'].includes(p.trackingDemo)?p.trackingDemo:'off';}}catch{}
const nativeBilling = window.webkit?.messageHandlers?.membershipReady;
let nativePremium = null;
function hasPremium(){return nativeBilling ? nativePremium === true : preferences.premiumPreview;}
window.applyMembership = function(active){
 if(nativePremium === active)return;
 nativePremium = active;
 if(!active){
  for(const [mode,run] of Object.entries(activeRuns))if(run && !destinations[run.key]?.starter)pauseJourney(mode);
 }
 render();
};
let pendingFinishes=[];
let dataMode='fresh',lastCompletion=null,onboardingStep=0;
function savePreferences(){try{localStorage.setItem(preferenceKey,JSON.stringify(preferences))}catch{toast('Settings could not be saved in this browser.')}}
const recordedTotals=()=>dataMode==='fresh'?window.recordedMiles:null;
const lifetimeMiles=()=>recordedTotals()?.lifetime??miles;
const medalMiles=()=>Math.max(0,Number(window.recordedMiles?.lifetime ?? lifetimeMiles()) || 0);
const yearMiles=()=>recordedTotals()?.year??miles;
const displayNumber=n=>(preferences.units==='km'?n*1.609344:n).toLocaleString('en-US',{maximumFractionDigits:recordedTotals()?2:1});
const distanceText=n=>displayNumber(n)+' '+preferences.units;
const todayMiles=()=>recordedTotals()?.today??(dataMode==='sample'?32+miles-1248:miles);
function localizeDistances(root){
 if(preferences.units!=='km')return;
 const convert=text=>text.replace(/([\d,]+(?:\.\d+)?)\s*\/\s*([\d,]+(?:\.\d+)?)\s*mi\b/g,(_,a,b)=>displayNumber(Number(a.replaceAll(',','')))+' / '+distanceText(Number(b.replaceAll(',','')))).replace(/([\d,]+(?:\.\d+)?)\s*(?:mi\b|miles\b|mile\b)/g,(_,n)=>distanceText(Number(n.replaceAll(',','')))).replace(/LIFETIME MILES/g,'LIFETIME KILOMETERS');
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){if(!node.parentElement.closest('script,style,select,option,.counter,.rollers'))node.textContent=convert(node.textContent)}
 root.querySelectorAll('[aria-label]').forEach(el=>el.setAttribute('aria-label',convert(el.getAttribute('aria-label'))));
}
function trackingStatus(){
 if(window.webkit?.messageHandlers?.driveTest)return '<button class="tracking-status" data-release="drive-test">Activity tracking &amp; entries ›</button>';
 const state=preferences.trackingDemo;
 const text=state==='permission'?'Preview · permission needed':state==='issue'?'Preview · tracking needs attention':'Preview · automatic tracking off';
 return '<button class="tracking-status" data-release="tracking"><span aria-hidden="true">'+(state==='off'?'○':'!')+'</span>'+text+' <span aria-hidden="true">›</span></button>';
}
function trackingDetails(){
 const state=preferences.trackingDemo;
 open('Tracking status','<div class="release-panel"><h3>'+(state==='permission'?'Location permission needed':state==='issue'?'Tracking needs attention':'Automatic tracking is not connected')+'</h3><p>'+(state==='permission'?'This is a preview of the permission-needed state. In the iPhone app, location and motion permissions will let your miles add up in the background.':state==='issue'?'This is a preview of an interrupted-tracking state. In the iPhone app, this screen will explain the detected issue and how to recover.':'This browser preview does not collect location or motion data. Use the sample-trip controls in Profile to try the experience.')+'</p><p><strong>Journey pause is separate.</strong> Pausing a virtual journey never pauses your lifetime odometer.</p><button class="pill wide" data-release="permissions">View iPhone setup guidance</button></div>');
}
function premiumInfo(key=''){
 if(nativeBilling){
  window.webkit.messageHandlers.driveTest.postMessage({section:'premium',title:'Membership'});
  return;
 }
 const unlocked=hasPremium();
 const title=key?destinations[key].name:unlocked?'All journeys unlocked':'Unlock all journeys';
 open(title,'<div class="release-panel"><p>Free includes ten on-foot journeys and ten driving journeys. Premium unlocks the rest.</p><button class="pill wide" data-release="premium-enable" data-key="'+key+'">'+(unlocked?'Browse all journeys':key?'Unlock and view this journey':'Unlock all journeys')+'</button></div>');
}
function canTravel(key){return destinations[key]?.starter||hasPremium();}
function showOnboarding(step=0){
 onboardingStep=step;
 const pages=[
  ['Every mile is part of your story.','Walking, running, cycling, driving, and flying all add to one lifetime odometer.','Medals recognize cumulative travel distance across all modes—not a single run or a race finish.'],
  ['Everyday travel. Extraordinary places.','Choose one on-foot journey and one road journey. Matching travel advances each route and unlocks checkpoint stamps. You do not need to visit the destination.','Pause anytime. Your progress and stamps stay saved. With no active journey, miles still count toward your totals. Extra miles beyond a finish stay in your totals and are not carried into your next journey.'],
  ['Your first journey starts here.','The ten shortest on-foot journeys and ten shortest driving journeys are free. Start short, collect your first stamp, and build from there.',window.webkit?.messageHandlers?.driveTest ? 'You control tracking in Profile & settings. On-foot tracking uses Motion & Fitness or Apple Health. Drive tracking uses location when enabled, including in the background for automatic drives.' : 'This is an interactive preview. Automatic tracking, iPhone permissions and purchases are not connected. No location is collected.']
 ];
 const [title,body,detail]=pages[step];
 open('Welcome to Earth Odometer','<div class="onboarding">'+(step===0?'<img src="assets/brand.png" alt="Earth Odometer logo">':'')+'<small>STEP '+(step+1)+' OF 3</small><h3>'+title+'</h3><p>'+body+'</p><p class="muted">'+detail+'</p><div class="onboarding-dots" aria-hidden="true">'+pages.map((_,i)=>'<i class="'+(i===step?'selected':'')+'"></i>').join('')+'</div>'+(step?'<button class="outline" data-release="intro-back">Back</button>':'')+'<button class="pill wide" data-release="'+(step===2?'intro-finish':'intro-next')+'">'+(step===2?'Start at zero and choose a journey':'Continue')+'</button><button class="quiet wide" data-release="intro-dismiss">Explore on my own</button></div>');
}
function freshStart(){
 if(window.recordedMiles && dataMode==='fresh'){go('Home');return;}
 miles=0;dataMode='fresh';delete activeRuns.road;delete activeRuns.foot;previewTotals={foot:0,road:0};lastCompletion=null;pendingFinishes=[];
 try{sessionStorage.removeItem('earth-odometer.passport.last-stamp')}catch{}
 Object.keys(bestMiles).forEach(k=>delete bestMiles[k]);Object.keys(pausedRuns).forEach(k=>delete pausedRuns[k]);
 if(window.recordedMiles)restoreJourneyState(journeyStorageKey+'.recorded');
 saveJourneyState();go('Home');
}
function addPreviewMiles(amount,mode='road'){
 if(!Number.isFinite(amount)||amount<=0||amount>10000)return;
 const previousCompletion=lastCompletion;
 if(recordedTotals()){toast('Load the sample preview to try sample trips.');return;}
 previewTotals[mode]=(previewTotals[mode]||0)+amount;
 if(mode==='running')previewTotals.foot+=amount;
 miles=Math.round((miles+amount)*1000)/1000;updateJourneyProgress();saveJourneyState();render();
 if(lastCompletion&&lastCompletion!==previousCompletion)showCompletion();else toast(distanceText(amount)+' sample travel added.');
}
function showCompletion(finish=lastCompletion){
 if(!finish)return;
 lastCompletion=finish;
 pendingFinishes=pendingFinishes.filter(f=>f.key!==finish.key);
 saveJourneyState();
 if(!lastCompletion)return;
 const {key,extra}=lastCompletion,d=destinations[key];
 open('Journey complete!','<div class="completion"><span class="tier-tag">FINISH STAMP EARNED</span><h3>'+d.name+'</h3><div class="finish-imprint">'+passportImprint(d.name,'assets/'+d.stamp+'.jpg','JOURNEY FINISH')+'</div><p><strong>'+distanceText(d.miles)+' completed.</strong> Your stamp is saved in your passport.</p>'+(extra>0?'<p>'+distanceText(extra)+' beyond the finish stayed in your lifetime, Today and This Year totals.</p>':'')+'<p class="muted">Your next journey starts at zero. New miles begin counting when you select it.</p>'+contextShare('finish-'+key,'Share your finish')+(Object.keys(destinations).some(k=>modeFor(k)===modeFor(key)&&destinations[k].miles&&!routeFinished(k)&&k!==activeRuns[modeFor(key)]?.key)?atlasButton('choose-'+modeFor(key),'Choose your next journey','Choose your next journey','pill wide'):'')+'<button class="quiet wide" data-release="completion-later">Maybe later</button><button class="outline wide" data-release="completion-passport">View passport</button></div>');
}
function profile(){
 return '<div class="release-profile">'+brandHeader()+'<h1>Profile & settings</h1><p class="subtitle">Your miles. Your preferences.</p><section class="release-panel"><h3>Distance units</h3><div class="segments">'+['mi','km'].map(u=>'<button data-release="units" data-unit="'+u+'" aria-pressed="'+(preferences.units===u)+'">'+(u==='mi'?'Miles':'Kilometers')+'</button>').join('')+'</div><p class="muted">Changes distance displays and share cards. Medal names and artwork keep their original milestone labels.</p></section><div class="settings-list"><button data-release="tracking"><b>Tracking & permissions</b><span>'+(window.webkit?.messageHandlers?.driveTest?'Tracking & entries':preferences.trackingDemo==='off'?'Preview · tracking off':'Preview · needs attention')+' ›</span></button><button data-release="profile-history"><b>Travel history</b><span>View totals ›</span></button><button data-release="premium"><b>Membership</b><span>'+(nativeBilling && nativePremium === null?'Checking membership…':hasPremium()?'Premium membership':'Free membership')+' ›</span></button>'+(window.webkit?.messageHandlers?.driveTest ? '<button data-release="travel-backup"><b>Backup &amp; Restore</b><span>Save driving history to iCloud Drive ›</span></button>' : '')+'<button data-release="report-issue"><b>Report an Issue</b><span>Describe a problem or attach a screenshot</span></button><button data-release="suggest-improvement"><b>Suggest an Improvement</b><span>Share an idea for Earth Odometer</span></button><button data-release="help"><b>How Earth Odometer works</b><span>Help & journey rules ›</span></button><button data-release="privacy"><b>Privacy & saved data</b><span>About this preview ›</span></button><button data-release="intro"><b>Welcome walkthrough</b><span>View again ›</span></button></div><details class="release-panel preview-controls"><summary>Preview controls</summary><button class="outline wide" data-release="award-preview">Preview First Mile celebration</button><p>Sample travel only. These controls do not track real trips.</p><div class="trip-buttons"><button class="outline" data-release="add" data-mode="foot" data-amount="1">Walk 1 mi</button><button class="outline" data-release="add" data-mode="running" data-amount="3">Run 3 mi</button><button class="outline" data-release="add" data-mode="cycling" data-amount="10">Cycle 10 mi</button><button class="outline" data-release="add" data-mode="flying" data-amount="100">Fly 100 mi</button><button class="outline" data-release="add" data-amount="5">Drive 5 mi</button><button class="outline" data-release="add" data-amount="100">Drive 100 mi</button></div><label for="tracking-demo">Tracking message to preview</label><select id="tracking-demo"><option value="off">Tracking off</option><option value="permission">Permission needed</option><option value="issue">Tracking issue</option></select>'+(window.recordedMiles?'<button class="outline wide" data-release="fresh">Use my recorded miles and stamps</button>':'<button class="outline wide" data-release="fresh-confirm">Start a fresh zero-mile preview</button>')+'<button class="outline wide" data-release="sample-confirm">Load populated sample preview</button>'+(!nativeBilling && preferences.premiumPreview?'<button class="quiet wide" data-release="premium-disable">Use starter journeys only</button>':'')+'<p class="muted">'+(journeyStorageAvailable?'Progress is saved in this browser, not synced to an account.':'Browser storage is unavailable. Progress will be lost when this page reloads.')+'</p></details></div>';
}
function helpInfo(){open('How it works','<div class="release-panel"><h3>All travel counts.</h3><p>Walking, running, cycling, driving, and flying contribute to lifetime totals. Medals celebrate accumulated distance, not verified athletic events.</p><h3>One journey of each type</h3><p>Only new miles earned while a journey is active move it forward. Pause preserves progress and stamps. Switching pauses the previous journey of the same type.</p><h3>At the finish</h3><p>The journey stops at its finish distance. All excess distance remains in your totals. It is not banked or transferred to a future journey. Choose your next route to start collecting new miles there.</p><h3>Your passport stays yours</h3><p>Each route earns one finish stamp. Open your passport to revisit or share it. Your lifetime odometer never drops when you start, pause, switch or finish a journey.</p><h3>Preview support</h3><p>Tracking and billing are not connected. You can test with sample trips in Profile. No live support channel is connected in this preview.</p></div>')}
function finishReleaseSetup(){
 nativeBilling?.postMessage('ready');
 if(nativeBilling){requestDailyBackup();document.addEventListener('visibilitychange',requestDailyBackup);setInterval(requestDailyBackup,3600000);}
 if(!preferences.introSeen)showOnboarding();
}
document.addEventListener('change',e=>{if(e.target.id==='tracking-demo'){preferences.trackingDemo=e.target.value;savePreferences();toast('Preview tracking message updated.')}});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-release]');if(!b)return;const action=b.dataset.release;
 if(action==='travel-backup'){
  if(!recordedTotals()){toast('Return to recorded travel to manage backups.');return;}
  window.webkit.messageHandlers.driveTest.postMessage({section:action});return;
 }
 if(b.closest('.settings-list') && window.webkit?.messageHandlers?.driveTest){
  const section=action==='profile-history'?'history':action;
  const payload={section,title:b.querySelector('b').textContent,premium:hasPremium()};
  if(section==='history'){
   payload.totals=[['Today',distanceText(todayMiles())],['This year',distanceText(yearMiles())],['Lifetime',distanceText(lifetimeMiles())]];
   payload.modes=travelModes('today').filter(([,n])=>n>0).map(([label,n])=>[label,distanceText(n)]);
   if(dataMode==='sample') payload.periods=Object.fromEntries(Object.entries(historyPeriods()).map(([key,row])=>[key,row.labels.map((label,i)=>[label,distanceText(row.values[i])])]));
  }
  window.webkit.messageHandlers.driveTest.postMessage(payload);return;
 }
 if(action==='profile-history'){go('History');return;}
 if(action==='award-preview'){celebrateMedals([medalGoals[0]],true);return;}
 if(action==='units'){preferences.units=b.dataset.unit;savePreferences();render();return;}
 if(action==='add'){addPreviewMiles(Number(b.dataset.amount),b.dataset.mode);return;}
 if(action==='intro'||action==='intro-next'||action==='intro-back'){showOnboarding(action==='intro'?0:onboardingStep+(action==='intro-next'?1:-1));return;}
 if(action==='intro-finish'||action==='intro-dismiss'){preferences.introSeen=true;savePreferences();if(action==='intro-finish'){freshStart();go('Journeys');}else go('Home');return;}
 if(action==='drive-test'){window.webkit.messageHandlers.driveTest.postMessage('open');return;}
 if(action==='tracking'){if(window.webkit?.messageHandlers?.driveTest)window.webkit.messageHandlers.driveTest.postMessage('open');else trackingDetails();return;}
 if(action==='permissions'){open('iPhone setup guidance','<p>When the native iPhone app is available, enable the location and motion permissions it requests for background travel tracking. This browser preview cannot request or verify those permissions.</p><p>If tracking stops, the app should show the specific permission or device issue here. No live tracking check is running in this preview.</p>');return;}
 if(action==='premium'){premiumInfo(b.dataset.key||'');return;}
 if(action==='premium-enable'){if(nativeBilling){premiumInfo();return;}preferences.premiumPreview=true;savePreferences();if(b.dataset.key)destinationDetail(b.dataset.key);else go('Journeys');toast('All journeys unlocked.');return;}
 if(action==='premium-disable'){for(const [mode,run] of Object.entries(activeRuns))if(!destinations[run.key].starter)pauseJourney(mode);preferences.premiumPreview=false;savePreferences();render();return;}
 if(action==='completion'){showCompletion();return;}
 if(action==='completion-later'){dialog.close();return;}
 if(action==='completion-passport'){go('Passport');return;}
 if(action==='fresh-confirm'||action==='sample-confirm'){const fresh=action==='fresh-confirm';open(fresh?'Start fresh?':'Load sample progress?','<p>'+(window.recordedMiles?'Your recorded miles and earned stamps stay saved while you explore the sample.':'This replaces your saved preview miles, journey progress and stamps.')+'</p><button class="pill wide" data-release="'+(fresh?'fresh':'sample')+'">'+(fresh?'Start at zero':'Load sample preview')+'</button><button class="outline wide" data-release="cancel-reset">Keep current progress</button>');return;}
 if(action==='cancel-reset'){dialog.close();return;}
 if(action==='fresh'){freshStart();return;}
 if(action==='sample'){if(recordedTotals())saveJourneyState();miles=1248;dataMode='sample';lastCompletion=null;pendingFinishes=[];preferences.premiumPreview=true;savePreferences();resetJourneyDemo();saveJourneyState();go('Home');return;}
 if(action==='suggest-improvement'){window.location.href='mailto:earthodometer@gmail.com?subject=Earth%20Odometer%20suggestion';return;}
 if(action==='report-issue'){window.location.href='mailto:earthodometer@gmail.com?subject=Earth%20Odometer%20issue';return;}
 if(action==='help'){helpInfo();return;}
 if(action==='privacy' && window.webkit?.messageHandlers?.driveTest){open('Privacy & saved data','<p>The drive test uses location only after you start it and grant permission. Drive dates and distances stay on this iPhone. The other screens use separate preview data.</p>');return;}
 if(action==='privacy'){open('Privacy & saved data','<div class="release-panel"><h3>No location collected here.</h3><p>This preview stores sample miles, journey progress and settings locally in this browser. It does not connect to Health, Motion & Fitness, GPS or iCloud. Clearing browser data removes this progress.</p><p>Sharing or saving a card happens only when you choose it. Cards identify their data as a design preview.</p><p>A production privacy policy and native permission disclosures still need to be provided before the real iPhone app launches.</p><button class="outline wide" data-release="fresh-confirm">Reset preview progress</button></div>');}
});

dialog.addEventListener('close',()=>{if(document.querySelector('#dialog-title').textContent==='Welcome to Earth Odometer'){preferences.introSeen=true;savePreferences();}});

function roadBackupState(){
 if(!recordedTotals())return null;
 const progress={};
 for(const [key,route] of Object.entries(destinations)){
  if(modeFor(key)!=='road'||!route.miles)continue;
  if(Object.hasOwn(bestMiles,key)||Object.hasOwn(pausedRuns,key)||activeRuns.road?.key===key)
   progress[key]=Math.max(bestMiles[key]||0,journeyMiles(route));
 }
 return {progress,usesKilometers:preferences.units==='km',active:!!activeRuns.road};
}
function restoreRoadBackup(progress,km){
 if(!recordedTotals() || activeRuns.road)throw Error('Pause your active road journey before restoring.');
 for(const [key,value] of Object.entries(progress)){
  const route=destinations[key];
  if(!route?.miles||modeFor(key)!=='road'||!Number.isFinite(value)||value<0)continue;
  const miles=Math.min(route.miles,Math.max(bestMiles[key]||0,pausedRuns[key]||0,value));
  bestMiles[key]=miles;
  if(miles<route.miles)pausedRuns[key]=miles;
  else delete pausedRuns[key];
 }
 preferences.units=km?'km':'mi';
 savePreferences();saveJourneyState();render();
}
function requestDailyBackup(){
 if(!document.hidden && recordedTotals())window.webkit?.messageHandlers?.driveTest?.postMessage({section:'daily-backup'});
}
