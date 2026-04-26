---
description: Run the full test suite (and lint), summarize the results
allowed-tools: Bash(npm test:*), Bash(npm run lint:*), Bash(node scripts/lint.js)
argument-hint: [optional test name pattern]
---

Run `npm test` (and `npm run lint`).

If `$ARGUMENTS` is given, treat it as a test name pattern and pass it to `node --test --test-name-pattern="$ARGUMENTS"`.

Report:
- PASS / FAIL counts and total runtime
- For each failure: test name + 1-line root-cause guess (look at `src/core/` first)
- Lint output (one-line summary)

Don't apply any fixes — wait for confirmation.
