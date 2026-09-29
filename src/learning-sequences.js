// Original bilingual teaching sequences. Each pair is [English, Portuguese].
(() => {
  const stages = { introduction: ["Introduction", "Introdução"], practice: ["Practice", "Prática"], transfer: ["Apply and explain", "Aplique e explique"] };
  const answerConfig = value => typeof value === 'number'
    ? { answerType: 'number', answer: value, tolerance: 0.000001 }
    : { answerType: 'expression', ...value };
  window.addLearningSequence = (grade, block, pages, entries) => {
    for (const entry of entries) {
      const id = `g${grade}-${entry.key}`;
      const localize = (language) => ({
        title: entry.title[language], block: block[language],
        teacherAim: entry.idea[language], teacherObservation: entry.observe[language],
        learningStage: stages[entry.stage || "introduction"][language],
        warmup: entry.warmup.map(pair => pair[language]),
        rhythm: entry.warmup.map(pair => pair[language]),
        discoveryPrompt: entry.invite[language], reflectionPrompt: (entry.reflection || entry.observe)[language],
        storyModel: { hook: entry.invite[language], materials: entry.materials[language], actions: entry.actions.map(pair => pair[language]), observe: (entry.notice || ["Before calculating, predict what will change and what will stay the same. Use the materials to explain your prediction.", "Antes de calcular, preveja o que vai mudar e o que continuará igual. Use os materiais para explicar sua previsão."])[language] },
        prompt: entry.question[language], correction: entry.solution[language],
        memoryRefresh: { idea: entry.idea[language], method: entry.method.map(pair => pair[language]), example: entry.example[language] },
        tutorMistake: entry.mistake[language], tutorCheck: (entry.notice || entry.mistake)[language],
        guidedSteps: entry.guided.map(([en, pt, answer]) => ({ label: language ? pt : en, answer, answerType: "number", tolerance: 0.000001 }))
      });
      window.lessons.push({
        id, activityKey: `g${grade}-math-${entry.key}`, grade: `Grade ${grade}`, time: grade <= 2 ? "10–15 min" : "15–25 min",
        sourceFocus: `Original sequence informed by Ron Jarman (2020), supplied PDF pages ${pages}.`,
        sequenceLesson: true, curatedPracticeOnly: true, recallIds: entry.recall || [],
        ...localize(0), ...answerConfig(entry.answer),
      });
      window.lessonTranslations[id] = localize(1);
      for (const [language, code] of [[0, "en"], [1, "pt"]]) {
        window.extraPracticeBank[code][id] = entry.practice.map(([en, pt, answer, enSolution, ptSolution], index) => ({
          prompt: language ? pt : en, ...answerConfig(answer),
          role: ["practiceCore", "practiceTransfer", "practiceReview"][index],
          hint: index === 2
            ? ["Recall the earlier relationship in this question. Use a drawing or an inverse operation to check your reasoning.", "Retome a relação anterior desta pergunta. Use um desenho ou uma operação inversa para conferir seu raciocínio."][language]
            : entry.mistake[language],
          steps: [language ? ptSolution : enSolution]
        }));
      }
    }
  };
})();
