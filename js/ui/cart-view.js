/**
 * Tela do carrinho.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { open, info } = B.ui;
function cart(){const it=B.cart.items;
open(`<button class="x" data-close aria-label="Fechar">×</button><h2>Seu carrinho</h2>`+(it.length?`<div class="list">${it.map(i=>{const p=B.product(i.productId);return `<div class="li"><div>${info(i)}<small>${M(B.cart.unit(i))} un.</small>${i.note?`<small class="nt">Obs: ${E(i.note)}</small>`:''}</div><div class="rt"><b>${M(B.cart.unit(i)*i.qty)}</b><div class="qty s"><button data-cq="${E(i.key)}" data-d="-1" aria-label="Diminuir">−</button><span>${i.qty}</span><button data-cq="${E(i.key)}" data-d="1" aria-label="Aumentar">+</button><button class="rm" data-rm="${E(i.key)}" aria-label="Remover">🗑</button></div></div></div>`}).join('')}</div>
<div class="tot"><div><span>Subtotal</span><b>${M(B.cart.subtotal())}</b></div><div><span>Taxa de entrega</span><b>R$ 4,00 se entrega</b></div></div><button class="btn" data-go="checkout">FINALIZAR PEDIDO</button><button class="lnk" data-clear>Limpar carrinho</button>`:`<p class="empty">Seu carrinho está vazio.<br>Escolha uma pizza no cardápio!</p><button class="btn" data-close>VER CARDÁPIO</button>`))}

  Object.assign(B.ui, { cart });
})(window.Bira);
