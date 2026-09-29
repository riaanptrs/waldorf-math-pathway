const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {root, context, lessons, lessonTranslations, extraPracticeBank} = require('./load-catalogue.cjs')();
const added = lessons.filter(lesson => lesson.sequenceLesson && lesson.answerType === 'number');
const index = id => lessons.findIndex(lesson => lesson.id === id);
assert.equal(new Set(lessons.map(lesson => lesson.id)).size, lessons.length, 'unique IDs');
assert.equal(new Set(lessons.map(lesson => lesson.activityKey)).size, lessons.length, 'unique progress keys');
assert.equal(added.length, 30);
for (const lesson of added) {
  for (const id of lesson.recallIds) assert(index(id) >= 0 && index(id) < index(lesson.id), `${lesson.id}: missing or future prerequisite ${id}`);
  for (const [lang, copy] of [['en', lesson], ['pt', lessonTranslations[lesson.id]]]) {
    for (const key of ['title','block','teacherAim','teacherObservation','learningStage','discoveryPrompt','reflectionPrompt','prompt','correction','tutorMistake','tutorCheck']) assert(copy[key]?.length, `${lesson.id}/${lang}/${key}`);
    assert(copy.storyModel.materials && copy.storyModel.actions.length >= 3);
    assert(copy.warmup.length >= 2 && copy.guidedSteps.length >= 2);
    assert(copy.memoryRefresh.method.length >= 2 && copy.memoryRefresh.example);
    assert(Number.isFinite(lesson.answer));
    for (const step of copy.guidedSteps) assert(Number.isFinite(step.answer) && step.label);
    const practice = extraPracticeBank[lang][lesson.id];
    assert.equal(practice.length, 3, `${lesson.id}: independent authored practice`);
    assert.deepEqual(Array.from(practice, item => item.role), ['practiceCore','practiceTransfer','practiceReview']);
    practice.forEach(item => { assert(Number.isFinite(item.answer) && item.prompt && item.hint); assert(item.hint !== item.steps[0], 'hint must not just repeat the solution'); });
  }
  assert.notEqual(lesson.title, lessonTranslations[lesson.id].title);
  assert.deepEqual(Array.from(extraPracticeBank.en[lesson.id], item=>item.answer), Array.from(extraPracticeBank.pt[lesson.id], item=>item.answer));
}
// Independently calculate the main and three practice answers from the stated quantities.
const cases = {
  'g2-bundles-ten-ones': [2*10+3, 4*10+6, Math.floor(32/10), 10+13],
  'g2-bundles-add-exchange': [27+16,36+18,28+15,30+14],
  'g2-bundles-open-ten': [43-16,54-18,32-15,27+16],
  'g2-bundles-shop-check': [50-28,60-37,40-16,20+15],
  'g4-factors-rectangles': [[1,2,3,4,6,12].length,[1,2,3,6,9,18].length,[1,13].length,1+2+3],
  'g4-multiples-shared-landings': [12,15,8,12/3],
  'g5-decimal-join-lengths': [1.25+.8,.6+1.45,2.4+.35,7/10],
  'g5-decimal-ribbon-remainder': [3-2.05,4-1.75,2-.65,1.25+.8],
  'g5-decimal-price-length': [1.25*8,1.5*6,.4*.3,2-.65],
  'g5-decimal-count-pieces': [2/.25,1.5/.25,1.8/.3,.4*.3],
  'g7-signed-cross-zero': [-3+5,-6+4,-2+7,2-5],
  'g7-signed-remove-negative': [4-(-2),1-(-4),-3-(-5),-3+5],
  'g7-signed-product-pattern': [-3*(-2),-4*(-5),4*(-3),3-(-2)],
  'g7-signed-divide-combine': [-2*(5-8),-18/(-3),-4*6+9,-7+10],
  'g1-number-garden-twenty': [14-10,17-10,12,8-5],
  'g1-form-mirror-path': [3*2,4*2,5,10-6],
  'g3-garden-boundary-bed': [4*3,2*(4+3),5*2,2*100],
  'g3-garden-pots-parts': [4*23,3*24,Math.ceil(26/4),60-4*6*2],
  'g5-compass-radius-steps': [6*3,6*4,30/6,2*3],
  'g6-construction-bisectors': [8/2,14/2,80/2,10/2],
  'g6-construction-parallel-angles': [65,48,180-72,90/2],
  'g7-pythagoras-area-proof': [196-4*24,Math.hypot(5,12),Math.sqrt(100-36),8*5/2],
  'g8-box-volume-density': [180/(6*4*3),2*(6*4+6*3+4*3),5*3*2*2,8-12+6],
  'g8-locus-equal-distance': [Math.hypot(3,4),Math.hypot(3,4),Math.hypot(5,12),14/2],
  'g5-data-circle-parts': [3/12*360,6/12*360,3/6*360,12/4],
  'g6-data-bars-key': [8/2,6/2,3*5,8-4],
  'g7-data-scale-comparison': [(50-40)/40*100,(72-60)/60*100,(50-40)/50*100,3*5],
  'g8-data-typical-value': [(2+3+3+4+18)/5,[2,3,3,4,18][2],(2+3+3+4+8)/5,3],
  'g6-interest-formula-table': [300*.04*2,200*.05*3,300+24,5/100],
  'g8-systems-two-purchases': [13-(13+11)/3,(13+11)/3-5,16-(16+14)/3,(17-2)/3]
};
assert.equal(Object.keys(cases).length, added.length);
for (const lesson of added) {
  const actual = [lesson.answer, ...extraPracticeBank.en[lesson.id].map(item=>item.answer)];
  actual.forEach((value,i)=>assert(Math.abs(value-cases[lesson.id][i])<1e-9, `${lesson.id}: arithmetic item ${i}`));
}
// Exercise the real selection and answer-checking code without a browser or account.
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const section = (start,end) => app.slice(app.indexOf(`function ${start}(`),app.indexOf(`function ${end}(`));
vm.runInContext(`let language = 'en'; function lessonCopy(l) { return language === 'pt' ? {...l, ...window.lessonTranslations[l.id]} : l; }\n` + section('extraPracticeFor','availableGrades') + section('previousLessonsFor','renderSpiralRecall') + section('normalizeExpression','correctAnswerText'), context);
for (const lang of ['en','pt']) {
  vm.runInContext(`language = '${lang}'`,context);
  for (const lesson of lessons) {
    context.currentLesson = lesson;
    const items = vm.runInContext('extraPracticeFor(lessonCopy(currentLesson))',context);
    const allowed = new Set([lesson.id,...lessons.slice(0,index(lesson.id)).filter(item=>item.grade===lesson.grade && item.block===lesson.block).map(item=>item.id)]);
    for (const item of items) assert([...allowed].some(id=>[].concat(extraPracticeBank[lang][id]||[]).includes(item)), `${lesson.id}/${lang}: future or mismatched practice`);
    if (lesson.sequenceLesson && lesson.answerType === 'number') {
      assert.equal(items.length,3);
      context.answerConfig = lesson;
      context.goodAnswer = String(lesson.answer).replace('.',lang==='pt'?',':'.');
      assert(vm.runInContext('checkValue(answerConfig, goodAnswer)',context), `${lesson.id}: decimal/sign answer acceptance`);
      context.wrongAnswer = String(lesson.answer+1);
      assert(!vm.runInContext('checkValue(answerConfig, wrongAnswer)',context), `${lesson.id}: reject wrong value`);
    }
  }
}
const precedes=(a,b)=>assert(index(a)<index(b),`${a} must precede ${b}`);
precedes('g4-multiples-shared-landings','g4-fractions-common-denominator');
precedes('g4-jarman-same-ribbon-new-parts','g4-fractions-reduce-same');
precedes('g5-decimal-tenths','g5-decimal-join-lengths');
precedes('g6-construction-parallel-angles','g6-jarman-triangle-reason');
precedes('g7-signed-divide-combine','g7-negative-numbers');
precedes('g7-pythagoras-area-proof','g7-competency-pythagorean-leg');
console.log(`Passed: ${lessons.length} lessons; ${added.length} bilingual additions; 120 independently calculated answers; prior-only practice in both languages; prerequisite order and decimal/signed answer handling.`);
