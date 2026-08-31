(() => {
  const lessons = window.lessons || [];
  const translations = window.lessonTranslations || {};
  const bank = window.extraPracticeBank || { en: {}, pt: {} };

  const grade1Lessons = [
    {
      id: "g1-number-quality-five", activityKey: "g1-math-number-quality-five", grade: "Grade 1", block: "Living Numbers", title: "Where Five Lives", time: "10 min",
      sourceFocus: "Original Grade 1 number-quality lesson moving from body and surroundings to quantity and symbol.", teacherAim: "Learners meet five as a lived quantity before treating 5 as an abstract mark.",
      memoryRefresh: { idea: "A number names a quantity we can find, move, draw, and arrange in many ways.", method: ["Find five things around you.", "Touch or move each thing while counting.", "Arrange the five things in a new shape.", "Only then write the numeral 5."], example: "Five can be the fingers on one hand, five stones in a ring, or two stones beside three stones." },
      rhythm: ["Show five fingers.", "Take five steps.", "Tap five beats."], prompt: "Place 5 small objects in front of you. Move 2 to one side. How many remain on the other side?", correction: "Five can be separated into 2 and 3. If 2 move aside, 3 remain.", answerType: "number", answer: 3, tolerance: 0,
      guidedSteps: [{ label: "Begin with this many objects.", answerType: "number", answer: 5 }, { label: "Move this many aside.", answerType: "number", answer: 2 }],
    },
    {
      id: "g1-whole-parts-eight", activityKey: "g1-math-whole-parts-eight", grade: "Grade 1", block: "Whole and Parts", title: "Many Ways to Make Eight", time: "11 min",
      sourceFocus: "Original Grade 1 whole-to-parts exploration with movable objects.", teacherAim: "Learners begin with a whole and discover that it can be partitioned freely without changing its total.",
      memoryRefresh: { idea: "Begin with the whole. The same whole can be separated into different parts.", method: ["Count the whole collection.", "Separate it into two groups.", "Name both parts.", "Join the parts and check the whole."], example: "Eight can be 1 and 7, 2 and 6, 3 and 5, or 4 and 4." },
      rhythm: ["See the whole.", "Open it into parts.", "Bring the parts together."], prompt: "You have 8 shells. Put 3 in one group. How many shells belong in the other group?", correction: "The whole is 8. Its parts are 3 and 5 because 3 + 5 = 8.", answerType: "number", answer: 5, tolerance: 0,
      guidedSteps: [{ label: "How many shells are in the whole?", answerType: "number", answer: 8 }, { label: "How many are already in the first part?", answerType: "number", answer: 3 }],
    },
    {
      id: "g1-four-paths-twelve", activityKey: "g1-math-four-paths-twelve", grade: "Grade 1", block: "Four Relationships", title: "Four Paths Around Twelve", time: "12 min",
      sourceFocus: "Original Grade 1 simultaneous introduction to addition, subtraction, multiplication, and sharing from one whole.", teacherAim: "Learners see the four operations as related ways of describing one quantity.",
      memoryRefresh: { idea: "One whole number can be described by joining, taking away, making equal groups, or sharing.", method: ["Build the whole with objects.", "Describe one way to split or group it.", "Choose the sign that tells what happened.", "Return to the whole to check."], example: "Twelve is 6 + 6, 15 − 3, 3 groups of 4, and 12 shared into 3 groups of 4." },
      rhythm: ["Join.", "Take away.", "Make equal groups.", "Share equally."], prompt: "Make 12 stones into 3 equal groups. How many stones are in each group?", correction: "Sharing 12 stones equally among 3 groups gives 4 stones in each group.", answerType: "number", answer: 4, tolerance: 0,
      guidedSteps: [{ label: "How many stones are in the whole?", answerType: "number", answer: 12 }, { label: "How many equal groups will you make?", answerType: "number", answer: 3 }],
    },
    {
      id: "g1-addition-gathering", activityKey: "g1-math-addition-gathering", grade: "Grade 1", block: "Four Relationships", title: "Gather Two Groups", time: "10 min",
      sourceFocus: "Original Grade 1 addition lesson grounded in gathering and recounting a whole.", teacherAim: "Learners experience addition as bringing parts together, not merely following a symbol rule.",
      memoryRefresh: { idea: "Addition gathers separate parts into one whole.", method: ["Build the first group.", "Build the second group.", "Bring both groups together.", "Count the new whole."], example: "Four seeds joined with three seeds make a whole of seven seeds." },
      rhythm: ["Build one part.", "Build another part.", "Gather and count."], prompt: "Place 4 buttons on a cloth, then add 3 more. How many buttons are there altogether?", correction: "The parts 4 and 3 join to make the whole 7.", answerType: "number", answer: 7, tolerance: 0,
    },
    {
      id: "g1-subtraction-reveals-part", activityKey: "g1-math-subtraction-reveals-part", grade: "Grade 1", block: "Four Relationships", title: "Reveal the Hidden Part", time: "10 min",
      sourceFocus: "Original Grade 1 subtraction lesson beginning from a known whole.", teacherAim: "Learners experience subtraction as revealing a remaining part of the whole.",
      memoryRefresh: { idea: "Subtraction begins with a whole and reveals what remains after one part leaves.", method: ["Build the whole.", "Move away the named part.", "Count what remains.", "Put the parts together to check."], example: "Nine acorns with four moved away leave five; four and five rebuild nine." },
      rhythm: ["See the whole.", "Move one part.", "Name what remains."], prompt: "Begin with 10 pebbles. Hide 4 under your hand. How many pebbles remain visible?", correction: "The whole 10 separates into 4 hidden and 6 visible. So 10 − 4 = 6.", answerType: "number", answer: 6, tolerance: 0,
    },
    {
      id: "g1-multiplication-equal-groups", activityKey: "g1-math-multiplication-equal-groups", grade: "Grade 1", block: "Four Relationships", title: "Equal Baskets", time: "11 min",
      sourceFocus: "Original Grade 1 multiplication lesson using repeated equal groups.", teacherAim: "Learners meet multiplication as equal groups before memorizing products.",
      memoryRefresh: { idea: "Multiplication describes several equal groups at once.", method: ["Choose the size of one group.", "Build the requested number of equal groups.", "Count by groups or count every object.", "Check that every group is equal."], example: "Three baskets with two apples in each hold six apples altogether." },
      rhythm: ["Same amount in each group.", "Count the groups.", "Count the whole."], prompt: "Make 4 groups with 2 beans in each group. How many beans are there altogether?", correction: "Four equal groups of 2 contain 8 beans: 2 + 2 + 2 + 2 = 8.", answerType: "number", answer: 8, tolerance: 0,
    },
    {
      id: "g1-division-fair-sharing", activityKey: "g1-math-division-fair-sharing", grade: "Grade 1", block: "Four Relationships", title: "Share the Whole Fairly", time: "11 min",
      sourceFocus: "Original Grade 1 division lesson using fair sharing of a whole.", teacherAim: "Learners meet division as distributing a whole into equal parts.",
      memoryRefresh: { idea: "Division shares one whole into equal groups.", method: ["Count the whole collection.", "Give one object to each group in turn.", "Continue until nothing remains.", "Check that every group has the same amount."], example: "Eight berries shared between two bowls give four berries to each bowl." },
      rhythm: ["Begin with the whole.", "Share one by one.", "Check that it is fair."], prompt: "Share 12 counters equally among 4 circles. How many counters go in each circle?", correction: "Sharing one by one gives 3 counters in each of the 4 circles.", answerType: "number", answer: 3, tolerance: 0,
    },
    {
      id: "g1-rhythm-counting-twos", activityKey: "g1-math-rhythm-counting-twos", grade: "Grade 1", block: "Movement and Number", title: "Step the Twos", time: "9 min",
      sourceFocus: "Original Grade 1 rhythmic counting lesson combining movement, sound, and pattern recognition.", teacherAim: "Learners embody repeated groups through stepping and speaking before writing a sequence.",
      memoryRefresh: { idea: "Rhythmic counting lets the body feel equal jumps in a number pattern.", method: ["Take one step for each number.", "Clap only on every second step.", "Say the numbers that receive a clap.", "Notice how the pattern grows."], example: "Clapping every second step names 2, 4, 6, 8, 10." },
      rhythm: ["Step, clap.", "Step, clap.", "Say the even numbers."], prompt: "Count by twos: 2, 4, 6, 8, __. Which number comes next?", correction: "Each number is 2 more than the one before it, so the next number is 10.", answerType: "number", answer: 10, tolerance: 0,
    },
  ];

  const pt = {
    "g1-number-quality-five": { block: "Números Vivos", title: "Onde Mora o Cinco", prompt: "Coloque 5 objetos pequenos à sua frente. Mova 2 para um lado. Quantos ficam do outro lado?", correction: "Cinco pode ser separado em 2 e 3. Se 2 forem movidos, restam 3.", memoryRefresh: { idea: "Um número dá nome a uma quantidade que podemos encontrar, mover, desenhar e organizar de muitas maneiras.", method: ["Encontre cinco coisas ao seu redor.", "Toque ou mova cada coisa enquanto conta.", "Organize as cinco coisas em uma nova forma.", "Só então escreva o algarismo 5."], example: "Cinco pode ser os dedos de uma mão, cinco pedras em roda ou duas pedras ao lado de três." }, rhythm: ["Mostre cinco dedos.", "Dê cinco passos.", "Bata cinco vezes."], guidedSteps: [{ label: "Comece com esta quantidade de objetos.", answerType: "number", answer: 5 }, { label: "Mova esta quantidade para o lado.", answerType: "number", answer: 2 }] },
    "g1-whole-parts-eight": { block: "Todo e Partes", title: "Muitas Maneiras de Fazer Oito", prompt: "Você tem 8 conchas. Coloque 3 em um grupo. Quantas conchas ficam no outro grupo?", correction: "O todo é 8. As partes são 3 e 5, porque 3 + 5 = 8.", memoryRefresh: { idea: "Comece pelo todo. O mesmo todo pode ser separado em partes diferentes.", method: ["Conte a coleção inteira.", "Separe-a em dois grupos.", "Diga as duas partes.", "Junte as partes e confira o todo."], example: "Oito pode ser 1 e 7, 2 e 6, 3 e 5 ou 4 e 4." }, rhythm: ["Veja o todo.", "Abra-o em partes.", "Junte as partes novamente."], guidedSteps: [{ label: "Quantas conchas há no todo?", answerType: "number", answer: 8 }, { label: "Quantas já estão na primeira parte?", answerType: "number", answer: 3 }] },
    "g1-four-paths-twelve": { block: "Quatro Relações", title: "Quatro Caminhos ao Redor do Doze", prompt: "Organize 12 pedras em 3 grupos iguais. Quantas pedras ficam em cada grupo?", correction: "Dividir 12 pedras igualmente em 3 grupos dá 4 pedras em cada grupo.", memoryRefresh: { idea: "Um número inteiro pode ser descrito juntando, retirando, fazendo grupos iguais ou repartindo.", method: ["Construa o todo com objetos.", "Descreva uma maneira de separá-lo ou agrupá-lo.", "Escolha o sinal que conta o que aconteceu.", "Volte ao todo para conferir."], example: "Doze é 6 + 6, 15 − 3, 3 grupos de 4 e 12 dividido em 3 grupos de 4." }, rhythm: ["Junte.", "Retire.", "Faça grupos iguais.", "Reparta igualmente."], guidedSteps: [{ label: "Quantas pedras há no todo?", answerType: "number", answer: 12 }, { label: "Quantos grupos iguais você fará?", answerType: "number", answer: 3 }] },
    "g1-addition-gathering": { block: "Quatro Relações", title: "Junte Dois Grupos", prompt: "Coloque 4 botões sobre um pano e depois acrescente mais 3. Quantos botões há ao todo?", correction: "As partes 4 e 3 se juntam para formar o todo 7.", memoryRefresh: { idea: "A adição reúne partes separadas em um só todo.", method: ["Monte o primeiro grupo.", "Monte o segundo grupo.", "Junte os dois grupos.", "Conte o novo todo."], example: "Quatro sementes junto com três sementes formam um todo de sete sementes." }, rhythm: ["Monte uma parte.", "Monte outra parte.", "Junte e conte."] },
    "g1-subtraction-reveals-part": { block: "Quatro Relações", title: "Revele a Parte Escondida", prompt: "Comece com 10 pedrinhas. Esconda 4 sob a mão. Quantas continuam visíveis?", correction: "O todo 10 se separa em 4 escondidas e 6 visíveis. Portanto, 10 − 4 = 6.", memoryRefresh: { idea: "A subtração começa com um todo e revela o que resta depois que uma parte sai.", method: ["Monte o todo.", "Afaste a parte indicada.", "Conte o que restou.", "Junte as partes para conferir."], example: "Nove sementes com quatro afastadas deixam cinco; quatro e cinco reconstroem nove." }, rhythm: ["Veja o todo.", "Mova uma parte.", "Diga o que restou."] },
    "g1-multiplication-equal-groups": { block: "Quatro Relações", title: "Cestos Iguais", prompt: "Faça 4 grupos com 2 feijões em cada grupo. Quantos feijões há ao todo?", correction: "Quatro grupos iguais de 2 contêm 8 feijões: 2 + 2 + 2 + 2 = 8.", memoryRefresh: { idea: "A multiplicação descreve vários grupos iguais de uma só vez.", method: ["Escolha o tamanho de um grupo.", "Monte a quantidade pedida de grupos iguais.", "Conte por grupos ou conte todos os objetos.", "Confira se todos os grupos são iguais."], example: "Três cestos com duas maçãs em cada um têm seis maçãs ao todo." }, rhythm: ["A mesma quantidade em cada grupo.", "Conte os grupos.", "Conte o todo."] },
    "g1-division-fair-sharing": { block: "Quatro Relações", title: "Reparta o Todo com Justiça", prompt: "Reparta 12 fichas igualmente entre 4 círculos. Quantas fichas ficam em cada círculo?", correction: "Repartindo uma a uma, cada um dos 4 círculos recebe 3 fichas.", memoryRefresh: { idea: "A divisão reparte um todo em grupos iguais.", method: ["Conte a coleção inteira.", "Dê um objeto de cada vez a cada grupo.", "Continue até não sobrar nenhum.", "Confira se todos os grupos têm a mesma quantidade."], example: "Oito frutas repartidas entre duas tigelas dão quatro frutas para cada tigela." }, rhythm: ["Comece pelo todo.", "Reparta uma a uma.", "Confira se ficou justo."] },
    "g1-rhythm-counting-twos": { block: "Movimento e Número", title: "Caminhe de Dois em Dois", prompt: "Conte de dois em dois: 2, 4, 6, 8, __. Qual é o próximo número?", correction: "Cada número é 2 a mais que o anterior; portanto, o próximo é 10.", memoryRefresh: { idea: "A contagem rítmica permite que o corpo sinta saltos iguais em um padrão numérico.", method: ["Dê um passo para cada número.", "Bata palmas somente a cada segundo passo.", "Diga os números que recebem uma palma.", "Observe como o padrão cresce."], example: "Bater palmas a cada segundo passo marca 2, 4, 6, 8, 10." }, rhythm: ["Passo, palma.", "Passo, palma.", "Diga os números pares."] },
  };

  const practiceEn = {
    "g1-number-quality-five": { prompt: "Try it: split 5 objects into a group of 1 and another group. How many are in the other group?", answerType: "number", answer: 4, tolerance: 0, steps: ["Begin with the whole 5.", "Move 1 aside; 4 remain."] },
    "g1-whole-parts-eight": { prompt: "Try it: make 8 with a part of 2. What is the other part?", answerType: "number", answer: 6, tolerance: 0, steps: ["Begin with 8.", "8 separates into 2 and 6."] },
    "g1-four-paths-twelve": { prompt: "Try it: make 12 into 2 equal groups. How many are in each?", answerType: "number", answer: 6, tolerance: 0, steps: ["Share 12 between 2 groups.", "Each group receives 6."] },
    "g1-addition-gathering": { prompt: "Try it: gather 5 stones and 4 stones. How many altogether?", answerType: "number", answer: 9, tolerance: 0, steps: ["Join both parts.", "5 + 4 = 9."] },
    "g1-subtraction-reveals-part": { prompt: "Try it: begin with 9 and move 3 away. How many remain?", answerType: "number", answer: 6, tolerance: 0, steps: ["Begin with the whole 9.", "Move 3; count the remaining 6."] },
    "g1-multiplication-equal-groups": { prompt: "Try it: make 3 groups of 3. How many altogether?", answerType: "number", answer: 9, tolerance: 0, steps: ["Build three equal groups.", "3 + 3 + 3 = 9."] },
    "g1-division-fair-sharing": { prompt: "Try it: share 10 equally between 2 groups. How many in each?", answerType: "number", answer: 5, tolerance: 0, steps: ["Share one by one.", "Each group receives 5."] },
    "g1-rhythm-counting-twos": { prompt: "Try it: 4, 6, 8, 10, __. What comes next?", answerType: "number", answer: 12, tolerance: 0, steps: ["Keep the jump of 2.", "10 + 2 = 12."] },
  };

  const practicePt = {
    "g1-number-quality-five": { prompt: "Tente: separe 5 objetos em um grupo de 1 e outro grupo. Quantos ficam no outro grupo?", answerType: "number", answer: 4, tolerance: 0, steps: ["Comece com o todo 5.", "Afaste 1; restam 4."] },
    "g1-whole-parts-eight": { prompt: "Tente: forme 8 com uma parte de 2. Qual é a outra parte?", answerType: "number", answer: 6, tolerance: 0, steps: ["Comece com 8.", "8 se separa em 2 e 6."] },
    "g1-four-paths-twelve": { prompt: "Tente: separe 12 em 2 grupos iguais. Quantos ficam em cada um?", answerType: "number", answer: 6, tolerance: 0, steps: ["Reparta 12 entre 2 grupos.", "Cada grupo recebe 6."] },
    "g1-addition-gathering": { prompt: "Tente: junte 5 pedras com 4 pedras. Quantas há ao todo?", answerType: "number", answer: 9, tolerance: 0, steps: ["Junte as duas partes.", "5 + 4 = 9."] },
    "g1-subtraction-reveals-part": { prompt: "Tente: comece com 9 e afaste 3. Quantas restam?", answerType: "number", answer: 6, tolerance: 0, steps: ["Comece com o todo 9.", "Afaste 3 e conte as 6 restantes."] },
    "g1-multiplication-equal-groups": { prompt: "Tente: faça 3 grupos de 3. Quantos há ao todo?", answerType: "number", answer: 9, tolerance: 0, steps: ["Monte três grupos iguais.", "3 + 3 + 3 = 9."] },
    "g1-division-fair-sharing": { prompt: "Tente: reparta 10 igualmente entre 2 grupos. Quantos ficam em cada um?", answerType: "number", answer: 5, tolerance: 0, steps: ["Reparta um a um.", "Cada grupo recebe 5."] },
    "g1-rhythm-counting-twos": { prompt: "Tente: 4, 6, 8, 10, __. Qual é o próximo?", answerType: "number", answer: 12, tolerance: 0, steps: ["Mantenha o salto de 2.", "10 + 2 = 12."] },
  };

  lessons.unshift(...grade1Lessons);
  Object.assign(translations, pt);
  Object.assign(bank.en, practiceEn);
  Object.assign(bank.pt, practicePt);
})();
