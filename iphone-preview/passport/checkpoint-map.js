// Illustrated city insets. These local routes are schematic, like the Boston preview.
const cityInsets = {
 Chicago: {
  water:'M318 -8 C309 16 301 29 306 45 L296 55 304 65 Q291 79 293 101 L280 151 H370 V-8Z',
  river:'M-12 26 Q40 22 81 44 T171 48 Q207 46 232 34 T310 37',
  park:'M275 62 294 58 279 143 249 147Z', angle:-9,
  road:'M256 78 Q235 81 214 84 T175 90 Q153 90 144 101 L112 107', point:[256,78],label:'Lake Michigan',labelPos:[309,111]
 },
 'St. Louis':{
  water:'M269 -8 Q221 29 238 63 T213 151 H241 Q274 102 260 62 T298 -8Z',
  park:'M203 49 Q220 48 230 65 L224 94 192 100 184 72Z',angle:-19,
  road:'M330 21 Q306 31 279 43 T235 55 Q212 59 207 77 T189 98 L163 109',point:[207,77],label:'Mississippi River',labelPos:[281,121]
 },
 Tulsa:{
  water:'M25 -8 Q39 28 76 52 T126 96 Q149 128 178 151 H208 Q173 117 156 87 T94 35 Q65 18 54 -8Z',
  park:'M83 61 Q116 79 150 123 L137 139 110 112 72 70Z',angle:26,
  road:'M320 69 Q287 72 265 63 T216 57 Q191 60 182 76 T161 92 Q141 94 129 105 L103 121',point:[182,76],label:'Arkansas River',labelPos:[67,119]
 },
 'Oklahoma City':{
  water:'M-8 112 Q34 86 76 102 T151 104 Q176 96 203 107 T279 96 Q313 78 368 96 V117 Q320 97 284 116 T203 125 Q178 115 149 122 T71 122 Q34 108 -8 135Z',
  park:'M151 95 178 81 209 91 228 103 205 108 174 99Z',angle:4,
  road:'M337 14 Q308 21 296 36 T254 47 Q225 47 210 60 T181 73 Q143 74 122 84 L89 82',point:[181,73],label:'Oklahoma River',labelPos:[260,137]
 }
};
function checkpointMap(stop){
 const m=cityInsets[stop.city], [x,y]=m.point;
 const id='city-inset';
 const partial=m.road.slice(0,m.road.indexOf(x+' '+y)+(x+' '+y).length);
 const route=stop.end===0?'':`<path d="${partial}" fill="none" stroke="#09666a" stroke-width="5" stroke-linecap="round"/>`;
 return `<div class="map-postcard"><svg viewBox="0 0 360 145" role="img" aria-label="Illustrated virtual route at ${stop.city}">
 <defs><pattern id="${id}-blocks" width="42" height="31" patternUnits="userSpaceOnUse" patternTransform="rotate(${m.angle})"><rect width="42" height="31" fill="#eee9d8"/><rect x="2" y="3" width="13" height="10" rx="1" fill="#dedbc8"/><rect x="19" y="3" width="19" height="19" fill="#e5ddca"/><path d="M0 0V31 M0 0H42 M17 0V31 M0 16H17" stroke="#fffaf0" fill="none" stroke-width="3"/></pattern>
 <filter id="${id}-shadow" x="-60%" y="-60%" width="220%" height="240%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-opacity=".35"/></filter></defs>
 <rect width="360" height="145" fill="url(#${id}-blocks)"/><path d="M-15 99 Q74 72 93 23 T173 -9 M0 124 Q97 78 169 88 T375 25" fill="none" stroke="#fffaf0" stroke-width="5"/>
 <path d="${m.park}" fill="#c8d8a8"/><path d="${m.water}" fill="#add9de" stroke="#d5e9e5" stroke-width="2"/>
 ${m.river?`<path d="${m.river}" fill="none" stroke="#add9de" stroke-width="9"/>`:''}
 <text x="${m.labelPos[0]}" y="${m.labelPos[1]}" fill="#517e83" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="9">${m.label}</text>
 <path d="${m.road}" fill="none" stroke="#fff9e6" stroke-width="8"/><path d="${m.road}" fill="none" stroke="#6c9b98" stroke-width="4" stroke-dasharray="6 5" stroke-linecap="round"/>${route}
 <g filter="url(#${id}-shadow)"><circle cx="${x}" cy="${y}" r="10" fill="#fffdf3"/><circle cx="${x}" cy="${y}" r="6" fill="#086467"/></g>
 <text x="${x-1}" y="${y-16}" text-anchor="middle" fill="#194b4b" stroke="#fffaea" stroke-width="3" paint-order="stroke" font-size="12" font-family="Georgia,serif" font-weight="bold">${stop.city}</text></svg></div>`;
}
