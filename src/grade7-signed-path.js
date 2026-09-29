(() => {
  window.addLearningSequence(7, ["Signed Number Foundations", "Fundamentos dos Números com Sinal"], "244", [
    {
      key: "signed-cross-zero", title: ["Walk Across Zero", "Atravesse o Zero"],
      warmup: [["Order −3, 0 and 2 on a line.", "Ordene −3, 0 e 2 numa reta."], ["Say which direction increases the number.", "Diga qual direção aumenta o número."]], materials: ["Number line from −10 to 10 and a counter", "Reta de −10 a 10 e uma peça"],
      invite: ["Can a positive move begin below zero?", "Um movimento positivo pode começar abaixo de zero?"],
      actions: [["Place a counter at −3.", "Coloque uma peça em −3."], ["Move five unit steps in the increasing direction. Count moves, not starting points.", "Avance cinco passos unitários na direção crescente. Conte movimentos, não pontos iniciais."], ["Reverse the move and describe the starting point, change and endpoint.", "Inverta o movimento e descreva início, mudança e chegada."]],
      question: ["What is −3 + 5?", "Quanto é −3 + 5?"], answer: 2,
      guided: [["How many positive steps reach zero from −3?", "Quantos passos positivos levam de −3 ao zero?", 3], ["How many of the five steps remain?", "Quantos dos cinco passos restam?", 2]],
      idea: ["The sign of the starting value and the direction of the change are different things.", "O sinal do valor inicial e a direção da mudança são coisas diferentes."],
      method: [["Locate the start, then follow the signed change.", "Localize o início e siga a mudança com seu sinal."], ["Check by reversing the movement.", "Confira invertendo o movimento."]],
      example: ["−4 + 6 = 2: four steps to zero, then two more.", "−4 + 6 = 2: quatro passos até zero, depois mais dois."],
      solution: ["Five steps from −3 end at 2. Check: 2 − 5 = −3.", "Cinco passos a partir de −3 terminam em 2. Confira: 2 − 5 = −3."],
      mistake: ["Adding a positive number moves right even if the starting number is negative.", "Somar um número positivo leva à direita mesmo quando o início é negativo."],
      observe: ["Draw and explain the start, the change and the endpoint. Then show a move that stays below zero.", "Desenhe e explique início, mudança e chegada. Depois mostre um movimento que continua abaixo de zero."],
      practice: [["Find −6 + 4.", "Calcule −6 + 4.", -2, "Four steps right from −6 end at −2.", "Quatro passos à direita de −6 terminam em −2."], ["The temperature is −2°C and rises 7°C. Final temperature?", "A temperatura é −2°C e sobe 7°C. Temperatura final?", 5, "−2 + 7 = 5°C.", "−2 + 7 = 5°C."], ["Start at 2 and move five steps left. Endpoint?", "Comece em 2 e dê cinco passos à esquerda. Chegada?", -3, "2 − 5 = −3, reversing the main journey.", "2 − 5 = −3, invertendo o percurso principal."]]
    },
    {
      key: "signed-remove-negative", title: ["Remove a Negative Counter", "Retire Uma Peça Negativa"], recall: ["g7-signed-cross-zero"],
      warmup: [["What is 1 + (−1)?", "Quanto é 1 + (−1)?"], ["Model four positive counters.", "Represente quatro peças positivas."]], materials: ["Counters in two colours labelled +1 and −1", "Peças de duas cores marcadas +1 e −1"],
      invite: ["How can removing a negative amount increase the total?", "Como retirar uma quantidade negativa pode aumentar o total?"],
      actions: [["Begin with four +1 counters.", "Comece com quatro peças +1."], ["Add two zero pairs, each containing +1 and −1. Verify the value is still four.", "Acrescente dois pares nulos, cada um com +1 e −1. Confira se o valor ainda é quatro."], ["Remove the two negative counters. Count the value that remains.", "Retire as duas peças negativas. Conte o valor restante."]],
      question: ["What is 4 − (−2)?", "Quanto é 4 − (−2)?"], answer: 6,
      guided: [["What is the value of the two added zero pairs?", "Qual é o valor dos dois pares nulos acrescentados?", 0], ["How many positive counters are present before removing the negatives?", "Quantas peças positivas há antes de retirar as negativas?", 6]],
      idea: ["Subtracting a signed number means adding its opposite.", "Subtrair um número com sinal equivale a somar seu oposto."],
      method: [["Use zero pairs if the counters to remove are missing.", "Use pares nulos se faltarem as peças que precisa retirar."], ["Remove the stated amount and check by adding it back.", "Retire a quantidade indicada e confira somando-a de volta."]],
      example: ["2 − (−3) = 5; check 5 + (−3) = 2.", "2 − (−3) = 5; confira 5 + (−3) = 2."],
      solution: ["Removing two −1 counters leaves six +1 counters: 6. Check 6 + (−2) = 4.", "Retirar duas peças −1 deixa seis peças +1: 6. Confira 6 + (−2) = 4."],
      mistake: ["The subtraction sign tells you to remove; the second sign tells you what is removed.", "O sinal de subtração manda retirar; o segundo sinal diz o que é retirado."],
      observe: ["Explain why adding zero pairs preserves the starting value and removing negative counters increases it.", "Explique por que acrescentar pares nulos preserva o valor inicial e retirar peças negativas o aumenta."],
      practice: [["Find 1 − (−4).", "Calcule 1 − (−4).", 5, "1 + 4 = 5.", "1 + 4 = 5."], ["A score is −3. A mistaken penalty of −5 is removed. New score?", "Uma pontuação é −3. Uma penalidade equivocada de −5 é retirada. Nova pontuação?", 2, "−3 − (−5) = −3 + 5 = 2.", "−3 − (−5) = −3 + 5 = 2."], ["Find −3 + 5 using a number line.", "Calcule −3 + 5 com uma reta numérica.", 2, "Move five steps right to 2.", "Avance cinco passos à direita até 2."]]
    },
    {
      key: "signed-product-pattern", title: ["Keep the Multiplication Pattern", "Mantenha o Padrão da Multiplicação"], recall: ["g7-signed-remove-negative"],
      warmup: [["Add three groups of −2.", "Some três grupos de −2."], ["What is −3 × 0?", "Quanto é −3 × 0?"]], materials: ["Paper table with columns for factor and product", "Tabela no papel com colunas para fator e produto"],
      invite: ["What must happen to products as a factor passes through zero?", "O que precisa acontecer com os produtos quando um fator passa pelo zero?"],
      actions: [["Write −3 × 2, −3 × 1 and −3 × 0 in a table.", "Escreva −3 × 2, −3 × 1 e −3 × 0 numa tabela."], ["Continue the products for factors −1 and −2 using the same change each time.", "Continue os produtos para fatores −1 e −2 usando a mesma mudança a cada vez."], ["Check with distribution: −3 × (2 + (−2)) must equal zero. The two products must cancel.", "Confira pela distributiva: −3 × (2 + (−2)) precisa ser zero. Os dois produtos precisam se anular."]],
      question: ["What is −3 × (−2)?", "Quanto é −3 × (−2)?"], answer: 6,
      guided: [["What is −3 × 2?", "Quanto é −3 × 2?", -6], ["Which product cancels −6 to make zero?", "Que produto anula −6 para formar zero?", 6]],
      idea: ["The sign rules for products preserve multiplication patterns and the distributive law.", "As regras de sinais dos produtos preservam os padrões da multiplicação e a distributiva."],
      method: [["Find the magnitude from familiar multiplication facts.", "Ache o valor absoluto usando fatos de multiplicação conhecidos."], ["Use the pattern or distribution to justify the sign.", "Use o padrão ou a distributiva para justificar o sinal."]],
      example: ["−4 × 3 = −12; −4 × (−3) = 12 so their sum is zero.", "−4 × 3 = −12; −4 × (−3) = 12 para que a soma seja zero."],
      solution: ["Products −6, −3, 0, 3, 6 increase by 3. Also −6 + 6 = 0, as distribution requires.", "Os produtos −6, −3, 0, 3, 6 aumentam de 3 em 3. Além disso, −6 + 6 = 0, como exige a distributiva."],
      mistake: ["A remembered sign rule needs a reason; test it against a zero product split into two parts.", "Uma regra de sinais decorada precisa de uma razão; teste-a com um produto zero separado em duas partes."],
      observe: ["Explain the positive result using distribution, not only the phrase 'two negatives make a positive'.", "Explique o resultado positivo pela distributiva, não apenas pela frase 'menos com menos dá mais'."],
      practice: [["Calculate −4 × (−5).", "Calcule −4 × (−5).", 20, "−4 × 5 = −20; the opposite product is 20.", "−4 × 5 = −20; o produto oposto é 20."], ["Four days each change a score by −3. Total change?", "Quatro dias mudam uma pontuação em −3 cada. Mudança total?", -12, "4 × (−3) = −12.", "4 × (−3) = −12."], ["Find 3 − (−2).", "Calcule 3 − (−2).", 5, "3 + 2 = 5.", "3 + 2 = 5."]]
    },
    {
      key: "signed-divide-combine", title: ["Use the Inverse, Then Combine", "Use a Inversa, Depois Combine"], stage: "transfer", recall: ["g7-signed-product-pattern", "g7-signed-cross-zero"],
      warmup: [["Which number times 3 gives −18?", "Que número vezes 3 dá −18?"], ["Calculate 5 − 8.", "Calcule 5 − 8."]], materials: ["Paper and a number line", "Papel e reta numérica"],
      invite: ["Can multiplication explain the sign of a quotient?", "A multiplicação pode explicar o sinal de um quociente?"],
      actions: [["Write −18 ÷ 3 as a missing-factor question: 3 × ? = −18.", "Escreva −18 ÷ 3 como fator desconhecido: 3 × ? = −18."], ["Check the quotient by multiplying. Repeat with −18 ÷ (−3).", "Confira o quociente multiplicando. Repita com −18 ÷ (−3)."], ["For −2 × (5 − 8), evaluate the bracket first and explain the product sign.", "Em −2 × (5 − 8), resolva primeiro o parêntese e explique o sinal do produto."]],
      question: ["Find −2 × (5 − 8).", "Calcule −2 × (5 − 8)."], answer: 6,
      guided: [["What is the bracket value, 5 − 8?", "Qual é o valor do parêntese, 5 − 8?", -3], ["What is the magnitude 2 × 3?", "Qual é o valor absoluto 2 × 3?", 6]],
      idea: ["Division reverses multiplication; operation order keeps a combined expression unambiguous.", "Divisão inverte multiplicação; a ordem das operações evita ambiguidades numa expressão."],
      method: [["Resolve brackets, then multiplication/division, then addition/subtraction.", "Resolva parênteses, depois multiplicação/divisão, depois adição/subtração."], ["Check each signed step before combining.", "Confira cada etapa com sinal antes de combinar."]],
      example: ["−4 × 6 + 9 = −24 + 9 = −15. Also −18 ÷ 3 = −6 because 3 × (−6) = −18.", "−4 × 6 + 9 = −24 + 9 = −15. E −18 ÷ 3 = −6 porque 3 × (−6) = −18."],
      solution: ["5 − 8 = −3; −2 × (−3) = 6.", "5 − 8 = −3; −2 × (−3) = 6."],
      mistake: ["Keep the negative sign with its number and complete brackets first.", "Mantenha o sinal negativo junto ao número e resolva os parênteses primeiro."],
      observe: ["Explain a division with its inverse multiplication, then explain the order and signs in your expression.", "Explique uma divisão por sua multiplicação inversa, depois a ordem e os sinais da expressão."],
      practice: [["Calculate −18 ÷ (−3).", "Calcule −18 ÷ (−3).", 6, "(−3) × 6 = −18.", "(−3) × 6 = −18."], ["Find −4 × 6 + 9 without skipping the intermediate product.", "Calcule −4 × 6 + 9 sem pular o produto intermediário.", -15, "−24 + 9 = −15.", "−24 + 9 = −15."], ["Return to the number line: −7 + 10 = ?", "Volte à reta numérica: −7 + 10 = ?", 3, "Seven steps to zero and three more give 3.", "Sete passos até zero e mais três dão 3."]]
    }
  ]);
})();
