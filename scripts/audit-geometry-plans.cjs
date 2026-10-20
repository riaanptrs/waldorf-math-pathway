const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {plans}=require('../geometry/plans/authoring.cjs'),{render}=require('../geometry/plans/render.js');
const dir=path.resolve(__dirname,'../geometry/plans');
assert.equal(plans.length,26);assert.equal(new Set(plans.map(p=>p.id)).size,26);
for(const [grade,count] of [[1,1],[2,1],[3,1],[4,5],[5,5],[6,3],[7,3],[8,7]])assert.equal(plans.filter(p=>p.grade===grade).length,count);
for(const g of [1,2,3,4,5,6,7,8])assert(plans.some(p=>p.grade===g));
function checkLinks(html,file){for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const [url,hash]=m[1].split('#'),target=url?path.resolve(path.dirname(file),url.split('?')[0]):file;assert(fs.existsSync(target),'Missing '+m[1]+' from '+file);if(hash)assert(fs.readFileSync(target,'utf8').includes(`id="${hash}"`),'Missing anchor '+m[1]);}}
for(const p of plans){assert.equal(p.practice.length,3);assert.equal(p.flow.length,4);for(const lang of ['en','pt']){for(const k of ['title','gap','ready','materials','aim','teaching','observe','support','extend'])assert(p[k][lang]?.length>15,`${p.id} missing ${k} ${lang}`);const sum=p.flow.reduce((s,x)=>s+Number(x[lang].match(/^\d+/)[0]),0);assert.equal(sum,p.duration);const html=render(lang,plans,p.id);assert(!/undefined|NaN/.test(html));assert.equal([...html.matchAll(/<h1>/g)].length,1);assert.equal([...html.matchAll(/<details><summary>/g)].length,5);for(const q of p.practice)assert(q.q[lang]&&q.a[lang]);checkLinks(html,path.join(dir,p.id+'.html'));}checkLinks(fs.readFileSync(path.join(dir,p.id+'.html'),'utf8'),path.join(dir,p.id+'.html'));}
for(const lang of ['en','pt'])checkLinks(render(lang,plans,null),path.join(dir,'index.html'));
// Exercise actual page bootstrap and language-change handler without a browser.
for(const id of ['',...plans.map(p=>p.id)]){
 const listeners={},main={innerHTML:''},select={value:'pt',addEventListener:(event,fn)=>listeners[event]=fn},label={},skip={};let saved='en';
 const document={body:{dataset:{plan:id}},documentElement:{},getElementById:k=>k==='course'?main:k==='plan-language'?select:label,querySelector:()=>skip};
 const context=vm.createContext({window:{},document,localStorage:{getItem:()=>saved,setItem:(k,v)=>saved=v}});
 for(const f of ['data.js','diagrams.js','../source-figures.js','render.js'])vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),context);
 assert.equal(document.documentElement.lang,'en');assert(main.innerHTML.includes(id?plans.find(p=>p.id===id).title.en:'Geometry lesson plans by grade'));
 select.value='pt';listeners.change();assert.equal(document.documentElement.lang,'pt-BR');assert.equal(saved,'pt');assert(main.innerHTML.includes(id?plans.find(p=>p.id===id).title.pt:'Planos de geometria por ano'));
}
// Independently verify the core area and construction examples.
assert.equal(8**2-4*(4*4/2),32);assert.equal(4*(4*4/2),2*4**2);assert.equal(3**2*2,18);assert.equal(360/8,45);assert.equal(180-112,68);assert.equal(7+5-6,6);
// Cyclic model: each corner lies on radius 105. Midpoint-circle intersections exist.
for(const [x,y]of [[344,67],[344,193],[176,193],[176,67]])assert.equal(Math.hypot(x-260,y-130),105);
assert(4>6/2);assert(2<6/2);
// Verify references against this transcription’s actual captured-page count.
for(const p of plans){for(const [pages,max]of [[p.source.slice(1),p.source[0]==='J'?249:87],...(p.jarman?[[p.jarman,249]]:[])])for(const range of pages.split(',')){const [a,b=a]=range.split('–').map(Number);assert(a>=1&&a<=b&&b<=max,p.id+' invalid source range');}}
const close=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
// The equal-area transformation uses a genuine parallel and preserves signed-region areas.
const A=[0,0],B=[6,0],C=[4,3],E=[0,-4.5];
const cross=(u,v)=>u[0]*v[1]-u[1]*v[0],sub=(u,v)=>u.map((x,i)=>x-v[i]);
close(cross(sub(E,B),sub(C,A)),0);close(Math.abs(cross(sub(B,A),sub(C,A)))/2,Math.abs(cross(sub(E,A),sub(C,A)))/2);
close((6+4)*3/2,7.5*4/2);assert.notEqual(Math.hypot(4,6),Math.hypot(3,8));close(4*6/2,3*8/2);
// Constant-sum ellipse and constant-distance sliding midpoint, across many positions.
for(let i=0;i<=24;i++){const t=i*Math.PI/12,P=[5*Math.cos(t),4*Math.sin(t)];close(Math.hypot(P[0]-3,P[1])+Math.hypot(P[0]+3,P[1]),10);}
for(const length of [10,14])for(let i=0;i<=12;i++){const t=i*Math.PI/24,x=length*Math.cos(t),y=length*Math.sin(t);close(Math.hypot(x/2,y/2),length/2);}
close(36*9/3,108);close(Math.PI*9*10/3,30*Math.PI);close(3*72/24,9);close(360/16,22.5);close(9*2/3,6);
// The right-triangle centres example: O is equidistant from vertices, G divides each median 2:1.
const vertices=[[0,0],[8,0],[0,6]],O=[4,3],G=[8/3,2];vertices.forEach(v=>close(Math.hypot(v[0]-O[0],v[1]-O[1]),5));
vertices.forEach((v,i)=>{const other=vertices.filter((_,j)=>i!==j),mid=other[0].map((x,k)=>(x+other[1][k])/2);close(Math.hypot(v[0]-G[0],v[1]-G[1]),2*Math.hypot(G[0]-mid[0],G[1]-mid[1]));});
for(const p of plans)for(const lang of ['en','pt']){const html=render(lang,plans,p.id);assert(!/could not be opened|exceeded the 32|não pôde ser aberto|238–245/.test(html));assert(/<svg[\s\S]+<(path|circle|ellipse|rect)/.test(html));}
console.log('26 bilingual plans: grade counts, timed sequences, source ranges, static links, 27 language-switch flows and construction/area/locus/volume fixtures passed.');
