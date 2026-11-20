
"use strict";
(() => {
  const EARTH = 24901, MOON = 238900, STORAGE = "earth-odometer-web-demo-v1";
  const modes = [
    {id:"walking",label:"Walking",emoji:"🚶",color:"#54c8a8"},
    {id:"driving",label:"Driving",emoji:"🚗",color:"#379b90"},
    {id:"passenger",label:"Passenger",emoji:"🧍",color:"#7dbcb3"},
    {id:"train",label:"Train",emoji:"🚆",color:"#82b5a0"},
    {id:"bus",label:"Bus",emoji:"🚌",color:"#b0c5a4"},
    {id:"air",label:"Air",emoji:"✈️",color:"#8bc9d4"},
    {id:"boat",label:"Boat",emoji:"⛵",color:"#a6d5c2"}
  ];
  // Demonstration lengths are conceptual, not surveyed/verified route measurements.
  const routes = [
    {id:"park",name:"The Neighborhood Loop",from:"Your front door",to:"Your front door",distance:2.3,tier:"free",emoji:"🌳",desc:"The little journey that starts it all."},
    {id:"strip",name:"The Vegas Stroll",from:"Welcome sign",to:"The Strip",distance:6,tier:"free",emoji:"🎰",desc:"A short walk with a big personality."},
    {id:"coast",name:"The Coastline Walk",from:"Oceanfront",to:"Seaside lookout",distance:14,tier:"free",emoji:"🌊",desc:"A longer walk with a view."},
    {id:"vegas-la",name:"Las Vegas to Los Angeles",from:"Las Vegas",to:"Los Angeles",distance:270,tier:"plus",emoji:"🌴",desc:"From desert lights to the Pacific coast."},
    {id:"marathon",name:"The Marathon",from:"Starting line",to:"Finish line",distance:26.2,tier:"plus",emoji:"🏃",desc:"Go the distance, one mile at a time."},
    {id:"route66",name:"Route 66",from:"Chicago",to:"Santa Monica",distance:2448,tier:"plus",emoji:"🛣️",desc:"A legendary cross-country journey."},
    {id:"c2c",name:"Coast to Coast",from:"New York",to:"Los Angeles",distance:2800,tier:"plus",emoji:"🇺🇸",desc:"A big country. An even bigger journey."},
    {id:"grand-canyon",name:"Grand Canyon Explorer",from:"South Rim",to:"North Rim",distance:215,tier:"plus",emoji:"🏜️",desc:"Follow a virtual desert adventure."},
    {id:"iceland",name:"Iceland Ring Road",from:"Reykjavík",to:"Reykjavík",distance:828,tier:"plus",emoji:"❄️",desc:"Around a land of fire and ice."},
    {id:"japan",name:"Japan Explorer",from:"Tokyo",to:"Kyoto",distance:280,tier:"plus",emoji:"⛩️",desc:"Travel from neon streets to ancient temples."},
    {id:"italy",name:"Italian Escape",from:"Rome",to:"Venice",distance:330,tier:"plus",emoji:"🍋",desc:"A virtual journey through Italy."},
    {id:"alps",name:"Alpine Crossing",from:"Chamonix",to:"Zermatt",distance:125,tier:"plus",emoji:"🏔️",desc:"Mountain air, mile after mile."},
    {id:"pacific",name:"Pacific Coast",from:"San Francisco",to:"San Diego",distance:570,tier:"plus",emoji:"🌅",desc:"Take the scenic route down the coast."},
    {id:"nile",name:"Along the Nile",from:"Luxor",to:"Aswan",distance:135,tier:"plus",emoji:"☀️",desc:"Ancient sights, new milestones."},
    {id:"andes",name:"Andes Adventure",from:"Cusco",to:"Machu Picchu",distance:50,tier:"plus",emoji:"🦙",desc:"A legendary climb in virtual miles."}
  ];
  const medals = [
    {name:"First Steps",miles:1,icon:"✦",small:"1 MI"},
    {name:"5K Club",miles:3.1,icon:"★",small:"5K"},
    {name:"Marathon",miles:26.2,icon:"◆",small:"26.2"},
    {name:"Century",miles:100,icon:"✧",small:"100"},
    {name:"1,000 Miles",miles:1000,icon:"◎",small:"1K"},
    {name:"5,000 Miles",miles:5000,icon:"✺",small:"5K"},
    {name:"10,000 Miles",miles:10000,icon:"★",small:"10K"},
    {name:"Earth Explorer",miles:EARTH,icon:"◉",small:"1 LAP"},
    {name:"Double Earth",miles:EARTH*2,icon:"◉",small:"2 LAPS"},
    {name:"Triple Earth",miles:EARTH*3,icon:"◉",small:"3 LAPS"},
    {name:"Moon Landing",miles:MOON,icon:"☾",small:"MOON"}
  ];
  const $ = (id) => document.getElementById(id);
  const number = (v, digits=1) => Number(v).toLocaleString("en-US",{minimumFractionDigits:digits,maximumFractionDigits:digits});
  const sample = () => ({total:18426.8,today:6.4,year:3218.5,modes:{walking:2130.4,driving:10042.2,passenger:1320.5,train:640.1,bus:340.2,air:3760.7,boat:192.7},activeRoute:null,routeProgress:0,stamps:["park","strip"]});
  const fresh = () => ({total:0,today:0,year:0,modes:Object.fromEntries(modes.map(m=>[m.id,0])),activeRoute:null,routeProgress:0,stamps:[]});
  let state = sample();
  let filter = "all";
  function validate(saved){
    if(!saved||typeof saved!=="object") return false;
    if(!["total","today","year","routeProgress"].every(k=>Number.isFinite(saved[k])&&saved[k]>=0))return false;
    if(!saved.modes||!modes.every(m=>Number.isFinite(saved.modes[m.id])&&saved.modes[m.id]>=0))return false;
    if(saved.activeRoute!==null&&!routes.some(r=>r.id===saved.activeRoute))return false;
    if(!Array.isArray(saved.stamps)||!saved.stamps.every(id=>routes.some(r=>r.id===id)))return false;
    return true;
  }
  try { const saved=JSON.parse(localStorage.getItem(STORAGE));if(validate(saved))state=saved; }catch(_){}
  function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch(_){}}
  function switchTab(name){
    document.querySelectorAll(".demo-tab").forEach(b=>{
      const active=b.dataset.tab===name;
      b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));
    });
    document.querySelectorAll(".demo-panel").forEach(panel=>{
      const active=panel.id==="panel-"+name;
      panel.hidden=!active;panel.classList.toggle("active",active);
    });
    if(name==="journeys")renderRoutes();
    if(name==="achievements")renderAchievements();
  }
  function renderOverview(){
    $("lifetime-total").textContent=number(state.total);
    $("today-total").innerHTML=number(state.today)+" <small>mi</small>";
    $("year-total").innerHTML=number(state.year)+" <small>mi</small>";
    const laps=Math.floor(state.total/EARTH);
    const lapPercent=(state.total%EARTH)/EARTH*100;
    $("earth-pct").textContent=number(lapPercent)+"%";
    $("earth-laps").innerHTML=laps+" <small>"+(laps===1?"lap":"laps")+"</small>";
    $("earth-remaining").textContent=number(EARTH-(state.total%EARTH))+" mi to your next lap";
    document.querySelector(".earth-gauge").style.setProperty("--earth-progress",lapPercent+"%");
    const moonPct=state.total/MOON*100;
    $("moon-pct").innerHTML=number(moonPct)+"<small>%</small>";
    $("moon-bar").style.width=Math.min(100,moonPct)+"%";
    const max=Math.max(1,...modes.map(m=>state.modes[m.id]));
    $("mode-bars").innerHTML=modes.map(m=>'<div class="mode-row"><span>'+m.emoji+" "+m.label+'</span><div class="mode-track"><div class="mode-fill" style="width:'+Math.max(0,state.modes[m.id]/max*100)+'%;background:'+m.color+'"></div></div><b>'+number(state.modes[m.id])+'</b></div>').join("");
    const route=routes.find(r=>r.id===state.activeRoute);
    if(!route){
      $("active-journey").innerHTML='<div class="journey-placeholder"><span style="font-size:25px">🧭</span><strong>Your next adventure awaits</strong>Choose a virtual route to begin.<br><button type="button" id="choose-route">Explore journeys →</button></div>';
      $("choose-route").addEventListener("click",()=>switchTab("journeys"));
    }else{
      const progress=Math.min(100,state.routeProgress/route.distance*100);
      $("active-journey").innerHTML='<div class="active-journey-card"><span>'+route.emoji+' CURRENT DESTINATION</span><h5>'+route.name+'</h5><p>'+route.from+' → '+route.to+'</p><div class="journey-progress-track"><span style="width:'+progress+'%"></span></div><div class="journey-progress-footer"><span>'+number(state.routeProgress)+' / '+number(route.distance)+' mi</span><strong>'+number(progress)+'%</strong></div></div>';
    }
  }
  function renderRoutes(){
    $("route-grid").innerHTML=routes.filter(r=>filter==="all"||r.tier===filter).map(r=>{
      const active=state.activeRoute===r.id;
      const completed=state.stamps.includes(r.id);
      return '<article class="journey-card '+(active?"active-route":"")+'"><div class="journey-card-meta"><span class="route-tier '+(r.tier==="plus"?"plus":"")+'">'+(r.tier==="plus"?"PLUS":"FREE")+'</span><span>'+number(r.distance)+' mi</span></div><h4>'+r.emoji+' '+r.name+'</h4><p>'+r.desc+'</p><div class="journey-card-meta"><span>'+r.from+' → '+r.to+'</span></div><button type="button" data-route="'+r.id+'" '+(active?"disabled":"")+'>'+(active?"Current journey":completed?"Travel again":"Start journey")+'</button></article>';
    }).join("");
    document.querySelectorAll("[data-route]").forEach(b=>b.addEventListener("click",()=>startRoute(b.dataset.route)));
  }
  function startRoute(id){
    if(!routes.some(r=>r.id===id))return;
    state.activeRoute=id;state.routeProgress=0;save();renderAll();switchTab("overview");
    $("demo-feedback").textContent="Journey started! Add demo miles to move along your route.";
    $("demo").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function renderAchievements(){
    const unlocked=medals.filter(m=>state.total>=m.miles).length;
    $("medal-count").textContent=unlocked+" / "+medals.length+" unlocked";
    $("medal-shelf").innerHTML=medals.map(m=>{const has=state.total>=m.miles;return '<div class="medal-item '+(has?"":"locked")+'"><div class="medal-badge-web"><span class="medal-ribbon" aria-hidden="true"></span><div class="medal-disc"><span>'+m.icon+'</span><small>'+m.small+'</small></div></div><h5>'+m.name+'</h5><p>'+(has?"Unlocked":number(m.miles)+" mi to unlock")+'</p></div>';}).join("");
    $("stamp-count").textContent=state.stamps.length+" collected";
    const stamped=routes.filter(r=>state.stamps.includes(r.id));
    const shown=stamped.length?stamped:routes.slice(0,3);
    const scenes={
      park:{type:"woodland",title:"FIRST STEPS",sub:"A SMALL ADVENTURE"},
      strip:{type:"vegas",title:"LAS VEGAS",sub:"THE CITY OF LIGHTS"},
      coast:{type:"coast",title:"PACIFIC COAST",sub:"THE LONG WAY HOME"},
      "vegas-la":{type:"coast",title:"WESTWARD",sub:"DESERT TO OCEAN"},
      marathon:{type:"woodland",title:"MARATHON",sub:"THE LONG RUN"},
      route66:{type:"desert",title:"ROUTE 66",sub:"THE OPEN ROAD"},
      c2c:{type:"coast",title:"COAST TO COAST",sub:"ACROSS AMERICA"},
      "grand-canyon":{type:"desert",title:"GRAND CANYON",sub:"RED ROCK COUNTRY"},
      iceland:{type:"nordic",title:"ICELAND",sub:"FIRE & ICE"},
      japan:{type:"japan",title:"JAPAN",sub:"A JOURNEY EAST"},
      italy:{type:"italy",title:"ITALIAN ESCAPE",sub:"THE GRAND TOUR"},
      alps:{type:"nordic",title:"THE ALPS",sub:"ABOVE THE CLOUDS"},
      pacific:{type:"coast",title:"PACIFIC COAST",sub:"OCEAN AIR"},
      nile:{type:"desert",title:"THE NILE",sub:"ANCIENT WONDERS"},
      andes:{type:"nordic",title:"THE ANDES",sub:"HIGHER GROUND"}
    };
    const art={
      woodland:'<path d="M0 125Q40 84 92 115T200 107V180H0Z" fill="#759f87"/><path d="M0 147Q70 111 123 140T200 132V180H0Z" fill="#386e64"/><path d="M46 135V64M137 145V59M169 136V79" stroke="#355d4d" stroke-width="8"/><path d="M46 35l-25 53h50zM137 24l-30 63h60zM169 52l-20 48h40z" fill="#255e52"/><path d="M46 17l-17 48h34zM137 8l-18 51h36z" fill="#4c8e71"/>',
      vegas:'<path d="M0 143h200v37H0z" fill="#3b5363"/><path d="M13 143V91h26v52M43 143V61h30v82M80 143V80h30v63M114 143V51h25v92M145 143V96h32v47" fill="#34495d"/><path d="M23 103v7m0 10v7m32-51v9m0 13v9m39-13v8m33-37v12m0 15v12m33-3v8" stroke="#ffe7a2" stroke-width="4"/><path d="M126 51V27m-7 14 7-14 7 14" stroke="#34495d" stroke-width="3" fill="none"/><path d="M0 149Q100 132 200 149" stroke="#e3c6a0" stroke-width="3" fill="none"/>',
      coast:'<circle cx="153" cy="42" r="22" fill="#f8d7a1"/><path d="M0 100Q60 75 100 98T200 91V180H0Z" fill="#82b5b0"/><path d="M0 128Q45 106 93 126T200 121V180H0Z" fill="#4e8d96"/><path d="M0 148Q60 127 105 151T200 141" fill="none" stroke="#e9eee0" stroke-width="5"/><path d="M14 120l40-75 24 49 28-25 36 51" fill="#648e82"/><path d="M53 45l-9 20 17-5z" fill="#f4efe0"/>',
      desert:'<circle cx="155" cy="43" r="23" fill="#f3c48c"/><path d="M0 115l36-34 27 27 28-43 37 47 25-22 47 35v55H0Z" fill="#bc795d"/><path d="M0 139l49-24 33 25 40-29 78 29v40H0Z" fill="#8f574c"/><path d="M0 157Q90 137 200 158V180H0Z" fill="#d3a47b"/><path d="M35 150v-32m0 12-12-10m12 20 12-11M172 160v-35m0 13 12-11" stroke="#446b5b" stroke-width="6" fill="none"/>',
      nordic:'<circle cx="151" cy="43" r="17" fill="#fff5d6"/><path d="M0 126l47-76 34 55 32-77 44 76 20-31 23 53v54H0Z" fill="#7499a8"/><path d="M47 50L30 77l19-7 13 10zM113 28L94 75l21-15 20 17zM177 73l-10 25 13-8 10 13z" fill="#f7f8ef"/><path d="M0 142Q60 126 120 145T200 137V180H0Z" fill="#376e7d"/><path d="M0 161Q90 148 200 163" fill="none" stroke="#c5e5df" stroke-width="3"/>',
      japan:'<circle cx="150" cy="45" r="25" fill="#d68b7d"/><path d="M0 134l49-40 30 28 44-70 40 68 37-22v82H0Z" fill="#789b96"/><path d="M123 52l-19 33 19-10 17 10z" fill="#f4e9dc"/><path d="M27 146V95m-15 2h45M21 108h31M18 97l16-15 17 15" stroke="#8b4b49" stroke-width="6" fill="none"/><path d="M0 153Q90 130 200 151V180H0Z" fill="#527d6c"/>',
      italy:'<circle cx="156" cy="45" r="22" fill="#f6d7a6"/><path d="M0 143h200v37H0z" fill="#6d9994"/><path d="M20 143V80h38v63M69 143V60h55v83M133 143V95h46v48" fill="#c99775"/><path d="M67 60l30-35 30 35z" fill="#a96559"/><path d="M87 143v-31h18v31" fill="#6e736b"/><path d="M26 92h25M26 107h25M138 109h35" stroke="#f8dfb4" stroke-width="5"/><path d="M0 153Q100 137 200 153" fill="none" stroke="#d6e8db" stroke-width="4"/>'
    };
    $("stamps-grid").innerHTML=shown.map((r,i)=>{
      const earned=state.stamps.includes(r.id);
      const scene=scenes[r.id]||{type:"woodland",title:r.name.toUpperCase(),sub:"THE JOURNEY"};
      const serial=String(i+1).padStart(2,"0");
      return '<article class="collector-stamp '+(earned?"":"locked")+'"><div class="collector-stamp-paper"><div class="collector-stamp-frame"><div class="collector-stamp-top"><span>EARTH ODOMETER</span><b>✦ '+serial+'</b></div><svg class="collector-stamp-art" viewBox="0 0 200 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="200" height="180" fill="'+({woodland:"#c4ddca",vegas:"#eac5a7",coast:"#bcdcd9",desert:"#f3d6b1",nordic:"#c9dce0",japan:"#e6d4c9",italy:"#e8d7b9"}[scene.type])+'"/>'+art[scene.type]+'</svg><div class="collector-stamp-location"><strong>'+scene.title+'</strong><small>'+scene.sub+'</small></div><div class="collector-stamp-foot"><span>JOURNEY SERIES</span><span>✦ 2026</span></div></div></div><div class="collector-stamp-caption"><strong>'+r.name+'</strong><span>'+(earned?"STAMP COLLECTED":"NOT YET EARNED")+'</span></div></article>';
    }).join("");
  }
  function renderAll(){renderOverview();renderRoutes();renderAchievements();}
  function addMiles(event){
    event.preventDefault();
    const amount=Number($("miles-input").value),mode=$("travel-mode").value;
    if(!Number.isFinite(amount)||amount<0.1||amount>10000||!modes.some(m=>m.id===mode)){
      $("demo-feedback").textContent="Enter between 0.1 and 10,000 miles.";return;
    }
    state.total=Math.round((state.total+amount)*10)/10;
    state.today=Math.round((state.today+amount)*10)/10;
    state.year=Math.round((state.year+amount)*10)/10;
    state.modes[mode]=Math.round((state.modes[mode]+amount)*10)/10;
    let completed=null;
    if(state.activeRoute){
      const route=routes.find(r=>r.id===state.activeRoute);
      state.routeProgress=Math.round((state.routeProgress+amount)*10)/10;
      if(route&&state.routeProgress>=route.distance){
        completed=route.name;
        if(!state.stamps.includes(route.id))state.stamps.push(route.id);
        state.activeRoute=null;state.routeProgress=0;
      }
    }
    save();renderAll();
    $("demo-feedback").textContent=completed?"🎉 "+completed+" completed! Passport stamp earned.":"+"+number(amount)+" simulated miles added. Your world just got a little bigger.";
  }
  document.querySelectorAll(".demo-tab").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));
  document.querySelectorAll(".route-filter-btn").forEach(b=>b.addEventListener("click",()=>{
    filter=b.dataset.filter;
    document.querySelectorAll(".route-filter-btn").forEach(x=>x.classList.toggle("active",x===b));
    renderRoutes();
  }));
  $("add-miles-form").addEventListener("submit",addMiles);
  $("load-sample").addEventListener("click",()=>{state=sample();save();renderAll();$("demo-feedback").textContent="Sample explorer data restored.";});
  $("start-fresh").addEventListener("click",()=>{state=fresh();save();renderAll();$("demo-feedback").textContent="Demo reset to zero. Try adding some miles.";});
  const menu=$("menu-toggle"),mobile=$("mobile-nav");
  menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation");mobile.hidden=!open;});
  mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mobile.hidden=true;menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");}));
  $("footer-year").textContent=String(new Date().getFullYear());
  const shelf=$("medal-shelf");let frame=false;
  shelf.addEventListener("scroll",()=>{if(frame)return;frame=true;requestAnimationFrame(()=>{
    const center=shelf.scrollLeft+shelf.clientWidth/2;
    shelf.querySelectorAll(".medal-item").forEach(item=>{
      const x=item.offsetLeft+item.offsetWidth/2;
      const angle=Math.max(-4,Math.min(4,(x-center)/90));
      item.style.transform="rotate("+angle.toFixed(1)+"deg)";
    });frame=false;
  });},{passive:true});
  renderAll();
})();
