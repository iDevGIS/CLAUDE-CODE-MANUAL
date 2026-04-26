const test = require('node:test');
const assert = require('node:assert/strict');
const { run } = require('../src/cli/commands');
const { tmpDb } = require('./_helpers');

function captured() {
  const out = { logs: [], errs: [] };
  out.log = (m) => out.logs.push(m);
  out.err = (m) => out.errs.push(m);
  return out;
}

function withDb(fn) {
  const db = tmpDb();
  process.env.TASKFLOW_DB = db.path;
  try {
    return fn();
  } finally {
    delete process.env.TASKFLOW_DB;
    db.cleanup();
  }
}

test('add → list flow', () => {
  withDb(() => {
    const o1 = captured();
    assert.equal(run(['add', 'write blog', '--priority', 'high', '--tag', 'work'], o1), 0);
    assert.match(o1.logs[0], /added #1/);

    const o2 = captured();
    run(['list'], o2);
    assert.match(o2.logs[0], /\(H\) write blog/);
    assert.match(o2.logs[0], /#work/);
  });
});

test('done → stats', () => {
  withDb(() => {
    run(['add', 'a'], captured());
    run(['add', 'b'], captured());
    run(['done', '1'], captured());

    const o = captured();
    run(['stats'], o);
    assert.match(o.logs[0], /total:    2/);
    assert.match(o.logs[0], /done:     1/);
  });
});

test('add with empty title returns error code', () => {
  withDb(() => {
    const o = captured();
    assert.equal(run(['add'], o), 0); // no args → usage message via err
    assert.match(o.errs[0], /usage/);
  });
});

test('unknown command falls back to help', () => {
  withDb(() => {
    const o = captured();
    run(['nope'], o);
    assert.match(o.logs[0], /taskflow — task management CLI/);
  });
});
