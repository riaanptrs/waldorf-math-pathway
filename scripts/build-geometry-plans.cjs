const fs=require('node:fs'),path=require('node:path');
const {plans}=require('../geometry/plans/authoring.cjs'),{render}=require('../geometry/plans/render.js');
const dir=path.resolve(__dirname,'../geometry/plans');
fs.writeFileSync(path.join(dir,'data.js'),'window.GeometryPlans = '+JSON.stringify(plans)+';\n');
for(const p of [null,...plans]){
 const name=p?p.id:'index';
 fs.writeFileSync(path.join(dir,name+'.html'),`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${p?p.title.pt:'Planos de geometria'} · Waldorf</title><link rel="stylesheet" href="../../src/styles.css"><link rel="stylesheet" href="../../src/ui.css?v=20261005"><link rel="stylesheet" href="../course.css"></head><body data-plan="${p?p.id:''}"><a class="skip-link" href="#course">Ir para o conteúdo</a><header class="course-header"><a href="index.html" data-plan-home>Waldorf · Geometria</a><label><span id="language-label">Idioma</span><select id="plan-language"><option value="pt">Português</option><option value="en">English</option></select></label></header><main class="course-main" id="course" tabindex="-1">${render('pt',plans,p?p.id:null)}</main><noscript><p>O conteúdo e as respostas em português estão disponíveis sem JavaScript. A troca de idioma precisa de JavaScript.</p></noscript><script src="data.js"></script><script src="diagrams.js"></script><script src="../source-figures.js"></script><script src="render.js"></script></body></html>\n`);
}
console.log('Built '+plans.length+' bilingual lesson plans and grade overview, with static Portuguese fallback.');
