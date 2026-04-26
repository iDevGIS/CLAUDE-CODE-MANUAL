const test = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/server');
const { tmpDb } = require('./_helpers');

function listen(server) {
  return new Promise((resolve) => server.listen(0, () => resolve(server.address().port)));
}

async function fetchJson(port, method, path, body) {
  const opts = { method, headers: { 'content-type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`http://localhost:${port}${path}`, opts);
  const text = await res.text();
  return { status: res.status, body: text ? JSON.parse(text) : null };
}

test('GET /health returns ok', async () => {
  const db = tmpDb();
  process.env.TASKFLOW_DB = db.path;
  const server = createServer();
  const port = await listen(server);
  try {
    const r = await fetchJson(port, 'GET', '/health');
    assert.equal(r.status, 200);
    assert.deepEqual(r.body, { ok: true });
  } finally {
    server.close();
    db.cleanup();
    delete process.env.TASKFLOW_DB;
  }
});

test('CRUD flow over HTTP', async () => {
  const db = tmpDb();
  process.env.TASKFLOW_DB = db.path;
  const server = createServer();
  const port = await listen(server);
  try {
    const created = await fetchJson(port, 'POST', '/tasks', { title: 'first', priority: 'high' });
    assert.equal(created.status, 201);
    assert.equal(created.body.id, 1);

    const list = await fetchJson(port, 'GET', '/tasks');
    assert.equal(list.status, 200);
    assert.equal(list.body.length, 1);

    const done = await fetchJson(port, 'POST', '/tasks/1/done');
    assert.equal(done.status, 200);
    assert.equal(done.body.done, true);

    const stats = await fetchJson(port, 'GET', '/stats');
    assert.equal(stats.status, 200);
    assert.equal(stats.body.done, 1);

    const del = await fetchJson(port, 'DELETE', '/tasks/1');
    assert.equal(del.status, 204);

    const after = await fetchJson(port, 'GET', '/tasks');
    assert.equal(after.body.length, 0);
  } finally {
    server.close();
    db.cleanup();
    delete process.env.TASKFLOW_DB;
  }
});

test('POST /tasks rejects invalid input', async () => {
  const db = tmpDb();
  process.env.TASKFLOW_DB = db.path;
  const server = createServer();
  const port = await listen(server);
  try {
    const r = await fetchJson(port, 'POST', '/tasks', { title: '' });
    assert.equal(r.status, 400);
    assert.match(r.body.error, /empty/);
  } finally {
    server.close();
    db.cleanup();
    delete process.env.TASKFLOW_DB;
  }
});
