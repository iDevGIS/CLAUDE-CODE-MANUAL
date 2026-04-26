---
description: Run all tests and report any failures
allowed-tools: Bash(npm test)
---

Run `npm test` and summarize the results.

If any tests fail:
1. Show the failing test name and error
2. Identify the most likely root cause from `lib/todo.js` or `index.js`
3. Suggest a fix (don't apply it — wait for confirmation)

If all tests pass: report PASS count and total runtime in one line.
