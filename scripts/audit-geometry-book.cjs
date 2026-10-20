const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {lessons}=require('../geometry/authoring.cjs'),{plans}=require('../geometry/plans/authoring.cjs');
const {lessonHTML}=require('../geometry/course.js'),{render}=require('../geometry/plans/render.js');
const base=path.resolve(__dirname,'../geometry'),manifest=require('../geometry/schuberth/manifest.json');
let placements=0;
for(const item of [...lessons,...plans]){
 const isPlan=item.id.startsWith('P'),page=path.join(base,isPlan?'plans':'lessons',item.id+'.html');
 for(const lang of ['pt','en']){
  const html=isPlan?render(lang,plans,item.id):lessonHTML(item,lang,lessons);
  assert.equal([...html.matchAll(/<img /g)].length,item.bookFigures.length,item.id);
  for(const figure of item.bookFigures){
   assert(html.includes(figure.prompt[lang]),item.id+' missing prompt');
   assert(html.includes('Ernst Schuberth'),item.id+' missing credit');
   assert(html.includes(`width="${figure.width}" height="${figure.height}"`));
   assert(figure.alt[lang].length>20);
   const source=Object.values(manifest.figures).find(f=>f.file===figure.file);
   assert(source&&source.page===figure.page&&source.width===figure.width&&source.height===figure.height);
   assert(figure.page>=1&&figure.page<=87);
  }
 }
 const staticHTML=fs.readFileSync(page,'utf8');
 assert.equal([...staticHTML.matchAll(/<img /g)].length,item.bookFigures.length);
 for(const match of staticHTML.matchAll(/(?:src|href)="([^"#]+)"/g)){
  assert(fs.existsSync(path.resolve(path.dirname(page),match[1].split('#')[0].split('?')[0])),item.id+' missing '+match[1]);
 }
 // Run the actual shared browser module, without CommonJS globals.
 const context=vm.createContext({window:{}});
 vm.runInContext(fs.readFileSync(path.join(base,'source-figures.js'),'utf8'),context);
 assert.equal(context.window.GeometrySourceFigures.render(item,'en'),require('../geometry/source-figures.js').render(item,'en'));
 placements+=item.bookFigures.length;
}
assert.equal(Object.keys(manifest.figures).length,15);
assert.equal([...lessons,...plans].filter(x=>x.bookFigures.length).length,18);
assert.equal(placements,19);
console.log('15 source figure groups, 19 placements across 18 pages: bilingual prompts, credits, static assets and browser renderer passed.');
