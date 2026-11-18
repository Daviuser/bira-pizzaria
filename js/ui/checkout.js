/**
 * Etapas finais: dados do cliente, revisão e tela do WhatsApp.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { open, info, steps } = B.ui;
function checkout(){
open(`<button class="x" data-close aria-label="Fechar">×</button>${steps(2)}<button class="lnk back" data-go="cart">← Carrinho</button><h2>Seus dados</h2>
<label class="f">Nome completo<input data-f="name" value="${E(S.order.name)}" autocomplete="name"></label>
<h4>Tipo de pedido</h4><div class="opts two">${[['entrega','Entrega (+ R$ 4,00)'],['retirada','Retirada no local']].map(([v,t])=>`<label class="opt"><input type="radio" name="type" data-f="type" value="${v}" ${S.order.type===v?'checked':''}><span><b>${t}</b></span></label>`).join('')}</div>
<div id="addr" ${S.order.type==='entrega'?'':'hidden'}><label class="f">Rua<input data-f="rua" value="${E(S.order.rua)}"></label><div class="row"><label class="f">Número<input data-f="num" value="${E(S.order.num)}" inputmode="numeric"></label><label class="f">Bairro<input data-f="bairro" value="${E(S.order.bairro)}"></label></div><label class="f">Complemento (opcional)<input data-f="comp" value="${E(S.order.comp)}"></label><label class="f">Ponto de referência (opcional)<input data-f="ref" value="${E(S.order.ref)}"></label></div>
<h4>Forma de pagamento</h4><div class="opts three">${B.INFO.payments.map(v=>`<label class="opt"><input type="radio" name="pay" data-f="pay" value="${v}" ${S.order.pay===v?'checked':''}><span><b>${v}</b></span></label>`).join('')}</div>
<div id="troco" ${S.order.pay==='Dinheiro'?'':'hidden'}><h4>Precisa de troco?</h4><div class="opts two">${[['sim','Sim'],['nao','Não']].map(([v,t])=>`<label class="opt"><input type="radio" name="tr" data-f="troco" value="${v}" ${S.order.troco===v?'checked':''}><span><b>${t}</b></span></label>`).join('')}</div><label class="f" id="tp" ${S.order.troco==='sim'?'':'hidden'}>Troco para quanto?<input data-f="trocoPara" value="${E(S.order.trocoPara)}" inputmode="decimal" placeholder="Ex.: 100"></label></div>
<div class="tot"><div><span>Subtotal</span><b>${M(B.cart.subtotal())}</b></div><div><span>Taxa de entrega</span><b id="fee">${M(B.fee(S.order))}</b></div><div class="g"><span>Total</span><b id="tt" class="bump">${M(B.total(S.order))}</b></div></div><p class="err" id="err" role="alert"></p><button class="btn" data-go="review">REVISAR PEDIDO</button>`)}
function review(){const e=B.validate(S.order);if(e){const x=$('#err');if(!x)return checkout();x.textContent=e;x.classList.remove('shake');void x.offsetWidth;x.classList.add('shake');return}
open(`<button class="x" data-close aria-label="Fechar">×</button>${steps(3)}<h2>Revise seu pedido</h2><div class="rv">${B.cart.items.map(i=>{const p=B.product(i.productId);return `<div class="li"><div>${info(i)}${i.note?`<small class="nt">Obs: ${E(i.note)}</small>`:''}</div><b>${M(B.cart.unit(i)*i.qty)}</b></div>`}).join('')}
<p><b>Cliente:</b> ${E(S.order.name)}</p><p><b>Tipo:</b> ${S.order.type==='entrega'?'Entrega':'Retirada no local'}</p>${S.order.type==='entrega'?`<p><b>Endereço:</b> ${E(S.order.rua)}, nº ${E(S.order.num)} — ${E(S.order.bairro)}${S.order.comp?' ('+E(S.order.comp)+')':''}${S.order.ref?'<br><b>Referência:</b> '+E(S.order.ref):''}</p>`:''}<p><b>Pagamento:</b> ${E(S.order.pay)}${S.order.pay==='Dinheiro'?(S.order.troco==='sim'?' · troco para '+M(B.parseMoney(S.order.trocoPara)):' · sem troco'):''}</p></div>
<div class="tot"><div><span>Subtotal</span><b>${M(B.cart.subtotal())}</b></div><div><span>Taxa de entrega</span><b>${M(B.fee(S.order))}</b></div><div class="g"><span>Total</span><b class="bump">${M(B.total(S.order))}</b></div></div><button class="btn" data-go="final">CONTINUAR PARA S.order WHATSAPP</button><button class="btn ghost" data-go="checkout">VOLTAR E EDITAR PEDIDO</button>`)}
function final(){if(B.validate(S.order))return checkout();
open(`<button class="x" data-close aria-label="Fechar">×</button>${steps(4)}<div class="fin"><div class="pizza">🍕</div><h2>SEU PEDIDO ESTÁ QUASE PRONTO!</h2><p>Para realizar o pagamento, entre em contato com nossa equipe pelo WhatsApp. Nossa equipe irá orientar você sobre o pagamento e confirmar seu pedido.</p><p class="tk">A Bira Pizzaria agradece pela preferência!</p><div class="tot"><div class="g"><span>Total</span><b>${M(B.total(S.order))}</b></div></div><a class="btn wa" href="${B.waUrl(S.order)}" target="_blank" rel="noopener">REALIZAR PAGAMENTO COM NOSSA EQUIPE NO WHATSAPP</a><small class="mut">Seu pedido só é confirmado pela equipe no WhatsApp. S.order carrinho continua salvo.</small><button class="lnk" data-go="review">← Voltar</button><button class="lnk" data-clear>Iniciar novo pedido (limpar carrinho)</button></div>`)}

  Object.assign(B.ui, { checkout, review, final });
})(window.Bira);
