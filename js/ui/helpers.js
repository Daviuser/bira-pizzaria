/**
 * Helpers de renderização: imagem do produto e descrição de um item do carrinho.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
const img=(p,i)=>`<img class="${p.fit==='contain'?'contain':''}" src="${p.image}" alt="${E(B.itemName(p))}" loading="lazy" onerror="this.onerror=null;this.src=Bira.fallback(${i})">`;
const info=i=>{const p=B.product(i.productId),f=B.flavorNames(i);return f.length>1?`<b>${i.qty}x Pizza ${B.SIZES[i.size].label} (${i.size})</b><ul class="fl">${f.map(n=>`<li>${E(n)}</li>`).join('')}</ul>`:`<b>${i.qty}x ${E(B.itemName(p))}</b>${B.sizeLabel(p,i.size)?`<small>${E(B.sizeLabel(p,i.size))}</small>`:''}`};

  /** Indicador de progresso do pedido (1 carrinho, 2 dados, 3 revisão, 4 WhatsApp). */
const steps = (n) => `<div class="steps" aria-label="Etapa ${n} de 4">${['Carrinho', 'Dados', 'Revisão', 'WhatsApp'].map((l, k) => `<div class="st ${k + 1 < n ? 'done' : k + 1 === n ? 'cur' : ''}"><i></i><span>${l}</span></div>`).join('')}</div>`;

  Object.assign(B.ui, { img, info, steps });
})(window.Bira);
