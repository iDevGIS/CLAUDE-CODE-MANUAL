const test = require('node:test');
const assert = require('node:assert/strict');
const t = require('../src/core/task');
const { tmpDb } = require('./_helpers');

function withDb(fn) {
  const { path, cleanup } = tmpDb();
  try {
    return fn(path);
  } finally {
    cleanup();
  }
}

test('addTask creates a task with defaults', () => {
  withDb((db) => {
    const task = t.addTask({ title: 'write blog' }, db);
    assert.equal(task.id, 1);
    assert.equal(task.title, 'write blog');
    assert.equal(task.priority, 'med');
    assert.deepEqual(task.tags, []);
    assert.equal(task.done, false);
  });
});

test('addTask trims title and dedupes tags', () => {
  withDb((db) => {
    const task = t.addTask({ title: '  hi  ', tags: ['a', 'a', 'b'] }, db);
    assert.equal(task.title, 'hi');
    assert.deepEqual(task.tags.sort(), ['a', 'b']);
  });
});

test('addTask validates inputs', () => {
  withDb((db) => {
    assert.throws(() => t.addTask({ title: '' }, db), /empty/);
    assert.throws(() => t.addTask({ title: 'ok', priority: 'bad' }, db), /one of/);
    assert.throws(() => t.addTask({ title: 'ok', tags: ['has space'] }, db), /1-32/);
  });
});

test('listTasks filters by done/tag/priority', () => {
  withDb((db) => {
    t.addTask({ title: 'a', priority: 'high', tags: ['x'] }, db);
    t.addTask({ title: 'b', priority: 'low', tags: ['y'] }, db);
    const done = t.completeTask(1, db);
    assert.ok(done.done);

    assert.equal(t.listTasks({ done: true }, db).length, 1);
    assert.equal(t.listTasks({ done: false }, db).length, 1);
    assert.equal(t.listTasks({ priority: 'high' }, db).length, 1);
    assert.equal(t.listTasks({ tag: 'y' }, db).length, 1);
  });
});

test('completeTask is idempotent', () => {
  withDb((db) => {
    t.addTask({ title: 'a' }, db);
    const first = t.completeTask(1, db);
    const second = t.completeTask(1, db);
    assert.equal(first.id, 1);
    assert.equal(second.id, 1);
    assert.equal(first.completedAt, second.completedAt);
  });
});

test('removeTask returns false for missing id', () => {
  withDb((db) => {
    assert.equal(t.removeTask(99, db), false);
  });
});

test('searchTasks matches title and tags case-insensitively', () => {
  withDb((db) => {
    t.addTask({ title: 'Buy MILK', tags: ['groceries'] }, db);
    t.addTask({ title: 'walk dog', tags: ['pets'] }, db);
    assert.equal(t.searchTasks('milk', db).length, 1);
    assert.equal(t.searchTasks('PETS', db).length, 1);
    assert.equal(t.searchTasks('', db).length, 0);
  });
});

test('statsTasks summarizes counts', () => {
  withDb((db) => {
    t.addTask({ title: 'a', priority: 'high' }, db);
    t.addTask({ title: 'b', priority: 'high' }, db);
    t.addTask({ title: 'c', priority: 'low' }, db);
    t.completeTask(1, db);
    const s = t.statsTasks(db);
    assert.equal(s.total, 3);
    assert.equal(s.done, 1);
    assert.equal(s.open, 2);
    assert.equal(s.byPriority.high, 2);
    assert.equal(s.byPriority.low, 1);
  });
});
