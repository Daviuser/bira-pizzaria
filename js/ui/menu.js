/**
 * Renderização do cardápio e animação de entrada dos cards (IntersectionObserver).
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { img } = B.ui;
  let observer;

  function card(p, i) {
    const prices = Object.keys(p.prices).map((k) => {
      const label = p.noSize ? '' : `<small>${p.sizeLabels ? p.sizeLabels[k] : k}</small>`;
      return `<span>${label}${M(p.prices[k])}</span>`;
    }).join('');
    return `<article class="card" data-open="${p.id}" style="--d:${(i % 6) * 60}ms">
<div class="ph">${img(p, i)}${p.isNew ? '<span class="tag-new">Novidade</span>' : ''}</div>
<div class="cb"><h3>${E(p.name)}</h3><p>${E(p.ingredients)}</p><div class="pr">${prices}</div>
<button class="btn sm" data-open="${p.id}" aria-label="Adicionar ${E(p.name)}">+ ADICIONAR</button></div></article>`;
  }

  function menu() {
    $('#grid').innerHTML = B.PRODUCTS.filter((p) => p.category === S.cat).map(card).join('');
    document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.cat === S.cat));
    if (B.ui.moveInd) B.ui.moveInd();
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.card').forEach((c) => observer.observe(c));
  }

  Object.assign(B.ui, { menu });
})(window.Bira);
