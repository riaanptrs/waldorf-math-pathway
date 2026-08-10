const list = document.querySelector(".lesson-list");
const grade = document.querySelector(".exercise__grade");
const title = document.querySelector(".exercise__title");
const time = document.querySelector(".exercise__time");
const prompt = document.querySelector(".exercise__prompt");
const body = document.querySelector(".exercise__body");
const form = document.querySelector(".answer-form");
const answer = document.querySelector("#answer");
const feedback = document.querySelector(".feedback");

let activeExercise = exercises[0];

function renderList() {
  list.innerHTML = exercises
    .map(
      (exercise) => `
        <button class="lesson-card" data-id="${exercise.id}" type="button">
          <span>${exercise.grade}</span>
          <strong>${exercise.title}</strong>
          <small>${exercise.time}</small>
        </button>
      `,
    )
    .join("");
}

function renderExercise(exercise) {
  activeExercise = exercise;
  grade.textContent = exercise.grade;
  title.textContent = exercise.title;
  time.textContent = exercise.time;
  prompt.textContent = exercise.prompt;
  feedback.textContent = "";
  answer.value = "";
  body.innerHTML = `
    <ul>
      ${exercise.steps.map((step) => `<li>${step}</li>`).join("")}
    </ul>
  `;

  document.querySelectorAll(".lesson-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.id === exercise.id);
  });
}

list.addEventListener("click", (event) => {
  const card = event.target.closest(".lesson-card");
  if (!card) return;
  const nextExercise = exercises.find((exercise) => exercise.id === card.dataset.id);
  renderExercise(nextExercise);
  answer.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = Number(answer.value.trim());

  if (Number.isNaN(value) || answer.value.trim() === "") {
    feedback.textContent = "Try entering a number first.";
    feedback.dataset.state = "neutral";
    return;
  }

  if (value === activeExercise.answer) {
    feedback.textContent = `Yes. ${value}${activeExercise.suffix ? ` ${activeExercise.suffix}` : ""} is right.`;
    feedback.dataset.state = "correct";
  } else {
    feedback.textContent = "Not yet. Try the rhythm again and count one step at a time.";
    feedback.dataset.state = "try";
  }
});

renderList();
renderExercise(activeExercise);
