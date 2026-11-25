// Keep the lettering inside the oval even when a checkpoint has a long name.
let impressionNumber = 0;
function passportImprint(city, artwork, legend = 'VIRTUAL JOURNEY') {
 const id = 'imprint-' + (++impressionNumber);
 const ink = '#185654';
 const escape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const measure = document.createElement('canvas').getContext('2d');
 measure.font = 'bold 15px Georgia, serif';
 const title = city.toUpperCase().trim();
 const wide = measure.measureText(title).width > 150;
 let lines = [title];
 if(measure.measureText(title).width > 200){
  const words = title.split(/\s+/);
  let score = Infinity;
  for(let i=1;i<words.length;i++){
   const pair = [words.slice(0,i).join(' '),words.slice(i).join(' ')];
   const width = Math.max(measure.measureText(pair[0]).width / 200, measure.measureText(pair[1]).width / 200);
   if(width<score){score=width;lines=pair;}
  }
 }
 const labels=lines.map((line,i)=>{
  const y=lines.length===1?143:132+i*20;
  const width=Math.min(measure.measureText(line).width,wide ? 200 : 150);
  return `<text x="120" y="${y}" font-family="Georgia,serif" font-weight="bold" font-size="15" textLength="${width}" lengthAdjust="spacingAndGlyphs">${escape(line)}</text>`;
 }).join('');
 const aperture = wide ? '<ellipse cx="120" cy="82" rx="77" ry="33"/>' : '<rect x="45" y="51" width="150" height="64" rx="12"/>';
 const frame = wide
  ? '<rect x="7" y="8" width="226" height="180" rx="15" stroke-width="3"/><rect x="13" y="14" width="214" height="168" rx="11" stroke-width="1.3" stroke-dasharray="2 3"/>'
  : '<ellipse cx="120" cy="98" rx="113" ry="90" stroke-width="3.2"/><ellipse cx="120" cy="98" rx="108" ry="85" stroke-width="1.4"/><ellipse cx="120" cy="98" rx="103" ry="80" stroke-dasharray="1 4" stroke-width="1.3"/>';
 return `<svg viewBox="0 0 240 196" role="img" aria-label="${escape(city)} illustrated passport stamp" style="display:block;width:100%;transform:rotate(-4deg)" xmlns="http://www.w3.org/2000/svg">
 <defs><clipPath id="${id}-window">${aperture}</clipPath></defs>
 <g fill="none" stroke="${ink}">${frame}</g>
 <g fill="${ink}" text-anchor="middle"><text x="120" y="43" font-family="Georgia,serif" font-weight="bold" font-size="11" textLength="102" lengthAdjust="spacingAndGlyphs">EARTH ODOMETER</text></g>
 <image href="${escape(artwork)}" x="43" y="49" width="154" height="66" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}-window)"/>
 <g fill="none" stroke="${ink}" stroke-width="1.4">${aperture}</g>
 <g fill="${ink}" text-anchor="middle">${labels}<text x="120" y="${wide?171:165}" font-family="sans-serif" font-size="8" letter-spacing="0.6">${escape(legend)}</text></g></svg>`;
}
