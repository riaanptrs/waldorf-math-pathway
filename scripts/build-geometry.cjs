const fs=require('node:fs'),path=require('node:path');
const dir=path.resolve(__dirname,'../geometry');
const {lessons,sources}=require('../geometry/authoring.cjs');
const {lessonHTML,overviewHTML,teacherHTML}=require('../geometry/course.js');
function page(id,content,deep=false){const p=deep?'../':'';return `<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Geometria · Waldorf</title><link rel="stylesheet" href="${deep?'../../':'../'}src/styles.css"><link rel="stylesheet" href="${p}course.css"></head><body data-page="${id}"><header class="course-header"><a data-site-home href="${deep?'../../':'../'}index.html">Trilha de Matemática</a><label><span data-language-label>Idioma</span><select id="course-language"><option value="pt">Português</option><option value="en">English</option></select></label></header><main class="course-main" id="course">${content}</main><noscript><p>As aulas, figuras e respostas estão disponíveis sem JavaScript. Calculadoras e troca de idioma precisam de JavaScript.</p></noscript><script src="${p}data.js"></script><script src="${p}diagrams.js"></script><script src="${p}course.js"></script></body></html>\n`;}
fs.mkdirSync(path.join(dir,'lessons'),{recursive:true});
fs.writeFileSync(path.join(dir,'data.js'),'window.GeometryLessons = '+JSON.stringify(lessons)+';\nwindow.GeometrySources = '+JSON.stringify(sources)+';\n');
fs.writeFileSync(path.join(dir,'index.html'),page('overview',overviewHTML('pt',lessons)));
fs.writeFileSync(path.join(dir,'teacher.html'),page('teacher',teacherHTML('pt',sources)));
for(const l of lessons)fs.writeFileSync(path.join(dir,'lessons',l.id+'.html'),page(l.id,lessonHTML(l,'pt',lessons),true));
console.log('Built '+lessons.length+' bilingual geometry lessons with static Portuguese fallback.');
