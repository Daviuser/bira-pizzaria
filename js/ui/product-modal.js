/**
 * Modal do produto: seleção de sabores (até 3), tamanho, quantidade e observações.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { open, img } = B.ui;
function product(id){const p=B.product(id),ks=Object.keys(p.prices),pz=p.category==='pizzas';S.cur={p,size:ks[0],qty:1,fl:[id],last:null};
const i=B.PRODUCTS.indexOf(p);
open(`<button class="x" data-close aria-label="Fechar">×</button><div class="mimg">${img(p,i)}</div><h2 id="mtitle">${E(B.itemName(p))}</h2>${pz?'<div id="flv"></div>':`<p class="mut">${E(p.ingredients)}</p>`}
<h4>Tamanho</h4><div class="opts">${ks.map((k,n)=>`<label class="opt"><input type="radio" name="sz" value="${k}" ${n?'':'checked'}><span><b>${p.sizeLabels?p.sizeLabels[k]:B.SIZES[k].label}</b><small>${p.sizeLabels?'':B.SIZES[k].detail}</small><em data-sz="${k}">${M(p.prices[k])}</em></span></label>`).join('')}</div>
<h4>Quantidade</h4><div class="qty"><button data-q="-1" aria-label="Diminuir">−</button><b id="mq">1</b><button data-q="1" aria-label="Aumentar">+</button></div>
<h4>Observações (opcional)</h4><textarea id="note" rows="2" maxlength="140" placeholder="Ex.: sem cebola, bem assada"></textarea>
<button class="btn" id="addBtn">ADICIONAR AO CARRINHO · <span id="mt" class="bump">${M(p.prices[ks[0]])}</span></button>`);
if(pz)flv()}
function flv(){const n=S.cur.fl.length,full=n>=B.MAX_FLAVORS,lbl=['','Pizza inteira','Meio a meio','3 sabores'][n];
$('#flv').innerHTML=`<h4>Sabores <span class="cnt${full?' full':''}">${n} de ${B.MAX_FLAVORS} · ${lbl}</span></h4><div class="sel">${S.cur.fl.map(f=>{const q=B.product(f);return `<div class="fr${f===S.cur.last?' new':''}"><div><b>${E(q.name)}</b><small>${E(q.ingredients)}</small></div>${n>1?`<button class="rf" data-rf="${f}" aria-label="Remover ${E(q.name)}">×</button>`:''}</div>`}).join('')}</div><p class="mut hint">${full?'Limite de 3 sabores atingido.':'Quer mais sabores? Adicione até '+(B.MAX_FLAVORS-n)+' '+(B.MAX_FLAVORS-n>1?'sabores':'sabor')+':'}${n>1?'<br>Valor: preço do sabor mais caro no tamanho escolhido.':''}</p><div class="chs">${B.pizzas().filter(q=>!S.cur.fl.includes(q.id)).map(q=>`<button class="ch" data-af="${q.id}" ${full?'disabled':''}>+ ${E(q.name)}</button>`).join('')}</div>`;
$('#mtitle').textContent=n===1?B.itemName(B.product(S.cur.fl[0])):n===2?'Pizza meio a meio':'Pizza de 3 sabores';
document.querySelectorAll('[data-sz]').forEach(e=>{e.textContent=M(B.price(S.cur.fl,e.dataset.sz))});mt()}
function mt(){const t=$('#mt');t.textContent=M(B.price(S.cur.fl,S.cur.size)*S.cur.qty);t.classList.remove('bump');void t.offsetWidth;t.classList.add('bump')}

  Object.assign(B.ui, { product, flv, mt });
})(window.Bira);
