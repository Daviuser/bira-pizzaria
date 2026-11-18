/**
 * Motion design: título do hero em palavras, parallax da foto, revelação ao rolar
 * e animação "voar para o carrinho". Usa apenas transform/opacity e respeita prefers-reduced-motion.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;

  /** Divide o título em palavras para entrada progressiva. */
  function splitTitle() {
    const h1 = $('#heroTitle');
    if (!h1 || B.reduced()) return;
    h1.setAttribute('aria-label', h1.textContent);
    let i = 0;
    const wrap = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part.trim()) return frag.appendChild(document.createTextNode(part));
            const s = document.createElement('span');
            s.className = 'w';
            s.style.setProperty('--i', i++);
            s.setAttribute('aria-hidden', 'true');
            s.textContent = part;
            frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else wrap(n);
      });
    };
    wrap(h1);
  }

  /** Parallax sutil da foto do hero (até 18px). */
  function parallax() {
    const pic = $('#heroPic');
    if (!pic || B.reduced()) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        pic.style.setProperty('--py', Math.min(18, window.scrollY * 0.05).toFixed(1) + 'px');
      });
    }, { passive: true });
  }

  /** Revela elementos [data-reveal] quando entram na tela. */
  function reveal() {
    const els = document.querySelectorAll('.sec > h2, .sec > .sub, .info > div');
    els.forEach((el) => el.setAttribute('data-reveal', ''));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el); });
  }

  /** Miniatura que "voa" da foto do produto até o carrinho. */
  function fly(rect, src) {
    if (B.reduced() || !document.body.animate) return;
    const bar = $('#cartBar'), target = (bar && !bar.hidden ? bar : $('#cartBtn')).getBoundingClientRect();
    const size = 56, el = document.createElement('img');
    el.className = 'fly';
    el.src = src;
    el.alt = '';
    const x0 = rect.left + rect.width / 2 - size / 2, y0 = rect.top + rect.height / 2 - size / 2;
    const x1 = Math.min(target.left + 44, window.innerWidth - size), y1 = target.top + target.height / 2 - size / 2;
    document.body.appendChild(el);
    el.animate([
      { transform: `translate(${x0}px, ${y0}px) scale(1)`, opacity: 1 },
      { transform: `translate(${x1}px, ${y1}px) scale(.25)`, opacity: 0.3 },
    ], { duration: 650, easing: 'cubic-bezier(.5, 0, .75, .4)' }).onfinish = () => el.remove();
  }

  splitTitle();
  parallax();
  reveal();
  Object.assign(B.ui, { fly });
})(window.Bira);
