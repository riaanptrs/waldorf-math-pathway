import {
  PRIVACY_VERSION,
  TERMS_VERSION,
  ensureGuardianSetup,
  schoolYearLabel,
  supabase,
  translateAuthError,
} from "../assets/supabase-client.js";

const lessons = window.lessons;
const lessonTranslations = window.lessonTranslations || {};
const lessonWorkedSteps = window.lessonWorkedSteps || {};
const extraPracticeBank = window.extraPracticeBank || {};
const arithmeticReviewSheets = window.arithmeticReviewSheets || [];
const mentalTrickGuides = window.mentalTrickGuides || { grade6: [], grade7: [] };
const sharedDbShape = window.sharedDbShape;
const list = document.querySelector(".lesson-list");
const reviewSheetList = document.querySelector(".review-sheet-list");
const reviewSheetNumber = document.querySelector(".review-sheet__number");
const reviewSheetTitle = document.querySelector(".review-sheet__title");
const reviewSheetFocus = document.querySelector(".review-sheet__focus");
const reviewProblemList = document.querySelector(".review-problem-list");
const trickGradeTabs = document.querySelector(".trick-grade-tabs");
const trickList = document.querySelector(".trick-list");
const trickDetail = document.querySelector(".trick-detail");
const grade = document.querySelector(".exercise__grade");
const title = document.querySelector(".exercise__title");
const time = document.querySelector(".exercise__time");
const prompt = document.querySelector(".exercise__prompt");
const body = document.querySelector(".exercise__body");
const form = document.querySelector(".answer-form");
const answerQuestion = document.querySelector(".answer-form__question");
const answer = document.querySelector("#answer");
const answerLabel = document.querySelector('label[for="answer"]');
const feedback = document.querySelector(".feedback");
const authForm = document.querySelector(".auth-form");
const authMode = document.querySelector("#auth-mode");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const learnerNicknameInput = document.querySelector("#student-link");
const languageInput = document.querySelector("#language");
const accountStatus = document.querySelector(".account-status");
const learnerName = document.querySelector(".learner-name");
const parentDashboard = document.querySelector(".parent-dashboard");
const progressList = document.querySelector(".progress-list");
const correction = document.querySelector(".correction");
const attemptTools = document.querySelector(".attempt-tools");
const dbBadge = document.querySelector(".db-badge");
const signOutButton = document.querySelector(".sign-out");
const lessonCount = document.querySelector(".lesson-count");
const previousButton = document.querySelector(".lesson-prev");
const nextButton = document.querySelector(".lesson-next");
const gradeFilter = document.querySelector(".grade-filter");

const ACTIVE_LEARNER_KEY = "wep:active-learner";
const LOCAL_PROGRESS_KEY = "waldorf-math:local-progress:v2";
const LANGUAGE_KEY = "waldorf-math:language";

const copy = {
  pt: {
    brand: "Trilha de Matemática Waldorf",
    navAccount: "Conta",
    navPractice: "Praticar",
    navArithmeticReview: "Revisão",
    navMentalTricks: "Dicas",
    navRhythm: "Ritmo",
    navParent: "Notas para os pais",
    heroEyebrow: "Prática online de matemática do 5º ao 9º ano",
    heroTitle: "Um caminho vivo por medida, dinheiro, porcentagens, razões, geometria e álgebra.",
    heroCopy:
      "Uma trilha de aulas do 5º ao 9º ano com aritmética prática, medida, geometria, matemática financeira, frações, decimais, razões, números com sinal, fórmulas, Teorema de Pitágoras, crescimento, funções e álgebra. Os estudantes completam passos visíveis, corrigem o próprio trabalho e salvam o progresso para revisão dos pais.",
    heroButton: "Começar a praticar",
    introEyebrow: "Primeiro passo",
    introTitle: "Agora com blocos do 5º ao 9º ano",
    introCopy:
      "Esta trilha de matemática adapta blocos Waldorf em atividades online originais: no 5º ano, frações decimais, medidas e geometria à mão livre; no 6º ano, matemática financeira, descontos, orçamento e geometria precisa; no 7º ano, revisão aritmética, razões e álgebra inicial; no 8º ano, bases numéricas, Pitágoras, crescimento, proporções, mensuração e estereometria inicial; no 9º ano, álgebra I, funções, radicais, sistemas e modelos de crescimento.",
    accountEyebrow: "Cadastro compartilhado",
    accountTitle: "Entrar ou cadastrar",
    modeLabel: "Modo",
    modeLogin: "Entrar",
    modeRegister: "Cadastrar",
    emailLabel: "Email do responsável",
    passwordLabel: "Senha",
    learnerLabel: "Apelido do estudante",
    languageLabel: "Idioma do estudante",
    continueButton: "Continuar",
    currentLearnerEyebrow: "Estudante atual",
    signOut: "Sair",
    practiceEyebrow: "Sala de prática",
    practiceTitle: "Escolha a atividade de hoje",
    gradeFilterLabel: "Escolha o ano",
    allGrades: "Todos os anos",
    pathWarmup: "Aquecer",
    pathDiscover: "Descobrir",
    pathPractice: "Praticar",
    pathCheck: "Conferir",
    pathReflect: "Refletir",
    discoveryTitle: "Descubra antes de receber o método",
    discoveryCopy: "Leia a situação, faça uma estimativa e experimente um caminho próprio. Você pode abrir apoio se ficar preso.",
    supportSummary: "Preciso de uma lembrança ou exemplo",
    guidedSupportSummary: "Quero resolver com passos guiados",
    hintTitle: (attempt) => `Apoio ${attempt} de 3`,
    hintNotice: "Primeiro, observe isto:",
    hintMethod: "Agora experimente este caminho:",
    hintGuide: "Use os passos guiados e tente uma conta parecida antes de ver a resposta.",
    reflectionTitle: "Feche a aula com suas palavras",
    reflectionPrompt: "O que ajudou você a saber que a resposta fazia sentido? Diga em voz alta ou escreva no caderno.",
    arithmeticReviewEyebrow: "Revisão aritmética",
    arithmeticReviewTitle: "Folhas de revisão com explicação guiada",
    arithmeticReviewIntro:
      "Pratique frações, decimais, divisão, conversões e cálculo mental. Cada resposta pode ser conferida com passos.",
    mentalTricksEyebrow: "Dicas de cálculo mental",
    mentalTricksTitle: "Truques guiados do 6º e 7º ano",
    mentalTricksIntro:
      "Escolha uma dica, veja o exemplo passo a passo, entenda por que funciona e tente uma conta parecida.",
    grade6Tricks: "6º ano",
    grade7Tricks: "7º ano",
    trickExample: "Exemplo",
    trickSteps: "Passo a passo",
    trickWhy: "Por que funciona",
    trickPractice: "Tente você",
    trickShowAnswer: "Ver resposta guiada",
    trickHideAnswer: "Esconder resposta",
    trickAnswer: "Resposta guiada",
    reviewSheetLabel: (number) => `Folha ${number}`,
    reviewProblemLabel: (number) => `Exercício ${number}`,
    reviewCheck: "Verificar",
    reviewTryAgain: "Tentar de novo",
    reviewShowGuide: "Ver explicação guiada",
    reviewCorrect: "Correto.",
    reviewTry: "Ainda não. Tente de novo ou veja a explicação guiada.",
    previousButton: "Anterior",
    nextButton: "Próxima",
    checkButton: "Verificar",
    rhythmEyebrow: "Ritmo diário",
    rhythmTitle: "Aquecimento antes da tela",
    rhythmStep1: "Estime antes de calcular.",
    rhythmStep2: "Nomeie a operação com suas próprias palavras.",
    rhythmStep3: "Resolva um problema prático devagar.",
    rhythmStep4: "Explique como você conferiu a resposta.",
    parentEyebrow: "Notas para os pais",
    parentTitle: "Progresso e notas do plano de aulas",
    dashboardTitle: "Progresso em matemática dos estudantes vinculados",
    note1Title: "Extração das lições",
    note1Copy:
      "Os tópicos do 5º ao 9º ano são organizados a partir de objetivos Waldorf de matemática, depois reescritos como lições online originais com passos verificáveis e gabaritos.",
    note2Title: "Ciclo de correção",
    note2Copy:
      "Respostas incorretas mostram uma dica de correção e ficam marcadas para revisão até que o estudante envie uma resposta correta.",
    note3Title: "Banco compartilhado",
    note3Copy:
      "Matemática usa a mesma conta Supabase do responsável, registros de estudantes, respostas objetivas e tabelas de progresso de atividades da Waldorf English Pathway.",
    footerCopy:
      "Trilha de Matemática Waldorf é um projeto independente de aprendizagem, com atividades originais adaptadas de referências curriculares próprias.",
    lessonCount: (count) => `${count} atividades de matemática disponíveis`,
    stateCorrect: "Feita",
    stateReview: "Revisar",
    stateOpen: "Abrir",
    questionLabel: "Pergunta",
    answerPromptLabel: "Responda à pergunta:",
    tutorTitle: "Tutor rápido",
    tutorIntro: "Leia em um minuto, depois resolva com passos visíveis.",
    tutorWarmMemory: "1. Lembre",
    tutorWorkedExample: "2. Veja",
    tutorGuidedTry: "3. Tente guiado",
    tutorQuickCheck: "4. Confira",
    tutorDeepDive: "Explicação curta, mas completa",
    tutorCommonMistake: "Erro comum",
    tutorCheckAnswer: "Como conferir",
    tutorRhythm: "Ritmo de trabalho",
    tutorNoGuidedSteps: "Use o ritmo abaixo como seus passos. Diga cada passo antes de calcular.",
    refresherTitle: "Precisa relembrar?",
    refresherMethod: "Método",
    workedTitle: "Como resolver esta conta, passo por passo",
    refresherExample: "Exemplo rápido",
    showSteps: "Mostre os passos",
    finalAnswer: "Resposta final depois dos passos",
    yourAnswer: "Sua resposta",
    expressionPlaceholder: "Exemplo: 10k - 14",
    numberPlaceholder: "Digite um número",
    stepCorrect: "Correto.",
    stepReview: "Revise este passo antes de continuar.",
    stepReviewWithAnswer: "Revise. Resposta correta:",
    noLearner: "Nenhum estudante está vinculado a esta conta de responsável ainda.",
    guestLearner: "Estudante visitante",
    guardianAccount: "Conta do responsável",
    signInPrompt: "Entre com o mesmo e-mail e senha de responsável usados na Waldorf English Pathway.",
    cloudActive: (name) => `Sincronização em nuvem ativa para ${name}. Este é o mesmo registro de estudante usado pela Waldorf English Pathway.`,
    noLinkedLearner: "Conta do responsável encontrada, mas nenhum estudante está vinculado ainda. Cadastre com um apelido de estudante para adicionar um.",
    progressSuffix: (correct, total) => `${correct}/${total} atividades de matemática corretas`,
    emptyAnswer: "Digite uma resposta primeiro.",
    cloudCorrect: (name) => `Correto. Salvo no portfólio compartilhado de ${name}.`,
    localCorrect: "Correto. Salvo neste dispositivo. Entre na conta para salvar no portfólio compartilhado.",
    catalogPendingCorrect: "Correto. Salvo neste dispositivo; a sincronização em nuvem desta lição será ativada após atualizar o catálogo.",
    cloudTry: "Precisa de correção. Salvo para revisão no portfólio compartilhado. Você pode tentar de novo ou abrir a resposta guiada.",
    localTry: "Precisa de correção. Salvo neste dispositivo. Você pode tentar de novo ou abrir a resposta guiada.",
    catalogPendingTry: "Precisa de correção. Salvo neste dispositivo; a sincronização em nuvem desta lição será ativada após atualizar o catálogo.",
    tryAgainButton: "Tentar de novo",
    guidedAnswerButton: "Ver resposta guiada",
    guidedAnswerTitle: "Resposta guiada",
    correctAnswerLabel: "Resposta correta",
    mathTipTitle: "Dica de cálculo mental",
    extraPracticeTitle: "Treino extra",
    extraPracticeIntro: "Tente mais algumas contas parecidas para firmar o caminho.",
    extraAnswerLabel: "Resposta do treino extra",
    checkExtraButton: "Verificar treino",
    extraCorrect: "Correto. Agora volte para a atividade principal.",
    extraTry: "Ainda não. Veja o caminho guiado abaixo e tente a atividade principal outra vez.",
    saveFailed: (message) => `A resposta foi verificada, mas o salvamento na nuvem falhou: ${message}`,
    enterCredentials: "Digite o e-mail do responsável e a senha.",
    signingIn: "Entrando pelo banco Waldorf compartilhado...",
    enterNickname: "Digite um apelido do estudante para o portfólio compartilhado.",
    creatingAccount: "Criando a conta compartilhada do responsável...",
    accountCreated: "Conta criada. Confirme o e-mail e depois entre aqui com a mesma conta Waldorf.",
  },
  en: {
    brand: "Waldorf Math Pathway",
    navAccount: "Accounts",
    navPractice: "Practice",
    navArithmeticReview: "Review",
    navMentalTricks: "Tips",
    navRhythm: "Rhythm",
    navParent: "Parent Notes",
    heroEyebrow: "Grade 5 through 9 online math practice",
    heroTitle: "A living path through measure, money, percentages, ratios, geometry, and algebra.",
    heroCopy:
      "A Grade 5 through 9 lesson path with practical arithmetic, measure, geometry, business math, fractions, decimals, ratios, signed numbers, formulas, Pythagorean theorem, growth, functions, and algebra. Students complete visible steps, self-correct, and save their work for parent review.",
    heroButton: "Begin Practice",
    introEyebrow: "Step one",
    introTitle: "Now with Grade 5 through Grade 9 blocks",
    introCopy:
      "This math path adapts Waldorf math blocks into original online activities: Grade 5 decimal fractions, measurement, and freehand geometry; Grade 6 business math, discounts, budgeting, and precise geometry; Grade 7 arithmetic review, ratios, and early algebra; Grade 8 number bases, Pythagoras, growth, proportions, mensuration, and early stereometry; Grade 9 Algebra I, functions, radicals, systems, and growth models.",
    accountEyebrow: "Shared registration",
    accountTitle: "Sign in or register",
    modeLabel: "Mode",
    modeLogin: "Sign in",
    modeRegister: "Register",
    emailLabel: "Guardian email",
    passwordLabel: "Password",
    learnerLabel: "Learner nickname",
    languageLabel: "Learner language",
    continueButton: "Continue",
    currentLearnerEyebrow: "Current learner",
    signOut: "Sign out",
    practiceEyebrow: "Lesson studio",
    practiceTitle: "Choose today's activity",
    gradeFilterLabel: "Choose a grade",
    allGrades: "All grades",
    pathWarmup: "Warm up",
    pathDiscover: "Discover",
    pathPractice: "Practice",
    pathCheck: "Check",
    pathReflect: "Reflect",
    discoveryTitle: "Discover before receiving the method",
    discoveryCopy: "Read the situation, make an estimate, and try your own path. Open support if you become stuck.",
    supportSummary: "I need a reminder or example",
    guidedSupportSummary: "I want to solve with guided steps",
    hintTitle: (attempt) => `Support ${attempt} of 3`,
    hintNotice: "First, notice this:",
    hintMethod: "Now try this path:",
    hintGuide: "Use the guided steps and try a similar problem before seeing the answer.",
    reflectionTitle: "Close the lesson in your own words",
    reflectionPrompt: "What helped you know that your answer made sense? Say it aloud or write it in your notebook.",
    arithmeticReviewEyebrow: "Arithmetic review",
    arithmeticReviewTitle: "Review sheets with guided explanations",
    arithmeticReviewIntro:
      "Practice fractions, decimals, division, conversions, and mental arithmetic. Every answer can be checked with steps.",
    mentalTricksEyebrow: "Mental math tips",
    mentalTricksTitle: "Guided Grade 6 and 7 tricks",
    mentalTricksIntro:
      "Choose a tip, see the example step by step, understand why it works, and try a similar calculation.",
    grade6Tricks: "Grade 6",
    grade7Tricks: "Grade 7",
    trickExample: "Example",
    trickSteps: "Step by step",
    trickWhy: "Why it works",
    trickPractice: "Try it",
    trickShowAnswer: "See guided answer",
    trickHideAnswer: "Hide answer",
    trickAnswer: "Guided answer",
    reviewSheetLabel: (number) => `Sheet ${number}`,
    reviewProblemLabel: (number) => `Problem ${number}`,
    reviewCheck: "Check",
    reviewTryAgain: "Try again",
    reviewShowGuide: "See guided explanation",
    reviewCorrect: "Correct.",
    reviewTry: "Not yet. Try again or open the guided explanation.",
    previousButton: "Previous",
    nextButton: "Next",
    checkButton: "Check",
    rhythmEyebrow: "Daily rhythm",
    rhythmTitle: "Warm up before the screen",
    rhythmStep1: "Estimate before calculating.",
    rhythmStep2: "Name the operation in your own words.",
    rhythmStep3: "Solve one practical problem slowly.",
    rhythmStep4: "Explain how you checked your answer.",
    parentEyebrow: "Parent notes",
    parentTitle: "Progress and lesson plan notes",
    dashboardTitle: "Math progress for linked learners",
    note1Title: "Lesson extraction",
    note1Copy:
      "Grade 5 through 9 topics are sequenced from Waldorf math goals, then rewritten as original online lessons with checkable steps and answer keys.",
    note2Title: "Correction loop",
    note2Copy:
      "Incorrect answers reveal a correction hint and remain marked for review until the student submits a correct answer.",
    note3Title: "Shared database shape",
    note3Copy:
      "Math uses the same Supabase guardian account, learner records, objective responses, and activity progress tables as Waldorf English Pathway.",
    footerCopy:
      "Waldorf Math Pathway is an independent learning project with original activities adapted from owned curriculum references.",
    lessonCount: (count) => `${count} math activities available`,
    stateCorrect: "Done",
    stateReview: "Review",
    stateOpen: "Open",
    questionLabel: "Question",
    answerPromptLabel: "Answer this question:",
    tutorTitle: "Quick tutor",
    tutorIntro: "Read this in one minute, then solve with visible steps.",
    tutorWarmMemory: "1. Remember",
    tutorWorkedExample: "2. See it",
    tutorGuidedTry: "3. Guided try",
    tutorQuickCheck: "4. Check",
    tutorDeepDive: "Short but complete explanation",
    tutorCommonMistake: "Common mistake",
    tutorCheckAnswer: "How to check",
    tutorRhythm: "Work rhythm",
    tutorNoGuidedSteps: "Use the rhythm below as your steps. Say each step before calculating.",
    refresherTitle: "Need a refresher?",
    refresherMethod: "Method",
    workedTitle: "How to solve this, step by step",
    refresherExample: "Quick example",
    showSteps: "Show the steps",
    finalAnswer: "Final answer after the steps",
    yourAnswer: "Your answer",
    expressionPlaceholder: "Example: 10k - 14",
    numberPlaceholder: "Enter a number",
    stepCorrect: "Correct.",
    stepReview: "Review this step before continuing.",
    stepReviewWithAnswer: "Review. Correct answer:",
    noLearner: "No learner is linked to this guardian account yet.",
    guestLearner: "Guest learner",
    guardianAccount: "Guardian account",
    signInPrompt: "Sign in with the same guardian email and password used for Waldorf English Pathway.",
    cloudActive: (name) => `Cloud sync active for ${name}. This is the same learner record used by Waldorf English Pathway.`,
    noLinkedLearner: "Guardian account found, but no learner is linked yet. Register with a learner nickname to add one.",
    progressSuffix: (correct, total) => `${correct}/${total} math activities correct`,
    emptyAnswer: "Try entering an answer first.",
    cloudCorrect: (name) => `Correct. Saved to ${name}'s shared portfolio.`,
    localCorrect: "Correct. Saved on this device. Sign in to save it to the shared portfolio.",
    catalogPendingCorrect: "Correct. Saved on this device; cloud sync for this lesson will turn on after the catalogue is updated.",
    cloudTry: "Needs correction. Saved for review in the shared portfolio. You can try again or open the guided answer.",
    localTry: "Needs correction. Saved on this device. You can try again or open the guided answer.",
    catalogPendingTry: "Needs correction. Saved on this device; cloud sync for this lesson will turn on after the catalogue is updated.",
    tryAgainButton: "Try again",
    guidedAnswerButton: "See guided answer",
    guidedAnswerTitle: "Guided answer",
    correctAnswerLabel: "Correct answer",
    mathTipTitle: "Mental math tip",
    extraPracticeTitle: "Extra practice",
    extraPracticeIntro: "Try a few more similar problems to make the method steady.",
    extraAnswerLabel: "Extra practice answer",
    checkExtraButton: "Check practice",
    extraCorrect: "Correct. Now return to the main activity.",
    extraTry: "Not yet. Read the guided path below, then try the main activity again.",
    saveFailed: (message) => `The answer was checked, but cloud saving failed: ${message}`,
    enterCredentials: "Enter the guardian email and password.",
    signingIn: "Signing in through the shared Waldorf database...",
    enterNickname: "Enter a learner nickname for the shared portfolio.",
    creatingAccount: "Creating the shared guardian account...",
    accountCreated: "Account created. Confirm the email, then sign in here with the same Waldorf account.",
  },
};

let activeLesson = lessons[0];
let currentUser = null;
let learners = [];
let activeLearnerId = null;
let objectiveResponses = [];
let activityProgress = [];
let language = localStorage.getItem(LANGUAGE_KEY) || "pt";
let activeReviewSheetId = arithmeticReviewSheets[0]?.id || null;
let activeTrickGrade = "grade6";
let activeTrickId = mentalTrickGuides.grade6?.[0]?.id || null;
let selectedGrade = "all";
const lessonAttempts = new Map();

function t(key, ...args) {
  const value = copy[language][key];
  return typeof value === "function" ? value(...args) : value;
}

function lessonCopy(lesson) {
  const localizedLesson = language === "pt" ? { ...lesson, ...(lessonTranslations[lesson.id] || {}) } : lesson;
  const workedSteps = lessonWorkedSteps[language]?.[lesson.id] || localizedLesson.memoryRefresh?.workedSteps;
  const mathTip = window.lessonMathTips?.[language]?.[lesson.id] || window.lessonMathTips?.en?.[lesson.id] || null;
  return {
    ...localizedLesson,
    mathTip,
    memoryRefresh: localizedLesson.memoryRefresh
      ? {
          ...localizedLesson.memoryRefresh,
          workedSteps,
        }
      : null,
  };
}

function extraPracticeFor(lesson) {
  const bank = extraPracticeBank[language] || extraPracticeBank.en || {};
  const items = [];
  const addPractice = (candidate) => {
    const practice = bank[candidate.id] || extraPracticeBank.en?.[candidate.id] || null;
    if (!practice) return;
    const entries = Array.isArray(practice) ? practice : [practice];
    entries.forEach((entry) => {
      if (items.length < 5 && !items.some((item) => item.prompt === entry.prompt)) items.push(entry);
    });
  };

  addPractice(lesson);
  lessons
    .filter((candidate) => candidate.id !== lesson.id && candidate.grade === lesson.grade && candidate.block === lesson.block)
    .forEach(addPractice);
  return items;
}

function availableGrades() {
  return [...new Set(lessons.map((lesson) => lesson.grade))];
}

function filteredLessons() {
  return selectedGrade === "all" ? lessons : lessons.filter((lesson) => lesson.grade === selectedGrade);
}

function renderGradeFilter() {
  if (!gradeFilter) return;
  gradeFilter.innerHTML = [
    `<option value="all">${t("allGrades")}</option>`,
    ...availableGrades().map((item) => `<option value="${item}">${item}</option>`),
  ].join("");
  gradeFilter.value = selectedGrade;
}

function applyLanguage() {
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.title = language === "pt" ? "Trilha de Matemática Waldorf" : "Waldorf Math Pathway";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      language === "pt"
        ? "Um percurso de matemática Waldorf para 5º ao 9º ano, com exercícios online sobre frações decimais, medida, matemática financeira, porcentagens, razões, números negativos, geometria, funções e álgebra."
        : "A Waldorf-inspired Grade 5 through 9 math path with online exercises for decimal fractions, measurement, business math, percentages, ratios, negative numbers, geometry, functions, and algebra.",
    );
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  languageInput.value = language;
  authForm.dataset.language = language;
  window.dispatchEvent(new CustomEvent("waldorf-language-change", { detail: language }));
}

function readLocalProgress() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_PROGRESS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeLocalProgress(rows) {
  localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(rows));
}

function activeLearner() {
  return learners.find((learner) => learner.id === activeLearnerId) || null;
}

function setAccountStatus(message, type = "") {
  accountStatus.textContent = message;
  accountStatus.dataset.state = type;
}

function normalizeExpression(value) {
  return value.toLowerCase().replace(/,/g, ".").replace(/\s+/g, "").replace(/\*/g, "");
}

function checkValue(config, rawValue) {
  if (config.answerType === "expression") {
    const normalized = normalizeExpression(rawValue);
    return config.acceptedAnswers.some((accepted) => normalizeExpression(accepted) === normalized);
  }

  const value = Number(rawValue.replace(",", "."));
  if (Number.isNaN(value)) return false;
  return Math.abs(value - config.answer) <= (config.tolerance ?? 0);
}

function checkAnswer(lesson, rawValue) {
  return checkValue(lesson, rawValue);
}

function correctAnswerText(config) {
  if (config.acceptedAnswers?.length) return config.acceptedAnswers[0];
  return String(config.answer);
}

function renderSteps(steps) {
  return steps?.length
    ? `<ol class="worked-steps">${steps.map((step) => `<li>${step}</li>`).join("")}</ol>`
    : "";
}

const tutorSupport = {
  pt: [
    {
      test: /percent|porcent|discount|desconto|interest|juros|growth|crescimento|profit|lucro|budget|orçamento|business|financeira/,
      mistake: "Não misture o valor original, a porcentagem e o resultado. Primeiro encontre a parte percentual, depois decida se deve somar ou subtrair.",
      check: "Compare com 10%, 50% ou 100%. Se a resposta ficar maior ou menor do que esses marcos permitem, revise.",
    },
    {
      test: /fraction|fração|frações|decimal|decim|repeating|dízima|radical|raiz/,
      mistake: "Não trate numerador, denominador e casas decimais como etiquetas soltas. Eles sempre dizem o tamanho das partes.",
      check: "Estime o tamanho: a resposta deve ser menor, maior ou próxima de 1? Depois confira reduzindo ou convertendo.",
    },
    {
      test: /ratio|razão|proportion|propor|rate|taxa|speed|velocidade|scale|escala|unit cost|custo unitário|dimensional/,
      mistake: "Não compare quantidades diferentes sem transformar para a mesma unidade ou para a mesma parte.",
      check: "Escreva as unidades ao lado dos números. Se as unidades finais não combinam com a pergunta, ajuste o caminho.",
    },
    {
      test: /geometry|geometr|measure|medida|metric|métrica|mensuration|mensuração|volume|circle|círculo|pythagorean|pitagoras|distance|distância/,
      mistake: "Não use uma fórmula antes de nomear o que cada medida representa. Raio, diâmetro, altura, área e volume não são a mesma coisa.",
      check: "Confira as unidades: comprimento usa unidade simples, área usa unidade quadrada, volume usa unidade cúbica.",
    },
    {
      test: /álgebra|equation|equac|expression|express|exponent|expoente|system|sistema|slope|inclinação|quadratic|quadrática|linear|function|func/,
      mistake: "Não faça uma operação em apenas um lado da equação. O equilíbrio só permanece se os dois lados recebem o mesmo tratamento.",
      check: "Substitua sua resposta no problema original. Se os dois lados combinam, o valor faz sentido.",
    },
    {
      test: /base|binary|binário|scientific|científica|power|potência/,
      mistake: "Não leia outro sistema de numeração como se fosse sempre base dez. Cada posição tem um valor próprio.",
      check: "Expanda o número em valores de posição ou potências. A soma deve reconstruir o valor pedido.",
    },
  ],
  en: [
    {
      test: /percent|discount|interest|growth|profit|budget|business/,
      mistake: "Do not mix up the original amount, the percent part, and the final result. Find the percent part first, then decide whether to add or subtract.",
      check: "Compare with 10%, 50%, or 100%. If the answer is bigger or smaller than those landmarks allow, review it.",
    },
    {
      test: /fraction|decimal|repeating|radical|root/,
      mistake: "Do not treat numerators, denominators, and decimal places as loose labels. They always name the size of the parts.",
      check: "Estimate the size: should the answer be less than, greater than, or close to 1? Then check by reducing or converting.",
    },
    {
      test: /ratio|proportion|rate|speed|scale|unit cost|dimensional/,
      mistake: "Do not compare unlike quantities before turning them into the same unit or the same kind of part.",
      check: "Write the units beside the numbers. If the final units do not match the question, adjust the path.",
    },
    {
      test: /geometry|measure|metric|mensuration|volume|circle|pythagorean|distance/,
      mistake: "Do not use a formula before naming what each measure means. Radius, diameter, height, area, and volume are different things.",
      check: "Check the units: length uses plain units, area uses square units, and volume uses cubic units.",
    },
    {
      test: /algebra|equation|expression|exponent|system|slope|quadratic|linear|function/,
      mistake: "Do not do an operation on only one side of an equation. The balance stays true only when both sides receive the same treatment.",
      check: "Substitute your answer into the original problem. If both sides match, the value makes sense.",
    },
    {
      test: /base|binary|scientific|power/,
      mistake: "Do not read another number system as if it were always base ten. Each position has its own value.",
      check: "Expand the number into place values or powers. The sum should rebuild the value you need.",
    },
  ],
};

function lessonSearchText(lesson) {
  return [lesson.id, lesson.grade, lesson.block, lesson.title, lesson.sourceFocus]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function tutorSupportFor(lesson) {
  const text = lessonSearchText(lesson);
  const support = tutorSupport[language].find((item) => item.test.test(text)) || tutorSupport.en[0];
  return {
    mistake: support.mistake,
    check: support.check,
  };
}

function renderQuickTutor(lesson) {
  if (!lesson.memoryRefresh) return "";
  const support = tutorSupportFor(lesson);
  const guidedPreview = lesson.guidedSteps?.length
    ? lesson.guidedSteps.slice(0, 2).map((step) => step.label)
    : [t("tutorNoGuidedSteps")];
  return `
    <section class="quick-tutor" aria-labelledby="quick-tutor-title">
      <div class="quick-tutor__header">
        <div>
          <h4 id="quick-tutor-title">${t("tutorTitle")}</h4>
          <p>${t("tutorIntro")}</p>
        </div>
      </div>
      <div class="quick-tutor__grid">
        <article>
          <span>${t("tutorWarmMemory")}</span>
          <p>${lesson.memoryRefresh.idea}</p>
        </article>
        <article>
          <span>${t("tutorWorkedExample")}</span>
          <p>${lesson.memoryRefresh.example}</p>
        </article>
        <article>
          <span>${t("tutorGuidedTry")}</span>
          <ul>${guidedPreview.map((step) => `<li>${step}</li>`).join("")}</ul>
        </article>
        <article>
          <span>${t("tutorQuickCheck")}</span>
          <p>${support.check}</p>
        </article>
      </div>
    </section>
  `;
}

function renderDeepTutor(lesson) {
  if (!lesson.memoryRefresh) return "";
  const support = tutorSupportFor(lesson);
  return `
    <details class="memory-refresh">
      <summary>${t("tutorDeepDive")}</summary>
      <div class="memory-refresh__content">
        <strong>${t("refresherMethod")}</strong>
        <ol>
          ${lesson.memoryRefresh.method.map((step) => `<li>${step}</li>`).join("")}
        </ol>
        <strong>${t("tutorCommonMistake")}</strong>
        <p>${support.mistake}</p>
        <strong>${t("tutorCheckAnswer")}</strong>
        <p>${support.check}</p>
        <strong>${t("tutorRhythm")}</strong>
        <ol>
          ${lesson.rhythm.map((step) => `<li>${step}</li>`).join("")}
        </ol>
      </div>
    </details>
  `;
}

function localText(value) {
  if (!value || typeof value !== "object") return value || "";
  return value[language] || value.en || value.pt || "";
}

function localList(value) {
  const localized = localText(value);
  return Array.isArray(localized) ? localized : [];
}

function reviewPrompt(problem) {
  return localText(problem.prompt);
}

function reviewSteps(problem) {
  return localText(problem.steps) || [];
}

function reviewAcceptedAnswers(problem) {
  if (problem.acceptedAnswers) return problem.acceptedAnswers;
  if (problem.answerType === "expression") return [String(problem.answer)];
  return null;
}

function reviewAnswerText(problem) {
  const accepted = reviewAcceptedAnswers(problem);
  if (accepted?.length) return accepted[0];
  return String(problem.answer);
}

function checkReviewProblem(problem, rawValue) {
  const config = {
    ...problem,
    acceptedAnswers: reviewAcceptedAnswers(problem),
  };
  return checkValue(config, rawValue);
}

function renderGuidedAnswer(lesson) {
  const displayLesson = lessonCopy(lesson);
  return `
    <section class="guided-answer" data-panel="guided-answer" hidden>
      <h4>${t("guidedAnswerTitle")}</h4>
      <p><strong>${t("correctAnswerLabel")}:</strong> ${correctAnswerText(lesson)}</p>
      ${renderSteps(displayLesson.memoryRefresh?.workedSteps)}
      <p>${displayLesson.correction}</p>
    </section>
  `;
}

function renderExtraPractice(lesson, context = "lesson") {
  const practiceItems = extraPracticeFor(lesson);
  if (!practiceItems.length) return "";
  return `
    <section class="extra-practice" data-panel="extra-practice">
      <h4>${t("extraPracticeTitle")}</h4>
      <p>${t("extraPracticeIntro")}</p>
      <div class="extra-practice__list">
        ${practiceItems
          .map((practice, index) => {
            const inputId = `extra-answer-${context}-${index}`;
            return `
              <article class="extra-practice__item" data-practice-index="${index}">
                <p class="extra-practice__prompt">${practice.prompt}</p>
                <label for="${inputId}">${t("extraAnswerLabel")}</label>
                <div class="answer-form__row">
                  <input id="${inputId}" class="extra-answer" autocomplete="off" inputmode="${practice.answerType === "expression" ? "text" : "decimal"}" />
                  <button class="button button--small check-extra" type="button">${t("checkExtraButton")}</button>
                </div>
                <p class="extra-feedback" role="status"></p>
                <div class="extra-solution" hidden>
                  <p><strong>${t("correctAnswerLabel")}:</strong> ${correctAnswerText(practice)}</p>
                  ${renderSteps(practice.steps)}
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function showAttemptTools() {
  const attempt = lessonAttempts.get(activeLesson.id) || 1;
  const displayLesson = lessonCopy(activeLesson);
  const support = tutorSupportFor(displayLesson);
  const methodStep = displayLesson.memoryRefresh?.method?.[0] || displayLesson.rhythm?.[0] || support.check;
  const hint = attempt === 1 ? `${t("hintNotice")} ${support.check}` : attempt === 2 ? `${t("hintMethod")} ${methodStep}` : t("hintGuide");
  attemptTools.hidden = false;
  attemptTools.innerHTML = `
    <section class="attempt-hint" aria-live="polite">
      <strong>${t("hintTitle", Math.min(attempt, 3))}</strong>
      <p>${hint}</p>
    </section>
    <div class="attempt-actions">
      <button class="button button--small try-again" type="button">${t("tryAgainButton")}</button>
      ${attempt >= 3 ? `<button class="button button--small button--ghost show-guided-answer" type="button">${t("guidedAnswerButton")}</button>` : ""}
    </div>
    ${attempt >= 3 ? renderGuidedAnswer(activeLesson) : ""}
  `;
}

function renderFractionVisual(rows) {
  if (!rows?.length) return "";
  return `<section class="fraction-lab" aria-label="Fraction model">
    <p class="eyebrow">${language === "pt" ? "Laboratório visual" : "Visual laboratory"}</p>
    ${rows.map((row) => `<div class="fraction-model"><div class="fraction-bar" style="--parts:${row.parts}">${Array.from({ length: row.parts }, (_, index) => `<span class="${index < row.shaded ? "is-shaded" : ""}"></span>`).join("")}</div><strong>${row.label}</strong></div>`).join("")}
  </section>`;
}

function renderRatioVisual(groups) {
  if (!groups?.length) return "";
  return `<section class="ratio-lab" aria-label="Ratio model">
    <p class="eyebrow">${language === "pt" ? "Relação visível" : "Visible relationship"}</p>
    <div class="ratio-model">${groups.map((group, groupIndex) => `<div class="ratio-group"><div class="ratio-dots">${Array.from({ length: group.count }, () => `<span style="--group:${groupIndex}"></span>`).join("")}</div><strong>${group.label}</strong></div>`).join("")}</div>
  </section>`;
}

function hideAttemptTools() {
  attemptTools.hidden = true;
  attemptTools.innerHTML = "";
}

function checkExtraPracticeButton(button) {
  const item = button.closest(".extra-practice__item");
  const practiceIndex = Number(item?.dataset.practiceIndex || 0);
  const practice = extraPracticeFor(activeLesson)[practiceIndex];
  const input = item?.querySelector(".extra-answer");
  const extraFeedback = item?.querySelector(".extra-feedback");
  const extraSolution = item?.querySelector(".extra-solution");
  const value = input?.value.trim() || "";

  if (!practice || !extraFeedback) return;

  if (!value) {
    extraFeedback.textContent = t("emptyAnswer");
    extraFeedback.dataset.state = "neutral";
    return;
  }

  const isCorrect = checkValue(practice, value);
  extraFeedback.textContent = isCorrect ? t("extraCorrect") : t("extraTry");
  extraFeedback.dataset.state = isCorrect ? "correct" : "try";
  if (extraSolution) extraSolution.hidden = isCorrect;
  if (isCorrect) {
    answer.focus();
  }
}

function evaluateGuidedSteps(lesson) {
  if (!lesson.guidedSteps?.length) return { allCorrect: true, used: false, answers: [] };

  const answers = lesson.guidedSteps.map((step, index) => {
    const input = document.querySelector(`[data-step-index="${index}"]`);
    const rawValue = input?.value.trim() || "";
    const isCorrect = rawValue !== "" && checkValue(step, rawValue);
    return { input, rawValue, isCorrect, correct: correctAnswerText(step) };
  });

  const mayRevealStepAnswers = (lessonAttempts.get(lesson.id) || 0) >= 2;
  answers.forEach((result, index) => {
    const row = result.input?.closest(".guided-step");
    const status = row?.querySelector(".step-feedback");
    if (!row || !status) return;
    row.dataset.state = result.isCorrect ? "correct" : "try";
    status.textContent = result.isCorrect
      ? t("stepCorrect")
      : mayRevealStepAnswers
        ? `${t("stepReviewWithAnswer")} ${answers[index].correct}`
        : t("stepReview");
  });

  return {
    allCorrect: answers.every((result) => result.isCorrect),
    used: answers.some((result) => result.rawValue !== ""),
    answers,
  };
}

function getLessonProgress(lesson) {
  const response = objectiveResponses.find((entry) => entry.activity_key === lesson.activityKey);
  if (response) return response.is_correct ? "correct" : "needs-correction";

  const completed = activityProgress.find((entry) => entry.activity_key === lesson.activityKey && entry.completed);
  if (completed) return "correct";

  if (!currentUser) {
    const local = readLocalProgress().find((entry) => entry.lessonId === lesson.id);
    return local?.status || null;
  }

  return null;
}

async function loadCloudProgress() {
  const learner = activeLearner();
  objectiveResponses = [];
  activityProgress = [];
  if (!learner) return;

  const activityKeys = lessons.map((lesson) => lesson.activityKey);
  const [responsesResult, progressResult] = await Promise.all([
    supabase
      .from("objective_responses")
      .select("activity_key, question_key, selected_answer, is_correct, updated_at")
      .eq("learner_id", learner.id)
      .in("activity_key", activityKeys),
    supabase
      .from("activity_progress")
      .select("activity_key, completed, confidence, updated_at")
      .eq("learner_id", learner.id)
      .in("activity_key", activityKeys),
  ]);

  if (responsesResult.error) throw responsesResult.error;
  if (progressResult.error) throw progressResult.error;
  objectiveResponses = responsesResult.data || [];
  activityProgress = progressResult.data || [];
}

async function saveLessonProgress(lesson, value, isCorrect) {
  const now = new Date().toISOString();
  const learner = activeLearner();

  function saveLocal() {
    const progress = readLocalProgress();
    const existingIndex = progress.findIndex((entry) => entry.lessonId === lesson.id);
    const next = {
      siteSlug: sharedDbShape.siteSlug,
      subjectSlug: sharedDbShape.subjectSlug,
      lessonId: lesson.id,
      activityKey: lesson.activityKey,
      status: isCorrect ? "correct" : "needs-correction",
      lastAnswer: value,
      updatedAt: now,
    };
    if (existingIndex >= 0) progress[existingIndex] = next;
    else progress.push(next);
    writeLocalProgress(progress);
  }

  if (!learner) {
    saveLocal();
    return "local";
  }

  const responsePayload = {
    learner_id: learner.id,
    activity_key: lesson.activityKey,
    question_key: "answer",
    selected_answer: value,
    is_correct: isCorrect,
    updated_at: now,
  };
  const progressPayload = {
    learner_id: learner.id,
    activity_key: lesson.activityKey,
    completed: isCorrect,
    confidence: isCorrect ? "independent" : "needs_practice",
    last_opened_at: now,
    completed_at: isCorrect ? now : null,
    updated_at: now,
  };

  const [responseResult, progressResult] = await Promise.all([
    supabase.from("objective_responses").upsert(responsePayload, {
      onConflict: "learner_id,activity_key,question_key",
    }),
    supabase.from("activity_progress").upsert(progressPayload, {
      onConflict: "learner_id,activity_key",
    }),
  ]);

  const saveError = responseResult.error || progressResult.error;
  if (saveError) {
    const message = String(saveError.message || "");
    if (saveError.code === "23503" && message.includes("course_activities")) {
      saveLocal();
      return "catalog-pending";
    }
    throw saveError;
  }
  await loadCloudProgress();
  return "cloud";
}

function renderList() {
  const visibleLessons = filteredLessons();
  lessonCount.textContent = t("lessonCount", visibleLessons.length);
  list.innerHTML = visibleLessons
    .map((lesson) => {
      const displayLesson = lessonCopy(lesson);
      const state = getLessonProgress(lesson);
      const stateLabel = state === "correct" ? t("stateCorrect") : state ? t("stateReview") : t("stateOpen");
      return `
        <button class="lesson-card" data-id="${lesson.id}" type="button">
          <span>${displayLesson.grade} - ${displayLesson.block}</span>
          <strong>${displayLesson.title}</strong>
          <small>${displayLesson.time}</small>
          <em data-state="${state ?? "open"}">${stateLabel}</em>
        </button>
      `;
    })
    .join("");
}

function renderReviewSheets() {
  if (!reviewSheetList || !reviewProblemList || !arithmeticReviewSheets.length) return;
  const activeSheet = arithmeticReviewSheets.find((sheet) => sheet.id === activeReviewSheetId) || arithmeticReviewSheets[0];
  activeReviewSheetId = activeSheet.id;

  reviewSheetList.innerHTML = arithmeticReviewSheets
    .map(
      (sheet) => `
        <button class="review-sheet-card${sheet.id === activeSheet.id ? " is-active" : ""}" data-id="${sheet.id}" type="button">
          <span>${t("reviewSheetLabel", sheet.number)}</span>
          <strong>${localText(sheet.title)}</strong>
          <small>${localText(sheet.focus)}</small>
        </button>
      `,
    )
    .join("");

  reviewSheetNumber.textContent = t("reviewSheetLabel", activeSheet.number);
  reviewSheetTitle.textContent = localText(activeSheet.title);
  reviewSheetFocus.textContent = localText(activeSheet.focus);
  reviewProblemList.innerHTML = activeSheet.problems
    .map(
      (problem, index) => `
        <article class="review-problem" data-problem-id="${problem.id}">
          <div class="review-problem__top">
            <span>${t("reviewProblemLabel", index + 1)}</span>
            <strong>${reviewPrompt(problem)}</strong>
          </div>
          <div class="review-problem__controls">
            <input class="review-answer" autocomplete="off" inputmode="${problem.answerType === "expression" ? "text" : "decimal"}" />
            <button class="button button--small review-check" type="button">${t("reviewCheck")}</button>
            <button class="button button--small button--ghost review-retry" type="button" hidden>${t("reviewTryAgain")}</button>
            <button class="button button--small button--ghost review-guide-toggle" type="button" hidden>${t("reviewShowGuide")}</button>
          </div>
          <p class="review-feedback" role="status"></p>
          <div class="review-guide" hidden>
            <p><strong>${t("correctAnswerLabel")}:</strong> ${reviewAnswerText(problem)}</p>
            ${renderSteps(reviewSteps(problem))}
          </div>
        </article>
      `,
    )
    .join("");
}

function activeTricks() {
  return mentalTrickGuides[activeTrickGrade] || [];
}

function activeTrick() {
  const tricks = activeTricks();
  return tricks.find((trick) => trick.id === activeTrickId) || tricks[0] || null;
}

function renderMentalTricks() {
  if (!trickList || !trickDetail) return;
  const tricks = activeTricks();
  const trick = activeTrick();
  activeTrickId = trick?.id || null;

  document.querySelectorAll(".trick-grade-tab").forEach((button) => {
    const isActive = button.dataset.grade === activeTrickGrade;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("button--ghost", !isActive);
  });

  trickList.innerHTML = tricks
    .map(
      (item, index) => `
        <button class="trick-card${item.id === activeTrickId ? " is-active" : ""}" data-id="${item.id}" type="button">
          <span>${index + 1}</span>
          <strong>${localText(item.title)}</strong>
        </button>
      `,
    )
    .join("");

  if (!trick) {
    trickDetail.innerHTML = "";
    return;
  }

  trickDetail.innerHTML = `
    <div class="trick-detail__header">
      <p class="eyebrow">${activeTrickGrade === "grade6" ? t("grade6Tricks") : t("grade7Tricks")}</p>
      <h3>${localText(trick.title)}</h3>
      <p>${localText(trick.idea)}</p>
    </div>
    <div class="trick-example">
      <span>${t("trickExample")}</span>
      <strong>${trick.example}</strong>
    </div>
    <section class="trick-panel">
      <h4>${t("trickSteps")}</h4>
      <ol class="worked-steps">
        ${localList(trick.steps).map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </section>
    <section class="trick-panel trick-panel--why">
      <h4>${t("trickWhy")}</h4>
      <p>${localText(trick.why)}</p>
    </section>
    <section class="trick-panel trick-panel--practice">
      <h4>${t("trickPractice")}</h4>
      <p class="trick-practice__prompt">${trick.practice}</p>
      <button class="button button--small button--ghost trick-answer-toggle" type="button">${t("trickShowAnswer")}</button>
      <div class="trick-answer" hidden>
        <strong>${t("trickAnswer")}</strong>
        <p>${localText(trick.answer)}</p>
      </div>
    </section>
  `;
}

function renderExercise(lesson) {
  activeLesson = lesson;
  const displayLesson = lessonCopy(lesson);
  grade.textContent = `${displayLesson.grade} - ${displayLesson.block}`;
  title.textContent = displayLesson.title;
  time.textContent = displayLesson.time;
  prompt.textContent = displayLesson.prompt;
  const answerQuestionLabel = document.createElement("strong");
  answerQuestionLabel.textContent = t("answerPromptLabel");
  answerQuestion.replaceChildren(answerQuestionLabel, document.createTextNode(` ${displayLesson.prompt}`));
  feedback.textContent = "";
  feedback.dataset.state = "neutral";
  correction.hidden = true;
  correction.textContent = displayLesson.correction;
  hideAttemptTools();
  lessonAttempts.set(lesson.id, 0);
  answerLabel.textContent = displayLesson.guidedSteps?.length ? t("finalAnswer") : t("yourAnswer");
  answer.value = "";
  answer.placeholder = lesson.answerType === "expression" ? t("expressionPlaceholder") : t("numberPlaceholder");
  answer.inputMode = lesson.answerType === "expression" ? "text" : "decimal";
  body.innerHTML = `
    ${renderFractionVisual(displayLesson.visualModel)}
    ${renderRatioVisual(displayLesson.ratioModel)}
    <section class="discovery-card">
      <span>1</span>
      <div><h4>${t("discoveryTitle")}</h4><p>${t("discoveryCopy")}</p></div>
    </section>
    <details class="lesson-support">
      <summary>${t("supportSummary")}</summary>
      <div class="lesson-support__content">
        ${renderQuickTutor(displayLesson)}
        ${
          displayLesson.memoryRefresh?.workedSteps?.length
            ? `<section class="worked-solution" aria-labelledby="worked-solution-title">
            <h4 id="worked-solution-title">${t("workedTitle")}</h4>
            <ol class="worked-steps">
              ${displayLesson.memoryRefresh.workedSteps.map((step) => `<li>${step}</li>`).join("")}
            </ol>
          </section>`
            : ""
        }
        ${renderDeepTutor(displayLesson)}
      </div>
    </details>
    ${
      displayLesson.mathTip
        ? `<aside class="math-tip">
            <strong>${t("mathTipTitle")}</strong>
            <p><span>${displayLesson.mathTip.source}:</span> ${displayLesson.mathTip.text}</p>
          </aside>`
        : ""
    }
    <details class="practice-set">
      <summary>${t("extraPracticeTitle")}</summary>
      ${renderExtraPractice(displayLesson)}
    </details>
    ${
      displayLesson.guidedSteps?.length
        ? `<details class="guided-support"><summary>${t("guidedSupportSummary")}</summary><div class="guided-steps">
            <h4>${t("showSteps")}</h4>
            ${displayLesson.guidedSteps
              .map(
                (step, index) => `
                  <label class="guided-step">
                    <span>${step.label}</span>
                    <input data-step-index="${index}" autocomplete="off" />
                    <small class="step-feedback" aria-live="polite"></small>
                  </label>
                `,
              )
              .join("")}
          </div></details>`
        : ""
    }
  `;

  document.querySelectorAll(".lesson-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.id === lesson.id);
  });
  const visibleLessons = filteredLessons();
  const visibleIndex = visibleLessons.findIndex((item) => item.id === lesson.id);
  previousButton.disabled = visibleIndex <= 0;
  nextButton.disabled = visibleIndex < 0 || visibleIndex >= visibleLessons.length - 1;
}

function renderParentDashboard() {
  if (!currentUser) return;
  if (!learners.length) {
    progressList.innerHTML = `<li>${t("noLearner")}</li>`;
    return;
  }

  progressList.innerHTML = learners
    .map((learner) => {
      const isActive = learner.id === activeLearnerId;
      const correct = isActive
        ? lessons.filter((lesson) => getLessonProgress(lesson) === "correct").length
        : 0;
      const label = `${learner.nickname} (${schoolYearLabel(learner.school_year)})`;
      return `<li><button class="learner-choice${isActive ? " is-active" : ""}" data-learner-id="${learner.id}" type="button">${label}</button> ${isActive ? t("progressSuffix", correct, lessons.length) : ""}</li>`;
    })
    .join("");
}

function renderAccount() {
  dbBadge.textContent = `Supabase ${sharedDbShape.accountNamespace} / ${sharedDbShape.siteSlug}`;

  if (!currentUser) {
    learnerName.textContent = t("guestLearner");
    setAccountStatus(t("signInPrompt"));
    parentDashboard.hidden = true;
    signOutButton.hidden = true;
    renderList();
    return;
  }

  const learner = activeLearner();
  learnerName.textContent = learner ? learner.nickname : currentUser.email || t("guardianAccount");
  parentDashboard.hidden = false;
  signOutButton.hidden = false;
  setAccountStatus(
    learner
      ? t("cloudActive", learner.nickname)
      : t("noLinkedLearner"),
    learner ? "success" : "error",
  );
  renderParentDashboard();
  renderList();
}

function moveLesson(step) {
  const visibleLessons = filteredLessons();
  const lessonIndex = visibleLessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const nextLesson = visibleLessons[lessonIndex + step];
  if (!nextLesson) return;
  renderExercise(nextLesson);
}

async function chooseLearner(learnerId) {
  activeLearnerId = learnerId;
  localStorage.setItem(ACTIVE_LEARNER_KEY, learnerId);
  try {
    await loadCloudProgress();
  } catch (error) {
    setAccountStatus(translateAuthError(error), "error");
  }
  renderAccount();
}

async function finishSignIn(user) {
  currentUser = user;
  const savedLanguage = user.user_metadata?.preferred_language || user.user_metadata?.learner_language;
  if (savedLanguage === "pt" || savedLanguage === "en") {
    language = savedLanguage;
    localStorage.setItem(LANGUAGE_KEY, language);
    applyLanguage();
    renderReviewSheets();
    renderMentalTricks();
  }
  learners = await ensureGuardianSetup(user);
  const remembered = localStorage.getItem(ACTIVE_LEARNER_KEY);
  activeLearnerId = learners.some((learner) => learner.id === remembered)
    ? remembered
    : learners[0]?.id || null;
  await loadCloudProgress();
  renderAccount();
}

list.addEventListener("click", (event) => {
  const card = event.target.closest(".lesson-card");
  if (!card) return;
  const nextLesson = lessons.find((lesson) => lesson.id === card.dataset.id);
  renderExercise(nextLesson);
  answer.focus();
});

gradeFilter?.addEventListener("change", () => {
  selectedGrade = gradeFilter.value;
  const nextLesson = filteredLessons()[0];
  renderList();
  if (nextLesson) renderExercise(nextLesson);
});

reviewSheetList?.addEventListener("click", (event) => {
  const card = event.target.closest(".review-sheet-card");
  if (!card) return;
  activeReviewSheetId = card.dataset.id;
  renderReviewSheets();
});

trickGradeTabs?.addEventListener("click", (event) => {
  const button = event.target.closest(".trick-grade-tab");
  if (!button) return;
  activeTrickGrade = button.dataset.grade;
  activeTrickId = mentalTrickGuides[activeTrickGrade]?.[0]?.id || null;
  renderMentalTricks();
});

trickList?.addEventListener("click", (event) => {
  const card = event.target.closest(".trick-card");
  if (!card) return;
  activeTrickId = card.dataset.id;
  renderMentalTricks();
});

trickDetail?.addEventListener("click", (event) => {
  const button = event.target.closest(".trick-answer-toggle");
  if (!button) return;
  const answerPanel = trickDetail.querySelector(".trick-answer");
  const nextHidden = !answerPanel.hidden;
  answerPanel.hidden = nextHidden;
  button.textContent = nextHidden ? t("trickShowAnswer") : t("trickHideAnswer");
});

reviewProblemList?.addEventListener("click", (event) => {
  const problemCard = event.target.closest(".review-problem");
  if (!problemCard) return;
  const activeSheet = arithmeticReviewSheets.find((sheet) => sheet.id === activeReviewSheetId);
  const problem = activeSheet?.problems.find((item) => item.id === problemCard.dataset.problemId);
  if (!problem) return;

  const input = problemCard.querySelector(".review-answer");
  const feedbackEl = problemCard.querySelector(".review-feedback");
  const guide = problemCard.querySelector(".review-guide");
  const retryButton = problemCard.querySelector(".review-retry");
  const guideButton = problemCard.querySelector(".review-guide-toggle");

  if (event.target.closest(".review-check")) {
    const value = input.value.trim();
    if (!value) {
      feedbackEl.textContent = t("emptyAnswer");
      feedbackEl.dataset.state = "neutral";
      return;
    }
    const isCorrect = checkReviewProblem(problem, value);
    feedbackEl.textContent = isCorrect ? t("reviewCorrect") : t("reviewTry");
    feedbackEl.dataset.state = isCorrect ? "correct" : "try";
    retryButton.hidden = false;
    guideButton.hidden = false;
    guide.hidden = true;
    return;
  }

  if (event.target.closest(".review-retry")) {
    input.value = "";
    feedbackEl.textContent = "";
    feedbackEl.dataset.state = "neutral";
    guide.hidden = true;
    retryButton.hidden = true;
    guideButton.hidden = true;
    input.focus();
    return;
  }

  if (event.target.closest(".review-guide-toggle")) {
    guide.hidden = false;
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = answer.value.trim();

  if (value === "") {
    feedback.textContent = t("emptyAnswer");
    feedback.dataset.state = "neutral";
    return;
  }

  const isCorrect = checkAnswer(activeLesson, value);
  const stepResult = evaluateGuidedSteps(activeLesson);
  const fullAttemptIsCorrect = isCorrect && (!stepResult.used || stepResult.allCorrect);
  const submittedValue = activeLesson.guidedSteps?.length
    ? JSON.stringify({
        final: value,
        steps: stepResult.answers.map((result) => result.rawValue),
      })
    : value;

  try {
    const savedTo = await saveLessonProgress(activeLesson, submittedValue, fullAttemptIsCorrect);
    if (fullAttemptIsCorrect) {
      feedback.textContent =
        savedTo === "cloud"
          ? t("cloudCorrect", activeLearner()?.nickname)
          : savedTo === "catalog-pending"
            ? t("catalogPendingCorrect")
          : t("localCorrect");
      feedback.dataset.state = "correct";
      correction.hidden = true;
      hideAttemptTools();
      body.querySelector(".reflection-card")?.remove();
      body.insertAdjacentHTML("beforeend", `<section class="reflection-card"><h4>${t("reflectionTitle")}</h4><p>${t("reflectionPrompt")}</p></section>`);
    } else {
      lessonAttempts.set(activeLesson.id, (lessonAttempts.get(activeLesson.id) || 0) + 1);
      feedback.textContent =
        savedTo === "cloud"
          ? t("cloudTry")
          : savedTo === "catalog-pending"
            ? t("catalogPendingTry")
          : t("localTry");
      feedback.dataset.state = "try";
      correction.hidden = true;
      showAttemptTools();
    }
    renderAccount();
  } catch (error) {
    feedback.textContent = t("saveFailed", translateAuthError(error));
    feedback.dataset.state = "try";
    correction.hidden = fullAttemptIsCorrect;
  }
});

attemptTools.addEventListener("click", (event) => {
  const tryAgain = event.target.closest(".try-again");
  if (tryAgain) {
    feedback.textContent = "";
    feedback.dataset.state = "neutral";
    correction.hidden = true;
    hideAttemptTools();
    answer.value = "";
    answer.focus();
    return;
  }

  const showGuided = event.target.closest(".show-guided-answer");
  if (showGuided) {
    const panel = attemptTools.querySelector('[data-panel="guided-answer"]');
    if (panel) panel.hidden = false;
    return;
  }

  const checkExtra = event.target.closest(".check-extra");
  if (checkExtra) checkExtraPracticeButton(checkExtra);
});

body.addEventListener("click", (event) => {
  const checkExtra = event.target.closest(".check-extra");
  if (checkExtra) checkExtraPracticeButton(checkExtra);
});

previousButton.addEventListener("click", () => moveLesson(-1));
nextButton.addEventListener("click", () => moveLesson(1));

progressList.addEventListener("click", (event) => {
  const button = event.target.closest(".learner-choice");
  if (!button) return;
  chooseLearner(button.dataset.learnerId);
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const nickname = learnerNicknameInput.value.trim();

  if (!email || !password) {
    setAccountStatus(t("enterCredentials"), "error");
    return;
  }

  authForm.querySelectorAll("button, input, select").forEach((control) => {
    control.disabled = true;
  });

  try {
    if (authMode.value === "login") {
      setAccountStatus(t("signingIn"));
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await finishSignIn(data.user);
    } else {
      if (!nickname) {
        setAccountStatus(t("enterNickname"), "error");
        return;
      }

      setAccountStatus(t("creatingAccount"));
      const consentedAt = new Date().toISOString();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://riaanptrs.github.io/waldorf-math-pathway/",
          data: {
            learner_nickname: nickname,
            learner_school_year: "7",
            learner_language: language,
            preferred_language: language,
            guardian_confirmed: true,
            privacy_version: PRIVACY_VERSION,
            terms_version: TERMS_VERSION,
            consented_at: consentedAt,
          },
        },
      });
      if (error) throw error;

      if (data.user && data.session) {
        await finishSignIn(data.user);
      } else {
        authForm.reset();
        languageInput.value = language;
        setAccountStatus(t("accountCreated"), "success");
      }
    }
  } catch (error) {
    setAccountStatus(translateAuthError(error), "error");
  } finally {
    authForm.querySelectorAll("button, input, select").forEach((control) => {
      control.disabled = false;
    });
  }
});

languageInput.addEventListener("change", () => {
  language = languageInput.value === "en" ? "en" : "pt";
  localStorage.setItem(LANGUAGE_KEY, language);
  applyLanguage();
  renderGradeFilter();
  renderList();
  renderExercise(activeLesson);
  renderReviewSheets();
  renderMentalTricks();
  renderAccount();
});

signOutButton.addEventListener("click", async () => {
  await supabase.auth.signOut();
  currentUser = null;
  learners = [];
  activeLearnerId = null;
  objectiveResponses = [];
  activityProgress = [];
  renderAccount();
});

async function initialise() {
  applyLanguage();
  renderGradeFilter();
  renderList();
  renderExercise(activeLesson);
  renderReviewSheets();
  renderMentalTricks();
  renderAccount();

  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    try {
      await finishSignIn(session.user);
    } catch (error) {
      setAccountStatus(translateAuthError(error), "error");
    }
  }
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN" && session?.user) {
    window.setTimeout(() => finishSignIn(session.user).catch((error) => {
      setAccountStatus(translateAuthError(error), "error");
    }), 0);
  }
});

initialise().catch((error) => setAccountStatus(translateAuthError(error), "error"));
