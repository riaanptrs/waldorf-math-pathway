(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };
  const blockEn = "Proportions & Graphs Path";
  const blockPt = "Caminho de Proporções e Gráficos";

  const specs = [
    {
      id: "constant-rate", title: ["Find the Constant Rate", "Encontre a Taxa Constante"],
      idea: ["In a proportional relationship, every pair has the same value of y divided by x. That value is the constant rate k.", "Numa relação proporcional, todos os pares têm o mesmo valor de y dividido por x. Esse valor é a taxa constante k."],
      method: [["Choose a pair (x, y).", "Divide y by x.", "Check another pair.", "Name the units of the rate."], ["Escolha um par (x, y).", "Divida y por x.", "Confira outro par.", "Nomeie as unidades da taxa."]],
      example: ["If 2 notebooks cost R$6, the rate is 6 ÷ 2 = R$3 per notebook.", "Se 2 cadernos custam R$6, a taxa é 6 ÷ 2 = R$3 por caderno."],
      graph: { xLabel: "notebooks", yLabel: "cost", points: [[0,0],[1,3],[2,6],[3,9]], line: true },
      prompt: ["The table contains (2, 6), (4, 12), and (6, 18). What is the constant rate k?", "A tabela contém (2, 6), (4, 12) e (6, 18). Qual é a taxa constante k?"], answer: 3,
      correction: ["Divide y by x: 6 ÷ 2 = 3. The other pairs give the same rate.", "Divida y por x: 6 ÷ 2 = 3. Os outros pares dão a mesma taxa."],
      practice: [["Practice: (3, 12), (5, 20), (7, 28). Find k.", "Treino: (3, 12), (5, 20), (7, 28). Encontre k."], 4, ["Compute 12 ÷ 3, then check 20 ÷ 5.", "Calcule 12 ÷ 3 e confira 20 ÷ 5."]]
    },
    {
      id: "complete-table", title: ["Build a Proportion Table", "Construa uma Tabela Proporcional"],
      idea: ["A proportion table grows by equal multiples. You can move across a row or use the constant rate.", "Uma tabela proporcional cresce por múltiplos iguais. Você pode avançar numa linha ou usar a taxa constante."],
      method: [["Find the rate from a known pair.", "Multiply the new x by the rate.", "Place the result in the matching row.", "Check y ÷ x."], ["Encontre a taxa num par conhecido.", "Multiplique o novo x pela taxa.", "Coloque o resultado na linha correspondente.", "Confira y ÷ x."]],
      example: ["At R$4 per metre, 5 metres cost 5 × 4 = R$20.", "A R$4 por metro, 5 metros custam 5 × 4 = R$20."],
      graph: { xLabel: "metres", yLabel: "cost", points: [[0,0],[1,4],[3,12],[5,20]], line: true },
      prompt: ["Fabric costs R$4 per metre. What is the cost of 7 metres?", "Um tecido custa R$4 por metro. Qual é o custo de 7 metros?"], answer: 28,
      correction: ["Use the constant rate: 7 × R$4 = R$28.", "Use a taxa constante: 7 × R$4 = R$28."],
      practice: [["Practice: Paint covers 6 m² per litre. How many m² do 5 litres cover?", "Treino: Uma tinta cobre 6 m² por litro. Quantos m² cobrem 5 litros?"], 30, ["Multiply 5 litres by 6 m² per litre.", "Multiplique 5 litros por 6 m² por litro."]]
    },
    {
      id: "origin", title: ["Why the Line Begins at Zero", "Por que a Linha Começa no Zero"],
      idea: ["A direct proportion has no starting amount. When x is zero, y is zero, so its graph passes through the origin.", "Uma proporção direta não tem valor inicial. Quando x é zero, y é zero; por isso seu gráfico passa pela origem."],
      method: [["Ask what happens when x = 0.", "Identify any starting amount.", "Plot (0, 0).", "Decide whether the relationship is proportional."], ["Pergunte o que ocorre quando x = 0.", "Identifique qualquer valor inicial.", "Marque (0, 0).", "Decida se a relação é proporcional."]],
      example: ["At R$5 per ticket with no fee, zero tickets cost R$0.", "A R$5 por ingresso sem taxa, zero ingressos custam R$0."],
      graph: { xLabel: "tickets", yLabel: "cost", points: [[0,0],[1,5],[2,10],[3,15]], line: true },
      prompt: ["A machine makes 8 pieces per minute. How many pieces has it made at 0 minutes?", "Uma máquina faz 8 peças por minuto. Quantas peças produziu em 0 minuto?"], answer: 0,
      correction: ["With no elapsed time, no pieces have been made. The graph includes (0, 0).", "Sem tempo transcorrido, nenhuma peça foi feita. O gráfico inclui (0, 0)."],
      practice: [["Practice: Water flows at 12 litres per minute. How many litres at 0 minutes?", "Treino: A água flui a 12 litros por minuto. Quantos litros em 0 minuto?"], 0, ["A direct proportion begins at (0, 0).", "Uma proporção direta começa em (0, 0)."]]
    },
    {
      id: "equation", title: ["Write the Rule y = kx", "Escreva a Regra y = kx"],
      idea: ["The equation y = kx describes every pair in a direct proportion. The rate k tells how steeply the line rises.", "A equação y = kx descreve todos os pares de uma proporção direta. A taxa k indica quanto a linha sobe."],
      method: [["Find k by dividing y by x.", "Write y = kx.", "Substitute a known x.", "Check that the equation gives the known y."], ["Encontre k dividindo y por x.", "Escreva y = kx.", "Substitua um x conhecido.", "Confira se a equação dá o y conhecido."]],
      example: ["For points (2, 6) and (4, 12), k = 3 and the rule is y = 3x.", "Para os pontos (2, 6) e (4, 12), k = 3 e a regra é y = 3x."],
      graph: { xLabel: "x", yLabel: "y", points: [[0,0],[1,3],[2,6],[3,9]], line: true },
      prompt: ["A proportional graph contains (3, 15). What number replaces k in y = kx?", "Um gráfico proporcional contém (3, 15). Qual número substitui k em y = kx?"], answer: 5,
      correction: ["Use k = y ÷ x = 15 ÷ 3 = 5, so y = 5x.", "Use k = y ÷ x = 15 ÷ 3 = 5; então y = 5x."],
      practice: [["Practice: A proportional graph contains (4, 14). Find k.", "Treino: Um gráfico proporcional contém (4, 14). Encontre k."], 3.5, ["Compute 14 ÷ 4.", "Calcule 14 ÷ 4."]]
    },
    {
      id: "read-graph", title: ["Read a Point from a Graph", "Leia um Ponto no Gráfico"],
      idea: ["A point (x, y) records two related quantities. Read across from x and upward to y.", "Um ponto (x, y) registra duas quantidades relacionadas. Leia a partir de x e suba até y."],
      method: [["Read the horizontal coordinate first.", "Read the vertical coordinate second.", "Keep the units attached.", "Check the point against the rate."], ["Leia primeiro a coordenada horizontal.", "Leia depois a coordenada vertical.", "Mantenha as unidades.", "Confira o ponto com a taxa."]],
      example: ["On y = 4x, the point above x = 3 is (3, 12).", "Em y = 4x, o ponto acima de x = 3 é (3, 12)."],
      graph: { xLabel: "hours", yLabel: "distance", points: [[0,0],[1,4],[2,8],[3,12],[4,16]], line: true },
      prompt: ["The graph follows y = 4x. What is y when x = 3?", "O gráfico segue y = 4x. Qual é y quando x = 3?"], answer: 12,
      correction: ["Substitute x = 3: y = 4 × 3 = 12. The point is (3, 12).", "Substitua x = 3: y = 4 × 3 = 12. O ponto é (3, 12)."],
      practice: [["Practice: On y = 6x, find y when x = 5.", "Treino: Em y = 6x, encontre y quando x = 5."], 30, ["Multiply 6 by 5.", "Multiplique 6 por 5."]]
    },
    {
      id: "missing-coordinate", title: ["Work Backwards on the Line", "Volte pelo Caminho da Linha"],
      idea: ["When y is known, divide by the constant rate to find x. This reverses the multiplication in y = kx.", "Quando y é conhecido, divida pela taxa constante para encontrar x. Isso desfaz a multiplicação em y = kx."],
      method: [["Write y = kx.", "Substitute the known y and k.", "Divide y by k.", "Check by multiplying again."], ["Escreva y = kx.", "Substitua y e k conhecidos.", "Divida y por k.", "Confira multiplicando novamente."]],
      example: ["If y = 7x and y = 35, then x = 35 ÷ 7 = 5.", "Se y = 7x e y = 35, então x = 35 ÷ 7 = 5."],
      graph: { xLabel: "x", yLabel: "y", points: [[0,0],[1,7],[3,21],[5,35]], line: true },
      prompt: ["For y = 7x, what is x when y = 42?", "Em y = 7x, qual é x quando y = 42?"], answer: 6,
      correction: ["Reverse multiplication by 7: x = 42 ÷ 7 = 6.", "Desfaça a multiplicação por 7: x = 42 ÷ 7 = 6."],
      practice: [["Practice: For y = 2.5x, find x when y = 20.", "Treino: Em y = 2,5x, encontre x quando y = 20."], 8, ["Divide 20 by 2.5.", "Divida 20 por 2,5."]]
    },
    {
      id: "compare-slopes", title: ["Compare Two Rates", "Compare Duas Taxas"],
      idea: ["For proportional graphs on the same axes, a larger constant rate creates a steeper line.", "Em gráficos proporcionais nos mesmos eixos, uma taxa constante maior cria uma linha mais inclinada."],
      method: [["Find k for each relationship.", "Compare the two rates with their units.", "Connect the larger k to the steeper line.", "State what the comparison means."], ["Encontre k em cada relação.", "Compare as duas taxas e suas unidades.", "Ligue o maior k à linha mais inclinada.", "Explique o significado da comparação."]],
      example: ["y = 5x rises faster than y = 3x because 5 > 3.", "y = 5x sobe mais rápido que y = 3x porque 5 > 3."],
      graph: { xLabel: "hours", yLabel: "km", points: [[0,0],[1,5],[2,10],[3,15]], secondPoints: [[0,0],[1,3],[2,6],[3,9]], line: true },
      prompt: ["Path A follows y = 6x and Path B follows y = 4x. How many more units per x does A grow?", "O Caminho A segue y = 6x e o Caminho B segue y = 4x. Quantas unidades a mais por x o A cresce?"], answer: 2,
      correction: ["Compare the rates: 6 − 4 = 2 units more for every one x.", "Compare as taxas: 6 − 4 = 2 unidades a mais para cada x."],
      practice: [["Practice: Compare y = 7x and y = 2.5x. How much larger is the first rate?", "Treino: Compare y = 7x e y = 2,5x. Quanto a primeira taxa é maior?"], 4.5, ["Subtract 2.5 from 7.", "Subtraia 2,5 de 7."]]
    },
    {
      id: "not-proportional", title: ["Detect a Starting Amount", "Detecte um Valor Inicial"],
      idea: ["A straight line can be non-proportional. If it begins above or below zero, it has a starting amount and is not y = kx.", "Uma linha reta pode não ser proporcional. Se começa acima ou abaixo de zero, tem um valor inicial e não é y = kx."],
      method: [["Check the value when x = 0.", "Look for a starting fee or amount.", "Test whether y ÷ x stays constant.", "Explain which condition fails."], ["Confira o valor quando x = 0.", "Procure uma taxa ou valor inicial.", "Teste se y ÷ x permanece constante.", "Explique qual condição falha."]],
      example: ["A R$4 rental fee plus R$3 per hour begins at (0, 4), not (0, 0).", "Uma taxa de R$4 mais R$3 por hora começa em (0, 4), não em (0, 0)."],
      graph: { xLabel: "hours", yLabel: "cost", points: [[0,4],[1,7],[2,10],[3,13]], line: true },
      prompt: ["A service costs R$5 plus R$2 per hour. What is its y-value when x = 0?", "Um serviço custa R$5 mais R$2 por hora. Qual é seu valor de y quando x = 0?"], answer: 5,
      correction: ["The starting fee remains when no hours are used, so the graph begins at (0, 5) and is not proportional.", "A taxa inicial permanece quando nenhuma hora é usada; o gráfico começa em (0, 5) e não é proporcional."],
      practice: [["Practice: A ride costs R$6 plus R$3 per kilometre. Find the cost at 0 km.", "Treino: Uma corrida custa R$6 mais R$3 por quilômetro. Ache o custo em 0 km."], 6, ["At zero kilometres, only the starting fee remains.", "Em zero quilômetro, resta apenas a taxa inicial."]]
    },
    {
      id: "inverse", title: ["Recognise Inverse Proportion", "Reconheça a Proporção Inversa"],
      idea: ["In an inverse proportion, one quantity grows while the other shrinks so their product stays constant.", "Numa proporção inversa, uma quantidade cresce enquanto a outra diminui, mantendo constante o produto."],
      method: [["Identify what stays fixed.", "Multiply each x and y pair.", "Look for a constant product.", "Predict the direction before calculating."], ["Identifique o que fica fixo.", "Multiplique x por y em cada par.", "Procure um produto constante.", "Preveja a direção antes de calcular."]],
      example: ["For a 24-hour task, 2 workers need 12 hours and 4 workers need 6 hours: both products are 24.", "Numa tarefa de 24 horas de trabalho, 2 pessoas levam 12 horas e 4 levam 6: ambos os produtos são 24."],
      graph: { xLabel: "workers", yLabel: "hours", points: [[1,12],[2,6],[3,4],[4,3]], line: false },
      prompt: ["A fixed task takes 24 worker-hours. How many hours do 6 equal workers need?", "Uma tarefa fixa exige 24 horas de trabalho. Quantas horas 6 trabalhadores iguais precisam?"], answer: 4,
      correction: ["Keep workers × hours = 24. Then hours = 24 ÷ 6 = 4.", "Mantenha trabalhadores × horas = 24. Então horas = 24 ÷ 6 = 4."],
      practice: [["Practice: A journey has speed × time = 120. Find time when speed is 30.", "Treino: Numa viagem, velocidade × tempo = 120. Ache o tempo quando a velocidade é 30."], 4, ["Divide the constant product 120 by 30.", "Divida o produto constante 120 por 30."]]
    },
    {
      id: "capstone", title: ["Plan with Scale and Rate", "Planeje com Escala e Taxa"],
      idea: ["A real plan combines a scale relationship with a rate. Keep each relationship and its units clear before joining the steps.", "Um plano real combina uma relação de escala com uma taxa. Mantenha cada relação e suas unidades claras antes de unir os passos."],
      method: [["Translate the scale into a rate.", "Find the real measurement.", "Apply the material or cost rate.", "Estimate and check the units."], ["Traduza a escala em uma taxa.", "Encontre a medida real.", "Aplique a taxa de material ou custo.", "Estime e confira as unidades."]],
      example: ["At 1 cm : 2 m, a 6 cm wall represents 12 m. At R$5 per metre, it costs R$60.", "Na escala 1 cm : 2 m, uma parede de 6 cm representa 12 m. A R$5 por metro, custa R$60."],
      graph: { xLabel: "plan cm", yLabel: "real m", points: [[0,0],[1,2],[3,6],[6,12]], line: true },
      prompt: ["A plan uses 1 cm : 3 m. A path is 8 cm on the plan. Stone costs R$4 per real metre. What is the total cost?", "Uma planta usa 1 cm : 3 m. Um caminho mede 8 cm na planta. A pedra custa R$4 por metro real. Qual é o custo total?"], answer: 96,
      correction: ["The real length is 8 × 3 = 24 m. Then 24 × R$4 = R$96.", "O comprimento real é 8 × 3 = 24 m. Então 24 × R$4 = R$96."],
      practice: [["Practice: Scale 1 cm : 5 m. A fence is 7 cm on the plan and costs R$3 per metre. Find the cost.", "Treino: Escala 1 cm : 5 m. Uma cerca mede 7 cm na planta e custa R$3 por metro. Ache o custo."], 105, ["Find 7 × 5 real metres, then multiply by R$3.", "Ache 7 × 5 metros reais e multiplique por R$3."]]
    }
  ];

  const makePractice = (spec, lang) => ({
    prompt: spec.practice[0][lang === "en" ? 0 : 1], answerType: "number", answer: spec.practice[1], tolerance: 0.01,
    steps: [spec.practice[2][lang === "en" ? 0 : 1]],
  });

  const newLessons = specs.map((spec) => ({
    id: `g8-proportions-${spec.id}`, activityKey: `g8-math-proportions-${spec.id}`, grade: "Grade 8", block: blockEn,
    title: spec.title[0], time: "18 min", sourceFocus: "Original Grade 8 proportional reasoning: tables, equations, graphs, and practical measurement.",
    teacherAim: "Learners discover proportional structure visually and explain the rate before using a rule.",
    graphModel: spec.graph, memoryRefresh: { idea: spec.idea[0], method: spec.method[0], example: spec.example[0] },
    rhythm: ["Predict the direction of change.", "Find or test the constant.", "Connect table, graph, equation, and units."],
    prompt: spec.prompt[0], correction: spec.correction[0], answerType: "number", answer: spec.answer, tolerance: 0.01,
  }));

  specs.forEach((spec) => {
    const id = `g8-proportions-${spec.id}`;
    translations[id] = {
      block: blockPt, title: spec.title[1], prompt: spec.prompt[1], correction: spec.correction[1],
      graphModel: { ...spec.graph, xLabel: spec.graph.xLabel === "x" ? "x" : ({ notebooks: "cadernos", cost: "custo", metres: "metros", tickets: "ingressos", hours: "horas", distance: "distância", km: "km", workers: "trabalhadores", "plan cm": "cm na planta", "real m": "m reais" }[spec.graph.xLabel] || spec.graph.xLabel), yLabel: ({ cost: "custo", distance: "distância", hours: "horas", km: "km", "real m": "m reais", y: "y" }[spec.graph.yLabel] || spec.graph.yLabel) },
      memoryRefresh: { idea: spec.idea[1], method: spec.method[1], example: spec.example[1] },
      rhythm: ["Preveja a direção da mudança.", "Encontre ou teste a constante.", "Ligue tabela, gráfico, equação e unidades."],
    };
    bank.en[id] = makePractice(spec, "en");
    bank.pt[id] = makePractice(spec, "pt");
  });

  const insertAt = lessons.findIndex((lesson) => lesson.id === "g8-map-scale-proportion");
  lessons.splice(insertAt < 0 ? lessons.findIndex((lesson) => lesson.grade === "Grade 9") : insertAt, 0, ...newLessons);
})();
