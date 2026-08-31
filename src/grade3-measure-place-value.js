(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };

  const grade3Lessons = [
    {
      id: "g3-measure-common-standard", activityKey: "g3-math-measure-common-standard", grade: "Grade 3", block: "Measure Through Work", title: "Why We Need One Measure", time: "12 min",
      sourceFocus: "Original Grade 3 measurement lesson moving from body-based units to a shared metric standard.", teacherAim: "Learners discover the need for standard units through comparison before using a ruler mechanically.",
      memoryRefresh: { idea: "Personal measures can differ. A shared standard lets different people build the same result.", method: ["Measure an object with your hand span.", "Ask another person to measure it the same way.", "Compare the answers.", "Measure again with centimeters."], example: "A table may be 8 child hand spans but 6 adult hand spans; its centimeter length stays the same." },
      rhythm: ["Measure with the body.", "Compare the results.", "Return to one standard."], prompt: "A board measures 2 meters. How many centimeters long is it?", correction: "One meter is 100 centimeters, so 2 meters is 200 centimeters.", answerType: "number", answer: 200, tolerance: 0, suffix: "cm",
    },
    {
      id: "g3-mass-market-scale", activityKey: "g3-math-mass-market-scale", grade: "Grade 3", block: "Measure Through Work", title: "Balance the Market Scale", time: "12 min",
      sourceFocus: "Original Grade 3 mass lesson grounded in weighing ingredients and market goods.", teacherAim: "Learners distinguish mass from size and connect grams to kilograms through real weighing.",
      memoryRefresh: { idea: "Mass tells how heavy something is. A scale compares that mass with a shared unit.", method: ["Hold two objects and predict which is heavier.", "Use a scale to test the prediction.", "Read the grams or kilograms.", "Compare the measurement with your estimate."], example: "A small bag of rice can be heavier than a large empty box." },
      rhythm: ["Predict the heavier.", "Balance the scale.", "Name the unit."], prompt: "A bag contains 1 kilogram of beans. How many grams is that?", correction: "One kilogram equals 1,000 grams.", answerType: "number", answer: 1000, tolerance: 0, suffix: "g",
    },
    {
      id: "g3-capacity-kitchen", activityKey: "g3-math-capacity-kitchen", grade: "Grade 3", block: "Measure Through Work", title: "Fill the One-Liter Jug", time: "12 min",
      sourceFocus: "Original Grade 3 liquid-capacity lesson using pouring and kitchen measures.", teacherAim: "Learners experience liters and milliliters as capacities before converting numerically.",
      memoryRefresh: { idea: "Capacity tells how much liquid a container can hold.", method: ["Choose a small measuring cup.", "Pour equal amounts into a larger container.", "Keep a running total in milliliters.", "Stop when the liter mark is reached."], example: "Four pours of 250 mL fill a 1-liter jug." },
      rhythm: ["Pour an equal part.", "Add the milliliters.", "Stop at one liter."], prompt: "How many 250 mL cups fill a 1-liter jug?", correction: "One liter is 1,000 mL. Four groups of 250 mL make 1,000 mL.", answerType: "number", answer: 4, tolerance: 0,
    },
    {
      id: "g3-perimeter-garden", activityKey: "g3-math-perimeter-garden", grade: "Grade 3", block: "Measure Through Work", title: "Walk Around the Garden", time: "13 min",
      sourceFocus: "Original Grade 3 perimeter lesson connected to fencing a rectangular garden.", teacherAim: "Learners derive perimeter as the total boundary through walking and measuring every side.",
      memoryRefresh: { idea: "Perimeter is the distance all the way around a shape.", method: ["Begin at one corner.", "Measure each outer side.", "Add every side once.", "Return to the starting corner."], example: "A 5 m by 3 m garden has perimeter 5 + 3 + 5 + 3 = 16 m." },
      rhythm: ["Walk one side.", "Turn the corner.", "Add until you return."], prompt: "A rectangular garden is 6 m long and 4 m wide. What is its perimeter?", correction: "Add all four sides: 6 + 4 + 6 + 4 = 20 meters.", answerType: "number", answer: 20, tolerance: 0, suffix: "m",
    },
    {
      id: "g3-area-floor-squares", activityKey: "g3-math-area-floor-squares", grade: "Grade 3", block: "Measure Through Work", title: "Cover the Workshop Floor", time: "13 min",
      sourceFocus: "Original Grade 3 area lesson deriving length times width from rows of equal squares.", teacherAim: "Learners experience area as covering an inside surface, distinct from perimeter.",
      memoryRefresh: { idea: "Area counts equal squares covering the inside of a shape.", method: ["Count the squares in one row.", "Count the rows.", "Multiply squares per row by rows.", "Name square units."], example: "Three rows of five squares cover 15 square units." },
      rhythm: ["Across one row.", "Count the rows.", "Name square units."], prompt: "A rectangular floor is 7 m long and 3 m wide. What is its area?", correction: "Seven squares in each of 3 rows gives 7 × 3 = 21 square meters.", answerType: "number", answer: 21, tolerance: 0, suffix: "m²",
    },
    {
      id: "g3-square-cube-build", activityKey: "g3-math-square-cube-build", grade: "Grade 3", block: "Number Shapes", title: "From a Square to a Cube", time: "13 min",
      sourceFocus: "Original Grade 3 square-and-cube-number lesson using arrays and unit blocks.", teacherAim: "Learners distinguish repeated factors by building two-dimensional and three-dimensional forms.",
      memoryRefresh: { idea: "A square number forms equal rows and columns; a cube number adds equal layers.", method: ["Build a square with equal rows and columns.", "Count its units as side × side.", "Stack the same square in equal layers.", "Count side × side × layers."], example: "A 3 by 3 square has 9 units; three such layers make a 3 by 3 by 3 cube with 27 units." },
      rhythm: ["Side by side.", "Build the layer.", "Stack equal layers."], prompt: "How many unit blocks make a cube that is 3 blocks long, 3 wide, and 3 high?", correction: "Multiply the three dimensions: 3 × 3 × 3 = 27 blocks.", answerType: "number", answer: 27, tolerance: 0,
    },
    {
      id: "g3-prime-arrangements", activityKey: "g3-math-prime-arrangements", grade: "Grade 3", block: "Number Shapes", title: "Numbers With Only One Rectangle", time: "12 min",
      sourceFocus: "Original Grade 3 prime-number investigation through rectangular arrays.", teacherAim: "Learners discover primes by attempting to arrange quantities into equal rows.",
      memoryRefresh: { idea: "A prime number greater than 1 can make only a 1-by-itself rectangle.", method: ["Build the number with counters.", "Try two equal rows.", "Try other row lengths.", "If only 1-by-itself works, name it prime."], example: "Seven makes only 1 × 7, while eight also makes 2 × 4, so 7 is prime and 8 is not." },
      rhythm: ["Build the number.", "Search for equal rows.", "Name prime or composite."], prompt: "Which of these numbers is prime: 9, 11, or 12? Enter the prime number.", correction: "Nine makes 3 × 3 and twelve has several arrays. Eleven only makes 1 × 11, so 11 is prime.", answerType: "number", answer: 11, tolerance: 0,
    },
    {
      id: "g3-place-value-exchange", activityKey: "g3-math-place-value-exchange", grade: "Grade 3", block: "Place Value", title: "Ten Become One in the Next Place", time: "12 min",
      sourceFocus: "Original Grade 3 base-ten place-value lesson using bundles and exchanges.", teacherAim: "Learners understand each digit by quantity and position before using written regrouping.",
      memoryRefresh: { idea: "Ten of one place can be exchanged for one of the next place to the left.", method: ["Build ones first.", "Exchange every ten ones for one ten.", "Exchange every ten tens for one hundred.", "Read the digits from hundreds to ones."], example: "Twenty-three is 2 tens and 3 ones; 10 more ones can be exchanged for another ten." },
      rhythm: ["Count to ten.", "Exchange one bundle.", "Move one place left."], prompt: "In the number 4,582, what value does the digit 5 represent?", correction: "The 5 is in the hundreds place, so it represents 500.", answerType: "number", answer: 500, tolerance: 0,
    },
    {
      id: "g3-addition-regrouping", activityKey: "g3-math-addition-regrouping", grade: "Grade 3", block: "Place Value", title: "Add and Exchange", time: "13 min",
      sourceFocus: "Original Grade 3 column-addition lesson deriving carrying from place-value exchange.", teacherAim: "Learners regroup because a place contains ten, not because of a memorized carrying rule.",
      memoryRefresh: { idea: "When a place reaches ten, exchange ten units for one unit in the place to the left.", method: ["Align ones beneath ones and tens beneath tens.", "Add the ones.", "Exchange each group of ten and move it left.", "Continue through the remaining places."], example: "In 38 + 27, 8 + 7 = 15 ones; exchange 10 ones for 1 ten, leaving 5 ones." },
      rhythm: ["Align the places.", "Add from the ones.", "Exchange every ten."], prompt: "Calculate 268 + 157.", correction: "8 + 7 = 15; write 5 and exchange 10 ones for 1 ten. Then 6 + 5 + 1 = 12 tens. The total is 425.", answerType: "number", answer: 425, tolerance: 0,
    },
    {
      id: "g3-subtraction-ungrouping", activityKey: "g3-math-subtraction-ungrouping", grade: "Grade 3", block: "Place Value", title: "Open One Bundle", time: "13 min",
      sourceFocus: "Original Grade 3 column-subtraction lesson deriving borrowing from undoing a place-value bundle.", teacherAim: "Learners ungroup one ten or hundred meaningfully before using compact notation.",
      memoryRefresh: { idea: "When a place has too few units to subtract, open one bundle from the place to the left.", method: ["Align matching places.", "Begin with the ones.", "If needed, exchange 1 ten for 10 ones.", "Subtract and then check by addition."], example: "For 52 − 28, exchange one of the 5 tens: 52 becomes 4 tens and 12 ones." },
      rhythm: ["Align the places.", "Open one bundle if needed.", "Add back to check."], prompt: "Calculate 73 − 48.", correction: "Exchange one ten so 73 becomes 6 tens and 13 ones. 13 − 8 = 5 and 6 − 4 = 2, so the answer is 25.", answerType: "number", answer: 25, tolerance: 0,
    },
    {
      id: "g3-round-nearest-ten", activityKey: "g3-math-round-nearest-ten", grade: "Grade 3", block: "Place Value", title: "Find the Nearest Ten", time: "11 min",
      sourceFocus: "Original Grade 3 rounding lesson grounded on position between neighboring tens.", teacherAim: "Learners judge nearness on a number line instead of memorizing an isolated digit rule.",
      memoryRefresh: { idea: "Rounding asks which benchmark number is nearest.", method: ["Find the ten below.", "Find the ten above.", "Place the number between them.", "Choose the closer ten; halfway rounds up."], example: "43 lies between 40 and 50 and is closer to 40." },
      rhythm: ["Name the lower ten.", "Name the higher ten.", "Choose the nearer one."], prompt: "Round 67 to the nearest ten.", correction: "Sixty-seven lies between 60 and 70 and is closer to 70.", answerType: "number", answer: 70, tolerance: 0,
    },
  ];

  const pt = {
    "g3-measure-common-standard": { block: "Medida pelo Trabalho", title: "Por Que Precisamos de Uma Medida Comum", prompt: "Uma tábua mede 2 metros. Quantos centímetros ela tem?", correction: "Um metro tem 100 centímetros; portanto, 2 metros têm 200 centímetros.", memoryRefresh: { idea: "Medidas pessoais podem variar. Um padrão comum permite que pessoas diferentes construam o mesmo resultado.", method: ["Meça um objeto com o palmo.", "Peça que outra pessoa faça a mesma medição.", "Compare os resultados.", "Meça novamente em centímetros."], example: "Uma mesa pode medir 8 palmos de criança e 6 de adulto, mas seu comprimento em centímetros não muda." }, rhythm: ["Meça com o corpo.", "Compare os resultados.", "Volte a um padrão comum."] },
    "g3-mass-market-scale": { block: "Medida pelo Trabalho", title: "Equilibre a Balança da Feira", prompt: "Um saco contém 1 quilograma de feijão. Quantos gramas são?", correction: "Um quilograma equivale a 1.000 gramas.", memoryRefresh: { idea: "A massa indica quanto algo pesa. A balança compara essa massa com uma unidade comum.", method: ["Segure dois objetos e preveja qual é mais pesado.", "Use uma balança para testar.", "Leia os gramas ou quilogramas.", "Compare a medição com sua estimativa."], example: "Um pacote pequeno de arroz pode ser mais pesado que uma caixa grande vazia." }, rhythm: ["Preveja o mais pesado.", "Equilibre a balança.", "Diga a unidade."] },
    "g3-capacity-kitchen": { block: "Medida pelo Trabalho", title: "Encha a Jarra de Um Litro", prompt: "Quantos copos de 250 mL enchem uma jarra de 1 litro?", correction: "Um litro tem 1.000 mL. Quatro grupos de 250 mL formam 1.000 mL.", memoryRefresh: { idea: "A capacidade indica quanto líquido um recipiente pode conter.", method: ["Escolha um copo medidor pequeno.", "Despeje quantidades iguais num recipiente maior.", "Some os mililitros a cada vez.", "Pare ao alcançar a marca de um litro."], example: "Quatro medidas de 250 mL enchem uma jarra de 1 litro." }, rhythm: ["Despeje uma parte igual.", "Some os mililitros.", "Pare em um litro."] },
    "g3-perimeter-garden": { block: "Medida pelo Trabalho", title: "Caminhe ao Redor da Horta", prompt: "Uma horta retangular tem 6 m de comprimento e 4 m de largura. Qual é seu perímetro?", correction: "Some os quatro lados: 6 + 4 + 6 + 4 = 20 metros.", memoryRefresh: { idea: "Perímetro é a distância ao redor de uma forma.", method: ["Comece por um canto.", "Meça cada lado externo.", "Some cada lado uma vez.", "Volte ao canto inicial."], example: "Uma horta de 5 m por 3 m tem perímetro 5 + 3 + 5 + 3 = 16 m." }, rhythm: ["Caminhe por um lado.", "Vire o canto.", "Some até retornar."] },
    "g3-area-floor-squares": { block: "Medida pelo Trabalho", title: "Cubra o Chão da Oficina", prompt: "Um piso retangular tem 7 m de comprimento e 3 m de largura. Qual é sua área?", correction: "Sete quadrados em cada uma de 3 fileiras dão 7 × 3 = 21 metros quadrados.", memoryRefresh: { idea: "A área conta quadrados iguais que cobrem o interior de uma forma.", method: ["Conte os quadrados de uma fileira.", "Conte as fileiras.", "Multiplique os quadrados por fileira pela quantidade de fileiras.", "Diga unidades quadradas."], example: "Três fileiras de cinco quadrados cobrem 15 unidades quadradas." }, rhythm: ["Atravesse uma fileira.", "Conte as fileiras.", "Diga unidades quadradas."] },
    "g3-square-cube-build": { block: "Formas Numéricas", title: "Do Quadrado ao Cubo", prompt: "Quantos blocos formam um cubo de 3 blocos de comprimento, 3 de largura e 3 de altura?", correction: "Multiplique as três dimensões: 3 × 3 × 3 = 27 blocos.", memoryRefresh: { idea: "Um número quadrado forma linhas e colunas iguais; um número cúbico acrescenta camadas iguais.", method: ["Monte um quadrado com linhas e colunas iguais.", "Conte lado × lado.", "Empilhe camadas iguais desse quadrado.", "Conte lado × lado × camadas."], example: "Um quadrado 3 por 3 tem 9 unidades; três camadas iguais formam um cubo 3 por 3 por 3 com 27." }, rhythm: ["Lado por lado.", "Construa a camada.", "Empilhe camadas iguais."] },
    "g3-prime-arrangements": { block: "Formas Numéricas", title: "Números com Apenas Um Retângulo", prompt: "Qual destes números é primo: 9, 11 ou 12? Digite o número primo.", correction: "Nove forma 3 × 3 e doze tem vários arranjos. Onze só forma 1 × 11; portanto, 11 é primo.", memoryRefresh: { idea: "Um número primo maior que 1 só forma um retângulo de 1 por ele mesmo.", method: ["Monte o número com fichas.", "Tente duas fileiras iguais.", "Tente outros tamanhos de fileira.", "Se apenas 1 por ele mesmo funcionar, diga que é primo."], example: "Sete só forma 1 × 7, enquanto oito também forma 2 × 4; por isso, 7 é primo e 8 não." }, rhythm: ["Monte o número.", "Procure fileiras iguais.", "Diga primo ou composto."] },
    "g3-place-value-exchange": { block: "Valor Posicional", title: "Dez Viram Um na Próxima Casa", prompt: "No número 4.582, qual valor o algarismo 5 representa?", correction: "O 5 está na casa das centenas; portanto, representa 500.", memoryRefresh: { idea: "Dez unidades de uma casa podem ser trocadas por uma unidade da casa seguinte à esquerda.", method: ["Monte primeiro as unidades.", "Troque cada dez unidades por uma dezena.", "Troque cada dez dezenas por uma centena.", "Leia das centenas até as unidades."], example: "Vinte e três são 2 dezenas e 3 unidades; mais 10 unidades podem virar outra dezena." }, rhythm: ["Conte até dez.", "Troque um feixe.", "Mova uma casa à esquerda."] },
    "g3-addition-regrouping": { block: "Valor Posicional", title: "Some e Troque", prompt: "Calcule 268 + 157.", correction: "8 + 7 = 15; escreva 5 e troque 10 unidades por 1 dezena. Depois 6 + 5 + 1 = 12 dezenas. O total é 425.", memoryRefresh: { idea: "Quando uma casa chega a dez, troque dez unidades por uma unidade da casa à esquerda.", method: ["Alinhe unidades com unidades e dezenas com dezenas.", "Some as unidades.", "Troque cada grupo de dez e leve-o à esquerda.", "Continue pelas demais casas."], example: "Em 38 + 27, 8 + 7 = 15 unidades; troque 10 por 1 dezena e deixe 5 unidades." }, rhythm: ["Alinhe as casas.", "Some desde as unidades.", "Troque cada dez."] },
    "g3-subtraction-ungrouping": { block: "Valor Posicional", title: "Abra Um Feixe", prompt: "Calcule 73 − 48.", correction: "Troque uma dezena: 73 vira 6 dezenas e 13 unidades. 13 − 8 = 5 e 6 − 4 = 2; resposta 25.", memoryRefresh: { idea: "Quando uma casa tem poucas unidades para subtrair, abra um feixe da casa à esquerda.", method: ["Alinhe as casas correspondentes.", "Comece pelas unidades.", "Se precisar, troque 1 dezena por 10 unidades.", "Subtraia e confira por adição."], example: "Em 52 − 28, abra uma das 5 dezenas: 52 vira 4 dezenas e 12 unidades." }, rhythm: ["Alinhe as casas.", "Abra um feixe se precisar.", "Some de volta para conferir."] },
    "g3-round-nearest-ten": { block: "Valor Posicional", title: "Encontre a Dezena Mais Próxima", prompt: "Arredonde 67 para a dezena mais próxima.", correction: "Sessenta e sete está entre 60 e 70 e fica mais perto de 70.", memoryRefresh: { idea: "Arredondar é descobrir qual número de referência está mais próximo.", method: ["Encontre a dezena inferior.", "Encontre a dezena superior.", "Coloque o número entre elas.", "Escolha a mais próxima; no meio, arredonde para cima."], example: "43 está entre 40 e 50 e fica mais perto de 40." }, rhythm: ["Diga a dezena menor.", "Diga a dezena maior.", "Escolha a mais próxima."] },
  };

  const practices = {
    "g3-measure-common-standard": ["Convert 3 m to centimeters.", "Converta 3 m em centímetros.", 300],
    "g3-mass-market-scale": ["Convert 2 kg to grams.", "Converta 2 kg em gramas.", 2000],
    "g3-capacity-kitchen": ["How many 200 mL cups fill 1 liter?", "Quantos copos de 200 mL enchem 1 litro?", 5],
    "g3-perimeter-garden": ["Find the perimeter of a 5 m by 2 m rectangle.", "Encontre o perímetro de um retângulo de 5 m por 2 m.", 14],
    "g3-area-floor-squares": ["Find the area of a 6 m by 4 m rectangle.", "Encontre a área de um retângulo de 6 m por 4 m.", 24],
    "g3-square-cube-build": ["How many blocks make a 2 by 2 by 2 cube?", "Quantos blocos formam um cubo 2 por 2 por 2?", 8],
    "g3-prime-arrangements": ["Which is prime: 13 or 15?", "Qual é primo: 13 ou 15?", 13],
    "g3-place-value-exchange": ["In 7,346, what value does 3 represent?", "Em 7.346, qual valor o 3 representa?", 300],
    "g3-addition-regrouping": ["Calculate 487 + 268.", "Calcule 487 + 268.", 755],
    "g3-subtraction-ungrouping": ["Calculate 82 − 57.", "Calcule 82 − 57.", 25],
    "g3-round-nearest-ten": ["Round 43 to the nearest ten.", "Arredonde 43 para a dezena mais próxima.", 40],
  };

  Object.entries(practices).forEach(([id, [promptEn, promptPt, answer]]) => {
    bank.en[id] = { prompt: `Try it: ${promptEn}`, answerType: "number", answer, tolerance: 0, steps: ["Build or estimate first.", `The answer is ${answer}.`] };
    bank.pt[id] = { prompt: `Tente: ${promptPt}`, answerType: "number", answer, tolerance: 0, steps: ["Primeiro, construa ou estime.", `A resposta é ${answer}.`] };
  });

  const firstLaterGrade = lessons.findIndex((lesson) => Number(lesson.grade.match(/\d+/)?.[0] || 0) > 3);
  lessons.splice(firstLaterGrade < 0 ? lessons.length : firstLaterGrade, 0, ...grade3Lessons);
  Object.assign(translations, pt);
})();
