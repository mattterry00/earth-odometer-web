const main=document.querySelector('main'),nav=document.querySelector('nav'),dialog=document.querySelector('dialog');
let miles=1248,tab='Home',collection='Explore',period='Week';
const icons={Home:'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10',Journeys:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M16 8l-2 6-6 2 2-6z',Passport:'M4 3h14a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2zm3 0v18M11 8h5m-5 4h5',History:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 6v6l4 3',Profile:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M8 19v-2a4 4 0 0 1 8 0v2M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6'};
const svg=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const title=text=>`<div class="title"><h2>${text}</h2><span class="badge">DEMO</span></div>`;
const note=text=>`<p class="note">${text}</p>`;
const section=text=>`<h3 class="section-label">${text}</h3>`;
const segments=(names,selected,action)=>`<div class="segments" role="group" aria-label="${action==='period'?'History period':'Journey collection'}">${names.map(n=>`<button data-${action}="${n}" aria-pressed="${selected===n}">${n}</button>`).join('')}</div>`;
function mapArt(){return `<div class="route-map" role="img" aria-label="Illustrated schematic Route 66 map: Chicago to Oklahoma City to Los Angeles"><img src="assets/RouteMap.jpg" alt=""><svg class="route-line" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M715 216 700 252 650 282 620 330 550 336" fill="none" stroke="#00818a" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M550 336 440 336 360 372 230 348 130 396" fill="none" stroke="#84969c" stroke-width="5" stroke-dasharray="12 10" stroke-linecap="round"/></svg><span class="map-pin chicago"><i></i><b>Chicago</b></span><span class="map-pin oklahoma"><i></i><b>Oklahoma City</b></span><span class="map-pin la"><i></i><b>Los Angeles</b></span><div class="map-title"><span class="tag">VIRTUAL JOURNEY</span><h3>Route 66</h3></div></div>`;}
const routeMiles=()=>Math.min(2448,Math.round(842+miles-48212.7));
const nextStop=()=>routeMiles()<940?"Next: Oklahoma City":routeMiles()<2448?"Destination: Santa Monica":"Journey complete";
function journey(clickable=true){return `<${clickable?'button':'div'} class="journey" ${clickable?'data-action="journey" aria-label="Open Route 66 journey"':''}>${mapArt()}<div class="journey-info"><div class="progress-title"><span><strong>${routeMiles().toLocaleString()}</strong> / 2,448 mi</span><b>${nextStop()}</b></div><div class="progress-row"><progress max="2448" value="${routeMiles()}" aria-label="Route 66 progress"></progress><span>${Math.round(routeMiles()/2448*100)}%</span></div></div></${clickable?'button':'div'}>`;}
function mileage(){const laps=miles/24901;return `<section class="mileage-card" aria-label="Lifetime mileage"><div class="mileage-main"><div class="small-label">LIFETIME ODOMETER</div><div class="rollers" role="img" aria-label="${miles.toFixed(1)} miles">${String(Math.floor(miles)).padStart(6,'0').split('').map(d=>`<span class="roller" aria-hidden="true">${d}</span>`).join('')}<span class="decimal" aria-hidden="true">.</span><span class="roller light" aria-hidden="true">${Math.round(miles*10)%10}</span></div><div class="earth"><span class="earth-emoji" aria-hidden="true">🌎</span><strong>${laps.toFixed(2)}</strong><b>Earth laps</b></div></div><div class="lap-ring" style="--progress:${(laps%1)*100}%" aria-label="${Math.floor(laps%1*100)} percent of current Earth lap"><span>${Math.floor(laps%1*100)}%</span></div></section>`;}
function home(){return title('Your journey')+journey()+mileage()+`<button class="primary full" data-action="journey">View journey</button><div class="mini-stats"><div><small>Today</small><strong>23.4 mi</strong></div><div><small>This year</small><strong>1,248 mi</strong></div><button data-action="recap" aria-label="Yearly recap">▥ &nbsp; Recap</button></div><div class="home-actions"><button class="textbutton" data-tab="Journeys">Explore journeys</button><button class="textbutton" data-action="share">↑ &nbsp; Share</button></div><button class="moon-row" data-action="moon"><span>☾ &nbsp; Moon Landing</span><span>${(miles/238900*100).toFixed(1)}% &nbsp; ›</span></button>${note('Sample miles · Automatic tracking is not enabled.')}`;}
const futureRoutes={Europe:{title:'Across Europe',subtitle:'Iconic cities. Unforgettable roads.',asset:'EuropeArtwork'},World:{title:'World Cruiser',subtitle:'A global journey, one mile at a time.',asset:'WorldArtwork'}};
function futureCard(key){const r=futureRoutes[key];return `<button class="future-card" data-route="${key}" aria-label="Preview ${r.title}" style="background-image:linear-gradient(90deg,#ffffffde,transparent),url('assets/${r.asset}.jpg')"><strong>${r.title}</strong><span>${r.subtitle}</span><b>Preview route</b></button>`;}
function journeys(){return title('Journeys')+segments(['Explore','My journeys'],collection,'collection')+journey()+(collection==='Explore'?futureCard('Europe')+futureCard('World'):'<p class="lead">Route 66 is your active demo journey.</p>')+note('Sample journeys · Real-mile progress is not yet connected.');}
function explorer(passport=false){return `<div class="explorer"><div class="avatar">MT</div><div><b>Matt</b><small>Virtual explorer</small><small>Demo passport</small></div><div class="postmark" aria-hidden="true">${passport?'≋ ◎':'◎'}</div></div>`;}
const medalGoals = [
  {title: 'First Mile', target: 1, mark: '1'},
  {title: '5K', target: 5000 / 1609.344, mark: '5K'},
  {title: '10K', target: 10000 / 1609.344, mark: '10K'},
  {title: 'Half Marathon', target: 21097.5 / 1609.344, mark: '13.1'},
  {title: 'Marathon Distance', target: 26.2, mark: '26.2'},
  {title: '1,000 Miles', target: 1000, mark: '1K'},
  {title: 'Earth Lap', target: 24901, mark: '🌎'},
  {title: 'Double Earth Lap', target: 49802, mark: '2×'},
  {title: 'Moon Landing', target: 238900, mark: '☾'}
];

function medalsEntry() {
  const count = medalGoals.filter(goal => miles >= goal.target).length;
  return `<button class="medals-entry" data-action="medals">
    <span aria-hidden="true">🏅</span><b>Medals</b>
    <small>${count} of ${medalGoals.length} earned</small><span aria-hidden="true">›</span>
  </button>`;
}

function medalBadge(goal) {
  return `<span class="medal-badge" aria-hidden="true"><i></i><b>${goal.mark}</b></span>`;
}

function showMedals() {
  const earned = medalGoals.filter(goal => miles >= goal.target);
  const upcoming = medalGoals.filter(goal => miles < goal.target);
  const tiles = earned.map(goal => `<li>${medalBadge(goal)}<strong>${goal.title}</strong>
    <small>${goal.target.toLocaleString()} mi</small></li>`).join('');
  const rows = upcoming.map(goal => `<li>${medalBadge(goal)}<div><strong>${goal.title}</strong>
    <small>${miles.toLocaleString()} / ${goal.target.toLocaleString()} mi</small>
    <progress aria-label="${goal.title} progress" value="${miles}" max="${goal.target}"></progress></div></li>`).join('');
  open('Medals', `<div class="medals-collection"><h3>Every mile counts.</h3>
    <p>Demo collection · ${earned.length} of ${medalGoals.length} earned</p>
    <h4>Earned</h4>${tiles ? `<ul class="earned-medals">${tiles}</ul>` : '<p>Your first medal unlocks at one mile.</p>'}
    <h4>Upcoming</h4>${rows ? `<ul class="upcoming-medals">${rows}</ul>` : '<p>You’ve earned every medal.</p>'}</div>`);
}

function passport(){return title('Your passport')+'<p class="lead">A stamp for every checkpoint on your virtual journey.</p>'+ `<iframe title="Route 66 passport book" style="display:block;width:100%;height:350px;border:0" src="passport/book.html?mi=${routeMiles()}"></iframe>`+medalsEntry()+`${section('JOURNEY ACHIEVEMENTS')}<button class="achievement" data-stamp="First 500 miles"><span class="medal">⛰</span><div><b>First 500 miles</b><small>Your first big adventure.</small></div><span class="chevron">›</span></button><button class="achievement moon-achievement" data-action="moon"><span>☾</span><div><b>Moon Landing</b><small>A lifetime milestone.</small></div><span class="chevron">${(miles/238900*100).toFixed(1)}% &nbsp; ›</span></button>${note('Sample collection · Milestones do not reduce your lifetime miles.')}`;}
const historyData={Week:{values:[12,28,34,26,42,18,23.4],labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']},Month:{values:[380,510,422,640],labels:['W1','W2','W3','W4']},Year:{values:[1240,2180,1690,3440,2800,4120,2350,3620,4480,2910,1290,1282],labels:['J','F','M','A','M','J','J','A','S','O','N','D']}};
function history(){const {values,labels}=historyData[period];return title('Your history')+'<p class="lead">Your everyday travel.</p>'+segments(['Week','Month','Year'],period,'period')+`<div class="history-total"><small>Total distance</small><strong>${values.reduce((a,b)=>a+b,0).toLocaleString('en-US',{maximumFractionDigits:1})}</strong> mi</div><div class="bars" role="img" aria-label="Sample ${period.toLowerCase()} mileage: ${values.join(', ')}">${values.map((n,i)=>`<div class="bar">${period==='Year'?'':n}<i style="height:${Math.max(8,n/Math.max(...values)*88)}px"></i>${labels[i]}</div>`).join('')}</div>${section('RECENT ACTIVITY')}<div class="activity-layout"><div>${[['Today · Drive','23.4','↗'],['Yesterday · Walk','2','↟'],['Yesterday · Drive','38','↗']].map(([n,v,i])=>`<div class="activity-row"><span class="activity-icon">${i}</span><div><small>${n}</small><strong>${v} mi</strong></div><span class="chevron">›</span></div>`).join('')}</div><div class="mini-map" aria-label="Illustrated sample travel map"><img src="assets/RouteMap.jpg" alt=""></div></div><button class="primary full" data-action="activity">View activity</button><button class="textbutton full" data-action="recap">✧ &nbsp; Your year in miles</button>${note('Sample travel history.')}`;}
function profile(){return title('Your profile')+explorer()+mileage()+`<div class="settings">${[['Distance units','Miles','⌁'],['Automatic tracking','Not connected','◎'],['Connected devices','','▣'],['Privacy & permissions','','♧'],['Notifications','','♧']].map(([n,v,i])=>`<button data-setting="${n}"><span>${i}</span><b>${n}</b><small>${v}</small><span>›</span></button>`).join('')}</div><button class="primary full demo-add" data-action="add">+ &nbsp; Add 100 demo miles</button><button class="textbutton full" data-action="reset">Reset demo miles</button>${note('Sample data only. Demo changes last for this browser session.')}`;}
function render(){nav.innerHTML=Object.keys(icons).map(n=>`<button data-tab="${n}" ${tab===n?'aria-current="page"':''}>${svg(n)}${n}</button>`).join('');main.innerHTML=({Home:home,Journeys:journeys,Passport:passport,History:history,Profile:profile})[tab]();main.scrollTop=0;}
function open(title,body){document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-body').innerHTML=body;if(!dialog.open)dialog.showModal();}
function recap(){open('Your year in miles',`<div class="recap"><div class="eyebrow">2026 · DEMO RECAP</div><h3>You went<br>places.</h3><div class="number">1,248</div><p>miles. One unforgettable year.</p><hr><b>🌎 &nbsp; 0.05 Earth laps</b><p><small>980 air · 198 car · 40 foot · 30 other</small></p><small>earthodometer.com</small></div><button class="primary full" data-action="share-recap">↑ &nbsp; Share recap</button>`);}
let toastTimer;function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.display='none',3000);}
async function share(recap=false){const text=recap?'Earth Odometer · 2026 demo recap: 1,248 sample miles, 0.05 Earth laps. Not real travel data.':`Earth Odometer design preview: ${miles.toFixed(1)} sample miles, ${(miles/24901).toFixed(2)} Earth laps. Demo data.`;try{if(window.webkit?.messageHandlers?.share){window.webkit.messageHandlers.share.postMessage(text);return;}if(navigator.share){await navigator.share({title:'Earth Odometer',text});return;}await navigator.clipboard.writeText(text);toast('Copied! Paste your miles anywhere.');}catch(e){if(e.name!=='AbortError')open('Share your miles',`<p>Select and copy this text:</p><textarea readonly style="width:100%;height:110px;padding:12px">${text}</textarea>`);}}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.tab){tab=b.dataset.tab;render();return;}
 if(b.dataset.collection){collection=b.dataset.collection;render();return;}
 if(b.dataset.period){period=b.dataset.period;render();return;}
 if(b.dataset.route){const r=futureRoutes[b.dataset.route];open(r.title,`<img class="detail-art" src="assets/${r.asset}.jpg" alt="${r.title} illustration"><h3>${r.subtitle}</h3><p>A preview of a future virtual journey. Route selection will be available when journey tracking is connected.</p>`);return;}
 if(b.dataset.stamp){const n=b.dataset.stamp;const a={'CHICAGO':'ChicagoStamp','ST. LOUIS':'StLouisStamp','TULSA':'TulsaStamp'}[n];open(n,(a?`<img class="detail-stamp" src="assets/${a}.jpg" alt="${n} illustrated postcard">`:'<div class="moon-symbol">⛰</div>')+'<h3>Route 66 · Virtual achievement</h3><p>This is a sample achievement. Real stamps and earned dates will be recorded when journey tracking is connected.</p>');return;}
 if(b.dataset.setting){open(b.dataset.setting,`<p>${b.dataset.setting==='Privacy & permissions'?'This preview uses sample data. It does not collect your location or require an app account. The private preview uses your ChatGPT sign-in.':'This setting is a design preview. Real device settings will be available when automatic tracking is connected.'}</p>`);return;}
 switch(b.dataset.action){
 case 'medals':showMedals();break;
 case 'moon':open('Moon Landing',`<div class="moon-symbol">☾</div><h3 class="big">238,900 miles</h3><p>One extraordinary lifetime milestone.</p><progress max="238900" value="${Math.min(miles,238900)}" aria-label="Moon milestone progress"></progress><h3>${miles>=238900?'Trophy earned. Keep exploring.':Math.ceil(238900-miles).toLocaleString()+' miles to unlock'}</h3><p>Your odometer keeps counting after you reach the Moon.</p>`);break;
 case 'journey':open('Route 66',journey(false)+'<h3>From Chicago to the Pacific</h3><p>Everyday miles, one legendary road. Your virtual journey crosses eight states on the way to Santa Monica.</p><p>◉ '+nextStop()+'</p><p class="note">Illustrated map is schematic. Route progress is sample data.</p>');break;
 case 'activity':open('Recent activity','<h3>Today · Drive · 23.4 miles</h3><p>Yesterday · Walk · 2 miles</p><p>Yesterday · Drive · 38 miles</p><p class="note">Sample activity. Real trip times and locations will appear after tracking is connected.</p>');break;
 case 'recap':recap();break;
 case 'add':miles+=100;updateJourneyProgress();render();toast('100 demo miles added.');break;
 case 'reset':miles=1248;resetJourneyDemo();render();toast('Demo odometer reset.');break;
 case 'share':share();break;
 case 'share-recap':share(true);break;
 case 'download-recap':break;
 }
});
document.querySelector('#close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});render();
