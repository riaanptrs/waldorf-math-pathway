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
const sharedDbShape = window.sharedDbShape;
const list = document.querySelector(".lesson-list");
const reviewSheetList = document.querySelector(".review-sheet-list");
const reviewSheetNumber = document.querySelector(".review-sheet__number");
const reviewSheetTitle = document.querySelector(".review-sheet__title");
const reviewSheetFocus = document.querySelector(".review-sheet__focus");
const reviewProblemList = document.querySelector(".review-problem-list");
const grade = document.querySelector(".exercise__grade");
const title = document.querySelector(".exercise__title");
const time = document.querySelector(".exercise__time");
const prompt = document.querySelector(".exercise__prompt");
const body = document.querySelector(".exercise__body");
const form = document.querySelector(".answer-form");
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

const ACTIVE_LEARNER_KEY = "wep:active-learner";
const LOCAL_PROGRESS_KEY = "waldorf-math:local-progress:v2";
const LANGUAGE_KEY = "waldorf-math:language";

const copy = {
  pt: {
    brand: "Trilha de Matematica Waldorf",
    navAccount: "Conta",
    navPractice: "Praticar",
    navArithmeticReview: "Revisao",
    navRhythm: "Ritmo",
    navParent: "Notas para os pais",
    heroEyebrow: "Pratica online de matematica do 5o, 6o e 7o ano",
    heroTitle: "Um caminho vivo por medida, dinheiro, porcentagens, razoes e algebra inicial.",
    heroCopy:
      "Uma trilha de aulas do 5o, 6o e 7o ano com aritmetica pratica, medida, geometria, matematica financeira, fracoes, decimais, razoes, numeros com sinal, formulas e algebra inicial. Os estudantes completam passos visiveis, corrigem o proprio trabalho e salvam o progresso para revisao dos pais.",
    heroButton: "Comecar a praticar",
    introEyebrow: "Primeiro passo",
    introTitle: "Agora com blocos do 5o, 6o e 7o ano",
    introCopy:
      "Esta trilha de matematica adapta blocos Waldorf em atividades online originais: no 5o ano, fracoes decimais, medidas e geometria a mao livre; no 6o ano, matematica financeira, descontos, orcamento e geometria precisa; no 7o ano, revisao aritmetica, fracoes, decimais, razoes, numeros com sinal, equacoes e formulas.",
    accountEyebrow: "Cadastro compartilhado",
    accountTitle: "Entrar ou cadastrar",
    modeLabel: "Modo",
    modeLogin: "Entrar",
    modeRegister: "Cadastrar",
    emailLabel: "Email do responsavel",
    passwordLabel: "Senha",
    learnerLabel: "Apelido do estudante",
    languageLabel: "Idioma do estudante",
    continueButton: "Continuar",
    currentLearnerEyebrow: "Estudante atual",
    signOut: "Sair",
    practiceEyebrow: "Sala de pratica",
    practiceTitle: "Escolha a atividade de hoje",
    arithmeticReviewEyebrow: "Revisao aritmetica",
    arithmeticReviewTitle: "Folhas de revisao com explicacao guiada",
    arithmeticReviewIntro:
      "Pratique fracoes, decimais, divisao, conversoes e calculo mental. Cada resposta pode ser conferida com passos.",
    reviewSheetLabel: (number) => `Folha ${number}`,
    reviewProblemLabel: (number) => `Exercicio ${number}`,
    reviewCheck: "Verificar",
    reviewTryAgain: "Tentar de novo",
    reviewShowGuide: "Ver explicacao guiada",
    reviewCorrect: "Correto.",
    reviewTry: "Ainda nao. Tente de novo ou veja a explicacao guiada.",
    previousButton: "Anterior",
    nextButton: "Proxima",
    checkButton: "Verificar",
    rhythmEyebrow: "Ritmo diario",
    rhythmTitle: "Aquecimento antes da tela",
    rhythmStep1: "Estime antes de calcular.",
    rhythmStep2: "Nomeie a operacao com suas proprias palavras.",
    rhythmStep3: "Resolva um problema pratico devagar.",
    rhythmStep4: "Explique como voce conferiu a resposta.",
    parentEyebrow: "Notas para os pais",
    parentTitle: "Progresso e notas do plano de aulas",
    dashboardTitle: "Progresso em matematica dos estudantes vinculados",
    note1Title: "Extracao das licoes",
    note1Copy:
      "Os topicos do 5o, 6o e 7o ano sao organizados a partir de objetivos Waldorf de matematica, depois reescritos como licoes online originais com passos verificaveis e gabaritos.",
    note2Title: "Ciclo de correcao",
    note2Copy:
      "Respostas incorretas mostram uma dica de correcao e ficam marcadas para revisao ate que o estudante envie uma resposta correta.",
    note3Title: "Banco compartilhado",
    note3Copy:
      "Matematica usa a mesma conta Supabase do responsavel, registros de estudantes, respostas objetivas e tabelas de progresso de atividades da Waldorf English Pathway.",
    footerCopy:
      "Trilha de Matematica Waldorf e um projeto independente de aprendizagem, com atividades originais adaptadas de referencias curriculares proprias.",
    lessonCount: (count) => `${count} atividades de matematica disponiveis`,
    stateCorrect: "Feita",
    stateReview: "Revisar",
    stateOpen: "Abrir",
    lessonFocus: "Foco da licao",
    howTo: "Como fazer",
    refresherTitle: "Precisa relembrar?",
    refresherMethod: "Metodo",
    workedTitle: "Como resolver esta conta, passo por passo",
    refresherExample: "Exemplo rapido",
    showSteps: "Mostre os passos",
    finalAnswer: "Resposta final depois dos passos",
    yourAnswer: "Sua resposta",
    expressionPlaceholder: "Exemplo: 10k - 14",
    numberPlaceholder: "Digite um numero",
    stepCorrect: "Correto.",
    stepReview: "Revise. Resposta correta:",
    noLearner: "Nenhum estudante esta vinculado a esta conta de responsavel ainda.",
    guestLearner: "Estudante visitante",
    guardianAccount: "Conta do responsavel",
    signInPrompt: "Entre com o mesmo email e senha de responsavel usados na Waldorf English Pathway.",
    cloudActive: (name) => `Sincronizacao em nuvem ativa para ${name}. Este e o mesmo registro de estudante usado pela Waldorf English Pathway.`,
    noLinkedLearner: "Conta do responsavel encontrada, mas nenhum estudante esta vinculado ainda. Cadastre com um apelido de estudante para adicionar um.",
    progressSuffix: (correct, total) => `${correct}/${total} atividades de matematica corretas`,
    emptyAnswer: "Digite uma resposta primeiro.",
    cloudCorrect: (name) => `Correto. Salvo no portfolio compartilhado de ${name}.`,
    localCorrect: "Correto. Salvo neste dispositivo. Entre na conta para salvar no portfolio compartilhado.",
    cloudTry: "Precisa de correcao. Salvo para revisao no portfolio compartilhado. Voce pode tentar de novo ou abrir a resposta guiada.",
    localTry: "Precisa de correcao. Salvo neste dispositivo. Voce pode tentar de novo ou abrir a resposta guiada.",
    tryAgainButton: "Tentar de novo",
    guidedAnswerButton: "Ver resposta guiada",
    guidedAnswerTitle: "Resposta guiada",
    correctAnswerLabel: "Resposta correta",
    mathTipTitle: "Dica de calculo mental",
    extraPracticeTitle: "Treino extra",
    extraPracticeIntro: "Antes de voltar para a atividade, tente uma conta parecida.",
    extraAnswerLabel: "Resposta do treino extra",
    checkExtraButton: "Verificar treino",
    extraCorrect: "Correto. Agora volte para a atividade principal.",
    extraTry: "Ainda nao. Veja o caminho guiado abaixo e tente a atividade principal outra vez.",
    saveFailed: (message) => `A resposta foi verificada, mas o salvamento na nuvem falhou: ${message}`,
    enterCredentials: "Digite o email do responsavel e a senha.",
    signingIn: "Entrando pelo banco Waldorf compartilhado...",
    enterNickname: "Digite um apelido do estudante para o portfolio compartilhado.",
    creatingAccount: "Criando a conta compartilhada do responsavel...",
    accountCreated: "Conta criada. Confirme o email e depois entre aqui com a mesma conta Waldorf.",
  },
  en: {
    brand: "Waldorf Math Pathway",
    navAccount: "Accounts",
    navPractice: "Practice",
    navArithmeticReview: "Review",
    navRhythm: "Rhythm",
    navParent: "Parent Notes",
    heroEyebrow: "Grade 5, 6, and 7 online math practice",
    heroTitle: "A living path through measure, money, percentages, ratios, and early algebra.",
    heroCopy:
      "A Grade 5, 6, and 7 lesson path with practical arithmetic, measure, geometry, business math, fractions, decimals, ratios, signed numbers, formulas, and early algebra. Students complete visible steps, self-correct, and save their work for parent review.",
    heroButton: "Begin Practice",
    introEyebrow: "Step one",
    introTitle: "Now with Grade 5, Grade 6, and Grade 7 blocks",
    introCopy:
      "This math path adapts Waldorf math blocks into original online activities: Grade 5 decimal fractions, measurement, and freehand geometry; Grade 6 business math, discounts, budgeting, and precise geometry; Grade 7 arithmetic review, fractions, decimals, ratios, signed numbers, equations, and formulas.",
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
    arithmeticReviewEyebrow: "Arithmetic review",
    arithmeticReviewTitle: "Review sheets with guided explanations",
    arithmeticReviewIntro:
      "Practice fractions, decimals, division, conversions, and mental arithmetic. Every answer can be checked with steps.",
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
      "Grade 5, 6, and 7 topics are sequenced from Waldorf math goals, then rewritten as original online lessons with checkable steps and answer keys.",
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
    lessonFocus: "Lesson focus",
    howTo: "How to work it",
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
    stepReview: "Review. Correct answer:",
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
    cloudTry: "Needs correction. Saved for review in the shared portfolio. You can try again or open the guided answer.",
    localTry: "Needs correction. Saved on this device. You can try again or open the guided answer.",
    tryAgainButton: "Try again",
    guidedAnswerButton: "See guided answer",
    guidedAnswerTitle: "Guided answer",
    correctAnswerLabel: "Correct answer",
    mathTipTitle: "Mental math tip",
    extraPracticeTitle: "Extra practice",
    extraPracticeIntro: "Before returning to the main activity, try a similar problem.",
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
  return extraPracticeBank[language]?.[lesson.id] || extraPracticeBank.en?.[lesson.id] || null;
}

function applyLanguage() {
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.title = language === "pt" ? "Trilha de Matematica Waldorf" : "Waldorf Math Pathway";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      language === "pt"
        ? "Um percurso de matematica Waldorf para 5o, 6o e 7o ano, com exercicios online sobre fracoes decimais, medida, matematica financeira, porcentagens, razoes, numeros negativos e algebra inicial."
        : "A Waldorf-inspired Grade 5, 6, and 7 math path with online exercises for decimal fractions, measurement, business math, percentages, ratios, negative numbers, and early algebra.",
    );
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  languageInput.value = language;
  authForm.dataset.language = language;
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
  return value.toLowerCase().replace(/\s+/g, "").replace(/\*/g, "");
}

function checkValue(config, rawValue) {
  if (config.answerType === "expression") {
    const normalized = normalizeExpression(rawValue);
    return config.acceptedAnswers.some((accepted) => normalizeExpression(accepted) === normalized);
  }

  const value = Number(rawValue);
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

function localText(value) {
  if (!value || typeof value !== "object") return value || "";
  return value[language] || value.en || value.pt || "";
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

function renderExtraPractice(lesson) {
  const practice = extraPracticeFor(lesson);
  if (!practice) return "";
  return `
    <section class="extra-practice" data-panel="extra-practice">
      <h4>${t("extraPracticeTitle")}</h4>
      <p>${t("extraPracticeIntro")}</p>
      <p class="extra-practice__prompt">${practice.prompt}</p>
      <label for="extra-answer">${t("extraAnswerLabel")}</label>
      <div class="answer-form__row">
        <input id="extra-answer" class="extra-answer" autocomplete="off" inputmode="${practice.answerType === "expression" ? "text" : "decimal"}" />
        <button class="button button--small check-extra" type="button">${t("checkExtraButton")}</button>
      </div>
      <p class="extra-feedback" role="status"></p>
      <div class="extra-solution" hidden>
        <p><strong>${t("correctAnswerLabel")}:</strong> ${correctAnswerText(practice)}</p>
        ${renderSteps(practice.steps)}
      </div>
    </section>
  `;
}

function showAttemptTools() {
  attemptTools.hidden = false;
  attemptTools.innerHTML = `
    <div class="attempt-actions">
      <button class="button button--small try-again" type="button">${t("tryAgainButton")}</button>
      <button class="button button--small button--ghost show-guided-answer" type="button">${t("guidedAnswerButton")}</button>
    </div>
    ${renderGuidedAnswer(activeLesson)}
    ${renderExtraPractice(activeLesson)}
  `;
}

function hideAttemptTools() {
  attemptTools.hidden = true;
  attemptTools.innerHTML = "";
}

function evaluateGuidedSteps(lesson) {
  if (!lesson.guidedSteps?.length) return { allCorrect: true, answers: [] };

  const answers = lesson.guidedSteps.map((step, index) => {
    const input = document.querySelector(`[data-step-index="${index}"]`);
    const rawValue = input?.value.trim() || "";
    const isCorrect = rawValue !== "" && checkValue(step, rawValue);
    return { input, rawValue, isCorrect, correct: correctAnswerText(step) };
  });

  answers.forEach((result, index) => {
    const row = result.input?.closest(".guided-step");
    const status = row?.querySelector(".step-feedback");
    if (!row || !status) return;
    row.dataset.state = result.isCorrect ? "correct" : "try";
    status.textContent = result.isCorrect
      ? t("stepCorrect")
      : `${t("stepReview")} ${answers[index].correct}`;
  });

  return {
    allCorrect: answers.every((result) => result.isCorrect),
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

  if (!learner) {
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

  if (responseResult.error) throw responseResult.error;
  if (progressResult.error) throw progressResult.error;
  await loadCloudProgress();
  return "cloud";
}

function renderList() {
  lessonCount.textContent = t("lessonCount", lessons.length);
  list.innerHTML = lessons
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

function renderExercise(lesson) {
  activeLesson = lesson;
  const displayLesson = lessonCopy(lesson);
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  grade.textContent = `${displayLesson.grade} - ${displayLesson.block}`;
  title.textContent = displayLesson.title;
  time.textContent = displayLesson.time;
  prompt.textContent = displayLesson.prompt;
  feedback.textContent = "";
  feedback.dataset.state = "neutral";
  correction.hidden = true;
  correction.textContent = displayLesson.correction;
  hideAttemptTools();
  answerLabel.textContent = displayLesson.guidedSteps?.length ? t("finalAnswer") : t("yourAnswer");
  answer.value = "";
  answer.placeholder = lesson.answerType === "expression" ? t("expressionPlaceholder") : t("numberPlaceholder");
  answer.inputMode = lesson.answerType === "expression" ? "text" : "decimal";
  body.innerHTML = `
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
    <div class="lesson-note">
      <strong>${t("lessonFocus")}</strong>
      <p>${displayLesson.teacherAim}</p>
      <small>${displayLesson.sourceFocus}</small>
      ${displayLesson.examplePt ? `<div class="example-pt"><strong>${t("howTo")}</strong><p>${displayLesson.examplePt}</p></div>` : ""}
    </div>
    ${
      displayLesson.memoryRefresh
        ? `<details class="memory-refresh" open>
            <summary>${t("refresherTitle")}</summary>
            <div class="memory-refresh__content">
              <p>${displayLesson.memoryRefresh.idea}</p>
              <strong>${t("refresherMethod")}</strong>
              <ol>
                ${displayLesson.memoryRefresh.method.map((step) => `<li>${step}</li>`).join("")}
              </ol>
              <strong>${t("refresherExample")}</strong>
              <p>${displayLesson.memoryRefresh.example}</p>
            </div>
          </details>`
        : ""
    }
    ${
      displayLesson.mathTip
        ? `<aside class="math-tip">
            <strong>${t("mathTipTitle")}</strong>
            <p><span>${displayLesson.mathTip.source}:</span> ${displayLesson.mathTip.text}</p>
          </aside>`
        : ""
    }
    <ol>
      ${displayLesson.rhythm.map((step) => `<li>${step}</li>`).join("")}
    </ol>
    ${
      displayLesson.guidedSteps?.length
        ? `<div class="guided-steps">
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
          </div>`
        : ""
    }
  `;

  document.querySelectorAll(".lesson-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.id === lesson.id);
  });
  previousButton.disabled = lessonIndex <= 0;
  nextButton.disabled = lessonIndex >= lessons.length - 1;
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
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const nextLesson = lessons[lessonIndex + step];
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

reviewSheetList?.addEventListener("click", (event) => {
  const card = event.target.closest(".review-sheet-card");
  if (!card) return;
  activeReviewSheetId = card.dataset.id;
  renderReviewSheets();
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
  const fullAttemptIsCorrect = isCorrect && stepResult.allCorrect;
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
          : t("localCorrect");
      feedback.dataset.state = "correct";
      correction.hidden = true;
      hideAttemptTools();
    } else {
      feedback.textContent =
        savedTo === "cloud"
          ? t("cloudTry")
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
  if (!checkExtra) return;
  const practice = extraPracticeFor(activeLesson);
  const input = attemptTools.querySelector(".extra-answer");
  const extraFeedback = attemptTools.querySelector(".extra-feedback");
  const extraSolution = attemptTools.querySelector(".extra-solution");
  const value = input?.value.trim() || "";

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
  renderList();
  renderExercise(activeLesson);
  renderReviewSheets();
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
  renderList();
  renderExercise(activeLesson);
  renderReviewSheets();
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
