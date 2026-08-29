(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };
  const blockEn = "Ratios & Rates Path";
  const blockPt = "Caminho de Razões e Taxas";

  const specs = [
    {
      id: "meaning", title: ["The Relationship Stays", "A Relação Permanece"], model: [{ count: 3, label: "A" }, { count: 2, label: "B" }],
      idea: ["A ratio compares quantities. Multiplying or dividing both quantities by the same number keeps the relationship.", "Uma razão compara quantidades. Multiplicar ou dividir as duas pelo mesmo número mantém a relação."],
      method: [["Name the quantities in order.", "Write the ratio.", "Divide both terms by a common factor.", "Check that the comparison has not changed."], ["Nomeie as quantidades na ordem.", "Escreva a razão.", "Divida os dois termos por um fator comum.", "Confira que a comparação não mudou."]],
      example: ["18:12 reduces to 3:2.", "18:12 reduz a 3:2."], prompt: ["Simplify the ratio 18:12.", "Simplifique a razão 18:12."], correction: ["Divide both terms by 6. The relationship is 3:2.", "Divida os dois termos por 6. A relação é 3:2."], answerType: "expression", acceptedAnswers: ["3:2", "3/2"],
      practice: [["Practice: Simplify 28:42.", "Treino: Simplifique 28:42."], "expression", ["2:3", "2/3"], ["Divide both terms by 14.", "Divida os dois termos por 14."]],
    },
    {
      id: "three-part", title: ["More Than Two Quantities", "Mais de Duas Quantidades"], model: [{ count: 2, label: "A" }, { count: 3, label: "B" }, { count: 5, label: "C" }],
      idea: ["A ratio can compare three or more quantities while preserving their order.", "Uma razão pode comparar três ou mais quantidades preservando sua ordem."], method: [["Write every quantity in the stated order.", "Find a factor shared by all terms.", "Divide every term.", "Check that no term was omitted."], ["Escreva cada quantidade na ordem indicada.", "Ache um fator comum a todos.", "Divida todos os termos.", "Confira que nenhum termo foi omitido."]],
      example: ["12:18:30 reduces to 2:3:5.", "12:18:30 reduz a 2:3:5."], prompt: ["Simplify 12:18:30.", "Simplifique 12:18:30."], correction: ["Divide all three terms by 6 to obtain 2:3:5.", "Divida os três termos por 6 para obter 2:3:5."], answerType: "expression", acceptedAnswers: ["2:3:5"],
      practice: [["Practice: Simplify 16:24:40.", "Treino: Simplifique 16:24:40."], "expression", ["2:3:5"], ["Divide all terms by 8.", "Divida todos os termos por 8."]],
    },
    {
      id: "decimal-form", title: ["Ratio as a Number to One", "Razão como Número para Um"], model: [{ count: 7, label: "A" }, { count: 4, label: "B" }],
      idea: ["Dividing the first quantity by the second rewrites a ratio in decimal-to-one form.", "Dividir a primeira quantidade pela segunda reescreve a razão na forma decimal para um."], method: [["Treat the ratio as a fraction.", "Divide the first term by the second.", "Write the quotient followed by :1.", "Estimate whether the first quantity is larger or smaller."], ["Trate a razão como fração.", "Divida o primeiro termo pelo segundo.", "Escreva o quociente seguido de :1.", "Estime qual quantidade é maior."]],
      example: ["7:4 becomes 1.75:1.", "7:4 se torna 1,75:1."], prompt: ["In 7:4, what is the decimal number before :1?", "Em 7:4, qual é o número decimal antes de :1?"], correction: ["Divide 7 by 4. The decimal form is 1.75:1.", "Divida 7 por 4. A forma decimal é 1,75:1."], answerType: "number", answer: 1.75, tolerance: 0,
      practice: [["Practice: In 9:5, find the decimal number before :1.", "Treino: Em 9:5, ache o número decimal antes de :1."], "number", 1.8, ["Divide 9 by 5.", "Divida 9 por 5."]],
    },
    {
      id: "whole-form", title: ["Return to Whole-Number Form", "Volte à Forma de Números Inteiros"], model: [{ count: 12, label: "A" }, { count: 5, label: "B" }],
      idea: ["A decimal ratio can be scaled until both terms are whole numbers, then reduced.", "Uma razão decimal pode ser ampliada até que os dois termos sejam inteiros e depois reduzida."], method: [["Count decimal places.", "Multiply both terms by the matching power of ten.", "Reduce the whole-number ratio.", "Check by dividing."], ["Conte as casas decimais.", "Multiplique os dois termos pela potência de dez adequada.", "Reduza a razão inteira.", "Confira dividindo."]],
      example: ["2.4:1 becomes 24:10, then 12:5.", "2,4:1 se torna 24:10 e depois 12:5."], prompt: ["Write 2.4:1 in simplest whole-number form.", "Escreva 2,4:1 na forma inteira mais simples."], correction: ["Multiply both terms by 10 to get 24:10, then divide by 2: 12:5.", "Multiplique por 10 para obter 24:10 e divida por 2: 12:5."], answerType: "expression", acceptedAnswers: ["12:5", "12/5"],
      practice: [["Practice: Write 1.5:1 in whole-number form.", "Treino: Escreva 1,5:1 na forma inteira."], "expression", ["3:2", "3/2"], ["1.5:1 = 15:10 = 3:2.", "1,5:1 = 15:10 = 3:2."]],
    },
    {
      id: "reciprocal", title: ["Turn the Comparison Around", "Inverta a Comparação"], model: [{ count: 8, label: "B" }, { count: 5, label: "H" }],
      idea: ["Changing the order of the quantities creates the reciprocal ratio.", "Trocar a ordem das quantidades cria a razão recíproca."], method: [["Read the named order carefully.", "Reverse both terms.", "Keep the labels attached to their quantities.", "Check that both ratios describe the same pair."], ["Leia a ordem pedida.", "Inverta os dois termos.", "Mantenha os nomes ligados às quantidades.", "Confira que as duas razões descrevem o mesmo par."]],
      example: ["If B:H = 8:5, then H:B = 5:8.", "Se B:H = 8:5, então H:B = 5:8."], prompt: ["If base:height = 8:5, write height:base.", "Se base:altura = 8:5, escreva altura:base."], correction: ["Reverse the named quantities and their terms: 5:8.", "Inverta as quantidades e os termos: 5:8."], answerType: "expression", acceptedAnswers: ["5:8", "5/8"],
      practice: [["Practice: If red:blue = 7:3, write blue:red.", "Treino: Se vermelho:azul = 7:3, escreva azul:vermelho."], "expression", ["3:7", "3/7"], ["Reverse the order to 3:7.", "Inverta a ordem para 3:7."]],
    },
    {
      id: "part-of-whole", title: ["Each Part of the Whole", "Cada Parte do Todo"], model: [{ count: 3, label: "A" }, { count: 5, label: "B" }],
      idea: ["Add the ratio parts to find the whole number of equal shares.", "Some as partes da razão para encontrar o total de partes iguais."], method: [["Add all ratio terms.", "Write each term over that total.", "Multiply the required fraction by the whole.", "Check that all parts recombine."], ["Some todos os termos.", "Escreva cada termo sobre esse total.", "Multiplique a fração necessária pelo todo.", "Confira que as partes se recombinam."]],
      example: ["In 3:5, the first amount is 3/8 of the whole.", "Em 3:5, a primeira quantidade é 3/8 do todo."], prompt: ["A total of 64 is divided in the ratio 3:5. Find the smaller part.", "Um total de 64 é dividido na razão 3:5. Ache a parte menor."], correction: ["There are 8 shares. The smaller part is 3/8 of 64, which is 24.", "Há 8 partes. A menor é 3/8 de 64, que vale 24."], answerType: "number", answer: 24, tolerance: 0,
      practice: [["Practice: Divide 72 in the ratio 5:4. Find the smaller part.", "Treino: Divida 72 na razão 5:4. Ache a parte menor."], "number", 32, ["There are 9 shares; 4/9 of 72 is 32.", "Há 9 partes; 4/9 de 72 é 32."]],
    },
    {
      id: "share-three", title: ["Share Among Three", "Divida entre Três"], model: [{ count: 2, label: "A" }, { count: 3, label: "B" }, { count: 5, label: "C" }],
      idea: ["A three-part ratio distributes a whole through one common share size.", "Uma razão de três partes distribui o todo usando um mesmo tamanho de parte."], method: [["Add the ratio terms.", "Divide the whole by that total.", "Multiply one share by each term.", "Add the results to check."], ["Some os termos.", "Divida o todo por esse total.", "Multiplique uma parte por cada termo.", "Some os resultados para conferir."]],
      example: ["In 2:3:5, the middle person receives 3 of 10 shares.", "Em 2:3:5, a pessoa do meio recebe 3 de 10 partes."], prompt: ["R$500 is shared in the ratio 2:3:5. How much does the middle share receive?", "R$500 são divididos na razão 2:3:5. Quanto recebe a parte do meio?"], correction: ["There are 10 shares, each worth R$50. The middle receives 3 × 50 = R$150.", "Há 10 partes de R$50. A parte do meio recebe 3 × 50 = R$150."], answerType: "number", answer: 150, tolerance: 0,
      practice: [["Practice: Share 240 in the ratio 1:3:4. Find the largest share.", "Treino: Divida 240 na razão 1:3:4. Ache a maior parte."], "number", 120, ["Eight shares make 240, so one share is 30; 4 × 30 = 120.", "Oito partes formam 240; uma vale 30 e 4 × 30 = 120."]],
    },
    {
      id: "similar-figures", title: ["Same Shape, New Size", "Mesma Forma, Novo Tamanho"], model: [{ count: 3, label: "6 × 4" }, { count: 5, label: "? × 10" }],
      idea: ["Similar figures keep all corresponding side ratios equal.", "Figuras semelhantes mantêm iguais as razões dos lados correspondentes."], method: [["Match corresponding sides.", "Describe how one side changed.", "Apply the same scale factor to its partner.", "Check that the shape was preserved."], ["Associe os lados correspondentes.", "Descreva como um lado mudou.", "Aplique o mesmo fator ao parceiro.", "Confira que a forma foi preservada."]],
      example: ["A 6-by-4 rectangle enlarged to height 10 has length 15.", "Um retângulo 6 por 4 ampliado para altura 10 tem comprimento 15."], prompt: ["A 6-by-4 rectangle is similar to one with height 10. Find its length.", "Um retângulo 6 por 4 é semelhante a outro com altura 10. Ache o comprimento."], correction: ["The height grew by 10/4 = 2.5. Multiply the length: 6 × 2.5 = 15.", "A altura cresceu por 10/4 = 2,5. Multiplique o comprimento: 6 × 2,5 = 15."], answerType: "number", answer: 15, tolerance: 0,
      practice: [["Practice: A 5-by-3 rectangle has a similar copy with height 12. Find its length.", "Treino: Um retângulo 5 por 3 tem cópia semelhante com altura 12. Ache o comprimento."], "number", 20, ["The scale factor is 12/3 = 4; 5 × 4 = 20.", "O fator é 12/3 = 4; 5 × 4 = 20."]],
    },
    {
      id: "shadow", title: ["Measure a Height with Shadows", "Meça uma Altura com Sombras"], model: [{ count: 2, label: "2 m pole" }, { count: 3, label: "3 m shadow" }],
      idea: ["Objects under the same sunlight form similar right triangles.", "Objetos sob a mesma luz formam triângulos retângulos semelhantes."], method: [["Compare pole height to its shadow.", "Keep that ratio for the taller object.", "Find the matching height.", "Check outdoors when possible."], ["Compare a altura da vara com sua sombra.", "Mantenha essa razão no objeto alto.", "Ache a altura correspondente.", "Confira ao ar livre quando puder."]],
      example: ["A 2 m pole with a 3 m shadow gives height:shadow = 2:3.", "Uma vara de 2 m com sombra de 3 m dá altura:sombra = 2:3."], prompt: ["A 2 m pole casts a 3 m shadow. A tree casts a 12 m shadow. Find the tree height.", "Uma vara de 2 m projeta sombra de 3 m. Uma árvore projeta 12 m. Ache a altura."], correction: ["The tree shadow is four times longer, so its height is 4 × 2 = 8 m.", "A sombra da árvore é quatro vezes maior, então sua altura é 4 × 2 = 8 m."], answerType: "number", answer: 8, tolerance: 0,
      practice: [["Practice: A 1.5 m stick casts a 2 m shadow. A building shadow is 18 m. Find its height.", "Treino: Uma vara de 1,5 m projeta sombra de 2 m. A sombra de um prédio mede 18 m. Ache a altura."], "number", 13.5, ["The shadow scale factor is 9; 1.5 × 9 = 13.5.", "O fator das sombras é 9; 1,5 × 9 = 13,5."]],
    },
    {
      id: "direct", title: ["Direct Change", "Variação Direta"], model: [{ count: 7, label: "speed" }, { count: 8, label: "distance" }],
      idea: ["With time fixed, distance changes in the same direction and by the same factor as speed.", "Com o tempo fixo, a distância muda na mesma direção e pelo mesmo fator que a velocidade."], method: [["Identify what stays fixed.", "Write the speed factor.", "Use the same factor for distance.", "Check: slower should mean shorter."], ["Identifique o que fica fixo.", "Escreva o fator da velocidade.", "Use o mesmo fator na distância.", "Confira: mais devagar deve dar menor distância."]],
      example: ["At 7/8 of the speed for the same time, travel 7/8 of the distance.", "A 7/8 da velocidade pelo mesmo tempo, percorra 7/8 da distância."], prompt: ["A cyclist rode 56 km. Next day she rode for the same time at 7/8 of the speed. How far?", "Uma ciclista percorreu 56 km. No dia seguinte, pelo mesmo tempo, foi a 7/8 da velocidade. Qual distância?"], correction: ["Distance changes directly with speed: 7/8 of 56 is 49 km.", "A distância muda diretamente com a velocidade: 7/8 de 56 é 49 km."], answerType: "number", answer: 49, tolerance: 0,
      practice: [["Practice: A machine makes 80 parts. At 3/4 speed for the same time, how many?", "Treino: Uma máquina faz 80 peças. A 3/4 da velocidade pelo mesmo tempo, quantas faz?"], "number", 60, ["Use the same factor: 3/4 of 80 = 60.", "Use o mesmo fator: 3/4 de 80 = 60."]],
    },
    {
      id: "inverse", title: ["Inverse Change", "Variação Inversa"], model: [{ count: 4, label: "speed" }, { count: 5, label: "time" }],
      idea: ["For a fixed journey, slower speed requires more time, so use the reciprocal factor.", "Para uma viagem fixa, menor velocidade exige mais tempo; use o fator recíproco."], method: [["Identify the fixed distance.", "Write the speed factor.", "Reverse it for the time factor.", "Check: slower must take longer."], ["Identifique a distância fixa.", "Escreva o fator da velocidade.", "Inverta para o fator do tempo.", "Confira: mais devagar deve demorar mais."]],
      example: ["At 4/5 of the speed, time becomes 5/4 as long.", "A 4/5 da velocidade, o tempo fica 5/4 maior."], prompt: ["A trip took 20 minutes. At 4/5 of the speed, how long will the same trip take?", "Uma viagem levou 20 minutos. A 4/5 da velocidade, quanto tempo levará?"], correction: ["Use the reciprocal time factor 5/4. Then 20 × 5/4 = 25 minutes.", "Use o fator recíproco 5/4. Então 20 × 5/4 = 25 minutos."], answerType: "number", answer: 25, tolerance: 0,
      practice: [["Practice: A task takes 30 minutes. At 3/5 speed, how long?", "Treino: Uma tarefa leva 30 minutos. A 3/5 da velocidade, quanto tempo?"], "number", 50, ["Time factor is 5/3; 30 × 5/3 = 50.", "O fator do tempo é 5/3; 30 × 5/3 = 50."]],
    },
    {
      id: "lever", title: ["Balance the Lever", "Equilibre a Alavanca"], model: [{ count: 5, label: "25 kg" }, { count: 4, label: "20 kg" }],
      idea: ["For a balanced lever, weights and distances from the fulcrum change inversely.", "Numa alavanca equilibrada, pesos e distâncias ao fulcro variam inversamente."], method: [["Compare the weights.", "Reverse that ratio for the distances.", "Scale the known distance.", "Check that weight × distance matches."], ["Compare os pesos.", "Inverta a razão para as distâncias.", "Aplique o fator à distância conhecida.", "Confira peso × distância."]],
      example: ["A lighter person must sit farther from the fulcrum.", "Uma pessoa mais leve deve sentar mais longe do fulcro."], prompt: ["A 25 kg child sits 1.8 m from the fulcrum. How far must a 20 kg child sit to balance?", "Uma criança de 25 kg senta a 1,8 m do fulcro. A que distância deve sentar uma criança de 20 kg?"], correction: ["The lighter child sits 25/20 = 5/4 as far: 1.8 × 5/4 = 2.25 m.", "A criança mais leve fica 25/20 = 5/4 mais longe: 1,8 × 5/4 = 2,25 m."], answerType: "number", answer: 2.25, tolerance: 0.01,
      practice: [["Practice: A 30 kg child sits 2 m away. How far should a 24 kg child sit?", "Treino: Uma criança de 30 kg senta a 2 m. A que distância fica uma de 24 kg?"], "number", 2.5, ["Use reciprocal factor 30/24 = 5/4; 2 × 5/4 = 2.5.", "Use 30/24 = 5/4; 2 × 5/4 = 2,5."]],
    },
  ];

  const makePractice = (spec, language) => {
    const [prompt, type, answer, steps] = spec.practice;
    return type === "number"
      ? { prompt: prompt[language === "en" ? 0 : 1], answerType: "number", answer, tolerance: 0.01, steps: [steps[language === "en" ? 0 : 1]] }
      : { prompt: prompt[language === "en" ? 0 : 1], answerType: "expression", acceptedAnswers: answer, steps: [steps[language === "en" ? 0 : 1]] };
  };

  const newLessons = specs.map((spec) => ({
    id: `g7-ratios-${spec.id}`, activityKey: `g7-math-ratios-${spec.id}`, grade: "Grade 7", block: blockEn, title: spec.title[0], time: "17 min",
    sourceFocus: "Original Grade 7 ratio reasoning: relationships before formal proportions.", teacherAim: "Learners reason with multiplicative relationships without relying on cross multiplication.", ratioModel: spec.model,
    memoryRefresh: { idea: spec.idea[0], method: spec.method[0], example: spec.example[0] }, rhythm: ["Name what is compared.", "Predict the direction of change.", "Calculate and check the relationship."],
    prompt: spec.prompt[0], correction: spec.correction[0], answerType: spec.answerType, ...(spec.answerType === "number" ? { answer: spec.answer, tolerance: spec.tolerance } : { acceptedAnswers: spec.acceptedAnswers }),
  }));

  specs.forEach((spec) => {
    const id = `g7-ratios-${spec.id}`;
    translations[id] = { block: blockPt, title: spec.title[1], prompt: spec.prompt[1], correction: spec.correction[1], memoryRefresh: { idea: spec.idea[1], method: spec.method[1], example: spec.example[1] }, rhythm: ["Nomeie o que está sendo comparado.", "Preveja a direção da mudança.", "Calcule e confira a relação."] };
    bank.en[id] = makePractice(spec, "en");
    bank.pt[id] = makePractice(spec, "pt");
  });

  const insertAt = lessons.findIndex((lesson) => lesson.grade === "Grade 8");
  lessons.splice(insertAt < 0 ? lessons.length : insertAt, 0, ...newLessons);
  const grade7BlockOrder = ["Arithmetic Review", "Puzzles", "Divisibility", "Fractions", "Decimals", "Repeating Decimals", "Percents", "Business Math", "Ratios & Rates Path", "Ratios", "Rates", "Unit Cost", "Álgebra", "Formulas"];
  const firstGrade7 = lessons.findIndex((lesson) => lesson.grade === "Grade 7");
  const grade7Lessons = lessons.filter((lesson) => lesson.grade === "Grade 7").sort((a, b) => grade7BlockOrder.indexOf(a.block) - grade7BlockOrder.indexOf(b.block));
  lessons.splice(firstGrade7, grade7Lessons.length, ...grade7Lessons);
})();
