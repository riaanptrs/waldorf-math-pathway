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
  function divisionTrace(dividend, divisor) {
    let a = dividend, b = divisor;
    while (a > 0 && a % 10 === 0 && b % 10 === 0) { a /= 10; b /= 10; }
    let partial = 0, started = false, quotient = '';
    const digits = String(a).split('').map(Number), stages = [];
    digits.forEach((digit, digitIndex) => {
      partial = partial * 10 + digit;
      if (!started && partial < b) return;
      started = true;
      const quotientDigit = Math.floor(partial / b), product = quotientDigit * b, remainder = partial - product;
      quotient += quotientDigit;
      const nextDigit = digits[digitIndex + 1];
      stages.push({digitIndex, partial, quotientDigit, product, remainder, quotient,
        nextDigit: nextDigit ?? null, nextPartial: nextDigit === undefined ? null : remainder * 10 + nextDigit});
      partial = remainder;
    });
    return {dividend, divisor, reducedDividend:a, reducedDivisor:b, stages, quotient:Number(quotient)};
  }
  // A place-aligned written calculation: English bracket or Portuguese chave.
  // Only work already completed (or explicitly explained) is drawn.
  function writtenDivision(spec, lang, reveal = false) {
    if (!spec) return '';
    const t = (en, pt) => lang === 'pt' ? pt : en;
    const trace = divisionTrace(spec.dividend, spec.divisor), {stages} = trace;
    const complete = spec.phase === 'complete', index = complete ? stages.length - 1 : spec.index;
    const digits = String(trace.reducedDividend), cell = 22;
    const left = lang === 'pt' ? 28 : String(trace.reducedDivisor).length * cell + 28;
    const divider = left + digits.length * cell + 14;
    const width = lang === 'pt' ? divider + Math.max(String(trace.reducedDivisor).length, String(trace.quotient).length) * cell + 35 : left + digits.length * cell + 24;
    const height = 145 + index * 64;
    const text = (x,y,value,css='') => [...String(value)].map((digit,i,all)=>`<text x="${x-(all.length-1-i)*cell}" y="${y}" class="${css}" text-anchor="end">${esc(digit)}</text>`).join('');
    const line = (x1,y1,x2,y2,css='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${css}"/>`;
    let image = '', visibleQuotient = '', colourKey = [];
    if (lang === 'pt') {
      image += line(divider,27,divider,96) + line(divider,62,width-12,62) + text(divider+14+String(trace.reducedDivisor).length*cell,51,trace.reducedDivisor);
    } else {
      image += text(left-15,53,trace.reducedDivisor) + line(left-10,31,left-10,60) + line(left-10,31,left+digits.length*cell+3,31);
    }
    [...digits].forEach((digit,i)=> { image += text(left+i*cell+cell,53,digit); });
    const s = stages[index];
    if (index === 0) image = `<rect x="${left-3}" y="34" width="${(s.digitIndex+1)*cell+6}" height="26" rx="4" class="division-active"/>` + image;
    for (let j = 0; j <= index; j++) {
      const stage = stages[j], current = j === index;
      const digitShown = !current || complete || spec.phase !== 'quotient' || reveal;
      const productShown = !current || complete || ['subtract','bring'].includes(spec.phase) || spec.phase === 'product' && reveal;
      const remainderShown = !current || complete || spec.phase === 'bring' || spec.phase === 'subtract' && reveal;
      const brought = stage.nextDigit !== null && (!current || complete || spec.phase === 'bring' && reveal);
      const end = left + (stage.digitIndex+1)*cell, productY = 81+j*64, remainderY = 115+j*64;
      if (digitShown) visibleQuotient += stage.quotientDigit;
      if (lang !== 'pt') image += text(end,23,digitShown?stage.quotientDigit:'?',digitShown?'division-quotient':'division-pending');
      if (productShown) {
        image += text(end-String(stage.product).length*cell-6,productY,'−') + text(end,productY,stage.product);
        image += line(end-Math.max(String(stage.partial).length,String(stage.product).length)*cell-8,productY+7,end+3,productY+7);
      }
      if (remainderShown) {
        if (brought) {
          const nextEnd=end+cell;
          image += text(nextEnd,remainderY,stage.nextPartial,'division-current');
          const colour = `bring-digit-${j % 5}`;
          image += text(nextEnd,53,stage.nextDigit,colour) + text(nextEnd,remainderY,stage.nextDigit,colour);
          image += line(nextEnd-7,61,nextEnd-7,remainderY-23,`division-arrow ${colour}`);
          image += `<path d="M ${nextEnd-11} ${remainderY-29} l 4 7 l 4 -7" class="division-arrow ${colour}"/>`;
          colourKey.push(`<li class="${colour}">${j+1}. ${t(`Bring down ${stage.nextDigit} → ${stage.nextPartial}`, `Baixe ${stage.nextDigit} → ${stage.nextPartial}`)}</li>`);
        } else image += text(end,remainderY,stage.remainder,'division-current');
      }
      if (current && !complete && spec.phase === 'subtract' && !reveal) image += text(end,remainderY,'?','division-pending');
      if (current && !complete && spec.phase === 'bring' && !reveal) {
        image += text(end+cell,remainderY,'?','division-pending');
        image += `<rect x="${end+3}" y="34" width="${cell}" height="26" rx="4" class="division-active"/>` + text(end+cell,53,stage.nextDigit,`bring-digit-${j % 5}`);
        colourKey.push(`<li class="bring-digit-${j % 5}">${j+1}. ${t(`Next: bring down ${stage.nextDigit}`, `A seguir: baixe ${stage.nextDigit}`)}</li>`);
      }
    }
    if (lang === 'pt') image += text(divider+14+(visibleQuotient.length+(!complete&&spec.phase==='quotient'&&!reveal?1:0))*cell,90,visibleQuotient+(!complete&&spec.phase==='quotient'&&!reveal?'?':''),'division-quotient');
    const reduction = trace.reducedDividend !== spec.dividend
      ? `<p>${t('Divide both numbers by the same power of ten; the quotient stays the same.','Divida os dois números pela mesma potência de dez; o quociente permanece igual.')}</p><p class="equation">${spec.dividend} ÷ ${spec.divisor} = ${trace.reducedDividend} ÷ ${trace.reducedDivisor}</p>` : '';
    const description = t(`Written long division: ${trace.reducedDividend} divided by ${trace.reducedDivisor}. Quotient digits shown: ${visibleQuotient || 'none yet'}. The current question appears below the drawing.`, `Divisão armada: ${trace.reducedDividend} dividido por ${trace.reducedDivisor}. Algarismos do quociente mostrados: ${visibleQuotient || 'nenhum ainda'}. A pergunta atual aparece abaixo do desenho.`);
    return `<figure class="written-division"><figcaption>${t('Written long division','Divisão armada')}</figcaption>${reduction}<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(description)}" xmlns="http://www.w3.org/2000/svg"><g>${image}</g></svg><p>${t('Follow the matching colour: the digit at the top, its arrow, and the same digit brought down below. The numbered key also identifies each move.','Siga a mesma cor: o algarismo em cima, sua seta e o mesmo algarismo baixado embaixo. A legenda numerada também identifica cada movimento.')}</p>${colourKey.length?`<ul class="division-key">${colourKey.join('')}</ul>`:''}${divisionReview(lang,trace)}</figure>`;
  }
  function divisionReview(lang, trace) {
    const t = (en,pt) => lang === 'pt' ? pt : en;
    return `<details class="division-refresher"><summary>${t('How long division works: divide, multiply, subtract, bring down','Como funciona a divisão longa: dividir, multiplicar, subtrair, baixar')}</summary><p>${t(`The dividend is the number being divided (${trace.dividend}); the divisor is the group size (${trace.divisor}). The quotient counts the groups; the remainder is what is left.`, `O dividendo é o número que estamos dividindo (${trace.dividend}); o divisor é o tamanho de cada grupo (${trace.divisor}). O quociente conta os grupos; o resto é o que sobra.`)}</p><ol><li>${t('Divide: starting from the left, take enough digits to reach the divisor. Choose the largest quotient digit whose product does not exceed the current part.','Divida: começando pela esquerda, use algarismos suficientes para alcançar o divisor. Escolha o maior algarismo do quociente cujo produto não ultrapasse a parte atual.')}</li><li>${t('Multiply: multiply that quotient digit by the divisor. Write the product underneath, with units aligned.','Multiplique: multiplique esse algarismo do quociente pelo divisor. Escreva o produto embaixo, alinhando as unidades.')}</li><li>${t('Subtract: remove the groups you have counted. The remainder must be smaller than the divisor.','Subtraia: retire os grupos que você já contou. O resto deve ser menor que o divisor.')}</li><li>${t('Bring down: regroup the remainder into the next smaller place-value unit, then add the next digit. Numerically, this is remainder × 10 + next digit. For example, 2 tens become 20 ones; bringing down 3 ones makes 23 ones.','Baixe: transforme o resto em unidades da próxima ordem e acrescente o próximo algarismo. Numericamente: resto × 10 + próximo algarismo. Por exemplo, 2 dezenas viram 20 unidades; baixar mais 3 unidades forma 23 unidades.')}</li><li>${t('Repeat. If the new part is smaller than the divisor, write 0 in that quotient position. A zero remainder does not mean you can stop while digits remain to be brought down.','Repita. Se a nova parte for menor que o divisor, escreva 0 nessa posição do quociente. Ter resto zero não significa que você pode parar enquanto houver algarismos para baixar.')}</li><li>${t('Check: quotient × divisor + remainder must equal the original dividend. These problems all finish with remainder zero.','Confira: quociente × divisor + resto deve ser igual ao dividendo original. Todos estes problemas terminam com resto zero.')}</li></ol><p><a class="division-review-link" href="../index.html#practice:g5-division-two-digit-divisor" target="_blank" rel="noopener">${t('Revise long division with a two-digit divisor','Revisar divisão longa com divisor de dois algarismos')}</a> ${t('(opens in another tab so you can keep this work here).','(abre em outra aba para manter esta resolução aqui).')}</p></details>`;
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
    const trace = divisionTrace(cross,n);
    const divisionStep = (index,phase,...args) => { add(...args); out[out.length-1].division = {dividend:cross,divisor:n,index,phase}; };
    trace.stages.forEach((stage,index) => {
      const b = trace.reducedDivisor;
      divisionStep(index,'quotient',t(`Look at ${stage.partial} in the written division. How many times does ${b} fit without going over? Enter ONE quotient digit.`, `Observe ${stage.partial} na divisão armada. Quantas vezes ${b} cabe sem ultrapassar? Digite UM algarismo do quociente.`),
        t(`Find a multiple of ${b} no greater than ${stage.partial}. The next multiple must be too large. If the partial dividend is smaller than the divisor, write zero.`, `Procure um múltiplo de ${b} que não ultrapasse ${stage.partial}. O múltiplo seguinte deve ser maior. Se o dividendo parcial for menor que o divisor, escreva zero.`),
        t(`Write ${stage.quotientDigit} in the next quotient position. Do not omit this position, even when its digit is zero.`, `Escreva ${stage.quotientDigit} na próxima posição do quociente. Não omita essa posição, mesmo quando seu algarismo for zero.`),
        [`${b} × ${stage.quotientDigit} = ${stage.product} ≤ ${stage.partial}`, `${b} × ${stage.quotientDigit+1} = ${b*(stage.quotientDigit+1)} > ${stage.partial}`], stage.quotientDigit);
      divisionStep(index,'product',t(`Multiply the quotient digit by the divisor: what is ${stage.quotientDigit} × ${b}?`, `Multiplique o algarismo do quociente pelo divisor: quanto é ${stage.quotientDigit} × ${b}?`),
        t('This product is written directly under the partial dividend, aligned by units.','Esse produto é escrito logo abaixo do dividendo parcial, alinhado pelas unidades.'),
        t(`Write ${stage.product} underneath ${stage.partial}. Now we can subtract.`, `Escreva ${stage.product} embaixo de ${stage.partial}. Agora podemos subtrair.`),
        [`${stage.quotientDigit} × ${b} = ${stage.product}`],stage.product);
      divisionStep(index,'subtract',t(`Subtract in the written calculation: what is ${stage.partial} − ${stage.product}?`, `Subtraia na conta armada: quanto é ${stage.partial} − ${stage.product}?`),
        t('Subtract the product from the partial dividend. The remainder must be smaller than the divisor.','Subtraia o produto do dividendo parcial. O resto deve ser menor que o divisor.'),
        t(`The remainder is ${stage.remainder}. It is smaller than ${b}.`, `O resto é ${stage.remainder}. Ele é menor que ${b}.`),
        [`${stage.partial} − ${stage.product} = ${stage.remainder}`],stage.remainder);
      if (stage.nextDigit !== null) divisionStep(index,'bring',t(`Bring down the next digit, ${stage.nextDigit}, beside the remainder ${stage.remainder}. What number does this form?`, `Baixe o próximo algarismo, ${stage.nextDigit}, ao lado do resto ${stage.remainder}. Qual número se forma?`),
        t('The remainder shifts one place to the left: multiply it by ten, then add the digit brought down.','O resto muda uma posição para a esquerda: multiplique-o por dez e some o algarismo baixado.'),
        t(`Bringing down ${stage.nextDigit} forms the next partial dividend, ${stage.nextPartial}. Follow the arrow in the drawing.`, `Baixar ${stage.nextDigit} forma o próximo dividendo parcial, ${stage.nextPartial}. Siga a seta no desenho.`),
        [`${stage.remainder} × 10 + ${stage.nextDigit} = ${stage.nextPartial}`],stage.nextPartial);
    });
    divisionStep(trace.stages.length-1,'complete',t(`Read the whole quotient from the written division: what is ${cross} ÷ ${n}?`, `Leia o quociente completo na divisão armada: quanto é ${cross} ÷ ${n}?`),
      t('Divide using your notebook. You may divide both numbers by a common factor first. Keep zero digits in the quotient.', 'Divida no caderno. Você pode dividir os dois números por um fator comum primeiro. Mantenha os zeros do quociente.'),
      t(`The division gives ${p.answer}. The unit is ${label(u).toLowerCase()}.`, `A divisão resulta em ${p.answer}. A unidade é ${label(u).toLowerCase()}.`),
      division(cross, n, lang), p.answer);
    add(t(`Check the division: what is ${p.answer} × ${n}?`, `Confira a divisão: quanto é ${p.answer} × ${n}?`),
      t('Multiplication reverses division. Your product must recover the dividend.', 'A multiplicação desfaz a divisão. Seu produto deve recuperar o dividendo.'),
      t(`Substituting x = ${p.answer} gives ${cross} = ${n} × ${p.answer}. Both sides agree. Explain why each direct or inverse relationship makes sense, then record the method in your notebook.`, `Substituindo x = ${p.answer}, temos ${cross} = ${n} × ${p.answer}. Os dois lados são iguais. Explique por que cada relação direta ou inversa faz sentido e registre o método no caderno.`),
      [`${p.answer} × ${n} = ${cross}`, `${u.before}/${p.answer} = ${n}/${d}`], cross);
    return out;
  }
  const api = { esc, parseNumber, check, calculation, steps, division, divisionTrace, writtenDivision };
  if (typeof module !== 'undefined') module.exports = api;
  else root.CompoundCore = api;
})(typeof window === 'undefined' ? globalThis : window);
