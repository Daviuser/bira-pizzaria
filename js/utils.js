/**
 * Utilitários: eventos simples, formatação de moeda, escape de HTML e imagem de reserva.
 */
(function(B){
'use strict';
B.$=s=>document.querySelector(s);
const L=[];B.on=f=>L.push(f);B.emit=()=>L.forEach(f=>f());
B.money=c=>(c/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}).replace(/\u00a0/g,' ');
B.parseMoney=s=>{const n=parseFloat(String(s).replace(/[^\d,.]/g,'').replace(',','.'));return isNaN(n)?0:Math.round(n*100)};
B.esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
B.fallback=(i)=>{const h=[12,22,30,8,40][i%5];return 'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#1a1412"/><circle cx="100" cy="100" r="78" fill="#c98a3a"/><circle cx="100" cy="100" r="66" fill="hsl(${h},85%,52%)"/><g fill="#d62828"><circle cx="75" cy="80" r="11"/><circle cx="122" cy="72" r="11"/><circle cx="108" cy="124" r="11"/><circle cx="68" cy="122" r="9"/></g></svg>`)};
})(window.Bira);

/** Usuário pediu menos movimento? */
window.Bira.reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
