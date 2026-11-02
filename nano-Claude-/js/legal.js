/* Language switch for the legal/support pages: ?lang=es (the app passes
   it) or the browser language picks the default; the buttons switch. */
/* EFFECTIVE DATE — the ONE place to set it. Fills the Privacy Policy and
   Terms in both languages. Set it to the month the pages are merged. */
const EFFECTIVE_DATE = { year: 2026, month: 11 }; // November 2026

(function () {
  // write the date in each article's language ("November 2026" / "noviembre de 2026")
  document.querySelectorAll('[data-effective-date]').forEach(el => {
    const lang = (el.closest('[lang]') || document.documentElement).lang || 'en';
    try {
      el.textContent = new Date(EFFECTIVE_DATE.year, EFFECTIVE_DATE.month - 1, 1)
        .toLocaleDateString(lang === 'es' ? 'es' : 'en-US', { month: 'long', year: 'numeric' });
    } catch (e) { /* keep the fallback text */ }
  });

  const param = new URLSearchParams(location.search).get('lang');
  const initial = param === 'es' || param === 'en'
    ? param
    : ((navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en');

  function setLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('main [lang]').forEach(el => el.classList.toggle('active', el.lang === lang));
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }
  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  setLang(initial);
})();
