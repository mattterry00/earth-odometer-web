// Place notes are ordered along each virtual journey.
const journeyGuides = {
  "artistsdrive": [
    [
      "Volcanic colors",
      "The colors at Artists Palette come from minerals in volcanic deposits. Iron compounds and chlorite help paint bands of red, yellow and green across the otherwise pale hills."
    ],
    [
      "Inside the Black Mountains",
      "The one-way road winds between eroded slopes before returning to Badwater Road. Water has carved deep folds into these desert hills, revealing differently colored layers around each bend."
    ]
  ],
  "redrockdrive": [
    [
      "Calico Hills",
      "Just west of Las Vegas, red and buff sandstone rises above the desert floor. The road brings the tilted bands of the Calico Hills into view early in the loop."
    ],
    [
      "The canyon loop",
      "The scenic road makes a one-way sweep around the conservation area. As the road curves, the foreground shifts from low desert vegetation to sandstone and tall limestone cliffs."
    ]
  ],
  "brycedrive": [
    [
      "Above the amphitheater",
      "Beyond the first three miles of the main park road, the route continues south along the plateau. Openings in the forest reveal deeply eroded slopes below the rim."
    ],
    [
      "The southern rim",
      "Rainbow Point and nearby Yovimpa Point share the high southern end of the park road. They look out in different directions from the same forested plateau."
    ]
  ],
  "archesdrive": [
    [
      "Balanced Rock",
      "Nine miles into the park, Balanced Rock marks a change in scale. From the road, its rounded boulder stands out above the narrower rock that supports it."
    ],
    [
      "Devils Garden",
      "The road reaches its endpoint at the Devils Garden trailhead. Landscape Arch lies farther along a foot trail, one of the stone spans sheltered among the sandstone fins."
    ]
  ],
  "craterdrive": [
    [
      "The caldera rim",
      "Rim Drive circles the lake along a volcanic caldera. Watch the relationship between Wizard Island and the far shore change as the journey moves around the rim."
    ],
    [
      "A road of overlooks",
      "Thirty overlooks give the loop its rhythm. The road slips into forest and meadow between lake views, following the contours so it recedes into the landscape from across the water."
    ]
  ],
  stonyman: [
  [
    "Two trails to the summit",
    "The hike starts near Skyline Drive at milepost 41.7. Its first stretch shares the Appalachian Trail before blue blazes mark the turn toward Stony Man’s rocky viewpoint."
  ],
  [
    "Reading the valley",
    "At the overlook, the wooded ridge drops away to the Shenandoah Valley. Massanutten Mountain rises across the valley floor. Turn back toward the woods to complete the second half of the loop."
  ]
],
  cadescove: [
  [
    "Entering the cove",
    "In the Smokies, a cove can mean an open valley enclosed by mountains. The one-way loop traces the edges of that open ground, passing fields, woods and former homes."
  ],
  [
    "Cable Mill",
    "About halfway around the loop, the mill and the Becky Cable house give two views of working life in the valley. Imagine the sound of the grinding stones beside the quieter rooms of a family home."
  ]
],
  skylinedrive: [
  [
    "Front Royal to Thornton Gap",
    "Starting at Front Royal, follow the ridge south to Thornton Gap. Gaps are low places where roads can cross a mountain ridge. Here the crossroad meets a drive that follows the ridge lengthwise."
  ],
  [
    "Swift Run to Rockfish Gap",
    "Swift Run Gap marks the start of the southern district. From there the drive winds another forty miles along the Blue Ridge before your final stamp at Rockfish Gap."
  ]
],
  lanternwalk: [
  [
    "Old North Church",
    "The signal needed someone on the other side of the river to see it. Two lanterns appeared high in the church tower on April 18, 1775, carrying a message to watchers in Charlestown."
  ],
  [
    "Copp’s Hill",
    "The burying ground dates to 1660. Among the North End residents buried here are a church caretaker and a merchant whose names are tied to those lanterns, Robert Newman and John Pulling Jr."
  ]
],
  teapartywalk: [
  [
    "The Old State House",
    "Begin at the building where colonial officials governed Massachusetts. Walking from this seat of authority to the meeting house places two different kinds of political power within a few city blocks."
  ],
  [
    "Old South Meeting House",
    "Bostonians gathered here to debate what should happen to the tea waiting in the harbor. On December 16, 1773, the meeting ended and the protest moved to the waterfront."
  ]
],

  bostoncommon: [
    ['On Boston Common', 'Before downtown grew around it, this open ground served as pasture and a place for military training. The red line of the Freedom Trail now leads from the Common into narrow streets where buildings crowd close to the sidewalk.'],
    ['The Old State House balcony', 'At the end of this short route, look above the street. Bostonians heard the Declaration of Independence read from the Old State House balcony in 1776. A single elevated doorway turned a government building into a public stage.']
  ],
  northendwalk: [
    ['Old North’s signal', 'On April 18, 1775, Robert Newman and John Pulling climbed the bell tower and briefly hung two lanterns. For watchers in Charlestown, the signal answered a precise question: British troops were crossing the Charles River on their way west.'],
    ['The hill behind the name', 'Across the river, the granite obelisk gives the skyline a second unmistakable landmark. Although the battle is remembered as Bunker Hill, much of the fighting took place on neighboring Breed’s Hill. That is where the monument stands.']
  ],
  parkreturn: [
    ['A forest inside the street grid', 'Central Park’s North Woods covers about forty acres. Its winding paths, ravine and rock were composed to evoke the Adirondacks and Catskills. A bend that hides a city street from view is doing exactly what the landscape designers intended.'],
    ['Where the stream begins', 'At the Pool, a boulder grotto conceals a pipe carrying water from the Reservoir. On the way south, the open water and long skyline views offer a clue to how much engineering lies behind the apparently wild northern end of the park.']
  ],
  landsendwalk: [
    ['An ocean-fed bathhouse', 'The concrete walls beside the surf at Lands End once supported Sutro Baths. Under a vast glass roof, swimmers could move among seven pools of different temperatures. The Pacific did some of the plumbing: at high tide, seawater could fill the pools.'],
    ['Baker Beach to the bridge', 'As the coast turns toward Baker Beach, the bridge comes into view from the ocean side. Golden Gate is the name of the narrow passage between the Pacific and San Francisco Bay. The strait gave the bridge its name long before its towers became the more familiar landmark.']
  ],
  whitemountainswalk: [
    ['A mile measured in boulders', 'After the exposed ridges of New Hampshire, the trail enters western Maine. In Mahoosuc Notch, fallen boulders force hikers to scramble over blocks and squeeze through gaps. A single mile here can take much longer than a map suggests.'],
    ['Katahdin', 'Beyond Maine’s lake and forest country, the route reaches Katahdin in Baxter State Park. It is the northern end of the Appalachian Trail. For the Penobscot people the mountain is sacred, a relationship far older than the footpath or the summit sign.']
  ],
  prairieroad: [
    ['A highway through Illinois', 'Leaving Chicago, Route 66 connected farming towns with drivers bound for the Mississippi. Filling stations, diners and motor courts gave those towns a second main street. Their signs were meant to be read through a windshield, often with only seconds to catch a traveler’s eye.'],
    ['A bend over the Mississippi', 'Near St. Louis, the old Chain of Rocks Bridge makes a conspicuous turn partway across the river. From above, its steel spans look almost like two bridges meeting at an angle. West of the crossing, the journey trades Illinois prairie for the rolling country on the way to Tulsa.']
  ],
  oklahomaroad: [
    ['Tulsa above street level', 'Tulsa’s oil-era skyline makes a good place to look up. Art Deco towers use stepped outlines and geometric ornament that read clearly from a distance. Leaving downtown, the architecture changes scale from office towers to the low buildings built to serve passing motorists.'],
    ['Arcadia’s round barn', 'Approaching Oklahoma City, a red barn in Arcadia breaks the rhythm of rectangular roadside buildings. Its curved walls and domed roof made a working farm building a Route 66 landmark. Local volunteers helped preserve it long after highway traffic moved on.']
  ],
  panhandleroad: [
    ['A tower in Shamrock', 'West of Oklahoma City, the road crosses into the Texas Panhandle. At Shamrock, the 1936 Tower Station and U-Drop Inn paired fuel and food under one roof. The tall Art Deco tower advertised both from farther away than a sign in a café window could.'],
    ['Central Avenue after dark', 'After Amarillo, the journey continues to Albuquerque. Central Avenue carried Route 66 through the city, bringing motorists past motels and restaurants. Their neon signs served a practical purpose after sunset: a driver could spot a bed or a meal before the building itself came into view.']
  ],
  pacificroad: [
    ['The road across the Painted Desert', 'In Arizona’s Petrified Forest National Park, a roadside pullout marks the old Route 66 alignment. Look for the line of weathered telephone poles: they help trace the road across ground where the pavement is hard to distinguish.'],
    ['Pines before the Pacific', 'Flagstaff interrupts a drive often pictured as all desert. Ponderosa pines and high country give way to dry basins farther west. At Santa Monica, the Pacific turns a westward journey into something you can see from the pier: open water beyond the last city blocks.']
  ],
  freedom: [
    ['Boston Common', 'The trail begins on an open sweep of grass. The Common once served as a pasture and a military training ground. From here the red line slips into a much denser Boston, where a burial ground or an old meeting house can occupy the same block as a modern office tower.'],
    ['Old State House and Old North Church', 'Look for the balcony on the Old State House, where the Declaration of Independence was read to Bostonians in 1776. Farther north, the signal came from much higher up. Two lanterns hung in the Old North Church steeple in April 1775 to warn that British troops were crossing the water.'],
    ['Charlestown', 'Across the river, the streets climb toward a granite obelisk. The Bunker Hill Monument stands on Breed’s Hill, where much of the fighting actually took place. It makes an unusual finish to a trail named for events that were still far from settled.']
  ],
  vegas: [
    ['Mandalay Bay to the fountains', 'Start beneath the gold towers at the south end of the Strip. The Luxor pyramid gives way to the turrets of Excalibur and then the skyline of New York-New York. At Bellagio the buildings suddenly step back from the boulevard, leaving a broad lake between the sidewalk and the hotel.'],
    ['The Venetian', 'The next stretch trades open water for canals. A bell tower and the arches of a Venetian palace frame the resort entrance. Compare the scale of the bridges here with the fountains you just passed. Both use water to draw people off the sidewalk, in entirely different ways.'],
    ['North to The STRAT', 'Beyond the central resorts, the tower becomes an easy landmark to follow. Its narrow shaft looks almost detached from the observation pod overhead. Reaching its base completes the virtual route that began at Mandalay Bay.']
  ],
  centralpark: [
    ['South end and East Drive', 'At the southern edge, Manhattan’s towers rise almost directly out of the trees. As the loop turns north, the long open lawn of Sheep Meadow gives way to rolling terrain. Farther up the east side, the Reservoir opens a stretch of sky rarely visible at street level.'],
    ['The north end', 'The park changes character around the Harlem Meer and North Woods. Water, rock outcrops and thick trees replace the broad lawns of the south. Harlem Hill gives this part of the drives a climb that is easy to miss on a flat map.'],
    ['West Drive and the return', 'Heading south puts the reservoir on the other side of the loop. The skyline gradually fills the view again. The finish is the same south end you started from, after a circuit of two remarkably different halves of one park.']
  ],
  goldengate: [
    ['Ocean Beach', 'The opening scene is a long, straight Pacific horizon. Ocean Beach faces the open sea. Near its northern end, the coastline changes from a broad strip of sand to rock and headlands around the old Sutro Baths site.'],
    ['Lands End', 'The headland bends the route away from the open coast and toward the mouth of the bay. Cypress trees frame glimpses of the water. The bridge appears across the inlet in pieces between the trees before you get a clear view of its full span.'],
    ['Baker Beach and the bridge', 'At Baker Beach the southern tower rises beyond the rocks at the end of the sand. The final stretch brings you up into the Presidio and close to the bridge approach. The same tower that fit inside a distant postcard view now fills it.']
  ],
  appalachian: [
    ['Springer Mountain and the Smokies', 'The northbound story starts on a wooded Georgia summit. By the Smokies, the trail follows the high country along the Tennessee–North Carolina line. On the highest ridges the forest changes to dark spruce and fir, a different world from the hardwood slopes below.'],
    ['Shenandoah', 'In Virginia the footpath shares the long Blue Ridge with Skyline Drive. A road overlook and a quiet patch of forest can lie surprisingly close together. Gaps in the trees reveal layer after layer of parallel ridges.'],
    ['White Mountains to Katahdin', 'New Hampshire takes the trail above the trees onto exposed rock. Maine brings it back through forest and lake country before the climb on Katahdin. The northern finish is on the mountain itself, high above the woods that define so much of the journey.']
  ],
  boston: [
    ['Hopkinton to Wellesley', 'The real race begins west of Boston on Main Street in Hopkinton. The early miles descend through Ashland and continue through Framingham and Natick. At Wellesley College, spectators form the cheering section runners call the Scream Tunnel.'],
    ['The Newton hills', 'By Newton, nearly two thirds of the distance is behind you and the course starts asking a different question. A series of climbs breaks up Commonwealth Avenue. Heartbreak Hill comes late in the series, when a modest rise can feel anything but modest.'],
    ['Brookline to Boylston Street', 'Beacon Street leads through Brookline toward Kenmore Square. The finish has two turns worth remembering, right onto Hereford and left onto Boylston. The last straightaway takes runners toward the Boston Public Library in Copley Square.']
  ],
  route66: [
    ['Chicago and St. Louis', 'Picture the trip beginning among the tall buildings of Chicago. Southwest through Illinois, the old highway tied small towns to a much larger stream of travelers. A café, a filling station and a few motel rooms could make a family business out of one patch of roadside. St. Louis marks the Mississippi River crossing.'],
    ['Tulsa and Oklahoma City', 'Tulsa brings the road into a city shaped by oil, with Art Deco towers downtown. Across Oklahoma, stretches of older pavement, motor courts and signs still tell the story at car-window height. By Oklahoma City you have crossed much of the country your first roadside map would have unfolded to show.'],
    ['Amarillo and Albuquerque', 'The Texas Panhandle opens the view around Amarillo until even a single roadside sign stands out. In Albuquerque, Central Avenue carries the Route 66 story through the city. Old motel signs take on a second life after sunset, when their neon is easier to pick out.'],
    ['Flagstaff to Santa Monica', 'Flagstaff interrupts the desert picture with ponderosa pines and mountain air. Farther west, the Mojave stretches the gaps between towns before the road reaches metropolitan Los Angeles. Your virtual finish is at Santa Monica, where there is finally more ocean than highway ahead.']
  ]
};

function guideChapters(key) {
  return key==='stripdrive'?journeyGuides.vegas:journeyGuides[key];
 }
function journeyGuide(key) {
  const chapters=guideChapters(key);
  if (!chapters) return '';
  return '<section class="journey-guide"><h3>Along the way</h3>' +
    chapters.map(([place, story]) => '<h4>' + place + '</h4><p>' + story + '</p>').join('') + '</section>';
}
