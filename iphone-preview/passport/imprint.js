// Catalogue art is retained inside the same ink impression on cards and leaves.
let impressionNumber = 0;
function passportImprint(city, artwork, legend = 'VIRTUAL JOURNEY') {
 const id = 'imprint-' + (++impressionNumber);
 const ink = '#185654';
 return `<svg viewBox="0 0 240 196" role="img" aria-label="${city} illustrated passport stamp" style="display:block;width:100%;transform:rotate(-4deg)" xmlns="http://www.w3.org/2000/svg">
 <defs><clipPath id="${id}-window"><rect x="35" y="55" width="170" height="78" rx="16"/></clipPath>
 <path id="${id}-arc" d="M 33 80 A 89 57 0 0 1 207 80"/></defs>
 <g fill="none" stroke="${ink}"><ellipse cx="120" cy="98" rx="113" ry="90" stroke-width="3.2"/><ellipse cx="120" cy="98" rx="108" ry="85" stroke-width="1.4"/>
 <ellipse cx="120" cy="98" rx="103" ry="80" stroke-dasharray="1 4" stroke-width="1.3"/></g>
 <text fill="${ink}" font-family="Georgia,serif" font-weight="bold" font-size="13" letter-spacing="2.1"><textPath href="#${id}-arc" startOffset="50%" text-anchor="middle">EARTH ODOMETER</textPath></text>
 <image href="${artwork}" x="35" y="55" width="170" height="78" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}-window)"/>
 <rect x="35" y="55" width="170" height="78" rx="16" fill="none" stroke="${ink}" stroke-width="1.4"/>
 <g fill="${ink}" text-anchor="middle"><text x="120" y="151" font-family="Georgia,serif" font-size="${city.length>10?16:20}" font-weight="bold" letter-spacing="1.6">${city.toUpperCase()}</text>
 <text x="120" y="166" font-family="sans-serif" font-size="8.5" letter-spacing="1.4">✦　${legend}　✦</text></g></svg>`;
}
