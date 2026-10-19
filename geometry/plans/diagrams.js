(function(root){
const shapes={
paths:'<path d="M40 80H210 M270 80Q320 10 380 80T480 80 M60 190L180 190L120 110Z M300 190q-70-90 30-90t30 90Z"/>',
mirror:'<path d="M260 20V230" class="guide"/><g class="area"><circle cx="190" cy="70" r="12"/><circle cx="330" cy="70" r="12"/><circle cx="150" cy="140" r="18"/><circle cx="370" cy="140" r="18"/><circle cx="230" cy="200" r="8"/><circle cx="290" cy="200" r="8"/></g><path d="M190 70H330 M150 140H370 M230 200H290" class="guide"/>',
plan:'<rect x="100" y="40" width="300" height="200"/><path d="M150 40V240 M200 40V240 M250 40V240 M300 40V240 M350 40V240 M100 90H400 M100 140H400 M100 190H400" class="guide"/><rect class="area" x="100" y="140" width="100" height="100"/><text x="190" y="28">60 cm</text><text x="410" y="150">40 cm</text>',
ellipse:'<circle cx="130" cy="130" r="85"/><ellipse cx="370" cy="130" rx="110" ry="65"/><path class="guide" d="M45 130H215 M130 45V215 M260 130H480 M370 65V195"/>',
triangles:'<path d="M30 210L110 60L190 210Z M210 210L260 60L310 210Z M340 210V70L480 210Z"/><path class="guide" d="M340 190H360V210"/>',
quads:'<path d="M30 50H120V140H30Z M170 50H320V140H170Z M420 30L490 100L420 170L350 100Z M120 190H280L330 250H170Z"/><path class="guide" d="M30 50L120 140 M120 50L30 140 M245 50V140 M170 95H320 M420 30V170 M350 100H490"/>',
shadow:'<circle cx="100" cy="120" r="40" class="area"/><path d="M20 80H60 M20 100H60 M20 140H60 M20 160H60 M140 80L400 80 M140 160L400 160" class="guide"/><path d="M330 30L450 220"/><ellipse cx="390" cy="125" rx="17" ry="65" transform="rotate(-32 390 125)"/>',
bisector:'<circle cx="180" cy="125" r="100"/><circle cx="320" cy="125" r="100"/><path d="M180 125H320 M250 25V225" class="guide"/><text x="165" y="145">A</text><text x="325" y="145">B</text><text x="255" y="145">M</text><text x="255" y="50">C</text><text x="255" y="215">D</text>',
octagon:'<circle cx="260" cy="130" r="100"/><path d="M260 30L331 59L360 130L331 201L260 230L189 201L160 130L189 59Z"/><path d="M160 130H360 M260 30V230 M189 59L331 201 M189 201L331 59" class="guide"/>',
nested:'<path d="M150 20H370V240H150Z M260 20L370 130L260 240L150 130Z M205 75H315V185H205Z M260 75L315 130L260 185L205 130Z"/>',
double:'<path d="M260 20L370 130L260 240L150 130Z" class="area"/><path d="M150 130H370 M260 20V240"/><path d="M35 130H145V240H35Z"/><text x="40" y="115">16 cm²</text><text x="385" y="135">32 cm²</text>',
parallel:'<path d="M40 60H480 M40 200H480 M40 130H480"/><path d="M140 220L350 30" class="guide"/><text x="307" y="55">A</text><text x="160" y="220">B</text><text x="258" y="124">M</text>',
cyclic:'<circle cx="260" cy="130" r="105"/><path d="M344 67L344 193L176 193L176 67Z"/><text x="350" y="65">A</text><text x="350" y="210">B</text><text x="155" y="212">C</text><text x="155" y="60">D</text>',
tangent:'<circle cx="260" cy="130" r="90"/><path d="M170 40H350V220H170Z"/><path d="M260 130V40 M260 130H350" class="guide"/><text x="265" y="120">O</text>',
perspective:'<path d="M160 70H360V200H160Z M260 130L40 0 M260 130L480 0 M260 130L480 284 M260 130L40 284 M20 130H500" class="guide"/><path d="M160 70H360V200H160Z M100 35V235 M420 35V235"/><circle cx="260" cy="130" r="3"/><text x="270" y="125">V</text>'
};
// Computed original diagrams for the Jarman follow-up plans.
const line=(x1,y1,x2,y2,cls='')=>`<path class="${cls}" d="M${x1} ${y1}L${x2} ${y2}"/>`;
const dot=(x,y,name)=>`<circle cx="${x}" cy="${y}" r="3"/><text x="${x+6}" y="${y-6}">${name}</text>`;
shapes.rose='<circle cx="260" cy="140" r="105"/>'+Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;return line(260,140,260+105*Math.cos(a),140+105*Math.sin(a),'guide');}).join('')+'<text x="253" y="24">N</text><text x="380" y="144">E/L</text><text x="253" y="270">S</text><text x="105" y="144">W/O</text>';
shapes.envelope=line(60,240,290,240)+line(60,240,60,10)+Array.from({length:9},(_,i)=>line(60+i*25,240,60,240-(8-i)*25)).join('')+'<text x="40" y="262">O</text><text x="263" y="262">8</text><text x="38" y="40">8</text>';
shapes.congruence='<path d="M30 220H170L85 70Z M220 220H360L275 70Z"/><path class="guide" d="M390 220H485L390 70Z"/><text x="70" y="245">5–6–7</text><text x="260" y="245">5–6–7</text>';
shapes['equal-area']='<path class="area" d="M200 120L410 120L340 51L200 51Z"/><path d="M200 223.5L340 51H200Z"/><path class="guide" d="M200 120L340 51 M410 120L200 223.5"/>'+dot(200,120,'A')+dot(410,120,'B')+dot(340,51,'C')+dot(200,51,'D')+dot(200,223.5,'E');
shapes['ellipse-locus']='<ellipse cx="260" cy="135" rx="150" ry="120"/><path class="guide" d="M170 135L260 15L350 135"/>'+dot(170,135,'A')+dot(350,135,'B')+dot(260,15,'P')+'<text x="195" y="95">5 cm</text><text x="300" y="95">5 cm</text>';
shapes.centres='<path d="M100 240H340L160 60Z"/>'+line(100,240,250,150,'guide')+line(340,240,130,150,'guide')+line(160,60,220,240,'guide')+line(160,60,160,240)+line(130,170,340,240)+dot(100,240,'A')+dot(340,240,'B')+dot(160,60,'C')+dot(220,180,'O')+dot(200,180,'G')+dot(160,180,'H')+dot(187.6,176.8,'I');
shapes.views='<rect x="40" y="100" width="90" height="120"/><rect x="40" y="20" width="90" height="60"/><rect x="170" y="100" width="60" height="120"/><path d="M310 120H400V240H310Z M310 120L345 85H435L400 120 M400 240L435 205V85"/><text x="63" y="245">3×4</text><text x="62" y="55">3×2</text><text x="180" y="245">2×4</text>';
shapes.volume='<path d="M50 220L140 40L230 220"/><ellipse cx="140" cy="220" rx="90" ry="22"/><path class="guide" d="M140 40V220"/><ellipse cx="380" cy="55" rx="90" ry="22"/><ellipse cx="380" cy="220" rx="90" ry="22"/><path d="M290 55V220 M470 55V220"/><text x="120" y="270">Bh/3</text><text x="365" y="270">Bh</text>';
shapes.ladder='<path d="M60 20V250H410"/>'+[[10,0],[8,6],[6,8],[0,10]].map(([x,y])=>line(60+20*x,250,60,250-20*y,'guide')).join('')+'<path d="M160 250A100 100 0 0 0 60 150" class="new"/>'+dot(140,190,'M')+dot(220,250,'A')+dot(60,130,'B')+'<text x="40" y="275">O</text>';
function diagram(key,lang){return `<svg viewBox="0 0 520 290" role="img" aria-label="${lang==='pt'?'Modelo geométrico para comparar com a atividade':'Geometric model to compare with the activity'}"><title>${lang==='pt'?'Modelo original, sem escala':'Original model, not to scale'}</title>${shapes[key]||''}</svg>`;}
const api={diagram};if(typeof module!=='undefined')module.exports=api;root.GeometryPlanDiagrams=api;
})(typeof window==='undefined'?globalThis:window);
