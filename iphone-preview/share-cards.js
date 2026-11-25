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
   return ['Walking','Running','Cycling','Driving','Flying'].map(type=>[type==='Walking'?'On foot':type,amounts[type]||0]);
  }
  const activity=totals.activityMiles||{};
  const running=activity.running?.[period]||0;
  const cycling=activity.cycling?.[period]||0;
  const flying=activity.flying?.[period]||0;
  const foot=(year?totals.walkYear:totals.walkToday)||0;
  const total=year?yearMiles():todayMiles();
  return [['On foot',Math.max(0,foot-running)],['Running',running],['Cycling',cycling],
          ['Driving',Math.max(0,total-foot-cycling-flying)],['Flying',flying]];
 }
 const sample=dataMode==='sample';
 const addedFoot=previewTotals.foot-(sample?26.2:0);
 const addedRoad=previewTotals.road-(sample?1221.8:0);
 const running=previewTotals.running||0;
 const walking=(sample?(year?40:4.2):0)+addedFoot-running;
 const driving=(sample?(year?198:19.8):0)+addedRoad;
 return [['On foot',Math.max(0,walking)],['Running',running],['Cycling',previewTotals.cycling||0],
         ['Driving',Math.max(0,driving)],['Train',sample?(year?24:8):0],['Boat',sample&&year?6:0],
         ['Flying',(sample&&year?980:0)+(previewTotals.flying||0)]];
}
function onFootMiles(period){
 return travelModes(period).filter(([label])=>label==='On foot'||label==='Running').reduce((sum,[,value])=>sum+value,0);
}
function showModes(period) {
 const year=period==='year', rows=travelModes(period);
 const details=rows.map(([label,value])=>{
  return '<p class="mode-detail"><b>'+label+'</b>'+distanceText(value)+'</p>';
 }).join('');
 open(year?'How you traveled this year':'How you traveled today','<p>'+(recordedTotals()?'Recorded':'Sample')+' travel breakdown · '+distanceText(year?yearMiles():todayMiles())+' total</p>'+details+(recordedTotals()?'<p class="muted">On foot includes walks and runs recorded together. Recognized runs and miles classified as running appear under Running.</p>':'')+
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
 if(kind==='year')return [new Date().getFullYear()+'   /   YEAR IN REVIEW','My year in '+unitName,displayNumber(yearMiles()),(yearMiles()/24901).toFixed(2)+' Earth laps',distanceText(onFootMiles('year'))+' on foot'];
 return ['FIELD NOTES   /   TODAY','My '+unitName+' today',displayNumber(todayMiles()),distanceText(onFootMiles('today'))+' on foot','Walking, riding and everything between.'];
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
 const c=document.querySelector('#mile-card'),x=c.getContext('2d'),h=c.height;
 x.fillStyle='#f7f2e5';x.fillRect(0,0,c.width,h);
 x.strokeStyle='#b9aa85';x.lineWidth=3;x.strokeRect(40,40,1000,h-80);
 const print=(str,y,font,color='#114e50')=>{x.fillStyle=color;x.font=font;x.fillText(str,88,y,904)};
 const journey=kind.startsWith('journey-')||kind.startsWith('finish-')?destinations[kind.split('-')[1]]:null;
 const checkpoint=kind.startsWith('checkpoint-')?stops[Number(kind.slice(11))]:null;
 const routeArt=journey&&(kind.startsWith('finish-')?journey.stamp:journey.art);
 const artPath=medal?medalImagePath(medal):rows?'assets/share/'+kind+'.jpg':
  'assets/'+(checkpoint?.image||routeArt||'atlas/globe')+'.jpg';
 let art;
 try{
  art=await loadCardArtwork(artPath);
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
 if(medal||journey||checkpoint||kind==='lifetime'){
  x.textAlign='center';
  const center=(str,y,font)=>{x.fillStyle='#114e50';x.font=font;x.fillText(str,540,y,904)};
  if(!medal){
   center('EARTH ODOMETER',h*.12,'bold 46px Georgia');
   center(eyebrow,h*.19,'bold 32px sans-serif');
   const height=h*.37,scale=Math.min(896/art.naturalWidth,height/art.naturalHeight);
   const w=art.naturalWidth*scale,dh=art.naturalHeight*scale;
   x.drawImage(art,(1080-w)/2,h*.22+(height-dh)/2,w,dh);
   center(title,h*.655,'bold 80px Georgia');
   center((kind==='lifetime'?value+' '+preferences.units:value)+'  ·  '+stat,h*.725,'bold 45px Georgia');
   center(detail,h*.79,'33px sans-serif');
   c.setAttribute('aria-label',title+' illustrated share card · '+value+' · '+stat);
  }else{
  center('EARTH ODOMETER',h*.12,'bold 44px Georgia');
  center(medalMiles()>=medal.target?'EARNED MEDAL':'LOCKED MILESTONE',h*.18,'bold 32px sans-serif');
  const height=h*.40,width=height*art.naturalWidth/art.naturalHeight;
  x.drawImage(art,(1080-width)/2,h*.205,width,height);
  center(medal.title,h*.67,'bold 81px Georgia');
  center(medalMiles()>=medal.target?distanceText(medal.target)+' traveled':value+' of '+distanceText(medal.target),h*.75,'bold 48px Georgia');
  c.setAttribute('aria-label',medal.title+' medal share card');
  }
  x.textAlign='left';
 }else if(rows){
  print('EARTH ODOMETER',h*.085,'bold 47px Georgia');
  print(year?new Date().getFullYear()+'   /   THIS YEAR':'FIELD NOTES   /   TODAY',h*.14,'bold 30px sans-serif');
  const bandHeight=h*.23,scale=Math.max(904/art.naturalWidth,bandHeight/art.naturalHeight);
  x.save();x.beginPath();x.rect(88,h*.175,904,bandHeight);x.clip();
  x.drawImage(art,88+(904-art.naturalWidth*scale)/2,h*.175+(bandHeight-art.naturalHeight*scale)/2,art.naturalWidth*scale,art.naturalHeight*scale);x.restore();
  print(selected?selected[0]:title,h*.465,'bold 70px Georgia');
  x.fillStyle='#103f41';x.fillRect(64,h*.49,952,h*.115);
  print(selected?milesText(selected[1]):value+' '+preferences.units,h*.58,'bold 100px monospace','#fff8e7');
  if(selected){
   print((preferences.units==='km'?'Kilometers':'Miles')+(year?' this year':' today'),h*.73,'bold 56px Georgia');
  }else{
   rows.forEach(([label,n],i)=>{
    const y=h*(.65+Math.min(.043,.21/Math.max(1,rows.length-1))*i);
    print(label,y,rows.length>5?'35px Georgia':'42px Georgia');
    x.textAlign='right';x.fillText(milesText(n),992,y);x.textAlign='left';
   });
  }
  c.setAttribute('aria-label',(year?'This year':'Today')+' illustrated share card · '+(selected?[selected]:rows).map(([label,n])=>label+' '+milesText(n)).join(', '));

 }
 print('EARTH ODOMETER',h*(rows ? .91 : .86),'bold 35px Georgia');
 print(recordedTotals()?(journey||checkpoint?'VIRTUAL JOURNEY  ·  RECORDED DISTANCE':'RECORDED DISTANCE'):'DESIGN PREVIEW  ·  SAMPLE DISTANCE',h*(rows ? .955 : .91),'24px sans-serif');
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

