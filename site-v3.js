"use strict";
(()=>{
 const $=id=>document.getElementById(id);
 const EARTH=24901;
 const fmt=(v,d=0)=>Number(v).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
 let sample={miles:1248,journey:{name:"Route 66",progress:842,total:2448},completedJourney:{name:"Virtual Boston Marathon",miles:26.2},medal:{name:"1,000 Miles",miles:1000}};
 let shareStyle="distance";
 const modal=$("share-modal"),canvas=$("share-canvas"),ctx=canvas?.getContext("2d");
 const iframe=document.querySelector(".approved-preview-screen iframe");
 const images=new Map();
 function artwork(path){
   if(!images.has(path)){
     const img=new Image();
     images.set(path,img);
     img.onload=refreshStats;
     img.src="iphone-preview/assets/"+path;
   }
   const img=images.get(path);
   return img.complete&&img.naturalWidth?img:null;
 }
 document.querySelectorAll("[data-stamp-city]").forEach(el=>{
   el.innerHTML=passportImprint(el.dataset.stampCity,el.dataset.stampArt);
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
   drawExample($("lifetime-example"),"distance");
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
 function drawExample(target,style){
   if(!target)return;
   const card={footer:"EARTH ODOMETER  ·  SAMPLE DISTANCE"};
   let path;
   if(style==="distance"){
     Object.assign(card,{layout:"counter",value:fmt(sample.miles),unit:"miles",detail:(sample.miles/EARTH).toFixed(2)+" Earth laps"});
   }else if(style==="today"){
     path="atlas/globe.jpg";
     Object.assign(card,{layout:"globe",title:"Today",value:"32 mi",rows:[["On foot","4.2 mi"],["Driving","19.8 mi"],["Train","8 mi"]]});
   }else if(style==="journey"){
     path="scenes/route66.jpg";
     Object.assign(card,{layout:"postcard",status:"VIRTUAL JOURNEY",title:"Route 66",value:"842 mi of 2,448 mi",detail:"34% complete",progress:842/2448});
   }else{
     const medal=sample.medal;
     path="medals/"+medal.name.toLowerCase().replaceAll(",","").replaceAll(" ","-")+".png";
     Object.assign(card,{layout:"medal",status:"EARNED MEDAL",title:medal.name,detail:fmt(medal.miles)+" mi milestone"});
   }
   const art=path?artwork(path):null;
   if(path&&!art)return;
   drawTravelCard(target,card,art);
   target.setAttribute("aria-label",[card.status,card.title,card.value,card.unit,card.detail,"Sample distance"].filter(Boolean).join(" · "));
 }
 function drawShare(){drawExample(canvas,shareStyle)}
 refreshStats();
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
   const phrase=shareStyle==="today"?"My Earth Odometer sample day: 32 miles.":shareStyle==="distance"
     ?"My Earth Odometer sample journey: "+fmt(sample.miles)+" miles ("+fmt(sample.miles/EARTH*100,1)+"% of an Earth lap)."
     :shareStyle==="journey"
     ?"My Earth Odometer sample Route 66 journey: 842 of 2,448 miles."
     :"My Earth Odometer sample milestone: "+sample.medal.name+" ("+fmt(sample.medal.miles)+" miles).";
   const copy=phrase+" earthodometer.com";
   try{await navigator.clipboard.writeText(copy);$("copy-share").textContent="Copied!"}
   catch(_){$("copy-share").textContent="Copy unavailable"}
 });
 document.fonts?.ready?.then(()=>{if(modal&&!modal.hidden)drawShare()});
})();
