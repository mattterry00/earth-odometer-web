const main=document.querySelector('main'),nav=document.querySelector('nav'),dialog=document.querySelector('dialog');
let miles=1248,tab='Home',collection='Explore',period='Week';
const icons={Home:'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10',Journeys:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M16 8l-2 6-6 2 2-6z',Passport:'M4 3h14a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2zm3 0v18M11 8h5m-5 4h5',History:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 6v6l4 3',Profile:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M8 19v-2a4 4 0 0 1 8 0v2M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6'};
const svg=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const title=text=>`<div class="title"><h2>${text}</h2><span class="badge">DEMO</span></div>`;
const note=text=>`<p class="note">${text}</p>`;
const section=text=>`<h3 class="section-label">${text}</h3>`;
const segments=(names,selected,action)=>`<div class="segments" role="group" aria-label="${action==='period'?'History period':'Journey collection'}">${names.map(n=>`<button data-${action}="${n}" aria-pressed="${selected===n}">${n}</button>`).join('')}</div>`;
function mapArt(distance=842){
 const legs=stops.filter(stop=>stop.approach);
 const paths=legs.map(({mile:end,approach:path},i)=>{
  const start=i===0?0:legs[i-1].mile;
  const portion=Math.max(0,Math.min(1,(distance-start)/(end-start)));
  return `<path d="${path}" fill="none" stroke="#84969c" stroke-width="5" stroke-dasharray="12 10"/>`+(portion>0?`<path d="${path}" fill="none" stroke="#00818a" stroke-width="8" pathLength="1" stroke-dasharray="${portion} 1"/>`:'');
 }).join('');
 const pins=legs.slice(1,-1).map(({mapPoint:[x,y],city,mile})=>`<circle cx="${x}" cy="${y}" r="8" fill="${distance>=mile?'#00818a':'#faf4df'}" stroke="#425e62" stroke-width="3"><title>${city} · Virtual mile ${mile}</title></circle>`).join('');
 return `<div class="route-map" role="img" aria-label="Illustrated schematic Route 66 map: Chicago via Oklahoma City, Amarillo, Albuquerque and Flagstaff to Santa Monica"><img src="assets/RouteMap.jpg" alt=""><svg class="route-line" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">${paths}${pins}</svg><span class="map-pin chicago"><i></i><b>Chicago</b></span><span class="map-pin oklahoma"><i></i><b>Oklahoma City</b></span><span class="map-pin la"><i></i><b>Santa Monica</b></span><div class="map-title"><span class="tag">VIRTUAL JOURNEY</span><h3>Route 66</h3></div></div>`;}
const routeMiles=()=>Math.min(2448,Math.max(0,842+miles-1248));
const nextStop=()=>routeMiles()>=2448?"Journey complete":"Next: "+stops.find(s=>!s.completed&&!s.journey && s.mile>routeMiles()).city;
function journey(clickable=true){return `<${clickable?'button':'div'} class="journey" ${clickable?'data-action="journey" aria-label="Open Route 66 journey"':''}>${mapArt()}<div class="journey-info"><div class="progress-title"><span><strong>${routeMiles().toLocaleString()}</strong> / 2,448 mi</span><b>${nextStop()}</b></div><div class="progress-row"><progress max="2448" value="${routeMiles()}" aria-label="Route 66 progress"></progress><span>${Math.round(routeMiles()/2448*100)}%</span></div></div></${clickable?'button':'div'}>`;}
function mileage(){const laps=miles/24901;return `<section class="mileage-card" aria-label="Lifetime mileage"><div class="mileage-main"><div class="small-label">LIFETIME ODOMETER</div><div class="rollers" role="img" aria-label="${miles.toFixed(1)} miles">${String(Math.floor(miles)).padStart(6,'0').split('').map(d=>`<span class="roller" aria-hidden="true">${d}</span>`).join('')}<span class="decimal" aria-hidden="true">.</span><span class="roller light" aria-hidden="true">${Math.round(miles*10)%10}</span></div><div class="earth"><span class="earth-emoji" aria-hidden="true">🌎</span><strong>${laps.toFixed(2)}</strong><b>Earth laps</b></div></div><div class="lap-ring" style="--progress:${(laps%1)*100}%" aria-label="${Math.floor(laps%1*100)} percent of current Earth lap"><span>${Math.floor(laps%1*100)}%</span></div></section>`;}
function home(){return title('Your journey')+journey()+mileage()+`<button class="primary full" data-action="journey">View journey</button><div class="mini-stats"><div><small>Today</small><strong>23.4 mi</strong></div><div><small>This year</small><strong>1,248 mi</strong></div><button data-action="recap" aria-label="Yearly recap">▥ &nbsp; Recap</button></div><div class="home-actions"><button class="textbutton" data-tab="Journeys">Explore journeys</button><button class="textbutton" data-action="share">↑ &nbsp; Share</button></div><button class="moon-row" data-action="moon"><span>☾ &nbsp; Moon Landing</span><span>${(miles/238855*100).toFixed(1)}% &nbsp; ›</span></button>${note('Sample miles · Automatic tracking is not enabled.')}`;}
const futureRoutes={Europe:{title:'Across Europe',subtitle:'Iconic cities. Unforgettable roads.',asset:'EuropeArtwork'},World:{title:'World Cruiser',subtitle:'A global journey, one mile at a time.',asset:'WorldArtwork'}};
function futureCard(key){const r=futureRoutes[key];return `<button class="future-card" data-route="${key}" aria-label="Preview ${r.title}" style="background-image:linear-gradient(90deg,#ffffffde,transparent),url('assets/${r.asset}.jpg')"><strong>${r.title}</strong><span>${r.subtitle}</span><b>Preview route</b></button>`;}
function journeys(){return title('Journeys')+segments(['Explore','My journeys'],collection,'collection')+journey()+(collection==='Explore'?futureCard('Europe')+futureCard('World'):'<p class="lead">Route 66 is your active demo journey.</p>')+note('Sample journeys · Real-mile progress is not yet connected.');}
function explorer(passport=false){return `<div class="explorer"><div class="avatar">MT</div><div><b>Matt</b><small>Virtual explorer</small><small>Demo passport</small></div><div class="postmark" aria-hidden="true">${passport?'≋ ◎':'◎'}</div></div>`;}
const medalGoals = [
  {title: 'First Mile', target: 1, mark: '1'},
  {title: '5 Miles', target: 5, mark: '5'},
  {title: '10 Miles', target: 10, mark: '10'},
  {title: 'Half Marathon', target: 21097.5 / 1609.344, mark: '13.1'},
  {title: 'Marathon', target: 42195 / 1609.344, mark: '26.2'},
  {title: 'Ultramarathon', target: 50000 / 1609.344, mark: '31.1 MI'},
  {title: '50 Miles', target: 50, mark: '50'},
  {title: '100 Miles', target: 100, mark: '100'},
  {title: '500 Miles', target: 500, mark: '500'},
  {title: '1,000 Miles', target: 1000, mark: '1K'},
  {title: '5,000 Miles', target: 5000, mark: '5K'},
  {title: '10,000 Miles', target: 10000, mark: '10K'},
  {title: '15,000 Miles', target: 15000, mark: '15K'},
  {title: '20,000 Miles', target: 20000, mark: '20K'},
  {title: 'Earth Lap', target: 24901, mark: '🌎'},
  {title: '25,000 Miles', target: 25000, mark: '25K'},
  {title: 'Double Earth Lap', target: 49802, mark: '2×'},
  {title: '50,000 Miles', target: 50000, mark: '50K'},
  {title: '100,000 Miles', target: 100000, mark: '100K'},
  {title: 'Moon Landing', target: 238855, mark: '☾'},
  {title: 'To the Moon and Back', target: 477710, mark: '☾'},
  {title: '500,000 Miles', target: 500000, mark: '500K'},
  {title: '750,000 Miles', target: 750000, mark: '750K'},
  {title: '1,000,000 Miles', target: 1000000, mark: '1M'}
];
medalGoals.sort((a,b)=>a.target-b.target);

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

function passport(){return title('Your passport')+'<p class="lead">A stamp for every checkpoint on your virtual journey.</p>'+ `<iframe title="Route 66 passport book" style="display:block;width:100%;height:350px;border:0" src="passport/book.html?mi=${routeMiles()}"></iframe>`+medalsEntry()+`${section('JOURNEY ACHIEVEMENTS')}<button class="achievement" data-stamp="First 500 miles"><span class="medal">⛰</span><div><b>First 500 miles</b><small>Your first big adventure.</small></div><span class="chevron">›</span></button><button class="achievement moon-achievement" data-action="moon"><span>☾</span><div><b>Moon Landing</b><small>A lifetime milestone.</small></div><span class="chevron">${(miles/238855*100).toFixed(1)}% &nbsp; ›</span></button>${note('Sample collection · Milestones do not reduce your lifetime miles.')}`;}
// Sample history ends on November 3, the date used throughout this preview.
function historyPeriods(){
 const extra=dataMode==='sample'?miles-1248:0;
 const data={
  Week:{labels:['Wed','Thu','Fri','Sat','Sun','Mon','Tue'],values:[12,28,34,26,10,40,32+extra],caption:'Last 7 days'},
  Month:{labels:['Nov 1','Nov 2','Nov 3'],values:[10,40,32+extra],caption:'November to date'},
  Year:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],values:[90,110,104,97,136,115,126,105,112,171,82+extra],caption:'2026 to date'}
 };
 if(dataMode==='fresh')Object.values(data).forEach(row=>row.values=row.values.map((_,i)=>i===row.values.length-1?miles:0));
 return data;
}
function history(){
 const {labels,values,caption}=historyPeriods()[period],total=values.reduce((sum,n)=>sum+n,0);
 const activity=travelModes('today').filter(([,n])=>n>0).map(([label,n])=>'<div class="activity-row"><b>'+label+'</b><strong>'+n.toLocaleString()+' mi</strong></div>').join('');
 return title('Travel history')+segments(['Week','Month','Year'],period,'period')+
 `<div class="history-total"><small>${caption}</small><strong>${displayNumber(total)}</strong> ${preferences.units}</div><div class="bars" role="img" aria-label="${labels.map((label,i)=>label+' '+values[i]+' miles').join(', ')}">${values.map((n,i)=>`<div class="bar"><i style="height:${Math.max(2,n/Math.max(1,...values)*88)}px"></i>${labels[i]}</div>`).join('')}</div>`+
 section('Today by travel mode')+activity+'<button class="textbutton full" data-action="recap">View yearly recap</button>'+note('Sample travel history · No real trips are recorded in this preview.');
}
function profile(){
 return title('Profile')+'<p class="lead">Your miles and travel history</p>'+mileage()+'<button class="textbutton full" data-atlas="history">View travel history →</button>'+'<h3>Try adding miles</h3><p>Add a sample drive to see your totals and active journey update. Reset returns the demo to 1,248 miles.</p><button class="primary full demo-add" data-action="add">Add 100 demo miles</button><button class="textbutton full" data-action="reset">Reset demo miles</button>'+note('This preview uses sample miles. It does not track your location. '+(journeyStorageAvailable?'Your demo progress is saved in this browser. Use Reset demo miles to start over.':'Browser storage is unavailable, so progress lasts until you reload.'));
}
function render(){nav.innerHTML=Object.keys(icons).map(n=>`<button data-tab="${n}" ${tab===n?'aria-current="page"':''}>${svg(n)}${n}</button>`).join('');main.innerHTML=({Home:home,Journeys:journeys,Passport:passport,History:history,Profile:profile})[tab]();main.scrollTop=0;}
function open(title,body){document.querySelector('#dialog-title').textContent=title;document.querySelector('#dialog-body').innerHTML=body;if(typeof localizeDistances==='function')localizeDistances(document.querySelector('#dialog-body'));if(!dialog.open)dialog.showModal();dialog.scrollTop=0;}
let toastTimer;function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.display='none',3000);}
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
 case 'moon':open('Moon Landing',`<div class="moon-symbol">☾</div><h3 class="big">238,855 miles</h3><p>One extraordinary lifetime milestone.</p><progress max="238855" value="${Math.min(miles,238855)}" aria-label="Moon milestone progress"></progress><h3>${miles>=238855?'Trophy earned. Keep exploring.':Math.ceil(238855-miles).toLocaleString()+' miles to unlock'}</h3><p>Your odometer keeps counting after you reach the Moon.</p>`);break;
 case 'journey':open('Route 66',journey(false)+'<h3>From Chicago to the Pacific</h3><p>Everyday miles, one legendary road. Your virtual journey crosses eight states on the way to Santa Monica.</p><p>◉ '+nextStop()+'</p><p class="note">Illustrated map is schematic. Route progress is sample data.</p>');break;
 case 'activity':open('Recent activity','<h3>Today · Drive · 23.4 miles</h3><p>Yesterday · Walk · 2 miles</p><p>Yesterday · Drive · 38 miles</p><p class="note">Sample activity. Real trip times and locations will appear after tracking is connected.</p>');break;
 case 'recap':recap();break;
 case 'add':addPreviewMiles(100);break;
 case 'reset':dataMode='sample';lastCompletion=null;miles=1248;rewardsVisible=true;resetJourneyDemo();saveJourneyState();render();toast('Demo odometer reset.');break;
 case 'share':share();break;
 
 
 }
});
document.querySelector('#close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
