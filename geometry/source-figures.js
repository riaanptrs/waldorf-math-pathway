(function(root){
'use strict';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(item,lang){
 if(!item.bookFigures?.length)return '';
 const t=(en,pt)=>lang==='pt'?pt:en;
 return `<section class="book-figures" aria-label="${t('Explore the book diagrams','Explore os diagramas do livro')}"><h2>${t('Look closely at the book diagrams','Observe os diagramas do livro')}</h2>${item.bookFigures.map(f=>`<figure class="book-figure"><a href="../schuberth/${esc(f.file)}" target="_blank" rel="noopener" aria-label="${esc(t('Open larger image: ','Abrir imagem ampliada: ')+f.alt[lang])}"><img src="../schuberth/${esc(f.file)}" width="${f.width}" height="${f.height}" loading="lazy" decoding="async" alt="${esc(f.alt[lang])}"></a><figcaption><cite>Ernst Schuberth · Geometry Lessons in the Waldorf School, Volume 2</cite> · PDF ${f.page} · ${esc(f.label)}. ${t('Source diagram, cropped and resized. Open the image to inspect it.','Diagrama da fonte, recortado e redimensionado. Abra a imagem para examiná-la.')}</figcaption><p>${esc(f.prompt[lang])}</p></figure>`).join('')}<p class="source">${t('Follow the lesson’s written measurements and steps; these resized illustrations are not measuring templates.','Siga as medidas escritas e as etapas da aula; estas ilustrações redimensionadas não são moldes para medir.')}</p></section>`;
}
if(typeof module!=='undefined')module.exports={render};root.GeometrySourceFigures={render};
})(typeof window==='undefined'?globalThis:window);
