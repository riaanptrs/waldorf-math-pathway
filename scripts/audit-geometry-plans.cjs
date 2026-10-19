const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {plans}=require('../geometry/plans/authoring.cjs'),{render}=require('../geometry/plans/render.js');
const dir=path.resolve(__dirname,'../geometry/plans');
assert.equal(plans.length,16);assert.equal(new Set(plans.map(p=>p.id)).size,16);
for(const g of [1,2,3,4,5,6,7,8])assert(plans.some(p=>p.grade===g));
function checkLinks(html,file){for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const [url,hash]=m[1].split('#'),target=url?path.resolve(path.dirname(file),url.split('?')[0]):file;assert(fs.existsSync(target),'Missing '+m[1]+' from '+file);if(hash)assert(fs.readFileSync(target,'utf8').includes(`id="${hash}"`),'Missing anchor '+m[1]);}}
for(const p of plans){assert.equal(p.practice.length,3);assert.equal(p.flow.length,4);for(const lang of ['en','pt']){for(const k of ['title','gap','ready','materials','aim','teaching','observe','support','extend'])assert(p[k][lang]?.length>15,`${p.id} missing ${k} ${lang}`);const sum=p.flow.reduce((s,x)=>s+Number(x[lang].match(/^\d+/)[0]),0);assert.equal(sum,p.duration);const html=render(lang,plans,p.id);assert(!/undefined|NaN/.test(html));assert.equal([...html.matchAll(/<h1>/g)].length,1);assert.equal([...html.matchAll(/<details><summary>/g)].length,5);for(const q of p.practice)assert(q.q[lang]&&q.a[lang]);checkLinks(html,path.join(dir,p.id+'.html'));}checkLinks(fs.readFileSync(path.join(dir,p.id+'.html'),'utf8'),path.join(dir,p.id+'.html'));}
for(const lang of ['en','pt'])checkLinks(render(lang,plans,null),path.join(dir,'index.html'));
// Exercise actual page bootstrap and language-change handler without a browser.
for(const id of ['',...plans.map(p=>p.id)]){
 const listeners={},main={innerHTML:''},select={value:'pt',addEventListener:(event,fn)=>listeners[event]=fn},label={},skip={};let saved='en';
 const document={body:{dataset:{plan:id}},documentElement:{},getElementById:k=>k==='course'?main:k==='plan-language'?select:label,querySelector:()=>skip};
 const context=vm.createContext({window:{},document,localStorage:{getItem:()=>saved,setItem:(k,v)=>saved=v}});
 for(const f of ['data.js','diagrams.js','render.js'])vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),context);
 assert.equal(document.documentElement.lang,'en');assert(main.innerHTML.includes(id?plans.find(p=>p.id===id).title.en:'Geometry lesson plans by grade'));
 select.value='pt';listeners.change();assert.equal(document.documentElement.lang,'pt-BR');assert.equal(saved,'pt');assert(main.innerHTML.includes(id?plans.find(p=>p.id===id).title.pt:'Planos de geometria por ano'));
}
// Independently verify the core area and construction examples.
assert.equal(8**2-4*(4*4/2),32);assert.equal(4*(4*4/2),2*4**2);assert.equal(3**2*2,18);assert.equal(360/8,45);assert.equal(180-112,68);assert.equal(7+5-6,6);
// Cyclic model: each corner lies on radius 105. Midpoint-circle intersections exist.
for(const [x,y]of [[344,67],[344,193],[176,193],[176,67]])assert.equal(Math.hypot(x-260,y-130),105);
assert(4>6/2);assert(2<6/2);
console.log('16 bilingual plans: coverage, timed sequences, answers, static links, 17 language-switch flows and mathematical fixtures passed.');
