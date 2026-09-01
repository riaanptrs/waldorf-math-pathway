const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = vm.createContext({ window: {} });
for (const file of ["exercises.js", "geometry-story-path.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "src", file), "utf8"), context, { filename: file });
}

const expectedIds = [
  "g6-geometry-string-sixfold",
  "g6-geometry-rope-right-angle",
  "g7-geometry-shadow-proportion",
  "g8-geometry-regular-solids",
  "g8-geometry-conic-slices",
  "g9-geometry-earth-circumference",
];

for (const id of expectedIds) {
  const lesson = context.window.lessons.find((item) => item.id === id);
  const translated = context.window.lessonTranslations[id];
  const enPractice = context.window.extraPracticeBank.en[id];
  const ptPractice = context.window.extraPracticeBank.pt[id];
  if (!lesson?.storyModel?.actions?.length || !lesson.guidedSteps?.length) throw new Error(`${id} lacks its English construction or guided steps`);
  if (!translated?.storyModel?.actions?.length) throw new Error(`${id} lacks its Portuguese construction`);
  if (!enPractice || !ptPractice) throw new Error(`${id} lacks bilingual practice`);
}

process.stdout.write(`Validated ${expectedIds.length} original bilingual historical-geometry investigations.\n`);
