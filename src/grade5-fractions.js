(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };

  const fractionLessons = [
    {
      id: "g5-fractions-equivalent-visual", activityKey: "g5-math-fractions-equivalent-visual", grade: "Grade 5", block: "Fraction Path", title: "Equal Amounts, Different Names", time: "16 min",
      sourceFocus: "Original Grade 5 fraction discovery: recognise equivalence through equal lengths.", teacherAim: "Learners see equivalence before using multiplication rules.",
      visualModel: [{ parts: 2, shaded: 1, label: "1/2" }, { parts: 4, shaded: 2, label: "2/4" }],
      memoryRefresh: { idea: "Equivalent fractions name the same amount with different-sized pieces.", method: ["Compare the shaded lengths.", "Notice how every piece was divided.", "Multiply numerator and denominator by the same number.", "Check that the amount did not change."], example: "1/2 and 2/4 cover the same length." },
      rhythm: ["Look at the whole.", "Compare the shaded length.", "Name the equal fractions."], prompt: "Complete the equivalence: 3/4 = ?/8. Enter the missing numerator.", correction: "Each fourth was split into two eighths. Multiply both 3 and 4 by 2, so 3/4 = 6/8.", answerType: "number", answer: 6, tolerance: 0,
      guidedSteps: [{ label: "What number turns 4 into 8?", answerType: "number", answer: 2 }, { label: "Multiply 3 by that number.", answerType: "number", answer: 6 }],
    },
    {
      id: "g5-fractions-reduce-gcf", activityKey: "g5-math-fractions-reduce-gcf", grade: "Grade 5", block: "Fraction Path", title: "Find the Simplest Name", time: "17 min",
      sourceFocus: "Original Grade 5 fraction work: reduce with common factors.", teacherAim: "Learners connect grouping with greatest common factor.",
      visualModel: [{ parts: 8, shaded: 6, label: "6/8" }, { parts: 4, shaded: 3, label: "3/4" }],
      memoryRefresh: { idea: "Reducing changes the name of a fraction, not its size.", method: ["List factors shared by numerator and denominator.", "Choose the greatest shared factor.", "Divide top and bottom by it.", "Check that no larger common factor remains."], example: "6/8 ÷ 2/2 = 3/4." },
      rhythm: ["Find a shared factor.", "Divide both parts.", "Check the simplest name."], prompt: "Reduce 18/24 to its simplest form.", correction: "The greatest common factor is 6. Divide 18 and 24 by 6 to get 3/4.", answerType: "expression", acceptedAnswers: ["3/4"],
      guidedSteps: [{ label: "What is the greatest common factor of 18 and 24?", answerType: "number", answer: 6 }, { label: "18 divided by 6", answerType: "number", answer: 3 }, { label: "24 divided by 6", answerType: "number", answer: 4 }],
    },
    {
      id: "g5-fractions-common-denominator", activityKey: "g5-math-fractions-common-denominator", grade: "Grade 5", block: "Fraction Path", title: "Combine Equal-Sized Pieces", time: "16 min",
      sourceFocus: "Original Grade 5 fraction work: add and subtract like denominators.", teacherAim: "Learners distinguish the number of pieces from their size.",
      visualModel: [{ parts: 7, shaded: 2, label: "2/7" }, { parts: 7, shaded: 3, label: "+ 3/7" }],
      memoryRefresh: { idea: "When pieces have the same size, combine how many pieces you have and keep their name.", method: ["Check that denominators match.", "Add or subtract the numerators.", "Keep the denominator.", "Reduce if possible."], example: "2/7 + 3/7 = 5/7." },
      rhythm: ["Same-sized pieces?", "Combine the top numbers.", "Keep the piece size."], prompt: "Calculate 5/9 + 2/9.", correction: "The ninths are equal-sized pieces. Add 5 + 2 and keep ninths: 7/9.", answerType: "expression", acceptedAnswers: ["7/9"],
    },
    {
      id: "g5-fractions-improper-to-mixed", activityKey: "g5-math-fractions-improper-to-mixed", grade: "Grade 5", block: "Fraction Path", title: "Build Wholes from Extra Pieces", time: "17 min",
      sourceFocus: "Original Grade 5 fraction work: improper fractions to mixed numbers.", teacherAim: "Learners visualise quantities greater than one before using division.",
      visualModel: [{ parts: 4, shaded: 4, label: "4/4" }, { parts: 4, shaded: 3, label: "+ 3/4" }],
      memoryRefresh: { idea: "An improper fraction can contain one or more complete wholes.", method: ["Ask how many denominators fit into the numerator.", "The quotient is the whole number.", "The remainder becomes the new numerator.", "Keep the denominator."], example: "7/4 is 1 whole and 3/4." },
      rhythm: ["Build complete wholes.", "Count what remains.", "Keep the piece size."], prompt: "Write 11/4 as a mixed number.", correction: "Four fits into eleven twice with three remaining. Therefore 11/4 = 2 3/4.", answerType: "expression", acceptedAnswers: ["2 3/4", "2+3/4", "2¾"],
      guidedSteps: [{ label: "How many complete groups of 4 fit in 11?", answerType: "number", answer: 2 }, { label: "How many fourths remain?", answerType: "number", answer: 3 }],
    },
    {
      id: "g5-fractions-mixed-to-improper", activityKey: "g5-math-fractions-mixed-to-improper", grade: "Grade 5", block: "Fraction Path", title: "Rename Every Whole as Pieces", time: "17 min",
      sourceFocus: "Original Grade 5 fraction work: mixed numbers to improper fractions.", teacherAim: "Learners understand why whole × denominator + numerator counts all pieces.",
      visualModel: [{ parts: 5, shaded: 5, label: "1 whole" }, { parts: 5, shaded: 5, label: "1 whole" }, { parts: 5, shaded: 2, label: "+ 2/5" }],
      memoryRefresh: { idea: "A mixed number can be renamed by counting all of its equal-sized pieces.", method: ["Multiply wholes by the denominator.", "Add the numerator.", "Place that total over the original denominator.", "Check by rebuilding the wholes."], example: "2 2/5 contains 10 fifths plus 2 fifths, or 12/5." },
      rhythm: ["Rename each whole.", "Add the extra pieces.", "Keep the denominator."], prompt: "Write 3 2/5 as an improper fraction.", correction: "Three wholes contain 15 fifths. Add 2 more fifths: 17/5.", answerType: "expression", acceptedAnswers: ["17/5"],
      guidedSteps: [{ label: "3 times 5", answerType: "number", answer: 15 }, { label: "Add the numerator 2.", answerType: "number", answer: 17 }],
    },
    {
      id: "g5-fractions-unlike-denominators", activityKey: "g5-math-fractions-unlike-denominators", grade: "Grade 5", block: "Fraction Path", title: "Make the Pieces Match", time: "19 min",
      sourceFocus: "Original Grade 5 fraction work: add unlike denominators through equivalence.", teacherAim: "Learners see common denominators as equal-sized pieces, not a rule to memorise.",
      visualModel: [{ parts: 3, shaded: 1, label: "1/3" }, { parts: 6, shaded: 1, label: "+ 1/6" }],
      memoryRefresh: { idea: "Unlike fractions must be renamed with equal-sized pieces before combining.", method: ["Find a common multiple of the denominators.", "Rename both fractions.", "Combine the numerators.", "Reduce the result."], example: "1/3 + 1/6 becomes 2/6 + 1/6 = 3/6 = 1/2." },
      rhythm: ["Choose one piece size.", "Rename both fractions.", "Combine and reduce."], prompt: "Calculate 2/3 + 1/4.", correction: "Use twelfths: 2/3 = 8/12 and 1/4 = 3/12. The sum is 11/12.", answerType: "expression", acceptedAnswers: ["11/12"],
      guidedSteps: [{ label: "A common denominator for 3 and 4", answerType: "number", answer: 12 }, { label: "2/3 rewritten in twelfths: numerator", answerType: "number", answer: 8 }, { label: "1/4 rewritten in twelfths: numerator", answerType: "number", answer: 3 }],
    },
    {
      id: "g5-fractions-compare", activityKey: "g5-math-fractions-compare", grade: "Grade 5", block: "Fraction Path", title: "Which Share Is Larger?", time: "16 min",
      sourceFocus: "Original Grade 5 fraction work: compare fractions through size and common names.", teacherAim: "Learners estimate before using a numerical comparison.",
      visualModel: [{ parts: 5, shaded: 3, label: "3/5" }, { parts: 8, shaded: 5, label: "5/8" }],
      memoryRefresh: { idea: "Estimate each fraction against one half, then use a common denominator or cross-products to confirm.", method: ["Estimate both amounts.", "Cross multiply or find a common denominator.", "Compare the resulting numbers.", "Return to the original fractions."], example: "For 3/5 and 5/8, compare 3×8=24 with 5×5=25, so 5/8 is larger." },
      rhythm: ["Estimate first.", "Compare equal names.", "State the larger share."], prompt: "Which is larger: 4/7 or 5/9? Enter the fraction.", correction: "Compare cross-products: 4×9=36 and 5×7=35. Since 36 is larger, 4/7 is larger.", answerType: "expression", acceptedAnswers: ["4/7"],
    },
    {
      id: "g5-fractions-multiply-cancel", activityKey: "g5-math-fractions-multiply-cancel", grade: "Grade 5", block: "Fraction Path", title: "Multiply with Smaller Numbers", time: "18 min",
      sourceFocus: "Original Grade 5 fraction work: multiplication and cancelling.", teacherAim: "Learners connect cancellation with dividing by a shared factor.",
      visualModel: [{ parts: 3, shaded: 2, label: "2/3" }, { parts: 4, shaded: 3, label: "of 3/4" }],
      memoryRefresh: { idea: "Multiplying fractions means taking a fraction of another amount. Cancelling simplifies before multiplying.", method: ["Look diagonally for common factors.", "Divide those numbers by the shared factor.", "Multiply remaining numerators.", "Multiply remaining denominators."], example: "2/3 × 3/4 cancels the 3s, leaving 2/4 = 1/2." },
      rhythm: ["Look for shared factors.", "Cancel equally.", "Multiply and reduce."], prompt: "Calculate 4/9 × 3/8 in simplest form.", correction: "Cancel 4 with 8 to 1 and 2; cancel 3 with 9 to 1 and 3. The result is 1/6.", answerType: "expression", acceptedAnswers: ["1/6"],
    },
    {
      id: "g5-fractions-divide-reciprocal", activityKey: "g5-math-fractions-divide-reciprocal", grade: "Grade 5", block: "Fraction Path", title: "How Many Groups Fit?", time: "18 min",
      sourceFocus: "Original Grade 5 fraction work: division and reciprocal multiplication.", teacherAim: "Learners connect fraction division with measuring equal groups.",
      visualModel: [{ parts: 4, shaded: 3, label: "3/4" }, { parts: 8, shaded: 1, label: "groups of 1/8" }],
      memoryRefresh: { idea: "Division asks how many groups fit. Dividing by a fraction can be calculated by multiplying by its reciprocal.", method: ["Keep the first fraction.", "Replace division with multiplication.", "Turn the divisor upside down.", "Multiply and reduce."], example: "3/4 ÷ 1/8 = 3/4 × 8/1 = 6." },
      rhythm: ["Keep the first.", "Change division to multiplication.", "Turn the second and solve."], prompt: "Calculate 2/3 ÷ 4/5.", correction: "Multiply by the reciprocal: 2/3 × 5/4 = 10/12 = 5/6.", answerType: "expression", acceptedAnswers: ["5/6"],
    },
    {
      id: "g5-fractions-path-review", activityKey: "g5-math-fractions-path-review", grade: "Grade 5", block: "Fraction Path", title: "Fraction Path Review", time: "20 min",
      sourceFocus: "Original Grade 5 cumulative fraction review.", teacherAim: "Learners select a method independently and explain how they checked it.",
      visualModel: [{ parts: 6, shaded: 5, label: "5/6" }, { parts: 3, shaded: 1, label: "− 1/3" }],
      memoryRefresh: { idea: "Before calculating, name the kind of fraction problem and choose the matching tool.", method: ["Identify the operation.", "Estimate the answer's size.", "Choose equivalent pieces, cancellation, or reciprocal work.", "Solve, reduce, and check."], example: "5/6 − 1/3 uses sixths: 5/6 − 2/6 = 3/6 = 1/2." },
      rhythm: ["Name the problem type.", "Estimate.", "Solve and explain the check."], prompt: "Calculate 5/6 − 1/4 in simplest form.", correction: "Use twelfths: 5/6 = 10/12 and 1/4 = 3/12. Subtract to get 7/12.", answerType: "expression", acceptedAnswers: ["7/12"],
    },
  ];

  const pt = {
    "g5-fractions-equivalent-visual": { block: "Caminho das Frações", title: "Mesma Quantidade, Nomes Diferentes", prompt: "Complete: 3/4 = ?/8. Digite o numerador que falta.", correction: "Cada quarto foi dividido em dois oitavos. Multiplique 3 e 4 por 2: 3/4 = 6/8.", memoryRefresh: { idea: "Frações equivalentes nomeiam a mesma quantidade com pedaços de tamanhos diferentes.", method: ["Compare os comprimentos pintados.", "Observe como cada pedaço foi dividido.", "Multiplique numerador e denominador pelo mesmo número.", "Confira que a quantidade não mudou."], example: "1/2 e 2/4 cobrem o mesmo comprimento." }, rhythm: ["Olhe o inteiro.", "Compare a parte pintada.", "Nomeie as frações iguais."], guidedSteps: [{ label: "Que número transforma 4 em 8?", answerType: "number", answer: 2 }, { label: "Multiplique 3 por esse número.", answerType: "number", answer: 6 }] },
    "g5-fractions-reduce-gcf": { block: "Caminho das Frações", title: "Encontre o Nome Mais Simples", prompt: "Reduza 18/24 à forma mais simples.", correction: "O máximo divisor comum é 6. Divida 18 e 24 por 6 para obter 3/4.", memoryRefresh: { idea: "Reduzir muda o nome da fração, não seu tamanho.", method: ["Liste fatores comuns.", "Escolha o maior fator comum.", "Divida a parte de cima e a de baixo.", "Confira se ainda há fator comum."], example: "6/8 ÷ 2/2 = 3/4." }, rhythm: ["Ache um fator comum.", "Divida as duas partes.", "Confira o nome mais simples."], guidedSteps: [{ label: "Qual é o máximo divisor comum de 18 e 24?", answerType: "number", answer: 6 }, { label: "18 dividido por 6", answerType: "number", answer: 3 }, { label: "24 dividido por 6", answerType: "number", answer: 4 }] },
    "g5-fractions-common-denominator": { block: "Caminho das Frações", title: "Junte Pedaços do Mesmo Tamanho", prompt: "Calcule 5/9 + 2/9.", correction: "Os nonos têm o mesmo tamanho. Some 5 + 2 e mantenha os nonos: 7/9.", memoryRefresh: { idea: "Quando os pedaços têm o mesmo tamanho, junte quantos você tem e mantenha o nome deles.", method: ["Confira os denominadores.", "Some ou subtraia os numeradores.", "Mantenha o denominador.", "Reduza se puder."], example: "2/7 + 3/7 = 5/7." }, rhythm: ["Pedaços iguais?", "Junte os números de cima.", "Mantenha o tamanho."] },
    "g5-fractions-improper-to-mixed": { block: "Caminho das Frações", title: "Construa Inteiros com Pedaços", prompt: "Escreva 11/4 como número misto.", correction: "Quatro cabe em onze duas vezes e sobram três. Portanto, 11/4 = 2 3/4.", memoryRefresh: { idea: "Uma fração imprópria pode conter um ou mais inteiros.", method: ["Veja quantas vezes o denominador cabe no numerador.", "O quociente é o inteiro.", "O resto vira o novo numerador.", "Mantenha o denominador."], example: "7/4 é 1 inteiro e 3/4." }, rhythm: ["Construa inteiros.", "Conte o que sobra.", "Mantenha o tamanho dos pedaços."], guidedSteps: [{ label: "Quantos grupos completos de 4 cabem em 11?", answerType: "number", answer: 2 }, { label: "Quantos quartos sobram?", answerType: "number", answer: 3 }] },
    "g5-fractions-mixed-to-improper": { block: "Caminho das Frações", title: "Renomeie Cada Inteiro como Pedaços", prompt: "Escreva 3 2/5 como fração imprópria.", correction: "Três inteiros contêm 15 quintos. Some mais 2 quintos: 17/5.", memoryRefresh: { idea: "Um número misto pode ser renomeado contando todos os pedaços iguais.", method: ["Multiplique os inteiros pelo denominador.", "Some o numerador.", "Coloque o total sobre o denominador original.", "Confira reconstruindo os inteiros."], example: "2 2/5 contém 10 quintos mais 2 quintos: 12/5." }, rhythm: ["Renomeie cada inteiro.", "Some os pedaços extras.", "Mantenha o denominador."], guidedSteps: [{ label: "3 vezes 5", answerType: "number", answer: 15 }, { label: "Some o numerador 2.", answerType: "number", answer: 17 }] },
    "g5-fractions-unlike-denominators": { block: "Caminho das Frações", title: "Faça os Pedaços Combinarem", prompt: "Calcule 2/3 + 1/4.", correction: "Use doze avos: 2/3 = 8/12 e 1/4 = 3/12. A soma é 11/12.", memoryRefresh: { idea: "Frações diferentes precisam ser renomeadas com pedaços iguais antes de serem juntadas.", method: ["Ache um múltiplo comum.", "Renomeie as duas frações.", "Junte os numeradores.", "Reduza o resultado."], example: "1/3 + 1/6 = 2/6 + 1/6 = 1/2." }, rhythm: ["Escolha um tamanho.", "Renomeie as duas frações.", "Junte e reduza."], guidedSteps: [{ label: "Um denominador comum para 3 e 4", answerType: "number", answer: 12 }, { label: "Numerador de 2/3 em doze avos", answerType: "number", answer: 8 }, { label: "Numerador de 1/4 em doze avos", answerType: "number", answer: 3 }] },
    "g5-fractions-compare": { block: "Caminho das Frações", title: "Qual Parte é Maior?", prompt: "Qual é maior: 4/7 ou 5/9? Digite a fração.", correction: "Compare os produtos cruzados: 4×9=36 e 5×7=35. Portanto, 4/7 é maior.", memoryRefresh: { idea: "Estime cada fração em relação à metade e depois confirme numericamente.", method: ["Estime as quantidades.", "Multiplique cruzado ou use denominador comum.", "Compare os resultados.", "Volte às frações originais."], example: "Em 3/5 e 5/8, compare 24 e 25; 5/8 é maior." }, rhythm: ["Estime primeiro.", "Compare nomes iguais.", "Diga qual parte é maior."] },
    "g5-fractions-multiply-cancel": { block: "Caminho das Frações", title: "Multiplique com Números Menores", prompt: "Calcule 4/9 × 3/8 na forma mais simples.", correction: "Cancele 4 com 8 e 3 com 9. Sobra 1/6.", memoryRefresh: { idea: "Multiplicar frações é encontrar uma fração de outra quantidade. Cancelar simplifica antes de multiplicar.", method: ["Procure fatores comuns na diagonal.", "Divida pelos fatores comuns.", "Multiplique os numeradores restantes.", "Multiplique os denominadores restantes."], example: "2/3 × 3/4 = 1/2." }, rhythm: ["Procure fatores comuns.", "Cancele igualmente.", "Multiplique e reduza."] },
    "g5-fractions-divide-reciprocal": { block: "Caminho das Frações", title: "Quantos Grupos Cabem?", prompt: "Calcule 2/3 ÷ 4/5.", correction: "Multiplique pelo recíproco: 2/3 × 5/4 = 10/12 = 5/6.", memoryRefresh: { idea: "Dividir pergunta quantos grupos cabem. Dividir por fração pode virar multiplicação pelo recíproco.", method: ["Mantenha a primeira fração.", "Troque divisão por multiplicação.", "Vire a segunda fração.", "Multiplique e reduza."], example: "3/4 ÷ 1/8 = 6." }, rhythm: ["Mantenha a primeira.", "Troque o sinal.", "Vire a segunda e resolva."] },
    "g5-fractions-path-review": { block: "Caminho das Frações", title: "Revisão do Caminho das Frações", prompt: "Calcule 5/6 − 1/4 na forma mais simples.", correction: "Use doze avos: 10/12 − 3/12 = 7/12.", memoryRefresh: { idea: "Antes de calcular, nomeie o tipo de problema e escolha a ferramenta adequada.", method: ["Identifique a operação.", "Estime o tamanho da resposta.", "Escolha equivalência, cancelamento ou recíproco.", "Resolva, reduza e confira."], example: "5/6 − 1/3 = 1/2." }, rhythm: ["Nomeie o tipo.", "Estime.", "Resolva e explique a conferência."] },
  };

  const practiceEn = {
    "g5-fractions-equivalent-visual": { prompt: "Practice: Complete 5/6 = ?/12.", answerType: "number", answer: 10, tolerance: 0, steps: ["Sixths were split in two.", "5 × 2 = 10."] },
    "g5-fractions-reduce-gcf": { prompt: "Practice: Reduce 20/30.", answerType: "expression", acceptedAnswers: ["2/3"], steps: ["The greatest common factor is 10.", "20/30 = 2/3."] },
    "g5-fractions-common-denominator": { prompt: "Practice: Calculate 3/8 + 4/8.", answerType: "expression", acceptedAnswers: ["7/8"], steps: ["Keep eighths.", "3 + 4 = 7."] },
    "g5-fractions-improper-to-mixed": { prompt: "Practice: Write 14/5 as a mixed number.", answerType: "expression", acceptedAnswers: ["2 4/5", "2+4/5"], steps: ["Five fits twice.", "Four fifths remain."] },
    "g5-fractions-mixed-to-improper": { prompt: "Practice: Write 4 1/3 as an improper fraction.", answerType: "expression", acceptedAnswers: ["13/3"], steps: ["4 × 3 = 12.", "12 + 1 = 13."] },
    "g5-fractions-unlike-denominators": { prompt: "Practice: Calculate 1/2 + 2/5.", answerType: "expression", acceptedAnswers: ["9/10"], steps: ["Use tenths.", "5/10 + 4/10 = 9/10."] },
    "g5-fractions-compare": { prompt: "Practice: Which is larger, 7/10 or 2/3?", answerType: "expression", acceptedAnswers: ["7/10"], steps: ["Cross-products are 21 and 20.", "7/10 is larger."] },
    "g5-fractions-multiply-cancel": { prompt: "Practice: Calculate 5/6 × 3/10.", answerType: "expression", acceptedAnswers: ["1/4"], steps: ["Cancel 5 with 10 and 3 with 6.", "1/2 × 1/2 = 1/4."] },
    "g5-fractions-divide-reciprocal": { prompt: "Practice: Calculate 3/5 ÷ 9/10.", answerType: "expression", acceptedAnswers: ["2/3"], steps: ["Multiply 3/5 × 10/9.", "Cancel and reduce to 2/3."] },
    "g5-fractions-path-review": { prompt: "Practice: Calculate 3/4 + 2/3.", answerType: "expression", acceptedAnswers: ["17/12", "1 5/12", "1+5/12"], steps: ["Use twelfths: 9/12 + 8/12.", "17/12 = 1 5/12."] },
  };

  const practicePt = {
    "g5-fractions-equivalent-visual": { prompt: "Treino: Complete 5/6 = ?/12.", answerType: "number", answer: 10, tolerance: 0, steps: ["Os sextos foram divididos em dois.", "5 × 2 = 10."] },
    "g5-fractions-reduce-gcf": { prompt: "Treino: Reduza 20/30.", answerType: "expression", acceptedAnswers: ["2/3"], steps: ["O máximo divisor comum é 10.", "20/30 = 2/3."] },
    "g5-fractions-common-denominator": { prompt: "Treino: Calcule 3/8 + 4/8.", answerType: "expression", acceptedAnswers: ["7/8"], steps: ["Mantenha oitavos.", "3 + 4 = 7."] },
    "g5-fractions-improper-to-mixed": { prompt: "Treino: Escreva 14/5 como número misto.", answerType: "expression", acceptedAnswers: ["2 4/5", "2+4/5"], steps: ["Cinco cabe duas vezes.", "Sobram quatro quintos."] },
    "g5-fractions-mixed-to-improper": { prompt: "Treino: Escreva 4 1/3 como fração imprópria.", answerType: "expression", acceptedAnswers: ["13/3"], steps: ["4 × 3 = 12.", "12 + 1 = 13."] },
    "g5-fractions-unlike-denominators": { prompt: "Treino: Calcule 1/2 + 2/5.", answerType: "expression", acceptedAnswers: ["9/10"], steps: ["Use décimos.", "5/10 + 4/10 = 9/10."] },
    "g5-fractions-compare": { prompt: "Treino: Qual é maior, 7/10 ou 2/3?", answerType: "expression", acceptedAnswers: ["7/10"], steps: ["Os produtos cruzados são 21 e 20.", "7/10 é maior."] },
    "g5-fractions-multiply-cancel": { prompt: "Treino: Calcule 5/6 × 3/10.", answerType: "expression", acceptedAnswers: ["1/4"], steps: ["Cancele 5 com 10 e 3 com 6.", "1/2 × 1/2 = 1/4."] },
    "g5-fractions-divide-reciprocal": { prompt: "Treino: Calcule 3/5 ÷ 9/10.", answerType: "expression", acceptedAnswers: ["2/3"], steps: ["Multiplique 3/5 × 10/9.", "Cancele e reduza a 2/3."] },
    "g5-fractions-path-review": { prompt: "Treino: Calcule 3/4 + 2/3.", answerType: "expression", acceptedAnswers: ["17/12", "1 5/12", "1+5/12"], steps: ["Use doze avos: 9/12 + 8/12.", "17/12 = 1 5/12."] },
  };

  const insertAt = lessons.findIndex((lesson) => lesson.grade === "Grade 6");
  lessons.splice(insertAt < 0 ? lessons.length : insertAt, 0, ...fractionLessons);
  const grade5BlockOrder = ["Fraction Review", "Fraction Path", "Fractions to Decimals", "Decimal Fractions", "Metric Measure", "Freehand Geometry", "Symmetry", "Measurement", "Ancient Measures"];
  const grade5Lessons = lessons.filter((lesson) => lesson.grade === "Grade 5").sort((a, b) => grade5BlockOrder.indexOf(a.block) - grade5BlockOrder.indexOf(b.block));
  const laterLessons = lessons.filter((lesson) => lesson.grade !== "Grade 5");
  lessons.splice(0, lessons.length, ...grade5Lessons, ...laterLessons);
  Object.assign(translations, pt);
  Object.assign(bank.en, practiceEn);
  Object.assign(bank.pt, practicePt);
})();
