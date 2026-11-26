// Credits apply to the bundled, resized destination photographs.
const journeyScenes = {
  "redrockdrive": {
    "caption": "Calico Hills from the scenic loop",
    "author": "Frank Schulenburg",
    "source": "https://commons.wikimedia.org/wiki/File:View_of_Calico_Hills_at_Red_Rock_Canyon_National_Conservation_Area_from_Scenic_Loop_Drive.jpg",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0",
    "location": [
      -115.44,
      36.15
    ]
  },
  "artistsdrive": {
    "caption": "Artists Palette, Death Valley",
    "author": "Christian David",
    "source": "https://commons.wikimedia.org/wiki/File:Artist%27s_Palette,_Death_Valley_National_Park,_California.jpg",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0",
    "location": [
      -116.8,
      36.35
    ]
  },
  "brycedrive": {
    "caption": "Rainbow Point, Bryce Canyon",
    "author": "Ken Lund from Reno, Nevada, USA",
    "source": "https://commons.wikimedia.org/wiki/File:Rainbow_Point,_Bryce_Canyon_National_Park,_Utah_(133957087).jpg",
    "license": "CC BY-SA 2.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/2.0",
    "location": [
      -112.25,
      37.47
    ]
  },
  "archesdrive": {
    "caption": "Devils Garden, Arches National Park",
    "author": "Ken Lund from Reno, Nevada, USA",
    "source": "https://commons.wikimedia.org/wiki/File:Devils_Garden_Trail_Between_Landscape_Arch_and_Double_O_Arch,_Arches_National_Park,_Moab,_Utah_(9099666421).jpg",
    "license": "CC BY-SA 2.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/2.0",
    "location": [
      -109.59,
      38.78
    ]
  },
  "craterdrive": {
    "caption": "Wizard Island and the Watchman, Crater Lake",
    "author": "inkknife_2000 (7.5 million views +)",
    "source": "https://commons.wikimedia.org/wiki/File:Crater_Lake_NP,_OR,_Wizard_Island_and_The_Watchman_8-28-13_(9859756835).jpg",
    "license": "CC BY-SA 2.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/2.0",
    "location": [
      -122.14,
      42.91
    ]
  },
  "boston": {
    "caption": "Copley Square, Boston",
    "author": "Ingfbruno",
    "source": "https://commons.wikimedia.org/wiki/File:USA-Boston-Copley_Square0.JPG",
    "license": "CC BY-SA 3.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/3.0/",
    "location": [
      -71.08,
      42.35
    ]
  },
  "bostoncommon": {
    "caption": "The Old State House, Boston",
    "author": "Robert Linsdell from St. Andrews, Canada",
    "source": "https://commons.wikimedia.org/wiki/File:Old_State_House%2C_Washington_St%2C_Boston_%28493457%29_%2810773321993%29.jpg",
    "license": "CC BY 2.0",
    "licenseURL": "https://creativecommons.org/licenses/by/2.0/",
    "location": [
      -71.06,
      42.36
    ]
  },
  "freedom": {
    "caption": "Bunker Hill Monument, Charlestown",
    "author": "User:Chensiyuan",
    "source": "https://commons.wikimedia.org/wiki/File:Bunker_hill_2009.JPG",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "location": [
      -71.06,
      42.38
    ]
  },
  "lanternwalk": {
    "caption": "Old North Church, Boston",
    "author": "Seasider53",
    "source": "https://commons.wikimedia.org/wiki/File:Old_North_Church%2C_Boston_%282025%29.jpg",
    "license": "CC BY 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by/4.0/",
    "location": [
      -71.05,
      42.37
    ]
  },
  "teapartywalk": {
    "caption": "Old South Meeting House, Boston",
    "author": "Crisco 1492",
    "source": "https://commons.wikimedia.org/wiki/File:Old_South_Meeting_House%2C_Boston%2C_MA%2C_2023-02-21_01.jpg",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "location": [
      -71.06,
      42.36
    ]
  },
  "vegas": {
    "caption": "The Las Vegas Strip",
    "author": "Mariordo (Mario Roberto Durán Ortiz)",
    "source": "https://commons.wikimedia.org/wiki/File:Las_Vegas_Strip_09_2017_4897.jpg",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "location": [
      -115.17,
      36.11
    ]
  },
  "centralpark": {
    "caption": "Bow Bridge, Central Park",
    "author": "Bryan Schorn",
    "source": "https://commons.wikimedia.org/wiki/File:Bow_Bridge_in_Central_Park_on_Thanksgiving_2010.jpg",
    "license": "CC BY-SA 3.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/3.0/",
    "location": [
      -73.97,
      40.77
    ]
  },
  "goldengate": {
    "caption": "The Golden Gate Bridge from Battery East",
    "author": "Frank Schulenburg",
    "source": "https://commons.wikimedia.org/wiki/File:Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "location": [
      -122.48,
      37.81
    ]
  },
  "appalachian": {
    "caption": "Mount Katahdin, Maine",
    "author": "Rubyk at English Wikipedia",
    "source": "https://commons.wikimedia.org/wiki/File:Katahdin.jpg",
    "license": "Public domain",
    "licenseURL": "https://creativecommons.org/publicdomain/mark/1.0/",
    "location": [
      -68.92,
      45.9
    ]
  },
  "route66": {
    "caption": "Santa Monica Pier at dusk",
    "author": "web4camguy",
    "source": "https://commons.wikimedia.org/wiki/File:Santa_monica_pier_entrance_evening.jpg",
    "license": "CC BY-SA 2.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/2.0/",
    "location": [
      -118.5,
      34.01
    ]
  },
  "prairieroad": {
    "caption": "The Golden Driller, Tulsa",
    "author": "Timdayf5",
    "source": "https://commons.wikimedia.org/wiki/File:Golden_Driller.jpg",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "location": [
      -95.99,
      36.15
    ]
  },
  "oklahomaroad": {
    "caption": "The Oklahoma State Capitol",
    "author": "Oklahoma Legislative Services Bureau",
    "source": "https://commons.wikimedia.org/wiki/File:North_fa%C3%A7ade_of_the_Oklahoma_State_Capitol.jpg",
    "license": "CC0",
    "licenseURL": "https://creativecommons.org/publicdomain/zero/1.0/",
    "location": [
      -97.5,
      35.49
    ]
  },
  "panhandleroad": {
    "caption": "Cadillac Ranch, Amarillo",
    "author": "Richie Diesterheft from Chicago, IL, USA",
    "source": "https://commons.wikimedia.org/wiki/File:Cadillac_Ranch.jpg",
    "license": "CC BY 2.0",
    "licenseURL": "https://creativecommons.org/licenses/by/2.0/",
    "location": [
      -106.65,
      35.08
    ]
  },
  "stonyman": {
    "caption": "Stony Man from Hawksbill",
    "author": "Fredlyfish4",
    "source": "https://commons.wikimedia.org/wiki/File:Stony_Man_Mountain_from_Hawksbill_-_panoramio.jpg",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "location": [
      -78.37,
      38.6
    ]
  },
  "cadescove": {
    "caption": "Cades Cove, Great Smoky Mountains",
    "author": "Billy Hathorn",
    "source": "https://commons.wikimedia.org/wiki/File:Another_view_of_the_Cades_Cove_area_IMG_5004.JPG",
    "license": "CC BY 3.0",
    "licenseURL": "https://creativecommons.org/licenses/by/3.0/",
    "location": [
      -83.84,
      35.6
    ]
  },
  "skylinedrive": {
    "caption": "Sunset from Skyline Drive",
    "author": "TripOfALifestyle.com",
    "source": "https://commons.wikimedia.org/wiki/File:Sunset_View_from_Skyline_Drive_in_Shenandoah_National_Park.jpg",
    "license": "CC BY 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by/4.0/",
    "location": [
      -78.86,
      38.03
    ]
  }
};
const sharedJourneyScenes = {
  "northendwalk": "freedom",
  "parkreturn": "centralpark",
  "landsendwalk": "goldengate",
  "pacificroad": "route66",
  "stripdrive": "vegas",
  "whitemountainswalk": "appalachian"
};

function sceneFor(key){ return journeyScenes[sharedJourneyScenes[key] || key]; }
const closingIllustrations = {
  vegas: 'checkpoints/vegas-strat',
  freedom: 'checkpoints/bunker-hill',
  centralpark: 'checkpoints/central-park-finish',
  goldengate: 'checkpoints/golden-gate-finish',
  appalachian: 'checkpoints/katahdin',
  stripdrive: 'checkpoints/vegas-venetian',
  bostoncommon: 'atlas/chapter',
  northendwalk: 'checkpoints/old-north-church',
  landsendwalk: 'checkpoints/baker-beach',
  parkreturn: 'checkpoints/west-drive',
  whitemountainswalk: 'checkpoints/white-mountains',
  prairieroad: 'TulsaStamp',
  oklahomaroad: 'OklahomaStamp',
  panhandleroad: 'AlbuquerqueStamp',
  pacificroad: 'checkpoints/santa-monica',
  stonyman: 'journeys/closing/stonyman',
  cadescove: 'journeys/closing/cadescove',
  skylinedrive: 'journeys/closing/skylinedrive',
  lanternwalk: 'journeys/freedom',
  teapartywalk: 'atlas/harbor',
  artistsdrive: 'journeys/closing/artistsdrive',
  redrockdrive: 'journeys/redrock-overlook',
  brycedrive: 'journeys/closing/brycedrive',
  archesdrive: 'journeys/closing/archesdrive',
  craterdrive: 'journeys/closing/craterdrive',
  boston: 'atlas/chapter',
  route66: 'FlagstaffStamp',
  europe: 'journeys/closing/europe',
  world: 'journeys/closing/world',
};

function destinationIllustration(key){
 const route=destinations[key];
 if(!route)return '';
 const art=closingIllustrations[key];
 return '<figure class="destination-photo">'+placeArt(art,route.name+' illustration')+'<figcaption><strong>'+route.name+'</strong></figcaption></figure>';
}
