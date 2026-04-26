const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const { load, save, emptyState } = require('../src/core/store');
const { tmpDb } = require('./_helpers');

test('load returns empty state when file missing', () => {
  const { path, cleanup } = tmpDb();
  try {
    const s = load(path);
    assert.deepEqual(s, emptyState());
  } finally {
    cleanup();
  }
});

test('save then load roundtrips', () => {
  const { path, cleanup } = tmpDb();
  try {
    const s = { nextId: 5, items: [{ id: 1, title: 'x', tags: [], priority: 'med', done: false }] };
    save(s, path);
    const back = load(path);
    assert.deepEqual(back, s);
  } finally {
    cleanup();
  }
});

test('load tolerates malformed file', () => {
  const { path, cleanup } = tmpDb();
  try {
    fs.writeFileSync(path, '{not json');
    const s = load(path);
    assert.deepEqual(s, emptyState());
  } finally {
    cleanup();
  }
});
