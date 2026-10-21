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
 case 'nested':return {min:3,max:12,value:8,label:['Sides of the regular midpoint polygon','Lados do polígono regular de pontos médios']};
 case 'archimedean':return {min:1,max:4,value:2,label:['Radial gain per full turn (cm)','Aumento radial por volta completa (cm)']};
 case 'ledger':return {min:10,max:90,step:5,value:45,label:['Pretend purchase in reais','Compra fictícia em reais']};
 case 'exchange':return {min:5,max:50,value:25,label:['Euros to convert at R$6 per euro','Euros a converter por R$6 cada']};
 case 'temperature':return {min:-10,max:40,value:20,label:['Temperature reading in Celsius','Leitura de temperatura em Celsius']};
 case 'trip':return {min:2,max:6,value:4,label:['Nights; days are one more','Noites; dias são uma unidade a mais']};
 case 'channels':return {min:5,max:40,step:5,value:20,label:['Bookmarks sold','Marcadores vendidos']};
 case 'business':return {min:50,max:150,step:10,value:100,label:['Monthly bookmarks sold','Marcadores vendidos no mês']};
 case 'unknown':return {min:1,max:15,value:7,label:['Try a value for y in 6y = 42','Teste um valor para y em 6y = 42']};
 case 'chord-web':return {min:12,max:24,step:12,value:24,label:['Equal points on the circle','Pontos igualmente espaçados na circunferência']};
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
 }else if(k==='nested'){
  for(const [sides,cx,q]of [[n,115,.5],[4,345,.25]]){
   let points=Array.from({length:sides},(_,i)=>[cx+82*Math.cos(2*Math.PI*i/sides-Math.PI/2),125+82*Math.sin(2*Math.PI*i/sides-Math.PI/2)]);
   for(let round=0;round<7;round++){body+=`<polygon points="${points.map(p=>p.join(',')).join(' ')}" class="${round%2?'chord':''}"/>`;points=points.map((p,i)=>p.map((v,k)=>(1-q)*v+q*points[(i+1)%sides][k]));}
  }
  body+=label(35,245,t('Midpoint rule','Regra dos pontos médios'))+label(270,245,t('Quarter-point rule','Regra dos quartos'));text=t('Repeat the same fraction of each side; track one corner through the levels.','Repita a mesma fração de cada lado; acompanhe um canto pelas etapas.');
 }else if(k==='archimedean'){
  const cx=225,cy=130,rmax=30*n;
  for(let t=1;t<=3;t++)body+=ring(cx,cy,10*n*t);
  for(let i=0;i<24;i++){const a=i*Math.PI/12;body+=line(cx,cy,cx+rmax*Math.cos(a),cy+rmax*Math.sin(a),'alternate');}
  const points=[];for(let i=0;i<=720;i++){const turns=3*i/720,a=turns*2*Math.PI,r=10*n*turns;points.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);}
  body+=`<polyline points="${points.map(p=>p.join(',')).join(' ')}" class="chord"/>`;
  text=t('After 0, 1, 2, 3 turns, radii in cm: ','Após 0, 1, 2, 3 voltas, raios em cm: ')+[0,n,2*n,3*n].join(', ');
 }else if(k==='ledger'){
  body=label(25,45,t('Debit example: bank starts at R$200','Exemplo de débito: saldo inicial R$200'))+label(25,85,t('After purchase: R$','Após compra: R$')+(200-n))+label(25,140,t('Separate credit example: bank R$100','Exemplo separado de crédito: saldo R$100'))+label(25,180,t('Debt before repayment: R$','Dívida antes de pagar: R$')+n)+label(25,220,t('Bank after full repayment: R$','Saldo após pagar tudo: R$')+(100-n));text=t('The same purchase changes different records; credit is an obligation.','A mesma compra muda registros diferentes; crédito é obrigação.');
 }else if(k==='exchange'){
  body=label(35,55,`€${n} × R$6/€ = R$${6*n}`)+label(35,105,`R$${6*n} ÷ (R$6/€) = €${n}`)+label(35,170,t('With one fixed R$6 fee: R$','Com tarifa fixa única de R$6: R$')+(6*n+6));text=t('Fictional classroom rate, not a live quote.','Taxa fictícia de aula, não cotação atual.');
 }else if(k==='temperature'){
  const f=n*9/5+32;body=label(50,65,`${n}°C`)+label(285,65,`${fmt(f,lang)}°F`)+line(80,85,80,230)+line(320,85,320,230)+dot(80,230-(n+10)*2.5,7)+dot(320,230-(n+10)*2.5,7);text=`F = (${n} × 9/5) + 32 = ${fmt(f,lang)}; C = (${fmt(f,lang)} − 32) × 5/9 = ${n}`;
 }else if(k==='trip'){
  const room=120*n,food=20*(n+1)*6,total=800+120+room+food,left=2400-total;
  body=label(25,40,t('Return travel: R$800; local travel: R$120','Ida e volta: R$800; transporte local: R$120'))+label(25,85,t('Nights: ','Noites: ')+n+` × R$120 = R$${room}`)+label(25,130,t('Food days: ','Dias de alimentação: ')+(n+1)+` × €20 × R$6/€ = R$${food}`)+label(25,180,t('Total: R$','Total: R$')+total)+label(25,225,t('Budget minus total: R$','Limite menos total: R$')+left);text=t('The €25 optional activity is not included in this model total.','A atividade opcional de €25 não está incluída neste total do modelo.');
 }else if(k==='channels'){
  const revenue=12*n,market=9*n-30,online=7.9*n;
  body=label(35,45,t('Sales: R$','Vendas: R$')+revenue)+label(35,95,t('Materials: R$','Materiais: R$')+(3*n))+label(35,150,t('Market profit: R$','Lucro da feira: R$')+fmt(market,lang))+label(35,205,t('Online profit: R$','Lucro online: R$')+fmt(online,lang));text=t('Market: one R$30 fee. Online: R$0.50 per item and 5% of sales.','Feira: tarifa única R$30. Online: R$0,50 por item e 5% das vendas.');
 }else if(k==='business'){
  const revenue=12*n,materials=3*n,profit=revenue-materials-500-100-150-50;
  body=label(30,40,t('Sales: R$','Vendas: R$')+revenue)+label(30,80,t('Materials: R$','Materiais: R$')+materials)+label(30,120,t('Rent + utilities + helper: R$750','Aluguel + contas + ajudante: R$750'))+label(30,160,t('Monthly simple interest: R$50','Juros simples no mês: R$50'))+label(30,205,t('Profit after these costs: R$','Lucro após esses custos: R$')+profit);text=t('Reserve target: R$1800. Loan principal is not sales revenue.','Meta de reserva: R$1800. Principal emprestado não é faturamento.');
 }else if(k==='unknown'){
  body=label(140,55,'6y = 42')+label(70,115,`y = ${n} → 6 × ${n} = ${6*n}`)+label(130,185,`${6*n} ${6*n===42?'=':6*n<42?'<':'>'} 42`);text=6*n===42?t('This value satisfies the original equation.','Este valor satisfaz a equação original.'):t('Try another value, then substitute to check.','Teste outro valor e substitua para conferir.');
 }else if(k==='chord-web'){
  const point=i=>[225+100*Math.cos(i*2*Math.PI/n-Math.PI/2),130+100*Math.sin(i*2*Math.PI/n-Math.PI/2)];
  body+=ring(225,130,100);for(let i=0;i<n;i++){body+=dot(...point(i),2);for(let j=i+1;j<n;j++)body+=line(...point(i),...point(j),i%2?'alternate':'chord');}
  text=t('Sector angle: ','Ângulo do setor: ')+(360/n)+'° · '+t('Distinct chords: ','Cordas distintas: ')+n*(n-1)/2;
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
