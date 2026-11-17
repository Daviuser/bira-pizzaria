# Cardápio Digital — Bira Pizzaria Delivery

Cardápio online com carrinho e finalização do pedido pelo WhatsApp. Site estático (HTML, CSS e JavaScript puro): sem build, sem backend e sem banco de dados. O pagamento **não** é feito no site; é combinado com a equipe pelo WhatsApp.

## Como executar
- Abra `index.html` no navegador, ou
- rode um servidor local: `npx serve .` (ou `python3 -m http.server 8080`) e acesse o endereço mostrado.
- Para publicar, envie a pasta inteira para qualquer hospedagem estática.

## Estrutura
```
index.html              Página única (SEO, fontes e ordem de carregamento)
assets/
  logo.png              Logo da Bira
  pizzas/<id>.webp      Foto de cada produto (640x480)
css/                    Carregados na ordem abaixo (a ordem importa)
  base.css              Tokens de design, reset e tipografia
  header-hero.css       Cabeçalho e hero
  menu.css              Cardápio, cards, botões, informações, rodapé
  sheet.css             Painéis, formulários, carrinho, animações, breakpoints
  flavors.css           Seleção de sabores (até 3)
  mobile.css            Ajustes para celular e barra flutuante do carrinho
js/
  config.js             Telefone, taxa de entrega, pagamentos, tamanhos
  utils.js              Moeda, escape de HTML, eventos
  data/products.js      Catálogo e preços (em centavos)
  services/
    pricing.js          Regra de preço, sabores, taxa e total
    cart.js             Carrinho + localStorage
    whatsapp.js         Validação e mensagem do pedido
  ui/
    state.js, helpers.js, sheet.js, menu.js, product-modal.js,
    cart-view.js, checkout.js, events.js
  main.js               Inicialização
```

## Manutenção
- **Preços e sabores:** `js/data/products.js` (valores em centavos, ex.: `4990` = R$ 49,90).
- **Fotos:** substitua `assets/pizzas/<id>.webp` mantendo o nome do arquivo (4:3, ~640x480). As imagens atuais são ilustrações provisórias; troque por fotos reais quando tiver.
- **Taxa de entrega, telefone e pagamentos:** `js/config.js`.
- **Pizza com vários sabores:** o valor é o do sabor mais caro no tamanho escolhido (função `B.price` em `js/services/pricing.js`).
- **Mensagem do WhatsApp:** `js/services/whatsapp.js`.
