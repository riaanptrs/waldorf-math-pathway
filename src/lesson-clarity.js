// Bilingual entry activities and clarifications, applied after the lesson catalogue.
(() => {
  const lessons = window.lessons;
  const translations = window.lessonTranslations;
  const entryActivities = {
    "g1-number-quality-five": [
      ["Show five fingers.", "Take five steps.", "Put five small objects on the table."],
      ["Mostre cinco dedos.", "Dê cinco passos.", "Coloque cinco objetos pequenos na mesa."],
      "Move two of your five objects aside. Point to the objects left in the first group and count them. Enter that number below. Someone can read the question with you.",
      "Separe dois dos seus cinco objetos. Aponte para os que ficaram no primeiro grupo e conte. Digite essa quantidade abaixo. Alguém pode ler a pergunta com você."
    ],
    "g2-calendar-months": [
      ["Find a calendar, on paper or on a screen.", "Point to January, then February, then March.", "Say which month your birthday is in. Ask someone if you are unsure."],
      ["Pegue um calendário de papel ou abra um na tela.", "Aponte para janeiro, depois fevereiro e março.", "Diga em que mês é seu aniversário. Peça ajuda se não souber."],
      "Start at January and count one month at a time until June. What position does June have? Enter the month number below.",
      "Comece em janeiro e conte um mês de cada vez até junho. Em que posição junho fica? Digite abaixo o número desse mês."
    ],
    "g3-measure-common-standard": [
      ["Measure the short side of a notebook with your hand span.", "Measure the same side in centimetres with a ruler.", "Would someone with a larger hand get the same number of hand spans? Say why."],
      ["Meça o lado menor de um caderno com seu palmo.", "Meça o mesmo lado em centímetros com uma régua.", "Uma pessoa com a mão maior encontraria a mesma quantidade de palmos? Diga por quê."],
      "One metre contains 100 centimetres. Draw two metre-long sections joined end to end and label each 100 cm. How many centimetres are in the whole board?",
      "Um metro contém 100 centímetros. Desenhe dois trechos de um metro unidos pelas pontas e marque 100 cm em cada um. Quantos centímetros tem a tábua inteira?"
    ],
    "g4-place-value-regrouping": [
      ["Write 36 as tens and ones.", "How many tens can you make with 20 ones?", "Calculate 8 + 7 aloud. How many tens and leftover ones is that?"],
      ["Escreva 36 como dezenas e unidades.", "Quantas dezenas você pode formar com 20 unidades?", "Calcule 8 + 7 em voz alta. Quantas dezenas e unidades soltas isso dá?"],
      "For 268 + 157, draw hundreds, tens and ones, or arrange the numbers in columns. Try combining the ones first. How can you regroup without changing the total?",
      "Para 268 + 157, desenhe centenas, dezenas e unidades ou organize os números em colunas. Experimente juntar primeiro as unidades. Como reagrupar sem mudar o total?"
    ],
    "g5-division-place-value-shortcut": [
      ["Answer aloud or in your notebook: 30 ÷ 5 = ?", "What is 300 ÷ 5? What changed from the first question?", "Find 3,000 ÷ 5. Will 3,185 ÷ 5 be larger or smaller?"],
      ["Responda em voz alta ou no caderno: 30 ÷ 5 = ?", "Quanto é 300 ÷ 5? O que mudou em relação à primeira pergunta?", "Calcule 3.000 ÷ 5. O resultado de 3.185 ÷ 5 será maior ou menor?"],
      "This opening review connects sharing in parts to written division. Try sharing 3,185 equally among five groups, using a drawing, parts or a written calculation. Enter each group's share below. Open support to see the written steps if needed.",
      "Esta revisão inicial liga a divisão em partes à conta escrita. Tente repartir 3.185 igualmente entre cinco grupos, usando desenho, partes ou uma conta. Digite abaixo a parte de cada grupo. Abra o apoio se precisar ver os passos da conta."
    ],
    "g6-decimal-place-system": [
      ["Calculate 600 ÷ 100.", "Write 84 hundredths as a decimal.", "Will 684 ÷ 100 be between 6 and 7, or between 60 and 70? Explain your prediction."],
      ["Calcule 600 ÷ 100.", "Escreva 84 centésimos como número decimal.", "684 ÷ 100 ficará entre 6 e 7 ou entre 60 e 70? Explique sua previsão."],
      "Split 684 into 600 and 84. What happens when you divide each part by 100? Combine the parts, then check your result by multiplying by 100.",
      "Separe 684 em 600 e 84. O que acontece ao dividir cada parte por 100? Junte os resultados e confira multiplicando por 100."
    ],
    "g8-binary-place-value": [
      ["In the ordinary number 101, what is each 1 worth?", "Continue this pattern: 1, 2, 4, 8, __.", "What operation takes you from one number in that pattern to the next?"],
      ["No número usual 101, quanto vale cada algarismo 1?", "Continue o padrão: 1, 2, 4, 8, __.", "Que operação leva de um número desse padrão ao seguinte?"],
      "In base two, the places are worth 1, 2, 4, 8, 16 from right to left. A 1 uses that place value; a 0 leaves it out. Write 11010 above those places. Which values will you add to find its ordinary base-ten number?",
      "Na base dois, as casas valem 1, 2, 4, 8, 16 da direita para a esquerda. O algarismo 1 usa o valor da casa; o 0 deixa esse valor de fora. Escreva 11010 sobre essas casas. Que valores você vai somar para encontrar o número na base dez?"
    ],
    "g9-algebra-expression-language": [
      ["Write and calculate: five times 3, then add 7.", "Repeat with 4 instead of 3.", "Which number changed? Which operations stayed the same?"],
      ["Escreva e calcule: cinco vezes 3, depois some 7.", "Repita usando 4 no lugar de 3.", "Que número mudou? Que operações continuaram iguais?"],
      "Use x for the number that can change. How can you write 'five times that number, then add seven' without choosing a value for x? Enter an expression, not a numerical total. You can type * for multiplication.",
      "Use x para representar o número que pode mudar. Como escrever 'cinco vezes esse número, depois somar sete' sem escolher um valor para x? Digite uma expressão, sem calcular um total numérico. Você pode usar * para multiplicar."
    ]
  };
  for (const [id, [en, pt, enDiscovery, ptDiscovery]] of Object.entries(entryActivities)) {
    Object.assign(lessons.find(l => l.id === id), { warmup: en, discoveryPrompt: enDiscovery });
    Object.assign(translations[id], { warmup: pt, discoveryPrompt: ptDiscovery });
  }
  const table = lessons.find(l => l.id === "g7-table-square-products");
  table.warmup = table.rhythm;
  translations[table.id].warmup = translations[table.id].rhythm;

  const prompts = {
    "g2-calendar-months": ["January is month 1, February is month 2, and March is month 3. What is June's month number?", "Janeiro é o mês 1, fevereiro é o mês 2 e março é o mês 3. Qual é o número do mês de junho?"],
    "g3-perimeter-garden": ["A rectangular garden is 6 m long and 4 m wide. What is the total distance around its four sides, in metres?", "Uma horta retangular tem 6 m de comprimento e 4 m de largura. Qual é a distância total ao redor dos quatro lados, em metros?"],
    "g3-area-floor-squares": ["A rectangular floor is 7 m long and 3 m wide. How many squares of 1 m² cover the floor? Enter its area in square metres.", "Um piso retangular tem 7 m de comprimento e 3 m de largura. Quantos quadrados de 1 m² cobrem o piso? Digite a área em metros quadrados."],
    "g4-square-patterns": ["Stones fill 9 complete rows, with 9 stones in every row. How many stones are in this filled square arrangement?", "As pedras formam 9 fileiras completas, com 9 pedras em cada fileira. Quantas pedras há nesse quadrado preenchido?"],
    "g4-fractions-common-denominator": ["Write a fraction equal to 3/4 with denominator 12: ?/12. Enter only the missing numerator.", "Escreva uma fração equivalente a 3/4 com denominador 12: ?/12. Digite apenas o numerador que falta."],
    "g6-fraction-multiplication": ["Calculate 3/5 × 10/12. Simplify the fraction as far as possible.", "Calcule 3/5 × 10/12. Simplifique a fração até a forma irredutível."],
    "g6-simple-interest": ["A student borrows R$100 at 10% simple interest per year. What total must the student repay after one year, including interest, in reais?", "Um estudante toma R$100 emprestados, com juros simples de 10% ao ano. Qual é o total que deve devolver após um ano, incluindo os juros, em reais?"],
    "g7-fraction-common-denominator": ["Add 5/6 + 3/8. Give the total as a fraction or mixed number. Open the optional steps if you need help.", "Some 5/6 + 3/8. Escreva o total como fração ou número misto. Abra os passos opcionais se precisar de ajuda."],
    "g7-repeating-decimal-fraction": ["Write 0.363636… as a fraction in simplest form. The entire block 36 repeats forever.", "Escreva 0,363636… como fração irredutível. O bloco inteiro 36 se repete sem parar."],
    "g7-ratios-decimal-form": ["Rewrite 7:4 as an equivalent ratio of the form ?:1. Enter only the decimal number replacing ?.", "Reescreva 7:4 como uma razão equivalente na forma ?:1. Digite apenas o número decimal que substitui ?."],
    "g7-ratios-similar-figures": ["A rectangle has length 6 cm and height 4 cm. A similar rectangle has height 10 cm. What is its corresponding length, in centimetres?", "Um retângulo tem comprimento de 6 cm e altura de 4 cm. Outro retângulo semelhante tem altura de 10 cm. Qual é o comprimento correspondente, em centímetros?"],
    "g7-ratios-shadow": ["At the same time on level ground, a 2 m pole casts a 3 m shadow and a tree casts a 12 m shadow. Both stand vertically. How tall is the tree, in metres?", "No mesmo momento, em terreno plano, uma vara de 2 m projeta uma sombra de 3 m e uma árvore projeta uma sombra de 12 m. Ambas estão na vertical. Qual é a altura da árvore, em metros?"],
    "g7-ratios-lever": ["On a balanced seesaw, a 25 kg child sits 1.8 m from the pivot. How far from the pivot must a 20 kg child sit on the opposite side? Ignore the seesaw's own weight. Answer in metres.", "Numa gangorra em equilíbrio, uma criança de 25 kg senta a 1,8 m do ponto de apoio. A que distância desse ponto deve sentar uma criança de 20 kg, do lado oposto? Desconsidere o peso da gangorra. Responda em metros."],
    "g7-unit-cost": ["Store A sells 6 pencils for $4.20. Store B sells 10 pencils for $6.50. Which store has the lower price per pencil? Enter A or B.", "A loja A vende 6 lápis por 4,20 dólares. A loja B vende 10 lápis por 6,50 dólares. Qual loja tem o menor preço por lápis? Digite A ou B."],
    "g8-proportions-constant-rate": ["The pairs (x, y) are (2, 6), (4, 12), and (6, 18). In y = k × x, what is k, the amount of y per unit of x?", "Os pares (x, y) são (2, 6), (4, 12) e (6, 18). Em y = k × x, quanto vale k, a quantidade de y para cada unidade de x?"],
    "g8-proportions-compare-slopes": ["Path A follows y = 6x and Path B follows y = 4x. For each increase of 1 in x, how much greater is the increase in y for A than for B?", "O caminho A segue y = 6x e o B segue y = 4x. A cada aumento de 1 em x, quantas unidades a mais y aumenta no caminho A em comparação com o B?"],
    "g8-proportions-not-proportional": ["A service charges a fixed R$5 plus R$2 per hour. Let x be hours and y be total cost in reais. What is y when x = 0?", "Um serviço cobra uma taxa fixa de R$5 mais R$2 por hora. A letra x representa as horas e y representa o custo total em reais. Quanto vale y quando x = 0?"],
    "g8-proportions-inverse": ["One worker takes 24 hours to finish a task. Six people work together at the same individual rate, sharing the work equally. How many hours will they need?", "Uma pessoa leva 24 horas para concluir uma tarefa. Seis pessoas trabalham juntas, no mesmo ritmo individual, dividindo igualmente o trabalho. De quantas horas precisam?"],
    "g8-competency-cylinder-surface": ["A closed cylinder, including its top and bottom, has radius 3 cm and height 7 cm. Write its total surface area as A × π cm². Enter only A.", "Um cilindro fechado, incluindo a tampa e o fundo, tem raio de 3 cm e altura de 7 cm. Escreva sua área total como A × π cm². Digite apenas A."],
    "g9-algebra-system-intersection": ["Find where the lines y = x + 2 and y = 8 - 2x meet. What is the x-coordinate of that point? Enter only x.", "Encontre o ponto de encontro das retas y = x + 2 e y = 8 - 2x. Qual é a coordenada x desse ponto? Digite apenas x."],
    "g9-competency-function-table": ["The points (0, 4), (1, 7), and (2, 10) lie on the same straight line. What is y on that line when x = 6?", "Os pontos (0, 4), (1, 7) e (2, 10) estão na mesma reta. Quanto vale y nessa reta quando x = 6?"],
    "g9-competency-growth-check": ["A quantity grows by the same percentage each step: 200, 230, 264.5. What is the next value?", "Uma quantidade cresce pela mesma porcentagem a cada etapa: 200; 230; 264,5. Qual é o próximo valor?"]
  };
  for (const [id, [en, pt]] of Object.entries(prompts)) {
    lessons.find(l => l.id === id).prompt = en;
    translations[id].prompt = pt;
  }

  // Preserve each check's answer while giving Portuguese learners the missing question.
  const stepLabels = {
    "g3-subtraction-no-exchange": ["Unidades: 5 − 2", "Dezenas: 8 − 4"],
    "g3-subtraction-open-ten": ["Quantas unidades há depois de trocar uma dezena?", "Quantas dezenas restam?"],
    "g3-subtraction-three-places": ["Diferença nas unidades: 8 − 5", "Diferença nas dezenas: 6 − 2"],
    "g3-subtraction-open-hundred": ["Quantas dezenas há depois de trocar uma centena?", "Quantas centenas restam?"],
    "g3-subtraction-two-exchanges": ["Quantas unidades há depois da primeira troca?", "Quantas dezenas há depois da segunda troca?"],
    "g4-subtraction-through-zero": ["Quantas dezenas restam depois de passar uma dezena para as unidades?", "Quantas unidades estão disponíveis?"],
    "g4-subtraction-strategy-choice": ["Quanto falta de 1.988 até 2.000?"],
    "g4-subtraction-estimate-check": ["Estime usando 4.100 − 2.800."],
    "g4-division-share-big-whole": ["Quanto é distribuído ao dar 100 a cada um dos 6 grupos?", "Quanto resta de 672 depois dessa distribuição?"],
    "g4-division-story-columns": ["Quanto resta de 1.284 depois de distribuir 1.200?", "Quanto resta depois de distribuir mais 80?"],
    "g4-division-flexible-chunks": ["Quanto resta de 1.880 depois de retirar 5 × 300?", "Quanto resta depois de retirar mais 5 × 70?"],
    "g4-division-remainder-meaning": ["Quantas maçãs cabem em 16 caixas completas de 6?", "Quantas maçãs restam das 98?"],
    "g5-division-place-value-shortcut": ["Primeiro algarismo do quociente: quantas vezes 5 cabe em 31?", "Qual é o resto de 31 − 30?"],
    "g5-division-two-digit-divisor": ["Calcule 11 × 250.", "Quanto resta de 2.772 depois de retirar esse produto?"],
    "g6-division-decimal-quotient": ["Quantas vezes inteiras 8 cabe em 13?", "Qual é o primeiro algarismo depois da vírgula?"],
    "g6-division-repeating-pattern": ["Qual é o primeiro algarismo depois da vírgula em 5 ÷ 6?"]
  };
  for (const [id, labels] of Object.entries(stepLabels)) {
    translations[id].guidedSteps.forEach((step, i) => { step.label = labels[i]; });
  }

  const division = lessons.find(l => l.id === "g5-division-place-value-shortcut");
  division.title = "From Sharing in Parts to Written Division";
  translations[division.id].title = "Da divisão em partes à conta escrita";
  division.correction = "31 ÷ 5 gives 6 with remainder 1. Bring down 8: 18 ÷ 5 gives 3 with remainder 3. Bring down 5: 35 ÷ 5 gives 7. The quotient is 637. Check: 637 × 5 = 3,185.";
  translations[division.id].correction = "31 ÷ 5 dá 6 e resto 1. Baixe o 8: 18 ÷ 5 dá 3 e resto 3. Baixe o 5: 35 ÷ 5 dá 7. O quociente é 637. Confira: 637 × 5 = 3.185.";
  translations["g6-decimal-place-system"].correction = "Dividir por 100 torna o valor de cada algarismo cem vezes menor. No quadro de valor posicional, cada algarismo passa duas casas para a direita: 684 se torna 6,84. Confira: 6,84 × 100 = 684.";
  lessons.find(l => l.id === "g7-missing-digit").guidedSteps[0].label = "Which digit makes the entire equation 4? × 6 = 276 true? Test the tens as well as the ones.";
  translations["g7-missing-digit"].guidedSteps[0].label = "Qual algarismo torna a conta inteira 4? × 6 = 276 verdadeira? Teste as dezenas e as unidades.";
  const unitCost = lessons.find(l => l.id === "g7-unit-cost");
  unitCost.acceptedAnswers.push("loja b", "lojab");
  unitCost.guidedSteps[2].acceptedAnswers.push("loja b", "lojab");
  translations[unitCost.id].guidedSteps[2].acceptedAnswers.push("loja b", "lojab");
})();
