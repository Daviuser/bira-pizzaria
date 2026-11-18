/**
 * Eventos globais (delegação), contador do carrinho e inicialização.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;
  const { close, toast, menu, product, flv, mt, cart, checkout, review, final } = B.ui;
  const go = { cart, checkout, review, final };
  const sheet = $('#sheet');

  /** Troca de categoria com transição suave e rolagem até o início da lista. */
  function switchCategory(cat) {
    if (cat === S.cat) return;
    S.cat = cat;
    document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.cat === cat));
    B.ui.moveInd();
    const grid = $('#grid'), top = $('#cardapio').getBoundingClientRect().top + window.scrollY - 70;
    if (window.scrollY > top) window.scrollTo({ top, behavior: B.reduced() ? 'auto' : 'smooth' });
    grid.classList.add('out');
    setTimeout(() => { menu(); grid.classList.remove('out'); }, B.reduced() ? 0 : 150);
  }

  function removeItem(key, btn) {
    const row = btn.closest('.li'), done = () => { B.cart.remove(key); cart(true); };
    if (row && !B.reduced()) { row.classList.add('out'); setTimeout(done, 220); } else done();
  }

  function changeQty(key, d, btn) {
    const item = B.cart.items.find((i) => i.key === key);
    if (item && item.qty + d < 1) return removeItem(key, btn);
    B.cart.setQty(key, d);
    cart(true);
    const b = [...document.querySelectorAll('[data-cq]')].find((x) => x.dataset.cq === key);
    if (b) b.parentElement.querySelector('span').classList.add('bump');
  }

  function addToCart() {
    const c = S.cur, rect = $('#mimg').getBoundingClientRect(), src = B.product(c.fl[0]).image;
    B.cart.add(c.fl[0], c.size, c.qty, $('#note').value, c.fl);
    close();
    toast('Adicionado ao carrinho ✓');
    B.ui.fly(rect, src);
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('button,a,.card');
    if (!t) return;
    const d = t.dataset;
    if (d.close !== undefined) return close();
    if (d.open) return product(d.open);
    if (t.classList.contains('chip')) return switchCategory(d.cat);
    if (d.go) return go[d.go]();
    if (t.id === 'cartBtn' || t.id === 'cartBar') return cart();
    if (d.af) {
      if (S.cur.fl.length < B.MAX_FLAVORS && !S.cur.fl.includes(d.af)) { S.cur.fl.push(d.af); S.cur.last = d.af; flv(); }
      return;
    }
    if (d.rf) { S.cur.fl = S.cur.fl.filter((x) => x !== d.rf); S.cur.last = null; return flv(); }
    if (d.q) { S.cur.qty = Math.min(50, Math.max(1, S.cur.qty + +d.q)); $('#mq').textContent = S.cur.qty; return mt(); }
    if (t.id === 'addBtn') return addToCart();
    if (d.cq) return changeQty(d.cq, +d.d, t);
    if (d.rm) return removeItem(d.rm, t);
    if (d.clear !== undefined && confirm('Limpar todo o carrinho?')) { B.cart.clear(); close(); }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && e.target.classList.contains('card')) product(e.target.dataset.open);
  });
  sheet.addEventListener('click', (e) => { if (e.target === sheet) close(); });

  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.name === 'sz') { S.cur.size = t.value; mt(); }
    if (t.dataset.f && t.type === 'radio') {
      S.order[t.dataset.f] = t.value;
      $('#addr').hidden = S.order.type !== 'entrega';
      $('#troco').hidden = S.order.pay !== 'Dinheiro';
      $('#tp').hidden = S.order.troco !== 'sim';
      $('#fee').textContent = M(B.fee(S.order));
      const tt = $('#tt');
      tt.textContent = M(B.total(S.order));
      tt.classList.remove('bump');
      void tt.offsetWidth;
      tt.classList.add('bump');
    }
  });
  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.f && t.type !== 'radio') S.order[t.dataset.f] = t.value;
  });

  /** Atualiza contador do cabeçalho e a barra flutuante do carrinho. */
  function badge() {
    const n = B.cart.count(), b = $('#badge'), bar = $('#cartBar');
    bar.hidden = !n;
    $('#cbN').textContent = n;
    $('#cbL').textContent = n > 1 ? 'itens' : 'item';
    $('#cbT').textContent = M(B.cart.subtotal());
    b.textContent = n;
    b.hidden = !n;
    [b, bar].forEach((el) => { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); });
  }
  B.on(badge);

  B.init = () => {
    $('#wa1').href = $('#wa2').href = `https://wa.me/${B.INFO.wa}`;
    menu();
    badge();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(B.ui.moveInd);
  };
})(window.Bira);
