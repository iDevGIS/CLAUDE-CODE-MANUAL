const fs = require('fs');
const path = require('path');

const DB = path.join(__dirname, '..', 'todos.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DB, 'utf8'));
  } catch {
    return { nextId: 1, items: [] };
  }
}

function save(state) {
  fs.writeFileSync(DB, JSON.stringify(state, null, 2));
}

function addTodo(text) {
  const state = load();
  const todo = { id: state.nextId++, text, done: false, createdAt: new Date().toISOString() };
  state.items.push(todo);
  save(state);
  return todo;
}

function listTodos() {
  return load().items;
}

function completeTodo(id) {
  const state = load();
  const t = state.items.find(x => x.id === id);
  if (!t) return null;
  t.done = true;
  save(state);
  return t;
}

function removeTodo(id) {
  const state = load();
  const before = state.items.length;
  state.items = state.items.filter(x => x.id !== id);
  if (state.items.length === before) return false;
  save(state);
  return true;
}

module.exports = { addTodo, listTodos, completeTodo, removeTodo };
