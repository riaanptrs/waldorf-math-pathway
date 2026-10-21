const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'math-blocks'),context=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),context);
const data=JSON.parse(JSON.stringify(context.window.MathBlocksData)),R=require('../math-blocks/render.js'),M=require('../math-blocks/models.js');
assert.equal(data.blocks.length,18);assert.equal(data.lessons.length,20);assert.equal(data.sources.length,8);
const catalogue=require('./load-catalogue.cjs')();assert.equal(catalogue.lessons.length,227);
assert.equal(new Set(data.lessons.map(l=>l.id)).size,20);
for(let grade=1;grade<=8;grade++)assert(data.blocks.some(b=>b.grade===grade));
assert.equal(data.sources.find(s=>s.grade===6).scope,'cover-only');assert.equal(data.sources.find(s=>s.grade===6).pages,1);
assert(data.blocks.filter(b=>b.grade===6).every(b=>!b.verified));assert(data.lessons.every(l=>l.grade!==6));
assert.equal(data.lessons.filter(l=>l.basis==='standards-expansion').length,2);
for(const item of [...data.blocks,...data.lessons]){
 const source=data.sources.find(s=>s.grade===item.grade);
 for(const num of (item.pages.replace(/\([^)]*\)/g,'').match(/\d+/g)||[]))assert(Number(num)>=1&&Number(num)<=source.pages,item.id+' source bound');
}
for(const b of data.blocks){
 assert(b.sequence.length>0);
 for(const lang of ['en','pt'])for(const field of ['title','when','why','how','online','note'])assert(b[field][lang].length>(field==='when'?3:10),b.id+'/'+field);
 for(const step of b.sequence){assert(step.topic.en&&step.topic.pt);for(const key of step.routes)assert(data.routes[key],b.id+' route '+key);}
}
const checks={
 'N1-01':[5+2,5-1,10-1], 'N1-02':[3*3,2*5,8], 'N2-01':[10%10,5*3,4*3],
 'N2-02':[9*8,7+2,9*0], 'N2-03':[19-16,2*8,3*5], 'N3-01':[60-45+10,50-20,60],
 'N3-02':[3*2,4*3,6-4], 'N4-01':[24*3,47*2,58*4], 'N4-02':[26*14,43*21,32*12],
 'N4-03':[105*12,302*13,240*15], 'N4-04':[(3+6+9)/3,(5+5+9+9)/4,3*8],
 'N4-05':[5,3,2*2*3*3], 'N5-01':[360/12,60/2,360], 'N5-02':[2*2.54,12.7/2.54,.5*100],
 'N5-03':[2,90,2*3.5], 'N7-01':[360/16,16/2,90/4],
 'N8-01':[[1,2,3,4,5,6,7,8,9,10,11,12].filter(n=>n%2===0&&n%3===0).length,8,4],
 'N8-02':[2*5+4,5**2,4*5+4+1], 'N8-04':[(4/3)*3.14*3**3,2**3,10/2], 'N8-03':[100/4,6/20*100,7+5]
};
for(const l of data.lessons){
 assert.equal(l.practice.length,3);assert(l.steps.length>=3&&l.pages);
 assert(data.blocks.some(b=>b.sequence.some(s=>s.routes.includes(l.id))),l.id+' unassigned');
 for(const lang of ['en','pt']){
  for(const key of ['title','goal','story','explain','worked','observe','recall'])assert(l[key][lang].length>15,l.id+'/'+key+'/'+lang);
  for(const p of l.practice)assert(p.q[lang]&&p.solution[lang]&&Number.isFinite(p.answer));
 }
 l.practice.forEach((p,i)=>assert(Math.abs(p.answer-checks[l.id][i])<1e-8,l.id+' answer '+i));
 for(const key of l.links)assert(data.routes[key],l.id+' prerequisite '+key);
 for(const lang of ['en','pt']){
  const setup=M.setup(l);
  for(const n of [setup.min,setup.value,setup.max]){
   const html=M.picture(l,lang,n);assert(!/NaN|undefined|Infinity/.test(html),l.id+' model '+n);assert(html.includes('<svg')&&html.includes('role="img"'));
  }
 }
}
function checkLinks(html,file){for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 const [url,hash]=m[1].split('#');const target=path.resolve(path.dirname(file),url.split('?')[0]||path.basename(file));
 assert(fs.existsSync(target),file+' missing '+m[1]);
 if(hash?.startsWith('practice:'))assert(catalogue.lessons.some(l=>l.id===hash.slice(9)),'unknown catalogue hash');
 else if(hash)assert(fs.readFileSync(target,'utf8').includes(`id="${hash}"`),'missing anchor '+hash);
}}
for(const id of ['', 'teacher',...data.blocks.map(b=>b.id),...data.lessons.map(l=>l.id)]){
 const file=path.join(dir,id?(id.startsWith('N')?'lessons/':'')+id+'.html':'index.html');
 const html=fs.readFileSync(file,'utf8');assert.equal([...html.matchAll(/<h1>/g)].length,1);checkLinks(html,file);
 assert(html.includes(R.render(data,'pt',id||null)),id+' stale build');
 for(const lang of ['en','pt']){const h=R.render(data,lang,id||null);assert(!/undefined|NaN/.test(h),id);checkLinks(h,file);}
 // Exercise real bootstrap, language switching, model input and question submit handlers.
 const l=data.lessons.find(x=>x.id===id),select={value:'pt',listeners:{},addEventListener(k,fn){this.listeners[k]=fn;}},label={},skip={};
 const element=()=>({value:'',textContent:'',innerHTML:'',listeners:{},addEventListener(k,fn){this.listeners[k]=fn;}});
 const slider=element(),output=element(),picture=element(),box={dataset:{model:id},querySelector:s=>s==='input'?slider:s==='output'?output:picture};
 const forms=l?l.practice.map((q,i)=>{const input=element(),feedback=element();return {dataset:{question:String(i)},input,feedback,listeners:{},querySelector:s=>s==='input'?input:feedback,addEventListener(k,fn){this.listeners[k]=fn;}};}):[];
 const main={innerHTML:'',querySelectorAll:s=>s==='[data-model]'?(l?[box]:[]):forms};
 const document={body:{dataset:{block:id}},documentElement:{},getElementById:k=>k==='block-main'?main:k==='block-language'?select:label,querySelector:()=>skip};let saved='en';
 const c=vm.createContext({window:{},document,localStorage:{getItem:()=>saved,setItem:(k,v)=>saved=v}});
 for(const f of ['data.js','models.js','render.js'])vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),c);
 assert.equal(document.documentElement.lang,'en');assert.equal(main.innerHTML,R.render(data,'en',id||null));
 select.value='pt';select.listeners.change();assert.equal(saved,'pt');assert.equal(document.documentElement.lang,'pt-BR');assert.equal(main.innerHTML,R.render(data,'pt',id||null));
 if(l){slider.value=String(M.setup(l).min);slider.listeners.input();assert.equal(picture.innerHTML,M.picture(l,'pt',slider.value));
  for(const f of forms){let prevented=false;f.input.value=String(l.practice[Number(f.dataset.question)].answer).replace('.',',');f.listeners.submit({preventDefault:()=>prevented=true});assert(prevented);assert(f.feedback.textContent.includes('confere'));f.input.listeners.input();assert.equal(f.feedback.textContent,'');f.input.value='nonsense';f.listeners.submit({preventDefault(){}});assert(f.feedback.textContent.includes('Digite'));f.input.value=String(l.practice[Number(f.dataset.question)].answer+1);f.listeners.submit({preventDefault(){}});assert(f.feedback.textContent.includes('Reveja'));}
 }
}
for(const value of ['',' ','.',',','0x10','Infinity','1e3','12abc','2,3,4'])assert.equal(R.parseAnswer(value),null);
assert.equal(R.check('22,5',22.5),'correct');assert.equal(R.check('5.08',5.08),'correct');assert.equal(R.check('0',0),'correct');assert.equal(R.check('1',0),'retry');
// Independent chord-cycle, angle, factor and base invariants.
for(const [step,want]of [[5,16],[6,8],[7,16]]){const seen=new Set();let p=0;do{seen.add(p);p=(p+step)%16;}while(p);assert.equal(seen.size,want);}
for(let n=0;n<=60;n++){const digits=[Math.floor(n/25),Math.floor(n%25/5),n%5];assert(digits.every(x=>x>=0&&x<5));assert.equal(digits[0]*25+digits[1]*5+digits[2],n);}
console.log('18 block routes and 20 bilingual lessons: 60 independently checked answers, source limits, all static links, 40 language flows, interactive controls and answer handlers passed. Existing 227-lesson catalogue retained.');
