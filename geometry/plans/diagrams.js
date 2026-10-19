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
function diagram(key,lang){return `<svg viewBox="0 0 520 290" role="img" aria-label="${lang==='pt'?'Modelo geométrico para comparar com a atividade':'Geometric model to compare with the activity'}"><title>${lang==='pt'?'Modelo original, sem escala':'Original model, not to scale'}</title>${shapes[key]||''}</svg>`;}
const api={diagram};if(typeof module!=='undefined')module.exports=api;root.GeometryPlanDiagrams=api;
})(typeof window==='undefined'?globalThis:window);
