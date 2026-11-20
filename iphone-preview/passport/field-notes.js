// Short, offline field notes for the journey and its passport pages.
const fieldNotes = {
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
  text:'Just 15 runners lined up for the first Boston Marathon on April 19, 1897. Their course measured 24.5 miles, shorter than today’s 26.2.',
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
