---
description: Security review of the pending diff (uses the security subagent)
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(rg:*), Bash(grep:*), Read, Task
---

Use the `security` subagent to scan the pending diff for:
- Path traversal (`..`, absolute paths from input)
- Command injection (interpolating user input into shell commands)
- Prototype pollution (Object.assign with untrusted input, `__proto__` keys)
- Hard-coded secrets / tokens
- Permissive CORS, missing input validation in `src/server/routes.js`
- Logs that leak PII or full request bodies

Output format:
- Severity: HIGH / MED / LOW per finding
- For each: `file:line` + 1-sentence description + suggested mitigation
- End with a recommendation: SAFE TO MERGE / NEEDS FIXES / NEEDS DISCUSSION
