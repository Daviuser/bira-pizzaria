/**
 * Regras de preço, sabores e taxa de entrega.
 */
(function (B) {
  'use strict';

  /*
   * REGRA DE PREÇO (pizza com vários sabores):
   * vale o preço do sabor mais caro no tamanho escolhido.
   * Os preços cadastrados em data/products.js nunca são alterados.
   */
  B.price = (ids, size) => Math.max(...ids.map((id) => B.product(id).prices[size]));

  /** Lista de sabores de um item do carrinho (compatível com itens antigos). */
  B.flavorsOf = (item) => (item.flavors && item.flavors.length ? item.flavors : [item.productId]);
  B.flavorNames = (item) => B.flavorsOf(item).map((id) => B.product(id).name);

  /** Taxa de entrega: só cobrada quando o pedido é para entrega. */
  B.fee = (order) => (order.type === 'entrega' ? B.INFO.fee : 0);
  B.total = (order) => B.cart.subtotal() + B.fee(order);
})(window.Bira);
