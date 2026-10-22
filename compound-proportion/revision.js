(function(root) {
  'use strict';
  const core = typeof module !== 'undefined' ? require('./core.js') : root.CompoundCore;
  const e = core.esc;
  function questions(lang) {
    const t=(en,pt)=>lang==='pt'?pt:en, trace=core.divisionTrace(7000,66,2), result=[];
    const board=(index,phase,extra={})=>({dividend:7000,divisor:66,decimalPlaces:2,index,phase,layout:'bracket',refresher:false,showDecimals:trace.stages[index].decimal || phase==='bring'&&index===2 || phase==='complete',...extra});
    const add=(question,hint,explain,math,answer,drawing,options)=>result.push({question,hint,explain,math,answer,board:drawing,kind:options?'choice':'number',options});
    add(t('66 does not fit into 7. How many starting digits of 7000 must we take to make a part at least as large as 66?', '66 não cabe em 7. Quantos algarismos iniciais de 7000 precisamos usar para formar uma parte pelo menos igual a 66?'),
      t('Try the first digit, then the first two digits.','Tente o primeiro algarismo e depois os dois primeiros.'),
      t('Take two digits: 70. The first quotient digit goes above the second digit of 7000.','Use dois algarismos: 70. O primeiro algarismo do quociente fica acima do segundo algarismo de 7000.'),['7 < 66; 70 ≥ 66'],2,board(0,'quotient',{hideQuotient:true}));
    trace.stages.forEach((s,index)=>{
      const decimal=s.decimal;
      add(t(`How many times does 66 fit into ${s.partial} without going over?`, `Quantas vezes 66 cabe em ${s.partial} sem ultrapassar?`),
        t('Compare nearby multiples of 66. If the current part is smaller than 66, the quotient digit is zero.','Compare múltiplos próximos de 66. Se a parte atual for menor que 66, o algarismo do quociente é zero.'),
        t(`Write ${s.quotientDigit} ${decimal?'after the decimal point':'in the next whole-number position'}. ${s.quotientDigit===0?'This zero holds a place: omitting it would change the answer.':''}`, `Escreva ${s.quotientDigit} ${decimal?'depois da vírgula':'na próxima posição da parte inteira'}. ${s.quotientDigit===0?'Esse zero ocupa uma posição: omiti-lo mudaria a resposta.':''}`),
        [`${s.partial} ÷ 66 → ${s.quotientDigit}`,`${s.quotientDigit} × 66 = ${s.product} ≤ ${s.partial}`,`${s.quotientDigit+1} × 66 = ${(s.quotientDigit+1)*66} > ${s.partial}`],s.quotientDigit,board(index,'quotient'));
      add(t(`Multiply: what is ${s.quotientDigit} × 66?`, `Multiplique: quanto é ${s.quotientDigit} × 66?`),
        t('Write the product under the current part, with units aligned.','Escreva o produto embaixo da parte atual, alinhando as unidades.'),
        t(`Write ${s.product} beneath ${s.partial}.`, `Escreva ${s.product} embaixo de ${s.partial}.`),
        [`${s.quotientDigit} × 66 = ${s.product}`],s.product,board(index,'product'));
      add(t(`Subtract: what is ${s.partial} − ${s.product}?`, `Subtraia: quanto é ${s.partial} − ${s.product}?`),
        t('Subtract the groups already counted. The remainder must be smaller than 66.','Subtraia os grupos já contados. O resto deve ser menor que 66.'),
        t(`The remainder is ${s.remainder}.${index===2?' All original digits have been used: the whole-number result is 106 remainder 4.':''}`, `O resto é ${s.remainder}.${index===2?' Todos os algarismos originais foram usados: o resultado inteiro é 106 com resto 4.':''}`),
        [`${s.partial} − ${s.product} = ${s.remainder}`],s.remainder,board(index,'subtract'));
      if(index===2) add(t('To continue beyond 106 remainder 4, may we write 7000 as 7000.00 without changing its value?', 'Para continuar depois de 106 com resto 4, podemos escrever 7000 como 7000,00 sem mudar seu valor?'),
        t('Trailing zeros after a decimal point do not change a number’s value.','Zeros à direita depois da vírgula não mudam o valor de um número.'),
        t('Yes. Write a decimal point after 106. Regroup the remainder as tenths and bring down the first added zero. Each following zero lets us continue to the next decimal place.','Sim. Escreva uma vírgula depois de 106. Transforme o resto em décimos e baixe o primeiro zero acrescentado. Cada zero seguinte permite continuar para a próxima casa decimal.'),
        [t('7000 = 7000.00…','7000 = 7000,00…')],'same',board(index,'subtract',{alwaysReveal:true}),[{value:'same',label:t('Yes: the value stays the same','Sim: o valor permanece igual')},{value:'different',label:t('No: it changes the value','Não: isso muda o valor')}]);
      if(s.nextDigit!==null) add(t(`Bring down the next ${s.nextDigit}. What number does the remainder ${s.remainder} form with it?`, `Baixe o próximo ${s.nextDigit}. Qual número o resto ${s.remainder} forma com ele?`),
        t('Regroup the remainder into the next place: multiply it by 10, then add the digit brought down.','Transforme o resto na próxima ordem: multiplique-o por 10 e some o algarismo baixado.'),
        t(`Follow the matching colour. ${s.remainder} becomes ${s.nextPartial} when you bring down ${s.nextDigit}.`, `Siga a mesma cor. ${s.remainder} vira ${s.nextPartial} quando você baixa ${s.nextDigit}.`),
        [`${s.remainder} × 10 + ${s.nextDigit} = ${s.nextPartial}`],s.nextPartial,board(index,'bring'));
    });
    add(t('The remainder is 4 again, just as it was after the whole-number part. What happens if we keep adding zeros?', 'O resto voltou a ser 4, como depois da parte inteira. O que acontece se continuarmos acrescentando zeros?'),
      t('The same remainder and divisor must produce the same next quotient digits.','O mesmo resto e o mesmo divisor devem produzir os mesmos próximos algarismos do quociente.'),
      t('The cycle repeats: remainder 4 → 40 → quotient digit 0; then 400 → quotient digit 6 → remainder 4 again. Therefore 06 repeats forever. A finite 106.06 is only an approximation.','O ciclo se repete: resto 4 → 40 → algarismo 0 no quociente; depois 400 → algarismo 6 → resto 4 novamente. Portanto, 06 se repete para sempre. O decimal finito 106,06 é apenas uma aproximação.'),
      [t('7000 ÷ 66 = 106.060606…','7000 ÷ 66 = 106,060606…')],'repeat',board(4,'complete',{alwaysReveal:true}),[{value:'stop',label:t('The decimal stops at 106.06','O decimal termina em 106,06')},{value:'repeat',label:t('The digits 06 repeat forever','Os algarismos 06 se repetem para sempre')}]);
    return result;
  }
  function render(lang,state) {
    const t=(en,pt)=>lang==='pt'?pt:en, list=questions(lang), q=list[state.index], solved=state.result==='correct'||state.revealed;
    const math=lines=>lines.map(m=>`<p class="equation">${e(m)}</p>`).join('');
    const end=`<p class="exact-result">7000 ÷ 66 = ${t('106.','106,')}<span class="repeating">06</span> = ${t('106.060606…','106,060606…')}</p><p>${t('The bar means “repeat these digits forever”. This is exact repeating-decimal notation.','A barra significa “repita estes algarismos para sempre”. Esta é uma representação decimal periódica exata.')}</p><p class="equation">66 × 106 + 4 = 7000</p><p>${t('The whole-number quotient is 106, with remainder 4.','O quociente inteiro é 106, com resto 4.')}</p>`;
    return `<nav class="crumb"><a href="index.html">${t('Back to compound proportion','Voltar à regra de três composta')}</a></nav><h1>${t('Long division: 7000 ÷ 66','Divisão longa: 7000 ÷ 66')}</h1><p>${t('Build the written calculation one step at a time. Follow each coloured digit from the top, down its arrow, into the next partial dividend. First find the whole-number quotient and remainder; then continue into a repeating decimal.','Construa a conta armada um passo de cada vez. Siga cada algarismo colorido de cima, pela seta, até o próximo dividendo parcial. Primeiro encontre o quociente inteiro e o resto; depois continue até a dízima periódica.')}</p><article><p class="eyebrow">${t('Step','Passo')} ${Math.min(state.index+1,list.length)} / ${list.length}</p><h2 id="revision-heading" tabindex="-1">${q?e(q.question):t('The same remainder starts the same cycle','O mesmo resto inicia o mesmo ciclo')}</h2>${core.writtenDivision(q?q.board:{dividend:7000,divisor:66,decimalPlaces:2,showDecimals:true,index:4,phase:'complete',layout:'bracket',refresher:false},lang,solved||q?.board.alwaysReveal)}${q?`<form id="revision-form" novalidate>${q.kind==='choice'?`<fieldset><legend>${t('Choose your answer','Escolha sua resposta')}</legend>${q.options.map(o=>`<label class="choice"><input type="radio" name="revision-value" value="${o.value}" ${state.value===o.value?'checked':''}> ${e(o.label)}</label>`).join('')}</fieldset>`:`<label for="revision-value">${t('Your answer','Sua resposta')}</label><input id="revision-value" name="revision-value" inputmode="decimal" value="${e(state.value||'')}" autocomplete="off">`}<button>${t('Check this step','Conferir este passo')}</button></form><p role="status" id="revision-feedback">${state.result==='correct'?t('That checks out. Read why, then continue.','A resposta confere. Leia o motivo e continue.'):state.result==='wrong'?t('Try again, or ask for a hint or explanation.','Tente novamente ou peça uma pista ou explicação.'):state.result==='invalid'?t('Choose an option or enter a number.','Escolha uma opção ou digite um número.'):''}</p><div class="actions"><button data-revision="hint">${t('Give me a hint','Quero uma pista')}</button><button data-revision="explain">${t('Explain this step','Explique este passo')}</button></div>${state.hint?`<aside class="hint">${e(q.hint)}</aside>`:''}${solved?`<aside class="explanation"><p>${state.revealed?t('Read and reproduce this step in your notebook; it was revealed with help.','Leia e refaça este passo no caderno; ele foi revelado com ajuda.'):''}</p><p>${e(q.explain)}</p>${math(q.math)}</aside><button data-revision="next">${t('Next step','Próximo passo')}</button>`:''}`:end}<div class="actions"><button data-revision="back" ${state.index===0?'disabled':''}>${t('Previous step','Passo anterior')}</button><button data-revision="restart">${t('Start again','Recomeçar')}</button></div><details><summary>${t('Read the complete worked solution','Ler a resolução completa')}</summary><ol>${list.map(item=>`<li><p>${e(item.question)}</p><p>${e(item.explain)}</p>${math(item.math)}</li>`).join('')}</ol>${end}${core.writtenDivision({dividend:7000,divisor:66,decimalPlaces:2,showDecimals:true,index:4,phase:'complete',layout:'bracket',refresher:false},lang,true)}</details></article>`;
  }
  if(typeof module!=='undefined') {module.exports={questions,render};return;}
  let lang='pt',index=0;try{if(localStorage.getItem('waldorf-math:language')==='en')lang='en';}catch{}
  const entries=[],main=document.getElementById('division-revision-main'),select=document.getElementById('compound-language');
  function paint(focus) {
    const state=entries[index]||={},q=questions(lang)[index];main.innerHTML=render(lang,{...state,index});select.value=lang;
    document.documentElement.lang=lang==='pt'?'pt-BR':'en';document.title=(lang==='pt'?'Divisão longa: 7000 ÷ 66':'Long division: 7000 ÷ 66')+' · Waldorf';
    document.getElementById('language-label').textContent=lang==='pt'?'Idioma':'Language';
    document.getElementById('brand').textContent=lang==='pt'?'Waldorf · Matemática':'Waldorf · Mathematics';
    document.querySelector('.skip-link').textContent=lang==='pt'?'Ir ao conteúdo':'Skip to content';
    const form=document.getElementById('revision-form');
    if(form){
      const read=()=>q.kind==='choice'?form.querySelector('input:checked')?.value||'':form.querySelector('input').value;
      form.addEventListener('input',()=>{entries[index]={value:read(),hint:state.hint};document.getElementById('revision-feedback').textContent='';main.querySelector('.explanation')?.remove();main.querySelector('[data-revision="next"]')?.remove();main.querySelector('.written-division').outerHTML=core.writtenDivision(q.board,lang,q.board.alwaysReveal);});
      form.addEventListener('submit',event=>{event.preventDefault();entries[index]={...entries[index],value:read(),result:core.check(read(),q)};paint('revision-heading');});
    }
    main.querySelectorAll('[data-revision]').forEach(button=>button.addEventListener('click',()=>{
      const action=button.dataset.revision,current=entries[index]||{};
      if(action==='hint')entries[index]={...current,hint:true};
      if(action==='explain')entries[index]={...current,revealed:true};
      if(action==='next'&&(current.result==='correct'||current.revealed))index++;
      if(action==='back'&&index>0)index--;
      if(action==='restart'){entries.length=0;index=0;}
      paint('revision-heading');
    }));
    if(focus)document.getElementById(focus)?.focus();
  }
  select.addEventListener('change',()=>{lang=select.value==='en'?'en':'pt';try{localStorage.setItem('waldorf-math:language',lang);}catch{}paint();});paint();
})(typeof window==='undefined'?globalThis:window);
