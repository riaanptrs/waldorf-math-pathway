// Complete the practice rhythm without changing existing main questions or progress keys.
(() => {
  const { lessons, lessonTranslations: translations, extraPracticeBank: bank } = window;
  const extensions = new Map(window.originalPracticeExtensions.map(row => [row[0], row]));
  if (extensions.size !== window.originalPracticeExtensions.length) throw new Error('Duplicate practice extension');
  const original = Object.fromEntries(['en', 'pt'].map(lang => [lang,
    Object.fromEntries(lessons.map(l => [l.id, [].concat(bank[lang][l.id] || [])]))]));
  // Preserve two older Portuguese-only questions and supply their English partners.
  original.en['g6-fraction-multiplication'].push({ prompt: 'Practice: Calculate 2/5 × 15/16.', answerType: 'expression', acceptedAnswers: ['3/8'], steps: ['2/5 × 15/16 = 30/80 = 3/8.'] });
  original.en['g6-fraction-division'].push({ prompt: 'Practice: Calculate 2/3 ÷ 4/9.', answerType: 'expression', acceptedAnswers: ['3/2','1 1/2'], steps: ['2/3 × 9/4 = 18/12 = 3/2.'] });
  const domains = [
    [/calendar|week|season|clock/, ['Trace the cycle one step at a time. Count intervals, not the starting mark.', 'Percorra o ciclo um passo de cada vez. Conte os intervalos, sem contar a marca inicial.']],
    [/fraction|ribbon-new-parts|hundred-grid/, ['Keep the whole fixed and name the size of each part. Draw equal parts before choosing the operation.', 'Mantenha o inteiro e identifique o tamanho de cada parte. Desenhe partes iguais antes de escolher a operação.']],
    [/subtraction|regroup|place-value|bundles/, ['Keep each place value visible. An exchange changes the grouping, not the total. Check with the inverse operation.', 'Mantenha o valor de cada casa visível. Uma troca muda o agrupamento, mas não o total. Confira com a operação inversa.']],
    [/division/, ['Identify the total, group size and number of groups. Rebuild the total by multiplication, including any remainder.', 'Identifique o total, o tamanho dos grupos e a quantidade de grupos. Reconstrua o total multiplicando e incluindo o resto.']],
    [/ratio|proportion|rate|unit-cost|one-first/, ['Label the quantities and units. Decide whether the same factor, a constant total product, or a starting amount connects them.', 'Identifique as quantidades e unidades. Decida se a relação envolve o mesmo fator, um produto constante ou uma quantidade inicial.']],
    [/percent|interest|growth|budget|market|money|fair|discount/, ['Identify the starting amount and what each amount represents. A percentage is always a percentage of a particular whole.', 'Identifique a quantidade inicial e o significado de cada valor. Uma porcentagem sempre se refere a um inteiro específico.']],
    [/decimal|scientific|binary/, ['Label the place values. Estimate the size, then check any scaling by reversing it.', 'Identifique os valores posicionais. Estime a ordem de grandeza e confira a mudança de escala pela operação inversa.']],
    [/signed|negative-numbers/, ['Keep the sign attached to the number. Distinguish the operation sign from the sign of the quantity.', 'Mantenha o sinal junto do número. Distinga o sinal da operação do sinal da quantidade.']],
    [/exponent|radical/, ['Write repeated factors or factor out a perfect square. Keep the base and exponent roles separate.', 'Escreva os fatores repetidos ou separe um quadrado perfeito. Distinga a base do expoente.']],
    [/algebra|equation|expression|system|quadratic|function|slope|gauss|algorithm/, ['Name the unknown and write the relationship. Preserve equality; test the result in the original relationship.', 'Nomeie a incógnita e escreva a relação. Preserve a igualdade e teste o resultado na relação original.']],
    [/geometry|area|perimeter|square|cube|triangle|pythag|cylinder|trapezoid|shear|distance|diagonal/, ['Sketch and label the figure. Distinguish boundary, surface and volume, and identify perpendicular lengths.', 'Esboce e identifique a figura. Distinga contorno, superfície e volume e reconheça as medidas perpendiculares.']],
    [/measure|mass|capacity|dimensional/, ['Write the unit beside every quantity. Convert to matching units before combining or comparing.', 'Escreva a unidade ao lado de cada quantidade. Converta para unidades iguais antes de juntar ou comparar.']],
    [/divisibility|prime|factor|multiple/, ['Use equal groups or factor pairs. A divisor must leave no remainder.', 'Use grupos iguais ou pares de fatores. Um divisor não pode deixar resto.']],
    [/.*/, ['Model the whole and its parts with objects or a drawing. Check by rebuilding the whole in a second way.', 'Represente o inteiro e as partes com objetos ou desenho. Confira reconstruindo o inteiro de outra maneira.']],
  ];
  // Explicit connections across blocks, with a safe earlier-in-the-course fallback.
  const blockPrerequisite = {
    'Grade 2:Living Time': 'g1-rhythm-counting-twos',
    'Grade 3:Measure Through Work': 'g2-bundles-shop-check',
    'Grade 4:Place Value': 'g3-addition-regrouping',
    'Grade 4:Long Division Stories': 'g2-jarman-turn-the-array',
    'Grade 4:Fraction Beginnings': 'g1-division-fair-sharing',
    'Grade 5:Efficient Long Division': 'g4-division-flexible-chunks',
    'Grade 5:Fraction Path': 'g4-fractions-mixed-improper',
    'Grade 6:Decimal System': 'g5-decimal-count-pieces',
    'Grade 7:Arithmetic Review': 'g6-competency-long-division-check',
    'Grade 7:Ratios & Rates Path': 'g5-jarman-one-first',
    'Grade 7:Álgebra': 'g7-signed-divide-combine',
    'Grade 8:Number Bases': 'g3-place-value-exchange',
    'Grade 8:Proportions & Graphs Path': 'g7-ratios-direct',
    'Grade 9:Algebra I Foundations Path': 'g7-expression-like-terms',
  };
  lessons.forEach((lesson, index) => {
    const prior = lessons.slice(0, index);
    const block = prior.filter(l => l.grade === lesson.grade && l.block === lesson.block);
    const recalled = prior.find(l => l.id === lesson.recallIds?.[0]) || block.at(-2) || block.at(-1)
      || prior.find(l => l.id === blockPrerequisite[`${lesson.grade}:${lesson.block}`])
      || prior.filter(l => l.grade === lesson.grade).at(-3) || prior.at(-1);
    const hints = domains.find(([test]) => test.test(lesson.id))[1];
    const extension = extensions.get(lesson.id);
    const grade = Number(lesson.grade.slice(6));
    const stage = /competency|review|capstone/.test(lesson.id)
      ? ['Apply and explain', 'Aplique e explique'] : block.length ? ['Practice', 'Prática'] : ['Introduction', 'Introdução'];
    for (const [i, lang] of [[0, 'en'], [1, 'pt']]) {
      const copy = lang === 'en' ? lesson : translations[lesson.id];
      copy.learningStage ||= stage[i];
      copy.tutorMistake ||= hints[i];
      copy.teacherObservation ||= (copy.reflectionPrompt || copy.teacherAim) + ' ' + [
        grade <= 3 ? 'Watch the child move or draw the quantities and explain each action before using symbols.' : 'Ask the learner to justify the units, signs or representation and verify the result by a second method.',
        grade <= 3 ? 'Observe a criança mover ou desenhar as quantidades e explicar cada ação antes de usar símbolos.' : 'Peça ao estudante que justifique unidades, sinais ou representação e confira o resultado por outro método.'
      ][i];
      copy.tutorCheck ||= hints[i];
      copy.teachingRhythm = [
        'First encounter: try the discovery with objects, a drawing or a model. Next encounter: use core practice, then the changed context without opening the solution. Return to the review question after intervening work. Record in the notebook what was done independently and what needed support.',
        'Primeiro encontro: experimente a descoberta com objetos, desenho ou modelo. No encontro seguinte, faça a prática central e depois o novo contexto sem abrir a solução. Retome a questão de revisão depois de outras atividades. Registre no caderno o que foi feito com autonomia e o que precisou de apoio.'
      ][i];
      let practice = original[lang][lesson.id].map(item => ({ ...item }));
      if (extension) {
        if (practice.length < 1 || practice.length > 2) throw new Error(`Unexpected existing practice: ${lesson.id}`);
        practice.forEach(item => { item.role = 'practiceCore'; });
        const answer = extension[3];
        practice.push({
          prompt: extension[1 + i], answerType: Array.isArray(answer) ? 'expression' : 'number',
          ...(Array.isArray(answer) ? { acceptedAnswers: answer } : { answer, tolerance: 0.000001 }),
          role: 'practiceTransfer', hint: hints[i], steps: [extension[4]], originalTransfer: true,
        });
        const source = recalled && original[lang][recalled.id][0];
        if (source) practice.push({ ...source, role: 'practiceReview', reviewSourceId: recalled.id,
          prompt: `${["Return to", "Retome"][i]} «${i ? translations[recalled.id].title : recalled.title}»: ${source.prompt}`,
          hint: domains.find(([test]) => test.test(recalled.id))[1][i] });
        else practice.push({
          prompt: ['Place four stones, then take one away. How many remain?', 'Coloque quatro pedras e retire uma. Quantas restam?'][i],
          answerType: 'number', answer: 3, tolerance: 0, role: 'practiceReview', hint: hints[i], steps: ['4 − 1 = 3.']
        });
      }
      if (practice.length < 3 || practice.length > 4) throw new Error(`Missing three-part practice: ${lesson.id}/${lang}`);
      practice.forEach((item, n) => { item.role ||= ['practiceCore','practiceTransfer','practiceReview'][n]; item.hint ||= hints[i]; });
      bank[lang][lesson.id] = practice;
    }
    lesson.curatedPracticeOnly = true;
    if (!lesson.recallIds?.length && recalled) lesson.recallIds = [recalled.id];
  });
})();
