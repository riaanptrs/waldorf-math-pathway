const assert = require('node:assert/strict');
const path = require('node:path'), http = require('node:http'), fs = require('node:fs');
const { chromium } = require('playwright');
const data = require('../compound-proportion/authoring.cjs');
const core = require('../compound-proportion/core.js');
const items = [...data.examples, ...data.practice];
// Agreed answers, calculated independently from the original scenarios.
const expected = [360,4,5,1200,1800,480,900,600,180,6,12,15,10,10,5,10,5,1920];
assert.equal(data.examples.length,3); assert.equal(data.practice.length,15);
for (const [i,p] of items.entries()) {
  assert.equal(p.answer,expected[i],p.id);
  const cal = core.calculation(p), trace = core.divisionTrace(cal.cross,cal.numerator);
  assert.equal(trace.quotient,expected[i],p.id+' written quotient');
  assert.equal(trace.stages.at(-1).remainder,0,p.id+' exact division');
  for(const stage of trace.stages) {
    assert.equal(stage.product+stage.remainder,stage.partial);
    assert(stage.remainder>=0 && stage.remainder<trace.reducedDivisor);
    if(stage.nextDigit!==null) assert.equal(stage.nextPartial,10*stage.remainder+stage.nextDigit);
  }
  assert.equal(p.columns.filter(c=>c.after===null).length,1);
  // A constant output per total combined working time must hold in both rows.
  const rate = row => {
    const get = c => c[row]===null ? expected[i] : c[row];
    return get(p.columns.find(c=>c.role==='output')) / p.columns.filter(c=>c.role==='input').reduce((n,c)=>n*get(c),1);
  };
  assert(Math.abs(rate('before')-rate('after'))<1e-8,p.id+' independent rate');
  for (const lang of ['en','pt']) {
    const steps = core.steps(p,lang);
    assert(steps.length>=12);
    for (const s of steps) {
      assert(s.question && s.hint && s.explanation);
      assert.equal(core.check(String(s.answer),s),'correct');
      assert.equal(core.check('',s),'invalid');
    }
  }
}
assert.equal(core.check('1920,0',{kind:'number',answer:1920}),'correct');
assert.equal(core.check('NaN',{kind:'number',answer:1920}),'invalid');
assert.equal(core.check('1920 tonnes',{kind:'number',answer:1920}),'invalid');
const last = core.calculation(data.practice[14]);
assert.deepEqual([last.numerator,last.denominator,last.cross],[240,960,460800]);
assert(core.division(460800,240,'en').some(s=>s.includes('Write 0 in the quotient')));
assert.deepEqual(core.divisionTrace(460800,240).stages.map(s=>[s.partial,s.quotientDigit,s.product,s.remainder]),[[46,1,24,22],[220,9,216,4],[48,2,48,0],[0,0,0,0]]);

(async()=>{
  const root=path.resolve(__dirname,'..');
  const server=http.createServer((req,res)=>{
    const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root+path.sep)) {res.statusCode=403;res.end();return;}
    try {res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}
    catch {res.statusCode=404;res.end();}
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  let browser;
  try {
    browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
    const page=await browser.newPage();
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    const url=`http://127.0.0.1:${server.address().port}/compound-proportion/index.html`;
    await page.goto(url+'#practice-15');
    await page.selectOption('#compound-language','en');
    assert.equal(await page.locator('.guide').count(),0,'no solution before practice attempt');
    assert.equal(await page.locator('[data-action="help"]').count(),0);
    await page.locator('#final-form button').click();
    assert.match(await page.locator('#final-feedback').innerText(),/Enter a number/);
    assert.equal(await page.locator('[data-action="help"]').count(),0,'empty input does not count as attempt');
    await page.locator('#final-value').fill('100');
    await page.locator('#final-form button').click();
    assert.match(await page.locator('#final-feedback').innerText(),/does not match/);
    assert.equal(await page.locator('.guide').count(),0,'wrong answer offers rather than forces help');
    await page.locator('[data-action="help"]').click();
    assert.equal(await page.locator('#step-form').count(),1);
    assert.equal(await page.locator('.explanation').count(),0);
    await page.locator('input[type=radio][value=trucks]').check();
    await page.locator('#step-form button').click();
    assert.equal(await page.locator('[data-action="next"]').count(),0);
    await page.locator('[data-action="hint"]').click();
    assert.equal(await page.locator('.hint').count(),1);
    assert.equal(await page.locator('.explanation').count(),0,'hint does not reveal solution');
    await page.locator('[data-action="explain"]').click();
    assert.match(await page.locator('.explanation').innerText(),/completed with help/);
    await page.locator('[data-action="next"]').click();
    await page.selectOption('#compound-language','pt');
    assert.match(await page.locator('.guide .eyebrow').innerText(),/Passo 2/,'language preserves step');
    await page.selectOption('#problem-picker','practice-8');
    await page.selectOption('#problem-picker','practice-15');
    assert.match(await page.locator('.guide .eyebrow').innerText(),/Passo 2/,'navigation preserves working');
    await page.locator('[data-action="restart"]').click();
    assert.equal(await page.locator('.guide').count(),0,'restart restores answer-first flow');

    // Real browser submissions through every question in both languages.
    for (const lang of ['en','pt']) for (const p of items) {
      await page.goto(url+'#'+p.id);
      await page.selectOption('#compound-language',lang);
      await page.locator('[data-action="restart"]').click();
      if(p.mode==='practice') {
        await page.locator('#final-value').fill('0');
        await page.locator('#final-form button').click();
        await page.locator('[data-action="help"]').click();
      }
      for(const [i,s] of core.steps(p,lang).entries()) {
        if(s.division) {
          assert.equal(await page.locator('#division-board svg').count(),1,'written calculation visible before answering');
          if(p.id==='practice-15' && s.division.index===3 && s.division.phase==='quotient') {
            assert(!(await page.locator('#division-board svg').getAttribute('aria-label')).includes('1920'),'last quotient zero is not revealed prematurely');
          }
        }
        if(s.kind==='choice') await page.locator(`input[type=radio][value="${s.answer}"]`).check();
        else await page.locator('#step-value').fill(String(s.answer));
        await page.locator('#step-form button').click();
        assert.match(await page.locator('#step-feedback').innerText(),lang==='pt'?/confere/:/checks out/,p.id+' step '+i);
        assert.equal(await page.locator('.explanation').count(),1);
        if(p.id==='practice-15' && s.division?.phase==='complete') {
          await page.locator('#division-board').screenshot({path:`/tmp/written-division-${lang}.png`});
          await page.setViewportSize({width:320,height:900});
          assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'written division fits 320px');
          await page.setViewportSize({width:1280,height:900});
        }
        await page.locator('[data-action="next"]').click();
      }
      assert.equal(await page.locator('#step-form').count(),0);
      assert.match(await page.locator('#step-heading').innerText(),lang==='pt'?/percorreu/:/worked through/);
      await page.locator('#final-value').fill(String(p.answer)+(lang==='pt'?',0':'.0'));
      await page.locator('#final-form button').click();
      assert.match(await page.locator('#final-feedback').innerText(),lang==='pt'?/confere/:/checks out/);
      await page.locator('#final-value').fill('1');
      assert.equal(await page.locator('#final-feedback').innerText(),'','edited answer clears stale success');
    }
    await page.goto(url+'#example-1');
    await page.locator('[data-action="restart"]').click();
    await page.locator('input[type=radio][value=tonnes]').check();
    await page.locator('#step-form button').click();
    await page.locator('input[type=radio][value=trucks]').check();
    assert.equal(await page.locator('[data-action="next"]').count(),0,'edited step clears success');
    assert.equal(await page.locator('.explanation').count(),0);
    for(const width of [320,390,768,1280]) {
      await page.setViewportSize({width,height:1000});
      assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),`overflow at ${width}`);
    }
    await page.screenshot({path:'/tmp/compound-proportion-desktop.png',fullPage:true});
    await page.setViewportSize({width:390,height:900});
    await page.screenshot({path:'/tmp/compound-proportion-mobile.png',fullPage:true});
    const offline=await browser.newContext({javaScriptEnabled:false});
    const fallback=await offline.newPage(); await fallback.goto(url);
    assert.equal(await fallback.locator('noscript details').count(),18);
    await fallback.locator('noscript details').last().locator('summary').click();
    assert.match(await fallback.locator('noscript details').last().innerText(),/460800/);
    await offline.close();
    await page.goto(url+'#practice-15');await page.reload();
    assert.equal(await page.locator('.guide').count(),0,'reload clears responses');
    assert.deepEqual(errors,[]);
    console.log('Passed: 18 independently checked answers; all guided submissions in both languages; answer-first gating, optional help, hints, assisted steps, language/navigation retention, stale feedback, reset, zero digits in division, no-script solutions and 320–1280px layouts.');
  } finally {if(browser) await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
