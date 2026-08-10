import {
  PRIVACY_VERSION,
  TERMS_VERSION,
  ensureGuardianSetup,
  schoolYearLabel,
  supabase,
  translateAuthError,
} from "../assets/supabase-client.js";

const lessons = window.lessons;
const sharedDbShape = window.sharedDbShape;
const list = document.querySelector(".lesson-list");
const grade = document.querySelector(".exercise__grade");
const title = document.querySelector(".exercise__title");
const time = document.querySelector(".exercise__time");
const prompt = document.querySelector(".exercise__prompt");
const body = document.querySelector(".exercise__body");
const form = document.querySelector(".answer-form");
const answer = document.querySelector("#answer");
const feedback = document.querySelector(".feedback");
const authForm = document.querySelector(".auth-form");
const authMode = document.querySelector("#auth-mode");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const learnerNicknameInput = document.querySelector("#student-link");
const accountStatus = document.querySelector(".account-status");
const learnerName = document.querySelector(".learner-name");
const parentDashboard = document.querySelector(".parent-dashboard");
const progressList = document.querySelector(".progress-list");
const correction = document.querySelector(".correction");
const dbBadge = document.querySelector(".db-badge");
const signOutButton = document.querySelector(".sign-out");
const lessonCount = document.querySelector(".lesson-count");
const previousButton = document.querySelector(".lesson-prev");
const nextButton = document.querySelector(".lesson-next");

const ACTIVE_LEARNER_KEY = "wep:active-learner";
const LOCAL_PROGRESS_KEY = "waldorf-math:local-progress:v2";

let activeLesson = lessons[0];
let currentUser = null;
let learners = [];
let activeLearnerId = null;
let objectiveResponses = [];
let activityProgress = [];

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

function checkAnswer(lesson, rawValue) {
  if (lesson.answerType === "expression") {
    const normalized = normalizeExpression(rawValue);
    return lesson.acceptedAnswers.some((accepted) => normalizeExpression(accepted) === normalized);
  }

  const value = Number(rawValue);
  if (Number.isNaN(value)) return false;
  return Math.abs(value - lesson.answer) <= (lesson.tolerance ?? 0);
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
  lessonCount.textContent = `${lessons.length} Grade 7 activities available`;
  list.innerHTML = lessons
    .map((lesson) => {
      const state = getLessonProgress(lesson);
      const stateLabel = state === "correct" ? "Done" : state ? "Review" : "Open";
      return `
        <button class="lesson-card" data-id="${lesson.id}" type="button">
          <span>${lesson.grade} - ${lesson.block}</span>
          <strong>${lesson.title}</strong>
          <small>${lesson.time}</small>
          <em data-state="${state ?? "open"}">${stateLabel}</em>
        </button>
      `;
    })
    .join("");
}

function renderExercise(lesson) {
  activeLesson = lesson;
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  grade.textContent = `${lesson.grade} - ${lesson.block}`;
  title.textContent = lesson.title;
  time.textContent = lesson.time;
  prompt.textContent = lesson.prompt;
  feedback.textContent = "";
  feedback.dataset.state = "neutral";
  correction.hidden = true;
  correction.textContent = lesson.correction;
  answer.value = "";
  answer.placeholder = lesson.answerType === "expression" ? "Example: 10k - 14" : "Enter a number";
  answer.inputMode = lesson.answerType === "expression" ? "text" : "decimal";
  body.innerHTML = `
    <div class="lesson-note">
      <strong>Lesson focus</strong>
      <p>${lesson.teacherAim}</p>
      <small>${lesson.sourceFocus}</small>
    </div>
    <ol>
      ${lesson.rhythm.map((step) => `<li>${step}</li>`).join("")}
    </ol>
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
    progressList.innerHTML = "<li>No learner is linked to this guardian account yet.</li>";
    return;
  }

  progressList.innerHTML = learners
    .map((learner) => {
      const isActive = learner.id === activeLearnerId;
      const correct = isActive
        ? lessons.filter((lesson) => getLessonProgress(lesson) === "correct").length
        : 0;
      const label = `${learner.nickname} (${schoolYearLabel(learner.school_year)})`;
      return `<li><button class="learner-choice${isActive ? " is-active" : ""}" data-learner-id="${learner.id}" type="button">${label}</button> ${isActive ? `${correct}/${lessons.length} math activities correct` : ""}</li>`;
    })
    .join("");
}

function renderAccount() {
  dbBadge.textContent = `Supabase ${sharedDbShape.accountNamespace} / ${sharedDbShape.siteSlug}`;

  if (!currentUser) {
    learnerName.textContent = "Guest learner";
    setAccountStatus("Sign in with the same guardian email and password used for Waldorf English Pathway.");
    parentDashboard.hidden = true;
    signOutButton.hidden = true;
    renderList();
    return;
  }

  const learner = activeLearner();
  learnerName.textContent = learner ? learner.nickname : currentUser.email || "Guardian account";
  parentDashboard.hidden = false;
  signOutButton.hidden = false;
  setAccountStatus(
    learner
      ? `Cloud sync active for ${learner.nickname}. This is the same learner record used by Waldorf English Pathway.`
      : "Guardian account found, but no learner is linked yet. Register with a learner nickname to add one.",
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = answer.value.trim();

  if (value === "") {
    feedback.textContent = "Try entering an answer first.";
    feedback.dataset.state = "neutral";
    return;
  }

  const isCorrect = checkAnswer(activeLesson, value);

  try {
    const savedTo = await saveLessonProgress(activeLesson, value, isCorrect);
    if (isCorrect) {
      feedback.textContent =
        savedTo === "cloud"
          ? `Correct. Saved to ${activeLearner()?.nickname}'s shared portfolio.`
          : "Correct. Saved on this device. Sign in to save it to the shared portfolio.";
      feedback.dataset.state = "correct";
      correction.hidden = true;
    } else {
      feedback.textContent =
        savedTo === "cloud"
          ? "Needs correction. Saved for review in the shared portfolio."
          : "Needs correction. Saved on this device.";
      feedback.dataset.state = "try";
      correction.hidden = false;
    }
    renderAccount();
  } catch (error) {
    feedback.textContent = `The answer was checked, but cloud saving failed: ${translateAuthError(error)}`;
    feedback.dataset.state = "try";
    correction.hidden = !isCorrect;
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
    setAccountStatus("Enter the guardian email and password.", "error");
    return;
  }

  authForm.querySelectorAll("button, input, select").forEach((control) => {
    control.disabled = true;
  });

  try {
    if (authMode.value === "login") {
      setAccountStatus("Signing in through the shared Waldorf database...");
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await finishSignIn(data.user);
    } else {
      if (!nickname) {
        setAccountStatus("Enter a learner nickname for the shared portfolio.", "error");
        return;
      }

      setAccountStatus("Creating the shared guardian account...");
      const consentedAt = new Date().toISOString();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://riaanptrs.github.io/waldorf-math-pathway/",
          data: {
            learner_nickname: nickname,
            learner_school_year: "7",
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
        setAccountStatus("Account created. Confirm the email, then sign in here with the same Waldorf account.", "success");
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
  renderList();
  renderExercise(activeLesson);
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
