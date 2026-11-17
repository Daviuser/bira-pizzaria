/**
 * Eventos globais (delegação), contador do carrinho e inicialização.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { open, close, toast, menu, product, flv, mt, cart, checkout, review, final } = B.ui;
const go={cart,checkout,review,final};
const sheet = $('#sheet');
document.addEventListener('click',e=>{const t=e.target.closest('button,a,.card');if(!t)return;
if(t.dataset.close!==undefined)return close();
if(t.dataset.open)return product(t.dataset.open);
if(t.classList.contains('chip')){S.cat=t.dataset.cat;return menu()}
if(t.dataset.go)return go[t.dataset.go]();
if(t.id==='cartBtn'||t.id==='cartBar')return cart();
if(t.dataset.af){if(S.cur.fl.length<B.MAX_FLAVORS&&!S.cur.fl.includes(t.dataset.af)){S.cur.fl.push(t.dataset.af);S.cur.last=t.dataset.af;flv()}return}
if(t.dataset.rf){S.cur.fl=S.cur.fl.filter(x=>x!==t.dataset.rf);S.cur.last=null;flv();return}
if(t.dataset.q){S.cur.qty=Math.min(50,Math.max(1,S.cur.qty+ +t.dataset.q));$('#mq').textContent=S.cur.qty;return mt()}
if(t.id==='addBtn'){B.cart.add(S.cur.fl[0],S.cur.size,S.cur.qty,$('#note').value,S.cur.fl);close();return toast('Adicionado ao carrinho ✓')}
if(t.dataset.cq){B.cart.setQty(t.dataset.cq,+t.dataset.d);return cart()}
if(t.dataset.rm){B.cart.remove(t.dataset.rm);return cart()}
if(t.dataset.clear!==undefined){if(confirm('Limpar todo o carrinho?')){B.cart.clear();close()}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Enter'&&e.target.classList.contains('card'))product(e.target.dataset.open)});
sheet.addEventListener('click',e=>{if(e.target===sheet)close()});
document.addEventListener('change',e=>{const t=e.target;
if(t.name==='sz'){S.cur.size=t.value;mt()}
if(t.dataset.f&&t.type==='radio'){S.order[t.dataset.f]=t.value;$('#addr').hidden=S.order.type!=='entrega';$('#troco').hidden=S.order.pay!=='Dinheiro';$('#tp').hidden=S.order.troco!=='sim';$('#fee').textContent=M(B.fee(S.order));const x=$('#tt');x.textContent=M(B.total(S.order));x.classList.remove('bump');void x.offsetWidth;x.classList.add('bump')}});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.f&&t.type!=='radio')S.order[t.dataset.f]=t.value});
function badge(){const n=B.cart.count(),b=$('#badge'),bar=$('#cartBar');bar.hidden=!n;$('#cbN').textContent=n;$('#cbL').textContent=n>1?'itens':'item';$('#cbT').textContent=M(B.cart.subtotal());b.textContent=n;b.hidden=!n;b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}
B.on(badge);
B.init=()=>{$('#wa1').href=$('#wa2').href=`https://wa.me/${B.INFO.wa}`;menu();badge()};

})(window.Bira);
