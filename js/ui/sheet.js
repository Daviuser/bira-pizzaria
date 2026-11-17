/**
 * Painel (bottom sheet) usado por modal, carrinho e checkout; aviso (toast).
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
const sheet=$('#sheet'),body=$('#sheetBody');
function open(html){body.innerHTML=html;body.scrollTop=0;sheet.classList.add('open');sheet.setAttribute('aria-hidden','false');document.body.classList.add('lock');body.classList.remove('step');void body.offsetWidth;body.classList.add('step')}
function close(){sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1800)}

  Object.assign(B.ui, { open, close, toast });
})(window.Bira);
