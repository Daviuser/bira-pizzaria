/**
 * Estado compartilhado da interface (categoria ativa, produto no modal, dados do cliente).
 */
(function (B) {
  'use strict';

  B.ui = {
    state: {
      cat: 'pizzas', // categoria exibida no cardápio
      cur: null, // produto aberto no modal { p, size, qty, fl, last }
      order: { name: '', type: 'entrega', rua: '', num: '', bairro: '', comp: '', ref: '', pay: '', troco: 'nao', trocoPara: '' },
    },
  };
})(window.Bira);
