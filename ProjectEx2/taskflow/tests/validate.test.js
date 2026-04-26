const test = require('node:test');
const assert = require('node:assert/strict');
const v = require('../src/core/validate');

test('validateTitle rejects empty string', () => {
  assert.match(v.validateTitle(''), /empty/);
  assert.match(v.validateTitle('   '), /empty/);
});

test('validateTitle accepts normal title', () => {
  assert.equal(v.validateTitle('write blog post'), null);
});

test('validateTitle rejects non-string', () => {
  assert.match(v.validateTitle(123), /string/);
});

test('validatePriority accepts known values', () => {
  for (const p of ['low', 'med', 'high']) {
    assert.equal(v.validatePriority(p), null);
  }
});

test('validatePriority rejects unknown', () => {
  assert.match(v.validatePriority('urgent'), /one of/);
});

test('validateTag enforces character set', () => {
  assert.equal(v.validateTag('work'), null);
  assert.equal(v.validateTag('work-2025'), null);
  assert.match(v.validateTag('has space'), /1-32 chars/);
});

test('validateId rejects zero/negative/non-int', () => {
  assert.match(v.validateId(0), /positive/);
  assert.match(v.validateId(-1), /positive/);
  assert.match(v.validateId(1.5), /positive/);
  assert.equal(v.validateId(1), null);
});
