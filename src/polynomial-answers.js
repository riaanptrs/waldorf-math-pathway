// Check expanded one-variable polynomials by coefficients. Never execute learner input.
(() => {
  window.checkExpandedPolynomial = (config, raw) => {
    if (typeof raw !== 'string' || raw.length > 250) return false;
    const source = raw.toLowerCase().replace(/−/g, '-').replace(/[×·]/g, '*')
      .replace(/²/g, '^2').replace(/³/g, '^3').replace(/,/g, '.').replace(/\s/g, '');
    if (!source || !/^[0-9x.+*^\-]+$/.test(source)) return false;
    const terms = source.match(/[+-]?[^+-]+/g);
    if (!terms || terms.join('') !== source) return false;
    const actual = [], seen = new Set();
    for (const term of terms) {
      const match = term.match(/^([+-]?)(?:(\d+(?:\.\d+)?|\.\d+)\*?)?(x(?:\^[0-3])?(?:\*x(?:\^[0-3])?)*)?$/);
      if (!match || (!match[2] && !match[3]) || (!match[3] && term.endsWith('*'))) return false;
      const coefficient = (match[1] === '-' ? -1 : 1) * (match[2] === undefined ? 1 : Number(match[2]));
      const power = match[3] ? match[3].split('*').reduce((n, x) => n + (x.includes('^') ? Number(x.split('^')[1]) : 1), 0) : 0;
      if (power > 3 || !Number.isFinite(coefficient)) return false;
      if (config.requireCollected && coefficient !== 0 && seen.has(power)) return false;
      if (coefficient !== 0) seen.add(power);
      actual[power] = (actual[power] || 0) + coefficient;
    }
    return Array.from({length: Math.max(actual.length, config.polynomial.length)}, (_, power) => power)
      .every(power => Math.abs((actual[power] || 0) - (config.polynomial[power] || 0)) < 1e-9);
  };
})();
