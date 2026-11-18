/**
 * Indicador de funcionamento (hero) e textos de horário (informações e rodapé).
 */
(function (B) {
  'use strict';
  const $ = B.$;

  function render() {
    const st = B.openStatus(), el = $('#openNow');
    el.textContent = st.text;
    el.classList.toggle('open', st.open);
    el.classList.toggle('closed', !st.open);
    $('#infoDays').textContent = B.daysLabel();
    $('#infoHours').textContent = B.hoursLabel();
    $('#footHours').textContent = `Funcionamos de terça a domingo · ${B.hoursLabel()}`;
  }

  B.ui.startStatus = () => { render(); setInterval(render, 60000); };
})(window.Bira);
