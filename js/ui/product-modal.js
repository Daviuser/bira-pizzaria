/**
 * Modal do produto: sabores (até 3) com visualização da divisão, tamanho, quantidade,
 * observações e resumo antes de adicionar ao carrinho.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { open, img } = B.ui;
  const TITLES = ['', '', 'Pizza meio a meio', 'Pizza de 3 sabores'];
  const LABELS = ['', 'Pizza inteira', 'Meio a meio', '3 sabores'];
  const R = 98; // raio da pizza no SVG (viewBox 200x200)

  const angle = (k, n) => ((-90 + (360 / n) * k) * Math.PI) / 180;
  const point = (a, r = R) => [(100 + r * Math.cos(a)).toFixed(1), (100 + r * Math.sin(a)).toFixed(1)];

  /** Pizza dividida em n fatias grandes, cada uma com a foto do seu sabor. */
  function pie(ids) {
    const n = ids.length;
    const sector = (k) => {
      const [x0, y0] = point(angle(k, n)), [x1, y1] = point(angle(k + 1, n));
      return `M100 100L${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}Z`;
    };
    const defs = ids.map((_, k) => `<clipPath id="pc${k}"><path d="${sector(k)}"/></clipPath>`).join('');
    const photos = ids.map((id, k) => `<image href="${B.product(id).image}" x="-14" y="-14" width="228" height="228" preserveAspectRatio="xMidYMid slice" clip-path="url(#pc${k})"/>`).join('');
    const lines = ids.map((_, k) => { const [x, y] = point(angle(k, n)); return `<line x1="100" y1="100" x2="${x}" y2="${y}"/>`; }).join('');
    const nums = ids.map((_, k) => { const [x, y] = point(angle(k + 0.5, n), 60); return `<g class="pn"><circle cx="${x}" cy="${y}" r="12"/><text x="${x}" y="${y}">${k + 1}</text></g>`; }).join('');
    return `<svg class="pie" viewBox="0 0 200 200" role="img" aria-label="Pizza com ${n} sabores"><defs>${defs}</defs>${photos}${lines}<circle class="rim" cx="100" cy="100" r="${R}"/>${nums}</svg>`;
  }

  function sizesHtml(p, ks) {
    return `<h4>Tamanho</h4><div class="opts">${ks.map((k, n) => `<label class="opt"><input type="radio" name="sz" value="${k}" ${n ? '' : 'checked'}><span><b>${p.sizeLabels ? p.sizeLabels[k] : B.SIZES[k].label}</b><small>${p.sizeLabels ? '' : B.SIZES[k].detail}</small><em data-sz="${k}">${M(p.prices[k])}</em></span></label>`).join('')}</div>`;
  }

  function product(id) {
    const p = B.product(id), ks = Object.keys(p.prices), isPizza = p.category === 'pizzas';
    S.cur = { p, size: ks[0], qty: 1, fl: [id], last: null };
    open(`<button class="x" data-close aria-label="Fechar">×</button>
<div class="mimg" id="mimg">${img(p, B.PRODUCTS.indexOf(p))}</div>
<h2 id="mtitle">${E(B.itemName(p))}</h2>
${isPizza ? '<div id="flv"></div>' : `<p class="mut">${E(p.ingredients)}</p>`}
${p.noSize ? '' : sizesHtml(p, ks)}
<h4>Quantidade</h4><div class="qty"><button data-q="-1" aria-label="Diminuir">−</button><b id="mq">1</b><button data-q="1" aria-label="Aumentar">+</button></div>
<h4>Observações (opcional)</h4><textarea id="note" rows="2" maxlength="140" placeholder="Ex.: sem cebola, bem assada"></textarea>
<div class="msum" id="msum"></div>
<button class="btn" id="addBtn">ADICIONAR AO CARRINHO · <span id="mt" class="bump">${M(p.prices[ks[0]])}</span></button>`);
    if (isPizza) flv(); else mt();
  }

  /** Redesenha a área de sabores (lista, contador, pizza dividida, botões) e os preços. */
  function flv() {
    const c = S.cur, n = c.fl.length, full = n >= B.MAX_FLAVORS, left = B.MAX_FLAVORS - n;
    const rows = c.fl.map((f, k) => {
      const q = B.product(f);
      return `<div class="fr${f === c.last ? ' new' : ''}"><i class="num">${k + 1}</i><div><b>${E(q.name)}</b><small>${E(q.ingredients)}</small></div>${n > 1 ? `<button class="rf" data-rf="${f}" aria-label="Remover ${E(q.name)}">×</button>` : ''}</div>`;
    }).join('');
    const chips = B.pizzas().filter((q) => !c.fl.includes(q.id)).map((q) => `<button class="ch" data-af="${q.id}" ${full ? 'disabled' : ''}>+ ${E(q.name)}</button>`).join('');
    const hint = full ? 'Limite de 3 sabores atingido.' : `Quer mais sabores? Adicione até ${left} ${left > 1 ? 'sabores' : 'sabor'}:`;
    $('#flv').innerHTML = `<h4>Sabores <span class="cnt${full ? ' full' : ''}">${n} de ${B.MAX_FLAVORS} · ${LABELS[n]}</span></h4><div class="sel">${rows}</div><p class="mut hint">${hint}${n > 1 ? '<br>Valor: preço do sabor mais caro no tamanho escolhido.' : ''}</p><div class="chs">${chips}</div>`;

    const mimg = $('#mimg');
    mimg.classList.toggle('is-pie', n > 1);
    mimg.innerHTML = n > 1 ? pie(c.fl) : img(B.product(c.fl[0]), B.PRODUCTS.indexOf(B.product(c.fl[0])));
    $('#mtitle').textContent = n === 1 ? B.itemName(B.product(c.fl[0])) : TITLES[n];
    document.querySelectorAll('[data-sz]').forEach((e) => { e.textContent = M(B.price(c.fl, e.dataset.sz)); });
    mt();
  }

  /** Resumo do que será adicionado ao carrinho. */
  function summary() {
    const c = S.cur, p = c.p, n = c.fl.length, sl = p.noSize ? '' : B.sizeLabel(p, c.size);
    if (p.category === 'pizzas' && n > 1) {
      const names = c.fl.map((id) => B.product(id).name).join(' + ');
      return `<b>${c.qty}x Pizza ${B.SIZES[c.size].label} (${c.size}) · ${n} sabores</b><small>${E(names)}</small>`;
    }
    const name = p.category === 'pizzas' ? B.itemName(B.product(c.fl[0])) : B.itemName(p);
    return `<b>${c.qty}x ${E(name)}${sl ? ' · ' + E(sl) : ''}</b>`;
  }

  /** Atualiza resumo e preço total do botão. */
  function mt() {
    const t = $('#mt');
    t.textContent = M(B.price(S.cur.fl, S.cur.size) * S.cur.qty);
    t.classList.remove('bump');
    void t.offsetWidth;
    t.classList.add('bump');
    $('#msum').innerHTML = summary();
  }

  Object.assign(B.ui, { product, flv, mt });
})(window.Bira);
