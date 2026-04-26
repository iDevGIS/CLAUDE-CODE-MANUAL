const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const DB = path.join(__dirname, '..', 'todos.json');

function freshState() {
  if (fs.existsSync(DB)) fs.unlinkSync(DB);
  delete require.cache[require.resolve('../lib/todo')];
  return require('../lib/todo');
}

test('addTodo creates an item with incrementing id', () => {
  const t = freshState();
  const a = t.addTodo('first');
  const b = t.addTodo('second');
  assert.strictEqual(a.id, 1);
  assert.strictEqual(b.id, 2);
  assert.strictEqual(a.done, false);
});

test('listTodos returns all items', () => {
  const t = freshState();
  t.addTodo('one');
  t.addTodo('two');
  assert.strictEqual(t.listTodos().length, 2);
});

test('completeTodo marks done', () => {
  const t = freshState();
  t.addTodo('do laundry');
  t.completeTodo(1);
  assert.strictEqual(t.listTodos()[0].done, true);
});

test('removeTodo deletes an item', () => {
  const t = freshState();
  t.addTodo('x');
  assert.strictEqual(t.removeTodo(1), true);
  assert.strictEqual(t.listTodos().length, 0);
});

test('removeTodo returns false for missing id', () => {
  const t = freshState();
  assert.strictEqual(t.removeTodo(999), false);
});
