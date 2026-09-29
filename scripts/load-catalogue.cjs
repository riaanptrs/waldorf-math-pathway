const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
module.exports = function loadCatalogue() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/src="src\/([^"?]+)[^"]*"/g)].map(match => match[1]);
  const context = vm.createContext({ window: {} });
  for (const file of scripts) {
    if (['app.js', 'fluency.js'].includes(file)) continue;
    vm.runInContext(fs.readFileSync(path.join(root, 'src', file), 'utf8'), context, {filename: file});
  }
  return {root, scripts, context, ...context.window};
};
