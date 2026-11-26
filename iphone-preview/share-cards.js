// Recaps use the recorded activity breakdown when the native bridge is available.
function inkIcon(name) {
 const paths = {
  share:'M12 15V3m-4 4 4-4 4 4M6 10H4v11h16V10h-2',
  sunrise:'M2 16h20M4 20h16M7 16a5 5 0 0 1 10 0M12 3v4M3 9l3 2m15-2-3 2',
  calendar:'M4 6h16v15H4zM4 10h16M8 3v5m8-5v5m-9 6h3m3 0h3m-9 3h3'
 };
 return '<svg class="ink-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="'+paths[name]+'"/></svg>';
}
function travelModes(period) {
 const year=period==='year', totals=recordedTotals();
 if(totals){
  if(totals.categories){
   const amounts=totals.categories[period]||{};
   return ['Walking','Running','Cycling','Driving','Flying'].map(type=>[type,amounts[type]||0]);
  }
  const activity=totals.activityMiles||{};
  const running=activity.running?.[period]||0;
  const cycling=activity.cycling?.[period]||0;
  const flying=activity.flying?.[period]||0;
  const foot=(year?totals.walkYear:totals.walkToday)||0;
  const total=year?yearMiles():todayMiles();
  return [['Walking',Math.max(0,foot-running)],['Running',running],['Cycling',cycling],
          ['Driving',Math.max(0,total-foot-cycling-flying)],['Flying',flying]];
 }
 const sample=dataMode==='sample';
 const addedFoot=previewTotals.foot-(sample?26.2:0);
 const addedRoad=previewTotals.road-(sample?1221.8:0);
 const running=previewTotals.running||0;
 const walking=(sample?(year?40:4.2):0)+addedFoot-running;
 const driving=(sample?(year?198:19.8):0)+addedRoad;
 return [['Walking',Math.max(0,walking)],['Running',running],['Cycling',previewTotals.cycling||0],
         ['Driving',Math.max(0,driving)],['Train',sample?(year?24:8):0],['Boat',sample&&year?6:0],
         ['Flying',(sample&&year?980:0)+(previewTotals.flying||0)]];
}
function onFootMiles(period){
 return travelModes(period).filter(([label])=>label==='Walking'||label==='Running').reduce((sum,[,value])=>sum+value,0);
}
function showModes(period) {
 const year=period==='year', rows=travelModes(period);
 const details=rows.map(([label,value])=>{
  return '<p class="mode-detail"><b>'+label+'</b>'+distanceText(value)+'</p>';
 }).join('');
 open(year?'How you traveled this year':'How you traveled today','<p>'+(recordedTotals()?'Recorded':'Sample')+' travel breakdown · '+distanceText(year?yearMiles():todayMiles())+' total</p>'+details+(recordedTotals()?'<p class="muted">Walking includes short or uncertain segments. Recognized runs and miles you classify as running appear under Running.</p>':'')+
  '<button data-card="'+period+'" class="primary full">'+(year?'Share yearly recap':'Share my miles')+'</button>');
}
const contextShare=(key,label)=>'<button class="context-share" data-card="'+key+'">'+inkIcon('share')+' '+label+'</button>';
const earthPercent=()=>(100*miles/24901).toLocaleString('en-US',{maximumFractionDigits:1})+'%';
function cardContent(kind) {
 const miles=lifetimeMiles();
 const unitName=preferences.units==='km'?'kilometers':'miles';
 if(kind==='lifetime')return ['LIFETIME ODOMETER','My lifetime '+unitName,displayNumber(miles),(miles/24901).toFixed(2)+' Earth laps','All modes of travel · '+preferences.units];
 if(kind==='earth')return ['EARTH LAP PROGRESS','Around the Earth',earthLapProgress().percent+'%','toward your '+earthLapProgress().label+' Earth lap',distanceText(miles)+' traveled · '+distanceText(24901)+' per lap'];
 if(kind.startsWith('checkpoint-')){
  const stop=stops[Number(kind.slice(11))];
  return ['VIRTUAL CHECKPOINT',stop.city,distanceText(stop.mile),stop.mile?'Checkpoint reached':'Journey started',destinations[stop.completed?'boston':stop.journey||'route66'].name+' · '+stop.state];
 }
 if(kind.startsWith('journey-')||kind.startsWith('finish-')){
  const d=destinations[kind.split('-')[1]],value=kind.startsWith('finish-')?d.miles:journeyMiles(d);
  return ['VIRTUAL JOURNEY',d.name,d.miles?distanceText(value):'Coming up',d.miles?(d.miles===value?'Journey completed':'of '+distanceText(d.miles)):d.spotlight,d.region];
 }
 if(kind.startsWith('medal-')){
  const g=medalGoals[Number(kind.slice(6))],miles=medalMiles(),earned=miles>=g.target;
  return ['MEDAL CASE',g.title,earned?'Earned':(100*miles/g.target).toFixed(1)+'%',distanceText(g.target)+' milestone',earned?'Lifetime travel distance':distanceText(miles)+' traveled so far'];
 }
 if(kind==='year')return [new Date().getFullYear()+'   /   YEAR IN REVIEW','My year in '+unitName,displayNumber(yearMiles()),(yearMiles()/24901).toFixed(2)+' Earth laps',distanceText(onFootMiles('year'))+' walking & running'];
 return ['FIELD NOTES   /   TODAY','My '+unitName+' today',displayNumber(todayMiles()),distanceText(onFootMiles('today'))+' walking & running','Walking, riding and everything between.'];
}
function recap(){share('year')}
async function loadCardArtwork(path) {
 const image = new Image();
 if (location.protocol === 'file:' && window.webkit?.messageHandlers?.share) {
  // A local script supplies image bytes without tainting the exported canvas.
  const script = document.createElement('script');
  script.src = 'card-art/' + path.slice('assets/'.length) + '.js';
  try {
   await new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
   });
   if (!script.artwork) throw new Error('Empty artwork');
   image.src = script.artwork;
  } finally {
   script.remove();
  }
 } else {
  image.src = path;
 }
 await image.decode();
 return image;
}
// The app export and the marketing samples share this canvas layout.
function drawTravelCard(canvas, card, art) {
 const x=canvas.getContext('2d'), h=canvas.height;
 const dark=card.layout==='counter'||card.layout==='medal';
 const paper='#f8f2e3', ink='#103d3d', gold='#c4a36a', fg=dark?paper:ink;
 x.save();
 x.fillStyle=dark?'#103233':paper; x.fillRect(0,0,1080,h);
 x.strokeStyle=gold; x.lineWidth=3; x.strokeRect(32,32,1016,h-64);
 function label(str,y,size,serif=false,color=fg,max=910) {
  x.font=(serif?'bold '+size+'px Georgia':'600 '+size+'px sans-serif');
  x.textAlign='center'; x.fillStyle=color; x.fillText(str,540,h*y,max);
 }
 function picture(top,bottom,cover=false) {
  const height=h*(bottom-top),width=920;
  const scale=(cover?Math.max:Math.min)(width/art.width,height/art.height);
  x.save(); x.beginPath(); x.rect(80,h*top,width,height); x.clip();
  x.drawImage(art,(1080-art.width*scale)/2,h*top+(height-art.height*scale)/2,art.width*scale,art.height*scale);
  x.restore();
 }
 label('E A R T H   O D O M E T E R',.092,38,true);
 if(card.layout==='counter'){
  label('LIFETIME DISTANCE',.23,34,false,gold);
  const chars=Array.from(card.value.replace(/,/g,''));
  const unit=Math.min(142,890/chars.length),width=unit*chars.length,top=h*.33,height=h*.23;
  x.fillStyle=gold; x.fillRect((1080-width)/2-9,top-9,width+18,height+18);
  chars.forEach((ch,i)=>{
   const left=(1080-width)/2+i*unit;
   const drum=x.createLinearGradient(0,top,0,top+height);
   drum.addColorStop(0,'#0a191a');drum.addColorStop(.46,'#405252');drum.addColorStop(1,'#101d1e');
   x.fillStyle=drum;x.fillRect(left,top,unit-2,height);
   x.font='bold '+Math.min(unit*1.32,height*.72)+'px Georgia';x.fillStyle=paper;
   x.textBaseline='middle';x.fillText(ch,left+unit/2,top+height/2,unit*.9);
  });
  x.textBaseline='alphabetic';label(card.unit,.65,60,true);
  label(card.detail,.82,43,true);
 }else if(card.layout==='medal'){
  label(card.status,.175,31,false,gold);picture(.215,.69);
  label(card.title,.78,79,true);label(card.detail,.86,39);
 }else if(card.layout==='postcard'){
  label(card.status,.162,30);label(card.title,.253,81,true);
  picture(.295,.675,true);
  label(card.value,.765,55,true);label(card.detail,.845,33);
  if(Number.isFinite(card.progress)){
   x.fillStyle='#d9d6c6';x.fillRect(155,h*.875,770,12);
   x.fillStyle=ink;x.fillRect(155,h*.875,770*Math.min(1,Math.max(0,card.progress)),12);
  }
 }else{
  label(card.title,.18,45,true);label(card.value,.29,100,true);
  picture(.315,card.rows?.length ? .61 : .74);
  if(card.rows?.length){
   const step=Math.min(.048,.24/Math.ceil(card.rows.length/2));
   card.rows.forEach((row,i)=>{
    const left=i%2?564:92, y=h*(.67+Math.floor(i/2)*step);
    x.font='32px sans-serif';x.fillStyle=ink;x.textAlign='left';x.fillText(row[0],left,y,195);
    x.textAlign='right';x.fillText(row[1],left+420,y,209);
   });
  }else label(card.detail,.835,42,true);
 }
 label(card.footer,.954,24,false,dark?'#d5c39d':'#526966');
 x.restore();
}

async function share(kind='today',format='story',mode='All modes') {
 const year=kind==='year',contextual=!['today','year','lifetime'].includes(kind);
 const [eyebrow,title,value,stat,detail]=cardContent(kind);
 const rows=['today','year'].includes(kind)?travelModes(kind):null;
 const selected=rows?.find(([label])=>label===mode);
 const milesText=distanceText;
 const selector=rows?'<label class="share-mode-label">Miles to share<select id="share-mode"><option value="All modes">Full breakdown · '+value+' '+preferences.units+'</option>'+rows.map(([label,n])=>'<option value="'+label+'">'+label+' · '+milesText(n)+'</option>').join('')+'</select></label>':'';
 const medal=kind==='earth'?medalGoals.find(g=>g.title==='Earth Lap'):kind.startsWith('medal-')?medalGoals[Number(kind.slice(6))]:null;
 open(contextual?'Share '+title:year?'Share your yearly recap':'Share my miles','<div class="card-picker"><label>Size<select id="card-size"><option value="story">Story · 9:16</option><option value="feed">Feed · 4:5</option></select></label></div>'+selector+'<canvas id="mile-card" width="1080" height="'+(format==='story'?1920:1350)+'" aria-label="Earth Odometer sample mileage card"></canvas><div class="export-actions"><button class="primary" id="send-card" disabled>Share image</button><button class="outline" id="save-card" disabled>Save image</button></div><p id="export-help" role="status">Choose an app in Share, or save the image to add it to Instagram, Facebook or TikTok.</p>');
 const sizeInput=document.querySelector('#card-size');
 sizeInput.value=format;
 const modeInput=document.querySelector('#share-mode');
 if(modeInput){modeInput.value=mode;modeInput.onchange=()=>share(kind,format,modeInput.value)}
 sizeInput.onchange=()=>share(kind,sizeInput.value,mode);
 const c=document.querySelector('#mile-card');
 const journey=kind.startsWith('journey-')||kind.startsWith('finish-')?destinations[kind.split('-')[1]]:null;
 const checkpoint=kind.startsWith('checkpoint-')?stops[Number(kind.slice(11))]:null;
 const routeArt=journey&&(kind.startsWith('finish-')?journey.stamp:journey.art);
 const artPath=medal?medalImagePath(medal):rows?'assets/atlas/globe.jpg':
  'assets/'+(checkpoint?.image||routeArt||'atlas/globe')+'.jpg';
 let art;
 try{
  if(kind!=='lifetime')art=await loadCardArtwork(artPath);
 }catch{
  if(!c.isConnected)return;
  const help=document.querySelector('#export-help');
  help.textContent='Artwork could not load. ';
  const retry=document.createElement('button');
  retry.textContent='Try again';
  retry.onclick=()=>share(kind,format,mode);
  help.append(retry);
  return;
 }
 if(!c.isConnected)return;
 const card={title,value,detail,footer:recordedTotals()?'EARTH ODOMETER  ·  RECORDED DISTANCE':'EARTH ODOMETER  ·  SAMPLE DISTANCE'};
 if(kind==='lifetime'){
  Object.assign(card,{layout:'counter',unit:preferences.units==='km'?'kilometers':'miles',detail:stat});
 }else if(medal){
  const earned=medalMiles()>=medal.target;
  Object.assign(card,{layout:'medal',title:medal.title,status:earned?'EARNED MEDAL':'MILESTONE PROGRESS',
   detail:earned?distanceText(medal.target)+' milestone':distanceText(medalMiles())+' of '+distanceText(medal.target)});
 }else if(journey||checkpoint){
  const finish=kind.startsWith('finish-'), progress=journey?.miles?(finish?1:journeyMiles(journey)/journey.miles):null;
  Object.assign(card,{layout:'postcard',status:finish?'VIRTUAL JOURNEY  ·  FINISH STAMP':eyebrow,
   value:journey&&progress!==null?(progress>=1?'Journey completed':value+' of '+distanceText(journey.miles)):value,
   detail:progress===null?detail:Math.min(100,Math.floor(100*progress))+'% complete  ·  '+detail,progress});
 }else{
  Object.assign(card,{layout:'globe',title:(year?'This year':'Today')+(selected?'  ·  '+mode:''),
   value:selected?milesText(selected[1]):value+' '+preferences.units,
   rows:selected?null:rows.map(([name,n])=>[name,milesText(n)]),detail:'Total '+(year?'this year':'today')+'  ·  '+value+' '+preferences.units});
 }
 drawTravelCard(c,card,art);
 const cardName=kind.startsWith('medal-')?medal.title+' medal share card':(rows?(year?'This year':'Today'):card.title)+' illustrated share card';
 c.setAttribute('aria-label',[cardName,card.status,card.value,card.detail,...(card.rows||[]).map(row=>row.join(' '))].filter(Boolean).join(' · '));
 const url=c.toDataURL('image/png'),fileName='earth-odometer-'+kind+(selected?'-'+mode.toLowerCase().replaceAll(' ','-'):'')+'-'+format+'.png';
 const preview = new Image();
 preview.id = 'mile-card';
 preview.alt = c.getAttribute('aria-label');
 preview.src = url;
 await preview.decode();
 if (!c.isConnected) return;
 c.replaceWith(preview);
 const bytes=Uint8Array.from(atob(url.split(',')[1]),v=>v.charCodeAt(0));
 const file=new File([bytes],fileName,{type:'image/png'});
 const help=document.querySelector('#export-help');
 const download=()=>{
  const a=document.createElement('a'),objectURL=URL.createObjectURL(file);
  a.href=objectURL;a.download=fileName;document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(objectURL),60000);
  help.textContent='Use the downloaded PNG, or press and hold the card to save it.';
 };
 const native=window.webkit?.messageHandlers?.share;
 document.querySelector('#save-card').onclick=()=>native?native.postMessage({action:'save',png:url.split(',')[1]}):download();
 document.querySelector('#send-card').onclick=async()=>{
  if(native){native.postMessage({action:'share',png:url.split(',')[1]});return}
  if(!navigator.canShare?.({files:[file]})){download();return}
  try{await navigator.share({files:[file]})}catch(error){if(error.name!=='AbortError')help.textContent='Sharing is unavailable here. Select Save image, then open your social app.'}
 };
 document.querySelector('#send-card').disabled=false;
 document.querySelector('#save-card').disabled=false;
}
