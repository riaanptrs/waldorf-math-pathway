const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(root, "src", "geometry-discovery.js"), "utf8"), context);

const lessonIds = [
  "g4-area-floor-tiles",
  "g5-freehand-circle-diameter",
  "g5-symmetry-balance",
  "g6-geometry-precision",
  "g7-competency-pythagorean-leg",
  "g8-pythagorean-hypotenuse",
  "g8-competency-trapezoid-area",
  "g8-competency-cylinder-surface",
  "g8-cylinder-volume",
  "g9-distance-formula",
];

for (const id of lessonIds) {
  for (const language of ["en", "pt"]) {
    const html = context.window.renderGeometryDiscovery({ id }, language);
    if (!html.includes("geometry-studio") || !html.includes("geometry-materials") || !html.includes("geometry-journal")) {
      throw new Error(`${id} is missing a complete ${language} geometry studio`);
    }
  }
}

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (index.indexOf("geometry-discovery.js") > index.indexOf("src/app.js")) {
  throw new Error("geometry-discovery.js must load before app.js");
}

process.stdout.write(`Validated ${lessonIds.length} bilingual geometry studios.\n`);
