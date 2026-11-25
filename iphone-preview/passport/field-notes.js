// Short, offline field notes for the journey and its passport pages.
const fieldNotes = {
 'Baker Beach': {
  title:'The battery behind the beach',
  text:'At the north end of the parking lot, the beach gives way to Battery Chamberlin. In 1904 this part of the coast was a military lookout with four gun positions. The surviving concrete gives a second meaning to the view across the water: this was the entrance that San Francisco once expected to defend.',
  source:'National Park Service', url:'https://www.nps.gov/places/battery-chamberlin.htm'
 },
 Shenandoah: {
  title:'Two ways along one ridge',
  text:'At mile 69 on Skyline Drive, a painted road stripe and a long-distance footpath share a patch of ground. A driver can arrive with one eye on the mileposts. A northbound through-hiker arrives at the same crossing after walking here from Georgia.',
  source:'Shenandoah National Park', url:'https://www.nps.gov/shen/learn/historyculture/90-years-in-the-south-district.htm'
 },
 'Santa Monica': {
  title:'A road with a pier for a finish line',
  text:'Stand on the pier and look back toward town. After a route built around gas stations, tire shops and places to sleep, the last view on this virtual journey belongs to someone on foot. Turn around again and the highway has given way to the Pacific.',
  source:'Earth Odometer field guide'
 },
 'Bellagio Fountains': {
  title:'A lake played like an instrument',
  text:'Watch one row of jets while the music plays. A ripple can travel from one end of the lake to the other even though each jet stays in place. More than a thousand fountains give the choreographers enough individual voices to turn a quiet passage into a wall of water.',
  source:'Fountains of Bellagio', url:'https://bellagio.mgmresorts.com/en/entertainment/fountains-of-bellagio.html'
 },
 'Paris, France': {
  title:'The antenna that saved the tower',
  text:'When the Eiffel Tower opened for the Paris world’s fair in 1889, it had a 20-year permit. By the time the permit ran out, the tower had found a second job as a radio antenna. Paris kept it.',
  source:'Eiffel Tower official history', url:'https://www.toureiffel.paris/en/news/130-years/why-was-eiffel-tower-kept'
 },
 'Mount Fuji, Japan': {
  title:'One mountain, thirty-six views',
  text:'Pilgrims have climbed Mount Fuji for centuries. In his woodblock series Thirty-six Views of Mount Fuji, Hokusai let people encounter the same peak from dozens of vantage points, even if they never set foot on its slopes.',
  source:'UNESCO World Heritage Centre', url:'https://whc.unesco.org/en/list/1418/'
 },
 Boston: {
  title:'Fifteen at the starting line',
  text:'Just 15 runners lined up for the first Boston Marathon on April 19, 1897. Their course measured 24.5 miles, shorter than today’s 26.2. Hopkinton became the starting town in 1924. Follow the course east on a map and you can see why the finish line needs a town name of its own: the runners spend most of race day making their way into Boston.',
  source:'Boston Athletic Association', url:'https://www.baa.org/about/'
 },
 Chicago: {
  title:'Where the road west began',
  text:'In 1926, the highway linking Chicago and Los Angeles became Route 66. From the shore of Lake Michigan, westbound travelers set out across the farmland of Illinois.',
  source:'National Park Service', url:'https://home.nps.gov/articles/route-66-overview.htm'
 },
 'St. Louis': {
  title:'A turn over the Mississippi',
  text:'From 1936, Route 66 crossed the Mississippi on the Chain of Rocks Bridge. Drivers had to steer through a 30-degree bend halfway across.',
  source:'National Park Service', url:'https://www.nps.gov/places/chain-of-rocks-bridge.htm'
 },
 Tulsa: {
  title:'The man who put Tulsa on the route',
  text:'Tulsa resident Cyrus Avery helped plan the national highway system. He argued for a Chicago-to-Los Angeles road through his hometown, and Route 66 followed that path.',
  source:'National Park Service', url:'https://home.nps.gov/places/11th-street-arkansas-river-bridge.htm'
 },
 Amarillo: {
  title:'A tire shop on Sixth Street',
  text:'Along Amarillo’s Sixth Street, drivers could stop at the Adkinson Baker Tire Company. Its 1939 service station still stands in the historic Route 66 business district.',
  source:'National Park Service', url:'https://www.nps.gov/places/route-66-sixth-street-historic-district.htm'
 },
 Albuquerque: {
  title:'When Route 66 changed direction',
  text:'Early travelers came south through Santa Fe to reach Albuquerque. In 1937 the highway took a shortcut from the east, bringing traffic straight across the city on Central Avenue.',
  source:'National Park Service', url:'https://www.nps.gov/places/new-mexico-road-segments.htm'
 },
 Flagstaff: {
  title:'A main street facing the tracks',
  text:'Look across Route 66 in Flagstaff’s Railroad Addition and the storefronts face the tracks. The railroad shaped this town before motorists arrived on the highway.',
  source:'National Park Service', url:'https://www.nps.gov/places/railroad-addition-historic-district.htm'
 },
 'Oklahoma City': {
  title:'Look for the milk bottle',
  text:'Around 1948, a giant sheet-metal milk bottle went up on the roof of a tiny triangular grocery in Oklahoma City. It was a dairy advertisement you could spot from the road.',
  source:'National Park Service', url:'https://www.nps.gov/places/milk-bottle-grocery.htm'
 }
};
function fieldNote(place){
 const note=fieldNotes[place];
 if(!note)return '';
 return `<aside class="field-note"><small>FIELD NOTE</small><strong>${note.title}</strong><p>${note.text}</p><cite>${note.source}</cite></aside>`;
}
function inkMark(status){
 return status?`<span class="ink-mark"><span aria-hidden="true">✓ </span>${status}</span>`:'';
}
