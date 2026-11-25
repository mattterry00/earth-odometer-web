// Virtual milestones are curated for the app; diagrams are schematic.
const vegasGeoMap = {
 viewBox:'0 0 500 430',
 credit:'Las Vegas Boulevard overview · Approximate geography, not walking directions',
 points:[[215,385],[215,270],[235,210],[280,45]],
 labelOffsets:[[12,18,'start'],[-15,-8,'end'],[15,0,'start'],[14,0,'start']],
 legs:['M215 385 L215 270','M215 270 L215 235 Q215 220 235 210','M235 210 L265 105 L280 45'],
 background:`<rect width="500" height="430" fill="#eee6d3"/>
 <path d="M80 430V20 M400 430V20" stroke="#d7d2be" stroke-width="10"/>
 <g stroke="#fffaf0" stroke-width="9"><path d="M25 340H475 M25 260H475 M25 155H475 M25 75H475"/></g>
 <g fill="#d7d5c0" stroke="#c5c9b0"><rect x="130" y="353" width="60" height="40" rx="4"/><path d="M152 338 175 300 197 338Z"/><rect x="130" y="225" width="50" height="30" rx="5"/><rect x="270" y="185" width="65" height="45" rx="4"/><rect x="290" y="115" width="50" height="25" rx="5"/><rect x="295" y="32" width="20" height="30" rx="4"/></g>
 <ellipse cx="195" cy="260" rx="11" ry="23" fill="#b9d3cc"/>
 <path d="M215 420V235 Q215 220 235 210 L265 105 L285 20" fill="none" stroke="#d6c5a3" stroke-width="15"/>
 <g font-family="sans-serif" font-size="10" fill="#7b806b"><text x="33" y="332">TROPICANA AVE</text><text x="32" y="252">FLAMINGO RD</text><text x="32" y="147">SPRING MOUNTAIN RD</text><text x="32" y="67">SAHARA AVE</text><text x="342" y="398">LAS VEGAS, NV</text></g>`
};
const extraJourneys = {
 vegas: {
  checkpointArt:['checkpoints/vegas-bellagio','checkpoints/vegas-venetian','checkpoints/vegas-strat'],
  name:'Las Vegas Strip',region:'Mandalay Bay to The STRAT',miles:4.5,
  art:'journeys/vegas',stamp:'checkpoints/vegas-strat',spotlight:'Las Vegas Strip',
  intro:'Travel a 4.5-mile virtual Strip journey past fountains, Venetian-inspired towers and neon skylines. The total follows Visit Las Vegas’s approximate end-to-end walk; checkpoint mileage is curated for this virtual journey.',
  note:{title:'A world along one boulevard',text:'Visit Las Vegas describes the walk between Mandalay Bay and The STRAT as about 4.5 miles. Along the way, the boulevard brings together fountains, a pyramid and skylines inspired by cities around the world.',source:'Visit Las Vegas',url:'https://www.visitlasvegas.com/experience/post/walking-the-las-vegas-strip/'},
  points:[['Mandalay Bay',0,215,385],['Bellagio Fountains',1.5,215,270],['The Venetian',2.2,235,210],['The STRAT',4.5,280,45]],terrain:'city'
 },
 freedom: {
  checkpointArt:['checkpoints/old-state-house', 'checkpoints/old-north-church', 'checkpoints/bunker-hill'],
  name:'Freedom Trail',region:'Boston Common to Bunker Hill',miles:2.5,
  art:'journeys/freedom',stamp:'checkpoints/bunker-hill',spotlight:'Freedom Trail',
  intro:'Follow Boston’s red-brick thread through revolutionary history. This short virtual journey finishes at Bunker Hill.',
  note:{title:'Sixteen places, one red line',text:'Boston’s Freedom Trail links 16 historic sites along a 2.5-mile red line. Churches, meeting houses, burial grounds and a battle monument tell different parts of the city’s story.',source:'Freedom Trail Foundation',url:'https://www.thefreedomtrail.org/about'},
  points:[['Boston Common',0,40,140],['Old State House',.8,150,115],['Old North Church',1.5,285,75],['Bunker Hill',2.5,450,40]],
  terrain:'city'
 },
 centralpark: {
  checkpointArt:['checkpoints/east-drive', 'checkpoints/north-end', 'checkpoints/west-drive', 'checkpoints/central-park-finish'],
  name:'Central Park Loop',region:'One circuit of Manhattan’s green heart',miles:6.1,
  art:'journeys/centralpark',stamp:'checkpoints/central-park-finish',spotlight:'Central Park',
  intro:'Circle the park’s drives past lakes, open lawns and the northern woods. Complete one full virtual lap back where you started.',
  note:{title:'A loop inside the city',text:'The longest running loop in Central Park covers 6.1 miles. The park also offers shorter loops, including the 1.58-mile track around the Reservoir.',source:'Central Park Conservancy',url:'https://www.centralparknyc.org/activities/guides/Running'},
  points:[['South end',0,170,155],['East Drive',1.8,300,120],['North end',3.3,320,45],['West Drive',4.9,150,45],['Loop complete',6.1,170,155]],
  terrain:'park'
 },
 goldengate: {
  checkpointArt:['checkpoints/lands-end', 'checkpoints/baker-beach', 'checkpoints/golden-gate-finish'],
  name:'Golden Gate Coast',region:'San Francisco · Ocean, bluffs and bridge',miles:13,
  art:'journeys/goldengate',stamp:'checkpoints/golden-gate-finish',spotlight:'Golden Gate',
  intro:'A 13-mile virtual coastal challenge inspired by San Francisco’s shoreline, from Ocean Beach to the Golden Gate Bridge. The app’s milestone distances are curated for this journey.',
  note:{title:'A bridge opens to the world',text:'The Golden Gate Bridge opened on May 27, 1937. Its southern approach crosses the Presidio, where coastal paths look out over the Pacific and the entrance to San Francisco Bay.',source:'Presidio Trust',url:'https://presidio.gov/explore/attractions/golden-gate-bridge'},
  points:[['Ocean Beach',0,50,150],['Lands End',4,130,70],['Baker Beach',8.5,300,90],['Golden Gate Bridge',13,440,35]],
  terrain:'coast'
 },
 appalachian: {
  checkpointArt:['checkpoints/great-smokies', 'checkpoints/shenandoah', 'checkpoints/white-mountains', 'checkpoints/katahdin'],
  name:'Appalachian Trail',region:'Springer Mountain, Georgia to Katahdin, Maine',miles:2197.9,
  art:'journeys/appalachian',stamp:'checkpoints/katahdin',spotlight:'Appalachian Trail',
  intro:'Travel the mountain spine of the eastern United States across 14 states. This virtual journey uses the trail’s 2026 length, with rounded checkpoint targets along the way.',
  note:{title:'A trail built by people',text:'Conceived in 1921 and completed in 1937, the Appalachian Trail grew from the work of private citizens. Today it stretches from Georgia to Maine through 14 states.',source:'National Park Service · Appalachian Trail Conservancy',url:'https://www.nps.gov/appa/index.htm'},
  points:[['Springer Mountain',0,50,155],['Great Smoky Mountains',200,130,130],['Shenandoah',900,240,100],['White Mountains',1800,350,60],['Katahdin',2197.9,450,25]],
  terrain:'mountains'
 }
};
// Short alternatives reuse the illustrated landmarks from the full routes.
extraJourneys.stripdrive={...extraJourneys.vegas, mode:'road',name:'Las Vegas Boulevard Drive',
 intro:'Take a virtual evening drive up the Strip. Driving miles carry you from Mandalay Bay past the Bellagio fountains and the Venetian to The STRAT.'};
extraJourneys.bostoncommon={...extraJourneys.freedom,name:'Boston Common to the Old State House',miles:0.8,
 region:'Downtown Boston',intro:'Start on the Common and walk the opening stretch of the virtual Freedom Trail to the Old State House.',
 points:extraJourneys.freedom.points.slice(0,2),checkpointArt:extraJourneys.freedom.checkpointArt.slice(0,1),stamp:extraJourneys.freedom.checkpointArt[0]};
// Collectible sections use the same virtual mileposts as their parent journey.
const walkingSections=[
 ['northendwalk','freedom',1,3,'North End to Charlestown','Walk from the Old State House past Old North Church to the Bunker Hill Monument.'],
 ['landsendwalk','goldengate',1,3,'Lands End to the Golden Gate','Trace the San Francisco coast past Baker Beach to the bridge.'],
 ['parkreturn','centralpark',2,4,'Central Park West Side','Round the north end of the park and follow West Drive back to the southern end.'],
 ['whitemountainswalk','appalachian',3,4,'White Mountains to Katahdin','Leave the White Mountains for the final northern stretch of the virtual Appalachian Trail.']
];
for(const [id,parent,start,end,name,intro] of walkingSections){
 const base=extraJourneys[parent],segment=base.points.slice(start,end+1);
 const points=segment.map(([place,mile,x,y])=>[place,Number((mile-segment[0][1]).toFixed(2)),x,y]);
 const checkpointArt=base.checkpointArt.slice(start,end);
 extraJourneys[id]={...base,name,intro,region:segment[0][0]+' to '+segment.at(-1)[0],
  points,checkpointArt,mapOffset:start,miles:points.at(-1)[1],stamp:checkpointArt.at(-1)};
}
const roadCities=[
 ['Chicago',0,'ChicagoStamp'],['St. Louis',300,'StLouisStamp'],['Tulsa',700,'TulsaStamp'],
 ['Oklahoma City',940,'OklahomaStamp'],['Amarillo',1200,'AmarilloStamp'],
 ['Albuquerque',1490,'AlbuquerqueStamp'],['Flagstaff',1810,'FlagstaffStamp'],['Santa Monica',2448,'checkpoints/santa-monica']
];
for(const [id,first,last] of [['prairieroad',0,2],['oklahomaroad',2,3],['panhandleroad',3,5],['pacificroad',5,7]]){
 const section=roadCities.slice(first,last+1),from=section[0][0],to=section.at(-1)[0];
 extraJourneys[id]={name:from+' to '+to,region:'Historic Route 66',mode:'road',miles:section.at(-1)[1]-section[0][1],
  intro:'Collect this stretch of Route 66 with your driving miles. These virtual mileposts follow the Earth Odometer edition of the Mother Road.',
  note:{title:'Your road book',text:section.map(c=>c[0]).join(' → '),source:'Earth Odometer · curated virtual mileage'},
  art:section[0][2],stamp:section.at(-1)[2],checkpointArt:section.slice(1).map(c=>c[2]),
  points:section.map(([city,mile])=>[city,mile-section[0][1]]),roadBook:true};
}
extraJourneys.stonyman = {
  "name": "Stony Man Summit Walk",
  "region": "Shenandoah National Park",
  "mode": "foot",
  "collection": "National Parks",
  "miles": 1.6,
  "art": "checkpoints/shenandoah",
  "stamp": "checkpoints/shenandoah",
  "intro": "Follow the Appalachian Trail and the blue-blazed summit path on a virtual round trip. The overlook is the halfway checkpoint in this edition.",
  "note": {
    "title": "A face in the ridge",
    "text": "From the north, the outline of Stony Man resembles a reclining face. From the summit, the view looks west across the Shenandoah Valley.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/places/000/stony-man.htm"
  },
  "points": [
    [
      "Stony Man trailhead",
      0
    ],
    [
      "Summit overlook",
      0.8
    ],
    [
      "Return to the trailhead",
      1.6
    ]
  ],
  "checkpointArt": [
    "checkpoints/shenandoah",
    "checkpoints/shenandoah"
  ],
  "roadBook": true
};
extraJourneys.cadescove = {
  "name": "Cades Cove Loop Road",
  "region": "Great Smoky Mountains National Park",
  "mode": "road",
  "collection": "National Parks",
  "miles": 11,
  "art": "checkpoints/great-smokies",
  "stamp": "checkpoints/great-smokies",
  "intro": "Circle the valley on an 11-mile virtual drive. Cable Mill marks the halfway point in this edition.",
  "note": {
    "title": "A mill in the valley",
    "text": "Historic buildings along the loop preserve traces of community life. At Cable Mill, a gristmill shows how moving water could do the heavy work of grinding grain.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/grsm/planyourvisit/cadescove.htm"
  },
  "points": [
    [
      "Loop entrance",
      0
    ],
    [
      "Cable Mill",
      5.5
    ],
    [
      "Cades Cove loop finish",
      11
    ]
  ],
  "checkpointArt": [
    "checkpoints/great-smokies",
    "checkpoints/great-smokies"
  ],
  "roadBook": true
};
extraJourneys.skylinedrive = {
  "name": "Skyline Drive",
  "region": "Shenandoah National Park",
  "mode": "road",
  "collection": "National Parks",
  "miles": 105.5,
  "art": "checkpoints/shenandoah",
  "stamp": "checkpoints/shenandoah",
  "intro": "Follow the Blue Ridge from the park’s northern entrance to its southern end. Earn stamps at the gaps along the way.",
  "note": {
    "title": "A road along the crest",
    "text": "Skyline Drive runs the length of Shenandoah National Park. Its mileposts count south from Front Royal, giving the entire drive a common reference point.",
    "source": "National Park Service",
    "url": "https://irma.nps.gov/DataStore/Reference/Profile/2188767"
  },
  "points": [
    [
      "Front Royal",
      0
    ],
    [
      "Thornton Gap",
      31.5
    ],
    [
      "Swift Run Gap",
      65.5
    ],
    [
      "Rockfish Gap",
      105.5
    ]
  ],
  "checkpointArt": [
    "checkpoints/shenandoah",
    "checkpoints/shenandoah",
    "checkpoints/shenandoah"
  ],
  "roadBook": true
};
extraJourneys.lanternwalk = {
  "name": "The Lanterns of Old North",
  "region": "Boston, Massachusetts",
  "mode": "foot",
  "collection": "History",
  "miles": 0.4,
  "art": "checkpoints/old-north-church",
  "stamp": "checkpoints/old-north-church",
  "intro": "A short virtual walk through the North End follows the people behind the lantern signal. Mileposts are curated for this journey.",
  "note": {
    "title": "The people behind the signal",
    "text": "Robert Newman and John Pulling Jr. are associated with the lantern signal of April 18, 1775. Both were buried on Copp’s Hill.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/places/copp-s-hill-burying-ground.htm"
  },
  "points": [
    [
      "Paul Revere Mall",
      0
    ],
    [
      "Old North Church",
      0.15
    ],
    [
      "Copp’s Hill Burying Ground",
      0.4
    ]
  ],
  "checkpointArt": [
    "checkpoints/old-north-church",
    "checkpoints/old-north-church"
  ],
  "roadBook": true
};
extraJourneys.teapartywalk = {
  "name": "Boston Tea Party Meeting Walk",
  "region": "Boston, Massachusetts",
  "mode": "foot",
  "collection": "History",
  "miles": 0.25,
  "art": "journeys/freedom",
  "stamp": "journeys/freedom",
  "intro": "Follow a short virtual downtown walk from the seat of colonial government to the meeting place at the center of the tea protest. The quarter mile is a curated target.",
  "note": {
    "title": "A meeting too large for a town hall",
    "text": "On December 16, 1773, a large gathering at Old South Meeting House preceded the destruction of tea in Boston Harbor.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/bost/learn/historyculture/osmh.htm"
  },
  "points": [
    [
      "Old State House",
      0
    ],
    [
      "Old South Meeting House",
      0.25
    ]
  ],
  "checkpointArt": [
    "journeys/freedom"
  ],
  "roadBook": true
};

extraJourneys.artistsdrive = {
  "name": "Artists Drive",
  "region": "Death Valley National Park",
  "mode": "road",
  "collection": "National Parks",
  "miles": 9,
  "art": "scenes/artistsdrive",
  "stamp": "scenes/artistsdrive",
  "intro": "Follow this 9-mile virtual drive from Badwater Road to Artists Drive loop finish. Checkpoint distances are milestones for this virtual journey.",
  "note": {
    "title": "Volcanic colors",
    "text": "The colors at Artists Palette come from minerals in volcanic deposits. Iron compounds and chlorite help paint bands of red, yellow and green across the otherwise pale hills.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/places/artists-palette.htm"
  },
  "points": [
    [
      "Badwater Road",
      0
    ],
    [
      "Artists Palette",
      5
    ],
    [
      "Artists Drive loop finish",
      9
    ]
  ],
  "checkpointArt": [
    "scenes/artistsdrive",
    "scenes/artistsdrive"
  ],
  "roadBook": true
};
extraJourneys.redrockdrive = {
  "name": "Red Rock Canyon Scenic Drive",
  "region": "Red Rock Canyon, Nevada",
  "mode": "road",
  "collection": "Other journeys",
  "miles": 13,
  "art": "scenes/redrockdrive",
  "stamp": "scenes/redrockdrive",
  "intro": "Follow this 13-mile virtual drive from Scenic Drive entrance to Red Rock scenic loop finish. Checkpoint distances are milestones for this virtual journey.",
  "note": {
    "title": "Calico Hills",
    "text": "Just west of Las Vegas, red and buff sandstone rises above the desert floor. The road brings the tilted bands of the Calico Hills into view early in the loop.",
    "source": "Bureau of Land Management",
    "url": "https://www.blm.gov/nevada/red-rock-canyon-nca/recreation"
  },
  "points": [
    [
      "Scenic Drive entrance",
      0
    ],
    [
      "Calico Hills",
      2
    ],
    [
      "Red Rock scenic loop finish",
      13
    ]
  ],
  "checkpointArt": [
    "scenes/redrockdrive",
    "scenes/redrockdrive"
  ],
  "roadBook": true
};
extraJourneys.brycedrive = {
  "name": "Bryce Canyon Southern Scenic Drive",
  "region": "Bryce Canyon National Park",
  "mode": "road",
  "collection": "National Parks",
  "miles": 15,
  "art": "scenes/brycedrive",
  "stamp": "scenes/brycedrive",
  "intro": "Follow this 15-mile virtual drive from Southern Scenic Drive entrance to Rainbow Point. Checkpoint distances are milestones for this virtual journey.",
  "note": {
    "title": "Above the amphitheater",
    "text": "Beyond the first three miles of the main park road, the route continues south along the plateau. Openings in the forest reveal deeply eroded slopes below the rim.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/brca/planyourvisit/southern-scenic-drive-viewpoints.htm"
  },
  "points": [
    [
      "Southern Scenic Drive entrance",
      0
    ],
    [
      "Natural Bridge overlook",
      9
    ],
    [
      "Rainbow Point",
      15
    ]
  ],
  "checkpointArt": [
    "scenes/brycedrive",
    "scenes/brycedrive"
  ],
  "roadBook": true
};
extraJourneys.archesdrive = {
  "name": "Arches to Devils Garden",
  "region": "Arches National Park",
  "mode": "road",
  "collection": "National Parks",
  "miles": 18,
  "art": "scenes/archesdrive",
  "stamp": "scenes/archesdrive",
  "intro": "Follow this 18-mile virtual drive from Arches visitor center to Devils Garden trailhead. Checkpoint distances are milestones for this virtual journey.",
  "note": {
    "title": "Balanced Rock",
    "text": "Nine miles into the park, Balanced Rock marks a change in scale. From the road, its rounded boulder stands out above the narrower rock that supports it.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/arch/planyourvisit/directions.htm"
  },
  "points": [
    [
      "Arches visitor center",
      0
    ],
    [
      "Balanced Rock",
      9.2
    ],
    [
      "Devils Garden trailhead",
      18
    ]
  ],
  "checkpointArt": [
    "scenes/archesdrive",
    "scenes/archesdrive"
  ],
  "roadBook": true
};
extraJourneys.craterdrive = {
  "name": "Crater Lake Rim Drive",
  "region": "Crater Lake National Park",
  "mode": "road",
  "collection": "National Parks",
  "miles": 33,
  "art": "scenes/craterdrive",
  "stamp": "scenes/craterdrive",
  "intro": "Follow this 33-mile virtual drive from Rim Village to Rim Village loop finish. Checkpoint distances are milestones for this virtual journey.",
  "note": {
    "title": "The caldera rim",
    "text": "Rim Drive circles the lake along a volcanic caldera. Watch the relationship between Wizard Island and the far shore change as the journey moves around the rim.",
    "source": "National Park Service",
    "url": "https://www.nps.gov/crla/planyourvisit/scenic-rim-drive.htm"
  },
  "points": [
    [
      "Rim Village",
      0
    ],
    [
      "East Rim viewpoints",
      17
    ],
    [
      "Rim Village loop finish",
      33
    ]
  ],
  "checkpointArt": [
    "scenes/craterdrive",
    "scenes/craterdrive"
  ],
  "roadBook": true
};

function journeyRouteMap(d,value){
 if(d.roadBook)return '<ol class="route-itinerary">'+d.points.map(([city,mile])=>'<li><span>'+city+'</span><b>'+mile+' mi'+(value>=mile?' ✓':'')+'</b></li>').join('')+'</ol>';
 const maps={vegas:vegasGeoMap,freedom:freedomGeoMap,centralpark:centralParkGeoMap,goldengate:goldenGateGeoMap,appalachian:appalachianGeoMap};
 const key=d.art.split('/').at(-1),map=maps[key];
 const paths=map.legs.slice(d.mapOffset||0,(d.mapOffset||0)+d.points.length-1).map((path,i)=>{
  const start=d.points[i][1],end=d.points[i+1][1];
  const completed=Math.max(0,Math.min(1,(value-start)/(end-start)));
  return `<path d="${path}" fill="none" stroke="#fffaf0" stroke-width="${key==='appalachian'?4.5:7}" stroke-linejoin="round"/><path d="${path}" fill="none" stroke="#829c95" stroke-width="${key==='appalachian'?2.5:3.3}" stroke-dasharray="6 4" stroke-linejoin="round"/>${completed>0?`<path d="${path}" fill="none" stroke="#145e59" stroke-width="${key==='appalachian'?3:4.5}" pathLength="1" stroke-dasharray="${completed} 1" stroke-linecap="round" stroke-linejoin="round"/>`:''}`;
 }).join('');
 const dots=d.points.map(([name,mile],i)=>{
  const [x,y]=map.points[i+(d.mapOffset||0)],reached=value>=mile;
  const [dx,dy,anchor]=map.labelOffsets?.[i+(d.mapOffset||0)]||[10,-10,'start'];
  const label=name==='Great Smoky Mountains'?'Great Smokies':name==='Golden Gate Bridge'?'Golden Gate':name;
  return `<circle cx="${x}" cy="${y}" r="6" fill="${reached?'#185654':'#fbf6e9'}" stroke="#185654" stroke-width="2"/>${reached&&mile>0?`<path d="m${x-3} ${y} 2 2 4-5" fill="none" stroke="white" stroke-width="1.6"/>`:''}<text x="${x+dx}" y="${y+dy}" text-anchor="${anchor}" font-size="12" font-weight="600" fill="#234e4b" stroke="#fffaf0" stroke-width="3" paint-order="stroke">${label}</text>`;
 }).join('');
 return `<div class="journey-route-map"><svg viewBox="${map.viewBox}" role="img" aria-label="${d.name} geographic overview, ${value>=d.miles?'completed':value>0?'in progress':'not started'}" style="border-radius:14px">${map.background}${paths}${dots}${key==='freedom'?'':`<g transform="translate(20 25)" fill="#365d58"><path d="M0 12 4 0 8 12 4 9Z"/><text x="4" y="-5" text-anchor="middle" font-size="9">N</text></g>`}</svg><small>${map.credit} · Virtual progress</small></div>`;
}
function journeyFieldNote(d){
 return `<aside class="field-note"><small>FIELD NOTE</small><strong>${d.note.title}</strong><p>${d.note.text}</p><cite>${d.note.source}</cite></aside>`;
}
