/**
 * Horário de funcionamento: aberto todos os dias, das 18h às 23h55 (fuso de Salvador/BA).
 */
(function (B) {
  'use strict';

  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const label = (t) => { const [h, m] = t.split(':'); return m === '00' ? `${+h}h` : `${+h}h${m}`; };

  B.hoursLabel = () => `${label(B.HOURS.open)} às ${label(B.HOURS.close)}`;

  /** Minutos desde 00:00 no fuso configurado. */
  B.minutesNow = (date = new Date()) => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: B.HOURS.tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
    const get = (t) => Number(parts.find((p) => p.type === t).value);
    return get('hour') * 60 + get('minute');
  };

  B.isOpen = (date) => {
    const m = B.minutesNow(date);
    return m >= toMin(B.HOURS.open) && m <= toMin(B.HOURS.close);
  };

  /** Texto do indicador aberto/fechado. */
  B.openStatus = (date) => {
    if (B.isOpen(date)) return { open: true, text: `Aberto agora · até ${label(B.HOURS.close)}` };
    const when = B.minutesNow(date) < toMin(B.HOURS.open) ? 'hoje' : 'amanhã';
    return { open: false, text: `Fechado · abrimos ${when} às ${label(B.HOURS.open)}` };
  };
})(window.Bira);
