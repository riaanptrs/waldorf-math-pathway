const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'math-blocks');
const {lessons:catalogue,lessonTranslations}=require('./load-catalogue.cjs')(),{lessons:geometry}=require('../geometry/authoring.cjs'),{plans}=require('../geometry/plans/authoring.cjs');
const blocks=require('../math-blocks/blocks.json'),lessons=require('../math-blocks/lessons.json'),sources=require('../math-blocks/sources.json');
const routes={};
for(const l of catalogue)routes[l.id]={href:'../index.html#practice:'+l.id,title:{en:l.title,pt:lessonTranslations[l.id]?.title||l.title},type:{en:'Existing practice',pt:'Prática existente'}};
for(const l of geometry)routes[l.id]={href:'../geometry/lessons/'+l.id+'.html',title:l.title,type:{en:'Existing geometry',pt:'Geometria existente'}};
for(const l of plans)routes[l.id]={href:'../geometry/plans/'+l.id+'.html',title:l.title,type:{en:'Existing plan',pt:'Plano existente'}};
for(const l of lessons)routes[l.id]={href:'lessons/'+l.id+'.html',title:l.title,type:{en:l.basis==='standards-expansion'?'Optional new lesson':'New gap lesson',pt:l.basis==='standards-expansion'?'Nova aula opcional':'Nova aula para lacuna'}};
const data={blocks,lessons,sources,routes};
const {render}=require('../math-blocks/render.js');
function page(id){const deep=id.startsWith('N'),p=deep?'../':'',title=routes[id]?.title.pt||blocks.find(x=>x.id===id)?.title.pt||(id==='teacher'?'Por que e como':'Blocos de matemática');return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Blocos de matemática do 1º ao 8º ano: sequência, justificativa, aulas e adaptações online."><title>${title} · Waldorf</title><link rel="stylesheet" href="${p}../src/styles.css"><link rel="stylesheet" href="${p}../src/ui.css?v=20261005"><link rel="stylesheet" href="${p}../geometry/course.css"><link rel="stylesheet" href="${p}blocks.css"></head><body data-block="${id}"><a class="skip-link" href="#block-main">Ir ao conteúdo</a><header class="course-header"><a id="block-brand" href="${p}index.html">Waldorf · Blocos de matemática</a><label><span id="block-language-label">Idioma</span><select id="block-language"><option value="pt">Português</option><option value="en">English</option></select></label></header><main id="block-main" class="block-main" tabindex="-1">${render(data,'pt',id||null)}</main><noscript><p>A sequência, os modelos e as resoluções em português estão disponíveis sem JavaScript. A troca de idioma e os controles precisam de JavaScript.</p></noscript><script src="${p}data.js"></script><script src="${p}models.js"></script><script src="${p}render.js"></script></body></html>\n`;}
fs.writeFileSync(path.join(dir,'data.js'),'window.MathBlocksData = '+JSON.stringify(data)+';\n');
fs.mkdirSync(path.join(dir,'lessons'),{recursive:true});
for(const id of ['', 'teacher',...blocks.map(x=>x.id),...lessons.map(x=>x.id)])fs.writeFileSync(path.join(dir,id?(id.startsWith('N')?'lessons/':'')+id+'.html':'index.html'),page(id));
console.log(`Built ${blocks.length} block routes, ${lessons.length} bilingual gap lessons, teacher guide and overview.`);
