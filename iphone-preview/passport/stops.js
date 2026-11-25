const stops=[
 {city:'Boston',state:'Massachusetts',mile:26.2,image:'atlas/stamp',completed:true},
 {city:'Chicago',state:'Illinois',mile:0,image:'ChicagoStamp',end:0},
 {city:'St. Louis',state:'Missouri',mile:300,image:'StLouisStamp',end:4},
 {city:'Tulsa',state:'Oklahoma',mile:700,image:'TulsaStamp',end:8},
 {city:'Oklahoma City',state:'Oklahoma',mile:940,image:'OklahomaStamp',end:10,mapPoint:[550,336],approach:'M715 216 700 252 650 282 620 330 550 336'},
 {city:'Amarillo',state:'Texas',mile:1200,image:'AmarilloStamp',end:11,mapPoint:[440,336],approach:'M550 336 440 336'},
 {city:'Albuquerque',state:'New Mexico',mile:1490,image:'AlbuquerqueStamp',end:12,mapPoint:[360,372],approach:'M440 336 360 372'},
 {city:'Flagstaff',state:'Arizona',mile:1810,image:'FlagstaffStamp',end:13,mapPoint:[260,351],approach:'M360 372 260 351'},
 {city:'Santa Monica',state:'California',mile:2448,image:'checkpoints/santa-monica',finish:true,mapPoint:[130,396],approach:'M260 351 230 348 130 396'}
];

for(const [key,journey] of Object.entries(extraJourneys)){
 journey.points.slice(1).forEach(([city,mile],index)=>{
  stops.push({city,state:journey.region,mile,image:journey.checkpointArt[index],journey:key,end:index+1,finish:mile===journey.miles});
 });
}

function stampEarned(stop, progress) {
 const key=stop.completed?'boston':stop.journey||'route66';
 return Object.hasOwn(progress,key) && progress[key]>=stop.mile;
}
