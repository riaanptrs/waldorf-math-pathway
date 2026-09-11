// Original activities informed by Ron Jarman's teaching sequence; no book exercises reproduced.
(() => {
  const lessons = window.lessons;
  const translations = window.lessonTranslations;
  const bank = window.extraPracticeBank;
  const entries = [
    {
      grade: 1, key: "hidden-whole", block: "Whole and Parts", pages: "238–239",
      en: {
        title: "The Part You Cannot See", aim: "Move from a visible whole to an imagined missing part, then connect addition and subtraction.",
        hook: "Can you know what is under a cloth without lifting it?", materials: "10 counters and a cloth; an adult or partner",
        actions: ["Count 10 counters together. Move them into two groups.", "Ask your partner to hide one group. Count the visible counters.", "Picture the whole ten and say how many must be hidden. Lift the cloth to check."],
        observe: "Change the groups. What stays the same? Draw one arrangement and tell its addition and subtraction stories.",
        rhythm: ["Count five gentle taps.", "Count five more.", "Show ten fingers, then fold three."],
        prompt: "There are 10 counters altogether. You see 6. How many are hidden?", correction: "4 are hidden: 6 + 4 = 10, and 10 − 6 = 4.",
        idea: "The whole stays the same when we separate it into parts.", method: ["Remember the whole.", "Count the visible part.", "Count on to the whole.", "Uncover and check."], example: "With 8 altogether and 3 visible, 5 are hidden.",
        labels: ["How many counters are there altogether?", "How many can you see?"],
        practice: "Now hide 3 of the same 10 counters. How many remain visible?", steps: ["Keep the whole at 10.", "10 − 3 = 7; check 7 + 3 = 10."]
      },
      pt: {
        title: "A Parte que Você Não Vê", aim: "Passar do todo visível à parte imaginada e relacionar adição e subtração.",
        hook: "Você consegue saber o que está debaixo do pano sem levantá-lo?", materials: "10 peças de contagem, um pano e um adulto ou colega",
        actions: ["Contem 10 peças. Separem em dois grupos.", "Peça ao colega que esconda um grupo. Conte as peças visíveis.", "Imagine as dez peças e diga quantas estão escondidas. Levante o pano para conferir."],
        observe: "Mude os grupos. O que permanece igual? Desenhe uma divisão e conte suas histórias de adição e subtração.",
        rhythm: ["Conte cinco batidas suaves.", "Conte mais cinco.", "Mostre dez dedos e dobre três."],
        prompt: "Há 10 peças ao todo. Você vê 6. Quantas estão escondidas?", correction: "Há 4 escondidas: 6 + 4 = 10 e 10 − 6 = 4.",
        idea: "O todo permanece igual quando o separamos em partes.", method: ["Lembre o todo.", "Conte a parte visível.", "Conte até chegar ao todo.", "Descubra e confira."], example: "Com 8 ao todo e 3 visíveis, há 5 escondidas.",
        labels: ["Quantas peças há ao todo?", "Quantas você consegue ver?"],
        practice: "Agora esconda 3 das mesmas 10 peças. Quantas ficam visíveis?", steps: ["Mantenha o total de 10.", "10 − 3 = 7; confira 7 + 3 = 10."]
      }, answer: 4, checks: [10, 6], practiceAnswer: 7
    },
    {
      grade: 2, key: "turn-the-array", block: "Rhythm and Tables", pages: "239–240",
      en: {
        title: "Turn the Garden Rows", aim: "Connect rhythmic tables, equal groups, and multiplication in either order.",
        hook: "Can turning a garden change the number of plants?", materials: "12 counters and paper",
        actions: ["Make 3 rows with 4 counters in each. Tap and count 4, 8, 12.", "Turn the paper a quarter turn. Count the new rows and counters per row.", "Write both multiplication stories without adding or removing counters."],
        observe: "Explain why the total stays the same. Then share the counters into four equal groups.",
        rhythm: ["Count 4, 8, 12.", "Count 3, 6, 9, 12.", "Clap the groups in reverse."],
        prompt: "Turn 3 rows of 4 into 4 rows of 3. How many counters are there altogether?", correction: "Both arrangements have 12 counters: 3 × 4 = 4 × 3.",
        idea: "Turning an array swaps rows and columns but preserves the total.", method: ["Count the rows.", "Count each row.", "Multiply.", "Turn and compare."], example: "2 rows of 5 and 5 rows of 2 both hold 10.", labels: ["How many rows did you begin with?", "How many counters were in each original row?"],
        practice: "Share those 12 counters into 4 equal groups. How many belong in each group?", steps: ["Undo the multiplication by sharing.", "12 ÷ 4 = 3; check 4 × 3 = 12."]
      },
      pt: {
        title: "Gire as Fileiras da Horta", aim: "Relacionar tabuada rítmica, grupos iguais e multiplicação nas duas ordens.",
        hook: "Girar uma horta pode mudar a quantidade de plantas?", materials: "12 peças de contagem e papel",
        actions: ["Faça 3 fileiras de 4 peças. Bata e conte 4, 8, 12.", "Gire o papel um quarto de volta. Conte as novas fileiras e as peças em cada uma.", "Escreva as duas multiplicações sem retirar nem acrescentar peças."],
        observe: "Explique por que o total continua igual. Depois distribua as peças em quatro grupos iguais.",
        rhythm: ["Conte 4, 8, 12.", "Conte 3, 6, 9, 12.", "Bata palmas contando os grupos de trás para frente."],
        prompt: "Gire 3 fileiras de 4 para obter 4 fileiras de 3. Quantas peças há ao todo?", correction: "As duas organizações têm 12 peças: 3 × 4 = 4 × 3.",
        idea: "Girar uma organização retangular troca fileiras e colunas, preservando o total.", method: ["Conte as fileiras.", "Conte cada fileira.", "Multiplique.", "Gire e compare."], example: "2 fileiras de 5 e 5 de 2 têm 10 peças.", labels: ["Com quantas fileiras você começou?", "Quantas peças havia em cada fileira original?"],
        practice: "Distribua as 12 peças em 4 grupos iguais. Quantas ficam em cada grupo?", steps: ["Desfaça a multiplicação repartindo.", "12 ÷ 4 = 3; confira 4 × 3 = 12."]
      }, answer: 12, checks: [3, 4], practiceAnswer: 3
    },
    {
      grade: 3, key: "measure-before-cutting", block: "Measure Through Work", pages: "240–241",
      en: {
        title: "Plan Before Cutting", aim: "Connect practical measurement, estimation, subtraction, and an inverse check.",
        hook: "Will one ribbon be long enough for a craft project?", materials: "A 2 m length of string, measuring tape and two clips",
        actions: ["Estimate where 75 cm falls on the string. Mark your estimate with a clip.", "Measure 75 cm and mark the actual position with the other clip; no cutting needed.", "Measure the remaining length. Draw the whole string and its two parts."],
        observe: "Compare your estimate and measurement. Add the two measured parts to check the original length.",
        rhythm: ["Recall 100 cm in a metre.", "Count by 25 to 100.", "Estimate before measuring."],
        prompt: "A ribbon is 200 cm long. You use 75 cm. How many centimetres remain?", correction: "125 cm remain. Check: 75 + 125 = 200 cm.",
        idea: "Use the same unit for both lengths and check the parts against the whole.", method: ["Choose one unit.", "Estimate the remainder.", "Subtract the used length.", "Add back to check."], example: "150 cm − 40 cm = 110 cm; 40 + 110 = 150.", labels: ["Write 2 m in centimetres.", "How many centimetres are used?"],
        practice: "You need two 60 cm pieces from a 150 cm ribbon. How many centimetres will remain?", steps: ["Two pieces use 2 × 60 = 120 cm.", "150 − 120 = 30 cm; check 120 + 30 = 150."]
      },
      pt: {
        title: "Planeje Antes de Cortar", aim: "Relacionar medição prática, estimativa, subtração e verificação pela operação inversa.",
        hook: "Uma fita será suficiente para um trabalho manual?", materials: "Barbante de 2 m, fita métrica e dois prendedores",
        actions: ["Estime onde ficam 75 cm no barbante. Marque com um prendedor.", "Meça 75 cm e marque a posição real com o outro prendedor; não precisa cortar.", "Meça o que resta. Desenhe o barbante inteiro e suas duas partes."],
        observe: "Compare estimativa e medição. Some as partes medidas para conferir o comprimento original.",
        rhythm: ["Lembre que 1 metro tem 100 cm.", "Conte de 25 em 25 até 100.", "Estime antes de medir."],
        prompt: "Uma fita mede 200 cm. Você usa 75 cm. Quantos centímetros restam?", correction: "Restam 125 cm. Confira: 75 + 125 = 200 cm.",
        idea: "Use a mesma unidade nas duas medidas e confira as partes com o todo.", method: ["Escolha uma unidade.", "Estime o que sobra.", "Subtraia o comprimento usado.", "Some de volta para conferir."], example: "150 cm − 40 cm = 110 cm; 40 + 110 = 150.", labels: ["Escreva 2 m em centímetros.", "Quantos centímetros são usados?"],
        practice: "Você precisa de dois pedaços de 60 cm de uma fita de 150 cm. Quantos centímetros sobram?", steps: ["Os dois pedaços usam 2 × 60 = 120 cm.", "150 − 120 = 30 cm; confira 120 + 30 = 150."]
      }, answer: 125, checks: [200, 75], practiceAnswer: 30, suffix: "cm"
    },
    {
      grade: 4, key: "same-ribbon-new-parts", block: "Fractions Block 1", pages: "241–242",
      en: {
        title: "Same Ribbon, Smaller Parts", aim: "Discover equivalent fractions by repartitioning one unchanged whole.",
        hook: "Can the fraction name change while the coloured length stays the same?", materials: "Paper strip and coloured pencil",
        actions: ["Fold a strip into four equal parts and colour three.", "Fold each quarter in half without colouring any more.", "Count the new equal parts and how many are coloured."],
        observe: "Explain what doubled and what stayed unchanged. Unfold and compare both fraction names.",
        rhythm: ["Count four equal quarters.", "Split each into two.", "Keep the whole unchanged."],
        prompt: "The same 3/4 of a ribbon is now divided into eighths. How many eighths are coloured?", correction: "6 eighths are coloured: 3/4 = 6/8. The coloured amount has not changed.",
        idea: "Equivalent fractions describe the same amount of the same whole.", method: ["Keep the whole fixed.", "Split every part equally.", "Count the smaller parts.", "Compare the shaded lengths."], example: "1/2 = 2/4 when both halves are split in two.", labels: ["How many quarters were coloured?", "How many eighths fit in one quarter?"],
        practice: "A different strip has 4 of its 8 equal parts coloured. How many quarters is that?", steps: ["Pair the eighths to make quarters.", "4 eighths make 2 quarters: 4/8 = 2/4."]
      },
      pt: {
        title: "A Mesma Fita, Partes Menores", aim: "Descobrir frações equivalentes repartindo um todo que não muda.",
        hook: "O nome da fração pode mudar sem mudar o comprimento pintado?", materials: "Tira de papel e lápis de cor",
        actions: ["Dobre uma tira em quatro partes iguais e pinte três.", "Dobre cada quarto ao meio sem pintar mais nada.", "Conte as novas partes iguais e quantas estão pintadas."],
        observe: "Explique o que dobrou e o que ficou igual. Desdobre e compare os dois nomes da fração.",
        rhythm: ["Conte quatro quartos iguais.", "Divida cada um em dois.", "Mantenha o todo igual."],
        prompt: "Os mesmos 3/4 de uma fita agora estão divididos em oitavos. Quantos oitavos estão pintados?", correction: "Há 6 oitavos pintados: 3/4 = 6/8. A quantidade pintada não mudou.",
        idea: "Frações equivalentes descrevem a mesma quantidade do mesmo todo.", method: ["Mantenha o todo.", "Divida todas as partes igualmente.", "Conte as partes menores.", "Compare os comprimentos pintados."], example: "1/2 = 2/4 quando dividimos cada metade em duas.", labels: ["Quantos quartos estavam pintados?", "Quantos oitavos cabem em um quarto?"],
        practice: "Outra tira tem 4 de suas 8 partes iguais pintadas. Isso equivale a quantos quartos?", steps: ["Junte os oitavos em pares para formar quartos.", "4 oitavos formam 2 quartos: 4/8 = 2/4."]
      }, answer: 6, checks: [3, 2], practiceAnswer: 2
    },
    {
      grade: 5, key: "one-first", block: "Measurement", pages: "84, 242",
      en: {
        title: "Find One, Then Find Many", aim: "Derive the unitary method from an equal-price purchase before writing a proportion.",
        hook: "The shop lists a bundle price, but you need a different number of notebooks.", materials: "Paper price tags and counters for pretend reais",
        actions: ["Label 4 identical notebooks with a total price of R$18. Assume each has the same price and there is no bundle discount.", "Share the price equally across the four notebooks.", "Build the price for six notebooks from that single-notebook price."],
        observe: "Should six notebooks cost more or less than twice the bundle price? Explain before calculating.",
        rhythm: ["Halve 18.", "Halve again.", "Recall six groups of four."],
        prompt: "Four notebooks cost R$18. At the same price per notebook, what do six cost in reais?", correction: "One costs R$4.50; six cost 6 × 4.50 = R$27.",
        idea: "Find the value of one item, then scale to the quantity needed.", method: ["Check that each item has the same price.", "Divide total cost by item count.", "Multiply by the new count.", "Compare with an estimate."], example: "3 equal-price pencils cost R$6, so one costs R$2 and five cost R$10.", labels: ["Price of one notebook in reais", "Number of notebooks wanted"],
        practice: "At that same price, how many notebooks can R$36 buy?", steps: ["One notebook costs R$4.50.", "36 ÷ 4.50 = 8 notebooks; check 8 × 4.50 = 36."]
      },
      pt: {
        title: "Encontre Um, Depois Muitos", aim: "Construir o método unitário com preços iguais antes de escrever uma proporção.",
        hook: "A loja mostra o preço de um conjunto, mas você precisa de outra quantidade de cadernos.", materials: "Etiquetas de papel e peças representando reais",
        actions: ["Marque 4 cadernos iguais com o preço total de R$18. Considere preços iguais e nenhum desconto no conjunto.", "Distribua o preço igualmente entre os quatro cadernos.", "Monte o preço de seis cadernos usando o preço de um."],
        observe: "Seis cadernos devem custar mais ou menos que o dobro do conjunto? Explique antes de calcular.",
        rhythm: ["Ache a metade de 18.", "Ache a metade novamente.", "Lembre seis grupos de quatro."],
        prompt: "Quatro cadernos custam R$18. Mantendo o preço por caderno, quanto custam seis, em reais?", correction: "Um custa R$4,50; seis custam 6 × 4,50 = R$27.",
        idea: "Encontre o valor de um item e depois calcule a quantidade desejada.", method: ["Confira que os preços são iguais.", "Divida o custo total pela quantidade.", "Multiplique pela nova quantidade.", "Compare com uma estimativa."], example: "3 lápis de mesmo preço custam R$6; um custa R$2 e cinco custam R$10.", labels: ["Preço de um caderno em reais", "Quantidade de cadernos desejada"],
        practice: "Com esse mesmo preço, quantos cadernos R$36 compram?", steps: ["Um caderno custa R$4,50.", "36 ÷ 4,50 = 8 cadernos; confira 8 × 4,50 = 36."]
      }, answer: 27, checks: [4.5, 6], practiceAnswer: 8
    },
    {
      grade: 6, key: "triangle-reason", block: "Geometry", pages: "122–124, 243",
      en: {
        title: "From Torn Corners to a Reason", aim: "Distinguish experimental evidence from a geometric explanation using parallel lines.",
        hook: "Do three triangle corners always fit along a straight line?", materials: "Paper, pencil, ruler and coloured pencils",
        actions: ["Draw any triangle and colour its three corners differently. Tear off the corners and arrange them at one point along a straight line.", "Repeat with a differently shaped triangle. Small gaps may come from imperfect drawing or tearing.", "Draw a fresh triangle. Through the top vertex draw a line parallel to the base. Use alternate interior angles to match the two base angles beside the top angle."],
        observe: "The three matched angles fill a straight angle. Explain why the parallel-line argument applies to every plane triangle, while a few torn examples alone cannot prove it.",
        rhythm: ["Recall 90° in a right angle.", "Double it for a straight angle.", "Name the three corners."],
        prompt: "Two angles of a triangle are 48° and 67°. How many degrees is the third?", correction: "48 + 67 = 115°. The third angle is 180 − 115 = 65°.",
        idea: "The interior angles of a plane triangle total 180°.", method: ["Add the known angles.", "Subtract from 180°.", "Check all three add to a straight angle."], example: "With angles of 50° and 60°, the third is 70°.", labels: ["Sum of the two known angles in degrees", "Degrees in a straight angle"],
        practice: "An isosceles triangle has a top angle of 40°. What is each of its two equal base angles, in degrees?", steps: ["The base angles share 180 − 40 = 140°.", "Each is 140 ÷ 2 = 70°."]
      },
      pt: {
        title: "Dos Cantos de Papel à Explicação", aim: "Distinguir evidência experimental de uma explicação geométrica com retas paralelas.",
        hook: "Os três cantos de um triângulo sempre cabem sobre uma reta?", materials: "Papel, lápis, régua e lápis de cor",
        actions: ["Desenhe um triângulo e pinte cada canto com uma cor. Rasgue os cantos e coloque-os num mesmo ponto sobre uma reta.", "Repita com outro formato de triângulo. Pequenos espaços podem vir do desenho ou do rasgo impreciso.", "Desenhe outro triângulo. Pelo vértice superior, trace uma paralela à base. Use ângulos alternos internos para encontrar os dois ângulos da base ao lado do ângulo superior."],
        observe: "Os três ângulos correspondentes completam um ângulo raso. Explique por que as paralelas justificam o resultado para todo triângulo plano, enquanto alguns exemplos de papel não bastam como prova.",
        rhythm: ["Lembre os 90° de um ângulo reto.", "Dobre para obter um ângulo raso.", "Identifique os três cantos."],
        prompt: "Dois ângulos de um triângulo medem 48° e 67°. Quantos graus mede o terceiro?", correction: "48 + 67 = 115°. O terceiro mede 180 − 115 = 65°.",
        idea: "Os ângulos internos de um triângulo plano somam 180°.", method: ["Some os ângulos conhecidos.", "Subtraia de 180°.", "Confira se os três completam um ângulo raso."], example: "Com ângulos de 50° e 60°, o terceiro mede 70°.", labels: ["Soma dos dois ângulos conhecidos, em graus", "Graus em um ângulo raso"],
        practice: "Um triângulo isósceles tem ângulo superior de 40°. Quanto mede cada um dos dois ângulos iguais da base, em graus?", steps: ["Os ângulos da base dividem 180 − 40 = 140°.", "Cada um mede 140 ÷ 2 = 70°."]
      }, answer: 65, checks: [115, 180], practiceAnswer: 70
    },
    {
      grade: 7, key: "shear-area", block: "Geometry Through Shadow", pages: "155–156, 244",
      en: {
        title: "A Sloping Side Is Not the Height", aim: "Derive parallelogram area by rearrangement and distinguish perpendicular height from a sloping side.",
        hook: "If the top of a rectangle slides sideways, must its area grow?", materials: "Squared paper, ruler and scissors",
        actions: ["Draw a parallelogram with a horizontal base of 8 squares and perpendicular height of 5 squares. Shift its top edge 2 squares to the right.", "Cut off the triangular end on the left and move it to the right to make a rectangle.", "Count rows and columns in the rectangle; compare the perpendicular height with the sloping side."],
        observe: "Explain why moving a piece preserves area. Which measurement tells you how many horizontal rows fit?",
        rhythm: ["Recall 8 × 5.", "Name square units.", "Find a perpendicular."],
        prompt: "A parallelogram has base 8 cm and perpendicular height 5 cm. What is its area in square centimetres?", correction: "Its area is 8 × 5 = 40 cm². Use perpendicular height, not the sloping side.",
        idea: "A parallelogram rearranges into a rectangle with the same base and perpendicular height.", method: ["Identify the base.", "Find the height at right angles to it.", "Multiply base by height.", "Use square units."], example: "A base of 6 cm and perpendicular height of 3 cm give 18 cm².", labels: ["Base in centimetres", "Perpendicular height in centimetres"],
        practice: "Cut the 8 cm by 5 cm parallelogram along a diagonal. What is the area of either triangle in square centimetres?", steps: ["The diagonal makes two equal-area triangles.", "Half of 40 cm² is 20 cm²."]
      },
      pt: {
        title: "O Lado Inclinado Não É a Altura", aim: "Construir a área do paralelogramo por rearranjo e distinguir altura perpendicular de lado inclinado.",
        hook: "Se o topo de um retângulo deslizar para o lado, sua área precisa crescer?", materials: "Papel quadriculado, régua e tesoura",
        actions: ["Desenhe um paralelogramo de base horizontal de 8 quadradinhos e altura perpendicular de 5. Desloque o topo 2 quadradinhos para a direita.", "Recorte a ponta triangular da esquerda e leve-a para a direita, formando um retângulo.", "Conte fileiras e colunas no retângulo; compare a altura perpendicular com o lado inclinado."],
        observe: "Explique por que mover uma peça preserva a área. Qual medida informa quantas fileiras horizontais cabem?",
        rhythm: ["Lembre 8 × 5.", "Diga unidades quadradas.", "Encontre uma perpendicular."],
        prompt: "Um paralelogramo tem base de 8 cm e altura perpendicular de 5 cm. Qual é sua área em centímetros quadrados?", correction: "A área é 8 × 5 = 40 cm². Use a altura perpendicular, não o lado inclinado.",
        idea: "Um paralelogramo pode formar um retângulo de mesma base e altura perpendicular.", method: ["Identifique a base.", "Ache a altura em ângulo reto com ela.", "Multiplique base pela altura.", "Use unidades quadradas."], example: "Base de 6 cm e altura perpendicular de 3 cm dão 18 cm².", labels: ["Base em centímetros", "Altura perpendicular em centímetros"],
        practice: "Corte o paralelogramo de 8 cm por 5 cm por uma diagonal. Qual é a área de cada triângulo em centímetros quadrados?", steps: ["A diagonal forma dois triângulos de mesma área.", "Metade de 40 cm² é 20 cm²."]
      }, answer: 40, checks: [8, 5], practiceAnswer: 20
    },
    {
      grade: 8, key: "square-border", block: "Álgebra", pages: "152–155, 244–245",
      en: {
        title: "The Border Around a Square", aim: "Connect an area dissection to the difference-of-squares identity before using an arithmetic shortcut.",
        hook: "Can you count a square border without counting every little square?", materials: "Squared paper and two coloured pencils",
        actions: ["Draw a 12 by 12 square. Put a 10 by 10 square inside it sharing the bottom-left corner, leaving an L-shaped border.", "Split the border into a 12 by 2 top strip and a 10 by 2 side strip without overlap.", "Arrange the strips end to end as a 22 by 2 rectangle. Write both area calculations."],
        observe: "Replace 12 and 10 with side lengths a and b, with a greater than b. Explain why the strips have width a − b and combined length a + b.",
        rhythm: ["Recall 12 squared.", "Recall 10 squared.", "Find their sum and difference."],
        prompt: "What is the area of the border between the 12 × 12 square and the 10 × 10 square, in square units?", correction: "12² − 10² = 144 − 100 = 44. The rearranged rectangle gives (12 − 10)(12 + 10) = 2 × 22 = 44.",
        idea: "For a greater than b, a² − b² = (a − b)(a + b) can be seen by rearranging an L-shaped area.", method: ["Find the difference of side lengths.", "Find their sum.", "Multiply difference by sum.", "Check by subtracting the square areas."], example: "9² − 7² = (9 − 7)(9 + 7) = 2 × 16 = 32.", labels: ["Difference of the side lengths: 12 − 10", "Sum of the side lengths: 12 + 10"],
        practice: "Use the same identity to find 21² − 19².", steps: ["The difference is 2 and the sum is 40.", "2 × 40 = 80; check 441 − 361 = 80."]
      },
      pt: {
        title: "A Borda de um Quadrado", aim: "Relacionar uma decomposição de área à identidade da diferença de quadrados antes de usar um atalho de cálculo.",
        hook: "Você consegue contar uma borda quadrada sem contar cada quadradinho?", materials: "Papel quadriculado e dois lápis de cor",
        actions: ["Desenhe um quadrado de 12 por 12. Dentro dele coloque um de 10 por 10 com o mesmo canto inferior esquerdo, deixando uma borda em L.", "Separe a borda em uma faixa superior de 12 por 2 e uma lateral de 10 por 2, sem sobreposição.", "Coloque as faixas ponta a ponta formando um retângulo de 22 por 2. Escreva os dois cálculos de área."],
        observe: "Troque 12 e 10 por lados a e b, com a maior que b. Explique por que as faixas têm largura a − b e comprimento total a + b.",
        rhythm: ["Lembre 12 ao quadrado.", "Lembre 10 ao quadrado.", "Ache a soma e a diferença dos lados."],
        prompt: "Qual é a área da borda entre o quadrado de 12 × 12 e o de 10 × 10, em unidades quadradas?", correction: "12² − 10² = 144 − 100 = 44. O retângulo rearranjado dá (12 − 10)(12 + 10) = 2 × 22 = 44.",
        idea: "Para a maior que b, podemos visualizar a² − b² = (a − b)(a + b) rearranjando uma área em L.", method: ["Ache a diferença dos lados.", "Ache a soma.", "Multiplique diferença pela soma.", "Confira subtraindo as áreas dos quadrados."], example: "9² − 7² = (9 − 7)(9 + 7) = 2 × 16 = 32.", labels: ["Diferença dos lados: 12 − 10", "Soma dos lados: 12 + 10"],
        practice: "Use a mesma identidade para encontrar 21² − 19².", steps: ["A diferença é 2 e a soma é 40.", "2 × 40 = 80; confira 441 − 361 = 80."]
      }, answer: 44, checks: [2, 22], practiceAnswer: 80
    }
  ];

  const localized = (entry, lang) => {
    const copy = entry[lang];
    return {
      title: copy.title, teacherAim: copy.aim,
      ...(lang === "pt" ? { block: "Investigações Práticas" } : {}),
      storyModel: { hook: copy.hook, materials: copy.materials, actions: copy.actions, observe: copy.observe },
      rhythm: copy.rhythm, prompt: copy.prompt, correction: copy.correction,
      memoryRefresh: { idea: copy.idea, method: copy.method, example: copy.example },
      guidedSteps: copy.labels.map((label, index) => ({ label, answerType: "number", answer: entry.checks[index], tolerance: 0 }))
    };
  };
  for (const entry of entries) {
    const id = `g${entry.grade}-jarman-${entry.key}`;
    lessons.push({
      id, activityKey: `g${entry.grade}-math-jarman-${entry.key}`, grade: `Grade ${entry.grade}`,
      block: entry.block, time: "15–20 min", sourceFocus: `Original investigation informed by Ron Jarman, Teaching Waldorf Mathematics in Grades 1–8 (2020), supplied PDF pages ${entry.pages}.`,
      ...localized(entry, "en"), answerType: "number", answer: entry.answer, tolerance: 0,
      ...(entry.suffix ? { suffix: entry.suffix } : {})
    });
    translations[id] = localized(entry, "pt");
    for (const lang of ["en", "pt"]) {
      bank[lang][id] = { prompt: entry[lang].practice, answerType: "number", answer: entry.practiceAnswer, tolerance: 0, steps: entry[lang].steps };
    }
  }
})();
