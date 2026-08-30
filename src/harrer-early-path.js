(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };

  const earlyLessons = [
    {
      id: "g4-place-value-regrouping", activityKey: "g4-math-place-value-regrouping", grade: "Grade 4", block: "Place Value", title: "Bundles That Change Places", time: "15 min",
      sourceFocus: "Original adaptation of a Grade 4 image for carrying and borrowing through place-value exchange.", teacherAim: "Learners experience regrouping as exchanging ten smaller units for one larger unit.",
      memoryRefresh: { idea: "Ten ones may be exchanged for one ten, and ten tens for one hundred.", method: ["Work from the ones place.", "Bundle every group of ten.", "Move each new bundle one place left.", "Read the regrouped total."], example: "28 + 17 gives 15 ones. Exchange 10 ones for 1 ten, leaving 5 ones: 45." },
      rhythm: ["Count the ones.", "Bundle a group of ten.", "Carry the bundle left."], prompt: "Add 268 + 157. What is the total?", correction: "8 + 7 makes 15 ones: write 5 and carry 1 ten. Then 6 + 5 + 1 = 12 tens. The total is 425.", answerType: "number", answer: 425, tolerance: 0,
      guidedSteps: [{ label: "Ones: 8 + 7", answerType: "number", answer: 15 }, { label: "Tens including the carried ten: 6 + 5 + 1", answerType: "number", answer: 12 }],
    },
    {
      id: "g4-area-floor-tiles", activityKey: "g4-math-area-floor-tiles", grade: "Grade 4", block: "Square Measure", title: "Cover the Workshop Floor", time: "16 min",
      sourceFocus: "Original Grade 4 area discovery using equal square units before the formula.", teacherAim: "Learners distinguish area inside a boundary from perimeter around it.",
      memoryRefresh: { idea: "Area counts equal squares that cover a surface without gaps or overlaps.", method: ["Count squares in one row.", "Count the rows.", "Multiply rows by squares per row.", "Name the answer in square units."], example: "Four rows of six square tiles cover 24 square units." },
      rhythm: ["Across the row.", "Count the rows.", "Multiply and say square units."], prompt: "A rectangular floor is 7 tiles long and 5 tiles wide. How many square tiles cover it?", correction: "There are 5 rows of 7 tiles. 5 × 7 = 35 square tiles.", answerType: "number", answer: 35, tolerance: 0, suffix: "square tiles",
    },
    {
      id: "g4-fraction-branches", activityKey: "g4-math-fraction-branches", grade: "Grade 4", block: "Fraction Beginnings", title: "One Whole, Smaller Shares", time: "15 min",
      sourceFocus: "Original Grade 4 fraction introduction through repeated equal sharing.", teacherAim: "Learners notice that more equal parts means each part is smaller.",
      visualModel: [{ parts: 4, shaded: 1, label: "1/4" }, { parts: 8, shaded: 1, label: "1/8" }],
      memoryRefresh: { idea: "The denominator names how many equal parts make the whole.", method: ["Begin with one whole.", "Divide it into equal parts.", "Count all equal parts for the denominator.", "Count chosen parts for the numerator."], example: "One chosen piece from eight equal pieces is 1/8." },
      rhythm: ["One whole first.", "Make equal shares.", "Name how many make the whole."], prompt: "A loaf is shared equally among 8 children. What fraction does each child receive?", correction: "Eight equal shares make the whole, so each child receives 1/8.", answerType: "expression", acceptedAnswers: ["1/8"],
    },
    {
      id: "g4-fraction-of-number", activityKey: "g4-math-fraction-of-number", grade: "Grade 4", block: "Fraction Beginnings", title: "Share a Basket Fairly", time: "15 min",
      sourceFocus: "Original Grade 4 work with unit fractions of whole-number quantities.", teacherAim: "Learners connect finding one fractional part with equal division.",
      memoryRefresh: { idea: "To find one fourth of a number, divide it into four equal groups.", method: ["Read the denominator.", "Make that many equal groups.", "Find the amount in one group.", "Check by rebuilding the whole."], example: "One fourth of 20 is 5 because 20 ÷ 4 = 5." },
      rhythm: ["Read the part name.", "Divide equally.", "Check all groups rebuild the whole."], prompt: "What is 1/6 of 42 oranges?", correction: "Divide 42 into 6 equal groups. 42 ÷ 6 = 7.", answerType: "number", answer: 7, tolerance: 0, suffix: "oranges",
    },
    {
      id: "g4-remainder-as-fraction", activityKey: "g4-math-remainder-as-fraction", grade: "Grade 4", block: "Fraction Beginnings", title: "Share the Last Piece", time: "17 min",
      sourceFocus: "Original Grade 4 discovery that a division remainder can be shared as a fraction.", teacherAim: "Learners interpret a remainder as a share rather than stopping at remainder notation.",
      memoryRefresh: { idea: "After whole items are shared, the remainder can also be divided equally.", method: ["Share all possible wholes.", "Name the remainder.", "Divide the remainder among the same number of people.", "Join the whole share and fractional share."], example: "Seven rolls among three people gives 2 each and 1/3 of the last roll." },
      rhythm: ["Share the wholes.", "Notice what remains.", "Share the remainder too."], prompt: "Share 14 small loaves equally among 4 families. How many loaves does each family receive?", correction: "Each family gets 3 whole loaves, with 2 left. The 2 remaining loaves shared among 4 families give 2/4 = 1/2, so each gets 3 1/2.", answerType: "expression", acceptedAnswers: ["3 1/2", "3+1/2", "7/2", "3.5"],
    },
    {
      id: "g4-square-patterns", activityKey: "g4-math-square-patterns", grade: "Grade 4", block: "Number Patterns", title: "Grow the Next Square", time: "14 min",
      sourceFocus: "Original Grade 4 study of square numbers through growing dot patterns.", teacherAim: "Learners see a square number as equal rows and as a growing visual pattern.",
      memoryRefresh: { idea: "A square number makes an array with the same number of rows and columns.", method: ["Name the side length.", "Make that many rows.", "Place the same number in each row.", "Multiply side by side."], example: "A 6 by 6 square contains 36 dots." },
      rhythm: ["Same across.", "Same down.", "Side times side."], prompt: "How many stones are in a square array with 9 stones on each side?", correction: "A 9-by-9 square contains 9 × 9 = 81 stones.", answerType: "number", answer: 81, tolerance: 0,
    },
    {
      id: "g5-fraction-division-sharing", activityKey: "g5-math-fraction-division-sharing", grade: "Grade 5", block: "Fraction Path", title: "How Many Half-Cups Fit?", time: "17 min",
      sourceFocus: "Original Grade 5 fraction division grounded in measurement before reciprocal notation.", teacherAim: "Learners understand fraction division as counting groups of a given size.",
      visualModel: [{ parts: 2, shaded: 2, label: "1 cup" }, { parts: 2, shaded: 1, label: "1/2 cup groups" }],
      memoryRefresh: { idea: "Division can ask how many groups of one size fit inside an amount.", method: ["Name the total amount.", "Name the size of one group.", "Partition the total into groups of that size.", "Count the groups."], example: "Four half-cups fit into two cups." },
      rhythm: ["Name the whole amount.", "Name one group.", "Count how many groups fit."], prompt: "How many 1/3-cup scoops fit into 2 cups?", correction: "Each cup contains three thirds. Two cups contain 2 × 3 = 6 third-cup scoops.", answerType: "number", answer: 6, tolerance: 0, suffix: "scoops",
    },
    {
      id: "g5-fraction-decimal-weave", activityKey: "g5-math-fraction-decimal-weave", grade: "Grade 5", block: "Fractions to Decimals", title: "Weave Tenths and Hundredths", time: "16 min",
      sourceFocus: "Original Grade 5 bridge between common fractions, decimal fractions, and place value.", teacherAim: "Learners rename a familiar fraction in hundredths before writing a decimal.",
      memoryRefresh: { idea: "A fraction with denominator 100 can be read directly as hundredths.", method: ["Rename the fraction with denominator 100.", "Count the hundredths.", "Write two decimal places.", "Check against a familiar benchmark."], example: "3/5 = 60/100 = 0.60." },
      rhythm: ["Make hundredths.", "Count them.", "Write two decimal places."], prompt: "Write 7/20 as a decimal.", correction: "Multiply numerator and denominator by 5: 7/20 = 35/100 = 0.35.", answerType: "number", answer: 0.35, tolerance: 0,
    },
    {
      id: "g6-decimal-place-system", activityKey: "g6-math-decimal-place-system", grade: "Grade 6", block: "Decimal System", title: "Across the Decimal Gate", time: "15 min",
      sourceFocus: "Original Grade 6 decimal-system lesson connecting each place by factors of ten.", teacherAim: "Learners see whole and decimal places as one continuous base-ten system.",
      memoryRefresh: { idea: "Moving one place left makes a digit worth ten times as much; moving right makes it one tenth as much.", method: ["Locate the digit.", "Name its place.", "Move by the requested number of places.", "Multiply or divide by a power of ten."], example: "In 3.47, the 4 means four tenths and the 7 means seven hundredths." },
      rhythm: ["Left is ten times greater.", "Right is one tenth.", "Keep the decimal places named."], prompt: "Divide 684 by 100. What is the result?", correction: "Dividing by 100 moves every digit two places to the right in the place-value chart: 684 becomes 6.84.", answerType: "number", answer: 6.84, tolerance: 0,
    },
    {
      id: "g6-percent-hundred-grid", activityKey: "g6-math-percent-hundred-grid", grade: "Grade 6", block: "Percents", title: "Out of One Hundred", time: "16 min",
      sourceFocus: "Original Grade 6 percent introduction through a hundred-square image before formulas.", teacherAim: "Learners connect percent, fraction, and decimal forms as three names for one amount.",
      memoryRefresh: { idea: "Percent means out of one hundred.", method: ["Write the percent over 100.", "Reduce the fraction if helpful.", "Write the hundredths as a decimal.", "Check all three forms name the same amount."], example: "25% = 25/100 = 1/4 = 0.25." },
      rhythm: ["Percent means hundredths.", "Write the fraction.", "Rename the same amount."], prompt: "Write 35% as a fraction in lowest terms.", correction: "35% = 35/100. Divide numerator and denominator by 5 to get 7/20.", answerType: "expression", acceptedAnswers: ["7/20"],
      guidedSteps: [{ label: "Write 35% as a fraction over 100.", answerType: "expression", acceptedAnswers: ["35/100"] }, { label: "Greatest common factor of 35 and 100", answerType: "number", answer: 5 }],
    },
  ];

  const pt = {
    "g4-place-value-regrouping": { block: "Valor Posicional", title: "Feixes que Mudam de Casa", prompt: "Some 268 + 157. Qual é o total?", correction: "8 + 7 = 15 unidades: escreva 5 e leve 1 dezena. Depois 6 + 5 + 1 = 12 dezenas. Total: 425.", memoryRefresh: { idea: "Dez unidades podem ser trocadas por uma dezena, e dez dezenas por uma centena.", method: ["Comece pela casa das unidades.", "Agrupe cada conjunto de dez.", "Leve cada novo grupo uma casa para a esquerda.", "Leia o total reagrupado."], example: "28 + 17 dá 15 unidades. Troque 10 unidades por 1 dezena e ficam 5 unidades: 45." }, rhythm: ["Conte as unidades.", "Forme um grupo de dez.", "Leve o grupo para a esquerda."], guidedSteps: [{ label: "Unidades: 8 + 7", answerType: "number", answer: 15 }, { label: "Dezenas, incluindo a dezena que foi levada: 6 + 5 + 1", answerType: "number", answer: 12 }] },
    "g4-area-floor-tiles": { block: "Medida de Área", title: "Cubra o Chão da Oficina", prompt: "Um piso retangular tem 7 ladrilhos de comprimento e 5 de largura. Quantos ladrilhos o cobrem?", correction: "São 5 fileiras de 7: 5 × 7 = 35 ladrilhos quadrados.", memoryRefresh: { idea: "A área conta quadrados iguais que cobrem uma superfície sem espaços nem sobreposições.", method: ["Conte os quadrados de uma fileira.", "Conte as fileiras.", "Multiplique as fileiras pelos quadrados de cada fileira.", "Dê a resposta em unidades quadradas."], example: "Quatro fileiras de seis ladrilhos cobrem 24 unidades quadradas." }, rhythm: ["Conte uma fileira.", "Conte as fileiras.", "Multiplique e diga unidades quadradas."] },
    "g4-fraction-branches": { block: "Início das Frações", title: "Um Inteiro, Partes Menores", prompt: "Um pão é dividido igualmente entre 8 crianças. Que fração cada uma recebe?", correction: "Oito partes iguais formam o inteiro; cada criança recebe 1/8.", memoryRefresh: { idea: "O denominador indica quantas partes iguais formam o inteiro.", method: ["Comece com um inteiro.", "Divida-o em partes iguais.", "Conte todas as partes para encontrar o denominador.", "Conte as partes escolhidas para encontrar o numerador."], example: "Uma parte escolhida entre oito partes iguais é 1/8." }, rhythm: ["Primeiro, um inteiro.", "Faça partes iguais.", "Diga quantas partes formam o inteiro."] },
    "g4-fraction-of-number": { block: "Início das Frações", title: "Divida a Cesta com Justiça", prompt: "Quanto é 1/6 de 42 laranjas?", correction: "Divida 42 em 6 grupos iguais: 42 ÷ 6 = 7.", memoryRefresh: { idea: "Para encontrar uma fração unitária de um número, divida-o na quantidade de grupos indicada pelo denominador.", method: ["Leia o denominador.", "Faça essa quantidade de grupos iguais.", "Encontre a quantidade de um grupo.", "Confira reconstruindo o inteiro."], example: "Um quarto de 20 é 5, porque 20 ÷ 4 = 5." }, rhythm: ["Leia o nome da parte.", "Divida igualmente.", "Confira se os grupos reconstroem o inteiro."] },
    "g4-remainder-as-fraction": { block: "Início das Frações", title: "Divida o Último Pedaço", prompt: "Divida 14 pães igualmente entre 4 famílias. Quanto cada família recebe?", correction: "Cada família recebe 3 pães e metade de outro: 3 1/2.", memoryRefresh: { idea: "Depois de dividir os itens inteiros, o resto também pode ser dividido igualmente.", method: ["Divida todos os inteiros possíveis.", "Identifique o resto.", "Divida o resto entre a mesma quantidade de pessoas.", "Junte a parte inteira e a parte fracionária."], example: "Sete pães entre três pessoas dão 2 para cada uma e 1/3 do último pão." }, rhythm: ["Divida os inteiros.", "Observe o que sobrou.", "Divida também o resto."] },
    "g4-square-patterns": { block: "Padrões Numéricos", title: "Faça Crescer o Próximo Quadrado", prompt: "Quantas pedras há num arranjo quadrado com 9 pedras de cada lado?", correction: "Um quadrado 9 por 9 contém 9 × 9 = 81 pedras.", memoryRefresh: { idea: "Um número quadrado forma um arranjo com a mesma quantidade de linhas e colunas.", method: ["Identifique o comprimento do lado.", "Faça essa quantidade de fileiras.", "Coloque a mesma quantidade em cada fileira.", "Multiplique lado por lado."], example: "Um quadrado de 6 por 6 contém 36 pontos." }, rhythm: ["A mesma quantidade na horizontal.", "A mesma quantidade na vertical.", "Lado vezes lado."] },
    "g5-fraction-division-sharing": { block: "Caminho das Frações", title: "Quantas Medidas de Meia Xícara Cabem?", prompt: "Quantas medidas de 1/3 de xícara cabem em 2 xícaras?", correction: "Cada xícara contém três terços. Duas xícaras contêm 6 medidas.", memoryRefresh: { idea: "A divisão pode perguntar quantos grupos de um determinado tamanho cabem em uma quantidade.", method: ["Identifique a quantidade total.", "Identifique o tamanho de um grupo.", "Separe o total em grupos desse tamanho.", "Conte os grupos."], example: "Quatro medidas de meia xícara cabem em duas xícaras." }, rhythm: ["Diga a quantidade total.", "Diga o tamanho de um grupo.", "Conte quantos grupos cabem."] },
    "g5-fraction-decimal-weave": { block: "Frações em Decimais", title: "Entrelaçar Décimos e Centésimos", prompt: "Escreva 7/20 como decimal.", correction: "Multiplique em cima e embaixo por 5: 7/20 = 35/100 = 0,35.", memoryRefresh: { idea: "Uma fração com denominador 100 pode ser lida diretamente como centésimos.", method: ["Reescreva a fração com denominador 100.", "Conte os centésimos.", "Escreva duas casas decimais.", "Compare com uma referência conhecida."], example: "3/5 = 60/100 = 0,60." }, rhythm: ["Transforme em centésimos.", "Conte-os.", "Escreva duas casas decimais."] },
    "g6-decimal-place-system": { block: "Sistema Decimal", title: "Atravessando a Porta Decimal", prompt: "Divida 684 por 100. Qual é o resultado?", correction: "Dividir por 100 desloca o valor duas casas: 684 se torna 6,84.", memoryRefresh: { idea: "Mover uma casa para a esquerda torna o valor do algarismo dez vezes maior; mover para a direita o torna dez vezes menor.", method: ["Localize o algarismo.", "Diga o nome da casa.", "Mova a quantidade de casas pedida.", "Multiplique ou divida por uma potência de dez."], example: "Em 3,47, o 4 representa quatro décimos e o 7 representa sete centésimos." }, rhythm: ["À esquerda vale dez vezes mais.", "À direita vale um décimo.", "Diga o nome de cada casa decimal."] },
    "g6-percent-hundred-grid": { block: "Porcentagens", title: "De Cada Cem", prompt: "Escreva 35% como fração irredutível.", correction: "35% = 35/100. Divida as duas partes por 5: 7/20.", memoryRefresh: { idea: "Porcentagem significa uma quantidade de cada cem.", method: ["Escreva a porcentagem sobre 100.", "Simplifique a fração, se for útil.", "Escreva os centésimos como decimal.", "Confira se as três formas representam a mesma quantidade."], example: "25% = 25/100 = 1/4 = 0,25." }, rhythm: ["Porcentagem significa centésimos.", "Escreva a fração.", "Dê outro nome à mesma quantidade."], guidedSteps: [{ label: "Escreva 35% como uma fração com denominador 100.", answerType: "expression", acceptedAnswers: ["35/100"] }, { label: "Máximo divisor comum de 35 e 100", answerType: "number", answer: 5 }] },
  };

  const practice = {
    "g4-place-value-regrouping": { prompt: "Practice: Add 487 + 268.", answerType: "number", answer: 755, tolerance: 0, steps: ["7 + 8 = 15; regroup.", "8 + 6 + 1 = 15 tens; regroup again.", "The total is 755."] },
    "g4-area-floor-tiles": { prompt: "Practice: Find the area of an 8-by-6 tile rectangle.", answerType: "number", answer: 48, tolerance: 0, steps: ["Six rows of eight.", "6 × 8 = 48 square tiles."] },
    "g4-fraction-branches": { prompt: "Practice: One cake is shared equally among 6 people. Name one share.", answerType: "expression", acceptedAnswers: ["1/6"], steps: ["Six equal shares make the whole.", "One share is 1/6."] },
    "g4-fraction-of-number": { prompt: "Practice: Find 1/5 of 35.", answerType: "number", answer: 7, tolerance: 0, steps: ["Divide by 5.", "35 ÷ 5 = 7."] },
    "g4-remainder-as-fraction": { prompt: "Practice: Share 11 apples among 4 people.", answerType: "expression", acceptedAnswers: ["2 3/4", "2+3/4", "11/4"], steps: ["Each receives 2 whole apples.", "Share the remaining 3 apples into fourths."] },
    "g4-square-patterns": { prompt: "Practice: How many dots form a 12-by-12 square?", answerType: "number", answer: 144, tolerance: 0, steps: ["Side times side.", "12 × 12 = 144."] },
    "g5-fraction-division-sharing": { prompt: "Practice: How many 1/4-cup scoops fit into 3 cups?", answerType: "number", answer: 12, tolerance: 0, steps: ["Four quarter-cups fit in one cup.", "3 × 4 = 12."] },
    "g5-fraction-decimal-weave": { prompt: "Practice: Write 9/20 as a decimal.", answerType: "number", answer: 0.45, tolerance: 0, steps: ["9/20 = 45/100.", "45/100 = 0.45."] },
    "g6-decimal-place-system": { prompt: "Practice: Divide 735 by 100.", answerType: "number", answer: 7.35, tolerance: 0, steps: ["Divide by ten twice.", "735 ÷ 100 = 7.35."] },
    "g6-percent-hundred-grid": { prompt: "Practice: Write 45% as a fraction in lowest terms.", answerType: "expression", acceptedAnswers: ["9/20"], steps: ["45/100.", "Divide by 5 to get 9/20."] },
  };

  const practicePt = {
    "g4-place-value-regrouping": { prompt: "Pratique: some 487 + 268.", answerType: "number", answer: 755, tolerance: 0, steps: ["7 + 8 = 15; reagrupe.", "8 + 6 + 1 = 15 dezenas; reagrupe novamente.", "O total é 755."] },
    "g4-area-floor-tiles": { prompt: "Pratique: encontre a área de um retângulo de ladrilhos de 8 por 6.", answerType: "number", answer: 48, tolerance: 0, steps: ["São seis fileiras de oito.", "6 × 8 = 48 ladrilhos quadrados."] },
    "g4-fraction-branches": { prompt: "Pratique: um bolo é dividido igualmente entre 6 pessoas. Que fração cada uma recebe?", answerType: "expression", acceptedAnswers: ["1/6"], steps: ["Seis partes iguais formam o inteiro.", "Uma parte é 1/6."] },
    "g4-fraction-of-number": { prompt: "Pratique: encontre 1/5 de 35.", answerType: "number", answer: 7, tolerance: 0, steps: ["Divida por 5.", "35 ÷ 5 = 7."] },
    "g4-remainder-as-fraction": { prompt: "Pratique: divida 11 maçãs entre 4 pessoas.", answerType: "expression", acceptedAnswers: ["2 3/4", "2+3/4", "11/4"], steps: ["Cada pessoa recebe 2 maçãs inteiras.", "Divida as 3 maçãs restantes em quartos."] },
    "g4-square-patterns": { prompt: "Pratique: quantos pontos formam um quadrado de 12 por 12?", answerType: "number", answer: 144, tolerance: 0, steps: ["Multiplique lado por lado.", "12 × 12 = 144."] },
    "g5-fraction-division-sharing": { prompt: "Pratique: quantas medidas de 1/4 de xícara cabem em 3 xícaras?", answerType: "number", answer: 12, tolerance: 0, steps: ["Quatro quartos de xícara cabem em uma xícara.", "3 × 4 = 12."] },
    "g5-fraction-decimal-weave": { prompt: "Pratique: escreva 9/20 como decimal.", answerType: "number", answer: 0.45, tolerance: 0, steps: ["9/20 = 45/100.", "45/100 = 0,45."] },
    "g6-decimal-place-system": { prompt: "Pratique: divida 735 por 100.", answerType: "number", answer: 7.35, tolerance: 0, steps: ["Divida por dez duas vezes.", "735 ÷ 100 = 7,35."] },
    "g6-percent-hundred-grid": { prompt: "Pratique: escreva 45% como fração irredutível.", answerType: "expression", acceptedAnswers: ["9/20"], steps: ["Escreva 45/100.", "Divida por 5 para obter 9/20."] },
  };

  lessons.unshift(...earlyLessons.filter((lesson) => lesson.grade === "Grade 4"));
  const firstGrade6 = lessons.findIndex((lesson) => lesson.grade === "Grade 6");
  lessons.splice(firstGrade6 < 0 ? lessons.length : firstGrade6, 0, ...earlyLessons.filter((lesson) => lesson.grade === "Grade 5"));
  const firstGrade7 = lessons.findIndex((lesson) => lesson.grade === "Grade 7");
  lessons.splice(firstGrade7 < 0 ? lessons.length : firstGrade7, 0, ...earlyLessons.filter((lesson) => lesson.grade === "Grade 6"));
  Object.assign(translations, pt);
  Object.assign(bank.en, practice);
  Object.assign(bank.pt, practicePt);
})();
