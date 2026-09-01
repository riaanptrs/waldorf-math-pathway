const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const scripts = [
  "exercises.js",
  "grade1-living-numbers.js",
  "grade2-time-patterns-money.js",
  "grade3-measure-place-value.js",
  "grade3-4-subtraction-path.js",
  "grade4-6-long-division-path.js",
  "grade5-fractions.js",
  "harrer-early-path.js",
  "grade4-fraction-path.js",
  "grade7-ratios.js",
  "grade8-proportions.js",
  "grade9-algebra.js",
  "grade6-9-competency-path.js",
  "curriculum-sequence.js",
];

const context = vm.createContext({ window: {} });
for (const file of scripts) {
  const source = fs.readFileSync(path.join(root, "src", file), "utf8");
  vm.runInContext(source, context, { filename: file });
}

const lessons = context.window.lessons || [];
const translations = context.window.lessonTranslations || {};
const banks = context.window.extraPracticeBank || { en: {}, pt: {} };
const byGrade = new Map();

for (const lesson of lessons) {
  const row = byGrade.get(lesson.grade) || { lessons: [], blocks: [] };
  row.lessons.push(lesson);
  if (row.blocks.at(-1) !== lesson.block) row.blocks.push(lesson.block);
  byGrade.set(lesson.grade, row);
}

const report = {};
for (const [grade, row] of byGrade) {
  report[grade] = {
    lessonCount: row.lessons.length,
    blocksInDisplayedOrder: row.blocks,
    missing: {
      teacherAim: row.lessons.filter((x) => !x.teacherAim).map((x) => x.id),
      rhythm: row.lessons.filter((x) => !Array.isArray(x.rhythm) || !x.rhythm.length).map((x) => x.id),
      memoryRefresh: row.lessons.filter((x) => !x.memoryRefresh).map((x) => x.id),
      guidedSteps: row.lessons.filter((x) => !Array.isArray(x.guidedSteps) || !x.guidedSteps.length).map((x) => x.id),
      englishPractice: row.lessons.filter((x) => !banks.en?.[x.id]).map((x) => x.id),
      portuguesePractice: row.lessons.filter((x) => !banks.pt?.[x.id]).map((x) => x.id),
      portugueseTranslation: row.lessons.filter((x) => !translations[x.id]).map((x) => x.id),
    },
    lessons: row.lessons.map((x) => ({ id: x.id, block: x.block, title: x.title })),
  };
}

process.stdout.write(JSON.stringify({ totalLessons: lessons.length, grades: report }, null, 2));
