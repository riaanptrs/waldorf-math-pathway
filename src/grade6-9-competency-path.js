(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };

  const specs = [
    {
      id: "g6-competency-long-division-check", activityKey: "g6-math-competency-long-division-check", grade: "Grade 6",
      block: ["Core Competency Lab", "Laboratório de Competências"], title: ["Long Division That Checks Itself", "Divisão Longa que Confere a Si Mesma"],
      idea: ["Division is reliable when quotient × divisor + remainder rebuilds the dividend.", "A divisão é confiável quando quociente × divisor + resto reconstrói o dividendo."],
      method: [["Estimate the quotient first.", "Divide one place at a time.", "Keep the remainder smaller than the divisor.", "Multiply back and add the remainder."], ["Primeiro estime o quociente.", "Divida uma casa de cada vez.", "Mantenha o resto menor que o divisor.", "Multiplique de volta e some o resto."]],
      example: ["1,428 ÷ 34 = 42 because 42 × 34 = 1,428.", "1.428 ÷ 34 = 42 porque 42 × 34 = 1.428."],
      prompt: ["A cooperative packs 1,764 oranges equally into 42 crates. How many oranges go in each crate?", "Uma cooperativa distribui 1.764 laranjas igualmente em 42 caixas. Quantas ficam em cada caixa?"], answer: 42,
      correction: ["Estimate near 1,680 ÷ 40. Then check: 42 × 42 = 1,764.", "Estime perto de 1.680 ÷ 40. Depois confira: 42 × 42 = 1.764."],
      guided: [["What multiple of 42 is close to 1,764?", 1680], ["What is 1,764 − 1,680?", 84]],
      practice: ["Practice: 2,268 items are packed into 54 equal boxes. How many per box?", "Treino: 2.268 itens são colocados em 54 caixas iguais. Quantos por caixa?", 42, ["Estimate, divide, then multiply the quotient by 54."], ["Estime, divida e multiplique o quociente por 54."]]
    },
    {
      id: "g6-competency-fraction-decimal-bridge", activityKey: "g6-math-competency-fraction-decimal-bridge", grade: "Grade 6",
      block: ["Core Competency Lab", "Laboratório de Competências"], title: ["One Number, Three Forms", "Um Número, Três Formas"],
      idea: ["A fraction, a division, and a decimal can name the same number.", "Uma fração, uma divisão e um decimal podem nomear o mesmo número."],
      method: [["Read the fraction as division.", "Scale to tenths or hundredths when possible.", "Write the decimal.", "Compare its size with 0, 1/2, and 1."], ["Leia a fração como divisão.", "Transforme em décimos ou centésimos quando possível.", "Escreva o decimal.", "Compare seu tamanho com 0, 1/2 e 1."]],
      example: ["3/8 means 3 ÷ 8, which is 0.375.", "3/8 significa 3 ÷ 8, que é 0,375."],
      prompt: ["Write 7/20 as a decimal.", "Escreva 7/20 como decimal."], answer: 0.35,
      correction: ["Multiply numerator and denominator by 5: 35/100 = 0.35.", "Multiplique numerador e denominador por 5: 35/100 = 0,35."],
      guided: [["What denominator results from 20 × 5?", 100], ["What numerator results from 7 × 5?", 35]],
      practice: ["Practice: Write 9/25 as a decimal.", "Treino: escreva 9/25 como decimal.", 0.36, ["Make an equivalent fraction with denominator 100."], ["Faça uma fração equivalente com denominador 100."]]
    },
    {
      id: "g6-competency-measure-estimate", activityKey: "g6-math-competency-measure-estimate", grade: "Grade 6",
      block: ["Core Competency Lab", "Laboratório de Competências"], title: ["Measure, Convert, and Judge", "Meça, Converta e Avalie"],
      idea: ["A conversion is not finished until its size and unit make sense.", "Uma conversão não termina até que seu tamanho e sua unidade façam sentido."],
      method: [["Estimate the real size.", "Write the unit relationship.", "Multiply or divide with the unit attached.", "Compare the result with the estimate."], ["Estime o tamanho real.", "Escreva a relação entre as unidades.", "Multiplique ou divida mantendo a unidade.", "Compare o resultado com a estimativa."]],
      example: ["2.4 m is 240 cm; 24 cm would be far too short for a doorway.", "2,4 m são 240 cm; 24 cm seria muito pouco para uma porta."],
      prompt: ["A garden bed is 3.6 m long. How many centimetres is that?", "Um canteiro mede 3,6 m de comprimento. Quantos centímetros são?"], answer: 360,
      correction: ["Each metre has 100 cm, so 3.6 × 100 = 360 cm.", "Cada metro tem 100 cm; portanto, 3,6 × 100 = 360 cm."],
      guided: [["How many centimetres are in 1 metre?", 100]],
      practice: ["Practice: Convert 4,750 mL to litres.", "Treino: converta 4.750 mL em litros.", 4.75, ["Divide millilitres by 1,000."], ["Divida os mililitros por 1.000."]]
    },
    {
      id: "g6-competency-percent-sense", activityKey: "g6-math-competency-percent-sense", grade: "Grade 6",
      block: ["Core Competency Lab", "Laboratório de Competências"], title: ["Percent Means Out of One Hundred", "Porcentagem Significa por Cem"],
      idea: ["A percent is a fraction with 100 as its reference whole.", "Uma porcentagem é uma fração que usa 100 como todo de referência."],
      method: [["Name the whole.", "Rewrite the percent as a fraction over 100.", "Use a friendly fraction or decimal.", "Estimate before calculating."], ["Identifique o todo.", "Reescreva a porcentagem como fração sobre 100.", "Use uma fração ou decimal conveniente.", "Estime antes de calcular."]],
      example: ["25% is 25/100 = 1/4, so 25% of 80 is 20.", "25% é 25/100 = 1/4; então 25% de 80 é 20."],
      prompt: ["A class plants 60 seedlings and 35% are herbs. How many herb seedlings are there?", "Uma turma planta 60 mudas e 35% são ervas. Quantas mudas de ervas há?"], answer: 21,
      correction: ["10% of 60 is 6, so 30% is 18 and 5% is 3. Together they make 21.", "10% de 60 é 6; então 30% é 18 e 5% é 3. Juntos, formam 21."],
      guided: [["What is 10% of 60?", 6], ["What is 5% of 60?", 3]],
      practice: ["Practice: Find 15% of 80.", "Treino: encontre 15% de 80.", 12, ["Combine 10% and 5%."], ["Junte 10% e 5%."]]
    },
    {
      id: "g7-competency-percent-change", activityKey: "g7-math-competency-percent-change", grade: "Grade 7",
      block: ["Reasoning Competency Lab", "Laboratório de Raciocínio"], title: ["Measure the Change Against the Start", "Compare a Mudança com o Início"],
      idea: ["Percent change compares the change with the original value, not the final value.", "A variação percentual compara a mudança com o valor inicial, não com o valor final."],
      method: [["Find final − original.", "Divide the change by the original.", "Convert to percent.", "Name increase or decrease."], ["Calcule final − inicial.", "Divida a mudança pelo valor inicial.", "Converta em porcentagem.", "Indique aumento ou redução."]],
      example: ["From 40 to 50, the change is 10 and 10/40 = 25% increase.", "De 40 para 50, a mudança é 10 e 10/40 = 25% de aumento."],
      prompt: ["A bicycle price changes from R$240 to R$300. What is the percent increase?", "O preço de uma bicicleta passa de R$240 para R$300. Qual é o aumento percentual?"], answer: 25,
      correction: ["The change is 60. Compare with the original 240: 60 ÷ 240 = 0.25 = 25%.", "A mudança é 60. Compare com o valor inicial 240: 60 ÷ 240 = 0,25 = 25%."],
      guided: [["What is the price increase?", 60], ["Which starting value is the comparison base?", 240]],
      practice: ["Practice: A quantity decreases from 80 to 68. Find the percent decrease.", "Treino: uma quantidade diminui de 80 para 68. Encontre a redução percentual.", 15, ["Find the decrease, then divide by 80."], ["Encontre a redução e divida por 80."]]
    },
    {
      id: "g7-competency-irrational-diagonal", activityKey: "g7-math-competency-irrational-diagonal", grade: "Grade 7",
      block: ["Reasoning Competency Lab", "Laboratório de Raciocínio"], title: ["The Diagonal That Does Not End", "A Diagonal que Não Termina"],
      idea: ["The diagonal of a unit square has length √2, a number that cannot be written as an exact fraction.", "A diagonal de um quadrado unitário mede √2, um número que não pode ser escrito como fração exata."],
      method: [["Draw the right triangle inside the square.", "Square both side lengths.", "Add them.", "Take the square root and estimate."], ["Desenhe o triângulo retângulo dentro do quadrado.", "Eleve os lados ao quadrado.", "Some os resultados.", "Extraia a raiz e estime."]],
      example: ["For sides 1 and 1, d² = 1² + 1² = 2, so d = √2 ≈ 1.414.", "Para lados 1 e 1, d² = 1² + 1² = 2; então d = √2 ≈ 1,414."],
      prompt: ["A square has side length 5 cm. What is the square of its diagonal length, d²?", "Um quadrado tem lado de 5 cm. Qual é o quadrado do comprimento da diagonal, d²?"], answer: 50,
      correction: ["The diagonal forms a right triangle: d² = 5² + 5² = 25 + 25 = 50.", "A diagonal forma um triângulo retângulo: d² = 5² + 5² = 25 + 25 = 50."],
      guided: [["What is 5²?", 25]],
      practice: ["Practice: A square has side 3. Find d².", "Treino: um quadrado tem lado 3. Encontre d².", 18, ["Add 3² + 3²."], ["Some 3² + 3²."]]
    },
    {
      id: "g7-competency-algebra-story", activityKey: "g7-math-competency-algebra-story", grade: "Grade 7",
      block: ["Reasoning Competency Lab", "Laboratório de Raciocínio"], title: ["Turn a Story into an Equation", "Transforme uma História em Equação"],
      idea: ["A variable holds an unknown quantity; an equation records the relationship in the story.", "Uma variável representa uma quantidade desconhecida; a equação registra a relação da história."],
      method: [["Name the unknown.", "Translate each action in order.", "Write the equality.", "Solve and check in the story."], ["Nomeie a incógnita.", "Traduza cada ação na ordem.", "Escreva a igualdade.", "Resolva e confira na história."]],
      example: ["Three equal notebooks plus R$6 cost R$30: 3n + 6 = 30.", "Três cadernos iguais mais R$6 custam R$30: 3n + 6 = 30."],
      prompt: ["Four equal tickets plus a R$12 fee cost R$92. What is one ticket price?", "Quatro ingressos de mesmo preço mais uma taxa de R$12 custam R$92. Qual é o preço de um ingresso?"], answer: 20,
      correction: ["Write 4t + 12 = 92. Subtract 12, then divide 80 by 4.", "Escreva 4t + 12 = 92. Subtraia 12 e divida 80 por 4."],
      guided: [["What remains after subtracting the fee?", 80]],
      practice: ["Practice: Five equal items plus R$10 cost R$85. Find one item price.", "Treino: cinco itens iguais mais R$10 custam R$85. Ache o preço de um item.", 15, ["Write 5x + 10 = 85."], ["Escreva 5x + 10 = 85."]]
    },
    {
      id: "g7-competency-pythagorean-leg", activityKey: "g7-math-competency-pythagorean-leg", grade: "Grade 7",
      block: ["Reasoning Competency Lab", "Laboratório de Raciocínio"], title: ["Find the Missing Side", "Encontre o Lado que Falta"],
      idea: ["In a right triangle, the hypotenuse square equals the sum of the two leg squares.", "Num triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos."],
      method: [["Identify the hypotenuse.", "Write a² + b² = c².", "Subtract the known leg square.", "Take the positive square root."], ["Identifique a hipotenusa.", "Escreva a² + b² = c².", "Subtraia o quadrado do cateto conhecido.", "Extraia a raiz quadrada positiva."]],
      example: ["With c = 13 and a = 5, b² = 169 − 25 = 144, so b = 12.", "Com c = 13 e a = 5, b² = 169 − 25 = 144; então b = 12."],
      prompt: ["A right triangle has hypotenuse 10 and one leg 6. Find the other leg.", "Um triângulo retângulo tem hipotenusa 10 e um cateto 6. Encontre o outro cateto."], answer: 8,
      correction: ["b² = 10² − 6² = 100 − 36 = 64, so b = 8.", "b² = 10² − 6² = 100 − 36 = 64; então b = 8."],
      guided: [["What is 10² − 6²?", 64]],
      practice: ["Practice: Hypotenuse 17, one leg 8. Find the other leg.", "Treino: hipotenusa 17, um cateto 8. Encontre o outro.", 15, ["Compute √(17² − 8²)."], ["Calcule √(17² − 8²)."]]
    },
    {
      id: "g8-competency-dimensional-chain", activityKey: "g8-math-competency-dimensional-chain", grade: "Grade 8",
      block: ["Applied Competency Lab", "Laboratório de Aplicação"], title: ["Let the Units Cancel", "Deixe as Unidades se Cancelarem"],
      idea: ["Conversion factors equal one, so units can cancel while the quantity stays equivalent.", "Fatores de conversão valem um; assim, as unidades se cancelam sem mudar a quantidade."],
      method: [["Write the starting value with its unit.", "Multiply by a conversion fraction.", "Orient it so the old unit cancels.", "Check the new unit and scale."], ["Escreva o valor inicial com sua unidade.", "Multiplique por uma fração de conversão.", "Posicione-a para cancelar a unidade antiga.", "Confira a nova unidade e a escala."]],
      example: ["3.6 km × 1,000 m / 1 km = 3,600 m.", "3,6 km × 1.000 m / 1 km = 3.600 m."],
      prompt: ["A cyclist travels at 72 km/h. Convert this speed to metres per second.", "Um ciclista se desloca a 72 km/h. Converta essa velocidade em metros por segundo."], answer: 20,
      correction: ["72 × 1,000 ÷ 3,600 = 20 m/s. The km and hour units cancel.", "72 × 1.000 ÷ 3.600 = 20 m/s. As unidades km e hora se cancelam."],
      guided: [["How many metres are in 72 km?", 72000], ["How many seconds are in one hour?", 3600]],
      practice: ["Practice: Convert 54 km/h to m/s.", "Treino: converta 54 km/h em m/s.", 15, ["Multiply by 1,000 and divide by 3,600."], ["Multiplique por 1.000 e divida por 3.600."]]
    },
    {
      id: "g8-competency-trapezoid-area", activityKey: "g8-math-competency-trapezoid-area", grade: "Grade 8",
      block: ["Applied Competency Lab", "Laboratório de Aplicação"], title: ["Rearrange a Trapezoid", "Reorganize um Trapézio"],
      idea: ["Two matching trapezoids form a parallelogram whose base is the sum of the parallel sides.", "Dois trapézios iguais formam um paralelogramo cuja base é a soma dos lados paralelos."],
      method: [["Identify the two parallel sides.", "Add their lengths.", "Multiply by the perpendicular height.", "Take half because one trapezoid is half the pair."], ["Identifique os dois lados paralelos.", "Some seus comprimentos.", "Multiplique pela altura perpendicular.", "Divida por dois, pois um trapézio é metade do par."]],
      example: ["Bases 6 and 10 with height 4 give (6 + 10) × 4 ÷ 2 = 32.", "Bases 6 e 10 com altura 4 dão (6 + 10) × 4 ÷ 2 = 32."],
      prompt: ["A trapezoid has parallel sides 8 m and 14 m and height 5 m. Find its area.", "Um trapézio tem lados paralelos de 8 m e 14 m e altura de 5 m. Encontre sua área."], answer: 55,
      correction: ["Area = (8 + 14) × 5 ÷ 2 = 55 m².", "Área = (8 + 14) × 5 ÷ 2 = 55 m²."],
      guided: [["What is the sum of the parallel sides?", 22]],
      practice: ["Practice: Bases 7 and 13, height 6. Find the area.", "Treino: bases 7 e 13, altura 6. Encontre a área.", 60, ["Use (b₁ + b₂)h/2."], ["Use (b₁ + b₂)h/2."]]
    },
    {
      id: "g8-competency-cylinder-surface", activityKey: "g8-math-competency-cylinder-surface", grade: "Grade 8",
      block: ["Applied Competency Lab", "Laboratório de Aplicação"], title: ["Unroll a Cylinder", "Abra um Cilindro"],
      idea: ["A closed cylinder unfolds into two circles and one rectangle.", "Um cilindro fechado se abre em dois círculos e um retângulo."],
      method: [["Find the area of both circular ends.", "Use circumference × height for the curved rectangle.", "Add all surfaces.", "Keep square units."], ["Encontre a área das duas bases circulares.", "Use circunferência × altura para o retângulo lateral.", "Some todas as superfícies.", "Mantenha unidades quadradas."]],
      example: ["For r = 2 and h = 5, surface area is 2π(2²) + 2π(2)(5) = 28π.", "Para r = 2 e h = 5, a área total é 2π(2²) + 2π(2)(5) = 28π."],
      prompt: ["A closed cylinder has radius 3 cm and height 7 cm. What coefficient multiplies π in its total surface area?" , "Um cilindro fechado tem raio 3 cm e altura 7 cm. Qual coeficiente multiplica π em sua área total?"], answer: 60,
      correction: ["2πr² + 2πrh = 18π + 42π = 60π cm².", "2πr² + 2πrh = 18π + 42π = 60π cm²."],
      guided: [["What coefficient of π comes from both circular ends?", 18], ["What coefficient of π comes from the curved side?", 42]],
      practice: ["Practice: For r = 4 and h = 6, find the coefficient of π in total surface area.", "Treino: para r = 4 e h = 6, encontre o coeficiente de π na área total.", 80, ["Add 2r² and 2rh."], ["Some 2r² e 2rh."]]
    },
    {
      id: "g8-competency-algorithm-trace", activityKey: "g8-math-competency-algorithm-trace", grade: "Grade 8",
      block: ["Applied Competency Lab", "Laboratório de Aplicação"], title: ["Trace an Algorithm", "Acompanhe um Algoritmo"],
      idea: ["An algorithm is an exact sequence; tracing records how its value changes after each instruction.", "Um algoritmo é uma sequência exata; acompanhá-lo registra como o valor muda após cada instrução."],
      method: [["Write the starting value.", "Apply one instruction only.", "Record the new value.", "Repeat and test the result."], ["Escreva o valor inicial.", "Aplique apenas uma instrução.", "Registre o novo valor.", "Repita e teste o resultado."]],
      example: ["Start 5; multiply by 3; subtract 2 gives 13.", "Comece com 5; multiplique por 3; subtraia 2; o resultado é 13."],
      prompt: ["Algorithm: start with 7; square it; subtract 9; divide by 5. What is the output?", "Algoritmo: comece com 7; eleve ao quadrado; subtraia 9; divida por 5. Qual é a saída?"], answer: 8,
      correction: ["7 → 49 → 40 → 8. Each arrow follows exactly one instruction.", "7 → 49 → 40 → 8. Cada seta segue exatamente uma instrução."],
      guided: [["What is 7 squared?", 49], ["What remains after subtracting 9?", 40]],
      practice: ["Practice: start 6; double; add 8; divide by 4. Find the output.", "Treino: comece com 6; dobre; some 8; divida por 4. Encontre a saída.", 5, ["Record a value after every instruction."], ["Registre um valor após cada instrução."]]
    },
    {
      id: "g9-competency-function-table", activityKey: "g9-math-competency-function-table", grade: "Grade 9",
      block: ["Algebra Readiness Lab", "Laboratório de Prontidão Algébrica"], title: ["Connect Table, Rule, and Graph", "Conecte Tabela, Regra e Gráfico"],
      idea: ["A linear function is one relationship shown in three languages: table, equation, and graph.", "Uma função linear é uma relação mostrada em três linguagens: tabela, equação e gráfico."],
      method: [["Find the change in y for one unit of x.", "Find y when x = 0.", "Write y = mx + b.", "Check every table row."], ["Encontre a variação de y para uma unidade de x.", "Encontre y quando x = 0.", "Escreva y = mx + b.", "Confira cada linha da tabela."]],
      example: ["Points (0, 3), (1, 5), (2, 7) follow y = 2x + 3.", "Os pontos (0, 3), (1, 5), (2, 7) seguem y = 2x + 3."],
      prompt: ["The points (0, 4), (1, 7), (2, 10) are linear. What is y when x = 6?", "Os pontos (0, 4), (1, 7), (2, 10) são lineares. Qual é y quando x = 6?"], answer: 22,
      correction: ["The rate is 3 and the starting value is 4, so y = 3x + 4. At x = 6, y = 22.", "A taxa é 3 e o valor inicial é 4; então y = 3x + 4. Para x = 6, y = 22."],
      guided: [["What is the change in y for each +1 in x?", 3], ["What is y when x = 0?", 4]],
      graph: { xLabel: "x", yLabel: "y", points: [[0,4],[1,7],[2,10],[3,13]], line: true },
      practice: ["Practice: (0, 2), (1, 6), (2, 10). Find y when x = 5.", "Treino: (0, 2), (1, 6), (2, 10). Encontre y quando x = 5.", 22, ["Find m and b, then substitute x = 5."], ["Encontre m e b e substitua x = 5."]]
    },
    {
      id: "g9-competency-system-decision", activityKey: "g9-math-competency-system-decision", grade: "Grade 9",
      block: ["Algebra Readiness Lab", "Laboratório de Prontidão Algébrica"], title: ["When Two Plans Cost the Same", "Quando Dois Planos Custam o Mesmo"],
      idea: ["The solution of a system is the input where both relationships produce the same output.", "A solução de um sistema é a entrada em que as duas relações produzem a mesma saída."],
      method: [["Write one equation for each plan.", "Set their outputs equal.", "Solve for the shared input.", "Substitute to check both costs."], ["Escreva uma equação para cada plano.", "Iguale as saídas.", "Resolva a entrada comum.", "Substitua para conferir os dois custos."]],
      example: ["Plans 2x + 12 and 5x meet when 2x + 12 = 5x, so x = 4.", "Os planos 2x + 12 e 5x se encontram quando 2x + 12 = 5x; então x = 4."],
      prompt: ["Plan A costs R$18 plus R$3 per use. Plan B costs R$6 per use. After how many uses do they cost the same?", "O Plano A custa R$18 mais R$3 por uso. O Plano B custa R$6 por uso. Após quantos usos têm o mesmo custo?"], answer: 6,
      correction: ["Solve 18 + 3x = 6x. Then 18 = 3x, so x = 6; both cost R$36.", "Resolva 18 + 3x = 6x. Então 18 = 3x e x = 6; ambos custam R$36."],
      guided: [["After subtracting 3x, what equation remains: 18 = ?x", 3]],
      graph: { xLabel: "uses", yLabel: "cost", points: [[0,18],[2,24],[4,30],[6,36]], secondPoints: [[0,0],[2,12],[4,24],[6,36]], line: true },
      practice: ["Practice: Plan A is 10 + 2x; Plan B is 4x. Find the equal-cost x.", "Treino: Plano A é 10 + 2x; Plano B é 4x. Encontre o x de mesmo custo.", 5, ["Set 10 + 2x equal to 4x."], ["Iguale 10 + 2x a 4x."]]
    },
    {
      id: "g9-competency-quadratic-geometry", activityKey: "g9-math-competency-quadratic-geometry", grade: "Grade 9",
      block: ["Algebra Readiness Lab", "Laboratório de Prontidão Algébrica"], title: ["Build a Quadratic from Area", "Construa uma Quadrática pela Área"],
      idea: ["When two changing lengths multiply, area creates a quadratic relationship.", "Quando dois comprimentos variáveis se multiplicam, a área cria uma relação quadrática."],
      method: [["Name each changing length.", "Multiply to write the area.", "Expand only after the geometry is clear.", "Solve and reject impossible lengths."], ["Nomeie cada comprimento variável.", "Multiplique para escrever a área.", "Expanda apenas após entender a geometria.", "Resolva e rejeite comprimentos impossíveis."]],
      example: ["Sides x and x + 3 give area x(x + 3) = x² + 3x.", "Lados x e x + 3 dão área x(x + 3) = x² + 3x."],
      prompt: ["A rectangle has sides x and x + 5 and area 84. What positive value of x makes the rectangle?", "Um retângulo tem lados x e x + 5 e área 84. Qual valor positivo de x forma o retângulo?"], answer: 7,
      correction: ["x(x + 5) = 84, so x² + 5x − 84 = 0 = (x + 12)(x − 7). Length must be positive, so x = 7.", "x(x + 5) = 84; então x² + 5x − 84 = 0 = (x + 12)(x − 7). O comprimento deve ser positivo; logo x = 7."],
      guided: [["What second side results when x = 7?", 12]],
      practice: ["Practice: sides x and x + 4 have area 96. Find positive x.", "Treino: lados x e x + 4 têm área 96. Encontre x positivo.", 8, ["Find two positive side lengths differing by 4 with product 96."], ["Encontre dois lados positivos com diferença 4 e produto 96."]]
    },
    {
      id: "g9-competency-growth-check", activityKey: "g9-math-competency-growth-check", grade: "Grade 9",
      block: ["Algebra Readiness Lab", "Laboratório de Prontidão Algébrica"], title: ["Test a Growth Model", "Teste um Modelo de Crescimento"],
      idea: ["Linear growth adds an equal amount; exponential growth multiplies by an equal factor.", "O crescimento linear soma uma quantidade constante; o exponencial multiplica por um fator constante."],
      method: [["Compare consecutive differences.", "Compare consecutive ratios.", "Choose the structure that stays constant.", "Use it to predict and check."], ["Compare as diferenças consecutivas.", "Compare as razões consecutivas.", "Escolha a estrutura que permanece constante.", "Use-a para prever e conferir."]],
      example: ["100, 120, 144 multiplies by 1.2, so it grows exponentially by 20%.", "100, 120, 144 multiplica por 1,2; portanto, cresce exponencialmente 20%."],
      prompt: ["A quantity follows 200, 230, 264.5. What is the next value if the same growth model continues?", "Uma quantidade segue 200, 230, 264,5. Qual é o próximo valor se o mesmo modelo continuar?"], answer: 304.175,
      correction: ["Each term is multiplied by 1.15. Then 264.5 × 1.15 = 304.175.", "Cada termo é multiplicado por 1,15. Então 264,5 × 1,15 = 304,175."],
      guided: [["What growth factor changes 200 into 230?", 1.15]],
      graph: { xLabel: "period", yLabel: "value", points: [[0,200],[1,230],[2,264.5],[3,304.175]], line: true },
      practice: ["Practice: 80, 100, 125 follows one model. Find the next value.", "Treino: 80, 100, 125 segue um modelo. Encontre o próximo valor.", 156.25, ["Find the constant multiplication factor."], ["Encontre o fator constante de multiplicação."]]
    }
  ];

  specs.forEach((spec) => {
    const lesson = {
      id: spec.id, activityKey: spec.activityKey, grade: spec.grade, block: spec.block[0], title: spec.title[0], time: "16 min",
      sourceFocus: "Original competency lesson informed by developmental middle-school learning goals; no source exercises reproduced.",
      teacherAim: "Learners connect meaning, method, estimation, and verification before treating the process as fluent.",
      memoryRefresh: { idea: spec.idea[0], method: spec.method[0], example: spec.example[0] },
      rhythm: ["Predict before calculating.", "Keep relationships and units visible.", "Check the result in the original situation."],
      prompt: spec.prompt[0], correction: spec.correction[0], answerType: "number", answer: spec.answer, tolerance: 0.001,
      guidedSteps: (spec.guided || []).map(([label, answer]) => ({ label, answerType: "number", answer, tolerance: 0.001 })),
      ...(spec.graph ? { graphModel: spec.graph } : {}),
    };
    lessons.push(lesson);
    translations[spec.id] = {
      block: spec.block[1], title: spec.title[1], prompt: spec.prompt[1], correction: spec.correction[1],
      memoryRefresh: { idea: spec.idea[1], method: spec.method[1], example: spec.example[1] },
      rhythm: ["Preveja antes de calcular.", "Mantenha relações e unidades visíveis.", "Confira o resultado na situação original."],
      guidedSteps: (spec.guided || []).map(([, answer], index) => ({ label: `Etapa guiada ${index + 1}: encontre a quantidade intermediária.`, answerType: "number", answer, tolerance: 0.001 })),
      ...(spec.graph ? { graphModel: spec.graph } : {}),
    };
    bank.en[spec.id] = { prompt: spec.practice[0], answerType: "number", answer: spec.practice[2], tolerance: 0.001, steps: spec.practice[3] };
    bank.pt[spec.id] = { prompt: spec.practice[1], answerType: "number", answer: spec.practice[2], tolerance: 0.001, steps: spec.practice[4] };
  });

  lessons.sort((a, b) => Number(a.grade.match(/\d+/)?.[0] || 0) - Number(b.grade.match(/\d+/)?.[0] || 0));
})();
