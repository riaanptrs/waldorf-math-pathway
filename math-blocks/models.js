(function(root){
'use strict';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=(n,lang)=>Number(n.toFixed(5)).toLocaleString(lang==='pt'?'pt-BR':'en-US',{maximumFractionDigits:5});
const romans=['','I','II','III','IV','V','VI','VII','VIII','IX','X'];
const kind=l=>typeof l.model==='string'?l.model:l.model.kind;
function setup(l){switch(kind(l)){
 case 'roman':case 'counters':return {min:1,max:10,value:6,label:['Collection size','Tamanho da coleção']};
 case 'circle':return {min:1,max:9,value:2,label:['Equal jump','Salto igual']};
 case 'nines':return {min:0,max:14,value:6,label:['Groups of nine','Grupos de nove']};
 case 'compare':return {min:10,max:30,value:19,label:['Right-hand collection','Coleção à direita']};
 case 'clock':return {min:0,max:55,step:5,value:40,label:['Start minutes after 9','Minutos iniciais após 9h']};
 case 'recipe':return {min:1,max:4,value:2,label:['Trays','Bandejas']};
 case 'multiply':return {min:2,max:35,value:l.model.b,label:['Number of bundles','Quantidade de pacotes']};
 case 'mean':return {min:1,max:12,value:10,label:['Counters on the third table','Fichas na terceira mesa']};
 case 'factor':return {min:12,max:60,step:6,value:36,label:['Whole number','Número inteiro']};
 case 'rosette':return {min:0,max:1,value:0,label:['Bisect each of the six sectors: 0 = before, 1 = after','Divida os seis setores: 0 = antes, 1 = depois']};
 case 'ruler':return {min:1,max:8,value:4,label:['Length in inches','Comprimento em polegadas']};
 case 'star':return {min:5,max:7,value:5,label:['Point step','Passo entre pontos']};
 case 'sets':return {min:6,max:18,value:12,label:['Last number in the universe','Último número do universo']};
 case 'base':return {min:0,max:60,value:17,label:['Quantity in decimal','Quantidade decimal']};
 case 'probability':return {min:0,max:20,value:7,label:['Blue results in 20 supplied draws','Resultados azuis em 20 retiradas fornecidas']};
 case 'sphere':return {min:1,max:6,value:3,label:['Radius in centimetres','Raio em centímetros']};
 case 'tangent':return {min:0,max:5,value:4,label:['Line distance from centre (radius = 4)','Distância da reta ao centro (raio = 4)']};
 default:throw Error('Unknown model '+kind(l));
}}
function picture(l,lang,value){
 const t=(en,pt)=>lang==='pt'?pt:en,k=kind(l),n=Number(value??setup(l).value);let body='',text='';
 const label=(x,y,s)=>`<text x="${x}" y="${y}">${esc(s)}</text>`;
 const line=(x1,y1,x2,y2,cls='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
 const dot=(x,y,r=8)=>`<circle cx="${x}" cy="${y}" r="${r}" class="fill"/>`;
 const ring=(cx,cy,r)=>`<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
 if(k==='roman'||k==='counters'){
  for(let i=0;i<n;i++)body+=dot(80+(i%5)*60,70+Math.floor(i/5)*65,13);
  body+=label(110,210,k==='roman'?`${n} = ${romans[n]}`:t(`${n} counters; rearrange real objects.`,`${n} fichas; reorganize objetos reais.`));text=t('Count, move, draw, then name.','Conte, mova, desenhe e depois nomeie.');
 }else if(k==='circle'||k==='star'||k==='rosette'){
  const count=k==='circle'?10:k==='star'?16:n?12:6,cx=225,cy=130,r=94;
  const point=i=>[cx+r*Math.cos((i/count)*Math.PI*2-Math.PI/2),cy+r*Math.sin((i/count)*Math.PI*2-Math.PI/2)];
  body+=ring(cx,cy,r);
  for(let i=0;i<count;i++){const [x,y]=point(i);body+=dot(x,y,3);body+=label(cx+(r+17)*Math.cos((i/count)*2*Math.PI-Math.PI/2)-5,cy+(r+17)*Math.sin((i/count)*2*Math.PI-Math.PI/2)+4,i);if(k==='rosette')body+=line(cx,cy,x,y);}
  if(k!=='rosette'){
   const seen=new Set(),paths=[];
   for(let start=0;start<count;start++){
    if(seen.has(start))continue;let i=start,path=[];
    do{seen.add(i);path.push(i);const j=(i+n)%count;body+=line(...point(i),...point(j),paths.length%2?'alternate':'chord');i=j;}while(i!==start);paths.push(path);if(k==='circle')break;
   }
   text=t('First circuit: ','Primeiro circuito: ')+paths[0].concat(paths[0][0]).join(' → ');
   if(k==='circle')text+=' · '+t('Full products: ','Produtos completos: ')+Array.from({length:11},(_,i)=>i*n).join(', ');
   else text+=' · '+t('Circuits: ','Circuitos: ')+paths.length;
  }else text=t(`${count} equal sectors: `,`${count} setores iguais: `)+fmt(360/count,lang)+'°';
 }else if(k==='nines'){
  const product=9*n,digits=String(product).split('').map(Number);let sum=digits.reduce((a,b)=>a+b,0);const sums=[sum];while(sum>9){sum=String(sum).split('').reduce((a,b)=>a+Number(b),0);sums.push(sum);}
  body=label(60,85,`9 × ${n} = ${product}`)+label(60,135,digits.join(' + ')+' = '+sums.join(' → '));text=t('The digit sum is a check; it is not the product.','A soma dos algarismos ajuda a conferir; não é o produto.');
 }else if(k==='compare'){
  const a=16;body=label(115,55,t('Left','Esquerda'))+label(285,55,t('Right','Direita'));
  for(const [count,x]of [[a,75],[n,260]])for(let i=0;i<count;i++)body+=dot(x+i%5*22,85+Math.floor(i/5)*21,5);
  body+=label(180,240,`${a} ${a===n?'=':a<n?'<':'>'} ${n}`);text=t('Pair objects before choosing the symbol.','Forme pares antes de escolher o símbolo.');
 }else if(k==='clock'){
  const start=9*60+n,end=start+35,clock=m=>`${Math.floor(m/60)}:${String(m%60).padStart(2,'0')}`;
  body=line(45,130,415,130)+label(45,90,clock(start))+label(330,90,clock(end))+label(155,185,'35 min');
  body+=line(45,120,45,140)+line(415,120,415,140);text=t('Start time + interval = end time.','Horário inicial + intervalo = horário final.');
 }else if(k==='recipe'){
  for(let i=0;i<3*n;i++)body+=dot(55+(i%6)*65,80+Math.floor(i/6)*60,12);
  body+=label(45,220,`${n} × 3 = ${3*n}`);text=t('Scoops = ','Medidas = ')+3*n+' · '+t('Full cups = ','Copos cheios = ')+Math.floor(3*n/4)+' · '+t('Extra scoops = ','Medidas restantes = ')+(3*n%4);
 }else if(k==='multiply'){
  const a=l.model.a,ones=n%10,tens=n-ones,a1=a%10,a10=a-a1;
  body=`<rect x="65" y="40" width="320" height="140" class="area"/>`+line(65+320*a10/a,40,65+320*a10/a,180)+line(65,40+140*tens/n,385,40+140*tens/n);
  body+=label(70,25,String(a))+label(25,115,String(n))+label(45,210,n<10?`${a10} × ${n} + ${a1} × ${n} = ${a*n}`:`${a} × ${n} = ${a*tens} + ${a*ones} = ${a*n}`);
  text=t('Rows for tens count tens, including the zero place.','Linhas das dezenas contam dezenas, incluindo o zero da posição.');
 }else if(k==='mean'){
  const piles=[4,7,n],total=11+n,mean=total/3;
  for(let i=0;i<3;i++){body+=`<rect class="area" x="${55+i*130}" y="${180-piles[i]*9}" width="70" height="${piles[i]*9}"/>`;body+=label(75+i*130,210,piles[i]);}
  text=t('Total stays ','O total permanece ')+total+' · '+t('Equal share = ','Parte igual = ')+(total%3===0?String(mean):`${total}/3 ≈ ${fmt(mean,lang)}`);body+=line(40,180-mean*9,400,180-mean*9,'alternate');
 }else if(k==='factor'){
  let remaining=n,factors=[];for(let p=2;p<=remaining;p++)while(remaining%p===0){factors.push(p);remaining/=p;}
  body=label(200,45,n);const gap=360/(factors.length||1);factors.forEach((v,i)=>{body+=line(215,65,50+i*gap,150)+label(45+i*gap,180,v);});text=n+' = '+factors.join(' × ');
 }else if(k==='ruler'){
  body=line(50,90,410,90)+line(50,160,410,160);
  for(let i=0;i<=n;i++){const x=50+360*i/n;body+=line(x,80,x,100)+label(x-5,70,i)+line(x,150,x,170)+label(x-10,195,fmt(i*2.54,lang));}
  text=`${n} in = ${fmt(n*2.54,lang)} cm`;
 }else if(k==='sets'){
  const A=[],B=[],both=[],none=[];for(let i=1;i<=n;i++){if(i%2===0&&i%3===0)both.push(i);else if(i%2===0)A.push(i);else if(i%3===0)B.push(i);else none.push(i);}
  body=ring(175,120,85)+ring(285,120,85)+label(55,25,t('Even','Pares'))+label(285,25,t('Multiples of 3','Múltiplos de 3'));for(const [items,x] of [[A,145],[both,220],[B,300]])items.forEach((v,i)=>{body+=label(x,70+i*19,v);});body+=label(25,250,t('Neither: ','Nenhum: ')+none.join(', '));text=t('Union count: ','Quantidade na união: ')+(A.length+B.length+both.length)+' · '+t('Intersection count: ','Quantidade na interseção: ')+both.length;
 }else if(k==='base'){
  const digits=[Math.floor(n/25),Math.floor(n%25/5),n%5];
  for(let i=0;i<3;i++){body+=`<rect x="${45+i*135}" y="50" width="115" height="140"/>`+label(75+i*135,35,[25,5,1][i])+label(95+i*135,125,digits[i]);}
  text=`${digits.join('').replace(/^0+(?=\d)/,'')}₅ = ${n}₁₀`;
 }else if(k==='probability'){
  for(let i=0;i<20;i++)body+=`<circle cx="${50+i%10*39}" cy="${75+Math.floor(i/10)*65}" r="12" class="${i<n?'fill':'empty'}"/>`;
  text=t('Model: 25%. Supplied sample: ','Modelo: 25%. Amostra fornecida: ')+fmt(n/20*100,lang)+'%';body+=label(65,215,t('This changes the sample, not a random draw.','Isto muda a amostra, não faz sorteio.'));
 }else if(k==='sphere'){
  const r=30+n*10;body=ring(225,130,r)+`<ellipse cx="225" cy="130" rx="${r}" ry="${r/3}" class="alternate"/>`+dot(225,130,3)+line(225,130,225+r,130)+label(235,115,'r = '+n+' cm');text=`V = (4/3)π × ${n}³ = (${4*n**3}/3)π cm³`;
 }else if(k==='tangent'){
  const cx=215,cy=145,r=80,y=cy-n*20;body=ring(cx,cy,r)+ring(cx,cy,40)+dot(cx,cy,3)+label(cx+7,cy+18,'O')+line(70,y,380,y)+line(cx,cy,cx,cy-r);
  text=t('Boundary intersections: ','Encontros com a borda: ')+(n>4?0:n===4?1:2)+' · '+t('Radius = 4','Raio = 4');
 }
 return `<svg viewBox="0 0 460 270" role="img" aria-label="${esc(l.title[lang])}">${body}</svg><p class="model-reading" aria-live="polite">${esc(text)}</p>`;
}
function render(l,lang){const s=setup(l);return `<div class="math-model" data-model="${l.id}"><label>${esc(s.label[lang==='pt'?1:0])}<input type="range" min="${s.min}" max="${s.max}" step="${s.step||1}" value="${s.value}"><output>${s.value}</output></label><div data-model-picture>${picture(l,lang,s.value)}</div></div>`;}
const api={render,picture,setup,kind};if(typeof module!=='undefined')module.exports=api;root.MathBlockModels=api;
})(typeof window==='undefined'?globalThis:window);
