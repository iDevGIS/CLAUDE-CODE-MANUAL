const fs = require('fs');
const path = require('path');

function defaultDbPath() {
  const file = process.env.TASKFLOW_DB || '.taskflow.json';
  return path.isAbsolute(file) ? file : path.join(process.cwd(), file);
}

function load(dbPath) {
  const file = dbPath || defaultDbPath();
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!data || typeof data.nextId !== 'number' || !Array.isArray(data.items)) {
      return emptyState();
    }
    return data;
  } catch {
    return emptyState();
  }
}

function save(state, dbPath) {
  fs.writeFileSync(dbPath || defaultDbPath(), JSON.stringify(state, null, 2));
  return state;
}

function emptyState() {
  return { nextId: 1, items: [] };
}

module.exports = { load, save, emptyState, defaultDbPath };
