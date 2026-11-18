/**
 * Catálogo de produtos. Preços em CENTAVOS (ex.: 4990 = R$ 49,90).
 * Para trocar a foto de um produto, substitua o arquivo indicado em `image`.
 */
(function (B) {
  'use strict';

  const pz=(id,name,ing,m,g,f)=>({id,name,prefix:'Pizza ',category:'pizzas',ingredients:ing,prices:{M:m,G:g,F:f},image:`assets/pizzas/${id}.webp`});
  const st=(id,n,i)=>pz(id,n,i,4000,4990,6500);
  const dk=(id,name,desc,price)=>({id,name,prefix:'',category:'bebidas',ingredients:desc,prices:{UN:price},sizeLabels:{UN:'Unidade'},noSize:true,fit:'contain',image:`assets/bebidas/${id}.webp`});
  B.PRODUCTS=[
  pz('calabresa','Calabresa','Molho, mussarela, tomate, cebola, azeitona e orégano.',3500,4000,5000),
  pz('camarao','Camarão','Molho, mussarela, camarão, cebola, azeitona e orégano.',4000,5500,6000),
  st('camarao-catupiry','Camarão com Catupiry','Molho, mussarela, camarão, catupiry, cebola e azeitona.'),
  st('catupiry-calabresa','Catupiry com Calabresa','Molho, mussarela, catupiry, calabresa, tomate e cebola.'),
  st('carne-seca','Carne Seca','Molho, mussarela, carne seca, azeitona e orégano.'),
  st('baiana','Baiana','Molho, mussarela, calabresa, ovo, pimenta, pimentão e cebola.'),
  st('bacalhau','Bacalhau','Molho, mussarela, bacalhau, cebola e azeitona.'),
  st('bacalhau-catupiry','Bacalhau com Catupiry','Molho, mussarela, bacalhau, cebola e azeitona.'),
  st('bacon','Bacon','Molho, mussarela, bacon, cebola, azeitona e orégano.'),
  st('bacon-champignon','Bacon com Champignon','Molho, mussarela, bacon, champignon e azeitona.'),
  pz('moda-da-casa','A Moda da Casa','Molho, mussarela, cebola, azeitona e orégano.',3500,4000,5000),
  st('atum-catupiry','Atum com Catupiry','Molho, mussarela, atum, catupiry, cebola e azeitona.'),
  pz('delicia-da-casa','Delícia da Casa','Molho, mussarela, carne seca, banana da terra, batata palha, tomate, cebola roxa, catupiry e orégano.',4200,5500,7000),
  st('presunto','Presunto','Molho, mussarela e presunto.'),
  st('frango-milho','Frango com Milho','Molho, mussarela, frango e milho.'),
  st('lombo-canadense','Lombo Canadense','Molho, mussarela, lombo, bacon, tomate, manjericão e orégano.'),
  st('napolitana','Napolitana','Molho, mussarela e parmesão.'),
  st('frango-cheddar','Frango com Cheddar','Mussarela, frango, cheddar e azeitona.'),
  st('frango-catupiry','Frango com Catupiry','Mussarela, frango, catupiry, tomate e orégano.'),
  Object.assign(pz('romeu-julieta','Romeu e Julieta','Molho, queijo, Catupiry e goiabada cremosa.',4000,5000,5500), { isNew: true }),
  {id:'brotinho',name:'Brotinho',prefix:'',category:'brotinho',ingredients:'Massa de liquidificador.',prices:{PEQ:800,MED:1000},sizeLabels:{PEQ:'Pequeno',MED:'Médio'},image:'assets/pizzas/brotinho.webp'},
  dk('coca-lata','Coca-Cola lata','Lata 350 ml.',500),
  dk('guarana-lata','Guaraná lata','Lata 350 ml.',500),
  dk('coca-1l','Coca-Cola 1 litro','Garrafa de 1 litro.',1000),
  dk('guarana-1l','Guaraná 1 litro','Garrafa de 1 litro.',800)
  ];
  
  B.product = (id) => B.PRODUCTS.find((p) => p.id === id);
  B.pizzas = () => B.PRODUCTS.filter((p) => p.category === 'pizzas');
  B.itemName = (p) => p.prefix + p.name;
  B.sizeLabel = (p, s) => (p.noSize ? '' : p.sizeLabels ? p.sizeLabels[s] : B.SIZES[s].label + ' (' + s + ')');
})(window.Bira);
