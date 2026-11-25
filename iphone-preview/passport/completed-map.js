function completedBostonMap(assetRoot='assets/'){
 return `<div class="completed-boston-map" role="img" aria-label="Completed virtual Boston Marathon, 26.2 miles. Solid route to the finish flag." style="position:relative;line-height:0;overflow:hidden;border-radius:16px">
 <img src="${assetRoot}atlas/boston-map.jpg" alt="" style="display:block;width:100%;margin:0">
 <svg viewBox="0 0 600 177" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%">
 <path d="M388 77 C412 80 435 96 458 80 C476 65 491 41 524 44" fill="none" stroke="#185654" stroke-width="6" stroke-linecap="round"/>
 <circle cx="388" cy="77" r="13" fill="#185654" stroke="#fffdf3" stroke-width="4"/>
 <path d="m382 77 4 4 8-9" fill="none" stroke="#fffdf3" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
 <circle cx="524" cy="44" r="6" fill="#185654"/>
 </svg></div>`;
}

function completedRoute66Map(assetRoot='assets/'){
 const paths=stops.filter(s=>s.approach).map(s=>'<path d="'+s.approach+'" fill="none" stroke="#00818a" stroke-width="8" stroke-linejoin="round"/>').join('');
 return `<div role="img" aria-label="Completed Route 66 from Chicago to Santa Monica" style="position:relative;line-height:0;overflow:hidden;border-radius:16px"><img src="${assetRoot}RouteMap.jpg" alt="" style="display:block;width:100%"><svg viewBox="0 0 1000 600" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%">${paths}<circle cx="715" cy="216" r="10" fill="#fffdf3" stroke="#00818a" stroke-width="5"/><circle cx="130" cy="396" r="12" fill="#00818a" stroke="#fffdf3" stroke-width="5"/><text x="155" y="435" fill="#185654" font-family="sans-serif" font-size="25" font-weight="bold" stroke="#fffdf3" stroke-width="5" paint-order="stroke">Santa Monica · Finished</text></svg></div>`;
}
