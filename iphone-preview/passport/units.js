const preferences={units:new URLSearchParams(location.search).get('units')==='km'?'km':'mi'};
const displayNumber=n=>(preferences.units==='km'?n*1.609344:n).toLocaleString('en-US',{maximumFractionDigits:1});
const distanceText=n=>displayNumber(n)+' '+preferences.units;
function localizeDistances(root){
 if(preferences.units!=='km')return;
 const convert=text=>text.replace(/([\d,]+(?:\.\d+)?)\s*\/\s*([\d,]+(?:\.\d+)?)\s*mi\b/g,(_,a,b)=>displayNumber(Number(a.replaceAll(',','')))+' / '+distanceText(Number(b.replaceAll(',','')))).replace(/([\d,]+(?:\.\d+)?)\s*(?:mi\b|miles\b|mile\b)/g,(_,n)=>distanceText(Number(n.replaceAll(',','')))).replace(/LIFETIME MILES/g,'LIFETIME KILOMETERS');
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){if(!node.parentElement.closest('script,style,select,option,.counter,.rollers'))node.textContent=convert(node.textContent)}
 root.querySelectorAll('[aria-label]').forEach(el=>el.setAttribute('aria-label',convert(el.getAttribute('aria-label'))));
}

new MutationObserver(()=>localizeDistances(document.body)).observe(document.body,{childList:true,subtree:true});localizeDistances(document.body);
