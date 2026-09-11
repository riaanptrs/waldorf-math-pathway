const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {} });
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/src="src\/([^"?]+)[^"]*"/g)].map(m => m[1]);
assert(scripts.indexOf('lesson-clarity.js') > scripts.indexOf('curriculum-sequence.js'));
assert(scripts.indexOf('lesson-clarity.js') < scripts.indexOf('app.js'));
let before;
for (const file of scripts) {
  if (['app.js', 'fluency.js', 'geometry-discovery.js'].includes(file)) continue;
  if (file === 'lesson-clarity.js') before = JSON.parse(JSON.stringify(context.window.lessons));
  vm.runInContext(fs.readFileSync(path.join(root, 'src', file), 'utf8'), context, { filename: file });
}
const { lessons, lessonTranslations: translations } = context.window;
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
vm.runInContext('let language = "en";\n' + app.slice(app.indexOf('function warmupFor('), app.indexOf('function previousLessonsFor(')), context);
for (const lesson of lessons) {
  const old = before.find(l => l.id === lesson.id);
  assert.equal(lesson.answer, old.answer, `${lesson.id}: preserve numerical answer`);
  assert.equal(lesson.activityKey, old.activityKey, `${lesson.id}: preserve progress key`);
  for (const lang of ['en', 'pt']) {
    const localized = lang === 'pt' ? { ...lesson, ...translations[lesson.id] } : lesson;
    context.current = localized;
    const copy = vm.runInContext(`language = '${lang}'; ({ warmup: warmupFor(current), discovery: discoveryPromptFor(current), reflection: reflectionPromptFor(current) })`, context);
    assert(copy.warmup.length >= 2, `${lesson.id}/${lang}: warmup`);
    assert(copy.discovery.length > 30 && copy.reflection.length > 30);
    for (const step of localized.guidedSteps || []) {
      assert(step.label && !/^(Etapa|Step|Passo) \d+$/.test(step.label), `${lesson.id}/${lang}: missing step question`);
    }
  }
}
for (let year = 1; year <= 9; year++) {
  const first = lessons.find(l => l.grade === `Grade ${year}`);
  assert(first.warmup?.length && first.discoveryPrompt, `Year ${year}: specific entry activity`);
  assert(translations[first.id].warmup?.length && translations[first.id].discoveryPrompt);
}
// Localized year labels must select the same age-appropriate instructions.
context.current = { grade: '1º ano' };
assert.match(vm.runInContext("language = 'pt'; discoveryPromptFor(current)", context), /Peça ajuda/);
context.current = { grade: 'Grade 1' };
assert.match(vm.runInContext("language = 'en'; reflectionPromptFor(current)", context), /Tell someone/);
assert(lessons.find(l => l.id === 'g7-unit-cost').acceptedAnswers.includes('loja b'));
assert.match(translations['g7-repeating-decimal-fraction'].prompt, /0,363636/);
assert(!lessons.find(l => l.id === 'g9-algebra-system-intersection').prompt.includes('(2, 4)'));
console.log(`Clarity checks passed: ${lessons.length} lessons in both languages; nine opening activities; translated step questions; preserved answers and progress keys.`);
