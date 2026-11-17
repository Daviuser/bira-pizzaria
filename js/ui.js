(function(B){
const $=s=>document.querySelector(s),E=B.esc,M=B.money;
const O={name:'',type:'entrega',rua:'',num:'',bairro:'',comp:'',ref:'',pay:'',troco:'nao',trocoPara:''};
let cat='pizzas',cur=null;
const img=(p,i)=>`<img src="assets/pizzas/${p.id}.jpg" alt="${E(B.itemName(p))}" loading="lazy" onerror="this.onerror=null;this.src=Bira.fallback(${i})">`;
const info=i=>{const p=B.product(i.productId),f=B.flavorNames(i);return f.length>1?`<b>${i.qty}x Pizza ${B.SIZES[i.size].label} (${i.size})</b><ul class="fl">${f.map(n=>`<li>${E(n)}</li>`).join('')}</ul>`:`<b>${i.qty}x ${E(B.itemName(p))}</b><small>${E(B.sizeLabel(p,i.size))}</small>`};
const sheet=$('#sheet'),body=$('#sheetBody');
function open(html){body.innerHTML=html;body.scrollTop=0;sheet.classList.add('open');sheet.setAttribute('aria-hidden','false');document.body.classList.add('lock');body.classList.remove('step');void body.offsetWidth;body.classList.add('step')}
function close(){sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1800)}
function menu(){
const list=B.PRODUCTS.filter(p=>p.category===cat);
$('#grid').innerHTML=list.map((p,i)=>{const ks=Object.keys(p.prices);
return `<article class="card" data-open="${p.id}" tabindex="0" style="--d:${i%6*50}ms"><div class="ph">${img(p,i)}</div><div class="cb"><h3>${E(p.name)}</h3><p>${E(p.ingredients)}</p><div class="pr">${ks.map(k=>`<span><small>${p.sizeLabels?p.sizeLabels[k]:k}</small>${M(p.prices[k])}</span>`).join('')}</div><button class="btn sm" tabindex="-1">ADICIONAR</button></div></article>`}).join('');
document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c.dataset.cat===cat));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.card').forEach(c=>io.observe(c))}
function product(id){const p=B.product(id),ks=Object.keys(p.prices),pz=p.category==='pizzas';cur={p,size:ks[0],qty:1,fl:[id],last:null};
const i=B.PRODUCTS.indexOf(p);
open(`<button class="x" data-close aria-label="Fechar">×</button><div class="mimg">${img(p,i)}</div><h2 id="mtitle">${E(B.itemName(p))}</h2>${pz?'<div id="flv"></div>':`<p class="mut">${E(p.ingredients)}</p>`}
<h4>Tamanho</h4><div class="opts">${ks.map((k,n)=>`<label class="opt"><input type="radio" name="sz" value="${k}" ${n?'':'checked'}><span><b>${p.sizeLabels?p.sizeLabels[k]:B.SIZES[k].label}</b><small>${p.sizeLabels?'':B.SIZES[k].detail}</small><em data-sz="${k}">${M(p.prices[k])}</em></span></label>`).join('')}</div>
<h4>Quantidade</h4><div class="qty"><button data-q="-1" aria-label="Diminuir">−</button><b id="mq">1</b><button data-q="1" aria-label="Aumentar">+</button></div>
<h4>Observações (opcional)</h4><textarea id="note" rows="2" maxlength="140" placeholder="Ex.: sem cebola, bem assada"></textarea>
<button class="btn" id="addBtn">ADICIONAR AO CARRINHO · <span id="mt" class="bump">${M(p.prices[ks[0]])}</span></button>`);
if(pz)flv()}
function flv(){const n=cur.fl.length,full=n>=B.MAX_FLAVORS,lbl=['','Pizza inteira','Meio a meio','3 sabores'][n];
$('#flv').innerHTML=`<h4>Sabores <span class="cnt${full?' full':''}">${n} de ${B.MAX_FLAVORS} · ${lbl}</span></h4><div class="sel">${cur.fl.map(f=>{const q=B.product(f);return `<div class="fr${f===cur.last?' new':''}"><div><b>${E(q.name)}</b><small>${E(q.ingredients)}</small></div>${n>1?`<button class="rf" data-rf="${f}" aria-label="Remover ${E(q.name)}">×</button>`:''}</div>`}).join('')}</div><p class="mut hint">${full?'Limite de 3 sabores atingido.':'Quer mais sabores? Adicione até '+(B.MAX_FLAVORS-n)+' '+(B.MAX_FLAVORS-n>1?'sabores':'sabor')+':'}${n>1?'<br>Valor: preço do sabor mais caro no tamanho escolhido.':''}</p><div class="chs">${B.pizzas().filter(q=>!cur.fl.includes(q.id)).map(q=>`<button class="ch" data-af="${q.id}" ${full?'disabled':''}>+ ${E(q.name)}</button>`).join('')}</div>`;
$('#mtitle').textContent=n===1?B.itemName(B.product(cur.fl[0])):n===2?'Pizza meio a meio':'Pizza de 3 sabores';
document.querySelectorAll('[data-sz]').forEach(e=>{e.textContent=M(B.price(cur.fl,e.dataset.sz))});mt()}
function mt(){const t=$('#mt');t.textContent=M(B.price(cur.fl,cur.size)*cur.qty);t.classList.remove('bump');void t.offsetWidth;t.classList.add('bump')}
function cart(){const it=B.cart.items;
open(`<button class="x" data-close aria-label="Fechar">×</button><h2>Seu carrinho</h2>`+(it.length?`<div class="list">${it.map(i=>{const p=B.product(i.productId);return `<div class="li"><div>${info(i)}<small>${M(B.cart.unit(i))} un.</small>${i.note?`<small class="nt">Obs: ${E(i.note)}</small>`:''}</div><div class="rt"><b>${M(B.cart.unit(i)*i.qty)}</b><div class="qty s"><button data-cq="${E(i.key)}" data-d="-1" aria-label="Diminuir">−</button><span>${i.qty}</span><button data-cq="${E(i.key)}" data-d="1" aria-label="Aumentar">+</button><button class="rm" data-rm="${E(i.key)}" aria-label="Remover">🗑</button></div></div></div>`}).join('')}</div>
<div class="tot"><div><span>Subtotal</span><b>${M(B.cart.subtotal())}</b></div><div><span>Taxa de entrega</span><b>R$ 4,00 se entrega</b></div></div><button class="btn" data-go="checkout">FINALIZAR PEDIDO</button><button class="lnk" data-clear>Limpar carrinho</button>`:`<p class="empty">Seu carrinho está vazio.<br>Escolha uma pizza no cardápio!</p><button class="btn" data-close>VER CARDÁPIO</button>`))}
function checkout(){
open(`<button class="x" data-close aria-label="Fechar">×</button><button class="lnk back" data-go="cart">← Carrinho</button><h2>Seus dados</h2>
<label class="f">Nome completo<input data-f="name" value="${E(O.name)}" autocomplete="name"></label>
<h4>Tipo de pedido</h4><div class="opts two">${[['entrega','Entrega (+ R$ 4,00)'],['retirada','Retirada no local']].map(([v,t])=>`<label class="opt"><input type="radio" name="type" data-f="type" value="${v}" ${O.type===v?'checked':''}><span><b>${t}</b></span></label>`).join('')}</div>
<div id="addr" ${O.type==='entrega'?'':'hidden'}><label class="f">Rua<input data-f="rua" value="${E(O.rua)}"></label><div class="row"><label class="f">Número<input data-f="num" value="${E(O.num)}" inputmode="numeric"></label><label class="f">Bairro<input data-f="bairro" value="${E(O.bairro)}"></label></div><label class="f">Complemento (opcional)<input data-f="comp" value="${E(O.comp)}"></label><label class="f">Ponto de referência (opcional)<input data-f="ref" value="${E(O.ref)}"></label></div>
<h4>Forma de pagamento</h4><div class="opts three">${B.INFO.payments.map(v=>`<label class="opt"><input type="radio" name="pay" data-f="pay" value="${v}" ${O.pay===v?'checked':''}><span><b>${v}</b></span></label>`).join('')}</div>
<div id="troco" ${O.pay==='Dinheiro'?'':'hidden'}><h4>Precisa de troco?</h4><div class="opts two">${[['sim','Sim'],['nao','Não']].map(([v,t])=>`<label class="opt"><input type="radio" name="tr" data-f="troco" value="${v}" ${O.troco===v?'checked':''}><span><b>${t}</b></span></label>`).join('')}</div><label class="f" id="tp" ${O.troco==='sim'?'':'hidden'}>Troco para quanto?<input data-f="trocoPara" value="${E(O.trocoPara)}" inputmode="decimal" placeholder="Ex.: 100"></label></div>
<div class="tot"><div><span>Subtotal</span><b>${M(B.cart.subtotal())}</b></div><div><span>Taxa de entrega</span><b id="fee">${M(B.fee(O))}</b></div><div class="g"><span>Total</span><b id="tt" class="bump">${M(B.total(O))}</b></div></div><p class="err" id="err" role="alert"></p><button class="btn" data-go="review">REVISAR PEDIDO</button>`)}
function review(){const e=B.validate(O);if(e){const x=$('#err');if(!x)return checkout();x.textContent=e;x.classList.remove('shake');void x.offsetWidth;x.classList.add('shake');return}
open(`<button class="x" data-close aria-label="Fechar">×</button><h2>Revise seu pedido</h2><div class="rv">${B.cart.items.map(i=>{const p=B.product(i.productId);return `<div class="li"><div>${info(i)}${i.note?`<small class="nt">Obs: ${E(i.note)}</small>`:''}</div><b>${M(B.cart.unit(i)*i.qty)}</b></div>`}).join('')}
<p><b>Cliente:</b> ${E(O.name)}</p><p><b>Tipo:</b> ${O.type==='entrega'?'Entrega':'Retirada no local'}</p>${O.type==='entrega'?`<p><b>Endereço:</b> ${E(O.rua)}, nº ${E(O.num)} — ${E(O.bairro)}${O.comp?' ('+E(O.comp)+')':''}${O.ref?'<br><b>Referência:</b> '+E(O.ref):''}</p>`:''}<p><b>Pagamento:</b> ${E(O.pay)}${O.pay==='Dinheiro'?(O.troco==='sim'?' · troco para '+M(B.parseMoney(O.trocoPara)):' · sem troco'):''}</p></div>
<div class="tot"><div><span>Subtotal</span><b>${M(B.cart.subtotal())}</b></div><div><span>Taxa de entrega</span><b>${M(B.fee(O))}</b></div><div class="g"><span>Total</span><b class="bump">${M(B.total(O))}</b></div></div><button class="btn" data-go="final">CONTINUAR PARA O WHATSAPP</button><button class="btn ghost" data-go="checkout">VOLTAR E EDITAR PEDIDO</button>`)}
function final(){if(B.validate(O))return checkout();
open(`<button class="x" data-close aria-label="Fechar">×</button><div class="fin"><div class="pizza">🍕</div><h2>SEU PEDIDO ESTÁ QUASE PRONTO!</h2><p>Para realizar o pagamento, entre em contato com nossa equipe pelo WhatsApp. Nossa equipe irá orientar você sobre o pagamento e confirmar seu pedido.</p><p class="tk">A Bira Pizzaria agradece pela preferência!</p><div class="tot"><div class="g"><span>Total</span><b>${M(B.total(O))}</b></div></div><a class="btn wa" href="${B.waUrl(O)}" target="_blank" rel="noopener">REALIZAR PAGAMENTO COM NOSSA EQUIPE NO WHATSAPP</a><small class="mut">Seu pedido só é confirmado pela equipe no WhatsApp. O carrinho continua salvo.</small><button class="lnk" data-go="review">← Voltar</button><button class="lnk" data-clear>Iniciar novo pedido (limpar carrinho)</button></div>`)}
const go={cart,checkout,review,final};
document.addEventListener('click',e=>{const t=e.target.closest('button,a,.card');if(!t)return;
if(t.dataset.close!==undefined)return close();
if(t.dataset.open)return product(t.dataset.open);
if(t.classList.contains('chip')){cat=t.dataset.cat;return menu()}
if(t.dataset.go)return go[t.dataset.go]();
if(t.id==='cartBtn'||t.id==='cartBar')return cart();
if(t.dataset.af){if(cur.fl.length<B.MAX_FLAVORS&&!cur.fl.includes(t.dataset.af)){cur.fl.push(t.dataset.af);cur.last=t.dataset.af;flv()}return}
if(t.dataset.rf){cur.fl=cur.fl.filter(x=>x!==t.dataset.rf);cur.last=null;flv();return}
if(t.dataset.q){cur.qty=Math.min(50,Math.max(1,cur.qty+ +t.dataset.q));$('#mq').textContent=cur.qty;return mt()}
if(t.id==='addBtn'){B.cart.add(cur.fl[0],cur.size,cur.qty,$('#note').value,cur.fl);close();return toast('Adicionado ao carrinho ✓')}
if(t.dataset.cq){B.cart.setQty(t.dataset.cq,+t.dataset.d);return cart()}
if(t.dataset.rm){B.cart.remove(t.dataset.rm);return cart()}
if(t.dataset.clear!==undefined){if(confirm('Limpar todo o carrinho?')){B.cart.clear();close()}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Enter'&&e.target.classList.contains('card'))product(e.target.dataset.open)});
sheet.addEventListener('click',e=>{if(e.target===sheet)close()});
document.addEventListener('change',e=>{const t=e.target;
if(t.name==='sz'){cur.size=t.value;mt()}
if(t.dataset.f&&t.type==='radio'){O[t.dataset.f]=t.value;$('#addr').hidden=O.type!=='entrega';$('#troco').hidden=O.pay!=='Dinheiro';$('#tp').hidden=O.troco!=='sim';$('#fee').textContent=M(B.fee(O));const x=$('#tt');x.textContent=M(B.total(O));x.classList.remove('bump');void x.offsetWidth;x.classList.add('bump')}});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.f&&t.type!=='radio')O[t.dataset.f]=t.value});
function badge(){const n=B.cart.count(),b=$('#badge'),bar=$('#cartBar');bar.hidden=!n;$('#cbN').textContent=n;$('#cbL').textContent=n>1?'itens':'item';$('#cbT').textContent=M(B.cart.subtotal());b.textContent=n;b.hidden=!n;b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}
B.on(badge);
B.init=()=>{$('#wa1').href=$('#wa2').href=`https://wa.me/${B.INFO.wa}`;menu();badge()};
})(window.Bira);
