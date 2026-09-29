const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const c = require('./load-catalogue.cjs')();
const {lessons, lessonTranslations: pt, extraPracticeBank: bank, context} = c;
const index = id => lessons.findIndex(l => l.id === id);
assert.equal(lessons.length, 227);
assert.equal(c.originalPracticeExtensions.length, 172);
let count = 0;
for (const lesson of lessons) {
  const enItems = bank.en[lesson.id], ptItems = bank.pt[lesson.id];
  assert(enItems.length >= 3 && enItems.length <= 4, lesson.id);
  assert.equal(enItems.length, ptItems.length, lesson.id + ': bilingual coverage');
  count += enItems.length;
  for (const copy of [lesson, pt[lesson.id]]) {
    for (const field of ['learningStage','teacherObservation','tutorMistake','tutorCheck','teachingRhythm']) assert(copy[field]?.length, lesson.id + '/' + field);
  }
  for (const id of lesson.recallIds || []) assert(index(id) >= 0 && index(id) < index(lesson.id), lesson.id + ': prior recall');
  for (const [i, item] of enItems.entries()) {
    const translated = ptItems[i];
    assert(item.prompt && translated.prompt && item.hint && translated.hint && item.steps?.length && translated.steps?.length);
    assert.equal(item.role, translated.role);
    assert.equal(item.answerType, translated.answerType);
    assert.equal(item.answer, translated.answer);
    if (lesson.id === 'g7-unit-cost' && i === 0) {
      assert.equal(item.acceptedAnswers[0], translated.acceptedAnswers[0]); // store A / loja A
    } else assert.deepEqual(item.acceptedAnswers, translated.acceptedAnswers, lesson.id + ': same mathematical answer');
    if (item.answerType === 'number') assert(Number.isFinite(item.answer));
    else assert(item.acceptedAnswers?.length);
    if (item.reviewSourceId) assert(index(item.reviewSourceId) < index(lesson.id), 'review must not introduce a future topic');
  }
  assert(enItems.some(p => p.role === 'practiceCore') && enItems.some(p => p.role === 'practiceTransfer') && enItems.some(p => p.role === 'practiceReview'));
}
assert.equal(count, 683);
// Compare original lessons against the released catalogue, not a new hand-maintained copy.
const baseline = vm.createContext({window:{}});
const gitText = file => execFileSync('git', ['show', `a28cb73593994029aeb44bcc07d14f48cb60f15d:${file}`], {cwd:c.root, encoding:'utf8'});
for (const match of gitText('index.html').matchAll(/src="src\/([^"?]+)[^"]*"/g)) {
  if (['app.js','fluency.js'].includes(match[1])) continue;
  vm.runInContext(gitText('src/' + match[1]), baseline);
}
assert.equal(baseline.window.lessons.length, 192);
for (const old of baseline.window.lessons) {
  const current = lessons.find(l => l.id === old.id);
  assert(current, 'original lesson retained: ' + old.id);
  assert.equal(current.activityKey, old.activityKey);
  assert.equal(current.answer, old.answer);
  assert.equal(JSON.stringify(current.acceptedAnswers), JSON.stringify(old.acceptedAnswers));
}
// Independent arithmetic checks from the quantities in higher-risk transfer prompts.
const checks = {
  'g3-capacity-kitchen': (1000-500)/250,
  'g3-perimeter-garden': 2*(4+3)-1,
  'g3-subtraction-ungrouping': 43+28,
  'g4-subtraction-through-zero': 1000-476,
  'g4-division-remainder-meaning': Math.ceil(98/6),
  'g4-square-patterns': 6**2-5**2,
  'g5-division-two-digit-divisor': 3528/14,
  'g5-fraction-division-sharing': 1.5/.25,
  'g6-competency-long-division-check': Math.floor(2180/36),
  'g7-divisibility-check': Array.from({length:10},(_,i)=>i).find(n=>(420+n)%9===0),
  'g7-percent-base': 90/.75-90,
  'g7-compound-interest': 100*1.1**2-100,
  'g7-ratios-part-of-whole': 14/2*(2+5),
  'g7-ratios-share-three': 360/(2+3+4)*(4-2),
  'g7-ratios-similar-figures': 3*2*(4+6),
  'g7-ratios-lever': 12*2/3,
  'g7-unit-cost': 20-5*3.5,
  'g7-competency-percent-change': 100*1.2*.8,
  'g7-competency-pythagorean-leg': Math.sqrt(13**2-12**2),
  'g8-proportions-inverse': 4*6/3,
  'g8-proportions-capstone': 6*2*5+10,
  'g8-cylinder-volume': 125.6/(3.14*2**2),
  'g8-competency-trapezoid-area': 48*2/(6+10),
  'g8-competency-cylinder-surface': 2**2+2*2*5,
  'g9-algebra-substitution': (-3)**2-2*(-3),
  'g9-algebra-signed-equation': 14/-2+3,
  'g9-algebra-fraction-equation': 10/(1/2+1/3),
  'g9-competency-quadratic-geometry': 2*(6+8),
  'g9-competency-growth-check': 144/1.2,
};
for (const [id, expected] of Object.entries(checks)) assert(Math.abs(bank.en[id].find(p=>p.originalTransfer).answer-expected)<1e-8,id);
// Use the actual answer checker, including its polynomial branch.
const app = fs.readFileSync(path.join(c.root,'src/app.js'),'utf8');
const section = (start,end) => app.slice(app.indexOf(`function ${start}(`), app.indexOf(`function ${end}(`));
vm.runInContext(section('normalizeExpression','correctAnswerText') + app.match(/function lessonFromHash\(hash\) \{[\s\S]*?\n\}/)[0], context);
const identities = {
  'g7-algebra-distribute-bracket': [x=>3*(2*x+1),x=>4*(x+2),x=>-2*(3*x-4),x=>3*x+5+2*x-1],
  'g7-algebra-two-brackets': [x=>(x+2)*(x+3),x=>(x+1)*(x+5),x=>(2*x+1)*(x+3),x=>-3*(x-2)],
  'g7-algebra-square-sum': [x=>(2*x+2)**2,x=>(x+4)**2,x=>(3*x+1)**2,x=>(x+2)*(x+4)],
  'g7-algebra-square-difference': [x=>(3*x-2)**2,x=>(x-3)**2,x=>(2*x-1)**2,x=>(x+2)**2],
  'g7-algebra-opposite-brackets': [x=>(2*x+3)*(2*x-3),x=>(x+5)*(x-5),x=>(3*x+2)*(3*x-2),x=>(2*x+1)**2],
};
for (const [id, expected] of Object.entries(identities)) {
  const lesson = lessons.find(l=>l.id===id);
  assert(lesson.storyModel.actions.length>=3 && pt[id].storyModel.actions.length>=3);
  assert(lesson.guidedSteps.length>=2 && pt[id].guidedSteps.length>=2);
  const configs = [lesson,...bank.en[id]];
  for (const [i, config] of configs.entries()) {
    for (const x of [-3,-1,0,1,2,5]) {
      const calculated = config.polynomial.reduce((sum,k,power)=>sum+k*x**power,0);
      assert(Math.abs(calculated-expected[i](x))<1e-9,id + ': four-product identity');
    }
    context.answerConfig=config;
    context.good=config.acceptedAnswers[0];
    assert(vm.runInContext('checkValue(answerConfig,good)',context));
    context.good=config.acceptedAnswers[0].replace(/\^2/g,'²').replace(/-/g,'−');
    assert(vm.runInContext('checkValue(answerConfig,good)',context));
  }
}
context.answerConfig=lessons.find(l=>l.id==='g7-algebra-square-sum');
for (const good of ['4x^2+8x+4','4x² + 8x + 4','4*x*x+8*x+4','4+8x+4x^2','4,0x²+8,0x+4']) {
  context.good=good; assert(vm.runInContext('checkValue(answerConfig,good)',context),good);
}
for (const bad of ['4x²+4','4x²+4x+4','4x²−8x+4','(2x+2)^2','4x²+4x+4x+4','4x2+8x+4','4x²++8x+4','4x²+8x+4*','','x/0','NaN','alert(1)','<img src=x onerror=alert(1)>','x'.repeat(251)]) {
  context.bad=bad; assert(!vm.runInContext('checkValue(answerConfig,bad)',context),'must reject: '+bad);
}
assert.equal(vm.runInContext("lessonFromHash('#practice:g7-algebra-square-sum').id",context),'g7-algebra-square-sum');
assert.equal(vm.runInContext("lessonFromHash('#practice:g7-missing-lesson')",context),undefined);
assert.equal(vm.runInContext("lessonFromHash('#practice')",context),null);
console.log(`Passed: ${lessons.length} lessons, ${count} bilingual practice placements, 172 new applications, all 192 original keys/answers preserved; 20 polynomial identities and notation/error handling verified.`);
