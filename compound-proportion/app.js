(function () {
  'use strict';
  const data = window.CompoundData, core = window.CompoundCore, view = window.CompoundRender;
  const main = document.getElementById('compound-main'), language = document.getElementById('compound-language');
  const items = [...data.examples, ...data.practice], states = new Map();
  let lang = 'pt';
  try { if (localStorage.getItem('waldorf-math:language') === 'en') lang = 'en'; } catch {}
  function current() { return items.find(p => p.id === location.hash.slice(1)) || items[0]; }
  function stateFor(p) { if (!states.has(p.id)) states.set(p.id, view.fresh(p)); return states.get(p.id); }
  function paint(focus) {
    const p = current(), state = stateFor(p);
    main.innerHTML = view.render(data, p, state, lang);
    language.value = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = (lang === 'pt' ? 'Regra de Três Composta' : 'Compound Proportion') + ' · Waldorf';
    document.getElementById('language-label').textContent = lang === 'pt' ? 'Idioma' : 'Language';
    document.getElementById('brand').textContent = lang === 'pt' ? 'Waldorf · Matemática' : 'Waldorf · Mathematics';
    document.querySelector('.skip-link').textContent = lang === 'pt' ? 'Ir ao conteúdo' : 'Skip to content';
    document.getElementById('problem-picker').addEventListener('change', event => { location.hash = event.target.value; });
    const input = document.getElementById('final-value');
    input.addEventListener('input', () => {
      state.finalValue = input.value;
      state.finalResult = null;
      document.getElementById('final-feedback').textContent = '';
      // Remove the old verdict and its offer when an answer is edited.
      main.querySelector('[data-action="help"]')?.remove();
    });
    document.getElementById('final-form').addEventListener('submit', event => {
      event.preventDefault();
      state.finalValue = input.value;
      state.finalResult = core.check(input.value, {kind:'number', answer:p.answer});
      paint('final-value');
    });
    const stepForm = document.getElementById('step-form');
    if (stepForm) {
      const q = core.steps(p, lang)[state.index];
      function readValue() { return q.kind === 'choice' ? stepForm.querySelector('input:checked')?.value || '' : stepForm.querySelector('input').value; }
      function change() {
        const entry = state.entries[state.index] ||= {};
        entry.value = readValue(); entry.result = null; entry.assisted = false;
        document.getElementById('step-feedback').textContent = '';
        main.querySelector('.explanation')?.remove();
        main.querySelector('[data-action="next"]')?.remove();
        if (q.division) document.getElementById('division-board').innerHTML = core.writtenDivision(q.division,lang,false);
      }
      stepForm.addEventListener('input', change);
      stepForm.addEventListener('submit', event => {
        event.preventDefault();
        const entry = state.entries[state.index] ||= {};
        entry.value = readValue(); entry.result = core.check(entry.value, q);
        paint(q.kind === 'number' ? 'step-value' : 'step-heading');
      });
    }
    main.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'help') state.helpOpen = true;
      if (action === 'restart') { states.set(p.id, view.fresh(p)); paint('problem-title'); return; }
      if (action === 'hint' || action === 'explain') {
        const entry = state.entries[state.index] ||= {};
        if (action === 'hint') entry.hint = true;
        else entry.assisted = true;
      }
      if (action === 'next') {
        const entry = state.entries[state.index];
        if (entry?.result === 'correct' || entry?.assisted) state.index++;
      }
      paint('step-heading');
    }));
    if (focus) document.getElementById(focus)?.focus();
  }
  language.addEventListener('change', () => {
    lang = language.value === 'en' ? 'en' : 'pt';
    try { localStorage.setItem('waldorf-math:language', lang); } catch {}
    paint();
  });
  window.addEventListener('hashchange', () => { paint('problem-title'); document.getElementById('problem-work').scrollIntoView({block:'start'}); });
  paint();
})();
