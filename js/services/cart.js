/**
 * Carrinho: estado, persistência em localStorage e totais.
 */
(function(B){
const KEY='bira_cart_v1';let items=[];
try{items=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){items=[]}
items=items.filter(i=>i.qty>0&&B.flavorsOf(i).length<=B.MAX_FLAVORS&&B.flavorsOf(i).every(id=>{const p=B.product(id);return p&&p.prices[i.size]!=null}));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){}B.emit()};
B.cart={
get items(){return items},
add(id,size,qty,note,flavors){note=(note||'').trim();const fl=(flavors&&flavors.length?flavors:[id]).slice(0,B.MAX_FLAVORS);const k=fl.slice().sort().join('+')+'|'+size+'|'+note;const f=items.find(i=>i.key===k);f?f.qty+=qty:items.push({key:k,productId:fl[0],size,qty,note,flavors:fl});save()},
setQty(k,d){const i=items.find(x=>x.key===k);if(!i)return;i.qty+=d;if(i.qty<1)items=items.filter(x=>x!==i);save()},
remove(k){items=items.filter(x=>x.key!==k);save()},
clear(){items=[];save()},
count(){return items.reduce((s,i)=>s+i.qty,0)},
unit(i){return B.price(B.flavorsOf(i),i.size)},
subtotal(){return items.reduce((s,i)=>s+B.cart.unit(i)*i.qty,0)}
};
})(window.Bira);
