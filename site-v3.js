"use strict";
(()=>{
 const $=id=>document.getElementById(id);
 const EARTH=24901;
 const fmt=(v,d=0)=>Number(v).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
 let sample={miles:1248,journey:{name:"Route 66",progress:842,total:2448},completedJourney:{name:"Virtual Boston Marathon",miles:26.2},medal:{name:"1,000 Miles",miles:1000}};
 let shareStyle="distance";
 const modal=$("share-modal"),canvas=$("share-canvas"),ctx=canvas?.getContext("2d");
 const iframe=document.querySelector(".approved-preview-screen iframe");
 const imageSources={globe:"iphone-preview/assets/atlas/globe.jpg",map:"iphone-preview/assets/RouteMap.jpg",medals:"iphone-preview/assets/atlas/cabinet.jpg"};
 const images={};
 Object.entries(imageSources).forEach(([name,src])=>{
   const img=new Image();images[name]=img;img.onload=()=>{if(modal&&!modal.hidden)drawShare()};img.src=src;
 });
 const menu=$("menu-toggle"),mobile=$("mobile-nav");
 menu?.addEventListener("click",()=>{
   const expanded=menu.getAttribute("aria-expanded")==="true";
   menu.setAttribute("aria-expanded",String(!expanded));menu.setAttribute("aria-label",expanded?"Open navigation":"Close navigation");
   mobile.hidden=expanded;
 });
 mobile?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
   mobile.hidden=true;menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");
 }));
 if($("footer-year"))$("footer-year").textContent=String(new Date().getFullYear());
 function refreshStats(){
   const el=$("share-hero-miles");if(el)el.textContent=fmt(sample.miles);
   const pct=$("share-hero-progress");if(pct)pct.textContent=fmt(sample.miles/EARTH*100,1)+"% AROUND THE EARTH";
   if(modal&&!modal.hidden)drawShare();
 }
 window.addEventListener("message",event=>{
   if(event.origin!==location.origin||event.source!==iframe?.contentWindow||event.data?.type!=="earth-odometer-preview-state")return;
   const data=event.data;
   if(!Number.isFinite(data.miles)||data.miles<0)return;
   sample={miles:data.miles,journey:data.journey||sample.journey,completedJourney:data.completedJourney||sample.completedJourney,medal:data.medal||sample.medal};
   refreshStats();
 });
 iframe?.addEventListener("load",()=>iframe.contentWindow?.postMessage({type:"earth-odometer-request-state"},location.origin));
 const colors={forest:"#0b2c2c",forest2:"#165b54",teal:"#1c7771",mint:"#d6f49c",cream:"#f8f3e5",gold:"#cbb48b",ink:"#133d3a",light:"#ffffff"};
 function rounded(x,y,w,h,r,fill,stroke=null){
   ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=3;ctx.stroke()}
 }
 function text(str,x,y,size=30,color=colors.cream,weight="700",font="Manrope, Arial, sans-serif",align="left",max=900){
   ctx.textAlign=align;ctx.fillStyle=color;ctx.font=weight+" "+size+"px "+font;ctx.fillText(String(str),x,y,max);
 }
 function drawCover(img,x,y,w,h){
   if(!img?.complete||!img.naturalWidth)return false;
   const ratio=Math.max(w/img.naturalWidth,h/img.naturalHeight),iw=w/ratio,ih=h/ratio;
   ctx.save();ctx.beginPath();ctx.roundRect(x,y,w,h,16);ctx.clip();
   ctx.drawImage(img,(img.naturalWidth-iw)/2,(img.naturalHeight-ih)/2,iw,ih,x,y,w,h);ctx.restore();return true;
 }
 function drawBackground(){
   const grad=ctx.createLinearGradient(0,0,1080,1350);
   grad.addColorStop(0,colors.forest);grad.addColorStop(.64,colors.forest2);grad.addColorStop(1,colors.forest);
   ctx.fillStyle=grad;ctx.fillRect(0,0,1080,1350);
   ctx.strokeStyle="#d6f49c1c";ctx.lineWidth=2;
   for(let i=0;i<7;i++){ctx.beginPath();ctx.ellipse(790,590,250+i*62,250+i*62,0,0,Math.PI*2);ctx.stroke()}
   text("◎  EARTH ODOMETER",70,108,34,colors.mint,"800");
   text("A LIFE IN MOTION",70,163,22,"#d6f49cbd","700");
   ctx.strokeStyle="#d6f49c66";ctx.beginPath();ctx.moveTo(70,196);ctx.lineTo(1010,196);ctx.stroke();
   rounded(68,1160,944,3,1,"#d6f49c65");
   text("EVERY MILE TELLS A STORY",70,1222,23,colors.mint,"800");
   text("earthodometer.com",1010,1222,23,colors.mint,"700","Manrope, Arial, sans-serif","right");
   text("SAMPLE PREVIEW · iPHONE APP COMING SOON",540,1300,17,"#e1e9d6","600","Manrope, Arial, sans-serif","center");
 }
 function drawShare(){
   if(!ctx)return;
   ctx.clearRect(0,0,1080,1350);drawBackground();
   if(shareStyle==="distance"){
     rounded(240,258,600,520,28,colors.cream);
     if(!drawCover(images.globe,262,278,556,478)){
       text("◎",540,670,320,colors.teal,"400","Georgia, serif","center");
     }
     text("LIFETIME DISTANCE",540,858,25,colors.mint,"800","Manrope, Arial, sans-serif","center");
     text(fmt(sample.miles)+" MI",540,963,91,colors.cream,"800","Manrope, Arial, sans-serif","center");
     text(fmt(sample.miles/EARTH*100,1)+"% OF AN EARTH LAP",540,1045,30,colors.mint,"800","Manrope, Arial, sans-serif","center");
   }else if(shareStyle==="journey"){
     rounded(120,278,840,540,25,colors.cream);
     if(!drawCover(images.map,140,298,800,500))text("ROUTE 66",540,565,95,colors.ink,"800","Georgia, serif","center");
     text("VIRTUAL JOURNEY",540,881,27,colors.mint,"800","Manrope, Arial, sans-serif","center");
     text(sample.journey.name.toUpperCase(),540,970,70,colors.cream,"800","Georgia, serif","center");
     text(fmt(sample.journey.progress)+" / "+fmt(sample.journey.total)+" MILES",540,1053,33,colors.mint,"800","Manrope, Arial, sans-serif","center");
   }else{
     rounded(230,258,620,570,30,colors.cream);
     const img=images.medals;
     if(img.complete&&img.naturalWidth){
       // 1,000 Miles medallion crop from the approved app's cabinet artwork.
       ctx.drawImage(img,482,103,217,334,365,305,350,470);
     }else text("★",540,645,340,colors.teal,"700","Georgia, serif","center");
     text("MILESTONE UNLOCKED",540,884,26,colors.mint,"800","Manrope, Arial, sans-serif","center");
     text(sample.medal.name.toUpperCase(),540,978,72,colors.cream,"800","Georgia, serif","center");
     text(fmt(sample.medal.miles)+" MILES",540,1056,34,colors.mint,"800","Manrope, Arial, sans-serif","center");
   }
 }
 const options=[...document.querySelectorAll("[data-share-style]")];
 options.forEach(button=>button.addEventListener("click",()=>{
   shareStyle=button.dataset.shareStyle;
   options.forEach(b=>{const on=b===button;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on))});
   $("copy-share").textContent="Copy sample text";
   drawShare();
 }));
 let previousFocus=null;
 function openModal(){
   previousFocus=document.activeElement;
   modal.hidden=false;document.body.style.overflow="hidden";drawShare();$("share-modal-close").focus();
 }
 function closeModal(){
   modal.hidden=true;document.body.style.overflow="";
   if(previousFocus?.focus)previousFocus.focus();
 }
 $("share-preview-button")?.addEventListener("click",openModal);
 $("preview-share-trigger")?.addEventListener("click",openModal);
 $("share-modal-close")?.addEventListener("click",closeModal);
 modal?.addEventListener("click",e=>{if(e.target===modal)closeModal()});
 document.addEventListener("keydown",e=>{
   if(modal?.hidden)return;
   if(e.key==="Escape"){e.preventDefault();closeModal();return}
   if(e.key!=="Tab")return;
   const focusable=[...modal.querySelectorAll("button:not([disabled]),a[href]")];
   if(!focusable.length)return;
   const first=focusable[0],last=focusable[focusable.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 });
 $("copy-share")?.addEventListener("click",async()=>{
   const phrase=shareStyle==="distance"
     ?"My Earth Odometer sample journey: "+fmt(sample.miles)+" miles ("+fmt(sample.miles/EARTH*100,1)+"% of an Earth lap)."
     :shareStyle==="journey"
     ?"My Earth Odometer sample "+sample.journey.name+" journey: "+fmt(sample.journey.progress)+" of "+fmt(sample.journey.total)+" miles."
     :"My Earth Odometer sample milestone: "+sample.medal.name+" ("+fmt(sample.medal.miles)+" miles).";
   const copy=phrase+" iPhone app coming soon: earthodometer.com";
   try{await navigator.clipboard.writeText(copy);$("copy-share").textContent="Copied!"}
   catch(_){$("copy-share").textContent="Copy unavailable"}
 });
 document.fonts?.ready?.then(()=>{if(modal&&!modal.hidden)drawShare()});
})();
