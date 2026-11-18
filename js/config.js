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

  // Horário de funcionamento: terça a domingo, das 19h às 00h (segunda-feira fechado).
  // days: 0 = domingo, 1 = segunda, ... 6 = sábado. close '24:00' = meia-noite.
  B.HOURS = { days: [2, 3, 4, 5, 6, 0], open: '19:00', close: '24:00', tz: 'America/Bahia' };

  B.MAX_FLAVORS = 3; // máximo de sabores por pizza
})(window.Bira);
