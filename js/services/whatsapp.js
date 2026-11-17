/**
 * Validação do pedido e geração da mensagem/URL do WhatsApp.
 */
(function(B){
B.validate=o=>{
if(!B.cart.items.length)return 'Seu carrinho está vazio.';
if(!o.name||o.name.trim().length<3)return 'Informe seu nome completo.';
if(o.type==='entrega'&&(!o.rua.trim()||!o.num.trim()||!o.bairro.trim()))return 'Informe rua, número e bairro para a entrega.';
if(!o.pay)return 'Escolha a forma de pagamento.';
if(o.pay==='Dinheiro'&&o.troco==='sim'&&B.parseMoney(o.trocoPara)<=B.total(o))return 'O valor do troco precisa ser maior que o total do pedido ('+B.money(B.total(o))+').';
return '';};
B.message=o=>{
const L=['Olá! Gostaria de fazer um pedido na Bira Pizzaria Delivery.','','*MEU PEDIDO:*',''];
B.cart.items.forEach(i=>{const p=B.product(i.productId);
const fn=B.flavorNames(i);if(fn.length>1){L.push(`${i.qty}x Pizza ${B.SIZES[i.size].label} (${i.size}) — ${fn.length} sabores:`);fn.forEach(n=>L.push('• '+n))}else L.push(`${i.qty}x ${B.itemName(p)} — ${B.sizeLabel(p,i.size)}`);
if(i.note)L.push('Obs: '+i.note);
L.push('Valor: '+B.money(B.cart.unit(i)*i.qty),'');});
L.push('*RESUMO FINANCEIRO:*','','Subtotal: '+B.money(B.cart.subtotal()));
if(o.type==='entrega')L.push('Taxa de entrega: '+B.money(B.fee(o)));
L.push('*TOTAL: '+B.money(B.total(o))+'*','','*DADOS DO CLIENTE:*','','Nome: '+o.name.trim(),'Tipo: '+(o.type==='entrega'?'Entrega':'Retirada no local'));
if(o.type==='entrega'){L.push(`Endereço: ${o.rua.trim()}, nº ${o.num.trim()}`,'Bairro: '+o.bairro.trim());
if(o.comp.trim())L.push('Complemento: '+o.comp.trim());if(o.ref.trim())L.push('Referência: '+o.ref.trim());}
L.push('Pagamento: '+o.pay);
if(o.pay==='Dinheiro')L.push(o.troco==='sim'?'Troco para: '+B.money(B.parseMoney(o.trocoPara)):'Não precisa de troco');
L.push('','Aguardo as orientações da equipe para realizar o pagamento e confirmar meu pedido.','','Obrigado!');
return L.join('\n');};
B.waUrl=o=>`https://wa.me/${B.INFO.wa}?text=${encodeURIComponent(B.message(o))}`;
})(window.Bira);
