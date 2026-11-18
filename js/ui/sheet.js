/**
 * Painel (bottom sheet) usado por modal, carrinho e checkout; aviso (toast).
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const sheet = $('#sheet'), body = $('#sheetBody');

  /** Abre o painel. Com keep=true atualiza o conteúdo sem reiniciar a animação de entrada. */
  function open(html, keep) {
    if (keep) {
      body.classList.remove('step');
      body.innerHTML = html;
    } else {
      body.innerHTML = html;
      body.scrollTop = 0;
      body.classList.remove('step');
      void body.offsetWidth;
      body.classList.add('step');
    }
    sheet.classList.add('open');
    sheet.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
  }

  function close() {
    sheet.classList.remove('open');
    sheet.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock');
  }

  function toast(text) {
    const el = $('#toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove('show'), 1800);
  }

  Object.assign(B.ui, { open, close, toast });
})(window.Bira);
