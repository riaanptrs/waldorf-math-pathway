(() => {
  const root = document.querySelector(".fact-rhythm");
  if (!root) return;

  const STORAGE_KEY = "waldorf-math:fact-rhythm:v1";
  const TOTAL_FACTS = 60;
  const RECOVERY_SIZE = 6;
  const words = {
    pt: {
      eyebrow: "Ritmo diário de fatos",
      title: "Fortaleça os fatos que você já conhece",
      intro: "Escolha um ritmo confortável. Esta prática curta serve para ganhar fluência, não para comparar você com outra pessoa.",
      readiness: "Ainda estou aprendendo",
      fluency: "Quero praticar fluência",
      grade: "Ano",
      grade5: "5º ano",
      grade6: "6º ano",
      path: "Meu caminho hoje",
      time: "Ritmo",
      untimed: "Sem cronômetro",
      three: "3 minutos",
      twoHalf: "2½ minutos",
      start: "Começar novo ritmo",
      stop: "Encerrar agora",
      answer: "Sua resposta",
      submit: "Responder",
      progress: (done) => `${done} de ${TOTAL_FACTS}`,
      remaining: "restantes",
      gentle: "Faça mentalmente quando puder. Pare se começar a ficar tenso ou cansativo.",
      finished: "Ritmo concluído",
      score: (correct, attempted) => `${correct} corretas em ${attempted} respondidas`,
      accuracy: (value) => `${value}% de precisão`,
      best: (value) => `Sua melhor precisão neste dispositivo: ${value}%`,
      recovery: "Praticar 6 fatos para fortalecer",
      noMistakes: "Você não precisa de recuperação nesta rodada. Muito bem.",
      recoveryTitle: "Recuperação tranquila",
      recoveryIntro: "Sem cronômetro. Use a relação entre multiplicação e divisão, ou entre adição e subtração.",
      correct: "Correto. Continue.",
      tryAgain: "Ainda não. Observe a família deste fato e tente novamente.",
      complete: "Recuperação concluída. Você encontrou cada fato corretamente.",
      family: "Fato relacionado",
      back: "Fazer outro ritmo",
      modeHelp: "Aqui as dicas aparecem imediatamente e não há cronômetro.",
      improvement: (value) => value > 0 ? `Você melhorou ${value} pontos desde a última rodada.` : value < 0 ? "Hoje foi uma rodada mais difícil. Continue com calma." : "Você manteve sua precisão anterior.",
    },
    en: {
      eyebrow: "Daily fact rhythm",
      title: "Strengthen the facts you already know",
      intro: "Choose a comfortable rhythm. This short practice builds fluency; it never compares you with another learner.",
      readiness: "I am still learning",
      fluency: "I want fluency practice",
      grade: "Grade",
      grade5: "Grade 5",
      grade6: "Grade 6",
      path: "My path today",
      time: "Rhythm",
      untimed: "No timer",
      three: "3 minutes",
      twoHalf: "2½ minutes",
      start: "Start a new rhythm",
      stop: "Finish now",
      answer: "Your answer",
      submit: "Answer",
      progress: (done) => `${done} of ${TOTAL_FACTS}`,
      remaining: "remaining",
      gentle: "Work mentally when you can. Stop if it begins to feel tense or tiring.",
      finished: "Rhythm complete",
      score: (correct, attempted) => `${correct} correct from ${attempted} answered`,
      accuracy: (value) => `${value}% accuracy`,
      best: (value) => `Your best accuracy on this device: ${value}%`,
      recovery: "Practise 6 facts to strengthen",
      noMistakes: "You do not need a recovery round this time. Well done.",
      recoveryTitle: "Gentle recovery",
      recoveryIntro: "There is no timer. Use the relationship between multiplication and division, or addition and subtraction.",
      correct: "Correct. Keep going.",
      tryAgain: "Not yet. Notice this fact family and try again.",
      complete: "Recovery complete. You found every fact correctly.",
      family: "Related fact",
      back: "Do another rhythm",
      modeHelp: "Hints appear immediately here and there is no timer.",
      improvement: (value) => value > 0 ? `You improved by ${value} points since your last round.` : value < 0 ? "This was a harder round today. Keep going gently." : "You matched your previous accuracy.",
    },
  };

  let language = document.documentElement.lang.startsWith("pt") ? "pt" : "en";
  let session = null;
  let timerId = null;
  const t = (key, ...args) => typeof words[language][key] === "function" ? words[language][key](...args) : words[language][key];
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function makeFact(operation, gradeLevel) {
    let a;
    let b;
    let answer;
    if (operation === "+") {
      a = random(gradeLevel === "6" ? 12 : 3, gradeLevel === "6" ? 89 : 49);
      b = random(2, gradeLevel === "6" ? 49 : 30);
      answer = a + b;
    } else if (operation === "−") {
      answer = random(1, gradeLevel === "6" ? 49 : 30);
      b = random(2, gradeLevel === "6" ? 49 : 30);
      a = answer + b;
    } else if (operation === "×") {
      a = random(gradeLevel === "6" ? 3 : 2, 12);
      b = random(2, 12);
      answer = a * b;
    } else {
      b = random(2, 12);
      answer = random(2, 12);
      a = b * answer;
    }
    return { a, b, operation, answer, prompt: `${a} ${operation} ${b}` };
  }

  function generateFacts(gradeLevel) {
    const operations = ["+", "−", "×", "÷"];
    const facts = [];
    const seen = new Set();
    operations.forEach((operation) => {
      while (facts.filter((fact) => fact.operation === operation).length < TOTAL_FACTS / 4) {
        const fact = makeFact(operation, gradeLevel);
        if (!seen.has(fact.prompt)) {
          seen.add(fact.prompt);
          facts.push(fact);
        }
      }
    });
    for (let index = facts.length - 1; index > 0; index -= 1) {
      const swap = random(0, index);
      [facts[index], facts[swap]] = [facts[swap], facts[index]];
    }
    return facts;
  }

  function readRecord() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }

  function saveRecord(accuracy, attempted) {
    const records = readRecord();
    const key = `${session.gradeLevel}:${session.path}:${session.mode}`;
    const previous = records[key] || { bestAccuracy: 0, bestAttempted: 0 };
    const change = previous.lastAccuracy == null ? null : accuracy - previous.lastAccuracy;
    records[key] = {
      bestAccuracy: Math.max(previous.bestAccuracy, accuracy),
      bestAttempted: Math.max(previous.bestAttempted, attempted),
      lastAccuracy: accuracy,
      lastAttempted: attempted,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return { ...records[key], change };
  }

  function setupView() {
    clearInterval(timerId);
    timerId = null;
    session = null;
    root.innerHTML = `
      <div class="fact-rhythm__intro">
        <p class="eyebrow">${t("eyebrow")}</p>
        <h3 id="fact-rhythm-title">${t("title")}</h3>
        <p>${t("intro")}</p>
      </div>
      <form class="fact-setup">
        <fieldset><legend>${t("path")}</legend><label><input type="radio" name="fact-path" value="learning" checked /> ${t("readiness")}</label><label><input type="radio" name="fact-path" value="fluency" /> ${t("fluency")}</label></fieldset>
        <fieldset><legend>${t("grade")}</legend><label><input type="radio" name="fact-grade" value="5" checked /> ${t("grade5")}</label><label><input type="radio" name="fact-grade" value="6" /> ${t("grade6")}</label></fieldset>
        <fieldset><legend>${t("time")}</legend><label><input type="radio" name="fact-time" value="0" checked /> ${t("untimed")}</label><label><input type="radio" name="fact-time" value="180" /> ${t("three")}</label><label><input type="radio" name="fact-time" value="150" /> ${t("twoHalf")}</label></fieldset>
        <div class="fact-mode-note"><strong>${t("readiness")}</strong><span>${t("modeHelp")}</span></div>
        <button class="button button--small fact-start" type="submit">${t("start")}</button>
      </form>`;
  }

  function startSession(form) {
    const data = new FormData(form);
    const gradeLevel = data.get("fact-grade");
    const path = data.get("fact-path");
    const seconds = path === "learning" ? 0 : Number(data.get("fact-time"));
    session = { gradeLevel, path, mode: seconds, remaining: seconds, facts: generateFacts(gradeLevel), index: 0, correct: 0, mistakes: [] };
    root.innerHTML = `<div class="fact-session">
      <div class="fact-session__top"><div><p class="eyebrow">${t("fluency")}</p><strong class="fact-progress"></strong></div><strong class="fact-timer"></strong></div>
      <p class="fact-gentle">${t("gentle")}</p>
      <form class="fact-answer-form"><div class="fact-prompt" aria-live="polite"></div><label for="fact-answer">${t("answer")}</label><div class="answer-form__row"><input id="fact-answer" inputmode="numeric" autocomplete="off" required /><button class="button button--small" type="submit">${t("submit")}</button></div><p class="fact-learning-feedback" role="status"></p></form>
      <button class="button button--small button--ghost fact-stop" type="button">${t("stop")}</button>
    </div>`;
    if (seconds) timerId = window.setInterval(tick, 1000);
    renderFact();
  }

  function timerText() {
    if (!session.mode) return t("untimed");
    return `${Math.floor(session.remaining / 60)}:${String(session.remaining % 60).padStart(2, "0")}`;
  }

  function tick() {
    if (!session) return;
    session.remaining -= 1;
    root.querySelector(".fact-timer").textContent = timerText();
    if (session.remaining <= 0) finishSession();
  }

  function renderFact() {
    const fact = session.facts[session.index];
    root.querySelector(".fact-progress").textContent = t("progress", session.index);
    root.querySelector(".fact-timer").textContent = timerText();
    root.querySelector(".fact-prompt").textContent = `${fact.prompt} = ?`;
    root.querySelector(".fact-learning-feedback").textContent = "";
    const input = root.querySelector("#fact-answer");
    input.value = "";
    input.focus();
  }

  function submitFact(value) {
    const fact = session.facts[session.index];
    const isCorrect = Number(String(value).replace(",", ".")) === fact.answer;
    if (!isCorrect && session.path === "learning") {
      root.querySelector(".fact-learning-feedback").textContent = `${t("tryAgain")} ${t("family")}: ${relatedFact(fact)}`;
      root.querySelector("#fact-answer").select();
      return;
    }
    if (isCorrect) session.correct += 1;
    else session.mistakes.push(fact);
    session.index += 1;
    if (session.index >= TOTAL_FACTS) finishSession(); else renderFact();
  }

  function recoveryFacts() {
    const source = session.mistakes.length ? session.mistakes : [];
    const result = [];
    for (let index = 0; result.length < RECOVERY_SIZE && source.length; index += 1) result.push(source[index % source.length]);
    return result;
  }

  function finishSession() {
    clearInterval(timerId);
    timerId = null;
    const attempted = session.index;
    const accuracy = attempted ? Math.round((session.correct / attempted) * 100) : 0;
    const record = saveRecord(accuracy, attempted);
    const hasMistakes = session.mistakes.length > 0;
    root.innerHTML = `<div class="fact-results">
      <p class="eyebrow">${t("finished")}</p><h3>${t("score", session.correct, attempted)}</h3>
      <div class="fact-results__numbers"><strong>${t("accuracy", accuracy)}</strong><span>${t("best", record.bestAccuracy)}</span>${record.change == null ? "" : `<span>${t("improvement", record.change)}</span>`}</div>
      <p>${hasMistakes ? t("gentle") : t("noMistakes")}</p>
      <div class="attempt-actions">${hasMistakes ? `<button class="button button--small fact-recovery" type="button">${t("recovery")}</button>` : ""}<button class="button button--small button--ghost fact-back" type="button">${t("back")}</button></div>
    </div>`;
  }

  function relatedFact(fact) {
    if (fact.operation === "×") return `${fact.answer} ÷ ${fact.a} = ${fact.b}`;
    if (fact.operation === "÷") return `${fact.b} × ${fact.answer} = ${fact.a}`;
    if (fact.operation === "+") return `${fact.answer} − ${fact.a} = ${fact.b}`;
    return `${fact.answer} + ${fact.b} = ${fact.a}`;
  }

  function startRecovery() {
    session.recovery = recoveryFacts();
    session.recoveryIndex = 0;
    root.innerHTML = `<div class="fact-recovery-panel"><p class="eyebrow">${t("recoveryTitle")}</p><h3>${t("recoveryIntro")}</h3><p class="fact-recovery-progress"></p><form class="recovery-answer-form"><div class="fact-prompt"></div><label for="recovery-answer">${t("answer")}</label><div class="answer-form__row"><input id="recovery-answer" inputmode="numeric" autocomplete="off" required /><button class="button button--small" type="submit">${t("submit")}</button></div><p class="recovery-feedback" role="status"></p><p class="recovery-hint" hidden></p></form></div>`;
    renderRecovery();
  }

  function renderRecovery() {
    if (session.recoveryIndex >= session.recovery.length) {
      root.innerHTML = `<div class="fact-results"><p class="eyebrow">${t("recoveryTitle")}</p><h3>${t("complete")}</h3><button class="button button--small fact-back" type="button">${t("back")}</button></div>`;
      return;
    }
    const fact = session.recovery[session.recoveryIndex];
    root.querySelector(".fact-recovery-progress").textContent = `${session.recoveryIndex + 1} / ${RECOVERY_SIZE}`;
    root.querySelector(".fact-prompt").textContent = `${fact.prompt} = ?`;
    root.querySelector(".recovery-feedback").textContent = "";
    root.querySelector(".recovery-hint").hidden = true;
    const input = root.querySelector("#recovery-answer"); input.value = ""; input.focus();
  }

  root.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.matches(".fact-setup")) startSession(event.target);
    else if (event.target.matches(".fact-answer-form")) submitFact(event.target.querySelector("#fact-answer").value);
    else if (event.target.matches(".recovery-answer-form")) {
      const fact = session.recovery[session.recoveryIndex];
      const input = event.target.querySelector("#recovery-answer");
      if (Number(input.value.replace(",", ".")) === fact.answer) {
        session.recoveryIndex += 1;
        renderRecovery();
      } else {
        event.target.querySelector(".recovery-feedback").textContent = t("tryAgain");
        const hint = event.target.querySelector(".recovery-hint"); hint.textContent = `${t("family")}: ${relatedFact(fact)}`; hint.hidden = false; input.select();
      }
    }
  });

  root.addEventListener("click", (event) => {
    if (event.target.closest(".fact-stop")) finishSession();
    if (event.target.closest(".fact-recovery")) startRecovery();
    if (event.target.closest(".fact-back")) setupView();
  });

  window.addEventListener("waldorf-language-change", (event) => { language = event.detail === "en" ? "en" : "pt"; setupView(); });
  setupView();
})();
