/**
 * Renderização do cardápio e animação de entrada dos cards.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { img } = B.ui;
function menu(){
const list=B.PRODUCTS.filter(p=>p.category===S.cat);
$('#grid').innerHTML=list.map((p,i)=>{const ks=Object.keys(p.prices);
return `<article class="card" data-open="${p.id}" tabindex="0" style="--d:${i%6*50}ms"><div class="ph">${img(p,i)}</div><div class="cb"><h3>${E(p.name)}</h3><p>${E(p.ingredients)}</p><div class="pr">${ks.map(k=>`<span><small>${p.sizeLabels?p.sizeLabels[k]:k}</small>${M(p.prices[k])}</span>`).join('')}</div><button class="btn sm" tabindex="-1">ADICIONAR</button></div></article>`}).join('');
document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c.dataset.cat===S.cat));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.card').forEach(c=>io.observe(c))}

  Object.assign(B.ui, { menu });
})(window.Bira);
