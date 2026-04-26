---
description: Run the project linter (zero-deps + style rules)
allowed-tools: Bash(npm run lint:*), Bash(node scripts/lint.js)
---

Run `npm run lint`.

If clean: reply `lint: ok` (one line).

If issues: list each `file:line: rule` and group by rule. Suggest the smallest fix per rule (don't apply).

Reminder of the rules (from `scripts/lint.js`):
- No `console.*` in `src/core/`
- No third-party `require()` — built-ins or relative paths only
- No tabs
