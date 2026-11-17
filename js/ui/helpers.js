/**
 * Helpers de renderização: imagem do produto e descrição de um item do carrinho.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
const img=(p,i)=>`<img src="${p.image}" alt="${E(B.itemName(p))}" loading="lazy" onerror="this.onerror=null;this.src=Bira.fallback(${i})">`;
const info=i=>{const p=B.product(i.productId),f=B.flavorNames(i);return f.length>1?`<b>${i.qty}x Pizza ${B.SIZES[i.size].label} (${i.size})</b><ul class="fl">${f.map(n=>`<li>${E(n)}</li>`).join('')}</ul>`:`<b>${i.qty}x ${E(B.itemName(p))}</b><small>${E(B.sizeLabel(p,i.size))}</small>`};

  Object.assign(B.ui, { img, info });
})(window.Bira);
