(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };
  const blockEn = "Algebra I Foundations Path";
  const blockPt = "Caminho de Fundamentos da Álgebra I";

  const specs = [
    {
      id: "expression-language", title: ["Expressions Tell a Story", "Expressões Contam uma História"],
      idea: ["An algebraic expression records a sequence of operations. A variable stands for a number that may change.", "Uma expressão algébrica registra uma sequência de operações. Uma variável representa um número que pode mudar."],
      method: [["Name the changing quantity.", "Translate multiplication before addition.", "Keep the operations in their stated order.", "Read the expression back as a sentence."], ["Nomeie a quantidade que muda.", "Traduza a multiplicação antes da adição.", "Mantenha as operações na ordem indicada.", "Leia a expressão novamente como frase."]],
      example: ["A R$4 fee for each ticket plus R$3 once becomes 4t + 3.", "Uma taxa de R$4 por ingresso mais R$3 uma vez se torna 4t + 3."],
      prompt: ["Write an expression for five times x, then add 7.", "Escreva uma expressão para cinco vezes x e depois some 7."], correction: ["Five times x is 5x. Add 7 to obtain 5x + 7.", "Cinco vezes x é 5x. Some 7 para obter 5x + 7."],
      answerType: "expression", acceptedAnswers: ["5x+7", "5*x+7"], practice: [["Practice: Write three times n, then subtract 4.", "Treino: Escreva três vezes n e depois subtraia 4."], "expression", ["3n-4", "3*n-4"], ["Multiplication gives 3n; then subtract 4.", "A multiplicação dá 3n; depois subtraia 4."]]
    },
    {
      id: "substitution", title: ["Give the Variable a Value", "Dê um Valor à Variável"],
      idea: ["Substitution replaces a variable with a known value while preserving the expression's structure.", "A substituição troca uma variável por um valor conhecido, preservando a estrutura da expressão."],
      method: [["Copy the expression.", "Replace the variable with parentheses around its value.", "Follow the order of operations.", "Estimate and check."], ["Copie a expressão.", "Troque a variável pelo valor entre parênteses.", "Siga a ordem das operações.", "Estime e confira."]],
      example: ["For x = 4, 3x + 2 becomes 3(4) + 2 = 14.", "Para x = 4, 3x + 2 se torna 3(4) + 2 = 14."],
      prompt: ["Evaluate 4x - 3 when x = 5.", "Calcule 4x - 3 quando x = 5."], correction: ["Substitute 5: 4(5) - 3 = 20 - 3 = 17.", "Substitua 5: 4(5) - 3 = 20 - 3 = 17."],
      answerType: "number", answer: 17, practice: [["Practice: Evaluate 6a + 1 when a = -2.", "Treino: Calcule 6a + 1 quando a = -2."], "number", -11, ["Use parentheses: 6(-2) + 1.", "Use parênteses: 6(-2) + 1."]]
    },
    {
      id: "like-terms", title: ["Gather Like Terms", "Agrupe Termos Semelhantes"],
      idea: ["Like terms name equal-sized algebraic quantities. Their coefficients can be combined just as equal units can.", "Termos semelhantes nomeiam quantidades algébricas do mesmo tipo. Seus coeficientes podem ser combinados como unidades iguais."],
      method: [["Circle terms with the same variable part.", "Add or subtract their coefficients.", "Keep unlike terms separate.", "Substitute a value to check."], ["Circule termos com a mesma parte variável.", "Some ou subtraia seus coeficientes.", "Mantenha termos diferentes separados.", "Substitua um valor para conferir."]],
      example: ["3x + 5x - 2 becomes 8x - 2.", "3x + 5x - 2 se torna 8x - 2."],
      prompt: ["Simplify 7x + 3 - 2x + 4.", "Simplifique 7x + 3 - 2x + 4."], correction: ["Combine 7x - 2x and 3 + 4. The result is 5x + 7.", "Combine 7x - 2x e 3 + 4. O resultado é 5x + 7."],
      answerType: "expression", acceptedAnswers: ["5x+7"], practice: [["Practice: Simplify 9m - 4 + 2m + 6.", "Treino: Simplifique 9m - 4 + 2m + 6."], "expression", ["11m+2"], ["Combine variable terms and constants separately.", "Combine separadamente os termos variáveis e as constantes."]]
    },
    {
      id: "distributive", title: ["Open the Brackets", "Abra os Parênteses"],
      idea: ["The distributive property scales every term inside a group. An area model shows why no term may be skipped.", "A propriedade distributiva multiplica cada termo dentro de um grupo. Um modelo de área mostra por que nenhum termo pode ser esquecido."],
      method: [["Identify the factor outside.", "Multiply it by every term inside.", "Keep each sign attached.", "Combine like terms if needed."], ["Identifique o fator externo.", "Multiplique-o por cada termo interno.", "Mantenha cada sinal ligado ao termo.", "Combine termos semelhantes se necessário."]],
      example: ["3(x + 4) = 3x + 12.", "3(x + 4) = 3x + 12."],
      prompt: ["Expand 4(2x - 3).", "Desenvolva 4(2x - 3)."], correction: ["Multiply both terms by 4: 4(2x) - 4(3) = 8x - 12.", "Multiplique os dois termos por 4: 4(2x) - 4(3) = 8x - 12."],
      answerType: "expression", acceptedAnswers: ["8x-12"], practice: [["Practice: Expand -2(3y + 5).", "Treino: Desenvolva -2(3y + 5)."], "expression", ["-6y-10"], ["Multiply both terms by -2 and watch the signs.", "Multiplique os dois termos por -2 e observe os sinais."]]
    },
    {
      id: "one-step-balance", title: ["Keep the Balance True", "Mantenha a Balança Verdadeira"],
      idea: ["An equation states that two quantities are equal. Doing the same operation to both sides preserves that truth.", "Uma equação afirma que duas quantidades são iguais. Fazer a mesma operação nos dois lados preserva essa verdade."],
      method: [["Name the operation attached to x.", "Use its inverse on both sides.", "Simplify.", "Check in the original equation."], ["Nomeie a operação ligada a x.", "Use a operação inversa nos dois lados.", "Simplifique.", "Confira na equação original."]],
      example: ["x + 8 = 13. Subtract 8 from both sides, so x = 5.", "x + 8 = 13. Subtraia 8 dos dois lados; então x = 5."],
      prompt: ["Solve 6x = 42.", "Resolva 6x = 42."], correction: ["Divide both sides by 6. Then x = 7, and 6 × 7 = 42.", "Divida os dois lados por 6. Então x = 7 e 6 × 7 = 42."],
      answerType: "number", answer: 7, practice: [["Practice: Solve x - 9 = 14.", "Treino: Resolva x - 9 = 14."], "number", 23, ["Add 9 to both sides.", "Some 9 aos dois lados."]]
    },
    {
      id: "two-step-equation", title: ["Undo in Reverse Order", "Desfaça na Ordem Inversa"],
      idea: ["Solving reverses the operations that built an expression. Undo addition or subtraction before multiplication or division.", "Resolver desfaz as operações que construíram uma expressão. Desfaça adição ou subtração antes de multiplicação ou divisão."],
      method: [["Remove the constant term on both sides.", "Undo the coefficient.", "State the solution.", "Substitute it to check."], ["Remova o termo constante nos dois lados.", "Desfaça o coeficiente.", "Declare a solução.", "Substitua para conferir."]],
      example: ["3x + 4 = 19 gives 3x = 15, then x = 5.", "3x + 4 = 19 dá 3x = 15 e depois x = 5."],
      prompt: ["Solve 5x - 7 = 28.", "Resolva 5x - 7 = 28."], correction: ["Add 7 to get 5x = 35. Divide by 5 to get x = 7.", "Some 7 para obter 5x = 35. Divida por 5 para obter x = 7."],
      answerType: "number", answer: 7, practice: [["Practice: Solve 4x + 9 = 33.", "Treino: Resolva 4x + 9 = 33."], "number", 6, ["Subtract 9, then divide by 4.", "Subtraia 9 e depois divida por 4."]]
    },
    {
      id: "both-sides", title: ["Variables on Both Sides", "Variáveis nos Dois Lados"],
      idea: ["When a variable appears on both sides, collect all variable terms on one side while preserving equality.", "Quando uma variável aparece nos dois lados, reúna os termos variáveis num lado, preservando a igualdade."],
      method: [["Choose a side for the variable.", "Remove the other variable term from both sides.", "Collect constants.", "Solve and check both sides."], ["Escolha um lado para a variável.", "Remova o outro termo variável dos dois lados.", "Agrupe as constantes.", "Resolva e confira os dois lados."]],
      example: ["5x + 2 = 3x + 10 becomes 2x + 2 = 10, so x = 4.", "5x + 2 = 3x + 10 se torna 2x + 2 = 10; então x = 4."],
      prompt: ["Solve 7x - 5 = 4x + 16.", "Resolva 7x - 5 = 4x + 16."], correction: ["Subtract 4x: 3x - 5 = 16. Add 5 and divide by 3, giving x = 7.", "Subtraia 4x: 3x - 5 = 16. Some 5 e divida por 3, obtendo x = 7."],
      answerType: "number", answer: 7, practice: [["Practice: Solve 6x + 3 = 2x + 27.", "Treino: Resolva 6x + 3 = 2x + 27."], "number", 6, ["Subtract 2x, then subtract 3, then divide by 4.", "Subtraia 2x, depois 3 e divida por 4."]]
    },
    {
      id: "signed-equation", title: ["Equations with Signed Numbers", "Equações com Números com Sinal"],
      idea: ["Negative coefficients follow the same balance principles. Dividing by a negative reverses the signs of the quotient.", "Coeficientes negativos seguem os mesmos princípios de equilíbrio. Dividir por um negativo muda o sinal do quociente."],
      method: [["Simplify each side first.", "Isolate the variable term.", "Divide by its signed coefficient.", "Check the signs by substitution."], ["Simplifique primeiro cada lado.", "Isole o termo variável.", "Divida pelo coeficiente com sinal.", "Confira os sinais por substituição."]],
      example: ["-3x = 18 gives x = -6 because 18 ÷ -3 = -6.", "-3x = 18 dá x = -6 porque 18 ÷ -3 = -6."],
      prompt: ["Solve -4x + 3 = 19.", "Resolva -4x + 3 = 19."], correction: ["Subtract 3: -4x = 16. Divide by -4: x = -4.", "Subtraia 3: -4x = 16. Divida por -4: x = -4."],
      answerType: "number", answer: -4, practice: [["Practice: Solve 5 - 3x = 20.", "Treino: Resolva 5 - 3x = 20."], "number", -5, ["Subtract 5, then divide 15 by -3.", "Subtraia 5 e depois divida 15 por -3."]]
    },
    {
      id: "fraction-equation", title: ["Clear Fractions Carefully", "Elimine Frações com Cuidado"],
      idea: ["Multiplying every term by a common denominator creates an equivalent equation without fractions.", "Multiplicar todos os termos por um denominador comum cria uma equação equivalente sem frações."],
      method: [["Find the least common denominator.", "Multiply every term on both sides.", "Cancel each denominator.", "Solve and check in the fractional equation."], ["Encontre o mínimo denominador comum.", "Multiplique todos os termos nos dois lados.", "Cancele cada denominador.", "Resolva e confira na equação com frações."]],
      example: ["x/3 + 2 = 6. Multiply by 3: x + 6 = 18, so x = 12.", "x/3 + 2 = 6. Multiplique por 3: x + 6 = 18; então x = 12."],
      prompt: ["Solve x/4 + x/2 = 9.", "Resolva x/4 + x/2 = 9."], correction: ["Multiply every term by 4: x + 2x = 36. Thus 3x = 36 and x = 12.", "Multiplique todos os termos por 4: x + 2x = 36. Assim 3x = 36 e x = 12."],
      answerType: "number", answer: 12, practice: [["Practice: Solve x/3 - 2 = 5.", "Treino: Resolva x/3 - 2 = 5."], "number", 21, ["Multiply by 3 or add 2 first; then solve.", "Multiplique por 3 ou some 2 primeiro; depois resolva."]]
    },
    {
      id: "rearrange-formula", title: ["Make a New Subject", "Isole uma Nova Variável"],
      idea: ["Rearranging a formula uses inverse operations to make the needed variable stand alone without changing the relationship.", "Reorganizar uma fórmula usa operações inversas para deixar sozinha a variável necessária sem mudar a relação."],
      method: [["Name the variable to isolate.", "Treat other letters as known quantities.", "Undo operations in reverse order.", "Substitute numbers to verify both forms."], ["Nomeie a variável a isolar.", "Trate as outras letras como quantidades conhecidas.", "Desfaça as operações na ordem inversa.", "Substitua números para verificar as duas formas."]],
      example: ["From d = rt, divide by t to obtain r = d/t.", "De d = rt, divida por t para obter r = d/t."],
      prompt: ["Rearrange V = IR to make I the subject.", "Reorganize V = IR para isolar I."], correction: ["I is multiplied by R. Divide both sides by R: I = V/R.", "I está multiplicado por R. Divida os dois lados por R: I = V/R."],
      answerType: "expression", acceptedAnswers: ["i=v/r", "I=V/R"], practice: [["Practice: Rearrange A = bh to make h the subject.", "Treino: Reorganize A = bh para isolar h."], "expression", ["h=a/b", "h=A/b"], ["Divide both sides by b.", "Divida os dois lados por b."]]
    },
    {
      id: "inequality", title: ["A Whole Region of Solutions", "Uma Região Inteira de Soluções"],
      idea: ["An inequality describes many possible values. Multiplying or dividing by a negative reverses the inequality sign.", "Uma desigualdade descreve muitos valores possíveis. Multiplicar ou dividir por um negativo inverte o sinal da desigualdade."],
      method: [["Solve as you would an equation.", "Keep track of signed multiplication or division.", "Reverse the sign only for a negative factor.", "Test one value from the solution region."], ["Resolva como uma equação.", "Acompanhe multiplicações e divisões com sinal.", "Inverta o sinal apenas com fator negativo.", "Teste um valor da região solução."]],
      example: ["2x + 1 < 9 gives 2x < 8, so x < 4.", "2x + 1 < 9 dá 2x < 8; então x < 4."],
      prompt: ["Solve 3x - 2 > 10.", "Resolva 3x - 2 > 10."], correction: ["Add 2: 3x > 12. Divide by 3: x > 4.", "Some 2: 3x > 12. Divida por 3: x > 4."],
      answerType: "expression", acceptedAnswers: ["x>4", "4<x"], practice: [["Practice: Solve -2x <= 8.", "Treino: Resolva -2x <= 8."], "expression", ["x>=-4", "x≥-4", "-4<=x", "-4≤x"], ["Divide by -2 and reverse the inequality sign.", "Divida por -2 e inverta o sinal da desigualdade."]]
    },
    {
      id: "linear-model", title: ["Build a Linear Model", "Construa um Modelo Linear"],
      idea: ["A linear model combines a starting value b with a constant rate m: y = mx + b.", "Um modelo linear combina um valor inicial b com uma taxa constante m: y = mx + b."],
      method: [["Identify the starting value at x = 0.", "Find the change in y for one x.", "Write y = mx + b.", "Use the model and check the units."], ["Identifique o valor inicial em x = 0.", "Encontre a mudança em y para uma unidade de x.", "Escreva y = mx + b.", "Use o modelo e confira as unidades."]],
      example: ["A R$10 starting fee plus R$3 per hour is y = 3x + 10.", "Uma taxa inicial de R$10 mais R$3 por hora é y = 3x + 10."],
      graph: { xLabel: "hours", yLabel: "cost", points: [[0,10],[1,13],[2,16],[3,19]], line: true },
      prompt: ["A repair costs R$12 to begin and R$5 per hour. What is the cost after 4 hours?", "Um conserto custa R$12 para começar e R$5 por hora. Qual é o custo após 4 horas?"], correction: ["Use y = 5x + 12. For x = 4, y = 20 + 12 = R$32.", "Use y = 5x + 12. Para x = 4, y = 20 + 12 = R$32."],
      answerType: "number", answer: 32, practice: [["Practice: A service starts at R$8 and adds R$6 per hour. Find the cost after 5 hours.", "Treino: Um serviço começa em R$8 e soma R$6 por hora. Ache o custo após 5 horas."], "number", 38, ["Use y = 6x + 8 with x = 5.", "Use y = 6x + 8 com x = 5."]]
    },
    {
      id: "system-intersection", title: ["Where Two Conditions Meet", "Onde Duas Condições se Encontram"],
      idea: ["The intersection of two lines is the ordered pair that makes both equations true at the same time.", "A interseção de duas linhas é o par ordenado que torna verdadeiras as duas equações ao mesmo tempo."],
      method: [["Read the intersection from the graph.", "Substitute its coordinates into the first rule.", "Check the second rule.", "Interpret both coordinates in context."], ["Leia a interseção no gráfico.", "Substitua as coordenadas na primeira regra.", "Confira a segunda regra.", "Interprete as duas coordenadas no contexto."]],
      example: ["If two lines meet at (2, 4), then x = 2 and y = 4 satisfy both rules.", "Se duas linhas se encontram em (2, 4), então x = 2 e y = 4 satisfazem as duas regras."],
      graph: { xLabel: "x", yLabel: "y", points: [[0,2],[1,3],[2,4],[3,5]], secondPoints: [[0,8],[1,6],[2,4],[3,2]], line: true },
      prompt: ["The lines y = x + 2 and y = 8 - 2x intersect at (2, 4). What is the x-coordinate of the solution?", "As linhas y = x + 2 e y = 8 - 2x se cruzam em (2, 4). Qual é a coordenada x da solução?"], correction: ["At the intersection, both equations have the same x and y. The x-coordinate is 2.", "Na interseção, as duas equações têm o mesmo x e y. A coordenada x é 2."],
      answerType: "number", answer: 2, practice: [["Practice: y = x + 1 and y = 7 - x meet when x + 1 = 7 - x. Find x.", "Treino: y = x + 1 e y = 7 - x se encontram quando x + 1 = 7 - x. Ache x."], "number", 3, ["Set the two expressions equal and solve 2x = 6.", "Iguale as expressões e resolva 2x = 6."]]
    }
  ];

  const practiceFor = (spec, lang) => {
    const [prompts, type, value, steps] = spec.practice;
    return type === "number"
      ? { prompt: prompts[lang === "en" ? 0 : 1], answerType: "number", answer: value, tolerance: 0.01, steps: [steps[lang === "en" ? 0 : 1]] }
      : { prompt: prompts[lang === "en" ? 0 : 1], answerType: "expression", acceptedAnswers: value, steps: [steps[lang === "en" ? 0 : 1]] };
  };

  const newLessons = specs.map((spec) => ({
    id: `g9-algebra-${spec.id}`, activityKey: `g9-math-algebra-${spec.id}`, grade: "Grade 9", block: blockEn, title: spec.title[0], time: "18 min",
    sourceFocus: "Original Grade 9 Algebra I bridge: meaning, structure, equations, functions, and systems.",
    teacherAim: "Learners explain algebraic structure and verify their reasoning before relying on procedures.",
    ...(spec.graph ? { graphModel: spec.graph } : {}),
    memoryRefresh: { idea: spec.idea[0], method: spec.method[0], example: spec.example[0] },
    rhythm: ["Name the structure.", "Choose an inverse or equivalent move.", "Verify the result in the original relationship."],
    prompt: spec.prompt[0], correction: spec.correction[0], answerType: spec.answerType,
    ...(spec.answerType === "number" ? { answer: spec.answer, tolerance: 0.01 } : { acceptedAnswers: spec.acceptedAnswers }),
  }));

  specs.forEach((spec) => {
    const id = `g9-algebra-${spec.id}`;
    translations[id] = {
      block: blockPt, title: spec.title[1], prompt: spec.prompt[1], correction: spec.correction[1],
      ...(spec.graph ? { graphModel: { ...spec.graph, xLabel: spec.graph.xLabel === "hours" ? "horas" : spec.graph.xLabel, yLabel: spec.graph.yLabel === "cost" ? "custo" : spec.graph.yLabel } } : {}),
      memoryRefresh: { idea: spec.idea[1], method: spec.method[1], example: spec.example[1] },
      rhythm: ["Nomeie a estrutura.", "Escolha uma operação inversa ou equivalente.", "Verifique o resultado na relação original."],
    };
    bank.en[id] = practiceFor(spec, "en");
    bank.pt[id] = practiceFor(spec, "pt");
  });

  const insertAt = lessons.findIndex((lesson) => lesson.grade === "Grade 9");
  lessons.splice(insertAt < 0 ? lessons.length : insertAt, 0, ...newLessons);
})();
