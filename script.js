const langToggle=document.getElementById('langToggle');
let language='en';
langToggle.addEventListener('click',()=>{
  language=language==='en'?'ku':'en';
  document.documentElement.lang=language;
  document.body.classList.toggle('rtl',language==='ku');
  document.querySelectorAll('[data-en]').forEach(el=>{el.innerHTML=el.dataset[language];});
  langToggle.textContent=language==='en'?'کوردی':'English';
});
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('mainNav');
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
function updateClock(){const now=new Date();document.getElementById('worldClock').textContent=now.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit'})+' · YOUR LOCAL TIME';}
updateClock();setInterval(updateClock,1000);
document.getElementById('countryForm').addEventListener('submit',async e=>{
  e.preventDefault();const name=document.getElementById('countryInput').value.trim();const out=document.getElementById('countryResult');
  if(!name){out.textContent='Please enter a country name.';return;}
  out.textContent='Looking up country…';
  try{const res=await fetch('https://restcountries.com/v3.1/name/'+encodeURIComponent(name)+'?fields=name,capital,region,population,flags');if(!res.ok)throw new Error('not found');const data=await res.json();const c=data[0];out.textContent=`${c.flag||c.flags?.emoji||''} ${c.name.common} · Capital: ${(c.capital||['N/A'])[0]} · Region: ${c.region} · Population: ${(c.population||0).toLocaleString()}`;}
  catch{out.textContent='Country not found. Try another name in English.';}
});
document.getElementById('webSearch').addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('webInput').value.trim();if(q)window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener');});
