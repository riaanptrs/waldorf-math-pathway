// Original Grade 7 extension: readiness is based on understanding, not age alone.
(() => {
  const expression = (text, coefficients) => ({ acceptedAnswers: [text], polynomial: coefficients, requireCollected: true });
  window.addLearningSequence(7, ['Algebra: Brackets and Squares', 'Álgebra: parênteses e quadrados'], '244 (general algebra progression; these examples are original extensions)', [
    {
      key: 'algebra-distribute-bracket', title: ['Multiply Every Part', 'Multiplique cada parte'],
      reflection: ['Use your drawing to explain why the factor multiplies both terms. What changes when that factor is negative?', 'Use seu desenho para explicar por que o fator multiplica os dois termos. O que muda quando esse fator é negativo?'],
      recall: ['g7-signed-divide-combine', 'g7-expression-like-terms'],
      warmup: [['Calculate 3 × (4 + 2) in two ways.', 'Calcule 3 × (4 + 2) de duas maneiras.'], ['Explain why 2x + 3x = 5x.', 'Explique por que 2x + 3x = 5x.']],
      materials: ['Paper, ruler and two colours', 'Papel, régua e duas cores'],
      invite: ['Can a rectangle show why the outside factor reaches every term?', 'Um retângulo pode mostrar por que o fator externo multiplica cada termo?'],
      actions: [['Draw a rectangle of height 3, split into widths 2x and 1. Treat x as a positive length in this drawing.', 'Desenhe um retângulo de altura 3, dividido em larguras 2x e 1. Considere x positivo neste desenho.'], ['Label each smaller area as height times width.', 'Identifique cada área menor como altura vezes largura.'], ['Join the two areas. Check the rule with x = 2; then use signed-number multiplication for a negative outside factor.', 'Some as duas áreas. Confira com x = 2; depois use a multiplicação de números com sinal para um fator externo negativo.']],
      question: ['Expand and simplify 3(2x + 1). Enter an expression in x.', 'Desenvolva e simplifique 3(2x + 1). Digite uma expressão em x.'],
      answer: expression('6x+3', [3,6]),
      guided: [['What is 3 × 2, the coefficient of x?', 'Quanto é 3 × 2, o coeficiente de x?', 6], ['What is 3 × 1, the constant part?', 'Quanto é 3 × 1, a parte constante?', 3]],
      idea: ['Distribution multiplies every term inside the bracket by the outside factor.', 'A distributiva multiplica cada termo dentro dos parênteses pelo fator externo.'],
      method: [['Draw or mark one multiplication for each term.', 'Desenhe ou marque uma multiplicação para cada termo.'], ['Carry each sign with its term; combine only like terms.', 'Leve o sinal com cada termo; junte apenas termos semelhantes.']],
      example: ['2(x + 4) = 2x + 8. Also −2(x − 3) = −2x + 6.', '2(x + 4) = 2x + 8. Também −2(x − 3) = −2x + 6.'],
      solution: ['3 × 2x + 3 × 1 = 6x + 3. At x = 2, both expressions equal 15.', '3 × 2x + 3 × 1 = 6x + 3. Para x = 2, ambas as expressões valem 15.'],
      mistake: ['The outside factor multiplies both terms. A negative factor changes both products, not just the first.', 'O fator externo multiplica os dois termos. Um fator negativo afeta os dois produtos, não só o primeiro.'],
      observe: ['Ask the learner to point to both partial areas and explain the signed example. Revisit signed multiplication or like terms if needed.', 'Peça ao estudante que aponte as duas áreas parciais e explique o exemplo com sinais. Retome multiplicação com sinais ou termos semelhantes se necessário.'],
      practice: [
        ['Expand 4(x + 2).', 'Desenvolva 4(x + 2).', expression('4x+8',[8,4]), '4 × x + 4 × 2 = 4x + 8.', '4 × x + 4 × 2 = 4x + 8.'],
        ['Expand −2(3x − 4).', 'Desenvolva −2(3x − 4).', expression('-6x+8',[8,-6]), '−2 × 3x + (−2) × (−4) = −6x + 8.', '−2 × 3x + (−2) × (−4) = −6x + 8.'],
        ['Recall like terms: simplify 3x + 5 + 2x − 1.', 'Retome termos semelhantes: simplifique 3x + 5 + 2x − 1.', expression('5x+4',[4,5]), '3x + 2x = 5x; 5 − 1 = 4.', '3x + 2x = 5x; 5 − 1 = 4.']
      ]
    },
    {
      key: 'algebra-two-brackets', title: ['Four Products Make One Area', 'Quatro produtos formam uma área'],
      reflection: ['Point to all four regions and explain their products. Why can the two x terms combine while x² stays separate?', 'Aponte as quatro regiões e explique seus produtos. Por que os dois termos em x podem ser juntados, enquanto x² fica separado?'],
      recall: ['g7-algebra-distribute-bracket'],
      warmup: [['Expand 2(x + 3).', 'Desenvolva 2(x + 3).'], ['Explain x² as x × x, not 2 × x.', 'Explique x² como x × x, e não 2 × x.']],
      materials: ['Squared paper, ruler and four colours', 'Papel quadriculado, régua e quatro cores'],
      invite: ['What happens when both sides of a rectangle have two parts?', 'O que acontece quando os dois lados de um retângulo têm duas partes?'],
      actions: [['Draw sides x + 2 and x + 3 with x positive.', 'Desenhe lados x + 2 e x + 3, com x positivo.'], ['Split each side at x. Draw the dividing lines to make four regions.', 'Divida cada lado em x. Trace as linhas divisórias para formar quatro regiões.'], ['Write the product for every region, add them and collect the two x terms.', 'Escreva o produto de cada região, some e junte os dois termos em x.']],
      question: ['Expand and simplify (x + 2)(x + 3). Use x^2 or x² for x squared.', 'Desenvolva e simplifique (x + 2)(x + 3). Use x^2 ou x² para x ao quadrado.'],
      answer: expression('x^2+5x+6',[6,5,1]),
      guided: [['What is 2 × 3, the constant area?', 'Quanto é 2 × 3, a área constante?', 6], ['What is 3 + 2, the combined coefficient of x?', 'Quanto é 3 + 2, o coeficiente total de x?', 5]],
      idea: ['Each term in the first bracket multiplies each term in the second: four products before collecting.', 'Cada termo dos primeiros parênteses multiplica cada termo dos segundos: quatro produtos antes de juntar.'],
      method: [['Use a two-by-two multiplication grid.', 'Use uma tabela de multiplicação de duas linhas por duas colunas.'], ['Add all four entries; combine only terms with the same power of x.', 'Some as quatro entradas; junte apenas termos com a mesma potência de x.']],
      example: ['(x + 1)(x + 4) = x² + 4x + x + 4 = x² + 5x + 4.', '(x + 1)(x + 4) = x² + 4x + x + 4 = x² + 5x + 4.'],
      solution: ['The areas are x², 3x, 2x and 6. Together: x² + 5x + 6. At x = 2, both forms equal 20.', 'As áreas são x², 3x, 2x e 6. Juntas: x² + 5x + 6. Para x = 2, ambas as formas valem 20.'],
      mistake: ['Account for all four products. x² and x are different kinds of terms and cannot be collected together.', 'Inclua os quatro produtos. x² e x são tipos diferentes de termos e não podem ser juntados.'],
      observe: ['The learner should connect each product to a region and distinguish x × x from x + x. A substitution checks an example, while distribution explains the identity.', 'O estudante deve ligar cada produto a uma região e distinguir x × x de x + x. Uma substituição confere um exemplo; a distributiva explica a identidade.'],
      practice: [
        ['Expand and simplify (x + 1)(x + 5).', 'Desenvolva e simplifique (x + 1)(x + 5).', expression('x^2+6x+5',[5,6,1]), 'x² + 5x + x + 5 = x² + 6x + 5.', 'x² + 5x + x + 5 = x² + 6x + 5.'],
        ['A rectangle has sides 2x + 1 and x + 3. Expand its area expression.', 'Um retângulo tem lados 2x + 1 e x + 3. Desenvolva a expressão de sua área.', expression('2x^2+7x+3',[3,7,2]), '2x² + 6x + x + 3 = 2x² + 7x + 3.', '2x² + 6x + x + 3 = 2x² + 7x + 3.'],
        ['Return to one bracket: expand −3(x − 2).', 'Retome um par de parênteses: desenvolva −3(x − 2).', expression('-3x+6',[6,-3]), '−3x + 6.', '−3x + 6.']
      ]
    },
    {
      key: 'algebra-square-sum', title: ['Square a Sum: (2x + 2)²', 'Quadrado da soma: (2x + 2)²'],
      reflection: ['Show where both 4x regions appear in your square. Explain why leaving out 8x loses part of the area. Try a new squared sum in your notebook.', 'Mostre onde aparecem as duas regiões de 4x no seu quadrado. Explique por que omitir 8x elimina parte da área. Experimente um novo quadrado de soma no caderno.'],
      recall: ['g7-algebra-two-brackets'],
      warmup: [['Compare (3 + 2)² with 3² + 2². Are they equal?', 'Compare (3 + 2)² com 3² + 2². São iguais?'], ['Write (x + 1)² as two identical factors.', 'Escreva (x + 1)² como dois fatores iguais.']],
      materials: ['Paper, ruler and four colours', 'Papel, régua e quatro cores'],
      invite: ['Where do the middle terms in a squared bracket come from?', 'De onde vêm os termos do meio no quadrado de uma soma?'],
      actions: [['Draw a square with side 2x + 2, taking x positive for the drawing.', 'Desenhe um quadrado de lado 2x + 2, considerando x positivo no desenho.'], ['Split both sides into 2x and 2. Shade the large square, the two rectangles and the small square differently.', 'Divida os dois lados em 2x e 2. Pinte de formas distintas o quadrado grande, os dois retângulos e o quadrado pequeno.'], ['Calculate all four products. Join the two equal rectangle areas before writing the simplified expression.', 'Calcule os quatro produtos. Some as áreas dos dois retângulos iguais antes de escrever a expressão simplificada.']],
      question: ['Expand and simplify (2x + 2)². Enter your answer using x² or x^2; collect like terms.', 'Desenvolva e simplifique (2x + 2)². Digite a resposta usando x² ou x^2; junte os termos semelhantes.'],
      answer: expression('4x^2+8x+4',[4,8,4]),
      guided: [['What is the coefficient of x² in (2x)(2x)?', 'Qual é o coeficiente de x² em (2x)(2x)?', 4], ['Each of two rectangles has area 4x. What is the combined coefficient of x?', 'Cada um dos dois retângulos tem área 4x. Qual é o coeficiente total de x?', 8]],
      idea: ['(a + b)² = (a + b)(a + b) = a² + 2ab + b². The two cross-products make the middle term.', '(a + b)² = (a + b)(a + b) = a² + 2ab + b². Os dois produtos cruzados formam o termo do meio.'],
      method: [['Rewrite the square as two identical brackets.', 'Reescreva o quadrado como dois fatores iguais entre parênteses.'], ['Multiply all four pairs, then collect the two middle terms.', 'Multiplique os quatro pares e depois junte os dois termos do meio.']],
      example: ['(x + 3)² = x² + 3x + 3x + 9 = x² + 6x + 9.', '(x + 3)² = x² + 3x + 3x + 9 = x² + 6x + 9.'],
      solution: ['(2x + 2)(2x + 2) = 4x² + 4x + 4x + 4 = 4x² + 8x + 4. At x = 1, both forms equal 16. Omitting 8x gives only 8.', '(2x + 2)(2x + 2) = 4x² + 4x + 4x + 4 = 4x² + 8x + 4. Para x = 1, ambas as formas valem 16. Omitir 8x dá apenas 8.'],
      mistake: ['Squaring a sum does not mean squaring each term separately. Look for both cross-products, then collect like terms.', 'Elevar uma soma ao quadrado não é elevar cada termo separadamente. Procure os dois produtos cruzados e junte os termos semelhantes.'],
      observe: ['Ask the learner to point to the two 4x regions, explain the 8x term and expand a fresh square without copying the identity. Numerical checking alone is not a proof.', 'Peça ao estudante que aponte as duas regiões de 4x, explique o termo 8x e desenvolva um novo quadrado sem copiar a identidade. Uma conferência numérica sozinha não é uma demonstração.'],
      practice: [
        ['Expand and simplify (x + 4)².', 'Desenvolva e simplifique (x + 4)².', expression('x^2+8x+16',[16,8,1]), 'x² + 4x + 4x + 16 = x² + 8x + 16.', 'x² + 4x + 4x + 16 = x² + 8x + 16.'],
        ['A square has side 3x + 1. Expand its area expression.', 'Um quadrado tem lado 3x + 1. Desenvolva a expressão de sua área.', expression('9x^2+6x+1',[1,6,9]), '9x² + 3x + 3x + 1 = 9x² + 6x + 1.', '9x² + 3x + 3x + 1 = 9x² + 6x + 1.'],
        ['Recall two different brackets: expand (x + 2)(x + 4).', 'Retome dois fatores diferentes: desenvolva (x + 2)(x + 4).', expression('x^2+6x+8',[8,6,1]), 'x² + 4x + 2x + 8 = x² + 6x + 8.', 'x² + 4x + 2x + 8 = x² + 6x + 8.']
      ]
    },
    {
      key: 'algebra-square-difference', title: ['Square a Difference', 'Quadrado da diferença'], stage: 'practice',
      reflection: ['Explain the signs of all four products. Why is the constant positive even though the bracket contains subtraction?', 'Explique os sinais dos quatro produtos. Por que a constante é positiva, embora haja uma subtração nos parênteses?'],
      recall: ['g7-algebra-square-sum', 'g7-signed-product-pattern'],
      warmup: [['What is (−2)(−2)?', 'Quanto é (−2)(−2)?'], ['What is 3x(−2)? Keep the sign.', 'Quanto é 3x(−2)? Preserve o sinal.']],
      materials: ['Paper and a two-by-two product grid', 'Papel e uma tabela de produtos de duas linhas por duas colunas'],
      invite: ['If the bracket contains subtraction, which products change sign?', 'Se há uma subtração nos parênteses, quais produtos mudam de sinal?'],
      actions: [['Rewrite (3x − 2)² as (3x − 2)(3x − 2).', 'Reescreva (3x − 2)² como (3x − 2)(3x − 2).'], ['Label both grid headers 3x and −2. This is a signed multiplication table, not a picture of negative lengths.', 'Identifique os dois cabeçalhos da tabela com 3x e −2. Esta é uma tabela de multiplicação com sinais, não um desenho de comprimentos negativos.'], ['Calculate each entry, collect like terms and check a chosen value of x.', 'Calcule cada entrada, junte os termos semelhantes e confira um valor escolhido de x.']],
      question: ['Expand and simplify (3x − 2)².', 'Desenvolva e simplifique (3x − 2)².'],
      answer: expression('9x^2-12x+4',[4,-12,9]),
      guided: [['What is the coefficient in 3x(−2) + (−2)3x?', 'Qual é o coeficiente em 3x(−2) + (−2)3x?', -12], ['What is (−2)(−2)?', 'Quanto é (−2)(−2)?', 4]],
      idea: ['(a − b)² = a² − 2ab + b². The last term is positive because it is the product of two negatives.', '(a − b)² = a² − 2ab + b². O último termo é positivo porque é o produto de dois negativos.'],
      method: [['Carry the negative sign into both cross-products.', 'Leve o sinal negativo para os dois produtos cruzados.'], ['Multiply the two negative constants, then collect like terms.', 'Multiplique as duas constantes negativas e depois junte os termos semelhantes.']],
      example: ['(x − 5)² = x² − 5x − 5x + 25 = x² − 10x + 25.', '(x − 5)² = x² − 5x − 5x + 25 = x² − 10x + 25.'],
      solution: ['9x² − 6x − 6x + 4 = 9x² − 12x + 4. At x = 1, both forms equal 1.', '9x² − 6x − 6x + 4 = 9x² − 12x + 4. Para x = 1, ambas as formas valem 1.'],
      mistake: ['The two middle products are negative; the product of the two negative constants is positive.', 'Os dois produtos do meio são negativos; o produto das duas constantes negativas é positivo.'],
      observe: ['Ask for a signed product table and an explanation of the positive constant. Return to signed multiplication if signs are guessed.', 'Peça uma tabela de produtos com sinais e uma explicação da constante positiva. Retome multiplicação com sinais se os sinais forem adivinhados.'],
      practice: [
        ['Expand (x − 3)².', 'Desenvolva (x − 3)².', expression('x^2-6x+9',[9,-6,1]), 'x² − 3x − 3x + 9 = x² − 6x + 9.', 'x² − 3x − 3x + 9 = x² − 6x + 9.'],
        ['Expand (2x − 1)².', 'Desenvolva (2x − 1)².', expression('4x^2-4x+1',[1,-4,4]), '4x² − 2x − 2x + 1 = 4x² − 4x + 1.', '4x² − 2x − 2x + 1 = 4x² − 4x + 1.'],
        ['Recall the square of a sum: expand (x + 2)².', 'Retome o quadrado da soma: desenvolva (x + 2)².', expression('x^2+4x+4',[4,4,1]), 'x² + 2x + 2x + 4 = x² + 4x + 4.', 'x² + 2x + 2x + 4 = x² + 4x + 4.']
      ]
    },
    {
      key: 'algebra-opposite-brackets', title: ['When the Middle Terms Cancel', 'Quando os termos do meio se anulam'], stage: 'transfer',
      reflection: ['Compare a squared sum with opposite-sign brackets. Explain when the middle terms add and when they cancel.', 'Compare o quadrado de uma soma com fatores de sinais opostos. Explique quando os termos do meio se somam e quando se anulam.'],
      recall: ['g7-algebra-square-difference', 'g7-algebra-two-brackets'],
      warmup: [['Calculate 5 + (−5).', 'Calcule 5 + (−5).'], ['Compare the brackets in (x + 2)² and (x + 2)(x − 2). What changed?', 'Compare os fatores em (x + 2)² e (x + 2)(x − 2). O que mudou?']],
      materials: ['Paper and a two-by-two product grid', 'Papel e uma tabela de produtos de duas linhas por duas colunas'],
      invite: ['Why do some products have no middle term, although a squared sum does?', 'Por que alguns produtos não têm termo do meio, embora o quadrado de uma soma tenha?'],
      actions: [['Use column headers 2x and +3, with row headers 2x and −3.', 'Use os cabeçalhos de coluna 2x e +3 e os cabeçalhos de linha 2x e −3.'], ['Calculate all four entries before cancelling anything.', 'Calcule as quatro entradas antes de cancelar qualquer termo.'], ['Pair the equal and opposite x terms, then compare with the square of a sum.', 'Agrupe os termos em x iguais e opostos e depois compare com o quadrado de uma soma.']],
      question: ['Expand and simplify (2x + 3)(2x − 3).', 'Desenvolva e simplifique (2x + 3)(2x − 3).'],
      answer: expression('4x^2-9',[-9,0,4]),
      guided: [['What is the coefficient of x after combining −6x and +6x?', 'Qual é o coeficiente de x depois de juntar −6x e +6x?', 0], ['What is (+3)(−3)?', 'Quanto é (+3)(−3)?', -9]],
      idea: ['(a + b)(a − b) = a² − b² because the cross-products are opposites. This differs from (a + b)².', '(a + b)(a − b) = a² − b² porque os produtos cruzados são opostos. Isso difere de (a + b)².'],
      method: [['Read both brackets carefully before choosing an identity.', 'Leia os dois fatores com atenção antes de escolher uma identidade.'], ['Use four products to justify any cancellation.', 'Use quatro produtos para justificar qualquer cancelamento.']],
      example: ['(x + 4)(x − 4) = x² − 4x + 4x − 16 = x² − 16.', '(x + 4)(x − 4) = x² − 4x + 4x − 16 = x² − 16.'],
      solution: ['4x² − 6x + 6x − 9 = 4x² − 9. At x = 2, both forms equal 7.', '4x² − 6x + 6x − 9 = 4x² − 9. Para x = 2, ambas as formas valem 7.'],
      mistake: ['Middle terms cancel only when they are opposites. In a squared sum they have the same sign and must be added.', 'Os termos do meio só se anulam quando são opostos. No quadrado de uma soma eles têm o mesmo sinal e devem ser somados.'],
      observe: ['Mix a squared sum, squared difference and opposite-sign pair. Ask the learner to identify and justify the pattern before expanding.', 'Misture um quadrado de soma, um quadrado de diferença e um par de sinais opostos. Peça ao estudante que identifique e justifique o padrão antes de desenvolver.'],
      practice: [
        ['Expand (x + 5)(x − 5).', 'Desenvolva (x + 5)(x − 5).', expression('x^2-25',[-25,0,1]), 'x² − 5x + 5x − 25 = x² − 25.', 'x² − 5x + 5x − 25 = x² − 25.'],
        ['Expand (3x + 2)(3x − 2).', 'Desenvolva (3x + 2)(3x − 2).', expression('9x^2-4',[-4,0,9]), '9x² − 6x + 6x − 4 = 9x² − 4.', '9x² − 6x + 6x − 4 = 9x² − 4.'],
        ['Return to a squared sum: expand (2x + 1)².', 'Retome um quadrado de soma: desenvolva (2x + 1)².', expression('4x^2+4x+1',[1,4,4]), '4x² + 2x + 2x + 1 = 4x² + 4x + 1.', '4x² + 2x + 2x + 1 = 4x² + 4x + 1.']
      ]
    }
  ]);
  for (const [id, columns, rows] of [
    ['g7-algebra-two-brackets', ['x','2'], ['x','3']],
    ['g7-algebra-square-sum', ['2x','2'], ['2x','2']],
    ['g7-algebra-square-difference', ['3x','−2'], ['3x','−2']],
    ['g7-algebra-opposite-brackets', ['2x','3'], ['2x','−3']],
  ]) {
    const signed = rows.some(s => s.includes('−'));
    const model = { columns, rows, caption: signed ? 'Signed product grid — calculate each cell' : 'Area model — calculate each region' };
    window.lessons.find(l => l.id === id).algebraAreaModel = model;
    window.lessonTranslations[id].algebraAreaModel = { ...model, caption: signed ? 'Tabela de produtos com sinais — calcule cada célula' : 'Modelo de área — calcule cada região' };
  }
})();
