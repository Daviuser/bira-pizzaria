/**
 * Configuração global: namespace, dados da pizzaria e tamanhos.
 * Altere aqui telefone, taxa de entrega (em centavos) e formas de pagamento.
 */
window.Bira = window.Bira || {};

(function (B) {
  'use strict';

  B.INFO = {
    name: 'Bira Pizzaria Delivery',
    phone: '(75) 98296-8263',
    wa: '5575982968263', // formato internacional, usado em wa.me
    fee: 400, // taxa de entrega em centavos
    payments: ['Dinheiro', 'Pix', 'Cartão'],
  };

  B.SIZES = {
    M: { label: 'Média', detail: 'até 6 fatias' },
    G: { label: 'Grande', detail: 'até 8 fatias' },
    F: { label: 'Família', detail: 'até 12 fatias' },
  };

  B.MAX_FLAVORS = 3; // máximo de sabores por pizza
})(window.Bira);
