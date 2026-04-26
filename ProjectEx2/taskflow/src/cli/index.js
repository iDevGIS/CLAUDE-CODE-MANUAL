#!/usr/bin/env node
const { run } = require('./commands');

const code = run(process.argv.slice(2));
process.exit(code);
