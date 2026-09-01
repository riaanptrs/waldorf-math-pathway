(() => {
  const copy = {
    en: {
      eyebrow: "Geometry studio",
      predict: "Predict before moving anything",
      choose: "Choose a prediction to begin.",
      test: "Test your prediction",
      reveal: "Reveal the relationship",
      paper: "Return to paper",
      record: "Draw what you made. Label the measurements and write one thing that stayed true.",
      materials: "Hands-on first",
      rows: "rows",
      columns: "columns",
      radius: "radius",
      height: "height",
      horizontal: "horizontal change",
      vertical: "vertical change",
      sideA: "first leg",
      sideB: "second leg",
    },
    pt: {
      eyebrow: "Ateliê de geometria",
      predict: "Faça uma previsão antes de mover qualquer coisa",
      choose: "Escolha uma previsão para começar.",
      test: "Teste sua previsão",
      reveal: "Revelar a relação",
      paper: "Volte ao papel",
      record: "Desenhe o que você construiu. Marque as medidas e escreva algo que continuou verdadeiro.",
      materials: "Primeiro com as mãos",
      rows: "fileiras",
      columns: "colunas",
      radius: "raio",
      height: "altura",
      horizontal: "mudança horizontal",
      vertical: "mudança vertical",
      sideA: "primeiro cateto",
      sideB: "segundo cateto",
    },
  };

  const configurations = {
    "g4-area-floor-tiles": { kind: "area" },
    "g5-freehand-circle-diameter": { kind: "circle" },
    "g5-symmetry-balance": { kind: "symmetry" },
    "g6-geometry-precision": { kind: "circle" },
    "g6-geometry-rope-right-angle": { kind: "triangle" },
    "g7-competency-pythagorean-leg": { kind: "triangle" },
    "g8-pythagorean-hypotenuse": { kind: "triangle" },
    "g8-competency-trapezoid-area": { kind: "area" },
    "g8-competency-cylinder-surface": { kind: "cylinder" },
    "g8-cylinder-volume": { kind: "cylinder" },
    "g9-distance-formula": { kind: "distance" },
  };

  const predictionCopy = {
    area: {
      en: ["The total grows by one tile", "The total grows by one whole row", "The total does not change"],
      pt: ["O total aumenta um ladrilho", "O total aumenta uma fileira inteira", "O total não muda"],
    },
    circle: {
      en: ["The diameter equals the radius", "The diameter is twice the radius", "The diameter is four times the radius"],
      pt: ["O diâmetro é igual ao raio", "O diâmetro é o dobro do raio", "O diâmetro é quatro vezes o raio"],
    },
    symmetry: {
      en: ["Both points stay equally far from the mirror", "One point moves farther", "The points meet away from the mirror"],
      pt: ["Os dois pontos ficam à mesma distância do espelho", "Um ponto se afasta mais", "Os pontos se encontram longe do espelho"],
    },
    triangle: {
      en: ["Add the side lengths", "Add the two square areas", "Multiply the side lengths"],
      pt: ["Some os comprimentos", "Some as áreas dos dois quadrados", "Multiplique os comprimentos"],
    },
    distance: {
      en: ["Use only the horizontal change", "Use a right triangle", "Add the two coordinate pairs"],
      pt: ["Use apenas a mudança horizontal", "Use um triângulo retângulo", "Some os dois pares de coordenadas"],
    },
    cylinder: {
      en: ["The curved surface opens into a rectangle", "It opens into a triangle", "Its width is the radius"],
      pt: ["A superfície curva se abre em um retângulo", "Ela se abre em um triângulo", "Sua largura é o raio"],
    },
  };

  const materialCopy = {
    area: {
      en: "Arrange square counters or draw a square grid. Change one row before using the slider.",
      pt: "Organize fichas quadradas ou desenhe uma malha. Mude uma fileira antes de usar o controle.",
    },
    circle: {
      en: "With a compass or string, draw a circle. Mark the centre, one radius, and a straight line through the centre.",
      pt: "Com compasso ou barbante, desenhe um círculo. Marque o centro, um raio e uma linha reta que passe pelo centro.",
    },
    symmetry: {
      en: "Fold a sheet, mark one point, and transfer it across the fold before testing the digital mirror.",
      pt: "Dobre uma folha, marque um ponto e transfira-o para o outro lado da dobra antes de testar o espelho digital.",
    },
    triangle: {
      en: "Draw a right triangle on squared paper. Build a square outward on each of its three sides.",
      pt: "Desenhe um triângulo retângulo em papel quadriculado. Construa um quadrado para fora em cada um dos três lados.",
    },
    distance: {
      en: "Plot two points on squared paper and complete the right triangle between them.",
      pt: "Marque dois pontos em papel quadriculado e complete o triângulo retângulo entre eles.",
    },
    cylinder: {
      en: "Wrap paper around a tin or cup, mark the seam, then open the paper flat and trace the two circular ends.",
      pt: "Envolva uma lata ou copo com papel, marque a emenda, abra o papel e contorne as duas bases circulares.",
    },
  };

  function controls(kind, c) {
    if (kind === "area") return `${range("a", c.rows, 2, 9, 5)}${range("b", c.columns, 2, 10, 7)}`;
    if (kind === "circle" || kind === "symmetry") return range("a", c.radius, 2, 8, 4);
    if (kind === "triangle") return `${range("a", c.sideA, 3, 9, 3)}${range("b", c.sideB, 4, 10, 4)}`;
    if (kind === "distance") return `${range("a", c.horizontal, 2, 10, 3)}${range("b", c.vertical, 2, 10, 4)}`;
    return `${range("a", c.radius, 2, 7, 3)}${range("b", c.height, 3, 10, 5)}`;
  }

  function range(name, label, min, max, value) {
    return `<label class="geometry-control"><span>${label}: <output data-output="${name}">${value}</output></span><input data-geometry-value="${name}" type="range" min="${min}" max="${max}" value="${value}" disabled></label>`;
  }

  function renderGeometryDiscovery(lesson, language) {
    const config = configurations[lesson.id];
    if (!config) return "";
    const lang = language === "pt" ? "pt" : "en";
    const c = copy[lang];
    const choices = predictionCopy[config.kind][lang];
    return `
      <section class="geometry-studio" data-geometry-kind="${config.kind}" aria-labelledby="geometry-title-${lesson.id}">
        <p class="eyebrow">${c.eyebrow}</p>
        <h4 id="geometry-title-${lesson.id}">${c.predict}</h4>
        <fieldset class="geometry-predictions">
          <legend class="sr-only">${c.predict}</legend>
          ${choices.map((choice, index) => `<label><input type="radio" name="prediction-${lesson.id}" value="${index}"> <span>${choice}</span></label>`).join("")}
        </fieldset>
        <p class="geometry-status" aria-live="polite">${c.choose}</p>
        <p class="geometry-materials"><strong>${c.materials}:</strong> ${materialCopy[config.kind][lang]}</p>
        <div class="geometry-workbench" aria-label="${c.test}">
          <div class="geometry-canvas" aria-live="polite"></div>
          <div class="geometry-controls">${controls(config.kind, c)}<button class="button button--small geometry-reveal" type="button" disabled>${c.reveal}</button></div>
        </div>
        <aside class="geometry-journal"><strong>${c.paper}</strong><p>${c.record}</p></aside>
      </section>`;
  }

  function picture(kind, a, b, revealed) {
    const ink = "#345548";
    const gold = "#c98a3d";
    if (kind === "area") {
      const cells = Array.from({ length: a * b }, (_, i) => `<rect x="${20 + (i % b) * 20}" y="${20 + Math.floor(i / b) * 20}" width="18" height="18" rx="2" />`).join("");
      return `<svg viewBox="0 0 240 220" role="img"><g fill="#e8c88f" stroke="${ink}">${cells}</g><text x="20" y="${45 + a * 20}" fill="${ink}">${revealed ? `${a} × ${b} = ${a * b}` : `${a} × ${b} = ?`}</text></svg>`;
    }
    if (kind === "circle") {
      const r = a * 12;
      return `<svg viewBox="0 0 240 200" role="img"><circle cx="120" cy="92" r="${r}" fill="#dce9df" stroke="${ink}" stroke-width="3"/><line x1="${120-r}" y1="92" x2="${120+r}" y2="92" stroke="${gold}" stroke-width="4"/><line x1="120" y1="92" x2="${120+r}" y2="92" stroke="${ink}" stroke-width="4"/><text x="20" y="185" fill="${ink}">${revealed ? `d = 2 × ${a} = ${2*a}` : `r = ${a}; d = ?`}</text></svg>`;
    }
    if (kind === "symmetry") {
      const dx = a * 10;
      return `<svg viewBox="0 0 240 190" role="img"><line x1="120" y1="15" x2="120" y2="170" stroke="${gold}" stroke-width="4"/><line x1="${120-dx}" y1="92" x2="${120+dx}" y2="92" stroke="${ink}" stroke-dasharray="5 5"/><circle cx="${120-dx}" cy="92" r="8" fill="${ink}"/><circle cx="${120+dx}" cy="92" r="8" fill="#8d4c5c"/><text x="32" y="184" fill="${ink}">${revealed ? `${a} = ${a}` : "?  |  ?"}</text></svg>`;
    }
    if (kind === "cylinder") {
      const width = Math.round(2 * Math.PI * a * 10);
      return `<svg viewBox="0 0 300 210" role="img"><rect x="25" y="35" width="${Math.min(width,220)}" height="${b*10}" fill="#dce9df" stroke="${ink}" stroke-width="3"/><circle cx="70" cy="165" r="${a*6}" fill="#e8c88f" stroke="${ink}"/><circle cx="190" cy="165" r="${a*6}" fill="#e8c88f" stroke="${ink}"/><text x="20" y="205" fill="${ink}">${revealed ? `2πr × h + 2πr²` : "curved surface → ?"}</text></svg>`;
    }
    const c = Math.sqrt(a*a + b*b);
    return `<svg viewBox="0 0 280 220" role="img"><path d="M45 175 L45 ${175-b*12} L${45+a*12} 175 Z" fill="#dce9df" stroke="${ink}" stroke-width="3"/><text x="12" y="${165-b*6}" fill="${ink}">${b}</text><text x="${45+a*6}" y="198" fill="${ink}">${a}</text><text x="120" y="35" fill="${gold}">${revealed ? `${a}² + ${b}² = ${Math.round(c*c)}; c = ${Number(c.toFixed(2))}` : "c = ?"}</text></svg>`;
  }

  function bindGeometryDiscovery(root = document) {
    root.querySelectorAll(".geometry-studio").forEach((studio) => {
      const kind = studio.dataset.geometryKind;
      const inputs = [...studio.querySelectorAll("[data-geometry-value]")];
      const reveal = studio.querySelector(".geometry-reveal");
      const status = studio.querySelector(".geometry-status");
      const canvas = studio.querySelector(".geometry-canvas");
      let isRevealed = false;
      const draw = () => {
        const values = inputs.map((input) => Number(input.value));
        inputs.forEach((input, index) => { studio.querySelector(`[data-output="${input.dataset.geometryValue}"]`).value = values[index]; });
        canvas.innerHTML = picture(kind, values[0], values[1] || values[0], isRevealed);
      };
      studio.addEventListener("change", (event) => {
        if (event.target.matches("[type=radio]")) {
          inputs.forEach((input) => { input.disabled = false; });
          reveal.disabled = false;
          status.textContent = studio.closest("html")?.lang === "pt-BR" ? "Agora mova uma medida e observe." : "Now move one measure and observe.";
        }
        if (event.target.matches("[data-geometry-value]")) { isRevealed = false; draw(); }
      });
      studio.addEventListener("input", (event) => {
        if (event.target.matches("[data-geometry-value]")) { isRevealed = false; draw(); }
      });
      reveal.addEventListener("click", () => { isRevealed = true; draw(); });
      draw();
    });
  }

  window.renderGeometryDiscovery = renderGeometryDiscovery;
  window.bindGeometryDiscovery = bindGeometryDiscovery;
})();
