(function (root) {
  'use strict';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function parseNumber(raw) {
    const value = String(raw).trim();
    if (!/^-?\d+(?:[.,]\d+)?$/.test(value)) return null;
    const number = Number(value.replace(',', '.'));
    return Number.isFinite(number) ? number : null;
  }
  function check(raw, step) {
    if (step.kind === 'choice') return !String(raw).trim() ? 'invalid' : String(raw) === String(step.answer) ? 'correct' : 'wrong';
    const value = parseNumber(raw);
    return value === null ? 'invalid' : Math.abs(value - step.answer) < 1e-8 ? 'correct' : 'wrong';
  }
  function calculation(p) {
    const unknown = p.columns.find(c => c.after === null);
    const factors = p.columns.filter(c => c !== unknown).map(c => {
      const direct = unknown.role === 'output' || c.role === 'output';
      return { ...c, direct, numerator: direct ? c.before : c.after, denominator: direct ? c.after : c.before };
    });
    const numerator = factors.reduce((n, f) => n * f.numerator, 1);
    const denominator = factors.reduce((n, f) => n * f.denominator, 1);
    return { unknown, factors, numerator, denominator, cross: unknown.before * denominator };
  }
  function multiplication(values) {
    let product = values[0];
    return values.slice(1).map(n => { const line = `${product} × ${n} = ${product * n}`; product *= n; return line; });
  }
  // Positional long division, retaining zero digits in the quotient.
  function division(dividend, divisor, lang) {
    const t = (en, pt) => lang === 'pt' ? pt : en;
    const lines = [];
    let a = dividend, b = divisor;
    while (a % 10 === 0 && b % 10 === 0) { a /= 10; b /= 10; }
    if (a !== dividend) lines.push(t(`Divide both numbers by ${dividend / a}: ${dividend} ÷ ${divisor} = ${a} ÷ ${b}.`, `Divida os dois números por ${dividend / a}: ${dividend} ÷ ${divisor} = ${a} ÷ ${b}.`));
    let partial = 0, started = false, quotient = '';
    for (const digit of String(a)) {
      partial = partial * 10 + Number(digit);
      if (!started && partial < b) continue;
      started = true;
      const q = Math.floor(partial / b), remainder = partial - q * b;
      lines.push(t(`Using ${partial}: ${b} fits ${q} time(s). Write ${q} in the quotient. ${partial} − ${q * b} = ${remainder}; bring down the next digit if one remains.`, `Com ${partial}: ${b} cabe ${q} vez(es). Escreva ${q} no quociente. ${partial} − ${q * b} = ${remainder}; baixe o próximo algarismo, se houver.`));
      quotient += q;
      partial = remainder;
    }
    lines.push(`${a} ÷ ${b} = ${quotient || '0'}`);
    return lines;
  }
  function steps(p, lang) {
    const t = (en, pt) => lang === 'pt' ? pt : en;
    const { unknown: u, factors: f, numerator: n, denominator: d, cross } = calculation(p);
    const out = [], add = (question, hint, explanation, math, answer, options) => out.push({question, hint, explanation, math, answer, ...(options ? {kind:'choice', options} : {kind:'number'})});
    const label = c => c.label[lang];
    add(t('What quantity does x represent?', 'Qual grandeza x representa?'), t('Find what the question asks you to discover. Look for x in the table.', 'Procure o que o enunciado pede para descobrir. Observe onde está x na tabela.'),
      t(`We are finding ${label(u).toLowerCase()}. Its known value is ${u.before}. Keep known over unknown on the left throughout this solution.`, `Queremos descobrir ${label(u).toLowerCase()}. Seu valor conhecido é ${u.before}. Mantenha conhecido sobre desconhecido à esquerda durante toda a resolução.`),
      [`${u.before}/x`], u.key, p.columns.map(c => ({value:c.key, label:label(c)})));
    for (const c of f) {
      const relationship = c.direct ? t('direct', 'direta') : t('inverse', 'inversa');
      const reason = c.direct
        ? t(`Increasing “${label(c)}” while the other quantities stay fixed also increases “${label(u)}”. Both change by the same factor: a direct relationship.`, `Aumentar “${label(c)}”, mantendo as outras grandezas fixas, também aumenta “${label(u)}”. As duas variam pelo mesmo fator: relação direta.`)
        : t(`With the amount of work fixed, increasing ${label(c).toLowerCase()} reduces the required ${label(u).toLowerCase()}. Doubling one halves the other: an inverse relationship.`, `Com a quantidade de trabalho fixa, aumentar ${label(c).toLowerCase()} reduz ${label(u).toLowerCase()} necessário(a). Dobrar uma reduz a outra à metade: relação inversa.`);
      add(t(`Keep the other quantities fixed. Is the relationship between ${label(c).toLowerCase()} and ${label(u).toLowerCase()} direct or inverse?`, `Mantenha as outras grandezas fixas. A relação entre ${label(c).toLowerCase()} e ${label(u).toLowerCase()} é direta ou inversa?`),
        t('Imagine doubling only this quantity. Would the quantity represented by x double or halve?', 'Imagine dobrar apenas esta grandeza. A grandeza representada por x dobraria ou cairia pela metade?'), reason,
        [], c.direct ? 'direct' : 'inverse', [{value:'direct',label:t('Direct: both increase together','Direta: as duas aumentam juntas')},{value:'inverse',label:t('Inverse: one increases while the other decreases','Inversa: uma aumenta enquanto a outra diminui')}]);
      if (c.before !== c.after) {
        const correct = `${c.numerator}/${c.denominator}`, reverse = `${c.denominator}/${c.numerator}`;
        add(t(`With ${u.before}/x on the left, which comparison fraction represents ${label(c).toLowerCase()}?`, `Com ${u.before}/x à esquerda, qual fração de comparação representa ${label(c).toLowerCase()}?`),
          c.direct ? t('For a direct relationship, use before over now because the left side is known over x.', 'Na relação direta, use antes sobre agora porque à esquerda temos conhecido sobre x.') : t('For an inverse relationship, reverse before/now to now/before. Explain why the change runs in the opposite direction.', 'Na relação inversa, inverta antes/agora para agora/antes. Explique por que a mudança ocorre em sentido contrário.'),
          `${reason} ${t(`This is ${relationship}, so use ${correct}.`, `A relação é ${relationship}, portanto use ${correct}.`)}`, [correct], correct,
          [{value:correct,label:correct},{value:reverse,label:reverse}].sort((a,b)=>a.value.localeCompare(b.value)));
      } else {
        add(t(`${label(c)} remains ${c.before}. What is ${c.before}/${c.after}?`, `${label(c)} permanece em ${c.before}. Quanto vale ${c.before}/${c.after}?`),
          t('Any nonzero number divided by itself is one.', 'Todo número diferente de zero dividido por ele mesmo vale um.'),
          t('An unchanged quantity contributes a factor of one. It does not change the answer.', 'Uma grandeza que não mudou contribui com o fator um. Ela não altera a resposta.'), [`${c.before}/${c.after} = 1`], 1);
      }
    }
    const equation = `${u.before}/x = ${f.map(c=>`${c.numerator}/${c.denominator}`).join(' × ')}`;
    add(t('What is the product of all the numerators?', 'Qual é o produto de todos os numeradores?'),
      t('Multiply the top numbers only, two at a time. Write each intermediate product.', 'Multiplique apenas os números de cima, dois de cada vez. Escreva cada produto intermediário.'),
      t('Multiplying fractions means multiplying the numerators together. Keep every factor; do not add them.', 'Multiplicar frações significa multiplicar os numeradores entre si. Mantenha todos os fatores; não os some.'),
      [equation, ...multiplication(f.map(c=>c.numerator)), `${t('Numerator','Numerador')} = ${n}`], n);
    add(t('What is the product of all the denominators?', 'Qual é o produto de todos os denominadores?'),
      t('Multiply the bottom numbers only, two at a time.', 'Multiplique apenas os números de baixo, dois de cada vez.'),
      t('Multiply the denominators together. The equation now compares two equal fractions.', 'Multiplique os denominadores entre si. A equação agora compara duas frações iguais.'),
      [...multiplication(f.map(c=>c.denominator)), `${u.before}/x = ${n}/${d}`], d);
    add(t('After cross-multiplying, which number multiplies x?', 'Depois de multiplicar cruzado, qual número multiplica x?'),
      t('Pair x with the numerator of the other fraction.', 'Associe x ao numerador da outra fração.'),
      t(`Multiply both sides of ${u.before}/x = ${n}/${d} by x × ${d}. The denominators cancel, leaving ${u.before} × ${d} = ${n} × x. This explains cross-multiplication.`, `Multiplique os dois lados de ${u.before}/x = ${n}/${d} por x × ${d}. Os denominadores se cancelam, restando ${u.before} × ${d} = ${n} × x. Isso explica a multiplicação cruzada.`),
      [`${u.before} × ${d} = ${n} × x`], n);
    add(t(`What is ${u.before} × ${d}?`, `Quanto é ${u.before} × ${d}?`),
      t('Use place value or break one factor into hundreds, tens and ones. Keep the zeros in their places.', 'Use o valor posicional ou decomponha um fator em centenas, dezenas e unidades. Mantenha os zeros em suas posições.'),
      t('This is the known side of the cross-multiplication equation.', 'Este é o lado conhecido da equação após a multiplicação cruzada.'),
      [...String(d).split('').map((digit,i,digits)=>Number(digit)*10**(digits.length-i-1)).filter(Boolean).map(part=>`${u.before} × ${part} = ${u.before * part}`), `${u.before} × ${d} = ${cross}`, `${cross} = ${n}x`], cross);
    add(t('Which number must we divide BOTH sides by to leave x alone?', 'Por qual número devemos dividir OS DOIS lados para deixar x sozinho?'),
      t('What number is multiplying x? Division by that same number undoes the multiplication.', 'Qual número está multiplicando x? Dividir por esse mesmo número desfaz a multiplicação.'),
      t(`Divide both sides by ${n}. Since ${n}x ÷ ${n} = x, we obtain x = ${cross}/${n}.`, `Divida os dois lados por ${n}. Como ${n}x ÷ ${n} = x, obtemos x = ${cross}/${n}.`),
      [`x = ${cross} ÷ ${n}`], n);
    add(t(`Finish the division: what is ${cross} ÷ ${n}?`, `Termine a divisão: quanto é ${cross} ÷ ${n}?`),
      t('Divide using your notebook. You may divide both numbers by a common factor first. Keep zero digits in the quotient.', 'Divida no caderno. Você pode dividir os dois números por um fator comum primeiro. Mantenha os zeros do quociente.'),
      t(`The division gives ${p.answer}. The unit is ${label(u).toLowerCase()}.`, `A divisão resulta em ${p.answer}. A unidade é ${label(u).toLowerCase()}.`),
      division(cross, n, lang), p.answer);
    add(t(`Check the division: what is ${p.answer} × ${n}?`, `Confira a divisão: quanto é ${p.answer} × ${n}?`),
      t('Multiplication reverses division. Your product must recover the dividend.', 'A multiplicação desfaz a divisão. Seu produto deve recuperar o dividendo.'),
      t(`Substituting x = ${p.answer} gives ${cross} = ${n} × ${p.answer}. Both sides agree. Explain why each direct or inverse relationship makes sense, then record the method in your notebook.`, `Substituindo x = ${p.answer}, temos ${cross} = ${n} × ${p.answer}. Os dois lados são iguais. Explique por que cada relação direta ou inversa faz sentido e registre o método no caderno.`),
      [`${p.answer} × ${n} = ${cross}`, `${u.before}/${p.answer} = ${n}/${d}`], cross);
    return out;
  }
  const api = { esc, parseNumber, check, calculation, steps, division };
  if (typeof module !== 'undefined') module.exports = api;
  else root.CompoundCore = api;
})(typeof window === 'undefined' ? globalThis : window);
