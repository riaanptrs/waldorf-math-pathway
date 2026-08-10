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
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const roleInput = document.querySelector("#role");
const studentLinkInput = document.querySelector("#student-link");
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

const accountKey = `${sharedDbShape.accountNamespace}:accounts:${SHARED_DB_VERSION}`;
const progressKey = `${sharedDbShape.accountNamespace}:progress:${SHARED_DB_VERSION}`;

let activeLesson = lessons[0];
let currentUser = null;

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function hashPassword(password) {
  const encoded = new TextEncoder().encode(`${SITE_ID}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeExpression(value) {
  return value.toLowerCase().replace(/\s+/g, "").replace(/\*/g, "");
}

function getLessonProgress(lessonId) {
  if (!currentUser || currentUser.role !== "student" || !currentUser.studentId) return null;
  const progress = readJson(progressKey, []);
  return progress.find(
    (entry) =>
      entry.siteSlug === SITE_ID &&
      entry.subjectSlug === SUBJECT_ID &&
      entry.studentId === currentUser.studentId &&
      entry.lessonId === lessonId,
  );
}

function saveLessonProgress(lesson, value, isCorrect) {
  if (!currentUser || currentUser.role !== "student") return;

  const progress = readJson(progressKey, []);
  const existingIndex = progress.findIndex(
    (entry) =>
      entry.siteSlug === SITE_ID &&
      entry.subjectSlug === SUBJECT_ID &&
      entry.studentId === currentUser.studentId &&
      entry.lessonId === lesson.id,
  );
  const existing = existingIndex >= 0 ? progress[existingIndex] : null;
  const next = {
    siteSlug: SITE_ID,
    subjectSlug: SUBJECT_ID,
    studentId: currentUser.studentId,
    lessonId: lesson.id,
    status: isCorrect ? "correct" : "needs-correction",
    attempts: (existing?.attempts ?? 0) + 1,
    lastAnswer: value,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    progress[existingIndex] = next;
  } else {
    progress.push(next);
  }
  writeJson(progressKey, progress);
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

function renderList() {
  lessonCount.textContent = `${lessons.length} Grade 7 activities available`;
  list.innerHTML = lessons
    .map((lesson) => {
      const progress = getLessonProgress(lesson.id);
      const stateLabel = progress?.status === "correct" ? "Done" : progress ? "Review" : "Open";
      return `
        <button class="lesson-card" data-id="${lesson.id}" type="button">
          <span>${lesson.grade} - ${lesson.block}</span>
          <strong>${lesson.title}</strong>
          <small>${lesson.time}</small>
          <em data-state="${progress?.status ?? "open"}">${stateLabel}</em>
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

function moveLesson(step) {
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const nextLesson = lessons[lessonIndex + step];
  if (!nextLesson) return;
  renderExercise(nextLesson);
}

function renderAccount() {
  const accounts = readJson(accountKey, []);
  const hasSharedRecords = accounts.some((account) => account.siteSlug === SITE_ID);
  dbBadge.textContent = `${sharedDbShape.accountNamespace} / ${SITE_ID}`;

  if (!currentUser) {
    learnerName.textContent = "Guest learner";
    accountStatus.textContent = hasSharedRecords
      ? "Sign in to continue saved math progress."
      : "Register a parent or student account to save progress on this device.";
    parentDashboard.hidden = true;
    signOutButton.hidden = true;
    renderList();
    return;
  }

  learnerName.textContent = currentUser.username;
  accountStatus.textContent =
    currentUser.role === "parent"
      ? "Parent account active. Linked student progress appears below."
      : "Student account active. Corrected work is saved to the shared progress shape.";
  parentDashboard.hidden = currentUser.role !== "parent";
  signOutButton.hidden = false;
  renderParentDashboard();
  renderList();
}

function renderParentDashboard() {
  if (!currentUser || currentUser.role !== "parent") return;

  const accounts = readJson(accountKey, []);
  const progress = readJson(progressKey, []);
  const linked = currentUser.linkedStudentIds
    .map((studentId) => accounts.find((account) => account.studentId === studentId))
    .filter(Boolean);

  if (!linked.length) {
    progressList.innerHTML = "<li>No linked student yet. Register a student, then add that username to the parent link field.</li>";
    return;
  }

  progressList.innerHTML = linked
    .map((student) => {
      const studentProgress = progress.filter(
        (entry) =>
          entry.siteSlug === SITE_ID &&
          entry.subjectSlug === SUBJECT_ID &&
          entry.studentId === student.studentId,
      );
      const correct = studentProgress.filter((entry) => entry.status === "correct").length;
      const review = studentProgress.filter((entry) => entry.status === "needs-correction").length;
      return `<li><strong>${student.username}</strong>: ${correct}/${lessons.length} correct, ${review} needing correction</li>`;
    })
    .join("");
}

list.addEventListener("click", (event) => {
  const card = event.target.closest(".lesson-card");
  if (!card) return;
  const nextLesson = lessons.find((lesson) => lesson.id === card.dataset.id);
  renderExercise(nextLesson);
  answer.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = answer.value.trim();

  if (value === "") {
    feedback.textContent = "Try entering an answer first.";
    feedback.dataset.state = "neutral";
    return;
  }

  const isCorrect = checkAnswer(activeLesson, value);
  saveLessonProgress(activeLesson, value, isCorrect);

  if (isCorrect) {
    feedback.textContent = `Correct. ${value}${activeLesson.suffix ? ` ${activeLesson.suffix}` : ""} is saved.`;
    feedback.dataset.state = "correct";
    correction.hidden = true;
  } else {
    feedback.textContent = "Needs correction. Read the hint, revise your work, and check again.";
    feedback.dataset.state = "try";
    correction.hidden = false;
  }

  renderAccount();
});

previousButton.addEventListener("click", () => moveLesson(-1));
nextButton.addEventListener("click", () => moveLesson(1));

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const role = roleInput.value;
  const linkedStudentName = studentLinkInput.value.trim().toLowerCase();

  if (!username || !password) {
    accountStatus.textContent = "Enter both a username and password.";
    return;
  }

  const accounts = readJson(accountKey, []);
  const passwordHash = await hashPassword(password);
  const existing = accounts.find((account) => account.username === username);

  if (authMode.value === "login") {
    if (!existing || existing.passwordHash !== passwordHash) {
      accountStatus.textContent = "That username and password did not match.";
      return;
    }
    if (existing.role === "parent" && linkedStudentName) {
      const linkedStudent = accounts.find((account) => account.username === linkedStudentName && account.role === "student");
      if (linkedStudent && !existing.linkedStudentIds.includes(linkedStudent.studentId)) {
        existing.linkedStudentIds = [...existing.linkedStudentIds, linkedStudent.studentId];
        writeJson(accountKey, accounts);
      }
    }
    currentUser = existing;
  } else {
    if (existing) {
      accountStatus.textContent = "That username already exists. Choose sign in instead.";
      return;
    }

    const linkedStudent = accounts.find((account) => account.username === linkedStudentName && account.role === "student");
    const account = {
      siteSlug: SITE_ID,
      subjectSlug: SUBJECT_ID,
      username,
      passwordHash,
      role,
      studentId: role === "student" ? `${SITE_ID}:student:${crypto.randomUUID()}` : "",
      linkedStudentIds: role === "parent" && linkedStudent ? [linkedStudent.studentId] : [],
      createdAt: new Date().toISOString(),
    };
    accounts.push(account);
    writeJson(accountKey, accounts);
    currentUser = account;
  }

  authForm.reset();
  authMode.value = "login";
  renderAccount();
});

signOutButton.addEventListener("click", () => {
  currentUser = null;
  renderAccount();
});

renderList();
renderExercise(activeLesson);
renderAccount();
