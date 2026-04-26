#!/usr/bin/env node
// Minimal style linter — keeps the project self-contained.
// Rules:
//   1. No `console.log` inside src/core (core stays pure)
//   2. No third-party requires (only node: builtins or relative paths)
//   3. No tabs in source files

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = ['src'];

const BUILTINS = new Set([
  'fs', 'path', 'http', 'https', 'os', 'url', 'crypto', 'util',
  'stream', 'events', 'buffer', 'process', 'child_process', 'assert',
  'node:test', 'node:assert', 'node:assert/strict', 'node:fs', 'node:path',
]);

const errors = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.js')) check(p);
  }
}

function check(file) {
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');

  if (rel.startsWith(path.join('src', 'core'))) {
    lines.forEach((line, i) => {
      if (/console\.(log|error|warn)/.test(line)) {
        errors.push(`${rel}:${i + 1}: console.* not allowed in src/core (keep pure)`);
      }
    });
  }

  lines.forEach((line, i) => {
    const m = line.match(/require\(['"]([^'"]+)['"]\)/);
    if (!m) return;
    const dep = m[1];
    if (dep.startsWith('.') || dep.startsWith('/')) return;
    const base = dep.split('/')[0];
    if (BUILTINS.has(dep) || BUILTINS.has(base)) return;
    errors.push(`${rel}:${i + 1}: external dep '${dep}' — project must stay zero-dependency`);
  });

  if (text.includes('\t')) {
    errors.push(`${rel}: tabs found — use spaces`);
  }
}

for (const t of TARGETS) walk(path.join(ROOT, t));

if (errors.length === 0) {
  console.log('lint: ok');
  process.exit(0);
}
errors.forEach((e) => console.error(e));
process.exit(1);
