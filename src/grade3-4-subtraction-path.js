(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };
  const reviewSheets = window.arithmeticReviewSheets || [];

  const specs = [
    {
      id: "g3-subtraction-no-exchange", key: "g3-math-subtraction-no-exchange", grade: "Grade 3",
      block: ["Meaningful Subtraction", "Subtração com Sentido"], title: ["Keep Every Place in Its Home", "Mantenha Cada Ordem em Seu Lugar"],
      idea: ["Vertical subtraction records hundreds, tens, and ones in matching columns.", "A subtração vertical registra centenas, dezenas e unidades em colunas correspondentes."],
      method: [["Estimate the difference.", "Align ones under ones and tens under tens.", "Subtract each place from right to left.", "Add the difference back to check."], ["Estime a diferença.", "Alinhe unidades com unidades e dezenas com dezenas.", "Subtraia cada ordem da direita para a esquerda.", "Some a diferença de volta para conferir."]],
      example: ["76 − 34 = (70 − 30) + (6 − 4) = 42.", "76 − 34 = (70 − 30) + (6 − 4) = 42."], prompt: ["Calculate 85 − 42.", "Calcule 85 − 42."], answer: 43,
      correction: ["Subtract matching places: 5 − 2 = 3 and 8 tens − 4 tens = 4 tens. Check 43 + 42 = 85.", "Subtraia ordens correspondentes: 5 − 2 = 3 e 8 dezenas − 4 dezenas = 4 dezenas. Confira: 43 + 42 = 85."],
      guided: [["Ones: 5 − 2", 3], ["Tens: 8 − 4", 4]], practice: ["Practice: 97 − 53.", "Treino: 97 − 53.", 44, ["Align places, subtract, then add 53 back."], ["Alinhe as ordens, subtraia e some 53 de volta."]]
    },
    {
      id: "g3-subtraction-open-ten", key: "g3-math-subtraction-open-ten", grade: "Grade 3",
      block: ["Meaningful Subtraction", "Subtração com Sentido"], title: ["Open One Ten", "Abra Uma Dezena"],
      idea: ["One ten can be exchanged for ten ones without changing the whole number.", "Uma dezena pode ser trocada por dez unidades sem mudar o número inteiro."],
      method: [["Align the places and estimate.", "If there are too few ones, exchange one ten for ten ones.", "Subtract the ones, then the remaining tens.", "Check by addition."], ["Alinhe as ordens e estime.", "Se faltarem unidades, troque uma dezena por dez unidades.", "Subtraia as unidades e depois as dezenas restantes.", "Confira por adição."]],
      example: ["63 becomes 5 tens and 13 ones. Then 63 − 28 = 35.", "63 vira 5 dezenas e 13 unidades. Então 63 − 28 = 35."], prompt: ["Calculate 72 − 48.", "Calcule 72 − 48."], answer: 24,
      correction: ["Exchange one ten: 72 becomes 6 tens and 12 ones. Then 12 − 8 = 4 and 6 − 4 = 2.", "Troque uma dezena: 72 vira 6 dezenas e 12 unidades. Depois 12 − 8 = 4 e 6 − 4 = 2."],
      guided: [["How many ones after opening one ten?", 12], ["How many tens remain?", 6]], practice: ["Practice: 81 − 56.", "Treino: 81 − 56.", 25, ["Rename 81 as 7 tens and 11 ones."], ["Renomeie 81 como 7 dezenas e 11 unidades."]]
    },
    {
      id: "g3-subtraction-three-places", key: "g3-math-subtraction-three-places", grade: "Grade 3",
      block: ["Meaningful Subtraction", "Subtração com Sentido"], title: ["Three Places, No Exchange", "Três Ordens, Sem Troca"],
      idea: ["The same place-value structure continues when hundreds are added.", "A mesma estrutura de valor posicional continua quando acrescentamos centenas."],
      method: [["Estimate with rounded hundreds.", "Align hundreds, tens, and ones.", "Subtract each matching place.", "Check by addition."], ["Estime arredondando as centenas.", "Alinhe centenas, dezenas e unidades.", "Subtraia cada ordem correspondente.", "Confira por adição."]],
      example: ["786 − 243 = 543 because each place can be subtracted directly.", "786 − 243 = 543 porque cada ordem pode ser subtraída diretamente."], prompt: ["Calculate 968 − 425.", "Calcule 968 − 425."], answer: 543,
      correction: ["Ones: 8 − 5 = 3; tens: 6 − 2 = 4; hundreds: 9 − 4 = 5.", "Unidades: 8 − 5 = 3; dezenas: 6 − 2 = 4; centenas: 9 − 4 = 5."],
      guided: [["Ones difference", 3], ["Tens difference", 4]], practice: ["Practice: 875 − 321.", "Treino: 875 − 321.", 554, ["Keep each digit in its place-value column."], ["Mantenha cada algarismo na coluna de sua ordem."]]
    },
    {
      id: "g3-subtraction-open-hundred", key: "g3-math-subtraction-open-hundred", grade: "Grade 3",
      block: ["Meaningful Subtraction", "Subtração com Sentido"], title: ["Open One Hundred", "Abra Uma Centena"],
      idea: ["One hundred can become ten tens, just as one ten can become ten ones.", "Uma centena pode se tornar dez dezenas, assim como uma dezena pode se tornar dez unidades."],
      method: [["Begin at the ones.", "When the tens are too few, exchange one hundred for ten tens.", "Subtract each place.", "Rebuild the starting number to check."], ["Comece pelas unidades.", "Quando faltarem dezenas, troque uma centena por dez dezenas.", "Subtraia cada ordem.", "Reconstrua o número inicial para conferir."]],
      example: ["For 624 − 352, rename 624 as 5 hundreds, 12 tens, and 4 ones.", "Em 624 − 352, renomeie 624 como 5 centenas, 12 dezenas e 4 unidades."], prompt: ["Calculate 735 − 462.", "Calcule 735 − 462."], answer: 273,
      correction: ["Ones give 3. Exchange one hundred so 7 hundreds 3 tens becomes 6 hundreds 13 tens. Then 13 − 6 = 7 and 6 − 4 = 2.", "As unidades dão 3. Troque uma centena: 7 centenas e 3 dezenas viram 6 centenas e 13 dezenas. Então 13 − 6 = 7 e 6 − 4 = 2."],
      guided: [["How many tens after opening one hundred?", 13], ["How many hundreds remain?", 6]], practice: ["Practice: 814 − 532.", "Treino: 814 − 532.", 282, ["Open one hundred to make 11 tens."], ["Abra uma centena para formar 11 dezenas."]]
    },
    {
      id: "g3-subtraction-two-exchanges", key: "g3-math-subtraction-two-exchanges", grade: "Grade 3",
      block: ["Meaningful Subtraction", "Subtração com Sentido"], title: ["Exchange Twice, One Place at a Time", "Troque Duas Vezes, Uma Ordem por Vez"],
      idea: ["A number can be renamed across two places while its total value remains unchanged.", "Um número pode ser renomeado em duas ordens sem mudar seu valor total."],
      method: [["Open one ten for the ones place.", "If needed, open one hundred for the tens place.", "Subtract one place at a time.", "Check by addition and estimation."], ["Abra uma dezena para a ordem das unidades.", "Se necessário, abra uma centena para as dezenas.", "Subtraia uma ordem de cada vez.", "Confira por adição e estimativa."]],
      example: ["742 can be renamed as 6 hundreds, 13 tens, and 12 ones before subtracting 386.", "742 pode ser renomeado como 6 centenas, 13 dezenas e 12 unidades antes de subtrair 386."], prompt: ["Calculate 853 − 476.", "Calcule 853 − 476."], answer: 377,
      correction: ["Rename 853 as 7 hundreds, 14 tens, and 13 ones. Then subtract to get 377; check 377 + 476 = 853.", "Renomeie 853 como 7 centenas, 14 dezenas e 13 unidades. Depois subtraia para obter 377; confira: 377 + 476 = 853."],
      guided: [["How many ones after the first exchange?", 13], ["How many tens after the second exchange?", 14]], practice: ["Practice: 742 − 386.", "Treino: 742 − 386.", 356, ["Rename as 6 hundreds, 13 tens, and 12 ones."], ["Renomeie como 6 centenas, 13 dezenas e 12 unidades."]]
    },
    {
      id: "g4-subtraction-through-zero", key: "g4-math-subtraction-through-zero", grade: "Grade 4",
      block: ["Subtraction Strategies", "Estratégias de Subtração"], title: ["Exchange Through an Empty Place", "Troque Através de Uma Ordem Vazia"],
      idea: ["A zero means there are no units in that place yet; exchange from the next non-zero place and pass the value across.", "Um zero indica que ainda não há unidades naquela ordem; troque a partir da próxima ordem não vazia e passe o valor adiante."],
      method: [["Find the first non-zero place to the left.", "Exchange one unit into ten of the next place.", "Continue until the needed place has enough.", "Subtract and add back to check."], ["Encontre a primeira ordem não vazia à esquerda.", "Troque uma unidade por dez da ordem seguinte.", "Continue até que a ordem necessária tenha o suficiente.", "Subtraia e some de volta para conferir."]],
      example: ["803 becomes 7 hundreds, 9 tens, and 13 ones when subtracting 687.", "803 vira 7 centenas, 9 dezenas e 13 unidades ao subtrair 687."], prompt: ["Calculate 904 − 368.", "Calcule 904 − 368."], answer: 536,
      correction: ["Pass one hundred through the empty tens: 904 becomes 8 hundreds, 9 tens, and 14 ones. Subtract to get 536.", "Passe uma centena pelas dezenas vazias: 904 vira 8 centenas, 9 dezenas e 14 unidades. Subtraia para obter 536."],
      guided: [["How many tens remain after passing one ten to the ones?", 9], ["How many ones are available?", 14]], practice: ["Practice: 803 − 687.", "Treino: 803 − 687.", 116, ["Rename 803 as 7 hundreds, 9 tens, and 13 ones."], ["Renomeie 803 como 7 centenas, 9 dezenas e 13 unidades."]]
    },
    {
      id: "g4-subtraction-strategy-choice", key: "g4-math-subtraction-strategy-choice", grade: "Grade 4",
      block: ["Subtraction Strategies", "Estratégias de Subtração"], title: ["Choose the Shortest Sensible Path", "Escolha o Caminho Mais Simples"],
      idea: ["Vertical subtraction is useful, but counting up or adjusting can be clearer when numbers are close to landmarks.", "A subtração vertical é útil, mas completar ou compensar pode ser mais claro quando os números estão perto de marcos."],
      method: [["Estimate the distance.", "Look for a nearby ten, hundred, or thousand.", "Choose counting up, compensation, or vertical form.", "Explain why the method fits."], ["Estime a distância.", "Procure uma dezena, centena ou milhar próxima.", "Escolha completar, compensar ou usar a forma vertical.", "Explique por que o método combina com a conta."]],
      example: ["For 1,002 − 987, count 13 to 1,000 and 2 more: the difference is 15.", "Em 1.002 − 987, complete 13 até 1.000 e mais 2: a diferença é 15."], prompt: ["Find 2,005 − 1,988.", "Encontre 2.005 − 1.988."], answer: 17,
      correction: ["Count 12 from 1,988 to 2,000, then 5 more to 2,005: 12 + 5 = 17.", "Complete 12 de 1.988 até 2.000 e mais 5 até 2.005: 12 + 5 = 17."],
      guided: [["Distance from 1,988 to 2,000", 12]], practice: ["Practice: Find 5,003 − 4,989.", "Treino: encontre 5.003 − 4.989.", 14, ["Count to 5,000, then add 3 more."], ["Complete até 5.000 e some mais 3."]]
    },
    {
      id: "g4-subtraction-estimate-check", key: "g4-math-subtraction-estimate-check", grade: "Grade 4",
      block: ["Subtraction Strategies", "Estratégias de Subtração"], title: ["Estimate, Calculate, Rebuild", "Estime, Calcule e Reconstrua"],
      idea: ["A sound subtraction answer agrees with an estimate and rebuilds the original number when added back.", "Uma resposta confiável combina com a estimativa e reconstrói o número inicial quando somada de volta."],
      method: [["Round both numbers for an estimate.", "Calculate with a suitable method.", "Add difference + subtrahend.", "Compare both checks with the original."], ["Arredonde os dois números para estimar.", "Calcule com um método adequado.", "Some diferença + subtraendo.", "Compare as duas conferências com o número inicial."]],
      example: ["3,250 − 1,786 is near 3,300 − 1,800 = 1,500; the exact answer 1,464 is reasonable.", "3.250 − 1.786 está perto de 3.300 − 1.800 = 1.500; a resposta exata 1.464 é razoável."], prompt: ["Calculate 4,120 − 2,758.", "Calcule 4.120 − 2.758."], answer: 1362,
      correction: ["The answer is 1,362. It is near the estimate 4,100 − 2,800 = 1,300, and 1,362 + 2,758 = 4,120.", "A resposta é 1.362. Ela está perto da estimativa 4.100 − 2.800 = 1.300, e 1.362 + 2.758 = 4.120."],
      guided: [["Estimate using 4,100 − 2,800", 1300]], practice: ["Practice: 3,506 − 1,879.", "Treino: 3.506 − 1.879.", 1627, ["Estimate first, then check 1,627 + 1,879."], ["Estime primeiro e depois confira 1.627 + 1.879."]]
    }
  ];

  specs.forEach((spec) => {
    lessons.push({
      id: spec.id, activityKey: spec.key, grade: spec.grade, block: spec.block[0], title: spec.title[0], time: "14 min",
      sourceFocus: "Original place-value subtraction lesson informed by a developmental progression; no source exercise reproduced.",
      teacherAim: "Learners understand exchange through place value, choose a sensible strategy, estimate, and verify by addition.",
      memoryRefresh: { idea: spec.idea[0], method: spec.method[0], example: spec.example[0] },
      rhythm: ["Estimate the distance.", "Rename only when needed.", "Add back to check."],
      prompt: spec.prompt[0], correction: spec.correction[0], answerType: "number", answer: spec.answer, tolerance: 0,
      guidedSteps: spec.guided.map(([label, answer]) => ({ label, answerType: "number", answer, tolerance: 0 })),
    });
    translations[spec.id] = {
      block: spec.block[1], title: spec.title[1], prompt: spec.prompt[1], correction: spec.correction[1],
      memoryRefresh: { idea: spec.idea[1], method: spec.method[1], example: spec.example[1] },
      rhythm: ["Estime a distância.", "Renomeie somente quando necessário.", "Some de volta para conferir."],
      guidedSteps: spec.guided.map(([, answer], index) => ({ label: `Etapa ${index + 1}`, answerType: "number", answer, tolerance: 0 })),
    };
    bank.en[spec.id] = { prompt: spec.practice[0], answerType: "number", answer: spec.practice[2], tolerance: 0, steps: spec.practice[3] };
    bank.pt[spec.id] = { prompt: spec.practice[1], answerType: "number", answer: spec.practice[2], tolerance: 0, steps: spec.practice[4] };
  });

  reviewSheets.push({
    id: "review-sheet-subtraction-recovery", number: "R",
    title: { pt: "Recuperação de subtração", en: "Subtraction recovery" },
    focus: { pt: "Descubra exatamente qual etapa precisa ser retomada: alinhamento, trocas, zeros, decimais ou conferência.", en: "Find the exact step to revisit: alignment, exchange, zeroes, decimals, or checking." },
    problems: [
      { id: "sr-p1", answerType: "number", prompt: { pt: "Nível 1 — sem troca: 96 − 43.", en: "Level 1 — no exchange: 96 − 43." }, answer: 53, tolerance: 0, steps: { pt: ["Alinhe dezenas e unidades.", "Subtraia cada ordem.", "Confira: 53 + 43 = 96."], en: ["Align tens and ones.", "Subtract each place.", "Check: 53 + 43 = 96."] } },
      { id: "sr-p2", answerType: "number", prompt: { pt: "Nível 2 — uma troca: 72 − 48.", en: "Level 2 — one exchange: 72 − 48." }, answer: 24, tolerance: 0, steps: { pt: ["72 vira 6 dezenas e 12 unidades.", "12 − 8 = 4; 6 − 4 = 2."], en: ["Rename 72 as 6 tens and 12 ones.", "12 − 8 = 4; 6 − 4 = 2."] } },
      { id: "sr-p3", answerType: "number", prompt: { pt: "Nível 3 — duas trocas: 853 − 476.", en: "Level 3 — two exchanges: 853 − 476." }, answer: 377, tolerance: 0, steps: { pt: ["853 vira 7 centenas, 14 dezenas e 13 unidades.", "Subtraia e confira por adição."], en: ["Rename 853 as 7 hundreds, 14 tens, and 13 ones.", "Subtract and check by addition."] } },
      { id: "sr-p4", answerType: "number", prompt: { pt: "Nível 4 — através do zero: 904 − 368.", en: "Level 4 — through zero: 904 − 368." }, answer: 536, tolerance: 0, steps: { pt: ["Passe uma centena pelas dezenas vazias.", "904 vira 8 centenas, 9 dezenas e 14 unidades."], en: ["Pass one hundred through the empty tens place.", "Rename 904 as 8 hundreds, 9 tens, and 14 ones."] } },
      { id: "sr-p5", answerType: "number", prompt: { pt: "Nível 5 — decimais: 302,40 − 17,86.", en: "Level 5 — decimals: 302.40 − 17.86." }, answer: 284.54, tolerance: 0, steps: { pt: ["Alinhe as vírgulas.", "Troque através das ordens vazias quando necessário.", "Confira: 284,54 + 17,86 = 302,40."], en: ["Align decimal points.", "Exchange through empty places when needed.", "Check: 284.54 + 17.86 = 302.40."] } },
      { id: "sr-p6", answerType: "number", prompt: { pt: "Nível 6 — escolha a estratégia: 2.005 − 1.988.", en: "Level 6 — choose a strategy: 2,005 − 1,988." }, answer: 17, tolerance: 0, steps: { pt: ["Complete 12 até 2.000.", "Some mais 5 até 2.005.", "Diferença: 17."], en: ["Count 12 up to 2,000.", "Add 5 more to 2,005.", "Difference: 17."] } },
    ],
  });

  lessons.sort((a, b) => Number(a.grade.match(/\d+/)?.[0] || 0) - Number(b.grade.match(/\d+/)?.[0] || 0));
})();
