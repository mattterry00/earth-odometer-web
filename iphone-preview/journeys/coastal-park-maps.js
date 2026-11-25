// Original illustrated overviews informed by the official park maps.
// These are geographic orientation graphics, not navigation instructions.
const centralParkGeoMap = {
 viewBox:'0 0 500 360',
 background:`<defs><pattern id="park-blocks" width="35" height="25" patternUnits="userSpaceOnUse" patternTransform="rotate(18)"><rect width="35" height="25" fill="#e7e1d2"/><rect x="3" y="3" width="28" height="18" rx="1" fill="#d6d3c5"/><path d="M0 0H35M0 0V25" stroke="#fffaf0" stroke-width="4"/></pattern></defs>
 <rect width="500" height="360" fill="url(#park-blocks)"/>
 <path d="M221 20 395 77 288 337 114 280Z" fill="#d7dfbf" stroke="#fffaf0" stroke-width="9"/>
 <path d="M233 35 377 84 278 318 133 273Z" fill="none" stroke="#e7ead3" stroke-width="8"/>
 <path d="M232 132Q267 113 291 138L286 173Q258 188 234 166Z" fill="#acd1d6" stroke="#faf4df" stroke-width="3"/>
 <path d="M193 226Q201 205 223 214T246 239Q220 252 206 240Z" fill="#acd1d6"/>
 <path d="M235 62Q264 58 262 83T231 97Z" fill="#acd1d6"/>
 <path d="M170 267Q194 258 218 273M205 200Q232 188 277 205M248 105Q285 98 323 123" fill="none" stroke="#f7f3e3" stroke-width="4"/>
 <text x="254" y="151" text-anchor="middle" fill="#518087" font-size="10">Reservoir</text>
 <text x="371" y="212" fill="#7e8173" font-size="11" transform="rotate(-68 371 212)">FIFTH AVENUE</text>
 <text x="133" y="175" fill="#7e8173" font-size="11" transform="rotate(-68 133 175)">CENTRAL PARK WEST</text>`,
 points:[[194,292],[296,217],[327,87],[194,184],[194,292]],
 legs:[
 'M194 292C213 299 239 307 260 293C275 277 272 253 284 238L296 217',
 'M296 217C306 197 301 178 318 158C337 139 347 118 341 105L327 87',
 'M327 87C305 76 291 63 276 66C259 70 264 93 246 110C227 129 216 130 213 151L194 184',
 'M194 184C184 204 173 219 166 245C161 266 175 284 194 292'
 ],
 labelOffsets:[[0,24,'middle'],[14,3,'start'],[0,-18,'middle'],[-14,0,'end'],[0,40,'middle']],
 credit:'Illustrated park overview · Central Park Conservancy',
 sourceUrl:'https://www.centralparknyc.org/activities/guides/Running'
};
const goldenGateGeoMap = {
 viewBox:'0 0 500 380',
 background:`<rect width="500" height="380" fill="#b6d6d9"/>
 <path d="M500 35L396 35 387 57 363 77 351 112 317 140 295 165 263 173 239 190 208 198 194 223 164 231 148 248 145 380H500Z" fill="#eae5d5" stroke="#fff9e9" stroke-width="4"/>
 <path d="M500 49 404 49 382 92 361 123 322 156 313 206 371 237 447 210 500 210Z" fill="#cfddbd"/>
 <path d="M196 233 236 208 276 187 296 208 278 230 231 249 187 267Z" fill="#d5dfbe"/>
 <path d="M178 286 500 286 500 333 176 333Z" fill="#cbd9b7"/>
 <path d="M220 380V256L280 220 329 229 397 177 451 185 500 160M257 380V269L340 266 380 234 500 230M177 344H500" fill="none" stroke="#fffaf0" stroke-width="5"/>
 <path d="M393 59 399 0" stroke="#eee5d3" stroke-width="13"/><path d="M393 59 399 0" stroke="#bc785b" stroke-width="5"/>
 <text x="62" y="200" fill="#598790" font-family="Georgia,serif" font-style="italic" font-size="17" transform="rotate(-65 62 200)">Pacific Ocean</text>
 <text x="396" y="142" fill="#718466" font-size="13">PRESIDIO</text>
 <text x="335" y="314" fill="#718466" font-size="11">GOLDEN GATE PARK</text>`,
 points:[[161,350],[218,210],[319,155],[393,59]],
 legs:['M161 350L164 307 163 270Q164 251 180 244L190 225 205 226 218 210',
 'M218 210L235 202 245 210 257 196 278 193 289 180 302 177 307 164 319 155',
 'M319 155L331 150 338 135 350 132 358 118 365 109 370 91 383 81 393 59'],
 labelOffsets:[[15,5,'start'],[-14,-14,'end'],[-16,-10,'end'],[-12,-18,'end']],
 credit:'Illustrated coastal overview · Presidio Trust',
 sourceUrl:'https://presidio.gov/explore/attractions/california-coastal-trail'
};
