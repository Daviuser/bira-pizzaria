/**
 * Horário de funcionamento: terça a domingo, das 19h às 00h (fuso de Salvador/BA).
 * Configuração em config.js (B.HOURS).
 */
(function (B) {
  'use strict';

  const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const NAMES = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const label = (t) => { const [h, m] = t.split(':'); const hh = String(+h % 24).padStart(2, '0'); return m === '00' ? `${hh}h` : `${hh}h${m}`; };

  B.hoursLabel = () => `${label(B.HOURS.open)} às ${label(B.HOURS.close)}`;
  B.daysLabel = () => 'Terça a domingo';

  /** Dia da semana (0-6) e minutos desde 00:00, no fuso configurado. */
  B.clock = (date = new Date()) => {
    const tz = B.HOURS.tz;
    const dow = WEEK.indexOf(new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(date));
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
    const get = (t) => Number(parts.find((p) => p.type === t).value);
    return { dow, min: get('hour') * 60 + get('minute') };
  };

  B.isOpen = (date) => {
    const { dow, min } = B.clock(date);
    return B.HOURS.days.includes(dow) && min >= toMin(B.HOURS.open) && min < toMin(B.HOURS.close);
  };

  /** Texto do indicador aberto/fechado, com a próxima abertura quando fechado. */
  B.openStatus = (date) => {
    if (B.isOpen(date)) return { open: true, text: `Aberto agora · até ${label(B.HOURS.close)}` };
    const { dow, min } = B.clock(date);
    for (let k = 0; k <= 7; k++) {
      const day = (dow + k) % 7;
      if (B.HOURS.days.includes(day) && (k > 0 || min < toMin(B.HOURS.open))) {
        const when = k === 0 ? 'hoje' : k === 1 ? 'amanhã' : NAMES[day];
        return { open: false, text: `Fechado · abrimos ${when} às ${label(B.HOURS.open)}` };
      }
    }
    return { open: false, text: 'Fechado' };
  };
})(window.Bira);
