/**
 * Tela do carrinho: itens agrupados por categoria, quantidades e totais.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { open, info, steps } = B.ui;
  const GROUPS = [['pizzas', 'Pizzas'], ['brotinho', 'Brotinho'], ['bebidas', 'Bebidas']];
  const TRASH = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>';

  function row(i) {
    const p = B.product(i.productId), k = E(i.key);
    return `<div class="li"><img class="th" src="${p.image}" alt="" loading="lazy"><div class="lc">${info(i)}<small>${M(B.cart.unit(i))} un.</small>${i.note ? `<small class="nt">Obs: ${E(i.note)}</small>` : ''}</div>
<div class="rt"><b>${M(B.cart.unit(i) * i.qty)}</b><div class="qty s"><button data-cq="${k}" data-d="-1" aria-label="Diminuir">−</button><span>${i.qty}</span><button data-cq="${k}" data-d="1" aria-label="Aumentar">+</button><button class="rm" data-rm="${k}" aria-label="Remover item">${TRASH}</button></div></div></div>`;
  }

  /** keep=true atualiza sem reiniciar a animação do painel (usado ao mudar quantidades). */
  function cart(keep) {
    const items = B.cart.items;
    const head = `<button class="x" data-close aria-label="Fechar">×</button>${steps(1)}<h2>Seu carrinho</h2>`;
    if (!items.length) {
      return open(`${head}<p class="empty">Seu carrinho está vazio.<br>Escolha uma pizza no cardápio!</p><button class="btn" data-close>VER CARDÁPIO</button>`, keep);
    }
    const list = GROUPS.map(([cat, label]) => {
      const rows = items.filter((i) => B.product(i.productId).category === cat);
      return rows.length ? `<h5 class="grp">${label}</h5>${rows.map(row).join('')}` : '';
    }).join('');
    open(`${head}<div class="list">${list}</div>
<div class="tot"><div><span>Subtotal</span><b>${M(B.cart.subtotal())}</b></div><div><span>Taxa de entrega</span><b>R$ 4,00 se entrega</b></div></div>
<button class="btn" data-go="checkout">FINALIZAR PEDIDO</button><button class="lnk" data-clear>Limpar carrinho</button>`, keep);
  }

  Object.assign(B.ui, { cart });
})(window.Bira);
