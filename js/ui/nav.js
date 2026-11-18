/**
 * Navegação por categorias: indicador animado que desliza até a categoria ativa.
 */
(function (B) {
  'use strict';
  const $ = B.$, E = B.esc, M = B.money, S = B.ui.state;

  function moveInd() {
    const cats = $('#cats'), on = document.querySelector('.chip.on'), ind = $('#cats .ind');
    if (!cats || !on || !ind) return;
    ind.style.width = on.offsetWidth + 'px';
    ind.style.transform = `translateX(${on.offsetLeft}px)`;
    // centraliza a aba ativa na barra (rolagem horizontal), sem mexer na rolagem da página
    cats.scrollTo({ left: on.offsetLeft - (cats.clientWidth - on.offsetWidth) / 2, behavior: B.reduced() ? 'auto' : 'smooth' });
  }

  window.addEventListener('resize', moveInd);
  Object.assign(B.ui, { moveInd });
})(window.Bira);
